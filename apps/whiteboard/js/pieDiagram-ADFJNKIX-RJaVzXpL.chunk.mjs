/*! third party licenses: js/vendor.LICENSE.txt */
import{g as V,s as _,a as j,b as H,q as J,p as K,_ as o,l as $,c as Q,C as U,G as X,I as Y,d as Z,y as tt,D as et}from"./NcSelect-CknHatsl.chunk.mjs";import{p as at}from"./chunk-4BX2VUAB-BBIbMRWG.chunk.mjs";import{p as it}from"./treemap-KMMF4GRG-DIOlRGn1.chunk.mjs";import"./isEmpty-DxmJ9h_e.chunk.mjs";import{a as R}from"./arc-CH8CF3kk.chunk.mjs";import{o as rt}from"./ordinal-Bt1svyuw.chunk.mjs";import{p as ot}from"./pie-CbaqBsNa.chunk.mjs";import"./whiteboard-main.mjs";import"./index-BazmyFQi.chunk.mjs";import"./vendor-DsWkVfAM.chunk.mjs";import"./index-B1bsjjJt.chunk.mjs";import"./index-Bn0s6V7w.chunk.mjs";import"./index-vg7q3Iku.chunk.mjs";import"./translation-DoG5ZELJ-2LXT9-yc.chunk.mjs";import"./percentages-BXMCSKIN-D6x-nnv3.chunk.mjs";import"./useJwtStore-Cd1qRrRA.chunk.mjs";import"./NcPasswordField-D2iDTTpp-DULfdc3z.chunk.mjs";import"./_plugin-vue2_normalizer-DvGFrmqB.chunk.mjs";import"./NcCheckboxRadioSwitch-ezquUuPz-Be_81ffq.chunk.mjs";import"./line-nuX2diqu.chunk.mjs";import"./array-Cg_lHFoG.chunk.mjs";import"./path-i7Zvihw6.chunk.mjs";import"./_baseUniq-BSbgWsiN.chunk.mjs";import"./_basePickBy-CpcSJqlT.chunk.mjs";import"./has-DsWMmVbW.chunk.mjs";import"./clone-CL2VRaTe.chunk.mjs";import"./init-q33yAy1W.chunk.mjs";var lt=et.pie,v={sections:new Map,showData:!1},m=v.sections,y=v.showData,st=structuredClone(lt),pt=o(()=>structuredClone(st),"getConfig"),nt=o(()=>{m=new Map,y=v.showData,tt()},"clear"),ct=o(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);m.has(t)||(m.set(t,a),$.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),dt=o(()=>m,"getSections"),mt=o(t=>{y=t},"setShowData"),ut=o(()=>y,"getShowData"),W={getConfig:pt,clear:nt,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:H,getAccTitle:j,setAccDescription:_,getAccDescription:V,addSection:ct,getSections:dt,setShowData:mt,getShowData:ut},gt=o((t,a)=>{at(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),ht={parse:o(async t=>{const a=await it("pie",t);$.debug(a),gt(a,W)},"parse")},ft=o(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),wt=ft,xt=o(t=>{const a=[...t.values()].reduce((r,l)=>r+l,0),b=[...t.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return ot().value(r=>r.value)(b)},"createPieArcs"),St=o((t,a,b,r)=>{$.debug(`rendering pie chart
`+t);const l=r.db,D=Q(),C=U(l.getConfig(),D.pie),T=40,s=18,c=4,n=450,u=n,g=X(a),p=g.append("g");p.attr("transform","translate("+u/2+","+n/2+")");const{themeVariables:i}=D;let[k]=Y(i.pieOuterStrokeWidth);k??(k=2);const A=C.textPosition,d=Math.min(u,n)/2-T,B=R().innerRadius(0).outerRadius(d),E=R().innerRadius(d*A).outerRadius(d*A);p.append("circle").attr("cx",0).attr("cy",0).attr("r",d+k/2).attr("class","pieOuterCircle");const h=l.getSections(),L=xt(h),P=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let f=0;h.forEach(e=>{f+=e});const z=L.filter(e=>(e.data.value/f*100).toFixed(0)!=="0"),w=rt(P);p.selectAll("mySlices").data(z).enter().append("path").attr("d",B).attr("fill",e=>w(e.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(z).enter().append("text").text(e=>(e.data.value/f*100).toFixed(0)+"%").attr("transform",e=>"translate("+E.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=[...h.entries()].map(([e,S])=>({label:e,value:S})),x=p.selectAll(".legend").data(O).enter().append("g").attr("class","legend").attr("transform",(e,S)=>{const M=s+c,G=M*O.length/2,I=12*s,N=S*M-G;return"translate("+I+","+N+")"});x.append("rect").attr("width",s).attr("height",s).style("fill",e=>w(e.label)).style("stroke",e=>w(e.label)),x.append("text").attr("x",s+c).attr("y",s-c).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);const q=Math.max(...x.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0)),F=u+T+s+c+q;g.attr("viewBox",`0 0 ${F} ${n}`),Z(g,n,F,C.useMaxWidth)},"draw"),$t={draw:St},Kt={parser:ht,db:W,renderer:$t,styles:wt};export{Kt as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-RJaVzXpL.chunk.mjs.map
