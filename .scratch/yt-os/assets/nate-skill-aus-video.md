# Nate Herk: vom Lieblingsvideo zum Skill, und was davon für Video 1 fehlt

Stand: 2026-09-26. Quellen: Captions und Frames (1024 px, gezielt an Prompt-Stellen) aus vier Nate-Videos, dazu Chris' Style-Packs, Skills und das video-editor-Repo.

Kennzeichnung: **[Fakt]** = im Video gesehen oder gehört, bzw. in Chris' Dateien gelesen. **[Schluss]** = meine Folgerung.

## Kurzfassung

1. [Fakt] Nates ganzer "Video zu Skill"-Schritt ist **ein einziger Prompt**: Referenzvideo lokal laden, Pfad an Claude Code geben, "analysiere, warum das gut ist (Design, Pacing, Frame-Typen, Energie), bau daraus einen Skill, teste ihn sofort an meinem Thema". Danach iteriert er und lässt Feedback in den Skill zurückschreiben.
2. [Fakt] Wo Edits hinkommen, sagt Nate **per Diktat entlang des Transkripts**: "Wenn ich X sage, soll links Y kommen, mit Glas-Karte dahinter." Er zeigt schon beim Dreh mit der Hand auf die Seite, wo später die Grafik kommt.
3. [Fakt] Aus dem Diktat macht der Agent im Plan-Modus eine **Beat-Tabelle mit Ankerwort** (id, Start, Dauer, Ende, Ankerwort mit Zeit, gesprochene Phrase). Die gibt Nate frei oder kommentiert sie. Das ist die Cue-Liste.
4. [Fakt] Sein "Make a Video"-Skill **interviewt** vor dem Bau über AskUserQuestion: Format, Kürzen ja/nein, Transkript, Hero-Metapher, Untertitel, Facecam-Behandlung. Jeweils mit empfohlener Option.
5. [Fakt] Chris hat mehr, als die Map sagt: Unter `/Users/cristobalcallejongarcia/dev/YouTube-os/video-editor/` liegt schon eine 16:9-Langform-Pipeline (rough-cut, graphics, broll, finishing, export, drei Langform-Styles, Cutsheet-Schema). Es fehlt die Brücke: das Interview, das Nates Vokabular (N01 bis N38, ELEMENTS-Blöcke) Abschnitt für Abschnitt als Auswahl anbietet und in das vorhandene Cutsheet schreibt.

## 1. Hauptvideo: "Opus 5.5 Just Changed Video Editing Forever (free skills)"

https://www.youtube.com/watch?v=7jHXoPGnA4c, Nate Herk | AI Automation, 19:22.

### Werkzeuge [Fakt]

- Claude Code (Desktop-App, Opus 5.5, Effort "High") mit `/goal "<pfad zum video>"` plus Freitext-Prompt. In anderen Videos Codex mit GPT-6 Astra, gleiche Methode.
- HyperFrames (HeyGen, HTML plus Animation) als Motion-Tool. Einrichtung: GitHub-URL an Claude Code geben, "set up Hyperframes" (1:14).
- Transkription: ElevenLabs API (schneller, kostet) oder Whisper (lokal, gratis) (1:51).
- Assets: kie.ai für Bilder, Kling für Bild-zu-Video, Suno für Musik, ElevenLabs für SFX (laut Skill-Beschreibung bei 6:15 und Erzählung bei 6:21).
- Kein Remotion in diesem Video. Nates Vergleich steht in Video A unten.
- Gratis verteilt über seine Skool-Community: "Hyperframes Student Kit" und den Skill `motion-showreel` (1:32, 6:05). Nicht heruntergeladen.

### Der Prozess Schritt für Schritt

