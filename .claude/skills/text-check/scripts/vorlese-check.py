#!/usr/bin/env python3
"""vorlese-check: misst, ob ein Skript beim Vorlesen nach KI klingt.

Aufruf:
  vorlese-check.py <datei.md>            Bericht, Exit 0 bestanden, 1 nicht bestanden
  vorlese-check.py <datei.md> --json     dasselbe als JSON

Gezählt wird nur Fließtext, den Chris vorliest. Überschriften, Stichpunkte,
Frontmatter, Code-Blöcke und Regie-Zeilen in eckigen Klammern zählen nicht.

Hart (Nicht bestanden):
  - Stakkato: 3 oder mehr Sätze mit höchstens 6 Wörtern in Folge
  - Median der Satzlänge unter 11 Wörtern
  - mehr als 20 Prozent kurze Sätze (höchstens 6 Wörter)
  - Selbstfrage mit Antwort ("Das Ergebnis? Mehr Zeit.")
  - binärer Kontrast "nicht X, sondern Y"
  - "Punkt." als Satzende
Weich (einzeln bewerten):
  - Doppelpunkt-Enthüllung im Fließtext
  - Dreierliste "X, Y und Z"
  - dreimal derselbe Satzanfang in Folge
  - Satz über 35 Wörter
  - Median der Satzlänge über 20 Wörtern (klingt nach Schriftsprache)

Ziel für gesprochenen Text: Median 13 bis 16 Wörter.

Die Werte gelten für das ganze Skript und zusätzlich für den Abschnitt "Hook".
Die Grenzwerte kommen aus der Messung von Talking-Head-Videos (Ticket 26).
"""
import json
import re
import statistics
import sys

KURZ = 6
MEDIAN_MIN = 11
MEDIAN_MAX = 20
KURZ_ANTEIL_MAX = 0.20
UEBERLANG = 35

ABKUERZUNGEN = [
    "z. B.", "z.B.", "d. h.", "d.h.", "u. a.", "u.a.", "bzw.", "ca.", "usw.",
    "etc.", "Nr.", "Dr.", "vs.", "inkl.", "evtl.", "ggf.", "bspw.", "Mio.", "Mrd.",
]
ANREDE = re.compile(r"\b(du|dir|dich|dein\w*|ihr|euch)\b", re.I)
# Dreierliste "A, B und C": Glieder mit höchstens zwei Wörtern, das mittlere
# Glied beginnt nicht mit Pronomen oder Konjunktion (sonst ist es ein Nebensatz).
_G = r"[\wäöüÄÖÜß-]+(?: [\wäöüÄÖÜß-]+)?"
_NS = r"(?!(?:ich|du|er|sie|es|wir|ihr|man|dann|dass|weil|wenn|was|wie|wer|wo|der|die|das|den|dem|also|aber|und)\b)"
DREIER = re.compile(r"\b" + _G + r", " + _NS + _G + r" und [\wäöüÄÖÜß-]+", re.I)
WORT = re.compile(r"[0-9A-Za-zÄÖÜäöüß'’]+")


def fliesstext(zeilen):
    """Liefert (zeilennummer, text, abschnitt) für jede vorlesbare Zeile."""
    fm = False
    fence = False
    abschnitt = ""
    for nr, zeile in enumerate(zeilen, 1):
        s = zeile.strip()
        if nr == 1 and s == "---":
            fm = True
            continue
        if fm:
            if s == "---":
                fm = False
            continue
        if s.startswith("```"):
            fence = not fence
            continue
        if fence or not s:
            continue
        if s.startswith("#"):
            abschnitt = s.lstrip("#").strip()
            continue
        if re.match(r"^([-*+>]|\d+\.)\s", s):
            continue  # Stichpunkte, Zitate, Listen
        if re.match(r"^\[.*\]$", s) or re.match(r"^\*\*?\[.*\]\*?\*?$", s):
            continue  # Regie-Zeile
        if re.match(r"^\*\*[^*]+:\*\*", s) or re.match(r"^[A-Za-zÄÖÜäöüß ]{1,30}:\s*$", s):
            continue  # Label-Zeile
        s = re.sub(r"\[[^\]]*\]", " ", s)  # Regie mitten im Text
        s = s.replace("**", "").replace("*", "")
        yield nr, s, abschnitt


def saetze(zeilen):
    """Zerlegt den Fließtext in Sätze mit Zeilennummer und Abschnitt."""
    out = []
    for nr, text, abschnitt in fliesstext(zeilen):
        t = text
        for i, a in enumerate(ABKUERZUNGEN):
            t = t.replace(a, a.replace(".", f"§{i}§"))
        teile = re.split(r"(?<=[.!?…])[\"“”«»)]*\s+", t)
        for teil in teile:
            teil = re.sub(r"§\d+§", ".", teil).strip()
            if not teil:
                continue
            woerter = WORT.findall(teil)
            if not woerter:
                continue
            out.append({"zeile": nr, "abschnitt": abschnitt, "text": teil, "woerter": len(woerter)})
    return out


def kennzahlen(liste):
    if not liste:
        return {"saetze": 0, "median": 0, "kurz_anteil": 0}
    laengen = [s["woerter"] for s in liste]
    kurz = sum(1 for n in laengen if n <= KURZ)
    woerter = sum(laengen)
    return {
        "saetze": len(liste),
        "woerter": woerter,
        "minuten": round(woerter / 2.3 / 60, 1),
        "median": statistics.median(laengen),
        "kurz_anteil": round(kurz / len(liste), 3),
    }


