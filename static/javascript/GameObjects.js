/**
 * Terminus - Adaptació al Català per a 2n d'ESO
 * Objectes del joc: Sales (Room), Objectes (Item) i Connexions
 */

// -------------------------------------------------------------
// NIVELL 1: LA LLAR I L'ACADÈMIA DE MÀGIA
// -------------------------------------------------------------

// CASA (Home)
var Home = new Room(
    "Casa",
    "Ets al caliu i la comoditat de la teva pròpia llar.",
    "loc_farm.gif",
    ["Home", "home", "casa"]
);
Home.addItem(new Item(
    "CartaBenvinguda",
    "==========================================================\n" +
    "     BENVINGUT/DA A TERMINUS: L'AVENTURA DE LA TERMINAL   \n" +
    "==========================================================\n\n" +
    "Jove aprenent, les teves paraules tenen poder màgic en aquest món:\n\n" +
    "1. Mira què hi ha al teu voltant amb:           ls\n" +
    "2. Mou-te a un camí o sala amb:                 cd DESTINACIÓ\n" +
    "3. Torna enrere a la sala anterior amb:         cd ..\n" +
    "4. Llegeix cartes o parla amb personatges amb:  cat OBJECTE   (o less OBJECTE)\n" +
    "5. Si no saps on ets, recorda la teva posició:  pwd\n" +
    "6. Demana consells sobre qualsevol encanteri:   man ENCANTERI (o ajuda)\n\n" +
    "Consell d'aprenent: Prem la tecla [TAB] per autocompletar paraules!\n" +
    "Comença explorant: escriu 'ls' per mirar la teva habitació.\n",
    "none.gif",
    ["WelcomeLetter", "carta"]
));

// BOSC DE L'OEST (WesternForest)
var WesternForest = new Room(
    "BoscOest",
    "T'endinses en les profunditats del bosc. Finalment, el sender arriba a una clariana amb un edifici majestuós i imponent. Un cartell daurat a la façana diu: «Acadèmia d'Arts Màgiques: L'Escola d'Elit de la Màgia».",
    "loc_forest.gif",
    ["WesternForest", "boscoest", "bosc"]
);
WesternForest.addItem(new Item(
    "Cartell",
    "«Acadèmia d'Arts Màgiques: L'Escola d'Elit de la Màgia»\nNomés avui: Lliçons introductòries gratuïtes! Novells i principiants benvinguts!",
    "loc_forest.gif",
    ["Sign", "cartell"]
));
WesternForest.addItem(new Item(
    "CartellTornar",
    "Si mai vols tornar directament a Casa, només has d'escriure 'cd ~' o senzillament 'cd' i tornaràs a l'instant al teu refugi.",
    "loc_forest.gif",
    ["BackSign", "cartell_tornar"]
));

// ACADÈMIA DE MÀGIA (SpellCastingAcademy)
var SpellCastingAcademy = new Room(
    "AcademiaMagia",
    "Els passadissos són plens del bullici d'estudiants que van i venen de classe a correcuita. L'interior de l'acadèmia és impressionant, amb voltes gòtiques i sostres alts que fan que sembli encara més gegant per dins.",
    "loc_academy.gif",
    ["SpellCastingAcademy", "academiamagia", "academia"]
);
var HurryingStudent = new Item(
    "EstudiantApressat",
    "Parles amb un estudiant que corre pels passadissos...\nXoca amb tu i cau a terra! S'aixeca a l'acte i et demana disculpes:\n" +
    "«Ostres, perdonam! Anava tan de pressa que no t'he vist... Ei, no t'havia vist mai per aquí. Ets nou/nova, oi? No pateixis, avui és ple d'aprenents novells! Per què no fas un cop d'ull a les lliçons d'iniciació? T'hi acompanyaria, però faig tard a classe! Entra a l'aula de Classes i el professor t'ensenyarà el teu primer gran encanteri. Ens veiem!»",
    "item_student.gif",
    ["HurryingStudent", "estudiant"]
);
SpellCastingAcademy.addItem(HurryingStudent);

// AULA DE CLASSES (Lessons)
var Lessons = new Room(
    "Classes",
    "Entres a l'aula de classes amb ganes d'aprendre. Aquí hi ha silenci i concentració. T'asseus just quan comença la lliçó sobre l'encanteri de telequinesi: «mv» (Moure).",
    "loc_classroom.gif",
    ["Lessons", "classes", "classe"]
);
Lessons.addItem(new Item(
    "Professor",
    "El professor parla amb veu solemne i t'ensenya 3 normes fonamentals:\n" +
    "1. Pots utilitzar 'mv' per moure coses en aquest món màgic.\n" +
    "2. Has d'indicar sempre l'objecte i la nova destinació: mv OBJECTE DESTINACIÓ\n" +
    "3. Aquest encanteri funciona amb elements lleugers, com ara els NinotPractiques de la SalaPractiques.\n\n" +
    "Ara ves a la SalaPractiques i posa't a prova!",
    "item_professor.gif",
    ["Professor", "professor"]
));

