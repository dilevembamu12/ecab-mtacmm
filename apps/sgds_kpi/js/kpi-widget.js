(function(){'use strict';
if(!window.OCA||!window.OCA.Dashboard)return;
OCA.Dashboard.registerWidget({
id:'sgds_kpi',title:'📊 SGDS — Tableau de Bord',icon:'icon-category-organization',
render:function(){
var c=document.createElement('div');
c.innerHTML='<div class="sgds-republic-banner"></div><div class="sgds-motto">République du Congo — Unité • Travail • Progrès</div><div class="sgds-kpi-grid"><div class="sgds-kpi-card"><div class="kpi-value" id="kpi-actifs">—</div><div class="kpi-label">Dossiers Actifs</div></div><div class="sgds-kpi-card"><div class="kpi-value" id="kpi-approuves">—</div><div class="kpi-label">Approuvés</div></div><div class="sgds-kpi-card"><div class="kpi-value" id="kpi-retard">—</div><div class="kpi-label">En Retard</div></div><div class="sgds-kpi-card"><div class="kpi-value" id="kpi-total">—</div><div class="kpi-label">Total Dossiers</div></div></div>';
fetch(OC.generateUrl('/apps/sgds_kpi/api/dashboard')).then(r=>r.json()).then(d=>{
var s=d.dossiersParStatut||{},t=d.tauxApprobation||{},r=d.dossiersEnRetard||[];
var active=(s.SOUMIS||0)+(s.EXAMEN_FORME||0)+(s.ANALYSE_FOND||0)+(s.PRET_VISA||0)+(s.AVIS_FAVORABLE||0);
c.querySelector('#kpi-actifs').textContent=active;
c.querySelector('#kpi-approuves').textContent=t.approuves||0;
c.querySelector('#kpi-retard').textContent=r.length;
c.querySelector('#kpi-total').textContent=t.total||0;
if(r.length>3)c.querySelectorAll('.sgds-kpi-card')[2].classList.add('alert');
}).catch(function(e){console.error('KPI:',e)});
return c;
}});
})();
