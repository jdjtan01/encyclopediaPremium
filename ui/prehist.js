/* Prehistoric Life: fossil-file cards in species articles, the deep-time timeline (#/deeptime),
   the fossil map (#/fossilmap) and the size comparer (#/sizes). Data in data/prehist-data.js. */
(()=>{
const V=document.getElementById("v"),SUB="Prehistoric Life",still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const es=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nm=id=>{const a=get(id);return a?a.t:id};
const sp=s=>s.replace(/ (dinosaur|\(.*\))$/,"");
const fmt=x=>x>=1?(+x.toFixed(1)).toLocaleString("en-US")+" million":(Math.round(x*1e6/1000)*1000).toLocaleString("en-US");
const when=r=>r[3]>=1?`About ${(+r[2]).toLocaleString("en-US")} to ${(+r[3]).toLocaleString("en-US")} million years ago`:`About ${fmt(r[2])} to ${fmt(r[3])} years ago`;
const kg=w=>!w?"Not known":w>=1000?`About ${(+(w/1000).toFixed(1)).toLocaleString("en-US")} metric tons`:w>=1?`About ${w} kg`:`About ${Math.round(w*1000)} g`;
const perOf=m=>PREPER.find(p=>m<=p[1]&&m>=p[2])||PREPER[PREPER.length-1];
// Sections of the subject decide the colors on the map and the timeline.
const GRP=[["Before the dinosaurs","#7c3aed",["trilobites","dunkleosteus","dimetrodon","tiktaalik","anomalocaris","meganeura","eurypterids","coelacanth","helicoprion","arthropleura"]],["Dinosaurs","#c2410c",["trex","triceratops","stegosaurus","velociraptor","brachiosaurus","diplodocus","spinosaurus","ankylosaurus","parasaurolophus","allosaurus","iguanodon","argentinosaurus","archaeopteryx","brontosaurus","pachycephalosaurus","therizinosaurus","carnotaurus","microraptor","dilophosaurus","deinonychus","plateosaurus","compsognathus","oviraptor","maiasaura","baryonyx","protoceratops","giganotosaurus","edmontosaurus","ceratosaurus","kentrosaurus","amargasaurus"]],["Sea and sky","#0e7490",["pteranodon","quetzalcoatlus","mosasaurus","megalodon","elasmosaurus","livyatan","ichthyosaurs","rhamphorhynchus","basilosaurus","dimorphodon","deinosuchus","sarcosuchus","nothosaurus","pliosaurus"]],["After the dinosaurs","#4d7c0f",["mammoth","smilodon","woollyrhino","groundsloths","direwolf","glyptodon","terrorbirds","titanoboa","paraceratherium","megalania","andrewsarchus","cavebear"]]];
const gOf=id=>GRP.find(g=>g[2].includes(id))||GRP[1];
// Natural Earth projection used by the Atlas map (data/atlasmap.js).
const K=182.78964407016807,proj=(la,lo)=>{const p=la*Math.PI/180,l=lo*Math.PI/180,p2=p*p,p4=p2*p2;return[500+K*l*(.8707-.131979*p2+p4*(-.013791+p4*p2*(.003971-.001529*p2))),260-K*p*(1.007226+p2*(.015085+p4*(-.044475+.028874*p2-.005916*p4)))]};
const mapBase=()=>window.WMAP?`<path d="${WMAP.sphere}" class="pm-sea"/><path d="${WMAP.land}" class="pm-land"/>`:`<rect width="1000" height="520" class="pm-sea"/>`;
const silSvg=(id,w,h,cls="")=>{const r=PRE[id];if(!r)return"";const L=r[4],H=r[5],sc=Math.min((w-4)/L,(h-4)/H),p=preSil(r[7],L,H,sc,(w-L*sc)/2,h-2),col=gOf(id)[1];return`<svg class="psil ${cls}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><g data-pp="${id}" data-fit="1" data-bw="${w}" data-bh="${h}" data-col="${col}"><path d="${p.d}"/>${p.deco?`<path d="${p.deco}" class="dc"/>`:""}</g></svg>`};
/* PhyloPic silhouettes: swap in the detailed drawing when it loads; keep our outline if offline. */
const ppCred=id=>{const P=window.PREPP&&PREPP[id];return P?`${P[2]}, ${P[3]}, via PhyloPic`:""};
const ppDefs=c=>{let d=document.getElementById("ppdefs");if(!d){document.body.insertAdjacentHTML("beforeend",`<svg id="ppdefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs></defs></svg>`);d=document.getElementById("ppdefs")}const fid="ppf"+c.replace(/[^0-9a-z]/gi,"");if(!document.getElementById(fid))d.firstChild.insertAdjacentHTML("beforeend",`<filter id="${fid}" color-interpolation-filters="sRGB"><feFlood flood-color="${c}"/><feComposite in2="SourceAlpha" operator="in"/></filter>`);return fid};
function ppApply(root){if(!window.PREPP)return;root.querySelectorAll("g[data-pp]:not([data-ppd])").forEach(g=>{g.dataset.ppd=1;const id=g.dataset.pp,P=PREPP[id],r=PRE[id];if(!P||!r)return;const bas=P[5]||"w",size=P[6]||r[4],ar=P[1];let w,h,x,y;
if(g.dataset.fit){const bw=+g.dataset.bw-4,bh=+g.dataset.bh-4;w=Math.min(bw,bh*ar);h=w/ar;x=(+g.dataset.bw-w)/2;y=+g.dataset.bh-2-h}else{const sc=+g.dataset.s;if(bas=="w"){w=size*sc;h=w/ar}else{h=size*sc;w=h*ar}x=+g.dataset.cx-w/2;y=+g.dataset.gy-h}
const im=document.createElementNS("http://www.w3.org/2000/svg","image");im.setAttribute("href",`https://images.phylopic.org/images/${P[0]}/vector.svg`);im.setAttribute("x",x.toFixed(1));im.setAttribute("y",y.toFixed(1));im.setAttribute("width",w.toFixed(1));im.setAttribute("height",h.toFixed(1));im.setAttribute("preserveAspectRatio","xMidYMax meet");im.setAttribute("filter",`url(#${ppDefs(g.dataset.col||"#6b5b0e")})`);im.setAttribute("class","ppi");im.style.opacity="0";
im.addEventListener("load",()=>{g.style.display="none";im.style.transition="opacity .35s";im.style.opacity="1";const sv=g.closest("svg");if(g.dataset.cred&&sv&&!sv.querySelector(".ppcr")){const vb=sv.viewBox.baseVal;sv.insertAdjacentHTML("beforeend",`<text class="ppcr" x="${vb.width-6}" y="12" text-anchor="end" font-size="9.5" font-family="system-ui,sans-serif" fill="currentColor" opacity=".6">Silhouette: ${es(ppCred(id))}</text>`)}});
im.addEventListener("error",()=>im.remove());g.after(im)})}
let ppq=0;new MutationObserver(()=>{if(ppq)return;ppq=requestAnimationFrame(()=>{ppq=0;ppApply(V)})}).observe(V,{childList:true,subtree:true});
const css=`
.pff{margin:18px 0 22px;border-radius:24px;padding:18px 20px 16px;background:linear-gradient(160deg,color-mix(in srgb,var(--a1,#6b5b0e) 14%,var(--sf)),var(--sf));border:1px solid color-mix(in srgb,var(--a1,#6b5b0e) 28%,var(--bd));box-shadow:0 18px 40px -30px var(--a1,#000)}
.pff h4{margin:0 0 10px;font:900 19px var(--disp);color:var(--hd);display:flex;align-items:center;gap:10px}.pff h4 svg{width:26px;height:26px;color:var(--a1)}
.pff .pfg{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px;margin-bottom:12px}
.pff .pfg div{background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:8px 11px}.pff .pfg small{display:block;font:700 11.5px system-ui,sans-serif;color:var(--mu)}.pff .pfg b{font:800 14.5px/1.3 system-ui,sans-serif;color:var(--tx)}
.pfrow{display:grid;grid-template-columns:1.1fr 1fr;gap:12px;align-items:start}@media(max-width:700px){.pfrow{grid-template-columns:1fr}}
.pfbox{background:var(--sf);border:1px solid var(--bd);border-radius:16px;padding:10px 12px;min-width:0}.pfbox>small{display:block;font:800 12px system-ui,sans-serif;color:var(--mu);margin-bottom:6px}
.pfbox svg{display:block;width:100%;height:auto}
.psil path{fill:var(--a1,#6b5b0e)}.ppc{margin:8px 2px 0;font:500 11.5px/1.4 system-ui,sans-serif;color:var(--mu)}.psil .dc{fill:none;stroke:var(--sf);stroke-width:2.5;stroke-linecap:round}
.pm-sea{fill:color-mix(in srgb,#38bdf8 14%,var(--sf))}.pm-land{fill:color-mix(in srgb,var(--tx) 16%,var(--sf));stroke:var(--sf);stroke-width:.6}
.pdot{stroke:var(--sf);stroke-width:2.5}.phalo{opacity:.28;pointer-events:none}
.pfbtn{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.pfbtn a{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:999px;background:var(--a1,#6b5b0e);color:#fff!important;text-decoration:none!important;font:800 13.5px system-ui,sans-serif;transition:transform .2s,filter .2s}.pfbtn a:hover{transform:translateY(-2px);filter:brightness(1.1)}
.pfbtn a.alt{background:var(--sf);color:var(--tx)!important;border:1px solid var(--bd)}
.ptb{position:relative}.ptb .lbl{font:700 11px system-ui,sans-serif;fill:var(--mu)}.ptb .now{font:800 12px system-ui,sans-serif;fill:var(--tx)}
/* tool pages */
.pw{max-width:1100px;margin:0 auto}.pw h2{font:900 clamp(28px,4.4vw,44px)/1.05 var(--disp);margin:6px 0 6px;color:var(--hd)}.pw>p.in{color:var(--mu);font:500 16px/1.5 system-ui,sans-serif;max-width:70ch;margin:0 0 16px}
.pw .bk{font:700 14px system-ui,sans-serif}.ptabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px}
.ptabs a,.ptabs button{padding:8px 15px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:800 13.5px system-ui,sans-serif;cursor:pointer;text-decoration:none}.ptabs .on{background:var(--hd);color:var(--bg,#fff);border-color:var(--hd)}
.pcard{background:var(--sf);border:1px solid var(--bd);border-radius:22px;padding:14px;overflow:hidden}
.dtw{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:16px}.dtw svg{display:block;min-width:900px;width:100%;height:auto}
.dt-row{cursor:pointer}.dt-row text{font:700 12.5px system-ui,sans-serif;fill:var(--tx)}.dt-row:hover rect.hl,.dt-row.on rect.hl{fill:color-mix(in srgb,var(--a1,#6b5b0e) 14%,transparent)}
.dt-row.on text{font-weight:900}.dt-per text{font:800 11.5px system-ui,sans-serif;fill:#222}.dt-era text{font:900 13px system-ui,sans-serif;fill:#222}.dt-ax{font:700 11px system-ui,sans-serif;fill:var(--mu)}
.dt-ext line{stroke:#dc2626;stroke-width:1.5;stroke-dasharray:3 4}.dt-ext text{font:800 10.5px system-ui,sans-serif;fill:#dc2626}
.pinfo{display:grid;grid-template-columns:140px 1fr;gap:16px;align-items:center;margin-top:12px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--a1,#6b5b0e) 9%,var(--sf));border:1px solid var(--bd);min-height:120px}
.pinfo h3{margin:0 0 4px;font:900 22px var(--disp)}.pinfo h3 a{color:var(--hd)}.pinfo p{margin:2px 0;font:500 14.5px/1.45 system-ui,sans-serif;color:var(--tx)}.pinfo p b{color:var(--mu);font-weight:700}
@media(max-width:560px){.pinfo{grid-template-columns:90px 1fr}}
.fmap{position:relative}.fmap svg{display:block;width:100%;height:auto}.fmap .pdot{cursor:pointer;transition:r .2s,opacity .3s}.fmap .pdot.dim{opacity:.18}
.fpop{position:absolute;z-index:5;min-width:180px;max-width:260px;padding:10px 13px;border-radius:14px;background:var(--sf);border:1px solid var(--bd);box-shadow:0 18px 40px -16px rgba(0,0,0,.45);font:500 13.5px/1.4 system-ui,sans-serif;transform:translate(-50%,calc(-100% - 12px))}
.fpop b{display:block;font:900 14px system-ui,sans-serif;margin-bottom:3px}.fpop a{font-weight:800}
.flg{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px}.flg button{display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font:800 13px system-ui,sans-serif;cursor:pointer}
.flg button i{width:12px;height:12px;border-radius:50%;background:var(--gc)}.flg button[aria-pressed=false]{opacity:.45}
.szl{display:grid;gap:6px}.szr{display:grid;grid-template-columns:28px 92px minmax(0,1fr);gap:10px;align-items:center;padding:6px 10px;border-radius:14px;border:1px solid transparent;cursor:pointer;background:none;color:var(--tx);text-align:left;font:inherit;width:100%}
.szr:hover{background:color-mix(in srgb,var(--a1,#6b5b0e) 7%,transparent)}.szr.on{border-color:color-mix(in srgb,var(--a1,#6b5b0e) 45%,var(--bd));background:color-mix(in srgb,var(--a1,#6b5b0e) 11%,var(--sf))}
.szr .ck{width:22px;height:22px;border-radius:7px;border:2px solid var(--bd);display:grid;place-items:center;font:900 13px system-ui;color:#fff}.szr.on .ck{background:var(--a1,#6b5b0e);border-color:var(--a1,#6b5b0e)}
.szr .psil{width:92px;height:40px}.szr .nm{font:800 14.5px system-ui,sans-serif;display:flex;justify-content:space-between;gap:8px}.szr .nm span{font-weight:600;color:var(--mu);font-size:13px;white-space:nowrap}
.szr .bar{height:8px;border-radius:6px;background:var(--sf2);margin-top:5px;overflow:hidden}.szr .bar i{display:block;height:100%;border-radius:6px;background:var(--gc);width:0;transition:width .7s cubic-bezier(.22,1,.36,1)}
.lineup svg{display:block;width:100%;height:auto}.lineup .gnd{stroke:var(--mu);stroke-width:2}.lineup .lb{font:800 13px system-ui,sans-serif;fill:var(--tx)}.lineup .lb2{font:600 11.5px system-ui,sans-serif;fill:var(--mu)}
.lineup .hm{fill:var(--tx)}.lineup .bus{fill:#eab308}.lineup .sh{transition:opacity .4s}.lineup .ruler{stroke:var(--mu);stroke-width:1;opacity:.5}
.szgrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:16px;align-items:start}@media(max-width:860px){.szgrid{grid-template-columns:1fr}}
.szgrid .lineup{position:sticky;top:70px}@media(max-width:860px){.szgrid .lineup{position:static;order:-1}}
@media(max-width:560px){.szr{grid-template-columns:24px 64px minmax(0,1fr);gap:8px;padding:6px}.szr .psil{width:64px;height:32px}.szr .nm{flex-direction:column;gap:1px}.szr .nm span{white-space:normal}}
.szr .psil path,.pinfo .psil path{fill:var(--gc,var(--a1))}
/* subject page tools */
.pltools{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:18px 0 26px}@media(max-width:760px){.pltools{grid-template-columns:1fr}}
.pltools a{position:relative;display:block;padding:16px 18px 18px;border-radius:22px;text-decoration:none!important;color:#fff!important;overflow:hidden;isolation:isolate;min-height:150px;background:linear-gradient(140deg,var(--t1),var(--t2));box-shadow:0 22px 40px -28px var(--t1);transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s}
.pltools a:hover{transform:translateY(-4px);box-shadow:0 30px 50px -26px var(--t1)}.pltools b{display:block;font:900 22px var(--disp);margin-bottom:4px}.pltools span{display:block;font:600 14px/1.4 system-ui,sans-serif;opacity:.92;max-width:24ch}
.pltools svg{position:absolute;right:10px;bottom:6px;width:42%;max-height:62%;height:auto;z-index:-1;opacity:.3}.pltools a{padding-right:40%}@media(max-width:760px){.pltools a{min-height:120px}}
`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const bone=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7.5 4.5a2.5 2.5 0 0 0-3 3 2.5 2.5 0 0 0 1.8 3.5l7.7 7.7a2.5 2.5 0 0 0 3.5 1.8 2.5 2.5 0 0 0 3-3 2.5 2.5 0 0 0-1.8-3.5L11 6.3a2.5 2.5 0 0 0-3.5-1.8z"/></svg>`;

/* ---------- time bar: the last 540 million years with the animal's range ---------- */
function timeBar(id,w=380){const r=PRE[id],X=m=>10+(540-m)/540*(w-20);let s="";
PREERA.forEach(e=>{s+=`<rect x="${X(e[1]).toFixed(1)}" y="4" width="${(X(e[2])-X(e[1])).toFixed(1)}" height="16" fill="${e[3]}"/><text x="${((X(e[1])+X(e[2]))/2).toFixed(1)}" y="16" text-anchor="middle" style="font:800 10.5px system-ui;fill:#222">${e[0]}</text>`});
PREPER.forEach(p=>{s+=`<rect x="${X(p[1]).toFixed(1)}" y="22" width="${(X(p[2])-X(p[1])).toFixed(1)}" height="22" fill="${p[3]}"><title>${p[0]}, ${p[1]}–${p[2]} million years ago</title></rect>`});
const a=X(r[2]),b=Math.max(X(r[3]),a+4),c=(a+b)/2,per=perOf((r[2]+r[3])/2);
s+=`<rect x="${(a-1).toFixed(1)}" y="19" width="${(b-a+2).toFixed(1)}" height="28" rx="3" fill="none" stroke="var(--tx)" stroke-width="2.5"/><path d="M${c.toFixed(1)} 52l-6 9h12z" fill="var(--tx)"/>`;
const anc=c<70?"start":c>w-70?"end":"middle";
s+=`<text class="now" x="${c.toFixed(1)}" y="76" text-anchor="${anc}">${es(per[0])}</text>`;
[540,400,300,200,100,0].forEach(m=>{s+=`<text class="lbl" x="${X(m).toFixed(1)}" y="96" text-anchor="${m==540?"start":m==0?"end":"middle"}">${m?m+" Ma":"Today"}</text>`});
return`<svg class="ptb" viewBox="0 0 ${w} 100" role="img" aria-label="${es(nm(id))} lived during the ${es(per[0])} period">${s}</svg>`}

/* ---------- small fossil map ---------- */
function miniMap(id){const r=PRE[id],pts=r[9].map(t=>proj(t[1],t[2]));let x0=Math.min(...pts.map(p=>p[0])),x1=Math.max(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),y1=Math.max(...pts.map(p=>p[1]));
let w=Math.max(260,(x1-x0)*1.6+120),h=w*.55;let cx=(x0+x1)/2,cy=(y0+y1)/2;let vx=Math.max(0,Math.min(1000-w,cx-w/2)),vy=Math.max(0,Math.min(520-h,cy-h/2));if(w>1000){w=1000;h=520;vx=0;vy=0}
const col=gOf(id)[1],rr=(w/260*5).toFixed(1);
return`<svg viewBox="${vx.toFixed(0)} ${vy.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" role="img" aria-label="Places where fossils of ${es(nm(id))} have been found">${mapBase()}${pts.map((p,i)=>`<circle class="phalo" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(rr*2.2).toFixed(1)}" fill="${col}"/><circle class="pdot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${rr}" fill="${col}"><title>${es(r[9][i][0])}</title></circle>`).join("")}</svg>`}

/* ---------- fossil file in species articles ---------- */
const idNow=()=>{const m=location.hash.match(/^#\/art\/([^/?#]+)/);return m?decodeURIComponent(m[1]):null};
function fileCard(){const id=idNow(),r=id&&PRE[id];if(!r)return;const body=V.querySelector(".body");if(!body||body.querySelector(".pff"))return;
const lead=body.querySelector(":scope>p.lead")||body.querySelector(":scope>p");if(!lead)return;
const isW=r[7]=="ptero";
const box=document.createElement("section");box.className="pff";box.setAttribute("aria-label","Fossil file");
box.innerHTML=`<h4>${bone}Fossil file</h4><div class="pfg"><div><small>Group</small><b>${es(r[0])}</b></div><div><small>Lived</small><b>${es(when(r))}</b></div><div><small>${isW?"Wingspan":"Size"}</small><b>${es(r[8])}</b></div><div><small>Weight</small><b>${es(kg(r[6]))}</b></div><div><small>Diet</small><b>${es(r[1])}</b></div></div>
<div class="pfrow"><div class="pfbox"><small>When it lived (Ma = millions of years ago)</small>${timeBar(id)}</div><div class="pfbox"><small>Where its fossils have been found</small>${miniMap(id)}</div></div>
<div class="pfbtn"><a href="#/sizes/${id}">Compare its size</a><a class="alt" href="#/deeptime/${id}">See it in deep time</a><a class="alt" href="#/fossilmap/${id}">Open the fossil map</a></div>${PREPP[id]?`<p class="ppc">Silhouettes in this article: ${es(ppCred(id))}.</p>`:""}`;
lead.after(box)}
let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(idNow())fileCard()})}).observe(V,{childList:true,subtree:false});

