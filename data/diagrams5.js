// Diagrams for vaccines, CRISPR, the greenhouse effect, solar panels and how the internet sends data.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const box=(x,y,w,h,f,t,t2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}" stroke="#475569"/>${T(x+w/2,y+h/2+(t2?-4:5),t,"middle","font-weight:700;fill:#0f172a")}${t2?T(x+w/2,y+h/2+14,t2,"middle","font-size:12px;fill:#0f172a"):""}`;

/* How a vaccine works */
D.vacc={t:"How a vaccine trains the immune system",c:"A vaccine shows the immune system a harmless piece or weakened form of a germ. The body makes antibodies and memory cells. If the real germ arrives later, the memory cells recognize it and the body fights it off quickly, before it can cause serious illness.",
svg:S(`${arrow("va","#475569")}
${box(-140,60,170,70,"#e0f2fe","1. Vaccine","harmless germ piece")}
${box(90,60,170,70,"#dcfce7","2. Immune cells","learn its shape")}
${box(320,60,170,70,"#fef9c3","3. Antibodies","and memory cells")}
${box(550,60,190,70,"#fee2e2","4. Real germ","is stopped quickly")}
<g stroke="#475569" stroke-width="3" marker-end="url(#va)"><line x1="32" y1="95" x2="86" y2="95"/><line x1="262" y1="95" x2="316" y2="95"/><line x1="492" y1="95" x2="546" y2="95"/></g>
<circle cx="-55" cy="220" r="26" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/><g stroke="#0369a1" stroke-width="3"><line x1="-55" y1="194" x2="-55" y2="184"/><line x1="-29" y1="220" x2="-19" y2="220"/><line x1="-81" y1="220" x2="-91" y2="220"/><line x1="-55" y1="246" x2="-55" y2="256"/></g>
<circle cx="175" cy="220" r="28" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
<g stroke="#a16207" stroke-width="4" fill="none"><path d="M380,200v20l-12,12M380,220l12,12"/><path d="M430,215v20l-12,12M430,235l12,12"/></g><circle cx="460" cy="215" r="14" fill="#fde68a" stroke="#a16207" stroke-width="2"/>
<circle cx="640" cy="220" r="26" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/><g stroke="#a16207" stroke-width="4" fill="none"><path d="M600,190l14,14M600,190l-6,12"/><path d="M680,190l-14,14M680,190l6,12"/><path d="M640,262v-14"/></g>
${L(-55,246,-55,300,"Germ parts cannot cause the disease","middle")}${L(175,248,175,300,"White blood cells study the invader","middle")}${L(405,250,405,300,"Y-shaped antibodies and memory cells","middle")}${L(640,250,640,300,"Antibodies grab the germ","middle")}`,320)};

/* CRISPR */
D.crispr={t:"How CRISPR edits DNA",c:"A guide RNA leads the Cas9 enzyme to a matching stretch of DNA. Cas9 cuts both strands. When the cell repairs the cut, scientists can switch off a gene or insert a corrected sequence.",
svg:S(`${arrow("ca","#475569")}
<path d="M-120,180 C-60,140 0,220 60,180 S180,140 240,180 S360,220 420,180 S540,140 600,180 S720,220 760,190" stroke="#2563eb" stroke-width="5" fill="none"/>
<path d="M-120,200 C-60,240 0,160 60,200 S180,240 240,200 S360,160 420,200 S540,240 600,200 S720,160 760,210" stroke="#16a34a" stroke-width="5" fill="none"/>
<g stroke="#94a3b8" stroke-width="2">${[-100,-60,-20,20,60,100,140,180,220,460,500,540,580,620,660,700,740].map(x=>`<line x1="${x}" y1="182" x2="${x}" y2="198"/>`).join("")}</g>
<ellipse cx="340" cy="190" rx="95" ry="62" fill="#fde68a" fill-opacity=".85" stroke="#b45309" stroke-width="3"/>
${T(340,150,"Cas9","middle","font-weight:700;fill:#0f172a")}
<path d="M270,175 h140" stroke="#db2777" stroke-width="5"/>${T(340,170,"guide RNA","middle","font-size:12px;fill:#9d174d;font-weight:700")}
<path d="M332,170 l16,40 M348,170 l-16,40" stroke="#dc2626" stroke-width="4"/>
<line x1="340" y1="270" x2="340" y2="300" stroke="#475569" stroke-width="3" marker-end="url(#ca)"/>
${box(140,300,180,34,"#e0f2fe","Gene switched off")}${box(360,300,190,34,"#dcfce7","New sequence added")}
${L(-60,170,-80,110,"DNA double helix","middle")}${L(300,175,190,100,"Guide RNA matches the target DNA")}${L(348,206,470,110,"Cas9 cuts both strands")}`,345)};

