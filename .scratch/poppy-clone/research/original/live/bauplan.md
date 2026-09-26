# Poppy AI: Bauplan aus der Live-Session (26.09.2026)

Quelle: eingeloggte Session mit Test-Abo, per Playwright durchgeklickt. Ausgelesen wurden Screenshots, Accessibility-Snapshots, berechnete Styles, React-Flow-State aus dem React-Fiber, Netzwerk-Payloads und Konsole. Verbraucht: 2 Chat-Nachrichten, rund 11 von 2.000 Credits. Rohdaten (JSON-Payloads, rund 60 Screenshots) liegen lokal in `private/` und sind bewusst nicht im öffentlichen Repo, weil sie Kontodaten, Poppy-Templates und fremde Transkripte enthalten.

## 1. Stack (belegt)

| Schicht | Poppy | Beleg |
|---|---|---|
| Framework | Next.js App Router auf Vercel (Region fra1) | Response-Header `x-vercel-id`, `/_next/static` |
| UI | Tailwind, shadcn/ui (Radix), Inter 100 bis 900, react-toastify | CSS-Variablen, `data-state`-Attribute |
| Canvas | React Flow v12 (`@xyflow/react`), **Pro-Lizenz** (`proOptions.account: "paid-pro"`) | Fiber-Props, `measured`, `xy-edge__`-IDs |
| Chat | Vercel AI SDK v5: `useChat` im Client, `streamText` auf `/api/chat`, UI-Message-Stream (SSE) | Payload mit `parts`, `trigger: submit-message`, Stream-Events `start`, `reasoning-start`, `text-delta`, `finish` |
| LLM | Anthropic direkt (Thinking-Signatur im Stream), dazu OpenAI, Google, xAI | Modell-IDs wie `claude-sonnet-5` |
| Daten | Firebase Firestore (Echtzeit), Auth über Clerk mit Custom Token | `Firestore/Listen`, `/api/firebase-token` |
| Transkripte | Server-seitig, gespeichert in der DB, nicht im Node (`text: null`, `transcriptSavedOnDB: true`) | Node-Daten |
| Uploads | Uploadcare-Widget (Gerät, Dropbox, Google Drive) | Screenshot 25 |
| Sprachnotizen | ElevenLabs Live-Transkription | `/api/transcribe-live/elevenlabs` |
| Mindmap | `mind-elixir` (JSON mit `nodeData`, Theme "Whimsy") | `mindmapNode.data.mindmap` |
| Touren | `react-joyride` | DOM `#react-joyride-portal` |
| Sonstiges | PostHog, Sentry, Intercom, Featurebase, Tally | Netzwerk |

## 2. Canvas-Konfiguration (1:1 übernehmbar)

```ts
panOnScroll: true, panOnScrollSpeed: 1.5, panOnDrag: [0],
zoomOnScroll: true, zoomOnPinch: true, zoomOnDoubleClick: true,
deleteKeyCode: ["Delete", "Backspace"], multiSelectionKeyCode: ["Shift"],
minZoom: 0.1, maxZoom: 15, connectionMode: "loose", selectionMode: "partial",
elevateEdgesOnSelect: true, elevateNodesOnSelect: true, colorMode: "light"
```

Hintergrund: Punktraster, Abstand 20px, Punktradius 0,5, Fläche `--bg-flow #edf1f5`. Zoom-Leiste unten rechts: Undo, Redo, +, -, Fit, ⌘.

**Node-Typen (26):** youtubeNode, youtubeChannelNode, creatorProfileNode, loomNode, zoomNode, imageNode, audioNode, videoNode, chatNode, tiktokNode, instagramNode, textNode, webScrapperNode, documentNode, contentNode, groupNode, vaultNode, mindmapNode, chatBotNode, annotationNode, facebookAdsNode, facebookBrandNode, abTestNode, landingPageNode, carouselNode, contentAddNode.

**Edge-Typen:** `connectionEdge` (Quelle zu Chat), `landingPageMappingEdge`.

## 3. Datenmodell

