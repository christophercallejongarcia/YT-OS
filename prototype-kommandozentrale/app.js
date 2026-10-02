// PROTOTYP Kommandozentrale. Wegwerf-Code: kein Framework, keine Tests, nichts wird gespeichert.
// Vier Varianten (?variant=A..D), zwei Zustände (?state=chris | tester).
(() => {
const D = window.YTOS;
const REPO = 'https://github.com/christophercallejongarcia/YT-OS';
const THUMB_DIR = '../videos/01-stufenleiter/thumbnails/';
const TICKETS = {
  '08': '08-broll-recorder-vergleich.md', '09': '09-thumbnail-cover-lab.md', '20': '20-schnitt-test.md',
  '21': '21-cta-gumroad-os-coach.md', '22': '22-upload-stufe.md', '23': '23-video-2.md', '24': '24-ton-und-untertitel.md',
};

const VARIANTS = [
  { k: 'A', name: 'Pipeline-Board', render: () => renderA() },
  { k: 'B', name: 'Video-Akte', render: () => renderB() },
  { k: 'C', name: 'Entscheidungs-Tisch', render: () => renderC() },
  { k: 'D', name: 'Begleiter', render: () => renderD() },
];

const qs = new URLSearchParams(location.search);
const S = {
  variant: VARIANTS.some(v => v.k === (qs.get('variant') || '').toUpperCase()) ? qs.get('variant').toUpperCase() : 'A',
  state: qs.get('state') === 'tester' ? 'tester' : 'chris',
  akte: qs.get('video') === '02' ? '02' : '01',
  dec: qs.get('d') || null,
  pickAll: false,
  picks: [],
  choice: { schnitt: null, ton: null, haare: null, quelle: null },
  jetzt: 0,
  lastPasted: null,
  info: false,
  t: { titel: '', linksText: '', fuer: '', themen: '', stimme: '', weg: 'links', done: {} },
};

/* ---------------- kleine Helfer ---------------- */
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = (n, c = '') => `<i data-lucide="${n}" class="ic ${c}"></i>`;
const isTester = () => S.state === 'tester';
const V = nr => D.videos.find(v => v.nr === nr);
const stufe = id => D.stufen.find(s => s.id === id);
const STATUS = { fertig: 'erledigt', laeuft: 'läuft', wartet: 'wartet auf dich', offen: 'offen', geplant: 'geplant' };
const st = (s, label) => `<span class="st st--${s}"><i class="d"></i>${esc(label || STATUS[s])}</span>`;
const fileHref = p => p.startsWith('Branch ') ? `${REPO}/tree/${p.replace('Branch ', '')}` : '../' + p.replace(/\/\*\.md$/, '/');
const fileChip = p => `<a class="chip chip--file" href="${esc(fileHref(p))}" target="_blank" rel="noopener" title="Quelle öffnen">${ic('file-text')}${esc(p.split('/').pop() || p)}</a>`;
const belegChips = arr => (arr || []).flatMap(x => x.split(', ')).map(fileChip).join('');
const ticketChip = nr => nr ? `<a class="chip chip--ticket" href="../.scratch/yt-os/issues/${TICKETS[nr]}" target="_blank" rel="noopener">${ic('ticket')}Ticket ${nr}</a>` : '';
const gap = (txt, title = 'Fehlt in den Dateien') => `<div class="gap">${ic('circle-dashed')}<div><b>${esc(title)}.</b> ${esc(txt)}</div></div>`;
const tagGap = t => `<span class="tag-gap">${ic('circle-dashed', 'ic-s')}${esc(t)}</span>`;
const tagBranch = t => `<span class="tag-branch">${ic('git-branch', 'ic-s')}${esc(t)}</span>`;
const thumbSrc = f => THUMB_DIR + f;
const yt = id => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
const thumbBtn = (f, extra = '', alt = '') => `<button class="thumb thumb--btn" data-zoom="${esc(f)}" aria-label="Groß ansehen: ${esc(alt || f)}"><img loading="lazy" src="${esc(thumbSrc(f))}" alt="${esc(alt)}">${extra}</button>`;
const titleOf = key => D.titel.find(t => t.key === key);
const keyOfTitle = text => (D.titel.find(t => t.text === text) || {}).key || null;
const thumbMeta = f => D.thumbs.find(t => t.f === f) || {};
const faceOf = m => /ohne Gesicht/.test(m.var || '') ? 'ohne' : /mit Gesicht/.test(m.var || '') ? 'mit' : null;

function cmd(text, o = {}) {
  const cls = ['cmd', o.prompt ? 'cmd--prompt' : '', o.gap ? 'cmd--gap' : '', o.empty ? 'cmd--empty' : ''].join(' ');
  const label = o.label ? `<div class="cmd-label">${o.labelIcon ? ic(o.labelIcon, 'ic-s') : ''}${esc(o.label)}${o.tag || ''}</div>` : '';
  return `<div class="cmd-wrap">${label}<div class="${cls}" ${o.out ? `data-out="${o.out}"` : ''}>
    <div class="cmd-body">${esc(text)}</div>
    <button class="cmd-copy" data-copy title="Kopieren" aria-label="Befehl kopieren">${ic('copy', 'i-copy')}${ic('check', 'i-ok')}</button>
  </div>${o.gapNote ? `<div class="hint" style="margin-top:6px;color:var(--gap-ochre)">${esc(o.gapNote)}</div>` : ''}</div>`;
}

const slugify = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').split('-').slice(0, 4).join('-');
const LINK_RE = /(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]{6,}[^\s]*/g;
const links = () => (S.t.linksText.match(LINK_RE) || []).map(l => l.startsWith('http') ? l : 'https://' + l);
const ordner = () => `videos/01-${slugify(S.t.titel) || 'dein-thema'}`;

/* Befehle, die aus Eingaben entstehen. Werden live in [data-out] geschrieben. */
const OUT = {
  start: () => {
    const l = links();
    return `/skript-partner ${ordner()}` + (l.length ? '\n' + l.join('\n') : '\n<hier deine 3 bis 5 Links>');
  },
  kanal: () => {
    const parts = [['Für wen', S.t.fuer], ['Themen', S.t.themen], ['So klinge ich', S.t.stimme]].filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim().replace(/[.!?]+$/, '')}.`);
    return `Lies identity.md und schreib sie für meinen Kanal neu.${parts.length ? ' ' + parts.join(' ') : ''} Frag nach, was noch fehlt, eine Frage pro Nachricht.`;
  },
  thumb: () => `/thumbnail-lab "${S.t.titel || 'Titel deines Videos'}"`,
  paare: () => {
    if (!S.picks.length) return 'Wähl links bis zu drei Entwürfe, in der Reihenfolge, in der sie hochgeladen werden.';
    const lines = S.picks.map((f, i) => {
      const k = keyOfTitle(thumbMeta(f).titel); const t = titleOf(k);
      return `${i + 1}. ${f.split('/').pop()} mit Titel ${k || '?'}${t ? ` „${t.text}“` : ''}`;
    });
    return `Ticket 09: Für Test & Compare nehme ich diese Reihenfolge:\n${lines.join('\n')}\nTrag das in videos/01-stufenleiter/packaging.md unter „Empfehlung“ ein und notier es im Ticket.`;
  },
  schnitt: () => {
    const c = D.schnittFassungen.find(x => x.key === S.choice.schnitt);
    return c ? `Ticket 20: Ich habe angehört und nehme „${c.name}“ (${c.dauer}) für Video 1. Trag die Entscheidung in die Map ein und notier sie im Ticket.` : 'Wähl eine Fassung, dann steht hier der Satz für Claude Code.';
  },
  ton: () => {
    const c = D.tonFassungen.find(x => x.key === S.choice.ton);
    return c ? `Ticket 24: Ton für Video 1 ist „${c.name}“. Notier meine Hörfreigabe im Ticket.` : 'Wähl eine Fassung, dann steht hier der Satz für Claude Code.';
  },
  haare: () => S.choice.haare ? `Ticket 09: Wiedererkennbarkeit: ${S.choice.haare === 'ok' ? 'Haare und Haaransatz stören mich nicht.' : 'Haare wirken zu voll und der Haaransatz zu tief. Beim nächsten Lauf näher an die Fotos.'} Notier das in packaging.md unter „Offen für Chris“.` : 'Wähl eine Antwort, dann steht hier der Satz für Claude Code.',
};
const OUT_HTML = {
  ordner: () => `Ordner: <b class="mono">${esc(ordner())}/</b>`,
  linkcount: () => {
    const n = links().length;
    if (!n) return 'Ein Link pro Zeile. Noch keiner erkannt.';
    if (n < 3) return `<b>${n} ${n === 1 ? 'Link' : 'Links'} erkannt.</b> Mindestens 3, damit der Mix trägt.`;
    if (n > 5) return `<b>${n} Links erkannt.</b> Mehr als 5 macht das Skript beliebig, nimm die stärksten.`;
    return `<b style="color:var(--done)">${n} Links erkannt.</b> Passt.`;
  },
  slots: () => slotsHtml(),
  rule: () => ruleHtml(),
};
function refreshOutputs() {
  document.querySelectorAll('[data-out]').forEach(el => {
    const f = OUT[el.dataset.out]; if (!f) return;
    const body = el.querySelector('.cmd-body'); const v = f();
    if (body.textContent !== v) body.textContent = v;
    el.classList.toggle('cmd--empty', /^Wähl /.test(v));
  });
  document.querySelectorAll('[data-out-html]').forEach(el => {
    const f = OUT_HTML[el.dataset.outHtml]; if (f) el.innerHTML = f();
  });
  icons();
}

const brandMark = `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="10" width="4" height="5" rx="1"/><rect x="6" y="6" width="4" height="9" rx="1"/><rect x="11" y="1.5" width="4" height="13.5" rx="1"/></svg></span>`;
const brand = (sub) => `<div class="brand">${brandMark}<div><div class="brand-name">YT-OS</div><div class="brand-sub">${esc(sub || 'Kommandozentrale')}</div></div></div>`;
const segs = v => `<div class="segs" aria-label="Fortschritt">${D.stufen.map(s => `<i class="s-${(v.stufen[s.id] || {}).status}" title="${esc(s.name)}: ${esc(STATUS[(v.stufen[s.id] || {}).status] || '')}"></i>`).join('')}</div>`;
const toolIcon = { fehlt: 'circle-dashed', branch: 'git-branch', gebaut: 'check', hand: 'hand', offen: 'circle-help' };

/* =====================================================================
   A  Pipeline-Board: Spalten = Stufen, Karten = Videos
   ===================================================================== */
function rail() {
  const W = 100; const x = tag => ((tag - 1) / 29) * W;
  const lbl = [8, 16, 30];
  return `<div class="rail" aria-label="Zeitleiste der Challenge">
    <div class="rail-track"><div class="rail-line"></div><div class="rail-done" style="width:${x(D.stand.tag)}%"></div>
      ${D.meilensteine.map(m => `<span class="rail-pt ${m.gross ? 'is-gross' : ''} ${m.tag === D.stand.tag ? 'is-heute' : ''}" style="left:${x(m.tag)}%" title="Tag ${m.tag}, ${m.datum}: ${esc(m.was)}"></span>`).join('')}
    </div>
    <div class="rail-lbls">${D.meilensteine.filter(m => lbl.includes(m.tag)).map(m => {
      const left = x(m.tag); const tr = m.tag === 30 ? 'translateX(-100%);text-align:right' : '';
      return `<span class="rail-lbl ${m.tag === D.stand.tag ? 'is-heute' : ''}" style="left:${left}%;${tr ? 'transform:' + tr : ''}"><b>${m.tag === D.stand.tag ? 'Heute, Tag 8' : esc(m.was)}</b>${m.datum}</span>`;
    }).join('')}</div>
  </div>`;
}

function bigCard(v) {
  const n = v.naechster; const s = v.stufen[v.aktuell];
  const img = v.bild
    ? `<div class="thumb"><img src="${esc(v.bild)}" alt=""><span class="img-note">${esc(v.bildHinweis)}</span></div>`
    : `<div class="thumb" style="display:grid;place-items:center;border:1px dashed var(--line-2);background:transparent;color:var(--ink-4);font-size:12px">noch kein Thumbnail</div>`;
  const hot = s.status === 'wartet';
  return `<article class="card">
    ${img}
    <div><div class="card-h"><span class="card-nr">${v.nr}</span><h3>${esc(v.titel)}</h3></div><div class="sub">${esc(v.untertitel)}</div></div>
    ${segs(v)}
    <div class="card-do" ${hot ? '' : 'style="background:var(--bg-3);border-color:var(--line-2)"'}>
      <b ${hot ? '' : 'style="color:var(--ink)"'}>${hot ? 'Wartet auf dich: ' : 'Nächster Schritt: '}${esc(n.was)}</b>
      <span ${hot ? '' : 'style="color:var(--ink-2)"'}>${esc(n.dauer)}</span>
    </div>
    ${cmd(n.schritte[0].befehl)}
    <div class="card-meta">${ticketChip(n.ticket)}<a class="chip" href="?variant=B&state=chris&video=${v.nr}">${ic('arrow-right')}Akte</a></div>
  </article>`;
}

function parallelCard(v, sid) {
  const s = v.stufen[sid];
  const recs = sid === 'packaging' ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">${D.empfehlungThumbs.map(r => thumbBtn(r.f, '', 'Empfehlung')).join('')}</div>` : '';
  return `<div class="card" style="gap:8px">
    <div class="row row--wartet" style="padding:0;border:0;background:none">${ic('circle-dot')}<span class="nr">${v.nr}</span><span class="txt" style="white-space:normal;color:var(--accent-2);font-weight:650">${esc(s.kurz)}</span></div>
    ${recs}
    <div class="hint">${esc(s.text)}</div>
    <div class="card-meta">${ticketChip(s.ticket)}</div>
  </div>`;
}

function slimRow(v, sid) {
  const s = v.stufen[sid]; if (!s) return '';
  const icon = { fertig: 'check', laeuft: 'loader', wartet: 'circle-dot', offen: 'circle-dashed', geplant: 'calendar' }[s.status];
  const txt = s.kurz || STATUS[s.status];
  return `<div class="row row--${s.status}" title="${esc(s.text || '')}">${ic(icon, 'ic-s')}<span class="nr">${v.nr}</span><span class="txt">${esc(txt)}${s.wann && s.status !== 'offen' && !txt.includes(s.wann) ? ` · ${esc(s.wann)}` : ''}</span></div>`;
}

function startCard() {
  return `<div class="start">
    <div><h3>Dein erstes Video</h3><p style="margin-top:6px">Füg 3 bis 5 YouTube-Links ein, die in deiner Nische gerade gut laufen. Daraus baut skript-partner mit dir das Skript.</p></div>
    <div class="field"><label for="f-titel">Arbeitstitel <span>darf noch wackeln</span></label>
      <input id="f-titel" class="inp" data-bind="titel" value="${esc(S.t.titel)}" placeholder="z. B. Claude für Steuerberater">
      <div class="hint" data-out-html="ordner">${OUT_HTML.ordner()}</div></div>
    <div class="field"><label for="f-links">Outlier-Links <span>3 bis 5</span></label>
      <textarea id="f-links" class="inp mono" rows="4" data-bind="linksText" placeholder="https://www.youtube.com/watch?v=…">${esc(S.t.linksText)}</textarea>
      <div class="hint" data-out-html="linkcount">${OUT_HTML.linkcount()}</div></div>
    ${cmd(OUT.start(), { out: 'start', label: 'In Claude Code einfügen', labelIcon: 'terminal' })}
    <div class="or">oder</div>
    ${keyAlt(true)}
  </div>`;
}

function keyAlt(compact) {
  const k = D.tester.schluessel;
  return `<div class="alt">
    <h4><span style="display:flex;gap:8px;align-items:center">${ic('key-round')}Eigener YouTube-Schlüssel</span>${tagGap('Skill fehlt')}</h4>
    <p>${esc(k.text)}</p>
    ${compact ? '' : cmd(k.zeile, { label: `Einmal in ${k.datei}, nie in den Ordner`, labelIcon: 'lock' })}
    ${cmd(`${k.fehltSkill} "dein Thema"`, { gap: true, label: 'Befehl, sobald der Skill existiert' })}
    <div class="hint">${ic('shield-check', 'ic-s')} ${esc(k.guard)}</div>
  </div>`;
}

function setupStrip() {
  const [h, k] = D.tester.schritte;
  return `<div class="setup-strip">
    <div class="ss-h"><b>Einmal einrichten</b><span class="faint" style="font-size:12.5px">frisch geklont, zwei Schritte</span></div>
    <div class="ss-step"><span class="n">1</span><h4>${esc(h.titel)}</h4><p>${esc(h.text)}</p>${cmd(h.befehl)}</div>
    <div class="ss-step"><span class="n">2</span><h4>${esc(k.titel)} ${tagGap(k.fehltSkill + ' fehlt')}</h4><p>${esc(k.text)}</p>${cmd(k.befehl, { prompt: true })}</div>
  </div>`;
}

function renderA() {
  const t = isTester();
  const W = t
    ? { outlier: '2.3fr', skript: '1.1fr', packaging: '1.1fr', dreh: '48px', broll: '48px', schnitt: '48px', freigabe: '1.1fr', upload: '48px' }
    : { outlier: '.95fr', skript: '1.75fr', packaging: '1.4fr', dreh: '.95fr', broll: '.95fr', schnitt: '1.85fr', freigabe: '.95fr', upload: '.95fr' };
  const cols = D.stufen.map(s => {
    const collapsed = t && s.tester !== 'ja';
    if (collapsed) {
      return `<section class="col is-collapsed" aria-label="${esc(s.name)}"><div class="col-vert"><span class="col-nr">${s.nr}</span>${esc(s.name)}<em>${s.tester === 'optional' ? 'optional, deine Kamera' : 'nur Chris’ Setup'}</em></div></section>`;
    }
    const hot = !t && D.videos.some(v => v.aktuell === s.id || v.parallel.includes(s.id)) && D.videos.some(v => (v.stufen[s.id] || {}).status === 'wartet');
    let body = '';
    if (t) {
      if (s.id === 'outlier') body = startCard();
      else if (s.id === 'skript') body = `<div class="empty-col"><span>Hier landet dein Video, sobald die Links drin sind. Die Kette:</span><div class="skills">${D.skills.filter(k => k.stufe === 'skript').map(k => `<span>${esc(k.cmd)}</span>`).join('')}</div><span>Nach jeder Stufe prüfst du, dann geht es weiter.</span></div>`;
      else if (s.id === 'packaging') body = `<div class="empty-col"><span>Titel und Thumbnail als Paar, mit Vorlagen aus deiner Nische.</span><div class="skills"><span>/thumbnail-lab</span></div>${tagBranch('skill/thumbnail-lab')}<span>Liegt noch auf einem Branch, nicht in master.</span></div>`;
      else if (s.id === 'freigabe') body = `<div class="empty-col">${ic('shield-check', 'ic-l')}<span>Bevor etwas öffentlich wird, fragt der Hook nach. Ohne dein ausdrückliches Ja geht nichts raus.</span></div>`;
    } else {
      body = D.videos.map(v => v.aktuell === s.id ? bigCard(v) : v.parallel.includes(s.id) ? parallelCard(v, s.id) : slimRow(v, s.id)).join('');
    }
    const tool = t ? (s.id === 'outlier' ? { w: 'hand', txt: 'Links einfügen, Schlüssel optional' } : s.id === 'packaging' ? { w: 'branch', txt: s.werkzeugText } : { w: s.werkzeug, txt: s.werkzeugText }) : { w: s.werkzeug, txt: s.werkzeugText };
    return `<section class="col ${hot ? 'is-hot' : ''}" aria-label="${esc(s.name)}">
      <header class="col-h"><div class="col-t"><span class="col-nr">${s.nr}</span><span class="col-name">${esc(s.name)}</span></div>
        <div class="col-q">${esc(s.frage)}</div>
        <div class="col-tool t-${tool.w}">${ic(toolIcon[tool.w])}<span>${esc(tool.txt)}</span></div></header>
      <div class="col-body">${body}</div></section>`;
  }).join('');

  const head = t
    ? `<h1>Noch kein Video. <em>Fang links an.</em></h1><p>Jede Spalte ist eine Stufe. Dein Video startet bei den Outliern und wandert nach rechts. Gestreifte Spalten gehören zu Chris’ Setup, die brauchst du für den Test nicht.</p>`
    : `<h1>Video 1 ist im Schnitt. <em>Zwei Stufen warten auf dich.</em></h1><p>Gedreht ist es, jetzt hängen Schnitt und Packaging an deiner Entscheidung. Video 2 hat einen Skript-Entwurf und wartet auf den 11.10.</p>`;
  return `<div class="va">
    <div class="va-top"><div>${brand(t ? 'Kommandozentrale · frisch geklont' : 'Kommandozentrale · ' + D.stand.datum)}${head}</div>${t ? '' : rail()}</div>
    ${t ? setupStrip() : ''}
    <div class="board" style="grid-template-columns:${D.stufen.map(s => W[s.id]).join(' ')}">${cols}</div>
  </div>`;
}

/* =====================================================================
   B  Video-Akte: ein Video, senkrechter Ablauf, klarer nächster Schritt
   ===================================================================== */
function outlierGrid(list) {
  return `<div class="ol-grid">${list.map(o => `<a class="ol" href="https://www.youtube.com/watch?v=${o.id}" target="_blank" rel="noopener">
    <div class="thumb"><img loading="lazy" src="${yt(o.id)}" alt=""><span class="yt-factor">${esc(o.faktor)}</span></div>
    <span class="t">${o.titel ? esc(o.titel) : '<span style="color:var(--gap-ochre)">Titel steht nicht im Repo</span>'}</span>
    <span class="k">${esc(o.kanal)}${o.aufrufe ? ` · ${o.aufrufe} Aufrufe` : ''}${o.sprache ? ` · ${o.sprache}` : ''}${(o.titelVar || []).map(x => `<span class="v">Titel ${x}</span>`).join('')}</span></a>`).join('')}</div>`;
}

function titlesTable() {
  const rec = D.empfehlungThumbs.map(r => r.titel);
  return `<div class="titles">${D.titel.map(t => `<div class="trow ${t.gestrichen ? 'is-out' : ''} ${rec.includes(t.key) ? 'is-rec' : ''}">
    <span class="key">${t.key}</span>
    <span class="tx">${esc(t.text)}<small>${esc(t.muster)} · ${esc(t.beleg)}</small></span>
    <span class="pm">${t.median ? `Personas: Median ${t.median} von 5` : ''}</span>
    <span class="pm">${esc(t.urteil)}</span></div>`).join('')}</div>`;
}

function recsRow() {
  return `<div class="recs">${D.empfehlungThumbs.map((r, i) => {
    const t = titleOf(r.titel);
    return `<div class="rec">${thumbBtn(r.f, `<span class="rec-n">${i + 1}</span>`, r.warum)}<p><b>Titel ${r.titel}:</b> ${esc(t.text)}</p><p>${esc(r.warum)}</p></div>`;
  }).join('')}</div>`;
}

function allThumbs() {
  const days = [...new Set(D.thumbs.map(t => t.f.split('/')[0]))];
  return `<div class="days">${days.map(d => {
    const list = D.thumbs.filter(t => t.f.startsWith(d)); const [y, m, dd] = d.split('-');
    return `<div class="day"><h4>${dd}.${m}. <span>${list.length} Entwürfe aus ${new Set(list.map(t => t.run)).size} Läufen</span></h4>
      <div class="tgrid">${list.map(t => thumbBtn(t.f, '', t.text)).join('')}</div></div>`;
  }).join('')}</div>`;
}

function stageBody(v, sid) {
  const s = v.stufen[sid];
  if (v.nr === '01') {
    if (sid === 'outlier') return `<details class="more"><summary>${ic('chevron-right', 'ic-s')}9 Outlier hinter den Titeln</summary><div class="tl-body">${outlierGrid(D.outlierV1)}${gap(s.luecke)}</div></details>`;
    if (sid === 'skript') return `<details class="more"><summary>${ic('chevron-right', 'ic-s')}Aufbau des Prompter-Texts</summary><div class="tl-body">
      <div class="stats"><div class="stat"><b>2.393</b><span>Wörter in skript.md</span></div><div class="stat"><b>2.243</b><span>Wörter im Prompter</span></div><div class="stat"><b>10</b><span>Blöcke</span></div></div>
      <div class="blocks">${D.prompterBloecke.map((b, i) => `<div class="blk"><i>${i + 1}</i><b>${esc(b)}</b></div>`).join('')}</div></div></details>`;
    if (sid === 'packaging') return `<div class="tl-body">
      <div><h4 style="font-size:14px;margin-bottom:10px">Empfehlung aus der Versuchsreihe 01.10.</h4>${recsRow()}</div>
      <div><h4 style="font-size:14px;margin-bottom:10px">Titel-Varianten</h4>${titlesTable()}</div>
      <details class="more"><summary>${ic('chevron-right', 'ic-s')}Alle 78 Entwürfe</summary><div class="tl-body">${allThumbs()}</div></details></div>`;
    if (sid === 'dreh') return `<details class="more"><summary>${ic('chevron-right', 'ic-s')}Nachweis und Metadaten</summary><div class="tl-body"><div class="dreh">
      <img src="../videos/01-stufenleiter/dreh-nachweis.jpg" alt="Sechs Standbilder aus dem Haupt-Take" loading="lazy">
      <dl class="kv"><dt>Datei</dt><dd>DJI_20260927160458_0009_D.MP4</dd><dt>Start</dt><dd>27.09.2026, 16:04</dd><dt>Dauer</dt><dd>23:38 min</dd><dt>Format</dt><dd>3840x2160, 29,97 fps, HEVC</dd><dt>Größe</dt><dd>5,31 GB</dd><dt>Transkript</dt><dd>ElevenLabs, lokal in private/</dd></dl></div></div></details>`;
    if (sid === 'schnitt') return `<div class="tl-body">
      <div class="cuts">${D.schnittFassungen.map(c => `<div class="cut"><span class="nm">${esc(c.name)}</span><b class="d">${esc(c.dauer)}</b><span class="faint">${esc(c.pausen)}</span><span class="p">${esc(c.plus)}</span><span class="m">${esc(c.minus)}</span></div>`).join('')}</div>
      <div class="tone">${D.tonFassungen.map(f => `<div class="${f.status === 'abgelehnt' ? 'is-no' : ''}"><b>${esc(f.name)}</b><span>${esc(f.text)}</span>${f.notiz ? `<span class="flag" style="color:${f.status === 'bereit' ? 'var(--accent-2)' : 'var(--ink-3)'}">${esc(f.notiz)}</span>` : ''}</div>`).join('')}</div>
      ${gap('Filme und Tonspuren liegen lokal unter private/video-01/. Die Oberfläche kann sie nicht abspielen, sie zeigt nur, wo sie liegen.', 'Nicht im Repo')}</div>`;
    if (sid === 'freigabe') return `<div class="tl-body"><div class="checks">
      <div>${ic('circle-dot', 'ic-s')}3 Titel<span class="r">${st('wartet', 'Ticket 09')}</span></div>
      <div>${ic('circle-dot', 'ic-s')}Thumbnails für Test & Compare<span class="r">${st('wartet', 'Ticket 09')}</span></div>
      <div>${ic('circle-dashed', 'ic-s')}Beschreibung, Kapitel, Tags<span class="r">${st('offen', 'Upload-Skill, Ticket 22')}</span></div>
      <div>${ic('circle-dashed', 'ic-s')}CTA-Link zum OS Coach<span class="r">${st('offen', 'Gumroad, Ticket 21')}</span></div>
      <div>${ic('circle-dashed', 'ic-s')}Review gegen das Briefing und Zuschauer-Test<span class="r">${st('offen', 'Ticket 25')}</span></div></div></div>`;
    return '';
  }
  if (sid === 'outlier') return `<div class="tl-body">${outlierGrid(D.outlierV2)}${gap('Von den drei Outliern stehen nur Video-ID, Kanal und Faktor im Repo.')}</div>`;
  if (sid === 'skript') return `<div class="tl-body"><div class="stats"><div class="stat"><b>1.294</b><span>Wörter</span></div><div class="stat"><b>3</b><span>B-Roll-Stellen</span></div><div class="stat"><b>0</b><span>Dateien der Skript-Kette</span></div></div></div>`;
  if (s.luecke) return `<div class="tl-body">${gap(s.luecke)}</div>`;
  return '';
}

function renderB() {
  if (isTester()) return renderBTester();
  const v = V(S.akte);
  const railItems = D.videos.map(x => `<button class="vitem" data-act="akte" data-v="${x.nr}" aria-current="${x.nr === v.nr}">
      <span class="n">${x.nr}</span><span class="t">${esc(x.titel)}</span><span class="faint" style="font-size:12px">${esc(stufe(x.aktuell).name)}: ${esc(STATUS[x.stufen[x.aktuell].status])}</span>${segs(x)}</button>`).join('');
  const timeline = D.stufen.map(s => {
    const x = v.stufen[s.id] || { status: 'offen' };
    const open = x.status === 'wartet' || x.status === 'laeuft';
    return `<section class="tl-st s-${x.status}">
      <div class="tl-node">${ic(s.icon)}</div>
      <div>
        <div class="tl-hd"><h2><small>${s.nr}</small>${esc(s.name)}</h2>${st(x.status)}${x.wann ? `<span class="when">${esc(x.wann)}</span>` : ''}
          <span class="right">${ticketChip(x.ticket)}${belegChips(x.beleg)}</span></div>
        ${x.text ? `<p class="tl-sum">${esc(x.text)}</p>` : x.kurz ? `<p class="tl-sum faint">${esc(x.kurz)}</p>` : ''}
        ${stageBody(v, s.id)}
      </div></section>`;
  }).join('');
  const n = v.naechster;
  const also = v.nr === '01'
    ? `<div class="aside-sec"><h5>Wartet außerdem</h5><div class="mini">
        <div>${ic('images', 'ic-s')}<span>3 Paare für Test & Compare wählen</span>${ticketChip('09')}</div>
        <div>${ic('audio-lines', 'ic-s')}<span>Milde Tonspur anhören</span>${ticketChip('24')}</div></div></div>
       <div class="aside-sec"><h5>Termine</h5><div class="mini"><div><span class="dt">03.10.</span>B-Roll-Weg wählen</div><div><span class="dt">09.10.</span>privat hochladen</div><div><span class="dt">10.10.</span><b style="color:var(--ink)">Video 1 geht online</b></div></div></div>`
    : `<div class="aside-sec"><h5>Wartet außerdem</h5><p class="faint" style="font-size:12.5px">Nichts. Erst das Thema, dann das Skript.</p></div>
       <div class="aside-sec"><h5>Termine</h5><div class="mini"><div><span class="dt">11.10.</span>Thema aus drei Vorschlägen wählen</div><div><span class="dt">17.10.</span><b style="color:var(--ink)">Dreh Video 2</b></div></div></div>`;
  return `<div class="vb">
    <aside class="vb-rail">${brand()}
      <div><h5>Videos</h5><div class="vlist">${railItems}
        <div class="vitem vitem--new" style="cursor:default"><span class="n">+</span><span class="t">Neues Video</span><span class="faint" style="font-size:12px">skript-partner nimmt die nächste Nummer</span></div></div>
        <div style="margin-top:8px">${cmd('/skript-partner')}</div></div>
      <div class="vb-railfoot"><b>Tag ${D.stand.tag} von ${D.stand.tage}.</b> Video 1 geht am 10.10. online.</div>
    </aside>
    <main class="vb-main">
      <header class="vb-head"><span class="vb-num">${v.nr}</span><div>
        <h1>${esc(v.titel)}<span>${esc(v.untertitel)}</span></h1>
        ${v.kernaussage ? `<p class="vb-quote">„${esc(v.kernaussage)}“</p>` : ''}
        <div class="vb-facts">${v.laufzeitZiel ? `<span>Ziel <b>${esc(v.laufzeitZiel)}</b></span>` : ''}${v.stufen.dreh.status === 'fertig' ? `<span>gedreht <b>27.09.</b></span>` : v.dreh ? `<span>Dreh <b>${esc(v.dreh)}</b></span>` : ''}${v.online ? `<span>online <b>${esc(v.online)}</b></span>` : ''}<span>Ordner <a class="mono" href="../${v.ordner}/" target="_blank" style="font-size:12px">${esc(v.ordner)}/</a></span></div>
      </div></header>
      <div class="tl">${timeline}</div>
    </main>
    <aside class="vb-aside">
      <div class="next"><span class="lbl">${ic('arrow-right')}Nächster Schritt</span><h3>${esc(n.was)}</h3><p>${esc(n.warum)}</p>
        ${n.schritte.map(x => cmd(x.befehl, { label: x.label, prompt: !x.befehl.startsWith('/') && !x.befehl.startsWith('!') })).join('')}
        <div class="meta">${ticketChip(n.ticket)}<span class="faint" style="font-size:12px">${esc(n.dauer)}</span></div></div>
      ${also}
    </aside></div>`;
}

function renderBTester() {
  const [h, k] = D.tester.schritte;
  const chain = D.skills.filter(x => x.stufe === 'skript');
  const tl = D.stufen.map(s => {
    const off = s.tester === 'nein';
    const status = s.id === 'outlier' ? 'wartet' : 'offen';
    let body = '';
    if (s.id === 'outlier') body = `<div class="tl-body"><div class="paths">
        <div class="start" style="box-shadow:none"><h3 style="font-size:17px">Links einfügen</h3>
          <div class="field"><label for="b-links">3 bis 5 YouTube-Links <span>ein Link pro Zeile</span></label>
          <textarea id="b-links" class="inp mono" rows="5" data-bind="linksText" placeholder="https://www.youtube.com/watch?v=…">${esc(S.t.linksText)}</textarea>
          <div class="hint" data-out-html="linkcount">${OUT_HTML.linkcount()}</div></div>
          <div class="hint">Die Transkripte holt skript-partner über <b>/watch</b> oder yt-dlp und legt sie in <b>private/</b>, nie ins Repo.</div></div>
        ${keyAlt(false)}</div></div>`;
    else if (s.id === 'skript') body = `<div class="tl-body"><div class="checks">${chain.map(c => `<div><span class="mono" style="font-size:12.5px;color:var(--ink);min-width:150px">${esc(c.cmd)}</span><span class="faint">${esc(c.was)}</span></div>`).join('')}</div><p class="hint">Nach jeder Stufe liest du das Ergebnis und gibst frei. Am Ende liegen im Ordner packaging.md, die Skript-Versionen und prompter.txt für den Teleprompter.</p></div>`;
    else if (s.id === 'packaging') body = `<div class="tl-body">${cmd(OUT.thumb(), { out: 'thumb', label: 'Nach dem Skript', tag: tagBranch('skill/thumbnail-lab') })}<p class="hint">Liegt noch auf einem Branch, nicht in master. Für den Test muss er vorher rüber.</p></div>`;
    else if (s.id === 'dreh') body = `<p class="tl-sum faint">Mit deiner Kamera. sprechfassung liefert prompter.txt mit Markierungen für den Teleprompter.</p>`;
    else if (s.id === 'freigabe') body = `<p class="tl-sum">Bevor etwas öffentlich wird (Upload, Post, Repo-Sichtbarkeit), fragt der Hook publish-gate.sh nach. Ohne dein ausdrückliches Ja geht nichts raus.</p>`;
    else body = `<p class="tl-sum faint">Gehört zu Chris’ Setup. Für den Test ausgegraut.</p>`;
    return `<section class="tl-st s-${status} ${off ? 'is-off' : ''}"><div class="tl-node">${ic(s.icon)}</div><div>
      <div class="tl-hd"><h2><small>${s.nr}</small>${esc(s.name)}</h2>${s.id === 'outlier' ? st('wartet', 'du bist hier') : s.tester === 'optional' ? st('offen', 'optional') : off ? '' : st('offen')}</div>${body}</div></section>`;
  }).join('');
  return `<div class="vb">
    <aside class="vb-rail">${brand('frisch geklont')}
      <div><h5>Videos</h5><div class="vlist"><div class="vitem vitem--new" aria-current="true" style="border-style:solid;border-color:var(--accent-line);background:var(--bg-2)"><span class="n" style="color:var(--accent)">01</span><span class="t">${esc(S.t.titel || 'Dein erstes Video')}</span><span class="faint" style="font-size:12px">noch kein Ordner</span></div></div></div>
      <div><h5>Einmal einrichten</h5><div class="steps-d">
        ${[h, k].map(x => `<div class="sd ${S.t.done[x.id] ? 'is-done' : ''}"><button class="sd-h" data-act="tdone" data-id="${x.id}" style="text-align:left"><span class="ck">${S.t.done[x.id] ? ic('check', 'ic-s') : ''}</span><h4>${esc(x.titel)}<small>${esc(x.dauer)}</small></h4></button>${cmd(x.befehl, { prompt: x.id === 'kanal' })}${x.fehltSkill ? `<div>${tagGap(x.fehltSkill + ' fehlt noch')}</div>` : ''}</div>`).join('')}
      </div></div>
      <div class="vb-railfoot">Repo öffentlich: Videos, Transkripte und Schlüssel blockt der Git-Guard.</div>
    </aside>
    <main class="vb-main">
      <header class="vb-head"><span class="vb-num">01</span><div>
        <input class="vb-title-inp" data-bind="titel" value="${esc(S.t.titel)}" placeholder="Arbeitstitel deines ersten Videos" aria-label="Arbeitstitel">
        <div class="vb-facts"><span data-out-html="ordner">${OUT_HTML.ordner()}</span><span>Status <b>vor dem ersten Lauf</b></span></div>
      </div></header>
      <div class="tl">${tl}</div>
    </main>
    <aside class="vb-aside">
      <div class="next"><span class="lbl">${ic('arrow-right')}Nächster Schritt</span><h3>Skript-Interview mit deinen Outliern starten</h3>
        <p>Kopier den Befehl in Claude Code. skript-partner legt den Ordner an, holt die Transkripte und fragt dich nach Versprechen, Titel und Hook.</p>
        ${cmd(OUT.start(), { out: 'start' })}
        <div class="hint" data-out-html="linkcount">${OUT_HTML.linkcount()}</div></div>
      <div class="aside-sec"><h5>Was danach im Ordner liegt</h5><div class="mini">
        <div><span class="mono" style="font-size:12px;color:var(--ink)">packaging.md</span>Versprechen, Titel, Hook</div>
        <div><span class="mono" style="font-size:12px;color:var(--ink)">skript-v1-mix.md</span>erster Mix</div>
        <div><span class="mono" style="font-size:12px;color:var(--ink)">skript-v4a-hybrid.md</span>Sprechfassung</div>
        <div><span class="mono" style="font-size:12px;color:var(--ink)">prompter.txt</span>für den Teleprompter</div></div></div>
      <div class="aside-sec"><h5>Brauchst du nicht</h5><p class="faint" style="font-size:12.5px">Signal Room, Convex, Descript, Cleanvoice. Das ist Chris’ Werkstatt.</p></div>
    </aside></div>`;
}

/* =====================================================================
   C  Entscheidungs-Tisch: was wartet, Optionen nebeneinander, Auswahl = Befehl
   ===================================================================== */
const DEC_CHRIS = [
  { id: 'schnitt', ico: 'scissors', t: 'Welcher Schnitt wird Video 1?', m: 'drei Fassungen anhören', ticket: '20' },
  { id: 'ton', ico: 'audio-lines', t: 'Passt die milde Tonspur?', m: 'Hörprobe', ticket: '24' },
  { id: 'paare', ico: 'images', t: 'Drei Paare für Test & Compare', m: 'aus 78 Entwürfen', ticket: '09' },
  { id: 'haare', ico: 'scan-face', t: 'Erkennt man dich auf den Entwürfen?', m: 'eine Frage', ticket: '09' },
  { id: 'blind', ico: 'eye-off', t: 'Blind-Bögen selbst bewerten', m: 'Gegenprobe zum JSON-Test', ticket: '09' },
];
const DEC_LATER = [
  { t: 'B-Roll-Weg wählen', m: '03.10. · drei Clips', ticket: '08' },
  { t: 'Upload-Paket freigeben', m: '08.10. · Publish-Gate', ticket: '22' },
  { t: 'Thema für Video 2', m: '11.10. · drei Vorschläge', ticket: '23' },
];
const DEC_TESTER = [
  { id: 'schutz', ico: 'shield-check', t: 'Schutz einschalten', m: 'ein Befehl' },
  { id: 'kanal', ico: 'user-round', t: 'Worum geht dein Kanal?', m: '3 kurze Antworten' },
  { id: 'quelle', ico: 'radar', t: 'Woher kommen deine Outlier?', m: 'Links oder Schlüssel' },
  { id: 'video', ico: 'clapperboard', t: 'Wie heißt dein erstes Video?', m: 'Arbeitstitel reicht' },
];
const decDone = id => ({ schnitt: !!S.choice.schnitt, ton: !!S.choice.ton, paare: S.picks.length === 3, haare: !!S.choice.haare, schutz: !!S.t.done.hooks, kanal: !!(S.t.fuer && S.t.themen), quelle: S.t.weg === 'links' ? links().length >= 3 : false, video: !!S.t.titel })[id];

function slotsHtml() {
  return [0, 1, 2].map(i => {
    const f = S.picks[i];
    if (!f) return `<div class="slot is-empty"><span class="n">${i + 1}</span><div class="ph"></div><div class="tx">${i === 0 ? 'Zuerst hochladen. Ohne klaren Gewinner bleibt diese Variante.' : 'frei'}</div></div>`;
    const m = thumbMeta(f); const k = keyOfTitle(m.titel); const t = titleOf(k);
    return `<div class="slot"><span class="n">${i + 1}</span><div class="thumb"><img src="${thumbSrc(f)}" alt=""></div><div class="tx"><b>${esc(m.text)} · ${faceOf(m) ? (faceOf(m) === 'ohne' ? 'ohne Gesicht' : 'mit Gesicht') : 'Gesicht?'}</b>${k ? `Titel ${k}: ${esc(t.text)}` : esc(m.titel)}</div></div>`;
  }).join('');
}
function ruleHtml() {
  const faces = S.picks.map(f => faceOf(thumbMeta(f)));
  const titles = S.picks.map(f => keyOfTitle(thumbMeta(f).titel));
  const out = [];
  if (S.picks.length) {
    out.push(faces.includes('ohne') ? `<span class="rule ok">${ic('check', 'ic-s')}einer ohne Gesicht dabei</span>` : faces.includes(null) ? `<span class="rule no">${ic('circle-dashed', 'ic-s')}Gesicht ja oder nein steht nur bei der Versuchsreihe</span>` : `<span class="rule no">${ic('triangle-alert', 'ic-s')}noch keiner ohne Gesicht (Marks Rat, packaging.md)</span>`);
    const dup = titles.filter(Boolean).length !== new Set(titles.filter(Boolean)).size;
    out.push(dup ? `<span class="rule no">${ic('triangle-alert', 'ic-s')}zwei Entwürfe mit demselben Titel</span>` : `<span class="rule ok">${ic('check', 'ic-s')}jeder Titel nur einmal</span>`);
    if (titles.includes('E')) out.push(`<span class="rule no">${ic('triangle-alert', 'ic-s')}Titel E ist gestrichen</span>`);
  }
  return out.join('');
}

function decPaare() {
  const pool = S.pickAll ? D.thumbs : D.thumbs.filter(t => t.run.endsWith('versu1'));
  const recF = D.empfehlungThumbs.map(r => r.f);
  return `<div class="table-q"><div><h1>Welche drei Paare gehen in Test & Compare?</h1>
      <p>YouTube testet bis zu drei Varianten aus Titel und Thumbnail und misst die Wiedergabezeit. Ohne klaren Gewinner bleibt die zuerst hochgeladene. Die Reihenfolge deiner Klicks ist die Upload-Reihenfolge.</p></div>
    <div class="acts"><button class="btn" data-act="rec">${ic('wand')}Empfehlung übernehmen</button><button class="btn btn--ghost" data-act="clear">Leeren</button></div></div>
    <div class="slots" data-out-html="slots">${slotsHtml()}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
      <div style="display:flex;gap:16px;flex-wrap:wrap" data-out-html="rule">${ruleHtml()}</div>
      <div class="seg" role="group" aria-label="Auswahl"><button data-act="pool" data-all="0" aria-pressed="${!S.pickAll}">Versuchsreihe 01.10. · 12</button><button data-act="pool" data-all="1" aria-pressed="${S.pickAll}">Alle 78</button></div></div>
    <div class="pick-grid ${S.pickAll ? 'is-dense' : ''}">${pool.map(t => {
      const i = S.picks.indexOf(t.f); const k = keyOfTitle(t.titel); const face = faceOf(t);
      return `<button class="pick ${i >= 0 ? 'is-sel' : ''}" data-act="pick" data-f="${esc(t.f)}" aria-pressed="${i >= 0}">
        <div class="thumb"><img loading="lazy" src="${thumbSrc(t.f)}" alt="${esc(t.text)}">${i >= 0 ? `<span class="ord">${i + 1}</span>` : ''}${recF.includes(t.f) ? '<span class="rec-dot">Empfehlung</span>' : ''}<span class="zoom" data-zoom="${esc(t.f)}" role="button" aria-label="Groß ansehen">${ic('maximize-2', 'ic-s')}</span></div>
        <div class="cap"><span><b>${esc(t.text)}</b>${face ? ` · ${face} Gesicht` : ''}</span><span class="mono">${k ? 'Titel ' + k : ''}</span></div></button>`;
    }).join('')}</div>
    ${tray('paare', 'Satz für Claude Code', 'aktualisiert sich mit jedem Klick')}`;
}

function tray(out, h, sub) {
  return `<div class="tray"><h4>${esc(h)}<span>${esc(sub)}</span></h4>${cmd(OUT[out](), { out, prompt: true })}</div>`;
}

function decSchnitt() {
  return `<div class="table-q"><div><h1>Welcher Schnitt wird Video 1?</h1><p>Drei Fassungen derselben 23:38 Minuten. Davon hängen B-Roll, Grafiken und Upload ab, laut Roadmap fällt die Entscheidung heute.</p></div></div>
    <div class="opts" style="grid-template-columns:repeat(3,minmax(0,1fr))">${D.schnittFassungen.map(c => `<div class="opt ${S.choice.schnitt === c.key ? 'is-sel' : ''}" role="button" tabindex="0" data-act="choose" data-k="schnitt" data-v="${c.key}" aria-pressed="${S.choice.schnitt === c.key}">
      <div class="media-ph">${ic('film')}<span>Film liegt lokal, nicht im Repo</span><code>${esc(c.ordner)}</code></div>
      <div class="opt-h"><h3>${esc(c.name)}</h3><span class="radio">${S.choice.schnitt === c.key ? ic('check', 'ic-s') : ''}</span></div>
      <span class="big">${esc(c.dauer)}</span>
      <dl><dt>Pausen</dt><dd>${esc(c.pausen)}</dd><dt>Tempo</dt><dd>${c.tempo ? esc(c.tempo) : '<span style="color:var(--gap-ochre)">nicht gemessen</span>'}</dd><dt>Format</dt><dd>${esc(c.format)}</dd><dt>Kosten</dt><dd>${esc(c.kosten)}</dd><dt>Dauer</dt><dd>${esc(c.rechenzeit)}</dd><dt>Gut</dt><dd class="p">${esc(c.plus)}</dd><dt>Haken</dt><dd class="m">${esc(c.minus)}</dd></dl>
      ${cmd('! open ' + c.ordner)}</div>`).join('')}</div>
    ${tray('schnitt', 'Satz für Claude Code', 'nach dem Anhören')}`;
}

function decTon() {
  return `<div class="table-q"><div><h1>Passt die milde Tonspur?</h1><p>Beim Dreh war das Mikro nicht richtig eingestellt. Die erste Cleanvoice-Fassung klang dir künstlich, die zweite macht nur Rauschentfernung und Normalisierung.</p></div></div>
    ${gap('Die Hörproben liegen lokal im privaten Ordner, der genaue Pfad steht nicht im Ticket.', 'Pfad fehlt')}
    <div class="opts" style="grid-template-columns:repeat(3,minmax(0,1fr))">${D.tonFassungen.map(f => `<button class="opt ${S.choice.ton === f.key ? 'is-sel' : ''} ${f.status === 'abgelehnt' ? 'is-no' : ''}" data-act="choose" data-k="ton" data-v="${f.key}" aria-pressed="${S.choice.ton === f.key}">
      <div class="opt-h"><h3>${esc(f.name)}</h3><span class="radio">${S.choice.ton === f.key ? ic('check', 'ic-s') : ''}</span></div>
      <p class="muted" style="font-size:13px">${esc(f.text)}</p>
      ${f.notiz ? st(f.status === 'bereit' ? 'wartet' : 'offen', f.notiz) : ''}</button>`).join('')}</div>
    ${tray('ton', 'Satz für Claude Code', 'nach dem Anhören')}`;
}

function decHaare() {
  const ex = ['2026-10-01/1945-versu1-v12.jpg', '2026-10-01/1945-versu1-v06.jpg', '2026-10-01/1945-versu1-v10.jpg'];
  return `<div class="table-q"><div><h1>Erkennt man dich auf den Entwürfen?</h1><p>Aus packaging.md: Die Haare wirken in allen Entwürfen etwas voller als auf den Fotos, der Haaransatz sitzt etwas tiefer. Du entscheidest, ob das stört.</p></div></div>
    <div class="recs">${ex.map(f => `<div class="rec">${thumbBtn(f, '', thumbMeta(f).text)}<p>${esc(thumbMeta(f).var)}</p></div>`).join('')}</div>
    <div class="opts" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      ${[['ok', 'Stört mich nicht', 'Weiter mit den Entwürfen wie sie sind.'], ['nein', 'Stört mich', 'Beim nächsten Lauf näher an die Fotos.']].map(([k, h, p]) => `<button class="opt ${S.choice.haare === k ? 'is-sel' : ''}" data-act="choose" data-k="haare" data-v="${k}" aria-pressed="${S.choice.haare === k}"><div class="opt-h"><h3>${h}</h3><span class="radio">${S.choice.haare === k ? ic('check', 'ic-s') : ''}</span></div><p class="muted">${p}</p></button>`).join('')}
    </div>${tray('haare', 'Satz für Claude Code', 'eine Zeile reicht')}`;
}

function decBlind() {
  return `<div class="table-q"><div><h1>Blind-Bögen selbst bewerten</h1><p>Aus Ticket 09 (02.10.): 40 Bilder, 4 Arme, zwei blinde Bewerter. Die Zerlegung einer Vorlage war der große Hebel, JSON knapp vor Fließtext. Offen ist dein eigenes Urteil auf denselben Bögen.</p></div></div>
    ${gap('Die Bögen liegen privat unter private/json-test/neu/blind/. Was darauf zu sehen ist, steht nicht im Repo.', 'Nicht im Repo')}
    ${cmd('! open private/json-test/neu/blind/', { label: 'Bögen öffnen' })}
    <div class="later">Hier gibt es nichts nebeneinander zu legen, solange die Bögen nicht im Repo sind. Für die echte Version reicht ein Bogen-Bild pro Arm als Vorschau, ohne Gesicht oder private Daten.</div>`;
}

/* Tester-Entscheidungen */
function decSchutz() {
  const h = D.tester.schritte[0];
  return `<div class="table-q"><div><h1>Schutz einschalten</h1><p>${esc(h.text)} Das Repo ist öffentlich, deshalb kommt das zuerst.</p></div></div>
    ${cmd(h.befehl, { label: 'Einmal im Terminal, im Ordner von YT-OS', labelIcon: 'terminal' })}
    <div><button class="btn ${S.t.done.hooks ? '' : 'btn--hot'}" data-act="tdone" data-id="hooks">${ic(S.t.done.hooks ? 'check' : 'square')}${S.t.done.hooks ? 'Erledigt' : 'Hab ich gemacht'}</button></div>
    <div class="hint">Die Oberfläche kann nicht prüfen, ob es geklappt hat. In der echten Version würde sie <b>.git/config</b> lesen.</div>`;
}
function decKanal() {
  const f = (id, lbl, ph, sub) => `<div class="field"><label for="c-${id}">${lbl} <span>${sub}</span></label><input id="c-${id}" class="inp" data-bind="${id}" value="${esc(S.t[id])}" placeholder="${ph}"></div>`;
  return `<div class="table-q"><div><h1>Worum geht dein Kanal?</h1><p>Drei kurze Antworten. Daraus schreibt Claude Code deine identity.md, die jeder Skill zuerst liest. Für Chris steht da: Selbstständige und Teams, Claude und KI-Agents, locker und lehrend.</p></div></div>
    <div class="qs">${f('fuer', 'Für wen?', 'z. B. Handwerksbetriebe mit 5 bis 20 Leuten', 'Publikum')}${f('themen', 'Worüber?', 'z. B. KI im Büroalltag', 'zwei, drei Themen')}${f('stimme', 'Wie klingst du?', 'z. B. direkt, mit Beispielen aus der Werkstatt', 'Stimme')}</div>
    <div>${tagGap('/kanal-einrichten fehlt noch')} <span class="hint">Bis dahin reicht der Satz unten, er füllt sich beim Tippen.</span></div>`;
}
function decQuelle() {
  const w = S.t.weg;
  return `<div class="table-q"><div><h1>Woher kommen deine Outlier?</h1><p>Outlier sind Videos, die auf ihrem Kanal weit über dem Üblichen laufen. Aus 3 bis 5 davon baut die Skript-Kette deinen ersten Entwurf.</p></div></div>
    <div class="opts" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <button class="opt ${w === 'links' ? 'is-sel' : ''}" data-act="weg" data-v="links" aria-pressed="${w === 'links'}"><div class="opt-h"><h3>Links selbst einfügen</h3><span class="radio">${w === 'links' ? ic('check', 'ic-s') : ''}</span></div><p class="muted">Du kennst die Videos schon. Kein Schlüssel, kein Konto. Funktioniert heute.</p>${st('fertig', 'läuft mit skript-partner')}</button>
      <button class="opt ${w === 'key' ? 'is-sel' : ''}" data-act="weg" data-v="key" aria-pressed="${w === 'key'}"><div class="opt-h"><h3>Mit eigenem YouTube-Schlüssel suchen</h3><span class="radio">${w === 'key' ? ic('check', 'ic-s') : ''}</span></div><p class="muted">${esc(D.tester.schluessel.text)}</p>${tagGap('Skill fehlt')}</button>
    </div>
    ${w === 'links' ? `<div class="field"><label for="c-links">Deine Links <span>ein Link pro Zeile</span></label><textarea id="c-links" class="inp mono" rows="5" data-bind="linksText" placeholder="https://www.youtube.com/watch?v=…">${esc(S.t.linksText)}</textarea><div class="hint" data-out-html="linkcount">${OUT_HTML.linkcount()}</div></div>` : keyAlt(false)}`;
}
function decVideo() {
  return `<div class="table-q"><div><h1>Wie heißt dein erstes Video?</h1><p>Ein Arbeitstitel reicht, den echten Titel findest du mit skript-partner. Daraus entsteht der Ordner, in dem alles landet.</p></div></div>
    <div class="field" style="max-width:640px"><label for="c-titel">Arbeitstitel <span>darf noch wackeln</span></label><input id="c-titel" class="inp" style="height:46px;font-size:17px;font-weight:600" data-bind="titel" value="${esc(S.t.titel)}" placeholder="z. B. Claude für Steuerberater"><div class="hint" data-out-html="ordner">${OUT_HTML.ordner()}</div></div>
    <div class="hint">${links().length ? '' : 'Noch keine Links. Geh zurück zu „Woher kommen deine Outlier?“ oder füg sie später im Chat ein.'}</div>
`;
}

function cumTester() {
  const rows = [
    { id: 'schutz', h: 'Schutz', html: cmd(D.tester.schritte[0].befehl) },
    { id: 'kanal', h: 'Kanal', html: cmd(OUT.kanal(), { out: 'kanal', prompt: true }) },
    { id: 'video', h: 'Erstes Video', html: cmd(OUT.start(), { out: 'start' }) },
  ];
  return `<section class="cum"><h3>Deine Befehle bis hierher <span class="faint" style="font-weight:500;font-size:13px">wachsen mit jeder Antwort, der Reihe nach in Claude Code einfügen</span></h3>
    ${rows.map((r, i) => `<div class="cum-row ${decDone(r.id) ? 'is-done' : ''}" data-id="${r.id}"><span class="n">${decDone(r.id) ? '✓' : i + 1}</span>${r.html}</div>`).join('')}</section>`;
}

function renderC() {
  const t = isTester();
  const list = t ? DEC_TESTER : DEC_CHRIS;
  const cur = list.find(d => d.id === S.dec) || list[0]; S.dec = cur.id;
  const open = list.filter(d => !decDone(d.id)).length;
  const q = list.map(d => `<button class="qi ${decDone(d.id) ? 'is-done' : ''}" data-act="dec" data-id="${d.id}" aria-current="${d.id === cur.id}">
      <span class="ico">${ic(decDone(d.id) ? 'check' : d.ico)}</span><span class="t">${esc(d.t)}</span>
      <span class="m">${d.ticket ? `<span class="mono">#${d.ticket}</span>` : ''}${esc(d.m)}</span></button>`).join('');
  const later = t
    ? [{ t: 'Titel und Thumbnail', m: 'nach dem Skript · /thumbnail-lab' }, { t: 'Freigabe vor dem Upload', m: 'Publish-Gate fragt dich' }]
    : DEC_LATER;
  const body = { schnitt: decSchnitt, ton: decTon, paare: decPaare, haare: decHaare, blind: decBlind, schutz: decSchutz, kanal: decKanal, quelle: decQuelle, video: decVideo }[cur.id]();
  return `<div class="vc">
    <div class="vc-top">${brand(t ? 'frisch geklont' : 'Kommandozentrale · ' + D.stand.datum)}<span class="faint" style="font-size:12.5px">${t ? 'Vier Schritte bis zu deinem ersten Skript' : `Tag ${D.stand.tag} von ${D.stand.tage} · Video 1 geht in 8 Tagen online`}</span></div>
    <div class="vc-grid">
      <nav class="queue" aria-label="Entscheidungen">
        <h2>${t ? `<em data-open>${open}</em> von 4 offen.` : `<em data-open>${open}</em> Entscheidungen warten auf dich.`}</h2>
        <p class="qsub">${t ? 'Von oben nach unten. Jede Antwort baut den Befehl, den du in Claude Code einfügst.' : 'Reihenfolge aus memory.md, nächste Aktion für Tag 8.'}</p>
        ${q}
        <div class="qhead">Kommt noch</div>
        ${later.map(d => `<div class="qi is-later"><span class="ico">${ic('clock')}</span><span class="t">${esc(d.t)}</span><span class="m">${d.ticket ? `<span class="mono">#${d.ticket}</span>` : ''}${esc(d.m)}</span></div>`).join('')}
      </nav>
      <main class="table">${body}${t ? cumTester() : ''}</main>
    </div></div>`;
}

/* =====================================================================
   D  Begleiter: schmale Leiste neben Claude Code oder T3
   ===================================================================== */
const JETZT = () => {
  const v1 = V('01');
  return [
    { t: v1.naechster.was, ticket: '20', dauer: v1.naechster.dauer, text: v1.naechster.warum, steps: v1.naechster.schritte },
    { t: 'Milde Tonspur anhören', ticket: '24', dauer: 'Hörprobe', text: 'Nur Rauschentfernung und Normalisierung. Die erste Fassung klang dir künstlich.', steps: [
      { label: 'Ordner öffnen', befehl: '! open private/video-01/', gap: 'Genauer Pfad steht nicht im Ticket.' },
      { label: 'Danach in Claude Code', befehl: 'Ticket 24: Ton für Video 1 ist <Original oder Cleanvoice mild>. Notier meine Hörfreigabe im Ticket.' }] },
    { t: 'Drei Paare für Test & Compare wählen', ticket: '09', dauer: 'Empfehlung steht', text: 'Aus der Versuchsreihe: „Gleiches Abo.“ zuerst, dann „Wo stehst du?“, dann „6 Stufen“ ohne Gesicht.', steps: [
      { label: 'Übersicht der Versuchsreihe öffnen', befehl: '! open videos/01-stufenleiter/thumbnails/2026-10-01/uebersicht-320px.jpg' },
      { label: 'Danach, falls du der Empfehlung folgst', befehl: 'Ticket 09: Für Test & Compare nehme ich 1945-versu1-v11 (Titel B), dann v09 (Titel A), dann v08 (Titel C). Trag das in packaging.md ein.' }] },
    { t: 'B-Roll-Vergleich starten', ticket: '08', dauer: 'laut Roadmap heute', text: 'Dieselbe Stelle per Playwright, Computer Use und Chrome-Extension, mit sichtbarem Cursor und im Sprechtempo.', steps: [
      { label: 'In Claude Code', befehl: 'Ticket 08: Starte den B-Roll-Vergleich für Video 1, so wie im Ticket beschrieben.' }] },
  ];
};

function renderD() {
  const t = isTester();
  const side = t ? sideTester() : sideChris();
  const last = S.lastPasted;
  return `<div class="vd">
    <div class="vd-host" aria-hidden="false">
      <div class="vd-hostlbl">${ic('monitor')}Simulation: dein Claude-Code- oder T3-Fenster. Die Leiste rechts bleibt daneben offen.</div>
      <div class="term"><div class="term-bar"><i></i><i></i><i></i><span style="margin-left:8px">claude · ${t ? '~/yt-os' : '~/dev/YT-OS'}</span></div>
        <div class="term-body" id="term">${termBody(last)}</div></div>
    </div>
    <aside class="side" aria-label="Begleiter">${side}</aside></div>`;
}
function termBody(last) {
  return last
    ? `<div class="ln-note">Eingefügt aus der Leiste:</div><div class="ln-in">${esc(last)}</div><div><span class="term-caret"></span></div>`
    : `<div class="ln-note">Klick rechts auf einen Befehl. Er landet in deiner Zwischenablage, hier siehst du, wie er in Claude Code ankommt.</div><div><span style="color:var(--accent)">&gt; </span><span class="term-caret"></span></div>`;
}

function palette(filterTester) {
  return `<div class="pal">${D.skills.map(k => {
    const off = filterTester && !k.tester;
    return `<button data-act="pal" data-c="${esc(k.cmd)}" class="${off ? 'is-off' : ''}" ${off ? 'disabled title="nur in Chris’ Setup"' : ''}><span class="c">${esc(k.cmd)} ${k.stand === 'branch' ? tagBranch('Branch') : ''}</span><span class="w">${esc(k.was)}</span><span class="x">${ic('copy', 'ic-s')}</span></button>`;
  }).join('')}</div>`;
}

function sideChris() {
  const J = JETZT(); const j = J[S.jetzt % J.length];
  return `<div class="side-top">${brand()}<span class="day">Tag ${D.stand.tag}/${D.stand.tage}</span></div>
    <div class="count"><b>8</b><span>Tage, bis Video 1 online geht.<br>Samstag, 10.10.</span></div>
    <div class="now"><div class="lbl"><span style="display:flex;gap:6px;align-items:center">${ic('arrow-right', 'ic-s')}Jetzt dran</span>${ticketChip(j.ticket)}</div>
      <h3>${esc(j.t)}</h3><p>${esc(j.text)}</p>
      ${j.steps.map(x => cmd(x.befehl, { label: x.label, prompt: !/^[!/]/.test(x.befehl), gap: !!x.gap, gapNote: x.gap })).join('')}
      <div class="acts"><button class="btn btn--hot" data-act="jetzt-next">${ic('check', 'ic-s')}Erledigt, weiter</button><span class="faint" style="font-size:12px;align-self:center">${esc(j.dauer)}</span></div></div>
    <div><h5>Danach <span>tippen zum Vorziehen</span></h5>${J.map((x, i) => i === S.jetzt % J.length ? '' : `<button class="qrow" data-act="jetzt-set" data-i="${i}">${ic('circle-dot', 'ic-s')}<span class="t">${esc(x.t)}<small>Ticket ${x.ticket}</small></span>${ic('chevron-right', 'ic-s')}</button>`).join('')}</div>
    <div><h5>Videos</h5>${D.videos.map(v => `<div class="vrow"><span class="n">${v.nr}</span><span class="t">${esc(v.titel)}</span><span class="s">${esc(stufe(v.aktuell).name)}: ${esc(v.stufen[v.aktuell].kurz)}</span>${segs(v)}</div>`).join('')}</div>
    <div><h5>Befehle <span>klicken kopiert</span></h5>${palette(false)}</div>
    <div><h5>Zuletzt im Repo</h5><div class="commits">${D.commits.slice(0, 4).map(c => `<div><code>${c.h}</code><span>${esc(c.text)}</span></div>`).join('')}</div></div>`;
}

function sideTester() {
  const [h, k, v] = D.tester.schritte;
  const doneN = ['hooks', 'kanal', 'video'].filter(id => S.t.done[id]).length;
  const step = (x, n, inner) => `<div class="sd ${S.t.done[x.id] ? 'is-done' : ''} ${!S.t.done[x.id] && ['hooks', 'kanal', 'video'].find(id => !S.t.done[id]) === x.id ? 'is-on' : ''}">
      <button class="sd-h" data-act="tdone" data-id="${x.id}" style="text-align:left"><span class="ck">${S.t.done[x.id] ? ic('check', 'ic-s') : `<span class="mono" style="font-size:11px">${n}</span>`}</span><h4>${esc(x.titel)}<small>${esc(x.dauer)}</small></h4></button>
      <p>${esc(x.text)}</p>${inner}</div>`;
  return `<div class="side-top">${brand('frisch geklont')}<span class="day">${doneN}/3</span></div>
    <div class="count"><b>3</b><span>Schritte bis zu deinem ersten Skript.<br>Häkchen setzt du selbst.</span></div>
    <div class="steps-d">
      ${step(h, 1, cmd(h.befehl))}
      ${step(k, 2, cmd(k.befehl, { prompt: true }) + `<div>${tagGap(k.fehltSkill + ' fehlt noch')}</div>`)}
      ${step(v, 3, `<div class="field"><label for="d-titel">Arbeitstitel</label><input id="d-titel" class="inp" data-bind="titel" value="${esc(S.t.titel)}" placeholder="z. B. Claude für Steuerberater"></div>
        <div class="field"><label for="d-links">3 bis 5 YouTube-Links</label><textarea id="d-links" class="inp mono" rows="3" data-bind="linksText" placeholder="ein Link pro Zeile">${esc(S.t.linksText)}</textarea><div class="hint" data-out-html="linkcount">${OUT_HTML.linkcount()}</div></div>
        ${cmd(OUT.start(), { out: 'start' })}`)}
    </div>
    <div><h5>Danach</h5><div class="flow">
      <div><i></i><span>Skript-Kette bis <code>/text-check</code>, du prüfst nach jeder Stufe</span></div>
      <div><i></i><span><code>/thumbnail-lab</code> für Titel und Thumbnail ${tagBranch('Branch')}</span></div>
      <div><i></i><span>Publish-Gate: ohne dein Ja geht nichts raus</span></div>
      <div class="is-off"><i></i><span>B-Roll, Schnitt, Upload: Chris’ Setup, für dich ausgegraut</span></div></div></div>
    <div><h5>Befehle <span>klicken kopiert</span></h5>${palette(true)}</div>
    <div><h5>Ohne Schlüssel unterwegs?</h5>${keyAlt(true)}</div>`;
}

/* =====================================================================
   Rahmen: Render, schwebende Leiste, Events
   ===================================================================== */
function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } }); }

