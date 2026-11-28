// Quick reference A–Z, My Library and Atlas (v178): gradient heroes, glass cards, colors and more tools.
(function(){
if(typeof R=="undefined"||typeof A=="undefined")return;
const css=`
.px-hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:30px 30px 22px;margin:6px 0 16px;color:#fff;background:linear-gradient(125deg,var(--a),var(--b) 50%,var(--c));background-size:220% 220%;animation:pxFlow 16s ease-in-out infinite alternate;box-shadow:0 30px 60px -36px var(--b)}
@keyframes pxFlow{to{background-position:100% 100%}}
.px-hero h2{margin:0;font:900 clamp(30px,4.8vw,50px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.px-hero p{margin:8px 0 14px;font:600 15px/1.45 system-ui,sans-serif;color:#fff!important;opacity:.93;max-width:640px}
.px-hero .deco{position:absolute;right:-10px;top:-24px;z-index:-1;font:900 200px/1 var(--disp);color:rgba(255,255,255,.1);pointer-events:none;animation:pxDeco 18s ease-in-out infinite alternate}
@keyframes pxDeco{to{transform:translate(-30px,10px) rotate(-4deg)}}
.px-kpi{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.px-kpi span{padding:8px 13px;border-radius:15px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);font:700 12.5px system-ui,sans-serif}
.px-kpi b{display:block;font:900 21px/1.05 var(--disp)}
.px-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.px-f{flex:1 1 280px;position:relative}
.px-f input{width:100%;box-sizing:border-box;padding:13px 16px 13px 44px!important;border-radius:15px!important;border:1px solid rgba(255,255,255,.5)!important;background:rgba(255,255,255,.93)!important;color:#1e1b4b!important;font:600 15.5px system-ui,sans-serif!important;outline:none;box-shadow:0 14px 28px -18px rgba(0,0,0,.5)}
.px-f svg{position:absolute;left:15px;top:50%;translate:0 -50%;width:18px;height:18px;color:var(--b)}
.px-btn{border:0;cursor:pointer;padding:11px 14px;border-radius:14px;font:800 13.5px var(--disp);color:var(--b);background:#fff;box-shadow:0 10px 22px -14px rgba(0,0,0,.5);transition:transform .2s}
.px-btn:hover{transform:rotate(-3deg) scale(1.05)}
.px-chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 10px}
.px-ch{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);border-radius:99px;padding:6px 12px;font:700 12.5px system-ui,sans-serif;cursor:pointer;transition:background .2s,color .2s,transform .2s,border-color .2s}
.px-ch i{width:9px;height:9px;border-radius:50%;background:var(--c)}
.px-ch em{font-style:normal;opacity:.55}
.px-ch:hover{transform:translateY(-2px);border-color:var(--c)}
.px-ch.on{background:var(--c);border-color:var(--c);color:#fff}.px-ch.on i{background:#fff}
.px-az{display:grid;grid-template-columns:repeat(27,1fr);gap:5px;margin:0 0 16px}
.px-az button{border:0;cursor:pointer;aspect-ratio:1;border-radius:10px;font:900 13.5px var(--disp);color:#fff;background:linear-gradient(140deg,hsl(var(--h) 82% 56%),hsl(calc(var(--h) + 30) 82% 46%));transition:transform .2s cubic-bezier(.3,1.6,.5,1),opacity .2s,box-shadow .2s}
.px-az button:hover{transform:translateY(-3px) scale(1.1)}
.px-az button:disabled{opacity:.22;cursor:default;transform:none}
.px-az.pick button:not(.on):not(:disabled){opacity:.5}
.px-az button.on{box-shadow:0 0 0 3px var(--bg),0 0 0 5px hsl(var(--h) 82% 52%);transform:scale(1.08)}
.px-meta{margin:0 2px 12px;color:var(--mu);font:600 13.5px system-ui,sans-serif}.px-meta b{color:var(--hd)}
.px-let{grid-column:1/-1;margin:14px 0 2px;font:900 34px/1 var(--disp);background:linear-gradient(135deg,hsl(var(--h) 82% 56%),hsl(calc(var(--h) + 40) 82% 46%));-webkit-background-clip:text;background-clip:text;color:transparent}
.px-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.px-e{position:relative;display:block;padding:14px 16px 12px;border-radius:18px;text-decoration:none;color:var(--tx);background:color-mix(in srgb,var(--sf) 88%,transparent);border:1px solid var(--bd);border-top:4px solid var(--c);animation:pxIn .45s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--k,0)*18ms);transition:transform .25s,box-shadow .25s}
@keyframes pxIn{from{opacity:0;transform:translateY(12px)}}
.px-e:hover{transform:translateY(-4px);box-shadow:0 16px 30px -22px var(--c)}
.px-e b{display:block;font:800 16.5px/1.2 var(--disp);color:var(--hd)}
.px-e small{display:inline-flex;align-items:center;gap:5px;margin:6px 0;padding:2px 9px;border-radius:99px;font:700 11.5px system-ui,sans-serif;background:color-mix(in srgb,var(--c) 15%,transparent)}
.px-e small i{width:7px;height:7px;border-radius:50%;background:var(--c)}
.px-e span{display:block;font:14px/1.45 system-ui,sans-serif;color:var(--tx2,var(--tx))}
.px-e .rel{display:inline-block;margin-top:8px;font:700 12.5px system-ui,sans-serif;color:var(--c)}
.px-e mark,.px-li mark{background:color-mix(in srgb,#f59e0b 40%,transparent);color:inherit;border-radius:3px}
.px-more{height:60px}
.px-empty{text-align:center;padding:34px 10px;color:var(--mu);font:600 15px system-ui,sans-serif;grid-column:1/-1}.px-empty b{display:block;font-size:40px;margin-bottom:6px}
/* library */
.px-ring{position:absolute;right:26px;top:24px;width:118px;height:118px}
.px-ring svg{width:118px;height:118px;rotate:-90deg}.px-ring circle{fill:none;stroke-width:11}
.px-ring .bg{stroke:rgba(255,255,255,.22)}.px-ring .fg{stroke:#fff;stroke-linecap:round;transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)}
.px-ring div{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.px-ring b{font:900 26px/1 var(--disp)}.px-ring small{font:700 11px system-ui,sans-serif;color:#fff!important;opacity:.9}
.px-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.px-tab{display:inline-flex;align-items:center;gap:7px;border:0;cursor:pointer;padding:10px 15px;border-radius:14px;font:800 14px var(--disp);color:var(--tx);background:var(--sf);box-shadow:inset 0 0 0 1px var(--bd);transition:transform .2s,background .2s,color .2s}
.px-tab em{font-style:normal;padding:1px 8px;border-radius:99px;background:var(--sf2);font:800 12px system-ui,sans-serif}
.px-tab:hover{transform:translateY(-2px)}
.px-tab.on{background:linear-gradient(135deg,var(--a),var(--b));color:#fff;box-shadow:0 10px 22px -14px var(--b)}.px-tab.on em{background:rgba(255,255,255,.25)}
.px-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
.px-li{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:10px 12px;border-radius:16px;background:var(--sf);border:1px solid var(--bd);border-left:5px solid var(--c);animation:pxIn .4s both;animation-delay:calc(var(--k,0)*25ms);transition:transform .2s,box-shadow .2s}
.px-li:hover{transform:translateX(4px);box-shadow:0 12px 24px -18px var(--c)}
.px-li .e{width:44px;height:44px;border-radius:13px;overflow:hidden;position:relative;display:grid;place-items:center;font-size:22px;background:color-mix(in srgb,var(--c) 15%,transparent)}
.px-li .e .ban{position:absolute!important;inset:0;height:100%!important;font-size:22px!important;display:grid;place-items:center;border-radius:0!important}
.px-li .e .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.px-li a.t{min-width:0;text-decoration:none;color:var(--tx)}
.px-li a.t b{display:block;font:800 15px/1.2 var(--disp);color:var(--hd);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.px-li a.t small{display:block;margin-top:2px;color:var(--mu);font:600 12px system-ui,sans-serif}
.px-x{border:0;cursor:pointer;width:32px;height:32px;border-radius:10px;background:var(--sf2);color:var(--mu);font-size:15px;transition:background .2s,color .2s,transform .2s}
.px-x:hover{background:#ef4444;color:#fff;transform:rotate(90deg)}
.px-sub{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin:0 0 18px}
.px-sp{padding:12px 14px;border-radius:16px;background:var(--sf);border:1px solid var(--bd);text-decoration:none;color:var(--tx);transition:transform .2s,box-shadow .2s;animation:pxIn .4s both;animation-delay:calc(var(--k,0)*30ms)}
.px-sp:hover{transform:translateY(-3px);box-shadow:0 14px 26px -20px var(--c)}
.px-sp b{display:flex;justify-content:space-between;font:800 14px var(--disp)}
.px-sp b em{font-style:normal;color:var(--mu);font:700 12px system-ui,sans-serif}
.px-sp u{display:block;height:8px;margin-top:8px;border-radius:99px;background:var(--sf2);overflow:hidden;text-decoration:none}
.px-sp u i{display:block;height:100%;width:var(--p);border-radius:inherit;background:linear-gradient(90deg,var(--c),var(--l));transition:width 1.2s cubic-bezier(.2,.8,.2,1)}
.px-h3{font:900 20px var(--disp);margin:18px 0 10px;color:var(--hd)}
.px-note{width:100%;box-sizing:border-box;min-height:260px;padding:16px;border-radius:18px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:15px/1.6 system-ui,sans-serif;resize:vertical}
.px-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}
.px-sbtn{border:0;cursor:pointer;padding:10px 14px;border-radius:12px;font:800 13.5px var(--disp);color:var(--tx);background:var(--sf2);text-decoration:none;display:inline-flex;gap:6px;align-items:center;transition:transform .2s}
.px-sbtn:hover{transform:translateY(-2px)}.px-sbtn.pri{color:#fff;background:linear-gradient(135deg,var(--a),var(--b))}
.px-chipw{display:flex;flex-wrap:wrap;gap:8px}
.px-chipw a{padding:7px 12px;border-radius:99px;background:var(--sf);border:1px solid var(--bd);color:var(--tx);text-decoration:none;font:700 13.5px system-ui,sans-serif}
@media (min-width:641px){.px-lib{padding-right:170px!important}}
/* atlas */
.aview{display:inline-flex;padding:3px;border-radius:13px;background:var(--sf2);gap:2px;flex:none}
.aview button{border:0;cursor:pointer;padding:7px 12px;border-radius:10px;font:800 13px var(--disp);color:var(--tx);background:none;transition:background .2s,color .2s}
.aview button.on{background:linear-gradient(135deg,#0f766e,#0284c7);color:#fff;box-shadow:0 6px 14px -8px #0284c7}
.aglc{position:absolute;inset:0;width:100%;height:100%;display:none;touch-action:none;cursor:grab;z-index:2;outline:none}
.aglc.drag{cursor:grabbing}
.atl-wrap.isglobe .aglc{display:block}
.atl-wrap.isglobe>svg,.atl-wrap.isglobe .atl-mini,.atl-wrap.isglobe .atl-paper{opacity:0!important;pointer-events:none!important}
.atl-wrap.isglobe{background:radial-gradient(ellipse at 50% 45%,color-mix(in srgb,#0284c7 10%,var(--sf)),var(--sf) 70%)}
:root[data-theme=dark] .atl-wrap.isglobe{background:radial-gradient(ellipse at 50% 45%,#0c1530,#05070f 75%)}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .atl-wrap.isglobe{background:radial-gradient(ellipse at 50% 45%,#0c1530,#05070f 75%)}}
.atl-wrap.isglobe .atl-tip,.atl-wrap.isglobe .atl-scale{z-index:3}
@media (max-width:700px){.atl-tools{flex-wrap:wrap!important}.atl-tools #acq{flex:1 1 100%!important;min-width:0}.aview{order:2}.atl-z{order:3;margin-left:auto}}

.px-atl{--a:#0f766e;--b:#0284c7;--c:#7c3aed;padding-right:250px;min-height:150px}
.px-atl .glb{position:absolute!important;right:24px;top:50%;translate:0 -50%;margin:0!important;float:none!important;filter:drop-shadow(0 18px 30px rgba(0,0,0,.35))}
.px-atl .glb small{color:#fff!important;opacity:.85}
.hmtools a{background:linear-gradient(125deg,#0f766e,#1d4ed8 60%,#7c3aed)!important;box-shadow:0 22px 40px -26px #1d4ed8!important}
.hmtools a:after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(14px 14px at 72% 40%,#fbbf24 60%,transparent 70%),radial-gradient(18px 18px at 82% 62%,#f472b6 60%,transparent 70%),radial-gradient(12px 12px at 90% 34%,#34d399 60%,transparent 70%);opacity:.8;animation:pxPulse 3.5s ease-in-out infinite alternate}
@keyframes pxPulse{from{opacity:.35}to{opacity:.95}}
#atl .atl-map,#atl>div:last-child{border-radius:22px}
@media (max-width:760px){.px-atl{padding-right:30px}.px-atl .glb{position:relative!important;right:auto;top:auto;translate:none;margin:10px auto 0!important}}
@media (max-width:640px){.px-hero{padding:24px 18px 18px;border-radius:22px}.px-az{grid-template-columns:repeat(9,1fr)}.px-ring{position:relative;right:auto;top:auto;margin:0 0 10px}.px-hero .deco{font-size:130px}}
@media (prefers-reduced-motion:reduce){.px-hero,.px-hero .deco,.px-e,.px-li,.px-sp,.hmtools a:after{animation:none!important}}
`;
const st=document.createElement("style");st.id="pagesxcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const Ls=(k,d)=>{try{const v=JSON.parse(localStorage[k]);return v==null?d:v}catch(e){return d}},Sv=(k,v)=>{try{localStorage[k]=JSON.stringify(v)}catch(e){}};
const srch='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';
const col=k=>CAT[k]||["#6366f1","#a5b4fc"];
const ST=t=>String(t).replace(/^(The|A|An)\s+/i,"");
const L1=s=>{const c=ST(s).normalize("NFD").replace(/[̀-ͯ]/g,"")[0];return c&&/[a-z]/i.test(c)?c.toUpperCase():"#"};
const first=t=>{const m=String(t).match(/^.*?[.!?](\s|$)/);return m?m[0]:t};
const hl=(t,q)=>{if(!q)return E(t);const i=t.toLowerCase().indexOf(q);return i<0?E(t):E(t.slice(0,i))+"<mark>"+E(t.slice(i,i+q.length))+"</mark>"+E(t.slice(i+q.length))};
const sc=()=>{try{if(typeof setCat=="function")setCat(null)}catch(e){}};
let azio=null;
/* ---------- Quick reference A–Z ---------- */
if(window.SH)R.az=function(l){sc();const V=document.getElementById("v"),SHL=window.SH||[];const abc=["#",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];const has=new Set(SHL.map(e=>L1(e.t)));
  const S={l:l&&has.has(l)?l:"",q:"",sub:"",n:0};const cnt={};SHL.forEach(e=>cnt[e.c]=(cnt[e.c]||0)+1);const subs=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
  V.innerHTML=`<section class="px-hero" style="--a:#f59e0b;--b:#ef4444;--c:#8b5cf6"><div class="deco" aria-hidden="true">A–Z</div><h2>Quick reference A–Z</h2><p>Short entries on people, places, foods, words and ideas, to go with the full articles. Each entry links to related articles.</p>
  <div class="px-kpi"><span><b>${SHL.length.toLocaleString("en-US")}</b>entries</span><span><b>${subs.length}</b>subjects</span><span><b>${SHL.filter(e=>e.art).length}</b>with a full article</span></div>
  <div class="px-tools"><label class="px-f">${srch}<input id="azq" type="search" placeholder="Find an entry…" aria-label="Find an entry" autocomplete="off"></label><button class="px-btn" id="azr">🎲 Random entry</button></div></section>
  <div class="px-az" id="aza">${abc.map((c,i)=>`<button data-l="${c}" style="--h:${i*13}"${has.has(c)?"":" disabled"} aria-label="Entries starting with ${c}">${c}</button>`).join("")}</div>
  <div class="px-chips" id="azs"></div><div class="px-meta" id="azm"></div><div class="px-grid" id="azb"></div><div class="px-more" id="azmore"></div>`;
  const $$=s=>V.querySelector(s);let L=[];
  function chips(){$$("#azs").innerHTML=`<button class="px-ch${S.sub?"":" on"}" data-s="" style="--c:#6366f1"><i></i>All subjects</button>`+subs.map(k=>`<button class="px-ch${S.sub==k?" on":""}" data-s="${E(k)}" style="--c:${col(k)[0]}"><i></i>${E(k)} <em>${cnt[k]}</em></button>`).join("")}
  function card(e,k){const h=abc.indexOf(L1(e.t))*13;const a=e.art&&get(e.art);return `<a class="px-e" href="#/e/${e.id}" style="--c:${col(e.c)[0]};--k:${Math.min(k,24)}" data-l="${L1(e.t)}"><b>${hl(e.t,S.q)}</b><small><i></i>${E(e.c)}</small><span>${S.q?hl(first(e.x),S.q):E(first(e.x))}</span>${a?`<span class="rel">📖 Full article: ${E(a.t)}</span>`:""}</a>`}
  let cur="";function more(n){if(S.n>=L.length)return;const ch=L.slice(S.n,S.n+n);const b=S.n;S.n+=ch.length;let h="";ch.forEach((e,j)=>{const lt=L1(e.t);if(!S.q&&lt!=cur){cur=lt;h+=`<div class="px-let" style="--h:${abc.indexOf(lt)*13}" id="az-${lt=="#"?"num":lt}">${lt}</div>`}h+=card(e,j)});$$("#azb").insertAdjacentHTML("beforeend",h)}
  function compute(){const q=S.q;L=SHL.filter(e=>(!S.sub||e.c==S.sub)&&(q?(e.t+" "+e.x).toLowerCase().includes(q):(!S.l||L1(e.t)==S.l)));S.n=0;cur="";$$("#azb").innerHTML=L.length?"":`<div class="px-empty"><b>🔎</b>No entries found.</div>`;
    $$("#azm").innerHTML=`<b>${L.length.toLocaleString("en-US")}</b> entr${L.length==1?"y":"ies"}${S.l&&!q?` starting with ${S.l}`:""}${S.sub?` in ${E(S.sub)}`:""}`;
    $$("#aza").classList.toggle("pick",!!S.l&&!q);V.querySelectorAll("#aza button").forEach(b=>b.classList.toggle("on",b.dataset.l==S.l&&!q));chips();more(90)}
  $$("#aza").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;S.l=S.l==b.dataset.l?"":b.dataset.l;S.q="";$$("#azq").value="";try{history.replaceState(null,"","#/az"+(S.l?"/"+encodeURIComponent(S.l):""))}catch(x){}compute()};
  $$("#azs").onclick=e=>{const b=e.target.closest("[data-s]");if(!b)return;S.sub=b.dataset.s;compute()};
  let ft=0;$$("#azq").oninput=e=>{clearTimeout(ft);ft=setTimeout(()=>{S.q=e.target.value.trim().toLowerCase();compute()},130)};
  $$("#azr").onclick=()=>{const p=L.length?L:SHL;const e=p[Math.floor(Math.random()*p.length)];location.hash="#/e/"+e.id};
  if(azio)azio.disconnect();if("IntersectionObserver" in window){azio=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting))more(90)},{rootMargin:"1000px"});azio.observe($$("#azmore"))}
  compute()};
