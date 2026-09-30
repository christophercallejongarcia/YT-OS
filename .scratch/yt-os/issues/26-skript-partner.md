# Skript-Partner: Einstieg in die Skript-Kette, zwei Fassungen, Wortlaut nach Simtent

Type: task
Status: resolved

## Question

Wie wird aus der Skript-Kette ein Ablauf, dessen Ergebnis vom Teleprompter vorgelesen nicht nach KI klingt, auch im Hook? Auftrag vom Captain an Tag 6 (30.09.), mit fünf Entscheidungen von Chris:

1. Zwei Fassungen pro Skript, Chris testet und entscheidet später. Fassung A (Simtent-Hybrid): Hook, Elevator Pitch und kurze Vorstellung Wort für Wort, danach pro Kapitel ein Mini-Hook und 3 bis 5 Stichpunkte, Aufnahme Kapitel für Kapitel. Fassung B: alles Wort für Wort wie bei Video 1.
2. Drei Eingänge, pro Video gewählt: nur Outlier (3 bis 5 URLs, Hauptweg), Outlier plus Brain Dump, nur Brain Dump. Beim Mix nicht kopieren, sondern ein eigenes Video bauen und ableiten, warum die Outlier funktionieren.
3. Neuer Einstiegs-Skill `skript-partner`: spielerischer Interviewer. Fragt das Thema ab, nimmt URLs und Brain Dump im Chat entgegen, klärt zuerst Thumbnail-Botschaft, Titel und Hook (sie müssen zusammenarbeiten) in mehreren Grilling-Runden und steuert danach die bestehende Kette.
4. Wortlaut nach Simtents Vorgehen, in eigenen Worten, nicht aus dem Dreh-Transkript von Video 1. Wo Chris per Brain Dump spricht, bleibt sein Wortlaut.
5. text-check bekommt eine Prüfung auf KI-Klang beim Vorlesen und einen einfachen Vorlesetest für Chris.

Grenze: `.claude/skills/skript-*`, `sprechfassung/`, `text-check/`, `substrate/skript-geruest.md`, `substrate/skills.md`, dieses Ticket, ein Eintrag in der Map. Nicht anfassen: `videos/01-stufenleiter/`, Ticket 09 und 20.

## Abnahme

- `skript-partner` existiert und steuert die Kette
- die Kette liefert Fassung A und B
- Simtent-Regeln in eigenen Worten eingebaut, kein Simtent-Text im Repo
- Probelauf mit 3 Outlier-URLs zum Thema von Video 1, Ablage nur in `private/`, text-check bestanden
- `skills.md`, `skript-geruest.md`, Ticket und Map aktualisiert

## Answer

Die Skript-Kette hat einen Einstieg und zwei Fassungen. Gebaut am 30.09.:

- `.claude/skills/skript-partner/`: spielerischer Interviewer. Fragt Thema und Eingang ab (Outlier, Outlier plus Brain Dump, Brain Dump), spielt beim Brain Dump Advocatus Diaboli, klärt Versprechen, Thumbnail-Botschaft und Titel in Runden und stellt 2 bis 3 Hook-Varianten nebeneinander, jede vorab durch vorlese-check und slop-lint. Chris wählt eine oder testet zwei. Schreibt `packaging.md` und steuert danach die Kette mit Stopp nach jeder Stufe. Steigt wieder ein, wo die Kette steht.
- `skript-mix`: drei Eingänge, `packaging.md` ist Pflicht. Pro Outlier wird abgeleitet, warum er funktioniert. Brain-Dump-Stellen behalten Chris' Wortlaut und sind markiert.
- `skript-anreichern`: Hook, Pitch und Brain Dump bleiben unangetastet. Anleitung, wie EA Brain erreichbar ist, wenn die Session die Tools nicht sieht.
- `sprechfassung`: liefert `skript-v4a-hybrid.md` (Hook, Pitch, Mini-Hooks und CTA wörtlich, sonst 3 bis 5 Stichpunkte pro Kapitel, Clip-Marken) und `skript-v4b-wortlaut.md`. Die Wortlaut-Regeln nach Simtent und der Talking-Head-Messung stehen in eigenen Worten im Skill. `regeln.md` ist geleert und sammelt nur noch Chris' Markierungen.
- `text-check`: neues Skript `scripts/vorlese-check.py` misst den KI-Klang beim Vorlesen, gesamt und im Hook. Hart: Stakkato, Median unter 11, mehr als 20 Prozent kurze Sätze, Selbstfrage mit Antwort, binärer Kontrast, "Punkt." am Satzende. Weich: Doppelpunkt-Enthüllung, Dreierliste, gleicher Satzanfang, Satz über 35 Wörter, Median über 20. Dazu Sprechdauer und der Küchentisch-Test für Chris.
- `substrate/skript-geruest.md`: Packaging vorab, Pitch mit Vorstellung als ein Block (Vorlage drin, Chris gibt beim ersten Vorlesen frei), Mini-Hook pro Kapitel, Fassungen A und B. `substrate/skills.md`: skript-partner als Stufe 0 und die neuen Dateinamen.

