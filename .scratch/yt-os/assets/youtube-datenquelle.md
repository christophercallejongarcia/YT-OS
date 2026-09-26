# YouTube-Datenquelle für Signal Room

Recherche zu Ticket 04, Stand 26.09.2026. Kennzeichnung: **[F]** = Fakt mit Quelle, **[I]** = eigene Schlussfolgerung oder Schätzung.

## Kurzfassung

Metadaten und Zahlen kommen über die YouTube Data API v3, Transkripte über einen Apify-Transkript-Actor, der nur für Outlier läuft. Die API kostet nichts, das Quota reicht für eine 30-Kanal-Watchlist rund 80-fach, und sie liefert jeden Tag frische Aufrufzahlen für den ganzen Korpus. Das ist bei YouTube wichtiger als bei Instagram, weil Longform-Videos wochenlang weiter Aufrufe sammeln. Transkripte bleiben beim bewährten Muster aus dem Instagram-Pfad: ein Apify-Lauf mit URL-Liste, Kosten im selben `usage`-Feld am Run. yt-dlp bleibt Chris' lokales Werkzeug (`/watch`, last30days), passt aber nicht in den Convex-Cron.

## 1. Wie Signal Room heute Daten holt

Alles hier ist **[F]**, gelesen im Repo `/Users/cristobalcallejongarcia/dev/signal-room-starter` (nicht verändert).

- **Connector-Vertrag:** `SourceConnector { id; collect(creators): Promise<SignalRecord[]> }` in `lib/contracts.ts` (Zeile 895). `Network` kennt schon `"youtube" | "instagram" | "tiktok"`, `SignalRecord.format` kennt schon `"long" | "short"`.
- **Instagram-Connector:** `lib/adapters/sources/apify-instagram.ts`. `resolveProfile` (Actor `apify~instagram-profile-scraper`, einmal beim Add) liefert Follower als `audience`. `collectForCreator` ruft `apify~instagram-scraper` zweimal (reels, posts) und merged nach `shortCode`. `mapPost` ist laut ADR-0002 der einzige Ort, der Actor-Felder kennt.
- **Apify-Client:** `lib/adapters/sources/apify-client.ts` startet einen Run, pollt bis zum Ende, liest Dataset und `usageTotalUsd`. Kosten landen als `RunUsage` am `Run` (Kosten-Guard, `lib/run-cost.ts`).
- **Orchestrierung:** `lib/collect.ts`. `runRefresh` filtert hart auf `network === "instagram"` (Zeile 253), `CollectDeps.collect` und `CollectDeps.transcribe` sind je eine einzelne Funktion. `app/api/creators/route.ts` lehnt jedes andere Netzwerk mit `Network ${network} has no connector yet` ab.
- **Zeitfenster:** `lib/refresh-window.ts` liefert `onlyPostsNewerThan` für den Actor (`"90 days"` beim Backfill, sonst `lastCheckedAt` minus ein Tag). Ältere Beiträge bekommen danach keine neuen Zahlen mehr.
- **Speicher:** Convex (`convex/schema.ts`, Tabellen `creators`, `signals`, `runs`), `network` ist dort ein freier String. Datei-Store nur als Fallback (ADR-0005).
- **Outlier:** `lib/adapters/scoring/outlier.ts`. Outlier = `plays / audience` (Fallback `views`), Channel-Relative = `plays / median(plays)` des Creators im Korpus (ADR-0003). ADR-0003 sagt ausdrücklich: "Der Demo-Scorer bleibt für den YouTube-Pfad". Eine YouTube-Outlier-Definition existiert also noch nicht.
- **Transkripte:** `lib/adapters/sources/apify-transcripts.ts`, Actor `apple_yang~instagram-transcripts-scraper`, ein Lauf mit `bulkUrls`. Auswahl über `pickTranscriptBatch` in `lib/transcripts.ts` (Score-Schwelle 20, max. 20 pro Lauf). Status `ready/silent/missing/pending/failed`.
- **Cron:** Convex-Action `convex/refresh.ts` (`"use node"`), 10:00 Berlin, max. zehn Minuten Laufzeit, kein Datenträger.
- **UI:** YouTube-Toggle, Add-Feld mit `https://youtube.com/@creator` und 16:9-Cover existieren schon in `components/signal-room.tsx`. Die UI wartet nur auf Daten.

