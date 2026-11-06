// Diagrams for reflexes, fiber optics, quarks, sinkholes, glaciers, landslides, polymers and sea level rise.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Reflex arc */
D.reflexes={t:"The reflex arc",c:"When your hand touches something hot, a sensory nerve carries the signal to the spinal cord. There it passes through a connecting nerve cell straight to a motor nerve, which makes the arm muscle pull the hand away. The message reaches the brain a moment later, which is why you feel the pain after you have already moved.",
svg:S(`${arrow("rfs","#2563eb")}${arrow("rfm","#dc2626")}${arrow("rfb","#64748b")}
<path d="M-150,120 q10,-40 22,-10 q8,-30 18,0 q12,-25 16,8 q4,30 -20,42 q-30,8 -36,-40z" fill="#fb923c" stroke="#c2410c" stroke-width="2"/><rect x="-140" y="150" width="34" height="60" rx="4" fill="#fde68a" stroke="#a16207"/>
<path d="M-90,190 q30,-30 70,-20 l60,6 q20,4 18,20 l-80,10 q-50,4 -68,-16z" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/>
<path d="M40,230 q120,40 240,10" stroke="#b45309" stroke-width="22" fill="none" stroke-linecap="round" opacity=".55"/>
<ellipse cx="170" cy="245" rx="70" ry="22" fill="#f87171" stroke="#991b1b" stroke-width="2"/>
<circle cx="560" cy="170" r="80" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
<path d="M520,120 q40,30 0,50 q-20,20 20,50 M600,120 q-40,30 0,50 q20,20 -20,50 M520,170 h80" stroke="#94a3b8" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M-30,180 C100,60 380,60 530,125" stroke="#2563eb" stroke-width="4" fill="none" marker-end="url(#rfs)"/>
<path d="M540,150 q20,10 25,30" stroke="#7c3aed" stroke-width="4" fill="none"/>
<path d="M570,210 C460,300 300,290 215,255" stroke="#dc2626" stroke-width="4" fill="none" marker-end="url(#rfm)"/>
<line x1="560" y1="90" x2="560" y2="30" stroke="#64748b" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#rfb)"/>
${L(-120,120,-60,60,"Heat")}${L(-40,190,-60,300,"Sensors in the skin","middle")}${L(250,75,250,40,"1. Sensory nerve carries the signal in","middle")}${L(565,180,690,160,"2. Spinal cord")}${L(170,245,170,320,"4. Muscle contracts, hand pulls away","middle")}${L(450,270,560,320,"3. Motor nerve carries the signal out","middle")}${L(560,40,520,22,"Brain gets the message later")}`,335)};

/* Fiber optics */
D.fiberoptics={t:"How an optical fiber carries light",c:"An optical fiber has a glass core surrounded by cladding. Light entering the core at a shallow angle strikes the boundary and reflects back inside, bouncing all the way along the fiber. This total internal reflection lets flashes of laser light carry data for many kilometers, even around gentle bends.",
svg:S(`${arrow("fo","#f59e0b")}
<rect x="-150" y="110" width="110" height="100" rx="10" fill="#fee2e2" stroke="#b91c1c" stroke-width="2"/>${T(-95,165,"Laser","middle","font-weight:700;"+K)}
<rect x="660" y="110" width="120" height="100" rx="10" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>${T(720,165,"Detector","middle","font-weight:700;"+K)}
<rect x="-40" y="100" width="700" height="120" rx="20" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
<rect x="-40" y="120" width="700" height="80" fill="#bfdbfe" stroke="#1e40af" stroke-width="1.5"/>
<rect x="-40" y="140" width="700" height="40" fill="#fef9c3" stroke="#a16207" stroke-width="1.5"/>
<path d="M-40,160 L40,140 L130,180 L220,140 L310,180 L400,140 L490,180 L580,140 L655,160" stroke="#f59e0b" stroke-width="4" fill="none" marker-end="url(#fo)"/>
<g fill="#f59e0b">${[40,220,400,580].map(x=>`<circle cx="${x}" cy="140" r="5"/>`).join("")}${[130,310,490].map(x=>`<circle cx="${x}" cy="180" r="5"/>`).join("")}</g>
<path d="M220,140 l-30,-30" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
${L(60,160,-20,262,"Core: very pure glass","middle")}${L(300,128,300,70,"Cladding keeps the light inside","middle")}${L(500,104,560,40,"Protective coating")}${L(220,140,230,270,"Light reflects off the boundary","middle")}${L(400,140,490,270,"Total internal reflection","middle")}${L(190,110,-20,60,"Light that would escape is reflected back","middle")}`,300)};