Titel und Thumbnail vorab oder am Ende: Mark Kashef entscheidet beides erst nach dem Schnitt, nutzt aber Packaging-Muster schon am Anfang (EA Brain, Kommentar in "Video Editing and AI Workflows", 14.07.2026). Simtent legt die Thumbnail-Botschaft vor dem Hook fest. Entschieden: Botschaft und Arbeitstitel vorab, weil der Hook sie einlösen muss, fertiges Thumbnail und Titel-Tests nach dem Schnitt.

Probelauf mit Pav Rusovs (Zs3faMCDYNs), Metics Media (9oJySubZRSA) und Torben Platzer (sAQdRSqXxXQ), Ablage nur in `YT-OS/private/probelauf-26/`. Chris hat Versprechen und Thumbnail gewählt, beim Titel drei Varianten, bei den Hooks V1 und V2 zum getrennten Test. Die Kette lief komplett, v2 mit EA Brain. text-check: beide Fassungen bestanden, 0 harte Treffer. B: Median 17 Wörter, 5 Prozent kurze Sätze, etwa 16 Minuten. Zum Vergleich Video 1: Median 9, 33 Prozent. Offen bleibt Chris' Küchentisch-Test der Hooks.

Befunde aus dem Probelauf:
- Dispatch bekommen neue Nutzer nicht mehr (begrenzte Beta), Cowork läuft inzwischen auch im Web und in der Handy-App (Anthropic-Hilfe, abgerufen 30.09.). Video 1 nennt Dispatch als Funktion für alle.
- Die erste Hook-Runde lag bei einem Median von 25 bis 32 Wörtern, also überkorrigiert. Daraus entstand die weiche Obergrenze.
- Fassung B ist mit etwa 16 Minuten länger als das Ziel von 10 bis 12 Minuten. Gekürzt wird künftig in v1 bis v3.

## Comments

### 2026-09-30 Übergabe an einen neuen Cook

Der erste Cook hat gelesen und gegrillt, aber noch nichts gebaut. Er übergibt, weil der EA Brain MCP in seiner Session nicht geladen wird. Harte Prüfung: `claude mcp list` meldet "Connected", aber die Session hat keine EA-Brain-Tools, und ein frischer `claude -p` meldet "nicht autorisiert". Der neue Cook prüft als Erstes per ToolSearch nach `search_community_knowledge`. Fehlt es auch dort, meldet er das dem Captain und arbeitet ohne EA Brain weiter.

**Arbeitsort.** Branch `worktree-ticket-26-skript-partner`, Worktree `.claude/worktrees/ticket-26-skript-partner` (per EnterWorktree mit `path` betreten). Stolperfalle: Eine Session, die auf einen Worktree beschränkt ist, darf nicht in den Hauptordner schreiben. Die Probe-Fassungen deshalb in `private/probelauf-26/` im Worktree ablegen (per `.gitignore` ausgeschlossen) und vor dem Aufräumen des Worktrees nach `YT-OS/private/probelauf-26/` im Hauptordner kopieren. Shell-Befehle mit Variablen oder Schleifen lehnt die Isolation teilweise ab. Dann einfache Einzelbefehle nutzen oder ein Skript im Worktree anlegen.

**Gelesene Quellen (nur lokal, nie ins Repo):**
- Simtent-Kurs `YouTube-os/simtent-training/08_skripterstellen/`: 13 (Skript in zwei Varianten), 14 (Aufnahme Stück für Stück), 16 (vereinfachte Struktur), 17 (Gedanken transkribieren), 20 (Thumbnail-Botschaft zuerst), 21 (Hook), 22 (Elevator Pitch), 24 (Punkte mit eigenem Spannungsbogen)
- `chriscasa/YT-CommandCenter/simtent/skript-psychologie/`: `sprachstil-denis-kasper.md`, `skript-beispiel-stichpunkte.md`
- Mark, AI-OS-Masterclass (`chriscasa/knowledge/harness-notebook/transcripts/ai-os-engineering-masterclass.md`, Abschnitt Content): Hook fließend, in 30 bis 40 Sekunden sprechbar, möglichst ohne Formel, keine Hype-Wörter. Zuschauer-Personas melden, wo es langweilig wird oder zu viel verspricht. Zu seinem Brain-Dump-Weg lag lokal nichts, das soll aus dem EA Brain kommen.

