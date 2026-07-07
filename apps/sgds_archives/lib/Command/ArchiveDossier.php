<?php
declare(strict_types=1);
namespace OCA\SgdsArchives\Command;

use OCA\SgdsArchives\Service\ArchiveService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ArchiveDossier extends Command
{
    public function __construct(private ArchiveService $archiveService) { parent::__construct(); }
    protected function configure(): void {
        $this->setName('sgds:archive')->setDescription('Archive un dossier signé')
            ->addArgument('dossierId', InputArgument::REQUIRED, 'ID du dossier');
    }
    protected function execute(InputInterface $input, OutputInterface $output): int {
        try {
            $result = $this->archiveService->archive((int)$input->getArgument('dossierId'));
            $output->writeln('<info>Archivé ! Hash: ' . $result['hash'] . '</info>');
            return 0;
        } catch (\RuntimeException $e) {
            $output->writeln('<error>' . $e->getMessage() . '</error>');
            return 1;
        }
    }
}