/* Quarks */
const qk=(x,y,t,f)=>`<circle cx="${x}" cy="${y}" r="26" fill="${f}" stroke="#1f2937" stroke-width="2"/>${T(x,y+6,t,"middle","font-weight:800;font-size:17px;"+K)}`;
const glu=(x1,y1,x2,y2)=>{const n=8,dx=(x2-x1)/n,dy=(y2-y1)/n,len=Math.hypot(x2-x1,y2-y1),px=-(y2-y1)/len*7,py=(x2-x1)/len*7;let d=`M${x1},${y1}`;for(let i=1;i<=n;i++){const s=i%2?1:-1;d+=` Q${x1+dx*(i-.5)+px*s},${y1+dy*(i-.5)+py*s} ${x1+dx*i},${y1+dy*i}`}return `<path d="${d}" stroke="#16a34a" stroke-width="3" fill="none"/>`};
D.quarks={t:"Quarks inside protons and neutrons",c:"A proton is made of two up quarks and one down quark, giving a total charge of +1. A neutron has one up quark and two down quarks, so its charges add up to zero. The quarks are held together by the strong force, carried by particles called gluons, shown here as springs.",
svg:S(`<circle cx="120" cy="170" r="120" fill="#fecaca" fill-opacity=".55" stroke="#b91c1c" stroke-width="3"/>
<circle cx="520" cy="170" r="120" fill="#e2e8f0" fill-opacity=".7" stroke="#475569" stroke-width="3"/>
${glu(80,120,160,120)}${glu(80,120,120,220)}${glu(160,120,120,220)}${glu(480,120,560,120)}${glu(480,120,520,220)}${glu(560,120,520,220)}
${qk(80,120,"u","#fca5a5")}${qk(160,120,"u","#fca5a5")}${qk(120,220,"d","#93c5fd")}
${qk(480,120,"u","#fca5a5")}${qk(560,120,"d","#93c5fd")}${qk(520,220,"d","#93c5fd")}
${T(120,30,"Proton","middle","font-weight:800;font-size:16px")}${T(520,30,"Neutron","middle","font-weight:800;font-size:16px")}
${T(120,318,"+⅔ +⅔ −⅓ = +1","middle","font-weight:700")}${T(520,318,"+⅔ −⅓ −⅓ = 0","middle","font-weight:700")}
${L(56,110,-90,40,"Up quark: charge +⅔","middle")}${L(110,240,-80,290,"Down quark: charge −⅓","middle")}${L(540,172,690,250,"Gluons hold quarks together","middle")}`,330)};

/* Sinkhole formation */
const panel=(x,stage)=>{const cav=stage==1?`<ellipse cx="${x+100}" cy="215" rx="30" ry="14" fill="#1e293b"/>`:stage==2?`<ellipse cx="${x+100}" cy="200" rx="62" ry="32" fill="#1e293b"/>`:`<path d="M${x+40},70 L${x+60},180 Q${x+100},240 ${x+140},180 L${x+160},70 Z" fill="#1e293b"/>`;
const top=stage==2?`<path d="M${x},110 H${x+60} Q${x+100},128 ${x+140},110 H${x+200}" stroke="#78350f" stroke-width="3" fill="none"/>`:"";
return `<rect x="${x}" y="70" width="200" height="40" fill="#b45309" fill-opacity=".75"/><rect x="${x}" y="110" width="200" height="160" fill="#cbd5e1"/>${cav}${top}
<g stroke="#94a3b8" stroke-width="1.5">${[150,190,230].map(y=>`<line x1="${x}" y1="${y}" x2="${x+200}" y2="${y}"/>`).join("")}</g>
<rect x="${x}" y="70" width="200" height="200" fill="none" stroke="#475569" stroke-width="2"/>`};
D.sinkholes={t:"How a sinkhole forms",c:"Rainwater, made slightly acidic by carbon dioxide, seeps through cracks and slowly dissolves limestone, creating an underground hollow. Over time the hollow grows and the ground above begins to sag. When the roof can no longer hold its own weight, it collapses suddenly, opening a sinkhole.",
svg:S(`${arrow("sk","#2563eb")}
${panel(-150,1)}${panel(160,2)}${panel(470,3)}
<path d="M470,70 H510 L530,110 M670,70 H630 L610,110" stroke="#b45309" stroke-width="3" fill="none"/>
<g stroke="#2563eb" stroke-width="2.5" marker-end="url(#sk)">${[-110,-50,10].map(x=>`<line x1="${x}" y1="30" x2="${x+20}" y2="95"/>`).join("")}</g>
<path d="M-60,110 q10,40 0,70 q-5,20 10,30" stroke="#2563eb" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
${T(-50,295,"1. Water dissolves limestone","middle","font-weight:700")}${T(260,295,"2. The hollow grows, ground sags","middle","font-weight:700")}${T(570,295,"3. The roof collapses","middle","font-weight:700")}
${L(-150,90,-150,55,"Soil","start")}${L(-140,250,-140,320,"Limestone","start")}${L(260,200,260,325,"Underground hollow","middle")}${L(570,160,690,40,"Sinkhole")}${L(-30,40,30,15,"Slightly acidic rain")}`,335)};

