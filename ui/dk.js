/* Reference-book layout layer.
   Adds: category openers and colors, hero fact-file callouts, captioned photos through the text,
   scale comparisons, cutaway diagrams, picture timelines, See also, Further reading,
   the A to Z index, the glossary, the cover, contents and How to use pages, and print spreads.
   Loaded after the main script; it wraps the existing views instead of replacing them. */
(()=>{
const CI=window.CATINFO||{},SCALE=window.SCALE||{},CONS=window.CONS||{},DIAG=window.DIAG||{};
const ORDER=Object.keys(CAT),col=c=>CAT[c]||["#666","#999"],enc=encodeURIComponent;
const inCat=c=>A.filter(a=>a.c==c);
/* Book-style article numbers: section order, then the order articles appear within each section. */
const NUM={};let n=0;ORDER.forEach(c=>inCat(c).forEach(a=>NUM[a.id]=++n));
const words=t=>String(t||"").split(/\s+/).filter(Boolean).length;
const artWords=a=>words(a.l)+a.p.reduce((s,x)=>s+words(x[1]),0)+(a.sp?words(a.sp[1]):0);

/* ---------- Category color edge and side tab ---------- */
document.body.insertAdjacentHTML("beforeend",`<div class="edge" aria-hidden="true"></div><a class="tab" id="ctab" style="display:none"></a>`);
function setCat(c){const r=document.documentElement.style;if(c&&CAT[c]){r.setProperty("--cc",col(c)[0]);r.setProperty("--cl",col(c)[1]);const t=$("#ctab");t.textContent=c;t.href="#/cat/"+enc(c);t.style.display=innerWidth>900?"":"none"}else{r.removeProperty("--cc");r.removeProperty("--cl");$("#ctab").style.display="none"}}

window.setCat=setCat;
/* ---------- Icons for fact-file callouts ---------- */
const ICONS=[[/born/i,"🎂"],[/died|death/i,"🕯️"],[/capital/i,"🏛️"],[/population|followers|speakers|players/i,"👥"],[/area|size|largest/i,"📐"],[/length of (day|year)|orbit|new moon/i,"🔄"],[/lifespan/i,"⏳"],[/length|long|wingspan|arm span/i,"📏"],[/height|highest|tall|peak|elevation/i,"⛰️"],[/depth|deepest/i,"🌊"],[/diameter/i,"⭕"],[/distance/i,"🛰️"],[/orbit|day|year/i,"🔄"],[/moons?/i,"🌙"],[/lifespan|age|period|dates|began|founded|year|ended|invented/i,"⏳"],[/diet|food/i,"🍽️"],[/species|family|scientific/i,"🧬"],[/location|region|countries|province|place|habitat/i,"📍"],[/language|word|writing|origin|named/i,"🔤"],[/weight|mass|gravity/i,"⚖️"],[/status/i,"🛡️"],[/temperature/i,"🌡️"],[/novels?|books?|poems?|works|plays/i,"📚"],[/profession|job|occupation/i,"💼"],[/inventor|founder|proposed|key figures?|famous|artists/i,"👤"],[/symbol|motto|nickname/i,"🏷️"],[/heritage/i,"🏆"]];
const icon=l=>(ICONS.find(x=>x[0].test(l))||[0,"◆"])[1];
const IUCN=[["LC","Least Concern","#3d8b3d"],["NT","Near Threatened","#7aa83a"],["VU","Vulnerable","#d9a400"],["EN","Endangered","#e06a00"],["CR","Critically Endangered","#c8102e"],["EW","Extinct in the Wild","#6b2a7a"],["EX","Extinct","#222"]];

/* ---------- Similar articles for See also ---------- */
let SIM=null;const STOP=new Set("about after also among because been before being between both called could during each every first from have into its made many more most much only other over same some such than that their them then there these they this those through used very were what when where which while with would your years year world people".split(" "));
function buildSim(){const toks=a=>{const t=[];const add=(s,w)=>String(s||"").toLowerCase().replace(/[^a-zÀ-ɏ ]/g," ").split(/\s+/).forEach(x=>{if(x.length>3&&!STOP.has(x))for(let i=0;i<w;i++)t.push(x)});add(a.t,4);add(a.l,1);(a.g||[]).forEach(g=>add(g[0],3));a.p.forEach(p=>add(p[0],2));(a.k||[]).forEach(k=>add(k[1],1));return t};
const TF={},DF={};A.forEach(a=>{const m={};toks(a).forEach(w=>m[w]=(m[w]||0)+1);TF[a.id]=m;Object.keys(m).forEach(w=>DF[w]=(DF[w]||0)+1)});
const N=A.length,V2={};A.forEach(a=>{const v={};let s=0;for(const w in TF[a.id]){if(DF[w]<2)continue;const x=(1+Math.log(TF[a.id][w]))*Math.log(N/DF[w]);v[w]=x;s+=x*x}s=Math.sqrt(s)||1;for(const w in v)v[w]/=s;V2[a.id]=v});
SIM={};A.forEach(a=>{const va=V2[a.id];SIM[a.id]=A.filter(b=>b!=a).map(b=>{let d=0;const vb=V2[b.id];for(const w in va)if(vb[w])d+=va[w]*vb[w];return[b.id,d]}).sort((x,y)=>y[1]-x[1]).slice(0,8).map(x=>x[0])})}
const seeAlso=a=>{if(!SIM)buildSim();return[...new Set([...(a.r||[]),...SIM[a.id]])].filter(get).filter(i=>i!=a.id).slice(0,4).map(get)};

/* ---------- Further reading ---------- */
const MORE={"Science":[["NASA Science","https://science.nasa.gov"],["Khan Academy","https://www.khanacademy.org"]],"Space and Astronomy":[["NASA","https://www.nasa.gov"],["European Space Agency","https://www.esa.int"],["Philippine Space Agency","https://philsa.gov.ph"]],"Philippines":[["National Historical Commission of the Philippines","https://nhcp.gov.ph"],["Philippine Statistics Authority","https://psa.gov.ph"],["National Museum of the Philippines","https://www.nationalmuseum.gov.ph"]],"Geography":[["National Geographic Education","https://education.nationalgeographic.org"],["US Geological Survey","https://www.usgs.gov"],["PHIVOLCS","https://www.phivolcs.dost.gov.ph"]],"Health and the Body":[["World Health Organization","https://www.who.int"],["Department of Health","https://doh.gov.ph"],["MedlinePlus","https://medlineplus.gov"]],"Animals and Nature":[["IUCN Red List","https://www.iucnredlist.org"],["WWF","https://www.worldwildlife.org"]],"History":[["Smithsonian Institution","https://www.si.edu"],["UNESCO World Heritage","https://whc.unesco.org"]],"Technology":[["Computer History Museum","https://computerhistory.org"],["Science Museum, London","https://www.sciencemuseum.org.uk"]],"Arts and Literature":[["The Met: Heilbrunn Timeline of Art History","https://www.metmuseum.org/toah/"],["National Commission for Culture and the Arts","https://ncca.gov.ph"]],"Mathematics":[["MacTutor History of Mathematics","https://mathshistory.st-andrews.ac.uk"],["Khan Academy","https://www.khanacademy.org"]],"Religion and Philosophy":[["Stanford Encyclopedia of Philosophy","https://plato.stanford.edu"]],"Economics and Society":[["Bangko Sentral ng Pilipinas","https://www.bsp.gov.ph"],["Philippine Statistics Authority","https://psa.gov.ph"],["World Bank Open Data","https://data.worldbank.org"]],"Food and Agriculture":[["Food and Agriculture Organization","https://www.fao.org"],["International Rice Research Institute","https://www.irri.org"]],"Music":[["Smithsonian Folkways","https://folkways.si.edu"],["Cultural Center of the Philippines","https://culturalcenter.gov.ph"]],"Sports":[["Olympics.com","https://olympics.com"],["FIBA","https://www.fiba.basketball"]],"Languages":[["Ethnologue","https://www.ethnologue.com"],["Komisyon sa Wikang Filipino","https://kwf.gov.ph"],["Omniglot","https://www.omniglot.com"]],"History of Science":[["Science History Institute","https://www.sciencehistory.org"],["The Nobel Prize","https://www.nobelprize.org"],["MacTutor History of Mathematics","https://mathshistory.st-andrews.ac.uk"]]};
const further=a=>{const w=WIKI[a.id]||sortT(a.t);const L=[[`Wikipedia: ${w}`,"https://en.wikipedia.org/wiki/"+enc(w.replace(/ /g,"_"))],["Encyclopaedia Britannica","https://www.britannica.com/search?query="+enc(sortT(a.t))],...(MORE[a.oc]||MORE[a.c]||[])];
return `<div class="further" id="fr"><b class="disp">Further reading</b><p class="mu" style="font:13px system-ui;margin:.2em 0">Trusted places to check facts and read more about this topic. Last reviewed October 2026.</p><ul>${L.map(x=>`<li><a href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[0])}</a></li>`).join("")}</ul></div>`};