// SALA DE PRÀCTIQUES (PracticeRoom)
var PracticeRoom = new Room(
    "SalaPractiques",
    "La sala és plena de ninots d'entrenament perquè els aprenents practiquin els seus nous encanteris de moviment.",
    "loc_practiceroom.gif",
    ["PracticeRoom", "salapractiques", "practiques"]
);
PracticeRoom.addItem(new Item(
    "Instruccions",
    "Benvingut/da a la Sala de Pràctiques! Aquí trobaràs ninots d'entrenament per provar l'encanteri 'mv'.\n" +
    "Prova de moure un ninot cap a la Caixa amb: mv NinotPractiques1 Caixa\n" +
    "Si te n'oblides, consulta el grimori amb 'man mv'.",
    "item_manuscript.gif",
    ["Instructions", "instruccions"]
));
PracticeRoom.addItem(new Item("NinotPractiques1", "Un ninot de palla per a pràctiques de telequinesi.", "item_dummy.gif", ["PracticeDummy1"]));
PracticeRoom.addItem(new Item("NinotPractiques2", "Un ninot de palla per a pràctiques de telequinesi.", "item_dummy.gif", ["PracticeDummy2"]));
PracticeRoom.addItem(new Item("NinotPractiques3", "Un ninot de palla per a pràctiques de telequinesi.", "item_dummy.gif", ["PracticeDummy3"]));
PracticeRoom.addItem(new Item("NinotPractiques4", "Un ninot de palla per a pràctiques de telequinesi.", "item_dummy.gif", ["PracticeDummy4"]));
PracticeRoom.addItem(new Item("NinotPractiques5", "Un ninot de palla per a pràctiques de telequinesi.", "item_dummy.gif", ["PracticeDummy5"]));
PracticeRoom.addCommand("mv");

// CAIXA (Box)
var Box = new Room("Caixa", "Aquesta caixa és massa petita perquè hi puguis entrar tu.", "item_box.gif", ["Box", "caixa"]);
Box.removeCommand("cd");
Box.addCmdText("cd", "Ets massa gran per ficar-te dins la caixa! Però hi pots desar objectes amb 'mv'.");

// PRAT DEL NORD (NorthernMeadow)
var NorthernMeadow = new Room(
    "PratNord",
    "Un prat verd i esplèndid banyat pel sol. Un poni grassonet però majestuós hi corretaia feliçment.",
    "loc_meadow.gif",
    ["NorthernMeadow", "pratnord", "prat"]
);
NorthernMeadow.addItem(new Item(
    "Poni",
    "T'acostes al poni i intentes muntar-lo. Et deixa pujar i feu unes quantes voltes alegres. Aviat es cansa de portar pes i et fa baixar suaument. Llavors mira cap a l'est amb insistència, com si et digués que continuïs en aquella direcció cap a les muntanyes.",
    "item_fatpony.gif",
    ["Pony", "poni"]
));

// MUNTANYES DE L'EST (EasternMountains)
var EasternMountains = new Room(
    "MuntanyesEst",
    "Avançes per un sender de muntanya que et condueix davant l'entrada d'una cova misteriosa. Just a fora hi ha un ancià venerable assegut sobre una roca.",
    "loc_mountains.gif",
    ["EasternMountains", "muntanyesest", "muntanyes"]
);
EasternMountains.addItem(new Item(
    "VellSavi",
    "Parles amb el Vell Savi. Et saluda amb una mirada serena i afable:\n" +
    "«Hola, jove aprenent! Que les estrelles il·luminin el teu camí. Veig en tu un gran valor i determinació. Si tens el coratge necessari, el teu destí t'espera a l'interior d'aquesta cova en forma de portal màgic. Travessa'l i començarà una nova gran etapa de la teva vida.»\n\n" +
    "«Soc un ancià i les meves cames ja no em permeten acompanyar-te, però et deixo els meus manuscrits antics perquè no oblidis cap encanteri essencial!»",
    "item_mysteryman.gif",
    ["OldMan", "vellsavi", "ancià"]
));
EasternMountains.addItem(new Item(
    "ManuscritsAntics",
    "Si mai oblides com s'invoca un encanteri, escriu 'ajuda'.\n" +
    "Per conèixer els detalls i la sintaxi d'un encanteri en concret, escriu 'man' seguit del seu nom.\n" +
    "Per exemple: man mv, man cd, man ls, man cat.",
    "item_manuscript.gif",
    ["OldManuscripts", "manuscrits"]
));

// COVA (Cave)
var Cave = new Room("Cova", "Una cova fosca i humida. S'hi respira aire fred.", "loc_cave.gif", ["Cave", "cova"]);

// PASSADÍS FOSC (DarkCorridor)
var DarkCorridor = new Room("PassadisFosc", "Avances a les palpentes pel passadís fosc fins a trobar una sala humida al final.", "loc_corridor.gif", ["DarkCorridor", "passadisfosc"]);

// ESCALA (Staircase)
var Staircase = new Room("Escala", "Una escala rocosa que puja fins a un carreró sense sortida.", "loc_stair.gif", ["Staircase", "escala"]);
Staircase.addItem(new Item("Cartell", "CARRERÓ SENSE SORTIDA. Fes 'cd ..' per tornar enrere.", "item_sign.gif", ["Sign", "cartell"]));

// SALA HUMIDA (DankRoom)
var DankRoom = new Room("SalaHumida", "Una estança humida i ombrívola. Una roca gran i pesada jeu al costat dret.", "loc_darkroom.gif", ["DankRoom", "salahumida"]);
var Boulder = new Item("RocaGran", "Sents una suau corrent d'aire fresc que prové de darrere de la roca... Potser si la mous al ForatPetit amb 'mv RocaGran ForatPetit' descobriràs què hi ha darrere?", "item_boulder.gif", ["Boulder", "rocagran", "roca"]);
DankRoom.addItem(Boulder);
DankRoom.addCommand("mv");

// FORAT PETIT (SmallHole)
var SmallHole = new Room("ForatPetit", "Un forat estret i enfangat. No hi ha res d'interès per entrar-hi tu.", "none.gif", ["SmallHole", "foratpetit", "forat"]);
SmallHole.addCmdText("cd", "El forat és massa estret i brut per entrar-hi tu mateix/a. És millor fer 'cd ..' per tornar.");

DankRoom.ev.addListener("mvBoulder", function(){
    state.applyState("mvBoulder");
});

