// History map layers: battles, trade routes and voyages, drawn over the borders (loaded with the History map).
// Places are [longitude, latitude]; routes follow approximate courses through the listed waypoints.
window.HLAYERS={
// [name, year, longitude, latitude, article, description]
battles:[
["Battle of Kadesh",-1274,36.5,34.56,"egypt","Ramesses II of Egypt fought the Hittite army in Syria. Years later the two powers signed one of the earliest peace treaties known."],
["Battle of Marathon",-490,23.98,38.12,"greece","Athenian soldiers defeated a Persian invasion force near Athens."],
["Battle of Thermopylae",-480,22.54,38.8,"greece","A small Greek force led by Spartans held a narrow pass against the Persian army of Xerxes for three days."],
["Battle of Gaugamela",-331,43.4,36.6,"alexander","Alexander the Great defeated Darius III, opening the way to the conquest of the Persian Empire."],
["Battle of Cannae",-216,16.13,41.31,"carthage","Hannibal’s Carthaginian army surrounded and destroyed a much larger Roman army in southern Italy."],
["Battle of Actium",-31,20.73,38.95,"rome","Octavian defeated Mark Antony and Cleopatra at sea, and soon became Rome’s first emperor."],
["Battle of Red Cliffs",208,113.9,29.9,"china","Allied southern warlords defeated Cao Cao on the Yangtze River, keeping China divided."],
["Battle of Tours",732,0.69,46.8,"medieurope","Frankish forces under Charles Martel defeated an Umayyad army in what is now France."],
["Battle of Talas",751,72.2,42.5,"caliphate","An Abbasid army defeated the forces of Tang China in Central Asia."],
["Battle of Hastings",1066,0.49,50.91,"medieurope","William of Normandy defeated King Harold II and conquered England."],
["Siege of Baghdad",1258,44.4,33.3,"mongol","Mongol forces captured and sacked Baghdad, ending the Abbasid Caliphate."],
["Battle of Ain Jalut",1260,35.4,32.55,"mongol","The Mamluks of Egypt defeated a Mongol army in Palestine, halting the Mongol advance."],
["Fall of Constantinople",1453,28.98,41.01,"byzant","Ottoman forces under Mehmed II captured the city, ending the Byzantine Empire."],
["Battle of Mactan",1521,123.98,10.31,"lapulapu","Lapulapu’s warriors defeated Ferdinand Magellan’s men on Mactan Island; Magellan was killed."],
["Siege of Tenochtitlan",1521,-99.13,19.43,"aztec","Spanish soldiers and their Indigenous allies captured the Aztec capital after a long siege."],
["First Battle of Panipat",1526,76.97,29.39,"mughal","Babur defeated the Sultan of Delhi, founding the Mughal Empire."],
["Battle of Lepanto",1571,21.0,38.3,"ottoman","A fleet of the Catholic Holy League defeated the Ottoman navy off Greece."],
["Battle of Sekigahara",1600,136.47,35.37,"samurai","Tokugawa Ieyasu’s victory led to the Tokugawa shogunate, which ruled Japan until 1868."],
["Siege of Yorktown",1781,-76.51,37.24,"usrev","A British army surrendered to American and French forces, effectively ending the American Revolutionary War."],
["Battle of Waterloo",1815,4.41,50.68,"napoleon","British, Dutch and Prussian armies defeated Napoleon for the last time."],
["Battle of Gettysburg",1863,-77.23,39.81,"uscivilwar","Union forces defeated the Confederate army in Pennsylvania, a turning point of the American Civil War."],
["Battle of Manila Bay",1898,120.85,14.55,"phrev","The United States Navy destroyed the Spanish fleet in Manila Bay during the Spanish–American War."],
["Battle of Tirad Pass",1899,120.73,17.0,"gdelpilar","General Gregorio del Pilar died holding the mountain pass to cover Emilio Aguinaldo’s retreat."],
["Battle of the Somme",1916,2.7,50.0,"westernfront","One of the bloodiest battles of World War I, with over a million soldiers killed or wounded."],
["Fall of Bataan",1942,120.5,14.6,"japocc","Filipino and American defenders on Bataan surrendered to Japan; the Death March followed."],
["Battle of Midway",1942,-177.4,28.2,"pacificwar","The United States Navy sank four Japanese aircraft carriers, a turning point of the Pacific War."],
["Battle of Stalingrad",1942,44.5,48.7,"stalingrad","The Soviet Union defeated a German army after months of fighting, a turning point of World War II."],
["D-Day landings",1944,-0.6,49.35,"dday","Allied forces landed in Normandy, France, beginning the liberation of Western Europe."],
["Battle of Leyte Gulf",1944,125.5,10.8,"pacificwar","One of the largest naval battles in history, fought as American forces returned to the Philippines."],
["Battle of Dien Bien Phu",1954,103.0,21.39,"vietnam","Viet Minh forces defeated the French army, ending French rule in Indochina."]
],
// [name, from year, to year, color, waypoints, article, description]
routes:[
["Incense Route",-700,200,"#c2410c",[[54.1,17.0],[47.0,15.4],[45.3,15.4],[44.1,17.5],[39.6,24.5],[35.44,30.33],[34.45,31.5]],"trade","Camel caravans carried frankincense and myrrh from southern Arabia to the Mediterranean."],
["Silk Road",-130,1450,"#b8860b",[[108.9,34.3],[103.8,36.1],[94.7,40.1],[89.2,42.9],[76.0,39.5],[66.97,39.65],[62.2,37.66],[51.4,35.7],[44.4,33.3],[38.27,34.55],[36.16,36.2]],"silk","Overland routes linking China with Central Asia, Persia and the Mediterranean, carrying silk, spices, ideas and religions."],
["Maritime spice routes",-100,1500,"#0e7490",[[113.3,22.0],[110,18],[107,11],[104.2,1.3],[100.5,3.5],[95,6],[81.5,5.5],[75.8,11.25],[60,14],[45.0,12.5],[43.4,12.6],[38.5,20.0],[34.5,26.5]],"spice","Sea lanes from China through Southeast Asia and India to Arabia and the Red Sea, carrying spices, silk and porcelain."],
["Trans-Saharan trade",800,1600,"#a16207",[[-3.0,16.77],[-4.9,23.6],[-4.27,31.28]],"mali","Camel caravans traded gold from West Africa for salt from Saharan mines, enriching empires such as Mali and Songhai."],
["Varangian route",800,1050,"#6d28d9",[[17.55,59.33],[24.7,59.6],[31.27,58.52],[31.0,54.8],[30.52,50.45],[31.5,46.6],[30.5,43.5],[28.98,41.01]],"viking","Norse traders sailed and dragged their boats along Eastern European rivers from the Baltic Sea to Constantinople."],
["Hanseatic League",1356,1669,"#be123c",[[-0.1,51.5],[2.5,51.8],[3.22,51.2],[6.5,54.0],[9.99,53.55],[10.68,53.87],[14.5,55.0],[18.3,57.64],[21.5,57.8],[24.1,56.95],[23.0,58.8],[24.75,59.44],[28.0,60.0],[31.27,58.52]],"medieurope","An alliance of German merchant towns that controlled trade across the North Sea and the Baltic."],
["Atlantic triangular trade",1525,1867,"#7f1d1d",[[-9.14,38.7],[-15,25],[-14,12],[2.09,6.36],[-15,2],[-35,8],[-55,14],[-76.8,18],[-62,30],[-35,40],[-9.14,38.7]],"slavetrade","Ships carried goods from Europe to West Africa, enslaved Africans across the Atlantic to the Americas, and sugar, cotton and tobacco back to Europe."],
["Manila galleon (to Acapulco)",1565,1815,"#1d4ed8",[[120.97,14.6],[124.3,12.6],[135,22],[150,33],[170,38],[-170,40],[-150,39],[-135,37],[-123,35],[-114,25],[-99.9,16.85]],"spanph","Spanish galleons sailed from Manila to Acapulco once or twice a year, carrying Asian silk, porcelain and spices, and returned with Mexican silver."],
["Manila galleon (to Manila)",1565,1815,"#1d4ed8",[[-99.9,16.85],[-112,14],[-140,13],[-170,13],[144.75,13.45],[124.3,12.6],[120.97,14.6]],"spanph","The return voyage crossed the Pacific farther south, stopping at Guam on the way to Manila."]
],
// [name, from year, to year, color, waypoints, article, description]
voyages:[
["Norse voyages to North America",1000,1021,"#6d28d9",[[5.3,60.4],[-7,62],[-22,64],[-45.5,61.15],[-55.53,51.6]],"viking","Norse sailors from Greenland reached North America around the year 1000. A site at L’Anse aux Meadows in Newfoundland contains wood cut in 1021."],
["Ibn Battuta’s travels",1325,1354,"#b45309",[[-5.8,35.77],[3.0,36.7],[10.2,36.8],[31.2,30.0],[39.8,21.4],[44.4,33.3],[45.0,12.8],[39.3,-6.2],[51.4,35.7],[69.2,34.5],[77.2,28.6],[75.8,11.25],[73.5,4.2],[80,6],[90.4,23.7],[100.3,5.4],[118.6,24.9],[116.4,39.9],[118.6,24.9],[75.8,11.25],[39.8,21.4],[31.2,30.0],[-5.8,35.77],[-3.0,16.77]],"ibnbattuta","The Moroccan traveler Ibn Battuta journeyed for almost 30 years across Africa, the Middle East, India, Southeast Asia and China."],
["Zheng He’s voyages",1405,1433,"#b91c1c",[[118.8,32.06],[121.8,31.3],[119.6,25.9],[109.2,13.8],[106.8,-5.8],[104.75,-2.99],[102.25,2.19],[98,5.5],[80,6],[75.8,11.25],[62,18],[56.27,26.6],[60,15],[45.3,2.0],[40.1,-3.2]],"zhenghe","The Chinese admiral Zheng He led seven great voyages between 1405 and 1433, reaching Southeast Asia, India, Arabia and East Africa."],
["Columbus’s first voyage",1492,1493,"#0f766e",[[-6.89,37.23],[-17.1,28.1],[-35,27],[-55,25.5],[-74.5,24.06],[-75.9,21.0],[-72.0,19.8]],"columbus","Christopher Columbus sailed west from Spain and reached the Bahamas on October 12, 1492, then Cuba and Hispaniola."],
["Vasco da Gama’s voyage to India",1497,1499,"#9333ea",[[-9.14,38.7],[-23.5,15],[-28,-5],[-22,-25],[5,-34],[18.47,-35],[32,-30],[40.7,-15.0],[39.67,-4.05],[40.1,-3.2],[60,6],[75.8,11.25]],"explor","Vasco da Gama sailed from Portugal around Africa and reached Calicut in India in 1498, opening a sea route from Europe to Asia."],
["Magellan–Elcano voyage around the world",1519,1522,"#ca8a04",[[-6.35,36.78],[-15.4,28],[-28,2],[-43.2,-22.9],[-56,-35],[-67.7,-49.3],[-70.9,-53.5],[-80,-42],[-100,-22],[-140,-8],[-170,8],[144.8,13.4],[125.7,10.73],[125.08,9.93],[123.9,10.3],[118,9.5],[114.9,4.9],[127.4,0.68],[125,-9],[100,-20],[70,-35],[18.47,-35.5],[-10,-20],[-23.5,15],[-15,30],[-6.35,36.78]],"magellan","Ferdinand Magellan’s fleet made the first voyage around the world. Magellan was killed at Mactan in 1521; Juan Sebastián Elcano brought the last ship, Victoria, home to Spain in 1522 with 18 men."]
]
};
