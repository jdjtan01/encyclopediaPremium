// Diagrams for hair, fever, the immune response, allergies, soil, caves, monsoons and fossils.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const B=(x,y,w,h,f,s,t,st=K)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${f}" stroke="${s}" stroke-width="2"/>${t.split("|").map((l,i,a)=>T(x+w/2,y+h/2+5+(i-(a.length-1)/2)*16,l,"middle",st)).join("")}`;

/* Hair follicle */
D.hair={t:"A hair growing from the skin",c:"Each hair grows from a follicle, a small pocket in the skin. Cells in the bulb at its base divide and push the hair upward, fed by tiny blood vessels. An oil gland keeps the hair and skin soft, and a tiny muscle can pull the hair upright, giving goosebumps.",
svg:S(`<rect x="-150" y="70" width="600" height="40" fill="#fcd9b6" stroke="#b45309"/>
<rect x="-150" y="110" width="600" height="160" fill="#fde7d4" stroke="#b45309"/>
<rect x="-150" y="270" width="600" height="60" fill="#fef3c7" stroke="#b45309"/>
<path d="M120,10 Q140,40 150,250" stroke="#422006" stroke-width="7" fill="none"/>
<path d="M130,90 Q150,170 155,240 Q140,265 168,268 Q190,255 175,235 Q170,170 152,90z" fill="#fef3c7" stroke="#92400e" stroke-width="2" opacity=".85"/>
<ellipse cx="166" cy="252" rx="22" ry="16" fill="#f472b6" stroke="#9d174d" stroke-width="2"/>
<ellipse cx="200" cy="150" rx="22" ry="14" fill="#fde047" stroke="#a16207" stroke-width="2"/><path d="M185,148 l-25,-8" stroke="#a16207" stroke-width="3"/>
<path d="M110,130 q-40,30 -70,-20" stroke="#dc2626" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M130,295 q20,-20 36,-28 q20,10 40,30" stroke="#dc2626" stroke-width="4" fill="none"/><path d="M110,300 q40,-40 56,-35" stroke="#2563eb" stroke-width="4" fill="none"/>
${T(-140,95,"Epidermis","start",K)}${T(-140,135,"Dermis","start",K)}${T(-140,300,"Fat layer","start",K)}
${L(125,30,250,30,"Hair shaft")}${L(150,180,470,120,"Follicle: pocket where hair grows")}${L(200,150,470,170,"Oil gland")}${L(40,110,-60,50,"Tiny muscle makes goosebumps","middle")}${L(166,252,470,230,"Bulb: cells divide to grow hair")}${L(190,290,470,300,"Blood vessels feed the root")}`,340)};

/* Fever loop */
D.fever={t:"How the body raises a fever",c:"When germs invade, immune cells release chemicals called pyrogens. They signal the hypothalamus in the brain, the body’s thermostat, to raise its set temperature. The body shivers and feels cold until it reaches the new temperature. When the infection is under control, the set point falls and the body sweats to cool down.",
svg:S(`${arrow("fv","#334155")}
${B(-150,30,200,56,"#fecaca","#b91c1c","Germs invade|the body")}
${B(160,30,230,56,"#fde68a","#a16207","Immune cells release|pyrogens")}
${B(500,30,250,56,"#e9d5ff","#7e22ce","Hypothalamus raises|the set temperature")}
${B(500,170,250,56,"#bfdbfe","#1d4ed8","Shivering and chills|warm the body")}
${B(160,170,230,56,"#fed7aa","#c2410c","Fever: body temperature|rises")}
${B(-150,170,200,56,"#bbf7d0","#15803d","Immune system fights|germs better")}
${B(160,280,230,50,"#e0f2fe","#0369a1","Sweating cools the body")}
<g stroke="#334155" stroke-width="3" fill="none"><path d="M50,58 H155" marker-end="url(#fv)"/><path d="M390,58 H495" marker-end="url(#fv)"/><path d="M625,86 V165" marker-end="url(#fv)"/><path d="M500,198 H395" marker-end="url(#fv)"/><path d="M160,198 H55" marker-end="url(#fv)"/><path d="M-50,226 Q-40,305 155,305" marker-end="url(#fv)"/></g>
${T(-30,280,"Infection controlled","start")}`,340)};

