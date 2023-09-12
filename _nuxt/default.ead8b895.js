import{K as Y,ae as ct,h as K,af as ut,ag as dt,ah as Ve,n as Ne,ai as xe,aj as ft,ak as vt,f as ht,al as Oe,am as bt,an as mt,E as pt,ao as gt,ap as yt,a5 as $e,D as Fe,a6 as wt,o as A,c as B,a as M,z as D,j as C,p as Ue,e as He,O as qe,g as ye,i as We,w as se,r as ze,F as Se,B as Tt,t as Ye,aq as _t,m as Nt,q as Ft,b as P,d as we,ar as St,as as kt}from"./entry.e3657dab.js";import{d as Et,b as fe,u as Ct,a as It,B as Rt}from"./BaseIcon.78d1e105.js";import{_ as Mt}from"./nuxt-link.52cdf1e8.js";import{S as De}from"./SrOnly.c7d7e89d.js";import{_ as X}from"./_plugin-vue_export-helper.c27b6911.js";const xt=(n,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,t=>{var r;return((r=n.params[t.slice(1)])==null?void 0:r.toString())||""}),Te=(n,e)=>{const t=n.route.matched.find(s=>{var u;return((u=s.components)==null?void 0:u.default)===n.Component.type}),r=e??(t==null?void 0:t.meta.key)??(t&&xt(n.route,t));return typeof r=="function"?r(n.route):r},Ot=(n,e)=>({default:()=>n?Y(ct,n===!0?{}:n,e):e}),Dt=K({name:"RouteProvider",props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(n){const e=n.renderKey,t=n.route,r={};for(const s in n.route)Object.defineProperty(r,s,{get:()=>e===n.renderKey?n.route[s]:t[s]});return ut(Ve,dt(r)),()=>Y(n.vnode,{ref:n.vnodeRef})}}),Pt=K({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(n,{attrs:e,expose:t}){const r=ht(),s=Ne(),u=xe(Ve,null);t({pageRef:s});const o=xe(ft,null);let h;const b=r.deferHydration();return()=>Y(vt,{name:n.name,route:n.route,...e},{default:m=>{const N=Bt(u,m.route,m.Component),S=u&&u.matched.length===m.route.matched.length;if(!m.Component)return h&&!S?h:void 0;if(h&&o&&!o.isCurrent(m.route))return h;if(N&&u&&(!o||o!=null&&o.isCurrent(u)))return S?h:null;const I=Te(m,n.pageKey),T=!!(n.transition??m.route.meta.pageTransition??Oe),U=T&&Lt([n.transition,m.route.meta.pageTransition,Oe,{onAfterLeave:()=>{r.callHook("page:transition:finish",m.Component)}}].filter(Boolean));return h=bt(yt,T&&U,Ot(n.keepalive??m.route.meta.keepalive??gt,Y(mt,{suspensible:!0,onPending:()=>r.callHook("page:start",m.Component),onResolve:()=>{pt(()=>r.callHook("page:finish",m.Component).finally(b))}},{default:()=>Y(Dt,{key:I,vnode:m.Component,route:m.route,renderKey:I,trackRootNodes:T,vnodeRef:s})}))).default(),h}})}});function At(n){return Array.isArray(n)?n:n?[n]:[]}function Lt(n){const e=n.map(t=>({...t,onAfterLeave:At(t.onAfterLeave)}));return Et(...e)}function Bt(n,e,t){if(!n)return!1;const r=e.matched.findIndex(s=>{var u;return((u=s.components)==null?void 0:u.default)===(t==null?void 0:t.type)});return!r||r===-1?!1:e.matched.slice(0,r).some((s,u)=>{var o,h,b;return((o=s.components)==null?void 0:o.default)!==((b=(h=n.matched[u])==null?void 0:h.components)==null?void 0:b.default)})||t&&Te({route:e,Component:t})!==Te({route:n,Component:t})}/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var Ge=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],le=Ge.join(","),Xe=typeof Element>"u",$=Xe?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,ce=!Xe&&Element.prototype.getRootNode?function(n){var e;return n==null||(e=n.getRootNode)===null||e===void 0?void 0:e.call(n)}:function(n){return n==null?void 0:n.ownerDocument},ue=function n(e,t){var r;t===void 0&&(t=!0);var s=e==null||(r=e.getAttribute)===null||r===void 0?void 0:r.call(e,"inert"),u=s===""||s==="true",o=u||t&&e&&n(e.parentNode);return o},Kt=function(e){var t,r=e==null||(t=e.getAttribute)===null||t===void 0?void 0:t.call(e,"contenteditable");return r===""||r==="true"},Je=function(e,t,r){if(ue(e))return[];var s=Array.prototype.slice.apply(e.querySelectorAll(le));return t&&$.call(e,le)&&s.unshift(e),s=s.filter(r),s},Qe=function n(e,t,r){for(var s=[],u=Array.from(e);u.length;){var o=u.shift();if(!ue(o,!1))if(o.tagName==="SLOT"){var h=o.assignedElements(),b=h.length?h:o.children,m=n(b,!0,r);r.flatten?s.push.apply(s,m):s.push({scopeParent:o,candidates:m})}else{var N=$.call(o,le);N&&r.filter(o)&&(t||!e.includes(o))&&s.push(o);var S=o.shadowRoot||typeof r.getShadowRoot=="function"&&r.getShadowRoot(o),I=!ue(S,!1)&&(!r.shadowRootFilter||r.shadowRootFilter(o));if(S&&I){var T=n(S===!0?o.children:S.children,!0,r);r.flatten?s.push.apply(s,T):s.push({scopeParent:o,candidates:T})}else u.unshift.apply(u,o.children)}}return s},et=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},V=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||Kt(e))&&!et(e)?0:e.tabIndex},Zt=function(e,t){var r=V(e);return r<0&&t&&!et(e)?0:r},jt=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},tt=function(e){return e.tagName==="INPUT"},Vt=function(e){return tt(e)&&e.type==="hidden"},$t=function(e){var t=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(r){return r.tagName==="SUMMARY"});return t},Ut=function(e,t){for(var r=0;r<e.length;r++)if(e[r].checked&&e[r].form===t)return e[r]},Ht=function(e){if(!e.name)return!0;var t=e.form||ce(e),r=function(h){return t.querySelectorAll('input[type="radio"][name="'+h+'"]')},s;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")s=r(window.CSS.escape(e.name));else try{s=r(e.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var u=Ut(s,e.form);return!u||u===e},qt=function(e){return tt(e)&&e.type==="radio"},Wt=function(e){return qt(e)&&!Ht(e)},zt=function(e){var t,r=e&&ce(e),s=(t=r)===null||t===void 0?void 0:t.host,u=!1;if(r&&r!==e){var o,h,b;for(u=!!((o=s)!==null&&o!==void 0&&(h=o.ownerDocument)!==null&&h!==void 0&&h.contains(s)||e!=null&&(b=e.ownerDocument)!==null&&b!==void 0&&b.contains(e));!u&&s;){var m,N,S;r=ce(s),s=(m=r)===null||m===void 0?void 0:m.host,u=!!((N=s)!==null&&N!==void 0&&(S=N.ownerDocument)!==null&&S!==void 0&&S.contains(s))}}return u},Pe=function(e){var t=e.getBoundingClientRect(),r=t.width,s=t.height;return r===0&&s===0},Yt=function(e,t){var r=t.displayCheck,s=t.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var u=$.call(e,"details>summary:first-of-type"),o=u?e.parentElement:e;if($.call(o,"details:not([open]) *"))return!0;if(!r||r==="full"||r==="legacy-full"){if(typeof s=="function"){for(var h=e;e;){var b=e.parentElement,m=ce(e);if(b&&!b.shadowRoot&&s(b)===!0)return Pe(e);e.assignedSlot?e=e.assignedSlot:!b&&m!==e.ownerDocument?e=m.host:e=b}e=h}if(zt(e))return!e.getClientRects().length;if(r!=="legacy-full")return!0}else if(r==="non-zero-area")return Pe(e);return!1},Gt=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName==="FIELDSET"&&t.disabled){for(var r=0;r<t.children.length;r++){var s=t.children.item(r);if(s.tagName==="LEGEND")return $.call(t,"fieldset[disabled] *")?!0:!s.contains(e)}return!0}t=t.parentElement}return!1},de=function(e,t){return!(t.disabled||ue(t)||Vt(t)||Yt(t,e)||$t(t)||Gt(t))},_e=function(e,t){return!(Wt(t)||V(t)<0||!de(e,t))},Xt=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},Jt=function n(e){var t=[],r=[];return e.forEach(function(s,u){var o=!!s.scopeParent,h=o?s.scopeParent:s,b=Zt(h,o),m=o?n(s.candidates):h;b===0?o?t.push.apply(t,m):t.push(h):r.push({documentOrder:u,tabIndex:b,item:s,isScope:o,content:m})}),r.sort(jt).reduce(function(s,u){return u.isScope?s.push.apply(s,u.content):s.push(u.content),s},[]).concat(t)},Qt=function(e,t){t=t||{};var r;return t.getShadowRoot?r=Qe([e],t.includeContainer,{filter:_e.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:Xt}):r=Je(e,t.includeContainer,_e.bind(null,t)),Jt(r)},ea=function(e,t){t=t||{};var r;return t.getShadowRoot?r=Qe([e],t.includeContainer,{filter:de.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):r=Je(e,t.includeContainer,de.bind(null,t)),r},q=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return $.call(e,le)===!1?!1:_e(t,e)},ta=Ge.concat("iframe").join(","),ge=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return $.call(e,ta)===!1?!1:de(t,e)};/*!
* focus-trap 7.5.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/function Ae(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable})),t.push.apply(t,r)}return t}function Le(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ae(Object(t),!0).forEach(function(r){aa(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Ae(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function aa(n,e,t){return e=na(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function ra(n,e){if(typeof n!="object"||n===null)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function na(n){var e=ra(n,"string");return typeof e=="symbol"?e:String(e)}var Be={activateTrap:function(e,t){if(e.length>0){var r=e[e.length-1];r!==t&&r.pause()}var s=e.indexOf(t);s===-1||e.splice(s,1),e.push(t)},deactivateTrap:function(e,t){var r=e.indexOf(t);r!==-1&&e.splice(r,1),e.length>0&&e[e.length-1].unpause()}},ia=function(e){return e.tagName&&e.tagName.toLowerCase()==="input"&&typeof e.select=="function"},oa=function(e){return(e==null?void 0:e.key)==="Escape"||(e==null?void 0:e.key)==="Esc"||(e==null?void 0:e.keyCode)===27},G=function(e){return(e==null?void 0:e.key)==="Tab"||(e==null?void 0:e.keyCode)===9},sa=function(e){return G(e)&&!e.shiftKey},la=function(e){return G(e)&&e.shiftKey},Ke=function(e){return setTimeout(e,0)},Ze=function(e,t){var r=-1;return e.every(function(s,u){return t(s)?(r=u,!1):!0}),r},z=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),s=1;s<t;s++)r[s-1]=arguments[s];return typeof e=="function"?e.apply(void 0,r):e},oe=function(e){return e.target.shadowRoot&&typeof e.composedPath=="function"?e.composedPath()[0]:e.target},ca=[],je=function(e,t){var r=(t==null?void 0:t.document)||document,s=(t==null?void 0:t.trapStack)||ca,u=Le({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0,isKeyForward:sa,isKeyBackward:la},t),o={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0,recentNavEvent:void 0},h,b=function(l,c,d){return l&&l[c]!==void 0?l[c]:u[d||c]},m=function(l,c){var d=typeof(c==null?void 0:c.composedPath)=="function"?c.composedPath():void 0;return o.containerGroups.findIndex(function(i){var a=i.container,f=i.tabbableNodes;return a.contains(l)||(d==null?void 0:d.includes(a))||f.find(function(v){return v===l})})},N=function(l){var c=u[l];if(typeof c=="function"){for(var d=arguments.length,i=new Array(d>1?d-1:0),a=1;a<d;a++)i[a-1]=arguments[a];c=c.apply(void 0,i)}if(c===!0&&(c=void 0),!c){if(c===void 0||c===!1)return c;throw new Error("`".concat(l,"` was specified but was not a node, or did not return a node"))}var f=c;if(typeof c=="string"&&(f=r.querySelector(c),!f))throw new Error("`".concat(l,"` as selector refers to no known node"));return f},S=function(){var l=N("initialFocus");if(l===!1)return!1;if(l===void 0||!ge(l,u.tabbableOptions))if(m(r.activeElement)>=0)l=r.activeElement;else{var c=o.tabbableGroups[0],d=c&&c.firstTabbableNode;l=d||N("fallbackFocus")}if(!l)throw new Error("Your focus-trap needs to have at least one focusable element");return l},I=function(){if(o.containerGroups=o.containers.map(function(l){var c=Qt(l,u.tabbableOptions),d=ea(l,u.tabbableOptions),i=c.length>0?c[0]:void 0,a=c.length>0?c[c.length-1]:void 0,f=d.find(function(p){return q(p)}),v=d.slice().reverse().find(function(p){return q(p)}),g=!!c.find(function(p){return V(p)>0});return{container:l,tabbableNodes:c,focusableNodes:d,posTabIndexesFound:g,firstTabbableNode:i,lastTabbableNode:a,firstDomTabbableNode:f,lastDomTabbableNode:v,nextTabbableNode:function(y){var w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,_=c.indexOf(y);return _<0?w?d.slice(d.indexOf(y)+1).find(function(x){return q(x)}):d.slice(0,d.indexOf(y)).reverse().find(function(x){return q(x)}):c[_+(w?1:-1)]}}}),o.tabbableGroups=o.containerGroups.filter(function(l){return l.tabbableNodes.length>0}),o.tabbableGroups.length<=0&&!N("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");if(o.containerGroups.find(function(l){return l.posTabIndexesFound})&&o.containerGroups.length>1)throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")},T=function k(l){if(l!==!1&&l!==r.activeElement){if(!l||!l.focus){k(S());return}l.focus({preventScroll:!!u.preventScroll}),o.mostRecentlyFocusedNode=l,ia(l)&&l.select()}},U=function(l){var c=N("setReturnFocus",l);return c||(c===!1?!1:l)},J=function(l){var c=l.target,d=l.event,i=l.isBackward,a=i===void 0?!1:i;c=c||oe(d),I();var f=null;if(o.tabbableGroups.length>0){var v=m(c,d),g=v>=0?o.containerGroups[v]:void 0;if(v<0)a?f=o.tabbableGroups[o.tabbableGroups.length-1].lastTabbableNode:f=o.tabbableGroups[0].firstTabbableNode;else if(a){var p=Ze(o.tabbableGroups,function(O){var R=O.firstTabbableNode;return c===R});if(p<0&&(g.container===c||ge(c,u.tabbableOptions)&&!q(c,u.tabbableOptions)&&!g.nextTabbableNode(c,!1))&&(p=v),p>=0){var y=p===0?o.tabbableGroups.length-1:p-1,w=o.tabbableGroups[y];f=V(c)>=0?w.lastTabbableNode:w.lastDomTabbableNode}else G(d)||(f=g.nextTabbableNode(c,!1))}else{var _=Ze(o.tabbableGroups,function(O){var R=O.lastTabbableNode;return c===R});if(_<0&&(g.container===c||ge(c,u.tabbableOptions)&&!q(c,u.tabbableOptions)&&!g.nextTabbableNode(c))&&(_=v),_>=0){var x=_===o.tabbableGroups.length-1?0:_+1,F=o.tabbableGroups[x];f=V(c)>=0?F.firstTabbableNode:F.firstDomTabbableNode}else G(d)||(f=g.nextTabbableNode(c))}}else f=N("fallbackFocus");return f},L=function(l){var c=oe(l);if(!(m(c,l)>=0)){if(z(u.clickOutsideDeactivates,l)){h.deactivate({returnFocus:u.returnFocusOnDeactivate});return}z(u.allowOutsideClick,l)||l.preventDefault()}},Q=function(l){var c=oe(l),d=m(c,l)>=0;if(d||c instanceof Document)d&&(o.mostRecentlyFocusedNode=c);else{l.stopImmediatePropagation();var i,a=!0;if(o.mostRecentlyFocusedNode)if(V(o.mostRecentlyFocusedNode)>0){var f=m(o.mostRecentlyFocusedNode),v=o.containerGroups[f].tabbableNodes;if(v.length>0){var g=v.findIndex(function(p){return p===o.mostRecentlyFocusedNode});g>=0&&(u.isKeyForward(o.recentNavEvent)?g+1<v.length&&(i=v[g+1],a=!1):g-1>=0&&(i=v[g-1],a=!1))}}else o.containerGroups.some(function(p){return p.tabbableNodes.some(function(y){return V(y)>0})})||(a=!1);else a=!1;a&&(i=J({target:o.mostRecentlyFocusedNode,isBackward:u.isKeyBackward(o.recentNavEvent)})),T(i||o.mostRecentlyFocusedNode||S())}o.recentNavEvent=void 0},ve=function(l){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;o.recentNavEvent=l;var d=J({event:l,isBackward:c});d&&(G(l)&&l.preventDefault(),T(d))},ee=function(l){if(oa(l)&&z(u.escapeDeactivates,l)!==!1){l.preventDefault(),h.deactivate();return}(u.isKeyForward(l)||u.isKeyBackward(l))&&ve(l,u.isKeyBackward(l))},te=function(l){var c=oe(l);m(c,l)>=0||z(u.clickOutsideDeactivates,l)||z(u.allowOutsideClick,l)||(l.preventDefault(),l.stopImmediatePropagation())},ae=function(){if(o.active)return Be.activateTrap(s,h),o.delayInitialFocusTimer=u.delayInitialFocus?Ke(function(){T(S())}):T(S()),r.addEventListener("focusin",Q,!0),r.addEventListener("mousedown",L,{capture:!0,passive:!1}),r.addEventListener("touchstart",L,{capture:!0,passive:!1}),r.addEventListener("click",te,{capture:!0,passive:!1}),r.addEventListener("keydown",ee,{capture:!0,passive:!1}),h},re=function(){if(o.active)return r.removeEventListener("focusin",Q,!0),r.removeEventListener("mousedown",L,!0),r.removeEventListener("touchstart",L,!0),r.removeEventListener("click",te,!0),r.removeEventListener("keydown",ee,!0),h},he=function(l){var c=l.some(function(d){var i=Array.from(d.removedNodes);return i.some(function(a){return a===o.mostRecentlyFocusedNode})});c&&T(S())},W=typeof window<"u"&&"MutationObserver"in window?new MutationObserver(he):void 0,Z=function(){W&&(W.disconnect(),o.active&&!o.paused&&o.containers.map(function(l){W.observe(l,{subtree:!0,childList:!0})}))};return h={get active(){return o.active},get paused(){return o.paused},activate:function(l){if(o.active)return this;var c=b(l,"onActivate"),d=b(l,"onPostActivate"),i=b(l,"checkCanFocusTrap");i||I(),o.active=!0,o.paused=!1,o.nodeFocusedBeforeActivation=r.activeElement,c==null||c();var a=function(){i&&I(),ae(),Z(),d==null||d()};return i?(i(o.containers.concat()).then(a,a),this):(a(),this)},deactivate:function(l){if(!o.active)return this;var c=Le({onDeactivate:u.onDeactivate,onPostDeactivate:u.onPostDeactivate,checkCanReturnFocus:u.checkCanReturnFocus},l);clearTimeout(o.delayInitialFocusTimer),o.delayInitialFocusTimer=void 0,re(),o.active=!1,o.paused=!1,Z(),Be.deactivateTrap(s,h);var d=b(c,"onDeactivate"),i=b(c,"onPostDeactivate"),a=b(c,"checkCanReturnFocus"),f=b(c,"returnFocus","returnFocusOnDeactivate");d==null||d();var v=function(){Ke(function(){f&&T(U(o.nodeFocusedBeforeActivation)),i==null||i()})};return f&&a?(a(U(o.nodeFocusedBeforeActivation)).then(v,v),this):(v(),this)},pause:function(l){if(o.paused||!o.active)return this;var c=b(l,"onPause"),d=b(l,"onPostPause");return o.paused=!0,c==null||c(),re(),Z(),d==null||d(),this},unpause:function(l){if(!o.paused||!o.active)return this;var c=b(l,"onUnpause"),d=b(l,"onPostUnpause");return o.paused=!1,c==null||c(),I(),ae(),Z(),d==null||d(),this},updateContainerElements:function(l){var c=[].concat(l).filter(Boolean);return o.containers=c.map(function(d){return typeof d=="string"?r.querySelector(d):d}),o.active&&I(),Z(),this}},h.updateContainerElements(e),h};function ua(n,e={}){const t=Ne(null);$e(()=>{n.value&&(t.value=je(n.value,e))}),Fe(n,()=>{n.value&&(t.value=je(n.value,e))});function r(){t.value&&t.value.activate()}function s(){t.value&&t.value.deactivate()}return wt(()=>{s()}),{activate:r,deactivate:s}}const ke=n=>(Ue("data-v-76ca2045"),n=n(),He(),n),da=ke(()=>M("rect",{width:"64",height:"64",fill:"currentColor",rx:"6.4"},null,-1)),fa=ke(()=>M("path",{fill:"#fff",d:"M11.406 20.036H8.64l1.578-11.143H6.4L6.731 6.4h10.403l-.351 2.493h-3.818l-1.559 11.143ZM57.6 6.77l-1.948 14.006-7.539-8.59-1.169 8.22h-2.649L46.243 6.4l7.539 8.61 1.169-8.24H57.6Zm-9.058 37.194H53.1c2.61 0 4.5 1.656 4.5 4.15 0 2.785-2.084 5.006-4.968 5.006h-2.61L49.4 57.6h-2.766l1.909-13.636Zm1.83 6.662h2.241c1.734 0 2.22-1.48 2.22-2.318 0-1.072-.72-1.85-2.084-1.85h-1.792l-.584 4.168Z"},null,-1)),va=[da,fa],ha=ke(()=>M("path",{fill:"currentColor",d:"M82.405 45.5h-4.61l2.63-18.571H74.06l.552-4.156H91.95l-.585 4.156h-6.363L82.405 45.5Zm14.832.325c-4.675 0-7.532-3.474-7.532-7.987 0-4.448 3.117-9.059 8.701-9.059 2.273 0 4.188.91 5.52 2.37l.292-2.207h4.318L106.231 45.5h-4.318l.227-1.558c-1.364 1.298-3.084 1.883-4.903 1.883Zm.91-3.734c2.727 0 4.902-2.403 4.902-5.195 0-2.467-1.688-4.383-4.188-4.383-2.792 0-4.87 2.403-4.87 5.26 0 2.435 1.688 4.318 4.156 4.318Zm25.252-13.15h6.071l-9.512 8.28 6.948 8.279h-5.65l-5.941-7.435-1.039 7.435h-4.286l3.636-25.974h4.286l-2.273 16.266 7.76-6.85Zm25.736-3.643-2.886 20.75-11.169-12.727-1.731 12.179h-3.925l2.886-20.75 11.169 12.756 1.731-12.208h3.925Zm16.13 12.208c0 .577-.116 1.356-.26 1.847h-11.111c.288 1.847 1.76 3.001 3.578 3.001 1.357 0 2.482-.606 3.002-1.53h4.156c-1.443 3.175-4.127 4.965-7.388 4.965-4.099 0-7.129-3.117-7.129-7.129 0-2.972 2.309-8.023 8.081-8.023 4.098 0 7.071 3.117 7.071 6.869Zm-11.111-.635h7.359c-.231-1.645-1.703-2.8-3.521-2.8-1.934 0-3.261 1.27-3.838 2.8Zm15.184-9.048h5.909c3.384 0 5.833 2.147 5.833 5.38 0 3.61-2.702 6.489-6.439 6.489h-3.384l-.808 5.808h-3.586l2.475-17.677Zm2.374 8.637h2.904c2.247 0 2.878-1.92 2.878-3.005 0-1.39-.934-2.4-2.702-2.4h-2.323l-.757 5.405Zm15.693 9.292c-3.586 0-6.162-2.727-6.162-6.363 0-2.702 1.995-6.894 6.97-6.894 3.56 0 6.161 2.753 6.161 6.364 0 2.727-1.995 6.893-6.969 6.893Zm.151-3.232c1.995 0 3.485-1.54 3.485-3.661 0-1.743-1.263-3.132-3.005-3.132-1.995 0-3.46 1.54-3.46 3.662 0 1.742 1.212 3.131 2.98 3.131ZM199.6 30.904c-1.01 0-1.793-.808-1.793-1.843 0-1.111 1.01-2.046 2.096-2.046.985 0 1.793.834 1.793 1.819 0 1.161-1.036 2.07-2.096 2.07Zm-.505 14.596h-3.333l1.818-12.879h3.333L199.095 45.5Zm9.041.252c-3.636 0-5.858-2.702-5.858-6.212 0-3.46 2.424-7.045 6.767-7.045 1.768 0 3.258.707 4.293 1.844l1.238-9.04h3.383L215.131 45.5h-3.358l.176-1.212c-1.06 1.01-2.399 1.465-3.813 1.465Zm.707-2.904c2.122 0 3.813-1.868 3.813-4.04 0-1.919-1.313-3.409-3.257-3.409-2.172 0-3.788 1.869-3.788 4.091 0 1.894 1.313 3.358 3.232 3.358Zm22.697-4.343a6.58 6.58 0 0 1-.227 1.616h-9.723c.253 1.616 1.541 2.627 3.132 2.627 1.187 0 2.171-.53 2.626-1.339h3.636c-1.262 2.778-3.611 4.343-6.464 4.343-3.586 0-6.238-2.727-6.238-6.237 0-2.6 2.021-7.02 7.071-7.02 3.586 0 6.187 2.727 6.187 6.01Zm-9.722-.555h6.439c-.202-1.44-1.49-2.45-3.081-2.45-1.692 0-2.853 1.111-3.358 2.45Zm15.881 7.55h-3.359l1.389-9.747h-2.525l.429-3.132h2.525l.581-4.166h3.359l-.581 4.166h2.777l-.454 3.132h-2.778l-1.363 9.747Zm-71.543 2.525h75.633v.758h-75.633v-.758Z"},null,-1)),ba=K({__name:"BaseLogo",setup(n){const{component:e,base:t}=fe("logo");return(r,s)=>(A(),B("svg",{class:D([C(t)()]),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 243 64"},[M("g",{class:D([C(e)("sign")])},va,2),ha],2))}});const ma=X(ba,[["__scopeId","data-v-76ca2045"]]),pa=K({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(n,{slots:e,attrs:t}){const r=Ne(!1);return $e(()=>{r.value=!0}),s=>{var b;if(r.value)return(b=e.default)==null?void 0:b.call(e);const u=e.fallback||e.placeholder;if(u)return u();const o=s.fallback||s.placeholder||"",h=s.fallbackTag||s.placeholderTag||"span";return B(h,t,o)}}}),ga=()=>qe("color-mode").value,ya=["value","aria-pressed","onClick"],wa=K({__name:"ThemeSwitcher",setup(n){const e=ga();function t(h){e.preference=h}const r=ye(()=>[{value:"light",title:"Люмос"},{value:"system",title:"Авто"},{value:"dark",title:"Нокс"}]),s=ye(()=>e.preference),{component:u,base:o}=fe("theme-switcher");return Fe(()=>e.value,()=>{document.documentElement.classList.add("theme-change-animation"),setTimeout(()=>{document.documentElement.classList.remove("theme-change-animation")},200)}),(h,b)=>{const m=pa;return A(),We(m,null,{default:se(()=>[M("section",Tt({class:[C(o)()]},h.$attrs),[(A(!0),B(Se,null,ze(C(r),({value:N,title:S})=>(A(),B("button",{key:N,type:"button",value:N,"aria-pressed":C(s)===N,onClick:I=>t(N)},Ye(S),9,ya))),128)),M("div",{class:D([C(u)("indicator")])},null,2)],16)]),_:1})}}});const Ta=X(wa,[["__scopeId","data-v-a1c55a9d"]]),_a=K({__name:"BaseHeader",setup(n){const e=fe("header"),[t,r]=Ct(!1),s=_t(t),u=Nt("$el"),{deactivate:o,activate:h}=ua(u,{escapeDeactivates(){return r(!1),!1},clickOutsideDeactivates(){return r(!1),!1}});return Fe(t,b=>{b?h():o()}),(b,m)=>{const N=Mt;return A(),B("header",{id:"header",ref_key:"$el",ref:u,class:D([C(e).base(),C(e).is("open",C(t))])},[M("div",{class:D([C(e).component("container")])},[M("div",{class:D([C(e).component("controller")])},[M("button",{type:"button",class:D([C(e).component("bar")]),onClick:m[0]||(m[0]=Ft(S=>C(s)(),["stop"]))},[P(It,{name:"bar",style:{width:"44px"}}),P(De,null,{default:se(()=>[we("Меню")]),_:1})],2),P(N,{href:"/",class:D([C(e).component("logo")])},{default:se(()=>[P(ma),P(De,null,{default:se(()=>[we("TakNePoidet")]),_:1})]),_:1},8,["class"])],2),M("div",{class:D([C(e).component("content")])},[P(Ta,{class:D([C(e).component("theme")])},null,8,["class"])],2)],2)],2)}}});const Na=X(_a,[["__scopeId","data-v-a2d620a5"]]);var Ee={};(function n(e,t,r,s){var u=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL);function o(){}function h(i){var a=t.exports.Promise,f=a!==void 0?a:e.Promise;return typeof f=="function"?new f(i):(i(o,o),null)}var b=function(){var i=Math.floor(16.666666666666668),a,f,v={},g=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(a=function(p){var y=Math.random();return v[y]=requestAnimationFrame(function w(_){g===_||g+i-1<_?(g=_,delete v[y],p()):v[y]=requestAnimationFrame(w)}),y},f=function(p){v[p]&&cancelAnimationFrame(v[p])}):(a=function(p){return setTimeout(p,i)},f=function(p){return clearTimeout(p)}),{frame:a,cancel:f}}(),m=function(){var i,a,f={};function v(g){function p(y,w){g.postMessage({options:y||{},callback:w})}g.init=function(w){var _=w.transferControlToOffscreen();g.postMessage({canvas:_},[_])},g.fire=function(w,_,x){if(a)return p(w,null),a;var F=Math.random().toString(36).slice(2);return a=h(function(O){function R(E){E.data.callback===F&&(delete f[F],g.removeEventListener("message",R),a=null,x(),O())}g.addEventListener("message",R),p(w,F),f[F]=R.bind(null,{data:{callback:F}})}),a},g.reset=function(){g.postMessage({reset:!0});for(var w in f)f[w](),delete f[w]}}return function(){if(i)return i;if(!r&&u){var g=["var CONFETTI, SIZE = {}, module = {};","("+n.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{i=new Worker(URL.createObjectURL(new Blob([g])))}catch(p){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",p),null}v(i)}return i}}(),N={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function S(i,a){return a?a(i):i}function I(i){return i!=null}function T(i,a,f){return S(i&&I(i[a])?i[a]:N[a],f)}function U(i){return i<0?0:Math.floor(i)}function J(i,a){return Math.floor(Math.random()*(a-i))+i}function L(i){return parseInt(i,16)}function Q(i){return i.map(ve)}function ve(i){var a=String(i).replace(/[^0-9a-f]/gi,"");return a.length<6&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),{r:L(a.substring(0,2)),g:L(a.substring(2,4)),b:L(a.substring(4,6))}}function ee(i){var a=T(i,"origin",Object);return a.x=T(a,"x",Number),a.y=T(a,"y",Number),a}function te(i){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight}function ae(i){var a=i.getBoundingClientRect();i.width=a.width,i.height=a.height}function re(i){var a=document.createElement("canvas");return a.style.position="fixed",a.style.top="0px",a.style.left="0px",a.style.pointerEvents="none",a.style.zIndex=i,a}function he(i,a,f,v,g,p,y,w,_){i.save(),i.translate(a,f),i.rotate(p),i.scale(v,g),i.arc(0,0,1,y,w,_),i.restore()}function W(i){var a=i.angle*(Math.PI/180),f=i.spread*(Math.PI/180);return{x:i.x,y:i.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:i.startVelocity*.5+Math.random()*i.startVelocity,angle2D:-a+(.5*f-Math.random()*f),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:i.color,shape:i.shape,tick:0,totalTicks:i.ticks,decay:i.decay,drift:i.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:i.gravity*3,ovalScalar:.6,scalar:i.scalar}}function Z(i,a){a.x+=Math.cos(a.angle2D)*a.velocity+a.drift,a.y+=Math.sin(a.angle2D)*a.velocity+a.gravity,a.wobble+=a.wobbleSpeed,a.velocity*=a.decay,a.tiltAngle+=.1,a.tiltSin=Math.sin(a.tiltAngle),a.tiltCos=Math.cos(a.tiltAngle),a.random=Math.random()+2,a.wobbleX=a.x+10*a.scalar*Math.cos(a.wobble),a.wobbleY=a.y+10*a.scalar*Math.sin(a.wobble);var f=a.tick++/a.totalTicks,v=a.x+a.random*a.tiltCos,g=a.y+a.random*a.tiltSin,p=a.wobbleX+a.random*a.tiltCos,y=a.wobbleY+a.random*a.tiltSin;if(i.fillStyle="rgba("+a.color.r+", "+a.color.g+", "+a.color.b+", "+(1-f)+")",i.beginPath(),a.shape==="circle")i.ellipse?i.ellipse(a.x,a.y,Math.abs(p-v)*a.ovalScalar,Math.abs(y-g)*a.ovalScalar,Math.PI/10*a.wobble,0,2*Math.PI):he(i,a.x,a.y,Math.abs(p-v)*a.ovalScalar,Math.abs(y-g)*a.ovalScalar,Math.PI/10*a.wobble,0,2*Math.PI);else if(a.shape==="star")for(var w=Math.PI/2*3,_=4*a.scalar,x=8*a.scalar,F=a.x,O=a.y,R=5,E=Math.PI/R;R--;)F=a.x+Math.cos(w)*x,O=a.y+Math.sin(w)*x,i.lineTo(F,O),w+=E,F=a.x+Math.cos(w)*_,O=a.y+Math.sin(w)*_,i.lineTo(F,O),w+=E;else i.moveTo(Math.floor(a.x),Math.floor(a.y)),i.lineTo(Math.floor(a.wobbleX),Math.floor(g)),i.lineTo(Math.floor(p),Math.floor(y)),i.lineTo(Math.floor(v),Math.floor(a.wobbleY));return i.closePath(),i.fill(),a.tick<a.totalTicks}function k(i,a,f,v,g){var p=a.slice(),y=i.getContext("2d"),w,_,x=h(function(F){function O(){w=_=null,y.clearRect(0,0,v.width,v.height),g(),F()}function R(){r&&!(v.width===s.width&&v.height===s.height)&&(v.width=i.width=s.width,v.height=i.height=s.height),!v.width&&!v.height&&(f(i),v.width=i.width,v.height=i.height),y.clearRect(0,0,v.width,v.height),p=p.filter(function(E){return Z(y,E)}),p.length?w=b.frame(R):O()}w=b.frame(R),_=O});return{addFettis:function(F){return p=p.concat(F),x},canvas:i,promise:x,reset:function(){w&&b.cancel(w),_&&_()}}}function l(i,a){var f=!i,v=!!T(a||{},"resize"),g=T(a,"disableForReducedMotion",Boolean),p=u&&!!T(a||{},"useWorker"),y=p?m():null,w=f?te:ae,_=i&&y?!!i.__confetti_initialized:!1,x=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,F;function O(E,be,me){for(var H=T(E,"particleCount",U),ne=T(E,"angle",Number),ie=T(E,"spread",Number),j=T(E,"startVelocity",Number),at=T(E,"decay",Number),rt=T(E,"gravity",Number),nt=T(E,"drift",Number),Ce=T(E,"colors",Q),it=T(E,"ticks",Number),Ie=T(E,"shapes"),ot=T(E,"scalar"),Re=ee(E),Me=H,pe=[],st=i.width*Re.x,lt=i.height*Re.y;Me--;)pe.push(W({x:st,y:lt,angle:ne,spread:ie,startVelocity:j,color:Ce[Me%Ce.length],shape:Ie[J(0,Ie.length)],ticks:it,decay:at,gravity:rt,drift:nt,scalar:ot}));return F?F.addFettis(pe):(F=k(i,pe,w,be,me),F.promise)}function R(E){var be=g||T(E,"disableForReducedMotion",Boolean),me=T(E,"zIndex",Number);if(be&&x)return h(function(j){j()});f&&F?i=F.canvas:f&&!i&&(i=re(me),document.body.appendChild(i)),v&&!_&&w(i);var H={width:i.width,height:i.height};y&&!_&&y.init(i),_=!0,y&&(i.__confetti_initialized=!0);function ne(){if(y){var j={getBoundingClientRect:function(){if(!f)return i.getBoundingClientRect()}};w(j),y.postMessage({resize:{width:j.width,height:j.height}});return}H.width=H.height=null}function ie(){F=null,v&&e.removeEventListener("resize",ne),f&&i&&(document.body.removeChild(i),i=null,_=!1)}return v&&e.addEventListener("resize",ne,!1),y?y.fire(E,H,ie):O(E,H,ie)}return R.reset=function(){y&&y.reset(),F&&F.reset()},R}var c;function d(){return c||(c=l(null,{useWorker:!0,resize:!0})),c}t.exports=function(){return d().apply(this,arguments)},t.exports.reset=function(){d().reset()},t.exports.create=l})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),Ee,!1);const Fa=Ee.exports;Ee.exports.create;function Sa(n,e){let t,r;return function(){const s=arguments,u=this;return t||(t=!0,setTimeout(()=>t=!1,e),r=n.apply(u,s)),r}}const ka=n=>(Ue("data-v-9176d6d2"),n=n(),He(),n),Ea=ka(()=>M("span",null,[we("Якин "),M("u",null,"Никита")],-1)),Ca=200,Ia=K({__name:"BaseFooter",setup(n){const{base:e,component:t}=fe("footer"),r={origin:{y:1,x:.5}};function s(m,N){Fa({...r,...N,particleCount:Math.floor(Ca*m)})}const u=ye(()=>["memoji-like.png","memoji-bellissimo.png","memoji-call-me.png"]),o=qe(()=>0,"$56LA1i0aae");function h(){o.value+=1,o.value>u.value.length-1&&(o.value=0)}const b=Sa(()=>{h(),s(.25,{spread:26,startVelocity:55}),s(.2,{spread:60}),s(.35,{spread:100,decay:.91,scalar:.8}),s(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),s(.1,{spread:120,startVelocity:45})},1e3);return(m,N)=>(A(),B("footer",{class:D([C(e)()])},[M("div",{class:D([C(t)("content")])},[Ea,M("button",{type:"button",onClick:N[0]||(N[0]=(...S)=>C(b)&&C(b)(...S))},[(A(!0),B(Se,null,ze(C(u),(S,I)=>St((A(),We(Rt,{key:I,alt:"Мемодзи",src:`/images/${S}`,width:256,height:256},null,8,["src"])),[[kt,C(o)===I]])),128))]),M("span",null,Ye(new Date().getFullYear()),1)],2)],2))}});const Ra=X(Ia,[["__scopeId","data-v-9176d6d2"]]),Ma=K({__name:"default",setup(n){return(e,t)=>{const r=Pt;return A(),B(Se,null,[P(Na),M("main",null,[P(r)]),P(Ra)],64)}}});const La=X(Ma,[["__scopeId","data-v-18eafaec"]]);export{La as default};