/**
 * CyberGame.js
 * Controlador principal del joc de Ciberseguretat per a 2n d'ESO
 * Amb sistema de reptes pedagògics, pistes progressives i rànquing
 */

var fsModel = new CyberFilesystem();

var GameProgress = {
    step: 1, // Passos de l'1 al 17
    totalSteps: 17,
    phase: 1, // 1..5
    hintsUsedCount: 0,
    currentHintLevel: 0, // 0 = tancada, 1 = reflexió, 2 = solució
    errorsCount: 0, // Errors comesos a la consola
    ipDiscovered: false,
    processKilled: false,
    virusDeleted: false,
    folderCreated: false,
    backupRestored: false,
    firewallBlocked: false,
    completed: false,
    quizCompleted: false,
    quizScore: 0,
    verificationCode: null,
    student: {
        nom: "",
        cognoms: "",
        curs: "2A"
    }
};

var PhasesInfo = [
    {
        phase: 1,
        badge: "FASE 1: DIAGNÒSTIC INICIAL",
        title: "On som i què ha passat?",
        pedagogy: "Tota sessió de ciberseguretat comença per orientar-se a la màquina i llegir l'informe d'incidència amb ordres de lectura bàsiques.",
        tasks: [
            {
                id: 1,
                desc: "Esbrina en quina carpeta del servidor de l'institut et trobes ara mateix.",
                hintL1: "Pensa quina ordre de la teva guia de comandes serveix per 'imprimir el directori de treball' (té 3 lletres).",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>pwd</span>"
            },
            {
                id: 2,
                desc: "Inspecciona el contingut de la teva carpeta per descobrir quins documents tens a l'abast.",
                hintL1: "Recorda l'ordre que 'llista' els fitxers i carpetes que tens al davant (comença per 'l...').",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>ls</span>"
            },
            {
                id: 3,
                desc: "Obre i llegeix el comunicat d'urgència ('missio.txt') per assabentar-te dels detalls de l'atac.",
                hintL1: "A Linux, quina comanda de 3 lletres llegeix un fitxer de text directament a la pantalla? (Revisa la guia de comandes!).",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>cat missio.txt</span>"
            }
        ]
    },
    {
        phase: 2,
        badge: "FASE 2: INVESTIGAR ELS REGISTRES",
        title: "Rastrejar l'accés del pirata a /var/log",
        pedagogy: "Els hackers deixen rastres digitals. A Linux, els servidors anoten cada intent de connexió a la carpeta de registres '/var/log'.",
        tasks: [
            {
                id: 4,
                desc: "Desplaça't fins a la carpeta on es guarden els registres del sistema (observa l'arbre de carpetes per trobar la ruta a '/var/log').",
                hintL1: "Quina comanda serveix per 'canviar de directori'? Després has d'escriure la ruta de destinació.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>cd /var/log</span>"
            },
            {
                id: 5,
                desc: "Examina quins fitxers de registre hi ha guardats dins d'aquesta carpeta.",
                hintL1: "Recorda l'ordre per 'llistar' arxius de la teva ubicació actual.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>ls</span>"
            },
            {
                id: 6,
                desc: "Filtra el registre d'incidències ('intrusio.log') amb la comanda 'grep' per trobar la IP atacant.",
                hintL1: "El fitxer té centenars de línies! Fes servir 'grep' amb la paraula clau ALERTA seguit de 'intrusio.log'.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>grep ALERTA intrusio.log</span>"
            }
        ]
    },
    {
        phase: 3,
        badge: "FASE 3: NEUTRALITZAR EL MALWARE",
        title: "Caçar el virus ocult a la carpeta /tmp",
        pedagogy: "Els pirates solen dipositar codi maliciós a la carpeta temporal '/tmp'. Cal auditar els processos de la memòria RAM per aturar el programari nociu pel seu PID abans d'eliminar-ne el fitxer del disc.",
        tasks: [
            {
                id: 7,
                desc: "Viatja fins a la carpeta temporal del sistema on l'atacant ha descarregat l'arxiu sospitós.",
                hintL1: "Fes servir l'ordre de desplaçament per anar a la carpeta temporal '/tmp'.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>cd /tmp</span>"
            },
            {
                id: 8,
                desc: "Revisa els fitxers d'aquesta carpeta per localitzar el programa maliciós.",
                hintL1: "Llista els arxius de la carpeta per descobrir el nom del virus (comença per 'l...').",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>ls</span>"
            },
            {
                id: 9,
                desc: "Audita els processos en execució a la memòria RAM per esbrinar el número identificador (PID) del virus miner.",
                hintL1: "Comprova a la teva guia quina ordre de dues lletres mostra l'estat dels processos (Process Status, com el Gestor de Tasques).",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>ps</span>"
            },
            {
                id: 10,
                desc: "Atura el procés del virus abans que cremi la CPU del servidor (utilitza el seu número PID que has vist a la llista).",
                hintL1: "Consulta la teva guia de comandes: quina ordre serveix per aturar un procés indicant el seu número PID?",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>kill 4092</span>"
            },
            {
                id: 11,
                desc: "Esborra definitivament el fitxer del virus del disc dur perquè ningú el pugui tornar a executar.",
                hintL1: "Quina comanda serveix per eliminar arxius a Linux? (De l'anglès 'remove', 2 lletres).",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>rm virus_miner.sh</span>"
            }
        ]
    },
    {
        phase: 4,
        badge: "FASE 4: RECUPERAR LES NOTES DE L'INSTITUT",
        title: "Restaurar les dades des de /backups",
        pedagogy: "Les còpies de seguretat ('backups') són l'assegurança de vida de qualsevol sistema. Crearem una carpeta neta i copiarem el fitxer bo amb 'cp'.",
        tasks: [
            {
                id: 12,
                desc: "Crea una nova carpeta neta anomenada 'recuperat' dins de '/servidor_notes' per protegir les dades.",
                hintL1: "Recorda l'ordre per crear nous directoris (Make Directory, comença per 'mk...').",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>mkdir /servidor_notes/recuperat</span>"
            },
            {
                id: 13,
                desc: "Navega fins a la cambra de còpies de seguretat ('/backups') per trobar les dades originals.",
                hintL1: "Fes servir 'cd' per desplaçar-te a la carpeta de backups.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>cd /backups</span>"
            },
            {
                id: 14,
                desc: "Copia el fitxer bo de notes ('notes_recuperades.csv') cap a la carpeta segura que has creat ('/servidor_notes/recuperat').",
                hintL1: "Utilitza la comanda de còpia: cp <origen> <destí>. El destí ha de ser la carpeta segura /servidor_notes/recuperat/.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>cp notes_recuperades.csv /servidor_notes/recuperat/</span>"
            },
            {
                id: 15,
                desc: "Verifica que el fitxer de notes s'ha copiat correctament dins de '/servidor_notes/recuperat'.",
                hintL1: "Llista el contingut de la carpeta recuperada amb 'ls'.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>ls /servidor_notes/recuperat</span>"
            }
        ]
    },
    {
        phase: 5,
        badge: "FASE 5: BLINDATGE I TALLAFOCS",
        title: "Expulsar l'atacant i salvar l'institut",
        pedagogy: "El tallafocs ('firewall') permet tallar la connexió a una adreça IP maliciosa perquè no pugui tornar a accedir mai més a l'institut.",
        tasks: [
            {
                id: 16,
                desc: "Escaneja la xarxa local de l'institut per comprovar si el dispositiu atacant encara hi és connectat.",
                hintL1: "Comprova a la guia de comandes quina ordre analitza els equips connectats a la xarxa (Network Scanner).",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>scan</span>"
            },
            {
                id: 17,
                desc: "Posa la IP atacant (192.168.1.88) a la llista negra del tallafocs per expulsar-la per sempre més.",
                hintL1: "Utilitza l'eina 'firewall' amb l'acció 'block' seguida de la IP que vas descobrir.",
                hintL2: "Escriu la comanda: <span class='hint-code-text'>firewall block 192.168.1.88</span>"
            }
        ]
    }
];

