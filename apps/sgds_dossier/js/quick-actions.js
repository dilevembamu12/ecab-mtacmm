(function(){
'use strict';
// Wait for widget container using MutationObserver
var observer=new MutationObserver(function(){
    var w=document.querySelector('[data-widget-id="sgds_quick_actions"]');
    if(!w)return;
    observer.disconnect();
    w.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;">'+
        '<a href="'+OC.generateUrl('/apps/files/')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;background:#1a3a5c;color:white;">➕ Nouveau dossier</a>'+
        '<a href="'+OC.generateUrl('/apps/files/')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">📂 Fichiers</a>'+
        '<a href="'+OC.generateUrl('/apps/sgds_kpi/api/dashboard')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">📊 KPIs</a>'+
        '<a href="#" onclick="document.querySelector(\'[data-search]\')?.click();return false;" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">🔍 Rechercher</a>'+
    '</div>';
});
observer.observe(document.body,{childList:true,subtree:true});
// Also try immediate render
setTimeout(function(){
    var w=document.querySelector('[data-widget-id="sgds_quick_actions"]');
    if(w && !w.textContent.trim()){observer.disconnect();
        w.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;">'+
        '<a href="'+OC.generateUrl('/apps/files/')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;background:#1a3a5c;color:white;">➕ Nouveau dossier</a>'+
        '<a href="'+OC.generateUrl('/apps/files/')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">📂 Fichiers</a>'+
        '<a href="'+OC.generateUrl('/apps/sgds_kpi/api/dashboard')+'" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">📊 KPIs</a>'+
        '<a href="#" onclick="document.querySelector(\'[data-search]\')?.click();return false;" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:14px 10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9em;border:1px solid #d1d5db;color:#1f2937;background:white;">🔍 Rechercher</a>'+
    '</div>';}
},2000);
})();



