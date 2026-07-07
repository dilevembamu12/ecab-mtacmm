<?php
declare(strict_types=1);

namespace OCA\SgdsMailgate\Command;

use OCA\SgdsMailgate\Service\MailgateService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class PollInbox extends Command
{
    public function __construct(private MailgateService $mailgateService)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('sgds:mailgate-poll')
            ->setDescription('Relève la boîte email institutionnelle et crée des dossiers')
            ->addOption('password', 'p', InputOption::VALUE_REQUIRED, 'Mot de passe IMAP');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $password = $input->getOption('password');
        if ($password) {
            $this->mailgateService->configure(
                '{imap.gmail.com:993/imap/ssl}INBOX',
                'commissiontextes@gmail.com',
                $password
            );
        }

        try {
            $dossiers = $this->mailgateService->pollInbox();
            $output->writeln('<info>' . count($dossiers) . ' dossiers créés depuis les emails.</info>');
            foreach ($dossiers as $id) {
                $output->writeln('  - Dossier #' . $id);
            }
        } catch (\RuntimeException $e) {
            $output->writeln('<error>' . $e->getMessage() . '</error>');
            return 1;
        }

        return 0;
    }
}
