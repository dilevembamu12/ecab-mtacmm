<?php
declare(strict_types=1);
namespace OCA\SgdsMailgate\Controller;

use OCA\SgdsMailgate\Service\MailgateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class MailgateController extends Controller
{
    public function __construct(IRequest $request, private MailgateService $mailgateService) {
        parent::__construct('sgds_mailgate', $request);
    }

    #[NoAdminRequired]
    public function poll(): DataResponse {
        try {
            $dossiers = $this->mailgateService->pollInbox();
            return new DataResponse(['status' => 'ok', 'count' => count($dossiers), 'ids' => $dossiers]);
        } catch (\RuntimeException $e) {
            return new DataResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[NoAdminRequired]
    public function status(): DataResponse {
        return new DataResponse(['configured' => true, 'host' => '{imap.gmail.com:993/imap/ssl}INBOX']);
    }
}
