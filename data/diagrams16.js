// Diagrams for the James Webb Space Telescope, finding exoplanets, the history of the universe, galaxy types, the Milky Way, Newton's laws, fractions and Pythagoras.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const hex=(cx,cy,r)=>{let p="";for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;p+=`${i?"L":"M"}${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`;}return p+"z";};

/* JWST */
{let segs="";const r=17,w=r*Math.sqrt(3);const cells=[[0,0],[1,0],[-1,0],[0.5,1.5],[-0.5,1.5],[0.5,-1.5],[-0.5,-1.5],[1.5,1.5],[-1.5,1.5],[1.5,-1.5],[-1.5,-1.5],[2,0],[-2,0],[1,3],[-1,3],[0,3],[1,-3],[-1,-3],[0,-3]];
cells.forEach(([q,s],i)=>{if(i===0)return;segs+=`<path d="${hex(560+q*w,130+s*r,r-1.5)}" fill="#fbbf24" stroke="#b45309"/>`;});
D.jwst={t:"The James Webb Space Telescope",c:"Webb orbits around a point in space called L2, about 1.5 million kilometers from Earth on the side away from the Sun. A five-layer sunshield the size of a tennis court blocks heat from the Sun, Earth and Moon, keeping the telescope extremely cold so it can detect faint infrared light. Its 6.5-meter mirror is made of 18 gold-coated hexagonal segments.",
svg:S(`<circle cx="-110" cy="150" r="40" fill="#fde047" stroke="#f59e0b" stroke-width="3"/>${T(-110,210,"Sun","middle")}
<circle cx="150" cy="150" r="14" fill="#38bdf8" stroke="#0369a1" stroke-width="2"/>${T(150,185,"Earth","middle")}
<circle cx="300" cy="150" r="6" fill="#a855f7"/>${T(300,185,"L2","middle","font-weight:700")}
<line x1="-60" y1="150" x2="290" y2="150" stroke="currentColor" stroke-dasharray="5 6" opacity=".5"/>
<path d="M150,120 Q225,95 300,120" fill="none" stroke="currentColor" opacity=".7"/>${T(225,95,"1.5 million km","middle")}
${segs}<line x1="560" y1="130" x2="560" y2="40" stroke="#94a3b8" stroke-width="3"/><line x1="500" y1="160" x2="560" y2="40" stroke="#94a3b8" stroke-width="2"/><line x1="620" y1="160" x2="560" y2="40" stroke="#94a3b8" stroke-width="2"/><circle cx="560" cy="40" r="8" fill="#94a3b8"/>
${[0,1,2,3,4].map(i=>`<path d="M${420-i*4},${215+i*10} L${700+i*4},${215+i*10} L${680},${240+i*10} L${440},${240+i*10}z" fill="#c4b5fd" stroke="#7c3aed" opacity=".8"/>`).join("")}
${L(505,110,400,110,"18 gold mirror segments")}${L(560,40,450,30,"Secondary mirror")}${L(560,270,560,320,"Five-layer sunshield blocks heat","middle")}`,330)};}

/* Exoplanet transit */
D.exoplanet={t:"Finding planets by watching starlight dim",c:"Most known exoplanets were found with the transit method. When a planet passes in front of its star as seen from Earth, it blocks a tiny fraction of the star’s light. Telescopes measure these regular dips, revealing the planet’s size and how long it takes to orbit.",
svg:S(`<circle cx="160" cy="100" r="80" fill="#fde047" stroke="#f59e0b" stroke-width="3"/>
<ellipse cx="160" cy="100" rx="200" ry="22" fill="none" stroke="currentColor" stroke-dasharray="5 5" opacity=".6"/>
<circle cx="70" cy="114" r="8" fill="#94a3b8"/><circle cx="160" cy="120" r="12" fill="#1e293b"/><circle cx="270" cy="113" r="8" fill="#94a3b8"/>
<line x1="-120" y1="300" x2="460" y2="300" stroke="currentColor"/><line x1="-120" y1="200" x2="-120" y2="300" stroke="currentColor"/>
<path d="M-120,220 H90 Q105,220 110,250 H210 Q215,220 230,220 H460" stroke="#f59e0b" stroke-width="4" fill="none"/>
${T(-110,212,"Normal brightness","start")}${T(160,272,"Dimmer","middle")}${T(170,320,"Time","middle")}
${L(160,120,520,100,"Planet passes in front of its star")}${L(160,250,520,240,"Star’s brightness dips slightly")}${L(270,113,520,160,"Planet moving around its star")}`,330)};

