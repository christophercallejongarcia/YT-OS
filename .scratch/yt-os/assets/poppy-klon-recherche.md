# Poppy-Klon-Recherche

Stand: 26.09.2026. Ticket: `issues/02-poppy-klon-recherche.md`.

Kennzeichnung: **[Fakt]** steht in einer Quelle (Doku, README, GitHub-API). **[Einschätzung]** ist meine Schlussfolgerung.

## Kurzantwort

Einen Klon, den wir übernehmen können, gibt es nicht. Die Repos, die sich "Poppy Clone" nennen, sind Wochenend-Projekte mit 0 Sternen, 8 bis 12 Commits und ohne Lizenz. Eine White-Label-Version von Poppy existiert nicht; Poppy bietet nur eine API an, mit der ein Board als "Gehirn" hinter n8n hängt. Die brauchbaren Open-Source-Projekte sind allgemeine KI-Canvas-Tools, keines davon ist auf YouTube-Skripte zugeschnitten. Empfehlung: Hybrid. Sofort ein Ordner-Board mit Claude Code testen, danach ein minimales Board in Signal Room bauen und dabei Muster aus den MIT-Projekten übernehmen.

## Wie Poppy funktioniert

**Produkt [Fakt, getpoppy.ai]:** Visuelles Board für Creator, Marketer und Agenturen. Ablauf laut Website: Find (Gewinner-Content reinwerfen), Understand (Hooks, Winkel, Struktur analysieren), Create (in eigener Stimme neu schreiben). Preis: 399 USD pro Jahr (33 USD/Monat), 7-Tage-Test für 1 USD, 30 Tage Geld-zurück. Angeblich 13.000+ Nutzer.

**Board und Nodes [Fakt, Help Center + Teardown]:**
- Unendliches Canvas mit Blöcken: Textbox (T), KI-Chat (C), Social-Link (S), Website (W), Upload (U), Sprachnotiz (R), Mindmap (M), Gruppe (G).
- Eingaben: YouTube, Instagram, TikTok, LinkedIn, Facebook Ads, X-Videos, Loom, Zoom, Websites (nur die eine verlinkte Seite), PDF, CSV, DOC, TXT, MP3, MP4, MOV. Limit 100 MB pro Datei.
- YouTube liefert nur das Transkript plus Thumbnail. Keine visuelle Analyse für YouTube, Loom und Zoom; Instagram und TikTok werden auch visuell analysiert.
- Verschwindet ein Video von der Plattform, sieht Poppy es nicht mehr. Inhalte werden also nicht dauerhaft gespiegelt.

**Kontextmodell, der eigentliche Kern [Fakt, Artikel "How Poppy Handles Context", 16.12.2025]:**
- Man zieht eine Linie von einer Quelle zum Chat-Block. Alles Verbundene landet vollständig im Kontext. Gruppen verbinden ihren ganzen Inhalt.
- Kein RAG, keine Embeddings, kein Gedächtnis über Chats hinweg. Der Chat sieht nur verbundene Quellen und seinen eigenen Verlauf.
- Poppy empfiehlt selbst: "Train the board, use the chats". Gute Ergebnisse als Textbox aufs Board kopieren und in neue Chats verdrahten.
- `@` zitiert eine einzelne verbundene Quelle im Prompt, `/` öffnet die Prompt-Bibliothek.

**Modelle [Fakt, AI Models Guide]:** Claude (Sonnet 5, Opus 4.8, Opus 5), GPT (5.5, 5.6 Terra, 4o, 5.4 Mini), Gemini 2.5 Pro, Grok 3, pro Chat umschaltbar. Bildmodelle: GPT Image 2, Nano Banana 2/Pro, Seedream 4.5. Perplexity als Recherche im Chat. Abrechnung über Credits, abhängig von Modell, verbundenem Kontext und Chatlänge; Denk-Modi kosten mehr.

**Weitere Bausteine [Fakt, Help Center]:** Templates (Board teilen, Empfänger bekommt eine Kopie, öffentliche Templates nach Freigabe), Brand Voices (Stimmprofil aus Social-Profilen, PDFs oder Gespräch, an Board, Gruppe oder Block hängbar), Vaults (Inhalte einmal speichern, in allen Boards nutzen), Outliers und Creator Profiles (Videos, die über dem Schnitt des Creators liegen; tägliche Aktualisierung), Landingpages, Präsentationen, Karussells, API ("Knowledge Base Only"-Endpunkt ist zustandslos).

**Technik [Fakt, DevThinks-Fallstudie, Drittquelle]:** Das Canvas ist React Flow, Frontend React/Next.js, Uploads über UploadCare, Zahlungsdaten zeitweise in Airtable.

**[Einschätzung]** Der Wert von Poppy liegt nicht in der Technik. Es ist Kontext-Stuffing mit sichtbarer Auswahl: Der Mensch entscheidet per Linie, welche drei Videos zählen. Das lässt sich mit React Flow plus einem Chat-Endpunkt in wenigen Tagen nachbauen. Schwerer nachzubauen sind die Ingest-Pipeline für viele Plattformen, die Outlier-Suche und die Politur.

