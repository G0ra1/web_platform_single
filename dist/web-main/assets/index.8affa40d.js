import{_,aM as f}from"./index.0e7eb3bd.js";import{a as n,o as s,g as r,h as t,F as w,b as a,K as C,w as i,f as M,e as l,c as N,n as c}from"./runtime-dom.esm-bundler.bf4f36cb.js";const k={class:"wrapper",style:{height:"400px"}},b={class:"content"},$={class:"content-table"},g={class:"content-bottom"},h={class:"menus"};function y(e,o,B,V,E,F){const m=n("vxe-grid"),p=n("nw-icon"),u=n("n-button"),v=n("NwCodeMirror");return s(),r("div",k,[t("div",b,[e.Mode==="list"?(s(),r(w,{key:0},[t("div",$,[a(m,C(e.Bind,{ref:"GridRef"}),null,16)]),t("div",g,[a(u,{style:{width:"100%"},onClick:o[0]||(o[0]=d=>e.add())},{icon:i(()=>[a(p,{name:"icon-n-y-add"})]),default:i(()=>[M(" \u6DFB\u52A0\u53C2\u6570 ")]),_:1})])],64)):l("",!0),e.Mode==="editor"?(s(),N(v,{key:1,disabled:!1,value:e.Json,"onUpdate:value":e.updateValue},null,8,["value","onUpdate:value"])):l("",!0)]),t("div",h,[t("div",{class:c({menu:!0,active:e.Mode==="list"}),onClick:o[1]||(o[1]=d=>e.Mode="list")}," \u53C2\u6570\u5217\u8868 ",2),t("div",{class:c({menu:!0,active:e.Mode==="editor"}),onClick:o[2]||(o[2]=d=>{e.Mode="editor",e.transform()})}," JSON ",2)])])}const U=_(f,[["render",y],["__scopeId","data-v-a9ff9b8f"]]);export{U as N};
