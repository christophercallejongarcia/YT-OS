---
name: skript-anreichern
description: Reichert ein YT-OS-Skript an. v2 bringt Nuggets und Best Practices aus der EA-Community (EA Brain MCP) und prüft alle Fakten, v3 füllt Beispiele aus Chris' echten Sessions, aus der Community oder als erfundene Veranschaulichung. Zweite Stufe der Skript-Kette.
when_to_use: Nach skript-mix, wenn v1 freigegeben ist, oder "skript-anreichern", "reicher das Skript an", "Faktencheck", "bau Beispiele ein".
argument-hint: <video-ordner> <v2|v3>
disable-model-invocation: true
---

# skript-anreichern: v1 → v2 → v3

Stufe 2 der Kette: skript-partner → skript-mix → **skript-anreichern** → sprechfassung (v4a, v4b) → text-check.

Eingabe: `$ARGUMENTS`, also Video-Ordner (`videos/<ordner>` oder bei Probeläufen ein Ordner unter `private/`) und Modus `v2` oder `v3`. Jeder Modus ist ein eigener Lauf mit Stopp danach.

Für beide Modi gilt: Hook und Pitch bleiben so, wie sie in `packaging.md` stehen. Stellen mit `<!-- brain-dump -->` behalten Chris' Wortlaut. Dort wird nur ein Fakt korrigiert, wenn er falsch ist.

**EA Brain erreichen.** Die Tools heißen `mcp__claude_ai_EA_Brain__search_community_knowledge`, `…__search_community_posts`, `…__read_community_source` und `…__read_community_post`. Fehlen sie in der Session, obwohl der Connector in claude.ai verbunden ist, braucht Claude Code ein eigenes Login: im Terminal `claude`, dann `/mcp`, "claude.ai EA Brain", "Authenticate". Eine laufende Session sieht das Login erst nach einem Neustart. Bis dahin die Suche über eine frische Hintergrund-Session holen: `claude -p "<Rechercheauftrag>" --allowedTools "mcp__claude_ai_EA_Brain__search_community_knowledge,mcp__claude_ai_EA_Brain__read_community_source"`, Ergebnis nach `<ordner>/private/ea-brain.md`. Ohne EA Brain läuft v2 nicht.

## Modus v2: Community und Faktencheck

Grundlage: `<ordner>/skript-v1-mix.md`.

1. Pro Abschnitt im EA Brain suchen (`search_community_knowledge`), was Mark Kashef und die Community dazu sagen: Nuggets, Best Practices, Warnungen. Tragende Quellen mit `read_community_source` lesen, bevor etwas übernommen wird.
2. Einbauen, was das Skript konkreter oder richtiger macht. In eigenen Worten, keine wörtlichen Zitate aus der Community ins Skript (das Repo ist öffentlich). Wo Mark genannt wird, nur mit belegter Aussage.
3. **Faktencheck:** jede prüfbare Aussage (Funktionen, Preise, Zahlen, Namen, Versionen) gegen EA Brain und gegen offizielle Quellen (Docs, Herstellerseiten) prüfen. Falsches korrigieren, Unbelegtes markieren oder streichen.
4. Speichern: `<ordner>/skript-v2-community.md`. Belege in `<ordner>/quellen.md` unter "v2" ergänzen: Aussage, Quelle (Skool-Link mit Zeitstempel oder URL), Label Direct / Qualified / Synthesis.
5. **Stopp.** Chris prüft v2.

## Modus v3: Beispiele

Grundlage: `<ordner>/skript-v2-community.md`.

1. Stellen finden, die ohne Beispiel abstrakt bleiben. Nicht jede Stelle braucht eins.
2. Pro Stelle das beste Beispiel wählen, in dieser Reihenfolge:
   - **eigene Sessions:** passende echte Arbeit von Chris aus `~/.claude/projects/*/*.jsonl` und `~/.codex/sessions/` suchen. Nur Chris' eigene Arbeit, keine Kundennamen oder Zahlen, die privat sind.
   - **Community:** Beispiele aus dem EA Brain, in eigenen Worten
   - **erfunden:** ein klar gebautes Beispiel zur Veranschaulichung ("Nehmen wir mal an ...")
3. Speichern: `<ordner>/skript-v3-beispiele.md`. In `quellen.md` unter "v3" pro Beispiel die Herkunft (Session-Datei, Skool-Link oder "erfunden").
4. **Stopp.** Chris prüft v3.

## Am Ende sagen

Was sich geändert hat (Liste der Stellen), was im Faktencheck korrigiert oder gestrichen wurde, und den nächsten Schritt: nach v2 `skript-anreichern <ordner> v3`, nach v3 `sprechfassung <ordner>`. Läuft die Kette über `skript-partner`, fragt er nach jeder Stufe, ob es weitergeht.
