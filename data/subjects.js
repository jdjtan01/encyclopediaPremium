// The encyclopedia's arrangement: 11 subjects, each split into sub-sections.
// Every article id appears in exactly one sub-section; the order here is the order of the book.
// [name, icon, [dark color, light color], tagline, introduction, featured ids, sub-sections]
// Sub-section: [name, one-line description, article ids separated by spaces]
window.SUBJECTS=[
["Planet Earth","🌍",["#0f6e5a","#7fd9bf"],"The restless rock we live on",
"Earth is a living planet: its crust moves, its mountains rise and wear away, and water and weather carry heat around the globe. This subject explores the forces that shape the land, the oceans and rivers, and the great wild places of the world.",
["tect","everest","pacific","amazon"],[
["Restless Earth","Moving plates, volcanoes and earthquakes.","tect volc quake tsunami rift taal mayon pinatubo"],
["Mountains and Canyons","The highest peaks and deepest valleys.","everest himal alps andes canyon apo pulag"],
["Water and Weather","Oceans, seas, rivers, tides and climate.","pacific atlantic indocean med reef nile mekong tides wcycle climate climchange phtyph"],
["Lands and Regions","Deserts, ice, forests and islands.","continents desert soil amazon sahara antarc arctic sea"]]],

["Animal Kingdom","🐘",["#4d7c0f","#c3e97a"],"Every creature, great and small",
"From the blue whale to the smallest beetle, living things fill every corner of the planet. This subject meets the mammals, birds, sea creatures, reptiles and minibeasts, and explains the plants and cells that make life possible.",
["elephant","eagle","wshark","dino"],[
["Mammals","Furry, warm-blooded animals that feed their young on milk.","elephant tiger lion wolf bear gorilla giraffe kangaroo bat tarsier"],
["Birds","Feathered fliers, hunters, talkers and swimmers.","birds eagle owl parrot penguin"],
["Sea Life","Creatures of the oceans and coral reefs.","whale shark wshark octopus jelly seaturtle tubbataha"],
["Reptiles and Amphibians","Scaly hunters, frogs and the dinosaurs.","snake lizard croc frog dino"],
["Insects and Spiders","The minibeasts that run the world.","insect butterfly bee ants spider"],
["Plants and Habitats","Green plants, forests and the webs of life.","photo flower trees fungi eco phbio"],
["How Life Works","Cells, genes and the story of evolution.","cell dna genome mendel evo microbe"]]],

["Space","🪐",["#312e81","#a5b4fc"],"Our place among the stars",
"Beyond the sky lie planets, moons, stars and galaxies stretching across billions of light-years. This subject tours the Solar System, explains how stars live and die, and follows the people and machines that explore space.",
["solar","mars","milky","iss"],[
["The Solar System","The Sun and everything that circles it.","solar sun mercury venus moon mars jupiter saturn uranep pluto comet eclipse"],
["Stars and Galaxies","Stars, black holes and the birth of the universe.","stars milky bh pulsar exoplanet bigbang"],
["Exploring Space","Rockets, telescopes and satellites.","rocket space apollo iss sat scope jwst"]]],

["Science and Numbers","🔬",["#1e5fbf","#8cc2ff"],"How the world works, and how we found out",
"Science explains everything from falling apples to the light of distant stars, and mathematics gives it a language. This subject covers matter and energy, numbers and shapes, and the great discoveries that changed how we see the world.",
["atom","grav","pi","galileo"],[
["Matter and Chemistry","What everything is made of.","atom states reactions acid plastics alchemy"],
["Forces and Energy","Gravity, motion, light, sound and magnets.","grav newton relat light sound magnet quantum"],
["Numbers and Shapes","Counting, geometry, algebra and chance.","zero prime pi infin fib alg euclid calc prob stats"],
["Great Discoveries","The ideas and experiments that changed science.","scimeth copern galileo goldage pasteur curie currents penicil hubble"]]],

["The Human Body","🫀",["#b3261e","#f7a8a2"],"The most amazing machine you will ever own",
"Your body is made of trillions of cells working together, every second of every day. This subject explains how its systems work, how you sense the world, how to stay healthy and how medicine fights disease.",
["heart","brain","vacc","nutri"],[
["Body Systems","Heart, lungs, bones, blood and more.","heart lungs blood digest kidney bones spine nervous hormone skin"],
["Brain and Senses","Thinking, remembering, sensing and sleeping.","brain memory mental eye ear smelltaste sleep"],
["Staying Healthy","Food, water, exercise and good habits.","nutri water exercise hygiene teeth"],
["Disease and Medicine","Germs, defenses and the fight against illness.","immune vacc flu malaria allergy"]]],

["History","🏛️",["#8a5a1a","#e6bd78"],"Five thousand years of the human story",
"History is the story of how people built cities, empires and nations, and how ideas, trade and war changed the world. This subject travels from the first civilizations to the world wars and the decades since.",
["egypt","rome","renais","ww2"],[
["Ancient Worlds","The first cities, kingdoms and empires.","mesop egypt greece rome maya"],
["Asia Through the Ages","India, China, Japan, Korea and the Mongols.","indus china mongol precol sulu japan korea"],
["Middle Ages","Raiders, traders and great empires.","byzant viking crusades silk ottoman aztec"],
["Discovery and Revolution","New ideas, new lands and new nations.","renais reform explor lapulapu spanph usrev frrev phrev malolos indrev"],
["The World Wars","Two global wars and the years between them.","wwi commonwealth ww2 holocaust japocc"],
["Since 1945","The United Nations, the end of empires, the Cold War and after.","un independence decol koreanwar coldwar vietnam asean martiallaw edsa ussrfall"]]],

["Countries and Places","🗺️",["#0b5a7a","#7cc9ea"],"Nations, cities and islands of the world",
"The world is home to about two hundred countries, each with its own land, history and way of life. This subject visits countries on every continent, great cities and landmarks, and the island worlds scattered across the oceans.",
["ph","manila","palawan","banaue"],[
["Asia","Countries of the largest and most populous continent.","ph"],
["Cities and Landmarks","Great cities and famous places.","manila cebu baguio vigan banaue"],
["Islands","Island worlds and their peoples.","mindanao palawan bohol boracay siargao iceland madag"]]],

["People","👤",["#7a1f3d","#f4a3b5"],"Lives that changed the world",
"History is made by people. This subject tells the life stories of rulers and reformers, thinkers, scientists, explorers, artists and champions from around the world whose work still shapes our lives.",
["einstein","gandhi","cleopatra","kahlo"],[
["Leaders and Rulers","Presidents, queens, kings, emperors and generals.","cleopatra alexander caesar mansamusa napoleon lincoln aguinaldo aluna quezon magsaysay marcos cory"],
["Freedom and Reform","Campaigners for independence, rights and justice.","gandhi mandela mlk malala rizal bonifacio delpilar mabini silang sora ninoy"],
["Care and Faith","Lives devoted to healing, teaching and faith.","teresa nightingale keller lorenzoruiz"],
["Scientists and Inventors","Minds that unlocked nature’s secrets.","einstein darwin newtonp lovelace rfranklin hawking fedelmundo"],
["Explorers","Journeys across the world and to the Moon.","marcopolo ibnbattuta zhenghe columbus magellan armstrong"],
["Artists and Champions","Painters, writers, musicians and athletes.","beethoven kahlo jluna balagtas salonga hidilyn pacquiao"]]],

["Arts and Culture","🎨",["#6d28d9","#c9b8ff"],"Painting, stories, music and the stage",
"People have always made art, told stories and played music. This subject explores great painters and sculptors, the books and myths that last for centuries, music from Mozart to hip hop, and theatre, dance and film.",
["davinci","shakes","musicw","cinema"],[
["Painting and Sculpture","Great artists and the buildings they inspired.","davinci michel impress vangogh picasso gothic"],
["Books and Stories","Epics, plays, novels, poems and myths.","homer shakes austen novel fairy gmyth phfolk haikuart phlit"],
["Music","Music and dance from symphonies to hip hop.","musicw mozart opera jazz blues beatles reggae hiphop electro guitar opm phdance"],
["Stage and Screen","Theatre, ballet, film, animation and television.","theatre ballet cinema phcinema anim tv"]]],

["Technology","⚙️",["#0e7490","#6fe3f5"],"The inventions that made the modern world",
"Every machine began as an idea. This subject follows the inventions that changed how we travel, talk, compute and power our homes, from the printing press to artificial intelligence.",
["print","comp","internet","renew"],[
["Inventions and Machines","Engines, printing, radio and photography.","print steam phone radio camera laser robot"],
["Transport and Engineering","Trains, planes, cars, ships and bridges.","rail cars ships flight bridges jeepney"],
["Computers and Communication","Chips, networks and smart machines.","comp chip internet smartphone socialmedia ai gps crypto"],
["Energy and Power","Electricity, batteries and clean energy.","elec battery nuclear renew wind ev phpower"]]],

["How We Live","🏘️",["#c2410c","#fdba74"],"Money, beliefs, words, food and play",
"People live together in families, towns and nations. This subject explains how we earn and trade, what the world’s great religions and thinkers teach, how languages work, where our food comes from and the sports we love.",
["money","relig","rice","olymp"],[
["Government and Society","Democracy, law, rights, taxes and cities.","democ law hrights taxes urban phgov indig"],
["Money and Work","Trade, banks, prices and jobs.","supdem money trade inflation gdp stockm insur labor phecon ofw"],
["Beliefs and Ideas","Religions and philosophies of the world.","relig hindu buddh judaism christ islam confu tao socr stoic phfest"],
["Languages","How people speak, write and sign.","langevo alphabet english spanish mandarin latin arabic signlang phlang baybayin"],
["Food and Farming","Crops, cooking and feeding the world.","agri rice wheat maize potato sugar spice coffee choco fish phfood"],
["Sport","Games, races and great competitions.","olymp soccer bball volley tennis athletics swimming cricket martial chess phsport"]]]
];
// Where the old sections went, for old links and for the quick-reference A–Z entries.
window.OLDSEC={"Science":"Science and Numbers","History":"History","Geography":"Planet Earth","Technology":"Technology","Philippines":"Countries and Places","Arts and Literature":"Arts and Culture","Health and the Body":"The Human Body","Mathematics":"Science and Numbers","Religion and Philosophy":"How We Live","Animals and Nature":"Animal Kingdom","Space and Astronomy":"Space","Economics and Society":"How We Live","Food and Agriculture":"How We Live","Music":"Arts and Culture","Sports":"How We Live","Languages":"How We Live","History of Science":"Science and Numbers","People":"People"};
