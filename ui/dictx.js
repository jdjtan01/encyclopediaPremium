// Dictionary (v172): colorful hero, word of the day, search modes (starts with, contains, in definitions),
// part-of-speech filters, rainbow A–Z, grouped senses, read aloud, starred words, links to articles and deep links (#/dict/word).
(function(){
if(typeof R=="undefined")return;
const POS={n:["Noun","#3b82f6"],v:["Verb","#f97316"],a:["Adjective","#10b981"],r:["Adverb","#a855f7"],e:["Encyclopedia term","#eab308"]};
const css=`
.dx{--dxa:#6366f1;--dxb:#ec4899;--dxc:#f59e0b}
.dx-hero{position:relative;overflow:hidden;border-radius:28px;padding:34px 30px 26px;margin:6px 0 18px;color:#fff;isolation:isolate;
background:linear-gradient(125deg,#4f46e5,#9333ea 45%,#ec4899 75%,#f59e0b);background-size:220% 220%;animation:dxFlow 16s ease-in-out infinite alternate;box-shadow:0 30px 60px -34px #7c3aed}
@keyframes dxFlow{to{background-position:100% 100%}}
.dx-hero h2{margin:0;font:900 clamp(32px,5vw,52px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.dx-hero p.sub{color:#fff!important;margin:8px 0 18px;font:600 15px/1.4 system-ui,sans-serif;opacity:.92;max-width:560px}
.dx-fl{position:absolute;inset:0;z-index:-1;pointer-events:none}
.dx-fl span{position:absolute;font:900 var(--s,60px)/1 var(--disp);color:rgba(255,255,255,.14);animation:dxFloat var(--d,14s) ease-in-out infinite alternate;animation-delay:var(--dl,0s)}
@keyframes dxFloat{to{transform:translateY(-26px) rotate(var(--r,8deg))}}
.dx-sb{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.dx-in{flex:1 1 320px;position:relative}
.dx-in input{width:100%;box-sizing:border-box;padding:16px 18px 16px 50px!important;border-radius:18px!important;border:1px solid rgba(255,255,255,.5)!important;font:600 17px system-ui,sans-serif!important;
background:rgba(255,255,255,.92)!important;color:#1e1b4b!important;box-shadow:0 16px 30px -18px rgba(0,0,0,.5);outline:none;transition:box-shadow .25s,transform .25s}
.dx-in input:focus{box-shadow:0 0 0 4px rgba(255,255,255,.45),0 18px 34px -16px rgba(0,0,0,.55)}
.dx-in svg{position:absolute;left:17px;top:50%;translate:0 -50%;width:20px;height:20px;color:#6d28d9}
.dx-seg{display:inline-flex;padding:4px;border-radius:14px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.dx-seg button{border:0;background:none;color:#fff;font:700 13px system-ui,sans-serif;padding:9px 12px;border-radius:10px;cursor:pointer;transition:background .2s,color .2s}
.dx-seg button.on{background:#fff;color:#6d28d9;box-shadow:0 4px 12px -4px rgba(0,0,0,.35)}
.dx-rnd{border:0;cursor:pointer;padding:12px 16px;border-radius:14px;font:800 14px var(--disp);color:#6d28d9;background:#fff;box-shadow:0 10px 22px -12px rgba(0,0,0,.5);transition:transform .2s}
.dx-rnd:hover{transform:rotate(-3deg) scale(1.05)}.dx-rnd:active{transform:scale(.94)}
.dx-st{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.dx-st span{padding:6px 12px;border-radius:99px;background:rgba(255,255,255,.18);font:700 12.5px system-ui,sans-serif;box-shadow:inset 0 0 0 1px rgba(255,255,255,.28)}
.dx-wod{position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding:20px 22px;border-radius:22px;margin:0 0 18px;
background:color-mix(in srgb,var(--sf) 70%,transparent);border:1px solid var(--bd);box-shadow:0 20px 40px -30px #7c3aed}
.dx-wod:before{content:"";position:absolute;inset:0;background:radial-gradient(400px 160px at 0% 0%,color-mix(in srgb,#f59e0b 22%,transparent),transparent),radial-gradient(360px 160px at 100% 100%,color-mix(in srgb,#ec4899 18%,transparent),transparent);pointer-events:none}
.dx-wod .badge{position:relative;width:74px;height:74px;border-radius:22px;display:grid;place-items:center;font:900 34px var(--disp);color:#fff;background:linear-gradient(135deg,#f59e0b,#ec4899);box-shadow:0 14px 26px -12px #ec4899;animation:dxWob 6s ease-in-out infinite}
@keyframes dxWob{50%{transform:rotate(-6deg) scale(1.05)}}
.dx-wod small{position:relative;display:block;font:800 12px var(--disp);color:#db2777;letter-spacing:.02em}
.dx-wod b.w{position:relative;display:block;font:900 28px/1.1 var(--disp);color:var(--hd);margin:2px 0 4px}
.dx-wod p{position:relative;margin:0;color:var(--tx2,var(--tx));font:15px/1.5 system-ui,sans-serif}
.dx-wod .acts{position:relative;margin-top:8px;display:flex;gap:8px}
.dx-chips{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 12px}
.dx-chip{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);border-radius:99px;padding:7px 13px;font:700 13px system-ui,sans-serif;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s,color .2s}
.dx-chip i{width:9px;height:9px;border-radius:50%;background:var(--c)}
.dx-chip em{font-style:normal;opacity:.6;font-weight:600}
.dx-chip:hover{transform:translateY(-2px)}
.dx-chip.on{background:var(--c);border-color:var(--c);color:#fff;box-shadow:0 10px 20px -12px var(--c)}.dx-chip.on i{background:#fff}
.dx-az{display:grid;grid-template-columns:repeat(13,1fr);gap:6px;margin:0 0 18px}
.dx-az button{border:0;cursor:pointer;aspect-ratio:1.25;border-radius:12px;font:900 16px var(--disp);color:#fff;background:linear-gradient(140deg,hsl(var(--h) 85% 58%),hsl(calc(var(--h) + 30) 85% 48%));box-shadow:0 8px 16px -12px hsl(var(--h) 80% 40%);transition:transform .2s cubic-bezier(.3,1.6,.5,1),box-shadow .2s,opacity .2s}
.dx-az button:hover{transform:translateY(-3px) scale(1.08)}
.dx-az.pick button:not(.on){opacity:.45}
.dx-az button.on{transform:scale(1.1);box-shadow:0 0 0 3px var(--bg),0 0 0 5px hsl(var(--h) 85% 55%)}
.dx-meta{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:0 2px 10px;color:var(--mu);font:600 13px system-ui,sans-serif}
.dx-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
.dx-card{position:relative;padding:16px 18px 14px;border-radius:18px;background:var(--sf);border:1px solid var(--bd);border-top:4px solid var(--c);
animation:dxIn .45s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--k,0) * 25ms);transition:transform .25s,box-shadow .25s}
.dx-card:hover{transform:translateY(-3px);box-shadow:0 16px 30px -22px var(--c)}
@keyframes dxIn{from{opacity:0;transform:translateY(12px)}}
.dx-card h3{display:flex;align-items:center;gap:8px;margin:0 0 8px;font:900 22px/1.15 var(--disp);color:var(--hd)}
.dx-card h3 a{color:inherit;text-decoration:none}.dx-card h3 a:hover{text-decoration:underline}
.dx-card h3 .sp{margin-left:auto}
.dx-ib{border:0;background:var(--sf2);color:var(--tx);width:32px;height:32px;border-radius:10px;cursor:pointer;font-size:15px;display:inline-grid;place-items:center;transition:transform .2s,background .2s}
.dx-ib:hover{transform:scale(1.12)}.dx-ib.on{background:#fde68a;color:#92400e}
.dx-g{margin:6px 0 2px}
.dx-pos{display:inline-block;padding:2px 9px;border-radius:99px;font:800 11.5px system-ui,sans-serif;color:#fff;background:var(--c);margin-bottom:4px}
.dx-g ol{margin:2px 0 6px;padding-left:20px;font:14.5px/1.5 system-ui,sans-serif;color:var(--tx)}
.dx-g ol li::marker{color:var(--c);font-weight:800}
.dx-g ol li+li{margin-top:3px}
.dx mark{background:color-mix(in srgb,#f59e0b 35%,transparent);color:inherit;border-radius:4px;padding:0 2px}
.dx-art{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:6px 11px;border-radius:99px;font:700 12.5px system-ui,sans-serif;text-decoration:none;color:#fff;background:linear-gradient(135deg,#6366f1,#ec4899)}
.dx-more{display:block;margin:20px auto 6px;border:0;cursor:pointer;padding:13px 22px;border-radius:16px;font:800 15px var(--disp);color:#fff;background:linear-gradient(135deg,#6366f1,#ec4899);box-shadow:0 14px 28px -16px #9333ea;transition:transform .2s}
.dx-more:hover{transform:translateY(-2px) scale(1.03)}
.dx-empty{text-align:center;padding:40px 10px;color:var(--mu)}.dx-empty b{display:block;font:900 40px var(--disp);margin-bottom:6px}
.dx-sug{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}
.dx-sug a{padding:6px 12px;border-radius:99px;background:var(--sf2);color:var(--tx);text-decoration:none;font:700 13px system-ui,sans-serif}
.dx-src{margin-top:18px;color:var(--mu);font-size:12.5px}
@media (max-width:640px){.dx-hero{padding:26px 18px 20px;border-radius:22px}.dx-az{grid-template-columns:repeat(9,1fr)}.dx-wod{grid-template-columns:1fr}.dx-wod .badge{width:56px;height:56px;font-size:26px}.dx-list{grid-template-columns:1fr}.dx-seg button{padding:8px 9px}}
@media (prefers-reduced-motion:reduce){.dx-hero,.dx-fl span,.dx-wod .badge,.dx-card{animation:none!important}}
`;
const st=document.createElement("style");st.id="dictxcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SK="ep-dict-stars";const getStars=()=>{try{return new Set(JSON.parse(localStorage.getItem(SK)||"[]"))}catch(e){return new Set()}};
const saveStars=s=>{try{localStorage.setItem(SK,JSON.stringify([...s]))}catch(e){}};
let IDX=null,ARTS=null;
function build(){const m=new Map();
  (typeof DICT!="undefined"?DICT:[]).forEach(d=>{const i=d.indexOf("|");if(i<0)return;const w=d.slice(0,i),k=w.toLowerCase();if(!m.has(k))m.set(k,{w,k,s:[]});m.get(k).s.push(["e",d.slice(i+1)])});
  (window.DICTW||[]).forEach(x=>{const[w,p,...d]=x.split("|");const k=w.toLowerCase();if(!m.has(k))m.set(k,{w,k,s:[]});m.get(k).s.push([p,d.join("|")])});
  IDX=[...m.values()].sort((a,b)=>a.k.localeCompare(b.k));
  ARTS=new Map();try{(typeof A!="undefined"?A:[]).forEach(a=>{{const t=a.t.toLowerCase().replace(/\s*\(.*\)$/,"");ARTS.set(t,a.id);if(t.includes(" and "))t.split(" and ").forEach(x=>{if(!ARTS.has(x.trim()))ARTS.set(x.trim(),a.id)})}});const L=window.LINKS||{};for(const id in L)(L[id]||[]).forEach(ph=>{const k=String(ph).toLowerCase();if(!ARTS.has(k))ARTS.set(k,id)})}catch(e){}}
const findArt=k=>{if(!ARTS)return null;const c=[k,k+"s",k+"es",k.replace(/y$/,"ies"),"the "+k,"the "+k+"s"];for(const x of c)if(ARTS.has(x))return ARTS.get(x);try{if(typeof get=="function"&&get(k))return k}catch(e){}return null};
const speak=w=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(w);u.rate=.9;speechSynthesis.speak(u)}catch(e){}};
const hl=(t,q)=>{if(!q)return E(t);const i=t.toLowerCase().indexOf(q);if(i<0)return E(t);return E(t.slice(0,i))+"<mark>"+E(t.slice(i,i+q.length))+"</mark>"+E(t.slice(i+q.length))};
function wod(){const pool=IDX.filter(g=>/^[a-z]{6,}$/.test(g.w)&&g.s.some(s=>s[1].length>40));const d=new Date(),n=d.getFullYear()*372+d.getMonth()*31+d.getDate();let h=n;h=(h*2654435761)>>>0;return pool[h%pool.length]}
R.dict=function(x){
  try{if(typeof setCat=="function")setCat(null)}catch(e){}
  const V=document.getElementById("v");
  const st={q:x?String(x):"",mode:"start",pos:"all",off:0,star:false};
  const L="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  V.innerHTML=`<div class="dx"><section class="dx-hero"><div class="dx-fl" aria-hidden="true">${["A","z","é","Q","g","?","M","&"].map((c,i)=>`<span style="left:${(i*13+4)%96}%;top:${(i*29+8)%80}%;--s:${46+(i*17)%60}px;--d:${11+i*2}s;--dl:-${i*1.3}s;--r:${i%2?-10:10}deg">${c}</span>`).join("")}</div>
  <h2>Dictionary</h2><p class="sub" id="dxsub">Look up any word, explore by letter or search inside definitions.</p>
  <div class="dx-sb"><label class="dx-in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="dq" type="search" placeholder="Search a word…" aria-label="Search words" autocomplete="off"></label>
  <div class="dx-seg" role="group" aria-label="Search mode"><button data-m="start" class="on">Starts with</button><button data-m="has">Contains</button><button data-m="def">In definitions</button></div>
  <button class="dx-rnd" id="dxr" title="Show a random word">🎲 Random word</button></div><div class="dx-st" id="dxst"></div></section>
  <div id="dxw"></div><div class="dx-chips" id="dxc"></div><div class="dx-az" id="dxa">${L.map((l,i)=>`<button data-l="${l}" style="--h:${i*14}" aria-label="Words starting with ${l}">${l}</button>`).join("")}</div>
  <div class="dx-meta"><span id="dxm">Loading dictionary…</span></div><div class="dx-list" id="dxl"></div><div id="dxp"></div>
  <p class="dx-src">General definitions from WordNet 3.1, © Princeton University. Encyclopedia terms are written for this site.</p></div>`;
  const $$=s=>V.querySelector(s),inp=$$("#dq");inp.value=st.q;
  const sync=()=>{try{const h="#/dict"+(st.q?"/"+encodeURIComponent(st.q):"");if(location.hash!==h)history.replaceState(null,"",h)}catch(e){}};
  function matches(){const q=st.q.toLowerCase().trim(),stars=getStars();let r=IDX;
    if(st.star)r=r.filter(g=>stars.has(g.k));
    if(q){if(st.mode=="start")r=r.filter(g=>g.k.startsWith(q));else if(st.mode=="has")r=r.filter(g=>g.k.includes(q));else r=q.length<3?[]:r.filter(g=>g.s.some(s=>s[1].toLowerCase().includes(q)))}
    return r}
  function card(g,k,q,stars){const senses=st.pos=="all"?g.s:g.s.filter(s=>s[0]==st.pos);const by={};senses.forEach(s=>{(by[s[0]]=by[s[0]]||[]).push(s[1])});
    const order=["e","n","v","a","r"].filter(p=>by[p]);const c=POS[order[0]][1];const art=findArt(g.k);
    return `<article class="dx-card" style="--c:${c};--k:${Math.min(k,20)}"><h3><a href="#/dict/${encodeURIComponent(g.w)}">${st.mode!="def"?hl(g.w,q):E(g.w)}</a><button class="dx-ib sp" data-say="${E(g.w)}" title="Hear it" aria-label="Hear ${E(g.w)}">🔊</button><button class="dx-ib${stars.has(g.k)?" on":""}" data-star="${E(g.k)}" title="Star this word" aria-label="Star ${E(g.w)}">${stars.has(g.k)?"★":"☆"}</button></h3>
    ${order.map(p=>`<div class="dx-g" style="--c:${POS[p][1]}"><span class="dx-pos">${POS[p][0]}</span><ol>${by[p].map(d=>`<li>${st.mode=="def"?hl(d,q):E(d)}</li>`).join("")}</ol></div>`).join("")}
    ${art?`<a class="dx-art" href="#/art/${art}">📖 Read the article</a>`:""}</article>`}
  function render(){const all=matches(),q=st.q.toLowerCase().trim(),stars=getStars();
    const cnt={all:all.length};"envar".split("").forEach(p=>cnt[p]=all.filter(g=>g.s.some(s=>s[0]==p)).length);
    const list=st.pos=="all"?all:all.filter(g=>g.s.some(s=>s[0]==st.pos));
    $$("#dxc").innerHTML=`<button class="dx-chip${st.pos=="all"?" on":""}" data-p="all" style="--c:#6366f1"><i></i>All <em>${cnt.all.toLocaleString("en-US")}</em></button>`+["n","v","a","r","e"].map(p=>`<button class="dx-chip${st.pos==p?" on":""}" data-p="${p}" style="--c:${POS[p][1]}"><i></i>${POS[p][0]}s <em>${cnt[p].toLocaleString("en-US")}</em></button>`).join("")+`<button class="dx-chip${st.star?" on":""}" data-s="1" style="--c:#eab308">★ Starred <em>${stars.size}</em></button>`;
    $$("#dxa").classList.toggle("pick",st.mode=="start"&&/^[a-z]$/i.test(st.q));V.querySelectorAll("#dxa button").forEach(b=>b.classList.toggle("on",st.mode=="start"&&st.q.toUpperCase()==b.dataset.l));
    $$("#dxw").style.display=q||st.star?"none":"";
    const show=list.slice(0,st.off+60);
    $$("#dxm").textContent=list.length?`Showing ${show.length.toLocaleString("en-US")} of ${list.length.toLocaleString("en-US")} ${list.length==1?"word":"words"}`:"";
    if(!list.length){const near=q?IDX.filter(g=>g.k.startsWith(q.slice(0,Math.max(2,q.length-2)))).slice(0,8):[];
      $$("#dxl").innerHTML=`<div class="dx-empty" style="grid-column:1/-1"><b>🤔</b>${st.mode=="def"&&q.length<3?"Type at least 3 letters to search inside definitions.":st.star?"No starred words yet. Tap ☆ on any word to save it here.":"No matching words."}${near.length?`<div class="dx-sug">${near.map(g=>`<a href="#/dict/${encodeURIComponent(g.w)}">${E(g.w)}</a>`).join("")}</div>`:""}</div>`;$$("#dxp").innerHTML="";return}
    $$("#dxl").innerHTML=show.map((g,i)=>card(g,i-st.off,q,stars)).join("");
    $$("#dxp").innerHTML=show.length<list.length?`<button class="dx-more" id="dxmore">Show more words</button>`:"";
    const mb=$$("#dxmore");if(mb)mb.onclick=()=>{st.off+=60;render()}}
  function start(){build();const n=(window.DICTW||[]).length,e=(typeof DICT!="undefined"?DICT:[]).length;
    $$("#dxst").innerHTML=`<span>📚 ${n.toLocaleString("en-US")} WordNet definitions</span><span>✨ ${e.toLocaleString("en-US")} encyclopedia terms</span><span>🔤 ${IDX.length.toLocaleString("en-US")} words</span>`;
    const w=wod();if(w){const s=w.s.find(s=>s[1].length>40)||w.s[0];$$("#dxw").innerHTML=`<div class="dx-wod"><div class="badge">${E(w.w[0].toUpperCase())}</div><div><small>Word of the day</small><b class="w">${E(w.w)}</b><p><span class="dx-pos" style="--c:${POS[s[0]][1]}">${POS[s[0]][0]}</span> ${E(s[1])}</p><div class="acts"><button class="dx-ib" data-say="${E(w.w)}" title="Hear it">🔊</button><a class="dx-chip" style="--c:#ec4899" href="#/dict/${encodeURIComponent(w.w)}">See full entry</a></div></div></div>`}
    render()}
  inp.addEventListener("input",()=>{st.q=inp.value.trim();st.off=0;sync();if(IDX)render()});
  inp.addEventListener("keydown",e=>{if(e.key=="Enter"){const a=V.querySelector(".dx-card h3 a");if(a)a.click()}});
  V.querySelector(".dx-seg").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;st.mode=b.dataset.m;st.off=0;V.querySelectorAll(".dx-seg button").forEach(x=>x.classList.toggle("on",x==b));if(IDX)render();inp.focus()});
  $$("#dxa").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;st.q=b.dataset.l;st.mode="start";st.off=0;inp.value=st.q;V.querySelectorAll(".dx-seg button").forEach(x=>x.classList.toggle("on",x.dataset.m=="start"));sync();render()});
  $$("#dxr").onclick=()=>{if(!IDX)return;const g=IDX[Math.floor(Math.random()*IDX.length)];st.q=g.w;st.mode="start";st.pos="all";st.star=false;st.off=0;inp.value=g.w;V.querySelectorAll(".dx-seg button").forEach(x=>x.classList.toggle("on",x.dataset.m=="start"));sync();render()};
  V.querySelector(".dx").addEventListener("click",e=>{const say=e.target.closest("[data-say]");if(say){speak(say.dataset.say);return}
    const sb=e.target.closest("[data-star]");if(sb){const s=getStars(),k=sb.dataset.star;s.has(k)?s.delete(k):s.add(k);saveStars(s);render();return}
    const pc=e.target.closest("#dxc [data-p]");if(pc){st.pos=pc.dataset.p;st.off=0;render();return}
    if(e.target.closest("#dxc [data-s]")){st.star=!st.star;st.off=0;render();return}
    const dl=e.target.closest('a[href^="#/dict/"]');if(dl){e.preventDefault();st.q=decodeURIComponent(dl.getAttribute("href").slice(7));st.mode="start";st.pos="all";st.star=false;st.off=0;inp.value=st.q;V.querySelectorAll(".dx-seg button").forEach(x=>x.classList.toggle("on",x.dataset.m=="start"));sync();render();scrollTo({top:0,behavior:"smooth"})}});
  if(window.DICTW)start();else{const sc=document.createElement("script");sc.src="data/dictionary.js";sc.onload=start;sc.onerror=()=>{$$("#dxm").textContent="The dictionary file could not be loaded. Check your connection and try again."};document.head.appendChild(sc)}
};
})();
