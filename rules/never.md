# Nie

Harte Grenzen. Die mit [Hook] sind technisch erzwungen, nicht nur Anweisung.

1. **Nichts geht öffentlich raus ohne Chris' Freigabe.** Kein YouTube-Upload, kein Post, keine Änderung der Repo-Sichtbarkeit, bevor Chris das Ergebnis gesehen und in dieser Session ausdrücklich freigegeben hat. [Hook: `.claude/hooks/publish-gate.sh` fragt nach]
2. **Nichts Privates oder Fremdes ins öffentliche Repo.** Keine Transkripte, kein Community-Material, keine Video- oder Audiodateien, keine Zugangsdaten. Das Repo ist öffentlich. [Hook: `.githooks/guard.sh` blockiert Commit und Push]
3. **Im Hauptordner nie `git add -A` oder `git add .`.** Andere Threads arbeiten im selben Ordner. Nur die eigenen Dateien einzeln hinzufügen. In einem Worktree ist "alles hinzufügen" erlaubt, dort arbeitet nur ein Thread.
