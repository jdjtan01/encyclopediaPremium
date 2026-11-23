/* Word of the day, flashcards, reading progress and compare view */
(()=>{
const css=`.wod b.w{font:800 22px/1.2 var(--disp,system-ui);color:var(--hd);display:block;margin:2px 0 4px}.wod p{margin:.2em 0 .6em}
.rp .big{font:800 30px/1 var(--disp,system-ui);color:var(--hd)}.rp .bar{height:8px;border-radius:99px;background:var(--sf2);overflow:hidden;margin:8px 0 10px}.rp .bar i{display:block;height:100%;background:var(--g)}
.rp ul{list-style:none;padding:0;margin:6px 0 8px;font-size:14px}.rp li{display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--bd);padding:4px 0}
a.mi{text-decoration:none;box-sizing:border-box}
.fcw{max-width:640px;margin:0 auto}.fc{perspective:1200px;cursor:pointer;margin:14px 0;outline:none}.fc .in{position:relative;min-height:240px;transition:transform .45s;transform-style:preserve-3d}
.fc.on .in{transform:rotateY(180deg)}.fc .sd{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:22px;border-radius:16px;border:1px solid var(--bd);background:var(--sf)}
.fc .bk{transform:rotateY(180deg);background:var(--sf2)}.fc small{color:var(--mu);font:600 12px/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
.fc .q{font:800 24px/1.25 var(--disp,system-ui);color:var(--hd)}.fc .a{font:500 19px/1.45 system-ui,sans-serif;color:var(--tx)}
.fc:focus-visible .sd{outline:3px solid var(--ac);outline-offset:2px}.fcn{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}.fcn .ct{color:var(--mu);font-size:14px;min-width:90px;text-align:center}
.fcs{text-align:center;color:var(--mu);font-size:14px;margin-top:10px}
.cmpsel{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0 14px}.cmpsel select{max-width:100%;padding:8px 10px;border-radius:10px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:15px system-ui,sans-serif}
.cmph{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px}.cmph a{display:block;text-decoration:none;color:inherit;border:1px solid var(--bd);border-radius:14px;overflow:hidden;background:var(--sf)}
.cmph .ban{height:90px}.cmph b{display:block;padding:8px 12px;font:800 17px/1.25 var(--disp,system-ui);color:var(--hd)}
table.cmpt{width:100%;border-collapse:collapse;font-size:15px;table-layout:fixed}.cmpt th,.cmpt td{border-top:1px solid var(--bd);padding:8px 10px;vertical-align:top;text-align:left;overflow-wrap:anywhere}
.cmpt th{color:var(--mu);font:600 13px/1.4 system-ui,sans-serif;width:28%}.cmpt tr.sh td,.cmpt tr.sh th{background:color-mix(in srgb,var(--g) 9%,transparent)}.cmpt td.no{color:var(--mu)}
@media (max-width:560px){.cmpt th{width:30%}.cmpt th,.cmpt td{padding:7px 6px;font-size:14px}.fc .q{font-size:21px}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const gH=()=>typeof HIST!="undefined"?HIST:[],gR=()=>typeof rd!="undefined"?rd:[],gB=()=>typeof bm!="undefined"?bm:[],seedOf=()=>{const d=new Date();return d.getFullYear()*400+d.getMonth()*32+d.getDate()};
const esc2=s=>typeof esc=="function"?esc(s):String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const snip=(a,n)=>{const t=a.l||(a.p&&a.p[0]&&a.p[0][1])||"";return t.length>n?t.slice(0,t.lastIndexOf(" ",n))+"…":t};
const GL=[];A.forEach(a=>(a.g||[]).forEach(g=>{if(g[0]&&g[1])GL.push([g[0],g[1],a])}));

/* ---------- Word of the day ---------- */
const wordHTML=k=>{const[w,d,a]=GL[((k%GL.length)+GL.length)%GL.length];return `<h3>Word of the day</h3><b class="w">${esc2(w)}</b><p>${esc2(d)}</p><p><small>From <a href="#/art/${a.id}">${esc2(a.t)}</a></small></p>`};

/* ---------- Reading progress ---------- */
function progHTML(){const seen=new Set();gH().forEach(h=>get(h.i)&&seen.add(h.i));gR().forEach(i=>get(i)&&seen.add(i));
const n=seen.size;if(!n)return `<h3>Your reading</h3><p>Articles you open are counted here, on this device only. Open one to start.</p><a class="lk" href="#/browse">Browse all articles ›</a>`;
const by={};seen.forEach(i=>{const c=get(i).c;by[c]=(by[c]||0)+1});const tot={};A.forEach(a=>tot[a.c]=(tot[a.c]||0)+1);
const top=Object.entries(by).sort((x,y)=>y[1]-x[1]).slice(0,3);
const days=new Set(gH().filter(h=>h.t).map(h=>new Date(h.t).toDateString()));let st=0;const t=new Date();for(;;st++){const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-st);if(!days.has(d.toDateString()))break}
const pc=100*n/A.length;
return `<h3>Your reading</h3><div class="rp"><span class="big">${n.toLocaleString("en-US")}</span> of ${A.length.toLocaleString("en-US")} articles explored<div class="bar"><i style="width:${Math.max(1,pc).toFixed(1)}%"></i></div>${st>1?`<p style="margin:.2em 0">🔥 ${st}-day reading streak</p>`:""}<ul>${top.map(([c,k])=>`<li><span>${esc2(c)}</span><span>${k} of ${tot[c]}</span></li>`).join("")}</ul><a class="lk" href="#/hist">All subjects and history ›</a><br><a class="lk" href="#/cards">Review your reading ›</a></div>`}

const oh=R.home;R.home=function(x){oh(x);const c3=V.querySelector(".cols3");if(!c3)return;let k=seedOf()*13;
c3.insertAdjacentHTML("afterend",`<div class="cols3" style="margin-top:14px"><div class="panel wod" id="wod">${wordHTML(k)}<button class="btn sm" id="wodb">Another word</button></div><div class="panel" id="rpp">${progHTML()}</div><div class="panel"><h3>Study tools</h3><p>Turn any article into <b>flashcards</b>, or set two similar articles <b>side by side</b>.</p><p><a class="btn sm" href="#/cards">🃏 Flashcards from your reading</a></p><p><a class="btn sm" href="#/compare/jupiter~saturn">⇄ Compare Jupiter and Saturn</a></p></div></div>`);
const b=()=>{const e=$("#wodb");e&&(e.onclick=()=>{k+=7919;$("#wod").innerHTML=wordHTML(k)+`<button class="btn sm" id="wodb">Another word</button>`;b()})};b()};

/* ---------- Flashcards ---------- */
const deckOf=a=>[...(a.k||[]).map(([l,v])=>({q:l,ctx:a.t,a:v,ty:"Key fact"})),...(a.g||[]).map(([w,d])=>({q:w,ctx:a.t,a:d,ty:"Glossary"}))];
const shuffle=l=>{l=l.slice();for(let i=l.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[l[i],l[j]]=[l[j],l[i]]}return l};
R.cards=function(id){window.setCat&&setCat(null);let a=id&&get(id),deck,title,back;
if(a){deck=deckOf(a);title="Flashcards: "+a.t;back=`<a class="lk" href="#/art/${a.id}">‹ Back to the article</a>`;window.setCat&&setCat(a.c)}
else{const ids=[...new Set([...gH().map(h=>h.i),...gB()])].filter(get).slice(0,12);
if(!ids.length){V.innerHTML=`<div class="fcw"><h2>Flashcards</h2><p>Flashcards are made from the key facts and glossary of the articles you read. Open a few articles first, or choose <b>⋯ More › Flashcards</b> on any article.</p><a class="btn" href="#/browse">Browse articles</a></div>`;return}
deck=shuffle(ids.flatMap(i=>deckOf(get(i)))).slice(0,40);title="Review your reading";back=`<span class="lk">From your ${ids.length} most recent and bookmarked articles</span>`}
if(!deck.length){V.innerHTML=`<p>No flashcards for this article.</p>`;return}
let i=0,known=0,learn=0;
V.innerHTML=`<div class="fcw"><p>${back}</p><h2>${esc2(title)}</h2><p style="color:var(--mu)">Tap the card or press Space to flip. Use the arrow keys to move.</p><div class="fc" id="fc" tabindex="0" role="button" aria-label="Flashcard, press to flip"><div class="in"><div class="sd fr"></div><div class="sd bk"></div></div></div>
<div class="fcn"><button class="btn sm" id="fcp" aria-label="Previous card">‹</button><span class="ct" id="fct"></span><button class="btn sm" id="fcx" aria-label="Next card">›</button></div>
<div class="fcn" style="margin-top:10px"><button class="btn sm" id="fck">✓ I knew it</button><button class="btn sm" id="fcl">↺ Still learning</button><button class="btn sm" id="fcs">Shuffle</button></div><p class="fcs" id="fsc"></p></div>`;
const fc=$("#fc"),show=()=>{const c=deck[i];fc.classList.remove("on");fc.querySelector(".fr").innerHTML=`<small>${esc2(c.ty)} · ${esc2(c.ctx)}</small><div class="q">${esc2(c.q)}</div>`;fc.querySelector(".bk").innerHTML=`<small>${esc2(c.q)}</small><div class="a">${esc2(c.a)}</div>`;$("#fct").textContent=`${i+1} of ${deck.length}`;$("#fsc").textContent=known+learn?`Knew ${known} · Still learning ${learn}`:""};
const mv=d=>{i=(i+d+deck.length)%deck.length;show()},flip=()=>fc.classList.toggle("on");
fc.onclick=flip;$("#fcp").onclick=()=>mv(-1);$("#fcx").onclick=()=>mv(1);$("#fcs").onclick=()=>{deck=shuffle(deck);i=0;show()};
$("#fck").onclick=()=>{known++;mv(1)};$("#fcl").onclick=()=>{learn++;deck.push(deck[i]);mv(1)};
const kh=e=>{if(!document.body.contains(fc)){removeEventListener("keydown",kh);return}if(e.target.closest&&e.target.closest("input,select,textarea"))return;if(e.key==" "||e.key=="Enter"){e.preventDefault();flip()}else if(e.key=="ArrowRight")mv(1);else if(e.key=="ArrowLeft")mv(-1)};
addEventListener("keydown",kh);show()};

/* ---------- Compare ---------- */
const labs=a=>new Set((a.k||[]).map(k=>k[0].toLowerCase()));
const peers=a=>{const L=labs(a);return A.filter(b=>b!=a&&b.c==a.c&&[...labs(b)].filter(x=>L.has(x)).length>=2).sort((x,y)=>(y.sub==a.sub)-(x.sub==a.sub)||[...labs(y)].filter(z=>L.has(z)).length-[...labs(x)].filter(z=>L.has(z)).length||x.t.localeCompare(y.t))};
window.cmpPeers=peers;
R.compare=function(x){const[p,q]=String(x||"").split("~");const a=get(p);if(!a){location.hash="#/compare/jupiter~saturn";return}
const P=peers(a);let b=get(q);if(!b||b==a)b=P[0];setCat&&setCat(a.c);
if(!b){V.innerHTML=`<h2>Compare</h2><p>No similar articles to compare with <a href="#/art/${a.id}">${esc2(a.t)}</a>.</p>`;return}
const ka=new Map((a.k||[]).map(k=>[k[0].toLowerCase(),k])),kb=new Map((b.k||[]).map(k=>[k[0].toLowerCase(),k]));
const shared=[...ka.keys()].filter(k=>kb.has(k)),onlyA=[...ka.keys()].filter(k=>!kb.has(k)),onlyB=[...kb.keys()].filter(k=>!ka.has(k));
const row=(k,cls)=>{const x=ka.get(k),y=kb.get(k);return `<tr class="${cls}"><th scope="row">${esc2((x||y)[0])}</th><td class="${x?"":"no"}">${x?esc2(x[1]):"—"}</td><td class="${y?"":"no"}">${y?esc2(y[1]):"—"}</td></tr>`};
const opt=(l,sel)=>l.map(o=>`<option value="${o.id}"${o==sel?" selected":""}>${esc2(o.t)}${o.sub?" ("+esc2(o.sub)+")":""}</option>`).join("");
const firsts=A.filter(z=>z.c==a.c&&peers(z).length).sort((x,y)=>x.t.localeCompare(y.t));
V.innerHTML=`<p><a class="lk" href="#/art/${a.id}">‹ Back to ${esc2(a.t)}</a></p><h2>Compare side by side</h2>
<div class="cmpsel"><select id="ca" aria-label="First article">${opt(firsts,a)}</select><button class="btn sm" id="csw" aria-label="Swap the two articles">⇄</button><select id="cb" aria-label="Second article">${opt(P,b)}</select></div>
<div class="cmph"><a href="#/art/${a.id}">${ban(a)}<b>${esc2(a.t)}</b></a><a href="#/art/${b.id}">${ban(b)}<b>${esc2(b.t)}</b></a></div>
<table class="cmpt"><caption class="vh" style="position:absolute;left:-9999px">Key facts of ${esc2(a.t)} and ${esc2(b.t)}</caption><thead><tr><th scope="col">Key fact</th><th scope="col">${esc2(a.t)}</th><th scope="col">${esc2(b.t)}</th></tr></thead><tbody>${shared.map(k=>row(k,"sh")).join("")}${onlyA.map(k=>row(k,"")).join("")}${onlyB.map(k=>row(k,"")).join("")}</tbody></table>
<p style="color:var(--mu);font-size:14px;margin-top:10px">Highlighted rows are facts both articles share. Values are rounded, as in the articles.</p>
<div class="cols3" style="margin-top:12px"><div class="panel"><h3>${esc2(a.t)}</h3><p>${esc2(snip(a,200))}</p></div><div class="panel"><h3>${esc2(b.t)}</h3><p>${esc2(snip(b,200))}</p></div></div>`;
want([a,b]);$("#ca").onchange=e=>{const n=get(e.target.value),pp=peers(n);location.hash=`#/compare/${n.id}~${(pp.includes(b)?b:pp[0]).id}`};
$("#cb").onchange=e=>location.hash=`#/compare/${a.id}~${e.target.value}`;$("#csw").onclick=()=>{location.hash=`#/compare/${b.id}~${a.id}`}};

/* ---------- Article menu entries ---------- */
const pa=R.art;R.art=function(id){pa(id);const a=get(id);if(!a)return;const mn=$("#amn");if(!mn)return;
const P=peers(a);mn.insertAdjacentHTML("beforeend",`<a class="mi" href="#/cards/${a.id}">🃏 Flashcards</a>${P.length?`<a class="mi" href="#/compare/${a.id}~${P[0].id}">⇄ Compare with ${esc2(P[0].t)}</a>`:""}`)};
})();
