# Poppy AI: Produkt-Teardown für einen Klon

Stand: 26.09.2026. Grundlage: Marketing-Seiten (getpoppy.ai, v2.getpoppy.ai), das offizielle Help Center (intercom.help/poppy-ai), die Poppy API Hub-Seite, AppSumo-Listing mit Founder-Updates, fünf YouTube-Walkthroughs von Januar bis September 2026 (Frames selbst ausgewertet) und Reviews. Ein Login war nicht möglich: Board-Links wie `app.getpoppy.ai/boards/rustling-tide-qBnR4` leiten ohne Account auf `/login` um. Alle UI-Beschreibungen stammen deshalb aus Video-Frames und Help-Center-Screenshots. Farbwerte sind aus den Frames gemessen (JPEG, also ±5 %).

Screenshots liegen in `frames/`, nummeriert in Lesereihenfolge. Verweise im Text als `[F07]` = `frames/07-...jpg`.

Kurzformel des Produkts: Unendliches Whiteboard, auf das man Quellen wirft (Links, Dateien, Sprachnotizen). Jede Quelle wird automatisch transkribiert oder analysiert. Quellen werden per gestrichelter lila Linie an einen "Poppy Chat"-Node angeschlossen. Alles, was angeschlossen ist, ist der komplette Kontext dieses Chats (kein RAG). Aus dem Chat entstehen Texte, Bilder, Carousels, Mindmaps, Landingpages und Präsentationen, die wieder als Nodes auf dem Board landen.

---

## 1. Globales Look & Feel

- **Stil:** Hell, freundlich, weiß/hellgrau mit einer lila Primärfarbe. Maskottchen ist ein rosa Oktopus mit großen Augen ("Poppy"), taucht in Empty States, Logo, Promo-Bannern und im Lade-Screen auf.
- **Primärfarbe:** Lila-Verlauf von links `#5541E0` bis rechts `#7663F1` (New-Board-Button, Chat-Header, Share-Button, Send-Button).
- **Canvas-Hintergrund:** `#EDF2F5` mit feinem, grauem Punktraster (Dot Grid, ca. 20 px Abstand, sehr dezent).
- **Schrift:** Serifenlose Sans (Inter-artig), UI-Text 12 bis 14 px, Headlines fett.
- **Ecken:** Karten und Nodes mit ca. 8 bis 12 px Radius, dünne graue Rahmen, weicher Schatten.
- **Knopf-Stil:** Primär gefüllt lila mit weißem Text; sekundär weiß mit lila Rahmen ("Upgrades"); Chips mit Emoji ("😎 Hiring", "🤑 Affiliate", "👷 APIs").
- **Support:** Intercom-Bubble unten rechts (lila Kreis), auf jeder Seite.
- **Desktop:** Im September-2026-Video läuft Poppy als eigenes macOS-Fenster mit Titel "Poppy AI" und Menüleiste (File, Edit, View, History, Window) [F16][F17]. Ob das ein offizieller Wrapper ist, ist nicht dokumentiert. Eine native Mobile-App gibt es nicht.

Quellen: [F01] [F03] [F16], getpoppy.ai, CQH2hlcFl5s (YouTube, 11.09.2026).

---

## 2. Dashboard / Board-Liste

Screens: [F01] All Boards mit Ordnern, [F02] Templates.

### Layout
- **Topbar (volle Breite, weiß, ca. 56 px):** links Maskottchen-Logo, daneben Chips "😎 Hiring", "🤑 Affiliate", "👷 APIs". Rechts: Credit-Zähler (lila Blumen-Icon + Zahl, z. B. "10.3k"; Hover zeigt Verbrauch "0/2000"), "⚡ Upgrades" (weiß, lila Rahmen), "🎁 Refer & Earn $40" (lila gefüllt, leichter Glow), Glocke, Avatar.
- **Linke Sidebar (ca. 220 px, weiß):**
  - Großer Button "＋ New Board" mit Tastenkürzel-Badge "N" (lila Verlauf, volle Breite).
  - Navigation: "All Boards" (aktiv: Hintergrund `#EEECFA`), "Starred", "Templates", "Shared with me". Seit Juni 2026 zusätzlich "Brands" (siehe 7.6).
  - "Folders" mit "＋" rechts, darunter Ordnerliste mit Ordner-Icon (z. B. "TFP", "THOMAS", "ALI"). Alternativ Link "＋ Create a new Folder".
  - Unten: "♡ Give us Feedback", "sk Join Skool Community", "Deleted Boards" (Papierkorb, Boards wiederherstellbar).
- **Hauptbereich:**
  - Einklappbares Banner "Learn How to Use Poppy AI" (Hintergrund `#F6F3FE`, Chevron rechts) mit 4 Karten: "Poppy Video Tutorial", "Create Viral Youtube Scripts", "Create Viral Short Form Scripts", "Create Viral Ads". Karten sind große Thumbnails (YouTube-Logo + "Scripts" etc.) mit Label darunter.
  - Überschrift "All boards", Unterzeile "Manage your boards here".
  - **Tabelle** (keine Kacheln!): Spalten "Name", "Last Opened" ("17 minutes ago"), "Created By" (Avatar + "Me" bzw. Name), "Created". Pro Zeile rechts Stern (Favorit) und ⋮-Menü (u. a. "Move to Folder", "Duplicate Board"). Geteilte Boards tragen eine lila Pille "Public".
  - Promo-Banner unter der Liste: Maskottchen + "Get Pre-Sold Leads Without Spending a Dollar on Ads" + Button "Book Your Strategy Call" (Upsell auf Done-for-you-Service).
- **Board-Namen:** Neue Boards bekommen Zufallsnamen aus Adjektiv + Tier ("Yellow Earwig", "Apricot Parrot", "Plum Kiwi"). URL-Slug: `app.getpoppy.ai/boards/fragrant-wind-2i976` (zwei Wörter + 5 Zeichen).

### Suche
- Cmd/Ctrl + K öffnet eine Board-Suche (Command Palette) und dient auch zum Springen zwischen Boards.

### Templates [F02]
- Gleiches Tabellenlayout: Name + graue Pille "Template", "Last Opened" ("Updated 8 months ago"), "Created By" (Community-Mitglieder und Poppy-Team), "Created".
- Beispiele: "PROMPT WRITER - Copy", "YouTube Brainstorm System (Template)", "Social Media Distribution OS", "Ultimate YouTube Title & Thumbnail Frameworks", "The Viral YT Generator", "Bryan Ng YouTube Scriptwriting Template (50M+ Long Form Views)".
- Suche nach Name und Kategorie. Öffentliche Templates werden vom Poppy-Team geprüft und freigegeben.
- Nutzen eines Templates = Kopie des Boards in den eigenen Account (Empfänger hat View-only auf das Original).
- Erstellen: Board → "Share" → Option "Template" → Formular → "Create Template"; später "Update Template" im selben Menü.

### Team-Features
- Profil-Menü → "Create a team": Logo, Name, dann Credits vom persönlichen Konto in einen Team-Pool verschieben, dann Mitglieder per E-Mail einladen mit Rolle "Admin" oder "Member".
- Umschalten zwischen "Personal" und Team im Profil-Menü (Häkchen am aktiven Konto). Team-Boards sind für alle Mitglieder sichtbar, persönliche Boards nicht.
- Settings → "Team Settings" mit Tab "Credits".

