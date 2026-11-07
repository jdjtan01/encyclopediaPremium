// Diagrams for starfish, squid, scorpions, bat echolocation, natural selection, fungi, bacteria and the coconut.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const star=(cx,cy,R,r)=>{let p="";for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:R;p+=`${i?"L":"M"}${(cx+rr*Math.cos(a)).toFixed(1)},${(cy+rr*Math.sin(a)).toFixed(1)}`;}return p+"z";};

/* Starfish */
D.echinoderms={t:"Body plan of a starfish",c:"A starfish has five arms arranged around a central disc. Its mouth is on the underside, and rows of tiny tube feet, powered by a water-filled canal system, let it crawl and grip shells. A simple eyespot at the tip of each arm senses light.",
svg:S(`<path d="${star(80,175,145,48)}" fill="#fb923c" stroke="#c2410c" stroke-width="3" stroke-linejoin="round"/>
<circle cx="80" cy="175" r="38" fill="#fdba74" stroke="#c2410c" stroke-width="2"/><circle cx="80" cy="175" r="8" fill="#7c2d12"/>
${[0,1,2,3,4].map(i=>{const a=-Math.PI/2+i*2*Math.PI/5;return `<circle cx="${(80+138*Math.cos(a)).toFixed(1)}" cy="${(175+138*Math.sin(a)).toFixed(1)}" r="5" fill="#dc2626"/>`}).join("")}
<g transform="translate(470,170)"><path d="M-110,0 A110,80 0 0,1 110,0z" fill="#fb923c" stroke="#c2410c" stroke-width="3"/>
<circle cx="0" cy="-30" r="14" fill="#7dd3fc" stroke="#0369a1" stroke-width="2"/>
${[-80,-50,-20,10,40,70].map(x=>`<path d="M${x},0 v26" stroke="#c2410c" stroke-width="7" stroke-linecap="round"/><ellipse cx="${x}" cy="32" rx="7" ry="5" fill="#fde68a" stroke="#a16207"/>`).join("")}
${T(0,-95,"Cross-section of one arm","middle","font-weight:700")}</g>
${L(80,175,-40,330,"Mouth on the underside","middle")}${L(80,37,190,20,"Eyespot senses light")}${L(150,180,250,250,"Central disc")}${L(470,140,650,90,"Water canal")}${L(510,202,620,250,"Tube feet")}`,340)};

/* Squid */
D.squid={t:"The body of a squid",c:"A squid’s long body, the mantle, holds its organs and three hearts. It swims by squirting water out of a funnel, steering with fins. Eight arms and two longer tentacles with suckers grab prey and pass it to a sharp beak. Large eyes see well in dim water, and an ink sac can release a cloud to escape predators.",
svg:S(`${arrow("sq","#2563eb")}
<path d="M560,170 C520,100 300,110 200,140 L160,150 L160,190 L200,200 C300,230 520,240 560,170z" fill="#fda4af" stroke="#be123c" stroke-width="3"/>
<path d="M560,170 L640,110 L610,170 L640,230z" fill="#fb7185" stroke="#be123c" stroke-width="2"/>
<ellipse cx="135" cy="170" rx="35" ry="32" fill="#fecdd3" stroke="#be123c" stroke-width="2"/>
<circle cx="135" cy="160" r="15" fill="#fff" stroke="#0f172a" stroke-width="2"/><circle cx="133" cy="160" r="8" fill="#0f172a"/>
<g stroke="#be123c" stroke-width="7" fill="none" stroke-linecap="round">${[-24,-14,-5,5,14,24].map(d=>`<path d="M105,${170+d} Q40,${170+d*2.2} -20,${170+d*3}"/>`).join("")}</g>
<g stroke="#be123c" stroke-width="4" fill="none"><path d="M105,165 Q0,120 -140,110"/><path d="M105,175 Q0,220 -140,235"/></g>
<ellipse cx="-140" cy="110" rx="18" ry="9" fill="#fb7185"/><ellipse cx="-140" cy="235" rx="18" ry="9" fill="#fb7185"/>
<path d="M175,200 q10,20 -10,32" stroke="#9f1239" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M150,240 h-90" stroke="#2563eb" stroke-width="4" marker-end="url(#sq)"/>${T(105,262,"Water jet","middle")}
<ellipse cx="300" cy="175" rx="30" ry="16" fill="#1e293b"/>
<circle cx="380" cy="170" r="10" fill="#dc2626"/><circle cx="410" cy="160" r="8" fill="#dc2626"/><circle cx="410" cy="182" r="8" fill="#dc2626"/>
${L(620,140,690,80,"Fins steer")}${L(450,140,470,60,"Mantle: main body")}${L(395,172,520,300,"Three hearts")}${L(300,175,340,300,"Ink sac","middle")}${L(140,160,160,50,"Large eye","middle")}${L(178,222,200,300,"Funnel","middle")}${L(-60,200,-120,300,"Eight arms","middle")}${L(-140,110,-70,40,"Two long tentacles","middle")}`,330)};

