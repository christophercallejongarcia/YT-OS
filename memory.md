# OS Coach Memory

**Goal:** YT-OS aufsetzen: eine Claude-Code-Pipeline von der YouTube-Outlier-Recherche bis zum veröffentlichten Video. Ziel der 30-Tage-Challenge: Video 1 ist veröffentlicht und jede Pipeline-Stufe wurde einmal echt benutzt, Handarbeit ist erlaubt.
**Who it is for:** Chris allein als Betreiber. Das Publikum des Kanals sind Selbstständige und Teams (Nische: Claude, KI-Agents, KI-Betriebssystem).
**Created:** 2026-09-26   **Updated:** 2026-09-26
**Current layer:** agents
**Next action:** Skript-Kette beim nächsten Video einmal echt durchlaufen und nachschärfen. Layer 5 (Agents) bleibt bewusst zuletzt, Layer 6 (Tools) als tools.md anlegen.

## Layer status
- Identity: solid - identity.md steht (Wer, Für wen, Ziel, Stimme, Immer, Nie). CLAUDE.md lädt identity.md, memory.md und AGENTS.md, AGENTS.md verweist auf beide.
- Substrate: in progress - Gerüst steht: substrate/sources.md, substrate/compendium.md, substrate/playbooks/ (leer). Rohmaterial liegt in Convex bzw. im Vault. Solid, sobald die Playbooks Hooks/Titel und Skript-Aufbau stehen und die schwierige Frage beantwortbar ist.
- Rules: solid - rules/never.md (3 Grenzen) und rules/always.md (3 Pflichten), per @-Import in CLAUDE.md immer geladen. Drei Hooks erzwingen das Wichtigste: slop-gate (Claude Code), publish-gate (Claude Code, fragt nach), Git-Guard pre-commit und pre-push (für alle Werkzeuge).
- Skills: in progress - Skript-Kette als 4 Projekt-Skills in .claude/skills/ (skript-mix, skript-anreichern, sprechfassung, text-check), Gerüst in substrate/skript-geruest.md, Übersicht in substrate/skills.md. Solid, sobald die Kette einmal echt für ein Video gelaufen ist.
- Agents: not started - bewusst zuletzt (Mark Kashef: Agents sind der letzte Layer)
- Tools: not started - Signal Room über Dateien/Bridge, HyperFrames über CLI, DaVinci über MCP (offen)

## Decisions (append, newest last)
- 2026-09-26 docs/os-coach-briefing.md existiert nicht. Der Vorgänger-Thread hat es angekündigt, aber vorher zwei Fragen gestellt und nie geschrieben. Start deshalb aus Projekt-Memory, Vorgänger-Transkript und .scratch/yt-os/assets/ki-os-architektur-recherche.md.
- 2026-09-26 Video 1 ist "Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen", Dreh am 2026-09-27.
- 2026-09-26 YT-OS ist die einzige Basis. YT-CommandCenter und YouTube-os sind Relikte, Brauchbares wird übernommen.
- 2026-09-26 Scope: nur Ideen/Packaging und Produktion aus Kallaways Blueprint. Analytics und Funnel kommen nach Video 1.
- 2026-09-26 Layer 4 bis 6 füllt os-coach nur mit dem, was die Wayfinder-Map entschieden hat. Nichts erfinden, was die Map später umwirft.

- 2026-09-26 Skript für Video 1 kopiert nach videos/01-stufenleiter/skript.md, Original im YT-CommandCenter bleibt.
- 2026-09-26 Identität bestätigt. "Immer echt vor der Kamera" ist selbstverständlich und kommt nicht in identity.md.
- 2026-09-26 Community-Material und fremde Transkripte dürfen als Arbeitsgrundlage genutzt werden, bleiben aber lokal (substrate/raw/, private/). Das regelt .gitignore, nicht identity.md, weil das Repo öffentlich ist.
- 2026-09-26 os-coach läuft ab jetzt im Wayfinder-Thread, der zweite os-coach-Thread ist abgelöst.

- 2026-09-26 Playbooks werden nicht jetzt gebaut, sondern als eigene Wayfinder-Tickets (Hooks und Titel, Skript-Aufbau, B-Roll und Edit, Thumbnails, Konkurrenz), mit mehr Zeit. Quellen-Rangfolge: Kallaway und Mark zuerst, Simtent als Entwurf.

- 2026-09-26 Rohmaterial in Convex (Signal Room) bzw. im Vault, kein raw-Ordner in YT-OS. Convex-Skills bleiben im Signal-Room-Repo.

- 2026-09-26 Schlimmster Fehler: etwas geht öffentlich raus ohne Chris' Freigabe, oder Privates landet im öffentlichen Repo. Beides ist per Hook erzwungen, nicht nur als Regel notiert, weil geladene Regeln probabilistisch befolgt werden.
- 2026-09-26 Commit und Push nach jedem Ticket. Mark committet automatisch ("I auto commit", 2025-09-10). Kein Auto-Commit-Hook, weil parallele Threads im selben Ordner arbeiten und sonst fremde Dateien mitgehen.

- 2026-09-26 Ein Commit und Push pro Ticket, nicht pro Nachricht. Automatisch nur im Worktree per SessionEnd-Hook (ticket-ship.sh): Branch sichern, bei erledigtem Ticket PR und Squash in master. Passt zur Wayfinder-Regel "ein Ticket pro Session".

- 2026-09-26 Skript-Kette mit 4 Versionen statt einem Skill: v1 Mix aus 3 bis 5 Outliern, v2 Community und Faktencheck, v3 Beispiele, v4 Sprechfassung, dann text-check als Prüftor. Chris prüft nach jeder Version. Fester Ablauf aus skript-geruest.md, Herangehensweise pro Abschnitt aus den Playbooks. Vom Simtent-Aufbau ist nur die kurze Vorstellung Pflicht, der Rest wird Playbook.

## Open questions
- Konkurrenz-Creator-Liste (5 bis 10 Kanäle) liefert Chris später über Ticket 19.
- Video 1 hat noch keine kurze Vorstellung von Chris im Skript. Vor dem Dreh ergänzen.
- Stimmvorlage für sprechfassung: Transkript vom Dreh Video 1 (Ticket 06) in regeln.md einarbeiten.

## Audit log (append)
