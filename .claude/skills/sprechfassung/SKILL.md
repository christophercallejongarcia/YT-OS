---
name: sprechfassung
description: Macht aus einem fertigen YT-OS-Skript zwei Teleprompter-Fassungen, die beim Vorlesen nicht nach KI klingen. Fassung A (Hybrid) hat Hook, Pitch und Kapitel-Einstiege wörtlich und den Rest als Stichpunkte, Fassung B ist komplett Wort für Wort. Dritte Stufe der Skript-Kette.
when_to_use: Nach skript-anreichern v3, oder "sprechfassung", "mach das sprechbar", "klingt zu geschrieben", "für den Teleprompter", "Fassung A und B".
argument-hint: <video-ordner>
disable-model-invocation: true
---

# sprechfassung: v3 → v4a und v4b

Stufe 3 von 4: skript-mix → skript-anreichern → **sprechfassung** → text-check. Gesteuert wird die Kette von `skript-partner`.

Eingabe: `$ARGUMENTS` ist der Video-Ordner (`videos/<ordner>` oder bei Probeläufen ein Ordner unter `private/`). Grundlage ist die neueste Version im Ordner: `skript-v3-beispiele.md`, sonst v2, sonst v1. Dazu `packaging.md` aus dem Ordner. Fehlt `packaging.md`, abbrechen und auf `skript-partner` verweisen.

## Schritte

1. **Lesen.** Grundlage, `packaging.md` und `regeln.md` in diesem Skill-Ordner (${CLAUDE_SKILL_DIR}/regeln.md). In `regeln.md` stehen nur die Stellen, die Chris beim Vorlesetest markiert hat. Sie gehen jeder Regel unten vor. Ist die Datei leer, gelten die Wortlaut-Regeln allein.
2. **Hook und Pitch übernehmen.** Den gewählten Hook und den Pitch-Block aus `packaging.md` Wort für Wort einsetzen. Stehen dort zwei Hooks im Test, bekommt Fassung A den ersten und Fassung B den zweiten. Nicht glätten, nicht kürzen, Chris hat sie ausgewählt. Fällt dir beim Hook ein Verstoß gegen die Regeln unten auf, meldest du ihn am Ende, statt ihn still zu ändern.
3. **Fassung B schreiben.** Den Rest Absatz für Absatz nach den Wortlaut-Regeln sprechbar machen. Inhalt, Reihenfolge und Fakten bleiben gleich, keine Aussage streichen, keine neue erfinden. Stellen, die im Skript als Brain Dump von Chris markiert sind, behalten seinen Wortlaut und werden nur geordnet (Regel 9).
4. **Fassung A ableiten.** Aus B entsteht A nach dem Aufbau unten. A und B sagen inhaltlich dasselbe.
5. **Nachschärfen.** Beide Fassungen einmal durch `python3 .claude/skills/text-check/scripts/vorlese-check.py <datei>` und `~/.claude/skills/slop-check/scripts/slop-lint.sh <datei>` schicken. Harte Treffer außerhalb des Hooks umschreiben, bis beide grün sind. Danach von Hand lesen: gehäuftes "sondern", "genau", "wirklich", "einfach" ausdünnen und jedes Wort tauschen, das Chris nie sagen würde.
6. **Speichern.** `skript-v4b-wortlaut.md` und `skript-v4a-hybrid.md` im Ordner, Frontmatter mit `version: v4a` bzw. `v4b`, `basis:` (die Grundlage) und `hook:` (Variante aus `packaging.md`).
7. **Stopp.** Weiter mit `text-check`. Keine weitere Stufe von selbst starten.

## Wortlaut-Regeln

Abgeleitet aus Simtents Vorgehen beim Ordnen von freier Rede und aus einer Messung von Talking-Head-Videos (Ticket 26), in eigenen Worten.

**So klingt es gesprochen**

