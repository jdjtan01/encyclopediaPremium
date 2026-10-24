/* Atlas: an interactive world map with scroll and pinch zoom, drag to pan, hover names with flags,
   country search, map modes (continents, population, density, wealth) with a clickable legend,
   and a profile panel. Address: #/atlas or #/atlas/<country>. Uses window.CUI from ui/countries.js. */
(()=>{
const W=window.WORLD||[],U=window.CUI,D=U.D,enc=encodeURIComponent,MINW=360/48,BB=U.BB;
/* Map modes. Each gives a class key for every country, its legend and a tooltip value. */
const bins=(f,cuts,labels)=>({key:n=>{const v=f(n);if(v==null)return"none";let k=0;while(k<cuts.length&&v>=cuts[k])k++;return"q"+(k+1)},legend:labels.map((l,i)=>["q"+(i+1),l,`var(--q${i+1})`])});
const MODES={
cont:{lab:"Continents",key:n=>D[n]?U.ck(D[n].ct):"none",legend:U.CONT.map(c=>[c[1],c[0],`var(--k-${c[1]})`]),val:n=>D[n]?D[n].ct:""},
pop:{lab:"Population",...bins(U.pop,[1e6,1e7,5e7,1e8,1e9],["Under 1 million","1–10 million","10–50 million","50–100 million","100 million–1 billion","Over 1 billion"]),val:n=>U.pop(n)?U.people(U.pop(n))+" people":"No data"},
dens:{lab:"People per km²",...bins(U.dens,[10,50,100,250,500],["Under 10","10–50","50–100","100–250","250–500","Over 500"]),val:n=>U.dens(n)?U.fmt(Math.round(U.dens(n)))+" people per km²":"No data"},
gpc:{lab:"GDP per person",...bins(U.gpc,[1000,4000,13000,30000,60000],["Under US$1,000","US$1,000–4,000","US$4,000–13,000","US$13,000–30,000","US$30,000–60,000","Over US$60,000"]),val:n=>U.gpc(n)?"US$"+U.fmt(U.gpc(n))+" per person":"No data"}};
let mode="cont";try{const m=localStorage.getItem("atlasMode");if(MODES[m])mode=m}catch(e){}
function profile(n){const d=D[n]||{},p=U.prof(n),P=U.pop(n),Ar=U.area(n),G=U.gpc(n),cap=U.capOf(n),a=U.artFor(n),nm=U.disp(n);
const rows=[[d.cap&&d.cap.length>1?"Capitals":"Capital",cap],["Continent",p.cont?`${p.cont}${p.sub&&p.sub!=p.cont?" · "+p.sub:""}`:""],["Population",P?`${U.people(P)}${d.pop?` (${d.pop[0]})`:""}`:""],["Area",Ar?U.fmt(Math.round(Ar))+" km²":""],["GDP per person",G?"US$"+U.fmt(G)+(d.gdp?` (${d.gdp[0]})`:""):""],["Languages",p.lang],["Currency",p.cur],["Time",d.tz],["Calling code",d.call]].filter(r=>r[1]);
return `<div class="aihd" style="--k:${U.kv(p.cont)}">${U.flag(n,"mid")}<div><h3>${esc(nm)}</h3>${d.off&&d.off!=nm?`<small>${esc(d.off)}</small>`:""}</div></div>
${d.note?`<p class="anote">${esc(d.note)}</p>`:""}${rows.length?`<dl>${rows.map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>`:`<p class="mu">No profile yet.</p>`}
${p.bord.length?`<div class="anb"><dt>Neighbors</dt><div>${p.bord.map(x=>U.idx(x)>=0?`<button data-n="${esc(x)}" title="Show ${esc(U.disp(x))}">${U.flag(x)}${esc(U.disp(x))}</button>`:`<span>${esc(x)}</span>`).join("")}</div></div>`:""}
<div class="abtns">${D[n]||window.PROF&&PROF[n]?`<a class="btn sm" href="#/country/${enc(n)}">Fact file ›</a>`:""}${a?`<a class="btn sm" href="#/art/${a.id}">Read the article ›</a>`:""}</div>`}

R.atlas=function(pre){window.setCat&&setCat(null);
V.innerHTML=`<h2>Atlas</h2><p class="mu" style="font:14px system-ui;margin-top:-4px">Scroll or pinch to zoom, drag to move, and select a country to see its profile. Choose what the colours show, and select a legend entry to pick out one group.</p>
<div class="atl"><div class="atl-map"><div class="atl-tools"><input type="search" id="acq" list="acl" placeholder="Find a country" aria-label="Find a country"><datalist id="acl">${W.map(c=>`<option value="${esc(c[0])}">`).join("")}</datalist>
<div class="atl-z"><button class="icon" id="azi" title="Zoom in" aria-label="Zoom in">+</button><button class="icon" id="azo" title="Zoom out" aria-label="Zoom out">−</button><button class="icon" id="azr" title="Show the whole world" aria-label="Show the whole world">⤢</button></div></div>
<div class="amodes" role="tablist" aria-label="Map colours">${Object.entries(MODES).map(([k,m])=>`<button role="tab" data-m="${k}">${m.lab}</button>`).join("")}</div>
<div class="atl-wrap"><svg class="map amap" id="mp" viewBox="0 0 360 180" role="img" aria-label="World map" tabindex="0"><rect x="-360" y="-10" width="1080" height="200" class="sea"/>
<g class="grat">${[30,60,90,120,150,180,210,240,270,300,330].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="180"/>`).join("")}${[30,60,120,150].map(y=>`<line x1="0" y1="${y}" x2="360" y2="${y}"/>`).join("")}<line class="eq" x1="0" y1="90" x2="360" y2="90"/></g>
<g id="cty">${W.map((c,i)=>`<path data-i="${i}" d="${c[1]}"/>`).join("")}</g></svg><div class="atl-tip" id="atip" hidden></div><div class="atl-scale" id="asc">1×</div></div>
<div class="alg" id="alg"></div></div>
<aside class="atl-info" id="ai"><h3>No country selected</h3><p class="mu">Select a country on the map or search for one by name. ${U.names.length} countries and territories have flags and profiles.</p><p><a class="btn sm" href="#/countries">Browse all countries ›</a> <a class="btn sm" href="#/flags">Flag quiz ›</a></p></aside></div>`;
const svg=$("#mp"),tip=$("#atip"),wrap=svg.parentNode,P=[...svg.querySelectorAll("#cty path")];let vb={x:0,y:0,w:360},sel=-1,anim=0,focus=null;
const H=()=>vb.w/2;
const clamp=v=>{v.w=Math.min(360,Math.max(MINW,v.w));v.x=Math.min(360-v.w,Math.max(0,v.x));v.y=Math.min(180-v.w/2,Math.max(0,v.y));return v};
const apply=()=>{clamp(vb);svg.setAttribute("viewBox",`${vb.x.toFixed(3)} ${vb.y.toFixed(3)} ${vb.w.toFixed(3)} ${H().toFixed(3)}`);const sc=$("#asc");if(!sc||!svg.isConnected){cancelAnimationFrame(anim);return}sc.textContent=(360/vb.w).toFixed(360/vb.w<10?1:0).replace(/\.0$/,"")+"×"};
const toMap=(cx,cy)=>{const r=svg.getBoundingClientRect();return[vb.x+(cx-r.left)/r.width*vb.w,vb.y+(cy-r.top)/r.height*H()]};
const zoomAt=(mx,my,f)=>{const nw=Math.min(360,Math.max(MINW,vb.w/f)),k=nw/vb.w;vb={x:mx-(mx-vb.x)*k,y:my-(my-vb.y)*k,w:nw};apply()};
const animateTo=t=>{cancelAnimationFrame(anim);clamp(t);const s={...vb},t0=performance.now(),Dur=380;const step=n=>{const p=Math.min(1,(n-t0)/Dur),e=1-Math.pow(1-p,3);vb={x:s.x+(t.x-s.x)*e,y:s.y+(t.y-s.y)*e,w:s.w+(t.w-s.w)*e};apply();if(p<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)};
const zoomBtn=f=>{const cx=vb.x+vb.w/2,cy=vb.y+H()/2,nw=Math.min(360,Math.max(MINW,vb.w/f));animateTo({x:cx-nw/2,y:cy-nw/4,w:nw})};
const fitBox=b=>{const pad=Math.max(4,(b[2]-b[0])*.12,(b[3]-b[1])*.25);let w=Math.max(b[2]-b[0]+pad*2,(b[3]-b[1]+pad*2)*2,12);const cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;animateTo({x:cx-w/2,y:cy-w/4,w})};
const fitTo=i=>{const b=BB[i],pad=Math.max(4,(b[2]-b[0])*.25,(b[3]-b[1])*.5);let w=Math.max(b[2]-b[0]+pad*2,(b[3]-b[1]+pad)*2,12);const cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;animateTo({x:cx-w/2,y:cy-w/4,w})};
/* Colour the map for the current mode and draw its legend */
const paint=()=>{const M=MODES[mode],cnt={};P.forEach((p,i)=>{const k=M.key(W[i][0]);p.dataset.k=k;cnt[k]=(cnt[k]||0)+1;const L=M.legend.find(l=>l[0]==k);p.style.fill=L?L[2]:"var(--land)"});
svg.classList.toggle("focus",!!focus);P.forEach(p=>p.classList.toggle("on",!focus||p.dataset.k==focus));
V.querySelectorAll(".amodes button").forEach(b=>{b.classList.toggle("on",b.dataset.m==mode);b.setAttribute("aria-selected",b.dataset.m==mode)});
$("#alg").innerHTML=`<span class="alh">${M.lab}</span>${M.legend.filter(l=>cnt[l[0]]).map(l=>`<button data-k="${l[0]}" class="${focus==l[0]?"on":""}" aria-pressed="${focus==l[0]}" style="--sw:${l[2]}"><i></i>${esc(l[1])}<small>${cnt[l[0]]}</small></button>`).join("")}${cnt.none&&mode!="cont"?`<span class="alnd"><i></i>No data</span>`:""}${focus?`<button class="alclr" data-k="">Show all</button>`:""}`;
$("#alg").querySelectorAll("button").forEach(b=>b.onclick=()=>{const k=b.dataset.k;focus=k&&focus!=k?k:null;paint();if(focus&&mode=="cont"){let x0=360,y0=180,x1=0,y1=0;P.forEach((p,i)=>{if(p.dataset.k!=focus)return;const bb=BB[i];if(bb[2]-bb[0]>300)return;x0=Math.min(x0,bb[0]);y0=Math.min(y0,bb[1]);x1=Math.max(x1,bb[2]);y1=Math.max(y1,bb[3])});if(x1>x0)fitBox([x0,y0,x1,y1])}else if(!focus)animateTo({x:0,y:0,w:360})})};
const bindInfo=()=>$("#ai").querySelectorAll("button[data-n]").forEach(b=>b.onclick=()=>{const i=U.idx(b.dataset.n);if(i>=0)select(i,true)});
function select(i,fit){svg.querySelectorAll("path.sel").forEach(p=>p.classList.remove("sel"));sel=i;if(i<0){$("#ai").innerHTML=`<h3>No country selected</h3>`;return}const p=P[i];p.classList.add("sel");p.parentNode.appendChild(p);$("#ai").innerHTML=profile(W[i][0]);bindInfo();history.replaceState(null,"","#/atlas/"+enc(W[i][0]));if(fit)fitTo(i)}
V.querySelectorAll(".amodes button").forEach(b=>b.onclick=()=>{mode=b.dataset.m;focus=null;try{localStorage.setItem("atlasMode",mode)}catch(e){}paint()});
/* Scroll zoom */
svg.addEventListener("wheel",e=>{e.preventDefault();cancelAnimationFrame(anim);const[mx,my]=toMap(e.clientX,e.clientY),d=e.deltaMode==1?e.deltaY*16:e.deltaY;zoomAt(mx,my,Math.exp(-d*.0018))},{passive:false});
/* Drag, pinch, tap */
const pts=new Map();let moved=0,start=null,pinch=null,tipN="";
svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);cancelAnimationFrame(anim);moved=0;start=[e.clientX,e.clientY];if(pts.size==2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),w:vb.w}}svg.classList.add("drag");tip.hidden=true});
svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId)){/* hover */const t=e.target.closest&&e.target.closest("path[data-i]");if(t&&e.pointerType=="mouse"){const n=W[t.dataset.i][0];if(n!=tipN){tipN=n;const v=MODES[mode].val(n);tip.innerHTML=`${U.flag(n)}<span><b>${esc(U.disp(n))}</b>${v?`<small>${esc(v)}</small>`:""}</span>`}tip.hidden=false;const r=wrap.getBoundingClientRect(),tw=tip.offsetWidth;let x=e.clientX-r.left+14;if(x+tw>r.width-6)x=e.clientX-r.left-tw-14;tip.style.left=x+"px";tip.style.top=(e.clientY-r.top+14)+"px"}else{tip.hidden=true;tipN=""}return}
const prev=pts.get(e.pointerId),r=svg.getBoundingClientRect();pts.set(e.pointerId,[e.clientX,e.clientY]);moved=Math.max(moved,Math.hypot(e.clientX-start[0],e.clientY-start[1]));
if(pts.size==1){vb.x-=(e.clientX-prev[0])/r.width*vb.w;vb.y-=(e.clientY-prev[1])/r.height*H();apply()}
else if(pts.size==2&&pinch){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),[mx,my]=toMap((a[0]+b[0])/2,(a[1]+b[1])/2);if(pinch.d>0)zoomAt(mx,my,d/pinch.d);pinch={d,w:vb.w};moved=99}});
const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){svg.classList.remove("drag");if(moved<6&&e.type=="pointerup"){const el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest&&el.closest("path[data-i]");if(t)select(+t.dataset.i,false)}}};
svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);svg.addEventListener("pointerleave",()=>{if(!pts.size){tip.hidden=true;tipN=""}});
svg.addEventListener("dblclick",e=>{const[mx,my]=toMap(e.clientX,e.clientY),nw=Math.max(MINW,vb.w/2);animateTo({x:mx-nw/2,y:my-nw/4,w:nw})});
svg.addEventListener("keydown",e=>{const s=vb.w*.15;if(e.key=="+"||e.key=="=")zoomBtn(1.6);else if(e.key=="-")zoomBtn(1/1.6);else if(e.key=="0")animateTo({x:0,y:0,w:360});else if(e.key.startsWith("Arrow")){vb.x+=e.key=="ArrowLeft"?-s:e.key=="ArrowRight"?s:0;vb.y+=e.key=="ArrowUp"?-s/2:e.key=="ArrowDown"?s/2:0;apply()}else return;e.preventDefault()});
$("#azi").onclick=()=>zoomBtn(1.8);$("#azo").onclick=()=>zoomBtn(1/1.8);$("#azr").onclick=()=>animateTo({x:0,y:0,w:360});
$("#acq").addEventListener("change",e=>{const v=e.target.value.trim().toLowerCase();if(!v)return;const m=c=>c[0].toLowerCase()==v||U.disp(c[0]).toLowerCase()==v;let i=W.findIndex(m);if(i<0)i=W.findIndex(c=>c[0].toLowerCase().startsWith(v)||U.disp(c[0]).toLowerCase().startsWith(v));if(i>=0){select(i,true);e.target.value=W[i][0]}});
paint();apply();if(pre){const i=U.idx(decodeURIComponent(pre));if(i>=0)setTimeout(()=>select(i,true),50)}};
})();
