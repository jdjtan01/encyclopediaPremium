// Labeled cutaway and explanatory diagrams, drawn as SVG. Simplified, not to scale unless stated.
(()=>{
const L=(x1,y1,x2,y2,t,a)=>{if(a!="middle")a=x2<x1-10?"end":"start";const tx=x2+(a=="end"?-5:a=="start"?5:0);return `<circle class="dot" cx="${x1}" cy="${y1}" r="2.6"/><line class="ln" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text x="${tx}" y="${y2+4}" text-anchor="${a}">${t}</text>`};
const S=(b,h=340)=>`<svg viewBox="-170 0 960 ${h}" class="dg" role="img">${b}</svg>`;
const arrow=(id,c)=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${c}"/></marker></defs>`;
const D={};

/* Atom (carbon) */
{let nuc="";const P=[[0,0,1],[9,-6,0],[-9,-5,1],[6,9,0],[-7,8,1],[0,-11,0],[11,4,1],[-12,3,0],[2,-2,1],[-3,13,0],[13,-8,1],[-13,-9,0]];P.forEach(p=>nuc+=`<circle cx="${200+p[0]}" cy="${170+p[1]}" r="8" fill="${p[2]?"#d9534f":"#9aa4b2"}" stroke="#0006"/>`);
const e=(r,a)=>`<circle cx="${200+r*Math.cos(a)}" cy="${170+r*Math.sin(a)}" r="6" fill="#3b82f6" stroke="#0006"/>`;
D.atom={t:"Inside an atom",c:"A simple model of a carbon atom, with 6 protons, 6 neutrons and 6 electrons. Real electrons move in fuzzy clouds, not neat circles, and the nucleus is drawn far too large: if an atom were a stadium, its nucleus would be the size of a pea.",
svg:S(`<circle cx="200" cy="170" r="70" fill="none" stroke="currentColor" stroke-dasharray="4 4" opacity=".5"/><circle cx="200" cy="170" r="130" fill="none" stroke="currentColor" stroke-dasharray="4 4" opacity=".5"/>${nuc}${e(70,-1)}${e(70,2.14)}${e(130,-.3)}${e(130,1.3)}${e(130,2.8)}${e(130,4.4)}
${L(209,164,380,60,"Proton: positive charge")}${L(191,165,380,110,"Neutron: no charge")}${L(200+130*Math.cos(-.3),170+130*Math.sin(-.3),380,160,"Electron: negative charge")}${L(270,170,380,210,"Inner shell: 2 electrons")}${L(200+130*Math.cos(.7),170+130*Math.sin(.7),380,260,"Outer shell: 4 electrons")}${L(200,182,380,305,"Nucleus: protons and neutrons")}`)};}

/* Animal cell */
D.cell={t:"Inside an animal cell",c:"A simplified animal cell. Plant cells also have a rigid cell wall, chloroplasts for photosynthesis and a large central vacuole.",
svg:S(`<ellipse cx="230" cy="170" rx="200" ry="140" fill="#f4c7b0" fill-opacity=".55" stroke="#c96a4a" stroke-width="4"/>
<circle cx="230" cy="165" r="55" fill="#a78bfa" fill-opacity=".7" stroke="#6d28d9" stroke-width="3"/><circle cx="245" cy="155" r="16" fill="#5b21b6"/>
<g fill="#f59e0b" stroke="#b45309" stroke-width="2"><ellipse cx="110" cy="120" rx="32" ry="15" transform="rotate(-20 110 120)"/><ellipse cx="330" cy="250" rx="32" ry="15" transform="rotate(15 330 250)"/></g>
<g fill="none" stroke="#b45309" stroke-width="1.5"><path d="M86,126q8-14,16-2t16-2t16-4" transform="rotate(-20 110 120)"/><path d="M306,256q8-14,16-2t16-2t16-4" transform="rotate(15 330 250)"/></g>
<g fill="none" stroke="#0e7490" stroke-width="5" stroke-linecap="round"><path d="M330,110q25-10,40,10"/><path d="M325,124q28-12,46,10"/><path d="M322,138q30-12,50,10"/></g>
<g fill="none" stroke="#2563eb" stroke-width="3"><path d="M150,215q20-20,40,0t40,0"/><path d="M150,235q20-20,40,0t40,0"/></g>
<g fill="#1e3a8a">${[[158,208],[178,203],[200,211],[221,205],[160,229],[182,224],[206,232],[228,226],[120,200],[300,190],[290,90]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3"/>`).join("")}</g>
<circle cx="140" cy="260" r="13" fill="#84cc16" stroke="#4d7c0f" stroke-width="2"/>
${L(400,120,460,40,"Cell membrane")}${L(330,200,460,85,"Cytoplasm")}${L(270,140,460,130,"Nucleus: holds DNA")}${L(245,155,460,175,"Nucleolus")}${L(350,250,460,220,"Mitochondrion: releases energy")}${L(372,128,460,265,"Golgi apparatus: packs proteins")}${L(195,232,460,310,"Endoplasmic reticulum")}${L(120,200,30,40,"Ribosomes: make proteins","start")}${L(140,260,30,320,"Lysosome: breaks down waste","start")}`)};

/* Heart */
D.heart={t:"How the heart pumps",c:"The heart seen from the front, so its right side is on the left of the picture. Blue shows blood low in oxygen going to the lungs; red shows oxygen-rich blood going to the body. Arrows show the direction of flow.",
svg:S(`${arrow("ha","currentColor")}
<path d="M120,40v70" stroke="#3b82f6" stroke-width="22" fill="none"/>
<path d="M210,150v-70q0-40,-40-40h-40" stroke="#60a5fa" stroke-width="20" fill="none"/>
<path d="M280,160v-90q0-45,-50-45q-55,0,-55,40" stroke="#ef4444" stroke-width="22" fill="none"/>
<path d="M440,110h-80" stroke="#f87171" stroke-width="18" fill="none"/><path d="M440,150h-80" stroke="#f87171" stroke-width="18" fill="none"/>
<rect x="90" y="100" width="130" height="85" rx="30" fill="#3b82f6"/><rect x="230" y="95" width="135" height="85" rx="30" fill="#ef4444"/>
<path d="M95,195h125v120q-60,-10,-125,-90z" fill="#2563eb"/><path d="M230,190h135q5,60,-60,135q-50,-20,-75,-60z" fill="#dc2626"/>
<rect x="221" y="100" width="8" height="225" fill="#7c2d12"/>
<g stroke="#fff" stroke-width="2.5" fill="none" marker-end="url(#ha)" color="#fff"><path d="M150,140v60"/><path d="M300,140v55"/><path d="M190,260q15,-60,20,-120"/><path d="M290,270q-5,-90,-10,-125"/></g>
${L(120,55,30,30,"Vena cava: blood from the body","start")}${L(170,40,30,70,"Pulmonary artery: to the lungs","start")}${L(250,26,390,30,"Aorta: to the body")}${L(440,110,460,90,"Pulmonary veins: from the lungs")}${L(110,135,30,150,"Right atrium","start")}${L(120,250,30,230,"Right ventricle","start")}${L(340,130,460,150,"Left atrium")}${L(330,250,460,230,"Left ventricle: thickest wall")}${L(225,310,460,300,"Septum: wall between the sides")}`)};

/* Eye */
D.eye={t:"Inside the eye",c:"A cross-section of the eye seen from the side. The cornea and lens bend light so that it focuses on the retina. The image is upside down, and the brain turns it the right way up.",
svg:S(`${arrow("ea","#f59e0b")}
<circle cx="300" cy="170" r="120" fill="#fde7e7" fill-opacity=".6" stroke="#e5e7eb" stroke-width="8"/>
<path d="M300,50a120,120 0 0 1 0,240" fill="none" stroke="#ef4444" stroke-width="5" transform="rotate(0 300 170)"/>
<path d="M188,120q-30,50,0,100" fill="#bae6fd" fill-opacity=".7" stroke="#0284c7" stroke-width="3"/>
<path d="M205,100v40M205,200v40" stroke="#16a34a" stroke-width="10"/>
<ellipse cx="225" cy="170" rx="16" ry="40" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/>
<path d="M410,165h120" stroke="#fbbf24" stroke-width="22"/><circle cx="418" cy="172" r="5" fill="#b91c1c"/>
<g stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#ea)"><path d="M40,130L225,150L415,195"/><path d="M40,210L225,190L415,145"/></g>
<path d="M40,118v24m-6,-18l6,-6l6,6" stroke="#f59e0b" stroke-width="3" fill="none"/>
<path d="M40,222v-24m-6,18l6,6l6,-6" stroke="#f59e0b" stroke-width="3" fill="none"/><text x="40" y="250" text-anchor="middle">Object</text>
${L(182,140,110,40,"Cornea: clear front window")}${L(205,110,240,16,"Iris: colored ring")}${L(205,170,150,300,"Pupil: opening in the iris")}${L(232,160,310,48,"Lens: focuses light")}${L(395,110,470,60,"Retina: light-sensitive cells","start")}${L(418,172,470,110,"Fovea: sharpest vision","start")}${L(500,165,520,250,"Optic nerve: to the brain","middle")}${L(300,280,300,320,"Sclera: tough white outer layer","middle")}${L(320,230,470,300,"Vitreous humor: clear jelly","start")}`)};

/* Ear */
D.ear={t:"Inside the ear",c:"Sound waves make the eardrum vibrate. Three tiny bones pass the vibrations to the cochlea, where hair cells turn them into nerve signals. The semicircular canals help with balance.",
svg:S(`<path d="M60,80q-40,90,10,170q30,40,60,10q10,-30,-10,-50q-20,-30,0,-60q30,-40,0,-80q-30,-20,-60,10z" fill="#f2c4a8" stroke="#c2410c" stroke-width="3"/>
<path d="M120,160h140" stroke="#f2c4a8" stroke-width="30"/><path d="M120,145h140M120,175h140" stroke="#c2410c" stroke-width="2"/>
<path d="M262,128v64" stroke="#7c3aed" stroke-width="5"/>
<g fill="#e5e7eb" stroke="#475569" stroke-width="2"><path d="M268,150l20,-14l8,6l-18,16z"/><path d="M294,140l16,4l2,14l-14,2z"/><path d="M312,154h18v14h-6v-6h-6v6h-6z"/></g>
<g fill="none" stroke="#0ea5e9" stroke-width="7"><path d="M340,140a32,32 0 1 1 0,0.1"/></g>
<g fill="none" stroke="#0ea5e9" stroke-width="6"><path d="M350,120q10,-60,50,-40q20,20,-10,50"/><path d="M360,125q40,-30,60,0"/><path d="M345,130q-30,-60,0,-70"/></g>
<path d="M385,200m-38,0a38,38 0 1 0 76,0a38,38 0 1 0 -76,0m14,0a24,24 0 1 1 48,0a24,24 0 1 1 -48,0m14,0a10,10 0 1 0 20,0" fill="none" stroke="#f97316" stroke-width="7"/>
<path d="M423,195q60,-10,120,20" stroke="#facc15" stroke-width="8" fill="none"/>
<path d="M300,175q-10,60,-60,120" stroke="#fda4af" stroke-width="14" fill="none"/>
${L(40,130,20,40,"Pinna: outer ear","start")}${L(190,160,150,70,"Ear canal")}${L(262,140,230,40,"Eardrum")}${L(300,148,300,16,"Hammer, anvil and stirrup","middle")}${L(380,90,450,55,"Semicircular canals: balance")}${L(400,215,450,300,"Cochlea: hearing","start")}${L(520,205,540,150,"Auditory nerve","middle")}${L(260,260,120,310,"Eustachian tube: to the throat")}`)};

/* Tooth */
D.teeth={t:"Inside a tooth",c:"A molar cut in half. Enamel is the hardest substance in the human body. Nerves and blood vessels in the pulp keep the tooth alive.",
svg:S(`<rect x="0" y="175" width="600" height="165" fill="#f9a8b4" fill-opacity=".35"/><rect x="0" y="210" width="600" height="130" fill="#e7d9c4"/>
<path d="M200,40q100,-30,200,0q20,60,0,140q-10,60,-20,140h-50q-5,-60,-30,-100q-25,40,-30,100h-50q-10,-80,-20,-140q-20,-80,0,-140z" fill="#fffaf0" stroke="#94a3b8" stroke-width="3"/>
<path d="M215,55q85,-25,170,0q15,50,0,115q-8,60,-18,135h-25q-5,-60,-47,-110q-42,50,-47,110h-25q-10,-75,-18,-135q-15,-65,0,-115z" fill="#fde68a"/>
<path d="M260,95q40,-15,80,0q10,30,0,60q-5,40,-15,140h-6q-5,-90,-19,-120q-14,30,-19,120h-6q-10,-100,-15,-140q-10,-30,0,-60z" fill="#f87171"/>
<path d="M300,140q-10,60,-20,160M300,140q10,60,22,160" stroke="#7f1d1d" stroke-width="2" fill="none"/>
${L(330,45,470,30,"Enamel: hardest substance in the body")}${L(380,110,470,80,"Dentin")}${L(320,110,470,130,"Pulp: nerves and blood vessels")}${L(260,140,90,60,"Crown","end")}${L(380,185,470,185,"Gum")}${L(272,260,90,240,"Root canal","end")}${L(372,300,470,260,"Root, covered with cementum")}${L(520,300,470,320,"Jawbone")}`)};

/* Skin */
D.skin={t:"Layers of the skin",c:"A block of skin as if seen under a microscope. The epidermis renews itself constantly, while the dermis holds nerves, blood vessels, glands and hair roots.",
svg:S(`<rect x="40" y="40" width="380" height="45" fill="#f4c7a1" stroke="#b45309"/><rect x="40" y="85" width="380" height="140" fill="#fbe0d0" stroke="#b45309"/><rect x="40" y="225" width="380" height="85" fill="#fef3c7" stroke="#b45309"/>
<g fill="#fde68a" stroke="#d97706">${[60,110,160,210,260,310,360].map((x,i)=>`<circle cx="${x+20}" cy="${262+(i%2)*20}" r="18"/>`).join("")}</g>
<path d="M140,30v180" stroke="#3f2a1d" stroke-width="4"/><path d="M128,215q12,-35,24,0z" fill="#92400e"/><path d="M130,80q-10,60,10,140M150,80q10,60,-10,140" stroke="#92400e" fill="none" stroke-width="2"/>
<ellipse cx="165" cy="130" rx="12" ry="8" fill="#fcd34d" stroke="#b45309"/>
<path d="M300,40v120" stroke="#60a5fa" stroke-width="3"/><path d="M300,160q-20,10,0,20q20,10,0,20q-20,10,0,20" stroke="#60a5fa" stroke-width="6" fill="none"/>
<path d="M40,200q100,-30,190,0t190,0" stroke="#ef4444" stroke-width="5" fill="none"/><path d="M40,212q100,-30,190,0t190,0" stroke="#3b82f6" stroke-width="5" fill="none"/>
<path d="M380,210q0,-80,-10,-120m10,40l14,-10m-14,-10l-14,-8" stroke="#a855f7" stroke-width="3" fill="none"/>
${L(140,30,140,20,"Hair","middle")}${L(420,60,460,60,"Epidermis: outer layer","start")}${L(420,150,460,140,"Dermis: inner layer","start")}${L(420,270,460,270,"Fat layer: stores energy, keeps warm","start")}${L(150,190,20,330,"Hair follicle","start")}${L(165,130,460,95,"Oil gland","start")}${L(305,190,460,180,"Sweat gland","start")}${L(300,42,300,25,"Pore","middle")}${L(372,110,460,115,"Nerve ending: senses touch","start")}${L(250,206,460,215,"Blood vessels","start")}`)};

/* Earth layers */
D.tect={t:"Inside the Earth",c:"Earth’s layers, with depths below the surface. The rocky crust is so thin that if Earth were an apple, the crust would be about as thick as its skin. Not to scale.",
svg:S(`<path d="M60,320A260,260 0 0 1 320,60L320,320Z" fill="#8b5a2b"/><path d="M70,320A250,250 0 0 1 320,70L320,320Z" fill="#f97316"/><path d="M160,320A160,160 0 0 1 320,160L320,320Z" fill="#facc15"/><path d="M230,320A90,90 0 0 1 320,230L320,320Z" fill="#fef9c3"/>
${L(130,160,380,60,"Crust: 5–70 km thick","start")}${L(180,210,380,120,"Mantle: hot rock, to about 2,900 km","start")}${L(220,270,380,190,"Outer core: liquid iron and nickel, to about 5,150 km","start")}${L(290,290,380,260,"Inner core: solid iron and nickel","start")}${L(320,320,380,310,"Center: about 6,371 km down","start")}`)};

/* Volcano */
D.volc={t:"Inside a volcano",c:"A cross-section of a stratovolcano, such as Mayon. Its steep cone is built from layers of hardened lava and ash from many eruptions.",
svg:S(`<path d="M0,320L210,90h40L470,320Z" fill="#78716c"/>${[0,1,2,3,4].map(i=>`<path d="M${40+i*35},320L${215+i*2},${110+i*40}" stroke="#57534e" stroke-width="3" fill="none"/><path d="M${430-i*35},320L${245-i*2},${110+i*40}" stroke="#57534e" stroke-width="3" fill="none"/>`).join("")}
<ellipse cx="230" cy="315" rx="110" ry="22" fill="#dc2626"/><path d="M222,300V95h16V300z" fill="#ef4444"/><path d="M234,220q60,-10,110,20l-6,10q-50,-25,-104,-18z" fill="#ef4444"/>
<path d="M210,90q-20,-30,0,-40q0,-30,30,-20q30,-20,40,10q30,0,20,30q10,20,-20,20h-70z" fill="#9ca3af" fill-opacity=".85"/>
<path d="M252,92L300,142Q330,170,362,206" stroke="#f97316" stroke-width="9" fill="none" stroke-linecap="round"/>
${L(230,315,520,300,"Magma chamber")}${L(230,200,520,190,"Main vent")}${L(330,236,520,240,"Side vent")}${L(230,95,520,90,"Crater","start")}${L(250,40,520,40,"Ash cloud","start")}${L(330,172,520,140,"Lava flow")}${L(120,250,30,120,"Layers of lava and ash","start")}`)};

/* Solar system */
{const P=[["Mercury",4879,"#a8a29e"],["Venus",12104,"#fbbf24"],["Earth",12742,"#3b82f6"],["Mars",6779,"#ef4444"],["Jupiter",139820,"#d97706"],["Saturn",116460,"#facc15"],["Uranus",50724,"#67e8f9"],["Neptune",49244,"#6366f1"]];
let x=80,g=`<circle cx="-500" cy="170" r="560" fill="#fbbf24"/><text x="20" y="320">Sun</text>`;const k=58/139820;P.forEach((p,i)=>{const r=Math.max(2,p[1]*k);x+=r+(i<4?24:12);g+=`<circle cx="${x}" cy="170" r="${r}" fill="${p[2]}"/>`+(p[0]=="Saturn"?`<ellipse cx="${x}" cy="170" rx="${r*2.1}" ry="${r*.45}" fill="none" stroke="#fde68a" stroke-width="4"/>`:"")+`<text x="${x}" y="${i%2?260:96}" text-anchor="middle">${p[0]}</text><line class="ln" x1="${x}" y1="${i%2?170+r:170-r}" x2="${x}" y2="${i%2?246:104}"/>`;x+=r+(p[0]=="Saturn"?r:0)});
D.solar={t:"The planets in order",c:"The eight planets in order from the Sun, with their sizes drawn to scale with one another. The distances between them are not to scale: Neptune is about 30 times farther from the Sun than Earth.",svg:S(g)};}

/* Moon phases */
{const ph=(cx,cy,r,f)=>{let d=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#374151"/>`;if(f==.5)return d+`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f5f5dc"/>`;if(f==0)return d;const k=Math.cos(2*Math.PI*f),rx=Math.abs(k)*r;let p;
if(f<.5)p=`M${cx},${cy-r}A${r},${r} 0 0 1 ${cx},${cy+r}A${rx},${r} 0 0 ${f<.25?0:1} ${cx},${cy-r}Z`;else p=`M${cx},${cy-r}A${r},${r} 0 0 0 ${cx},${cy+r}A${rx},${r} 0 0 ${f>.75?1:0} ${cx},${cy-r}Z`;return d+`<path d="${p}" fill="#f5f5dc"/>`};
const N=["New moon","Waxing crescent","First quarter","Waxing gibbous","Full moon","Waning gibbous","Last quarter","Waning crescent"];let g=arrow("ma","#f59e0b")+`<g stroke="#f59e0b" stroke-width="2" marker-end="url(#ma)">${[60,110,160].map(y=>`<line x1="10" y1="${y}" x2="60" y2="${y}"/>`).join("")}</g><text x="10" y="40">Sunlight</text><circle cx="230" cy="110" r="22" fill="#3b82f6"/><text x="230" y="148" text-anchor="middle">Earth</text><circle cx="230" cy="110" r="78" fill="none" stroke="currentColor" stroke-dasharray="3 5" opacity=".5"/>`;
for(let i=0;i<8;i++){const a=Math.PI-i*Math.PI/4,cx=230+78*Math.cos(a),cy=110-78*Math.sin(a);g+=`<circle cx="${cx}" cy="${cy}" r="11" fill="#374151"/><path d="M${cx},${cy-11}A11,11 0 0 0 ${cx},${cy+11}Z" fill="#f5f5dc"/>`;
const x=40+i*72;g+=ph(x,250,22,i/8)+`<text x="${x}" y="292" text-anchor="middle" style="font-size:10.5px">${N[i].split(" ")[0]}</text><text x="${x}" y="305" text-anchor="middle" style="font-size:10.5px">${N[i].split(" ")[1]||""}</text>`}
g+=`<text x="400" y="70">Above: the Moon’s position</text><text x="400" y="88">on its orbit, half lit by the Sun.</text><text x="400" y="120">Below: how it looks from</text><text x="400" y="138">Earth over about 29.5 days.</text>`;
D.moon={t:"Phases of the Moon",c:"The Moon is always half lit by the Sun. As it orbits Earth, we see different amounts of its sunlit side. These shapes are as seen from the Northern Hemisphere and the tropics, including the Philippines; in the far south they appear flipped.",svg:S(g,320)};}

