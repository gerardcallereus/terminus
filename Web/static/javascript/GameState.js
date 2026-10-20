/*
 * Paràmetres d'estat del joc:
 * mvBoulder -- 1: SalaHumida/DankRoom i Tunel/Tunnel estan connectats. RocaGran a ForatPetit/SmallHole.
 * pullLever -- Biblioteca/Library i SalaSecreta/BackRoom connectats.
 * AthenaComboEntered -- Dins del cluster Athena/AcademiaSuperior.
 * rmLargeBoulder -- CamiRoccos/RockyPath i Granja/Farm connectats. Roca eliminada.
 * HouseMade -- Clariana/Clearing i Casa/House connectats (s'ha fet la casa).
 * rmBrambles -- Clariana/Clearing i CamiTetric/OminousLookingPath connectats. Esbarzers eliminats.
 * openSlide -- CovaDelsTrolls i Tobogan/Slide connectats. Troll mogut o eliminat.
 * touchGear -- Engranatge creat a la BotigaArtesana, text canviat.
 * FiveGearsCopied -- 5 engranatges copiats, text de l'artesana actualitzat.
 * CornCopied -- Blat de moro copiat a la Granja.
 * touchPlank -- Tauló creat al PontTrencat.
 * sudoComplete -- Arribada al Paradís (localització final).
 */

function GameState(){
	// El joc comença a Casa
	this.currentRoom = typeof Home !== 'undefined' ? Home : null;
	this.params = {};
};

// Llegeix les galetes si n'hi ha cap de guardada
GameState.prototype.getCurrentRoom = function() {
	var newRoomToSet = this.currentRoom || Home;

	var cookieval = this.readCookie();
	if (cookieval){
		var cookieargs = cookieval.split("=");
		var room_name_to_set = cookieargs.splice(0, 1)[0];
		var cookie_params = cookieargs;
		for (var i = 0; i < cookie_params.length; i++){
			if (cookie_params[i]){
				var param_pair = cookie_params[i].split(":");
				this.params[param_pair[0]] = param_pair[1];
				this.applyState(param_pair[0], true);
			}
		}
		if (window[room_name_to_set]){
			newRoomToSet = window[room_name_to_set];
		}
	}

	this.setCurrentRoom(newRoomToSet);
	return this.currentRoom;
};

GameState.prototype.setCurrentRoom = function(newRoom){
	this.currentRoom = newRoom;
	var date = new Date();
	date.setTime(date.getTime() + (7*24*60*60*1000));
	document.cookie = "terminuscookie=" + this.getState() + "; expires=" + date.toGMTString() + "; path=/";
};

GameState.prototype.getState = function(){
	var param_string = "";
	for (var key in this.params){
		if (this.params.hasOwnProperty(key)){
			param_string += key + ":" + this.params[key] + "=";
		}
	}
	var roomName = this.currentRoom ? (this.currentRoom.room_name || this.currentRoom.toString()) : "Home";
	return roomName + "=" + param_string;
};

GameState.prototype.update = function(name_prop, val){
	this.params[name_prop] = val;
};

GameState.prototype.readCookie = function(){
	var nameCookie = "terminuscookie";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameCookie) == 0) 
			return c.substring(nameCookie.length + 1, c.length);
	}
	return null;
};

