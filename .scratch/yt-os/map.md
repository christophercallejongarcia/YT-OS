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
- [Wo lebt das Rohmaterial: Convex oder Ordner?](issues/14-rohmaterial-speicherort.md): Gesammeltes in Convex (Signal Room), Lernmaterial im Vault, YT-OS nur Verdichtetes. Kein raw-Ordner. Terminal-Zugriff über ein read-only CLI, Convex-Skills bleiben im Signal-Room-Repo.

## Not yet specified

- **Konflikt video-editor und Video 1:** Der Style `atlantic-hybrid` schließt Screen-Recordings aus, Video 1 plant Screen-B-Roll. Klären im Edit-Interview oder in der Editor-Spec.

- **Upload-Stufe:** Beschreibung, Kapitel, Tags, Veröffentlichungszeit. Vermutlich ein Skill, sobald Titel und Thumbnail stehen.
- **CTA für Video 1:** bestehender Lead-Magnet oder etwas anderes. Hängt davon ab, was im Video am Ende versprochen wird.
- **Verbindung Signal Room und YT-OS:** Form des read-only CLI auf Convex und welche Exporte als Datei in YT-OS landen. Wird klar, wenn der YouTube-Umfang steht.
- **Skripte für Video 2+:** wie Skript-Board, Hook-Muster und Kallaways Formate (16 Typen, 4-teilige Formel) zusammenspielen.
- **Review-Schleife:** fertiges Video mit `/watch` prüfen lassen (Brads Muster), bevor es hochgeladen wird.

## Out of scope

- Analytics und Funnel: der nächste Scope nach Video 1.
- Agents (Persona-Reviewer, Research-Cron): kommen laut Marks Layer-Modell zuletzt, über os-coach.
- Aufräumen der Makler/Allfinanz-Inhalte: eigenes Handoff in `chriscasa/_handoff/2026-09-26-makler-archivierung.md`.
