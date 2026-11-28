/* Atlas (#/atlas, #/atlas/<country>): a detailed world map in the Natural Earth projection (data/atlasmap.js).
   Scroll or pinch to zoom, drag to pan; detail and labels (countries, capitals, oceans and seas) appear as you zoom.
   Map modes colour countries by continent or by population, density or wealth; the legend picks out groups.
   Side panel: world summary, continent summary or country profile (a bottom sheet on phones).
   Also: tiny-island dots, a full-screen mode and an overview map. Uses window.CUI from ui/countries.js. */
(()=>{
const U=window.CUI,D=U.D,M=U.MAP,MC=M.C,MW=M.W,MH=M.cut,enc=encodeURIComponent,MAXK=40,MINW=MW/MAXK,LOD=2.4;
const live=i=>!MC[i][6];
const GLO={};
const SHORT={"United States of America":"United States","Dem. Rep. Congo":"DR Congo","Central African Rep.":"C. African Rep.","Bosnia and Herz.":"Bosnia","Fr. S. Antarctic Lands":"French S. Lands","S. Geo. and the Is.":"South Georgia","Br. Indian Ocean Ter.":"Br. Indian Ocean Terr."};
const lname=n=>SHORT[n]||n;
const AREA=MC.map((c,i)=>i).filter(live).sort((a,b)=>MC[b][5]-MC[a][5]),ARANK={};AREA.forEach((i,r)=>ARANK[i]=r);
/* ---------- Map modes ---------- */
const lg=Math.log10;
const MODES={
cont:{lab:"Continents",cat:1},
pop:{lab:"Population",f:U.pop,dom:[1e4,2e9],ticks:[1e5,1e6,1e7,1e8,1e9],tl:["100k","1M","10M","100M","1B"],val:v=>U.people(v)+" people",band:(a,b)=>a&&b?`${U.people(a)} to ${U.people(b)} people`:a?`over ${U.people(a)} people`:`under ${U.people(b)} people`},
dens:{lab:"People per km²",f:U.dens,dom:[1,2000],ticks:[10,50,100,300,1000],tl:["10","50","100","300","1,000"],val:v=>U.fmt(v<10?Math.round(v*10)/10:Math.round(v))+" people per km²",band:(a,b)=>a&&b?`${U.fmt(a)} to ${U.fmt(b)} people per km²`:a?`over ${U.fmt(a)} people per km²`:`under ${U.fmt(b)} people per km²`},
gpc:{lab:"GDP per person",f:U.gpc,dom:[250,150000],ticks:[1000,4000,13000,40000,100000],tl:["$1k","$4k","$13k","$40k","$100k"],val:v=>"US$"+U.fmt(v)+" per person",band:(a,b)=>a&&b?`US$${U.fmt(a)} to US$${U.fmt(b)} per person`:a?`over US$${U.fmt(a)} per person`:`under US$${U.fmt(b)} per person`}};
let mode="cont";try{const m=localStorage.getItem("atlasMode");if(MODES[m])mode=m}catch(e){}
const pos=(m,v)=>Math.max(0,Math.min(1,(lg(v)-lg(m.dom[0]))/(lg(m.dom[1])-lg(m.dom[0]))));
const hex=h=>{h=h.trim().replace("#","");if(h.length==3)h=h.split("").map(c=>c+c).join("");return[0,2,4].map(i=>parseInt(h.slice(i,i+2),16))};
let STOPS=[];const readStops=()=>{const cs=getComputedStyle(document.documentElement);STOPS=[1,2,3,4,5,6].map(i=>hex(cs.getPropertyValue("--q"+i)||"#888"))};
const ramp=t=>{const n=STOPS.length-1,x=t*n,i=Math.min(n-1,Math.floor(x)),f=x-i,a=STOPS[i],b=STOPS[i+1];return`rgb(${a.map((v,j)=>Math.round(v+(b[j]-v)*f)).join(",")})`};
const bandOf=(m,v)=>{let k=0;while(k<m.ticks.length&&v>=m.ticks[k])k++;return k};

/* ---------- Side panel ---------- */
const nameOk=n=>D[n]&&!D[n].note;
const day=Math.floor(Date.now()/864e5),COTD=(()=>{const L=U.names.filter(n=>D[n].i3&&D[n].ind&&D[n].flag&&U.idx(n)>=0);return L[(day*7919)%L.length]})();
const fact=(a,b)=>`<div class="aw"><small>${a}</small><b>${b}</b></div>`;
const pick=(L,f,max)=>L.filter(n=>f(n)).sort((a,b)=>max?f(b)-f(a):f(a)-f(b))[0];
const chip=n=>`<button class="achip" data-n="${esc(n)}">${U.flag(n)}${esc(U.disp(n))}</button>`;
function worldPanel(){const L=U.names.filter(n=>D[n].i3),ind=L.filter(n=>D[n].ind),tot=L.reduce((s,n)=>s+(U.pop(n)||0),0);
return `<div class="aihd world"><span class="aglobe">🌍</span><div><h3>The world at a glance</h3><small>${ind.length} independent countries and ${L.length-ind.length} territories on this map</small></div></div>
<div class="awg">${fact("People",U.people(tot))}${fact("Largest country",esc(U.disp(pick(ind,U.area,1))))}${fact("Most people",esc(U.disp(pick(ind,U.pop,1))))}${fact("Smallest country",esc(U.disp(pick(ind,U.area,0))))}</div>
${COTD?`<div class="acotd"><small>Country of the day</small><button data-n="${esc(COTD)}">${U.flag(COTD,"mid")}<span><b>${esc(U.disp(COTD))}</b><em>${esc(U.capOf(COTD))} · ${esc(D[COTD].ct)}</em></span><i>Show ›</i></button></div>`:""}
<p class="mu ahelp">Select a country on the map or search for one. Select a continent in the legend to see its summary.</p>
<p class="abtns"><a class="btn sm" href="#/countries">Browse all countries ›</a><a class="btn sm" href="#/flags">Flag quiz ›</a></p>`}
function contPanel(c){const L=U.names.filter(n=>D[n].ct==c&&D[n].i3),ind=L.filter(n=>D[n].ind),tot=L.reduce((s,n)=>s+(U.pop(n)||0),0),ar=L.reduce((s,n)=>s+(U.area(n)||0),0);
return `<div class="aihd" style="--k:${U.kv(c)}"><span class="aswatch"></span><div><h3>${esc(c)}</h3><small>${ind.length} countries${L.length>ind.length?` and ${L.length-ind.length} territories`:""}</small></div><button class="ax" data-close="1" aria-label="Show the whole world">×</button></div>
${c=="Antarctica"?`<p>Antarctica has no countries and no permanent population. Several countries claim parts of it, but the Antarctic Treaty of 1959 sets the continent aside for peace and science.</p>`:`<div class="awg">${fact("People",U.people(tot))}${fact("Area",U.fmt(Math.round(ar/1000)*1000)+" km²")}${fact("Largest",esc(U.disp(pick(ind,U.area,1))))}${fact("Most people",esc(U.disp(pick(ind,U.pop,1))))}</div>`}
<div class="anb"><dt>Countries and territories</dt><div>${L.map(chip).join("")}</div></div>`}
function profile(n){const d=D[n]||{},p=U.prof(n),P=U.pop(n),Ar=U.area(n),G=U.gpc(n),cap=U.capOf(n),a=U.artFor(n),nm=U.disp(n);
const rows=[[d.cap&&d.cap.length>1?"Capitals":"Capital",cap],["Status",d.sov?d.sov.charAt(0).toUpperCase()+d.sov.slice(1):""],["Continent",p.cont?`${p.cont}${p.sub&&p.sub!=p.cont?" · "+p.sub:""}`:""],["Population",P?`${U.people(P)}${d.pop?` (${d.pop[0]})`:""}`:""],["Area",Ar?U.km(Ar):""],["GDP per person",G?"US$"+U.fmt(G)+(d.gdp?` (${d.gdp[0]})`:""):""],["Languages",p.lang],["Currency",p.cur],["Time",d.tz],["Calling code",d.call]].filter(r=>r[1]);
return `<div class="aihd" style="--k:${U.kv(p.cont)}">${U.flag(n,"mid")}<div><h3>${esc(nm)}</h3>${d.off&&d.off!=nm?`<small>${esc(d.off)}</small>`:""}</div><button class="ax" data-close="1" aria-label="Close">×</button></div>
<div class="aloc">${U.loc(n,true)}</div>
${d.note?`<p class="anote">${esc(d.note)}</p>`:""}${rows.length?`<dl>${rows.map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>`:""}
${p.bord.length?`<div class="anb"><dt>Neighbors</dt><div>${p.bord.map(x=>U.idx(x)>=0?chip(x):`<span class="achip">${esc(x)}</span>`).join("")}</div></div>`:""}
<div class="abtns">${D[n]?`<a class="btn sm" href="#/country/${enc(n)}">Fact file ›</a>`:""}${a?`<a class="btn sm" href="#/art/${a.id}">Read the article ›</a>`:""}</div>`}

/* ---------- The view ---------- */
R.atlas=function(pre){window.setCat&&setCat(null);
const opts=U.names.filter(n=>U.idx(n)>=0).map(n=>`<option value="${esc(U.disp(n))}">`).join("");
V.innerHTML=`<h2>Atlas</h2><p class="mu atl-intro">Scroll or pinch to zoom, drag to move. Names of countries, capitals and seas appear as you zoom in.</p>
<div class="atl" id="atl"><div class="atl-map"><div class="atl-tools"><input type="search" id="acq" list="acl" placeholder="Find a country" aria-label="Find a country"><datalist id="acl">${opts}</datalist>
<div class="aview" role="group" aria-label="Map view"><button data-v="globe">🌍 Globe</button><button data-v="flat">🗺️ Flat map</button></div><div class="atl-z"><button class="icon" id="azi" title="Zoom in" aria-label="Zoom in">+</button><button class="icon" id="azo" title="Zoom out" aria-label="Zoom out">−</button><button class="icon" id="azr" title="Show the whole world" aria-label="Show the whole world">🌐</button><button class="icon" id="afs" title="Full screen" aria-label="Full screen" aria-pressed="false">⛶</button></div></div>
<div class="amodes" role="group" aria-label="Map colours">${Object.entries(MODES).map(([k,m])=>`<button data-m="${k}">${m.lab}</button>`).join("")}</div>
<div class="atl-wrap" id="awrap"><svg class="alayer aocean" id="mo" viewBox="0 0 ${MW} ${MH}" aria-hidden="true"><defs><radialGradient id="aoc" cx="50%" cy="46%" r="62%"><stop offset="0" class="o1"/><stop offset="1" class="o2"/></radialGradient></defs><path d="${M.sphere}" class="ocean" fill="url(#aoc)"/><path d="${M.grat}" class="grat"/><path d="${M.sphere}" class="rim"/></svg>
<svg class="map amap" id="mp" viewBox="0 0 ${MW} ${MH}" role="img" aria-label="World map" tabindex="0"><g id="cty">${MC.map((c,i)=>`<path data-i="${i}" d="${c[1]||c[2]}"${c[6]?' class="minor"':""}/>`).join("")}</g><g id="dots"></g></svg>
<svg class="alayer albl" id="ml" viewBox="0 0 ${MW} ${MH}" aria-hidden="true"><g id="slbl" class="lbl sea">${M.SEAS.map(s=>`<text x="${s[1]}" y="${s[2]}" class="s${s[4]}">${esc(s[0])}</text>`).join("")}</g><g id="caps" class="lbl"></g><g id="clbl" class="lbl"></g></svg>
<div class="atl-paper" aria-hidden="true"></div><canvas class="aglc" id="agl" tabindex="0" role="img" aria-label="Interactive globe: drag to spin, scroll or pinch to zoom, select a country"></canvas><div class="atl-tip" id="atip" hidden></div><div class="atl-scale" id="asc">1×</div>
<svg class="atl-mini" id="amini" viewBox="0 0 ${MW} ${MH}" aria-label="Overview map: select to move there"><path d="${M.sphere}" class="mo"/><path d="${M.land}" class="ml"/><rect id="amr" class="mr"/></svg></div>
<div class="alg" id="alg"></div></div>
<aside class="atl-info" id="ai"></aside></div>`;
const svg=$("#mp"),LAY=[svg,$("#mo"),$("#ml")],wrap=$("#awrap"),tip=$("#atip"),atl=$("#atl"),info=$("#ai"),P=[...svg.querySelectorAll("#cty path")];
let vb={x:0,y:0,w:MW},sel=-1,anim=0,focus=null,lod=0,A=MH/MW,raf=0,idle=0;
/* Tiny islands get a dot so they can be seen and tapped */
const TINY=MC.map((c,i)=>i).filter(i=>live(i)&&Math.max(MC[i][3][2]-MC[i][3][0],MC[i][3][3]-MC[i][3][1])<9);
$("#dots").innerHTML=TINY.map(i=>`<circle data-i="${i}" cx="${MC[i][4][0]}" cy="${MC[i][4][1]}"/>`).join("");const DOT={};$("#dots").querySelectorAll("circle").forEach(c=>DOT[c.dataset.i]=c);
/* Capitals */
$("#caps").innerHTML=M.CAP.map(c=>`<g><circle cx="${c[1]}" cy="${c[2]}"/><text x="${c[1]}" y="${c[2]}">${esc(c[0])}</text></g>`).join("");const CG=[...$("#caps").children];
/* Country labels, largest first */
$("#clbl").innerHTML=AREA.map(i=>`<text x="${MC[i][4][0]}" y="${MC[i][4][1]}" data-i="${i}" class="${ARANK[i]<24?"big":ARANK[i]<70?"mid":"sm"}">${esc(lname(MC[i][0]))}</text>`).join("");const CL=[...$("#clbl").children];const SL=[...$("#slbl").children];
/* Measure label widths once, at a font size of 100 map units */
const lblG=[$("#clbl"),$("#caps"),$("#slbl")];lblG.forEach(g=>g.style.fontSize="100px");
const wOf=el=>{try{return el.getComputedTextLength()/100}catch(e){return el.textContent.length*.6}};
const CLW=CL.map(wOf),SLW=SL.map(wOf),CPW=CG.map(g=>wOf(g.lastChild));
const H=()=>vb.w*A;
const clamp=v=>{v.w=Math.min(MW,Math.max(MINW,v.w));const h=v.w*A;v.x=Math.min(MW-v.w,Math.max(0,v.x));v.y=h>=MH?(MH-h)/2:Math.min(MH-h,Math.max(0,v.y));return v};
/* Place labels: oceans and seas, then countries (largest first), then capitals; skip any that would overlap */
function layout(){const r=svg.getBoundingClientRect();if(!r.width)return;const s=r.width/vb.w,k=MW/vb.w,placed=[],x0=vb.x,y0=vb.y,vw=r.width,vh=r.height;
const fit=(a,b,c,d)=>{if(c<0||a>vw||d<0||b>vh)return false;for(const q of placed)if(a<q[2]&&c>q[0]&&b<q[3]&&d>q[1])return false;placed.push([a,b,c,d]);return true};
lblG.forEach(g=>g.style.fontSize=(11/s)+"px");
/* tiny-island dots */
TINY.forEach(i=>{const b=MC[i][3],show=Math.max(b[2]-b[0],b[3]-b[1])*s<7;const c=DOT[i];c.style.display=show?"":"none";if(show)c.setAttribute("r",(3.4/s).toFixed(3))});
/* seas */
const SZ=[1,1.12,1.25,1.5];M.SEAS.forEach((q,j)=>{const el=SL[j],f=11*SZ[q[4]],w=SLW[j]*11,cx=(q[1]-x0)*s,cy=(q[2]-y0)*s;const ok=k>=q[3]&&fit(cx-w/2,cy-f*.7,cx+w/2,cy+f*.4);el.style.visibility=ok?"visible":"hidden"});
/* countries */
const FS={big:13,mid:11.5,sm:10.5};CL.forEach((el,j)=>{const i=+el.dataset.i,c=MC[i],b=c[3],f=FS[el.getAttribute("class")],w=CLW[j]*11,bw=(b[2]-b[0])*s,bh=(b[3]-b[1])*s;let cx=(c[4][0]-x0)*s,cy=(c[4][1]-y0)*s,ok=false,dx=0;
if(bw>=w*.72&&bh>=f*.9)ok=fit(cx-w/2,cy-f*.6,cx+w/2,cy+f*.5);else if(DOT[i]&&DOT[i].style.display!="none"&&k>=2.5){dx=5+w/2;ok=fit(cx+5,cy-f*.6,cx+5+w,cy+f*.5)}
el.style.visibility=ok?"visible":"hidden";if(ok)el.setAttribute("dx",(dx/s).toFixed(3))});
/* capitals */
const cap=k>=3.2;CG.forEach((g,j)=>{const c=M.CAP[j],cx=(c[1]-x0)*s,cy=(c[2]-y0)*s;if(!cap||cx<-5||cy<-5||cx>vw+5||cy>vh+5){g.style.display="none";return}g.style.display="";const ci=g.firstChild;ci.setAttribute("r",(2.6/s).toFixed(3));const f=10.5,w=CPW[j]*11,t=g.lastChild,ok=k>=4.2&&fit(cx+4,cy-f*.55,cx+5+w,cy+f*.45);t.style.visibility=ok?"visible":"hidden";t.setAttribute("dx",(4.5/s).toFixed(3));t.setAttribute("dy",(3.6/s).toFixed(3))});
/* overview rectangle */
const mi=$("#amini"),rr=$("#amr");mi.classList.toggle("on",k>=1.7);rr.setAttribute("x",vb.x);rr.setAttribute("y",vb.y);rr.setAttribute("width",vb.w);rr.setAttribute("height",H())}
const apply=()=>{const sc=$("#asc");if(!sc||!svg.isConnected){cancelAnimationFrame(anim);return}clamp(vb);const VB=`${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${H().toFixed(2)}`;LAY.forEach(l=>l.setAttribute("viewBox",VB));const k=MW/vb.w;sc.textContent=k.toFixed(k<10?1:0).replace(/\.0$/,"")+"×";
const want=k>=LOD?1:0;if(want!=lod){lod=want;P.forEach((p,i)=>p.setAttribute("d",want||!MC[i][1]?MC[i][2]:MC[i][1]))}
wrap.classList.add("moving");clearTimeout(idle);idle=setTimeout(()=>wrap.classList.remove("moving"),200);
if(!raf)raf=requestAnimationFrame(()=>{raf=0;layout()})};
const toMap=(cx,cy)=>{const r=svg.getBoundingClientRect();return[vb.x+(cx-r.left)/r.width*vb.w,vb.y+(cy-r.top)/r.height*H()]};
const zoomAt=(mx,my,f)=>{const nw=Math.min(MW,Math.max(MINW,vb.w/f)),q=nw/vb.w;vb={x:mx-(mx-vb.x)*q,y:my-(my-vb.y)*q,w:nw};apply()};
const animateTo=t=>{cancelAnimationFrame(anim);clamp(t);const s={...vb},t0=performance.now(),Dur=420;const step=n=>{const p=Math.min(1,(n-t0)/Dur),e=1-Math.pow(1-p,3);vb={x:s.x+(t.x-s.x)*e,y:s.y+(t.y-s.y)*e,w:s.w+(t.w-s.w)*e};apply();if(p<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)};
const centerOn=(cx,cy,w)=>animateTo({x:cx-w/2,y:cy-w*A/2,w});
const zoomBtn=f=>{const nw=Math.min(MW,Math.max(MINW,vb.w/f));centerOn(vb.x+vb.w/2,vb.y+H()/2,nw)};
const fitBox=(b,padF)=>{const bw=b[2]-b[0],bh=b[3]-b[1],pad=Math.max(6,Math.max(bw,bh)*(padF||.3));const w=Math.max(bw+pad*2,(bh+pad*2)/A,22);centerOn((b[0]+b[2])/2,(b[1]+b[3])/2,w)};
const home=()=>animateTo({x:0,y:0,w:MW});
/* Colours */
const valOf=i=>{const m=MODES[mode];return m.cat?null:m.f(MC[i][0])};
function paint(){readStops();const m=MODES[mode];
P.forEach((p,i)=>{const n=MC[i][0];let fill="var(--land)",key="none";if(m.cat){if(D[n]){key=U.ck(D[n].ct);fill=`var(--k-${key})`}}else{const v=m.f(n);if(v){fill=ramp(pos(m,v));key="b"+bandOf(m,v)}}p.style.fill=fill;p.dataset.k=key;const dt=DOT[i];if(dt){dt.style.fill=fill;dt.dataset.k=key}});
applyFocus();drawLegend();if(typeof G!="undefined"&&G.on)G.recolor();V.querySelectorAll(".amodes button").forEach(b=>{b.classList.toggle("on",b.dataset.m==mode);b.setAttribute("aria-pressed",b.dataset.m==mode)})}
function applyFocus(){if(typeof G!="undefined"&&G.on)G.dirty();svg.classList.toggle("focus",!!focus);P.forEach(p=>p.classList.toggle("on",!focus||p.dataset.k==focus));Object.values(DOT).forEach(c=>c.classList.toggle("on",!focus||c.dataset.k==focus))}
function drawLegend(){const m=MODES[mode],L=$("#alg");
if(m.cat){const cnt={};P.forEach(p=>cnt[p.dataset.k]=(cnt[p.dataset.k]||0)+1);L.innerHTML=`<span class="alh">Continents</span>${U.CONT.filter(c=>cnt[c[1]]).map(c=>`<button data-k="${c[1]}" class="${focus==c[1]?"on":""}" aria-pressed="${focus==c[1]}" style="--sw:var(--k-${c[1]})"><i></i>${c[0]}<small>${cnt[c[1]]}</small></button>`).join("")}${focus?`<button class="alclr" data-k="">Show all</button>`:""}`}
else{const T=[m.dom[0],...m.ticks,m.dom[1]],bands=T.slice(0,-1).map((a,j)=>[a,T[j+1],j]);
L.innerHTML=`<span class="alh">${m.lab}</span><div class="gbar"><div class="gramp"></div>${bands.map(b=>`<button data-k="b${b[2]}" class="${focus=="b"+b[2]?"on":""}" style="left:${pos(m,b[0])*100}%;width:${(pos(m,b[1])-pos(m,b[0]))*100}%" title="${esc(m.band(b[2]?b[0]:0,b[2]==bands.length-1?0:b[1]))}" aria-label="Show countries with ${esc(m.band(b[2]?b[0]:0,b[2]==bands.length-1?0:b[1]))}"></button>`).join("")}<i class="gmk" id="gmk" hidden></i><div class="gticks">${m.ticks.map((t,j)=>`<span style="left:${pos(m,t)*100}%">${m.tl[j]}</span>`).join("")}</div></div><span class="alnd"><i></i>No data</span>${focus?`<button class="alclr" data-k="">Show all</button>`:""}`}
L.querySelectorAll("button[data-k]").forEach(b=>b.onclick=()=>{const k=b.dataset.k;focus=k&&focus!=k?k:null;applyFocus();drawLegend();
if(m.cat&&focus){const c=U.CONT.find(x=>x[1]==focus)[0];const I=P.map((p,i)=>i).filter(i=>P[i].dataset.k==focus&&live(i));const big=Math.max(...I.map(i=>MC[i][5]));let b=null;I.filter(i=>MC[i][5]>=big*.03).forEach(i=>{const q=MC[i][3];b=b?[Math.min(b[0],q[0]),Math.min(b[1],q[1]),Math.max(b[2],q[2]),Math.max(b[3],q[3])]:q.slice()});if(b)fitBox(b,.08);if(sel<0)showPanel(contPanel(c))}
else if(!focus){if(sel<0)showPanel(worldPanel())}})}
const marker=i=>{const g=$("#gmk"),m=MODES[mode];if(!g||m.cat)return;const v=i>=0?m.f(MC[i][0]):null;if(!v){g.hidden=true;return}g.hidden=false;g.style.left=pos(m,v)*100+"%"};
/* Panel */
const phone=()=>matchMedia("(max-width:820px)").matches;
function showPanel(html,sheet){info.innerHTML=html;info.classList.toggle("sheet",!!sheet&&phone());info.scrollTop=0;
info.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{const i=U.idx(b.dataset.n);if(i>=0)select(i,true)});
info.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>{if(sel>=0)select(-1);else{focus=null;applyFocus();drawLegend();showPanel(worldPanel())}})}
function select(i,fit){svg.querySelectorAll(".sel,.nb").forEach(p=>p.classList.remove("sel","nb"));sel=i;svg.classList.toggle("hassel",i>=0);
if(i<0){if(typeof G!="undefined"&&G.on)G.dirty();history.replaceState(null,"","#/atlas");const c=focus&&MODES[mode].cat?U.CONT.find(x=>x[1]==focus):null;showPanel(c?contPanel(c[0]):worldPanel());return}
const n=MC[i][0],p=P[i];p.classList.add("sel");p.parentNode.appendChild(p);DOT[i]&&DOT[i].classList.add("sel");
((D[n]||{}).bord||[]).forEach(x=>{const j=U.idx(x);if(j>=0){P[j].classList.add("nb");DOT[j]&&DOT[j].classList.add("nb")}});
showPanel(profile(n),true);history.replaceState(null,"","#/atlas/"+enc(n));if(phone()){const r=wrap.getBoundingClientRect();if(r.top<70||r.bottom>innerHeight*.54)scrollTo({top:scrollY+r.top-(innerHeight*.54-r.height>70?innerHeight*.54-r.height:70),behavior:"smooth"})}if(fit){if(typeof G!="undefined"&&G.on)G.focusOn(i);else fitBox(MC[i][3])}if(typeof G!="undefined"&&G.on)G.dirty()}
/* Modes */
V.querySelectorAll(".amodes button").forEach(b=>b.onclick=()=>{mode=b.dataset.m;focus=null;try{localStorage.setItem("atlasMode",mode)}catch(e){}paint();if(sel<0)showPanel(worldPanel())});
/* Scroll zoom */
svg.addEventListener("wheel",e=>{e.preventDefault();cancelAnimationFrame(anim);const[mx,my]=toMap(e.clientX,e.clientY),d=e.deltaMode==1?e.deltaY*16:e.deltaY;zoomAt(mx,my,Math.exp(-d*.0018))},{passive:false});
/* Drag, pinch, tap */
const pts=new Map();let moved=0,start=null,pinch=null,tipI=-1;
const hit=(x,y)=>{const el=document.elementFromPoint(x,y),t=el&&el.closest&&el.closest("#cty [data-i],#dots [data-i]");return t&&live(+t.dataset.i)?+t.dataset.i:-1};
svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);cancelAnimationFrame(anim);moved=0;start=[e.clientX,e.clientY];if(pts.size==2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1])}}svg.classList.add("drag");tip.hidden=true});
svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId)){if(e.pointerType!="mouse")return;const t=e.target.closest&&e.target.closest("[data-i]"),i=t&&live(+t.dataset.i)?+t.dataset.i:-1;
if(i<0){tip.hidden=true;tipI=-1;marker(-1);return}if(i!=tipI){tipI=i;const n=MC[i][0],m=MODES[mode],v=m.cat?(D[n]?D[n].ct:""):(m.f(n)?m.val(m.f(n)):"No data");tip.innerHTML=`${U.flag(n)}<span><b>${esc(U.disp(n))}</b>${v?`<small>${esc(v)}</small>`:""}</span>`;marker(i)}
tip.hidden=false;const r=wrap.getBoundingClientRect(),tw=tip.offsetWidth;let x=e.clientX-r.left+14;if(x+tw>r.width-6)x=e.clientX-r.left-tw-14;tip.style.left=x+"px";tip.style.top=(e.clientY-r.top+14)+"px";return}
const prev=pts.get(e.pointerId),r=svg.getBoundingClientRect();pts.set(e.pointerId,[e.clientX,e.clientY]);moved=Math.max(moved,Math.hypot(e.clientX-start[0],e.clientY-start[1]));
if(pts.size==1){vb.x-=(e.clientX-prev[0])/r.width*vb.w;vb.y-=(e.clientY-prev[1])/r.height*H();apply()}
else if(pts.size==2&&pinch){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),[mx,my]=toMap((a[0]+b[0])/2,(a[1]+b[1])/2);if(pinch.d>0)zoomAt(mx,my,d/pinch.d);pinch={d};moved=99}});
const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){svg.classList.remove("drag");if(moved<6&&e.type=="pointerup"){const i=hit(e.clientX,e.clientY);if(i>=0)select(i,false)}}};
svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);svg.addEventListener("pointerleave",()=>{if(!pts.size){tip.hidden=true;tipI=-1;marker(-1)}});
svg.addEventListener("dblclick",e=>{const[mx,my]=toMap(e.clientX,e.clientY);centerOn(mx,my,Math.max(MINW,vb.w/2))});
svg.addEventListener("keydown",e=>{const s=vb.w*.15;if(e.key=="+"||e.key=="=")zoomBtn(1.6);else if(e.key=="-")zoomBtn(1/1.6);else if(e.key=="0")home();else if(e.key.startsWith("Arrow")){vb.x+=e.key=="ArrowLeft"?-s:e.key=="ArrowRight"?s:0;vb.y+=e.key=="ArrowUp"?-s/2:e.key=="ArrowDown"?s/2:0;apply()}else return;e.preventDefault()});
$("#azi").onclick=()=>G.on?G.zoom(1.8):zoomBtn(1.8);$("#azo").onclick=()=>G.on?G.zoom(1/1.8):zoomBtn(1/1.8);$("#azr").onclick=()=>G.on?G.home():animateTo({x:0,y:0,w:MW});
/* Overview map */
const mini=$("#amini");const miniGo=e=>{const r=mini.getBoundingClientRect();centerOn((e.clientX-r.left)/r.width*MW,(e.clientY-r.top)/r.height*MH,vb.w)};mini.addEventListener("click",miniGo);
/* Full screen */
const fsBtn=$("#afs");const setFull=on=>{atl.classList.toggle("full",on);document.documentElement.classList.toggle("atl-lock",on);fsBtn.setAttribute("aria-pressed",on);fsBtn.title=on?"Leave full screen":"Full screen";fsBtn.textContent=on?"✕":"⛶";requestAnimationFrame(()=>{measure();apply();if(G.on)G.setOn(true)})};
fsBtn.onclick=()=>setFull(!atl.classList.contains("full"));
const onKey=e=>{if(!svg.isConnected){removeEventListener("keydown",onKey);return}if(e.key=="Escape"&&atl.classList.contains("full"))setFull(false)};addEventListener("keydown",onKey);
addEventListener("hashchange",()=>document.documentElement.classList.remove("atl-lock"),{once:true});
/* Search */
$("#acq").addEventListener("change",e=>{const v=e.target.value.trim().toLowerCase();if(!v)return;const ok=n=>n.toLowerCase()==v||U.disp(n).toLowerCase()==v;let i=MC.findIndex(c=>live(MC.indexOf(c))&&ok(c[0]));if(i<0)i=MC.findIndex((c,j)=>live(j)&&(c[0].toLowerCase().startsWith(v)||U.disp(c[0]).toLowerCase().startsWith(v)));if(i>=0){select(i,true);e.target.value=U.disp(MC[i][0]);e.target.blur()}});
/* Size and theme */
const measure=()=>{const r=svg.getBoundingClientRect();if(r.width)A=r.height/r.width};
if(window.ResizeObserver){const ro=new ResizeObserver(()=>{if(!svg.isConnected){ro.disconnect();return}const a=A;measure();if(Math.abs(a-A)>.001)apply();else{if(!raf)raf=requestAnimationFrame(()=>{raf=0;layout()})}});ro.observe(wrap)}
const mo=new MutationObserver(()=>{if(!svg.isConnected){mo.disconnect();return}paint()});mo.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
/* ---------- 3D globe view (v179) ---------- */
const G=(()=>{const cv=$("#agl"),g=cv.getContext("2d");let on=false,W=0,Hh=0,dpr=Math.min(2,devicePixelRatio||1),rot={l:-.2,p:.32},z=1,tgt=null,vel={l:0,p:0},spin=!matchMedia("(prefers-reduced-motion: reduce)").matches,drag=null,moving=0,loopOn=false,cols=[],dark=false,stars=[];
const geo=()=>{if(!GLO.lo){GLO.lo=MC.map(c=>window.EPLL?window.EPLL(c[1]||c[2]):[]);GLO.bb=GLO.lo.map(rs=>{let a=9,b=9,c2=-9,d=-9;rs.forEach(r=>{for(let i=0;i<r.length;i+=2){const x=r[i],y=r[i+1];if(x<a)a=x;if(x>c2)c2=x;if(y<b)b=y;if(y>d)d=y}});return[a,b,c2,d]});
  GLO.lp=MC.map((c,i)=>c[4]&&window.EPINV?window.EPINV(c[4][0],c[4][1]):[(GLO.bb[i][0]+GLO.bb[i][2])/2,(GLO.bb[i][1]+GLO.bb[i][3])/2]);GLO.cap=M.CAP.map(c=>window.EPINV(c[1],c[2]));GLO.sea=M.SEAS.map(s=>window.EPINV(s[1],s[2]));
  const idle=window.requestIdleCallback||(f=>setTimeout(f,400));idle(()=>{GLO.hi=MC.map(c=>c[2]&&window.EPLL?window.EPLL(c[2]):null);dirty()})}};
const size=()=>{const r=wrap.getBoundingClientRect();W=r.width;Hh=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(Hh*dpr);dirty()};
const R0=()=>Math.min(W,Hh)/2*.9,Rr=()=>R0()*z;
const proj=(l,p)=>{const c0=Math.cos(rot.p),s0=Math.sin(rot.p),dl=l-rot.l,cp=Math.cos(p),sp=Math.sin(p),cd=Math.cos(dl);return[cp*Math.sin(dl),c0*sp-s0*cp*cd,s0*sp+c0*cp*cd]};
const unproj=(sx,sy)=>{const R=Rr(),x=(sx-W/2)/R,y=(Hh/2-sy)/R,q=x*x+y*y;if(q>1)return null;const zz=Math.sqrt(1-q),c0=Math.cos(rot.p),s0=Math.sin(rot.p);const p=Math.asin(Math.max(-1,Math.min(1,y*c0+zz*s0)));let l=rot.l+Math.atan2(x,zz*c0-y*s0);l=((l+Math.PI*3)%(Math.PI*2))-Math.PI;return[l,p]};
function recolor(){if(!on)return;const cs=getComputedStyle(document.documentElement);const bg=cs.getPropertyValue("--bg").trim();const h=bg.replace("#","");dark=h.length>=6?(parseInt(h.slice(0,2),16)*.3+parseInt(h.slice(2,4),16)*.59+parseInt(h.slice(4,6),16)*.11)<110:/rgb\((\d+)/.test(bg)&&+RegExp.$1<90;
  cols=P.map(p=>{const f=p.style.fill||"";const m=f.match(/var\((--[\w-]+)\)/);return m?(cs.getPropertyValue(m[1]).trim()||"#8a8"):(f||cs.getPropertyValue("--land").trim()||"#8a8")});if(!stars.length){let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<160;i++)stars.push([r(),r(),r()*1.3+.3,r()])}dirty()}
let need=true;const dirty=()=>{need=true;if(!loopOn&&on){loopOn=true;requestAnimationFrame(loop)}};
let last=performance.now();
function loop(t){if(!on||!cv.isConnected){loopOn=false;return}const dt=Math.min(50,t-last);last=t;let anim=false;
  if(!drag){if(tgt){let dl=((tgt.l-rot.l+Math.PI*3)%(Math.PI*2))-Math.PI;const k=Math.min(1,dt*.0045);rot.l+=dl*k;rot.p+=(tgt.p-rot.p)*k;z+=(tgt.z-z)*k;if(Math.abs(dl)<.001&&Math.abs(tgt.p-rot.p)<.001&&Math.abs(tgt.z-z)<.005)tgt=null;anim=true}
    else if(Math.abs(vel.l)+Math.abs(vel.p)>1e-5){rot.l+=vel.l*dt;rot.p=Math.max(-1.45,Math.min(1.45,rot.p+vel.p*dt));vel.l*=Math.pow(.94,dt/16);vel.p*=Math.pow(.94,dt/16);anim=true}
    else if(spin&&sel<0&&!document.hidden){rot.l+=dt*.00009;anim="spin"}}
  if(anim&&anim!=="spin")moving=t;if(tgt){tip.hidden=true;tipI2=-1}if(need||anim){draw(t-moving<220);need=false}
  if(anim||drag||t-moving<260)requestAnimationFrame(loop);else{loopOn=false;draw(false)}}
function path(r,R,cx,cy){let vis=0;g.beginPath();for(let i=0;i<r.length;i+=2){let q=proj(r[i],r[i+1]);if(q[2]>0)vis++;else{const m=Math.hypot(q[0],q[1])||1;q=[q[0]/m,q[1]/m]}const X=cx+q[0]*R,Y=cy-q[1]*R;i?g.lineTo(X,Y):g.moveTo(X,Y)}return vis}
function draw(fast){if(!W)return;g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,Hh);const R=Rr(),cx=W/2,cy=Hh/2;
  if(dark){g.fillStyle="#fff";stars.forEach(s=>{g.globalAlpha=.25+s[3]*.6;g.beginPath();g.arc(s[0]*W,s[1]*Hh,s[2],0,7);g.fill()});g.globalAlpha=1}
  const glow=g.createRadialGradient(cx,cy,R*.92,cx,cy,R*1.12);glow.addColorStop(0,dark?"rgba(110,170,255,.5)":"rgba(90,160,240,.38)");glow.addColorStop(1,"rgba(110,170,255,0)");g.fillStyle=glow;g.beginPath();g.arc(cx,cy,R*1.12,0,7);g.fill();
  const sea=g.createRadialGradient(cx-R*.35,cy-R*.4,R*.1,cx,cy,R);sea.addColorStop(0,dark?"#1e4766":"#d4f1fb");sea.addColorStop(.6,dark?"#112d47":"#8fcbe3");sea.addColorStop(1,dark?"#08182b":"#4f97bd");g.fillStyle=sea;g.beginPath();g.arc(cx,cy,R,0,7);g.fill();
  g.save();g.beginPath();g.arc(cx,cy,R,0,7);g.clip();
  g.strokeStyle="rgba(255,255,255,.16)";g.lineWidth=.7;const step=z>4?10:z>2?15:30;
  for(let la=-90+step;la<90;la+=step){g.beginPath();let pen=false;for(let lo=-180;lo<=180;lo+=4){const q=proj(lo*Math.PI/180,la*Math.PI/180);if(q[2]>0){const X=cx+q[0]*R,Y=cy-q[1]*R;pen?g.lineTo(X,Y):g.moveTo(X,Y);pen=true}else pen=false}g.stroke()}
  for(let lo=-180;lo<180;lo+=step){g.beginPath();let pen=false;for(let la=-90;la<=90;la+=4){const q=proj(lo*Math.PI/180,la*Math.PI/180);if(q[2]>0){const X=cx+q[0]*R,Y=cy-q[1]*R;pen?g.lineTo(X,Y):g.moveTo(X,Y);pen=true}else pen=false}g.stroke()}
  const src=(!fast&&z>=1.8&&GLO.hi)?GLO.hi:GLO.lo;const fk=focus,selC=sel;
  for(let i=0;i<MC.length;i++){if(!live(i))continue;const rs=(src[i]||GLO.lo[i]);if(!rs||!rs.length)continue;const lp=GLO.lp[i];if(lp){const q=proj(lp[0],lp[1]);const bb=GLO.bb[i];const span=Math.max(bb[2]-bb[0],bb[3]-bb[1]);if(q[2]<-.2&&span<1.2)continue}
    const isSel=i==selC,nb=P[i].classList.contains("nb");g.globalAlpha=fk&&P[i].dataset.k!=fk?.22:1;g.fillStyle=isSel?"#ffd23f":(cols[i]||"#8a8");g.strokeStyle=isSel?"#fff":nb?"rgba(255,255,255,.95)":"rgba(255,255,255,.42)";g.lineWidth=isSel?2:nb?1.3:.55;
    for(const r of rs){if(path(r,R,cx,cy)>1){g.closePath();g.fill();g.stroke()}}}
  g.globalAlpha=1;
  /* tiny islands */
  TINY.forEach(i=>{const lp=GLO.lp[i];if(!lp)return;const q=proj(lp[0],lp[1]);if(q[2]<=0)return;g.fillStyle=i==selC?"#ffd23f":(cols[i]||"#8a8");g.globalAlpha=fk&&P[i].dataset.k!=fk?.22:1;g.beginPath();g.arc(cx+q[0]*R,cy-q[1]*R,Math.max(2.4,Math.min(5,1.6*z)),0,7);g.fill();g.strokeStyle="rgba(255,255,255,.7)";g.lineWidth=.8;g.stroke()});g.globalAlpha=1;
  /* shading */
  const sh=g.createRadialGradient(cx-R*.4,cy-R*.45,R*.05,cx,cy,R*1.02);sh.addColorStop(0,"rgba(255,255,255,.28)");sh.addColorStop(.4,"rgba(255,255,255,0)");sh.addColorStop(1,dark?"rgba(0,0,20,.5)":"rgba(0,10,40,.32)");g.fillStyle=sh;g.fillRect(0,0,W,Hh);
  /* labels */
  if(!fast)labels(R,cx,cy);
  g.restore();g.strokeStyle=dark?"rgba(160,200,255,.5)":"rgba(255,255,255,.7)";g.lineWidth=1.2;g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();
  const sc=$("#asc");if(sc)sc.textContent=(z<10?z.toFixed(1):Math.round(z)).replace(/\.0$/,"")+"×"}
function labels(R,cx,cy){const placed=[];const fit=(a,b,c,d)=>{if(c<0||a>W||d<0||b>Hh)return false;for(const q of placed)if(a<q[2]&&c>q[0]&&b<q[3]&&d>q[1])return false;placed.push([a,b,c,d]);return true};
  g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";
  M.SEAS.forEach((s,j)=>{const big=s[4]>=2;if(!(big||z>=2.4))return;const ll=GLO.sea[j];const q=proj(ll[0],ll[1]);if(q[2]<.25)return;const f=big?13+z:11+z*.6;g.font=`italic 600 ${Math.min(f,20)}px system-ui,sans-serif`;const w=g.measureText(s[0]).width;const X=cx+q[0]*R,Y=cy-q[1]*R;if(!fit(X-w/2,Y-f/2,X+w/2,Y+f/2))return;g.fillStyle="rgba(220,238,255,.75)";g.fillText(s[0],X,Y)});
  const lim=z<1.4?22:z<2.2?55:z<3.5?110:z<6?200:999;
  AREA.forEach(i=>{if(ARANK[i]>=lim)return;const lp=GLO.lp[i];if(!lp)return;const q=proj(lp[0],lp[1]);if(q[2]<.42)return;const big=ARANK[i]<24;const f=big?12.5:ARANK[i]<70?11.5:10.5;g.font=`${big?800:700} ${f}px system-ui,sans-serif`;const t=big&&z<2.5?lname(MC[i][0]).toUpperCase():lname(MC[i][0]);const w=g.measureText(t).width;const X=cx+q[0]*R,Y=cy-q[1]*R;
    if(!fit(X-w/2-2,Y-f/2-1,X+w/2+2,Y+f/2+1))return;g.strokeStyle="rgba(0,0,0,.55)";g.lineWidth=3;g.strokeText(t,X,Y);g.fillStyle=i==sel?"#ffd23f":"#fff";g.fillText(t,X,Y)});
  if(z>=3.2)M.CAP.forEach((c,j)=>{const ll=GLO.cap[j];const q=proj(ll[0],ll[1]);if(q[2]<.3)return;const X=cx+q[0]*R,Y=cy-q[1]*R;if(X<-5||Y<-5||X>W+5||Y>Hh+5)return;g.fillStyle="#fff";g.strokeStyle="rgba(0,0,0,.6)";g.lineWidth=1.4;g.beginPath();g.arc(X,Y,2.6,0,7);g.fill();g.stroke();
    if(z<4.2)return;g.font="600 10.5px system-ui,sans-serif";g.textAlign="left";const w=g.measureText(c[0]).width;if(fit(X+4,Y-6,X+6+w,Y+6)){g.lineWidth=3;g.strokeText(c[0],X+5,Y);g.fillText(c[0],X+5,Y)}g.textAlign="center"})}
function hitAt(sx,sy){const ll=unproj(sx,sy);if(!ll)return -1;const R=Rr();
  for(const i of TINY){const lp=GLO.lp[i];if(!lp)continue;const q=proj(lp[0],lp[1]);if(q[2]<=0)continue;if(Math.hypot(W/2+q[0]*R-sx,Hh/2-q[1]*R-sy)<8)return i}
  const[l,p]=ll;let best=-1;for(let i=0;i<MC.length;i++){if(!live(i))continue;const b=GLO.bb[i];if(!b||l<b[0]-1e-4||l>b[2]+1e-4||p<b[1]-1e-4||p>b[3]+1e-4)continue;let inside=false;for(const r of GLO.lo[i]){for(let a=0,c=r.length-2;a<r.length;c=a,a+=2){const xi=r[a],yi=r[a+1],xj=r[c],yj=r[c+1];if(((yi>p)!=(yj>p))&&(l<(xj-xi)*(p-yi)/(yj-yi)+xi))inside=!inside}}if(inside){best=i;break}}return best}
function focusOn(i){tip.hidden=true;const lp=GLO.lp[i];if(!lp)return;const b=GLO.bb[i];const span=Math.max((b[2]-b[0])*Math.cos(lp[1]),b[3]-b[1]);const zz=Math.max(1.1,Math.min(10,1.1/(span+.06)));tgt={l:lp[0],p:Math.max(-1.3,Math.min(1.3,lp[1])),z:zz};vel={l:0,p:0};dirty()}
const pts=new Map();let pinch=null,moved=0,st=null,lastMv=null,tipI2=-1;
cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);tgt=null;vel={l:0,p:0};moved=0;st=[e.clientX,e.clientY];drag={l:rot.l,p:rot.p,x:e.clientX,y:e.clientY};lastMv=[e.clientX,e.clientY,performance.now()];if(pts.size==2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),z}}tip.hidden=true;cv.classList.add("drag");dirty()});
cv.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();if(!pts.has(e.pointerId)){if(e.pointerType!="mouse")return;const i=hitAt(e.clientX-r.left,e.clientY-r.top);if(i<0){tip.hidden=true;tipI2=-1;marker(-1);return}if(i!=tipI2){tipI2=i;const n=MC[i][0],m=MODES[mode],v=m.cat?(D[n]?D[n].ct:""):(m.f(n)?m.val(m.f(n)):"No data");tip.innerHTML=`${U.flag(n)}<span><b>${esc(U.disp(n))}</b>${v?`<small>${esc(v)}</small>`:""}</span>`;marker(i)}
  tip.hidden=false;const tw=tip.offsetWidth;let x=e.clientX-r.left+14;if(x+tw>r.width-6)x=e.clientX-r.left-tw-14;tip.style.left=x+"px";tip.style.top=(e.clientY-r.top+14)+"px";return}
  pts.set(e.pointerId,[e.clientX,e.clientY]);moved=Math.max(moved,Math.hypot(e.clientX-st[0],e.clientY-st[1]));
  if(pts.size==1&&drag){const R=Rr(),now=performance.now();rot.l=drag.l-(e.clientX-drag.x)/R;rot.p=Math.max(-1.45,Math.min(1.45,drag.p+(e.clientY-drag.y)/R));const dtm=Math.max(1,now-lastMv[2]);vel={l:-(e.clientX-lastMv[0])/R/dtm,p:(e.clientY-lastMv[1])/R/dtm};lastMv=[e.clientX,e.clientY,now];moving=now;dirty()}
  else if(pts.size==2&&pinch){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);z=Math.max(1,Math.min(14,pinch.z*d/pinch.d));moved=99;moving=performance.now();dirty()}});
