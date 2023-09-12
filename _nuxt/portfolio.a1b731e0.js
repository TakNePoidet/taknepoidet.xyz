import{m as q,n as I,h as A,o as r,c as p,i as k,l as x,a as g,t as b,F as B,r as N,b as m,w as H,d as P,j as u,P as Y,q as D,s as E,v as L,g as $,x as M,k as R}from"./entry.e3657dab.js";import{u as T}from"./query.33323fda.js";import{u as j,a as G,_ as z,B as J}from"./portfolio.1ca46e00.js";import{u as K,B as Q,a as O}from"./BaseIcon.78d1e105.js";import{_ as U}from"./nuxt-link.52cdf1e8.js";import{_ as C}from"./_plugin-vue_export-helper.c27b6911.js";import"./preview.31545842.js";function W(t=!1){const e=q("$container"),f=q("$content"),o=q("$summary"),[c,_]=K(t),l=I(!1),i=I(!1),a=I();function h(){!e.value||!o.value||(e.value.style.height=`${e.value.offsetHeight}px`,_(!0),requestAnimationFrame(()=>w()))}function F(){var y;if(l.value=!0,!e.value||!o.value)return;const s=`${e.value.offsetHeight}px`,v=`${o.value.offsetHeight}px`;typeof a.value<"u"&&((y=a.value)==null||y.cancel()),a.value=e.value.animate({height:[s,v]},{duration:400,easing:"ease-in-out"}),a.value.onfinish=()=>{n(!1)},a.value.oncancel=()=>{l.value=!1}}function w(){var y,S;if(i.value=!0,!e.value||!o.value||!f.value)return;const s=`${e.value.offsetHeight}px`,v=`${o.value.offsetHeight+f.value.offsetHeight}px`;typeof a.value<"u"&&((y=a.value)==null||y.cancel()),a.value=(S=e.value)==null?void 0:S.animate({height:[s,v]},{duration:400,easing:"ease-in-out"}),a.value.onfinish=()=>{n(!0)},a.value.oncancel=()=>{l.value=!1}}function n(s){_(s),i.value=!1,l.value=!1,e.value&&(e.value.style.height="",e.value.style.overflow="revert")}function d(){e.value&&(e.value.style.overflow="hidden",l.value||!e.value.open?h():(i.value||e.value.open)&&F())}return{isOpen:c,toggle:d,$container:e,$content:f,$summary:o}}const X=["id"],Z={class:"portfolio__content"},ee={class:"portfolio__title"},te={key:0,class:"portfolio__tags"},ae=A({__name:"portfolio",props:{article:{type:Object,required:!0}},setup(t){return(e,f)=>{const o=U;return r(),p("article",{id:t.article.slug,class:"portfolio"},[t.article.cover?(r(),k(Q,{key:0,class:"portfolio__cover",alt:t.article.title,height:628,width:1200,src:t.article.cover},null,8,["alt","src"])):x("",!0),g("div",Z,[g("h3",ee,b(t.article.title),1),t.article.tags.length>0?(r(),p("ul",te,[(r(!0),p(B,null,N(t.article.tags.values(),c=>(r(),p("li",{key:c.key},[m(o,{to:{name:u(Y).PortfolioListingTag,params:{tag:c.key}}},{default:H(()=>[P(" #"+b(c.title),1)]),_:2},1032,["to"])]))),128))])):x("",!0)]),t.article.permalink?(r(),k(o,{key:1,class:"portfolio__link",href:t.article.permalink,target:"_blank"},{default:H(()=>[P(" Посмотреть "),m(O,{name:"link"})]),_:1},8,["href"])):x("",!0)],8,X)}}});const se=C(ae,[["__scopeId","data-v-19146b67"]]),oe={class:"portfolio-listing"},ne={key:0},re=A({__name:"listing",props:{items:{type:Array,required:!0}},setup(t){return(e,f)=>(r(),p("div",oe,[(r(!0),p(B,null,N(t.items,(o,c)=>(r(),p(B,{key:o._id},[m(se,{article:o},null,8,["article"]),c<t.items.length-1?(r(),p("hr",ne)):x("",!0)],64))),128))]))}});const V=C(re,[["__scopeId","data-v-e05d3622"]]),le=["open"],ie={ref:"$items",class:"years-group-portfolios__items"},ue=A({__name:"portfolios-years-group",props:{title:{type:[String,Number],required:!0},items:{type:Array,required:!0},open:{type:Boolean,default:!1}},setup(t){const{open:e}=t,{$container:f,$summary:o,$content:c,toggle:_,isOpen:l}=W(e);return(i,a)=>(r(),p("details",{ref_key:"$container",ref:f,class:"years-group-portfolios",open:u(l)},[g("summary",{ref_key:"$summary",ref:o,class:"years-group-portfolios__summary",onClick:a[0]||(a[0]=D((...h)=>u(_)&&u(_)(...h),["prevent","stop"]))},[P(b(t.title)+" ",1),g("span",null,[P(b(u(l)?"Свернуть":"Раскрыть")+" ",1),m(O,{name:u(l)?"arrow-badge-down":"arrow-badge-up"},null,8,["name"])])],512),g("div",{ref_key:"$content",ref:c,class:"years-group-portfolios__content"},[x("",!0),g("div",ie,[m(V,{items:t.items},null,8,["items"])],512)],512)],8,le))}});const ce=C(ue,[["__scopeId","data-v-e21907db"]]),fe={class:"section-content-portfolios"},_e=A({__name:"portfolio",async setup(t){let e,f;const o=j(),{portfolios:c,tags:_}=E(o),l=L(),i=$(()=>{if(l.params.tag)return Array.isArray(l.params.tag)?l.params.tag.at(0):l.params.tag});if(i.value&&!_.value.has(i.value))throw M({statusCode:404,statusMessage:"Page Not Found"});[e,f]=R(async()=>T("portfolio",async()=>(await o.fetch(),null))),await e,f();const a=$(()=>{if(i.value&&_.value.get(i.value)){const{aliases:n}=_.value.get(i.value);return c.value.filter(d=>d.tags.filter(({key:s})=>n.includes(s)||s===i.value).length>=1)}return c.value}),h=$(()=>a.value.reduce((n,d)=>{var v;const s=d.date.getFullYear();return n.has(s)||n.set(s,[]),(v=n.get(s))==null||v.push(d),n},new Map)),F=$(()=>{let n=0;for(const[d,s]of h.value.entries())if(n+=s.length,n>=6)return d;return new Date().getFullYear()}),w=$(()=>{var n;return i.value?`Работы с использованием ${(n=_.value.get(i.value))==null?void 0:n.title}`:"Работы, о которых хочется рассказать"});return(n,d)=>(r(),k(G,null,{default:H(()=>[m(z,{title:u(w)},null,8,["title"]),m(J,{title:u(w),badge:u(a).length,"title-tag":"h1"},{default:H(()=>[g("div",fe,[u(a).length>6?(r(!0),p(B,{key:0},N(u(h).entries(),([s,v])=>(r(),k(ce,{key:s,title:s,items:v,open:u(F)<=s},null,8,["title","items","open"]))),128)):(r(),k(V,{key:1,items:u(a)},null,8,["items"]))])]),_:1},8,["title","badge"])]),_:1}))}});const $e=C(_e,[["__scopeId","data-v-aad5b254"]]);export{$e as default};