// TÚNEL (Tunnel)
var Tunnel = new Room(
    "Tunel",
    "L'ambient és fresc i humit. Al final del túnel es distingeix una resplendor que ve d'una cambra de pedra.",
    "loc_tunnel.gif",
    ["Tunnel", "tunel"]
);
Tunnel.addItem(new Item(
    "Rata",
    "Una rata gegant de la mida d'un gosset! Et mira amb desconfiança i et fa una petita mossegada abans de fugir. Quina criatura més esquerpa!",
    "item_rat.gif",
    ["Rat", "rata"]
));

// CAMBRA DE PEDRA (StoneChamber)
var StoneChamber = new Room(
    "CambraPedra",
    "Tota la sala s'il·lumina amb una resplendor verda i màgica. La llum prové d'un gran portal místic situat al centre. És el portal del destí del qual et parlava el Vell Savi!",
    "loc_portalroom.gif",
    ["StoneChamber", "cambrapedra"]
);

// PORTAL
var Portal = new Room(
    "Portal",
    "Travesses el portal i sents una energia màgica que et transporta a una terra llunyana...",
    "item_portal.gif",
    ["Portal", "portal"]
);

// -------------------------------------------------------------
// NIVELL 2: EL REGNE DE TERMINUS I EL BRUIXOT FOSC
// -------------------------------------------------------------

// PLAÇA DEL POBLE (TownSquare)
var TownSquare = new Room(
    "PlacaPoble",
    "Ets en una plaça assolellada i espaiosa d'un poble medieval. Hi ha un pedestal al centre, però no té cap estàtua. Els vilatans semblen angoixats i miren al voltant amb recel.",
    "loc_square.gif",
    ["TownSquare", "placapoble", "placa"]
);
TownSquare.addItem(new Item(
    "Ciutada1",
    "«Disculpi...», dius amb educació. L'home es gira espantat:\n«Oh, hola! Benvingut/da a Terminus! Disculpa'm, estem tots molt angoixats darrerament. El Bruixot Fosc ha escampat la seva corrupció i els seus monstres per tot arreu. Vés amb molt de compte!»",
    "item_citizen1.gif",
    ["RandomCitizen1", "ciutada1"]
));
TownSquare.addItem(new Item(
    "Ciutada2",
    "L'home aixeca la vista del seu periòdic quan veu que l'observes:\n«Has llegit les notícies? El malefici del bruixot s'ha estès fins a les viles del sud! Són temps molt difícils», murmura sacsejant el cap abans de continuar llegint.",
    "item_citizen2.gif",
    ["RandomCitizen2", "ciutada2"]
));
TownSquare.addItem(new Item(
    "DamaAngoixada",
    "La dona plora desconsoladament amb les mans a la cara:\n«La meva nena!», sanglota, «Els esbirros del bruixot han segrestat la meva filla petita! Sé del cert que aquest malvat monstre hi té a veure... Si us plau, ajuda'm a trobar-la!»",
    "item_lady.gif",
    ["DistraughtLady", "damaangoixada", "dama"]
));

// MERCAT (Marketplace)
var Marketplace = new Room(
    "Mercat",
    "Diverses parades de mercaders s'alineen pel carrer mostrant provisions, pergamins i estris màgics.",
    "loc_market.gif",
    ["Marketplace", "mercat"]
);
var Vendor = new Item(
    "Venedor",
    "«Hola, aprenent!» El venedor et somriu mostrant una dentadura amb alguna peça d'or. «Què cerques avui? Tinc pergamins d'encanteris antics que et seran molt útils!»",
    "item_merchant.gif",
    ["Vendor", "venedor"]
);
Vendor.addCmdText("rm", "«Ja! Aquest encanteri no funciona pas amb tothom, saps? Potser se'm va oblidar d'avisar-te abans...»");
Marketplace.addItem(Vendor);

var RmSpell = new Item(
    "EncanteriRm",
    "«Ah, sí, l'encanteri 'rm' de desintegració», explica el venedor. «Només has de dir 'rm' seguit del nom de l'objecte o obstacle, i s'esvairà d'aquesta dimensió... per sempre més! Fes-lo servir amb compte, jove aprenent.»",
    "item_manuscript.gif",
    ["rmSpell", "encanterirm"]
);
Marketplace.addItem(RmSpell);

var MkdirSpell = new Item(
    "EncanteriMkdir",
    "«Fes realitat les teves idees. Només has de dir 'mkdir' seguit d'un nom, i podràs crear una nova estança o refugi màgic que mai abans havia existit.»",
    "item_manuscript.gif",
    ["mkdirSpell", "encanterimkdir"]
);
Marketplace.addItem(MkdirSpell);

// BIBLIOTECA (Library)
var Library = new Room(
    "Biblioteca",
    "La biblioteca és acollidora, amb una llum suau i una agradable flaire de paper vell. Una catifa verda cobreix el terra.",
    "loc_library.gif",
    ["Library", "biblioteca"]
);
Library.addItem(new Item(
    "LlibreMagia",
    "Les antigues llegendes parlen d'una paraula de poder suprem capaç de fer qualsevol acció sobre qualsevol element: «sudo». Els antics deien que atorgava el control suprem com a Administrador de tot el regne. Malauradament, la contrasenya màgica és oculta en algun lloc dels fitxers del nucli.",
    "item_radspellbook.gif",
    ["TotallyRadSpellbook", "llibremagia"]
));
Library.addItem(new Item(
    "NovelaRomantica",
    "Fulleixes la novel·la a l'atzar:\n«Oh, Horaci, no temis amor meu! Jo et salvaré!», exclamà l'Antònia mentre brandava la seva espasa per derrotar el drac ferotge... Tanques el llibre i el tornes al prestatge.",
    "item_romancenovel.gif",
    ["PaperbackRomance", "novelaromantica"]
));
Library.addItem(new Item(
    "HistoriaTerminus",
    "Un tom històric de centenars de pàgines. Aquí en tens un fragment:\n" +
    "«...velles cròniques narren com el BruixotFosc va amenaçar de fragmentar el regne de Terminus...\n" +
    "...només qui domini la línia de comandos podrà vèncer el malefici del BruixotFosc...\n" +
    "...es diu que el poder suprem de 'sudo' és l'única debilitat coneguda del BruixotFosc...»",
    "item_historybook.gif",
    ["HistoryOfTerminus", "historiaterminus"]
));
Library.addItem(new Item(
    "NostalgiaCasa",
    "Si mai sents nostàlgia de la teva llar, només has de fer 'cd ~' per tornar-hi de seguida. Recorda que desfer el camí et demanarà tornar a caminar.",
    "item_historybook.gif",
    ["NostalgiaForHome", "nostalgiacasa"]
));
Library.addItem(new Item(
    "PalancaDiscreta",
    "Descobreixes una palanca de ferro darrere d'una prestatgeria. Amb curiositat, l'estires i una paret de fusta llisca obrint pas a una sala secreta al darrere!",
    "item_lever.gif",
    ["InconspicuousLever", "palancadiscreta", "palanca"]
));
Library.addCommand("grep");
Library.ev.addListener("pullLever", function(){
    state.applyState("pullLever");
});

