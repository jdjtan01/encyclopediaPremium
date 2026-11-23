/* Loading feedback: a glowing progress bar at the top whenever a page or its pictures are loading,
   a short pause so the bar paints before heavy pages render, and shimmer on pictures still downloading. */
(()=>{
const css=`
#ldb{position:fixed;left:0;top:0;height:4px;width:100%;z-index:1000;pointer-events:none;opacity:0;transition:opacity .35s}
#ldb.on{opacity:1}
#ldb i{position:absolute;inset:0;transform-origin:left;transform:scaleX(var(--p,0));transition:transform .4s cubic-bezier(.2,.8,.2,1);
background:linear-gradient(90deg,#ff3d77,#ffb800,#00c2a8,#4f7cff,#b84dff,#ff3d77);background-size:200% 100%;animation:ldg 1.2s linear infinite;box-shadow:0 0 12px rgba(255,61,119,.7),0 0 4px rgba(79,124,255,.7)}
#ldb b{position:absolute;right:0;top:-3px;width:90px;height:10px;transform:translateX(calc((var(--p,0) - 1) * 100vw));transition:transform .4s cubic-bezier(.2,.8,.2,1);background:radial-gradient(closest-side,rgba(255,255,255,.95),transparent);filter:blur(1px)}
@keyframes ldg{to{background-position:200% 0}}
#ldsp{position:fixed;right:16px;top:14px;z-index:1001;width:22px;height:22px;border-radius:50%;pointer-events:none;opacity:0;transform:scale(.6);transition:opacity .25s,transform .25s;
background:conic-gradient(#ff3d77,#ffb800,#00c2a8,#4f7cff,#b84dff,#ff3d77);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3px));mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3px));animation:ldspin .8s linear infinite}
#ldsp.on{opacity:1;transform:scale(1)}
@keyframes ldspin{to{rotate:360deg}}
.ban:has(> img:not(.ld)):after,.ban.ldg:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);background-size:220% 100%;animation:ldsh 1.3s ease-in-out infinite}
@keyframes ldsh{from{background-position:120% 0}to{background-position:-120% 0}}
#v.ld-out{opacity:.55;filter:saturate(.7);transition:opacity .15s,filter .15s}
.ld-ph{margin:16px 0;border-radius:16px;height:180px;background:linear-gradient(100deg,var(--sf2) 30%,var(--sf) 50%,var(--sf2) 70%);background-size:220% 100%;animation:ldsh 1.3s ease-in-out infinite;display:grid;place-items:center;color:var(--mu);font:600 14px system-ui,sans-serif}
@media (prefers-reduced-motion:reduce){#ldb i,#ldsp,.ban:after,.ld-ph{animation:none!important}#ldb b{display:none}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const bar=document.createElement("div");bar.id="ldb";bar.setAttribute("aria-hidden","true");bar.innerHTML="<i></i><b></b>";
const sp=document.createElement("div");sp.id="ldsp";sp.setAttribute("role","status");sp.setAttribute("aria-label","Loading");
document.body.append(bar,sp);
let p=0,active=false,trick=0,pending=0,hold=0,spT=0,cap=0;
const set=v=>{p=v;bar.style.setProperty("--p",v)};
const start=()=>{clearTimeout(hold);clearTimeout(cap);if(!active){active=true;set(.08);bar.classList.add("on")}
clearInterval(trick);trick=setInterval(()=>{if(p<.9)set(p+(.9-p)*.12)},180);clearTimeout(spT);spT=setTimeout(()=>active&&sp.classList.add("on"),700);
cap=setTimeout(()=>{pending=0;finish()},9000)};
const finish=()=>{if(!active)return;if(pending>0)return;clearInterval(trick);clearTimeout(spT);clearTimeout(cap);sp.classList.remove("on");set(1);
hold=setTimeout(()=>{bar.classList.remove("on");setTimeout(()=>{if(!bar.classList.contains("on"))set(0)},380);active=false},260)};
const settle=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{document.getElementById("v").classList.remove("ld-out");finish()}));
window.LD={start,finish:()=>{pending=0;finish()}};
/* count same-site files being fetched (picture chunks, dictionary and so on) */
const same=u=>{try{return new URL(u,location.href).origin==location.origin}catch(e){return false}};
const of=window.fetch&&window.fetch.bind(window);
if(of)window.fetch=function(u,o){const track=same(typeof u=="string"?u:u&&u.url);if(track){pending++;start()}
return of(u,o).finally(()=>{if(track){pending=Math.max(0,pending-1);if(!pending)settle()}})};
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.tagName=="SCRIPT"&&n.src&&same(n.src)&&!n.dataset.ldt){n.dataset.ldt=1;pending++;start();
const end=()=>{pending=Math.max(0,pending-1);if(!pending)settle()};n.addEventListener("load",end,{once:true});n.addEventListener("error",end,{once:true})}}))).observe(document.head,{childList:true});
/* give the bar a frame to appear before a page renders */
const defer=fn=>{start();document.getElementById("v").classList.add("ld-out");requestAnimationFrame(()=>requestAnimationFrame(fn))};
document.addEventListener("click",e=>{if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
const a=e.target.closest&&e.target.closest('a[href^="#/"]');if(!a||a.target)return;const h=a.getAttribute("href");if(h==location.hash)return;
e.preventDefault();defer(()=>{location.hash=h})});
const og=window.go;if(typeof og=="function"){window.go=function(v,x){const args=arguments;defer(()=>og.apply(this,args))}}
addEventListener("hashchange",()=>{if(!active)start();settle()});
/* placeholder while an article's pictures download */
const V=document.getElementById("v");
new MutationObserver(()=>{if(pending>0&&/^#\/art\//.test(location.hash)&&!V.querySelector(".exg,.ld-ph")){const ex=(window.EXIDS||[]).includes(decodeURIComponent((location.hash.split("/")[2]||"")));
if(ex){const body=V.querySelector(".body");const t=body&&body.querySelector("h3,.panelx,section");if(body){const ph=document.createElement("div");ph.className="ld-ph";ph.textContent="Loading pictures…";(t||body.firstChild)?body.insertBefore(ph,(t||body.firstChild)):body.appendChild(ph);
const rm=()=>{if(V.querySelector(".exg")||!pending){ph.remove()}else setTimeout(rm,200)};setTimeout(rm,200)}}}}).observe(V,{childList:true});
})();
