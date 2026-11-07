// Diagrams for circuits, static electricity, LEDs, microwave ovens, touchscreens, refrigeration, hydroelectric dams and levers.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const B=(x,y,w,h,f,s,t,st=K)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${f}" stroke="${s}" stroke-width="2"/>${t.split("|").map((l,i,a)=>T(x+w/2,y+h/2+5+(i-(a.length-1)/2)*16,l,"middle",st)).join("")}`;
const bulb=(x,y)=>`<circle cx="${x}" cy="${y}" r="20" fill="#fef08a" stroke="#a16207" stroke-width="2"/><path d="M${x-8},${y+4} q4,-12 8,0 q4,-12 8,0" stroke="#a16207" stroke-width="2" fill="none"/>`;
const batt=(x,y)=>`<rect x="${x-26}" y="${y-14}" width="52" height="28" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="2"/><rect x="${x+26}" y="${y-6}" width="6" height="12" fill="#334155"/>${T(x-14,y+5,"−","middle",K)}${T(x+14,y+5,"+","middle",K)}`;

/* Series and parallel circuits */
D.circuits={t:"Series and parallel circuits",c:"In a series circuit, there is only one path, so the same current flows through every bulb and if one breaks, all go out. In a parallel circuit, each bulb has its own path to the battery, so the others stay lit if one fails. Homes are wired in parallel.",
svg:S(`${arrow("cc","#dc2626")}
<g fill="none" stroke="#64748b" stroke-width="4"><rect x="-120" y="70" width="320" height="190" rx="6"/><path d="M370,70 h360 v190 h-360z"/><path d="M490,70 v190 M610,70 v190"/></g>
${batt(40,260)}${bulb(-120,165)}${bulb(200,165)}
${batt(550,260)}${bulb(490,165)}${bulb(610,165)}${bulb(730,165)}
<g stroke="#dc2626" stroke-width="2.5" fill="none"><path d="M100,78 h60" marker-end="url(#cc)"/><path d="M560,78 h60" marker-end="url(#cc)"/></g>
${T(40,40,"SERIES: one path","middle","font-weight:700")}${T(550,40,"PARALLEL: several paths","middle","font-weight:700")}
${L(40,246,40,305,"Battery pushes current","middle")}${L(130,78,130,120,"Same current through each bulb","middle")}${L(610,145,610,115,"Each bulb has its own branch","middle")}${L(550,246,550,305,"One battery, many paths","middle")}`,320)};

/* Static electricity */
D.staticelec={t:"Static electricity with a balloon",c:"Rubbing a balloon on hair moves electrons from the hair to the balloon. The balloon becomes negatively charged and the hair positively charged. Because opposite charges attract, the hair rises toward the balloon, and the strands, all carrying the same charge, push away from each other.",
svg:S(`<ellipse cx="60" cy="230" rx="85" ry="95" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/>
<g stroke="#78350f" stroke-width="3" fill="none">${[-50,-30,-10,10,30,50,70].map((d,i)=>`<path d="M${60+d},150 Q${70+d*1.6},${100-i*2} ${120+d*1.4},${60+Math.abs(d)/2}"/>`).join("")}</g>
${[[30,120],[80,100],[120,90],[150,110]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="#fecaca" stroke="#b91c1c"/>${T(p[0],p[1]+4,"+","middle","fill:#b91c1c;font-weight:700")}`).join("")}
<ellipse cx="300" cy="80" rx="70" ry="85" fill="#f472b6" stroke="#be185d" stroke-width="3"/><path d="M300,165 l-8,14 h16z" fill="#be185d"/><path d="M300,179 q-10,40 6,80" stroke="#64748b" stroke-width="2" fill="none"/>
${[[270,60],[300,40],[330,60],[260,100],[300,110],[340,95]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="#bfdbfe" stroke="#1d4ed8"/>${T(p[0],p[1]+4,"−","middle","fill:#1d4ed8;font-weight:700")}`).join("")}
${L(370,80,470,60,"Balloon gains electrons: negative charge")}${L(150,110,470,130,"Hair loses electrons: positive charge")}${L(200,85,470,200,"Opposite charges attract, so hair lifts")}${L(80,120,470,270,"Like charges repel, so strands spread apart")}`,330)};

