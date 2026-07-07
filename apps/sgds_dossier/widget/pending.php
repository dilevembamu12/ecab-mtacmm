<?php
// Widget: Mes dossiers en attente — e-Cabinet MTACMM
// Ce fichier est appelé via getUrl() du widget IWidget
header('Content-Type: text/html; charset=utf-8');
header('X-Frame-Options: SAMEORIGIN');

// Connexion DB (utilise les constantes Nextcloud)
$CONFIG = include '/www/wwwroot/EXTERNE/FBB/MINISTERE-PROJET-ZERO-PAPIER/app_developpement/others_app_for_inspiration/nextcloud/config/config.php';
$pdo = new PDO(
    "mysql:host={$CONFIG['dbhost']};dbname={$CONFIG['dbname']};charset=utf8mb4",
    $CONFIG['dbuser'],
    $CONFIG['dbpassword']
);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->query("SELECT id, numero_dossier, titre, statut, date_creation FROM sgds_dossier WHERE statut NOT IN ('SIGNE', 'ARCHIVED') ORDER BY date_modification DESC LIMIT 5");
$dossiers = $stmt->fetchAll(PDO::FETCH_ASSOC);

$statusLabels = [
    'BROUILLON' => '📝 Brouillon',
    'SOUMIS' => '📤 Soumis',
    'EXAMEN_FORME' => '🔍 Examen forme',
    'ANALYSE_FOND' => '📊 Analyse fond',
    'AVIS_FAVORABLE' => '✅ Avis favorable',
    'AVIS_DEFAVORABLE' => '❌ Défavorable',
    'PRET_VISA' => '✍️ Prêt visa',
    'VISE' => '👁️ Visé',
];
?><!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;font-size:13px;padding:8px 12px;background:transparent;color:#333}
.dossier-item{display:flex;align-items:center;padding:6px 0;border-bottom:1px solid #eee;gap:8px}
.dossier-num{font-weight:600;color:#1a3a5c;min-width:100px}
.dossier-titre{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dossier-statut{font-size:11px;padding:2px 8px;border-radius:10px;font-weight:500}
.stat-BROUILLON{background:#e5e7eb;color:#374151}
.stat-SOUMIS{background:#dbeafe;color:#1e40af}
.stat-EXAMEN_FORME{background:#ffedd5;color:#92400e}
.stat-ANALYSE_FOND{background:#ede9fe;color:#5b21b6}
.stat-AVIS_FAVORABLE{background:#d1fae5;color:#065f46}
.stat-AVIS_DEFAVORABLE{background:#fee2e2;color:#991b1b}
.stat-PRET_VISA{background:#cffafe;color:#155e75}
.stat-VISE{background:#d1fae5;color:#065f46}
.empty{text-align:center;padding:20px;color:#9ca3af}
.btn{display:inline-block;margin-top:10px;padding:6px 14px;background:#1a3a5c;color:#fff!important;border-radius:6px;text-decoration:none;font-size:12px}
</style></head><body>
<?php if (empty($dossiers)): ?>
<div class="empty">📭 Aucun dossier en attente<br><a href="/index.php/apps/files/" class="btn">➕ Nouveau dossier</a></div>
<?php else: ?>
<?php foreach ($dossiers as $d): ?>
<div class="dossier-item">
<span class="dossier-num"><?= htmlspecialchars($d['numero_dossier'] ?? 'SGDS-'.$d['id']) ?></span>
<span class="dossier-titre" title="<?= htmlspecialchars($d['titre']) ?>"><?= htmlspecialchars(mb_strlen($d['titre']) > 35 ? mb_substr($d['titre'], 0, 35).'…' : $d['titre']) ?></span>
<span class="dossier-statut stat-<?= $d['statut'] ?>"><?= $statusLabels[$d['statut']] ?? $d['statut'] ?></span>
</div>
<?php endforeach; ?>
<a href="/index.php/apps/files/" class="btn">📂 Voir tous les dossiers</a>
<?php endif; ?>
</body></html>