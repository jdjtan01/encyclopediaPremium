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
@media (max-width:560px){.hx{border-radius:22px}.hx-s button{padding:10px 16px}.hx-pills li{font-size:13px;padding:8px 11px}}

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
.hx-in .sx-c{animation:hxo .6s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(.45s + var(--i) * .045s)}
@keyframes hxo{from{opacity:0;transform:scale(.3) translateY(20px)}}
.hx-in .hx-deck a{animation:hxc .9s cubic-bezier(.2,.9,.25,1.1) both,hxf 7s ease-in-out .9s infinite alternate;animation-delay:calc(.3s + var(--n) * .15s),calc(1.2s + var(--n) * .15s)}
@keyframes hxc{from{opacity:0;transform:translate(120px,-40px) rotate(25deg)}}
@media (prefers-reduced-motion:reduce){.hx-t .w,.hx-deck a,.hx-in .hx-t .w,.hx-in .sx-c,.hx-in .hx-deck a{animation:none!important}}
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

.sx{display:grid;gap:18px;margin:30px 0 6px}
@media (min-width:1100px){.sx{grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);align-items:start}.sx-pv{height:386px}}
.sx-cards{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-auto-rows:122px;gap:10px;align-content:start}
.sx-c{--rx:0deg;--ry:0deg;position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:122px;padding:10px 10px 9px;border-radius:18px;overflow:hidden;text-decoration:none;color:#fff;isolation:isolate;
background:linear-gradient(150deg,var(--l) -20%,var(--c) 55%,color-mix(in srgb,var(--c) 60%,#000) 100%);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.28),0 10px 22px -12px var(--c);
transform:perspective(600px) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .25s ease,box-shadow .25s ease}
.sx-c:before{content:"";position:absolute;inset:-40%;z-index:-1;opacity:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);transform:translateX(-70%);transition:transform .8s ease}
.sx-c:hover:before,.sx-c.on:before{transform:translateX(70%);opacity:1}
.sx-c:after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at var(--mx,70%) var(--my,20%),rgba(255,255,255,.35),transparent 55%);opacity:0;transition:opacity .3s}
.sx-c:hover:after,.sx-c.on:after{opacity:1}
.sx-c .e{position:absolute;top:6px;right:6px;width:50px;height:50px;font-size:34px;line-height:1;filter:drop-shadow(0 6px 8px rgba(0,0,0,.35));transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.sx-c:hover .e,.sx-c.on .e{transform:scale(1.25) rotate(-8deg) translateY(-2px)}
.sx-c b{font:800 14px/1.15 var(--disp);text-shadow:0 1px 6px rgba(0,0,0,.35)}
.sx-c small{font:700 11.5px/1.2 system-ui,sans-serif;color:#fff;margin-top:3px;text-shadow:0 1px 4px rgba(0,0,0,.45)}
.sx-c.on{box-shadow:inset 0 0 0 2.5px #fff,0 0 0 3px var(--l),0 18px 30px -12px var(--c);transform:perspective(600px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-4px)}
.sx-c:focus-visible{outline:3px solid #ffd23f;outline-offset:3px}
.sx-c i.bar{position:absolute;left:0;top:0;height:4px;width:0;background:#fff;opacity:.9}
.sx-c.on i.bar{animation:sxb var(--cyc,5s) linear forwards}
.sx.paused .sx-c.on i.bar{animation:none;width:100%}
@keyframes sxb{to{width:100%}}
.sx-pv{position:relative;border-radius:24px;overflow:hidden;padding:16px 18px 16px;background:linear-gradient(160deg,color-mix(in srgb,var(--c) 70%,#120a3a),#120a3a 85%);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.22),0 0 40px -10px var(--l);transition:background .5s,box-shadow .5s;display:flex;flex-direction:column}
.sx-pv .big{position:absolute;right:14px;top:12px;width:84px;height:84px;font-size:0;opacity:.95;pointer-events:none;filter:drop-shadow(0 10px 18px rgba(0,0,0,.35));z-index:1}
.sx-pv .sx-in{position:relative;z-index:1}.sx-pv h3{padding-right:92px}
.sx-ph{position:absolute;inset:0;z-index:0;pointer-events:none}.sx-ph .ban{position:absolute!important;inset:0;height:100%!important;font-size:0!important;color:transparent!important;background:none!important;margin:0!important}.sx-ph img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .6s}.sx-ph img.ld{opacity:.5}
.sx-ph:after{content:"";position:absolute;inset:0;background:linear-gradient(170deg,color-mix(in srgb,var(--c) 55%,transparent) 0%,rgba(18,10,58,.82) 55%,#120a3a 100%)}
.sx-in{display:flex;flex-direction:column;gap:8px;flex:1;animation:sxi .45s cubic-bezier(.2,.8,.2,1)}
@keyframes sxi{from{opacity:0;transform:translateY(14px)}}
.sx-pv h3{margin:0;height:2.2em;display:flex;align-items:flex-end;overflow:hidden;font:900 clamp(24px,2.5vw,32px)/1.1 var(--disp);letter-spacing:-.03em;color:#fff}
.sx-pv .tg{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--l);font:700 15px/1.3 var(--disp)}
.sx-pv .ct{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#e7e1ff;font:500 14px/1.4 system-ui,sans-serif}
.sx-th{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.sx-th a{display:block;border-radius:12px;overflow:hidden;background:rgba(255,255,255,.1);text-decoration:none;color:#fff;transition:transform .2s}
.sx-th a:hover,.sx-th a:focus-visible{transform:translateY(-3px)}
.sx-th .ban{height:56px;font-size:28px;display:grid;place-items:center;position:relative;overflow:hidden}
.sx-th .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sx-th span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:2.4em;box-sizing:content-box;padding:6px 8px 7px;font:700 12px/1.2 var(--disp)}
.sx-sb{display:flex;flex-wrap:wrap;gap:6px;height:62px;overflow:hidden;align-content:flex-start}
.sx-sb a{font:600 12.5px/1 system-ui,sans-serif;color:#fff;text-decoration:none;padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25)}
.sx-sb a:hover{background:rgba(255,255,255,.24)}
.sx-go{margin-top:auto;align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:999px;text-decoration:none;font:800 15px var(--disp);color:#1b0f45;background:linear-gradient(90deg,#fff,var(--l))}
.sx-go:hover{filter:brightness(1.06)}
.sx-tip{margin:0;color:#cfc6f2;font:500 12.5px system-ui,sans-serif}
@media (max-width:760px){.sx-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.sx-cards{grid-auto-rows:104px}.sx-c{min-height:0;border-radius:15px}.sx-pv{height:412px}.sx-c .e{width:42px;height:42px}.sx-pv .big{width:70px;height:70px}.sx-pv h3{padding-right:70px}.sx-c b{font-size:13px}}
@media (max-width:400px){.sx-c{padding:8px 7px}.sx-c b{font-size:11.5px;letter-spacing:-.01em}.sx-c small{font-size:10.5px}.sx-c .e{width:34px;height:34px;top:5px;right:5px}}
@media (prefers-reduced-motion:reduce){.sx-c,.sx-c:before,.sx-c .e,.sx-in{transition:none;animation:none}.sx-c.on i.bar{animation:none;width:100%}}

.bento{display:grid;gap:16px;margin:8px 0 6px;grid-template-columns:1fr}
@media (min-width:640px){.bento{grid-template-columns:1fr 1fr;grid-template-areas:"fact fact" "word cont" "dyk read" "study study"}}
@media (min-width:1000px){.bento{grid-template-columns:1.15fr 1fr 1fr;grid-template-areas:"fact fact word" "cont dyk read" "study study study"}}
.bento>.panel{grid-area:var(--ga);position:relative;isolation:isolate;overflow:hidden;margin:0;border:0!important;border-radius:26px;padding:22px 22px 20px;color:#fff;background:var(--bg2);box-shadow:0 22px 40px -24px var(--sh),inset 0 0 0 1px rgba(255,255,255,.14);display:flex;flex-direction:column;gap:10px;min-width:0}
@media (max-width:639px){.bento>.panel{grid-area:auto}}
.bento>.panel:before{content:"";position:absolute;z-index:-1;width:260px;height:260px;right:-70px;top:-90px;border-radius:50%;background:radial-gradient(circle,var(--glow),transparent 68%);opacity:.9}
.bento>.panel:after{content:"";position:absolute;z-index:-1;right:14px;bottom:12px;width:120px;height:120px;background:var(--deco) center/contain no-repeat;opacity:.16;transform:rotate(-8deg)}
.bento>.panel h3{margin:0;color:#fff;font:900 15px/1 var(--disp);letter-spacing:.01em;display:inline-flex;align-self:flex-start;align-items:center;gap:8px;padding:7px 12px 7px 8px;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(4px)}
.bento>.panel h3:before{content:"";width:18px;height:18px;background:var(--deco) center/contain no-repeat}
.bento>.panel p,.bento>.panel li{color:#fff;font-size:16px;line-height:1.55}
.bento>.panel a{color:#fff}
.bento>.panel a.lk,.bento>.panel p a,.bento>.panel li a{text-decoration:underline;text-decoration-color:rgba(255,255,255,.55);text-underline-offset:3px;font-weight:600}
.bento>.panel .btn{align-self:flex-start;background:rgba(255,255,255,.95)!important;color:#1b1340!important;border:0!important;border-radius:999px;font:800 14px var(--disp);padding:9px 16px;box-shadow:0 8px 18px -10px rgba(0,0,0,.5)}
.bento>.panel .btn:hover{transform:translateY(-1px)}
.bx-fact{--ga:fact;--bg2:linear-gradient(130deg,#ea580c 0%,#db2777 60%,#9d174d 100%);--glow:#ffd23f;--sh:#db2777}
.bx-fact p.q{font:800 clamp(22px,2.6vw,30px)/1.3 var(--disp)!important;letter-spacing:-.01em;margin:4px 0 2px;max-width:30ch;text-wrap:balance}
.bx-fact p.q:before{content:"“";display:block;font:900 64px/0.6 Georgia,serif;color:#ffd23f;margin:14px 0 4px}
.bx-word{--ga:word;--bg2:linear-gradient(150deg,#7c3aed,#4338ca);--glow:#f0abfc;--sh:#7c3aed}
.bx-word b.w{font:900 clamp(30px,3.2vw,40px)/1.05 var(--disp)!important;color:#fff!important;margin:6px 0 0!important;letter-spacing:-.02em}
.bx-word b.w+p{font-size:17px!important}
.bx-word p small{color:#e9e2ff}
.bx-cont{--ga:cont;--bg2:linear-gradient(150deg,#db2777,#7e22ce);--glow:#fda4af;--sh:#be185d}
.bx-cont a.mini{display:flex;flex-direction:column;align-items:stretch;gap:0;margin:0;text-decoration:none;border-radius:18px;overflow:hidden;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}
.bx-cont a.mini .ban{width:100%!important;height:150px!important;border-radius:0!important;font-size:54px;display:grid;place-items:center;position:relative;overflow:hidden}
.bx-cont a.mini .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bx-cont a.mini>span{padding:10px 14px 12px;display:flex;flex-direction:column;gap:2px}
.bx-cont a.mini b{font:800 18px/1.2 var(--disp);color:#fff}.bx-cont a.mini small{color:#fde7f3;font-size:13px}
.bx-cont .rec{display:flex;flex-direction:column;gap:8px}.bx-cont .rec>small{color:#fde7f3;font:700 13px var(--disp);margin-top:4px}
.bx-cont .rec a{display:flex;align-items:center;gap:12px;text-decoration:none!important;padding:6px;border-radius:14px;background:rgba(255,255,255,.1);font:700 15px/1.25 var(--disp)}.bx-cont .rec a:hover{background:rgba(255,255,255,.2)}
.bx-cont .rec .ban{width:48px!important;height:48px!important;flex:none;border-radius:10px!important;font-size:24px;display:grid;place-items:center;position:relative;overflow:hidden}.bx-cont .rec .ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bx-cont a.mini>span{align-items:flex-start;margin:0!important;text-align:left;width:auto!important}
.bx-dyk{--ga:dyk;--bg2:linear-gradient(150deg,#0f766e,#1d4ed8);--glow:#5eead4;--sh:#0f766e}
.bx-dyk ul{list-style:none;padding:0;margin:4px 0;display:flex;flex-direction:column;gap:10px}
.bx-dyk li{position:relative;padding:10px 12px 10px 38px;border-radius:14px;background:rgba(255,255,255,.1);font-size:15px!important;line-height:1.5!important}
.bx-dyk li:before{content:"✦";position:absolute;left:13px;top:9px;color:#ffd23f;font-size:16px}
.bx-read{--ga:read;--bg2:linear-gradient(150deg,#2563eb,#312e81);--glow:#7dd3fc;--sh:#2563eb}
.bx-read .rp{color:#fff}.bx-read .rp .big{color:#fff}
.rpx{display:flex;align-items:center;gap:16px;margin:2px 0 6px}
.rpx svg{width:92px;height:92px;flex:none;transform:rotate(-90deg)}
.rpx .rn{font:900 30px/1 var(--disp)}.rpx .rl{font-size:14px;color:#dbeafe;margin-top:4px}
.bx-read .rp .bar,.bx-read .rp>.big,.bx-read .rp>.big+*{display:none}
.bx-read .rp ul{margin:4px 0 8px}.bx-read .rp li{display:grid!important;grid-template-columns:1fr auto;gap:4px 10px;border:0!important;padding:5px 0!important;font-size:14px!important}
.bx-read .rp li i{grid-column:1/3;height:7px;border-radius:9px;background:rgba(255,255,255,.18);overflow:hidden}.bx-read .rp li i:after{content:"";display:block;height:100%;width:var(--w);background:var(--sc);border-radius:9px;box-shadow:0 0 10px var(--sc)}
.bx-study{--ga:study;--bg2:linear-gradient(120deg,#15803d,#0f766e 55%,#155e75);--glow:#bef264;--sh:#15803d}
.bx-study .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:4px}
.bx-study .tiles a{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:18px;text-decoration:none!important;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);transition:transform .2s,background .2s}
.bx-study .tiles a:hover{transform:translateY(-3px);background:rgba(255,255,255,.22)}
.bx-study .tiles svg{width:54px;height:54px;flex:none}
.bx-study .tiles b{display:block;font:800 17px/1.2 var(--disp)}.bx-study .tiles small{display:block;color:#dcfce7;font-size:13.5px;margin-top:2px}
.bento>.panel:focus-within{box-shadow:0 22px 40px -24px var(--sh),inset 0 0 0 2px rgba(255,255,255,.6)}

/* ---- panel animations ---- */
.bento>.panel{background-size:180% 180%!important;animation:bxg 14s ease-in-out infinite alternate;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}
@keyframes bxg{0%{background-position:0% 0%}100%{background-position:100% 100%}}
.bento>.panel:hover{transform:translateY(-6px) rotate(-.4deg);box-shadow:0 34px 50px -26px var(--sh),inset 0 0 0 1px rgba(255,255,255,.25)}
.bento>.panel:before{animation:bxb 9s ease-in-out infinite alternate}
@keyframes bxb{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,30px) scale(1.25)}100%{transform:translate(-90px,70px) scale(.9)}}
.bento>.panel:after{animation:bxd 6s ease-in-out infinite alternate}
@keyframes bxd{0%{transform:rotate(-8deg) translateY(0)}100%{transform:rotate(6deg) translateY(-10px) scale(1.06)}}
.bento>.panel:hover:after{opacity:.28}
.bento>.panel h3:before{animation:bxi 3.2s ease-in-out infinite}
@keyframes bxi{0%,70%,100%{transform:rotate(0) scale(1)}80%{transform:rotate(-14deg) scale(1.2)}90%{transform:rotate(10deg) scale(1.1)}}
.bx-fact p.q:before{animation:bxq 2.6s ease-in-out infinite}
@keyframes bxq{50%{transform:translateY(-4px) scale(1.12);color:#fff3b0}}
.bx-fact p.q.swap{animation:bxs .6s cubic-bezier(.2,.8,.2,1)}
@keyframes bxs{0%{opacity:0;transform:translateY(18px) rotateX(40deg);filter:blur(4px)}100%{opacity:1;transform:none;filter:none}}
.bx-word b.w .lt{display:inline-block;animation:bxl .7s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--k) * .045s)}
@keyframes bxl{0%{opacity:0;transform:translateY(24px) rotate(12deg) scale(.6)}}
.bx-word b.w+p{animation:bxs .7s .25s cubic-bezier(.2,.8,.2,1) both}
.bx-dyk li{transition:transform .25s,background .25s}
.bx-dyk li:hover{transform:translateX(6px);background:rgba(255,255,255,.18)}
.bx-dyk li.in{animation:bxs .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--k) * .12s)}
.bx-dyk li:hover:before{animation:a-spin 1.2s linear infinite;display:inline-block}
.bx-cont a.mini .ban img{transition:transform 6s ease}.bx-cont a.mini:hover .ban img{transform:scale(1.12)}
.bx-cont a.mini{transition:transform .25s}.bx-cont a.mini:hover{transform:translateY(-3px)}
.bx-cont .rec a{transition:transform .25s,background .25s}.bx-cont .rec a:hover{transform:translateX(6px)}
.rpx .ring{transition:stroke-dasharray 1.6s cubic-bezier(.2,.8,.2,1)}
.bx-read .rp li i:after{transition:width 1.4s cubic-bezier(.2,.8,.2,1)}
.bx-read:not(.go) .rp li i:after{width:0!important}
.bx-study .tiles a:hover svg{animation:bxw .6s ease-in-out}
@keyframes bxw{25%{transform:rotate(-10deg) scale(1.1)}75%{transform:rotate(8deg) scale(1.1)}}
.bento .btn{transition:transform .2s,box-shadow .2s}.bento .btn:active{transform:scale(.94)}
/* ---- scroll reveal ---- */
#v.home2{overflow-x:clip}
.home2.rv-on .rv{opacity:0;transform:translateY(46px) scale(.97);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:var(--rd,0s)}
.home2.rv-on .rv.rv-l{transform:translateX(-50px) rotate(-2deg)}.home2.rv-on .rv.rv-r{transform:translateX(50px) rotate(2deg)}
.home2.rv-on .rv.rv-z{transform:scale(.82) rotate(-3deg)}
.home2.rv-on .rv.shown{opacity:1;transform:none}
.home2 .sech:after{transform-origin:left;transition:transform 1.1s cubic-bezier(.2,.8,.2,1) .2s}
.home2.rv-on .sech.rv:not(.shown):after{transform:scaleX(0)}
.home2 .bento>.panel.rv.shown{transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}
.sprog{position:fixed;left:0;top:0;height:4px;width:100%;z-index:60;transform-origin:left;transform:scaleX(var(--sp,0));background:linear-gradient(90deg,#ff3d77,#ffb800,#00c2a8,#4f7cff,#b84dff);pointer-events:none}
@media (prefers-reduced-motion:reduce){.bento>.panel,.bento>.panel:before,.bento>.panel:after,.bento>.panel h3:before,.bx-fact p.q:before,.bx-word b.w .lt,.bx-dyk li.in{animation:none!important}.home2.rv-on .rv{opacity:1!important;transform:none!important}.sprog{display:none}}
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
const cnt={};A.forEach(a=>cnt[a.c]=(cnt[a.c]||0)+1);const SL=order.filter(c=>S[c]);
const orbs=SL.map((c,i)=>`<a class="sx-c" data-c="${esc3(c)}" href="${hrefs[c]||"#/browse/"+encodeURIComponent(c)}" style="--c:${CAT[c][0]};--l:${CAT[c][1]};--i:${i}"><span class="e" aria-hidden="true">${window.subjArt?subjArt(c):S[c].i}</span><b>${esc3(c)}</b><small>${cnt[c]||0} articles</small><i class="bar" aria-hidden="true"></i></a>`).join("");
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
<div class="sx"><div class="sx-cards">${orbs}</div><div class="sx-pv" aria-live="polite"></div></div>`;
if(links){links.className="hx-links";hx.appendChild(links)}
m.replaceWith(hx);
{const sx=hx.querySelector(".sx"),pv=sx.querySelector(".sx-pv"),cards=[...sx.querySelectorAll(".sx-c")],CYC=5000;let cur=-1,tm=0,hold=false;
const show=i=>{cur=i;const c=SL[i],Sx=S[c],href=cards[i].getAttribute("href");cards.forEach((k,j)=>k.classList.toggle("on",j==i));
const fe=(Sx.feat||[]).map(get).filter(Boolean).slice(0,3);want(fe);
pv.style.setProperty("--c",CAT[c][0]);pv.style.setProperty("--l",CAT[c][1]);
pv.innerHTML=`${fe[0]?`<div class="sx-ph" aria-hidden="true">${ban(fe[0])}</div>`:""}<span class="big" aria-hidden="true">${window.subjArt?subjArt(c):Sx.i}</span><div class="sx-in"><h3>${esc3(c)}</h3><p class="tg">${esc3(Sx.tag||"")}</p><p class="ct">${cnt[c]||0} articles in ${Sx.subs.length} sections</p>
<div class="sx-th">${fe.map(a=>`<a href="#/art/${a.id}">${ban(a)}<span>${esc3(a.t)}</span></a>`).join("")}</div>
<div class="sx-sb">${Sx.subs.filter(b=>b.n!="Other articles").slice(0,4).map(b=>`<a href="${href}">${esc3(b.n)}</a>`).join("")}</div>
<a class="sx-go" href="${href}">Explore ${esc3(c)} ›</a></div>`};
const next=()=>{clearTimeout(tm);if(!document.body.contains(sx))return;if(!hold&&!sx.classList.contains("paused"))show((cur+1)%SL.length);tm=setTimeout(next,CYC)};
sx.style.setProperty("--cyc",CYC/1000+"s");
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches,still=matchMedia("(prefers-reduced-motion:reduce)").matches;
cards.forEach((k,i)=>{k.addEventListener("mouseenter",()=>{hold=true;show(i)});k.addEventListener("focus",()=>{hold=true;show(i)});
if(fine&&!still){k.addEventListener("mousemove",e=>{const r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;k.style.setProperty("--ry",(x-.5)*16+"deg");k.style.setProperty("--rx",(.5-y)*16+"deg");k.style.setProperty("--mx",x*100+"%");k.style.setProperty("--my",y*100+"%")});
k.addEventListener("mouseleave",()=>{k.style.setProperty("--rx","0deg");k.style.setProperty("--ry","0deg")})}});
sx.addEventListener("mouseleave",()=>{hold=false});sx.addEventListener("focusout",e=>{if(!sx.contains(e.relatedTarget))hold=false});
if(still)sx.classList.add("paused");
show(seed%SL.length);tm=setTimeout(next,CYC)}
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
V.querySelectorAll("a.stile").forEach(t=>{const b=t.querySelector("b"),i=t.querySelector(".st-i");if(b&&i&&window.subjArt){const sv=subjArt(b.textContent);if(sv){i.classList.add("svg");i.innerHTML=sv}}});
V.querySelectorAll(".sech").forEach((h,i)=>{h.style.setProperty("--hg",GR[i%GR.length]);if(!h.querySelector("span"))h.innerHTML=`<span>${h.innerHTML}</span>`});
{const ic=d=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none' stroke='white' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'>${d}</svg>`)}")`;
const DECO={fact:ic("<path d='M17 34h14M19 40h10M24 6a12 12 0 0 0-7 21.7c1.3 1 2 2.4 2 3.9V34h10v-2.4c0-1.5.7-2.9 2-3.9A12 12 0 0 0 24 6z'/>"),
word:ic("<path d='M6 38L16 10l10 28M9.5 29h13M30 24c2-3 9-3 10 1v13M40 31c-3-2-10-2-10 3s7 5 10 0'/>"),
cont:ic("<path d='M24 12c-5-4-12-4-18-2v28c6-2 13-2 18 2 5-4 12-4 18-2V10c-6-2-13-2-18 2zM24 12v28'/>"),
dyk:ic("<path d='M24 4l4 13 13 4-13 4-4 13-4-13-13-4 13-4zM38 32l2 5 5 2-5 2-2 5-2-5-5-2 5-2z'/>"),
read:ic("<circle cx='24' cy='24' r='18'/><circle cx='24' cy='24' r='10'/><circle cx='24' cy='24' r='2.5' fill='white'/>"),
study:ic("<rect x='8' y='14' width='26' height='20' rx='3'/><path d='M14 10h24a3 3 0 0 1 3 3v17'/><path d='M14 24h14M14 29h9'/>")};
const groups=[...V.querySelectorAll(".cols3")].filter(g=>!g.closest(".bento")).slice(0,2);
const panels=groups.flatMap(g=>[...g.children].filter(e=>e.classList.contains("panel")));
if(panels.length>=6){const bx=document.createElement("div");bx.className="bento";groups[0].before(bx);
const kind=pnl=>{const h=(pnl.querySelector("h3")||{}).textContent||"";return /Fact of the day/.test(h)?"fact":/Continue|Where to start/.test(h)?"cont":/Did you know/.test(h)?"dyk":/Word of the day/.test(h)?"word":/Your reading/.test(h)?"read":/Study tools/.test(h)?"study":""};
panels.forEach(pnl=>{const k=kind(pnl);if(!k)return;pnl.classList.add("bx-"+k);pnl.style.setProperty("--deco",DECO[k]);bx.appendChild(pnl)});
groups.forEach(g=>{if(!g.querySelector(".panel"))g.remove()});
const fp=bx.querySelector(".bx-fact");if(fp){const q=fp.querySelector("p");q&&q.classList.add("q");if(typeof FACTS!="undefined"){let fi=FACTS.indexOf(q?q.textContent:"");const b=document.createElement("button");b.className="btn sm";b.textContent="Another fact";b.onclick=()=>{fi=(fi+1+Math.floor(Math.random()*(FACTS.length-1)))%FACTS.length;q.textContent=FACTS[fi];q.classList.remove("swap");void q.offsetWidth;q.classList.add("swap")};fp.appendChild(b)}}
const cp=bx.querySelector(".bx-cont");if(cp&&!cp.querySelector("a.mini")){cp.querySelectorAll("p").forEach(x=>x.style.fontSize="17px")}
if(cp&&cp.querySelector("a.mini")&&typeof HIST!="undefined"){const seen=new Set(),rec=[];HIST.forEach(h=>{const a=get(h.i);if(a&&!seen.has(a.id)){seen.add(a.id);rec.push(a)}});const more=rec.slice(1,4);
if(more.length){cp.querySelector("a.mini").insertAdjacentHTML("afterend",`<div class="rec"><small>Also opened recently</small>${more.map(a=>`<a href="#/art/${a.id}">${ban(a)}<span>${esc3(a.t)}</span></a>`).join("")}</div>`);want(more)}}
const rp=bx.querySelector(".bx-read .rp");if(rp){const big=rp.querySelector(".big"),n=big?parseInt(big.textContent.replace(/,/g,"")):0,pc=n/A.length,C=2*Math.PI*40;
rp.insertAdjacentHTML("afterbegin",`<div class="rpx"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,.2)" stroke-width="12" fill="none"/><circle cx="50" cy="50" r="40" class="ring" data-d="${Math.max(2,C*pc).toFixed(1)} ${C.toFixed(1)}" stroke="url(#rg)" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="0 ${C.toFixed(1)}"/><defs><linearGradient id="rg"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#f0abfc"/></linearGradient></defs></svg><div><div class="rn">${n.toLocaleString("en-US")}</div><div class="rl">of ${A.length.toLocaleString("en-US")} articles explored (${(pc*100).toFixed(pc<.1?1:0)}%)</div></div></div>`);
[...rp.childNodes].forEach(nd=>{if(nd.nodeType==3&&/articles explored/.test(nd.textContent))nd.textContent=""});
rp.querySelectorAll("li").forEach(li=>{const sp=li.querySelectorAll("span");if(sp.length<2)return;const m=sp[1].textContent.match(/(\d+) of (\d+)/),c=sp[0].textContent;if(!m)return;li.insertAdjacentHTML("beforeend",`<i style="--w:${Math.max(3,100*m[1]/m[2])}%;--sc:${(CAT[c]||["#fff","#fff"])[1]}"></i>`)})}
const sp=bx.querySelector(".bx-study");if(sp){const L=[...sp.querySelectorAll("a.btn")];if(L.length>=2){const card=`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="14" y="8" width="34" height="44" rx="6" fill="rgba(255,255,255,.35)" transform="rotate(10 31 30)"/><rect x="10" y="10" width="34" height="44" rx="6" fill="#fff"/><path d="M18 24h18M18 31h12" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/><circle cx="36" cy="44" r="4" fill="#ffd23f"/></svg>`,cmp=`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="6" y="10" width="21" height="40" rx="5" fill="#fff"/><rect x="33" y="10" width="21" height="40" rx="5" fill="#fff"/><path d="M11 20h11M11 27h8M11 34h11M38 20h11M38 27h8M38 34h11" stroke="#0f766e" stroke-width="3" stroke-linecap="round"/><path d="M24 54h12" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/></svg>`;
const t=document.createElement("div");t.className="tiles";t.innerHTML=`<a href="${L[0].getAttribute("href")}">${card}<span><b>Flashcards from your reading</b><small>Flip through key facts and words from articles you've opened</small></span></a><a href="${L[1].getAttribute("href")}">${cmp}<span><b>Compare side by side</b><small>Jupiter and Saturn, or any two similar articles</small></span></a>`;
L.forEach(a=>a.closest("p")?a.closest("p").remove():a.remove());sp.appendChild(t)}}}}
/* animated extras for panels */
{const bx=V.querySelector(".bento");if(bx){
const wl=()=>{const w=bx.querySelector(".bx-word b.w");if(w&&!w.querySelector(".lt")){const t=w.textContent;w.setAttribute("aria-label",t);w.innerHTML=[...t].map((ch,k)=>ch==" "?" ":`<span class="lt" aria-hidden="true" style="--k:${k}">${esc3(ch)}</span>`).join("")}};wl();
const wd=bx.querySelector(".bx-word");wd&&new MutationObserver(wl).observe(wd,{childList:true});
const dl=()=>bx.querySelectorAll(".bx-dyk li").forEach((li,k)=>{if(!li.classList.contains("in")){li.style.setProperty("--k",k);li.classList.add("in")}});dl();
const dk=bx.querySelector(".bx-dyk ul");dk&&new MutationObserver(dl).observe(dk,{childList:true});
const rd=bx.querySelector(".bx-read");
window.__bxRead=()=>{if(!rd||rd.classList.contains("go"))return;rd.classList.add("go");const r=rd.querySelector(".ring");r&&requestAnimationFrame(()=>r.setAttribute("stroke-dasharray",r.dataset.d));
const n=rd.querySelector(".rn");if(n){const end=parseInt(n.textContent.replace(/,/g,""))||0,t0=performance.now();const tick=t=>{const f=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-f,3);n.textContent=Math.round(end*e).toLocaleString("en-US");if(f<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}}}}
/* scroll reveal + progress bar + hero parallax */
{const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
if(!still&&"IntersectionObserver" in window){V.classList.add("rv-on");
const groups=[[".hcard","rv-z"],[".pk .sech",""],[".pk-row",""],[".bento>.panel",""],[".tk","rv-z"],[".sech",""],[".stiles>.stile",""],[".row>.panel",""],[".grid>a",""],[".grid~p",""]];
const done=new Set();groups.forEach(([sel,cls])=>{[...V.querySelectorAll(sel)].forEach((el,k)=>{if(done.has(el))return;done.add(el);el.classList.add("rv");cls&&el.classList.add(cls);
if(sel==".bento>.panel"){const c3=["rv-l","","rv-r"][k%3];c3&&el.classList.add(c3)}
if(sel==".row>.panel")el.classList.add(k%2?"rv-r":"rv-l");
const per=sel==".stiles>.stile"?5:sel==".grid>a"?5:3;el.style.setProperty("--rd",((k%per)*.09)+"s")})});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add("shown");setTimeout(()=>el.classList.remove("rv","shown","rv-l","rv-r","rv-z"),1300+parseFloat(getComputedStyle(el).getPropertyValue("--rd")||0)*1000);if(e.target.classList.contains("bx-read"))setTimeout(()=>window.__bxRead&&__bxRead(),350);io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
V.querySelectorAll(".rv").forEach(el=>io.observe(el));
let bar=document.querySelector(".sprog");if(!bar){bar=document.createElement("div");bar.className="sprog";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar)}
const blobs=[...hx.querySelectorAll(".hx-bg i")];let raf=0;
const onS=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(!V.classList.contains("home2")){bar.style.setProperty("--sp",0);return}const h=document.documentElement.scrollHeight-innerHeight;bar.style.setProperty("--sp",h>0?(scrollY/h).toFixed(4):0);
const y=Math.min(scrollY,900);blobs.forEach((b,i)=>b.style.translate=`0 ${(y*(.08+i*.05)).toFixed(1)}px`)})};
if(!window.__sprogOn){window.__sprogOn=1;addEventListener("scroll",()=>window.__sprogFn&&__sprogFn(),{passive:true})}window.__sprogFn=onS;onS()}
else window.__bxRead&&__bxRead()}
V.querySelectorAll(".cols3 > .panel, .row > .panel").forEach((p,i)=>{p.classList.add("hp");p.style.setProperty("--pc",PC[i%PC.length][0]);const h=p.querySelector("h3");h&&h.setAttribute("data-e",PC[i%PC.length][1])});
const yc=()=>V.querySelectorAll("#dc p>b:first-child").forEach((b,i)=>b.style.setProperty("--yc",YC[i%YC.length]));yc();
const dc=$("#dc");dc&&new MutationObserver(yc).observe(dc,{childList:true,subtree:true})};
addEventListener("hashchange",()=>{if(!/^#?\/?(home)?$/.test(location.hash)){V.classList.remove("home2","rv-on");const b=document.querySelector(".sprog");b&&b.style.setProperty("--sp",0)}});
})();