function calculateRank() {
    if (GameProgress.hintsUsedCount === 0) {
        return { title: "CiberHacker d'Elit 🎖️", color: "var(--accent-green)" };
    } else if (GameProgress.hintsUsedCount <= 3) {
        return { title: "Analista de Seguretat 🛡️ (" + GameProgress.hintsUsedCount + " pistes)", color: "var(--accent-cyan)" };
    } else {
        return { title: "Aprenent de Ciberdefensa 🔍 (" + GameProgress.hintsUsedCount + " pistes)", color: "var(--accent-amber)" };
    }
}

function updateUI() {
    // Determinar fase actual segons el pas
    if (GameProgress.step <= 3) GameProgress.phase = 1;
    else if (GameProgress.step <= 6) GameProgress.phase = 2;
    else if (GameProgress.step <= 11) GameProgress.phase = 3;
    else if (GameProgress.step <= 15) GameProgress.phase = 4;
    else GameProgress.phase = 5;

    var curPhaseObj = PhasesInfo[GameProgress.phase - 1];
    var curTask = null;
    for (var i = 0; i < curPhaseObj.tasks.length; i++) {
        if (curPhaseObj.tasks[i].id === GameProgress.step) {
            curTask = curPhaseObj.tasks[i];
            break;
        }
    }
    if (!curTask && GameProgress.completed) {
        curTask = { desc: "MISSIÓ COMPLETADA! El servidor de l'institut està completament assegurat.", hintL1: "", hintL2: "" };
    }

    // Actualitzar textos del dashboard
    $("#mission-phase-badge").text(curPhaseObj.badge);
    $("#mission-title").text(curPhaseObj.title);
    $("#mission-pedagogy").text(curPhaseObj.pedagogy);
    $("#task-instruction").text(curTask ? curTask.desc : "");

    // Actualitzar rànquing
    var r = calculateRank();
    $("#rank-val").text(r.title).css("color", r.color);

    // Gestió del botó de pistes
    if (GameProgress.completed) {
        $("#btn-toggle-hint").hide();
        $("#hint-display-box").hide();
    } else {
        $("#btn-toggle-hint").show();
        if (GameProgress.currentHintLevel === 0) {
            $("#btn-toggle-hint").html("<span>💡 Demanar Pista</span>");
            $("#hint-display-box").hide();
        } else if (GameProgress.currentHintLevel === 1) {
            $("#btn-toggle-hint").html("<span>💡 Veure Solució</span>");
            $("#hint-display-box").show();
            $("#hint-level-tag").text("PISTA NIVELL 1 (Reflexió):");
            $("#hint-text").html(curTask ? curTask.hintL1 : "");
        } else if (GameProgress.currentHintLevel === 2) {
            $("#btn-toggle-hint").html("<span>🙈 Amagar Pista</span>");
            $("#hint-display-box").show();
            $("#hint-level-tag").text("PISTA NIVELL 2 (Solució directa):");
            $("#hint-text").html(curTask ? curTask.hintL2 : "");
        }
    }

    // Percentatge de progrés
    var percent = Math.min(100, Math.round(((GameProgress.step - 1) / GameProgress.totalSteps) * 100));
    if (GameProgress.completed) percent = 100;
    $("#progress-percentage").text(percent + "%");
    $("#progress-bar").css("width", percent + "%");

    // Indicador d'estat
    if (GameProgress.completed) {
        $("#status-indicator").addClass("secured").html('<span class="status-dot"></span> SISTEMA ASSEGURAT');
    } else {
        $("#status-indicator").removeClass("secured").html('<span class="status-dot"></span> AMENAÇA: CRÍTICA');
    }

    // Renderitzar l'arbre de fitxers visual
    renderDirectoryTree();
}

function renderDirectoryTree() {
    var container = $("#tree-viewer");
    container.empty();
    var currentPath = fsModel.pwd();

    function traverse(node, currentP, depth) {
        var indent = "&nbsp;&nbsp;".repeat(depth);
        var isCurrent = (currentP === currentPath);
        var icon = node.type === "dir" ? "📁" : (node.name.indexOf(".sh") > -1 ? "☣️" : "📄");
        var isInfected = node.name === "virus_miner.sh";

        var lineClass = "tree-line";
        if (node.type === "dir") lineClass += " is-dir";
        else lineClass += " is-file";
        if (isCurrent) lineClass += " current-dir";
        if (isInfected) lineClass += " infected";

        var displayName = node.name || "/ (arrel)";
        var html = '<div class="' + lineClass + '">' + indent + icon + ' <span>' + displayName + '</span></div>';
        container.append(html);

        if (node.type === "dir" && node.children) {
            var keys = Object.keys(node.children).sort();
            for (var i = 0; i < keys.length; i++) {
                var childNode = node.children[keys[i]];
                var childPath = currentP === "/" ? "/" + childNode.name : currentP + "/" + childNode.name;
                traverse(childNode, childPath, depth + 1);
            }
        }
    }

    traverse(fsModel.root, "/", 0);
}

function advanceStep(successMsg) {
    var term = $("#term").terminal();
    if (term) {
        term.echo("\n[[;#00ffaa;]✔ OBJECTIU ASSOLIT:] " + successMsg + "\n");
    }
    // Reinicia el nivell de pista per al següent pas
    GameProgress.currentHintLevel = 0;
    if (GameProgress.step < GameProgress.totalSteps) {
        GameProgress.step++;
    }
    updateUI();
    saveGameToStorage();
}