/* Water cycle */
D.wcycle={t:"The water cycle",c:"Water moves endlessly between the sea, the air and the land, powered by the Sun’s heat and by gravity.",
svg:S(`${arrow("wa","#2563eb")}<circle cx="560" cy="45" r="28" fill="#fbbf24"/><rect x="300" y="250" width="300" height="90" fill="#3b82f6" fill-opacity=".6"/><path d="M0,340V200L90,90L170,190L230,150L310,250V340Z" fill="#78716c"/><path d="M75,108L90,90L105,108z" fill="#fff"/>
<path d="M0,340V300q120,-30,300,-40V340Z" fill="#65a30d"/><path d="M40,300q70,-20,120,-10t140,-20" stroke="#38bdf8" stroke-width="6" fill="none"/>
<g fill="#16a34a"><circle cx="220" cy="270" r="14"/><circle cx="250" cy="265" r="12"/></g><rect x="218" y="280" width="4" height="14" fill="#713f12"/>
<g fill="#e5e7eb" stroke="#9ca3af"><path d="M140,70q0,-25,30,-22q15,-25,45,-5q30,-5,30,22q10,25,-25,25h-60q-25,0,-20,-20z"/><path d="M340,60q0,-25,30,-22q15,-25,45,-5q30,-5,30,22q10,25,-25,25h-60q-25,0,-20,-20z"/></g>
<g stroke="#60a5fa" stroke-width="2">${[150,165,180,195,210].map((x,i)=>`<line x1="${x}" y1="${100+i%2*6}" x2="${x-6}" y2="${125+i%2*6}"/>`).join("")}</g>
<g stroke="#2563eb" stroke-width="2.5" fill="none" marker-end="url(#wa)"><path d="M440,240q0,-80,-20,-140"/><path d="M500,240q0,-80,-20,-140"/><path d="M320,60q-40,-10,-70,0"/><path d="M240,250q0,-60,-10,-110"/><path d="M260,320q60,10,100,-30"/></g>
${L(470,170,560,170,"Evaporation","start")}${L(380,60,470,130,"Condensation: clouds form","start")}${L(170,115,20,40,"Precipitation: rain","start")}${L(235,195,140,230,"Transpiration from plants","end")}${L(120,300,60,330,"Runoff into rivers")}${L(320,310,330,330,"Groundwater flows to the sea","start")}`)};

