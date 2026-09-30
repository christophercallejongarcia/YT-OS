# YT-OS: vom Outlier bis zum Upload

Type: wayfinder:map

## Destination

Jede Stufe von Outlier bis Upload hat einen entschiedenen Ansatz und, wo gebaut wird, eine Spec. Damit kann Video 1 ("Vom Fragensteller zum Chef") bis Tag 30 der Challenge veröffentlicht werden, und Video 2 läuft durch dieselbe Pipeline.

## Notes

- Domäne: YouTube-Produktion für Chris' deutschen Kanal (Claude, KI-Agents, KI-Betriebssystem für Selbstständige und Teams).
- Planen, nicht bauen. Ausnahme: Video 1 wird parallel produziert. Die Map darf den Dreh und den Schnitt nie blockieren.
- Architektur: `docs/yt-os-architektur.png`. YT-OS ist ein isoliertes KI-OS (Mark Kashefs Muster), Apps hängen über Dateien, CLI oder MCP dran.
- Skills pro Session: `/grilling` für Grilling-Tickets, `/prototype` für Prototyp-Tickets, `/watch` für Videoanalyse, `style-extract` und `hyperframes` für Edit-Themen.
- Vorhandenes Vokabular für Edits: `/Users/cristobalcallejongarcia/dev/hyperframes/videos/_style-packs/` (ANIMATIONS.md, _elements/ELEMENTS.md).
- Playbooks sind der Kern von Layer 2 (Kontext), nach Marks AI-OS-Masterclass. Rangfolge der Quellen: Kallaway und Mark Kashef zuerst, Simtent als erster Entwurf, dazu gezielt weitere YouTube-Videos. Jedes Playbook ist ein eigenes Ticket.
- Stil für alle Texte: echte Umlaute, keine Gedankenstriche, kein KI-Sprech.
- Nach jedem abgeschlossenen Ticket committen und pushen (Arbeitsnachweis für die Challenge).

## Decisions so far

