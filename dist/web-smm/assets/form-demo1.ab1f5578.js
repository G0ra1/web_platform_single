var v=Object.defineProperty;var D=(t,e,u)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[e]=u;var n=(t,e,u)=>(D(t,typeof e!="symbol"?e+"":e,u),u);import{r as c,l as F,d as x,m as C,N as w,E as _,k as y,G as B,B as h,_ as E,I as m,o as N,c as M,a as o,w as r,a6 as R,e as L,F as k,p as z}from"./index.e51afe9d.js";import{A as I}from"./index.f2e37b57.js";import{N as T}from"./FormItemGridItem.d78d7d10.js";import{N as S}from"./InputNumber.9cc11044.js";const $={sumBudgetExecuteAmount:{name:"sumBudgetExecuteAmount",type:"number",description:"\u9884\u7B97\u6267\u884C\u91D1\u989D",example:"",exampleSetFlag:!0},sumDeductionTaxAmount:{name:"sumDeductionTaxAmount",type:"number",description:"\u62B5\u6263\u8FDB\u9879\u7A0E",example:"",exampleSetFlag:!0},sumDeductionAmount:{name:"sumDeductionAmount",type:"number",description:"\u6263\u51CF\u91D1\u989D",example:"",exampleSetFlag:!0},testprocBudgetinfoList:{name:"testprocBudgetinfoList",type:"array",description:"testprocBudgetinfoList",items:{name:"\u62A5\u9500\u9884\u7B97\u4FE1\u606F Dto",title:"\u62A5\u9500\u9884\u7B97\u4FE1\u606F Dto",type:"object",properties:{expenseName:{name:"expenseName",type:"string",description:"\u62A5\u9500\u540D\u79F0"},expenseBizKey:{name:"expenseBizKey",type:"string",description:"\u62A5\u9500\u540D\u79F0"},budgetAmount:{name:"budgetAmount",type:"number",description:"\u9884\u7B97\u6570"}}}}};class V extends I{constructor(){super();n(this,"formRef",c());n(this,"dataModel",c({}));n(this,"rules",c({}));n(this,"brules",c({}));n(this,"getSchema",async()=>$);n(this,"setValue",u=>{this.dataModel.value=u});n(this,"getValue",async()=>F.exports.cloneDeep(this.dataModel.value));n(this,"setRules",u=>{this.rules.value={},Object.entries(u).forEach(([s,l])=>{s.includes(".")||(l.powerCode==="required"?this.rules.value[s]={required:!0,trigger:["blur","input"],message:`${l.nameCh}\u8BE5\u5C5E\u6027\u4E3A\u5FC5\u586B`}:this.brules.value[s]=l.powerCode)})});n(this,"validate",async()=>{var s;let u=[];return await((s=this.formRef.value)==null?void 0:s.validate().then(()=>{u=[]}).catch(l=>{u=l.map(f=>f[0].message)})),u})}}const O=x({components:{NForm:C,NFormItem:w,NGrid:_,NFormItemGi:T,NInput:y,NInputNumber:S,NButton:B},setup(){const{formRef:t,dataModel:e,rules:u,brules:s,setValue:l,getValue:f,validate:i,setRules:d}=new V;return d({sumBudgetExecuteAmount:{powerCode:"required",nameCh:"\u6D4B\u8BD5"}}),{formRef:t,dataModel:e,rules:u,brules:s,validate:i,testshow:()=>{f().then(a=>{console.log(a)}),i().then(a=>{})},gridOption:c({rowId:"id",rowKey:!1,keepSource:!0,size:"mini",showOverflow:!1,highlightHoverRow:!0,border:!0,data:e.value.testprocBudgetinfoList,toolbarConfig:{slots:{buttons:({$grid:a})=>[h(B,{type:"primary",onClick:function(){e.value.testprocBudgetinfoList||(e.value.testprocBudgetinfoList=[]),e.value.testprocBudgetinfoList.push({id:`${new Date().getTime()}`}),a.reloadData(e.value.testprocBudgetinfoList)}},{default:()=>"\u65B0\u589E"})]}},editConfig:{trigger:"click",mode:"row",showStatus:!0},columns:[{title:"\u62A5\u9500\u7C7B\u578B",field:"expenseType",showOverflow:"title",minWidth:200,editRender:{name:"$select",options:[{label:"\u7C7B\u578B1",value:1},{label:"\u7C7B\u578B2",value:2}],attrs:{placeholder:"\u62A5\u9500\u7C7B\u578B"}}},{title:"\u62A5\u9500\u540D\u79F0",field:"expenseName",minWidth:190,editRender:{name:"input",attrs:{placeholder:"\u62A5\u9500\u540D\u79F0"}}},{title:"\u62A5\u9500\u5355\u53F7",field:"expenseBizKey",minWidth:150,editRender:{name:"input",attrs:{placeholder:"\u62A5\u9500\u5355\u53F7"}}},{title:"\u9884\u7B97\u6570",field:"budgetAmount",minWidth:150,editRender:{name:"input",attrs:{placeholder:"\u62A5\u9500\u5355\u53F7"}}},{title:"\u64CD\u4F5C",width:70,fixed:"right",slots:{default:({$table:a,rowIndex:g})=>[h(B,{size:"small",type:"error",onClick:function(){e.value.testprocBudgetinfoList.splice(g,1),a.reloadData(e.value.testprocBudgetinfoList)}},{default:()=>"\u5220\u9664"})]}}]})}}});function K(t,e,u,s,l,f){const i=m("n-input-number"),d=m("n-form-item-gi"),a=m("vxe-grid"),g=m("n-grid"),A=m("n-form"),b=m("n-button");return N(),M(k,null,[o(A,{model:t.dataModel,rules:t.rules,ref:"formRef","label-placement":"left","label-width":160,size:"small",style:{padding:"45px"}},{default:r(()=>[o(g,{cols:24,"x-gap":24},{default:r(()=>[o(d,{span:12,label:"\u9884\u7B97\u6267\u884C\u91D1\u989D",path:"sumBudgetExecuteAmount"},{default:r(()=>[o(i,{placeholder:"Input",value:t.dataModel.sumBudgetExecuteAmount,"onUpdate:value":e[0]||(e[0]=p=>t.dataModel.sumBudgetExecuteAmount=p)},null,8,["value"])]),_:1}),o(d,{span:12,label:"\u62B5\u6263\u8FDB\u9879\u7A0E",path:"sumDeductionTaxAmount"},{default:r(()=>[o(i,{placeholder:"Input",value:t.dataModel.sumDeductionTaxAmount,"onUpdate:value":e[1]||(e[1]=p=>t.dataModel.sumDeductionTaxAmount=p)},null,8,["value"])]),_:1}),o(d,{span:12,label:"\u6263\u51CF\u91D1\u989D",path:"sumDeductionAmount"},{default:r(()=>[o(i,{placeholder:"Input",value:t.dataModel.sumDeductionAmount,"onUpdate:value":e[2]||(e[2]=p=>t.dataModel.sumDeductionAmount=p)},null,8,["value"])]),_:1}),o(d,{span:24,label:"\u9884\u7B97"},{default:r(()=>[o(a,R(t.gridOption,{style:{"moz-user-select":"-moz-none","-moz-user-select":"none","-o-user-select":"none","-khtml-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"}}),null,16)]),_:1})]),_:1})]),_:1},8,["model","rules"]),o(b,{onClick:t.testshow},{default:r(()=>[L("Test")]),_:1},8,["onClick"])],64)}const W=E(O,[["render",K]]);z(W).mount("#app");
