// Diagrams for Kepler's laws, comets, star life cycles, pulsars, the Hubble Space Telescope, the gold foil experiment, the water molecule and neural networks.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Kepler's laws */
D.keplerlaws={t:"Kepler’s first two laws",c:"Planets move in ellipses with the Sun at one focus, not the center. A line from the Sun to the planet sweeps out equal areas in equal times, so the planet moves faster when close to the Sun and slower when far away. The ellipse here is stretched much more than real planetary orbits.",
svg:S(`${arrow("kp","#dc2626")}
<ellipse cx="300" cy="170" rx="330" ry="140" fill="none" stroke="currentColor" stroke-width="2" opacity=".6"/>
<path d="M2,170 L187,38.4 A330,140 0 0,0 187,301.6z" fill="#f97316" opacity=".45"/>
<path d="M2,170 L623.9,143.3 A330,140 0 0,1 623.9,196.7z" fill="#38bdf8" opacity=".6"/>
<circle cx="2" cy="170" r="22" fill="#fde047" stroke="#f59e0b" stroke-width="3"/>
<circle cx="599" cy="170" r="4" fill="currentColor" opacity=".6"/>
<circle cx="-30" cy="170" r="11" fill="#2563eb"/><circle cx="630" cy="170" r="11" fill="#2563eb"/>
<path d="M-40,190 q0,40 25,70" stroke="#dc2626" stroke-width="3" fill="none" marker-end="url(#kp)"/>${T(-50,300,"Fast near the Sun","middle")}
<path d="M642,175 q2,10 0,18" stroke="#dc2626" stroke-width="3" fill="none" marker-end="url(#kp)"/>${T(600,240,"Slow far away","middle")}
${L(2,148,40,20,"Sun at one focus")}${L(599,170,560,110,"Empty second focus","middle")}${L(110,170,250,170,"Equal areas swept in equal times")}`,340)};

/* Comet */
D.comet={t:"The parts of a comet",c:"A comet is a frozen lump of ice and dust. As it nears the Sun, heat turns ice to gas, forming a glowing cloud called the coma and two tails that always point away from the Sun: a straight blue gas tail pushed by the solar wind and a curved, whitish dust tail.",
svg:S(`<circle cx="-110" cy="170" r="45" fill="#fde047" stroke="#f59e0b" stroke-width="3"/>${T(-110,176,"Sun","middle",K)}
<g stroke="#fbbf24" stroke-width="2" opacity=".6">${[-30,-15,0,15,30].map(a=>`<line x1="-60" y1="${170+a}" x2="60" y2="${170+a*1.5}"/>`).join("")}</g>
<circle cx="140" cy="170" r="55" fill="#e0f2fe" opacity=".7"/>
<circle cx="140" cy="170" r="14" fill="#475569" stroke="#0f172a" stroke-width="2"/>
<path d="M190,155 L760,90 L760,130 L190,180z" fill="#60a5fa" opacity=".55"/>
<path d="M190,175 Q450,230 740,300 L700,320 Q430,250 190,190z" fill="#fef3c7" stroke="#d97706" opacity=".8"/>
${L(140,170,140,300,"Nucleus: frozen ice and dust, a few kilometers wide","middle")}${L(110,130,110,50,"Coma: a glowing cloud of gas","middle")}${L(560,112,560,50,"Ion tail: gas pushed straight back by the solar wind","middle")}${L(560,255,520,320,"Dust tail: curved and whitish","middle")}`,340)};

/* Star life cycle */
{const st=(x,y,r,f,s,lab)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${s}" stroke-width="2"/>${T(x,y+r+18,lab,"middle")}`;
D.whitedwarfs={t:"The life cycle of stars",c:"All stars are born in clouds of gas and dust. A star like the Sun swells into a red giant, puffs off its outer layers as a planetary nebula and leaves a white dwarf. A star more than about eight times the Sun’s mass becomes a red supergiant and explodes as a supernova, leaving a neutron star or a black hole.",
svg:S(`${arrow("sl","#64748b")}
<ellipse cx="-90" cy="170" rx="70" ry="50" fill="#c4b5fd" opacity=".7"/>${T(-90,240,"Nebula","middle")}
${st(80,90,26,"#fde047","#f59e0b","Sun-like star")}${st(230,90,42,"#f97316","#c2410c","Red giant")}
<circle cx="400" cy="90" r="38" fill="none" stroke="#22d3ee" stroke-width="10" opacity=".7"/>${T(400,148,"Planetary nebula","middle")}
${st(560,90,10,"#f8fafc","#64748b","White dwarf")}
${st(80,250,32,"#93c5fd","#1d4ed8","Massive star")}${st(230,250,52,"#ef4444","#991b1b","Red supergiant")}
<path d="M400,250 l12,-30 l8,26 l26,-14 l-14,26 l30,8 l-30,8 l14,26 l-26,-14 l-8,26 l-12,-30 l-12,30 l-8,-26 l-26,14 l14,-26 l-30,-8 l30,-8 l-14,-26 l26,14 l8,-26z" fill="#facc15" stroke="#ea580c" stroke-width="2"/>${T(400,320,"Supernova","middle")}
${st(560,220,8,"#bfdbfe","#1d4ed8","Neutron star")}<circle cx="680" cy="275" r="20" fill="#0f172a" stroke="#f97316" stroke-width="3"/>${T(680,315,"Black hole","middle")}
<g stroke="#64748b" stroke-width="2.5" fill="none" marker-end="url(#sl)"><path d="M-30,150 L48,100"/><path d="M-30,190 L42,240"/><path d="M110,90 H180"/><path d="M276,90 H355"/><path d="M442,90 H540"/><path d="M116,250 H170"/><path d="M286,250 H355"/><path d="M450,240 L540,222"/><path d="M450,262 L652,275"/></g>`,335)};}