/* History of the universe */
D.bigbang={t:"A timeline of the universe",c:"The universe began about 13.8 billion years ago in the Big Bang and has been expanding ever since. After about 380,000 years, it cooled enough for atoms to form and light to travel freely; this light is the cosmic microwave background. The first stars formed within a few hundred million years, galaxies grew, and our Sun and Earth formed about 4.6 billion years ago.",
svg:S(`<path d="M-150,170 L760,40 L760,300z" fill="#1e1b4b" opacity=".9"/>
<circle cx="-150" cy="170" r="12" fill="#fff"/><circle cx="-150" cy="170" r="22" fill="#fde047" opacity=".5"/>
<rect x="20" y="130" width="8" height="80" fill="#f97316" opacity=".8"/>
<g fill="#fde68a">${[[160,150],[180,190],[200,170],[230,140],[240,200]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3"/>`).join("")}</g>
<g fill="none" stroke="#c4b5fd" stroke-width="2">${[[380,130],[430,200],[470,150],[520,220]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="18" ry="7"/>`).join("")}</g>
<circle cx="680" cy="170" r="10" fill="#38bdf8" stroke="#fff"/>
${T(-165,330,"Big Bang","start","font-weight:700")}${T(-165,350,"13.8 billion years ago","start")}
${T(24,330,"First atoms, light set free","middle","font-weight:700")}${T(24,350,"380,000 years after","middle")}
${T(200,30,"First stars","middle","font-weight:700")}${T(200,50,"about 200 million years","middle")}
${T(450,330,"Galaxies grow","middle","font-weight:700")}${T(450,350,"billions of years","middle")}
${T(770,30,"Sun and Earth form","end","font-weight:700")}${T(770,50,"4.6 billion years ago","end")}`,355)};

