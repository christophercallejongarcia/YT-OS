# Poppy-Klone im Praxistest: wie sie aussehen und was sie taugen

Stand: 26.09.2026. Fünf Repos, statisch auditiert (Clones unter `/tmp/poppy-audit/`). Die beiden echten Poppy-Klone liefen lokal (nur 127.0.0.1), die drei übrigen sind nur über ihre README-Bilder bewertet.

## Kurzfazit

Thinkboard (prajwal-tomar) sieht Poppy am ähnlichsten: Dashboard mit Boards, helles Canvas, Quell-Nodes für YouTube, PDF, Bild, Sprachnotiz und Text, ein Chat-Node, der verbundene Quellen als Kontext zählt. Keines der beiden Poppy-Repos hat eine Lizenz. Code übernehmen ist damit rechtlich nicht drin, beide taugen nur als Referenz für Aufbau und UI-Muster. Die einzigen MIT-lizenzierten Kandidaten (Graphlink, Curiso, RabbitMap) sind Chat-Canvas-Tools ohne YouTube-Ingest und damit keine Poppy-Basis.

Empfehlung: kein Klon als Startbasis. Eigenen Build auf React Flow (`@xyflow/react`, MIT) aufsetzen. Thinkboard dient als Vorlage für Datenmodell (boards, nodes, edges, chat_messages) und Node-Palette, coderkai03 als Vorlage für lokalen Ingest (Captions zuerst, Whisper als Fallback) und das Muster "Quelle, Transkript-Node, Chat".

## Wie die Tests liefen

- **coderkai03**: `npm ci --ignore-scripts`, `next dev -H 127.0.0.1 -p 3101`. Ohne Engine rendert die UI, der YouTube-Node zeigt dann "Engine is not configured". Für die Screenshots 04 bis 07 lief ein lokaler Mock der FastAPI-Engine (Python, 127.0.0.1:8765) mit festem Transkript und fester Chat-Antwort. Die echte Engine, launchd- oder Tunnel-Skripte liefen nicht.
- **prajwal-tomar (Thinkboard)**: `npm ci` scheiterte am veralteten Lockfile (picomatch), `npm install --ignore-scripts` ging. Alle Board-Routen hängen hinter Supabase-Auth. Statt eines echten Supabase-Projekts lief ein lokaler Fake (Auth-Endpoint plus PostgREST-Teilmenge, 127.0.0.1:54321) mit Demo-Boards und Demo-Nodes. Alle Keys in `.env.local` waren Platzhalter. Der OpenAI-Chat wurde nicht aufgerufen; die sichtbare Chat-Antwort ist aus der Mock-Datenbank geladen.
- Alle Dev-Server und Mocks sind beendet, `.env.local` gelöscht, Lockfile zurückgesetzt. `lsof` auf 3101, 3102, 54321 und 8765 ist leer.
- Alle Inhalte mit "(Mock)" oder "[Mock]" im Bild sind Testdaten, keine echten Ergebnisse der Tools.

## Bewertung gegen Poppy (1 = weit weg, 5 = wie Poppy)

| Kriterium | coderkai03 | Thinkboard | Graphlink | Curiso | RabbitMap |
|---|---|---|---|---|---|
| Canvas-Gefühl | 3 | 4 | 3 | 3 | 3 |
| Quelltypen (YouTube/PDF/Audio/Web/Bild) | 3 | 4 | 2 | 2 | 1 |
| Chat-Anbindung (Kanten als Kontext) | 4 | 4 | 3 | 3 | 2 |
| Dashboard/Board-Verwaltung | 1 | 4 | 3 | 2 | 2 |
| Code-Qualität/Erweiterbarkeit | 4 | 3 | 3 | 2 | 2 |
| Lizenz-Tauglichkeit | 1 | 1 | 5 | 5 | 5 |
| **Summe (max 30)** | 16 | 20 | 19 | 17 | 15 |

Die Summe täuscht bei Graphlink und Curiso: Sie holen ihre Punkte über die MIT-Lizenz, nicht über Poppy-Nähe. Bei den beiden Poppy-Klonen blockiert die fehlende Lizenz jede Übernahme.

## coderkai03/poppy-clone

Next.js 16 + React Flow im Ordner `web/`, dazu eine FastAPI-Engine in `engine/` (YouTube-Captions, sonst yt-dlp plus Whisper, Generierung über ein lokales OpenAI-kompatibles Modell wie LM Studio). Ein Autor, 12 Commits, keine Lizenz.

### Wie es aussieht

Dunkles, schlichtes Canvas mit Punktraster. Oben mittig eine Leiste: URL-Feld (YouTube, TikTok, Instagram), "Add", "Chat", "File", Papierkorb. Unten links Minimap, unten rechts Zoom. Kein Dashboard: Es gibt genau ein Canvas, gespeichert im localStorage des Browsers.