/* Greenhouse effect */
D.climchange={t:"The greenhouse effect",c:"Sunlight warms the Earth’s surface, which gives off heat as infrared radiation. Greenhouse gases such as carbon dioxide and methane absorb some of this heat and send it back down, keeping the planet warm. Adding more of these gases traps more heat, warming the climate.",
svg:S(`${arrow("ga","#f59e0b")}${arrow("gr","#dc2626")}
<circle cx="-110" cy="50" r="40" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
<rect x="-170" y="110" width="960" height="70" fill="#bfdbfe" fill-opacity=".55"/>
<g fill="#64748b">${[40,120,210,300,390,480,570,660].map((x,i)=>`<circle cx="${x}" cy="${135+(i%3)*12}" r="5"/>`).join("")}</g>
<path d="M-170,290 Q300,260 790,290 L790,340 L-170,340 Z" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
<g stroke="#f59e0b" stroke-width="4" marker-end="url(#ga)"><line x1="-80" y1="80" x2="60" y2="270"/><line x1="-60" y1="70" x2="200" y2="265"/></g>
<line x1="230" y1="235" x2="160" y2="110" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#ga)"/>
<g stroke="#dc2626" stroke-width="4" fill="none" marker-end="url(#gr)"><path d="M380,270 q-10,-30 0,-50 q10,-25 -2,-50 q-8,-20 4,-40 q10,-20 0,-40"/><path d="M520,270 q-10,-30 0,-50 q10,-25 -2,-50"/></g>
<path d="M528,150 q10,25 0,50 q-10,25 2,55" stroke="#dc2626" stroke-width="4" fill="none" marker-end="url(#gr)"/>
${L(-110,90,-110,250,"Sunlight","middle")}${L(300,130,300,95,"Greenhouse gases in the atmosphere","middle")}${L(195,170,40,200,"Some sunlight is reflected")}${L(384,40,470,30,"Some heat escapes to space")}${L(530,200,580,215,"Heat sent back down")}${L(300,300,300,326,"Earth’s surface warms and gives off heat","middle")}`,340)};

/* Solar panel */
D.solarpower={t:"How a solar panel makes electricity",c:"A solar cell is made of two layers of silicon. When sunlight strikes it, the light knocks electrons loose. The cell’s structure pushes the electrons one way, so they flow through a wire as an electric current that can power homes or charge batteries.",
svg:S(`${arrow("sa","#f59e0b")}${arrow("se","#2563eb")}
<circle cx="-110" cy="50" r="38" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
<g stroke="#f59e0b" stroke-width="4" marker-end="url(#sa)"><line x1="-70" y1="70" x2="120" y2="130"/><line x1="-80" y1="90" x2="210" y2="130"/><line x1="-90" y1="110" x2="300" y2="130"/></g>
<rect x="60" y="135" width="360" height="40" fill="#1e3a8a" stroke="#0f172a" stroke-width="2"/><rect x="60" y="175" width="360" height="45" fill="#93c5fd" stroke="#0f172a" stroke-width="2"/>
<g stroke="#cbd5e1" stroke-width="2">${[100,150,200,250,300,350,400].map(x=>`<line x1="${x}" y1="135" x2="${x}" y2="140"/>`).join("")}</g>
${T(240,160,"Silicon layer 1","middle","fill:#fff;font-weight:700")}${T(240,203,"Silicon layer 2","middle","font-weight:700;fill:#0f172a")}
<g fill="#facc15" stroke="#a16207">${[120,200,280,360].map(x=>`<circle cx="${x}" cy="175" r="6"/>`).join("")}</g>
<path d="M420,150 H560 V260 H500" stroke="#2563eb" stroke-width="4" fill="none" marker-end="url(#se)"/><path d="M420,205 H460 V260 H480" stroke="#2563eb" stroke-width="4" fill="none"/>
<path d="M470,262 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0" fill="#fef9c3" stroke="#475569" stroke-width="2"/><path d="M482,262 l6,-8 l6,16 l6,-8" stroke="#ca8a04" stroke-width="2" fill="none"/>
<rect x="590" y="200" width="120" height="70" fill="#f1f5f9" stroke="#475569" stroke-width="2"/><path d="M590,200 L650,160 L710,200" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
${L(-110,88,-130,200,"Sunlight","middle")}${L(200,175,150,250,"Light knocks electrons loose","middle")}${L(560,200,610,120,"Electric current")}${L(488,280,470,320,"Powers a light or charges a battery","middle")}${L(650,235,700,320,"Home","middle")}`,330)};

/* How the internet sends data */
D.internet={t:"How the internet sends data",c:"Information sent over the internet, such as a photo or message, is broken into small packets. Each packet carries an address and travels through routers, sometimes by different routes, then the packets are put back together in the right order at their destination.",
svg:S(`${arrow("ia","#475569")}
<rect x="-150" y="120" width="120" height="80" rx="8" fill="#e0f2fe" stroke="#475569" stroke-width="2"/>${T(-90,165,"Your phone","middle","font-weight:700;fill:#0f172a")}
<rect x="620" y="120" width="140" height="80" rx="8" fill="#dcfce7" stroke="#475569" stroke-width="2"/>${T(690,165,"Server","middle","font-weight:700;fill:#0f172a")}
${[[120,60],[120,250],[320,40],[320,160],[320,280],[500,110],[500,230]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="24" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>${T(x,y+4,"R","middle","font-weight:700;font-size:12px;fill:#0f172a")}`).join("")}
<g stroke="#94a3b8" stroke-width="2.5" fill="none"><path d="M-30,150L96,64"/><path d="M-30,170L96,246"/><path d="M144,60L296,42"/><path d="M144,64L296,156"/><path d="M144,250L296,276"/><path d="M144,246L296,164"/><path d="M344,42L476,106"/><path d="M344,160L476,114"/><path d="M344,164L476,226"/><path d="M344,280L476,234"/><path d="M524,110L620,150"/><path d="M524,230L620,175"/></g>
<g>${[[30,110,"1","#fca5a5"],[210,50,"2","#fdba74"],[210,265,"3","#fde047"],[410,75,"1","#fca5a5"],[410,250,"3","#fde047"],[410,140,"2","#fdba74"]].map(([x,y,n,f])=>`<rect x="${x-14}" y="${y-11}" width="28" height="22" rx="4" fill="${f}" stroke="#475569"/>${T(x,y+5,n,"middle","font-weight:700;font-size:12px;fill:#0f172a")}`).join("")}</g>
${L(30,121,-60,250,"Data is split into numbered packets","middle")}${L(320,184,320,330,"Routers pass packets along, choosing routes","middle")}${L(690,200,690,250,"Packets are put back in order","middle")}`,335)};

Object.assign(window.DIAG,D);
})();
