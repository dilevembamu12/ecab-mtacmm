<div class="sgds-widget sgds-widget-pending">
    <style>
        .sgds-widget { font-family: system-ui, sans-serif; padding: 8px 12px; font-size: 13px; }
        .sgds-widget-pending .dossier-item { display: flex; align-items: center; padding: 6px 0; border-bottom: 1px solid #eee; gap: 8px; }
        .sgds-widget-pending .dossier-num { font-weight: 600; color: #1a3a5c; min-width: 80px; }
        .sgds-widget-pending .dossier-titre { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sgds-widget-pending .dossier-statut { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 500; }
        .stat-BROUILLON { background: #e5e7eb; color: #374151; }
        .stat-SOUMIS { background: #dbeafe; color: #1e40af; }
        .stat-EXAMEN_FORME { background: #ffedd5; color: #92400e; }
        .stat-ANALYSE_FOND { background: #ede9fe; color: #5b21b6; }
        .stat-AVIS_FAVORABLE { background: #d1fae5; color: #065f46; }
        .stat-AVIS_DEFAVORABLE { background: #fee2e2; color: #991b1b; }
        .stat-PRET_VISA { background: #cffafe; color: #155e75; }
        .stat-VISE { background: #d1fae5; color: #065f46; }
        .empty { text-align: center; padding: 20px; color: #9ca3af; }
        .btn { display: inline-block; margin-top: 10px; padding: 6px 14px; background: #1a3a5c; color: #fff; border-radius: 6px; text-decoration: none; font-size: 12px; }
    </style>
    <?php if (empty($dossiers)): ?>
        <div class="empty">📭 Aucun dossier en attente<br><a href="/index.php/apps/files/" class="btn">➕ Nouveau dossier</a></div>
    <?php else: ?>
        <?php foreach ($dossiers as $d): ?>
            <div class="dossier-item">
                <span class="dossier-num">SGDS-<?php p($d['id']); ?></span>
                <span class="dossier-titre" title="<?php p($d['title'] ?? ''); ?>"><?php p(mb_strlen($d['title'] ?? '') > 35 ? mb_substr($d['title'] ?? '', 0, 35) . '…' : ($d['title'] ?? '')); ?></span>
                <span class="dossier-statut stat-<?php p($d['status']); ?>"><?php p($statusLabels[$d['status']] ?? $d['status']); ?></span>
            </div>
        <?php endforeach; ?>
        <a href="/index.php/apps/files/" class="btn">📂 Voir tous les dossiers</a>
    <?php endif; ?>
</div>
