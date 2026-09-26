# Brad Bonanno: automatische Screen-Recording-B-Roll mit Fable

Stand: 2026-09-26. Quelle der Analyse: Frames (1 fps Vollauflösung, dazu 4 bis 6 fps Crops an Klick- und Tipp-Stellen) plus Captions des Videos, Metadaten, angepinnter Kommentar, Brads GitHub und das Transkript seines Pipeline-Videos.

## Video

- Titel: "I Tested GPT-6 Astra vs Fable 5.1 On Actual Work (It Was Close)"
- Kanal: Brad Bonanno | AI Automation (GitHub: `bradautomates`, Autor des `watch`-Skills / claude-video)
- URL: https://www.youtube.com/watch?v=NxSrSNr5LBM
- Upload: 2026-09-11, Länge 27:34
- Kapitel: 5:02 Promo video, 7:40 Landing page, 10:16 Ads creative (Higgsfield-Sponsor ab 10:19)

Das Video selbst erklärt den B-Roll-Workflow **nicht**. Kein Wort zu Playwright, Cursor oder Recording-Skript. Beschreibung, angepinnter Kommentar (nur Bootcamp- und Higgsfield-Link) und die Kit-Seite des Free Guides (nur Opt-in-Formular) enthalten ebenfalls nichts dazu. Auf Brads GitHub gibt es kein Repo für B-Roll oder Browser-Recording (Repos: claude-video, head-of-content, content-ideas, focus-group, last30days-skill, second-brain, company-skills-marketplace-template). Eine schriftliche Beschreibung im Web habe ich nicht gefunden. Die einzige Quelle für den Mechanismus bleibt der Newsletter-Text.

## Was im Bereich 8:05 bis 10:40 zu sehen ist

Zwei Arten von Screen-B-Roll. Die zweite passt exakt zur Newsletter-Beschreibung (Startseite, scrollen, klicken, tippen, eigener Cursor).

### Block A: Landing Pages der Modelle (8:05 bis 9:53), ohne sichtbaren Cursor

Layout durchgehend: Webseite formatfüllend in 16:9, **keine Browser-Leiste** (keine Tabs, keine URL-Zeile), Facecam als abgerundetes PiP unten links, Info-Karte unten rechts ("MODEL Fable 5.1 | EFFORT High | TIME 34m 55s | COST $14.46" bzw. "GPT-6 Astra | High | 23m 27s | $13.49").

