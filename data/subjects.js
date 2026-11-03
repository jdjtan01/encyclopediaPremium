// The encyclopedia's arrangement: subjects, each split into sub-sections.
// Every article id appears in exactly one sub-section; the order here is the order of the book.
// [name, icon, [dark color, light color], tagline, introduction, featured ids, sub-sections]
// Sub-section: [name, one-line description, article ids separated by spaces]
window.SUBJECTS=[
["Planet Earth","🌍",["#0f6e5a","#7fd9bf"],"The restless rock we live on",
"Earth is a living planet: its crust moves, its mountains rise and wear away, and water and weather carry heat around the globe. This subject explores the forces that shape the land, the oceans and rivers, and the great wild places of the world.",
["tect","everest","pacific","amazon"],[
["Restless Earth","Moving plates, volcanoes and earthquakes.","tect volc quake tsunami rift taal mayon pinatubo geysers rocks fossils"],
["Mountains and Canyons","The highest peaks and deepest valleys.","everest himal alps andes canyon apo pulag kilimanjaro fuji rockies waterfalls"],
["Water and Weather","Oceans, seas, rivers, tides and climate.","pacific atlantic indocean med reef nile mekong wetlands tides wcycle climate climchange phtyph lakes storms monsoon trench amazonriver yangtze ganges mississippi danube"],
["Lands and Regions","Deserts, ice, forests and islands.","continents desert soil amazon sahara antarc arctic sea iceage caves grasslands fossilfuels pollution deforestation plasticwaste maps timezones"]]],

["Animal Kingdom","🐘",["#4d7c0f","#c3e97a"],"Every creature, great and small",
"From the blue whale to the smallest beetle, living things fill every corner of the planet. This subject meets the mammals, birds, sea creatures, reptiles and minibeasts, and explains the plants and cells that make life possible.",
["elephant","eagle","wshark","dino"],[
["Mammals","Furry, warm-blooded animals that feed their young on milk.","elephant rhino hippo tiger lion cheetah wolf bear panda gorilla giraffe camel kangaroo bat tarsier monkeys horses dogs cats rodents"],
["Birds","Feathered fliers, hunters, talkers and swimmers.","birds eagle owl parrot crow penguin hummingbird ostrich birdmigr hornbill"],
["Sea Life","Creatures of the oceans and coral reefs.","whale shark wshark octopus mollusc crustacean seahorse jelly seaturtle tubbataha fishes coral"],
["Reptiles and Amphibians","Scaly hunters, frogs and the dinosaurs.","snake lizard croc frog dino turtle chameleon salamander tuatara"],
["Insects and Minibeasts","Insects, spiders, worms and other small creatures.","insect butterfly bee ants termite spider beetle dragonfly mosquito worms"],
["Plants and Habitats","Green plants, forests and the webs of life.","photo flower trees bamboo ferns cactus carnivplant fungi eco phbio foodchains conservation"],
["How Life Works","Cells, genes and the story of evolution.","cell dna genome mendel evo microbe classification extinction domestication animalbehavior"]]],

["Space","🪐",["#312e81","#a5b4fc"],"Our place among the stars",
"Beyond the sky lie planets, moons, stars and galaxies stretching across billions of light-years. This subject tours the Solar System, explains how stars live and die, and follows the people and machines that explore space.",
["solar","mars","milky","iss"],[
["The Solar System","The Sun and everything that circles it.","solar sun mercury venus earthplanet moon mars jupiter saturn uranep pluto comet kuiper eclipse spaceweather moons meteors asteroidbelt solarform"],
["Stars and Galaxies","Stars, black holes and the birth of the universe.","stars constellations nebula supernova pulsar bh milky galaxies exoplanet bigbang cmb darkmatter gravwaves distances"],
["Exploring Space","Rockets, telescopes and satellites.","rocket space apollo voyager astronauts iss sat scope jwst astrobio spaceagencies spacejunk marsrovers spacesuits"]]],

["Science and Numbers","🔬",["#1e5fbf","#8cc2ff"],"How the world works, and how we found out",
"Science explains everything from falling apples to the light of distant stars, and mathematics gives it a language. This subject covers matter and energy, numbers and shapes, and the great discoveries that changed how we see the world.",
["atom","grav","pi","galileo"],[
["Matter and Chemistry","What everything is made of.","atom states reactions acid plastics alchemy mixtures metals carbonchem crystals molecules"],
["Forces and Energy","Gravity, motion, light, sound and magnets.","energyphys grav newton fluids thermo waves light sound magnet timephys relat quantum friction machines"],
["Numbers and Shapes","Counting, geometry, algebra and chance.","zero prime pi infin fib alg euclid calc prob stats percent measure graphs trig shapes"],
["Atoms and Particles","Inside the atom: particles, radiation, fusion and strange states of matter.","particles antimatter radioact fusion superconduct"],
["Great Discoveries","The ideas and experiments that changed science.","scimeth copern galileo goldage pasteur curie currents penicil hubble"]]],

["The Human Body","🫀",["#b3261e","#f7a8a2"],"The most amazing machine you will ever own",
"Your body is made of trillions of cells working together, every second of every day. This subject explains how its systems work, how you sense the world, how to stay healthy and how medicine fights disease.",
["heart","brain","vacc","nutri"],[
["Body Systems","Heart, lungs, bones, blood and more.","heart lungs blood digest microbiome kidney bones spine nervous hormone skin liver bloodtypes"],
["Brain and Senses","Thinking, remembering, sensing and sleeping.","brain memory mental eye ear smelltaste sleep pain emotions psychology"],
["Staying Healthy","Food, water, exercise and good habits.","nutri water exercise hygiene teeth firstaid sanitation aging pregnancy"],
["Disease and Medicine","Germs, defenses and the fight against illness.","immune vacc flu malaria allergy cancer diabetes antibiotics pandemic heartdisease surgery transplant tb dengue hiv medimaging"]]],

["History","🏛️",["#8a5a1a","#e6bd78"],"Five thousand years of the human story",
"History is the story of how people built cities, empires and nations, and how ideas, trade and war changed the world. This subject travels from the first civilizations to the world wars and the decades since.",
["egypt","rome","renais","ww2"],[
["Ancient Worlds","The first cities, kingdoms and empires.","mesop egypt kush persia greece rome maya aksum phoenicians celts humanorigins stoneage archaeology"],
["Asia Through the Ages","India, China, Japan, Korea and the Mongols.","indus china mongol precol sulu japan korea mughal seaempires khmer opium"],
["Middle Ages","Raiders, traders and great empires.","byzant caliphate viking crusades silk mali zimbabwe benin ottoman aztec inca blackdeath medieurope"],
["Discovery and Revolution","New ideas, new lands and new nations.","renais reform explor lapulapu spanph slavetrade usrev frrev latinind indrev meiji phrev malolos enlightenment uscivilwar africacolon phamwar"],
["The World Wars","Two global wars and the years between them.","wwi westernfront russrev versailles depression fascism commonwealth ww2 stalingrad dday holocaust pacificwar japocc atomicbomb"],
["Since 1945","The United Nations, the end of empires, the Cold War and after.","un partition independence decol koreanwar coldwar berlinwall cubancrisis vietnam asean martiallaw edsa ussrfall apartheid eu greenrev modernchina middleeast terrorism nukeweapons"]]],

["Countries and Places","🗺️",["#0b5a7a","#7cc9ea"],"Nations, cities and islands of the world",
"The world is home to about two hundred countries, each with its own land, history and way of life. This subject visits countries on every continent, great cities and landmarks, and the island worlds scattered across the oceans.",
["ph","manila","palawan","banaue"],[
["Asia","Countries of the largest and most populous continent.","ph japancountry chinacountry indiacountry indonesiacountry pakistancountry vietnamcountry southkoreacountry irancountry turkeycountry saudicountry thailandcountry malaysiacountry singaporecountry myanmarcountry cambodiacountry laoscountry bruneicountry timorlestecountry bangladeshcountry israelcountry"],
["Africa","Countries of the continent of a thousand languages.","nigeriacountry egyptcountry southafricacountry ethiopiacountry kenyacountry moroccocountry ghanacountry drccountry tanzaniacountry algeriacountry"],
["Europe","Countries of a small but densely populated continent.","germanycountry francecountry russiacountry ukcountry italycountry spaincountry polandcountry netherlandscountry ukrainecountry greececountry swedencountry"],
["The Americas","Countries of North, Central and South America.","usacountry canadacountry mexicocountry brazilcountry argentinacountry perucountry chilecountry colombiacountry cubacountry venezuelacountry"],
["Oceania","Countries of Australia and the Pacific islands.","australiacountry nzcountry pngcountry fijicountry samoacountry tongacountry"],
["Cities and Landmarks","Great cities and famous places.","greatwall pyramids tajmahal machupicchu angkor banaue vigan paris newyork sydney manila cebu baguio tokyo cairo istanbul rio"],
["Islands","Island worlds and their peoples.","greenland borneo mindanao madag hawaii palawan iceland galapagos bohol boracay siargao"]]],

["People","👤",["#7a1f3d","#f4a3b5"],"Lives that changed the world",
"History is made by people. This subject tells the life stories of rulers and reformers, thinkers, scientists, explorers, artists and champions from around the world whose work still shapes our lives.",
["einstein","gandhi","cleopatra","kahlo"],[
["Leaders and Rulers","Presidents, queens, kings, emperors and generals.","cleopatra alexander caesar mansamusa napoleon lincoln aguinaldo aluna quezon magsaysay marcos cory ashoka saladin sejong churchill fdr lenin mao"],
["Freedom and Reform","Campaigners for independence, rights and justice.","gandhi mandela mlk malala rizal bonifacio delpilar mabini silang sora ninoy bolivar toussaint nkrumah tubman"],
["Care and Faith","Lives devoted to healing, teaching, faith and the planet.","teresa nightingale keller lorenzoruiz maathai seacole dunant edhi tutu"],
["Faith and Thought","Founders of world religions and great philosophers.","buddha jesus muhammad confucius laozi socrates kant"],
["Scientists and Inventors","Minds that unlocked nature’s secrets.","einstein darwin newtonp lovelace rfranklin hawking fedelmundo ibnsina hypatia ramanujan kjohnson"],
["Explorers","Journeys across the world and into space.","marcopolo ibnbattuta zhenghe columbus magellan armstrong tereshkova"],
["Artists and Champions","Painters, writers, musicians and athletes.","beethoven kahlo jluna balagtas salonga hidilyn pacquiao achebe garciamarquez tagore murasaki pele bach"]]],

["Arts and Culture","🎨",["#6d28d9","#c9b8ff"],"Painting, stories, music and the stage",
"People have always made art, told stories and played music. This subject explores great painters and sculptors, the books and myths that last for centuries, music from Mozart to hip hop, and theatre, dance and film.",
["davinci","shakes","musicw","cinema"],[
["Art, Architecture and Photography","From cave paintings to masterpieces, great buildings and photographs.","caveart davinci michel impress vangogh picasso gothic architecture photography ukiyoe sculpture calligraphy baroque romanticism modernart islamicart chineseart africanart"],
["Books and Stories","Epics, plays, novels, poems and myths.","homer shakes austen novel fairy gmyth phfolk haikuart phlit comics poetry norsemyth childlit chineselit russianlit africanlit latamlit"],
["Music","Music and dance from symphonies to hip hop.","musicw mozart opera jazz blues beatles reggae hiphop electro guitar opm phdance orchestra drums rockpop kpop indianmusic"],
["Stage and Screen","Theatre, ballet, film, animation and television.","theatre ballet cinema phcinema anim tv puppetry circus musicals bollywood asiantheatre"]]],

["Technology","⚙️",["#0e7490","#6fe3f5"],"The inventions that made the modern world",
"Every machine began as an idea. This subject follows the inventions that changed how we travel, talk, compute and power our homes, from the printing press to artificial intelligence.",
["print","comp","internet","renew"],[
["Inventions and Machines","Engines, printing, radio and photography.","print steam phone radio camera laser robot wheel lightbulb printing3d refrigeration paper compass gunpowder"],
["Transport and Engineering","Trains, planes, cars, ships and bridges.","rail cars ships flight bridges jeepney canals bicycle submarine skyscrapers tunnels"],
["Computers and Communication","Chips, networks and smart machines.","comp chip internet smartphone socialmedia gps crypto quantumcomp videogames cybersecurity coding binary"],
["Artificial Intelligence","Machines that learn, see, talk and reason, and how to use them wisely.","ai aihistory algorithm mlearn neural llm compvision aisafety"],
["Energy and Power","Electricity, batteries and clean energy.","elec battery nuclear renew wind ev phpower solarpower hydropower"]]],

["How We Live","🏘️",["#c2410c","#fdba74"],"Money, beliefs, words, food and play",
"People live together in families, towns and nations. This subject explains how we earn and trade, what the world’s great religions and thinkers teach, how languages work, where our food comes from and the sports we love.",
["money","relig","rice","olymp"],[
["Government and Society","Democracy, law, rights, taxes and cities.","democ law hrights taxes urban phgov indig elections constitution monarchy journalism capitalism socialism liberalism nationalism feminism family education clothing who nato africanunion"],
["Money and Work","Trade, banks, prices and jobs.","supdem money trade inflation gdp stockm insur labor phecon ofw tourism"],
["Beliefs and Ideas","Religions and philosophies of the world.","relig hindu buddh judaism christ islam confu tao socr stoic phfest festivals ethics logic indianphil chinesephil existentialism sikhism shinto jainism indigrelig anthropology"],
["Languages","How people speak, write and sign.","langevo alphabet english spanish mandarin latin arabic signlang phlang baybayin"],
["Food and Farming","Crops, cooking and feeding the world.","agri rice wheat maize potato sugar spice coffee choco fish phfood noodles"],
["Sport","Games, races and great competitions.","olymp soccer bball volley tennis athletics swimming cricket martial chess phsport badminton toys"]]]
];
// Where the old sections went, for old links and for the quick-reference A–Z entries.
window.OLDSEC={"Science":"Science and Numbers","History":"History","Geography":"Planet Earth","Technology":"Technology","Philippines":"Countries and Places","Arts and Literature":"Arts and Culture","Health and the Body":"The Human Body","Mathematics":"Science and Numbers","Religion and Philosophy":"How We Live","Animals and Nature":"Animal Kingdom","Space and Astronomy":"Space","Economics and Society":"How We Live","Food and Agriculture":"How We Live","Music":"Arts and Culture","Sports":"How We Live","Languages":"How We Live","History of Science":"Science and Numbers","People":"People"};
