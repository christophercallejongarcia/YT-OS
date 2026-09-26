# YouTube-Datenquelle für Signal Room

Type: research
Status: resolved

## Question

Wie kommt Signal Room an YouTube-Daten für Outlier-Erkennung: YouTube Data API v3 (Quota, Kosten, Felder) oder ein Apify-Actor (wie beim Instagram-Connector)? Benötigt pro Video: Aufrufe, Datum, Kanal-Abonnenten, Kanal-Durchschnitt, Titel, Thumbnail-URL, Transkript. Wie passt das in den bestehenden Connector-Aufbau von /Users/cristobalcallejongarcia/dev/signal-room-starter?

## Answer

Hybrid: Metadaten und Zahlen über die YouTube Data API v3, Transkripte über einen Apify-Actor nur für Outlier.
Die API ist kostenlos. Ein täglicher Sweep über 30 Kanäle inklusive Zahlen-Refresh des ganzen Korpus kostet rund 121 von 10.000 Quota-Einheiten. Der Refresh ist bei YouTube der Kern, weil Longform-Videos wochenlang Aufrufe sammeln. Mit Apify würde er 9 bis 27 $/Monat kosten.
Transkripte liefert die API für fremde Videos nicht. Erster Kandidat ist `codepoetry/youtube-transcript-ai-scraper` (0,90 $ pro 1.000, Whisper-Fallback mit Deckel), vorher gegen `scrape-creators/best-youtube-transcripts-scraper` testen.
Einbau: neuer `lib/adapters/sources/youtube-data-api.ts` mit `mapVideo`, Netzwerk-Weiche in `lib/collect.ts` und `app/api/creators/route.ts`. Neues ADR für die YouTube-Outlier-Definition (Aufrufe / Median der Longform-Aufrufe des Kanals).
Risiko: Die API-Richtlinien verbieten abgeleitete Kennzahlen und gescrapte Daten, Scraping verstößt gegen die YouTube-AGB. Für ein privates Werkzeug ist das Risiko gering. Rückfallebene: `streamers/youtube-channel-scraper`.
yt-dlp bleibt für `/watch`, last30days und die Handrecherche zu Video 1. Im Convex-Cron läuft es nicht.

Asset: /Users/cristobalcallejongarcia/dev/YT-OS/.scratch/yt-os/assets/youtube-datenquelle.md