| Zeit | Bild | Gesprochen |
|---|---|---|
| 7:40 | Titelkarte "Number 03 / SaaS landing page", Serif-Schrift, Buchstaben blenden nacheinander ein | "Use case three is building a SaaS landing page" |
| 7:44 bis 8:00 | Prompt-Text formatfüllend. Textmarker-Balken erscheinen Phrase für Phrase: "choose any SaaS concept you" und "invent its brand, positioning and copy" (ca. 7:52), "research outstanding landing pages online" (ca. 7:58) | Genau diese Phrasen, jeweils zeitgleich |
| 8:01 bis 8:04 | Echte Aufnahme der Claude-Desktop-App (Session "03-saas-landing-page"), reingezoomt, mit animierten Marker-Balken über "writing the page itself: HTML first". Im Log sichtbar: "created shoot.js", "Now I'm scrolling through each section at desktop size to check the animated states", Seitenpanel "Browse with Claude" | "let's see what Fable has come up with" |
| 8:05 bis 8:12 | Tinct-Hero (Fables Seite), Hex-Chips schweben, ca. 7 s Standbild mit Animation | "nice transitions coming up on the right hand side" |
| 8:13 bis 8:16 | Weiches Scrollen zu "Every hex you hand-pick…", Zähler läuft 29 auf 47 | "not sure what this product is" |
| 8:17 bis 8:21 | Stand auf 47-Sektion | "claudisms … design elements" |
| 8:22 bis 8:30 | Weiterscrollen: "Give it one colour", "It builds every ramp", "Roles, not hexes", "Try it with your brand colour" (Slider-Panel), "Publish once" | "transitions … quite smooth" |
| 8:31 bis 8:33 | Harter Rücksprung zu 47 und zum Hero (Schnitt, kein Scroll) | "pretty meh website" |
| 8:34 bis 8:41 | Kamera fährt raus: beide Seiten nebeneinander auf Raster-Hintergrund, Modell-Icons unten links | "let's see what Astra came up with" |
| 8:42 bis 8:47 | Sundial-Hero (Astra) formatfüllend, Tinct als kleines PiP oben rechts | "much nicer looking hero section" |
| 8:47 bis 8:53 | Scroll mit Parallax, 3D-Form wandert | "parallax … shifts down while you scroll" |
| 8:54 bis 9:07 | "Same team. Same week." Kalender: Termine ordnen sich um, grüne Fokusblöcke erscheinen, Schritt 01 bis 03 wird aktiv | "cool little animation of a calendar … adds some focus time" |
| 9:08 bis 9:16 | "Don't find time. Shape it." ROI-Rechner: Slider springt 16h, 9h usw., Ergebnis 8h, 9.5h, 11.5h, 12.6h, Toggle "Make 60 minutes, 45" schaltet ein. **Kein Cursor sichtbar**, Bedienung also programmatisch | "ROI calculator … it's dynamic" |
| 9:17 bis 9:37 | Kostenkarte, Werte zählen hoch, Winner-Reveal Astra, Score 2-0 auf 2-1 | Kosten- und Zeitangaben, synchron |
| 9:38 bis 9:44 | Split-Screen, dann Tinct formatfüllend, dann **Raster aus 12 Farbvarianten** des Tinct-Heros (gleiche Seite, 12 Seed-Farben gerendert) | "Fable's screams AI SaaS landing page" |
| 9:45 bis 9:53 | Sundial-Kalender erneut | "Astra's website … less immediately AI" |
| 9:54 bis 10:19 | Talking Head, Titelkarte "Number 04 / Ad creative" | |

### Block B: Higgsfield-Sponsor (10:20 bis 10:38), mit gezeichnetem Cursor

Das ist die Sequenz aus dem Newsletter. Brad hatte für den Sponsor-Read keine eigene Aufnahme der Higgsfield-Seite.

| Zeit | Bild | Gesprochen (Caption-Zeit) |
|---|---|---|
| 10:20 bis 10:21 | higgsfield.ai Startseite, Carousel oben, formatfüllend ohne Browser-Leiste. Großer schwarzer macOS-Pfeil-Cursor mit weißem Rand (ca. 24 px bei 720p) mitten im Bild | "sponsored by Higgsfield" |
| 10:22 bis 10:27 | Langsames Scrollen, Cursor wandert über Modell-Kacheln (Seedance 2.5, Nano Banana Pro), hovert auf "Explore use cases" | "access to image and video generation models in one place" (10:21 bis 10:25) |
| 10:28 | Cursor gleitet in mehreren Zwischenpositionen hoch zum Nav-Punkt "Image". Klick. Mega-Menü klappt auf | "product photos" (ca. 10:27) |
| 10:29 | Image-Seite "Start creating with Higgsfield Soul Cinema", Cursor fährt zum Prompt-Feld | |
| 10:30 bis 10:33 | Tippt Zeichen für Zeichen: "matte navy energy drink can, studio packshot, one warm key light". Cursor bleibt am Feld | "ad creatives" |
| 10:34 | Video-Seite "Make videos in one click" | "and video clips" (ca. 10:30 bis 10:32) |
| 10:35 bis 10:37 | Seite "MCP & CLI" / "Higgsfield plugin for ChatGPT" mit Tabs ChatGPT, Claude, Claude Code | "the MCP connector, which lets Astra and Fable connect" (10:32 bis 10:35) |
| 10:38 | Schnitt auf echte Codex-App-Aufnahme (Astras "Odd Hour"-Dose) | "invent an energy drink, a brand" |

