# Skript-Board: übernehmen oder in Signal Room bauen?

Type: grilling
Status: resolved
Blocked by: 02

## Question

Auf Basis der Poppy-Recherche: Wird ein vorhandener Klon übernommen und angepasst, oder entsteht das Skript-Board als neue Fläche in Signal Room (Ideas, Hooks, Bridge gibt es dort schon)? Was ist das kleinste Board, mit dem Video 2 entsteht?

Wartet zusätzlich auf die Repo-Auswertung aus dem separaten Poppy-Thread (T3-Thread 49edfa52, Ablage `.scratch/poppy-clone/`).

## Answer

Grilling am 26.09.2026. Kein Klon wird übernommen, das Skript-Board wird als Poppy-Nachbau in Signal Room gebaut.

- **Umfang (MVP):** Board-Liste, Canvas, YouTube-Node (Cmd+V, Transkript, Titel, Views), Text-Node, Gruppe, Chat-Node (Kanten als Kontext, `@`, Modellwahl, Brand Voice, Streaming, mehrere Unterhaltungen), Antwort als Text-Node, Export. Dazu vier Erweiterungen: Sprachnotiz als Brain-Dump, `/`-Prompt-Bibliothek mit den Playbooks (Ticket 15, 16), klickbare Antwort-Optionen, Export als Beat-Tabelle (`beats.md`).
- **Ort:** Signal Room, neue Route `/board` (privates Repo, Convex).
- **LLM:** über Chris' Abos statt API-Key. Engines Claude Code (Standard), Codex und Command Code, wählbar im Modell-Dropdown, alle über die lokale Bridge.
- **Rechte:** Engines ohne Tools, nur Text, in einer read-only Sandbox wie heute die Codex-Bridge. Kontext kommt aus den verbundenen Nodes.
- **Optik:** nah an Poppy, aber nur für die MVP-Teile.
- **Verbindung zu YT-OS:** MVP schreibt `skript.md` und `beats.md` nach `videos/<video>/`. Ein MCP- oder CLI-Zugriff aus YT-OS aufs Board folgt in v2.
- **Nicht im MVP:** TikTok/Instagram, Ads, Bildgenerierung, Landingpages, Vault, Templates, Teams, Credits, Discover (macht Signal Room).
- **Ablauf:** Deep-Scan der MVP-Szenarien in Poppy jetzt (Test-Abo bis 03.10.), Plan per `/claudex:plan` bis 29.09., `/goal`-Build nach dem Dreh von Video 1.

Details: `.scratch/poppy-clone/README.md`, Bauplan `.scratch/poppy-clone/research/original/live/bauplan.md`, MVP-Diagramm `.scratch/poppy-clone/mvp-board.png`.

## Comments

**27.09.2026, Plan fertig.** `PLAN.md` liegt im privaten Signal-Room-Repo auf Branch `t3code/ee03efc3` (Commit `950b6d7`), die Recherche dazu unter `.scratch/skript-board/research/`. Entstanden per `/claudex:plan` in fünf Review-Runden mit Codex (Befunde je Runde: 16, 15, 10, 6, 5). Die Befunde aus Runde 5 sind eingearbeitet, aber nicht mehr gegengeprüft.

Änderungen gegenüber der Entscheidung oben:

- Kein Sprach-Node und kein Whisper-Weg. Sprachnotizen diktiert Chris mit Wispr Flow direkt in Text-Node oder Chat.
- Codex antwortet am Stück per `codex exec`, Claude Code und Command Code streamen. Alle Engines laufen in einer äußeren macOS-Sandbox und werden abgeschaltet, wenn ihr Sentinel-Test fehlschlägt.
- Das Board hat eine helle Variante im Poppy-Stil und eine dunkle im Signal-Room-Stil.
- YouTube-Daten kommen über `yt-dlp` (Titel, Views, Untertitel). Apify läuft nur auf Klick, wenn keine Untertitel da sind, gedeckelt auf 0,05 $.
- Der Export nach `videos/<video>/` schreibt nur nach Vorschau und Bestätigung, legt vorher Sicherungen an und committet nichts.

Build per `/goal` in Phasen 0 bis 9, nutzbar für Video 2 ab Phase 5. Der Cloud-Push des Convex-Schemas wartet, bis die P4-Arbeit in Signal Room committet ist.
