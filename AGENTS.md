# YT-OS

Bevor du handelst, lies `identity.md` (wer dieses OS ist), `rules/never.md` und `rules/always.md` (harte Grenzen und Pflichten) und dann `memory.md` (Stand des OS-Aufbaus). Die Planung läuft über die Wayfinder-Map in `.scratch/yt-os/map.md`.

Das Repo ist öffentlich. Community-Material, fremde Transkripte und Rohmaterial gehören in Convex (Signal Room), in den Vault oder in einen `private/`-Ordner, der per `.gitignore` ausgeschlossen ist. Nach dem Klonen einmal `git config core.hooksPath .githooks` ausführen, damit der Guard vor jedem Commit und Push prüft.

## Agent skills

### Issue tracker

Issues, Specs und Wayfinder-Maps liegen als lokale Markdown-Dateien unter `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` im Hauptordner plus `docs/adr/`. See `docs/agents/domain.md`.
