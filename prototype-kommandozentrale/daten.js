// PROTOTYP Kommandozentrale: alle Daten fest in der Seite, von Hand und per Skript
// aus den Dateien im Repo gezogen (Stand 02.10.2026, Commit 8fc1c58).
// Regel: nichts erfinden. Was in keiner Datei steht, ist ein Platzhalter (luecke: '...').

window.YTOS = {
  stand: {
    datum: 'Fr 02.10.',
    tag: 8, // roadmap.md: "Tag 8, Fr 02.10."
    tage: 30,
    quelle: 'memory.md, .scratch/yt-os/roadmap.md',
  },

  // roadmap.md, Abschnitt Ziele und Woche 2 bis 4
  meilensteine: [
    { tag: 8, datum: '02.10.', was: 'heute' },
    { tag: 9, datum: '03.10.', was: 'B-Roll-Weg wählen' },
    { tag: 15, datum: '09.10.', was: 'Video 1 privat hochladen' },
    { tag: 16, datum: '10.10.', was: 'Video 1 geht online', gross: true },
    { tag: 17, datum: '11.10.', was: 'Thema Video 2 wählen' },
    { tag: 23, datum: '17.10.', was: 'Dreh Video 2' },
    { tag: 29, datum: '23.10.', was: 'Shipped-Abgabe' },
    { tag: 30, datum: '24.10.', was: 'Challenge-Ende', gross: true },
  ],

  // README.md "Die sieben Stufen", substrate/skills.md, tools.md.
  // Publish-Gate als eigene Stufe: rules/never.md 1 und Kontext aus dem Captain-Thread.
  // tester: 'ja' = Tester bekommen die Stufe, 'optional' = eigene Sache, 'nein' = nur Chris
  stufen: [
    {
      id: 'outlier', nr: 1, name: 'Outlier', frage: 'Was läuft in deiner Nische?',
      tester: 'ja', icon: 'radar',
      chris: 'Signal Room (privat), Outlier nach Kanal-Median',
      fuerTester: 'Links einfügen, Transkripte holt skript-partner. Oder eigener YouTube-Schlüssel.',
      werkzeug: 'fehlt', werkzeugText: 'kein Skill im Repo',
      befehle: [],
      beleg: 'README.md, tools.md',
    },
    {
      id: 'skript', nr: 2, name: 'Skript', frage: 'Was sagst du vor der Kamera?',
      tester: 'ja', icon: 'scroll-text',
      chris: 'Skript-Kette in .claude/skills/',
      fuerTester: 'dieselbe Skript-Kette',
      werkzeug: 'gebaut', werkzeugText: '5 Skills, noch nie komplett gelaufen',
      befehle: ['/skript-partner', '/skript-mix', '/skript-anreichern', '/sprechfassung', '/text-check'],
      beleg: 'substrate/skills.md, memory.md',
    },
    {
      id: 'packaging', nr: 3, name: 'Titel und Thumbnail', frage: 'Warum klickt jemand?',
      tester: 'ja', icon: 'image',
      chris: 'Signal Room: Titel-Builder und Cover Lab',
      fuerTester: '/thumbnail-lab, liegt auf dem Branch skill/thumbnail-lab',
      werkzeug: 'branch', werkzeugText: 'thumbnail-lab, noch nicht in master',
      befehle: ['/thumbnail-lab'],
      beleg: 'README.md, Branch skill/thumbnail-lab',
    },
    {
      id: 'dreh', nr: 4, name: 'Dreh', frage: 'Aufnehmen',
      tester: 'optional', icon: 'camera',
      chris: 'DJI Osmo Pocket 4, Elgato Teleprompter',
      fuerTester: 'deine Kamera, prompter.txt aus sprechfassung',
      werkzeug: 'hand', werkzeugText: 'Handarbeit mit Playbook',
      befehle: [],
      beleg: 'README.md, substrate/playbooks/vor-der-kamera.md',
    },
    {
      id: 'broll', nr: 5, name: 'B-Roll', frage: 'Bildschirm aufnehmen',
      tester: 'nein', icon: 'monitor-play',
      chris: 'offen: Playwright, Computer Use oder Chrome-Extension',
      fuerTester: '',
      werkzeug: 'offen', werkzeugText: 'Vergleich läuft (Ticket 08)',
      befehle: [],
      beleg: '.scratch/yt-os/issues/08-broll-recorder-vergleich.md',
    },
    {
      id: 'schnitt', nr: 6, name: 'Schnitt und Ton', frage: 'Vom Rohtake zum Film',
      tester: 'nein', icon: 'scissors',
      chris: 'rough-cut lokal oder Descript-MCP, Ton über Cleanvoice',
      fuerTester: '',
      werkzeug: 'gebaut', werkzeugText: 'rough-cut gebaut, Werkzeug noch nicht gewählt',
      befehle: ['/rough-cut'],
      beleg: 'substrate/skills.md, Ticket 20 und 24',
    },
    {
      id: 'freigabe', nr: 7, name: 'Publish-Gate', frage: 'Darf das raus?',
      tester: 'ja', icon: 'shield-check',
      chris: 'Hook publish-gate.sh fragt nach, Chris gibt frei',
      fuerTester: 'derselbe Hook, du gibst frei',
      werkzeug: 'gebaut', werkzeugText: 'Hook aktiv, Upload-Paket fehlt',
      befehle: [],
      beleg: 'rules/never.md, .claude/hooks/publish-gate.sh',
    },
    {
      id: 'upload', nr: 8, name: 'Upload', frage: 'Auf YouTube',
      tester: 'nein', icon: 'upload',
      chris: 'von Hand in YouTube Studio',
      fuerTester: '',
      werkzeug: 'hand', werkzeugText: 'von Hand, Upload-Skill offen (Ticket 22)',
      befehle: [],
      beleg: 'tools.md, Ticket 22',
    },
  ],

  // Status pro Stufe: fertig | laeuft | wartet (auf deine Entscheidung) | offen | geplant
  videos: [
    {
      nr: '01', slug: '01-stufenleiter', ordner: 'videos/01-stufenleiter',
      titel: 'Vom Fragensteller zum Chef',
      untertitel: 'Die 6 Stufen, Claude zu nutzen',
      kernaussage: 'Gleiches Tool, gleicher Preis. Der Unterschied liegt in der Stufe, auf der du stehst.', // brief.md
      laufzeitZiel: '10 bis 12 Minuten', // brief.md
      online: '10.10. (Tag 16)', // roadmap.md
      aktuell: 'schnitt',
      parallel: ['packaging'],
      bild: '../videos/01-stufenleiter/thumbnails/2026-10-01/1945-versu1-v11.jpg',
      bildHinweis: 'Arbeitsstand, noch nicht gewählt',
      stufen: {
        outlier: {
          status: 'fertig', wann: '28.09.',
          kurz: 'von Hand, Titel-Builder mit 39 Outliern',
          text: 'Für Video 1 von Hand. Der Titel-Builder hat Muster aus 39 Outliern der letzten 90 Tage gezogen (30 englisch, 9 deutsch), ab 3x Kanal-Median.',
          beleg: ['README.md', 'videos/01-stufenleiter/titel-varianten.md'],
          luecke: 'Welche zwei Videos das Skript gemischt hat, steht nicht im Repo. skript.md sagt nur: „Mix aus zwei englischen Claude-Überblicksvideos“.',
        },
        skript: {
          status: 'fertig', wann: '01.10.',
          kurz: 'Sprechfassung, Prompter in 10 Blöcken',
          text: 'V2 Sprechfassung mit 2.393 Wörtern. Markierter Teleprompter-Text in 10 Blöcken. Entstand vor der Skript-Kette, deshalb gibt es keine Dateien v1 bis v4.',
          beleg: ['videos/01-stufenleiter/skript.md', 'videos/01-stufenleiter/prompter.txt'],
        },
        packaging: {
          status: 'wartet', wann: 'seit 01.10.',
          kurz: '3 Paare für Test & Compare wählen',
          text: '5 Titel-Varianten (E gestrichen), 78 Thumbnail-Entwürfe aus 26 Läufen. Empfehlung steht, du wählst drei Entwürfe, einer davon ohne Gesicht.',
          beleg: ['videos/01-stufenleiter/packaging.md', 'videos/01-stufenleiter/thumbnails/README.md'],
          ticket: '09',
        },
        dreh: {
          status: 'fertig', wann: '27.09.',
          kurz: 'Haupt-Take 23:38 in 4K',
          text: 'Gedreht am 27.09. um 16:04 mit der DJI Osmo Pocket 4. Haupt-Take 23:38 min, dazu 6 kurze Clips. Rohmaterial bleibt lokal.',
          beleg: ['videos/01-stufenleiter/dreh-log.md'],
        },
        broll: {
          status: 'offen', wann: 'ab heute',
          kurz: 'Dreifach-Vergleich startet',
          text: 'Dieselbe Stelle per Playwright, Computer Use und Chrome-Extension. Laut Roadmap startet der Vergleich heute, du wählst am 03.10.',
          beleg: ['.scratch/yt-os/issues/08-broll-recorder-vergleich.md', '.scratch/yt-os/roadmap.md'],
          ticket: '08',
        },
        schnitt: {
          status: 'wartet', wann: 'seit 01.10.',
          kurz: 'anhören und Werkzeug wählen',
          text: 'Drei Fassungen liegen lokal: rough-cut 10:29,6, Descript-MCP 10:06,0 und die Mischung mit Langform-Pausen 11:05,1. Dazu eine mildere Cleanvoice-Tonspur. Offen ist deine Hörabnahme.',
          beleg: ['.scratch/yt-os/issues/20-schnitt-test.md', '.scratch/yt-os/issues/24-ton-und-untertitel.md'],
          ticket: '20',
        },
        freigabe: {
          status: 'offen', wann: '08.10.',
          kurz: 'Upload-Paket fehlt',
          text: 'Das Gate braucht ein komplettes Upload-Paket: 3 Titel, Thumbnail, Beschreibung, Kapitel, Tags, CTA-Link.',
          beleg: ['.scratch/yt-os/issues/22-upload-stufe.md', '.scratch/yt-os/issues/21-cta-gumroad-os-coach.md'],
          ticket: '22',
        },
        upload: {
          status: 'geplant', wann: '09.10.',
          kurz: 'privat 09.10., öffentlich 10.10.',
          text: 'Von Hand in YouTube Studio, zuerst auf „privat“. Am 10.10. auf „öffentlich“.',
          beleg: ['.scratch/yt-os/roadmap.md'],
        },
      },
      naechster: {
        was: 'Schnitt anhören und das Werkzeug festlegen',
        warum: 'Davon hängen B-Roll, Grafiken und Upload ab. Laut Roadmap fällt die Entscheidung heute.',
        dauer: 'etwa 11 Minuten anhören',
        ticket: '20',
        schritte: [
          { label: 'Ordner mit den Fassungen öffnen', befehl: '! open private/video-01/schnitt-final/' },
          { label: 'Danach in Claude Code', befehl: 'Ticket 20: Ich habe angehört und nehme für Video 1 die Fassung <lokal, Descript oder Mischung>. Trag die Entscheidung in die Map ein.' },
        ],
      },
    },
    {
      nr: '02', slug: '02-claude-design', ordner: 'videos/02-claude-design',
      titel: 'Ohne Designer professionell wirken',
      untertitel: 'mit Claude Design',
      kernaussage: null,
      laufzeitZiel: null,
      online: null,
      dreh: '17.10. (Tag 23)', // roadmap.md
      aktuell: 'skript',
      parallel: [],
      bild: null,
      stufen: {
        outlier: {
          status: 'laeuft', wann: '28.09.',
          kurz: '3 Outlier, Thema noch nicht fest',
          text: 'Drei Outlier aus dem Poppy-Board. Laut Ticket 23 kommt das Thema am 11.10. aus einem neuen Signal-Room-Lauf, dieser Entwurf bleibt als Kandidat im Topf.',
          beleg: ['videos/02-claude-design/skript-poppy.md', '.scratch/yt-os/issues/23-video-2.md'],
          ticket: '23',
        },
        skript: {
          status: 'laeuft', wann: '28.09.',
          kurz: 'Poppy-Entwurf, nicht über die Kette',
          text: 'Entwurf aus Poppy mit 1.294 Wörtern und 3 B-Roll-Stellen, unverändert übernommen. Ohne packaging.md fängt die Skript-Kette bei skript-partner an.',
          beleg: ['videos/02-claude-design/skript-poppy.md', '.claude/skills/skript-partner/SKILL.md'],
        },
        packaging: { status: 'offen', kurz: 'nach dem Skript' },
        dreh: { status: 'geplant', wann: '17.10.', kurz: 'Dreh am 17.10.' },
        broll: { status: 'offen', kurz: '' },
        schnitt: { status: 'offen', kurz: '' },
        freigabe: { status: 'offen', kurz: '' },
        upload: { status: 'offen', kurz: '', luecke: 'Kein Upload-Termin in der Roadmap.' },
      },
      naechster: {
        was: 'Skript-Interview starten',
        warum: 'Im Ordner liegt keine packaging.md. skript-partner klärt zuerst Versprechen, Thumbnail-Satz, Titel und Hook.',
        dauer: 'laut Roadmap ab 11.10.',
        ticket: '23',
        schritte: [
          { label: 'In Claude Code', befehl: '/skript-partner videos/02-claude-design' },
        ],
      },
    },
  ],

  // titel-varianten.md "Angeregt von" und "Nächster deutscher Outlier"
  outlierV1: [
    { id: 'Zs3faMCDYNs', titel: 'Turn Claude Code Into Your AI Operating System (4 Layers)', kanal: 'Pav Rusovs | Automation Orbit', faktor: '133,4x', aufrufe: '69.498', sprache: 'EN', titelVar: ['A', 'C'] },
    { id: '9oJySubZRSA', titel: 'The Ultimate Beginner’s Guide to Claude AI', kanal: 'Metics Media', faktor: '99,8x', aufrufe: '1.067.108', sprache: 'EN', titelVar: ['A', 'D'] },
    { id: '6lc-ZY4tzl4', titel: 'Claude AI Tutorial for Beginners (2026), Step-by-Step Guide', kanal: 'Webbyfans Tech Ai Pro', faktor: '51,0x', aufrufe: '22.869', sprache: 'EN', titelVar: ['D'] },
    { id: 'GQjVGFYei9M', titel: 'Secret to 10x productivity with AI agents: Why most companies fail | DHH and Lex Fridman', kanal: 'Lex Clips', faktor: '21,3x', aufrufe: '245.608', sprache: 'EN', titelVar: ['B'] },
    { id: '7ReHiROdPbE', titel: 'Build Your First AI Agent in 10 Minutes, No Coding', kanal: 'The Tech Girl', faktor: '15,6x', aufrufe: '419.990', sprache: 'EN', titelVar: ['E'] },
    { id: 'x_ST4jvZk_A', titel: 'Introducing warmwind OS: The World’s First AI Operating System', kanal: 'warmwind', faktor: '9,7x', aufrufe: '73.597', sprache: 'EN', titelVar: ['C'] },
    { id: 'icM0ewXGvAw', titel: '19 Claude Code Mistakes "Pro" Users Are Still Making', kanal: 'Simon Scrapes', faktor: '7,6x', aufrufe: '121.557', sprache: 'EN', titelVar: ['B'] },
    { id: 'sAQdRSqXxXQ', titel: 'Claude nutzen wie die Top 1 %: Schritt-für-Schritt-Anleitung', kanal: 'Doppelter Espresso mit Torben Platzer', faktor: '6,5x', aufrufe: null, sprache: 'DE', titelVar: ['B', 'E'] },
    { id: 'CenkPFVn-vo', titel: 'Jev: Das kann das KI-Modell wirklich (10 Use Cases)', kanal: 'Julian Ivanov | KI-Automatisierung', faktor: '3,8x', aufrufe: null, sprache: 'DE', titelVar: ['A'] },
  ],

  // skript-poppy.md Frontmatter "outlier:". Titel der Videos stehen nicht im Repo.
  outlierV2: [
    { id: 'WMnk1LFBMqA', titel: null, kanal: 'Peter Yang', faktor: '3,6x' },
    { id: 'y2n1NMrMNBo', titel: null, kanal: 'Mikey Website', faktor: '3,0x' },
    { id: 'dVu9A5n2Osw', titel: null, kanal: 'Tristen O’Brien', faktor: 'Themenanker' },
  ],

  // prompter.txt, Zeilen mit "▶ BLOCK"
  prompterBloecke: ['Hook', 'Kurz zu mir', 'Stufe eins', 'Stufe zwei', 'Stufe drei', 'Stufe vier', 'Stufe fünf', 'Stufe sechs', 'Mein System', 'Call to Action'],

  // titel-varianten.md (Muster, Länge) und packaging.md (Paare, Persona-Median, Urteil)
  titel: [
    { key: 'A', text: 'Die 6 Stufen, mit denen Claude wirklich für dich arbeitet', laenge: 57, muster: 'Stufen, Zahl und Liste', beleg: '„Zahl und Liste“ 37,9x, „Stufen“ 15,6x', paar: 'P4', median: 3, urteil: 'Test' },
    { key: 'B', text: 'Claude nur als Chat nutzen? Dann verschenkst du fast alles', laenge: 58, muster: 'Warnung, Frage', beleg: '„Warnung“ 8,7x, „Frage“ 8,5x', paar: 'P2', median: 4, urteil: 'Test' },
    { key: 'C', text: 'Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser', laenge: 57, muster: 'Stufen', beleg: '„Stufen“ 15,6x', paar: 'P5', median: 3, urteil: 'Veto, Chris nimmt es trotzdem' },
    { key: 'D', text: 'Claude für Anfänger: Erst fragen, dann Arbeit abgeben', laenge: 53, muster: 'Einsteiger und Kurs', beleg: '„Einsteiger und Kurs“ 10,7x', paar: 'P3', median: 3, urteil: 'Thumbnail von Chris abgelehnt' },
    { key: 'E', text: 'Du brauchst keinen Entwickler, um Claude wie ein System zu nutzen', laenge: 65, muster: 'keines erkannt', beleg: 'kein Beleg', paar: null, median: null, urteil: 'gestrichen', gestrichen: true },
  ],

  // packaging.md, Abschnitt "Versuchsreihe 01.10.", Empfehlung für Test & Compare.
  // Zuordnung zur Datei über die Bildbeschreibung im selben Abschnitt.
  empfehlungThumbs: [
    { f: '2026-10-01/1945-versu1-v11.jpg', titel: 'B', warum: '„Gleiches Abo.“ im Stil von Liam, zerbrochene gegen leuchtende Kachel. Zuerst hochladen.' },
    { f: '2026-10-01/1945-versu1-v09.jpg', titel: 'A', warum: '„Wo stehst du?“ im Stil von Tristens Icon-Bogen.' },
    { f: '2026-10-01/1945-versu1-v08.jpg', titel: 'C', warum: '„6 Stufen“ ohne Gesicht, große Zahl und Neon-Raster.' },
  ],

  // Schnitt-Fassungen: Ticket 20, Kommentare vom 29.09. und 01.10.
  schnittFassungen: [
    {
      key: 'lokal', name: 'rough-cut lokal', datum: '29.09.',
      dauer: '10:29,6', format: '4K H.264', pausen: '0,1 s (Reel-Regel, inzwischen verworfen)',
      tempo: null, kosten: '0 €', rechenzeit: 'knapp 24 min',
      plus: 'Gegenprobe mit Whisper: kein Wort zu viel oder zu wenig',
      minus: '9 knappe Nähte zum Anhören',
      ordner: 'private/video-01/schnitt-lokal/',
    },
    {
      key: 'descript', name: 'Descript-MCP mit Underlord', datum: '01.10.',
      dauer: '10:06,0', format: '1080p-Projekt', pausen: 'ab 0,2 s auf 0,1 s gekürzt',
      tempo: null, kosten: 'rund 50 AI-Credits', rechenzeit: 'knapp 5 min',
      plus: '99,1 % gleicher Wortlaut wie lokal',
      minus: 'ein Satzanfang fehlte, 189 von 218 Schnittenden kappen den Ausklang',
      ordner: 'private/video-01/schnitt-descript/mcp/',
    },
    {
      key: 'mischung', name: 'Mischung: Descript-Wortwahl, Pausen lokal', datum: '01.10.',
      dauer: '11:05,1', format: '4K aus dem Original', pausen: 'Langform: 0,3 / 0,5 / 0,8 s',
      tempo: '197 statt vorher 207 Wörter pro Minute', kosten: '0 €', rechenzeit: 'Render 6:30 min',
      plus: 'deine Satzanfang-Korrektur drin, Schnittenden per Pegelkurve gesichert',
      minus: 'noch nicht angehört',
      ordner: 'private/video-01/schnitt-final/',
    },
  ],

  // Ticket 24, Kommentare vom 01.10.
  tonFassungen: [
    { key: 'original', name: 'Original-Ton der Schnittfassung', text: 'Mikro war beim Dreh nicht richtig eingestellt, der Ton ist schwach.', status: 'Vergleich' },
    { key: 'cv1', name: 'Cleanvoice, erste Fassung', text: 'Rauschentfernung, Studio Sound, Normalisierung.', status: 'abgelehnt', notiz: 'Klang dir künstlich.' },
    { key: 'cv2', name: 'Cleanvoice, mild', text: 'Nur Rauschentfernung und Normalisierung. Gleiche Länge, Versatz ausgeglichen, 0 €.', status: 'bereit', notiz: 'Wartet auf deine Hörfreigabe.' },
  ],

  // git log -8 auf master
  commits: [
    { h: '8fc1c58', wann: '02.10. 00:10', text: 'Ticket 09: JSON-Prompts nachgeprüft, Ursache und fairer Neu-Test' },
    { h: '5857817', wann: '01.10. 22:56', text: 'Tag 7: alle 78 Thumbnail-Entwürfe für Video 1 als Nachweis im Repo' },
    { h: 'bc4fc47', wann: '01.10. 22:53', text: 'Langform-Pausen statt Reel-Regel, Teleprompter-Playbook und markierter Prompter-Text für Video 1' },
    { h: '46c122d', wann: '01.10. 22:25', text: 'Tag 7: Tageslog 01.10. und Stand in memory.md' },
    { h: '80249ac', wann: '01.10. 22:08', text: 'Ticket 20: Rohschnitt über den Descript-MCP mit Underlord dokumentiert' },
  ],

  // Skills, die ein Nutzer kopieren kann. stand: master | branch | fehlt
  skills: [
    { cmd: '/skript-partner', arg: '[ordner]', was: 'Interview: Versprechen, Thumbnail-Satz, Titel, Hook', stufe: 'skript', stand: 'master', tester: true },
    { cmd: '/skript-mix', arg: '<ordner> [urls]', was: 'v1: Mix aus 3 bis 5 Outliern', stufe: 'skript', stand: 'master', tester: true },
    { cmd: '/skript-anreichern', arg: '<ordner> v2|v3', was: 'v2 Community und Faktencheck, v3 Beispiele', stufe: 'skript', stand: 'master', tester: true },
    { cmd: '/sprechfassung', arg: '<ordner>', was: 'Hybrid, Wort für Wort und Prompter-Text', stufe: 'skript', stand: 'master', tester: true },
    { cmd: '/text-check', arg: '<ordner>', was: 'Prüftor: KI-Klang, Vorlesetest', stufe: 'skript', stand: 'master', tester: true },
    { cmd: '/thumbnail-lab', arg: '"<titel>"', was: 'Vorlagen zerlegen, remixen, beste drei', stufe: 'packaging', stand: 'branch', tester: true },
    { cmd: '/rough-cut', arg: '<private/video-NN> <rohtake>', was: 'Rohschnitt aus Transkript mit Zeitstempeln', stufe: 'schnitt', stand: 'master', tester: false },
  ],

  // Neuer Tester: frisch geklont, videos/ leer.
  tester: {
    schritte: [
      {
        id: 'hooks', titel: 'Schutz einschalten', dauer: 'ein Befehl im Terminal',
        text: 'Ein Befehl, danach blockiert der Git-Guard Videos, Transkripte und Schlüssel vor jedem Commit.',
        befehl: 'git config core.hooksPath .githooks', // AGENTS.md
        beleg: 'AGENTS.md',
      },
      {
        id: 'kanal', titel: 'Deinen Kanal beschreiben', dauer: 'Interview in Claude Code',
        text: 'Claude Code fragt dich aus und schreibt identity.md neu: wer du bist, für wen, wie du klingst.',
        befehl: 'Lies identity.md. Schreib sie für meinen Kanal neu und frag mich dazu aus, eine Frage pro Nachricht.',
        fehltSkill: '/kanal-einrichten',
        beleg: 'identity.md',
      },
      {
        id: 'video', titel: 'Erstes Video mit Outliern starten', dauer: 'skript-partner',
        text: 'Füg 3 bis 5 YouTube-Links ein, die in deiner Nische gerade gut laufen. skript-partner legt den Ordner an und holt die Transkripte.',
        beleg: '.claude/skills/skript-partner/SKILL.md',
      },
    ],
    // Weg (b): eigener YouTube-Schlüssel. Kein Skill im Repo.
    schluessel: {
      fehltSkill: '/outlier-suche',
      zeile: 'export YOUTUBE_API_KEY="dein-schlüssel"',
      datei: '~/.zshrc',
      text: 'Outlier nach Kanal-Median wie im Signal Room: Suchbegriffe, Kanäle, Median der letzten 30 Longform-Videos, ab 3x.',
      guard: 'Landet der Schlüssel doch in einer Datei im Repo, blockiert der Git-Guard den Commit.',
    },
    beispielLinks: [],
  },

  // Für die Quellen-Liste in der Leiste
  quellen: [
    ['identity.md, rules/', 'Ziel, Stimme, Grenzen'],
    ['memory.md', 'nächste Aktion Tag 8, Entscheidungen'],
    ['README.md, tools.md', 'Stufen, Werkzeuge, Log'],
    ['substrate/skills.md', 'Skills und Befehle'],
    ['.scratch/yt-os/roadmap.md', 'Tage, Termine, Meilensteine'],
    ['.scratch/yt-os/issues/08, 09, 20, 21, 22, 23, 24', 'offene Tickets'],
    ['videos/01-stufenleiter/*.md', 'Brief, Skript, Dreh-Log, Titel, Packaging'],
    ['videos/01-stufenleiter/prompter.txt', 'Block-Namen, Wortzahl'],
    ['videos/01-stufenleiter/thumbnails/', '78 Entwürfe, Läufe, Texte'],
    ['videos/02-claude-design/skript-poppy.md', 'Video 2: Titel, Outlier, Wortzahl'],
    ['.claude/skills/skript-partner/SKILL.md', 'Ordner-Regel, nächster Schritt'],
    ['Branch skill/thumbnail-lab', 'Skill für Tester'],
    ['git log', 'letzte Commits'],
  ],

  // thumbnails/README.md, per Skript geparst (78 Einträge)
  thumbs: [{"f":"2026-09-28/2000-3wqmu5-v01.jpg","run":"run-20260928T200008Z-3wqmu5","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Curiosity Gap","text":"Welche der 6 Stufen?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-28/2000-3wqmu5-v02.jpg","run":"run-20260928T200008Z-3wqmu5","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Transformation","text":"Vom Chat zum KI-Chef","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-28/2000-3wqmu5-v03.jpg","run":"run-20260928T200008Z-3wqmu5","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Bold Claim","text":"Claude arbeitet ohne dich","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-28/2005-01vtr9-v01.jpg","run":"run-20260928T200559Z-01vtr9","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Neugier: Eigene Stufe erkennen","text":"STUFE 1 ODER 6?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-28/2005-01vtr9-v02.jpg","run":"run-20260928T200559Z-01vtr9","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Transformation: Vom Reden zum Führen","text":"VON CHAT ZUM CHEF","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-28/2005-01vtr9-v03.jpg","run":"run-20260928T200559Z-01vtr9","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Bold Claim: Die Abbruchstelle","text":"DIE MEISTEN STOPPEN HIER","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v01.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Gleicher Preis, mehr Leistung","text":"Mehr fürs gleiche Geld","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v02.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Das eigene Team","text":"Dein neues Team","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v03.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Aus Werkzeugen wird Arbeit","text":"Das arbeitet mit.","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v05.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Die eigene Kommandozentrale","text":"Deine Zentrale","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v06.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Mitarbeiter statt Mailhilfe","text":"Dein digitaler Mitarbeiter","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v07.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Der unterschätzte Sprung","text":"Da geht mehr","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v08.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Das fertige Ergebnis","text":"Alles schon erledigt","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-29/2041-nxuljo-v09.jpg","run":"run-20260929T204135Z-nxuljo","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"Der Arbeitsmodus","text":"Arbeit läuft weiter","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-09-30/1458-mcdcv4-v01.jpg","run":"run-20260930T145823Z-mcdcv4","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"Selbsteinschätzung mit Stufenleiter","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1458-mcdcv4-v02.jpg","run":"run-20260930T145823Z-mcdcv4","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"Überraschung über Stufe eins","text":"Die meisten: Stufe 1","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1459-a53m48-v01.jpg","run":"run-20260930T145923Z-a53m48","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Gleicher Preis, mehr erledigt","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1459-a53m48-v02.jpg","run":"run-20260930T145923Z-a53m48","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Von der Mail zum Team","text":"Nur Mails?","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1500-jawc1n-v01.jpg","run":"run-20260930T150032Z-jawc1n","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"1. Stufe 6: Ganz oben angekommen","text":"Stufe 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1500-jawc1n-v02.jpg","run":"run-20260930T150032Z-jawc1n","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"2. Ganz oben: Die Kommandozentrale","text":"Ganz oben","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1501-6qohic-v01.jpg","run":"run-20260930T150136Z-6qohic","lauf":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben","var":"Vom Chat zum Mitarbeiter","text":"Chat Mitarbeiter","titel":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben"},
    {"f":"2026-09-30/1502-ve0h41-v01.jpg","run":"run-20260930T150257Z-ve0h41","lauf":"Du brauchst keinen Entwickler, um Claude wie ein System zu nutzen","var":"A: Mitarbeiter für 20 Euro?","text":"20 € = Mitarbeiter?","titel":"Du brauchst keinen Entwickler, um Claude wie ein System zu nutzen"},
    {"f":"2026-09-30/1502-ve0h41-v02.jpg","run":"run-20260930T150257Z-ve0h41","lauf":"Du brauchst keinen Entwickler, um Claude wie ein System zu nutzen","var":"B: Die Arbeit ist fertig","text":"Schon erledigt.","titel":"Du brauchst keinen Entwickler, um Claude wie ein System zu nutzen"},
    {"f":"2026-09-30/1512-dsn1fh-v01.jpg","run":"run-20260930T151235Z-dsn1fh","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"1. Dein Platz auf der Treppe","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1512-dsn1fh-v02.jpg","run":"run-20260930T151235Z-dsn1fh","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"2. Bei Stufe eins stehen geblieben","text":"Die meisten: Stufe 1","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1514-8da15w-v01.jpg","run":"run-20260930T151421Z-8da15w","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"1. Gleiches Abo, mehr Arbeit erledigt","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1514-8da15w-v03.jpg","run":"run-20260930T151421Z-8da15w","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"3. Vom Brief zum Team","text":"Nur Mails?","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1515-d9xmg0-v01.jpg","run":"run-20260930T151542Z-d9xmg0","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"1. Terrakotta mit Lächeln","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1515-d9xmg0-v02.jpg","run":"run-20260930T151542Z-d9xmg0","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"2. Creme mit Staunen","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1517-dbyrcx-v01.jpg","run":"run-20260930T151700Z-dbyrcx","lauf":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben","var":"Anthrazit mit großem Lachen","text":"Chat Mitarbeiter","titel":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben"},
    {"f":"2026-09-30/1517-dbyrcx-v02.jpg","run":"run-20260930T151700Z-dbyrcx","lauf":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben","var":"Creme mit freudigem Staunen","text":"Chat Mitarbeiter","titel":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben"},
    {"f":"2026-09-30/1523-prei80-v01.jpg","run":"run-20260930T152310Z-prei80","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"Terrakotta mit Zielstufe","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1523-prei80-v02.jpg","run":"run-20260930T152310Z-prei80","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"Sechs Stufen zum Ziel","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1530-a5zci8-v01.jpg","run":"run-20260930T153035Z-a5zci8","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Creme: Gleicher Preis, mehr Arbeit abgenommen","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1530-a5zci8-v02.jpg","run":"run-20260930T153035Z-a5zci8","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Anthrazit: Gleicher Preis, stärkerer Kontrast","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1540-final4-v01.jpg","run":"run-20260930T154000Z-final4","lauf":"Video 1 Finalisten: 4 Paare aus Titel, Thumbnail und Hook","var":"P2 · Test Platz 1 (zuerst hochladen)","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1540-final4-v02.jpg","run":"run-20260930T154000Z-final4","lauf":"Video 1 Finalisten: 4 Paare aus Titel, Thumbnail und Hook","var":"P4 · Test Platz 2","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1540-final4-v03.jpg","run":"run-20260930T154000Z-final4","lauf":"Video 1 Finalisten: 4 Paare aus Titel, Thumbnail und Hook","var":"P3 · Test Platz 3","text":"Chat Mitarbeiter","titel":"Claude für Anfänger: Erst fragen, dann Arbeit abgeben"},
    {"f":"2026-09-30/1540-final4-v04.jpg","run":"run-20260930T154000Z-final4","lauf":"Video 1 Finalisten: 4 Paare aus Titel, Thumbnail und Hook","var":"P5 · Reserve","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1558-wo0jtf-v01.jpg","run":"run-20260930T155846Z-wo0jtf","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"Dunkle Glastreppe","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1558-wo0jtf-v02.jpg","run":"run-20260930T155846Z-wo0jtf","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"Helle Produkttreppe","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1559-13hdwp-v01.jpg","run":"run-20260930T155959Z-13hdwp","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Dunkles Studio mit schwebenden Karten","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1559-13hdwp-v02.jpg","run":"run-20260930T155959Z-13hdwp","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Helles Studio mit Karten in den Händen","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1600-e391of-v01.jpg","run":"run-20260930T160054Z-e391of","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"Große Treppe zum Ergebnis","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1600-e391of-v02.jpg","run":"run-20260930T160054Z-e391of","lauf":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser","var":"Riesenwort über Chris","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1608-lkoiso-v01.jpg","run":"run-20260930T160820Z-lkoiso","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"1. Die weiße Treppe","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1608-lkoiso-v02.jpg","run":"run-20260930T160820Z-lkoiso","lauf":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet","var":"2. Die gläserne Treppe","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1609-6jgpnf-v01.jpg","run":"run-20260930T160919Z-6jgpnf","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Dunkles Studio, gleicher Preis","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1609-6jgpnf-v02.jpg","run":"run-20260930T160919Z-6jgpnf","lauf":"Claude nur als Chat nutzen? Dann verschenkst du fast alles","var":"Helles Studio, echtes Lachen","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1615-final5-v01.jpg","run":"run-20260930T161500Z-final5","lauf":"Video 1 Finalisten 2: deine drei Favoriten, hochwertig neu","var":"Gleiches Abo. · Liam-Stil","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-09-30/1615-final5-v02.jpg","run":"run-20260930T161500Z-final5","lauf":"Video 1 Finalisten 2: deine drei Favoriten, hochwertig neu","var":"Wo stehst du? · Creme","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1615-final5-v03.jpg","run":"run-20260930T161500Z-final5","lauf":"Video 1 Finalisten 2: deine drei Favoriten, hochwertig neu","var":"Wo stehst du? · Navy","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-09-30/1615-final5-v04.jpg","run":"run-20260930T161500Z-final5","lauf":"Video 1 Finalisten 2: deine drei Favoriten, hochwertig neu","var":"STUFE 6 · Treppe","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-09-30/1615-final5-v05.jpg","run":"run-20260930T161500Z-final5","lauf":"Video 1 Finalisten 2: deine drei Favoriten, hochwertig neu","var":"STUFE 6 · dein Favorit","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-10-01/1922-ll4cmf-v01.jpg","run":"run-20261001T192251Z-ll4cmf","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"1. Die nächste Stufe","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1922-ll4cmf-v02.jpg","run":"run-20261001T192251Z-ll4cmf","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"2. Sechs Entwicklungsstufen","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1922-ll4cmf-v03.jpg","run":"run-20261001T192251Z-ll4cmf","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"3. Ein Abo, zwei Nutzungen","text":"Gleiches Abo.","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1924-ggc996-v01.jpg","run":"run-20261001T192447Z-ggc996","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"1. Die Entwicklung","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1924-ggc996-v02.jpg","run":"run-20261001T192447Z-ggc996","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"2. Sechs Möglichkeiten","text":"6 Stufen","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1924-ggc996-v03.jpg","run":"run-20261001T192447Z-ggc996","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"3. Dein nächster Schritt","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1924-ggc996-v04.jpg","run":"run-20261001T192447Z-ggc996","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"4. Das Ziel vor Augen","text":"STUFE 6","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1924-ggc996-v05.jpg","run":"run-20261001T192447Z-ggc996","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"5. Derselbe Preis","text":"Gleiches Abo.","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1926-prosa1-v01.jpg","run":"run-20261001T192600Z-prosa1","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"1. Die nächste Stufe","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1926-prosa1-v02.jpg","run":"run-20261001T192600Z-prosa1","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"2. Sechs Entwicklungsstufen","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1926-prosa1-v03.jpg","run":"run-20261001T192600Z-prosa1","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"3. Ein Abo, zwei Nutzungen","text":"Gleiches Abo.","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1927-staun1-v01.jpg","run":"run-20261001T192700Z-staun1","lauf":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen","var":"1. Die nächste Stufe (staunend)","text":"Wo stehst du?","titel":"Vom Fragensteller zum Chef: Die 6 Stufen, Claude zu nutzen"},
    {"f":"2026-10-01/1945-versu1-v01.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V01 · mit Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v02.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V02 · mit Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v03.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V03 · ohne Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v04.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V04 · ohne Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v05.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V05 · mit Gesicht","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-10-01/1945-versu1-v06.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V06 · mit Gesicht","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-10-01/1945-versu1-v07.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V07 · ohne Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v08.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V08 · ohne Gesicht","text":"6 Stufen","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-10-01/1945-versu1-v09.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V09 · mit Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"},
    {"f":"2026-10-01/1945-versu1-v10.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V10 · mit Gesicht","text":"STUFE 6","titel":"Vom Chat zum KI-Betriebssystem: So nutzt du Claude besser"},
    {"f":"2026-10-01/1945-versu1-v11.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V11 · mit Gesicht","text":"Gleiches Abo.","titel":"Claude nur als Chat nutzen? Dann verschenkst du fast alles"},
    {"f":"2026-10-01/1945-versu1-v12.jpg","run":"run-20261001T194500Z-versu1","lauf":"Video 1 Versuchsreihe 01.10.: 12 Entwürfe, je ein Faktor variiert","var":"V12 · mit Gesicht","text":"Wo stehst du?","titel":"Die 6 Stufen, mit denen Claude wirklich für dich arbeitet"}],
};
