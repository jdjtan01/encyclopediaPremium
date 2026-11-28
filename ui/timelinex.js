// Timeline (v177): gradient hero with counts, search and view switch; color-coded eras with icons and summaries;
// event cards with year pills, thumbnails, subject tags and map pins; alternating sides on wide screens;
// a line that draws as you scroll, a floating year marker, a clickable overview bar, subject and era filters,
// "On this day", a random event button and "how long ago" on every card. Progressive loading for the full list.
(function(){
if(typeof R=="undefined"||typeof A=="undefined")return;
const ERAS=[[-99999,499,"Ancient world","🏛️","#d97706","From the first writing to the fall of the Western Roman Empire: farming, cities, empires and great thinkers."],
[500,1499,"Middle Ages","⚔️","#dc2626","Kingdoms, caliphates and dynasties rise and fall, faiths spread and trade links the continents."],
[1500,1899,"Exploration and revolution","⛵","#0d9488","Ocean voyages, the scientific and industrial revolutions, and revolutions that remade nations."],
[1900,1999,"World wars and the 20th century","✈️","#2563eb","Two world wars, the end of empires, the space age and the birth of the digital world."],
[2000,9999,"The 21st century","🚀","#db2777","A connected planet: the internet, smartphones, climate action and new journeys into space."]];
const eraOf=y=>ERAS.findIndex(e=>y>=e[0]&&y<=e[1]);
const NOW=new Date().getFullYear();
const ago=y=>{const n=y<0?NOW-y-1:NOW-y;return n<=0?"this year":n==1?"1 year ago":n.toLocaleString("en-US")+" years ago"};
const fy=y=>y<0?(-y)+" BCE":y+" CE";
const MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
const css=`
.tx{position:relative}
.tx-hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:30px 30px 22px;margin:6px 0 16px;color:#fff;
background:linear-gradient(120deg,#b45309,#dc2626 28%,#0d9488 55%,#2563eb 78%,#db2777);background-size:240% 240%;animation:txFlow 18s ease-in-out infinite alternate;box-shadow:0 30px 60px -36px #2563eb}
@keyframes txFlow{to{background-position:100% 100%}}
.tx-hero h2{margin:0;font:900 clamp(32px,5vw,52px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.tx-hero p{margin:8px 0 14px;font:600 15px/1.45 system-ui,sans-serif;color:#fff!important;opacity:.93;max-width:620px}
.tx-glyph{position:absolute;right:-20px;top:-30px;z-index:-1;font:900 220px/1 var(--disp);color:rgba(255,255,255,.08);letter-spacing:-.05em;pointer-events:none;animation:txGl 20s ease-in-out infinite alternate}
@keyframes txGl{to{transform:translateX(-40px)}}
.tx-kpi{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.tx-kpi span{padding:8px 13px;border-radius:15px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);font:700 12.5px system-ui,sans-serif}
.tx-kpi b{display:block;font:900 21px/1.05 var(--disp)}
.tx-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.tx-f{flex:1 1 280px;position:relative}
.tx-f input{width:100%;box-sizing:border-box;padding:13px 16px 13px 44px!important;border-radius:15px!important;border:1px solid rgba(255,255,255,.5)!important;background:rgba(255,255,255,.93)!important;color:#1e1b4b!important;font:600 15.5px system-ui,sans-serif!important;outline:none;box-shadow:0 14px 28px -18px rgba(0,0,0,.5)}
.tx-f svg{position:absolute;left:15px;top:50%;translate:0 -50%;width:18px;height:18px;color:#2563eb}
.tx-seg{display:inline-flex;padding:4px;border-radius:14px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.tx-seg button{border:0;background:none;color:#fff;font:700 13px system-ui,sans-serif;padding:9px 12px;border-radius:10px;cursor:pointer}
.tx-seg button.on{background:#fff;color:#1d4ed8;box-shadow:0 4px 12px -4px rgba(0,0,0,.35)}
.tx-rnd{border:0;cursor:pointer;padding:11px 14px;border-radius:14px;font:800 13.5px var(--disp);color:#1d4ed8;background:#fff;box-shadow:0 10px 22px -14px rgba(0,0,0,.5);transition:transform .2s}
.tx-rnd:hover{transform:rotate(-3deg) scale(1.05)}
.tx-top{display:grid;grid-template-columns:1.3fr 1fr;gap:14px;margin:0 0 16px}
.tx-otd,.tx .hmtools.tx-map{position:relative;overflow:hidden;border-radius:22px;padding:16px 18px;border:1px solid var(--bd);background:var(--sf)}
.tx-otd h3{margin:0 0 8px;display:flex;align-items:center;gap:8px;font:900 17px var(--disp);color:var(--hd)}
.tx-otd h3 small{margin-left:auto;font:700 12px system-ui,sans-serif;color:var(--mu)}
.tx-otd a{display:flex;gap:10px;align-items:baseline;padding:6px 8px;border-radius:10px;text-decoration:none;color:var(--tx);font:14px/1.4 system-ui,sans-serif;transition:background .2s}
.tx-otd a:hover{background:var(--sf2)}
.tx-otd a b{flex:none;min-width:62px;font:900 13px var(--disp);color:var(--c)}
.tx .hmtools.tx-map{margin:0!important;padding:0!important;background:linear-gradient(135deg,#0f766e,#1d4ed8)!important;border:0!important;box-shadow:0 18px 34px -24px #1d4ed8}
.tx .hmtools.tx-map a{display:block;height:100%;padding:16px 18px;color:#fff;text-decoration:none;position:relative;min-height:110px;box-sizing:border-box}
.tx .hmtools.tx-map b{display:block;font:900 20px var(--disp)}
.tx .hmtools.tx-map span{display:block;font:600 13.5px/1.4 system-ui,sans-serif;opacity:.9;max-width:70%;margin-top:4px}
.tx-mapsvg{position:absolute!important;right:-10px;bottom:-14px;width:190px!important;max-width:none!important;opacity:.9}
.tx-mapsvg .ld{fill:rgba(255,255,255,.26)}
.tx-mapsvg .em{animation:txEmp 4s ease-in-out infinite alternate;transform-origin:center;transform-box:fill-box}
.tx-mapsvg .em:nth-of-type(2){animation-delay:-1.3s}.tx-mapsvg .em:nth-of-type(3){animation-delay:-2.6s}
@keyframes txEmp{from{opacity:.25;transform:scale(.7)}to{opacity:.95;transform:scale(1.15)}}
.tx-ov{position:sticky;top:calc(var(--hjt,64px) + var(--nxs,0px));z-index:20;margin:0 0 14px;padding:8px;border-radius:16px;background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:top .3s}
.tx-ovb{position:relative;display:flex;height:30px;border-radius:10px;overflow:hidden;cursor:pointer}
.tx-ovb button{position:relative;border:0;cursor:pointer;min-width:34px;background:var(--c);color:#fff;font:800 11.5px system-ui,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 6px;transition:filter .2s}
.tx-ovb button:hover{filter:brightness(1.15)}
.tx-ovb button+button{box-shadow:inset 2px 0 0 color-mix(in srgb,var(--bg) 70%,transparent)}
.tx-ovm{position:absolute;top:-3px;bottom:-3px;width:4px;margin-left:-2px;border-radius:4px;background:#fff;box-shadow:0 0 0 2px rgba(0,0,0,.35),0 0 12px #fff;left:0;transition:left .25s;pointer-events:none}
.tx-ovl{display:flex;justify-content:space-between;margin-top:5px;font:700 11px system-ui,sans-serif;color:var(--mu)}
.tx-flt{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 6px}
.tx-ch{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);border-radius:99px;padding:6px 12px;font:700 12.5px system-ui,sans-serif;cursor:pointer;transition:background .2s,color .2s,transform .2s,border-color .2s}
.tx-ch i{width:9px;height:9px;border-radius:50%;background:var(--c)}
.tx-ch em{font-style:normal;opacity:.55}
.tx-ch:hover{transform:translateY(-2px);border-color:var(--c)}
.tx-ch.on{background:var(--c);border-color:var(--c);color:#fff}.tx-ch.on i{background:#fff}
.tx-meta{margin:10px 2px 14px;color:var(--mu);font:600 13.5px system-ui,sans-serif}
.tx-era,.tx-ev{scroll-margin-top:150px}
.tx-flow{position:relative;--tlp:0;padding:6px 0 30px}
.tx-flow:before,.tx-flow:after{content:"";position:absolute;top:0;bottom:0;left:22px;width:4px;border-radius:4px;margin-left:-2px}
.tx-flow:before{background:var(--sf2)}
.tx-flow:after{bottom:auto;height:calc(var(--tlp) * 100%);background:linear-gradient(180deg,color-mix(in srgb,var(--lc,#d97706) 40%,transparent),var(--lc,#d97706) 30%);box-shadow:0 0 14px color-mix(in srgb,var(--lc,#d97706) 60%,transparent);transition:height .15s linear,background .5s}
.tx-era{position:relative;z-index:2;margin:22px 0 14px 0;padding:14px 16px 14px 60px;border-radius:20px;color:#fff;background:linear-gradient(120deg,var(--c),color-mix(in srgb,var(--c) 60%,#000));box-shadow:0 18px 34px -24px var(--c)}
.tx-era .ei{position:absolute;left:8px;top:50%;translate:0 -50%;width:42px;height:42px;border-radius:14px;display:grid;place-items:center;font-size:22px;background:rgba(255,255,255,.2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
.tx-era h3{margin:0;font:900 20px/1.15 var(--disp);color:#fff!important;border:0!important;padding:0!important}
.tx-era p{margin:4px 0 0;font:600 13.5px/1.4 system-ui,sans-serif;color:#fff!important;opacity:.9}
.tx-era small{float:right;font:800 12px system-ui,sans-serif;color:#fff!important;opacity:.85;margin-top:3px}
.tx-cen{position:relative;z-index:2;display:block;width:max-content;margin:16px 0 10px 4px;padding:5px 12px;border-radius:99px;font:800 12px system-ui,sans-serif;color:var(--c);background:var(--sf);box-shadow:inset 0 0 0 2px var(--c)}
.tx-ev{position:relative;margin:0 0 12px 50px;opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .6s cubic-bezier(.2,1.1,.3,1)}
.tx-ev.in{opacity:1;transform:none}
.tx-ev:before{content:"";position:absolute;left:-34px;top:20px;width:14px;height:14px;border-radius:50%;background:var(--sf);box-shadow:0 0 0 4px var(--c);z-index:2;transition:transform .3s}
.tx-ev:hover:before{transform:scale(1.3)}
.tx-c{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;padding:12px 14px;border-radius:18px;background:color-mix(in srgb,var(--sf) 88%,transparent);border:1px solid var(--bd);border-left:4px solid var(--c);transition:transform .25s,box-shadow .25s;text-decoration:none;color:var(--tx)}
.tx-ev:hover .tx-c{transform:translateY(-3px);box-shadow:0 16px 30px -22px var(--c)}
.tx-th{width:58px;height:58px;border-radius:14px;overflow:hidden;position:relative;flex:none;background:color-mix(in srgb,var(--c) 18%,var(--sf2));display:grid;place-items:center;font-size:26px}
.tx-th .ban{position:absolute!important;inset:0;height:100%!important;font-size:26px!important;display:grid;place-items:center;border-radius:0!important}
.tx-th .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.tx-yr{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;color:#fff;background:var(--c);font:900 13px var(--disp)}
.tx-ago{font:700 11.5px system-ui,sans-serif;color:var(--mu);margin-left:6px;opacity:0;transition:opacity .25s}
.tx-ev:hover .tx-ago,.tx-ev:focus-within .tx-ago{opacity:1}
.tx-tx{margin:6px 0 6px;font:600 15px/1.45 system-ui,sans-serif;color:var(--hd)}
.tx-tx a{color:inherit;text-decoration:none;background:linear-gradient(var(--c),var(--c)) 0 100%/0 2px no-repeat;transition:background-size .3s}
.tx-tx a:hover{background-size:100% 2px}
.tx-ft{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.tx-tag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:99px;font:700 11.5px system-ui,sans-serif;color:var(--tx);background:color-mix(in srgb,var(--sc) 14%,transparent);text-decoration:none}
.tx-tag i{width:7px;height:7px;border-radius:50%;background:var(--sc)}
.tx-pin{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:99px;font:700 11.5px system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,#0f766e,#1d4ed8);text-decoration:none;transition:transform .2s}
.tx-pin:hover{transform:scale(1.06)}
.tx-ev.flash .tx-c{animation:txFlash 1.6s ease}
@keyframes txFlash{0%,100%{box-shadow:none}30%{box-shadow:0 0 0 4px var(--c),0 18px 40px -16px var(--c)}}
.tx-yearflag{position:fixed;left:50%;bottom:22px;translate:-50% 0;z-index:30;padding:8px 16px;border-radius:99px;color:#fff;font:900 15px var(--disp);background:var(--c,#2563eb);box-shadow:0 14px 30px -12px var(--c,#2563eb);opacity:0;transition:opacity .3s,background .4s;pointer-events:none}
.tx-yearflag.on{opacity:1}
.tx-more{height:60px}
.tx-empty{text-align:center;padding:40px 10px;color:var(--mu);font:600 15px system-ui,sans-serif}
.tx mark{background:color-mix(in srgb,#f59e0b 40%,transparent);color:inherit;border-radius:3px}
@media (min-width:920px){
.tx-flow:before,.tx-flow:after{left:50%}
.tx-era{margin-left:auto;margin-right:auto;max-width:640px;text-align:left}
.tx-cen{margin:16px auto 10px}
.tx-ev{width:calc(50% - 36px);margin:0 0 12px}
.tx-ev.L{margin-right:auto}.tx-ev.R{margin-left:auto}
.tx-ev.L:before{left:auto;right:-43px}.tx-ev.R:before{left:-43px}
.tx-ev.L .tx-c{border-left:1px solid var(--bd);border-right:4px solid var(--c)}
.tx-ev.L{transform:translateX(-20px)}.tx-ev.R{transform:translateX(20px)}.tx-ev.in{transform:none}}
@media (max-width:640px){.tx-hero{padding:24px 18px 18px;border-radius:22px}.tx-top{grid-template-columns:1fr}.tx-th{width:48px;height:48px}.tx-glyph{font-size:150px}}
@media (prefers-reduced-motion:reduce){.tx-hero,.tx-glyph,.tx-mapsvg .em{animation:none!important}.tx-ev{opacity:1;transform:none;transition:none}.tx-flow:after{transition:none}}
`;
const st=document.createElement("style");st.id="timelinexcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const mapSVG=`<svg class="tx-mapsvg" viewBox="0 0 300 160" aria-hidden="true"><path class="ld" d="M20 60c30-20 60-10 80 5s50 10 70-5 60-15 90 5v60c-30-15-60-10-90 5s-50 10-70-5-50-20-80 0z"/><circle class="em" cx="90" cy="80" r="16" fill="#fbbf24"/><circle class="em" cx="170" cy="72" r="20" fill="#f472b6"/><circle class="em" cx="235" cy="95" r="14" fill="#34d399"/></svg>`;
let io=null,mo=null,onScroll=null;
R.time=function(m){
  try{if(typeof setCat=="function")setCat(null)}catch(e){}
  const V=document.getElementById("v");const all=m=="all";
  const keyEv=(window.TLKEY||[]).map(s=>{const[y,t,id]=s.split("|");return{y:+y,t,id:id||null}}).sort((a,b)=>a.y-b.y);
  const dated=(typeof TODAY!="undefined"?TODAY:[]).map(e=>({m:e[0],d:e[1],y:e[2],t:e[3],id:e[4]||null})).sort((a,b)=>a.y-b.y||a.m-b.m||a.d-b.d);
  const base=all?dated:keyEv;
  const art=id=>{try{return id&&get(id)}catch(e){return null}};
  const subj=e=>{const a=art(e.id);return a&&CAT[a.c]?a.c:null};
  const now=new Date(),otd=dated.filter(e=>e.m==now.getMonth()+1&&e.d==now.getDate()).sort((a,b)=>b.y-a.y).slice(0,4);
  const span=(dated.length?NOW-Math.min(...dated.map(e=>e.y)):0);
  const S={q:"",era:-1,sub:"",n:0};
  V.innerHTML=`<div class="tx"><section class="tx-hero"><div class="tx-glyph" aria-hidden="true">${all?"1066":"BCE·CE"}</div>
  <h2>Timeline</h2><p>${all?"Every dated event in the encyclopedia, day by day, from the ancient world to today.":"The turning points of world history, from the first writing to the 21st century."}</p>
  <div class="tx-kpi"><span><b>${keyEv.length}</b>key moments</span><span><b>${dated.length.toLocaleString("en-US")}</b>dated events</span><span><b>${(NOW+3200).toLocaleString("en-US")}</b>years covered</span><span><b>${ERAS.length}</b>eras</span></div>
  <div class="tx-tools"><label class="tx-f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="txq" type="search" placeholder="Search events…" aria-label="Search events" autocomplete="off"></label>
  <div class="tx-seg" role="group" aria-label="View"><button data-v="" class="${all?"":"on"}">Key moments</button><button data-v="all" class="${all?"on":""}">Every dated event</button></div><button class="tx-rnd" id="txr">🎲 Random event</button></div></section>
  <div class="tx-top"><div class="tx-otd"><h3>📅 On this day <small>${now.getDate()} ${MN[now.getMonth()]}</small></h3>${otd.length?otd.map(e=>{const k=eraOf(e.y);return `<a href="${art(e.id)?"#/art/"+e.id:"#/time/all"}" style="--c:${ERAS[k][4]}"><b>${fy(e.y)}</b>${E(e.t)}</a>`}).join(""):`<p style="margin:4px 8px;color:var(--mu);font:14px system-ui">No events recorded for today yet. Try a random event!</p>`}</div>
  <div class="hmtools tx-map"><a href="#/histmap/1492">${mapSVG}<b>🗺️ History map</b><span>Watch states and empires rise and fall on a map of the world, from 3400 BCE to today.</span></a></div></div>
  <div class="tx-ov" id="txov"><div class="tx-ovb" id="txovb"></div><div class="tx-ovl"><span>3200 BCE</span><span id="txovc"></span><span>Today</span></div></div>
  <div class="tx-flt" id="txe"></div><div class="tx-flt" id="txs"></div><div class="tx-meta" id="txm"></div>
  <div class="tx-flow" id="txf"></div><div class="tx-more" id="txmore"></div><div class="tx-yearflag" id="txyf"></div></div>`;
  const $$=s=>V.querySelector(s),flow=$$("#txf");let L=[];
  function filters(){const ec=ERAS.map((_,k)=>base.filter(e=>eraOf(e.y)==k).length);
    $$("#txe").innerHTML=`<button class="tx-ch${S.era<0?" on":""}" data-e="-1" style="--c:#6366f1"><i></i>All eras</button>`+ERAS.map((e,k)=>`<button class="tx-ch${S.era==k?" on":""}" data-e="${k}" style="--c:${e[4]}">${e[3]} ${E(e[2])} <em>${ec[k]}</em></button>`).join("");
    const sc={};base.forEach(e=>{const s=subj(e);if(s)sc[s]=(sc[s]||0)+1});const ks=Object.keys(sc).sort((a,b)=>sc[b]-sc[a]);
    $$("#txs").innerHTML=ks.length?`<button class="tx-ch${S.sub?"":" on"}" data-s="" style="--c:#64748b"><i></i>All subjects</button>`+ks.map(k=>`<button class="tx-ch${S.sub==k?" on":""}" data-s="${E(k)}" style="--c:${CAT[k][0]}"><i></i>${E(k)} <em>${sc[k]}</em></button>`).join(""):""}
  function overview(){const ec=ERAS.map((_,k)=>L.filter(e=>eraOf(e.y)==k).length),tot=L.length||1;
    $$("#txovb").innerHTML=ERAS.map((e,k)=>ec[k]?`<button data-k="${k}" style="--c:${e[4]};flex:${Math.max(ec[k],tot*.06)}" title="${E(e[2])}: ${ec[k]} events">${e[3]} ${E(e[2])}</button>`:"").join("")+`<span class="tx-ovm" id="txovm"></span>`}
  function hl(t,q){if(!q)return E(t);const i=t.toLowerCase().indexOf(q);return i<0?E(t):E(t.slice(0,i))+"<mark>"+E(t.slice(i,i+q.length))+"</mark>"+E(t.slice(i+q.length))}
  let lastEra=-2,lastCen=null,side=0;
  function evHTML(e,i){const k=eraOf(e.y),c=ERAS[k][4],a=art(e.id),s=a&&CAT[a.c]?a.c:null,q=S.q;let h="";
    if(k!=lastEra){lastEra=k;lastCen=null;const n=L.filter(x=>eraOf(x.y)==k).length;h+=`<div class="tx-era" data-era="${k}" style="--c:${c}"><span class="ei">${ERAS[k][3]}</span><small>${n} event${n==1?"":"s"}</small><h3>${E(ERAS[k][2])}</h3><p>${E(ERAS[k][5])}</p></div>`}
    if(all){const cen=e.y<0?"bce":Math.floor((e.y-1)/100)+1;if(cen!==lastCen){lastCen=cen;h+=`<span class="tx-cen" style="--c:${c}">${cen=="bce"?"Before the Common Era":cen+(cen%10==1&&cen!=11?"st":cen%10==2&&cen!=12?"nd":cen%10==3&&cen!=13?"rd":"th")+" century"}</span>`}}
    side^=1;const map=e.y>=-3400&&e.y<=2024?`<a class="tx-pin" href="#/histmap/${e.y}" title="See the world in ${fy(e.y)}">📍 Map</a>`:"";
    const date=all&&e.m?`${e.d} ${MN[e.m-1].slice(0,3)} `:"";
    h+=`<div class="tx-ev ${side?"L":"R"}" data-i="${i}" data-y="${e.y}" style="--c:${c}"><div class="tx-c"><div class="tx-th">${a&&typeof ban=="function"?ban(a):ERAS[k][3]}</div><div><span class="tx-yr">${date}${fy(e.y).replace(" CE","")}</span><span class="tx-ago">${ago(e.y)}</span>
      <p class="tx-tx">${a?`<a href="#/art/${e.id}">${hl(e.t,q)}</a>`:hl(e.t,q)}</p><div class="tx-ft">${s?`<a class="tx-tag" href="#/cat/${encodeURIComponent(s)}" style="--sc:${CAT[s][0]}"><i></i>${E(s)}</a>`:""}${a?`<a class="tx-tag" href="#/art/${e.id}" style="--sc:${c}">📖 ${E(a.t)}</a>`:""}${map}</div></div></div></div>`;return h}
  function more(n){if(S.n>=L.length)return;const chunk=L.slice(S.n,S.n+n);const st0=S.n;S.n+=chunk.length;
    flow.insertAdjacentHTML("beforeend",chunk.map((e,j)=>evHTML(e,st0+j)).join(""));
    const arts=chunk.map(e=>art(e.id)).filter(Boolean);if(arts.length&&typeof want=="function")try{want(arts)}catch(x){}
    flow.querySelectorAll(".tx-ev:not(.obs)").forEach(el=>{el.classList.add("obs");if(io)io.observe(el);else el.classList.add("in")})}
  function compute(){const q=S.q;L=base.filter(e=>(S.era<0||eraOf(e.y)==S.era)&&(!S.sub||subj(e)==S.sub)&&(!q||e.t.toLowerCase().includes(q)));
    S.n=0;lastEra=-2;lastCen=null;side=0;flow.innerHTML=L.length?"":`<div class="tx-empty">🔍 No events match.</div>`;
    $$("#txm").innerHTML=`<b>${L.length.toLocaleString("en-US")}</b> ${all?"dated events":"key moments"}${L.length?` · ${fy(L[0].y)} to ${fy(L[L.length-1].y)}`:""}`;
    filters();overview();more(all?80:999);scroll()}
  function jumpTo(i){const el=()=>flow.querySelector(`.tx-ev[data-i="${i}"]`);if(!el()){while(!el()&&S.n<L.length)more(200)}const x=el();if(!x)return;x.classList.add("in");x.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});x.classList.remove("flash");void x.offsetWidth;x.classList.add("flash")}
  if(io)io.disconnect();io="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"}):null;
  if(mo)mo.disconnect();if("IntersectionObserver" in window){mo=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))more(80)},{rootMargin:"1200px"});mo.observe($$("#txmore"))}
  const yf=$$("#txyf");
  function scroll(){if(!document.body.contains(flow)){removeEventListener("scroll",onScroll);return}const r=flow.getBoundingClientRect(),vh=innerHeight;
    const p=Math.max(0,Math.min(1,(vh*.55-r.top)/Math.max(1,r.height)));flow.style.setProperty("--tlp",p.toFixed(4));
    let cur=null;const evs=flow.querySelectorAll(".tx-ev");for(const e of evs){const b=e.getBoundingClientRect();if(b.bottom>vh*.35){cur=e;break}}
    const on=r.top<vh*.3&&r.bottom>vh*.5&&cur;yf.classList.toggle("on",!!on);
    if(cur){const y=+cur.dataset.y,k=eraOf(y);yf.textContent="≈ "+fy(y);yf.style.setProperty("--c",ERAS[k][4]);flow.style.setProperty("--lc",ERAS[k][4]);const i=+cur.dataset.i,tot=L.length||1;
      const bars=[...$$("#txovb").querySelectorAll("button")];let x=0,acc=0;const W=$$("#txovb").clientWidth;const before=L.slice(0,i);
      for(const b of bars){const kk=+b.dataset.k,cnt=L.filter(e=>eraOf(e.y)==kk).length,w=b.offsetWidth;if(kk<k){acc+=w}else if(kk==k){const inEra=before.filter(e=>eraOf(e.y)==k).length;acc+=w*(inEra/Math.max(1,cnt));break}}
      const mk=$$("#txovm");if(mk)mk.style.left=Math.min(W,acc)+"px";$$("#txovc").textContent=fy(y)}}
  let tick=false;onScroll=()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;scroll()})};addEventListener("scroll",onScroll,{passive:true});
  let ft=0;$$("#txq").oninput=e=>{clearTimeout(ft);ft=setTimeout(()=>{S.q=e.target.value.trim().toLowerCase();compute()},140)};
  V.querySelectorAll(".tx-seg button").forEach(b=>b.onclick=()=>go("time",b.dataset.v));
  $$("#txe").addEventListener("click",e=>{const b=e.target.closest("[data-e]");if(!b)return;S.era=+b.dataset.e;compute()});
  $$("#txs").addEventListener("click",e=>{const b=e.target.closest("[data-s]");if(!b)return;S.sub=b.dataset.s;compute()});
  $$("#txovb").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const k=+b.dataset.k;const i=L.findIndex(x=>eraOf(x.y)==k);if(i<0)return;jumpTo(i);const h=flow.querySelector(`.tx-era[data-era="${k}"]`);h&&setTimeout(()=>h.scrollIntoView({behavior:"smooth",block:"start"}),50)});
  $$("#txr").onclick=()=>{if(!L.length)return;jumpTo(Math.floor(Math.random()*L.length))};
  compute();
};
})();