- [Ziel und Scope festlegen](issues/01-ziel-und-scope.md): Video 1 steht und wird am 27.09. gedreht. YT-OS ist die Schaltzentrale, die Nische ist breit, jede Stufe wird einmal echt benutzt. Editor-Spec entsteht vorab, danach die Ernte. B-Roll wird per Edit-Interview statt Vorab-Markierung geplant, der Recorder im Dreifach-Vergleich.
- [Poppy-Klon: gibt es einen, den wir übernehmen können?](issues/02-poppy-klon-recherche.md): Nein. Kein brauchbarer Klon, kein White-Label. Am nächsten dran: ThoughtDAG (MIT) und Canvas Chat (YouTube-Node, keine Lizenz). Empfehlung: für Video 2 zuerst ein Ordner-Board mit Claude Code, Board in Signal Room nur bei spürbarem Mehrwert.
- [DaVinci Resolve Free mit MCP: welche Version, was geht?](issues/03-davinci-free-mcp.md): 21.0.4 Free (Build 21.0.4.5) aus dem Blackmagic-Archiv. 21.1 hat Python aus Free entfernt, also nie updaten. Der MCP läuft über eine Bridge in Resolve (Timeline, Clips, Marker, Render bis 4K/60).
- [YouTube-Datenquelle für Signal Room](issues/04-youtube-datenquelle.md): Hybrid. Zahlen und Metadaten über die YouTube Data API v3 (kostenlos, ca. 121 von 10.000 Einheiten pro Tag bei 30 Kanälen), Transkripte über einen Apify-Actor nur für Outlier. Neuer Adapter plus Netzwerk-Weiche in Signal Room.
- [Nates Methode: Skill aus einem Video bauen](issues/05-nate-skill-aus-video.md): Ein Prompt reicht (Video analysieren, Skill bauen, sofort am eigenen Thema testen, Feedback zurückschreiben). Edits diktiert er entlang des Transkripts als Beat-Tabelle mit Ankerwort. Fund: `YouTube-os/video-editor/` hat schon eine 16:9-Pipeline mit Cutsheet. Es fehlen Edit-Interview, Zuordnung N01 bis N38 auf 16:9 und Pacing-Regeln für Langform.
- [Skript-Board: übernehmen oder bauen?](issues/10-skript-board-entscheidung.md): Bauen, als Poppy-Nachbau in Signal Room (`/board`). MVP: YouTube-, Text- und Chat-Node, Kanten als Kontext, `/`-Prompts aus den Playbooks, Export als `skript.md` und `beats.md`. Sprachnotizen per Wispr Flow statt eigenem Node. Chat über Claude Code, Codex und Command Code ohne Tools, in einer Sandbox. Plan fertig (`PLAN.md` im Signal-Room-Repo, siehe Comments im Ticket), Build per `/goal` nach dem Dreh.
- [Wo lebt das Rohmaterial: Convex oder Ordner?](issues/14-rohmaterial-speicherort.md): Gesammeltes in Convex (Signal Room), Lernmaterial im Vault, YT-OS nur Verdichtetes. Kein raw-Ordner. Terminal-Zugriff über ein read-only CLI, Convex-Skills bleiben im Signal-Room-Repo.
- [Signal Room für YouTube: was genau ist ein Outlier?](issues/11-signal-room-youtube-umfang.md): Suche wie vidIQ über Suchbegriffe (Englisch und Deutsch, vier Themen), Kanäle als Kandidaten, Outlier = Aufrufe durch Median der letzten 30 Longform-Videos des Kanals, Vorgabe 3x. Daraus Titel- und Thumbnail-Builder. Umsetzung per Captain nach Jays Factory.
- [Roadmap Tag 5 bis 30](roadmap.md), entschieden am 2026-09-29: Video 1 geht am 10.10. (Tag 16) online, Video 2 ist bis Tag 30 gedreht, Thema aus einem neuen Signal-Room-Lauf. Schnitt-Werkzeug per Dreifach-Test HyperFrames, DaVinci, Descript ([Ticket 20](issues/20-schnitt-test.md)). B-Roll per Dreifach-Vergleich wie geplant. CTA ist der OS Coach auf Gumroad ([Ticket 21](issues/21-cta-gumroad-os-coach.md)), Leadmagnet-Landingpage erst nach Video 1. Chris hat 90 bis 120 Minuten pro Tag. Dazu Ton-Rettung und Untertitel ([Ticket 24](issues/24-ton-und-untertitel.md)) sowie Review und Zuschauer-Test ([Ticket 25](issues/25-review-und-zuschauer-test.md)). Schritt-für-Schritt-Ansicht: `roadmap.html`.
- [Skript-Partner: Einstieg in die Skript-Kette, zwei Fassungen, Wortlaut nach Simtent](issues/26-skript-partner.md), entschieden am 2026-09-30: Neuer Einstieg `skript-partner` klärt vor dem Skript Versprechen, Thumbnail-Botschaft, Titel und 2 bis 3 Hook-Varianten nebeneinander (Chris wählt eine oder testet zwei) und steuert dann die Kette mit Stopp nach jeder Stufe. Drei Eingänge pro Video: Outlier, Outlier plus Brain Dump, Brain Dump. `sprechfassung` liefert Fassung A (Hybrid: Hook, Pitch, Mini-Hooks und CTA wörtlich, sonst Stichpunkte, Clip für Clip) und Fassung B (Wort für Wort). Die Wortlaut-Regeln stehen in eigenen Worten im Skill, `regeln.md` sammelt nur Chris' Markierungen aus dem Küchentisch-Test. `text-check` misst den KI-Klang beim Vorlesen mit `vorlese-check.py` (Median 13 bis 16 Wörter, höchstens 20 Prozent kurze Sätze, kein Stakkato), auch im Hook. Pitch-Block mit Vorstellung, etwa 20 Sekunden, direkt nach dem Hook. Fertiges Thumbnail und Titel-Tests erst nach dem Schnitt, so wie Mark Kashef es macht.

## Not yet specified

- **Konflikt video-editor und Video 1:** Der Style `atlantic-hybrid` schließt Screen-Recordings aus, Video 1 plant Screen-B-Roll. Klären im Edit-Interview oder in der Editor-Spec.

- **Upload-Stufe:** jetzt [Ticket 22](issues/22-upload-stufe.md).
- **Verbindung Signal Room und YT-OS:** Form des read-only CLI auf Convex und welche Exporte als Datei in YT-OS landen. Wird klar, wenn der YouTube-Umfang steht.
- **Skripte für Video 2+:** wie Skript-Board, Hook-Muster und Kallaways Formate (16 Typen, 4-teilige Formel) zusammenspielen.
- **Review-Schleife:** fertiges Video mit `/watch` prüfen lassen (Brads Muster), bevor es hochgeladen wird.

## Out of scope

- Analytics und Funnel: der nächste Scope nach Video 1.
- Agents (Persona-Reviewer, Research-Cron): kommen laut Marks Layer-Modell zuletzt, über os-coach.
- Aufräumen der Makler/Allfinanz-Inhalte: eigenes Handoff in `chriscasa/_handoff/2026-09-26-makler-archivierung.md`.
