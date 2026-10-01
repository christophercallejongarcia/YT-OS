# Skills in YT-OS

## Eigene Skills (nur in diesem OS)

Die Skript-Kette. Einstieg ist immer `skript-partner`, er steuert die übrigen Stufen. Nach jeder Stufe prüft Chris.

| Stufe | Skill | Aus | Ergebnis |
|---|---|---|---|
| 0 | `/skript-partner [ordner]` | Thema, 3 bis 5 Outlier-URLs und/oder Brain Dump im Chat | `packaging.md` (Versprechen, Thumbnail-Botschaft, Titel, 2 bis 3 Hook-Varianten, gewählter Hook, Pitch) |
| 1 | `/skript-mix <ordner> [urls]` | packaging.md plus Outlier und/oder Brain Dump | `skript-v1-mix.md`, `quellen.md` |
| 2 | `/skript-anreichern <ordner> v2` | v1 | `skript-v2-community.md` (EA Brain, Faktencheck) |
| 2 | `/skript-anreichern <ordner> v3` | v2 | `skript-v3-beispiele.md` |
| 3 | `/sprechfassung <ordner>` | v3 und packaging.md | `skript-v4a-hybrid.md` (Hybrid), `skript-v4b-wortlaut.md` (Wort für Wort) und `prompter.txt` (markiert für den Teleprompter) |
| 4 | `/text-check <ordner>` | v4a und v4b | Prüfbericht mit vorlese-check, Küchentisch-Test, nach Freigabe `skript.md` |

Drei Eingänge, pro Video gewählt: nur Outlier (Hauptweg), Outlier plus Brain Dump, nur Brain Dump. Alle Skills folgen dem Gerüst in `substrate/skript-geruest.md` und lesen die Playbooks, sobald es sie gibt. Die Wortlaut-Regeln stehen in `sprechfassung`, der Messwert für KI-Klang beim Vorlesen in `.claude/skills/text-check/scripts/vorlese-check.py`.

Der Schnitt, erste Stufe nach dem Dreh:

| Stufe | Skill | Aus | Ergebnis |
|---|---|---|---|
| Rohschnitt | `/rough-cut <private/video-NN> <rohtake>` | Rohtake und ElevenLabs-Transkript | `schnitt-lokal/` mit Base-Cut, Schnittliste, remapptem Transkript und Bericht (alles in `private/`) |

Pausen im Schnitt nach Langform-Zielwerten (Satzende 0,3 s, Absatz 0,5 s, neue Stufe 0,8 s), Details im Skill `rough-cut`. Für den Dreh selbst gilt `substrate/playbooks/vor-der-kamera.md`.

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
