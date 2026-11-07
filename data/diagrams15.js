// Diagrams for electric vehicles, bridges, the lockstitch, binary numbers, blockchains, roads, the printing press and satellite orbits.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const B=(x,y,w,h,f,s,t,st=K)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${f}" stroke="${s}" stroke-width="2"/>${t.split("|").map((l,i,a)=>T(x+w/2,y+h/2+5+(i-(a.length-1)/2)*16,l,"middle",st)).join("")}`;

/* Electric car */
D.ev={t:"Inside an electric car",c:"An electric car stores energy in a large battery pack, usually under the floor. An inverter turns the battery’s direct current into the form the electric motor needs, and the motor turns the wheels. When the car slows down, the motor works as a generator, sending energy back into the battery, called regenerative braking.",
svg:S(`${arrow("ev","#16a34a")}
<path d="M-120,220 L-110,170 Q-80,150 0,145 L80,100 Q120,85 260,85 Q330,85 380,140 L460,155 Q490,165 490,220z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="3"/>
<path d="M90,108 Q130,95 250,95 Q300,96 340,140 L95,140z" fill="#e0f2fe" stroke="#1d4ed8"/>
<circle cx="-30" cy="225" r="38" fill="#334155"/><circle cx="-30" cy="225" r="16" fill="#94a3b8"/><circle cx="380" cy="225" r="38" fill="#334155"/><circle cx="380" cy="225" r="16" fill="#94a3b8"/>
<rect x="30" y="185" width="290" height="28" rx="6" fill="#4ade80" stroke="#15803d" stroke-width="2"/>${[0,1,2,3,4,5,6].map(i=>`<line x1="${70+i*36}" y1="185" x2="${70+i*36}" y2="213" stroke="#15803d"/>`).join("")}
<rect x="340" y="160" width="50" height="40" rx="6" fill="#fbbf24" stroke="#a16207" stroke-width="2"/>
<rect x="270" y="150" width="50" height="28" rx="5" fill="#c4b5fd" stroke="#6d28d9" stroke-width="2"/>
<rect x="470" y="165" width="16" height="22" rx="3" fill="#16a34a"/>
<path d="M330,210 q-150,40 -290,0" stroke="#16a34a" stroke-width="3" fill="none" stroke-dasharray="7 5" marker-end="url(#ev)"/>
${L(175,199,175,300,"Battery pack under the floor","middle")}${L(365,165,520,100,"Electric motor turns the wheels")}${L(295,152,250,40,"Inverter controls the power","middle")}${L(478,176,560,200,"Charging port")}${L(60,232,-60,300,"Braking recharges the battery","middle")}`,330)};

/* Bridges */
{const box=(x,y,title,body)=>`<rect x="${x}" y="${y}" width="440" height="150" rx="10" fill="#e0f2fe" stroke="#64748b"/><rect x="${x}" y="${y+120}" width="440" height="30" fill="#7dd3fc" opacity=".7"/>${body}${T(x+220,y+22,title,"middle","font-weight:700;"+K)}`;
D.bridges={t:"Four main types of bridges",c:"Beam bridges rest on supports at each end or along their length. Arch bridges push their weight outward into strong foundations. Suspension bridges hang the road from cables slung between tall towers, allowing very long spans. Cable-stayed bridges connect the road directly to towers with straight cables.",
svg:S(`${box(-160,10,"Beam bridge",`<rect x="-140" y="80" width="400" height="14" fill="#a16207"/><rect x="-60" y="94" width="18" height="36" fill="#78716c"/><rect x="160" y="94" width="18" height="36" fill="#78716c"/>`)}
${box(340,10,"Arch bridge",`<rect x="360" y="70" width="400" height="12" fill="#a16207"/><path d="M380,130 Q560,0 740,130" fill="none" stroke="#78716c" stroke-width="12"/>${[430,490,560,630,690].map(x=>`<line x1="${x}" y1="82" x2="${x}" y2="${x===560?66:100}" stroke="#78716c" stroke-width="4"/>`).join("")}`)}
${box(-160,180,"Suspension bridge",`<rect x="-140" y="280" width="400" height="10" fill="#a16207"/><rect x="-60" y="215" width="14" height="85" fill="#78716c"/><rect x="164" y="215" width="14" height="85" fill="#78716c"/><path d="M-140,250 Q-100,262 -53,215 Q60,290 171,215 Q215,262 260,250" fill="none" stroke="#334155" stroke-width="3"/>${[-20,20,60,100,140].map(x=>`<line x1="${x}" y1="${250+Math.abs(x-60)*-0.3+5}" x2="${x}" y2="280" stroke="#334155" stroke-width="1.5"/>`).join("")}`)}
${box(340,180,"Cable-stayed bridge",`<rect x="360" y="280" width="400" height="10" fill="#a16207"/><rect x="553" y="205" width="14" height="95" fill="#78716c"/>${[380,420,460,500,620,660,700,740].map(x=>`<line x1="560" y1="215" x2="${x}" y2="280" stroke="#334155" stroke-width="1.5"/>`).join("")}`)}`,340)};}

