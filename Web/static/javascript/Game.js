var state = new GameState();
var current_room = state.getCurrentRoom();

var man_pages = {
    "cd": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
          "(Canviar de Destinació)\n" +
          "Utilitza \"cd\" per desplaçar-te per les estances i camins del món.\n" +
          "Sintaxi: cd DESTINACIÓ\n" +
          "Pots escriure \"cd ..\" per tornar enrere a la sala anterior,\n" +
          "o \"cd ~\" per tornar directament a la teva Casa.\n" +
          "Recorda-hoooo...",

    "ls": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
          "(Llistar l'Entorn)\n" +
          "Utilitza \"ls\" per observar tot allò que t'envolta.\n" +
          "Podràs veure les sortides/camins i els objectes o personatges presents.\n" +
          "Sintaxi:\n" +
          "  ls             (per examinar la sala actual)\n" +
          "  ls DESTINACIÓ  (per guaitar dins d'un camí adjacent sense moure-t'hi)\n" +
          "Recorda-hoooo...",

    "cat": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
           "(Inspeccionar o Llegir)\n" +
           "Utilitza \"cat\" (o \"less\") per llegir manuscrits, parlar amb personatges o examinar objectes.\n" +
           "Sintaxi: cat OBJECTE\n" +
           "Recorda-hoooo...",

    "less": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
            "(Inspeccionar o Llegir)\n" +
            "Utilitza \"less\" (o \"cat\") per llegir manuscrits, parlar amb personatges o examinar objectes.\n" +
            "Sintaxi: less OBJECTE\n" +
            "Recorda-hoooo...",

    "pwd": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
           "(On soc ara?)\n" +
           "Utilitza \"pwd\" per orientar-te i saber el nom exacte de la sala on et trobes.\n" +
           "Sintaxi: pwd\n" +
           "Recorda-hoooo...",

    "mv": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
          "(Moure / Telequinesi)\n" +
          "Utilitza \"mv\" per desplaçar un objecte d'una sala a una altra ubicació.\n" +
          "Sintaxi: mv OBJECTE DESTINACIÓ\n" +
          "Exemple: mv NinotPractiques1 Caixa\n" +
          "Recorda-hoooo...",

    "rm": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
          "(Eliminar / Desintegrar)\n" +
          "Utilitza \"rm\" per fer desaparèixer obstacles o elements del món per sempre.\n" +
          "Sintaxi: rm OBJECTE\n" +
          "Ves amb compte, perquè l'eliminació és permanent!\n" +
          "Recorda-hoooo...",

    "touch": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
             "(Crear / Materialitzar)\n" +
             "Utilitza \"touch\" per materialitzar un nou objecte del no-res amb el poder de la creació.\n" +
             "Sintaxi: touch NOU_OBJECTE\n" +
             "Recorda-hoooo...",

    "cp": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
          "(Clonar / Duplicar)\n" +
          "Utilitza \"cp\" per crear una còpia idèntica d'un objecte existent.\n" +
          "Sintaxi: cp OBJECTE_ORIGINAL NOU_NOM\n" +
          "Recorda-hoooo...",

    "mkdir": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
             "(Crear Nova Sala / Arquitectura)\n" +
             "Utilitza \"mkdir\" per construir una nova estança o refugi connectat a la teva posició.\n" +
             "Sintaxi: mkdir NOM_NOVA_SALA\n" +
             "Recorda-hoooo...",

    "grep": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
            "(Rastreig de Text)\n" +
            "Utilitza \"grep\" per demanar al teu petit ajudant que cerqui paraules o frases clau dins d'un text.\n" +
            "Sintaxi: grep PARAULA_A_BUSCAR LLIBRE\n" +
            "Recorda-hoooo...",

    "sudo": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
            "(Privilegis Suprems de l'Administrador)\n" +
            "L'encanteri suprem que permet actuar sobre qualsevol element protegit si en coneixes la contrasenya màgica.\n" +
            "Sintaxi: sudo ENCANTERI ARGUMENTS\n" +
            "Recorda-hoooo...",

    "man": "Soc el Vell Savi! No em pots investigar a mi, jove aprenent. Pots demanar-me consell sobre:\n" +
           "cd, ls, pwd, cat, less, mv, rm, touch, cp, mkdir, grep, sudo, tellme, ajuda.",

    "help": "Escriu \"man ENCANTERI\" (per exemple: man cd, man ls, man cat) per consultar com s'utilitza qualsevol encanteri.",
    "ajuda": "Escriu \"man ENCANTERI\" (per exemple: man cd, man ls, man cat) per consultar com s'utilitza qualsevol encanteri.",

    "exit": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
            "Utilitza \"exit\" si desitges abandonar temporalment el món de Terminus.\n" +
            "Recorda-hoooo...",

    "tellme": "La veu del Vell Savi ressona en el teu cap com des d'una gran distància:\n" +
              "Demana la clau secreta escrivint: tellme combo\n" +
              "Recorda-hoooo..."
};

