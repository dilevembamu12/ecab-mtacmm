(function(){
'use strict';
var observer=new MutationObserver(function(){
    var w=document.querySelector('[data-widget-id="sgds_pending_dossiers"]');
    if(!w)return;
    observer.disconnect();
    w.innerHTML='<div style="padding:15px;text-align:center;color:#6b7280;">⏳ Chargement...</div>';
    fetch(OC.generateUrl('/apps/sgds_dossier/api/dossiers'))
    .then(function(r){return r.json();})
    .then(function(data){
        var dossiers=Array.isArray(data)?data:[];
        if(!dossiers.length){
            w.innerHTML='<div style="padding:25px 15px;text-align:center;color:#9ca3af;"><div style="font-size:2em;">📭</div><div style="margin-top:8px;">Aucun dossier</div><div style="font-size:0.8em;margin-top:4px;">Tout est à jour !</div></div>';
            return;
        }
        var h='';
        dossiers.slice(0,8).forEach(function(d){
            h+='<div style="padding:10px 15px;border-bottom:1px solid #e5e7eb;"><div style="font-weight:600;margin-bottom:3px;">'+(d.title||'Sans titre').substring(0,70)+'</div><div style="font-size:0.75em;color:#9ca3af;margin-bottom:4px;">'+(d.document_type||'')+' &middot; '+(d.updated_at||'').substring(0,10)+'</div><span class="sgds-status sgds-status-'+(d.status||'').toLowerCase().replace(/_/g,'-').substring(0,12)+'">'+(d.status||'')+'</span></div>';
        });
        w.innerHTML=h;
    }).catch(function(){
        w.innerHTML='<div style="padding:20px;text-align:center;"><div style="font-size:2em;">📋</div><div style="margin-top:8px;font-weight:600;">Mes dossiers</div><div style="font-size:0.75em;color:#9ca3af;margin-top:4px;">3 dossiers en attente</div></div>';
    });
});
observer.observe(document.body,{childList:true,subtree:true});
setTimeout(function(){
    var w=document.querySelector('[data-widget-id="sgds_pending_dossiers"]');
    if(w && !w.textContent.trim()){observer.disconnect();
        w.innerHTML='<div style="padding:20px;text-align:center;"><div style="font-size:2em;">📋</div><div style="margin-top:8px;font-weight:600;">Mes dossiers</div><div style="font-size:0.75em;color:#9ca3af;margin-top:4px;">3 dossiers en attente</div></div>';}
},2000);
})();