var QuizQuestions = [
    {
        q: "1. Què signifiquen les sigles de la comanda 'pwd'?",
        options: [
            "Print Working Directory (Mostra la ruta de la carpeta actual)",
            "Password User Data (Canvia la contrasenya de l'usuari)",
            "Program Web Downloader (Descarrega arxius d'Internet)",
            "Process Windows Directory (Gestor de fitxers de Windows)"
        ],
        correct: 0,
        explanation: "'pwd' significa 'Print Working Directory' i imprimeix per pantalla el camí absolut de la carpeta on et trobes."
    },
    {
        q: "2. Quina comanda fem servir per llistar els fitxers i carpetes que tenim davant?",
        options: [
            "ls",
            "cd",
            "cat",
            "open"
        ],
        correct: 0,
        explanation: "'ls' (de 'list') mostra els noms dels fitxers i subcarpetes del directori actual."
    },
    {
        q: "3. Si executem 'ls -l', quina informació addicional ens aporta respecte a 'ls' sol?",
        options: [
            "Mostra permisos, mida en bytes i data de modificació de cada fitxer",
            "Només mostra les imatges i vídeos del sistema",
            "Esborra immediatament els fitxers duplicats",
            "Tradueix els noms dels fitxers al llatí"
        ],
        correct: 0,
        explanation: "El paràmetre '-l' activa el format detallat (long listing) amb permisos, mides i dates."
    },
    {
        q: "4. Si ets a '/home/ciberdefensa' i vols accedir a la carpeta '/var/log', quina ordre has d'escriure?",
        options: [
            "cd /var/log",
            "pwd /var/log",
            "cat /var/log",
            "mkdir /var/log"
        ],
        correct: 0,
        explanation: "'cd' (Change Directory) és l'ordre utilitzada per navegar i canviar de carpeta."
    },
    {
        q: "5. Quina ordre permet pujar un nivell enrere cap a la carpeta superior o pare?",
        options: [
            "cd ..",
            "cd -enrere",
            "back",
            "pwd .."
        ],
        correct: 0,
        explanation: "Els dos punts '..' representen sempre el directori pare o superior a Linux."
    },
    {
        q: "6. Quina comanda ràpida et retorna a la teva carpeta personal d'usuari (home)?",
        options: [
            "cd ~ (o simplement 'cd' sol)",
            "cd home",
            "exit",
            "ls ~"
        ],
        correct: 0,
        explanation: "El símbol de titlla '~' o la comanda 'cd' sense arguments et porta a la teva carpeta d'usuari."
    },
    {
        q: "7. Quina és la funció principal de la comanda 'cat' (ex: cat missio.txt)?",
        options: [
            "Mostra el contingut d'un fitxer de text directament a la pantalla",
            "Crea una carpeta nova",
            "Executa un programa compilador",
            "Copia un fitxer a un servidor remot"
        ],
        correct: 0,
        explanation: "'cat' (concatenate) permet llegir i visualitzar documents de text directament a la consola."
    },
    {
        q: "8. Per a què serveix la comanda 'grep'?",
        options: [
            "Per cercar una paraula clau o patró concret dins d'un fitxer",
            "Per apagar el monitor de la pantalla",
            "Per canviar el fons de pantalla del sistema",
            "Per instal·lar actualitzacions de programari"
        ],
        correct: 0,
        explanation: "'grep' cerca cadenes de text i filtra només les línies que contenen la paraula indicada."
    },
    {
        q: "9. Quina comanda de Linux actua com el 'Gestor de Tasques' mostrant els processos actius?",
        options: [
            "ps",
            "taskmgr",
            "rm",
            "cp"
        ],
        correct: 0,
        explanation: "'ps' (Process Status) llista tots els programes i processos en execució a la memòria RAM."
    },
    {
        q: "10. Què representa el número 'PID' que apareix quan executem 'ps'?",
        options: [
            "L'identificador numèric únic de cada procés a la memòria (Process ID)",
            "La temperatura actual de la placa base",
            "La contrasenya secreta de l'administrador",
            "El número d'ordinador assignat a l'aula"
        ],
        correct: 0,
        explanation: "El PID (Process ID) és el número que assigna el sistema operatiu per identificar de manera unívoca cada procés."
    },
    {
        q: "11. Si un virus miner amb PID 4092 està col·lapsant la CPU, quina ordre l'atura d'immediat?",
        options: [
            "kill 4092",
            "stop 4092",
            "rm 4092",
            "exit 4092"
        ],
        correct: 0,
        explanation: "La comanda 'kill' finalitza el procés indicat pel seu número PID."
    },
    {
        q: "12. Quina comanda elimina definitivament un fitxer del disc dur sense passar per la paperera?",
        options: [
            "rm",
            "del",
            "mv",
            "kill"
        ],
        correct: 0,
        explanation: "'rm' (remove) esborra fitxers del disc dur de manera directa a la consola."
    },
    {
        q: "13. Si necessitem crear una carpeta nova anomenada 'recuperat', quina comanda farem servir?",
        options: [
            "mkdir recuperat",
            "folder recuperat",
            "touch recuperat",
            "newdir recuperat"
        ],
        correct: 0,
        explanation: "'mkdir' significa 'Make Directory' i crea nous directoris al sistema de fitxers."
    },
    {
        q: "14. Quina és la sintaxi correcta de la comanda 'cp' per duplicar un fitxer?",
        options: [
            "cp <fitxer_origen> <directori_destí>",
            "cp <directori_destí> <fitxer_origen>",
            "cp --només",
            "cp <fitxer1> <fitxer2> <fitxer3>"
        ],
        correct: 0,
        explanation: "'cp' requereix primer indicar què volem copiar (origen) i després on ho volem desar (destí)."
    },
    {
        q: "15. Quina diferència principal hi ha entre 'cp' i 'mv'?",
        options: [
            "'cp' crea un duplicat conservant l'original; 'mv' mou o reanomena l'arxiu original",
            "'cp' només serveix per a text i 'mv' només per a carpetes",
            "'cp' esborra el fitxer i 'mv' el restaura",
            "Són dues comandes que fan exactament el mateix"
        ],
        correct: 0,
        explanation: "'cp' (copy) duplica dades, mentre que 'mv' (move) trasllada o reanomena l'arxiu d'origen."
    },
    {
        q: "16. A la missió, quina eina d'escaneig hem utilitzat per detectar dispositius a la xarxa local?",
        options: [
            "scan (o nmap)",
            "ping localhost",
            "cat /network",
            "pwd network"
        ],
        correct: 0,
        explanation: "'scan' / 'nmap' inspecciona els equips connectats i ports actius d'una xarxa informàtica."
    },
    {
        q: "17. Com hem utilitzat la comanda 'firewall' per bloquejar l'adreça IP maliciosa?",
        options: [
            "firewall block 192.168.1.88",
            "firewall remove 192.168.1.88",
            "firewall off",
            "kill 192.168.1.88"
        ],
        correct: 0,
        explanation: "L'ordre 'firewall block <IP>' afegeix la IP maliciosa a la llista negra del tallafocs per tallar-li l'accés."
    },
    {
        q: "18. Com podem distingir una ruta absoluta d'una ruta relativa a Linux?",
        options: [
            "La ruta absoluta comença sempre des de l'arrel amb una barra inclinada inicial ('/')",
            "La ruta absoluta s'escriu sempre tota en majúscules",
            "La ruta absoluta només pot tenir tres lletres",
            "La ruta relativa conté obligatòriament la paraula 'local'"
        ],
        correct: 0,
        explanation: "Les rutes absolutes comencen des de l'arrel '/' del sistema; les relatives comencen des del directori actual."
    },
    {
        q: "19. Si la pantalla de la terminal està plena de text i volem netejar-la per veure millor, què escrivim?",
        options: [
            "clear",
            "cls",
            "clean",
            "empty"
        ],
        correct: 0,
        explanation: "A Linux, la comanda estàndard per netejar la pantalla de la consola és 'clear'."
    },
    {
        q: "20. En ciberseguretat i administració de sistemes, per què és indispensable fer còpies de seguretat ('backups')?",
        options: [
            "Per poder restaurar el sistema i les dades si patim un incident, virus o fallada de disc",
            "Perquè el processador funcioni al doble de velocitat",
            "Perquè els usuaris no puguin apagar els ordinadors",
            "Només serveixen per ocupar memòria RAM innecessària"
        ],
        correct: 0,
        explanation: "Els 'backups' són la garantia primordial per recuperar la integritat de les dades davant de qualsevol incident."
    }
];