/* LED */
D.leds={t:"How an LED makes light",c:"An LED is made of two layers of semiconductor. One has extra electrons and the other has holes where electrons are missing. When current flows, electrons cross the junction and drop into holes, giving off their extra energy as light. The material used decides the color.",
svg:S(`${arrow("ld","#334155")}${arrow("lw","#16a34a")}
<rect x="-120" y="90" width="260" height="140" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/><rect x="140" y="90" width="260" height="140" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
<line x1="140" y1="80" x2="140" y2="240" stroke="#0f172a" stroke-width="3" stroke-dasharray="6 4"/>
${[[-80,130],[-30,180],[20,120],[70,200],[100,150]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="#fff" stroke="#b91c1c" stroke-width="2"/>`).join("")}
${[[180,140],[230,190],[280,120],[330,175],[370,140]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="#1d4ed8"/>`).join("")}
<path d="M170,160 h-35" stroke="#334155" stroke-width="3" marker-end="url(#ld)"/><path d="M110,160 h25" stroke="#334155" stroke-width="3" marker-end="url(#ld)"/>
<path d="M140,85 q8,-10 0,-20 q-8,-10 0,-20 q8,-10 0,-20" stroke="#16a34a" stroke-width="4" fill="none" marker-end="url(#lw)"/>
<g stroke="#64748b" stroke-width="3" fill="none"><path d="M-120,160 h-30 v130 h580 v-130 h-30"/></g>
<rect x="110" y="276" width="60" height="28" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>${T(125,295,"+","middle",K)}${T(155,295,"−","middle",K)}
${T(10,252,"p-type: holes","middle")}${T(270,252,"n-type: extra electrons","middle")}
${L(-30,180,-60,40,"Hole: a missing electron","middle")}${L(330,175,520,140,"Free electron")}${L(140,200,520,200,"Junction: electrons fall into holes")}${L(140,30,320,30,"Energy released as light")}${L(170,290,520,290,"Battery drives the current")}`,330)};

/* Microwave oven */
D.microwave={t:"Inside a microwave oven",c:"A magnetron turns electricity into microwaves, which travel along a metal channel into the cooking box. They bounce off the metal walls and make water molecules in the food spin back and forth billions of times a second, heating it. The turntable moves the food through hot and cold spots, and a metal mesh in the door keeps microwaves inside.",
svg:S(`<rect x="-140" y="40" width="560" height="260" rx="14" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
<rect x="-110" y="70" width="380" height="200" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<g opacity=".35" stroke="#64748b">${Array.from({length:12},(_,i)=>`<line x1="${-110+i*32}" y1="70" x2="${-110+i*32}" y2="270"/>`).join("")}</g>
<rect x="300" y="80" width="90" height="60" rx="6" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/>${T(345,115,"Magnetron","middle",K)}
<rect x="230" y="80" width="70" height="26" fill="#94a3b8" stroke="#475569"/>
<path d="M240,120 q15,15 0,30 q-15,15 0,30 q15,15 0,30" stroke="#f97316" stroke-width="3" fill="none"/><path d="M30,90 q15,15 0,30 q-15,15 0,30" stroke="#f97316" stroke-width="3" fill="none"/><path d="M140,100 q-15,15 0,30 q15,15 0,30" stroke="#f97316" stroke-width="3" fill="none"/>
<ellipse cx="80" cy="250" rx="120" ry="16" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
<path d="M30,240 q50,-60 100,0z" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
<rect x="300" y="160" width="90" height="110" rx="6" fill="#cbd5e1" stroke="#475569"/>${[185,205,225].map(y=>`<rect x="315" y="${y}" width="60" height="10" rx="3" fill="#475569"/>`).join("")}
${L(345,80,520,45,"Magnetron makes microwaves")}${L(265,93,520,95,"Waveguide channels them into the box")}${L(140,130,520,145,"Microwaves bounce off metal walls")}${L(80,215,520,195,"Water molecules in food spin and heat up")}${L(150,255,520,245,"Turntable spreads the heating")}${L(-80,150,10,25,"Metal mesh in the door blocks microwaves","middle")}`,330)};

