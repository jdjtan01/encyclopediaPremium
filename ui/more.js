/* Notes on figures, country and region pages, Test yourself quizzes, the printable book and smarter search. */
(()=>{
const enc=encodeURIComponent,col=c=>CAT[c]||["#666","#999"];

/* ---------- Notes: where to check each key figure ---------- */
const VOLC=new Set(["mayon","taal","pinatubo","volc","phtyph"]),BRIT=t=>["Encyclopaedia Britannica","https://www.britannica.com/search?query="+enc(t)];
function noteFor(a,label,val){const l=label.toLowerCase(),v=String(val);
if(/nobel/i.test(v+l))return["The Nobel Prize","https://www.nobelprize.org"];
if(/heritage/i.test(l))return["UNESCO World Heritage List","https://whc.unesco.org/en/list/"];
if(a.oc=="Space and Astronomy"||["solar","moon","stars","bh","exoplanet"].includes(a.id))return["NASA Planetary Fact Sheet and NASA Science","https://nssdc.gsfc.nasa.gov/planetary/factsheet/"];
if(VOLC.has(a.id)||/eruption|danger zone/i.test(l))return["PHIVOLCS, the Philippine Institute of Volcanology and Seismology","https://www.phivolcs.dost.gov.ph"];
if(a.id=="everest"&&/height/.test(l))return["2020 joint survey by Nepal and China, reported by National Geographic","https://www.nationalgeographic.com"];
if(/population|people/i.test(l))return a.oc=="Philippines"||/Philippin/.test(a.t)?["Philippine Statistics Authority","https://psa.gov.ph"]:["United Nations World Population Prospects","https://population.un.org/wpp/"];
if(a.oc=="Animals and Nature")return["IUCN Red List and Animal Diversity Web","https://www.iucnredlist.org"];
if(a.oc=="Health and the Body")return["MedlinePlus, US National Library of Medicine","https://medlineplus.gov"];
if(a.oc=="Philippines"&&/area|islands|province|region|capital|language/i.test(l))return["Philippine Statistics Authority and official government sources","https://psa.gov.ph"];
if(a.oc=="Sports"||/olympic/i.test(v))return["Olympics.com and official sports bodies","https://olympics.com"];
if(a.oc=="Economics and Society"&&/currency|inflation|bank/i.test(l+v))return["Bangko Sentral ng Pilipinas","https://www.bsp.gov.ph"];
if(a.oc=="Languages"&&/speakers|languages/i.test(l))return["Ethnologue","https://www.ethnologue.com"];
return BRIT(sortT(a.t))}
const prevArt=R.art;R.art=function(id){prevArt(id);const a=get(id);if(!a)return;
const cl=[...V.querySelectorAll(".hero .cl1")];if(cl.length&&a.k){const N=[];cl.forEach((c,i)=>{const k=a.k[i];if(!k)return;N.push([k,noteFor(a,k[0],k[1])]);c.querySelector("b").insertAdjacentHTML("beforeend",`<sup><a href="#nt" class="nref" data-n="${N.length}">${N.length}</a></sup>`)});
const fr=$("#fr");if(fr&&N.length)fr.insertAdjacentHTML("beforeend",`<div id="nt"><b class="disp">Notes</b><p class="mu" style="font:13px system-ui;margin:.2em 0">Where to check the figures in the fact file at the top of this article. Figures are as of ${ED.date} unless another date is given.</p><ol class="notes">${N.map(([k,s])=>`<li><b>${esc(k[0])}</b> (${esc(k[1])}): <a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a></li>`).join("")}</ol></div>`);
V.querySelectorAll(".nref").forEach(r=>r.onclick=e=>{e.preventDefault();$("#nt").scrollIntoView({behavior:"smooth"})})}
quiz(a)};

/* ---------- Test yourself ---------- */
const QK="quizBest";
function quiz(a){const Q=[],pickO=(right,pool)=>shuf([right,...shuf([...new Set(pool.filter(x=>x&&x!=right))]).slice(0,3)]);
if(a.d&&a.d.length>=4){const d=shuf(a.d)[0];Q.push([`When did this happen: ${d[1].replace(/\.$/,"")}?`,d[0],pickO(d[0],a.d.map(x=>x[0]))])}
const same=A.filter(x=>x.c==a.c&&x!=a).flatMap(x=>(x.g||[]).map(g=>g[0]));
shuf(a.g||[]).slice(0,2).forEach(g=>{const own=(a.g||[]).map(x=>x[0]).filter(x=>x!=g[0]);Q.push([`Which key word means “${g[1].replace(/\.$/,"")}”?`,g[0],own.length>=3?shuf([g[0],...shuf(own).slice(0,3)]):pickO(g[0],[...own,...same])])});
(a.k||[]).forEach(k=>{if(Q.length>=4)return;const pool=A.filter(x=>x!=a).flatMap(x=>(x.k||[]).filter(y=>y[0]==k[0]).map(y=>y[1]));if(pool.length>=3&&k[1].length<60)Q.push([`${a.t}: ${k[0]}?`,k[1],pickO(k[1],pool)])});
const qs=Q.filter(q=>q[2].length>=3).slice(0,4);if(qs.length<2)return;
const sa=$("#sa");if(!sa)return;const best=ls(QK,{})[a.id];
sa.insertAdjacentHTML("beforebegin",`<h3 id="ty">Test yourself</h3><div class="tyq">${qs.map((q,i)=>`<div class="tyi" data-i="${i}"><p><b>${i+1}.</b> ${esc(q[0])}</p>${q[2].map(o=>`<button class="opt sm2">${esc(o)}</button>`).join("")}</div>`).join("")}<p id="tys" class="mu" style="font:14px system-ui">${best!=null?`Your best score: ${best} of ${qs.length}. `:""}Questions are made from this article’s key dates, key words and facts. <a href="#/maze">More quizzes in Mind Maze</a></p></div>`);
let done=0,score=0;V.querySelectorAll(".tyi").forEach(el=>{const q=qs[+el.dataset.i];el.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(el.dataset.ok)return;el.dataset.ok=1;const ok=b.textContent==q[1];if(ok)score++;done++;el.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.textContent==q[1])x.classList.add("ok")});if(!ok)b.classList.add("bad");
if(done==qs.length){const B=ls(QK,{});B[a.id]=Math.max(B[a.id]||0,score);sv(QK,B);$("#tys").innerHTML=`<b>You scored ${score} of ${qs.length}.</b> ${score==qs.length?"Excellent!":"Read the article again and try once more."} <a href="#/maze">More quizzes in Mind Maze</a>`}})})}

