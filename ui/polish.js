// Visual polish (v160): photo-less article portraits, header and jump bar, consistent hover and press effects, loading shimmer, sentence-case labels.
(function(){
if(typeof R=="undefined")return;
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const LABELS=[".acard .t em",".acotd small",".alg .alh",".anb dt",".atl-info dt",".aw small",".bk-rh",".book .bk-cover small",".brief .bh",".cl1 b",".cmp>b",".cover .mast small",".cover .tile span",".cstat small",".csub",".csubs h4",".edbox small",".fc small",".ffile dt",".gcard em",".gsteps em",".htext small",".ixl .ty",".kf dt",".kf h4",".lochd",".mast2 small",".mh2",".opener small",".panelx>.hd",".phtl h3",".pron b",".runhead",".st-t em",".tab",".tlera",".upnext small"];
const css=`
/* 8. Sentence-case labels instead of all caps */
${LABELS.join(",")}{text-transform:none!important;letter-spacing:.015em!important}
.body h3.sh{margin-top:3.4rem}
/* 6. Header: clean frosted glass and a fix for duplicate page-transition names */
header{view-transition-name:none}
body>header{view-transition-name:site-header;background:color-mix(in srgb,var(--bg) 82%,transparent)!important;backdrop-filter:blur(18px) saturate(1.7);-webkit-backdrop-filter:blur(18px) saturate(1.7);border-bottom:1px solid transparent!important;box-shadow:0 1px 0 color-mix(in srgb,var(--bd) 80%,transparent)}
body>header:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:linear-gradient(90deg,transparent,var(--cc,#7c3aed) 30%,#f97316 50%,var(--cc,#7c3aed) 70%,transparent);opacity:.55;pointer-events:none}
html[data-vt=theme] body>header{view-transition-name:none!important}
/* Jump bar: a floating tray of chips instead of a full-width band */
.hjump{background:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-bottom:0!important;box-shadow:none!important;padding:10px 0!important;margin:0 0 14px!important;pointer-events:none}
.hjump ul{pointer-events:auto;width:fit-content;max-width:100%;padding:5px;border-radius:999px;background:color-mix(in srgb,var(--sf) 86%,transparent);backdrop-filter:blur(14px) saturate(1.5);-webkit-backdrop-filter:blur(14px) saturate(1.5);border:1px solid var(--bd);transition:box-shadow .3s}
.hjump.stuck ul{box-shadow:0 14px 30px -18px rgba(0,0,0,.55)}
.hjump a{border-color:transparent!important;background:transparent!important;transition:background .25s,color .25s,translate .2s!important}
.hjump a:hover{background:var(--sf2)!important}
.hjump a[aria-current=true]{background:var(--hd)!important;color:var(--bg)!important;box-shadow:0 4px 12px -4px rgba(0,0,0,.4)}
/* Hero subject cards: the active card's timer traces the card's outline instead of a flat white strip */
@property --sxp{syntax:"<percentage>";inherits:false;initial-value:0%}
#v .sx-c i.bar{position:absolute;inset:0;margin:0!important;width:auto!important;height:auto!important;border-radius:inherit;padding:2px;z-index:3;pointer-events:none;opacity:0;animation:none;
background:conic-gradient(from 0deg,rgba(255,255,255,.95) 0 var(--sxp),rgba(255,255,255,.16) var(--sxp) 100%);
-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
filter:drop-shadow(0 0 3px rgba(255,255,255,.8)) drop-shadow(0 0 8px var(--l));transition:opacity .4s ease}
#v .sx-c.on i.bar{opacity:1;animation:sxring var(--cyc,5s) linear forwards}
#v .sx.paused .sx-c.on i.bar{animation:none;--sxp:100%}
@keyframes sxring{from{--sxp:0%}to{--sxp:100%}}
#v .sx-c.on{box-shadow:0 18px 32px -14px var(--c),0 0 26px -8px var(--l)!important}
@media (prefers-reduced-motion:reduce){#v .sx-c.on i.bar{animation:none;--sxp:100%}}
/* Hero subject cards: frosted glass over a blurred photo from the subject */
#v .sx-c{background:linear-gradient(150deg,var(--l) -20%,var(--c) 60%,color-mix(in srgb,var(--c) 60%,#000))}
#v .sx-c .sxg{position:absolute;inset:0;z-index:-2;pointer-events:none;overflow:hidden;border-radius:inherit}
#v .sx-c .sxg .ban{position:absolute!important;inset:-10px;height:auto!important;font-size:0!important;background:none!important;margin:0!important}
#v .sx-c .sxg .ban:after{display:none!important}
#v .sx-c .sxg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(3px) saturate(1.2);transform:scale(1.06);opacity:0;transition:opacity .8s ease,transform 1.2s cubic-bezier(.22,1,.36,1),filter .6s ease}
#v .sx-c .sxg img.ld{opacity:1}
#v .sx-c:hover .sxg img,#v .sx-c.on .sxg img{transform:scale(1.14);filter:blur(1px) saturate(1.35)}
#v .sx-c .sxg:after{content:"";position:absolute;inset:0;background:
linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0) 38%),
linear-gradient(160deg,color-mix(in srgb,var(--l) 55%,transparent) -10%,color-mix(in srgb,var(--c) 68%,transparent) 48%,color-mix(in srgb,var(--c) 55%,#05030f) 100%);
backdrop-filter:blur(1px)}
#v .sx-c:not(.on){box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 0 0 1px rgba(255,255,255,.22),0 10px 22px -12px var(--c)!important}
/* Article "More" menu: float above the header instead of being clipped by it */
#amn.amfix{position:fixed!important;top:0;left:0;margin:0!important;z-index:1200!important;max-height:calc(100vh - 24px);overflow:auto;transform-origin:top left;animation:amIn .22s cubic-bezier(.2,1.2,.4,1) both;
background:color-mix(in srgb,var(--sf) 92%,transparent)!important;backdrop-filter:blur(16px) saturate(1.5);-webkit-backdrop-filter:blur(16px) saturate(1.5);border-radius:16px!important;box-shadow:0 24px 50px -18px rgba(0,0,0,.55),0 0 0 1px var(--bd)!important;border:0!important}
#amn.amfix.up{transform-origin:bottom left}
#amn.amfix .mi{border-radius:10px!important;transition:background .15s,translate .15s}
#amn.amfix .mi:hover{translate:3px 0}
@keyframes amIn{from{opacity:0;transform:translateY(-6px) scale(.96)}}
@media (prefers-reduced-motion:reduce){#amn.amfix{animation:none}}
/* Random button lives in the More menu now */
header #rnd{display:none!important}
/* 7. Consistent hover lift and press */
.stile,.card,.acard,.gcard,.arail .rl,.afin .fb,.lab-more a,.bento .panel,.pk-tr{transition:translate .25s cubic-bezier(.3,1.3,.5,1),box-shadow .25s,opacity .8s cubic-bezier(.2,.8,.2,1),transform .9s cubic-bezier(.2,.8,.2,1)}
.stile:hover,.card:hover,.acard:hover,.gcard:hover,.afin .fb:hover,.pk-tr:hover{translate:0 -4px;box-shadow:0 18px 34px -20px rgba(0,0,0,.45)}
.arail .rl:hover{translate:3px 0}
.bento .panel:hover{translate:0 -3px}
button,.btn,a.go,.sb,.chip{transition:transform .12s ease,background .2s,box-shadow .2s,color .2s}
button:active:not(:disabled),.btn:active,a.go:active,.chip:active{transform:scale(.95)}
/* Loading shimmer while a photo downloads */
.ban:has(>img:not(.ld)):after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);background-size:220% 100%;animation:plshim 1.3s linear infinite;pointer-events:none;z-index:3}
@keyframes plshim{from{background-position:120% 0}to{background-position:-120% 0}}
/* 1. Portraits for articles without a photo */
.hero .ban.big.ban-fb{font-size:0!important}
.hero .ban.big img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}
.pf{position:absolute;inset:0;z-index:1;display:grid;place-items:center;overflow:hidden;color:#fff}
.pf-pat{position:absolute;inset:-40px;background-image:radial-gradient(rgba(255,255,255,.18) 1.4px,transparent 1.6px),radial-gradient(rgba(255,255,255,.08) 1.4px,transparent 1.6px);background-size:22px 22px,22px 22px;background-position:0 0,11px 11px;animation:pfdrift 24s linear infinite;mask-image:radial-gradient(ellipse at 50% 45%,#000 30%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse at 50% 45%,#000 30%,transparent 80%)}
@keyframes pfdrift{to{transform:translate(22px,22px)}}
.pf-glow{position:absolute;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.28),transparent 65%);top:-20%;right:-15%;animation:pfglow 7s ease-in-out infinite alternate}
@keyframes pfglow{to{transform:translate(-30%,25%) scale(1.15)}}
.pf-in{position:relative;display:flex;flex-direction:column;align-items:center;gap:14px;animation:pfin .7s cubic-bezier(.2,1.2,.4,1) both}
@keyframes pfin{from{opacity:0;transform:translateY(14px) scale(.96)}}
.pf-ring{position:relative;width:132px;height:132px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35),0 20px 40px -18px rgba(0,0,0,.6)}
.pf-ring:before{content:"";position:absolute;inset:-6px;border-radius:50%;padding:3px;background:conic-gradient(from var(--pfa,0deg),rgba(255,255,255,.95),rgba(255,255,255,.1) 40%,rgba(255,255,255,.95) 70%,rgba(255,255,255,.1));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:pfspin 6s linear infinite}
@property --pfa{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes pfspin{to{--pfa:360deg}}
.pf-mono{font:900 52px/1 var(--disp);letter-spacing:-.02em;text-shadow:0 4px 18px rgba(0,0,0,.25)}
.pf-ring .pf-big{font-size:62px;line-height:1}
.pf-emo{position:absolute;right:-6px;bottom:-4px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:rgba(255,255,255,.95);box-shadow:0 8px 18px -8px rgba(0,0,0,.5)}
.pf-cap{text-align:center;line-height:1.2}
.pf-cap b{display:block;font:800 1.35rem var(--disp);letter-spacing:-.01em;text-shadow:0 2px 12px rgba(0,0,0,.25)}
.pf-cap span{display:inline-block;margin-top:8px;padding:5px 12px;border-radius:99px;background:rgba(0,0,0,.22);font:700 .85rem/1 system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.02em;backdrop-filter:blur(4px)}
.arail .rpic:not(:has(img)){display:none}
@media (max-width:640px){.pf-ring{width:104px;height:104px}.pf-mono{font-size:40px}.pf-ring .pf-big{font-size:48px}.pf-cap b{font-size:1.1rem}}
@media (prefers-reduced-motion:reduce){.pf-pat,.pf-glow,.pf-in,.pf-ring:before,.ban:has(>img:not(.ld)):after{animation:none!important}.stile,.card,.acard,.gcard,.arail .rl,.afin .fb,.lab-more a,.bento .panel,.pk-tr{transition:none}}
`;
const st=document.createElement("style");st.id="polishcss";st.textContent=css;document.head.appendChild(st);
const yr=s=>{if(!s)return"";const m=String(s).match(/(c\.\s*)?(\d{3,4}|\d{1,2}(?=\s*(?:BCE|BC)))(\s*(BCE|BC))?/);return m?(m[1]?"c. ":"")+m[2]+(m[4]?" BCE":""):""};
const initials=t=>{const w=String(t).replace(/^The\s+/,"").replace(/\s*\(.*\)/,"").split(/[\s-]+/).filter(x=>/^[A-ZÀ-Ý]/.test(x));if(!w.length)return"";return(w[0][0]+(w.length>1?w[w.length-1][0]:"")).toUpperCase()};
function portrait(id){const a=get(id);if(!a)return;const ban=V.querySelector(".hero .ban.big");if(!ban||ban.querySelector(".pf"))return;
const P=(window.PEOPLE||[]).find(x=>x.id==id),isP=!!P||a.c=="People"||a.oc=="People";
let cap="";if(P){const b=yr(P.born),d=yr(P.died);cap=b&&d?`${b} – ${d}`:b?`Born ${b}`:""}else if(a.d&&a.d.length){cap=a.c||""}else cap=a.c||"";
const mono=isP?initials(a.t):"";
ban.classList.add("ban-fb");
ban.insertAdjacentHTML("afterbegin",`<div class="pf"><div class="pf-pat"></div><div class="pf-glow"></div><div class="pf-in"><div class="pf-ring">${mono?`<span class="pf-mono">${esc(mono)}</span><span class="pf-emo">${a.i||""}</span>`:`<span class="pf-big">${a.i||""}</span>`}</div><div class="pf-cap"><b>${esc(a.t)}</b>${cap?`<span>${esc(cap)}</span>`:""}</div></div></div>`)}

function glass(){if(typeof SUBJ=="undefined"&&!window.SUBJ)return;const S=window.SUBJ||{};const need=[];
document.querySelectorAll("#v .sx-c:not([data-g])").forEach(c=>{c.dataset.g=1;const n=c.dataset.c,s=S[n];if(!s)return;const f=(s.feat||[]).map(get).find(Boolean);if(!f)return;
c.insertAdjacentHTML("afterbegin",`<span class="sxg" aria-hidden="true">${ban(f)}</span>`);need.push(f)});if(need.length&&typeof want=="function")want(need)}
function hookHome(){const prev=R.home;if(prev.__gl)return;R.home=function(){prev.apply(this,arguments);try{glass();setTimeout(glass,400)}catch(e){console.error("glass",e)}};R.home.__gl=1;try{glass()}catch(e){}}

/* keep the article More menu outside the clipped header */
let amHome=null;
function placeMenu(){const b=document.getElementById("amb"),m=document.getElementById("amn");if(!b||!m)return;
if(m.hidden){m.classList.remove("amfix","up");if(m.parentElement==document.body){const h=b.closest(".amore");h?h.appendChild(m):m.remove()}return}
if(m.parentElement!=document.body){amHome=m.parentElement;document.body.appendChild(m)}
m.classList.add("amfix");const r=b.getBoundingClientRect(),mw=m.offsetWidth,mh=m.offsetHeight,vw=innerWidth,vh=innerHeight;
let x=Math.min(r.left,vw-mw-12);x=Math.max(12,x);const below=vh-r.bottom-18,above=r.top-18;const up=mh>below&&below<220&&above>below;m.style.maxHeight=Math.max(160,up?above:below)+"px";const h=Math.min(mh,up?above:below);let y=up?r.top-6-h:r.bottom+6;m.classList.toggle("up",up);m.style.left=x+"px";m.style.top=y+"px"}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#amb,#amn"))requestAnimationFrame(placeMenu);else setTimeout(placeMenu,300)},true);
addEventListener("scroll",()=>{const m=document.getElementById("amn");if(m&&!m.hidden)placeMenu()},{passive:true});addEventListener("resize",placeMenu);addEventListener("hashchange",()=>{document.querySelectorAll("body>#amn").forEach(x=>x.remove())});
function hook(){hookHome();const prev=R.art;if(prev.__pl)return;R.art=function(id){prev.apply(this,arguments);try{portrait(id)}catch(e){console.error("polish",e)}};R.art.__pl=1;try{if(window.curArt)portrait(window.curArt)}catch(e){}}
const start=()=>setTimeout(hook,0);if(document.readyState=="complete")start();else addEventListener("load",start);
})();
