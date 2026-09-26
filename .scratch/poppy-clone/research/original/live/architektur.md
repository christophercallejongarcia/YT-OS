# Poppy-Architektur aus dem Netzwerkverkehr (26.09.2026)

Quelle: Playwright-Netzwerklog einer eingeloggten Session (Test-Abo). Nur Endpunkt-Namen, keine Inhalte.

| Schicht | Dienst | Beleg |
|---|---|---|
| Frontend | Next.js (App Router), Tailwind, shadcn/ui, React Flow | `/_next/static/chunks`, CSS-Variablen, `--bg-flow` |
| Auth | Clerk (`clerk.getpoppy.ai`), inkl. Organisationen/Teams | `/v1/me/organization_memberships` |
| Echtzeit-Daten (Boards, Nodes, Chats) | Firebase Firestore, Login per Custom Token aus Clerk | `Firestore/Listen/channel`, `Firestore/Write/channel`, `/api/firebase-token`, `signInWithCustomToken` |
| Chat | Next.js-Route `POST /api/chat`, Streaming nach Vercel-AI-SDK-Muster (`onError`, `chatId`), Standardmodell "Claude 5 Sonnet" | Konsole: `Chat onError {chatId: chat-chatNode-…, nodeId: chatNode-…, model: Claude 5 Sonnet}` |
| YouTube | `POST /api/youtube` (Video), `POST /api/youtube-channel-videos` (Kanal mit Latest/Popular/Outliers) | |
| Brand Voice | `POST/PUT /api/brands`, `POST /api/brands/:id/analyze` | |
| Sprachnotizen | `GET /api/transcribe-live/elevenlabs` (Live-Transkription über ElevenLabs) | |
| Templates | separates Backend `POST api.getpoppy.ai/api/nodes/copy` | Tour kopiert "YouTube Content Frameworks" aufs Board |
| Uploads | Uploadcare | `tlm.uploadcare.com` |
| Analytics/Support | PostHog (über `/ingest`-Proxy), Sentry, Plausible, RudderStack, Intercom, Featurebase (Changelog, Surveys), Tally (Onboarding-Umfrage) | |

ID-Schema: Boards `wonderful-forest-84Tck` (Adjektiv-Nomen-Kurz-ID), Board-Titel zufällig ("Salmon Fowl"), Nodes `chatNode-patient-fire-1uw8F` (Typ-Präfix plus Adjektiv-Nomen-ID), Chats `chat-<nodeId>`.

Für den Klon: Firestore lässt sich 1:1 durch Convex ersetzen (auch Echtzeit, passt zu Signal Room). Clerk bleibt eine Option, für den Eigengebrauch reicht erst mal kein Auth.
