import{d as c,r as p,a as s,o as l,g as i,b as t,w as a,f as r,F as f}from"./runtime-dom.esm-bundler.bf4f36cb.js";import{a as u,b as _,c as N,e as d,f as w,eL as F,_ as C,m as V}from"./index.0e7eb3bd.js";import{N as g}from"./FormItemGridItem.5c201774.js";const k=c({components:{NForm:u,NFormItem:_,NGrid:N,NFormItemGi:g,NInput:d,NButton:w,NwFormViewer:F},setup(){const e=p();return{formRef:e,testSet(){e.value.setValue({applyTime:"test"})},testGet(){e.value.getValue().then(o=>{console.log(o)})}}}});function G(e,o,h,S,$,v){const m=s("NwFormViewer"),n=s("n-button");return l(),i(f,null,[t(m,{ref:"formRef",src:"/smm/jiZhongNatgasSell"},null,512),t(n,{onClick:e.testSet},{default:a(()=>[r("Set")]),_:1},8,["onClick"]),t(n,{onClick:e.testGet},{default:a(()=>[r("Get")]),_:1},8,["onClick"])],64)}const b=C(k,[["render",G]]);V(b).mount("#app");
