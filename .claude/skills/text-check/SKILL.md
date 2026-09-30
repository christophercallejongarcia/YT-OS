---
name: text-check
description: Ein Prüftor für YT-OS-Skripte vor der Freigabe. Prüft beide Fassungen (v4a Hybrid, v4b Wortlaut) auf harte KI-Marker (slop-check), auf KI-Klang beim Vorlesen (vorlese-check, auch im Hook), auf Struktur-Muster (anti-response-patterns) und gegen das Skript-Gerüst. Endet mit dem Küchentisch-Test für Chris. Letzte Stufe der Skript-Kette.
when_to_use: Nach sprechfassung, oder vor jedem Dreh, oder "text-check", "prüf das Skript", "ist das fertig", "klingt das nach KI", "Vorlesetest".
argument-hint: <video-ordner oder datei>
disable-model-invocation: true
---

# text-check: das Prüftor

Stufe 4 der Kette: skript-partner → skript-mix → skript-anreichern → sprechfassung → **text-check**.

Eingabe: `$ARGUMENTS`, ein Video-Ordner (dann `skript-v4a-hybrid.md` und `skript-v4b-wortlaut.md`) oder eine einzelne Datei.

## Prüfungen

Jede Prüfung läuft für jede Datei.

1. **Harte KI-Marker (Regex):** `~/.claude/skills/slop-check/scripts/slop-lint.sh <datei>`. Harte Treffer sind immer ein Fehler.
2. **KI-Klang beim Vorlesen:** `python3 ${CLAUDE_SKILL_DIR}/scripts/vorlese-check.py <datei>`. Misst den Fließtext, den Chris vorliest, einmal gesamt und einmal nur den Hook. Stichpunkte, Überschriften und Regie-Zeilen zählen nicht.
   - hart: Stakkato (3 oder mehr Sätze mit höchstens 6 Wörtern in Folge), Median der Satzlänge unter 11, mehr als 20 Prozent kurze Sätze, Selbstfrage mit Antwort, binärer Kontrast, "Punkt." als Satzende
   - weich: Doppelpunkt-Enthüllung, Dreierliste, dreimal derselbe Satzanfang, Satz über 35 Wörter, Median über 20 (klingt nach Schriftsprache). Ziel für gesprochenen Text ist ein Median von 13 bis 16 Wörtern
   - Weiche Treffer einzeln bewerten: stören sie beim Sprechen oder nicht? Nicht jede Dreierliste ist falsch, wenn es wirklich drei Dinge sind.
   - Fassung A hat wenig Fließtext. Dort zählen vor allem Hook, Pitch und Mini-Hooks.
3. **Struktur-Muster (Modell):** die Modell-Stufe des `slop-check`-Skills (`~/.claude/skills/slop-check/SKILL.md`) und die Checkliste aus `anti-response-patterns`.
4. **Gerüst:** gegen `substrate/skript-geruest.md`. Pflicht: Hook, Pitch mit Vorstellung, Kapitel, Zusammenfassung, CTA. Dazu:
   - Der Hook in A und B steht wörtlich so in `packaging.md`: derselbe gewählte Hook in beiden, oder bei zwei Hooks im Test der erste in A und der zweite in B.
   - Der Hook greift in den ersten 15 Sekunden (etwa 35 Wörter) auf, was Thumbnail-Botschaft und Titel aus `packaging.md` versprechen. Kommt das später, ist es ein weicher Befund, den Chris kennen muss.
   - Fassung A: jedes Kapitel hat eine Clip-Marke, einen wörtlichen Mini-Hook und 3 bis 5 Stichpunkte, die Auflösung steht als letzter Stichpunkt.
   - Länge: vorlese-check schätzt die Sprechdauer von Fassung B. Liegt sie deutlich über `laenge_ziel`, ist das ein weicher Befund für Chris, gekürzt wird in v1 bis v3, nicht in der Sprechfassung.
5. **Vorlesbarkeit:** Zungenbrecher, Abkürzungen, die man nicht sprechen kann, Zahlen in Ziffern im Fließtext.
6. **Chris' Markierungen:** jeder Eintrag in `.claude/skills/sprechfassung/regeln.md` ist ein Prüfpunkt. Kommt eine markierte Stelle oder ein markiertes Muster wieder vor, ist das ein harter Treffer.

## Ergebnis

Ein Bericht im Chat, keine Änderung an den Dateien:

- pro Datei **Bestanden** oder **Nicht bestanden**, dazu die Kennzahlen aus vorlese-check (gesamt und Hook)
- pro Befund: Zeile, Zitat, Prüfung, Vorschlag
- Bestanden heißt: 0 harte Treffer aus slop-lint und vorlese-check, alle Pflicht-Abschnitte da, keine Stelle, an der man beim Vorlesen hängen bleibt

## Küchentisch-Test für Chris

Kein Messwert ersetzt das eigene Ohr. Nach einem grünen text-check:

1. Den Hook laut lesen, so wie vor der Kamera, und als Sprachmemo aufnehmen.
2. Anhören und drei Stellen markieren:
   - Wo stolpere ich?
   - Wo klinge ich wie ein Sprecher statt wie ich?
   - Welchen Satz würde ich so nie zu einem Freund am Küchentisch sagen?
3. Jede Markierung wird umgeschrieben. Danach landet sie in `.claude/skills/sprechfassung/regeln.md`: die Stelle, warum sie nicht passt, wie Chris es sagen würde. So lernt die Kette mit jedem Video dazu.

## Freigabe

Bei Bestanden und nach dem Küchentisch-Test wählt Chris eine Fassung. Erst nach seinem Okay wird sie zu `<ordner>/skript.md` (die Fassung für den Teleprompter). Die andere bleibt liegen, damit er beim nächsten Dreh vergleichen kann.
