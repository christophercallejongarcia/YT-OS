"""Builds the image prompt: the remixed teardown JSON of a template, sent as it is.

The teardown is the complete JSON a model writes for a proven thumbnail ("Give me the
complete JSON for this image."), often 10,000 characters and more. A remix is a copy in
which only content fields changed (headline, objects, the person). No recipe, rule list or
extra wording is added: the only addition is `input_images`, naming the role of the creator's
photo and of the template. In code-text mode one rule asks for an image without lettering.
"""
from __future__ import annotations

from pathlib import Path

from . import util

NO_TEXT = (
    "NO text anywhere: no letters, numbers, words, logos or labels, also not on objects or screens. "
    "The headline is added later in code; keep its zone calm and empty."
)
PHOTO_ROLE = "photo of the creator; the person in this JSON is this person: face, hair, beard, skin tone and eye colour exactly from this image"
TEMPLATE_ROLE = "the original thumbnail this JSON describes; style reference only, do not copy its person, its logos or its text"


def template(run: Path, ref_id: str) -> dict:
    path = run / "styles" / f"{ref_id}.json"
    if not path.exists():
        raise SystemExit(f"No teardown for {ref_id}. Save the complete JSON of refs/{ref_id}.jpg as {path} first (step 3).")
    return util.read_json(path)


def remix(run: Path, concept_id: str) -> dict:
    path = run / "remix" / f"{concept_id}.json"
    if not path.exists():
        raise SystemExit(f"No remix for {concept_id}. Copy the template's teardown to {path} and swap only the content fields (step 4).")
    return util.read_json(path)


def changed_fields(before, after, path: str = "") -> list[str]:
    """Leaf paths that differ between the teardown and the remix, so the swap stays visible."""
    if isinstance(before, dict) and isinstance(after, dict):
        out = []
        for key in list(before) + [k for k in after if k not in before]:
            out += changed_fields(before.get(key), after.get(key), f"{path}.{key}" if path else str(key))
        return out
    if isinstance(before, list) and isinstance(after, list) and len(before) == len(after):
        out = []
        for index, (a, b) in enumerate(zip(before, after)):
            out += changed_fields(a, b, f"{path}[{index}]")
        return out
    return [] if before == after else [path or "(root)"]


def leaf_count(value) -> int:
    if isinstance(value, dict):
        return sum(leaf_count(v) for v in value.values()) or 1
    if isinstance(value, list):
        return sum(leaf_count(v) for v in value) or 1
    return 1


def build(run: Path, concept: dict) -> dict:
    intake = util.read_json(run / "intake.json")
    face = concept.get("face", intake.get("mode") == "face")
    photos = intake.get("photos", [])
    if face and not photos:
        # Without a photo the image model invents a stranger; never render a fake host.
        raise SystemExit(f"Concept {concept['id']} wants a face, but this run has no photos. Add them with "
                         f"`lab.py photos {run} --dir <folder>` or set \"face\": false.")
    ref_id = concept.get("style_ref")
    if not ref_id:
        raise SystemExit(f"Concept {concept['id']} has no style_ref: every concept remixes one torn-down template.")
    source = template(run, ref_id)
    body = remix(run, concept["id"])
    body.pop("input_images", None)

    images, roles = [], {}
    if face:
        photo = run / "photos" / concept.get("photo", photos[0])
        if not photo.exists():
            raise SystemExit(f"Photo {photo.name} not found in {run / 'photos'}.")
        images.append(photo)
        roles[f"Image {len(images)}"] = PHOTO_ROLE
    ref_image = run / "refs" / f"{ref_id}.jpg"
    if concept.get("send_template", True) and ref_image.exists():
        images.append(ref_image)
        roles[f"Image {len(images)}"] = TEMPLATE_ROLE

    request = ({"input_images": roles} if roles else {}) | body
    if (concept.get("text") or {}).get("lines"):
        request["text_rule"] = NO_TEXT
    changed = changed_fields(source, body)
    return {"prompt": request, "images": [str(p) for p in images], "changed": changed,
            "changed_share": round(len(changed) / leaf_count(source), 2)}
