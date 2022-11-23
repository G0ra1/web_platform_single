import{d as Y,r as $,k as s,l as we,m as q,K as ot,F as st,i as Q,s as lt,I,L as dt,p as Z,H as ct,D as ft,N as bt,O as ut}from"./runtime-dom.esm-bundler.bf4f36cb.js";import{be as vt,bf as pt,bg as be,bh as ht,bi as K,bj as gt,A as mt,B as xt,s as yt,bk as wt,bl as Rt,bm as Ct,p as b,q as R,o as S,O as E,a0 as Tt,v as St,w as Re,X as ue,bn as ee,R as zt,bo as Pt,x as $t,ag as ve,bp as pe,bq as Wt,V as U,z as k}from"./index.0e7eb3bd.js";import{A as At}from"./Add.f7b12907.js";const _t=be(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[be("&::-webkit-scrollbar",{width:0,height:0})]),Lt=Y({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=$(null);function a(o){!(o.currentTarget.offsetWidth<o.currentTarget.scrollWidth)||o.deltaY===0||(o.currentTarget.scrollLeft+=o.deltaY+o.deltaX,o.preventDefault())}const r=vt();return _t.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:pt,ssr:r}),Object.assign({selfRef:e,handleWheel:a},{scrollTo(...o){var u;(u=e.value)===null||u===void 0||u.scrollTo(...o)}})},render(){return s("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Bt=/\s/;function Et(e){for(var a=e.length;a--&&Bt.test(e.charAt(a)););return a}var kt=/^\s+/;function jt(e){return e&&e.slice(0,Et(e)+1).replace(kt,"")}var he=0/0,It=/^[-+]0x[0-9a-f]+$/i,Ot=/^0b[01]+$/i,Ft=/^0o[0-7]+$/i,Nt=parseInt;function ge(e){if(typeof e=="number")return e;if(ht(e))return he;if(K(e)){var a=typeof e.valueOf=="function"?e.valueOf():e;e=K(a)?a+"":a}if(typeof e!="string")return e===0?e:+e;e=jt(e);var r=Ot.test(e);return r||Ft.test(e)?Nt(e.slice(2),r?2:8):It.test(e)?he:+e}var Dt=function(){return gt.Date.now()};const te=Dt;var Mt="Expected a function",Ht=Math.max,Vt=Math.min;function Xt(e,a,r){var d,o,u,v,c,m,x=0,w=!1,h=!1,p=!0;if(typeof e!="function")throw new TypeError(Mt);a=ge(a)||0,K(r)&&(w=!!r.leading,h="maxWait"in r,u=h?Ht(ge(r.maxWait)||0,a):u,p="trailing"in r?!!r.trailing:p);function y(g){var A=d,_=o;return d=o=void 0,x=g,v=e.apply(_,A),v}function C(g){return x=g,c=setTimeout(z,a),w?y(g):v}function T(g){var A=g-m,_=g-x,D=a-A;return h?Vt(D,u-_):D}function f(g){var A=g-m,_=g-x;return m===void 0||A>=a||A<0||h&&_>=u}function z(){var g=te();if(f(g))return P(g);c=setTimeout(z,T(g))}function P(g){return c=void 0,p&&d?y(g):(d=o=void 0,v)}function W(){c!==void 0&&clearTimeout(c),x=0,d=m=o=c=void 0}function M(){return c===void 0?v:P(te())}function N(){var g=te(),A=f(g);if(d=arguments,o=this,m=g,A){if(c===void 0)return C(m);if(h)return clearTimeout(c),c=setTimeout(z,a),y(m)}return c===void 0&&(c=setTimeout(z,a)),v}return N.cancel=W,N.flush=M,N}var Ut="Expected a function";function ae(e,a,r){var d=!0,o=!0;if(typeof e!="function")throw new TypeError(Ut);return K(r)&&(d="leading"in r?!!r.leading:d,o="trailing"in r?!!r.trailing:o),Xt(e,a,{leading:d,maxWait:a,trailing:o})}const ie=mt("n-tabs"),Ce={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Zt=Y({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:Ce,setup(e){const a=we(ie,null);return a||xt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:a.paneStyleRef,class:a.paneClassRef,mergedClsPrefix:a.mergedClsPrefixRef}},render(){return s("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),qt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Ct(Ce,["displayDirective"])),re=Y({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:qt,setup(e){const{mergedClsPrefixRef:a,valueRef:r,typeRef:d,closableRef:o,tabStyleRef:u,tabChangeIdRef:v,onBeforeLeaveRef:c,triggerRef:m,handleAdd:x,activateTab:w,handleClose:h}=we(ie);return{trigger:m,mergedClosable:q(()=>{if(e.internalAddable)return!1;const{closable:p}=e;return p===void 0?o.value:p}),style:u,clsPrefix:a,value:r,type:d,handleClose(p){p.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){x();return}const{name:p}=e,y=++v.id;if(p!==r.value){const{value:C}=c;C?Promise.resolve(C(e.name,r.value)).then(T=>{T&&v.id===y&&w(p)}):w(p)}}}},render(){const{internalAddable:e,clsPrefix:a,name:r,disabled:d,label:o,tab:u,value:v,mergedClosable:c,style:m,trigger:x,$slots:{default:w}}=this,h=o!=null?o:u;return s("div",{class:`${a}-tabs-tab-wrapper`},this.internalLeftPadded?s("div",{class:`${a}-tabs-tab-pad`}):null,s("div",Object.assign({key:r,"data-name":r,"data-disabled":d?!0:void 0},ot({class:[`${a}-tabs-tab`,v===r&&`${a}-tabs-tab--active`,d&&`${a}-tabs-tab--disabled`,c&&`${a}-tabs-tab--closable`,e&&`${a}-tabs-tab--addable`],onClick:x==="click"?this.activateTab:void 0,onMouseenter:x==="hover"?this.activateTab:void 0,style:e?void 0:m},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),s("span",{class:`${a}-tabs-tab__label`},e?s(st,null,s("div",{class:`${a}-tabs-tab__height-placeholder`},"\xA0"),s(yt,{clsPrefix:a},{default:()=>s(At,null)})):w?w():typeof h=="object"?h:wt(h!=null?h:r)),c&&this.type==="card"?s(Rt,{clsPrefix:a,class:`${a}-tabs-tab__close`,onClick:this.handleClose,disabled:d}):null))}}),Kt=b("tabs",`
 box-sizing: border-box;
 width: 100%;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[R("segment-type",[b("tabs-rail",[S("&.transition-disabled","color: red;",[b("tabs-tab",`
 transition: none;
 `)])])]),b("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[b("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[b("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[R("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),S("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),R("flex",[b("tabs-nav",{width:"100%"},[b("tabs-wrapper",{width:"100%"},[b("tabs-tab",{marginRight:0})])])]),b("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[E("prefix, suffix",`
 display: flex;
 align-items: center;
 `),E("prefix","padding-right: 16px;"),E("suffix","padding-left: 16px;")]),b("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[R("shadow-before",[S("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),R("shadow-after",[S("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),S("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `),S("&::before",`
 left: 0;
 `),S("&::after",`
 right: 0;
 `)]),b("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `),b("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),b("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),b("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[R("disabled",{cursor:"not-allowed"}),E("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),E("label",`
 display: flex;
 align-items: center;
 `)]),b("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[S("&.transition-disabled",`
 transition: none;
 `),R("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),b("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),b("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 padding: var(--n-pane-padding);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[S("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),S("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),S("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),S("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),S("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),b("tabs-tab-pad",`
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),R("line-type, bar-type",[b("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S("&:hover",{color:"var(--n-tab-text-color-hover)"}),R("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),R("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),b("tabs-nav",[R("line-type",[E("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),R("card-type",[E("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[R("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[E("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Tt("disabled",[S("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),R("closable","padding-right: 6px;"),R("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),R("disabled","color: var(--n-tab-text-color-disabled);")]),b("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),Yt=Object.assign(Object.assign({},Re.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ea=Y({name:"Tabs",props:Yt,setup(e,{slots:a}){var r,d,o,u;const{mergedClsPrefixRef:v,inlineThemeDisabled:c}=St(e),m=Re("Tabs","-tabs",Kt,Wt,e,v),x=$(null),w=$(null),h=$(null),p=$(null),y=$(null),C=$(!0),T=$(!0),f=ue(e,["labelSize","size"]),z=ue(e,["activeName","value"]),P=$((d=(r=z.value)!==null&&r!==void 0?r:e.defaultValue)!==null&&d!==void 0?d:a.default?(u=(o=ee(a.default())[0])===null||o===void 0?void 0:o.props)===null||u===void 0?void 0:u.name:null),W=zt(z,P),M={id:0},N=q(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Q(W,()=>{M.id=0,_(),D()});function g(){var t;const{value:n}=W;return n===null?null:(t=x.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${n}"]`)}function A(t){if(e.type==="card")return;const{value:n}=w;if(!!n&&t){const i=`${v.value}-tabs-bar--disabled`,{barWidth:l}=e;if(t.dataset.disabled==="true"?n.classList.add(i):n.classList.remove(i),typeof l=="number"&&t.offsetWidth>=l){const L=Math.floor((t.offsetWidth-l)/2)+t.offsetLeft;n.style.left=`${L}px`,n.style.maxWidth=`${l}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width="8192px",n.offsetWidth}}function _(){if(e.type==="card")return;const t=g();t&&A(t)}function D(t){var n;const i=(n=y.value)===null||n===void 0?void 0:n.$el;if(!i)return;const l=g();if(!l)return;const{scrollLeft:L,offsetWidth:j}=i,{offsetLeft:F,offsetWidth:X}=l;L>F?i.scrollTo({top:0,left:F,behavior:"smooth"}):F+X>L+j&&i.scrollTo({top:0,left:F+X-j,behavior:"smooth"})}const H=$(null);let G=0,B=null;function Te(t){const n=H.value;if(n){G=t.getBoundingClientRect().height;const i=`${G}px`,l=()=>{n.style.height=i,n.style.maxHeight=i};B?(l(),B(),B=null):B=l}}function Se(t){const n=H.value;if(n){const i=t.getBoundingClientRect().height,l=()=>{document.body.offsetHeight,n.style.maxHeight=`${i}px`,n.style.height=`${Math.max(G,i)}px`};B?(B(),B=null,l()):B=l}}function ze(){const t=H.value;t&&(t.style.maxHeight="",t.style.height="")}const oe={value:[]},se=$("next");function Pe(t){const n=W.value;let i="next";for(const l of oe.value){if(l===n)break;if(l===t){i="prev";break}}se.value=i,$e(t)}function $e(t){const{onActiveNameChange:n,onUpdateValue:i,"onUpdate:value":l}=e;n&&U(n,t),i&&U(i,t),l&&U(l,t),P.value=t}function We(t){const{onClose:n}=e;n&&U(n,t)}function le(){const{value:t}=w;if(!t)return;const n="transition-disabled";t.classList.add(n),_(),t.classList.remove(n)}let de=0;function Ae(t){var n;if(t.contentRect.width===0&&t.contentRect.height===0||de===t.contentRect.width)return;de=t.contentRect.width;const{type:i}=e;(i==="line"||i==="bar")&&le(),i!=="segment"&&J((n=y.value)===null||n===void 0?void 0:n.$el)}const _e=ae(Ae,64);Q([()=>e.justifyContent,()=>e.size],()=>{Z(()=>{const{type:t}=e;(t==="line"||t==="bar")&&le()})});const V=$(!1);function Le(t){var n;const{target:i,contentRect:{width:l}}=t,L=i.parentElement.offsetWidth;if(!V.value)L<l&&(V.value=!0);else{const{value:j}=p;if(!j)return;L-l>j.$el.offsetWidth&&(V.value=!1)}J((n=y.value)===null||n===void 0?void 0:n.$el)}const Be=ae(Le,64);function Ee(){const{onAdd:t}=e;t&&t(),Z(()=>{const n=g(),{value:i}=y;!n||!i||i.scrollTo({left:n.offsetLeft,top:0,behavior:"smooth"})})}function J(t){if(!t)return;const{scrollLeft:n,scrollWidth:i,offsetWidth:l}=t;C.value=n<=0,T.value=n+l>=i}const ke=ae(t=>{J(t.target)},64);lt(ie,{triggerRef:I(e,"trigger"),tabStyleRef:I(e,"tabStyle"),paneClassRef:I(e,"paneClass"),paneStyleRef:I(e,"paneStyle"),mergedClsPrefixRef:v,typeRef:I(e,"type"),closableRef:I(e,"closable"),valueRef:W,tabChangeIdRef:M,onBeforeLeaveRef:I(e,"onBeforeLeave"),activateTab:Pe,handleClose:We,handleAdd:Ee}),Pt(()=>{_(),D()}),dt(()=>{const{value:t}=h;if(!t)return;const{value:n}=v,i=`${n}-tabs-nav-scroll-wrapper--shadow-before`,l=`${n}-tabs-nav-scroll-wrapper--shadow-after`;C.value?t.classList.remove(i):t.classList.add(i),T.value?t.classList.remove(l):t.classList.add(l)});const ce=$(null);Q(W,()=>{if(e.type==="segment"){const t=ce.value;t&&Z(()=>{t.classList.add("transition-disabled"),t.offsetWidth,t.classList.remove("transition-disabled")})}});const je={syncBarPosition:()=>{_()}},fe=q(()=>{const{value:t}=f,{type:n}=e,i={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[n],l=`${t}${i}`,{self:{barColor:L,closeIconColor:j,closeIconColorHover:F,closeIconColorPressed:X,tabColor:Ie,tabBorderColor:Oe,paneTextColor:Fe,tabFontWeight:Ne,tabBorderRadius:De,tabFontWeightActive:Me,colorSegment:He,fontWeightStrong:Ve,tabColorSegment:Xe,closeSize:Ue,closeIconSize:qe,closeColorHover:Ke,closeColorPressed:Ye,closeBorderRadius:Ge,[k("panePadding",t)]:Je,[k("tabPadding",l)]:Qe,[k("tabGap",l)]:Ze,[k("tabTextColor",n)]:et,[k("tabTextColorActive",n)]:tt,[k("tabTextColorHover",n)]:at,[k("tabTextColorDisabled",n)]:nt,[k("tabFontSize",t)]:rt},common:{cubicBezierEaseInOut:it}}=m.value;return{"--n-bezier":it,"--n-color-segment":He,"--n-bar-color":L,"--n-tab-font-size":rt,"--n-tab-text-color":et,"--n-tab-text-color-active":tt,"--n-tab-text-color-disabled":nt,"--n-tab-text-color-hover":at,"--n-pane-text-color":Fe,"--n-tab-border-color":Oe,"--n-tab-border-radius":De,"--n-close-size":Ue,"--n-close-icon-size":qe,"--n-close-color-hover":Ke,"--n-close-color-pressed":Ye,"--n-close-border-radius":Ge,"--n-close-icon-color":j,"--n-close-icon-color-hover":F,"--n-close-icon-color-pressed":X,"--n-tab-color":Ie,"--n-tab-font-weight":Ne,"--n-tab-font-weight-active":Me,"--n-tab-padding":Qe,"--n-tab-gap":Ze,"--n-pane-padding":Je,"--n-font-weight-strong":Ve,"--n-tab-color-segment":Xe}}),O=c?$t("tabs",q(()=>`${f.value[0]}${e.type[0]}`),fe,e):void 0;return Object.assign({mergedClsPrefix:v,mergedValue:W,renderedNames:new Set,tabsRailElRef:ce,tabsPaneWrapperRef:H,tabsElRef:x,barElRef:w,addTabInstRef:p,xScrollInstRef:y,scrollWrapperElRef:h,addTabFixed:V,tabWrapperStyle:N,handleNavResize:_e,mergedSize:f,handleScroll:ke,handleTabsResize:Be,cssVars:c?void 0:fe,themeClass:O==null?void 0:O.themeClass,animationDirection:se,renderNameListRef:oe,onAnimationBeforeLeave:Te,onAnimationEnter:Se,onAnimationAfterEnter:ze,onRender:O==null?void 0:O.onRender},je)},render(){const{mergedClsPrefix:e,type:a,addTabFixed:r,addable:d,mergedSize:o,renderNameListRef:u,onRender:v,$slots:{default:c,prefix:m,suffix:x}}=this;v==null||v();const w=c?ee(c()).filter(f=>f.type.__TAB_PANE__===!0):[],h=c?ee(c()).filter(f=>f.type.__TAB__===!0):[],p=!h.length,y=a==="card",C=a==="segment",T=!y&&!C&&this.justifyContent;return u.value=[],s("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${a}-type`,`${e}-tabs--${o}-size`,T&&`${e}-tabs--flex`],style:this.cssVars},s("div",{class:[`${e}-tabs-nav--${a}-type`,`${e}-tabs-nav`]},ve(m,f=>f&&s("div",{class:`${e}-tabs-nav__prefix`},f)),C?s("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},p?w.map((f,z)=>(u.value.push(f.props.name),s(re,Object.assign({},f.props,{internalCreatedByPane:!0,internalLeftPadded:z!==0}),f.children?{default:f.children.tab}:void 0))):h.map((f,z)=>(u.value.push(f.props.name),z===0?f:ye(f)))):s(pe,{onResize:this.handleNavResize},{default:()=>s("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},s(Lt,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const f=s("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},T?null:s("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),p?w.map((P,W)=>(u.value.push(P.props.name),ne(s(re,Object.assign({},P.props,{internalCreatedByPane:!0,internalLeftPadded:W!==0&&(!T||T==="center"||T==="start"||T==="end")}),P.children?{default:P.children.tab}:void 0)))):h.map((P,W)=>(u.value.push(P.props.name),ne(W!==0&&!T?ye(P):P))),!r&&d&&y?xe(d,(p?w.length:h.length)!==0):null,T?null:s("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let z=f;return y&&d&&(z=s(pe,{onResize:this.handleTabsResize},{default:()=>f})),s("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},z,y?s("div",{class:`${e}-tabs-pad`}):null,y?null:s("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),r&&d&&y?xe(d,!0):null,ve(x,f=>f&&s("div",{class:`${e}-tabs-nav__suffix`},f))),p&&(this.animated?s("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},me(w,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):me(w,this.mergedValue,this.renderedNames)))}});function me(e,a,r,d,o,u,v){const c=[];return e.forEach(m=>{const{name:x,displayDirective:w,"display-directive":h}=m.props,p=C=>w===C||h===C,y=a===x;if(m.key!==void 0&&(m.key=x),y||p("show")||p("show:lazy")&&r.has(x)){r.has(x)||r.add(x);const C=!p("if");c.push(C?ct(m,[[ft,y]]):m)}}),v?s(bt,{name:`${v}-transition`,onBeforeLeave:d,onEnter:o,onAfterEnter:u},{default:()=>c}):c}function xe(e,a){return s(re,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:a,disabled:typeof e=="object"&&e.disabled})}function ye(e){const a=ut(e);return a.props?a.props.internalLeftPadded=!0:a.props={internalLeftPadded:!0},a}function ne(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{ea as N,re as T,Zt as a,ae as b,Yt as c,Ce as d,qt as e,ge as t};