/* Scorpion */
D.scorpions={t:"The body of a scorpion",c:"A scorpion is an arachnid with eight walking legs, a pair of large pincers for grabbing prey, and a long segmented tail that curves over its back. The tail ends in a bulb containing venom glands and a sharp stinger.",
svg:S(`<g fill="#a16207" stroke="#713f12" stroke-width="2">
<ellipse cx="160" cy="220" rx="50" ry="40"/>
${[0,1,2,3,4,5].map(i=>`<ellipse cx="${230+i*0}" cy="0" rx="0" ry="0"/>`).join("")}
<ellipse cx="240" cy="220" rx="40" ry="34"/><ellipse cx="300" cy="215" rx="30" ry="28"/>
${[[345,200],[380,170],[400,130],[405,90],[390,55]].map((p,i)=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${20-i}" ry="${16-i}"/>`).join("")}
<path d="M370,40 q-10,-25 -35,-20 q15,10 15,30z"/>
</g>
<path d="M335,22 l-18,8" stroke="#713f12" stroke-width="4" stroke-linecap="round"/>
<g stroke="#713f12" stroke-width="5" fill="none" stroke-linecap="round">${[0,1,2,3].map(i=>`<path d="M${150+i*30},250 l-25,45 l-10,15"/><path d="M${150+i*30},190 l-25,-45 l-10,-15"/>`).join("")}</g>
<g fill="#ca8a04" stroke="#713f12" stroke-width="2"><path d="M115,205 L40,160 L-10,150 q-40,-5 -50,15 q25,-5 40,5 q-20,15 -5,25 q15,-10 30,-10z"/><path d="M115,235 L40,280 L-10,290 q-40,5 -50,-15 q25,5 40,-5 q-20,-15 -5,-25 q15,10 30,10z"/></g>
<circle cx="135" cy="212" r="4" fill="#0f172a"/><circle cx="135" cy="228" r="4" fill="#0f172a"/>
${L(-30,160,-60,60,"Pincers grab prey","middle")}${L(170,150,200,40,"Eight walking legs","middle")}${L(395,90,520,100,"Segmented tail")}${L(355,35,520,30,"Stinger with venom glands")}${L(135,212,40,330,"Eyes","middle")}`,340)};

/* Bat echolocation */
D.bat={t:"How bats find food with echolocation",c:"Many bats hunt in the dark by making high-pitched calls, mostly too high for humans to hear. The sound bounces off insects and objects, and the bat listens to the echoes to work out where its prey is, how big it is and how fast it is moving.",
svg:S(`<path d="M30,170 q-60,-70 -150,-40 q50,20 40,50 q40,-20 60,10 q20,-30 50,-20z" fill="#475569" stroke="#1e293b" stroke-width="2"/>
<path d="M50,170 q60,-70 150,-40 q-50,20 -40,50 q-40,-20 -60,10 q-20,-30 -50,-20z" fill="#475569" stroke="#1e293b" stroke-width="2" transform="translate(-20,0)"/>
<ellipse cx="30" cy="175" rx="22" ry="28" fill="#334155"/><path d="M20,150 l-6,-18 l12,10z M40,150 l6,-18 l-12,10z" fill="#334155"/>
<g fill="none" stroke="#f97316" stroke-width="4">${[60,100,140,180].map(r=>`<path d="M${60+r*0.4},${175-r*0.55} A${r},${r} 0 0,1 ${60+r*0.4},${175+r*0.55}" />`).join("")}</g>
<g fill="none" stroke="#2563eb" stroke-width="3" stroke-dasharray="6 5">${[50,90,130].map(r=>`<path d="M${520-r*0.4},${165-r*0.5} A${r},${r} 0 0,0 ${520-r*0.4},${165+r*0.5}"/>`).join("")}</g>
<g transform="translate(540,165)"><ellipse rx="14" ry="8" fill="#a16207"/><ellipse cx="-4" cy="-12" rx="16" ry="9" fill="#fde68a" stroke="#a16207" transform="rotate(-20)"/><ellipse cx="-4" cy="12" rx="16" ry="9" fill="#fde68a" stroke="#a16207" transform="rotate(20)"/></g>
${L(180,80,200,30,"Bat sends out high-pitched calls","middle")}${L(470,200,430,300,"Echoes bounce back","middle")}${L(550,160,650,100,"Moth")}${L(30,145,-60,40,"Large ears catch the echoes","middle")}`,330)};

/* Natural selection */
{const bug=(x,y,c)=>`<g transform="translate(${x},${y})"><ellipse rx="12" ry="16" fill="${c}" stroke="#0f172a" stroke-width="1.5"/><line x1="0" y1="-16" x2="0" y2="16" stroke="#0f172a"/></g>`;
const panel=(x,title,bugs)=>`<rect x="${x}" y="50" width="210" height="210" rx="10" fill="#d6c3a5" stroke="#78716c" stroke-width="2"/>${T(x+105,35,title,"middle","font-weight:700")}${bugs.map(b=>bug(x+b[0],50+b[1],b[2]?"#65a30d":"#78350f")).join("")}`;
const G=1,B=0;
D.evo={t:"Natural selection in action",c:"Beetles vary in color. On brown soil, birds spot and eat more green beetles, so brown beetles are more likely to survive and pass on their color. Over many generations, most beetles become brown. This is natural selection, the process Darwin described.",
svg:S(`${arrow("ns","#64748b")}
${panel(-160,"1. Variation",[[40,40,G],[100,60,B],[170,40,G],[60,120,B],[130,130,G],[190,120,B],[50,180,G],[150,180,B]])}
${panel(80,"2. Birds eat green beetles",[[100,60,B],[60,120,B],[190,120,B],[150,180,B],[130,130,G]])}
${panel(320,"3. Survivors reproduce",[[40,40,B],[100,60,B],[170,40,B],[60,120,B],[130,130,G],[190,120,B],[50,180,B],[150,180,B]])}
${panel(560,"4. Brown beetles common",[[40,40,B],[100,60,B],[170,40,B],[60,120,B],[130,130,B],[190,120,B],[50,180,B],[150,180,B],[110,95,B]])}