$(document).ready(function() {
    $('#term').terminal(function(input, term) {
        var cleanInput = input.trim();
        if (!cleanInput) return;

        var split = cleanInput.split(" ");
        var command = split[0].toString().toLowerCase();
        var args = split.splice(1, split.length);
        var exec = true;

        // Comprovació d'àlies per a comandaments freqüents
        if (command === "cat" && current_room.commands.indexOf("less") > -1 && current_room.commands.indexOf("cat") === -1) {
            current_room.commands.push("cat");
        }
        if (command === "ajuda" && current_room.commands.indexOf("help") > -1 && current_room.commands.indexOf("ajuda") === -1) {
            current_room.commands.push("ajuda");
        }

        if (current_room.commands.indexOf(command) > -1 || typeof current_room[command] === 'function') {
            var prev_room_to_test = current_room;
            if (args.length > 0 && args[0].indexOf("/") > 0) {
                var rooms_in_order = args[0].split("/");
                var cur_room_to_test = current_room;
                for (var i = 0; i < rooms_in_order.length; i++) {
                    prev_room_to_test = cur_room_to_test;
                    var room_to_cd = rooms_in_order[i];
                    if (i > 0 && rooms_in_order[i-1] === "~") {
                        cur_room_to_test = Home.can_cd(room_to_cd);
                    } else if (room_to_cd === "~") {
                        cur_room_to_test = Home;
                    } else {
                        cur_room_to_test = cur_room_to_test.can_cd(room_to_cd);
                    }
                    if ((command === "cd" || command === "ls") && cur_room_to_test === false) {
                        term.echo("No es pot arribar a aquesta destinació des d'aquí.");
                        exec = false;
                        break;
                    }
                }
                if (cur_room_to_test) {
                    args[0] = cur_room_to_test.room_name;
                }
            }
            if (exec) {
                var text_to_display = prev_room_to_test[command](args);
                if (text_to_display) {
                    term.echo(text_to_display);
                }
                if (current_room.cmd_text && (command in current_room.cmd_text)) {
                    term.echo(current_room.cmd_text[command]);
                }
            }
        } else {
            term.echo("L'encanteri '" + command + "' no és vàlid o encara no l'has après a la sala '" + current_room.room_name + "'.\nEscriu 'ajuda' per veure consells del grimori.");
        }
    }, {
        history: true,
        prompt: 'magic> ',
        name: 'terminus_terminal',
        greetings: "========================================================\n" +
                   "      TERMINUS: L'AVENTURA MÀGICA DE LA TERMINAL        \n" +
                   "========================================================\n\n" +
                   "Hola, jove aprenent de màgia! Benvingut/da a la teva aventura.\n" +
                   "En aquest món, les paraules de la terminal són encanteris reals:\n\n" +
                   "  * Mira al teu voltant amb:           ls\n" +
                   "  * Mou-te a una sala o camí amb:      cd DESTINACIÓ\n" +
                   "  * Torna enrere a la sala anterior:   cd ..\n" +
                   "  * Examina o parla amb personatges:   cat OBJECTE   (o less OBJECTE)\n" +
                   "  * Comprova a quina sala et trobes:   pwd\n" +
                   "  * Demana consell al Vell Savi:       man ENCANTERI  (o ajuda)\n\n" +
                   "Pista: Pots prémer la tecla [TAB] per autocompletar noms ràpidament!\n" +
                   "Comença la teva aventura escrivint l'encanteri 'ls' per veure què tens a prop.\n",
        exit: false,
        clear: true
    });

    // Neteja l'historial a l'inici
    $("#term").terminal().history().clear();
    $("#term").click();

    // Autocompleció amb la tecla Tab
    $(window).keyup(function(event) {
        if (event.keyCode == 9) { // Tab key
            var termObj = $("#term").terminal();
            var command = termObj.get_command().replace(/\s+$/, "");
            var split_command = command.split(" ");
            var first_arg = split_command[0];
            var last_arg = split_command.pop();

            var search_room;
            if (last_arg.substring(0, 1) == "~") {
                search_room = jQuery.extend(true, {}, Home);
            } else {
                search_room = jQuery.extend(true, {}, current_room);
            }

            var path_rooms = last_arg.split("/");
            var new_room;
            var substring_matches = [];

            for (var room_num = 0; room_num < path_rooms.length; room_num++) {
                new_room = search_room.can_cd(path_rooms[room_num]);
                if (new_room) {
                    search_room = new_room;
                } else {
                    if (room_num == path_rooms.length - 1) {
                        var targetPrefix = path_rooms[room_num].toLowerCase();

                        // Comandaments de navegació de sales
                        if (first_arg == "cd" || first_arg == "ls" || first_arg == "mv") {
                            for (var c = 0; c < search_room.children.length; c++) {
                                var childName = search_room.children[c].room_name;
                                if (childName.toLowerCase().indexOf(targetPrefix) === 0) {
                                    substring_matches.push(childName);
                                }
                            }
                        }

                        // Comandaments d'interacció amb objectes
                        if (first_arg == "cat" || first_arg == "less" || first_arg == "cp" || 
                            first_arg == "mv" || first_arg == "grep" || first_arg == "touch" || 
                            first_arg == "rm" || first_arg == "sudo") {
                            for (var it = 0; it < search_room.items.length; it++) {
                                var itemName = search_room.items[it].itemname;
                                if (itemName.toLowerCase().indexOf(targetPrefix) === 0) {
                                    substring_matches.push(itemName);
                                }
                            }
                        }

                        if (substring_matches.length == 1) {
                            path_rooms.pop();
                            path_rooms.push(substring_matches[0]);
                            split_command.push(path_rooms.join("/"));
                            termObj.set_command(split_command.join(" "));
                        } else if (substring_matches.length > 1) {
                            var lCSindex = 0;
                            var i, ch, memo;
                            do {
                                memo = null;
                                for (i = 0; i < substring_matches.length; i++) {
                                    ch = substring_matches[i].charAt(lCSindex);
                                    if (!ch) break;
                                    if (!memo) memo = ch;
                                    else if (ch != memo) break;
                                }
                            } while (i == substring_matches.length && ++lCSindex);

                            var longestCommonSubstring = substring_matches[0].slice(0, lCSindex);
                            if (longestCommonSubstring != "") {
                                if (path_rooms[room_num] == longestCommonSubstring) {
                                    split_command.push(last_arg);
                                    termObj.echo("magic> " + split_command.join(" ").replace(/\s+$/, ""));
                                    termObj.echo(substring_matches.join("  "));
                                    termObj.set_command(split_command.join(" ").replace(/\s+$/, ""));
                                } else {
                                    path_rooms.pop();
                                    path_rooms.push(longestCommonSubstring);
                                    split_command.push(path_rooms.join("/"));
                                    termObj.set_command(split_command.join(" "));
                                }
                            } else {
                                split_command.push(last_arg);
                                termObj.echo("magic> " + split_command.join(" ").replace(/\s+$/, ""));
                                termObj.echo(substring_matches.join("  "));
                                termObj.set_command(split_command.join(" ").replace(/\s+$/, ""));
                            }
                        } else {
                            termObj.set_command(command.replace(/\s+$/, ""));
                        }
                    } else {
                        termObj.set_command(command.replace(/\s+$/, ""));
                    }
                }
            }
        }
    });
});