/* ---------- shared page shell ---------- */
const TABS=[["deeptime","Deep time"],["fossilmap","Fossil map"],["sizes","Size comparer"]];
function shell(v,title,intro){window.setCat&&setCat(SUB);const c=CAT[SUB]||["#6b5b0e"];V.style.setProperty("--a1",c[0]);
return`<div class="pw"><a class="bk" href="#/cat/${encodeURIComponent(SUB)}">‹ ${SUB}</a><h2>${title}</h2><p class="in">${intro}</p><nav class="ptabs" aria-label="Prehistoric Life tools">${TABS.map(t=>`<a href="#/${t[0]}" class="${t[0]==v?"on":""}"${t[0]==v?' aria-current="page"':""}>${t[1]}</a>`).join("")}</nav>`}
const info=id=>{const r=PRE[id];return`<div style="--gc:${gOf(id)[1]}">${silSvg(id,140,90)}</div><div><h3><a href="#/art/${id}">${es(nm(id))}</a></h3><p><b>Lived:</b> ${es(when(r))} (${es(perOf((r[2]+r[3])/2)[0])})</p><p><b>Size:</b> ${es(r[8])} · <b>Diet:</b> ${es(r[1])}</p>${window.PREPP&&PREPP[id]?`<p class="ppc">Silhouette: ${es(ppCred(id))}</p>`:""}</div>`};
const IDS=Object.keys(PRE).filter(i=>get(i));

