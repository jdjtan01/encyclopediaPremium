/* Article redesign: cinematic header, pill buttons, numbered section headings, comfortable typography,
   pull quote, big figure, Did-you-know card, soft reveals, framed pictures, distinct boxes,
   a clean progress-line table of contents (single highlight; floating button on phones),
   a right-hand rail on wide screens and a richer ending. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const V=document.getElementById("v");
const E="cubic-bezier(.22,1,.36,1)";
const css=`
/* ---------- header ---------- */
.ahx{position:relative;isolation:isolate;overflow:hidden;border-radius:28px;margin:0 0 18px;padding:26px 30px 24px;color:#fff;min-height:210px;display:flex;flex-direction:column;justify-content:flex-end;
background:linear-gradient(135deg,var(--a1),color-mix(in srgb,var(--a1) 55%,#000));box-shadow:0 30px 60px -34px var(--a1)}
.ahx .ahbg{position:absolute;inset:-30px;z-index:-2;background-size:cover;background-position:center;filter:blur(22px) saturate(1.3);opacity:.75;transform:scale(1.1);animation:ahz 18s ease-in-out infinite alternate}
@keyframes ahz{to{transform:scale(1.22) translate(-2%,1%)}}
.ahx:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,color-mix(in srgb,var(--a1) 92%,#000) 0%,color-mix(in srgb,var(--a1) 70%,transparent) 55%,transparent 100%),linear-gradient(0deg,rgba(0,0,0,.35),transparent 60%)}
.ahx .ahart{position:absolute;right:26px;top:50%;width:min(170px,26%);transform:translateY(-50%);z-index:-1;opacity:.95;filter:drop-shadow(0 18px 30px rgba(0,0,0,.35));animation:ahf 6s ease-in-out infinite alternate}
@keyframes ahf{to{transform:translateY(calc(-50% - 10px)) rotate(3deg)}}
.ahx .runhead{margin:0 0 6px!important;color:#fff!important}.ahx .runhead *{color:rgba(255,255,255,.88)!important}.ahx .runhead:after,.ahx .runhead span,.ahx .runhead small{display:none!important}
.ahx .runhead nav{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ahx .runhead a{display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.16);text-decoration:none;font:700 12px system-ui,sans-serif;letter-spacing:.02em;text-transform:none}
.ahx .runhead i{opacity:.6}
.ahx .atitle{color:#fff!important;-webkit-text-fill-color:#fff;background:none!important;margin:2px 0 4px!important;font:900 clamp(38px,5.6vw,68px)/1.02 var(--disp)!important;letter-spacing:-.035em;text-shadow:0 4px 24px rgba(0,0,0,.35);max-width:78%}
.ahx p.mu{color:rgba(255,255,255,.88)!important;margin:2px 0 12px!important;font:600 14px system-ui,sans-serif!important}.ahx p.mu a{color:#fff!important}
.ahx .atools{margin:0!important;display:flex;flex-wrap:wrap;gap:8px}
.ahx .atools>.btn,.ahx .amore>.btn{border:0!important;border-radius:999px!important;padding:9px 16px!important;font:800 14px var(--disp)!important;color:var(--a1)!important;background:#fff!important;box-shadow:0 8px 18px -10px rgba(0,0,0,.5);transition:transform .35s ${E},box-shadow .35s}
.ahx .atools>.btn:hover,.ahx .amore>.btn:hover{transform:translateY(-2px);box-shadow:0 14px 24px -12px rgba(0,0,0,.6)}
.ahx .atools>.btn:active{transform:scale(.95)}
.ahx #sp.talking{background:linear-gradient(90deg,#db2777,#7c3aed)!important;color:#fff!important}
.ahx .amenu{color:var(--tx)}
@media (max-width:640px){.ahx{padding:18px 18px 18px;border-radius:22px;min-height:180px}.ahx .atitle{max-width:100%;font-size:34px!important}.ahx .ahart{width:110px;top:auto;bottom:-14px;right:-10px;transform:none;opacity:.22;animation:none}}
.ahx>*:not(.ahbg):not(.ahart){animation:ahin .8s ${E} both}.ahx .atitle{animation-delay:.08s}.ahx p.mu{animation-delay:.16s}.ahx .atools{animation-delay:.24s}
@keyframes ahin{from{opacity:0;transform:translateY(16px)}}
/* ---------- typography ---------- */
.body{max-width:700px}
.body>p,.body>section>p{line-height:1.78}
.body .lead{font-size:1.12em;line-height:1.7}
.lead::first-letter{color:var(--a1)!important;font-size:72px!important;text-shadow:0 6px 18px color-mix(in srgb,var(--a1) 35%,transparent)}
.body a.xl{text-decoration-color:color-mix(in srgb,var(--a1) 55%,transparent)!important}
/* ---------- section headings ---------- */
.body h3.sh{display:flex;align-items:center;gap:12px;border:0!important;padding:0!important;margin:2.1em 0 .7em!important;font:900 clamp(21px,2.2vw,26px)/1.2 var(--disp)!important;letter-spacing:-.01em;position:relative}
.body h3.sh:before{display:none!important}
.body h3.sh2 .shn{font-size:17px}
.body h3.sh .shn{flex:none;display:grid;place-items:center;width:38px;height:38px;border-radius:12px;color:#fff;font:900 15px var(--disp);background:linear-gradient(140deg,color-mix(in srgb,var(--a1) 65%,#fff),var(--a1));box-shadow:0 8px 16px -8px var(--a1)}
.body h3.sh:after{content:"";position:absolute;left:50px;bottom:-8px;height:4px;width:70px;border-radius:4px;background:linear-gradient(90deg,var(--a1),color-mix(in srgb,var(--a1) 30%,#ffd23f));transform-origin:left;transform:scaleX(0);transition:transform .9s ${E}}
.body h3.sh.in:after{transform:none}
/* ---------- soft reveal ---------- */
.body .rvx{opacity:0;transform:translateY(18px);transition:opacity .8s ease,transform .9s ${E}}
.body .rvx.in{opacity:1;transform:none}
/* ---------- variety ---------- */
.pq,.bigfig,.dykc,.afin{clear:both}
.pq{margin:1.8em 0;padding:6px 0 6px 26px;border-left:5px solid var(--a1);font:800 clamp(22px,2.4vw,28px)/1.35 var(--disp);letter-spacing:-.01em;color:var(--hd);position:relative}
.pq:before{content:"“";position:absolute;left:18px;top:-28px;font:900 80px/1 Georgia,serif;color:color-mix(in srgb,var(--a1) 30%,transparent)}
.bigfig{display:flex;align-items:center;gap:18px;margin:1.6em 0;padding:18px 22px;border-radius:20px;background:linear-gradient(120deg,color-mix(in srgb,var(--a1) 14%,var(--sf)),var(--sf));border:1px solid color-mix(in srgb,var(--a1) 25%,transparent)}
.bigfig b{flex:none;font:900 clamp(40px,5vw,60px)/1 var(--disp);letter-spacing:-.04em;background:linear-gradient(120deg,var(--a1),color-mix(in srgb,var(--a1) 40%,#f59e0b));-webkit-background-clip:text;background-clip:text;color:transparent}
.bigfig span{font:600 15.5px/1.45 system-ui,sans-serif;color:var(--tx)}
.dykc{margin:1.6em 0;padding:16px 20px 16px 62px;border-radius:20px;position:relative;color:#fff;background:linear-gradient(120deg,var(--a1),color-mix(in srgb,var(--a1) 55%,#7c3aed));box-shadow:0 18px 34px -22px var(--a1)}
.dykc:before{content:"💡";position:absolute;left:18px;top:14px;font-size:28px}
.dykc b{display:block;font:900 15px var(--disp);margin-bottom:3px;opacity:.9}.dykc p{margin:0!important;color:#fff!important;font:600 16px/1.5 system-ui,sans-serif!important}
@media (max-width:560px){.bigfig{flex-direction:column;align-items:flex-start;gap:6px}}
/* ---------- picture frames ---------- */
.body .panelx{border-radius:22px!important;overflow:hidden;border:1px solid color-mix(in srgb,var(--a1) 22%,var(--bd))!important;box-shadow:0 24px 44px -30px var(--a1)!important}
.body .panelx>.hd{background:linear-gradient(90deg,var(--a1),color-mix(in srgb,var(--a1) 60%,#7c3aed))!important;border:0!important}
/* ---------- distinct boxes ---------- */
.body .brief{border:0!important;border-radius:22px!important;background:linear-gradient(135deg,color-mix(in srgb,var(--a1) 10%,var(--sf)),var(--sf))!important;box-shadow:inset 4px 0 0 var(--a1)}
.body .brief .bh{color:var(--a1)!important}
.body .brief .bh:before{content:"⚡ "}
.body aside.spot{border:0!important;border-radius:22px!important;background:var(--sf)!important;box-shadow:0 0 0 1px color-mix(in srgb,#f59e0b 40%,transparent),0 18px 30px -24px #f59e0b}
.body aside.spot>small{color:#d97706!important}.body aside.spot>small:before{content:"🔦 "}
.body .fact{border:0!important;border-radius:22px!important;background:linear-gradient(135deg,color-mix(in srgb,#14b8a6 14%,var(--sf)),var(--sf))!important;box-shadow:inset 4px 0 0 #14b8a6}
.body dl.gl>div{border-radius:14px;transition:transform .3s ${E},background .3s}.body dl.gl>div:hover{transform:translateX(4px);background:color-mix(in srgb,var(--a1) 8%,transparent)}
.body dl.gl dt{color:var(--a1)!important}
/* ---------- table of contents ---------- */
.toc{border-radius:20px!important;padding:16px 16px 16px 14px!important;position:sticky}
.toc .tocm{display:none!important}
.toc>b{display:flex;align-items:center;gap:8px;font:900 15px var(--disp)!important;margin-bottom:8px}
.toc>b:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--a1)}
.toc .tline{position:absolute;left:14px;top:46px;bottom:16px;width:3px;border-radius:3px;background:var(--sf2)}
.toc .tline i{position:absolute;left:0;top:0;width:100%;height:var(--tp,0%);border-radius:3px;background:linear-gradient(var(--a1),color-mix(in srgb,var(--a1) 40%,#ffd23f));transition:height .3s ease}
.toc button.lk{position:relative;display:block;width:100%;text-align:left;padding:5px 8px 5px 18px!important;margin:1px 0;border-radius:10px;border-left:0!important;font-weight:500!important;color:var(--mu);transition:background .3s,color .3s,transform .3s ${E}}
.toc button.lk:hover{color:var(--hd);transform:translateX(3px)}
.toc button.lk.on,.toc button.lk.cur{background:color-mix(in srgb,var(--a1) 13%,transparent)!important;color:var(--hd)!important;font-weight:800!important;box-shadow:none!important}
.toc button.lk.cur:not(.on){background:none!important;font-weight:500!important;color:var(--mu)!important}
.toc button.lk.on:before{content:"";position:absolute;left:-7px;top:50%;width:11px;height:11px;margin-top:-5.5px;border-radius:50%;background:var(--a1);box-shadow:0 0 0 3px var(--sf),0 0 12px var(--a1)}
.tocfab{display:none}
@media (max-width:899px){.row>.toc{display:none!important}
.tocfab{display:inline-flex;align-items:center;gap:8px;position:fixed;left:50%;bottom:18px;transform:translateX(-50%) translateY(90px);z-index:57;padding:11px 18px;border:0;border-radius:999px;color:#fff;font:800 14px var(--disp);background:linear-gradient(90deg,var(--a1),color-mix(in srgb,var(--a1) 55%,#7c3aed));box-shadow:0 14px 30px -12px rgba(0,0,0,.6);transition:transform .45s ${E}}
.tocfab.on{transform:translateX(-50%)}
.tocsheet{position:fixed;left:0;right:0;bottom:0;z-index:301;max-height:72vh;overflow:auto;padding:8px 14px 22px;border-radius:24px 24px 0 0;background:var(--sf);box-shadow:0 -20px 50px -10px rgba(0,0,0,.5);animation:shUp .35s ${E}}
.tocsheet .grab{display:block;width:44px;height:5px;border-radius:5px;background:var(--bd);margin:4px auto 10px}
.tocsheet button{display:block;width:100%;text-align:left;border:0;background:none;padding:11px 10px;border-radius:12px;font:600 15.5px system-ui,sans-serif;color:var(--tx)}
.tocsheet button.on{background:color-mix(in srgb,var(--a1) 14%,transparent);color:var(--hd);font-weight:800}}
/* ---------- right rail ---------- */
.arail{display:none}
@media (min-width:1440px){#v.has-rail{max-width:1360px}
.arail{display:flex;flex-direction:column;gap:14px;flex:0 0 240px;align-self:flex-start;position:sticky;top:76px;max-height:calc(100vh - 96px);overflow:auto;scrollbar-width:thin}
.arail .rc{border-radius:20px;background:var(--sf);border:1px solid var(--bd);overflow:hidden}
.arail .rc h4{margin:0;padding:12px 14px 6px;font:900 14px var(--disp);color:var(--hd)}
.arail .rpic{position:relative;height:140px}.arail .rpic .ban{position:absolute!important;inset:0;height:100%!important;font-size:48px;display:grid;place-items:center}.arail .rpic .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.arail dl{margin:0;padding:4px 14px 12px;display:grid;gap:8px}.arail dt{font:700 11.5px system-ui;color:var(--mu)}.arail dd{margin:0;font:700 14px/1.3 var(--disp);color:var(--hd)}
.arail .rl a{display:flex;align-items:center;gap:10px;padding:7px 12px;text-decoration:none;color:var(--tx);font:700 13.5px/1.25 system-ui,sans-serif;transition:background .25s}
.arail .rl a:hover{background:color-mix(in srgb,var(--a1) 10%,transparent)}
.arail .rl .th{position:relative;flex:none;width:40px;height:40px;border-radius:10px;overflow:hidden}.arail .rl .th .ban{position:absolute!important;inset:0;height:100%!important;font-size:20px;display:grid;place-items:center}.arail .rl .th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.arail .rl{padding-bottom:8px}}
/* ---------- ending ---------- */
.body .seealso{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.body .seealso a{border-radius:18px!important;overflow:hidden;transition:transform .4s ${E},box-shadow .4s ${E}}
.body .seealso a:hover{transform:translateY(-5px);box-shadow:0 22px 34px -20px var(--a1)}
.body .seealso a .ban img{transition:transform 1.2s ${E}}.body .seealso a:hover .ban img{transform:scale(1.08)}
.afin{position:relative;overflow:hidden;margin:2em 0 1.4em;padding:24px 24px 22px;border-radius:24px;color:#fff;background:linear-gradient(120deg,var(--a1),color-mix(in srgb,var(--a1) 50%,#7c3aed));box-shadow:0 26px 50px -28px var(--a1)}
.afin h3{margin:0 0 4px!important;color:#fff!important;border:0!important;padding:0!important;font:900 clamp(22px,2.6vw,30px)/1.15 var(--disp)!important}.afin h3:before{display:none!important}
.afin p{margin:0 0 14px!important;color:rgba(255,255,255,.9)!important;font:500 15px/1.5 system-ui,sans-serif!important}
.afin .fb{display:flex;flex-wrap:wrap;gap:10px}
.afin .fb a{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:16px;background:rgba(255,255,255,.16);color:#fff;text-decoration:none;font:800 14.5px/1.2 var(--disp);transition:background .3s,transform .35s ${E}}
.afin .fb a:hover{background:rgba(255,255,255,.28);transform:translateY(-2px)}
.afin .fb .th{position:relative;flex:none;width:46px;height:46px;border-radius:12px;overflow:hidden}.afin .fb .th .ban{position:absolute!important;inset:0;height:100%!important;font-size:22px;display:grid;place-items:center}.afin .fb .th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.afin .fb small{display:block;font:600 11.5px system-ui!important;color:rgba(255,255,255,.82)!important;opacity:1}
.afin .trophy{position:absolute;right:18px;top:14px;font-size:44px;filter:drop-shadow(0 8px 14px rgba(0,0,0,.3));transform-origin:50% 90%}
.afin.go .trophy{animation:trp .9s cubic-bezier(.3,1.6,.5,1)}@keyframes trp{0%{transform:scale(0) rotate(-30deg)}100%{transform:none}}
.body .tyq{border-radius:20px}.body .tyq .opt{transition:transform .25s ${E},background .25s}.body .tyq .opt:hover{transform:translateY(-2px)}
@media (prefers-reduced-motion:reduce){.ahx *,.ahx .ahbg{animation:none!important}.body .rvx{opacity:1!important;transform:none!important}.body h3.sh:after{transform:none;transition:none}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const esc7=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const idNow=()=>{const m=location.hash.match(/^#\/art\/([^/?#]+)/);return m?decodeURIComponent(m[1]):null};
let io=null,finIO=null,tocState=null;
function build(){const id=idNow(),a=id&&get(id);if(!a||V.dataset.axd==id)return;const title=V.querySelector(".atitle"),body=V.querySelector(".body");if(!title||!body)return;V.dataset.axd=id;
const col=(CAT[a.c]||["#4f46e5","#a5b4fc"]);V.style.setProperty("--a1",col[0]);V.style.setProperty("--a2",col[1]);document.body.style.setProperty("--a1",col[0]);
/* 1-2. header */
const rh=V.querySelector(".runhead"),mu=title.nextElementSibling&&title.nextElementSibling.matches("p.mu")?title.nextElementSibling:null,tools=V.querySelector(".atools");
const hx=document.createElement("header");hx.className="ahx";const bg=document.createElement("div");bg.className="ahbg";bg.setAttribute("aria-hidden","true");hx.appendChild(bg);
if(window.subjArt){const ar=document.createElement("div");ar.className="ahart";ar.setAttribute("aria-hidden","true");ar.style.setProperty("--c",col[0]);ar.style.setProperty("--l",col[1]);ar.innerHTML=subjArt(a.c);hx.appendChild(ar)}
title.before(hx);[rh,title,mu,tools].forEach(x=>x&&hx.appendChild(x));
const himg=V.querySelector(".hero .ban.big img");const setBg=()=>{if(himg&&himg.naturalWidth)bg.style.backgroundImage=`url("${himg.currentSrc||himg.src}")`};if(himg){himg.complete?setBg():himg.addEventListener("load",setBg,{once:true})}
/* 3. section headings */
let n=0;body.querySelectorAll(":scope>h3[id]").forEach(h=>{if(!/^s\d+$/.test(h.id))return;n++;h.classList.add("sh");h.insertAdjacentHTML("afterbegin",`<span class="shn" aria-hidden="true">${n}</span>`)});
body.querySelectorAll(":scope>h3[id]:not(.sh)").forEach(h=>{const t=h.textContent.trim();const ic=/Key dates/.test(t)?"📅":/Key words/.test(t)?"🔤":/Test yourself/.test(t)?"❓":/See also/.test(t)?"🔗":/Timeline/.test(t)?"📅":"✦";h.classList.add("sh","sh2");h.insertAdjacentHTML("afterbegin",`<span class="shn" aria-hidden="true">${ic}</span>`)});
/* 4. variety: big figure, pull quote, did-you-know */
const secs=[...body.querySelectorAll(":scope>h3.sh:not(.sh2)")];const paraAfter=h=>{let e=h.nextElementSibling;while(e&&e.tagName!="P"&&e.tagName!="H3")e=e.nextElementSibling;return e&&e.tagName=="P"?e:null};
const sentences=p=>(p.textContent.match(/[^.!?]+[.!?]+/g)||[]).map(s=>s.trim());
let usedFig=null;for(const h of secs.slice(1)){const p=paraAfter(h);if(!p)continue;const strong=x=>/\b\d[\d,.]*\s*(%|percent|million|billion|trillion|times)\b/i.test(x)||(/\b(\d{1,3}(,\d{3})+|\d{3,})\b/.test(x)&&!/^\D*\b(1[0-9]{3}|20[0-9]{2})\b\D*$/.test(x));const s=sentences(p).find(x=>strong(x)&&x.length<190&&!/\b(BCE|CE)\b/.test(x));
if(s){const m=s.match(/(\d[\d,.]*\s*(%|percent|million|billion|trillion|times))/i)||s.match(/(\d{1,3}(?:,\d{3})+|\d{3,})(?!\d)/);if(m&&/^(1[0-9]{3}|20[0-9]{2})$/.test(m[1]))continue;if(m){const fig=document.createElement("div");fig.className="bigfig rvx";fig.innerHTML=`<b>${esc7(m[1].replace(/\s*percent/i,"%").trim())}</b><span>${esc7(s)}</span>`;p.after(fig);usedFig=h;break}}}
const pqH=secs[Math.min(secs.length-1,Math.max(2,Math.floor(secs.length*.45)))];if(pqH&&pqH!==usedFig){const p=paraAfter(pqH);const s=p&&sentences(p).filter(x=>x.length>50&&x.length<170).sort((x,y)=>(/\b(first|only|largest|most|never|than|even)\b/i.test(y)?1:0)-(/\b(first|only|largest|most|never|than|even)\b/i.test(x)?1:0))[0];
if(s){const q=document.createElement("blockquote");q.className="pq rvx";q.textContent=s;let at=null;for(let j=secs.indexOf(pqH)+1;j<secs.length;j++){const tp=paraAfter(secs[j]);if(tp&&!(tp.nextElementSibling&&tp.nextElementSibling.matches(".bigfig,.dykc"))&&!(tp.previousElementSibling&&tp.previousElementSibling.matches(".bigfig,.pq"))){at=tp;break}}(at||p).after(q)}}
const dyk=(window.FUN||{})[a.id];const dH=secs[Math.min(secs.length-1,Math.floor(secs.length*.75))];if(dyk&&dH&&secs.length>=4){const p=paraAfter(dH);if(p){const d=document.createElement("div");d.className="dykc rvx";d.innerHTML=`<b>Did you know?</b><p>${esc7(dyk)}</p>`;p.after(d)}}
/* 5. reveal */
if(!still){io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -5% 0px"});
body.querySelectorAll(":scope>p:not(.lead),:scope>h3.sh,:scope>.rvx,:scope>section,:scope>aside,:scope>.fact,:scope>dl").forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.9){if(!el.classList.contains("sh"))el.classList.add("rvx");io.observe(el)}else{el.classList.add("in")}})}
else body.querySelectorAll("h3.sh").forEach(h=>h.classList.add("in"));
/* 7. table of contents */
const toc=V.querySelector(".toc");if(toc){const ln=document.createElement("span");ln.className="tline";ln.setAttribute("aria-hidden","true");ln.innerHTML="<i></i>";toc.appendChild(ln);
const fab=document.createElement("button");fab.className="tocfab";fab.type="button";fab.innerHTML="☰ Contents";fab.setAttribute("aria-label","Open the table of contents");V.appendChild(fab);
fab.onclick=()=>{const bk=document.createElement("div");bk.className="apbk";const sh=document.createElement("div");sh.className="tocsheet";sh.setAttribute("role","dialog");sh.setAttribute("aria-label","Contents");
sh.innerHTML=`<span class="grab"></span>`+[...toc.querySelectorAll("button.lk")].map((b,i)=>`<button data-i="${i}" class="${b.classList.contains("on")?"on":""}">${esc7(b.textContent)}</button>`).join("");
document.body.append(bk,sh);const close=()=>{sh.remove();bk.remove()};bk.onclick=close;sh.onclick=e=>{const t=e.target.closest("button[data-i]");if(t){close();toc.querySelectorAll("button.lk")[+t.dataset.i].click()}}};
tocState={toc,ln:ln.firstChild,fab}}
/* 8. right rail */
const row=V.querySelector(".row");if(row&&!row.querySelector(".arail")){const rail=document.createElement("aside");rail.className="arail";rail.setAttribute("aria-label","On this page");
const k=(a.k||[]).slice(0,5);const rel=[...body.querySelectorAll(".seealso a")].map(x=>get((x.getAttribute("href")||"").replace("#/art/",""))).filter(Boolean).slice(0,5);
rail.innerHTML=`<div class="rc"><div class="rpic">${ban(a)}</div>${k.length?`<h4>Quick facts</h4><dl>${k.map(([l,v])=>`<div><dt>${esc7(l)}</dt><dd>${esc7(v)}</dd></div>`).join("")}</dl>`:""}</div>
${rel.length?`<div class="rc rl"><h4>Read next</h4>${rel.map(r=>`<a href="#/art/${r.id}"><span class="th">${ban(r)}</span>${esc7(r.t)}</a>`).join("")}</div>`:""}`;row.appendChild(rail);V.classList.add("has-rail");want([a,...rel])}
/* 11. ending */
const sa=[...body.querySelectorAll(":scope>h3")].find(h=>/See also/.test(h.textContent));const nextA=V.querySelector(".gbanner a[href^='#/art/']:last-of-type");
const rel2=[...body.querySelectorAll(".seealso a")].map(x=>get((x.getAttribute("href")||"").replace("#/art/",""))).filter(Boolean);
const nx=nextA?get(nextA.getAttribute("href").replace("#/art/","")):null;const picks=[...(nx?[nx]:[]),...rel2.filter(r=>r!==nx)].slice(0,3);
if(sa&&picks.length){const fin=document.createElement("section");fin.className="afin";fin.innerHTML=`<span class="trophy" aria-hidden="true">🏆</span><h3>You finished ${esc7(a.t)}!</h3><p>Nicely done. Keep exploring with one of these:</p>
<div class="fb">${picks.map((r,i)=>`<a href="#/art/${r.id}"><span class="th">${ban(r)}</span><span><small>${i==0&&nx?"Next in the reading guide":"Related"}</small>${esc7(r.t)}</span></a>`).join("")}</div>`;sa.before(fin);want(picks);
finIO&&finIO.disconnect();finIO=new IntersectionObserver(es=>{if(es[0].isIntersecting){finIO.disconnect();fin.classList.add("go");try{const k2="ep-fin";const done=JSON.parse(sessionStorage.getItem(k2)||"[]");if(!done.includes(a.id)){sessionStorage.setItem(k2,JSON.stringify([...done,a.id]));const r=fin.querySelector(".trophy").getBoundingClientRect();window.confetti&&confetti({x:r.left+r.width/2,y:r.top+r.height/2,n:60,small:true})}}catch(e){}}},{threshold:.6});finIO.observe(fin)}
onScroll()}
function onScroll(){if(!tocState||!document.body.contains(tocState.toc)){tocState&&tocState.fab&&tocState.fab.classList.remove("on");return}const body=V.querySelector(".body");if(!body)return;const r=body.getBoundingClientRect();
const p=Math.max(0,Math.min(1,(-r.top+innerHeight*.3)/Math.max(1,r.height-innerHeight*.5)));tocState.ln.style.height=(p*100).toFixed(1)+"%";tocState.fab.classList.toggle("on",scrollY>innerHeight*.6&&p<.98)}
let sr=0;addEventListener("scroll",()=>{if(!sr)sr=requestAnimationFrame(()=>{sr=0;onScroll()})},{passive:true});
let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(idNow())build();else{V.classList.remove("has-rail");delete V.dataset.axd;tocState=null;document.querySelectorAll(".tocfab").forEach(x=>x.remove())}})}).observe(V,{childList:true});
addEventListener("hashchange",()=>{delete V.dataset.axd;V.classList.remove("has-rail")});
})();
