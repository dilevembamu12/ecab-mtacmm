<?php
declare(strict_types=1);
namespace OCA\SgdsKpi\Controller;

use OCA\SgdsKpi\Service\KpiService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class KpiController extends Controller
{
    public function __construct(IRequest $request, private KpiService $kpiService) {
        parent::__construct('sgds_kpi', $request);
    }

    #[NoAdminRequired]
    public function dashboard(): DataResponse {
        return new DataResponse($this->kpiService->getDashboard());
    }

    #[NoAdminRequired]
    public function overdue(): DataResponse {
        return new DataResponse($this->kpiService->getDossiersEnRetard());
    }
}
