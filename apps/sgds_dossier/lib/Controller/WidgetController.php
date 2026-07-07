<?php
declare(strict_types=1);
namespace OCA\SgdsDossier\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\IDBConnection;
use OCP\IRequest;
use OCP\IUserSession;

class WidgetController extends Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private IDBConnection $db,
        private IUserSession $userSession,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Render the "Mes dossiers en attente" widget.
     * @NoCSRFRequired
     * @NoAdminRequired
     * @PublicPage
     */
    public function pending(): DataDisplayResponse
    {
        $user = $this->userSession->getUser();
        $userId = $user ? $user->getUID() : '';

        $dossiers = $this->db->executeQuery(
            "SELECT id, title, document_type, status, created_at FROM sgds_dossier WHERE status NOT IN ('SIGNE', 'ARCHIVED') ORDER BY updated_at DESC LIMIT 5"
        )->fetchAll();

        $statusLabels = [
            'BROUILLON' => '📝 Brouillon',
            'SOUMIS' => '📤 Soumis',
            'EXAMEN_FORME' => '🔍 Examen forme',
            'ANALYSE_FOND' => '📊 Analyse fond',
            'AVIS_FAVORABLE' => '✅ Avis favorable',
            'AVIS_DEFAVORABLE' => '❌ Avis défavorable',
            'PRET_VISA' => '✍️ Prêt visa',
            'VISE' => '👁️ Visé',
        ];

        ob_start();
        include __DIR__ . '/../../templates/widget-pending.php';
        $html = ob_get_clean();
        return new DataDisplayResponse($html);
    }

    /**
     * Render the "Actions rapides" widget.
     * @NoCSRFRequired
     * @NoAdminRequired
     */
    public function quickActions(): DataDisplayResponse
    {
        ob_start();
        include __DIR__ . '/../../templates/widget-actions.php';
        $html = ob_get_clean();
        return new DataDisplayResponse($html);
    }
}