${T(310,300,"Over many generations, the population changes","middle")}`,320)};}

/* Fungi */
D.fungi={t:"A mushroom and its hidden network",c:"The mushroom we see is only the fruiting body of a fungus, which releases spores from gills under its cap. Most of the fungus lives underground as a web of thin threads called mycelium, which absorbs food and often links with tree roots, trading nutrients for sugars.",
svg:S(`<rect x="-160" y="190" width="950" height="150" fill="#a8a29e" opacity=".5"/><line x1="-160" y1="190" x2="790" y2="190" stroke="#57534e" stroke-width="3"/>
<path d="M60,190 v-90" stroke="#f5f5f4" stroke-width="26"/><path d="M-30,105 Q60,10 150,105z" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
<g stroke="#fecaca" stroke-width="2">${[-15,0,15,30,45,60,75,90,105,120,135].map(x=>`<line x1="${x-5}" y1="105" x2="${x+5}" y2="115"/>`).join("")}</g>
<g fill="#fff" opacity=".9">${[[20,60],[40,40],[90,30],[130,55],[110,15]].map(p=>`<circle cx="${p[0]+120}" cy="${p[1]+60}" r="3"/>`).join("")}</g>
${[20,60,90].map(x=>`<circle cx="${x+30}" cy="70" r="6" fill="#fff"/>`).join("")}
<g stroke="#fef3c7" stroke-width="2" fill="none">${Array.from({length:22},(_,i)=>`<path d="M60,190 q${-200+i*20},${40+(i%5)*12} ${-240+i*30},${90+(i%4)*15}"/>`).join("")}</g>
<path d="M480,190 v-160" stroke="#78350f" stroke-width="30"/><ellipse cx="480" cy="40" rx="90" ry="40" fill="#16a34a"/>
<g stroke="#78350f" stroke-width="5" fill="none"><path d="M480,190 q-30,60 -100,90"/><path d="M480,190 q30,60 100,100"/><path d="M480,190 q-5,70 -10,120"/></g>
${L(60,60,-60,30,"Cap","middle")}${L(110,110,250,120,"Gills release spores")}${L(60,160,-90,160,"Stalk","middle")}${L(-50,260,-50,320,"Mycelium: a web of threads","middle")}${L(400,265,600,320,"Threads link with tree roots")}`,340)};

/* Bacterium */
D.microbe={t:"Inside a bacterium",c:"Bacteria are single cells with no nucleus. Their DNA floats in the cytoplasm, and many carry small extra rings of DNA called plasmids. A tough cell wall protects them, and many swim using a whip-like flagellum. Tiny ribosomes build proteins.",
svg:S(`<rect x="-60" y="80" width="460" height="180" rx="90" fill="#bbf7d0" stroke="#15803d" stroke-width="8"/>
<rect x="-50" y="90" width="440" height="160" rx="80" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
<path d="M60,150 q30,-30 60,0 t60,0 t60,0 q20,40 -30,50 q-60,10 -120,-10 q-50,-15 -30,-40" fill="none" stroke="#7c3aed" stroke-width="4"/>
<circle cx="300" cy="200" r="18" fill="none" stroke="#db2777" stroke-width="4"/>
<g fill="#334155">${[[20,120],[40,210],[230,110],[260,150],[330,130],[100,225],[180,230],[350,190],[-10,170]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4"/>`).join("")}</g>
<path d="M400,170 q40,-40 80,0 t80,0 t80,0" stroke="#15803d" stroke-width="4" fill="none"/>
<g stroke="#15803d" stroke-width="3">${[0,60,120,200,280].map(x=>`<line x1="${x}" y1="80" x2="${x-5}" y2="60"/>`).join("")}</g>
${L(-30,100,-100,40,"Cell wall","middle")}${L(-40,150,-120,200,"Cell membrane","middle")}${L(150,150,170,30,"DNA, with no nucleus","middle")}${L(300,200,460,270,"Plasmid: extra ring of DNA")}${L(260,150,460,110,"Ribosomes make proteins")}${L(560,170,620,230,"Flagellum for swimming","middle")}${L(120,62,290,25,"Pili help it stick")}`,330)};

/* Coconut */
D.coconut={t:"Inside a coconut",c:"A coconut is a drupe, not a true nut. Under its smooth skin is a thick fibrous husk, used for coir rope and mats, which also helps it float. Inside the hard shell is the white meat and coconut water. A sprout pushes out through one of the three eyes at one end.",
svg:S(`<ellipse cx="140" cy="170" rx="200" ry="150" fill="#65a30d" stroke="#3f6212" stroke-width="3"/>
<ellipse cx="140" cy="170" rx="188" ry="138" fill="#d6b88a"/>
<g stroke="#a16207" stroke-width="1.5" opacity=".6">${Array.from({length:30},(_,i)=>{const a=i*12*Math.PI/180;return `<line x1="${(140+105*Math.cos(a)).toFixed(0)}" y1="${(170+85*Math.sin(a)).toFixed(0)}" x2="${(140+180*Math.cos(a)).toFixed(0)}" y2="${(170+130*Math.sin(a)).toFixed(0)}"/>`}).join("")}</g>
<ellipse cx="140" cy="170" rx="105" ry="85" fill="#78350f"/>
<ellipse cx="140" cy="170" rx="94" ry="74" fill="#f8fafc"/>
<ellipse cx="140" cy="170" rx="74" ry="56" fill="#e0f2fe"/>
<g fill="#1c1917"><circle cx="30" cy="155" r="6"/><circle cx="30" cy="180" r="6"/><circle cx="48" cy="168" r="6"/></g>
${L(300,80,460,40,"Smooth outer skin")}${L(290,170,460,110,"Fibrous husk: coir, helps it float")}${L(240,190,460,180,"Hard shell")}${L(220,215,460,240,"White meat")}${L(140,170,460,300,"Coconut water")}${L(30,168,-60,300,"Three eyes, for the sprout","middle")}`,340)};

Object.assign(window.DIAG,D);
})();
