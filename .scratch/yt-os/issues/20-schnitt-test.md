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
