#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["yt-dlp>=2025.1.1", "pillow>=10.0"]
# ///
"""thumbnail-lab: reference research, render adapters, code typography and review sheets.

Run with uv (dependencies install themselves):
    uv run scripts/lab.py doctor
    uv run scripts/lab.py new --title "..." [--audience "..."] [--photos DIR | --faceless]
    uv run scripts/lab.py photos RUN --dir DIR      (add face photos later)
    uv run scripts/lab.py refs RUN --url URL [--url URL ...]   or   --search "topic" [--count 5]
    uv run scripts/lab.py render RUN --concept C1 [--backend auto|openai|gemini|codex] [--prompt-format json|prose]
    uv run scripts/lab.py text RUN --concept C1 [--variant 1]
    uv run scripts/lab.py review RUN
    uv run scripts/lab.py final RUN --pick C1-v1,C3-v2,C4-v1
Claude does the judging (teardown, concepts, scoring); these commands do everything deterministic.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from tl import backends, prompt, refs, sheets, text, util  # noqa: E402


def cmd_doctor(_args):
    util.doctor()


def cmd_new(args):
    run = util.new_run(args.title, args.audience, args.photos, args.faceless, args.out)
    print(f"RUN={run}")


def cmd_photos(args):
    run = util.require_run(args.run)
    copied = util.add_photos(run, args.dir)
    print(f"PHOTOS={len(copied)} in {run / 'photos'}")


def cmd_refs(args):
    run = util.require_run(args.run)
    if not args.url and not args.search:
        sys.exit("Give --url (one or more) or --search.")
    refs.collect(run, urls=args.url or [], search=args.search, count=args.count, recent=args.recent, max_age_days=args.max_age_days)


def cmd_render(args):
    run = util.require_run(args.run)
    concept = util.find_concept(run, args.concept)
    request = prompt.build(run, concept)
    try:
        path = backends.render(run, concept, request, backend=args.backend, variant=args.variant, fmt=args.prompt_format)
    except RuntimeError as error:
        sys.exit(f"RENDER FAILED {args.concept}: {error}")
    print(f"RENDER={path}")


def cmd_text(args):
    run = util.require_run(args.run)
    concept = util.find_concept(run, args.concept)
    out, warnings = text.apply(run, concept, variant=args.variant)
    print(f"FINAL={out}")
    for warning in warnings:
        print(f"WARN {warning}")


def cmd_review(args):
    run = util.require_run(args.run)
    for path in sheets.review(run):
        print(f"REVIEW={path}")


def cmd_final(args):
    run = util.require_run(args.run)
    picks = [p.strip() for p in args.pick.split(",") if p.strip()]
    for path in sheets.final(run, picks):
        print(f"FINAL={path}")


def main(argv=None):
    parser = argparse.ArgumentParser(prog="lab.py", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("doctor", help="check dependencies and which render backends are available").set_defaults(func=cmd_doctor)

    p = sub.add_parser("new", help="create a run folder")
    p.add_argument("--title", required=True, help="working title or topic of the video")
    p.add_argument("--audience", default="", help="who should click")
    p.add_argument("--photos", help="folder with 1-5 photos of the creator (face mode)")
    p.add_argument("--faceless", action="store_true", help="thumbnails without a face")
    p.add_argument("--out", default="thumbnail-lab", help="parent folder for runs (default ./thumbnail-lab)")
    p.set_defaults(func=cmd_new)

    p = sub.add_parser("photos", help="add face photos to an existing run")
    p.add_argument("run")
    p.add_argument("--dir", required=True, help="folder with 1-5 photos of the creator")
    p.set_defaults(func=cmd_photos)

    p = sub.add_parser("refs", help="fetch reference thumbnails and outlier factors")
    p.add_argument("run")
    p.add_argument("--url", action="append", help="YouTube video URL (repeatable)")
    p.add_argument("--search", help="search YouTube for this topic and keep the strongest outliers")
    p.add_argument("--count", type=int, default=5)
    p.add_argument("--recent", action="store_true", help="search newest uploads instead of relevance")
    p.add_argument("--max-age-days", type=int, default=1095, help="search only videos younger than this (default 3 years)")
    p.set_defaults(func=cmd_refs)

    p = sub.add_parser("render", help="render one concept without text")
    p.add_argument("run")
    p.add_argument("--concept", required=True)
    p.add_argument("--backend", default="auto", choices=["auto", "openai", "gemini", "codex"])
    p.add_argument("--variant", type=int, help="variant number (default: next free)")
    p.add_argument("--prompt-format", choices=list(backends.FORMATS), help="json (default) or prose: the same fields as labelled paragraphs; also THUMBNAIL_LAB_PROMPT_FORMAT")
    p.set_defaults(func=cmd_render)

    p = sub.add_parser("text", help="set the headline with the bundled font")
    p.add_argument("run")
    p.add_argument("--concept", required=True)
    p.add_argument("--variant", type=int, help="variant number (default: all rendered variants)")
    p.set_defaults(func=cmd_text)

    p = sub.add_parser("review", help="contact sheet, phone-size previews and a mock feed")
    p.add_argument("run")
    p.set_defaults(func=cmd_review)

    p = sub.add_parser("final", help="final contact sheet and parameter table")
    p.add_argument("run")
    p.add_argument("--pick", required=True, help="comma-separated, e.g. C1-v1,C3-v2,C4-v1")
    p.set_defaults(func=cmd_final)

    args = parser.parse_args(argv)
    args.func(args)


if __name__ == "__main__":
    main()
