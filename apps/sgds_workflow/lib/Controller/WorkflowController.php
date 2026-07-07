<?php
declare(strict_types=1);
namespace OCA\SgdsWorkflow\Controller;

use OCA\SgdsWorkflow\Service\WorkflowService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IDBConnection;
use OCP\IRequest;

class WorkflowController extends Controller
{
    public function __construct(
        IRequest $request,
        private WorkflowService $workflowService,
        private IDBConnection $db,
    ) { parent::__construct('sgds_workflow', $request); }

    #[NoAdminRequired]
    public function transition(int $dossierId, string $newStatus, string $comment = '', ?array $grilleScores = null): DataResponse
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_dossier')->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)));
        $dossier = $qb->executeQuery()->fetchAssociative();
        if (!$dossier) return new DataResponse(['error' => 'Dossier non trouvé'], 404);

        try {
            $result = $this->workflowService->transition($dossier, $newStatus, $comment, $grilleScores);
            $qb = $this->db->getQueryBuilder();
            $qb->update('sgds_dossier')
                ->set('status', $qb->createNamedParameter($newStatus))
                ->set('assigned_to', $qb->createNamedParameter($this->workflowService->getActorForState($newStatus)))
                ->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)))
                ->executeStatement();
            $qb = $this->db->getQueryBuilder();
            $qb->insert('sgds_workflow_log')->values([
                'dossier_id' => $qb->createNamedParameter($dossierId),
                'from_status' => $qb->createNamedParameter($dossier['status']),
                'to_status' => $qb->createNamedParameter($newStatus),
                'actor_user_id' => $qb->createNamedParameter($result['actorUserId']),
                'comment' => $qb->createNamedParameter($comment),
                'grille_pilier' => $qb->createNamedParameter($grilleScores ? json_encode($grilleScores) : null),
            ])->executeStatement();
            return new DataResponse(['status' => 'ok', 'from'=>$dossier['status'], 'to'=>$newStatus]);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[NoAdminRequired]
    public function nextStates(int $dossierId): DataResponse
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('status')->from('sgds_dossier')->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)));
        $row = $qb->executeQuery()->fetchAssociative();
        if (!$row) return new DataResponse(['error' => 'Non trouvé'], 404);
        return new DataResponse([
            'current' => $row['status'],
            'next' => $this->workflowService->getNextStates($row['status']),
            'assignedTo' => $this->workflowService->getActorForState($row['status']),
        ]);
    }
}