1. **Sätze laufen weiter.** Ein Gedanke wird mit "und", "weil", "wenn ... dann", "also", "aber" oder "deshalb" zu Ende erzählt, statt in drei Mini-Sätze zerhackt zu werden. Die meisten Sätze haben 10 bis 20 Wörter, der Median liegt bei 13 bis 16. Ein Satz über 30 Wörter ist selten nötig, sonst klingt es nach Schriftsprache.
2. **Kurze Sätze sind die Ausnahme.** Höchstens jeder fünfte Satz hat 6 Wörter oder weniger, und nie stehen drei davon hintereinander. Ein kurzer Satz wirkt nur, wenn er allein steht.
3. **Rechnungen laut vorrechnen.** "Wenn du jeden Tag zehn Minuten sparst, sind das im Monat gut drei Stunden." Das klingt nach jemandem, der nachdenkt.
4. **Ehrlich einschränken.** "Bei mir hat das geklappt, bei dir kann das anders aussehen." Keine Übertreibung ohne Beleg.
5. **Fachwort sofort erklären,** im selben Satz und mit einem Bild aus dem Alltag.
6. **Alltagsszenen statt Behauptungen.** Eine kleine Szene (Zug, Küchentisch, Montagmorgen) trägt mehr als ein Satz über Produktivität.
7. **Zahlen ausgeschrieben,** auch Prozent und Euro: "einundsiebzig Prozent", "zwanzig Euro".
8. **Umgangssprache sparsam.** 'ne, mal, halt, eigentlich: höchstens eins pro Satz und nicht in jedem Satz.
9. **Brain Dump bleibt Chris.** Wo Chris frei gesprochen hat, bleiben seine Wörter und sein Tonfall. Geordnet wird nur: Doppeltes raus, Sprünge glätten, klarer Bogen, Fakten prüfen und stimmig korrigieren.

**Das klingt beim Vorlesen nach KI**

- Stakkato: viele Mini-Sätze hintereinander, "Punkt." als Satzende
- binärer Kontrast: "nicht X, sondern Y", "Es geht nicht um X. Es geht um Y."
- Selbstfrage mit Antwort: "Das Ergebnis? Mehr Zeit."
- Doppelpunkt-Enthüllung: "Und das Beste daran: ..."
- Dreierlisten als Rhythmus-Trick, wenn es eigentlich zwei oder vier Dinge sind
- künstliche Übergänge: "Kommen wir nun zu", "Lass uns eintauchen", "Und hier wird es spannend"
- Floskeln, Füllsätze, Aufzählungen im Fließtext, Emojis, Gedankenstriche
- Erfolgs-Autorität: Chris ist im Aufbau und sagt das auch so
- Wörter, die man am Küchentisch nie sagt: "essenziell", "maßgeblich", "fundamental", "Game Changer", "revolutionär"

## Fassung B: Wort für Wort

Alles ausgeschrieben, so wie Video 1. Für den Teleprompter gesetzt: ein Gedanke pro Absatz, Absätze mit 2 bis 5 Sätzen. Regie in eckigen Klammern (`[B-ROLL: ...]`) bleibt erhalten, sie wird nicht vorgelesen.

## Fassung A: Hybrid

Die erste Minute sitzt Wort für Wort, danach spricht Chris frei entlang von Stichpunkten, Kapitel für Kapitel.

```markdown
## Hook
[CLIP 01: Hook]
<Hook wörtlich aus packaging.md>

## Pitch
[CLIP 02: Pitch]
<Pitch-Block wörtlich>

## Kapitel 1: <Titel>
[CLIP 03: Kapitel 1]
<Mini-Hook wörtlich, 1 bis 3 Sätze, baut die Frage des Kapitels auf>
- <Stichpunkt>
- <Stichpunkt>
- <Stichpunkt>
- <Auflösung als letzter Stichpunkt>

...

## Zusammenfassung
[CLIP NN: Zusammenfassung]
- <ein Stichpunkt pro Kapitel>

## CTA
[CLIP NN: CTA]
<CTA wörtlich>
```

- **Mini-Hook:** wörtlich, weil der Einstieg ins Kapitel sitzen muss. Er stellt die Frage oder das Problem, das Kapitel löst es erst am Ende auf.
- **Stichpunkte:** 3 bis 5 pro Kapitel, Stichwörter statt ganzer Sätze, in der Reihenfolge des Spannungsbogens. Die Auflösung steht immer als letzter Punkt. Beispiele und Zahlen stehen als Stichwort drin ("Lern-App, 71 → 80 Prozent"), damit Chris sie nicht vergisst.
- **Jedes Kapitel funktioniert allein**, damit es später als Short taugt.
- **Clip-Marken:** ein Clip pro Hook, Pitch und Kapitel. Versprecher: den Clip neu sprechen oder klatschen als Marke für den Schnitt.

## Am Ende sagen

Pfade zu beiden Fassungen, die Kennzahlen aus `vorlese-check` (Median, Anteil kurzer Sätze, gesamt und Hook) für A und B, die 3 größten Änderungen als Beispiel (vorher, nachher), Auffälligkeiten im Hook, falls es welche gibt, und den nächsten Schritt: `text-check <ordner>`.
