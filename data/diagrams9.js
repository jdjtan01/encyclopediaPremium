// Diagrams for the Ring of Fire, El Niño, Earth's layers, rainbows, thunderstorms, rivers, the nitrogen cycle and the seasons.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const B=(x,y,w,h,f,s,t,st=K)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${f}" stroke="${s}" stroke-width="2"/>${t.split("|").map((l,i,a)=>T(x+w/2,y+h/2+5+(i-(a.length-1)/2)*16,l,"middle",st)).join("")}`;

/* Subduction at the Ring of Fire */
D.ringoffire={t:"Why the Ring of Fire has volcanoes",c:"Around the Pacific, heavy ocean plates slide beneath other plates. The sinking plate releases water that helps melt the rock above it, and the magma rises to feed chains of volcanoes such as those of the Philippines. Sudden slips along the boundary cause earthquakes.",
svg:S(`${arrow("rf1","#1d4ed8")}${arrow("rf2","#dc2626")}
<rect x="-160" y="20" width="940" height="95" fill="#bfdbfe" opacity=".45"/>
<path d="M-160,115 L150,115 Q190,118 215,135 L560,330 L-160,330z" fill="#64748b"/>
<path d="M-160,115 L150,115 Q190,118 215,135 L560,330 L520,330 L200,152 Q175,140 140,140 L-160,140z" fill="#334155"/>
<path d="M215,135 Q240,112 300,100 L780,100 L780,330 L560,330z" fill="#a16207"/>
<path d="M330,100 L390,40 L450,100z" fill="#78350f"/><path d="M375,55 L390,40 L405,55 q-15,8 -30,0z" fill="#f97316"/>
<path d="M392,100 Q395,160 405,240" stroke="#f97316" stroke-width="9" fill="none" stroke-linecap="round"/>
<ellipse cx="405" cy="245" rx="34" ry="16" fill="#ef4444"/>
<path d="M330,90 q10,-40 30,-50" stroke="#94a3b8" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/>
<path d="M-40,128 h120" stroke="#1d4ed8" stroke-width="4" marker-end="url(#rf1)"/>
<path d="M330,230 l50,30" stroke="#1d4ed8" stroke-width="4" marker-end="url(#rf1)"/>
<path d="M405,225 v-80" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#rf2)"/>
<path d="M262,170 l10,-14 l4,12 l12,-10 l-4,16 l14,2 l-16,8 l6,12 l-14,-6 l-6,12 l-2,-14 l-12,2 l8,-10z" fill="#facc15" stroke="#a16207"/>
${T(-80,70,"Ocean","middle",K)}
${L(20,125,20,92,"Oceanic plate moves toward the trench","middle")}${L(212,132,240,60,"Deep ocean trench")}${L(330,240,170,290,"Plate sinks into the mantle (subduction)","end")}${L(405,245,520,280,"Rock melts into magma")}${L(390,42,520,30,"Volcano erupts")}${L(275,168,470,190,"Earthquakes along the plate boundary")}${L(680,130,680,165,"Island arc or continent","middle")}`,335)};

