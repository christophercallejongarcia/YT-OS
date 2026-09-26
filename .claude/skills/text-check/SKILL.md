---
name: text-check
description: Ein Prüftor für YT-OS-Skripte vor der Freigabe. Führt slop-check (Regex und Modell-Urteil) und anti-response-patterns in einem Lauf zusammen und prüft das Skript-Gerüst (Vorstellung, CTA) und die Vorlesbarkeit. Letzte Stufe der Skript-Kette.
when_to_use: Nach sprechfassung, oder vor jedem Dreh, oder "text-check", "prüf das Skript", "ist das fertig", "klingt das nach KI".
argument-hint: <video-ordner oder datei>
disable-model-invocation: true
---

# text-check: das Prüftor

Stufe 4 von 4: skript-mix → skript-anreichern → sprechfassung → **text-check**.

Eingabe: `$ARGUMENTS`, ein Video-Ordner (dann `skript-v4-sprechfassung.md`) oder eine Datei.

## Prüfungen

1. **Harte KI-Marker (Regex):** `~/.claude/skills/slop-check/scripts/slop-lint.sh <datei>` ausführen. Harte Treffer sind immer ein Fehler.
2. **Struktur-Muster (Modell):** die Modell-Stufe des `slop-check`-Skills anwenden (`~/.claude/skills/slop-check/SKILL.md`) und die Checkliste aus `anti-response-patterns`. Weiche Treffer einzeln bewerten: stören sie beim Sprechen oder nicht?
3. **Gerüst:** gegen `substrate/skript-geruest.md` prüfen. Pflicht: Hook, Versprechen, kurze Vorstellung, Hauptteil, Zusammenfassung, CTA.
4. **Vorlesbarkeit:** Sätze über 25 Wörter, Zungenbrecher, Abkürzungen, die man nicht sprechen kann, Zahlen in Ziffern.
5. **Stimme:** Stichprobe von 5 Absätzen gegen `.claude/skills/sprechfassung/regeln.md`.

## Ergebnis

Ein Bericht im Chat, keine Änderung an der Datei:

- **Bestanden** oder **Nicht bestanden**
- pro Befund: Zeile, Zitat, Prüfung, Vorschlag
- Bestanden heißt: 0 harte Treffer, alle Pflicht-Abschnitte da, keine Stelle, an der man beim Vorlesen hängen bleibt

Bei Bestanden: Chris gibt frei, dann wird die Datei zu `videos/<ordner>/skript.md` (die Fassung für den Teleprompter). Das Umbenennen passiert erst nach seinem Okay.