| # | Schritt | Was Nate tut | Zeit |
|---|---|---|---|
| 1 | Referenz finden | Ein Showreel von "Ken" auf X gesehen, lokal heruntergeladen | 5:08-5:25 |
| 2 | Analyse, Skill und Test in einem Prompt | `/goal "C:\...\IYRg_90_9HSaKOI9.mp4"` plus Prompt (Wortlaut unten) | 5:25-5:59, Prompt lesbar bei 5:30 |
| 3 | Agent baut den Skill | `.claude/skills/motion-showreel/` mit `SKILL.md`, `references/`, `scripts/`, `templates/`. Laut Agent-Log: "reference breakdown, design grammar, chapter library, beat-grid planner, reference analyzer, HUD template". Parallel: Research-Agent zum YouTube-Brand, Projektordner, Suno-Track mit 128 BPM | 6:05-6:20 |
| 4 | Sofort-Test am eigenen Thema | 15-Sekunden-Showreel über YouTube. Agent holt Logos von Wikimedia, generiert Standbilder (3D-Play-Button), schickt sie an Kling für Bewegung | 4:20-4:53, 6:21-6:55 |
| 5 | Iterieren, Feedback zurück in den Skill | "In this version I really liked this and I really didn't like this. Update the skill with that information, run it again." Und: "If you ever find yourself repeating something, just throw it in the skill." | 17:41-18:03 |

Prompt aus Schritt 2 (vom Bildschirm abgeschrieben, 5:30):

> Analyze this video, which was created by Opus 5.5. Figure out why this is so good when it comes to the design, when it comes to the pacing and the types of frames and the energy that it gives off. And then create a skill around this sort of design and motion design.
> Then test it out by using this skill. Create me a 15 second reel, showreel, based on this skill that we've created about YouTube. So do research on YouTube, collect any B-roll images, any assets that you need. Make sure the whole reel feels branded to YouTube. [...]

Skill-Beschreibung, die dabei entstand (6:15, gekürzt): "Design and build a 10-30 second motion-design showreel in the style of [Referenz]: one brand motif transformed through labeled craft chapters, a persistent HUD, cuts locked to a 128-ish BPM grid, a sub-second flurry, and a held logo lockup [...]. Use when someone asks for a showreel, sizzle reel [...] or wants to study why a reference reel works and rebuild that energy for another brand."

[Schluss] Der Skill hält **Regeln und Rhythmus** fest (Motiv, Kapitel, BPM-Raster, Haltezeiten), nicht nur eine Liste von Animationen. Genau das fehlt Chris' ANIMATIONS.md für Langform: dort stehen 38 Muster, aber kein Pacing.

### Die fünf Schritte, die Nate immer denkt (16:12-18:47) [Fakt]

1. Transcribe (damit Beats auf den Punkt kommen und die KI die Story versteht)
2. Cut (Fehler, Totzeit raus)
3. Plan the beats ("at this point I want this to come in")
4. Use skills (aus Referenzen bauen, nach jedem Lauf verbessern)
5. Verification loop (Agent rendert, schaut Screenshots an, korrigiert selbst, erst dann an Nate)

### Wie Nate sagt, wo Edits hinkommen [Fakt]

Intro-Prompt (1:51-3:25, lesbar bei 1:51, 2:20, 3:08). Aufbau:

1. Stil in einem Satz: "super engaging and clean with hyperframes. We need Apple style super clean motion graphics."
2. Reihenfolge: erst transkribieren, dann bauen.
3. Pro Stelle ein Satz nach dem Muster **Zitat, Was, Wo, Lesbarkeit**: "When I say super powerful models like Fable 5.1 and GPT-6 Astra [...] have animations come in where I'm pointing. So when I say Fable 5.1, I point to the left side of the screen [...] that should be the Claude logo [...] spinning [...] liquid glass card behind this element [...] Otherwise, it will be hard to read."
4. Pauschalregel für den Rest: "For the rest of the video, when I'm talking about B-roll and screenshots [...] have things come in on the left and right sides of the screen [...] overlay behind or liquid glass."
5. Zweck: "prove to the viewers that you're capable of doing all this."

