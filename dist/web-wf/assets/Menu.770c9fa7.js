import{l as V,b2 as ze,d as M,P as d,a7 as ne,a9 as $,bt as Ie,ab as b,a4 as L,bu as Y,bv as Ve,bw as Ue,bx as qe,bn as Ge,S as Se,by as U,bz as We,bA as Xe,bB as ge,bC as Ze,F as Ne,bD as Je,bE as Qe,bF as Ye,bG as eo,W as m,bH as oo,Y as y,a0 as oe,X as S,Z as h,bI as ce,bJ as E,bK as no,a1 as Re,a3 as le,ah as B,ac as Pe,bL as ie,be as to,bM as Ae,bN as Ke,bO as ro,ag as J,ai as io,bP as lo,bQ as ao,bR as ue,bS as co,bT as so,bU as xe,bV as uo,bW as vo}from"./index.b9dd0157.js";function ho(e){return n=>{n?e.value=n.$el:e.value=null}}function mo(e,n,t){if(!n)return e;const a=V(e.value);let i=null;return ze(e,l=>{i!==null&&window.clearTimeout(i),l===!0?t&&!t.value?a.value=!0:i=window.setTimeout(()=>{a.value=!0},n):a.value=!1}),a}const po=M({name:"ChevronDownFilled",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),ke=M({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return d("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),ve=ne("n-dropdown-menu"),ae=ne("n-dropdown"),we=ne("n-dropdown-option");function se(e,n){return e.type==="submenu"||e.type===void 0&&e[n]!==void 0}function fo(e){return e.type==="group"}function He(e){return e.type==="divider"}function bo(e){return e.type==="render"}const Oe=M({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const n=$(ae),{hoverKeyRef:t,keyboardKeyRef:a,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:l,activeKeyPathRef:u,animatedRef:v,mergedShowRef:c,renderLabelRef:N,renderIconRef:k,labelFieldRef:I,childrenFieldRef:p,renderOptionRef:A,nodePropsRef:O,menuPropsRef:F}=n,R=$(we,null),T=$(ve),q=$(Ie),G=b(()=>e.tmNode.rawNode),_=b(()=>{const{value:g}=p;return se(e.tmNode.rawNode,g)}),D=b(()=>{const{disabled:g}=e.tmNode;return g}),ee=b(()=>{if(!_.value)return!1;const{key:g,disabled:H}=e.tmNode;if(H)return!1;const{value:W}=t,{value:X}=a,{value:de}=i,{value:Z}=l;return W!==null?Z.includes(g):X!==null?Z.includes(g)&&Z[Z.length-1]!==g:de!==null?Z.includes(g):!1}),j=b(()=>a.value===null&&!v.value),x=mo(ee,300,j),w=b(()=>!!(R!=null&&R.enteringSubmenuRef.value)),o=V(!1);L(we,{enteringSubmenuRef:o});function f(){o.value=!0}function s(){o.value=!1}function P(){const{parentKey:g,tmNode:H}=e;H.disabled||!c.value||(i.value=g,a.value=null,t.value=H.key)}function z(){const{tmNode:g}=e;g.disabled||!c.value||t.value!==g.key&&P()}function C(g){if(e.tmNode.disabled||!c.value)return;const{relatedTarget:H}=g;H&&!ge({target:H},"dropdownOption")&&!ge({target:H},"scrollbarRail")&&(t.value=null)}function r(){const{value:g}=_,{tmNode:H}=e;!c.value||!g&&!H.disabled&&(n.doSelect(H.key,H.rawNode),n.doUpdateShow(!1))}return{labelField:I,renderLabel:N,renderIcon:k,siblingHasIcon:T.showIconRef,siblingHasSubmenu:T.hasSubmenuRef,menuProps:F,popoverBody:q,animated:v,mergedShowSubmenu:b(()=>x.value&&!w.value),rawNode:G,hasSubmenu:_,pending:Y(()=>{const{value:g}=l,{key:H}=e.tmNode;return g.includes(H)}),childActive:Y(()=>{const{value:g}=u,{key:H}=e.tmNode,W=g.findIndex(X=>H===X);return W===-1?!1:W<g.length-1}),active:Y(()=>{const{value:g}=u,{key:H}=e.tmNode,W=g.findIndex(X=>H===X);return W===-1?!1:W===g.length-1}),mergedDisabled:D,renderOption:A,nodeProps:O,handleClick:r,handleMouseMove:z,handleMouseEnter:P,handleMouseLeave:C,handleSubmenuBeforeEnter:f,handleSubmenuAfterEnter:s}},render(){var e,n;const{animated:t,rawNode:a,mergedShowSubmenu:i,clsPrefix:l,siblingHasIcon:u,siblingHasSubmenu:v,renderLabel:c,renderIcon:N,renderOption:k,nodeProps:I,props:p,scrollable:A}=this;let O=null;if(i){const q=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,a,a.children);O=d(Fe,Object.assign({},q,{clsPrefix:l,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const F={class:[`${l}-dropdown-option-body`,this.pending&&`${l}-dropdown-option-body--pending`,this.active&&`${l}-dropdown-option-body--active`,this.childActive&&`${l}-dropdown-option-body--child-active`,this.mergedDisabled&&`${l}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},R=I==null?void 0:I(a),T=d("div",Object.assign({class:[`${l}-dropdown-option`,R==null?void 0:R.class],"data-dropdown-option":!0},R),d("div",Se(F,p),[d("div",{class:[`${l}-dropdown-option-body__prefix`,u&&`${l}-dropdown-option-body__prefix--show-icon`]},[N?N(a):U(a.icon)]),d("div",{"data-dropdown-option":!0,class:`${l}-dropdown-option-body__label`},c?c(a):U((n=a[this.labelField])!==null&&n!==void 0?n:a.title)),d("div",{"data-dropdown-option":!0,class:[`${l}-dropdown-option-body__suffix`,v&&`${l}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?d(We,null,{default:()=>d(Xe,null)}):null)]),this.hasSubmenu?d(Ve,null,{default:()=>[d(Ue,null,{default:()=>d("div",{class:`${l}-dropdown-offset-container`},d(qe,{show:this.mergedShowSubmenu,placement:this.placement,to:A&&this.popoverBody||void 0,teleportDisabled:!A},{default:()=>d("div",{class:`${l}-dropdown-menu-wrapper`},t?d(Ge,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>O}):O)}))})]}):null);return k?k({node:T,option:a}):T}}),go=M({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:n}=$(ve),{renderLabelRef:t,labelFieldRef:a,nodePropsRef:i,renderOptionRef:l}=$(ae);return{labelField:a,showIcon:e,hasSubmenu:n,renderLabel:t,nodeProps:i,renderOption:l}},render(){var e;const{clsPrefix:n,hasSubmenu:t,showIcon:a,nodeProps:i,renderLabel:l,renderOption:u}=this,{rawNode:v}=this.tmNode,c=d("div",Object.assign({class:`${n}-dropdown-option`},i==null?void 0:i(v)),d("div",{class:`${n}-dropdown-option-body ${n}-dropdown-option-body--group`},d("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__prefix`,a&&`${n}-dropdown-option-body__prefix--show-icon`]},U(v.icon)),d("div",{class:`${n}-dropdown-option-body__label`,"data-dropdown-option":!0},l?l(v):U((e=v.title)!==null&&e!==void 0?e:v[this.labelField])),d("div",{class:[`${n}-dropdown-option-body__suffix`,t&&`${n}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return u?u({node:c,option:v}):c}}),xo=M({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:n,clsPrefix:t}=this,{children:a}=e;return d(Ne,null,d(go,{clsPrefix:t,tmNode:e,key:e.key}),a==null?void 0:a.map(i=>{const{rawNode:l}=i;return l.show===!1?null:He(l)?d(ke,{clsPrefix:t,key:i.key}):i.isGroup?(Ze("dropdown","`group` node is not allowed to be put in `group` node."),null):d(Oe,{clsPrefix:t,tmNode:i,parentKey:n,key:i.key})}))}}),wo=M({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:n}}=this.tmNode;return d("div",n,[e==null?void 0:e()])}}),Fe=M({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:n,childrenFieldRef:t}=$(ae);L(ve,{showIconRef:b(()=>{const i=n.value;return e.tmNodes.some(l=>{var u;if(l.isGroup)return(u=l.children)===null||u===void 0?void 0:u.some(({rawNode:c})=>i?i(c):c.icon);const{rawNode:v}=l;return i?i(v):v.icon})}),hasSubmenuRef:b(()=>{const{value:i}=t;return e.tmNodes.some(l=>{var u;if(l.isGroup)return(u=l.children)===null||u===void 0?void 0:u.some(({rawNode:c})=>se(c,i));const{rawNode:v}=l;return se(v,i)})})});const a=V(null);return L(Je,null),L(Qe,null),L(Ie,a),{bodyRef:a}},render(){const{parentKey:e,clsPrefix:n,scrollable:t}=this,a=this.tmNodes.map(i=>{const{rawNode:l}=i;return l.show===!1?null:bo(l)?d(wo,{tmNode:i,key:i.key}):He(l)?d(ke,{clsPrefix:n,key:i.key}):fo(l)?d(xo,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key}):d(Oe,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key,props:l.props,scrollable:t})});return d("div",{class:[`${n}-dropdown-menu`,t&&`${n}-dropdown-menu--scrollable`],ref:"bodyRef"},t?d(eo,{contentClass:`${n}-dropdown-menu__content`},{default:()=>a}):a,this.showArrow?Ye({clsPrefix:n,arrowStyle:this.arrowStyle}):null)}}),yo=m("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[oo(),m("dropdown-option",`
 position: relative;
 `,[y("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[y("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),m("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[y("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),oe("disabled",[S("pending",`
 color: var(--n-option-text-color-hover);
 `,[h("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),y("&::before","background-color: var(--n-option-color-hover);")]),S("active",`
 color: var(--n-option-text-color-active);
 `,[h("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),y("&::before","background-color: var(--n-option-color-active);")]),S("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[h("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),S("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),S("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[h("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[S("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),h("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[S("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),m("icon",`
 font-size: var(--n-option-icon-size);
 `)]),h("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),h("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[S("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),m("icon",`
 font-size: var(--n-option-icon-size);
 `)]),m("dropdown-menu","pointer-events: all;")]),m("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),m("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),m("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),y(">",[m("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),oe("scrollable",`
 padding: var(--n-padding);
 `),S("scrollable",[h("content",`
 padding: var(--n-padding);
 `)])]),Co={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},zo=Object.keys(Ae),Io=Object.assign(Object.assign(Object.assign({},Ae),Co),le.props),So=M({name:"Dropdown",inheritAttrs:!1,props:Io,setup(e){const n=V(!1),t=ce(E(e,"show"),n),a=b(()=>{const{keyField:s,childrenField:P}=e;return Ke(e.options,{getKey(z){return z[s]},getDisabled(z){return z.disabled===!0},getIgnored(z){return z.type==="divider"||z.type==="render"},getChildren(z){return z[P]}})}),i=b(()=>a.value.treeNodes),l=V(null),u=V(null),v=V(null),c=b(()=>{var s,P,z;return(z=(P=(s=l.value)!==null&&s!==void 0?s:u.value)!==null&&P!==void 0?P:v.value)!==null&&z!==void 0?z:null}),N=b(()=>a.value.getPath(c.value).keyPath),k=b(()=>a.value.getPath(e.value).keyPath),I=Y(()=>e.keyboard&&t.value);no({keydown:{ArrowUp:{prevent:!0,handler:D},ArrowRight:{prevent:!0,handler:_},ArrowDown:{prevent:!0,handler:ee},ArrowLeft:{prevent:!0,handler:G},Enter:{prevent:!0,handler:j},Escape:q}},I);const{mergedClsPrefixRef:p,inlineThemeDisabled:A}=Re(e),O=le("Dropdown","-dropdown",yo,ro,e,p);L(ae,{labelFieldRef:E(e,"labelField"),childrenFieldRef:E(e,"childrenField"),renderLabelRef:E(e,"renderLabel"),renderIconRef:E(e,"renderIcon"),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:v,pendingKeyPathRef:N,activeKeyPathRef:k,animatedRef:E(e,"animated"),mergedShowRef:t,nodePropsRef:E(e,"nodeProps"),renderOptionRef:E(e,"renderOption"),menuPropsRef:E(e,"menuProps"),doSelect:F,doUpdateShow:R}),ze(t,s=>{!e.animated&&!s&&T()});function F(s,P){const{onSelect:z}=e;z&&B(z,s,P)}function R(s){const{"onUpdate:show":P,onUpdateShow:z}=e;P&&B(P,s),z&&B(z,s),n.value=s}function T(){l.value=null,u.value=null,v.value=null}function q(){R(!1)}function G(){w("left")}function _(){w("right")}function D(){w("up")}function ee(){w("down")}function j(){const s=x();(s==null?void 0:s.isLeaf)&&t.value&&(F(s.key,s.rawNode),R(!1))}function x(){var s;const{value:P}=a,{value:z}=c;return!P||z===null?null:(s=P.getNode(z))!==null&&s!==void 0?s:null}function w(s){const{value:P}=c,{value:{getFirstAvailableNode:z}}=a;let C=null;if(P===null){const r=z();r!==null&&(C=r.key)}else{const r=x();if(r){let g;switch(s){case"down":g=r.getNext();break;case"up":g=r.getPrev();break;case"right":g=r.getChild();break;case"left":g=r.getParent();break}g&&(C=g.key)}}C!==null&&(l.value=null,u.value=C)}const o=b(()=>{const{size:s,inverted:P}=e,{common:{cubicBezierEaseInOut:z},self:C}=O.value,{padding:r,dividerColor:g,borderRadius:H,optionOpacityDisabled:W,[J("optionIconSuffixWidth",s)]:X,[J("optionSuffixWidth",s)]:de,[J("optionIconPrefixWidth",s)]:Z,[J("optionPrefixWidth",s)]:_e,[J("fontSize",s)]:De,[J("optionHeight",s)]:je,[J("optionIconSize",s)]:Be}=C,K={"--n-bezier":z,"--n-font-size":De,"--n-padding":r,"--n-border-radius":H,"--n-option-height":je,"--n-option-prefix-width":_e,"--n-option-icon-prefix-width":Z,"--n-option-suffix-width":de,"--n-option-icon-suffix-width":X,"--n-option-icon-size":Be,"--n-divider-color":g,"--n-option-opacity-disabled":W};return P?(K["--n-color"]=C.colorInverted,K["--n-option-color-hover"]=C.optionColorHoverInverted,K["--n-option-color-active"]=C.optionColorActiveInverted,K["--n-option-text-color"]=C.optionTextColorInverted,K["--n-option-text-color-hover"]=C.optionTextColorHoverInverted,K["--n-option-text-color-active"]=C.optionTextColorActiveInverted,K["--n-option-text-color-child-active"]=C.optionTextColorChildActiveInverted,K["--n-prefix-color"]=C.prefixColorInverted,K["--n-suffix-color"]=C.suffixColorInverted,K["--n-group-header-text-color"]=C.groupHeaderTextColorInverted):(K["--n-color"]=C.color,K["--n-option-color-hover"]=C.optionColorHover,K["--n-option-color-active"]=C.optionColorActive,K["--n-option-text-color"]=C.optionTextColor,K["--n-option-text-color-hover"]=C.optionTextColorHover,K["--n-option-text-color-active"]=C.optionTextColorActive,K["--n-option-text-color-child-active"]=C.optionTextColorChildActive,K["--n-prefix-color"]=C.prefixColor,K["--n-suffix-color"]=C.suffixColor,K["--n-group-header-text-color"]=C.groupHeaderTextColor),K}),f=A?Pe("dropdown",b(()=>`${e.size[0]}${e.inverted?"i":""}`),o,e):void 0;return{mergedClsPrefix:p,mergedTheme:O,tmNodes:i,mergedShow:t,handleAfterLeave:()=>{!e.animated||T()},doUpdateShow:R,cssVars:A?void 0:o,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender}},render(){const e=(a,i,l,u,v)=>{var c;const{mergedClsPrefix:N,menuProps:k}=this;(c=this.onRender)===null||c===void 0||c.call(this);const I=(k==null?void 0:k(void 0,this.tmNodes.map(A=>A.rawNode)))||{},p={ref:ho(i),class:[a,`${N}-dropdown`,this.themeClass],clsPrefix:N,tmNodes:this.tmNodes,style:[l,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:u,onMouseleave:v};return d(Fe,Se(this.$attrs,p,I))},{mergedTheme:n}=this,t={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(to,Object.assign({},ie(this.$props,zo),t),{trigger:()=>{var a,i;return(i=(a=this.$slots).default)===null||i===void 0?void 0:i.call(a)}})}}),te=ne("n-menu"),he=ne("n-submenu"),me=ne("n-menu-item-group"),re=8;function pe(e){const n=$(te),{props:t,mergedCollapsedRef:a}=n,i=$(he,null),l=$(me,null),u=b(()=>t.mode==="horizontal"),v=b(()=>u.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),c=b(()=>{var p;return Math.max((p=t.collapsedIconSize)!==null&&p!==void 0?p:t.iconSize,t.iconSize)}),N=b(()=>{var p;return!u.value&&e.root&&a.value&&(p=t.collapsedIconSize)!==null&&p!==void 0?p:t.iconSize}),k=b(()=>{if(u.value)return;const{collapsedWidth:p,indent:A,rootIndent:O}=t,{root:F,isGroup:R}=e,T=O===void 0?A:O;if(F)return a.value?p/2-c.value/2:T;if(l)return A/2+l.paddingLeftRef.value;if(i)return(R?A/2:A)+i.paddingLeftRef.value}),I=b(()=>{const{collapsedWidth:p,indent:A,rootIndent:O}=t,{value:F}=c,{root:R}=e;return u.value||!R||!a.value?re:(O===void 0?A:O)+F+re-(p+F)/2});return{dropdownPlacement:v,activeIconSize:N,maxIconSize:c,paddingLeft:k,iconMarginRight:I,NMenu:n,NSubmenu:i}}const fe={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Te=Object.assign(Object.assign({},fe),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),No=M({name:"MenuOptionGroup",props:Te,setup(e){L(he,null);const n=pe(e);L(me,{paddingLeftRef:n.paddingLeft});const{mergedClsPrefixRef:t,props:a}=$(te);return function(){const{value:i}=t,l=n.paddingLeft.value,{nodeProps:u}=a,v=u==null?void 0:u(e.tmNode.rawNode);return d("div",{class:`${i}-menu-item-group`,role:"group"},d("div",Object.assign({},v,{class:[`${i}-menu-item-group-title`,v==null?void 0:v.class],style:[(v==null?void 0:v.style)||"",l!==void 0?`padding-left: ${l}px;`:""]}),U(e.title),e.extra?d(Ne,null," ",U(e.extra)):null),d("div",null,e.tmNodes.map(c=>be(c,a))))}}}),$e=M({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0}},setup(e){const{props:n}=$(te);return{menuProps:n,style:b(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:b(()=>{const{maxIconSize:t,activeIconSize:a,iconMarginRight:i}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${a}px`,marginRight:`${i}px`}})}},render(){const{clsPrefix:e,tmNode:n,menuProps:{renderIcon:t,renderLabel:a,renderExtra:i,expandIcon:l}}=this,u=t?t(n.rawNode):U(this.icon);return d("div",{onClick:v=>{var c;(c=this.onClick)===null||c===void 0||c.call(this,v)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},u&&d("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[u]),d("div",{class:`${e}-menu-item-content-header`,role:"none"},a?a(n.rawNode):U(this.title),this.extra||i?d("span",{class:`${e}-menu-item-content-header__extra`}," ",i?i(n.rawNode):U(this.extra)):null),this.showArrow?d(io,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>l?l(n.rawNode):d(po,null)}):null)}}),Me=Object.assign(Object.assign({},fe),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:{type:Boolean,default:!1},icon:Function,onClick:Function}),Ro=M({name:"Submenu",props:Me,setup(e){const n=pe(e),{NMenu:t,NSubmenu:a}=n,{props:i,mergedCollapsedRef:l,mergedThemeRef:u}=t,v=b(()=>{const{disabled:p}=e;return a!=null&&a.mergedDisabledRef.value||i.disabled?!0:p}),c=V(!1);L(he,{paddingLeftRef:n.paddingLeft,mergedDisabledRef:v}),L(me,null);function N(){const{onClick:p}=e;p&&p()}function k(){v.value||(l.value||t.toggleExpand(e.internalKey),N())}function I(p){c.value=p}return{menuProps:i,mergedTheme:u,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:n.maxIconSize,activeIconSize:n.activeIconSize,iconMarginRight:n.iconMarginRight,dropdownPlacement:n.dropdownPlacement,dropdownShow:c,paddingLeft:n.paddingLeft,mergedDisabled:v,mergedValue:t.mergedValueRef,childActive:Y(()=>t.activePathRef.value.includes(e.internalKey)),collapsed:b(()=>i.mode==="horizontal"?!1:l.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:b(()=>!v.value&&(i.mode==="horizontal"||l.value)),handlePopoverShowChange:I,handleClick:k}},render(){var e;const{mergedClsPrefix:n,menuProps:{renderIcon:t,renderLabel:a}}=this,i=()=>{const{isHorizontal:u,paddingLeft:v,collapsed:c,mergedDisabled:N,maxIconSize:k,activeIconSize:I,title:p,childActive:A,icon:O,handleClick:F,menuProps:{nodeProps:R},dropdownShow:T,iconMarginRight:q,tmNode:G,mergedClsPrefix:_}=this,D=R==null?void 0:R(G.rawNode);return d("div",Object.assign({},D,{class:[`${_}-menu-item`,D==null?void 0:D.class],role:"menuitem"}),d($e,{tmNode:G,paddingLeft:v,collapsed:c,disabled:N,iconMarginRight:q,maxIconSize:k,activeIconSize:I,title:p,extra:this.extra,showArrow:!u,childActive:A,clsPrefix:_,icon:O,hover:T,onClick:F}))},l=()=>d(lo,null,{default:()=>{const{tmNodes:u,collapsed:v}=this;return v?null:d("div",{class:`${n}-submenu-children`,role:"menu"},u.map(c=>be(c,this.menuProps)))}});return this.root?d(So,Object.assign({size:"large"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,trigger:"hover",disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:a}),{default:()=>d("div",{class:`${n}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},i(),this.isHorizontal?null:l())}):d("div",{class:`${n}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},i(),l())}}),Ee=Object.assign(Object.assign({},fe),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),Po=M({name:"MenuOption",props:Ee,setup(e){const n=pe(e),{NSubmenu:t,NMenu:a}=n,{props:i,mergedClsPrefixRef:l,mergedCollapsedRef:u}=a,v=t?t.mergedDisabledRef:{value:!1},c=b(()=>v.value||e.disabled);function N(I){const{onClick:p}=e;p&&p(I)}function k(I){c.value||(a.doSelect(e.internalKey,e.tmNode.rawNode),N(I))}return{mergedClsPrefix:l,dropdownPlacement:n.dropdownPlacement,paddingLeft:n.paddingLeft,iconMarginRight:n.iconMarginRight,maxIconSize:n.maxIconSize,activeIconSize:n.activeIconSize,mergedTheme:a.mergedThemeRef,menuProps:i,dropdownEnabled:Y(()=>e.root&&u.value&&i.mode!=="horizontal"&&!c.value),selected:Y(()=>a.mergedValueRef.value===e.internalKey),mergedDisabled:c,handleClick:k}},render(){const{mergedClsPrefix:e,mergedTheme:n,tmNode:t,menuProps:{renderLabel:a,nodeProps:i}}=this,l=i==null?void 0:i(t.rawNode);return d("div",Object.assign({},l,{role:"menuitem",class:[`${e}-menu-item`,l==null?void 0:l.class]}),d(ao,{theme:n.peers.Tooltip,themeOverrides:n.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>a?a(t.rawNode):U(this.title),trigger:()=>d($e,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Ao=M({name:"MenuDivider",setup(){const e=$(te),{mergedClsPrefixRef:n,isHorizontalRef:t}=e;return()=>t.value?null:d("div",{class:`${n.value}-menu-divider`})}}),Ko=ue(Te),ko=ue(Ee),Ho=ue(Me);function Le(e){return e.type==="divider"||e.type==="render"}function Oo(e){return e.type==="divider"}function be(e,n){const{rawNode:t}=e,{show:a}=t;if(a===!1)return null;if(Le(t))return Oo(t)?d(Ao,Object.assign({key:e.key},t.props)):null;const{labelField:i}=n,{key:l,level:u,isGroup:v}=e,c=Object.assign(Object.assign({},t),{title:t.title||t[i],extra:t.titleExtra||t.extra,key:l,internalKey:l,level:u,root:u===0,isGroup:v});return e.children?e.isGroup?d(No,ie(c,Ko,{tmNode:e,tmNodes:e.children,key:l})):d(Ro,ie(c,Ho,{key:l,rawNodes:t[n.childrenField],tmNodes:e.children,tmNode:e})):d(Po,ie(c,ko,{key:l,tmNode:e}))}const ye=[y("&::before","background-color: var(--n-item-color-hover);"),h("arrow",`
 color: var(--n-arrow-color-hover);
 `),h("icon",`
 color: var(--n-item-icon-color-hover);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[y("a",`
 color: var(--n-item-text-color-hover);
 `),h("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Ce=[h("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[y("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],Fo=y([m("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[S("horizontal",`
 display: inline-flex;
 padding-bottom: 0;
 `,[m("submenu","margin: 0;"),m("menu-item","margin: 0;"),m("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[y("&::before","display: none;"),S("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),m("menu-item-content",[S("selected",[h("icon","color: var(--n-item-icon-color-active-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[y("a","color: var(--n-item-text-color-active-horizontal);"),h("extra","color: var(--n-item-text-color-active-horizontal);")])]),S("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[y("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),h("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),oe("disabled",[oe("selected, child-active",[y("&:focus-within",Ce)]),S("selected",[Q(null,[h("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[y("a","color: var(--n-item-text-color-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),S("child-active",[Q(null,[h("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[y("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),Q("border-bottom: 2px solid var(--n-border-color-horizontal);",Ce)]),m("menu-item-content-header",[y("a","color: var(--n-item-text-color-horizontal);")])])]),S("collapsed",[m("menu-item-content",[S("selected",[y("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),m("menu-item-content-header","opacity: 0;"),h("arrow","opacity: 0;"),h("icon","color: var(--n-item-icon-color-collapsed);")])]),m("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),m("menu-item-content",`
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
 `,[y("> *","z-index: 1;"),y("&::before",`
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
 `),S("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),S("collapsed",[h("arrow","transform: rotate(0);")]),S("selected",[y("&::before","background-color: var(--n-item-color-active);"),h("arrow","color: var(--n-arrow-color-active);"),h("icon","color: var(--n-item-icon-color-active);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[y("a","color: var(--n-item-text-color-active);"),h("extra","color: var(--n-item-text-color-active);")])]),S("child-active",[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[y("a",`
 color: var(--n-item-text-color-child-active);
 `),h("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),h("arrow",`
 color: var(--n-arrow-color-child-active);
 `),h("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),oe("disabled",[oe("selected, child-active",[y("&:focus-within",ye)]),S("selected",[Q(null,[h("arrow","color: var(--n-arrow-color-active-hover);"),h("icon","color: var(--n-item-icon-color-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[y("a","color: var(--n-item-text-color-active-hover);"),h("extra","color: var(--n-item-text-color-active-hover);")])])]),S("child-active",[Q(null,[h("arrow","color: var(--n-arrow-color-child-active-hover);"),h("icon","color: var(--n-item-icon-color-child-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[y("a","color: var(--n-item-text-color-child-active-hover);"),h("extra","color: var(--n-item-text-color-child-active-hover);")])])]),S("selected",[Q(null,[y("&::before","background-color: var(--n-item-color-active-hover);")])]),Q(null,ye)]),h("icon",`
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
 `),h("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),m("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 color: var(--n-item-text-color);
 `,[y("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[y("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),h("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),m("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[m("menu-item-content",`
 height: var(--n-item-height);
 `),m("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[co({duration:".2s"})])]),m("menu-item-group",[m("menu-item-group-title",`
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
 `)])]),m("menu-tooltip",[y("a",`
 color: inherit;
 text-decoration: none;
 `)]),m("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function Q(e,n){return[S("hover",e,n),y("&:hover",e,n)]}const To=Object.assign(Object.assign({},le.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,defalut:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array,dropdownPlacement:{type:String,default:"bottom"}}),Mo=M({name:"Menu",props:To,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:t}=Re(e),a=le("Menu","-menu",Fo,vo,e,n),i=$(so,null),l=b(()=>{var x;const{collapsed:w}=e;if(w!==void 0)return w;if(i){const{collapseModeRef:o,collapsedRef:f}=i;if(o.value==="width")return(x=f.value)!==null&&x!==void 0?x:!1}return!1}),u=b(()=>{const{keyField:x,childrenField:w,disabledField:o}=e;return Ke(e.items||e.options,{getIgnored(f){return Le(f)},getChildren(f){return f[w]},getDisabled(f){return f[o]},getKey(f){var s;return(s=f[x])!==null&&s!==void 0?s:f.name}})}),v=b(()=>new Set(u.value.treeNodes.map(x=>x.key))),{watchProps:c}=e,N=V(null);c!=null&&c.includes("defaultValue")?xe(()=>{N.value=e.defaultValue}):N.value=e.defaultValue;const k=E(e,"value"),I=ce(k,N),p=V([]),A=()=>{p.value=e.defaultExpandAll?u.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||u.value.getPath(I.value,{includeSelf:!1}).keyPath};c!=null&&c.includes("defaultExpandedKeys")?xe(A):A();const O=uo(e,["expandedNames","expandedKeys"]),F=ce(O,p),R=b(()=>u.value.treeNodes),T=b(()=>u.value.getPath(I.value).keyPath);L(te,{props:e,mergedCollapsedRef:l,mergedThemeRef:a,mergedValueRef:I,mergedExpandedKeysRef:F,activePathRef:T,mergedClsPrefixRef:n,isHorizontalRef:b(()=>e.mode==="horizontal"),invertedRef:E(e,"inverted"),doSelect:q,toggleExpand:_});function q(x,w){const{"onUpdate:value":o,onUpdateValue:f,onSelect:s}=e;f&&B(f,x,w),o&&B(o,x,w),s&&B(s,x,w),N.value=x}function G(x){const{"onUpdate:expandedKeys":w,onUpdateExpandedKeys:o,onExpandedNamesChange:f,onOpenNamesChange:s}=e;w&&B(w,x),o&&B(o,x),f&&B(f,x),s&&B(s,x),p.value=x}function _(x){const w=Array.from(F.value),o=w.findIndex(f=>f===x);if(~o)w.splice(o,1);else{if(e.accordion&&v.value.has(x)){const f=w.findIndex(s=>v.value.has(s));f>-1&&w.splice(f,1)}w.push(x)}G(w)}const D=x=>{const w=u.value.getPath(x!=null?x:I.value,{includeSelf:!1}).keyPath;if(!w.length)return;const o=Array.from(F.value),f=new Set([...o,...w]);e.accordion&&v.value.forEach(s=>{f.has(s)&&!w.includes(s)&&f.delete(s)}),G(Array.from(f))},ee=b(()=>{const{inverted:x}=e,{common:{cubicBezierEaseInOut:w},self:o}=a.value,{borderRadius:f,borderColorHorizontal:s,fontSize:P,itemHeight:z,dividerColor:C}=o,r={"--n-divider-color":C,"--n-bezier":w,"--n-font-size":P,"--n-border-color-horizontal":s,"--n-border-radius":f,"--n-item-height":z};return x?(r["--n-group-text-color"]=o.groupTextColorInverted,r["--n-color"]=o.colorInverted,r["--n-item-text-color"]=o.itemTextColorInverted,r["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,r["--n-item-text-color-active"]=o.itemTextColorActiveInverted,r["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,r["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,r["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,r["--n-item-icon-color"]=o.itemIconColorInverted,r["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,r["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,r["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,r["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,r["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,r["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,r["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,r["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,r["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,r["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,r["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,r["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,r["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,r["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,r["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,r["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,r["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,r["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,r["--n-arrow-color"]=o.arrowColorInverted,r["--n-arrow-color-hover"]=o.arrowColorHoverInverted,r["--n-arrow-color-active"]=o.arrowColorActiveInverted,r["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,r["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,r["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,r["--n-item-color-hover"]=o.itemColorHoverInverted,r["--n-item-color-active"]=o.itemColorActiveInverted,r["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,r["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(r["--n-group-text-color"]=o.groupTextColor,r["--n-color"]=o.color,r["--n-item-text-color"]=o.itemTextColor,r["--n-item-text-color-hover"]=o.itemTextColorHover,r["--n-item-text-color-active"]=o.itemTextColorActive,r["--n-item-text-color-child-active"]=o.itemTextColorChildActive,r["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,r["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,r["--n-item-icon-color"]=o.itemIconColor,r["--n-item-icon-color-hover"]=o.itemIconColorHover,r["--n-item-icon-color-active"]=o.itemIconColorActive,r["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,r["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,r["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,r["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,r["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,r["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,r["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,r["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,r["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,r["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,r["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,r["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,r["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,r["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,r["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,r["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,r["--n-arrow-color"]=o.arrowColor,r["--n-arrow-color-hover"]=o.arrowColorHover,r["--n-arrow-color-active"]=o.arrowColorActive,r["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,r["--n-arrow-color-child-active"]=o.arrowColorChildActive,r["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,r["--n-item-color-hover"]=o.itemColorHover,r["--n-item-color-active"]=o.itemColorActive,r["--n-item-color-active-hover"]=o.itemColorActiveHover,r["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),r}),j=t?Pe("menu",b(()=>e.inverted?"a":"b"),ee,e):void 0;return{mergedClsPrefix:n,controlledExpandedKeys:O,uncontrolledExpanededKeys:p,mergedExpandedKeys:F,uncontrolledValue:N,mergedValue:I,activePath:T,tmNodes:R,mergedTheme:a,mergedCollapsed:l,cssVars:t?void 0:ee,themeClass:j==null?void 0:j.themeClass,onRender:j==null?void 0:j.onRender,showOption:D}},render(){const{mergedClsPrefix:e,mode:n,themeClass:t,onRender:a}=this;return a==null||a(),d("div",{role:n==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${n}`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars},this.tmNodes.map(i=>be(i,this.$props)))}});export{Mo as N,So as a,ho as c,Io as d,To as m};