**Node (gemeinsam):** `id` = `<typ>-<adjektiv>-<nomen>-<5 Zeichen>` (z. B. `chatNode-patient-fire-1uw8F`), `type`, `position`, `width`, `height`, `zIndex`, `parentId` + `extent: "parent"` für Kinder einer Gruppe. `data`: `type`, `title`, `notes` ("Add notes for AI to use..."), `userId`, `userEmail`, `userName`, `createdAt`, `createdAtTimestamp`, `connectionId`, `isCopying`, `transcriptSavedOnDB`, `uploadStatus`.

- `youtubeNode.data`: `url`, `title`, `uploadStatus: "uploaded"`, `text: null` (Transkript liegt separat).
- `chatNode.data`: `modelId` ("claude-sonnet-5"), `selectedBrandId`, `pasteChatPrompt`. Größe 800 x 700, zIndex 10.
- `groupNode.data`: `title`. zIndex -1.
- `mindmapNode.data.mindmap`: mind-elixir-JSON als String.

**Edge:** `{ id: "xy-edge__<source>-<target>", source, sourceHandle: "connector", target, targetHandle: "chat-connector", type: "connectionEdge", animated: true }`.

**Board-ID:** `wonderful-forest-84Tck`, Board-Titel zufällig ("Salmon Fowl").

## 4. Chat-Kern: so baut Poppy den Kontext

`POST /api/chat`, Body (gekürzt):

```json
{
  "id": "chat-<chatNodeId>", "nodeId": "...", "boardId": "...", "chatId": "<uuid pro Unterhaltung>",
  "modelId": "claude-sonnet-5", "isWebSearchEnabled": false,
  "enableExtendedThinking": false, "reasoningEffort": "off", "enableExtraTools": ["generateCarousel"],
  "brandVoice": "Brand Name: …\nBrand Insights:\nArchetype: …\nEnergy: 62/100 …\nFilter: 15/100 …\nMost-Used Words: …\nRole: …\nBusiness: …\nOffer: …\nSpeaking Style: …",
  "knowledgeBase": [
    { "id", "type": "text|youtube|youtubeChannel|…", "title", "groupTitle", "url", "createdAt", "updatedAt",
      "transcript": "<Volltext>", "visualAnalysis": "<KI-Videoanalyse, bei YouTube>" }
  ],
  "connectedArtifacts": [], "additionalContext": null,
  "messages": [ { "id", "role", "parts": [{ "type": "text", "text": "…" }], "model", "timestamp", "createdBy" } ],
  "trigger": "submit-message"
}
```

Belegt: Der **Client** schickt alle verbundenen Quellen mit vollem Text bei **jeder** Nachricht mit (hier 7 Einträge, ca. 90 KB). Gruppen werden in ihre Kinder aufgelöst, jedes Kind trägt `groupTitle`. Kein RAG. Der System-Prompt liegt server-seitig und ist nicht sichtbar.

Kanal-Node als Kontext: reiner Text, "YouTube Channel: <Name> (@handle)" plus "Latest 20 Video Titles" mit Views.

Antwort: AI-SDK-UI-Message-Stream (`data: {"type":"text-delta",…}`). Die klickbaren Titel-Optionen mit Pfeil sind gerenderte Listeneinträge ("Create Script →"-Muster), ein Klick schickt einen Folge-Prompt.

## 5. Ingest-Endpunkte

| Quelle | Aufrufe | Antwort |
|---|---|---|
| YouTube-Video | `POST /api/yt-title {url}`, dann `POST /api/scrape-content {url}` | `{videoTitle, channelId, liveBroadcastContent}` bzw. `{data:[{transcript, videoId, url}]}`, Transkript als Fließtext ohne Zeitstempel |
| YouTube-Kanal | `POST /api/youtube-channel-videos` | Latest / Popular / Outliers (je 20) mit Views |
| Brand | `POST/PUT /api/brands`, `POST /api/brands/:id/analyze` | Brand-Profil |
| Vorlagen | `POST api.getpoppy.ai/api/nodes/copy` | kopiert Nodes aufs Board |

## 6. UI-Inventar

**Kopfzeile Board:** Command-Menü (Grid-Icon: Create New Board ⌘N, Go to Boards, Board-Liste), Logo, Board-Titel (inline editierbar), Hiring/Affiliate/APIs-Chips, Credits (Popover: verbraucht/Monat, Reset-Datum, "How it Works"), Upgrades, Share (Dialog: Share/Template/Permissions, Team, "Anyone with a link"), Refer & Earn, Versionsverlauf, Glocke, Avatar-Menü (Personal/Team, Billing, Settings, Keyboard shortcuts, Dark mode Beta, API, Log out).

