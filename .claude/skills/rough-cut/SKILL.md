---
name: rough-cut
description: Rohschnitt eines kompletten Talking-Head-Takes aus einem vorhandenen ElevenLabs-Transkript mit Wort-Zeitstempeln. Wählt pro Zeile den letzten Take, setzt Pausen nach den Langform-Zielwerten (Satzende 0,3 s, Absatz 0,5 s, neue Stufe 0,8 s), sichert jeden Schnittpunkt per Pegelanalyse, poliert den Ton einmal auf -14 LUFS, rendert mit ffmpeg und prüft das Ergebnis mit lokalem Whisper gegen. Erste Stufe nach dem Dreh, vor Grafiken und B-Roll.
when_to_use: Nach dem Transkript (Ticket 06), oder "Rohschnitt", "rough cut", "schneide das Video", "mach den Base-Cut".
argument-hint: <private/video-NN> <pfad zum Rohtake>
disable-model-invocation: true
---

# rough-cut: vom Rohtake zum Base-Cut

Eingabe: `$ARGUMENTS`, der private Video-Ordner und der Pfad zum Rohtake. Der Rohtake wird nur gelesen.

Du kannst nicht hören. Das Transkript mit Zeitstempel pro Wort und eine Pegelkurve sind dein einziger Zugriff auf das Timing. Jede Entscheidung muss sich deshalb aus diesen beiden Quellen belegen lassen.

## Ablage

Alles landet in `private/video-NN/schnitt-lokal/`. Der Ordner ist per `.gitignore` ausgeschlossen, das vor dem ersten Schreiben mit `git check-ignore` prüfen. Ins Repo kommt nichts davon, auch keine Schnittliste, weil sie den gesprochenen Text enthält.

```
schnitt-lokal/
  cutsheet.json          Segmente mit Start, Ende, Frames, Wortbereich, Text
  base-cut.mp4           voller Film ohne Grafiken und Musik
  transcript-cut.json    alle behaltenen Wörter auf der neuen Timeline
  bericht.md             Länge, Schnitte, Takes, unsichere Stellen, Zeit, Kosten, Handarbeit
  transcript/            Verweis auf das Roh-Transkript, Liste der Hörfehler
  work/                  keeps.txt, Skripte, Filtergraphen, Pegelkurve, Render-Log, Gegenprobe
```

## Ablauf

1. **Quelle prüfen.** `ffprobe` auf den Rohtake: Dauer, Bildrate, Pixelformat, Tonspur, Kapitel, Drehung. Das Ergebnis bestimmt Frame-Raster und Encoder.

2. **Transkript laden, nie neu erstellen.** Das Transkript kommt aus dem Transkript-Schritt: Tonspur mit `ffmpeg -c copy` verlustfrei aus dem Take, ElevenLabs Scribe v2, Sprache `deu`, `timestamps_granularity=word`, `tag_audio_events=true`. Die Einträge vom Typ `spacing` verwerfen, Wörter und Audio-Events behalten. Fehlt das Transkript, hier stoppen: Hochladen zu ElevenLabs braucht Chris' Freigabe.

3. **Leseansicht bauen.** Jedes Wort mit Index, Pausen ab 0,6 s markiert, neuer Absatz ab 1,5 s Pause. In dieser Ansicht fällt jede Entscheidung.

4. **Takes wählen, von Hand, in `work/keeps.txt`.** Eine Zeile pro behaltenem Wortbereich (`von-bis`, inklusiv), dahinter als Kommentar, was verworfen wurde und warum. Regeln:
   - **Immer der letzte Take.** Takes nicht nach Qualität vergleichen. Der letzte Anlauf ist der, den Chris selbst stehen gelassen hat.
   - Das Video beginnt mit dem Hook. Alles davor fliegt raus.
   - Abgebrochene Wörter (Scribe schreibt sie mit `--`, `...` oder `-` am Ende) und Stotterer innerhalb eines Takes raus.
   - **Wortlaut ist heilig.** Geschnitten wird, nie umformuliert und nie aus zwei Takes ein neuer Satz gebaut.
   - Danach den behaltenen Text am Stück lesen. Er muss sich wie ein durchgehender Text lesen, ohne doppelte Satzanfänge.

5. **Hörfehler korrigieren, nur im Text.** Nur Einzelwort gegen Einzelwort, damit Wortzahl und Zeitstempel stimmen. "Cloud" wird "Claude". Mehrwort-Fälle ("KI OS", "KIOS") nur in `transcript/mishears-local.json` markieren. Das Audio bleibt unberührt.

