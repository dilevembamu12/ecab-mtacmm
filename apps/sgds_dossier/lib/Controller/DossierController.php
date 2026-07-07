<?php
declare(strict_types=1);
namespace OCA\SgdsDossier\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IDBConnection;
use OCP\IRequest;
use OCP\IUserSession;

class DossierController extends Controller
{
    public function __construct(
        IRequest $request,
        private IDBConnection $db,
        private IUserSession $userSession,
    ) {
        parent::__construct('sgds_dossier', $request);
    }

    #[NoAdminRequired]
    public function index(string $status = '', string $assignedTo = '', int $limit = 50): DataResponse
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('d.*', $qb->func()->count('df.id', 'file_count'))
            ->from('sgds_dossier', 'd')
            ->leftJoin('d', 'sgds_dossier_file', 'df', 'd.id = df.dossier_id')
            ->groupBy('d.id')->orderBy('d.updated_at', 'DESC')->setMaxResults($limit);
        if ($status) {
            $qb->andWhere($qb->expr()->eq('d.status', $qb->createNamedParameter($status)));
        }
        if ($assignedTo) {
            $qb->andWhere($qb->expr()->eq('d.assigned_to', $qb->createNamedParameter($assignedTo)));
        }
        return new DataResponse($qb->executeQuery()->fetchAllAssociative());
    }

    #[NoAdminRequired]
    public function show(int $id): DataResponse
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_dossier')->where($qb->expr()->eq('id', $qb->createNamedParameter($id)));
        $d = $qb->executeQuery()->fetchAssociative();
        if (!$d) return new DataResponse(['error' => 'Non trouvé'], 404);

        $qb = $this->db->getQueryBuilder();
        $qb->select('df.*', 'fc.name', 'fc.mimetype')
            ->from('sgds_dossier_file', 'df')
            ->leftJoin('df', 'filecache', 'fc', 'df.file_id = fc.fileid')
            ->where($qb->expr()->eq('df.dossier_id', $qb->createNamedParameter($id)));
        $fichiers = $qb->executeQuery()->fetchAllAssociative();

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_workflow_log')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($id)))
            ->orderBy('created_at', 'ASC');
        $historique = $qb->executeQuery()->fetchAllAssociative();

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from('sgds_grille_pilier')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($id)))
            ->orderBy('created_at', 'ASC');
        $grilles = $qb->executeQuery()->fetchAllAssociative();

        return new DataResponse(['dossier' => $d, 'fichiers' => $fichiers, 'historique' => $historique, 'grilles' => $grilles]);
    }

    #[NoAdminRequired]
    public function create(string $title, string $documentType = 'courrier_arrivee', string $description = ''): DataResponse
    {
        $user = $this->userSession->getUser();
        $uid = $user ? $user->getUID() : 'system';
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_dossier')->values([
            'title' => $qb->createNamedParameter($title),
            'description' => $qb->createNamedParameter($description),
            'document_type' => $qb->createNamedParameter($documentType),
            'status' => $qb->createNamedParameter('BROUILLON'),
            'created_by' => $qb->createNamedParameter($uid),
        ])->executeStatement();
        $id = (int)$qb->getLastInsertId();
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_workflow_log')->values([
            'dossier_id' => $qb->createNamedParameter($id),
            'from_status' => $qb->createNamedParameter(''),
            'to_status' => $qb->createNamedParameter('BROUILLON'),
            'actor_user_id' => $qb->createNamedParameter($uid),
            'comment' => $qb->createNamedParameter('Création du dossier'),
        ])->executeStatement();
        return new DataResponse(['id' => $id, 'status' => 'BROUILLON']);
    }
}
