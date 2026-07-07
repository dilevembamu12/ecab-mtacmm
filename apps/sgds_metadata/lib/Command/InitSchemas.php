<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Command;

use OCA\SgdsMetadata\Service\MetadataService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InitSchemas extends Command
{
    public function __construct(
        private MetadataService $metadataService,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('sgds:init-schemas')
            ->setDescription('Initialize default metadata schemas for all document types');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Initializing default metadata schemas...');
        $results = $this->metadataService->initDefaultSchemas();
        $output->writeln('Created ' . count($results) . ' schema fields.');
        return 0;
    }
}
