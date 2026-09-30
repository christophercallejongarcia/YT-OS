# Schnitt-Test: lokal (rough-cut) oder Descript?

Type: prototype
Status: open
Blocked by: 06

## Question

Derselbe Abschnitt von Video 1 (1 bis 2 Minuten, mit mindestens einer Grafik- und einer B-Roll-Stelle) wird dreimal geschnitten: HyperFrames mit Opus 5.5 (Jays Empfehlung), DaVinci Resolve 21.0.4 Free über den MCP (Ticket 03) und Descript. Welcher Weg liefert mit dem wenigsten Handeingriff einen Schnitt, den Chris veröffentlichen würde? Ergebnis: Werkzeug für Video 1 festgelegt, Entscheidung in der Map. Termin laut Roadmap: Test Tag 7, Entscheidung Tag 8.

## Comments

- 2026-09-29: Entscheidung Chris: zwei Wege statt drei, und zwar mit dem kompletten Haupt-Take (23:38 min), nicht nur einem Abschnitt. DaVinci fällt aus dem Test (Setup-Aufwand, Jays schlechte Erfahrung mit dem MCP) und bleibt nur Notlösung für Handarbeit.
  - **Weg A lokal:** Skill `rough-cut` (Schnittliste aus dem ElevenLabs-Transkript, Schnitt mit ffmpeg). Grafiken setzt später `graphics` mit HyperFrames darüber, für beide Wege gleich. Worker: Cook im Thread von Ticket 06. Ablage `private/video-01/schnitt-lokal/`.
  - **Weg B Descript:** Waiter bedient Descript per Computer Use mit Marks Prompt aus dem Computer Use Field Guide und Chris' Anpassungen (`chriscasa/projects/reel-sprint-2026-09/mcp-produktionsstart/`). Ablage `private/video-01/schnitt-descript/`.
  - **Vergleich:** Wenn beide fertig sind, prüft der Cleaner beide Schnitte gegeneinander (Vollständigkeit, abgeschnittene Wörter, doppelte Takes, Tempo, Ton, Länge, Handaufwand) und schreibt einen Bericht. Chris entscheidet danach.
  - Rohtake: `/Users/cristobalcallejongarcia/Movies/YT-OS/01-stufenleiter/DJI_20260927160458_0009_D.MP4`. Keine Videodateien ins Repo.
- 2026-09-29: Weg A lokal fertig. Rohschnitt des kompletten Haupt-Takes mit dem Skill `rough-cut`, Transkript aus Ticket 06 (ElevenLabs), kein neues Transkript. Ergebnis 10:29,6 min statt 23:38 min, 178 Segmente, 177 Schnitte, 4K H.264 ohne Grafiken und Musik, Ton auf −14,4 LUFS. Regel "immer der letzte Take", Pausen auf etwa 0,1 s gestrafft, Schnittpunkte per Pegelanalyse gegen abgeschnittene Wortenden gesichert. Gegenprobe mit lokalem Whisper: kein zusätzliches und kein fehlendes Wort. Rechenzeit knapp 24 min, keine neuen Kosten. Offen für Handarbeit: 9 knappe Nähte zum Anhören, Sprungschnitte brauchen B-Roll oder Zoom, Pausen an Stufenwechseln eventuell länger. Bericht, Schnittliste, Film und remapptes Transkript liegen in `private/video-01/schnitt-lokal/` (nicht im Repo). Der Skill liegt jetzt als eigene Fassung in `.claude/skills/rough-cut/SKILL.md`, so wie er für Video 1 gelaufen ist.
- 2026-09-30: Weg B weiterhin beim Export blockiert. Drei Zugriffswege geprüft: integrierter Browser verlangt Anmeldung; Anbinden des vorhandenen Chrome-Tabs endet nach 30 Sekunden im Timeout; direkter Computer-Use-Zugriff lädt den Projekt-Fenstertitel, liefert aber keine Descript-Bedienelemente und nur eine graue Bildschirmaufnahme. Keine Desktop-App in den beiden Programme-Ordnern gefunden. Kein Export ausgelöst, keine Kontoeinstellung geändert, nichts geteilt. MP4 und SRT fehlen weiterhin; vollständige Wiedergabe und letztes Wort sind ungeprüft. Die zuletzt bestätigte Schnittlänge bleibt 10:59,8 vom 29.09. Details und Übergabe im privaten Bericht `private/video-01/schnitt-descript/bericht.md`. Chris muss eine erreichbare Descript-Sitzung bereitstellen oder sich im integrierten Browser anmelden. Vergleich durch den Cleaner bleibt offen.
