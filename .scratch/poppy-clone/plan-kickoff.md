# Startprompt: Plan für das Skript-Board (Poppy-Klon)

Stand: 26.09.2026. Für eine neue Claude-Code-Session. Ergebnis ist ein `PLAN.md`, der danach per `/goal` in einer weiteren frischen Session komplett gebaut wird.

## Vorbereitung (einmal, von Hand)

1. Terminal in `/Users/cristobalcallejongarcia/dev/signal-room-starter` öffnen (privates Repo, hier wird gebaut).
2. Arbeitsstand committen, damit jede Änderung durch den Codex-Review sichtbar und rückholbar ist.
3. Für die Planung in `~/.codex/config.toml` `model_reasoning_effort = "high"` setzen (danach zurück auf `medium`). Modell bleibt `gpt-6-astra`.
4. Claude Code starten, `/model` auf Fable 5.1 stellen.

## Prompt zum Einfügen

```
Lies zuerst diese Dateien vollständig, sie sind die Quelle der Wahrheit:
- /Users/cristobalcallejongarcia/dev/YT-OS/.scratch/yt-os/issues/10-skript-board-entscheidung.md (Entscheidungen, Umfang)
- /Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/original/live/bauplan.md (Poppy live ausgelesen, Abschnitt 9 = Verhalten pro Szenario)
- /Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/mvp-board.png (Sollbild MVP)
- /Users/cristobalcallejongarcia/dev/YT-OS/.scratch/poppy-clone/research/original/teardown.md (Abschnitt 11 MUSS/SOLL/KANN, Abschnitt 13 Design-Tokens)
- README.md, CONTEXT.md, docs/adr/ und bridge/server.mjs in diesem Repo

Starte dann parallel Subagents mit model "fable":
1. Signal Room kartieren: Routen, Convex-Schema und -Funktionen, Bridge (Auth, Sandbox, Body-Limit), Tests, Konventionen.
2. Bibliotheken prüfen: @xyflow/react v12 (Handles, Kanten mit Delete-Button, Gruppen mit parentId/extent), BlockNote (Editor nur bei Auswahl editierbar), AI SDK v5 useChat mit eigenem Transport zu einer lokalen Bridge.
3. Engines prüfen: Claude Code headless (claude -p, stream-json, ohne Tools), codex exec bzw. Codex SDK (read-only), command-code -p. Wie streamt man alle drei einheitlich über die Bridge?

Danach: /claudex:plan --rounds 5 Skript-Board als Poppy-Nachbau in Signal Room (Route /board), Umfang und Entscheidungen laut Ticket 10.
```

## Was der Plan enthalten muss

- Phasen, die eine Session ohne Rückfragen durchlaufen kann, jede mit prüfbaren Exit-Kriterien: Tests grün, Typecheck grün, Playwright-Screenshot neben dem Poppy-Screenshot (Sollbild in `research/original/live/private/`), Payload-Struktur wie im Bauplan.
- Alles, was blockieren könnte, vorab geklärt: Logins (claude, codex, command-code), Convex-Deployment, YouTube-Transkripte (Ticket 04: Apify nur für Outlier, sonst Captions), Whisper-Weg für Sprachnotizen.
- Engines ohne Tools in leerem Temp-Ordner, Kontext kommt aus den verbundenen Nodes (Ticket 10, Q10).
- Poppys Formate übernehmen: `<poppy_reference_node …/>` für @-Mentions, `<clickable-title titlePrompt=…>` für Optionen, Prompt-Chip mit `action`. Verbesserungen aus Bauplan Abschnitt 8 und 9 einbauen.
- Export `skript.md` und `beats.md` nach `YT-OS/videos/<video>/`.
- Nicht im Plan: alles aus "Bewusst nicht im MVP" (Diagramm unten).
