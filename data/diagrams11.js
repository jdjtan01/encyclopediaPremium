// Diagrams for balance, the voice, hiccups, blood donation, seeds, leaves, roots and Mendel's peas.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Inner ear balance organs */
D.balance={t:"The balance organs of the inner ear",c:"Deep in each ear, three fluid-filled semicircular canals sit at right angles to one another. When your head turns, the fluid moves and bends tiny hair cells, telling the brain which way you are turning. The utricle and saccule contain tiny crystals that sense gravity and straight-line movement. The snail-shaped cochlea next to them is for hearing.",
svg:S(`<g fill="none" stroke-width="16" stroke-linecap="round" opacity=".9">
<ellipse cx="110" cy="105" rx="70" ry="60" stroke="#f472b6"/>
<ellipse cx="60" cy="150" rx="40" ry="75" stroke="#a78bfa" transform="rotate(-35 60 150)"/>
<ellipse cx="170" cy="150" rx="75" ry="35" stroke="#60a5fa" transform="rotate(15 170 150)"/></g>
<ellipse cx="135" cy="200" rx="55" ry="35" fill="#fde68a" stroke="#a16207" stroke-width="2"/>
<circle cx="120" cy="198" r="10" fill="#fff" stroke="#a16207"/><circle cx="150" cy="208" r="10" fill="#fff" stroke="#a16207"/>
<path d="M190,215 q60,-10 80,30 q15,40 -25,55 q-40,10 -50,-25 q-5,-25 20,-30 q20,0 20,18" fill="none" stroke="#f97316" stroke-width="14" stroke-linecap="round"/>
<path d="M90,225 q-40,40 -120,60" stroke="#facc15" stroke-width="7" fill="none"/>
${L(110,45,420,40,"Three semicircular canals sense turning")}${L(170,183,420,110,"Fluid moves and bends hair cells")}${L(120,198,420,170,"Utricle and saccule sense gravity")}${L(260,260,420,240,"Cochlea: for hearing")}${L(-20,272,-40,320,"Nerve to the brain","middle")}`,335)};

/* Voice */
D.voice={t:"How we make our voice",c:"Air pushed up from the lungs passes between the vocal folds in the larynx. When the folds close and vibrate, they make a buzzing sound. The throat, mouth and nose shape it, and the tongue, lips and teeth turn it into speech. When we breathe quietly, the folds stay open.",
svg:S(`${arrow("vc","#2563eb")}
<path d="M-60,40 q120,-30 190,20 q30,25 20,60 l-20,30 q10,20 -5,30 l-30,10 q-20,5 -20,30 l0,140 h-50 l0,-150 q-20,-40 -60,-60 q-40,-30 -25,-110z" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/>
<path d="M-40,75 q80,-25 150,5" stroke="#f472b6" stroke-width="10" fill="none" opacity=".5"/>
<path d="M-20,128 q60,-35 120,0" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
<rect x="45" y="200" width="40" height="40" rx="6" fill="#fda4af" stroke="#9f1239" stroke-width="2"/>
<path d="M50,220 h30" stroke="#9f1239" stroke-width="4"/>
<path d="M65,330 v-80" stroke="#2563eb" stroke-width="4" marker-end="url(#vc)"/>
<g transform="translate(470,120)"><ellipse cx="0" cy="40" rx="50" ry="65" fill="#fecdd3" stroke="#9f1239" stroke-width="2"/><path d="M0,-15 L-14,95 M0,-15 L14,95" stroke="#9f1239" stroke-width="5"/><path d="M0,-15 L-14,95 L14,95z" fill="#1e293b" opacity=".85"/>${T(0,140,"Open: breathing","middle")}</g>
<g transform="translate(660,120)"><ellipse cx="0" cy="40" rx="50" ry="65" fill="#fecdd3" stroke="#9f1239" stroke-width="2"/><path d="M0,-15 L-2,95 M0,-15 L2,95" stroke="#9f1239" stroke-width="7"/>${T(0,140,"Closed: vibrating","middle")}</g>
${T(565,40,"Vocal folds seen from above","middle","font-weight:700")}
${L(10,70,-120,30,"Nasal cavity","middle")}${L(40,120,-60,175,"Tongue shapes sounds","middle")}${L(65,220,230,215,"Larynx: vocal folds vibrate")}${L(65,290,230,295,"Air from the lungs")}`,340)};