/* ---------- #/deeptime ---------- */
R.deeptime=function(x){const ids=IDS.slice().sort((a,b)=>PRE[b][2]-PRE[a][2]),sel=PRE[x]?x:"trex";
const W=1000,L=20,Rt=W-20,X=m=>L+(540-m)/540*(Rt-L),top=88,rh=26,H=top+ids.length*rh+40;let s="";
PREERA.forEach(e=>{s+=`<g class="dt-era"><rect x="${X(e[1])}" y="8" width="${X(e[2])-X(e[1])}" height="26" fill="${e[3]}"/><text x="${(X(e[1])+X(e[2]))/2}" y="26" text-anchor="middle">${e[0]} Era</text></g>`});
PREPER.forEach(p=>{const w=X(p[2])-X(p[1]);s+=`<g class="dt-per"><rect x="${X(p[1])}" y="36" width="${w}" height="26" fill="${p[3]}"><title>${p[0]}: ${p[1]}–${p[2]} million years ago</title></rect>${w>44?`<text x="${X(p[1])+w/2}" y="53" text-anchor="middle">${p[0]}</text>`:""}</g>`;s+=`<line x1="${X(p[2])}" y1="62" x2="${X(p[2])}" y2="${H-30}" stroke="var(--bd)" stroke-width="1"/>`});
PREEXT.forEach(e=>{s+=`<g class="dt-ext"><line x1="${X(e[0])}" y1="66" x2="${X(e[0])}" y2="${H-30}"/><text x="${X(e[0])+3}" y="${H-18}" transform="rotate(-0)">${e[1].replace("End-","")}</text></g>`});
ids.forEach((id,i)=>{const r=PRE[id],y=top+i*rh,a=X(r[2]),b=X(r[3]),col=gOf(id)[1],mid=(a+b)/2,right=(mid<W*.62&&b<Rt-130)||a-L<130;
s+=`<g class="dt-row${id==sel?" on":""}" data-id="${id}" tabindex="0" role="button" aria-label="${es(nm(id))}, ${es(when(r))}"><rect class="hl" x="${L}" y="${y-rh/2+1}" width="${Rt-L}" height="${rh-2}" rx="8" fill="transparent"/>`+
(b-a>8?`<rect x="${a}" y="${y-5}" width="${b-a}" height="10" rx="5" fill="${col}"/>`:`<circle cx="${mid}" cy="${y}" r="6.5" fill="${col}" class="pdot"/>`)+
`<text x="${right?Math.max(a,b)+12:Math.min(a,b)-12}" y="${y+4.5}" text-anchor="${right?"start":"end"}">${es(nm(id))}</text></g>`});
[540,500,450,400,350,300,250,200,150,100,50,0].forEach(m=>{s+=`<text class="dt-ax" x="${X(m)}" y="${top-12}" text-anchor="middle">${m}</text>`});
V.innerHTML=shell("deeptime","Deep time",`The last 540 million years of life on Earth, from the Cambrian seas to today. Each animal sits where its fossils are found in the rocks. Red lines mark the five great mass extinctions. Numbers are millions of years ago.`)+
`<div class="pcard"><div class="flg" aria-hidden="true">${GRP.map(g=>`<button tabindex="-1" style="--gc:${g[1]}"><i></i>${g[0]}</button>`).join("")}</div><div class="dtw"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of prehistoric animals">${s}</svg></div><div class="pinfo" id="pinf" aria-live="polite">${info(sel)}</div></div></div>`;
const pick=g=>{V.querySelectorAll(".dt-row").forEach(r=>r.classList.toggle("on",r==g));$("#pinf").innerHTML=info(g.dataset.id);history.replaceState(null,"","#/deeptime/"+g.dataset.id)};
V.querySelectorAll(".dt-row").forEach(g=>{g.onclick=()=>pick(g);g.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();pick(g)}}});
const on=V.querySelector(".dt-row.on"),w=V.querySelector(".dtw");if(on&&w&&w.scrollWidth>w.clientWidth){const bb=on.getBBox();w.scrollLeft=Math.max(0,bb.x/W*w.scrollWidth-w.clientWidth*.4)}};