6. **Schnittliste rechnen (`cutsheet.json`).**
   - Aneinandergrenzende Bereiche zusammenlegen, dann an jeder Pause über 0,3 s teilen.
   - Pegelkurve: Tonspur als 16 kHz mono dekodieren, RMS in 10-ms-Fenstern. Schwelle etwa 15 dB über dem Grundrauschen (im ersten Lauf Rauschen bei -71 dB, Schwelle -56 dB).
   - Out-Punkt: Wortende plus Ausklang, solange der Pegel über der Schwelle liegt (höchstens 0,3 s), plus 0,05 s. In-Punkt: Wortanfang, bis zu 0,15 s vorgezogen, wenn schon Pegel da ist, minus 0,04 s. Das ist der Wortschutz, danach liegen an einer Naht etwa 0,1 bis 0,15 s.
   - **Danach die Pausen auf Zielwert bringen** (siehe Abschnitt Pausen). Verlängert wird nur in Stille oder leisen Atem hinein (Pegel unter -50 dB), nie über das nächste Wort der Quelle hinaus. Reicht die Stille nicht, bleibt die Pause kürzer und kommt in den Bericht.
   - Liegt das verworfene Nachbarwort näher als 0,12 s, den Schnitt ins leiseste 10-ms-Fenster zwischen die beiden Wörter legen und die Stelle markieren.
   - Nie über die Grenze eines verworfenen Nachbarworts hinaus verlängern.
   - Jedes Segment trägt Quelle, Start, Ende, Frames, Wortbereich und den Text. Mit dem Textfeld lässt sich der ganze Schnitt durch Lesen prüfen.

7. **Bild und Ton getrennt rastern.** Ton samplegenau schneiden. Video in Frames mit Fehlerausgleich: Die Frame-Anzahl jedes Segments folgt der kumulierten Tonlänge. So bleibt der Versatz überall unter einem halben Frame, ohne die Schnittpunkte auf das Frame-Raster zu zwingen.

8. **Ton-Durchgang.** Ein Filtergraph: `asplit`, pro Segment `atrim` mit 8 ms Ein- und 20 ms Ausblendung gegen Klicks, `concat`, Ausgabe als PCM 24 bit. Dann `loudnorm` nur zum Messen, danach einmal auf der Gesamtspur: Hochpass 70 Hz, lineare Verstärkung, `alimiter` bei -2 dB mit `level=false`. Mit `ebur128=peak=true` nachmessen: -14 LUFS (plus minus 0,5), True Peak höchstens -1 dBFS.

9. **Bild-Durchgang.** Filtergraph aus einer Datei (`-/filter_complex datei`): `select` mit einem `between(n,in,out-1)` pro Segment, `setpts=N/(30000/1001)/TB`. Den polierten Ton dazumuxen (AAC 256 kbit/s), Metadaten und Kapitel entfernen, `+faststart`. Vorher 5 Sekunden Probe-Encode, siehe Gotchas.

10. **Transkript remappen (`transcript-cut.json`).** Jedes behaltene Wort bekommt die neue Zeit, die Segment-ID, den Quell-Index und bei Korrektur das gehörte Wort. Alle späteren Stufen (Grafiken, Untertitel, B-Roll) lesen nur diese Datei.

11. **Gegenprobe.**
    - Geschnittene Tonspur lokal mit `mlx_whisper` (large-v3-turbo) transkribieren und Wort für Wort gegen `transcript-cut.json` abgleichen. Erlaubt sind nur Ersetzungen (Zahlen als Ziffern, Hörfehler). Jedes zusätzliche Wort ist ein Rest aus einem verworfenen Take, jedes fehlende ein zu hart gesetzter Schnitt.
    - Dauer von Bild und Ton vergleichen.
    - SSIM gegen die Quelle über 150 Frames innerhalb eines langen Segments.

12. **Bericht (`bericht.md`).** Endlänge, Anzahl Segmente und Schnitte, gewählte Takes, unsichere Stellen mit Zeit im Schnitt und in der Quelle, Rechenzeit, Kosten, was von Hand nachgebessert werden muss. Zwischendateien (WAV, Analyse-Audio) danach löschen.

Der Base-Cut wird danach nicht neu gerendert. Grafiken und B-Roll kommen als eigene Stufe darüber.

## Pausen (Langform, YouTube 16:9)