/* DNA */
{let g="";for(let i=0;i<=24;i++){const y=30+i*11.5,a=i*.52,x1=300+90*Math.sin(a),x2=300-90*Math.sin(a),d=Math.cos(a);if(i%2==0){const pair=["A","T","C","G"][i/2%4],cl={A:"#ef4444",T:"#3b82f6",C:"#22c55e",G:"#f59e0b"},o={A:"T",T:"A",C:"G",G:"C"}[pair];g+=`<line x1="${x1}" y1="${y}" x2="${(x1+x2)/2}" y2="${y}" stroke="${cl[pair]}" stroke-width="6" opacity="${d>0?1:.45}"/><line x1="${(x1+x2)/2}" y1="${y}" x2="${x2}" y2="${y}" stroke="${cl[o]}" stroke-width="6" opacity="${d>0?1:.45}"/>`}}
let s1="",s2="";for(let i=0;i<=48;i++){const y=30+i*5.75,a=i*.26;s1+=(i?"L":"M")+(300+90*Math.sin(a))+","+y;s2+=(i?"L":"M")+(300-90*Math.sin(a))+","+y}
g+=`<path d="${s1}" stroke="#6b7280" stroke-width="5" fill="none"/><path d="${s2}" stroke="#9ca3af" stroke-width="5" fill="none"/>`;
D.dna={t:"The DNA double helix",c:"DNA is a twisted ladder. Its sides are made of sugar and phosphate, and its rungs are pairs of bases. Adenine always pairs with thymine, and cytosine with guanine. The order of the bases spells out genetic instructions.",
svg:S(g+`<g><rect x="460" y="70" width="14" height="14" fill="#ef4444"/><text x="480" y="82">A: adenine</text><rect x="460" y="95" width="14" height="14" fill="#3b82f6"/><text x="480" y="107">T: thymine</text><rect x="460" y="120" width="14" height="14" fill="#22c55e"/><text x="480" y="132">C: cytosine</text><rect x="460" y="145" width="14" height="14" fill="#f59e0b"/><text x="480" y="157">G: guanine</text></g>`+L(390,48,460,220,"Sugar-phosphate backbone","start")+L(300,145,130,60,"Base pair: a rung of the ladder","end")+`<text x="130" y="280" text-anchor="end">A pairs with T</text><text x="130" y="300" text-anchor="end">C pairs with G</text>`)};}

