(function(){
'use strict';
var observer=new MutationObserver(function(){
    var w=document.querySelector('[data-widget-id="sgds_circuit_view"]');
    if(!w)return;
    observer.disconnect();
    var steps=[
        {icon:'📝',label:'Brouillon',actor:'Assistante'},
        {icon:'📤',label:'Soumis',actor:'Assistante'},
        {icon:'🔍',label:'Examen Forme',actor:'Attaché'},
        {icon:'🧠',label:'Analyse Fond',actor:'CAJ+RLI'},
        {icon:'📊',label:'Avis',actor:'Conseiller'},
        {icon:'👔',label:'Prêt Visa',actor:'Dircab'},
        {icon:'✍️',label:'Visé',actor:'Dircab'},
        {icon:'🏁',label:'Signé',actor:'Ministre'}
    ];
    var h='<div style="display:flex;align-items:flex-start;justify-content:center;flex-wrap:wrap;padding:12px 4px;overflow-x:auto;">';
    steps.forEach(function(s,i){
        h+='<div style="text-align:center;min-width:62px;padding:3px;">'+
           '<div style="font-size:1.4em;">'+s.icon+'</div>'+
           '<div style="font-size:0.6em;font-weight:700;color:#1a3a5c;text-transform:uppercase;">'+s.label+'</div>'+
           '<div style="font-size:0.55em;color:#9ca3af;">'+s.actor+'</div></div>';
        if(i<steps.length-1) h+='<div style="font-size:0.9em;color:#c8a83e;font-weight:bold;padding:8px 1px;">→</div>';
    });
    h+='</div><div style="text-align:center;font-size:0.65em;color:#9ca3af;padding:6px 10px 8px;border-top:1px solid #e5e7eb;">💡 Allez dans <b>Fichiers</b> pour gérer le circuit</div>';
    w.innerHTML=h;
});
observer.observe(document.body,{childList:true,subtree:true});
setTimeout(function(){
    var w=document.querySelector('[data-widget-id="sgds_circuit_view"]');
    if(w && !w.textContent.trim()){observer.disconnect();
        var steps=[{icon:'📝',label:'Brouillon',actor:'Assistante'},{icon:'📤',label:'Soumis',actor:'Assistante'},{icon:'🔍',label:'Examen Forme',actor:'Attaché'},{icon:'🧠',label:'Analyse Fond',actor:'CAJ+RLI'},{icon:'📊',label:'Avis',actor:'Conseiller'},{icon:'👔',label:'Prêt Visa',actor:'Dircab'},{icon:'✍️',label:'Visé',actor:'Dircab'},{icon:'🏁',label:'Signé',actor:'Ministre'}];
        var h='<div style="display:flex;align-items:flex-start;justify-content:center;flex-wrap:wrap;padding:12px 4px;overflow-x:auto;">';
        steps.forEach(function(s,i){h+='<div style="text-align:center;min-width:62px;padding:3px;"><div style="font-size:1.4em;">'+s.icon+'</div><div style="font-size:0.6em;font-weight:700;color:#1a3a5c;text-transform:uppercase;">'+s.label+'</div><div style="font-size:0.55em;color:#9ca3af;">'+s.actor+'</div></div>';if(i<steps.length-1)h+='<div style="font-size:0.9em;color:#c8a83e;font-weight:bold;padding:8px 1px;">→</div>';});
        h+='</div><div style="text-align:center;font-size:0.65em;color:#9ca3af;padding:6px 10px 8px;border-top:1px solid #e5e7eb;">💡 Allez dans <b>Fichiers</b> pour gérer le circuit</div>';
        w.innerHTML=h;}
},2000);
})();