**Linke Werkzeugleiste** (50px breit, weiß, Radius 8, Schatten `rgba(32,36,59,.08) 8px 0 16px`, Buttons 48 x 48): Chat, Social (Modal mit YouTube, Instagram, TikTok, LinkedIn, Facebook, X), Loom, Upload (Uploadcare), Sprachnotiz, Text, Überschrift, Website, Mindmap (Vollbild-Editor, Tab = rechts, Enter = unten), Gruppe.

**Rechte Leiste (Seitenpanels, ca. 420px):** Discover Content (Creator-Suche YouTube/Instagram/TikTok/LinkedIn), Vault (Sammlungen, per Drag aufs Board, live synchronisiert), Facebook Ads Library, Notizen-Dokument.

**Auswahl-Leiste über Nodes:** Quell-Node: Einklappen, Öffnen, Copy Transcript, Outliers, Brand, Save to Vault. Text: Fullscreen (F), Einklappen, Copy Text, Brand, Save to Vault. Gruppe: Einklappen, Ordner, Farbe, Ungroup, Brand, Save to Vault. Chat: Fullscreen (F), Zoom (Z), Connections, Chatbot, API.

**Chat-Node:** Header `#f2f1fe` (ausgewählt: Verlauf `#5046e5` zu `#7970f6`, weiße Schrift, "Move"-Griff rechts). Sidebar: Close Sidebar, New Conversation, Liste (… Rename, Copy Conversation, Delete), Settings (Auto Send After Recording, View Transcript When Recording, Font Size, Messages Width, Show Thinking Power, Show Model Name, Sound More Human). Nachricht: Aktionen Edit, Vorlesen, "Create prompt from message", Copy; Meta "Claude 5 Sonnet · just now". Quick-Chips über der Eingabe: Create Image, Mindmap, Landing Page, Presentation, Carousel. Eingabe "Ask anything, / for prompts, @ for sources": `+` (Datei), Tools (Deep Research, Create Image, MindMap, Landing Page, Presentation, Carousel, Higgsfield), Brand-Auswahl (No brand / Brand / Add brand), Modell (Favoriten + "More Models" + Thinking-Stufe), Mikrofon/Senden. `/` = Prompt-Bibliothek (Create Prompt, Browse Prompts, angeheftete Prompts). `@` = verbundene Quellen inkl. Gruppenkinder.

**Modelle:** Claude 5 Sonnet (Standard), GPT-5.6 Terra, GPT-5.5, Nanobanana 2; More: Claude Opus 5 / 4.8 / 4.6, Gemini 2.5 Pro, GPT-4o, GPT-5.4 Mini, Grok 4.5; Bild: GPT Image 2, NanoBanana Pro.

**Dashboard (`/boards`):** Sidebar 288px (New Board mit Kürzel N als Verlaufs-Button, Boards, Vault, Templates, Brands, Create a new Folder, Team-Karte, Invite, Support, Feedback, Deleted Boards). Hauptbereich: einklappbares "Learn How to Use Poppy AI"-Karussell, "Boards" mit Tabs All/Starred/Shared, Suche, Tabelle (Name, Last Opened, Created By, Created, Stern, Optionen). `/boards` springt nach dem ersten Besuch direkt ins zuletzt geöffnete Board.

**Templates (`/boards/templates`):** Kategorie-Kacheln mit Anzahl, Tabs All/Private/Poppy, farbige Tag-Filter, Tabelle (Name, Category, Tags, Last Updates, Creative By, Used/Liked).

**Brands (`/boards/brands`):** Karten, Limit "1 / 3 brand voices". Brand-Profil: Archetyp, Energy (Chill bis Hype), Filter (Filtered bis Unhinged), Most-Used Words, Role, Business, Offer, Speaking Style, Brand Summary, Target Audience, Content Pillars, Top Phrases.

## 7. Farben pro Node-Typ (gemessen)

