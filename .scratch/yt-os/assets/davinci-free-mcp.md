# DaVinci Resolve Free + davinci-resolve-mcp: Versionen, Grenzen, Setup

Recherche-Stand: 26.09.2026. MCP-Repo geprüft auf Stand v4.8.22 (Release vom 26.09.2026).
Legende: **[Fakt]** mit Quelle, **[Ableitung]** eigene Schlussfolgerung, **[offen]** nicht verifiziert.

## Kurzantwort

Nimm **DaVinci Resolve 21.0.4 (Build 21.0.4.5), Free, Direkt-Download von Blackmagic**. Das ist die letzte Free-Version, in der der MCP über seine In-App-Bridge läuft. Ab 21.1 ist Python-Scripting in Free abgeschaltet, dann gibt es keinen Weg mehr für den MCP. Chris' "21.04" ist also 21.0.4, und die Vermutung stimmt.

Eine Präzisierung: Externes Scripting (ein fremder Prozess verbindet sich direkt mit Resolve) war in Free auch vor 21.1 schon gesperrt. Der MCP umgeht das bis 21.0.x mit einem kleinen Python-Skript, das innerhalb von Resolve läuft (Workspace > Scripts) und die API lokal weiterreicht. Genau dieses In-App-Python hat 21.1 aus Free entfernt.

## Versionsmatrix

| Resolve-Version | Edition | MCP-Weg | Status | Beleg |
|---|---|---|---|---|
| 18.5 bis 21.1 | Studio | Externes Scripting direkt ("Local") | läuft | [Fakt] README, Requirements |
| 20.3.2.9 | Free | In-App-Bridge | läuft (Linux) | [Fakt] Issue #129 |
| 20.x auf macOS | Free | In-App-Bridge | sehr wahrscheinlich | [Ableitung] gleicher Mechanismus, auf macOS nicht einzeln gemeldet |
| 21.0.1.11 | Free | In-App-Bridge | läuft (Windows) | [Fakt] Issue #109 |
| 21.0.3.7 | Free | In-App-Bridge | läuft, vom Maintainer auf macOS validiert | [Fakt] README, api-coverage.md |
| **21.0.4.5** | **Free** | **In-App-Bridge** | **läuft auf macOS 15, Apple Silicon** | [Fakt] Issue #143 (Nutzer-Messung), PR #165 (Windows), BMD-Forum-Thread 240153 ("successful bridge runs in 21.0.4") |
| 21.1.0.14 | Free | keiner | kaputt: `.py`-Skripte werden nicht gelistet, keine Py3-Konsole, Lua-Skripte laufen ins Leere | [Fakt] Issue #203 (Linux, macOS 26), BMD-Forum 240153 (Windows) |
| 21.1 | Studio | Extern + natives MCP von Blackmagic | läuft | [Fakt] Release Notes 21.1, Issue #207 |

Wichtig zu #143: 21.0.4.5 Free auf macOS 15 arm64 ist eine Messung eines Nutzers, nicht des Maintainers. Der Maintainer selbst hat free 21.0.3.7 gemessen. Dass 21.0.4.5 funktioniert, bestätigen aber drei unabhängige Meldungen (macOS, Windows-PR, Forum). Das reicht mir als Beleg.

## Was Blackmagic geändert hat

- **[Fakt]** Release Notes DaVinci Resolve 21.1 (Free), Abschnitt General: "Advanced scripting now requires DaVinci Resolve Studio." Unter Notes: "We have moved the ability to script in Python to the Studio version. The Python API was being used to hack studio features into the free version." Veröffentlicht 08.09.2026.
  Quelle: https://www.blackmagicdesign.com/support/content/readme/59dd4eef1f4941c29fb8dc48b33f5c87
- **[Fakt]** Nicht nur Python ist betroffen. Im BMD-Entwicklerforum schreibt Chad Capeland, dass auch Lua-Funktionen (FFI) in Free eingeschränkt wurden. Ein Nutzer in #203 hat auf free 21.1.0 unter macOS gemessen, dass selbst ein reines `print()`-Lua-Skript aus dem Scripts-Menü nichts tut.
  Quelle: https://forum.blackmagicdesign.com/viewtopic.php?f=12&t=239905 und https://github.com/samuelgursky/davinci-resolve-mcp/issues/203