/* Hiccups */
D.hiccups={t:"What happens in a hiccup",c:"A hiccup starts with a sudden, involuntary tightening of the diaphragm, the dome-shaped muscle under the lungs. Air rushes in, and a fraction of a second later the vocal cords snap shut, stopping the air and making the hic sound.",
svg:S(`${arrow("hc","#dc2626")}${arrow("ha","#2563eb")}
<path d="M70,20 v80" stroke="#94a3b8" stroke-width="18"/><path d="M70,95 q-40,10 -60,40 M70,95 q40,10 60,40" stroke="#94a3b8" stroke-width="10" fill="none"/>
<path d="M60,105 q-110,0 -130,120 q-5,60 50,60 q60,0 70,-60z" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
<path d="M80,105 q110,0 130,120 q5,60 -50,60 q-60,0 -70,-60z" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
<path d="M-110,300 Q70,220 250,300" stroke="#b45309" stroke-width="8" fill="none"/>
<path d="M-110,318 Q70,280 250,318" stroke="#b45309" stroke-width="4" fill="none" stroke-dasharray="8 6"/>
<path d="M70,250 v50" stroke="#dc2626" stroke-width="4" marker-end="url(#hc)"/>
<path d="M70,10 v50" stroke="#2563eb" stroke-width="4" marker-end="url(#ha)"/>
<rect x="55" y="40" width="30" height="8" rx="3" fill="#0f172a"/>
${T(140,30,"“Hic!”","start","font-weight:700;font-size:20px")}
${L(85,44,420,44,"Vocal cords snap shut, making the sound")}${L(160,180,420,130,"Lungs")}${L(200,280,420,230,"Diaphragm suddenly tightens and pulls down")}${L(70,25,-60,25,"Air rushes in")}`,335)};

/* Blood components */
D.blooddonation={t:"What donated blood is made of",c:"When blood is spun quickly in a machine called a centrifuge, it separates into layers. Each part helps different patients: red cells for blood loss and anemia, platelets for dengue and cancer patients, and plasma for burns and clotting problems.",
svg:S(`<path d="M60,20 h80 v260 q0,40 -40,40 q-40,0 -40,-40z" fill="#fff" stroke="#475569" stroke-width="3"/>
<path d="M63,40 h74 v120 h-74z" fill="#fde68a"/>
<rect x="63" y="160" width="74" height="10" fill="#f8fafc" stroke="#cbd5e1"/>
<path d="M63,170 h74 v110 q0,37 -37,37 q-37,0 -37,-37z" fill="#b91c1c"/>
<rect x="-130" y="70" width="140" height="90" rx="10" fill="#e2e8f0" stroke="#475569"/><circle cx="-60" cy="115" r="30" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="10 6"/>${T(-60,190,"Centrifuge","middle")}
${L(137,100,240,70,"Plasma, about 55%: water, proteins, clotting factors")}${L(137,165,240,165,"White cells and platelets: a thin layer")}${L(137,240,240,260,"Red cells, about 45%: carry oxygen")}`,335)};