// SALA SECRETA (BackRoom)
var BackRoom = new Room(
    "SalaSecreta",
    "Una cambra d'estudi amagada. Hi trobes el mestre bibliotecari investigant amb un petit follet al seu costat.",
    "loc_backroom.gif",
    ["BackRoom", "salasecreta"]
);
BackRoom.addItem(new Item(
    "Grep",
    "El follet té una expressió rondinaire però perspicaç. Et mira fixament i et saluda:\n«Greeeeeep!», diu amb entusiasme.",
    "grep.gif",
    ["Grep", "grep"]
));
BackRoom.addItem(new Item(
    "LlibrePractica",
    "El Pere i la Maria colliren pebrots.\nPebrots i pebrots vora la mar blava.\nLa mar blava plena de petxines,\non el Pere i la Maria colliren pebrots.",
    "item_manuscript.gif",
    ["PracticeBook", "llibrepractica"]
));
var Librarian = new Item(
    "Bibliotecari",
    "«Hola, jove aprenent! Perdona el desordre, però estic molt ocupat investigant sobre el Bruixot Fosc. Em podries fer un gran favor? Cerca totes les referències a 'BruixotFosc' a la HistoriaTerminus. El meu ajudant Grep t'ajudarà!\n" +
    "Per cercar dins d'un text o llibre, només has d'escriure: grep PARAULA LLIBRE\n" +
    "Prova-ho aquí mateix amb el LlibrePractica cercant la paraula 'pebrots':\ngrep pebrots LlibrePractica»",
    "item_librarian.gif",
    ["Librarian", "bibliotecari"]
);
BackRoom.addItem(Librarian);
BackRoom.addCommand("grep");

// CAMÍ ROCCÓS (RockyPath)
var RockyPath = new Room(
    "CamiRoccos",
    "Un camí empedrat envoltat d'herbes que condueix cap a una antiga granja.",
    "loc_rockypath.gif",
    ["RockyPath", "camiroccos", "cami"]
);
var LargeBoulder = new Item(
    "RocaGegant",
    "Una roca colossal bloqueja tot el camí. És massa pesada per empènyer-la amb 'mv'. Prova d'eliminar-la amb l'encanteri 'rm RocaGegant'!",
    "item_boulder.gif",
    ["LargeBoulder", "rocagegant"]
);
LargeBoulder.addCmdText("rm", "Pronuncies l'encanteri de desintegració i la roca gegant s'esvaeix en un espetec màgic!");
LargeBoulder.addValidCmd("rm");
RockyPath.addItem(LargeBoulder);
RockyPath.addCommand("rm");
RockyPath.ev.addListener("rmLargeBoulder", function(){
    state.applyState("rmLargeBoulder");
});

// BOTIGA DE L'ARTESANA (ArtisanShop)
var ArtisanShop = new Room(
    "BotigaArtesana",
    "Les parets del taller són plenes d'engranatges i rellotges de tota mena. Al banc de treball, una enginyera amb ulleres protectores gegants solda peces amb passió.",
    "loc_artisanshop.gif",
    ["ArtisanShop", "botigaartesana", "taller"]
);
var StrangeTrinket = new Item("CristallEstrany", "Un cristall brillant de colors canviants. Molt bonic.", "item_trinket.gif", ["StrangeTrinket", "cristallestrany"]);
StrangeTrinket.addCmdText("rm", "No t'han ensenyat pas que és de mala educació fer desaparèixer les coses dels altres?");
StrangeTrinket.addCmdText("mv", "No toquis això, que no és pas teu!");
ArtisanShop.addItem(StrangeTrinket);

var ClockworkDragon = new Item("DracDeCorda", "Un petit drac mecànic que corre pel banc de feina amb una clau de donar corda a l'esquena.", "item_clockdragon.gif", ["ClockworkDragon", "dracdecorda"]);
ClockworkDragon.addCmdText("rm", "No t'han ensenyat pas que és de mala educació fer desaparèixer les coses dels altres?");
ClockworkDragon.addCmdText("mv", "No toquis el drac, que està treballant!");
ArtisanShop.addItem(ClockworkDragon);

