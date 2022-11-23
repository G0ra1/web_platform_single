import{k as u,d as B,I as L,r as S,m as M,U as T}from"./runtime-dom.esm-bundler.bf4f36cb.js";import{p as U,o as C,O as y,q as _,a0 as F,v as k,w as p,Q as A,R as H,x as P,aS as E,z as O,aT as j,s as D,V as I}from"./index.0e7eb3bd.js";const W=u("svg",{viewBox:"0 0 512 512"},u("path",{d:"M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"})),q=U("rate",{display:"inline-flex",flexWrap:"nowrap"},[C("&:hover",[y("item",`
 transition:
 transform .1s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),y("item",`
 position: relative;
 display: flex;
 transition:
 transform .1s var(--n-bezier),
 color .3s var(--n-bezier);
 transform: scale(1);
 font-size: var(--n-item-size);
 color: var(--n-item-color);
 `,[C("&:not(:first-child)",`
 margin-left: 6px;
 `),_("active",`
 color: var(--n-item-color-active);
 `)]),F("readonly",`
 cursor: pointer;
 `,[y("item",[C("&:hover",`
 transform: scale(1.05);
 `),C("&:active",`
 transform: scale(0.96);
 `)])]),y("half",`
 display: flex;
 transition: inherit;
 position: absolute;
 top: 0;
 left: 0;
 bottom: 0;
 width: 50%;
 overflow: hidden;
 color: rgba(255, 255, 255, 0);
 `,[_("active",`
 color: var(--n-item-color-active);
 `)])]),K=Object.assign(Object.assign({},p.props),{allowHalf:Boolean,count:{type:Number,default:5},value:Number,defaultValue:{type:Number,default:null},readonly:Boolean,size:{type:[String,Number],default:"medium"},clearable:Boolean,color:String,onClear:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),G=B({name:"Rate",props:K,setup(t){const{mergedClsPrefixRef:r,inlineThemeDisabled:f}=k(t),n=p("Rate","-rate",q,E,t,r),d=L(t,"value"),m=S(t.defaultValue),v=S(null),l=A(t),h=H(d,m);function g(e){const{"onUpdate:value":a,onUpdateValue:o}=t,{nTriggerFormChange:b,nTriggerFormInput:c}=l;a&&I(a,e),o&&I(o,e),m.value=e,b(),c()}function s(e,a){return t.allowHalf?a.offsetX>=Math.floor(a.currentTarget.offsetWidth/2)?e+1:e+.5:e+1}let z=!1;function w(e,a){z||(v.value=s(e,a))}function x(){v.value=null}function N(e,a){var o;const{clearable:b}=t,c=s(e,a);b&&c===h.value?(z=!0,(o=t.onClear)===null||o===void 0||o.call(t),v.value=null,g(null)):g(c)}function $(){z=!1}const V=M(()=>{const{size:e}=t,{self:a}=n.value;return typeof e=="number"?`${e}px`:a[O("size",e)]}),R=M(()=>{const{common:{cubicBezierEaseInOut:e},self:a}=n.value,{itemColor:o,itemColorActive:b}=a,{color:c}=t;return{"--n-bezier":e,"--n-item-color":o,"--n-item-color-active":c||b,"--n-item-size":V.value}}),i=f?P("rate",M(()=>{const e=V.value,{color:a}=t;let o="";return e&&(o+=e[0]),a&&(o+=j(a)),o}),R,t):void 0;return{mergedClsPrefix:r,mergedValue:h,hoverIndex:v,handleMouseMove:w,handleClick:N,handleMouseLeave:x,handleMouseEnterSomeStar:$,cssVars:f?void 0:R,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){const{readonly:t,hoverIndex:r,mergedValue:f,mergedClsPrefix:n,onRender:d,$slots:{default:m}}=this;return d==null||d(),u("div",{class:[`${n}-rate`,{[`${n}-rate--readonly`]:t},this.themeClass],style:this.cssVars,onMouseleave:this.handleMouseLeave},T(this.count,(v,l)=>{const h=m?m():u(D,{clsPrefix:n},{default:()=>W}),g=r!==null?l+1<=r:l+1<=(f||0);return u("div",{key:l,class:[`${n}-rate__item`,g&&`${n}-rate__item--active`],onClick:t?void 0:s=>{this.handleClick(l,s)},onMouseenter:this.handleMouseEnterSomeStar,onMousemove:t?void 0:s=>{this.handleMouseMove(l,s)}},h,this.allowHalf?u("div",{class:[`${n}-rate__half`,{[`${n}-rate__half--active`]:!g&&r!==null?l+.5<=r:l+.5<=(f||0)}]},h):null)}))}});export{G as N,K as r};
