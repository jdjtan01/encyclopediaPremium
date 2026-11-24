/* "Explore the subjects" tiles: photo slideshows, strong color fade, large animated illustration,
   glowing animated border, hover zoom + spotlight, slide-up peek with sections and articles,
   diagonal entrance wave and a magazine-style mosaic layout. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const PICS={"Planet Earth":["everest","volc","victoriafalls"],"Animal Kingdom":["elephant","eagle","wshark"],"Plants and Ecosystems":["sunflowers","redwoods","rafflesia"],
"Space":["jupiter","mars","milky"],"Spaceflight":["saturnv","iss","spacewalks"],"Science and Numbers":["plasma","crystals","magnet"],"The Human Body":["heart","brain","vacc"],
"History":["egypt","rome","renais"],"Countries and Places":["palawan","banaue","manila"],"People":["einstein","gandhi","kahlo"],"Arts and Culture":["davinci","shakes","cinema"],
"Technology":["flight","steam","renew"],"Computers and Internet":["comp","smartphone","datacenters"],"How We Live":["rice","olymp","money"],"The Modern World":["esports","covid19","megacities"]};
const BIG=["Space","Animal Kingdom","History"];
const css=`
@property --ang{syntax:"<angle>";inherits:false;initial-value:0deg}
.home2 .stiles.mos{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:dense;grid-auto-rows:190px;gap:12px}
.home2 .stiles.mos .stile{height:auto!important;border-radius:22px}
.home2 .stiles.mos .stile.big{grid-column:span 2;grid-row:span 1}
@media (min-width:700px){.home2 .stiles.mos{grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:220px}.home2 .stiles.mos .stile.big{grid-column:span 2;grid-row:span 2}}
@media (min-width:1000px){.home2 .stiles.mos{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:230px;gap:16px}}
.stile.tx{isolation:isolate;--mx:50%;--my:30%}
.stile.tx>.ban{display:none}
.stile .tsl{position:absolute;inset:0;z-index:0;overflow:hidden;background:linear-gradient(135deg,var(--c),var(--l))}
.stile .tsl .ban{position:absolute!important;inset:0;height:100%!important;font-size:64px;display:grid;place-items:center;opacity:0;animation:tsl 15s infinite;animation-delay:calc(var(--k) * 5s - var(--off,0s))}
.stile .tsl .ban:first-child{opacity:1}
.stile .tsl.one .ban{animation:none;opacity:1}
.stile .tsl .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.22,1,.36,1),filter 1s cubic-bezier(.22,1,.36,1)}
@keyframes tsl{0%{opacity:0;transform:scale(1.06)}6%{opacity:1}33%{opacity:1}40%{opacity:0;transform:scale(1)}100%{opacity:0}}
.stile.tx:hover .tsl .ban img{transform:scale(1.08);filter:saturate(1.15)}
.stile.tx .st-t{z-index:2;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,color-mix(in srgb,var(--c) 25%,transparent) 30%,color-mix(in srgb,var(--c) 82%,#000) 72%,color-mix(in srgb,var(--c) 60%,#000) 100%)!important;padding:16px 18px!important;transition:transform .65s cubic-bezier(.22,1,.36,1)}
.stile.tx .st-t b{font-size:clamp(20px,2vw,26px)!important;text-shadow:0 2px 10px rgba(0,0,0,.55)}
.stile.tx.big .st-t b{font-size:clamp(28px,3.4vw,44px)!important;letter-spacing:-.02em}
.stile.tx .st-t small{max-height:5em;overflow:hidden;transition:opacity .35s ease,max-height .6s cubic-bezier(.22,1,.36,1),margin .6s cubic-bezier(.22,1,.36,1);display:block!important;font:500 14px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;font-style:normal!important;text-shadow:0 1px 6px rgba(0,0,0,.5)}
.stile.tx.big .st-t small{font-size:16.5px!important}
.stile.tx .st-t em{display:none}
.stile.tx .st-i{display:none!important}
.stile .tart{position:absolute;z-index:3;top:12px;right:12px;width:62px;height:62px;filter:drop-shadow(0 8px 14px rgba(0,0,0,.4));transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .45s ease}
.stile.big .tart{width:96px;height:96px;top:16px;right:16px}
.stile.tx:hover .tart{transform:scale(1.1) rotate(-5deg) translateY(-2px)}
.stile.tx:before{content:"";position:absolute;inset:0;z-index:4;border-radius:inherit;padding:2.5px;pointer-events:none;
background:conic-gradient(from var(--ang),transparent 0deg,var(--l) 60deg,#fff 90deg,var(--l) 120deg,transparent 180deg,transparent 360deg);
-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
opacity:.75;animation:tbd 6s linear infinite}
.stile.tx:hover:before{opacity:1;animation-duration:1.8s}
@keyframes tbd{to{--ang:360deg}}
.stile.tx:after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0;transition:opacity .6s ease;background:radial-gradient(320px circle at var(--mx) var(--my),rgba(255,255,255,.32),transparent 60%)}
.stile.tx:hover:after{opacity:1}
.stile.tx:hover{box-shadow:0 26px 46px -20px var(--c),0 0 0 1px color-mix(in srgb,var(--l) 50%,transparent)}
.tpk{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:14px 16px 16px;transform:translateY(40px);opacity:0;visibility:hidden;transition:transform .65s cubic-bezier(.22,1,.36,1),opacity .45s ease,visibility 0s .65s;
background:linear-gradient(180deg,color-mix(in srgb,var(--c) 88%,#000),color-mix(in srgb,var(--c) 70%,#000));backdrop-filter:blur(6px);display:flex;flex-direction:column;gap:10px}
.tpk .tpc{display:flex;flex-wrap:wrap;gap:6px}
.tpk .tpc span{display:inline-flex;align-items:center;gap:6px;padding:5px 10px 5px 5px;border-radius:999px;background:rgba(255,255,255,.16);font:700 12.5px/1.1 system-ui,sans-serif;color:#fff;cursor:pointer;transition:background .2s}
.tpk .tpc span:hover{background:rgba(255,255,255,.3)}
.tpk .tpc .sico{width:22px!important;height:22px!important;border-radius:7px!important;margin:0!important;box-shadow:none!important;background:rgba(255,255,255,.22)!important}.tpk .tpc .sico svg{width:15px;height:15px}
.tpk .tpa{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.tpk .tpa span{position:relative;display:block;height:54px;border-radius:10px;overflow:hidden;cursor:pointer;box-shadow:0 4px 10px -4px rgba(0,0,0,.5)}
.tpk .tpa .ban{position:absolute!important;inset:0;height:100%!important;font-size:22px;display:grid;place-items:center}.tpk .tpa .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.tpk .tpa i{position:absolute;left:0;right:0;bottom:0;padding:10px 6px 4px;font:700 10.5px/1.15 system-ui,sans-serif;font-style:normal;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.75));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tpk .tgo{font:800 13px var(--disp);color:#fff;opacity:.9}
.stile:not(.big) .tpk .tpa{display:none}.stile:not(.big) .tpk{padding:10px 12px 12px;gap:7px}.stile:not(.big) .tpk .tpc span{font-size:12px;padding:4px 9px 4px 4px}
@media (hover:hover) and (pointer:fine){.stile.tx:not(.big):hover .tart{transform:scale(.6) translate(18px,-18px);opacity:0}}
.stile .tart{opacity:1}
@media (hover:hover) and (pointer:fine){.stile.tx:hover .tpk,.stile.tx:focus-visible .tpk{transform:none;opacity:1;visibility:visible;transition:transform .65s cubic-bezier(.22,1,.36,1),opacity .45s ease,visibility 0s}
.stile.tx:hover .st-t,.stile.tx:focus-visible .st-t{transform:translateY(calc(-1 * var(--ph,130px)))}
.stile.tx:hover .st-t small,.stile.tx:focus-visible .st-t small{opacity:0;max-height:0;margin:0!important}
.tpk .tpc>span,.tpk .tpa>span,.tpk .tgo{opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .5s cubic-bezier(.22,1,.36,1)}
.stile.tx:hover .tpk .tpc>span,.stile.tx:hover .tpk .tpa>span,.stile.tx:hover .tpk .tgo,.stile.tx:focus-visible .tpk .tpc>span,.stile.tx:focus-visible .tpk .tpa>span,.stile.tx:focus-visible .tpk .tgo{opacity:1;transform:none;transition-delay:calc(120ms + var(--i,0) * 45ms)}}
.stile.tx .st-t{will-change:transform}
.home2.rv-on .stiles .stile.rv{transform:translateY(60px) rotate(var(--rr,-3deg)) scale(.9)}
.home2.rv-on .stiles .stile.rv.shown{transform:none}
@media (prefers-reduced-motion:reduce){.stile .tsl .ban{animation:none!important;opacity:0}.stile .tsl .ban:first-child{opacity:1}.stile.tx:before{animation:none}.stile .tsl .ban img,.tpk,.stile.tx .st-t{transition:none}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const esc6=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const enhance=()=>{const grid=document.querySelector("#v.home2 .stiles");if(!grid||grid.dataset.tx)return;grid.dataset.tx=1;grid.classList.add("mos");
const tiles=[...grid.querySelectorAll("a.stile")];const all=[];
tiles.forEach((t,ti)=>{const c=(t.querySelector(".st-t b")||{}).textContent;if(!c||!CAT[c])return;t.classList.add("tx");if(BIG.includes(c))t.classList.add("big");
const S=(window.SUBJ||{})[c]||{},href=t.getAttribute("href");
const ids=(PICS[c]||S.feat||[]).map(get).filter(Boolean).slice(0,3);all.push(...ids);
const sl=document.createElement("div");sl.className="tsl"+(ids.length<2||still?" one":"");sl.setAttribute("aria-hidden","true");sl.style.setProperty("--off",(ti*1.1).toFixed(1)+"s");
sl.innerHTML=ids.map((a,k)=>ban(a).replace('<div class="ban','<div style="--k:'+k+'" class="ban')).join("");t.prepend(sl);
if(window.subjArt){const ar=document.createElement("span");ar.className="tart";ar.setAttribute("aria-hidden","true");ar.innerHTML=subjArt(c);t.appendChild(ar)}
const subs=(S.subs||[]).filter(b=>b.n!="Other articles").slice(0,t.classList.contains("big")?6:3);const fe=(S.feat||[]).map(get).filter(Boolean).slice(0,3);all.push(...fe);
const pk=document.createElement("span");pk.className="tpk";pk.setAttribute("aria-hidden","true");
pk.innerHTML=`<span class="tpc">${subs.map(b=>`<span data-go="${href}/${encodeURIComponent(b.n)}">${window.secIcon?secIcon(b.n,"rgba(255,255,255,.2)"):""}${esc6(b.n)}</span>`).join("")}</span>
<span class="tpa">${fe.map(a=>`<span data-go="#/art/${a.id}">${ban(a)}<i>${esc6(a.t)}</i></span>`).join("")}</span><span class="tgo">Explore ${esc6(c)} ›</span>`;t.appendChild(pk);
pk.querySelectorAll(".tpc>span,.tpa>span,.tgo").forEach((x,i)=>x.style.setProperty("--i",i));const ms=()=>t.style.setProperty("--ph",(pk.offsetHeight-8)+"px");t.addEventListener("pointerenter",ms);t.addEventListener("focus",ms);requestAnimationFrame(ms);
pk.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){e.preventDefault();e.stopPropagation();location.hash=g.dataset.go}});
if(fine&&!still)t.addEventListener("pointermove",e=>{const r=t.getBoundingClientRect();t.style.setProperty("--mx",(e.clientX-r.left)+"px");t.style.setProperty("--my",(e.clientY-r.top)+"px")})});
want([...new Set(all)]);
/* diagonal entrance: delay by row + column once the mosaic has laid out */
requestAnimationFrame(()=>{const g0=grid.getBoundingClientRect();const cw=tiles[0]?tiles[0].getBoundingClientRect().width:200;
tiles.forEach(t=>{const r=t.getBoundingClientRect();const col=Math.round((r.left-g0.left)/Math.max(1,cw*.9)),row=Math.round((r.top-g0.top)/200);
t.style.setProperty("--rd",((col+row)*.08).toFixed(2)+"s");t.style.setProperty("--rr",((col%2?1:-1)*3)+"deg")})})};
const prev=R.home;R.home=function(x){prev(x);enhance()};
if(document.querySelector("#v.home2"))enhance();
})();
