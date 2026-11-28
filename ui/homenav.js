// Home page navigation (v150): a sticky "jump to" bar, swipe rows on phones and a shorter hero on phones.
(function(){
if(typeof R=="undefined")return;
const RM=matchMedia("(prefers-reduced-motion: reduce)"),PH=matchMedia("(max-width:640px)");
const css=`
.hjump{position:sticky;top:var(--hjt,0px);z-index:40;margin:0 -6px 18px;padding:8px 6px;background:color-mix(in srgb,var(--bg) 86%,transparent);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid transparent;transition:border-color .2s,box-shadow .2s}
.hjump.stuck{border-bottom-color:var(--bd);box-shadow:0 10px 24px -18px rgba(0,0,0,.45)}
.hjump ul{display:flex;gap:6px;list-style:none;margin:0;padding:0;overflow-x:auto;scrollbar-width:none}
.hjump ul::-webkit-scrollbar{display:none}
.hjump a{display:block;white-space:nowrap;font:600 .86rem/1 system-ui,sans-serif;padding:9px 13px;border-radius:99px;color:var(--tx);text-decoration:none;background:var(--sf);border:1px solid var(--bd);transition:background .2s,color .2s,border-color .2s}
.hjump a:hover{border-color:var(--mu)}
.hjump a[aria-current=true]{background:var(--hd);color:var(--bg);border-color:var(--hd)}
.hjump a:focus-visible{outline:3px solid var(--a1,#7c3aed);outline-offset:2px}
.hjump .lbl{align-self:center;font:600 .78rem/1 system-ui,sans-serif;color:var(--mu);padding:0 4px 0 2px;white-space:nowrap}
.hj-t{scroll-margin-top:calc(var(--hjt,0px) + 64px)}
.swd{display:none}
.st-more{display:flex;justify-content:center;margin:-4px 0 26px;position:relative}
.stiles.st-cut{position:relative}
.stiles.st-cut .stile.st-h{display:none}
.st-more button{font:700 .95rem/1 system-ui,sans-serif;padding:13px 22px;border-radius:99px;border:1px solid var(--bd);background:var(--sf);color:var(--hd);cursor:pointer;box-shadow:0 10px 24px -16px rgba(0,0,0,.5);transition:transform .15s,border-color .2s}
.st-more button:hover{transform:translateY(-1px);border-color:var(--mu)}
.st-more button:focus-visible{outline:3px solid var(--a1,#7c3aed);outline-offset:2px}
/* Skip drawing sections that are far off screen until they come near (they keep their space). */
#v.home2>.pk,#v.home2>.lab,#v.home2>.bento,#v.home2>.stiles,#v.home2>.row,#v.home2>.grid{content-visibility:auto}
#v.home2>.pk{contain-intrinsic-size:auto 550px}#v.home2>.lab{contain-intrinsic-size:auto 1520px}#v.home2>.bento{contain-intrinsic-size:auto 1060px}#v.home2>.stiles{contain-intrinsic-size:auto 900px}#v.home2>.row{contain-intrinsic-size:auto 340px}#v.home2>.grid{contain-intrinsic-size:auto 440px}
@media (max-width:640px){#v.home2>.lab{contain-intrinsic-size:auto 1580px}#v.home2>.bento{contain-intrinsic-size:auto 600px}#v.home2>.stiles{contain-intrinsic-size:auto 1100px}#v.home2>.row{contain-intrinsic-size:auto 720px}#v.home2>.grid{contain-intrinsic-size:auto 860px}}

@media (max-width:640px){
.hjump a{font-size:.8rem;padding:8px 11px}.hjump .lbl{display:none}
#v .lab-sw{display:flex;grid-column:span 12;overflow-x:auto;scroll-snap-type:x mandatory;gap:10px;margin:0 -14px;padding:0 14px 2px;scroll-padding:0 14px;scrollbar-width:none;align-items:stretch}
#v .lab-sw::-webkit-scrollbar,#v .bento::-webkit-scrollbar,#v .sx-cards::-webkit-scrollbar{display:none}
#v .lab-sw>.lc{flex:0 0 86%;scroll-snap-align:start;grid-column:auto}
#v .bento{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin-left:-16px;margin-right:-16px;padding:4px 16px 6px;scroll-padding:0 16px;scrollbar-width:none;align-items:stretch}
#v .bento>.panel{flex:0 0 84%;scroll-snap-align:start;margin:0;opacity:1;transform:none}
.swd{display:flex;justify-content:center;gap:2px;margin:6px 0 4px}
.swd button{all:unset;cursor:pointer;width:24px;height:24px;display:grid;place-items:center}
.swd button:before{content:"";width:7px;height:7px;border-radius:9px;background:var(--bd);transition:width .25s,background .25s}
.swd button[aria-current=true]:before{width:20px;background:var(--hd)}
.lab .swd button:before{background:rgba(255,255,255,.25)}.lab .swd button[aria-current=true]:before{background:#fff}
.swd button:focus-visible{outline:2px solid var(--a1,#7c3aed);border-radius:6px}
#v .hx-t{font-size:2.15rem}
#v .hx-p{font-size:.95rem;line-height:1.45}
#v .sx{margin-top:22px;gap:12px}
#v .sx-cards{grid-auto-flow:column;grid-template-columns:none;grid-template-rows:repeat(2,96px);grid-auto-rows:96px;grid-auto-columns:118px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;margin:0 -4px;padding:2px 4px 4px}
#v .sx-c{scroll-snap-align:start}
#v .sx-pv{height:auto;min-height:0}
#v .sx-pv .sx-go{margin-top:14px}
}

/* Desktop hero that fits one screen (v152) */
@media (min-width:1000px){
#v .hx{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);grid-template-areas:"main pv" "cards cards" "links links";column-gap:30px;row-gap:20px;align-items:stretch;padding:40px 44px 30px}
#v .hx-top,#v .hx .sx{display:contents}
#v .hx-deck{display:none}
#v .hx-main{grid-area:main;align-self:center}
#v .hx-t{font-size:clamp(50px,4.5vw,72px);max-width:none}
#v .hx-p{font-size:1rem;margin:.7em 0 1em;max-width:36em}
#v .hx .sx-pv{grid-area:pv;height:auto;min-height:330px}
#v .hx .sx-cards{grid-area:cards;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(2,100px);grid-auto-rows:100px;gap:9px;height:auto}
#v .hx .sx-c{padding:8px 9px;height:auto;min-height:0}
#v .hx .sx-c>.e{width:38px;height:38px;top:7px;right:7px}#v .hx .sx-c>.e svg{width:100%;height:100%}#v .hx .sx-c.on>.e{width:44px;height:44px}
#v .hx-links{grid-area:links;margin-top:0}
}
@media (min-width:1000px) and (max-height:820px){#v .hx{padding-top:30px;row-gap:14px}#v .hx .sx-cards{grid-template-rows:repeat(2,90px);grid-auto-rows:90px}#v .hx-t{font-size:clamp(44px,4vw,60px)}#v .hx .sx-pv{min-height:300px}}
/* Gentle snapping on computers (v153): settles a section into place near its top, never forces a jump. */
@media (min-width:1000px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){
html.hsnap{scroll-snap-type:y proximity;scroll-padding-top:var(--hsp,0px)}
html.hsnap #v.home2>.hx{min-height:var(--hxmin,auto);scroll-snap-align:start;scroll-margin-top:calc(var(--hxtop,0px) - var(--hsp,0px))}
html.hsnap #v.home2 .hsn{scroll-snap-align:start}
html.hsnap #v.home2 .hj-t{scroll-margin-top:0}
}
/* Side column on wide screens */
.hrail{display:none}
@media (min-width:1500px){
#v.home2.hrw{max-width:1480px;position:relative;padding-right:384px}
#v.home2.hrw>.hjump{display:none}
#v.home2.hrw>.hrail{display:block;position:absolute;top:24px;bottom:60px;right:16px;width:344px}
.hr-in{position:sticky;top:calc(var(--hjt,0px) + 18px);display:flex;flex-direction:column;gap:16px;max-height:calc(100vh - var(--hjt,0px) - 36px);overflow:auto;scrollbar-width:thin}
@property --hra{syntax:"<angle>";inherits:false;initial-value:0deg}
.hr-nav{--c:#6366f1;display:block;position:relative;border-radius:22px;padding:16px 14px 14px;border:1.5px solid transparent;background:linear-gradient(var(--sf),var(--sf)) padding-box,conic-gradient(from var(--hra),#6366f1,#a855f7,#f97316,#eab308,#0ea5e9,#6366f1) border-box;box-shadow:0 18px 40px -26px color-mix(in srgb,var(--c) 70%,transparent);animation:hrspin 10s linear infinite;transition:box-shadow .5s}
@keyframes hrspin{to{--hra:360deg}}
.hr-hd{display:flex;align-items:center;justify-content:space-between;margin:0 6px 8px}
.hr-nav h3{font:800 .82rem/1 system-ui,sans-serif;color:var(--hd);margin:0;letter-spacing:.01em}
.hr-pc{font:800 .74rem/1 system-ui,sans-serif;font-variant-numeric:tabular-nums;color:#fff;background:var(--c);padding:5px 8px;border-radius:99px;transition:background .5s;box-shadow:0 4px 12px -4px var(--c)}
.hr-bar{height:4px;border-radius:9px;background:var(--sf2);margin:0 6px 12px;overflow:hidden}
.hr-bar i{display:block;height:100%;width:var(--p,0%);border-radius:9px;background:linear-gradient(90deg,#6366f1,#a855f7,#f97316,#eab308);background-size:200% 100%;animation:hrflow 3s linear infinite;transition:width .25s}
@keyframes hrflow{to{background-position:-200% 0}}
.hr-list{position:relative}
.hr-list:before{content:"";position:absolute;left:24px;top:22px;bottom:22px;width:2px;border-radius:2px;background:var(--bd)}
.hr-tf{position:absolute;left:24px;top:22px;width:2px;height:var(--f,0px);border-radius:2px;background:linear-gradient(#6366f1,var(--c));box-shadow:0 0 10px var(--c);transition:height .45s cubic-bezier(.3,1.3,.5,1),background .5s}
.hr-ind{position:absolute;left:0;right:0;top:0;height:44px;border-radius:14px;background:linear-gradient(100deg,color-mix(in srgb,var(--c) 20%,var(--sf)),color-mix(in srgb,var(--c) 6%,var(--sf)));border:1px solid color-mix(in srgb,var(--c) 35%,transparent);transform:translateY(var(--y,0px));transition:transform .45s cubic-bezier(.3,1.35,.5,1),height .3s,background .5s,border-color .5s;pointer-events:none}
.hr-nav ul{position:relative;list-style:none;margin:0;padding:0;display:grid;gap:3px}
.hr-nav a{display:flex;align-items:center;gap:12px;padding:6px 10px;min-height:44px;box-sizing:border-box;border-radius:14px;color:var(--tx);text-decoration:none;font-weight:600;font-size:.95rem;transition:transform .25s,color .3s}
.hr-nav a .hb{position:relative;z-index:1;flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:.9rem;background:var(--sf);border:2px solid color-mix(in srgb,var(--ic) 45%,var(--bd));transition:transform .3s cubic-bezier(.3,1.6,.5,1),box-shadow .3s,background .3s,border-color .3s}
.hr-nav a:hover{transform:translateX(4px)}
.hr-nav a:hover .hb{transform:rotate(-12deg) scale(1.12)}
.hr-nav a[aria-current=true]{color:var(--hd);font-weight:800}
.hr-nav a[aria-current=true] .hb{background:var(--ic);border-color:var(--ic);box-shadow:0 0 0 4px color-mix(in srgb,var(--ic) 22%,transparent),0 0 18px var(--ic);animation:hrpop .5s cubic-bezier(.3,1.6,.5,1)}
@keyframes hrpop{0%{transform:scale(.6)}60%{transform:scale(1.25)}100%{transform:scale(1)}}
.hr-nav a[aria-current=true] .hl{background:linear-gradient(90deg,var(--hd),var(--ic));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hr-nav a:focus-visible{outline:3px solid var(--c);outline-offset:1px}
@media (prefers-reduced-motion:reduce){.hr-nav,.hr-bar i{animation:none}.hr-ind,.hr-tf,.hr-nav a,.hr-nav a .hb{transition:none}.hr-nav a[aria-current=true] .hb{animation:none}}
.hrail .tdl{margin:0!important;opacity:1!important;transform:none!important;width:auto!important;max-width:none!important}
#v.home2.hrw>.row{grid-template-columns:1fr!important}
}
@media (prefers-reduced-motion:reduce){.swd button:before,.hjump a{transition:none}}
`;
const SECS=[["Peek inside",v=>v.querySelector(".pk")],["The Lab",v=>v.querySelector(".lab")],["Fact of the day",v=>v.querySelector(".bento")],["Subjects",v=>[...v.querySelectorAll("h2.sech")].find(h=>/Explore the subjects/.test(h.textContent))],["Today in history",v=>v.querySelector(".row")],["Editor’s picks",v=>[...v.querySelectorAll("h2.sech")].find(h=>/Editor/.test(h.textContent))]];
let onScroll=null,onResize=null;
function hdrH(){const h=document.querySelector("header");if(!h)return 0;const cs=getComputedStyle(h);return cs.position=="sticky"||cs.position=="fixed"?Math.round(h.getBoundingClientRect().height):0}
function swipe(box,items,label){if(!box||box.nextElementSibling&&box.nextElementSibling.classList.contains("swd"))return;const els=[...box.querySelectorAll(items)];if(els.length<2)return;
const d=document.createElement("div");d.className="swd";d.setAttribute("role","group");d.setAttribute("aria-label",label);
d.innerHTML=els.map((e,i)=>`<button type="button" aria-label="Show card ${i+1} of ${els.length}"${i?"":' aria-current="true"'}></button>`).join("");box.after(d);const bs=[...d.children];
const go=i=>{const e=els[i];box.scrollTo({left:e.offsetLeft-els[0].offsetLeft,behavior:RM.matches?"auto":"smooth"})};
bs.forEach((b,i)=>b.addEventListener("click",()=>go(i)));
let raf=0;box.addEventListener("scroll",()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const x=box.scrollLeft;let k=0,best=1e9;els.forEach((e,i)=>{const dd=Math.abs(e.offsetLeft-els[0].offsetLeft-x);if(dd<best){best=dd;k=i}});if(box.scrollLeft+box.clientWidth>=box.scrollWidth-4)k=els.length-1;bs.forEach((b,i)=>b.setAttribute("aria-current",i==k))})},{passive:true})}
function jump(){const v=V;if(v.querySelector(".hjump"))return;const hero=v.querySelector(".hx");if(!hero)return;
const list=SECS.map(s=>[s[0],s[1](v)]).filter(s=>s[1]);if(list.length<3)return;
list.forEach((s,i)=>{s[1].classList.add("hj-t");if(!s[1].id)s[1].id="hs-"+i});
const nav=document.createElement("nav");nav.className="hjump";nav.setAttribute("aria-label","Jump to a section");
nav.innerHTML=`<ul><li class="lbl">Jump to</li>${list.map(s=>`<li><a href="#/" data-t="${s[1].id}">${s[0]}</a></li>`).join("")}</ul>`;hero.after(nav);
const links=[...nav.querySelectorAll("a")],ul=nav.querySelector("ul");
const setTop=()=>nav.style.setProperty("--hjt",hdrH()+"px"),setVar=()=>document.documentElement.style.setProperty("--hjt",hdrH()+"px");setTop();setVar();
links.forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const t=document.getElementById(a.dataset.t);if(!t)return;t.scrollIntoView({behavior:RM.matches?"auto":"smooth",block:"start"});let n=0;const fix=()=>{const want=(parseFloat(getComputedStyle(t).scrollMarginTop)||0)+(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0),d=t.getBoundingClientRect().top-want;if(Math.abs(d)>4)scrollBy(0,d);if(++n<4)setTimeout(fix,250)};setTimeout(fix,RM.matches?50:700)}));
let cur=-1,raf=0;
onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(!document.contains(nav))return;const top=hdrH()+nav.offsetHeight+80;let k=-1;list.forEach((s,i)=>{if(s[1].getBoundingClientRect().top<=top)k=i});
nav.classList.toggle("stuck",nav.getBoundingClientRect().top<=hdrH()+1&&scrollY>0);
if(k!=cur){cur=k;links.forEach((a,i)=>a.setAttribute("aria-current",i==k));if(k>=0){const a=links[k],l=a.offsetLeft-ul.offsetLeft;if(l<ul.scrollLeft||l+a.offsetWidth>ul.scrollLeft+ul.clientWidth)ul.scrollTo({left:l-24,behavior:RM.matches?"auto":"smooth"})}}})};
onResize=()=>{setTop();setVar();onScroll()};
addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onResize);onScroll()}
function tiles(){const g=V.querySelector(".stiles");if(!g||g.dataset.cut)return;const all=[...g.querySelectorAll(".stile")];if(all.length<10)return;g.dataset.cut=1;
const wrap=document.createElement("div");wrap.className="st-more";wrap.innerHTML=`<button type="button" aria-expanded="false">Show all ${all.length} subjects</button>`;g.after(wrap);const btn=wrap.firstChild;let open=false;
const cut=()=>{if(open)return;all.forEach(t=>t.classList.remove("st-h"));g.classList.remove("st-cut");const old=g.style.contentVisibility;g.style.contentVisibility="visible";const tops=all.map(t=>t.offsetTop),rows=[...new Set(tops)].sort((a,b)=>a-b),want=PH.matches?6:8;const bots=all.map(t=>t.offsetTop+t.offsetHeight);let lim=Infinity;for(const r of rows){const k=all.map((t,i)=>i).filter(i=>tops[i]<r);if(k.length>=want&&Math.max(...k.map(i=>bots[i]))<=r){lim=r;break}}g.style.contentVisibility=old;
if(lim==Infinity){wrap.hidden=true;return}wrap.hidden=false;all.forEach((t,i)=>t.classList.toggle("st-h",tops[i]>=lim));g.classList.add("st-cut");btn.textContent=`Show all ${all.length} subjects`};
btn.addEventListener("click",()=>{open=!open;if(open){g.classList.remove("st-cut");all.forEach(t=>t.classList.remove("st-h","rv","rv-l","rv-r","rv-z"));btn.textContent="Show fewer subjects"}else{cut();g.scrollIntoView({block:"start",behavior:RM.matches?"auto":"smooth"})}btn.setAttribute("aria-expanded",open)});
cut();let rt=0;PH.addEventListener?PH.addEventListener("change",()=>{clearTimeout(rt);rt=setTimeout(cut,100)}):0}
const WIDE=matchMedia("(min-width:1500px)");let railOff=null;
function rail(){const v=V,hero=v.querySelector(".hx");if(!hero||v.querySelector(".hrail"))return;
const list=SECS.filter(x=>x[0]!="Today in history").map(x=>[x[0],x[1](v)]).filter(x=>x[1]);if(list.length<3)return;
list.forEach((x,i)=>{x[1].classList.add("hj-t");if(!x[1].id)x[1].id="hr-"+i});
const a=document.createElement("aside");a.className="hrail";a.setAttribute("aria-label","On this page");
const ICO={"Peek inside":["👀","#f97316"],"The Lab":["🧪","#a855f7"],"Fact of the day":["💡","#eab308"],"Subjects":["📚","#0ea5e9"],"Editor’s picks":["⭐","#ef4444"]};const item=(t,lab,ic)=>`<li><a href="#/" data-t="${t}" style="--ic:${ic[1]}"><span class="hb" aria-hidden="true">${ic[0]}</span><span class="hl">${lab}</span></a></li>`;
a.innerHTML=`<div class="hr-in"><nav class="hr-nav" aria-label="Sections"><div class="hr-hd"><h3>On this page</h3><span class="hr-pc" aria-hidden="true">0%</span></div><div class="hr-bar"><i></i></div><div class="hr-list"><span class="hr-ind"></span><span class="hr-tf"></span><ul>${item("top","Top",["🏠","#6366f1"])}${list.map(x=>item(x[1].id,x[0],ICO[x[0]]||["•","#64748b"])).join("")}</ul></div></nav></div>`;v.appendChild(a);
const inn=a.firstChild,links=[...a.querySelectorAll("a")],tdl=v.querySelector(".row .tdl"),mark=document.createComment("tdl");
links.forEach(l=>l.addEventListener("click",e=>{e.preventDefault();if(l.dataset.t=="top"){scrollTo({top:0,behavior:RM.matches?"auto":"smooth"});return}const t=document.getElementById(l.dataset.t);t&&t.scrollIntoView({behavior:RM.matches?"auto":"smooth",block:"start"})}));
const place=()=>{const w=WIDE.matches&&document.contains(a);v.classList.toggle("hrw",w);if(!tdl)return;if(w&&tdl.parentNode!==inn){tdl.before(mark);tdl.classList.remove("rv","rv-l","rv-r","rv-z");inn.appendChild(tdl)}else if(!w&&tdl.parentNode===inn&&mark.parentNode){mark.replaceWith(tdl)}};
let raf=0;const spy=()=>{if(raf||!WIDE.matches)return;raf=requestAnimationFrame(()=>{raf=0;const top=(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hjt"))||0)+120;let k=0;list.forEach((x,i)=>{if(x[1].getBoundingClientRect().top<=top)k=i+1});links.forEach((l,i)=>l.setAttribute("aria-current",i==k));const al=links[k],nav=a.querySelector(".hr-nav");if(al){const c=getComputedStyle(al).getPropertyValue("--ic").trim();nav.style.setProperty("--c",c);const ind=a.querySelector(".hr-ind");ind.style.setProperty("--y",al.offsetTop+"px");ind.style.height=al.offsetHeight+"px";a.querySelector(".hr-tf").style.setProperty("--f",Math.max(0,al.offsetTop+al.offsetHeight/2-22)+"px")}const max=document.documentElement.scrollHeight-innerHeight,pc=max>0?Math.min(100,Math.round(scrollY/max*100)):0;a.querySelector(".hr-pc").textContent=pc+"%";a.querySelector(".hr-bar").style.setProperty("--p",pc+"%")})};
place();spy();WIDE.addEventListener("change",place);addEventListener("scroll",spy,{passive:true});
railOff=()=>{WIDE.removeEventListener("change",place);removeEventListener("scroll",spy);v.classList.remove("hrw")}}
function snap(){const v=V,hero=v.querySelector(".hx");if(!hero)return;document.documentElement.classList.add("hsnap");
const pts=[v.querySelector(".pk"),v.querySelector(".lab"),v.querySelector(".bento"),[...v.querySelectorAll("h2.sech")].find(h=>/Explore the subjects/.test(h.textContent)),v.querySelector("#v>.row"),[...v.querySelectorAll("h2.sech")].find(h=>/Editor/.test(h.textContent))].filter(Boolean);pts.forEach(e=>e.classList.add("hsn"));
const size=()=>{if(!document.contains(hero))return;const nav=v.querySelector(".hjump"),navH=nav&&getComputedStyle(nav).display!="none"?nav.offsetHeight:0,hh=hdrH(),r=document.documentElement.style;r.setProperty("--hsp",(hh+navH+12)+"px");const top=hero.getBoundingClientRect().top+scrollY;r.setProperty("--hxtop",top+"px");r.setProperty("--hxmin",Math.max(0,innerHeight-top-(navH?navH+14:16))+"px")};
size();addEventListener("resize",size);snapOff=()=>{removeEventListener("resize",size);document.documentElement.classList.remove("hsnap")}}
let snapOff=null;
function cleanup(){if(snapOff){snapOff();snapOff=null}if(railOff){railOff();railOff=null}if(onScroll)removeEventListener("scroll",onScroll);if(onResize)removeEventListener("resize",onResize);onScroll=onResize=null}
function phoneTidy(){if(!PH.matches)return;V.querySelectorAll(".bento>.panel").forEach(p=>p.classList.remove("rv","rv-l","rv-r","rv-z"))}
function inject(){try{if(!V.querySelector(".hx"))return;if(!document.getElementById("hjcss")){const s=document.createElement("style");s.id="hjcss";s.textContent=css;document.head.appendChild(s)}
cleanup();phoneTidy();jump();rail();snap();swipe(V.querySelector(".lab-sw"),".lc","Lab cards");swipe(V.querySelector(".bento"),".panel","Daily cards")}catch(e){console.error("homenav",e)}}
function hook(){const prev=R.home;if(prev.__hj)return;R.home=function(x){cleanup();prev(x);inject()};R.home.__hj=1;inject()}
addEventListener("hashchange",()=>{if(!/^#\/?$/.test(location.hash))cleanup()});
// Run after the Lab has hooked in, so the Lab exists when the bar is built.
const start=()=>setTimeout(hook,0);if(document.readyState=="complete")start();else addEventListener("load",start);
})();