/* ---------- #/fossilmap ---------- */
R.fossilmap=function(x){const sel=PRE[x]?x:null,show=new Set(GRP.map(g=>g[0]));let dots="";
IDS.forEach(id=>{const g=gOf(id);PRE[id][9].forEach((t,i)=>{const p=proj(t[1],t[2]);dots+=`<circle class="pdot" data-id="${id}" data-i="${i}" data-g="${es(g[0])}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${sel==id?8:5.5}" fill="${g[1]}" style="color:${g[1]}" tabindex="0" role="button" aria-label="${es(nm(id))}: ${es(t[0])}"/>`})});
V.innerHTML=shell("fossilmap","The fossil map",`Where fossils of the animals in this subject have been found. Tap a dot to see the place and the animal. Fossils are found where rocks of the right age come to the surface, so most dots sit in deserts, badlands, cliffs and quarries.`)+
`<div class="pcard"><div class="flg">${GRP.map(g=>`<button aria-pressed="true" data-g="${es(g[0])}" style="--gc:${g[1]}"><i></i>${g[0]}</button>`).join("")}</div><div class="fmap"><svg viewBox="0 0 1000 520" role="img" aria-label="World map of fossil sites">${mapBase()}${dots}</svg></div><div class="pinfo" id="pinf" aria-live="polite">${sel?info(sel):`<div>${silSvg("trex",140,90)}</div><div><h3>Choose a dot</h3><p>Each dot is a fossil site. Colors show the part of the story each animal belongs to.</p></div>`}</div></div></div>`;
const map=V.querySelector(".fmap"),svg=map.querySelector("svg");let pop=null;
const dim=()=>svg.querySelectorAll(".pdot").forEach(d=>d.classList.toggle("dim",!show.has(d.dataset.g)||(sel&&d.dataset.id!=sel&&!svg.dataset.all)));
if(sel){svg.dataset.all="";}dim();
const open=d=>{const id=d.dataset.id,t=PRE[id][9][+d.dataset.i];pop&&pop.remove();const bb=svg.getBoundingClientRect(),mb=map.getBoundingClientRect(),sx=bb.width/1000;
pop=document.createElement("div");pop.className="fpop";pop.innerHTML=`<b>${es(t[0])}</b><a href="#/art/${id}">${es(nm(id))}</a><br><span style="color:var(--mu)">${es(when(PRE[id]))}</span>`;
let px=+d.getAttribute("cx")*sx+bb.left-mb.left,py=+d.getAttribute("cy")*sx+bb.top-mb.top;px=Math.max(100,Math.min(mb.width-100,px));pop.style.left=px+"px";pop.style.top=py+"px";if(py<90)pop.style.transform="translate(-50%,16px)";map.appendChild(pop);
$("#pinf").innerHTML=info(id);delete svg.dataset.all;svg.querySelectorAll(".pdot").forEach(c=>{c.setAttribute("r",c.dataset.id==id?8:5.5);c.classList.toggle("dim",!show.has(c.dataset.g))})};
svg.querySelectorAll(".pdot").forEach(d=>{d.onclick=e=>{e.stopPropagation();open(d)};d.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();open(d)}}});
svg.addEventListener("click",()=>{pop&&pop.remove();pop=null});
V.querySelectorAll(".flg button").forEach(b=>b.onclick=()=>{const g=b.dataset.g,on=b.getAttribute("aria-pressed")=="true";b.setAttribute("aria-pressed",!on);on?show.delete(g):show.add(g);svg.dataset.all="1";dim()})};

