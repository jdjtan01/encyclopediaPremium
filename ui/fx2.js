/* Effects part 2: article pages (animated pictures, reading progress, table-of-contents marker, key facts,
   photo-matched colors), home (time-of-day banner, cursor spotlight, animated Today in history, milestones),
   quizzes (sparkles, streaks, score ring), swipeable flashcards and section icons. */
(()=>{
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const V=document.getElementById("v");
const css=`
/* reading progress + time left */
.rdbar{position:fixed;left:0;top:0;height:4px;width:100%;z-index:58;transform-origin:left;transform:scaleX(var(--rp,0));background:linear-gradient(90deg,var(--pc,var(--cc,#7c3aed)),color-mix(in srgb,var(--pc,var(--cc,#7c3aed)) 40%,#ffd23f));pointer-events:none;view-transition-name:rdbar}
::view-transition-group(rdbar){animation:none}
.rdleft{position:fixed;right:16px;bottom:16px;z-index:58;padding:8px 14px;border-radius:999px;font:700 13px system-ui,sans-serif;color:#fff;background:color-mix(in srgb,var(--pc,var(--cc,#7c3aed)) 85%,#000);box-shadow:0 10px 24px -10px rgba(0,0,0,.5);opacity:0;transform:translateY(12px);transition:opacity .35s,transform .35s;pointer-events:none}
.rdleft.on{opacity:1;transform:none}
.toc .tocm{position:absolute;left:0;right:0;border-radius:10px;background:color-mix(in srgb,var(--pc,var(--cc,#7c3aed)) 16%,transparent);border-left:4px solid var(--pc,var(--cc,#7c3aed));transition:top .35s cubic-bezier(.3,1.3,.5,1),height .35s;pointer-events:none;z-index:0}
.toc button{position:relative;z-index:1}.toc button.cur{font-weight:800;color:var(--hd)}
/* photo-matched glow */
.hero{position:relative}.hero.pcol:before{content:"";position:absolute;inset:-30px -40px;z-index:-1;border-radius:40px;background:radial-gradient(ellipse at 50% 40%,color-mix(in srgb,var(--pc) 45%,transparent),transparent 70%);animation:pcIn 1.2s ease both}
@keyframes pcIn{from{opacity:0}}
.hero.pcol .ban.big{box-shadow:0 30px 60px -28px var(--pc)}
.atitle.pcol{background:linear-gradient(90deg,var(--hd) 40%,color-mix(in srgb,var(--pc) 80%,var(--hd)));-webkit-background-clip:text;background-clip:text;color:transparent}
/* home: time of day */
.hx.tod-morning{background:#3a1a5e}.hx.tod-morning .hx-bg i:nth-child(1){background:#ff7a45}.hx.tod-morning .hx-bg i:nth-child(2){background:#ffd166}.hx.tod-morning .hx-bg i:nth-child(3){background:#ff5d8f}.hx.tod-morning .hx-bg i:nth-child(4){background:#7b6cff}.hx.tod-morning .hx-bg i:nth-child(5){background:#ffb3c7}
.hx.tod-day{background:#173b8f}.hx.tod-day .hx-bg i:nth-child(1){background:#22d3ee}.hx.tod-day .hx-bg i:nth-child(2){background:#facc15}.hx.tod-day .hx-bg i:nth-child(3){background:#34d399}.hx.tod-day .hx-bg i:nth-child(4){background:#60a5fa}.hx.tod-day .hx-bg i:nth-child(5){background:#a78bfa}
.hx.tod-evening{background:#3f1052}.hx.tod-evening .hx-bg i:nth-child(1){background:#ff3d77}.hx.tod-evening .hx-bg i:nth-child(2){background:#ff8a3d}.hx.tod-evening .hx-bg i:nth-child(3){background:#c026d3}.hx.tod-evening .hx-bg i:nth-child(4){background:#7c3aed}.hx.tod-evening .hx-bg i:nth-child(5){background:#fbbf24}
.hx.tod-night{background:#0a0f33}.hx.tod-night .hx-bg i{opacity:.55}.hx.tod-night .hx-bg i:nth-child(1){background:#4338ca}.hx.tod-night .hx-bg i:nth-child(2){background:#0e7490}.hx.tod-night .hx-bg i:nth-child(3){background:#6d28d9}.hx.tod-night .hx-bg i:nth-child(4){background:#1d4ed8}.hx.tod-night .hx-bg i:nth-child(5){background:#be185d}
.hx-stars{position:absolute;inset:0;z-index:-1;pointer-events:none}
.hx-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;box-shadow:0 0 6px #fff;animation:tw 3s ease-in-out infinite}
.hx-stars i.b{width:3px;height:3px}
@keyframes tw{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
.hx-moon{position:absolute;right:6%;top:9%;width:64px;height:64px;border-radius:50%;z-index:-1;box-shadow:inset -14px -6px 0 0 #fef3c7;filter:drop-shadow(0 0 18px rgba(254,243,199,.6));transform:rotate(-20deg)}
.hx-sun{position:absolute;right:7%;top:-40px;width:150px;height:150px;border-radius:50%;z-index:-1;background:radial-gradient(circle,#fff7cc,#ffd166 45%,rgba(255,170,60,0) 70%);animation:sunP 6s ease-in-out infinite alternate}
@keyframes sunP{to{transform:scale(1.12)}}
.hx-spot{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.22),transparent 60%)}
.hx:hover .hx-spot{opacity:1}
/* today in history line */
#dc.tdl p{position:relative;padding-left:4.7em;min-height:2em;opacity:0;transform:translateX(-24px);transition:opacity .6s cubic-bezier(.2,.8,.2,1),transform .6s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--k) * .14s)}
#dc.tdl p:not(:last-child):after{content:"";position:absolute;left:1.95em;top:1.7em;bottom:-1.1em;width:3px;border-radius:3px;background:linear-gradient(var(--yc,#7c3aed),color-mix(in srgb,var(--yc,#7c3aed) 30%,transparent));transform-origin:top;transform:scaleY(0);transition:transform .5s ease;transition-delay:calc(var(--k) * .14s + .3s)}
#dc.tdl.go p{opacity:1;transform:none}#dc.tdl.go p:after{transform:scaleY(1)}
#dc.tdl p>b:first-child{position:absolute;left:0;top:-1px;z-index:1;transition:transform .5s cubic-bezier(.3,1.8,.5,1);transition-delay:calc(var(--k) * .14s + .1s);transform:scale(.4)}
#dc.tdl.go p>b:first-child{transform:none}
/* quiz */
.opt.bad{animation:shk .45s ease}@keyframes shk{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
.opt.ok{animation:okp .5s cubic-bezier(.3,1.8,.5,1)}@keyframes okp{40%{transform:scale(1.04)}}
.qstk{display:inline-flex;align-items:center;gap:6px;margin-left:12px;padding:4px 12px;border-radius:999px;font:800 15px var(--disp);color:#fff;background:linear-gradient(90deg,#f97316,#db2777);vertical-align:middle;animation:okp .5s cubic-bezier(.3,1.8,.5,1)}
.qstk span{display:inline-block;animation:flm .5s ease-in-out infinite alternate}@keyframes flm{to{transform:scale(1.2) rotate(-8deg)}}
.qring{display:flex;align-items:center;gap:20px;margin:6px 0 16px}
.qring svg{width:120px;height:120px;transform:rotate(-90deg)}.qring .rg{transition:stroke-dasharray 1.4s cubic-bezier(.2,.8,.2,1)}
.qring b{display:block;font:900 34px/1 var(--disp)}.qring small{color:var(--mu);font:600 14px system-ui}
/* flashcard swipe */
.fc{touch-action:pan-y}.fc .in{transition:transform .45s}.fc.dragging{transition:none}
.fc.flyR{animation:flyR .38s ease-in forwards}.fc.flyL{animation:flyL .38s ease-in forwards}
@keyframes flyR{to{transform:translateX(120vw) rotate(24deg);opacity:0}}@keyframes flyL{to{transform:translateX(-120vw) rotate(-24deg);opacity:0}}
.fc .swl{position:absolute;top:14px;z-index:5;padding:6px 12px;border-radius:10px;font:900 15px var(--disp);opacity:0;border:3px solid;transform:rotate(-10deg)}
.fc .swl.r{left:14px;color:#16a34a;border-color:#16a34a}.fc .swl.l{right:14px;color:#db2777;border-color:#db2777;transform:rotate(10deg)}
.fchint{text-align:center;color:var(--mu);font-size:14px;margin:6px 0 0}
/* section icons */
.sico{display:inline-grid;place-items:center;flex:none;width:44px;height:44px;border-radius:14px;color:#fff!important;background:linear-gradient(140deg,color-mix(in srgb,var(--sc,#7c3aed) 70%,#fff),var(--sc,#7c3aed));box-shadow:0 8px 16px -8px var(--sc,#7c3aed);margin-right:12px;vertical-align:middle;transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.sico svg{width:26px;height:26px}
.subtile:hover .sico,.subjump a:hover .sico{transform:rotate(-8deg) scale(1.12)}
.subjump .sico{width:24px;height:24px;border-radius:8px;margin-right:7px;box-shadow:none}.subjump .sico svg{width:16px;height:16px}
.subtile .sthead{position:relative}.sico.inb{position:absolute;left:12px;top:12px;z-index:2;width:42px;height:42px;border-radius:13px;margin:0;box-shadow:0 8px 18px -6px rgba(0,0,0,.45)}.sico.inb svg{width:25px;height:25px}
.subhero-ic{float:right;width:84px!important;height:84px!important;border-radius:26px!important;margin:0 0 10px 16px!important}.subhero-ic svg{width:50px!important;height:50px!important}
@media (prefers-reduced-motion:reduce){.hx-stars i,.hx-sun,.qstk span,.opt.bad,.opt.ok{animation:none!important}#dc.tdl p,#dc.tdl p:after,#dc.tdl p>b:first-child{opacity:1!important;transform:none!important;transition:none!important}}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);

/* ======================= article pages ======================= */
const rd=document.createElement("div");rd.className="rdbar";rd.setAttribute("aria-hidden","true");
const rl=document.createElement("div");document.body.append(rd);
let artState=null;
const animSvg=svg=>{if(still||svg.dataset.anim||svg.closest(".sart,.sico,.hx,.bento,.empt,.opener,#ldsp"))return;const bb=svg.getBoundingClientRect();if(bb.width<80)return;svg.dataset.anim=1;
const els=[...svg.querySelectorAll("rect,circle,ellipse,path,line,polyline,polygon,text")].slice(0,320);let k=0;
els.forEach(el=>{const tag=el.tagName.toLowerCase(),d=Math.min(1400,k*22),cs=getComputedStyle(el);const ease="cubic-bezier(.2,.8,.2,1)";
try{if(tag=="rect"){const w=+el.getAttribute("width")||0,h=+el.getAttribute("height")||0;if(w>bb.width*.9&&h>bb.height*.6)return;k++;el.style.transformBox="fill-box";const horiz=w>=h;el.style.transformOrigin=horiz?"left center":"center bottom";
el.animate([{transform:horiz?"scaleX(0)":"scaleY(0)"},{transform:"none"}],{duration:800,delay:d,easing:ease,fill:"backwards"})}
else if(tag=="circle"||tag=="ellipse"||tag=="polygon"){k++;el.style.transformBox="fill-box";el.style.transformOrigin="center";el.animate([{transform:"scale(0)",opacity:0},{transform:"none",opacity:1}],{duration:600,delay:d,easing:"cubic-bezier(.3,1.6,.5,1)",fill:"backwards"})}
else if((tag=="path"||tag=="line"||tag=="polyline")&&cs.stroke!="none"&&(cs.fill=="none"||cs.fillOpacity=="0")&&el.getTotalLength){const L=el.getTotalLength();if(!L||L>4000)return;k++;
el.animate([{strokeDasharray:`${L} ${L}`,strokeDashoffset:L},{strokeDasharray:`${L} ${L}`,strokeDashoffset:0}],{duration:900,delay:d,easing:ease,fill:"backwards"})}
else if(tag=="path"){k++;el.animate([{opacity:0},{opacity:1}],{duration:600,delay:d,fill:"backwards"})}
else if(tag=="text"){el.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:500,delay:Math.min(1600,d+250),easing:ease,fill:"backwards"})}}catch(e){}})};
const svgIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){svgIO.unobserve(e.target);animSvg(e.target)}}),{threshold:.25});
const countText=(node,dur=1200)=>{const m=node.nodeValue.match(/^(\D*?)(\d[\d,]*\.?\d*)(.*)$/s);if(!m||still)return;const raw=m[2],end=parseFloat(raw.replace(/,/g,""));if(!isFinite(end)||end<2||/^(1[0-9]{3}|20[0-9]{2})$/.test(raw.replace(/,+$/,""))||/^\d{1,4},\s/.test(m[2]+m[3].slice(0,1)))return;
const dec=(raw.split(".")[1]||"").length,comma=raw.includes(","),t0=performance.now();const fmt=v=>comma?v.toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec}):v.toFixed(dec);
const f=t=>{const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);node.nodeValue=m[1]+fmt(end*e)+m[3];if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const keyFacts=()=>{if(still)return;V.querySelectorAll(".hero .co").forEach(col=>{const left=col.classList.contains("l");[...col.querySelectorAll(".cl1")].forEach((c,i)=>{
c.animate([{opacity:0,transform:`translateX(${left?-40:40}px)`},{opacity:1,transform:"none"}],{duration:700,delay:250+i*140,easing:"cubic-bezier(.2,.8,.2,1)",fill:"backwards"});
const ic=c.querySelector(".ic,i");ic&&ic.animate([{transform:"scale(0) rotate(-40deg)"},{transform:"none"}],{duration:600,delay:450+i*140,easing:"cubic-bezier(.3,1.7,.5,1)",fill:"backwards"});
const tn=[...c.childNodes].find(n=>n.nodeType==3&&/\d/.test(n.nodeValue));tn&&setTimeout(()=>countText(tn),400+i*140)})})};
const photoColor=()=>{const img=V.querySelector(".hero .ban.big img");if(!img)return;const go=()=>{const im=new Image();im.crossOrigin="anonymous";im.onload=()=>{try{const c=document.createElement("canvas");c.width=c.height=24;const g=c.getContext("2d");g.drawImage(im,0,0,24,24);
const d=g.getImageData(0,0,24,24).data;let r=0,gg=0,b=0,w=0;for(let i=0;i<d.length;i+=4){const R=d[i],G=d[i+1],B=d[i+2],mx=Math.max(R,G,B),mn=Math.min(R,G,B),s=mx?(mx-mn)/mx:0,l=(mx+mn)/510;const wt=.15+s*s*(1-Math.abs(l-.5)*1.4);r+=R*wt;gg+=G*wt;b+=B*wt;w+=wt}
if(!w)return;r/=w;gg/=w;b/=w;const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b);const boost=mx-mn<25?1:1.25;const cl=v=>Math.max(0,Math.min(255,Math.round((v-128)*boost+118)));
const col=`rgb(${cl(r)},${cl(gg)},${cl(b)})`;if(!document.body.contains(img))return;V.style.setProperty("--pc",col);rd.style.setProperty("--pc",col);rl.style.setProperty("--pc",col);
V.querySelector(".hero")&&V.querySelector(".hero").classList.add("pcol");V.querySelector(".atitle")&&V.querySelector(".atitle").classList.add("pcol")}catch(e){}};im.src=img.currentSrc||img.src};
if(img.complete&&img.naturalWidth)go();else img.addEventListener("load",go,{once:true})};
const setupArt=()=>{const toc=V.querySelector(".toc");let mk=null;if(toc){mk=document.createElement("div");mk.className="tocm";toc.prepend(mk)}
const btns=toc?[...toc.querySelectorAll("button[data-s]")]:[];const secs=btns.map(b=>[b,document.getElementById("s"+b.dataset.s)]).filter(p=>p[1]);
const words=(V.querySelector(".body")||V).innerText.split(/\s+/).length;artState={secs,mk,words,cur:-1};V.style.removeProperty("--pc");rd.style.removeProperty("--pc");rl.style.removeProperty("--pc");
V.querySelectorAll(".body svg,.hero svg").forEach(s=>svgIO.observe(s));keyFacts();photoColor();onScroll()};
const onScroll=()=>{if(!artState||!/^#\/art\//.test(location.hash)){rd.style.setProperty("--rp",0);rl.classList.remove("on");return}
const body=V.querySelector(".body");if(!body)return;const r=body.getBoundingClientRect(),tot=r.height-innerHeight*.6,done=Math.max(0,Math.min(1,(-r.top+innerHeight*.25)/Math.max(1,tot)));
rd.style.setProperty("--rp",done.toFixed(4));
const S=artState.secs;let cur=-1;for(let i=0;i<S.length;i++){if(S[i][1].getBoundingClientRect().top<innerHeight*.32)cur=i}
if(cur!=artState.cur&&artState.mk){artState.cur=cur;S.forEach((p,i)=>p[0].classList.toggle("cur",i==cur));if(cur>=0){const b=S[cur][0];artState.mk.style.top=b.offsetTop+"px";artState.mk.style.height=b.offsetHeight+"px";artState.mk.style.opacity=1}else artState.mk.style.opacity=0}};
let sr=0;addEventListener("scroll",()=>{if(!sr)sr=requestAnimationFrame(()=>{sr=0;onScroll()})},{passive:true});
/* also animate pictures that arrive later (picture sets load separately) */
new MutationObserver(ms=>{if(!/^#\/art\//.test(location.hash))return;ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType!=1)return;(n.matches&&n.matches("svg")?[n]:[...n.querySelectorAll?n.querySelectorAll("svg"):[]]).forEach(s=>s.closest(".body,.hero")&&svgIO.observe(s))}))}).observe(V,{childList:true,subtree:true});

/* ======================= milestones ======================= */
const MS=[10,25,50,100,250,500,1000,1666];
const milestone=()=>{try{if(typeof HIST=="undefined")return;const n=new Set(HIST.map(h=>h.i).filter(get)).size;const got=JSON.parse(localStorage.getItem("ep-ms")||"[]");
const hit=MS.filter(m=>n>=m&&!got.includes(m));if(!hit.length)return;const m=Math.max(...hit);localStorage.setItem("ep-ms",JSON.stringify([...got,...hit]));
if(got.length||n<=m+2){setTimeout(()=>{confetti();msToast(m>=1666?"🏆 You’ve explored every article in the encyclopedia!":`🎉 You’ve explored ${m} articles!`)},900)}}catch(e){}};

/* ======================= home page ======================= */
const homeFx=()=>{const hx=V.querySelector(".hx");if(!hx||hx.dataset.fx)return;hx.dataset.fx=1;const hr=new Date().getHours();
const tod=hr>=5&&hr<10?"morning":hr>=10&&hr<16?"day":hr>=16&&hr<19?"evening":"night";hx.classList.add("tod-"+tod);
const dt=hx.querySelector(".hx-date");if(dt&&!dt.dataset.g){dt.dataset.g=1;dt.textContent=(tod=="morning"?"Good morning":tod=="day"?"Good afternoon":tod=="evening"?"Good evening":"Good evening, night owl")+" · "+dt.textContent}
const bg=hx.querySelector(".hx-bg");if(tod=="night"){const st=document.createElement("div");st.className="hx-stars";st.setAttribute("aria-hidden","true");
st.innerHTML=[...Array(46)].map((_,i)=>`<i class="${i%7?"":"b"}" style="left:${(i*37.3)%100}%;top:${(i*53.7)%88}%;animation-delay:${((i*.37)%3).toFixed(2)}s;animation-duration:${2.2+(i%5)*.5}s"></i>`).join("");bg.after(st);
const mo=document.createElement("div");mo.className="hx-moon";mo.setAttribute("aria-hidden","true");st.after(mo)}
if(tod=="morning"||tod=="day"){const su=document.createElement("div");su.className="hx-sun";su.setAttribute("aria-hidden","true");bg.after(su)}
const sp=document.createElement("div");sp.className="hx-spot";sp.setAttribute("aria-hidden","true");hx.prepend(sp);
if(matchMedia("(hover:hover)").matches)hx.addEventListener("pointermove",e=>{const r=hx.getBoundingClientRect();hx.style.setProperty("--mx",(e.clientX-r.left)+"px");hx.style.setProperty("--my",(e.clientY-r.top)+"px");sp.style.setProperty("--mx",(e.clientX-r.left)+"px");sp.style.setProperty("--my",(e.clientY-r.top)+"px")});
const dc=V.querySelector("#dc");if(dc&&!still){const prep=()=>{dc.querySelectorAll("p").forEach((p,k)=>{p.style.setProperty("--k",k);const b=p.querySelector("b");b&&p.style.setProperty("--yc",getComputedStyle(b).backgroundColor)})};dc.classList.add("tdl");prep();
const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){setTimeout(()=>dc.classList.add("go"),150);io.disconnect()}},{threshold:.2});io.observe(dc);
new MutationObserver(()=>{prep();if(dc.classList.contains("go")){dc.classList.remove("go");void dc.offsetWidth;requestAnimationFrame(()=>dc.classList.add("go"))}}).observe(dc,{childList:true})}};

/* ======================= quizzes ======================= */
let streak=0;
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button.opt");if(!b||!V.contains(b))return;setTimeout(()=>{
const h2=V.querySelector("h2");if(b.classList.contains("ok")){streak++;const r=b.getBoundingClientRect();confetti({x:r.left+r.width/2,y:r.top+r.height/2,n:28,small:true});
if(h2&&streak>=2){let s=h2.querySelector(".qstk");if(s)s.remove();h2.insertAdjacentHTML("beforeend",`<span class="qstk"><span>🔥</span>${streak} in a row</span>`)}}
else if(b.classList.contains("bad")||V.querySelector(".opt.ok")){streak=0}},0)});
const quizFx=()=>{const h2=V.querySelector("h2");if(!h2)return;if(/question 1 of/.test(h2.textContent))streak=0;
const m=h2.textContent.match(/^Score: (\d+) of (\d+)/);if(m&&!V.querySelector(".qring")){const s=+m[1],n=+m[2],C=2*Math.PI*44,pc=n?s/n:0;
h2.insertAdjacentHTML("afterend",`<div class="qring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--sf2)" stroke-width="11"/><circle class="rg" cx="50" cy="50" r="44" fill="none" stroke="url(#qrg)" stroke-width="11" stroke-linecap="round" stroke-dasharray="0 ${C}"/><defs><linearGradient id="qrg"><stop offset="0" stop-color="#db2777"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs></svg><div><b>${Math.round(pc*100)}%</b><small>${s==n?"Perfect round!":pc>=.7?"Great job!":pc>=.4?"Good effort, keep going!":"Keep practicing, you’ll get there!"}</small></div></div>`);
requestAnimationFrame(()=>requestAnimationFrame(()=>{const rg=V.querySelector(".qring .rg");rg&&rg.setAttribute("stroke-dasharray",`${Math.max(.01,C*pc)} ${C}`)}));
if(s==n&&n>0)setTimeout(()=>confetti(),500);streak=0}};

/* ======================= flashcards: swipe ======================= */
const cardFx=()=>{const fc=V.querySelector("#fc");if(!fc||fc.dataset.sw)return;fc.dataset.sw=1;fc.insertAdjacentHTML("afterbegin",`<span class="swl r" aria-hidden="true">KNEW IT</span><span class="swl l" aria-hidden="true">LEARNING</span>`);
const hint=document.createElement("p");hint.className="fchint";hint.textContent="On a phone, swipe right if you knew it and left to keep learning.";fc.after(hint);
let sx=0,dx=0,down=false,dragged=false;const lr=fc.querySelector(".swl.r"),ll=fc.querySelector(".swl.l");
fc.addEventListener("pointerdown",e=>{if(e.button)return;down=true;dragged=false;sx=e.clientX;dx=0});
fc.addEventListener("pointermove",e=>{if(!down)return;dx=e.clientX-sx;if(Math.abs(dx)>8){dragged=true;fc.classList.add("dragging");try{fc.setPointerCapture(e.pointerId)}catch(_){}}
if(dragged){fc.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`;lr.style.opacity=Math.max(0,Math.min(1,dx/90));ll.style.opacity=Math.max(0,Math.min(1,-dx/90))}});
const up=()=>{if(!down)return;down=false;fc.classList.remove("dragging");if(dragged&&Math.abs(dx)>90){const right=dx>0;fc.classList.add(right?"flyR":"flyL");
setTimeout(()=>{fc.classList.remove("flyR","flyL");fc.style.transform="";lr.style.opacity=ll.style.opacity=0;const btn=V.querySelector(right?"#fck":"#fcl");btn&&btn.click();
fc.animate([{transform:"scale(.85)",opacity:0},{transform:"none",opacity:1}],{duration:300,easing:"cubic-bezier(.3,1.5,.5,1)"})},360)}
else{fc.animate([{transform:fc.style.transform||"none"},{transform:"none"}],{duration:300,easing:"cubic-bezier(.3,1.5,.5,1)"});fc.style.transform="";lr.style.opacity=ll.style.opacity=0}};
fc.addEventListener("pointerup",up);fc.addEventListener("pointercancel",up);fc.addEventListener("click",e=>{if(dragged){e.stopImmediatePropagation();e.preventDefault();dragged=false}},true)};