/* ---------- Captioned photos from the topic’s Wikipedia page ---------- */
const GK="gal1";let GC=ls(GK,{});
const strip=h=>{const d=document.createElement("div");d.innerHTML=String(h||"");return d.textContent.replace(/\s+/g," ").trim()};
const pretty=t=>t.replace(/^File:/,"").replace(/\.[a-z]+$/i,"").replace(/[_]+/g," ").replace(/\s*\(\d+\)$/,"").replace(/\b(IMG|DSC|DSCN|P)\s?\d+\b/gi,"").replace(/\s+/g," ").trim();
const JUNK=/\b(svg|icon|symbol|logo|flag|map|locator|seal|stub|edit|commons|wikidata|question|padlock|portal|disambig|coat of arms|signature|diagram|chart|graph)\b/i;
function gallery(a,cb){if(GC[a.id]!==undefined){cb(GC[a.id]||[]);return}
const t=WIKI[a.id]||sortT(a.t),lead=String(a.file||"").replace(/ /g,"_").toLowerCase();
fetch(WAPI+"&prop=images&imlimit=60&redirects=1&titles="+enc(t)).then(r=>r.json()).then(d=>{
const pg=Object.values((d.query||{}).pages||{})[0]||{};
const f=(pg.images||[]).map(x=>x.title).filter(x=>/\.(jpe?g|png)$/i.test(x)&&!JUNK.test(x)&&!BADIMG.test(x)&&x.replace(/^File:/,"").replace(/ /g,"_").toLowerCase()!=lead).slice(0,14);
if(!f.length){GC[a.id]=0;sv(GK,GC);cb([]);return}
return fetch(WAPI+"&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=600&iiextmetadatafilter=ImageDescription|ObjectName|Artist|LicenseShortName&titles="+enc(f.join("|"))).then(r=>r.json()).then(d=>{
const L=Object.values((d.query||{}).pages||{}).map(p=>{const ii=(p.imageinfo||[])[0];if(!ii||!ii.thumburl||(ii.width&&ii.width<400))return null;const m=ii.extmetadata||{},v=k=>strip((m[k]||{}).value);
return{u:ii.thumburl,p:ii.descriptionurl||"",n:cut(v("ObjectName")||pretty(p.title),70),d:cut(v("ImageDescription"),170),by:cut(v("Artist"),60),lic:v("LicenseShortName"),o:f.indexOf(p.title)}}).filter(Boolean).sort((x,y)=>x.o-y.o).slice(0,4);
GC[a.id]=L.length?L:0;sv(GK,GC);cb(L)})}).catch(()=>cb([]))}
const fig=(g,k)=>`<figure class="ph ${k%2?"fl":"fr"}"><img src="${esc(g.u)}" alt="${esc(g.n)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"><figcaption><b>${esc(g.n)}</b>${g.d&&g.d.toLowerCase()!=g.n.toLowerCase()?` ${esc(g.d)}`:""}<small>Photo${g.by?": "+esc(g.by):""}${g.lic?" · "+esc(g.lic):""} · <a href="${esc(g.p)}" target="_blank" rel="noopener">Wikimedia Commons</a></small></figcaption></figure>`;