Beim Dreh zeigt Nate mit der Hand auf die Seite, wo die Grafik kommen soll (2:19, Frame bei 2:56 zeigt die Karten genau dort). Der Agent ergänzte ungefragt: leichter Zoom am Anfang, Claude-Interface-Grafik, Verifikations-Animation (3:25-4:09). Bei 1:00 sieht man die Selbstprüfung: "I found three issues: the bottom text overlaps your shirt logo, the B-roll scroll doesn't land on the README logo, and the GPT-6 Astra card overflows."

### B-Roll und Talking Head [Fakt]

- B-Roll holt der Agent selbst: Screen-Recording, Screenshot, generiertes Bild, generiertes Video (3:03-3:47). Immer mit Overlay oder Glas-Karte dahinter, links oder rechts neben dem Gesicht.
- Kursvideo-Stil (12:10-12:45, Prompt lesbar bei 12:25): Kamera am Anfang Vollbild, danach ovaler Rundausschnitt unten rechts mit Schlagschatten, dunkler ruhiger Hintergrund, große Stichpunkte, KI-Bilder als Bildhilfen. Ergebnis bei 13:00: "STEP 01 / Crisp the toast", Vergleichskarte, Facecam-Oval unten rechts.
- Whiteboard-Stil (10:53-11:15): manche Szenen Vollbild-Whiteboard, manche links Whiteboard, rechts das Gesicht (mittig beschnitten).

## 2. Weitere Nate-Videos zu B-Roll und KI-Schnitt

Gefunden per `yt-dlp ytsearch`. Drei relevante, Transkripte vollständig gelesen, Frames an den Schlüsselstellen.

### A. "Claude Video Editing Just Became Unrecognizable" (Aw3BkmhYu4I, 23.04.2026, 28:13)

https://www.youtube.com/watch?v=Aw3BkmhYu4I. Das relevanteste für 16:9 mit Talking Head.

- [Fakt] Pipeline: Rohdatei → "Video Use" (GitHub-Repo, schneidet Füllwörter, Stille, Retakes) → HyperFrames → Render (1:07-2:42). Video Use kann auch komplett mit Remotion animieren. Nate findet HyperFrames schöner (7:21-9:04).
- [Fakt] Beim Rohschnitt stellt der Agent **"taste calls"** als Rückfrage: "There's a trailing 'so' at 42:20. Do you want to leave this as a natural breath or get rid of it?" (12:18). Das ist schon ein Mini-Interview.
- [Fakt] Transkript als JSON mit Wortzeiten, Grundlage für jede Platzierung (13:54-14:27).
- [Fakt] **Platzierung per Diktat beim Anschauen**: Nate spielt den geschnittenen Clip ab und spricht per Voice-to-Text Abschnitt für Abschnitt, was kommen soll (14:27-16:40). Beispiel: "At the beginning when I say 'this is the example video' [...] pop up a liquid glass style card on the left half of the screen [...] karaoke style subtitles [...] like a title of a video."
- [Fakt] **Plan-Modus als Cue-Liste** (17:13-19:23, Frames bei 18:40 und 19:10): Abschnitte `S1 INTRO 0.00 → 5.54`, `S2 SETUP 5.54 → 12.10` usw., dann eine Tabelle mit den Spalten `Beat | id | Start | Dur | End | Anchor word (edited) | data-anchor`. Beispielzeile: `A | b01-title | 0.30 | 5.00 | 5.30 | "this" @ 0.47 | "this is going to be the example video"`. Darunter pro Beat: Position, gestapelter Inhalt, Schriftgrößen, Timing, Verweis auf ein `MOTION_PHILOSOPHY`-Dokument. Nate kann markierte Plan-Stellen kommentieren und "Revise" klicken.
- [Fakt] Feedback nach Zeitstempel, wie an einen menschlichen Editor (23:07-23:39).
- [Fakt] "All of these videos are training data." Nach fünf Lektionen: "Build a lesson design markdown philosophy file" (20:26-21:31). Projektordner pro Video mit `assets/` (Clips, Transkripte), `compositions/` (Beats als HTML), `components/`, Renders und Verifikations-Screenshots (26:21).
- [Fakt] Kosten des Beispiels: rund 238.000 Tokens für 32 Sekunden (27:24).

