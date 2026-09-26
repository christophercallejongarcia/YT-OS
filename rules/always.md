# Immer

1. **Jeder Text fürs Publikum läuft durch den Slop-Check.** Skripte, Briefings und Playbooks unter `videos/` und `substrate/playbooks/`. Harte KI-Marker blockiert der Hook beim Schreiben. [Hook: `.claude/hooks/slop-gate.sh`] Vor der Freigabe eines Skripts zusätzlich `/slop-check` und `anti-response-patterns` für die Struktur-Muster, die kein Regex findet.
2. **Ein Commit und Push pro Ticket.** Im Worktree automatisch: Beim Beenden der Session committet der Hook alles, pusht den Branch und übernimmt ihn per Squash in master, wenn ein Ticket auf "Status: resolved" ging. [Hook: `.claude/hooks/ticket-ship.sh`, Protokoll in `.git/ticket-ship.log`] Im Hauptordner von Hand: eigene Dateien einzeln stagen, committen, pushen. Nur Commits in master zählen als Arbeitsnachweis für die Challenge.
3. **Echte Umlaute, keine Gedankenstriche, kein KI-Sprech** in allem, was Chris liest.