## 2. Benötigte Felder pro Video

| Feld | Zweck | YouTube Data API v3 | Apify `streamers/youtube-scraper` | yt-dlp (voll, pro Video) |
|---|---|---|---|---|
| Aufrufe | Reichweite | `videos.statistics.viewCount` | `viewCount` | `view_count` |
| Veröffentlichungsdatum | Zeitfenster, Velocity | `snippet.publishedAt` | `date` | `timestamp` / `upload_date` |
| Kanal-Abonnenten | `Creator.audience` | `channels.statistics.subscriberCount` (auf 3 signifikante Stellen gerundet) | `numberOfSubscribers` | `channel_follower_count` (gerundet, z. B. 276000) |
| Kanal-Durchschnitt | Outlier-Multiple | nicht direkt, aus Korpus berechnen (Median) | nicht direkt; `channelTotalViews` / `channelTotalVideos` als grobe Lebenszeit-Zahl | nicht direkt |
| Titel | Hook, Karte | `snippet.title` | `title` | `title` (lokalisiert, siehe unten) |
| Thumbnail-URL | Cover | `snippet.thumbnails.maxres/high/...` | `thumbnailUrl` | `thumbnails[]` |
| Dauer | Short vs. Longform | `contentDetails.duration` (ISO 8601) | `duration` | `duration` (Sekunden) |
| Transkript | Hook-Quelle, Analyse | **nicht verfügbar** für fremde Videos | `subtitles` (optional), ASR kostenpflichtig | `--write-auto-subs --sub-langs de.*` |

Quellen: **[F]** Google-Doku zu `channels` (Kommentar "this value is rounded to three significant figures"), https://developers.google.com/youtube/v3/docs/channels. **[F]** Apify-Feldliste von https://apify.com/streamers/youtube-scraper (Beispiel-Output: `viewCount`, `date`, `numberOfSubscribers`, `thumbnailUrl`, `duration`, `channelTotalViews`, `channelTotalVideos`, `subtitles`). **[F]** yt-dlp-Felder live getestet am 26.09.2026 mit yt-dlp 2026.08.19 auf Chris' Mac.

**Kanal-Durchschnitt [I]:** Weder API noch Actor liefern einen brauchbaren Durchschnitt. `channelTotalViews / videoCount` ist ein Lebenszeit-Wert, der Shorts und alte Hits mitzählt. Besser: Median der Aufrufe der Longform-Videos des Kanals im gehaltenen Korpus (90 Tage), genau wie Channel-Relative in ADR-0003. Der Median braucht dafür aktuelle Aufrufzahlen des ganzen Korpus, nicht nur der neuen Videos.

**Short oder Longform [I]:** Die API hat kein Shorts-Flag. Heuristik über `duration <= 180 s` (Shorts dürfen seit Oktober 2024 bis drei Minuten lang sein). Ein inoffizieller Trick sind die Playlist-Präfixe `UULF` (nur Longform) und `UUSH` (nur Shorts) statt `UU` für die Upload-Playlist. Nicht dokumentiert, deshalb nur als Optimierung.

## 3. Option A: YouTube Data API v3

### Endpunkte und Quota **[F]**

Quelle: https://developers.google.com/youtube/v3/determine_quota_cost (Stand 15.09.2026) und https://developers.google.com/youtube/v3/revision_history.

