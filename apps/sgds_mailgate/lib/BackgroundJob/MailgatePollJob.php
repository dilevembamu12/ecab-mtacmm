<?php
declare(strict_types=1);

namespace OCA\SgdsMailgate\BackgroundJob;

use OCA\SgdsMailgate\Service\MailgateService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

/**
 * Polls the institutional inbox every 5 minutes.
 */
class MailgatePollJob extends TimedJob
{
    public function __construct(
        ITimeFactory $time,
        private MailgateService $mailgateService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($time);
        // Run every 5 minutes
        $this->setInterval(300);
    }

    protected function run($argument): void
    {
        try {
            $dossiers = $this->mailgateService->pollInbox();
            if (count($dossiers) > 0) {
                $this->logger->info('Mailgate BG: ' . count($dossiers) . ' nouveaux dossiers');
            }
        } catch (\Throwable $e) {
            $this->logger->error('Mailgate BG error: ' . $e->getMessage());
        }
    }
}
