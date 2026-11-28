/* Effects part 1: page transitions (card-to-page morph, direction-aware slides), theme reveal,
   confetti, bookmark burst, read-aloud sound waves, illustrated empty and not-found pages. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const VT=!!document.startViewTransition&&!still;
const root=document.documentElement;if(VT)root.classList.add("vt-ok");
const css=`
header{view-transition-name:site-header}#ldb{view-transition-name:ldbar}.sprog{view-transition-name:sprog}
::view-transition-group(site-header),::view-transition-group(ldbar),::view-transition-group(sprog){animation:none}
::view-transition-old(root){animation:vtOut .3s cubic-bezier(.4,0,.2,1) both}
::view-transition-new(root){animation:vtIn .45s cubic-bezier(.2,.8,.2,1) both}
html[data-dir=back]::view-transition-old(root){animation-name:vtOutB}html[data-dir=back]::view-transition-new(root){animation-name:vtInB}
@keyframes vtOut{to{opacity:0;transform:translateX(-70px)}}@keyframes vtIn{from{opacity:0;transform:translateX(90px)}}
@keyframes vtOutB{to{opacity:0;transform:translateX(70px)}}@keyframes vtInB{from{opacity:0;transform:translateX(-90px)}}
::view-transition-group(morph){animation-duration:.55s;animation-timing-function:cubic-bezier(.2,.8,.2,1);z-index:50}
::view-transition-old(morph),::view-transition-new(morph){height:100%;object-fit:cover;animation-duration:.55s}
::view-transition-image-pair(morph){isolation:isolate}
html.vt-ok #v.ld-out{opacity:1;filter:none}
/* theme reveal */
html.thsw *,html.thsw *::before,html.thsw *::after{transition:none!important}
.th-wipe{position:fixed;inset:0;z-index:99999;pointer-events:none;clip-path:circle(0 at var(--x) var(--y));transition:clip-path .38s cubic-bezier(.4,0,.2,1),opacity .4s ease}.th-wipe.grow{clip-path:circle(var(--r) at var(--x) var(--y))}.th-wipe.fade{opacity:0}
html[data-vt=theme] header,html[data-vt=theme] #ldb,html[data-vt=theme] .sprog{view-transition-name:none!important}
html[data-vt=theme]::view-transition-old(root){animation:none;transform:none;opacity:1}
html[data-vt=theme]::view-transition-new(root){animation:thR .7s cubic-bezier(.4,0,.2,1) both;transform:none;opacity:1}
@keyframes thR{from{clip-path:circle(0 at var(--tx,90%) var(--ty,30px))}to{clip-path:circle(var(--tr,150vmax) at var(--tx,90%) var(--ty,30px))}}
#th.spin{animation:thSpin .6s cubic-bezier(.3,1.5,.5,1)}
@keyframes thSpin{0%{transform:rotate(-200deg) scale(.3);opacity:0}100%{transform:none;opacity:1}}
/* confetti */
.cfx{position:fixed;inset:0;z-index:2000;pointer-events:none}
.mstoast{position:fixed;left:50%;bottom:28px;z-index:2001;transform:translateX(-50%);padding:14px 22px;border-radius:999px;color:#fff;font:800 16px var(--disp);background:linear-gradient(90deg,#db2777,#7c3aed);box-shadow:0 20px 40px -14px rgba(124,58,237,.7);animation:msIn .6s cubic-bezier(.3,1.5,.5,1),msOut .5s 3.6s ease forwards;white-space:nowrap;max-width:calc(100vw - 32px);overflow:hidden;text-overflow:ellipsis}
@keyframes msIn{from{opacity:0;transform:translate(-50%,40px) scale(.8)}}@keyframes msOut{to{opacity:0;transform:translate(-50%,20px)}}
/* bookmark + read aloud */
#bk.pop{animation:bkPop .5s cubic-bezier(.3,1.8,.5,1)}@keyframes bkPop{40%{transform:scale(1.18)}}
#sp .wv{display:inline-flex;align-items:flex-end;gap:2px;height:14px;margin-left:8px;vertical-align:-2px}
#sp .wv i{width:3px;border-radius:2px;background:currentColor;animation:wv .9s ease-in-out infinite}
#sp .wv i:nth-child(2){animation-delay:.15s}#sp .wv i:nth-child(3){animation-delay:.3s}#sp .wv i:nth-child(4){animation-delay:.45s}
@keyframes wv{0%,100%{height:3px}50%{height:14px}}
#sp.talking{background:linear-gradient(90deg,#db2777,#7c3aed)!important;color:#fff!important;border-color:transparent!important}
/* empty states */
.empt{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;margin:18px auto 22px;max-width:460px}
.empt svg{width:min(260px,70vw);height:auto;overflow:visible}
.empt h3{margin:4px 0 0;font:900 24px/1.2 var(--disp)}.empt p{margin:0;color:var(--mu)}
.empt .fl1{animation:efl 3.2s ease-in-out infinite alternate}.empt .fl2{animation:efl 2.6s .4s ease-in-out infinite alternate}
@keyframes efl{to{transform:translateY(-8px) rotate(3deg)}}
.empt .sw{transform-origin:150px 40px;animation:esw 2.4s ease-in-out infinite alternate}@keyframes esw{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}
@media (prefers-reduced-motion:reduce){.empt *{animation:none!important}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const V=document.getElementById("v");

/* ---------- confetti ---------- */
window.confetti=(o={})=>{if(still)return;const c=document.createElement("canvas");c.className="cfx";c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;document.body.appendChild(c);
const g=c.getContext("2d");g.scale(devicePixelRatio,devicePixelRatio);const C=["#ff3d77","#ffb800","#00c2a8","#4f7cff","#b84dff","#ffd23f","#22c55e"];
const x0=o.x!=null?o.x:innerWidth/2,y0=o.y!=null?o.y:innerHeight*.35,n=o.n||160,spread=o.spread||1;
const P=[...Array(n)].map(()=>{const a=Math.random()*Math.PI*2,s=(o.small?3:6)+Math.random()*(o.small?5:9);return{x:x0,y:y0,vx:Math.cos(a)*s*spread,vy:Math.sin(a)*s-(o.small?3:7),r:Math.random()*Math.PI,vr:(Math.random()-.5)*.3,w:o.small?5:7+Math.random()*5,h:o.small?3:4+Math.random()*4,c:C[Math.floor(Math.random()*C.length)],l:1}});
const t0=performance.now(),dur=o.small?1100:2600;const f=t=>{const k=(t-t0)/dur;g.clearRect(0,0,innerWidth,innerHeight);P.forEach(p=>{p.vy+=.28;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;g.save();g.globalAlpha=Math.max(0,1-k*k);g.translate(p.x,p.y);g.rotate(p.r);g.fillStyle=p.c;g.fillRect(-p.w/2,-p.h/2,p.w,p.h);g.restore()});
if(k<1)requestAnimationFrame(f);else c.remove()};requestAnimationFrame(f)};
window.msToast=t=>{const d=document.createElement("div");d.className="mstoast";d.setAttribute("role","status");d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),4300)};