var Artisan = new Item(
    "Artesana",
    "L'artesana s'aixeca les ulleres protectores i et mira sorpresa:\n" +
    "«Ets el nou aprenent? Fas tard! ... Com? Que no ets el meu ajudant?\n" +
    "Bé, igualment pots fer-te útil! Necessito engranatges i ben ràpid!\n" +
    "...\n" +
    "Que no saps com materialitzar coses? Fes servir l'encanteri de creació: escriu «touch Engranatge»! Quan el tinguis, torna a parlar amb mi.»",
    "item_artisan.gif",
    ["Artisan", "artesana"]
);
ArtisanShop.addItem(Artisan);
ArtisanShop.addCommand("touch");
ArtisanShop.ev.addListener("touchGear", function(){
    state.applyState("touchGear");
});
ArtisanShop.ev.addListener("FiveGearsCopied", function(){
    state.applyState("FiveGearsCopied");
});

// GRANJA (Farm)
var Farm = new Room(
    "Granja",
    "Antigament era una granja pròspera, però ara els camps estan eixuts i malmesos pels monstres del bruixot.",
    "loc_farm.gif",
    ["Farm", "granja"]
);
var EarOfCorn = new Item("PanochaDeBlatDeMoro", "L'última panocha de blat de moro que queda a tota la granja.", "item_corn.gif", ["EarOfCorn", "panochadeblatdemoro", "panocha"]);
EarOfCorn.addCmdText("rm", "Per què voldries destruir l'únic aliment que li queda a una família afamada?");
Farm.addItem(EarOfCorn);

var Farmer = new Item(
    "Pages",
    "«Arruïnat! Estic completament arruïnat! Mireu aquests camps devastats... Com alimentaré la meva família amb una sola panocha de blat de moro? Si només pogués duplicar-la amb l'encanteri de clonació: 'cp PanochaDeBlatDeMoro AltraPanocha' podríem sobreviure!»",
    "item_farmer.gif",
    ["Farmer", "pages"]
);
Farm.addItem(Farmer);
Farm.addCommand("cp");
Farm.ev.addListener("CornCopied", function(){
    state.applyState("CornCopied");
});

// CLARIANA (Clearing)
var Clearing = new Room(
    "Clariana",
    "Una petita clariana d'herba on un home sanglota assegut sobre una pedra. Darrere seu hi ha un munt d'enderrocs d'on abans s'alçava la seva casa.",
    "loc_clearing.gif",
    ["Clearing", "clariana"]
);
var CryingMan = new Item(
    "HomePlorant",
    "«Tu! Saps fer màgia! Ja ho veig... Els monstres del Bruixot Fosc van destruir la meva llar i van segrestar la meva filla petita!\n" +
    "La meva dona va anar a demanar auxili a la vila i no n'he sabut res més...\n" +
    "Si de debò tens un bon cor i vols ajudar-nos, demostra-ho construint-me una nova llar amb l'encanteri arquitectònic: escriu «mkdir Casa»!»",
    "item_man.gif",
    ["CryingMan", "homeplorant"]
);
Clearing.addItem(CryingMan);
Clearing.removeCommand("cd");
Clearing.addCmdText("cd", "No pots creuar el pont cap a la cova dels trolls fins que no hagis col·locat el Taulo que falta.");
Clearing.addCommand("mkdir");
Clearing.ev.addListener("HouseMade", function(){
    state.applyState("HouseMade");
});

// PONT TRENCAT (BrokenBridge)
var BrokenBridge = new Room(
    "PontTrencat",
    "Un pont de fusta i cordes que travessa un abisme pregon. Li falta un Taulo per poder creuar sense caure.",
    "loc_bridge.gif",
    ["BrokenBridge", "ponttrencat", "pont"]
);
BrokenBridge.addCommand("touch");
BrokenBridge.ev.addListener("touchPlank", function(){
    state.applyState("touchPlank");
});

// CAMÍ TÈTRIC (OminousLookingPath)
var OminousLookingPath = new Room(
    "CamiTetric",
    "Un sender estret que mena cap a una caverna sinistra. Una atmosfera glaçada et fa eriçar la pell.",
    "loc_path.gif",
    ["OminousLookingPath", "camitetric", "sendertetric"]
);
var ThornyBrambles = new Item(
    "EsbarzersEspinosos",
    "Una espessa bardissa d'esbarzers amb espines molt afilades que bloqueja l'entrada a la caverna. Només l'encanteri 'rm EsbarzersEspinosos' la podrà fer desaparèixer.",
    "item_brambles.gif",
    ["ThornyBrambles", "esbarzersespinosos", "esbarzers"]
);
ThornyBrambles.addCmdText("mv", "No pots tocar-los amb les mans, tenen espines verinoses!");
ThornyBrambles.addCmdText("rm", "Pronuncies les paraules de desintegració. Els esbarzers brillen d'un blau intens i s'esvaeixen en una glopada de fum!");
ThornyBrambles.addValidCmd("rm");
OminousLookingPath.addItem(ThornyBrambles);
OminousLookingPath.addCommand("rm");
OminousLookingPath.ev.addListener("rmBrambles", function(){
    state.applyState("rmBrambles");
});

// TOBOGAN (Slide)
var Slide = new Room(
    "Tobogan",
    "Un tobogan de pedra molt llarg i inclinat. Al fons de tot es veuen els Fitxers del Nucli (FitxersKernel).",
    "none.gif",
    ["Slide", "tobogan"]
);
Slide.removeCommand("cd");
Slide.addCmdText("cd", "Primer has de superar el TrollLleig per poder-hi lliscar.");

// FITXERS DEL NUCLI (KernelFiles)
var KernelFiles = new Room(
    "FitxersKernel",
    "Els Fitxers del Nucli custodien el secret més preuat de tot el sistema: la paraula d'Administrador (sudo). Llegeix atentament les Instruccions.",
    "none.gif",
    ["KernelFiles", "fitxerskernel"]
);
var Certificate = new Item(
    "Certificat",
    "El certificat està segellat màgicament. Per obrir-lo necessites l'encanteri suprem: 'sudo cat Certificat' (o 'sudo less Certificat').",
    "item_manuscript.gif",
    ["Certificate", "certificat"]
);
KernelFiles.addItem(Certificate);