Quellen: Frames 0M9Q4QFadz8 (07.06.2026), 6KLsURgk-qk (08.06.2026); Help Center: [Board Organization](https://intercom.help/poppy-ai/en/articles/11529386-board-organization), [Shortcuts](https://intercom.help/poppy-ai/en/articles/10528305-poppy-ai-shortcuts), [Templates](https://intercom.help/poppy-ai/en/articles/13753466-creating-and-sharing-templates-in-poppy), [Team Accounts](https://intercom.help/poppy-ai/en/articles/15950377-team-accounts), [Copy & Duplicate](https://intercom.help/poppy-ai/en/articles/11506498-copy-duplicate-boards), [Deleted Boards](https://intercom.help/poppy-ai/en/articles/11723504-deleted-archived-boards).

---

## 3. Board / Canvas

Screens: [F03] leeres Board, [F17] Mehrfachauswahl + rechte Leiste.

### 3.1 Topbar im Board
Links: 9-Punkte-Grid-Icon (zurück zur Board-Liste), Maskottchen, **Board-Name in Lila** (klickbar zum Umbenennen), Chips Hiring/Affiliate/APIs. Rechts: Credits, "Upgrades", **"👥 Share"** (lila gefüllt), "Refer & Earn", Dokument-Icon, **Uhr-Icon (Versionsverlauf)**, Glocke, Avatar.

### 3.2 Engine-Gefühl
- Unendlicher Canvas, Pan per Drag auf leerer Fläche (Cursor wird zur Hand), Zoom per Cmd/Ctrl + Scroll, "=" / "-" Tasten, "1" = Fit All to View.
- **Keine Minimap** in allen Frames.
- **Unten rechts:** kleine horizontale Leiste: Undo, Redo, ＋, −, Fit-to-Screen, ⌘ (Shortcut-Übersicht). Daneben Intercom-Bubble.
- Nodes frei positionierbar, Größe über Eck-Handle unten rechts änderbar (Gruppen und Text-Nodes).
- Undo/Redo: Cmd+Z / Cmd+Shift+Z.
- Mehrere Browser-Tabs auf demselben Board möglich, Autosave.
- Versionsverlauf (Uhr-Icon): jede Hinzufügung/Löschung erzeugt eine Version mit Nummer, Aktion ("Added text", "Removed audio"), Zeit, Autor, Elementanzahl. Vorschau und Restore des ganzen Boards. Chat-Verläufe werden nicht wiederhergestellt.
- Gefühl laut Reviews: flüssig, aber bei großen Boards teils langsam/buggy (v. a. außerhalb von Chrome).

### 3.3 Linke Werkzeugleiste (vertikal, schwebend)
Weiße, schmale Leiste (ca. 44 px breit, abgerundet, Schatten) am linken Rand, vertikal zentriert. Hover zeigt ein Tooltip-Popover mit Name, Shortcut-Badge und Mini-Video "Watch guide →" [F03]. Reihenfolge Stand Juni bis September 2026:

| # | Icon | Funktion | Shortcut |
|---|------|----------|----------|
| 1 | Sprechblase mit Funkeln (lila) | AI Chat | C |
| 2 | Mini-Raster aus TikTok/YouTube/IG-Logos + "＋" | Social Media Content (Link einfügen) | S |
| 3 | Mikroskop, Badge "NEW" | Discover Content (Recherche-Panel) | - |
| 4 | Meta-∞ mit "ADS"-Badge | Import Ads (Meta Ad Library) | - |
| 5 | Dunkles Sternsymbol | in den Frames nicht beschriftet (vermutlich Integrationen/Connections) | - |
| 6 | Pfeil nach oben | Upload Files + Media (Gerät, Dropbox, Google Drive) | U |
| 7 | Mikrofon (wird beim Aufnehmen roter Punkt) | Record Voice | R |
| 8 | T | Text Box | T |
| 9 | A | Überschrift / freier Text mit Formatierung | - |
| 10 | Globus | Website | W |
| 11 | Knoten-Diagramm | Mindmap | M |
| 12 | Ordner | Group | G |

Ältere Version (Februar 2026) hatte zusätzlich Bild- und Dokument-Icons [F18].

### 3.4 Rechte Werkzeugleiste (neu, ab ca. August 2026)
Schmale vertikale Leiste am rechten Rand mit vier Icons [F17]: Mikroskop (Discover), Box mit X, Tag (vermutlich Brands), Klemmbrett. Eine davon ist der **Vault** (Taste V, siehe 7.7). Beschriftungen sind in den Frames nicht sichtbar.

### 3.5 Leerer Board-Zustand [F03]
Zentriert auf dem Canvas:
1. Zwei Template-Karten ("TEMPLATE / Create Viral Youtube Scripts", "TEMPLATE / Create Viral Short Form Scripts"), rosa Verlaufs-Thumbnails.
2. Trenner "OR".
3. "Drag and drop files here or click a button to start creating content".
4. Vier weiße Buttons: "AI Chat", "Add Text", "Record Voice", "Upload".
5. "OR" + "Use Ctrl/Cmd + V to paste social media content and websites" + Reihe grauer Plattform-Icons (YouTube, Instagram, TikTok, LinkedIn, Facebook, Web).

### 3.6 Wie Inhalte aufs Board kommen
- **Paste (Hauptweg):** Link kopieren, auf Canvas Cmd+V. Poppy erkennt den Typ, erzeugt den passenden Node an Cursor-Position und startet die Transkription. Profil-Links (Kanal/Account) öffnen stattdessen das Discover-Panel rechts.
- **Drag & Drop** von Dateien (PDF, CSV, DOC, TXT, MP3, MP4, MOV, Bilder) direkt auf den Canvas oder in eine Gruppe. Limit 100 MB pro Datei.
- **Toolbar-Buttons** (siehe 3.3).
- **Upload-Dialog** [F13]: Modal "Drop files here" mit Optionen "From device", "Dropbox", "Google Drive", Button "Cancel" (Uploadcare-Widget).
- **Discover Content / Import Ads:** Auswahl im Panel/Modal, dann "Add N Selected to Board" bzw. "Import N".
- **Vault:** Inhalte aus dem Vault per Drag aufs Board.
- **Aus dem Chat:** "Edit in text block" erzeugt einen Text-Node rechts neben dem Chat.

### 3.7 Kanten (Edges)
- Jeder Node hat rechts einen kleinen runden **Ausgangs-Handle** (Ring, ca. 10 px; grau bei Quellen, lila bei aktiven Verbindungen).
- Der Chat-Node hat links einen **Eingangs-Handle** (lila Ring). Alle Kanten laufen in diesen einen Punkt zusammen [F21].
- Kante = **gestrichelte Bezier-Linie in Lila** (bei Websites teils hellblau/cyan, dunkelgrau bei Gruppen). Beim Hover erscheint mittig ein **roter Kreis mit weißem ✕** zum Trennen [F06].
- Verbinden per Drag vom Handle der Quelle auf den Chat. Semantik: alles Verbundene ist Wissen dieses Chats.

### 3.8 Gruppen [F14][F15][F16]
- Erzeugen: G drücken oder Ordner-Icon; oder Shift + Drag (Auswahlrahmen) über Items, dann "Group" (⌘G) in der Auswahl-Toolbar [F17].
- Optik: Rahmen mit **dunkelnavy Header-Leiste** (`#202239`), weißes Ordner-Icon + Titel in Weiß (Doppelklick = umbenennen). Körper transparent/hell mit dünnem dunklem Rand, Resize-Handle unten rechts, Ausgangs-Handle rechts mittig.
- Items per Drag hinein/heraus. Gruppe als Ganzes an einen Chat anschließen.
- **Gruppen-Toolbar** (schwebt über der Gruppe): "↙ Minimize" | Ordner-Icon (Icon wählen) | schwarzer Punkt (Farbe) | "⛓ Ungroup".
- **Minimiert** wird eine Gruppe zu einem abgerundeten Quadrat (ca. 64 px, dunkelnavy `#1D2238`) mit weißem Ordner-Glyph, Titel darunter, Handle rechts [F15]. Neuere Version: frei wählbare Farbe (blau, cyan) und Icon (Person, Tag, Lupe), Unterzeile "14 items", Tooltip "Double-click to view items" [F16].
- Gruppen per Cmd+C kopierbar, auch auf andere Boards. "Save to Vault" im Gruppen-Menü.

### 3.9 Mehrfachauswahl [F17]
Shift + Drag erzeugt Auswahlrahmen. Schwebende Toolbar: "⧉ Copy ⌘C" | "📁 Group ⌘G" | "✎ Brand ▾" (Inhalte einer Brand zuordnen) | "▦ Auto Layout" (ordnet überlappende Items im Raster).

### 3.10 Notizen an jedem Node
Unter jedem Quell-Node sitzt ein Feld **"Add notes for AI to use..."** mit ⓘ-Icon [F07][F09]. Der Text wird dem Chat als Kontext zur Quelle mitgegeben (z. B. "The angle we should use to sell Perplexity").

### 3.11 Freie Überschriften [F18]
Tool "A" setzt große Canvas-Beschriftungen (z. B. "🎬 Example 1 ↓", "💡 Hook Idea ↓"). Formatierungs-Toolbar: Schriftgröße (36 mit ▲▼), B, I, Farbe (A mit Unterstrich), linksbündig/zentriert/rechtsbündig. Wird in Templates als Anleitung für Nutzer genutzt.

Quellen: Frames aller Videos; Help Center: [Shortcuts](https://intercom.help/poppy-ai/en/articles/10528305-poppy-ai-shortcuts), [Board Organization](https://intercom.help/poppy-ai/en/articles/11529386-board-organization), [Multi-selecting](https://intercom.help/poppy-ai/en/articles/13363697-multi-selecting), [Version Control](https://intercom.help/poppy-ai/en/articles/11558621-version-control-recover-deleted-content), [Content Integration](https://intercom.help/poppy-ai/en/articles/11529424-content-integration).

---

## 4. Node-Typen (Quellen)

Allgemeines Node-Muster: **farbige Header-Leiste** (Plattformfarbe hell, Icon + gekürzter Titel, rechts kleines Raster-Icon zum Öffnen/Details), darunter Vorschau (Thumbnail/Screenshot/Dateiname), darunter Metadaten und das Notizfeld "Add notes for AI to use...". Ausgangs-Handle rechts. Beim Hover schwebt über dem Node eine Mini-Toolbar [F07].

| Node | Header-Farbe | Inhalt / Verhalten |
|------|--------------|--------------------|
| **YouTube-Video** | Rosa `#F3ADB7` bis `#FFD4DB`, rotes YT-Icon, Titel rot | 16:9-Thumbnail mit Play-Button (spielt inline). Darunter "Views: 495K \| Outlier: 119.7×" + ⓘ. Hover-Toolbar: Einklappen, "↗ Open", "Outliers" (öffnet Kanal-Outliers im Discover-Panel) [F06][F07]. Nur Transkript, **keine visuelle Analyse**. |
| **YouTube-Kanal / Profil** | Rosa, Label "YouTube Channel" | Banner, Avatar, Name, Abonnenten, "Last updated..." + Refresh. Tabs "Latest (7)", "Popular (0)", "Outliers (7)" mit Titel- und View-Liste. Checkbox "Use this to model titles from this creator". Videos werden **nicht** transkribiert, dafür einzelne Videos aufs Board ziehen [F11]. |
| **Instagram Reel / Post / Carousel** | Rosa/Pink, IG-Icon | Hochformat-Thumbnail, Views/Likes/Kommentare. Transkript + visuelle Analyse (Hook, On-Screen-Text, Stil, Audio, Personen). |
| **TikTok Video / Carousel** | wie IG | Transkript + visuelle Analyse. Profil: Follower, Videoanzahl, Outlier nach Multiplikator. |
| **LinkedIn Post** (Text, Bild, Video) | LinkedIn-Blau | Text, Likes/Kommentare, Analyse bei Bild/Video. Profil-Import möglich. |
| **Facebook/Meta Ad** | Hellblau, FB-Icon | Hochformat-Video/Carousel, Ad-Text. Transkript + visuelle Analyse. Import über "Import Ads" [F12]. |
| **X/Twitter Video, Loom, Zoom** | plattformtypisch | Loom/Zoom nur Transkript. |
| **Website** | Cyan `#73D3E1` bis `#C9F1F9`, Globus-Icon, Titel cyan | Screenshot-Vorschau der Seite, Titel (z. B. "Perplexity Pro"). Liest **nur die exakte URL**, keine Unterseiten [F08]. |
| **PDF / DOC / CSV / TXT** | Lachs `#F6D6C7`, oranges Dokument-Icon | Header zeigt einen **von der KI generierten Titel** (z. B. "Script Writing Guide", "Crafting Engaging Video Hooks"), darunter Zeile mit Datei-Icon + Dateiname [F08]. Während der Extraktion: "Extracting Text". |
| **Bild** | neutral | Bild-Vorschau; wird visuell analysiert. |
| **Audio / Voice Memo** | Magenta `#DA4DF4` bis `#B764BE`, Mikro-Icon | Titel wird automatisch vergeben ("Voiceover Transcription for..."). Player mit Play, Fortschrittsbalken, Dauer "00:20", Geschwindigkeit "1x". Darunter Transkript-Auszug. Hover-Toolbar: "⧉ Copy Transcript", Download [F09]. |
| **Video-Datei (MP4/MOV)** | neutral | Transkript + visuelle Analyse. |
| **Google Drive / Dropbox** | wie Dateityp | Über Upload-Dialog (U). |
| **Notion** | - | Keine Nodes, sondern Integration im Chat (siehe 7.9). |

**Transkripte:** Werden automatisch beim Hinzufügen erzeugt, laufen im Hintergrund, der Node zeigt währenddessen einen Ladezustand. Sichtbar über "Copy Transcript" (Audio) bzw. das Detail-Icon im Header. Der Nutzer liest das Transkript selten direkt, es geht in den Chat-Kontext.

**Limits:** 100 MB pro Datei; Website nur Einzelseite; YouTube, Loom, Zoom ohne visuelle Analyse; Profile ohne Bio und ohne Kommentartexte; gelöschte Originalposts sind danach nicht mehr auswertbar; Login-geschützte Seiten nur via Screenshot/Download.

Quellen: [F06]-[F13]; Help Center: [Content Integration](https://intercom.help/poppy-ai/en/articles/11529424-content-integration), [Profiles in Poppy](https://intercom.help/poppy-ai/en/articles/13754218-youtube-instagram-profiles-in-poppy), [Voice Memos](https://intercom.help/poppy-ai/en/articles/11529289-voice-memos-audio-content-talk-like-a-human-get-human-results); [Poppy API Hub](https://poppy-api-hub.vercel.app/) ("What Poppy can see and hear").

---

## 5. Recherche-Features

### 5.1 Discover Content (Beta) [F10][F11]
Rechtes Seitenpanel (ca. 440 px, weiß, volle Höhe unter der Topbar). Kopfzeile grau: "This is a beta feature" links, "Add feedback" rechts (lila Link). Schließen-✕ links außerhalb des Panels.
- **Suchmodus:** Plattform-Dropdown (z. B. "▶ YouTube ▾"), Suchfeld ("how to storytelling"), lila Pfeil-Button. Tabs "Creators" | "Posts". Segment "Relevant" | "Outliers" + Filter-Icon. Button "⊕ Quick Add Top 10 Outliers".
- **Profilmodus** (nach Paste eines Kanal-Links oder Klick auf Creator): "‹ Discover Content", Creator-Karte (Avatar, Name, @handle, "76.5K subscribers · 235 videos", Stern/Schloss-Icons), Tabs "Latest" | "Outliers", "Posts 50 ▾", "Last refreshed 1 minute ago", "↻ Refresh". Buttons "⊕ Quick Add Channel to Board" und "Quick Add ▾".
- **Ergebnisraster:** 2 Spalten, Thumbnail-Karten. Oben links **roter Outlier-Badge** mit Rakete ("🚀 189.3x", bei unterdurchschnittlich "↘ 0.3x"). Unten links Augen-Icon + Views, unten rechts Alter ("3 years ago"). Titel unter dem Bild. Oben rechts Checkbox.
- **Auswahl:** ausgewählte Karte bekommt Overlay "✕ Deselect or Drag". Oben erscheint sticky Button "⊕ Add 3 Selected to Board" (lila) + "Deselect all". Karten auch direkt aufs Board ziehbar.
- Ergebnis auf dem Board: automatisch eine **Gruppe** mit den gewählten Videos, Name wird abgefragt (z. B. "Master X Series").
- Outlier-Definition: Views im Verhältnis zur Abonnentenzahl/Kanalschnitt, als Multiplikator.

### 5.2 Import Ads [F12]
Großes Modal über dem abgedunkelten Board. "Import Ads" / "Search and import ads to your workspace". Suchfeld "Search ads by keyword, brand, or description...", Sortier-Dropdown ("Relevant", "Newest First", "Oldest First", "Longest Running"), "Filters", lila "Search". Empty State: Maskottchen + "Search Our Ads Library / Enter keywords to find and import ads". Ergebnisse als Masonry: Badges "● Live" (grün), "2 Cards" (lila), "▷ Video", Markenname, Ad-Text-Auszug, Datum, Plattform-Icons (IG, FB), Checkbox. Status "80 ads loaded • Scroll for more". Nach Import: grüner Toast "✓ Importing 12 ads..." und eine neue Gruppe "Facebook Ads 1" im Raster.

### 5.3 Websuche
"Tools ▾" im Chat enthält eine per Toggle aktivierbare Websuche (Perplexity-basiert). Kostet Credits wie normaler Chat.

Quellen: [F10]-[F12]; [Profiles in Poppy](https://intercom.help/poppy-ai/en/articles/13754218-youtube-instagram-profiles-in-poppy); [Perplexity in Poppy](https://intercom.help/poppy-ai/en/articles/13752904-perplexity-in-poppy); AppSumo Founder-Update 04.08.2026 ("Discover Content just got better").

---

## 6. Der AI-Chat-Node ("Poppy Chat")

Screens: [F04] leer, [F05] Modelle, [F19]-[F25].

### 6.1 Aufbau
- **Größe:** groß, ca. 700 × 560 px auf 100 % Zoom (ein Chat nimmt einen Großteil des Viewports ein).
- **Header:** lila Verlauf (`#5E48E8` → `#7663F1`), weißes Chat-Icon + "Poppy Chat". Rechts dezent "✥ Move" (Drag-Griff; der Körper selbst ist scroll-/markierbar und zieht den Node nicht).
- **Schwebende Toolbar über dem Chat** (nur bei Auswahl): "⛶ Fullscreen F" | "🔍 Zoom Z" | "⚡ Connections" (Badge "New") | "🔒 Chatbot" | "🔒 API" (Schloss = Plan-Gate).
- **Linke Sidebar im Chat:** eingeklappt nur zwei Icons (Sidebar-Toggle, "＋ Neue Konversation"). Ausgeklappt: "Close Sidebar", "New Conversation" (lila), Liste früherer Konversationen, unten "⚙ Settings". Ein Chat-Node hält also **mehrere Konversationen** mit denselben Quellen.
- **Eingangs-Handle** links außen, mittig (lila Ring).
- **Nachrichtenbereich:** weiß. User-Nachricht in hellgrauer Box mit Avatar links, @-Mentions als Chips. KI-Antwort ohne Box, voll gerendertes Markdown (H2/H3, fette Labels, Listen, Tabellen). Während der Generierung Text "Thinking" in Grau, dann Streaming.
- **Fußzeile jeder KI-Antwort:** Modellname + Zeit in Grau ("Claude 5 Sonnet 12m ago"), rechts Icons: ✎ (bearbeiten / "Edit in text block"), Audio/Vorlesen, 🏷 (zu Brand hinzufügen), ⧉ Copy [F23]. Copy übernimmt Formatierung; Hover auf Copy zeigt "Copy as plain text".
- **Interaktive Antwort-Optionen:** Antworten können klickbare Listeneinträge enthalten (lila hinterlegt, "→"), Hover zeigt "Create Script →". Klick schreibt einen fertigen Folge-Prompt ins Eingabefeld [F22].
- **Textauswahl** in Antworten möglich (für gezieltes Nachfragen/Bearbeiten).

### 6.2 Eingabebereich
- **Quick-Action-Chips** über dem Feld (weiß, grauer Rand): "Create Image", "Mindmap", "Landing Page", "Presentation", "Carousel". Gespeicherte eigene Prompts erscheinen als weitere Chips (z. B. "Ghostwriter Brand Guide v2", "Ghostwriter Builder") [F16].
- **Textfeld:** Platzhalter "Ask anything, / for prompts, @ for sources" (Juni 2026 noch "/ for commands"). Mehrzeilig, wächst mit. Fokus = lila Rahmen.
- **@-Mentions** [F19][F20]: "@" öffnet ein Popover über dem Feld mit Kopfzeile "▼▲ to navigate ↵ to select esc to close" und listet **nur die an diesen Chat angeschlossenen Quellen**: Gruppen (schwarzes Ordner-Icon), PDFs (oranges Doc-Icon), Websites (cyan Globus + Seitenbeschreibung grau). Eingefügt werden farbige Inline-Chips: Gruppe grau mit Ordner, PDF orange-gelb, Website cyan.
- **"/"** öffnet die Prompt-Bibliothek (gespeicherte Prompts, Befehle wie Bild/Mindmap).
- **Untere Leiste:** "＋" (Datei/Bild anhängen) | "☰ Tools ▾" (Websuche, Connections) | "✎ No Brand ▾" (Brand-Auswahl, lila Text) | rechts Modell-Dropdown mit Anbieter-Logo ("✳ Claude 5 High ▾") | Mikrofon (Voice-Prompt, nur Englisch) | runder lila Send-Button mit Pfeil nach oben (während Generierung: Stopp-Quadrat).

### 6.3 Modellauswahl [F05]
Dropdown öffnet nach oben. Oberer Block: 4 empfohlene Modelle mit Beschreibung, z. B. (Juli 2026):
- "Claude 5 Sonnet ✓ / Best model for ideation and scripting"
- "GPT-5.4 / Advanced reasoning and problem-solving"
- "GPT-5.5 New / Advanced reasoning and problem-solving"
- "Nanobanana 2 New / Primary image generation model"

Darunter: "Thinking" mit Wert rechts ("High", sonst "Instant") und Submenü, "More Models ›", "Settings". "More Models" öffnet rechts eine zweite Liste (Anbieter-Logo + Name + farbiges Label): Claude Opus 4.8, Gemini 2.5 Pro, GPT-4o, GPT-5.4 Mini, Grok 3; Abschnitt "IMAGE MODELS": GPT Image 2 ("New"), NanoBanana ("Cheap", grün), NanoBanana Pro ("Best-Image", gelb). Fußzeile "ⓘ What model should I use?".

Modell-Liste laut Help Center (26.07.2026) mit Token-Limit: Claude 5 Sonnet (200k), Claude Opus 4.8 (1M), Claude Opus 5 (1M), GPT-5.5 (400k), GPT-5.6 Terra (1M), GPT-4o (128k), Gemini 2.5 Pro (1M), Grok 3 (~128k), GPT-5.4 Mini (~400k, "Low" Credit-Verbrauch). Bild: GPT Image 2, NanoBanana 2, NanoBanana Pro, Seedream 4.5. Thinking-Stufen Low/Medium/High (im Sept.-Video "Opus 5 Low", Bildmodell "NanoBanana Pro Medium"). Die Liste rotiert schnell; Reviews kritisieren, dass Frontier-Modelle verzögert kommen.

### 6.4 Kontext-Logik (wichtig für den Klon)
- **Kein RAG, kein persistentes Gedächtnis** (seit 16.12.2025 dokumentiert). Bei jeder Nachricht geht der **komplette Inhalt aller verbundenen Quellen + der gesamte Verlauf dieser Konversation** ans Modell.
- Folge: Credits skalieren mit Kontextgröße; lange PDFs kosten bei jeder Folgefrage erneut (häufigste Beschwerde). 5-Minuten-Cache senkt Folgekosten.
- Token-Limit überschritten = Fehler "overload limit". Empfehlung: größeres Modell, weniger Quellen, Zusammenfassung in Text-Node auslagern.
- Leitbild von Poppy: "Train the board, use the chats." Gute Ergebnisse werden in Text-Nodes kopiert, die dann an neue Chats angeschlossen werden.
- Notizen an Nodes ("Add notes for AI to use...") und die gewählte Brand werden mitgeschickt.

### 6.5 Ausgabe-Aktionen und Output-Nodes
- **Edit in text block:** erzeugt einen **Text-Node** rechts neben dem Chat, verbunden mit ihm [F24]. Text-Node: blauer Header `#3E71F1` mit "T Text", Rich-Text-Editor mit Platzhalter "Enter text or type '/' for commands", Scrollbar, Fußfeld "Add notes for AI to use...". Toolbar: "⛶ Fullscreen F", Einklappen, "⧉ Copy Text". Text-Nodes sind selbst wieder Quellen.
- **Create Image** [F25]: Eingabe wechselt in Bildmodus. Chip "🖼 Create Image ✕" in der Leiste, Zeile "Select Images ›" (verbundene Referenzbilder), gestricheltes lila "＋"-Feld für Referenzbild-Upload, Modell springt auf Bildmodell ("NanoBanana Pro Medium"). Bild erscheint mit Poppy-Ladeanimation. Seitenverhältnis orientiert sich an der Referenz.
- **Carousel** [F26]: 2 bis 10 Slides in einem Durchgang. Eigener Node: Titel mit Ebenen-Icon + ⋮, große Slide-Vorschau mit ‹ › Pfeilen, darunter Thumbnail-Leiste (aktive Slide lila umrandet). Toolbar "✎ Edit", "⬇ Download All", "⇪ Share". Einzelne Slides per KI ändern, neu generieren, per Drag umsortieren, Versionen bleiben erhalten.
- **Mindmap** [F27]: Node, der im Vollbild-Editor öffnet. Zentrale Wurzel als weiße Karte, Äste als farbige Bezier-Kurven (rot, gelb, grün), Kinder als abgerundete, farbig umrandete Pillen. Tab = Kind ("Go Right Tab"), Enter = Geschwister ("Go Down Enter"), −/＋, Fit, Download. KI-generiert über Chip "Mindmap" oder manuell über M.
- **Landing Page:** KI erzeugt eine komplette HTML-Seite (responsive). Ansicht mit "Preview" und "AI Edit"-Seitenchat (Abschnitt wählen, Änderung beschreiben, "Clear Chat" in Rot). Veröffentlichen als Poppy-Link mit Badge "Created with Poppy" / "Built with Poppy", als HTML-Download oder auf Custom Domain (Creator+). VSL-Variante mit YouTube-Embed. Keine Formulare/Payments [F29].
- **Presentation:** HTML-Slideshow mit Highlight-Boxen, Tabellen, Metrics-Grids, Verlaufshintergründen. Pfeiltasten/Space, Zähler "3 / 15", "AI Edit", Direkt-Editing von Texten, Live-Link oder HTML-Download.
- **Copy** (mit/ohne Formatierung). **Kein Publish/Scheduler** zu Social-Plattformen.

Quellen: [F04], [F05], [F19]-[F27], [F29]; Help Center: [AI Models Guide](https://intercom.help/poppy-ai/en/articles/11465596-ai-models-guide), [How Poppy Handles Context](https://intercom.help/poppy-ai/en/articles/13171184-how-poppy-handles-context), [How Poppy's Memory Actually Works](https://intercom.help/poppy-ai/en/articles/11158087-how-poppy-s-memory-actually-works), [Overload Limits](https://intercom.help/poppy-ai/en/articles/11465857-troubleshooting-overload-limits), [Image Generation](https://intercom.help/poppy-ai/en/articles/12111710-image-generation-in-poppy), [Carousels](https://intercom.help/poppy-ai/en/articles/15060926-carousels-create-multiple-slides-in-one-shot), [Mind Maps](https://intercom.help/poppy-ai/en/articles/11543036-mind-maps-visual-organization-that-actually-works), [Landing Pages](https://intercom.help/poppy-ai/en/articles/12515081-landing-pages-how-to-create-and-publish), [Presentations](https://intercom.help/poppy-ai/en/articles/12631876-presentations-create-professional-slideshows), [Copy AI Responses](https://intercom.help/poppy-ai/en/articles/11816444-copy-ai-responses-keep-or-remove-formatting), [Voice Memos](https://intercom.help/poppy-ai/en/articles/11529289-voice-memos-audio-content-talk-like-a-human-get-human-results).

---

## 7. Weitere Funktionen

### 7.1 Typischer Flow (so bauen Nutzer Boards)
Aus allen Videos identisch, der "Poppy-Flow":
1. New Board (N) → Chat anlegen (C).
2. Gruppen anlegen (G) nach Rolle, z. B. "My Business", "My Voice and My Content", "The Vault" (Frameworks), "Inspiration Channels", "Video Idea".
3. Gruppen füllen: Kanal-Link pasten → Outliers wählen → "Add Selected to Board"; PDFs droppen; Voice Memo aufnehmen (R) mit eigener Idee.
4. Gruppen minimieren, damit das Board aufgeräumt bleibt.
5. Alle Gruppen per Kante an den Chat hängen.
6. Prompt mit @-Mentions ("...same structure as @Master X Series using the tone from @Script Writing Guide..."), Modell wählen, senden.
7. Chat auf Fullscreen (F) zum Lesen, "Edit in text block" für das finale Skript.
8. Neuer Chat für Folge-Assets (Shorts, Carousel, Ads), Text-Node des Skripts als Quelle anhängen.

### 7.2 Voice
- **Voice Memo (R):** Aufnahme erzeugt einen Audio-Node auf dem Board, Transkript automatisch, beliebige Sprachen. Während der Aufnahme: roter Punkt in der Toolbar, schwarze Waveform-Pille daneben.
- **Voice Prompt:** Mikrofon im Chat-Eingabefeld, diktiert direkt als Prompt (nur Englisch), erzeugt keine Datei.

### 7.3 Prompt-Bibliothek
"/" im Chat öffnet gespeicherte Prompts und Befehle; eigene Prompts erscheinen auch als Chips über dem Eingabefeld. Viele Templates liefern Prompts als Text-Nodes mit ("STEP 1: CHECK YOUR DATA / PROMPT: ...").

### 7.4 Kollaboration & Teilen
- "Share" → Toggle "Make this board public" → Link kopieren. Nur Poppy-Accounts können öffnen; geteilte Boards erscheinen unter "Shared with me".
- Collaborators können alles editieren, Chats nutzen, Quellen verbinden, sehen alle Chat-Verläufe. Sie können nicht duplizieren, weiterteilen oder Versionen zurücksetzen.
- Echtzeit-Kollaboration ("multiplayer") wird beworben; Versionsverlauf zeigt den Autor jeder Änderung.
- Share-Menü enthält auch "Template" und das Teilen ins Team.

### 7.5 Chatbot & API (Power User)
- **Chatbot:** aus einem Chat mit zwei Klicks einen teilbaren Link erzeugen. Externe Personen chatten mit der Wissensbasis, ohne das Board zu sehen. White-Label-Chatbots ab AppSumo Tier 6. Button "🔒 Chatbot" in der Chat-Toolbar.
- **API:** Jeder Chat ist ein eigener Endpunkt ("Each chat is its own endpoint with its own training"). Funktionen laut API Hub: "Ask the knowledge base", "Chat with the knowledge base", "Live response mode", "Pick a model". Anbindung an n8n, Zapier, Make, Telegram, Slack; Anleitungen im [Poppy API Hub](https://poppy-api-hub.vercel.app/) [F28].
- Es gibt **keine API zum Befüllen von Boards**. Poppy liefert stattdessen einen Claude-Skill "Build a board without touching it", der per Computer-Use Links aufs Board setzt, gruppiert und an einen Chat hängt (September 2026).
- Gehostete Seiten unter `app.getpoppy.ai/l/...` mit Badge "Built with Poppy" [F29].

### 7.6 Brands (seit 02.07.2026)
- Sidebar-Eintrag "Brands". "Create Brand" → Quellen angeben (Instagram-, YouTube-, TikTok-, LinkedIn-Profil, Websites, PDFs) oder "Start from scratch".
- Poppy baut eine **Brand-Karte**: Role, About the business, Speaking style, Top phrases, Tone indicators (Tags wie "high energy", "direct"). Manuell ergänzbar über "Add Detail" (Label + Text).
- Nutzung: Dropdown "No Brand ▾" im Chat → Brand wählen, alle Antworten in dieser Stimme. Board-Inhalte per Klick "zur Brand hinzufügen".
- Limits: Base 3, Starter 5, Creator 10, Power User unbegrenzt.

### 7.7 Vaults (seit ca. 20.08.2026)
Board-übergreifende Bibliothek. Öffnen über Icon in der rechten Leiste oder V. Hinzufügen per Link-Paste, Upload/Aufnahme im Vault, "Save to Vault" an Gruppe/Item oder Drag auf das Vault-Icon. Mehrere Vaults mit Name, Icon, Bild; Suche. Vault-Items auf Boards sind **live verknüpft**: Änderung an einer Stelle aktualisiert alle Boards, Löschen im Vault entfernt überall.

### 7.8 Connections / MCP (seit 02.07.2026)
Button "Connections" (Badge "New") in der Chat-Toolbar. Verbindungen zu Higgsfield, Notion, Slack, Gmail, Google Calendar u. a., im Chat nutzbar (z. B. "Search my Notion for project roadmaps", "Add a new task to my project tracker"). Einrichtung: Profil → Settings → Integrations.

### 7.9 BYOK
Eigener OpenAI- oder Anthropic-Key statt Credits (AppSumo Tier 4 bis 6, seit 15.06.2026).

### 7.10 Export
Copy (formatiert/plain), Carousel "Download All", Mindmap-Download, Landing Page/Presentation als HTML oder Live-Link, Audio-Download. Kein Board-Export (PDF/PNG) gefunden.

### 7.11 Mobile
Keine Mobile-App. Mobile Nutzung nur indirekt über API/Chatbot-Links.

Quellen: [F13], [F16], [F17], [F28], [F29]; Help Center: [Board Collaboration](https://intercom.help/poppy-ai/en/articles/11542923-board-collaboration), [Power User Upgrade](https://intercom.help/poppy-ai/en/articles/11464499-power-user-upgrade), [API FAQ](https://intercom.help/poppy-ai/en/articles/12666719-poppy-api-power-user-frequently-asked-questions), [Brand Voices](https://intercom.help/poppy-ai/en/articles/15411812-brand-voices-in-poppy), [Vaults](https://intercom.help/poppy-ai/en/articles/16529562-vaults-reuse-content-across-boards-without-copy-pasting), [Notion Integration](https://intercom.help/poppy-ai/en/articles/12829805-notion-integration-seamlessly-connect-your-workspace-to-poppy); [AppSumo Founder-Updates](https://appsumo.com/products/poppy-ai/); [Poppy API Hub](https://poppy-api-hub.vercel.app/); YouTube CQH2hlcFl5s "Automating Poppy Boards With Claude Skills".

---

## 8. Preise und Limits

**Direkt (Stand Aug./Sept. 2026, nur Jahresabo):**

| Plan | Preis/Jahr | Credits/Monat | Nutzer | Brands | Extras |
|------|-----------|---------------|--------|--------|--------|
| Basic | $399 (≈ $33/Monat) | 2.000 | 1 | 3 | 1:1-Onboarding |
| Starter (Upgrade) | nicht öffentlich | 4.000 | 2 | 5 | |
| Creator | $2.268 (≈ $189/Monat) | 8.000 | 3 | 10 | unbegrenzt Landing Pages/Präsentationen, Custom Domain |
| Power User | $4.788 (≈ $399/Monat) | 16.000 | 5 | unbegrenzt | API, Chatbot, White-Glove-Setup |

- Aktuelle Landingpage: "$1 for your first 7 days", danach $33/Monat jährlich; 30-Tage-Geld-zurück (formal nur mit besuchtem Onboarding-Call). Zeitweise nur Demo-Call mit "15 % mehr Umsatz in 90 Tagen"-Garantie.
- **AppSumo Lifetime** (aktuell ausverkauft): Tier 1 $279 (500 Credits, 3 Brands, 1 Seat) bis Tier 6 $4.459 (10.000 Credits, unbegrenzte Brands, 5 Seats, API, White-Label-Chatbots). BYOK ab Tier 4.
- **Credits:** nur KI-Interaktionen kosten (Upload/Organisieren gratis; Bilder, Landing Pages usw. kosten). Verbrauch hängt ab von verbundener Textmenge, Modell, Verlaufslänge, Thinking-Stufe. Reset am 1. des Monats (Help Center widerspricht sich: 5 oder 9 Uhr PST), kein Übertrag. Bei 0 bleibt das Board nutzbar, Chat gesperrt. "One-time credit boost" über Support.
- Onboarding-Call gibt 1.000 Bonus-Credits/Monat für 5 Monate.

Quellen: [Pricing Options](https://intercom.help/poppy-ai/en/articles/11428985-pricing-options), [Understanding Credits](https://intercom.help/poppy-ai/en/articles/11465762-understanding-credits), [ChatGrid Pricing-Analyse](https://www.chatgrid.ai/blog/poppy-ai-pricing), [Ryan Doser Review](https://ryandoser.com/poppy-ai-review/), [getpoppy.ai](https://getpoppy.ai/), [AppSumo](https://appsumo.com/products/poppy-ai/).

---

## 9. Neueste Features 2025 bis 2026 (chronologisch)

| Datum | Feature |
|-------|---------|
| 2024 (Basis) | Google Drive & Dropbox, Gruppen |
| 29.03.2025 | APIs (Power User) |
| Mai/Juni 2025 | Mindmaps (M), Voice Memos |
| 2025 | Landing Pages, Presentations, Image Generation, Notion-Integration, Version Control |
| 16.12.2025 | Dokumentiert: kein RAG, Vollkontext pro Chat |
| Jan. 2026 | Profil-Discovery (YouTube/IG), Perplexity-Websuche, Template-Sharing |
| 2026 | Carousels (2 bis 10 Slides), Discover Content (Beta) mit Outlier-Badges, Import Ads |
| 15.06.2026 | BYOK (OpenAI/Anthropic) |
| 02.07.2026 "Poppy Day" | Brands, MCP/Connections (Higgsfield, Notion, Slack, Gmail, Google Calendar), großes Image-Gen-Update, White-Label-Chatbots |
| 10.08.2026 "Poppy Day" | Discover Content überarbeitet (Creators/Posts-Suche, TikTok/LinkedIn-Profile), Funnel-/Landing-Feature, Vaults (board-übergreifend, live verknüpft) |
| Aug. 2026 | Rechte Werkzeugleiste, Mehrfachauswahl mit "Brand" und "Auto Layout", farbige Gruppen-Icons |
| 11.09.2026 | Claude-Skill "Build a board" (Computer-Use-Automation), Poppy API Hub |

Quellen: AppSumo Founder-Updates, Help-Center-Artikeldaten, YouTube-Uploaddaten (Li8PZKJP16E, Fc_4PcdTAqk, sXA9HSGxUrA, CQH2hlcFl5s).

---

## 10. Schmerzpunkte aus Reviews (Chancen für den Klon)

- **Credit-Verbrauch:** Verbundene PDFs werden bei jeder Nachricht neu verarbeitet; "first day chewed up nearly all of my credits". Wunsch: einmal indizieren (AppSumo 3★, 1★).
- **Output-Qualität/Bugs:** Carousels mit Tippfehlern, Nachbessern kostet 500 bis 600 Credits; "buggy and slow", nur in Chrome gut.
- **Modelle hinken hinterher** (1★-Review Sept. 2026).
- **Aggressives Upselling** im Onboarding, Strategy-Calls, Countdown-Timer.
- **Nur Jahresabo**, keine Testphase, Preise hinter Demo-Call.
- **Kein Publishing/Scheduling**, alles per Copy-Paste raus.
- **Lernkurve** des Canvas; Token-Overload bei vielen Quellen.
- Positiv hervorgehoben: visuelles Board, Kombination Konkurrenz-Outliers + eigene Stimme, Transkription von Short-Form-Plattformen, Onboarding-Support.

Quellen: [AppSumo Reviews](https://appsumo.com/products/poppy-ai/), [Ryan Doser](https://ryandoser.com/poppy-ai-review/), [Toolsworthy](https://toolsworthy.com/poppy-ai-review/), [Meredith Marsh](https://vidpromom.com/poppy-ai/), [Trustpilot](https://www.trustpilot.com/review/getpoppy.ai).

---

## 11. Kern-Features für einen Klon

### MUSS (definiert das Poppy-Gefühl)
1. **Unendlicher Canvas** mit Dot-Grid (`#EDF2F5`), Pan/Zoom, Fit (Taste 1), Undo/Redo, Zoom-Leiste unten rechts. Keine Minimap nötig.
2. **Linke vertikale Werkzeugleiste** mit Icon-Tooltips und Einbuchstaben-Shortcuts (C, S, U, R, T, W, M, G).
3. **Paste-to-Node:** Cmd+V eines YouTube/TikTok/IG/Web-Links erzeugt sofort den richtigen Node an Cursor-Position; Drag & Drop von PDF/Audio/Video/Bild.
4. **Automatische Transkription/Extraktion** im Hintergrund mit Ladezustand; KI-generierter Titel für PDFs.
5. **Quell-Nodes im Poppy-Stil:** farbiger Header je Typ (YouTube rosa, PDF lachs, Website cyan, Audio magenta, Text blau), Thumbnail, "Views | Outlier ×", Feld "Add notes for AI to use...".
6. **Poppy Chat Node:** lila Verlaufs-Header, Eingangs-Handle links, mehrere Konversationen pro Node (Sidebar), Markdown-Streaming, "Thinking"-Zustand.
7. **Gestrichelte lila Bezier-Kanten** von Quell-Handle (rechts) zu Chat-Handle (links), Trennen per rotem ✕ in der Mitte. Verbunden = Kontext.
8. **Vollkontext-Semantik:** Alle verbundenen Quellen (inkl. Gruppeninhalt und Notizen) + Verlauf gehen komplett ans Modell, kein RAG.
9. **@-Mentions** mit Picker (nur verbundene Quellen) und farbigen Inline-Chips.
10. **Modell-Dropdown** mit Anbieter-Logos, Kurzbeschreibungen, "More Models", Thinking-Stufe.
11. **Gruppen** mit dunkelnavy Header, Umbenennen per Doppelklick, Minimieren zum Ordner-Icon, als Ganzes verbindbar.
12. **"Edit in text block"**: Chat-Antwort als editierbaren Text-Node aufs Board, der wieder Quelle sein kann.
13. **Board-Liste als Tabelle** mit New Board, Starred, Ordnern, Zufallsnamen für neue Boards.
14. **Leerer Board-Zustand** mit Buttons (AI Chat, Add Text, Record Voice, Upload) und Paste-Hinweis.

### SOLL
1. Voice-Memo-Node (R) mit Player, Transkript, "Copy Transcript".
2. Discover-Panel rechts: Kanal-Link → Latest/Outliers-Raster mit Outlier-Badge, Mehrfachauswahl, "Add N Selected to Board" als Gruppe.
3. Quick-Action-Chips (Create Image, Mindmap, Carousel ...) und "/"-Prompt-Bibliothek mit gespeicherten Prompts.
4. Fullscreen-Chat (F, Esc), Chat-Toolbar über dem Node.
5. Mehrfachauswahl (Shift+Drag) mit Copy, Group, Auto Layout.
6. Brands: Brand-Karte (Role, Speaking style, Top phrases, Tone) + "No Brand ▾"-Auswahl im Chat.
7. Klickbare Antwort-Optionen ("Create Script →"), Copy mit/ohne Formatierung.
8. Versionsverlauf (Uhr-Icon) mit Restore.
9. Templates (Board duplizieren) und Board-Sharing per Link.
10. Websuche als Tool-Toggle.
11. Credit-/Token-Anzeige und Warnung bei Kontext-Overload (hier kann der Klon besser sein: Caching/Indexierung).

### KANN
1. Import Ads (Meta Ad Library) mit Sortierung/Filtern.
2. Bildgenerierung mit Referenzbildern, Carousel-Node mit Slide-Editor.
3. Mindmap-Node mit Tab/Enter-Editor.
4. Landing Pages / Presentations als HTML mit Live-Link.
5. Vaults (board-übergreifend, live verknüpft).
6. MCP-Connections (Notion, Slack, Gmail, Calendar), BYOK.
7. Chatbot-Link und API pro Chat.
8. Teams mit Credit-Pool und Rollen.
9. Freie Überschriften mit Formatierung (Tool "A"), farbige/ikonisierte minimierte Gruppen.
10. Desktop-Wrapper.

---

## 12. Quellenverzeichnis

**Offiziell**
- https://getpoppy.ai/ und https://v2.getpoppy.ai/ (Landing, Pricing, FAQ)
- https://intercom.help/poppy-ai/en/ (Help Center, alle oben verlinkten Artikel)
- https://poppy-api-hub.vercel.app/ (API Hub, Build-a-board-Skill)
- app.getpoppy.ai/l/… (gehostete "Ask Athena"-Seite, Link lokal) (gehostete Poppy-Seite) [F29]
- https://www.youtube.com/@PoppyAI (offizieller Kanal)

**Ausgewertete Videos (Frames + Transkripte)**
- Alec Wilcock, "How to Use Poppy AI: Best AI Tool for Creators (Full Guide)", 08.06.2026, https://www.youtube.com/watch?v=6KLsURgk-qk (Haupt-Quelle für [F01]-[F12], [F14], [F19]-[F24], [F26])
- Poppy AI (offiziell), "Watch Me Write a Full YouTube Script in 20 Minutes Using POPPY AI", 07.06.2026, https://www.youtube.com/watch?v=0M9Q4QFadz8 ([F01], [F11], [F15])
- Max Stacks, "Poppy AI Review 2026 - Is It Actually Worth It? (After 16 Months)", 22.07.2026, https://www.youtube.com/watch?v=m3s444C0POg ([F04], [F05], [F07], [F13], [F23], [F25], [F27])
- Poppy AI (offiziell), "Automating Poppy Boards With Claude Skills", 11.09.2026, https://www.youtube.com/watch?v=CQH2hlcFl5s ([F16], [F17], [F28])
- Jonny Shapland, "I Let Poppy AI Take Over My YouTube Channel (Poppy AI Tutorial 2026 & 1 Year Review)", 01.02.2026, https://www.youtube.com/watch?v=dqVZRLC-EdU ([F08], [F18])

**Reviews**
- https://appsumo.com/products/poppy-ai/ (Listing, FAQ, Reviews, Founder-Updates)
- https://ryandoser.com/poppy-ai-review/
- https://toolsworthy.com/poppy-ai-review/
- https://www.chatgrid.ai/blog/poppy-ai-pricing
- https://vidpromom.com/poppy-ai/
- https://www.trustpilot.com/review/getpoppy.ai

**Nicht verifizierbar / offen:** Beschriftung des Sternsymbols in der linken Leiste und der vier Icons der rechten Leiste; genaue Pixelmaße; Board-Sharing-Dialog und Brand-Karte nur aus Help-Center-Text (Screenshots dort nicht abrufbar); ob die macOS-App offiziell ist.

---

## 13. Live-Befund aus eingeloggter Session (26.09.2026)

Account eingeloggt, aber ohne aktives Abo. `app.getpoppy.ai/` leitet auf `/onboarding/questions` um, danach Paywall ("We couldn't find an active subscription"). Boards waren nicht erreichbar. Screenshots lokal in `live/private/`.

**Stack, bestätigt aus den geladenen Assets:** Next.js (`/_next/static/chunks/*.css`), Tailwind, shadcn/ui (HSL-Variablen `--primary`, `--ring`, `--radius: .5rem`), react-toastify, Featurebase-Widget, Schrift Inter 100 bis 900. Es gibt einen Dark Mode (`.dark`).

**Design-Tokens (hell), vollständig in `live/private/design-tokens.json` (lokal):**

| Token | Wert | Verwendung |
|---|---|---|
| `--brand-primary` | `#5046e5` | Buttons, Fokus, Rahmen |
| `--brand-secondary` | `#7970f6` | Verlauf-Ende |
| `--gradient-brand` | `linear-gradient(84.88deg,#5046e5 0%,#7970f6 100%)` | Chat-Header, New Board |
| `--bg-flow` | `#edf1f5` | Canvas-Hintergrund (React Flow) |
| `--bg-secondary` / `--bg-tertiary` | `#f9f9f9` / `#f6f8fa` | Flächen |
| `--bg-purple-lighter` / `--bg-poppy-banner` | `#edecfc` / `#e4e2fd` | Banner, Hervorhebung |
| `--text-primary` / `--text-secondary` | `#1f2937` / `#64748b` | Text |
| `--text-quaternary` / `--border-tertiary` | `#20243b` | dunkelnavy (Gruppen-Header) |
| `--border-secondary` | `#e5e7eb` | Kartenrahmen |
| `--text-node-color` / `-light` | `#3274f4` / `#ccdcfc` | Text-Node |
| `--fb-node-selected` / `-light` | `#45a2ff` / `#ebf5ff` | Facebook-Ads-Node |
| `--shadow-purple` | `#7970f633` | Schatten |
| Primär-Button | `bg #5046e5`, Radius 10px, 14px/500, Padding 8px 10px | |

**Dark Mode:** `--brand-primary #8e51ff`, `--bg-flow #0a0e1a`, `--bg-primary #0c111d`, `--bg-secondary #1a1d2e`.

**Onboarding (neu gesehen):** Nach dem Login fragt Poppy den Sprechstil ab (No Bullshit, Podcast Style, Hype Machine, Educational, Storyteller, Motivational), jeweils als Karte mit Oktopus-Maskottchen, dazu optional einen Brand-Namen. Daraus entsteht die erste Brand Voice.

**Onboarding-Ablauf, live durchgeklickt (26.09.2026):**
1. Willkommen: "We need to learn from you so we can help create the best social media content." Button "Get Started →". (`live-02-onboarding-start.png`)
2. "What content do you want to create?" Mehrfachauswahl als Checkbox-Karten: Short Form Content, Ads, Long Form Content, Written Content, Emails & Newsletters, dazu "Something else". (`live-03-onboarding-content-types.png`)
3. "Add your social media & website links": Chips für Instagram, YouTube, TikTok, LinkedIn, Website, Attach PDF, dazu das Feld "Paste links here" mit "Add link". Überspringbar über "I don't have any social media profiles". Hieraus lernt Poppy die Brand Voice. (`live-04-onboarding-step3.png`)
4. "What is your speaking style?" Radio-Karten mit Maskottchen, dazu optional ein Brand-Name ("Leave blank and we'll name it from your answers").
5. Links ein eingebettetes 12-Seiten-Formular mit Loom-Video ("Just a few more questions and you'll unlock access to Poppy"), rechts "Your brand is ALMOST ready…". Das ist eine Lead-Qualifizierung, nicht ausgefüllt. (`live-05-onboarding-after-style.png`)

Für den Klon relevant: Schritte 2 bis 4 sind ein guter Brand-Voice-Assistent für den Start (Content-Typ, Quellen fürs Stimmprofil, Sprechstil-Preset). Schritt 5 entfällt.
