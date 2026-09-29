# Roadmap: Tag 5 bis Tag 30

Stand 2026-09-29 (Tag 5). Entschieden mit Chris am selben Tag.

## Ziele

- **Video 1 ist am Samstag, 10.10. (Tag 16), öffentlich auf YouTube.** Jede der sieben Stufen wurde dafür einmal echt benutzt.
- **Video 2 ist bis Samstag, 24.10. (Tag 30), gedreht.** Das Thema kommt aus einem neuen Signal-Room-Lauf, das Skript entsteht über die eigenen Skills.
- Die Shipped-Abgabe geht am Tag 29 raus (das Formular erscheint ab Tag 22).

## Rahmen

- Chris hat pro Tag 90 bis 120 Minuten. Die Agents arbeiten zusätzlich, der Captain verteilt.
- Höchstens zwei Domains gleichzeitig. Pro Domain gibt es einen Cook-Thread, der die Aufgabe von der Recherche bis zur Umsetzung behält.
- Nichts geht öffentlich raus ohne Chris' Freigabe: kein Merge, kein Gumroad-Produkt, kein Upload, kein Post.
- Hakt eine Stufe, macht Chris von Hand weiter. Das Datum 10.10. hat Vorrang vor jeder Automatisierung.

## Jeden Tag (15 Minuten)

1. Den Tag in der EA/30-App loggen: ein bis zwei Sätze plus Beweis-Link (Commit oder Datei).
2. Eine Antwort in der Skool-Community schreiben, bis die 9 Antworten voll sind (Stand: 2 von 9).
3. Commit und Push von allem, was an dem Tag fertig wurde.

Community-Posts: 2 von 4 sind verbraucht. Post 3 kommt am Tag 10 (Schnitt-Vergleich), Post 4 am Tag 16 (Video 1 ist online). Danach zählen nur noch Antworten.

## Domains

| Domain | Worker | Zeitraum | Ticket |
|---|---|---|---|
| A Schnitt Video 1 | Cook | Tag 5 bis 15 | 06, 07, 12, 20 |
| B B-Roll | Waiter, Cook | Tag 8 bis 11 | 08 |
| C Titel und Thumbnail (Signal Room) | Cook (bestehende Threads), Cleaner | Tag 5 bis 7, Tag 20 | 09, PR 4 und 5 |
| D CTA Gumroad | Cook, Waiter | Tag 11 bis 13 | 21 |
| E Upload-Stufe | Cook | Tag 13 bis 15 | 22 |
| F Video 2 | Cook, Pastry Chef | Tag 17 bis 30 | 23, 15, 16 |

## Woche 1: Rohmaterial, Werkzeug-Entscheidungen, Edit-Plan

### Tag 5, Di 29.09.
- **Du:** Roadmap freigeben.
- **Agents:** Cook A erstellt das Transkript des Haupt-Takes mit Zeitstempeln pro Wort (WhisperX, Ablage in `private/`). Cook C bringt PR 4 (Titel-Builder) und PR 5 (Thumbnail-Builder) zu Ende, der Cleaner reviewt beide.
- **Fertig wenn:** Transkript liegt lokal, beide PRs haben ein Review.

### Tag 6, Mi 30.09.
- **Du:** Rohschnitt-Vorschlag ansehen (Versprecher, doppelte Takes, Pausen sind markiert). Die Ziellänge festlegen und entscheiden, welche Abschnitte bleiben. Dazu drei der fünf Titel für den A/B-Test wählen.
- **Agents:** Cook A baut die Schnittliste aus deinen Entscheidungen und prüft, ob im Take ein CTA gesprochen wurde. Der Waiter prüft, ob DaVinci Resolve 21.0.4 installiert ist, und klärt den Descript-Zugang (ein Konto legt er nur mit deinem OK an). Cook C arbeitet die Review-Befunde ab. Der Waiter testet die Ton-Rettung (das Mikro war beim Dreh nicht richtig eingestellt): dieselbe Minute durch Cleanvoice, Adobe Podcast Enhance und Descript Studio Sound.
- **Fertig wenn:** Schnittliste steht, 3 Titel sind gewählt, alle drei Schnitt-Werkzeuge sind startklar, drei Ton-Proben liegen zum Anhören bereit.

### Tag 7, Do 01.10.
- **Du:** Drei Thumbnail-Varianten ansehen und eine wählen. Merge von PR 4 und 5 freigeben.
- **Agents:** Cook A schneidet denselben Abschnitt von 1 bis 2 Minuten dreimal: mit HyperFrames plus Opus, mit DaVinci plus MCP und mit Descript (Ticket 20).
- **Fertig wenn:** Drei Test-Schnitte liegen nebeneinander, das Thumbnail ist gewählt, Stufe 3 wurde echt benutzt.

