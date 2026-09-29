# Dreh Video 1 und Transkript mit Wort-Zeitstempeln

Type: task
Status: resolved

## Question

A-Roll von Video 1 aufnehmen (Osmo Pocket 4, Elgato-Teleprompter) und ein Transkript mit Zeitstempel pro Wort erzeugen (WhisperX oder vergleichbar). Das Ergebnis legt fest, womit die Edit- und B-Roll-Entscheidungen arbeiten. Ablage unter videos/01-stufenleiter/, Rohmaterial außerhalb von Git.

## Comments

- 2026-09-29: Dreh ist erledigt (27.09., siehe `videos/01-stufenleiter/dreh-log.md`). Offen ist nur noch das Transkript mit Wort-Zeitstempeln, laut Roadmap Tag 5.
- 2026-09-29: Transkript wird mit ElevenLabs Scribe erstellt (Entscheidung Chris). Grund: genauer auf Deutsch, kommt mit dem schwachen Dreh-Ton besser klar, markiert Pausen und Geräusche, das hilft beim Finden von Versprechern und doppelten Takes. Chris hat das Hochladen der Tonspur zu ElevenLabs freigegeben. Ablauf: Tonspur lokal mit ffmpeg aus dem Haupt-Take ziehen, an Scribe schicken, Ergebnis als JSON mit Wort-Zeitstempeln plus lesbarer Fassung in `private/` ablegen, nie ins Repo. Schlüssel: `ELEVENLABS_API_KEY` in `~/.config/yt-os/.env` (außerhalb des Repos). Danach macht derselbe Cook-Thread den Schnittvorschlag.
- 2026-09-29: Transkript erstellt mit ElevenLabs Scribe v2 (Deutsch, Wort-Zeitstempel, Audio-Events). SHA-256 des Haupt-Takes geprüft, Tonspur verlustfrei mit ffmpeg gezogen. Ablage lokal in `private/video-01/` (Roh-JSON, lesbare Fassung mit Zeitmarken pro Absatz, Tonspur), nicht im Repo. 3308 Wörter über die vollen 23:38 min, Kosten 433 Credits (0,09 USD). Auffällig: Intro in 9 Anläufen, erster vollständiger Durchlauf ab 02:21. Fast jeder Abschnitt hat doppelte Takes, meist ist der letzte Anlauf der saubere. Scribe schreibt zwischen 05:50 und 12:12 oft "Cloud" statt "Claude". Nächster Schritt: Schnittvorschlag im selben Cook-Thread.
