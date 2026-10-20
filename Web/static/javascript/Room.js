String.prototype.replaceAll = function(replaceThis, withThis){
	var toreturn = this.toString();
	while (toreturn.indexOf(replaceThis) >= 0){
		toreturn = toreturn.replace(replaceThis, withThis);
	}
	return toreturn;
};

function Room(roomname, introtext, roompic, aliases){
	this.parents = [];
	this.children = [];
	this.items = [];
	this.aliases = Array.isArray(aliases) ? aliases : [];
	this.commands = ["cd", "ls", "less", "cat", "man", "help", "ajuda", "exit", "pwd"];
	this.room_name = (typeof roomname === 'undefined') ? "Sala Genèrica": roomname;
	this.room_pic = (typeof roompic === 'undefined') ? "./static/img/none.gif": "./static/img/" + roompic;
	this.intro_text = (typeof introtext === 'undefined') ? "Aquesta és una sala tranquil·la.": introtext;
	this.cmd_text = {"pwd": "Ets a " + this.room_name + "."};
	// for event handling
	this.ev = new EventTarget();
	EventTarget.call(this);
};

Room.prototype.addAlias = function(alias) {
	if (this.aliases.indexOf(alias) === -1) {
		this.aliases.push(alias);
	}
};

Room.prototype.matches = function(name) {
	if (!name) return false;
	var cleanName = name.trim();
	if (this.room_name.toLowerCase() === cleanName.toLowerCase()) return true;
	for (var i = 0; i < this.aliases.length; i++) {
		if (this.aliases[i].toLowerCase() === cleanName.toLowerCase()) return true;
	}
	return false;
};

Room.prototype.toString = function(){
	return this.room_name;
};

Room.prototype.changeIntroText = function(new_text){
	this.intro_text = new_text;
};

Room.prototype.addItem = function(newitem) {
	if (typeof newitem !== 'undefined'){
		this.items.push(newitem);
	}
};

Room.prototype.removeItem = function(itemnametoremove){
	var item = this.getItemFromName(itemnametoremove);
	if (item !== -1){
		var index = this.items.indexOf(item);
		if (index !== -1) {
			return this.items.splice(index, 1)[0];
		}
	}
	return null;
};

Room.prototype.itemStringArray = function(){
	var itemstrarray = [];
	for (var i = 0; i < this.items.length; i++){
		itemstrarray.push(this.items[i].toString());
	}
	return itemstrarray;
};

Room.prototype.childStringArray = function(){
	var childstrarray = [];
	for (var i = 0; i < this.children.length; i++){
		childstrarray.push(this.children[i].toString());
	}
	return childstrarray;
};

Room.prototype.getItemFromName = function(itemname){
	if (!itemname) return -1;
	for (var i = 0; i < this.items.length; i++) {
		if (typeof this.items[i].matches === 'function') {
			if (this.items[i].matches(itemname)) {
				return this.items[i];
			}
		} else if (this.items[i].toString().toLowerCase() === itemname.trim().toLowerCase()) {
			return this.items[i];
		}
	}
	return -1;
};

Room.prototype.getChildFromName = function(childname){
	if (!childname) return -1;
	for (var i = 0; i < this.children.length; i++) {
		if (typeof this.children[i].matches === 'function') {
			if (this.children[i].matches(childname)) {
				return this.children[i];
			}
		} else if (this.children[i].toString().toLowerCase() === childname.trim().toLowerCase()) {
			return this.children[i];
		}
	}
	return -1;
};

Room.prototype.addChild = function(newchild){
	if (typeof newchild !== 'undefined' && this.children.indexOf(newchild) === -1){
		this.children.push(newchild);
	}
};

Room.prototype.removeChild = function(child){
	var index = this.children.indexOf(child);
	if (index !== -1){
		this.children.splice(index, 1);
	}
};

Room.prototype.childrenStringArray = function(){
	return this.childStringArray();
};

Room.prototype.addParent = function(parent){
	this.parents[0] = parent;
};