- **[Fakt]** Die Einstellung "External scripting using: Local / Network" hilft in Free nicht, in keiner Version. Local und Network unterscheiden sich nur darin, ob Verbindungen vom selben Rechner oder aus dem Netz angenommen werden. Beides ist ein Studio-Feature.
  Quelle: README "Free edition (in-app bridge)", docs/SKILL.md
- **[offen]** Seit welcher Version genau externes Scripting in Free gesperrt ist, habe ich nicht verifiziert. Für die Entscheidung spielt es keine Rolle, weil der MCP in Free nie über externes Scripting läuft.
- Puget Systems rät Free-Nutzern ebenfalls, für Scripting auf 21.0 zu bleiben oder Studio zu kaufen. Quelle: https://www.pugetsystems.com/blog/2026/09/10/how-davinci-resolve-free-v21-1-scripting-changes-affect-puget-bench/

## Offizielle Verfügbarkeit von 21.0.4

- **[Fakt]** Blackmagic listet "DaVinci Resolve 21.0.4 Update" (Free) weiter im Download-Archiv: Datum 05.08.2026, macOS-Build 21.0.4.5, Download-ID `b8e8e421548d4475a36a91155f81f3f2`, Release-ID `f1b3986a11634684b538ff3d1d4b55d6`, Registrierungsformular Pflicht. Geprüft über die Download-API `https://www.blackmagicdesign.com/api/support/us/downloads.json`.
- **[Fakt]** Nach 21.0.4 kam nur noch 21.1 (08.09.2026). 21.0.4 ist damit die letzte Bridge-taugliche Free-Version.
- **[Fakt]** Mindestanforderung macOS für Resolve 21: macOS 15 Sequoia, Apple Silicon, 8 GB RAM (16 GB mit Fusion).
- **[Fakt, lokal geprüft]** Chris' Mac: Apple M4 Pro, 48 GB RAM, macOS 15.6.1 (24G90), 146 GB frei. Passt.
- **[Fakt, lokal geprüft]** Resolve ist aktuell **nicht installiert** (weder in /Applications noch über Spotlight gefunden, keine Blackmagic-Ordner in Library). Es gibt also keine alte Projektdatenbank, die kollidieren kann.

## Was der MCP in Free kann

Der MCP hat 37 Tools im Standardmodus (389 im granularen Modus). Laut README deckt er die komplette Scripting-API ab und wurde gegen "Resolve 21.0.3 free (via the in-app bridge)" live getestet. **[Fakt]**

Für den YT-Workflow relevant, über die Bridge nutzbar:

| Bereich | MCP-Tools | Free? |
|---|---|---|
| Projekt anlegen/öffnen, Settings | `project_manager`, `project_settings` | ja |
| Medien importieren, Bins | `media_pool`, `media_storage` | ja |
| Timeline anlegen, Clips anhängen | `media_pool` (`create_timeline`, `create_timeline_from_clips`, `append_to_timeline`), `timeline`, `timeline_item` | ja |
| Marker (Timeline, Clip) | `timeline_markers`, `timeline_item_markers`, `media_pool_item_markers` | ja |
| Render-Queue, Presets, Render starten | `render`, `render_presets` | ja [Fakt: `StartRendering` über die Bridge auf 21.0.4.5 free gemeldet, PR #165] |
| Fusion-Comps, Text+ Overlays | `fusion_comp`, `timeline_item_fusion` | ja [Fakt: auf free 21.0.3.7 gemessen] |
| Color, LUT, Grades | `timeline_item_color`, `lut`, `gallery` | ja, soweit die Funktion selbst in Free existiert |
| Stille finden, Transkript, Take-Ranking | `media_analysis` | ja, läuft lokal über ffmpeg und Whisper, unabhängig von der Resolve-Edition |
| Offline-Bearbeitung von .drp/.drt | Advanced-Server (Node, 18 Tools) | [Ableitung] ja, braucht kein laufendes Resolve. Kalibriert wurde aber gegen Studio |

Nicht in Free, weil Resolve die Funktion selbst nur in Studio hat: Voice Isolation, Magic Mask, Speed Warp, AI-Rauschreduzierung, IntelliSearch, Speech Generation, Resolve-eigene Transkription. MCP-Aktionen darauf melden `success: false`. **[Fakt]** Blackmagic Readme/Vergleichsseite, README "Requirements".

Einschränkungen der Bridge **[Fakt]**, README und Code:
- Die Bridge muss **jede Resolve-Sitzung von Hand gestartet werden**: Projekt öffnen, dann Workspace > Scripts > resolve_bridge. Einen Autostart habe ich im Code nicht gefunden.
- Nur Loopback (127.0.0.1), HMAC-signiert. Kein Netzwerkzugriff von außen.
- Methoden werden nur positional durchgereicht. Der MCP berücksichtigt das bereits.
- Der Maintainer schreibt selbst: "supported-until-it-is-not tier". Blackmagic könnte den Weg schließen, was mit 21.1 passiert ist.

## Grenzen von Free für YouTube

- **[Fakt]** Ausgabe bis Ultra HD 3840 x 2160 bei bis zu 60 fps. 4K60 für YouTube geht also. Mehr als 60 fps oder über 4K braucht Studio. Quelle: Blackmagic Readme 21.1 Free und Produktseite.
- **[Fakt]** Die GPU-Beschränkung (nur eine GPU) gilt laut Readme nur für Windows und Linux. Auf dem Mac egal.
- **[Ableitung, Sekundärquellen]** H.264 und H.265 lassen sich in Free auf Apple Silicon über den Apple-Hardware-Encoder exportieren. 10-bit H.265 soll in Free auf 8-bit begrenzt sein. Für SDR-YouTube ist 8-bit ausreichend. **[offen]** vor dem ersten Render in den Deliver-Einstellungen prüfen. Ausweg ohne Einschränkung: ProRes 422 HQ rendern und hochladen, YouTube nimmt ProRes an.
- **[Fakt]** Resolve-eigene Untertitel-Transkription und text-basiertes Schneiden sind Studio. Der MCP bringt dafür eigene lokale Whisper-Transkription mit.

## Installation (empfohlener Weg)

Nicht jetzt ausgeführt, nur beschrieben.

1. Download: https://www.blackmagicdesign.com/support/ > DaVinci Resolve > "DaVinci Resolve 21.0.4 Update" > **DaVinci Resolve** (nicht Studio) > Mac OS X. Registrierungsformular ausfüllen. [Ableitung] Direktlink nach Blackmagic-Schema: https://www.blackmagicdesign.com/support/download/f1b3986a11634684b538ff3d1d4b55d6/Mac%20OS%20X
2. **Nicht aus dem Mac App Store installieren.** Der App Store aktualisiert selbständig auf 21.1, und der Sandbox-Build hatte eigene Pfadprobleme mit der Bridge (Issue #104). [Ableitung für Auto-Update, Fakt für #104]
3. DMG installieren, Resolve starten, in den Preferences die automatische Update-Prüfung abschalten. Bei jedem Update-Hinweis "nein" klicken. **[offen]** genauer Name der Option in 21.0.4.
4. Python für Resolve: Auf Chris' Mac zeigt `/usr/local/bin/python3` bereits auf python.org 3.13, inklusive `lib/libpython3.13.dylib`. Resolve findet Python dort ohne weiteres Zutun. `PYTHON3HOME` ist nicht nötig. [Fakt, lokal geprüft]
5. MCP installieren: `npx davinci-resolve-mcp setup` oder `git clone https://github.com/samuelgursky/davinci-resolve-mcp.git && cd davinci-resolve-mcp && python3 install.py`. Im Installer Claude Code als Client wählen. Für den venv laut README Python 3.10 bis 3.12 am sichersten.
6. Bridge installieren: `python scripts/install_resolve_bridge.py`. Danach Resolve neu starten, Projekt öffnen, **Workspace > Scripts > resolve_bridge**. Mehrere gleichnamige `resolve_bridge_canary`-Einträge sind normal.
7. Test in Claude Code: "Welche Resolve-Version läuft?" Erwartet: `21.0.4.5`. Die Bridge wird automatisch genutzt, `DAVINCI_RESOLVE_BRIDGE=1` erzwingt sie.

## Risiken

- **Versehentliches Update auf 21.1** beendet den MCP-Zugang sofort. Die wichtigste Regel für diesen Setup: nie updaten.
- **Projektkompatibilität** [Fakt]: Laut 21.1-Readme lassen sich Projekte, die einmal in 21.1 geöffnet wurden, in 20.3.2 nicht mehr öffnen. [Ableitung] Dasselbe ist für 21.0.4 zu erwarten. Wer einmal in 21.1 öffnet, kommt mit dem Projekt nicht mehr zurück. Vor jedem Experiment Projekt als .drp exportieren und die Projektbibliothek sichern.
- **macOS-Updates** [Ableitung]: Ein späteres macOS (26 Tahoe oder neuer) könnte 21.0.4 brechen, und Blackmagic wird 21.0.x nicht mehr patchen. Auf macOS 15 bleiben, solange die Pipeline darauf aufbaut.
- **MCP-Updates** [Ableitung]: Der MCP bleibt laut Code für 21.0.x kompatibel (Versions-Guards). Trotzdem vor dem Dreh eine funktionierende MCP-Version festhalten und nicht mitten in der Produktion updaten.
- **Keine Bugfixes mehr** für 21.0.4. Bekannte Fehler bleiben.

## Empfehlung

1. DaVinci Resolve **21.0.4 Free** per Direkt-Download installieren, Updates aus, nie auf 21.1 gehen.
2. MCP mit Bridge einrichten. Timeline bauen, Clips platzieren, Marker, Fusion-Text und Render-Queue gehen damit in Free.
3. Export in 4K bis 60 fps als H.264/H.265 (8-bit) oder ProRes. Für YouTube reicht das.
4. Diesen Pfad als Übergangslösung sehen. Wenn Blackmagic Free weiter einschränkt oder macOS 21.0.4 bricht, bleibt nur Studio (einmalig 295 USD, mit nativem MCP ab 21.1) oder der Offline-Weg über .drt/.drp-Dateien.

## Quellen

- MCP-Repo, README und docs/SKILL.md: https://github.com/samuelgursky/davinci-resolve-mcp
- Issue #203 (free 21.1 ohne Python): https://github.com/samuelgursky/davinci-resolve-mcp/issues/203
- Issue #143 (free 21.0.4.5, macOS 15 arm64, Bridge läuft): https://github.com/samuelgursky/davinci-resolve-mcp/issues/143
- Issue #109, #129, #104, #219: https://github.com/samuelgursky/davinci-resolve-mcp/issues
- Blackmagic Readme 21.1 Free: https://www.blackmagicdesign.com/support/content/readme/59dd4eef1f4941c29fb8dc48b33f5c87
- Blackmagic Download-API: https://www.blackmagicdesign.com/api/support/us/downloads.json
- BMD-Forum "v21.1 Advanced scripting now requires DaVinci Resolve Studio": https://forum.blackmagicdesign.com/viewtopic.php?f=12&t=239905
- BMD-Forum "Resolve Free 21.1 on Windows, Python scripts missing": https://forum.blackmagicdesign.com/viewtopic.php?t=240153
- Puget Systems zu 21.1 Free: https://www.pugetsystems.com/blog/2026/09/10/how-davinci-resolve-free-v21-1-scripting-changes-affect-puget-bench/
- CineD zu 21.1: https://www.cined.com/davinci-resolve-21-1-released-ai-assistant-integration-via-mcp-individual-hdr-trims-and-python-scripting-moves-to-studio/
- Codec-Grenzen Free (Sekundärquelle): https://www.theatreofnoise.com/2024/11/codec-limitations-of-davinci-resolve.html
