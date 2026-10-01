"""Turns a concept plus the teardown of its reference into one JSON image prompt.

The image model never draws the headline: it gets "no text" and an empty zone,
the headline is set afterwards with a real font (text.py). Fixed fields close the
gaps a free-text prompt leaves open (light, position, empty zones), and the
preserve list for the face travels with every render.
"""
from __future__ import annotations

from pathlib import Path

from . import util

PRESERVE = [
    "face shape and natural proportions (never wider, never younger)",
    "facial features, eyes, nose and teeth",
    "hairline and hair volume",
    "beard shape and colour",
    "skin tone and texture",
]
FINISH = (
    "Premium, photographic thumbnail. Objects are real 3D: glossy or matte material, real contact shadows, "
    "lit by the same key light as the person. Never flat clip-art icons or stock pictograms. "
    "Natural skin texture, no over-sharpening, no plastic retouch, no orange cast. Clean, high contrast, "
    "one clear focal point, readable at 160 px wide."
)
NO_TEXT = (
    "NO text anywhere: no letters, numbers, words, logos, UI labels or watermarks, also not on objects or screens. "
    "A headline is added later; keep its zone calm and empty."
)
BASE_AVOID = [
    "any text, letters or numbers",
    "brand logos other than the ones named in the concept",
    "clutter, extra icons, arrows, particles, light streaks",
    "hands, faces or objects in the bottom-right corner",
    "split or two-tone backgrounds unless the concept asks for one",
    "wide-angle distortion of the face",
]
# Teardown fields that describe the look (references/teardown-prompt.md). text steers the code typography,
# the analysis fields steer the concepts; neither goes into the image prompt.
STYLE_FIELDS = ["layout", "person", "object", "background", "camera", "lighting", "palette", "mood"]


def style_for(run: Path, ref_id: str | None, face: bool) -> tuple[dict, Path | None]:
    if not ref_id:
        return {}, None
    style = util.read_json(run / "styles" / f"{ref_id}.json", default={})
    thumbnail = run / "refs" / f"{ref_id}.jpg"
    fields = [key for key in STYLE_FIELDS if face or key != "person"]
    look = {key: style[key] for key in fields if style.get(key)}
    if "person" in look:
        look["person"] = {"note": "style of the reference's host only (pose, framing, light); the identity comes from the face photos", **look["person"]} if isinstance(look["person"], dict) else look["person"]
    return look, (thumbnail if thumbnail.exists() else None)


def build(run: Path, concept: dict) -> dict:
    intake = util.read_json(run / "intake.json")
    face = concept.get("face", intake.get("mode") == "face")
    photos = [run / "photos" / name for name in intake.get("photos", [])][:3] if face else []
    if face and not photos:
        # Without photos the image model invents a stranger; never render a fake host.
        raise SystemExit(f"Concept {concept['id']} wants a face, but this run has no photos. Add them with "
                         f"`lab.py photos {run} --dir <folder>` or set \"face\": false.")
    style, ref_image = style_for(run, concept.get("style_ref"), face)

    images, roles = [], []
    for photo in photos:
        images.append(photo)
        roles.append({"image": len(images), "role": "identity of the creator (face photo). Photograph this person anew in this scene; never paste or copy the photo, its clothes or its background."})
    if ref_image:
        images.append(ref_image)
        roles.append({"image": len(images), "role": "style reference only: light, colour, depth, material, framing. Ignore its people, logos and words."})

    person = concept.get("person") or {}
    request = {
        "task": "Create one YouTube thumbnail image, 16:9, for the video below.",
        "video_title": concept.get("title") or intake.get("title"),
        "promise": concept.get("promise", ""),
        "input_images": roles,
        "layout": {
            "composition": concept.get("composition", ""),
            "keep_empty": [z for z in [concept.get("keep_empty"), "bottom-right corner, 20% of width x 18% of height: background only (YouTube shows the video length there)"] if z],
            "focal_points": "at most three: " + ", ".join(x for x in ["the person" if face else "", "the object", "the empty headline zone"] if x),
        },
        "person": ({
            "who": "the creator from the face photos",
            "preserve": PRESERVE,
            "position": person.get("position", ""),
            "size": person.get("size", "face about 40% of the frame height, chest up, cropped at the bottom edge"),
            "expression": person.get("expression", "genuine warm laugh, eyes into the camera"),
            "gesture": person.get("gesture", "no hands in the frame"),
            "clothing": person.get("clothing", "plain, well-fitting hoodie or t-shirt without print"),
        } if face else "No face and no identifiable person. Hands, legs or feet only if the object field asks for them."),
        "object": concept.get("object", ""),
        "background": concept.get("background", ""),
        "lighting": concept.get("lighting", ""),
        "palette": concept.get("palette", ""),
        "style_from_reference": style,
        "finish": FINISH,
        "text": NO_TEXT,
        "avoid": BASE_AVOID + list(concept.get("avoid", [])),
    }
    return {"prompt": request, "images": [str(p) for p in images]}
