// Subject pages (v171): glass cards over a soft aurora in the subject's colors, cursor spotlight, image zoom,
// staggered list reveal, article counts on section tiles and a tidier section header that never overlaps the icon.
(function(){
if(typeof R=="undefined")return;
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const css=`
#v.cgon{position:relative;isolation:isolate}
#v.cgon>.cg-aura{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.cg-aura i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.34;animation:cgDrift 26s ease-in-out infinite alternate}
.cg-aura i:nth-child(1){width:560px;height:560px;left:-160px;top:8%;background:var(--cc)}
.cg-aura i:nth-child(2){width:480px;height:480px;right:-160px;top:38%;background:var(--cl);animation-duration:32s;animation-delay:-8s}
.cg-aura i:nth-child(3){width:620px;height:620px;left:28%;top:62%;background:var(--cc);opacity:.22;animation-duration:38s;animation-delay:-16s}
.cg-aura i:nth-child(4){width:420px;height:420px;right:18%;top:-12%;background:var(--cl);opacity:.25;animation-duration:30s}
@keyframes cgDrift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-40px) scale(1.12)}100%{transform:translate(-40px,50px) scale(.95)}}
:root[data-theme=dark] .cg-aura i{opacity:.26}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .cg-aura i{opacity:.26}}

/* shared glass surface */
#v.cgon .featrow .card,#v.cgon .subtile,#v.cgon .glx>div,#v.cgon .subjump a{
background:color-mix(in srgb,var(--sf) 58%,transparent)!important;backdrop-filter:blur(18px) saturate(1.6);-webkit-backdrop-filter:blur(18px) saturate(1.6);
border:1px solid color-mix(in srgb,#fff 55%,transparent)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 18px 40px -26px color-mix(in srgb,var(--cc) 70%,#000)}
:root[data-theme=dark] #v.cgon :is(.featrow .card,.subtile,.glx>div,.subjump a){border-color:rgba(255,255,255,.09)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 20px 44px -26px rgba(0,0,0,.8)}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #v.cgon :is(.featrow .card,.subtile,.glx>div,.subjump a){border-color:rgba(255,255,255,.09)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 20px 44px -26px rgba(0,0,0,.8)}}

/* section chips */
#v.cgon .subjump{gap:10px}
#v.cgon .subjump a{padding:8px 15px 8px 9px;display:inline-flex;align-items:center;transition:translate .25s cubic-bezier(.3,1.4,.5,1),box-shadow .25s,background .25s!important}
#v.cgon .subjump a:hover{translate:0 -3px;background:color-mix(in srgb,var(--cc) 16%,var(--sf))!important;box-shadow:0 12px 24px -14px var(--cc)}

/* "Start here" cards */
#v.cgon .featrow{gap:18px}
#v.cgon .featrow .card{position:relative;border-radius:22px!important;overflow:hidden;--mx:50%;--my:0%;transition:translate .35s cubic-bezier(.2,1.2,.4,1),box-shadow .35s!important;transform:none!important}
#v.cgon .featrow .card:hover{translate:0 -7px;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 28px 50px -24px var(--cc)}
#v.cgon .featrow .card .ban{height:170px!important;position:relative;overflow:hidden}
#v.cgon .featrow .card .ban img{transition:transform 1.2s cubic-bezier(.2,.8,.2,1),filter .6s}
#v.cgon .featrow .card:hover .ban img{transform:scale(1.09);filter:saturate(1.2)}
#v.cgon .featrow .card .ban:after{content:"";position:absolute;inset:auto 0 0;height:55%;background:linear-gradient(transparent,color-mix(in srgb,var(--sf) 70%,transparent));pointer-events:none;z-index:2}
#v.cgon .featrow .card:before{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(260px circle at var(--mx) var(--my),rgba(255,255,255,.22),transparent 60%)}
#v.cgon .featrow .card:hover:before{opacity:1}
#v.cgon .featrow .card:after{content:"";position:absolute;inset:0;z-index:4;pointer-events:none;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.28) 48%,transparent 60%);transform:translateX(-120%)}
#v.cgon .featrow .card:hover:after{transform:translateX(120%);transition:transform 1s cubic-bezier(.22,1,.36,1)}
#v.cgon .featrow .card .t{position:relative;z-index:2;padding:12px 16px 16px!important}
#v.cgon .featrow .card .t b{font:800 17px/1.2 var(--disp)!important;letter-spacing:-.01em}
#v.cgon .featrow .card .csub{display:inline-flex;align-items:center;gap:5px;margin:7px 0 2px;padding:3px 9px;border-radius:99px;background:color-mix(in srgb,var(--cc) 14%,transparent);font-size:11.5px}
#v.cgon .featrow .card .t p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}

/* section tiles */
#v.cgon .subtiles{gap:22px}
#v.cgon .subtile{border-radius:24px!important;position:relative;transition:translate .35s cubic-bezier(.2,1.2,.4,1),box-shadow .35s!important;transform:none!important}
#v.cgon .subtile:hover{translate:0 -6px;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 30px 54px -28px var(--cc)}
#v.cgon .sthead{overflow:hidden;border-radius:23px 23px 0 0}
#v.cgon .sthead .ban{height:168px!important;position:relative;overflow:hidden}
#v.cgon .sthead .ban img{transition:transform 1.4s cubic-bezier(.2,.8,.2,1),filter .6s}
#v.cgon .subtile:hover .sthead .ban img{transform:scale(1.1) rotate(.6deg);filter:saturate(1.2)}
#v.cgon .sthead>span{padding:54px 16px 14px!important;display:block!important;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--cc) 55%,rgba(0,0,0,.55)) 55%,color-mix(in srgb,var(--cc) 40%,rgba(0,0,0,.85)))!important}
#v.cgon .sthead b{display:block;font:800 clamp(18px,1.6vw,21px)/1.15 var(--disp)!important;letter-spacing:-.01em;text-wrap:balance}
#v.cgon .sthead small{display:none!important}
#v.cgon .sthead .sico{position:absolute!important;top:12px!important;left:12px!important;z-index:3;width:40px!important;height:40px!important;border-radius:13px!important;margin:0!important;
background:color-mix(in srgb,var(--sc,#334) 50%,rgba(255,255,255,.12))!important;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.4),0 8px 18px -8px rgba(0,0,0,.6)!important;animation:cgBob 5s ease-in-out infinite;animation-delay:calc(var(--k,0) * -.8s)}
@keyframes cgBob{50%{translate:0 -4px}}
#v.cgon .cg-n{font-style:normal;position:absolute;top:14px;right:14px;z-index:3;padding:5px 11px;border-radius:99px;font:800 12px/1 var(--disp);color:#fff;background:rgba(0,0,0,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
#v.cgon .subtile>p{margin:14px 18px 6px!important;font-size:14.5px}
#v.cgon .subtile ul{margin:4px 10px 8px!important}
#v.cgon .subtile li{border:0!important;padding:0!important}
#v.cgon .subtile li a{display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:10px;transition:background .2s,padding .25s,color .2s}
#v.cgon .subtile li a:before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:var(--cl,var(--cc));box-shadow:0 0 0 3px color-mix(in srgb,var(--cl,var(--cc)) 22%,transparent);transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
#v.cgon .subtile li a:hover{background:color-mix(in srgb,var(--cc) 12%,transparent);padding-left:13px}
#v.cgon .subtile li a:hover:before{transform:scale(1.5)}
#v.cgon .subtile.cgw li{opacity:0;translate:-10px 0}
#v.cgon .subtile.cgin li{opacity:1;translate:0 0;transition:opacity .45s ease,translate .55s cubic-bezier(.2,1.2,.4,1);transition-delay:calc(120ms + var(--i,0) * 55ms)}
#v.cgon .subtile .more{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;margin:auto 18px 16px!important;padding:8px 14px;border-radius:99px;text-decoration:none;background:color-mix(in srgb,var(--cc) 14%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--cc) 30%,transparent);transition:background .25s,gap .25s}
#v.cgon .subtile .more:hover{background:color-mix(in srgb,var(--cc) 26%,transparent);gap:10px}

/* words to know */
#v.cgon .glx{gap:14px}
#v.cgon .glx>div{border-radius:16px!important;border-left:0!important;position:relative;overflow:hidden;padding:14px 16px 12px 20px!important;transition:translate .3s cubic-bezier(.2,1.2,.4,1),box-shadow .3s}
#v.cgon .glx>div:before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:linear-gradient(180deg,var(--c),var(--cc))}
#v.cgon .glx>div:hover{translate:0 -4px;box-shadow:0 18px 34px -22px var(--cc)}


/* section pages */
.cg-shero{position:relative;overflow:hidden;isolation:isolate;border-radius:26px;padding:24px 26px 20px;margin:4px 0 16px;color:#fff;background:linear-gradient(125deg,var(--cc),color-mix(in srgb,var(--cc) 50%,var(--cl)) 55%,var(--cl));box-shadow:0 26px 50px -32px var(--cc)}
.cg-shero:after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(420px 220px at 90% 10%,rgba(255,255,255,.25),transparent 60%),radial-gradient(300px 200px at 0% 100%,rgba(0,0,0,.18),transparent 60%)}
.cg-shero .top,.cg-shero .top>div{display:flex;gap:16px;align-items:center}
.cg-shero .sico{width:64px!important;height:64px!important;border-radius:20px!important;margin:0!important;flex:none;background:rgba(255,255,255,.2)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)!important;animation:cgBob 5s ease-in-out infinite}
.cg-shero .subhero-ic{float:none!important;margin:0!important}
.cg-shero .sico svg{width:34px!important;height:34px!important}
.cg-shero h2{margin:0!important;color:#fff!important;font:900 clamp(28px,4.4vw,46px)/1.05 var(--disp)!important;letter-spacing:-.02em;border:0!important;padding:0!important}
.cg-shero p.subd{margin:8px 0 14px!important;color:#fff!important;opacity:.93;font:600 15px/1.45 system-ui,sans-serif!important}
.cg-shero p.subd a{color:#fff!important;text-decoration:underline}
.cg-st{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.cg-st span{padding:7px 12px;border-radius:14px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);font:700 12.5px system-ui,sans-serif}
.cg-st b{font:900 16px var(--disp);margin-right:4px}
.cg-tl{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.cg-tl label{flex:1 1 260px;position:relative}
.cg-tl input{width:100%;box-sizing:border-box;padding:12px 14px 12px 42px!important;border-radius:14px!important;border:1px solid rgba(255,255,255,.5)!important;background:rgba(255,255,255,.93)!important;color:#111!important;font:600 15px system-ui,sans-serif!important;outline:none}
.cg-tl label svg{position:absolute;left:14px;top:50%;translate:0 -50%;width:18px;height:18px;color:var(--cc)}
.cg-tl select{padding:11px 12px;border-radius:13px;border:0;font:700 13.5px system-ui,sans-serif;background:rgba(255,255,255,.93);color:#111}
.cg-tl button{border:0;cursor:pointer;padding:11px 14px;border-radius:13px;font:800 13.5px var(--disp);background:#fff;color:var(--cc);box-shadow:0 10px 20px -12px rgba(0,0,0,.5);transition:transform .2s}
.cg-tl button:hover{transform:rotate(-3deg) scale(1.05)}
#v.cgon .acards{gap:18px}
#v.cgon .acards .card{position:relative;border-radius:22px!important;overflow:hidden;background:color-mix(in srgb,var(--sf) 60%,transparent)!important;backdrop-filter:blur(18px) saturate(1.6);-webkit-backdrop-filter:blur(18px) saturate(1.6);border:1px solid color-mix(in srgb,#fff 50%,transparent)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 18px 40px -28px color-mix(in srgb,var(--cc) 70%,#000);transition:translate .35s cubic-bezier(.2,1.2,.4,1),box-shadow .35s!important;transform:none!important;animation:cgIn .5s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--k,0)*35ms)}
:root[data-theme=dark] #v.cgon .acards .card{border-color:rgba(255,255,255,.09)!important;box-shadow:0 20px 44px -26px rgba(0,0,0,.8)}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #v.cgon .acards .card{border-color:rgba(255,255,255,.09)!important;box-shadow:0 20px 44px -26px rgba(0,0,0,.8)}}
@keyframes cgIn{from{opacity:0;transform:translateY(14px)}}
#v.cgon .acards .card:hover{translate:0 -7px;box-shadow:0 28px 50px -24px var(--cc)}
#v.cgon .acards .card .ban{height:160px!important;overflow:hidden}
#v.cgon .acards .card .ban img{transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
#v.cgon .acards .card:hover .ban img{transform:scale(1.09)}
#v.cgon .acards .card:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.26) 48%,transparent 60%);transform:translateX(-120%)}
#v.cgon .acards .card:hover:after{transform:translateX(120%);transition:transform 1s cubic-bezier(.22,1,.36,1)}
#v.cgon .acards .card .t em{display:inline-block!important;padding:3px 9px;border-radius:99px;background:color-mix(in srgb,var(--cc) 14%,transparent);letter-spacing:.02em!important;text-transform:none!important}
#v.cgon .acards .card.rd:before{content:"✓ Read";position:absolute;top:10px;right:10px;z-index:3;padding:4px 9px;border-radius:99px;font:800 11px system-ui,sans-serif;color:#fff;background:rgba(16,185,129,.92)}
#v.cgon .acards .card.cg-hide{display:none}
#v.cgon .pn{display:flex;justify-content:space-between;gap:10px}
#v.cgon .pn .btn{border-radius:14px!important;padding:11px 16px!important;background:color-mix(in srgb,var(--sf) 60%,transparent)!important;backdrop-filter:blur(12px);border:1px solid var(--bd)!important;transition:transform .2s,box-shadow .2s}
#v.cgon .pn .btn:hover{transform:translateY(-2px);box-shadow:0 12px 24px -16px var(--cc)}
#v.cgon .subjump a.on{background:var(--cc)!important;color:#fff!important}
@media (max-width:640px){.cg-shero{padding:20px 16px 16px;border-radius:22px}.cg-shero .sico{width:50px!important;height:50px!important}}
@media (prefers-reduced-motion:reduce){#v.cgon .acards .card{animation:none}.cg-shero .sico{animation:none}}

@media (max-width:640px){.cg-aura i{width:340px!important;height:340px!important}#v.cgon .featrow .card .ban{height:140px!important}#v.cgon .sthead .ban{height:150px!important}}
@media (pointer:coarse){.cg-aura i{animation:none!important;filter:blur(40px)}}
@media (prefers-reduced-motion:reduce){.cg-aura i,#v.cgon .sthead .sico{animation:none!important}#v.cgon .subtile.cgw li{opacity:1;translate:none}#v.cgon .featrow .card:after{display:none}}
`;
const st=document.createElement("style");st.id="catglasscss";st.textContent=css;document.head.appendChild(st);
const V=document.getElementById("v");
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
let io=null;

function secHero(){const h2=V.querySelector("h2.atitle"),p=V.querySelector("p.subd"),ic=V.querySelector(".subhero-ic"),grid=V.querySelector(".acards");if(!h2||!grid)return;
  const cards=[...grid.querySelectorAll(".card")];const rd=new Set((()=>{try{return JSON.parse(localStorage.rd||"[]")}catch(e){return[]}})());
  let mins=0;cards.forEach((c,i)=>{c.style.setProperty("--k",Math.min(i,16));c.dataset.o=i;const id=(c.getAttribute("href")||"").split("/").pop();if(rd.has(id))c.classList.add("rd");const m=parseInt((c.querySelector(".t em")||{}).textContent)||0;c.dataset.m=m;mins+=m;c.dataset.t=((c.querySelector("b")||{}).textContent||"").toLowerCase()});
  const nr=cards.filter(c=>c.classList.contains("rd")).length;
  const hero=document.createElement("section");hero.className="cg-shero";hero.innerHTML=`<div class="top"></div><div class="cg-st"><span><b>${cards.length}</b>articles</span><span><b>${mins}</b>minutes of reading</span><span><b>${nr}</b>read</span></div>
  <div class="cg-tl"><label><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input type="search" placeholder="Filter this section…" aria-label="Filter this section"></label>
  <select aria-label="Sort"><option value="o">Suggested order</option><option value="az">A to Z</option><option value="short">Quickest reads</option><option value="long">Longest reads</option><option value="unread">Unread first</option></select><button type="button">🎲 Random pick</button></div>`;
  h2.before(hero);const top=hero.querySelector(".top");if(ic)top.appendChild(ic);const tw=document.createElement("div");tw.appendChild(h2);top.appendChild(tw);if(p)hero.insertBefore(p,hero.querySelector(".cg-st"));
  const inp=hero.querySelector("input"),sel=hero.querySelector("select");
  inp.oninput=()=>{const q=inp.value.trim().toLowerCase();cards.forEach(c=>c.classList.toggle("cg-hide",!!q&&!c.dataset.t.includes(q)))};
  sel.onchange=()=>{const v=sel.value,arr=[...cards];arr.sort((a,b)=>v=="az"?a.dataset.t.localeCompare(b.dataset.t):v=="short"?a.dataset.m-b.dataset.m:v=="long"?b.dataset.m-a.dataset.m:v=="unread"?(a.classList.contains("rd")-b.classList.contains("rd"))||a.dataset.o-b.dataset.o:a.dataset.o-b.dataset.o);arr.forEach((c,i)=>{c.style.setProperty("--k",Math.min(i,16));c.style.animation="none";void c.offsetWidth;c.style.animation="";grid.appendChild(c)})};
  hero.querySelector("button").onclick=()=>{const vis=cards.filter(c=>!c.classList.contains("cg-hide"));if(vis.length)location.hash=vis[Math.floor(Math.random()*vis.length)].getAttribute("href")};
  const sj=V.querySelector(".subjump");if(sj){const cur=decodeURIComponent(location.hash.split("/")[3]||"");sj.querySelectorAll("a").forEach(a=>{if(decodeURIComponent((a.getAttribute("href")||"").split("/")[3]||"")==cur)a.classList.add("on")})}}
function apply(){
  const on=/^#\/cat\//.test(location.hash)&&!!V.querySelector(".opener,.subtiles,.featrow,.acards");
  V.classList.toggle("cgon",on);
  if(!on)return;
  if(V.querySelector(".acards")&&!V.querySelector(".cg-shero"))secHero();
  if(!V.querySelector(":scope>.cg-aura"))V.insertAdjacentHTML("afterbegin",'<div class="cg-aura" aria-hidden="true"><i></i><i></i><i></i><i></i></div>');
  const cat=decodeURIComponent((location.hash.split("/")[2]||""));const S=(window.SUBJ||{})[cat];
  V.querySelectorAll(".subtile:not([data-cg])").forEach((t,k)=>{t.dataset.cg=1;const ic=t.querySelector(".sthead .sico");ic&&ic.style.setProperty("--k",k);
    t.querySelectorAll("li").forEach((li,i)=>li.style.setProperty("--i",i));
    const h=t.querySelector(".sthead");const name=decodeURIComponent((h&&h.getAttribute("href")||"").split("/")[3]||"");
    const sec=S&&(S.subs||[]).find(x=>x.n==name);if(sec&&h){const n=(sec.ids||[]).length;h.insertAdjacentHTML("beforeend",`<em class="cg-n">${n} article${n==1?"":"s"}</em>`)}
    if(!RM.matches&&"IntersectionObserver" in window){t.classList.add("cgw");io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("cgin");io.unobserve(e.target)}}),{threshold:.15});io.observe(t)}});
  if(fine)V.querySelectorAll(".featrow .card:not([data-cg])").forEach(c=>{c.dataset.cg=1;c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
}
new MutationObserver(()=>apply()).observe(V,{childList:true});
addEventListener("hashchange",()=>setTimeout(apply,30));
const start=()=>apply();if(document.readyState=="complete")start();else addEventListener("load",start);
})();