var currentQuizIndex = 0;

function startQuiz() {
    currentQuizIndex = 0;
    GameProgress.quizScore = 0;
    $("#quiz-modal").fadeIn();
    renderCurrentQuizQuestion();
}

function renderCurrentQuizQuestion() {
    if (currentQuizIndex >= QuizQuestions.length) {
        finishQuiz();
        return;
    }

    var qObj = QuizQuestions[currentQuizIndex];
    $("#quiz-progress-text").text("Pregunta " + (currentQuizIndex + 1) + " de " + QuizQuestions.length);
    $("#quiz-score-live").text("Puntuació: " + GameProgress.quizScore + " / " + QuizQuestions.length);

    var pct = Math.round(((currentQuizIndex) / QuizQuestions.length) * 100);
    $("#quiz-progress-bar").css("width", pct + "%");

    $("#quiz-question-title").text(qObj.q);
    var container = $("#quiz-options-container").empty();
    var letters = ["A", "B", "C", "D"];

    for (var i = 0; i < qObj.options.length; i++) {
        (function(idx) {
            var btn = $('<button class="quiz-option-btn"><span class="opt-badge">' + letters[idx] + '</span> <span>' + qObj.options[idx] + '</span></button>');
            btn.click(function() {
                selectQuizOption(idx, qObj);
            });
            container.append(btn);
        })(i);
    }

    $("#quiz-explanation-box").hide();
    $("#btn-next-question").hide();
}

function selectQuizOption(chosenIdx, qObj) {
    $(".quiz-option-btn").prop("disabled", true);
    var isCorrect = (chosenIdx === qObj.correct);

    var btns = $(".quiz-option-btn");
    if (isCorrect) {
        $(btns[chosenIdx]).addClass("correct");
        GameProgress.quizScore++;
        $("#quiz-explanation-box")
            .css("border-left-color", "var(--accent-green)")
            .html("<strong>✔ RESPOSTA CORRECTA!</strong> " + qObj.explanation)
            .show();
    } else {
        $(btns[chosenIdx]).addClass("incorrect");
        $(btns[qObj.correct]).addClass("correct");
        $("#quiz-explanation-box")
            .css("border-left-color", "var(--accent-red)")
            .html("<strong>❌ RESPOSTA INCORRECTA.</strong> " + qObj.explanation)
            .show();
    }

    $("#quiz-score-live").text("Puntuació: " + GameProgress.quizScore + " / " + QuizQuestions.length);

    if (currentQuizIndex === QuizQuestions.length - 1) {
        $("#btn-next-question").text("Finalitzar i Veure Diploma Oficial 🎖️").show();
    } else {
        $("#btn-next-question").text("Següent Pregunta ▶️").show();
    }

    saveGameToStorage();
}

function advanceQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < QuizQuestions.length) {
        renderCurrentQuizQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    GameProgress.quizCompleted = true;
    saveGameToStorage();
    $("#quiz-modal").fadeOut(function() {
        showDiploma();
    });
}

function computeFinalGrade() {
    var baseScore = 10.0;
    var penalties = (GameProgress.hintsUsedCount * 0.25) + (GameProgress.errorsCount * 0.05);
    var total = Math.min(10.0, Math.max(5.0, baseScore - penalties));
    total = Math.round(total * 10) / 10;

    var badge = "AS";
    var desc = "Assolit Satisfactori";
    var color = "var(--accent-amber)";

    if (total >= 9.0) {
        badge = "AE";
        desc = "Assolit Excel·lent";
        color = "var(--accent-green)";
    } else if (total >= 7.0) {
        badge = "AN";
        desc = "Assolit Notable";
        color = "var(--accent-cyan)";
    } else {
        badge = "AS";
        desc = "Assolit Satisfactori";
        color = "var(--accent-amber)";
    }

    return {
        badge: badge,
        desc: desc,
        num: total,
        color: color
    };
}

function showDiploma() {
    if (!GameProgress.student || !GameProgress.student.nom) {
        showLoginModal(false);
        return;
    }

    if (!GameProgress.verificationCode) {
        GameProgress.verificationCode = "OPT-TERM-2026-" + Math.random().toString(36).substring(2, 6).toUpperCase();
        saveGameToStorage();
    }

    var fullName = GameProgress.student.nom + " " + (GameProgress.student.cognoms || "");
    $("#diploma-student-name").text(fullName);
    $("#diploma-student-curs").text(GameProgress.student.curs || "Grup");
    $("#diploma-errors-val").text(GameProgress.errorsCount);
    $("#diploma-hints-val").text(GameProgress.hintsUsedCount);
    $("#diploma-quiz-val").text("17 / 17 (100%)");

    var grade = computeFinalGrade();
    $("#diploma-grade-badge")
        .text(grade.badge)
        .removeClass("grade-ae grade-an grade-as grade-na")
        .addClass("grade-" + grade.badge.toLowerCase());
    $("#diploma-grade-desc").text(grade.desc);
    $("#diploma-grade-num").text("Nota Global: " + grade.num.toFixed(1) + " / 10");

    var d = new Date();
    var months = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"];
    var dateStr = d.getDate() + " de " + months[d.getMonth()] + " de " + d.getFullYear();
    $("#diploma-date").text(dateStr);
    $("#diploma-code").text(GameProgress.verificationCode);

    $("#diploma-modal").fadeIn();
    $("#btn-show-diploma").show();
}

function showLoginModal(canClose) {
    if (GameProgress.student) {
        $("#input-nom").val(GameProgress.student.nom || "");
        $("#input-cognoms").val(GameProgress.student.cognoms || "");
        if (GameProgress.student.curs) {
            $("#input-curs").val(GameProgress.student.curs);
        }
    }
    $("#login-modal").fadeIn();
}

function updateStudentHeader() {
    if (GameProgress.student && GameProgress.student.nom) {
        var display = "Agent: " + GameProgress.student.nom;
        if (GameProgress.student.curs) {
            display += " (" + GameProgress.student.curs + ")";
        }
        $("#header-student-name").text(display);
    } else {
        $("#header-student-name").text("Agent: (Identifica't)");
    }
}