### Tag 8, Fr 02.10.
- **Du:** Die drei Test-Schnitte vergleichen und das Werkzeug für Video 1 festlegen. Die Entscheidung kommt in die Map.
- **Agents:** Der Waiter startet den B-Roll-Vergleich (Ticket 08): dieselbe Stelle per Playwright, per Astra Computer Use und per Chrome-Extension, mit sichtbarem Cursor und im Sprechtempo.
- **Fertig wenn:** Das Schnitt-Werkzeug ist entschieden.

### Tag 9, Sa 03.10.
- **Du:** Die drei B-Roll-Clips ansehen und einen Weg wählen. Danach Teil 1 des Edit-Interviews (Ticket 07): Der Cook geht mit dir durch die erste Hälfte des Transkripts, und du wählst pro Stelle Grafik, B-Roll oder nichts.
- **Agents:** Cook A führt das Interview und schreibt die Cue-Liste.
- **Fertig wenn:** Der B-Roll-Weg ist entschieden, die halbe Cue-Liste steht.

### Tag 10, So 04.10.
- **Du:** Teil 2 des Edit-Interviews. Community-Post 3 mit dem Schnitt- und B-Roll-Vergleich (als Entwurf vom Captain, du gibst frei).
- **Agents:** Der Waiter nimmt alle B-Roll-Stellen aus der Cue-Liste mit dem gewählten Weg auf.
- **Fertig wenn:** Die Cue-Liste ist vollständig, Ticket 07 und 08 sind resolved.

## Woche 2: Schnitt, CTA, Upload

### Tag 11, Mo 05.10.
- **Du:** B-Roll-Clips sichten. Was fehlt, nimmst du selbst mit der macOS-Bildschirmaufnahme auf.
- **Agents:** Cook A erstellt den Grobschnitt komplett im gewählten Werkzeug und baut die erste Hälfte der HyperFrames-Grafiken. Cook D verpackt den OS Coach als Gumroad-Produkt (Datei, Produkttext). Der Waiter richtet das Gumroad-Konto ein, das Produkt bleibt unveröffentlicht.
- **Fertig wenn:** Grobschnitt v1 ist gerendert, Stufe 5 wurde echt benutzt.

### Tag 12, Di 06.10.
- **Du:** Grobschnitt v1 ganz ansehen und Notizen mit Zeitstempel diktieren (Wispr Flow).
- **Agents:** Cook A baut die zweite Hälfte der Grafiken und setzt deine Notizen um.
- **Fertig wenn:** Deine Notizen sind eingearbeitet.

### Tag 13, Mi 07.10.
- **Du:** Die Gumroad-Produktseite prüfen und freigeben. Fehlt der CTA im Take, nimmst du 20 Sekunden nach (Kamera wie beim Dreh) oder der CTA kommt als Einblendung.
- **Agents:** Cook A fügt Schnitt v2 mit Musik von Epidemic Sound, Sounds und CTA zusammen. Cook E baut den Upload-Skill (Ticket 22): Beschreibung, Kapitel aus dem Transkript, Tags, Gumroad-Link.
- **Fertig wenn:** Schnitt v2 ist gerendert, das Gumroad-Produkt ist freigegeben.

### Tag 14, Do 08.10.
- **Du:** Schnitt v2 ansehen und letzte Änderungen nennen. Eine echte Person aus deiner Zielgruppe schaut das Video und sagt dir, wo sie abschaltet (Marks D25).
- **Agents:** Cook A prüft das Video mit `/watch` (Brads Muster) und liefert eine Befundliste. Cook E füllt das Upload-Paket: 3 Titel, Thumbnail, Beschreibung, Kapitel, Tags.
- **Fertig wenn:** Die Befundliste ist abgearbeitet, das Upload-Paket ist komplett.

### Tag 15, Fr 09.10.
- **Du:** Die finale Fassung ansehen und freigeben. Das Video in YouTube Studio von Hand hochladen, zuerst auf "privat".
- **Agents:** Cook A rendert das Finale in 4K. Der Captain schreibt Community-Post 4 und den README-Log als Entwurf.
- **Fertig wenn:** Das Video liegt privat in YouTube Studio.

### Tag 16, Sa 10.10.: Video 1 geht online
- **Du:** Das Video auf "öffentlich" stellen und den Community-Post 4 mit Link freigeben.
- **Agents:** Den README-Log, die Map und memory.md auf den Stand bringen.
- **Fertig wenn:** Video 1 ist öffentlich, alle sieben Stufen sind einmal echt benutzt.

## Woche 3 und 4: Video 2 bis zum Dreh