| Typ | Header / Fläche | Connector |
|---|---|---|
| Chat | `#f2f1fe`, Rahmen `#d3d1f9`; ausgewählt Verlauf `#5046e5` bis `#7970f6` | Eingang `#b66bf3` |
| YouTube | `#fee4e3`, ausgewählt `#f14141` | `#b66bf3` |
| YouTube-Kanal | `#fbcfcf` | `#b66bf3` |
| Text | `#ccdcfc`, ausgewählt `#3274f4` | `#3274f4` |
| Gruppe | Header `#20243b` (56px), Fläche `#edf1f5`, Radius 12 | `#20243b` |
| Website | Türkis (Screenshot 30) | |

Handles 19px, weiß, 2px Rand in Connector-Farbe, Hover füllt. Kanten 2px, gestrichelt 5px, `dashdraw` 0,5s, Farbverlauf von Quelle zu Ziel. Nodes: Radius 12, Header 47px.

## 8. Was der Klon anders machen sollte

- Kontext server-seitig aus der DB bauen statt 90 KB pro Nachricht vom Client zu schicken. Dazu Prompt-Caching bei Anthropic, dann wird der Vollkontext günstig.
- Unbenannte Nodes nicht mit interner ID in der `@`-Liste zeigen (Poppy zeigt `textNode-hidden-moon-LQ44d-copied`).
- React Flow Pro ist nicht nötig. Die Pro-Lizenz blendet nur die Attribution aus und gibt Zugriff auf Pro-Beispiele.

## 9. Deep-Scan der MVP-Szenarien (26.09.2026, abends)

Autonom durchgeklickt auf einem frischen Board ("Copper Rabbit"). Pro Szenario gibt es ein Klick-Video aus Einzelbildern (alle 350 ms), Netzwerk-Payloads und den React-Flow-State vorher und nachher. Videos und Rohbilder liegen lokal in `private/scan/` (rund 21 Videos, 77 MB). Verbraucht: 21 Credits (insgesamt 32 von 2.000).