Ein Creator-Demo-Video habe ich nicht angeschaut. Help Center und ein ausführlicher Teardown (siehe coderkai03 unten) decken die UI ausreichend ab.

## Kandidaten

Sterne und Datum der letzten Aktivität (letzter Push) stammen aus der GitHub-API vom 26.09.2026 **[Fakt]**. Die Spalte Fit ist **[Einschätzung]**.

| Name | URL | Sterne | Letzte Aktivität | Lizenz | Stack | Fit |
|---|---|---|---|---|---|---|
| Poppy Clone (coderkai03) | https://github.com/coderkai03/poppy-clone | 0 | 07.09.2026 | keine | Next.js 16, @xyflow/react, FastAPI-Engine: YouTube-Captions, yt-dlp, faster-whisper, lokales LLM | Nächster echter Klon: URL rein, Transkript-Node, Kante zum Chat-Node, Antwort streamt. 12 Commits, keine Lizenz, also Code nicht übernehmbar. Wertvoll als Referenz, vor allem `poppy-product-teardown.md` |
| Thinkboard (prajwal-tomar/poppy-clone) | https://github.com/prajwal-tomar/poppy-clone | 0 | 24.03.2026 | keine | Next.js 16, React Flow, Tiptap, Zustand, Supabase, AI SDK + GPT-4o, Polar | Poppy-Nachbau als SaaS-Versuch, 10 Commits, seit März still. Nicht übernehmen |
| poppy-ai-prototype (reachrazamair) | https://github.com/reachrazamair/poppy-ai-prototype | 0 | 02.09.2026 | keine | Next.js 16, AI SDK 6, Claude, YouTube Data API, Supadata | Kein Board, nur Chat mit Tool-Calls (Top-Videos der Nische, Stimmanalyse). Idee für Outlier-Suche, sonst gering |
| YouPac AI | https://github.com/michaelshimeles/youpac-ai | 327 | 30.06.2025 | keine | React Router v7, Convex, React Flow, Clerk, OpenAI, ElevenLabs | Stack-Nähe hoch (Convex + React Flow), Zweck anders: Titel, Beschreibung, Thumbnail aus eigenem Video. Hackathon-Projekt, seit über einem Jahr still, keine Lizenz |
| Tersa | https://github.com/vercel-labs/tersa | 1.041 | 01.05.2026 | MIT | Next.js 15, React Flow, AI SDK Gateway, Tiptap, shadcn | Sauberer Canvas-Baukasten mit Text-, Bild-, Video-Nodes und Kanten als Datenfluss. Kein YouTube-Import, Speicher nur localStorage. Guter Code-Spender für Node-UI (MIT) |
| ThoughtDAG | https://github.com/chenxiachan/thoughtdag | 493 | 26.09.2026 | MIT | TypeScript/Vite, Desktop-App, eigener Modellzugang, CLI + MCP | Genau Poppys Prinzip ("Wires are the context"), sehr aktiv, liest PDFs und Claude-Code-/Codex-Sessions. Kein YouTube-Import. Gut, um das Board-Gefühl sofort zu testen |
| Canvas Chat | https://github.com/ericmjl/canvas-chat | 91 | 13.09.2026 | keine angegeben | Python/FastAPI + JS, IndexedDB, Plugins | Hat einen YouTube-Node mit Transkript (youtube-transcript-api), Multi-Select als Kontext, viele Anbieter inkl. Anthropic und Ollama. Sofort nutzbar per `uvx canvas-chat launch`. Code ohne Lizenz nicht übernehmbar |
| OpenCove | https://github.com/DeadWaveWave/opencove | 1.600 | 25.09.2026 | MIT | TypeScript-Desktop-App | Canvas für Claude-Code- und Codex-Terminals, Notizen, Tasks. Für Agentenarbeit, nicht für Skripte. Gering |
| Augmented Canvas (Obsidian) | https://github.com/MetaCorp/obsidian-augmented-canvas | 122 | 24.11.2024 | MIT | Obsidian-Plugin | KI-Chat auf Obsidian-Canvas, verbundene Karten als Kontext. Seit fast zwei Jahren still, kein YouTube |
| Caret (Obsidian) | https://github.com/jcollingj/caret | 199 | 16.04.2026 | MIT | Obsidian-Plugin | Chat-Canvas im Vault, lokal. Mittel, falls der Vault das Board sein soll |

Kommerzielle Poppy-Alternativen ohne Quellcode und ohne White-Label **[Fakt, Vergleichsseiten]**: Nodeflow AI (200 USD/Jahr), ChatGrid (ab 29 USD/Monat), Notebooks.app (ab 29 USD/Monat), AI Flow Chat (29 USD/Monat), Blort, Flora, Slashspace. Für YT-OS nicht relevant, weil sie weder an Convex noch an Claude Code andocken.

