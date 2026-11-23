/* Article previews: hover (mouse) shows a floating card; long press (touch) shows a bottom sheet. */
(()=>{
const css=`
.apv{position:absolute;z-index:200;width:340px;max-width:calc(100vw - 24px);border-radius:22px;overflow:hidden;background:var(--pvbg,#fff);color:#1b1340;
box-shadow:0 30px 60px -18px rgba(20,8,70,.55),0 0 0 1px rgba(124,58,237,.16);transform-origin:var(--ox,50%) var(--oy,0%);animation:pvIn .26s cubic-bezier(.2,.8,.2,1)}
:root[data-theme="dark"] .apv,:root[data-theme="dark"] .apsh{--pvbg:#1c1640;color:#f1ecff}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .apv,:root:not([data-theme="light"]) .apsh{--pvbg:#1c1640;color:#f1ecff}}
@keyframes pvIn{from{opacity:0;transform:scale(.92) translateY(6px)}}
.apv.out{animation:pvOut .16s ease forwards}@keyframes pvOut{to{opacity:0;transform:scale(.96)}}
.apv .pv-im,.apsh .pv-im{position:relative;height:150px;overflow:hidden}
.apv .pv-im .ban,.apsh .pv-im .ban{position:absolute;inset:0;height:100%!important;font-size:58px;display:grid;place-items:center}
.apv .pv-im .ban img,.apsh .pv-im .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:kb2 8s ease-out both}
@keyframes kb2{from{transform:scale(1.12)}}
.pv-im:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(10,5,40,.65))}
.pv-im .pv-ch{position:absolute;left:12px;bottom:10px;z-index:1;display:block;max-width:calc(100% - 130px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.9);color:#1b1340;font:700 12px system-ui,sans-serif}
.pv-im .pv-ch i{display:inline-block;margin-right:6px;vertical-align:1px;width:8px;height:8px;border-radius:50%;background:var(--c)}
.pv-im .pv-rt{position:absolute;right:12px;bottom:10px;z-index:1;padding:5px 10px;border-radius:999px;background:rgba(0,0,0,.45);color:#fff;font:700 12px system-ui,sans-serif}
.pv-bd{padding:14px 16px 16px}
.pv-bd h4{margin:0 0 6px;font:900 21px/1.15 var(--disp);letter-spacing:-.01em}
.pv-bd p{margin:0 0 10px;font:400 14.5px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;opacity:.9;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.pv-kf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:0 0 12px}
.pv-kf div{border-radius:12px;padding:7px 8px;background:color-mix(in srgb,var(--c) 12%,transparent)}
.pv-kf small{display:block;font:700 10.5px/1.2 system-ui,sans-serif;opacity:.7;margin-bottom:2px}
.pv-kf b{display:block;font:800 12.5px/1.25 var(--disp);overflow-wrap:anywhere}
.pv-go{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:999px;text-decoration:none;color:#fff!important;font:800 14px var(--disp);background:linear-gradient(90deg,#db2777,#7c3aed);box-shadow:0 8px 18px -10px #7c3aed}
.pv-go:hover{filter:brightness(1.08)}
.pv-ft{display:flex;align-items:center;justify-content:space-between;gap:10px}
.pv-ft small{font:500 12px system-ui;opacity:.6}
.apbk{position:fixed;inset:0;z-index:300;background:rgba(10,5,40,.45);backdrop-filter:blur(3px);animation:fdIn .25s ease}
@keyframes fdIn{from{opacity:0}}
.apsh{position:fixed;left:0;right:0;bottom:0;z-index:301;max-height:86vh;overflow:auto;border-radius:26px 26px 0 0;background:var(--pvbg,#fff);color:#1b1340;box-shadow:0 -20px 50px -10px rgba(20,8,70,.5);animation:shUp .35s cubic-bezier(.2,.9,.25,1);padding-bottom:env(safe-area-inset-bottom)}
@keyframes shUp{from{transform:translateY(100%)}}
.apsh.out{animation:shDn .22s ease forwards}@keyframes shDn{to{transform:translateY(100%)}}
.apsh .grab{display:block;width:44px;height:5px;border-radius:5px;background:rgba(128,128,160,.5);margin:8px auto 8px}
.apsh .pv-im{height:190px;margin:0 12px;border-radius:18px}
.apsh .pv-bd{padding:14px 18px 20px}.apsh .pv-bd h4{font-size:24px}.apsh .pv-bd p{-webkit-line-clamp:6;font-size:15.5px}
.apsh .pv-x{border:0;background:rgba(128,128,160,.18);color:inherit;border-radius:999px;padding:9px 16px;font:700 14px system-ui;cursor:pointer}
a[href^="#/art/"]{-webkit-touch-callout:none}
.pv-press{transition:transform .45s ease;transform:scale(.97)}
@media (prefers-reduced-motion:reduce){.apv,.apsh,.apbk,.pv-im img{animation:none!important}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const esc5=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const words=s=>String(s||"").split(/\s+/).filter(Boolean).length;
const mins=a=>Math.max(1,Math.round((words(a.l)+(a.p||[]).reduce((t,x)=>t+words(x[1]),0))/200));
const lead=a=>{const t=a.l||((a.p||[])[0]||[])[1]||"";const s=t.match(/[^.!?]+[.!?]+/g)||[t];return s.slice(0,3).join(" ").trim()};
const idOf=el=>{const h=el.getAttribute("href")||"";const m=h.match(/^#\/art\/([^/?#]+)/);return m&&get(decodeURIComponent(m[1]))?decodeURIComponent(m[1]):null};
const SKIP=".apv,.apsh,.sg,#nv,.mega,.crumbs,.toc,.atools,.amenu";
const body=a=>{const col=(CAT[a.c]||["#7c3aed","#c4b5fd"])[0],k=(a.k||[]).slice(0,3);
return `<div class="pv-im" style="--c:${col}">${ban(a)}<span class="pv-ch"><i></i>${esc5(a.c)}${a.sub?" › "+esc5(a.sub):""}</span><span class="pv-rt">${mins(a)} min read</span></div>
<div class="pv-bd" style="--c:${col}"><h4>${esc5(a.t)}</h4><p>${esc5(lead(a))}</p>${k.length?`<div class="pv-kf">${k.map(([l,v])=>`<div><small>${esc5(l)}</small><b>${esc5(v)}</b></div>`).join("")}</div>`:""}`};
/* ---------- hover card (mouse) ---------- */
let card=null,tShow=0,tHide=0,curLink=null;
const hide=(now)=>{clearTimeout(tShow);clearTimeout(tHide);const c=card;card=null;curLink=null;if(!c)return;if(now){c.remove();return}c.classList.add("out");setTimeout(()=>c.remove(),170)};
const show=(link,id)=>{hide(true);const a=get(id);if(!a)return;curLink=link;want([a]);
card=document.createElement("div");card.className="apv";card.setAttribute("role","dialog");card.setAttribute("aria-label","Preview of "+a.t);
card.innerHTML=body(a)+`<div class="pv-ft"><a class="pv-go" href="#/art/${a.id}">Open article ›</a><small>Click the card to open</small></div></div>`;
document.body.appendChild(card);const g=12;card.style.maxHeight=(innerHeight-2*g)+"px";card.style.overflowY="auto";
const r=link.getBoundingClientRect(),W=card.offsetWidth,H=Math.min(card.offsetHeight,innerHeight-2*g),below=innerHeight-r.bottom-g,above=r.top-g,cx=r.left+r.width/2;
let x=cx-W/2,y,ox=null,oy;
if(H+10<=below){y=r.bottom+10;oy="0%"}
else if(H+10<=above){y=r.top-H-10;oy="100%"}
else{/* not enough room above or below: open beside the item, or keep it fully on screen */
if(innerWidth-r.right-g>=W+12){x=r.right+12;ox="0px"}else if(r.left-g>=W+12){x=r.left-W-12;ox=W+"px"}
y=r.top+r.height/2-H/2;oy="50%"}
x=Math.max(g,Math.min(innerWidth-W-g,x));y=Math.max(g,Math.min(innerHeight-H-g,y));
card.style.left=(x+scrollX)+"px";card.style.top=(y+scrollY)+"px";card.style.setProperty("--ox",ox!=null?ox:(cx-x)+"px");card.style.setProperty("--oy",oy);
card.addEventListener("mouseenter",()=>clearTimeout(tHide));card.addEventListener("mouseleave",()=>{tHide=setTimeout(()=>hide(),220)});
card.addEventListener("click",e=>{if(!e.target.closest("a")){location.hash="#/art/"+a.id;hide(true)}})};
document.addEventListener("pointerover",e=>{if(e.pointerType!="mouse")return;const l=e.target.closest&&e.target.closest('a[href^="#/art/"]');if(!l||l.closest(SKIP))return;
if(l===curLink){clearTimeout(tHide);return}const id=idOf(l);if(!id)return;clearTimeout(tShow);tShow=setTimeout(()=>{if(l.matches(":hover"))show(l,id)},480)});
document.addEventListener("pointerout",e=>{if(e.pointerType!="mouse")return;const l=e.target.closest&&e.target.closest('a[href^="#/art/"]');if(!l)return;
if(e.relatedTarget&&l.contains(e.relatedTarget))return;clearTimeout(tShow);if(l===curLink)tHide=setTimeout(()=>hide(),260)});
addEventListener("hashchange",()=>{hide(true);closeSheet(true)});addEventListener("scroll",()=>{if(card)hide()},{passive:true});
document.addEventListener("keydown",e=>{if(e.key=="Escape"){hide();closeSheet()}});
/* ---------- long press sheet (touch) ---------- */
let sheet=null,back=null,tPress=0,pressLink=null,sx=0,sy=0,suppress=false;
function closeSheet(now){const s=sheet,b=back;sheet=back=null;if(!s)return;if(now){s.remove();b.remove();return}s.classList.add("out");b.style.opacity=0;b.style.transition="opacity .2s";setTimeout(()=>{s.remove();b.remove()},230)}
const openSheet=id=>{const a=get(id);if(!a)return;want([a]);closeSheet(true);
back=document.createElement("div");back.className="apbk";const t0=performance.now();back.onclick=()=>{if(!suppress&&performance.now()-t0>450)closeSheet()};
sheet=document.createElement("div");sheet.className="apsh";sheet.setAttribute("role","dialog");sheet.setAttribute("aria-label","Preview of "+a.t);
sheet.innerHTML=`<span class="grab" aria-hidden="true"></span>`+body(a)+`<div class="pv-ft"><a class="pv-go" href="#/art/${a.id}">Open article ›</a><button class="pv-x" type="button">Close</button></div></div>`;
document.body.append(back,sheet);sheet.querySelector(".pv-x").onclick=()=>closeSheet();sheet.querySelector(".pv-go").addEventListener("click",()=>closeSheet(true));
let y0=0,dy=0;sheet.addEventListener("touchstart",e=>{y0=e.touches[0].clientY;dy=0},{passive:true});
sheet.addEventListener("touchmove",e=>{dy=e.touches[0].clientY-y0;if(dy>0&&sheet.scrollTop<=0)sheet.style.transform=`translateY(${dy}px)`},{passive:true});
sheet.addEventListener("touchend",()=>{if(dy>90)closeSheet();else sheet.style.transform=""});
navigator.vibrate&&navigator.vibrate(12)};
const endPress=()=>{clearTimeout(tPress);pressLink&&pressLink.classList.remove("pv-press");pressLink=null};
document.addEventListener("pointerdown",e=>{if(e.pointerType=="mouse")return;const l=e.target.closest&&e.target.closest('a[href^="#/art/"]');if(!l||l.closest(SKIP))return;const id=idOf(l);if(!id)return;
pressLink=l;sx=e.clientX;sy=e.clientY;setTimeout(()=>pressLink===l&&l.classList.add("pv-press"),120);tPress=setTimeout(()=>{suppress=true;endPress();openSheet(id)},520)},{passive:true});
document.addEventListener("pointermove",e=>{if(pressLink&&Math.hypot(e.clientX-sx,e.clientY-sy)>10)endPress()},{passive:true});
["pointerup","pointercancel"].forEach(t=>document.addEventListener(t,()=>{endPress();if(suppress)setTimeout(()=>suppress=false,400)},{passive:true}));
document.addEventListener("click",e=>{if(suppress&&e.target.closest&&e.target.closest(".apbk")){e.preventDefault();e.stopPropagation();suppress=false;return}if(suppress){const l=e.target.closest&&e.target.closest('a[href^="#/art/"]');suppress=false;if(l&&!l.closest(".apsh")){e.preventDefault();e.stopPropagation()}}},true);
document.addEventListener("contextmenu",e=>{const l=e.target.closest&&e.target.closest('a[href^="#/art/"]');if(l&&(pressLink||sheet))e.preventDefault()});
})();
