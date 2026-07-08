/*! third party licenses: js/vendor.LICENSE.txt */
import{s as S,g as I,q as E,p as F,a as z,b as D,_ as l,G as P,y as R,C as v,D as G,E as w,l as B,K as V}from"./NcSelect-CknHatsl.chunk.mjs";import{p as W}from"./chunk-4BX2VUAB-BBIbMRWG.chunk.mjs";import{p as _}from"./treemap-KMMF4GRG-DIOlRGn1.chunk.mjs";import"./whiteboard-main.mjs";import"./index-BazmyFQi.chunk.mjs";import"./vendor-DsWkVfAM.chunk.mjs";import"./index-B1bsjjJt.chunk.mjs";import"./index-Bn0s6V7w.chunk.mjs";import"./index-vg7q3Iku.chunk.mjs";import"./translation-DoG5ZELJ-2LXT9-yc.chunk.mjs";import"./percentages-BXMCSKIN-D6x-nnv3.chunk.mjs";import"./useJwtStore-Cd1qRrRA.chunk.mjs";import"./NcPasswordField-D2iDTTpp-DULfdc3z.chunk.mjs";import"./_plugin-vue2_normalizer-DvGFrmqB.chunk.mjs";import"./NcCheckboxRadioSwitch-ezquUuPz-Be_81ffq.chunk.mjs";import"./isEmpty-DxmJ9h_e.chunk.mjs";import"./line-nuX2diqu.chunk.mjs";import"./array-Cg_lHFoG.chunk.mjs";import"./path-i7Zvihw6.chunk.mjs";import"./_baseUniq-BSbgWsiN.chunk.mjs";import"./_basePickBy-CpcSJqlT.chunk.mjs";import"./has-DsWMmVbW.chunk.mjs";import"./clone-CL2VRaTe.chunk.mjs";var x={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:x},h=structuredClone(b),j=G.radar,q=l(()=>v({...j,...w().radar}),"getConfig"),C=l(()=>h.axes,"getAxes"),H=l(()=>h.curves,"getCurves"),K=l(()=>h.options,"getOptions"),Z=l(a=>{h.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=l(a=>{h.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:N(t.entries)}))},"setCurves"),N=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=C();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(i=>i.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),Q=l(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});h.options={showLegend:t.showLegend?.value??x.showLegend,ticks:t.ticks?.value??x.ticks,max:t.max?.value??x.max,min:t.min?.value??x.min,graticule:t.graticule?.value??x.graticule}},"setOptions"),U=l(()=>{R(),h=structuredClone(b)},"clear"),f={getAxes:C,getCurves:H,getOptions:K,setAxes:Z,setCurves:J,setOptions:Q,getConfig:q,clear:U,setAccTitle:D,getAccTitle:z,setDiagramTitle:F,getDiagramTitle:E,getAccDescription:I,setAccDescription:S},X=l(a=>{W(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),Y={parse:l(async a=>{const t=await _("radar",a);B.debug(t),X(t)},"parse")},tt=l((a,t,e,r)=>{const i=r.db,n=i.getAxes(),o=i.getCurves(),s=i.getOptions(),c=i.getConfig(),p=i.getDiagramTitle(),m=P(t),d=et(m,c),g=s.max??Math.max(...o.map(y=>Math.max(...y.entries))),u=s.min,$=Math.min(c.width,c.height)/2;at(d,n,$,s.ticks,s.graticule),rt(d,n,$,c),M(d,n,o,u,g,s.graticule,c),A(d,o,s.showLegend,c),d.append("text").attr("class","radarTitle").text(p).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),at=l((a,t,e,r,i)=>{if(i==="circle")for(let n=0;n<r;n++){const o=e*(n+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(i==="polygon"){const n=t.length;for(let o=0;o<r;o++){const s=e*(o+1)/r,c=t.map((p,m)=>{const d=2*m*Math.PI/n-Math.PI/2,g=s*Math.cos(d),u=s*Math.sin(d);return`${g},${u}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{const i=t.length;for(let n=0;n<i;n++){const o=t[n].label,s=2*n*Math.PI/i-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(o).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function M(a,t,e,r,i,n,o){const s=t.length,c=Math.min(o.width,o.height)/2;e.forEach((p,m)=>{if(p.entries.length!==s)return;const d=p.entries.map((g,u)=>{const $=2*Math.PI*u/s-Math.PI/2,y=L(g,r,i,c),k=y*Math.cos($),O=y*Math.sin($);return{x:k,y:O}});n==="circle"?a.append("path").attr("d",T(d,o.curveTension)).attr("class",`radarCurve-${m}`):n==="polygon"&&a.append("polygon").attr("points",d.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${m}`)})}l(M,"drawCurves");function L(a,t,e,r){const i=Math.min(Math.max(a,t),e);return r*(i-t)/(e-t)}l(L,"relativeRadius");function T(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let i=0;i<e;i++){const n=a[(i-1+e)%e],o=a[i],s=a[(i+1)%e],c=a[(i+2)%e],p={x:o.x+(s.x-n.x)*t,y:o.y+(s.y-n.y)*t},m={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${p.x},${p.y} ${m.x},${m.y} ${s.x},${s.y}`}return`${r} Z`}l(T,"closedRoundCurve");function A(a,t,e,r){if(!e)return;const i=(r.width/2+r.marginRight)*3/4,n=-(r.height/2+r.marginTop)*3/4,o=20;t.forEach((s,c)=>{const p=a.append("g").attr("transform",`translate(${i}, ${n+c*o})`);p.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),p.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(A,"drawLegend");var it={draw:tt},st=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const i=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return e},"genIndexStyles"),nt=l(a=>{const t=V(),e=w(),r=v(t,e.themeVariables),i=v(r.radar,a);return{themeVariables:r,radarOptions:i}},"buildRadarStyleOptions"),ot=l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=nt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${st(t,e)}
	`},"styles"),It={parser:Y,db:f,renderer:it,styles:ot};export{It as diagram};
//# sourceMappingURL=diagram-QEK2KX5R-CWO7mmXo.chunk.mjs.map