### B. "Claude Just Destroyed Every Video Editing Tool" (ZNbgOhxhzXg, 18.04.2026, 32:00)

https://www.youtube.com/watch?v=ZNbgOhxhzXg

- [Fakt] Skill **"Make a Video"** mit acht Gates (19:05-20:09, Frame bei 20:15): Gate 1 Intent & format. Gate 2 Script & voice (transcribe face-cam, captions plan). Gate 3 Style intake (AIS brand vs MOTION_PHILOSOPHY defaults). Gate 4 Write BRIEF.md and wait for approval. Gate 5 Scaffold project + storyboard (route to /short-form-video if 9:16). Gate 6 Build compositions. Gate 7 Lint + Studio preview gate. Gate 8 Draft render → frame verify → MP4 preview → final.
- [Fakt] Interview-Fragen mit Optionen und "(Recommended)" (20:09-21:50):
  - "What is Golden Ratio Demo going to become? This routes the entire build." Optionen: AIS lesson (16:9, face + MG overlays), AIS short (9:16), Promo/hype piece (16:9).
  - Duration (ganz behalten oder kürzen), Transcribe (ja/nein).
  - "Hero visual metaphor: what carries the 'golden ratio' idea visually across the whole piece?" Drei konkrete Motive zur Wahl.
  - Captions (Nate: nein, nur Audio).
  - "Face-cam treatment?" Corner PiP throughout (Recommended) / Full-screen for intro + outro, corner for middle sections / Full-screen throughout with floating MG overlays.
- [Fakt] Rohschnitt macht Nate oft selbst, weil die KI Neuanfänge schlecht erkennt (22:22-23:27). Das widerspricht Video A teilweise; dort klappte es mit Video Use.
- [Fakt] Bei 263.000 Tokens lässt er sich eine Übergabe schreiben, leert die Session und gibt dann Feedback (25:35-26:41).

### C. "GPT-6 Astra Finally Solves AI Video Editing" (o3IEkKXXXvo, 08.09.2026, 29:58)

Die Quelle von Chris' Style-Pack. Zwei Teile sind für Video 1 wichtiger, als ANIMATIONS.md sie behandelt:

- [Fakt] **16:9-Langform-Tutorial** (1:26-3:03, Frames bei 1:40 und 2:15): 14:30 Rohmaterial → 9:09. Facecam und Screen-Recording, synchronisiert über die Facecam-Tonspur. Layout: gerundete Facecam-Kachel links, Bildschirm rechts, Hintergrund mit 50 % Deckkraft. Wenn nichts auf dem Bildschirm passiert, zoomt der Schnitt auf die Kamera im Vollbild. Zwischen den Konzepten Kapitel- bzw. Übergangskarten. Codex legte dafür einen "YouTube Tutorial Edit skill" an, mit `scripts/analyze.py`, `scripts/plan.py`, `scripts/prepare_media.py`.
- [Fakt] Diktat-Briefing fürs Intro (17:05-22:37) nach demselben Muster wie oben, danach: "If you get an output here that you really, really like, you say: turn that into a skill. Next time you basically just say: edit this video, use this skill." (22:58-23:10)

## 3. Abgleich: was Nates Methode braucht, was Chris hat, was fehlt

