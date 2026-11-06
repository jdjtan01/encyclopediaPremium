// Diagrams for mRNA vaccines, the sleep cycle, habits, optical illusions, blood sugar and insulin,
// recycling, blood types, coral reefs and symbiosis.
// Uses the helpers from diagrams.js. Simplified, not to scale.
(()=>{
const {L,S,arrow}=window.DG,D={};
const K="fill:#0f172a";
const T=(x,y,t,a="middle",st="")=>`<text x="${x}" y="${y}" text-anchor="${a}"${st?` style="${st}"`:""}>${t}</text>`;
const box=(x,y,w,h,f,t,t2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}" stroke="#475569"/>${T(x+w/2,y+h/2+(t2?-4:5),t,"middle","font-weight:700;"+K)}${t2?T(x+w/2,y+h/2+14,t2,"middle","font-size:12px;"+K):""}`;
const ring=(cx,cy,r,items,id)=>{const n=items.length;let s="",a="";items.forEach((it,i)=>{const t=-Math.PI/2+i*2*Math.PI/n,x=cx+r*Math.cos(t),y=cy+r*Math.sin(t);s+=box(x-it[2]/2,y-28,it[2],56,it[3],it[0],it[1]);
const t1=t+0.5*2*Math.PI/n-0.22,t2=t+0.5*2*Math.PI/n+0.22;a+=`<path d="M${cx+r*Math.cos(t1)},${cy+r*Math.sin(t1)} A${r},${r} 0 0,1 ${cx+r*Math.cos(t2)},${cy+r*Math.sin(t2)}" stroke="#475569" stroke-width="3" fill="none" marker-end="url(#${id})"/>`});return a+s};

/* mRNA vaccine */
D.mrna={t:"How an mRNA vaccine works",c:"An mRNA vaccine carries a set of instructions, wrapped in a tiny bubble of fat, for making one harmless piece of a virus, such as the spike protein of the coronavirus. Cells read the instructions and make the protein for a short time. The immune system learns to recognize it and is ready if the real virus arrives. The mRNA never enters the cell’s nucleus or changes its DNA, and it breaks down within days.",
svg:S(`${arrow("mr","#475569")}
<circle cx="-75" cy="120" r="48" fill="#fde68a" stroke="#b45309" stroke-width="3"/><path d="M-105,120 q8,-14 16,0 q8,14 16,0 q8,-14 16,0 q8,14 16,0" stroke="#db2777" stroke-width="4" fill="none"/>
<ellipse cx="300" cy="130" rx="190" ry="95" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
<circle cx="390" cy="130" r="38" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>${T(390,135,"Nucleus","middle","font-size:11px;"+K)}
<path d="M170,140 q8,-14 16,0 q8,14 16,0 q8,-14 16,0 q8,14 16,0" stroke="#db2777" stroke-width="4" fill="none"/>
<g fill="#a78bfa" stroke="#5b21b6"><circle cx="190" cy="124" r="9"/><circle cx="222" cy="156" r="9"/></g>
<g fill="#f87171" stroke="#991b1b">${[[260,90],[290,175],[250,190]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7"/><path d="M${x},${y-7} v-8 M${x+7},${y} h8 M${x-7},${y} h-8"/>`).join("")}</g>
<g stroke="#475569" stroke-width="3" marker-end="url(#mr)"><line x1="-25" y1="125" x2="105" y2="130"/><line x1="495" y1="130" x2="570" y2="130"/></g>
${box(575,95,190,70,"#e0f2fe","Immune system","learns the spike shape")}
${L(-75,168,-75,230,"1. mRNA in a fat bubble","middle")}${L(200,150,140,250,"2. Ribosomes read the mRNA","middle")}${L(290,175,320,250,"3. Cell makes spike proteins")}${L(390,92,430,40,"DNA in the nucleus is not changed")}${L(670,165,670,250,"4. Antibodies and memory cells","middle")}
${T(310,300,"The mRNA breaks down within days after it has been read.","middle","font-weight:700")}`,315)};

/* Sleep cycle */
const lv={W:60,R:100,1:140,2:180,3:225},hx=h=>-60+h*100;
const seq=[[0,"W"],[0.15,"1"],[0.3,"2"],[0.6,"3"],[1.1,"2"],[1.3,"R"],[1.5,"2"],[1.8,"3"],[2.4,"2"],[2.8,"R"],[3.1,"2"],[3.5,"3"],[3.8,"2"],[4.3,"R"],[4.7,"1"],[4.8,"2"],[5.6,"R"],[6.1,"W"],[6.2,"2"],[7.0,"R"],[7.6,"W"],[7.8,"W"]];
let pth="";seq.forEach(([h,s],i)=>{const x=hx(h),y=lv[s];pth+=i?`H${x}V${y}`:`M${x},${y}`});
D.sleep={t:"A night of sleep",c:"Through the night the brain moves through cycles of light sleep, deep sleep and REM (rapid eye movement) sleep, each lasting about 90 minutes. Deep sleep comes mostly early in the night, while REM periods, when the most vivid dreams happen, grow longer toward morning. Brief awakenings are normal. This is a typical adult pattern; every night is a little different.",
svg:S(`<g stroke="#e2e8f0">${Object.values(lv).map(y=>`<line x1="-60" y1="${y}" x2="740" y2="${y}"/>`).join("")}</g>
${[["W","Awake"],["R","REM sleep"],["1","Stage 1 (light)"],["2","Stage 2 (light)"],["3","Stage 3 (deep)"]].map(([k,n])=>T(-70,lv[k]+4,n,"end","font-weight:700")).join("")}
${seq.filter(x=>x[1]=="R").map(([h])=>`<rect x="${hx(h)}" y="${lv.R-8}" width="${h==1.3?20:h==2.8?30:h==4.3?40:h==5.6?50:60}" height="16" fill="#f472b6" fill-opacity=".45"/>`).join("")}
<path d="${pth}" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="-60" y1="250" x2="740" y2="250" stroke="#475569"/>${[0,1,2,3,4,5,6,7,8].map(h=>`<line x1="${hx(h)}" y1="250" x2="${hx(h)}" y2="256" stroke="#475569"/>${T(hx(h),272,h+"h")}`).join("")}
${T(340,298,"Hours after falling asleep","middle","font-weight:700")}
${L(hx(0.8),225,hx(0.8),40,"","middle")}${T(hx(0.8)+6,36,"Most deep sleep early in the night","start","font-weight:700")}${L(hx(7.2),100,hx(6.8),320,"Longest REM periods near morning","middle")}`,330)};
D.dreams=D.sleep;

/* Habit loop */
D.habits={t:"The habit loop",c:"Many habits follow a loop. A cue, such as a time, place or feeling, triggers a routine, the behavior itself. The routine brings a reward, which teaches the brain to repeat the loop the next time the cue appears. Changing a habit often works best by keeping the cue and reward but swapping in a new routine.",
svg:S(`${arrow("hb","#475569")}
${ring(310,175,140,[["Cue","time, place, feeling",200,"#fef3c7"],["Routine","the behavior",200,"#dbeafe"],["Reward","a good feeling",200,"#dcfce7"]],"hb")}
${T(310,180,"Repeated","middle","font-weight:800")}${T(310,197,"until automatic","middle","font-size:12px")}
${T(-150,80,"Example:","start","font-weight:800")}${T(-150,100,"Cue: feeling bored","start")}${T(-150,120,"Routine: check phone","start")}${T(-150,140,"Reward: something new","start")}
${T(600,240,"To change a habit,","start","font-weight:700")}${T(600,258,"keep the cue and reward","start")}${T(600,276,"but change the routine.","start")}`,350)};

/* Optical illusions */
const ml=(y,out)=>{const d=out?-22:22;return `<line x1="-20" y1="${y}" x2="280" y2="${y}" stroke="#1e293b" stroke-width="4"/><path d="M${-20-d},${y-20} L-20,${y} L${-20-d},${y+20} M${280+d},${y-20} L280,${y} L${280+d},${y+20}" stroke="#1e293b" stroke-width="4" fill="none"/>`};
const eb=(cx,cy,sm)=>{let s=`<circle cx="${cx}" cy="${cy}" r="22" fill="#f97316"/>`;const n=sm?8:6,r=sm?10:30,d=sm?40:70;for(let i=0;i<n;i++){const t=i*2*Math.PI/n;s+=`<circle cx="${cx+d*Math.cos(t)}" cy="${cy+d*Math.sin(t)}" r="${r}" fill="#94a3b8"/>`}return s};
D.illusions={t:"Two classic optical illusions",c:"Left: in the Müller-Lyer illusion the two lines are exactly the same length, but the one with outward-pointing fins looks longer. Right: in the Ebbinghaus illusion the two orange circles are the same size, but the one surrounded by small circles looks bigger. The brain judges size by comparing things with their surroundings.",
svg:S(`<rect x="-150" y="20" width="560" height="290" rx="12" fill="#f8fafc" stroke="#cbd5e1"/><rect x="430" y="20" width="350" height="290" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
${ml(100,false)}${ml(210,true)}
<g stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 4"><line x1="-20" y1="70" x2="-20" y2="240"/><line x1="280" y1="70" x2="280" y2="240"/></g>
${T(130,290,"Same length: the red guides line up","middle","font-weight:700;"+K)}
${eb(545,150,false)}${eb(722,150,true)}
${T(605,290,"Same-sized orange circles","middle","font-weight:700;"+K)}`,325)};

/* Blood sugar and insulin */
D.insulin={t:"How insulin controls blood sugar",c:"After a meal, sugar (glucose) from food enters the blood. The pancreas responds by releasing insulin, which lets body cells take in glucose and tells the liver to store it, bringing blood sugar back down. When blood sugar falls too low, the pancreas releases glucagon, which tells the liver to release stored sugar. In type 1 diabetes the pancreas makes little or no insulin, which is why the discovery of insulin saved so many lives.",
svg:S(`${arrow("in","#dc2626")}${arrow("ig","#2563eb")}
${box(230,135,180,70,"#e2e8f0","Normal blood sugar","")}
${box(-150,20,200,64,"#fee2e2","Meal: blood sugar rises")}
${box(590,20,180,64,"#fde68a","Pancreas releases","insulin")}
${box(590,255,180,64,"#dcfce7","Cells take in sugar,","liver stores it")}
${box(-150,255,200,64,"#dbeafe","Low sugar: pancreas","releases glucagon")}
<g stroke="#dc2626" stroke-width="3" fill="none" marker-end="url(#in)"><path d="M55,52 H582"/><path d="M680,90 V247"/><path d="M590,287 Q500,287 415,195"/></g>
<g stroke="#2563eb" stroke-width="3" fill="none" marker-end="url(#ig)"><path d="M-50,250 V200 Q-50,170 222,170"/></g>
<path d="M230,190 Q60,250 55,270" stroke="#64748b" stroke-width="2" stroke-dasharray="5 4" fill="none"/>
${T(320,40,"too high","middle","fill:#dc2626;font-weight:700")}${T(-40,230,"Liver releases sugar","start","fill:#2563eb;font-weight:700")}${T(130,240,"too low","middle","fill:#64748b;font-weight:700")}`,330)};

/* Recycling loop */
D.recycling={t:"The recycling loop",c:"Recycling turns used materials into new products instead of throwing them away. Items are collected and sorted by material, then cleaned and broken down, for example by shredding plastic, pulping paper or melting glass and metal. Factories use the material to make new products that people buy and use again. Reducing and reusing come first, because they save even more energy and resources.",
svg:S(`${arrow("rl","#16a34a")}
${ring(310,190,160,[["1. Collect","bins and drop-offs",160,"#dcfce7"],["2. Sort","by material",160,"#e0f2fe"],["3. Process","shred, pulp, melt",160,"#fef3c7"],["4. Make","new products",160,"#fce7f3"],["5. Buy and use","then recycle again",160,"#ede9fe"]],"rl")}
${T(-150,40,"First: reduce","start","font-weight:800")}${T(-150,60,"Then: reuse","start","font-weight:800")}${T(-150,80,"Then: recycle","start","font-weight:800")}`,360)};

/* Blood types */
const types=["O","A","B","AB"],ok={O:["O","A","B","AB"],A:["A","AB"],B:["B","AB"],AB:["AB"]};
const cell=(x,y,t)=>`<circle cx="${x}" cy="${y}" r="18" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/>${t.includes("A")?`<path d="M${x-18},${y} l-9,-6 v12z M${x+18},${y} l9,-6 v12z" fill="#2563eb"/>`:""}${t.includes("B")?`<path d="M${x-5},${y-25} h10 v7 h-10z M${x-5},${y+18} h10 v7 h-10z" fill="#16a34a"/>`:""}${T(x,y+5,t,"middle","font-weight:800;"+K)}`;
D.bloodtypes={t:"Who can give red blood cells to whom",c:"Red blood cells carry markers called antigens: type A cells carry A markers, type B carry B, type AB carry both and type O carry neither. The body attacks cells with a marker it does not have, so a person can only receive blood without foreign markers. Type O can be given to anyone, while type AB can receive from everyone. The Rh factor (positive or negative) must also match; it is left out here to keep the chart simple.",
svg:S(`${types.map((t,i)=>cell(-110,80+i*62,t)).join("")}
${T(-110,40,"Cell markers","middle","font-weight:700")}
<g>${types.map((t,i)=>T(160+i*130,48,t,"middle","font-weight:800;font-size:15px")).join("")}</g>
${T(355,22,"Person receiving blood","middle","font-weight:700")}${T(20,40,"Donor","middle","font-weight:700")}
${types.map((d,r)=>T(20,85+r*62,d,"middle","font-weight:800;font-size:15px")+types.map((c,k)=>`<rect x="${110+k*130}" y="${57+r*62}" width="100" height="44" rx="8" fill="${ok[d].includes(c)?"#bbf7d0":"#fee2e2"}" stroke="#94a3b8"/>${T(160+k*130,85+r*62,ok[d].includes(c)?"Yes":"No","middle","font-weight:700;"+K)}`).join("")).join("")}
<path d="M-155,315 l9,-6 v12z" fill="#2563eb"/>${T(-140,320,"A marker","start")}<path d="M-60,309 h12 v9 h-12z" fill="#16a34a"/>${T(-42,320,"B marker","start")}`,335)};

/* Coral polyp and its algae */
D.coral={t:"Inside a coral polyp",c:"A coral reef is built by tiny animals called polyps. Each polyp has a ring of stinging tentacles and lays down a hard skeleton of limestone beneath it. Living inside its tissues are microscopic algae that use sunlight to make food, sharing sugars with the coral and giving it color. When water gets too hot, corals expel the algae and turn white, which is called bleaching.",
svg:S(`<circle cx="-110" cy="40" r="30" fill="#fde047" stroke="#ca8a04" stroke-width="2"/><g stroke="#f59e0b" stroke-width="3"><line x1="-80" y1="60" x2="160" y2="120"/><line x1="-90" y1="70" x2="250" y2="105"/></g>
<rect x="120" y="270" width="380" height="60" fill="#e7e5e4" stroke="#78716c" stroke-width="2"/>
<path d="M200,270 V170 Q200,150 220,150 H400 Q420,150 420,170 V270 Z" fill="#fdba74" fill-opacity=".85" stroke="#c2410c" stroke-width="2"/>
<g stroke="#c2410c" stroke-width="10" stroke-linecap="round" fill="none">${[[215,-50],[250,-70],[290,-80],[330,-80],[370,-70],[405,-50]].map(([x,d],i)=>`<path d="M${x},150 q${i<3?-15:15},${d/2} ${i<3?-5:5},${d}"/>`).join("")}</g>
<path d="M290,150 q20,30 40,0" fill="#7c2d12"/>
<g fill="#65a30d">${[[230,200],[260,230],[300,210],[340,235],[380,205],[250,255],[360,255],[320,190]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>
${L(215,90,60,135,"Stinging tentacles catch food")}${L(310,160,560,120,"Mouth")}${L(340,235,560,200,"Algae make food from sunlight")}${L(400,250,560,250,"Polyp body")}${L(480,300,520,312,"Limestone skeleton builds the reef")}`,340)};

/* Symbiosis */
const face=(x,y,m)=>`<circle cx="${x}" cy="${y}" r="16" fill="${m>0?"#bbf7d0":m<0?"#fecaca":"#e2e8f0"}" stroke="#475569"/>${T(x,y+6,m>0?"+":m<0?"−":"0","middle","font-weight:800;font-size:16px;"+K)}`;
D.symbiosis={t:"Three kinds of symbiosis",c:"Symbiosis is a close relationship between two species. In mutualism both partners gain, like the clownfish that shelters in a sea anemone and helps keep it clean. In commensalism one gains and the other is not affected, like barnacles riding on a whale. In parasitism one gains at the other’s expense, like a tick feeding on a dog’s blood.",
svg:S(`${box(-150,40,280,250,"#f0fdf4","","")}${box(170,40,280,250,"#f8fafc","","")}${box(490,40,280,250,"#fef2f2","","")}
${T(-10,72,"Mutualism","middle","font-weight:800;font-size:15px;"+K)}${T(310,72,"Commensalism","middle","font-weight:800;font-size:15px;"+K)}${T(630,72,"Parasitism","middle","font-weight:800;font-size:15px;"+K)}
<g stroke="#be185d" stroke-width="6" stroke-linecap="round">${[-60,-35,-10,15,40].map(x=>`<path d="M${x},230 q${x/8},-50 ${x/5},-80" fill="none"/>`).join("")}</g><ellipse cx="-10" cy="235" rx="70" ry="16" fill="#f9a8d4"/>
<path d="M-20,150 q30,-25 60,0 q-30,25 -60,0z M40,150 l14,-12 v24z" fill="#fb923c" stroke="#9a3412" stroke-width="2"/><path d="M0,138 v24 M18,136 v28" stroke="#f8fafc" stroke-width="4"/>
<path d="M190,190 q120,-60 240,-10 q-10,40 -100,40 q-120,0 -140,-30z" fill="#64748b"/><g fill="#e7e5e4" stroke="#57534e">${[290,315,340].map(x=>`<path d="M${x},175 l10,-14 l10,14z"/>`).join("")}</g>
<path d="M530,200 q70,-50 140,0 v40 h-140z" fill="#d6a76b" stroke="#78350f" stroke-width="2"/><ellipse cx="630" cy="190" rx="12" ry="8" fill="#44403c"/>
${face(-60,268,1)}${face(40,268,1)}${face(260,268,1)}${face(360,268,0)}${face(580,268,1)}${face(680,268,-1)}
${T(-10,110,"Clownfish and anemone","middle","font-size:12px;"+K)}${T(310,110,"Barnacles on a whale","middle","font-size:12px;"+K)}${T(630,110,"Tick on a dog","middle","font-size:12px;"+K)}
${T(310,320,"+ gains   0 not affected   − harmed","middle","font-weight:700")}`,335)};

Object.assign(window.DIAG,D);
})();
