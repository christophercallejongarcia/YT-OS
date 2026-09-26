---
name: skript-mix
description: Mischt 3 bis 5 YouTube-Outlier-Videos zu einem neuen, eigenständigen Skript (v1) im festen YT-OS-Gerüst, so wie Poppy AI mehrere Videos zusammenführt. Erste Stufe der Skript-Kette.
when_to_use: Wenn Chris Outlier-URLs gibt und daraus ein neues Video-Skript entstehen soll, oder "skript-mix", "mach aus diesen Videos ein Skript", "merge die Videos".
argument-hint: <video-ordner> <url1> <url2> [url3] [url4] [url5]
disable-model-invocation: true
---

# skript-mix: aus Outliern wird v1

Stufe 1 von 4 der Skript-Kette: **skript-mix** → skript-anreichern (v2, v3) → sprechfassung (v4) → text-check.

Eingabe: `$ARGUMENTS`. Das erste Argument ist der Video-Ordner unter `videos/` (zum Beispiel `02-claude-skills`), der Rest sind 3 bis 5 YouTube-URLs. Fehlen Ordner oder URLs, frag nach.

## Schritte

1. **Transkripte holen.** Pro URL das Transkript über den `watch`-Skill (oder `yt-dlp --write-auto-subs --skip-download`) holen. Ablage: `videos/<ordner>/private/quellen/<nr>-<slug>.md` mit Titel, Kanal, Aufrufen, Datum oben. Der Ordner `private/` ist per `.gitignore` ausgeschlossen, fremde Transkripte gehen nie ins öffentliche Repo.
2. **Pro Quelle zerlegen.** Hook (wörtlich, erste 30 Sekunden), Versprechen, Blockfolge, 5 bis 10 Kernaussagen, was dieses Video vermutlich zum Outlier macht. Kurz, in eigenen Worten.
3. **Gerüst laden.** `substrate/skript-geruest.md` lesen, dazu jedes dort genannte Playbook, das es schon gibt. Fehlt ein Playbook, gilt für diesen Abschnitt das Muster des stärksten Outliers.
4. **Neu zusammensetzen.** Ein eigener Ablauf im Gerüst: Kernaussagen aus allen Quellen zusammenführen, doppelte streichen, eigene Reihenfolge. Kein Absatz darf eine Übersetzung eines Quellabsatzes sein. Die kurze Vorstellung von Chris nach Hook und Versprechen einsetzen. Deutsch, du-Form.
5. **Speichern.** `videos/<ordner>/skript-v1-mix.md` mit Frontmatter (`version: v1`, `quellen:` Liste der URLs). Dazu `videos/<ordner>/quellen.md`: pro Abschnitt, aus welchen Quellen er stammt.
6. **Stopp.** Chris prüft v1. Keine weitere Stufe von selbst starten.

## Gut ist v1, wenn

- jeder Pflicht-Abschnitt aus dem Gerüst vorhanden ist, inklusive Vorstellung und CTA
- keine Passage als Übersetzung einer Quelle erkennbar ist
- jede Kernaussage in `quellen.md` einer Quelle zugeordnet ist

## Am Ende sagen

Pfad zu v1 und `quellen.md`, eine Zeile pro Abschnitt, woher er kommt, und als nächsten Schritt: `/skript-anreichern <ordner> v2`.
