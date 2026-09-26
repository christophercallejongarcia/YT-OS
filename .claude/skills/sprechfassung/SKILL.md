---
name: sprechfassung
description: Macht aus einem fertigen YT-OS-Skript eine Teleprompter-Fassung, die klingt wie Chris frei redet, bei gleicher Informationsdichte. Dritte Stufe der Skript-Kette.
when_to_use: Nach skript-anreichern v3, oder "sprechfassung", "mach das sprechbar", "klingt zu geschrieben", "für den Teleprompter".
argument-hint: <video-ordner>
disable-model-invocation: true
---

# sprechfassung: v3 → v4

Stufe 3 von 4: skript-mix → skript-anreichern → **sprechfassung** → text-check.

Eingabe: `$ARGUMENTS` ist der Video-Ordner. Grundlage: `videos/<ordner>/skript-v3-beispiele.md`.

## Schritte

1. `regeln.md` in diesem Skill-Ordner lesen (${CLAUDE_SKILL_DIR}/regeln.md). Das sind Chris' Sprechmuster, abgeleitet aus seiner freigegebenen Sprechfassung von Video 1.
2. Absatz für Absatz umschreiben. Inhalt, Reihenfolge und Fakten bleiben gleich. Keine Aussage streichen, keine neue erfinden.
3. Für den Teleprompter setzen: ein Gedanke pro Absatz, Absätze kurz, Zahlen ausgeschrieben.
4. Speichern: `videos/<ordner>/skript-v4-sprechfassung.md`.
5. **Stopp.** Chris liest v4 laut. Stellen, an denen er stolpert, notiert er. Die fließen in `regeln.md` zurück.

## Lernen

Sobald ein Dreh-Transkript von Chris existiert (zum Beispiel aus dem Dreh von Video 1), daraus echte Sprechmuster in `regeln.md` ergänzen. Das ist die beste Stimmvorlage, besser als jede Regel.

## Am Ende sagen

Pfad zu v4, die 3 größten Änderungen als Beispiel (vorher, nachher) und den nächsten Schritt: `/text-check <ordner>`.