/* Glacier */
D.glaciers={t:"Parts of a mountain glacier",c:"Snow builds up in the high accumulation zone and is pressed into ice. The ice slowly flows downhill under its own weight. Lower down, in the ablation zone, more ice melts than is added. Where the two balance is the equilibrium line. Cracks called crevasses open where the ice bends, and rock carried by the glacier is dropped as moraines.",
svg:S(`${arrow("gl","#1d4ed8")}
<path d="M-170,20 L40,40 L250,120 L480,210 L640,260 L790,280 L790,330 L-170,330 Z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>
<path d="M-140,26 L40,44 L250,124 L480,214 L560,238 Q520,250 470,238 L240,150 L40,74 L-140,52 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
<path d="M-140,26 L40,44 L120,74 L40,74 L-140,52 Z" fill="#f8fafc"/>
<line x1="250" y1="110" x2="250" y2="160" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 4"/>
<g stroke="#0369a1" stroke-width="2">${[300,340,380].map(x=>`<path d="M${x},${150+(x-300)*.4} l8,22 l8,-22"/>`).join("")}</g>
<path d="M560,240 q20,-8 40,0 q15,10 30,2" fill="#78716c" stroke="#44403c" stroke-width="2"/>
<path d="M600,250 q60,20 110,10 q40,-6 80,8" stroke="#3b82f6" stroke-width="5" fill="none"/>
<line x1="60" y1="56" x2="200" y2="108" stroke="#1d4ed8" stroke-width="3" marker-end="url(#gl)"/><line x1="300" y1="160" x2="440" y2="214" stroke="#1d4ed8" stroke-width="3" marker-end="url(#gl)"/>
<g fill="#f8fafc">${[[-110,10],[-60,6],[0,14],[-20,0]].map(([x,y])=>`<circle cx="${x}" cy="${y+10}" r="3"/>`).join("")}</g>
${L(-60,40,-60,110,"Accumulation zone: snow builds up","middle")}${L(250,135,170,210,"Equilibrium line","middle")}${L(420,200,420,140,"Ablation zone: ice melts","middle")}${L(340,168,300,260,"Crevasses","middle")}${L(600,245,620,195,"Terminal moraine","middle")}${L(700,262,700,310,"Meltwater stream","middle")}${L(130,80,150,40,"Ice flows downhill")}`,330)};

/* Landslide */
D.landslides={t:"What makes a slope fail",c:"Gravity is always pulling soil and rock downhill. Heavy rain soaks the ground, adding weight and making it slippery. Removing trees weakens the soil, a river or road cut can remove support at the base, and earthquakes can shake a slope loose. When the forces pulling down exceed the strength holding the slope, it slides.",
svg:S(`${arrow("ls","#475569")}${arrow("lr","#2563eb")}
<path d="M-170,60 L160,60 L560,300 L790,300 L790,330 L-170,330 Z" fill="#a16207" fill-opacity=".55" stroke="#78350f" stroke-width="2"/>
<path d="M160,60 Q300,90 330,180 Q360,240 470,260 L560,300 Z" fill="#92400e" fill-opacity=".8" stroke="#78350f" stroke-width="2"/>
<path d="M150,60 l10,-6 l8,10 l10,-8" stroke="#1f2937" stroke-width="2.5" fill="none"/>
<g fill="#16a34a">${[-130,-80,-30,20,70,120].map(x=>`<circle cx="${x}" cy="45" r="14"/><rect x="${x-2}" y="50" width="4" height="12" fill="#78350f"/>`).join("")}</g>
<g stroke="#78350f" stroke-width="3">${[200,250,300].map((x,i)=>`<line x1="${x}" y1="${76+i*28}" x2="${x+6}" y2="${70+i*28}"/>`).join("")}</g>
<path d="M600,300 q60,-14 190,0 V315 H600Z" fill="#3b82f6"/>
<rect x="640" y="268" width="40" height="32" fill="#e5e7eb" stroke="#475569"/><path d="M636,268 l24,-18 l24,18z" fill="#dc2626"/>
<g stroke="#2563eb" stroke-width="2">${[230,280,330,380,430].map(x=>`<line x1="${x}" y1="10" x2="${x-8}" y2="34"/>`).join("")}</g>
<line x1="330" y1="150" x2="450" y2="230" stroke="#475569" stroke-width="4" marker-end="url(#ls)"/>
${L(330,22,470,20,"Heavy rain soaks the ground")}${L(160,58,120,110,"Cracks open at the top","middle")}${L(-30,45,-30,140,"Tree roots hold soil in place","middle")}${L(390,190,560,150,"Sliding mass moves downhill")}${L(660,262,640,200,"Homes below are at risk","middle")}${T(700,325,"River wears away the base","middle","font-weight:700;"+K)}${L(220,200,140,260,"Gravity pulls downward","middle")}`,335)};

