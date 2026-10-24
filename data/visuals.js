// Scale comparisons and conservation status.
// SCALE: dir "h" = heights standing on one baseline, "w" = lengths, "d" = diameters as circles.
// Items: [label, value, shape, color?]. Values are typical maximum or standard figures, rounded.
const PH_PEAKS={t:"Philippine mountains and volcanoes",dir:"h",u:"m",items:[["Mount Apo",2954,"mount"],["Mount Pulag",2928,"mount"],["Mayon",2463,"mount"],["Pinatubo",1486,"mount"],["Taal",311,"mount"]],c:"Heights above sea level. Pinatubo lost about 260 m of height in its 1991 eruption."};
window.SCALE={
whale:{t:"How long is a blue whale?",dir:"w",u:"m",items:[["Blue whale",30,"fish"],["School bus",12,"bus"],["Adult person",1.7,"bar"]],c:"The blue whale, the largest animal known to have lived, can reach about 30 meters long."},
shark:{t:"Sharks compared with a person",dir:"w",u:"m",items:[["Whale shark",12,"fish"],["Great white shark",6,"fish"],["Adult person",1.7,"bar"]],c:"Whale sharks usually grow to about 12 meters; a few may grow larger."},
elephant:{t:"Elephant heights",dir:"h",u:"m",items:[["African bush elephant",4,"animal"],["Asian elephant",3,"animal"],["Adult person",1.7,"person"]],c:"Heights at the shoulder for large males."},
penguin:{t:"Penguin heights",dir:"h",u:"m",items:[["Emperor penguin",1.2,"bird"],["King penguin",0.95,"bird"],["Little blue penguin",0.33,"bird"],["Eight-year-old child",1.27,"person"]],c:"The emperor is the tallest living penguin; the little blue is the smallest."},
tiger:{t:"Tiger lengths, nose to tail",dir:"w",u:"m",items:[["Amur (Siberian) tiger",3.3,"bar"],["Sumatran tiger",2.5,"bar"],["Adult person lying down",1.7,"bar"]],c:"Large males measured from nose to tail tip."},
octopus:{t:"Octopus arm spans",dir:"w",u:"m",items:[["Giant Pacific octopus",4.3,"bar"],["Common octopus",1.3,"bar"],["Adult person",1.7,"bar"]],c:"Typical arm span of a large adult."},
bat:{t:"Bat wingspans",dir:"w",u:"m",items:[["Golden-crowned flying fox",1.7,"wing"],["Adult person (height)",1.7,"bar"],["Bumblebee bat",0.17,"wing"]],c:"The Philippine golden-crowned flying fox is one of the largest bats; the bumblebee bat is one of the smallest mammals."},
insect:{t:"Insect sizes",dir:"w",u:"cm",items:[["Meganeura (fossil)",70,"wing"],["Atlas moth",25,"wing"],["Adult hand",19,"bar"],["Honeybee",1.5,"bar"]],c:"Wingspans, except the hand, which is its length. Meganeura lived about 300 million years ago."},
wolf:{t:"A gray wolf beside a person",dir:"h",u:"m",items:[["Gray wolf",0.85,"animal"],["Adult person",1.7,"person"]],c:"Height of a large wolf at the shoulder."},
everest:{t:"The highest mountains",dir:"h",u:"m",items:[["Everest",8849,"mount"],["K2",8611,"mount"],["Aconcagua",6961,"mount"],["Kilimanjaro",5895,"mount"],["Mount Apo",2954,"mount"]],c:"Heights above sea level."},
himal:{t:"The highest mountains",dir:"h",u:"m",items:[["Everest",8849,"mount"],["K2",8611,"mount"],["Mont Blanc",4806,"mount"],["Mount Apo",2954,"mount"]],c:"Heights above sea level."},
mars:{t:"Olympus Mons and Earth’s mountains",dir:"h",u:"km",items:[["Olympus Mons",22,"mount"],["Mauna Kea (from seafloor)",10.2,"mount"],["Everest",8.8,"mount"],["Mount Apo",3,"mount"]],c:"Olympus Mons, on Mars, is the tallest volcano in the Solar System."},
mayon:PH_PEAKS,pulag:PH_PEAKS,taal:PH_PEAKS,pinatubo:PH_PEAKS,
solar:{t:"The Sun, Jupiter and Earth",dir:"d",u:"km",items:[["Sun",1392700],["Jupiter",139820],["Earth",12742]],c:"Diameters drawn to scale. About 109 Earths would fit across the Sun."},
jupiter:{t:"Giant planets and Earth",dir:"d",u:"km",items:[["Jupiter",139820],["Saturn",116460],["Neptune",49244],["Earth",12742]],c:"Diameters drawn to scale, not counting rings."},
saturn:{t:"Saturn and its neighbors",dir:"d",u:"km",items:[["Saturn",116460],["Uranus",50724],["Earth",12742]],c:"Diameters drawn to scale. Saturn’s main rings would stretch about 270,000 km across."},
moon:{t:"Earth and the smaller worlds",dir:"d",u:"km",items:[["Earth",12742],["Mars",6779],["Mercury",4879],["Moon",3474]],c:"Diameters drawn to scale."},
iss:{t:"How big is the space station?",dir:"w",u:"m",items:[["International Space Station",109,"bar"],["Football pitch",105,"bar"],["Boeing 747",71,"bar"]],c:"The station’s width across its solar arrays compared with a football pitch and a jumbo jet."},
egypt:{t:"The Great Pyramid",dir:"h",u:"m",items:[["Great Pyramid (originally)",147,"pyramid"],["Statue of Liberty with pedestal",93,"tower"],["Ten-story building",30,"block"]],c:"The Great Pyramid was the tallest human-made structure for about 3,800 years."},
gothic:{t:"Gothic heights",dir:"h",u:"m",items:[["Cologne Cathedral spires",157,"tower"],["Great Pyramid (originally)",147,"pyramid"],["Notre-Dame spire",96,"tower"]],c:"Cologne’s twin spires were completed in 1880."},
nile:{t:"Great rivers",dir:"w",u:"km",items:[["Nile",6650,"bar"],["Amazon",6400,"bar"],["Mekong",4900,"bar"],["Cagayan River",505,"bar"]],c:"Lengths are approximate; some measurements make the Amazon the longest."},
amazon:{t:"Great rivers",dir:"w",u:"km",items:[["Nile",6650,"bar"],["Amazon",6400,"bar"],["Mekong",4900,"bar"],["Cagayan River",505,"bar"]],c:"Lengths are approximate; some measurements make the Amazon the longest."},
mekong:{t:"Great rivers",dir:"w",u:"km",items:[["Nile",6650,"bar"],["Mekong",4900,"bar"],["Cagayan River",505,"bar"]],c:"The Cagayan is the longest river in the Philippines."},
reef:{t:"The Great Barrier Reef’s length",dir:"w",u:"km",items:[["Great Barrier Reef",2300,"bar"],["Philippines, north to south",1850,"bar"]],c:"The reef stretches about 2,300 km along Australia’s coast."},
pacific:{t:"Ocean depths and the highest peak",dir:"h",u:"m",items:[["Mariana Trench (depth)",10935,"block"],["Philippine Trench (depth)",10540,"block"],["Everest (height)",8849,"mount"]],c:"The deepest points of the ocean are deeper than Everest is tall."},
bball:{t:"How high is the hoop?",dir:"h",u:"m",items:[["Basketball rim",3.05,"block"],["Kai Sotto",2.21,"person"],["Average adult",1.65,"person"]],c:"The rim is 10 feet, or 3.05 meters, above the floor."}
};
// IUCN Red List category codes for the main species of each animal article.
window.CONS={elephant:["EN","African savanna elephant"],whale:["EN","Blue whale"],shark:["EN","Whale shark"],penguin:["NT","Emperor penguin"],wolf:["LC","Gray wolf"],tiger:["EN","Tiger"],bat:["EN","Giant golden-crowned flying fox"],phbio:["CR","Philippine eagle"]};
// Standard fact files: the same fields for every planet and every animal, as in a printed reference book.
window.FACT={
mars:{n:"Mars",f:[["Diameter","6,779 km, about half of Earth’s"],["Distance from the Sun","About 228 million km"],["Length of day","24 hours 37 minutes"],["Length of year","687 Earth days"],["Moons","2: Phobos and Deimos"],["Gravity","38% of Earth’s"],["Average temperature","About −60°C"]]},
jupiter:{n:"Jupiter",f:[["Diameter","139,820 km, 11 times Earth’s"],["Distance from the Sun","About 778 million km"],["Length of day","9 hours 56 minutes"],["Length of year","About 11.9 Earth years"],["Moons","About 95 known"],["Gravity","About 2.5 times Earth’s"],["Cloud-top temperature","About −110°C"]]},
saturn:{n:"Saturn",f:[["Diameter","116,460 km, 9 times Earth’s"],["Distance from the Sun","About 1.43 billion km"],["Length of day","About 10 hours 33 minutes"],["Length of year","About 29.5 Earth years"],["Moons","274 confirmed"],["Gravity","About the same as Earth’s"],["Cloud-top temperature","About −140°C"]]},
moon:{n:"The Moon",f:[["Diameter","3,474 km, about a quarter of Earth’s"],["Distance from Earth","About 384,400 km"],["Orbit around Earth","27.3 days"],["New moon to new moon","29.5 days"],["Gravity","About one sixth of Earth’s"],["Temperature","About −170°C at night to 120°C by day"]]},
elephant:{n:"African bush elephant",f:[["Scientific name","Loxodonta africana"],["Height","Up to about 4 m at the shoulder"],["Weight","Up to about 6 tonnes"],["Diet","Grasses, leaves, bark and fruit"],["Lifespan","60–70 years"],["Habitat","Savannas, grasslands and forests of Africa"],["Status","Endangered"]]},
whale:{n:"Blue whale",f:[["Scientific name","Balaenoptera musculus"],["Length","Up to about 30 m"],["Weight","Up to about 180 tonnes"],["Diet","Krill"],["Lifespan","About 80–90 years"],["Habitat","Oceans worldwide"],["Status","Endangered"]]},
shark:{n:"Whale shark",f:[["Scientific name","Rhincodon typus"],["Length","Usually about 12 m"],["Weight","Up to about 20 tonnes"],["Diet","Plankton and small fish"],["Habitat","Warm tropical seas, including Philippine waters"],["Status","Endangered"]]},
penguin:{n:"Emperor penguin",f:[["Scientific name","Aptenodytes forsteri"],["Height","About 1.2 m"],["Weight","22–45 kg"],["Diet","Fish, krill and squid"],["Lifespan","About 20 years"],["Habitat","Antarctic sea ice and seas"],["Status","Near Threatened"]]},
wolf:{n:"Gray wolf",f:[["Scientific name","Canis lupus"],["Length","1–1.6 m, plus the tail"],["Weight","About 30–60 kg"],["Diet","Deer, elk, moose and other large animals"],["Lifespan","6–8 years in the wild"],["Habitat","Forests, tundra, mountains and grasslands"],["Status","Least Concern"]]},
tiger:{n:"Tiger",f:[["Scientific name","Panthera tigris"],["Length","Up to about 3.3 m, nose to tail"],["Weight","Up to about 300 kg"],["Diet","Deer, wild pigs and buffalo"],["Lifespan","10–15 years in the wild"],["Habitat","Forests, grasslands and mangroves of Asia"],["Status","Endangered"]]},
bat:{n:"Giant golden-crowned flying fox",f:[["Scientific name","Acerodon jubatus"],["Wingspan","Up to about 1.7 m"],["Weight","Up to about 1.4 kg"],["Diet","Fig leaves and fruit"],["Habitat","Forests of the Philippines only"],["Status","Endangered"]]},
octopus:{n:"Giant Pacific octopus",f:[["Scientific name","Enteroctopus dofleini"],["Arm span","About 4.3 m"],["Weight","Usually about 15 kg"],["Diet","Crabs, clams and fish"],["Lifespan","3–5 years"],["Habitat","Cold coastal waters of the North Pacific"]]},
phbio:{n:"Philippine eagle",f:[["Scientific name","Pithecophaga jefferyi"],["Length","About 1 m"],["Wingspan","About 2 m"],["Weight","About 4.5–8 kg"],["Diet","Flying lemurs, monkeys, snakes and birds"],["Habitat","Forests of Luzon, Samar, Leyte and Mindanao"],["Status","Critically Endangered"]]}
};
window.CONS.bohol=["NT","Philippine tarsier"];
// Conservation status for articles added later (see data/animals-load.js).
Object.assign(window.CONS,window.CONS_NEW||{});
