/* A spinning 3D globe for the Atlas (drawn from the atlas map, unprojected to longitude/latitude),
   and richer country pages: a flowing ribbon in the flag's colors, a population dot chart and
   bars comparing the country with the average country. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const V=document.getElementById("v");
const css=`
.glb{position:relative;float:right;width:190px;height:190px;margin:-8px 0 6px 18px;touch-action:none;cursor:grab}
.glb:active{cursor:grabbing}.glb canvas{width:100%;height:100%;display:block}
.glb small{position:absolute;left:0;right:0;bottom:-6px;text-align:center;color:var(--mu);font:600 12px system-ui,sans-serif;pointer-events:none}
@media (max-width:760px){.glb{float:none;width:150px;height:150px;margin:0 auto 14px}}
.chead{position:relative;isolation:isolate}
.fribbon{position:absolute;left:-16px;right:-16px;top:-6px;bottom:-10px;z-index:-1;border-radius:24px;overflow:hidden;opacity:.2;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 30%,transparent 85%);mask-image:linear-gradient(90deg,#000 0%,#000 30%,transparent 85%)}
.fribbon i{position:absolute;inset:-50% -20%;background:repeating-linear-gradient(110deg,var(--f1) 0 90px,var(--f2) 90px 180px,var(--f3) 180px 270px);filter:blur(30px);animation:frb 14s linear infinite}
@keyframes frb{to{transform:translateX(270px)}}
.cvis{margin:22px 0;padding:18px 18px 16px;border-radius:20px;background:var(--sf);border:1px solid var(--bd)}
.cvis h3{margin:0 0 4px;font:900 20px/1.2 var(--disp)}.cvis>p{margin:0 0 12px;color:var(--mu);font-size:14px}
.pdots{display:flex;flex-wrap:wrap;gap:3px;max-height:260px;overflow:hidden}
.pdots i{width:8px;height:8px;border-radius:50%;background:var(--k,#7c3aed);opacity:0;transform:scale(0);transition:opacity .3s,transform .3s cubic-bezier(.3,1.6,.5,1)}
.pdots.go i{opacity:.9;transform:none}
.pdots i.part{background:linear-gradient(90deg,var(--k,#7c3aed) var(--pp),color-mix(in srgb,var(--k,#7c3aed) 20%,transparent) var(--pp))}
.cvbs{display:grid;gap:12px;margin-top:6px}
.cvb b{display:flex;justify-content:space-between;gap:10px;font:700 14px system-ui,sans-serif;margin-bottom:5px}.cvb b em{font-style:normal;color:var(--mu);font-weight:600}
.cvb .tr{position:relative;height:12px;border-radius:9px;background:var(--sf2);overflow:hidden}
.cvb .me,.cvb .av{position:absolute;left:0;top:0;bottom:0;border-radius:9px;width:0;transition:width 1.3s cubic-bezier(.2,.8,.2,1)}
.cvb .me{background:linear-gradient(90deg,var(--k,#7c3aed),color-mix(in srgb,var(--k,#7c3aed) 55%,#ffd23f));z-index:1}
.cvb .av{background:transparent;border-right:3px solid var(--hd);border-radius:0;z-index:2}
.cvbs.go .me{width:var(--w)}.cvbs.go .av{width:var(--a)}
.cvlg{display:flex;gap:16px;flex-wrap:wrap;font:600 12.5px system-ui;color:var(--mu);margin-top:10px}.cvlg span{display:inline-flex;align-items:center;gap:6px}.cvlg i{width:14px;height:8px;border-radius:4px;background:var(--k,#7c3aed)}.cvlg i.a{width:3px;height:12px;background:var(--hd);border-radius:0}
@media (prefers-reduced-motion:reduce){.fribbon i{animation:none}.pdots i,.cvb .me,.cvb .av{transition:none}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);

/* ---------- geometry: unproject the Natural Earth map back to longitude/latitude ---------- */
let GEO=null;const M=window.WMAP;
const parse=d=>{const toks=[];const re=/([MmLlHhVvZz])|(-?\d*\.?\d+(?:e-?\d+)?)/g;let m;while((m=re.exec(d)))toks.push(m[1]||+m[2]);const rings=[];let x=0,y=0,cur=null,cmd="",k=0;
while(k<toks.length){const t=toks[k];if(typeof t=="string"){cmd=t;k++;if(cmd=="Z"||cmd=="z"){if(cur){rings.push(cur);cur=null}}continue}
if(cmd=="M"||cmd=="m"){const a=toks[k++],b=toks[k++];if(cmd=="M"){x=a;y=b}else{x+=a;y+=b}if(cur)rings.push(cur);cur=[x,y];cmd=cmd=="M"?"L":"l"}
else if(cmd=="L"){x=toks[k++];y=toks[k++];cur.push(x,y)}else if(cmd=="l"){x+=toks[k++];y+=toks[k++];cur.push(x,y)}
else if(cmd=="H"){x=toks[k++];cur.push(x,y)}else if(cmd=="h"){x+=toks[k++];cur.push(x,y)}else if(cmd=="V"){y=toks[k++];cur.push(x,y)}else if(cmd=="v"){y+=toks[k++];cur.push(x,y)}else k++}
if(cur)rings.push(cur);return rings};
const K=182.78964407016807,CX=500,CY=260;
const inv=(X,Y)=>{const x=(X-CX)/K,y=(CY-Y)/K;let phi=y,i=25,d;do{const p2=phi*phi,p4=p2*p2;d=(phi*(1.007226+p2*(0.015085+p4*(-0.044475+0.028874*p2-0.005916*p4)))-y)/(1.007226+p2*(0.015085*3+p4*(-0.044475*7+0.028874*9*p2-0.005916*11*p4)));phi-=d}while(Math.abs(d)>1e-6&&--i>0);
const p2=phi*phi;const lam=x/(0.8707+p2*(-0.131979+p2*(-0.013791+p2*p2*p2*(0.003971-0.001529*p2))));return[lam,phi]};
window.EPLL=d=>parse(d).map(ring=>{const out=new Float32Array(ring.length);for(let i=0;i<ring.length;i+=2){const ll=inv(ring[i],ring[i+1]);out[i]=ll[0];out[i+1]=ll[1]}return out});window.EPINV=inv;
const build=()=>{if(GEO||!M)return GEO;const root=getComputedStyle(document.documentElement),col=c=>root.getPropertyValue("--k-"+({"Asia":"asia","Africa":"africa","Europe":"europe","North America":"nam","South America":"sam","Oceania":"oceania","Antarctica":"ant"}[c]||"ant")).trim()||"#8a8";
GEO=M.C.map(r=>{const d=r[1]||r[2];const rings=parse(d).map(ring=>{const out=new Float32Array(ring.length);for(let i=0;i<ring.length;i+=2){const ll=inv(ring[i],ring[i+1]);out[i]=ll[0];out[i+1]=ll[1]}return out});
const lp=r[4]?inv(r[4][0],r[4][1]):null;const D=(window.CTRY||{})[r[0]];return{n:r[0],rings,lp,col:col(D&&D.ct)}});return GEO};