**Simtents Regeln, in eigenen Worten verdichtet (Grundlage für den Skill):**
1. Reihenfolge: Idee, dann Thumbnail-Botschaft (ein kurzer Satz), dann Titel, dann Hook. Der Hook löst in den ersten Sekunden ein, was Thumbnail und Titel versprechen. Passt das nicht zusammen, springt der Zuschauer ab.
2. Hook immer ausschreiben, auch beim Freisprechen, 15 bis 60 Sekunden. Vier Bausteine: Klick bestätigen (du bist hier richtig), Nutzen anteasern, einen Einwand vorwegnehmen, kurze Überleitung ins Video.
3. Elevator Pitch als festes Etikett: wer du bist und um welche drei Themen es geht, dazu eine Abo-Einladung. Er darf sich mit der Zeit ändern.
4. Jeder Hauptpunkt ist ein Mini-Skript: eigener Zwischen-Hook, Spannung aufbauen, Auflösung erst am Ende. Er funktioniert auch ohne den Rest, damit später ein Short daraus werden kann.
5. Zwei Formen desselben Skripts: Stichpunkte zum Freisprechen (Hook, Pitch und CTA bleiben wörtlich) oder komplett Wort für Wort für den Teleprompter.
6. Aufnahme Stück für Stück: ein Clip für den Hook, einer für den Pitch, einer pro Punkt. Bei einem Versprecher den Punkt neu sprechen oder klatschen als Marke.
7. Wortlaut beim Ordnen von freiem Reden: fließender Text mit längeren Sätzen, doppelte Inhalte raus, klarer Spannungsbogen ohne Sprünge, Sprache und Tonfall des Sprechers bleiben, fachlich prüfen und stimmig korrigieren. Keine Floskeln, keine Füllsätze, keine Aufzählungen, keine künstlichen Übergänge, keine Emojis. Danach von Hand nachschärfen: Gedankenstriche raus, gehäuftes "sondern" und "genau" prüfen, Wörter tauschen, die der Sprecher nie benutzen würde.
8. Messung aus dem Denis-Material: Im Talking Head liegt die mittlere Satzlänge bei 13 bis 16 Wörtern, nur 10 bis 15 Prozent der Sätze haben höchstens 6 Wörter. Das Skript von Video 1 lag bei 9 Wörtern und 30 Prozent. Viele Mini-Sätze hintereinander klingen nach Reel und KI. Menschlich klingen Sätze, die mit "und", "weil", "wenn ... dann" oder "also" weiterlaufen, laut vorgerechnete kleine Rechnungen, ehrlich eingeschränkte Aussagen, sofort erklärte Fachwörter und Alltagsszenen.
9. Nicht übernehmen: binären Kontrast ("nicht X, sondern Y"), "Punkt." als Satzende, Übertreibungen ohne Beleg, Erfolgs-Autorität im Pitch (Chris ist im Aufbau).

**Entscheidungen von Chris aus dem Grilling (30.09.):**
- regeln.md vorerst leer lassen. Die Wortlaut-Regeln stehen im Skill selbst. regeln.md sammelt später nur, was Chris beim Vorlesetest markiert.
- A und B trennen sich erst in `sprechfassung`: aus v3 werden `skript-v4a-hybrid.md` und `skript-v4b-wortlaut.md`, text-check prüft beide. Der Hook ist in beiden gleich.
- Neu: Der Partner schreibt 2 bis 3 Hook-Varianten und stellt sie nebeneinander, Chris wählt (A/B-Vergleich), bevor die Kette weiterläuft.

**Noch offen, der neue Cook fragt Chris kurz:**
- Elevator Pitch (unbeantwortet). Empfehlung: ein Block mit der kurzen Vorstellung, etwa 20 Sekunden, direkt nach dem Hook. Drei Themen: Claude, KI-Agents, dein eigenes KI-Betriebssystem. Dazu ein Satz, warum man Chris zuhören soll, und eine Abo-Einladung ohne "Daumen nach oben".
- Probelauf mit v2 (unbeantwortet). Läuft der EA Brain beim neuen Cook, dann v2 mitnehmen. Sonst v2 und v3 überspringen, weil es im Probelauf um den Klang geht.
- Wer spricht im Probelauf für Chris (von Chris nicht verstanden, einfacher fragen): "Der Partner fragt dich nach Thumbnail-Satz, Titel und Hook. Willst du das beim Probelauf selbst beantworten, etwa 10 Minuten? Oder nehme ich die Antworten aus Video 1 und du liest am Ende nur die Hooks?"

