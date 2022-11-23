import{q as n,s as m,Q as f,b1 as b,b9 as z,aG as K,d as w,v as k,X as O,x as R,aU as V,B as t,ba as M,bb as q,aS as G,bc as L,aj as Q,bd as X,y as v,z as Y,Y as y,a1 as S,be as J,a2 as $,D as c,a4 as I,bf as Z,bg as ee}from"./index.e51afe9d.js";const te=n("steps",`
 width: 100%;
 display: flex;
`,[n("step",`
 position: relative;
 display: flex;
 flex: 1;
 `,[m("disabled","cursor: not-allowed"),m("clickable",`
 cursor: pointer;
 `),f("&:last-child",[n("step-splitor","display: none;")])]),n("step-splitor",`
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),n("step-content","flex: 1;",[n("step-content-header",`
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[b("title",`
 white-space: nowrap;
 flex: 0;
 `)]),b("description",`
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),n("step-indicator",`
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[n("step-indicator-slot",`
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `,[b("index",`
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[z()]),n("icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[z()]),n("base-icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[z()])])]),m("vertical","flex-direction: column;",[K("show-description",[f(">",[n("step","padding-bottom: 8px;")])]),f(">",[n("step","margin-bottom: 16px;",[f("&:last-child","margin-bottom: 0;"),f(">",[n("step-indicator",[f(">",[n("step-splitor",`
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]),n("step-content",[b("description","margin-top: 8px;")])])])])])]);function ie(e,s){return typeof e!="object"||e===null||Array.isArray(e)?null:(e.props||(e.props={}),e.props.internalIndex=s+1,e)}function ne(e){return e.map((s,o)=>ie(s,o))}const re=Object.assign(Object.assign({},R.props),{current:Number,status:{type:String,default:"process"},size:{type:String,default:"medium"},vertical:Boolean,"onUpdate:current":[Function,Array],onUpdateCurrent:[Function,Array]}),T=G("n-steps"),ae=w({name:"Steps",props:re,setup(e,{slots:s}){const{mergedClsPrefixRef:o,mergedRtlRef:a}=k(e),p=O("Steps",a,o),d=R("Steps","-steps",te,L,e,o);return V(T,{props:e,mergedThemeRef:d,mergedClsPrefixRef:o,stepsSlots:s}),{mergedClsPrefix:o,rtlEnabled:p}},render(){const{mergedClsPrefix:e}=this;return t("div",{class:[`${e}-steps`,this.rtlEnabled&&`${e}-steps--rtl`,this.vertical&&`${e}-steps--vertical`]},ne(M(q(this))))}}),se={status:String,title:String,description:String,disabled:Boolean,internalIndex:{type:Number,default:0}},ce=w({name:"Step",props:se,setup(e){const s=Q(T,null);s||X("step","`n-step` must be placed inside `n-steps`.");const{inlineThemeDisabled:o}=k(),{props:a,mergedThemeRef:p,mergedClsPrefixRef:d,stepsSlots:l}=s,x=v(()=>a.vertical),g=v(()=>{const{status:i}=e;if(i)return i;{const{internalIndex:r}=e,{current:h}=a;if(h===void 0)return"process";if(r<h)return"finish";if(r===h)return a.status||"process";if(r>h)return"wait"}return"process"}),C=v(()=>{const{value:i}=g,{size:r}=a,{common:{cubicBezierEaseInOut:h},self:{stepHeaderFontWeight:N,[c("stepHeaderFontSize",r)]:j,[c("indicatorIndexFontSize",r)]:B,[c("indicatorSize",r)]:F,[c("indicatorIconSize",r)]:E,[c("indicatorTextColor",i)]:_,[c("indicatorBorderColor",i)]:U,[c("headerTextColor",i)]:A,[c("splitorColor",i)]:H,[c("indicatorColor",i)]:W,[c("descriptionTextColor",i)]:D}}=p.value;return{"--n-bezier":h,"--n-description-text-color":D,"--n-header-text-color":A,"--n-indicator-border-color":U,"--n-indicator-color":W,"--n-indicator-icon-size":E,"--n-indicator-index-font-size":B,"--n-indicator-size":F,"--n-indicator-text-color":_,"--n-splitor-color":H,"--n-step-header-font-size":j,"--n-step-header-font-weight":N}}),u=o?Y("step",v(()=>{const{value:i}=g,{size:r}=a;return`${i[0]}${r[0]}`}),C,a):void 0,P=v(()=>{if(e.disabled)return;const{onUpdateCurrent:i,"onUpdate:current":r}=a;return i||r?()=>{i&&I(i,e.internalIndex),r&&I(r,e.internalIndex)}:void 0});return{stepsSlots:l,mergedClsPrefix:d,vertical:x,mergedStatus:g,handleStepClick:P,cssVars:o?void 0:C,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){const{mergedClsPrefix:e,onRender:s,handleStepClick:o,disabled:a}=this,p=y(this.$slots.default,d=>{const l=d||this.description;return l?t("div",{class:`${e}-step-content__description`},l):null});return s==null||s(),t("div",{class:[`${e}-step`,a&&`${e}-step--disabled`,!a&&o&&`${e}-step--clickable`,this.themeClass,p&&`${e}-step--show-description`,`${e}-step--${this.mergedStatus}-status`],style:this.cssVars,onClick:o},t("div",{class:`${e}-step-indicator`},t("div",{class:`${e}-step-indicator-slot`},t(J,null,{default:()=>y(this.$slots.icon,d=>{const{mergedStatus:l,stepsSlots:x}=this;return l==="finish"||l==="error"?l==="finish"?t($,{clsPrefix:e,key:"finish"},{default:()=>S(x["finish-icon"],()=>[t(Z,null)])}):l==="error"?t($,{clsPrefix:e,key:"error"},{default:()=>S(x["error-icon"],()=>[t(ee,null)])}):null:d||t("div",{key:this.internalIndex,class:`${e}-step-indicator-slot__index`},this.internalIndex)})})),this.vertical?t("div",{class:`${e}-step-splitor`}):null),t("div",{class:`${e}-step-content`},t("div",{class:`${e}-step-content-header`},t("div",{class:`${e}-step-content-header__title`},S(this.$slots.title,()=>[this.title])),this.vertical?null:t("div",{class:`${e}-step-splitor`})),p))}});export{ae as N,ce as a};