| # | Szenario | Befund |
|---|---|---|
| 0 | Neues Board | Command-Menü, "Create New Board". Zufallstitel ("Copper Rabbit"), sofort markiert zum Umbenennen. Leerer Zustand: zwei Template-Karten, Buttons AI Chat, Add Text, Record Voice, Upload, Hinweis "Ctrl/Cmd + V" mit sechs Plattform-Icons. |
| 1 | YouTube per Cmd+V | Einfügen auf dem Canvas legt sofort einen `youtubeNode` (290 x 206) an. Danach `POST /api/yt-title {videoId}` (Titel, `channelId`) und `POST /api/scrape-content {url}` (Volltranskript). Node-Daten: `url`, `channelId`, `uploadStatus`, `text: null`, `transcriptSavedOnDB: true`. |
| 2 | Kante ziehen und trennen | Drag vom rechten Handle (`connector`) auf den linken Chat-Handle (`chat-connector`). Edge-ID `xy-edge__<quelle>connector-<ziel>chat-connector`, Typ `connectionEdge`, `animated: true`, Farbverlauf Quellfarbe zu Lila. Beim Hover erscheint mittig ein roter Kreis mit weißem x (SVG-`circle` in der Kante), Klick löscht die Kante. |
| 3 | Text-Node | Neuer Text-Node 500 x 300 in der Mitte des Sichtfelds, Fokus zuerst auf dem Titel. Body ist ein **BlockNote**-Editor (`bn-editor`, auf Tiptap), nur editierbar, solange der Node ausgewählt ist. Sonst gehen Tasten als Canvas-Kürzel raus (Buchstabe M legt eine Mindmap an). `/` im Body öffnet das BlockNote-Menü (H1 bis H3, Listen, Zitat, Code, Tabelle). Inhalt liegt in der DB, nicht im Node (`text: null`). |
| 4 | Gruppe | Mehrfachauswahl per Shift-Klick zeigt die Leiste Copy (⌘C), Group (⌘G), Brand, Auto Layout. ⌘G erzeugt `groupNode` "Group 1" (zIndex -1). Kinder bekommen `parentId` und `extent: "parent"`, Positionen relativ (erstes Kind bei 40, 80). **Einzelkanten der Kinder werden durch eine Kante Gruppe zu Chat ersetzt.** |
| 5 | Brand, @-Mention, Senden | Brand-Auswahl speichert `selectedBrandId` am Chat-Node. `@` fügt `span.mention-pill` ein (`data-mention-node-id`, `-type`, `-title`, Farbe des Node-Typs). **Im Payload steht die Erwähnung als Inline-Tag im Text:** `<poppy_reference_node nodeId="…" title="…" type="textNode" />`. Gruppe wird in Kinder aufgelöst, jedes mit `groupTitle`. YouTube-Transkript geht voll mit (33.607 Zeichen), Text-Node als `transcript`. Unterhaltung bekommt automatisch einen Titel ("Opus 5.5 Hooks"). |
| 6 | Klickbare Option | **Das Modell liefert die Optionen selbst im Text:** `<clickable-title titlePrompt="… '{{titleText}}' …">Titel</clickable-title>`. Der System-Prompt verlangt dieses Format. Klick setzt den Titel in `titlePrompt` ein und schreibt ihn ins Eingabefeld, **sendet aber nicht automatisch**. |
| 7 | Antwort als Text-Node | Aktion "Edit" unter der Antwort (weitere: Voiceover, Create prompt from message, Copy) legt einen Text-Node (500 x 300) 60 px rechts neben dem Chat an, ohne Kante, Titel "Text". Schwäche im Original: rohe `<clickable-title>`-Tags landen im Editor. |
| 8 | Neue Unterhaltung | Eintrag in der Seitenleiste entsteht erst mit der ersten Nachricht. |
| 9 | Modellwechsel | `modelId` und `selectedBrandId` liegen am Chat-Node (`claude-sonnet-5`, `gpt-5.5`). Thinking-Stufen: Instant, Low, Medium, High (im Payload `reasoningEffort`, Instant = `"off"`). |
| 10 | Prompt-Bibliothek | "Create prompt from message" öffnet ein Seitenpanel: Prompt (vorbefüllt), "Refine prompt", Name (optional, sonst generiert), Share with (Only Me), Advanced: Kategorie (Content, Social media, Marketing, Research, Writing, Scripts, Other), Icon, Tag. Speichern: `POST /api/prompts {action:"create", promptText, name, visibility:[], teamId, forkedFrom, originalCreatorName}`. Nutzen: `/name` fügt `span.slash-command-label--prompt` mit `data-slash-command-prompt-id` ein. Beim Senden: `action` = Prompt-ID, Nachrichtentext = Prompt-Text + Leerzeile + eigener Zusatz. Platzhalter wie `{{titel}}` werden **nicht** ersetzt. Eingebaute Befehle (Create Image, Create Prompt usw.) erscheinen als `span.slash-command-label`. |
| 11 | Sprachnotiz (Upload) | Upload über Uploadcare legt `audioNode` (290 x 120) an: magentafarbener Header mit KI-Titel, Player mit Tempo, Transkript-Vorschau, Notizfeld, Leiste Copy Transcript, Download, Brand, Save to Vault. Transkription: `POST /api/transcribe?node_id=…` mit `{url, nonBlocking:true, nodeId}`, Antwort ist der Transkript-String. Dazu `PUT /api/uploadcare/store {fileIds}`. Live-Aufnahme (Record Voice) läuft über `/api/transcribe-live/elevenlabs`, im Test-Browser ohne Mikrofon nicht prüfbar. |
| 12 | Auto-Verbinden | Vermutung aus Szenario 3 widerlegt: Ein neuer Node verbindet sich nicht automatisch mit einem ausgewählten Chat. Eine Kante ohne Handles (`<quelle>-<ziel>`) aus Szenario 3 bleibt ungeklärt, vermutlich ein abgebrochener Drag. |

**Für den Klon übernehmen:** Kantenlogik inklusive Gruppen-Ersetzung, Mention-Tag im Text, `clickable-title`-Format mit Einsetzen ins Eingabefeld, Prompt-Chip mit `action`, Transkripte getrennt vom Node speichern, Editor nur bei Auswahl editierbar.

**Besser machen:** Platzhalter in Prompts ersetzen, `clickable-title` beim Übernehmen als Text-Node in eine saubere Liste umwandeln, YouTube-Titel im Node speichern (Poppy lässt `title` leer und zeigt ihn nur aus dem Header an).