def befunde(liste):
    out = []

    def add(schwere, pruefung, s, hinweis):
        out.append({"schwere": schwere, "pruefung": pruefung, "zeile": s["zeile"],
                    "zitat": s["text"][:140], "hinweis": hinweis})

    # Stakkato
    lauf = []
    for s in liste + [{"woerter": 999}]:
        if s["woerter"] <= KURZ:
            lauf.append(s)
            continue
        if len(lauf) >= 3:
            add("HART", "Stakkato", lauf[0],
                f"{len(lauf)} kurze Sätze in Folge. Mit und, weil, wenn oder also zu einem Gedanken verbinden.")
        lauf = []

    for i, s in enumerate(liste):
        t = s["text"]
        naechster = liste[i + 1] if i + 1 < len(liste) else None
        vorher = liste[i - 1] if i > 0 else None
        # Selbstfrage mit Antwort, nicht mitten in einer Fragenreihe
        if (t.endswith("?") and s["woerter"] <= 4 and not ANREDE.search(t)
                and not (vorher and vorher["text"].endswith("?"))
                and naechster and not naechster["text"].endswith("?")
                and naechster["woerter"] <= 12 and naechster["zeile"] == s["zeile"]):
            add("HART", "Selbstfrage mit Antwort", s,
                "Frage und Antwort in einem Satz sagen, so wie man es erzählt.")
        # binärer Kontrast
        if re.search(r"\bnicht\b[^.!?]{0,80},\s*sondern\b", t, re.I):
            add("HART", "binärer Kontrast", s, "Direkt sagen, was gilt. Das Gegenteil weglassen.")
        # Punkt als Satzende
        if re.search(r"\bPunkt\.$", t):
            add("HART", "\"Punkt.\" als Satzende", s, "Streichen.")
        # Doppelpunkt-Enthüllung
        if re.search(r":\s+[^„\"“]", t) and not re.search(r":\s*$", t):
            add("WEICH", "Doppelpunkt-Enthüllung", s,
                "Prüfen: klingt das nach Folie? Dann als normalen Satz sagen.")
        # Dreierliste
        if DREIER.search(t):
            add("WEICH", "Dreierliste", s, "Prüfen: braucht es alle drei? Zwei oder vier klingen weniger gebaut.")
        # Überlänge
        if s["woerter"] > UEBERLANG:
            add("WEICH", "Satz über 35 Wörter", s, "Laut lesen. Wo Luft fehlt, teilen.")
        # gleicher Satzanfang
        if i >= 2:
            a = [WORT.findall(x["text"])[0].lower() for x in liste[i - 2:i + 1]]
            if a[0] == a[1] == a[2]:
                add("WEICH", "dreimal derselbe Satzanfang", s, f"Dreimal \"{a[0]}\" am Anfang. Einen Satz umbauen.")
    return out


def pruefe(pfad):
    with open(pfad, encoding="utf-8") as f:
        zeilen = f.read().splitlines()
    liste = saetze(zeilen)
    hook = [s for s in liste if s["abschnitt"].lower().startswith("hook")]
    gesamt = kennzahlen(liste)
    hook_k = kennzahlen(hook)
    alle = befunde(liste)

    def grenzen(k, name):
        out = []
        if k["saetze"] == 0:
            return out
        if k["median"] < MEDIAN_MIN:
            out.append({"schwere": "HART", "pruefung": f"Median Satzlänge ({name})", "zeile": 0,
                        "zitat": f"{k['median']} Wörter", "hinweis": f"Ziel mindestens {MEDIAN_MIN}."})
        if k["kurz_anteil"] > KURZ_ANTEIL_MAX:
            out.append({"schwere": "HART", "pruefung": f"Anteil kurzer Sätze ({name})", "zeile": 0,
                        "zitat": f"{round(k['kurz_anteil'] * 100)} Prozent",
                        "hinweis": f"Ziel höchstens {round(KURZ_ANTEIL_MAX * 100)} Prozent."})
        return out

    alle = grenzen(gesamt, "gesamt") + grenzen(hook_k, "Hook") + alle
    hart = [b for b in alle if b["schwere"] == "HART"]
    return {
        "datei": pfad,
        "bestanden": not hart,
        "gesamt": gesamt,
        "hook": hook_k,
        "befunde": alle,
    }


def bericht(r):
    z = []
    z.append(f"vorlese-check: {r['datei']}")
    z.append("BESTANDEN" if r["bestanden"] else "NICHT BESTANDEN")
    for name in ("gesamt", "hook"):
        k = r[name]
        if k["saetze"]:
            z.append(f"  {name}: {k['saetze']} Sätze, {k['woerter']} Wörter (ca. {k['minuten']} min), "
                     f"Median {k['median']} Wörter, kurz {round(k['kurz_anteil'] * 100)} Prozent")
        else:
            z.append(f"  {name}: kein Fließtext gefunden")
    for b in r["befunde"]:
        ort = f"Z{b['zeile']}" if b["zeile"] else "gesamt"
        z.append(f"  [{b['schwere']}] {ort} {b['pruefung']}: {b['zitat']}")
        z.append(f"         {b['hinweis']}")
    return "\n".join(z)


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        sys.exit(2)
    r = pruefe(args[0])
    print(json.dumps(r, ensure_ascii=False, indent=2) if "--json" in sys.argv else bericht(r))
    sys.exit(0 if r["bestanden"] else 1)
