// More labeled diagrams. Uses the helpers from diagrams.js. Simplified, not to scale unless stated.
(()=>{
const {L,S,arrow}=window.DG,D={};
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Brain */
D.brain={t:"Parts of the brain",c:"The left side of the brain, with the front of the head on the left. Each lobe of the cerebrum has main jobs, though most tasks use many parts of the brain working together.",
svg:S(`<defs><clipPath id="bc"><path d="M120,170C110,90,190,40,300,45C410,40,490,90,485,160C482,200,450,220,410,222L180,222C140,220,122,200,120,170Z"/></clipPath></defs>
<g clip-path="url(#bc)"><path d="M100,0L280,0L240,165L180,168L150,260L100,260Z" fill="#60a5fa"/><path d="M280,0L430,0L405,150L240,165Z" fill="#facc15"/><path d="M430,0L520,0L520,260L410,260L405,150Z" fill="#f472b6"/><path d="M180,168L405,150L410,260L150,260Z" fill="#4ade80"/></g>
<path d="M120,170C110,90,190,40,300,45C410,40,490,90,485,160C482,200,450,220,410,222L180,222C140,220,122,200,120,170Z" fill="none" stroke="#475569" stroke-width="3"/>
<path d="M175,170q110,-25,230,-20" stroke="#475569" stroke-width="3" fill="none"/><path d="M280,48q-15,60,-40,117" stroke="#475569" stroke-width="2.5" fill="none"/><g stroke="#47556988" stroke-width="2" fill="none"><path d="M160,110q30,-20,40,10"/><path d="M330,90q30,10,40,-10"/><path d="M250,200q30,-15,60,0"/><path d="M430,120q20,10,30,0"/></g>
<path d="M360,225q-5,50,-15,100h30q5,-50,15,-100z" fill="#c4b5fd" stroke="#6d28d9" stroke-width="2"/><ellipse cx="430" cy="240" rx="58" ry="30" fill="#fb923c" stroke="#c2410c" stroke-width="2"/><g stroke="#c2410c" fill="none"><path d="M385,235q45,-10,95,0"/><path d="M390,248q40,-8,85,0"/></g>
${L(180,120,150,20,"Frontal lobe: thinking, planning, movement")}${L(340,100,380,20,"Parietal lobe: touch, sense of space")}${L(460,150,560,110,"Occipital lobe: vision")}${L(280,205,200,300,"Temporal lobe: hearing, memory, language")}${L(450,245,560,230,"Cerebellum: balance and coordination")}${L(362,300,560,310,"Brain stem: breathing, heartbeat")}`)};

/* Flight */
D.flight={t:"The four forces of flight",c:"An airplane flies when lift is greater than its weight and thrust is greater than drag. The wing’s curved shape and angle make air flow faster over the top, so pressure above the wing is lower than below it.",
svg:S(`${arrow("fa","#e11d48")}${arrow("fb","#94a3b8")}
<g stroke="#94a3b8" stroke-width="1.6" fill="none" marker-end="url(#fb)"><path d="M20,120C150,120,180,70,300,72S460,110,580,118"/><path d="M20,150C150,150,180,118,300,115S460,140,580,150"/><path d="M20,215C150,215,200,215,300,206S460,200,580,210"/><path d="M20,250C150,250,200,250,300,245S460,240,580,248"/></g>
<path d="M160,180C170,140,260,120,350,130C430,140,500,165,540,190C460,192,320,196,200,195C175,194,158,190,160,180Z" fill="#475569"/>
<g stroke="#e11d48" stroke-width="5" marker-end="url(#fa)"><line x1="330" y1="150" x2="330" y2="30"/><line x1="330" y1="190" x2="330" y2="310"/><line x1="160" y1="175" x2="40" y2="175"/><line x1="540" y1="185" x2="620" y2="185"/></g>
${T(345,40,"Lift","start","font-weight:800;fill:#e11d48")}${T(345,305,"Weight","start","font-weight:800;fill:#e11d48")}${T(40,200,"Thrust","start","font-weight:800;fill:#e11d48")}${T(630,190,"Drag","start","font-weight:800;fill:#e11d48")}
${L(430,150,520,70,"Lower pressure above the wing")}${L(420,195,520,280,"Higher pressure below")}${L(200,160,40,100,"Wing seen from the side")}`)};

/* Circuit */
D.elec={t:"A simple electric circuit",c:"Electricity flows only when the circuit is a complete loop. By convention, current is shown flowing from the battery’s positive terminal to its negative terminal; the electrons themselves move the other way.",
svg:S(`${arrow("ca","#f59e0b")}<path d="M100,80H500V260H100Z" fill="none" stroke="currentColor" stroke-width="4"/>
<rect x="85" y="140" width="30" height="60" fill="var(--sf)"/><line x1="70" y1="150" x2="130" y2="150" stroke="currentColor" stroke-width="5"/><line x1="82" y1="166" x2="118" y2="166" stroke="currentColor" stroke-width="8"/><line x1="70" y1="182" x2="130" y2="182" stroke="currentColor" stroke-width="5"/><line x1="82" y1="198" x2="118" y2="198" stroke="currentColor" stroke-width="8"/>${T(140,152,"+","start","font-size:16px;font-weight:800")}${T(140,204,"−","start","font-size:16px;font-weight:800")}
<rect x="270" y="70" width="70" height="20" fill="var(--sf)"/><circle cx="275" cy="80" r="5" fill="currentColor"/><circle cx="335" cy="80" r="5" fill="currentColor"/><line x1="275" y1="80" x2="333" y2="78" stroke="currentColor" stroke-width="4"/>
<circle cx="500" cy="170" r="34" fill="#fde68a" stroke="#d97706" stroke-width="3"/><path d="M486,185q7,-30,14,0q7,-30,14,0" stroke="#b45309" stroke-width="2" fill="none"/><g stroke="#fbbf24" stroke-width="3">${[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<line x1="${500+44*Math.cos(a)}" y1="${170+44*Math.sin(a)}" x2="${500+58*Math.cos(a)}" y2="${170+58*Math.sin(a)}"/>`}).join("")}</g>
<g stroke="#f59e0b" stroke-width="3" fill="none" marker-end="url(#ca)"><path d="M150,65H240"/><path d="M515,110V125" /><path d="M420,275H330"/><path d="M85,230V215"/></g>
${L(100,170,20,110,"Battery: pushes current")}${L(305,79,305,30,"Switch: closed, so current flows","middle")}${L(530,160,620,120,"Bulb: lights up")}${L(300,260,300,315,"Wire: carries the current","middle")}${L(195,65,140,30,"Direction of current")}`)};

/* Magnet */
{let lines="";[40,75,110,150].forEach(h=>{lines+=`<path d="M200,170C200,${170-h*1.2},400,${170-h*1.2},400,170" marker-mid="url(#mg)"/><path d="M200,170C200,${170+h*1.2},400,${170+h*1.2},400,170"/>`});
D.magnet={t:"A magnet’s field",c:"Magnetic field lines run from a magnet’s north pole to its south pole. They are closest together near the poles, where the field is strongest. Unlike poles attract; like poles repel.",
svg:S(`<defs><marker id="mg" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#64748b"/></marker></defs><g stroke="#64748b" stroke-width="1.8" fill="none">${lines}<path d="M200,170H80"/><path d="M400,170H520"/></g>
<g stroke="#64748b" stroke-width="2" fill="#64748b">${[[300,26],[300,82],[300,256],[300,312]].map(p=>`<path d="M${p[0]-14},${p[1]}L${p[0]+10},${p[1]}" stroke-width="2.5"/><path d="M${p[0]+16},${p[1]}l-8,-5v10z"/>`).join("")}</g>
<rect x="200" y="145" width="100" height="50" fill="#dc2626"/><rect x="300" y="145" width="100" height="50" fill="#2563eb"/>${T(250,178,"N","middle","font-size:24px;font-weight:800;fill:#fff")}${T(350,178,"S","middle","font-size:24px;font-weight:800;fill:#fff")}
${L(240,150,120,40,"North pole")}${L(360,150,480,40,"South pole")}${L(300,82,470,110,"Field lines run from N to S")}${L(210,190,90,280,"Field strongest near the poles")}`)};}

/* Prism */
{const C=["#ef4444","#f97316","#facc15","#22c55e","#3b82f6","#4f46e5","#8b5cf6"],N=["Red","Orange","Yellow","Green","Blue","Indigo","Violet"];let fan="";C.forEach((c,i)=>{fan+=`<path d="M335,${178+i*2}L560,${110+i*26}L560,${126+i*26}L335,${180+i*2}Z" fill="${c}"/>`+T(570,123+i*26,N[i]+(i==0?": bends least":i==6?": bends most":""),"start")});
D.light={t:"Splitting white light",c:"A glass prism bends, or refracts, light. Each color bends by a different amount, so white light spreads into a spectrum. Violet light, with the shortest wavelength, bends the most; red bends the least. Raindrops do the same to make rainbows.",
svg:S(`<path d="M20,215L250,170" stroke="#fff" stroke-width="10"/><path d="M20,215L250,170" stroke="#cbd5e1" stroke-width="10" stroke-opacity=".6"/><path d="M250,170L335,180" stroke="#e5e7eb" stroke-width="9"/>${fan}<path d="M290,50L400,260H180Z" fill="#bae6fd" fill-opacity=".45" stroke="#0284c7" stroke-width="3"/>
${L(100,199,40,140,"White light: a mix of all colors")}${L(330,110,350,40,"Glass prism")}`)};}

/* Sound */
{let dots="";for(let i=0;i<220;i++){const x=40+(i%44)*12.5,base=40+(i%44)*12.5,off=-6*Math.sin(2*Math.PI*base/150),y=56+Math.floor(i/44)*14;dots+=`<circle cx="${(x+off).toFixed(1)}" cy="${y}" r="3" fill="#64748b"/>`}
let w="";for(let x=40;x<=590;x+=5)w+=(x==40?"M":"L")+x+","+(230-55*Math.cos(2*Math.PI*x/150)).toFixed(1);
D.sound={t:"How sound travels",c:"Sound is a vibration that travels through air as waves of squashed and stretched air, called compressions and rarefactions. The graph shows the same wave. A longer wavelength means a lower pitch; a bigger amplitude means a louder sound.",
svg:S(`${dots}<line x1="40" y1="230" x2="590" y2="230" class="ln" stroke-dasharray="4 4"/><path d="${w}" stroke="var(--cc)" stroke-width="4" fill="none"/>
<path d="M150,300H300" stroke="currentColor" stroke-width="2"/><path d="M150,292v16M300,292v16" stroke="currentColor" stroke-width="2"/>${T(225,325,"Wavelength")}<path d="M610,175V230" stroke="currentColor" stroke-width="2"/><path d="M602,175h16M602,230h16" stroke="currentColor" stroke-width="2"/>${T(625,207,"Amplitude","start")}
${L(150,56,135,24,"Compression: particles close together")}${L(375,56,390,24,"Rarefaction: particles spread out")}${L(265,175,330,150,"Wave graph of the same sound","start")}`)};}

/* Tides */
D.tides={t:"Why there are two tides a day",c:"The Moon’s gravity pulls the ocean into two bulges: one on the side facing the Moon and one on the opposite side. As Earth spins, most coasts pass through both bulges, getting two high tides and two low tides about every 25 hours. Not to scale.",
svg:S(`<ellipse cx="220" cy="170" rx="155" ry="110" fill="#60a5fa" fill-opacity=".7"/><circle cx="220" cy="170" r="95" fill="#4ade80" stroke="#15803d" stroke-width="2"/><path d="M175,140q30,-30,60,0t50,30q-30,40,-80,20t-30,-50z" fill="#65a30d"/>
<circle cx="540" cy="170" r="30" fill="#d1d5db" stroke="#6b7280" stroke-width="2"/>${arrow("ta","#6b7280")}<g stroke="#6b7280" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#ta)"><line x1="505" y1="170" x2="385" y2="170"/></g>
<path d="M220,40a130,130 0 0 1 120,70" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#ta)"/>
${L(372,170,420,85,"High tide: facing the Moon")}${L(68,170,20,110,"High tide: opposite side")}${L(220,62,120,30,"Low tide")}${L(220,278,120,315,"Low tide")}${L(540,140,540,120,"Moon","middle")}${L(320,95,420,40,"Earth spins once a day")}${L(445,170,470,215,"Moon’s pull")}`)};

/* Digestive system */
D.digest={t:"The digestive system",c:"The journey of food through the body, seen from the front, so the liver, on the body’s right, is on the left of the picture. Food takes about one to three days to pass all the way through.",
svg:S(`<path d="M300,20q30,0,30,30q0,25,-30,28q-30,-3,-30,-28q0,-30,30,-30z" fill="#f2c4a8" stroke="#c2410c" stroke-width="2"/><path d="M300,78v95" stroke="#f9a8b4" stroke-width="12"/>
<path d="M210,150q30,-30,80,-10l10,40q-60,25,-100,5q-10,-20,10,-35z" fill="#b45309"/><ellipse cx="258" cy="190" rx="10" ry="8" fill="#65a30d"/>
<path d="M300,165q60,-20,75,20q10,40,-35,50q-30,5,-40,-15" fill="#fb7185" stroke="#be123c" stroke-width="2"/><path d="M270,212q50,10,90,0" stroke="#f59e0b" stroke-width="12" fill="none"/>
<path d="M215,245V300H385V245H215" stroke="#a16207" stroke-width="18" fill="none" stroke-linejoin="round"/><path d="M300,300v30" stroke="#a16207" stroke-width="14"/>
<path d="M240,250q20,-10,40,0t40,0t40,0M240,265q20,10,40,0t40,0t40,0M240,280q20,-10,40,0t40,0t40,0M245,292q20,8,40,0t40,0t35,0" stroke="#f9a8b4" stroke-width="7" fill="none"/>
${L(300,45,420,30,"Mouth: teeth chew, saliva starts digestion")}${L(300,120,420,80,"Esophagus: pushes food down")}${L(355,190,450,140,"Stomach: acid and churning")}${L(230,165,100,130,"Liver: makes bile")}${L(258,190,100,180,"Gallbladder: stores bile")}${L(330,212,450,200,"Pancreas: makes enzymes")}${L(300,268,450,260,"Small intestine: absorbs nutrients")}${L(215,270,100,250,"Large intestine: absorbs water")}${L(300,325,100,315,"Rectum")}`)};

/* Kidney */
D.kidney={t:"Inside a kidney",c:"A kidney cut lengthwise. Blood enters through the renal artery and is filtered by about a million nephrons in the cortex and medulla. Urine collects in the renal pelvis and drains down the ureter to the bladder.",
svg:S(`<path d="M300,40C400,40,440,120,430,190C420,270,360,310,300,300C250,292,240,250,260,220C280,195,280,150,260,125C240,95,240,40,300,40Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="3"/>
<path d="M305,62C385,65,415,130,408,190C400,255,355,285,305,280C275,276,268,250,282,228C300,200,300,145,282,118C268,95,272,62,305,62Z" fill="#ef4444"/>
<g fill="#991b1b">${[[330,95,-30],[370,140,-60],[380,195,-95],[360,245,-125],[325,268,-160]].map(p=>`<path d="M0,-28L18,14H-18Z" transform="translate(${p[0]},${p[1]}) rotate(${p[2]})"/>`).join("")}</g>
<path d="M300,130q-30,10,-25,40q0,30,25,40q20,-25,0,-80z" fill="#fde68a" stroke="#ca8a04" stroke-width="2"/><path d="M280,190q-40,30,-50,140" stroke="#fde68a" stroke-width="14" fill="none"/>
<path d="M275,150H150" stroke="#dc2626" stroke-width="12"/><path d="M275,168H150" stroke="#2563eb" stroke-width="12"/>
${L(420,170,520,130,"Cortex: outer layer")}${L(370,140,520,80,"Medulla: cone-shaped pyramids")}${L(290,170,520,200,"Renal pelvis: collects urine")}${L(235,280,520,290,"Ureter: carries urine to the bladder")}${L(180,150,60,110,"Renal artery: blood in")}${L(180,168,60,210,"Renal vein: cleaned blood out")}`)};

/* Blood */
D.blood={t:"What blood is made of",c:"If blood is left to settle or spun in a machine, it separates into layers. About 55% is plasma, about 45% is red blood cells, and less than 1% is white blood cells and platelets.",
svg:S(`<path d="M240,30h80v250a40,40 0 0 1 -80,0z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M243,40h74v128h-74z" fill="#fde68a"/><path d="M243,168h74v8h-74z" fill="#f8fafc" stroke="#cbd5e1"/><path d="M243,176h74v104a37,37 0 0 1 -74,0z" fill="#b91c1c"/>
<g><ellipse cx="470" cy="70" rx="26" ry="26" fill="#dc2626"/><ellipse cx="470" cy="70" rx="10" ry="10" fill="#991b1b"/><circle cx="470" cy="160" r="22" fill="#e9d5ff" stroke="#7c3aed" stroke-width="2"/><path d="M460,155q10,-12,20,0q-5,15,-20,10z" fill="#7c3aed"/>${[[455,240],[470,250],[485,238]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="7" ry="4" fill="#a8a29e"/>`).join("")}</g>
${L(280,100,120,90,"Plasma, about 55%: water, salts, proteins")}${L(280,172,120,175,"White cells and platelets, under 1%")}${L(280,240,120,250,"Red blood cells, about 45%")}${L(496,70,520,40,"Red blood cell: carries oxygen","start")}${L(492,160,520,130,"White blood cell: fights germs","start")}${L(492,240,520,215,"Platelets: help blood clot","start")}`)};

/* Life of stars */
{const B=(x,y,r,f,t,t2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`+T(x,y+r+16,t)+(t2?T(x,y+r+30,t2,"middle","opacity:.75;font-weight:400"):"");
const A=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2" marker-end="url(#sa)"/>`;
D.stars={t:"The life cycle of stars",c:"All stars are born in clouds of gas and dust. What happens at the end depends on a star’s mass. The Sun will become a red giant in about 5 billion years and end as a white dwarf. Sizes are not to scale.",
svg:S(`${arrow("sa","currentColor")}<path d="M0,170c10,-40,60,-50,80,-20c30,-20,60,10,40,40c10,30,-40,50,-60,30c-30,20,-70,-10,-60,-50z" fill="#c084fc" fill-opacity=".6"/>${T(60,240,"Nebula")}${T(60,254,"cloud of gas and dust","middle","opacity:.75;font-weight:400")}
${A(125,165,165,165)}${B(195,165,16,"#fb923c","Protostar")}${A(215,155,265,95)}${A(215,175,265,240)}
${B(300,80,18,"#fde047","Average star","like the Sun")}${A(322,80,365,80)}${B(410,80,32,"#f97316","Red giant")}${A(446,80,490,80)}<circle cx="530" cy="80" r="26" fill="none" stroke="#22d3ee" stroke-width="6" opacity=".7"/><circle cx="530" cy="80" r="5" fill="#fff" stroke="#64748b"/>${T(530,122,"Planetary nebula")}${A(560,80,610,80)}${B(640,80,7,"#e0f2fe","White dwarf")}
${B(300,250,26,"#93c5fd","Massive star")}${A(330,250,365,250)}${B(415,250,40,"#dc2626","Red supergiant")}${A(460,250,500,250)}<path d="M535,215l8,22l22,-8l-12,20l20,12l-24,4l2,24l-16,-18l-16,18l2,-24l-24,-4l20,-12l-12,-20l22,8z" fill="#facc15"/>${T(535,300,"Supernova")}${A(570,235,620,200)}${A(570,265,620,285)}${B(660,195,6,"#a5b4fc","Neutron star")}<circle cx="660" cy="290" r="12" fill="#000" stroke="#f59e0b" stroke-width="3"/>${T(660,320,"Black hole")}`)};}

/* Black hole */
D.bh={t:"Anatomy of a black hole",c:"Nothing that crosses the event horizon, not even light, can escape. Gas spiraling in forms a glowing accretion disk, and some black holes blast jets of particles from their poles. Not to scale.",
svg:S(`<path d="M300,150V20M300,190V320" stroke="#a5b4fc" stroke-width="14" stroke-opacity=".5"/><path d="M300,150V20M300,190V320" stroke="#c7d2fe" stroke-width="4"/>
<ellipse cx="300" cy="170" rx="250" ry="48" fill="#f97316" fill-opacity=".35"/><ellipse cx="300" cy="170" rx="190" ry="36" fill="#fb923c" fill-opacity=".55"/><ellipse cx="300" cy="170" rx="120" ry="24" fill="#fde68a" fill-opacity=".8"/>
<circle cx="300" cy="170" r="55" fill="#000"/><circle cx="300" cy="170" r="58" fill="none" stroke="#fbbf24" stroke-width="2" opacity=".8"/><path d="M180,170a120,24 0 0 0 240,0" fill="#fde68a" fill-opacity=".8"/><circle cx="300" cy="170" r="2.5" fill="#fff"/>
${L(300,170,120,40,"Singularity: where matter is crushed")}${L(345,135,460,60,"Event horizon: the point of no return")}${L(500,180,600,230,"Accretion disk: hot, glowing gas")}${L(300,40,420,20,"Jet of particles")}`)};

/* Earthquake */
D.quake={t:"How an earthquake happens",c:"Rocks on either side of a fault are pushed in different directions until they suddenly slip. The point underground where the slip begins is the focus; the point on the surface directly above it is the epicenter. Seismic waves spread out in all directions.",
svg:S(`<path d="M20,90L300,90L250,320L20,320Z" fill="#a16207" fill-opacity=".7"/><path d="M300,110L580,110L580,320L250,320Z" fill="#a16207"/><path d="M20,90L300,90L580,110" fill="none" stroke="#65a30d" stroke-width="6"/>
<g stroke="#78350f" stroke-width="1.5" opacity=".6">${[140,190,240,290].map(y=>`<line x1="20" y1="${y}" x2="${300-(y-90)*.22}" y2="${y}"/><line x1="${300-(y-90)*.22+8}" y1="${y+16}" x2="580" y2="${y+16}"/>`).join("")}</g>
<path d="M300,90L250,320" stroke="#111" stroke-width="3"/><g fill="none" stroke="#ef4444" stroke-width="2.5">${[22,46,72,100].map(r=>`<circle cx="278" cy="195" r="${r}" opacity="${1-r/130}"/>`).join("")}</g><path d="M278,183l4,8l9,1l-7,6l2,9l-8,-5l-8,5l2,-9l-7,-6l9,-1z" fill="#facc15" stroke="#b45309"/>
${arrow("qa","#111")}<g stroke="#111" stroke-width="3" marker-end="url(#qa)"><line x1="150" y1="260" x2="150" y2="215"/><line x1="420" y1="215" x2="420" y2="260"/></g><path d="M278,92l-8,-14h16z" fill="#ef4444"/>
${L(278,80,360,40,"Epicenter: on the surface above the focus")}${L(282,196,600,210,"Focus: where the rock first slips")}${L(265,250,100,330,"Fault")}${L(378,195,600,160,"Seismic waves")}${L(150,240,0,240,"Rock moves up on one side")}`)};

/* Typhoon */
D.phtyph={t:"Inside a typhoon",c:"A cross-section of a typhoon. Warm, moist air spirals in over the sea and rises in towering clouds, releasing heat that powers the storm. In the Northern Hemisphere, typhoons spin counterclockwise when seen from above.",
svg:S(`${arrow("ya","#2563eb")}<rect x="0" y="290" width="600" height="50" fill="#3b82f6" fill-opacity=".6"/>
<path d="M235,290C230,200,215,120,200,60C150,40,60,60,30,100C10,160,40,230,80,290Z" fill="#e5e7eb" stroke="#9ca3af"/><path d="M365,290C370,200,385,120,400,60C450,40,540,60,570,100C590,160,560,230,520,290Z" fill="#e5e7eb" stroke="#9ca3af"/>
<path d="M240,290C238,200,225,110,215,55L195,48C210,120,220,200,215,290Z" fill="#9ca3af"/><path d="M360,290C362,200,375,110,385,55L405,48C390,120,380,200,385,290Z" fill="#9ca3af"/>
<g stroke="#60a5fa" stroke-width="2">${[60,100,140,460,500,540].map(x=>`<line x1="${x}" y1="245" x2="${x-8}" y2="285"/>`).join("")}</g>
<g stroke="#2563eb" stroke-width="2.5" fill="none" marker-end="url(#ya)"><path d="M20,280H180"/><path d="M580,280H420"/><path d="M225,270V110"/><path d="M375,270V110"/><path d="M210,50C150,30,90,30,40,50"/><path d="M390,50C450,30,510,30,560,50"/><path d="M300,80V250"/></g>
${L(300,180,300,320,"Eye: calm, clear, sinking air","middle")}${L(220,200,120,160,"Eyewall: strongest winds and rain")}${L(80,200,20,105,"Rain bands")}${L(100,280,60,320,"Warm, moist air spirals in")}${L(450,40,500,15,"Air flows out at the top")}${L(375,180,480,160,"Air rises and cools")}`)};

/* Wind turbine */
D.wind={t:"Inside a wind turbine",c:"Wind turns the blades, which spin a shaft. A gearbox speeds up the rotation, and a generator in the nacelle turns it into electricity, which travels down cables to the grid.",
svg:S(`<path d="M290,320L296,110H306L312,320Z" fill="#e5e7eb" stroke="#9ca3af"/><rect x="290" y="88" width="110" height="34" rx="12" fill="#e5e7eb" stroke="#9ca3af"/><rect x="320" y="96" width="30" height="18" fill="#94a3b8"/><rect x="355" y="96" width="34" height="18" fill="#f59e0b"/>
<circle cx="285" cy="105" r="13" fill="#cbd5e1" stroke="#64748b"/><g fill="#f8fafc" stroke="#94a3b8"><path d="M285,105L270,0L290,2Z"/><path d="M285,105L180,165L178,148Z"/><path d="M285,105L380,180L366,190Z" transform="rotate(5 285 105)"/></g>
<path d="M0,320H600" stroke="#65a30d" stroke-width="6"/><path d="M301,320v10H560" stroke="#111" stroke-width="3" fill="none"/>${arrow("wa2","#94a3b8")}<g stroke="#94a3b8" stroke-width="2" marker-end="url(#wa2)"><line x1="20" y1="60" x2="140" y2="60"/><line x1="20" y1="100" x2="140" y2="100"/><line x1="20" y1="140" x2="140" y2="140"/></g>${T(80,45,"Wind")}
${L(275,40,180,30,"Blade")}${L(285,105,180,110,"Hub")}${L(335,105,430,50,"Gearbox: speeds up rotation")}${L(372,105,470,100,"Generator: makes electricity")}${L(395,95,470,150,"Nacelle: the housing")}${L(302,220,400,220,"Tower")}${L(500,330,520,300,"Cable to the power grid","start")}`)};

/* Rice plant */
D.rice={t:"Parts of the rice plant",c:"A rice plant is a grass that grows about 1 to 1.8 meters tall. Each stem, called a tiller, can bear a drooping cluster of grains called a panicle. Inset: a single grain. Brown rice keeps the bran; white rice has it polished away.",
svg:S(`<path d="M0,300H400" stroke="#3b82f6" stroke-width="16" stroke-opacity=".4"/><path d="M0,308H400V340H0Z" fill="#78350f" fill-opacity=".6"/>
<g stroke="#4d7c0f" stroke-width="5" fill="none"><path d="M200,300C195,220,185,140,170,60"/><path d="M200,300C205,220,215,150,235,80"/><path d="M200,300C200,230,200,170,205,110"/></g>
<g fill="#65a30d"><path d="M198,250C150,200,110,190,70,200C120,205,160,220,198,260Z"/><path d="M202,240C250,180,300,170,340,175C290,185,250,210,204,252Z"/><path d="M200,200C160,150,140,120,130,80C150,120,175,150,202,190Z"/></g>
<g fill="#ca8a04">${Array.from({length:12},(_,i)=>`<ellipse cx="${170+Math.sin(i*.5)*4-(i>5?(i-5)*6:0)}" cy="${60+i*8}" rx="4" ry="7" transform="rotate(20 ${170-(i>5?(i-5)*6:0)} ${60+i*8})"/>`).join("")}${Array.from({length:10},(_,i)=>`<ellipse cx="${235+(i>4?(i-4)*6:0)}" cy="${80+i*8}" rx="4" ry="7"/>`).join("")}</g>
<g stroke="#a16207" stroke-width="1.5" fill="none">${[150,170,190,210,230,250].map(x=>`<path d="M200,308q${(x-200)*.5},20,${x-200},32"/>`).join("")}</g>
<ellipse cx="520" cy="150" rx="40" ry="85" fill="#fde68a" stroke="#a16207" stroke-width="5"/><ellipse cx="520" cy="150" rx="31" ry="74" fill="none" stroke="#b45309" stroke-width="4"/><ellipse cx="520" cy="215" rx="10" ry="8" fill="#a3e635"/><circle cx="520" cy="150" r="98" fill="none" stroke="currentColor" stroke-dasharray="4 4" opacity=".5"/>
${L(165,90,40,60,"Panicle: cluster of grains")}${L(130,205,30,150,"Leaf")}${L(203,200,330,250,"Tiller: a stem")}${L(200,325,330,325,"Roots in flooded soil")}${L(560,130,640,60,"Husk: removed in milling")}${L(549,170,640,140,"Bran: brown layer")}${L(520,130,640,200,"Endosperm: white rice")}${L(528,215,640,260,"Germ: the embryo")}`)};

/* pH scale */
{const col=["#b91c1c","#dc2626","#ea580c","#f59e0b","#facc15","#a3e635","#4ade80","#22c55e","#14b8a6","#0ea5e9","#3b82f6","#6366f1","#7c3aed","#9333ea","#6b21a8"];let bar="";col.forEach((c,i)=>{bar+=`<rect x="${20+i*40}" y="150" width="40" height="44" fill="${c}"/>`+T(40+i*40,178,i,"middle","fill:#fff;font-weight:800;font-size:14px")});
const ex=[[0,"Battery acid"],[2,"Calamansi and lemon juice"],[5,"Coffee"],[7,"Pure water"],[9,"Baking soda"],[11,"Household ammonia"],[13,"Bleach"]];let lab="";ex.forEach((e,i)=>{const x=40+e[0]*40,up=i%2==0,y=up?110:240;lab+=`<line class="ln" x1="${x}" y1="${up?150:194}" x2="${x}" y2="${up?y+6:y-12}"/>`+T(x,up?y:y,e[1],"middle")});
D.acid={t:"The pH scale",c:"The pH scale measures how acidic or alkaline a liquid is. Pure water is neutral at pH 7. Each step down the scale is ten times more acidic, so lemon juice at pH 2 is about 100,000 times more acidic than pure water. Values shown are typical.",
svg:S(`${bar}${lab}${T(20,300,"◀ More acidic","start","font-weight:800")}${T(620,300,"More alkaline ▶","end","font-weight:800")}${T(320,300,"Neutral","middle","font-weight:800")}`)};}

/* Spine */
{const seg=[];let y=30;const H=300,curve=t=>300-30*Math.sin(t*Math.PI*3+.1);const add=(n,h,c)=>{const y0=y;for(let i=0;i<n;i++){const t=(y-30)/H;seg.push(`<rect x="${curve(t)-h*1.1}" y="${y}" width="${h*2.2}" height="${h*.82}" rx="3" fill="${c}" stroke="#0005"/>`);y+=h}return[y0,y]};
const c=add(7,10,"#60a5fa"),th=add(12,9.5,"#4ade80"),lu=add(5,13,"#facc15");const ys=y,cs=curve((y-30)/H);seg.push(`<path d="M${cs-15},${y}l30,0l4,34h-24z" fill="#fb923c" stroke="#0005"/>`);y+=34;const cc=curve((y-30)/H)+8;seg.push(`<path d="M${cc-6},${y}l12,0l-2,16z" fill="#f472b6" stroke="#0005"/>`);
const mid=r=>(r[0]+r[1])/2,cx=yy=>curve((yy-30)/H);
D.spine={t:"The spine from the side",c:"The spine seen from the side, with the front of the body on the left. Its gentle S-shaped curves act like a spring, absorbing shocks and helping balance the head over the hips.",
svg:S(seg.join("")+L(cx(mid(c))-11,mid(c),140,mid(c),"Cervical: 7 neck vertebrae")+L(cx(mid(th))+10,mid(th),460,mid(th),"Thoracic: 12, joined to the ribs")+L(cx(mid(lu))-14,mid(lu),140,mid(lu),"Lumbar: 5, carry the most weight")+L(cs+15,ys+16,460,ys+16,"Sacrum: 5 fused vertebrae")+L(cc,y+8,140,y+8,"Coccyx: tailbone")+T(40,20,"FRONT","start","opacity:.6")+T(560,20,"BACK","end","opacity:.6"))};}

/* Insect */
D.insect={t:"Parts of an insect",c:"Every adult insect has a body in three parts, six jointed legs attached to the thorax and, usually, two antennae. Many also have two pairs of wings. This one is drawn from above.",
svg:S(`<g stroke="#57534e" stroke-width="4" fill="none" stroke-linecap="round"><path d="M285,150L250,120L225,125"/><path d="M285,170L240,170L215,190"/><path d="M290,190L255,225L235,230"/><path d="M315,150L350,120L375,125"/><path d="M315,170L360,170L385,190"/><path d="M310,190L345,225L365,230"/><path d="M290,85Q270,40,240,30"/><path d="M310,85Q330,40,360,30"/></g>
<g fill="#bae6fd" fill-opacity=".55" stroke="#0284c7" stroke-width="1.5"><path d="M300,140C220,90,140,110,150,150C160,180,240,170,300,150Z"/><path d="M300,140C380,90,460,110,450,150C440,180,360,170,300,150Z"/><path d="M300,160C240,170,190,210,215,230C240,245,280,200,300,170Z"/><path d="M300,160C360,170,410,210,385,230C360,245,320,200,300,170Z"/></g>
<circle cx="300" cy="100" r="20" fill="#a16207"/><ellipse cx="300" cy="160" rx="22" ry="34" fill="#b45309"/><ellipse cx="300" cy="250" rx="28" ry="60" fill="#d97706"/><g stroke="#92400e" stroke-width="2">${[215,235,255,275,295].map(y=>`<path d="M275,${y}q25,8,50,0" fill="none"/>`).join("")}</g><ellipse cx="287" cy="94" rx="7" ry="9" fill="#111"/><ellipse cx="313" cy="94" rx="7" ry="9" fill="#111"/>
${L(240,30,120,25,"Antenna: touch and smell")}${L(287,94,120,75,"Compound eye")}${L(300,100,460,60,"Head")}${L(300,165,470,165,"Thorax: legs and wings attach here")}${L(320,260,470,260,"Abdomen: digestion and breathing holes")}${L(170,140,40,150,"Forewing")}${L(215,225,60,225,"Hindwing")}${L(380,188,470,210,"Six jointed legs")}`)};

/* Frog life cycle */
{const P=[[300,60,"Eggs (frogspawn)"],[470,140,"Tadpole: breathes with gills"],[420,280,"Tadpole grows legs"],[180,280,"Froglet: loses its tail"],[130,140,"Adult frog"]];
const pic=[`<g fill="#111">${[-14,0,14,-7,7].map((d,i)=>`<circle cx="${300+d}" cy="${55+(i>2?12:0)}" r="9" fill="#cbd5e1" stroke="#64748b"/><circle cx="${300+d}" cy="${55+(i>2?12:0)}" r="3.5"/>`).join("")}</g>`,
`<ellipse cx="462" cy="140" rx="14" ry="10" fill="#374151"/><path d="M475,140q15,-10,30,0q-15,8,-30,0z" fill="#6b7280"/>`,
`<ellipse cx="412" cy="280" rx="15" ry="11" fill="#4b5563"/><path d="M426,280q16,-8,30,0q-15,8,-30,0z" fill="#6b7280"/><path d="M405,290l-8,12M418,290l6,12" stroke="#4b5563" stroke-width="3"/>`,
`<ellipse cx="180" cy="280" rx="20" ry="14" fill="#65a30d"/><path d="M198,284q10,2,16,-2" stroke="#65a30d" stroke-width="4" fill="none"/><path d="M165,292l-10,10M195,292l8,10" stroke="#4d7c0f" stroke-width="4"/><circle cx="172" cy="270" r="3" fill="#111"/><circle cx="186" cy="270" r="3" fill="#111"/>`,
`<ellipse cx="130" cy="140" rx="34" ry="22" fill="#16a34a"/><circle cx="115" cy="120" r="7" fill="#16a34a"/><circle cx="145" cy="120" r="7" fill="#16a34a"/><circle cx="115" cy="119" r="3" fill="#111"/><circle cx="145" cy="119" r="3" fill="#111"/><path d="M100,155l-22,12l10,4M160,155l22,12l-10,4" stroke="#15803d" stroke-width="5" fill="none"/>`];
D.frog={t:"The life cycle of a frog",c:"Many frogs change shape completely as they grow, a process called metamorphosis. Some Philippine forest frogs skip the tadpole stage and hatch from their eggs as tiny froglets.",
svg:S(`${arrow("fr","currentColor")}<g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#fr)" opacity=".7"><path d="M330,60Q420,70,450,115"/><path d="M480,165Q480,230,445,262"/><path d="M390,290Q300,320,215,292"/><path d="M160,262Q120,220,125,175"/><path d="M160,115Q200,65,270,58"/></g>${pic.join("")}${P.map((p,i)=>T(p[0],p[1]+(i==0?42:i==4?-35:34),p[2])).join("")}${T(300,180,"Metamorphosis","middle","font-size:15px;font-weight:800;opacity:.6")}`)};}

/* Guitar */
D.guitar={t:"Parts of an acoustic guitar",c:"Plucking a string makes it vibrate. The vibration passes through the bridge to the hollow wooden body, which makes the sound louder. Pressing a string against a fret shortens it and raises the note.",
svg:S(`<path d="M120,170C120,110,170,95,215,110C240,118,250,130,270,128C290,126,300,105,340,105C400,105,430,140,430,170C430,200,400,235,340,235C300,235,290,214,270,212C250,210,240,222,215,230C170,245,120,230,120,170Z" fill="#d97706" stroke="#92400e" stroke-width="3"/>
<circle cx="270" cy="170" r="24" fill="#3f2a1d"/><rect x="345" y="160" width="14" height="22" rx="3" fill="#3f2a1d"/>
<rect x="60" y="160" width="140" height="22" fill="#57351f"/><g stroke="#cbd5e1" stroke-width="2">${[0,1,2,3,4,5,6,7,8,9].map(i=>`<line x1="${190-i*13}" y1="160" x2="${190-i*13}" y2="182"/>`).join("")}</g><rect x="56" y="158" width="5" height="26" fill="#f5f5dc"/>
<path d="M56,155L10,148L6,194L56,187Z" fill="#57351f"/><g fill="#d1d5db">${[150,165,180].map(y=>`<circle cx="22" cy="${y-2}" r="5"/><circle cx="40" cy="${y-2}" r="5"/>`).join("")}</g>
<g stroke="#e5e7eb" stroke-width="1">${[163,166,169,172,175,178].map(y=>`<line x1="20" y1="${y}" x2="352" y2="${y}"/>`).join("")}</g>
${L(22,148,0,100,"Headstock and tuning pegs")}${L(58,170,70,230,"Nut")}${L(150,162,150,100,"Neck and frets")}${L(270,175,270,290,"Sound hole","middle")}${L(352,170,470,120,"Bridge: holds the strings")}${L(410,190,470,220,"Body: hollow wooden box")}${L(300,166,330,60,"Six strings")}`)};

/* Telescopes */
D.scope={t:"How telescopes work",c:"A refracting telescope uses lenses to bend light to a focus. A reflecting telescope, like Isaac Newton’s design, uses a curved mirror instead. Bigger lenses and mirrors collect more light, showing fainter objects.",
svg:S(`${arrow("sc","#f59e0b")}<rect x="40" y="50" width="480" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><ellipse cx="60" cy="85" rx="10" ry="34" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/><ellipse cx="500" cy="85" rx="6" ry="16" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
<g stroke="#f59e0b" stroke-width="2" fill="none"><path d="M0,60H60L440,85L500,95H560" marker-end="url(#sc)"/><path d="M0,110H60L440,85L500,75H560" marker-end="url(#sc)"/></g>
<rect x="40" y="200" width="480" height="90" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><path d="M505,205q20,40,0,80" fill="none" stroke="#64748b" stroke-width="7"/><line x1="140" y1="235" x2="160" y2="255" stroke="#64748b" stroke-width="5"/><rect x="138" y="160" width="24" height="40" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="150" cy="170" rx="10" ry="4" fill="#bae6fd" stroke="#0284c7"/>
<g stroke="#f59e0b" stroke-width="2" fill="none"><path d="M0,215H508L150,245L150,165" marker-end="url(#sc)"/><path d="M0,275H508L150,245"/></g>
${T(280,40,"Refracting telescope","middle","font-weight:800")}${T(280,320,"Reflecting telescope","middle","font-weight:800")}${L(60,52,60,20,"Objective lens","middle")}${L(500,70,600,40,"Eyepiece lens")}${L(512,245,600,240,"Curved primary mirror")}${L(152,247,240,175,"Flat secondary mirror")}${L(160,170,240,145,"Eyepiece")}`)};

/* GPS */
{const sat=(x,y)=>`<g transform="translate(${x},${y})"><rect x="-8" y="-8" width="16" height="16" fill="#94a3b8"/><rect x="-34" y="-5" width="24" height="10" fill="#2563eb"/><rect x="10" y="-5" width="24" height="10" fill="#2563eb"/></g>`;
const S4=[[90,60],[250,30],[420,40],[560,90]];
D.gps={t:"How GPS finds your position",c:"Each GPS satellite broadcasts its position and the exact time from an atomic clock. A receiver measures how long each signal took to arrive and works out its distance from each satellite. With signals from at least four satellites, it can calculate where it is and the precise time.",
svg:S(`<path d="M-20,340Q300,200,620,340Z" fill="#4ade80" fill-opacity=".5" stroke="#15803d" stroke-width="2"/>${S4.map(s=>`<line x1="${s[0]}" y1="${s[1]}" x2="300" y2="262" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 5"/>`).join("")}${S4.map(s=>sat(s[0],s[1])).join("")}
<rect x="290" y="250" width="20" height="30" rx="4" fill="#111"/><rect x="293" y="254" width="14" height="16" fill="#38bdf8"/>
${L(90,60,20,115,"GPS satellite: about 20,200 km up")}${L(420,48,470,150,"Signal: time and position")}${L(305,265,400,300,"Receiver, such as a phone")}${L(360,180,520,200,"Distance = travel time × speed of light")}`)};}

/* Food chain */
{const N=[["☀️","Sun","energy source"],["🌾","Rice plants","producer"],["🦗","Grasshopper","1st consumer"],["🐸","Frog","2nd consumer"],["🐍","Snake","3rd consumer"],["🦅","Philippine eagle","top predator"]];
D.eco={t:"A food chain",c:"A food chain shows how energy passes from one living thing to another as each is eaten. Arrows point from the food to the eater. Only about a tenth of the energy at each level passes to the next, which is why top predators are rare. Decomposers, such as fungi and bacteria, recycle every level.",
svg:S(`${arrow("ec","currentColor")}${N.map((n,i)=>{const x=40+i*104;return T(x,140,n[0],"middle","font-size:44px")+T(x,180,n[1],"middle","font-weight:800")+T(x,196,n[2],"middle","opacity:.7;font-weight:400;font-size:11px")+(i<5?`<line x1="${x+30}" y1="125" x2="${x+72}" y2="125" stroke="currentColor" stroke-width="2.5" marker-end="url(#ec)"/>`:"")}).join("")}
<rect x="40" y="245" width="520" height="40" rx="10" fill="#a16207" fill-opacity=".25" stroke="#a16207"/>${T(300,270,"🍄 Decomposers break down dead plants and animals, returning nutrients to the soil")}<g stroke="#a16207" stroke-dasharray="3 4">${[144,248,352,456,560].map(x=>`<line x1="${x}" y1="205" x2="${x}" y2="243"/>`).join("")}</g>`)};}

Object.assign(window.DIAG,D);
})();