/* ---------- globe ---------- */
let rot={l:-0.3,p:0.35},tgt=null,glb=null;
function makeGlobe(host,sel){build();if(!GEO)return;const wrap=document.createElement("div");wrap.className="glb";wrap.setAttribute("role","img");wrap.setAttribute("aria-label","Spinning globe"+(sel?" turned to "+sel:""));
const cv=document.createElement("canvas");wrap.appendChild(cv);const cap=document.createElement("small");cap.textContent="Drag to spin";wrap.appendChild(cap);host.prepend(wrap);
const g=cv.getContext("2d");let W=0,R=0,dpr=Math.min(2,devicePixelRatio||1);const size=()=>{W=wrap.clientWidth;cv.width=W*dpr;cv.height=W*dpr;R=W/2-6};size();
const selG=GEO.find(c=>c.n==sel);if(selG&&selG.lp)tgt={l:selG.lp[0],p:Math.max(-1,Math.min(1,selG.lp[1]))};
let drag=null,spin=!still;
const proj=(l,p)=>{const cl=Math.cos(rot.p),sl=Math.sin(rot.p),dl=l-rot.l,cp=Math.cos(p),sp=Math.sin(p),cd=Math.cos(dl);const c=sl*sp+cl*cp*cd;return[cp*Math.sin(dl),cl*sp-sl*cp*cd,c]};
const draw=()=>{g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,W);const c=W/2;
const glow=g.createRadialGradient(c,c,R*.9,c,c,R*1.12);glow.addColorStop(0,"rgba(120,190,255,.45)");glow.addColorStop(1,"rgba(120,190,255,0)");g.fillStyle=glow;g.beginPath();g.arc(c,c,R*1.12,0,7);g.fill();
const sea=g.createRadialGradient(c-R*.35,c-R*.4,R*.1,c,c,R);sea.addColorStop(0,"#7cc8ff");sea.addColorStop(.6,"#2f7fd8");sea.addColorStop(1,"#174b99");g.fillStyle=sea;g.beginPath();g.arc(c,c,R,0,7);g.fill();
g.strokeStyle="rgba(255,255,255,.18)";g.lineWidth=.7;for(let la=-60;la<=60;la+=30){g.beginPath();let pen=false;for(let lo=-180;lo<=180;lo+=6){const q=proj(lo*Math.PI/180,la*Math.PI/180);if(q[2]>0){pen?g.lineTo(c+q[0]*R,c-q[1]*R):g.moveTo(c+q[0]*R,c-q[1]*R);pen=true}else pen=false}g.stroke()}
for(let lo=-180;lo<180;lo+=30){g.beginPath();let pen=false;for(let la=-90;la<=90;la+=6){const q=proj(lo*Math.PI/180,la*Math.PI/180);if(q[2]>0){pen?g.lineTo(c+q[0]*R,c-q[1]*R):g.moveTo(c+q[0]*R,c-q[1]*R);pen=true}else pen=false}g.stroke()}
const cs=/^#\/atlas/.test(location.hash)?decodeURIComponent(location.hash.split("/")[2]||""):sel;GEO.forEach(cn=>{const hi=cn.n==cs;g.fillStyle=hi?"#ffd23f":cn.col;g.strokeStyle=hi?"#fff":"rgba(255,255,255,.35)";g.lineWidth=hi?1.4:.5;
cn.rings.forEach(r=>{let vis=0;g.beginPath();for(let i=0;i<r.length;i+=2){let q=proj(r[i],r[i+1]);if(q[2]>0)vis++;else{const m=Math.hypot(q[0],q[1])||1;q=[q[0]/m,q[1]/m]}const X=c+q[0]*R,Y=c-q[1]*R;i?g.lineTo(X,Y):g.moveTo(X,Y)}
if(vis>1){g.closePath();g.fill();g.stroke()}})});
const sh=g.createRadialGradient(c-R*.4,c-R*.45,R*.05,c,c,R*1.02);sh.addColorStop(0,"rgba(255,255,255,.35)");sh.addColorStop(.35,"rgba(255,255,255,0)");sh.addColorStop(1,"rgba(0,0,30,.35)");g.fillStyle=sh;g.beginPath();g.arc(c,c,R,0,7);g.fill()};
let last=performance.now(),alive=true;const loop=t=>{if(!document.body.contains(wrap)){alive=false;return}const dt=Math.min(50,t-last);last=t;
if(!drag){if(tgt){let dl=((tgt.l-rot.l+Math.PI*3)%(Math.PI*2))-Math.PI;rot.l+=dl*Math.min(1,dt*.004);rot.p+=(tgt.p-rot.p)*Math.min(1,dt*.004);if(Math.abs(dl)<.002&&Math.abs(tgt.p-rot.p)<.002)tgt=null}
else if(spin)rot.l+=dt*.00025}
if(!document.hidden)draw();requestAnimationFrame(loop)};requestAnimationFrame(loop);
wrap.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY,l:rot.l,p:rot.p};tgt=null;wrap.setPointerCapture(e.pointerId)});
wrap.addEventListener("pointermove",e=>{if(!drag)return;rot.l=drag.l-(e.clientX-drag.x)/R;rot.p=Math.max(-1.3,Math.min(1.3,drag.p+(e.clientY-drag.y)/R))});
const up=()=>{drag=null};wrap.addEventListener("pointerup",up);wrap.addEventListener("pointercancel",up);addEventListener("resize",size)}

