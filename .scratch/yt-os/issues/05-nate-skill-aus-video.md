# Nates Methode: Skill aus einem Video bauen

Type: research
Status: resolved

## Question

Wie baut Nate Herk in https://www.youtube.com/watch?v=7jHXoPGnA4c aus einem Video, das ihm gefällt, einen Skill (Design, Edit, HyperFrames)? Was davon hat Chris schon (style-extract-Skill, Style-Packs, ELEMENTS.md), was fehlt, und wie würde der Schritt für YouTube-Long-Form im 16:9-Format aussehen? Nates andere Videos zu B-Roll gleich mit prüfen.

## Answer

Nate baut den Skill mit einem einzigen Prompt: Referenzvideo lokal laden, Pfad per `/goal` an Claude Code, "analysiere Design, Pacing, Frame-Typen und Energie, bau daraus einen Skill, teste ihn sofort an meinem Thema". Danach iteriert er und schreibt Feedback in den Skill zurück (7jHXoPGnA4c, 5:08-6:20 und 17:41).
Wo Edits hinkommen, diktiert er entlang des Transkripts ("wenn ich X sage, links Y mit Glas-Karte") und zeigt beim Dreh schon auf die Seite. Der Agent macht daraus im Plan-Modus eine Beat-Tabelle mit Ankerwort (Aw3BkmhYu4I, 17:13-19:23). Sein "Make a Video"-Skill interviewt vorher über Format, Facecam-Behandlung, Untertitel und Hero-Metapher (ZNbgOhxhzXg, 20:09).
Chris hat den Analyse-Teil (style-extract, ANIMATIONS.md, ELEMENTS.md) und, bisher nicht in der Map, eine fertige 16:9-Pipeline unter `/Users/cristobalcallejongarcia/dev/YouTube-os/video-editor/` (rough-cut, graphics mit Cutsheet, drei Langform-Styles).
Es fehlen: das Edit-Interview als Brücke zwischen Nate-Vokabular und Cutsheet, ein Mapping der Muster N01 bis N38 auf die 16:9-Szenennamen und Pacing-Regeln für Langform. Dazu kommt ein Konflikt: Der Style `atlantic-hybrid` schließt Screen-Recordings aus.
Cue-Listen-Format und 10 Interview-Fragen für Ticket 07 stehen im Asset.

Asset: `/Users/cristobalcallejongarcia/dev/YT-OS/.scratch/yt-os/assets/nate-skill-aus-video.md`
