/*! third party licenses: js/vendor.LICENSE.txt */
var o=async(n=[{}])=>(Array.isArray(n)||(n=[n]),new Promise((c,l)=>{const e=document.createElement("input");e.type="file";const s=[...n.map(i=>i.mimeTypes||[]),...n.map(i=>i.extensions||[])].join();e.multiple=n[0].multiple||!1,e.accept=s||"";const t=i=>{typeof a=="function"&&a(),c(i)},a=n[0].legacySetup&&n[0].legacySetup(t,()=>a(l),e);e.addEventListener("change",()=>{t(e.multiple?Array.from(e.files):e.files[0])}),e.click()}));export{o as default};
//# sourceMappingURL=file-open-7c801643-RWLsqpR6.chunk.mjs.map