/* ---------- Countries and regions ---------- */
const PROF=window.PROF||{},WORLD=window.WORLD||[],POP={};(typeof AT!="undefined"?AT:[]).forEach(r=>POP[r[0]]=r[4]);
const center=name=>{const w=WORLD.find(c=>c[0]==name);if(!w)return null;const n=w[1].match(/-?\d+(\.\d+)?/g).map(Number);let x0=999,x1=-999,y0=999,y1=-999;for(let i=0;i+1<n.length;i+=2){const x=n[i],y=n[i+1];if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}if(x1-x0>180)return[ (x0+x1)/2-180,90-(y0+y1)/2,180];return[(x0+x1)/2-180,90-(y0+y1)/2,Math.max(x1-x0,(y1-y0)*1.6)]};
const artFor=name=>{const n=name.toLowerCase();return A.find(a=>sortT(a.t).toLowerCase()==n)||(name=="Philippines"?get("ph"):null)};
R.countries=function(){window.setCat&&setCat(null);const L=Object.keys(PROF).sort((a,b)=>a.localeCompare(b));const by={};L.forEach(n=>{const r=PROF[n][1]||"Other";(by[r]=by[r]||[]).push(n)});
V.innerHTML=`<h2>Countries of the world</h2><p class="mu" style="font:14px system-ui">${L.length} country profiles, grouped by region, plus the <a href="#/regions">18 regions of the Philippines</a>. Select a country for its fact file and map, or use the <a href="#/atlas">Atlas</a>.</p>${Object.keys(by).sort().map(r=>`<h3>${esc(r)}</h3><div class="azmini">${by[r].map(n=>`<a href="#/country/${enc(n)}">${esc(n)}</a>`).join("")}</div>`).join("")}`};
R.country=function(n){const p=PROF[n];if(!p){R.countries();return}window.setCat&&setCat("Planet Earth");const c=center(n),art=artFor(n),pop=POP[n];
const facts=[["Capital",p[0]],["Region",p[2]?`${p[2]}, ${p[1]}`:p[1]],["Area",`about ${Number(p[3]).toLocaleString("en-US")} km²`],["Languages",p[4]],["Currency",p[5]],["Borders",p[6]?"Landlocked":"Has a coastline"],["Land neighbors",String(p[7])],...(pop?[["Population",`about ${pop} million`]]:[])];
V.innerHTML=`<div class="runhead"><a href="#/countries">Countries of the world</a><span></span><small>${esc(p[1])}</small></div><h2 class="atitle">${esc(n)}</h2><div class="row" style="margin-top:8px"><div class="body" style="flex:3 1 340px">
<p class="lead">${esc(n)} is a country in ${esc(p[2]||p[1])}${p[2]&&p[1]?`, part of ${esc(p[1])}`:""}. Its capital is ${esc(p[0])}, and it covers about ${Number(p[3]).toLocaleString("en-US")} square kilometers. ${p[6]?"It has no coastline.":"It has a coastline."} ${p[7]?`It shares land borders with ${p[7]} countr${p[7]==1?"y":"ies"}.`:"It has no land borders with other countries."}</p>
${c&&window.locSVG?`<figure class="ph fr locm"><div class="lochd">Where in the world</div>${locSVG([c[0],c[1],n,Math.min(Math.max(c[2]*2.4,14),120),n])}<figcaption><b>📍 ${esc(n)}</b></figcaption></figure>`:""}
<section class="panelx ffile" style="clear:none"><div class="hd">Fact file<span>${esc(n)}</span></div><dl class="in">${facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl></section>
${art?`<p><a class="btn" href="#/art/${art.id}">Read the full article: ${esc(art.t)} ›</a></p>`:""}<p class="mu" style="font:13px system-ui;clear:both">Country data from the encyclopedia’s atlas profiles; figures are approximate and change over time.</p></div></div>`};
R.regions=function(){window.setCat&&setCat("Countries and Places");const G={};(window.REGIONS||[]).forEach(r=>(G[r[3]]=G[r[3]]||[]).push(r));
V.innerHTML=`<div class="runhead"><a href="#/cat/The%20Philippines">The Philippines</a><span></span><small>${(window.REGIONS||[]).length} regions, ${(window.REGIONS||[]).reduce((s,r)=>s+(r[0]=="ncr"?0:r[6].length),0)} provinces</small></div><h2 class="atitle">Regions of the Philippines</h2><p class="lead">The Philippines is divided into 18 administrative regions, grouped into the three island groups of Luzon, the Visayas and Mindanao. Regions are made up of provinces, cities and municipalities, which are divided into barangays.</p>${["Luzon","Visayas","Mindanao"].map(g=>`<h3>${g}</h3><div class="regg">${(G[g]||[]).map(r=>`<a href="#/region/${r[0]}"><b>${esc(r[1])}</b><small>${esc(r[2])}${r[4]?" · "+esc(r[4]):""}</small></a>`).join("")}</div>`).join("")}`};
R.region=function(id){const r=(window.REGIONS||[]).find(x=>x[0]==id);if(!r){R.regions();return}window.setCat&&setCat("Countries and Places");const RA={ncr:"manila edsa bonifacio sora aluna fedelmundo lorenzoruiz salonga",car:"banaue baguio pulag",r1:"vigan marcos silang jluna",r3:"malolos pinatubo quezon magsaysay ninoy cory delpilar balagtas",r4a:"taal rizal mabini aguinaldo",mimaropa:"palawan",r5:"mayon",r6:"boracay",r7:"cebu bohol lapulapu",r9:"mindanao hidilyn",r10:"mindanao pacquiao",r11:"mindanao",r12:"mindanao",r13:"mindanao siargao",barmm:"mindanao sulu"};const rel=(RA[id]||"").split(" ").map(get).filter(Boolean);
V.innerHTML=`<div class="runhead"><a href="#/regions">Regions of the Philippines</a><span></span><small>${esc(r[3])}</small></div><h2 class="atitle">${esc(r[1])}</h2><p class="mu" style="font:14px system-ui;margin-top:-6px">${esc(r[2])}${r[4]?" · Regional center: "+esc(r[4]):""}</p><div class="row"><div class="body" style="flex:3 1 340px">
${window.locSVG?`<figure class="ph fr locm"><div class="lochd">Where in the Philippines</div>${locSVG([r[5][0],r[5][1],"Philippines",16,r[1]])}<figcaption><b>📍 ${esc(r[1])}</b></figcaption></figure>`:""}<p class="lead">${esc(r[7])}</p><h3>${r[0]=="ncr"?"Local governments":"Provinces"}</h3><ul>${r[6].map(p=>`<li>${esc(p)}</li>`).join("")}</ul>${rel.length?`<h3>Articles about places here</h3><div class="azmini">${rel.map(a=>`<a href="#/art/${a.id}">${esc(a.t)}</a>`).join("")}</div>`:""}</div></div>`};