const endP=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(pts.size==1){const[v]=[...pts.values()];drag={l:rot.l,p:rot.p,x:v[0],y:v[1]}}
  if(!pts.size){drag=null;cv.classList.remove("drag");if(performance.now()-lastMv[2]>80)vel={l:0,p:0};if(moved<6&&e.type=="pointerup"){vel={l:0,p:0};const r=cv.getBoundingClientRect();const i=hitAt(e.clientX-r.left,e.clientY-r.top);if(i>=0)select(i,true)}dirty()}};
cv.addEventListener("pointerup",endP);cv.addEventListener("pointercancel",endP);cv.addEventListener("pointerleave",()=>{if(!pts.size){tip.hidden=true;tipI2=-1;marker(-1)}});
cv.addEventListener("wheel",e=>{e.preventDefault();const d=e.deltaMode==1?e.deltaY*16:e.deltaY;z=Math.max(1,Math.min(14,z*Math.exp(-d*.0016)));tgt=null;moving=performance.now();dirty()},{passive:false});
cv.addEventListener("dblclick",e=>{const r=cv.getBoundingClientRect(),ll=unproj(e.clientX-r.left,e.clientY-r.top);if(ll){tgt={l:ll[0],p:ll[1],z:Math.min(14,z*2)};dirty()}});
cv.addEventListener("keydown",e=>{const s=.25/z;if(e.key=="+"||e.key=="=")zoom(1.6);else if(e.key=="-")zoom(1/1.6);else if(e.key=="0")home2();else if(e.key.startsWith("Arrow")){tgt={l:rot.l+(e.key=="ArrowLeft"?-s:e.key=="ArrowRight"?s:0),p:Math.max(-1.3,Math.min(1.3,rot.p+(e.key=="ArrowUp"?s:e.key=="ArrowDown"?-s:0))),z};dirty()}else return;e.preventDefault()});
const zoom=f=>{tgt={l:(tgt||rot).l,p:(tgt||rot).p,z:Math.max(1,Math.min(14,(tgt?tgt.z:z)*f))};dirty()};
const home2=()=>{tgt={l:rot.l,p:.3,z:1};dirty()};
if(window.ResizeObserver){const ro=new ResizeObserver(()=>{if(!cv.isConnected){ro.disconnect();return}if(on)size()});ro.observe(wrap)}
function setOn(v){on=v;wrap.classList.toggle("isglobe",v);V.querySelectorAll(".aview button").forEach(b=>{b.classList.toggle("on",(b.dataset.v=="globe")==v);b.setAttribute("aria-pressed",(b.dataset.v=="globe")==v)});try{localStorage.setItem("atlasView",v?"globe":"flat")}catch(e){}
  if(v){geo();size();recolor();if(sel>=0)focusOn(sel);dirty()}else{tip.hidden=true;apply()}}
return{get on(){return on},setOn,recolor,focusOn,zoom,home:home2,dirty}})();
V.querySelectorAll(".aview button").forEach(b=>b.onclick=()=>G.setOn(b.dataset.v=="globe"));
measure();paint();showPanel(worldPanel());vb=clamp({x:0,y:0,w:MW});apply();
let GV="globe";try{GV=localStorage.getItem("atlasView")||"globe"}catch(e){}G.setOn(GV!="flat");
if(pre){const n=decodeURIComponent(pre),i=U.idx(n)>=0?U.idx(n):MC.findIndex(c=>U.disp(c[0])==n);if(i>=0)setTimeout(()=>select(i,true),60)}
document.title="Atlas · Encyclopedia Premium"};
})();