/* ---------- My Library ---------- */
R.saved=function(tab){sc();const V=document.getElementById("v");
  const getA=id=>{try{return get(id)}catch(e){return null}};
  const bmL=()=>(Ls("bm",[])||[]).map(getA).filter(Boolean),rdL=()=>(Ls("rd",[])||[]).map(getA).filter(Boolean);
  const hist=(Ls("hist",[])||[]).map(h=>typeof h=="string"?{i:h}:h).filter(h=>h&&getA(h.i));
  const stars=Ls("ep-dict-stars",[])||[],best=Ls("best",{})||{},notes=Ls("nt","")||"",qs=Ls("qxstats",{played:0,right:0,asked:0});
  const readSet=new Set([...(Ls("rd",[])||[]),...hist.map(h=>h.i)]);const pct=Math.round(readSet.size/A.length*1000)/10;
  const T=[["bm","🔖","Bookmarks",bmL().length],["recent","🕘","Recently viewed",hist.length],["read","✅","Read",rdL().length],["progress","📊","Progress",""],["notes","📝","Notes",notes.trim()?"✎":""],["extras","⭐","Words and scores",stars.length+Object.keys(best).length]];
  tab=T.find(t=>t[0]==tab)?tab:"bm";const C=2*Math.PI*48;
  V.innerHTML=`<section class="px-hero px-lib" style="--a:#8b5cf6;--b:#ec4899;--c:#f59e0b"><h2>My Library</h2><p>Your bookmarks, reading history, notes, starred words and quiz scores, all in one place. Everything is saved in this browser on this device.</p>
  <div class="px-kpi"><span><b>${bmL().length}</b>bookmarks</span><span><b>${readSet.size}</b>articles opened</span><span><b>${stars.length}</b>starred words</span><span><b>${qs.played||0}</b>quiz rounds</span></div>
  <div class="px-ring" title="Share of the encyclopedia you have opened"><svg viewBox="0 0 118 118"><circle class="bg" cx="59" cy="59" r="48"/><circle class="fg" id="pxr" cx="59" cy="59" r="48" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div><b>${pct}%</b><small>explored</small></div></div></section>
  <div class="px-tabs" style="--a:#8b5cf6;--b:#ec4899">${T.map(t=>`<button class="px-tab${t[0]==tab?" on":""}" data-t="${t[0]}">${t[1]} ${t[2]}${t[3]!==""?` <em>${t[3]}</em>`:""}</button>`).join("")}</div><div id="pxb"></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const f=document.getElementById("pxr");if(f)f.style.strokeDashoffset=C*(1-Math.min(1,readSet.size/A.length))}));
  const box=V.querySelector("#pxb");
  const li=(a,k,rm,sub)=>{const c=col(a.c)[0];return `<div class="px-li" style="--c:${c};--k:${Math.min(k,20)}"><span class="e">${typeof ban=="function"?ban(a):a.i}</span><a class="t" href="#/art/${a.id}"><b>${E(a.t)}</b><small>${E(sub||a.sub||a.c)}</small></a>${rm?`<button class="px-x" data-rm="${a.id}" title="Remove" aria-label="Remove ${E(a.t)}">✕</button>`:"<span></span>"}</div>`};
  const empty=(e,t,btn)=>`<div class="px-empty"><b>${e}</b>${t}${btn?`<div style="margin-top:12px">${btn}</div>`:""}</div>`;
  const ago=t=>{if(!t)return"";const d=(Date.now()-t)/864e5;return d<1/24?"just now":d<1?Math.round(d*24)+" h ago":d<30?Math.round(d)+" days ago":new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric"})};
  function render(){const want2=[];
    if(tab=="bm"){const l=bmL();box.innerHTML=l.length?`<div class="px-list">${l.map((a,k)=>(want2.push(a),li(a,k,true))).join("")}</div>`:empty("🔖","No bookmarks yet. Open any article and press ☆ Bookmark to save it here.",`<a class="px-sbtn pri" href="#/browse">Browse articles</a>`)}
    else if(tab=="recent"){box.innerHTML=hist.length?`<div class="px-list">${hist.slice(0,60).map((h,k)=>{const a=getA(h.i);want2.push(a);return li(a,k,false,(a.sub||a.c)+(h.t?" · "+ago(h.t):"")+(h.n>1?` · ${h.n} visits`:""))}).join("")}</div><div class="px-row"><a class="px-sbtn" href="#/hist">Full reading history ›</a></div>`:empty("🕘","Nothing viewed yet.",`<a class="px-sbtn pri" href="#/contents">Open the contents</a>`)}
    else if(tab=="read"){const l=rdL();box.innerHTML=l.length?`<div class="px-list">${l.map((a,k)=>(want2.push(a),li(a,k,true))).join("")}</div>`:empty("✅","No articles marked as read. Use ⋯ More › Mark as read on any article.")}
    else if(tab=="progress"){box.innerHTML=`<h3 class="px-h3">Your progress by subject</h3><div class="px-sub">${Object.keys(CAT).map((c,k)=>{const ids=A.filter(a=>a.c==c);const n=ids.filter(a=>readSet.has(a.id)).length;const p=ids.length?Math.round(n/ids.length*100):0;return `<a class="px-sp" href="#/cat/${encodeURIComponent(c)}" style="--c:${col(c)[0]};--l:${col(c)[1]};--k:${k}"><b>${E(c)}<em>${n} / ${ids.length}</em></b><u><i style="--p:0%" data-p="${p}%"></i></u></a>`}).join("")}</div>`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>box.querySelectorAll(".px-sp u i").forEach(i=>i.style.setProperty("--p",i.dataset.p))))}
    else if(tab=="notes"){box.innerHTML=`<textarea class="px-note" id="pxn" placeholder="Jot down ideas, questions and facts as you read…" aria-label="Notes"></textarea><div class="px-row"><button class="px-sbtn pri" id="pxd">⬇ Download notes</button><button class="px-sbtn" id="pxc">🗑 Clear</button><small id="pxs" style="color:var(--mu);font:600 13px system-ui"></small><span style="margin-left:auto;color:var(--mu);font:600 13px system-ui" id="pxw"></span></div>`;
      const t=box.querySelector("#pxn");t.value=Ls("nt","")||"";const wc=()=>{const n=(t.value.trim().match(/\S+/g)||[]).length;box.querySelector("#pxw").textContent=n+" word"+(n==1?"":"s")};wc();
      t.oninput=()=>{Sv("nt",t.value);box.querySelector("#pxs").textContent="✓ Saved";wc()};
      box.querySelector("#pxd").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t.value],{type:"text/plain"}));a.download="notes.txt";a.click()};
      box.querySelector("#pxc").onclick=()=>{if(!t.value||confirmClear())return};
      function confirmClear(){const b=box.querySelector("#pxc");if(b.dataset.c){t.value="";Sv("nt","");wc();b.textContent="🗑 Clear";delete b.dataset.c;box.querySelector("#pxs").textContent="Cleared";return true}b.dataset.c=1;b.textContent="Press again to clear";setTimeout(()=>{if(b.dataset.c){delete b.dataset.c;b.textContent="🗑 Clear"}},3000);return true}}
    else{const lab=k=>k.startsWith("cat:")?k.slice(4):k.startsWith("daily:")?"Daily challenge "+k.slice(6):({mixed:"Mixed",speed:"Speed round",topic:"Which topic?",year:"Guess the year",classic:"Classic questions"})[k]||k;
      box.innerHTML=`<h3 class="px-h3">⭐ Starred words</h3>${stars.length?`<div class="px-chipw">${stars.map(w=>`<a href="#/dict/${encodeURIComponent(w)}">${E(w)}</a>`).join("")}</div>`:`<p style="color:var(--mu)">No starred words yet. Tap ☆ on any word in the <a href="#/dict">Dictionary</a>.</p>`}
      <h3 class="px-h3">🏆 Quiz best scores</h3>${Object.keys(best).length?`<div class="px-chipw">${Object.entries(best).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<a href="#/maze">${E(lab(k))}: <b>${v}</b></a>`).join("")}</div>`:`<p style="color:var(--mu)">No scores yet. Try the <a href="#/maze">Quizzes</a>.</p>`}${qs.asked?`<p style="color:var(--mu);font:600 14px system-ui;margin-top:12px">${qs.played} rounds played · ${Math.round(qs.right/qs.asked*100)}% correct overall</p>`:""}`}
    if(want2.length&&typeof want=="function")try{want(want2)}catch(e){}}
  V.querySelector(".px-tabs").onclick=e=>{const b=e.target.closest(".px-tab");if(!b)return;tab=b.dataset.t;V.querySelectorAll(".px-tab").forEach(x=>x.classList.toggle("on",x==b));try{history.replaceState(null,"","#/saved/"+tab)}catch(x){}render()};
  box.addEventListener("click",e=>{const b=e.target.closest("[data-rm]");if(!b)return;const id=b.dataset.rm,key=tab=="read"?"rd":"bm";const l=(Ls(key,[])||[]).filter(x=>x!=id);Sv(key,l);try{if(key=="bm"&&typeof bm!="undefined")bm=l;if(key=="rd"&&typeof rd!="undefined")rd=l}catch(x){}
    const row=b.closest(".px-li");row.style.transition="opacity .25s,transform .25s";row.style.opacity="0";row.style.transform="translateX(20px)";setTimeout(()=>{render();const t=V.querySelector(`.px-tab[data-t="${tab}"] em`);if(t)t.textContent=l.length},250)});
  render()};