/* Lockstitch */
{const pan=(x,n,txt)=>{const needleY=[60,130,90,55][n];return `<rect x="${x}" y="30" width="200" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
<rect x="${x+10}" y="150" width="180" height="14" fill="#fde68a" stroke="#a16207"/>
<path d="M${x+100},${needleY-60} V${needleY+40}" stroke="#64748b" stroke-width="5"/><circle cx="${x+100}" cy="${needleY+30}" r="3" fill="#fff"/>
<path d="M${x+100},20 V${needleY+30}" stroke="#dc2626" stroke-width="2"/>
${n===1||n===2?`<path d="M${x+100},${needleY+30} q-30,40 0,60 q20,5 20,-20" stroke="#dc2626" stroke-width="2" fill="none"/>`:""}
<ellipse cx="${x+100}" cy="225" rx="30" ry="18" fill="#cbd5e1" stroke="#475569" stroke-width="2"/><path d="M${x+70},225 H${x+20}" stroke="#2563eb" stroke-width="2"/>
${n>=2?`<path d="M${x+70},215 q30,-50 60,0" stroke="#dc2626" stroke-width="2" fill="none"/>`:""}
${n===3?`<path d="M${x+40},157 q30,0 60,0 q30,0 60,0" stroke="#2563eb" stroke-width="3"/><path d="M${x+40},157 h120" stroke="#dc2626" stroke-width="2" stroke-dasharray="20 10"/>`:""}
${T(x+100,300,txt,"middle")}`};
D.sewingmachine={t:"How a sewing machine makes a lockstitch",c:"A sewing machine uses two threads. The needle carries the upper thread down through the fabric, forming a loop. A rotating hook below catches the loop and wraps it around the lower thread from the bobbin. When the needle rises, the two threads lock together inside the fabric.",
svg:S(`${pan(-160,0,"1. Needle carries thread down")}${pan(65,1,"2. A loop forms below")}${pan(290,2,"3. Hook wraps loop round bobbin")}${pan(515,3,"4. Threads lock in the fabric")}${T(-150,175,"Fabric","start","font-size:11px;"+K)}${T(-80,262,"Bobbin","start","font-size:11px")}`,320)};}

