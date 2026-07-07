<?php
declare(strict_types=1);
namespace OCA\SgdsGrille\Controller;

use OCA\SgdsGrille\Service\GrilleService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class GrilleController extends Controller
{
    public function __construct(IRequest $request, private GrilleService $grilleService) {
        parent::__construct('sgds_grille', $request);
    }

    #[NoAdminRequired]
    public function save(int $dossierId, array $scores, array $commentaires, string $recommandation = 'FAVORABLE'): DataResponse {
        try {
            return new DataResponse($this->grilleService->saveEvaluation($dossierId, $scores, $commentaires, $recommandation));
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[NoAdminRequired]
    public function get(int $dossierId): DataResponse {
        return new DataResponse($this->grilleService->getEvaluations($dossierId));
    }

    #[NoAdminRequired]
    public function pillars(): DataResponse {
        return new DataResponse(GrilleService::PILIERS);
    }
}
