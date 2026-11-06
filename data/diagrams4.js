// Diagrams for the November 2026 articles: the layers of the atmosphere, a fission chain reaction, a geothermal power plant and a food web.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;

/* Layers of the atmosphere */
D.atmosphere={t:"Layers of the atmosphere",c:"The atmosphere gets thinner with height. Weather happens in the lowest layer, the troposphere; the ozone layer lies in the stratosphere; meteors burn up in the mesosphere; and the International Space Station orbits in the thermosphere. Heights are approximate and vary with latitude.",
svg:S(`<rect x="0" y="250" width="520" height="60" fill="#bfdbfe"/><rect x="0" y="180" width="520" height="70" fill="#dbeafe"/><rect x="0" y="120" width="520" height="60" fill="#e0e7ff"/><rect x="0" y="40" width="520" height="80" fill="#ede9fe"/><rect x="0" y="0" width="520" height="40" fill="#f5f3ff"/>
<rect x="0" y="210" width="520" height="16" fill="#a5b4fc" opacity=".55"/>
<path d="M0,310L100,296L170,302L270,288L340,300L420,292L520,304L520,330L0,330Z" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
<path d="M70,296L100,262L130,296Z" fill="#a8a29e"/>
<ellipse cx="200" cy="272" rx="34" ry="12" fill="#fff" stroke="#94a3b8"/><ellipse cx="225" cy="266" rx="22" ry="10" fill="#fff" stroke="#94a3b8"/>
<path d="M380,262l40,-6l-6,4l14,0" stroke="#475569" stroke-width="3" fill="none"/>
<line x1="430" y1="140" x2="460" y2="160" stroke="#f97316" stroke-width="3"/><circle cx="462" cy="162" r="4" fill="#f97316"/>
<rect x="400" y="68" width="34" height="10" fill="#64748b"/><rect x="390" y="64" width="10" height="18" fill="#3b82f6"/><rect x="434" y="64" width="10" height="18" fill="#3b82f6"/>
<path d="M60,30Q120,10 180,34" stroke="#22c55e" stroke-width="4" fill="none" opacity=".7"/>
${T(260,292,"Troposphere: 0 to about 12 km","middle","font-weight:700")}${T(160,200,"Stratosphere: to about 50 km","middle","font-weight:700")}${T(160,154,"Mesosphere: to about 85 km","middle","font-weight:700")}${T(180,96,"Thermosphere: to about 600 km","middle","font-weight:700")}${T(360,24,"Exosphere: fades into space","middle","font-weight:700")}
${L(200,272,-20,270,"Clouds and weather")}${L(400,259,540,262,"Airliners fly near the top")}${L(480,218,540,218,"Ozone layer absorbs UV")}${L(460,160,540,150,"Meteors burn up")}${L(417,73,540,74,"Space station, about 400 km")}${L(120,22,-20,40,"Auroras")}`,330)};

/* Fission chain reaction */
const n=(x,y)=>`<circle cx="${x}" cy="${y}" r="7" fill="#94a3b8" stroke="#475569"/>`;
const U=(x,y,r=22)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#86efac" stroke="#15803d" stroke-width="2"/>`;
const F=(x,y)=>`<circle cx="${x}" cy="${y}" r="13" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/>`;
D.fission={t:"A nuclear chain reaction",c:"A neutron strikes a uranium-235 nucleus, which splits into two smaller nuclei, releasing energy and two or three more neutrons. These can split more nuclei, so the reaction grows. In a reactor, control rods absorb some neutrons to keep it steady.",
svg:S(`${arrow("fa","#475569")}
${n(-40,170)}<line x1="-30" y1="170" x2="18" y2="170" stroke="#475569" stroke-width="2" marker-end="url(#fa)"/>
${U(50,170)}${T(50,175,"U-235","middle","font-size:11px")}
<g stroke="#475569" stroke-width="2" marker-end="url(#fa)"><line x1="74" y1="160" x2="170" y2="90"/><line x1="76" y1="170" x2="170" y2="170"/><line x1="74" y1="180" x2="170" y2="250"/></g>
${F(110,120)}${F(110,222)}
<path d="M44,140l6,-14l6,14" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M36,146l-10,-10" stroke="#f59e0b" stroke-width="3"/><path d="M64,146l10,-10" stroke="#f59e0b" stroke-width="3"/>
${n(180,86)}${n(180,170)}${n(180,254)}
${U(240,86)}${U(240,170)}${U(240,254)}
<g stroke="#475569" stroke-width="2" marker-end="url(#fa)"><line x1="262" y1="78" x2="330" y2="40"/><line x1="264" y1="88" x2="330" y2="100"/><line x1="262" y1="164" x2="330" y2="146"/><line x1="264" y1="176" x2="330" y2="196"/><line x1="262" y1="248" x2="330" y2="236"/><line x1="264" y1="260" x2="330" y2="296"/></g>
${U(360,40,16)}${U(360,100,16)}${U(360,146,16)}${U(360,196,16)}${U(360,236,16)}${U(360,296,16)}
<g stroke="#475569" stroke-width="2" stroke-dasharray="4 3"><line x1="378" y1="40" x2="430" y2="30"/><line x1="378" y1="100" x2="430" y2="104"/><line x1="378" y1="146" x2="430" y2="140"/><line x1="378" y1="196" x2="430" y2="204"/><line x1="378" y1="236" x2="430" y2="232"/><line x1="378" y1="296" x2="430" y2="304"/></g>
${L(-40,163,-60,120,"Neutron","middle")}${L(50,192,40,300,"Uranium-235 nucleus","middle")}${L(110,107,150,40,"Smaller nuclei")}${L(48,128,-20,80,"Energy released")}${L(180,247,200,320,"New neutrons","middle")}${L(435,30,470,30,"The chain reaction keeps growing")}`,330)};

