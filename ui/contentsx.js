// Contents (v175): colorful hero with live stats and a filter box, sticky subject rail with scroll-spy,
// collapsible glass subject panels with progress (articles you have opened), sub-section cards,
// expand or collapse all, a random article per subject and staggered animations.
(function(){
if(typeof R=="undefined"||typeof CAT=="undefined")return;
const css=`
.ctx{position:relative}
.ctx-hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:32px 30px 24px;margin:6px 0 16px;color:#fff;
background:linear-gradient(120deg,#0f766e,#2563eb 30%,#7c3aed 55%,#db2777 80%,#f59e0b);background-size:240% 240%;animation:ctxFlow 18s ease-in-out infinite alternate;box-shadow:0 30px 60px -36px #4f46e5}
@keyframes ctxFlow{to{background-position:100% 100%}}
.ctx-hero h2{margin:0;font:900 clamp(32px,5vw,52px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.ctx-hero p{margin:8px 0 16px;font:600 15px/1.45 system-ui,sans-serif;color:#fff!important;opacity:.93;max-width:600px}
.ctx-orbs{position:absolute;inset:0;z-index:-1;pointer-events:none}
.ctx-orbs i{position:absolute;border-radius:50%;background:rgba(255,255,255,.14);animation:ctxOrb var(--d) ease-in-out infinite alternate}
@keyframes ctxOrb{to{transform:translate(var(--x),var(--y)) scale(1.15)}}
.ctx-kpi{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.ctx-kpi span{padding:9px 14px;border-radius:16px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);font:700 12.5px system-ui,sans-serif}
.ctx-kpi b{display:block;font:900 22px/1.05 var(--disp)}
.ctx-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.ctx-f{flex:1 1 300px;position:relative}
.ctx-f input{width:100%;box-sizing:border-box;padding:14px 16px 14px 46px!important;border-radius:16px!important;border:1px solid rgba(255,255,255,.5)!important;background:rgba(255,255,255,.93)!important;color:#1e1b4b!important;font:600 16px system-ui,sans-serif!important;outline:none;box-shadow:0 14px 28px -18px rgba(0,0,0,.5)}
.ctx-f input:focus{box-shadow:0 0 0 4px rgba(255,255,255,.4),0 14px 28px -18px rgba(0,0,0,.5)}
.ctx-f svg{position:absolute;left:15px;top:50%;translate:0 -50%;width:19px;height:19px;color:#4f46e5}
.ctx-b{border:0;cursor:pointer;padding:12px 15px;border-radius:14px;font:800 13.5px var(--disp);color:#4338ca;background:#fff;box-shadow:0 10px 22px -14px rgba(0,0,0,.5);transition:transform .2s}
.ctx-b:hover{transform:translateY(-2px)}.ctx-b:active{transform:scale(.95)}
.ctx-links{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.ctx-links a{display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:99px;background:var(--sf);border:1px solid var(--bd);color:var(--tx);text-decoration:none;font:700 13px system-ui,sans-serif;transition:transform .2s,border-color .2s,box-shadow .2s;animation:ctxIn .45s both;animation-delay:calc(var(--k)*35ms)}
.ctx-links a:hover{transform:translateY(-2px);border-color:#7c3aed;box-shadow:0 10px 20px -14px #7c3aed}
.ctx-rail{position:sticky;top:calc(var(--hjt,64px) + var(--nxs,0px));z-index:20;margin:0 -6px 16px;padding:8px 6px;display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;
background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(14px) saturate(1.5);-webkit-backdrop-filter:blur(14px) saturate(1.5);border-radius:18px;transition:top .3s}
.ctx-rail{flex-wrap:nowrap!important}.ctx-rail::-webkit-scrollbar{display:none}
.ctx-pills .sico{width:22px!important;height:22px!important;border-radius:7px!important;margin:0!important;box-shadow:none!important}.ctx-pills .sico svg{width:14px!important;height:14px!important}
.ctx-sub h4 .sico{width:28px!important;height:28px!important;border-radius:9px!important;margin:0!important;box-shadow:none!important}.ctx-sub h4 .sico svg{width:17px!important;height:17px!important}
.ctx-rail a{flex:none;display:inline-flex;align-items:center;gap:6px;padding:7px 12px 7px 8px;border-radius:99px;text-decoration:none;color:var(--tx);font:700 13px system-ui,sans-serif;background:var(--sf);border:1px solid var(--bd);transition:background .25s,color .25s,transform .2s,box-shadow .25s}
.ctx-rail a i{width:22px;height:22px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(140deg,var(--c),var(--l));font-style:normal;font-size:12px}
.ctx-rail a:hover{transform:translateY(-2px)}
.ctx-rail a.on{background:var(--c);border-color:var(--c);color:#fff;box-shadow:0 8px 18px -10px var(--c)}
.ctx-list{display:grid;gap:16px}
.ctx-s{position:relative;border-radius:24px;overflow:hidden;scroll-margin-top:140px;background:color-mix(in srgb,var(--sf) 82%,transparent);border:1px solid color-mix(in srgb,var(--c) 26%,var(--bd));
box-shadow:0 18px 40px -32px var(--c);animation:ctxIn .55s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--k)*45ms);transition:box-shadow .3s,transform .3s}
@keyframes ctxIn{from{opacity:0;transform:translateY(16px)}}
.ctx-s:hover{box-shadow:0 24px 50px -30px var(--c)}
.ctx-h{position:relative;display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;padding:16px 18px;cursor:pointer;user-select:none;color:#fff;overflow:hidden;
background:linear-gradient(120deg,var(--c),color-mix(in srgb,var(--c) 55%,var(--l)) 60%,var(--l));}
.ctx-h:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.25) 48%,transparent 60%);transform:translateX(-120%);pointer-events:none}
.ctx-h:hover:after{transform:translateX(120%);transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
.ctx-ic{width:62px;height:62px;border-radius:18px;display:grid;place-items:center;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35);font-size:30px;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.ctx-ic svg{width:54px;height:54px}
.ctx-h:hover .ctx-ic{transform:rotate(-8deg) scale(1.08)}
.ctx-h h3{margin:0;font:900 clamp(19px,2.2vw,25px)/1.1 var(--disp);color:#fff!important;border:0!important;padding:0!important}
.ctx-h h3 a{color:#fff;text-decoration:none}.ctx-h h3 a:hover{text-decoration:underline}
.ctx-h small{display:block;margin-top:4px;font:600 13.5px system-ui,sans-serif;color:#fff!important;opacity:.9}
.ctx-pg{display:flex;align-items:center;gap:8px;margin-top:8px;font:700 12px system-ui,sans-serif}
.ctx-pg u{flex:0 1 180px;height:7px;border-radius:99px;background:rgba(255,255,255,.28);overflow:hidden;text-decoration:none}
.ctx-pg u i{display:block;height:100%;width:var(--p);border-radius:inherit;background:#fff;transition:width 1s cubic-bezier(.2,.8,.2,1)}
.ctx-act{display:flex;gap:8px;align-items:center}
.ctx-n{padding:6px 11px;border-radius:99px;background:rgba(0,0,0,.2);font:800 12.5px system-ui,sans-serif}
.ctx-rnd,.ctx-chev{border:0;cursor:pointer;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:rgba(255,255,255,.2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);font-size:16px;transition:transform .3s,background .2s}
.ctx-rnd:hover{transform:rotate(20deg) scale(1.08);background:rgba(255,255,255,.32)}
.ctx-chev svg{width:18px;height:18px;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.ctx-s.open .ctx-chev svg{transform:rotate(180deg)}
.ctx-pills{display:flex;flex-wrap:wrap;gap:7px;padding:12px 18px 14px}
.ctx-pills a{display:inline-flex;gap:6px;align-items:center;padding:6px 11px;border-radius:99px;text-decoration:none;color:var(--tx);font:700 12.5px system-ui,sans-serif;background:color-mix(in srgb,var(--c) 10%,var(--sf));border:1px solid color-mix(in srgb,var(--c) 24%,transparent);transition:background .2s,transform .2s}
.ctx-pills a em{font-style:normal;opacity:.6}
.ctx-pills a:hover{background:color-mix(in srgb,var(--c) 22%,var(--sf));transform:translateY(-2px)}
.ctx-s.open .ctx-pills{display:none}
.ctx-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.8,.2,1)}
.ctx-s.open .ctx-body{grid-template-rows:1fr}
.ctx-body>div{overflow:hidden}
.ctx-subs{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;padding:16px 16px 18px}
.ctx-sub{border-radius:16px;padding:12px 12px 8px;background:var(--sf);border:1px solid var(--bd);opacity:0;transform:translateY(10px);transition:opacity .4s,transform .45s cubic-bezier(.2,1.2,.4,1);transition-delay:calc(var(--k)*50ms)}
.ctx-s.open .ctx-sub{opacity:1;transform:none}
.ctx-sub h4{display:flex;align-items:center;gap:8px;margin:0 0 6px;font:800 14.5px var(--disp)}
.ctx-sub h4 a{color:var(--hd);text-decoration:none}.ctx-sub h4 a:hover{color:var(--c)}
.ctx-sub h4 .sico{flex:none}
.ctx-sub h4 em{margin-left:auto;font-style:normal;font:700 11.5px system-ui,sans-serif;color:var(--mu)}
.ctx-sub ol{list-style:none;margin:0;padding:0;counter-reset:a}
.ctx-sub li a{display:flex;gap:8px;align-items:baseline;padding:5px 6px;border-radius:8px;color:var(--tx);text-decoration:none;font:14px/1.35 system-ui,sans-serif;transition:background .15s,padding .2s}
.ctx-sub li a:before{counter-increment:a;content:counter(a);flex:none;min-width:18px;font:800 11px var(--disp);color:var(--c);opacity:.8}
.ctx-sub li a:hover{background:color-mix(in srgb,var(--c) 12%,transparent);padding-left:10px}
.ctx-sub li a.rd:after{content:"✓";margin-left:auto;color:#10b981;font-weight:900}
.ctx-sub li.hide{display:none}
.ctx mark{background:color-mix(in srgb,#f59e0b 40%,transparent);color:inherit;border-radius:3px}
.ctx-none{padding:30px;text-align:center;color:var(--mu);font:600 15px system-ui,sans-serif}
.ctx-s.hide{display:none}
:root[data-theme=dark] .ctx-sub{background:color-mix(in srgb,var(--sf) 70%,#000)}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .ctx-sub{background:color-mix(in srgb,var(--sf) 70%,#000)}}
@media (max-width:640px){.ctx-hero{padding:24px 18px 20px;border-radius:22px}.ctx-h{grid-template-columns:auto 1fr;gap:12px;padding:14px}.ctx-act{grid-column:1/-1;justify-content:flex-end}.ctx-ic{width:50px;height:50px}.ctx-ic svg{width:44px;height:44px}.ctx-subs{grid-template-columns:1fr;padding:12px}}
@media (prefers-reduced-motion:reduce){.ctx-hero,.ctx-orbs i,.ctx-s,.ctx-links a{animation:none!important}.ctx-body,.ctx-sub{transition:none!important}}
`;
const st=document.createElement("style");st.id="contentsxcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const enc2=encodeURIComponent;
const Ls=(k,d)=>{try{const v=JSON.parse(localStorage[k]);return v==null?d:v}catch(e){return d}};
const chev='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
let spy=null;
R.contents=function(){
  const ORDER=Object.keys(CAT);
  try{if(typeof setCat=="function")setCat(null)}catch(e){}
  const V=document.getElementById("v"),SU=window.SUBJ||{};
  const seen=new Set([...(Ls("rd",[])||[]),...((Ls("hist",[])||[]).map(h=>typeof h=="string"?h:h&&h.i).filter(Boolean))]);
  let nSec=0,nArt=0,nSeen=0;const data=ORDER.map(c=>{const S=SU[c]||{subs:[]};const subs=S.subs.map(b=>({n:b.n,arts:b.ids.map(get).filter(Boolean)})).filter(b=>b.arts.length);
    const ids=[...new Set(subs.flatMap(b=>b.arts.map(a=>a.id)))];const sn=ids.filter(i=>seen.has(i)).length;nSec+=subs.length;nArt+=ids.length;nSeen+=sn;return{c,S,subs,ids,sn}});
  const open=new Set(Ls("ctxopen",[]));
  const col=c=>CAT[c]||["#4f46e5","#a5b4fc"];
  const icon=c=>window.subjArt?subjArt(c):E((SU[c]||{}).i||"");
  V.innerHTML=`<div class="ctx"><section class="ctx-hero"><div class="ctx-orbs" aria-hidden="true">${[[8,20,140,"30px,-20px",14],[70,-10,220,"-40px,30px",18],[40,60,120,"20px,20px",12],[88,55,90,"-20px,-30px",16]].map(o=>`<i style="left:${o[0]}%;top:${o[1]}%;width:${o[2]}px;height:${o[2]}px;--x:${o[3].split(",")[0]};--y:${o[3].split(",")[1]};--d:${o[4]}s"></i>`).join("")}</div>
  <h2>Contents</h2><p>Every subject, sub-section and article in the encyclopedia. Filter as you type, open a subject to see everything inside, or jump straight to one from the bar below.</p>
  <div class="ctx-kpi"><span><b data-n="${ORDER.length}">0</b>subjects</span><span><b data-n="${nSec}">0</b>sections</span><span><b data-n="${nArt}">0</b>articles</span><span><b data-n="${nSeen}">0</b>you have opened</span></div>
  <div class="ctx-tools"><label class="ctx-f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="ctxq" type="search" placeholder="Filter articles and sections…" aria-label="Filter articles and sections" autocomplete="off"></label>
  <button class="ctx-b" id="ctxall">Expand all</button><button class="ctx-b" id="ctxrnd">🎲 Surprise me</button></div></section>
  <div class="ctx-links">${[["#/howto","📘","How to use"],["#/index","🔎","Index"],["#/gloss","📖","Glossary"],["#/az","🔤","Quick reference A–Z"],["#/dict","📚","Dictionary"],["#/guides","🧭","Reading guides"],["#/countries","🏳️","Countries"],["#/atlas","🗺️","Atlas"],["#/time","⏳","Timeline"],["#/maze","🧩","Quizzes"],["#/book","🖨️","Print the book"]].map((l,k)=>`<a href="${l[0]}" style="--k:${k}">${l[1]} ${l[2]}</a>`).join("")}</div>
  <div class="ctx-rail" role="navigation" aria-label="Jump to a subject">${data.map((d,k)=>`<a href="#ctx-${k}" data-k="${k}" style="--c:${col(d.c)[0]};--l:${col(d.c)[1]}"><i>${E(d.S.i||"")}</i>${E(d.c)}</a>`).join("")}</div>
  <div class="ctx-list">${data.map((d,k)=>{const[c1,c2]=col(d.c);const p=d.ids.length?Math.round(d.sn/d.ids.length*100):0;return `<section class="ctx-s${open.has(d.c)?" open":""}" id="ctx-${k}" data-c="${E(d.c)}" style="--c:${c1};--l:${c2};--k:${Math.min(k,12)}">
    <div class="ctx-h" role="button" tabindex="0" aria-expanded="${open.has(d.c)}"><span class="ctx-ic">${icon(d.c)}</span><div><h3><a href="#/cat/${enc2(d.c)}">${E(d.c)}</a></h3><small>${E(d.S.tag||"")}</small><div class="ctx-pg"><u><i style="--p:${p}%"></i></u>${d.sn} of ${d.ids.length} opened</div></div>
    <div class="ctx-act"><span class="ctx-n">${d.ids.length} articles</span><button class="ctx-rnd" title="Random article from ${E(d.c)}" aria-label="Random article from ${E(d.c)}">🎲</button><button class="ctx-chev" aria-label="Show or hide articles">${chev}</button></div></div>
    <div class="ctx-pills">${d.subs.map(b=>`<a href="#/cat/${enc2(d.c)}/${enc2(b.n)}">${window.secIcon?secIcon(b.n,c1):""}${E(b.n)} <em>${b.arts.length}</em></a>`).join("")}</div>
    <div class="ctx-body"><div><div class="ctx-subs">${d.subs.map((b,j)=>`<div class="ctx-sub" style="--k:${Math.min(j,8)}"><h4>${window.secIcon?secIcon(b.n,c1):""}<a href="#/cat/${enc2(d.c)}/${enc2(b.n)}">${E(b.n)}</a><em>${b.arts.length}</em></h4><ol>${b.arts.map(a=>`<li data-t="${E(a.t.toLowerCase())}"><a href="#/art/${a.id}"${seen.has(a.id)?' class="rd"':""}><span>${E(a.t)}</span></a></li>`).join("")}</ol></div>`).join("")}</div></div></div></section>`}).join("")}
  <div class="ctx-none" id="ctxnone" hidden>No articles match that filter.</div></div></div>`;
  const $$=s=>V.querySelector(s),secs=[...V.querySelectorAll(".ctx-s")];
  const save=()=>{try{localStorage.ctxopen=JSON.stringify(secs.filter(s=>s.classList.contains("open")).map(s=>s.dataset.c))}catch(e){}};
  const setAllBtn=()=>{$$("#ctxall").textContent=secs.every(s=>s.classList.contains("open"))?"Collapse all":"Expand all"};
  const toggle=(s,force)=>{const on=force==null?!s.classList.contains("open"):force;s.classList.toggle("open",on);s.querySelector(".ctx-h").setAttribute("aria-expanded",on);save();setAllBtn()};
  V.querySelectorAll(".ctx-h").forEach(h=>{const s=h.closest(".ctx-s");h.addEventListener("click",e=>{if(e.target.closest("a,.ctx-rnd"))return;toggle(s)});h.addEventListener("keydown",e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();toggle(s)}})});
  V.querySelectorAll(".ctx-rnd").forEach(b=>b.onclick=e=>{e.stopPropagation();const d=data[+b.closest(".ctx-s").id.slice(4)];if(d.ids.length)location.hash="#/art/"+d.ids[Math.floor(Math.random()*d.ids.length)]});
  $$("#ctxrnd").onclick=()=>{const all=data.flatMap(d=>d.ids);location.hash="#/art/"+all[Math.floor(Math.random()*all.length)]};
  $$("#ctxall").onclick=()=>{const on=!secs.every(s=>s.classList.contains("open"));secs.forEach(s=>toggle(s,on))};setAllBtn();
  V.querySelectorAll(".ctx-rail a").forEach(a=>a.onclick=e=>{e.preventDefault();const s=document.getElementById("ctx-"+a.dataset.k);if(!s)return;if(!s.classList.contains("open"))toggle(s,true);s.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});
  /* live filter */
  const q=$$("#ctxq");let ft=0;q.oninput=()=>{clearTimeout(ft);ft=setTimeout(()=>{const k=q.value.trim().toLowerCase();let any=false;
    secs.forEach(s=>{let hit=0;s.querySelectorAll(".ctx-sub").forEach(sb=>{const subHit=k&&sb.querySelector("h4 a").textContent.toLowerCase().includes(k);let n=0;
      sb.querySelectorAll("li").forEach(li=>{const m=!k||subHit||li.dataset.t.includes(k);li.classList.toggle("hide",!m);if(m)n++;const a=li.querySelector("a");const t=a.textContent;
        if(k&&m&&!subHit){const i=t.toLowerCase().indexOf(k);a.innerHTML="<span>"+E(t.slice(0,i))+"<mark>"+E(t.slice(i,i+k.length))+"</mark>"+E(t.slice(i+k.length))+"</span>"}else if(a.querySelector("mark"))a.innerHTML="<span>"+E(t)+"</span>"});
      sb.style.display=n?"":"none";hit+=n});
      const nameHit=k&&s.dataset.c.toLowerCase().includes(k);if(nameHit){s.querySelectorAll(".ctx-sub,.ctx-sub li").forEach(x=>{x.style.display="";x.classList.remove("hide")});hit=1}
      s.classList.toggle("hide",!!k&&!hit);if(k&&hit)s.classList.add("open");if(hit)any=true});
    if(!k){const o=new Set(Ls("ctxopen",[]));secs.forEach(s=>{s.classList.toggle("open",o.has(s.dataset.c));s.querySelectorAll(".ctx-sub").forEach(x=>x.style.display="")})}
    $$("#ctxnone").hidden=any||!k;setAllBtn()},120)};
  /* count up */
  V.querySelectorAll(".ctx-kpi b").forEach(b=>{const n=+b.dataset.n,t0=performance.now();if(matchMedia("(prefers-reduced-motion: reduce)").matches){b.textContent=n.toLocaleString("en-US");return}
    const tick=t=>{const f=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-f,3))).toLocaleString("en-US");if(f<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)});
  /* scroll spy */
  if(spy)spy.disconnect();if("IntersectionObserver" in window){const rail=$$(".ctx-rail");spy=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const k=e.target.id.slice(4);rail.querySelectorAll("a").forEach(a=>a.classList.toggle("on",a.dataset.k==k));const on=rail.querySelector("a.on");on&&rail.scrollTo({left:on.offsetLeft-rail.clientWidth/2+on.clientWidth/2,behavior:"smooth"})}})},{rootMargin:"-30% 0px -60% 0px"});secs.forEach(s=>spy.observe(s))}
};
})();
