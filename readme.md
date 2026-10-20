# Operació Terminal: Ciberdefensa a l'Institut

Un videojoc educatiu interactiu basat en la línia de comandes (CLI) creat per a l'alumnat de secundària com a **projecte internivell** (grups 1A, 1B, 2A, 2B, 3A, 3B...) per a les matèries de **Digitalització**, **Tecnologia** i **Informàtica**.

---

## 🚨 La Història

> Són les 17:30 h a l'institut. El servidor central del centre pateix un ciberatac crític per part del grup de pirates informàtics **«NullSector»**:
> - Han infectat el sistema amb un virus miner en segon pla que col·lapsa la CPU.
> - Han bloquejat el fitxer de les notes de l'avaluació de l'institut.
> - Estan intentant filtrar dades confidencials mitjançant una connexió remota.
>
> Com a equip d'alumnes de Ciberdefensa, heu rebut accés remot d'emergència al terminal del servidor per investigar l'incident, neutralitzar el malware, restaurar les notes i blindar el tallafocs abans que sigui massa tard!

---

## 🎯 Objectius pedagògics (Projecte Internivell de Secundària)

El joc no es limita a moure's per carpetes: connecta les **comandes essencials del sistema operatiu** amb tasques reals de diagnòstic i ciberseguretat:

### 1. Comandes essencials de navegació i gestió de fitxers:
- **`pwd`** (*Print Working Directory*): On soc ara mateix a l'ordinador?
- **`ls`** (*List*): Quins fitxers i carpetes tinc al davant? (`ls -l` per veure permisos i mides).
- **`cd <carpeta>`** (*Change Directory*): Navega a un altre directori (ex: `cd /var/log`).
- **`cd ..`**: Puja un nivell / torna enrere a la carpeta pare.
- **`cat <fitxer>`**: Llegeix el contingut sencer d'un document a la pantalla.
- **`mkdir <carpeta>`**: Crea una carpeta nova per protegir o organitzar arxius.
- **`cp <origen> <destí>`**: Copia o duplica un fitxer des d'una còpia de seguretat.
- **`mv <origen> <destí>`**: Mou o canvia el nom d'un arxiu.
- **`rm <fitxer>`**: Esborra definitivament un fitxer perillós o brossa.

### 2. Comandes de diagnòstic i ciberseguretat:
- **`grep <paraula> <fitxer>`**: Cerca paraules clau i alertes dins d'un fitxer gran de registre sense haver de llegir centenars de línies.
- **`ps`** (*Processes*): Com el Gestor de Tasques de Windows o Monitor d'Activitat de Mac; llista els programes en execució a la memòria RAM.
- **`kill <PID>`**: Atura immediatament un procés o virus pel seu número identificador PID.
- **`scan`**: Escaneja la xarxa local per descobrir quins dispositius hi ha connectats.
- **`firewall block <IP>`**: Posa l'adreça IP de l'atacant a la llista negra del tallafocs.
- **`history`**: Mostra l'historial d'ordres recents per rastrejar què va fer el hacker.
- **`ajuda` / `man <comanda>`**: Explica el significat, exemples i l'ús de cada ordre amb vocabulari entenedor.

---

## 🕹️ Les 5 Fases de la Missió

1. **Fase 1: Diagnòstic Inicial a `/home/ciberdefensa`**
   - Comprovar la posició amb `pwd`.
   - Llistar els documents amb `ls`.
   - Llegir l'informe d'urgència amb `cat missio.txt`.
2. **Fase 2: Rastrejar els Registres a `/var/log`**
   - Viatjar a la carpeta de registres: `cd /var/log`.
   - Inspeccionar els fitxers amb `ls`.
   - Llegir `intrusio.log` (o cercar amb `grep ALERTA intrusio.log`) per identificar la IP atacant: `192.168.1.88`.
3. **Fase 3: Neutralitzar el Malware a `/tmp`**
   - Entrar a la carpeta temporal amb `cd /tmp`.
   - Descobrir el fitxer maliciós `virus_miner.sh`.
   - Detectar el procés miner actiu amb `ps` (PID: 4092).
   - Aturar el virus amb `kill 4092` i eliminar l'arxiu amb `rm virus_miner.sh`.
4. **Fase 4: Restaurar les Notes d'Avaluació**
   - Crear una carpeta segura amb `mkdir /servidor_notes/recuperat`.
   - Anar a les còpies de seguretat amb `cd /backups`.
   - Copiar les notes bones amb `cp notes_recuperades.csv /servidor_notes/recuperat/notes_2eso.csv`.
   - Verificar la còpia amb `ls /servidor_notes/recuperat`.
5. **Fase 5: Blindar el Tallafocs i Salvar l'Institut**
   - Escanejar la xarxa amb `scan` per verificar l'amenaça activa a `192.168.1.88`.
   - Bloquejar la IP intrusa amb `firewall block 192.168.1.88`.
   - Desbloqueig del sistema i obtenció del Diploma de Ciberdefensa!

---

## 💻 Interfície i Experiència d'Usuari

- **Terminal Interactiva (Esquerra):** Consola autèntica basada en web, amb autocompleció amb la tecla **Tab** i suport de colors.
- **Quadre de Comandament (Dreta):**
  - **Arbre de carpetes visual interactiu:** S'actualitza en temps real il·luminant en verd la carpeta on et trobes a cada moment (`/home/ciberdefensa`, `/var/log`, `/tmp`, etc.).
  - **Guia de la Missió pas a pas:** Mostra l'objectiu immediat, la comanda suggerida i un bloc explicatiu de «Per què fem aquesta acció?».
  - **Barra de progrés:** De l'1% al 100%.
  - **Guia de comandes:** Taula de referència ràpida sempre visible.

## 🎓 Sistema d'Avaluació i Diploma Oficial (Departament de Tecnologia)

1. **Identificació Inicial (Login):**
   - Demana el **Nom**, **Cognoms** i **Grup** (1A, 1B, 2A, 2B, 3A, 3B...) de l'alumne/a abans de començar.
2. **Qüestionari Tècnic Final:**
   - 20 preguntes tipus test sobre les comandes utilitzades durant la missió (`pwd`, `ls`, `cd`, `cat`, `grep`, `ps`, `kill`, `rm`, `mkdir`, `cp`, `mv`, `scan`, `firewall`, `clear`, rutes absolutes i còpies de seguretat).
   - Feedback pedagògic immediat a cada resposta.
3. **Diploma Oficial de Ciberdefensa:**
   - Resum complet de rendiment: **errors a la consola**, **pistes sol·licitades**, **puntuació del qüestionari** i **qualificació competencial**:
     - **AE** (Assolit Excel·lent, 9.0 - 10.0)
     - **AN** (Assolit Notable, 7.0 - 8.9)
     - **AS** (Assolit Satisfactori, 5.0 - 6.9)
     - **NA** (No Assolit, < 5.0)
   - Botó directe per **Imprimir o Desar en PDF** amb format adaptat a full DIN A4 per lliurar al professorat.

---

## 🚀 Com jugar-hi

És una aplicació web 100% estàtica, sense necessitat d'instal·lar res (compatible amb Chromebooks i qualsevol navegador modern).

### En local:
```bash
# Servidor local ràpid amb Python:
python3 -m http.server 8000 --directory Web
```
Obrir al navegador: **[http://localhost:8000](http://localhost:8000)**

### Desplegament:
Es pot allotjar directament i de franc a **GitHub Pages** apuntant a la carpeta `Web/`.
