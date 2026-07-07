<div class="sgds-widget sgds-widget-circuit">
    <style>
        .sgds-widget-circuit { font-family: system-ui, sans-serif; padding: 8px 4px; }
        .circuit-steps { display: flex; flex-wrap: wrap; gap: 4px; }
        .circuit-step { 
            flex: 0 0 auto; 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 11px; 
            font-weight: 500;
            white-space: nowrap;
            border: 1px solid #e5e7eb;
        }
        .circuit-arrow { align-self: center; color: #9ca3af; font-size: 12px; }
    </style>
    <div class="circuit-steps">
        <?php 
        $arrow = '<span class="circuit-arrow">→</span>';
        $first = true;
        foreach ($etapes as $status => $info):
            $count = $countMap[$status] ?? 0;
            $countBadge = $count > 0 ? " ({$count})" : '';
            if (!$first) echo $arrow;
            $first = false;
        ?>
            <span class="circuit-step" style="background:<?php p($info[2]); ?>20; color:<?php p($info[2]); ?>;">
                <?php p($info[0].' '.$info[1].$countBadge); ?>
            </span>
        <?php endforeach; ?>
    </div>
</div>
