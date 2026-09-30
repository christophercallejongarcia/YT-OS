# Skript-Gerüst

Jedes YT-OS-Skript hat denselben Ablauf. Was sich ändert, ist die Herangehensweise pro Abschnitt. Die kommt aus den Playbooks. Solange ein Playbook fehlt, gilt das Muster aus dem stärksten Quellvideo.

## Vorab: Packaging

Bevor ein Satz Skript entsteht, klärt `skript-partner` mit Chris vier Dinge und schreibt sie in `packaging.md`:

1. **Versprechen:** was der Zuschauer nach dem Video kann oder weiß, in einem Satz
2. **Thumbnail-Botschaft:** ein kurzer Satz, höchstens vier bis fünf Wörter im Bild
3. **Titel:** ergänzt das Thumbnail, statt es zu wiederholen, dazu bis zu zwei Testtitel
4. **Hook:** 2 bis 3 Varianten nebeneinander, Chris wählt eine oder testet zwei

Die Reihenfolge kommt von Simtent: Der Hook muss in den ersten Sekunden einlösen, was Thumbnail und Titel versprechen. Das fertige Thumbnail und die Titel-Tests entstehen erst nach dem Schnitt, so wie bei Mark Kashef, der Packaging-Muster am Anfang einfließen lässt und am Ende entscheidet.

## Ablauf

| # | Abschnitt | Pflicht | Wie (Quelle der Herangehensweise) |
|---|---|---|---|
| 1 | Hook | ja | Wörtlich aus `packaging.md`. 30 bis 60 Sekunden: Klick bestätigen, Nutzen anteasern, einen Einwand vorwegnehmen, kurz ins Video überleiten. Enthält das Versprechen. Später `substrate/playbooks/hooks-und-titel.md` |
| 2 | Pitch mit Vorstellung | ja | Ein Block, etwa 20 Sekunden, direkt nach dem Hook. Vorlage unten |
| 3 | Kapitel | ja | Jedes Kapitel ist ein Mini-Skript: eigener Mini-Hook, Spannung aufbauen, Auflösung erst am Ende. Es funktioniert auch allein, damit später ein Short daraus werden kann. Später `substrate/playbooks/skript-aufbau.md`, bis dahin die Blockfolge der Quellvideos |
| 4 | Open Loop vor dem wichtigsten Kapitel | empfohlen | "Bevor wir zum wichtigsten Teil kommen ..." |
| 5 | Zusammenfassung | ja | Die Kapitel in je einem Satz |
| 6 | CTA | ja | Ein konkreter nächster Schritt, wörtlich. Welcher, steht in `packaging.md`. Stand Roadmap: OS Coach auf Gumroad (Ticket 21) |

## Pitch mit Vorstellung

Das feste Etikett des Kanals: wer Chris ist, um welche drei Themen es geht, warum man ihm zuhören soll, und eine Einladung zum Abo. Es darf sich mit der Zeit ändern. Kein "Daumen nach oben", keine Erfolgs-Autorität, weil Chris im Aufbau ist und das auch so sagt.

Vorlage (Entwurf vom 30.09., Chris gibt beim ersten Vorlesen frei):

> Ich bin Chris, und hier geht es um Claude, um KI-Agents und darum, wie du dir dein eigenes KI-Betriebssystem baust. Ich baue meins gerade selbst, teste alles an meiner eigenen Arbeit und zeige dir hier nur das, was bei mir funktioniert. Wenn du da mitgehen willst, abonnier den Kanal, dann verpasst du den nächsten Schritt nicht.

Nur der Themen-Satz darf sich an ein Video anpassen. Bausteine für den Satz, warum man zuhören soll, je nach Thema:

- KI-Dozent (KIPA), unter den ersten Claude Code Architects in Zertifizierung
- baut sein eigenes KI-Betriebssystem und nimmt die Zuschauer offen mit
- keine fertige Millionen-Story: baut, testet, gibt das Funktionierende weiter

## Zwei Fassungen

`sprechfassung` macht aus jedem Skript zwei Fassungen. Chris testet beim Dreh, welche ihm besser liegt.

- **Fassung A, Hybrid** (`skript-v4a-hybrid.md`): Hook, Pitch und CTA Wort für Wort, jedes Kapitel mit wörtlichem Mini-Hook und 3 bis 5 Stichpunkten zum Freisprechen. Aufnahme Clip für Clip: ein Clip für den Hook, einer für den Pitch, einer pro Kapitel.
- **Fassung B, Wortlaut** (`skript-v4b-wortlaut.md`): alles Wort für Wort für den Teleprompter, wie bei Video 1.

Der Hook ist in beiden gleich, außer Chris testet zwei Hooks. Dann bekommt A den einen und B den anderen. Die Wortlaut-Regeln, damit es beim Vorlesen nicht nach KI klingt, stehen in `.claude/skills/sprechfassung/SKILL.md`. Chris' eigene Markierungen aus dem Küchentisch-Test sammelt `.claude/skills/sprechfassung/regeln.md`.

## Nicht Pflicht

- eigene Beispiele: erfundene Beispiele zur Veranschaulichung sind in Ordnung
- Schluss auf dem KI-OS-Blickwinkel
