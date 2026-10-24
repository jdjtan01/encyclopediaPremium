// Scale drawings, locator maps and Today in history events for the newer articles.
// Load after data/visuals.js and data/locations.js.
Object.assign(window.SCALE,{
sun:{t:"The Sun, Jupiter and Earth",dir:"d",u:"km",items:[["Sun",1392700,"","#fbbf24"],["Jupiter",139820,"","#d6a46b"],["Earth",12742,"","#3b82f6"]],c:"Diameters drawn to scale. About 109 Earths would fit across the face of the Sun."},
mercury:{t:"Mercury, the Moon and Earth",dir:"d",u:"km",items:[["Mercury",4880,"","#9ca3af"],["Moon",3475,"","#d1d5db"],["Earth",12742,"","#3b82f6"]],c:"Diameters drawn to scale. Mercury is only a little larger than our Moon."},
venus:{t:"Venus and Earth",dir:"d",u:"km",items:[["Venus",12104,"","#fcd34d"],["Earth",12742,"","#3b82f6"]],c:"Diameters drawn to scale. Venus is almost exactly the same size as Earth."},
uranep:{t:"Earth, Uranus and Neptune",dir:"d",u:"km",items:[["Earth",12742,"","#3b82f6"],["Uranus",50724,"","#67e8f9"],["Neptune",49244,"","#3b5bdb"]],c:"Diameters drawn to scale. Each ice giant is about four times as wide as Earth."},
pluto:{t:"Pluto, the Moon and Earth",dir:"d",u:"km",items:[["Pluto",2377,"","#d6b38c"],["Moon",3475,"","#d1d5db"],["Earth",12742,"","#3b82f6"]],c:"Diameters drawn to scale. Pluto is smaller than Earth’s Moon."},
giraffe:{t:"How tall is a giraffe?",dir:"h",u:"m",items:[["Giraffe (male)",5.5,"animal"],["African elephant",4,"animal"],["Adult person",1.7,"person"]],c:"Heights of large males. A giraffe’s legs alone can be taller than an adult person."},
wshark:{t:"How long is a whale shark?",dir:"w",u:"m",items:[["Whale shark",12,"fish"],["City bus",12,"bus"],["Great white shark",6,"fish"],["Diver",1.8,"bar"]],c:"Typical adult lengths. The largest whale sharks may reach about 18 m."},
dino:{t:"Dinosaur giants",dir:"w",u:"m",items:[["Argentinosaurus",35,"bar"],["Tyrannosaurus rex",12,"bar"],["School bus",12,"bus"],["Adult person",1.7,"bar"]],c:"Estimated lengths from nose to tail. Sizes of dinosaurs known from incomplete skeletons are approximate."},
croc:{t:"Crocodiles compared",dir:"w",u:"m",items:[["Lolong (saltwater crocodile)",6.17,"bar"],["Philippine crocodile",3,"bar"],["Adult person",1.7,"bar"]],c:"Lolong, caught in Agusan del Sur in 2011, was the largest crocodile ever held in captivity."},
apo:{t:"Philippine mountains and volcanoes",dir:"h",u:"m",items:[["Mount Apo",2954,"mount"],["Mount Pulag",2922,"mount"],["Mayon",2463,"mount"],["Pinatubo",1486,"mount"],["Taal",311,"mount"]],c:"Heights above sea level. Mount Apo is the highest mountain in the Philippines."},
rocket:{t:"Giant rockets",dir:"h",u:"m",items:[["Starship",121,"tower"],["Saturn V",111,"tower"],["Statue of Liberty with base",93,"tower"],["Falcon 9",70,"tower"]],c:"Heights of rockets on the launch pad, compared with the Statue of Liberty."},
bridges:{t:"Long bridges of the Philippines and the world",dir:"w",u:"km",items:[["Cebu–Cordova Link Expressway",8.9,"bar"],["Golden Gate Bridge",2.7,"bar"],["San Juanico Bridge",2.16,"bar"]],c:"Total lengths. The longest bridge in the world, in China, is about 164 km long."}
});
(()=>{const P=(lon,lat,l)=>[lon,lat,"Philippines",16,l];
Object.assign(window.LOC,{
tubbataha:P(119.9,8.9,"Tubbataha Reefs, Sulu Sea"),apo:P(125.27,6.99,"Mount Apo"),tarsier:P(124.0,9.75,"Bohol, home of the tarsier"),wshark:P(123.97,12.95,"Donsol, Sorsogon"),eagle:P(125.6,7.2,"Davao, near the Philippine Eagle Center"),precol:P(125.54,8.95,"Butuan, where balangay boats were found"),
japan:[139.69,35.69,"Japan",40,"Tokyo"],korea:[126.98,37.57,"South Korea",30,"Seoul"],koreanwar:[127,38,"North Korea",24,"The 38th parallel"],indus:[68.14,27.33,"Pakistan",40,"Mohenjo-daro"],
byzant:[28.98,41.01,"Turkey",30,"Constantinople (Istanbul)"],crusades:[35.21,31.77,"Israel",30,"Jerusalem"],holocaust:[19.2,50.03,"Poland",30,"Auschwitz-Birkenau"],vietnam:[106.66,10.76,"Vietnam",30,"Saigon (Ho Chi Minh City)"],ussrfall:[37.62,55.75,"Russia",120,"Moscow"],
zhenghe:[118.8,32.06,"China",60,"Nanjing, where the fleets were built"],ibnbattuta:[-5.8,35.77,"Morocco",40,"Tangier, his birthplace"],columbus:[-74.5,24.1,"Bahamas",40,"San Salvador, Bahamas"],
kangaroo:[134,-25,"Australia",60,"Australia"],giraffe:[37,-1,"Kenya",40,"Kenya"],gorilla:[29.5,-1.5,"Rwanda",30,"The Virunga Mountains"],lion:[34.8,-2.3,"Tanzania",40,"The Serengeti"],lizard:[119.49,-8.55,"Indonesia",40,"Komodo Island"],
atlantic:[-35,25,"",110,"Atlantic Ocean"],indocean:[78,-15,"",110,"Indian Ocean"],tsunami:[95.85,3.3,"Indonesia",50,"Epicenter of the 2004 tsunami"]
});})();
window.TODAY=(window.TODAY||[]).concat([
[1,27,1945,"Soviet troops liberate the Auschwitz camp.","holocaust"],
[11,9,1989,"The Berlin Wall opens.","ussrfall"],
[12,25,1991,"Mikhail Gorbachev resigns; the Soviet Union is dissolved the next day.","ussrfall"],
[6,25,1950,"North Korea invades South Korea, starting the Korean War.","koreanwar"],
[9,15,1950,"UN forces land at Inchon in Korea.","koreanwar"],
[4,23,1951,"Filipino troops hold their ground at the Battle of Yultong in Korea.","koreanwar"],
[7,27,1953,"An armistice ends the fighting in the Korean War.","koreanwar"],
[4,30,1975,"Saigon falls, ending the Vietnam War.","vietnam"],
[12,24,1968,"Apollo 8 astronauts become the first people to orbit the Moon.","apollo"],
[2,18,1930,"Clyde Tombaugh discovers Pluto.","pluto"],
[3,13,1781,"William Herschel discovers Uranus.","uranep"],
[9,23,1846,"Johann Galle finds Neptune where mathematics predicted it.","uranep"],
[1,17,1981,"Martial law is formally lifted in the Philippines.","martiallaw"],
[8,8,1967,"ASEAN is founded in Bangkok.","asean"],
[12,10,1948,"The United Nations adopts the Universal Declaration of Human Rights.","hrights"],
[2,2,1987,"Filipinos ratify the 1987 Constitution.","phgov"],
[12,25,2021,"The James Webb Space Telescope is launched.","jwst"],
[7,12,2022,"The first full-color James Webb Space Telescope images are released.","jwst"],
[3,16,1926,"Robert Goddard launches the first liquid-fuel rocket.","rocket"],
[8,17,1976,"The Moro Gulf tsunami strikes Mindanao.","tsunami"],
[12,26,2004,"An Indian Ocean tsunami strikes 14 countries.","tsunami"],
[10,23,1953,"Philippine television begins with station DZAQ-TV Channel 3.","tv"],
[1,1,1897,"Moving pictures are shown for the first time in Manila.","phcinema"],
[6,7,1995,"The Migrant Workers and Overseas Filipinos Act is signed.","ofw"],
[12,20,1987,"The ferry MV Doña Paz sinks after a collision; more than 4,000 people die.","ships"],
[4,15,1912,"The Titanic sinks in the North Atlantic.","atlantic"],
[11,7,1940,"The Tacoma Narrows Bridge collapses in the wind.","bridges"],
[1,9,2007,"Apple introduces the iPhone.","smartphone"],
[2,4,2004,"Facebook is founded.","socialmedia"],
[5,29,1453,"Constantinople falls to the Ottomans.","byzant"],
[7,15,1099,"Crusaders capture Jerusalem.","crusades"],
[10,9,1446,"King Sejong publishes hangul, the Korean alphabet.","korea"]
]);
