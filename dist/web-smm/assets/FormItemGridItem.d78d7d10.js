import{d as a,r as i,B as s,J as o,K as n,N as m,L as p,M as I,O as d,P as f}from"./index.e51afe9d.js";const l=Object.assign(Object.assign({},d),f),v=a({__GRID_ITEM__:!0,name:"FormItemGridItem",alias:["FormItemGi"],props:l,setup(){const e=i(null);return{formItemInstRef:e,validate:(...t)=>{const{value:r}=e;if(r)return r.validate(...t)},restoreValidation:()=>{const{value:t}=e;if(t)return t.restoreValidation()}}},render(){return s(I,o(this.$.vnode.props||{},p),{default:()=>{const e=o(this.$props,n);return s(m,Object.assign({ref:"formItemInstRef"},e),this.$slots)}})}});export{v as N};