/* ---------- page transitions ---------- */
let morphFrom=null,morphKind=null;
document.addEventListener("click",e=>{if(e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;const a=e.target.closest&&e.target.closest('a[href^="#/"]');if(!a)return;
const h=a.getAttribute("href");morphFrom=null;morphKind=null;
if(/^#\/art\//.test(h)){const b=a.querySelector(".ban")||(a.closest(".hcard")&&a.closest(".hcard").querySelector(".ban"));if(b){morphFrom=b;morphKind="art"}}
else if(/^#\/(cat|browse)\//.test(h)&&(a.matches(".sx-c,.stile"))){morphFrom=a;morphKind="cat"}
else if(/^#\/country\//.test(h)){const f=a.querySelector(".flag");if(f){morphFrom=f;morphKind="ctry"}}},true);
const stackK="ep-nav";const getS=()=>{try{return JSON.parse(sessionStorage.getItem(stackK))||[]}catch(e){return[]}},putS=s=>{try{sessionStorage.setItem(stackK,JSON.stringify(s.slice(-60)))}catch(e){}};
let lastHash=location.hash;
const navDir=()=>{const s=getS(),h=location.hash;let dir="fwd";if(s.length>1&&s[s.length-2]==h){s.pop();dir="back"}else if(s[s.length-1]!=h)s.push(h);putS(s);return dir};
{const s=getS();if(s[s.length-1]!=location.hash){s.push(location.hash);putS(s)}}
const target=()=>morphKind=="art"?V.querySelector(".hero .ban.big"):morphKind=="cat"?V.querySelector(".opener"):morphKind=="ctry"?V.querySelector(".chead .flag"):null;
const known=v=>!v||R[v];
function notFound(){V.classList.remove("home2","rv-on");V.innerHTML=`<div class="empt">${ART404}<h3>This page wandered off</h3><p>The address doesn’t match any page in the encyclopedia. It may have been mistyped or moved.</p><p><a class="btn" href="#/home">Go to the home page</a> <a class="btn" href="#/browse">Browse all articles</a></p></div>`;document.querySelectorAll("nav button").forEach(b=>b.classList.remove("on"))}
const run=()=>{const v=location.hash.replace(/^#\/?/,"").split("/")[0];if(!known(v)){route();notFound();return}route()};
removeEventListener("hashchange",route);
addEventListener("hashchange",()=>{const dir=navDir();lastHash=location.hash;
if(!VT){run();morphFrom=null;return}
root.dataset.dir=dir;const src=morphFrom&&document.body.contains(morphFrom)&&morphFrom.getBoundingClientRect().bottom>0&&morphFrom.getBoundingClientRect().top<innerHeight?morphFrom:null;
if(src)src.style.viewTransitionName="morph";root.classList.add("vt-run");
let tgt=null;const t=document.startViewTransition(()=>{run();if(src){tgt=target();if(tgt)tgt.style.viewTransitionName="morph"}});
t.ready.catch(()=>{});t.updateCallbackDone.catch(()=>{});t.finished.catch(()=>{}).finally(()=>{root.classList.remove("vt-run");if(src)src.style.viewTransitionName="";if(tgt)tgt.style.viewTransitionName="";morphFrom=null})});
/* render unknown addresses as a not-found page on first load too */
{const v=location.hash.replace(/^#\/?/,"").split("/")[0];if(!known(v))setTimeout(notFound,0)}

/* ---------- theme reveal ---------- */
const th=document.getElementById("th");
const LITE=matchMedia("(pointer:coarse), (max-width:900px)");let lastTh=0;
const swapQuiet=fn=>{root.classList.add("thsw");fn();requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove("thsw")))};
if(th){const orig=th.onclick;th.onclick=e=>{const now=Date.now();if(now-lastTh<350)return;lastTh=now;
  const old=document.querySelector(".th-wipe");if(old)old.remove();
  if(still||LITE.matches){swapQuiet(()=>orig&&orig(e));spin();return}
  const r=th.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  const goingDark=(root.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))!="dark";
  const w=document.createElement("div");w.className="th-wipe";w.style.cssText=`--x:${x}px;--y:${y}px;--r:${R}px;background:${goingDark?"#14120f":"#f6f4ef"}`;document.body.appendChild(w);
  requestAnimationFrame(()=>{w.classList.add("grow");setTimeout(()=>{swapQuiet(()=>orig&&orig(e));w.classList.add("fade");setTimeout(()=>w.remove(),420)},380)});spin()};
const spin=()=>{th.classList.remove("spin");void th.offsetWidth;th.classList.add("spin")}}

/* ---------- bookmark burst and read-aloud waves (article pages) ---------- */
const decorateArt=()=>{const bk=document.getElementById("bk");if(bk&&!bk.dataset.fx){bk.dataset.fx=1;bk.addEventListener("click",()=>{if(/Bookmarked/.test(bk.textContent)){bk.classList.remove("pop");void bk.offsetWidth;bk.classList.add("pop");const r=bk.getBoundingClientRect();confetti({x:r.left+22,y:r.top+r.height/2,n:36,small:true})}})}
const sp=document.getElementById("sp");if(sp&&!sp.dataset.fx){sp.dataset.fx=1;sp.addEventListener("click",()=>{setTimeout(watch,250)})}};
let wt=0;const watch=()=>{clearTimeout(wt);const sp=document.getElementById("sp");if(!sp)return;const on=window.speechSynthesis&&(speechSynthesis.speaking||speechSynthesis.pending);
sp.classList.toggle("talking",!!on);let w=sp.querySelector(".wv");if(on&&!w){w=document.createElement("span");w.className="wv";w.setAttribute("aria-hidden","true");w.innerHTML="<i></i><i></i><i></i><i></i>";sp.appendChild(w)}if(!on&&w)w.remove();if(on)wt=setTimeout(watch,400)};

/* ---------- illustrated empty states ---------- */
const ARTLIB=`<svg viewBox="0 0 300 190" aria-hidden="true"><ellipse cx="150" cy="176" rx="120" ry="10" fill="currentColor" opacity=".08"/><rect x="40" y="150" width="220" height="12" rx="4" fill="#c084fc"/><rect x="40" y="40" width="220" height="10" rx="4" fill="#c084fc" opacity=".55"/>
<g class="fl1"><rect x="70" y="78" width="26" height="72" rx="4" fill="#f472b6"/><rect x="100" y="90" width="22" height="60" rx="4" fill="#fbbf24"/></g><g class="fl2"><rect x="196" y="96" width="30" height="54" rx="4" transform="rotate(14 211 123)" fill="#2dd4bf"/></g>
<g class="fl1"><path d="M146 70l6 16 17 1-13 11 4 17-14-9-14 9 4-17-13-11 17-1z" fill="#ffd23f"/></g><circle cx="248" cy="28" r="5" fill="#60a5fa"/><circle cx="56" cy="24" r="3.5" fill="#f472b6"/></svg>`;
const ARTSRCH=`<svg viewBox="0 0 300 190" aria-hidden="true"><ellipse cx="150" cy="176" rx="110" ry="10" fill="currentColor" opacity=".08"/><g class="sw"><circle cx="135" cy="85" r="46" fill="#ede9fe" stroke="#7c3aed" stroke-width="10"/><path d="M168 118l42 42" stroke="#7c3aed" stroke-width="16" stroke-linecap="round"/>
<text x="135" y="104" text-anchor="middle" font-size="54" font-weight="900" fill="#db2777" font-family="system-ui,sans-serif">?</text></g><g class="fl2"><circle cx="232" cy="46" r="7" fill="#fbbf24"/><circle cx="62" cy="130" r="5" fill="#2dd4bf"/></g></svg>`;
const ART404=`<svg viewBox="0 0 300 190" aria-hidden="true"><ellipse cx="150" cy="176" rx="120" ry="10" fill="currentColor" opacity=".08"/><g class="fl1"><circle cx="150" cy="92" r="62" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="8"/>
<path d="M150 40l12 52-12 52-12-52z" fill="#f43f5e"/><path d="M150 92l12 0-12 52-12-52z" fill="#94a3b8"/><circle cx="150" cy="92" r="7" fill="#fff" stroke="#0f172a" stroke-width="3"/></g>
<text x="56" y="62" font-size="34" font-weight="900" fill="#7c3aed" font-family="system-ui,sans-serif" class="fl2">4</text><text x="230" y="70" font-size="34" font-weight="900" fill="#db2777" font-family="system-ui,sans-serif" class="fl2">4</text></svg>`;
const decorateEmpty=()=>{const h=location.hash;
if(/^#\/saved/.test(h)&&!V.querySelector(".empt")){const bh=[...V.querySelectorAll("h2")].find(x=>/Bookmarks/.test(x.textContent));const p=bh&&bh.nextElementSibling;
if(p&&p.tagName=="P"&&/Open an article/.test(p.textContent)){p.insertAdjacentHTML("beforebegin",`<div class="empt">${ARTLIB}<h3>Your shelf is waiting</h3></div>`)}}
if(/^#\/search\//.test(h)&&!V.querySelector(".empt")){const p=[...V.querySelectorAll("p")].find(x=>/^No articles found/.test(x.textContent.trim()));if(p){p.insertAdjacentHTML("beforebegin",`<div class="empt">${ARTSRCH}<h3>No matches yet</h3><p>Try a shorter word, check the spelling, or pick one of the suggestions.</p></div>`);p.remove()}}
if(/^#\/art\//.test(h)&&!V.querySelector(".empt")){const h2=V.querySelector("h2");if(h2&&/Article not found/.test(h2.textContent)){h2.insertAdjacentHTML("beforebegin",`<div class="empt">${ART404}<h3>We couldn’t find that article</h3><p>It may have been renamed. Try searching for it instead.</p></div>`);h2.remove()}}};
let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;decorateArt();decorateEmpty();watch()})}).observe(V,{childList:true});
})();