Gemessen von Wortende bis Wortanfang. Werte aus Video 1 abgeleitet (Chris' natürliche Satzpause liegt bei 0,6 s, Ziel ist ein Schnitttempo nahe seinem Sprechtempo).

| Stelle | Ziel |
|---|---|
| Hook (erste 15 s) | 0,2 s |
| Satzende | 0,3 s |
| Absatz- oder Themenwechsel | 0,5 s |
| neue Stufe, neues Kapitel, Call-to-Action | 0,8 s |
| innerhalb eines Satzes | wie gesprochen, längere Lücken auf 0,3 s |

Kürzer als der Zielwert nur, wenn die Quelle keine Stille hergibt. Reels und Shorts sind schneller, dort gilt die Reel-Regel mit etwa 0,1 s. Prüfwert für Langform: Schnitttempo höchstens etwa 200 Wörter pro Minute.

## Gotchas aus dem ersten Lauf (Video 1, 29.09.2026)

- **HEVC über VideoToolbox geht mit einem x86-ffmpeg unter Rosetta nicht.** Fehler -12908, `-q:v` ist ebenfalls nicht verfügbar. `h264_videotoolbox` mit `-b:v` funktioniert. Deshalb immer zuerst 5 Sekunden Probe-Encode, bevor der lange Render startet.
- **VideoToolbox unterschreitet die Ziel-Bitrate bei ruhigem Bild deutlich** (30 Mbit/s gesetzt, 8,2 Mbit/s geliefert). Qualität über SSIM prüfen, nicht über die Bitrate. Ergebnis war 0,993, gleichauf mit x264 CRF 18.
- **SSIM über eine Naht hinweg misst Unsinn**, weil Schnitt und Quelle ab dort verschiedene Bilder zeigen. Nur innerhalb eines Segments messen.
- **4K-Video nicht in hunderte `trim`-Zweige splitten.** Jeder Zweig puffert Frames, der Speicher läuft voll. Für das Bild `select`, für den Ton ist `asplit` mit `atrim` kein Problem.
- **Der Render bleibt minutenlang bei 0 Byte.** Der Decoder läuft erst durch alles bis zum ersten behaltenen Frame (beim ersten Lauf die Intro-Anläufe bis 02:21). Das ist kein Hänger. 4K-HEVC 10 bit dekodierte mit 0,8-facher Echtzeit.
- **Segmente, die innerhalb eines Takes geteilt werden, können sich nach dem Polstern überlappen oder nach dem Runden auf Samples genau berühren.** Solche Nachbarn zusammenlegen, sonst prüft die Überlappungskontrolle falsch oder ein Stück Ton kommt doppelt.
- **Audio-Events sind selten** (3 in 23 Minuten). Das bessere Signal für einen neuen Anlauf sind lange Pausen und abgebrochene Wörter.
- **Scribe schreibt über längere Strecken "Cloud" statt "Claude".** Vor dem Verwerfen einer Zeile, die kaputt aussieht, die Hörfehler-Liste prüfen.
- **Geräusche direkt vor einem behaltenen Anlauf** (Klackern, Klappern) können trotz sauberem Schnitt hörbar bleiben. Solche Stellen im Bericht markieren.
- **"Immer der letzte Take" kann Inhalt kosten**, wenn ein Satz nur im abgebrochenen Anlauf vorkam. Im Bericht als Inhaltsverlust nennen, nicht still zurückholen.
- **0,1 s Pause überall ist zu gehetzt für Langform.** Das war die Reel-Regel. Video 1 kam damit auf 207 Wörter pro Minute, Chris spricht natürlich mit etwa 191. Deshalb gelten die Zielwerte im Abschnitt Pausen.
- **Descript Underlord kann Pausen nur kürzen, nicht verlängern**, auch bei weichen Schnitten. Und Descript schneidet nach eigenen Wortzeiten oft in den Ausklang (Video 1: 189 von 218 Out-Punkten zu knapp, das letzte Wort um 0,12 s gekappt). Wer mit Descript schneidet, gibt Underlord die Zielwerte als Obergrenze mit ("kürze Pausen über X auf X") und legt den Wortschutz danach lokal drüber: FCPXML exportieren, Schnittpunkte per Pegelkurve nachziehen, aus dem Original rendern.

## Richtwerte vom ersten Lauf

23:38 min Rohtake, 3311 Wörter. Ergebnis 10:29,6 min, 178 Segmente, 177 Schnitte, 2177 Wörter behalten. Rechenzeit knapp 24 min, davon knapp 13 min Video-Render. Neue Kosten 0 €, das Transkript kostete vorher 433 ElevenLabs-Credits.

Quelle: Aufbau angelehnt an Brad Bonannos One-Shot-Editing-Workflow, angepasst und am eigenen Video getestet.
