<?php
declare(strict_types=1);

namespace OCA\SgdsDossier\Command;

use OCP\IDBConnection;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateDossier extends Command
{
    public function __construct(private IDBConnection $db)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('sgds:dossier-create')
            ->setDescription('Crée un dossier documentaire (pour test)')
            ->addArgument('title', InputArgument::REQUIRED, 'Titre du dossier')
            ->addArgument('type', InputArgument::OPTIONAL, 'Type de document', 'courrier_arrivee');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $title = $input->getArgument('title');
        $type = $input->getArgument('type');

        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_dossier')->values([
            'title' => $qb->createNamedParameter($title),
            'document_type' => $qb->createNamedParameter($type),
            'status' => $qb->createNamedParameter('BROUILLON'),
            'created_by' => $qb->createNamedParameter('admin'),
        ])->executeStatement();

        $id = (int)$qb->getLastInsertId();

        // Initial workflow log
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_workflow_log')->values([
            'dossier_id' => $qb->createNamedParameter($id),
            'from_status' => $qb->createNamedParameter(''),
            'to_status' => $qb->createNamedParameter('BROUILLON'),
            'actor_user_id' => $qb->createNamedParameter('admin'),
            'comment' => $qb->createNamedParameter('Dossier créé via CLI'),
        ])->executeStatement();

        $output->writeln('<info>Dossier #' . $id . ' créé : « ' . $title . ' » (' . $type . ')</info>');
        return 0;
    }
}