/* ---------- country pages ---------- */
const flagCols=async code=>{try{const t=await (await fetch(`flags/${code}.svg`)).text();const cnt={};(t.match(/fill="?#[0-9a-fA-F]{3,6}/g)||[]).forEach(m=>{let h=m.split("#")[1].toLowerCase();if(h.length==3)h=h.split("").map(x=>x+x).join("");cnt[h]=(cnt[h]||0)+1});
(t.match(/fill="(white|red|blue|green|yellow|black)"/g)||[]).forEach(m=>{const n=m.slice(6,-1),map={white:"ffffff",red:"ff0000",blue:"0000ff",green:"008000",yellow:"ffff00",black:"000000"};cnt[map[n]]=(cnt[map[n]]||0)+1});
const L=Object.keys(cnt);const out=[];for(const h of L){const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);if(!out.some(o=>Math.abs(o[0]-r)+Math.abs(o[1]-g)+Math.abs(o[2]-b)<90))out.push([r,g,b])}
return out.slice(0,3).map(([r,g,b])=>`rgb(${r},${g},${b})`)}catch(e){return[]}};
const countryFx=async()=>{const ch=V.querySelector(".chead");if(!ch||ch.dataset.fx)return;ch.dataset.fx=1;const key=decodeURIComponent(location.hash.split("/")[2]||"");const D=(window.CTRY||{})[key];if(!D)return;
const cs=await flagCols(D.flag||String(D.i2||"").toLowerCase());if(cs.length&&document.body.contains(ch)){const f=[cs[0],cs[1]||cs[0],cs[2]||cs[0]];const rb=document.createElement("div");rb.className="fribbon";rb.setAttribute("aria-hidden","true");rb.style.cssText=`--f1:${f[0]};--f2:${f[1]};--f3:${f[2]}`;rb.innerHTML="<i></i>";ch.prepend(rb)}
const all=Object.values(window.CTRY||{});const avg=k=>{const v=all.map(k).filter(x=>x>0).sort((a,b)=>a-b);return v.length?v[Math.floor(v.length/2)]:0};
const pop=D.pop&&D.pop[1],area=D.area,dens=pop&&area?pop/area:0,gpc=D.gpc;
const aPop=avg(c=>c.pop&&c.pop[1]),aArea=avg(c=>c.area),aDens=avg(c=>c.pop&&c.area?c.pop[1]/c.area:0),aG=avg(c=>c.gpc);
const fmt=n=>n>=1e9?(n/1e9).toFixed(n>=1e10?0:1)+" billion":n>=1e6?(n/1e6).toFixed(n>=1e7?0:1)+" million":Math.round(n).toLocaleString("en-US");
const bar=(lab,v,a,f)=>{if(!v||!a)return"";const mx=Math.max(v,a);const ratio=v/a;return `<div class="cvb"><b>${lab}<em>${f(v)} · ${ratio>=1.05?(ratio>=10?Math.round(ratio):ratio.toFixed(1))+"× the typical country":ratio<=.95?(ratio<.1?"far below the typical country":Math.round(ratio*100)+"% of the typical country"):"about the same as the typical country"}</em></b><div class="tr"><span class="me" style="--w:${(100*v/mx).toFixed(1)}%"></span><span class="av" style="--a:${(100*a/mx).toFixed(1)}%"></span></div></div>`};
let dots="";if(pop){const n=pop/1e6,full=Math.floor(Math.min(n,1500)),part=n<1500?n-full:0;dots=`<div class="pdots" role="img" aria-label="${fmt(pop)} people, one dot for every million">${'<i></i>'.repeat(full)}${part>0.02||full==0?`<i class="part" style="--pp:${Math.max(4,Math.round(part*100))}%"></i>`:""}</div>`}
const box=document.createElement("section");box.className="cvis";box.style.setProperty("--k",getComputedStyle(ch).getPropertyValue("--k")||"#7c3aed");
box.innerHTML=`<h3>${esc(D.n||key)} at a glance</h3><p>${pop?`Each dot stands for one million people${pop/1e6>1500?" (the first 1,500 million shown)":""}.`:""}</p>${dots}
<div class="cvbs">${bar("Population",pop,aPop,fmt)}${bar("Area",area,aArea,v=>Math.round(v).toLocaleString("en-US")+" km²")}${bar("People per km²",dens,aDens,v=>v<10?v.toFixed(1):Math.round(v).toLocaleString("en-US"))}${bar("GDP per person",gpc,aG,v=>"US$"+Math.round(v).toLocaleString("en-US"))}</div>
<div class="cvlg"><span><i></i>${esc(D.n||key)}</span><span><i class="a"></i>Typical country (the middle one when all are ranked)</span></div>`;
const anchor=[...V.querySelectorAll(".body h3")].find(h=>/How it compares/.test(h.textContent))||V.querySelector(".body .ffile");if(!anchor)return;anchor.before(box);
const pd=box.querySelector(".pdots");if(pd)[...pd.children].forEach((d,i)=>d.style.transitionDelay=Math.min(1.6,i*.004)+"s");
const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){pd&&pd.classList.add("go");box.querySelector(".cvbs").classList.add("go");io.disconnect()}},{threshold:.2});io.observe(box)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const h=location.hash;
if(/^#\/atlas/.test(h)&&V.querySelector("#atl")&&!V.querySelector(".glb")){const h2=V.querySelector("h2");if(h2){const host=document.createElement("div");host.style.display="contents";h2.before(host);makeGlobe(host,decodeURIComponent(h.split("/")[2]||"")||null)}}
if(/^#\/country\//.test(h))countryFx()})}).observe(V,{childList:true});
/* follow selections made on the map without re-rendering */
addEventListener("hashchange",()=>{const h=location.hash;if(/^#\/atlas/.test(h)){const sel=decodeURIComponent(h.split("/")[2]||"");build();const c=GEO&&GEO.find(x=>x.n==sel);if(c&&c.lp)tgt={l:c.lp[0],p:Math.max(-1,Math.min(1,c.lp[1]))}}});
})();
