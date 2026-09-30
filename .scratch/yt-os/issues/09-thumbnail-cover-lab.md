# Reicht Cover Lab für das YouTube-Thumbnail von Video 1?

Type: prototype
Status: open

## Question

Signal Room Cover Lab kann laut README Cover-Pakete für Reels und YouTube erzeugen. Reicht das für Titel und Thumbnail von Video 1 (16:9, Chris' Gesicht, Codex-Abo)? Prototyp: 3 Thumbnail-Varianten für Video 1, Chris wählt. Was fehlt für YouTube?

## Comments

- 2026-09-29: Stand: Der Thumbnail-Builder ist in Signal Room gebaut (PR 5, noch Entwurf) und hat zwei echte Läufe für Video 1 gemacht. Chris gefallen die Bilder noch nicht: Er wirkt zu blass und etwas zu breit im Gesicht. Bevor der nächste Lauf startet, gilt diese Checkliste.

### Checkliste vor dem nächsten Lauf

**1. Interview mit Chris (der Agent fragt aktiv nach, bevor er rendert)**
- [x] Referenzfotos von Chris: 3 bis 5 Fotos, auf denen er sich gefällt. Dazu die Frage, was anders aussehen soll als auf den Standbildern aus dem Dreh.
- [x] Referenz-Thumbnails anderer Creator: 5 bis 10 Stück, die Chris gut findet, pro Bild ein Satz, was ihm daran gefällt.
- [x] Klären, ob ein eigenes kurzes Foto-Shooting fürs Thumbnail nötig ist (siehe 3).

**2. Recherche: worauf es bei Thumbnails ankommt**
- [x] 2 bis 3 starke YouTube-Videos zur Thumbnail-Erstellung mit `/watch` auswerten.
- [x] Kallaways Thumbnail-System und Marks Thumbnail-Briefs (mobil lesbar, zeigt das Ergebnis des Videos, Ebenen einzeln freigeben) aus Ticket 18 dazunehmen.
- [x] Ergebnis: eine kurze Regel-Liste als Vorfassung von Playbook 18, die der Builder als Regelwerk bekommt.

**3. Bild von Chris**
- [x] Hautton wärmer und frischer, mehr Kontrast, nicht blass.
- [x] Gesicht minimal schlanker, Chris muss klar wiedererkennbar bleiben. Keine starke Veränderung.
- [x] Prüfen, ob das Problem aus dem Material kommt: Die Osmo Pocket filmt weitwinklig und nah, das macht Gesichter breiter. Falls ja, ein Foto-Shooting von 10 Minuten: Handy mit 2x-Zoom aus etwas Abstand, Kamera leicht über Augenhöhe, Licht von vorne seitlich, 3 bis 4 Mimiken.

**4. Neuer Lauf**
- [x] Nach Marks Ebenen-Vorgehen: Hintergrund, Person und Text einzeln zeigen und freigeben lassen, statt nur fertige Bilder.
- [ ] 3 neue Varianten, Chris wählt eine.

- 2026-09-29: Die Recherche ist abgeschlossen. Die Vorfassung für Playbook 18 steht in [Thumbnail-Regeln für den Builder](../../../substrate/playbooks/thumbnails-kurzfassung.md).

- 2026-09-29 (Thumbnail-Builder, PR 5): Interview und Materialprüfung erledigt.
  - Referenzfotos: Chris hat auf sein Profi-Shooting vom November 2025 (WeTransfer-Ordner) und sein Signaturbild verwiesen. Fünf Porträts plus Signatur liegen zugeschnitten in `~/Movies/YT-OS/gesicht/referenz/`, außerhalb aller Repos. Sie ersetzen die Standbilder aus dem Dreh als Gesichtsvorlage.
  - Referenz-Thumbnails: 15 Thumbnails von Tristen O'Brien, von Chris per Screenshot ausgewählt. Sie stehen per Link in der Referenz-Bibliothek des Signal Room, jeweils mit einem Satz dazu. Die Sätze hat der Cook aus den Screenshots formuliert, Chris kann sie korrigieren. Der Lauf nutzt 6 davon plus 2 Outlier aus Signal Room.
  - Material: Die Osmo Pocket filmt mit etwa 20 mm Kleinbild-Äquivalent aus etwa 50 bis 60 cm Abstand. Das Weitwinkel verbreitert die Gesichtsmitte, das frontale Teleprompter-Licht macht das Gesicht flach und blass. Die Profi-Porträts mit Porträtbrennweite zeigen das schmalere Gesicht und den wärmeren Hautton. Ein eigenes Shooting ist deshalb für Video 1 nicht nötig, für spätere Videos bleibt die Anleitung aus Abschnitt 3 gültig.
  - Regelwerk: Der Builder liest `substrate/playbooks/thumbnails-kurzfassung.md` als verbindliche Regeln für den Planer.

- 2026-09-29 (Thumbnail-Builder, PR 5): Neuer Lauf nach Chris' Kritik ("zu überladen").
  - Drei-Elemente-Formel fest eingebaut: einfarbiger Hintergrund, Chris groß, eine Überschrift mit zwei bis vier Wörtern, ein visuelles Objekt. Der Planer wählt aus festen Listen, Szenen und Deko sind verboten (Playbook-Regel 4).
  - Technik: Codex-SDK auf 0.159 gehoben, Planung läuft mit gpt-6-astra, das Bild macht Codex' Bild-Tool (GPT Image 2.5, das Modell wählt das Backend). Die Bridge holt jedes Bild aus dem eigenen Thread-Ordner und löscht ihn danach. Prompts folgen dem offiziellen GPT-Image-2.5-Leitfaden.
  - Ebenen-Ablauf läuft: Hintergrund, Person und Text werden einzeln gerendert und freigegeben. Für den ersten Durchgang hat der Cook Hintergrund und Person vorläufig freigegeben, damit Chris fertige Bilder sieht. Jede Ebene lässt sich neu rendern.
  - Ergebnis: drei Varianten in Signal Room (Lauf run-20260929T193526Z-ihtsji): "Welche der 6?", "Mehr als Antworten", "LASS ARBEITEN". Offen: Chris wählt eine.

- 2026-09-29, Tagesabschluss (Thumbnail-Builder, PR 5, Commit 6169726): Zwischenstand gesichert.
  - Chris: "wesentlich besser, aber noch nicht optimal". Nächster Termin geht tiefer.
  - Stand der Technik: Codex-SDK 0.159 mit gpt-6-astra, Bilder über Codex' Bild-Tool (GPT Image 2.5 vom Backend gewählt), Drei-Elemente-Formel, Ebenen-Ablauf, Person als neues Studio-Porträt plus Retusche-Durchgang, Prompts nach dem offiziellen GPT-Image-2.5-Leitfaden.
  - Aktuelle Varianten: Lauf run-20260929T193526Z-ihtsji ("Welche der 6?", "Mehr als Antworten", "LASS ARBEITEN"). Keine Variante gewählt.
  - Offene Ideen: automatische Bildprüfung nach jeder Ebene (Anzahl, Text, Wiedererkennbarkeit), mehr Varianten erzeugen und die besten drei zeigen (Playbook-Regel 8), Gesten und Kleidung pro Variante planen lassen, bei Bedarf GPT Image 2.5 Sunburst über die API (braucht Schlüssel und Chris' Entscheidung zu ADR-0004).

- 2026-09-30 (Thumbnail-Builder, PR 5, Commit 6878867): Übergabe an einen frischen Thread.
  - Gesichert: Entwurfs-Läufe mit bis zu 20 Varianten, 17 Rezepten aus der Creator-Recherche, automatischer Bildprüfung und Bewertung in Signal Room. Fehler von gestern behoben (Varianten ab 10, Zeitlimit Render plus Retusche). Fremde KI-Logos verboten.
  - Recherche fertig: Outlier von Nate Herk, Jack Roberts, Mark Kashef und Liam Ottley (YouTube Data API, Faktor gegen Kanal-Median) und Chris' 15 Tristen-Referenzen liegen in der Referenz-Bibliothek. Paar-Regeln und Evergreen-Formate als private Notiz, noch nicht ins Playbook übernommen.
  - Paar-Runde 1 läuft: 10 Entwürfe, zwei Botschaften je Titel A bis E, jeweils mit Bezug zum gedrehten Hook.
  - Offen: Playbook-Abschnitt "Titel, Thumbnail und Hook als Paar", Runde 2, Persona-Test, `videos/01-stufenleiter/packaging.md`, Chris' Wahl.
  - Übergabe: `~/chriscasa/_handoff/2026-09-30-thumbnail-builder.md`