/* ---------- #/sizes ---------- */
R.sizes=function(x){let picked=PRE[x]?[x,x=="trex"?"velociraptor":"trex"]:["trex","argentinosaurus","velociraptor"];let by="len",bus=innerWidth>600;
V.innerHTML=shell("sizes","Size comparer",`See prehistoric animals at the same scale as a person and a school bus. Pick up to five animals from the list, then sort the list by length, weight or age. Sizes are for large adults and are estimates.`)+
`<div class="szgrid"><div class="pcard"><div class="ptabs" role="group" aria-label="Sort by"><button data-b="len" class="on">Longest first</button><button data-b="wt">Heaviest first</button><button data-b="age">Oldest first</button></div><div class="szl" id="szl"></div></div><div class="pcard lineup" id="lup"></div></div><details class="ppc" style="margin-top:14px"><summary>Silhouette credits</summary>${IDS.filter(i=>PREPP[i]).map(i=>`${es(nm(i))}: ${es(PREPP[i][2])} (<a href="${PREPP[i][4]}" rel="noopener">${es(PREPP[i][3])}</a>)`).join("; ")}. From <a href="https://www.phylopic.org/" rel="noopener">PhyloPic</a>. Animals without a credit use the encyclopedia’s own outlines.</details></div>`;
const list=()=>{const val=id=>by=="len"?PRE[id][4]:by=="wt"?PRE[id][6]:PRE[id][2];const ids=IDS.slice().sort((a,b)=>(val(b)||-1)-(val(a)||-1)),mx=Math.max(...ids.map(val));
$("#szl").innerHTML=ids.map(id=>{const r=PRE[id],v=val(id),lab=by=="len"?r[8]:by=="wt"?kg(r[6]):when(r);const pct=v?Math.max(1.5,by=="age"?Math.log10(v*1e3)/Math.log10(mx*1e3)*100:v/mx*100):0;
return`<button class="szr${picked.includes(id)?" on":""}" data-id="${id}" aria-pressed="${picked.includes(id)}" style="--gc:${gOf(id)[1]}"><span class="ck">${picked.includes(id)?"✓":""}</span>${silSvg(id,92,40)}<span><span class="nm">${es(nm(id))}<span>${es(lab.replace(/^About /,"≈ ").replace(/^Up to about /,"≤ "))}</span></span><span class="bar"><i data-w="${pct.toFixed(1)}"></i></span></span></button>`}).join("");
requestAnimationFrame(()=>requestAnimationFrame(()=>V.querySelectorAll(".szr .bar i").forEach(i=>i.style.width=i.dataset.w+"%")));
V.querySelectorAll(".szr").forEach(b=>b.onclick=()=>{const id=b.dataset.id;if(picked.includes(id))picked=picked.filter(p=>p!=id);else{picked.push(id);if(picked.length>5)picked.shift()}list();draw()})};
const draw=()=>{const ids=picked.slice().sort((a,b)=>PRE[b][4]-PRE[a][4]),W=640,gap=.6;let tot=.5+gap,maxH=1.9;ids.forEach(id=>{tot+=PRE[id][4]+gap;maxH=Math.max(maxH,PRE[id][5])});if(bus){tot+=12+gap;maxH=Math.max(maxH,3.2)}
const s=Math.min((W-40)/tot,260/maxH),H=Math.max(150,maxH*s+80),gy=H-44;let xx=20,g="";
const put=(w,lbl,lbl2,svg)=>{g+=svg+`<text class="lb" x="${(xx+w*s/2).toFixed(1)}" y="${gy+20}" text-anchor="middle">${es(lbl)}</text><text class="lb2" x="${(xx+w*s/2).toFixed(1)}" y="${gy+35}" text-anchor="middle">${es(lbl2)}</text>`;xx+=(w+gap)*s};
put(.5,"Person","1.75 m",`<g class="hm">${preHuman(s,xx,gy)}</g>`);
if(bus)put(12,"School bus","12 m",`<g class="bus">${preBus(s,xx,gy)}</g>`);
ids.forEach(id=>{const r=PRE[id],p=preSil(r[7],r[4],r[5],s,xx,gy);put(r[4],nm(id),(r[4]>=1?(+r[4].toFixed(1))+" m":Math.round(r[4]*100)+" cm")+(r[7]=="ptero"?" wingspan":""),`<g class="sh" style="fill:${gOf(id)[1]}" data-pp="${id}" data-cx="${(xx+r[4]*s/2).toFixed(1)}" data-gy="${gy}" data-s="${s}" data-col="${gOf(id)[1]}"><path d="${p.d}"/>${p.deco?`<path d="${p.deco}" fill="none" stroke="var(--sf)" stroke-width="2"/>`:""}</g>`)});
const tiny=ids.filter(id=>PRE[id][4]*s<14).map(nm);
let rul="";const step=tot>40?10:tot>12?5:1;for(let m=0;m*s<W-40;m+=step)rul+=`<line class="ruler" x1="${20+m*s}" y1="${gy}" x2="${20+m*s}" y2="${gy+5}"/>`;
$("#lup").innerHTML=`<div class="ptabs" style="justify-content:space-between;align-items:center"><b style="font:900 18px var(--disp)">The line-up</b><button id="busb" aria-pressed="${bus}">${bus?"Hide":"Show"} the bus</button></div><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${es(["A person",...(bus?["a school bus"]:[]),...ids.map(nm)].join(", "))} drawn to the same scale"><line class="gnd" x1="10" y1="${gy}" x2="${W-10}" y2="${gy}"/>${rul}${g}</svg>`+
(tiny.length?`<p style="margin:6px 4px 0;color:var(--mu);font:600 13px system-ui">${es(tiny.join(" and "))} ${tiny.length>1?"are":"is"} too small to see well at this scale. Hide the bus or remove the biggest animals to zoom in.</p>`:"")+(ids.length?"":`<p style="color:var(--mu)">Pick animals from the list to add them.</p>`)+(ids.some(i=>PREPP[i])?`<p class="ppc">Silhouettes via PhyloPic: ${ids.filter(i=>PREPP[i]).map(i=>es(nm(i)+": "+PREPP[i][2]+" ("+PREPP[i][3]+")")).join("; ")}. Drawn by the encyclopedia when offline.</p>`:"");
$("#busb").onclick=()=>{bus=!bus;draw()}};
V.querySelectorAll("[data-b]").forEach(b=>b.onclick=()=>{by=b.dataset.b;V.querySelectorAll("[data-b]").forEach(c=>c.classList.toggle("on",c==b));list()});list();draw()};