var Instructions = new Item(
    "Instruccions",
    "Enhorabona per haver arribat fins aquí! Ara posaràs a prova el teu rastrejador 'grep':\n\n" +
    "A la sala contigua 'MesFitxersKernel' hi ha molts textos antics i un d'ells conté la contrasenya màgica de 'sudo'. Aquest mot de poder et conferirà el rang suprem de Mestre del Món.\n\n" +
    "Saps que la contrasenya es troba en una línia que diu exactament 'password='. Cerca-la amb grep dins dels fitxers!\n" +
    "Quan la descobreixis, invoca 'sudo cat Certificat'. Se't demanarà la contrasenya: escriu-la i s'obriran les portes del Paradís!",
    "item_manuscript.gif",
    ["Instructions", "instruccions"]
);
KernelFiles.addItem(Instructions);
KernelFiles.addCommand("sudo");
KernelFiles.addCmdText("sudo", "Contrasenya / Password:");

KernelFiles.ev.addListener("tryEnterSudo", function(){
    KernelFiles.addCommand("IHTFP");
    KernelFiles.addCmdText("IHTFP", "Has introduït correctament la contrasenya secreta! Entres amb tots els honors al Paradís!");
    KernelFiles.addCommand("PARADIS");
    KernelFiles.addCmdText("PARADIS", "Has introduït correctament la contrasenya secreta! Entres amb tots els honors al Paradís!");
});
KernelFiles.ev.addListener("sudoComplete", function(){
    state.applyState("sudoComplete");
});

// PARADÍS (Paradise)
var Paradise = new Room(
    "Paradis",
    "==========================================================\n" +
    "   ENHORABONA! HAS ASSOLIT EL PARADÍS DE TERMINUS!        \n" +
    "==========================================================\n\n" +
    "Amb el teu domini de la línia de comandos i de la màgia de la terminal:\n" +
    "- Has après a navegar pel món amb 'cd', 'ls' i 'pwd'.\n" +
    "- Has inspeccionat i llegit amb 'cat' i 'less'.\n" +
    "- Has mogut obstacles amb 'mv'.\n" +
    "- Has desintegrat impediments amb 'rm'.\n" +
    "- Has creat matèria amb 'touch' i l'has clonada amb 'cp'.\n" +
    "- Has fundat noves estances amb 'mkdir'.\n" +
    "- Has rastrejat textos immensos amb 'grep'.\n" +
    "- Has alliberat la petita segrestada i has desbaratat els plans del Bruixot Fosc!\n\n" +
    "Ara ets oficialment un Mestre de la Terminal de 2n d'ESO!",
    "loc_theend.gif",
    ["Paradise", "paradis"]
);
Paradise.addCmdText("ls", "El Paradís és un indret ple de pau i saviesa. Tot està en calma.");

// MÉS FITXERS DEL NUCLI (MoreKernelFiles)
var MoreKernelFiles = new Room(
    "MesFitxersKernel",
    "Una immensa sala d'arxius repleta de volums i textos antics. Fes servir 'grep' per trobar la contrasenya!",
    "none.gif",
    ["MoreKernelFiles", "mesfitxerskernel"]
);
MoreKernelFiles.addCommand("grep");

// Capítols de lectura on s'amaga la contrasenya
var baseStory = "L'Alícia començava a estar molt cansada d'estar asseguda al costat de la seva germana a la vora del riu, sense fer res.\n" +
"Una o dues vegades havia mirat el llibre que llegia la seva germana, però no tenia imatges ni diàlegs.\n" +
"«I de què serveix un llibre», va pensar l'Alícia, «sense imatges ni converses?»\n\n" +
"Així que estava rumiant (en la mesura que podia, perquè la calor del dia la feia sentir molt somnolenta),\n" +
"quan de sobte un Conill Blanc amb ulls rosats va passar corrent molt a prop seu...\n" +
"El Conill va treure un rellotge de la butxaca de l'armilla, el va mirar i va exclamar:\n" +
"«Ai mare, que faré tard!»\n";

var L_txt = new Item("L_txt", baseStory, "none.gif", ["L_txt"]);
var M_txt = new Item("M_txt", baseStory + "\nEl conill va saltar dins d'un cau profund sota la bardissa.", "none.gif", ["M_txt"]);
var Q_txt = new Item("Q_txt", baseStory + "\nLa caiguda semblava que no s'havia d'acabar mai...", "none.gif", ["Q_txt"]);
var R_txt = new Item("R_txt", baseStory + "\nHi havia armaris encastats a les parets de la roca.", "none.gif", ["R_txt"]);
var S_txt = new Item("S_txt", baseStory + "\nVa trobar una ampolleta que deia «BEU-ME» amb lletres clares.", "none.gif", ["S_txt"]);
var T_txt = new Item("T_txt", baseStory + "\nUna clau d'or diminuta brillava sobre la taula de vidre.", "none.gif", ["T_txt"]);
var U_txt = new Item("U_txt", baseStory + "\nAl revers d'un manuscrit màgic hi ha anotat: password=IHTFP (també vàlid: password=PARADIS)", "none.gif", ["U_txt"]);
var V_txt = new Item("V_txt", baseStory + "\nLes portes del gran vestíbul continuaven tancades amb pany i clau.", "none.gif", ["V_txt"]);
var W_txt = new Item("W_txt", baseStory + "\nUn jardí de flors encisadores es veia a través de la reixa.", "none.gif", ["W_txt"]);

MoreKernelFiles.addItem(L_txt);
MoreKernelFiles.addItem(M_txt);
MoreKernelFiles.addItem(Q_txt);
MoreKernelFiles.addItem(R_txt);
MoreKernelFiles.addItem(S_txt);
MoreKernelFiles.addItem(T_txt);
MoreKernelFiles.addItem(U_txt);
MoreKernelFiles.addItem(V_txt);
MoreKernelFiles.addItem(W_txt);

