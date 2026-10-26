/* Philippine history timeline (#/phtimeline) and reading guides (#/guides, #/guide/<id>). Loaded after ui/subjects.js. */
(()=>{
const enc=encodeURIComponent,col=c=>CAT[c]||["#666","#999"];
/* ---------- Philippine history timeline ---------- */
const ERAS=[
["Before Spain","#0f766e",[["c. 50,000 years ago","Homo luzonensis lives in Callao Cave, Cagayan.","precol"],["c. 4,000–5,000 years ago","Austronesian seafarers spread through the islands.","precol"],["c. 800 BCE","The Manunggul Jar is made in Palawan.","palawan"],["c. 320 CE","The oldest known balangay boat is built in Butuan.","precol"],["900 CE","The Laguna Copperplate Inscription, the oldest known Philippine document, is written.","baybayin"],["c. 1380","Islam reaches Sulu; a mosque is built on Simunul Island.","sulu"],["c. 1405","The Sultanate of Sulu is founded.","sulu"]]],
["Spanish era","#b45309",[["1521","Magellan’s expedition arrives; Lapulapu wins the Battle of Mactan.","lapulapu"],["1565","Legazpi founds the first Spanish settlement in Cebu; the galleon trade begins.","spanph"],["1571","Manila becomes the capital of the Spanish Philippines.","manila"],["1593","The Doctrina Christiana, one of the first books printed in the islands, appears.","baybayin"],["1744","Dagohoy’s revolt begins in Bohol and lasts 85 years.","bohol"],["1762–1764","The British occupy Manila; Diego and Gabriela Silang lead a revolt in the Ilocos.","silang"],["1815","The last Manila galleon sails.","spanph"],["1872","The priests Gomburza are executed after the Cavite Mutiny.","phrev"],["1887","Rizal publishes Noli Me Tángere.","rizal"],["1892","Bonifacio founds the Katipunan.","bonifacio"]]],
["Revolution and Republic","#b91c1c",[["1896","The revolution begins; Rizal is executed on 30 December.","phrev"],["1897","The Tejeros Convention; Bonifacio is executed; the Pact of Biak-na-Bato.","bonifacio"],["12 June 1898","Aguinaldo proclaims independence in Kawit, Cavite.","independence"],["1899","The First Philippine Republic is inaugurated at Malolos; the Philippine–American War begins.","malolos"],["1901","Aguinaldo is captured at Palanan.","aguinaldo"]]],
["American era","#1d4ed8",[["1907","The first Philippine Assembly opens.","independence"],["1935","The Commonwealth is inaugurated with Manuel L. Quezon as president.","commonwealth"],["1937","Filipino women win the vote; Tagalog is chosen as the basis of the national language.","democ"],["1937–1941","The Philippines welcomes about 1,300 Jewish refugees.","holocaust"]]],
["World War II","#44403c",[["1941","Japan attacks the Philippines on 8 December.","japocc"],["1942","Bataan and Corregidor fall; the Death March.","japocc"],["1944","American forces land at Leyte.","japocc"],["1945","The Battle of Manila destroys much of the city.","manila"]]],
["The Third Republic","#7c3aed",[["4 July 1946","The Philippines becomes fully independent from the United States.","independence"],["1950","Filipino troops are sent to the Korean War.","koreanwar"],["1953","Ramon Magsaysay is elected president.","magsaysay"],["1965","Ferdinand Marcos is elected president.","marcos"],["1967","The Philippines helps found ASEAN.","asean"]]],
["Martial law","#57534e",[["21 September 1972","Marcos declares martial law.","martiallaw"],["1981","Martial law is formally lifted.","martiallaw"],["21 August 1983","Ninoy Aquino is assassinated.","ninoy"],["22–25 February 1986","The EDSA People Power Revolution; Corazon Aquino becomes president.","edsa"]]],
["Since 1986","#0b3d91",[["1987","Filipinos ratify a new Constitution.","phgov"],["1991","Mount Pinatubo erupts.","pinatubo"],["2001","EDSA II ousts President Joseph Estrada.","edsa"],["2013","Typhoon Haiyan (Yolanda) devastates the Visayas.","phtyph"],["2016","An international tribunal rules on the South China Sea case.","law"],["2019","The Bangsamoro Autonomous Region is created.","mindanao"],["2021","Hidilyn Diaz wins the Philippines’ first Olympic gold.","hidilyn"],["2024","Carlos Yulo wins two Olympic golds in Paris.","phsport"]]]];
R.phtimeline=function(){window.setCat&&setCat("Countries and Places");
V.innerHTML=`<div class="runhead crumbs"><nav><a href="#/cat/Countries%20and%20Places">Countries and Places</a><i>›</i><a href="#/art/ph">The Philippines</a></nav><span></span><small>${ERAS.reduce((n,e)=>n+e[2].length,0)} events</small></div>
<h2 class="atitle">Philippine history timeline</h2><p class="subd">From the first people of the islands to the present day. Select an event to read the full article.</p>
<div class="erajump">${ERAS.map((e,i)=>`<a href="#era${i}" style="--c:${e[1]}">${e[0]}</a>`).join("")}</div>
<div class="phtl">${ERAS.map((e,i)=>`<section id="era${i}" style="--c:${e[1]}"><h3>${e[0]}</h3><ol>${e[2].map(x=>{const a=get(x[2]);return `<li><b>${esc(x[0])}</b><span>${esc(x[1])}${a?` <a href="#/art/${a.id}">${esc(a.t)} ›</a>`:""}</span></li>`}).join("")}</ol></section>`).join("")}</div>
<p><a class="btn" href="#/country/Philippines">Philippines fact file</a><a class="btn" href="#/regions">Regions of the Philippines</a><a class="btn" href="#/time">World timeline</a></p>`;
V.querySelectorAll(".erajump a").forEach(x=>x.onclick=e=>{e.preventDefault();document.getElementById(x.getAttribute("href").slice(1)).scrollIntoView({behavior:"smooth"})});document.title="Philippine history timeline · Encyclopedia Premium"};

/* ---------- Reading guides ---------- */
const G=window.GUIDES=[
["ancient","The first civilizations","Visit the cities and empires where history began.","🏺","mesop egypt indus china greece rome maya"],
["revolution","The age of revolutions","How revolutions in America, France, the Philippines and beyond made new nations.","📜","renais reform usrev frrev phrev malolos indrev"],
["ww2","World War II","The war that changed the whole world.","🎖️","wwi ww2 holocaust japocc un"],
["freedom","Freedom and rights","Campaigners, movements and the end of empires.","✊","gandhi mandela mlk malala decol hrights edsa ussrfall"],
["solartour","A tour of the Solar System","Visit the Sun and every planet, from closest to farthest.","🪐","sun mercury venus moon mars jupiter saturn uranep pluto comet"],
["restless","Living on a restless Earth","How moving plates make volcanoes, earthquakes and tsunamis.","🌋","tect volc quake tsunami pinatubo rift climchange"],
["wild","Wild places of the world","Rainforests, reefs, deserts and polar ice.","🦁","eco amazon reef sahara antarc arctic madag tubbataha"],
["life","How life works","From cells and DNA to evolution and the human genome.","🧬","cell dna genome mendel evo microbe"],
["body","Your amazing body","How your body works and how to keep it healthy.","🫀","heart lungs blood brain nervous memory mental nutri sleep"],
["journeys","Great journeys","Explorers who crossed oceans, deserts and space.","🧭","zhenghe ibnbattuta marcopolo columbus magellan apollo armstrong"],
["digital","The digital world","Computers, the internet and the devices that connect us.","💻","comp chip internet smartphone socialmedia ai"]];
const ids=g=>g[4].split(" ").map(get).filter(Boolean);
R.guides=function(){window.setCat&&setCat(null);V.innerHTML=`<h2>Reading guides</h2><p class="mu" style="font:14px system-ui">Short reading paths through the encyclopedia. Each guide takes you through a topic step by step; articles you have marked as read are ticked.</p>
<div class="guides">${G.map(g=>{const L=ids(g),done=L.filter(a=>rd.includes(a.id)).length;return `<a class="gcard" href="#/guide/${g[0]}" style="--c:${col(L[0].c)[0]}"><span class="gi">${g[3]}</span><b>${esc(g[1])}</b><small>${esc(g[2])}</small><em>${L.length} articles${done?` · ${done} read`:""}</em></a>`}).join("")}</div>`;document.title="Reading guides · Encyclopedia Premium"};
R.guide=function(gid){const g=G.find(x=>x[0]==gid);if(!g){R.guides();return}const L=ids(g);window.setCat&&setCat(L[0].c);const done=L.filter(a=>rd.includes(a.id)).length,next=L.find(a=>!rd.includes(a.id))||L[0];
V.innerHTML=`<div class="runhead crumbs"><nav><a href="#/guides">Reading guides</a></nav><span></span><small>${L.length} articles</small></div><h2 class="atitle">${g[3]} ${esc(g[1])}</h2><p class="subd">${esc(g[2])}</p>
<div class="gprog"><div><i style="width:${Math.round(100*done/L.length)}%"></i></div><small>${done} of ${L.length} read</small><a class="btn" href="#/art/${next.id}">${done?"Continue":"Start"}: ${esc(next.t)} ›</a></div>
<ol class="gsteps">${L.map((a,i)=>`<li class="${rd.includes(a.id)?"done":""}"><a href="#/art/${a.id}">${ban(a)}<span><em>Step ${i+1}</em><b>${esc(a.t)}</b><small>${esc(cut(a.l||a.p[0][1],120))}</small></span></a></li>`).join("")}</ol>`;want(L);document.title=g[1]+" · Reading guides · Encyclopedia Premium"};
/* On articles: show the guide this article belongs to, with the next step */
const pa=R.art;R.art=function(id){pa(id);const a=get(id);if(!a)return;const g=G.find(x=>x[4].split(" ").includes(id));if(!g)return;const L=ids(g),k=L.findIndex(x=>x.id==id),nx=L[k+1];
const meta=V.querySelector(".atools");meta&&meta.insertAdjacentHTML("afterend",`<div class="gbanner"><span>${g[3]} Reading guide: <a href="#/guide/${g[0]}">${esc(g[1])}</a> · step ${k+1} of ${L.length}</span>${nx?`<a href="#/art/${nx.id}">Next: ${esc(nx.t)} ›</a>`:`<a href="#/guides">More guides ›</a>`}</div>`)};
/* Links in menus and pages */
const mm=document.querySelector("#mg-more .mcol");mm&&mm.insertAdjacentHTML("beforeend",`<a href="#/guides">Reading guides</a>`);
const oh=R.home;R.home=function(){oh();const ml=V.querySelector(".mlinks");ml&&ml.insertAdjacentHTML("beforeend",`<a href="#/guides">Reading guides</a>`)};
const oc=R.contents;R.contents=function(){oc();const fb=V.querySelector(".frontbar");fb&&fb.insertAdjacentHTML("beforeend",`<a class="btn" href="#/guides">Reading guides</a>`)};
/* Extra pages that belong to one country, shown on its article and fact file */
const EXTRA={ph:[["#/phtimeline","Philippine history timeline"],["#/regions","Regions of the Philippines"]]};window.COUNTRY_EXTRA=EXTRA;
const pa2=R.art;R.art=function(id){pa2(id);
/* Optional Filipino summary: a switch in the article's More menu */
const mn=$("#amn");if(mn&&(window.TL||{})[id]){let on=false;try{on=localStorage.getItem("showFil")=="1"}catch(e){}mn.insertAdjacentHTML("beforeend",`<button class="mi" id="mfil" data-i="🌐">${on?"Hide":"Show"} the summary in Filipino</button>`);$("#mfil").onclick=()=>{try{localStorage.setItem("showFil",on?"0":"1")}catch(e){}R.art(id)}}
const x=EXTRA[id];if(!x)return;const fr=V.querySelector("#fr")||V.querySelector(".body");fr&&fr.insertAdjacentHTML("beforebegin",`<p class="cextra">${x.map(l=>`<a class="btn" href="${l[0]}">${esc(l[1])} ›</a>`).join("")}</p>`)};
})();