/* Immune response */
{const germ=(x,y)=>`<g transform="translate(${x},${y})"><circle r="16" fill="#86efac" stroke="#15803d" stroke-width="2"/>${[0,60,120,180,240,300].map(a=>`<line x1="${16*Math.cos(a*Math.PI/180)}" y1="${16*Math.sin(a*Math.PI/180)}" x2="${24*Math.cos(a*Math.PI/180)}" y2="${24*Math.sin(a*Math.PI/180)}" stroke="#15803d" stroke-width="3"/>`).join("")}</g>`;
const ab=(x,y,r)=>`<path d="M${x},${y} v14 M${x},${y} l-8,-10 M${x},${y} l8,-10" stroke="#7c3aed" stroke-width="3" fill="none" transform="rotate(${r} ${x} ${y})"/>`;
D.immune={t:"How the immune system fights germs",c:"When germs get past the skin, white blood cells called phagocytes engulf and digest them. Helper T cells raise the alarm, and B cells make antibodies, Y-shaped proteins that latch onto specific germs and mark them for destruction. Memory cells remain afterward, so the body can respond faster next time, which is how vaccines work.",
svg:S(`${arrow("im","#64748b")}
${germ(-110,120)}${germ(-70,170)}${germ(-120,210)}${T(-100,270,"1. Germs enter","middle")}
<circle cx="130" cy="160" r="50" fill="#e0e7ff" stroke="#4338ca" stroke-width="3"/>${germ(140,155)}<circle cx="110" cy="175" r="10" fill="#4338ca" opacity=".6"/>${T(130,270,"2. Phagocyte engulfs germ","middle")}
<circle cx="360" cy="140" r="34" fill="#fde68a" stroke="#a16207" stroke-width="3"/>${T(360,145,"T","middle","font-weight:700;"+K)}
<circle cx="370" cy="220" r="30" fill="#ddd6fe" stroke="#6d28d9" stroke-width="3"/>${T(370,226,"B","middle","font-weight:700;"+K)}
${ab(415,195,60)}${ab(430,225,90)}${ab(415,250,120)}${T(370,290,"3. T cells signal, B cells make antibodies","middle")}
${germ(620,150)}${ab(600,128,-40)}${ab(645,128,40)}${ab(620,180,180)}
${T(620,230,"4. Antibodies tag germs","middle")}${T(620,250,"for destruction","middle")}
<g stroke="#64748b" stroke-width="2.5" fill="none" marker-end="url(#im)"><path d="M-40,170 H70"/><path d="M190,160 H315"/><path d="M455,180 H580"/></g>
${T(620,300,"Memory cells remember the germ","middle","font-weight:700")}`,330)};}

/* Allergy */
D.allergy={t:"What happens in an allergic reaction",c:"In an allergy, the immune system mistakes a harmless substance, such as pollen, dust mites or certain foods, for a threat. On first contact it makes antibodies that attach to mast cells. On later contact, the substance binds to these antibodies, and the mast cells release histamine and other chemicals that cause sneezing, itching, swelling or, rarely, a dangerous reaction called anaphylaxis.",
svg:S(`${arrow("al","#64748b")}
<g fill="#fde047" stroke="#ca8a04" stroke-width="2">${[[-120,120],[-90,150],[-130,175],[-100,95]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="12"/>`).join("")}</g>${T(-110,230,"1. Harmless pollen","middle")}
<circle cx="140" cy="140" r="55" fill="#fecdd3" stroke="#be123c" stroke-width="3"/>
${[0,1,2,3,4,5].map(i=>{const a=i*60*Math.PI/180;const x=140+55*Math.cos(a),y=140+55*Math.sin(a);return `<path d="M${x.toFixed(0)},${y.toFixed(0)} l${(12*Math.cos(a)).toFixed(0)},${(12*Math.sin(a)).toFixed(0)}" stroke="#7c3aed" stroke-width="4"/>`}).join("")}
<g fill="#be123c">${[[120,125],[150,120],[135,150],[160,155]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="7"/>`).join("")}</g>
${T(140,230,"2. Antibodies coat mast cells","middle")}
<circle cx="400" cy="140" r="55" fill="#fecdd3" stroke="#be123c" stroke-width="3" stroke-dasharray="10 6"/>
<g fill="#be123c">${[[450,100],[470,140],[460,180],[490,120],[495,165]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6"/>`).join("")}</g>
<g fill="#fde047" stroke="#ca8a04">${[[355,90],[345,135]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="10"/>`).join("")}</g>
${T(410,230,"3. Pollen returns: histamine released","middle")}
${B(560,100,200,80,"#fed7aa","#c2410c","4. Sneezing, itching,|watery eyes, swelling")}
<g stroke="#64748b" stroke-width="2.5" fill="none" marker-end="url(#al)"><path d="M-80,140 H75"/><path d="M200,140 H335"/><path d="M505,140 H555"/></g>
${T(310,300,"Severe reactions, called anaphylaxis, need emergency treatment","middle","font-weight:700")}`,320)};