GameState.prototype.applyState = function(param_name, replay){
	var re = (typeof replay === 'undefined') ? false : replay;
	state.update(param_name, "1");
	switch(param_name){
		case "mvBoulder": 
			link_rooms(DankRoom, Tunnel);
			SmallHole.addItem(Boulder);
			if (re) DankRoom.removeItem("RocaGran") || DankRoom.removeItem("Boulder");
			break;

		case "pullLever":
			link_rooms(Library, BackRoom);
			break;

		case "rmLargeBoulder":
			link_rooms(RockyPath, Farm);
			if (re) RockyPath.removeItem("RocaGegant") || RockyPath.removeItem("LargeBoulder");
			break;

		case "touchGear":
			Artisan.addCmdText("less", "Bé, és bonic, moltes gràcies, però no pretenguis que construeixi res amb un sol engranatge! No pots pas duplicar-lo amb l'encanteri de clonació?\n...\n*sospir* Veig que necessitaràs una mica d'entrenament. Només has de dir «cp [OBJECTE] [NOU_NOM]». [OBJECTE] és el nom del que vols copiar, i [NOU_NOM] és el nou nom que li dones, ho captes? I puf! Tindràs un objecte nou de trinca. En necessito cinc més, així que afanya't! Anomena'ls engranatge1, engranatge2, engranatge3, engranatge4 i engranatge5, si us plau.");
			ArtisanShop.addCommand("cp");
			if (re) {
				ArtisanShop.addItem(new Item("Engranatge", "Aquest és un Engranatge brillant acabat de fer.", "item_gear.gif", ["Gear"]));
			} else {
				var it = ArtisanShop.getItemFromName("Engranatge") !== -1 ? ArtisanShop.getItemFromName("Engranatge") : ArtisanShop.getItemFromName("Gear");
				if (it !== -1) it.changePicName("item_gear.gif");
			}
			break;

		case "FiveGearsCopied":
			Artisan.addCmdText("less", "Caram, ja has acabat? Es veu que aprens a la velocitat del llamp. Moltes gràcies per la teva ajuda, jove aprenent!");
			if (re){
				ArtisanShop.addItem(new Item("engranatge1", "Un dels cinc engranatges.", "item_gear.gif", ["gear1"]));
				ArtisanShop.addItem(new Item("engranatge2", "Un dels cinc engranatges.", "item_gear.gif", ["gear2"]));
				ArtisanShop.addItem(new Item("engranatge3", "Un dels cinc engranatges.", "item_gear.gif", ["gear3"]));
				ArtisanShop.addItem(new Item("engranatge4", "Un dels cinc engranatges.", "item_gear.gif", ["gear4"]));
				ArtisanShop.addItem(new Item("engranatge5", "Un dels cinc engranatges.", "item_gear.gif", ["gear5"]));
			}
			break;

		case "CornCopied":
			Farmer.addCmdText("less", "És un autèntic miracle! Moltes gràcies, jove aprenent. Que l'Administrador del Món et beneeixi!");
			if (re) Farm.addItem(new Item("AltraPanocha", "Aquesta és una altra panocha de blat de moro duplicada.", "item_corn.gif", ["AnotherEarOfCorn"]));
			break;

		case "HouseMade":
			if (re) Clearing.addChild(new Room("Casa", "Aquesta és la Casa que has construït.", "loc_farm.gif", ["House"]));
			var house = Clearing.getChildFromName("Casa") !== -1 ? Clearing.getChildFromName("Casa") : Clearing.getChildFromName("House");
			if (house !== -1) {
				house.addCmdText("cd", "Entres a la petita i càlida Casa que has construït.");
				house.addCmdText("ls", "Has construït aquesta casa per a l'home afligit. Que generós/a!");
			}
			Clearing.removeCmdText("cd");
			Clearing.changeIntroText("Hi ha una petita clariana d'herba, amb un home assegut sobre una pedra que somriu agraït. Darrere seu hi ha la bonica casa blanca que li has construït.");
			CryingMan.addCmdText("less", "Moltes gràcies per construir-me la Casa! Per què continuo plorant? Són llàgrimes de felicitat! No pot pas un home expressar lliurement les seves emocions?");
			break;

		case "touchPlank":
			Clearing.addCommand("cd");
			Clearing.removeCmdText("cd");
			BrokenBridge.removeCmdText("cd");
			BrokenBridge.changeIntroText("Un pont de fusta i cordes que creua el precipici. Ara que has col·locat el tauló que faltava, es pot passar amb total seguretat.");
			if (re) {
				BrokenBridge.addItem(new Item("Taulo", "Aquest és un Taulo de fusta sòlid.", "item_plank.gif", ["Plank"]));
			} else {
				var pl = BrokenBridge.getItemFromName("Taulo") !== -1 ? BrokenBridge.getItemFromName("Taulo") : BrokenBridge.getItemFromName("Plank");
				if (pl !== -1) pl.changePicName("item_plank.gif");
			}
			break;

		case "rmBrambles":
			link_rooms(OminousLookingPath, CaveOfDisgruntledTrolls);
			if (re) OminousLookingPath.removeItem("EsbarzersEspinosos") || OminousLookingPath.removeItem("ThornyBrambles");
			break;

		case "sudoComplete":
			KernelFiles.removeCommand("IHTFP");
			KernelFiles.removeCmdText("IHTFP");
			KernelFiles.removeCommand("PARADIS");
			link_rooms(KernelFiles, Paradise);
			enterRoom(Paradise);
			break;

		case "openSlide":
			Slide.addCommand("cd");
			Slide.addCmdText("cd", "El tobogan és molt llarg. Deixa't lliscar... Ja ets a punt d'arribar als fitxers del nucli (KernelFiles)!");
			if (re) CaveOfDisgruntledTrolls.removeItem("TrollLleig") || CaveOfDisgruntledTrolls.removeItem("UglyTroll");
			break;

		case "AthenaComboEntered":
			AthenaCluster.addCommand("ls");
			AthenaCluster.removeCmdText("ls");
			AthenaCluster.addCommand("cd");
			enterRoom(AthenaCluster);
			MIT.removeCommand("terminus");
			MIT.removeCmdText("terminus");
			break;

		case "addMagicLocker": 
			link_rooms(Home, MagicLocker);
			break;

		default: 
			break;
	};
};