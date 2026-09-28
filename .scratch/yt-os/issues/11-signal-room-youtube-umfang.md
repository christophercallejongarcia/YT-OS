# Signal Room für YouTube: was genau ist ein Outlier?

Type: grilling
Status: resolved
Blocked by: 04

## Question

Welche Kanäle werden beobachtet, wie wird ein Outlier berechnet (Vielfaches des Kanal-Durchschnitts, Zeitfenster), welche Muster werden extrahiert (Hook, Titel, Thumbnail), und was landet als Datei in YT-OS/substrate?

## Answer

Entschieden am 2026-09-28 mit Chris, nach dem Call mit Jay.

- **Kanäle:** Keine feste Liste vorab. Signal Room sucht wie vidIQ über Suchbegriffe nach Videos, rechnet pro Kanal den Median und schlägt Kanäle mit starken Outliern als Kandidaten vor. Chris nimmt sie bewusst in die Watchlist auf.
- **Sprache und Themen:** Englisch und Deutsch. Themen: Claude und Claude Code, KI-Agents, KI-Betriebssystem, KI-Automatisierung für Business.
- **Outlier:** Nur Longform. Faktor ist Aufrufe geteilt durch den Median der letzten 30 Longform-Videos desselben Kanals. Schwelle in der Oberfläche wählbar, Vorgabe 3x. Zusätzlich angezeigt werden Aufrufe pro Abonnent, Alter und Aufrufe pro Tag.
- **Muster:** Titel und Thumbnails der Outlier füttern einen Titel- und einen Thumbnail-Builder in Signal Room. Hooks und Transkripte nur für Outlier.
- **Was nach YT-OS kommt:** Titel- und Thumbnail-Varianten pro Video, das Rohmaterial bleibt in Convex (Ticket 14).

Umsetzung über den Captain. Auftrag im privaten Signal-Room-Repo: `/Users/cristobalcallejongarcia/dev/signal-room-starter/.scratch/youtube/spec.md`.