Auffällig: Der getippte Prompt beschreibt Fables eigenes Produkt aus der Ad-Runde (mattschwarze/navy "Small Hours"-Dose, warmes Licht). Der Skript-Autor kannte also den Inhalt des Videos.

Der Hand-Cursor bei 10:34 auf "Choose preset" gehört vermutlich zur Illustration der Higgsfield-Seite selbst, nicht zum Skript.

## Pipeline

Legende: [B] = belegt (im Video sichtbar oder von Brad gesagt), [N] = Newsletter-Aussage, [I] = abgeleitet.

### Brads bestehende Editing-Pipeline (Kontext)

Quelle: sein Video "My Claude Code Edits FULL Videos in One Shot" (https://www.youtube.com/watch?v=mlhhZSHIS-w, 2026-08-06).

1. Skript als Word-/Google-Doc mit Kommentaren pro Zeile (Musik, Zooms, welche Grafik, Referenzbilder). Das ist die B-Roll-Cue-Quelle. [B]
2. WhisperX lokal: Transkript mit Zeitstempel auf jedem Wort, "sub-second timings for every single word". [B]
3. FFmpeg: Rough Cut (Stille, Versprecher, Füllwörter raus), später Audio, Musik, SFX. [B]
4. B-Roll: Claude legt vorhandene Screen-Recordings dort an, wo das Skript sie verlangt. Fehlt Material, generiert es B-Roll über Higgsfield MCP. [B]
5. HyperFrames (HTML/GSAP) für alle Grafiken, Szenenwechsel, Captions, Compositing. [B]
6. Review-Loop: Subagents schauen den Render mit dem `watch`-Skill Frame für Frame an, melden Fehler, Claude fixt und rendert neu. [B]
7. Taste-Skill für Design-Regeln, Style-Datei, in die jede Korrektur zurückgeschrieben wird. [B]

### Neu: Browser-B-Roll (Newsletter plus Frames)

1. **Cue erkennen.** Eine Skriptzeile nennt eine Webseite, für die keine Aufnahme existiert (hier: Sponsor-Read Higgsfield). [N] Wie der Cue markiert wird (Doc-Kommentar oder Agent-Entscheidung), ist offen. [I]
2. **Wortzeiten holen.** Für den Satzbereich liegen WhisperX-Wortzeiten vor. [B für die Pipeline, I für diese Nutzung]
3. **Shot-Liste ableiten.** Pro Schlüsselwort ein Browser-Beat: "models in one place" → Startseite plus Scroll, "product photos" → Klick "Image" und Packshot-Prompt tippen, "video clips" → Video-Seite, "MCP connector" → MCP-Seite. Die Frames zeigen genau diese Zuordnung mit ca. 0 bis 1 s Versatz. [B für die Zuordnung, I für die Methode]
4. **Skript schreiben und Chrome starten.** Fable schreibt ein kleines Browser-Skript und startet Chrome. [N] Die fehlende Browser-Leiste und die exakte 16:9-Füllung sprechen für einen festen Viewport und Aufnahme des Seiteninhalts (Playwright `recordVideo`, CDP-Screencast oder Screenshot-Sequenz). [I] Welche Bibliothek, sagt Brad nirgends. Playwright liegt nahe, weil Fable in derselben Session "shoot.js" für Screenshots und Browser-Tests anlegt. [I]
5. **Menschlich bedienen.** Landen, scrollen, klicken, tippen. [N, B] Scroll ist weich, der Cursor bewegt sich über Zwischenpunkte statt zu springen, Tippen läuft zeichenweise über ca. 3 s. [B]
6. **Eigener Cursor.** Headless Chrome rendert keinen System-Cursor, darum zeichnet das Skript einen. [N] Aussehen: macOS-Pfeil, schwarz mit weißem Rand. [B] Ob als DOM-Overlay in die Seite injiziert oder später aus geloggten Koordinaten im Compositing eingefügt, ist nicht erkennbar. Ein Klick-Ripple ist in den Crops nicht sichtbar. [I]
7. **Sync zum Transkript.** "Synced it perfectly with his transcript." [N] Zwei mögliche Wege: Wartezeiten im Skript direkt aus den Wortzeiten, oder freie Aufnahme plus Schnitt/Time-Remap pro Beat. [I] Der harte Seitenwechsel zwischen Image, Video und MCP deutet eher auf Beats hin, die einzeln gesetzt oder geschnitten sind. [I]
8. **Einbau in den Edit.** Composite in HyperFrames: Facecam-PiP unten links, bei Block A Info-Karte und PiP der Gegenseite, Zoom-out-Übergänge, Split-Screen. [B für das Aussehen, I für HyperFrames an genau dieser Stelle]
9. **QA.** Watch-Skill-Review des Renders wie im restlichen Pipeline-Setup. [I]

Block A (Landing Pages ohne Cursor) läuft wahrscheinlich über denselben Mechanismus: kein Browser-Chrome, programmatische Slider- und Toggle-Bedienung ohne Cursor, 12 Farbvarianten desselben Heros als Raster. Das spricht für automatisierte Captures der lokal gebauten Seiten. [I] Brad nennt 8:05 bis 10:30 insgesamt als Bereich der Fable-Aufnahmen. [N]

## Folgerungen für den Nachbau

- Browser-Automation: Playwright (Chromium, fester Viewport 1920x1080, `recordVideo` oder Screenshot-Sequenz mit 30 fps für deterministisches Timing).
- Cursor: DOM-Overlay per `addInitScript`, das `mousemove`/`mousedown` spiegelt, Bewegung als Ease-Kurve über 20 bis 40 Zwischenpunkte, kleiner Klick-Puls. Alternativ Koordinaten loggen und den Cursor in HyperFrames zeichnen. Das hält die Aufnahme sauber und macht den Cursor nachträglich änderbar.
- Tippen: `keyboard.type(text, { delay: 40-80 })`.
- Timing: Shot-Liste als JSON mit `{wort_start, aktion, ziel}` aus den WhisperX-Wortzeiten. Jeden Beat einzeln aufnehmen und in HyperFrames auf `wort_start` setzen. Das ist robuster als ein einziger Echtzeit-Lauf, weil Ladezeiten der Seite den Sync nicht zerstören.
- Deutsch: WhisperX mit deutschem Alignment-Modell. Cookie-Banner (DSGVO) vor der Aufnahme per Skript wegklicken oder ausblenden, sonst ruinieren sie jeden Shot.
- Layout-Muster aus Brads Video: Seite formatfüllend, Facecam-PiP, Info-Karte, Zoom-out auf Split-Screen für Vergleiche, Textmarker über Prompt-/Skripttext synchron zu gesprochenen Phrasen.

## Offene Fragen

1. Welche Bibliothek schreibt Fable (Playwright, Puppeteer, reines CDP)? Nicht belegt.
2. Wird der Cursor in die Seite injiziert oder im Compositing gezeichnet?
3. Echtzeit-Aufnahme mit Waits aus Wortzeiten oder Aufnahme pro Beat mit nachträglichem Schnitt?
4. Wie entsteht der Cue: Kommentar im Skript-Doc oder erkennt der Agent selbst "hier fehlt Bildmaterial"?
5. Läuft das als eigener Skill in Brads Video-Editor-Projekt? Ein öffentliches Repo gibt es nicht. Möglicherweise steht es im "video editing playbook" hinter seinem Kit-Opt-in (nicht geprüft, erfordert E-Mail-Eintrag).
6. Sind die Landing-Page-Aufnahmen (Block A) wirklich skriptgesteuert oder Fables eigene QA-Captures aus der Build-Session ("shoot.js"), die weiterverwendet wurden?
7. Aufnahme-Auflösung: Der Download lag bei 1280x720. Ob Brad in 1080p oder 4K aufnimmt, ist offen.