/* ---------- The printable book ---------- */
const bookArt=a=>`<article class="bk-art" style="--cc:${col(a.c)[0]};--cl:${col(a.c)[1]}"><div class="bk-rh">${esc(a.c)}</div><h2>${esc(a.t)}</h2>${a.l?`<p class="lead">${esc(a.l)}</p>`:""}${(window.TL||{})[a.id]?`<p class="bk-tl"><b>Sa madaling salita.</b> ${esc(TL[a.id])}</p>`:""}${a.k&&a.k.length?`<table class="bk-kf">${a.k.map(k=>`<tr><th>${esc(k[0])}</th><td>${esc(k[1])}</td></tr>`).join("")}</table>`:""}${a.p.map((x,i)=>`<h3>${esc(x[0])}</h3><p>${esc(x[1])}</p>`+(i==5&&a.sp?`<aside class="spot"><b>${esc(a.sp[0])}.</b> ${esc(a.sp[1])}</aside>`:"")).join("")}${a.d&&a.d.length?`<h3>Key dates</h3><ul>${a.d.map(d=>`<li><b>${esc(d[0])}</b> ${esc(d[1])}</li>`).join("")}</ul>`:""}${a.g&&a.g.length?`<h3>Key words</h3><ul>${a.g.map(g=>`<li><b>${esc(g[0])}</b>: ${esc(g[1])}</li>`).join("")}</ul>`:""}</article>`;
R.book=function(sec){window.setCat&&setCat(null);const secs=Object.keys(CAT);
if(sec==null){V.innerHTML=`<h2>Print the encyclopedia</h2><p>Make a printable book of one section, or of the whole encyclopedia, with a cover, contents and every article in full. Choose a section, then select Print and pick Save as PDF to keep a copy.</p><div class="azmini">${secs.map(c=>`<a href="#/book/${enc(c)}">${esc(c)} (${A.filter(a=>a.c==c).length})</a>`).join("")}</div><p style="margin-top:14px"><a class="btn" href="#/book/all">The whole encyclopedia (${A.length} articles)</a></p><p class="mu" style="font:13px system-ui">The whole encyclopedia runs to well over a thousand printed pages.</p>`;return}
const list=sec=="all"?secs.flatMap(c=>A.filter(a=>a.c==c)):A.filter(a=>a.c==sec);if(!list.length){R.book();return}
V.innerHTML=`<div class="bk-bar"><a class="btn" href="#/book">‹ Back</a><button class="btn" id="bkp">🖨 Print or save as PDF</button><span class="mu" style="font:13px system-ui">${list.length} articles</span></div><div class="book"><section class="bk-cover"><small>Encyclopedia Premium · ${(window.ED||{}).label||"First edition"}</small><h1>${sec=="all"?"The Complete Encyclopedia":esc(sec)}</h1><p>${list.length} articles</p></section><section class="bk-toc"><h2>Contents</h2><ol>${list.map(a=>`<li>${esc(a.t)} <small>${esc(a.c)}</small></li>`).join("")}</ol></section>${list.map(bookArt).join("")}</div>`;
$("#bkp").onclick=()=>{document.body.classList.add("printing-book");print();setTimeout(()=>document.body.classList.remove("printing-book"),500)}};

