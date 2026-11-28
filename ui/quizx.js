// Quizzes (v174): colorful quiz hub with modes (mixed, topics, years, classic, daily challenge, speed round),
// subject quizzes with best scores, round length, lettered answers with keyboard keys, streaks, progress dots,
// an optional timer, explanations with article links, an animated results ring, review and sharing.
(function(){
if(typeof R=="undefined"||typeof A=="undefined")return;
const css=`
.qx{--qa:#f97316;--qb:#ec4899}
.qx-hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:32px 30px 24px;margin:6px 0 20px;color:#fff;
background:linear-gradient(125deg,#f97316,#ec4899 40%,#8b5cf6 75%,#06b6d4);background-size:220% 220%;animation:qxFlow 14s ease-in-out infinite alternate;box-shadow:0 30px 60px -34px #db2777}
@keyframes qxFlow{to{background-position:100% 100%}}
.qx-hero h2{margin:0;font:900 clamp(32px,5vw,52px)/1 var(--disp);letter-spacing:-.03em;color:#fff!important;border:0!important}
.qx-hero p{margin:8px 0 16px;font:600 15px/1.45 system-ui,sans-serif;color:#fff!important;opacity:.93;max-width:560px}
.qx-fl{position:absolute;inset:0;z-index:-1;pointer-events:none}
.qx-fl span{position:absolute;font-size:var(--s,40px);opacity:.22;animation:qxFloat var(--d,12s) ease-in-out infinite alternate;animation-delay:var(--dl,0s)}
@keyframes qxFloat{to{transform:translateY(-24px) rotate(var(--r,12deg))}}
.qx-stats{display:flex;flex-wrap:wrap;gap:8px}
.qx-stats span{padding:7px 13px;border-radius:99px;background:rgba(255,255,255,.2);font:700 13px system-ui,sans-serif;box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.qx-set{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:0 0 16px;color:var(--mu);font:700 13px system-ui,sans-serif}
.qx-seg{display:inline-flex;padding:4px;border-radius:13px;background:var(--sf2);gap:2px}
.qx-seg button{border:0;background:none;color:var(--tx);font:700 13px system-ui,sans-serif;padding:7px 12px;border-radius:10px;cursor:pointer}
.qx-seg button.on{background:linear-gradient(135deg,#f97316,#ec4899);color:#fff;box-shadow:0 6px 14px -8px #ec4899}
.qx-h3{font:900 22px var(--disp);margin:22px 0 12px;color:var(--hd)}
.qx-modes{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
.qx-mode{position:relative;overflow:hidden;text-align:left;border:0;cursor:pointer;padding:18px 18px 16px;border-radius:22px;color:#fff;min-height:132px;
background:linear-gradient(140deg,var(--a),var(--b));box-shadow:0 18px 34px -22px var(--b);transition:transform .25s cubic-bezier(.3,1.4,.5,1),box-shadow .25s;animation:qxIn .5s cubic-bezier(.2,1.2,.4,1) both;animation-delay:calc(var(--k)*50ms)}
@keyframes qxIn{from{opacity:0;transform:translateY(14px) scale(.97)}}
.qx-mode:hover{transform:translateY(-5px) rotate(-.6deg);box-shadow:0 26px 44px -22px var(--b)}
.qx-mode:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.3) 48%,transparent 60%);transform:translateX(-120%)}
.qx-mode:hover:after{transform:translateX(120%);transition:transform 1s cubic-bezier(.22,1,.36,1)}
.qx-mode i{position:absolute;right:12px;top:10px;font-size:38px;font-style:normal;filter:drop-shadow(0 6px 10px rgba(0,0,0,.25));transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.qx-mode:hover i{transform:scale(1.2) rotate(-10deg)}
.qx-mode b{display:block;font:900 19px/1.15 var(--disp);margin:34px 0 4px;max-width:85%}
.qx-mode small{display:block;font:600 13px/1.35 system-ui,sans-serif;color:#fff!important;opacity:.92}
.qx-mode em{position:absolute;left:16px;top:14px;font:800 11.5px system-ui,sans-serif;font-style:normal;padding:4px 9px;border-radius:99px;background:rgba(0,0,0,.2)}
.qx-subs{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.qx-sub{position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;border:1px solid var(--bd);cursor:pointer;text-align:left;padding:12px 14px;border-radius:18px;background:var(--sf);color:var(--tx);transition:transform .25s,box-shadow .25s,border-color .25s;animation:qxIn .45s both;animation-delay:calc(var(--k)*30ms)}
.qx-sub:hover{transform:translateY(-3px);border-color:var(--c);box-shadow:0 14px 26px -18px var(--c)}
.qx-sub .ic{flex:none;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(140deg,var(--c),var(--l));font-size:24px}
.qx-sub .ic svg{width:40px;height:40px}
.qx-sub b{display:block;font:800 14.5px/1.2 var(--disp)}
.qx-sub small{display:block;color:var(--mu);font:600 12px system-ui,sans-serif;margin-top:3px}
.qx-more{display:flex;flex-wrap:wrap;gap:10px}
.qx-more a{display:inline-flex;gap:8px;align-items:center;padding:10px 15px;border-radius:14px;background:var(--sf);border:1px solid var(--bd);color:var(--tx);text-decoration:none;font:700 14px system-ui,sans-serif;transition:transform .2s}
.qx-more a:hover{transform:translateY(-2px)}
/* play */
.qx-play{max-width:760px;margin:6px auto 0}
.qx-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.qx-top .lab{font:800 14px var(--disp);color:var(--mu)}
.qx-top .quit{margin-left:auto;border:0;background:var(--sf2);color:var(--tx);border-radius:10px;padding:7px 12px;font:700 13px system-ui,sans-serif;cursor:pointer}
.qx-dots{display:flex;gap:5px;margin:0 0 16px}
.qx-dots i{flex:1;height:8px;border-radius:99px;background:var(--sf2);transition:background .3s,transform .3s}
.qx-dots i.cur{background:linear-gradient(90deg,#f97316,#ec4899);transform:scaleY(1.3)}
.qx-dots i.ok{background:#10b981}.qx-dots i.no{background:#ef4444}
.qx-card{position:relative;overflow:hidden;border-radius:26px;padding:26px 26px 22px;background:linear-gradient(150deg,color-mix(in srgb,var(--qc,#8b5cf6) 16%,var(--sf)),var(--sf));border:1px solid color-mix(in srgb,var(--qc,#8b5cf6) 30%,var(--bd));box-shadow:0 24px 50px -34px var(--qc,#8b5cf6);animation:qxQ .45s cubic-bezier(.2,1.1,.3,1) both}
@keyframes qxQ{from{opacity:0;transform:translateX(30px)}}
.qx-card .kind{display:inline-flex;gap:6px;align-items:center;font:800 12px system-ui,sans-serif;color:#fff;padding:5px 11px;border-radius:99px;background:var(--qc,#8b5cf6)}
.qx-card h3{margin:14px 0 18px;font:800 clamp(19px,2.4vw,24px)/1.35 var(--disp);color:var(--hd)}
.qx-opts{display:grid;gap:10px}
.qx-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:2px solid var(--bd);background:var(--sf);color:var(--tx);border-radius:16px;padding:12px 14px;font:600 16px/1.35 system-ui,sans-serif;cursor:pointer;transition:transform .15s,border-color .2s,background .2s,box-shadow .2s;animation:qxIn .35s both;animation-delay:calc(80ms + var(--k)*60ms)}
.qx-opt kbd{flex:none;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;font:900 14px var(--disp);color:#fff;background:var(--oc)}
.qx-opt:hover:not(:disabled){transform:translateX(4px);border-color:var(--oc);box-shadow:0 10px 20px -16px var(--oc)}
.qx-opt:disabled{cursor:default}
.qx-opt.ok{border-color:#10b981;background:color-mix(in srgb,#10b981 16%,var(--sf));animation:qxPop .45s cubic-bezier(.3,1.6,.5,1)}
.qx-opt.ok kbd{background:#10b981}
.qx-opt.bad{border-color:#ef4444;background:color-mix(in srgb,#ef4444 14%,var(--sf));animation:qxShake .45s}
.qx-opt.bad kbd{background:#ef4444}
.qx-opt.dim{opacity:.5}
@keyframes qxPop{40%{transform:scale(1.04)}}
@keyframes qxShake{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
.qx-fb{margin-top:16px;padding:14px 16px;border-radius:16px;font:600 15px/1.45 system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:10px;align-items:center;animation:qxIn .35s both}
.qx-fb.ok{background:color-mix(in srgb,#10b981 14%,transparent);color:color-mix(in srgb,#10b981 70%,var(--tx))}
.qx-fb.no{background:color-mix(in srgb,#ef4444 12%,transparent);color:color-mix(in srgb,#ef4444 65%,var(--tx))}
.qx-fb a{color:inherit;font-weight:800}
.qx-next{margin-left:auto;border:0;cursor:pointer;padding:10px 18px;border-radius:13px;font:800 14px var(--disp);color:#fff;background:linear-gradient(135deg,#f97316,#ec4899);box-shadow:0 10px 20px -12px #ec4899}
.qx-meta{display:flex;justify-content:space-between;gap:10px;margin-top:14px;font:700 14px system-ui,sans-serif;color:var(--mu)}
.qx-streak{color:#f97316}
.qx-streak.hot{animation:qxPop .5s}
.qx-timer{position:relative;width:46px;height:46px;flex:none}
.qx-timer svg{width:46px;height:46px;rotate:-90deg}
.qx-timer circle{fill:none;stroke-width:5}
.qx-timer .bg{stroke:var(--sf2)}.qx-timer .fg{stroke:url(#qxg);stroke-linecap:round;transition:stroke-dashoffset .25s linear}
.qx-timer b{position:absolute;inset:0;display:grid;place-items:center;font:900 14px var(--disp)}
.qx-burst{position:fixed;pointer-events:none;z-index:2000;width:10px;height:10px;border-radius:2px;animation:qxB .9s cubic-bezier(.2,.8,.3,1) forwards}
@keyframes qxB{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}
/* results */
.qx-res{max-width:760px;margin:6px auto 0;text-align:center}
.qx-ring{position:relative;width:190px;height:190px;margin:10px auto 6px}
.qx-ring svg{width:190px;height:190px;rotate:-90deg}
.qx-ring circle{fill:none;stroke-width:14}
.qx-ring .bg{stroke:var(--sf2)}.qx-ring .fg{stroke:url(#qxr);stroke-linecap:round;transition:stroke-dashoffset 1.3s cubic-bezier(.2,.8,.2,1)}
.qx-ring div{position:absolute;inset:0;display:grid;place-content:center}
.qx-ring b{font:900 46px/1 var(--disp);color:var(--hd)}
.qx-ring small{font:700 13px system-ui,sans-serif;color:var(--mu)}
.qx-res h2{font:900 30px var(--disp);margin:8px 0 4px}
.qx-res .new{display:inline-block;margin:6px 0;padding:6px 14px;border-radius:99px;color:#fff;font:800 13px system-ui,sans-serif;background:linear-gradient(135deg,#f59e0b,#ec4899);animation:qxPop .6s .6s both}
.qx-kpis{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin:14px 0}
.qx-kpis span{padding:10px 16px;border-radius:16px;background:var(--sf);border:1px solid var(--bd);font:700 13px system-ui,sans-serif;color:var(--mu)}
.qx-kpis span b{display:block;font:900 20px var(--disp);color:var(--hd)}
.qx-acts{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin:14px 0 22px}
.qx-btn{border:0;cursor:pointer;padding:12px 18px;border-radius:14px;font:800 14px var(--disp);color:var(--tx);background:var(--sf2);transition:transform .2s}
.qx-btn.pri{color:#fff;background:linear-gradient(135deg,#f97316,#ec4899);box-shadow:0 12px 24px -14px #ec4899}
.qx-btn:hover{transform:translateY(-2px)}
.qx-rev{text-align:left;display:grid;gap:10px}
.qx-rev div{padding:12px 14px;border-radius:14px;background:var(--sf);border:1px solid var(--bd);border-left:5px solid var(--c);font:14.5px/1.45 system-ui,sans-serif}
.qx-rev b{display:block;margin-top:4px}
.qx-rev a{font:700 13px system-ui,sans-serif}
@media (max-width:640px){.qx-hero{padding:24px 18px 20px;border-radius:22px}.qx-card{padding:20px 16px 16px;border-radius:22px}.qx-modes{grid-template-columns:1fr 1fr}.qx-mode{min-height:120px;padding:14px}.qx-mode b{font-size:16px}.qx-mode small{font-size:12px}}
@media (prefers-reduced-motion:reduce){.qx-hero,.qx-fl span,.qx-mode,.qx-sub,.qx-card,.qx-opt,.qx-fb{animation:none!important}.qx-burst{display:none}}
`;
const st=document.createElement("style");st.id="quizxcss";st.textContent=css;document.head.appendChild(st);
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const Ls=(k,d)=>{try{const v=JSON.parse(localStorage[k]);return v==null?d:v}catch(e){return d}},Sv=(k,v)=>{try{localStorage[k]=JSON.stringify(v)}catch(e){}};
const OC=["#3b82f6","#f97316","#10b981","#a855f7"];
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
function rng(seed){let s=seed>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const shuffle=(a,r=Math.random)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const FUNM=window.FUN||(typeof FUN!="undefined"?FUN:{});
function topicQ(cat,r){const pool=A.filter(a=>!cat||a.c==cat);return pool.flatMap(a=>[FUNM[a.id],...(a.f||[])].filter(Boolean).map(f=>[a,f])).map(([a,f])=>{const w=a.t.toLowerCase().split(/\W+/).filter(x=>x.length>3);if(w.some(x=>f.toLowerCase().includes(x)))return null;
  return{k:"topic",q:"Which topic is this fact about?",s:f,o:shuffle([a.t,...shuffle(pool.filter(b=>b.id!=a.id).map(b=>b.t),r).slice(0,3)],r),a:a.t,id:a.id,c:a.c}}).filter(Boolean)}
function yearQ(r){const T=typeof TODAY!="undefined"?TODAY:[];return T.filter(e=>e[2]>0&&!e[3].includes(String(e[2]))).map(e=>{const y=e[2],o=new Set([y]);let g=0;while(o.size<4&&g++<50)o.add(Math.max(1,y+Math.round((r()-.5)*Math.max(20,Math.min(80,y/10)))));
  const a=e[4]&&get(e[4]);return{k:"year",q:"In which year did this happen?",s:e[3],o:shuffle([...o],r).map(String),a:String(y),id:a?e[4]:null,c:a?a.c:null}})}
function classicQ(){return(typeof Q!="undefined"?Q:[]).map(q=>({k:"classic",q:q[0],s:"",o:[...q[1]],a:q[1][q[2]],id:null,c:null}))}
const MODES=[["daily","🌞","Daily challenge","The same 10 questions for everyone today","#f59e0b","#ef4444"],["mixed","🎯","Mixed","Topics and years from across the encyclopedia","#f97316","#ec4899"],["speed","⚡","Speed round","Answer as many as you can in 60 seconds","#8b5cf6","#06b6d4"],["topic","🧠","Which topic?","Match a surprising fact to its article","#10b981","#3b82f6"],["year","⏳","Guess the year","When did it happen?","#ec4899","#8b5cf6"],["classic","🏆","Classic questions","General knowledge favorites","#0ea5e9","#22c55e"]];
const label=m=>m.startsWith("cat:")?m.slice(4):(MODES.find(x=>x[0]==m)||[0,0,m])[2];
function stats(){return Ls("qxstats",{played:0,right:0,asked:0,days:[]})}
function streakDays(s){const set=new Set(s.days||[]);let n=0;const d=new Date();for(;;){const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");if(set.has(k)){n++;d.setDate(d.getDate()-1)}else break}return n}
function menu(V){
  const best=Ls("best",{}),s=stats(),len=Ls("qxlen",10),tim=Ls("qxtimer",0);
  const sd=streakDays(s),acc=s.asked?Math.round(s.right/s.asked*100):0,doneToday=best["daily:"+today()]!=null;
  V.innerHTML=`<div class="qx"><section class="qx-hero"><div class="qx-fl" aria-hidden="true">${["❓","💡","🧩","⭐","🎯","🏆","🔥","✨"].map((e,i)=>`<span style="left:${(i*13+6)%94}%;top:${(i*31+10)%78}%;--s:${30+(i*11)%34}px;--d:${10+i*2}s;--dl:-${i*1.4}s;--r:${i%2?-14:14}deg">${e}</span>`).join("")}</div>
  <h2>Quizzes</h2><p>Test yourself on everything in the encyclopedia. Every question links back to an article, so you can learn as you play.</p>
  <div class="qx-stats"><span>🎮 ${s.played} rounds played</span><span>✅ ${acc}% correct</span><span>🔥 ${sd} day streak</span>${doneToday?`<span>📅 Today’s challenge: ${best["daily:"+today()]}/10</span>`:""}</div></section>
  <div class="qx-set">Questions per round <div class="qx-seg" data-set="len">${[5,10,20].map(n=>`<button data-v="${n}" class="${n==len?"on":""}">${n}</button>`).join("")}</div>
  Timer <div class="qx-seg" data-set="timer">${[[0,"Off"],[15,"15 s"],[30,"30 s"]].map(t=>`<button data-v="${t[0]}" class="${t[0]==tim?"on":""}">${t[1]}</button>`).join("")}</div></div>
  <h3 class="qx-h3">Choose a quiz</h3><div class="qx-modes">${MODES.map((m,k)=>`<button class="qx-mode" data-m="${m[0]}" style="--a:${m[4]};--b:${m[5]};--k:${k}">${best[m[0]]!=null&&m[0]!="daily"?`<em>Best ${best[m[0]]}</em>`:m[0]=="daily"&&doneToday?`<em>Done ✓</em>`:""}<i>${m[1]}</i><b>${m[2]}</b><small>${m[3]}</small></button>`).join("")}</div>
  <h3 class="qx-h3">Quiz by subject</h3><div class="qx-subs">${Object.keys(CAT).map((c,k)=>`<button class="qx-sub" data-m="cat:${E(c)}" style="--c:${CAT[c][0]};--l:${CAT[c][1]};--k:${k}"><span class="ic">${window.subjArt?subjArt(c):((window.SUBJ||{})[c]||{}).i||""}</span><span><b>${E(c)}</b><small>${best["cat:"+c]!=null?"Best "+best["cat:"+c]:"Not played yet"}</small></span></button>`).join("")}</div>
  <h3 class="qx-h3">More games</h3><div class="qx-more"><a href="#/chal">🏙️ Capitals challenge</a><a href="#/flags">🚩 Flag quiz</a><a href="#/cards">🃏 Flashcards</a></div></div>`;
  V.querySelectorAll(".qx-mode,.qx-sub").forEach(b=>b.onclick=()=>R.maze(b.dataset.m));
  V.querySelectorAll(".qx-seg").forEach(g=>g.onclick=e=>{const b=e.target.closest("button");if(!b)return;g.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b));Sv(g.dataset.set=="len"?"qxlen":"qxtimer",+b.dataset.v)})}
function burst(el){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const r=el.getBoundingClientRect();const cs=["#f97316","#ec4899","#10b981","#3b82f6","#f59e0b","#8b5cf6"];
  for(let i=0;i<16;i++){const d=document.createElement("i");d.className="qx-burst";const a=Math.random()*Math.PI*2,v=60+Math.random()*90;d.style.cssText=`left:${r.left+r.width*.15}px;top:${r.top+r.height/2}px;background:${cs[i%6]};--x:${Math.cos(a)*v}px;--y:${Math.sin(a)*v-30}px;--r:${Math.random()*540}deg`;document.body.appendChild(d);setTimeout(()=>d.remove(),950)}}
function play(V,m){
  const speed=m=="speed",daily=m=="daily";const r=daily?rng(today().split("-").join("")*7919):Math.random;
  let pool;if(m=="classic")pool=classicQ();else if(m=="topic")pool=topicQ(null,r);else if(m=="year")pool=yearQ(r);else if(m.startsWith("cat:"))pool=topicQ(m.slice(4),r);else pool=[...shuffle(topicQ(null,r),r).slice(0,40),...shuffle(yearQ(r),r).slice(0,40),...shuffle(classicQ(),r).slice(0,10)];
  const N=daily?10:speed?999:Ls("qxlen",10);const L=shuffle(pool,r).slice(0,Math.min(N,pool.length));
  if(!L.length){V.innerHTML=`<div class="qx-play"><p>No questions are available for this quiz yet.</p><button class="qx-btn" onclick="R.maze()">Back to quizzes</button></div>`;return}
  const per=speed?0:Ls("qxtimer",0);const tk=typeof NAVT!="undefined"?NAVT:0;const alive=()=>typeof NAVT=="undefined"||NAVT==tk;
  let i=0,score=0,streak=0,bestStreak=0,res=[],t0=Date.now(),qt=null,endAt=speed?Date.now()+60000:0,gt=null;
  const dots=()=>speed?"":`<div class="qx-dots">${L.map((_,k)=>`<i class="${k<i?(res[k]?"ok":"no"):k==i?"cur":""}"></i>`).join("")}</div>`;
  const timerSVG=(left,total)=>{const C=2*Math.PI*19;return `<div class="qx-timer" title="Time left"><svg viewBox="0 0 46 46"><defs><linearGradient id="qxg"><stop offset="0" stop-color="#f97316"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><circle class="bg" cx="23" cy="23" r="19"/><circle class="fg" cx="23" cy="23" r="19" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-left/total)}"/></svg><b>${Math.ceil(left)}</b></div>`};
  function show(){if(!alive())return;clearInterval(qt);if(i>=L.length||(speed&&Date.now()>=endAt))return finish();
    const q=L[i],qc=q.c&&CAT[q.c]?CAT[q.c][0]:q.k=="year"?"#ec4899":q.k=="classic"?"#0ea5e9":"#8b5cf6";
    V.innerHTML=`<div class="qx qx-play"><div class="qx-top"><span class="lab">${E(label(m))} · ${speed?`Question ${i+1}`:`${i+1} of ${L.length}`}</span><span id="qxt"></span><button class="quit" id="qxq">✕ Quit</button></div>${dots()}
    <div class="qx-card" style="--qc:${qc}"><span class="kind">${q.k=="year"?"⏳ Guess the year":q.k=="classic"?"🏆 Classic":"🧠 "+(q.c?E(q.c):"Which topic?")}</span><h3>${E(q.q)}${q.s?`<br><span style="font-weight:600">“${E(q.s)}”</span>`:""}</h3>
    <div class="qx-opts">${q.o.map((o,k)=>`<button class="qx-opt" data-k="${k}" style="--oc:${OC[k%4]};--k:${k}"><kbd>${"ABCD"[k]||k+1}</kbd><span>${E(o)}</span></button>`).join("")}</div><div id="qxf"></div></div>
    <div class="qx-meta"><span>Score <b>${score}</b></span><span class="qx-streak" id="qxs">${streak>1?"🔥 "+streak+" in a row":""}</span></div></div>`;
    V.querySelector("#qxq").onclick=()=>{clearInterval(qt);clearInterval(gt);R.maze()};
    V.querySelectorAll(".qx-opt").forEach(b=>b.onclick=()=>answer(+b.dataset.k));
    const tbox=V.querySelector("#qxt");
    if(speed){const tick=()=>{if(!alive()||!document.body.contains(tbox)){clearInterval(gt);return}const left=Math.max(0,(endAt-Date.now())/1000);tbox.innerHTML=timerSVG(left,60);if(left<=0){clearInterval(gt);finish()}};clearInterval(gt);tick();gt=setInterval(tick,250)}
    else if(per){const st=Date.now();const tick=()=>{if(!alive()||!document.body.contains(tbox)){clearInterval(qt);return}const left=Math.max(0,per-(Date.now()-st)/1000);tbox.innerHTML=timerSVG(left,per);if(left<=0){clearInterval(qt);answer(-1)}};tick();qt=setInterval(tick,250)}}
  function answer(k){const q=L[i];if(V.querySelector(".qx-opt:disabled"))return;clearInterval(qt);const ok=k>=0&&q.o[k]==q.a;res[i]=ok;
    V.querySelectorAll(".qx-opt").forEach((b,j)=>{b.disabled=true;if(q.o[j]==q.a)b.classList.add("ok");else if(j==k)b.classList.add("bad");else b.classList.add("dim")});
    if(ok){score++;streak++;bestStreak=Math.max(bestStreak,streak);burst(V.querySelector(".qx-opt.ok"))}else streak=0;
    const s=V.querySelector("#qxs");s.textContent=streak>1?"🔥 "+streak+" in a row":"";if(streak>1){s.classList.remove("hot");void s.offsetWidth;s.classList.add("hot")}
    V.querySelector(".qx-meta b").textContent=score;
    if(speed){setTimeout(()=>{if(alive()){i++;show()}},ok?350:800);return}
    const a=q.id&&get(q.id);
    V.querySelector("#qxf").innerHTML=`<div class="qx-fb ${ok?"ok":"no"}"><span>${ok?["Correct!","Nice one!","Spot on!","Well done!"][i%4]:k<0?"Time’s up!":"Not quite."} ${ok?"":`The answer is <b>${E(q.a)}</b>.`}</span>${a?`<a href="#/art/${q.id}" target="_blank" rel="noopener">Read about ${E(a.t)} ↗</a>`:""}<button class="qx-next" id="qxn">${i+1<L.length?"Next ›":"See results ›"}</button></div>`;
    const nx=V.querySelector("#qxn");nx.focus({preventScroll:true});nx.onclick=()=>{i++;show()}}
  function finish(){clearInterval(qt);clearInterval(gt);if(!alive())return;
    const asked=speed?i:L.length,pct=asked?score/asked:0,best=Ls("best",{}),key=daily?"daily:"+today():m;const prev=best[key];const isNew=!daily&&(prev==null||score>prev)&&score>0;
    if(daily){if(prev==null)best[key]=score}else if(prev==null||score>prev)best[key]=score;Sv("best",best);
    const s=stats();s.played++;s.right+=score;s.asked+=asked;s.days=[...new Set([...(s.days||[]),today()])].slice(-400);Sv("qxstats",s);
    const secs=Math.round((Date.now()-t0)/1000);const C=2*Math.PI*80;
    const msg=speed?(score>=15?"Lightning fast!":score>=8?"Great speed!":"Keep practicing!"):pct==1?"Perfect round!":pct>=.8?"Brilliant!":pct>=.5?"Good job!":"Keep exploring!";
    const miss=L.slice(0,asked).map((q,k)=>[q,res[k]]).filter(x=>!x[1]);
    V.innerHTML=`<div class="qx qx-res"><div class="qx-ring"><svg viewBox="0 0 190 190"><defs><linearGradient id="qxr"><stop offset="0" stop-color="#f97316"/><stop offset=".5" stop-color="#ec4899"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><circle class="bg" cx="95" cy="95" r="80"/><circle class="fg" id="qxrf" cx="95" cy="95" r="80" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div><b id="qxsc">0</b><small>${speed?"correct in 60 s":"out of "+asked}</small></div></div>
    <h2>${msg}</h2>${isNew?`<span class="new">🏅 New best score!</span>`:""}
    <div class="qx-kpis"><span><b>${asked?Math.round(pct*100):0}%</b>accuracy</span><span><b>${bestStreak}</b>best streak</span><span><b>${secs}s</b>time</span>${prev!=null&&!daily?`<span><b>${Math.max(prev,score)}</b>best</span>`:""}</div>
    <div class="qx-acts"><button class="qx-btn pri" id="qxa">${daily?"Try another quiz":"Play again"}</button><button class="qx-btn" id="qxm">All quizzes</button><button class="qx-btn" id="qxsh">📋 Copy result</button></div>
    ${miss.length?`<h3 class="qx-h3" style="text-align:left">Review what you missed</h3><div class="qx-rev">${miss.map(([q])=>{const a=q.id&&get(q.id);return `<div style="--c:${q.c&&CAT[q.c]?CAT[q.c][0]:"#ec4899"}">${E(q.q)}${q.s?` “${E(q.s)}”`:""}<b>✓ ${E(q.a)}</b>${a?`<a href="#/art/${q.id}">Read the article ›</a>`:""}</div>`}).join("")}</div>`:asked?`<p style="font:600 15px system-ui">You got every question right. 🎉</p>`:""}</div>`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const f=document.getElementById("qxrf");if(f)f.style.strokeDashoffset=C*(1-(speed?Math.min(1,score/20):pct))}));
    const sc=document.getElementById("qxsc");const t1=performance.now();const tick=t=>{const f=Math.min(1,(t-t1)/1100);sc.textContent=Math.round(score*(1-Math.pow(1-f,3)));if(f<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);
    if(pct>=.8&&asked)setTimeout(()=>{const ring=document.querySelector(".qx-ring");if(ring)for(let k=0;k<3;k++)setTimeout(()=>burst(ring),k*180)},700);
    document.getElementById("qxa").onclick=()=>R.maze(daily?undefined:m);document.getElementById("qxm").onclick=()=>R.maze();
    document.getElementById("qxsh").onclick=e=>{const t=`I scored ${score}${speed?"":"/"+asked} on the ${label(m)} quiz at Encyclopedia Premium! ${location.origin+location.pathname}#/maze`;try{navigator.clipboard.writeText(t).then(()=>{e.target.textContent="✓ Copied"})}catch(x){e.target.textContent="Copy failed"}}}
  V.onkeydown=null;show();
  const kh=e=>{if(!alive()||!V.querySelector(".qx-play")){removeEventListener("keydown",kh);return}if(e.target.matches&&e.target.matches("input,textarea"))return;const k="abcd".indexOf(e.key.toLowerCase());const n="1234".indexOf(e.key);const ix=k>=0?k:n;
    if(ix>=0){const b=V.querySelectorAll(".qx-opt")[ix];if(b&&!b.disabled){e.preventDefault();b.click()}}};
  if(window.__qxkh)removeEventListener("keydown",window.__qxkh);window.__qxkh=kh;addEventListener("keydown",kh)}
R.maze=function(m){try{if(typeof setCat=="function")setCat(null)}catch(e){}const V=document.getElementById("v");if(!m)menu(V);else play(V,String(m))};
})();
