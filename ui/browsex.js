// All articles (v176): colorful hero with live counts, subject chips with art, section chips for the chosen subject,
// title or full-text search, more sorts (A–Z, Z–A, newest, shortest, longest, by subject, shuffle), grid or list view,
// hide-read and letter jump, progressive loading as you scroll, read ticks and animated glass cards.
(function(){
if(typeof R=="undefined"||typeof A=="undefined")return;
const css=`
.bx{position:relative}
.bx-hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:30px 30px 22px;margin:6px 0 16px;color:#fff;
background:linear-gradient(125deg,var(--h1,#0ea5e9),var(--h2,#6366f1) 45%,var(--h3,#d946ef) 80%,var(--h4,#f97316));background-size:220% 220%;animation:bxFlow 16s ease-in-out infinite alternate;box-shadow:0 30px 60px -36px var(--h2,#6366f1);transition:--h1 .6s}
@keyframes bxFlow{to{background-position:100% 100%}}
.bx-hero h2{margin:0;display:flex;align-items:center;gap:14px;font:900 clamp(30px,4.6vw,50px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.bx-hero h2 .art{width:64px;height:64px;flex:none;border-radius:20px;display:grid;place-items:center;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
.bx-hero h2 .art svg{width:56px;height:56px}
.bx-hero p{margin:10px 0 16px;font:600 15px/1.45 system-ui,sans-serif;color:#fff!important;opacity:.93;max-width:620px}
.bx-sp{position:absolute;inset:0;z-index:-1;pointer-events:none}
.bx-sp i{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff;opacity:.5;animation:bxTw var(--d) ease-in-out infinite alternate;animation-delay:var(--dl)}
@keyframes bxTw{from{opacity:.1;transform:scale(.6)}to{opacity:.8;transform:scale(1.3)}}
.bx-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.bx-f{flex:1 1 300px;position:relative}
.bx-f input{width:100%;box-sizing:border-box;padding:14px 16px 14px 46px!important;border-radius:16px!important;border:1px solid rgba(255,255,255,.5)!important;background:rgba(255,255,255,.93)!important;color:#1e1b4b!important;font:600 16px system-ui,sans-serif!important;outline:none;box-shadow:0 14px 28px -18px rgba(0,0,0,.5)}
.bx-f input:focus{box-shadow:0 0 0 4px rgba(255,255,255,.4),0 14px 28px -18px rgba(0,0,0,.5)}
.bx-f svg{position:absolute;left:15px;top:50%;translate:0 -50%;width:19px;height:19px;color:#4f46e5}
.bx-seg{display:inline-flex;padding:4px;border-radius:14px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.bx-seg button{border:0;background:none;color:#fff;font:700 13px system-ui,sans-serif;padding:9px 12px;border-radius:10px;cursor:pointer}
.bx-seg button.on{background:#fff;color:#4338ca;box-shadow:0 4px 12px -4px rgba(0,0,0,.35)}
.bx-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px}
.bx-chip{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);border-radius:99px;padding:5px 12px 5px 5px;font:700 13px system-ui,sans-serif;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s,color .2s,border-color .2s;animation:bxIn .4s both;animation-delay:calc(var(--k)*25ms)}
.bx-chip .ic{width:24px;height:24px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(140deg,var(--c),var(--l));overflow:hidden}
.bx-chip .ic svg{width:22px;height:22px}
.bx-chip em{font-style:normal;opacity:.55;font-weight:600}
.bx-chip:hover{transform:translateY(-2px);border-color:var(--c)}
.bx-chip.on{background:var(--c);border-color:var(--c);color:#fff;box-shadow:0 10px 20px -12px var(--c)}.bx-chip.on em{opacity:.8}
.bx-chip.all .ic{background:conic-gradient(#f97316,#ec4899,#8b5cf6,#06b6d4,#10b981,#f97316)}
.bx-secs{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 12px;padding:10px;border-radius:18px;background:color-mix(in srgb,var(--c,#6366f1) 8%,var(--sf));border:1px dashed color-mix(in srgb,var(--c,#6366f1) 35%,transparent)}
.bx-secs:empty{display:none}
.bx-sec{border:0;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:6px 11px 6px 6px;border-radius:99px;background:var(--sf);color:var(--tx);font:700 12.5px system-ui,sans-serif;box-shadow:inset 0 0 0 1px var(--bd);transition:background .2s,color .2s,transform .2s}
.bx-sec .sico{width:20px!important;height:20px!important;border-radius:6px!important;margin:0!important;box-shadow:none!important}.bx-sec .sico svg{width:13px!important;height:13px!important}
.bx-sec em{font-style:normal;opacity:.55}
.bx-sec:hover{transform:translateY(-1px)}
.bx-sec.on{background:var(--c);color:#fff;box-shadow:none}
.bx-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 12px}
.bx-bar select{padding:9px 12px;border-radius:12px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:700 13px system-ui,sans-serif}
.bx-tg{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font:700 13px system-ui,sans-serif;color:var(--tx);user-select:none}
.bx-tg input{position:absolute;opacity:0;width:1px;height:1px}
.bx-tg span{width:38px;height:22px;border-radius:99px;background:var(--sf2);position:relative;transition:background .25s;box-shadow:inset 0 0 0 1px var(--bd)}
.bx-tg span:after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.3);transition:transform .25s cubic-bezier(.3,1.5,.5,1)}
.bx-tg input:checked+span{background:linear-gradient(135deg,#10b981,#06b6d4)}
.bx-tg input:checked+span:after{transform:translateX(16px)}
.bx-tg input:focus-visible+span{outline:2px solid #6366f1;outline-offset:2px}
.bx-vw{margin-left:auto;display:inline-flex;padding:3px;border-radius:12px;background:var(--sf2)}
.bx-vw button{border:0;background:none;color:var(--tx);width:36px;height:32px;border-radius:9px;cursor:pointer;display:grid;place-items:center}
.bx-vw button svg{width:18px;height:18px}
.bx-vw button.on{background:var(--sf);box-shadow:0 2px 8px -3px rgba(0,0,0,.3);color:#6366f1}
.bx-az{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 14px}
.bx-az button{border:0;cursor:pointer;min-width:28px;height:28px;border-radius:8px;font:800 12.5px var(--disp);color:var(--tx);background:var(--sf2);transition:background .2s,color .2s,transform .2s}
.bx-az button:hover{transform:translateY(-2px);background:hsl(var(--h) 80% 55%);color:#fff}
.bx-az button:disabled{opacity:.3;cursor:default;transform:none;background:var(--sf2);color:var(--tx)}
.bx-meta{margin:0 2px 12px;color:var(--mu);font:600 13.5px system-ui,sans-serif}
.bx-meta b{color:var(--hd)}
.bx .grid{gap:16px!important}
.bx .grid .card{position:relative;border-radius:20px!important;overflow:hidden;background:color-mix(in srgb,var(--sf) 80%,transparent)!important;border:1px solid var(--bd)!important;
animation:bxIn .5s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--k,0)*22ms);transition:translate .3s cubic-bezier(.2,1.2,.4,1),box-shadow .3s,border-color .3s!important;transform:none!important}
@keyframes bxIn{from{opacity:0;transform:translateY(14px) scale(.98)}}
.bx .grid .card:hover{translate:0 -6px;border-color:var(--c,#6366f1)!important;box-shadow:0 22px 40px -24px var(--c,#6366f1)}
.bx .grid .card .ban{overflow:hidden}
.bx .grid .card .ban img{transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.bx .grid .card:hover .ban img{transform:scale(1.08)}
.bx .grid .card:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.25) 48%,transparent 60%);transform:translateX(-120%)}
.bx .grid .card:hover:after{transform:translateX(120%);transition:transform .9s cubic-bezier(.22,1,.36,1)}
.bx .grid .card.rd:before{content:"✓ Read";position:absolute;top:10px;right:10px;z-index:3;padding:4px 9px;border-radius:99px;font:800 11px system-ui,sans-serif;color:#fff;background:rgba(16,185,129,.92);box-shadow:0 4px 10px -4px rgba(0,0,0,.4)}
.bx .bx-rt{display:block;margin-top:4px;font:700 11.5px system-ui,sans-serif;color:var(--mu)}
.bx-list{display:grid;gap:8px}
.bx-row{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:10px 14px;border-radius:16px;text-decoration:none;color:var(--tx);background:var(--sf);border:1px solid var(--bd);border-left:5px solid var(--c);animation:bxIn .4s both;animation-delay:calc(var(--k,0)*15ms);transition:transform .2s,box-shadow .2s}
.bx-row:hover{transform:translateX(5px);box-shadow:0 12px 24px -18px var(--c)}
.bx-row>span{min-width:0}
.bx-row .e{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:21px;background:color-mix(in srgb,var(--c) 15%,transparent)}
.bx-row b{display:block;font:800 15.5px/1.2 var(--disp);color:var(--hd)}
.bx-row small{display:block;margin-top:2px;color:var(--mu);font:600 12.5px system-ui,sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bx-row .r{font:700 12px system-ui,sans-serif;color:var(--mu);text-align:right;white-space:nowrap}
.bx-row .r i{display:block;font-style:normal;color:#10b981;font-weight:900}
.bx-more{height:60px}
.bx-empty{text-align:center;padding:40px 10px;color:var(--mu);font:600 15px system-ui,sans-serif}.bx-empty b{display:block;font-size:42px;margin-bottom:6px}
.bx mark{background:color-mix(in srgb,#f59e0b 40%,transparent);color:inherit;border-radius:3px}
@media (max-width:640px){.bx-hero{padding:24px 18px 18px;border-radius:22px}.bx-hero h2 .art{width:48px;height:48px}.bx-hero h2 .art svg{width:42px;height:42px}.bx-vw{margin-left:0}.bx-row{grid-template-columns:auto 1fr}.bx-row .r{display:none}}
@media (prefers-reduced-motion:reduce){.bx-hero,.bx-sp i,.bx-chip,.bx .grid .card,.bx-row{animation:none!important}}
`;
const st=document.createElement("style");st.id="browsexcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const Ls=(k,d)=>{try{const v=JSON.parse(localStorage[k]);return v==null?d:v}catch(e){return d}},Sv=(k,v)=>{try{localStorage[k]=JSON.stringify(v)}catch(e){}};
const ST=t=>String(t).replace(/^(The|A|An)\s+/i,"");
const L1=t=>{const c=ST(t).normalize("NFD").replace(/[̀-ͯ]/g,"")[0];return c&&/[a-z]/i.test(c)?c.toUpperCase():"#"};
const WC=new Map();const words=a=>{if(WC.has(a.id))return WC.get(a.id);let s=(a.l||"")+" "+(a.p||[]).map(x=>x.join(" ")).join(" ")+" "+(a.s||[]).map(x=>x.join(" ")).join(" ")+" "+(a.s2||[]).map(x=>x.join(" ")).join(" ");const n=s.split(/\s+/).length;WC.set(a.id,n);return n};
const mins=a=>Math.max(1,Math.round(words(a)/200));
const grid='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>';
const list='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.6" cy="6" r="1.2" fill="currentColor"/><circle cx="3.6" cy="12" r="1.2" fill="currentColor"/><circle cx="3.6" cy="18" r="1.2" fill="currentColor"/></svg>';
let bio=null;
R.browse=function(arg){
  try{if(typeof setCat=="function")setCat(null)}catch(e){}
  const V=document.getElementById("v");const parts=String(arg||"").split("/");let c=parts[0]&&CAT[parts[0]]?parts[0]:"";let sec=c&&parts[1]?parts[1]:"";
  const pref=Ls("bf",{s:"az",u:false});const S={c,sec,q:"",mode:pref.m||"title",sort:pref.s||"az",hide:!!pref.u,view:pref.v||"grid",letter:"",n:0,seed:Math.random()};
  const rdSet=()=>new Set(Ls("rd",[])||[]);
  const SU=window.SUBJ||{};const keys=Object.keys(CAT);const cnt={};A.forEach(a=>{cnt[a.c]=(cnt[a.c]||0)+1});
  const col=k=>CAT[k]||["#6366f1","#a5b4fc"];
  V.innerHTML=`<div class="bx"><section class="bx-hero" id="bxh"><div class="bx-sp" aria-hidden="true">${Array.from({length:14},(_,i)=>`<i style="left:${(i*37+7)%96}%;top:${(i*53+11)%88}%;--d:${2+(i%5)}s;--dl:-${i*.4}s"></i>`).join("")}</div>
  <h2 id="bxt"></h2><p id="bxp"></p>
  <div class="bx-tools"><label class="bx-f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="fq" type="search" placeholder="Search articles…" aria-label="Search articles" autocomplete="off"></label>
  <div class="bx-seg" role="group" aria-label="Search in"><button data-m="title">Titles</button><button data-m="all">Titles and text</button></div></div></section>
  <div class="bx-chips" role="toolbar" aria-label="Filter by subject"><button class="bx-chip all" data-c="" style="--c:#6366f1;--l:#ec4899;--k:0"><span class="ic"></span>All <em>${A.length.toLocaleString("en-US")}</em></button>${keys.map((k,i)=>`<button class="bx-chip" data-c="${E(k)}" style="--c:${col(k)[0]};--l:${col(k)[1]};--k:${i+1}"><span class="ic">${window.subjArt?subjArt(k):""}</span>${E(k)} <em>${cnt[k]||0}</em></button>`).join("")}</div>
  <div class="bx-secs" id="bxs"></div>
  <div class="bx-bar"><select id="so" aria-label="Sort"><option value="az">A to Z</option><option value="za">Z to A</option><option value="new">Newest first</option><option value="short">Quickest reads</option><option value="long">Longest reads</option><option value="cat">By subject</option><option value="rnd">Shuffle</option></select>
  <label class="bx-tg"><input type="checkbox" id="ur"><span></span>Hide articles I have read</label>
  <div class="bx-vw" role="group" aria-label="View"><button data-v="grid" title="Grid view" aria-label="Grid view">${grid}</button><button data-v="list" title="List view" aria-label="List view">${list}</button></div></div>
  <div class="bx-az" id="bxa"></div><div class="bx-meta" id="bxm"></div><div id="bl"></div><div class="bx-more" id="bxmore"></div></div>`;
  const $$=s=>V.querySelector(s),inp=$$("#fq");
  $$("#so").value=S.sort;$$("#ur").checked=S.hide;
  const save=()=>Sv("bf",{s:S.sort,u:S.hide,v:S.view,m:S.mode});
  const sync=()=>{const h="#/browse"+(S.c?"/"+encodeURIComponent(S.c)+(S.sec?"/"+encodeURIComponent(S.sec):""):"");try{if(location.hash!==h)history.replaceState(null,"",h)}catch(e){}};
  let L=[];
  function hero(){const h=$$("#bxh");const k=S.c;if(k){const[a,b]=col(k);h.style.setProperty("--h1",a);h.style.setProperty("--h2",b);h.style.setProperty("--h3",a);h.style.setProperty("--h4",b)}else["--h1","--h2","--h3","--h4"].forEach(p=>h.style.removeProperty(p));
    $$("#bxt").innerHTML=(k&&window.subjArt?`<span class="art">${subjArt(k)}</span>`:"")+E(S.sec||k||"All articles");
    $$("#bxp").textContent=k?((SU[k]||{}).tag||"")+(S.sec?" · "+k:""):"Browse every article in the encyclopedia. Filter by subject or section, search titles or full text, and sort the way you like.";
    V.querySelectorAll(".bx-chip").forEach(b=>b.classList.toggle("on",b.dataset.c==S.c));
    V.querySelectorAll(".bx-seg button").forEach(b=>b.classList.toggle("on",b.dataset.m==S.mode));
    V.querySelectorAll(".bx-vw button").forEach(b=>b.classList.toggle("on",b.dataset.v==S.view));
    const sb=$$("#bxs");if(k&&SU[k]){sb.style.setProperty("--c",col(k)[0]);sb.innerHTML=`<button class="bx-sec${S.sec?"":" on"}" data-s="">All of ${E(k)}</button>`+SU[k].subs.map(x=>`<button class="bx-sec${S.sec==x.n?" on":""}" data-s="${E(x.n)}">${window.secIcon?secIcon(x.n,col(k)[0]):""}${E(x.n)} <em>${x.ids.length}</em></button>`).join("")}else sb.innerHTML=""}
  function compute(){const q=inp.value.trim().toLowerCase(),rd=rdSet();let secIds=null;if(S.c&&S.sec&&SU[S.c]){const x=SU[S.c].subs.find(y=>y.n==S.sec);secIds=x?new Set(x.ids):null}
    let l=A.filter(a=>(!S.c||a.c==S.c)&&(!secIds||secIds.has(a.id))&&(!S.hide||!rd.has(a.id)));
    if(q)l=l.filter(a=>a.t.toLowerCase().includes(q)||(S.mode=="all"&&((a.l||"")+" "+(a.p||[]).map(x=>x[1]).join(" ")).toLowerCase().includes(q)));
    const az=(x,y)=>ST(x.t).localeCompare(ST(y.t));
    if(S.sort=="az")l.sort(az);else if(S.sort=="za")l.sort((x,y)=>az(y,x));else if(S.sort=="new")l.reverse();else if(S.sort=="short")l.sort((x,y)=>words(x)-words(y));else if(S.sort=="long")l.sort((x,y)=>words(y)-words(x));
    else if(S.sort=="cat")l.sort((x,y)=>x.c.localeCompare(y.c)||az(x,y));else{const r=(()=>{let s=Math.floor(S.seed*1e9);return()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648}})();for(let i=l.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[l[i],l[j]]=[l[j],l[i]]}}
    L=l;S.n=0;
    const letters=new Set(l.map(a=>L1(a.t)));const abc="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    $$("#bxa").style.display=(S.sort=="az"||S.sort=="za")?"":"none";$$("#bxa").innerHTML=abc.map((x,i)=>`<button data-l="${x}" style="--h:${i*14}"${letters.has(x)?"":" disabled"}>${x}</button>`).join("");
    const nr=l.filter(a=>rd.has(a.id)).length;
    $$("#bxm").innerHTML=`<b>${l.length.toLocaleString("en-US")}</b> article${l.length==1?"":"s"}${S.c?"":` in ${keys.length} subjects`}${nr?` · ${nr} read`:""}`;
    $$("#bl").innerHTML=l.length?(S.view=="grid"?`<div class="grid"></div>`:`<div class="bx-list"></div>`):`<div class="bx-empty"><b>🔍</b>No articles match.${q&&S.mode=="title"?` <button class="ctx-b" id="bxtry" style="margin-left:6px">Search inside text too</button>`:""}</div>`;
    const t=$$("#bxtry");if(t)t.onclick=()=>{S.mode="all";save();hero();compute()};
    more(60)}
  function hl(t,q){if(!q)return E(t);const i=t.toLowerCase().indexOf(q);return i<0?E(t):E(t.slice(0,i))+"<mark>"+E(t.slice(i,i+q.length))+"</mark>"+E(t.slice(i+q.length))}
  function more(n){const box=$$("#bl>.grid,#bl>.bx-list");if(!box||S.n>=L.length)return;const q=inp.value.trim().toLowerCase(),rd=rdSet(),chunk=L.slice(S.n,S.n+n);const base=S.n;S.n+=chunk.length;
    if(S.view=="grid"){const tmp=document.createElement("div");tmp.innerHTML=cards(chunk);const items=[...tmp.querySelectorAll(".card")];items.forEach((el,i)=>{const a=chunk[i];el.style.setProperty("--k",Math.min(i,24));el.style.setProperty("--c",col(a.c)[0]);el.dataset.l=L1(a.t);
        const t=el.querySelector(".t");if(t){t.insertAdjacentHTML("beforeend",`<span class="bx-rt">⏱ ${mins(a)} min read</span>`);const b=t.querySelector("b");if(b&&q)b.innerHTML=hl(a.t,q)}box.appendChild(el)})}
    else box.insertAdjacentHTML("beforeend",chunk.map((a,i)=>`<a class="bx-row" href="#/art/${a.id}" data-l="${L1(a.t)}" style="--c:${col(a.c)[0]};--k:${Math.min(i,30)}"><span class="e">${a.i||"📄"}</span><span><b>${hl(a.t,q)}</b><small>${E(a.sub||a.c)} · ${E((a.l||"").slice(0,110))}…</small></span><span class="r">⏱ ${mins(a)} min${rd.has(a.id)?"<i>✓ Read</i>":""}</span></a>`).join(""))}
  const go2=()=>{sync();hero();compute()};
  V.querySelectorAll(".bx-chip").forEach(b=>b.onclick=()=>{S.c=b.dataset.c;S.sec="";go2()});
  $$("#bxs").addEventListener("click",e=>{const b=e.target.closest(".bx-sec");if(!b)return;S.sec=b.dataset.s;go2()});
  V.querySelectorAll(".bx-seg button").forEach(b=>b.onclick=()=>{S.mode=b.dataset.m;save();hero();compute();inp.focus()});
  V.querySelectorAll(".bx-vw button").forEach(b=>b.onclick=()=>{S.view=b.dataset.v;save();hero();compute()});
  $$("#so").onchange=e=>{S.sort=e.target.value;S.seed=Math.random();save();compute()};
  $$("#ur").onchange=e=>{S.hide=e.target.checked;save();compute()};
  let ft=0;inp.oninput=()=>{clearTimeout(ft);ft=setTimeout(compute,140)};
  $$("#bxa").addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.disabled)return;const x=b.dataset.l;const idx=L.findIndex(a=>L1(a.t)==x);if(idx<0)return;
    let el=V.querySelector(`#bl [data-l="${x}"]`);
    if(!el){const box=$$("#bl>.grid,#bl>.bx-list");box.innerHTML="";S.n=idx;more(60);if(!$$("#bxtop"))$$("#bl").insertAdjacentHTML("afterbegin",`<button class="ctx-b" id="bxtop" style="margin:0 0 12px">↑ Back to the start of the list</button>`);$$("#bxtop").onclick=()=>compute();el=V.querySelector(`#bl [data-l="${x}"]`)}
    el&&el.scrollIntoView({behavior:"smooth",block:"center"})});
  if(bio)bio.disconnect();if("IntersectionObserver" in window){bio=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))more(60)},{rootMargin:"1000px"});bio.observe($$("#bxmore"))}
  hero();compute();
};
})();
