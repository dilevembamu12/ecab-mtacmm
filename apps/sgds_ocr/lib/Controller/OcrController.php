<?php
declare(strict_types=1);
namespace OCA\SgdsOcr\Controller;

use OCA\SgdsOcr\Service\OcrService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;
use OCP\IUserSession;

class OcrController extends Controller
{
    public function __construct(
        IRequest $request,
        private OcrService $ocrService,
        private IUserSession $userSession,
    ) { parent::__construct('sgds_ocr', $request); }

    #[NoAdminRequired]
    public function process(int $fileId): DataResponse {
        $user = $this->userSession->getUser();
        if (!$user) return new DataResponse(['error'=>'Non authentifié'], 401);
        try {
            return new DataResponse($this->ocrService->processFile($fileId, $user->getUID()));
        } catch (\RuntimeException $e) {
            return new DataResponse(['error'=>$e->getMessage()], 400);
        }
    }
}
