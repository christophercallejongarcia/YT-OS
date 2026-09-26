# Immer

1. **Jeder Text fürs Publikum läuft durch den Slop-Check.** Skripte, Briefings und Playbooks unter `videos/` und `substrate/playbooks/`. Harte KI-Marker blockiert der Hook beim Schreiben. [Hook: `.claude/hooks/slop-gate.sh`] Vor der Freigabe eines Skripts zusätzlich `/slop-check` und `anti-response-patterns` für die Struktur-Muster, die kein Regex findet.
2. **Nach jedem abgeschlossenen Ticket committen und pushen.** Eigene Dateien einzeln stagen, dann `git push`. Der Guard prüft vor jedem Push. Nur gepushte Commits zählen als Arbeitsnachweis für die Challenge.
3. **Echte Umlaute, keine Gedankenstriche, kein KI-Sprech** in allem, was Chris liest.
