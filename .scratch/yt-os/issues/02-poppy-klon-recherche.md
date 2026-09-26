# Poppy-Klon: gibt es einen, den wir übernehmen können?

Type: research
Status: resolved

## Question

Gibt es Open-Source-Nachbauten oder White-Label-Versionen von Poppy AI (Board mit mehreren YouTube-Videos, Transkripten und eigenem Kontext, aus dem ein Skript entsteht)? Wie aktiv sind sie, welche Lizenz haben sie, was können sie, und passen sie zu unserem Stack (Next.js, Convex, Codex-Bridge, Claude)? Dazu: Wie funktioniert Poppy selbst laut Doku und laut Creator-Videos, die es zeigen?

## Answer

- Es gibt keinen Klon zum Übernehmen. Die "Poppy Clone"-Repos haben 0 Sterne, 8 bis 12 Commits und keine Lizenz. Eine White-Label-Version gibt es nicht, Poppy bietet nur eine API.
- Poppys Kern laut eigener Doku: Linien von Quellen zum Chat-Block legen den Kontext fest, alles Verbundene geht komplett rein, kein RAG, kein Gedächtnis. Canvas ist React Flow.
- Beste Open-Source-Nähe: ThoughtDAG (MIT, aktiv, gleiches Prinzip, kein YouTube), Canvas Chat (YouTube-Node, aber ohne Lizenz), Tersa (MIT, Next.js + React Flow, kein YouTube).
- Signal Room hat Convex, Ideas, Scripts und Hooks, aber weder YouTube-Import noch React Flow. Die Codex-Bridge begrenzt Requests auf 64 KB, das reicht nicht für mehrere lange Transkripte.
- Empfehlung Hybrid: für Video 2 erst ein Ordner-Board mit Claude Code (Transkripte, Brand Voice, Formate), parallel Canvas Chat oder ThoughtDAG 30 Minuten testen, danach bei Bedarf ein minimales Board in Signal Room bauen.

Details, Kandidatentabelle und Quellen: [assets/poppy-klon-recherche.md](../assets/poppy-klon-recherche.md)