/* Seed and germination */
D.seeds={t:"Inside a seed and how it sprouts",c:"A bean seed holds a tiny plant, the embryo, with a young root and shoot, and two seed leaves full of stored food, all wrapped in a protective seed coat. With water, warmth and air, the seed swells, the root grows down and the shoot grows up toward the light.",
svg:S(`<ellipse cx="40" cy="160" rx="120" ry="80" fill="#fde68a" stroke="#a16207" stroke-width="4"/>
<path d="M40,82 q-110,10 -110,78 q0,70 110,78" fill="#fcd34d" stroke="#a16207" stroke-width="1.5"/>
<path d="M120,140 q-30,-5 -45,10 q-10,15 5,30 q20,10 45,0" fill="#86efac" stroke="#15803d" stroke-width="2"/>
<path d="M78,155 q-15,-20 0,-35" stroke="#15803d" stroke-width="3" fill="none"/>
<rect x="340" y="250" width="440" height="12" fill="#a16207"/>
${[[380,0],[500,1],[640,2]].map(([x,s])=>`<ellipse cx="${x}" cy="240" rx="${18}" ry="12" fill="#fcd34d" stroke="#a16207"/><path d="M${x},250 v${30+s*20}" stroke="#a8a29e" stroke-width="3"/>${s?`<path d="M${x},230 q0,-${20+s*30} ${s*8},-${30+s*40}" stroke="#16a34a" stroke-width="4" fill="none"/>`:""}${s==2?`<ellipse cx="${x-18}" cy="150" rx="18" ry="9" fill="#4ade80"/><ellipse cx="${x+22}" cy="150" rx="18" ry="9" fill="#4ade80"/>`:""}`).join("")}
${T(380,320,"Seed absorbs water","middle")}${T(500,320,"Root grows down","middle")}${T(640,320,"Shoot reaches light","middle")}
${L(-60,90,-80,30,"Seed coat protects","middle")}${L(0,170,-50,280,"Seed leaf stores food","middle")}${L(100,155,200,60,"Embryo: tiny plant")}${L(118,175,220,210,"Young root")}`,335)};

/* Leaf cross-section */
D.leaves={t:"Inside a leaf",c:"A slice through a leaf. Tightly packed palisade cells near the top hold most of the chloroplasts that capture sunlight. Below, loose spongy cells leave air spaces. Tiny pores called stomata on the underside let carbon dioxide in and oxygen and water vapor out, while veins bring water and carry away sugars.",
svg:S(`${arrow("lf","#334155")}
<rect x="-140" y="60" width="600" height="14" fill="#bbf7d0" stroke="#15803d"/>
<rect x="-140" y="74" width="600" height="18" fill="#dcfce7" stroke="#15803d"/>
${Array.from({length:15},(_,i)=>`<rect x="${-136+i*40}" y="94" width="34" height="70" rx="12" fill="#4ade80" stroke="#15803d"/>`).join("")}
${Array.from({length:14},(_,i)=>`<ellipse cx="${-120+i*42}" cy="${190+(i%2)*22}" rx="18" ry="13" fill="#86efac" stroke="#15803d"/>`).join("")}
<circle cx="170" cy="200" r="22" fill="#fde68a" stroke="#a16207" stroke-width="2"/>
<rect x="-140" y="236" width="600" height="16" fill="#dcfce7" stroke="#15803d"/>
<path d="M300,252 q12,-18 24,0 q-12,18 -24,0" fill="#15803d"/><ellipse cx="312" cy="252" rx="4" ry="8" fill="#fff"/>
<path d="M290,320 Q300,285 308,262" stroke="#334155" stroke-width="3" fill="none" marker-end="url(#lf)"/>
<path d="M318,262 Q330,290 350,315" stroke="#334155" stroke-width="3" fill="none" marker-end="url(#lf)"/>
<g stroke="#f59e0b" stroke-width="3">${[-60,40,140].map(x=>`<path d="M${x},10 l20,40" marker-end="url(#lf)"/>`).join("")}</g>
${T(260,330,"CO₂ in","end")}${T(360,330,"O₂ and water out","start")}${T(-30,24,"Sunlight","start")}
${L(460,66,520,40,"Waxy cuticle")}${L(440,130,520,110,"Palisade cells: most photosynthesis")}${L(400,200,520,185,"Spongy cells with air spaces")}${L(190,200,520,240,"Vein carries water and sugar")}${L(318,252,520,300,"Stoma: a pore with two guard cells")}`,340)};

