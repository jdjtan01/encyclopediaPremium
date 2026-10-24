// Diagrams for the newer articles: tsunami, rocket, flower, the Sun and the neuron.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Tsunami */
D.tsunami={t:"How a tsunami travels",c:"An undersea earthquake suddenly lifts the seafloor and the water above it. In deep water the wave is low but very fast. As it reaches shallow water near the coast it slows down and piles up into a tall, destructive wave.",
svg:S(`${arrow("ta","#1d4ed8")}<rect x="-100" y="120" width="800" height="200" fill="#bfdbfe"/>
<path d="M-100,300L60,300L60,280L80,270L230,270Q430,262 540,150L585,98L700,98L700,320L-100,320Z" fill="#a8a29e" stroke="#78716c" stroke-width="2"/>
<path d="M60,300L80,270" stroke="#dc2626" stroke-width="3"/><path d="M70,300l0,-18" stroke="#dc2626" stroke-width="3" marker-end="url(#ta)"/>
<path d="M-100,120L20,120Q60,110 100,120L230,120Q280,106 330,120L420,120Q470,78 515,120L560,120" fill="none" stroke="#1d4ed8" stroke-width="3"/>
<g stroke="#1d4ed8" stroke-width="2" marker-end="url(#ta)"><line x1="40" y1="96" x2="110" y2="96"/><line x1="250" y1="92" x2="320" y2="92"/></g>
${T(640,140,"Land")}
${L(60,113,120,30,"Deep ocean: low, fast wave (about 800 km/h)","middle")}${L(300,111,330,62,"Wave slows and grows taller in shallow water","middle")}${L(505,90,560,45,"Floods the coast")}${L(72,283,190,322,"Earthquake suddenly lifts the seafloor")}`,340)};

/* Rocket */
D.rocket={t:"Inside a space rocket",c:"A typical two-stage rocket. The first stage lifts the rocket off the ground and falls away when its fuel runs out; the lighter upper stage then carries the payload into orbit. Rockets carry their own oxygen because there is no air in space.",
svg:S(`${arrow("ra","#e11d48")}
<path d="M300,18L280,62L320,62Z" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
<rect x="280" y="62" width="40" height="40" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
<rect x="276" y="102" width="48" height="70" fill="#e2e8f0" stroke="#475569" stroke-width="2"/><rect x="276" y="172" width="48" height="8" fill="#64748b"/>
<rect x="270" y="180" width="60" height="120" fill="#f8fafc" stroke="#475569" stroke-width="2"/><line x1="270" y1="238" x2="330" y2="238" stroke="#475569" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M270,262L250,300L270,300Z" fill="#475569"/><path d="M330,262L350,300L330,300Z" fill="#475569"/>
<path d="M282,300L276,318L296,318L292,300Z" fill="#334155"/><path d="M308,300L304,318L324,318L318,300Z" fill="#334155"/>
<path d="M276,318L300,356L324,318Z" fill="#fb923c"/><path d="M286,318L300,342L314,318Z" fill="#fde047"/>
<line x1="380" y1="320" x2="380" y2="210" stroke="#e11d48" stroke-width="3" marker-end="url(#ra)"/>${T(395,265,"Thrust","start","font-weight:700;fill:#e11d48")}
${L(300,40,420,32,"Nose cone protects the payload")}${L(320,82,420,72,"Payload: satellite or crew capsule")}${L(324,135,420,120,"Upper stage: carries the payload to orbit")}${L(330,200,420,168,"First stage: falls away when empty")}
${L(300,312,420,345,"Engines blast hot gas downward")}${L(272,210,150,210,"Liquid oxygen tank")}${L(272,268,150,268,"Fuel tank")}`,370)};

/* Flower */
D.flower={t:"Parts of a flower",c:"A typical flower cut in half. The stamens are the male parts, which make pollen; the pistil, made of the stigma, style and ovary, is the female part. After pollination, the ovules become seeds and the ovary often becomes a fruit.",
svg:S(`<path d="M300,350L300,236" stroke="#16a34a" stroke-width="8"/>
<path d="M298,232C240,220 190,150 210,90C250,120 280,180 298,232Z" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>
<path d="M302,232C360,220 410,150 390,90C350,120 320,180 302,232Z" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>
<path d="M300,240C270,240 250,255 245,270C270,262 285,252 300,246Z" fill="#4ade80" stroke="#15803d" stroke-width="2"/><path d="M300,240C330,240 350,255 355,270C330,262 315,252 300,246Z" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
<ellipse cx="300" cy="215" rx="24" ry="22" fill="#86efac" stroke="#15803d" stroke-width="2"/><g fill="#fef08a" stroke="#a16207"><circle cx="292" cy="210" r="5"/><circle cx="306" cy="212" r="5"/><circle cx="298" cy="224" r="5"/></g>
<path d="M300,193L300,128" stroke="#15803d" stroke-width="5"/><ellipse cx="300" cy="122" rx="12" ry="7" fill="#a3e635" stroke="#4d7c0f" stroke-width="2"/>
<g stroke="#a16207" stroke-width="2.5"><line x1="286" y1="226" x2="245" y2="135"/><line x1="314" y1="226" x2="355" y2="135"/></g><g fill="#facc15" stroke="#a16207" stroke-width="2"><ellipse cx="243" cy="130" rx="9" ry="6"/><ellipse cx="357" cy="130" rx="9" ry="6"/></g>
${L(300,120,420,60,"Stigma: sticky tip that catches pollen")}${L(300,160,420,110,"Style")}${L(322,212,440,190,"Ovary: becomes the fruit")}${L(306,212,440,240,"Ovule: becomes a seed")}
${L(243,128,140,72,"Anther: makes pollen")}${L(265,180,140,150,"Filament")}${L(215,150,130,210,"Petal: attracts pollinators")}${L(262,258,150,295,"Sepal: protected the bud")}`,360)};

