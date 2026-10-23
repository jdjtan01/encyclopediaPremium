/* Quick-reference A–Z entries: short entries alongside the long articles. Pages: #/az and #/e/<id>. */
(()=>{
const enc=encodeURIComponent,slug=t=>t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const art=new Map(A.map(a=>[sortT(a.t).toLowerCase(),a.id]));
window.SH=(window.SHORT||[]).map(x=>({id:slug(x[0]),t:x[0],c:CAT[x[1]]?x[1]:((window.OLDSEC||{})[x[1]]||"The Philippines"),x:x[2],art:art.get(sortT(x[0]).toLowerCase())})).sort((a,b)=>sortT(a.t).localeCompare(sortT(b.t),"en",{sensitivity:"base"}));
window.SHBY={};SH.forEach(e=>SHBY[e.id]=e);
const L1=s=>{const c=sortT(s).normalize("NFD").replace(/[̀-ͯ]/g,"")[0].toUpperCase();return /[A-Z]/.test(c)?c:"#"};
const first=t=>{const m=t.match(/^.*?[.!?](\s|$)/);return m?m[0]:t};

R.az=function(l){window.setCat&&setCat(null);const has=new Set(SH.map(e=>L1(e.t)));l=l&&has.has(l)?l:"";
V.innerHTML=`<h2>Quick reference A–Z</h2><p class="mu" style="font:14px system-ui">${SH.length} short entries on people, places, foods, words and ideas, to go with the ${A.length} full articles. Each entry links to related articles.</p><input type="search" id="azq" placeholder="Find an entry" aria-label="Find an entry" style="width:100%;max-width:420px"><div class="letters">${["","#",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(c=>`<button data-l="${c}"${c&&!has.has(c)?" disabled":""}${c==l?' class="on"':""}>${c||"All"}</button>`).join("")}</div><div id="azb"></div>`;
V.querySelector('[data-l=""]').style.width="auto";V.querySelector('[data-l=""]').style.padding="0 10px";
const show=(lt,q)=>{const r=SH.filter(e=>q?(e.t+" "+e.x).toLowerCase().includes(q):!lt||L1(e.t)==lt);let cur="";
$("#azb").innerHTML=r.length?r.map(e=>{const h=!q&&L1(e.t)!=cur?`<h3 class="azh">${cur=L1(e.t)}</h3>`:"";return h+`<a class="aze" href="#/e/${e.id}" style="--c:${CAT[e.c][1]}"><b>${esc(e.t)}</b><small>${esc(e.c)}</small><span>${esc(first(e.x))}</span></a>`}).join(""):"<p>No entries found.</p>"};
V.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{V.querySelectorAll("[data-l]").forEach(x=>x.classList.toggle("on",x==b));$("#azq").value="";history.replaceState(null,"","#/az"+(b.dataset.l?"/"+enc(b.dataset.l):""));show(b.dataset.l)});
$("#azq").oninput=e=>show(l,e.target.value.trim().toLowerCase());show(l)};

R.e=function(id){const e=SHBY[id];if(!e){R.az();return}window.setCat&&setCat(e.c);const same=SH.filter(x=>x.c==e.c&&x!=e),i=SH.indexOf(e),pv=SH[(i-1+SH.length)%SH.length],nx=SH[(i+1)%SH.length];
V.innerHTML=`<div class="runhead"><a href="#/az">Quick reference A–Z</a><span></span><small><a href="#/cat/${enc(e.c)}" style="color:inherit">${esc(e.c)}</a></small></div><h2 class="atitle">${esc(e.t)}</h2>
<div class="row" style="margin-top:6px"><div class="body" style="flex:3 1 340px"><p class="lead">${esc(e.x)}</p>${e.art?`<p><a class="btn" href="#/art/${e.art}">Read the full article: ${esc(get(e.art).t)} ›</a></p>`:""}<div id="erel"></div>
<h3>More in ${esc(e.c)}</h3><div class="azmini">${shuf(same).slice(0,6).map(x=>`<a href="#/e/${x.id}">${esc(x.t)}</a>`).join("")}</div>
<div class="pn"><a class="btn" href="#/e/${pv.id}">‹ ${esc(pv.t)}</a><a class="btn" href="#/e/${nx.id}">${esc(nx.t)} ›</a></div></div></div>`;
window.linkText&&linkText(V,"e:"+id,12);
const rel=[...new Set([...V.querySelectorAll(".lead a.xl:not(.xe)")].map(a=>a.getAttribute("href").replace("#/art/","")))].map(get).filter(Boolean);
if(rel.length){$("#erel").innerHTML=`<h3>Related articles</h3><div class="seealso">${rel.slice(0,4).map(b=>`<a href="#/art/${b.id}">${ban(b)}<span>${esc(b.t)}<small>${esc(b.c)}</small></span></a>`).join("")}</div>`;want(rel.slice(0,4))}
document.title=e.t+" · Encyclopedia Premium"};

/* Search: add matching entries */
const os=R.search;R.search=function(q){os(q);const k=String(q||"").toLowerCase().trim();if(!k)return;const r=SH.filter(e=>e.t.toLowerCase().includes(k)||e.x.toLowerCase().includes(" "+k)).sort((a,b)=>(b.t.toLowerCase().includes(k))-(a.t.toLowerCase().includes(k))).slice(0,30);
if(r.length){const h=V.querySelector("h2");const html=`<h3>Quick reference A–Z</h3>${r.map(e=>`<div class="hrow" style="align-items:flex-start"><div style="flex:1"><a href="#/e/${e.id}">${esc(e.t)}</a> <small>${esc(e.c)} · A–Z entry</small><p style="margin:.2em 0;font-size:15px">${esc(cut(e.x,160))}</p></div></div>`).join("")}`;
const p=V.querySelector("p.mu");p&&(p.textContent+=`, ${r.length} A–Z entr${r.length==1?"y":"ies"}`);const d=[...V.querySelectorAll("h3")].find(x=>x.textContent=="Dictionary");d?d.insertAdjacentHTML("beforebegin",html):V.insertAdjacentHTML("beforeend",html)}};

/* Navigation, contents and home links */
const nv=$("#nv"),ib=nv&&nv.querySelector('[data-v="index"]');ib&&ib.insertAdjacentHTML("afterend",`<button data-v="az" onclick="go('az')">A–Z</button>`);
const oc=R.contents;R.contents=function(){oc();const fb=V.querySelector(".frontbar");fb&&fb.insertAdjacentHTML("beforeend",`<a class="btn" href="#/az">Quick reference A–Z (${SH.length} entries)</a>`)};
const oh=R.home;R.home=function(x){oh(x);const fb=V.querySelector(".frontbar");fb&&fb.insertAdjacentHTML("beforeend",`<a class="btn sm" href="#/az">A–Z</a>`)};
})();