Room.prototype.addCommand = function(cmd){
	if (this.commands.indexOf(cmd) === -1) {
		this.commands.push(cmd);
	}
	if (cmd === "less" && this.commands.indexOf("cat") === -1) {
		this.commands.push("cat");
	}
	if (cmd === "help" && this.commands.indexOf("ajuda") === -1) {
		this.commands.push("ajuda");
	}
};

Room.prototype.removeCommand = function(cmd){
	var index = this.commands.indexOf(cmd);
	if (index !== -1){
		this.commands.splice(index, 1);
	}
	if (cmd === "less") {
		var catIndex = this.commands.indexOf("cat");
		if (catIndex !== -1) this.commands.splice(catIndex, 1);
	}
	if (cmd === "help") {
		var ajudaIndex = this.commands.indexOf("ajuda");
		if (ajudaIndex !== -1) this.commands.splice(ajudaIndex, 1);
	}
};

Room.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
	if (cmd === "less") {
		this.cmd_text["cat"] = text;
	} else if (cmd === "cat") {
		this.cmd_text["less"] = text;
	} else if (cmd === "help") {
		this.cmd_text["ajuda"] = text;
	} else if (cmd === "ajuda") {
		this.cmd_text["help"] = text;
	}
};

Room.prototype.removeCmdText = function(cmd){
	delete this.cmd_text[cmd];
	if (cmd === "less") delete this.cmd_text["cat"];
	if (cmd === "help") delete this.cmd_text["ajuda"];
};

Room.prototype.ls = function(args){
	if (args && args.length > 0){
		var targetChild = this.getChildFromName(args[0]);
		if (targetChild !== -1){
			return targetChild.printLS();
		} else {
			return "Aquest no és un indret o sala vàlida per mirar.";
		}
	} else {
		$("#scene").attr("src", this.room_pic); // Mostra la imatge de la sala
		return this.printLS();
	}
};

Room.prototype.printLS = function(){
	var other_rooms = this.children.join("\n");
	var output = "";
	if (this.children.length > 0) {
		output += " [Camins / Estances]:\n" + other_rooms;
	} else {
		output += " [Camins / Estances]: (cap sortida visible)";
	}
	if (this.items.length > 0){
		output += "\n\n [Objectes i Personatges]:\n" + this.items.join("\n");
	}
	return output;
};

var enterRoom = function(new_room){
	$("#scene").attr("src", "./static/img/none.gif");
	current_room = new_room;
	if (typeof state !== 'undefined' && state.setCurrentRoom) {
		state.setCurrentRoom(current_room);
	}
};

Room.prototype.cd = function(args){
	if (!args || args.length === 0){
		enterRoom(Home);
		return "Has tornat al caliu de la teva Casa!";
	} else if (args.length > 1){
		return "Només et pots desplaçar a una destinació alhora. Sintaxi: cd DESTINACIÓ";
	} else if (args[0] === "..") {
		if (this.parents.length >= 1){
			if (this.matches("AthenaCluster")){
				this.ev.fire("AthenaClusterExited");
			}
			enterRoom(this.parents[0]);
			return "Has anat a " + current_room.toString() + ". " + current_room.intro_text;
		} else {
			return "Ja ets a la sala inicial.";
		}
	} else if (args[0] === "~"){
		enterRoom(Home);
		return "Has tornat al caliu de la teva Casa!";
	} else if (args[0] === ".") {
		enterRoom(current_room);
		$("#scene").attr("src", "./static/img/none.gif");
		return "Continues a " + current_room.toString() + ". " + current_room.intro_text;
	} else {
		var roomname = args[0];
		var targetChild = this.getChildFromName(roomname);
		if (targetChild !== -1){
			if (targetChild.commands.indexOf("cd") > -1){
				enterRoom(targetChild);
				return "Has anat a " + current_room.toString() + ". " + current_room.intro_text;
			} else {
				if (targetChild.matches("AthenaCluster")){
					this.ev.fire("tryEnterAthenaCluster");
				} 
				return targetChild.cmd_text["cd"] || "No pots entrar en aquesta sala ara mateix.";
			}
		}
		return "No hi ha cap camí ni sala anomenada '" + args[0] + "'. Prova d'escriure 'ls' per veure quins camins tens a la vora.";
	}
};

