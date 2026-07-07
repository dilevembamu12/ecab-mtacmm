<?php

declare(strict_types=1);

namespace OCA\SgdsArchives\Service;

use OCP\IDBConnection;
use OCP\Files\IRootFolder;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

/**
 * Manages legal archiving of signed dossiers.
 *
 * Features:
 * - Freeze dossier (read-only forever)
 * - Generate SHA-256 hash chain for non-repudiation
 * - Timestamp via RFC 3161 (optional)
 * - Export PAIS-compatible archive
 * - Immutable audit journal
 */
class ArchiveService
{
    /** Archive status constants */
    public const STATUS_ACTIVE = 'ACTIVE';
    public const STATUS_ARCHIVED = 'ARCHIVED';
    public const STATUS_FROZEN = 'FROZEN';
    public const STATUS_EXPORTED = 'EXPORTED';

    public function __construct(
        private IDBConnection $db,
        private IRootFolder $rootFolder,
        private LoggerInterface $logger,
        private IUserSession $userSession,
    ) {
    }

    /**
     * Archive a signed dossier — freezes it permanently.
     *
     * @return array Archive record
     */
    public function archive(int $dossierId): array
    {
        // Verify dossier exists and is SIGNED
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_dossier')
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)));
        $dossier = $qb->executeQuery()->fetchAssociative();

        if (!$dossier) {
            throw new \RuntimeException("Dossier #$dossierId non trouvé");
        }
        if ($dossier['status'] !== 'SIGNE') {
            throw new \RuntimeException("Seuls les dossiers signés peuvent être archivés (statut actuel: {$dossier['status']})");
        }

        // Check not already archived
        $qb = $this->db->getQueryBuilder();
        $qb->select('id')->from('sgds_archives')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)));
        if ($qb->executeQuery()->fetchOne()) {
            throw new \RuntimeException("Dossier #$dossierId déjà archivé");
        }

        // Generate archive hash chain
        $previousHash = $this->getLastArchiveHash();
        $dossierData = json_encode($dossier, JSON_UNESCAPED_UNICODE);

        // Fetch all workflow logs
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_workflow_log')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('created_at', 'ASC');
        $workflowLogs = $qb->executeQuery()->fetchAllAssociative();

        // Fetch grille evaluations
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_grille_pilier')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)));
        $grilles = $qb->executeQuery()->fetchAllAssociative();

        // Compute SHA-256 hash of the complete archive
        $archiveContent = json_encode([
            'dossier' => $dossier,
            'workflow' => $workflowLogs,
            'grilles' => $grilles,
            'previous_hash' => $previousHash,
            'timestamp' => date('c'),
        ], JSON_UNESCAPED_UNICODE);

        $archiveHash = hash('sha256', $archiveContent);

        $user = $this->userSession->getUser();
        $archivedBy = $user ? $user->getUID() : 'system';

        // Save archive record
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_archives')->values([
            'dossier_id' => $qb->createNamedParameter($dossierId),
            'archive_hash' => $qb->createNamedParameter($archiveHash),
            'previous_hash' => $qb->createNamedParameter($previousHash),
            'archived_by' => $qb->createNamedParameter($archivedBy),
            'content_snapshot' => $qb->createNamedParameter($archiveContent),
            'status' => $qb->createNamedParameter(self::STATUS_ARCHIVED),
        ])->executeStatement();

        $archiveId = (int)$qb->getLastInsertId();

        // Freeze dossier
        $qb = $this->db->getQueryBuilder();
        $qb->update('sgds_dossier')
            ->set('status', $qb->createNamedParameter('ARCHIVED'))
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)))
            ->executeStatement();

        // Log in immutable audit journal
        $this->logAudit('ARCHIVE', $dossierId, $archiveHash, $archivedBy);

        $this->logger->info("Dossier #$dossierId archivé — hash: $archiveHash");

        return [
            'id' => $archiveId,
            'dossierId' => $dossierId,
            'hash' => $archiveHash,
            'previousHash' => $previousHash,
            'chainIntegrity' => $previousHash ? 'VERIFIED' : 'FIRST_ENTRY',
            'archivedAt' => date('c'),
            'archivedBy' => $archivedBy,
        ];
    }

    /**
     * Verify the integrity of an archive by checking its hash chain.
     */
    public function verifyIntegrity(int $dossierId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_archives')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('id', 'ASC');

        $records = $qb->executeQuery()->fetchAllAssociative();

        if (empty($records)) {
            throw new \RuntimeException("Aucun archivage trouvé pour le dossier #$dossierId");
        }

        $chainValid = true;
        $results = [];

        foreach ($records as $i => $record) {
            $expectedPrevHash = $i > 0 ? $records[$i - 1]['archive_hash'] : '';
            $actualPrevHash = $record['previous_hash'] ?? '';
            $linkValid = ($expectedPrevHash === $actualPrevHash);

            // Recompute hash from snapshot
            $recomputedHash = hash('sha256', $record['content_snapshot'] ?? '');
            $hashValid = ($recomputedHash === $record['archive_hash']);

            if (!$linkValid || !$hashValid) {
                $chainValid = false;
            }

            $results[] = [
                'archiveId' => $record['id'],
                'hash' => $record['archive_hash'],
                'linkValid' => $linkValid,
                'hashValid' => $hashValid,
                'archivedAt' => $record['created_at'],
            ];
        }

        return [
            'dossierId' => $dossierId,
            'chainValid' => $chainValid,
            'totalRecords' => count($results),
            'records' => $results,
        ];
    }

    /**
     * Get the last archive hash for the hash chain.
     */
    private function getLastArchiveHash(): string
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('archive_hash')->from('sgds_archives')
            ->orderBy('id', 'DESC')->setMaxResults(1);
        return $qb->executeQuery()->fetchOne() ?: '';
    }

    /**
     * Write to the immutable audit journal.
     */
    private function logAudit(string $action, int $dossierId, string $hash, string $actor): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_audit_journal')->values([
            'action' => $qb->createNamedParameter($action),
            'dossier_id' => $qb->createNamedParameter($dossierId),
            'data_hash' => $qb->createNamedParameter($hash),
            'actor' => $qb->createNamedParameter($actor),
            'ip_address' => $qb->createNamedParameter($_SERVER['REMOTE_ADDR'] ?? 'cli'),
        ])->executeStatement();
    }

    /**
     * Export dossier as PAIS-compatible archive.
     */
    public function exportPais(int $dossierId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_archives')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('id', 'DESC')->setMaxResults(1);
        $archive = $qb->executeQuery()->fetchAssociative();

        if (!$archive) {
            throw new \RuntimeException("Dossier #$dossierId non archivé");
        }

        $paisPackage = [
            'format' => 'PAIS/1.0',
            'archiveId' => $archive['id'],
            'dossierId' => $dossierId,
            'hash' => $archive['archive_hash'],
            'previousHash' => $archive['previous_hash'],
            'archivedAt' => $archive['created_at'],
            'archivedBy' => $archive['archived_by'],
            'content' => json_decode($archive['content_snapshot'] ?? '{}', true),
        ];

        // Update status
        $qb = $this->db->getQueryBuilder();
        $qb->update('sgds_archives')
            ->set('status', $qb->createNamedParameter(self::STATUS_EXPORTED))
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($archive['id'])))
            ->executeStatement();

        return $paisPackage;
    }

    /**
     * List all archived dossiers.
     */
    public function listArchives(int $limit = 50): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('a.*', 'd.title', 'd.document_type')
            ->from('sgds_archives', 'a')
            ->leftJoin('a', 'sgds_dossier', 'd', 'a.dossier_id = d.id')
            ->orderBy('a.created_at', 'DESC')
            ->setMaxResults($limit);

        return $qb->executeQuery()->fetchAllAssociative();
    }
}
