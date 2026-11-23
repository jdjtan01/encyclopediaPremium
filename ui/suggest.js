/* Search suggestions for the big search bar on the home page */
(()=>{
const css=`
.hx-s{position:relative;z-index:20}
.hx-s input::-webkit-search-cancel-button{filter:brightness(0) invert(1);cursor:pointer}
.sg{position:absolute;left:0;right:0;top:calc(100% + 10px);z-index:40;max-height:min(70vh,520px);overflow:auto;overscroll-behavior:contain;border-radius:22px;padding:8px;
background:var(--sgbg,#fff);color:#1b1340;box-shadow:0 30px 60px -20px rgba(20,8,70,.55),0 0 0 1px rgba(124,58,237,.15);transform-origin:top center;animation:sgIn .28s cubic-bezier(.2,.8,.2,1)}
:root[data-theme="dark"] .sg{--sgbg:#1c1640;color:#f1ecff}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .sg{--sgbg:#1c1640;color:#f1ecff}}
@keyframes sgIn{from{opacity:0;transform:translateY(-8px) scale(.98)}}
.sg[hidden]{display:none}
.sg h4{margin:8px 10px 4px;font:800 12px/1 var(--disp);color:#7c3aed;display:flex;align-items:center;gap:8px}
.sg h4:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(124,58,237,.35),transparent)}
:root[data-theme="dark"] .sg h4{color:#c4b5fd}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .sg h4{color:#c4b5fd}}
.sg a{position:relative;display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:14px;text-decoration:none;color:inherit;animation:sgIt .35s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--k) * 28ms)}
@keyframes sgIt{from{opacity:0;transform:translateX(-10px)}}
.sg a.on,.sg a:hover{background:linear-gradient(90deg,rgba(219,39,119,.12),rgba(124,58,237,.10))}
.sg a.on:before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:4px;border-radius:4px;background:linear-gradient(#db2777,#7c3aed)}
.sg .th{flex:none;width:44px;height:44px;border-radius:12px;overflow:hidden;position:relative;display:grid;place-items:center;font-size:22px;box-shadow:0 4px 10px -4px rgba(0,0,0,.35)}
.sg .th .ban{position:absolute;inset:0;height:100%;font-size:22px;display:grid;place-items:center}
.sg .th .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sg .th.fl{background:#fff}.sg .th.fl img{width:100%;height:100%;object-fit:cover}
.sg .th.az{background:linear-gradient(135deg,#f59e0b,#db2777);color:#fff;font:900 16px var(--disp)}
.sg .th.go{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;font-size:20px}
.sg .tx{min-width:0;flex:1}
.sg .tx b{display:block;font:700 15.5px/1.25 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sg .tx small{display:flex;align-items:center;gap:6px;font:500 12.5px/1.3 system-ui,sans-serif;opacity:.72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sg .tx small i{flex:none;width:8px;height:8px;border-radius:50%;background:var(--c)}
.sg mark{background:linear-gradient(transparent 55%,rgba(255,210,63,.75) 55%);color:inherit;padding:0 1px;border-radius:2px}
.sg .kd{flex:none;font:700 11px system-ui;opacity:.55;border:1px solid currentColor;border-radius:6px;padding:2px 6px}
.sg .chips{display:flex;flex-wrap:wrap;gap:8px;padding:6px 10px 10px}
.sg .chips a{display:inline-flex;padding:8px 12px;border-radius:999px;background:rgba(124,58,237,.1);font:700 13.5px system-ui,sans-serif;gap:6px}
.sg .chips a.on,.sg .chips a:hover{background:linear-gradient(90deg,#db2777,#7c3aed);color:#fff}
.sg .none{padding:14px 12px;font:500 14.5px system-ui,sans-serif;opacity:.8}
.sg .ft{display:flex;gap:14px;justify-content:flex-end;padding:6px 10px 4px;font:500 11.5px system-ui;opacity:.55}
@media (max-width:560px){.sg{border-radius:18px;padding:6px}.sg .th{width:40px;height:40px}.sg .ft{display:none}}
@media (prefers-reduced-motion:reduce){.sg,.sg a{animation:none}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const norm=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[’']/g,"'");
const esc4=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let IDX=null;
const build=()=>{IDX={art:A.map(a=>({a,k:norm(a.t)})),ctry:Object.entries(window.CTRY||{}).map(([key,d])=>({key,d,k:norm(d.n||key),cap:norm((d.cap||[])[0]||"")})),sh:(window.SH||[]).map(e=>({e,k:norm(e.t)}))}};
const score=(k,q)=>{if(k==q)return 100;if(k.startsWith(q))return 85-Math.min(20,k.length/4);const i=k.indexOf(" "+q);if(i>=0)return 65-Math.min(20,i/3);const j=k.indexOf(q);return j>=0?35-Math.min(15,j/4):0};
const top=(list,q,n,fn)=>list.map(x=>[fn(x),x]).filter(p=>p[0]>0).sort((a,b)=>b[0]-a[0]).slice(0,n).map(p=>p[1]);
const hl=(t,q)=>{const k=norm(t),i=k.indexOf(q);if(i<0||!q)return esc4(t);return esc4(t.slice(0,i))+"<mark>"+esc4(t.slice(i,i+q.length))+"</mark>"+esc4(t.slice(i+q.length))};
const flagSrc=d=>d.flag?`flags/${d.flag}.svg`:d.i2?`flags/${d.i2.toLowerCase()}.svg`:"";
function attach(form){if(!form||form.dataset.sg)return;form.dataset.sg=1;const inp=form.querySelector("input");if(!inp)return;
const box=document.createElement("div");box.className="sg";box.hidden=true;box.id="sgl";box.setAttribute("role","listbox");box.setAttribute("aria-label","Suggestions");form.appendChild(box);
inp.setAttribute("role","combobox");inp.setAttribute("aria-autocomplete","list");inp.setAttribute("aria-controls","sgl");inp.setAttribute("aria-expanded","false");inp.setAttribute("autocomplete","off");
let cur=-1;const items=()=>[...box.querySelectorAll("a")];
const setOn=i=>{const L=items();cur=L.length?(i+L.length)%L.length:-1;L.forEach((a,j)=>{a.classList.toggle("on",j==cur);a.setAttribute("aria-selected",j==cur)});if(cur>=0){L[cur].scrollIntoView({block:"nearest"});inp.setAttribute("aria-activedescendant",L[cur].id)}};
const open=()=>{box.hidden=false;inp.setAttribute("aria-expanded","true")},close=()=>{box.hidden=true;inp.setAttribute("aria-expanded","false");cur=-1};
let k=0;const row=(href,th,title,sub,kd)=>`<a id="sg${k}" role="option" href="${href}" style="--k:${k++}">${th}<span class="tx"><b>${title}</b>${sub?`<small>${sub}</small>`:""}</span>${kd?`<span class="kd">${kd}</span>`:""}</a>`;
const render=()=>{if(!IDX)build();k=0;const raw=inp.value.trim(),q=norm(raw);
if(!q){const S=window.SUBJ||{},pop=Object.keys(S).map(c=>get((S[c].feat||[])[0])).filter(Boolean).sort(()=>Math.random()-.5).slice(0,7);
box.innerHTML=`<h4>Try one of these</h4><div class="chips">${pop.map(a=>`<a id="sg${k}" role="option" href="#/art/${a.id}" style="--k:${k++}">${esc4(a.t)}</a>`).join("")}</div>`;open();cur=-1;return}
const arts=top(IDX.art,q,6,x=>score(x.k,q)+(x.a.f?1:0)),cs=top(IDX.ctry,q,3,x=>Math.max(score(x.k,q),score(x.cap,q)*.7)),sh=q.length>1?top(IDX.sh,q,3,x=>score(x.k,q)*.9):[];
let h="";
if(arts.length){h+=`<h4>Articles</h4>`+arts.map(({a})=>row(`#/art/${a.id}`,`<span class="th">${ban(a)}</span>`,hl(a.t,q),`<i style="--c:${(CAT[a.c]||["#888"])[0]}"></i>${esc4(a.c)}${a.sub?" › "+esc4(a.sub):""}`)).join("");want(arts.map(x=>x.a))}
if(cs.length)h+=`<h4>Countries</h4>`+cs.map(({key,d})=>row(`#/country/${encodeURIComponent(key)}`,`<span class="th fl">${flagSrc(d)?`<img src="${flagSrc(d)}" alt="" loading="lazy">`:""}</span>`,hl(d.n||key,q),`Capital: ${esc4((d.cap||[])[0]||"—")} · ${esc4(d.ct||"")}`)).join("");
if(sh.length)h+=`<h4>Quick reference</h4>`+sh.map(({e})=>row(`#/e/${e.id}`,`<span class="th az">Aa</span>`,hl(e.t,q),esc4(String(e.x||"").slice(0,70))+"…")).join("");
h+=`<h4>Everything</h4>`+row(`#/search/${encodeURIComponent(raw)}`,`<span class="th go">🔎</span>`,`See all results for “${esc4(raw)}”`,"Articles, dictionary and A–Z","Enter");
if(!arts.length&&!cs.length&&!sh.length)h=`<p class="none">No quick matches for “${esc4(raw)}”. Press Enter to search everything.</p>`+h;
h+=`<div class="ft"><span>↑↓ to move</span><span>Enter to open</span><span>Esc to close</span></div>`;
box.innerHTML=h;open();cur=-1};
let t=0;inp.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(render,70)});inp.addEventListener("focus",render);
inp.addEventListener("keydown",e=>{if(box.hidden&&e.key=="ArrowDown"){render();return}
if(e.key=="ArrowDown"){e.preventDefault();setOn(cur+1)}else if(e.key=="ArrowUp"){e.preventDefault();setOn(cur-1)}else if(e.key=="Escape"){close()}
else if(e.key=="Enter"&&cur>=0){e.preventDefault();const a=items()[cur];close();location.hash=a.getAttribute("href")}});
box.addEventListener("mousedown",e=>e.preventDefault());box.addEventListener("click",()=>close());
inp.addEventListener("blur",()=>setTimeout(close,120));
form.addEventListener("submit",()=>close())}
const prev=R.home;R.home=function(x){prev(x);attach(V.querySelector(".hx-s"))};
})();