Room.prototype.can_cd = function(arg){
	if (arg === undefined || arg.indexOf("/") > -1){
		return false;
	} else if (arg === "..") {
		return this.parents[0] || false;
	} else if (arg === ".") {
		return this;
	} else {
		var target = this.getChildFromName(arg);
		return target !== -1 ? target : false;
	}
};

Room.prototype.less = function(args){
	if (!args || args.length < 1){
		return "Indica quin objecte vols examinar o amb qui vols parlar (ex: cat OBJECTE o less OBJECTE).";
	} else {
		var targetItem = this.getItemFromName(args[0]);
		if (targetItem !== -1){
			$("#scene").attr("src", targetItem.picturename);
			if ((this.matches("Library") || this.matches("Biblioteca")) && (targetItem.matches("InconspicuousLever") || targetItem.matches("PalancaDiscreta"))){
				this.ev.fire("pullLever");
			}
			return targetItem.cmd_text["less"] || targetItem.cmd_text["cat"] || "No hi ha res d'especial a destacar.";
		}
		return "Aquí no hi ha cap '" + args[0] + "'. Fes 'ls' per veure quins objectes tens al davant.";
	}
};

Room.prototype.cat = function(args){
	return this.less(args);
};

Room.prototype.man = function(args){
	if (!args || args.length < 1){
		return "Has de demanar consell al Vell Savi sobre un encanteri concret (ex: man cd, man ls, man cat).";
	} else {
		var cmd = args[0].toLowerCase();
		if (cmd in man_pages){
			return man_pages[cmd];
		}
		return "El Vell Savi no coneix cap encanteri anomenat '" + args[0] + "'. Escriu 'ajuda' per veure els encanteris bàsics.";
	}
};

Room.prototype.help = function(args){
	return "Escriu 'man ENCANTERI' per consultar la saviesa del Vell Savi (ex: man cd, man ls, man cat, man mv, man rm).";
};

Room.prototype.ajuda = function(args){
	return this.help(args);
};

Room.prototype.exit = function(args){
	window.open('', '_self', ''); 
	window.close(); 
};

Room.prototype.pwd = function(args){
	$("#scene").attr("src", this.room_pic);
	return "Ets a: " + this.room_name;
};

Room.prototype.mv = function(args){
	if (!args || args.length !== 2){
		return "Has de moure l'element A al lloc B. Sintaxi: mv [OBJECTE] [DESTINACIÓ].";
	} else {
		var itemToMove = this.getItemFromName(args[0]);
		var destRoom = this.getChildFromName(args[1]);
		if (itemToMove !== -1 && destRoom !== -1){
			destRoom.addItem(itemToMove);
			if ((itemToMove.matches("UglyTroll") || itemToMove.matches("TrollLleig")) && 
				(this.matches("CaveOfDisgruntledTrolls") || this.matches("CovaDelsTrolls"))){
				this.ev.fire("openSlide");
			}
			if ((itemToMove.matches("Boulder") || itemToMove.matches("RocaGran")) && 
				(this.matches("DankRoom") || this.matches("SalaHumida"))){
				this.ev.fire("mvBoulder");
			}
			this.removeItem(itemToMove.itemname);
			return "Has mogut " + itemToMove.itemname + " cap a " + destRoom.room_name + ".";
		} else {
			return "L'objecte i la destinació han de ser vàlids. Prova de fer 'ls' per comprovar el nom exacte.";
		}
	}
};