**Plan zum Bauen:**
1. `skript-partner` (neu): spielerischer Interviewer. Fragt nach dem Video von heute und dem Eingang (nur Outlier, Outlier plus Brain Dump, nur Brain Dump). Nimmt URLs und Brain Dump im Chat an. Grillt in Runden Thumbnail-Botschaft, Titel und Hook, bis Chris "passt" sagt. Schreibt `packaging.md` mit Thumbnail-Satz, Titel und 2 bis 3 Hook-Varianten nebeneinander. Danach ruft er die Kette Stufe für Stufe auf, mit Stopp nach jeder Stufe.
2. `skript-mix`: drei Eingänge. Pro Outlier ableiten, warum er funktioniert (Hook-Muster, Versprechen, Tempo). Ein eigenes Video bauen, nichts übersetzen. Brain-Dump-Stellen im Wortlaut von Chris lassen und nur ordnen (Regel 7). `packaging.md` als Pflicht-Eingang.
3. `sprechfassung`: Wortlaut-Regeln 7 und 8 im Skill. Zwei Ausgaben A und B. A: Hook, Pitch und Vorstellung wörtlich (etwa die erste Minute), danach pro Kapitel ein wörtlicher Mini-Hook und 3 bis 5 Stichpunkte, Auflösung als letzter Stichpunkt, Aufnahme-Marke pro Kapitel. B: alles Wort für Wort.
4. `text-check`: neues Skript `vorlese-check.py` für den KI-Klang beim Vorlesen. Prüft Stakkato (3 oder mehr Sätze mit höchstens 6 Wörtern in Folge), Satzlänge im Median (Ziel mindestens 11), den Anteil kurzer Sätze (Ziel höchstens 20 Prozent), Doppelpunkt-Enthüllungen, Dreierlisten "X, Y und Z", Selbstfrage mit Antwort ("Das Ergebnis? ...") und dreimal denselben Satzanfang. Stichpunkte und Regie-Zeilen zählen nicht. Die Grenze für Überlänge steigt von 25 auf etwa 35 Wörter, weil lange Sätze jetzt gewollt sind. Dazu der Küchentisch-Test für Chris: den Hook laut lesen und als Sprachmemo aufnehmen, dann anhören und drei Stellen markieren. Wo stolpere ich? Wo klinge ich wie ein Sprecher? Welchen Satz würde ich so nie zu einem Freund am Küchentisch sagen? Jede Markierung wird umgeschrieben und landet in regeln.md.
5. `skript-geruest.md`: Packaging vorab, Pitch plus Vorstellung als ein Block, Mini-Hook pro Kapitel, die Fassungen A und B. `skills.md`: skript-partner als Stufe 0, die neuen Dateinamen.
6. Probelauf: 3 URLs zum Thema von Video 1: Pav Rusovs `Zs3faMCDYNs` (AI OS, 4 Layers), Metics Media `9oJySubZRSA` (Beginner's Guide to Claude), Torben Platzer `sAQdRSqXxXQ` (Claude nutzen wie die Top 1 %). Titel-Kandidat aus `videos/01-stufenleiter/titel-varianten.md` (nur lesen). Beide Fassungen erzeugen, text-check bestehen, dann liest Chris beide Hooks laut.
7. Map-Eintrag unter "Decisions so far", Ticket auf `Status: resolved` mit `## Answer`. Den Commit übernimmt der Hook beim Beenden.

Außerhalb der Grenze, an den Captain: In `memory.md` steht unter Open questions noch "Stimmvorlage für sprechfassung: Transkript vom Dreh Video 1 in regeln.md einarbeiten". Das ist durch Chris' Entscheidung überholt.

### 2026-09-30 Zweiter Cook: gebaut und Probelauf

EA Brain war in der Session nicht geladen, obwohl der Connector in claude.ai verbunden ist. Claude Code braucht ein eigenes Login (`/mcp`, "Authenticate"). Nach Chris' Login lief EA Brain über eine frische Hintergrund-Session (`claude -p`), die laufende Session sieht die Tools erst nach einem Neustart. Die Zeile "Arbeitsort" oben ist überholt, gearbeitet wurde im eigenen Worktree, Probe-Fassungen direkt im Hauptordner unter `private/probelauf-26/`.

Außerhalb der Grenze, an den Captain: `memory.md` (Open questions, Stimmvorlage aus dem Dreh-Transkript ist durch Chris' Entscheidung überholt; Skills-Layer nennt noch vier Skills). Video 1 und Dispatch (siehe Befunde). Der Git-Guard blockiert den Push neuer Branches wegen `.scratch/poppy-clone/research/clones/coderkai03-04-youtube-transcript.png` in master.


### 2026-09-30 Captain: nach master übernommen

Auf Chris' Wunsch als Arbeitsnachweis per Squash in master übernommen, ohne `__pycache__`. Offen für eine zweite Runde: Chris liest die Hooks beider Probe-Fassungen (`private/probelauf-26/skript-v4a-hybrid.md`, `skript-v4b-wortlaut.md`) laut und entscheidet danach, welche Fassung bleibt und was am Skript-Partner nachgeschärft wird. Das läuft als neues Ticket, dieses bleibt resolved.