function render(anim) {
  const app = document.getElementById('app');
  const v = VARIANTS.find(x => x.k === S.variant);
  const y = window.scrollY;
  app.innerHTML = v.render();
  if (anim) { app.classList.remove('swap'); void app.offsetWidth; app.classList.add('swap'); }
  renderBar();
  icons();
  if (!anim) window.scrollTo(0, y);
  document.title = `Prototyp ${v.k} · ${v.name} · YT-OS`;
}

function renderBar() {
  let bar = document.getElementById('pbar');
  if (!bar) { bar = document.createElement('div'); bar.id = 'pbar'; document.body.appendChild(bar); }
  const v = VARIANTS.find(x => x.k === S.variant);
  bar.innerHTML = `<nav class="pbar" aria-label="Prototyp-Varianten">
    <button class="pb-arrow" data-act="prev" aria-label="Vorige Variante">${ic('chevron-left')}</button>
    <button class="pb-label" data-act="next" title="Nächste Variante"><span class="k">${v.k}</span>${esc(v.name)}</button>
    <button class="pb-arrow" data-act="next" aria-label="Nächste Variante">${ic('chevron-right')}</button>
    <span class="pb-sep"></span>
    <span class="pb-seg" role="group" aria-label="Zustand"><button data-act="state" data-s="chris" aria-pressed="${S.state === 'chris'}">Chris</button><button data-act="state" data-s="tester" aria-pressed="${S.state === 'tester'}">Neuer Tester</button></span>
    <span class="pb-sep"></span>
    <button class="pb-info" data-act="info" aria-expanded="${S.info}">${ic('info', 'ic-s')}Quellen</button>
    <span class="pb-hint">← →</span>
  </nav>${S.info ? `<div class="pinfo" role="dialog" aria-label="Quellen"><h4>Woher die Daten kommen</h4><table>${D.quellen.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table>
    <div class="state">Zustand: ?variant=${S.variant}&state=${S.state}${S.variant === 'C' ? '&d=' + S.dec : ''}${S.variant === 'B' && S.state === 'chris' ? '&video=' + S.akte : ''} · Stand 02.10.2026, Commit 8fc1c58 · gestrichelt in Ocker = fehlt in den Dateien</div></div>` : ''}`;
}

function syncUrl() {
  const p = new URLSearchParams({ variant: S.variant, state: S.state });
  if (S.variant === 'B' && S.state === 'chris' && S.akte !== '01') p.set('video', S.akte);
  if (S.variant === 'C' && S.dec) p.set('d', S.dec);
  history.replaceState(null, '', '?' + p.toString());
}

function go(delta) {
  const i = VARIANTS.findIndex(v => v.k === S.variant);
  S.variant = VARIANTS[(i + delta + VARIANTS.length) % VARIANTS.length].k;
  S.dec = null; syncUrl(); render(true); window.scrollTo(0, 0);
}

async function copyText(text) {
  S.lastPasted = text;
  const term = document.getElementById('term'); if (term) { term.innerHTML = termBody(text); }
  try { await navigator.clipboard.writeText(text); }
  catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
}

function lightbox(f) {
  const m = thumbMeta(f); const k = keyOfTitle(m.titel);
  const layer = document.getElementById('layer');
  layer.innerHTML = `<div class="lb" data-act="lb-close" role="dialog" aria-label="Thumbnail groß"><div class="lb-inner"><img src="${thumbSrc(f)}" alt="${esc(m.text)}">
    <div class="lb-meta"><div><b>${esc(m.text)}</b> · ${esc(m.var)}<br>${esc(m.lauf)}</div><div style="text-align:right"><span class="mono">${esc(f)}</span><br>${k ? `Titel ${k}: ` : ''}${esc(m.titel)}</div></div></div></div>`;
}

document.addEventListener('click', e => {
  const zoom = e.target.closest('[data-zoom]');
  if (zoom) { e.preventDefault(); e.stopPropagation(); lightbox(zoom.dataset.zoom); return; }
  const cp = e.target.closest('[data-copy]');
  if (cp) {
    e.preventDefault(); e.stopPropagation();
    const box = cp.closest('.cmd'); copyText(box.querySelector('.cmd-body').textContent);
    box.classList.add('is-copied'); setTimeout(() => box.classList.remove('is-copied'), 1600); return;
  }
  const a = e.target.closest('[data-act]'); if (!a) return;
  const act = a.dataset.act;
  if (act === 'lb-close') { document.getElementById('layer').innerHTML = ''; return; }
  if (act === 'prev') return go(-1);
  if (act === 'next') return go(1);
  if (act === 'state') { S.state = a.dataset.s; S.dec = null; syncUrl(); render(true); return; }
  if (act === 'info') { S.info = !S.info; renderBar(); icons(); return; }
  if (act === 'akte') { S.akte = a.dataset.v; syncUrl(); render(true); window.scrollTo(0, 0); return; }
  if (act === 'dec') { S.dec = a.dataset.id; syncUrl(); render(false); return; }
  if (act === 'pool') { S.pickAll = a.dataset.all === '1'; render(false); return; }
  if (act === 'pick') {
    const f = a.dataset.f; const i = S.picks.indexOf(f);
    if (i >= 0) S.picks.splice(i, 1); else if (S.picks.length < 3) S.picks.push(f); else { S.picks.shift(); S.picks.push(f); }
    render(false); return;
  }
  if (act === 'rec') { S.picks = D.empfehlungThumbs.map(r => r.f); render(false); return; }
  if (act === 'clear') { S.picks = []; render(false); return; }
  if (act === 'choose') {
    if (e.target.closest('.cmd')) return;
    S.choice[a.dataset.k] = S.choice[a.dataset.k] === a.dataset.v ? null : a.dataset.v; render(false); return;
  }
  if (act === 'weg') { S.t.weg = a.dataset.v; render(false); return; }
  if (act === 'tdone') { S.t.done[a.dataset.id] = !S.t.done[a.dataset.id]; render(false); return; }
  if (act === 'jetzt-next') { S.jetzt = (S.jetzt + 1) % JETZT().length; render(false); return; }
  if (act === 'jetzt-set') { S.jetzt = +a.dataset.i; render(false); return; }
  if (act === 'pal') {
    copyText(a.dataset.c); a.classList.add('is-copied'); setTimeout(() => a.classList.remove('is-copied'), 1400); return;
  }
});

document.addEventListener('input', e => {
  const b = e.target.dataset.bind; if (!b) return;
  S.t[b] = e.target.value;
  // dieselbe Eingabe kann in einer Variante mehrfach vorkommen
  document.querySelectorAll(`[data-bind="${b}"]`).forEach(el => { if (el !== e.target) el.value = e.target.value; });
  refreshOutputs();
  if (S.variant === 'C') {
    const list = isTester() ? DEC_TESTER : DEC_CHRIS;
    document.querySelectorAll('.qi[data-id]').forEach(q => q.classList.toggle('is-done', !!decDone(q.dataset.id)));
    const o = document.querySelector('[data-open]'); if (o) o.textContent = list.filter(d => !decDone(d.id)).length;
    document.querySelectorAll('.cum-row').forEach((r, i) => { const d = !!decDone(r.dataset.id); r.classList.toggle('is-done', d); r.querySelector('.n').textContent = d ? '✓' : i + 1; });
  }
});

document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-act]')) { e.preventDefault(); e.target.click(); return; }
  if (e.key === 'Escape') { document.getElementById('layer').innerHTML = ''; if (S.info) { S.info = false; renderBar(); icons(); } return; }
  const el = document.activeElement;
  if (el && (el.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"]'))) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
});

syncUrl();
render(true);
})();
