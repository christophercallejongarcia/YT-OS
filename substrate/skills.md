# Skills in YT-OS

## Eigene Skills (nur in diesem OS)

Die Skript-Kette. Jede Stufe ist ein eigener Aufruf, nach jeder Version prüft Chris.

| Stufe | Skill | Aus | Ergebnis |
|---|---|---|---|
| 1 | `/skript-mix <ordner> <urls>` | 3 bis 5 Outlier-Videos | `skript-v1-mix.md` |
| 2 | `/skript-anreichern <ordner> v2` | v1 | `skript-v2-community.md` (EA Brain, Faktencheck) |
| 2 | `/skript-anreichern <ordner> v3` | v2 | `skript-v3-beispiele.md` |
| 3 | `/sprechfassung <ordner>` | v3 | `skript-v4-sprechfassung.md` |
| 4 | `/text-check <ordner>` | v4 | Prüfbericht, nach Freigabe `skript.md` |

Alle Skills folgen dem Gerüst in `substrate/skript-geruest.md` und lesen die Playbooks, sobald es sie gibt.

Der Schnitt, erste Stufe nach dem Dreh:

| Stufe | Skill | Aus | Ergebnis |
|---|---|---|---|
| Rohschnitt | `/rough-cut <private/video-NN> <rohtake>` | Rohtake und ElevenLabs-Transkript | `schnitt-lokal/` mit Base-Cut, Schnittliste, remapptem Transkript und Bericht (alles in `private/`) |

## Globale Skills, die YT-OS nutzt

| Pipeline-Stufe | Skill |
|---|---|
| Recherche, Videos ansehen | `watch`, `video-transcript-extractor` |
| Planung | `wayfinder`, `grilling`, `prototype`, `to-spec`, `to-tickets` |
| Texte prüfen | `slop-check`, `anti-response-patterns` (gebündelt in `text-check`) |
| Stil aus Referenzvideo | `style-extract` |
| Grafik über dem Base-Cut | `graphics`, `hyperframes` |
| Session-Abschluss | `tldr` |

## Noch offen (über Wayfinder)

- Edit-Interview (Ticket 07), B-Roll-Recorder (Ticket 08), Thumbnail über Cover Lab (Ticket 09)
