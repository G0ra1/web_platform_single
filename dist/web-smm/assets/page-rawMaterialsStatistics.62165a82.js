import{ae as k,al as j,am as x,ar as X,aq as Y,as as me,ao as K,k as P,at as z,au as T,G as B,ap as D,H as L,an as J,av as pe,r as f,a9 as M,B as C,_ as $,I as u,o as A,b as R,w as o,g as U,a as t,d as S,m as E,N as O,E as Q,M as Z,a8 as ee,h as te,ag as q,aw as le,ax as oe,j as fe,ay as H,a5 as G,aa as ce,a7 as ve,e as I,a6 as ae,t as ge,az as ye,aA as _e,aB as V,aC as he,c as be,F as Ne,p as we}from"./index.e51afe9d.js";import{N as ne,a as ue,M as ie,b as Ce,c as Ie,O as ke}from"./index.9875855d.js";import{N as se}from"./text.6614a830.js";import{N as Fe}from"./InputNumber.9cc11044.js";import"./Radio.95abfb5b.js";import"./FormItemGridItem.d78d7d10.js";function W(e){return k({url:"/supp/suppFillCommodity/page",method:"post",data:e})}function de(e){return k({url:"/supp/suppFillCommodity",method:"post",data:e})}function re(e){return k({url:"/supp/suppFillCommodity",method:"put",data:e})}function De(e){return k({url:`/supp/suppFillCommodity/${e}`,method:"delete"})}function Ue(e){return k({url:`/supp/suppFillCommodity/${e}`,method:"get"})}function Pe(e){return k({url:"/supp/suppCommodityItem/list",method:"post",data:e})}function ze(e){return k({url:"/main/mdmOrg/list",method:"post",data:e})}const Be={components:{NLayout:j,NLayoutHeader:x,NLayoutSider:X,NLayoutContent:Y,NLayoutFooter:me,NInputGroup:K,NInput:P,NSpin:z,NModal:T,NButton:B,NwIcon:D,NSwitch:L,NSpace:J,NTree:pe},props:{rootName:{type:String,default:""},multiple:{type:Boolean,default:!1},value:{type:String,default:""}},emits:["callback"],setup(e,l){const v=f([]),n=f(!1),y=f(""),_=({option:i})=>C(C("div",null,C(D,{name:i.appType==2?i.appIcon:"icon-n-y-fenjifenlei",size:15}))),m=()=>{n.value=!0,ze({isDefault:0,status:1}).then(i=>{v.value=i,n.value=!1})};return M(()=>{m()}),{props:e,renderPrefix:_,getTreeList:m,pattern:y,tIsLoading:n,treeData:v,nodeProps:({option:i})=>({onClick(){l.emit("callback",i)},onContextmenu(d){optionsRef.value=[i],showDropdownRef.value=!0,xRef.value=d.clientX,yRef.value=d.clientY,console.log(d.clientX,d.clientY),d.preventDefault()}})}}};const Me={class:"questionHeader"};function $e(e,l,v,n,y,_){const m=u("n-input"),i=u("n-tree"),d=u("n-spin"),g=u("n-space");return A(),R(g,{vertical:"",size:12},{default:o(()=>[U("div",Me,[t(m,{placeholder:"\u641C\u7D22",style:{},value:n.pattern,"onUpdate:value":l[0]||(l[0]=c=>n.pattern=c)},null,8,["value"])]),t(d,{show:n.tIsLoading},{default:o(()=>[t(i,{data:n.treeData,"children-field":"children","label-field":"orgName","key-field":"id","render-prefix":n.renderPrefix,"block-line":"",pattern:n.pattern,"virtual-scroll":"",class:"treeH","node-props":n.nodeProps},null,8,["data","render-prefix","pattern","node-props"])]),_:1},8,["show"])]),_:1})}const Ae=$(Be,[["render",$e]]),Te=S({components:{NModal:T,NInput:P,NForm:E,NFormItem:O,NGrid:Q,NGridItem:Z,NTreeSelect:ee,NSelect:te,NButton:B,NSpin:z,NTag:q,NImage:ne,NText:se,NP:ue,NwDic:le,NwIcon:D,NwIconPick:oe,MenuPick:ie,NwPickPage:Ce,NSwitch:L,NInputNumber:Fe,NDatePicker:fe},props:{},setup(e,l){const v=f(!1),n=f({}),y=f(),_=f(),m=f(!1),i=f([]),d=H(),g=(p={})=>{v.value=!0,p.id&&Ue(p.id).then(r=>{r.detailList&&(c.value=r.detailList,G(()=>{y.value.reloadData(c.value)}))}),p.detailList&&(c.value=p.detailList),n.value=p,ce.get("userInfo").then(r=>{n.value.deptName||(console.log(r,"\u7528\u6237\u4FE1\u606F"),n.value.deptName=r.parentDeptName,n.value.deptNameId=r.parentDeptId)}),n.value.fillTime||(n.value.fillTime=ve(new Date,"yyyy-MM-dd HH:mm:ss")),G(()=>{y.value.reloadData(c.value)})},c=f([]),h=p=>{n.value.valuecommodityItemName=c.value.filter(r=>r.value==p)[0].label,n.value.commodityItemUnit=c.value.filter(r=>r.value==p)[0].commodityItemUnit,n.value.sn=c.value.filter(r=>r.value==p)[0].sn},b=f({rowId:"rowId",rowKey:!1,keepSource:!1,height:"500px",size:"mini",showOverflow:!1,highlightHoverRow:!0,border:!0,data:c.value,editConfig:{trigger:"click",mode:"cell",showStatus:!0,autoClear:!1},columns:[{title:"\u6392\u5E8F",field:"sn",minWidth:100},{title:" \u6750\u6599\u540D",field:"commodityItemName",showOverflow:"title",minWidth:200},{title:"\u5355\u4F4D",field:"commodityItemUnit",showOverflow:"title",minWidth:200},{title:"\u4EF7\u683C",field:"commodityItemPrice",showOverflow:"title",minWidth:200,editRender:{},slots:{default:"commodityItemPrice_default",edit:"commodityItemPrice_edit"}}]});M(()=>{Pe({}).then(p=>{console.log(p,"\u6765\u6E90++++++++"),c.value=p.map(r=>({commodityItemName:r.commodityItemName,commodityItemUnit:r.commodityItemUnit,sn:r.sn}))})});const N=f({commodityItemName:{required:!0,trigger:["focus","input"],message:"\u8BF7\u9009\u62E9\u5927\u5B97\u5546\u54C1\u540D\u79F0"},commodityItemPrice:{required:!0,trigger:["focus","input"],message:"\u8BF7\u8F93\u5165\u5927\u5B97\u5546\u54C1\u4EF7\u683C"},sn:{required:!0,trigger:["focus","input"],type:"number",message:"\u8BF7\u8F93\u5165\u6392\u5E8F"}});return{showModal:v,message:d,model:n,formRef:_,isLoading:m,rules:N,sonFn:g,dzsply:c,dzsplyChangeEvent:h,detailVxeGrid:y,detailListGridOption:b,getFormMessage(p,r){n.value.formId=r.id,n.value.formUrl=r.pageUrl,n.value.formTargetUrl=r.targetUrl},platformDictCodes:i,onPositiveClick(){const p=n.value.id?re:de;let r={...n.value,detailList:c.value};_.value.validate(s=>{s||(m.value=!0,p(r).then(a=>{a&&(l.emit("update:callback"),v.value=!1)}).finally(a=>{m.value=!1}))})},onNegativeClick(){v.value=!1}}},methods:{}}),Le={style:{padding:"0 5px 5px 0"}};function Re(e,l,v,n,y,_){const m=u("n-date-picker"),i=u("n-form-item"),d=u("n-grid-item"),g=u("n-input"),c=u("n-input-number"),h=u("vxe-grid"),b=u("n-grid"),N=u("n-form"),p=u("n-spin"),r=u("n-button"),s=u("n-modal");return A(),R(s,{show:e.showModal,"onUpdate:show":l[3]||(l[3]=a=>e.showModal=a),"mask-closable":!1,preset:"dialog",title:"\u5927\u5B97\u7269\u8D44\u539F\u6750\u6599\u4EF7\u683C\u65E5\u5E38\u7EF4\u62A4",content:"\u4F60\u786E\u8BA4","positive-text":"\u786E\u8BA4","negative-text":"\u53D6\u6D88",style:{width:"800px"},ref:"xmodal"},{action:o(()=>[U("div",Le,[t(r,{size:"small",type:"default",style:{"margin-right":"5px"},onClick:l[2]||(l[2]=a=>e.showModal=!1)},{default:o(()=>[I("\u53D6\u6D88")]),_:1}),t(r,{size:"small",type:"info",onClick:e.onPositiveClick,disabled:e.btloading},{default:o(()=>[I("\u4FDD\u5B58")]),_:1},8,["onClick","disabled"])])]),default:o(()=>[t(p,{show:e.isLoading},{default:o(()=>[t(N,{model:e.model,ref:"formRef",rules:e.rules},{default:o(()=>[t(b,{"x-gap":"8",cols:1},{default:o(()=>[t(d,null,{default:o(()=>[t(i,{label:"\u586B\u62A5\u65F6\u95F4",path:"fillTime"},{default:o(()=>[t(m,{style:{width:"100%"},"formatted-value":e.model.fillTime,"onUpdate:formatted-value":l[0]||(l[0]=a=>e.model.fillTime=a),"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime"},null,8,["formatted-value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u8BF4\u660E",path:"explanation"},{default:o(()=>[t(g,{placeholder:"\u8BF7\u8F93\u5165\u8BF4\u660E",onBlur:e.clearActive,value:e.model.explanation,"onUpdate:value":l[1]||(l[1]=a=>e.model.explanation=a)},null,8,["onBlur","value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u4EF7\u683C\u7EF4\u62A4\u5F55\u5165"},{default:o(()=>[t(h,ae({ref:"detailVxeGrid"},e.detailListGridOption,{style:{width:"100%"}}),{commodityItemPrice_default:o(({row:a,column:w})=>[U("span",null,ge(a.commodityItemPrice),1)]),commodityItemPrice_edit:o(({row:a,column:w})=>[t(c,{placeholder:"\u8BF7\u8F93\u5165\u5927\u5B97\u5546\u54C1\u4EF7\u683C",onBlur:e.clearActive,value:a.commodityItemPrice,"onUpdate:value":F=>a.commodityItemPrice=F},null,8,["onBlur","value","onUpdate:value"])]),_:1},16)]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1},8,["show"])}const Se=$(Te,[["render",Re]]),Ee=S({components:{NModal:T,NInput:P,NForm:E,NFormItem:O,NGrid:Q,NGridItem:Z,NTreeSelect:ee,NSelect:te,NButton:B,NSpin:z,NTag:q,NImage:ne,NText:se,NP:ue,NwDic:le,NwIcon:D,NwIconPick:oe,MenuPick:ie,NwPickCpts:Ie,NSwitch:L},props:{},setup(e,l){const v=f(!1),n=f({}),y=f(),_=f(!1),m=f([]),i=H(),d=(g={})=>{v.value=!0,n.value={...g}};return M(()=>{}),{showModal:v,message:i,model:n,formRef:y,isLoading:_,sonFn:d,platformDictCodes:m,onPositiveClick(){const g=n.value.id?re:de;y.value.validate(c=>{c||(_.value=!0,g(n.value).then(h=>{h&&(l.emit("update:callback"),v.value=!1)}).finally(h=>{_.value=!1}))})},onNegativeClick(){v.value=!1}}},methods:{}}),Oe={style:{padding:"0 5px 5px 0"}};function qe(e,l,v,n,y,_){const m=u("n-input"),i=u("n-form-item"),d=u("n-grid-item"),g=u("n-select"),c=u("nw-pick-cpts"),h=u("n-grid"),b=u("n-form"),N=u("n-spin"),p=u("n-button"),r=u("n-modal");return A(),R(r,{show:e.showModal,"onUpdate:show":l[12]||(l[12]=s=>e.showModal=s),"mask-closable":!1,preset:"dialog",title:"\u529F\u80FD\u7EF4\u62A4",content:"\u4F60\u786E\u8BA4","positive-text":"\u786E\u8BA4","negative-text":"\u53D6\u6D88",style:{width:"800px"},ref:"xmodal"},{action:o(()=>[U("div",Oe,[t(p,{size:"small",type:"default",style:{"margin-right":"5px"},onClick:l[11]||(l[11]=s=>e.showModal=!1)},{default:o(()=>[I("\u53D6\u6D88")]),_:1}),t(p,{size:"small",type:"info",onClick:e.onPositiveClick,disabled:e.btloading},{default:o(()=>[I("\u4FDD\u5B58")]),_:1},8,["onClick","disabled"])])]),default:o(()=>[t(N,{show:e.isLoading},{default:o(()=>[t(b,{model:e.model,ref:"formRef",rules:e.rules},{default:o(()=>[t(h,{"x-gap":"8",cols:2},{default:o(()=>[t(d,null,{default:o(()=>[t(i,{label:"\u6309\u94AE\u540D\u79F0",path:"menuName"},{default:o(()=>[t(m,{size:"small",placeholder:"\u8BF7\u8F93\u5165",value:e.model.menuName,"onUpdate:value":l[0]||(l[0]=s=>e.model.menuName=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u6309\u94AE\u7F16\u7801",path:"menuCode",disabled:""},{default:o(()=>[t(m,{size:"small",placeholder:"\u8BF7\u8F93\u5165",value:e.model.menuCode,"onUpdate:value":l[1]||(l[1]=s=>e.model.menuCode=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u6240\u5C5E\u83DC\u5355",path:"parentFullName"},{default:o(()=>[t(m,{size:"small",disabled:"",placeholder:"\u8BF7\u8F93\u5165",value:e.model.parentFullName,"onUpdate:value":l[2]||(l[2]=s=>e.model.parentFullName=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u9875\u9762\u540D\u79F0",path:"parentName"},{default:o(()=>[t(m,{size:"small",disabled:"",placeholder:"\u8BF7\u8F93\u5165",value:e.model.parentName,"onUpdate:value":l[3]||(l[3]=s=>e.model.parentName=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u8868\u5355\u6309\u94AEcode",path:"buttonCode"},{default:o(()=>[t(m,{size:"small",placeholder:"\u8BF7\u8F93\u5165",value:e.model.buttonCode,"onUpdate:value":l[4]||(l[4]=s=>e.model.buttonCode=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u6392\u5E8F",path:"sort"},{default:o(()=>[t(m,{size:"small",placeholder:"\u8BF7\u8F93\u5165",value:e.model.sort,"onUpdate:value":l[5]||(l[5]=s=>e.model.sort=s)},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u6309\u94AE\u7C7B\u578B",path:"buttonType"},{default:o(()=>[t(g,{value:e.model.buttonType,"onUpdate:value":l[6]||(l[6]=s=>e.model.buttonType=s),placeholder:"\u8BF7\u9009\u62E9\u6309\u94AE\u7C7B\u578B",options:[{value:"default",label:"default"},{value:"tertiary",label:"tertiary"},{value:"primary",label:"primary"},{value:"success",label:"success"},{value:"info",label:"info"},{value:"warning",label:"warning"},{value:"error",label:"error"}]},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u6309\u94AE\u5C3A\u5BF8",path:"buttonSize"},{default:o(()=>[t(g,{value:e.model.buttonSize,"onUpdate:value":l[7]||(l[7]=s=>e.model.buttonSize=s),placeholder:"\u8BF7\u9009\u62E9\u6309\u94AE\u5C3A\u5BF8",options:[{value:"tiny",label:"tiny"},{value:"small",label:"small"},{value:"medium",label:"medium"},{value:"large",label:"large"}]},null,8,["value"])]),_:1})]),_:1}),t(d,null,{default:o(()=>[t(i,{label:"\u5173\u8054\u529F\u80FD",path:"functionId"},{default:o(()=>[t(c,{fullName:e.model.functionName,"onUpdate:fullName":l[8]||(l[8]=s=>e.model.functionName=s),value:e.model.functionId,"onUpdate:value":l[9]||(l[9]=s=>e.model.functionId=s)},null,8,["fullName","value"])]),_:1})]),_:1}),t(d,{span:24},{default:o(()=>[t(i,{label:"\u63CF\u8FF0",path:"description"},{default:o(()=>[t(m,{size:"small",placeholder:"\u8BF7\u8F93\u5165",type:"textarea",value:e.model.description,"onUpdate:value":l[10]||(l[10]=s=>e.model.description=s)},null,8,["value"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1},8,["show"])}const He=$(Ee,[["render",qe]]),Ge=S({components:{NLayout:j,NLayoutHeader:x,NLayoutContent:Y,NButton:B,NSpace:J,NwIcon:D,NTag:q,NInput:P,NInputGroup:K,NDrawer:ye,SideTree:Ae,NForm:E,NFormItem:O,NSpin:z,NDrawerContent:_e,ModalAction:Se,NPopconfirm:V,ButtonAction:He,NLayoutSider:X,OrgTree:ke},setup(){const e=f([]),l=f(),v=f(),n=f(),y=f({}),_=H(),m=f(""),i=f("0"),d=f("root"),g=a=>{console.log(a,"row......."),i.value=a.id,d.value=a.orgName,h()},c=a=>{let w=a.id;De(w).then(F=>{_.success("\u5220\u9664\u6210\u529F"),h()})},h=()=>{s.loading=!0,W({deptId:i.value,searchName:b.value}).then(a=>{e.value=a.records,l.value.loadData(a.records),s.loading=!1})},b=()=>{l.value.commitProxy("query")},N=(a={})=>{v.value.sonFn(a)},p=(a={})=>{n.value.sonFn(a)},s=he({rowId:"id",size:"mini",border:!0,height:"auto",align:null,loading:!1,columns:[{type:"seq",width:50,minWidth:50},{field:"createUserName",title:"\u586B\u62A5\u4EBA",showHeaderOverflow:!0},{field:"fillTime",title:"\u586B\u62A5\u65F6\u95F4",showHeaderOverflow:!0},{field:"explanation",title:"\u8BF4\u660E",showHeaderOverflow:!0},{field:"",title:"\u64CD\u4F5C",showHeaderOverflow:!0,width:"100px",slots:{default:({row:a})=>[C("div",null,C("a",{onClick:()=>a.menuType==2?p(a):N({...a}),style:"color:#4098fc;cursor: pointer;display:inline-block;"},"\u4FEE\u6539"),C(V,{"onPositive-click":w=>{c(a)},"positive-text":"\u786E\u5B9A","negative-text":"\u53D6\u6D88"},{trigger:()=>C("a",{style:"color:red;cursor: pointer;display:inline-block;margin-left:8px"},"\u5220\u9664"),default:()=>`\u662F\u5426\u5220\u9664\u5927\u5B97\u5546\u54C1${a.commodityItemName}\uFF1F`}),C("a",{onClick:()=>p({menuType:2,...y.value,parentFullName:a.parentFullName+"/"+a.menuName,parentName:a.menuName,parentFullId:a.parentFullId+"/"+a.id,parentId:a.id}),style:`${a.menuType==1?"display:inline-block":"display:none"};color:#4098fc;cursor: pointer;margin-left:15px`},"\u5173\u8054\u529F\u80FD"))]}}],pagerConfig:{pageSize:20},columnConfig:{resizable:!0},proxyConfig:{form:!0,seq:!0,props:{result:"result",total:"total"},ajax:{query:({page:a})=>new Promise(w=>{W({pgtCustomName:m.value,page:{current:a.currentPage,size:a.pageSize}}).then(F=>{w({total:F.total,result:F.records})})})}}});return M(()=>{}),{sideTreeCallback:g,gridOptions:s,rightDatas:e,tableRef:l,appMessage:y,buttonlAction:n,modalAction:v,showAction:N,showButtonAction:p,getRightData:h,handDel:c,searchName:b,pgtCustomName:m,deptId:i,deptName:d}}}),Ve=U("span",null,null,-1);function We(e,l,v,n,y,_){const m=u("n-space"),i=u("n-input"),d=u("n-form-item"),g=u("n-button"),c=u("n-form"),h=u("nw-icon"),b=u("n-layout-header"),N=u("vxe-grid"),p=u("n-layout-content"),r=u("n-layout"),s=u("ModalAction"),a=u("ButtonAction");return A(),be(Ne,null,[t(r,{class:"nw-layout-full"},{default:o(()=>[t(b,{class:"nw-layout-header"},{default:o(()=>[t(m,{size:5},{default:o(()=>[Ve]),_:1}),t(m,{size:5,style:{padding:"0 5px",position:"absolute"}},{default:o(()=>[t(c,{ref:"formRef",inline:"","label-placement":"left","label-align":"right","label-width":120,model:e.SearchForm,style:{height:"30px"}},{default:o(()=>[t(d,{label:"\u5927\u5B97\u5546\u54C1\u540D\u79F0",path:"commodityItemName"},{default:o(()=>[t(i,{placeholder:"\u5927\u5B97\u5546\u54C1\u540D\u79F0",value:e.commodityItemName,"onUpdate:value":l[0]||(l[0]=w=>e.commodityItemName=w)},null,8,["value"])]),_:1}),t(d,null,{default:o(()=>[t(g,{type:"info","attr-type":"button",style:{"margin-right":"5px"},onClick:l[1]||(l[1]=()=>{e.searchName()})},{default:o(()=>[I(" \u67E5\u8BE2 ")]),_:1}),t(g,{type:"warning","attr-type":"button",onClick:l[2]||(l[2]=()=>{e.pgtCustomName="",e.tableRef.loadData(e.rightDatas)})},{default:o(()=>[I(" \u91CD\u7F6E ")]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),t(m,{size:5,style:{padding:"0 5px"}},{default:o(()=>[t(g,{type:"primary",onClick:l[3]||(l[3]=w=>e.showAction([]))},{icon:o(()=>[t(h,{name:"icon-n-y-add",size:14})]),default:o(()=>[I(" \u65B0\u5EFA ")]),_:1})]),_:1})]),_:1}),t(r,{"has-sider":"","content-style":"height: 100%"},{default:o(()=>[t(p,null,{default:o(()=>[t(N,ae(e.gridOptions,{ref:"tableRef",class:"mytable-scrollbar"}),null,16)]),_:1})]),_:1})]),_:1}),t(s,{ref:"modalAction","onUpdate:callback":l[4]||(l[4]=()=>{e.getRightData()})},null,512),t(a,{ref:"buttonlAction","onUpdate:callback":l[5]||(l[5]=()=>{e.getRightData()})},null,512)],64)}const je=$(Ge,[["render",We]]);we(je).mount("#app");