/* ---------- Scale comparison (drawn to scale) ---------- */
const SHAPE={
person:(x,b,h)=>{return `<g transform="translate(${x},${b}) scale(${h/170})"><circle cx="0" cy="-158" r="12"/><path d="M-14,-144h28l8,60h-9l-6-42v58l6,68h-11l-6-62-6,62h-11l6-68v-58l-6,42h-9z"/></g>`},
mount:(x,b,h,w)=>`<path d="M${x-w/2},${b}L${x-w*.08},${b-h}L${x+w*.04},${b-h*.92}L${x+w/2},${b}Z"/>`,
tower:(x,b,h,w)=>`<path d="M${x-w/2},${b}L${x-w*.12},${b-h*.9}L${x},${b-h}L${x+w*.12},${b-h*.9}L${x+w/2},${b}Z"/>`,
pyramid:(x,b,h)=>`<path d="M${x-h*.79},${b}L${x},${b-h}L${x+h*.79},${b}Z"/>`,
block:(x,b,h,w)=>`<rect x="${x-w/2}" y="${b-h}" width="${w}" height="${h}" rx="3"/>`,
animal:(x,b,h,w)=>`<g><ellipse cx="${x}" cy="${b-h*.62}" rx="${w*.4}" ry="${h*.3}"/><rect x="${x-w*.3}" y="${b-h*.5}" width="${w*.1}" height="${h*.5}"/><rect x="${x+w*.2}" y="${b-h*.5}" width="${w*.1}" height="${h*.5}"/><circle cx="${x+w*.42}" cy="${b-h*.85}" r="${h*.15}"/></g>`,
bird:(x,b,h)=>`<g><ellipse cx="${x}" cy="${b-h*.5}" rx="${h*.22}" ry="${h*.47}"/><circle cx="${x}" cy="${b-h*.9}" r="${h*.12}"/></g>`,
fish:(x,y,l,t)=>`<path d="M${x},${y}C${x+l*.2},${y-t},${x+l*.75},${y-t},${x+l*.85},${y}L${x+l},${y-t*.8}L${x+l},${y+t*.8}L${x+l*.85},${y}C${x+l*.75},${y+t},${x+l*.2},${y+t},${x},${y}Z"/>`,
bus:(x,y,l,t)=>`<g><rect x="${x}" y="${y-t}" width="${l}" height="${t*2}" rx="${Math.min(4,t)}"/><circle cx="${x+l*.18}" cy="${y+t}" r="${t*.45}" fill="var(--sf)"/><circle cx="${x+l*.8}" cy="${y+t}" r="${t*.45}" fill="var(--sf)"/></g>`,
bar:(x,y,l,t)=>`<rect x="${x}" y="${y-t}" width="${l}" height="${t*2}" rx="${Math.min(t,6)}"/>`,
wing:(x,y,l,t)=>`<path d="M${x},${y}Q${x+l*.25},${y-t*2.2},${x+l*.5},${y-t*.3}Q${x+l*.75},${y-t*2.2},${x+l},${y}Q${x+l*.75},${y-t*.6},${x+l*.5},${y+t*.6}Q${x+l*.25},${y-t*.6},${x},${y}Z"/>`};
const PAL=["var(--cc)","#7a8796","var(--cl)","#b08a4a","#4f8a8b"];
function scaleSVG(s){const W=640,fmt=v=>v.toLocaleString("en-US");let g="";
if(s.dir=="h"){const B=200,mx=Math.max(...s.items.map(i=>i[1])),k=160/mx,slot=W/s.items.length;
s.items.forEach((it,i)=>{const h=Math.max(2,it[1]*k),x=slot*(i+.5),w=Math.min(slot*.8,Math.max(h*(it[2]=="mount"?1.6:it[2]=="block"||it[2]=="tower"?.35:.9),10));const f=it[3]||PAL[i%PAL.length];
g+=`<g fill="${f}">${(SHAPE[it[2]]||SHAPE.block)(x,B,h,w)}</g><text x="${x}" y="${B+18}" text-anchor="middle" font-weight="700">${esc(it[0])}</text><text x="${x}" y="${B+33}" text-anchor="middle" opacity=".75">${fmt(it[1])} ${esc(s.u)}</text>`});
return `<svg viewBox="0 0 ${W} 240" class="dg" role="img" aria-label="${esc(s.t)}"><line x1="0" y1="200" x2="${W}" y2="200" class="ln"/>${g}</svg>`}
if(s.dir=="w"){const mx=Math.max(...s.items.map(i=>i[1])),L=W-40,k=L/mx,H=s.items.length*56+10;
s.items.forEach((it,i)=>{const y=34+i*56,l=Math.max(3,it[1]*k),t=Math.max(3,Math.min(14,l*.12)),f=it[3]||PAL[i%PAL.length];
g+=`<text x="20" y="${y-18}" font-weight="700">${esc(it[0])} <tspan opacity=".75" font-weight="400">${fmt(it[1])} ${esc(s.u)}</tspan></text><g fill="${f}">${(SHAPE[it[2]]||SHAPE.bar)(20,y,l,t)}</g>`});
return `<svg viewBox="0 0 ${W} ${H}" class="dg" role="img" aria-label="${esc(s.t)}">${g}</svg>`}
const mx=Math.max(...s.items.map(i=>i[1])),R=110,B=240;let x=10;const r=s.items.map(i=>Math.max(1.5,R*i[1]/mx));const tot=r.reduce((a,b)=>a+2*b,0)+(r.length-1)*30,sc=tot>W-20?(W-20)/tot:1;x=(W-tot*sc)/2;
s.items.forEach((it,i)=>{const rr=r[i]*sc,cx=x+rr,f=it[3]||PAL[i%PAL.length];g+=`<circle cx="${cx}" cy="${B-rr-40}" r="${rr}" fill="${f}"/><text x="${cx}" y="${B-14}" text-anchor="middle" font-weight="700">${esc(it[0])}</text><text x="${cx}" y="${B+2}" text-anchor="middle" opacity=".75">${fmt(it[1])} ${esc(s.u)}</text>`;x+=2*rr+30*sc});
return `<svg viewBox="0 0 ${W} ${B+10}" class="dg" role="img" aria-label="${esc(s.t)}">${g}</svg>`}
const panel=(title,sub,body,cap)=>`<section class="panelx"><div class="hd">${esc(title)}${sub?`<span>${esc(sub)}</span>`:""}</div><div class="in">${body}${cap?`<p class="cap">${esc(cap)}</p>`:""}</div></section>`;