/* Binary */
{const bits=(x,y,vals,on)=>vals.map((v,i)=>`<rect x="${x+i*70}" y="${y}" width="60" height="60" rx="8" fill="${on[i]?"#2563eb":"#e2e8f0"}" stroke="#1e3a8a" stroke-width="2"/>${T(x+i*70+30,y+40,on[i]?"1":"0","middle","font-weight:700;font-size:24px;fill:"+(on[i]?"#fff":"#0f172a"))}${T(x+i*70+30,y-10,v,"middle")}`).join("");
D.binary={t:"Counting in binary",c:"Computers store numbers using only two digits, 0 and 1, called bits. Each place in a binary number is worth twice the place to its right: 1, 2, 4, 8 and so on. To read a binary number, add up the values of the places that contain 1. Eight bits make a byte, which can store a number from 0 to 255 or a letter.",
svg:S(`${bits(-120,60,["8","4","2","1"],[1,1,0,1])}${T(190,100,"= 8 + 4 + 1 = 13","start","font-weight:700")}
${bits(-120,200,["128","64","32","16","8","4","2","1"],[0,1,0,0,0,0,0,1])}${T(450,240,"= 64 + 1 = 65, the code for the letter A","start","font-weight:700")}
${T(-120,30,"Place values double from right to left","start")}${T(-120,310,"Eight bits make one byte","start")}`,330)};}

/* Blockchain */
{const blk=(x,n,prev)=>`<rect x="${x}" y="70" width="190" height="170" rx="12" fill="#ede9fe" stroke="#6d28d9" stroke-width="3"/>${T(x+95,98,"Block "+n,"middle","font-weight:700;"+K)}${B(x+15,112,160,42,"#fff","#a78bfa","Transactions",K)}${T(x+95,180,"Previous: "+prev,"middle","font-size:12px;"+K)}${T(x+95,205,"This block’s fingerprint","middle","font-size:12px;"+K)}${T(x+95,222,["8f3a…","c71e…","2b9d…","e40f…"][n-1],"middle","font-size:12px;font-weight:700;"+K)}`;
D.cryptocurrency={t:"How a blockchain links records",c:"A blockchain groups transactions into blocks. Each block carries a digital fingerprint, called a hash, of the block before it, so the blocks form a chain. Changing an old block would change its fingerprint and break every link after it. Thousands of computers keep copies of the chain and check new blocks, so no single party controls the record.",
svg:S(`${arrow("bc","#6d28d9")}${blk(-150,1,"none")}${blk(90,2,"8f3a…")}${blk(330,3,"c71e…")}${blk(570,4,"2b9d…")}
<g stroke="#6d28d9" stroke-width="4" fill="none" marker-end="url(#bc)"><path d="M40,155 H85"/><path d="M280,155 H325"/><path d="M520,155 H565"/></g>
${T(320,280,"Each block points to the one before it using its fingerprint","middle","font-weight:700")}${T(320,305,"Copies of the whole chain are kept on many computers","middle")}`,320)};}

/* Road layers */
D.roads={t:"Layers of a modern road",c:"A road is built in layers. Compacted natural soil, the subgrade, supports layers of crushed stone that spread the weight of traffic. On top is a smooth, waterproof surface of asphalt or concrete. The road is slightly curved, or cambered, so rainwater runs off into drains at the sides.",
svg:S(`${arrow("rd","#2563eb")}
<g transform="translate(-40,0) scale(0.72,1)"><path d="M-60,80 Q260,50 580,80 L600,110 L-80,110z" fill="#334155"/>
<path d="M-80,110 L600,110 L620,150 L-100,150z" fill="#a8a29e"/>
<path d="M-100,150 L620,150 L640,200 L-120,200z" fill="#d6d3d1"/>
<path d="M-120,200 L640,200 L660,320 L-140,320z" fill="#b07d4f"/>
<g fill="#f8fafc">${[0,140,280,420].map(x=>`<rect x="${x}" y="66" width="60" height="5"/>`).join("")}</g>
<path d="M-140,82 q-15,30 30,30" fill="#7dd3fc"/><path d="M660,82 q15,30 -30,30" fill="#7dd3fc"/>
<path d="M200,60 L-90,88" stroke="#2563eb" stroke-width="2.5" marker-end="url(#rd)"/><path d="M320,60 L610,88" stroke="#2563eb" stroke-width="2.5" marker-end="url(#rd)"/>
</g>${T(147,40,"Camber: water runs to the sides","middle")}
${L(320,95,470,80,"Asphalt surface")}${L(334,130,470,135,"Base: crushed stone")}${L(349,175,470,185,"Sub-base: coarse gravel")}${L(363,260,470,260,"Subgrade: compacted soil")}${L(-126,100,-120,40,"Side drain","middle")}`,330)};

