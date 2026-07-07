<?php

declare(strict_types=1);

namespace OCA\SgdsMailgate\Service;

use OCP\IDBConnection;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;

/**
 * Polls the institutional email inbox and creates dossier entries.
 *
 * Uses PHP IMAP extension to connect to Gmail/IMAP server,
 * extracts emails + attachments, and creates dossier documentaires.
 */
class MailgateService
{
    /** IMAP connection config — to be set via admin settings */
    private string $host = '{imap.gmail.com:993/imap/ssl}INBOX';
    private string $username = 'commissiontextes@gmail.com';
    private string $password = '';

    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
        private IUserManager $userManager,
    ) {
    }

    /**
     * Configure IMAP credentials
     */
    public function configure(string $host, string $username, string $password): void
    {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Poll the inbox and process unread emails
     *
     * @return array List of created dossier IDs
     */
    public function pollInbox(): array
    {
        if (empty($this->password)) {
            throw new \RuntimeException('Mailgate non configuré. Définir le mot de passe IMAP.');
        }

        $created = [];
        $mailbox = @\imap_open($this->host, $this->username, $this->password);

        if (!$mailbox) {
            $error = \imap_last_error();
            $this->logger->error("IMAP connection failed: $error");
            throw new \RuntimeException("Connexion IMAP échouée: $error");
        }

        try {
            $emails = \imap_search($mailbox, 'UNSEEN');
            if (!$emails) {
                $this->logger->info('Aucun nouvel email non lu');
                return [];
            }

            foreach ($emails as $emailNum) {
                $dossierId = $this->processEmail($mailbox, $emailNum);
                if ($dossierId) {
                    $created[] = $dossierId;
                    \imap_setflag_full($mailbox, (string)$emailNum, '\\Seen');
                }
            }
        } finally {
            \imap_close($mailbox);
        }

        $this->logger->info('Mailgate: ' . count($created) . ' dossiers créés');
        return $created;
    }

    /**
     * Process a single email into a dossier
     */
    private function processEmail(\IMAP\Connection $mailbox, int $emailNum): ?int
    {
        $overview = \imap_fetch_overview($mailbox, (string)$emailNum, 0);
        if (empty($overview)) {
            return null;
        }

        $email = $overview[0];
        $subject = \imap_utf8($email->subject ?? 'Sans objet');
        $from = \imap_utf8($email->from ?? 'Inconnu');
        $date = $email->date ?? date('Y-m-d H:i:s');

        // Extract sender name from "Name <email>" format
        $senderName = $from;
        if (preg_match('/^([^<]+)</', $from, $m)) {
            $senderName = trim($m[1]);
        }

        // Get body
        $body = \imap_fetchbody($mailbox, (string)$emailNum, '1');
        if (empty($body)) {
            $body = \imap_body($mailbox, (string)$emailNum);
        }
        $body = \imap_qprint($body) ?: $body;
        $body = strip_tags($body);
        $body = mb_substr($body, 0, 2000);

        // Create dossier
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_dossier')
            ->values([
                'title' => $qb->createNamedParameter($subject),
                'description' => $qb->createNamedParameter("De: $senderName\nDate: $date\n\n$body"),
                'document_type' => $qb->createNamedParameter('courrier_arrivee'),
                'status' => $qb->createNamedParameter('BROUILLON'),
                'created_by' => $qb->createNamedParameter('mailgate'),
            ])
            ->executeStatement();

        $dossierId = (int)$qb->getLastInsertId();

        // Save attachments as files (placeholder — actual file creation requires Files API)
        $structure = \imap_fetchstructure($mailbox, (string)$emailNum);
        if (isset($structure->parts)) {
            foreach ($structure->parts as $partNum => $part) {
                if ($part->ifdparameters) {
                    foreach ($part->dparameters as $param) {
                        if (strtoupper($param->attribute) === 'FILENAME') {
                            $filename = \imap_utf8($param->value);
                            $this->logger->info("Attachment: $filename (dossier=$dossierId)");
                            // TODO: Save attachment to Nextcloud Files and link via sgds_dossier_file
                        }
                    }
                }
            }
        }

        // Initial workflow log
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_workflow_log')
            ->values([
                'dossier_id' => $qb->createNamedParameter($dossierId),
                'from_status' => $qb->createNamedParameter(''),
                'to_status' => $qb->createNamedParameter('BROUILLON'),
                'actor_user_id' => $qb->createNamedParameter('mailgate'),
                'comment' => $qb->createNamedParameter("Email reçu de $senderName — $subject"),
            ])
            ->executeStatement();

        return $dossierId;
    }
}
