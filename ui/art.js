/* Custom subject illustrations (replace the subject emoji) and photo backdrops for subject banners */
(()=>{
const W="#fff",T="rgba(255,255,255,.62)",S="rgba(0,0,0,.16)",G="#ffd23f",O="#ff8a3d";
const gear=(cx,cy,r,teeth,cls)=>{let d="";const ro=r,ri=r*.78;for(let i=0;i<teeth;i++){const a=i/teeth*Math.PI*2,s=Math.PI/teeth;
[[a-s*.55,ri],[a-s*.35,ro],[a+s*.35,ro],[a+s*.55,ri],[a+s*1.45,ri]].forEach(([q,rr],k)=>{d+=(i==0&&k==0?"M":"L")+(cx+rr*Math.cos(q)).toFixed(1)+" "+(cy+rr*Math.sin(q)).toFixed(1)})}
return `<g class="${cls}" style="transform-origin:${cx}px ${cy}px"><path d="${d}Z" fill="${W}"/><circle cx="${cx}" cy="${cy}" r="${r*.42}" fill="var(--c)" opacity=".55"/><circle cx="${cx}" cy="${cy}" r="${r*.18}" fill="${W}"/></g>`};
const ART={
"Planet Earth":`<ellipse cx="60" cy="62" rx="54" ry="16" fill="none" stroke="${T}" stroke-width="2" transform="rotate(-18 60 62)"/>
<circle cx="60" cy="60" r="38" fill="${W}"/><path d="M33 47c6-9 15-12 22-9 5 2 3 8-2 9-6 2-4 8 2 9 7 1 6 9-1 11-8 2-13 9-19 6-6-4-9-17-2-26zM66 30c9 1 17 6 21 14-4 2-9-1-12 2-3 4-9 2-10-3-1-4-6-6-4-10 1-2 3-3 5-3zM72 66c5-3 12-1 14 4-2 9-9 15-16 17-3-6-4-17 2-21z" fill="var(--c)" opacity=".7"/>
<path d="M30 52a32 32 0 0 1 22-23" fill="none" stroke="${W}" stroke-width="5" stroke-linecap="round" opacity=".6"/><circle cx="60" cy="60" r="38" fill="none" stroke="${S}" stroke-width="2"/>
<g class="a-orb" style="transform-origin:60px 60px"><circle cx="112" cy="47" r="5" fill="${G}"/></g>`,
"Animal Kingdom":`<g class="a-flap" style="transform-origin:60px 60px"><path d="M58 56C46 30 22 22 14 32c-8 11 4 30 26 30-18 4-24 20-14 28 10 7 26-6 32-26z" fill="${W}"/><path d="M62 56c12-26 36-34 44-24 8 11-4 30-26 30 18 4 24 20 14 28-10 7-26-6-32-26z" fill="${W}"/>
<circle cx="32" cy="40" r="7" fill="var(--c)" opacity=".55"/><circle cx="88" cy="40" r="7" fill="var(--c)" opacity=".55"/><circle cx="34" cy="78" r="5" fill="${G}"/><circle cx="86" cy="78" r="5" fill="${G}"/>
<path d="M22 38c4 10 14 16 26 18M98 38c-4 10-14 16-26 18" fill="none" stroke="var(--c)" stroke-width="2" opacity=".35"/></g>
<rect x="56" y="38" width="8" height="48" rx="4" fill="var(--c)" opacity=".85"/><path d="M58 39c-3-9-8-14-13-16M62 39c3-9 8-14 13-16" fill="none" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>`,
"Plants and Ecosystems":`<g class="a-sway" style="transform-origin:60px 86px"><path d="M60 88V40" stroke="${W}" stroke-width="5" stroke-linecap="round"/>
<path d="M60 62C44 64 30 54 28 36c18-2 32 8 32 26z" fill="${W}"/><path d="M60 62C46 56 38 48 32 40" stroke="var(--c)" stroke-width="2" fill="none" opacity=".45"/>
<path d="M60 50c14 2 28-8 32-26-18-2-32 8-32 26z" fill="${W}"/><path d="M60 50c12-6 20-14 28-22" stroke="var(--c)" stroke-width="2" fill="none" opacity=".45"/>
<path d="M60 40c-6-8-6-18 0-26 6 8 6 18 0 26z" fill="${T}"/></g>
<path d="M38 84h44l-6 26H44z" fill="${W}"/><rect x="34" y="80" width="52" height="10" rx="4" fill="${W}"/><rect x="34" y="86" width="52" height="4" fill="${S}"/><path d="M44 98h32" stroke="var(--c)" stroke-width="3" opacity=".4" stroke-linecap="round"/>`,
"Space":`<g class="a-tw"><path d="M18 22l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="${G}"/><path d="M100 92l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="${W}"/><circle cx="98" cy="20" r="2.5" fill="${W}"/><circle cx="20" cy="96" r="2" fill="${W}"/></g>
<circle cx="60" cy="60" r="30" fill="${W}"/><path d="M33 52c18 4 36 4 54 0M31 64c20 5 38 5 58 0" stroke="var(--c)" stroke-width="5" opacity=".35" fill="none"/><path d="M42 40a24 24 0 0 1 14-8" stroke="${W}" stroke-width="4" stroke-linecap="round" opacity=".7"/><circle cx="60" cy="60" r="30" fill="none" stroke="${S}" stroke-width="2"/>
<g class="a-ring" style="transform-origin:60px 60px"><path d="M14 72c-6-10 16-22 46-24s52 4 46 14" fill="none" stroke="${G}" stroke-width="5" stroke-linecap="round" transform="rotate(-14 60 60)"/><path d="M106 62c4 10-18 20-46 22S12 82 14 72" fill="none" stroke="${G}" stroke-width="5" stroke-linecap="round" transform="rotate(-14 60 60)" opacity=".9"/></g>`,
"Spaceflight":`<g transform="rotate(40 60 60)"><g class="a-fl" style="transform-origin:60px 92px"><path d="M50 90c2 14 6 22 10 26 4-4 8-12 10-26z" fill="${O}"/><path d="M54 90c1 9 3 14 6 17 3-3 5-8 6-17z" fill="${G}"/></g>
<path d="M60 8c16 12 22 34 18 62l-6 20H48l-6-20c-4-28 2-50 18-62z" fill="${W}"/><path d="M60 8c16 12 22 34 18 62l-6 20h-6c6-30 4-60-6-82z" fill="${S}"/>
<path d="M42 62l-14 16 2 14 16-8zM78 62l14 16-2 14-16-8z" fill="var(--l)"/><path d="M42 62l-14 16 2 14 16-8z" fill="var(--c)" opacity=".5"/>
<circle cx="60" cy="42" r="10" fill="var(--c)"/><circle cx="60" cy="42" r="10" fill="none" stroke="${W}" stroke-width="3"/><circle cx="57" cy="39" r="3" fill="${W}" opacity=".7"/></g>`,
"Science and Numbers":`<g class="a-spin" style="transform-origin:60px 60px"><ellipse cx="60" cy="60" rx="48" ry="17" fill="none" stroke="${W}" stroke-width="4"/><ellipse cx="60" cy="60" rx="48" ry="17" fill="none" stroke="${W}" stroke-width="4" transform="rotate(60 60 60)"/><ellipse cx="60" cy="60" rx="48" ry="17" fill="none" stroke="${T}" stroke-width="4" transform="rotate(120 60 60)"/>
<circle cx="108" cy="60" r="5.5" fill="${G}"/><circle cx="36" cy="18.5" r="5.5" fill="${W}"/><circle cx="36" cy="101.5" r="5.5" fill="${W}"/></g>
<circle cx="60" cy="60" r="11" fill="${G}"/><circle cx="56" cy="56" r="3.5" fill="${W}" opacity=".8"/>`,
"The Human Body":`<g class="a-beat" style="transform-origin:60px 62px"><path d="M60 100C30 80 14 62 14 44c0-14 10-24 23-24 10 0 18 6 23 15 5-9 13-15 23-15 13 0 23 10 23 24 0 18-16 36-46 56z" fill="${W}"/>
<path d="M60 100c20-13 34-26 40-40" fill="none" stroke="${S}" stroke-width="6" stroke-linecap="round"/><path d="M28 36c2-6 7-9 12-9" stroke="var(--l)" stroke-width="5" stroke-linecap="round" fill="none"/></g>
<path class="a-ecg" d="M6 64h28l6-12 8 26 8-34 7 30 5-10h46" fill="none" stroke="var(--c)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
"History":`<path d="M60 12l48 22H12z" fill="${W}"/><path d="M60 22l30 12H30z" fill="var(--c)" opacity=".4"/><rect x="14" y="34" width="92" height="7" fill="${W}"/><rect x="14" y="39" width="92" height="3" fill="${S}"/>
${[24,44,64,84].map(x=>`<rect x="${x}" y="44" width="12" height="46" fill="${W}"/><path d="M${x+4} 47v40M${x+8} 47v40" stroke="var(--c)" stroke-width="1.5" opacity=".35"/><rect x="${x-2}" y="44" width="16" height="4" fill="${W}"/>`).join("")}
<rect x="10" y="90" width="100" height="8" rx="1" fill="${W}"/><rect x="4" y="98" width="112" height="9" rx="1" fill="${W}"/><rect x="4" y="104" width="112" height="3" fill="${S}"/>`,
"Countries and Places":`<path d="M10 34l32-10v74l-32 10z" fill="${W}"/><path d="M42 24l36 10v74l-36-10z" fill="${T}"/><path d="M78 34l32-10v74l-32 10z" fill="${W}"/>
<path d="M20 90c10-6 18-26 30-22s16 18 28 10 18-30 26-36" fill="none" stroke="var(--c)" stroke-width="3.5" stroke-dasharray="6 6" stroke-linecap="round"/>
<g class="a-pin" style="transform-origin:86px 48px"><path d="M86 70c-10-14-16-22-16-30a16 16 0 0 1 32 0c0 8-6 16-16 30z" fill="${G}"/><circle cx="86" cy="40" r="6" fill="${W}"/></g>`,
"People":`<circle cx="30" cy="52" r="12" fill="${T}"/><path d="M8 100c0-16 10-28 22-28s22 12 22 28z" fill="${T}"/><circle cx="90" cy="52" r="12" fill="${T}"/><path d="M68 100c0-16 10-28 22-28s22 12 22 28z" fill="${T}"/>
<g class="a-bob"><circle cx="60" cy="42" r="16" fill="${W}"/><path d="M30 106c0-22 13-38 30-38s30 16 30 38z" fill="${W}"/><path d="M50 72l10 14 10-14" fill="var(--c)" opacity=".5"/></g>`,
"Arts and Culture":`<path d="M62 14c28 0 48 18 48 40 0 14-10 20-20 18-8-2-14 4-10 12 4 10-4 22-20 22-28 0-50-20-50-46S34 14 62 14z" fill="${W}"/><circle cx="74" cy="84" r="7" fill="var(--c)" opacity=".25"/>
<g class="a-dots"><circle cx="38" cy="44" r="8" fill="${G}"/><circle cx="58" cy="32" r="8" fill="#ff6fae"/><circle cx="82" cy="36" r="8" fill="#38d6f5"/><circle cx="36" cy="70" r="8" fill="var(--c)"/></g>
<g class="a-brush" style="transform-origin:96px 96px"><path d="M112 20L70 72l6 6 42-52z" fill="var(--l)"/><path d="M70 72c-6 2-10 8-10 14 6 0 12-4 14-10z" fill="var(--c)"/></g>`,
"Technology":gear(46,52,30,10,"a-g1")+gear(88,86,20,8,"a-g2"),
"Computers and Internet":`<rect x="18" y="22" width="84" height="56" rx="6" fill="${W}"/><rect x="24" y="28" width="72" height="44" rx="2" fill="var(--c)" opacity=".85"/>
<path d="M32 40h22M32 50h34M32 60h16" stroke="${W}" stroke-width="4" stroke-linecap="round" opacity=".9"/><path d="M60 40h12M72 60h14" stroke="${G}" stroke-width="4" stroke-linecap="round"/><rect class="a-cur" x="52" y="56" width="4" height="8" fill="${W}"/>
<path d="M8 82h104l-6 12H14z" fill="${W}"/><path d="M50 82h20l-2 4H52z" fill="${S}"/>`,
"How We Live":`<g class="a-smoke"><circle cx="40" cy="20" r="5" fill="${T}"/><circle cx="46" cy="10" r="4" fill="${T}" opacity=".7"/></g><rect x="36" y="26" width="8" height="16" fill="${W}"/>
<path d="M14 58l34-28 34 28z" fill="${W}"/><rect x="20" y="56" width="56" height="44" fill="${W}"/><rect x="20" y="56" width="56" height="5" fill="${S}"/><rect x="40" y="76" width="16" height="24" rx="2" fill="var(--c)" opacity=".7"/><rect x="26" y="66" width="10" height="10" rx="1" fill="${G}"/><rect x="60" y="66" width="10" height="10" rx="1" fill="${G}"/>
<path d="M74 72l20-16 20 16z" fill="${T}"/><rect x="78" y="70" width="32" height="30" fill="${T}"/><rect x="88" y="84" width="10" height="16" fill="var(--c)" opacity=".45"/><rect x="6" y="100" width="108" height="6" rx="3" fill="${W}"/>`,
"The Modern World":`<circle cx="60" cy="60" r="40" fill="${W}" opacity=".18"/><circle cx="60" cy="60" r="40" fill="none" stroke="${W}" stroke-width="3"/><ellipse cx="60" cy="60" rx="18" ry="40" fill="none" stroke="${W}" stroke-width="2.5" opacity=".8"/><path d="M20 60h80M26 40h68M26 80h68" stroke="${W}" stroke-width="2.5" opacity=".6"/>
<path d="M34 34L72 48 50 76 86 70" fill="none" stroke="${G}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${[[34,34],[72,48],[50,76],[86,70]].map(([x,y])=>`<circle class="a-node" cx="${x}" cy="${y}" r="5.5" fill="${G}" stroke="${W}" stroke-width="2"/>`).join("")}
<g class="a-orb" style="transform-origin:60px 60px"><circle cx="60" cy="10" r="5" fill="${W}"/></g>`};
window.subjArt=(c,cls="")=>ART[c]?`<svg class="sart ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${ART[c]}</svg>`:"";
const css=`.sart{display:block;overflow:visible}
.sart *{transform-box:view-box}
@keyframes a-spin{to{transform:rotate(360deg)}}@keyframes a-flap{50%{transform:scaleX(.72)}}@keyframes a-sway{50%{transform:rotate(-6deg)}}@keyframes a-tw{50%{opacity:.25}}
@keyframes a-ring{50%{transform:rotate(8deg)}}@keyframes a-fl{50%{transform:scaleY(.7)}}@keyframes a-beat{0%,40%,100%{transform:scale(1)}20%{transform:scale(1.1)}}@keyframes a-ecg{to{stroke-dashoffset:0}}
@keyframes a-pin{50%{transform:translateY(-8px)}}@keyframes a-bob{50%{transform:translateY(-4px)}}@keyframes a-cur{50%{opacity:0}}@keyframes a-smoke{0%{transform:translateY(6px);opacity:0}40%{opacity:1}100%{transform:translateY(-10px);opacity:0}}
@keyframes a-brush{50%{transform:rotate(-10deg)}}@keyframes a-node{50%{r:7.5}}
.sart .a-ecg{stroke-dasharray:200;stroke-dashoffset:0}
.sx-c:hover .sart .a-orb,.sx-c.on .sart .a-orb,.stile:hover .sart .a-orb,.opener .sart .a-orb{animation:a-spin 6s linear infinite}
.sx-c:hover .sart .a-spin,.sx-c.on .sart .a-spin,.stile:hover .sart .a-spin,.opener .sart .a-spin{animation:a-spin 9s linear infinite}
.sx-c:hover .sart .a-flap,.sx-c.on .sart .a-flap,.stile:hover .sart .a-flap,.opener .sart .a-flap{animation:a-flap 1.1s ease-in-out infinite}
.sx-c:hover .sart .a-sway,.sx-c.on .sart .a-sway,.stile:hover .sart .a-sway,.opener .sart .a-sway{animation:a-sway 3s ease-in-out infinite}
.sx-c:hover .sart .a-tw,.sx-c.on .sart .a-tw,.opener .sart .a-tw{animation:a-tw 1.6s ease-in-out infinite}
.sx-c:hover .sart .a-ring,.sx-c.on .sart .a-ring,.stile:hover .sart .a-ring,.opener .sart .a-ring{animation:a-ring 3s ease-in-out infinite}
.sx-c:hover .sart .a-fl,.sx-c.on .sart .a-fl,.stile:hover .sart .a-fl,.opener .sart .a-fl{animation:a-fl .25s ease-in-out infinite}
.sx-c:hover .sart .a-beat,.sx-c.on .sart .a-beat,.stile:hover .sart .a-beat,.opener .sart .a-beat{animation:a-beat 1.1s ease-in-out infinite}
.sx-c:hover .sart .a-ecg,.sx-c.on .sart .a-ecg,.opener .sart .a-ecg{stroke-dashoffset:200;animation:a-ecg 1.4s linear infinite}
.sx-c:hover .sart .a-pin,.sx-c.on .sart .a-pin,.stile:hover .sart .a-pin,.opener .sart .a-pin{animation:a-pin 1s ease-in-out infinite}
.sx-c:hover .sart .a-bob,.sx-c.on .sart .a-bob,.stile:hover .sart .a-bob,.opener .sart .a-bob{animation:a-bob 1.6s ease-in-out infinite}
.sart .a-cur{animation:a-cur 1s steps(1) infinite}
.sx-c:hover .sart .a-g1,.sx-c.on .sart .a-g1,.stile:hover .sart .a-g1,.opener .sart .a-g1{animation:a-spin 6s linear infinite}
.sx-c:hover .sart .a-g2,.sx-c.on .sart .a-g2,.stile:hover .sart .a-g2,.opener .sart .a-g2{animation:a-spin 4.5s linear infinite reverse}
.sx-c:hover .sart .a-smoke,.sx-c.on .sart .a-smoke,.stile:hover .sart .a-smoke,.opener .sart .a-smoke{animation:a-smoke 2.2s ease-out infinite}
.sx-c:hover .sart .a-brush,.sx-c.on .sart .a-brush,.stile:hover .sart .a-brush,.opener .sart .a-brush{animation:a-brush 1.4s ease-in-out infinite}
.sx-c:hover .sart .a-node,.sx-c.on .sart .a-node,.opener .sart .a-node{animation:a-node 1.4s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.sart *{animation:none!important}}
.opener .big-ic.svg{right:20px;bottom:50%;transform:translateY(50%);width:min(240px,34%);opacity:.9;font-size:0;filter:drop-shadow(0 18px 30px rgba(0,0,0,.25))}
.opener .op-ph{position:absolute;inset:0;z-index:0;pointer-events:none}.opener .op-ph .ban{position:absolute!important;inset:0;height:100%!important;font-size:0!important;color:transparent!important;background:none!important;margin:0!important}.opener .op-ph img{width:100%;height:100%;object-fit:cover;opacity:.0;transition:opacity .6s}
.opener .op-ph img.ld{opacity:.42}.opener .op-ph:after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,var(--cc) 30%,color-mix(in srgb,var(--cc) 55%,transparent) 70%,transparent)}
.opener>*:not(.op-ph):not(.big-ic){position:relative;z-index:1}.opener .big-ic{z-index:1}
@media (max-width:640px){.opener .big-ic.svg{width:110px;right:10px;top:12px;bottom:auto;transform:none;opacity:.3}}
.stile .st-i.svg{display:block;width:46px;height:46px;font-size:0;filter:drop-shadow(0 6px 10px rgba(0,0,0,.3))}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
const oc=R.cat;R.cat=function(x){oc(x);const op=V.querySelector(".opener");if(!op)return;const c=(V.querySelector(".opener h2")||{}).textContent;if(!ART[c])return;
const bi=op.querySelector(".big-ic");if(bi){bi.classList.add("svg");bi.style.setProperty("--c",CAT[c][0]);bi.style.setProperty("--l",CAT[c][1]);bi.innerHTML=subjArt(c)}
const S=(window.SUBJ||{})[c],f=S&&(S.feat||[]).map(get).find(a=>a);if(f&&!op.querySelector(".op-ph")){op.insertAdjacentHTML("afterbegin",`<div class="op-ph" aria-hidden="true">${ban(f)}</div>`);want([f])}};
})();
