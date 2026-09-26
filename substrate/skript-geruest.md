# Skript-Gerüst

Jedes YT-OS-Skript hat denselben Ablauf. Was sich ändert, ist die Herangehensweise pro Abschnitt. Die kommt aus den Playbooks. Solange ein Playbook fehlt, gilt das Muster aus dem stärksten Quellvideo.

| # | Abschnitt | Pflicht | Wie (Quelle der Herangehensweise) |
|---|---|---|---|
| 1 | Hook | ja | `substrate/playbooks/hooks-und-titel.md`, sonst Hook des stärksten Outliers |
| 2 | Versprechen | ja | Was der Zuschauer am Ende kann oder weiß, in 1 bis 2 Sätzen. Gleiche Quelle wie Hook |
| 3 | Kurze Vorstellung | ja | siehe unten |
| 4 | Hauptteil in Blöcken | ja | `substrate/playbooks/skript-aufbau.md`, sonst Blockfolge der Quellvideos |
| 5 | Open Loop vor dem wichtigsten Block | empfohlen | "Bevor wir zum wichtigsten Teil kommen ..." |
| 6 | Zusammenfassung | ja | Die Blöcke in je einem Satz |
| 7 | CTA | ja | Ein konkreter nächster Schritt. Welcher CTA, ist pro Video offen (Map: "CTA für Video 1") |

## Kurze Vorstellung

2 bis 4 Sätze, nach Hook und Versprechen, nie davor. Ziel: Warum soll man ausgerechnet Chris zuhören? Bausteine, je nach Thema ausgewählt:

- Chris, KI-Dozent (KIPA), unter den ersten Claude Code Architects in Zertifizierung
- baut sein eigenes KI-Betriebssystem und nimmt die Zuschauer offen mit
- keine fertige Millionen-Story: baut, testet, gibt das Funktionierende weiter

Das Simtent-Material (Autorität, Framings, PAS) liegt im Vault unter `chriscasa/YT-CommandCenter/simtent/skript-psychologie/` und wandert als Playbook über Ticket 16 ins OS.

## Nicht Pflicht

- eigene Beispiele: erfundene Beispiele zur Veranschaulichung sind in Ordnung
- Schluss auf dem KI-OS-Blickwinkel