/* Photosynthesis */
D.photo={t:"How photosynthesis works",c:"In the leaf’s chloroplasts, energy from sunlight turns carbon dioxide and water into glucose, a sugar, and oxygen. Overall: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
svg:S(`${arrow("pa","currentColor")}<circle cx="70" cy="60" r="34" fill="#fbbf24"/><path d="M150,300q30,-150,180,-220q120,-40,170,10q-40,170,-200,220q-90,20,-150,-10z" fill="#22c55e" stroke="#15803d" stroke-width="3"/><path d="M160,295q140,-120,320,-205" stroke="#15803d" stroke-width="3" fill="none"/><path d="M160,295l-40,40" stroke="#15803d" stroke-width="6"/>
<g stroke="currentColor" stroke-width="2.5" fill="none" marker-end="url(#pa)"><path d="M100,85l120,70"/><path d="M560,60l-90,60"/><path d="M60,330l80,-25"/><path d="M380,240l120,60"/><path d="M300,200l-30,100"/></g>
<text x="20" y="112">Sunlight</text><text x="490" y="45">Carbon dioxide in</text><text x="10" y="300">Water from roots</text><text x="470" y="320">Oxygen out</text><text x="200" y="325">Glucose: food for the plant</text>${L(380,190,470,185,"Chloroplasts make food here")}`)};