/* ---------- Atlas hero ---------- */
const oa=R.atlas;if(oa)R.atlas=function(x){oa.apply(this,arguments);try{const V=document.getElementById("v");const h2=V.querySelector(":scope>h2");if(!h2||V.querySelector(".px-atl"))return;const p=V.querySelector(".atl-intro"),glb=V.querySelector(".glb");
  const n=(typeof WORLD!="undefined"?WORLD.length:0);const hero=document.createElement("section");hero.className="px-hero px-atl";hero.innerHTML=`<h2>Atlas</h2><p>${p?E(p.textContent):"Explore the world map."}</p><div class="px-kpi"><span><b>193</b>countries</span><span><b>7</b>continents</span><span><b>4</b>map views</span></div><div class="px-tools"><a class="px-btn" href="#/countries" style="text-decoration:none">🏳️ All countries</a><a class="px-btn" href="#/histmap/1492" style="text-decoration:none">🗺️ History map</a><button class="px-btn" id="pxrc">🎲 Random country</button></div>`;
  h2.before(hero);h2.remove();p&&p.remove();if(glb){const wrap=glb.parentElement;hero.appendChild(glb);if(wrap&&wrap!==V&&!wrap.children.length)wrap.remove()}
  hero.querySelector("#pxrc").onclick=()=>{const opts=[...V.querySelectorAll("#acl option")].map(o=>o.value);const inp=V.querySelector("#acq");if(!opts.length||!inp)return;const c=opts[Math.floor(Math.random()*opts.length)];inp.value=c;inp.dispatchEvent(new Event("change",{bubbles:true}));inp.dispatchEvent(new Event("input",{bubbles:true}));const k=new KeyboardEvent("keydown",{key:"Enter",bubbles:true});inp.dispatchEvent(k);V.querySelector("#atl").scrollIntoView({behavior:"smooth",block:"start"})}}catch(e){console.error("atlas hero",e)}};
})();