/* Roots */
D.roots={t:"Two kinds of roots",c:"Some plants, such as carrots and many trees, have one main taproot that grows straight down. Grasses such as rice and corn have fibrous roots, a mass of thin roots that hold soil well. Behind each root tip, tiny root hairs soak up water and minerals, while a cap protects the growing tip.",
svg:S(`<rect x="-160" y="80" width="950" height="260" fill="#d6c3a5" opacity=".6"/>
<path d="M20,80 q-10,-40 -30,-60 M20,80 q5,-45 25,-65 M20,80 q-2,-50 0,-70" stroke="#16a34a" stroke-width="7" fill="none"/>
<path d="M5,80 q15,0 30,0 q-3,90 -15,230 q-12,-140 -15,-230z" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
<g stroke="#c2410c" stroke-width="2" fill="none"><path d="M28,130 q20,10 40,30"/><path d="M12,170 q-25,10 -45,30"/><path d="M26,220 q20,10 35,30"/></g>
<path d="M310,80 q-10,-50 -25,-70 M310,80 q10,-50 25,-70 M310,80 v-75" stroke="#16a34a" stroke-width="5" fill="none"/>
<g stroke="#a16207" stroke-width="3" fill="none">${[-60,-40,-20,0,20,40,60].map(d=>`<path d="M310,82 q${d},60 ${d*1.6},${140+Math.abs(d)/2}"/>`).join("")}</g>
<circle cx="600" cy="210" r="95" fill="#fef3c7" stroke="#a16207" stroke-width="2"/>
<path d="M600,120 v170" stroke="#a16207" stroke-width="16" stroke-linecap="round"/>
<g stroke="#a16207" stroke-width="2">${[150,170,190,210,230,250].map(y=>`<line x1="592" y1="${y}" x2="550" y2="${y-8}"/><line x1="608" y1="${y}" x2="650" y2="${y-8}"/>`).join("")}</g>
<path d="M590,282 q10,22 20,0z" fill="#facc15" stroke="#a16207"/>
${T(600,330,"Close-up of a root tip","middle")}
${L(30,150,-80,320,"Taproot, as in a carrot","middle")}${L(330,200,260,320,"Fibrous roots, as in rice","middle")}${L(650,202,700,150,"Root hairs")}${L(610,288,700,300,"Root cap")}`,340)};

/* Mendel's peas */
{const cell=(x,y,g)=>{const p=g.includes("P");return `<rect x="${x}" y="${y}" width="110" height="80" fill="${p?"#ede9fe":"#f8fafc"}" stroke="#475569" stroke-width="2"/><circle cx="${x+30}" cy="${y+40}" r="16" fill="${p?"#7c3aed":"#fff"}" stroke="#4c1d95" stroke-width="2"/>${T(x+75,y+46,g,"middle","font-weight:700;"+K)}`};
D.mendel={t:"Mendel’s peas: how traits are inherited",c:"Each pea plant carries two copies of a gene for flower color. P, for purple, is dominant over p, for white. When two plants that each carry one of each are crossed, on average three out of four offspring have purple flowers and one has white, the famous 3 to 1 ratio Gregor Mendel found.",
svg:S(`${cell(60,80,"PP")}${cell(170,80,"Pp")}${cell(60,160,"Pp")}${cell(170,160,"pp")}
${T(115,65,"P","middle","font-weight:700;font-size:20px")}${T(225,65,"p","middle","font-weight:700;font-size:20px")}${T(35,128,"P","middle","font-weight:700;font-size:20px")}${T(35,208,"p","middle","font-weight:700;font-size:20px")}
${T(170,35,"Pollen from parent 1 (Pp)","middle")}${T(-30,170,"Egg from","middle")}${T(-30,188,"parent 2 (Pp)","middle")}
${T(165,270,"3 purple : 1 white","middle","font-weight:700")}
${L(225,120,400,90,"Pp: one dominant copy, so purple")}${L(225,200,400,170,"pp: two recessive copies, so white")}${L(150,96,400,40,"PP: two dominant copies, purple")}`,300)};}

Object.assign(window.DIAG,D);
})();
