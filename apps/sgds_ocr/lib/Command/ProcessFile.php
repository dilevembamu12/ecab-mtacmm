<?php
declare(strict_types=1);
namespace OCA\SgdsOcr\Command;

use OCA\SgdsOcr\Service\OcrService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ProcessFile extends Command
{
    public function __construct(private OcrService $ocrService) { parent::__construct(); }
    protected function configure(): void {
        $this->setName('sgds:ocr')->setDescription('OCR un fichier')
            ->addArgument('fileId', InputArgument::REQUIRED, 'ID du fichier')
            ->addArgument('userId', InputArgument::REQUIRED, 'Utilisateur propriétaire');
    }
    protected function execute(InputInterface $input, OutputInterface $output): int {
        try {
            $result = $this->ocrService->processFile(
                (int)$input->getArgument('fileId'),
                $input->getArgument('userId')
            );
            $output->writeln('<info>OCR OK — Type: ' . ($result['documentType']??'?') . '</info>');
            return 0;
        } catch (\RuntimeException $e) {
            $output->writeln('<error>' . $e->getMessage() . '</error>');
            return 1;
        }
    }
}
