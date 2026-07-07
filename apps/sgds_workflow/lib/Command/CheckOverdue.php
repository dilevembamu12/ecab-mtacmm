<?php
declare(strict_types=1);

namespace OCA\SgdsWorkflow\Command;

use OCP\IDBConnection;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckOverdue extends Command
{
    public function __construct(private IDBConnection $db)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('sgds:check-overdue')
            ->setDescription('Vérifie les dossiers en retard et envoie des alertes');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('id', 'title', 'status', 'assigned_to', 'updated_at')
            ->from('sgds_dossier')
            ->where($qb->expr()->lt('updated_at', $qb->createNamedParameter(
                date('Y-m-d H:i:s', strtotime('-7 days'))
            )))
            ->andWhere($qb->expr()->notIn('status', $qb->createNamedParameter(
                ['SIGNE', 'REJETE'],
                \Doctrine\DBAL\ArrayParameterType::STRING
            )))
            ->orderBy('updated_at', 'ASC');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();

        $output->writeln('<info>' . count($rows) . ' dossiers en retard (>7 jours)</info>');
        foreach ($rows as $row) {
            $output->writeln(sprintf(
                '  ⚠️  #%d « %s » — %s → assigné à %s (dernière MAJ: %s)',
                $row['id'],
                mb_substr($row['title'], 0, 60),
                $row['status'],
                $row['assigned_to'] ?? '—',
                $row['updated_at']
            ));
        }

        return 0;
    }
}
