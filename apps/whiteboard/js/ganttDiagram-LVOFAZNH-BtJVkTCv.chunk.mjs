/*! third party licenses: js/vendor.LICENSE.txt */
import{g as ie,s as se,q as ne,p as re,a as ae,b as oe,_ as c,c as G,d as ce,l as ht,j as le,i as de,y as ue,u as he}from"./NcSelect-CknHatsl.chunk.mjs";import{s as lt,d as E}from"./isEmpty-DxmJ9h_e.chunk.mjs";import{t as fe,m as ke,a as ye,i as me,b as pe,c as Bt,d as Wt,e as ge,f as be,g as xe,h as Te,j as ve,k as _e,l as we,n as Yt,o as Nt,p as Mt,s as zt,q as Vt,r as Ce,u as $e,v as De,w as Se}from"./advancedFormat-Dp8V0_Qr.chunk.mjs";import{l as Ee}from"./linear-NOH7Z385.chunk.mjs";import"./whiteboard-main.mjs";import"./index-BazmyFQi.chunk.mjs";import"./vendor-DsWkVfAM.chunk.mjs";import"./index-B1bsjjJt.chunk.mjs";import"./index-Bn0s6V7w.chunk.mjs";import"./index-vg7q3Iku.chunk.mjs";import"./translation-DoG5ZELJ-2LXT9-yc.chunk.mjs";import"./percentages-BXMCSKIN-D6x-nnv3.chunk.mjs";import"./useJwtStore-Cd1qRrRA.chunk.mjs";import"./NcPasswordField-D2iDTTpp-DULfdc3z.chunk.mjs";import"./_plugin-vue2_normalizer-DvGFrmqB.chunk.mjs";import"./NcCheckboxRadioSwitch-ezquUuPz-Be_81ffq.chunk.mjs";import"./line-nuX2diqu.chunk.mjs";import"./array-Cg_lHFoG.chunk.mjs";import"./path-i7Zvihw6.chunk.mjs";import"./init-q33yAy1W.chunk.mjs";import"./defaultLocale-slEEJlip.chunk.mjs";var xt=function(){var e=c(function(T,o,d,l){for(d=d||{},l=T.length;l--;d[T[l]]=o);return d},"o"),i=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],n=[1,26],a=[1,27],s=[1,28],u=[1,29],p=[1,30],W=[1,31],O=[1,32],A=[1,33],S=[1,34],I=[1,9],Y=[1,10],V=[1,11],P=[1,12],v=[1,13],J=[1,14],K=[1,15],Q=[1,16],R=[1,19],tt=[1,20],et=[1,21],it=[1,22],st=[1,23],k=[1,25],x=[1,35],g={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(T,o,d,l,h,t,f){var r=t.length-1;switch(h){case 1:return t[r-1];case 2:this.$=[];break;case 3:t[r-1].push(t[r]),this.$=t[r-1];break;case 4:case 5:this.$=t[r];break;case 6:case 7:this.$=[];break;case 8:l.setWeekday("monday");break;case 9:l.setWeekday("tuesday");break;case 10:l.setWeekday("wednesday");break;case 11:l.setWeekday("thursday");break;case 12:l.setWeekday("friday");break;case 13:l.setWeekday("saturday");break;case 14:l.setWeekday("sunday");break;case 15:l.setWeekend("friday");break;case 16:l.setWeekend("saturday");break;case 17:l.setDateFormat(t[r].substr(11)),this.$=t[r].substr(11);break;case 18:l.enableInclusiveEndDates(),this.$=t[r].substr(18);break;case 19:l.TopAxis(),this.$=t[r].substr(8);break;case 20:l.setAxisFormat(t[r].substr(11)),this.$=t[r].substr(11);break;case 21:l.setTickInterval(t[r].substr(13)),this.$=t[r].substr(13);break;case 22:l.setExcludes(t[r].substr(9)),this.$=t[r].substr(9);break;case 23:l.setIncludes(t[r].substr(9)),this.$=t[r].substr(9);break;case 24:l.setTodayMarker(t[r].substr(12)),this.$=t[r].substr(12);break;case 27:l.setDiagramTitle(t[r].substr(6)),this.$=t[r].substr(6);break;case 28:this.$=t[r].trim(),l.setAccTitle(this.$);break;case 29:case 30:this.$=t[r].trim(),l.setAccDescription(this.$);break;case 31:l.addSection(t[r].substr(8)),this.$=t[r].substr(8);break;case 33:l.addTask(t[r-1],t[r]),this.$="task";break;case 34:this.$=t[r-1],l.setClickEvent(t[r-1],t[r],null);break;case 35:this.$=t[r-2],l.setClickEvent(t[r-2],t[r-1],t[r]);break;case 36:this.$=t[r-2],l.setClickEvent(t[r-2],t[r-1],null),l.setLink(t[r-2],t[r]);break;case 37:this.$=t[r-3],l.setClickEvent(t[r-3],t[r-2],t[r-1]),l.setLink(t[r-3],t[r]);break;case 38:this.$=t[r-2],l.setClickEvent(t[r-2],t[r],null),l.setLink(t[r-2],t[r-1]);break;case 39:this.$=t[r-3],l.setClickEvent(t[r-3],t[r-1],t[r]),l.setLink(t[r-3],t[r-2]);break;case 40:this.$=t[r-1],l.setLink(t[r-1],t[r]);break;case 41:case 47:this.$=t[r-1]+" "+t[r];break;case 42:case 43:case 45:this.$=t[r-2]+" "+t[r-1]+" "+t[r];break;case 44:case 46:this.$=t[r-3]+" "+t[r-2]+" "+t[r-1]+" "+t[r];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},e(i,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:a,14:s,15:u,16:p,17:W,18:O,19:18,20:A,21:S,22:I,23:Y,24:V,25:P,26:v,27:J,28:K,29:Q,30:R,31:tt,33:et,35:it,36:st,37:24,38:k,40:x},e(i,[2,7],{1:[2,1]}),e(i,[2,3]),{9:36,11:17,12:n,13:a,14:s,15:u,16:p,17:W,18:O,19:18,20:A,21:S,22:I,23:Y,24:V,25:P,26:v,27:J,28:K,29:Q,30:R,31:tt,33:et,35:it,36:st,37:24,38:k,40:x},e(i,[2,5]),e(i,[2,6]),e(i,[2,17]),e(i,[2,18]),e(i,[2,19]),e(i,[2,20]),e(i,[2,21]),e(i,[2,22]),e(i,[2,23]),e(i,[2,24]),e(i,[2,25]),e(i,[2,26]),e(i,[2,27]),{32:[1,37]},{34:[1,38]},e(i,[2,30]),e(i,[2,31]),e(i,[2,32]),{39:[1,39]},e(i,[2,8]),e(i,[2,9]),e(i,[2,10]),e(i,[2,11]),e(i,[2,12]),e(i,[2,13]),e(i,[2,14]),e(i,[2,15]),e(i,[2,16]),{41:[1,40],43:[1,41]},e(i,[2,4]),e(i,[2,28]),e(i,[2,29]),e(i,[2,33]),e(i,[2,34],{42:[1,42],43:[1,43]}),e(i,[2,40],{41:[1,44]}),e(i,[2,35],{43:[1,45]}),e(i,[2,36]),e(i,[2,38],{42:[1,46]}),e(i,[2,37]),e(i,[2,39])],defaultActions:{},parseError:c(function(T,o){if(o.recoverable)this.trace(T);else{var d=new Error(T);throw d.hash=o,d}},"parseError"),parse:c(function(T){var o=this,d=[0],l=[],h=[null],t=[],f=this.table,r="",_=0,m=0,C=2,w=1,yt=t.slice.call(arguments,1),$=Object.create(this.lexer),q={yy:{}};for(var mt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,mt)&&(q.yy[mt]=this.yy[mt]);$.setInput(T,q.yy),q.yy.lexer=$,q.yy.parser=this,typeof $.yylloc>"u"&&($.yylloc={});var pt=$.yylloc;t.push(pt);var te=$.options&&$.options.ranges;typeof q.yy.parseError=="function"?this.parseError=q.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ee(L){d.length=d.length-2*L,h.length=h.length-L,t.length=t.length-L}c(ee,"popStack");function Ot(){var L;return L=l.pop()||$.lex()||w,typeof L!="number"&&(L instanceof Array&&(l=L,L=l.pop()),L=o.symbols_[L]||L),L}c(Ot,"lex");for(var F,j,B,gt,H={},ot,M,Pt,ct;;){if(j=d[d.length-1],this.defaultActions[j]?B=this.defaultActions[j]:((F===null||typeof F>"u")&&(F=Ot()),B=f[j]&&f[j][F]),typeof B>"u"||!B.length||!B[0]){var bt="";ct=[];for(ot in f[j])this.terminals_[ot]&&ot>C&&ct.push("'"+this.terminals_[ot]+"'");$.showPosition?bt="Parse error on line "+(_+1)+`:
`+$.showPosition()+`
Expecting `+ct.join(", ")+", got '"+(this.terminals_[F]||F)+"'":bt="Parse error on line "+(_+1)+": Unexpected "+(F==w?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(bt,{text:$.match,token:this.terminals_[F]||F,line:$.yylineno,loc:pt,expected:ct})}if(B[0]instanceof Array&&B.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+F);switch(B[0]){case 1:d.push(F),h.push($.yytext),t.push($.yylloc),d.push(B[1]),F=null,m=$.yyleng,r=$.yytext,_=$.yylineno,pt=$.yylloc;break;case 2:if(M=this.productions_[B[1]][1],H.$=h[h.length-M],H._$={first_line:t[t.length-(M||1)].first_line,last_line:t[t.length-1].last_line,first_column:t[t.length-(M||1)].first_column,last_column:t[t.length-1].last_column},te&&(H._$.range=[t[t.length-(M||1)].range[0],t[t.length-1].range[1]]),gt=this.performAction.apply(H,[r,m,_,q.yy,B[1],h,t].concat(yt)),typeof gt<"u")return gt;M&&(d=d.slice(0,-1*M*2),h=h.slice(0,-1*M),t=t.slice(0,-1*M)),d.push(this.productions_[B[1]][0]),h.push(H.$),t.push(H._$),Pt=f[d[d.length-2]][d[d.length-1]],d.push(Pt);break;case 3:return!0}}return!0},"parse")},b=function(){var T={EOF:1,parseError:c(function(o,d){if(this.yy.parser)this.yy.parser.parseError(o,d);else throw new Error(o)},"parseError"),setInput:c(function(o,d){return this.yy=d||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var d=o.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:c(function(o){var d=o.length,l=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var t=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===h.length?this.yylloc.first_column:0)+h[h.length-l.length].length-l[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[t[0],t[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(o){this.unput(this.match.slice(o))},"less"),pastInput:c(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var o=this.pastInput(),d=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+d+"^"},"showPosition"),test_match:c(function(o,d){var l,h,t;if(this.options.backtrack_lexer&&(t={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(t.yylloc.range=this.yylloc.range.slice(0))),h=o[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],l=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var f in t)this[f]=t[f];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,d,l,h;this._more||(this.yytext="",this.match="");for(var t=this._currentRules(),f=0;f<t.length;f++)if(l=this._input.match(this.rules[t[f]]),l&&(!d||l[0].length>d[0].length)){if(d=l,h=f,this.options.backtrack_lexer){if(o=this.test_match(l,t[f]),o!==!1)return o;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(o=this.test_match(d,t[h]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var o=this.next();return o||this.lex()},"lex"),begin:c(function(o){this.conditionStack.push(o)},"begin"),popState:c(function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},"topState"),pushState:c(function(o){this.begin(o)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(o,d,l,h){switch(l){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return T}();g.lexer=b;function y(){this.yy={}}return c(y,"Parser"),y.prototype=g,g.Parser=y,new y}();xt.parser=xt;var Ae=xt;E.extend($e),E.extend(De),E.extend(Se);var qt={friday:5,saturday:6},N="",wt="",Ct=void 0,$t="",nt=[],rt=[],Dt=new Map,St=[],ft=[],Z="",Et="",Ht=["active","done","crit","milestone","vert"],At=[],at=!1,It=!1,Ft="sunday",kt="saturday",Tt=0,Ie=c(function(){St=[],ft=[],Z="",At=[],dt=0,_t=void 0,ut=void 0,D=[],N="",wt="",Et="",Ct=void 0,$t="",nt=[],rt=[],at=!1,It=!1,Tt=0,Dt=new Map,ue(),Ft="sunday",kt="saturday"},"clear"),Fe=c(function(e){wt=e},"setAxisFormat"),Le=c(function(){return wt},"getAxisFormat"),Oe=c(function(e){Ct=e},"setTickInterval"),Pe=c(function(){return Ct},"getTickInterval"),Be=c(function(e){$t=e},"setTodayMarker"),We=c(function(){return $t},"getTodayMarker"),Ye=c(function(e){N=e},"setDateFormat"),Ne=c(function(){at=!0},"enableInclusiveEndDates"),Me=c(function(){return at},"endDatesAreInclusive"),ze=c(function(){It=!0},"enableTopAxis"),Ve=c(function(){return It},"topAxisEnabled"),qe=c(function(e){Et=e},"setDisplayMode"),je=c(function(){return Et},"getDisplayMode"),Ue=c(function(){return N},"getDateFormat"),He=c(function(e){nt=e.toLowerCase().split(/[\s,]+/)},"setIncludes"),Ge=c(function(){return nt},"getIncludes"),Xe=c(function(e){rt=e.toLowerCase().split(/[\s,]+/)},"setExcludes"),Ze=c(function(){return rt},"getExcludes"),Je=c(function(){return Dt},"getLinks"),Ke=c(function(e){Z=e,St.push(e)},"addSection"),Qe=c(function(){return St},"getSections"),Re=c(function(){let e=jt();const i=10;let n=0;for(;!e&&n<i;)e=jt(),n++;return ft=D,ft},"getTasks"),Gt=c(function(e,i,n,a){const s=e.format(i.trim()),u=e.format("YYYY-MM-DD");return a.includes(s)||a.includes(u)?!1:n.includes("weekends")&&(e.isoWeekday()===qt[kt]||e.isoWeekday()===qt[kt]+1)||n.includes(e.format("dddd").toLowerCase())?!0:n.includes(s)||n.includes(u)},"isInvalidDate"),ti=c(function(e){Ft=e},"setWeekday"),ei=c(function(){return Ft},"getWeekday"),ii=c(function(e){kt=e},"setWeekend"),Xt=c(function(e,i,n,a){if(!n.length||e.manualEndTime)return;let s;e.startTime instanceof Date?s=E(e.startTime):s=E(e.startTime,i,!0),s=s.add(1,"d");let u;e.endTime instanceof Date?u=E(e.endTime):u=E(e.endTime,i,!0);const[p,W]=si(s,u,i,n,a);e.endTime=p.toDate(),e.renderEndTime=W},"checkTaskDates"),si=c(function(e,i,n,a,s){let u=!1,p=null;for(;e<=i;)u||(p=i.toDate()),u=Gt(e,n,a,s),u&&(i=i.add(1,"d")),e=e.add(1,"d");return[i,p]},"fixTaskDates"),vt=c(function(e,i,n){if(n=n.trim(),(i.trim()==="x"||i.trim()==="X")&&/^\d+$/.test(n))return new Date(Number(n));const a=/^after\s+(?<ids>[\d\w- ]+)/.exec(n);if(a!==null){let u=null;for(const W of a.groups.ids.split(" ")){let O=U(W);O!==void 0&&(!u||O.endTime>u.endTime)&&(u=O)}if(u)return u.endTime;const p=new Date;return p.setHours(0,0,0,0),p}let s=E(n,i.trim(),!0);if(s.isValid())return s.toDate();{ht.debug("Invalid date:"+n),ht.debug("With date format:"+i.trim());const u=new Date(n);if(u===void 0||isNaN(u.getTime())||u.getFullYear()<-1e4||u.getFullYear()>1e4)throw new Error("Invalid date:"+n);return u}},"getStartDate"),Zt=c(function(e){const i=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(e.trim());return i!==null?[Number.parseFloat(i[1]),i[2]]:[NaN,"ms"]},"parseDuration"),Jt=c(function(e,i,n,a=!1){n=n.trim();const s=/^until\s+(?<ids>[\d\w- ]+)/.exec(n);if(s!==null){let A=null;for(const I of s.groups.ids.split(" ")){let Y=U(I);Y!==void 0&&(!A||Y.startTime<A.startTime)&&(A=Y)}if(A)return A.startTime;const S=new Date;return S.setHours(0,0,0,0),S}let u=E(n,i.trim(),!0);if(u.isValid())return a&&(u=u.add(1,"d")),u.toDate();let p=E(e);const[W,O]=Zt(n);if(!Number.isNaN(W)){const A=p.add(W,O);A.isValid()&&(p=A)}return p.toDate()},"getEndDate"),dt=0,X=c(function(e){return e===void 0?(dt=dt+1,"task"+dt):e},"parseId"),ni=c(function(e,i){let n;i.substr(0,1)===":"?n=i.substr(1,i.length):n=i;const a=n.split(","),s={};Lt(a,s,Ht);for(let p=0;p<a.length;p++)a[p]=a[p].trim();let u="";switch(a.length){case 1:s.id=X(),s.startTime=e.endTime,u=a[0];break;case 2:s.id=X(),s.startTime=vt(void 0,N,a[0]),u=a[1];break;case 3:s.id=X(a[0]),s.startTime=vt(void 0,N,a[1]),u=a[2];break}return u&&(s.endTime=Jt(s.startTime,N,u,at),s.manualEndTime=E(u,"YYYY-MM-DD",!0).isValid(),Xt(s,N,rt,nt)),s},"compileData"),ri=c(function(e,i){let n;i.substr(0,1)===":"?n=i.substr(1,i.length):n=i;const a=n.split(","),s={};Lt(a,s,Ht);for(let u=0;u<a.length;u++)a[u]=a[u].trim();switch(a.length){case 1:s.id=X(),s.startTime={type:"prevTaskEnd",id:e},s.endTime={data:a[0]};break;case 2:s.id=X(),s.startTime={type:"getStartDate",startData:a[0]},s.endTime={data:a[1]};break;case 3:s.id=X(a[0]),s.startTime={type:"getStartDate",startData:a[1]},s.endTime={data:a[2]};break}return s},"parseData"),_t,ut,D=[],Kt={},ai=c(function(e,i){const n={section:Z,type:Z,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:i},task:e,classes:[]},a=ri(ut,i);n.raw.startTime=a.startTime,n.raw.endTime=a.endTime,n.id=a.id,n.prevTaskId=ut,n.active=a.active,n.done=a.done,n.crit=a.crit,n.milestone=a.milestone,n.vert=a.vert,n.order=Tt,Tt++;const s=D.push(n);ut=n.id,Kt[n.id]=s-1},"addTask"),U=c(function(e){const i=Kt[e];return D[i]},"findTaskById"),oi=c(function(e,i){const n={section:Z,type:Z,description:e,task:e,classes:[]},a=ni(_t,i);n.startTime=a.startTime,n.endTime=a.endTime,n.id=a.id,n.active=a.active,n.done=a.done,n.crit=a.crit,n.milestone=a.milestone,n.vert=a.vert,_t=n,ft.push(n)},"addTaskOrg"),jt=c(function(){const e=c(function(n){const a=D[n];let s="";switch(D[n].raw.startTime.type){case"prevTaskEnd":{const u=U(a.prevTaskId);a.startTime=u.endTime;break}case"getStartDate":s=vt(void 0,N,D[n].raw.startTime.startData),s&&(D[n].startTime=s);break}return D[n].startTime&&(D[n].endTime=Jt(D[n].startTime,N,D[n].raw.endTime.data,at),D[n].endTime&&(D[n].processed=!0,D[n].manualEndTime=E(D[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Xt(D[n],N,rt,nt))),D[n].processed},"compileTask");let i=!0;for(const[n,a]of D.entries())e(n),i=i&&a.processed;return i},"compileTasks"),ci=c(function(e,i){let n=i;G().securityLevel!=="loose"&&(n=de.sanitizeUrl(i)),e.split(",").forEach(function(a){U(a)!==void 0&&(Rt(a,()=>{window.open(n,"_self")}),Dt.set(a,n))}),Qt(e,"clickable")},"setLink"),Qt=c(function(e,i){e.split(",").forEach(function(n){let a=U(n);a!==void 0&&a.classes.push(i)})},"setClass"),li=c(function(e,i,n){if(G().securityLevel!=="loose"||i===void 0)return;let a=[];if(typeof n=="string"){a=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let s=0;s<a.length;s++){let u=a[s].trim();u.startsWith('"')&&u.endsWith('"')&&(u=u.substr(1,u.length-2)),a[s]=u}}a.length===0&&a.push(e),U(e)!==void 0&&Rt(e,()=>{he.runFunc(i,...a)})},"setClickFun"),Rt=c(function(e,i){At.push(function(){const n=document.querySelector(`[id="${e}"]`);n!==null&&n.addEventListener("click",function(){i()})},function(){const n=document.querySelector(`[id="${e}-text"]`);n!==null&&n.addEventListener("click",function(){i()})})},"pushFun"),di=c(function(e,i,n){e.split(",").forEach(function(a){li(a,i,n)}),Qt(e,"clickable")},"setClickEvent"),ui=c(function(e){At.forEach(function(i){i(e)})},"bindFunctions"),hi={getConfig:c(()=>G().gantt,"getConfig"),clear:Ie,setDateFormat:Ye,getDateFormat:Ue,enableInclusiveEndDates:Ne,endDatesAreInclusive:Me,enableTopAxis:ze,topAxisEnabled:Ve,setAxisFormat:Fe,getAxisFormat:Le,setTickInterval:Oe,getTickInterval:Pe,setTodayMarker:Be,getTodayMarker:We,setAccTitle:oe,getAccTitle:ae,setDiagramTitle:re,getDiagramTitle:ne,setDisplayMode:qe,getDisplayMode:je,setAccDescription:se,getAccDescription:ie,addSection:Ke,getSections:Qe,getTasks:Re,addTask:ai,findTaskById:U,addTaskOrg:oi,setIncludes:He,getIncludes:Ge,setExcludes:Xe,getExcludes:Ze,setClickEvent:di,setLink:ci,getLinks:Je,bindFunctions:ui,parseDuration:Zt,isInvalidDate:Gt,setWeekday:ti,getWeekday:ei,setWeekend:ii};function Lt(e,i,n){let a=!0;for(;a;)a=!1,n.forEach(function(s){const u="^\\s*"+s+"\\s*$",p=new RegExp(u);e[0].match(p)&&(i[s]=!0,e.shift(1),a=!0)})}c(Lt,"getTaskTags");var fi=c(function(){ht.debug("Something is calling, setConf, remove the call")},"setConf"),Ut={monday:we,tuesday:_e,wednesday:ve,thursday:Te,friday:xe,saturday:be,sunday:ge},ki=c((e,i)=>{let n=[...e].map(()=>-1/0),a=[...e].sort((u,p)=>u.startTime-p.startTime||u.order-p.order),s=0;for(const u of a)for(let p=0;p<n.length;p++)if(u.startTime>=n[p]){n[p]=u.endTime,u.order=p+i,p>s&&(s=p);break}return s},"getMaxIntersections"),z,yi=c(function(e,i,n,a){const s=G().gantt,u=G().securityLevel;let p;u==="sandbox"&&(p=lt("#i"+i));const W=u==="sandbox"?lt(p.nodes()[0].contentDocument.body):lt("body"),O=u==="sandbox"?p.nodes()[0].contentDocument:document,A=O.getElementById(i);z=A.parentElement.offsetWidth,z===void 0&&(z=1200),s.useWidth!==void 0&&(z=s.useWidth);const S=a.db.getTasks();let I=[];for(const k of S)I.push(k.type);I=st(I);const Y={};let V=2*s.topPadding;if(a.db.getDisplayMode()==="compact"||s.displayMode==="compact"){const k={};for(const g of S)k[g.section]===void 0?k[g.section]=[g]:k[g.section].push(g);let x=0;for(const g of Object.keys(k)){const b=ki(k[g],x)+1;x+=b,V+=b*(s.barHeight+s.barGap),Y[g]=b}}else{V+=S.length*(s.barHeight+s.barGap);for(const k of I)Y[k]=S.filter(x=>x.type===k).length}A.setAttribute("viewBox","0 0 "+z+" "+V);const P=W.select(`[id="${i}"]`),v=fe().domain([ke(S,function(k){return k.startTime}),ye(S,function(k){return k.endTime})]).rangeRound([0,z-s.leftPadding-s.rightPadding]);function J(k,x){const g=k.startTime,b=x.startTime;let y=0;return g>b?y=1:g<b&&(y=-1),y}c(J,"taskCompare"),S.sort(J),K(S,z,V),ce(P,V,z,s.useMaxWidth),P.append("text").text(a.db.getDiagramTitle()).attr("x",z/2).attr("y",s.titleTopMargin).attr("class","titleText");function K(k,x,g){const b=s.barHeight,y=b+s.barGap,T=s.topPadding,o=s.leftPadding,d=Ee().domain([0,I.length]).range(["#00B9FA","#F95002"]).interpolate(me);R(y,T,o,x,g,k,a.db.getExcludes(),a.db.getIncludes()),tt(o,T,x,g),Q(k,y,T,o,b,d,x),et(y,T),it(o,T,x,g)}c(K,"makeGantt");function Q(k,x,g,b,y,T,o){k.sort((t,f)=>t.vert===f.vert?0:t.vert?1:-1);const d=[...new Set(k.map(t=>t.order))].map(t=>k.find(f=>f.order===t));P.append("g").selectAll("rect").data(d).enter().append("rect").attr("x",0).attr("y",function(t,f){return f=t.order,f*x+g-2}).attr("width",function(){return o-s.rightPadding/2}).attr("height",x).attr("class",function(t){for(const[f,r]of I.entries())if(t.type===r)return"section section"+f%s.numberSectionStyles;return"section section0"}).enter();const l=P.append("g").selectAll("rect").data(k).enter(),h=a.db.getLinks();if(l.append("rect").attr("id",function(t){return t.id}).attr("rx",3).attr("ry",3).attr("x",function(t){return t.milestone?v(t.startTime)+b+.5*(v(t.endTime)-v(t.startTime))-.5*y:v(t.startTime)+b}).attr("y",function(t,f){return f=t.order,t.vert?s.gridLineStartPadding:f*x+g}).attr("width",function(t){return t.milestone?y:t.vert?.08*y:v(t.renderEndTime||t.endTime)-v(t.startTime)}).attr("height",function(t){return t.vert?S.length*(s.barHeight+s.barGap)+s.barHeight*2:y}).attr("transform-origin",function(t,f){return f=t.order,(v(t.startTime)+b+.5*(v(t.endTime)-v(t.startTime))).toString()+"px "+(f*x+g+.5*y).toString()+"px"}).attr("class",function(t){const f="task";let r="";t.classes.length>0&&(r=t.classes.join(" "));let _=0;for(const[C,w]of I.entries())t.type===w&&(_=C%s.numberSectionStyles);let m="";return t.active?t.crit?m+=" activeCrit":m=" active":t.done?t.crit?m=" doneCrit":m=" done":t.crit&&(m+=" crit"),m.length===0&&(m=" task"),t.milestone&&(m=" milestone "+m),t.vert&&(m=" vert "+m),m+=_,m+=" "+r,f+m}),l.append("text").attr("id",function(t){return t.id+"-text"}).text(function(t){return t.task}).attr("font-size",s.fontSize).attr("x",function(t){let f=v(t.startTime),r=v(t.renderEndTime||t.endTime);if(t.milestone&&(f+=.5*(v(t.endTime)-v(t.startTime))-.5*y,r=f+y),t.vert)return v(t.startTime)+b;const _=this.getBBox().width;return _>r-f?r+_+1.5*s.leftPadding>o?f+b-5:r+b+5:(r-f)/2+f+b}).attr("y",function(t,f){return t.vert?s.gridLineStartPadding+S.length*(s.barHeight+s.barGap)+60:(f=t.order,f*x+s.barHeight/2+(s.fontSize/2-2)+g)}).attr("text-height",y).attr("class",function(t){const f=v(t.startTime);let r=v(t.endTime);t.milestone&&(r=f+y);const _=this.getBBox().width;let m="";t.classes.length>0&&(m=t.classes.join(" "));let C=0;for(const[yt,$]of I.entries())t.type===$&&(C=yt%s.numberSectionStyles);let w="";return t.active&&(t.crit?w="activeCritText"+C:w="activeText"+C),t.done?t.crit?w=w+" doneCritText"+C:w=w+" doneText"+C:t.crit&&(w=w+" critText"+C),t.milestone&&(w+=" milestoneText"),t.vert&&(w+=" vertText"),_>r-f?r+_+1.5*s.leftPadding>o?m+" taskTextOutsideLeft taskTextOutside"+C+" "+w:m+" taskTextOutsideRight taskTextOutside"+C+" "+w+" width-"+_:m+" taskText taskText"+C+" "+w+" width-"+_}),G().securityLevel==="sandbox"){let t;t=lt("#i"+i);const f=t.nodes()[0].contentDocument;l.filter(function(r){return h.has(r.id)}).each(function(r){var _=f.querySelector("#"+r.id),m=f.querySelector("#"+r.id+"-text");const C=_.parentNode;var w=f.createElement("a");w.setAttribute("xlink:href",h.get(r.id)),w.setAttribute("target","_top"),C.appendChild(w),w.appendChild(_),w.appendChild(m)})}}c(Q,"drawRects");function R(k,x,g,b,y,T,o,d){if(o.length===0&&d.length===0)return;let l,h;for(const{startTime:m,endTime:C}of T)(l===void 0||m<l)&&(l=m),(h===void 0||C>h)&&(h=C);if(!l||!h)return;if(E(h).diff(E(l),"year")>5){ht.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const t=a.db.getDateFormat(),f=[];let r=null,_=E(l);for(;_.valueOf()<=h;)a.db.isInvalidDate(_,t,o,d)?r?r.end=_:r={start:_,end:_}:r&&(f.push(r),r=null),_=_.add(1,"d");P.append("g").selectAll("rect").data(f).enter().append("rect").attr("id",m=>"exclude-"+m.start.format("YYYY-MM-DD")).attr("x",m=>v(m.start.startOf("day"))+g).attr("y",s.gridLineStartPadding).attr("width",m=>v(m.end.endOf("day"))-v(m.start.startOf("day"))).attr("height",y-x-s.gridLineStartPadding).attr("transform-origin",function(m,C){return(v(m.start)+g+.5*(v(m.end)-v(m.start))).toString()+"px "+(C*k+.5*y).toString()+"px"}).attr("class","exclude-range")}c(R,"drawExcludeDays");function tt(k,x,g,b){const y=a.db.getDateFormat(),T=a.db.getAxisFormat();let o;T?o=T:y==="D"?o="%d":o=s.axisFormat??"%Y-%m-%d";let d=pe(v).tickSize(-b+x+s.gridLineStartPadding).tickFormat(Bt(o));const l=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(a.db.getTickInterval()||s.tickInterval);if(l!==null){const h=l[1],t=l[2],f=a.db.getWeekday()||s.weekday;switch(t){case"millisecond":d.ticks(Vt.every(h));break;case"second":d.ticks(zt.every(h));break;case"minute":d.ticks(Mt.every(h));break;case"hour":d.ticks(Nt.every(h));break;case"day":d.ticks(Yt.every(h));break;case"week":d.ticks(Ut[f].every(h));break;case"month":d.ticks(Wt.every(h));break}}if(P.append("g").attr("class","grid").attr("transform","translate("+k+", "+(b-50)+")").call(d).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),a.db.topAxisEnabled()||s.topAxis){let h=Ce(v).tickSize(-b+x+s.gridLineStartPadding).tickFormat(Bt(o));if(l!==null){const t=l[1],f=l[2],r=a.db.getWeekday()||s.weekday;switch(f){case"millisecond":h.ticks(Vt.every(t));break;case"second":h.ticks(zt.every(t));break;case"minute":h.ticks(Mt.every(t));break;case"hour":h.ticks(Nt.every(t));break;case"day":h.ticks(Yt.every(t));break;case"week":h.ticks(Ut[r].every(t));break;case"month":h.ticks(Wt.every(t));break}}P.append("g").attr("class","grid").attr("transform","translate("+k+", "+x+")").call(h).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(tt,"makeGrid");function et(k,x){let g=0;const b=Object.keys(Y).map(y=>[y,Y[y]]);P.append("g").selectAll("text").data(b).enter().append(function(y){const T=y[0].split(le.lineBreakRegex),o=-(T.length-1)/2,d=O.createElementNS("http://www.w3.org/2000/svg","text");d.setAttribute("dy",o+"em");for(const[l,h]of T.entries()){const t=O.createElementNS("http://www.w3.org/2000/svg","tspan");t.setAttribute("alignment-baseline","central"),t.setAttribute("x","10"),l>0&&t.setAttribute("dy","1em"),t.textContent=h,d.appendChild(t)}return d}).attr("x",10).attr("y",function(y,T){if(T>0)for(let o=0;o<T;o++)return g+=b[T-1][1],y[1]*k/2+g*k+x;else return y[1]*k/2+x}).attr("font-size",s.sectionFontSize).attr("class",function(y){for(const[T,o]of I.entries())if(y[0]===o)return"sectionTitle sectionTitle"+T%s.numberSectionStyles;return"sectionTitle"})}c(et,"vertLabels");function it(k,x,g,b){const y=a.db.getTodayMarker();if(y==="off")return;const T=P.append("g").attr("class","today"),o=new Date,d=T.append("line");d.attr("x1",v(o)+k).attr("x2",v(o)+k).attr("y1",s.titleTopMargin).attr("y2",b-s.titleTopMargin).attr("class","today"),y!==""&&d.attr("style",y.replace(/,/g,";"))}c(it,"drawToday");function st(k){const x={},g=[];for(let b=0,y=k.length;b<y;++b)Object.prototype.hasOwnProperty.call(x,k[b])||(x[k[b]]=!0,g.push(k[b]));return g}c(st,"checkUnique")},"draw"),mi={setConf:fi,draw:yi},pi=c(e=>`
  .mermaid-main-font {
        font-family: ${e.fontFamily};
  }

  .exclude-range {
    fill: ${e.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${e.sectionBkgColor};
  }

  .section2 {
    fill: ${e.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${e.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${e.titleColor};
  }

  .sectionTitle1 {
    fill: ${e.titleColor};
  }

  .sectionTitle2 {
    fill: ${e.titleColor};
  }

  .sectionTitle3 {
    fill: ${e.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${e.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${e.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${e.fontFamily};
    fill: ${e.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${e.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${e.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${e.taskTextDarkColor};
    text-anchor: start;
    font-family: ${e.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${e.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${e.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${e.taskBkgColor};
    stroke: ${e.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${e.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${e.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${e.activeTaskBkgColor};
    stroke: ${e.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${e.doneTaskBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${e.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${e.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.titleColor||e.textColor};
    font-family: ${e.fontFamily};
  }
`,"getStyles"),gi=pi,Mi={parser:Ae,db:hi,renderer:mi,styles:gi};export{Mi as diagram};
//# sourceMappingURL=ganttDiagram-LVOFAZNH-BtJVkTCv.chunk.mjs.map
