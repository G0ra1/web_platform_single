var Re=Object.defineProperty;var qe=(e,n,o)=>n in e?Re(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o;var le=(e,n,o)=>(qe(e,typeof n!="symbol"?n+"":n,o),o);import{d as g,a,o as m,g as h,b as i,r as _,c as C,w as f,h as l,n as K,f as U,F as O,U as ne,t as w,k as N,p as Ce,_ as Q,$ as ee,e as A,X as He,u as Ke,v as Ve,J as ie,i as he}from"./runtime-dom.esm-bundler.bf4f36cb.js";import{aq as I,ar as S,as as x,f as b,N as R,i as y,e as E,aw as D,ax as T,ay as F,_ as $,C as ce,bK as V,au as W,l as je,aC as Me,aJ as te,aY as Ne,r as Ae,am as Ge,aB as Je,a_ as We,aA as me,an as Ie,aZ as Xe,b2 as Ye,a as Ze,b as Qe,at as en,m as nn}from"./index.0e7eb3bd.js";import{N as fe,a as tn}from"./Menu.f72d5488.js";import{N as q}from"./Scrollbar.e2b8029c.js";import{N as oe}from"./InputGroupLabel.f8867056.js";import{A as on}from"./index.eef2b9ce.js";import{N as sn}from"./Dropdown.c5536ab3.js";import{N as ge}from"./text.c79655f7.js";import{N as se,a as ae}from"./Tabs.dac43389.js";import{N as an}from"./index.cb0cc583.js";import{i as ln}from"./style.24c82a16.js";import{V as rn}from"./preset.dbf9002a.js";import"./Add.f7b12907.js";import"./Avatar.daae428d.js";import"./Image.316697df.js";import"./DataTable.f712e3ce.js";import"./Radio.929283f6.js";import"./InputNumber.39ec7792.js";import"./FormItemGridItem.5c201774.js";import"./Transfer.0159dc42.js";import"./ListItem.88a2c472.js";import"./Upload.3acdeec3.js";import"./Rate.7caf94c1.js";import"./Step.db780097.js";import"./p.0c502c64.js";const cn=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NDrawer:T,NDrawerContent:F},setup(){return{}}}),un={class:"wrapper-logo"};function pn(e,n,o,c,u,r){const t=a("nw-icon");return m(),h("div",un,[i(t,{size:38,name:"icon-y-cbox",color:"white"})])}const dn=$(cn,[["render",pn]]),Se=_([]),J=_(""),_n=()=>{window.addEventListener("hashchange",e=>{xe()})},xe=()=>{const[e,n]=window.location.hash.substring(1).split("/");if(!ce.get("token")){window.location.href="/web-main/pages/login2.html";return}e==="app"?J.value=n:e==="portalframe"&&(J.value="portalframe")},mn=async function(){await V.get("bizMenuInfo").then(e=>{Se.value=e.filter(n=>n.appType==="service")})},fn=e=>{window.location.hash=`#app/${e.appCode}`},vn=g({props:{isActive:{type:Boolean,default:!1}},components:{NMenu:fe,NPopover:W,NwIcon:y},setup(e){const n=_([]);return V.get("portalInfo").then(o=>{n.value=je.exports.get(o,"menus",[])}),{props:e,menuOptions:n,handleMenu(o){window.location.hash=`#portalframe/${o}`}}}});function hn(e,n,o,c,u,r){const t=a("nw-icon"),s=a("n-menu"),d=a("n-popover");return m(),C(d,{overlap:!1,placement:"right-start",trigger:"hover","show-arrow":!1},{trigger:f(()=>[l("div",{class:K({"wrapper-menu-item":!0,action:e.props.isActive})},[i(t,{name:"icon-n-n-home",size:32}),U(" \u95E8\u6237 ")],2)]),default:f(()=>[i(s,{options:e.menuOptions,value:"","onUpdate:value":e.handleMenu},null,8,["options","onUpdate:value"])]),_:1})}const gn=$(vn,[["render",hn]]),$n=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NDrawer:T,NDrawerContent:F,NPopover:W,NScrollbar:q,NwHome:gn},setup(){return xe(),window.onhashchange=function(e){e.newURL.indexOf("frame/date-manage")>0&&(J.value="date")},{ActiveApp:J,AppItems:Se,handleHome(){J.value="home",window.location.hash="#frame/portal"},handleApp(e){fn(e)},handleDate(){J.value="date",window.location.hash="#frame/date-manage"},handleTask(){J.value="task",window.location.hash="#frame/task"},handleStudy(){window.open("/web-study/pages/study-students.html#/homePage","_blank","top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no")}}}}),yn={class:"wrapper-menu"},wn={class:"wrapper-menu app-menu"},bn={class:K({"app-menu-btn":!0})},kn=["title","onClick"];function Cn(e,n,o,c,u,r){const t=a("nw-home"),s=a("nw-icon"),d=a("n-scrollbar");return m(),h(O,null,[l("div",yn,[i(t,{isActive:e.ActiveApp==="portalframe"},null,8,["isActive"]),l("div",{class:K({"wrapper-menu-item":!0,action:e.ActiveApp==="task"}),onClick:n[0]||(n[0]=(...p)=>e.handleTask&&e.handleTask(...p))},[i(s,{name:"icon-w_biji-",size:26}),U(" \u4EFB\u52A1 ")],2),l("div",{class:K({"wrapper-menu-item":!0,action:e.ActiveApp==="date"}),onClick:n[1]||(n[1]=(...p)=>e.handleDate&&e.handleDate(...p))},[i(s,{name:"icon-w_calendar",size:26}),U(" \u65E5\u7A0B ")],2),l("div",{class:K({"wrapper-menu-item":!0}),onClick:n[2]||(n[2]=(...p)=>e.handleStudy&&e.handleStudy(...p))},[i(s,{name:"icon-w_calendar",size:26}),U(" \u5B66\u4E60\u7CFB\u7EDF ")])]),l("div",wn,[l("div",bn,[i(s,{name:"icon-n-n-up",size:18,color:"#ccc"})]),i(d,null,{default:f(()=>[(m(!0),h(O,null,ne(e.AppItems,p=>(m(),h("div",{key:p.appCode,class:K({"wrapper-menu-item":!0,action:e.ActiveApp===p.appCode}),title:p.appName,onClick:v=>e.handleApp(p)},[i(s,{name:p.icon,size:26},null,8,["name"]),U(" "+w(p.appName.substring(0,4)),1)],10,kn))),128))]),_:1})])],64)}const Mn=$($n,[["render",Cn]]),Nn=[{label:"\u5E94\u7528\u8D44\u6E90\u7BA1\u7406",key:"app"},{label:"\u4E3B\u6570\u636E\u7BA1\u7406",key:"mdm"},{label:"\u5DE5\u4F5C\u6D41\u7BA1\u7406",key:"wf"}],An=g({components:{NMenu:fe,NPopover:W,NwIcon:y},setup(){return{collapsed:_(!0),menuOptions:Nn,renderMenuLabel(e){return"href"in e?N("a",{href:e.href,target:"_blank"},e.label):e.label},renderMenuIcon(e){return e.key==="sheep-man"?!0:e.key==="food"?null:N(y,{name:"icon-n-n-sys"})},expandIcon(){return N("span",null)},handleMenu(e){window.location.hash=`#app/${e}`}}}});function In(e,n,o,c,u,r){const t=a("nw-icon"),s=a("n-menu"),d=a("n-popover");return m(),C(d,{overlap:!1,placement:"right-start",trigger:"hover","show-arrow":!1},{trigger:f(()=>[l("div",{class:K({"wrapper-menu-item-last":!0,"wrapper-menu-item":!0}),onClick:n[0]||(n[0]=()=>{})},[i(t,{name:"icon-n-n-sys",size:32})])]),default:f(()=>[i(s,{options:e.menuOptions,value:"","onUpdate:value":e.handleMenu},null,8,["options","onUpdate:value"])]),_:1})}const Sn=$(An,[["render",In]]);_n();const xn=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NDrawer:T,NDrawerContent:F,NwLogo:dn,NwMenu:Mn,NwSystem:Sn},setup(){return mn(),{}}});function En(e,n,o,c,u,r){const t=a("nw-logo"),s=a("nw-menu"),d=a("nw-system");return m(),h(O,null,[i(t),i(s),i(d)],64)}const Dn=$(xn,[["render",En]]),H=_([]),z=_({}),P=_({}),Y=_(""),Ee=_(""),De=_(""),Z=_(!1),Te=_({}),Tn=()=>{$e(),window.addEventListener("hashchange",e=>{console.log("=======",window.location.hash),$e()})},$e=async()=>{const[e,n,o,c,u]=window.location.hash.substring(1).split("/");if(z.value={},P.value={},Z.value=!1,e==="app"){const r=await V.get("bizMenuInfo").then(t=>t.find(s=>s.appCode===n));if(!r)return;if(z.value=r,console.log("-=-app=-",r),o)if(P.value=r.menus.find(t=>t.key===o),c==="@t3")H.value=r?r.menus:[];else if(c){Y.value=Me.getMenuParam(c),Ee.value=c;const t=await V.get(`MenuRow-${n}-${o}`),s=await V.get(`MenuFilter-${n}-${o}`);if(t&&s){const d=Function(`return ${s}`)();H.value=P.value.sonMenus.filter(p=>d(p,t))}else H.value=P.value.sonMenus;if(!H.value.length)return;u?(Te.value=H.value.find(d=>d.key===u),De.value=r.formListUrl[o]||"",Z.value=!0):window.location.hash=`#app/${z.value.appCode}/${P.value.key}/${c}/${H.value[0].key}`}else H.value=r?r.menus:[];else r.menus[0].type===3?window.location.hash=`#app/${z.value.appCode}/${r.menus[0].key}/@t3`:window.location.hash=`#app/${z.value.appCode}/${r.menus[0].key}`}},Fn=e=>{console.log("===menu====",e),Z.value?window.location.hash=`#app/${z.value.appCode}/${P.value.key}/${Ee.value}/${e.key}`:e.type===0||e.type===1?window.location.hash=`#app/${z.value.appCode}/${e.key}`:e.type===3&&(window.location.hash=`#app/${z.value.appCode}/${e.key}/@t3`)},Fe=()=>{window.location.hash=`#app/${z.value.appCode}/${P.value.key}`},Ln=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NDivider:te,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NInputGroupLabel:oe,NDrawer:T,NScrollbar:q,NDrawerContent:F},setup(e){return{menuItems:H,handleMenu:Fn,ActiveMenu:P,ActiveMenuLevel2:Te,EnableMenuLevel2:Z}}});const Bn={class:"header-menu"},zn=["title","onClick"],Pn={class:"text"};function Un(e,n,o,c,u,r){return m(),h("div",Bn,[(m(!0),h(O,null,ne(e.menuItems,t=>(m(),h("div",{title:t.label,class:K({"menu-item":!0,active:(e.EnableMenuLevel2?e.ActiveMenuLevel2.key:e.ActiveMenu.key)===t.key}),key:t.key,onClick:()=>e.handleMenu(t)},[l("div",Pn,w(t.label),1)],10,zn))),128))])}const On=$(Ln,[["render",Un],["__scopeId","data-v-6580e719"]]),Rn=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NDivider:te,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NInputGroupLabel:oe,NDrawer:T,NScrollbar:q,NDrawerContent:F,NConfigProvider:Ne,NDropdown:sn},setup(e){const n=_({});V.get("userInfo").then(u=>{n.value=u});const o=[{key:"header",type:"render",render:()=>N("div",{style:"display: flex; align-items: center; padding: 8px 12px ;"},[N(y,{name:"icon-y-blueuser",size:24,style:"margin-right: 12px;"}),N("div",null,[N("div",null,[N(ge,{depth:2},{default:()=>n.value.userNameCh})]),N("div",{style:"font-size: 12px;"},[N(ge,{depth:3},{default:()=>n.value.email})])])])},{label:"\u4E2A\u4EBA\u4E2D\u5FC3",key:"setting"},{label:"\u9000\u51FA\u767B\u5F55",key:"logout"}],c=u=>{switch(u){case"logout":on().then(()=>{window.location.href="/web-main/pages/login2.html"});break;case"setting":window.location.href="/web-main/pages/setting.html";break}};return Ce().then(()=>{}),{options:o,handleSelect:c,userInfo:n}}}),qn=["src"];function Hn(e,n,o,c,u,r){const t=a("n-dropdown"),s=a("n-config-provider");return m(),C(s,{class:"setting",style:{"line-height":"5px"}},{default:f(()=>[i(t,{trigger:"hover",onSelect:e.handleSelect,options:e.options,placement:"bottom-end"},{default:f(()=>[l("img",{src:e.userInfo.photoFileId?`http://incloud.com/${e.userInfo.photoFileId}`:"../img/boy.png",style:{width:"40px",height:"40px","border-radius":"50%"}},null,8,qn)]),_:1},8,["onSelect","options"])]),_:1})}const Kn=$(Rn,[["render",Hn]]),Vn=g({props:{title:{type:String,default:""},content:{type:String,default:""},time:{type:String,default:""},url:{type:String,default:""}},components:{NButton:b,NPopover:W,NTabs:se,NTabPane:ae,NwIcon:y,NScrollbar:q},setup(e){return{props:e,handle(){window.open(e.url,"_blank","top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no")}}}});const jn=e=>(Q("data-v-d9fdd3d3"),e=e(),ee(),e),Gn={style:{padding:"10px 15px 0 10px"}},Jn={class:"task-card todo"},Wn={class:"task-card-header"},Xn={class:"title"},Yn=jn(()=>l("div",{class:"extra"},null,-1)),Zn={class:"task-card-content"},Qn={class:"task-card-footer"},et={class:"time"},nt={class:"action"};function tt(e,n,o,c,u,r){const t=a("n-button");return m(),h("div",Gn,[l("div",Jn,[l("div",Wn,[l("div",Xn,w(e.props.title),1),Yn]),l("div",Zn,w(e.props.content),1),l("div",Qn,[l("div",et,w(e.props.time),1),l("div",nt,[i(t,{size:"tiny",onClick:e.handle},{default:f(()=>[U(" \u8FDB\u5165\u529E\u7406 ")]),_:1},8,["onClick"])])])])])}const ot=$(Vn,[["render",tt],["__scopeId","data-v-d9fdd3d3"]]),st=g({props:{title:{type:String,default:""},content:{type:String,default:""},time:{type:String,default:""},url:{type:String,default:""}},components:{NButton:b,NPopover:W,NTabs:se,NTabPane:ae,NwIcon:y,NScrollbar:q},setup(e){return{props:e,handle(){window.open(e.url,"_blank","top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no")}}}});const at=e=>(Q("data-v-fb02d406"),e=e(),ee(),e),lt={style:{padding:"10px 15px 0 10px"}},it={class:"task-card todo"},rt={class:"task-card-header"},ct={class:"title"},ut=at(()=>l("div",{class:"extra"},null,-1)),pt={class:"task-card-content"},dt={class:"task-card-footer"},_t={class:"time"},mt={class:"action"};function ft(e,n,o,c,u,r){const t=a("n-button");return m(),h("div",lt,[l("div",it,[l("div",rt,[l("div",ct,w(e.props.title),1),ut]),l("div",pt,w(e.props.content),1),l("div",dt,[l("div",_t,w(e.props.time),1),l("div",mt,[i(t,{size:"tiny",onClick:e.handle},{default:f(()=>[U(" \u67E5\u770B\u5DF2\u529E ")]),_:1},8,["onClick"])])])])])}const vt=$(st,[["render",ft],["__scopeId","data-v-fb02d406"]]);function ht(e){return Ae({url:"/main/msgPage",method:"post",data:{page:{current:1,size:999},...e}})}_([]);const ue=_([]),Le=_(0),ye=_(!1),we=()=>{ye.value=!0,ht({isRead:0}).then(e=>{console.log("-=res-=",e),Le.value=e.records.length,ue.value=e.records.filter(n=>n.msgSource==="WF"),console.log("-=TaskData.value-=",ue.value)}).finally(()=>{ye.value=!1})},gt=g({components:{NButton:b,NPopover:W,NTabs:se,NTabPane:ae,NwIcon:y,NScrollbar:q,TodoCard:ot,DoneCard:vt},setup(e){const n=_(!1);return{TaskData:ue,visible:n,theme:{padding:"5px"},handleShow(){n.value=!0}}}});const $t=e=>(Q("data-v-5b970660"),e=e(),ee(),e),yt=$t(()=>l("div",{style:{height:"10px"}},null,-1));function wt(e,n,o,c,u,r){const t=a("todo-card"),s=a("done-card"),d=a("n-scrollbar");return m(),C(d,{style:{height:"100%"}},{default:f(()=>[(m(!0),h(O,null,ne(e.TaskData,p=>(m(),h(O,{key:p.id},[p.tmpCode==="todoTask"?(m(),C(t,{key:0,title:p.msgTitle,content:p.msgContent,time:p.updateTime,url:p.msgPcUrl},null,8,["title","content","time","url"])):p.tmpCode==="applyTask"?(m(),C(s,{key:1,title:p.msgTitle,content:p.msgContent,time:p.updateTime,url:p.msgPcUrl},null,8,["title","content","time","url"])):A("",!0)],64))),128)),yt]),_:1})}const bt=$(gt,[["render",wt],["__scopeId","data-v-5b970660"]]),kt=g({components:{NButton:b,NPopover:W,NTabs:se,NTabPane:ae,NSpin:Ge,NBadge:tn,NwIcon:y,Task:bt},setup(e){const n=_(!1);return we(),{Count:Le,visible:n,theme:{padding:"0"},handleShow(){n.value=!0,we()}}}});const Ct={style:{height:"100%"}};function Mt(e,n,o,c,u,r){const t=a("nw-icon"),s=a("n-button"),d=a("n-badge"),p=a("task"),v=a("n-tab-pane"),k=a("n-tabs"),X=a("n-spin"),L=a("n-popover");return m(),C(L,{show:e.visible,themeOverrides:{padding:"0"},placement:"bottom",trigger:"click","onUpdate:show":e.handleShow},{trigger:f(()=>[i(d,{value:e.Count,max:99},{default:f(()=>[i(s,{title:"\u63D0\u9192",text:"",style:{display:"flex","align-items":"center"}},{default:f(()=>[i(t,{color:"#4C90F0",size:26,name:"icon-n-n-lingdang"})]),_:1})]),_:1},8,["value"])]),default:f(()=>[i(X,{class:"remind",show:!1},{default:f(()=>[i(k,{"tabs-padding":10,size:"small",type:"line",animated:"",themeOverrides:{panePaddingSmall:"0"},class:"remind-tabs","pane-class":"remind-tab-pane","pane-style":{height:"100%"}},{default:f(()=>[i(v,{name:"task",tab:"\u4EFB\u52A1"},{default:f(()=>[l("div",Ct,[i(p)])]),_:1}),i(v,{name:"msg",tab:"\u6D88\u606F"},{default:f(()=>[U(" \u6D88\u606F ")]),_:1})]),_:1}),i(s,{text:"",style:{position:"absolute",right:"8px",top:"10px"},onClick:n[0]||(n[0]=j=>e.visible=!1)},{default:f(()=>[i(t,{color:"#888",size:12,name:"icon-n-y-close"})]),_:1})]),_:1})]),_:1},8,["show","onUpdate:show"])}const Nt=$(kt,[["render",Mt]]);class Be{constructor(n){le(this,"state",_(""));ce.get("token"),ce.get("tokenType")}}le(Be,"ws");const At=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NDivider:te,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NInputGroupLabel:oe,NDrawer:T,NScrollbar:q,NDrawerContent:F},setup(e){const{state:n}=new Be(Je());return{state:n,handle(){}}}});const It={class:"realtime"},St={class:"state"};function xt(e,n,o,c,u,r){const t=a("nw-icon"),s=a("n-button");return m(),h("div",It,[i(s,{title:"\u63D0\u9192",text:"",onClick:e.handle,style:{display:"flex","align-items":"center"}},{default:f(()=>[i(t,{color:"#4C90F0",size:26,name:"icon-n-y-xinhao"})]),_:1},8,["onClick"]),l("div",St,[A("",!0),A("",!0),i(t,{class:"state success",size:14,name:"icon-n-n-yes"})])])}const Et=$(At,[["render",xt],["__scopeId","data-v-f6902941"]]),Dt=g({components:{},setup(e){const n=_(null),o=_([]),c=_(1),u=_(1),r=_(!1),t=async()=>r.value?!0:Ae({url:De.value,method:"POST",data:{page:{current:c.value,size:10}}}).then(s=>(o.value.push(...s.records.map(d=>({valueKey:Y.value.valueKey,value:d[Y.value.valueKey],labelKey:Y.value.labelKey,label:d[Y.value.labelKey],row:d}))),console.log("-=-=list.value====",o.value),u.value=s.pages,s.current<s.pages&&(c.value=c.value+1),s.current===s.pages));return{scrollRef:n,ActiveMenuData:Y,list:o,loadData(s){console.log(s),t().then(d=>{d?(r.value=!0,s.complete()):s.loaded()})},handle(s){Me.toLevel2Menu(s.valueKey,s.value,s.labelKey,s.label,s.row)},handleParentMenu:Fe}}});const Tt=e=>(Q("data-v-f7c2f2e2"),e=e(),ee(),e),Ft={style:{padding:"5px"}},Lt={style:{padding:"5px 0 5px 5px",background:"var(--light-gray5)","border-top":"1px solid #ccc","border-bottom":"1px solid #ccc"}},Bt=["onClick"],zt={class:"datamore"},Pt=Tt(()=>l("div",{class:"complete",style:{}},"\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",-1)),Ut={style:{padding:"5px"}};function Ot(e,n,o,c,u,r){const t=a("n-button"),s=a("n-input"),d=a("InfiniteLoading"),p=a("n-scrollbar"),v=a("n-popover");return m(),C(v,{"theme-overrides":{padding:0},placement:"bottom-end",trigger:"hover","show-arrow":!1},{trigger:f(()=>[i(t,null,{default:f(()=>[U(w(e.ActiveMenuData.label),1)]),_:1})]),default:f(()=>[l("div",null,[l("div",Ft,[i(s,{size:"small"})]),l("div",Lt,[i(p,{ref:"scrollRef",style:{"max-height":"140px"},trigger:"none",class:"datalist"},{default:f(()=>[(m(!0),h(O,null,ne(e.list,k=>(m(),h("div",{key:k.value,onClick:X=>e.handle(k),class:"dataitem"},w(k.label),9,Bt))),128)),l("div",zt,[i(d,{onInfinite:e.loadData},{complete:f(()=>[Pt]),_:1},8,["onInfinite"])])]),_:1},512)]),l("div",Ut,[l("a",{href:"javascript:void()",onClick:n[0]||(n[0]=(...k)=>e.handleParentMenu&&e.handleParentMenu(...k))},"\u67E5\u770B\u6240\u6709")])])]),_:1})}const Rt=$(Dt,[["render",Ot],["__scopeId","data-v-f7c2f2e2"]]),qt=g({components:{NLayout:I,NLayoutHeader:S,NLayoutContent:x,NDivider:te,NButton:b,NSpace:R,NwIcon:y,NInput:E,NInputGroup:D,NInputGroupLabel:oe,NDrawer:T,NScrollbar:q,NDrawerContent:F,Logout:Kn,Remind:Nt,RealTime:Et,NwMenu:On,DataPick:Rt},setup(e){return Tn(),{EnableMenuLevel2:Z,ActiveMenu:P,handleParentMenu:Fe}}});const Ht={class:"header"},Kt={key:0,class:"header-menulevel2"},Vt={class:"comp"};function jt(e,n,o,c,u,r){const t=a("data-pick"),s=a("nw-menu"),d=a("real-time"),p=a("remind"),v=a("logout"),k=a("n-space");return m(),h(O,null,[l("div",Ht,[e.EnableMenuLevel2?(m(),h("div",Kt,[l("div",{class:"title",onClick:n[0]||(n[0]=(...X)=>e.handleParentMenu&&e.handleParentMenu(...X))},w(e.ActiveMenu.label),1),l("div",Vt,[i(t)])])):A("",!0),i(s)]),i(k,{align:"center"},{default:f(()=>[i(d),i(p),i(v)]),_:1})],64)}const Gt=$(qt,[["render",jt],["__scopeId","data-v-9a4cc6af"]]),ze=_("app");_("");const Pe=_(""),Jt=_({}),pe=_([]);_({});const B=_(""),de=_(!1),M=_({flag:!1,icon:"icon-y-empty",text:""}),ve=_(!0),Wt=()=>{be(),window.addEventListener("hashchange",e=>{ve.value=!1,be()})},be=async function(){de.value=!1,M.value.flag=!1,M.value.icon="icon-y-empty",M.value.text="",B.value="";const[e,n,o,c,u]=window.location.hash.substring(1).split("/");if(!e){M.value.flag=!0,M.value.icon="icon-y-check",M.value.text="\u8BF7\u9009\u62E9\u5E94\u7528\u6A21\u5757";return}if(ze.value=e,e==="portalframe")await V.get("portalInfo").then(r=>r?r.pages[n]?(B.value=r.pages[n],!0):(window.location.hash=`#portalframe/${Object.keys(r.pages)[0]}`,!1):!1);else if(e==="frame")n==="portalframe"?B.value="/web-old/html/portal/template-render.html?portalid=144774667764026982#/index":n==="date-manage"?B.value="/web-smm/pages/scheduleManagement.html":n==="task"&&(B.value="/web-wf/pages/workflow-table.html#/todo");else if(e==="app"){const r=await V.get("bizMenuInfo").then(t=>t.find(s=>s.appCode===n));if(c==="@t3")if(de.value=!0,Pe.value=u,pe.value=r.menus.find(t=>t.key===o).sonMenus,console.log("=@t3==",r.menus.find(t=>t.key===o)),u)B.value=r.pages[u];else{const t=d=>{const p=d.find(v=>v.type===1);if(p)return p;for(let v in d)return t(d[v].children);return!1},s=t(pe.value);if(s){const[d,p,v,k]=window.location.hash.substring(1).split("/");window.location.hash=`${d}/${p}/${v}/${k}/${s.key}`}}else c&&u?B.value=We.addParamtoUrl(r.pages[u],`pm=${c}`):o&&r.pages[o]?B.value=r.pages[o]:(M.value.flag=!0,M.value.icon="icon-y-empty",M.value.text="\u672A\u914D\u7F6E\u9875\u9762")}console.log("=====\u83B7\u53D6\u83DC\u5355\u5B8C\u6210===="),ve.value=!0},Xt=e=>{const[n,o,c,u]=window.location.hash.substring(1).split("/");window.location.hash=`${n}/${o}/${c}/${u}/${e}`},Yt=g({components:{NMenu:fe,NScrollbar:q},setup(){return{AppInfo:Jt,MenuCode:Pe,MenuOptions:pe,handleMenu(e){Xt(e)}}}});const Zt={class:"app-menu"};function Qt(e,n,o,c,u,r){const t=a("n-menu"),s=a("n-scrollbar");return m(),h("div",Zt,[i(s,{class:"content"},{default:f(()=>[i(t,{indent:8,options:e.MenuOptions,value:e.MenuCode,"onUpdate:value":e.handleMenu,"theme-overrides":{itemHeight:"32px",borderRadius:"2px"}},null,8,["options","value","onUpdate:value"])]),_:1})])}const eo=$(Yt,[["render",Qt]]),no=g({props:{icon:{type:String,default:"icon-y-empty"},text:{type:String,default:""}},components:{NLayout:I,NLayoutSider:me,NLayoutHeader:S,NLayoutContent:x,NButton:b,NSpace:R,NwIcon:y,NTag:Ie,NInput:E,NInputGroup:D,NDrawer:T,NDrawerContent:F},setup(e){return{props:e}}});const to={class:"error-content"},oo={class:"text"};function so(e,n,o,c,u,r){const t=a("nw-icon");return m(),h("div",to,[i(t,{size:45,name:e.props.icon},null,8,["name"]),l("div",oo,w(e.props.text),1)])}const ao=$(no,[["render",so],["__scopeId","data-v-e28eb451"]]);Wt();const lo=g({components:{NLayout:I,NLayoutSider:me,NLayoutHeader:S,NLayoutContent:x,NButton:b,NSpace:R,NwIcon:y,NTag:Ie,NInput:E,NInputGroup:D,NDrawer:T,NDrawerContent:F,NwPickPage:an,SideMenu:eo,Error:ao},setup(){return{isShowSider:de,LayoutType:ze,FrameUrl:B,ErrorMsg:M,FrameVisible:ve}}});const io=["src"];function ro(e,n,o,c,u,r){const t=a("error"),s=a("SideMenu"),d=a("n-layout-sider"),p=a("n-layout-content"),v=a("n-layout");return m(),h(O,null,[e.ErrorMsg.flag?(m(),C(t,{key:0,text:e.ErrorMsg.text,icon:e.ErrorMsg.icon},null,8,["text","icon"])):A("",!0),e.FrameVisible?(m(),C(v,{key:1,"has-sider":"",class:"nw-layout-full"},{default:f(()=>[e.isShowSider?(m(),C(d,{key:0,width:"200","content-style":"padding: 0;",style:{"margin-right":"-1px"},"show-trigger":"","collapse-mode":"width","collapsed-width":0},{default:f(()=>[i(s)]),_:1})):A("",!0),i(p,{class:"app-content"},{default:f(()=>[l("iframe",{class:"app-frame",src:e.FrameUrl},null,8,io)]),_:1})]),_:1})):A("",!0)],64)}const co=$(lo,[["render",ro],["__scopeId","data-v-897321f6"]]),uo=g({components:{NConfigProvider:Ne,NDrawer:T,NDrawerContent:F,NLayout:I,NLayoutHeader:S,NLayoutSider:me,NLayoutContent:x,NLayoutFooter:Xe,NThemeEditor:Ye,NButton:b,NInputGroup:D,NInput:E,NForm:Ze,NFormItem:Qe,NPopconfirm:en,NwSider:Dn,NwHeader:Gt,NwAppContent:co},setup(){return{}}});const po={class:"wrapper"},_o={class:"sider"},mo={class:"container"},fo={class:"layout"},vo={class:"layout-header"},ho={class:"layout-content"};function go(e,n,o,c,u,r){const t=a("nw-sider"),s=a("nw-header"),d=a("NwAppContent");return m(),h("article",po,[l("aside",_o,[i(t)]),l("section",mo,[l("div",fo,[l("div",vo,[i(s)]),l("div",ho,[i(d)])])])])}const $o=$(uo,[["render",go]]),Ue=(e,n)=>{const o=e.__vccOpts||e;for(const[c,u]of n)o[c]=u;return o},yo={},wo=e=>(Q("data-v-39432f99"),e=e(),ee(),e),bo={class:"container"},ko=wo(()=>l("div",{class:"spinner"},null,-1)),Co=[ko];function Mo(e,n){return m(),h("div",bo,Co)}const No=Ue(yo,[["render",Mo],["__scopeId","data-v-39432f99"]]),Ao=e=>({loading(){e.value="loading"},loaded(){e.value="loaded"},complete(){e.value="complete"},error(){e.value="error"}}),Io=(e,n)=>()=>{n.loading(),e("infinite",n)},So=(e,n)=>{const o=e.getBoundingClientRect();if(!n)return o.top>=0&&o.bottom<=window.innerHeight;const c=n.getBoundingClientRect();return o.top>=c.top&&o.bottom<=c.bottom};let _e;const ke=e=>{e.parentEl=document.querySelector(e.target)||null;let n=`0px 0px ${e.distance}px 0px`;e.top&&(n=`${e.distance}px 0px 0px 0px`),_e=new IntersectionObserver(o=>{o[0].isIntersecting&&(e.firstload&&e.emit(),e.firstload=!0)},{root:e.parentEl,rootMargin:n}),_e.observe(e.infiniteLoading.value)},re=()=>{_e.disconnect()},xo={class:"state-error"},Eo={__name:"InfiniteLoading",props:{top:{type:Boolean,required:!1},target:{type:[String,Boolean],required:!1},distance:{type:Number,required:!1,default:0},identifier:{required:!1},firstload:{type:Boolean,required:!1,default:!0},slots:{type:Object,required:!1}},emits:["infinite"],setup(e,{emit:n}){const o=e,c=_(null),u=_("ready"),{top:r,firstload:t,target:s,distance:d}=o,{identifier:p}=He(o),v={infiniteLoading:c,target:s,top:r,firstload:t,distance:d,emit:Io(n,Ao(u)),parentEl:null},k=()=>he(u,async L=>{const j=v.parentEl||document.documentElement,G=j.scrollHeight;await Ce(),L=="loaded"&&r&&(j.scrollTop=j.scrollHeight-G),L=="loaded"&&So(c.value,v.parentEl)&&v.emit(),L=="complete"&&re()}),X=()=>he(p,()=>{u.value="ready",re(),ke(v)});return Ke(()=>{ke(v),k(),p&&X()}),Ve(()=>{re()}),(L,j)=>(m(),h("div",{ref_key:"infiniteLoading",ref:c},[u.value=="loading"?ie(L.$slots,"spinner",{key:0},()=>[i(No)],!0):A("v-if",!0),u.value=="complete"?ie(L.$slots,"complete",{key:1},()=>{var G;return[l("span",null,w(((G=e.slots)==null?void 0:G.complete)||"No more results!"),1)]},!0):A("v-if",!0),u.value=="error"?ie(L.$slots,"error",{key:2,retry:v.emit},()=>{var G;return[l("span",xo,[l("span",null,w(((G=e.slots)==null?void 0:G.error)||"Oops something went wrong!"),1),l("button",{class:"retry",onClick:j[0]||(j[0]=(...Oe)=>v.emit&&v.emit(...Oe))},"retry")])]},!0):A("v-if",!0)],512))}},Do=Ue(Eo,[["__scopeId","data-v-231b1688"]]);nn($o,!0).use(rn).use(ln).component("InfiniteLoading",Do).mount("#app");
