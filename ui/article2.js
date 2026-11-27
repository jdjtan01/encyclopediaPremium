/* Article polish: glossary pop-ups, animated key-dates timeline, hero caption + lightbox,
   illustrated section dividers, glow on jumped-to sections, back-to-top ring, livelier Test yourself. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const V=document.getElementById("v");const E="cubic-bezier(.22,1,.36,1)";
const css=`
/* 1. glossary terms */
.gterm{text-decoration:underline dotted 2px;text-decoration-color:color-mix(in srgb,var(--a1,#7c3aed) 70%,transparent);text-underline-offset:4px;cursor:help;border-radius:4px;transition:background .25s}
.gterm:hover,.gterm:focus-visible{background:color-mix(in srgb,var(--a1,#7c3aed) 12%,transparent);outline:none}
.gpop{position:absolute;z-index:220;max-width:min(300px,calc(100vw - 24px));padding:12px 14px;border-radius:16px;background:var(--sf);color:var(--tx);border:1px solid color-mix(in srgb,var(--a1,#7c3aed) 30%,var(--bd));box-shadow:0 20px 40px -18px rgba(0,0,0,.5);animation:gpIn .25s ${E};pointer-events:none}
.gpop b{display:block;font:900 15px var(--disp);color:var(--a1,#7c3aed);margin-bottom:3px}.gpop span{font:500 14px/1.45 system-ui,sans-serif}
.gpop small{display:block;margin-top:6px;font:600 11px system-ui;color:var(--mu)}
@keyframes gpIn{from{opacity:0;transform:translateY(6px) scale(.97)}}
/* 2. key dates timeline */
.body ol.tlx.tl2{display:block!important;position:relative;list-style:none;border:0!important;background:none!important;text-align:left;padding:4px 0 4px 0!important;margin:1em 0 1.4em!important}
.body ol.tl2:before{content:"";position:absolute;left:84px;right:auto;top:10px;bottom:10px;height:auto;min-width:0;width:4px;border-radius:4px;background:var(--sf2)}
.body ol.tl2:after{content:"";position:absolute;left:84px;top:10px;width:4px;border-radius:4px;height:calc((100% - 20px) * var(--tlp,0));background:linear-gradient(var(--a1,#7c3aed),color-mix(in srgb,var(--a1,#7c3aed) 40%,#ffd23f));transition:height .25s linear}
.body ol.tl2 li{flex:none!important;text-align:left!important;position:relative;display:block!important;min-height:30px;margin:0!important;padding:8px 0 8px 112px!important;opacity:1!important;transform:none!important;border:0!important;background:none!important}
.body ol.tl2 li b{position:absolute;left:0;top:9px;width:70px;display:block!important;height:auto!important;text-align:right;font:900 18px/1.2 var(--disp);color:color-mix(in srgb,var(--a1,#7c3aed) 75%,var(--hd))}
.body ol.tl2 li i{position:absolute!important;left:79px;top:13px;width:14px!important;height:14px!important;border-radius:50%!important;background:var(--sf)!important;border:3px solid color-mix(in srgb,var(--a1,#7c3aed) 35%,var(--bd))!important;transition:transform .5s cubic-bezier(.3,1.7,.5,1),background .3s,border-color .3s;margin:0!important}
.body ol.tl2 li.lit i{background:var(--a1,#7c3aed)!important;border-color:var(--sf)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--a1,#7c3aed) 35%,transparent);transform:scale(1.2)}
.body ol.tl2 li:before,.body ol.tl2 li:after,.body ol.tl2:not(x)>li>b:after{display:none!important}
.body ol.tl2 li span{display:block;text-align:left!important;font:500 16px/1.45 system-ui,sans-serif;transition:opacity .5s,transform .6s ${E}}
.body ol.tl2 li:not(.lit) span,.body ol.tl2 li:not(.lit) b{opacity:.35}
.body ol.tl2 li:not(.lit) span{transform:translateX(-8px)}
@media (max-width:560px){.body ol.tl2:before,.body ol.tl2:after{left:58px}.body ol.tl2 li{padding-left:84px!important}.body ol.tl2 li b{width:46px;font-size:15px;top:10px}.body ol.tl2 li i{left:53px}}
/* 3. hero caption + lightbox */
.hero .ban.big{position:relative;cursor:zoom-in}
.hcap{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:10px;padding:26px 14px 10px;background:linear-gradient(transparent,rgba(0,0,0,.62));color:#fff;font:700 13.5px/1.3 system-ui,sans-serif;pointer-events:none;opacity:0;transition:opacity .5s}
.hero .ban.big.ld .hcap,.hero .ban.big:has(img.ld) .hcap{opacity:1}
.hcap em{font-style:normal;flex:none;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.2);font-size:12px;backdrop-filter:blur(4px)}
.lbx{position:fixed;inset:0;z-index:400;display:grid;place-items:center;padding:24px;background:rgba(8,4,30,.88);backdrop-filter:blur(6px);animation:fdIn .25s ease;cursor:zoom-out}
.lbx img{max-width:min(1200px,96vw);max-height:84vh;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:lbIn .45s ${E}}
.lbx p{margin:12px 0 0;color:#fff;font:600 14px system-ui;text-align:center}
.lbx button{position:fixed;top:16px;right:16px;border:0;border-radius:999px;padding:9px 16px;background:rgba(255,255,255,.15);color:#fff;font:700 14px system-ui;cursor:pointer}
@keyframes lbIn{from{opacity:0;transform:scale(.9)}}
/* 4. dividers */
.adiv{display:flex;align-items:center;gap:16px;margin:2.2em 0 .2em;clear:both}
.adiv:before,.adiv:after{content:"";flex:1;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--a1,#7c3aed) 35%,transparent))}
.adiv:after{background:linear-gradient(90deg,color-mix(in srgb,var(--a1,#7c3aed) 35%,transparent),transparent)}
.adiv .sart{width:42px;height:42px;flex:none;opacity:.9}
.adiv.in .sart{animation:dvIn .9s cubic-bezier(.3,1.5,.5,1)}
@keyframes dvIn{from{transform:scale(.3) rotate(-30deg);opacity:0}}
/* 5. jump glow */
.body h3.jglow{animation:jg 1.8s ease}
@keyframes jg{0%{background:color-mix(in srgb,var(--a1,#7c3aed) 0%,transparent)}20%{background:color-mix(in srgb,var(--a1,#7c3aed) 18%,transparent);box-shadow:0 0 0 10px color-mix(in srgb,var(--a1,#7c3aed) 18%,transparent)}100%{background:transparent;box-shadow:0 0 0 10px transparent}}
.body h3.jglow{border-radius:14px}
/* 6. back to top */
.btt{position:fixed;right:18px;bottom:18px;z-index:56;width:52px;height:52px;border:0;border-radius:50%;padding:0;cursor:pointer;background:var(--sf);color:var(--hd);box-shadow:0 12px 26px -10px rgba(0,0,0,.45);opacity:0;transform:translateY(20px) scale(.8);pointer-events:none;transition:opacity .4s,transform .5s ${E}}
.btt.on{opacity:1;transform:none;pointer-events:auto}
.btt svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
.btt .rg{stroke:var(--a1,#7c3aed);transition:stroke-dashoffset .15s linear}
.btt b{position:relative;font:900 20px/1 var(--disp)}
.btt:hover{transform:translateY(-3px)}
@media (max-width:899px){.btt{bottom:74px;right:14px;width:46px;height:46px}}
/* 7. test yourself */
.tyi .opt.ok{animation:okb .6s cubic-bezier(.3,1.7,.5,1);background:#16a34a!important;color:#fff!important;border-color:#16a34a!important}
.tyi .opt.bad{animation:shk .45s ease;background:#e11d48!important;color:#fff!important;border-color:#e11d48!important}
@keyframes okb{40%{transform:scale(1.08)}}
.tystars{display:flex;align-items:center;gap:6px;margin:10px 0 2px;font:800 15px var(--disp)}
.tystars i{font-style:normal;font-size:24px;filter:grayscale(1);opacity:.35;transition:filter .4s,opacity .4s,transform .5s cubic-bezier(.3,1.7,.5,1)}
.tystars i.on{filter:none;opacity:1;transform:scale(1.15) rotate(-8deg)}
@media (prefers-reduced-motion:reduce){.gpop,.lbx,.lbx img,.adiv .sart,.body h3.jglow,.tyi .opt{animation:none!important}.body ol.tl2 li span,.body ol.tl2 li b{opacity:1!important;transform:none!important}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const esc8=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const idNow=()=>{const m=location.hash.match(/^#\/art\/([^/?#]+)/);return m?decodeURIComponent(m[1]):null};

/* ---------- 1. glossary ---------- */
let pop=null;const showPop=el=>{hidePop();pop=document.createElement("div");pop.className="gpop";pop.setAttribute("role","tooltip");pop.innerHTML=`<b>${esc8(el.dataset.t)}</b><span>${esc8(el.dataset.d)}</span><small>From this article’s key words</small>`;document.body.appendChild(pop);
const r=el.getBoundingClientRect(),W=pop.offsetWidth,H=pop.offsetHeight;let x=Math.max(12,Math.min(innerWidth-W-12,r.left+r.width/2-W/2));let y=r.top-H-10;if(y<70)y=r.bottom+10;pop.style.left=(x+scrollX)+"px";pop.style.top=(y+scrollY)+"px"};
const hidePop=()=>{pop&&pop.remove();pop=null};
document.addEventListener("pointerover",e=>{const t=e.target.closest&&e.target.closest(".gterm");if(t&&e.pointerType=="mouse")showPop(t)});
document.addEventListener("pointerout",e=>{const t=e.target.closest&&e.target.closest(".gterm");if(t&&e.pointerType=="mouse")hidePop()});
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest(".gterm");if(t){e.preventDefault();pop&&pop.dataset.for==t.dataset.t?hidePop():(showPop(t),pop.dataset.for=t.dataset.t)}else hidePop()});
document.addEventListener("focusin",e=>{const t=e.target.closest&&e.target.closest(".gterm");t?showPop(t):hidePop()});
addEventListener("scroll",()=>pop&&hidePop(),{passive:true});
const glossary=(a,body)=>{const G=(a.g||[]).filter(g=>g[0]&&g[1]&&g[0].length>2);if(!G.length)return;const done=new Set();
const paras=[...body.querySelectorAll(":scope>p,:scope>.brief li,:scope>aside p")];
G.forEach(([term,def])=>{const re=new RegExp("\\b("+term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(s|es)?\\b","i");
for(const p of paras){if(done.has(term))break;const w=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest("a,.gterm,b,strong,h3,h4")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;
while((n=w.nextNode())){const m=n.nodeValue.match(re);if(!m)continue;const sp=document.createElement("span");sp.className="gterm";sp.tabIndex=0;sp.dataset.t=term;sp.dataset.d=def;sp.setAttribute("aria-label",m[0]+": "+def);
const after=n.splitText(m.index);after.nodeValue=after.nodeValue.slice(m[0].length);sp.textContent=m[0];after.before(sp);done.add(term);break}}})};

/* ---------- 2. timeline ---------- */
let tl=null;const timeline=body=>{const ol=body.querySelector("ol.tlx");if(!ol)return;ol.classList.add("tl2");tl=ol;if(still)ol.querySelectorAll("li").forEach(l=>l.classList.add("lit"))};
const tlScroll=()=>{if(!tl||!document.body.contains(tl)||still)return;const r=tl.getBoundingClientRect(),mark=innerHeight*.72;const p=Math.max(0,Math.min(1,(mark-r.top)/Math.max(1,r.height)));tl.style.setProperty("--tlp",p.toFixed(3));
tl.querySelectorAll("li").forEach(li=>{const q=li.getBoundingClientRect();li.classList.toggle("lit",q.top+12<mark)})};

/* ---------- 3. hero caption + lightbox ---------- */
const hero=a=>{const b=V.querySelector(".hero .ban.big");if(!b||b.querySelector(".hcap"))return;const img=b.querySelector("img");if(!img)return;const cap=document.createElement("div");cap.className="hcap";cap.innerHTML=`<span>${esc8(a.t)}</span><em>🔍 Tap to enlarge</em>`;b.appendChild(cap);
const mark=()=>{if(img.naturalWidth)b.classList.add("ld")};img.complete?mark():img.addEventListener("load",mark,{once:true});
b.addEventListener("click",()=>{if(!img.naturalWidth)return;const cr=V.querySelector("#cr");const lb=document.createElement("div");lb.className="lbx";lb.setAttribute("role","dialog");lb.setAttribute("aria-label","Enlarged picture");
lb.innerHTML=`<button type="button">Close ✕</button><div><img src="${img.currentSrc||img.src}" alt="${esc8(a.t)}"><p>${esc8(a.t)}${cr&&cr.textContent.trim()?" · "+esc8(cr.textContent.trim()):""}</p></div>`;document.body.appendChild(lb);
const close=()=>{lb.remove();removeEventListener("keydown",k)};const k=e=>{if(e.key=="Escape")close()};addEventListener("keydown",k);lb.onclick=close;lb.querySelector("button").focus()})};

/* ---------- 4. dividers ---------- */
const dividers=(a,body)=>{if(!window.subjArt)return;const hs=[...body.querySelectorAll(":scope>h3.sh:not(.sh2)")];if(hs.length<6)return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.6});
[Math.floor(hs.length/3),Math.floor(hs.length*2/3)].forEach(i=>{const h=hs[i];if(!h)return;const d=document.createElement("div");d.className="adiv";d.setAttribute("aria-hidden","true");d.style.setProperty("--c",(CAT[a.c]||[])[0]);d.style.setProperty("--l",(CAT[a.c]||[])[1]);d.innerHTML=subjArt(a.c);h.before(d);io.observe(d)})};

/* ---------- 5. jump glow ---------- */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".toc button[data-s],.tocsheet button[data-i]");if(!b)return;setTimeout(()=>{let h=null;
if(b.dataset.s)h=document.getElementById("s"+b.dataset.s);else{const tb=V.querySelectorAll(".toc button.lk")[+b.dataset.i];h=tb&&tb.dataset.s?document.getElementById("s"+tb.dataset.s):null}
if(!h){const t=b.textContent.trim();h=[...V.querySelectorAll(".body h3,.body .refs b,.body .further b")].find(x=>x.textContent.replace(/^\S+\s/,"").trim()==t||x.textContent.trim()==t||x.textContent.includes(t))}
if(h){h.classList.remove("jglow");void h.offsetWidth;h.classList.add("jglow")}},450)});

/* ---------- 6. back to top ---------- */
const btt=document.createElement("button");btt.className="btt";btt.type="button";btt.setAttribute("aria-label","Back to top");const C=2*Math.PI*23;
btt.innerHTML=`<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" fill="none" stroke="var(--sf2)" stroke-width="4"/><circle class="rg" cx="26" cy="26" r="23" fill="none" stroke-width="4" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><b>↑</b>`;document.body.appendChild(btt);
btt.onclick=()=>scrollTo({top:0,behavior:still?"auto":"smooth"});
const bttScroll=()=>{const art=true;const h=document.documentElement.scrollHeight-innerHeight;const p=h>0?scrollY/h:0;btt.classList.toggle("on",art&&scrollY>innerHeight*1.2);btt.querySelector(".rg").setAttribute("stroke-dashoffset",(C*(1-p)).toFixed(1));btt.style.setProperty("--a1",getComputedStyle(V).getPropertyValue("--a1"))};

/* ---------- 7. test yourself ---------- */
document.addEventListener("click",e=>{const o=e.target.closest&&e.target.closest(".tyi .opt");if(!o)return;setTimeout(()=>{const q=o.closest(".tyq");if(!q)return;
if(o.classList.contains("ok")&&window.confetti){const r=o.getBoundingClientRect();confetti({x:r.left+r.width/2,y:r.top+r.height/2,n:22,small:true})}
const items=[...q.querySelectorAll(".tyi")];const answered=items.filter(i=>i.querySelector(".opt[disabled]")).length;const right=items.filter(i=>i.dataset.ok&&i.querySelector(".opt.ok")&&!i.querySelector(".opt.bad")).length;
let st=q.querySelector(".tystars");if(!st){st=document.createElement("div");st.className="tystars";const ty=q.querySelector("#tys");ty?ty.before(st):q.appendChild(st)}
st.innerHTML=items.map((_,i)=>`<i class="${i<right?"on":""}">⭐</i>`).join("")+`<span>${right} of ${items.length}${answered==items.length?(right==items.length?" · Perfect!":" · Nice try!"):""}</span>`;
if(answered==items.length&&right==items.length&&window.confetti)setTimeout(()=>confetti({n:90}),200)},30)});

/* ---------- wire up ---------- */
let raf=0,last="";new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const id=idNow();if(!id){tl=null;bttScroll();return}const body=V.querySelector(".body"),a=get(id);if(!body||!a||last==id+body.childElementCount&&body.dataset.p2)return;
if(body.dataset.p2==id)return;body.dataset.p2=id;last=id+body.childElementCount;glossary(a,body);timeline(body);hero(a);dividers(a,body);tlScroll();bttScroll()})}).observe(V,{childList:true,subtree:false});
let sr=0;addEventListener("scroll",()=>{if(!sr)sr=requestAnimationFrame(()=>{sr=0;tlScroll();bttScroll()})},{passive:true});
})();