/* Pulsar */
D.pulsar={t:"How a pulsar flashes",c:"A pulsar is a spinning neutron star, only about 20 kilometers wide. Beams of radio waves and other radiation shoot out from its magnetic poles. Because the magnetic poles are tilted from the spin axis, the beams sweep around like a lighthouse, and we see a pulse each time one points at Earth.",
svg:S(`<line x1="250" y1="10" x2="250" y2="330" stroke="currentColor" stroke-dasharray="6 6" opacity=".6"/>
<path d="M250,170 L130,20 L190,10z" fill="#a78bfa" opacity=".6"/><path d="M250,170 L370,320 L310,330z" fill="#a78bfa" opacity=".6"/>
<g fill="none" stroke="#38bdf8" stroke-width="2" opacity=".7"><ellipse cx="250" cy="170" rx="60" ry="110" transform="rotate(-38 250 170)"/><ellipse cx="250" cy="170" rx="35" ry="70" transform="rotate(-38 250 170)"/></g>
<circle cx="250" cy="170" r="24" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"/>
<path d="M200,30 a60,18 0 1,0 100,0" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="690" cy="170" r="20" fill="#38bdf8" stroke="#0369a1" stroke-width="2"/>${T(690,210,"Earth","middle")}
${L(250,20,370,30,"Spin axis")}${L(160,40,30,60,"Beam of radiation","middle")}${L(300,110,450,100,"Magnetic field")}${L(250,170,450,170,"Neutron star, 20 km wide")}${L(690,190,620,280,"A pulse each time a beam sweeps past","middle")}`,340)};

/* Hubble Space Telescope */
D.hubblest={t:"How the Hubble Space Telescope works",c:"Light from distant objects enters the open end of the tube and hits the large primary mirror, 2.4 meters across. It reflects to a smaller secondary mirror, which bounces it back through a hole in the primary mirror to cameras and spectrographs. Solar panels provide power, and antennas send data to Earth.",
svg:S(`${arrow("hb","#f59e0b")}
<rect x="40" y="110" width="480" height="120" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="3"/>
<rect x="520" y="120" width="120" height="100" rx="6" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
<path d="M40,110 l-30,-20 M40,230 l-30,20" stroke="#475569" stroke-width="3"/>
<path d="M500,118 q-12,52 0,104" stroke="#0ea5e9" stroke-width="10" fill="none"/>
<rect x="160" y="152" width="10" height="36" fill="#0ea5e9"/>
<rect x="490" y="160" width="20" height="20" fill="#e2e8f0"/>
<g stroke="#f59e0b" stroke-width="2.5" fill="none"><path d="M-150,130 H495" marker-end="url(#hb)"/><path d="M-150,210 H495" marker-end="url(#hb)"/><path d="M495,130 L172,166"/><path d="M495,210 L172,174"/><path d="M172,170 H580" marker-end="url(#hb)"/></g>
<rect x="250" y="20" width="190" height="60" fill="#1e3a8a" stroke="#93c5fd"/><rect x="250" y="260" width="190" height="60" fill="#1e3a8a" stroke="#93c5fd"/>
<g stroke="#93c5fd" opacity=".6">${[0,1,2,3].map(i=>`<line x1="${250+i*48}" y1="20" x2="${250+i*48}" y2="80"/><line x1="${250+i*48}" y1="260" x2="${250+i*48}" y2="320"/>`).join("")}</g>
<line x1="345" y1="80" x2="345" y2="110" stroke="#475569" stroke-width="3"/><line x1="345" y1="230" x2="345" y2="260" stroke="#475569" stroke-width="3"/>
${T(-100,115,"Light from space","start")}
${L(505,200,600,280,"Primary mirror, 2.4 m wide")}${L(165,160,110,50,"Secondary mirror")}${L(600,140,690,100,"Instruments")}${L(440,50,560,40,"Solar panels")}${L(20,100,-60,60,"Open end of the tube","middle")}`,340)};

