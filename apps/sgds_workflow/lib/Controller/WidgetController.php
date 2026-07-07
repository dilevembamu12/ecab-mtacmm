<?php
declare(strict_types=1);
namespace OCA\SgdsWorkflow\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\IDBConnection;
use OCP\IRequest;

class WidgetController extends Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private IDBConnection $db,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * @NoCSRFRequired
     * @NoAdminRequired
     */
    public function circuit(): DataDisplayResponse
    {
        $etapes = [
            'BROUILLON' => ['📝', 'Brouillon', '#6b7280'],
            'SOUMIS' => ['📤', 'Soumis', '#3b82f6'],
            'EXAMEN_FORME' => ['🔍', 'Examen forme', '#f59e0b'],
            'ANALYSE_FOND' => ['📊', 'Analyse fond', '#8b5cf6'],
            'AVIS_FAVORABLE' => ['✅', 'Avis favorable', '#10b981'],
            'AVIS_DEFAVORABLE' => ['❌', 'Défavorable', '#ef4444'],
            'PRET_VISA' => ['✍️', 'Prêt visa', '#06b6d4'],
            'VISE' => ['👁️', 'Visé', '#10b981'],
            'SIGNE' => ['🏁', 'Signé', '#1a3a5c'],
        ];

        $counts = $this->db->executeQuery(
            "SELECT status as statut, COUNT(*) as nb FROM sgds_dossier GROUP BY status"
        )->fetchAll();
        $countMap = [];
        foreach ($counts as $c) {
            $countMap[$c['statut']] = (int) $c['nb'];
        }

        ob_start();
        include __DIR__ . '/../../templates/widget-circuit.php';
        $html = ob_get_clean();
        return new DataDisplayResponse($html);
    }
}