/* Touchscreen */
D.touchscreens={t:"How a phone touchscreen senses a finger",c:"Most phone screens are capacitive. A grid of invisible electrodes under the glass holds a small electric field. Your finger conducts electricity, so touching the glass changes the field at that spot, and the phone’s chip works out exactly where you touched.",
svg:S(`<path d="M-120,200 L300,200 L420,140 L0,140z" fill="#bae6fd" fill-opacity=".7" stroke="#0369a1" stroke-width="2"/>
<path d="M-120,225 L300,225 L420,165 L0,165z" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5"/>
<g stroke="#4f46e5" stroke-width="2" opacity=".8">${[0,1,2,3,4,5,6].map(i=>`<line x1="${-100+i*60}" y1="222" x2="${20+i*60}" y2="168"/>`).join("")}${[0,1,2].map(i=>`<line x1="${-110+i*25}" y1="${215-i*17}" x2="${310+i*25}" y2="${215-i*17}"/>`).join("")}</g>
<path d="M-120,255 L300,255 L420,195 L0,195z" fill="#1e293b" stroke="#0f172a"/>
<path d="M120,40 q30,-10 40,20 l5,100 q-2,14 -25,14 q-22,0 -25,-14 l-5,-90z" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/>
<ellipse cx="150" cy="185" rx="34" ry="10" fill="#facc15" opacity=".7"/>
${L(400,150,500,100,"Protective glass")}${L(390,180,500,170,"Grid of transparent electrodes")}${L(380,210,500,240,"Display shows the picture")}${L(165,150,500,40,"Finger conducts electricity")}${L(150,190,40,290,"Electric field changes where you touch","middle")}`,320)};

/* Refrigerator */
D.refrigeration={t:"How a refrigerator keeps food cold",c:"A refrigerator moves heat from inside to outside. A refrigerant liquid evaporates in coils inside, absorbing heat. A compressor squeezes the gas, making it hot, and it gives off that heat through coils at the back before passing through a narrow valve, cooling and starting again.",
svg:S(`${arrow("fr","#334155")}${arrow("fh","#dc2626")}${arrow("fc","#2563eb")}
<rect x="-130" y="20" width="300" height="300" rx="14" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
<rect x="-110" y="40" width="260" height="200" rx="8" fill="#dbeafe" stroke="#64748b"/>
<path d="M-90,60 h220 v20 h-220 v20 h220" stroke="#2563eb" stroke-width="6" fill="none"/>
<rect x="-80" y="150" width="60" height="70" rx="6" fill="#86efac"/><circle cx="60" cy="190" r="28" fill="#fca5a5"/>
<rect x="90" y="255" width="70" height="55" rx="8" fill="#94a3b8" stroke="#334155" stroke-width="2"/>${T(125,287,"Compressor","middle","fill:#0f172a;font-size:11px")}
<path d="M200,40 h40 v30 h-40 v30 h40 v30 h-40 v30 h40 v30 h-40" stroke="#dc2626" stroke-width="6" fill="none"/>
<path d="M160,280 C230,280 230,240 220,190" stroke="#334155" stroke-width="3" fill="none" marker-end="url(#fr)"/>
<path d="M200,40 Q170,10 130,60" stroke="#334155" stroke-width="3" fill="none" marker-end="url(#fr)"/>
<path d="M-90,100 Q-150,200 90,282" stroke="#334155" stroke-width="3" fill="none" marker-end="url(#fr)" stroke-dasharray="6 4"/>
<g stroke="#dc2626" stroke-width="3">${[60,110,160].map(y=>`<path d="M250,${y} h50" marker-end="url(#fh)"/>`).join("")}</g>
<g stroke="#2563eb" stroke-width="3">${[[-40,150],[60,155]].map(p=>`<path d="M${p[0]},${p[1]} v-40" marker-end="url(#fc)"/>`).join("")}</g>
${L(-40,60,0,10,"Evaporator coils absorb heat from food","middle")}${L(125,282,420,290,"Compressor squeezes the gas, making it hot")}${L(240,145,420,150,"Condenser coils release heat into the room")}${L(150,42,420,40,"Narrow valve lets the liquid expand and cool")}${L(300,110,420,95,"Heat leaves the fridge")}`,335)};

