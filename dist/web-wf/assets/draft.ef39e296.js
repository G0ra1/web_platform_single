import{d as F,L as v,M as B,D as O,E as g,G as b,an as k,aQ as E,i as D,K as y,a as x,b as C,c as _,aR as H,h as A,I as S,n as T,l as s,m as L,V as I,P as t,R as P,Q as R,_ as V,s as $,S as q,p as z,q as G}from"./index.b9dd0157.js";const K=F({components:{NDrawer:v,NDrawerContent:B,NLayout:O,NLayoutHeader:g,NLayoutContent:b,NLayoutFooter:k,NThemeEditor:E,NButton:D,NInputGroup:y,NInput:x,NForm:C,NFormItem:_,NPopconfirm:H,NSelect:A,NwIcon:S},setup(){const a=T(),o=s(!1),l=s({}),n=s(null),i=s("\u65B0\u95FB\u65B0\u5EFA"),d=s(!0),u=L({title:""}),f=s([]),c=s([]),{bind:p,gridRef:m,filterData:w,query:h,reset:N}=new I.VxeGridPaging({columns:[{type:"seq",width:40,minWidth:40,fixed:"left"},{field:"code",title:"\u5355\u636E\u7F16\u53F7",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>t("span",{onClick:()=>{window.open(`/web-wf/pages/run-skin.html?Action=draft&id=${e.id}`,"_blank","top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no")},style:"color:#1d7ced;cursor: pointer;"},e.bizKey)}},{field:"procdefTypeName",title:"\u6D41\u7A0B\u5206\u7C7B",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>[t("span",null,e.procdefTypeName)]}},{field:"",title:"\u7533\u8BF7\u4EBA / \u7533\u8BF7\u65F6\u95F4",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>[t("span",null,(e.starterNameStd||e.starterName||"-")+"/"+(e.applyTime||"-"))]}},{field:"",title:"\u5BA1\u6279\u72B6\u6001",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>{let r="";switch(e.state){case 1:r="\u8FD0\u884C\u4E2D";break;case 2:r="\u5B8C\u6210";break;case 3:r="\u6302\u8D77";break;case 4:r="\u7EC8\u6B62";break;case 5:r="\u77E5\u4F1A";break}return[t("span",null,r)]}}},{field:"reason",title:"\u6807\u9898",showHeaderOverflow:!0,showOverflow:!0},{field:"",title:"\u5F85\u529E\u4EBA / \u7B7E\u6536\u65F6\u95F4",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>[t("span",null,(e.assigneeName||"-")+"/"+(e.cliamTime||"-"))]}},{field:"",title:"\u7533\u8BF7\u673A\u6784 / \u7533\u8BF7\u90E8\u95E8",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>[t("span",null,(e.starterOrgNameStd||e.starterOrgName)+"/"+(e.starterDeptNameStd||e.starterDeptName))]}},{field:"taskName",title:"\u4EFB\u52A1\u540D",showHeaderOverflow:!0,showOverflow:!0,slots:{default:({row:e})=>[t("span",null,e.taskNameStd||e.taskName)]}},{field:"",title:"\u64CD\u4F5C",showHeaderOverflow:!0,showOverflow:!0,fixed:"right",slots:{default:({row:e})=>[t("a",{type:"text",size:"small",style:"margin-left:5px;cursor: pointer;",onClick:()=>{}},"\u67E5\u770B")]}}]},new P("/wf/wftodotask/draftList","post"));return R().then(()=>{N({})}),{bind:p,gridRef:m,filterData:w,query:h,refresh:d,headerSearchForm:u,partOptions:c,portalOptions:f,message:a,contentTile:i,formVisible:o,formValue:{},Form:n,model:l}},created(){},methods:{show(){},test(){this.message.success("\u4FDD\u5B58\u6210\u529F")}}});function M(a,o,l,n,i,d){const u=z("vxe-grid");return G(),$(u,q(a.bind,{ref:"gridRef"}),null,16)}const W=V(K,[["render",M]]);export{W as default};