/* Printing press */
D.print={t:"How Gutenberg’s printing press worked",c:"Printers arranged individual metal letters, called movable type, backward in a frame to form a page. The type was inked, a sheet of damp paper was laid on top, and turning a large screw pressed a flat plate, the platen, down onto the paper. Pages could be printed quickly and identically, and the type could be reused.",
svg:S(`${arrow("pp","#334155")}
<rect x="-80" y="20" width="24" height="300" fill="#92400e"/><rect x="240" y="20" width="24" height="300" fill="#92400e"/><rect x="-80" y="20" width="344" height="30" fill="#92400e"/>
<rect x="150" y="80" width="24" height="0"/>
<path d="M92,50 V120" stroke="#57534e" stroke-width="16"/><path d="M60,70 H124" stroke="#78350f" stroke-width="8"/>
<rect x="10" y="120" width="164" height="22" fill="#a16207" stroke="#713f12"/>
<rect x="0" y="190" width="184" height="10" fill="#f8fafc" stroke="#94a3b8"/>
<rect x="0" y="200" width="184" height="30" fill="#475569"/>
<text x="-92" y="222" transform="scale(-1,1)" text-anchor="middle" style="fill:#e2e8f0;font-weight:700;font-size:20px;letter-spacing:14px">TYPE</text>
<rect x="-80" y="230" width="344" height="20" fill="#92400e"/>
<path d="M92,145 V182" stroke="#334155" stroke-width="3" marker-end="url(#pp)"/>
<g transform="translate(500,140)"><rect x="-60" y="-40" width="120" height="80" fill="#f8fafc" stroke="#475569" stroke-width="2"/>${T(0,8,"TYPE","middle","font-weight:700;font-size:24px;"+K)}${T(0,70,"Printed page reads correctly","middle")}</g>
${L(124,70,330,40,"Turn the screw handle")}${L(170,131,330,110,"Platen presses down")}${L(184,195,330,190,"Paper")}${L(160,215,330,250,"Inked metal type, set backward")}`,330)};

/* Satellite orbits */
D.sat={t:"Where satellites orbit",c:"Satellites orbit at different heights depending on their jobs. Low Earth orbit, a few hundred kilometers up, is used by the International Space Station and many observation and internet satellites. Navigation satellites such as GPS orbit about 20,000 km up. Geostationary satellites, about 36,000 km up, circle once a day, so they stay above the same spot, which is useful for weather and TV.",
svg:S(`<circle cx="160" cy="170" r="60" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/><path d="M130,150 q20,-20 40,0 q10,20 -10,30z M175,190 q15,-5 20,10 q-10,10 -20,-10z" fill="#4ade80"/>
<circle cx="160" cy="170" r="80" fill="none" stroke="#22c55e" stroke-width="2.5"/>
<circle cx="160" cy="170" r="125" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="8 6"/>
<circle cx="160" cy="170" r="160" fill="none" stroke="#a855f7" stroke-width="2.5"/>
<rect x="227" y="138" width="16" height="10" fill="#22c55e"/><rect x="240" y="77" width="16" height="10" fill="#f59e0b"/><rect x="291" y="85" width="16" height="10" fill="#a855f7"/>
${L(248,82,420,40,"GPS orbit: about 20,000 km")}${L(299,90,420,85,"Geostationary orbit: about 36,000 km")}${L(235,143,420,135,"Low Earth orbit: about 400–2,000 km")}${L(160,170,420,250,"Earth, about 12,700 km wide")}${T(420,290,"Orbits drawn closer together than in reality","start")}`,340)};

Object.assign(window.DIAG,D);
})();