| Aufruf | Kosten | Wofür |
|---|---|---|
| `channels.list` (`forHandle=@x` oder `id=` bis 50 IDs) | 1 Einheit | Abonnenten, Upload-Playlist-ID, Name, Avatar |
| `playlistItems.list` (Upload-Playlist, 50 pro Seite) | 1 Einheit pro Seite | neue Video-IDs eines Kanals, günstig statt Suche |
| `videos.list` (`part=snippet,statistics,contentDetails`, bis 50 IDs) | 1 Einheit | Aufrufe, Datum, Titel, Thumbnail, Dauer |
| `videos.batchGetStats` (neu seit 03.06.2026) | 1 Einheit, eigener Topf mit 10.000/Tag | nur Statistik, für den täglichen Zahlen-Refresh |
| `search.list` | seit 01.06.2026 eigener Topf: 100 Aufrufe/Tag, 1 pro Aufruf | Kanal-Entdeckung per Stichwort, nicht für den Refresh nötig |
| `captions.list` / `captions.download` | 50 / 200 Einheiten | nur mit Bearbeitungsrecht am Video, also nicht für fremde Kanäle |

Standard-Quota: 10.000 Einheiten pro Tag für alle übrigen Methoden, Reset um Mitternacht Pacific Time. Mehr Quota gibt es über das Quota-Extension-Formular mit Audit.

### Was das Quota erlaubt **[I]**

Annahme: 30 Kanäle, pro Kanal höchstens 150 Videos im 90-Tage-Korpus.

- Täglicher Sweep: 1 × `channels.list` (30 IDs) + 30 × `playlistItems.list` (je eine Seite reicht für ein Tages-Delta) + 90 × `videos.list` (4.500 Videos in 50er-Paketen) = **rund 121 Einheiten**, also etwa 1,2 % des Tagesbudgets.
- Backfill eines neuen Kanals: 1 + 1 bis 3 Seiten + 1 bis 3 `videos.list` = unter 10 Einheiten.
- Selbst 300 Kanäle mit täglichem Zahlen-Refresh des gesamten Korpus bleiben unter 1.500 Einheiten.

### Kosten und Einrichtung **[F]**

Keine Kosten pro Aufruf, die Grenze ist das Quota. Einrichtung: Google-Cloud-Projekt anlegen, "YouTube Data API v3" aktivieren, API-Key erzeugen, Key auf diese API beschränken. Für öffentliche Daten reicht der Key, kein OAuth. In Signal Room: `YOUTUBE_API_KEY` in `.env.local` und `npx convex env set YOUTUBE_API_KEY ...` für den Cron (gleiches Muster wie `APIFY_TOKEN`).

### Stärken und Schwächen