/* Gold foil experiment */
D.nucleusdisc={t:"Rutherford’s gold foil experiment",c:"Alpha particles were fired at a very thin sheet of gold. Most passed straight through, showing that atoms are mostly empty space. A few were deflected, and a very small number bounced almost straight back, which could only happen if each atom had a tiny, dense, positively charged nucleus.",
svg:S(`${arrow("gf","#dc2626")}
<rect x="-150" y="140" width="90" height="60" rx="6" fill="#94a3b8" stroke="#334155" stroke-width="2"/>${T(-105,175,"Source","middle",K)}
<rect x="150" y="60" width="14" height="220" fill="#facc15" stroke="#a16207"/>

<g stroke="#dc2626" stroke-width="2.5" fill="none" marker-end="url(#gf)">
<path d="M-60,160 H330"/><path d="M-60,170 H340"/><path d="M-60,180 H330"/>
<path d="M-60,165 H150 L320,70"/><path d="M-60,175 H150 L310,265"/><path d="M-60,170 H150 L20,90"/></g>
<g transform="translate(560,170)"><circle r="90" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="5 5"/><circle r="6" fill="#ef4444"/>
<g stroke="#dc2626" stroke-width="2" fill="none" marker-end="url(#gf)"><path d="M-110,-50 H100"/><path d="M-110,-15 Q-10,-15 60,-70"/><path d="M-110,0 L-12,0 L-100,40"/><path d="M-110,40 H100"/></g></g>
${T(560,290,"Close-up: one gold atom","middle")}
${L(157,70,200,30,"Thin gold foil")}${L(300,165,320,120,"Most pass straight through")}${L(290,232,260,320,"Some are deflected","middle")}${L(30,95,-60,60,"A few bounce back","middle")}${L(566,170,690,120,"Tiny nucleus")}`,340)};

/* Water molecule and hydrogen bonds */
{const mol=(x,y,r)=>`<g transform="translate(${x},${y}) rotate(${r})"><circle r="26" fill="#ef4444" stroke="#991b1b" stroke-width="2"/><circle cx="-24" cy="20" r="15" fill="#e2e8f0" stroke="#475569" stroke-width="2"/><circle cx="24" cy="20" r="15" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>${T(0,5,"O","middle","fill:#fff;font-weight:700")}${T(-24,25,"H","middle","fill:#0f172a;font-weight:700")}${T(24,25,"H","middle","fill:#0f172a;font-weight:700")}</g>`;
D.waterchem={t:"Water molecules and hydrogen bonds",c:"A water molecule has one oxygen atom and two hydrogen atoms at an angle of about 104.5 degrees. Oxygen pulls electrons more strongly, so it is slightly negative and the hydrogens slightly positive. The positive hydrogen of one molecule is attracted to the oxygen of another, forming weak links called hydrogen bonds, which give water many of its special properties.",
svg:S(`${mol(60,130,0)}${mol(200,90,140)}${mol(220,250,-60)}${mol(-60,240,30)}${mol(360,180,200)}
<g stroke="#2563eb" stroke-width="3" stroke-dasharray="4 5"><line x1="84" y1="150" x2="190" y2="110"/><line x1="40" y1="155" x2="-45" y2="215"/><line x1="80" y1="155" x2="200" y2="235"/><line x1="240" y1="230" x2="345" y2="195"/></g>
${T(60,92,"δ−","middle","font-weight:700")}${T(16,175,"δ+","middle","font-weight:700")}
${L(60,130,-90,60,"Oxygen: slightly negative","middle")}${L(84,150,500,60,"Hydrogen: slightly positive")}${L(135,130,500,130,"Hydrogen bond between molecules")}${L(220,250,500,250,"Each molecule is bent, about 104.5°")}`,330)};}

/* Neural network */
{const lay=[[-60,[80,170,260]],[160,[50,125,200,275]],[380,[50,125,200,275]],[600,[125,215]]];let lines="",nodes="";
for(let i=0;i<lay.length-1;i++){const [x1,ys1]=lay[i],[x2,ys2]=lay[i+1];ys1.forEach(a=>ys2.forEach(b=>lines+=`<line x1="${x1}" y1="${a}" x2="${x2}" y2="${b}" stroke="#94a3b8" stroke-width="1.5"/>`));}
const cols=["#86efac","#93c5fd","#93c5fd","#fca5a5"];lay.forEach(([x,ys],i)=>ys.forEach(y=>nodes+=`<circle cx="${x}" cy="${y}" r="20" fill="${cols[i]}" stroke="#334155" stroke-width="2"/>`));
D.neural={t:"A simple artificial neural network",c:"An artificial neural network passes numbers through layers of connected units. Each connection has a weight, a number the network adjusts during training. The input layer receives data such as the pixels of an image, hidden layers find patterns, and the output layer gives an answer, such as whether the picture shows a cat or a dog. Real networks can have billions of connections.",
svg:S(`${lines}${nodes}
${T(-60,320,"Input layer","middle")}${T(270,320,"Hidden layers","middle")}${T(600,320,"Output layer","middle")}
${T(-60,30,"Pixels in","middle")}${T(660,130,"Cat","start")}${T(660,220,"Dog","start")}
${L(270,88,270,18,"Each line is a weight adjusted during training","middle")}`,335)};}

Object.assign(window.DIAG,D);
})();
