import{D as M,U,G as q,V as N,W,X as C,Y as E,Z as G,$ as V,a0 as H,a as J,a1 as X,e as O,b as $,O as Y,E as Z,o as b,i as I,F as Q,q as K,u as m,k as ee,c as P,j as A,l as D,y as te,L as ie,a2 as se}from"./entry.7e31a0f8.js";function j(t){return t!==null&&typeof t=="object"}function L(t,e,i=".",s){if(!j(e))return L(t,{},i,s);const r=Object.assign({},e);for(const n in t){if(n==="__proto__"||n==="constructor")continue;const o=t[n];o!=null&&(s&&s(r,n,o,i)||(Array.isArray(o)&&Array.isArray(r[n])?r[n]=[...o,...r[n]]:j(o)&&j(r[n])?r[n]=L(o,r[n],(i?`${i}.`:"")+n.toString(),s):r[n]=o))}return r}function ne(t){return(...e)=>e.reduce((i,s)=>L(i,s,"",t),{})}const T=ne();function re(t){function e(){return`${t}`}function i(o){return`${e()}-${o}`}function s(o){return`${e()}__${o}`}function r(o){return`${e()}--${o}`}function n(o,c){return c?`${e()}--is-${o}`:""}return{base:e,component:s,modifier:r,is:n,block:i}}function oe(t,e={}){const i=M(!1),{stop:s,isSupported:r}=U(t,([{isIntersecting:n}])=>{e.once===!0?n&&(i.value=n):i.value=n});return r||(i.value=!0),q(i,()=>{i.value===!0&&e.once&&s()}),N(i)}function ae(t){const e=M(t);function i(s){e.value=s}return[e,i]}async function ce(t,e){return await ue(e).catch(s=>(console.error("Failed to get image meta for "+e,s+""),{width:0,height:0,ratio:0}))}async function ue(t){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((e,i)=>{const s=new Image;s.onload=()=>{const r={width:s.width,height:s.height,ratio:s.width/s.height};e(r)},s.onerror=r=>i(r),s.src=t})}function k(t){return e=>e?t[e]||e:t.missingValue}function fe({formatter:t,keyMap:e,joinWith:i="/",valueMap:s}={}){t||(t=(n,o)=>`${n}=${o}`),e&&typeof e!="function"&&(e=k(e));const r=s||{};return Object.keys(r).forEach(n=>{typeof r[n]!="function"&&(r[n]=k(r[n]))}),(n={})=>Object.entries(n).filter(([c,f])=>typeof f<"u").map(([c,f])=>{const g=r[c];return typeof g=="function"&&(f=g(n[c])),c=typeof e=="function"?e(c):c,t(c,f)}).join(i)}function x(t=""){if(typeof t=="number")return t;if(typeof t=="string"&&t.replace("px","").match(/^\d+$/g))return parseInt(t,10)}function F(t=""){if(t===void 0||!t.length)return[];const e=t.split(" ").map(i=>parseInt(i.replace("x","")));return e.filter((i,s)=>e.indexOf(i)===s)}function de(t){const e={options:t},i=(r,n={})=>R(e,r,n),s=(r,n={},o={})=>i(r,{...o,modifiers:T(n,o.modifiers||{})}).url;for(const r in t.presets)s[r]=(n,o,c)=>s(n,o,{...t.presets[r],...c});return s.options=t,s.getImage=i,s.getMeta=(r,n)=>le(e,r,n),s.getSizes=(r,n)=>me(e,r,n),s.getDensitySet=(r,n)=>pe(e,r,n),e.$img=s,s}async function le(t,e,i){const s=R(t,e,{...i});return typeof s.getMeta=="function"?await s.getMeta():await ce(t,s.url)}function R(t,e,i){var g,p;if(typeof e!="string"||e==="")throw new TypeError(`input must be a string (received ${typeof e}: ${JSON.stringify(e)})`);if(e.startsWith("data:"))return{url:e};const{provider:s,defaults:r}=he(t,i.provider||t.options.provider),n=ge(t,i.preset);if(e=W(e)?e:C(e),!s.supportsAlias)for(const l in t.options.alias)e.startsWith(l)&&(e=E(t.options.alias[l],e.substr(l.length)));if(s.validateDomains&&W(e)){const l=G(e).host;if(!t.options.domains.find(y=>y===l))return{url:e}}const o=T(i,n,r);o.modifiers={...o.modifiers};const c=o.modifiers.format;(g=o.modifiers)!=null&&g.width&&(o.modifiers.width=x(o.modifiers.width)),(p=o.modifiers)!=null&&p.height&&(o.modifiers.height=x(o.modifiers.height));const f=s.getImage(e,o,t);return f.format=f.format||c||"",f}function he(t,e){const i=t.options.providers[e];if(!i)throw new Error("Unknown provider: "+e);return i}function ge(t,e){if(!e)return{};if(!t.options.presets[e])throw new Error("Unknown preset: "+e);return t.options.presets[e]}function me(t,e,i){var _,z;const s=x((_=i.modifiers)==null?void 0:_.width),r=x((z=i.modifiers)==null?void 0:z.height),n=i.densities?F(i.densities):t.options.densities,o=s&&r?r/s:0,c=[],f=[],g={};if(typeof i.sizes=="string")for(const a of i.sizes.split(/[\s,]+/).filter(u=>u)){const u=a.split(":");u.length===2&&(g[u[0].trim()]=u[1].trim())}else Object.assign(g,i.sizes);for(const a in g){const u=t.options.screens&&t.options.screens[a]||parseInt(a);let d=String(g[a]);const w=d.endsWith("vw");if(!w&&/^\d+$/.test(d)&&(d=d+"px"),!w&&!d.endsWith("px"))continue;let h=parseInt(d);if(!u||!h)continue;w&&(h=Math.round(h/100*u));const v=o?Math.round(h*o):r;if(c.push({size:d,screenMaxWidth:u,media:`(max-width: ${u}px)`}),n)for(const S of n)f.push({width:h*S,src:t.$img(e,{...i.modifiers,width:h*S,height:v?v*S:void 0},i)})}c.sort((a,u)=>a.screenMaxWidth-u.screenMaxWidth),c[c.length-1]&&(c[c.length-1].media="");let p=null;for(let a=c.length-1;a>=0;a--){const u=c[a];u.media===p&&c.splice(a,1),p=u.media}f.sort((a,u)=>a.width-u.width);let l=null;for(let a=f.length-1;a>=0;a--){const u=f[a];u.width===l&&f.splice(a,1),l=u.width}const y=f[f.length-1];return{sizes:c.map(a=>`${a.media?a.media+" ":""}${a.size}`).join(", "),srcset:f.map(a=>`${a.src} ${a.width}w`).join(", "),src:y==null?void 0:y.src}}function pe(t,e,i){const s=i.densities?F(i.densities):t.options.densities;if(s.length===0)return;const r=[];for(const n of s){const o={...i.modifiers};o.width&&(o.width=o.width*n),o.height&&(o.height=o.height*n),r.push({density:`${n}x`,src:t.$img(e,o,i)})}return r.map(n=>`${n.src} ${n.density}`).join(", ")}const we=fe({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(t,e)=>V(t)+"_"+V(e)}),ye=(t,{modifiers:e={},baseURL:i}={},s)=>{e.width&&e.height&&(e.resize=`${e.width}x${e.height}`,delete e.width,delete e.height);const r=we(e)||"_";return i||(i=E(s.options.nuxt.baseURL,"/_ipx")),{url:E(i,r,H(t))}},_e=!0,ve=!0,$e=Object.freeze(Object.defineProperty({__proto__:null,getImage:ye,supportsAlias:ve,validateDomains:_e},Symbol.toStringTag,{value:"Module"})),B={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipx",domains:[],alias:{},densities:[1,2]};B.providers={ipx:{provider:$e,defaults:void 0}};const ze=()=>{const t=X(),e=J();return e.$img||e._img||(e._img=de({...B,nuxt:{baseURL:t.app.baseURL}}))};function be(){return ze()}const xe=["srcset","type","sizes"],Se=["src","width","height","alt","data-loading","loading"],je=O({__name:"ThePicture",props:{src:{type:String,required:!0},width:{type:Number,required:!0,default(){throw new Error("Не указана ширина изображения")}},height:{type:[Number,String],required:!0,default(){throw new Error("Не указана высота изображения")}},alt:{type:String,required:!0,default(){throw new Error("Не указано описание изображения")}},preload:{type:Boolean,required:!1,default:!1}},setup(t){const e=t;function i(u){return u.split(/[?#]/).shift().split("/").pop().split(".").pop()}const s=re("picture"),r=$(()=>i(e.src)),n=$(()=>r.value==="svg"?"svg":"webp");function o(){l.value&&p(!1)}const c=be(),f=Y("$element"),[g,p]=ae(!0);let l;e.preload?(l=N(M(!0)),p(!1)):l=oe(f,{once:!0});const y=$(()=>c(e.src,{quality:1,width:100,height:100,fit:"cover",format:"webp"})),_=$(()=>n.value==="svg"?[{srcset:e.src}]:[n.value].map(d=>{const{srcset:w,sizes:h,src:v}=c.getSizes(e.src,{sizes:c.options.screens,modifiers:{quality:90,format:d}});return{srcset:w,sizes:h,src:v}})),z=$(()=>{const u=_.value[1]?1:0,d=_.value[u],w=d==null?void 0:d.sizes,h=d==null?void 0:d.srcset;return{imagesizes:w,imagesrcset:h}});function a(){te(()=>{l.value&&f.value&&f.value.complete&&p(!1)})}return q(()=>e.src,()=>{p(!0)}),Z(()=>{a()}),q(l,()=>{a()}),(u,d)=>{const w=ie;return b(),I("picture",{class:D([m(s).base(),m(s).is("loading",m(g))])},[(b(!0),I(Q,null,K(m(_),(h,v)=>(b(),I("source",{key:v,srcset:h.srcset,type:h.type,sizes:m(l)?h.sizes:void 0},null,8,xe))),128)),ee("img",{ref_key:"$element",ref:f,src:m(y),width:t.width,height:t.height,alt:t.alt,"data-loading":m(g),loading:t.preload?"eager":"lazy",onLoad:o},null,40,Se),t.preload?(b(),P(w,{key:0,rel:"preload",as:"image",imagesizes:m(z).imagesizes,imagesrcset:m(z).imagesrcset},null,8,["imagesizes","imagesrcset"])):A("",!0)],2)}}});const qe=O({__name:"TheIcon",props:{icon:{type:Object,required:!0}},setup(t){const e=t,i=$(()=>{var s;return((s=e.icon)==null?void 0:s.name)??void 0});return(s,r)=>m(i)?(b(),P(se(t.icon),{key:0,class:D(["icon","icon--"+m(i)])},null,8,["class"])):A("",!0)}});export{je as _,qe as a,ae as b,T as d,re as u};
