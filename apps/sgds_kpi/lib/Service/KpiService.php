<?php

declare(strict_types=1);

namespace OCA\SgdsKpi\Service;

use OCP\IDBConnection;
use Psr\Log\LoggerInterface;

/**
 * Dashboard KPIs for the Minister and Director of Cabinet.
 *
 * Provides real-time metrics:
 * - Dossiers by status
 * - Average processing time per step
 * - Approval/rejection rate
 * - Workload per agent
 * - Overdue dossier alerts
 */
class KpiService
{
    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Get the complete KPI dashboard data
     */
    public function getDashboard(): array
    {
        return [
            'dossiersParStatut' => $this->getDossiersParStatut(),
            'delaisMoyens' => $this->getDelaisMoyens(),
            'tauxApprobation' => $this->getTauxApprobation(),
            'chargeParAgent' => $this->getChargeParAgent(),
            'dossiersEnRetard' => $this->getDossiersEnRetard(),
            'tendanceMensuelle' => $this->getTendanceMensuelle(),
            'topDocuments' => $this->getTopDocumentsTypes(),
        ];
    }

    /**
     * Count dossiers grouped by status
     */
    public function getDossiersParStatut(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('status', $qb->func()->count('*', 'total'))
            ->from('sgds_dossier')
            ->groupBy('status')
            ->orderBy('status', 'ASC');

        $rows = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['status']] = (int)$row['total'];
        }
        return $result;
    }

    /**
     * Average processing time (in hours) between workflow steps
     */
    public function getDelaisMoyens(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('from_status', 'to_status')
            ->selectAlias($qb->func()->avg(
                'TIMESTAMPDIFF(HOUR, LAG(created_at) OVER (PARTITION BY dossier_id ORDER BY created_at), created_at)'
            ), 'avg_hours')
            ->from('sgds_workflow_log')
            ->where($qb->expr()->neq('from_status', $qb->createNamedParameter('')))
            ->groupBy('from_status', 'to_status')
            ->orderBy('from_status', 'ASC');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();

        // Fallback for MySQL versions without window functions
        if (empty($rows)) {
            return $this->getDelaisMoyensFallback();
        }

        return $rows;
    }

    private function getDelaisMoyensFallback(): array
    {
        // Simplified: average time from creation to current status
        $qb = $this->db->getQueryBuilder();
        $qb->select('status')
            ->selectAlias($qb->func()->avg(
                'TIMESTAMPDIFF(HOUR, created_at, updated_at)'
            ), 'avg_hours')
            ->from('sgds_dossier')
            ->groupBy('status');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();
        return $rows;
    }

    /**
     * Approval vs rejection rate
     */
    public function getTauxApprobation(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier');

        $total = (int)$qb->executeQuery()->fetchOne();

        $qb = $this->db->getQueryBuilder();
        $qb->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier')
            ->where($qb->expr()->in('status', $qb->createNamedParameter(
                ['SIGNE', 'VISE', 'PRET_VISA', 'AVIS_FAVORABLE'],
                \Doctrine\DBAL\ArrayParameterType::STRING
            )));

        $approuved = (int)$qb->executeQuery()->fetchOne();

        $qb = $this->db->getQueryBuilder();
        $qb->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier')
            ->where($qb->expr()->in('status', $qb->createNamedParameter(
                ['REJETE', 'AVIS_DEFAVORABLE'],
                \Doctrine\DBAL\ArrayParameterType::STRING
            )));

        $rejected = (int)$qb->executeQuery()->fetchOne();

        return [
            'total' => $total,
            'approuves' => $approuved,
            'rejetes' => $rejected,
            'enCours' => $total - $approuved - $rejected,
            'tauxApprobation' => $total > 0 ? round($approuved / $total * 100, 1) : 0,
        ];
    }

    /**
     * Workload per agent (number of dossiers currently assigned)
     */
    public function getChargeParAgent(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('assigned_to')
            ->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier')
            ->where($qb->expr()->isNotNull('assigned_to'))
            ->andWhere($qb->expr()->notIn('status', $qb->createNamedParameter(
                ['SIGNE', 'REJETE'],
                \Doctrine\DBAL\ArrayParameterType::STRING
            )))
            ->groupBy('assigned_to')
            ->orderBy('total', 'DESC');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();
        return $rows;
    }

    /**
     * Dossiers exceeding SLA (no status change in > 7 days)
     */
    public function getDossiersEnRetard(int $seuilJours = 7): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('d.id', 'd.title', 'd.status', 'd.assigned_to', 'd.updated_at')
            ->from('sgds_dossier', 'd')
            ->where($qb->expr()->lt(
                'd.updated_at',
                $qb->createNamedParameter(date('Y-m-d H:i:s', strtotime("-$seuilJours days")))
            ))
            ->andWhere($qb->expr()->notIn('d.status', $qb->createNamedParameter(
                ['SIGNE', 'REJETE'],
                \Doctrine\DBAL\ArrayParameterType::STRING
            )))
            ->orderBy('d.updated_at', 'ASC')
            ->setMaxResults(20);

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();
        return $rows;
    }

    /**
     * Monthly trend (dossiers created per month, last 6 months)
     */
    public function getTendanceMensuelle(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->selectAlias("DATE_FORMAT(created_at, '%Y-%m')", 'mois')
            ->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier')
            ->where($qb->expr()->gte('created_at', $qb->createNamedParameter(
                date('Y-m-d', strtotime('-6 months'))
            )))
            ->groupBy('mois')
            ->orderBy('mois', 'ASC');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();
        return $rows;
    }

    /**
     * Top 5 document types
     */
    public function getTopDocumentsTypes(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('document_type')
            ->selectAlias($qb->func()->count('*'), 'total')
            ->from('sgds_dossier')
            ->groupBy('document_type')
            ->orderBy('total', 'DESC')
            ->setMaxResults(5);

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();
        return $rows;
    }
}