Wichtig vorab [Fakt]: Neben den Style-Packs existiert `/Users/cristobalcallejongarcia/dev/YouTube-os/video-editor/` (Stand August). Dort gibt es einen Pipeline-Vertrag (`CLAUDE.md`), die Skills `rough-cut`, `graphics`, `broll`, `finishing`, `export`, drei 16:9-Styles (`atlantic-hybrid`, `glas-dunkel`, `heyreach-papier`) mit festem Szenen-Vokabular (`kopf`, `karte`, `tafel`, `spalten`, `demo`, `takeover`, `zitat`, `badge`) und ein Grafik-Cutsheet-Schema (`id, start, end, kind, scene, direction, notes`), erprobt an drei Testprojekten. Die Map nennt nur die Style-Packs. Für Ticket 12 (Editor-Spec) ist das der Ausgangspunkt.

| Nate-Schritt | Chris hat | Fehlt |
|---|---|---|
| Referenz laden und zerlegen | `style-extract`-Skill, `/watch`, `ANIMATIONS.md` (38 Muster mit deutschen Regie-Sätzen), `atlas.html`, `techniques.json` | Pacing-Werte. Nate fragt "warum gut: Pacing, Frame-Typen, Energie". Chris' Analyse fragte nach Animationstypen. Für Langform fehlt z. B.: wie oft wechselt das Layout pro Minute, wie lange steht das Gesicht allein |
| Skill aus der Analyse bauen | Style-Packs (STYLE.md, 29 Blöcke in `_elements/`), 16:9-Styles im video-editor | Eine Zuordnung von N01-N38 und den Blöcken zu den 16:9-Szenennamen. Heute sind es zwei getrennte Vokabulare |
| Sofort am eigenen Thema testen | `V8-EDITPLAN.md` (Finanz-Reel, 9:16) | Kein 16:9-Test mit Nates Glas-Sprache. [Schluss] Die Muster N03 bis N13 stammen aus Nates 16:9-Intro und -Tutorial (Glas-Karten, PiP, Kapitelkarte, Raster). Sie passen direkt zu Video 1, wurden aber bisher nur für ein Reel übertragen |
| Transkript mit Wortzeiten | `rough-cut` (WhisperX, `--language de`, Mishear-Liste in brand.md) | Nichts |
| Schneiden | `rough-cut` (Cutsheet mit Textfeld, ein FFmpeg-Filtergraph) | Optional: Nates "taste calls" als Rückfrage bei Zweifelsfällen |
| Format- und Stil-Gates | Pipeline-Vertrag, Style-Wahl pro Job | Die Gate-Fragen (Format, Facecam-Behandlung, Untertitel, Hero-Metapher) als festes Interview |
| Beats planen: wo kommt was hin | `graphics` Plan-Hälfte (entscheidet selbst aus Docx-Kommentaren und `broll-notes.json`, Default "keine Grafik"), V8 Mini-Briefing mit 6 Fragen | **Das Edit-Interview**: pro Abschnitt Vorschläge mit Ankerzitat und 2-3 Optionen aus dem Vokabular, Chris wählt. Dazu die Plan-Freigabe als lesbare Tabelle mit Ankerwort (Nates Plan-Modus). Das ist Ticket 07 |
| B-Roll beschaffen | `broll`-Skill (KI-B-Roll über Bench Studio mit Kosten-Gate), Ticket 08 (Recorder-Vergleich) | Screen-B-Roll. Konflikt: `atlantic-hybrid/style.md` sagt bei `demo` "Chris nimmt keine Screen-Recordings auf", Video 1 soll Screen-B-Roll haben. Muss in Spec oder Style geklärt werden |
| Selbstprüfung | Regel 10 "Give it eyes", zweistufiger Review in `graphics` | Nichts |
| Feedback zurück in den Skill | `style.json → learned` (Regel 9) | Für das Interview: Chris' Auswahl als Default für das nächste Video speichern (welche Muster er wählt, welche er immer ablehnt) |
| Timing per Timeline nachziehen | HyperFrames-Preview (gepinnt 0.7.98) | Nicht geprüft, ob der Timeline-Editor aus Nates Videos in 0.7.98 drin ist |

### 16:9-Langform: was sich gegenüber den Reels ändert [Schluss]

