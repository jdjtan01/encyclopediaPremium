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

@media (max-width:640px){.cg-aura i{width:340px!important;height:340px!important}#v.cgon .featrow .card .ban{height:140px!important}#v.cgon .sthead .ban{height:150px!important}}
@media (prefers-reduced-motion:reduce){.cg-aura i,#v.cgon .sthead .sico{animation:none!important}#v.cgon .subtile.cgw li{opacity:1;translate:none}#v.cgon .featrow .card:after{display:none}}
`;
const st=document.createElement("style");st.id="catglasscss";st.textContent=css;document.head.appendChild(st);
const V=document.getElementById("v");
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
let io=null;
function apply(){
  const on=/^#\/cat\//.test(location.hash)&&!!V.querySelector(".opener,.subtiles,.featrow");
  V.classList.toggle("cgon",on);
  if(!on)return;
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
