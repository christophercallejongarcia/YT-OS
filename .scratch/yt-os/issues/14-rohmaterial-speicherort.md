# Wo lebt das Rohmaterial: Convex oder Ordner?

Type: grilling
Status: resolved

## Question

Transkripte, Outlier-Daten und fremde Skripte werden schnell viel. Signal Room speichert Reels schon in Convex. Soll das gesamte gesammelte Rohmaterial (YouTube-Outlier, Transkripte, Hook-Läufe) in Convex liegen und YT-OS nur verdichtete Playbooks, eigene Videos und Exporte halten? Oder bleibt ein lokaler substrate/raw/-Ordner? Offen dabei: Wie greifen Claude Code und Codex im Terminal auf Convex zu (read-only CLI, Export-Dateien)? Und wohin gehört Lernmaterial, das nicht aus Signal Room kommt (Masterclass, Kallaway, Simtent), das schon im Vault chriscasa liegt?

## Answer

Entschieden am 2026-09-26 mit Chris.

- **Convex (Signal Room)** speichert alles, was gesammelt wird: YouTube-Outlier, Transkripte, fremde Skripte, Hook-Läufe. So läuft es bei den Reels schon.
- **Vault chriscasa** behält Lernmaterial, das dort schon liegt: Masterclass, Simtent, Kallaway.
- **YT-OS** hält nur Verdichtetes: Playbooks, eigene Videos, Exporte. Einen `substrate/raw/`-Ordner gibt es nicht.
- **Zugriff aus dem Terminal:** über ein read-only CLI auf Convex, gebaut im Signal-Room-Ticket. Die 33 offiziellen Convex-Skills (`get-convex/agent-skills`) liegen in `signal-room-starter/.claude/skills` und `.agents/skills` und werden dort genutzt. In YT-OS kommen sie bewusst nicht, weil jedes OS seine eigenen Skills hat.
