import{af as Fe,ag as Le,E as fe,b as T,C as B,ah as re,D as I,r as H,ab as j,aa as ve,$ as V,h as M,ai as Ke,H as C,N as X,P as D,Q as ge,f as de,aj as De,a1 as me,ak as Ue,a9 as Be,a3 as Ge,I as W,a7 as Xe,J as Je,al as Ve,Z as Re,am as Ze,an as Qe,T as et,G as Ne,U as tt,ao as nt,V as ot,ap as at,x as it,a6 as rt,L as st,F as lt,a4 as ct,Y as ut,aq as ft,ar as he,as as we}from"./entry.a8ea04dc.js";import{a as G,n as He,d as vt,s as se,b as dt,B as te,g as Ee,f as mt}from"./forwardRefs.d6ed2341.js";import{D as be,E as ne,F as oe,G as xe,H as pe,a as yt,r as gt,h as ht,I as wt,J as Et,q as bt}from"./VBtn.fb6611c3.js";import{m as xt,u as Ie}from"./tag.19ec8209.js";import{u as $e}from"./scopeId.280ebac7.js";import{m as pt,M as St}from"./VImg.e08626a0.js";const J=new WeakMap;function Ot(e,n){Object.keys(n).forEach(t=>{if(Fe(t)){const o=Le(t),a=J.get(e);if(n[t]==null)a==null||a.forEach(r=>{const[s,i]=r;s===o&&(e.removeEventListener(o,i),a.delete(r))});else if(!a||![...a].some(r=>r[0]===o&&r[1]===n[t])){e.addEventListener(o,n[t]);const r=a||new Set;r.add([o,n[t]]),J.has(e)||J.set(e,r)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function Pt(e,n){Object.keys(n).forEach(t=>{if(Fe(t)){const o=Le(t),a=J.get(e);a==null||a.forEach(r=>{const[s,i]=r;s===o&&(e.removeEventListener(o,i),a.delete(r))})}else e.removeAttribute(t)})}function _e(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function kt(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?Ct(e):ye(e))return e;e=e.parentElement}return document.scrollingElement}function Q(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(ye(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function ye(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function Ct(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function At(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const Tt=I({target:Object},"v-dialog-transition"),Mt=fe()({name:"VDialogTransition",props:Tt(),setup(e,n){let{slots:t}=n;const o={onBeforeEnter(a){a.style.pointerEvents="none",a.style.visibility="hidden"},async onEnter(a,r){var d;await new Promise(E=>requestAnimationFrame(E)),await new Promise(E=>requestAnimationFrame(E)),a.style.visibility="";const{x:s,y:i,sx:c,sy:v,speed:f}=Oe(e.target,a),y=G(a,[{transform:`translate(${s}px, ${i}px) scale(${c}, ${v})`,opacity:0},{}],{duration:225*f,easing:vt});(d=Se(a))==null||d.forEach(E=>{G(E,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*f,easing:se})}),y.finished.then(()=>r())},onAfterEnter(a){a.style.removeProperty("pointer-events")},onBeforeLeave(a){a.style.pointerEvents="none"},async onLeave(a,r){var d;await new Promise(E=>requestAnimationFrame(E));const{x:s,y:i,sx:c,sy:v,speed:f}=Oe(e.target,a);G(a,[{},{transform:`translate(${s}px, ${i}px) scale(${c}, ${v})`,opacity:0}],{duration:125*f,easing:dt}).finished.then(()=>r()),(d=Se(a))==null||d.forEach(E=>{G(E,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*f,easing:se})})},onAfterLeave(a){a.style.removeProperty("pointer-events")}};return()=>e.target?T(re,B({name:"dialog-transition"},o,{css:!1}),t):T(re,{name:"dialog-transition"},t)}});function Se(e){var t;const n=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return n&&[...n]}function Oe(e,n){const t=e.getBoundingClientRect(),o=He(n),[a,r]=getComputedStyle(n).transformOrigin.split(" ").map(h=>parseFloat(h)),[s,i]=getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");let c=t.left+t.width/2;s==="left"||i==="left"?c-=t.width/2:(s==="right"||i==="right")&&(c+=t.width/2);let v=t.top+t.height/2;s==="top"||i==="top"?v-=t.height/2:(s==="bottom"||i==="bottom")&&(v+=t.height/2);const f=t.width/o.width,y=t.height/o.height,d=Math.max(1,f,y),E=f/d||0,g=y/d||0,u=o.width*o.height/(window.innerWidth*window.innerHeight),w=u>.12?Math.min(1.5,(u-.12)*10+1):1;return{x:c-(a+o.left),y:v-(r+o.top),sx:E,sy:g,speed:w}}function ae(e,n){return{x:e.x+n.x,y:e.y+n.y}}function Ft(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Pe(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:o}=e,a=o==="left"?0:o==="center"?n.width/2:o==="right"?n.width:o,r=t==="top"?0:t==="bottom"?n.height:t;return ae({x:a,y:r},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:o}=e,a=t==="left"?0:t==="right"?n.width:t,r=o==="top"?0:o==="center"?n.height/2:o==="bottom"?n.height:o;return ae({x:a,y:r},n)}return ae({x:n.width/2,y:n.height/2},n)}const qe={static:Bt,connected:Rt},Lt=I({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in qe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function Dt(e,n){const t=H({}),o=H();j&&(ve(()=>!!(n.isActive.value&&e.locationStrategy),r=>{var s,i;M(()=>e.locationStrategy,r),V(()=>{o.value=void 0}),typeof e.locationStrategy=="function"?o.value=(s=e.locationStrategy(n,e,t))==null?void 0:s.updateLocation:o.value=(i=qe[e.locationStrategy](n,e,t))==null?void 0:i.updateLocation}),window.addEventListener("resize",a,{passive:!0}),V(()=>{window.removeEventListener("resize",a),o.value=void 0}));function a(r){var s;(s=o.value)==null||s.call(o,r)}return{contentStyles:t,updateLocation:o}}function Bt(){}function Vt(e,n){n?e.style.removeProperty("left"):e.style.removeProperty("right");const t=He(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Rt(e,n,t){At(e.activatorEl.value)&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:r}=Ke(()=>{const g=be(n.location,e.isRtl.value),u=n.origin==="overlap"?g:n.origin==="auto"?ne(g):be(n.origin,e.isRtl.value);return g.side===u.side&&g.align===oe(u).align?{preferredAnchor:xe(g),preferredOrigin:xe(u)}:{preferredAnchor:g,preferredOrigin:u}}),[s,i,c,v]=["minWidth","minHeight","maxWidth","maxHeight"].map(g=>C(()=>{const u=parseFloat(n[g]);return isNaN(u)?1/0:u})),f=C(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const g=n.offset.split(" ").map(parseFloat);return g.length<2&&g.push(0),g}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let y=!1;const d=new ResizeObserver(()=>{y&&E()});M([e.activatorEl,e.contentEl],(g,u)=>{let[w,h]=g,[m,l]=u;m&&d.unobserve(m),w&&d.observe(w),l&&d.unobserve(l),h&&d.observe(h)},{immediate:!0}),V(()=>{d.disconnect()});function E(){if(y=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>y=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const g=e.activatorEl.value.getBoundingClientRect(),u=Vt(e.contentEl.value,e.isRtl.value),w=Q(e.contentEl.value),h=12;w.length||(w.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(u.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),u.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const m=w.reduce((O,S)=>{const b=S.getBoundingClientRect(),p=new te({x:S===document.documentElement?0:b.x,y:S===document.documentElement?0:b.y,width:S.clientWidth,height:S.clientHeight});return O?new te({x:Math.max(O.left,p.left),y:Math.max(O.top,p.top),width:Math.min(O.right,p.right)-Math.max(O.left,p.left),height:Math.min(O.bottom,p.bottom)-Math.max(O.top,p.top)}):p},void 0);m.x+=h,m.y+=h,m.width-=h*2,m.height-=h*2;let l={anchor:a.value,origin:r.value};function k(O){const S=new te(u),b=Pe(O.anchor,g),p=Pe(O.origin,S);let{x:F,y:L}=Ft(b,p);switch(O.anchor.side){case"top":L-=f.value[0];break;case"bottom":L+=f.value[0];break;case"left":F-=f.value[0];break;case"right":F+=f.value[0];break}switch(O.anchor.align){case"top":L-=f.value[1];break;case"bottom":L+=f.value[1];break;case"left":F-=f.value[1];break;case"right":F+=f.value[1];break}return S.x+=F,S.y+=L,S.width=Math.min(S.width,c.value),S.height=Math.min(S.height,v.value),{overflows:Ee(S,m),x:F,y:L}}let R=0,$=0;const _={x:0,y:0},Y={x:!1,y:!1};let K=-1;for(;!(K++>10);){const{x:O,y:S,overflows:b}=k(l);R+=O,$+=S,u.x+=O,u.y+=S;{const p=pe(l.anchor),F=b.x.before||b.x.after,L=b.y.before||b.y.after;let z=!1;if(["x","y"].forEach(P=>{if(P==="x"&&F&&!Y.x||P==="y"&&L&&!Y.y){const x={anchor:{...l.anchor},origin:{...l.origin}},A=P==="x"?p==="y"?oe:ne:p==="y"?ne:oe;x.anchor=A(x.anchor),x.origin=A(x.origin);const{overflows:q}=k(x);(q[P].before<=b[P].before&&q[P].after<=b[P].after||q[P].before+q[P].after<(b[P].before+b[P].after)/2)&&(l=x,z=Y[P]=!0)}}),z)continue}b.x.before&&(R+=b.x.before,u.x+=b.x.before),b.x.after&&(R-=b.x.after,u.x-=b.x.after),b.y.before&&($+=b.y.before,u.y+=b.y.before),b.y.after&&($-=b.y.after,u.y-=b.y.after);{const p=Ee(u,m);_.x=m.width-p.x.before-p.x.after,_.y=m.height-p.y.before-p.y.after,R+=p.x.before,u.x+=p.x.before,$+=p.y.before,u.y+=p.y.before}break}const N=pe(l.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${l.anchor.side} ${l.anchor.align}`,transformOrigin:`${l.origin.side} ${l.origin.align}`,top:D(ie($)),left:e.isRtl.value?void 0:D(ie(R)),right:e.isRtl.value?D(ie(-R)):void 0,minWidth:D(N==="y"?Math.min(s.value,g.width):s.value),maxWidth:D(ke(ge(_.x,s.value===1/0?0:s.value,c.value))),maxHeight:D(ke(ge(_.y,i.value===1/0?0:i.value,v.value)))}),{available:_,contentBox:u}}return M(()=>[a.value,r.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>E()),X(()=>{const g=E();if(!g)return;const{available:u,contentBox:w}=g;w.height>u.y&&requestAnimationFrame(()=>{E(),requestAnimationFrame(()=>{E()})})}),{updateLocation:E}}function ie(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function ke(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let le=!0;const ee=[];function Nt(e){!le||ee.length?(ee.push(e),ce()):(le=!1,e(),ce())}let Ce=-1;function ce(){cancelAnimationFrame(Ce),Ce=requestAnimationFrame(()=>{const e=ee.shift();e&&e(),ee.length?ce():le=!0})}const Z={none:null,close:$t,block:_t,reposition:qt},Ht=I({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Z}},"VOverlay-scroll-strategies");function It(e,n){if(!j)return;let t;de(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=De(),await X(),t.active&&t.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(o=Z[e.scrollStrategy])==null||o.call(Z,n,e,t)}))}),V(()=>{t==null||t.stop()})}function $t(e){function n(t){e.isActive.value=!1}We(e.activatorEl.value??e.contentEl.value,n)}function _t(e,n){var s;const t=(s=e.root.value)==null?void 0:s.offsetParent,o=[...new Set([...Q(e.activatorEl.value,n.contained?t:void 0),...Q(e.contentEl.value,n.contained?t:void 0)])].filter(i=>!i.classList.contains("v-overlay-scroll-blocked")),a=window.innerWidth-document.documentElement.offsetWidth,r=(i=>ye(i)&&i)(t||document.documentElement);r&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((i,c)=>{i.style.setProperty("--v-body-scroll-x",D(-i.scrollLeft)),i.style.setProperty("--v-body-scroll-y",D(-i.scrollTop)),i!==document.documentElement&&i.style.setProperty("--v-scrollbar-offset",D(a)),i.classList.add("v-overlay-scroll-blocked")}),V(()=>{o.forEach((i,c)=>{const v=parseFloat(i.style.getPropertyValue("--v-body-scroll-x")),f=parseFloat(i.style.getPropertyValue("--v-body-scroll-y"));i.style.removeProperty("--v-body-scroll-x"),i.style.removeProperty("--v-body-scroll-y"),i.style.removeProperty("--v-scrollbar-offset"),i.classList.remove("v-overlay-scroll-blocked"),i.scrollLeft=-v,i.scrollTop=-f}),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function qt(e,n,t){let o=!1,a=-1,r=-1;function s(i){Nt(()=>{var f,y;const c=performance.now();(y=(f=e.updateLocation).value)==null||y.call(f,i),o=(performance.now()-c)/(1e3/60)>2})}r=(typeof requestIdleCallback>"u"?i=>i():requestIdleCallback)(()=>{t.run(()=>{We(e.activatorEl.value??e.contentEl.value,i=>{o?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{s(i)})})):s(i)})})}),V(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(r),cancelAnimationFrame(a)})}function We(e,n){const t=[document,...Q(e)];t.forEach(o=>{o.addEventListener("scroll",n,{passive:!0})}),V(()=>{t.forEach(o=>{o.removeEventListener("scroll",n)})})}const ue=Symbol.for("vuetify:v-menu"),Wt=I({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function jt(e,n){const t={},o=a=>()=>{if(!j)return Promise.resolve(!0);const r=a==="openDelay";return t.closeDelay&&window.clearTimeout(t.closeDelay),delete t.closeDelay,t.openDelay&&window.clearTimeout(t.openDelay),delete t.openDelay,new Promise(s=>{const i=parseInt(e[a]??0,10);t[a]=window.setTimeout(()=>{n==null||n(r),s(r)},i)})};return{runCloseDelay:o("closeDelay"),runOpenDelay:o("openDelay")}}const zt=I({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Wt()},"VOverlay-activator");function Yt(e,n){let{isActive:t,isTop:o}=n;const a=H();let r=!1,s=!1,i=!0;const c=C(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),v=C(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:f,runCloseDelay:y}=jt(e,l=>{l===(e.openOnHover&&r||c.value&&s)&&!(e.openOnHover&&t.value&&!o.value)&&(t.value!==l&&(i=!0),t.value=l)}),d={onClick:l=>{l.stopPropagation(),a.value=l.currentTarget||l.target,t.value=!t.value},onMouseenter:l=>{var k;(k=l.sourceCapabilities)!=null&&k.firesTouchEvents||(r=!0,a.value=l.currentTarget||l.target,f())},onMouseleave:l=>{r=!1,y()},onFocus:l=>{Ge(l.target,":focus-visible")!==!1&&(s=!0,l.stopPropagation(),a.value=l.currentTarget||l.target,f())},onBlur:l=>{s=!1,l.stopPropagation(),y()}},E=C(()=>{const l={};return v.value&&(l.onClick=d.onClick),e.openOnHover&&(l.onMouseenter=d.onMouseenter,l.onMouseleave=d.onMouseleave),c.value&&(l.onFocus=d.onFocus,l.onBlur=d.onBlur),l}),g=C(()=>{const l={};if(e.openOnHover&&(l.onMouseenter=()=>{r=!0,f()},l.onMouseleave=()=>{r=!1,y()}),c.value&&(l.onFocusin=()=>{s=!0,f()},l.onFocusout=()=>{s=!1,y()}),e.closeOnContentClick){const k=me(ue,null);l.onClick=()=>{t.value=!1,k==null||k.closeParents()}}return l}),u=C(()=>{const l={};return e.openOnHover&&(l.onMouseenter=()=>{i&&(r=!0,i=!1,f())},l.onMouseleave=()=>{r=!1,y()}),l});M(o,l=>{l&&(e.openOnHover&&!r&&(!c.value||!s)||c.value&&!s&&(!e.openOnHover||!r))&&(t.value=!1)});const w=H();de(()=>{w.value&&X(()=>{a.value=Ue(w.value)})});const h=Be("useActivator");let m;return M(()=>!!e.activator,l=>{l&&j?(m=De(),m.run(()=>{Kt(e,h,{activatorEl:a,activatorEvents:E})})):m&&m.stop()},{flush:"post",immediate:!0}),V(()=>{m==null||m.stop()}),{activatorEl:a,activatorRef:w,activatorEvents:E,contentEvents:g,scrimEvents:u}}function Kt(e,n,t){let{activatorEl:o,activatorEvents:a}=t;M(()=>e.activator,(c,v)=>{if(v&&c!==v){const f=i(v);f&&s(f)}c&&X(()=>r())},{immediate:!0}),M(()=>e.activatorProps,()=>{r()}),V(()=>{s()});function r(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:i(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&Ot(c,B(a.value,v))}function s(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:i(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&Pt(c,B(a.value,v))}function i(){var f,y;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,v;if(c)if(c==="parent"){let d=(y=(f=n==null?void 0:n.proxy)==null?void 0:f.$el)==null?void 0:y.parentNode;for(;d!=null&&d.hasAttribute("data-no-activator");)d=d.parentNode;v=d}else typeof c=="string"?v=document.querySelector(c):"$el"in c?v=c.$el:v=c;return o.value=(v==null?void 0:v.nodeType)===Node.ELEMENT_NODE?v:null,o.value}}function Ut(){if(!j)return W(!1);const{ssr:e}=Xe();if(e){const n=W(!1);return Je(()=>{n.value=!0}),n}else return W(!0)}const Gt=I({eager:Boolean},"lazy");function Xt(e,n){const t=W(!1),o=C(()=>t.value||e.eager||n.value);M(n,()=>t.value=!0);function a(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:o,onAfterLeave:a}}const Ae=Symbol.for("vuetify:stack"),U=Ve([]);function Jt(e,n,t){const o=Be("useStack"),a=!t,r=me(Ae,void 0),s=Ve({activeChildren:new Set});Re(Ae,s);const i=W(+n.value);ve(e,()=>{var y;const f=(y=U.at(-1))==null?void 0:y[1];i.value=f?f+10:+n.value,a&&U.push([o.uid,i.value]),r==null||r.activeChildren.add(o.uid),V(()=>{if(a){const d=Qe(U).findIndex(E=>E[0]===o.uid);U.splice(d,1)}r==null||r.activeChildren.delete(o.uid)})});const c=W(!0);a&&de(()=>{var y;const f=((y=U.at(-1))==null?void 0:y[0])===o.uid;setTimeout(()=>c.value=f)});const v=C(()=>!s.activeChildren.size);return{globalTop:Ze(c),localTop:v,stackStyles:C(()=>({zIndex:i.value}))}}function Zt(e){return{teleportTarget:C(()=>{const t=e.value;if(t===!0||!j)return;const o=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(o==null)return;let a=o.querySelector(":scope > .v-overlay-container");return a||(a=document.createElement("div"),a.className="v-overlay-container",o.appendChild(a)),a})}}function Qt(){return!0}function je(e,n,t){if(!e||ze(e,t)===!1)return!1;const o=_e(n);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const a=(typeof t.value=="object"&&t.value.include||(()=>[]))();return a.push(n),!a.some(r=>r==null?void 0:r.contains(e.target))}function ze(e,n){return(typeof n.value=="object"&&n.value.closeConditional||Qt)(e)}function en(e,n,t){const o=typeof t.value=="function"?t.value:t.value.handler;n._clickOutside.lastMousedownWasOutside&&je(e,n,t)&&setTimeout(()=>{ze(e,t)&&o&&o(e)},0)}function Te(e,n){const t=_e(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const tn={mounted(e,n){const t=a=>en(a,e,n),o=a=>{e._clickOutside.lastMousedownWasOutside=je(a,e,n)};Te(e,a=>{a.addEventListener("click",t,!0),a.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:o}},unmounted(e,n){e._clickOutside&&(Te(e,t=>{var r;if(!t||!((r=e._clickOutside)!=null&&r[n.instance.$.uid]))return;const{onClick:o,onMousedown:a}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",o,!0),t.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[n.instance.$.uid])}};function nn(e){const{modelValue:n,color:t,...o}=e;return T(re,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&T("div",B({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const Ye=I({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...zt(),...xt(),...yt(),...Gt(),...Lt(),...Ht(),...et(),...pt()},"VOverlay"),Me=fe()({name:"VOverlay",directives:{ClickOutside:tn},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Ye()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:o,emit:a}=n;const r=Ne(e,"modelValue"),s=C({get:()=>r.value,set:x=>{x&&e.disabled||(r.value=x)}}),{teleportTarget:i}=Zt(C(()=>e.attach||e.contained)),{themeClasses:c}=tt(e),{rtlClasses:v,isRtl:f}=nt(),{hasContent:y,onAfterLeave:d}=Xt(e,s),E=gt(C(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:g,localTop:u,stackStyles:w}=Jt(s,ot(e,"zIndex"),e._disableGlobalStack),{activatorEl:h,activatorRef:m,activatorEvents:l,contentEvents:k,scrimEvents:R}=Yt(e,{isActive:s,isTop:u}),{dimensionStyles:$}=ht(e),_=Ut(),{scopeId:Y}=$e();M(()=>e.disabled,x=>{x&&(s.value=!1)});const K=H(),N=H(),{contentStyles:O,updateLocation:S}=Dt(e,{isRtl:f,contentEl:N,activatorEl:h,isActive:s});It(e,{root:K,contentEl:N,activatorEl:h,isActive:s,updateLocation:S});function b(x){a("click:outside",x),e.persistent?P():s.value=!1}function p(){return s.value&&g.value}j&&M(s,x=>{x?window.addEventListener("keydown",F):window.removeEventListener("keydown",F)},{immediate:!0});function F(x){var A,q;x.key==="Escape"&&g.value&&(e.persistent?P():(s.value=!1,(A=N.value)!=null&&A.contains(document.activeElement)&&((q=h.value)==null||q.focus())))}const L=wt();ve(()=>e.closeOnBack,()=>{Et(L,x=>{g.value&&s.value?(x(!1),e.persistent?P():s.value=!1):x()})});const z=H();M(()=>s.value&&(e.absolute||e.contained)&&i.value==null,x=>{if(x){const A=kt(K.value);A&&A!==document.scrollingElement&&(z.value=A.scrollTop)}});function P(){e.noClickAnimation||N.value&&G(N.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:se})}return Ie(()=>{var x;return T(lt,null,[(x=t.activator)==null?void 0:x.call(t,{isActive:s.value,props:B({ref:m},l.value,e.activatorProps)}),_.value&&y.value&&T(at,{disabled:!i.value,to:i.value},{default:()=>[T("div",B({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},c.value,v.value,e.class],style:[w.value,{top:D(z.value)},e.style],ref:K},Y,o),[T(nn,B({color:E,modelValue:s.value&&!!e.scrim},R.value),null),T(St,{appear:!0,persisted:!0,transition:e.transition,target:h.value,onAfterLeave:()=>{d(),a("afterLeave")}},{default:()=>{var A;return[it(T("div",B({ref:N,class:["v-overlay__content",e.contentClass],style:[$.value,O.value]},k.value,e.contentProps),[(A=t.default)==null?void 0:A.call(t,{isActive:s})]),[[rt,s.value],[st("click-outside"),{handler:b,closeConditional:p,include:()=>[h.value]}]])]}})])]})])}),{activatorEl:h,animateClick:P,contentEl:N,globalTop:g,localTop:u,updateLocation:S}}}),on=I({id:String,...ct(Ye({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Mt}}),["absolute"])},"VMenu"),fn=fe()({name:"VMenu",props:on(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:t}=n;const o=Ne(e,"modelValue"),{scopeId:a}=$e(),r=ut(),s=C(()=>e.id||`v-menu-${r}`),i=H(),c=me(ue,null),v=W(0);Re(ue,{register(){++v.value},unregister(){--v.value},closeParents(){setTimeout(()=>{v.value||(o.value=!1,c==null||c.closeParents())},40)}});async function f(u){var m,l,k;const w=u.relatedTarget,h=u.target;await X(),o.value&&w!==h&&((m=i.value)!=null&&m.contentEl)&&((l=i.value)!=null&&l.globalTop)&&![document,i.value.contentEl].includes(h)&&!i.value.contentEl.contains(h)&&((k=he(i.value.contentEl)[0])==null||k.focus())}M(o,u=>{u?(c==null||c.register(),document.addEventListener("focusin",f,{once:!0})):(c==null||c.unregister(),document.removeEventListener("focusin",f))});function y(){c==null||c.closeParents()}function d(u){var w,h,m;e.disabled||u.key==="Tab"&&(ft(he((w=i.value)==null?void 0:w.contentEl,!1),u.shiftKey?"prev":"next",k=>k.tabIndex>=0)||(o.value=!1,(m=(h=i.value)==null?void 0:h.activatorEl)==null||m.focus()))}function E(u){var h;if(e.disabled)return;const w=(h=i.value)==null?void 0:h.contentEl;w&&o.value?u.key==="ArrowDown"?(u.preventDefault(),we(w,"next")):u.key==="ArrowUp"&&(u.preventDefault(),we(w,"prev")):["ArrowDown","ArrowUp"].includes(u.key)&&(o.value=!0,u.preventDefault(),setTimeout(()=>setTimeout(()=>E(u))))}const g=C(()=>B({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":s.value,onKeydown:E},e.activatorProps));return Ie(()=>{const[u]=Me.filterProps(e);return T(Me,B({ref:i,class:["v-menu",e.class],style:e.style},u,{modelValue:o.value,"onUpdate:modelValue":w=>o.value=w,absolute:!0,activatorProps:g.value,"onClick:outside":y,onKeydown:d},a),{activator:t.activator,default:function(){for(var w=arguments.length,h=new Array(w),m=0;m<w;m++)h[m]=arguments[m];return T(bt,{root:"VMenu"},{default:()=>{var l;return[(l=t.default)==null?void 0:l.call(t,...h)]}})}})}),mt({id:s,ΨopenChildren:v},i)}});export{fn as V,Mt as a,Me as b,kt as g,Ye as m};
