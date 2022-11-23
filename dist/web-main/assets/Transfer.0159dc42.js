import{A as Re,a2 as ze,f as j,H as Te,bl as ke,bO as ye,a$ as Fe,cP as Oe,cM as Pe,bd as q,e as we,s as Ae,R as Ve,p as v,q as w,O as b,o as K,a0 as Le,v as $e,w as G,Q as Be,a4 as Ie,eq as _e,z as F,cN as Ne,V as M}from"./index.0e7eb3bd.js";import{d as O,k as r,l as B,r as A,I as D,m as f,s as Ue}from"./runtime-dom.esm-bundler.bf4f36cb.js";const Ee=O({name:"Search",render(){return r("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:"enable-background: new 0 0 512 512"},r("path",{d:`M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
  c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
   M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
  c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z`}))}}),V=Re("n-transfer"),Q=O({name:"TransferHeader",props:{size:{type:String,required:!0},source:Boolean,onCheckedAll:Function,onClearAll:Function,title:String},setup(e){const{targetOptionsRef:n,canNotSelectAnythingRef:a,canBeClearedRef:i,allCheckedRef:d,mergedThemeRef:o,disabledRef:c,mergedClsPrefixRef:l,srcOptionsLengthRef:h}=B(V),{localeRef:g}=ze("Transfer");return()=>{const{source:m,onClearAll:p,onCheckedAll:P}=e,{value:R}=o,{value:S}=l,{value:x}=g,z=e.size==="large"?"small":"tiny",{title:T}=e;return r("div",{class:`${S}-transfer-list-header`},T&&r("div",{class:`${S}-transfer-list-header__title`},T),m&&r(j,{class:`${S}-transfer-list-header__button`,theme:R.peers.Button,themeOverrides:R.peerOverrides.Button,size:z,tertiary:!0,onClick:d.value?p:P,disabled:a.value||c.value},{default:()=>d.value?x.unselectAll:x.selectAll}),!m&&i.value&&r(j,{class:`${S}-transfer-list-header__button`,theme:R.peers.Button,themeOverrides:R.peerOverrides.Button,size:z,tertiary:!0,onClick:p,disabled:c.value},{default:()=>x.clearAll}),r("div",{class:`${S}-transfer-list-header__extra`},m?x.total(h.value):x.selected(n.value.length)))}}}),W=O({name:"NTransferListItem",props:{source:Boolean,label:{type:String,required:!0},value:{type:[String,Number],required:!0},disabled:Boolean,option:{type:Object,required:!0}},setup(e){const{targetValueSetRef:n,mergedClsPrefixRef:a,mergedThemeRef:i,handleItemCheck:d,renderSourceLabelRef:o,renderTargetLabelRef:c}=B(V),l=Te(()=>n.value.has(e.value));function h(){e.disabled||d(!l.value,e.value)}return{mergedClsPrefix:a,mergedTheme:i,checked:l,handleClick:h,renderSourceLabel:o,renderTargetLabel:c}},render(){const{disabled:e,mergedTheme:n,mergedClsPrefix:a,label:i,checked:d,source:o,renderSourceLabel:c,renderTargetLabel:l}=this;return r("div",{class:[`${a}-transfer-list-item`,e&&`${a}-transfer-list-item--disabled`,o?`${a}-transfer-list-item--source`:`${a}-transfer-list-item--target`],onClick:o?this.handleClick:void 0},r("div",{class:`${a}-transfer-list-item__background`}),o&&r("div",{class:`${a}-transfer-list-item__checkbox`},r(Fe,{theme:n.peers.Checkbox,themeOverrides:n.peerOverrides.Checkbox,disabled:e,checked:d})),r("div",{class:`${a}-transfer-list-item__label`,title:ye(i)},o?c?c({option:this.option}):i:l?l({option:this.option}):i),!o&&!e&&r(ke,{focusable:!1,class:`${a}-transfer-list-item__close`,clsPrefix:a,onClick:this.handleClick}))}}),X=O({name:"TransferList",props:{virtualScroll:{type:Boolean,required:!0},itemSize:{type:Number,required:!0},options:{type:Array,required:!0},disabled:{type:Boolean,required:!0},source:Boolean},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:n}=B(V),a=A(null),i=A(null);function d(){var l;(l=a.value)===null||l===void 0||l.sync()}function o(){const{value:l}=i;if(!l)return null;const{listElRef:h}=l;return h}function c(){const{value:l}=i;if(!l)return null;const{itemsElRef:h}=l;return h}return{mergedTheme:e,mergedClsPrefix:n,scrollerInstRef:a,vlInstRef:i,syncVLScroller:d,scrollContainer:o,scrollContent:c}},render(){const{mergedTheme:e,options:n}=this;if(n.length===0)return r(Oe,{theme:e.peers.Empty,themeOverrides:e.peerOverrides.Empty});const{mergedClsPrefix:a,virtualScroll:i,source:d,disabled:o,syncVLScroller:c}=this;return r(q,{ref:"scrollerInstRef",theme:e.peers.Scrollbar,themeOverrides:e.peerOverrides.Scrollbar,container:i?this.scrollContainer:void 0,content:i?this.scrollContent:void 0},{default:()=>i?r(Pe,{ref:"vlInstRef",style:{height:"100%"},class:`${a}-transfer-list-content`,items:this.options,itemSize:this.itemSize,showScrollbar:!1,onResize:c,onScroll:c,keyField:"value"},{default:({item:l})=>{const{source:h,disabled:g}=this;return r(W,{source:h,key:l.value,value:l.value,disabled:l.disabled||g,label:l.label,option:l})}}):r("div",{class:`${a}-transfer-list-content`},n.map(l=>r(W,{source:d,key:l.value,value:l.value,disabled:l.disabled||o,label:l.label,option:l})))})}}),Y=O({name:"TransferFilter",props:{value:String,placeholder:String,disabled:Boolean,onUpdateValue:{type:Function,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:n}=B(V);return{mergedClsPrefix:n,mergedTheme:e}},render(){const{mergedTheme:e,mergedClsPrefix:n}=this;return r("div",{class:`${n}-transfer-filter`},r(we,{value:this.value,onUpdateValue:this.onUpdateValue,disabled:this.disabled,placeholder:this.placeholder,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,clearable:!0,size:"small"},{"clear-icon-placeholder":()=>r(Ae,{clsPrefix:n},{default:()=>r(Ee,null)})}))}});function Me(e){const n=A(e.defaultValue),a=Ve(D(e,"value"),n),i=f(()=>{const t=new Map;return(e.options||[]).forEach(s=>t.set(s.value,s)),t}),d=f(()=>new Set(a.value||[])),o=f(()=>{const t=i.value,s=[];return(a.value||[]).forEach(N=>{const L=t.get(N);L&&s.push(L)}),s}),c=A(""),l=A(""),h=f(()=>e.sourceFilterable||!!e.filterable),g=f(()=>{if(!h.value)return e.options;const{filter:t}=e;return e.options.filter(s=>t(c.value,s,"source"))}),m=f(()=>{if(!e.targetFilterable)return o.value;const{filter:t}=e;return o.value.filter(s=>t(l.value,s,"target"))}),p=f(()=>{const{value:t}=a;return t===null?new Set:new Set(t)}),P=f(()=>{const t=new Set(p.value);return g.value.forEach(s=>{!s.disabled&&!t.has(s.value)&&t.add(s.value)}),t}),R=f(()=>{const t=new Set(p.value);return g.value.forEach(s=>{!s.disabled&&t.has(s.value)&&t.delete(s.value)}),t}),S=f(()=>{const t=new Set(p.value);return m.value.forEach(s=>{s.disabled||t.delete(s.value)}),t}),x=f(()=>g.value.every(t=>t.disabled)),z=f(()=>{if(!g.value.length)return!1;const t=p.value;return g.value.every(s=>s.disabled||t.has(s.value))}),T=f(()=>m.value.some(t=>!t.disabled));function I(t){c.value=t!=null?t:""}function _(t){l.value=t!=null?t:""}return{uncontrolledValueRef:n,mergedValueRef:a,targetValueSetRef:d,valueSetForCheckAllRef:P,valueSetForUncheckAllRef:R,valueSetForClearRef:S,filteredTgtOptionsRef:m,filteredSrcOptionsRef:g,targetOptionsRef:o,canNotSelectAnythingRef:x,canBeClearedRef:T,allCheckedRef:z,srcPatternRef:c,tgtPatternRef:l,mergedSrcFilterableRef:h,handleSrcFilterUpdateValue:I,handleTgtFilterUpdateValue:_}}const qe=v("transfer",`
 width: 100%;
 font-size: var(--n-font-size);
 height: 300px;
 display: flex;
 flex-wrap: nowrap;
 word-break: break-word;
`,[w("disabled",[v("transfer-list",[v("transfer-list-header",[b("title",`
 color: var(--n-header-text-color-disabled);
 `),b("extra",`
 color: var(--n-header-extra-text-color-disabled);
 `)])])]),v("transfer-list",`
 flex: 1;
 min-width: 0;
 height: inherit;
 display: flex;
 flex-direction: column;
 background-clip: padding-box;
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-list-color);
 `,[w("source",`
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[b("border","border-right: 1px solid var(--n-divider-color);")]),w("target",`
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[b("border","border-left: none;")]),b("border",`
 padding: 0 12px;
 border: 1px solid var(--n-border-color);
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),v("transfer-list-header",`
 min-height: var(--n-header-height);
 box-sizing: border-box;
 display: flex;
 padding: 12px 12px 10px 12px;
 align-items: center;
 background-clip: padding-box;
 border-radius: inherit;
 border-bottom-left-radius: 0;
 border-bottom-right-radius: 0;
 line-height: 1.5;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[K("> *:not(:first-child)",`
 margin-left: 8px;
 `),b("title",`
 flex: 1;
 min-width: 0;
 line-height: 1.5;
 font-size: var(--n-header-font-size);
 font-weight: var(--n-header-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-header-text-color);
 `),b("button",`
 position: relative;
 `),b("extra",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-extra-font-size);
 margin-right: 0;
 white-space: nowrap;
 color: var(--n-header-extra-text-color);
 `)]),v("transfer-list-body",`
 flex-basis: 0;
 flex-grow: 1;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 border-radius: inherit;
 border-top-left-radius: 0;
 border-top-right-radius: 0;
 `,[v("transfer-filter",`
 padding: 4px 12px 8px 12px;
 box-sizing: border-box;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),v("transfer-list-flex-container",`
 flex: 1;
 position: relative;
 `,[v("scrollbar",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 height: unset;
 `),v("empty",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 `),v("transfer-list-content",`
 padding: 0;
 margin: 0;
 position: relative;
 `,[v("transfer-list-item",`
 padding: 0 12px;
 min-height: var(--n-item-height);
 display: flex;
 align-items: center;
 color: var(--n-item-text-color);
 position: relative;
 transition: color .3s var(--n-bezier);
 `,[b("background",`
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),b("checkbox",`
 position: relative;
 margin-right: 8px;
 `),b("close",`
 opacity: 0;
 pointer-events: none;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),b("label",`
 position: relative;
 min-width: 0;
 flex-grow: 1;
 `),w("source","cursor: pointer;"),w("disabled",`
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `),Le("disabled",[K("&:hover",[b("background","background-color: var(--n-item-color-pending);"),b("close",`
 opacity: 1;
 pointer-events: all;
 `)])])])])])])])]),De=Object.assign(Object.assign({},G.props),{value:Array,defaultValue:{type:Array,default:null},options:{type:Array,default:()=>[]},disabled:{type:Boolean,default:void 0},virtualScroll:Boolean,sourceTitle:String,targetTitle:String,filterable:{type:Boolean,default:void 0},sourceFilterable:Boolean,targetFilterable:Boolean,sourceFilterPlaceholder:String,targetFilterPlaceholder:String,filter:{type:Function,default:(e,n)=>e?~(""+n.label).toLowerCase().indexOf((""+e).toLowerCase()):!0},size:String,renderSourceLabel:Function,renderTargetLabel:Function,renderSourceList:Function,renderTargetList:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]}),Ke=O({name:"Transfer",props:De,setup(e){const{mergedClsPrefixRef:n}=$e(e),a=G("Transfer","-transfer",qe,_e,e,n),i=Be(e),{mergedSizeRef:d,mergedDisabledRef:o}=i,c=f(()=>{const{value:u}=d,{self:{[F("itemHeight",u)]:C}}=a.value;return Ne(C)}),{uncontrolledValueRef:l,mergedValueRef:h,targetValueSetRef:g,valueSetForCheckAllRef:m,valueSetForUncheckAllRef:p,valueSetForClearRef:P,filteredTgtOptionsRef:R,filteredSrcOptionsRef:S,targetOptionsRef:x,canNotSelectAnythingRef:z,canBeClearedRef:T,allCheckedRef:I,srcPatternRef:_,tgtPatternRef:t,mergedSrcFilterableRef:s,handleSrcFilterUpdateValue:N,handleTgtFilterUpdateValue:L}=Me(e);function k(u){const{onUpdateValue:C,"onUpdate:value":y,onChange:$}=e,{nTriggerFormInput:U,nTriggerFormChange:E}=i;C&&M(C,u),y&&M(y,u),$&&M($,u),l.value=u,U(),E()}function J(){k([...m.value])}function Z(){k([...p.value])}function ee(){k([...P.value])}function H(u,C){k(u?(h.value||[]).concat(C):(h.value||[]).filter(y=>y!==C))}function re(u){k(u)}return Ue(V,{targetValueSetRef:g,mergedClsPrefixRef:n,disabledRef:o,mergedThemeRef:a,targetOptionsRef:x,canNotSelectAnythingRef:z,canBeClearedRef:T,allCheckedRef:I,srcOptionsLengthRef:f(()=>e.options.length),handleItemCheck:H,renderSourceLabelRef:D(e,"renderSourceLabel"),renderTargetLabelRef:D(e,"renderTargetLabel")}),{mergedClsPrefix:n,mergedDisabled:o,itemSize:c,isMounted:Ie(),mergedTheme:a,filteredSrcOpts:S,filteredTgtOpts:R,srcPattern:_,tgtPattern:t,mergedSize:d,mergedSrcFilterable:s,handleSrcFilterUpdateValue:N,handleTgtFilterUpdateValue:L,handleSourceCheckAll:J,handleSourceUncheckAll:Z,handleTargetClearAll:ee,handleItemCheck:H,handleChecked:re,cssVars:f(()=>{const{value:u}=d,{common:{cubicBezierEaseInOut:C},self:{borderRadius:y,borderColor:$,listColor:U,titleTextColor:E,titleTextColorDisabled:te,extraTextColor:le,itemTextColor:ae,itemColorPending:ne,itemTextColorDisabled:ie,titleFontWeight:se,closeColorHover:oe,closeColorPressed:de,closeIconColor:ce,closeIconColorHover:ue,closeIconColorPressed:fe,closeIconSize:he,closeSize:be,dividerColor:ge,extraTextColorDisabled:ve,[F("extraFontSize",u)]:me,[F("fontSize",u)]:pe,[F("titleFontSize",u)]:Se,[F("itemHeight",u)]:xe,[F("headerHeight",u)]:Ce}}=a.value;return{"--n-bezier":C,"--n-border-color":$,"--n-border-radius":y,"--n-extra-font-size":me,"--n-font-size":pe,"--n-header-font-size":Se,"--n-header-extra-text-color":le,"--n-header-extra-text-color-disabled":ve,"--n-header-font-weight":se,"--n-header-text-color":E,"--n-header-text-color-disabled":te,"--n-item-color-pending":ne,"--n-item-height":xe,"--n-item-text-color":ae,"--n-item-text-color-disabled":ie,"--n-list-color":U,"--n-header-height":Ce,"--n-close-size":be,"--n-close-icon-size":he,"--n-close-color-hover":oe,"--n-close-color-pressed":de,"--n-close-icon-color":ce,"--n-close-icon-color-hover":ue,"--n-close-icon-color-pressed":fe,"--n-divider-color":ge}})}},render(){const{mergedClsPrefix:e,renderSourceList:n,renderTargetList:a,mergedTheme:i,mergedSrcFilterable:d,targetFilterable:o}=this;return r("div",{class:[`${e}-transfer`,this.mergedDisabled&&`${e}-transfer--disabled`],style:this.cssVars},r("div",{class:`${e}-transfer-list ${e}-transfer-list--source`},r(Q,{source:!0,title:this.sourceTitle,onCheckedAll:this.handleSourceCheckAll,onClearAll:this.handleSourceUncheckAll,size:this.mergedSize}),r("div",{class:`${e}-transfer-list-body`},d?r(Y,{onUpdateValue:this.handleSrcFilterUpdateValue,value:this.srcPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,r("div",{class:`${e}-transfer-list-flex-container`},n?r(q,{theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar},{default:()=>n({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.srcPattern})}):r(X,{source:!0,options:this.filteredSrcOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),r("div",{class:`${e}-transfer-list__border`})),r("div",{class:`${e}-transfer-list ${e}-transfer-list--target`},r(Q,{onClearAll:this.handleTargetClearAll,size:this.mergedSize,title:this.targetTitle}),r("div",{class:`${e}-transfer-list-body`},o?r(Y,{onUpdateValue:this.handleTgtFilterUpdateValue,value:this.tgtPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,r("div",{class:`${e}-transfer-list-flex-container`},a?r(q,{theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar},{default:()=>a({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.tgtPattern})}):r(X,{options:this.filteredTgtOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),r("div",{class:`${e}-transfer-list__border`})))}});export{Ke as N,Ee as S,De as t};
