/* Site-wide motion: page transitions, animated tab indicator, menu drop-downs, scroll reveals,
   subject openers, article heroes, the atlas and countries of the world. Respects reduced motion. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const css=`
/* tabs */
#nv{position:relative}
#nv .nvi{position:absolute;bottom:4px;height:4px;border-radius:4px;left:0;width:0;background:linear-gradient(90deg,#db2777,#f59e0b,#14b8a6,#7c3aed);background-size:300% 100%;animation:nvg 6s linear infinite;transition:left .45s cubic-bezier(.3,1.4,.5,1),width .45s cubic-bezier(.3,1.4,.5,1),opacity .3s;pointer-events:none;box-shadow:0 2px 10px rgba(219,39,119,.45)}
@keyframes nvg{to{background-position:300% 0}}
#nv.has-nvi button.on{box-shadow:none!important}
#nv button{transition:background .25s,color .25s,transform .25s cubic-bezier(.3,1.6,.5,1)}
#nv button:hover{transform:translateY(-2px)}
#nv button:active{transform:scale(.94)}
#nv .ddb span{display:inline-block;transition:transform .3s}#nv .ddb[aria-expanded=true] span{transform:rotate(180deg)}
.mega:not([hidden]){animation:mgIn .32s cubic-bezier(.2,.8,.2,1);transform-origin:top center}
@keyframes mgIn{from{opacity:0;transform:translateY(-10px) scale(.98)}}
.mega:not([hidden]) a{animation:fUp .45s cubic-bezier(.2,.8,.2,1) both}
${[...Array(16)].map((_,i)=>`.mega:not([hidden]) a:nth-of-type(${i+1}){animation-delay:${(i*.03).toFixed(2)}s}`).join("")}
@keyframes fUp{from{opacity:0;transform:translateY(12px)}}
/* page transition */
#v.pg-in>*{animation:pgIn .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--pi,0) * 55ms)}
@keyframes pgIn{from{opacity:0;transform:translateY(22px)}}
/* scroll reveal */
.mrv{opacity:0;transform:translateY(30px) scale(.97);transition:opacity .7s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:var(--md,0s)}
.mrv.in{opacity:1;transform:none}
/* cards everywhere */
.card,.ccard,.subtile{transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
.card:hover,.subtile:hover{transform:translateY(-5px);box-shadow:0 18px 30px -18px rgba(40,20,90,.45)}
.card .ban img,.acard .ban img{transition:transform 5s ease}.card:hover .ban img{transform:scale(1.1)}
/* subject openers */
.opener h2{animation:opIn .8s cubic-bezier(.2,.8,.2,1) both}
.opener .tg{animation:opIn .8s .12s cubic-bezier(.2,.8,.2,1) both}
.opener>p:not(.tg){animation:opIn .8s .22s cubic-bezier(.2,.8,.2,1) both}
.opener .st{animation:opIn .8s .32s cubic-bezier(.2,.8,.2,1) both}
@keyframes opIn{from{opacity:0;transform:translateX(-40px)}}
.opener .big-ic.svg{animation:artIn 1.1s cubic-bezier(.3,1.4,.5,1) both}
@keyframes artIn{from{opacity:0;scale:.4;rotate:-25deg}}
.opener .big-ic.svg .sart{animation:artFloat 5s 1.1s ease-in-out infinite alternate}
@keyframes artFloat{to{transform:translateY(-12px) rotate(3deg)}}
.opener:before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 45%,transparent 60%);background-size:250% 100%;animation:opSh 7s ease-in-out infinite}
@keyframes opSh{0%{background-position:150% 0}60%,100%{background-position:-60% 0}}
.subjump a{animation:pop .5s cubic-bezier(.3,1.6,.5,1) both;transition:transform .2s,background .2s}
${[...Array(10)].map((_,i)=>`.subjump a:nth-child(${i+1}){animation-delay:${(.35+i*.05).toFixed(2)}s}`).join("")}
.subjump a:hover{transform:translateY(-3px) scale(1.04)}
@keyframes pop{from{opacity:0;transform:scale(.6) translateY(10px)}}
/* article pages */
.atitle{animation:opIn .7s cubic-bezier(.2,.8,.2,1) both}
.hero .ban.big img{animation:kb 14s ease-out both}
@keyframes kb{from{transform:scale(1.12)}to{transform:scale(1)}}
.toc a{transition:transform .2s,color .2s}.toc a:hover{transform:translateX(4px)}
/* countries of the world */
.cchips button{animation:pop .45s cubic-bezier(.3,1.6,.5,1) both;transition:transform .2s}
${[...Array(9)].map((_,i)=>`.cchips button:nth-child(${i+1}){animation-delay:${(i*.05).toFixed(2)}s}`).join("")}
.cchips button:hover{transform:translateY(-2px)}
.ccard .flag{transition:transform .4s cubic-bezier(.3,1.6,.5,1);transform-origin:left center}
.ccard:hover{transform:translateY(-4px)}
.ccard:hover .flag{animation:wave 1.2s ease-in-out infinite}
@keyframes wave{0%,100%{transform:perspective(200px) rotateY(0) skewY(0)}25%{transform:perspective(200px) rotateY(-18deg) skewY(-3deg)}75%{transform:perspective(200px) rotateY(12deg) skewY(2deg)}}
.chead .flag.big{animation:flagIn 1s cubic-bezier(.3,1.3,.5,1) both,wave 4s 1s ease-in-out infinite;transform-origin:left center}
@keyframes flagIn{from{opacity:0;transform:perspective(400px) rotateY(-80deg) scale(.7)}}
.chead h2,.chead>div{animation:opIn .8s .15s cubic-bezier(.2,.8,.2,1) both}
.cstat{animation:pop .55s cubic-bezier(.3,1.5,.5,1) both}
${[...Array(8)].map((_,i)=>`.cstat:nth-child(${i+1}){animation-delay:${(.25+i*.07).toFixed(2)}s}`).join("")}
/* atlas */
.amap #cty path{animation:mapIn .9s cubic-bezier(.2,.8,.2,1) both}
${[...Array(12)].map((_,i)=>`.amap #cty path:nth-child(12n+${i+1}){animation-delay:${(i*.06).toFixed(2)}s}`).join("")}
@keyframes mapIn{from{opacity:0}}
.amap path.sel,.amap circle.sel{animation:alift .5s ease,selGlow 2.4s .5s ease-in-out infinite}
@keyframes selGlow{0%,100%{filter:drop-shadow(0 3px 4px rgba(0,0,0,.45)) brightness(1.08)}50%{filter:drop-shadow(0 0 10px rgba(255,210,63,.95)) brightness(1.2)}}
.atl-info>*{animation:infoIn .5s cubic-bezier(.2,.8,.2,1) both}
.atl-info>*:nth-child(2){animation-delay:.08s}.atl-info>*:nth-child(3){animation-delay:.16s}.atl-info>*:nth-child(4){animation-delay:.24s}.atl-info>*:nth-child(n+5){animation-delay:.3s}
@keyframes infoIn{from{opacity:0;transform:translateX(24px)}}
.aw{animation:pop .5s cubic-bezier(.3,1.5,.5,1) both;transition:transform .25s}.aw:hover{transform:translateY(-3px) scale(1.03)}
${[...Array(10)].map((_,i)=>`.aw:nth-child(${i+1}){animation-delay:${(.15+i*.06).toFixed(2)}s}`).join("")}
.aglobe{display:inline-block;animation:spinY 6s linear infinite}
@keyframes spinY{to{transform:rotateY(360deg)}}
/* contents */
.contents2>section h3{transition:transform .25s}.contents2>section:hover h3{transform:translateX(6px)}
@media (prefers-reduced-motion:reduce){#v.pg-in>*,.mega a,.mega,.opener *,.opener:before,.subjump a,.atitle,.hero .ban img,.cchips button,.ccard .flag,.chead *,.cstat,.amap path,.atl-info>*,.aw,.aglobe{animation:none!important}.mrv{opacity:1!important;transform:none!important}#nv .nvi{transition:none}}
`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);

/* animated tab indicator */
const nv=document.getElementById("nv");
if(nv){const ind=document.createElement("span");ind.className="nvi";ind.setAttribute("aria-hidden","true");nv.appendChild(ind);nv.classList.add("has-nvi");
const place=()=>{const on=nv.querySelector("button.on");if(!on){ind.style.opacity=0;return}ind.style.opacity=1;ind.style.left=(on.offsetLeft+8)+"px";ind.style.width=Math.max(10,on.offsetWidth-16)+"px"};
let pr=0;const placeR=()=>{if(!pr)pr=requestAnimationFrame(()=>{pr=0;place()})};new MutationObserver(placeR).observe(nv,{attributes:true,subtree:true,attributeFilter:["class"]});addEventListener("resize",place);
document.fonts&&document.fonts.ready.then(place);setTimeout(place,300);place()}

if(still)return;

/* reveal on scroll for everything outside the home page */
const SEL=".card,.ccard,.subtile,.glx>div,.contents2>section,.featrow>a,.panel,.chd,.pn,.az-l>*,.tlx>*,.aze";
const seen=new WeakSet();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add("in");io.unobserve(el);countUp(el);
setTimeout(()=>el.classList.remove("mrv","in"),900+parseFloat(el.style.getPropertyValue("--md")||0)*1000)}),{threshold:.08,rootMargin:"0px 0px -4% 0px"});
const countUp=root=>root.querySelectorAll&&root.querySelectorAll(".cstat b,.aw b,.opener .st b").forEach(b=>{if(b.dataset.cu)return;b.dataset.cu=1;const m=b.textContent.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);if(!m)return;
const end=parseFloat(m[2].replace(/,/g,"")),dec=(m[2].split(".")[1]||"").length,comma=m[2].includes(","),t0=performance.now();if(!isFinite(end)||end==0)return;
const fmt=v=>{const s=v.toFixed(dec);return comma?Number(s).toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec}):s};
const tick=t=>{const f=Math.min(1,(t-t0)/1300),e=1-Math.pow(1-f,3);b.textContent=m[1]+fmt(end*e)+m[3];if(f<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)});
let raf=0,pageChanged=false;const V=document.getElementById("v");
const decorate=()=>{raf=0;const home=V.classList.contains("home2");
if(pageChanged){pageChanged=false;if(!home){V.classList.remove("pg-in");void V.offsetWidth;[...V.children].forEach((c,i)=>c.style.setProperty("--pi",Math.min(i,8)));V.classList.add("pg-in");setTimeout(()=>V.classList.remove("pg-in"),1100)}
countUp(V)}
if(home)return;
const per=new Map();V.querySelectorAll(SEL).forEach(el=>{if(seen.has(el)||el.closest(".bento,.hx,.mega"))return;seen.add(el);const p=el.parentNode,k=per.get(p)||0;per.set(p,k+1);
const r=el.getBoundingClientRect();if(r.top>innerHeight*1.6&&k>40){}el.classList.add("mrv");el.style.setProperty("--md",((k%6)*.06).toFixed(2)+"s");io.observe(el)})};
new MutationObserver(ms=>{if(ms.some(m=>m.target===V))pageChanged=true;if(!raf)raf=requestAnimationFrame(decorate)}).observe(V,{childList:true,subtree:true});
pageChanged=true;raf=requestAnimationFrame(decorate);
})();