/* ---------- Smarter search: suggestions and Did you mean ---------- */
const lev=(a,b)=>{if(Math.abs(a.length-b.length)>3)return 9;const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]==b[j-1]?0:1));if(i>1&&j>1&&a[i-1]==b[j-2]&&a[i-2]==b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1)}return d[a.length][b.length]};
let TERMS=null;const terms=()=>TERMS||(TERMS=[...A.map(a=>[sortT(a.t),"#/art/"+a.id,a.c]),...(window.SH||[]).map(e=>[e.t,"#/e/"+e.id,"A–Z"]),...Object.keys(PROF).map(n=>[n,"#/country/"+enc(n),"Country"])]);
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function suggest(q){q=norm(q.trim());if(q.length<2)return[];const T=terms(),r=[];T.forEach(t=>{const n=norm(t[0]);const i=n.indexOf(q);if(i==0)r.push([0,t]);else if(i>0&&n[i-1]==" ")r.push([1,t]);else if(i>0)r.push([2,t])});
if(r.length<3&&q.length>=4)T.forEach(t=>{const n=norm(t[0]),w=n.split(/\s+/);const d=Math.min(lev(q,n),...w.map(x=>lev(q,x)));if(d<=Math.max(1,Math.floor(q.length/4))&&!r.some(x=>x[1]==t))r.push([3+d,t])});
return r.sort((a,b)=>a[0]-b[0]||a[1][0].length-b[1][0].length).slice(0,7).map(x=>x[1])}
const q=$("#q");q.insertAdjacentHTML("afterend",`<div id="sug" class="sug" role="listbox" hidden></div>`);const sug=$("#sug");let si=-1;
const hide=()=>{sug.hidden=true;si=-1};
q.addEventListener("input",()=>{const L=suggest(q.value);if(!L.length){hide();return}sug.innerHTML=L.map((t,i)=>`<a href="${t[1]}" role="option" data-i="${i}"><b>${esc(t[0])}</b><small>${esc(t[2])}</small></a>`).join("");sug.hidden=false;si=-1;sug.style.left=q.offsetLeft+"px";sug.style.width=q.offsetWidth+"px";sug.style.top=(q.offsetTop+q.offsetHeight+6)+"px";sug.style.right="auto";sug.querySelectorAll("a").forEach(a=>a.addEventListener("mousedown",e=>{e.preventDefault();location.hash=a.getAttribute("href");q.value="";hide()}))});
q.addEventListener("keydown",e=>{const L=[...sug.querySelectorAll("a")];if(sug.hidden||!L.length)return;if(e.key=="ArrowDown"||e.key=="ArrowUp"){e.preventDefault();si=(si+(e.key=="ArrowDown"?1:-1)+L.length)%L.length;L.forEach((a,i)=>a.classList.toggle("on",i==si))}else if(e.key=="Enter"&&si>=0){e.preventDefault();location.hash=L[si].getAttribute("href");q.value="";hide()}else if(e.key=="Escape")hide()});
q.addEventListener("blur",()=>setTimeout(hide,150));addEventListener("hashchange",hide);
const os=R.search;R.search=function(x){os(x);const k=String(x||"").trim();if(k.length<4)return;const none=V.textContent.includes("No articles found");const L=suggest(k).filter(t=>norm(t[0])!=norm(k));if(none&&L.length){const h=V.querySelector("h2");h&&h.insertAdjacentHTML("afterend",`<p class="dym">Did you mean <a href="${L[0][1]}">${esc(L[0][0])}</a>?${L.length>1?` Or: ${L.slice(1,4).map(t=>`<a href="${t[1]}">${esc(t[0])}</a>`).join(", ")}`:""}</p>`)}};

/* ---------- Navigation ---------- */
const nv=$("#nv"),az=nv&&nv.querySelector('[data-v="az"]');az&&az.insertAdjacentHTML("afterend",`<button data-v="countries" onclick="go('countries')">Countries</button>`);
const ab=nv&&nv.querySelector('[data-v="about"]');ab&&ab.insertAdjacentHTML("beforebegin",`<button data-v="book" onclick="go('book')">Print book</button>`);
const oc=R.contents;R.contents=function(){oc();const fb=V.querySelector(".frontbar");fb&&fb.insertAdjacentHTML("beforeend",`<a class="btn" href="#/countries">Countries</a><a class="btn" href="#/regions">Regions of the Philippines</a><a class="btn" href="#/book">Print the encyclopedia</a>`)};
const ocat=R.cat;R.cat=function(c){ocat(c);if(c=="The Philippines"){const p=V.querySelector(".opener");p&&p.insertAdjacentHTML("afterend",`<p style="margin-top:12px"><a class="btn" href="#/regions">The 18 regions of the Philippines ›</a></p>`)}};
})();
