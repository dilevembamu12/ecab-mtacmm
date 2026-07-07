<?php
declare(strict_types=1);
namespace OCA\SgdsSynthese\Controller;

use OCA\SgdsSynthese\Service\SyntheseService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class SyntheseController extends Controller
{
    public function __construct(IRequest $request, private SyntheseService $syntheseService) {
        parent::__construct('sgds_synthese', $request);
    }

    #[NoAdminRequired]
    public function generate(int $dossierId, string $format = 'html'): DataResponse {
        try {
            $data = $this->syntheseService->generateSynthese($dossierId);
            $html = $this->syntheseService->renderHtml($data);
            return new DataResponse(['html' => $html, 'data' => $data]);
        } catch (\RuntimeException $e) {
            return new DataResponse(['error' => $e->getMessage()], 404);
        }
    }
}