- Offizielles, versioniertes Schema. Felder ändern sich selten, Google kündigt Änderungen im Changelog an. **[F]** Beispiel: Thumbnails in `fhd/qhd/uhd` seit 11.09.2026.
- Läuft per `fetch` direkt in der Convex-Action, kein Binary, keine Proxy-Frage. **[I]**
- Kein Transkript. **[F]** `captions.download` verlangt Bearbeitungsrecht am Video (https://developers.google.com/youtube/v3/docs/captions/download).
- **Richtlinien-Haken [F]:** Die YouTube API Developer Policies verbieten, "API Data to create new or derived data or metrics" zu nutzen, ebenso "obtain scraped YouTube data or content". Nicht autorisierte Daten dürfen höchstens 30 Tage gespeichert werden, danach löschen oder auffrischen; Abonnentenzahlen ausdrücklich eingeschlossen. Quelle: https://developers.google.com/youtube/terms/developer-policies. Ein Outlier-Multiple ist eine abgeleitete Kennzahl. Seit 01.06.2026 gibt es dafür eine Ausnahme nur für auditierte Entwickler mit Analytics-Anwendungsfall.
- **Einordnung [I]:** Für ein privates Ein-Personen-Werkzeug ohne Veröffentlichung ist das Durchsetzungsrisiko gering; schlimmstenfalls sperrt Google den API-Key. Das Risiko ist real, aber nicht größer als beim Scraping-Pfad, der gegen die YouTube-Nutzungsbedingungen verstößt (siehe Option B). Der tägliche Refresh aller gespeicherten Videos erfüllt nebenbei die 30-Tage-Auffrischpflicht.

## 4. Option B: Apify-Actors

### Metadaten-Actors **[F]**

Quelle: Apify Store via `search-actors` und `fetch-actor-details` am 26.09.2026, Preise im BRONZE-Tarif.

| Actor | Preis | Nutzer | Bewertung | Felder |
|---|---|---|---|---|
| `streamers/youtube-scraper` (offiziell Apify) | 0,003 $/Video = **3 $ pro 1.000**; Datumsfilter +0,001 $; ASR-Transkript +0,041 $ pro angefangener Minute | 127.018 gesamt, 10.896 monatlich | 4,8 (196) | alle Felder aus Abschnitt 2, dazu `subtitles` in Sprache `de` wählbar |
| `streamers/youtube-channel-scraper` (offiziell Apify) | 0,001 $/Video = **1 $ pro 1.000** | 23.362 / 2.706 | 4,63 (40) | "channel info, total number of subscribers, videos and views ... basic video data"; Eingabe `startUrls`, `oldestPostDate`, `sortVideosBy` |
| `streamers/youtube-shorts-scraper` | 0,003 $/Short | 64.184 / 3.146 | 4,35 | Shorts eines Kanals |

`streamers/youtube-scraper` bietet `transcriptionAndSubtitle` mit `ALWAYS_SUBTITLES`, `TRANSCRIPTION_AS_FALLBACK`, `ALWAYS_TRANSCRIBE`. Laut Store-Seite ist das Herunterladen vorhandener Untertitel Teil des Video-Datensatzes, nur die Speech-to-Text-Transkription kostet den Minutenpreis.

### Kosten im Betrieb **[I]**

Der Haken ist der Zahlen-Refresh. Bei Apify kostet jedes Video jedes Mal. Um die Aufrufe der letzten 30 Tage täglich frisch zu halten (30 Kanäle × ca. 10 Videos = 300 Videos/Tag):

- `youtube-scraper`: 300 × 0,003 $ = 0,90 $/Tag, rund **27 $/Monat**.
- `youtube-channel-scraper`: 300 × 0,001 $ = 0,30 $/Tag, rund **9 $/Monat**, bei weniger garantierten Feldern.
- Mit dem heutigen Delta-Muster (nur neue Videos) wäre es billiger, aber dann frieren die Aufrufe eines Videos am Tag nach Upload ein. Für YouTube-Outlier ist das wertlos, weil ein Longform-Video seine Aufrufe über Wochen sammelt.

### Stärken und Schwächen

- Passt 1:1 ins bestehende Muster: `runActor`, `RunUsage`, Kosten-Guard, `mapPost`-artiger Mapper. **[F]** laut Code.
- Kein Google-Projekt, keine Quota. **[F]**
- Scraping widerspricht den YouTube-Nutzungsbedingungen: "access the Service using any automated means (such as robots, botnets or scrapers) except ... with YouTube's prior written permission" (https://www.youtube.com/t/terms). **[F]** Das Risiko trägt praktisch der Actor-Betreiber, für Chris bleibt Ausfallrisiko bei YouTube-Änderungen. **[I]**

## 5. Option C: yt-dlp (lokal)

- Chris nutzt es schon: `/watch` lädt Untertitel mit `--write-auto-subs --sub-langs en.*` und fällt auf Whisper (Groq, OpenAI) zurück. **[F]** `~/.claude/plugins/cache/claude-video/watch/0.2.0/skills/watch/scripts/download.py`. Für deutsche Videos müsste `de.*` rein. **[I]**
- last30days holt YouTube komplett über yt-dlp: `ytsearch<N>:<thema> --dump-json` für Suche und Metadaten, Transkripte per yt-dlp, dann direkter HTTP-Abruf der Caption-Tracks aus `ytInitialPlayerResponse`, dann optional ScrapeCreators (`api.scrapecreators.com/v1/youtube`) als bezahlter Rückfall. Der Code erkennt ausdrücklich 429 und "confirm you're not a bot" und empfiehlt SSH-Routing über eine private IP, weil Rechenzentrums-IPs geblockt werden. **[F]** `~/.claude/plugins/cache/last30days-skill/last30days/3.18.4/skills/last30days/scripts/lib/youtube_yt.py`. Bei Chris ist kein ScrapeCreators-Key hinterlegt. **[F]** `~/.config/last30days/.env` enthält nur `XAI_API_KEY`.
- Live-Test 26.09.2026 **[F]**: `--flat-playlist` auf einen Kanal liefert gerundete Aufrufe (44000, 199000) und **kein Datum**, also ungeeignet. Die volle Extraktion pro Video liefert exakte Aufrufe, `timestamp`, `channel_follower_count`, Likes, Kommentare. Ein getestetes Video hatte weder Untertitel noch Auto-Captions, ein anderes hatte welche. Titel kommen lokalisiert zurück (Original englisch, geliefert deutsch).
- **Einordnung [I]:** Kostenlos und auf dem Mac zuverlässig genug für Einzelabrufe. Für Signal Room ungeeignet als Hauptquelle: Die Convex-Action kann kein Binary starten, läuft auf Rechenzentrums-IPs und hat zehn Minuten Laufzeit. Die volle Extraktion kostet mehrere Sekunden pro Video. yt-dlp verstößt wie jedes Scraping gegen die YouTube-Nutzungsbedingungen.

## 6. Transkripte

Die offizielle API liefert für fremde Videos keine Transkripte. **[F]** Alle Wege sind Scraping der Caption-Tracks oder eigene Spracherkennung.

| Weg | Kosten | Ohne Captions | Cloud-tauglich | Zuverlässigkeit |
|---|---|---|---|---|
| `codepoetry/youtube-transcript-ai-scraper` (Apify) | 0,0009 $/Transkript (**0,90 $ pro 1.000**), Whisper-Fallback 0,011 $/Min., Start 0,00225 $; Deckel `maxAiMinutes`, `skipAiFallbackIfLongerThan` | ja, Whisper | ja | 1.794 Nutzer, keine Bewertung, zuletzt geändert 26.09.2026 **[F]** |
| `supreme_coder/youtube-transcript-scraper` (Apify) | 0,0007 $/Transkript (0,70 $ pro 1.000) | nein | ja | 2.379 Nutzer, 5,0 bei nur 2 Bewertungen **[F]** |
| `scrape-creators/best-youtube-transcripts-scraper` (Apify) | 0,001 $/Ergebnis (1 $ pro 1.000) | nein | ja | 2.293 Nutzer, 4,52 (13) **[F]** |
| `starvibe/youtube-video-transcript` (Apify) | 0,005 $/Ergebnis (5 $ pro 1.000), liefert auch Metadaten | nein | ja | 11.407 Nutzer, 5,0 (23) **[F]** |
| `pintostudio/youtube-transcript-scraper` (Apify) | 0,009 $/Ergebnis | nein | ja | 25.026 Nutzer, aber nur 3,72 (49) **[F]** |
| `streamers/youtube-scraper` Untertitel | im Videopreis (3 $ pro 1.000); ASR 0,041 $/Min. | ja, teuer | ja | siehe oben **[F]** |
| Supadata (eigene API) | 1 Credit pro Transkript mit Captions, KI-Transkript +2 Credits/Min.; Free 100/Monat, Pro 17 $ für 3.000 (ca. 5,70 $ pro 1.000) | ja | ja | nicht geprüft **[F]** Preise von https://supadata.ai/pricing |
| yt-dlp / `youtube-transcript-api` lokal | kostenlos | nein (Whisper extra, Groq-Key) | nein | IP-Sperren auf Servern, Bot-Wall **[F]** last30days-Code |

**Einordnung [I]:** Transkripte werden wie bei Instagram nur für Outlier über der Schwelle geholt, höchstens 20 pro Lauf. Bei 20 Videos pro Tag kosten Caption-Transkripte unter 0,02 $ pro Tag. Teuer wird nur Whisper bei langen Videos ohne Captions (20 Min. × 0,011 $ = 0,22 $ pro Video), deshalb Deckel setzen. Für Chris' deutsche KI-Nische haben die meisten Talking-Head-Videos Auto-Captions, das getestete Gegenbeispiel zeigt aber, dass ein Fallback nötig ist.

## 7. Optionen im Vergleich

| | A: Data API + Apify-Transkript | B: nur Apify | C: yt-dlp lokal |
|---|---|---|---|
| Kosten Metadaten (30 Kanäle, täglicher Zahlen-Refresh) | 0 $ **[F/I]** | 9 bis 27 $/Monat **[I]** | 0 $ |
| Kosten Transkripte (20/Tag) | ca. 0,50 $/Monat plus Whisper-Fälle **[I]** | im Videopreis oder ASR 0,041 $/Min. | 0 $ plus Whisper |
| Quota / Limits | 10.000 Einheiten/Tag, Bedarf ca. 121 **[I]** | nur Geld | Bot-Wall, Rate-Limits |
| Felder vollständig | ja, außer Transkript | ja | ja, pro Video langsam |
| Zahlen-Refresh ganzer Korpus | billig | kostet pro Video | langsam |
| Läuft im Convex-Cron | ja | ja | nein |
| Schema-Stabilität | hoch, offiziell | mittel, Actor kann sich ändern | mittel, Updates nötig |
| Richtlinien | abgeleitete Kennzahlen verboten, Scraping-Mix verboten, 30-Tage-Regel | verstößt gegen YouTube-AGB | verstößt gegen YouTube-AGB |
| Aufwand im Connector-Muster | mittel: neuer HTTP-Client, Mapper, Quota-Zähler **[I]** | klein: gleicher `runActor`, neuer Mapper **[I]** | groß: lokaler Worker nötig **[I]** |

## 8. Skizze: YouTube-Connector in Signal Room **[I]**

Alle Pfade relativ zu `/Users/cristobalcallejongarcia/dev/signal-room-starter`. Nur Skizze, nichts davon ist gebaut.

```
POST /api/creators {network:"youtube", handle:"@kanal"}
  -> youtube-data-api.resolveChannel()      channels.list forHandle     (1 Einheit)
  -> runBackfill -> collectAndStore
       -> collectors.youtube(creator)        playlistItems.list + videos.list
       -> mapVideo -> SignalRecord (format "long" | "short")
  -> storage.saveSignals (Convex, upsert über id "yt-<videoId>")

Convex-Cron 10:00 -> runRefresh
  -> Instagram wie bisher
  -> YouTube: neue Videos seit lastCheckedAt + Statistik-Refresh aller Korpus-Videos (videos.batchGetStats)
  -> transcribeOutliers -> transcribers.youtube (Apify-Transkript-Actor, bulk URLs)
  -> Run mit usage (Apify-$) und quotaUnits (YouTube)
```

| Datei | Änderung |
|---|---|
| `lib/adapters/sources/youtube-data-api.ts` (neu) | `normalizeChannelHandle`, `resolveChannel` (Abonnenten -> `audience`, Upload-Playlist-ID), `collectForChannel(creator)`, `refreshStats(ids)`, `mapVideo` als einziger Ort mit API-Feldern (wie `mapPost`, ADR-0002). `fetch` mit `YOUTUBE_API_KEY`, zählt Quota-Einheiten. |
| `lib/adapters/sources/youtube-transcripts.ts` (neu) | Gleiche Signatur wie `Transcriber` aus `apify-transcripts.ts`, eigener Actor, Zuordnung per Video-ID statt Shortcode, liefert `segments` mit Zeitmarken. |
| `lib/collect.ts` | Filter `network === "instagram"` (Zeile 253) aufheben. `CollectDeps.collect` und `transcribe` pro Netzwerk auflösen (Map `{instagram, youtube}`). YouTube-Refresh aktualisiert zusätzlich die Zahlen des ganzen Korpus. |
| `lib/refresh-window.ts` | ISO-Datum für `publishedAfter`-Vergleich statt `"90 days"`-String, oder Umrechnung im Adapter. |
| `app/api/creators/route.ts` | 400-Sperre für andere Netzwerke durch Weiche ersetzen: Instagram -> `resolveProfile`, YouTube -> `resolveChannel`. |
| `lib/contracts.ts` | `RunUsage` um `quotaUnits?` ergänzen. Optional `Creator.uploadsPlaylistId`. `SignalRecord` passt schon (`views`, `durationSeconds`, `thumbnailUrl`, `format: "long" | "short"`). |
| `convex/schema.ts` | Die optionalen Felder von oben spiegeln, sonst nichts. |
| `lib/adapters/scoring/outlier.ts` | Für YouTube ist der Kanal-Median (Channel-Relative) die Hauptzahl, getrennt nach Longform und Shorts. `views / subscribers` bleibt Nebenzahl. |
| `lib/config.ts`, `.env.example` | `YOUTUBE_API_KEY`, `YOUTUBE_TRANSCRIPT_ACTOR`, Whisper-Minutendeckel. |
| `docs/adr/0007-youtube-data-api-plus-apify-transkripte.md` (neu) | Entscheidung, Quota-Rechnung, Richtlinien-Risiko. |
| `docs/adr/0003-outlier-definition.md` | Ergänzung oder neues ADR: YouTube-Outlier = Aufrufe / Median der Longform-Aufrufe des Kanals. |
| `CONTEXT.md` | "Short" ist schon für YouTube reserviert; Begriffe "Longform", "Kanal-Median" ergänzen. |

Nebenbefund Cover-Cache **[I]:** YouTube-Thumbnails (`i.ytimg.com/vi/<id>/...`) laufen nicht ab wie Instagram-CDN-Links. Der Cache in `lib/adapters/storage/cover-cache.ts` funktioniert trotzdem, ist für YouTube aber nicht zwingend.

Nebenbefund Zählweise **[F]:** Seit dem 27.08.2026 zählt YouTube öffentliche Aufrufe ab dem ersten Frame, auch bei Autoplay, für alle Formate (https://developers.google.com/youtube/v3/revision_history). **[I]** Videos vor und nach diesem Datum sind beim Kanal-Median nur eingeschränkt vergleichbar; das 90-Tage-Fenster wächst bis Ende November aus dem Übergang heraus.

## 9. Empfehlung **[I]**

1. **Metadaten und Zahlen über die YouTube Data API v3.** Kostenlos, offizielles Schema, läuft im Convex-Cron, und der tägliche Zahlen-Refresh des ganzen Korpus kostet rund 1 % des Quotas. Genau dieser Refresh ist bei YouTube der Kern der Outlier-Erkennung.
2. **Transkripte über einen Apify-Actor, nur für Outlier.** Gleicher `runActor`, gleicher Kosten-Guard, gleiche Statuslogik wie bei Instagram. Erster Kandidat `codepoetry/youtube-transcript-ai-scraper` wegen Whisper-Fallback mit Minutendeckel; weil er wenig Nutzer und keine Bewertungen hat, vor dem Einbau mit 10 deutschen Videos gegen `scrape-creators/best-youtube-transcripts-scraper` testen.
3. **Outlier für YouTube neu definieren:** Aufrufe geteilt durch den Median der Longform-Aufrufe des Kanals, Shorts getrennt. `views / subscribers` nur als Nebenzahl.
4. **Rückfallebene:** Sperrt Google den Key oder reicht das Quota nicht, ersetzt `streamers/youtube-channel-scraper` die API. Weil nur `mapVideo` die Quellfelder kennt, bleibt der Tausch auf eine Datei begrenzt.
5. **yt-dlp** bleibt für Chris' Handarbeit (`/watch`, last30days) und für die Outlier-Recherche zu Video 1, die jetzt schon ohne Signal Room geht.

Offen für die Umsetzung: Größe der YouTube-Watchlist (die Rechnung nimmt 30 Kanäle an) und ob Chris das Richtlinien-Risiko der API für ein privates Werkzeug akzeptiert.