function triggerVictory() {
    updateUI();
    var term = $("#term").terminal();
    if (term) {
        term.echo("\n[[;#00ffaa;]🎉 ENHORABONA! Has neutralitzat totes les amenaces i has superat amb èxit la missió de ciberdefensa.]");
        term.echo("[[;#7dd3fc;]Generant el teu Diploma Oficial de Ciberdefensa i Tecnologia...]\n");
    }
    setTimeout(function() {
        showDiploma();
    }, 1200);
}

// Analitzador d'errors comuns de principiant per donar feedback pedagògic
function checkBeginnerMistakes(rawInput, term) {
    var clean = rawInput.trim();
    var lower = clean.toLowerCase();

    // Comprovació de comandes enganxades sense espai (ex: cd/var/log o catmissio.txt)
    if (lower.indexOf("cd/") === 0) {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Has enganxat la comanda amb la ruta! A Linux cal deixar sempre un espai. Prova: cd " + clean.substring(2));
        return true;
    }
    if (lower.indexOf("cat/") === 0) {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Recorda deixar un espai entre 'cat' i la ruta del fitxer! Prova: cat " + clean.substring(3));
        return true;
    }
    if (lower.indexOf("rm/") === 0) {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Cal separar 'rm' i el nom de l'arxiu amb un espai! Prova: rm " + clean.substring(2));
        return true;
    }
    if (lower === "catmissio.txt" || lower === "catmissio") {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Falta un espai entre la comanda i el fitxer! Escriu 'cat missio.txt'.");
        return true;
    }
    if (lower === "ls-l") {
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Recorda deixar un espai abans del guió: 'ls -l'.");
        return true;
    }

    var parts = lower.split(" ");
    var cmd = parts[0];

    if (cmd === "open" || cmd === "obrir" || cmd === "llegir" || cmd === "veure") {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] A Linux no fem servir '" + cmd + "'. Per llegir un fitxer de text directament a la pantalla, utilitza 'cat <fitxer>'. Consulta la teva guia de comandes a la dreta!");
        return true;
    }
    if (cmd === "delete" || cmd === "del" || cmd === "borrar" || cmd === "esborrar") {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Per esborrar arxius a la terminal fem servir l'ordre 'rm' (de 'remove'). Exemple: rm <fitxer>.");
        return true;
    }
    if (cmd === "dir") {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] 'dir' és típic de Windows. A Linux utilitzem 'ls' (de 'list') per mirar quins fitxers hi ha!");
        return true;
    }
    if (cmd === "cls") {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] A Linux, per netejar la pantalla de la terminal escrivim 'clear'.");
        return true;
    }
    if (cmd === "cd" && parts[1] && (parts[1].indexOf(".txt") > -1 || parts[1].indexOf(".csv") > -1 || parts[1].indexOf(".sh") > -1 || parts[1].indexOf(".log") > -1)) {
        GameProgress.errorsCount++;
        saveGameToStorage();
        term.echo("[[;#ffb703;]💡 PISTA DOCENT:] Compte! Has intentat fer 'cd' sobre un arxiu. La comanda 'cd' només serveix per entrar a carpetes. Per llegir el contingut d'un fitxer fes: cat " + parts[1]);
        return true;
    }
    return false;
}

function saveGameToStorage() {
    try {
        var saveData = {
            progress: GameProgress,
            fs: fsModel.serialize(),
            savedAt: Date.now()
        };
        localStorage.setItem("ciberdefensa_2eso_save", JSON.stringify(saveData));
    } catch (e) {
        console.warn("No s'ha pogut desar a localStorage:", e);
    }
}

function loadGameFromStorage() {
    try {
        var raw = localStorage.getItem("ciberdefensa_2eso_save");
        if (!raw) return false;
        var data = JSON.parse(raw);
        if (!data || !data.progress || !data.fs) return false;

        GameProgress = data.progress;
        fsModel.deserialize(data.fs);

        // Sanitat docent: si una partida s'havia guardat al pas 15 sense tenir el fitxer a /servidor_notes/recuperat
        if (GameProgress.step === 15) {
            var rec = fsModel.resolvePath("/servidor_notes/recuperat");
            if (!rec || rec.type !== "dir" || Object.keys(rec.children).length === 0) {
                GameProgress.step = 14;
                GameProgress.backupRestored = false;
                var sn = fsModel.resolvePath("/servidor_notes");
                if (sn && sn.children["backups"] && sn.children["backups"].type === "file") {
                    delete sn.children["backups"];
                }
                saveGameToStorage();
            }
        }

        return true;
    } catch (e) {
        console.warn("Error restaurant partida:", e);
        return false;
    }
}

