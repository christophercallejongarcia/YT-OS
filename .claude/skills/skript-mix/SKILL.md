---
name: skript-mix
description: Baut aus 3 bis 5 YouTube-Outliern, einem Brain Dump von Chris oder beidem ein eigenes, neues Skript (v1) im festen YT-OS-Gerüst. Leitet pro Outlier ab, warum er funktioniert, statt ihn zu übersetzen. Erste Stufe nach skript-partner.
when_to_use: Wenn packaging.md steht und daraus v1 entstehen soll, oder "skript-mix", "mach aus diesen Videos ein Skript", "merge die Videos", "mach aus meinem Brain Dump ein Skript".
argument-hint: <video-ordner> [url1] [url2] [url3] [url4] [url5]
disable-model-invocation: true
---

# skript-mix: aus Outliern und Brain Dump wird v1

Stufe 1 der Kette: skript-partner → **skript-mix** → skript-anreichern (v2, v3) → sprechfassung (v4a, v4b) → text-check.

Eingabe: `$ARGUMENTS`. Das erste Argument ist der Video-Ordner (`videos/<ordner>` oder bei Probeläufen ein Ordner unter `private/`), danach optional URLs. Pflicht ist `<ordner>/packaging.md` aus `skript-partner`. Fehlt sie, abbrechen und auf `skript-partner` verweisen, weil das Skript das Versprechen von Thumbnail, Titel und Hook einlösen muss.

## Drei Eingänge

Welcher gilt, steht in `packaging.md` unter `eingang`:

- **outlier:** 3 bis 5 URLs, Hauptweg
- **outlier-braindump:** URLs plus `<ordner>/private/brain-dump.md`
- **braindump:** nur der Brain Dump

## Schritte

1. **Transkripte holen,** falls sie noch nicht in `<ordner>/private/quellen/` liegen. Pro URL über den `watch`-Skill oder `yt-dlp --skip-download --write-auto-subs --sub-langs "en-orig,en,de-orig,de"`, als `<nr>-<slug>.md` mit Titel, Kanal, Aufrufen, Datum und Zeitmarken. `private/` ist per `.gitignore` ausgeschlossen, fremde Transkripte gehen nie ins öffentliche Repo.
2. **Pro Outlier ableiten, warum er funktioniert.** Gemeint ist, wie er es macht: Hook-Muster, Versprechen, Tempo (wie schnell er zur Sache kommt), Blockfolge, Spannungsbogen, stärkste Beispiele. Dazu 5 bis 10 Kernaussagen in eigenen Worten. Ablage: `<ordner>/private/analyse.md`.
3. **Brain Dump ordnen,** falls vorhanden. Kernaussagen, eigene Erlebnisse und Beispiele herausziehen. Chris' Wortlaut bleibt: Doppeltes raus, Sprünge glätten, sonst nichts umformulieren. Solche Stellen im Skript mit `<!-- brain-dump -->` davor markieren, damit sprechfassung sie nicht umschreibt.
4. **Gerüst laden.** `substrate/skript-geruest.md` lesen, dazu jedes dort genannte Playbook, das es schon gibt. Fehlt ein Playbook, gilt für diesen Abschnitt das Muster des stärksten Outliers.
5. **Ein eigenes Video bauen.** Hook und Pitch kommen wörtlich aus `packaging.md`. Der Hauptteil ist ein eigener Ablauf, der das Versprechen aus `packaging.md` einlöst: Kernaussagen aus allen Quellen zusammenführen, Doppeltes streichen, eigene Reihenfolge und eigene Kapitel. Jedes Kapitel bekommt einen Mini-Hook, baut Spannung auf und löst sie am Ende auf. Kein Absatz darf eine Übersetzung eines Quellabsatzes sein. Deutsch, du-Form.
6. **Speichern.** `<ordner>/skript-v1-mix.md` mit Frontmatter (`version: v1`, `quellen:` Liste der URLs und gegebenenfalls `brain-dump`). Dazu `<ordner>/quellen.md`: pro Abschnitt, aus welcher Quelle er stammt, und pro Outlier ein Satz, was du dir von ihm abgeschaut hast.
7. **Stopp.** Chris prüft v1. Keine weitere Stufe von selbst starten.

## Gut ist v1, wenn

- jeder Pflicht-Abschnitt aus dem Gerüst da ist, inklusive Pitch und CTA
- der Hauptteil einlöst, was Thumbnail, Titel und Hook versprechen
- keine Passage als Übersetzung einer Quelle erkennbar ist
- jede Kernaussage in `quellen.md` einer Quelle zugeordnet ist

## Am Ende sagen

Pfad zu v1 und `quellen.md`, eine Zeile pro Abschnitt, woher er kommt, und als nächsten Schritt: `skript-anreichern <ordner> v2`.