/* Soil layers */
D.soil={t:"Layers of soil",c:"Soil forms slowly as rock breaks down and living things add organic matter. Digging down reveals layers called horizons: dark, rich topsoil full of roots and life, paler subsoil with minerals washed down from above, broken weathered rock, and finally solid bedrock.",
svg:S(`<rect x="-120" y="40" width="440" height="30" fill="#3f2a14"/><rect x="-120" y="70" width="440" height="80" fill="#6b4423"/>
<rect x="-120" y="150" width="440" height="70" fill="#b07d4f"/><rect x="-120" y="220" width="440" height="60" fill="#c8b29a"/>
<rect x="-120" y="280" width="440" height="50" fill="#78716c"/>
<g fill="#a8a29e" stroke="#57534e">${[[-80,240],[0,250],[80,235],[160,255],[240,240],[-40,265],[120,262],[200,268]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="18" ry="10"/>`).join("")}</g>
<g stroke="#16a34a" stroke-width="5">${[-60,60,200].map(x=>`<path d="M${x},40 v-25 M${x},30 l-12,-14 M${x},30 l12,-14"/>`).join("")}</g>
<g stroke="#e7d7b8" stroke-width="2" fill="none">${[-60,60,200].map(x=>`<path d="M${x},40 q-10,40 -20,90 M${x},40 q10,50 25,100 M${x},40 v70"/>`).join("")}</g>
<path d="M20,110 q20,-10 40,0 q20,10 40,0" stroke="#f9a8d4" stroke-width="7" fill="none" stroke-linecap="round"/>
${L(320,55,420,40,"Leaf litter and humus")}${L(320,110,420,100,"Topsoil: dark, rich, full of life")}${L(320,185,420,170,"Subsoil: minerals and clay")}${L(320,250,420,240,"Weathered rock")}${L(320,305,420,305,"Bedrock")}${L(80,110,140,135,"Earthworm","middle")}`,340)};

/* Caves */
D.caves={t:"How limestone caves form",c:"Rainwater absorbs carbon dioxide from the air and soil, becoming a weak acid. As it seeps through cracks in limestone over thousands of years, it dissolves the rock and hollows out caves. Dripping water leaves behind tiny amounts of calcite, slowly building stalactites that hang from the ceiling and stalagmites that rise from the floor.",
svg:S(`${arrow("cv","#2563eb")}
<rect x="-160" y="40" width="950" height="300" fill="#d6d3d1"/>
<path d="M-160,40 h950" stroke="#16a34a" stroke-width="10"/>
<path d="M-40,300 Q-60,150 120,130 Q300,110 460,140 Q620,170 600,300z" fill="#1e293b"/>
<g fill="#e7e5e4" stroke="#a8a29e">${[[60,135,60],[140,128,80],[230,124,50],[330,127,70],[430,137,55]].map(p=>`<path d="M${p[0]-14},${p[1]} L${p[0]},${p[1]+p[2]} L${p[0]+14},${p[1]}z"/>`).join("")}
${[[140,300,70],[330,300,50],[470,300,60]].map(p=>`<path d="M${p[0]-20},${p[1]} L${p[0]},${p[1]-p[2]} L${p[0]+20},${p[1]}z"/>`).join("")}
<path d="M520,140 L540,140 L545,300 L515,300z"/></g>
<g stroke="#2563eb" stroke-width="2" stroke-dasharray="5 5"><path d="M60,45 L80,100" marker-end="url(#cv)"/><path d="M300,45 L290,100" marker-end="url(#cv)"/></g>
<g stroke="#57534e">${[[-120,90,-80,140],[380,60,420,110],[600,80,640,150]].map(c=>`<line x1="${c[0]}" y1="${c[1]}" x2="${c[2]}" y2="${c[3]}"/>`).join("")}</g>
<circle cx="140" cy="212" r="4" fill="#38bdf8"/>
${T(-130,30,"Rain absorbs carbon dioxide, becoming weakly acidic","start")}
${L(80,95,-60,90,"Water seeps through cracks","middle")}${L(140,170,-90,200,"Stalactite hangs down","middle")}${L(140,260,-80,320,"Stalagmite grows up","middle")}${L(530,220,690,220,"Column")}${L(560,60,690,90,"Limestone")}`,340)};

/* Monsoons in the Philippines */
{const ph=(x)=>`<g fill="#86efac" stroke="#15803d" stroke-width="2"><path d="M${x+60},70 q20,-10 30,10 q10,40 -5,70 q-15,20 -10,40 q-25,5 -30,-20 q5,-50 15,-100z"/><path d="M${x+40},210 q25,-5 40,10 q-10,20 -35,15z"/><path d="M${x+85},215 q20,0 25,15 q-15,10 -30,0z"/><path d="M${x+60},250 q40,-10 60,20 q-10,40 -50,40 q-25,-20 -10,-60z"/><path d="M${x-10},210 l30,-15 l5,8 l-30,20z"/></g>`;
D.monsoon={t:"The two monsoons of the Philippines",c:"The Philippines has two main monsoon seasons. From about June to October, the southwest monsoon, or habagat, brings moist air from the ocean and heavy rain, especially to western Luzon. From about November to February, the northeast monsoon, or amihan, brings cooler, drier air from mainland Asia, with rain mainly on the eastern coasts.",
svg:S(`${arrow("mo","#2563eb")}${arrow("ma","#0891b2")}
<rect x="-160" y="20" width="460" height="310" rx="12" fill="#dbeafe"/><rect x="330" y="20" width="460" height="310" rx="12" fill="#e0f2fe"/>
${ph(30)}${ph(520)}
<g stroke="#2563eb" stroke-width="5" fill="none">${[[-130,300],[-130,250],[-100,320]].map(p=>`<path d="M${p[0]},${p[1]} l90,-70" marker-end="url(#mo)"/>`).join("")}</g>
<g fill="#64748b" opacity=".8"><ellipse cx="40" cy="60" rx="40" ry="14"/><ellipse cx="70" cy="50" rx="30" ry="12"/></g>
<g stroke="#2563eb" stroke-width="2">${[30,45,60,75].map(x=>`<line x1="${x}" y1="72" x2="${x-5}" y2="90"/>`).join("")}</g>
<g stroke="#0891b2" stroke-width="5" fill="none">${[[760,40],[740,80],[770,110]].map(p=>`<path d="M${p[0]},${p[1]} l-90,60" marker-end="url(#ma)"/>`).join("")}</g>
${T(70,340,"Habagat: southwest monsoon, about June–October","middle","font-weight:700")}${T(560,340,"Amihan: northeast monsoon, about November–February","middle","font-weight:700")}
${T(-140,45,"Moist ocean air, heavy rain","start",K)}${T(770,295,"Cool, drier air from Asia","end",K)}`,350)};}

/* Fossils */
{const pan=(x,title,body)=>`<rect x="${x}" y="40" width="210" height="250" rx="10" fill="#e0f2fe" stroke="#64748b" stroke-width="2"/>${body}${T(x+105,315,title,"middle")}`;
const fish=(x,y,bones)=>bones?`<g stroke="#f8fafc" stroke-width="3" fill="none"><path d="M${x-40},${y} h80"/>${[-28,-14,0,14,28].map(d=>`<path d="M${x+d},${y-14} v28"/>`).join("")}<circle cx="${x-45}" cy="${y}" r="8"/><path d="M${x+40},${y} l15,-12 v24z"/></g>`:`<path d="M${x-50},${y} q50,-30 90,0 l18,-14 v28 l-18,-14 q-40,30 -90,0z" fill="#fb923c" stroke="#c2410c" stroke-width="2"/>`;
D.fossils={t:"How a fossil forms",c:"Most fossils form when an animal or plant is buried quickly in mud or sand, often underwater. Over millions of years, layers of sediment pile up and harden into rock, and minerals slowly replace the bones or shells. Later, movements of the Earth and erosion bring the fossil back to the surface.",
svg:S(`${pan(-160,"1. Animal dies and sinks",`${fish(-55,140,0)}<rect x="-158" y="240" width="206" height="48" fill="#d6c3a5"/>`)}
${pan(70,"2. Buried by mud and sand",`<rect x="72" y="190" width="206" height="98" fill="#d6c3a5"/><rect x="72" y="160" width="206" height="30" fill="#e7d7b8"/>${fish(175,230,1)}`)}
${pan(300,"3. Bones turn to stone",`<rect x="302" y="100" width="206" height="188" fill="#c8b29a"/>${[130,160,190,220].map(y=>`<line x1="302" y1="${y}" x2="508" y2="${y}" stroke="#a8a29e" stroke-width="2"/>`).join("")}${fish(405,250,1)}`)}
${pan(530,"4. Erosion exposes the fossil",`<path d="M532,288 L532,150 Q600,120 650,170 Q700,200 738,180 L738,288z" fill="#c8b29a"/>${fish(640,200,1)}<g stroke="#0f172a" stroke-width="3"><path d="M690,90 l-25,40"/><path d="M660,128 l10,6"/></g>`)}`,330)};}

Object.assign(window.DIAG,D);
})();
