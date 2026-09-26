# Ziel und Scope festlegen

Type: grilling
Status: resolved

## Question

Welches Video ist Video 1, wie weit reicht der Scope, und wie gehen Planung und Produktion parallel, ohne sich zu überschneiden?

## Answer

Charting-Grilling vom 2026-09-26, Runde 1 und 2.

- **Video 1:** "Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen". Das Skript wurde aus zwei Outlier-Videos plus eigenem KI-OS-Blickwinkel gemischt, Dreh am 2026-09-27. Der Dreh wartet nicht auf die Pipeline. Die 99-%-Map in YouTube-os ist dadurch abgelöst.
- **Planung:** heute und morgen, keine Woche. Danach Specs und Tickets.
- **Wo was lebt:** YT-OS ist die Schaltzentrale und ein isoliertes KI-OS. YT-CommandCenter und YouTube-os sind Altlasten. Signal Room bleibt eine eigene App und bekommt YouTube als neue Quelle. Style-Packs bleiben im hyperframes-Repo. Architektur: `docs/yt-os-architektur.png`.
- **Scope:** Ideen und Verpackung plus Produktion (nach Kallaways Blueprint). Analytics und Funnel sind der nächste Scope. CTA offen, Kandidat ist der bestehende Lead-Magnet.
- **Nische:** Claude, KI-Agents, KI-Betriebssystem für Selbstständige und Teams. Englische Kanäle als Outlier-Quelle. Makler und Allfinanz gestrichen.
- **"End to end":** Jede Stufe wird für Video 1 einmal echt benutzt. Wo eine Stufe hakt, darf von Hand nachgeholfen werden, das wird als Ticket für Video 2 notiert.
- **Editor (Q7):** Eine Spec v0 entsteht vorab, auch als Arbeitsnachweis. Der Schnitt von Video 1 läuft parallel. Danach gleicht ein Ernte-Ticket Spec und tatsächliche Arbeit (git log, Session-Logs) ab.
- **Altprojekte (Q8):** Übernommen werden Skript V2 (erledigt), Hook-Formel und validierte Videoideen, über den os-coach-Kontext-Layer. `/watch` ist Brads claude-video-Repo und bereits als Plugin installiert.
- **B-Roll-Markierung (Q9):** Vor dem Dreh wird nichts markiert. Chris fehlt noch das Vokabular. Das Vokabular existiert aber schon: `hyperframes/videos/_style-packs/nate-o3IEkKXXXvo/ANIMATIONS.md` (38 Muster) und `_elements/ELEMENTS.md` (rund 29 Blöcke). Marks Rat vom 2026-09-10: Referenzvideo in Animationstypen mit Zeitstempeln zerlegen, dann einen Skill bauen, der einen interviewt, welche Edits wohin kommen. Die ersten beiden Schritte sind erledigt, der Interview-Skill fehlt. Siehe Edit-Interview-Ticket.
- **B-Roll-Recorder (Q10):** Dieselbe Stelle wird dreimal aufgenommen (Playwright, Astra Computer Use, Claude-Chrome-Extension), dann entscheidet Chris.
