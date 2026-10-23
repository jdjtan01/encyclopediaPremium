/* Location maps, data charts and fixed photos with aimed labels.
   Fixed photos: data/images-pinned.js (window.PINNED) lists, for an article, a Wikimedia Commons file and,
   optionally, points on the photo that each fact label points to. The photo editor (turned on from
   the About page) lets an editor choose photos and aim labels, then export a new images-pinned.js. */
(()=>{
const enc=encodeURIComponent,LOC=window.LOC||{},CH=window.CHARTS||{},WORLD=window.WORLD||[];

/* ---------- Fixed photos ---------- */
const PK="pinEdits",edits=()=>ls(PK,{}),pins=()=>Object.assign({},window.PINNED||{},edits());
const FP=f=>"https://commons.wikimedia.org/wiki/Special:FilePath/"+enc(f)+"?width=1200";
function applyPins(){const P=pins();Object.entries(P).forEach(([id,p])=>{const a=get(id);if(a&&p.file){a.file=p.file;a.src="commons";a.img=FP(p.file);a.failed=0;a.pinned=1}})}
applyPins();
const editing=()=>ls("photoEdit",false);

/* Draw leader lines from each callout to the point it is aimed at on the photo. */
function drawPts(id){const P=pins()[id],hero=V.querySelector(".hero"),bn=hero&&hero.querySelector(".ban.big"),img=bn&&bn.querySelector("img");if(!hero)return;hero.querySelector("svg.aim")&&hero.querySelector("svg.aim").remove();
if(!P||!P.pts||!img||!img.naturalWidth||innerWidth<=860)return;const a=get(id),hr=hero.getBoundingClientRect(),br=bn.getBoundingClientRect(),nw=img.naturalWidth,nh=img.naturalHeight,s=Math.max(br.width/nw,br.height/nh),dw=nw*s,dh=nh*s,ox=(br.width-dw)/2,oy=(br.height-dh)/2;
let g="";hero.querySelectorAll(".cl1").forEach((c,i)=>{const k=a.k[i]&&a.k[i][0],pt=k&&P.pts[k];if(!pt)return;const cr=c.querySelector("i").getBoundingClientRect(),x1=cr.left+cr.width/2-hr.left,y1=cr.top+cr.height/2-hr.top,x2=br.left-hr.left+ox+pt[0]*dw,y2=br.top-hr.top+oy+pt[1]*dh;
g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><circle cx="${x2}" cy="${y2}" r="5"/>`});
if(g)hero.insertAdjacentHTML("beforeend",`<svg class="aim" width="${hr.width}" height="${hr.height}" aria-hidden="true">${g}</svg>`)}
addEventListener("resize",()=>{window.curArt&&drawPts(window.curArt)});

/* ---------- Location map ---------- */
function locSVG(L){const[lon,lat,cn,span,label]=L,cx=lon+180,cy=90-lat,w=span,h=span*.62;let x0=cx-w/2,y0=Math.min(Math.max(cy-h/2,0),180-h);const sw=w/420;
const paths=WORLD.map(c=>`<path d="${c[1]}"${c[0]==cn?' class="hl"':""}/>`).join("");
const inset=span<=60?`<g transform="translate(${x0+w*.02},${y0+h*.03}) scale(${w*.26/360})"><rect width="360" height="180" class="ins"/><g class="land">${WORLD.map(c=>`<path d="${c[1]}"/>`).join("")}</g><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" class="box" stroke-width="${Math.max(2,360/120)}"/></g>`:"";
return `<svg viewBox="${x0} ${y0} ${w} ${h}" class="locsvg" role="img" aria-label="Map showing ${esc(label)}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" class="sea"/><g class="land" stroke-width="${sw}">${paths}<g transform="translate(-360,0)">${paths}</g><g transform="translate(360,0)">${paths}</g></g><circle cx="${cx}" cy="${cy}" r="${w/28}" class="pin2"/><circle cx="${cx}" cy="${cy}" r="${w/70}" class="pin"/>${inset}</svg>`}

window.locSVG=locSVG;
/* ---------- Charts ---------- */
const fmt=v=>Math.abs(v)>=100?Math.round(v).toLocaleString("en-US"):String(+v.toFixed(2));
function chartSVG(c){const W=640,H=270,ml=48,mr=14,mt=16,mb=34,iw=W-ml-mr,ih=H-mt-mb,mx=Math.max(...c.y),step=[1,2,2.5,5,10].map(m=>m*Math.pow(10,Math.floor(Math.log10(mx/4)))).find(s=>mx/s<=5),top=Math.ceil(mx*1.1/step)*step,yy=v=>mt+ih-ih*v/top;
let g="";for(let v=0;v<=top+1e-9;v+=step)g+=`<line x1="${ml}" x2="${W-mr}" y1="${yy(v)}" y2="${yy(v)}" class="grid"/><text x="${ml-6}" y="${yy(v)+4}" text-anchor="end" class="tick">${fmt(v)}</text>`;
const n=c.y.length,bw=iw/n;
c.x.forEach((l,i)=>g+=`<text x="${ml+bw*(i+.5)}" y="${H-12}" text-anchor="middle" class="tick">${esc(l)}</text>`);
if(c.type=="bar"){c.y.forEach((v,i)=>{const x=ml+bw*i+bw*.18,w=bw*.64,y=yy(v),h=mt+ih-y,r=Math.min(4,w/2,h);g+=`<path class="mk" data-i="${i}" d="M${x},${mt+ih}V${y+r}Q${x},${y} ${x+r},${y}H${x+w-r}Q${x+w},${y} ${x+w},${y+r}V${mt+ih}Z"/>`})}
else{const pts=c.y.map((v,i)=>[ml+bw*(i+.5),yy(v)]);g+=`<path class="ln2" d="M${pts.map(p=>p.join(",")).join("L")}"/>`+pts.map((p,i)=>`<circle class="mk dot2" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="4.5"/>`).join("")}
const li=n-1;g+=`<text x="${c.type=="bar"?ml+bw*(li+.5):ml+bw*(li+.5)-8}" y="${yy(c.y[li])-10}" text-anchor="${c.type=="bar"?"middle":"end"}" class="vlab">${fmt(c.y[li])}</text>`;
g+=c.x.map((l,i)=>`<rect class="hit" data-i="${i}" x="${ml+bw*i}" y="${mt}" width="${bw}" height="${ih}"/>`).join("");
return `<div class="chartw"><svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(c.t)}"><line x1="${ml}" x2="${W-mr}" y1="${mt+ih}" y2="${mt+ih}" class="axis"/>${g}</svg><div class="tip" hidden></div></div><p class="cap" style="margin-top:2px">${esc(c.u[0].toUpperCase()+c.u.slice(1))}. ${esc(c.src)}</p><details class="tbl"><summary>Show the data as a table</summary><table><tr><th></th><th>${esc(c.u)}</th></tr>${c.x.map((l,i)=>`<tr><td>${esc(l)}</td><td>${fmt(c.y[i])}</td></tr>`).join("")}</table></details>`}
function bindChart(root,c){const w=root.querySelector(".chartw"),tip=w.querySelector(".tip"),svg=w.querySelector("svg");
svg.querySelectorAll(".hit").forEach(h=>{h.onmouseenter=h.onfocus=()=>{const i=+h.dataset.i;svg.querySelectorAll(".mk").forEach(m=>m.classList.toggle("on",+m.dataset.i==i));tip.hidden=false;tip.innerHTML=`<b>${esc(c.x[i])}</b>${fmt(c.y[i])} ${esc(c.u)}`;const r=h.getBoundingClientRect(),wr=w.getBoundingClientRect();tip.style.left=Math.min(Math.max(r.left-wr.left+r.width/2,60),wr.width-60)+"px"};h.onmouseleave=()=>{tip.hidden=true;svg.querySelectorAll(".mk").forEach(m=>m.classList.remove("on"))}})}

/* ---------- Article additions ---------- */
const prev=R.art;
R.art=function(id){prev(id);const a=get(id);if(!a)return;
const before=(i,html)=>{const h=document.getElementById("s"+i);if(h)h.insertAdjacentHTML("beforebegin",html)};
const L=LOC[id];if(L)before(3,`<figure class="ph fl locm"><div class="lochd">Where in the world</div>${locSVG(L)}<figcaption><b>📍 ${esc(L[4])}</b>${L[2]&&!L[4].includes(L[2])&&!(L[2]=="Philippines"&&L[3]>20)?` ${esc(L[2]=="Philippines"?"in the Philippines":L[2])}`:""}</figcaption></figure>`);
const c=CH[id];if(c){before(6,`<section class="panelx" id="chart"><div class="hd">${esc(c.t)}<span>Chart</span></div><div class="in">${chartSVG(c)}</div></section>`);const el=$("#chart");el&&bindChart(el,c)}
const img=V.querySelector(".hero .ban.big img");const draw=()=>drawPts(id);if(img){img.complete?setTimeout(draw,30):img.addEventListener("load",()=>setTimeout(draw,30))}
if(!img){const mo=new MutationObserver((m,o)=>{const im=V.querySelector(".hero .ban.big img");if(im){o.disconnect();im.addEventListener("load",()=>setTimeout(draw,30))}});mo.observe(V,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),8000)}
if(editing())editor(a)};

/* ---------- Photo editor ---------- */
function editor(a){const hero=V.querySelector(".hero")||V.querySelector(".ban.big");if(!hero)return;const P=pins()[a.id]||{};
hero.insertAdjacentHTML("afterend",`<div class="pe"><b class="disp">Photo editor</b> <small class="mu">${P.file?"Fixed photo: "+esc(P.file):"Automatic photo"}</small><br><button class="btn sm" id="pec">Choose a photo</button><select id="pek" aria-label="Label to aim">${(a.k||[]).slice(0,6).map(k=>`<option>${esc(k[0])}</option>`).join("")}</select><button class="btn sm" id="pea">Aim this label</button><button class="btn sm" id="pex">Clear label lines</button><button class="btn sm" id="per">Use automatic photo</button><span id="pem" class="mu" style="font:13px system-ui"></span><div id="peg"></div></div>`);
const save=f=>{const E=edits();E[a.id]=Object.assign({},pins()[a.id]||{},f);sv(PK,E)},msg=t=>$("#pem").textContent=" "+t;
$("#pec").onclick=()=>{$("#peg").innerHTML="<p class='mu'>Loading photos from Wikipedia…</p>";const t=WIKI[a.id]||sortT(a.t);
fetch(WAPI+"&prop=images&imlimit=60&redirects=1&titles="+enc(t)).then(r=>r.json()).then(d=>{const pg=Object.values((d.query||{}).pages||{})[0]||{};const f=(pg.images||[]).map(x=>x.title).filter(x=>/\.(jpe?g|png)$/i.test(x)&&!BADIMG.test(x)).slice(0,24);if(!f.length){$("#peg").innerHTML="<p>No photos found on this Wikipedia page.</p>";return}
return fetch(WAPI+"&prop=imageinfo&iiprop=url&iiurlwidth=240&titles="+enc(f.join("|"))).then(r=>r.json()).then(d=>{const L=Object.values((d.query||{}).pages||{}).map(p=>[p.title,((p.imageinfo||[])[0]||{}).thumburl]).filter(x=>x[1]);
$("#peg").innerHTML=`<div class="peg">${L.map(x=>`<button data-f="${esc(x[0].replace(/^File:/,""))}" title="${esc(x[0])}"><img src="${esc(x[1])}" alt="" referrerpolicy="no-referrer"></button>`).join("")}</div>`;
$("#peg").querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{save({file:b.dataset.f,pts:{}});applyPins();R.art(a.id)})})}).catch(()=>{$("#peg").innerHTML="<p>Could not reach Wikipedia.</p>"})};
$("#pea").onclick=()=>{const bn=V.querySelector(".hero .ban.big"),img=bn&&bn.querySelector("img");if(!img||!img.naturalWidth){msg("Load a photo first.");return}msg("Now click the point on the photo that this label describes.");bn.style.cursor="crosshair";
bn.onclick=e=>{const br=bn.getBoundingClientRect(),nw=img.naturalWidth,nh=img.naturalHeight,s=Math.max(br.width/nw,br.height/nh),dw=nw*s,dh=nh*s,ox=(br.width-dw)/2,oy=(br.height-dh)/2,fx=(e.clientX-br.left-ox)/dw,fy=(e.clientY-br.top-oy)/dh;const p=pins()[a.id]||{};const pts=Object.assign({},p.pts||{});pts[$("#pek").value]=[+fx.toFixed(4),+fy.toFixed(4)];save({file:p.file||a.file,pts});bn.onclick=null;bn.style.cursor="";msg("Saved.");drawPts(a.id)}};
$("#pex").onclick=()=>{save({pts:{}});drawPts(a.id);msg("Label lines cleared.")};
$("#per").onclick=()=>{const E=edits();delete E[a.id];sv(PK,E);msg("Reload the page to return to the automatic photo.")}}

/* ---------- About page: editor switch and export ---------- */
const oa=R.about;R.about=function(){oa();const E=edits(),n=Object.keys(E).length,all=pins();
V.insertAdjacentHTML("beforeend",`<h3>Photo editor</h3><p>Editors can fix the photo for each article, choosing from the photos on its Wikipedia page, and aim each fact label at the feature it describes. Choices are saved in this browser, then exported as a file that fixes them for every reader.</p><p><label><input type="checkbox" id="pet"${editing()?" checked":""}> Turn on the photo editor</label></p><p class="mu" style="font:14px system-ui">${Object.keys(all).length} articles have fixed photos; ${n} were changed in this browser.</p><button class="btn" id="pdl"${Object.keys(all).length?"":" disabled"}>Download images-pinned.js</button><button class="btn" id="pcl"${n?"":" disabled"}>Discard changes made in this browser</button><p class="mu" style="font:13px system-ui">To publish, replace <code>data/images-pinned.js</code> in the encyclopedia folder with the downloaded file.</p>`);
$("#pet").onchange=e=>sv("photoEdit",e.target.checked);
$("#pdl").onclick=()=>{const t="// Fixed photos and label points, exported from the photo editor.\n// file: a Wikimedia Commons file name. pts: label -> [x, y] as fractions of the photo’s width and height.\nwindow.PINNED=Object.assign(window.PINNED||{},"+JSON.stringify(all,null,1)+");\n";const u=URL.createObjectURL(new Blob([t],{type:"text/javascript"})),l=document.createElement("a");l.href=u;l.download="images-pinned.js";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)};
$("#pcl").onclick=()=>{sv(PK,{});R.about()}};
})();
