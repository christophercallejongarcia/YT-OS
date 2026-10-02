# Prototyp: Kommandozentrale für YT-OS

Wegwerf-Code auf dem Branch `prototype/kommandozentrale`. Kommt nie nach master. Gewählt wird hier eine Richtung, gebaut wird danach neu.

**Frage:** Wie sieht eine Oberfläche aus, die (b) auf einen Blick zeigt, wo jedes Video steht, und (c) Ergebnisse nebeneinander vergleichen und auswählen lässt, ohne Backend? Die Arbeit selbst passiert weiter in Claude Code, die Oberfläche übergibt einen kopierbaren Befehl.

## Starten

Aus dem Repo-Hauptordner:

```
python3 -m http.server 8765
```

Dann http://localhost:8765/prototype-kommandozentrale/ öffnen. Braucht Internet für Schriften, Icons und die Vorschaubilder der Outlier.

Umschalten über die Leiste unten oder die Pfeiltasten. Adresse: `?variant=A..D&state=chris|tester`, bei C zusätzlich `&d=paare` usw.

## Die vier Varianten

| | Variante | Hauptfrage, die sie beantwortet |
|---|---|---|
| A | Pipeline-Board | Wo steht jedes Video? Spalten sind Stufen, Karten sind Videos. |
| B | Video-Akte | Was liegt zu diesem einen Video vor, und was ist der nächste Schritt? |
| C | Entscheidungs-Tisch | Was wartet auf meine Entscheidung? Optionen nebeneinander, Auswahl baut den Befehl. |
| D | Begleiter | Was kopiere ich als Nächstes? Schmale Leiste neben Claude Code oder T3. |

Jede Variante hat zwei Zustände: **Chris** (echte Daten von Video 1 und 2) und **Neuer Tester** (frisch geklont, noch kein Video).

## Daten

Alles steht fest in `daten.js`, gezogen aus den Dateien im Repo, Stand 02.10.2026 (Commit 8fc1c58). Die Liste der Quellen zeigt der Knopf „Quellen“ in der Leiste. Was in keiner Datei steht, ist ocker gestrichelt markiert. Filme, Tonspuren und Transkripte bleiben in `private/`, der Prototyp zeigt nur, wo sie liegen.

## Was der Prototyp aufgedeckt hat

- **Der Stand von Video 1 lässt sich nicht aus den Dateinamen ablesen.** Es lief von Hand, vor der Skript-Kette. Nach der Tabelle in `skript-partner` stünde es bei „skript-mix“, obwohl es gedreht ist. Eine echte Kommandozentrale braucht pro Videoordner eine kleine Stand-Datei.
- **Ein Video steht oft in zwei Stufen gleichzeitig.** Video 1 ist im Schnitt und wartet parallel auf Titel und Thumbnail. Ein reines Kanban mit einer Karte pro Video bildet das nicht ab.
- **Für Tester fehlen zwei Skills:** einer für die Outlier-Suche mit eigenem YouTube-Schlüssel und einer, der `identity.md` für den eigenen Kanal anlegt. `thumbnail-lab` liegt noch auf einem Branch.
- **Entscheidungen brauchen Metadaten in Dateien.** Welche Datei der „Liam-Stil“ ist, ließ sich nur über die Bildbeschreibung in `packaging.md` zuordnen.

## Screenshots

Unter `screenshots/`, je Variante und Zustand bei 1440 Pixel Breite, Variante D zusätzlich bei 420. Dateien mit `-ganz` zeigen die ganze Seite.
