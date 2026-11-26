/* History Map (#/histmap/YEAR): the world's states and empires at any year from 3400 BC to today.
   Borders: Cliopatria, Seshat Global History Databank (CC BY 4.0), simplified by tools/build_histmap.py.
   Data loads only when the page opens: data/hm/map.js, then one chunk per period. */
(()=>{
const V=document.getElementById("v"),still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const es=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fy=y=>y<0?`${-y} BC`:y<1000?`AD ${y}`:`${y}`;
const num=n=>Math.round(n).toLocaleString("en-US");
const PAL=["#e07a5f","#3d8eb9","#81b29a","#f2cc8f","#9b72cf","#e5989b","#52b788","#f4a261","#6d97c9","#c9a227","#d1495b","#2a9d8f","#b5838d","#8ab17d","#e9c46a","#7b9acc"];
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const colOf=n=>PAL[hash(n)%PAL.length];
// Our own markers for Philippine states too small for the dataset (it lists states over about 5,000 km²).
const EXTRA=[["Rajahnate of Butuan",1001,1521,125.54,8.95,"A trading state on the Agusan River in Mindanao. It sent its first tribute mission to Song China in 1001.","butuan"]];
const css=`
.hmw{max-width:1280px;margin:0 auto}.hmw h2{font:900 clamp(28px,4.4vw,44px)/1.05 var(--disp);margin:6px 0 4px;color:var(--hd)}.hmw>p.in{color:var(--mu);font:500 15.5px/1.5 system-ui,sans-serif;max-width:72ch;margin:0 0 14px}
.hmbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;margin:0 0 10px}
.hmyr{font:900 clamp(34px,5vw,54px)/1 var(--disp);color:var(--hd);min-width:4.6ch;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.hmyr small{display:block;font:700 12.5px system-ui,sans-serif;color:var(--mu);letter-spacing:0;margin-top:4px}
.hmbtn{display:inline-grid;place-items:center;min-width:42px;height:42px;padding:0 12px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:800 14px system-ui,sans-serif;cursor:pointer;transition:transform .15s,background .2s}
.hmbtn:hover{transform:translateY(-1px)}.hmbtn.pri{background:var(--hd);color:var(--bg,#fff);border-color:var(--hd)}
.hmgo{display:flex;gap:6px;align-items:center}.hmgo input{width:150px;height:42px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);padding:0 14px;font:700 14px system-ui,sans-serif}
.hmsr{position:relative;flex:1;min-width:200px;max-width:340px}.hmsr input{width:100%;height:42px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);padding:0 16px;font:600 14px system-ui,sans-serif;box-sizing:border-box}
.hmsl{position:absolute;z-index:30;left:0;right:0;top:46px;background:var(--sf);border:1px solid var(--bd);border-radius:16px;box-shadow:0 20px 40px -18px rgba(0,0,0,.45);overflow:hidden;max-height:320px;overflow-y:auto}
.hmsl button{display:flex;justify-content:space-between;gap:10px;width:100%;padding:9px 14px;border:0;background:none;color:var(--tx);font:700 14px system-ui,sans-serif;text-align:left;cursor:pointer}.hmsl button span{color:var(--mu);font-weight:600;white-space:nowrap;font-size:12.5px}
.hmsl button:hover,.hmsl button.on{background:var(--sf2)}
.hmtl{position:relative;margin:4px 0 12px;padding:0 4px}.hmtl input[type=range]{width:100%;accent-color:var(--hd);height:28px;margin:0;cursor:pointer}
.hmtk{position:relative;height:16px;font:700 11px system-ui,sans-serif;color:var(--mu)}.hmtk span{position:absolute;transform:translateX(-50%);white-space:nowrap}@media(max-width:700px){.hmtk span.mn{display:none}.hmtk span:first-child{transform:none}.hmtk span:last-child{transform:translateX(-100%)}}
.hmchips{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}@media(max-width:700px){.hmchips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}.hmchips button{flex:none}.hmyr{min-width:0}}.hmchips button{padding:6px 12px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:700 12.5px system-ui,sans-serif;cursor:pointer}.hmchips button.on{background:var(--sf2);border-color:var(--hd)}
.hmgrid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start}@media(max-width:900px){.hmgrid{grid-template-columns:1fr}}
.hmmap{position:relative;border-radius:22px;overflow:hidden;border:1px solid var(--bd);background:color-mix(in srgb,#38bdf8 12%,var(--sf));touch-action:none;user-select:none;-webkit-user-select:none}
.hmmap svg{display:block;width:100%;height:auto;cursor:grab}.hmmap svg.drag{cursor:grabbing}
.hm-sea{fill:color-mix(in srgb,#38bdf8 16%,var(--sf))}.hm-grat{fill:none;stroke:color-mix(in srgb,var(--tx) 10%,transparent);stroke-width:.4}
.hm-land{fill:color-mix(in srgb,var(--tx) 9%,var(--sf))}
.hm-p path{stroke:color-mix(in srgb,var(--tx) 55%,var(--sf));stroke-width:.6;vector-effect:non-scaling-stroke;fill-opacity:.82;cursor:pointer;transition:fill-opacity .2s}
.hm-p path:hover{fill-opacity:1}.hm-p path.sel{stroke:var(--tx);stroke-width:2.4;fill-opacity:1}
.hm-r path{fill:none;stroke:var(--tx);stroke-width:1.6;stroke-dasharray:5 4;vector-effect:non-scaling-stroke;opacity:.7;pointer-events:none}
.hm-l text{font-family:system-ui,sans-serif;font-weight:800;fill:#1b1b1b;paint-order:stroke;stroke:rgba(255,255,255,.72);stroke-linejoin:round;pointer-events:none;text-anchor:middle;dominant-baseline:middle}
.hm-l text.rl{font-style:italic;font-weight:900;fill:color-mix(in srgb,var(--tx) 85%,#000);stroke:color-mix(in srgb,var(--sf) 75%,transparent);letter-spacing:.06em}
.hm-x circle{fill:#d1495b;stroke:#fff;stroke-width:1.5;vector-effect:non-scaling-stroke;cursor:pointer}
.hmzoom{position:absolute;right:10px;top:10px;display:grid;gap:6px}.hmzoom button{width:38px;height:38px;border-radius:12px;border:1px solid var(--bd);background:color-mix(in srgb,var(--sf) 92%,transparent);color:var(--tx);font:900 18px system-ui;cursor:pointer;box-shadow:0 6px 14px -8px rgba(0,0,0,.4)}
.hmload{position:absolute;inset:0;display:grid;place-items:center;font:800 15px system-ui,sans-serif;color:var(--mu);background:color-mix(in srgb,var(--sf) 60%,transparent);transition:opacity .3s}.hmload[hidden]{display:none}
.hmside{display:grid;gap:12px}.hmcard{background:var(--sf);border:1px solid var(--bd);border-radius:20px;padding:14px 16px}
.hmcard h3{margin:0 0 6px;font:900 21px/1.15 var(--disp);color:var(--hd);display:flex;gap:10px;align-items:flex-start}.hmcard h3 i{flex:none;width:16px;height:16px;border-radius:5px;margin-top:4px}
.hmcard p{margin:4px 0;font:500 14px/1.45 system-ui,sans-serif;color:var(--tx)}.hmcard p b{color:var(--mu);font-weight:700}.hmcard .acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.hmcard .acts a,.hmcard .acts button{padding:7px 13px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:800 13px system-ui,sans-serif;cursor:pointer;text-decoration:none}.hmcard .acts .pri{background:var(--hd);color:var(--bg,#fff);border-color:var(--hd)}
.hmbig{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:4px}.hmbig li button{display:grid;grid-template-columns:12px 1fr auto;gap:8px;align-items:center;width:100%;padding:5px 6px;border:0;border-radius:10px;background:none;color:var(--tx);font:700 13.5px system-ui,sans-serif;text-align:left;cursor:pointer}
.hmbig li button:hover{background:var(--sf2)}.hmbig i{width:12px;height:12px;border-radius:4px}.hmbig span{color:var(--mu);font-weight:600;font-size:12px}
.hmlt{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 10px;font:800 13px system-ui,sans-serif;color:var(--mu)}
.hmlt button{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:800 12.5px system-ui,sans-serif;cursor:pointer}.hmlt button[aria-pressed=false]{opacity:.45}.hmlt svg{width:16px;height:16px}
.hm-rt .ln{fill:none;stroke-width:2.2;stroke-dasharray:7 5;vector-effect:non-scaling-stroke;stroke-linecap:round;opacity:.9;pointer-events:none}
.hm-rt .hit,.hm-vy .hit{fill:none;stroke:transparent;stroke-width:14;vector-effect:non-scaling-stroke;pointer-events:stroke;cursor:pointer}
.hm-rt.sel .ln,.hm-vy.sel .ln{stroke-width:4;opacity:1}
.hm-vy .ln{fill:none;stroke-width:2.6;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round;pointer-events:none;filter:drop-shadow(0 0 2px rgba(0,0,0,.35))}
.hm-vy .ends{pointer-events:none}.hm-ship{pointer-events:none}
.hm-bt{cursor:pointer}.hm-bt circle{fill:#1f2937;stroke:#fff;stroke-width:1.4;vector-effect:non-scaling-stroke}.hm-bt path{fill:none;stroke:#fbbf24;stroke-width:1.6;stroke-linecap:round;vector-effect:non-scaling-stroke}.hm-bt.sel circle{fill:#b91c1c}
.hm-ll{font:800 9px system-ui,sans-serif;paint-order:stroke;stroke:color-mix(in srgb,var(--sf) 80%,transparent);stroke-width:3px;pointer-events:none}
.hmart{display:flex;align-items:center;gap:14px;margin:16px 0 20px;padding:12px 16px;border-radius:18px;text-decoration:none!important;color:#fff!important;background:linear-gradient(120deg,#8a5a1a,#3d5a80);box-shadow:0 18px 36px -26px #3d5a80;transition:transform .3s cubic-bezier(.22,1,.36,1)}
.hmart:hover{transform:translateY(-2px)}.hmart svg{flex:none;width:42px;height:42px}.hmart b{display:block;font:900 17px var(--disp)}.hmart span{display:block;font:600 13.5px/1.35 system-ui,sans-serif;opacity:.92}
.ev .hmtlk{display:inline-grid;place-items:center;width:24px;height:24px;margin-left:8px;border-radius:8px;border:1px solid var(--bd);vertical-align:middle;color:var(--mu)}.ev .hmtlk svg{width:14px;height:14px}.ev .hmtlk:hover{color:var(--tx);background:var(--sf2)}
.hmnote{font:500 12.5px/1.45 system-ui,sans-serif;color:var(--mu);margin:12px 2px 0}
.hmtools{display:grid;grid-template-columns:1fr;margin:18px 0 26px}.hmtools a{position:relative;display:block;padding:18px 20px;border-radius:22px;color:#fff!important;text-decoration:none!important;background:linear-gradient(120deg,#8a5a1a,#3d5a80);overflow:hidden;isolation:isolate;box-shadow:0 22px 40px -28px #3d5a80;transition:transform .35s cubic-bezier(.22,1,.36,1)}
.hmtools a:hover{transform:translateY(-3px)}.hmtools b{display:block;font:900 23px var(--disp)}.hmtools span{display:block;font:600 14.5px/1.4 system-ui,sans-serif;opacity:.92;max-width:52ch}
.hmtools svg{position:absolute;right:-10px;top:-10px;width:300px;opacity:.28;z-index:-1}
`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);

/* ---------- data loading ---------- */
const H=window.HMAP={chunks:{},add(c){this.chunks[c.lo]=c}};
const load=src=>new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
let idxP=null;const idx=()=>idxP||(idxP=window.HMAPIDX?Promise.resolve():load("data/hm/map.js"));
const fileFor=y=>HMAPIDX.files.find(f=>y>=f[1]&&y<=f[2])||HMAPIDX.files[HMAPIDX.files.length-1];
const chunkFor=y=>{const f=fileFor(y);if(H.chunks[f[1]])return Promise.resolve(H.chunks[f[1]]);return load(`data/hm/${f[0]}.js`).then(()=>H.chunks[f[1]])};
// Cliopatria's Wikipedia titles (lower case) for which this encyclopedia has an article under another name.
const ALIAS={"roman empire":"rome","roman republic":"rome","roman kingdom":"rome","western roman empire":"rome","byzantine empire":"byzant","mongol empire":"mongol","golden horde":"mongol","ilkhanate":"mongol","chagatai khanate":"mongol","northern yuan":"mongol",
"han dynasty":"china","tang dynasty":"china","song dynasty":"china","ming dynasty":"china","qing dynasty":"china","yuan dynasty":"china","sui dynasty":"china","shang dynasty":"china","zhou dynasty":"china","qin dynasty":"china","jin dynasty (266-420)":"china",
"ottoman empire":"ottoman","mughal empire":"mughal","achaemenid empire":"persia","sasanian empire":"persia","parthian empire":"persia","khmer empire":"khmer","mali empire":"mali","songhai empire":"songhai","inca empire":"inca","aztec empire":"aztec","aztec triple alliance":"aztec","maya civilization":"maya",
"kingdom of kush":"kush","kingdom of aksum":"aksum","ancient carthage":"carthage","carthage":"carthage","phoenicia":"phoenicians","babylonia":"babylon","first babylonian empire":"babylon","neo-babylonian empire":"babylon","sumer":"mesop","akkadian empire":"mesop","assyria":"mesop","neo-assyrian empire":"mesop",
"ancient egypt":"egypt","old kingdom of egypt":"egypt","middle kingdom of egypt":"egypt","new kingdom of egypt":"egypt","ptolemaic kingdom":"egypt","macedonia (ancient kingdom)":"greece","srivijaya":"seaempires","majapahit":"seaempires","sultanate of sulu":"sulu","tondo (historical polity)":"precol","rajahnate of cebu":"precol","sultanate of maguindanao":"precol",
"ashanti empire":"asante","zulu kingdom":"zulu","kingdom of benin":"benin","kingdom of zimbabwe":"zimbabwe","umayyad caliphate":"caliphate","abbasid caliphate":"caliphate","rashidun caliphate":"caliphate","fatimid caliphate":"caliphate","minoan civilization":"minoans","olmecs":"olmecs","empire of japan":"japan","joseon":"korea","goryeo":"korea","silla":"korea",
"maurya empire":"indus","gupta empire":"indus","delhi sultanate":"indus","carolingian empire":"medieurope","francia":"medieurope","congo free state":"leopold2","first philippine republic":"malolos","commonwealth of the philippines":"commonwealth"};
let tmap=null;const artFor=w=>{if(!w)return null;const k=w.toLowerCase();if(ALIAS[k]&&get(ALIAS[k]))return ALIAS[k];if(!tmap){tmap={};A.forEach(a=>{const t=a.t.toLowerCase();tmap[t]=a.id;tmap[t.replace(/^the /,"")]=a.id})}return tmap[k]||null};

/* ---------- page ---------- */
let S=null; // page state
const IC={b:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l12 12M20 4L8 16M14 18l4-4M6 14l4 4M3 21l3-3M21 21l-3-3"/></svg>',r:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"><path d="M3 18c4-8 8 2 12-6s4-6 6-6"/></svg>',v:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h18l-3 4H6zM12 3v12M12 4l6 9h-6"/></svg>'};
const JUMPS=[[-2500,"Pyramid age"],[-500,"500 BC"],[117,"Rome at its height"],[750,"AD 750"],[1279,"Mongol Empire"],[1492,"1492"],[1650,"1650"],[1815,"1815"],[1914,"1914"],[1945,"1945"],[2024,"Today"]];
R.histmap=function(x){window.setCat&&setCat("History");const parts=String(x||"").split("/"),want=parts[1]?decodeURIComponent(parts[1]):null;let y=parseInt(parts[0],10);if(!isFinite(y))y=1492;y=Math.max(-3400,Math.min(2024,y));
V.innerHTML=`<div class="hmw"><a class="lk" href="#/cat/History">‹ History</a><h2>History map</h2><p class="in">The world’s states and empires at any moment from 3400 BC to today. Drag the slider or press play to watch borders change, and tap a state to learn about it. Borders before modern times are estimates.</p>
<div class="hmbar"><div class="hmyr" id="hmy" aria-live="polite">${es(fy(y))}<small>&nbsp;</small></div>
<div style="display:flex;gap:6px"><button class="hmbtn" id="hmprev" aria-label="Earlier">‹</button><button class="hmbtn pri" id="hmplay" aria-label="Play">▶ Play</button><button class="hmbtn" id="hmnext" aria-label="Later">›</button></div>
<form class="hmgo" id="hmgo"><input id="hmyi" inputmode="numeric" placeholder="Year, e.g. 1066" aria-label="Go to a year (use a minus sign or BC for years before Christ)"><button class="hmbtn">Go</button></form>
<div class="hmsr"><input id="hmq" placeholder="Find a state or empire" aria-label="Find a state or empire" autocomplete="off"><div class="hmsl" id="hmsl" hidden></div></div></div>
<div class="hmtl"><input type="range" id="hmr" min="0" max="1" value="0" aria-label="Year"><div class="hmtk" id="hmtk"></div></div>
<div class="hmchips" id="hmch">${JUMPS.map(j=>`<button data-y="${j[0]}">${es(j[1])}</button>`).join("")}</div>
<div class="hmlt" id="hmlt">Show:<button aria-pressed="true" data-l="battles">${IC.b}Battles</button><button aria-pressed="true" data-l="routes">${IC.r}Trade routes</button><button aria-pressed="true" data-l="voyages">${IC.v}Voyages</button></div>
<div class="hmgrid"><div class="hmmap" id="hmm"><svg id="hms" viewBox="0 0 1000 520" role="img" aria-label="Map of the world’s states"><g id="hmbase"></g><g id="hmp" class="hm-p"></g><g id="hmrel" class="hm-r"></g><g id="hmlay"></g><g id="hmx" class="hm-x"></g><g id="hml" class="hm-l"></g></svg>
<div class="hmzoom"><button id="hmzi" aria-label="Zoom in">+</button><button id="hmzo" aria-label="Zoom out">−</button><button id="hmz0" aria-label="Show the whole world" style="font-size:14px">⤢</button></div><div class="hmload" id="hmld">Loading the map…</div></div>
<div class="hmside"><div class="hmcard" id="hmi"><h3>Tap a state</h3><p>Tap any colored area to see what it was, how big it was and how long it lasted. Dashed lines show empires and unions made of several states.</p></div><div class="hmcard"><h3 style="font-size:17px">Largest states in <span id="hmby"></span></h3><ol class="hmbig" id="hmbig"></ol></div></div></div>
<p class="hmnote">Borders: <a href="https://github.com/Seshat-Global-History-Databank/cliopatria">Cliopatria</a>, Seshat Global History Databank, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, simplified for this map. Coastlines: Natural Earth. Most borders before the age of treaties are approximate, areas could overlap, and the dataset leaves out states smaller than about 5,000 km² or that lasted under 50 years, so some regions look empty.</p></div>`;
S={y,want,vb:[0,0,1000,520],sel:null,play:0,rows:[],tok:0,lay:{battles:1,routes:1,voyages:1},items:[],lsel:null};
idx().then(()=>{if(!S)return;setup();show(y,want)}).catch(()=>{$("#hmld").textContent="The map data could not be loaded. Check your connection and try again."})};

// The slider gives more room to recent centuries, where borders change more often.
const KN=[[0,-3400],[200,-1000],[380,1],[560,1000],[720,1500],[860,1800],[1000,2024]];
const p2y=p=>{for(let i=1;i<KN.length;i++)if(p<=KN[i][0]){const[a,b]=[KN[i-1],KN[i]];return Math.round(a[1]+(p-a[0])/(b[0]-a[0])*(b[1]-a[1]))}return 2024};
const y2p=y=>{for(let i=1;i<KN.length;i++)if(y<=KN[i][1]){const[a,b]=[KN[i-1],KN[i]];return a[0]+(y-a[1])/(b[1]-a[1])*(b[0]-a[0])}return 1000};
function setup(){const r=$("#hmr");r.max=1000;
const tk=[-3000,-2000,-1000,1,500,1000,1500,1800,1900,2000];$("#hmtk").innerHTML=tk.map(t=>`<span class="${[-3000,1,1500,2000].includes(t)?"":"mn"}" style="left:${(y2p(t)/10).toFixed(2)}%">${t==1?"AD 1":t<0?-t+" BC":t}</span>`).join("");
let rt=0;r.oninput=()=>{stop();const y=p2y(+r.value);$("#hmy").innerHTML=`${es(fy(y))}<small>&nbsp;</small>`;clearTimeout(rt);rt=setTimeout(()=>show(y),60)};
$("#hmprev").onclick=()=>{stop();step(-1)};$("#hmnext").onclick=()=>{stop();step(1)};
$("#hmplay").onclick=()=>S.play?stop():start();
$("#hmgo").onsubmit=e=>{e.preventDefault();const v=$("#hmyi").value.trim();let m=v.match(/^(-?)\s*(\d{1,4})\s*(bc|bce|b\.c\.)?\s*(ad|ce)?$/i);if(!m)return;let y=+m[2];if(m[1]||m[3])y=-y;stop();show(Math.max(-3400,Math.min(2024,y)))};
$("#hmch").onclick=e=>{const b=e.target.closest("button");if(b){stop();show(+b.dataset.y)}};
// base map
const W=window.WMAP;$("#hmbase").innerHTML=W?`<path class="hm-sea" d="${W.sphere}"/><path class="hm-grat" d="${W.grat||""}"/><path class="hm-land" d="${W.land}"/><clipPath id="hmclip"><path d="${W.land}"/></clipPath>`:`<rect class="hm-sea" width="1000" height="520"/>`;
if(W){$("#hmp").setAttribute("clip-path","url(#hmclip)");$("#hmrel").setAttribute("clip-path","url(#hmclip)")}
// search
const q=$("#hmq"),sl=$("#hmsl");let hits=[],hi=0;const N=HMAPIDX.names;
const render=()=>{sl.innerHTML=hits.map((n,i)=>`<button data-i="${i}" class="${i==hi?"on":""}">${es(n[0].replace(/^\((.*)\)$/,"$1"))}<span>${es(fy(n[3]))} – ${n[4]>=2024?"today":es(fy(n[4]))}</span></button>`).join("");sl.hidden=!hits.length};
q.oninput=()=>{const t=q.value.trim().toLowerCase();hi=0;if(t.length<2){hits=[];render();return}const st=[],inn=[],wk=[];N.forEach(n=>{const s=n[0].toLowerCase().replace(/^\(/,"");if(s.startsWith(t))st.push(n);else if(new RegExp("\\b"+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).test(s))inn.push(n);else if(n[1].toLowerCase().includes(t))wk.push(n)});const by=(a,b)=>(a[0][0]=="(")-(b[0][0]=="(")||b[6]-a[6];hits=[...st.sort(by),...inn.sort(by),...wk.sort(by)].slice(0,10);render()};
const pick=n=>{q.value="";hits=[];render();stop();show(n[5],n[0])};
sl.onclick=e=>{const b=e.target.closest("button");b&&pick(hits[+b.dataset.i])};
q.onkeydown=e=>{if(!hits.length)return;if(e.key=="ArrowDown"){hi=(hi+1)%hits.length;render();e.preventDefault()}else if(e.key=="ArrowUp"){hi=(hi-1+hits.length)%hits.length;render();e.preventDefault()}else if(e.key=="Enter"){e.preventDefault();pick(hits[hi])}else if(e.key=="Escape"){hits=[];render()}};
q.onblur=()=>setTimeout(()=>{hits=[];render()},200);
$("#hmlt").onclick=e=>{const b=e.target.closest("button");if(!b)return;const k=b.dataset.l,on=b.getAttribute("aria-pressed")=="true";b.setAttribute("aria-pressed",!on);S.lay[k]=on?0:1;drawLayers(S.y)};
panzoom()}

const yIdx=y=>{const Y=HMAPIDX.years;let i=0;for(let k=0;k<Y.length;k++){if(Y[k]<=y)i=k;else break}return i};
function step(d){const Y=HMAPIDX.years;let i=yIdx(S.y);if(d>0&&Y[i]<=S.y)i++;else if(d<0&&Y[i]==S.y)i--;i=Math.max(0,Math.min(Y.length-1,i));show(Y[i])}
function start(){if(S.y>=2024)S.y=-3400;S.play=setInterval(()=>{if(!S||!document.getElementById("hms")){clearInterval(S&&S.play);return}const Y=HMAPIDX.years,i=yIdx(S.y);if(i>=Y.length-1){stop();return}show(Y[i+1],null,true)},still?1400:650);const b=$("#hmplay");b.textContent="❚❚ Pause";b.setAttribute("aria-label","Pause")}
function stop(){if(S&&S.play){clearInterval(S.play);S.play=0}const b=document.getElementById("hmplay");if(b){b.textContent="▶ Play";b.setAttribute("aria-label","Play")}}

/* ---------- drawing ---------- */
function show(y,want,playing){S.y=y;const tok=++S.tok;$("#hmy").innerHTML=`${es(fy(y))}<small>${y<0?"Before Christ":y<2024?"":"The present"}&nbsp;</small>`;$("#hmr").value=Math.round(y2p(y));$("#hmby").textContent=fy(y);
document.querySelectorAll("#hmch button").forEach(b=>b.classList.toggle("on",+b.dataset.y==y));
history.replaceState(null,"","#/histmap/"+y+(want?"/"+encodeURIComponent(want):""));
const ld=$("#hmld"),f=fileFor(y);if(!H.chunks[f[1]]){ld.hidden=false;ld.textContent="Loading "+fy(y)+"…"}
chunkFor(y).then(c=>{if(tok!=S.tok||!document.getElementById("hms"))return;ld.hidden=true;draw(c,y,playing);if(want&&want[0]=="@"){const it=S.items.find(i=>i.n==want.slice(1));if(it){selectLayer(it.k,1)}}else if(want){const r=S.rows.find(r=>HMAPIDX.names[r[0]][0]==want);if(r){select(r);if(!playing)fit(r)}}else if(S.sel){const r=S.rows.find(r=>r[0]==S.sel[0]);r?select(r,true):clearSel()}
const nx=HMAPIDX.years[yIdx(y)+1];if(nx!=null&&!H.chunks[fileFor(nx)[1]])chunkFor(nx)}).catch(()=>{ld.hidden=false;ld.textContent="This part of the map could not be loaded."})}
function draw(c,y,playing){const N=HMAPIDX.names;S.rows=c.r.filter(r=>r[1]<=y&&r[2]>=y);S.chunk=c;
const isR=r=>N[r[0]][2]||N[r[0]][0][0]=="(",pol=S.rows.filter(r=>!isR(r)).sort((a,b)=>b[3]-a[3]),rel=S.rows.filter(isR);
const P=$("#hmp");P.innerHTML=`<g transform="scale(.1)">${pol.map(r=>`<path data-n="${r[0]}" fill="${colOf(N[r[0]][0])}" d="${c.g[r[11]]}"><title>${es(N[r[0]][0])}</title></path>`).join("")}</g>`;
$("#hmrel").innerHTML=`<g transform="scale(.1)">${rel.map(r=>`<path d="${c.g[r[11]]}"/>`).join("")}</g>`;
$("#hmx").innerHTML=EXTRA.filter(e=>e[1]<=y&&e[2]>=y).map((e,i)=>{const p=prj(e[3],e[4]);return`<circle data-x="${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5"><title>${es(e[0])}</title></circle>`}).join("");
if(!still&&!playing)P.animate([{opacity:.35},{opacity:1}],{duration:280,easing:"ease-out"});
drawLayers(y);labels();
const big=pol.slice(0,8);$("#hmbig").innerHTML=big.map(r=>`<li><button data-n="${r[0]}"><i style="background:${colOf(N[r[0]][0])}"></i>${es(N[r[0]][0])}<span>${r[3]>=1e6?(r[3]/1e6).toFixed(1)+" million":num(r[3]/1e3)+" thousand"} km²</span></button></li>`).join("")||`<li style="color:var(--mu);font:600 13px system-ui">No states recorded for this year.</li>`;
$("#hmbig").onclick=e=>{const b=e.target.closest("button");if(!b)return;const r=S.rows.find(r=>r[0]==+b.dataset.n);r&&(select(r),fit(r))}}
const K=182.78964407016807,prj=(lo,la)=>{const p=la*Math.PI/180,l=lo*Math.PI/180,p2=p*p,p4=p2*p2;return[500+K*l*(.8707-.131979*p2+p4*(-.013791+p4*p2*(.003971-.001529*p2))),260-K*p*(1.007226+p2*(.015085+p4*(-.044475+.028874*p2-.005916*p4)))]};
function labels(){const N=HMAPIDX.names,z=1000/S.vb[2],[vx,vy,vw,vh]=S.vb,boxes=[];let out="";
const list=S.rows.slice().sort((a,b)=>b[3]-a[3]);
for(const r of list){const n=N[r[0]],rl=n[2]||n[0][0]=="(",name=n[0].replace(/^\((.*)\)$/,"$1"),w=(r[9]-r[7]),h=(r[10]-r[8]);if(w*z<(rl?90:46)||(rl&&/^(Alliance|Personal union)|subject to/.test(name)))continue;
const lx=r[5],ly=r[6];if(lx<vx-20||lx>vx+vw+20||ly<vy-20||ly>vy+vh+20)continue;
let fs=Math.max(9,Math.min(rl?20:17,Math.sqrt(r[3])/120))/z;fs=Math.min(fs,w*.9/Math.max(4,name.length*.55));if(fs*z<8.5)continue;
const tw=name.length*fs*.56,bx=[lx-tw/2,ly-fs*.6,lx+tw/2,ly+fs*.6];if(boxes.some(b=>!(bx[2]<b[0]||bx[0]>b[2]||bx[3]<b[1]||bx[1]>b[3])))continue;boxes.push(bx);
out+=`<text x="${lx}" y="${rl?ly-fs*1.4:ly}" class="${rl?"rl":""}" style="font-size:${fs.toFixed(2)}px;stroke-width:${(fs*.22).toFixed(2)}px">${es(name)}</text>`;if(boxes.length>60)break}
$("#hml").innerHTML=out;const bs=(1/Math.sqrt(z)).toFixed(3);document.querySelectorAll("#hmlay .hm-bt").forEach(g=>g.setAttribute("transform",`translate(${g.dataset.x} ${g.dataset.y}) scale(${bs})`));document.querySelectorAll("#hmlay .hm-ll").forEach(t=>{t.style.fontSize=(10.5/z).toFixed(2)+"px";t.style.strokeWidth=(3/z).toFixed(2)+"px"})}

/* ---------- layers: battles, trade routes, voyages ---------- */
const tolOf=y=>y<-1000?150:y<0?60:y<1500?30:y<1900?12:4;
// A smooth line through waypoints, split where it crosses the date line.
function lineD(pts){const segs=[[]];for(let i=0;i<pts.length;i++){const p=pts[i];if(i){const q=pts[i-1];if(Math.abs(p[0]-q[0])>180){const lo1=q[0],lo2=p[0]+(p[0]<0?360:-360),t=((q[0]>0?180:-180)-lo1)/(lo2-lo1),la=q[1]+(p[1]-q[1])*t;segs[segs.length-1].push([q[0]>0?179.9:-179.9,la]);segs.push([[q[0]>0?-179.9:179.9,la]])}}segs[segs.length-1].push(p)}
return segs.map(sg=>{const P=sg.map(c=>prj(c[0],c[1]));if(P.length<3)return"M"+P.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L");let d="M"+P[0][0].toFixed(1)+" "+P[0][1].toFixed(1);for(let i=1;i<P.length-1;i++){const m=[(P[i][0]+P[i+1][0])/2,(P[i][1]+P[i+1][1])/2];d+="Q"+P[i][0].toFixed(1)+" "+P[i][1].toFixed(1)+" "+m[0].toFixed(1)+" "+m[1].toFixed(1)}const L=P[P.length-1];return d+"L"+L[0].toFixed(1)+" "+L[1].toFixed(1)}).join("")}
function drawLayers(y){const L=window.HLAYERS;if(!L){$("#hmlay").innerHTML="";return}const it=[];let h="";const tol=tolOf(y);
if(S.lay.routes)L.routes.forEach((r,i)=>{if(r[1]<=y&&r[2]>=y){const k="r"+i,d=lineD(r[4]);it.push({k,kind:"route",n:r[0],a:r[1],b:r[2],c:r[3],art:r[5],t:r[6]});const m=prj(...r[4][Math.floor(r[4].length/2)]);h+=`<g class="hm-rt" data-k="${k}"><path class="hit" d="${d}"/><path class="ln" stroke="${r[3]}" d="${d}"/><text class="hm-ll" x="${m[0].toFixed(1)}" y="${(m[1]-4).toFixed(1)}" fill="${r[3]}" text-anchor="middle">${es(r[0].replace(/ \(.*\)$/,""))}</text></g>`}});
if(S.lay.voyages)L.voyages.forEach((v,i)=>{if(v[1]<=y&&v[2]+tol>=y){const k="v"+i,d=lineD(v[4]),a=prj(...v[4][0]),b=prj(...v[4][v[4].length-1]);it.push({k,kind:"voyage",n:v[0],a:v[1],b:v[2],c:v[3],art:v[5],t:v[6]});h+=`<g class="hm-vy" data-k="${k}"><path class="hit" d="${d}"/><path class="ln" stroke="${v[3]}" d="${d}"/><g class="ends" fill="${v[3]}"><circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="2.6" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"/><circle cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="1.8"/></g></g>`}});
if(S.lay.battles)L.battles.forEach((b,i)=>{if(Math.abs(b[1]-y)<=tol){const k="b"+i,p=prj(b[2],b[3]);it.push({k,kind:"battle",n:b[0],a:b[1],art:b[4],t:b[5],x:b[2],y:b[3]});h+=`<g class="hm-bt" data-k="${k}" data-x="${p[0].toFixed(1)}" data-y="${p[1].toFixed(1)}" transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})"><title>${es(b[0])}, ${es(fy(b[1]))}</title><circle r="7.5"/><path d="M-3.6-3.6L3.6 3.6M3.6-3.6L-3.6 3.6"/></g>`}});
S.items=it;$("#hmlay").innerHTML=h;if(S.lsel&&!it.find(i=>i.k==S.lsel)){S.lsel=null}else if(S.lsel){const g=document.querySelector(`#hmlay [data-k="${S.lsel}"]`);g&&g.classList.add("sel")}}
function selectLayer(k,auto){const it=S.items.find(i=>i.k==k);if(!it)return;S.lsel=k;S.sel=null;document.querySelectorAll("#hmp path.sel").forEach(p=>p.classList.remove("sel"));document.querySelectorAll("#hmlay .sel").forEach(g=>g.classList.remove("sel"));const g=document.querySelector(`#hmlay [data-k="${k}"]`);g&&g.classList.add("sel");
const when=it.kind=="battle"?fy(it.a):`${fy(it.a)} – ${fy(it.b)}`,lab={battle:"Battle",route:"Trade route",voyage:"Voyage"}[it.kind];
$("#hmi").innerHTML=`<h3><i style="background:${it.c||"#b91c1c"};${it.kind=="battle"?"border-radius:50%":""}"></i>${es(it.n)}</h3><p><b>${lab}:</b> ${es(when)}</p><p>${es(it.t)}</p><div class="acts">${it.kind=="voyage"?`<button class="pri" id="hmvp">▶ Play the voyage</button>`:""}${it.art&&get(it.art)?`<a class="${it.kind=="voyage"?"":"pri"}" href="#/art/${it.art}">Read the article</a>`:""}</div>`;
const vp=$("#hmvp");vp&&(vp.onclick=()=>playVoyage(k));if(it.kind=="voyage"&&auto)setTimeout(()=>playVoyage(k),500)}
function playVoyage(k){const g=document.querySelector(`#hmlay [data-k="${k}"]`);if(!g)return;const ln=g.querySelector(".ln");const it=S.items.find(i=>i.k==k);let L=0;try{L=ln.getTotalLength()}catch(e){}if(!L)return;
tween([0,0,1000]);const old=document.querySelector("#hmlay .hm-ship");old&&old.remove();
const ship=document.createElementNS("http://www.w3.org/2000/svg","g");ship.setAttribute("class","hm-ship");ship.innerHTML=`<circle r="5" fill="${it.c}" stroke="#fff" stroke-width="1.5" vector-effect="non-scaling-stroke"/><circle r="9" fill="${it.c}" opacity=".25"/>`;g.appendChild(ship);
if(still){ship.remove();return}ln.style.strokeDasharray=L+" "+L;const dur=Math.min(12000,Math.max(5000,L*14)),t0=performance.now();
const f=t=>{if(!ship.isConnected){ln.style.strokeDasharray="";return}const p=Math.min(1,(t-t0)/dur),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;ln.style.strokeDashoffset=L*(1-e);const q=ln.getPointAtLength(L*e);ship.setAttribute("transform",`translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);if(p<1)requestAnimationFrame(f);else{ln.style.strokeDasharray="";ln.style.strokeDashoffset="";setTimeout(()=>ship.remove(),1500)}};requestAnimationFrame(f)}

/* ---------- selecting a state ---------- */
function clearSel(){S.sel=null;S.lsel=null;document.querySelectorAll("#hmlay .sel").forEach(g=>g.classList.remove("sel"));document.querySelectorAll("#hmp path.sel").forEach(p=>p.classList.remove("sel"));$("#hmi").innerHTML=`<h3>Tap a state</h3><p>Tap any colored area to see what it was, how big it was and how long it lasted.</p>`}
function select(r,quiet){S.sel=r;S.lsel=null;document.querySelectorAll("#hmlay .sel").forEach(g=>g.classList.remove("sel"));const N=HMAPIDX.names,n=N[r[0]];document.querySelectorAll("#hmp path").forEach(p=>p.classList.toggle("sel",+p.dataset.n==r[0]));
const mem=r[4]>=0?N[r[4]]:null,id=artFor(n[1])||artFor(n[0].replace(/^\((.*)\)$/,"$1"))||(mem&&artFor(mem[1])),name=n[0].replace(/^\((.*)\)$/,"$1");
const life=`${fy(n[3])} – ${n[4]>=2024?"today":fy(n[4])}`;
$("#hmi").innerHTML=`<h3><i style="background:${colOf(n[0])}"></i>${es(name)}</h3><p><b>On this map:</b> ${es(life)}</p><p><b>Area in ${es(fy(S.y))}:</b> about ${num(r[3])} km²</p>${n[6]>r[3]*1.05?`<p><b>Largest:</b> about ${num(n[6])} km² in ${es(fy(n[5]))}</p>`:`<p><b>This is about its largest extent.</b></p>`}${mem?`<p><b>Part of:</b> ${es(mem[0].replace(/^\((.*)\)$/,"$1"))}</p>`:""}
<div class="acts">${id?`<a class="pri" href="#/art/${id}">Read the article</a>`:""}${n[6]>r[3]*1.05?`<button id="hmpk">See it at its largest</button>`:""}${n[1]?`<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(n[1].replace(/ /g,"_"))}" rel="noopener" target="_blank">Wikipedia</a>`:""}</div>`;
const pk=$("#hmpk");pk&&(pk.onclick=()=>{stop();show(n[5],n[0])})}
function selectExtra(i){const e=EXTRA.filter(e=>e[1]<=S.y&&e[2]>=S.y)[i];if(!e)return;document.querySelectorAll("#hmp path.sel").forEach(p=>p.classList.remove("sel"));S.sel=null;
$("#hmi").innerHTML=`<h3><i style="background:#d1495b;border-radius:50%"></i>${es(e[0])}</h3><p><b>On this map:</b> ${es(fy(e[1]))} – ${es(fy(e[2]))}</p><p>${es(e[5])}</p><p style="color:var(--mu)">Added by this encyclopedia; too small for the border dataset.</p>${get(e[6])?`<div class="acts"><a class="pri" href="#/art/${e[6]}">Read the article</a></div>`:""}`}

/* ---------- pan and zoom ---------- */
function setVB(vb,anim){const MINW=1000/14;let[x,y,w]=vb;w=Math.max(MINW,Math.min(1000,w));const h=w*.52;x=Math.max(-40,Math.min(1040-w,x));y=Math.max(-20,Math.min(540-h,y));if(w>=1000){x=0;y=0}S.vb=[x,y,w,h];
const svg=$("#hms");if(!svg)return;svg.setAttribute("viewBox",S.vb.map(v=>v.toFixed(2)).join(" "));clearTimeout(S.lt);S.lt=setTimeout(labels,anim?0:90)}
function fit(r){const w=Math.max(80,(r[9]-r[7])*1.5,(r[10]-r[8])*1.5/.52),cx=(r[7]+r[9])/2,cy=(r[8]+r[10])/2;tween([cx-w/2,cy-w*.26,w])}
function tween(to){if(still){setVB(to,1);return}const fr=S.vb.slice(),t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/450),e=1-Math.pow(1-p,3);setVB(fr.slice(0,3).map((v,i)=>v+(to[i]-v)*e),p==1);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function zoomAt(k,cx,cy){const[x,y,w]=S.vb;const nw=Math.max(1000/14,Math.min(1000,w/k)),f=nw/w;setVB([cx-(cx-x)*f,cy-(cy-y)*f,nw])}
function panzoom(){const svg=$("#hms"),pts=new Map();let moved=0,start=null;
const toMap=(cx,cy)=>{const b=svg.getBoundingClientRect();return[S.vb[0]+(cx-b.left)/b.width*S.vb[2],S.vb[1]+(cy-b.top)/b.height*S.vb[3]]};
svg.addEventListener("wheel",e=>{e.preventDefault();const[mx,my]=toMap(e.clientX,e.clientY);zoomAt(e.deltaY<0?1.25:.8,mx,my)},{passive:false});
svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);moved=0;start={vb:S.vb.slice(),pts:new Map(pts)};svg.classList.add("drag")});
svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);const b=svg.getBoundingClientRect(),sc=start.vb[2]/b.width;
if(pts.size==1){const s0=start.pts.get(e.pointerId);if(!s0)return;const dx=e.clientX-s0[0],dy=e.clientY-s0[1];if(Math.abs(dx)+Math.abs(dy)>4)moved=1;setVB([start.vb[0]-dx*sc,start.vb[1]-dy*sc,start.vb[2]])}
else if(pts.size==2){moved=1;const[a,c]=[...pts.values()],[a0,c0]=[...start.pts.values()];if(!a0||!c0)return;const d=Math.hypot(a[0]-c[0],a[1]-c[1]),d0=Math.hypot(a0[0]-c0[0],a0[1]-c0[1])||1;const k=d/d0,mx=(a0[0]+c0[0])/2,my=(a0[1]+c0[1])/2;
const px=start.vb[0]+(mx-b.left)*sc,py=start.vb[1]+(my-b.top)*sc,nw=start.vb[2]/k,f=nw/start.vb[2],cmx=(a[0]+c[0])/2-mx,cmy=(a[1]+c[1])/2-my;setVB([px-(px-start.vb[0])*f-cmx*sc*f,py-(py-start.vb[1])*f-cmy*sc*f,nw])}});
const up=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);start={vb:S.vb.slice(),pts:new Map(pts)};if(!pts.size)svg.classList.remove("drag");
if(!moved&&!pts.size){const t=document.elementFromPoint(e.clientX,e.clientY);const lk=t&&t.closest&&t.closest("[data-k]");if(lk){selectLayer(lk.dataset.k);return}if(t&&t.dataset&&t.dataset.n!=null&&t.closest("#hmp")){const r=S.rows.find(r=>r[0]==+t.dataset.n);r&&select(r)}else if(t&&t.dataset&&t.dataset.x!=null)selectExtra(+t.dataset.x);else clearSel()}};
svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
$("#hmzi").onclick=()=>zoomAt(1.6,S.vb[0]+S.vb[2]/2,S.vb[1]+S.vb[3]/2);$("#hmzo").onclick=()=>zoomAt(1/1.6,S.vb[0]+S.vb[2]/2,S.vb[1]+S.vb[3]/2);$("#hmz0").onclick=()=>tween([0,0,1000]);
svg.tabIndex=0;svg.addEventListener("keydown",e=>{const s=S.vb[2]*.1;const m={ArrowLeft:[-s,0],ArrowRight:[s,0],ArrowUp:[0,-s],ArrowDown:[0,s]}[e.key];if(m){e.preventDefault();setVB([S.vb[0]+m[0],S.vb[1]+m[1],S.vb[2]])}else if(e.key=="+"||e.key=="="){zoomAt(1.4,S.vb[0]+S.vb[2]/2,S.vb[1]+S.vb[3]/2)}else if(e.key=="-"){zoomAt(1/1.4,S.vb[0]+S.vb[2]/2,S.vb[1]+S.vb[3]/2)}})}
addEventListener("hashchange",()=>{if(!/^#\/histmap/.test(location.hash)){stop();S=null}});

/* ---------- ways in: History subject page and the Atlas ---------- */
const card=()=>`<div class="hmtools"><a href="#/histmap/1492"><svg viewBox="0 0 300 160" fill="#fff"><path d="M20 60c30-20 60-10 80 5s50 10 70-5 60-15 90 5v60c-30-15-60-10-90 5s-50 10-70-5-50-20-80 0z"/></svg><b>History map</b><span>Watch states and empires rise and fall on a map of the world, from 3400 BC to today.</span></a></div>`;

// Articles that open the map at a moment: [year, state to highlight] (states use Cliopatria's names).
const STATEART={rome:[117,"Roman Empire"],byzant:[1025,"Byzantine Empire"],mongol:[1279,"Mongol Empire"],ottoman:[1595,"Ottoman Empire"],mughal:[1700,"Mughal Empire"],persia:[-480,"Achaemenid Empire"],khmer:[1206,"Khmer Empire"],mali:[1415,"Mali Empire"],songhai:[1564,"Songhai Empire"],inca:[1497,"Inca Empire"],aztec:[1502,"Aztec Triple Alliance"],maya:[299,"Mayan City-States"],kush:[-700,"Kingdom of Kush"],aksum:[534,"Kingdom of Axum"],carthage:[-218,"Carthage"],phoenicians:[-615,"Phoenicia"],babylon:[-600,"Neo-Babylonian Empire"],greece:[-323,"Macedonian Empire"],alexander:[-323,"Macedonian Empire"],caesar:[-44,"Roman Republic"],china:[700,"Tang Dynasty"],seaempires:[1363,"Majapahit"],sulu:[1748,"Sultanate of Sulu"],precol:[1521,"Tondo"],asante:[1762,"Ashanti Empire"],zulu:[1820,"Zululand"],japan:[1943,"Empire of Japan"],meiji:[1890,"Empire of Japan"],korea:[1422,"Joseon"],caliphate:[732,"Umayyad Caliphate"],napoleon:[1811,"First French Empire"],usrev:[1783,"United States of America"],minoans:[-1600,"Minoan civilization"],olmecs:[-650,"Olmec Civilization"],indus:[-256,"Maurya Empire"],opium:[1842,"Qing Dynasty"],independence:[1947,"Republic of the Philippines"],
wwi:[1914],ww2:[1942],coldwar:[1962],frrev:[1789],latinind:[1825],africacolon:[1914],colonialism:[1914],decol:[1960],ussrfall:[1991],partition:[1947],crusades:[1100],explor:[1500],renais:[1500],reform:[1530],medieurope:[800],viking:[1000],blackdeath:[1347],phrev:[1896],malolos:[1899],phamwar:[1900],commonwealth:[1940],japocc:[1942]};
let ARTMAP=null;const artMap=()=>{if(ARTMAP)return ARTMAP;ARTMAP={};const L=window.HLAYERS;if(L){L.voyages.forEach(v=>{if(v[5]&&!ARTMAP[v[5]])ARTMAP[v[5]]=[v[1],"@"+v[0],v[0]]});L.routes.forEach(r=>{if(r[5]&&!ARTMAP[r[5]]&&!STATEART[r[5]])ARTMAP[r[5]]=[Math.round((r[1]+r[2])/2),"@"+r[0],r[0]]})}
for(const k in STATEART)if(!ARTMAP[k])ARTMAP[k]=[STATEART[k][0],STATEART[k][1]||"",STATEART[k][1]||""];if(L)L.battles.forEach(b=>{if(b[4]&&!ARTMAP[b[4]])ARTMAP[b[4]]=[b[1],"@"+b[0],b[0]]});return ARTMAP};
const globe=`<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.4"><circle cx="24" cy="24" r="19"/><path d="M5 24h38M24 5c-7 6-7 32 0 38M24 5c7 6 7 32 0 38" opacity=".7"/><path d="M12 14c4 2 6 6 4 10s2 6 6 5M30 30c3-2 7 0 8 3" stroke="#ffd23f"/></svg>`;
const idNow=()=>{const m=location.hash.match(/^#\/art\/([^/?#]+)/);return m?decodeURIComponent(m[1]):null};
function artLink(){const id=idNow(),m=id&&artMap()[id];if(!m)return;const body=V.querySelector(".body");if(!body||body.querySelector(".hmart"))return;const lead=body.querySelector(":scope>p.lead")||body.querySelector(":scope>p");if(!lead)return;
const a=document.createElement("a");a.className="hmart";a.href=`#/histmap/${m[0]}${m[1]?"/"+encodeURIComponent(m[1]):""}`;a.innerHTML=`${globe}<div><b>See it on the History map</b><span>${es(m[2]?m[2].replace(/^\((.*)\)$/,"$1")+" in "+fy(m[0]):"The world in "+fy(m[0]))}</span></div>`;const after=body.querySelector(":scope>.pff");(after||lead).after(a)}
let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(idNow())artLink();else timeLinks()})}).observe(V,{childList:true});
const mini=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18"/></svg>`;
function timeLinks(){if(/^#\/time/.test(location.hash)){V.querySelectorAll(".ev").forEach(ev=>{if(ev.querySelector(".hmtlk"))return;const b=ev.querySelector("b");const m=b&&b.textContent.trim().match(/^(\d{1,4})\s*(BCE|BC|CE|AD)?$/);if(!m)return;let y=+m[1];if(/^BC/.test(m[2]||""))y=-y;if(y<-3400||y>2024)return;ev.insertAdjacentHTML("beforeend",`<a class="hmtlk" href="#/histmap/${y}" title="See the world in ${fy(y)}" aria-label="See the world in ${fy(y)} on the History map">${mini}</a>`)});if(!V.querySelector(".hmtools")){const h=V.querySelector("h2");h&&h.insertAdjacentHTML("afterend",card())}}
const dc=document.getElementById("dc");if(dc&&!dc.dataset.hmo){dc.dataset.hmo=1;new MutationObserver(()=>timeLinks()).observe(dc,{childList:true})}if(dc)dc.querySelectorAll("p").forEach(p=>{if(p.querySelector(".hmtlk2"))return;const b=p.querySelector("b");const m=b&&b.textContent.trim().match(/^(\d{1,4})\s*(BCE|BC|CE|AD)?\.?$/);if(!m)return;let y=+m[1];if(/^BC/.test(m[2]||""))y=-y;if(y<-3400||y>2024)return;p.insertAdjacentHTML("beforeend",` <a class="lk il hmtlk2" href="#/histmap/${y}">Map of ${fy(y)}</a>`)})}
const oc=R.cat;R.cat=function(c){oc(c);if(c!="History")return;const op=V.querySelector(".opener");op&&!V.querySelector(".hmtools")&&op.insertAdjacentHTML("afterend",card())};
const oa=R.atlas;if(oa)R.atlas=function(x){oa(x);if(V.querySelector(".hmtools"))return;const h=V.querySelector("h2,h1");h&&h.parentNode&&(h.nextElementSibling||h).insertAdjacentHTML("afterend",card())};
})();