Eine eingefügte YouTube-URL erzeugt zwei Nodes: eine Medienkarte mit Thumbnail, Titel, Dauer und aufklappbaren Details, daneben einen Transkript-Node ("Native captions", Sprache, Wortzahl), dessen Text editierbar ist und genau so an das Modell geht. Beim Hovern erscheint rechts am Transkript ein Plus, das einen verbundenen Chat-Node anlegt. Der Chat-Node zeigt "1 SOURCE", streamt Markdown und lässt sich an der Ecke vergrößern. Dateien (txt, md, csv, json, html, pdf und weitere Textformate) werden als eigener Node mit Vorschau angelegt. Keine Audio- oder Bild-Uploads, keine Webseiten-URLs.

Bedienung: flüssig, klare Fehlermeldungen direkt im Node, aber sehr reduziert. Kein Board-Wechsel, keine Gruppen, keine Modellauswahl im UI.

Screenshots:

```
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-01-home.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-02-empty-canvas.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-03-youtube-and-chat-node.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-04-youtube-transcript.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-05-hover-add-chat.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-06-chat-with-answer.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/coderkai03-07-file-node.png
```

01 Startseite, 02 leeres Canvas, 03 YouTube-Node ohne Engine (Fehler im Node) plus leerer Chat, 04 YouTube plus Transkript mit Mock-Engine, 05 Hover-Plus zum Chat anlegen, 06 Chat mit gestreamter Mock-Antwort, 07 zusätzlicher Markdown-Datei-Node.

### Einschätzung

Die sauberste Ingest-Idee der fünf Repos (Captions zuerst, Whisper nur als Fallback, alles lokal). Klein genug zum Lesen (rund 2.600 Zeilen im Frontend), mit CLAUDE.md und AGENTS.md. Ohne Lizenz nur Referenz.

## prajwal-tomar/poppy-clone ("Thinkboard")

Next.js 16 + React Flow + Tiptap + shadcn/ui, Supabase (Auth, Postgres, Storage), Vercel AI SDK mit OpenAI GPT-4o, Polar.sh für Abos. Ein Autor, 10 Commits, keine Lizenz. Der Ordner `supabase/migrations` ist leer: Das Datenbankschema steht nur indirekt in `src/types/database.ts`.

### Wie es aussieht

Helle, warme Optik mit orangem Akzent, deutlich näher an Poppy als coderkai03. Landingpage mit Hero ("Visual AI Workspace, For every creator."), Features, Pricing. Login mit Google oder E-Mail.

Dashboard "Your Boards" mit Suchfeld, "New Board" und Kacheln in Pastellfarben pro Board. Free-Plan-Zähler "3 of 3 boards used". Beim ersten Besuch ein vierstufiges Onboarding-Modal ("Drop in your sources").

Board-Ansicht: oben Boardname (umbenennbar), Speicherstatus "Saved", Zähler "3 / 10 AI messages today". Unten mittig eine schwebende Leiste mit sechs Icons: YouTube, PDF, Bild, Sprachnotiz, Text, AI-Chat. Bild und Sprachnotiz tragen ein Schloss und öffnen im Free-Plan ein Upgrade-Modal (15 $ pro Monat). Nodes: YouTube-Karte mit Thumbnail, Titel, Kanal und "Transcript ready"; PDF-Karte mit Seitenzahl und "Content ready"; Sprachnotiz mit Player und Transkript; Text-Node mit Tiptap-Toolbar (H2, fett, kursiv, Listen, Code); AI-Chat-Node mit Quell-Icons und "3 sources" im Kopf. Rechtsklick auf eine Quelle öffnet ein Kontextmenü ("View Transcript", "Open on YouTube", "Delete Node"), das Transkript erscheint in einem Seitenpanel. Neue YouTube-Quellen kommen über ein kleines Popover mit URL-Feld.

Bedienung: wirkt wie ein fertiges SaaS-Produkt. Schwächen im Test: Kanten laufen vom unteren Handle der Quellen und schlagen dabei Schleifen, Webseiten als Quelle fehlen, kein Gruppieren, keine Modellauswahl, Chat fest an OpenAI.

Screenshots:

```
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-01-hero-canvas.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-02-landing.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-03-landing-full.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-04-login.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-05-onboarding-modal.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-06-dashboard.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-07-board.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-08-quellen-sheet.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-09-add-youtube.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/prajwal-tomar-10-upgrade-modal.png
```

01 Hero-Bild aus dem Repo (`public/hero-canvas.png`), 02 und 03 Landingpage, 04 Login, 05 Onboarding-Modal über dem Dashboard, 06 Dashboard, 07 Board mit fünf Nodes und verbundenem Chat, 08 Transkript-Seitenpanel, 09 YouTube-Popover aus der Leiste, 10 Upgrade-Modal beim Bild-Button. 05 bis 10 mit Fake-Supabase und Demo-Daten.

### Einschätzung

Beste Blaupause für Produktstruktur und Datenmodell, am nächsten an Poppy. Viel SaaS-Ballast (Polar, Plan-Limits, Onboarding), den YT-OS nicht braucht. Fehlende Migrationen und das kaputte Lockfile zeigen, dass das Repo nicht auf Wiederverwendung ausgelegt ist. Ohne Lizenz nur Referenz.

## dovvnloading/Graphlink

