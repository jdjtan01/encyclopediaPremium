/* Countries: shared country helpers (window.CUI), the Countries of the world page (#/countries),
   country fact files (#/country/<name>) and the Flag quiz (#/flags). Data: data/countries.js (window.CTRY).
   Loaded after ui/more.js (whose country views it replaces) and before ui/atlas.js (which uses CUI). */
(()=>{
const D=window.CTRY||{},W=window.WORLD||[],PROF=window.PROF||{},enc=encodeURIComponent;
const ATD={};(typeof AT!="undefined"?AT:[]).forEach(r=>ATD[r[0]]=r);
/* Continents, in a fixed order, each with its own colour (CSS variables --k-<key>, light and dark steps in ui/countries.css) */
const CONT=[["Asia","asia"],["Africa","africa"],["Europe","europe"],["North America","nam"],["South America","sam"],["Oceania","oceania"],["Antarctica","ant"]];
const ck=c=>(CONT.find(x=>x[0]==c)||[0,"none"])[1];
const kv=c=>`var(--k-${ck(c)})`;
/* The atlas map (data/atlasmap.js): rows [name, outline 1:110m, outline 1:50m, box, label point, area, minor] */
const MAP=window.WMAP||{C:[],W:1000,H:520,cut:460},MC=MAP.C,MI={};MC.forEach((c,i)=>MI[c[0]]=i);
const idx=n=>n in MI?MI[n]:-1;
const BB=MC.map(c=>c[3]);
const bbOf=n=>{const i=idx(n);return i<0?null:BB[i]};
/* A small map of a country: whole world (world=true) or its surroundings, with the country picked out */
function loc(n,world){const i=idx(n);if(i<0)return"";const r=MC[i],b=r[3];let x,y,w,h;
if(world){x=0;y=0;w=MAP.W;h=MAP.cut}else{const bw=b[2]-b[0],bh=b[3]-b[1];w=Math.min(MAP.W,Math.max(bw*2.6,bh*2.6*1.6,140));h=w/1.6;x=(b[0]+b[2])/2-w/2;y=(b[1]+b[3])/2-h/2;const mx=(b[0]+b[2])/2;if(mx>MAP.W*.04&&mx<MAP.W*.96)x=Math.max(0,Math.min(MAP.W-w,x));y=Math.max(0,Math.min(MAP.cut-h,y))}
const detail=w<300,pick=c=>detail?c[2]:(c[1]||c[2]),inv=c=>{const q=c[3];return q[2]>=x-20&&q[0]<=x+w+20&&q[3]>=y-20&&q[1]<=y+h+20};
const small=Math.max(b[2]-b[0],b[3]-b[1])<w/45,sw=w/400;
return `<svg viewBox="${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" class="cloc${world?" world":""}" role="img" aria-label="Map showing where ${esc(disp(n))} is"><defs><clipPath id="cl${i}${world?"w":""}"><path d="${MAP.sphere}"/></clipPath></defs><path d="${MAP.sphere}" class="oc"/><g clip-path="url(#cl${i}${world?"w":""})"><path d="${MAP.grat}" class="gr" stroke-width="${sw*.6}"/>${world?`<path d="${MAP.land}" class="ld"/>`:`<g class="ld" stroke-width="${sw}">${MC.filter(c=>c!==r&&!c[6]&&inv(c)).map(c=>`<path d="${pick(c)}"/>`).join("")}</g>`}<path d="${pick(r)}" class="hl" style="--k:${kv((D[n]||{}).ct)}" stroke-width="${sw}"/>${small||world?`<circle cx="${r[4][0]}" cy="${r[4][1]}" r="${(world?w/38:w/40).toFixed(2)}" class="mk" stroke-width="${(world?w/220:w/160).toFixed(2)}"/>`:""}</g><path d="${MAP.sphere}" class="rim" stroke-width="${sw}"/></svg>`}
const fmt=v=>Number(v).toLocaleString("en-US");
const km=a=>(a<10?String(+a.toFixed(2)):fmt(Math.round(a)))+" km²";
const people=v=>v>=1e9?(v/1e9).toFixed(2).replace(/0$/,"")+" billion":v>=1e6?(v/1e6).toFixed(v>=1e8?0:1).replace(/\.0$/,"")+" million":fmt(Math.round(v/(v>=1e4?100:1))*(v>=1e4?100:1));
const usd=v=>v>=1e12?"US$"+(v/1e12).toFixed(2).replace(/0$/,"")+" trillion":v>=1e9?"US$"+(v/1e9).toFixed(v>=1e11?0:1).replace(/\.0$/,"")+" billion":"US$"+(v/1e6).toFixed(0)+" million";
const pop=n=>D[n]&&D[n].pop?D[n].pop[1]:(ATD[n]?ATD[n][4]*1e6:null);
const area=n=>D[n]&&D[n].area?D[n].area:(PROF[n]?PROF[n][3]:null);
const dens=n=>{const p=pop(n),a=area(n);return p&&a?p/a:null};
const gpc=n=>D[n]&&D[n].gpc||null;
const capOf=n=>D[n]&&D[n].cap&&D[n].cap.length?D[n].cap.join(", "):(ATD[n]?ATD[n][3]:PROF[n]?PROF[n][0]:"");
const flag=(n,cls)=>{const d=D[n];return d&&d.flag?`<img class="flag ${cls||""}" src="flags/${d.flag}.svg" alt="" loading="lazy" decoding="async">`:`<span class="flag noflag ${cls||""}" aria-hidden="true"></span>`};
const names=Object.keys(D).sort((a,b)=>sortName(a).localeCompare(sortName(b)));
function sortName(n){return (D[n]&&D[n].n||n).replace(/^The /,"")}
const disp=n=>D[n]&&D[n].n||n;
/* World rank among the places in the atlas */
const rankBy=f=>{const L=names.filter(n=>D[n].i3&&f(n)).sort((a,b)=>f(b)-f(a));const o={};L.forEach((n,i)=>o[n]=[i+1,L.length]);return o};
let RK=null;const ranks=()=>RK||(RK={pop:rankBy(pop),area:rankBy(area),gpc:rankBy(gpc),dens:rankBy(dens)});
const ord=i=>i+(["th","st","nd","rd"][(i%100-20)%10]||["th","st","nd","rd"][i%100]||"th");
const artFor=n=>{const k=disp(n).replace(/^The /,"").toLowerCase(),k2=n.toLowerCase();return A.find(a=>{const t=sortT(a.t).toLowerCase();return t==k||t==k2})||(n=="Philippines"?get("ph"):null)};
const prof=n=>{const d=D[n]||{},p=PROF[n];return{
cont:d.ct||(p?p[1]:""),sub:d.sub||(p?p[2]:""),lang:d.lang&&d.lang.length?d.lang.join(", "):(p?p[4]:""),
cur:d.cur&&d.cur.length?d.cur.map(c=>`${c[0]}${c[1]?` (${c[1]})`:""}`).join("; "):(p?p[5]:""),land:d.i3?d.land:(p?!!p[6]:null),bord:d.bord||[]}};
/* Comparing two countries: a sentence and a pair of bars for each measure */
const cmpRows=(n,o)=>[["Area",area,v=>km(v)],["Population",pop,v=>people(v)],["GDP per person",gpc,v=>"US$"+fmt(v)]].map(([lab,f,show])=>{const a=f(n),b=f(o);if(!a||!b)return"";const r=a/b,mx=Math.max(a,b),w=v=>Math.max(1.5,v/mx*100).toFixed(1);
const t=r>1?`${r<10?r.toFixed(1).replace(/\.0$/,""):fmt(Math.round(r))} times`:`${r<.01?"less than 1":Math.round(r*100)}% of`;
return `<div class="cmp"><b>${lab}</b><div class="cbar"><span style="width:${w(a)}%;--k:${kv(D[n].ct)}"></span><em>${esc(disp(n))} · ${show(a)}</em></div><div class="cbar"><span style="width:${w(b)}%;--k:${kv(D[o].ct)}"></span><em>${esc(disp(o))} · ${show(b)}</em></div><small>${r>=.9&&r<=1.1?`About the same ${lab.toLowerCase()} as ${esc(disp(o))}.`:`${esc(disp(n))} has ${t} the ${lab=="GDP per person"?"GDP per person":lab.toLowerCase()} of ${esc(disp(o))}.`}</small></div>`}).join("");
let WT=null;const world=()=>WT||(WT={pop:names.filter(x=>D[x].i3).reduce((s,x)=>s+(pop(x)||0),0),area:names.reduce((s,x)=>s+(area(x)||0),0)});
const share=v=>v>=1?v.toFixed(v<10?1:0)+"%":v>=.1?v.toFixed(1)+"%":v>=.01?v.toFixed(2)+"%":"less than 0.01%";
window.CUI={km,D,CONT,ck,kv,idx,BB,bbOf,loc,MAP,fmt,people,usd,pop,area,dens,gpc,capOf,flag,names,disp,ranks,ord,artFor,prof};

/* ---------- Countries of the world ---------- */
const VK="ctryView";
R.countries=function(){window.setCat&&setCat(null);let st={c:"",s:"az",q:""};try{st=Object.assign(st,JSON.parse(localStorage.getItem(VK)||"{}"))}catch(e){}
const cnt=c=>names.filter(n=>D[n].ct==c).length;
V.innerHTML=`<h2>Countries of the world</h2><p class="mu" style="font:14px system-ui">${names.length} countries and territories with flags and fact files, colour-coded by continent. See them on the <a href="#/atlas">Atlas</a>, test yourself with the <a href="#/flags">Flag quiz</a>.</p>
<div class="cfilt"><div class="cchips" role="group" aria-label="Continent"><button data-c="" class="on">All <small>${names.length}</small></button>${CONT.map(c=>`<button data-c="${c[0]}" style="--k:var(--k-${c[1]})"><i></i>${c[0]} <small>${cnt(c[0])}</small></button>`).join("")}</div>
<div class="crow"><input type="search" id="cq" placeholder="Find a country or capital" aria-label="Find a country or capital"><label class="csort">Sort by <select id="cs"><option value="az">Name</option><option value="pop">Population</option><option value="area">Area</option><option value="dens">Population density</option><option value="gpc">GDP per person</option></select></label></div></div><div id="cl"></div>
<p class="mu csrc">Population: World Bank (latest year to 2024). GDP: World Bank, current US dollars. Names, capitals, languages and areas: the open world-countries dataset. Figures are rounded and change over time.</p>`;
const M={pop:[pop,v=>people(v)+" people"],area:[area,km],dens:[dens,v=>fmt(Math.round(v))+" people per km²"],gpc:[gpc,v=>"US$"+fmt(v)+" per person"]};
const card=(n,i,m)=>`<a class="ccard" href="#/country/${enc(n)}" style="--k:${kv(D[n].ct)}">${flag(n)}<span><b>${m?`<em>${i+1}</em> `:""}${esc(disp(n))}</b><small>${m?esc(M[m][1](M[m][0](n))):esc(capOf(n)||D[n].sub||"")}</small></span></a>`;
const draw=()=>{try{localStorage.setItem(VK,JSON.stringify({c:st.c,s:st.s}))}catch(e){}
V.querySelectorAll(".cchips button").forEach(b=>b.classList.toggle("on",b.dataset.c==st.c));$("#cs").value=st.s;
const q=st.q.trim().toLowerCase();let L=names.filter(n=>(!st.c||D[n].ct==st.c)&&(!q||disp(n).toLowerCase().includes(q)||n.toLowerCase().includes(q)||capOf(n).toLowerCase().includes(q)));
if(st.s=="az"){const G=st.c?[st.c]:CONT.map(c=>c[0]);$("#cl").innerHTML=G.map(g=>{const l=L.filter(n=>D[n].ct==g);return l.length?`<h3 class="chd" style="--k:${kv(g)}"><i></i>${g}<small>${l.length}</small></h3><div class="cgrid">${l.map(n=>card(n)).join("")}</div>`:""}).join("")||`<p class="mu">No countries match.</p>`}
else{const f=M[st.s][0];const l=L.filter(n=>f(n)).sort((a,b)=>f(b)-f(a));$("#cl").innerHTML=l.length?`<div class="cgrid ranked">${l.map((n,i)=>card(n,i,st.s)).join("")}</div>`:`<p class="mu">No countries match.</p>`}};
V.querySelectorAll(".cchips button").forEach(b=>b.onclick=()=>{st.c=b.dataset.c;draw()});$("#cs").onchange=e=>{st.s=e.target.value;draw()};$("#cq").oninput=e=>{st.q=e.target.value;draw()};draw();document.title="Countries of the world · Encyclopedia Premium"};

/* ---------- Country fact file ---------- */
R.country=function(n){n=decodeURIComponent(n||"");if(!D[n]&&!PROF[n]){const k=names.find(x=>disp(x).toLowerCase()==n.toLowerCase());if(k)n=k;else{R.countries();return}}
window.setCat&&setCat("Countries and Places");const d=D[n]||{},p=prof(n),P=pop(n),Ar=area(n),De=dens(n),G=gpc(n),rk=ranks(),art=artFor(n),b=bbOf(n),nm=disp(n),cap=capOf(n),f=ATD[n];
const sameC=names.filter(x=>D[x].ct==p.cont),k=sameC.indexOf(n),prev=sameC[k-1],next=sameC[k+1];
const tile=(lab,val,sub)=>val?`<div class="cstat"><small>${lab}</small><b>${val}</b>${sub?`<em>${sub}</em>`:""}</div>`:"";
const rkTxt=(o)=>o?`${ord(o[0])} of ${o[1]}`:"";
const facts=[["Official name",d.off&&d.off!=nm?d.off:""],["Status",d.sov?d.sov.charAt(0).toUpperCase()+d.sov.slice(1):""],[d.cap&&d.cap.length>1?"Capitals":"Capital",cap],["Continent",p.cont],["Region",p.sub!=p.cont?p.sub:""],["Languages",p.lang],["Currency",p.cur],["People are called",d.dem?d.dem+(d.dem.endsWith("s")?"":"s"):""],["Time",d.tz],["Calling code",d.call],["Internet domain",d.tld],["Coastline",p.land==null?"":p.land?"None (landlocked)":"Yes"],["ISO code",d.i2?`${d.i2} / ${d.i3}`:""],["United Nations",d.i3?(d.un?"Member state":n=="Taiwan"||n=="Kosovo"?"Not a member":d.ind?"Not a member":"Not a member; a dependent territory"):""]].filter(x=>x[1]);
let lead;if(d.note)lead=`${esc(d.note)}`;else{const where=`${esc(p.sub||p.cont)}${p.sub&&p.cont&&!p.sub.includes(p.cont)?`, part of ${esc(p.cont)}`:""}`;lead=d.sov?`${esc(nm)} is ${esc(d.sov)}. It lies in ${where}.`:`${esc(nm)} is ${p.cont=="Antarctica"?"a continent":d.ind===false?"a territory":"a country"} in ${where}.`;if(cap)lead+=` Its capital ${d.cap&&d.cap.length>1?"cities are":"is"} ${esc(cap)}.`;if(P)lead+=` About ${people(P)} people live there${p.land?", and it has no coastline":""}.`;else if(p.land)lead+=" It has no coastline.";
if(p.bord.length)lead+=` It shares land borders with ${p.bord.length==1?esc(p.bord[0]):p.bord.length+" countries"}.`;else if(d.i3&&p.cont!="Antarctica")lead+=" It has no land borders with other countries.";}
const lc=b&&p.cont!="Antarctica"?loc(n):"";
let cw="";try{cw=localStorage.getItem("cmpWith")||""}catch(e){}if(cw==n||!D[cw])cw="";const W0=world();
V.innerHTML=`<div class="runhead crumbs"><nav><a href="#/countries">Countries of the world</a><i>›</i><a href="#/countries" data-c="${esc(p.cont)}" class="ccrumb">${esc(p.cont||"World")}</a></nav><span></span><small>${d.i3||""}</small></div>
<header class="chead" style="--k:${kv(p.cont)}">${flag(n,"big")}<div><h2 class="atitle">${esc(nm)}</h2>${d.off&&d.off!=nm?`<p class="coff">${esc(d.off)}</p>`:""}<p class="ctags"><span class="ctag"><i></i>${esc(p.cont)}</span>${p.sub&&p.sub!=p.cont?`<span>${esc(p.sub)}</span>`:""}${d.un?`<span>UN member</span>`:""}${p.land?`<span>Landlocked</span>`:""}</p></div></header>
<div class="cstats">${tile("Population",P?people(P):"",d.pop?`${d.pop[0]}${rk.pop[n]?" · "+rkTxt(rk.pop[n]):""}`:"")}${tile("Area",Ar?km(Ar):"",rk.area[n]?rkTxt(rk.area[n])+" in size":"")}${tile("People per km²",De&&De>=.1?fmt(Math.round(De)):"",rk.dens[n]?rkTxt(rk.dens[n])+" most crowded":"")}${tile("GDP per person",G?"US$"+fmt(G):"",d.gdp?`${d.gdp[0]} · whole economy ${usd(d.gdp[1])}`:"")}</div>
<div class="row" style="margin-top:8px"><div class="body" style="flex:3 1 340px">
${lc?`<figure class="ph fr locm"><div class="lochd">Where in the world</div>${lc}<figcaption><b>📍 ${esc(nm)}</b> · <a href="#/atlas/${enc(n)}">Open in the Atlas ›</a></figcaption></figure>`:""}
<p class="lead">${lead}</p>
${f&&f[5]?`<p class="cfact"><b>Did you know?</b> ${esc(f[5])}</p>`:""}
<section class="panelx ffile" style="clear:both;--cc:${kv(p.cont)}"><div class="hd">Fact file<span>${esc(nm)}</span></div><dl class="in">${facts.map(x=>`<div><dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd></div>`).join("")}</dl></section>
${p.bord.length?`<h3>Neighbors</h3><div class="cnb">${p.bord.map(x=>D[x]?`<a href="#/country/${enc(x)}">${flag(x)}${esc(disp(x))}</a>`:`<span>${esc(x)}</span>`).join("")}</div>`:""}
${d.i3&&(P||Ar)?`<h3>How it compares</h3><ul class="cph">${P?`<li>${esc(nm)} is home to ${share(P/W0.pop*100)} of the world’s people.</li>`:""}${Ar?`<li>It covers ${share(Ar/W0.area*100)} of the world’s land.</li>`:""}</ul>
<p class="csel"><label>Compare with <select id="cmw"><option value="">Choose a country</option>${names.filter(x=>x!=n&&D[x].i3&&pop(x)).map(x=>`<option value="${esc(x)}"${x==cw?" selected":""}>${esc(disp(x))}</option>`).join("")}</select></label></p><div id="cmo">${cw?cmpRows(n,cw):""}</div>`:""}
${(window.COUNTRY_EXTRA||{})[(artFor(n)||{}).id]?`<p class="cextra">${window.COUNTRY_EXTRA[artFor(n).id].map(l=>`<a class="btn" href="${l[0]}">${esc(l[1])} ›</a>`).join("")}</p>`:""}
${art?`<p><a class="btn" href="#/art/${art.id}">Read the full article: ${esc(art.t)} ›</a></p>`:""}
<nav class="cpn">${prev?`<a href="#/country/${enc(prev)}">‹ ${flag(prev)}${esc(disp(prev))}</a>`:"<span></span>"}${next?`<a href="#/country/${enc(next)}">${flag(next)}${esc(disp(next))} ›</a>`:"<span></span>"}</nav>
<p class="mu csrc">Population${d.popsrc?`: ${esc(d.popsrc)}`:": World Bank"}${d.pop?` (${d.pop[0]})`:""}. GDP: World Bank, current US dollars. Other data: the open world-countries dataset. Flags: flag-icons. Figures are rounded and change over time.</p></div></div>`;
const cm=$("#cmw");cm&&(cm.onchange=()=>{const o=cm.value;try{localStorage.setItem("cmpWith",o)}catch(e){}$("#cmo").innerHTML=o?cmpRows(n,o):""});const cc=V.querySelector(".ccrumb");cc&&(cc.onclick=()=>{try{const s=JSON.parse(localStorage.getItem(VK)||"{}");s.c=p.cont;localStorage.setItem(VK,JSON.stringify(s))}catch(e){}});
document.title=nm+" · Countries of the world · Encyclopedia Premium"};

/* ---------- Flag quiz ---------- */
R.flags=function(){window.setCat&&setCat(null);let C=null;try{C=localStorage.getItem("flagCont")||""}catch(e){C=""}
const pool=()=>names.filter(n=>D[n].flag&&D[n].i3&&(!C||D[n].ct==C));
const start=()=>{const L=shuf(pool()).slice(0,10);let i=0,s=0;const tk=NAVT;
const q=()=>{if(tk!=NAVT)return;if(i>=L.length){V.innerHTML=`<h2>Flag quiz</h2><div class="fqdone"><b>You scored ${s} of ${L.length}</b><p>${s==L.length?"Perfect! You know your flags.":s>=7?"Great work!":"Keep practising: browse the flags on the Countries page."}</p><button class="btn" id="fqa">Play again</button><a class="btn" href="#/countries">Countries of the world</a></div>`;$("#fqa").onclick=()=>R.flags();return}
const n=L[i],same=pool().filter(x=>x!=n),near=same.filter(x=>D[x].ct==D[n].ct),opts=shuf([n,...shuf(near.length>=3?near:same).slice(0,3)]);
V.innerHTML=`<h2>Flag quiz</h2><p class="mu" style="font:14px system-ui">Question ${i+1} of ${L.length} · Score ${s}</p><div class="fq">${flag(n,"quiz")}<div class="fqo">${opts.map(o=>`<button class="opt" data-n="${esc(o)}">${esc(disp(o))}</button>`).join("")}</div><p id="fqm" class="mu"></p></div>`;
V.querySelectorAll(".fqo .opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.n==n;if(ok)s++;V.querySelectorAll(".fqo .opt").forEach(x=>{x.disabled=true;if(x.dataset.n==n)x.classList.add("ok")});if(!ok)b.classList.add("bad");$("#fqm").innerHTML=`${ok?"Correct!":"It’s the flag of "+esc(disp(n))+"."} <a href="#/country/${enc(n)}">About ${esc(disp(n))} ›</a>`;setTimeout(()=>{if(tk==NAVT){i++;q()}},ok?1000:1900)})};q()};
V.innerHTML=`<h2>Flag quiz</h2><p class="mu" style="font:14px system-ui">Ten flags, four choices each. Pick a continent or play with the whole world.</p><div class="cchips fqc">${[["","World"],...CONT.filter(c=>c[1]!="ant")].map(c=>`<button data-c="${c[0]}"${c[1]&&c[1]!="World"?` style="--k:var(--k-${c[1]})"`:""} class="${C==c[0]?"on":""}">${c[1]&&c[1]!="World"?"<i></i>":""}${c[0]||"Whole world"}</button>`).join("")}</div><p><button class="btn" id="fqs">Start the quiz ›</button></p>`;
V.querySelectorAll(".fqc button").forEach(b=>b.onclick=()=>{C=b.dataset.c;try{localStorage.setItem("flagCont",C)}catch(e){}V.querySelectorAll(".fqc button").forEach(x=>x.classList.toggle("on",x==b))});$("#fqs").onclick=start;document.title="Flag quiz · Encyclopedia Premium"};

/* Links in menus and pages */
const mm=document.querySelector("#mg-more .mcol");mm&&mm.insertAdjacentHTML("beforeend",`<a href="#/flags">Flag quiz</a>`);
})();