- Nicht jede Zeile bekommt etwas. Nate lässt bei Langform das Gesicht tragen und wechselt nur, wenn es etwas zu zeigen gibt. Der `graphics`-Skill hat denselben Default. Für 10-12 Minuten und 6 Stufen heißt das grob: pro Stufe eine Kapitelkarte, 2-4 Grafik-Beats, 1-2 Screen-Stellen.
- Drei Layout-Ebenen reichen für Video 1: Gesicht voll mit Glas-Karte daneben (Nates Intro), Spalten mit gerundeter Kachel und Bildschirm (Nates Tutorial), Vollbild-Tafel bzw. Kapitelkarte. Die Namen gibt es schon in `atlantic-hybrid`.
- Die Reel-Muster mit hohem Tempo (N16, N25, N38) gehören in Langform an Hook und Kapitelwechsel, nicht in die Mitte eines Abschnitts.
- Für den Dreh am 27.09 (Ticket 06): Nate zeigt beim Sprechen auf die Seite, wo später die Grafik kommt, und lässt dort Platz im Bild. Das kostet beim Dreh nichts und nimmt dem Interview eine Frage ab.

## 4. Input für Ticket 07 (Edit-Interview)

### Ablauf [Schluss, abgeleitet aus Nates Gates und Plan-Modus]

1. **Voraussetzung:** `transcript.json` mit Wortzeiten und Rohschnitt aus `rough-cut`. Abschnitte kommen aus dem Skript (Hook, Stufe 1 bis 6, Bonus, CTA).
2. **Globale Fragen einmal pro Video** (Fragen 1 bis 4 unten).
3. **Pro Abschnitt:** Der Skill liest den Abschnitt, schlägt 2-3 Stellen mit wörtlichem Ankerzitat vor, je Stelle 2-3 Optionen aus dem Vokabular plus "nichts". Eine Option ist als empfohlen markiert. Vorschau als Atlas-Link oder Screenshot des Blocks. Chris wählt, ändert oder sagt eine eigene Idee.
4. **Ergebnis:** `cues.json` (Maschine) und `cue-liste.md` (Chris). Danach Freigabe als HTML-Tabelle wie Nates Plan-Modus, dann übernimmt `graphics` den Build.
5. **Lernen:** Nach dem Video werden gewählte und abgelehnte Muster in `style.json → learned` übernommen, damit die Empfehlungen beim nächsten Video besser sitzen.

### Vorgeschlagenes Cue-Listen-Format

Maschinenlesbar, als Obermenge des vorhandenen Grafik-Cutsheets (`id, start, end, kind, scene, direction, notes`), damit `graphics` ohne Umbau weiterarbeitet:

```json
{
  "id": "c03-stufenleiter",
  "abschnitt": "Hook",
  "anker": { "zitat": "Die meisten stehen auf Stufe eins.", "wort": "Stufe", "t": null },
  "start": null,
  "end": null,
  "scene": "tafel",
  "kind": "diagramm",
  "muster": ["N12", "N23"],
  "block": "chip-timeline-card-stack.html",
  "was": "Sechs Stufen als Treppe, Stufe 1 leuchtet, die anderen gedimmt. Kommt bei jedem Kapitelwechsel wieder.",
  "wo": "voll",
  "asset": { "typ": "mockup", "status": "offen", "quelle": null },
  "entschieden": "vorschlag-angenommen",
  "direction": "wird aus was, wo und muster erzeugt",
  "notes": ""
}
```

Feldregeln:
- `anker.zitat` wörtlich aus dem Transkript, `t` und `start/end` füllt der Skill aus den Wortzeiten nach dem Dreh.
- `scene` nur aus dem Szenen-Vokabular des gewählten Styles, `kind` aus dem festen Set des `graphics`-Skills (`stat, karte, screenshot, takeover, zoom, diagramm, broll-slot`).
- `muster` verweist auf ANIMATIONS.md (N-Nummer), `block` auf ELEMENTS.md. Beides optional.
- `asset.typ`: `screen-recording | screenshot | mockup | generiert | keins`. Alle `screen-recording`-Zeilen ergeben die Aufnahmeliste für Ticket 08.
- `entschieden`: `vorschlag-angenommen | geändert | eigene-idee`. Daraus lernt der Skill.

