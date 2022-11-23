import{d as $,k as c,r as P,m as y,i as ue,I as j,p as re,N as we,u as Ie,M as Se,l as M,s as V,F as Ne,L as ie}from"./runtime-dom.esm-bundler.bf4f36cb.js";import{o as d,bL as Re,p as u,bM as Ae,q as C,O as f,bN as Pe,G as me,$ as ae,v as ve,w as Y,af as He,x as he,bO as $e,F as Te,bP as Oe,bQ as ke,bR as Me,z as Ee,aT as Fe,A as X,bk as B,s as Ke,H as W,a8 as Be,bS as Z,aa as G,a0 as q,M as Le,bT as je,R as le,X as Ve,V as O,bU as De,bV as _e}from"./index.0e7eb3bd.js";import{N as qe}from"./Dropdown.c5536ab3.js";const Ue=$({name:"ChevronDownFilled",render(){return c("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},c("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),ce=$({name:"SlotMachineNumber",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){const r=P(null),t=P(e.value),l=P(e.value),a=P("up"),i=P(!1),s=y(()=>i.value?`${e.clsPrefix}-base-slot-machine-current-number--${a.value}-scroll`:null),m=y(()=>i.value?`${e.clsPrefix}-base-slot-machine-old-number--${a.value}-scroll`:null);ue(j(e,"value"),(p,b)=>{t.value=b,l.value=p,re(v)});function v(){const p=e.newOriginalNumber,b=e.oldOriginalNumber;b===void 0||p===void 0||(p>b?w("up"):b>p&&w("down"))}function w(p){a.value=p,i.value=!1,re(()=>{var b;(b=r.value)===null||b===void 0||b.offsetWidth,i.value=!0})}return()=>{const{clsPrefix:p}=e;return c("span",{ref:r,class:`${p}-base-slot-machine-number`},t.value!==null?c("span",{class:[`${p}-base-slot-machine-old-number ${p}-base-slot-machine-old-number--top`,m.value]},t.value):null,c("span",{class:[`${p}-base-slot-machine-current-number`,s.value]},c("span",{ref:"numberWrapper",class:[`${p}-base-slot-machine-current-number__inner`,typeof e.value!="number"&&`${p}-base-slot-machine-current-number__inner--not-number`]},l.value)),t.value!==null?c("span",{class:[`${p}-base-slot-machine-old-number ${p}-base-slot-machine-old-number--bottom`,m.value]},t.value):null)}}}),{cubicBezierEaseOut:K}=Re;function Ye({duration:e=".2s"}={}){return[d("&.fade-up-width-expand-transition-leave-active",{transition:`
 opacity ${e} ${K},
 max-width ${e} ${K},
 transform ${e} ${K}
 `}),d("&.fade-up-width-expand-transition-enter-active",{transition:`
 opacity ${e} ${K},
 max-width ${e} ${K},
 transform ${e} ${K}
 `}),d("&.fade-up-width-expand-transition-enter-to",{opacity:1,transform:"translateX(0) translateY(0)"}),d("&.fade-up-width-expand-transition-enter-from",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"}),d("&.fade-up-width-expand-transition-leave-from",{opacity:1,transform:"translateY(0)"}),d("&.fade-up-width-expand-transition-leave-to",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"})]}const Ge=d([d("@keyframes n-base-slot-machine-fade-up-in",`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),d("@keyframes n-base-slot-machine-fade-down-in",`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),d("@keyframes n-base-slot-machine-fade-up-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),d("@keyframes n-base-slot-machine-fade-down-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),u("base-slot-machine",`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[u("base-slot-machine-number",`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[Ye({duration:".2s"}),Ae({duration:".2s",delay:"0s"}),u("base-slot-machine-old-number",`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[C("top",{transform:"translateY(-100%)"}),C("bottom",{transform:"translateY(100%)"}),C("down-scroll",{animation:"n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),C("up-scroll",{animation:"n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1})]),u("base-slot-machine-current-number",`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[C("down-scroll",{animation:"n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),C("up-scroll",{animation:"n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),f("inner",`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[C("not-number",`
 right: unset;
 left: 0;
 `)])])])])]),We=$({name:"BaseSlotMachine",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){Pe("-base-slot-machine",Ge,j(e,"clsPrefix"));const r=P(),t=P(),l=y(()=>{if(typeof e.value=="string")return[];if(e.value<1)return[0];const a=[];let i=e.value;for(e.max!==void 0&&(i=Math.min(e.max,i));i>=1;)a.push(i%10),i/=10,i=Math.floor(i);return a.reverse(),a});return ue(j(e,"value"),(a,i)=>{typeof a=="string"?(t.value=void 0,r.value=void 0):typeof i=="string"?(t.value=a,r.value=void 0):(t.value=a,r.value=i)}),()=>{const{value:a,clsPrefix:i}=e;return typeof a=="number"?c("span",{class:`${i}-base-slot-machine`},c(we,{name:"fade-up-width-expand-transition",tag:"span"},{default:()=>l.value.map((s,m)=>c(ce,{clsPrefix:i,key:l.value.length-m-1,oldOriginalNumber:r.value,newOriginalNumber:t.value,value:s}))}),c(me,{key:"+",width:!0},{default:()=>e.max!==void 0&&e.max<a?c(ce,{clsPrefix:i,value:"+"}):null})):c("span",{class:`${i}-base-slot-machine`},a)}}}),Xe=d([d("@keyframes badge-wave-spread",{from:{boxShadow:"0 0 0.5px 0px var(--n-ripple-color)",opacity:.6},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)",opacity:0}}),u("badge",`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 color: var(--n-color);
 font-family: var(--n-font-family);
 `,[C("as-is",[u("badge-sup",{position:"static",transform:"translateX(0)"},[ae({transformOrigin:"left bottom",originalTransform:"translateX(0)"})])]),C("dot",[u("badge-sup",`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[d("::before","border-radius: 4px;")])]),u("badge-sup",`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 1;
 display: flex;
 align-items: center;
 `,[ae({transformOrigin:"left bottom",originalTransform:"translateX(-50%)"}),u("base-wave",{zIndex:1,animationDuration:"2s",animationIterationCount:"infinite",animationDelay:"1s",animationTimingFunction:"var(--n-ripple-bezier)",animationName:"badge-wave-spread"}),d("&::before",`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ze=Object.assign(Object.assign({},Y.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:"default"},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String}),mo=$({name:"Badge",props:Ze,setup(e,{slots:r}){const{mergedClsPrefixRef:t,inlineThemeDisabled:l,mergedRtlRef:a}=ve(e),i=Y("Badge","-badge",Xe,ke,e,t),s=P(!1),m=()=>{s.value=!0},v=()=>{s.value=!1},w=y(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&e.value<=0)||!Me(r.value)));Ie(()=>{w.value&&(s.value=!0)});const p=He("Badge",a,t),b=y(()=>{const{type:I,color:N}=e,{common:{cubicBezierEaseInOut:R,cubicBezierEaseOut:A},self:{[Ee("color",I)]:H,fontFamily:L,fontSize:T}}=i.value;return{"--n-font-size":T,"--n-font-family":L,"--n-color":N||H,"--n-ripple-color":N||H,"--n-bezier":R,"--n-ripple-bezier":A}}),h=l?he("badge",y(()=>{let I="";const{type:N,color:R}=e;return N&&(I+=N[0]),R&&(I+=Fe(R)),I}),b,e):void 0;return{rtlEnabled:p,mergedClsPrefix:t,appeared:s,showBadge:w,handleAfterEnter:m,handleAfterLeave:v,cssVars:l?void 0:b,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){var e;const{mergedClsPrefix:r,onRender:t,themeClass:l,$slots:a}=this;t==null||t();const i=(e=a.default)===null||e===void 0?void 0:e.call(a);return c("div",{class:[`${r}-badge`,this.rtlEnabled&&`${r}-badge--rtl`,l,{[`${r}-badge--dot`]:this.dot,[`${r}-badge--as-is`]:!i}],style:this.cssVars},i,c(Se,{name:"fade-in-scale-up-transition",onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?c("sup",{class:`${r}-badge-sup`,title:$e(this.value)},Te(a.value,()=>[this.dot?null:c(We,{clsPrefix:r,appeared:this.appeared,max:this.max,value:this.value})]),this.processing?c(Oe,{clsPrefix:r}):null):null}))}}),D=X("n-menu"),Q=X("n-submenu"),J=X("n-menu-item-group"),U=8;function ee(e){const r=M(D),{props:t,mergedCollapsedRef:l}=r,a=M(Q,null),i=M(J,null),s=y(()=>t.mode==="horizontal"),m=y(()=>s.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),v=y(()=>{var h;return Math.max((h=t.collapsedIconSize)!==null&&h!==void 0?h:t.iconSize,t.iconSize)}),w=y(()=>{var h;return!s.value&&e.root&&l.value&&(h=t.collapsedIconSize)!==null&&h!==void 0?h:t.iconSize}),p=y(()=>{if(s.value)return;const{collapsedWidth:h,indent:I,rootIndent:N}=t,{root:R,isGroup:A}=e,H=N===void 0?I:N;if(R)return l.value?h/2-v.value/2:H;if(i)return I/2+i.paddingLeftRef.value;if(a)return(A?I/2:I)+a.paddingLeftRef.value}),b=y(()=>{const{collapsedWidth:h,indent:I,rootIndent:N}=t,{value:R}=v,{root:A}=e;return s.value||!A||!l.value?U:(N===void 0?I:N)+R+U-(h+R)/2});return{dropdownPlacement:m,activeIconSize:w,maxIconSize:v,paddingLeft:p,iconMarginRight:b,NMenu:r,NSubmenu:a}}const oe={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},fe=Object.assign(Object.assign({},oe),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),Qe=$({name:"MenuOptionGroup",props:fe,setup(e){V(Q,null);const r=ee(e);V(J,{paddingLeftRef:r.paddingLeft});const{mergedClsPrefixRef:t,props:l}=M(D);return function(){const{value:a}=t,i=r.paddingLeft.value,{nodeProps:s}=l,m=s==null?void 0:s(e.tmNode.rawNode);return c("div",{class:`${a}-menu-item-group`,role:"group"},c("div",Object.assign({},m,{class:[`${a}-menu-item-group-title`,m==null?void 0:m.class],style:[(m==null?void 0:m.style)||"",i!==void 0?`padding-left: ${i}px;`:""]}),B(e.title),e.extra?c(Ne,null," ",B(e.extra)):null),c("div",null,e.tmNodes.map(v=>te(v,l))))}}}),pe=$({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0}},setup(e){const{props:r}=M(D);return{menuProps:r,style:y(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:y(()=>{const{maxIconSize:t,activeIconSize:l,iconMarginRight:a}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${l}px`,marginRight:`${a}px`}})}},render(){const{clsPrefix:e,tmNode:r,menuProps:{renderIcon:t,renderLabel:l,renderExtra:a,expandIcon:i}}=this,s=t?t(r.rawNode):B(this.icon);return c("div",{onClick:m=>{var v;(v=this.onClick)===null||v===void 0||v.call(this,m)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},s&&c("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[s]),c("div",{class:`${e}-menu-item-content-header`,role:"none"},l?l(r.rawNode):B(this.title),this.extra||a?c("span",{class:`${e}-menu-item-content-header__extra`}," ",a?a(r.rawNode):B(this.extra)):null),this.showArrow?c(Ke,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(r.rawNode):c(Ue,null)}):null)}}),be=Object.assign(Object.assign({},oe),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:{type:Boolean,default:!1},icon:Function,onClick:Function}),Je=$({name:"Submenu",props:be,setup(e){const r=ee(e),{NMenu:t,NSubmenu:l}=r,{props:a,mergedCollapsedRef:i,mergedThemeRef:s}=t,m=y(()=>{const{disabled:h}=e;return l!=null&&l.mergedDisabledRef.value||a.disabled?!0:h}),v=P(!1);V(Q,{paddingLeftRef:r.paddingLeft,mergedDisabledRef:m}),V(J,null);function w(){const{onClick:h}=e;h&&h()}function p(){m.value||(i.value||t.toggleExpand(e.internalKey),w())}function b(h){v.value=h}return{menuProps:a,mergedTheme:s,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,iconMarginRight:r.iconMarginRight,dropdownPlacement:r.dropdownPlacement,dropdownShow:v,paddingLeft:r.paddingLeft,mergedDisabled:m,mergedValue:t.mergedValueRef,childActive:W(()=>t.activePathRef.value.includes(e.internalKey)),collapsed:y(()=>a.mode==="horizontal"?!1:i.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:y(()=>!m.value&&(a.mode==="horizontal"||i.value)),handlePopoverShowChange:b,handleClick:p}},render(){var e;const{mergedClsPrefix:r,menuProps:{renderIcon:t,renderLabel:l}}=this,a=()=>{const{isHorizontal:s,paddingLeft:m,collapsed:v,mergedDisabled:w,maxIconSize:p,activeIconSize:b,title:h,childActive:I,icon:N,handleClick:R,menuProps:{nodeProps:A},dropdownShow:H,iconMarginRight:L,tmNode:T,mergedClsPrefix:_}=this,E=A==null?void 0:A(T.rawNode);return c("div",Object.assign({},E,{class:[`${_}-menu-item`,E==null?void 0:E.class],role:"menuitem"}),c(pe,{tmNode:T,paddingLeft:m,collapsed:v,disabled:w,iconMarginRight:L,maxIconSize:p,activeIconSize:b,title:h,extra:this.extra,showArrow:!s,childActive:I,clsPrefix:_,icon:N,hover:H,onClick:R}))},i=()=>c(me,null,{default:()=>{const{tmNodes:s,collapsed:m}=this;return m?null:c("div",{class:`${r}-submenu-children`,role:"menu"},s.map(v=>te(v,this.menuProps)))}});return this.root?c(qe,Object.assign({size:"large"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,trigger:"hover",disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:l}),{default:()=>c("div",{class:`${r}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},a(),this.isHorizontal?null:i())}):c("div",{class:`${r}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},a(),i())}}),ge=Object.assign(Object.assign({},oe),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),eo=$({name:"MenuOption",props:ge,setup(e){const r=ee(e),{NSubmenu:t,NMenu:l}=r,{props:a,mergedClsPrefixRef:i,mergedCollapsedRef:s}=l,m=t?t.mergedDisabledRef:{value:!1},v=y(()=>m.value||e.disabled);function w(b){const{onClick:h}=e;h&&h(b)}function p(b){v.value||(l.doSelect(e.internalKey,e.tmNode.rawNode),w(b))}return{mergedClsPrefix:i,dropdownPlacement:r.dropdownPlacement,paddingLeft:r.paddingLeft,iconMarginRight:r.iconMarginRight,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,mergedTheme:l.mergedThemeRef,menuProps:a,dropdownEnabled:W(()=>e.root&&s.value&&a.mode!=="horizontal"&&!v.value),selected:W(()=>l.mergedValueRef.value===e.internalKey),mergedDisabled:v,handleClick:p}},render(){const{mergedClsPrefix:e,mergedTheme:r,tmNode:t,menuProps:{renderLabel:l,nodeProps:a}}=this,i=a==null?void 0:a(t.rawNode);return c("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i==null?void 0:i.class]}),c(Be,{theme:r.peers.Tooltip,themeOverrides:r.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>l?l(t.rawNode):B(this.title),trigger:()=>c(pe,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),oo=$({name:"MenuDivider",setup(){const e=M(D),{mergedClsPrefixRef:r,isHorizontalRef:t}=e;return()=>t.value?null:c("div",{class:`${r.value}-menu-divider`})}}),to=Z(fe),no=Z(ge),ro=Z(be);function xe(e){return e.type==="divider"||e.type==="render"}function io(e){return e.type==="divider"}function te(e,r){const{rawNode:t}=e,{show:l}=t;if(l===!1)return null;if(xe(t))return io(t)?c(oo,Object.assign({key:e.key},t.props)):null;const{labelField:a}=r,{key:i,level:s,isGroup:m}=e,v=Object.assign(Object.assign({},t),{title:t.title||t[a],extra:t.titleExtra||t.extra,key:i,internalKey:i,level:s,root:s===0,isGroup:m});return e.children?e.isGroup?c(Qe,G(v,to,{tmNode:e,tmNodes:e.children,key:i})):c(Je,G(v,ro,{key:i,rawNodes:t[r.childrenField],tmNodes:e.children,tmNode:e})):c(eo,G(v,no,{key:i,tmNode:e}))}const de=[d("&::before","background-color: var(--n-item-color-hover);"),f("arrow",`
 color: var(--n-arrow-color-hover);
 `),f("icon",`
 color: var(--n-item-icon-color-hover);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[d("a",`
 color: var(--n-item-text-color-hover);
 `),f("extra",`
 color: var(--n-item-text-color-hover);
 `)])],se=[f("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[d("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),f("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],ao=d([u("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[C("horizontal",`
 display: inline-flex;
 padding-bottom: 0;
 `,[u("submenu","margin: 0;"),u("menu-item","margin: 0;"),u("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[d("&::before","display: none;"),C("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),u("menu-item-content",[C("selected",[f("icon","color: var(--n-item-icon-color-active-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[d("a","color: var(--n-item-text-color-active-horizontal);"),f("extra","color: var(--n-item-text-color-active-horizontal);")])]),C("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[d("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),f("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),f("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),q("disabled",[q("selected, child-active",[d("&:focus-within",se)]),C("selected",[k(null,[f("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[d("a","color: var(--n-item-text-color-active-hover-horizontal);"),f("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),C("child-active",[k(null,[f("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[d("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),f("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),k("border-bottom: 2px solid var(--n-border-color-horizontal);",se)]),u("menu-item-content-header",[d("a","color: var(--n-item-text-color-horizontal);")])])]),C("collapsed",[u("menu-item-content",[C("selected",[d("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),u("menu-item-content-header","opacity: 0;"),f("arrow","opacity: 0;"),f("icon","color: var(--n-item-icon-color-collapsed);")])]),u("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),u("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[d("> *","z-index: 1;"),d("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),C("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),C("collapsed",[f("arrow","transform: rotate(0);")]),C("selected",[d("&::before","background-color: var(--n-item-color-active);"),f("arrow","color: var(--n-arrow-color-active);"),f("icon","color: var(--n-item-icon-color-active);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[d("a","color: var(--n-item-text-color-active);"),f("extra","color: var(--n-item-text-color-active);")])]),C("child-active",[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[d("a",`
 color: var(--n-item-text-color-child-active);
 `),f("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),f("arrow",`
 color: var(--n-arrow-color-child-active);
 `),f("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),q("disabled",[q("selected, child-active",[d("&:focus-within",de)]),C("selected",[k(null,[f("arrow","color: var(--n-arrow-color-active-hover);"),f("icon","color: var(--n-item-icon-color-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[d("a","color: var(--n-item-text-color-active-hover);"),f("extra","color: var(--n-item-text-color-active-hover);")])])]),C("child-active",[k(null,[f("arrow","color: var(--n-arrow-color-child-active-hover);"),f("icon","color: var(--n-item-icon-color-child-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[d("a","color: var(--n-item-text-color-child-active-hover);"),f("extra","color: var(--n-item-text-color-child-active-hover);")])])]),C("selected",[k(null,[d("&::before","background-color: var(--n-item-color-active-hover);")])]),k(null,de)]),f("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),f("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),u("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 color: var(--n-item-text-color);
 `,[d("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[d("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),f("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),u("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[u("menu-item-content",`
 height: var(--n-item-height);
 `),u("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[Le({duration:".2s"})])]),u("menu-item-group",[u("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),u("menu-tooltip",[d("a",`
 color: inherit;
 text-decoration: none;
 `)]),u("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function k(e,r){return[C("hover",e,r),d("&:hover",e,r)]}const lo=Object.assign(Object.assign({},Y.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,defalut:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array,dropdownPlacement:{type:String,default:"bottom"}}),vo=$({name:"Menu",props:lo,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:t}=ve(e),l=Y("Menu","-menu",ao,De,e,r),a=M(je,null),i=y(()=>{var g;const{collapsed:z}=e;if(z!==void 0)return z;if(a){const{collapseModeRef:o,collapsedRef:x}=a;if(o.value==="width")return(g=x.value)!==null&&g!==void 0?g:!1}return!1}),s=y(()=>{const{keyField:g,childrenField:z,disabledField:o}=e;return _e(e.items||e.options,{getIgnored(x){return xe(x)},getChildren(x){return x[z]},getDisabled(x){return x[o]},getKey(x){var S;return(S=x[g])!==null&&S!==void 0?S:x.name}})}),m=y(()=>new Set(s.value.treeNodes.map(g=>g.key))),{watchProps:v}=e,w=P(null);v!=null&&v.includes("defaultValue")?ie(()=>{w.value=e.defaultValue}):w.value=e.defaultValue;const p=j(e,"value"),b=le(p,w),h=P([]),I=()=>{h.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(b.value,{includeSelf:!1}).keyPath};v!=null&&v.includes("defaultExpandedKeys")?ie(I):I();const N=Ve(e,["expandedNames","expandedKeys"]),R=le(N,h),A=y(()=>s.value.treeNodes),H=y(()=>s.value.getPath(b.value).keyPath);V(D,{props:e,mergedCollapsedRef:i,mergedThemeRef:l,mergedValueRef:b,mergedExpandedKeysRef:R,activePathRef:H,mergedClsPrefixRef:r,isHorizontalRef:y(()=>e.mode==="horizontal"),invertedRef:j(e,"inverted"),doSelect:L,toggleExpand:_});function L(g,z){const{"onUpdate:value":o,onUpdateValue:x,onSelect:S}=e;x&&O(x,g,z),o&&O(o,g,z),S&&O(S,g,z),w.value=g}function T(g){const{"onUpdate:expandedKeys":z,onUpdateExpandedKeys:o,onExpandedNamesChange:x,onOpenNamesChange:S}=e;z&&O(z,g),o&&O(o,g),x&&O(x,g),S&&O(S,g),h.value=g}function _(g){const z=Array.from(R.value),o=z.findIndex(x=>x===g);if(~o)z.splice(o,1);else{if(e.accordion&&m.value.has(g)){const x=z.findIndex(S=>m.value.has(S));x>-1&&z.splice(x,1)}z.push(g)}T(z)}const E=g=>{const z=s.value.getPath(g!=null?g:b.value,{includeSelf:!1}).keyPath;if(!z.length)return;const o=Array.from(R.value),x=new Set([...o,...z]);e.accordion&&m.value.forEach(S=>{x.has(S)&&!z.includes(S)&&x.delete(S)}),T(Array.from(x))},ne=y(()=>{const{inverted:g}=e,{common:{cubicBezierEaseInOut:z},self:o}=l.value,{borderRadius:x,borderColorHorizontal:S,fontSize:ye,itemHeight:Ce,dividerColor:ze}=o,n={"--n-divider-color":ze,"--n-bezier":z,"--n-font-size":ye,"--n-border-color-horizontal":S,"--n-border-radius":x,"--n-item-height":Ce};return g?(n["--n-group-text-color"]=o.groupTextColorInverted,n["--n-color"]=o.colorInverted,n["--n-item-text-color"]=o.itemTextColorInverted,n["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,n["--n-item-text-color-active"]=o.itemTextColorActiveInverted,n["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,n["--n-item-icon-color"]=o.itemIconColorInverted,n["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,n["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,n["--n-arrow-color"]=o.arrowColorInverted,n["--n-arrow-color-hover"]=o.arrowColorHoverInverted,n["--n-arrow-color-active"]=o.arrowColorActiveInverted,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,n["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,n["--n-item-color-hover"]=o.itemColorHoverInverted,n["--n-item-color-active"]=o.itemColorActiveInverted,n["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(n["--n-group-text-color"]=o.groupTextColor,n["--n-color"]=o.color,n["--n-item-text-color"]=o.itemTextColor,n["--n-item-text-color-hover"]=o.itemTextColorHover,n["--n-item-text-color-active"]=o.itemTextColorActive,n["--n-item-text-color-child-active"]=o.itemTextColorChildActive,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,n["--n-item-icon-color"]=o.itemIconColor,n["--n-item-icon-color-hover"]=o.itemIconColorHover,n["--n-item-icon-color-active"]=o.itemIconColorActive,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,n["--n-arrow-color"]=o.arrowColor,n["--n-arrow-color-hover"]=o.arrowColorHover,n["--n-arrow-color-active"]=o.arrowColorActive,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,n["--n-arrow-color-child-active"]=o.arrowColorChildActive,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,n["--n-item-color-hover"]=o.itemColorHover,n["--n-item-color-active"]=o.itemColorActive,n["--n-item-color-active-hover"]=o.itemColorActiveHover,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),n}),F=t?he("menu",y(()=>e.inverted?"a":"b"),ne,e):void 0;return{mergedClsPrefix:r,controlledExpandedKeys:N,uncontrolledExpanededKeys:h,mergedExpandedKeys:R,uncontrolledValue:w,mergedValue:b,activePath:H,tmNodes:A,mergedTheme:l,mergedCollapsed:i,cssVars:t?void 0:ne,themeClass:F==null?void 0:F.themeClass,onRender:F==null?void 0:F.onRender,showOption:E}},render(){const{mergedClsPrefix:e,mode:r,themeClass:t,onRender:l}=this;return l==null||l(),c("div",{role:r==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${r}`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars},this.tmNodes.map(a=>te(a,this.$props)))}});export{vo as N,mo as a,Ze as b,lo as m};
