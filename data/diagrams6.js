// Diagrams for batteries, states of matter, the rock cycle, metamorphosis, the steam engine,
// the camera, nuclear power, the Panama Canal and how dengue spreads.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const box=(x,y,w,h,f,t,t2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}" stroke="#475569"/>${T(x+w/2,y+h/2+(t2?-4:5),t,"middle","font-weight:700;"+K)}${t2?T(x+w/2,y+h/2+14,t2,"middle","font-size:12px;"+K):""}`;
const node=(x,y,r,f,t)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="#475569" stroke-width="2"/>${T(x,y+5,t,"middle","font-weight:700;"+K)}`;

/* Battery */
D.battery={t:"How a battery makes a current",c:"A battery has two electrodes in a chemical called an electrolyte. A chemical reaction at the negative electrode (anode) releases electrons, which flow through the outside wire to the positive electrode (cathode), powering the bulb on the way. Inside the battery, charged atoms called ions move through the electrolyte to balance the flow. Recharging pushes everything back the other way.",
svg:S(`${arrow("ba","#2563eb")}${arrow("bi","#b45309")}
<rect x="100" y="130" width="420" height="170" rx="14" fill="#e0f2fe" stroke="#475569" stroke-width="2"/>
<rect x="130" y="145" width="70" height="140" rx="6" fill="#94a3b8" stroke="#334155" stroke-width="2"/>${T(165,222,"−","middle","font-size:30px;font-weight:800;"+K)}
<rect x="420" y="145" width="70" height="140" rx="6" fill="#fca5a5" stroke="#991b1b" stroke-width="2"/>${T(455,224,"+","middle","font-size:30px;font-weight:800;"+K)}
<path d="M165,145 V60 H280" stroke="#334155" stroke-width="4" fill="none"/><path d="M340,60 H455 V145" stroke="#334155" stroke-width="4" fill="none"/>
<circle cx="310" cy="60" r="28" fill="#fef08a" stroke="#a16207" stroke-width="2"/><path d="M296,64 l7,-12 l7,18 l7,-12" stroke="#a16207" stroke-width="2.5" fill="none"/>
<g stroke="#2563eb" stroke-width="3" marker-end="url(#ba)"><line x1="175" y1="110" x2="175" y2="80"/><line x1="210" y1="48" x2="255" y2="48"/><line x1="365" y1="48" x2="410" y2="48"/><line x1="445" y1="80" x2="445" y2="110"/></g>
<g fill="#2563eb">${[[200,60],[230,60],[380,60],[420,60]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join("")}</g>
<g stroke="#b45309" stroke-width="3" marker-end="url(#bi)"><line x1="225" y1="190" x2="395" y2="190"/><line x1="225" y1="245" x2="395" y2="245"/></g>
<g fill="#fdba74" stroke="#b45309">${[260,320,370].map(x=>`<circle cx="${x}" cy="217" r="8"/>`).join("")}</g>
${L(130,200,40,200,"Anode (−)")}${L(490,200,580,200,"Cathode (+)")}${L(338,60,560,90,"Bulb lights up")}${L(200,60,40,40,"Electrons flow through the wire")}${L(320,290,320,325,"Ions move through the electrolyte inside","middle")}`,335)};

/* States of matter */
const grid=(x0,y0)=>{let s="";for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+=`<circle cx="${x0+18+c*34}" cy="${y0+22+r*30}" r="12"/>`;return s};
const loose=[[22,96],[52,104],[86,98],[118,104],[150,96],[178,104],[36,74],[70,76],[104,80],[138,74],[166,78],[56,50],[124,54]];
const gas=[[30,30],[120,20],[170,70],[60,90],[140,110],[20,115],[95,60]];
D.states={t:"Solid, liquid and gas",c:"All matter is made of tiny particles that are always moving. In a solid they are packed tightly and only vibrate, so it keeps its shape. In a liquid they slide past each other, so it flows and takes the shape of its container. In a gas they move fast and far apart, filling any space. Heating or cooling changes one state into another.",
svg:S(`${arrow("st","#475569")}
<rect x="-150" y="60" width="200" height="140" rx="10" fill="#e0e7ff" stroke="#475569" stroke-width="2"/>
<rect x="230" y="60" width="200" height="140" rx="10" fill="#dbeafe" stroke="#475569" stroke-width="2"/>
<rect x="580" y="60" width="200" height="140" rx="10" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
<g fill="#6366f1" stroke="#3730a3">${grid(-150,60)}</g>
<path d="M232,110 Q330,100 428,110 V198 H232 Z" fill="#93c5fd" fill-opacity=".6"/>
<g fill="#3b82f6" stroke="#1e3a8a">${loose.map(([x,y])=>`<circle cx="${230+x}" cy="${60+y}" r="12"/>`).join("")}</g>
<g fill="#94a3b8" stroke="#334155">${gas.map(([x,y])=>`<circle cx="${590+x}" cy="${60+y}" r="11"/>`).join("")}</g>
${T(-50,40,"Solid","middle","font-weight:800;font-size:15px")}${T(330,40,"Liquid","middle","font-weight:800;font-size:15px")}${T(680,40,"Gas","middle","font-weight:800;font-size:15px")}
<g stroke="#dc2626" stroke-width="3" marker-end="url(#st)"><line x1="60" y1="110" x2="220" y2="110"/><line x1="440" y1="110" x2="570" y2="110"/></g>
<g stroke="#2563eb" stroke-width="3" marker-end="url(#st)"><line x1="220" y1="160" x2="60" y2="160"/><line x1="570" y1="160" x2="440" y2="160"/></g>
${T(140,100,"Melting","middle","fill:#dc2626")}${T(140,180,"Freezing","middle","fill:#2563eb")}${T(505,100,"Boiling","middle","fill:#dc2626")}${T(505,180,"Condensing","middle","fill:#2563eb")}
${L(-50,200,-50,250,"Particles packed tight, only vibrate","middle")}${L(330,200,330,250,"Particles slide past each other","middle")}${L(680,200,680,250,"Particles fast and far apart","middle")}
${T(310,300,"Heating (red) adds energy. Cooling (blue) takes it away.","middle","font-weight:700")}`,320)};

/* Rock cycle */
D.rocks={t:"The rock cycle",c:"Rocks slowly change from one kind to another over millions of years. Igneous rock forms when melted rock (magma or lava) cools. Weathering breaks rocks into sediment that is pressed into sedimentary rock. Heat and pressure deep underground turn rocks into metamorphic rock, and enough heat melts them back into magma.",
svg:S(`${arrow("rc","#475569")}
${box(-110,40,190,70,"#fecaca","Igneous rock","e.g. granite, basalt")}
${box(520,40,190,70,"#fde68a","Sedimentary rock","e.g. sandstone, limestone")}
${box(520,250,190,70,"#ddd6fe","Metamorphic rock","e.g. marble, slate")}
${box(-110,250,190,70,"#fb923c","Magma","melted rock")}
<g stroke="#475569" stroke-width="3" fill="none" marker-end="url(#rc)"><line x1="85" y1="75" x2="512" y2="75"/><line x1="615" y1="115" x2="615" y2="242"/><line x1="515" y1="285" x2="88" y2="285"/><line x1="-15" y1="245" x2="-15" y2="118"/><line x1="85" y1="105" x2="512" y2="258"/></g>
${T(300,62,"Weathering, erosion, then pressing together","middle","font-weight:700")}
${T(625,185,"Heat and pressure","start","font-weight:700")}
${T(300,305,"Melting deep underground","middle","font-weight:700")}
${T(-25,185,"Cooling","end","font-weight:700")}
${T(320,160,"Heat and pressure","middle","font-weight:700")}`,335)};

/* Butterfly life cycle */
D.metamorph={t:"Complete metamorphosis of a butterfly",c:"A butterfly goes through four very different stages. A tiny egg hatches into a caterpillar (larva) that eats and grows. It then forms a chrysalis (pupa), inside which its body is rebuilt. Finally an adult butterfly emerges, mates and lays eggs, starting the cycle again. Frogs go through a different kind of metamorphosis, from tadpole to adult.",
svg:S(`${arrow("mt","#475569")}
<circle cx="310" cy="185" r="125" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 6"/>
<g stroke="#475569" stroke-width="3" fill="none" marker-end="url(#mt)"><path d="M380,82 A125,125 0 0,1 420,130"/><path d="M420,240 A125,125 0 0,1 380,290"/><path d="M240,290 A125,125 0 0,1 200,240"/><path d="M200,130 A125,125 0 0,1 240,82"/></g>
<g fill="#fef9c3" stroke="#a16207" stroke-width="2"><ellipse cx="300" cy="62" rx="9" ry="12"/><ellipse cx="322" cy="62" rx="9" ry="12"/><ellipse cx="311" cy="40" rx="9" ry="12"/></g>
<g fill="#86efac" stroke="#15803d" stroke-width="2">${[0,1,2,3,4,5].map(i=>`<circle cx="${405+i*14}" cy="${185+(i%2?-4:4)}" r="9"/>`).join("")}</g><circle cx="490" cy="180" r="10" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
<line x1="270" y1="290" x2="350" y2="290" stroke="#78350f" stroke-width="4"/><path d="M310,292 q-18,20 -10,45 q10,10 20,0 q8,-25 -10,-45z" fill="#a3e635" stroke="#4d7c0f" stroke-width="2"/>
<g stroke="#7c2d12" stroke-width="2"><path d="M140,185 q-35,-40 -60,-15 q5,30 60,15z" fill="#fb923c"/><path d="M140,185 q35,-40 60,-15 q-5,30 -60,15z" fill="#fb923c"/><path d="M140,188 q-25,25 -40,15 q0,-12 40,-15z" fill="#fdba74"/><path d="M140,188 q25,25 40,15 q0,-12 -40,-15z" fill="#fdba74"/><line x1="140" y1="168" x2="140" y2="205"/></g>
${L(330,50,470,40,"1. Egg on a leaf")}${L(510,180,600,180,"2. Caterpillar (larva)")}${L(330,320,460,325,"3. Chrysalis (pupa)")}${L(85,175,-30,120,"4. Adult butterfly")}`,345)};

/* Steam engine */
D.steam={t:"How a steam engine works",c:"A fire heats water in a boiler until it turns to steam. The steam is let into a cylinder, where its pressure pushes a piston. Valves send steam to each side in turn, so the piston moves back and forth. A rod and crank turn this into the spinning of a wheel, which can drive machines, pumps or a locomotive.",
svg:S(`${arrow("sm","#475569")}
<rect x="-150" y="120" width="210" height="140" rx="40" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
<path d="M-140,200 H50 V230 Q50,250 20,250 H-110 Q-140,250 -140,230 Z" fill="#93c5fd"/>
<g fill="#f97316" stroke="#c2410c"><path d="M-120,300 q10,-30 20,-5 q10,-35 25,0 q10,-30 20,-5 q12,-35 25,0 q10,-30 20,-5 q12,-30 20,5 z"/></g>
<path d="M60,150 H200 V170" stroke="#64748b" stroke-width="12" fill="none"/>
<rect x="190" y="160" width="250" height="80" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
<rect x="300" y="165" width="26" height="70" fill="#64748b" stroke="#334155"/>
<rect x="326" y="194" width="180" height="12" fill="#475569"/>
<circle cx="610" cy="200" r="95" fill="none" stroke="#334155" stroke-width="10"/><circle cx="610" cy="200" r="12" fill="#334155"/>
<g stroke="#334155" stroke-width="5">${[0,45,90,135].map(a=>{const r=a*Math.PI/180;return `<line x1="${610-95*Math.cos(r)}" y1="${200-95*Math.sin(r)}" x2="${610+95*Math.cos(r)}" y2="${200+95*Math.sin(r)}"/>`}).join("")}</g>
<line x1="506" y1="200" x2="610" y2="150" stroke="#475569" stroke-width="10"/><circle cx="610" cy="150" r="8" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
<g stroke="#e2e8f0" stroke-width="2" fill="none"><path d="M220,190 q10,-10 20,0 q10,10 20,0 q10,-10 20,0"/><path d="M220,215 q10,-10 20,0 q10,10 20,0 q10,-10 20,0"/></g>
<g stroke="#475569" stroke-width="3" marker-end="url(#sm)"><line x1="350" y1="270" x2="410" y2="270"/><line x1="350" y1="270" x2="290" y2="270"/></g>
<path d="M720,120 A110,110 0 0,1 725,260" stroke="#475569" stroke-width="3" fill="none" marker-end="url(#sm)"/>
${L(-45,200,-45,80,"Boiler: water turns to steam","middle")}${L(-50,290,-50,325,"Fire heats the water","middle")}${L(130,150,130,95,"Steam pipe","middle")}${L(250,215,250,320,"Steam pushes the piston","middle")}${L(350,270,350,300,"Back and forth","middle")}${L(560,175,500,110,"Crank turns the wheel")}`,335)};

/* Camera */
D.camera={t:"How a camera forms an image",c:"Light from a scene enters the camera through a lens, which bends the rays so they meet again on the image sensor (or film) at the back. The picture formed there is upside down, and the camera’s electronics flip it the right way. The aperture controls how much light gets in and the shutter controls for how long.",
svg:S(`<rect x="200" y="85" width="440" height="215" rx="14" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
<line x1="-150" y1="190" x2="660" y2="190" stroke="#94a3b8" stroke-dasharray="4 5"/>
<path d="M-110,190 V100" stroke="#15803d" stroke-width="6"/><path d="M-110,80 l-30,45 h60 z" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
<ellipse cx="290" cy="190" rx="16" ry="85" fill="#bae6fd" fill-opacity=".8" stroke="#0369a1" stroke-width="2"/>
<rect x="240" y="100" width="10" height="45" fill="#334155"/><rect x="240" y="235" width="10" height="45" fill="#334155"/>
<rect x="600" y="110" width="14" height="170" fill="#334155"/>
<g stroke="#f59e0b" stroke-width="2.5" fill="none"><path d="M-110,80 L290,190 L600,275"/><path d="M-110,80 L290,110 L600,275"/><path d="M-110,190 L600,190"/></g>
<path d="M590,190 V275" stroke="#15803d" stroke-width="6"/><path d="M590,282 l-14,-22 h28 z" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
${L(-110,130,-60,250,"Object (a tree)")}${L(290,105,330,60,"Lens bends the light")}${L(245,265,170,320,"Aperture lets light in","middle")}${L(607,140,680,60,"Image sensor")}${L(590,255,560,325,"Upside-down image","middle")}`,335)};

/* Nuclear power plant */
D.nuclear={t:"How a nuclear power plant makes electricity",c:"In the reactor, uranium atoms split (fission) and release heat. The heat boils water into steam, which spins a turbine connected to a generator that produces electricity. The steam is then cooled back into water, often using a cooling tower or water from a river or the sea, and the water is used again. The fuel stays sealed inside a thick containment building.",
svg:S(`${arrow("nu","#475569")}
<path d="M-150,300 V170 Q-150,90 -60,90 Q30,90 30,170 V300 Z" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
<rect x="-110" y="190" width="100" height="100" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
<g fill="#f97316">${[-95,-75,-55,-35].map(x=>`<rect x="${x}" y="205" width="10" height="70" rx="3"/>`).join("")}</g>
<rect x="90" y="150" width="90" height="140" rx="10" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
<path d="M-10,220 H90 M-10,260 H90" stroke="#dc2626" stroke-width="5"/>
<path d="M180,170 H270" stroke="#94a3b8" stroke-width="10"/>
<path d="M270,140 L370,165 V215 L270,240 Z" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
<rect x="370" y="183" width="60" height="14" fill="#475569"/>
<rect x="430" y="150" width="100" height="80" rx="10" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>${T(480,195,"G","middle","font-weight:800;font-size:22px;"+K)}
<path d="M530,190 H600" stroke="#ca8a04" stroke-width="4"/><path d="M600,300 L620,130 H640 L660,300 Z M605,170 H655 M610,210 H650" stroke="#475569" stroke-width="3" fill="none"/><path d="M630,130 V105 M640,130 h80" stroke="#ca8a04" stroke-width="3"/>
<path d="M320,240 V275 H405" stroke="#94a3b8" stroke-width="6" fill="none"/><path d="M405,310 H135 V290" stroke="#3b82f6" stroke-width="6" fill="none"/>
<path d="M250,320 Q262,265 240,240 H330 Q308,265 320,320 Z" fill="#e2e8f0" stroke="#475569" stroke-width="2" transform="translate(150,0)"/>
${L(-60,100,-60,50,"Containment building","middle")}${L(-60,280,-60,322,"Reactor: fission makes heat","middle")}${L(135,160,135,70,"Water boils to steam","middle")}${L(320,160,320,110,"Turbine spins","middle")}${L(480,150,480,100,"Generator","middle")}${L(650,110,640,60,"Electricity to the grid","middle")}${L(435,280,560,320,"Cooling turns steam back to water")}`,335)};

/* Panama Canal locks */
D.panamacountry={t:"How the Panama Canal lifts ships",c:"The Panama Canal crosses the isthmus by climbing over it. Ships are raised in water-filled chambers called locks to Gatun Lake, about 26 meters above sea level, sail across, and are lowered again on the other side. Each lock is filled and emptied by gravity using fresh water from the lake. Larger locks opened in 2016 work the same way.",
svg:S(`${arrow("pc","#475569")}
<path d="M-170,300 V250 H40 V215 H90 V180 H140 V140 H440 V180 H490 V215 H560 V250 H790 V300 Z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>
<path d="M-170,250 H40 V300 H-170Z M560,250 H790 V300 H560Z" fill="#60a5fa"/>
<rect x="40" y="215" width="50" height="35" fill="#60a5fa"/><rect x="90" y="180" width="50" height="70" fill="#60a5fa"/><rect x="140" y="140" width="300" height="110" fill="#60a5fa" fill-opacity=".85"/><rect x="440" y="180" width="50" height="70" fill="#60a5fa"/><rect x="490" y="215" width="70" height="35" fill="#60a5fa"/>
<rect x="40" y="250" width="520" height="50" fill="#a8a29e"/>
<g stroke="#334155" stroke-width="4">${[40,90,140,440,490,560].map(x=>`<line x1="${x}" y1="${x<300?(x==40?215:x==90?180:140):(x==440?140:x==490?180:215)}" x2="${x}" y2="250"/>`).join("")}</g>
<g transform="translate(250,118)"><path d="M0,22 H80 L70,36 H10 Z" fill="#f8fafc" stroke="#334155" stroke-width="2"/><rect x="25" y="8" width="30" height="14" fill="#fca5a5" stroke="#334155"/></g>
${T(-70,280,"Atlantic side (Caribbean Sea)","middle","font-weight:700;"+K)}${T(680,280,"Pacific Ocean","middle","font-weight:700;"+K)}
${L(115,180,60,90,"Gatun Locks: 3 steps up","middle")}${L(290,200,290,95,"Gatun Lake, about 26 m above sea level","middle")}${L(465,180,500,110,"Pedro Miguel Locks: 1 step")}${L(525,215,600,170,"Miraflores Locks: 2 steps")}`,310)};

/* Dengue transmission */
const cyc=(id,col)=>`${arrow(id,col)}`;
D.dengue={t:"How dengue spreads",c:"Dengue is not passed directly from person to person. An Aedes mosquito picks up the virus when it bites an infected person. After about a week the virus has multiplied in the mosquito, which can then pass it on to everyone it bites for the rest of its life. Symptoms usually appear 4 to 10 days after an infected bite. Removing standing water where mosquitoes breed helps break the cycle.",
svg:S(`${cyc("dn","#475569")}
${box(-140,40,220,70,"#fee2e2","1. Infected person","virus in the blood")}
${box(520,40,240,70,"#fef3c7","2. Mosquito bites","and picks up the virus")}
${box(520,240,240,70,"#fde68a","3. Virus multiplies","in the mosquito, about a week")}
${box(-140,240,220,70,"#dcfce7","4. Mosquito bites","a healthy person")}
<g stroke="#475569" stroke-width="3" fill="none" marker-end="url(#dn)"><line x1="85" y1="75" x2="512" y2="75"/><line x1="640" y1="115" x2="640" y2="232"/><line x1="515" y1="275" x2="88" y2="275"/><line x1="-30" y1="235" x2="-30" y2="118"/></g>
<g transform="translate(310,180)"><ellipse cx="0" cy="0" rx="44" ry="11" fill="#1f2937"/><circle cx="-50" cy="-2" r="9" fill="#1f2937"/><line x1="-58" y1="0" x2="-82" y2="8" stroke="#1f2937" stroke-width="2"/>
<g fill="#f8fafc">${[-28,-12,4,20].map(x=>`<rect x="${x}" y="-4" width="6" height="8"/>`).join("")}</g>
<g stroke="#1f2937" stroke-width="2" fill="none"><path d="M-20,8 l-15,30 M0,8 l-5,32 M20,8 l12,30"/></g>
<path d="M-10,-8 q-30,-50 -70,-40 q20,20 70,40z M5,-8 q30,-50 70,-40 q-20,20 -70,40z" fill="#cbd5e1" fill-opacity=".7" stroke="#64748b"/></g>
${T(310,250,"Aedes mosquito: black with white markings","middle","font-weight:700")}
${T(-20,170,"Symptoms in 4 to 10 days","start","font-weight:700")}`,320)};
D.mosquito=D.dengue;

Object.assign(window.DIAG,D);
})();
