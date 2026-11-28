// Navigation bar upgrade (v162): two-pane Subjects menu with search, a grouped More menu, hover intent and keyboard support,
// floating animated menus, bottom sheets on phones, scroll hints, a gliding hover highlight and a nav bar that returns when scrolling up.
(function(){
if(typeof R=="undefined")return;
const RM=matchMedia("(prefers-reduced-motion: reduce)"),PH=matchMedia("(max-width:640px)"),FINE=matchMedia("(hover:hover) and (pointer:fine)");
const enc=encodeURIComponent,catUrl=c=>"#/cat/"+enc(c),subUrl=(c,b)=>"#/cat/"+enc(c)+"/"+enc(b);
const MORE=[
["Explore","🧭","#6366f1","#a855f7",[["contents","📑","Contents","Every subject and section","#6366f1"],["browse","🗂️","All articles","Filter and sort everything","#8b5cf6"],["index","🔎","Index","Find any topic by name","#0ea5e9"],["az","🔤","A–Z","Quick reference list","#14b8a6"],["gloss","📘","Glossary","Key terms explained","#3b82f6"],["dict","📖","Dictionary","Words and meanings","#a855f7"],["guides","🧭","Reading guides","Paths through big topics","#ec4899"]]],
["Places and time","🌍","#10b981","#0ea5e9",[["countries","🏳️","Countries","A fact file for every country","#10b981"],["atlas","🗺️","Atlas","Explore the world map","#0ea5e9"],["time","🕰️","Timeline","Events through history","#f59e0b"],["deeptime","⏳","Deep time","539 million years of life","#a855f7"],["fossilmap","📍","Fossil map","Where famous fossils were found","#ef4444"]]],
["Play and learn","🎮","#f97316","#ec4899",[["chal","🏙️","Capitals challenge","Name the capital","#f97316"],["flags","🚩","Flag quiz","Match flags to countries","#ef4444"],["cards","🃏","Flashcards","Learn by flipping","#ec4899"],["sizes","📏","Size line-up","Giants of the past, side by side","#14b8a6"],["compare/jupiter~saturn","⚖️","Compare","Two articles side by side","#8b5cf6"]]],
["Your library","💛","#eab308","#f97316",[["saved","⭐","My Library","Your bookmarks","#eab308"],["hist","🕘","Reading history","Articles you have opened","#f97316"],["notes","📝","Research notes","Your saved notes","#84cc16"]]],
["About","📚","#64748b","#6366f1",[["cover","📕","Cover","The book’s front cover","#ef4444"],["howto","❓","How to use","Tips and shortcuts","#6366f1"],["book","🖨️","Print the book","A printable edition","#64748b"],["about","ℹ️","About this edition","Sources and credits","#0ea5e9"]]]];
const FEAT=[["@rnd","🎲","Random article","Roll the dice and discover something new","#f97316","#ec4899","dice"],["maze","🧩","Mind Maze quizzes","How much do you really know?","#8b5cf6","#06b6d4","quiz"],["histmap","🏛️","History map","Watch 5,000 years of empires rise and fall","#10b981","#f59e0b","map"]];
const css=`
.nx-wrap{position:relative}
.nx-wrap.nx-sticky{position:sticky;top:var(--nxt,0px);z-index:45;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .25s}
.nx-wrap.nx-hide{transform:translateY(-70%);opacity:0;pointer-events:none}
.nx-wrap.nx-float{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(16px) saturate(1.6);-webkit-backdrop-filter:blur(16px) saturate(1.6);box-shadow:0 10px 24px -20px rgba(0,0,0,.6)}
#nv .nx-hov{position:absolute;top:50%;height:34px;left:0;width:0;margin-top:-17px;border-radius:10px;background:var(--sf2);opacity:0;pointer-events:none;transition:left .25s cubic-bezier(.3,1.2,.5,1),width .25s cubic-bezier(.3,1.2,.5,1),opacity .2s;z-index:0}
#nv button{position:relative;z-index:1}
#nv.nx-on button:hover{background:transparent!important;transform:none}
#nv .ddb[aria-expanded=true]{background:color-mix(in srgb,var(--sf2) 80%,transparent)!important}
.nx-fade{position:absolute;top:0;bottom:0;width:44px;display:none;align-items:center;pointer-events:none;z-index:2}
.nx-fade.r{right:0;justify-content:flex-end;background:linear-gradient(90deg,transparent,var(--bg) 70%)}
.nx-fade.l{left:0;justify-content:flex-start;background:linear-gradient(270deg,transparent,var(--bg) 70%)}
.nx-fade button{pointer-events:auto;all:unset;cursor:pointer;width:26px;height:26px;margin:0 4px;border-radius:50%;display:grid;place-items:center;background:var(--sf);border:1px solid var(--bd);box-shadow:0 2px 8px -2px rgba(0,0,0,.3);font-size:14px;color:var(--hd)}
.nx-wrap.ovr .nx-fade.r,.nx-wrap.ovl .nx-fade.l{display:flex}
.nx-pop{position:absolute;z-index:60;background:color-mix(in srgb,var(--sf) 94%,transparent);backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);border:1px solid var(--bd);border-radius:20px;box-shadow:0 30px 60px -30px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.04) inset;color:var(--tx);transform-origin:var(--ox,40px) 0;animation:nxIn .26s cubic-bezier(.2,.9,.3,1.1)}
.nx-pop[hidden]{display:none}
@keyframes nxIn{from{opacity:0;transform:translateY(-8px) scale(.97)}}
.nx-pop:before{content:"";position:absolute;top:-7px;left:var(--ax,40px);width:12px;height:12px;background:inherit;border-left:1px solid var(--bd);border-top:1px solid var(--bd);transform:rotate(45deg);border-radius:3px 0 0 0}
/* Subjects */
#nx-cat{width:min(880px,calc(100vw - 32px));padding:14px}
.nx-s{display:flex;align-items:center;gap:10px;margin:2px 4px 12px;padding:0 12px;height:44px;border-radius:12px;background:var(--sf2);border:1px solid transparent;transition:border-color .2s,box-shadow .2s}
.nx-s:focus-within{border-color:var(--cc,#7c3aed);box-shadow:0 0 0 3px color-mix(in srgb,var(--cc,#7c3aed) 22%,transparent)}
.nx-s input{all:unset;flex:1;font:500 15px system-ui,sans-serif;color:var(--tx)}
.nx-s kbd{font:600 11px system-ui;color:var(--mu);border:1px solid var(--bd);border-radius:6px;padding:2px 6px}
.nx-two{display:grid;grid-template-columns:260px 1fr;gap:12px;min-height:420px}
.nx-list{display:flex;flex-direction:column;gap:1px;max-height:min(62vh,520px);overflow:auto;padding:2px;scrollbar-width:thin}
.nx-sub{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:11px;font:600 14px var(--disp);color:var(--tx);transition:background .15s,color .15s}
.nx-sub i{font-style:normal;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-size:15px;background:color-mix(in srgb,var(--c) 16%,transparent);transition:transform .25s cubic-bezier(.3,1.6,.5,1),background .2s}
.nx-sub small{margin-left:auto;font:600 11px system-ui;color:var(--mu);background:var(--sf2);padding:2px 7px;border-radius:99px}
.nx-sub[aria-selected=true]{background:color-mix(in srgb,var(--c) 14%,var(--sf));color:var(--hd)}
.nx-sub[aria-selected=true] i{background:var(--c);transform:scale(1.08) rotate(-6deg)}
.nx-sub[aria-selected=true] small{background:color-mix(in srgb,var(--c) 25%,transparent);color:var(--hd)}
.nx-sub:focus-visible{outline:2px solid var(--c);outline-offset:-2px}
.nx-pane{position:relative;border-radius:16px;padding:18px 20px;background:linear-gradient(150deg,color-mix(in srgb,var(--c) 14%,var(--sf)),var(--sf) 60%);border:1px solid color-mix(in srgb,var(--c) 25%,var(--bd));overflow:hidden}
.nx-pane:after{content:attr(data-i);position:absolute;right:-10px;bottom:-30px;font-size:150px;opacity:.09;pointer-events:none}
.nx-pane.sw{animation:nxSw .3s cubic-bezier(.2,.8,.2,1)}
@keyframes nxSw{from{opacity:.2;transform:translateX(10px)}}
.nx-ph h3{margin:0;font:900 1.6rem/1.1 var(--disp);letter-spacing:-.02em;color:var(--hd)}
.nx-ph p{margin:4px 0 14px;color:var(--mu);font-size:.95rem}
.nx-secs{display:grid;grid-template-columns:1fr 1fr;gap:4px 14px}
.nx-secs a{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;color:var(--tx);text-decoration:none;font-weight:600;font-size:.93rem;transition:background .15s,translate .2s}
.nx-secs a:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c);flex:none}
.nx-secs a small{margin-left:auto;color:var(--mu);font:600 11px system-ui}
.nx-secs a:hover,.nx-secs a:focus-visible{background:color-mix(in srgb,var(--c) 14%,transparent);translate:3px 0;outline:none}
.nx-feat{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;align-items:center}
.nx-feat span{font:700 12px system-ui;color:var(--mu);margin-right:2px}
.nx-feat a{font:600 13px system-ui;padding:6px 11px;border-radius:99px;background:var(--sf);border:1px solid var(--bd);color:var(--tx);text-decoration:none;transition:border-color .2s,translate .2s}
.nx-feat a:hover{border-color:var(--c);translate:0 -2px}
.nx-go{display:inline-flex;align-items:center;gap:6px;margin-top:16px;padding:10px 16px;border-radius:99px;background:var(--c);color:#fff!important;font:700 14px system-ui;text-decoration:none;box-shadow:0 8px 20px -10px var(--c);transition:transform .15s,filter .15s}
.nx-go:hover{filter:brightness(1.1);transform:translateY(-1px)}
.nx-res{display:none;max-height:min(62vh,520px);overflow:auto}
#nx-cat.q .nx-two{display:none}#nx-cat.q .nx-res{display:block}
.nx-res h4{margin:10px 8px 6px;font:700 12px system-ui;color:var(--mu)}
.nx-res a{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;color:var(--tx);text-decoration:none;font-weight:600}
.nx-res a i{font-style:normal;width:26px;height:26px;border-radius:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 18%,transparent)}
.nx-res a small{color:var(--mu);font:500 12px system-ui;margin-left:auto}
.nx-res a:hover,.nx-res a:focus-visible,.nx-res a.hl{background:color-mix(in srgb,var(--c) 14%,transparent);outline:none}
.nx-res mark{background:color-mix(in srgb,var(--c) 30%,transparent);color:inherit;border-radius:3px}
.nx-empty{padding:30px;text-align:center;color:var(--mu)}
.nx-foot{display:flex;gap:6px;flex-wrap:wrap;margin:12px 4px 0;padding-top:12px;border-top:1px solid var(--bd)}
.nx-foot a{font:600 13px system-ui;color:var(--mu);text-decoration:none;padding:6px 10px;border-radius:8px}.nx-foot a:hover{background:var(--sf2);color:var(--hd)}
/* More */
#nx-more{width:min(980px,calc(100vw - 32px));padding:16px;max-height:calc(100vh - 140px);overflow:auto;scrollbar-width:thin}
.mo-feat{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px}
.mo-fc{position:relative;display:flex;align-items:center;gap:14px;padding:16px 16px!important;border-radius:18px!important;color:#fff!important;text-decoration:none;overflow:hidden;background:linear-gradient(120deg,var(--a),var(--b),var(--a))!important;background-size:220% 100%!important;box-shadow:0 14px 30px -16px var(--a);animation:moPop .55s cubic-bezier(.2,1.4,.4,1) both,moFlow 6s ease-in-out infinite alternate!important;animation-delay:calc(var(--k)*70ms),0s!important;transition:transform .25s cubic-bezier(.3,1.5,.5,1),box-shadow .25s!important}
button.mo-fc{border:0;font:inherit;text-align:left;cursor:pointer;width:100%}
.mo-fc:hover,.mo-fc:focus-visible{transform:translateY(-4px) rotate(-.6deg);box-shadow:0 22px 40px -18px var(--a);translate:none!important;outline:none}
.mo-fc:before{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s}
.mo-fc:hover:before{transform:translateX(120%)}
.mo-fi{position:relative;flex:none;width:54px;height:54px;border-radius:16px;display:grid;place-items:center;font-size:30px;background:rgba(255,255,255,.22);box-shadow:inset 0 1px 0 rgba(255,255,255,.5);animation:moBob 3.2s ease-in-out infinite;animation-delay:calc(var(--k)*-1s)}
.mo-ft b{display:block;font:900 1.08rem/1.15 var(--disp);color:#fff!important;letter-spacing:-.01em}
.mo-ft small{display:block;margin-top:3px;font:600 12.5px/1.3 system-ui;color:rgba(255,255,255,.88)!important}
.mo-fx{position:absolute;right:-18px;top:-18px;width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.14);transition:transform .5s}
.mo-fc:hover .mo-fx{transform:scale(1.5)}
.mo-dice:hover .mo-fi{animation:moRoll .7s cubic-bezier(.3,1.4,.5,1)}
.mo-quiz:hover .mo-fi{animation:moJump .6s cubic-bezier(.3,1.6,.5,1) infinite}
.mo-map:hover .mo-fi{animation:moSpin 1.6s linear infinite}
.mo-groups{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.mo-g{position:relative;border-radius:18px;padding:12px 10px 8px;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 12%,var(--sf)),color-mix(in srgb,var(--b) 6%,var(--sf)));border:1px solid color-mix(in srgb,var(--a) 22%,var(--bd));overflow:hidden;animation:moUp .5s cubic-bezier(.2,.9,.3,1.1) both;animation-delay:calc(120ms + var(--gi)*60ms)}
.mo-g:after{content:"";position:absolute;width:160px;height:160px;border-radius:50%;right:-60px;top:-70px;background:radial-gradient(circle,color-mix(in srgb,var(--b) 28%,transparent),transparent 70%);pointer-events:none}
.mo-g:nth-child(1){grid-row:span 2}
.mo-g h4{position:relative;z-index:1;display:flex;align-items:center;gap:9px;margin:0 6px 8px;font:900 14px var(--disp);color:var(--hd)}
.mo-g h4 span{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-size:15px;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 6px 14px -6px var(--a)}
.mo-g h4 em{margin-left:auto;font:700 11px system-ui;font-style:normal;color:var(--a);background:color-mix(in srgb,var(--a) 14%,transparent);padding:3px 8px;border-radius:99px}
.mo-items{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:2px 6px}
.mo-g:nth-child(1) .mo-items{grid-template-columns:1fr}
.mo-it{position:relative;display:flex!important;align-items:center;gap:11px;padding:6px 10px!important;border-radius:12px!important;color:var(--tx);text-decoration:none;animation:moPop .45s cubic-bezier(.2,1.4,.4,1) both!important;animation-delay:calc(200ms + var(--gi,0)*60ms + var(--k)*35ms)!important}
.mo-it i{font-style:normal;flex:none;width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-size:18px;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 30%,var(--sf)),color-mix(in srgb,var(--c) 12%,var(--sf)));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent);transition:transform .3s cubic-bezier(.3,1.6,.5,1),box-shadow .3s,background .3s}
.mo-it b{display:block;font:700 14px system-ui;color:var(--hd)}
.mo-it small{display:block;font:500 12px/1.3 system-ui;color:var(--mu)}
.mo-it s{margin-left:auto;text-decoration:none;font:800 18px system-ui;color:var(--c);opacity:0;transform:translateX(-6px);transition:opacity .2s,transform .25s}
.mo-it:hover,.mo-it:focus-visible{background:color-mix(in srgb,var(--c) 13%,transparent)!important;outline:none;translate:0!important}
.mo-it:hover i,.mo-it:focus-visible i{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 60%,#fff));box-shadow:0 8px 18px -8px var(--c);animation:moWig .5s ease}
.mo-it:hover s,.mo-it:focus-visible s{opacity:1;transform:none}
@keyframes moPop{from{opacity:0;transform:translateY(10px) scale(.9) rotate(-2deg)}}
@keyframes moUp{from{opacity:0;transform:translateY(14px)}}
@keyframes moFlow{to{background-position:100% 0}}
@keyframes moBob{50%{transform:translateY(-4px) rotate(4deg)}}
@keyframes moRoll{0%{transform:rotate(0) scale(1)}40%{transform:rotate(200deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
@keyframes moJump{50%{transform:translateY(-8px) scale(1.1)}}
@keyframes moSpin{to{transform:rotate(360deg)}}
@keyframes moWig{0%,100%{transform:none}25%{transform:rotate(-12deg) scale(1.12)}50%{transform:rotate(10deg) scale(1.15)}75%{transform:rotate(-5deg) scale(1.1)}}
@media (max-width:820px){.mo-feat{grid-template-columns:1fr}.mo-groups{grid-template-columns:1fr}.mo-g:nth-child(1){grid-row:auto}.mo-g:nth-child(1) .mo-items{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.mo-items,.mo-g:nth-child(1) .mo-items{grid-template-columns:1fr}.mo-fc{padding:12px 14px!important}.mo-fi{width:46px;height:46px;font-size:24px}}
@media (prefers-reduced-motion:reduce){.mo-fc,.mo-fi,.mo-g,.mo-it,.mo-it i{animation:none!important}.mo-fc:before{display:none}}
.nx-pop a,.nx-pop .nx-it{animation:nxUp .35s cubic-bezier(.2,.8,.2,1) both}
@keyframes nxUp{from{opacity:0;transform:translateY(6px)}}
/* Phone bottom sheets */
.nx-bd{position:fixed;inset:0;z-index:59;background:rgba(8,10,20,.45);backdrop-filter:blur(2px);animation:nxFade .25s}
@keyframes nxFade{from{opacity:0}}
@media (max-width:640px){
.nx-pop{position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;width:auto!important;max-height:86vh;border-radius:22px 22px 0 0;padding:10px 14px calc(16px + env(safe-area-inset-bottom));overflow:auto;animation:nxSheet .32s cubic-bezier(.2,.9,.3,1)}
@keyframes nxSheet{from{transform:translateY(100%)}}
.nx-pop:before{position:sticky;display:block;top:0;left:auto;margin:0 auto 10px;width:44px;height:5px;border:0;border-radius:9px;background:var(--bd);transform:none}
.nx-two{grid-template-columns:1fr;min-height:0}
.nx-list{max-height:none}
#nx-cat .nx-pane{display:none}
#nx-cat.det .nx-list{display:none}#nx-cat.det .nx-pane{display:block}
.nx-back{display:inline-flex!important}
.nx-secs{grid-template-columns:1fr}
.nx-sub{padding:10px 10px;font-size:15px}
.nx-it{padding:10px}
.nx-mg{grid-template-columns:1fr}
}
.nx-back{display:none;all:unset;cursor:pointer;align-items:center;gap:6px;font:700 13px system-ui;color:var(--mu);margin:0 0 10px}

/* Floating glass capsule with an aurora inside (v163) */
.nx-wrap{background:none!important;padding:8px 16px 6px}
.nx-wrap.nx-float{background:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important}
#nv{--au:.30;width:fit-content;max-width:100%;margin:0 auto!important;padding:5px 6px!important;border-radius:999px;border:1px solid rgba(255,255,255,.6);
background:radial-gradient(38% 170% at 6% 50%,rgba(249,115,22,var(--au)),transparent 70%),radial-gradient(34% 190% at 34% 50%,rgba(236,72,153,var(--au)),transparent 70%),radial-gradient(34% 190% at 64% 50%,rgba(124,58,237,var(--au)),transparent 70%),radial-gradient(38% 190% at 95% 50%,rgba(14,165,233,var(--au)),transparent 70%),color-mix(in srgb,var(--sf) 62%,transparent)!important;
background-size:160% 100%,160% 100%,160% 100%,160% 100%,100% 100%!important;animation:nxAur 22s ease-in-out infinite alternate;
backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),0 14px 34px -18px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.04)}
@keyframes nxAur{0%{background-position:0% 50%,30% 50%,70% 50%,100% 50%,0 0}100%{background-position:60% 50%,90% 50%,10% 50%,40% 50%,0 0}}
#nv .nvi{display:none!important}
#nv button{border-radius:99px!important}
#nv button.on{background:rgba(255,255,255,.82)!important;color:#141821!important;box-shadow:inset 0 1px 0 #fff,0 4px 14px -6px rgba(0,0,0,.35)!important}
#nv .nx-hov{border-radius:99px;background:rgba(255,255,255,.45);height:36px;margin-top:-18px}
#nv .ddb[aria-expanded=true]{background:rgba(255,255,255,.55)!important}
:root[data-theme=dark] #nv{--au:.42;border-color:rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 14px 34px -18px rgba(0,0,0,.8)}
:root[data-theme=dark] #nv button.on{background:rgba(255,255,255,.16)!important;color:#fff!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.24),0 0 18px rgba(196,181,253,.35)!important}
:root[data-theme=dark] #nv .nx-hov{background:rgba(255,255,255,.09)}
:root[data-theme=dark] #nv .ddb[aria-expanded=true]{background:rgba(255,255,255,.12)!important}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #nv{--au:.42;border-color:rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 14px 34px -18px rgba(0,0,0,.8)}
:root:not([data-theme=light]) #nv button.on{background:rgba(255,255,255,.16)!important;color:#fff!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.24),0 0 18px rgba(196,181,253,.35)!important}
:root:not([data-theme=light]) #nv .nx-hov{background:rgba(255,255,255,.09)}
:root:not([data-theme=light]) #nv .ddb[aria-expanded=true]{background:rgba(255,255,255,.12)!important}}
@media (max-width:640px){.nx-wrap{padding:6px 10px 4px}#nv{width:auto;margin:0!important}
.nx-fade{top:6px;bottom:4px}.nx-fade.r{right:10px;border-radius:0 999px 999px 0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--sf) 92%,transparent) 65%)}.nx-fade.l{left:10px;border-radius:999px 0 0 999px;background:linear-gradient(270deg,transparent,color-mix(in srgb,var(--sf) 92%,transparent) 65%)}}
@media (prefers-reduced-motion:reduce){#nv{animation:none}}
@media (prefers-reduced-motion:reduce){.nx-pop,.nx-pop a,.nx-pop .nx-it,.nx-pane.sw,.nx-bd{animation:none!important}#nv .nx-hov,.nx-wrap.nx-sticky{transition:none}}
`;
let built=false,open=null,lastBtn=null,tmo=0,tmc=0,curSub=0;
const CATS=()=>typeof CAT!="undefined"?CAT:(window.CAT||{});const ORD=()=>Object.keys(CATS()).filter(c=>(window.SUBJ||{})[c]);
const colOf=c=>(CATS()[c]||["#7c3aed"])[0];
const countOf=c=>(SUBJ[c].subs||[]).reduce((n,s)=>n+s.ids.length,0);
function build(){
if(built)return;built=true;
const st=document.createElement("style");st.id="navxcss";st.textContent=css;document.head.appendChild(st);
const nv=document.getElementById("nv");if(!nv)return;
// Wrap the nav for sticky behavior and scroll hints
const wrap=document.createElement("div");wrap.className="nx-wrap";nv.parentNode.insertBefore(wrap,nv);wrap.appendChild(nv);
wrap.insertAdjacentHTML("beforeend",`<div class="nx-fade l"><button type="button" aria-label="Scroll tabs left">‹</button></div><div class="nx-fade r"><button type="button" aria-label="Scroll tabs right">›</button></div>`);
const ovr=()=>{const o=nv.scrollWidth>nv.clientWidth+2;wrap.classList.toggle("ovr",o&&nv.scrollLeft+nv.clientWidth<nv.scrollWidth-4);wrap.classList.toggle("ovl",o&&nv.scrollLeft>4)};
nv.addEventListener("scroll",ovr,{passive:true});addEventListener("resize",ovr);setTimeout(ovr,300);
wrap.querySelector(".nx-fade.r button").onclick=()=>nv.scrollBy({left:160,behavior:RM.matches?"auto":"smooth"});
wrap.querySelector(".nx-fade.l button").onclick=()=>nv.scrollBy({left:-160,behavior:RM.matches?"auto":"smooth"});
// Hover highlight that glides between tabs
nv.classList.add("nx-on");const hov=document.createElement("span");hov.className="nx-hov";nv.prepend(hov);
nv.addEventListener("pointerover",e=>{const b=e.target.closest("#nv button");if(!b||!FINE.matches)return;hov.style.left=b.offsetLeft+"px";hov.style.width=b.offsetWidth+"px";hov.style.opacity="1"});
nv.addEventListener("pointerleave",()=>{hov.style.opacity="0"});
// Menus
const O=ORD();
document.body.insertAdjacentHTML("beforeend",`<div class="nx-pop" id="nx-cat" role="dialog" aria-label="Subjects" hidden><label class="nx-s"><span aria-hidden="true">🔎</span><input type="search" placeholder="Find a subject or section…" aria-label="Find a subject or section"><kbd>Esc</kbd></label><div class="nx-two"><div class="nx-list" role="listbox" aria-label="Subjects">${O.map((c,i)=>`<button type="button" class="nx-sub" role="option" data-i="${i}" style="--c:${colOf(c)}" aria-selected="${i?"false":"true"}"><i>${SUBJ[c].i}</i>${esc(c)}<small>${countOf(c)}</small></button>`).join("")}</div><div class="nx-pane"></div></div><div class="nx-res"></div><div class="nx-foot"><a href="#/contents">Full contents</a><a href="#/browse">All articles</a><a href="#/az">A–Z</a><a href="#/index">Index</a></div></div>
<div class="nx-pop" id="nx-more" role="dialog" aria-label="More" hidden><div class="mo-feat">${FEAT.map((f,k)=>{const inner=`<span class="mo-fi" aria-hidden="true">${f[1]}</span><span class="mo-ft"><b>${f[2]}</b><small>${f[3]}</small></span><span class="mo-fx" aria-hidden="true"></span>`;return f[0][0]=="@"?`<button type="button" class="nx-it mo-fc mo-${f[6]}" data-act="${f[0].slice(1)}" style="--a:${f[4]};--b:${f[5]};--k:${k}">${inner}</button>`:`<a class="nx-it mo-fc mo-${f[6]}" href="#/${f[0]}" style="--a:${f[4]};--b:${f[5]};--k:${k}">${inner}</a>`}).join("")}</div><div class="mo-groups">${MORE.map((g,gi)=>`<section class="mo-g" style="--a:${g[2]};--b:${g[3]};--gi:${gi}"><h4><span>${g[1]}</span>${g[0]}<em>${g[4].length}</em></h4><div class="mo-items">${g[4].map((x,k)=>`<a class="nx-it mo-it" href="#/${x[0]}" style="--c:${x[4]};--k:${k}"><i>${x[1]}</i><span><b>${x[2]}</b><small>${x[3]}</small></span><s aria-hidden="true">›</s></a>`).join("")}</div></section>`).join("")}</div></div></div>`);
const cat=document.getElementById("nx-cat"),more=document.getElementById("nx-more"),pane=cat.querySelector(".nx-pane"),subs=[...cat.querySelectorAll(".nx-sub")],inp=cat.querySelector("input"),res=cat.querySelector(".nx-res");
function showSub(i,anim){curSub=i;const c=O[i],S=SUBJ[c];subs.forEach((b,j)=>b.setAttribute("aria-selected",j==i));cat.style.setProperty("--c",colOf(c));pane.style.setProperty("--c",colOf(c));pane.dataset.i=S.i;
const feat=(S.feat||[]).map(get).filter(Boolean).slice(0,4);
pane.innerHTML=`<button type="button" class="nx-back">‹ All subjects</button><div class="nx-ph"><h3>${S.i} ${esc(c)}</h3><p>${esc(S.tag||"")} · ${countOf(c)} articles</p></div><div class="nx-secs">${S.subs.map(b=>`<a href="${subUrl(c,b.n)}">${esc(b.n)}<small>${b.ids.length}</small></a>`).join("")}</div>${feat.length?`<div class="nx-feat"><span>Start with</span>${feat.map(a=>`<a href="#/art/${a.id}">${a.i||""} ${esc(a.t)}</a>`).join("")}</div>`:""}<a class="nx-go" href="${catUrl(c)}">Explore ${esc(c)} ›</a>`;
pane.querySelector(".nx-back").onclick=()=>{cat.classList.remove("det");subs[curSub].focus()};
if(anim&&!RM.matches){pane.classList.remove("sw");void pane.offsetWidth;pane.classList.add("sw")}}
subs.forEach((b,i)=>{b.addEventListener("pointerenter",()=>{if(FINE.matches&&curSub!=i)showSub(i,true)});b.addEventListener("focus",()=>{if(curSub!=i)showSub(i,true)});b.addEventListener("click",()=>{showSub(i,true);if(PH.matches)cat.classList.add("det");else{const f=pane.querySelector(".nx-secs a");f&&f.focus()}})});
showSub(0,false);
// Search inside the Subjects menu
const hlq=(t,q)=>{const i=t.toLowerCase().indexOf(q);return i<0?esc(t):esc(t.slice(0,i))+"<mark>"+esc(t.slice(i,i+q.length))+"</mark>"+esc(t.slice(i+q.length))};
inp.addEventListener("input",()=>{const q=inp.value.trim().toLowerCase();cat.classList.toggle("q",!!q);if(!q){res.innerHTML="";return}
const sj=O.filter(c=>c.toLowerCase().includes(q)),sc=[];O.forEach(c=>SUBJ[c].subs.forEach(b=>{if(b.n.toLowerCase().includes(q))sc.push([c,b])}));
const ar=(typeof A!="undefined"?A:[]).filter(a=>a.t&&a.t.toLowerCase().includes(q)).sort((x,y)=>x.t.toLowerCase().indexOf(q)-y.t.toLowerCase().indexOf(q)).slice(0,6);
let h="";if(sj.length)h+=`<h4>Subjects</h4>`+sj.map(c=>`<a href="${catUrl(c)}" style="--c:${colOf(c)}"><i>${SUBJ[c].i}</i><span>${hlq(c,q)}</span><small>${countOf(c)} articles</small></a>`).join("");
if(sc.length)h+=`<h4>Sections</h4>`+sc.slice(0,10).map(([c,b])=>`<a href="${subUrl(c,b.n)}" style="--c:${colOf(c)}"><i>${SUBJ[c].i}</i><span>${hlq(b.n,q)}</span><small>${esc(c)}</small></a>`).join("");
if(ar.length)h+=`<h4>Articles</h4>`+ar.map(a=>`<a href="#/art/${a.id}" style="--c:${colOf(a.c)}"><i>${a.i||"📄"}</i><span>${hlq(a.t,q)}</span><small>${esc(a.c||"")}</small></a>`).join("");
res.innerHTML=h||`<div class="nx-empty">Nothing matches “${esc(inp.value)}”. Try the main search for full-text results.</div>`;const f=res.querySelector("a");f&&f.classList.add("hl")});
inp.addEventListener("keydown",e=>{const L=[...res.querySelectorAll("a")];if(e.key=="Enter"){const h=res.querySelector("a.hl")||L[0];if(h){e.preventDefault();location.hash=h.getAttribute("href");close()}}else if(e.key=="ArrowDown"&&cat.classList.contains("q")){e.preventDefault();L[0]&&L[0].focus()}else if(e.key=="ArrowDown"){e.preventDefault();subs[curSub].focus()}});
more.querySelector('[data-act="rnd"]').onclick=()=>{close();const r=document.getElementById("rnd");r&&r.click()};
// Open, close, hover intent and keyboard
const btns=[...nv.querySelectorAll(".ddb")];const popOf=b=>b.dataset.dd=="cat"?cat:more;
function place(b,p){if(PH.matches)return;const r=b.getBoundingClientRect(),w=p.offsetWidth,vw=document.documentElement.clientWidth;let x=Math.min(Math.max(16,r.left-24),vw-w-16);p.style.left=(x+scrollX)+"px";p.style.top=(r.bottom+scrollY+10)+"px";const ax=Math.max(18,Math.min(w-30,r.left+r.width/2-x-6));p.style.setProperty("--ax",ax+"px");p.style.setProperty("--ox",(ax+6)+"px")}
let bd=null;
function openMenu(b,focus){const p=popOf(b);if(open===p){return}close(true);open=p;lastBtn=b;p.hidden=false;place(b,p);b.setAttribute("aria-expanded","true");
if(PH.matches){bd=document.createElement("div");bd.className="nx-bd";bd.onclick=()=>close();document.body.appendChild(bd);document.documentElement.style.overflow="hidden"}
if(p==cat){cat.classList.remove("det","q");inp.value="";res.innerHTML=""}
if(focus){const f=p==cat?(PH.matches?subs[curSub]:inp):p.querySelector(".nx-it");f&&f.focus({preventScroll:true})}}
function close(silent){if(!open)return;open.hidden=true;if(lastBtn)lastBtn.setAttribute("aria-expanded","false");if(bd){bd.remove();bd=null;document.documentElement.style.overflow=""}const was=open;open=null;if(!silent&&lastBtn&&was.contains(document.activeElement))lastBtn.focus({preventScroll:true})}
btns.forEach(b=>{b.onclick=e=>{e.stopPropagation();if(open===popOf(b))close();else openMenu(b,true)};
b.addEventListener("keydown",e=>{if(e.key=="ArrowDown"){e.preventDefault();openMenu(b,true)}});
b.addEventListener("pointerenter",()=>{if(!FINE.matches||PH.matches)return;clearTimeout(tmc);clearTimeout(tmo);tmo=setTimeout(()=>openMenu(b,false),open?0:140)});
b.addEventListener("pointerleave",()=>{clearTimeout(tmo);if(FINE.matches)tmc=setTimeout(()=>{if(open&&!open.matches(":hover"))close(true)},280)})});
[cat,more].forEach(p=>{p.addEventListener("pointerenter",()=>clearTimeout(tmc));p.addEventListener("pointerleave",()=>{if(!FINE.matches||PH.matches||(p==cat&&(document.activeElement===inp||inp.value)))return;tmc=setTimeout(()=>close(true),320)});
p.addEventListener("click",e=>{if(e.target.closest("a"))close(true)});
p.addEventListener("keydown",e=>{if(e.key=="Escape"){e.preventDefault();close();return}
const items=[...p.querySelectorAll(p==more?".nx-it":(cat.classList.contains("q")?".nx-res a":(e.target.closest(".nx-pane")?".nx-pane a":".nx-sub")))].filter(x=>x.offsetParent);
const i=items.indexOf(document.activeElement);if(i<0)return;
if(e.key=="ArrowDown"||e.key=="ArrowUp"){e.preventDefault();const n=items[(i+(e.key=="ArrowDown"?1:-1)+items.length)%items.length];n.focus()}
else if(p==cat&&e.key=="ArrowRight"&&e.target.classList.contains("nx-sub")){e.preventDefault();const f=pane.querySelector(".nx-secs a");f&&f.focus()}
else if(p==cat&&e.key=="ArrowLeft"&&e.target.closest(".nx-pane")){e.preventDefault();subs[curSub].focus()}})});
document.addEventListener("click",e=>{if(open&&!e.target.closest(".nx-pop")&&!e.target.closest("#nv .ddb"))close(true)},true);
addEventListener("keydown",e=>{if(e.key=="Escape"&&open)close()});
addEventListener("resize",()=>{if(open&&lastBtn&&!PH.matches)place(lastBtn,open)});
addEventListener("hashchange",()=>close(true));
// Hide the old menus
document.querySelectorAll(".mega").forEach(m=>{m.hidden=true;m.style.display="none"});
// Nav bar that tucks away when scrolling down and returns when scrolling up
const hdr=document.querySelector("body>header");let lastY=scrollY,ticking=false;
const hh=()=>hdr&&getComputedStyle(hdr).position=="sticky"?hdr.offsetHeight:0;
const setVars=()=>{wrap.style.setProperty("--nxt",hh()+"px")};setVars();addEventListener("resize",setVars);
wrap.classList.add("nx-sticky");
const root=document.documentElement;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;const y=scrollY,dy=y-lastY;const past=y>wrap.offsetHeight+hh()+80;
if(open){lastY=y;return}
if(!past){wrap.classList.remove("nx-hide","nx-float");root.style.setProperty("--nxs","0px")}
else if(dy>6){wrap.classList.add("nx-hide");wrap.classList.remove("nx-float");root.style.setProperty("--nxs","0px")}
else if(dy<-6){wrap.classList.remove("nx-hide");wrap.classList.add("nx-float");root.style.setProperty("--nxs",wrap.offsetHeight+"px")}
lastY=y})}
addEventListener("scroll",onScroll,{passive:true});
}
const start=()=>setTimeout(build,0);if(document.readyState=="complete")start();else addEventListener("load",start);
})();
