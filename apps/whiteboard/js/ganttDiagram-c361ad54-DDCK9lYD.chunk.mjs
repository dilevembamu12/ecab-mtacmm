/*! third party licenses: js/vendor.LICENSE.txt */
import{d as Zt}from"./percentages-BXMCSKIN-D6x-nnv3.chunk.mjs";import{s as ct,d as $}from"./isEmpty-DxmJ9h_e.chunk.mjs";import{t as qt,m as Jt,a as Xt,i as te,b as ee,c as At,d as It,e as ie,f as se,g as ne,h as re,j as ae,k as oe,l as ce,n as Ft,o as Ot,p as Bt,s as Mt,q as Lt,r as le,u as de,v as ue,w as he}from"./advancedFormat-Dp8V0_Qr.chunk.mjs";import{g as fe,s as ye,m as ke,n as me,a as pe,b as ge,c as H,d as be,l as ut,i as Te,p as xe,u as ve}from"./index-wvBhvr2O.chunk.mjs";import{l as _e}from"./linear-NOH7Z385.chunk.mjs";import"./whiteboard-main.mjs";import"./index-BazmyFQi.chunk.mjs";import"./vendor-DsWkVfAM.chunk.mjs";import"./index-Bn0s6V7w.chunk.mjs";import"./index-vg7q3Iku.chunk.mjs";import"./init-q33yAy1W.chunk.mjs";import"./defaultLocale-slEEJlip.chunk.mjs";var mt=function(){var t=function(f,s,l,c){for(l=l||{},c=f.length;c--;l[f[c]]=s);return l},n=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],r=[1,25],o=[1,26],a=[1,27],d=[1,28],m=[1,29],B=[1,30],I=[1,31],S=[1,9],E=[1,10],D=[1,11],M=[1,12],z=[1,13],F=[1,14],x=[1,15],J=[1,16],X=[1,18],tt=[1,19],et=[1,20],it=[1,21],st=[1,22],nt=[1,24],rt=[1,32],h={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(f,s,l,c,u,i,v){var e=i.length-1;switch(u){case 1:return i[e-1];case 2:this.$=[];break;case 3:i[e-1].push(i[e]),this.$=i[e-1];break;case 4:case 5:this.$=i[e];break;case 6:case 7:this.$=[];break;case 8:c.setWeekday("monday");break;case 9:c.setWeekday("tuesday");break;case 10:c.setWeekday("wednesday");break;case 11:c.setWeekday("thursday");break;case 12:c.setWeekday("friday");break;case 13:c.setWeekday("saturday");break;case 14:c.setWeekday("sunday");break;case 15:c.setDateFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 16:c.enableInclusiveEndDates(),this.$=i[e].substr(18);break;case 17:c.TopAxis(),this.$=i[e].substr(8);break;case 18:c.setAxisFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 19:c.setTickInterval(i[e].substr(13)),this.$=i[e].substr(13);break;case 20:c.setExcludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 21:c.setIncludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 22:c.setTodayMarker(i[e].substr(12)),this.$=i[e].substr(12);break;case 24:c.setDiagramTitle(i[e].substr(6)),this.$=i[e].substr(6);break;case 25:this.$=i[e].trim(),c.setAccTitle(this.$);break;case 26:case 27:this.$=i[e].trim(),c.setAccDescription(this.$);break;case 28:c.addSection(i[e].substr(8)),this.$=i[e].substr(8);break;case 30:c.addTask(i[e-1],i[e]),this.$="task";break;case 31:this.$=i[e-1],c.setClickEvent(i[e-1],i[e],null);break;case 32:this.$=i[e-2],c.setClickEvent(i[e-2],i[e-1],i[e]);break;case 33:this.$=i[e-2],c.setClickEvent(i[e-2],i[e-1],null),c.setLink(i[e-2],i[e]);break;case 34:this.$=i[e-3],c.setClickEvent(i[e-3],i[e-2],i[e-1]),c.setLink(i[e-3],i[e]);break;case 35:this.$=i[e-2],c.setClickEvent(i[e-2],i[e],null),c.setLink(i[e-2],i[e-1]);break;case 36:this.$=i[e-3],c.setClickEvent(i[e-3],i[e-1],i[e]),c.setLink(i[e-3],i[e-2]);break;case 37:this.$=i[e-1],c.setLink(i[e-1],i[e]);break;case 38:case 44:this.$=i[e-1]+" "+i[e];break;case 39:case 40:case 42:this.$=i[e-2]+" "+i[e-1]+" "+i[e];break;case 41:case 43:this.$=i[e-3]+" "+i[e-2]+" "+i[e-1]+" "+i[e];break}},table:[{3:1,4:[1,2]},{1:[3]},t(n,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:r,13:o,14:a,15:d,16:m,17:B,18:I,19:S,20:E,21:D,22:M,23:z,24:F,25:x,26:J,27:X,28:tt,30:et,32:it,33:st,34:23,35:nt,37:rt},t(n,[2,7],{1:[2,1]}),t(n,[2,3]),{9:33,11:17,12:r,13:o,14:a,15:d,16:m,17:B,18:I,19:S,20:E,21:D,22:M,23:z,24:F,25:x,26:J,27:X,28:tt,30:et,32:it,33:st,34:23,35:nt,37:rt},t(n,[2,5]),t(n,[2,6]),t(n,[2,15]),t(n,[2,16]),t(n,[2,17]),t(n,[2,18]),t(n,[2,19]),t(n,[2,20]),t(n,[2,21]),t(n,[2,22]),t(n,[2,23]),t(n,[2,24]),{29:[1,34]},{31:[1,35]},t(n,[2,27]),t(n,[2,28]),t(n,[2,29]),{36:[1,36]},t(n,[2,8]),t(n,[2,9]),t(n,[2,10]),t(n,[2,11]),t(n,[2,12]),t(n,[2,13]),t(n,[2,14]),{38:[1,37],40:[1,38]},t(n,[2,4]),t(n,[2,25]),t(n,[2,26]),t(n,[2,30]),t(n,[2,31],{39:[1,39],40:[1,40]}),t(n,[2,37],{38:[1,41]}),t(n,[2,32],{40:[1,42]}),t(n,[2,33]),t(n,[2,35],{39:[1,43]}),t(n,[2,34]),t(n,[2,36])],defaultActions:{},parseError:function(f,s){if(s.recoverable)this.trace(f);else{var l=new Error(f);throw l.hash=s,l}},parse:function(f){var s=this,l=[0],c=[],u=[null],i=[],v=this.table,e="",y=0,T=0,_=2,p=1,w=i.slice.call(arguments,1),k=Object.create(this.lexer),N={yy:{}};for(var K in this.yy)Object.prototype.hasOwnProperty.call(this.yy,K)&&(N.yy[K]=this.yy[K]);k.setInput(f,N.yy),N.yy.lexer=k,N.yy.parser=this,typeof k.yylloc>"u"&&(k.yylloc={});var ft=k.yylloc;i.push(ft);var Kt=k.options&&k.options.ranges;typeof N.yy.parseError=="function"?this.parseError=N.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Qt(){var P;return P=c.pop()||k.lex()||p,typeof P!="number"&&(P instanceof Array&&(c=P,P=c.pop()),P=s.symbols_[P]||P),P}for(var A,R,O,yt,V={},at,Y,Dt,ot;;){if(R=l[l.length-1],this.defaultActions[R]?O=this.defaultActions[R]:((A===null||typeof A>"u")&&(A=Qt()),O=v[R]&&v[R][A]),typeof O>"u"||!O.length||!O[0]){var kt="";ot=[];for(at in v[R])this.terminals_[at]&&at>_&&ot.push("'"+this.terminals_[at]+"'");k.showPosition?kt="Parse error on line "+(y+1)+`:
`+k.showPosition()+`
Expecting `+ot.join(", ")+", got '"+(this.terminals_[A]||A)+"'":kt="Parse error on line "+(y+1)+": Unexpected "+(A==p?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(kt,{text:k.match,token:this.terminals_[A]||A,line:k.yylineno,loc:ft,expected:ot})}if(O[0]instanceof Array&&O.length>1)throw new Error("Parse Error: multiple actions possible at state: "+R+", token: "+A);switch(O[0]){case 1:l.push(A),u.push(k.yytext),i.push(k.yylloc),l.push(O[1]),A=null,T=k.yyleng,e=k.yytext,y=k.yylineno,ft=k.yylloc;break;case 2:if(Y=this.productions_[O[1]][1],V.$=u[u.length-Y],V._$={first_line:i[i.length-(Y||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(Y||1)].first_column,last_column:i[i.length-1].last_column},Kt&&(V._$.range=[i[i.length-(Y||1)].range[0],i[i.length-1].range[1]]),yt=this.performAction.apply(V,[e,T,y,N.yy,O[1],u,i].concat(w)),typeof yt<"u")return yt;Y&&(l=l.slice(0,-1*Y*2),u=u.slice(0,-1*Y),i=i.slice(0,-1*Y)),l.push(this.productions_[O[1]][0]),u.push(V.$),i.push(V._$),Dt=v[l[l.length-2]][l[l.length-1]],l.push(Dt);break;case 3:return!0}}return!0}},b=function(){var f={EOF:1,parseError:function(s,l){if(this.yy.parser)this.yy.parser.parseError(s,l);else throw new Error(s)},setInput:function(s,l){return this.yy=l||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var l=s.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),s},unput:function(s){var l=s.length,c=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var u=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===u.length?this.yylloc.first_column:0)+u[u.length-c.length].length-c[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(s){this.unput(this.match.slice(s))},pastInput:function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var s=this.match;return s.length<20&&(s+=this._input.substr(0,20-s.length)),(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var s=this.pastInput(),l=new Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+l+"^"},test_match:function(s,l){var c,u,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),u=s[0].match(/(?:\r\n?|\n).*/g),u&&(this.yylineno+=u.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:u?u[u.length-1].length-u[u.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],c=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),c)return c;if(this._backtrack){for(var v in i)this[v]=i[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var s,l,c,u;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),v=0;v<i.length;v++)if(c=this._input.match(this.rules[i[v]]),c&&(!l||c[0].length>l[0].length)){if(l=c,u=v,this.options.backtrack_lexer){if(s=this.test_match(c,i[v]),s!==!1)return s;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(s=this.test_match(l,i[u]),s!==!1?s:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var s=this.next();return s||this.lex()},begin:function(s){this.conditionStack.push(s)},popState:function(){var s=this.conditionStack.length-1;return s>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(s){return s=this.conditionStack.length-1-Math.abs(s||0),s>=0?this.conditionStack[s]:"INITIAL"},pushState:function(s){this.begin(s)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(s,l,c,u){switch(c){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 40;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 38;case 21:this.popState();break;case 22:return 39;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 37;case 26:return 4;case 27:return 19;case 28:return 20;case 29:return 21;case 30:return 22;case 31:return 23;case 32:return 25;case 33:return 24;case 34:return 26;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return"date";case 43:return 27;case 44:return"accDescription";case 45:return 33;case 46:return 35;case 47:return 36;case 48:return":";case 49:return 6;case 50:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],inclusive:!0}}};return f}();h.lexer=b;function g(){this.yy={}}return g.prototype=h,h.Parser=g,new g}();mt.parser=mt;const we=mt;$.extend(de),$.extend(ue),$.extend(he);let L="",Tt="",xt,vt="",Q=[],Z=[],_t={},wt=[],ht=[],U="",Ct="";const Pt=["active","done","crit","milestone"];let $t=[],q=!1,St=!1,Et="sunday",pt=0;const Ce=function(){wt=[],ht=[],U="",$t=[],lt=0,bt=void 0,dt=void 0,C=[],L="",Tt="",Ct="",xt=void 0,vt="",Q=[],Z=[],q=!1,St=!1,pt=0,_t={},xe(),Et="sunday"},$e=function(t){Tt=t},Se=function(){return Tt},Ee=function(t){xt=t},De=function(){return xt},Ae=function(t){vt=t},Ie=function(){return vt},Fe=function(t){L=t},Oe=function(){q=!0},Be=function(){return q},Me=function(){St=!0},Le=function(){return St},Ne=function(t){Ct=t},Ye=function(){return Ct},Pe=function(){return L},je=function(t){Q=t.toLowerCase().split(/[\s,]+/)},ze=function(){return Q},Re=function(t){Z=t.toLowerCase().split(/[\s,]+/)},We=function(){return Z},Ve=function(){return _t},He=function(t){U=t,wt.push(t)},Ge=function(){return wt},Ue=function(){let t=Nt();const n=10;let r=0;for(;!t&&r<n;)t=Nt(),r++;return ht=C,ht},jt=function(t,n,r,o){return o.includes(t.format(n.trim()))?!1:t.isoWeekday()>=6&&r.includes("weekends")||r.includes(t.format("dddd").toLowerCase())?!0:r.includes(t.format(n.trim()))},Ke=function(t){Et=t},Qe=function(){return Et},zt=function(t,n,r,o){if(!r.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=$(t.startTime):a=$(t.startTime,n,!0),a=a.add(1,"d");let d;t.endTime instanceof Date?d=$(t.endTime):d=$(t.endTime,n,!0);const[m,B]=Ze(a,d,n,r,o);t.endTime=m.toDate(),t.renderEndTime=B},Ze=function(t,n,r,o,a){let d=!1,m=null;for(;t<=n;)d||(m=n.toDate()),d=jt(t,r,o,a),d&&(n=n.add(1,"d")),t=t.add(1,"d");return[n,m]},gt=function(t,n,r){r=r.trim();const o=/^after\s+(?<ids>[\d\w- ]+)/.exec(r);if(o!==null){let d=null;for(const B of o.groups.ids.split(" ")){let I=W(B);I!==void 0&&(!d||I.endTime>d.endTime)&&(d=I)}if(d)return d.endTime;const m=new Date;return m.setHours(0,0,0,0),m}let a=$(r,n.trim(),!0);if(a.isValid())return a.toDate();{ut.debug("Invalid date:"+r),ut.debug("With date format:"+n.trim());const d=new Date(r);if(d===void 0||isNaN(d.getTime())||d.getFullYear()<-1e4||d.getFullYear()>1e4)throw new Error("Invalid date:"+r);return d}},Rt=function(t){const n=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return n!==null?[Number.parseFloat(n[1]),n[2]]:[NaN,"ms"]},Wt=function(t,n,r,o=!1){r=r.trim();const a=/^until\s+(?<ids>[\d\w- ]+)/.exec(r);if(a!==null){let S=null;for(const D of a.groups.ids.split(" ")){let M=W(D);M!==void 0&&(!S||M.startTime<S.startTime)&&(S=M)}if(S)return S.startTime;const E=new Date;return E.setHours(0,0,0,0),E}let d=$(r,n.trim(),!0);if(d.isValid())return o&&(d=d.add(1,"d")),d.toDate();let m=$(t);const[B,I]=Rt(r);if(!Number.isNaN(B)){const S=m.add(B,I);S.isValid()&&(m=S)}return m.toDate()};let lt=0;const G=function(t){return t===void 0?(lt=lt+1,"task"+lt):t},qe=function(t,n){let r;n.substr(0,1)===":"?r=n.substr(1,n.length):r=n;const o=r.split(","),a={};Ut(o,a,Pt);for(let m=0;m<o.length;m++)o[m]=o[m].trim();let d="";switch(o.length){case 1:a.id=G(),a.startTime=t.endTime,d=o[0];break;case 2:a.id=G(),a.startTime=gt(void 0,L,o[0]),d=o[1];break;case 3:a.id=G(o[0]),a.startTime=gt(void 0,L,o[1]),d=o[2];break}return d&&(a.endTime=Wt(a.startTime,L,d,q),a.manualEndTime=$(d,"YYYY-MM-DD",!0).isValid(),zt(a,L,Z,Q)),a},Je=function(t,n){let r;n.substr(0,1)===":"?r=n.substr(1,n.length):r=n;const o=r.split(","),a={};Ut(o,a,Pt);for(let d=0;d<o.length;d++)o[d]=o[d].trim();switch(o.length){case 1:a.id=G(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:o[0]};break;case 2:a.id=G(),a.startTime={type:"getStartDate",startData:o[0]},a.endTime={data:o[1]};break;case 3:a.id=G(o[0]),a.startTime={type:"getStartDate",startData:o[1]},a.endTime={data:o[2]};break}return a};let bt,dt,C=[];const Vt={},Xe=function(t,n){const r={section:U,type:U,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:n},task:t,classes:[]},o=Je(dt,n);r.raw.startTime=o.startTime,r.raw.endTime=o.endTime,r.id=o.id,r.prevTaskId=dt,r.active=o.active,r.done=o.done,r.crit=o.crit,r.milestone=o.milestone,r.order=pt,pt++;const a=C.push(r);dt=r.id,Vt[r.id]=a-1},W=function(t){const n=Vt[t];return C[n]},ti=function(t,n){const r={section:U,type:U,description:t,task:t,classes:[]},o=qe(bt,n);r.startTime=o.startTime,r.endTime=o.endTime,r.id=o.id,r.active=o.active,r.done=o.done,r.crit=o.crit,r.milestone=o.milestone,bt=r,ht.push(r)},Nt=function(){const t=function(r){const o=C[r];let a="";switch(C[r].raw.startTime.type){case"prevTaskEnd":{const d=W(o.prevTaskId);o.startTime=d.endTime;break}case"getStartDate":a=gt(void 0,L,C[r].raw.startTime.startData),a&&(C[r].startTime=a);break}return C[r].startTime&&(C[r].endTime=Wt(C[r].startTime,L,C[r].raw.endTime.data,q),C[r].endTime&&(C[r].processed=!0,C[r].manualEndTime=$(C[r].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),zt(C[r],L,Z,Q))),C[r].processed};let n=!0;for(const[r,o]of C.entries())t(r),n=n&&o.processed;return n},ei=function(t,n){let r=n;H().securityLevel!=="loose"&&(r=Zt.sanitizeUrl(n)),t.split(",").forEach(function(o){W(o)!==void 0&&(Gt(o,()=>{window.open(r,"_self")}),_t[o]=r)}),Ht(t,"clickable")},Ht=function(t,n){t.split(",").forEach(function(r){let o=W(r);o!==void 0&&o.classes.push(n)})},ii=function(t,n,r){if(H().securityLevel!=="loose"||n===void 0)return;let o=[];if(typeof r=="string"){o=r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let a=0;a<o.length;a++){let d=o[a].trim();d.charAt(0)==='"'&&d.charAt(d.length-1)==='"'&&(d=d.substr(1,d.length-2)),o[a]=d}}o.length===0&&o.push(t),W(t)!==void 0&&Gt(t,()=>{ve.runFunc(n,...o)})},Gt=function(t,n){$t.push(function(){const r=document.querySelector(`[id="${t}"]`);r!==null&&r.addEventListener("click",function(){n()})},function(){const r=document.querySelector(`[id="${t}-text"]`);r!==null&&r.addEventListener("click",function(){n()})})},si=function(t,n,r){t.split(",").forEach(function(o){ii(o,n,r)}),Ht(t,"clickable")},ni=function(t){$t.forEach(function(n){n(t)})},ri={getConfig:()=>H().gantt,clear:Ce,setDateFormat:Fe,getDateFormat:Pe,enableInclusiveEndDates:Oe,endDatesAreInclusive:Be,enableTopAxis:Me,topAxisEnabled:Le,setAxisFormat:$e,getAxisFormat:Se,setTickInterval:Ee,getTickInterval:De,setTodayMarker:Ae,getTodayMarker:Ie,setAccTitle:ge,getAccTitle:pe,setDiagramTitle:me,getDiagramTitle:ke,setDisplayMode:Ne,getDisplayMode:Ye,setAccDescription:ye,getAccDescription:fe,addSection:He,getSections:Ge,getTasks:Ue,addTask:Xe,findTaskById:W,addTaskOrg:ti,setIncludes:je,getIncludes:ze,setExcludes:Re,getExcludes:We,setClickEvent:si,setLink:ei,getLinks:Ve,bindFunctions:ni,parseDuration:Rt,isInvalidDate:jt,setWeekday:Ke,getWeekday:Qe};function Ut(t,n,r){let o=!0;for(;o;)o=!1,r.forEach(function(a){const d="^\\s*"+a+"\\s*$",m=new RegExp(d);t[0].match(m)&&(n[a]=!0,t.shift(1),o=!0)})}const ai=function(){ut.debug("Something is calling, setConf, remove the call")},Yt={monday:ce,tuesday:oe,wednesday:ae,thursday:re,friday:ne,saturday:se,sunday:ie},oi=(t,n)=>{let r=[...t].map(()=>-1/0),o=[...t].sort((d,m)=>d.startTime-m.startTime||d.order-m.order),a=0;for(const d of o)for(let m=0;m<r.length;m++)if(d.startTime>=r[m]){r[m]=d.endTime,d.order=m+n,m>a&&(a=m);break}return a};let j;const ci=function(t,n,r,o){const a=H().gantt,d=H().securityLevel;let m;d==="sandbox"&&(m=ct("#i"+n));const B=d==="sandbox"?ct(m.nodes()[0].contentDocument.body):ct("body"),I=d==="sandbox"?m.nodes()[0].contentDocument:document,S=I.getElementById(n);j=S.parentElement.offsetWidth,j===void 0&&(j=1200),a.useWidth!==void 0&&(j=a.useWidth);const E=o.db.getTasks();let D=[];for(const h of E)D.push(h.type);D=rt(D);const M={};let z=2*a.topPadding;if(o.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const h={};for(const g of E)h[g.section]===void 0?h[g.section]=[g]:h[g.section].push(g);let b=0;for(const g of Object.keys(h)){const f=oi(h[g],b)+1;b+=f,z+=f*(a.barHeight+a.barGap),M[g]=f}}else{z+=E.length*(a.barHeight+a.barGap);for(const h of D)M[h]=E.filter(b=>b.type===h).length}S.setAttribute("viewBox","0 0 "+j+" "+z);const F=B.select(`[id="${n}"]`),x=qt().domain([Jt(E,function(h){return h.startTime}),Xt(E,function(h){return h.endTime})]).rangeRound([0,j-a.leftPadding-a.rightPadding]);function J(h,b){const g=h.startTime,f=b.startTime;let s=0;return g>f?s=1:g<f&&(s=-1),s}E.sort(J),X(E,j,z),be(F,z,j,a.useMaxWidth),F.append("text").text(o.db.getDiagramTitle()).attr("x",j/2).attr("y",a.titleTopMargin).attr("class","titleText");function X(h,b,g){const f=a.barHeight,s=f+a.barGap,l=a.topPadding,c=a.leftPadding,u=_e().domain([0,D.length]).range(["#00B9FA","#F95002"]).interpolate(te);et(s,l,c,b,g,h,o.db.getExcludes(),o.db.getIncludes()),it(c,l,b,g),tt(h,s,l,c,f,u,b),st(s,l),nt(c,l,b,g)}function tt(h,b,g,f,s,l,c){const u=[...new Set(h.map(e=>e.order))].map(e=>h.find(y=>y.order===e));F.append("g").selectAll("rect").data(u).enter().append("rect").attr("x",0).attr("y",function(e,y){return y=e.order,y*b+g-2}).attr("width",function(){return c-a.rightPadding/2}).attr("height",b).attr("class",function(e){for(const[y,T]of D.entries())if(e.type===T)return"section section"+y%a.numberSectionStyles;return"section section0"});const i=F.append("g").selectAll("rect").data(h).enter(),v=o.db.getLinks();if(i.append("rect").attr("id",function(e){return e.id}).attr("rx",3).attr("ry",3).attr("x",function(e){return e.milestone?x(e.startTime)+f+.5*(x(e.endTime)-x(e.startTime))-.5*s:x(e.startTime)+f}).attr("y",function(e,y){return y=e.order,y*b+g}).attr("width",function(e){return e.milestone?s:x(e.renderEndTime||e.endTime)-x(e.startTime)}).attr("height",s).attr("transform-origin",function(e,y){return y=e.order,(x(e.startTime)+f+.5*(x(e.endTime)-x(e.startTime))).toString()+"px "+(y*b+g+.5*s).toString()+"px"}).attr("class",function(e){const y="task";let T="";e.classes.length>0&&(T=e.classes.join(" "));let _=0;for(const[w,k]of D.entries())e.type===k&&(_=w%a.numberSectionStyles);let p="";return e.active?e.crit?p+=" activeCrit":p=" active":e.done?e.crit?p=" doneCrit":p=" done":e.crit&&(p+=" crit"),p.length===0&&(p=" task"),e.milestone&&(p=" milestone "+p),p+=_,p+=" "+T,y+p}),i.append("text").attr("id",function(e){return e.id+"-text"}).text(function(e){return e.task}).attr("font-size",a.fontSize).attr("x",function(e){let y=x(e.startTime),T=x(e.renderEndTime||e.endTime);e.milestone&&(y+=.5*(x(e.endTime)-x(e.startTime))-.5*s),e.milestone&&(T=y+s);const _=this.getBBox().width;return _>T-y?T+_+1.5*a.leftPadding>c?y+f-5:T+f+5:(T-y)/2+y+f}).attr("y",function(e,y){return y=e.order,y*b+a.barHeight/2+(a.fontSize/2-2)+g}).attr("text-height",s).attr("class",function(e){const y=x(e.startTime);let T=x(e.endTime);e.milestone&&(T=y+s);const _=this.getBBox().width;let p="";e.classes.length>0&&(p=e.classes.join(" "));let w=0;for(const[N,K]of D.entries())e.type===K&&(w=N%a.numberSectionStyles);let k="";return e.active&&(e.crit?k="activeCritText"+w:k="activeText"+w),e.done?e.crit?k=k+" doneCritText"+w:k=k+" doneText"+w:e.crit&&(k=k+" critText"+w),e.milestone&&(k+=" milestoneText"),_>T-y?T+_+1.5*a.leftPadding>c?p+" taskTextOutsideLeft taskTextOutside"+w+" "+k:p+" taskTextOutsideRight taskTextOutside"+w+" "+k+" width-"+_:p+" taskText taskText"+w+" "+k+" width-"+_}),H().securityLevel==="sandbox"){let e;e=ct("#i"+n);const y=e.nodes()[0].contentDocument;i.filter(function(T){return v[T.id]!==void 0}).each(function(T){var _=y.querySelector("#"+T.id),p=y.querySelector("#"+T.id+"-text");const w=_.parentNode;var k=y.createElement("a");k.setAttribute("xlink:href",v[T.id]),k.setAttribute("target","_top"),w.appendChild(k),k.appendChild(_),k.appendChild(p)})}}function et(h,b,g,f,s,l,c,u){if(c.length===0&&u.length===0)return;let i,v;for(const{startTime:p,endTime:w}of l)(i===void 0||p<i)&&(i=p),(v===void 0||w>v)&&(v=w);if(!i||!v)return;if($(v).diff($(i),"year")>5){ut.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const e=o.db.getDateFormat(),y=[];let T=null,_=$(i);for(;_.valueOf()<=v;)o.db.isInvalidDate(_,e,c,u)?T?T.end=_:T={start:_,end:_}:T&&(y.push(T),T=null),_=_.add(1,"d");F.append("g").selectAll("rect").data(y).enter().append("rect").attr("id",function(p){return"exclude-"+p.start.format("YYYY-MM-DD")}).attr("x",function(p){return x(p.start)+g}).attr("y",a.gridLineStartPadding).attr("width",function(p){const w=p.end.add(1,"day");return x(w)-x(p.start)}).attr("height",s-b-a.gridLineStartPadding).attr("transform-origin",function(p,w){return(x(p.start)+g+.5*(x(p.end)-x(p.start))).toString()+"px "+(w*h+.5*s).toString()+"px"}).attr("class","exclude-range")}function it(h,b,g,f){let s=ee(x).tickSize(-f+b+a.gridLineStartPadding).tickFormat(At(o.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));const l=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(o.db.getTickInterval()||a.tickInterval);if(l!==null){const c=l[1],u=l[2],i=o.db.getWeekday()||a.weekday;switch(u){case"millisecond":s.ticks(Lt.every(c));break;case"second":s.ticks(Mt.every(c));break;case"minute":s.ticks(Bt.every(c));break;case"hour":s.ticks(Ot.every(c));break;case"day":s.ticks(Ft.every(c));break;case"week":s.ticks(Yt[i].every(c));break;case"month":s.ticks(It.every(c));break}}if(F.append("g").attr("class","grid").attr("transform","translate("+h+", "+(f-50)+")").call(s).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),o.db.topAxisEnabled()||a.topAxis){let c=le(x).tickSize(-f+b+a.gridLineStartPadding).tickFormat(At(o.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));if(l!==null){const u=l[1],i=l[2],v=o.db.getWeekday()||a.weekday;switch(i){case"millisecond":c.ticks(Lt.every(u));break;case"second":c.ticks(Mt.every(u));break;case"minute":c.ticks(Bt.every(u));break;case"hour":c.ticks(Ot.every(u));break;case"day":c.ticks(Ft.every(u));break;case"week":c.ticks(Yt[v].every(u));break;case"month":c.ticks(It.every(u));break}}F.append("g").attr("class","grid").attr("transform","translate("+h+", "+b+")").call(c).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function st(h,b){let g=0;const f=Object.keys(M).map(s=>[s,M[s]]);F.append("g").selectAll("text").data(f).enter().append(function(s){const l=s[0].split(Te.lineBreakRegex),c=-(l.length-1)/2,u=I.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",c+"em");for(const[i,v]of l.entries()){const e=I.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),i>0&&e.setAttribute("dy","1em"),e.textContent=v,u.appendChild(e)}return u}).attr("x",10).attr("y",function(s,l){if(l>0)for(let c=0;c<l;c++)return g+=f[l-1][1],s[1]*h/2+g*h+b;else return s[1]*h/2+b}).attr("font-size",a.sectionFontSize).attr("class",function(s){for(const[l,c]of D.entries())if(s[0]===c)return"sectionTitle sectionTitle"+l%a.numberSectionStyles;return"sectionTitle"})}function nt(h,b,g,f){const s=o.db.getTodayMarker();if(s==="off")return;const l=F.append("g").attr("class","today"),c=new Date,u=l.append("line");u.attr("x1",x(c)+h).attr("x2",x(c)+h).attr("y1",a.titleTopMargin).attr("y2",f-a.titleTopMargin).attr("class","today"),s!==""&&u.attr("style",s.replace(/,/g,";"))}function rt(h){const b={},g=[];for(let f=0,s=h.length;f<s;++f)Object.prototype.hasOwnProperty.call(b,h[f])||(b[h[f]]=!0,g.push(h[f]));return g}},li={setConf:ai,draw:ci},di=t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
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
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,ui=di,wi={parser:we,db:ri,renderer:li,styles:ui};export{wi as diagram};
//# sourceMappingURL=ganttDiagram-c361ad54-DDCK9lYD.chunk.mjs.map