/* Galaxy types */
{const spiral=(cx,cy,bar)=>{let p="";for(const arm of [0,Math.PI]){let d="";for(let t=0;t<=3.2;t+=0.2){const r=(bar?22:8)+t*17,a=arm+t;d+=`${t?"L":"M"}${(cx+r*Math.cos(a)).toFixed(1)},${(cy+0.6*r*Math.sin(a)).toFixed(1)}`;}p+=`<path d="${d}" fill="none" stroke="#c4b5fd" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;}return p+(bar?`<rect x="${cx-24}" y="${cy-5}" width="48" height="10" rx="5" fill="#fde68a"/>`:"")+`<ellipse cx="${cx}" cy="${cy}" rx="14" ry="10" fill="#fde68a"/>`;};
D.galaxies={t:"The main types of galaxies",c:"Astronomers sort galaxies by shape. Spiral galaxies have bright arms winding out from a central bulge; barred spirals, like the Milky Way, have a bar of stars across the center. Elliptical galaxies are smooth, rounded collections of mostly older stars. Irregular galaxies have no clear shape, often because of collisions or gravity from neighbors.",
svg:S(`<rect x="-160" y="20" width="950" height="300" rx="14" fill="#0f172a"/>
${spiral(-50,140,0)}${spiral(200,140,1)}
<ellipse cx="440" cy="140" rx="80" ry="55" fill="#fde68a" opacity=".35"/><ellipse cx="440" cy="140" rx="50" ry="35" fill="#fde68a" opacity=".55"/><ellipse cx="440" cy="140" rx="20" ry="14" fill="#fef9c3"/>
<g fill="#c4b5fd" opacity=".8">${[[640,110,24],[680,150,18],[630,170,14],[700,105,10],[660,130,12],[710,175,9]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}"/>`).join("")}</g>
${["Spiral","Barred spiral","Elliptical","Irregular"].map((t,i)=>T([-50,200,440,670][i],270,t,"middle","fill:#f8fafc;font-weight:700")).join("")}
${T(200,295,"The Milky Way is a barred spiral","middle","fill:#cbd5e1")}`,330)};}

/* Milky Way */
D.milky={t:"Our place in the Milky Way",c:"The Milky Way is a barred spiral galaxy about 100,000 light-years across, containing hundreds of billions of stars. Seen from above, it has a central bar and spiral arms. Our solar system lies in a smaller arm about 26,000 light-years from the center. Seen from the side, the galaxy is a thin disc with a bulge in the middle, which is why it appears as a band of light across our night sky.",
svg:S(`<rect x="-160" y="10" width="950" height="320" rx="14" fill="#0f172a"/>
<g transform="translate(110,160)">${[0,Math.PI/2,Math.PI,3*Math.PI/2].map(arm=>{let d="";for(let t=0;t<=3.6;t+=0.2){const r=30+t*30,a=arm+t;d+=`${t?"L":"M"}${(r*Math.cos(a)).toFixed(1)},${(r*Math.sin(a)).toFixed(1)}`;}return `<path d="${d}" fill="none" stroke="#a5b4fc" stroke-width="12" stroke-linecap="round" opacity=".55"/>`}).join("")}
<rect x="-40" y="-9" width="80" height="18" rx="9" fill="#fde68a" transform="rotate(25)"/><circle r="18" fill="#fef3c7"/>
<circle cx="70" cy="70" r="7" fill="#f97316" stroke="#fff" stroke-width="2"/></g>
<ellipse cx="560" cy="170" rx="200" ry="14" fill="#a5b4fc" opacity=".6"/><ellipse cx="560" cy="170" rx="45" ry="30" fill="#fde68a"/><circle cx="660" cy="172" r="5" fill="#f97316"/>
${T(110,40,"Seen from above","middle","fill:#f8fafc;font-weight:700")}${T(560,40,"Seen from the side","middle","fill:#f8fafc;font-weight:700")}
${T(560,240,"About 100,000 light-years across","middle","fill:#cbd5e1")}
${L(180,230,300,300,"Our Sun, about 26,000 light-years from the center")}${L(110,160,-40,300,"Central bar and bulge","middle")}${L(660,172,700,110,"Sun","middle")}`,340)};

/* Newton's laws */
{const pan=(x,title,body,cap)=>`<rect x="${x}" y="40" width="300" height="230" rx="12" fill="#f8fafc" stroke="#94a3b8"/>${T(x+150,30,title,"middle","font-weight:700")}${body}${T(x+150,295,cap,"middle")}`;
D.newton={t:"Newton’s three laws of motion",c:"Newton’s first law says an object keeps still or keeps moving at the same speed unless a force acts on it. The second law says a force makes an object accelerate, and a heavier object needs more force for the same acceleration. The third law says every action has an equal and opposite reaction, which is how rockets push themselves forward.",
svg:S(`${arrow("nw","#dc2626")}${arrow("nb","#2563eb")}
${pan(-160,"1. Inertia",`<line x1="-150" y1="220" x2="130" y2="220" stroke="#64748b" stroke-width="3"/><rect x="-120" y="185" width="50" height="35" rx="6" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/><path d="M-60,200 H40" stroke="#2563eb" stroke-width="4" marker-end="url(#nb)" stroke-dasharray="8 6"/><rect x="50" y="185" width="50" height="35" rx="6" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2" opacity=".5"/>`,"Keeps moving unless a force acts")}
${pan(170,"2. Force and mass",`<rect x="250" y="80" width="40" height="35" rx="6" fill="#86efac" stroke="#15803d" stroke-width="2"/><path d="M190,97 H245" stroke="#dc2626" stroke-width="4" marker-end="url(#nw)"/><path d="M295,97 H440" stroke="#2563eb" stroke-width="4" marker-end="url(#nb)"/>
<rect x="250" y="170" width="80" height="60" rx="6" fill="#86efac" stroke="#15803d" stroke-width="2"/><path d="M190,200 H245" stroke="#dc2626" stroke-width="4" marker-end="url(#nw)"/><path d="M335,200 H375" stroke="#2563eb" stroke-width="4" marker-end="url(#nb)"/>`,"Same push: lighter object speeds up more")}
${pan(500,"3. Action and reaction",`<path d="M650,70 l25,40 v80 h-50 v-80z" fill="#e2e8f0" stroke="#475569" stroke-width="2"/><path d="M630,195 l-15,40 h70 l-15,-40" fill="#fdba74"/><path d="M650,240 v25" stroke="#dc2626" stroke-width="4" marker-end="url(#nw)"/><path d="M700,180 v-80" stroke="#2563eb" stroke-width="4" marker-end="url(#nb)"/>`,"Gas pushed down, rocket pushed up")}`,310)};}

/* Fractions */
{const pie=(cx,cy,n,k,lab)=>{let s=`<circle cx="${cx}" cy="${cy}" r="60" fill="#f8fafc" stroke="#475569" stroke-width="2"/>`;for(let i=0;i<k;i++){const a1=-Math.PI/2+i*2*Math.PI/n,a2=a1+2*Math.PI/n;s+=`<path d="M${cx},${cy} L${(cx+60*Math.cos(a1)).toFixed(1)},${(cy+60*Math.sin(a1)).toFixed(1)} A60,60 0 0,1 ${(cx+60*Math.cos(a2)).toFixed(1)},${(cy+60*Math.sin(a2)).toFixed(1)}z" fill="#fb923c" stroke="#c2410c"/>`;}for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n;s+=`<line x1="${cx}" y1="${cy}" x2="${(cx+60*Math.cos(a)).toFixed(1)}" y2="${(cy+60*Math.sin(a)).toFixed(1)}" stroke="#475569"/>`;}return s+T(cx,cy+90,lab,"middle","font-weight:700");};
D.fractions={t:"Fractions, pictured",c:"A fraction shows part of a whole. The bottom number, the denominator, says how many equal parts the whole is cut into; the top number, the numerator, says how many parts are taken. The same amounts can be written as decimals, shown here on a number line.",
svg:S(`${pie(-80,90,2,1,"1/2 = 0.5")}${pie(110,90,4,1,"1/4 = 0.25")}${pie(300,90,4,3,"3/4 = 0.75")}${pie(490,90,8,3,"3/8 = 0.375")}
<line x1="-120" y1="270" x2="560" y2="270" stroke="currentColor" stroke-width="3"/>
${[[0,"0"],[0.25,"1/4"],[0.5,"1/2"],[0.75,"3/4"],[1,"1"]].map(([v,l])=>`<line x1="${-120+v*680}" y1="258" x2="${-120+v*680}" y2="282" stroke="currentColor" stroke-width="3"/>${T(-120+v*680,250,l,"middle","font-weight:700")}${T(-120+v*680,302,String(v),"middle")}`).join("")}
${T(590,90,"Numerator: parts taken","start")}${T(590,112,"Denominator: equal parts","start")}`,320)};}

/* Pythagoras */
D.euclid={t:"The Pythagorean theorem",c:"In a right triangle, the square on the longest side, the hypotenuse, equals the sum of the squares on the other two sides. For a triangle with sides 3, 4 and 5, the squares have areas 9, 16 and 25, and 9 + 16 = 25. Euclid proved this in his Elements, though the rule was known earlier in Babylon, India and China.",
svg:S(`<g transform="translate(60,0)">
<path d="M100,215 L200,215 L200,315 L100,315z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
<path d="M100,140 L100,215 L25,215 L25,140z" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
<path d="M100,140 L200,215 L275,115 L175,40z" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>
<path d="M100,215 L200,215 L100,140z" fill="#fde68a" stroke="#a16207" stroke-width="3"/>
<rect x="100" y="203" width="12" height="12" fill="none" stroke="#a16207" stroke-width="2"/></g>
${T(122,182,"a² = 9","middle",K)}${T(210,270,"b² = 16","middle",K)}${T(247,132,"c² = 25","middle",K)}
${T(167,198,"a=3","start","font-size:12px;fill:#0f172a")}${T(210,232,"b=4","middle","font-size:12px;"+K)}${T(222,170,"c=5","middle","font-size:12px;fill:#0f172a")}
${T(420,140,"a² + b² = c²","start","font-weight:700;font-size:22px")}${T(420,175,"9 + 16 = 25","start","font-size:18px")}${T(420,210,"Works for every right triangle","start")}`,340)};

Object.assign(window.DIAG,D);
})();