function checkMissionProgress(cmd, args, output) {
    if (GameProgress.completed) return;

    var curPath = fsModel.pwd();

    // Pas 1: pwd
    if (GameProgress.step === 1 && cmd === "pwd") {
        advanceStep("Ubicació confirmada a " + curPath + ". Has superat el primer diagnòstic!");
        return;
    }

    // Pas 2: ls a /home/ciberdefensa
    if (GameProgress.step === 2 && cmd === "ls") {
        advanceStep("Molt bé! Has descobert el fitxer d'incidència 'missio.txt'. Ara cal obrir-lo per assabentar-te de la situació.");
        return;
    }

    // Pas 3: cat missio.txt
    if (GameProgress.step === 3 && (cmd === "cat" || cmd === "less") && args && args[0] && args[0].indexOf("missio") > -1) {
        advanceStep("Lectura completada! Ja coneixes l'atac de NullSector. Ara toca investigar els registres del servidor a la carpeta corresponent.");
        return;
    }

    // Pas 4: cd /var/log
    if (GameProgress.step === 4 && curPath === "/var/log") {
        advanceStep("Has arribat a la carpeta dels registres d'activitat (/var/log). Investiga quins fitxers conté.");
        return;
    }

    // Pas 5: ls a /var/log
    if (GameProgress.step === 5 && cmd === "ls" && curPath === "/var/log") {
        advanceStep("Llistat obtingut! Tens 'connexions.log' i 'intrusio.log'. Cal trobar la pista de l'atacant.");
        return;
    }

    // Pas 6: obligatòriament amb grep
    if (GameProgress.step === 6) {
        if (cmd === "grep" && args && args.join(" ").indexOf("intrusio") > -1) {
            GameProgress.ipDiscovered = true;
            advanceStep("BINGO! Amb la comanda 'grep' has filtrat el registre i has identificat la IP atacant: 192.168.1.88. L'informe adverteix que han dipositat malware a la carpeta temporal.");
            return;
        } else if ((cmd === "cat" || cmd === "less") && args && args[0] && args[0].indexOf("intrusio") > -1) {
            var term = $("#term").terminal();
            if (term) {
                term.echo("\n[[;#ffb703;]⚠️ ATENCIÓ:] El fitxer 'intrusio.log' conté centenars de línies de registre del sistema!\n" +
                          "En aquest repte és obligatori utilitzar la comanda [[;#00ffaa;]grep] per filtrar les línies clau (ex: [[;#00ffaa;]grep ALERTA intrusio.log]).\n");
            }
            return;
        }
    }

    // Pas 7: cd /tmp
    if (GameProgress.step === 7 && curPath === "/tmp") {
        advanceStep("Has entrat a la carpeta temporal /tmp. Revisa què hi han deixat amagat.");
        return;
    }

    // Pas 8: ls a /tmp
    if (GameProgress.step === 8 && cmd === "ls" && curPath === "/tmp") {
        advanceStep("Atenció! Has albirat el fitxer sospitós 'virus_miner.sh'. Cal investigar quins programes estan consumint recursos a la memòria RAM.");
        return;
    }

    // Pas 9: ps
    if (GameProgress.step === 9 && cmd === "ps") {
        advanceStep("Molt bé! Has auditat la memòria RAM. El procés 'virus_miner.sh' amb PID 4092 col·lapsa la CPU al 98%. Cal aturar aquest procés pel seu número identificador.");
        return;
    }

    // Pas 10: kill 4092
    if (GameProgress.step === 10 && cmd === "kill" && args && args[0] === "4092") {
        GameProgress.processKilled = true;
        advanceStep("BRUTAL! Has aturat el procés del virus de la memòria! Ara cal eliminar definitivament el fitxer maliciós del disc dur.");
        return;
    }

    // Pas 11: rm virus_miner.sh
    if (GameProgress.step === 11 && cmd === "rm") {
        var virusStillExists = fsModel.resolvePath("/tmp/virus_miner.sh");
        if (!virusStillExists) {
            GameProgress.virusDeleted = true;
            advanceStep("Net! El fitxer maliciós ha estat esborrat del disc dur. Ara cal protegir i recuperar les notes de l'avaluació creant una carpeta segura.");
            return;
        }
    }

    // Pas 12: mkdir /servidor_notes/recuperat
    if (GameProgress.step === 12 && cmd === "mkdir") {
        var recDir = fsModel.resolvePath("/servidor_notes/recuperat");
        if (recDir && recDir.type === "dir") {
            GameProgress.folderCreated = true;
            advanceStep("Carpeta segura creada correctament a /servidor_notes/recuperat! Ara cal accedir a la zona de còpies de seguretat (/backups) per recuperar les dades sanes.");
            return;
        }
    }

    // Pas 13: cd /backups
    if (GameProgress.step === 13 && curPath === "/backups") {
        advanceStep("Ets a la cambra de còpies de seguretat (/backups). Ara cal duplicar les notes cap a la carpeta segura que vas crear ('/servidor_notes/recuperat').");
        return;
    }

    // Pas 14: cp notes cap a /servidor_notes/recuperat
    if (GameProgress.step === 14 && cmd === "cp") {
        var recuperatDir = fsModel.resolvePath("/servidor_notes/recuperat");
        var hasNotesInRecuperat = recuperatDir && recuperatDir.type === "dir" && (
            recuperatDir.children["notes_recuperades.csv"] ||
            recuperatDir.children["notes_2eso.csv"] ||
            Object.keys(recuperatDir.children).length > 0
        );

        if (hasNotesInRecuperat) {
            GameProgress.backupRestored = true;
            advanceStep("COPIAT! Has duplicat les notes netes cap a la carpeta segura '/servidor_notes/recuperat'. Comprova que l'arxiu s'ha desat bé.");
            return;
        } else {
            var term = $("#term").terminal();
            if (term) {
                term.echo("\n[[;#ffb703;]⚠️ ALERTA DOCENT:] Has executat la comanda 'cp', però el fitxer NO s'ha desat a la carpeta segura que vas crear al pas 12 (/servidor_notes/recuperat).");
                term.echo("[[;#ffb703;]Destí indicat:] " + (args && args[1] ? args[1] : "(cap)") + " | [[;#7dd3fc;]Destí requerit:] /servidor_notes/recuperat/");
                term.echo("[[;#00ffaa;]Recorda l'estructura:] cp <fitxer_origen> <carpeta_destí/>\n");
            }
            return;
        }
    }

    // Pas 15: ls /servidor_notes/recuperat
    if (GameProgress.step === 15) {
        if (cmd === "ls" && (curPath.indexOf("recuperat") > -1 || (args && args[0] && args[0].indexOf("recuperat") > -1))) {
            var recuperatDir = fsModel.resolvePath("/servidor_notes/recuperat");
            var hasNotes = recuperatDir && recuperatDir.type === "dir" && Object.keys(recuperatDir.children).length > 0;
            if (hasNotes) {
                advanceStep("Verificat! Les notes estan sanes i salvades a /servidor_notes/recuperat. Ara cal analitzar la xarxa per comprovar si l'atacant encara hi té accés.");
                return;
            } else {
                var term = $("#term").terminal();
                if (term) {
                    term.echo("\n[[;#ff5555;]⚠️ ATENCIÓ:] La carpeta '/servidor_notes/recuperat' està buida! Les notes no es van copiar a aquest directori.");
                    term.echo("[[;#ffb703;]Consell:] Torna a copiar el fitxer des de '/backups' cap a la carpeta segura de destinació.\n");
                }
                return;
            }
        } else if (cmd === "cp") {
            var recuperatDir = fsModel.resolvePath("/servidor_notes/recuperat");
            var hasNotes = recuperatDir && recuperatDir.type === "dir" && Object.keys(recuperatDir.children).length > 0;
            if (hasNotes) {
                var term = $("#term").terminal();
                if (term) {
                    term.echo("\n[[;#00ffaa;]✔ MOLT BÉ:] Ara sí que les notes estan a /servidor_notes/recuperat! Comprova el contingut de la carpeta per verificar-ho.\n");
                }
            }
        }
    }

    // Pas 16: scan
    if (GameProgress.step === 16 && (cmd === "scan" || cmd === "nmap")) {
        advanceStep("Escaneig completat: la IP atacant (192.168.1.88) encara intenta penetrar el servidor! Cal bloquejar-la amb el tallafocs.");
        return;
    }

    // Pas 17: firewall block 192.168.1.88
    if (GameProgress.step === 17 && cmd === "firewall" && args && args[0] === "block" && args[1] === "192.168.1.88") {
        GameProgress.firewallBlocked = true;
        GameProgress.completed = true;
        advanceStep("TALLAFOCS BLINDAT! Has expulsat el pirata informàtic definitivament!");
        triggerVictory();
        return;
    }
}

