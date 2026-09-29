# Tools und Verbindungen

Wie YT-OS nach draußen greift. Standard ist nur lesen. Schlüssel und Passwörter liegen nie in diesem Ordner, sondern in der jeweiligen App oder im macOS-Schlüsselbund.

| Verbindung | Wofür | Zugriff | Stand | Wie verdrahtet |
|---|---|---|---|---|
| Signal Room (Convex) | Outlier, Transkripte, Hook-Läufe, Cover Lab | lesen | geplant | read-only CLI, gebaut im Signal-Room-Repo (Ticket 11) |
| YouTube Data API | Aufrufe, Kanäle, Titel, Thumbnails | lesen | geplant | Schlüssel in Signal Room, nicht hier (Ticket 04) |
| Apify | Transkripte der Outlier | lesen | geplant | Actor in Signal Room (Ticket 04) |
| EA Brain (MCP) | Community-Wissen für `skript-anreichern` | lesen | läuft | Claude-Connector |
| `/watch` mit yt-dlp | Videos ansehen, Transkripte holen | lesen | läuft | globaler Skill |
| Epidemic Sound (MCP) | Hintergrundmusik und Soundeffekte | lesen, Download | läuft | Claude-Connector, austauschbar |
| HyperFrames | Grafiken und Animationen rendern | schreibt lokale Dateien | läuft | CLI im Repo `dev/hyperframes` |
| DaVinci Resolve 21.0.4 Free + MCP | Schnitt | schreibt ins lokale Projekt | geplant | Version 21.0.4, nie auf 21.1 updaten (Ticket 03) |
| Computer Use, Playwright, Chrome-Extension | B-Roll aufnehmen | steuert den Rechner | offen | Dreifach-Vergleich (Ticket 08) |
| ElevenLabs Scribe | Transkript eigener Aufnahmen mit Wort-Zeitstempeln | lädt die Tonspur hoch | geplant | Schlüssel in `~/.config/yt-os/.env`, nicht hier (Ticket 06) |
| GitHub | Arbeitsnachweis | schreiben | läuft | Git-Guard vor jedem Commit und Push |
| YouTube-Upload | Video veröffentlichen | schreiben | von Hand | später YouTube-API, nur mit Chris' Freigabe über das Publish-Gate |

## Regeln

- Neue Verbindungen starten mit Lesezugriff. Schreibzugriff nur mit Begründung in dieser Datei.
- Alles, was öffentlich macht (Upload, Post, Repo-Sichtbarkeit), läuft über das Publish-Gate und braucht Chris' Freigabe (`rules/never.md` 1).
- CLI vor MCP, wo es eine API gibt (Mark Kashef, AI-OS-Masterclass).
