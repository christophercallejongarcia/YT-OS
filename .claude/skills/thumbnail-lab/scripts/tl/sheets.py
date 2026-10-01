"""Contact sheets, phone-size previews, a mock feed and the parameter table."""
from __future__ import annotations

import html
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from . import util

BG, FG, MUTED, ACCENT = "#0f0f0f", "#f1f1f1", "#aaaaaa", "#D97757"
PHONE = (168, 94)  # thumbnail size in the YouTube sidebar and small phone lists


def _label_font(size: int):
    for candidate in ("/System/Library/Fonts/Helvetica.ttc", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "C:/Windows/Fonts/arial.ttf"):
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.truetype(str(util.FONTS["archivo"]), size)


def grid(tiles: list[tuple[Path, str, bool]], out: Path, columns: int = 3, tile=(480, 270), title: str = "") -> Path:
    """tiles: (image, label, highlight). Labels sit below the image, never on it."""
    columns = max(1, columns)
    rows = (len(tiles) + columns - 1) // columns
    pad, label_h, head = 16, 30, 50 if title else 10
    sheet = Image.new("RGB", (columns * (tile[0] + pad) + pad, head + rows * (tile[1] + label_h + pad) + pad), BG)
    draw = ImageDraw.Draw(sheet)
    if title:
        draw.text((pad, 14), title, fill=FG, font=_label_font(22))
    for index, (path, label, highlight) in enumerate(tiles):
        x = pad + (index % columns) * (tile[0] + pad)
        y = head + (index // columns) * (tile[1] + label_h + pad)
        image = util.fit_16x9(Image.open(path)).resize(tile)
        sheet.paste(image, (x, y))
        if highlight:
            draw.rectangle((x - 3, y - 3, x + tile[0] + 2, y + tile[1] + 2), outline=ACCENT, width=3)
        draw.text((x, y + tile[1] + 6), label, fill=FG if highlight else MUTED, font=_label_font(15))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out)
    return out


def _finals(run: Path) -> list[Path]:
    return sorted((run / "finals").glob("C*-v*.png"))


