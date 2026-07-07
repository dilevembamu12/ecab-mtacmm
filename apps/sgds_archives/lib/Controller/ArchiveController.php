<?php
declare(strict_types=1);
namespace OCA\SgdsArchives\Controller;

use OCA\SgdsArchives\Service\ArchiveService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class ArchiveController extends Controller
{
    public function __construct(IRequest $request, private ArchiveService $archiveService) {
        parent::__construct('sgds_archives', $request);
    }

    #[NoAdminRequired]
    public function archive(int $dossierId): DataResponse {
        try { return new DataResponse($this->archiveService->archive($dossierId)); }
        catch (\RuntimeException $e) { return new DataResponse(['error'=>$e->getMessage()], 400); }
    }

    #[NoAdminRequired]
    public function verify(int $dossierId): DataResponse {
        try { return new DataResponse($this->archiveService->verifyIntegrity($dossierId)); }
        catch (\RuntimeException $e) { return new DataResponse(['error'=>$e->getMessage()], 404); }
    }

    #[NoAdminRequired]
    public function export(int $dossierId): DataResponse {
        try { return new DataResponse($this->archiveService->exportPais($dossierId)); }
        catch (\RuntimeException $e) { return new DataResponse(['error'=>$e->getMessage()], 400); }
    }

    #[NoAdminRequired]
    public function list(): DataResponse {
        return new DataResponse($this->archiveService->listArchives());
    }
}