/* Hydroelectric dam */
D.hydropower={t:"How a hydroelectric dam makes electricity",c:"A dam holds back a river, creating a reservoir. Water flows down through a large pipe called a penstock and spins a turbine, which turns a generator to produce electricity. The water then returns to the river below the dam.",
svg:S(`${arrow("hp","#1d4ed8")}
<path d="M-160,80 L180,80 L180,300 L-160,300z" fill="#7dd3fc"/>
<path d="M180,40 L250,40 L330,300 L180,300z" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>
<path d="M330,250 L790,260 L790,300 L330,300z" fill="#7dd3fc"/>
<path d="M175,160 L230,160 L300,270" stroke="#1e40af" stroke-width="18" fill="none" stroke-linejoin="round"/>
<circle cx="320" cy="275" r="22" fill="#fde68a" stroke="#a16207" stroke-width="2"/><path d="M305,275 h30 M320,260 v30" stroke="#a16207" stroke-width="3"/>
<rect x="295" y="190" width="60" height="45" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="2"/><line x1="320" y1="235" x2="320" y2="253" stroke="#334155" stroke-width="4"/>
<path d="M355,200 L470,120 L600,120" stroke="#334155" stroke-width="2" fill="none"/><path d="M470,120 v-50 M600,120 v-50 M455,85 h30 M585,85 h30" stroke="#334155" stroke-width="4"/>
<path d="M345,285 h80" stroke="#1d4ed8" stroke-width="4" marker-end="url(#hp)"/>
${T(-20,120,"Reservoir","middle",K)}
${L(200,160,120,200,"Water enters the intake")}${L(255,210,120,250,"Penstock carries water down")}${L(330,280,400,320,"Turbine spins")}${L(325,200,420,180,"Generator makes electricity")}${L(540,120,540,40,"Power lines carry it to homes","middle")}${L(390,285,560,240,"Water returns to the river")}`,335)};

/* Levers */
{const lever=(x,cls,fx,lx,ex,lab,eg,up)=>`<line x1="${x}" y1="200" x2="${x+200}" y2="200" stroke="#a16207" stroke-width="10" stroke-linecap="round"/>
<path d="M${x+fx-16},235 L${x+fx},203 L${x+fx+16},235z" fill="#64748b"/>
<rect x="${x+lx-18}" y="164" width="36" height="32" rx="4" fill="#60a5fa" stroke="#1d4ed8"/>
<path d="M${x+ex},${up?262:130} v${up?-52:58}" stroke="#dc2626" stroke-width="4" marker-end="url(#lv)"/>
${T(x+100,60,cls,"middle","font-weight:700")}${T(x+100,82,lab,"middle")}${T(x+100,290,eg,"middle")}`;
D.machines={t:"The three classes of levers",c:"A lever is a bar that turns on a pivot called a fulcrum. Where the effort and load are placed decides the class. Levers can make lifting easier, or make a movement faster or larger.",
svg:S(`${arrow("lv","#dc2626")}
${lever(-150,"First class",100,20,190,"Fulcrum in the middle","Seesaw, scissors, crowbar")}
${lever(170,"Second class",10,100,190,"Load in the middle","Wheelbarrow, nutcracker",1)}
${lever(490,"Third class",10,190,100,"Effort in the middle","Tweezers, fishing rod, your forearm",1)}
${T(-100,330,"Gray triangle: fulcrum","start")}${T(180,330,"Blue box: load","start")}${T(440,330,"Red arrow: effort","start")}`,340)};}

Object.assign(window.DIAG,D);
})();