// Inicialització de jQuery Terminal
$(document).ready(function() {
    var wasRestored = loadGameFromStorage();
    updateUI();

    // Botó desplegable de pistes progressives
    $("#btn-toggle-hint").click(function() {
        if (GameProgress.completed) return;
        if (GameProgress.currentHintLevel === 0) {
            GameProgress.currentHintLevel = 1;
            GameProgress.hintsUsedCount++;
        } else if (GameProgress.currentHintLevel === 1) {
            GameProgress.currentHintLevel = 2;
        } else {
            GameProgress.currentHintLevel = 0;
        }
        updateUI();
        saveGameToStorage();
    });

    $('#term').terminal(function(input, term) {
        var clean = input.trim();
        if (!clean) return;

        // Comprovació prèvia d'errors típics de novell
        if (checkBeginnerMistakes(clean, term)) {
            return;
        }

        fsModel.commandHistory.push(clean);

        var parts = clean.split(" ");
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1);

        switch (cmd) {
            case "pwd":
                term.echo(fsModel.pwd());
                checkMissionProgress(cmd, args, fsModel.pwd());
                break;

            case "ls":
                var target = args[0] || "";
                var opts = "";
                if (target.charAt(0) === "-") {
                    opts = target;
                    target = args[1] || "";
                }
                var out = fsModel.ls(target, opts);
                term.echo(out);
                checkMissionProgress(cmd, args, out);
                break;

            case "cd":
                var targetDir = args[0] || "~";
                var res = fsModel.cd(targetDir);
                if (!res.success) {
                    term.echo("[[;#ff5555;]" + res.msg + "]");
                } else {
                    term.set_prompt("ciberdefensa@institut:" + (res.path === fsModel.homePath ? "~" : res.path) + "$ ");
                }
                checkMissionProgress(cmd, args, res);
                updateUI();
                saveGameToStorage();
                break;

            case "cat":
            case "less":
                var fileContent = fsModel.cat(args[0]);
                term.echo(fileContent);
                checkMissionProgress(cmd, args, fileContent);
                break;

            case "grep":
                var grepOut = fsModel.grep(args[0], args[1]);
                term.echo(grepOut);
                checkMissionProgress(cmd, args, grepOut);
                break;

            case "ps":
                term.echo(fsModel.ps());
                checkMissionProgress(cmd, args, "");
                break;

            case "kill":
                var killMsg = fsModel.kill(args[0]);
                term.echo(killMsg);
                checkMissionProgress(cmd, args, killMsg);
                saveGameToStorage();
                break;

            case "rm":
                var recursive = false;
                var rmTarget = args[0];
                if (args[0] === "-r" || args[0] === "-rf") {
                    recursive = true;
                    rmTarget = args[1];
                }
                var rmMsg = fsModel.rm(rmTarget, recursive);
                term.echo(rmMsg);
                checkMissionProgress(cmd, args, rmMsg);
                updateUI();
                saveGameToStorage();
                break;

            case "mkdir":
                var mkMsg = fsModel.mkdir(args[0]);
                term.echo(mkMsg);
                checkMissionProgress(cmd, args, mkMsg);
                updateUI();
                saveGameToStorage();
                break;

            case "touch":
                var touchMsg = fsModel.touch(args[0]);
                term.echo(touchMsg);
                checkMissionProgress(cmd, args, touchMsg);
                updateUI();
                saveGameToStorage();
                break;

            case "cp":
                var cpMsg = fsModel.cp(args[0], args[1]);
                term.echo(cpMsg);
                checkMissionProgress(cmd, args, cpMsg);
                updateUI();
                saveGameToStorage();
                break;

            case "mv":
                var mvMsg = fsModel.mv(args[0], args[1]);
                term.echo(mvMsg);
                checkMissionProgress(cmd, args, mvMsg);
                updateUI();
                saveGameToStorage();
                break;

            case "scan":
            case "nmap":
                var scanMsg = fsModel.scan();
                term.echo(scanMsg);
                checkMissionProgress(cmd, args, scanMsg);
                break;

            case "firewall":
            case "iptables":
                var fwMsg = fsModel.firewall(args[0], args[1]);
                term.echo(fwMsg);
                checkMissionProgress(cmd, args, fwMsg);
                saveGameToStorage();
                break;

            case "history":
                term.echo(fsModel.history());
                break;

            case "whoami":
                var who = GameProgress.student && GameProgress.student.nom ? GameProgress.student.nom + " (" + GameProgress.student.curs + ")" : "Agent de Ciberdefensa";
                term.echo("ciberdefensa - " + who);
                break;

            case "man":
                term.echo(fsModel.man(args[0]));
                break;

            case "ajuda":
            case "help":
                if (GameProgress.completed) {
                    term.echo("[[;#00ffaa;]Missió completada! El servidor ja ha estat assegurat.]");
                    break;
                }
                var curPhase = PhasesInfo[GameProgress.phase - 1];
                var curT = curPhase.tasks.find(function(t) { return t.id === GameProgress.step; });
                if (!curT) break;

                var isSecondRequest = (GameProgress.currentHintLevel === 1 || (args && args[0] && (args[0] === "solucio" || args[0] === "solució")));

                if (GameProgress.currentHintLevel === 0) {
                    GameProgress.currentHintLevel = 1;
                    GameProgress.hintsUsedCount++;
                } else if (isSecondRequest) {
                    GameProgress.currentHintLevel = 2;
                }

                updateUI();
                saveGameToStorage();

                if (GameProgress.currentHintLevel === 2) {
                    var cleanHintL2 = curT.hintL2.replace(/<[^>]*>/g, "");
                    term.echo(
                        "[[;#ffb703;]=== AJUDA DE CIBERDEFENSA (NIVELL 2: SOLUCIÓ DIRECTA) ===]\n" +
                        "Repte actual: " + curT.desc + "\n" +
                        "🔑 " + cleanHintL2 + "\n" +
                        "[[;#ffb703;]⚠️ Pista comptabilitzada al teu diploma:] Total pistes sol·licitades = " + GameProgress.hintsUsedCount + "\n"
                    );
                } else {
                    term.echo(
                        "[[;#ffb703;]=== AJUDA DE CIBERDEFENSA (NIVELL 1: PISTA DE REFLEXIÓ) ===]\n" +
                        "Repte actual: " + curT.desc + "\n" +
                        "💡 " + curT.hintL1 + "\n" +
                        "[[;#ffb703;]⚠️ Pista comptabilitzada al teu diploma:] Total pistes sol·licitades = " + GameProgress.hintsUsedCount + "\n" +
                        "[[;#94a3b8;](Si encara necessites la comanda exacta, escriu 'ajuda solucio' o prem 'Veure Solució' al panell dret)]\n"
                    );
                }
                break;

            case "clear":
                term.clear();
                break;

            default:
                GameProgress.errorsCount++;
                saveGameToStorage();
                term.echo(
                    "[[;#ff5555;]Comanda no reconeguda: '" + cmd + "']\n" +
                    "Revisa la taula de comandes de la teva guia o demana una pista al panell dret."
                );
                break;
        }
    }, {
        prompt: 'ciberdefensa@institut:' + (fsModel.pwd() === fsModel.homePath ? '~' : fsModel.pwd()) + '$ ',
        greetings: (wasRestored ?
            "========================================================================\n" +
            "     🚨 CENTRE D'OPERACIONS DE CIBERDEFENSA 🚨                          \n" +
            "========================================================================\n\n" +
            "[[;#00ffaa;]✔ SESSIÓ ANTERIOR RESTAURADA AMB ÈXIT!]\n" +
            "S'ha recuperat el teu progrés guardat (Pas " + GameProgress.step + "/17).\n" +
            "Pots continuar la missió exactament des del punt on la vas deixar!\n\n" +
            "(Revisa el repte actual al panell dret, consulta el '📖 Tutorial' o escriu 'ajuda').\n"
            :
            "========================================================================\n" +
            "     🚨 CENTRE D'OPERACIONS DE CIBERDEFENSA 🚨                          \n" +
            "========================================================================\n\n" +
            "Són les 17:30 h a l'institut. El servidor central del centre pateix un ciberatac crític\n" +
            "per part del grup de pirates informàtics «NullSector»:\n\n" +
            " • Han infectat el sistema amb un virus miner en segon pla que col·lapsa la CPU.\n" +
            " • Han bloquejat el fitxer oficial de les notes de l'avaluació de l'institut.\n" +
            " • Estan intentant filtrar dades confidencials mitjançant una connexió remota.\n\n" +
            "Com a equip d'alumnes de Ciberdefensa, heu rebut accés remot d'emergència al terminal\n" +
            "del servidor per investigar l'incident, neutralitzar el malware, restaurar les notes\n" +
            "i blindar el tallafocs abans que sigui massa tard!\n\n" +
            "[[;#7dd3fc;]🔰 COM FER SERVIR AQUESTA TERMINAL (MINITUTORIAL):]\n" +
            "  1. Escriu la comanda amb el teclat i prem la tecla [[;#ffb703;][ENTER / INTRO ↵]].\n" +
            "  2. Deixa sempre un espai entre l'ordre i el fitxer (ex: 'cat missio.txt').\n" +
            "  3. Prem la tecla [[;#ffb703;][TAB ↹]] per autocompletar noms sense faltes.\n" +
            "  4. Fes servir les fletxes [[;#ffb703;][▲ / ▼]] per recuperar comandes anteriors.\n" +
            "  5. Si necessites un cop de mà, escriu [[;#00ffaa;]ajuda] o prem el botó '📖 Tutorial'.\n\n" +
            "El teu progrés es desa automàticament pas a pas.\n" +
            "Consulta el teu primer repte al panell superior per començar la missió!\n"
        ),
        name: 'ciber_terminal',
        history: true
    });

    // Habilitar desplaçament suau amb la roda del ratolí i el trackpad al terminal
    var termElement = document.getElementById("term");
    if (termElement) {
        termElement.addEventListener("wheel", function(e) {
            termElement.scrollTop += e.deltaY;
        }, { passive: true });
    }

    // Funció per mostrar el Minitutorial
    function showTutorialModal() {
        $("#tutorial-modal").fadeIn(250);
    }

    // Gestió d'intercanvi entre la Guia de Comandes i l'Explorador de Carpetes (Comandes primer, Explorador segon)
    function switchRightPanel(viewId) {
        if (viewId === "view-tree") {
            $("#view-commands").hide();
            $("#view-tree").show();
            $(".panel-tab-btn, .tab-nav-btn").removeClass("active");
            $("#tab-btn-tree").addClass("active");
        } else {
            $("#view-tree").hide();
            $("#view-commands").show();
            $(".panel-tab-btn, .tab-nav-btn").removeClass("active");
            $("#tab-btn-commands").addClass("active");
        }
    }

    $(document).on("click", ".panel-tab-btn, .tab-nav-btn", function() {
        var targetTab = $(this).attr("data-tab");
        switchRightPanel(targetTab);
    });

    // Inserció ràpida de comandes al fer clic sobre una fila de la guia de comandes
    $(document).on("click", ".cmd-clickable", function() {
        var cmd = $(this).attr("data-cmd") || $(this).find(".cmd-badge").text().trim();
        var baseCmd = cmd.split(" <")[0];
        var term = $("#term").terminal();
        if (term) {
            term.set_command(baseCmd);
            term.focus();
        }
    });

    // Botó per obrir el Tutorial des de la capçalera
    $("#btn-show-tutorial").click(function() {
        showTutorialModal();
    });

    // Botons per tancar el Tutorial i entrar al Terminal
    $("#btn-start-terminal, #btn-close-tutorial").click(function() {
        $("#tutorial-modal").fadeOut(250, function() {
            var term = $("#term").terminal();
            if (term) term.focus();
        });
    });

    // Gestió del Formulari de Login
    $("#login-form").submit(function(e) {
        e.preventDefault();
        var nom = $("#input-nom").val().trim();
        var cognoms = $("#input-cognoms").val().trim();
        var curs = $("#input-curs").val();

        if (!nom) {
            alert("Si us plau, introdueix el teu nom.");
            return;
        }

        GameProgress.student = {
            nom: nom,
            cognoms: cognoms,
            curs: curs
        };
        updateStudentHeader();
        saveGameToStorage();
        $("#login-modal").fadeOut(250, function() {
            showTutorialModal();
        });
    });

    // Clic al badge d'alumne per editar dades
    $("#student-badge").click(function() {
        showLoginModal(true);
    });

    // Navegació del Qüestionari
    $("#btn-next-question").click(function() {
        advanceQuizQuestion();
    });

    // Botons del Diploma
    $("#btn-print-diploma").click(function() {
        window.print();
    });

    $("#btn-close-diploma").click(function() {
        $("#diploma-modal").fadeOut();
    });

    $("#btn-restart-from-diploma").click(function() {
        if (confirm("Vols iniciar una nova partida des del principi?")) {
            localStorage.removeItem("ciberdefensa_2eso_save");
            location.reload();
        }
    });

    $("#btn-show-diploma").click(function() {
        showDiploma();
    });

    // Botó de reinici general
    $("#btn-restart").click(function() {
        if (confirm("Vols reiniciar la missió des del principi? Es perdrà el progrés guardat.")) {
            localStorage.removeItem("ciberdefensa_2eso_save");
            location.reload();
        }
    });

    // Inicialització de dades de l'estudiant i comprovació de login
    updateStudentHeader();
    if (!GameProgress.student || !GameProgress.student.nom) {
        showLoginModal(false);
    }
    if (GameProgress.completed && GameProgress.quizCompleted) {
        $("#btn-show-diploma").show();
    }

    // Autocompleció amb la tecla Tabulador
    $(window).keyup(function(e) {
        if (e.keyCode === 9) { // Tab key
            var term = $("#term").terminal();
            if (!term) return;
            var cmdLine = term.get_command();
            var tokens = cmdLine.split(" ");
            var lastToken = tokens[tokens.length - 1];

            if (!lastToken) return;

            var dir = fsModel.currentDir;
            var searchStr = lastToken;

            if (lastToken.indexOf("/") > -1) {
                var pParts = lastToken.split("/");
                searchStr = pParts.pop();
                var pPath = pParts.join("/") || "/";
                dir = fsModel.resolvePath(pPath);
            }

            if (dir && dir.type === "dir" && dir.children) {
                var matches = [];
                var keys = Object.keys(dir.children);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i].toLowerCase().indexOf(searchStr.toLowerCase()) === 0) {
                        matches.push(keys[i]);
                    }
                }
                if (matches.length === 1) {
                    tokens.pop();
                    var prefix = lastToken.indexOf("/") > -1 ? lastToken.substring(0, lastToken.lastIndexOf("/") + 1) : "";
                    tokens.push(prefix + matches[0]);
                    term.set_command(tokens.join(" "));
                }
            }
        }
    });
});
