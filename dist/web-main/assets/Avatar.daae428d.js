import{c as N,o as W}from"./Image.316697df.js";import{A,p as k,cx as K,o as C,cy as V,O as w,v as _,w as P,eb as G,x as D,F as U,ag as X,bp as Y,ec as q,z as J,aT as Q}from"./index.0e7eb3bd.js";import{d as Z,r as b,l as H,m as z,i as ee,u as re,L as oe,y as te,k as y}from"./runtime-dom.esm-bundler.bf4f36cb.js";const ne=A("n-avatar-group"),ae=k("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[K(C("&","--n-merged-color: var(--n-color-modal);")),V(C("&","--n-merged-color: var(--n-color-popover);")),C("img",`
 width: 100%;
 height: 100%;
 `),w("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),k("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),w("text","line-height: 1.25")]),se=Object.assign(Object.assign({},P.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,color:String}),ce=Z({name:"Avatar",props:se,setup(o){const{mergedClsPrefixRef:i,inlineThemeDisabled:f}=_(o),a=b(!1);let l=null;const p=b(null),s=b(null),L=()=>{const{value:e}=p;if(e&&(l===null||l!==e.innerHTML)){l=e.innerHTML;const{value:r}=s;if(r){const{offsetWidth:g,offsetHeight:n}=r,{offsetWidth:t,offsetHeight:S}=e,R=.9,E=Math.min(g/t*R,n/S*R,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${E})`}}},v=H(ne,null),h=z(()=>{const{size:e}=o;if(e)return e;const{size:r}=v||{};return r||"medium"}),x=P("Avatar","-avatar",ae,q,o,i),d=H(G,null),c=z(()=>{if(v)return!0;const{round:e,circle:r}=o;return e!==void 0||r!==void 0?e||r:d?d.roundRef.value:!1}),m=z(()=>v?!0:o.bordered||!1),B=e=>{if(!F.value)return;a.value=!0;const{onError:r}=o;r&&r(e)};ee(()=>o.src,()=>a.value=!1);const O=z(()=>{const e=h.value,r=c.value,g=m.value,{color:n}=o,{self:{borderRadius:t,fontSize:S,color:R,border:E,colorModal:$,colorPopover:I},common:{cubicBezierEaseInOut:M}}=x.value;let j;return typeof e=="number"?j=`${e}px`:j=x.value.self[J("height",e)],{"--n-font-size":S,"--n-border":g?E:"none","--n-border-radius":r?"50%":t,"--n-color":n||R,"--n-color-modal":n||$,"--n-color-popover":n||I,"--n-bezier":M,"--n-merged-size":`var(--n-avatar-size-override, ${j})`}}),u=f?D("avatar",z(()=>{const e=h.value,r=c.value,g=m.value,{color:n}=o;let t="";return e&&(typeof e=="number"?t+=`a${e}`:t+=e[0]),r&&(t+="b"),g&&(t+="c"),n&&(t+=Q(n)),t}),O,o):void 0,F=b(!o.lazy);re(()=>{if(N)return;let e;const r=oe(()=>{e==null||e(),e=void 0,o.lazy&&(e=W(s.value,o.intersectionObserverOptions,F))});te(()=>{r(),e==null||e()})});const T=b(!o.lazy);return{textRef:p,selfRef:s,mergedRoundRef:c,mergedClsPrefix:i,fitTextTransform:L,cssVars:f?void 0:O,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender,hasLoadError:a,handleError:B,shouldStartLoading:F,loaded:T,mergedOnLoad:e=>{const{onLoad:r}=o;r==null||r(e),T.value=!0}}},render(){var o,i;const{$slots:f,src:a,mergedClsPrefix:l,lazy:p,onRender:s,mergedOnLoad:L,shouldStartLoading:v,loaded:h,hasLoadError:x}=this;s==null||s();let d;const c=!h&&!x&&(this.renderPlaceholder?this.renderPlaceholder():(i=(o=this.$slots).placeholder)===null||i===void 0?void 0:i.call(o));return this.hasLoadError?d=this.renderFallback?this.renderFallback():U(f.fallback,()=>[y("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):d=X(f.default,m=>{if(m)return y(Y,{onResize:this.fitTextTransform},{default:()=>y("span",{ref:"textRef",class:`${l}-avatar__text`},m)});if(a)return y("img",{loading:"eager",src:v||h?a:void 0,onLoad:L,"data-image-src":a,onError:this.handleError,style:[{objectFit:this.objectFit},c?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]})}),y("span",{ref:"selfRef",class:[`${l}-avatar`,this.themeClass],style:this.cssVars},d,p&&c)}});export{ce as N,ne as a,se as b};