### Tag 17, So 11.10.
- **Du:** Aus drei Themenvorschlägen aus dem Signal Room eines wählen.
- **Agents:** Cook C startet einen frischen Outlier-Lauf und macht drei Vorschläge mit je 3 bis 5 Outliern. Der Pastry Chef recherchiert über Nacht die Playbooks für Hooks und Titel (15) und Skript-Aufbau (16).

### Tag 18, Mo 12.10.
- **Du:** Die Playbooks kurz prüfen, dann `skript-mix` laufen lassen und v1 prüfen.

### Tag 19, Di 13.10.
- **Du:** `skript-anreichern` für v2 (Community und Faktencheck) und v3 (Beispiele), jede Version prüfen.

### Tag 20, Mi 14.10.
- **Du:** `sprechfassung` und `text-check`. Nach Jays Rat wird das Skript zu Talking Points, ausformuliert bleiben nur Stellen ohne Kamera.
- **Agents:** Titel-Builder und Thumbnail-Builder laufen für Video 2.

### Tag 21, Do 15.10.
- **Du:** Probelauf vor der Kamera, B-Roll-Stellen markieren, Standbilder für das Thumbnail planen.
- **Agents:** Die Editor-Ernte für Video 1 (Ticket 13): Plan gegen tatsächlichen Ablauf stellen, Lücken als Tickets.

### Tag 22, Fr 16.10.
- **Du:** Den Entwurf der Shipped-Abgabe lesen (das Formular erscheint heute). Die Abgabe geht erst am Tag 29 raus.
- **Agents:** Der Captain schreibt den Abgabe-Entwurf aus README-Log, Map und Commits.

### Tag 23, Sa 17.10.: Dreh Video 2
- **Du:** Dreh.
- **Agents:** Dreh-Log mit Metadaten und SHA-256, Transkript mit Wort-Zeitstempeln.

### Tag 24, So 18.10.
- Puffer für einen Nachdreh.

### Tag 25 bis 28, Mo 19.10. bis Do 22.10.
- **Du:** B-Roll für Video 2 mit dem Recorder aus Woche 1, danach Edit-Interview für Video 2.
- **Agents:** Der Pastry Chef schreibt aus der Erfahrung mit Video 1 die Playbooks für B-Roll und Edit (17) und Thumbnails (18). Gibt es Luft, beginnt Cook A mit dem Grobschnitt von Video 2.

### Tag 29, Fr 23.10.
- **Du:** Die Shipped-Abgabe einreichen.

### Tag 30, Sa 24.10.
- **Du:** `/os-coach audit`, Rückblick und die nächsten Schritte nach der Challenge (Analytics, Funnel, Leadmagnet-Landingpage) in die Map.

## Marks Route in der EA/30-App

Die App zeigt eine Standard-Route, die bei null anfängt und am Tag 21 dreht. Du bist bei einigen Schritten schon weiter, andere entfallen. So passt sie auf diesen Plan:

| Marks Schritt | Stand | Hier |
|---|---|---|
| D02 bis D04 Scope, Repo, sechs Stufen | erledigt | |
| D05 Outlier-Auswahl | heute | Tag 5 |
| D06 Packaging-Muster | erledigt (Titel-Builder) | |
| D07 Erstes Thumbnail | offen | Tag 7 |
| D08 bis D10 Skript-Board | entfällt, Skript über Skills | |
| D11, D12 Skript, sprechbar | erledigt | |
| D13 bis D15 B-Roll-Recorder | offen | Tag 8 bis 11 |
| D16 bis D18 Stil, Style-Pack, Grafik-Test | offen | Tag 9 bis 12 |
| D19, D20 Schnitt einrichten, Grobschnitt | offen | Tag 6 bis 8, Tag 11 |
| D21 Dreh | erledigt (27.09.) | |
| D22 Ton ersetzen | offen | Tag 6 |
| D23 Untertitel, Ton säubern | offen | Tag 13 |
| D24 bis D26 Prüfen, Zuschauer-Test, Nachbessern | offen | Tag 14 |
| D27 Alle Stufen im Repo | offen | Tag 16 |
| D28, D29 Export, Upload vorbereiten | offen | Tag 14, 15 |
| D30 Veröffentlichen | offen | Tag 16 |

## Wenn es hakt

- Der Schnitt-Test am Tag 7 liefert nichts Brauchbares: DaVinci von Hand, HyperFrames nur für Grafiken.
- Der B-Roll-Recorder läuft bis Tag 10 nicht: Die Stellen nimmst du selbst mit der macOS-Aufnahme auf.
- Das Gumroad-Produkt ist am Tag 13 nicht fertig: Der CTA lautet "Abonnieren plus nächstes Video", der Gumroad-Link kommt später in die Beschreibung.
- Tag 15 und 16 sind der einzige Puffer vor dem Upload. Rutscht etwas, fällt zuerst die zweite Hälfte der Grafiken weg, nicht der Termin.