// COVA DELS TROLLS (CaveOfDisgruntledTrolls)
var CaveOfDisgruntledTrolls = new Room(
    "CovaDelsTrolls",
    "La cova és fosca i fa una forta olor de peus bruts... Sí, és clar, són els trolls! A la paret del fons hi ha una nena espantada dins d'una gàbia.",
    "loc_cave.gif",
    ["CaveOfDisgruntledTrolls", "covadelstrolls"]
);
var UglyTroll = new Item(
    "TrollLleig",
    "Té cara d'enfadat i és realment molt lleig. Bloqueja el camí cap al Tobogan.",
    "item_troll1.gif",
    ["UglyTroll", "trolllleig"]
);
UglyTroll.addValidCmd("rm");
UglyTroll.addCmdText("rm", "El troll es queda atònit un segon i s'esvaeix amb un so xipollejant desagradable!");
UglyTroll.addValidCmd("mv");
UglyTroll.addCmdText("mv", "El troll fa un bot de sorpresa i s'aparta cap a la paret. Deixa el pas lliure!");
UglyTroll.addValidCmd("cp");
UglyTroll.addCmdText("cp", "Els trolls s'estan multiplicant!");
CaveOfDisgruntledTrolls.addItem(UglyTroll);

var UglierTroll = new Item(
    "TrollMesLleig",
    "És encara més lleig que l'altre, però vol donar-te un consell abans de marxar:\n" +
    "«Pots llançar encanteris sobre coses d'altres sales usant rutes relatives com '../'. Per exemple, pots duplicar o moure cap a la sala anterior amb 'cp OBJECTE ../NOU_NOM'. Recorda-ho bé... i compte amb 'rm', que no es pot desfer!»",
    "item_troll2.gif",
    ["UglierTroll", "trollmeslleig"]
);
UglierTroll.addValidCmd("rm");
UglierTroll.addCmdText("rm", "El troll s'esvaeix enmig d'un calfred màgic!");
CaveOfDisgruntledTrolls.addItem(UglierTroll);

var HideousTroll = new Item(
    "TrollHorrible",
    "Un monstre immens i gegantí. Et mira amb suficiència.",
    "item_supertroll.gif",
    ["AbsolutelyHideousTroll", "trollhorrible"]
);
HideousTroll.addCmdText("rm", "El monstre eructa sorollosament i riu de tu. No te'n desfaràs pas sense el poder suprem de 'sudo'! Trobaràs la clau als FitxersKernel.");
HideousTroll.addCmdText("mv", "Pesa massa com per moure'l amb màgia ordinària.");
CaveOfDisgruntledTrolls.addItem(HideousTroll);

CaveOfDisgruntledTrolls.addCommand("rm");
CaveOfDisgruntledTrolls.addCommand("mv");
CaveOfDisgruntledTrolls.addCommand("cp");
CaveOfDisgruntledTrolls.ev.addListener("openSlide", function(){
    state.applyState("openSlide");
});

// GÀBIA (Cage)
var Cage = new Room("Gabia", "Una gàbia de ferro massís on hi ha una criatura retinguda.", "item_cage.gif", ["Cage", "gabia"]);
var KidnappedChild = new Item(
    "NenaSegrestada",
    "És la filla de la dama de la vila i de l'home de la clariana! Pots alliberar-la movent-la fora de la gàbia amb 'mv NenaSegrestada CovaDelsTrolls'!",
    "item_cagedboy.gif",
    ["KidnappedChild", "nenasegrestada", "nena"]
);
Cage.removeCommand("cd");
Cage.addCmdText("cd", "No pots passar entremig dels barrots de ferro estrets.");
KidnappedChild.addCmdText("mv", "La nena surt de la gàbia lliure i radiant d'alegria!\n«Moltíssimes gràcies per salvar-me!», crida amb una rialla, i surt corrents de la cova cap al sender per reunir-se amb els seus pares.");
Cage.addItem(KidnappedChild);

// -------------------------------------------------------------
// NIVELL ESPECIAL: L'ACADÈMIA SUPERIOR I EL CLÚSTER
// -------------------------------------------------------------

var AthenaCluster = new Room(
    "AthenaCluster",
    "Cap intrús no pot creuar sense la combinació secreta. Introdueix la clau:",
    "loc_cluster.gif",
    ["AthenaCluster", "athenacluster"]
);
var Workstation = new Item(
    "OrdinadorMagic",
    "Aquesta estació de treball et permet connectar amb nous calaixos màgics de la teva Casa. Si saps el nom del calaix que vols, només has de dir 'add LOCKERNAME'.",
    "item_workstation.gif",
    ["Workstation", "ordinadormagic"]
);
AthenaCluster.addItem(Workstation);
AthenaCluster.removeCommand("ls");
AthenaCluster.addCmdText("ls", "Primer has d'introduir la combinació secreta.");
AthenaCluster.removeCommand("cd");
AthenaCluster.addCmdText("cd", "Cap intrús no pot creuar sense la combinació secreta.");
AthenaCluster.ev.addListener("AthenaClusterExited", function(){
    AthenaCluster.removeCommand("cd");
});
AthenaCluster.addCommand("tellme");
AthenaCluster.addCommand("add");

var add_locker_func = function(){
    state.applyState("addMagicLocker");
};
AthenaCluster.ev.addListener("addMagicLocker", add_locker_func);

