/*! third party licenses: js/vendor.LICENSE.txt */
import{_ as g,C as w,G as C,d as v,l as u,b as P,a as z,p as S,q as E,g as F,s as W,D,E as T,y as A}from"./NcSelect-CknHatsl.chunk.mjs";import{p as R}from"./chunk-4BX2VUAB-BBIbMRWG.chunk.mjs";import{p as Y}from"./treemap-KMMF4GRG-DIOlRGn1.chunk.mjs";import"./whiteboard-main.mjs";import"./index-BazmyFQi.chunk.mjs";import"./vendor-DsWkVfAM.chunk.mjs";import"./index-B1bsjjJt.chunk.mjs";import"./index-Bn0s6V7w.chunk.mjs";import"./index-vg7q3Iku.chunk.mjs";import"./translation-DoG5ZELJ-2LXT9-yc.chunk.mjs";import"./percentages-BXMCSKIN-D6x-nnv3.chunk.mjs";import"./useJwtStore-Cd1qRrRA.chunk.mjs";import"./NcPasswordField-D2iDTTpp-DULfdc3z.chunk.mjs";import"./_plugin-vue2_normalizer-DvGFrmqB.chunk.mjs";import"./NcCheckboxRadioSwitch-ezquUuPz-Be_81ffq.chunk.mjs";import"./isEmpty-DxmJ9h_e.chunk.mjs";import"./line-nuX2diqu.chunk.mjs";import"./array-Cg_lHFoG.chunk.mjs";import"./path-i7Zvihw6.chunk.mjs";import"./_baseUniq-BSbgWsiN.chunk.mjs";import"./_basePickBy-CpcSJqlT.chunk.mjs";import"./has-DsWMmVbW.chunk.mjs";import"./clone-CL2VRaTe.chunk.mjs";var H=D.packet,f,y=(f=class{constructor(){this.packet=[],this.setAccTitle=P,this.getAccTitle=z,this.setDiagramTitle=S,this.getDiagramTitle=E,this.getAccDescription=F,this.setAccDescription=W}getConfig(){const t=w({...H,...T().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){A(),this.packet=[]}},g(f,"PacketDB"),f),L=1e4,M=g((e,t)=>{R(e,t);let a=-1,o=[],l=1;const{bitsPerRow:n}=t.getConfig();for(let{start:r,end:s,bits:d,label:c}of e.blocks){if(r!==void 0&&s!==void 0&&s<r)throw new Error(`Packet block ${r} - ${s} is invalid. End must be greater than start.`);if(r??(r=a+1),r!==a+1)throw new Error(`Packet block ${r} - ${s??r} is not contiguous. It should start from ${a+1}.`);if(d===0)throw new Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(s??(s=r+(d??1)-1),d??(d=s-r+1),a=s,u.debug(`Packet block ${r} - ${a} with label ${c}`);o.length<=n+1&&t.getPacket().length<L;){const[p,i]=j({start:r,end:s,bits:d,label:c},l,n);if(o.push(p),p.end+1===l*n&&(t.pushWord(o),o=[],l++),!i)break;({start:r,end:s,bits:d,label:c}=i)}}t.pushWord(o)},"populate"),j=g((e,t,a)=>{if(e.start===void 0)throw new Error("start should have been set during first phase");if(e.end===void 0)throw new Error("end should have been set during first phase");if(e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*a)return[e,void 0];const o=t*a-1,l=t*a;return[{start:e.start,end:o,label:e.label,bits:o-e.start},{start:l,end:e.end,label:e.label,bits:e.end-l}]},"getNextFittingBlock"),x={parser:{yy:void 0},parse:g(async e=>{const t=await Y("packet",e),a=x.parser?.yy;if(!(a instanceof y))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");u.debug(t),M(t,a)},"parse")},q=g((e,t,a,o)=>{const l=o.db,n=l.getConfig(),{rowHeight:r,paddingY:s,bitWidth:d,bitsPerRow:c}=n,p=l.getPacket(),i=l.getDiagramTitle(),h=r+s,b=h*(p.length+1)-(i?0:r),k=d*c+2,m=C(t);m.attr("viewbox",`0 0 ${k} ${b}`),v(m,b,k,n.useMaxWidth);for(const[$,B]of p.entries())G(m,B,$,n);m.append("text").text(i).attr("x",k/2).attr("y",b-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),G=g((e,t,a,{rowHeight:o,paddingX:l,paddingY:n,bitWidth:r,bitsPerRow:s,showBits:d})=>{const c=e.append("g"),p=a*(o+n)+n;for(const i of t){const h=i.start%s*r+1,b=(i.end-i.start+1)*r-l;if(c.append("rect").attr("x",h).attr("y",p).attr("width",b).attr("height",o).attr("class","packetBlock"),c.append("text").attr("x",h+b/2).attr("y",p+o/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(i.label),!d)continue;const k=i.end===i.start,m=p-2;c.append("text").attr("x",h+(k?b/2:0)).attr("y",m).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(i.start),k||c.append("text").attr("x",h+b).attr("y",m).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(i.end)}},"drawWord"),I={draw:q},N={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},_=g(({packet:e}={})=>{const t=w(N,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},"styles"),mt={parser:x,get db(){return new y},renderer:I,styles:_};export{mt as diagram};
//# sourceMappingURL=diagram-S2PKOQOG-D5Wcgl_O.chunk.mjs.map
