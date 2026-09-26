# Poppy-Klon so nah am Original wie möglich

Stand: 26.09.2026. Ziel: ein Poppy-AI-Nachbau, der sich in Dashboard, Canvas und Chat wie das Original anfühlt.

Achtung: Ticket `.scratch/yt-os/issues/02-poppy-klon-recherche.md` (parallele Session) empfiehlt für die 30-Tage-Challenge zuerst ein Ordner-Board ohne Canvas. Dieses Ziel hier geht weiter. Die Entscheidung, wann gebaut wird, gehört in die Wayfinder-Map.

## Recherche

- `research/original/live/bauplan.md`: **Hauptquelle für den Bau**, live aus dem Original ausgelesen.

- `research/original/teardown.md` mit 29 Frames: Dashboard, Canvas, Nodes, Chat, Preise, MUSS/SOLL/KANN-Liste (Abschnitt 11) als Spezifikation.
- `research/clones/clones.md` mit Screenshots: Thinkboard und coderkai03 lokal gestartet, Graphlink, Curiso, RabbitMap per README.
- `research/landscape/landscape.md`: Open-Source-Grundlagen und Bausteine, Lizenzen, drei Build-Optionen.
- Sicherheitsprüfung der fünf Repos: im Chat vom 26.09.2026, keine Hinweise auf Schadcode.

## Entscheidung (Vorschlag)

Eigene App auf Next.js und React Flow (MIT), wie Poppy selbst. Kein Fork.

- Spezifikation: MUSS-Liste aus dem Teardown, Frames als Sollbild.
- Code-Spender mit MIT-Lizenz: Tersa (vercel-labs/tersa, Node-UI), ThoughtDAG (Kontext über Kanten), content-core (Extraktion).
- Nur als Vorlage, nicht kopieren (keine Lizenz): coderkai03/poppy-clone (Ingest: erst Untertitel, dann yt-dlp plus Whisper), prajwal-tomar/poppy-clone (Datenmodell, Board-Liste).

## Phasen

0. Sollbild schärfen: erledigt (26.09.2026, Test-Abo). Bauplan mit Stack, Datenmodell, Chat-Payload, 26 Node-Typen, Farben und UI-Inventar: `research/original/live/bauplan.md`. Rohdaten und rund 60 Screenshots lokal in `live/private/` (nicht im Repo).
1. Klick-Prototyp mit Mock-Daten: Board-Liste, Canvas, Quell-Nodes, Poppy-Chat-Node, Kanten. Neben die Frames legen und vergleichen.
2. Echte Funktion: Paste-to-Node, YouTube/PDF/Web/Voice-Ingest, Vollkontext-Chat mit Claude, @-Mentions, Gruppen, "Edit in text block".
3. SOLL-Features: Discover/Outliers, Brands, Prompt-Bibliothek, Templates, Versionsverlauf.
