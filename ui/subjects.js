/* Subjects layer, loaded last.
   Adds: the Subjects and More menus, subject pages (#/cat/<subject>), sub-section pages (#/cat/<subject>/<sub-section>),
   breadcrumbs on articles, the front page, Contents by subject, a reading progress bar, a contents list that follows
   the reader, Up next links within each sub-section, and a tidier article toolbar. */
(()=>{
const SUBJ=window.SUBJ||{},ORDER=Object.keys(CAT),enc=encodeURIComponent,col=c=>CAT[c]||["#666","#999"];
const catUrl=c=>"#/cat/"+enc(c),subUrl=(c,b)=>"#/cat/"+enc(c)+"/"+enc(b);
const NUM={};A.forEach((a,i)=>NUM[a.id]=i+1);
const words=t=>String(t||"").split(/\s+/).filter(Boolean).length;
const artWords=a=>words(a.l)+a.p.reduce((s,x)=>s+words(x[1]),0)+(a.sp?words(a.sp[1]):0)+(a.g||[]).reduce((s,g)=>s+words(g[1]),0);
const mins=a=>Math.max(1,Math.round(artWords(a)/200));
const inSub=(c,b)=>((SUBJ[c]||{subs:[]}).subs.find(x=>x.n==b)||{ids:[]}).ids.map(get).filter(Boolean);
const ALLSUBS=[];ORDER.forEach(c=>(SUBJ[c]?SUBJ[c].subs:[]).forEach(b=>ALLSUBS.push([c,b])));
const subCount=()=>ALLSUBS.length;
const snip=(a,n)=>cut(a.l||a.p[0][1],n||130);
const crumbs=(c,b,right)=>`<div class="runhead crumbs"><nav aria-label="You are here"><a href="#/contents">Contents</a><i>›</i><a href="${catUrl(c)}">${esc(c)}</a>${b?`<i>›</i><a href="${subUrl(c,b)}">${esc(b)}</a>`:""}</nav><span></span><small>${right||""}</small></div>`;
const acard=a=>`<a class="card acard" href="#/art/${a.id}">${ban(a)}<div class="t"><em>No. ${NUM[a.id]} · ${mins(a)} min</em><b>${esc(a.t)}</b><p>${esc(snip(a,120))}</p></div></a>`;

/* ---------- Menus ---------- */
const nv=$("#nv");
const NAV=[["home","Home"],["cat","Subjects",1],["contents","Contents"],["az","A–Z"],["atlas","Atlas"],["time","Timeline"],["maze","Quizzes"],["saved","My Library"],["more","More",1]];
nv.innerHTML=NAV.map(t=>t[2]?`<button class="ddb" data-v="${t[0]}" data-dd="${t[0]}" aria-expanded="false" aria-haspopup="true">${t[1]} <span aria-hidden="true">▾</span></button>`:`<button data-v="${t[0]}" onclick="go('${t[0]}')">${t[1]}</button>`).join("");
const MORE=[["Find things",[["index","Index"],["gloss","Glossary"],["dict","Dictionary"],["browse","All articles with filters"]]],["Places",[["countries","Countries of the world"],["regions","Regions of the Philippines"],["atlas","Atlas"]]],["Play and study",[["maze","Mind Maze quizzes"],["chal","Capitals challenge"],["notes","Research notes"],["hist","Reading history"]]],["About the book",[["cover","Cover"],["howto","How to use"],["book","Print the book"],["about","About this edition"]]]];
document.body.insertAdjacentHTML("beforeend",`<div class="mega" id="mg-cat" hidden><div class="mgrid">${ORDER.map(c=>{const S=SUBJ[c];return `<div class="mcol" style="--c:${col(c)[0]};--l:${col(c)[1]}"><a class="mh" href="${catUrl(c)}"><span>${S.i}</span>${esc(c)}</a>${S.subs.map(b=>`<a href="${subUrl(c,b.n)}">${esc(b.n)}<small>${b.ids.length}</small></a>`).join("")}</div>`}).join("")}</div><div class="mfoot"><a href="#/contents">Full contents</a><a href="#/browse">All ${A.length} articles</a><a href="#/az">Quick reference A–Z</a><a href="#/index">Index</a></div></div>
<div class="mega small" id="mg-more" hidden><div class="mgrid">${MORE.map(g=>`<div class="mcol"><b class="mh2">${g[0]}</b>${g[1].map(x=>`<a href="#/${x[0]}">${x[1]}</a>`).join("")}</div>`).join("")}</div></div>
<div id="rprog" aria-hidden="true"><i></i></div>`);
const closeMenus=()=>{document.querySelectorAll(".mega").forEach(m=>m.hidden=true);nv.querySelectorAll(".ddb").forEach(b=>b.setAttribute("aria-expanded","false"))};
nv.querySelectorAll(".ddb").forEach(b=>b.onclick=e=>{e.stopPropagation();const m=$("#mg-"+b.dataset.dd),open=m.hidden;closeMenus();if(!open)return;const r=nv.getBoundingClientRect();m.style.top=(r.bottom+scrollY-1)+"px";m.hidden=false;b.setAttribute("aria-expanded","true");const f=m.querySelector("a");f&&f.focus({preventScroll:true})});
document.addEventListener("click",e=>{if(!e.target.closest(".mega"))closeMenus();else if(e.target.closest("a"))closeMenus()});
addEventListener("keydown",e=>{if(e.key=="Escape")closeMenus()});addEventListener("resize",closeMenus);
function markNav(){const v=location.hash.replace(/^#\/?/,"").split("/")[0]||"home",sub=["cat","art","browse"].includes(v);nv.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v==v||(sub&&b.dataset.v=="cat")||(b.dataset.v=="maze"&&v=="chal")||(b.dataset.v=="more"&&["index","gloss","dict","countries","country","regions","region","notes","hist","cover","howto","book","about","guides","guide","phtimeline"].includes(v))))}
addEventListener("hashchange",()=>{closeMenus();setTimeout(markNav)});addEventListener("DOMContentLoaded",()=>setTimeout(markNav));

/* ---------- Subject and sub-section pages ---------- */
const subTile=(c,b)=>{const L=b.ids.map(get).filter(Boolean),f=get((SUBJ[c].feat||[]).find(i=>b.ids.includes(i)))||L[0];return `<div class="subtile"><a class="sthead" href="${subUrl(c,b.n)}">${ban(f)}<span><b>${esc(b.n)}</b><small>${L.length} article${L.length==1?"":"s"}</small></span></a><p>${esc(b.d)}</p><ul>${L.slice(0,5).map(a=>`<li><a href="#/art/${a.id}">${esc(a.t)}</a></li>`).join("")}</ul>${L.length>5?`<a class="lk more" href="${subUrl(c,b.n)}">All ${L.length} articles ›</a>`:`<a class="lk more" href="${subUrl(c,b.n)}">Open ›</a>`}</div>`};
function subjectPage(c){const S=SUBJ[c],L=A.filter(a=>a.c==c),k=ORDER.indexOf(c),G=L.flatMap(a=>(a.g||[]).map(g=>[g,a])),pick=shuf(G).slice(0,6),f=(S.feat||[]).map(get).filter(Boolean),w=L.reduce((s,a)=>s+artWords(a),0);
const pv=ORDER[(k-1+ORDER.length)%ORDER.length],nx=ORDER[(k+1)%ORDER.length];
V.innerHTML=`${crumbs(c,"",`Subject ${k+1} of ${ORDER.length}`)}<section class="opener"><div class="big-ic" aria-hidden="true">${S.i}</div><small>Subject ${k+1} of ${ORDER.length}</small><h2>${esc(c)}</h2><p class="tg">${esc(S.tag)}</p><p>${esc(S.intro)}</p><div class="st"><div><b>${L.length}</b>articles</div><div><b>${S.subs.length}</b>sub-sections</div><div><b>${Math.round(w/1000)}k</b>words</div><div><b>${G.length}</b>key words</div></div></section>
<div class="subjump" aria-label="Sub-sections">${S.subs.map(b=>`<a href="${subUrl(c,b.n)}">${esc(b.n)} <span>${b.ids.length}</span></a>`).join("")}</div>
${c=="The Philippines"?`<p><a class="btn" href="#/regions">The 18 regions of the Philippines ›</a></p>`:c=="Planet Earth"?`<p><a class="btn" href="#/countries">Countries of the world ›</a><a class="btn" href="#/atlas">Atlas ›</a></p>`:""}
${f.length?`<h2 class="sech">Start here</h2><div class="featrow">${f.map(a=>`<a class="card" href="#/art/${a.id}">${ban(a)}<div class="t"><b>${esc(a.t)}</b><span class="csub" style="--c:${col(c)[0]}">${esc(a.sub)}</span><p>${esc(snip(a,110))}</p></div></a>`).join("")}</div>`:""}
<h2 class="sech">Inside ${esc(c)}</h2><div class="subtiles">${S.subs.map(b=>subTile(c,b)).join("")}</div>
${pick.length?`<h2 class="sech">Words to know</h2><div class="glx">${pick.map(([g,a])=>`<div style="--c:${col(c)[1]}"><dt>${esc(g[0])}</dt><dd>${esc(g[1])}</dd><a href="#/art/${a.id}">${esc(a.t)}</a></div>`).join("")}</div><p><a class="btn" href="#/gloss/${enc(c)}">All ${G.length} key words</a><a class="btn" href="#/browse/${enc(c)}">Browse with filters</a></p>`:""}
<div class="pn"><a class="btn" href="${catUrl(pv)}">‹ ${esc(pv)}</a><a class="btn" href="${catUrl(nx)}">${esc(nx)} ›</a></div>`;
want([...f,...S.subs.map(b=>get((S.feat||[]).find(i=>b.ids.includes(i)))||get(b.ids[0]))].filter(Boolean))}
function subPage(c,b){const S=SUBJ[c],L=b.ids.map(get).filter(Boolean),j=ALLSUBS.findIndex(x=>x[0]==c&&x[1]==b),pv=ALLSUBS[(j-1+ALLSUBS.length)%ALLSUBS.length],nx=ALLSUBS[(j+1)%ALLSUBS.length];
V.innerHTML=`${crumbs(c,b.n,`${L.length} article${L.length==1?"":"s"}`)}<h2 class="atitle">${esc(b.n)}</h2><p class="subd">${esc(b.d)} Part of <a href="${catUrl(c)}">${esc(c)}</a>.</p>
<div class="subjump">${S.subs.map(x=>`<a href="${subUrl(c,x.n)}"${x==b?' class="on" aria-current="page"':""}>${esc(x.n)} <span>${x.ids.length}</span></a>`).join("")}</div>
<div class="grid acards">${L.map(acard).join("")}</div>
<div class="pn"><a class="btn" href="${subUrl(pv[0],pv[1].n)}">‹ ${esc(pv[1].n)}${pv[0]!=c?` <small>(${esc(pv[0])})</small>`:""}</a><a class="btn" href="${subUrl(nx[0],nx[1].n)}">${esc(nx[1].n)}${nx[0]!=c?` <small>(${esc(nx[0])})</small>`:""} ›</a></div>`;
want(L);document.title=b.n+" · "+c+" · Encyclopedia Premium"}
R.cat=function(arg){const parts=String(arg||"").split("/");let c=window.subjFor?subjFor(parts[0]):parts[0];if(!c||!CAT[c]){R.contents();return}setCat(c);
const b=parts[1]&&SUBJ[c].subs.find(x=>x.n==parts[1]);if(b)subPage(c,b);else subjectPage(c)};

/* ---------- Contents by subject ---------- */
R.contents=function(){setCat(null);V.innerHTML=`<h2>Contents</h2><p class="mu" style="font:14px system-ui">${ORDER.length} subjects, ${subCount()} sub-sections and ${A.length} numbered articles. Select a subject or sub-section for its opening page.</p>
<div class="frontbar"><a class="btn" href="#/howto">How to use this encyclopedia</a><a class="btn" href="#/index">Index</a><a class="btn" href="#/gloss">Glossary</a><a class="btn" href="#/az">Quick reference A–Z (${(window.SH||[]).length})</a><a class="btn" href="#/countries">Countries</a><a class="btn" href="#/regions">Regions of the Philippines</a><a class="btn" href="#/book">Print the book</a></div>
<div class="contents2">${ORDER.map((c,i)=>{const S=SUBJ[c];return `<section style="--c:${col(c)[0]};--l:${col(c)[1]}"><h3><em>${String(i+1).padStart(2,"0")}</em><a href="${catUrl(c)}"><span aria-hidden="true">${S.i}</span> ${esc(c)}</a><small>${esc(S.tag)}</small></h3><div class="csubs">${S.subs.map(b=>`<div><h4><a href="${subUrl(c,b.n)}">${esc(b.n)}</a></h4><ol>${b.ids.map(get).filter(Boolean).map(a=>`<li><a href="#/art/${a.id}">${esc(a.t)}</a><span>${NUM[a.id]}</span></li>`).join("")}</ol></div>`).join("")}</div></section>`}).join("")}</div>`};

/* ---------- Front page ---------- */
R.home=function(){setCat(null);const d=new Date(),seed=d.getFullYear()*400+d.getMonth()*32+d.getDate(),f=FACTS[seed%FACTS.length],aod=A[(seed*7919)%A.length];
const last=HIST[0]&&get(HIST[0].i),feat=[...Array(14)].map((_,k)=>A[(seed*31+k*97)%A.length]).filter((a,k,l)=>l.indexOf(a)==k&&a!=aod&&a!=last).slice(0,10);
const SH=window.SH||[],az=SH.length?[...Array(3)].map((_,k)=>SH[(seed*13+k*61)%SH.length]):[];
const facts=()=>shuf(Object.keys(window.FUN||{}).filter(get)).slice(0,3).map(i=>`<li>${esc(FUN[i])} <a class="lk il" href="#/art/${i}">${esc(get(i).t)}</a></li>`).join("");
const tiles=ORDER.map(c=>{const S=SUBJ[c],a=get(S.feat[0])||A.find(x=>x.c==c),n=A.filter(x=>x.c==c).length;return `<a class="stile" href="${catUrl(c)}" style="--c:${col(c)[0]};--l:${col(c)[1]}">${ban(a)}<span class="st-t"><span class="st-i" aria-hidden="true">${S.i}</span><b>${esc(c)}</b><small>${esc(S.tag)}</small><em>${n} articles · ${S.subs.length} sub-sections</em></span></a>`}).join("");
V.innerHTML=`<section class="mast2"><div><small>${d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})} · First edition</small><h2>The illustrated encyclopedia</h2><p>${A.length} articles in ${ORDER.length} subjects, ${SH.length} quick-reference entries and ${Object.keys(window.PROF||{}).length} country pages, with special attention to the Philippines.</p></div><nav class="mlinks" aria-label="Front matter"><a href="#/cover">Cover</a><a href="#/contents">Contents</a><a href="#/index">Index</a><a href="#/az">A–Z</a><a href="#/howto">How to use</a></nav></section>
<a class="hcard" href="#/art/${aod.id}" style="--c:${col(aod.c)[0]};--l:${col(aod.c)[1]}">${ban(aod,"big")}<div class="htext"><small>Article of the day · ${esc(aod.c)} › ${esc(aod.sub||"")}</small><h3>${esc(aod.t)}</h3><p>${esc(snip(aod,240))}</p><span class="btn">Read the article · ${mins(aod)} min</span></div></a>
<div class="cols3"><div class="panel"><h3>Fact of the day</h3><p>${esc(f)}</p></div>
<div class="panel">${last?`<h3>Continue reading</h3><a class="mini" href="#/art/${last.id}">${ban(last)}<span><b>${esc(last.t)}</b><small>${esc(last.c)} › ${esc(last.sub||"")}</small></span></a><a class="lk" href="#/hist">Your reading history ›</a>`:`<h3>Where to start</h3><p>Pick a subject below, open the <a href="#/contents">Contents</a>, or let chance decide.</p><button class="btn" onclick="document.getElementById('rnd').click()">🎲 Surprise me</button>`}</div>
<div class="panel"><h3>Did you know?</h3><ul class="dyk" id="dk">${facts()}</ul><button class="btn sm" id="dkb">More facts</button></div></div>
<h2 class="sech">Explore the subjects</h2><div class="stiles">${tiles}</div>
<div class="row" style="margin-top:18px"><div class="panel" id="dc" style="flex:3 1 380px">${dayCard()}</div>${az.length?`<div class="panel" style="flex:2 1 260px"><h3>From the A–Z</h3>${az.map(e=>`<p class="azp"><a href="#/e/${e.id}"><b>${esc(e.t)}</b></a> ${esc(cut(e.x,110))}</p>`).join("")}<a class="lk" href="#/az">Open the quick reference A–Z ›</a></div>`:""}</div>
<h2 class="sech">Editor’s picks</h2>${cards(feat)}<p><a class="btn" href="#/browse">See all ${A.length} articles</a><a class="btn" href="#/contents">Contents</a></p>`;
want([aod,last,...ORDER.map(c=>get(SUBJ[c].feat[0]))].filter(Boolean));$("#dkb").onclick=()=>{$("#dk").innerHTML=facts()};bindDay()};

/* ---------- Cover and About wording ---------- */
const oc=R.cover;R.cover=function(){oc();const p=V.querySelector(".cover .mast p");p&&(p.textContent=p.textContent.replace(/sections/,"subjects"));V.querySelectorAll(".cover .tile").forEach(t=>{const c=t.title;if(SUBJ[c])t.querySelector("span").textContent=SUBJ[c].i+" "+c})};
const oa=R.about;R.about=function(){oa();V.querySelectorAll(".edbox small").forEach(s=>{if(s.textContent=="Sections")s.textContent="Subjects"})};

/* ---------- Articles ---------- */
const pa=R.art;
R.art=function(id){pa(id);const a=get(id);if(!a)return;const S=SUBJ[a.c],b=window.subOf&&subOf(a);
/* Breadcrumb */
const rh=V.querySelector(".runhead");if(rh){const sm=rh.querySelector("small");rh.outerHTML=crumbs(a.c,b?a.sub:"",sm?sm.textContent:"")}
const meta=V.querySelector("h2.atitle+p.mu");if(meta)meta.innerHTML=`<a href="${b?subUrl(a.c,a.sub):catUrl(a.c)}">${esc(a.sub||a.c)}</a> · ${mins(a)} min read · ${a.p.length} sections`;
/* Toolbar: Bookmark and Listen stay visible; the rest go into one menu */
const bk=$("#bk");if(bk){const bar=document.createElement("div");bar.className="atools";bk.before(bar);bar.append(bk);const sp=$("#sp");sp&&bar.append(sp);
bar.insertAdjacentHTML("beforeend",`<div class="amore"><button class="btn" id="amb" aria-expanded="false" aria-haspopup="true">⋯ More</button><div class="amenu" id="amn" hidden></div></div>`);
const mn=$("#amn");["rdb","an","cp","pr","hp"].forEach(k=>{const e=$("#"+k);if(e){e.classList.remove("btn");e.classList.add("mi");mn.append(e)}});
mn.insertAdjacentHTML("beforeend",`${$("#ct")?`<button class="mi" id="mct">❝ How to cite</button>`:""}${$("#rp")?`<button class="mi" id="mrp">⚑ Report an error</button>`:""}`);
const om=(id,t)=>{const x=$(id);x&&(x.onclick=()=>{const e=$(t);e.open=true;e.scrollIntoView({behavior:"smooth"})})};om("#mct","#ct");om("#mrp","#rp");
const icons={rdb:"✓",an:"✎",cp:"🔗",hp:"🖼"};Object.entries(icons).forEach(([k,i])=>{const e=$("#"+k);if(e&&!/^\W/.test(e.textContent))e.dataset.i=i});
$("#amb").onclick=e=>{e.stopPropagation();mn.hidden=!mn.hidden;$("#amb").setAttribute("aria-expanded",String(!mn.hidden))};
mn.addEventListener("click",e=>{if(e.target.closest(".mi")&&!["hp"].includes(e.target.id))setTimeout(()=>{mn.hidden=true;$("#amb")&&$("#amb").setAttribute("aria-expanded","false")},250)});
document.addEventListener("click",function h(e){if(!$("#amn")){document.removeEventListener("click",h);return}if(!e.target.closest(".amore"))$("#amn").hidden=true})}
/* Up next, within the sub-section */
const L=b?b.ids.map(get).filter(Boolean):A.filter(x=>x.c==a.c),k=L.indexOf(a),j=ALLSUBS.findIndex(x=>x[0]==a.c&&x[1]==b);
const nextSub=ALLSUBS[(j+1)%ALLSUBS.length],prevSub=ALLSUBS[(j-1+ALLSUBS.length)%ALLSUBS.length];
const nx=k<L.length-1?[L[k+1],"Up next in "+a.sub]:[get(nextSub[1].ids[0]),"Next sub-section: "+nextSub[1].n+(nextSub[0]!=a.c?" ("+nextSub[0]+")":"")];
const pv=k>0?[L[k-1],"Previous in "+a.sub]:[get(prevSub[1].ids.at(-1)),"Previous: "+prevSub[1].n+(prevSub[0]!=a.c?" ("+prevSub[0]+")":"")];
const pn=V.querySelector(".body .pn");if(pn&&nx[0]&&pv[0]){pn.className="upnext";pn.innerHTML=`<a class="unprev" href="#/art/${pv[0].id}"><small>‹ ${esc(pv[1])}</small><b>${esc(pv[0].t)}</b></a><a class="unnext" href="#/art/${nx[0].id}">${ban(nx[0])}<span><small>${esc(nx[1])} ›</small><b>${esc(nx[0].t)}</b><em>${esc(snip(nx[0],100))}</em></span></a>`;want([nx[0]])}
/* References: specific sources for this article’s facts */
const RF=(window.REFS||{})[id];const fr=$("#fr");if(RF&&fr){const w=WIKI[id]||sortT(a.t),L=[[`${w} (Wikipedia)`,"https://en.wikipedia.org/wiki/"+enc(w.replace(/ /g,"_"))],...RF];
fr.insertAdjacentHTML("beforebegin",`<div class="refs" id="refs"><b class="disp">References</b><p class="mu" style="font:13px system-ui;margin:.2em 0">Sources covering the facts in this article. Key facts and dates were reviewed against sources like these in October 2026.</p><ol>${L.map(x=>`<li><a href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[0])}</a></li>`).join("")}</ol></div>`);
const toc=V.querySelector(".toc"),fb=toc&&toc.querySelector('[data-s="fr"]');fb&&fb.insertAdjacentHTML("beforebegin",`<button class="lk" data-s="refs">References</button>`);const rb=toc&&toc.querySelector('[data-s="refs"]');rb&&(rb.onclick=()=>$("#refs").scrollIntoView({behavior:"smooth"}))}
/* Contents list follows the reader */
spy()};
const prog=$("#rprog i");let spyT=0;
function spy(){const body=V.querySelector(".body");if(!window.curArt||!body){$("#rprog").classList.remove("on");return}$("#rprog").classList.add("on");
const r=body.getBoundingClientRect(),tot=r.height-innerHeight*.6,done=Math.min(1,Math.max(0,-r.top+innerHeight*.25)/Math.max(1,tot));prog.style.width=(done*100).toFixed(1)+"%";
const hs=[...body.querySelectorAll("h3[id]")];let cur=null;for(const h of hs){if(h.getBoundingClientRect().top<140)cur=h.id;else break}
V.querySelectorAll(".toc [data-s]").forEach(x=>{const t=/^\d+$/.test(x.dataset.s)?"s"+x.dataset.s:x.dataset.s;x.classList.toggle("on",t==cur)});
const on=V.querySelector(".toc .on"),toc=V.querySelector(".toc");if(on&&toc&&toc.scrollHeight>toc.clientHeight){const o=on.offsetTop-toc.clientHeight/2;if(Math.abs(toc.scrollTop-o)>60)toc.scrollTop=o}}
addEventListener("scroll",()=>{if(!spyT)spyT=requestAnimationFrame(()=>{spyT=0;spy()})},{passive:true});
addEventListener("hashchange",()=>setTimeout(spy,50));
})();