/* ---------- tools on the subject page ---------- */
const oc=R.cat;R.cat=function(c){oc(c);if(c!=SUB)return;const op=V.querySelector(".opener");if(!op||V.querySelector(".pltools"))return;
const tl=`<svg viewBox="0 0 200 120"><g fill="#fff">${PREPER.map((p,i)=>`<rect x="${i*16}" y="${70-((i*37)%40)}" width="14" height="${30+((i*37)%40)}" rx="3"/>`).join("")}</g></svg>`;
const mp=`<svg viewBox="0 0 200 120" fill="#fff"><circle cx="60" cy="40" r="9"/><circle cx="110" cy="70" r="7"/><circle cx="150" cy="35" r="11"/><circle cx="90" cy="95" r="6"/><circle cx="170" cy="90" r="8"/></svg>`;
const sz=(()=>{const p=preSil("sauropod",120,40,1,70,118),q=preSil("theropod",40,14,1,20,118);return`<svg viewBox="0 0 200 120" fill="#fff"><path d="${p.d}"/><path d="${q.d}"/></svg>`})();
op.insertAdjacentHTML("afterend",`<div class="pltools"><a href="#/deeptime" style="--t1:#6b5b0e;--t2:#a16207"><b>Deep time</b><span>A 540-million-year timeline of the animals in this subject.</span>${tl}</a><a href="#/fossilmap" style="--t1:#0e7490;--t2:#155e75"><b>Fossil map</b><span>Where in the world their fossils were dug up.</span>${mp}</a><a href="#/sizes" style="--t1:#c2410c;--t2:#9a3412"><b>Size comparer</b><span>Line them up next to a person and a school bus.</span>${sz}</a></div>`)};
})();