Room.prototype.rm = function(args){
	if (!args || args.length < 1){
		return "Has d'indicar quin obstacle o objecte vols eliminar (ex: rm OBJECTE).";
	} else {
		var stringtoreturn = "";
		for (var i = 0; i < args.length; i++){
			var item = this.getItemFromName(args[i]);
			if (item !== -1){
				if (item.valid_cmds.indexOf("rm") > -1){
					var removedItem = this.removeItem(item.itemname);
					if ((removedItem.matches("ThornyBrambles") || removedItem.matches("EsbarzersEspinosos")) && 
						(this.matches("OminousLookingPath") || this.matches("CamiTetric"))){
						this.ev.fire("rmBrambles");
					}
					if ((removedItem.matches("UglyTroll") || removedItem.matches("TrollLleig")) && 
						(this.matches("CaveOfDisgruntledTrolls") || this.matches("CovaDelsTrolls"))){
						this.ev.fire("openSlide");
					}
					if ((removedItem.matches("LargeBoulder") || removedItem.matches("RocaGegant")) && 
						(this.matches("RockyPath") || this.matches("CamiRoccos"))){
						this.ev.fire("rmLargeBoulder");
					}
					if ("rm" in removedItem.cmd_text){
						stringtoreturn += removedItem.cmd_text["rm"] + "\n";
					} else {
						stringtoreturn += "Acabes d'eliminar " + removedItem.itemname + ".\n";
					}
				} else {
					stringtoreturn += "Aquest objecte no es pot eliminar.\n";
				}
			} else {
				return "Aquest no és un objecte vàlid per eliminar.";
			}
		}
		return stringtoreturn;
	}
};

Room.prototype.grep = function(args){
	if (this.commands.indexOf("grep") > -1){
		if (!args || args.length < 2) {
			return "Sintaxi: grep [PARAULA] [OBJECTE_O_LLIBRE].";
		}
		var word_to_find = args[0];
		var item = this.getItemFromName(args[1]);
		if (item !== -1){
			var text_content = item.cmd_text["less"] || item.cmd_text["cat"] || "";
			var line_array = text_content.split("\n");
			var return_arr = jQuery.grep(line_array, function(line){ 
				return line.toLowerCase().indexOf(word_to_find.toLowerCase()) > -1;
			});
			if (return_arr.length > 0) {
				return return_arr.join("\n");
			} else {
				return "No s'ha trobat cap línia amb la paraula '" + word_to_find + "'.";
			}
		} else {
			return "Aquest no és un objecte o manuscrit vàlid on buscar.";
		}
	}
	return "Encara no has après aquest encanteri.";
};

Room.prototype.touch = function(args){
	if (!args || args.length < 1){
		return "Has d'indicar què vols crear (ex: touch Taulo o touch Engranatge).";
	} else {
		var createdItemsString = "";
		for (var i = args.length - 1; i >= 0; i--) {
			if (args[i].length > 0){
				var newItem = new Item(args[i], "Aquest és un objecte " + args[i]);
				this.addItem(newItem);
				createdItemsString += args[i] + " ";
				if ((args[i] === "Plank" || args[i] === "Taulo") && 
					(this.matches("BrokenBridge") || this.matches("PontTrencat"))){
					this.ev.fire("touchPlank");
				} else if ((args[i] === "Gear" || args[i] === "Engranatge") && 
					(this.matches("ArtisanShop") || this.matches("BotigaArtesana"))){
					this.ev.fire("touchGear");
				}
			}
		}
		if (createdItemsString === ""){
			return "No has materialitzat res. Comprova la sintaxi.";
		}
		return "Gràcies a l'encanteri de creació has materialitzat: " + createdItemsString.trim();
	}
};

