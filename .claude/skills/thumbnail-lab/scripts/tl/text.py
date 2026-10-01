"""Sets the headline with a bundled OFL font and checks it.

concept["text"]:
{
  "font": "anton", "align": "left", "x": 0.045, "y": 0.07, "size": 0.19,
  "max_width": 0.5, "line_gap": 0.025, "shadow": true, "stroke": 0,
  "lines": [
    {"segments": [{"text": "WHERE ARE", "color": "#141414"}]},
    {"text": "YOU?", "color": "#D97757"}
  ]
}
Positions and sizes are shares of the image (size = font size / image height, y = top of
the capitals). A line may override font, size, x, y, align and max_width; without its own
y it sits below the previous line. "role": "label" marks small labels (column numbers,
captions) that are exempt from the size and word-count checks.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageStat

from . import util


def _rgb(hex_color: str) -> tuple[int, int, int]:
    value = hex_color.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def _luminance(rgb) -> float:
    def channel(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (channel(c) for c in rgb[:3])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b) -> float:
    la, lb = sorted((_luminance(a), _luminance(b)), reverse=True)
    return round((la + 0.05) / (lb + 0.05), 2)


def layout(spec: dict, width: int, height: int) -> list[dict]:
    """Pixel boxes and glyph runs for every line, without drawing."""
    placed, cursor_y = [], None
    for line in spec.get("lines", []):
        font_name = line.get("font", spec.get("font", "anton"))
        font_path = util.FONTS.get(font_name)
        if not font_path:
            raise SystemExit(f"Unknown font {font_name}. Bundled: {', '.join(util.FONTS)}")
        segments = line.get("segments") or [{"text": line.get("text", ""), "color": line.get("color", spec.get("color", "#FFFFFF"))}]
        size = line.get("size", spec.get("size", 0.15)) * height
        max_width = line.get("max_width", spec.get("max_width", 0.9)) * width
        font = ImageFont.truetype(str(font_path), int(size))
        line_width = sum(font.getlength(s["text"]) for s in segments)
        if line_width > max_width:
            size *= max_width / line_width
            font = ImageFont.truetype(str(font_path), int(size))
            line_width = sum(font.getlength(s["text"]) for s in segments)
        cap_top, cap_bottom = font.getbbox("H")[1], font.getbbox("H")[3]
        cap_height = cap_bottom - cap_top
        if "y" in line:
            top = line["y"] * height
        elif cursor_y is not None:
            top = cursor_y + spec.get("line_gap", 0.025) * height
        else:
            top = spec.get("y", 0.07) * height
        anchor_x = line.get("x", spec.get("x", 0.05)) * width
        align = line.get("align", spec.get("align", "left"))
        left = anchor_x - line_width / 2 if align == "center" else anchor_x - line_width if align == "right" else anchor_x
        placed.append({"font": font, "segments": segments, "left": left, "draw_y": top - cap_top, "role": line.get("role", "headline"),
                       "box": (left, top, left + line_width, top + cap_height), "cap_height": cap_height})
        cursor_y = top + cap_height
    return placed


def draw(image: Image.Image, spec: dict) -> tuple[Image.Image, list[dict]]:
    image = image.convert("RGBA")
    width, height = image.size
    placed = layout(spec, width, height)
    stroke = int(spec.get("stroke", 0) * height / 100) if spec.get("stroke") else 0
    if spec.get("shadow", True):
        shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
        drawer = ImageDraw.Draw(shadow)
        offset = max(2, int(height * 0.006))
        for line in placed:
            x = line["left"]
            for segment in line["segments"]:
                drawer.text((x, line["draw_y"] + offset), segment["text"], font=line["font"], fill=(0, 0, 0, 120), stroke_width=stroke)
                x += line["font"].getlength(segment["text"])
        image = Image.alpha_composite(image, shadow.filter(ImageFilter.GaussianBlur(height * 0.008)))
    drawer = ImageDraw.Draw(image)
    for line in placed:
        x = line["left"]
        for segment in line["segments"]:
            drawer.text((x, line["draw_y"]), segment["text"], font=line["font"], fill=segment.get("color", "#FFFFFF"),
                        stroke_width=stroke, stroke_fill=spec.get("stroke_color", "#000000"))
            x += line["font"].getlength(segment["text"])
    return image.convert("RGB"), placed


def check(original: Image.Image, placed: list[dict]) -> list[str]:
    """Hard rules: corner free, readable size, enough contrast, not too many words."""
    width, height = original.size
    warnings = []
    corner_x, corner_y = util.CORNER[0] * width, util.CORNER[1] * height
    words = 0
    for index, line in enumerate(placed, 1):
        left, top, right, bottom = line["box"]
        text = "".join(s["text"] for s in line["segments"])
        if right > corner_x and bottom > corner_y:
            warnings.append(f"line {index} '{text}' reaches into the bottom-right corner (video length badge)")
        if left < 0 or right > width or top < 0 or bottom > height:
            warnings.append(f"line {index} '{text}' leaves the image")
        if line["role"] == "label":
            pass  # small on purpose: column numbers, captions
        elif line["cap_height"] < 0.06 * height:
            warnings.append(f"line {index} '{text}' is small: capitals {line['cap_height'] / height:.0%} of height, aim for 8% or more for the headline (or mark it \"role\": \"label\")")
        else:
            words += len(text.split())
        region = original.crop((max(0, int(left)), max(0, int(top)), min(width, int(right)), min(height, int(bottom))))
        if region.width and region.height:
            background = tuple(int(v) for v in ImageStat.Stat(region.convert("RGB")).median)
            for segment in line["segments"]:
                ratio = contrast(_rgb(segment.get("color", "#FFFFFF")), background)
                if ratio < 3:
                    warnings.append(f"line {index} '{segment['text']}' contrast {ratio}:1 against the image behind it, aim for 4.5:1")
    if words > 5:
        warnings.append(f"{words} headline words; strong thumbnails use 2 to 4")
    return warnings


def apply(run: Path, concept: dict, variant: int | None = None) -> tuple[Path, list[str]]:
    spec = concept.get("text") or {"lines": []}
    renders = sorted((run / "renders").glob(f"{concept['id']}-v{variant}.png" if variant else f"{concept['id']}-v*.png"))
    if not renders:
        raise SystemExit(f"No render for {concept['id']} yet. Run `lab.py render` first.")
    out, all_warnings = None, []
    for render in renders:
        original = Image.open(render).convert("RGB")
        # No lines: a deliberately text-free thumbnail (common in food, travel, product niches).
        final, placed = draw(original, spec) if spec.get("lines") else (original, [])
        out = run / "finals" / render.name
        final.save(out)
        warnings = check(original, placed)
        util.write_json(out.with_suffix(".text.json"), {"spec": spec, "warnings": warnings, "boxes": [[round(v) for v in p["box"]] for p in placed]})
        all_warnings += [f"{render.stem}: {w}" for w in warnings]
    return out, all_warnings