Weitere Fundstücke: Im Skool "AI Automation Society" zeigt ein Video einen Poppy-Nachbau in drei Stunden mit Lovable, Supabase und n8n (März 2025), ohne öffentliches Repo. **[Fakt]** Die GitHub-Suche nach "poppy clone" liefert außerdem leere Repos (console-1/james, yasneiri/poppy-clone) und einen Codespace-Stub (janhworman/poppy-clone). **[Fakt]**

## Abgleich mit Signal Room

Signal Room (`/Users/cristobalcallejongarcia/dev/signal-room-starter`) **[Fakt, README, CONTEXT.md, package.json]**:
- Next.js + Convex + lokale Codex-Bridge auf `127.0.0.1:3211`. Tabs: Discover, Briefing, Trend Radar, Format Signals, Ideas, Hooks, Cover Lab.
- Convex-Tabellen u. a. `signals`, `transcriptAnalyses`, `patterns`, `ideas`, `scripts`, `hookRuns`.
- Heute nur Instagram. "Short" ist im Glossar für YouTube reserviert, YouTube-Import gibt es noch nicht.
- Kein React Flow in den Abhängigkeiten.
- Die Bridge begrenzt Request-Bodys auf **64 KB**, läuft read-only und ohne Netzsuche.

**[Einschätzung]** Folgen für ein Board in Signal Room:
- Datenhaltung, Ideen, Skripte und Hooks sind schon da. Es fehlen drei Teile: `@xyflow/react`, ein YouTube-Transkript-Import (Captions zuerst, yt-dlp + Whisper als Rückfall, wie bei coderkai03) und ein Chat-Endpunkt, der alle verbundenen Nodes einsammelt.
- Die 64-KB-Grenze ist der echte Engpass. Drei bis fünf lange YouTube-Transkripte sprengen sie. Lösung: Transkripte in Convex oder als Dateien ablegen und der Bridge nur IDs oder Pfade schicken, oder die Grenze für diesen einen Endpunkt anheben.
- Poppys Kontextmodell passt ohne RAG direkt: verbundene Nodes aneinanderhängen, Brand-Voice-Node dazu, fertig. Claude oder Codex mit großem Kontextfenster reicht dafür.

## Empfehlung: Hybrid

1. **Jetzt, ohne Bau (für Video 2):** Ein Ordner-Board in YT-OS. Pro Video ein Ordner mit Transkripten der Referenz-Videos (per `/watch` oder yt-dlp), einer Brand-Voice-Datei und den Kallaway-Formaten; Claude Code liest den Ordner und schreibt das Skript. Das ist Poppys Kontextmodell ohne Canvas. **[Einschätzung]** Deckt geschätzt 80 Prozent des Nutzens ab, weil Poppy selbst nur verbundene Quellen in den Kontext kippt.
2. **Parallel testen, 30 Minuten:** Canvas Chat (`uvx canvas-chat launch`) mit drei YouTube-Links und eigenem Claude-Key, oder ThoughtDAG als Desktop-App. Ziel ist eine Frage: Bringt das visuelle Verdrahten beim Skripten spürbar mehr als der Ordner?
3. **Falls ja: minimales Board in Signal Room bauen.** Umfang: Board, YouTube-Node, Text-Node, Brand-Voice-Node, Chat-Node, Kanten als Kontext, Ergebnis als Skript in die bestehende `scripts`-Tabelle. UI-Muster von Tersa (MIT) übernehmen, Ingest-Ablauf von coderkai03 nachbauen (nicht kopieren, keine Lizenz). Outlier-Suche, Vaults, Landingpages weglassen.

**Gründe gegen "Klon übernehmen":** Kein Kandidat hat gleichzeitig Lizenz, Aktivität und YouTube-Import. Die zwei Projekte mit YouTube-Import (coderkai03, Canvas Chat) haben keine Lizenz. Die lizenzierten, aktiven Projekte (Tersa, ThoughtDAG) können kein YouTube. Ein fremdes Repo neben Signal Room hieße zweiter Datenspeicher, zweites Auth-Modell und kein Zugriff auf Ideas und Hooks.

**Gründe gegen sofortigen Bau:** Video 1 wird am 27.09. gedreht und braucht kein Board. Ob das Canvas beim Skripten wirklich hilft, ist ungeprüft; der Ordner-Test klärt das ohne Code.

## Quellen

- https://getpoppy.ai
- https://intercom.help/poppy-ai/en/collections/11475990-how-poppy-ai-works
- https://intercom.help/poppy-ai/en/articles/13171184-how-poppy-handles-context
- https://intercom.help/poppy-ai/en/articles/11529424-content-integration
- https://intercom.help/poppy-ai/en/articles/11465596-ai-models-guide
- https://intercom.help/poppy-ai/en/articles/13753466-creating-and-sharing-templates-in-poppy
- https://intercom.help/poppy-ai/en/articles/12666719-poppy-api-power-user-frequently-asked-questions
- https://www.devthinks.com/work/poppy-ai
- https://github.com/coderkai03/poppy-clone/blob/main/poppy-product-teardown.md
- https://www.chatgrid.ai/blog/best-poppy-ai-alternatives
- https://www.skool.com/ai-automation-society/build-your-own-viral-content-tool-in-hours-with-lovable-supabase-n8n