Python-Backend (FastAPI) plus Vite/React-Frontend, als Desktop-Fenster über pywebview. MIT-Lizenz, aktiv (letzter Commit 19.09.2026), groß (rund 130.000 Zeilen Python).

### Wie es aussieht

Dunkles, dichtes Canvas für Power-User. Obere Leiste mit Library, Save, Undo, Zoom, View, Plugins. Nodes für Chat, Code, Dokument, Thinking, Web Research, Charts, Notizen, Python-Runner und mehr, verzweigt als Baum ("You", drei "Assistant"-Äste). Unten mittig ein globales Eingabefeld "Ask about this graph..." mit Reasoning-Stufe und Modellwahl (Ollama lokal). Minimap mit Node-Zähler. Das zweite Bild zeigt den "Builder", einen Agenten, der Pläne als Checklisten-Node abarbeitet.

Screenshots (aus dem Repo, `assets/screenshots/`):

```
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/graphlink-01-canvas-branching.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/graphlink-02-builder-launcher.png
```

Demo-Video laut README: https://www.youtube.com/watch?v=16v0our6ZoI (nicht angesehen).

### Einschätzung

Gedacht für verzweigtes Denken und Entwickler-Workflows, nicht für Content aus Quellen. Kein YouTube-Ingest, Audio und Dokumente nur als Anhang am Chat. Desktop statt Web. Zu groß und zu fremd als Basis, als Ideengeber für Branching und Agent-Plan-Node brauchbar.

## metaspartan/curiso

Tauri-Desktop-App (Rust plus React/Vite, React Flow 11). MIT-Lizenz, letzter Commit Januar 2025, also seit über anderthalb Jahren still. Das README bewirbt einen Krypto-Token ($CUR).

### Wie es aussieht

Schwarzes Canvas mit Punktraster, oben ein Board-Dropdown mit Umbenennen, Neu, Löschen. Jeder Node ist ein kompletter Chat mit eigenem Modell-Dropdown (z. B. llama3.2, phi4), Bild-Upload und Token-Metriken. Eine gestrichelte Kante reicht den Gesprächsverlauf an den nächsten Chat weiter. Das zweite Bild ist kein Canvas, sondern der Einstellungsdialog (Theme-Farbe, Snap to grid, Zoom-Verhalten, API-Keys, RAG). Das dritte zeigt die Verwaltung eigener Modelle.

Screenshots (aus dem Repo):

```
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/curiso-01-canvas.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/curiso-02-canvas.png
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/curiso-03-custom-models.png
```

Hinweis: `curiso-02-canvas.png` zeigt den Einstellungsdialog, der Dateiname stammt aus der ersten Kopie.

### Einschätzung

Chat-zu-Chat-Canvas mit vielen Providern und lokalem RAG. Keine Quell-Nodes für YouTube, PDF oder Audio. Verwaist und mit Krypto-Beigeschmack. Nur Referenz für Mehrfach-Boards und Provider-Auswahl.

## bayradion/rabbitmap

Obsidian-Plugin, eine einzige `main.ts` mit rund 3.100 Zeilen, eigenes Canvas ohne React Flow. MIT-Lizenz, letzter Commit Februar 2026.

### Wie es aussieht

Helles Obsidian-Canvas mit Vault-Dateibaum links. Kleine Leiste links am Canvas (Card, Chat, Einstellungen). Chat-Nodes mit Provider (OpenAI, OpenRouter), Modellfeld, "Prompt"-Knopf und einem Kontextbereich, in den man Vault-Dateien zieht. Antworten lassen sich in neue Chat-Nodes verzweigen, Pfeile zeigen den Ast.

Screenshot (aus dem Repo):

```
/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/clones/rabbitmap-01-canvas.png
```

### Einschätzung

Interessant, weil es im Obsidian-Vault lebt (Kontext kommt aus Markdown-Dateien). Keine externen Quellen, Kontext über Drag-and-drop statt über Kanten. Als Basis für ein Web-Poppy ungeeignet, als Idee "Board im Vault" eine Notiz wert.

## Schluss

| Repo | Rolle für YT-OS |
|---|---|
| Thinkboard (prajwal-tomar) | Referenz für UI, Dashboard, Node-Palette und Datenmodell. Kein Code übernehmen. |
| coderkai03 | Referenz für lokalen Ingest und das Muster Quelle, Transkript, Chat. Kein Code übernehmen. |
| Graphlink | Ideen für Branching und Agent-Plan-Node. Zu groß als Basis. |
| Curiso | Ideen für Board-Wechsel und Provider-Auswahl. Verwaist. |
| RabbitMap | Idee "Canvas im Obsidian-Vault". Kein Web-Ansatz. |

Keiner der fünf ist eine sinnvolle Startbasis. Der kürzeste Weg bleibt ein eigenes Next.js-Projekt mit `@xyflow/react`, Zustand und lokalem Speicher, das sich optisch an Thinkboard und funktional am coderkai03-Ingest orientiert. Beide lassen sich ansehen und nachbauen, der Code selbst darf ohne Lizenz nicht kopiert werden. Wer Code übernehmen will, muss die Autoren um eine Lizenz bitten.