var MIT = new Room("MIT", "Has arribat dalt d'una catifa màgica a l'Institut Superior de Tecnologia Màgica!", "loc_MIT.gif", ["MIT", "mit"]);
var AdmissionLetter = new Item(
    "CartaAdmissio",
    "Enhorabona per la teva admissió a l'Institut Superior! Aquí aprendràs encanteris avançats de computació. Gaudeix de l'aprenentatge!",
    "item_manuscript.gif",
    ["AdmissionLetter", "cartaadmissio"]
);
MIT.addItem(AdmissionLetter);
MIT.ev.addListener("tryEnterAthenaCluster", function(){
    MIT.addCommand("terminus");
    MIT.addCmdText("terminus", "Has introduït la combinació correcta 'terminus'! S'obre la porta.");
    AthenaCluster.removeCommand("ls");
    AthenaCluster.addCmdText("ls", "Primer has d'introduir la combinació secreta.");
});
MIT.ev.addListener("AthenaComboEntered", function(){
    state.applyState("AthenaComboEntered");
});
MIT.addCommand("tellme");
MIT.addCommand("add");
MIT.ev.addListener("addMagicLocker", add_locker_func);

var StataCenter = new Room(
    "StataCenter",
    "El centre d'intel·ligència artificial i recerca de l'acadèmia. Aquí la màgia de la ciència es fa realitat.",
    "loc_stata.gif",
    ["StataCenter", "statacenter"]
);
var WaryEyeOfGradStudent = new Item(
    "InvestigadorSavi",
    "«Si ho desitges, pots afegir un nou ArmariMagic a la teva Casa. Allà podràs desar-hi notes, artefactes i nous encanteris!»",
    "item_grad.gif",
    ["WaryEyeOfGradStudent", "investigadorsavi"]
);
StataCenter.addItem(WaryEyeOfGradStudent);

var HelpfulTA = new Item(
    "AjudantDocent",
    "«Benvingut/da! Per descobrir la combinació de la sala secreta, només has de preguntar amb l'encanteri: tellme combo»",
    "item_TA.gif",
    ["HelpfulTA", "ajudantdocent"]
);
StataCenter.addItem(HelpfulTA);
StataCenter.addCommand("tellme");
StataCenter.addCommand("add");
StataCenter.ev.addListener("addMagicLocker", add_locker_func);

var MagicLocker = new Room(
    "ArmariMagic",
    "Un calaix màgic que et permet guardar encanteris i eines valuoses.",
    "item_locker.gif",
    ["MagicLocker", "armarimagic"]
);
var MoreComing = new Item(
    "Novetats",
    "Aquest armari màgic rep actualitzacions periòdiques del servidor de l'acadèmia. Torna-hi sovint!",
    "item_comingsoon.gif",
    ["MoreComing", "novetats"]
);
MagicLocker.addItem(MoreComing);

// -------------------------------------------------------------
// ENLLAÇOS ENTRE SALES (link_rooms)
// -------------------------------------------------------------

function link_rooms(parentRoom, childRoom){
    if (parentRoom.children.indexOf(childRoom) === -1){
        parentRoom.addChild(childRoom);
    }
    if (childRoom.parents.indexOf(parentRoom) === -1){
        childRoom.addParent(parentRoom);
    }
}

// Enllaços del Nivell 1
link_rooms(Home, WesternForest);
link_rooms(WesternForest, SpellCastingAcademy);
link_rooms(SpellCastingAcademy, PracticeRoom);
link_rooms(PracticeRoom, Box);
link_rooms(Home, NorthernMeadow);
link_rooms(NorthernMeadow, EasternMountains);
link_rooms(SpellCastingAcademy, Lessons);
link_rooms(EasternMountains, Cave);
link_rooms(Cave, DarkCorridor);
link_rooms(Cave, Staircase);
link_rooms(DarkCorridor, DankRoom);
link_rooms(DankRoom, SmallHole);
link_rooms(Tunnel, StoneChamber);
link_rooms(StoneChamber, Portal);

// Nivell 1 -> Nivell 2
link_rooms(Portal, TownSquare);

// Enllaços del Nivell 2
link_rooms(TownSquare, Marketplace);
link_rooms(TownSquare, Library);
link_rooms(TownSquare, RockyPath);
link_rooms(TownSquare, ArtisanShop);
link_rooms(TownSquare, BrokenBridge);
link_rooms(BrokenBridge, Clearing);
link_rooms(Clearing, OminousLookingPath);
link_rooms(CaveOfDisgruntledTrolls, Cage);
link_rooms(Slide, KernelFiles);
link_rooms(CaveOfDisgruntledTrolls, Slide);
link_rooms(KernelFiles, MoreKernelFiles);

// Enllaços de l'acadèmia superior (MIT)
link_rooms(Home, MIT);
link_rooms(MIT, StataCenter);
link_rooms(MIT, AthenaCluster);

// Àlies globals per compatibilitat amb codi existent
var Casa = Home;
var BoscOest = WesternForest;
var AcademiaMagia = SpellCastingAcademy;
var SalaPractiques = PracticeRoom;
var Caixa = Box;
var PratNord = NorthernMeadow;
var MuntanyesEst = EasternMountains;
var Classes = Lessons;
var Cova = Cave;
var PassadisFosc = DarkCorridor;
var Escala = Staircase;
var SalaHumida = DankRoom;
var ForatPetit = SmallHole;
var Tunel = Tunnel;
var CambraPedra = StoneChamber;
var PlacaPoble = TownSquare;
var Mercat = Marketplace;
var Biblioteca = Library;
var SalaSecreta = BackRoom;
var CamiRoccos = RockyPath;
var BotigaArtesana = ArtisanShop;
var Granja = Farm;
var Clariana = Clearing;
var PontTrencat = BrokenBridge;
var CamiTetric = OminousLookingPath;
var Tobogan = Slide;
var FitxersKernel = KernelFiles;
var MesFitxersKernel = MoreKernelFiles;
var Paradis = Paradise;
var CovaDelsTrolls = CaveOfDisgruntledTrolls;
var Gabia = Cage;
var ArmariMagic = MagicLocker;