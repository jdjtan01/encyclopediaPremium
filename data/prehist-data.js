// Prehistoric Life: data for the fossil files, the deep-time timeline, the fossil map and the size comparer.
// Sizes are typical large adults and are approximate. Ma = millions of years ago. Sites are [place, latitude, longitude].
// Periods follow the International Chronostratigraphic Chart (2024), with its standard colors.
window.PREPER=[["Cambrian",538.8,485.4,"#7fa056"],["Ordovician",485.4,443.8,"#009270"],["Silurian",443.8,419.2,"#b3e1b6"],["Devonian",419.2,358.9,"#cb8c37"],["Carboniferous",358.9,298.9,"#67a599"],["Permian",298.9,251.9,"#f04028"],["Triassic",251.9,201.4,"#812b92"],["Jurassic",201.4,145,"#34b2c9"],["Cretaceous",145,66,"#7fc64e"],["Paleogene",66,23.03,"#fd9a52"],["Neogene",23.03,2.58,"#ffe619"],["Quaternary",2.58,0,"#f9f97f"]];
window.PREERA=[["Paleozoic",538.8,251.9,"#99c08d"],["Mesozoic",251.9,66,"#67c5ca"],["Cenozoic",66,0,"#f2f91d"]];
window.PREEXT=[[445,"End-Ordovician"],[372,"Late Devonian"],[251.9,"End-Permian"],[201.4,"End-Triassic"],[66,"End-Cretaceous"]];
// id: [group, diet, from Ma, to Ma, length m (or wingspan), height m, weight kg (0 = not known), body, size label, sites]
window.PRE={
trex:["Theropod dinosaur","Meat",68,66,12,3.9,8000,"theropod","About 12 m long",[["Hell Creek, Montana",47.6,-106.9],["Faith, South Dakota",45.0,-102.0],["Lance Formation, Wyoming",43.2,-104.6],["Red Deer River, Alberta",51.6,-112.9],["Eastend, Saskatchewan",49.5,-108.8]]],
triceratops:["Ceratopsian dinosaur","Plants",68,66,8.5,3,9000,"cerat","About 8–9 m long",[["Hell Creek, Montana",47.4,-106.4],["Lance Formation, Wyoming",43.4,-104.4],["Denver, Colorado",39.7,-105.0],["Frenchman Formation, Saskatchewan",49.4,-107.6],["South Dakota",45.4,-102.8]]],
stegosaurus:["Stegosaur dinosaur","Plants",155,145,9,4,5000,"stego","About 9 m long",[["Morrison, Colorado",39.65,-105.19],["Garden Park, Colorado",38.55,-105.2],["Como Bluff, Wyoming",41.9,-106.0],["Dinosaur National Monument, Utah",40.44,-109.3],["Lourinhã, Portugal",39.25,-9.3]]],
velociraptor:["Dromaeosaur dinosaur","Meat",75,71,2,0.6,17,"raptor","About 2 m long",[["Flaming Cliffs, Mongolia",44.14,103.73],["Tugrikin Shiree, Mongolia",44.2,103.3],["Bayan Mandahu, China",41.7,106.7]]],
brachiosaurus:["Sauropod dinosaur","Plants",154,150,20,12,40000,"brachio","About 18–22 m long",[["Grand Junction, Colorado",39.1,-108.55],["Morrison Formation, Utah",38.9,-110.5],["Morrison Formation, Wyoming",42.4,-106.5]]],
diplodocus:["Sauropod dinosaur","Plants",154,152,25,5,13000,"sauropod","About 24–26 m long",[["Cañon City, Colorado",38.44,-105.24],["Sheep Creek, Wyoming",41.7,-106.1],["Dinosaur National Monument, Utah",40.44,-109.3],["Montana",45.5,-108.5]]],
spinosaurus:["Spinosaurid dinosaur","Mostly fish",99,93,14,4.8,7000,"spino","Up to about 14 m long",[["Bahariya Oasis, Egypt",28.3,28.9],["Kem Kem beds, Morocco",30.9,-4.3],["Central Sahara, Niger",17.5,8.5]]],
ankylosaurus:["Ankylosaur dinosaur","Plants",68,66,7,1.7,6000,"ankylo","About 6–8 m long",[["Hell Creek, Montana",47.6,-107.4],["Lance Formation, Wyoming",43.0,-104.8],["Scollard Formation, Alberta",51.9,-113.0]]],
parasaurolophus:["Hadrosaur dinosaur","Plants",76.5,73,9.5,4.2,2500,"hadro","About 9 m long",[["Dinosaur Provincial Park, Alberta",50.76,-111.5],["Kirtland Formation, New Mexico",36.3,-108.2],["Kaiparowits Plateau, Utah",37.4,-111.7]]],
allosaurus:["Theropod dinosaur","Meat",155,145,9,3,2000,"theropod","About 8.5–9.7 m long",[["Cleveland-Lloyd Quarry, Utah",39.32,-110.69],["Garden Park, Colorado",38.5,-105.3],["Howe Quarry, Wyoming",44.6,-107.9],["Lourinhã, Portugal",39.2,-9.4]]],
iguanodon:["Ornithopod dinosaur","Plants",126,122,10,3.2,3500,"ornitho","About 10 m long",[["Tilgate Forest, Sussex, England",51.05,-0.2],["Bernissart, Belgium",50.47,3.65],["Isle of Wight, England",50.65,-1.35]]],
argentinosaurus:["Titanosaur dinosaur","Plants",95,94,33,7,72000,"sauropod","About 30–35 m long",[["Plaza Huincul, Neuquén, Argentina",-38.93,-69.2]]],
archaeopteryx:["Early bird (dinosaur)","Small animals",151,149,0.5,0.25,0.8,"bird","About 50 cm long",[["Solnhofen, Germany",48.9,10.98],["Eichstätt, Germany",48.89,11.18]]],
pteranodon:["Pterosaur","Fish",86,84,7,2.2,30,"ptero","Wingspan up to about 7 m",[["Smoky Hill Chalk, Kansas",38.9,-100.9],["Pierre Shale, South Dakota",44.2,-101.0]]],
quetzalcoatlus:["Pterosaur","Small animals",68,66,10.5,3.2,225,"ptero","Wingspan about 10–11 m",[["Big Bend, Texas",29.25,-103.25]]],
mosasaurus:["Mosasaur (sea lizard)","Fish, turtles, ammonites",82,66,12,2,0,"mosa","About 12 m long or more",[["Maastricht, Netherlands",50.85,5.69],["Khouribga, Morocco",32.9,-6.9],["New Jersey",40.3,-74.3],["South Dakota",44.4,-100.4],["Seymour Island, Antarctica",-64.27,-56.7]]],
trilobites:["Arthropod","Varied",521,251.9,0.72,0.2,0,"trilo","A few mm to about 72 cm long",[["Burgess Shale, Canada",51.43,-116.47],["Wheeler Shale, Utah",39.3,-113.3],["Alnif, Morocco",31.1,-5.2],["Cincinnati, Ohio",39.1,-84.5],["Chengjiang, China",24.67,102.98],["Jince, Czech Republic",49.8,13.97],["Manuels River, Newfoundland",47.5,-53.0]]],
dimetrodon:["Synapsid (mammal relative)","Meat",295,272,4.6,1.8,250,"dimetro","About 1.7–4.6 m long",[["Texas Red Beds",33.6,-99.2],["Oklahoma",35.0,-97.6],["Bromacker, Germany",50.85,10.6]]],
megalodon:["Shark","Whales, seals",23,3.6,24,5.5,94000,"shark","Up to about 24 m long",[["Calvert Cliffs, Maryland",38.4,-76.4],["Bone Valley, Florida",27.8,-81.8],["Lee Creek, North Carolina",35.4,-76.8],["Sacaco, Peru",-15.5,-74.7],["Malta",35.9,14.4],["Beaumaris, Australia",-37.98,145.05],["Saitama, Japan",36.0,139.1]]],
smilodon:["Saber-toothed cat","Large mammals",2.5,0.01,1.9,1.25,400,"cat","About 1.9 m long",[["La Brea Tar Pits, California",34.06,-118.36],["Lagoa Santa, Brazil",-19.63,-43.9],["Pampas, Argentina",-34.6,-60.0],["Florida",29.6,-82.4]]],
dunkleosteus:["Placoderm (armored fish)","Fish",382,358,4.1,1.1,1000,"placo","About 4 m long",[["Cleveland, Ohio",41.5,-81.7],["Anti-Atlas, Morocco",31.0,-4.6]]],
mammoth:["Mammal (elephant relative)","Plants",0.8,0.004,4.5,3,6000,"mammoth","About 3 m tall at the shoulder",[["Yakutia, Siberia",66.0,129.0],["Wrangel Island, Russia",71.2,-179.5],["Fairbanks, Alaska",64.8,-147.7],["Yukon, Canada",64.0,-139.4],["North Sea floor",53.5,3.0]]],
tiktaalik:["Lobe-finned fish (tetrapod relative)","Fish and small animals",376,374,2.7,0.5,0,"mosa","Up to about 2.7 m long",[["Ellesmere Island, Canada",78.6,-81.0]]],
anomalocaris:["Radiodont (early arthropod relative)","Small animals",518,505,0.38,0.08,0,"trilo","Up to about 38 cm long",[["Burgess Shale, Canada",51.43,-116.47],["Chengjiang, China",24.67,102.98]]],
meganeura:["Griffenfly (giant insect)","Insects",305,299,0.7,0.2,0,"ptero","Wingspan about 70 cm",[["Commentry, France",46.29,2.74]]],
brontosaurus:["Sauropod dinosaur","Plants",156,146,22,8,15000,"sauropod","About 22 m long",[["Como Bluff, Wyoming",41.9,-106.0],["Morrison Formation, Utah",39.0,-110.0],["Garden Park, Colorado",38.55,-105.2]]],
pachycephalosaurus:["Pachycephalosaur dinosaur","Plants",70,66,4.5,1.8,450,"ornitho","About 4.5 m long",[["Hell Creek, Montana",47.5,-106.6],["Lance Formation, Wyoming",43.1,-104.5],["South Dakota",45.3,-102.6]]],
therizinosaurus:["Therizinosaur dinosaur","Plants",71,69,9.5,5,5000,"theropod","About 9–10 m long",[["Nemegt Formation, Mongolia",43.5,101.0]]],
elasmosaurus:["Plesiosaur (sea reptile)","Fish and squid-like animals",81,80,10,1.6,0,"plesio","About 10 m long",[["Western Kansas",38.9,-101.8]]],
livyatan:["Sperm whale relative","Whales, seals and dolphins",9.9,8.9,14,3.5,0,"whale","About 12–17 m long (estimates vary)",[["Pisco Formation, Peru",-14.4,-75.9]]],
woollyrhino:["Mammal (rhinoceros)","Grasses and other plants",0.45,0.014,3.4,2,1800,"rhino","About 3.2–3.6 m long",[["Yakutia, Siberia",68.0,140.0],["Starunia, Ukraine",48.7,24.4],["Chauvet Cave, France (cave art)",44.39,4.42]]],
groundsloths:["Mammal (giant ground sloth)","Plants",3.6,0.012,6,3,4000,"sloth","About 6 m long (Megatherium)",[["Luján, Argentina",-34.57,-59.1],["Tarija, Bolivia",-21.5,-64.7],["Punta Alta, Argentina (Darwin’s finds)",-38.88,-62.07]]],
direwolf:["Mammal (canid)","Large mammals",0.25,0.013,1.6,0.8,68,"cat","About 1.6 m long",[["La Brea Tar Pits, California",34.06,-118.36],["Evansville, Indiana",37.97,-87.56],["Florida",29.6,-82.4],["Valley of Mexico",19.4,-99.1]]],
ichthyosaurs:["Marine reptile (ichthyosaur)","Fish and squid-like animals",250,94,15,3,0,"shark","Most 2–4 m; Shonisaurus about 15 m (shown)",[["Lyme Regis, England",50.72,-2.94],["Holzmaden, Germany",48.63,9.53],["Berlin–Ichthyosaur State Park, Nevada",38.88,-117.6],["Blue Anchor, Somerset (Ichthyotitan)",51.18,-3.39]]],
rhamphorhynchus:["Pterosaur","Fish and squid-like animals",151,148,1.8,0.4,0,"ptero","Wingspan up to about 1.8 m",[["Solnhofen, Germany",48.89,10.99]]],
basilosaurus:["Early whale","Fish, sharks, smaller whales",41.3,33.9,18,2.2,0,"mosa","About 15–20 m long",[["Wadi Al-Hitan, Egypt",29.27,30.04],["Ouachita Parish, Louisiana",32.5,-92.1],["Clarke County, Alabama",31.7,-87.8]]],
glyptodon:["Mammal (armadillo relative)","Plants",3.2,0.011,3.3,1.5,2000,"ankylo","Up to about 3.5 m long",[["Pampas, Argentina",-35.5,-60.0],["Uruguay",-33.5,-56.5],["Tarija, Bolivia",-21.5,-64.7]]]
};
// Original outline drawings. Points are [x, y] in a 100 × 100 box (x along the body, head to the right; y down, 100 = ground).
// A third value 1 makes a sharp corner instead of a curve.
window.PRESIL={
theropod:[[0,40,1],[20,30],[44,13],[60,15],[72,19],[78,9],[90,6],[100,13],[98,24],[82,26],[74,34],[66,46],[69,53],[64,53],[58,56],[55,62],[57,74],[53,92],[61,100,1],[47,100,1],[45,92],[46,76],[40,58],[28,46],[12,43]],
raptor:[[0,34,1],[22,32],[46,22],[60,24],[70,22],[78,12],[90,10],[100,16],[96,24],[82,24],[74,32],[66,44],[74,52],[70,56],[60,52],[56,60],[58,74],[54,92],[62,100,1],[48,100,1],[46,92],[46,76],[40,56],[28,42],[10,38]],
sauropod:[[0,62,1],[16,50],[32,34],[46,22],[60,26],[70,30],[80,20],[91,8],[96,5],[100,9],[97,13],[90,15],[82,30],[74,42],[72,60],[72,100,1],[64,100,1],[63,64],[54,64],[50,66],[50,100,1],[41,100,1],[40,62],[32,52],[15,56]],
brachio:[[0,84,1],[12,76],[28,64],[45,56],[58,46],[66,30],[73,12],[78,4],[85,2],[91,4],[88,8],[81,10],[76,30],[72,50],[71,66],[71,100,1],[63,100,1],[62,72],[50,74],[41,76],[41,100,1],[33,100,1],[31,74],[18,81]],
cerat:[[0,52,1],[18,40],[38,26],[55,27],[66,30],[71,4,1],[78,9],[83,20],[100,12,1],[88,26],[97,36,1],[95,50],[87,54],[78,53],[77,72],[78,100,1],[69,100,1],[68,74],[55,71],[47,72],[48,100,1],[39,100,1],[35,68],[22,57]],
stego:[[0,66,1],[4,52,1],[9,60],[14,49,1],[18,58],[28,48],[32,30,1],[37,42],[43,13,1],[49,36],[55,10,1],[61,36],[66,22,1],[70,42],[77,42],[90,58],[100,60],[98,68],[88,70],[80,68],[77,78],[78,100,1],[70,100,1],[68,80],[56,79],[47,78],[48,100,1],[39,100,1],[35,74],[20,68]],
ankylo:[[0,38],[7,32],[11,40],[9,52],[17,46],[30,26],[38,16,1],[44,12],[52,6,1],[58,8],[66,6,1],[72,10],[80,16],[90,26],[100,36],[98,52],[88,56],[82,60],[81,100,1],[72,100,1],[70,72],[56,76],[45,76],[45,100,1],[35,100,1],[31,70],[20,57],[9,56],[2,50]],
hadro:[[0,44,1],[20,32],[40,19],[56,22],[68,28],[78,22],[82,16],[68,1,1],[72,0],[86,11],[94,13],[100,21],[98,27],[88,29],[80,33],[74,43],[73,58],[75,72],[70,74],[67,60],[58,58],[54,62],[56,76],[52,92],[59,100,1],[46,100,1],[44,92],[44,76],[38,58],[24,48]],
ornitho:[[0,44,1],[20,32],[40,19],[56,22],[68,28],[78,18],[86,15],[94,17],[100,25],[98,31],[88,33],[80,35],[74,44],[73,58],[76,70,1],[70,74],[67,60],[58,58],[54,62],[56,76],[52,92],[59,100,1],[46,100,1],[44,92],[44,76],[38,58],[24,48]],
spino:[[0,52,1],[14,42],[30,30],[34,24],[40,8],[48,0],[56,2],[62,10],[66,22],[72,24],[80,21],[100,25,1],[98,30],[82,32],[74,36],[68,46],[71,54],[66,56],[58,58],[54,62],[56,76],[52,92],[59,100,1],[46,100,1],[44,92],[44,76],[40,58],[26,46],[12,50]],
ptero:[[0,40,1],[12,35],[26,29],[40,22],[46,18],[50,8],[54,18],[60,22],[74,29],[88,35],[100,40,1],[88,46],[72,52],[58,56],[54,64],[50,70],[46,64],[42,56],[28,52],[12,46]],
bird:[[0,46,1],[10,38],[30,36],[45,30],[55,20],[62,26],[70,24],[80,15],[92,17],[100,24,1],[90,28],[80,30],[72,40],[64,56],[62,72],[66,100,1],[59,100,1],[56,74],[48,60],[32,48],[10,52]],
mosa:[[0,18,1],[8,40],[12,48],[30,44],[50,32],[70,30],[86,34],[100,46,1],[96,52],[84,56],[74,58],[72,76],[65,80],[63,62],[50,62],[40,64],[36,78],[30,78],[31,62],[20,56],[12,54],[0,72,1],[7,48]],
shark:[[0,4,1],[10,34],[30,30],[48,22],[55,0,1],[62,22],[82,26],[100,44],[96,54],[86,60],[70,64],[62,96,1],[60,66],[40,64],[36,74,1],[32,66],[14,52],[3,84,1],[8,46]],
placo:[[0,18,1],[10,40],[30,34],[50,24],[66,14],[84,12],[96,24],[100,44],[94,60],[80,66],[66,70],[60,86,1],[55,70],[30,62],[12,56],[0,76,1],[7,48]],
trilo:[[100,50],[95,22],[76,0,1],[70,16],[40,20],[10,34],[0,50],[10,66],[40,80],[70,84],[76,100,1],[95,78]],
dimetro:[[0,76,1],[20,66],[30,57],[32,40],[40,10],[48,0],[56,4],[64,20],[68,46],[78,50],[86,44],[100,52],[98,64],[86,66],[78,64],[75,74],[81,100,1],[72,100,1],[66,80],[52,80],[42,80],[46,100,1],[37,100,1],[30,80],[18,74]],
cat:[[0,36,1],[8,28],[20,22],[40,20],[60,15],[70,13],[78,5],[90,7],[100,18],[98,26],[93,28],[91,42,1],[88,29],[82,31],[76,44],[76,70],[78,100,1],[70,100,1],[66,72],[61,58],[40,60],[30,64],[33,100,1],[25,100,1],[20,72],[14,56],[10,40],[4,42]],
mammoth:[[0,40,1],[4,34],[20,20],[48,7],[60,3],[72,7],[80,20],[84,40],[86,70],[91,86],[85,88],[80,70],[76,52],[72,57],[72,100,1],[61,100,1],[60,67],[40,67],[33,65],[33,100,1],[22,100,1],[18,60],[8,48]],
plesio:[[0,52,1],[10,46],[22,40],[34,38],[44,42],[60,30],[78,16],[92,8],[98,7],[100,10,1],[96,13],[90,13],[76,22],[58,38],[48,50],[46,62],[38,80,1],[34,62],[26,62],[20,64],[12,80,1],[12,62],[6,56]],
sloth:[[0,74,1],[10,62],[22,48],[36,30],[52,22],[66,24],[76,32],[84,40],[92,40],[100,48],[98,56],[90,58],[84,56],[80,62],[84,96],[90,100,1],[76,100,1],[72,74],[60,76],[46,76],[42,100,1],[28,100,1],[28,80],[16,74]],
rhino:[[0,40,1],[6,30],[24,18],[48,10],[62,14],[74,22],[84,26],[92,22],[97,6,1],[96,30],[100,40],[98,52],[88,54],[78,56],[76,66],[78,100,1],[68,100,1],[66,72],[42,72],[38,100,1],[28,100,1],[26,70],[14,62],[8,46]],
whale:[[0,30,1],[6,44],[12,50],[30,40],[55,30],[80,26],[94,30],[100,44],[98,60],[86,66],[70,68],[62,70],[56,86,1],[52,70],[30,66],[14,58],[0,72,1],[6,52]],
human:[[30,14],[70,14],[78,52,1],[70,52,1],[66,28],[65,52],[66,100,1],[53,100,1],[50,58],[47,100,1],[34,100,1],[35,52],[34,28],[30,52,1],[22,52,1]]
};
// Extra strokes drawn over a body, in the same 100 × 100 box (tusks, eyes and so on).
window.PREDECO={mammoth:"M77 50Q96 64 100 42",cat:"",trilo:"M70 30L70 70M58 28L58 72M46 26L46 74M34 30L34 70"};
window.preSil=function(type,L,H,s,x0,gy){const P=PRESIL[type];if(!P)return"";const X=p=>x0+p[0]/100*L*s,Y=p=>gy-H*s+p[1]/100*H*s,f=v=>v.toFixed(1);
const n=P.length,mid=(a,b)=>[(X(a)+X(b))/2,(Y(a)+Y(b))/2];let m0=mid(P[n-1],P[0]),d="M"+f(m0[0])+" "+f(m0[1]);
for(let i=0;i<n;i++){const p=P[i],m=mid(p,P[(i+1)%n]);d+=p[2]?"L"+f(X(p))+" "+f(Y(p))+"L"+f(m[0])+" "+f(m[1]):"Q"+f(X(p))+" "+f(Y(p))+" "+f(m[0])+" "+f(m[1])}
d+="Z";let deco=PREDECO[type]||"";if(deco)deco=deco.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g,(z,a,b)=>f(x0+a/100*L*s)+" "+f(gy-H*s+b/100*H*s));
return{d,deco}};
// A person (1.75 m) and a school bus (12 m) drawn at the same scale, for comparison.
window.preHuman=function(s,x0,gy){const w=.5,h=1.55,b=preSil("human",w,h,s,x0,gy);return`<path d="${b.d}"/><circle cx="${(x0+w*s/2).toFixed(1)}" cy="${(gy-h*s-.1*s).toFixed(1)}" r="${(.11*s).toFixed(1)}"/>`};
window.preBus=function(s,x0,gy){const L=12*s,H=3.2*s,r=.5*s,wh=.5*s;let w="";for(let i=0;i<7;i++)w+=`<rect x="${(x0+(1+i*1.45)*s).toFixed(1)}" y="${(gy-H+.45*s).toFixed(1)}" width="${(1.05*s).toFixed(1)}" height="${(.9*s).toFixed(1)}" rx="${(.1*s).toFixed(1)}" fill="var(--pbw,#fff)" opacity=".55"/>`;
return`<rect x="${x0.toFixed(1)}" y="${(gy-H).toFixed(1)}" width="${L.toFixed(1)}" height="${(H-wh).toFixed(1)}" rx="${r.toFixed(1)}"/>${w}<circle cx="${(x0+2.2*s).toFixed(1)}" cy="${(gy-wh).toFixed(1)}" r="${wh.toFixed(1)}"/><circle cx="${(x0+9.6*s).toFixed(1)}" cy="${(gy-wh).toFixed(1)}" r="${wh.toFixed(1)}"/>`};
// Detailed silhouettes from PhyloPic (phylopic.org), loaded from PhyloPic when online; the outlines above are the offline fallback.
// id: [image UUID, width/height, credit, license, license URL, "w" = image width is the length (or "h" = height), size in m]
window.PREPP={
trex:["6a38b924-85c4-46b6-a04a-0e53f2f4d77f",1536/463,"Manuel Brea Lueiro","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
triceratops:["f2a8724b-4619-4dc2-a545-bea4412867f7",7035/3055,"Matt Dempsey","CC BY 3.0","https://creativecommons.org/licenses/by/3.0/"],
stegosaurus:["d2c242ad-4577-47ca-909b-94f97a48b38f",1536/819,"Matt Dempsey","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
velociraptor:["687923ee-3a11-432b-b2fb-7ffd188c16be",1536/523,"Christian A. Masnaghetti","CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"],
brachiosaurus:["2431b273-7b21-482e-b971-70377686335d",1579/956,"Michael P. Taylor","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
diplodocus:["ae6de50f-1533-498a-9581-033d9b970707",4750/1479,"Jagged Fang Designs","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
spinosaurus:["447ec1df-31e1-4ccf-ad55-51c45d28b910",1536/543,"Alessio Ciaffi","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
ankylosaurus:["27b3da7c-e651-485a-97cd-b3bf8eebcd26",1536/450,"Marie Aimée Allard","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
parasaurolophus:["7d36a10c-43ff-41c5-a939-f3fd203d419c",1453/529,"Jack Mayer Wood","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
allosaurus:["77061207-c2e3-4c0c-bcba-9e78cde9807d",1536/495,"Will Toosey","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
iguanodon:["0fd97fa9-7d64-4a36-b713-a72e073866f7",4247/1752,"Tasman Dixon","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
archaeopteryx:["74fce2bf-3fc0-497b-9083-b6f600a697fe",605/490,"Dann Pigdon","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/","w",.55],
pteranodon:["071babce-127c-4e5d-8472-62e17ad1e7e1",1536/689,"Matt Dempsey","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/","w",7],
quetzalcoatlus:["122e1a0d-86bd-428b-a443-aed26e2a37f0",964/790,"Mark P. Witton & Darren Naish","CC BY 3.0","https://creativecommons.org/licenses/by/3.0/","h",5],
trilobites:["411847f0-d585-42ce-b4c9-682a3b57088f",1090/1536,"Charles D. Walcott (vectorized by T. Michael Keesey)","Public domain","https://creativecommons.org/publicdomain/mark/1.0/","h",.72],
dimetrodon:["b9b73c89-7609-4524-b068-7c7c7f566979",1536/932,"Alessio Ciaffi","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
megalodon:["4c45a2bc-81a2-4b4a-a91a-3decdec14499",1536/687,"Oliver E. Demuth and Cooper et al. (2020), vectorized by Russell Engelman","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
smilodon:["34680fdb-ef6f-424a-8e02-0e42cf0d4efe",1536/870,"Ivan Iofrida","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
dunkleosteus:["4596b37e-326c-4475-9fab-e34f1f8281d2",1536/856,"Russell Engelman","CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"],
mammoth:["f39f0aa9-97f1-4982-976c-07ffb78a4682",1536/1032,"Kamil S. Jaron","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
tiktaalik:["69a2c852-0bd4-4086-b8c8-8d5d0bcdb916",1536/500,"Dave Souza (vectorized by T. Michael Keesey)","CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"],
anomalocaris:["c3b75f48-d943-422b-9234-dc56b39ae01a",1507/1536,"Amy Beauvois","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/","h",.38],
meganeura:["b7b2895c-f9c3-436a-8efa-d80b14fe0918",1725/1611,"Joseba Iza","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/","w",.7],
brontosaurus:["9dd4ab50-08fe-42bb-9af3-2787c9c75387",1536/563,"artrociraptor","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
pachycephalosaurus:["6105ff49-0bd0-477c-8bef-41b0c39fdca9",1174/582,"Emily Willoughby","CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"],
livyatan:["ee0f1d67-96c3-4db6-a850-b107fdeedd88",1950/623,"Darius Nau","CC BY 3.0","https://creativecommons.org/licenses/by/3.0/"],
woollyrhino:["e6d3526b-9ce9-4144-96e0-b2587b4c6a74",1536/973,"Steven Traver","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"],
direwolf:["d913b75d-3055-48e2-b597-78cfbceac165",1466/955,"Margot Michaud","CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"]
};
