/* Atlas: an interactive world map with scroll and pinch zoom, drag to pan, hover names,
   country search and a profile panel. Replaces the original atlas view. Address: #/atlas or #/atlas/<country>. */
(()=>{
const W=window.WORLD||[],PROF=window.PROF||{},enc=encodeURIComponent,MINW=360/48;
const ATD={};(typeof AT!="undefined"?AT:[]).forEach(r=>ATD[r[0]]=r);
/* Bounding box of each country’s largest piece, kept inside the map */
const BB=W.map(c=>{let best=null,ba=-1;c[1].split("Z").forEach(r=>{const n=(r.match(/-?\d+(\.\d+)?/g)||[]).map(Number);if(n.length<4)return;let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i+1<n.length;i+=2){x0=Math.min(x0,n[i]);x1=Math.max(x1,n[i]);y0=Math.min(y0,n[i+1]);y1=Math.max(y1,n[i+1])}const a=(x1-x0)*(y1-y0),cx=(x0+x1)/2;if(cx<0||cx>360)return;if(a>ba){ba=a;best=[x0,y0,x1,y1]}});best=best||[0,0,360,180];return[Math.max(0,best[0]),Math.max(0,best[1]),Math.min(360,best[2]),Math.min(180,best[3])]});
const idx=n=>W.findIndex(c=>c[0]==n);
const artFor=n=>{const k=n.replace(/^The /,"").toLowerCase();return A.find(a=>sortT(a.t).toLowerCase()==k)||(n=="Philippines"?get("ph"):null)};
const fmt=v=>Number(v).toLocaleString("en-US");
function profile(n){const p=PROF[n],c=ATD[n],a=artFor(n);
const rows=[];if(p||c)rows.push(["Capital",c?c[3]:p[0]]);if(p){rows.push(["Region",p[2]?`${p[2]}, ${p[1]}`:p[1]],["Area",`about ${fmt(p[3])} km²`],["Languages",p[4]],["Currency",p[5]],["Borders",(p[6]?"Landlocked":"Has a coastline")+", "+(p[7]==0?"no land neighbors":p[7]+" land neighbor"+(p[7]==1?"":"s"))])}if(c)rows.push(["Population",`about ${c[4]} million`]);
return `<h3>${esc(n)}</h3>${rows.length?`<dl>${rows.map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>`:`<p class="mu">No profile yet.</p>`}${c&&c[5]?`<p class="afact">${esc(c[5])}</p>`:""}
<div class="abtns">${p?`<a class="btn sm" href="#/country/${enc(n)}">Country page ›</a>`:""}${a?`<a class="btn sm" href="#/art/${a.id}">Read the article ›</a>`:""}</div>`}

R.atlas=function(pre){window.setCat&&setCat(null);
V.innerHTML=`<h2>Atlas</h2><p class="mu" style="font:14px system-ui;margin-top:-4px">Scroll or pinch to zoom, drag to move, and select a country to see its profile.</p>
<div class="atl"><div class="atl-map"><div class="atl-tools"><input type="search" id="acq" list="acl" placeholder="Find a country" aria-label="Find a country"><datalist id="acl">${W.map(c=>`<option value="${esc(c[0])}">`).join("")}</datalist>
<div class="atl-z"><button class="icon" id="azi" title="Zoom in" aria-label="Zoom in">+</button><button class="icon" id="azo" title="Zoom out" aria-label="Zoom out">−</button><button class="icon" id="azr" title="Show the whole world" aria-label="Show the whole world">⤢</button></div></div>
<div class="atl-wrap"><svg class="map amap" id="mp" viewBox="0 0 360 180" role="img" aria-label="World map" tabindex="0"><rect x="-360" y="-10" width="1080" height="200" class="sea"/>
<g class="grat">${[30,60,90,120,150,180,210,240,270,300,330].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="180"/>`).join("")}${[30,60,120,150].map(y=>`<line x1="0" y1="${y}" x2="360" y2="${y}"/>`).join("")}<line class="eq" x1="0" y1="90" x2="360" y2="90"/></g>
<g id="cty">${W.map((c,i)=>`<path data-i="${i}" d="${c[1]}"/>`).join("")}</g></svg><div class="atl-tip" id="atip" hidden></div><div class="atl-scale" id="asc">1×</div></div></div>
<aside class="atl-info" id="ai"><h3>No country selected</h3><p class="mu">Select a country on the map or search for one by name. ${Object.keys(PROF).length} countries have profiles.</p></aside></div>`;
const svg=$("#mp"),tip=$("#atip"),wrap=svg.parentNode;let vb={x:0,y:0,w:360},sel=-1,anim=0;
const H=()=>vb.w/2;
const clamp=v=>{v.w=Math.min(360,Math.max(MINW,v.w));v.x=Math.min(360-v.w,Math.max(0,v.x));v.y=Math.min(180-v.w/2,Math.max(0,v.y));return v};
const apply=()=>{clamp(vb);svg.setAttribute("viewBox",`${vb.x.toFixed(3)} ${vb.y.toFixed(3)} ${vb.w.toFixed(3)} ${H().toFixed(3)}`);$("#asc").textContent=(360/vb.w).toFixed(360/vb.w<10?1:0).replace(/\.0$/,"")+"×"};
const toMap=(cx,cy)=>{const r=svg.getBoundingClientRect();return[vb.x+(cx-r.left)/r.width*vb.w,vb.y+(cy-r.top)/r.height*H()]};
const zoomAt=(mx,my,f)=>{const nw=Math.min(360,Math.max(MINW,vb.w/f)),k=nw/vb.w;vb={x:mx-(mx-vb.x)*k,y:my-(my-vb.y)*k,w:nw};apply()};
const animateTo=t=>{cancelAnimationFrame(anim);clamp(t);const s={...vb},t0=performance.now(),D=380;const step=n=>{const p=Math.min(1,(n-t0)/D),e=1-Math.pow(1-p,3);vb={x:s.x+(t.x-s.x)*e,y:s.y+(t.y-s.y)*e,w:s.w+(t.w-s.w)*e};apply();if(p<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)};
const zoomBtn=f=>{const cx=vb.x+vb.w/2,cy=vb.y+H()/2,nw=Math.min(360,Math.max(MINW,vb.w/f));animateTo({x:cx-nw/2,y:cy-nw/4,w:nw})};
const fitTo=i=>{const b=BB[i],pad=Math.max(4,(b[2]-b[0])*.25,(b[3]-b[1])*.5);let w=Math.max(b[2]-b[0]+pad*2,(b[3]-b[1]+pad)*2,12);const cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;animateTo({x:cx-w/2,y:cy-w/4,w})};
function select(i,fit){svg.querySelectorAll("path.sel").forEach(p=>p.classList.remove("sel"));sel=i;if(i<0){$("#ai").innerHTML=`<h3>No country selected</h3>`;return}const p=svg.querySelector(`path[data-i="${i}"]`);p.classList.add("sel");p.parentNode.appendChild(p);$("#ai").innerHTML=profile(W[i][0]);history.replaceState(null,"","#/atlas/"+enc(W[i][0]));if(fit)fitTo(i)}
/* Scroll zoom */
svg.addEventListener("wheel",e=>{e.preventDefault();cancelAnimationFrame(anim);const[mx,my]=toMap(e.clientX,e.clientY),d=e.deltaMode==1?e.deltaY*16:e.deltaY;zoomAt(mx,my,Math.exp(-d*.0018))},{passive:false});
/* Drag, pinch, tap */
const pts=new Map();let moved=0,start=null,pinch=null;
svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);cancelAnimationFrame(anim);moved=0;start=[e.clientX,e.clientY];if(pts.size==2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),w:vb.w}}svg.classList.add("drag");tip.hidden=true});
svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId)){/* hover */const t=e.target.closest&&e.target.closest("path[data-i]");if(t&&e.pointerType=="mouse"){tip.textContent=W[t.dataset.i][0];tip.hidden=false;const r=wrap.getBoundingClientRect();tip.style.left=(e.clientX-r.left+14)+"px";tip.style.top=(e.clientY-r.top+14)+"px"}else tip.hidden=true;return}
const prev=pts.get(e.pointerId),r=svg.getBoundingClientRect();pts.set(e.pointerId,[e.clientX,e.clientY]);moved=Math.max(moved,Math.hypot(e.clientX-start[0],e.clientY-start[1]));
if(pts.size==1){vb.x-=(e.clientX-prev[0])/r.width*vb.w;vb.y-=(e.clientY-prev[1])/r.height*H();apply()}
else if(pts.size==2&&pinch){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),[mx,my]=toMap((a[0]+b[0])/2,(a[1]+b[1])/2);if(pinch.d>0)zoomAt(mx,my,d/pinch.d);pinch={d,w:vb.w};moved=99}});
const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){svg.classList.remove("drag");if(moved<6&&e.type=="pointerup"){const el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest&&el.closest("path[data-i]");if(t)select(+t.dataset.i,false)}}};
svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);svg.addEventListener("pointerleave",()=>{if(!pts.size)tip.hidden=true});
svg.addEventListener("dblclick",e=>{const[mx,my]=toMap(e.clientX,e.clientY),nw=Math.max(MINW,vb.w/2);animateTo({x:mx-nw/2,y:my-nw/4,w:nw})});
svg.addEventListener("keydown",e=>{const s=vb.w*.15;if(e.key=="+"||e.key=="=")zoomBtn(1.6);else if(e.key=="-")zoomBtn(1/1.6);else if(e.key=="0")animateTo({x:0,y:0,w:360});else if(e.key.startsWith("Arrow")){vb.x+=e.key=="ArrowLeft"?-s:e.key=="ArrowRight"?s:0;vb.y+=e.key=="ArrowUp"?-s/2:e.key=="ArrowDown"?s/2:0;apply()}else return;e.preventDefault()});
$("#azi").onclick=()=>zoomBtn(1.8);$("#azo").onclick=()=>zoomBtn(1/1.8);$("#azr").onclick=()=>animateTo({x:0,y:0,w:360});
$("#acq").addEventListener("change",e=>{const v=e.target.value.trim().toLowerCase(),i=W.findIndex(c=>c[0].toLowerCase()==v)>=0?W.findIndex(c=>c[0].toLowerCase()==v):W.findIndex(c=>c[0].toLowerCase().startsWith(v));if(i>=0){select(i,true);e.target.value=W[i][0]}});
apply();if(pre){const i=idx(pre);if(i>=0)setTimeout(()=>select(i,true),50)}};
})();