/* El Niño versus normal */
{const panel=(x,el)=>{const warmEnd=el?430:170;return `<rect x="${x}" y="70" width="440" height="200" rx="10" fill="#e0f2fe" stroke="#0369a1"/>
<rect x="${x}" y="70" width="${warmEnd}" height="70" fill="#f97316" opacity=".75"/>
<rect x="${x+warmEnd}" y="70" width="${440-warmEnd}" height="70" fill="#38bdf8" opacity=".7"/>
<path d="M${x+5},180 Q${x+220},${el?200:150} ${x+435},${el?175:110}" stroke="#0c4a6e" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
<rect x="${x}" y="270" width="40" height="0"/>
<path d="M${x+5},70 v-30 h40 v30" fill="#65a30d"/><path d="M${x+395},70 v-25 h40 v25" fill="#a16207"/>
<g fill="#94a3b8"><ellipse cx="${x+(el?250:70)}" cy="40" rx="45" ry="16"/><ellipse cx="${x+(el?280:100)}" cy="30" rx="35" ry="14"/></g>
<g stroke="#2563eb" stroke-width="2">${[0,15,30,45].map(d=>`<line x1="${x+(el?225:45)+d}" y1="52" x2="${x+(el?220:40)+d}" y2="66"/>`).join("")}</g>
${!el?`<path d="M${x+410},250 v-90" stroke="#1d4ed8" stroke-width="4" marker-end="url(#en1)"/>`:""}
<path d="M${x+(el?300:380)},100 h${el?60:-120}" stroke="#0f172a" stroke-width="3" marker-end="url(#en2)"/>
${T(x+220,295,el?"EL NIÑO":"NORMAL YEAR","middle","font-weight:700")}
${T(x+25,88,"Asia","start",K)}${T(x+415,88,"S. America","end",K)}
${T(x+220,128,el?"Warm water spreads east":"Trade winds push warm water west","middle",K)}
${T(x+220,230,"Cooler deep water","middle",K)}`};
D.elnino={t:"El Niño compared with a normal year",c:"In a normal year, trade winds push warm surface water toward Asia, bringing rain to the Philippines, while cold water rises off South America. During El Niño, the winds weaken and warm water spreads east, so rain clouds move away from the Philippines, often causing drought. La Niña is like an exaggerated normal year, with even more rain in the west.",
svg:S(`${arrow("en1","#1d4ed8")}${arrow("en2","#0f172a")}${panel(-160,false)}${panel(345,true)}`,320)};}

/* Earth's layers */
D.earthlayers={t:"The layers inside the Earth",c:"A slice through the Earth. The crust is so thin compared with the rest that it is drawn thicker than it really is. The liquid outer core’s swirling iron produces Earth’s magnetic field.",
svg:S(`<g transform="translate(60,320)">
<path d="M0,0 L0,-300 A300,300 0 0,1 300,0z" fill="#16a34a"/>
<path d="M0,0 L0,-288 A288,288 0 0,1 288,0z" fill="#f97316"/>
<path d="M0,0 L0,-160 A160,160 0 0,1 160,0z" fill="#facc15"/>
<path d="M0,0 L0,-68 A68,68 0 0,1 68,0z" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
<path d="M0,-288 A288,288 0 0,1 288,0" fill="none" stroke="#c2410c" stroke-dasharray="5 6" opacity=".6"/>
</g>
${L(140,40,380,40,"Crust: 5–70 km thick, solid rock")}${L(190,150,380,105,"Mantle: hot rock that flows very slowly, to about 2,900 km")}${L(150,250,380,170,"Outer core: liquid iron and nickel")}${L(95,290,380,235,"Inner core: solid iron and nickel, about 5,000 °C")}${L(60,320,380,300,"Center of the Earth, about 6,370 km down")}`,335)};

/* Rainbow inside a raindrop */
D.rainbows={t:"How a raindrop makes a rainbow",c:"Sunlight bends as it enters a raindrop, splitting into colors, reflects off the back of the drop and bends again as it leaves. Red light leaves at about 42 degrees and violet at about 40, so each color reaches your eye from drops at a slightly different height in the sky.",
svg:S(`${arrow("rb1","#f59e0b")}
<circle cx="200" cy="170" r="130" fill="#bae6fd" fill-opacity=".6" stroke="#0284c7" stroke-width="3"/>
<path d="M-160,95 L120,70" stroke="#f59e0b" stroke-width="6" marker-end="url(#rb1)"/>
<path d="M120,70 L318,226" stroke="#fbbf24" stroke-width="4"/>
<path d="M318,226 L140,285" stroke="#ef4444" stroke-width="3"/><path d="M318,226 L122,270" stroke="#8b5cf6" stroke-width="3"/>
<path d="M140,285 L-140,330" stroke="#ef4444" stroke-width="3"/><path d="M122,270 L-150,300" stroke="#8b5cf6" stroke-width="3"/>
<g fill="#fde047" stroke="#ca8a04"><circle cx="-130" cy="60" r="24"/></g>
${T(-130,104,"Sunlight","middle")}
${L(120,70,470,50,"1. Light bends entering the drop and splits into colors")}${L(318,226,470,150,"2. Light reflects off the back of the drop")}${L(140,285,470,250,"3. Light bends again leaving the drop")}${L(-60,315,-10,250,"Red leaves at about 42°","middle")}${L(-90,297,-60,205,"Violet at about 40°","middle")}`,340)};