/* ---------- Picture timeline ---------- */
const tline=d=>`<ol class="tlx" id="kd" aria-label="Key dates">${d.map(x=>`<li><b>${esc(x[0])}</b><i></i><span>${esc(x[1])}</span></li>`).join("")}</ol>`;

/* ---------- Article page additions ---------- */
const origArt=R.art;
R.art=function(id){origArt(id);const a=get(id);if(!a)return;setCat(a.c);const tk=NAVT;
const h2=V.querySelector("h2");h2.classList.add("atitle");
h2.insertAdjacentHTML("beforebegin",`<div class="runhead"><a href="#/cat/${enc(a.c)}">${esc(a.c)}</a><span></span><small>No. ${NUM[id]} of ${A.length}</small></div>`);
/* Hero with fact-file callouts */
const bn=V.querySelector(".ban.big"),kf=V.querySelector(".kf");
if(bn&&a.k&&a.k.length){const k=a.k.slice(0,6),h=Math.ceil(k.length/2),cl=x=>`<div class="cl1"><i></i><b>${x[0]&&icon(x[0])?`<span class="ic">${icon(x[0])}</span>`:""}${esc(x[0])}</b>${esc(x[1])}</div>`;
const st=CONS[id]?(()=>{const c=CONS[id];return `<div class="status"><div class="iucn-l"><b>Conservation status</b> · ${esc(c[1])} (IUCN Red List)</div><div class="iucn">${IUCN.map(x=>`<span${x[0]==c[0]?` class="on" style="background:${x[2]}"`:""} title="${x[1]}">${x[0]}</span>`).join("")}</div><div class="iucn-l">${esc(IUCN.find(x=>x[0]==c[0])[1])}</div></div>`})():"";
const wrap=document.createElement("div");wrap.className="hero";wrap.innerHTML=`<div class="co l">${k.slice(0,h).map(cl).join("")}</div><div class="co r">${k.slice(h).map(cl).join("")}</div>${st}`;
bn.replaceWith(wrap);wrap.insertBefore(bn,wrap.children[1]);if(kf&&a.k.length<=6)kf.remove();else if(kf)kf.querySelector("h4").textContent="More facts",kf.querySelector("dl").innerHTML=a.k.slice(6).map(x=>`<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join("")}
{const row=V.querySelector(".row"),he=V.querySelector(".hero")||V.querySelector(".ban.big"),cr=$("#cr");if(row&&he){row.before(he);cr&&row.before(cr.parentNode)}}
/* Timeline */
const kd=V.querySelector("ol.kd");if(kd&&a.d&&a.d.length)kd.outerHTML=tline(a.d);
/* Feature panels */
const before=(i,html)=>{const h=document.getElementById("s"+i);if(h)h.insertAdjacentHTML("beforebegin",html);else{const b=V.querySelector(".body .pn");b&&b.insertAdjacentHTML("beforebegin",html)}};
const ff=(window.FACT||{})[id];if(ff){const ld=V.querySelector(".body .lead");const html=`<section class="panelx ffile"><div class="hd">Fact file<span>${esc(ff.n)}</span></div><dl class="in">${ff.f.map(x=>`<div><dt>${icon(x[0])} ${esc(x[0])}</dt><dd>${esc(x[1])}</dd></div>`).join("")}</dl></section>`;ld?ld.insertAdjacentHTML("afterend",html):before(0,html)}
const dg=DIAG[id];if(dg)before(2,panel(dg.t,"Diagram",dg.svg,dg.c));
const sc=SCALE[id];if(sc)before(4,panel(sc.t,"Drawn to scale",scaleSVG(sc),sc.c));
/* See also and Further reading */
V.querySelectorAll("h2").forEach(x=>{if(x.textContent=="Related articles"){const g=x.nextElementSibling;if(g&&g.classList.contains("grid"))g.remove();x.remove()}});
const sa=seeAlso(a),pn=V.querySelector(".body .pn");
pn.insertAdjacentHTML("beforebegin",`<h3 id="sa">See also</h3><div class="seealso">${sa.map(b=>`<a href="#/art/${b.id}">${ban(b)}<span>${esc(b.t)}<small>${esc(b.sub||b.c)}</small></span></a>`).join("")}</div>${further(a)}`);
want(sa);
const toc=V.querySelector(".toc");if(toc){const rel=[...toc.childNodes].findIndex(n=>n.nodeName=="BR");toc.querySelectorAll("a").forEach(x=>x.remove());toc.querySelector("br")&&toc.querySelector("br").remove();[...toc.querySelectorAll("b")].slice(1).forEach(x=>x.remove());toc.insertAdjacentHTML("beforeend",`<button class="lk" data-s="sa">See also</button><button class="lk" data-s="fr">Further reading</button>`);toc.querySelectorAll('[data-s="sa"],[data-s="fr"]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.s).scrollIntoView({behavior:"smooth"}))}
const hp=$("#hp");if(hp)hp.insertAdjacentHTML("afterend",`<button class="btn" id="pr" title="Print this article as a two-column spread">🖨 Print</button>`);$("#pr")&&($("#pr").onclick=()=>print());
/* Photos through the text */
gallery(a,L=>{if(tk!=NAVT||!L.length)return;const at=[1,5,9,13];L.forEach((g,k)=>{const h=document.getElementById("s"+at[k]);const p=h&&h.nextElementSibling;if(p)p.insertAdjacentHTML("beforebegin",fig(g,k))})});
if(window.JUMP){const j=window.JUMP;window.JUMP=null;setTimeout(()=>{const e=document.getElementById(j);e&&e.scrollIntoView({block:"start"})},30)}};

/* ---------- Category opener ---------- */
R.cat=function(c){if(!CAT[c]){R.contents();return}setCat(c);const L=inCat(c),I=CI[c]||{},f=(I.feat||[]).map(get).filter(Boolean),ic=(f[0]||L[0]).i,w=L.reduce((s,a)=>s+artWords(a),0),G=L.flatMap(a=>(a.g||[]).map(g=>[g,a])),pick=shuf(G).slice(0,8);
V.innerHTML=`<section class="opener"><div class="big-ic" aria-hidden="true">${ic}</div><small>Section ${ORDER.indexOf(c)+1} of ${ORDER.length}</small><h2>${esc(c)}</h2><p class="tg">${esc(I.tag||"")}</p><p>${esc(I.intro||"")}</p><div class="st"><div><b>${L.length}</b>articles</div><div><b>${Math.round(w/1000)}k</b>words</div><div><b>${G.length}</b>key words</div><div><b>${NUM[L[0].id]}–${NUM[L.at(-1).id]}</b>article numbers</div></div></section>
${f.length?`<h2>Start here</h2><div class="featrow">${f.map(a=>`<a class="card" href="#/art/${a.id}">${ban(a)}<div class="t"><b>${esc(a.t)}</b><br>${esc(cut(a.l||"",120))}</div></a>`).join("")}</div>`:""}
<h2>In this section</h2><ol class="numlist">${L.map(a=>`<li><em>${NUM[a.id]}</em><a href="#/art/${a.id}">${esc(a.t)}</a></li>`).join("")}</ol>
<h2>Key words from this section</h2><div class="glx">${pick.map(([g,a])=>`<div style="--c:${col(c)[1]}"><dt>${esc(g[0])}</dt><dd>${esc(g[1])}</dd><a href="#/art/${a.id}">${esc(a.t)}</a></div>`).join("")}</div>
<p><a class="btn" href="#/gloss/${enc(c)}">All ${G.length} key words in ${esc(c)}</a><a class="btn" href="#/browse/${enc(c)}">Browse with filters</a>${ORDER[ORDER.indexOf(c)+1]?`<a class="btn" href="#/cat/${enc(ORDER[ORDER.indexOf(c)+1])}">Next section: ${esc(ORDER[ORDER.indexOf(c)+1])} ›</a>`:""}</p>`;
want(f)};

/* ---------- A to Z index ---------- */
let IX=null;function buildIx(){IX=[];const seen=new Set();const add=(t,id,j,ty)=>{t=sortT(t);t=t[0].toUpperCase()+t.slice(1);const k=t.toLowerCase()+"|"+id;if(seen.has(k))return;seen.add(k);IX.push([t,id,j,ty])};(window.SH||[]).forEach(e=>add(e.t,e.id,"","Entry"));A.forEach(a=>{add(a.t,a.id,"","Article");(a.g||[]).forEach(g=>add(g[0],a.id,"gl","Key word"));a.p.forEach((p,i)=>add(p[0],a.id,"s"+i,"Section"))});IX.sort((x,y)=>x[0].localeCompare(y[0],"en",{sensitivity:"base"}))}
const L1=s=>{const c=s.normalize("NFD").replace(/[̀-ͯ]/g,"")[0].toUpperCase();return /[A-Z]/.test(c)?c:"#"},AZ=["#",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const bindJump=()=>V.querySelectorAll("[data-j]").forEach(x=>x.onclick=()=>{window.JUMP=x.dataset.j||null});
R.index=function(l){if(!IX)buildIx();const has=new Set(IX.map(x=>L1(x[0])));l=l&&has.has(l)?l:"A";
V.innerHTML=`<h2>Index</h2><p class="mu" style="font:14px system-ui">${IX.length.toLocaleString()} entries: every article, every quick-reference A–Z entry, every section heading and every key word, with the article number they appear in.</p><input type="search" id="ixq" placeholder="Find in the index" aria-label="Find in the index" style="width:100%;max-width:420px"><div class="letters">${AZ.map(c=>`<button data-l="${c}"${has.has(c)?"":" disabled"}${c==l?' class="on"':""}>${c}</button>`).join("")}</div><div id="ixb"></div>`;
const show=(lt,q)=>{const r=q?IX.filter(x=>x[0].toLowerCase().includes(q)):IX.filter(x=>L1(x[0])==lt);$("#ixb").innerHTML=`<div class="ixl">${r.slice(0,1500).map(x=>{const a=get(x[1]);if(x[3]=="Entry")return `<div><a href="#/e/${x[1]}">${esc(x[0])}</a><span class="ty">A–Z</span></div>`;return `<div><a href="#/art/${x[1]}" data-j="${x[2]}">${esc(x[0])}</a>${x[3]!="Article"?`<span class="ty">${x[3]}</span><small>in ${esc(a.t)}</small>`:""}<small>${NUM[x[1]]}</small></div>`}).join("")||"<p>No entries.</p>"}</div>`;bindJump()};
V.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{V.querySelectorAll("[data-l]").forEach(x=>x.classList.toggle("on",x==b));$("#ixq").value="";history.replaceState(null,"","#/index/"+b.dataset.l);show(b.dataset.l)});
$("#ixq").oninput=e=>{const q=e.target.value.trim().toLowerCase();show(l,q)};show(l)};

/* ---------- Glossary ---------- */
R.gloss=function(c){if(c&&!CAT[c])c="";const G=A.filter(a=>!c||a.c==c).flatMap(a=>(a.g||[]).map(g=>[g[0],g[1],a])).sort((x,y)=>x[0].localeCompare(y[0],"en",{sensitivity:"base"}));if(c)setCat(c);
V.innerHTML=`<h2>Glossary${c?": "+esc(c):""}</h2><p class="mu" style="font:14px system-ui">${G.length.toLocaleString()} key words collected from ${c?"the "+esc(c)+" section":"every article"}, each with the article it comes from.</p><div class="chips">${["",...ORDER].map(k=>`<a class="chip${k==(c||"")?" on":""}" style="--c:${k?col(k)[1]:"var(--g)"};text-decoration:none" href="#/gloss${k?"/"+enc(k):""}">${k?"<i></i>":""}${k||"All"}</a>`).join("")}</div><input type="search" id="gq" placeholder="Find a word" aria-label="Find a word" style="width:100%;max-width:420px;margin:6px 0 10px"><div id="gb"></div>`;
const show=q=>{const r=q?G.filter(x=>(x[0]+" "+x[1]).toLowerCase().includes(q)):G;let lt="";$("#gb").innerHTML=r.length?r.map(x=>{const h=L1(x[0])!=lt&&!q?`<h3 style="grid-column:1/-1;margin:.6em 0 0">${lt=L1(x[0])}</h3>`:"";return h+`<div style="--c:${col(x[2].c)[1]}"><dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd><a href="#/art/${x[2].id}" data-j="gl">${esc(x[2].t)}</a></div>`}).join(""):"<p>No words found.</p>";$("#gb").className="glx";bindJump()};
$("#gq").oninput=e=>show(e.target.value.trim().toLowerCase());show("")};

/* ---------- Front matter ---------- */
const total=()=>A.reduce((s,a)=>s+artWords(a),0);
R.cover=function(){const t=total();V.innerHTML=`<div class="cover"><div class="mast"><small>The illustrated reference</small><h2>Encyclopedia Premium</h2><p>${A.length} articles · ${ORDER.length} sections · about ${Math.round(t/1000)},000 words</p></div>${ORDER.map(c=>{const f=(CI[c]&&CI[c].feat||[])[0],a=get(f)||inCat(c)[0];return `<a class="tile" href="#/cat/${enc(c)}" title="${esc(c)}">${ban(a)}<span>${esc(c)}</span></a>`}).join("")}<a class="tile" href="#/contents" style="background:#2a2a2a;font:800 15px var(--disp);letter-spacing:.08em">CONTENTS ›</a></div>
<div class="frontbar"><a class="btn" href="#/contents">Contents</a><a class="btn" href="#/howto">How to use this encyclopedia</a><a class="btn" href="#/index">Index</a><a class="btn" href="#/gloss">Glossary</a><a class="btn" href="#/home">Today’s front page</a></div>`;want(ORDER.map(c=>get((CI[c]&&CI[c].feat||[])[0])||inCat(c)[0]))};
R.contents=function(){V.innerHTML=`<h2>Contents</h2><p class="mu" style="font:14px system-ui">${ORDER.length} sections, ${A.length} numbered articles. Select a section title for its opening page.</p><div class="frontbar"><a class="btn" href="#/howto">How to use this encyclopedia</a><a class="btn" href="#/index">Index</a><a class="btn" href="#/gloss">Glossary</a></div><div class="contents">${ORDER.map((c,i)=>`<h3 style="--c:${col(c)[0]}"><em>${String(i+1).padStart(2,"0")}</em><a href="#/cat/${enc(c)}">${esc(c)}</a><small style="margin-left:auto">${esc((CI[c]||{}).tag||"")}</small></h3><ol>${inCat(c).map(a=>`<li><a href="#/art/${a.id}">${esc(a.t)}</a><span>${NUM[a.id]}</span></li>`).join("")}</ol>`).join("")}</div>`};
R.howto=function(){const P=[["Running head","Where you are: Contents, then the subject and sub-section, each a link, with the article number on the right. The colored edge and side tab match the subject."],["Title and photo","The main photo with fact-file callouts around it. Animal articles also show their conservation status."],["Opening summary","The first paragraph sums up the whole topic. It begins with a large initial letter."],["Sections","Most articles have 14 sections, and biographies have 10. Use Contents beside the text to jump between them. Names of other topics in the text are links."],["Photos with captions","Extra photos from Wikimedia Commons appear through the text, each with a caption and credit."],["Diagrams and scale","Some topics have a labeled cutaway diagram or a drawing comparing sizes to scale."],["Spotlight","A box telling one story in more detail."],["Key dates","A timeline of the most important moments."],["Key words","Important words explained. All of them are collected in the Glossary."],["Did you know?","Surprising facts about the topic."],["See also and Up next","Related articles, then the next article in the same sub-section, so you can read a sub-section from start to finish."],["Further reading","Trusted websites for checking facts and learning more."]];
const blk=(n,t,s)=>`<div class="blk" style="${s}"><span class="n">${n}</span>${t}</div>`;
V.innerHTML=`<h2>How to use this encyclopedia</h2><p>Every article follows the same plan, so you always know where to look. This page shows how an article is laid out.</p><div class="howto"><div class="mock" style="--cc:#1e5fbf;--cl:#7fbcff">${blk(1,"SPACE › STARS AND GALAXIES ──── No. 63","color:var(--cc);border-bottom:2px solid var(--cl)")}${blk(2,"Title, photo and fact-file callouts","background:linear-gradient(135deg,#1e5fbf,#7fbcff);color:#fff;height:110px")}${blk(3,"Opening summary","background:var(--sf2)")}${blk(4,"Sections","border-top:4px solid var(--cl)")}${blk(5,"Captioned photos","background:var(--sf2);width:55%;margin-left:auto")}${blk(6,"Diagram or scale drawing","border:1px solid var(--bd)")}${blk(7,"Spotlight","border-left:5px solid var(--cl);background:var(--sf2)")}${blk(8,"Key dates ●──●──●","color:var(--cc)")}${blk(9,"Key words","background:var(--sf2)")}${blk(10,"Did you know?","background:linear-gradient(135deg,var(--f1),var(--f2));color:var(--fx)")}${blk(11,"See also ▢ ▢ ▢ ▢","")}${blk(12,"Further reading","border-top:1px solid var(--bd)")}</div><ol class="hl">${P.map((x,i)=>`<li><span class="n">${i+1}</span><span><b>${x[0]}${/[?.]$/.test(x[0])?"":"."}</b> ${x[1]}</span></li>`).join("")}</ol></div>
<h3>Finding things</h3><p>Use the search box at the top to search every article, the quick-reference A–Z entries and the dictionary. The <a href="#/az">Quick reference A–Z</a> has short entries on hundreds more topics. The <a href="#/contents">Contents</a> lists every article by section and number. The <a href="#/index">Index</a> lists every article, section heading and key word from A to Z, and the <a href="#/gloss">Glossary</a> explains every key word.</p><h3>Printing</h3><p>Select Print on any article to print it as a two-column spread on landscape pages.</p>`};

/* ---------- Navigation and links ---------- */
const nv=$("#nv");nv.innerHTML=[["cover","Cover"],["home","Home"],["contents","Contents"],["browse","Articles"],["index","Index"],["gloss","Glossary"],["atlas","Atlas"],["time","Timeline"],["maze","Mind Maze"],["dict","Dictionary"],["chal","Capitals"],["notes","Notes"],["saved","My Library"],["hist","Reading history"],["howto","How to use"]].map(t=>`<button data-v="${t[0]}" onclick="go('${t[0]}')">${t[1]}</button>`).join("");
const origHome=R.home;R.home=function(x){origHome(x);V.querySelectorAll('a.chip[href^="#/browse/"]').forEach(a=>a.href=a.getAttribute("href").replace("#/browse/","#/cat/"));V.insertAdjacentHTML("afterbegin",`<div class="frontbar" style="margin-top:0"><a class="btn sm" href="#/cover">📕 Cover</a><a class="btn sm" href="#/contents">Contents</a><a class="btn sm" href="#/index">Index</a><a class="btn sm" href="#/gloss">Glossary</a><a class="btn sm" href="#/howto">How to use</a></div>`)};
/* Reset the category color on every other page */
Object.keys(R).forEach(k=>{if(["art","cat","gloss"].includes(k))return;const f=R[k];R[k]=function(...x){setCat(null);return f.apply(this,x)}});
const og=R.gloss;R.gloss=function(c){setCat(null);og(c)};
addEventListener("resize",()=>{const t=$("#ctab");if(t.textContent&&document.documentElement.style.getPropertyValue("--cc"))t.style.display=innerWidth>900?"":"none"});
})();
