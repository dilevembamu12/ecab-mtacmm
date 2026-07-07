<?php

declare(strict_types=1);

namespace OCA\SgdsSynthese\Service;

use OCP\IDBConnection;
use Psr\Log\LoggerInterface;

/**
 * Generates PDF synthesis sheets for dossier validation.
 *
 * The synthesis includes:
 * - Document summary
 * - 4-pillar scores with visual representation
 * - Opinions from each Pôle 5 actor
 * - Workflow history
 * - Final recommendation
 */
class SyntheseService
{
    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Generate synthesis data for a dossier (to be rendered as PDF or HTML)
     */
    public function generateSynthese(int $dossierId): array
    {
        // Fetch dossier info
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from('sgds_dossier')
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($dossierId)));
        $dossier = $qb->executeQuery()->fetchAssociative();

        if (!$dossier) {
            throw new \RuntimeException("Dossier #$dossierId non trouvé");
        }

        // Fetch grille evaluations
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from('sgds_grille_pilier')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('created_at', 'ASC');
        $grilles = $qb->executeQuery()->fetchAllAssociative();

        // Fetch workflow history
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from('sgds_workflow_log')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('created_at', 'ASC');
        $historique = $qb->executeQuery()->fetchAllAssociative();

        // Fetch linked files
        $qb = $this->db->getQueryBuilder();
        $qb->select('df.*', 'fc.path', 'fc.name')
            ->from('sgds_dossier_file', 'df')
            ->leftJoin('df', 'filecache', 'fc', 'df.file_id = fc.fileid')
            ->where($qb->expr()->eq('df.dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('df.sort_order', 'ASC');
        $fichiers = $qb->executeQuery()->fetchAllAssociative();

        // Fetch metadata for the principal document
        $metadata = [];
        $docPrincipal = array_filter($fichiers, fn($f) => $f['role'] === 'DOCUMENT_PRINCIPAL');
        if (!empty($docPrincipal)) {
            $fileId = reset($docPrincipal)['file_id'];
            $qb = $this->db->getQueryBuilder();
            $qb->select('v.value', 's.field_label', 's.field_name')
                ->from('sgds_metadata_value', 'v')
                ->innerJoin('v', 'sgds_metadata_schema', 's', 'v.schema_id = s.id')
                ->where($qb->expr()->eq('v.file_id', $qb->createNamedParameter($fileId)));
            $metadataRows = $qb->executeQuery()->fetchAllAssociative();
            foreach ($metadataRows as $row) {
                $metadata[$row['field_label']] = $row['value'];
            }
        }

        return [
            'dossier' => $dossier,
            'grilles' => $grilles,
            'historique' => $historique,
            'fichiers' => $fichiers,
            'metadata' => $metadata,
            'generatedAt' => date('Y-m-d H:i:s'),
            'generatedBy' => 'SGDS Automatique',
        ];
    }

    /**
     * Render synthesis as HTML (for preview or PDF conversion)
     */
    public function renderHtml(array $syntheseData): string
    {
        $d = $syntheseData['dossier'];
        $grilles = $syntheseData['grilles'];
        $historique = $syntheseData['historique'];
        $metadata = $syntheseData['metadata'];

        $html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">';
        $html .= '<title>Fiche de Synthèse — ' . htmlspecialchars($d['title']) . '</title>';
        $html .= '<style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; }
            .header { border-bottom: 3px solid #1a56db; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { color: #1a56db; margin:0; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #1a56db; font-size: 1.2em; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background: #f0f4ff; }
            .score { font-weight: bold; font-size: 1.1em; }
            .score-favorable { color: #059669; }
            .score-defavorable { color: #dc2626; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: bold; }
            .status-favorable { background: #d1fae5; color: #065f46; }
            .status-defavorable { background: #fee2e2; color: #991b1b; }
            .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 0.8em; color: #666; }
        </style></head><body>';

        // Header
        $html .= '<div class="header">';
        $html .= '<h1>🇨🇬 Fiche de Synthèse</h1>';
        $html .= '<p><strong>Dossier :</strong> ' . htmlspecialchars($d['title']) . '</p>';
        $html .= '<p><strong>Type :</strong> ' . htmlspecialchars($d['document_type']) . '</p>';
        $html .= '<p><strong>Statut :</strong> ' . htmlspecialchars($d['status']) . '</p>';
        $html .= '<p><strong>Créé le :</strong> ' . htmlspecialchars($d['created_at']) . '</p>';
        $html .= '</div>';

        // Metadata
        if (!empty($metadata)) {
            $html .= '<div class="section"><h2>📋 Métadonnées du Document</h2><table>';
            foreach ($metadata as $label => $value) {
                $html .= '<tr><th>' . htmlspecialchars($label) . '</th><td>' . htmlspecialchars($value ?? '—') . '</td></tr>';
            }
            $html .= '</table></div>';
        }

        // Grille 4 piliers
        if (!empty($grilles)) {
            $lastGrille = end($grilles);
            $html .= '<div class="section"><h2>📐 Grille d\'Analyse — 4 Piliers</h2><table>';
            $piliers = ['opportunite' => 'Opportunité', 'conformite' => 'Conformité', 'forme' => 'Forme', 'fond' => 'Fond'];
            foreach ($piliers as $key => $label) {
                $scoreField = "score_$key";
                $commentField = "commentaire_$key";
                $score = (int)($lastGrille[$scoreField] ?? 0);
                $stars = str_repeat('★', $score) . str_repeat('☆', 5 - $score);
                $html .= '<tr>';
                $html .= '<th>' . $label . '</th>';
                $html .= '<td>' . $stars . ' (' . $score . '/5)</td>';
                $html .= '<td>' . htmlspecialchars($lastGrille[$commentField] ?? '') . '</td>';
                $html .= '</tr>';
            }
            $html .= '</table>';

            // Score pondéré
            $scoresForCalc = [
                'opportunite' => (int)($lastGrille['score_opportunite'] ?? 0),
                'conformite' => (int)($lastGrille['score_conformite'] ?? 0),
                'forme' => (int)($lastGrille['score_forme'] ?? 0),
                'fond' => (int)($lastGrille['score_fond'] ?? 0),
            ];
            $weights = ['opportunite' => 30, 'conformite' => 30, 'forme' => 20, 'fond' => 20];
            $total = 0;
            foreach ($scoresForCalc as $k => $v) { $total += $v * $weights[$k]; }
            $pondere = round(($total / 500) * 20, 1);

            $reco = $lastGrille['recommandation'] ?? 'FAVORABLE';
            $recoClass = $reco === 'FAVORABLE' ? 'status-favorable' : 'status-defavorable';
            $html .= '<p><strong>Score pondéré :</strong> <span class="score">' . $pondere . '/20</span></p>';
            $html .= '<p><strong>Recommandation :</strong> <span class="status-badge ' . $recoClass . '">' . $reco . '</span></p>';
            $html .= '</div>';
        }

        // Workflow history
        if (!empty($historique)) {
            $html .= '<div class="section"><h2>🔄 Historique du Circuit</h2><table>';
            $html .= '<tr><th>Date</th><th>De</th><th>Vers</th><th>Acteur</th><th>Commentaire</th></tr>';
            foreach ($historique as $entry) {
                $html .= '<tr>';
                $html .= '<td>' . htmlspecialchars($entry['created_at']) . '</td>';
                $html .= '<td>' . htmlspecialchars($entry['from_status']) . '</td>';
                $html .= '<td>' . htmlspecialchars($entry['to_status']) . '</td>';
                $html .= '<td>' . htmlspecialchars($entry['actor_user_id']) . '</td>';
                $html .= '<td>' . htmlspecialchars($entry['comment'] ?? '') . '</td>';
                $html .= '</tr>';
            }
            $html .= '</table></div>';
        }

        $html .= '<div class="footer"><p>Document généré automatiquement par SGDS — MTACMM</p>';
        $html .= '<p>Généré le ' . $syntheseData['generatedAt'] . '</p></div>';
        $html .= '</body></html>';

        return $html;
    }
}