/* Thunderstorm */
D.thunderstorms={t:"Inside a thunderstorm",c:"Warm, moist air rises fast and builds a tall cumulonimbus cloud. Collisions between ice crystals and soft hail separate electric charges, usually leaving positive charge near the top and negative near the bottom. When the difference grows large enough, lightning leaps to the ground or between clouds, and the heated air explodes into thunder.",
svg:S(`${arrow("ts1","#dc2626")}${arrow("ts2","#2563eb")}
<rect x="-160" y="300" width="950" height="40" fill="#86efac"/>
<path d="M-40,40 Q60,15 200,22 L420,20 Q500,30 400,52 Q440,70 440,120 Q500,140 480,200 Q510,230 470,250 L20,250 Q-20,240 10,205 Q0,150 60,130 Q70,70 150,55z" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
${[[110,45],[200,38],[290,40],[370,36]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#fecaca" stroke="#b91c1c"/>${T(p[0],p[1]+5,"+","middle","fill:#b91c1c;font-weight:700")}`).join("")}
${[[60,228],[150,232],[240,228],[330,232],[420,228]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#bfdbfe" stroke="#1d4ed8"/>${T(p[0],p[1]+5,"−","middle","fill:#1d4ed8;font-weight:700")}`).join("")}
<path d="M250,250 l-25,22 l16,2 l-28,28" stroke="#facc15" stroke-width="6" fill="none" stroke-linejoin="round"/>
<g stroke="#dc2626" stroke-width="3">${[100,330].map(x=>`<path d="M${x},215 v-110" marker-end="url(#ts1)"/>`).join("")}</g>
<path d="M455,150 v80" stroke="#2563eb" stroke-width="3" marker-end="url(#ts2)"/>
<g stroke="#2563eb" stroke-width="2" opacity=".8">${[430,445,460,475].map(x=>`<line x1="${x}" y1="260" x2="${x-6}" y2="292"/>`).join("")}</g>
${L(380,38,540,30,"Top: positive charge")}${L(330,140,540,95,"Rising warm, moist air")}${L(420,232,540,160,"Base: negative charge")}${L(462,190,540,225,"Falling cold air and rain")}${L(220,295,540,300,"Lightning to the ground")}`,340)};

/* River from source to sea */
D.rivers={t:"A river from source to sea",c:"A map view of a river. It begins in the mountains, is joined by tributaries, winds in meanders across a flat plain and leaves curved oxbow lakes where it has cut off loops. Near the sea it slows and drops sediment, building a delta.",
svg:S(`<rect x="-160" y="10" width="950" height="320" rx="12" fill="#dcfce7"/>
<path d="M590,10 L790,10 L790,330 L560,330 Q520,250 600,170 Q640,90 590,10z" fill="#7dd3fc"/>
<g fill="#a8a29e" stroke="#57534e">${[[-120,70],[-60,40],[-110,150]].map(p=>`<path d="M${p[0]-40},${p[1]+45} L${p[0]},${p[1]-25} L${p[0]+40},${p[1]+45}z"/>`).join("")}</g>
<g fill="#fff">${[[-60,40],[-120,70]].map(p=>`<path d="M${p[0]-11},${p[1]-6} L${p[0]},${p[1]-25} L${p[0]+11},${p[1]-6}z"/>`).join("")}</g>
<path d="M-60,60 Q-20,110 40,130 Q120,160 160,130 Q210,90 250,140 Q290,200 340,170 Q390,130 430,180 Q470,230 520,200 Q560,180 580,190" stroke="#2563eb" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M-110,170 Q-40,170 30,130" stroke="#3b82f6" stroke-width="5" fill="none"/>
<path d="M290,250 q40,40 80,0 q-40,20 -80,0z" fill="none" stroke="#3b82f6" stroke-width="7"/>
<path d="M560,190 L600,150 M560,190 L610,190 M560,190 L600,235" stroke="#2563eb" stroke-width="5"/>
<path d="M540,170 Q600,190 545,230z" fill="#d9f99d" opacity=".8"/>
${L(-60,55,-20,20,"Source in the mountains")}${L(-80,170,-40,255,"Tributary joins the river","middle")}${L(250,140,240,40,"Meander: a loop in the river","middle")}${L(330,262,330,310,"Oxbow lake: a cut-off loop","middle")}${L(570,195,600,300,"Delta at the river mouth","middle")}${T(700,60,"Sea","middle",K)}`,340)};

/* Nitrogen cycle */
D.nitrogencycle={t:"The nitrogen cycle",c:"Nitrogen gas makes up most of the air but cannot be used directly by plants. Bacteria, some living in bean root nodules, and lightning turn it into forms plants can absorb. Animals get nitrogen by eating plants, decomposers return it to the soil, and other bacteria release it back into the air.",
svg:S(`${arrow("nc","#334155")}
${B(170,10,300,50,"#bfdbfe","#1d4ed8","Nitrogen gas in the air (about 78%)")}
${B(-150,120,190,56,"#bbf7d0","#15803d","Bacteria in bean root|nodules fix nitrogen")}
${B(250,150,170,50,"#fde68a","#a16207","Ammonium in soil")}
${B(560,150,200,56,"#fed7aa","#c2410c","Nitrifying bacteria|make nitrates")}
${B(250,270,170,50,"#bbf7d0","#15803d","Plants absorb nitrates")}
${B(-150,270,190,50,"#e9d5ff","#7e22ce","Animals eat plants")}
${B(560,270,200,50,"#e5e7eb","#475569","Decomposers")}
<g stroke="#334155" stroke-width="3" fill="none">
<path d="M190,60 Q60,70 -40,115" marker-end="url(#nc)"/><path d="M40,160 Q140,170 245,175" marker-end="url(#nc)"/>
<path d="M420,175 L555,175" marker-end="url(#nc)"/><path d="M640,206 Q560,250 425,285" marker-end="url(#nc)"/>
<path d="M250,295 L45,295" marker-end="url(#nc)"/><path d="M-50,320 Q300,345 600,322" marker-end="url(#nc)"/>
<path d="M660,268 Q480,240 420,190" marker-end="url(#nc)"/><path d="M730,148 V35 H478" marker-end="url(#nc)" stroke-dasharray="7 5"/>
<path d="M330,62 l-12,22 l10,0 l-14,26" stroke="#ca8a04" stroke-width="4"/></g>
${T(715,95,"Denitrifying bacteria","end")}${T(715,113,"return nitrogen to the air","end")}${T(355,105,"Lightning","start")}`,350)};

/* Seasons from Earth's tilt */
{const earth=(cx,lab,north)=>`<g transform="translate(${cx},180)"><circle r="46" fill="#38bdf8" stroke="#0369a1" stroke-width="2"/><line x1="19" y1="-62" x2="-19" y2="62" stroke="#0f172a" stroke-width="3"/><ellipse rx="46" ry="12" fill="none" stroke="#fff" stroke-width="2" transform="rotate(17)"/></g>${T(cx,260,lab,"middle")}${T(cx,280,north,"middle")}`;
D.earthplanet={t:"Why we have seasons",c:"Earth’s axis is tilted about 23.5 degrees and keeps pointing the same way in space as Earth orbits the Sun. In June the Northern Hemisphere leans toward the Sun, getting more direct sunlight and longer days; in December it leans away. Near the equator, as in the Philippines, the change is small, so seasons are marked more by rain than by temperature.",
svg:S(`<ellipse cx="310" cy="180" rx="380" ry="95" fill="none" stroke="currentColor" stroke-dasharray="6 6" opacity=".5"/>
<circle cx="310" cy="180" r="52" fill="#fde047" stroke="#f59e0b" stroke-width="4"/>${T(310,186,"Sun","middle",K)}
${earth(-40,"June: north leans toward the Sun","Summer in the north")}${earth(660,"December: north leans away","Winter in the north")}
<g stroke="#f59e0b" stroke-width="2" opacity=".7"><line x1="255" y1="180" x2="10" y2="180"/><line x1="365" y1="180" x2="610" y2="180"/></g>
${L(-21,118,60,60,"Tilted axis, about 23.5°")}${L(641,242,560,320,"Axis points the same way all year")}`,340)};}

Object.assign(window.DIAG,D);
})();