Lesbare Fassung für Chris (Beispiele aus dem Skript von Video 1, Zeiten erst nach dem Dreh):

| # | Abschnitt | Anker (wörtlich) | Ebene | Muster | Was man sieht | Asset |
|---|---|---|---|---|---|---|
| c01 | Hook | "zwei Leute haben genau dasselbe Claude-Abo. Zwanzig Euro im Monat." | karte neben Gesicht | N04 | Zwei gleiche Abo-Karten "20 €" gestaffelt, darunter zwei verschiedene Ergebnisse | mockup |
| c03 | Hook | "Die meisten stehen auf Stufe eins." | tafel | N12, N23 | Sechs Stufen, Stufe 1 aktiv. Wiederkehrend als Kapitelkarte | mockup |
| c07 | Stufe 1 | "Du gehst auf claude.ai, tippst 'ne Frage rein" | spalten | N10 | Links echte claude.ai-Eingabe, rechts Gesicht in gerundeter Kachel | screen-recording |
| c15 | Stufe 3 | "Gib Cowork nicht deine ganze Festplatte." | karte | N19 | Regel-Notiz: "Ein Ordner. Nur die nötigen Dateien." | keins |

### Interview-Fragen

Einmal pro Video:

1. **Welcher Look?** `atlantic-hybrid`, `glas-dunkel`, `heyreach-papier` oder Nates Glas-Sprache. Mit je einem Vorschaubild.
2. **Wie wird dein Gesicht behandelt?** Vollbild mit Karten daneben / Spalten mit gerundeter Kachel / Wechsel: Vollbild bei Meinung und Geschichte, Kachel bei Bildschirm-Stellen (empfohlen). Nach Nates "Face-cam treatment".
3. **Untertitel?** Keine / nur Schlüsselwörter / wortweise.
4. **Was trägt das Video visuell von Anfang bis Ende?** Vorschlag: die Stufenleiter, die bei jedem Kapitel wiederkommt. Nach Nates "Hero visual metaphor".

Pro Abschnitt, jeweils nur für die vorgeschlagenen Stellen:

5. **"Hier sagst du '<Zitat>'. Soll an dieser Stelle etwas passieren?"** Nichts, das Gesicht trägt / Karte neben dir / Vollbild-Grafik / Bildschirm zeigen. "Nichts" steht immer zur Wahl.
6. **"Was soll der Zuschauer danach lesen oder behalten?"** Mit Vorschlag für den Endzustand, z. B. "20 € = 20 €, aber Ergebnis A ≠ Ergebnis B". Aus V8-Frage 4.
7. **"Zeigen wir das echt oder nachgebaut?"** Bildschirmaufnahme / Screenshot / nachgebautes Mockup / KI-Bild. Legt `asset.typ` fest und füllt die Aufnahmeliste.
8. **"Welche Bewegung passt?"** A, B oder C mit N-Nummer und Atlas-Link, eine empfohlen. Beispiel: "A gestaffelte Karten (N04), B großes Schlüsselwort (N25), C Checkliste baut sich auf (N18)".

Zum Schluss:

9. **"Diese Abschnitte haben keinen Vorschlag bekommen: <Liste>. Fehlt dir da was?"**
10. **Freigabe der Tabelle:** "Passt das so? Einzelne Zeilen kannst du kommentieren." Erst danach baut `graphics`.

Regeln fürs Interview [Schluss]: höchstens drei Optionen plus "nichts", immer eine Empfehlung, nie nach etwas fragen, das sich aus den Frames ablesen lässt (etwa auf welche Seite Chris zeigt), ein Abschnitt pro Runde.