/* ======================= section icons ======================= */
const P={hourg:'<path d="M6 3h12M6 21h12M7 3c0 5 10 6 10 9s-10 4-10 9M17 3c0 5-10 6-10 9s10 4 10 9"/>',dinoi:'<path d="M3 17c2-3 5-4 8-4 3 0 4-3 5-6l1-3c1-1 3-1 3 1l-2 2-1 5c-1 3-2 5-2 7v2M11 13v8M7 14v7M3 17c2 0 3 0 4-1"/>',wave:'<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M9 10l3-6 3 6"/>',comet:'<circle cx="16" cy="16" r="4"/><path d="M13 13L4 4M12.5 16.5L6 10M16.5 12.5L10 6"/>',volcano:'<path d="M3 20l6-9 2 2.5 2-3.5 8 10z"/><path d="M11 7c0-2 2-2 2-4M14 7c1-1.5 2-1.5 2-3"/>',mount:'<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 11l1.5 1 1.5-1.5"/>',rain:'<path d="M7 15a4 4 0 1 1 .9-7.9A5 5 0 0 1 17.6 8 3.5 3.5 0 0 1 17.5 15z"/><path d="M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5"/>',
map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',paw:'<ellipse cx="12" cy="16" rx="4.5" ry="3.8"/><circle cx="6" cy="10" r="2"/><circle cx="10" cy="6.5" r="2"/><circle cx="14" cy="6.5" r="2"/><circle cx="18" cy="10" r="2"/>',
bird:'<path d="M4 13c3 0 5-3 8-3 2.5 0 4 1.5 6.5 1-1.5 3.5-4.5 5.5-8 5.5-2 0-3.5 1.5-4.5 3.5"/><path d="M12 10c-1-3-3-5-6-5 1 2.5 2 4 4 5.5"/><circle cx="17" cy="11.5" r=".6" fill="currentColor"/>',
fish:'<path d="M2.5 12c3-4 8-6 12-4 2 1 3.5 2.5 4.5 4-1 1.5-2.5 3-4.5 4-4 2-9 0-12-4z"/><path d="M19 12l3-3.5v7z"/><circle cx="7" cy="11" r=".9" fill="currentColor"/>',
turtle:'<path d="M4.5 15a7.5 6.5 0 0 1 15 0z"/><path d="M8 15l-1.5 3M16 15l1.5 3M19.5 13.5h2a1.5 1.5 0 0 0 0-3h-1"/><path d="M8 11l4-3 4 3-1.5 4h-5z"/>',bug:'<ellipse cx="12" cy="14" rx="4.5" ry="5.5"/><path d="M12 8.5v11M7.5 12H4M7.5 16H4.5M16.5 12H20M16.5 16h3M9 7.5L7 5M15 7.5l2-2.5"/><circle cx="12" cy="7.5" r="2"/>',
egg:'<path d="M12 3c3.5 0 6.5 5.5 6.5 10a6.5 6.5 0 0 1-13 0C5.5 8.5 8.5 3 12 3z"/><path d="M6 12l2.5 2 2-2.5 2.5 2.5 2-2.5 3 2"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8c0-2.5 3-2.5 3 0M14.2 9c2.5 0 2.5 3 0 3M12 11.2c0 2.5-3 2.5-3 0M9.8 9c-2.5 0-2.5-3 0-3M12 11.5V21M12 17c-2-2.5-5-2.5-6-1 2 2 4 2 6 1zM12 15c2-2 4.5-2 5.5-.5-2 1.5-3.5 1.5-5.5.5"/>',
pine:'<path d="M12 2l5 7h-3l4.5 6h-3.5L19 20H5l4-5H5.5L10 9H7z"/><path d="M12 20v2"/>',mush:'<path d="M3 12a9 7 0 0 1 18 0z"/><path d="M9.5 12v6a2.5 2.5 0 0 0 5 0v-6"/><circle cx="8" cy="8.5" r="1"/><circle cx="14" cy="7" r="1.2"/>',
leafc:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-4 6-7 10-9"/><path d="M3 9a8 8 0 0 1 5-5M21 15a8 8 0 0 1-5 5"/>',dna:'<path d="M7 3c0 6 10 6 10 12M17 3c0 6-10 6-10 12M7 21c0-2 1-3 2.5-4M17 21c0-2-1-3-2.5-4"/><path d="M8 6h8M8.5 12h7M8 18h8"/>',
sun:'<circle cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-25 12 12)"/><circle cx="20" cy="9" r="1.4" fill="currentColor"/>',galaxy:'<path d="M12 12c2-3 7-2 7 2s-6 7-10 5-5-9 0-12 11-1 12 3"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path d="M4 4l.5 1.5L6 6l-1.5.5L4 8l-.5-1.5L2 6l1.5-.5z"/>',
rocket:'<path d="M12 2c4 3 5 8 4 13l-1.5 3h-5L8 15C7 10 8 5 12 2z"/><circle cx="12" cy="9" r="2"/><path d="M8 13l-3 3 1 4 3-2M16 13l3 3-1 4-3-2M10.5 19.5l1.5 2.5 1.5-2.5"/>',
astro:'<circle cx="12" cy="10" r="6.5"/><path d="M8 9.5a4 3 0 0 1 8 0v1a4 2.5 0 0 1-8 0z"/><path d="M6.5 15.5c-1.5 1-2.5 3-2.5 5.5h16c0-2.5-1-4.5-2.5-5.5"/>',moon:'<path d="M15 3a8 8 0 1 0 6 13A7 7 0 0 1 15 3z"/><path d="M8 13V7l4 1.5L8 10"/>',
rover:'<rect x="5" y="9" width="12" height="5" rx="1"/><circle cx="7" cy="17.5" r="2"/><circle cx="15" cy="17.5" r="2"/><path d="M17 11.5h3M9 9V5h3M12 5l2.5-1.5"/>',
sat:'<rect x="9.5" y="9.5" width="5" height="5" rx="1" transform="rotate(45 12 12)"/><path d="M8 8L5 5M16 16l3 3M3 7l4-4 3 3-4 4zM14 18l4-4 3 3-4 4z"/><path d="M15 9a3 3 0 0 0 0-4M17 9.5a6 6 0 0 0 0-7"/>',
orbitg:'<circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="10.5" ry="3.5" transform="rotate(-20 12 12)"/><path d="M8 10.5c2 1 5.5 1 8-1"/>',flask:'<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/><circle cx="11" cy="17.5" r=".8" fill="currentColor"/><circle cx="14" cy="18.5" r=".6" fill="currentColor"/>',
bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',shapes:'<path d="M7 3l4.5 8h-9z"/><rect x="13" y="4" width="7.5" height="7.5" rx="1"/><circle cx="12" cy="17.5" r="4"/>',atom:'<circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',
bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.3 1 2.1v.5h5V16c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 3z"/>',heart:'<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/><path d="M3 12.5h4l1.5-2.5 2 4 1.5-2.5h9"/>',
eye:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3.2"/><circle cx="13" cy="11" r=".9" fill="currentColor"/>',apple:'<path d="M12 7c-2-1.5-7-1-7 5 0 5 3.5 9 5.5 9 1 0 1-.5 1.5-.5s.5.5 1.5.5c2 0 5.5-4 5.5-9 0-6-5-6.5-7-5z"/><path d="M12 7c0-2 1-3.5 3-4"/>',
pill:'<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.5 8.3l5 7.4"/>',pyramid:'<path d="M12 3l10 17H2z"/><path d="M12 3l3 17M7 11.5h9M4.5 16h15"/>',
pagoda:'<path d="M4 8l8-4 8 4zM6 13l6-2.5 6 2.5zM7 18l5-2 5 2z"/><path d="M8 8v3M16 8v3M9 13v3M15 13v3M12 2v2M9 18v3h6v-3"/>',castle:'<path d="M4 21V9h3V6h2v3h2V6h2v3h2V6h2v3h3v12z"/><path d="M10 21v-5a2 2 0 0 1 4 0v5M4 9V5M20 9V5"/>',
ship:'<path d="M3 16h18l-3 4H6z"/><path d="M12 3v13M12 4l7 8h-7M12 6l-5 7h5"/>',plane:'<path d="M8 2l4 6 4-6M9 2h6"/><circle cx="12" cy="15" r="6"/><path d="M12 11.5l1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3z"/>',dove:'<path d="M3 13c3 1 6 0 8-3 1.5-2.5 4-4 7-3l3-1-2 2.5c.5 4-2.5 9-9 9-3 0-5.5-1.5-7-4.5z"/><path d="M11 10c-1-3-3-5-6-6 0 3 1.5 5.5 4 7"/><circle cx="17" cy="8.5" r=".6" fill="currentColor"/>',
torii:'<path d="M3 5c4 1 14 1 18 0M4.5 9h15M7 5.5V21M17 5.5V21M12 6v3"/>',acacia:'<path d="M2.5 9.5c2.5-3 16.5-3 19 0-3 2-16 2-19 0z"/><path d="M12 11v10M12 15l-4.5-4M12 14l4-3.5M3 21h18"/><circle cx="19" cy="4" r="1.8"/>',
mill:'<path d="M9 21l1.5-10h3L15 21z"/><path d="M12 9l-6-6M12 9l6-6M12 9l-6 6M12 9l6 6"/><circle cx="12" cy="9" r="1.2" fill="currentColor"/>',globe2:'<circle cx="12" cy="12" r="9.5"/><path d="M12 2.5c-3 3-3 16 0 19M12 2.5c3 3 3 16 0 19M2.5 12h19"/><path d="M7 6c1 1.5 3 2 3 4s-2 2-2 4 1 3 1 5"/>',
surf:'<circle cx="17" cy="7" r="3"/><path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',city:'<path d="M3 21V10h5v11M8 21V4h7v17M15 21V8h6v13M2 21h20"/><path d="M10.5 7h2M10.5 10h2M10.5 13h2M17.5 11h1M17.5 14h1M5 13h1M5 16h1"/>',
island:'<path d="M2 20c3-3 17-3 20 0"/><path d="M12 18c0-5 1-9 3-12"/><path d="M15 6c-3-2-7-1-8 1 3 0 5 .5 8-1zM15 6c2-3 6-3 7 0-2.5-.5-4.5 0-7 0zM15 6c-1 3-4 5-6 5 1-2.5 3-4 6-5z"/>',
crown:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/><path d="M5 16h14"/>',torch:'<path d="M9 9h6l-1.5 5h-3z"/><path d="M12 14v8M12 9c-2.5-2-1.5-4.5 0-7 1.5 2.5 2.5 5 0 7z"/>',care:'<path d="M12 11s-3.5-2.2-3.5-4.8A2 2 0 0 1 12 5a2 2 0 0 1 3.5 1.2c0 2.6-3.5 4.8-3.5 4.8z"/><path d="M3 15l4-1.5c1-.4 2-.2 3 .3l2.5 1.2h3a1.5 1.5 0 0 1 0 3H11M3 20l5-1.5 6 1.5 7-4"/>',
flame:'<path d="M12 22a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-2.5 6.5C10 11 9 9.5 9 8c-2 2-3 4.5-3 8a6 6 0 0 0 6 6z"/><path d="M12 22a2.5 2.5 0 0 0 2.5-2.5c0-2-2.5-3.5-2.5-3.5s-2.5 1.5-2.5 3.5A2.5 2.5 0 0 0 12 22z"/>',
micro:'<path d="M6 21h12M9 21v-2a6 6 0 0 1 9-5.2"/><path d="M10 4l3-1.5 4 8-3 1.5z"/><path d="M12 12l1.5 3h-4"/>',compass:'<circle cx="12" cy="12" r="9.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6"/>',camera:'<rect x="2.5" y="7" width="19" height="13" rx="2.5"/><circle cx="12" cy="13.5" r="4"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="18" cy="10" r=".7" fill="currentColor"/>',
book:'<path d="M12 6c-2-1.5-5.5-2-9-1.5V19c3.5-.5 7 0 9 1.5 2-1.5 5.5-2 9-1.5V4.5c-3.5-.5-7 0-9 1.5zM12 6v14.5"/>',note:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path d="M9 9l11-2"/>',
clap:'<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 9l1.5-5 16 3L21 9M7.5 4.8l2 4M13 5.8l2 3.2"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/><circle cx="12" cy="12" r="6.5"/>',
car:'<path d="M3 16v-3l2-5h14l2 5v3z"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/><path d="M5 13h14M8.5 8l-.5 5M15.5 8l.5 5"/>',plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
monitor:'<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 21h8M12 16.5V21M6.5 8.5l2.5 2-2.5 2M11 12.5h4"/>',net:'<circle cx="12" cy="12" r="9.5"/><path d="M12 2.5c-3 3-3 16 0 19M12 2.5c3 3 3 16 0 19M3 9h18M3 15h18"/>',
phone:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M19.5 6a4 4 0 0 1 0 5M21.5 4a7 7 0 0 1 0 9"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v3"/>',
chip:'<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M9.5 2.5v4M14.5 2.5v4M9.5 17.5v4M14.5 17.5v4M2.5 9.5h4M2.5 14.5h4M17.5 9.5h4M17.5 14.5h4"/><path d="M12 9.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill="currentColor"/>',
chat:'<path d="M3 5h12v8H8l-3 3v-3H3z"/><path d="M15 9h6v8h-2v3l-3-3h-4v-4"/>',dome:'<path d="M5 12a7 7 0 0 1 14 0zM12 3v2M3 21h18M4 12h16M6 12v7M10 12v7M14 12v7M18 12v7M3 19h18"/>',coins:'<ellipse cx="9" cy="6" rx="6" ry="2.5"/><path d="M3 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6"/><path d="M9 12.5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4c0-1.4-2.7-2.5-6-2.5"/><path d="M9 16.5c0 1.4 2.7 2.5 6 2.5"/>',
think:'<path d="M5 12a6 5 0 0 1 6-6 6 5 0 0 1 9 4 4 4 0 0 1-3 7H8a4 4 0 0 1-3-5z"/><circle cx="6" cy="19" r="1.3"/><circle cx="3.5" cy="21.5" r=".8"/>',lang:'<path d="M3 4h12v9H9l-3 3v-3H3z"/><path d="M6.5 11L9 6l2.5 5M7.5 9.5h3"/><path d="M15 8h6v9h-2v3l-3-3h-3"/>',
wheat:'<path d="M12 22V8"/><path d="M12 8c-2-1-3-3-2-5 2 1 3 3 2 5zM12 12c-3 0-4.5-2-4.5-4 2.5 0 4.5 1.5 4.5 4zM12 12c3 0 4.5-2 4.5-4-2.5 0-4.5 1.5-4.5 4zM12 16c-3 0-4.5-2-4.5-4 2.5 0 4.5 1.5 4.5 4zM12 16c3 0 4.5-2 4.5-4-2.5 0-4.5 1.5-4.5 4z"/>',
ball:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5l4 3-1.5 4.5h-5L8 10.5z"/><path d="M12 2.5v5M16 10.5l5-1.5M14.5 15l3 4.5M9.5 15l-3 4.5M8 10.5L3 9"/>',thermo:'<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 8v9"/><path d="M17 5h3M17 8h2M17 11h3"/>',
people:'<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6M13.5 14.5c.9-.6 1.9-1 3-1 2.5 0 4.5 2 4.5 5.5"/>',bag:'<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 12.5h18M11 12.5v2h2v-2"/>',
pulse:'<path d="M2 12h4l2-5 3.5 11L14 9l2 3h6"/>',phones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2.5" y="14" width="5" height="7" rx="2"/><rect x="16.5" y="14" width="5" height="7" rx="2"/>',stars:'<path d="M12 3l2.4 5 5.6.8-4 4 1 5.6-5-2.7-5 2.7 1-5.6-4-4 5.6-.8z"/>'};
const IC={"Restless Earth":"volcano","Mountains and Canyons":"mount","Water and Weather":"rain","Lands and Regions":"map","Mammals":"paw","Birds":"bird","Sea Life":"fish","Reptiles and Amphibians":"turtle","Insects and Minibeasts":"bug","Animal Lives":"egg",
"Deep Time":"hourg","Dinosaurs":"dinoi","Rulers of Sea and Sky":"wave","Extinctions and the Ice Age":"comet","Plants and Flowers":"flower","Trees and Forests":"pine","Algae, Fungi and Microbes":"mush","Ecosystems and Conservation":"leafc","How Life Works":"dna","The Solar System":"sun","Stars and Galaxies":"galaxy","Stars":"stars","Black Holes and Extreme Objects":"orbitg","Galaxies and the Universe":"galaxy","Exoplanets and Life Beyond Earth":"globe2","Watching the Sky":"eye",
"Rockets and Launchers":"rocket","Astronauts and Space Stations":"astro","Missions to the Moon":"moon","Robots to the Planets":"rover","Telescopes and Satellites":"sat","Space Agencies and Space Issues":"orbitg",
"Matter and Chemistry":"flask","Forces and Energy":"bolt","Numbers and Shapes":"shapes","Atoms and Particles":"atom","Great Discoveries":"bulb","Body Systems":"heart","Brain and Senses":"eye","Staying Healthy":"apple","Disease and Medicine":"pill",
"Ancient Worlds":"pyramid","Asia Through the Ages":"pagoda","Middle Ages":"castle","Discovery and Revolution":"ship","The World Wars":"plane","Since 1945":"dove","Asia":"torii","Africa":"acacia","Europe":"mill","The Americas":"globe2","Oceania":"surf","Cities and Landmarks":"city","Islands":"island",
"Leaders and Rulers":"crown","Freedom and Reform":"torch","Care and Faith":"care","Faith and Thought":"flame","Scientists and Inventors":"micro","Explorers":"compass","Artists and Champions":"trophy",
"Art, Architecture and Photography":"camera","Books and Stories":"book","Music":"note","Stage and Screen":"clap","Inventions and Machines":"gear","Transport and Engineering":"car","Energy and Power":"plug",
"Computers":"monitor","The Internet and the Web":"net","Phones, Signals and Navigation":"phone","Security and Privacy":"lock","Artificial Intelligence":"chip","Growing Up Online":"chat",
"Government and Society":"dome","Money and Work":"coins","Beliefs and Ideas":"think","Languages":"lang","Food and Farming":"wheat","Sport":"ball","Global Challenges":"thermo","Changing Societies":"people","Work and Money Today":"bag","Health and Science Today":"pulse","Pop Culture Today":"phones"};
window.secIcon=(name,col,cls="")=>{const k=IC[name];if(!k)return"";return `<i class="sico ${cls}" style="--sc:${col}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg></i>`};
const subjOf=()=>{const parts=location.hash.replace(/^#\/?/,"").split("/").map(decodeURIComponent);return parts[0]=="cat"?parts[1]:null};
const iconFx=()=>{const c=subjOf();if(!c||!CAT[c])return;const col=CAT[c][0];
V.querySelectorAll(".subtile .sthead").forEach(h=>{if(h.querySelector(".sico"))return;const b=h.querySelector("b");if(!b)return;const ic=secIcon(b.textContent.trim(),col,"inb");ic&&h.insertAdjacentHTML("afterbegin",ic)});
V.querySelectorAll(".subjump a").forEach(a=>{if(a.querySelector(".sico"))return;const n=[...a.childNodes].filter(x=>x.nodeType==3).map(x=>x.nodeValue).join("").trim();const ic=secIcon(n,col);ic&&a.insertAdjacentHTML("afterbegin",ic)});
const sub=location.hash.split("/")[3];if(sub){const n=decodeURIComponent(sub),t=V.querySelector(".atitle");if(t&&!V.querySelector(".subhero-ic")){const ic=secIcon(n,col,"subhero-ic");ic&&t.insertAdjacentHTML("beforebegin",ic)}}};

/* ======================= dispatcher ======================= */
let raf=0,lastH="";
new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const h=location.hash;const isArt=/^#\/art\//.test(h);
if(isArt&&V.querySelector(".hero,.body")&&(h!=lastH||!artState)){lastH=h;setupArt();milestone()}else if(!isArt){artState=null;lastH=h;onScroll()}
if(V.classList.contains("home2"))homeFx();quizFx();cardFx();iconFx()})}).observe(V,{childList:true});
})();