/* Geothermal power plant */
D.geothermal={t:"How a geothermal power plant works",c:"Wells bring hot water and steam up from rock heated by the Earth’s interior. The steam spins a turbine connected to a generator. The cooled water is pumped back underground to be heated again.",
svg:S(`${arrow("ga","#dc2626")}${arrow("gb","#2563eb")}
<rect x="-100" y="150" width="820" height="190" fill="#d6d3d1"/><rect x="-100" y="270" width="820" height="70" fill="#fdba74"/>
<path d="M-100,270Q60,250 200,272T500,262T720,272L720,340L-100,340Z" fill="#f97316" opacity=".55"/>
<rect x="-100" y="140" width="820" height="12" fill="#86efac"/>
<rect x="120" y="70" width="140" height="70" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
<circle cx="170" cy="105" r="20" fill="#cbd5e1" stroke="#475569" stroke-width="2"/><path d="M170,85v40M150,105h40M156,91l28,28M184,91l-28,28" stroke="#475569" stroke-width="2"/>
<rect x="205" y="90" width="40" height="30" fill="#fde68a" stroke="#475569" stroke-width="2"/>${T(225,109,"G","middle","font-weight:700")}
<path d="M330,140L350,60L410,60L430,140Z" fill="#e5e7eb" stroke="#475569" stroke-width="2"/>
<path d="M360,52q10,-14 20,0q10,-14 20,0" stroke="#94a3b8" stroke-width="3" fill="none"/><path d="M125,62q8,-12 16,0q8,-12 16,0" stroke="#94a3b8" stroke-width="3" fill="none"/>
<line x1="60" y1="290" x2="60" y2="152" stroke="#dc2626" stroke-width="6"/><path d="M60,152V105H150" stroke="#dc2626" stroke-width="6" fill="none" marker-end="url(#ga)"/>
<path d="M260,105H330" stroke="#2563eb" stroke-width="5" fill="none" marker-end="url(#gb)"/>
<path d="M400,140V152L520,152V290" stroke="#2563eb" stroke-width="6" fill="none" marker-end="url(#gb)"/>
<line x1="245" y1="98" x2="300" y2="20" stroke="#f59e0b" stroke-width="3"/><path d="M300,20L330,30L360,18" stroke="#f59e0b" stroke-width="3" fill="none"/>
${L(60,230,130,215,"Production well")}${L(170,105,150,30,"Turbine","middle")}${L(225,120,250,170,"Generator","middle")}${L(380,60,470,40,"Cooling tower")}${L(520,230,580,220,"Injection well")}${L(330,24,420,8,"Electricity to homes")}${L(300,300,300,325,"Rock heated by the Earth’s interior","middle")}`,340)};

/* Food web */
const B=(x,y,w,t,f)=>`<rect x="${x-w/2}" y="${y-16}" width="${w}" height="32" rx="10" fill="${f}" stroke="#475569"/>${T(x,y+5,t,"middle","font-weight:700")}`;
const E=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#16a34a" stroke-width="2.5" marker-end="url(#wa)"/>`;
D.foodchains={t:"A simple food web",c:"Arrows show the direction in which energy flows, from the eaten to the eater. Plants capture energy from sunlight; plant-eaters eat plants; meat-eaters eat other animals; and decomposers break down dead matter, returning nutrients to the soil.",
svg:S(`${arrow("wa","#16a34a")}
<circle cx="-110" cy="40" r="24" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>${T(-110,80,"Sun","middle","font-weight:700")}
${B(40,300,130,"Grass and plants","#bbf7d0")}${B(320,300,110,"Seeds","#d9f99d")}
${B(-60,200,110,"Grasshopper","#fef08a")}${B(140,200,90,"Mouse","#fef08a")}${B(340,200,90,"Rabbit","#fef08a")}
${B(20,110,80,"Frog","#fed7aa")}${B(220,110,80,"Snake","#fed7aa")}
${B(140,30,80,"Hawk","#fecaca")}${B(560,110,120,"Fungi and bacteria","#e9d5ff")}
<line x1="-86" y1="58" x2="-10" y2="280" stroke="#ca8a04" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#wa)"/>
${E(10,284,-50,216)}${E(60,284,130,216)}${E(90,290,320,216)}${E(310,284,160,216)}${E(-50,184,10,126)}${E(130,184,30,126)}${E(150,184,210,126)}${E(330,184,240,126)}${E(30,94,130,46)}${E(210,94,150,46)}${E(160,184,150,46)}${E(380,200,500,118)}${E(260,110,500,110)}${E(180,30,530,94)}
${L(560,126,560,250,"Decomposers recycle nutrients into the soil","middle")}`,330)};

Object.assign(window.DIAG,D);
})();
