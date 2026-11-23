/* Grand, colorful front page: hero with subject orbs, colored panels and big section headings */
(()=>{
const css=`
header h1{background:linear-gradient(90deg,#d97706,#db2777 45%,#7c3aed 80%,#0891b2);-webkit-background-clip:text;background-clip:text;color:transparent!important;font-weight:900!important;letter-spacing:-.02em}
:root[data-theme="dark"] header h1{background-image:linear-gradient(90deg,#ffd23f,#ff7ab6 45%,#b69cff 80%,#5ee7ff)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) header h1{background-image:linear-gradient(90deg,#ffd23f,#ff7ab6 45%,#b69cff 80%,#5ee7ff)}}
.hx{position:relative;isolation:isolate;overflow:hidden;border-radius:30px;padding:clamp(26px,5vw,60px) clamp(18px,4.5vw,56px) clamp(22px,4vw,44px);margin:4px 0 26px;background:#1d1466;color:#fff;box-shadow:0 30px 60px -30px rgba(60,20,140,.55)}
.hx-bg{position:absolute;inset:0;z-index:-1;overflow:hidden}
.hx-bg i{position:absolute;border-radius:50%;filter:blur(60px);opacity:.95;animation:hxd 22s ease-in-out infinite alternate}
.hx-bg i:nth-child(1){width:46%;height:70%;left:-8%;top:-20%;background:#ff3d77}
.hx-bg i:nth-child(2){width:40%;height:65%;right:-6%;top:-25%;background:#22d3ee;animation-delay:-6s}
.hx-bg i:nth-child(3){width:45%;height:70%;right:10%;bottom:-40%;background:#00c2a8;animation-delay:-11s}
.hx-bg i:nth-child(4){width:38%;height:60%;left:18%;bottom:-38%;background:#4f7cff;animation-delay:-3s}
.hx-bg i:nth-child(5){width:30%;height:50%;left:42%;top:5%;background:#b84dff;animation-delay:-15s}
.hx-bg:after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,rgba(20,10,70,.12),rgba(20,10,70,.5) 80%)}
@keyframes hxd{0%{transform:translate(0,0) scale(1)}50%{transform:translate(6%,8%) scale(1.15)}100%{transform:translate(-5%,-4%) scale(.95)}}
@media (prefers-reduced-motion:reduce){.hx-bg i{animation:none}}
.hx-date{margin:0 0 6px;font:700 15px/1.3 var(--disp);color:#ffe9a8;opacity:.95}
.hx-t{margin:0;font:900 clamp(44px,9.2vw,112px)/.92 var(--disp);letter-spacing:-.045em;max-width:11ch;background:linear-gradient(100deg,#fff3b0 0%,#ffd23f 18%,#ff8ac2 42%,#c7a6ff 62%,#7ae3ff 82%,#b8ff8a 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hxs 14s ease-in-out infinite alternate;padding-bottom:.06em}
@keyframes hxs{to{background-position:100% 0}}
@media (prefers-reduced-motion:reduce){.hx-t{animation:none}}
.hx-p{max-width:60ch;margin:18px 0 22px;font:500 clamp(16px,1.9vw,19px)/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;color:#f1ecff}
.hx-s{display:flex;gap:8px;max-width:640px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.hx-s input{flex:1;min-width:0;border:0;background:transparent;color:#fff;font:500 17px system-ui,sans-serif;padding:10px 14px;outline:none}
.hx-s input::placeholder{color:#e6defa}
.hx-s button{border:0;border-radius:999px;padding:10px 22px;font:800 16px var(--disp);color:#2a1060;background:linear-gradient(90deg,#ffd23f,#ff8ac2);cursor:pointer}
.hx-s:focus-within{outline:3px solid #ffd23f;outline-offset:3px}
.hx-pills{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 4px;padding:0;list-style:none}
.hx-pills li{font:700 14px/1 var(--disp);padding:9px 14px;border-radius:999px;color:#1b0f45;background:var(--pc)}
.hx-orbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:14px 10px;margin:30px 0 8px}
.hx-orbs a{display:flex;flex-direction:column;align-items:center;gap:8px;text-decoration:none;color:#fff;text-align:center;font:700 13.5px/1.2 var(--disp);border-radius:16px;padding:6px 2px}
.hx-orbs .o{width:66px;height:66px;border-radius:50%;display:grid;place-items:center;font-size:30px;background:radial-gradient(circle at 32% 28%,var(--l),var(--c) 70%);box-shadow:0 0 0 3px rgba(255,255,255,.55),0 10px 24px -6px var(--c);transition:transform .2s}
.hx-orbs a:hover .o,.hx-orbs a:focus-visible .o{transform:translateY(-4px) scale(1.08)}
.hx-orbs a:focus-visible{outline:3px solid #ffd23f}
.hx-links{border:0!important;padding:0!important;background:none!important;display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.hx-links a{color:#fff;text-decoration:none;font:700 14px var(--disp);padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.08)}
.hx-links a:hover{background:rgba(255,255,255,.2)}
.home2 .sech{font:900 clamp(30px,4.6vw,50px)/1.05 var(--disp);letter-spacing:-.03em;margin:1.3em 0 .55em}
.home2 .sech span{background:var(--hg);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.06em}
.home2 .sech:after{height:6px!important;border:0!important;border-radius:6px;background:var(--hg)!important;opacity:.9}
.home2 .panel.hp{border:0;border-top:7px solid var(--pc);background:color-mix(in srgb,var(--pc) 9%,var(--sf));border-radius:20px}
.home2 .panel.hp h3{font:900 22px/1.15 var(--disp);display:flex;align-items:center;gap:10px}
.home2 .panel.hp h3:before{content:attr(data-e);display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:12px;font-size:20px;background:var(--pc);box-shadow:0 6px 14px -6px var(--pc)}
.home2 .hcard{border:3px solid transparent!important;background:linear-gradient(var(--sf),var(--sf)) padding-box,linear-gradient(120deg,#ff3d77,#ffb800,#00c2a8,#4f7cff,#b84dff) border-box!important;border-radius:26px;overflow:hidden}
.home2 .hcard h3{font-size:clamp(30px,4vw,44px)!important;font-weight:900!important;letter-spacing:-.03em}
.home2 .hcard .btn{background:linear-gradient(90deg,#db2777,#7c3aed)!important;border:0!important;color:#fff!important}
.home2 #dc p>b:first-child{display:inline-block;min-width:3.6em;text-align:center;padding:3px 9px;margin-right:6px;border-radius:999px;color:#fff;background:var(--yc,#7c3aed);font-family:var(--disp)}
.home2 .stile{border-radius:22px}
@media (min-width:1000px){.home2 .stiles{grid-template-columns:repeat(5,minmax(0,1fr))}.home2 .stile{height:236px}}
@media (min-width:1000px){.hx-orbs{grid-template-columns:repeat(8,minmax(0,1fr))}}
@media (max-width:560px){.hx{border-radius:22px}.hx-orbs{grid-template-columns:repeat(4,1fr);gap:12px 4px}.hx-orbs .o{width:54px;height:54px;font-size:25px}.hx-orbs a{font-size:11.5px}.hx-s button{padding:10px 16px}.hx-pills li{font-size:13px;padding:8px 11px}}

.hx-top{display:block}
@media (min-width:1100px){.hx-top{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:30px;align-items:center}.hx-t{font-size:clamp(60px,7.4vw,104px)}}
.hx-deck{display:none;position:relative;height:440px}
@media (min-width:1100px){.hx-deck{display:block}}
.hx-deck a{position:absolute;width:200px;border-radius:18px;overflow:hidden;background:#fff;color:#1b1340;text-decoration:none;box-shadow:0 22px 40px -14px rgba(10,0,40,.6);transform:rotate(var(--r));animation:hxf 7s ease-in-out infinite alternate;animation-delay:var(--dl)}
.hx-deck a .ban{height:120px;font-size:44px;display:grid;place-items:center;position:relative;overflow:hidden}
.hx-deck a .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hx-deck a b{display:block;padding:9px 12px 3px;font:800 15px/1.2 var(--disp)}
.hx-deck a small{display:flex;align-items:center;gap:6px;padding:0 12px 11px;font:600 12px/1.2 system-ui,sans-serif;color:#5b5478}
.hx-deck a small:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--c);flex:none}
.hx-deck a:hover,.hx-deck a:focus-visible{z-index:5;outline:3px solid #ffd23f}
@keyframes hxf{from{transform:rotate(var(--r)) translateY(0)}to{transform:rotate(calc(var(--r) * -.4)) translateY(-14px)}}
.hx-t .w{display:inline-block;background:inherit;background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hxs 14s ease-in-out infinite alternate;padding-bottom:.06em}
.hx-in .hx-t .w{animation:hxw .9s cubic-bezier(.2,.8,.2,1.15) both,hxs 14s ease-in-out infinite alternate;animation-delay:calc(var(--i) * .12s),0s}
@keyframes hxw{from{opacity:0;transform:translateY(60px) rotate(4deg) scale(.9)}}
.hx-in .hx-orbs a{animation:hxo .55s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(.45s + var(--i) * .05s)}
@keyframes hxo{from{opacity:0;transform:scale(.3) translateY(20px)}}
.hx-in .hx-deck a{animation:hxc .9s cubic-bezier(.2,.9,.25,1.1) both,hxf 7s ease-in-out .9s infinite alternate;animation-delay:calc(.3s + var(--n) * .15s),calc(1.2s + var(--n) * .15s)}
@keyframes hxc{from{opacity:0;transform:translate(120px,-40px) rotate(25deg)}}
@media (prefers-reduced-motion:reduce){.hx-t .w,.hx-deck a,.hx-in .hx-t .w,.hx-in .hx-orbs a,.hx-in .hx-deck a{animation:none!important}}
.pk{margin:0 0 26px;position:relative}
.pk h2.sech{margin-top:.2em}
.pk-row{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);padding:8px 0}
.pk-tr{display:flex;gap:14px;width:max-content;animation:pkm var(--dur,70s) linear infinite}
.pk-row.rev .pk-tr{animation-direction:reverse}
.pk-row:hover .pk-tr,.pk-row:focus-within .pk-tr{animation-play-state:paused}
@keyframes pkm{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.pk-tr{animation:none}.pk-row{overflow-x:auto;-webkit-mask-image:none;mask-image:none}}
.pk-tr a{flex:none;width:210px;border-radius:18px;overflow:hidden;background:var(--sf);border:1px solid var(--bd);text-decoration:none;color:var(--hd);transition:transform .2s,box-shadow .2s}
.pk-tr a:hover,.pk-tr a:focus-visible{transform:translateY(-6px) rotate(-1deg);box-shadow:0 18px 30px -14px var(--c)}
.pk-tr a .ban{height:130px;font-size:46px;display:grid;place-items:center;position:relative;overflow:hidden}
.pk-tr a .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pk-tr a b{display:block;padding:10px 12px 2px;font:800 15.5px/1.2 var(--disp)}
.pk-tr a small{display:flex;align-items:center;gap:6px;padding:0 12px 12px;font:600 12.5px/1.2 system-ui,sans-serif;color:var(--mu)}
.pk-tr a small:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--c);flex:none}
.tk{margin:26px 0 6px;border-radius:999px;overflow:hidden;background:linear-gradient(90deg,#db2777,#f59e0b,#14b8a6,#3b82f6,#8b5cf6,#db2777);background-size:200% 100%;animation:tkb 18s linear infinite;padding:3px}
.tk-in{display:flex;align-items:center;border-radius:999px;background:var(--sf);overflow:hidden}
.tk-l{flex:none;font:900 15px var(--disp);color:#fff;background:linear-gradient(90deg,#db2777,#7c3aed);padding:12px 18px;border-radius:999px}
.tk-v{overflow:hidden;flex:1;-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.tk-tr{display:flex;gap:40px;width:max-content;animation:pkm 90s linear infinite;padding:0 20px}
.tk-v:hover .tk-tr{animation-play-state:paused}
.tk-tr a{white-space:nowrap;text-decoration:none;color:var(--tx);font:500 15px system-ui,sans-serif;display:flex;align-items:center;gap:10px}
.tk-tr a:before{content:"";width:10px;height:10px;border-radius:50%;background:var(--c);flex:none}
.tk-tr a:hover span{text-decoration:underline}
@keyframes tkb{to{background-position:200% 0}}
@media (prefers-reduced-motion:reduce){.tk,.tk-tr{animation:none}.tk-v{overflow-x:auto}}
@media (max-width:560px){.pk-tr a{width:168px}.pk-tr a .ban{height:104px}.tk-l{font-size:13px;padding:10px 12px}}
.home2 .stile{transition:transform .25s ease,box-shadow .25s ease;will-change:transform}
.home2 .stile:hover{box-shadow:0 24px 40px -18px var(--c)}
`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const esc3=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const GR=["linear-gradient(90deg,#db2777,#f59e0b)","linear-gradient(90deg,#7c3aed,#0891b2)","linear-gradient(90deg,#059669,#2563eb)","linear-gradient(90deg,#ea580c,#c026d3)","linear-gradient(90deg,#2563eb,#db2777)"];
const PC=[["#f59e0b","💡"],["#ec4899","🧭"],["#14b8a6","✨"],["#8b5cf6","🔤"],["#3b82f6","📖"],["#22c55e","🎓"],["#f43f5e","📅"],["#06b6d4","🔎"]];
const YC=["#db2777","#7c3aed","#0891b2","#059669","#ea580c","#2563eb"];
let played=false;const pal=a=>(CAT[a.c]||["#666"])[0];
const pcard=a=>`<a href="#/art/${a.id}" style="--c:${pal(a)}">${ban(a)}<b>${esc3(a.t)}</b><small>${esc3(a.sub||a.c)}</small></a>`;
const prev=R.home;
R.home=function(x){prev(x);const m=V.querySelector(".mast2");if(!m)return;V.classList.add("home2");
const S=window.SUBJ||{},order=Object.keys(CAT),d=new Date();
const nC=(window.COUNTRIES||window.CTRY||[]).length||238;
const hrefs={};V.querySelectorAll("a.stile").forEach(a=>{const b=a.querySelector("b");b&&(hrefs[b.textContent]=a.getAttribute("href"))});
const orbs=order.filter(c=>S[c]).map(c=>`<a href="${hrefs[c]||"#/browse/"+encodeURIComponent(c)}" style="--c:${CAT[c][0]};--l:${CAT[c][1]}"><span class="o" aria-hidden="true">${S[c].i||"•"}</span>${esc3(c)}</a>`).join("");
const links=m.querySelector(".mlinks");
const hx=document.createElement("section");hx.className="hx";
const seed=d.getFullYear()*400+d.getMonth()*32+d.getDate();
const withImg=A.filter(a=>a.img);const pool=(withImg.length>60?withImg:A);
const pick=(n,off)=>{const out=[];for(let k=0;out.length<n&&k<n*6;k++){const a=pool[(seed*(31+off)+k*137+off*53)%pool.length];if(!out.includes(a))out.push(a)}return out};
const deck=pick(4,7),row1=pick(10,11),row2=pick(10,29);
const DK=[["7deg","0px","20px"],["-6deg","125px","0px"],["4deg","122px","200px"],["-4deg","2px","238px"]];
hx.innerHTML=`<div class="hx-bg" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="hx-top"><div class="hx-main">
<p class="hx-date">${d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p>
<h2 class="hx-t">${"The illustrated encyclopedia".split(" ").map((w,i)=>`<span class="w" style="--i:${i}">${w}</span>`).join(" ")}</h2>
<p class="hx-p">Science, nature, history, people, the arts and everyday life, with an atlas and a fact file for every country. Everything works offline once it has loaded.</p>
<form class="hx-s" role="search"><input type="search" aria-label="Search the encyclopedia" placeholder="Search ${A.length.toLocaleString("en-US")} articles, countries and words"><button type="submit">Search</button></form>
<ul class="hx-pills"><li style="--pc:#ffd23f">${A.length.toLocaleString("en-US")} articles</li><li style="--pc:#ff9ccc">${nC} countries</li><li style="--pc:#8ff0dc">${order.length} subjects</li><li style="--pc:#c7b4ff">Daily facts and quizzes</li></ul></div>
<div class="hx-deck" aria-label="Today’s picture preview">${deck.map((a,n)=>pcard(a).replace('style="',`style="--r:${DK[n][0]};left:${DK[n][1]};top:${DK[n][2]};--n:${n};--dl:${-n*1.7}s;`)).join("")}</div></div>
<div class="hx-orbs">${orbs}</div>`;
if(links){links.className="hx-links";hx.appendChild(links)}
m.replaceWith(hx);hx.querySelectorAll(".hx-orbs a").forEach((a,i)=>a.style.setProperty("--i",i));
if(!played){played=true;hx.classList.add("hx-in")}
const pk=document.createElement("section");pk.className="pk";pk.setAttribute("aria-label","A peek inside");
const row=(l,cls,dur)=>`<div class="pk-row ${cls}"><div class="pk-tr" style="--dur:${dur}s">${l.map(pcard).join("")}${l.map(a=>pcard(a).replace("<a ",'<a tabindex="-1" aria-hidden="true" ')).join("")}</div></div>`;
pk.innerHTML=`<h2 class="sech">A peek inside</h2>${row(row1,"",80)}${row(row2,"rev",95)}`;
const aodCard=V.querySelector(".hcard");(aodCard||hx).insertAdjacentElement(aodCard?"afterend":"afterend",pk);
const fun=window.FUN||{},fk=Object.keys(fun).filter(get);const tf=[];for(let k=0;k<14&&fk.length;k++){const id=fk[(seed*17+k*211)%fk.length];if(!tf.includes(id))tf.push(id)}
if(tf.length){const tk=document.createElement("div");tk.className="tk";const it=tf.map(id=>`<a href="#/art/${id}" style="--c:${pal(get(id))}"><span>${esc3(fun[id])}</span></a>`).join("");
tk.innerHTML=`<div class="tk-in"><span class="tk-l">⚡ Quick facts</span><div class="tk-v"><div class="tk-tr">${it}${it.replace(/<a /g,'<a tabindex="-1" aria-hidden="true" ')}</div></div></div>`;
const st=[...V.querySelectorAll(".sech")].find(h=>/Explore/.test(h.textContent));st&&st.insertAdjacentElement("beforebegin",tk)}
want([...deck,...row1,...row2]);
if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion:reduce)").matches)V.querySelectorAll(".stile").forEach(t=>{t.onmousemove=e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`};t.onmouseleave=()=>{t.style.transform=""}});
hx.querySelector(".hx-s").onsubmit=e=>{e.preventDefault();const q=hx.querySelector("input").value.trim();if(!q)return;const qi=$("#q");if(qi){qi.value=q}location.hash="#/search/"+encodeURIComponent(q)};
V.querySelectorAll(".sech").forEach((h,i)=>{h.style.setProperty("--hg",GR[i%GR.length]);if(!h.querySelector("span"))h.innerHTML=`<span>${h.innerHTML}</span>`});
V.querySelectorAll(".cols3 > .panel, .row > .panel").forEach((p,i)=>{p.classList.add("hp");p.style.setProperty("--pc",PC[i%PC.length][0]);const h=p.querySelector("h3");h&&h.setAttribute("data-e",PC[i%PC.length][1])});
const yc=()=>V.querySelectorAll("#dc p>b:first-child").forEach((b,i)=>b.style.setProperty("--yc",YC[i%YC.length]));yc();
const dc=$("#dc");dc&&new MutationObserver(yc).observe(dc,{childList:true,subtree:true})};
addEventListener("hashchange",()=>{if(!/^#?\/?(home)?$/.test(location.hash))V.classList.remove("home2")});
})();
