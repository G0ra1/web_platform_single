function l(e){var n=0,t=e.children,i=t&&t.length;if(!i)n=1;else for(;--i>=0;)n+=t[i].value;e.value=n}function f(){return this.eachAfter(l)}function d(e,n){let t=-1;for(const i of this)e.call(n,i,++t,this);return this}function p(e,n){for(var t=this,i=[t],r,o,h=-1;t=i.pop();)if(e.call(n,t,++h,this),r=t.children)for(o=r.length-1;o>=0;--o)i.push(r[o]);return this}function v(e,n){for(var t=this,i=[t],r=[],o,h,c,s=-1;t=i.pop();)if(r.push(t),o=t.children)for(h=0,c=o.length;h<c;++h)i.push(o[h]);for(;t=r.pop();)e.call(n,t,++s,this);return this}function w(e,n){let t=-1;for(const i of this)if(e.call(n,i,++t,this))return i}function g(e){return this.eachAfter(function(n){for(var t=+e(n.data)||0,i=n.children,r=i&&i.length;--r>=0;)t+=i[r].value;n.value=t})}function _(e){return this.eachBefore(function(n){n.children&&n.children.sort(e)})}function y(e){for(var n=this,t=m(n,e),i=[n];n!==t;)n=n.parent,i.push(n);for(var r=i.length;e!==t;)i.splice(r,0,e),e=e.parent;return i}function m(e,n){if(e===n)return e;var t=e.ancestors(),i=n.ancestors(),r=null;for(e=t.pop(),n=i.pop();e===n;)r=e,e=t.pop(),n=i.pop();return r}function A(){for(var e=this,n=[e];e=e.parent;)n.push(e);return n}function x(){return Array.from(this)}function B(){var e=[];return this.eachBefore(function(n){n.children||e.push(n)}),e}function k(){var e=this,n=[];return e.each(function(t){t!==e&&n.push({source:t.parent,target:t})}),n}function*C(){var e=this,n,t=[e],i,r,o;do for(n=t.reverse(),t=[];e=n.pop();)if(yield e,i=e.children)for(r=0,o=i.length;r<o;++r)t.push(i[r]);while(t.length)}function a(e,n){e instanceof Map?(e=[void 0,e],n===void 0&&(n=D)):n===void 0&&(n=j);for(var t=new u(e),i,r=[t],o,h,c,s;i=r.pop();)if((h=n(i.data))&&(s=(h=Array.from(h)).length))for(i.children=h,c=s-1;c>=0;--c)r.push(o=h[c]=new u(h[c])),o.parent=i,o.depth=i.depth+1;return t.eachBefore(M)}function N(){return a(this).eachBefore(H)}function j(e){return e.children}function D(e){return Array.isArray(e)?e[1]:null}function H(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function M(e){var n=0;do e.height=n;while((e=e.parent)&&e.height<++n)}function u(e){this.data=e,this.depth=this.height=0,this.parent=null}u.prototype=a.prototype={constructor:u,count:f,each:d,eachAfter:v,eachBefore:p,find:w,sum:g,sort:_,path:y,ancestors:A,descendants:x,leaves:B,links:k,copy:N,[Symbol.iterator]:C};export{a as h};
