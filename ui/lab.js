// The Lab: an interactive showcase of the encyclopedia's tools on the home page (v149).
(function(){
if(typeof R=="undefined")return;
const RM=matchMedia("(prefers-reduced-motion: reduce)"),FINE=matchMedia("(hover:hover) and (pointer:fine)");
const ttl=id=>{try{const a=get(id);return a?a.t:id}catch(e){return id}};
const K=182.78964407016807,proj=(la,lo)=>{const p=la*Math.PI/180,l=lo*Math.PI/180,p2=p*p,p4=p2*p2;return[500+K*l*(.8707-.131979*p2+p4*(-.013791+p4*p2*(.003971-.001529*p2))),260-K*p*(1.007226+p2*(.015085+p4*(-.044475+.028874*p2-.005916*p4)))]};
const fy=y=>y<0?(-y)+" BCE":y+" CE";
// Empires to sample on the mini history map: [year, [[name, lon, lat, [extra dots]]]]
const ERAS=[
[-500,[["Achaemenid Persia",52,32]]],
[117,[["Roman Empire",13,42],["Han China",109,34]]],
[750,[["Abbasid Caliphate",44,33],["Tang China",108,33]]],
[1279,[["Mongol Empire",100,47]]],
[1500,[["Inca Empire",-73,-13],["Ottoman Empire",32,39],["Ming China",114,31]]],
[1700,[["Spanish Empire",-100,21],["Mughal Empire",78,24],["Qing China",112,36]]],
[1900,[["British Empire",-2,53,[[78,22],[-100,56],[134,-25],[25,-29]]]]]];
const SPANS=[["Achaemenid Persia",-550,-330,"Persia"],["Han China",-202,220,"Han"],["Roman Empire",-27,476,"Rome"],["Tang China",618,907,"Tang"],["Abbasid Caliphate",750,1258,"Abbasids"],["Mongol Empire",1206,1368,"Mongols"],["Ottoman Empire",1299,1922,"Ottomans"],["Ming China",1368,1644,"Ming"],["Inca Empire",1438,1533,"Inca"],["Mughal Empire",1526,1857,"Mughals"],["Qing China",1644,1912,"Qing"]],Y0=-600,Y1=2000,yx=y=>(y-Y0)/(Y1-Y0)*100;
const LANES=(()=>{const ln=[];SPANS.forEach(e=>{let k=ln.findIndex(l=>l[l.length-1][2]+150<e[1]);if(k<0){ln.push([]);k=ln.length-1}ln[k].push(e)});return ln})();
const SIZES=[["trex","T. rex"],["brachiosaurus","Brachiosaurus"],["megalodon","Megalodon"],["quetzalcoatlus","Quetzalcoatlus"],["smilodon","Smilodon"],["argentinosaurus","Argentinosaurus"]].filter(x=>window.PRE&&PRE[x[0]]);
const css=`
.lab{--lb:#0a0f24;--lb2:#121a3a;--lt:#eef1ff;--lm:#a8b1d6;--ll:rgba(160,175,255,.14);position:relative;margin:8px 0 34px;padding:34px 26px 26px;border-radius:30px;background:radial-gradient(1200px 500px at 85% -10%,#2a1a5e 0,transparent 60%),radial-gradient(900px 500px at 0% 110%,#0d3b52 0,transparent 55%),var(--lb);color:var(--lt);overflow:hidden;isolation:isolate}
.lab:before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--ll) 1px,transparent 1px),linear-gradient(90deg,var(--ll) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse at 50% 0,#000 0,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at 50% 0,#000 0,transparent 75%);z-index:-1;pointer-events:none}
.lab:after{content:"";position:absolute;width:520px;height:520px;left:var(--sx,-999px);top:var(--sy,-999px);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(140,120,255,.18),transparent 65%);pointer-events:none;z-index:-1;transition:opacity .4s}
.lab-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap;margin:0 4px 22px}
.lab-hd h2{font-family:var(--disp);font-weight:900;font-size:clamp(2.6rem,7vw,4.6rem);line-height:.9;letter-spacing:-.035em;margin:0;color:var(--lt);background:linear-gradient(100deg,#ffd36e 0,#ff7ab6 30%,#9d8bff 55%,#5fe3c0 80%,#ffd36e 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:labsh 9s linear infinite}
@keyframes labsh{to{background-position:-200% 0}}
.lab-hd p{margin:.5em 0 0;color:var(--lm);max-width:34em;font-size:1rem;line-height:1.5}
.lab-ct{display:flex;gap:8px;flex-wrap:wrap}
.lab-ct span{font:600 .82rem/1 system-ui,sans-serif;padding:8px 12px;border-radius:99px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:var(--lt)}
.lab-ct b{font-family:var(--disp);font-size:1.05rem;margin-right:4px}
.lab-g{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}.lab-sw{display:contents}
.lc{--ac:#9d8bff;position:relative;border-radius:22px;padding:18px 18px 16px;background:linear-gradient(160deg,rgba(255,255,255,.075),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.08);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0));transition:transform .25s ease,border-color .3s,box-shadow .3s;display:flex;flex-direction:column;min-width:0}
.lc:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,-20%),color-mix(in srgb,var(--ac) 22%,transparent),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.lc:hover{border-color:color-mix(in srgb,var(--ac) 55%,transparent);box-shadow:0 0 0 1px color-mix(in srgb,var(--ac) 30%,transparent),0 18px 50px -18px color-mix(in srgb,var(--ac) 70%,transparent)}
.lc:hover:before,.lc:focus-within:before{opacity:1}
.lc h3{font-family:var(--disp);font-weight:800;font-size:1.32rem;letter-spacing:-.01em;margin:0 0 2px;color:var(--lt);display:flex;align-items:center;gap:9px}
.lc h3 i{font-style:normal;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;font-size:1rem;background:color-mix(in srgb,var(--ac) 22%,transparent);box-shadow:0 0 18px -2px color-mix(in srgb,var(--ac) 70%,transparent)}
.lc .ls{color:var(--lm);font-size:.9rem;margin:0 0 12px;line-height:1.4}
.lc .go{margin-top:auto;align-self:flex-start;font:700 .88rem/1 system-ui,sans-serif;color:#0a0f24;background:var(--ac);padding:10px 15px;border-radius:99px;text-decoration:none;box-shadow:0 6px 20px -6px var(--ac);transition:transform .15s,filter .15s}
.lc .go:hover{transform:translateY(-1px);filter:brightness(1.1)}
.lc .go:focus-visible,.lab button:focus-visible,.lab input:focus-visible,.lab a:focus-visible{outline:3px solid #fff;outline-offset:2px}
.lc-map{grid-column:span 7;grid-row:span 2;--ac:#ffb547}.lc-dt{grid-column:span 5;--ac:#c58bff}.lc-sz{grid-column:span 5;--ac:#5fe3c0}
.lc-fm{grid-column:span 4;--ac:#ff7a59}.lc-fl{grid-column:span 4;--ac:#59b8ff}.lc-qz{grid-column:span 4;--ac:#ff5fa2}
.lab svg{display:block;width:100%;height:auto}
.lm-svg{border-radius:14px;background:radial-gradient(ellipse at 50% 40%,#16224d,#0b1230);margin:2px 0 12px}
.lm-svg .sea{fill:#0f1a40;stroke:rgba(160,175,255,.25);stroke-width:1.2}.lm-svg .land{fill:#2a3768;stroke:#3c4b85;stroke-width:.6}
.lab .grat{fill:none;stroke:rgba(160,175,255,.1);stroke-width:.6}
.emp{transform-box:fill-box;transform-origin:center;animation:empin .55s cubic-bezier(.2,1.4,.4,1) both}
@keyframes empin{from{opacity:0;transform:scale(.3)}}
.emp .halo{fill:url(#labglow)}.emp .core{fill:#ffd27a;stroke:#fff;stroke-width:1.5}.emp .sat{fill:#ffd27a;opacity:.85}
.emp text{font:800 21px var(--disp);fill:#fff;paint-order:stroke;stroke:#0a0f24;stroke-width:5px;stroke-linejoin:round}
.lm-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.lm-yr{font-family:var(--disp);font-weight:900;font-size:2.4rem;line-height:1;color:#ffd27a;min-width:4.4em;text-shadow:0 0 24px rgba(255,181,71,.55);font-variant-numeric:tabular-nums}
.lm-rng{flex:1;min-width:180px}
.lab input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:30px;background:transparent;cursor:pointer}
.lab input[type=range]::-webkit-slider-runnable-track{height:6px;border-radius:9px;background:linear-gradient(90deg,var(--ac) var(--p,0%),rgba(255,255,255,.15) var(--p,0%))}
.lab input[type=range]::-moz-range-track{height:6px;border-radius:9px;background:linear-gradient(90deg,var(--ac) var(--p,0%),rgba(255,255,255,.15) var(--p,0%))}
.lab input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;margin-top:-8px;border-radius:50%;background:#fff;border:4px solid var(--ac);box-shadow:0 0 16px var(--ac)}
.lab input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:4px solid var(--ac);box-shadow:0 0 16px var(--ac)}
.lm-tk{display:flex;justify-content:space-between;font:600 .72rem/1 system-ui,sans-serif;color:var(--lm);margin:0 10px 12px}
.lm-tk button{all:unset;cursor:pointer;padding:4px 2px}.lm-tk button[aria-pressed=true]{color:#ffd27a}
.lm-who{min-height:1.4em;color:var(--lt);font-weight:600;margin:0 0 12px}
.lm-play{all:unset;cursor:pointer;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(255,181,71,.16);border:1px solid rgba(255,181,71,.5);color:#ffd27a;font-size:1rem}
.gt{position:relative;margin:4px 0 14px;padding-top:4px}
.gt-l{position:relative;height:24px;margin-bottom:4px}
.gt-b{all:unset;position:absolute;top:0;height:24px;border-radius:7px;min-width:30px;background:rgba(255,181,71,.16);border:1px solid rgba(255,181,71,.35);font:700 .7rem/22px system-ui,sans-serif;color:#ffe1ad;padding:0 5px;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:clip;cursor:pointer;transition:background .25s,box-shadow .25s,color .25s}
.gt-b:hover{background:rgba(255,181,71,.32)}.gt-b.on{background:#ffb547;color:#1d1300;box-shadow:0 0 18px rgba(255,181,71,.6)}
.gt-now{position:absolute;top:0;bottom:16px;width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 10px #fff;transition:left .5s cubic-bezier(.3,1.2,.4,1);pointer-events:none}
.gt-ax{display:flex;justify-content:space-between;font:600 .68rem/1 system-ui,sans-serif;color:var(--lm);margin-top:2px}
.gt-h{font:700 .78rem/1 system-ui,sans-serif;color:var(--lm);margin:0 0 6px}
.dt-bar{position:relative;height:56px;border-radius:12px;overflow:hidden;display:flex;cursor:crosshair;touch-action:none;box-shadow:0 0 0 1px rgba(255,255,255,.12)}
.dt-bar span{height:100%;transition:filter .2s,transform .2s}.dt-bar span.on{filter:brightness(1.25) saturate(1.2)}
.dt-bar span:not(.on){filter:saturate(.55) brightness(.7)}
.dt-ptr{position:absolute;top:-6px;bottom:-6px;width:3px;margin-left:-1.5px;background:#fff;border-radius:3px;box-shadow:0 0 12px #fff;pointer-events:none;transition:left .08s linear}
.dt-eras{display:flex;font:600 .72rem/1 system-ui,sans-serif;color:var(--lm);margin:7px 0 10px}
.dt-eras span{text-align:center;border-top:2px solid rgba(255,255,255,.2);padding-top:5px;margin:0 1px;white-space:nowrap;overflow:hidden}.dt-eras span:last-child{overflow:visible;direction:rtl;text-align:left}
.dt-out{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:6px}
.dt-out b{font-family:var(--disp);font-weight:900;font-size:1.7rem;color:var(--pc,#fff);text-shadow:0 0 20px color-mix(in srgb,var(--pc,#fff) 60%,transparent)}
.dt-out small{color:var(--lm);font-size:.86rem}
.dt-sp{display:flex;flex-wrap:wrap;gap:6px;min-height:30px;margin-bottom:12px}
.dt-sp a,.dt-sp em{font:600 .8rem/1 system-ui,sans-serif;padding:7px 10px;border-radius:99px;background:rgba(255,255,255,.08);color:var(--lt);text-decoration:none;font-style:normal;animation:empin .35s both}
.dt-sp em{color:var(--lm);background:none;padding-left:0}
.dt-sp a:hover{background:rgba(197,139,255,.3)}
.sz-ch{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}
.sz-ch button{all:unset;cursor:pointer;font:600 .8rem/1 system-ui,sans-serif;padding:7px 11px;border-radius:99px;background:rgba(255,255,255,.08);color:var(--lt);transition:background .2s}
.sz-ch button[aria-pressed=true]{background:#5fe3c0;color:#06231c}
.sz-svg .gl{stroke:rgba(255,255,255,.35);stroke-width:1.5;stroke-dasharray:4 5}
.sz-svg .an{fill:#5fe3c0;filter:drop-shadow(0 0 10px rgba(95,227,192,.55))}
.sz-svg .an g{transform-box:fill-box;transform-origin:50% 100%;animation:szin .6s cubic-bezier(.2,1.3,.4,1) both}
@keyframes szin{from{opacity:0;transform:scaleY(.2)}}
.sz-svg .hu{fill:#fff}.sz-svg text{font:700 13px system-ui,sans-serif;fill:var(--lm)}
.sz-svg .big{font:900 22px var(--disp);fill:#fff}
.fm-svg .land{fill:#28335f}.fm-svg .sea{fill:#0e183b}
.fm-dot{cursor:pointer}.fm-dot .d{fill:#ff7a59;stroke:#fff;stroke-width:1.2;transform-box:fill-box;transform-origin:center;transition:transform .2s}
.fm-dot .h{fill:transparent}.fm-dot:hover .d,.fm-dot:focus .d,.fm-dot.on .d{transform:scale(1.9);fill:#ffd27a}
.lab.lit .fm-dot .d{animation:empin .5s both;animation-delay:calc(var(--i)*35ms)}
.fm-try{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 4px}.fm-try button{all:unset;cursor:pointer;font:600 .78rem/1 system-ui,sans-serif;padding:7px 10px;border-radius:99px;background:rgba(255,122,89,.14);border:1px solid rgba(255,122,89,.35);color:#ffd0c2}.fm-try button:hover,.fm-try button[aria-pressed=true]{background:#ff7a59;color:#2a0d05}
.fm-tip{min-height:2.6em;color:var(--lt);font-size:.88rem;margin:6px 0 10px;line-height:1.35}.fm-tip small{color:var(--lm)}
.fl-box{display:flex;align-items:center;gap:16px;margin:8px 0 16px;min-height:110px;flex-wrap:wrap}
.fl-box img{width:150px;height:100px;flex:none;object-fit:cover;border-radius:8px;box-shadow:0 8px 28px -8px rgba(89,184,255,.7),0 0 0 1px rgba(255,255,255,.15);background:#1a2450}
.fl-box.spin img{animation:flspin .12s linear}
@keyframes flspin{from{transform:rotateX(80deg);opacity:.4}}
.fl-x{margin:0;display:grid;gap:6px;width:100%;font-size:.84rem}.fl-x div{display:flex;gap:8px;padding:7px 10px;border-radius:10px;background:rgba(255,255,255,.05)}.fl-x dt{color:var(--lm);min-width:5.6em}.fl-x dd{margin:0;color:var(--lt);font-weight:600}
.fl-n{font-family:var(--disp);font-weight:800;font-size:1.2rem;line-height:1.1}.fl-n a{color:var(--lt);text-decoration:none}.fl-n a:hover{text-decoration:underline}
.fl-c{color:var(--lm);font-size:.85rem;margin-top:4px}
.lab .sb{all:unset;cursor:pointer;font:700 .85rem/1 system-ui,sans-serif;padding:10px 14px;border-radius:99px;border:1px solid color-mix(in srgb,var(--ac) 60%,transparent);color:var(--lt);background:color-mix(in srgb,var(--ac) 14%,transparent)}
.lab .sb:hover{background:color-mix(in srgb,var(--ac) 28%,transparent)}
.lc .acts{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto}.lc .acts .go{margin-top:0}
.qz-q{font-weight:600;margin:2px 0 10px;min-height:2.6em;line-height:1.35}
.qz-o{display:grid;gap:7px;margin-bottom:12px}
.qz-o button{all:unset;cursor:pointer;font:600 .9rem/1.2 system-ui,sans-serif;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);transition:background .2s,transform .15s}
.qz-o button:hover:not(:disabled){background:rgba(255,95,162,.2)}
.qz-o button.ok{background:#1f9d6b;border-color:#5fe3c0;animation:qzok .4s}
.qz-o button.no{background:#a3324f;border-color:#ff5fa2;animation:qzno .35s}
@keyframes qzok{50%{transform:scale(1.04)}}@keyframes qzno{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.qz-st{font:700 .85rem/1 system-ui,sans-serif;color:var(--lm)}.qz-st b{color:#ff9ac4;font-family:var(--disp);font-size:1.1rem}
.lab-more{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:14px;padding:2px 2px 6px}
.lab-more a{min-width:0;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--lt);text-decoration:none;font-weight:700;font-size:.92rem;transition:background .2s,transform .2s,border-color .2s}
.lab-more a span{font-size:1.25rem;transition:transform .3s}
.lab-more a small{display:block;font-weight:500;color:var(--lm);font-size:.76rem;margin-top:2px}
.lab-more a:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);transform:translateY(-2px)}
.lab-more a:hover span{transform:scale(1.25) rotate(-8deg)}
@media (max-width:980px){.lab-more{grid-template-columns:repeat(3,1fr)}.lc-map{grid-column:span 12;grid-row:auto}.lc-dt,.lc-sz{grid-column:span 6}.lc-fm,.lc-fl,.lc-qz{grid-column:span 6}.lc-qz{grid-column:span 12}}
@media (max-width:640px){.lab{padding:24px 14px 16px;border-radius:22px;margin-left:-4px;margin-right:-4px}.lab-g{gap:10px}.lc-dt,.lc-sz,.lc-fm,.lc-fl,.lc-qz{grid-column:span 12}.lm-yr{font-size:1.9rem}.lm-tk{font-size:.64rem;margin:0 4px 10px}.emp text{font-size:38px;stroke-width:8px}.emp .core{r:11px}.gt-b{font-size:.62rem;padding:0 3px}.lab-more{display:flex;overflow-x:auto;scrollbar-width:thin}.lab-more a{flex:0 0 auto}}
@media (prefers-reduced-motion:reduce){.lab *,.lab-hd h2{animation:none!important;transition:none!important}.lc{transform:none!important}}
`;
function mapSvg(cls,extra){const W=window.WMAP;return`<svg class="${cls}" viewBox="0 30 1000 470" aria-hidden="true"><defs><radialGradient id="labglow"><stop offset="0" stop-color="#ffb547" stop-opacity=".75"/><stop offset=".45" stop-color="#ff7a59" stop-opacity=".3"/><stop offset="1" stop-color="#ff7a59" stop-opacity="0"/></radialGradient></defs>${W?`<path class="sea" d="${W.sphere}"/>${W.grat?`<path class="grat" d="${W.grat}"/>`:""}<path class="land" d="${W.land}"/>`:`<rect class="sea" width="1000" height="520"/>`}${extra||""}</svg>`}
function build(){
const nPre=window.PRE?Object.keys(PRE).length:0,nC=window.CTRY?Object.keys(CTRY).length:0,nPol=window.HMAPIDX?HMAPIDX.names.length:0;
const tk=ERAS.map((e,i)=>`<button type="button" data-i="${i}">${e[0]<0?(-e[0])+" BCE":e[0]}</button>`).join("");
const dtBar=PREPER.map((p,i)=>`<span data-i="${i}" style="flex:${(p[1]-p[2]).toFixed(1)};background:${p[3]}" title="${p[0]}"></span>`).join("");
const eras=[["Paleozoic",538.8,251.9],["Mesozoic",251.9,66],["Cenozoic",66,0]].map(e=>`<span style="flex:${e[1]-e[2]}">${e[0]}</span>`).join("");
let dots="",i=0;Object.keys(window.PRE||{}).forEach(id=>{(PRE[id][9]||[]).forEach(s=>{const q=proj(s[1],s[2]);dots+=`<g class="fm-dot" tabindex="0" role="button" data-id="${id}" data-s="${esc(s[0])}" style="--i:${i++%40}" aria-label="${esc(ttl(id))}, ${esc(s[0])}"><circle class="h" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="16"/><circle class="d" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="6"/></g>`})});
return`<section class="lab" aria-labelledby="labh"><div class="lab-hd"><div><h2 id="labh">The Lab</h2><p>Hands-on tools for exploring the encyclopedia. Drag through time, line up giants, spin the globe and test yourself.</p></div><div class="lab-ct"><span><b>${nPol?nPol.toLocaleString("en-US"):"1,600+"}</b> states on the history map</span><span><b>${nC}</b> countries</span><span><b>${PREPER.length}</b> periods</span></div></div>
<div class="lab-g">
<div class="lc lc-map"><h3><i>🗺️</i>History map</h3><p class="ls">Slide through 2,500 years and watch empires rise. The full map has every state from 3400 BCE to today.</p>${mapSvg("lm-svg",'<g class="lm-emp"></g>')}
<div class="lm-row"><button class="lm-play" type="button" aria-label="Pause tour">❚❚</button><div class="lm-yr" aria-live="polite"></div><div class="lm-rng"><input type="range" min="0" max="${ERAS.length-1}" step="1" value="0" aria-label="Year"></div></div><div class="lm-tk">${tk}</div><p class="lm-who"></p><p class="gt-h">Lifespans of some great empires</p><div class="gt">${LANES.map(l=>`<div class="gt-l">${l.map(e=>`<button type="button" class="gt-b" data-a="${e[1]}" data-b="${e[2]}" style="left:${yx(e[1]).toFixed(2)}%;width:${(yx(e[2])-yx(e[1])).toFixed(2)}%" title="${e[0]}, ${fy(e[1])} to ${fy(e[2])}" aria-label="${e[0]}, ${fy(e[1])} to ${fy(e[2])}">${e[3]}</button>`).join("")}</div>`).join("")}<i class="gt-now"></i><div class="gt-ax"><span>600 BCE</span><span>1 CE</span><span>500</span><span>1000</span><span>1500</span><span>2000</span></div></div><a class="go lm-go" href="#/histmap">Open the History map</a></div>
<div class="lab-sw"><div class="lc lc-dt"><h3><i>⏳</i>Deep time</h3><p class="ls">Run your finger along 539 million years of life.</p><div class="dt-bar" role="slider" tabindex="0" aria-label="Geologic period" aria-valuemin="0" aria-valuemax="${PREPER.length-1}">${dtBar}<i class="dt-ptr"></i></div><div class="dt-eras">${eras}</div><div class="dt-out"><b></b><small></small></div><div class="dt-sp"></div><a class="go" href="#/deeptime">Explore deep time</a></div>
<div class="lc lc-sz"><h3><i>📏</i>Size line-up</h3><p class="ls">How would you measure up?</p><div class="sz-ch">${SIZES.map((s,i)=>`<button type="button" data-i="${i}" aria-pressed="${i?"false":"true"}">${s[1]}</button>`).join("")}</div><svg class="sz-svg" viewBox="0 0 420 170" role="img" aria-label="Size comparison"></svg><a class="go" href="#/sizes">Compare all sizes</a></div>
<div class="lc lc-fm"><h3><i>📍</i>Fossil map</h3><p class="ls">Where the famous finds were dug up.</p>${mapSvg("fm-svg",dots)}<div class="fm-try"></div><p class="fm-tip">Point at a dot. <small>${i} finds of ${nPre} kinds of ancient life.</small></p><a class="go" href="#/fossilmap">Open the fossil map</a></div>
<div class="lc lc-fl"><h3><i>🌐</i>Country roulette</h3><p class="ls">Spin for a random country and open its fact file.</p><div class="fl-box"></div><div class="acts"><button class="sb fl-spin" type="button">Spin again</button><a class="go" href="#/atlas">Atlas</a><a class="go" href="#/flags" style="background:#9fd3ff">Flags</a></div></div>
<div class="lc lc-qz"><h3><i>⚡</i>Quick quiz</h3><p class="ls">Name the capital. How long can your streak go?</p><div class="qz-q" aria-live="polite"></div><div class="qz-o"></div><div class="acts"><span class="qz-st">Streak <b>0</b></span><a class="go" href="#/chal">Capitals challenge</a><a class="go" href="#/maze" style="background:#ffa3c8">Mind Maze</a></div></div>
</div></div>
<nav class="lab-more" aria-label="More tools"><a href="#/time"><span>🕰️</span><div>Timeline<small>Events through history</small></div></a><a href="#/cards"><span>🃏</span><div>Flashcards<small>Learn by flipping</small></div></a><a href="#/compare/jupiter~saturn"><span>⚖️</span><div>Compare<small>Two articles side by side</small></div></a><a href="#/countries"><span>🏳️</span><div>Countries<small>${nC} fact files</small></div></a><a href="#/dict"><span>📖</span><div>Dictionary<small>Words and meanings</small></div></a><a href="#/gloss"><span>🔤</span><div>Glossary<small>Key terms explained</small></div></a></nav></section>`}
let timers=[];
function wire(L){
timers.forEach(clearInterval);timers=[];
// Spotlight and tilt
L.addEventListener("pointermove",e=>{const r=L.getBoundingClientRect();L.style.setProperty("--sx",(e.clientX-r.left)+"px");L.style.setProperty("--sy",(e.clientY-r.top)+"px");const c=e.target.closest&&e.target.closest(".lc");if(!c)return;const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");if(FINE.matches&&!RM.matches&&!c.classList.contains("lc-map")){c.style.setProperty("--rx",((.5-y)*6).toFixed(2)+"deg");c.style.setProperty("--ry",((x-.5)*8).toFixed(2)+"deg")}});
L.querySelectorAll(".lc").forEach(c=>c.addEventListener("pointerleave",()=>{c.style.removeProperty("--rx");c.style.removeProperty("--ry")}));
// History map
const mc=L.querySelector(".lc-map"),rng=mc.querySelector("input"),g=mc.querySelector(".lm-emp"),yr=mc.querySelector(".lm-yr"),who=mc.querySelector(".lm-who"),go=mc.querySelector(".lm-go"),play=mc.querySelector(".lm-play"),tbs=mc.querySelectorAll(".lm-tk button");
function era(i){const e=ERAS[i];rng.value=i;rng.style.setProperty("--p",(i/(ERAS.length-1)*100)+"%");yr.textContent=fy(e[0]);tbs.forEach((b,j)=>b.setAttribute("aria-pressed",j==i));
g.innerHTML=e[1].map((m,k)=>{const q=proj(m[2],m[1]),sat=(m[3]||[]).map(s=>{const p=proj(s[1],s[0]);return`<circle class="halo" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="34"/><circle class="sat" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5"/>`}).join(""),right=q[0]<560;return`<g class="emp" style="animation-delay:${k*120}ms">${sat}<circle class="halo" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="60"/><circle class="core" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="7"/><text x="${(q[0]+(right?14:-14)).toFixed(1)}" y="${(q[1]+(k%2?34:-12)).toFixed(1)}" text-anchor="${right?"start":"end"}">${esc(m[0])}</text></g>`}).join("");
who.textContent=e[1].map(m=>m[0]).join(", ")+(e[1].length>1?" are":" is")+" among the great powers in "+fy(e[0])+".";go.href="#/histmap/"+e[0];mc.querySelector(".gt-now").style.left=yx(e[0])+"%";mc.querySelectorAll(".gt-b").forEach(b=>b.classList.toggle("on",+b.dataset.a<=e[0]&&+b.dataset.b>=e[0]));go.textContent="Open the map at "+fy(e[0])}
let auto=!RM.matches,cur=0;const setPlay=()=>{play.textContent=auto?"❚❚":"▶";play.setAttribute("aria-label",auto?"Pause tour":"Play tour")};
const stopAuto=()=>{auto=false;setPlay()};
rng.addEventListener("input",()=>{stopAuto();era(cur=+rng.value)});tbs.forEach(b=>b.addEventListener("click",()=>{stopAuto();era(cur=+b.dataset.i)}));
play.addEventListener("click",()=>{auto=!auto;setPlay();if(auto)era(cur=(cur+1)%ERAS.length)});
mc.querySelectorAll(".gt-b").forEach(b=>b.addEventListener("click",()=>{location.hash="#/histmap/"+Math.round((+b.dataset.a+ +b.dataset.b)/2)}));era(0);setPlay();timers.push(setInterval(()=>{if(!auto||!document.contains(L)||document.hidden||!L.classList.contains("lit"))return;era(cur=(cur+1)%ERAS.length)},2600));
// Deep time
const bar=L.querySelector(".dt-bar"),ptr=bar.querySelector(".dt-ptr"),seg=bar.querySelectorAll("span"),out=L.querySelector(".dt-out"),sp=L.querySelector(".dt-sp"),TOT=PREPER[0][1];let dti=-1;
function dt(i,frac){i=Math.max(0,Math.min(PREPER.length-1,i));if(frac==null){const p=PREPER[i];frac=(TOT-(p[1]+p[2])/2)/TOT}ptr.style.left=(frac*100)+"%";if(i==dti)return;dti=i;const p=PREPER[i];seg.forEach((s,j)=>s.classList.toggle("on",j==i));bar.setAttribute("aria-valuenow",i);bar.setAttribute("aria-valuetext",p[0]);out.style.setProperty("--pc",p[3]);out.querySelector("b").textContent=p[0];out.querySelector("small").textContent=`${+p[1].toFixed(1)} to ${+p[2].toFixed(1)} million years ago`;
const live=Object.keys(window.PRE||{}).filter(id=>PRE[id][2]>p[2]&&PRE[id][3]<p[1]);sp.innerHTML=live.length?live.slice(0,5).map(id=>`<a href="#/art/${id}">${esc(ttl(id))}</a>`).join("")+(live.length>5?`<em>+${live.length-5} more</em>`:""):`<em>Life in the sea: trilobites, corals, early fish</em>`}
const dtAt=e=>{const r=bar.getBoundingClientRect(),f=Math.max(0,Math.min(.9999,(e.clientX-r.left)/r.width)),ma=TOT*(1-f);let i=PREPER.findIndex(p=>ma<=p[1]&&ma>=p[2]);if(i<0)i=PREPER.length-1;dt(i,f)};
bar.addEventListener("pointermove",dtAt);bar.addEventListener("pointerdown",e=>{bar.setPointerCapture&&bar.setPointerCapture(e.pointerId);dtAt(e)});
bar.addEventListener("keydown",e=>{if(e.key=="ArrowRight"||e.key=="ArrowLeft"){e.preventDefault();dt(dti+(e.key=="ArrowRight"?1:-1))}});
dt(PREPER.findIndex(p=>p[0]=="Cretaceous"));
// Size line-up
const svg=L.querySelector(".sz-svg"),sb=L.querySelectorAll(".sz-ch button");
function sz(i){const s=SIZES[i];if(!s)return;sb.forEach((b,j)=>b.setAttribute("aria-pressed",j==i));const id=s[0],r=PRE[id],Lm=r[4],Hm=r[5],W=420,H=170,gy=H-26,sc=Math.min((W-90)/Lm,(H-44)/Math.max(Hm,1.8)),x0=70,p=preSil(r[7],Lm,Hm,sc,x0,gy);
const len=Lm>=1?(+Lm.toFixed(1))+" m":Math.round(Lm*100)+" cm";
svg.setAttribute("aria-label",`${s[1]}, about ${len}${r[7]=="ptero"?" wingspan":" long"}, beside a person`);
svg.innerHTML=`<line class="gl" x1="0" x2="${W}" y1="${gy}" y2="${gy}"/><g class="hu">${preHuman(sc,24,gy)}</g><g class="an"><g data-pp="${id}" data-cx="${(x0+Lm*sc/2).toFixed(1)}" data-gy="${gy}" data-s="${sc.toFixed(3)}" data-col="#5fe3c0"><path d="${p.d}"/></g></g><text x="24" y="${gy+18}">You</text><text class="big" x="${W-8}" y="22" text-anchor="end">${len}</text><text x="${W-8}" y="40" text-anchor="end">${r[7]=="ptero"?"wingspan":"long"}</text>`}
sb.forEach(b=>b.addEventListener("click",()=>sz(+b.dataset.i)));sz(0);
// Fossil map
const tip=L.querySelector(".fm-tip"),fdots=L.querySelectorAll(".fm-dot");
const fshow=d=>{fdots.forEach(x=>x.classList.toggle("on",x==d));tip.innerHTML=`<a href="#/art/${d.dataset.id}" style="color:#ffb39e;font-weight:700">${esc(ttl(d.dataset.id))}</a><br><small>${esc(d.dataset.s)}</small>`};
{const tr=L.querySelector(".fm-try"),seen=new Set(),picks=[];[...fdots].sort(()=>Math.random()-.5).forEach(d=>{if(picks.length<4&&!seen.has(d.dataset.id)){seen.add(d.dataset.id);picks.push(d)}});tr.innerHTML=picks.map((d,i)=>`<button type="button" data-k="${i}" aria-pressed="false">${esc(ttl(d.dataset.id))}</button>`).join("");tr.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{tr.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x==b));fshow(picks[+b.dataset.k])}))}
fdots.forEach(d=>{d.addEventListener("pointerenter",()=>fshow(d));d.addEventListener("focus",()=>fshow(d));d.addEventListener("click",()=>{if(d.classList.contains("on")&&!FINE.matches)location.hash="#/art/"+d.dataset.id;fshow(d)});d.addEventListener("keydown",e=>{if(e.key=="Enter")location.hash="#/art/"+d.dataset.id})});
// Country roulette
const box=L.querySelector(".fl-box"),CS=Object.values(window.CTRY||{}).filter(c=>c.flag&&c.cap&&c.cap.length);
const flc=c=>`<img src="flags/${c.flag}.svg" alt="Flag of ${esc(c.n)}"><div><div class="fl-n"><a href="#/country/${encodeURIComponent(c.n)}">${esc(c.n)}</a></div><div class="fl-c">Capital: ${esc(c.cap[0])}<br>${esc(c.sub||c.ct||"")}${Array.isArray(c.pop)&&c.pop[1]?`<br>Population: ${Number(c.pop[1]).toLocaleString("en-US")} (${c.pop[0]})`:""}</div></div><dl class="fl-x">${c.lang&&c.lang.length?`<div><dt>Languages</dt><dd>${esc(c.lang.slice(0,3).join(", "))}${c.lang.length>3?` and ${c.lang.length-3} more`:""}</dd></div>`:""}${c.cur&&c.cur.length?`<div><dt>Currency</dt><dd>${esc(c.cur[0][0])}</dd></div>`:""}${c.area?`<div><dt>Area</dt><dd>${Number(c.area).toLocaleString("en-US")} km²</dd></div>`:""}</dl>`;
let spinning=0;function spin(){if(!CS.length||spinning)return;const n=RM.matches?1:12;let k=0;spinning=1;const st=()=>{const c=CS[Math.floor(Math.random()*CS.length)];box.innerHTML=flc(c);box.classList.remove("spin");void box.offsetWidth;if(k<n-1)box.classList.add("spin");if(++k<n)setTimeout(st,40+k*k*2.2);else spinning=0};st()}
L.querySelector(".fl-spin").addEventListener("click",spin);if(CS.length)box.innerHTML=flc(CS[Math.floor(Math.random()*CS.length)]);
// Quick quiz
const qq=L.querySelector(".qz-q"),qo=L.querySelector(".qz-o"),qs=L.querySelector(".qz-st b");let streak=0;try{streak=0}catch(e){}
function quiz(){if(CS.length<4)return;const pick=()=>CS[Math.floor(Math.random()*CS.length)],c=pick(),opts=[c];while(opts.length<3){const o=pick();if(!opts.some(x=>x.cap[0]==o.cap[0]))opts.push(o)}opts.sort(()=>Math.random()-.5);
qq.innerHTML=`What is the capital of <b>${esc(c.n)}</b>?`;qo.innerHTML=opts.map(o=>`<button type="button">${esc(o.cap[0])}</button>`).join("");
qo.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{const ok=b.textContent==c.cap[0];qo.querySelectorAll("button").forEach(x=>{x.disabled=true;if(x.textContent==c.cap[0])x.classList.add("ok")});if(!ok)b.classList.add("no");streak=ok?streak+1:0;qs.textContent=streak;setTimeout(quiz,ok?900:1600)}))}
quiz();
// Light up once visible
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>L.classList.toggle("lit",e.isIntersecting)),{threshold:.15});io.observe(L)}else L.classList.add("lit");
}
function inject(){try{if(!window.PREPER||!V.querySelector(".hx,.mast2,.pk")||V.querySelector(".lab"))return;if(!document.getElementById("labcss")){const s=document.createElement("style");s.id="labcss";s.textContent=css;document.head.appendChild(s)}
const anchor=V.querySelector(".pk")||V.querySelector(".bento");const html=build();if(anchor)anchor.insertAdjacentHTML("afterend",html);else V.insertAdjacentHTML("beforeend",html);wire(V.querySelector(".lab"))}catch(e){console.error("lab",e)}}
function hook(){const prev=R.home;if(prev.__lab)return;R.home=function(x){prev(x);inject()};R.home.__lab=1;inject()}
if(document.readyState=="complete")hook();else addEventListener("load",hook);
})();