/* Polymers */
const bead=(x,y,f)=>`<circle cx="${x}" cy="${y}" r="16" fill="${f}" stroke="#334155" stroke-width="2"/>`;
D.polymers={t:"From monomers to a polymer",c:"A polymer forms when many small molecules called monomers link together in a chemical reaction called polymerization, making a long chain. For example, many ethylene molecules join to make polyethylene, used in plastic bags. Natural polymers such as starch, proteins and DNA are built the same way from their own monomers.",
svg:S(`${arrow("pm","#475569")}
${[[-130,90],[-70,60],[-100,150],[-30,120],[-140,210],[-60,200],[0,60],[-10,190]].map(([x,y])=>bead(x,y,"#93c5fd")).join("")}
<line x1="40" y1="140" x2="140" y2="140" stroke="#475569" stroke-width="4" marker-end="url(#pm)"/>
${T(90,125,"Polymerization","middle","font-weight:700")}
<path d="M180,140 ${Array.from({length:14},(_,i)=>`L${180+i*42},${140+(i%2?-24:24)}`).join(" ")}" stroke="#475569" stroke-width="5" fill="none"/>
${Array.from({length:14},(_,i)=>bead(180+i*42,140+(i%2?-24:24),"#93c5fd")).join("")}
${[["Ethylene","Polyethylene (bags, bottles)"],["Glucose","Starch and cellulose"],["Amino acids","Proteins"],["Nucleotides","DNA"]].map(([m,p],i)=>`<rect x="${-150+i*235}" y="230" width="215" height="70" rx="10" fill="#f1f5f9" stroke="#94a3b8"/>${T(-42+i*235,258,m,"middle","font-weight:800;"+K)}${T(-42+i*235,282,"→ "+p,"middle","font-size:12px;"+K)}`).join("")}
${L(-70,60,-70,20,"Monomers: small single units","middle")}${L(476,116,520,40,"Polymer: a long chain of linked units")}`,315)};

/* Sea level rise */
D.sealevel={t:"Why sea level is rising",c:"Two main processes raise sea level as the planet warms. Water from melting glaciers and ice sheets on land flows into the ocean, adding to its volume. And seawater expands as it warms, taking up more space. Melting sea ice, which already floats, adds very little.",
svg:S(`${arrow("sl","#dc2626")}${arrow("sw","#2563eb")}
<path d="M-170,120 L60,120 L180,200 L180,330 L-170,330 Z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>
<path d="M-150,120 L40,120 L60,105 L-130,90 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
<rect x="180" y="190" width="610" height="140" fill="#93c5fd" fill-opacity=".8"/>
<rect x="180" y="170" width="610" height="20" fill="#60a5fa" fill-opacity=".9"/>
<line x1="180" y1="190" x2="790" y2="190" stroke="#1e3a8a" stroke-width="2" stroke-dasharray="6 5"/>
<line x1="180" y1="170" x2="790" y2="170" stroke="#1e3a8a" stroke-width="2.5"/>
<path d="M60,130 q60,20 120,60" stroke="#2563eb" stroke-width="4" fill="none" marker-end="url(#sw)"/>
<circle cx="700" cy="50" r="30" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
<g stroke="#dc2626" stroke-width="3" marker-end="url(#sl)"><line x1="420" y1="300" x2="420" y2="215"/><line x1="560" y1="300" x2="560" y2="215"/></g>
<g fill="#1d4ed8" opacity=".6">${[380,460,520,600,660].map((x,i)=>`<circle cx="${x}" cy="${250+(i%2)*30}" r="5"/>`).join("")}</g>
<path d="M620,165 l40,0 l-6,10 l-28,0z" fill="#f8fafc" stroke="#475569"/>
${L(-60,105,-60,50,"Ice on land melts","middle")}${L(120,160,120,250,"Meltwater adds to the ocean","middle")}${L(490,260,490,320,"Warming water expands","middle")}${L(300,170,320,120,"Higher sea level today")}${L(300,190,330,232,"Earlier sea level")}${L(640,166,640,120,"Floating sea ice adds little","middle")}${L(672,50,600,40,"Warming climate")}`,335)};

Object.assign(window.DIAG,D);
})();