def review(run: Path) -> list[Path]:
    finals = _finals(run)
    if not finals:
        raise SystemExit("No finals yet. Run `lab.py text` for your renders first.")
    concepts = {c["id"]: c for c in util.read_json(run / "concepts.json", default={"concepts": []}).get("concepts", [])}
    refs = util.read_json(run / "refs.json", default=[])

    # 1. All finals with their phone-size preview next to the label.
    pad, tile, label_h = 16, (560, 315), 120
    columns = 2
    rows = (len(finals) + 1) // 2
    sheet = Image.new("RGB", (columns * (tile[0] + pad) + pad, 60 + rows * (tile[1] + label_h + pad)), BG)
    draw = ImageDraw.Draw(sheet)
    draw.text((pad, 18), f"{util.read_json(run / 'intake.json')['title']} · all finals (left: full size, right: phone size 168 px)", fill=FG, font=_label_font(20))
    for index, path in enumerate(finals):
        x = pad + (index % columns) * (tile[0] + pad)
        y = 60 + (index // columns) * (tile[1] + label_h + pad)
        image = Image.open(path).convert("RGB")
        sheet.paste(image.resize(tile), (x, y))
        sheet.paste(image.resize(PHONE), (x + tile[0] - PHONE[0], y + tile[1] + 8))
        concept = concepts.get(path.stem.split("-v")[0], {})
        warnings = util.read_json(path.with_suffix(".text.json"), default={}).get("warnings", [])
        draw.text((x, y + tile[1] + 8), path.stem, fill=ACCENT, font=_label_font(20))
        draw.text((x, y + tile[1] + 36), (concept.get("format") or "")[:40], fill=FG, font=_label_font(15))
        draw.text((x, y + tile[1] + 58), (concept.get("title") or "")[:46], fill=MUTED, font=_label_font(14))
        if warnings:
            draw.text((x, y + tile[1] + 80), f"{len(warnings)} text warning(s)", fill="#ff6b6b", font=_label_font(14))
    sheet_path = run / "review" / "sheet.png"
    sheet.save(sheet_path)

    # 2. Mock phone feed: every final between two references, with its title, as PNG and HTML.
    ref_images = [run / r["thumbnail"] for r in refs if (run / r["thumbnail"]).exists()]
    column_w, thumb_h = 360, 203
    feed_columns = []
    for index, path in enumerate(finals):
        neighbours = [ref_images[(2 * index) % len(ref_images)], ref_images[(2 * index + 1) % len(ref_images)]] if ref_images else []
        items = []
        if neighbours:
            items.append((neighbours[0], refs[(2 * index) % len(refs)]["title"], refs[(2 * index) % len(refs)]["channel"]))
        concept = concepts.get(path.stem.split("-v")[0], {})
        items.append((path, concept.get("title") or path.stem, "You"))
        if len(neighbours) > 1:
            items.append((neighbours[1], refs[(2 * index + 1) % len(refs)]["title"], refs[(2 * index + 1) % len(refs)]["channel"]))
        feed_columns.append((path.stem, items))
    per_row = 4
    rows = (len(feed_columns) + per_row - 1) // per_row
    cell_h = 3 * (thumb_h + 70) + 40
    feed = Image.new("RGB", (per_row * (column_w + 20) + 20, rows * cell_h + 20), BG)
    draw = ImageDraw.Draw(feed)
    for index, (stem, items) in enumerate(feed_columns):
        x = 20 + (index % per_row) * (column_w + 20)
        y = 20 + (index // per_row) * cell_h
        draw.text((x, y), stem, fill=ACCENT, font=_label_font(18))
        y += 30
        for image_path, title, channel in items:
            feed.paste(util.fit_16x9(Image.open(image_path)).resize((column_w, thumb_h)), (x, y))
            draw.text((x, y + thumb_h + 6), title[:42], fill=FG, font=_label_font(15))
            draw.text((x, y + thumb_h + 28), channel[:30], fill=MUTED, font=_label_font(13))
            y += thumb_h + 70
    feed_path = run / "review" / "feed.png"
    feed.save(feed_path)

    cards = []
    for stem, items in feed_columns:
        cells = "".join(
            f'<div class="card{" mine" if channel == "You" else ""}"><img src="../{html.escape(str(Path(p).relative_to(run)))}"><b>{html.escape(t)}</b><span>{html.escape(channel)}</span></div>'
            for p, t, channel in items
        )
        cards.append(f'<section><h2>{html.escape(stem)}</h2>{cells}</section>')
    (run / "review" / "feed.html").write_text(
        "<!doctype html><meta charset=utf-8><title>thumbnail-lab feed</title><style>"
        "body{background:#0f0f0f;color:#f1f1f1;font:14px system-ui;margin:20px;display:flex;flex-wrap:wrap;gap:24px}"
        "section{width:360px}h2{color:#D97757;font-size:16px}.card{margin-bottom:18px}.card img{width:360px;border-radius:12px;display:block}"
        ".card b{display:block;margin-top:8px;font-weight:600}.card span{color:#aaa;font-size:12px}.card.mine img{outline:2px solid #D97757}"
        "</style>" + "".join(cards), encoding="utf-8")
    return [sheet_path, feed_path, run / "review" / "feed.html"]


def final(run: Path, picks: list[str]) -> list[Path]:
    concepts = {c["id"]: c for c in util.read_json(run / "concepts.json", default={"concepts": []}).get("concepts", [])}
    intake = util.read_json(run / "intake.json")
    tiles, rows = [], []
    for pick in picks:
        path = run / "finals" / f"{pick}.png"
        if not path.exists():
            raise SystemExit(f"{path} does not exist.")
        concept = concepts.get(pick.split("-v")[0], {})
        meta = util.read_json(run / "renders" / f"{pick}.meta.json", default={})
        text_spec = util.read_json(path.with_suffix(".text.json"), default={}).get("spec", {})
        headline = " / ".join("".join(s["text"] for s in (l.get("segments") or [{"text": l.get("text", "")}])) for l in text_spec.get("lines", []))
        tiles.append((path, f"{pick} · {concept.get('title', '')[:52]}", True))
        rows.append([pick, concept.get("title", ""), headline, concept.get("hook_line", ""), concept.get("format", ""), concept.get("style_ref", ""),
                     "face" if meta.get("face") else "no face", meta.get("backend", ""), meta.get("model", ""), f"renders/{pick}.prompt.json", f"finals/{pick}.text.json"])
    sheet = grid(tiles, run / "final" / "contact-sheet.png", columns=len(tiles), tile=(640, 360), title=f"{intake['title']} · best {len(tiles)}")
    # Phone strip under the sheet.
    full = Image.open(sheet)
    strip = Image.new("RGB", (full.width, PHONE[1] + 56), BG)
    ImageDraw.Draw(strip).text((16, 8), "phone size (168 px), as in the YouTube sidebar", fill=MUTED, font=_label_font(15))
    for index, (path, _, _) in enumerate(tiles):
        strip.paste(Image.open(path).convert("RGB").resize(PHONE), (16 + index * (PHONE[0] + 16), 36))
    combined = Image.new("RGB", (full.width, full.height + strip.height), BG)
    combined.paste(full, (0, 0))
    combined.paste(strip, (0, full.height))
    combined.save(run / "final" / "contact-sheet.png")

    header = ["pick", "title", "thumbnail text", "first hook line", "format", "style reference", "mode", "backend", "model", "prompt", "text spec"]
    table = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]
    table += ["| " + " | ".join(str(c).replace("|", "/") for c in row) + " |" for row in rows]
    params = run / "final" / "params.md"
    params.write_text(f"# {intake['title']}: parameters to reproduce\n\n" + "\n".join(table) + "\n\nRe-render a pick: `uv run scripts/lab.py render RUN --concept <id>` then `text`. Prompts are stored verbatim.\n", encoding="utf-8")
    util.write_json(run / "final" / "picks.json", {"picks": picks, "rows": rows})
    return [run / "final" / "contact-sheet.png", params]