/* The Sun */
D.sun={t:"Inside the Sun",c:"A cutaway of the Sun. Energy made by nuclear fusion in the core takes many thousands of years to work its way out through the radiative zone, then rises through the churning convective zone to the visible surface, the photosphere. Above lies the thin, very hot corona.",
svg:S(`<circle cx="300" cy="180" r="172" fill="#fde68a" opacity=".45"/><circle cx="300" cy="180" r="150" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
<path d="M300,180L300,30A150,150 0 0 1 450,180Z" fill="#f97316"/><path d="M300,180L300,75A105,105 0 0 1 405,180Z" fill="#fdba74"/><path d="M300,180L300,125A55,55 0 0 1 355,180Z" fill="#fef08a"/>
<g fill="none" stroke="#c2410c" stroke-width="1.5" opacity=".6"><path d="M330,60q12,12 0,24q-12,12 0,24"/><path d="M380,95q12,12 0,24q-12,12 0,24"/><path d="M420,140q12,12 0,24"/></g>
<ellipse cx="230" cy="235" rx="16" ry="11" fill="#7c2d12"/><ellipse cx="258" cy="252" rx="8" ry="6" fill="#7c2d12"/>
<path d="M162,128C130,95 118,140 150,150" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>
${L(400,26,520,26,"Corona: outer atmosphere")}${L(390,90,520,75,"Convective zone")}${L(357,123,520,130,"Radiative zone")}${L(321,160,520,185,"Core: nuclear fusion")}${L(406,286,520,290,"Photosphere: visible surface")}
${L(230,235,90,290,"Sunspot")}${L(140,118,60,60,"Prominence")}`,370)};

/* Neuron */
D.nervous={t:"A nerve cell (neuron)",c:"A neuron receives signals through its dendrites and sends them along its axon. The fatty myelin sheath makes signals travel faster. At the axon terminals, chemical messengers cross a tiny gap, the synapse, to the next cell.",
svg:S(`${arrow("na","#2563eb")}
<g stroke="#b91c1c" stroke-width="4" fill="none" stroke-linecap="round"><path d="M95,130L50,90L30,95M50,90L40,60"/><path d="M90,165L45,205L25,200M45,205L35,235"/><path d="M110,118L100,70L80,50M100,70L125,45"/><path d="M120,185L125,235L105,255M125,235L150,250"/><path d="M88,150L30,150"/></g>
<circle cx="120" cy="150" r="35" fill="#fca5a5" stroke="#b91c1c" stroke-width="3"/><circle cx="118" cy="148" r="12" fill="#7f1d1d"/>
<line x1="155" y1="150" x2="520" y2="150" stroke="#b91c1c" stroke-width="6"/>
<g fill="#fde68a" stroke="#ca8a04" stroke-width="2">${[180,255,330,405].map(x=>`<rect x="${x}" y="139" width="60" height="22" rx="10"/>`).join("")}</g>
<g stroke="#b91c1c" stroke-width="4" fill="none" stroke-linecap="round"><path d="M520,150L555,120M520,150L565,150M520,150L555,180"/></g><g fill="#b91c1c"><circle cx="558" cy="118" r="7"/><circle cx="569" cy="150" r="7"/><circle cx="558" cy="182" r="7"/></g>
<path d="M592,150L640,150M600,125L640,150M600,175L640,150" stroke="#7c3aed" stroke-width="5" fill="none" stroke-linecap="round"/>
<line x1="200" y1="112" x2="470" y2="112" stroke="#2563eb" stroke-width="3" marker-end="url(#na)"/>${T(335,104,"Signal","middle","font-weight:700;fill:#2563eb")}
${L(45,92,40,30,"Dendrites receive signals","middle")}${L(120,182,95,290,"Cell body","middle")}${L(118,148,220,262,"Nucleus")}${L(285,160,285,215,"Myelin sheath speeds the signal","middle")}${L(480,150,480,245,"Axon","middle")}${L(560,116,610,62,"Axon terminals","middle")}${L(582,150,650,290,"Synapse: gap to the next cell","middle")}`,310)};

Object.assign(window.DIAG,D);
})();
