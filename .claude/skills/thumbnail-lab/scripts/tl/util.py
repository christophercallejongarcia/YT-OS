"""Run folders, JSON files, image helpers and the doctor check."""
from __future__ import annotations

import datetime as dt
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

SKILL_DIR = Path(__file__).resolve().parents[2]
FONTS = {
    "anton": SKILL_DIR / "assets" / "fonts" / "Anton-Regular.ttf",
    "archivo": SKILL_DIR / "assets" / "fonts" / "ArchivoBlack-Regular.ttf",
}
# Final thumbnail size; YouTube recommends 1280x720.
WIDTH, HEIGHT = 1280, 720
# YouTube prints the video length here; nothing important may sit in it.
CORNER = (0.80, 0.80)
PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}


def slugify(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value[:40] or "run"


def read_json(path: Path, default=None):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except FileNotFoundError:
        if default is not None:
            return default
        raise


def write_json(path: Path, data) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def new_run(title: str, audience: str, photos: str | None, faceless: bool, out: str) -> Path:
    if photos and faceless:
        sys.exit("Choose either --photos (face mode) or --faceless, not both.")
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M")
    run = Path(out).expanduser().resolve() / f"{slugify(title)}-{stamp}"
    for sub in ("refs", "styles", "renders", "finals", "review", "final"):
        (run / sub).mkdir(parents=True, exist_ok=True)
    copied = copy_photos(run, photos) if photos else []
    write_json(run / "intake.json", {
        "title": title,
        "audience": audience,
        "mode": "face" if copied else "faceless",
        "photos": copied,
        "created": dt.datetime.now().isoformat(timespec="seconds"),
    })
    return run


def copy_photos(run: Path, folder: str) -> list[str]:
    source = Path(folder).expanduser()
    files = sorted(p for p in source.iterdir() if p.suffix.lower() in PHOTO_EXTENSIONS) if source.is_dir() else []
    if not files:
        sys.exit(f"No photos (.jpg, .png, .webp) found in {source}.")
    (run / "photos").mkdir(exist_ok=True)
    copied = []
    for index, file in enumerate(files[:5], 1):
        image = ImageOps.exif_transpose(Image.open(file)).convert("RGB")
        image.thumbnail((1536, 1536))
        target = run / "photos" / f"face-{index}.jpg"
        image.save(target, quality=92)
        copied.append(target.name)
    return copied


def add_photos(run: Path, folder: str) -> list[str]:
    """Face photos for a run that started faceless (or new photos for a face run)."""
    copied = copy_photos(run, folder)
    intake = read_json(run / "intake.json")
    intake.update({"photos": copied, "mode": "face"})
    write_json(run / "intake.json", intake)
    return copied


def require_run(value: str) -> Path:
    run = Path(value).expanduser().resolve()
    if not (run / "intake.json").exists():
        sys.exit(f"{run} is not a thumbnail-lab run (intake.json missing). Create one with `lab.py new`.")
    return run


def load_concepts(run: Path) -> list[dict]:
    """concepts.json as {"concepts": [...]} (documented) or a bare list."""
    data = read_json(run / "concepts.json", default={"concepts": []})
    concepts = data if isinstance(data, list) else data.get("concepts")
    if not isinstance(concepts, list):
        sys.exit(f"{run / 'concepts.json'} must look like {{\"concepts\": [{{\"id\": \"C1\", ...}}]}}.")
    return concepts


def find_concept(run: Path, concept_id: str) -> dict:
    for concept in load_concepts(run):
        if concept.get("id") == concept_id:
            return concept
    sys.exit(f"Concept {concept_id} not found in {run / 'concepts.json'}.")


def fit_16x9(image: Image.Image) -> Image.Image:
    """Centre-crop to 16:9 and scale to 1280x720."""
    return ImageOps.fit(image.convert("RGB"), (WIDTH, HEIGHT), method=Image.LANCZOS, centering=(0.5, 0.5))


def next_variant(run: Path, concept_id: str) -> int:
    taken = [int(m.group(1)) for p in (run / "renders").glob(f"{concept_id}-v*.png") if (m := re.search(r"-v(\d+)\.png$", p.name))]
    return max(taken, default=0) + 1


def codex_available() -> bool:
    if not shutil.which("codex"):
        return False
    try:
        status = subprocess.run(["codex", "login", "status"], capture_output=True, text=True, timeout=20)
    except Exception:
        return False
    return status.returncode == 0 and "logged in" in (status.stdout + status.stderr).lower()


def available_backends() -> list[str]:
    found = []
    if os.environ.get("OPENAI_API_KEY"):
        found.append("openai")
    if os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        found.append("gemini")
    if codex_available():
        found.append("codex")
    return found


def doctor():
    ok = True
    print(f"python   {sys.version.split()[0]}")
    try:
        import yt_dlp  # noqa: F401
        print(f"yt-dlp   {yt_dlp.version.__version__}")
    except Exception as error:  # pragma: no cover
        ok = False
        print(f"yt-dlp   MISSING ({error})")
    import PIL
    print(f"pillow   {PIL.__version__}")
    for name, path in FONTS.items():
        print(f"font     {name}: {'ok' if path.exists() else 'MISSING ' + str(path)}")
        ok &= path.exists()
    if shutil.which("codex"):
        try:
            version = subprocess.run(["codex", "--version"], capture_output=True, text=True, timeout=20).stdout.strip()
        except Exception:
            version = "unknown version"
        print(f"codex    {version}, " + ("logged in" if codex_available() else "NOT logged in (`codex login`)"))
    backends = available_backends()
    print("backends " + (", ".join(backends) if backends else "NONE"))
    if not backends:
        ok = False
        print("         Set OPENAI_API_KEY or GEMINI_API_KEY, or install and log in to the Codex CLI (`codex login`).")
    else:
        print(f"default  {backends[0]} (change with --backend)")
    print("status   " + ("READY" if ok else "NOT READY"))
    if not ok:
        sys.exit(1)