Room.prototype.cp = function(args){
	if (!args || args.length !== 2){
		return "Sintaxi incorrecta. Demana consell al Vell Savi (man cp). Sintaxi: cp [OBJECTE] [NOU_NOM]";
	} else {
		var item_to_copy_name = args[0];
		var new_item_name = args[1];
		var item_to_copy = this.getItemFromName(item_to_copy_name);
		if (item_to_copy !== -1){
			var newItem = new Item(new_item_name);
			newItem.picturename = item_to_copy.picturename;
			newItem.cmd_text = jQuery.extend({}, item_to_copy.cmd_text);
			newItem.valid_cmds = item_to_copy.valid_cmds.slice();
			this.addItem(newItem);
			if (this.matches("ArtisanShop") || this.matches("BotigaArtesana")){
				var g1 = this.getItemFromName("gear1") !== -1 || this.getItemFromName("engranatge1") !== -1;
				var g2 = this.getItemFromName("gear2") !== -1 || this.getItemFromName("engranatge2") !== -1;
				var g3 = this.getItemFromName("gear3") !== -1 || this.getItemFromName("engranatge3") !== -1;
				var g4 = this.getItemFromName("gear4") !== -1 || this.getItemFromName("engranatge4") !== -1;
				var g5 = this.getItemFromName("gear5") !== -1 || this.getItemFromName("engranatge5") !== -1;
				if (g1 && g2 && g3 && g4 && g5){
					this.ev.fire("FiveGearsCopied");
				}
			} else if (this.matches("Farm") || this.matches("Granja")){
				if (item_to_copy.matches("EarOfCorn") || item_to_copy.matches("PanochaDeBlatDeMoro")){
					this.ev.fire("CornCopied");
				}
			}
			return "Has duplicat correctament " + item_to_copy_name + " creant " + new_item_name + ".";
		}
		return "No hi ha cap objecte amb aquest nom per copiar.";
	}
};

Room.prototype.terminus = function(args){
	var text_to_return = this.cmd_text["terminus"];
	this.ev.fire("AthenaComboEntered");
	return text_to_return;
};

Room.prototype.tellme = function(args){
	if (args && (args[0] === "combo" || args[0] === "clau" || args[0] === "contrasenya")){
		return "La combinació secreta és 'terminus' (sense les cometes).";
	}
	return "Sintaxi incorrecta. Demana ajuda al Vell Savi (man tellme).";
};

Room.prototype.mkdir = function(args){
	if (this.commands.indexOf("mkdir") > -1){
		if (args && args.length === 1){
			var room_name_to_make = args[0];
			var new_room = new Room(room_name_to_make, "Aquesta és la nova estança " + room_name_to_make + ".");
			link_rooms(this, new_room);
			if ((this.matches("Clearing") || this.matches("Clariana")) && 
				(room_name_to_make === "House" || room_name_to_make === "Casa")){
				this.ev.fire("HouseMade");
			}
			return "Has creat una nova sala arquitectònica: " + args[0] + ".";
		}
		return "Sintaxi incorrecta. Demana consell al Vell Savi (man mkdir).";
	}
	return "Encara no has après aquest encanteri.";
};

Room.prototype.sudo = function(args){
	if (this.commands.indexOf("sudo") > -1){
		if (args && (args[0] === "less" || args[0] === "cat") && 
			(args[1] === "Certificate" || args[1] === "Certificat")){
			this.ev.fire("tryEnterSudo");
			return;
		} else {
			return "Sintaxi incorrecta. Recorda consultar les instruccions del grimori.";
		}
	} 
	return "No pots invocar aquest encanteri suprem aquí.";
};

Room.prototype.IHTFP = function(args){
	if (this.commands.indexOf("IHTFP") > -1 || this.commands.indexOf("PARADIS") > -1){
		var text_to_return = this.cmd_text["IHTFP"] || this.cmd_text["PARADIS"] || "Contrasenya correcta!";
		this.ev.fire("sudoComplete");
		return text_to_return;
	}
	return "Contrasenya incorrecta.";
};

Room.prototype.PARADIS = function(args){
	return this.IHTFP(args);
};

Room.prototype.add = function(args){
	if (this.commands.indexOf("add") > -1){
		if (args && (args[0] === "MagicLocker" || args[0] === "ArmariMagic")){
			this.ev.fire("addMagicLocker");
			if (typeof this.cmd_text["add"] === 'undefined'){
				return "Acabes d'afegir el " + args[0] + " a la teva col·lecció.";
			}
			return this.cmd_text["add"];
		} else {
			return "No hi ha cap armari o calaix màgic amb aquest nom.";
		}
	}
	return "Aquest encanteri no és vàlid aquí.";
};