/* Lungs */
D.lungs={t:"The lungs and airways",c:"Seen from the front, so the right lung is on the left of the picture. The right lung has three lobes and the left lung two, leaving room for the heart. Inset: alveoli, where oxygen passes into the blood.",
svg:S(`<path d="M260,20v80" stroke="#cbd5e1" stroke-width="22"/><path d="M260,100q-30,20,-60,60M260,100q30,20,60,60" stroke="#cbd5e1" stroke-width="14" fill="none"/>
<path d="M200,90q-90,10,-110,150q-10,60,40,60q60,0,95,-30q20,-100,-25,-180z" fill="#f9a8b4" stroke="#e11d48" stroke-width="2"/><path d="M320,90q90,10,110,150q10,60,-40,60q-50,0,-70,-40q30,-20,15,-50q-20,-60,-15,-120z" fill="#f9a8b4" stroke="#e11d48" stroke-width="2"/>
<path d="M110,170q50,10,110,-10M100,230q60,0,120,20M330,180q50,0,95,30" stroke="#e11d48" stroke-width="2" fill="none"/>
<g stroke="#be123c" stroke-width="2" fill="none"><path d="M200,160l-30,40l-20,30M170,200l10,40M320,160l30,40l20,30M350,200l-10,40"/></g>
<path d="M60,320q200,-80,400,0" stroke="#a16207" stroke-width="6" fill="none"/>
<circle cx="520" cy="110" r="58" fill="none" stroke="currentColor" stroke-dasharray="4 4"/><g fill="#fecdd3" stroke="#e11d48">${[[505,95],[530,95],[518,118],[495,120],[542,120],[520,140]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="12"/>`).join("")}</g><path d="M520,52v30" stroke="#be123c" stroke-width="4"/>
${L(260,30,330,25,"Trachea: windpipe","start")}${L(230,120,330,60,"Bronchus","start")}${L(160,215,30,200,"Bronchioles","start")}${L(110,140,30,110,"Right lung: three lobes","start")}${L(410,200,470,230,"Left lung: two lobes","start")}${L(330,280,330,330,"Heart sits here","middle")}${L(150,290,40,330,"Diaphragm: breathing muscle","start")}${L(545,125,620,200,"Alveoli: tiny air sacs")}`)};

/* Solar eclipse */
D.eclipse={t:"How a solar eclipse happens",c:"When the Moon passes directly between the Sun and Earth, its shadow falls on Earth. People in the dark umbra see a total eclipse; those in the paler penumbra see a partial one. Sizes and distances are not to scale.",
svg:S(`<circle cx="40" cy="170" r="110" fill="#fbbf24"/><path d="M60,62L300,158V182L60,278Z" fill="#fde68a" fill-opacity=".25"/><path d="M300,150L520,135V205L300,190Z" fill="#9ca3af" fill-opacity=".35"/><path d="M300,158L470,168V172L300,182Z" fill="#111827" fill-opacity=".75"/>
<circle cx="300" cy="170" r="14" fill="#9ca3af"/><circle cx="500" cy="170" r="45" fill="#3b82f6"/><circle cx="468" cy="170" r="6" fill="#111"/>
${L(40,100,40,30,"Sun","middle")}${L(300,156,300,90,"Moon","middle")}${L(520,140,560,70,"Earth","middle")}${L(440,168,420,260,"Umbra: total eclipse seen here","end")}${L(480,140,560,300,"Penumbra: partial eclipse","end")}`)};

D.mayon=D.volc;D.pinatubo=D.volc;
window.DIAG=D;window.DG={L,S,arrow};
})();
