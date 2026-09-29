# Coach-Videos: YouTube-Videos, an denen wir YT-OS und Signal Room messen

Stand 2026-09-29. Idee: Jedes Video ist ein Coach. Ein Agent schaut es mit `/watch`, zieht die Regeln heraus und prüft, ob unsere Pipeline sie abdeckt. Ergebnis pro Video: eine kurze Checkliste plus "fehlt bei uns" oder "haben wir schon". Die Checklisten fließen in die Playbooks (Tickets 15 bis 18) und in Ticket 09.

Reihenfolge = Priorität. Die ersten drei zuerst, sie betreffen, was vor dem 10.10. passiert.

## 1. Outlier und Ideen (Stufe 1, Signal Room)

| # | Video | Kanal | Länge | Coach-Frage |
|---|---|---|---|---|
| 1 | [Meet The Man Who Solved YouTube (With Data)](https://www.youtube.com/watch?v=h6ipOOl4upI) | Jay Clouse, Gast Richard (Mitgründer von 1of10) | 49 min | Wie arbeitet 1of10 von der Recherche bis zur Validierung, und welche dieser Schritte braucht Signal Room wirklich? Kapitel: Research-Methoden 5:40, Remixing 22:07, Validierung 25:28, Titel 34:36, Thumbnails 42:11, Workflow 48:10 |
| 2 | [Get BETTER YouTube Ideas with vidIQ Outliers and Remix Tools](https://www.youtube.com/watch?v=Ahg-vSZfeNY) | vidIQ Tutorials | kurz | Welche Filter nutzt vidIQ im Outlier-Tool (Aufrufe, Abonnenten, Aktualität), und welche fehlen uns? |
| 3 | [How to Find YouTube Outliers for Free (I Built This with Claude Code)](https://www.youtube.com/watch?v=xtixrSGd-LU) | Chad Sheppard | 6 min | Wie klein kann ein Outlier-Finder sein? Er hat ihn in zwei Stunden mit Claude Code und der YouTube Data API gebaut. Maßstab gegen das Aufblähen |

## 2. Titel und Thumbnails (Stufe 3)

| # | Video | Kanal | Länge | Coach-Frage |
|---|---|---|---|---|
| 4 | [How to Create Irresistible Thumbnails](https://www.youtube.com/watch?v=Iqy644uOOqM) | Kallaway | | Welche Regeln für Thumbnails gelten, und erfüllen unsere drei Varianten sie? |
| 5 | [How to design GREAT thumbnails (even if you're not a designer)](https://www.youtube.com/watch?v=7Cn0wncfkNA) | Jay Clouse | | Wie kommt jemand ohne Designer zu guten Thumbnails? Passt direkt zu Ticket 09 |
| 6 | [The NEW Rules Of YouTube (From a 50 Billion View Strategist)](https://www.youtube.com/watch?v=dAR3d6xnG0o) | Sweat Equity, Gast Paddy Galloway | 68 min | Thumbnails 0:57 bis 11:48, Titel 15:10, Aufbau 18:45, Payoff und Retention 24:30 |
| 7 | [Write Better YouTube Titles In 54 Minutes](https://www.youtube.com/watch?v=uLNWlOhEHpo) | Jay Clouse, Gast Jake Thomas (Creator Hooks) | 54 min | Welche Titel-Muster gibt es, und kennt der Titel-Builder sie? |

## 3. Hook und Skript (Stufe 2, für Video 2)

| # | Video | Kanal | Coach-Frage |
|---|---|---|---|
| 8 | [How to Create Irresistible Hooks](https://www.youtube.com/watch?v=LmXpbP7dD48) | Kallaway | Was muss in den ersten 30 Sekunden passieren? Prüfen gegen den Hook von Video 1 |
| 9 | [How To Write A Killer Script That Keeps Viewers Hooked](https://www.youtube.com/watch?v=7I50PECz7SU) | Kallaway | Welche Skriptformel steckt dahinter, und deckt `substrate/skript-geruest.md` sie ab? |
| 10 | [How I Grew from 0 to 100K Subscribers in 5 Months](https://www.youtube.com/watch?v=3y-WiiUaqb4) | Kallaway | Sein Gesamtsystem in frei: was davon ist für einen deutschen Kanal ab null relevant? |

## 4. Schnitt und B-Roll (Stufe 5 und 6)

| # | Video | Kanal | Coach-Frage |
|---|---|---|---|
| 11 | [Nate Herk: Skill aus einem Video bauen](https://www.youtube.com/watch?v=7jHXoPGnA4c) | Nate Herk | Schon ausgewertet in Ticket 05. Nur noch einmal gegen das Edit-Interview halten |
| 12 | Brad Bonanno: automatische B-Roll | Brad Bonanno | Schon ausgewertet in `.scratch/yt-os/assets/brad-bonanno-auto-broll.md` |
| 13 | Tyler: Three.js-B-Roll (Link aus Jays Zoom-Chat) | Tyler | Link fehlt noch, Chris hat ihn im Zoom-Chat vom 28.09. |

## Vorgehen

- Ein Agent pro Block, nicht alle auf einmal. Block 1 zuerst, weil er über den Signal Room entscheidet.
- Rohe Transkripte bleiben außerhalb des Repos. Ins Repo kommt nur die verdichtete Checkliste in eigenen Worten.
- Die Liste wächst: Findet ein Coach-Video ein weiteres gutes Video, kommt es unten dazu.
