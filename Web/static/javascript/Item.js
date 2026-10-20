function Item(name, text, picname, aliases){
	this.itemname = name;
	this.aliases = Array.isArray(aliases) ? aliases : [];
	this.picturename = (typeof picname === 'undefined') ? "./static/img/none.gif": "./static/img/" + picname;
	var defaultText = (typeof text === 'undefined') ? "Aquest és un objecte genèric." : text;
	this.cmd_text = {
		"less": defaultText,
		"cat": defaultText
	};
	this.valid_cmds = ["less", "cat"];
};

Item.prototype.addAlias = function(alias) {
	if (this.aliases.indexOf(alias) === -1) {
		this.aliases.push(alias);
	}
};

Item.prototype.matches = function(name) {
	if (!name) return false;
	var cleanName = name.trim();
	if (this.itemname.toLowerCase() === cleanName.toLowerCase()) return true;
	for (var i = 0; i < this.aliases.length; i++) {
		if (this.aliases[i].toLowerCase() === cleanName.toLowerCase()) return true;
	}
	return false;
};

Item.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
	if (cmd === "less") {
		this.cmd_text["cat"] = text;
	} else if (cmd === "cat") {
		this.cmd_text["less"] = text;
	}
};

Item.prototype.addValidCmd = function(cmd){
	if (this.valid_cmds.indexOf(cmd) === -1) {
		this.valid_cmds[this.valid_cmds.length] = cmd;
	}
	if (cmd === "less" && this.valid_cmds.indexOf("cat") === -1) {
		this.valid_cmds.push("cat");
	}
};

Item.prototype.toString = function(){
	return this.itemname;
};

Item.prototype.changePicName = function(newpicname){
	this.picturename = "./static/img/" + newpicname;
};