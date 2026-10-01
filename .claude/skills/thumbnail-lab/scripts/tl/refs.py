"""Reference thumbnails: metadata, outlier factor against the channel median, channel context.

No API key: everything comes from yt-dlp. The factor is views divided by the median
views of the channel's most recent long-form uploads (Shorts live in another tab and
are excluded; uploads shorter than three minutes are dropped as well).
"""
from __future__ import annotations

import datetime as dt
import statistics
import sys
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw

from . import sheets, util

MEDIAN_WINDOW = 50  # fallback: recent long-form uploads that form the channel baseline
MEDIAN_DAYS = 183  # preferred baseline: long-form uploads of the last six months
MIN_SECONDS = 180


def _ydl(flat: bool, end: int | None = None):
    import yt_dlp

    options = {"quiet": True, "no_warnings": True, "skip_download": True, "ignoreerrors": True}
    if flat:
        options["extract_flat"] = "in_playlist"
        # Flat channel listings carry no dates unless asked; approximate day dates are enough here.
        options["extractor_args"] = {"youtubetab": {"approximate_date": [""]}}
    if end:
        options["playlistend"] = end
    return yt_dlp.YoutubeDL(options)


def video_info(url: str) -> dict | None:
    with _ydl(flat=False) as ydl:
        info = ydl.extract_info(url, download=False)
    if not info:
        return None
    return {
        "id": info.get("id"),
        "title": info.get("title"),
        "channel": info.get("channel") or info.get("uploader"),
        "channel_url": info.get("channel_url") or info.get("uploader_url"),
        "views": info.get("view_count") or 0,
        "upload_date": info.get("upload_date"),
        "duration": info.get("duration"),
    }


_channel_cache: dict[str, list[dict]] = {}


def _fetch_uploads(channel_url: str, limit: int) -> list[dict]:
    with _ydl(flat=True, end=limit) as ydl:
        info = ydl.extract_info(channel_url.rstrip("/") + "/videos", download=False) or {}
    uploads = []
    for entry in info.get("entries") or []:
        if not entry or not entry.get("id"):
            continue
        uploads.append({
            "id": entry["id"],
            "title": entry.get("title") or "",
            "views": entry.get("view_count") or 0,
            "duration": entry.get("duration"),
            "upload_date": entry.get("upload_date") or _date_from_timestamp(entry.get("timestamp")),
        })
    return uploads


def _date_from_timestamp(timestamp) -> str | None:
    # Flat listings carry an approximate timestamp; the API leaves upload_date empty.
    return dt.datetime.fromtimestamp(timestamp, dt.timezone.utc).strftime("%Y%m%d") if timestamp else None


def channel_uploads(channel_url: str, reaching_back_to: str | None = None) -> list[dict]:
    """The channel's videos tab, newest first. Fetches deeper when the reference is older than the first page."""
    uploads = _channel_cache.get(channel_url)
    if uploads is None:
        uploads = _channel_cache[channel_url] = _fetch_uploads(channel_url, 120)
    if reaching_back_to:
        dates = [u["upload_date"] for u in uploads if u.get("upload_date")]
        needed = (dt.datetime.strptime(reaching_back_to, "%Y%m%d").date() - dt.timedelta(days=MEDIAN_DAYS)).strftime("%Y%m%d")
        if dates and min(dates) > needed and len(uploads) >= 120:
            uploads = _channel_cache[channel_url] = _fetch_uploads(channel_url, 600)
    return uploads


def channel_median(uploads: list[dict], around: str | None = None, today: dt.date | None = None) -> tuple[float, str]:
    """Median views of the channel's long-form uploads in the six months around the reference's upload date.

    Comparing an old viral video with today's channel would inflate the factor, so the
    baseline is the same period. Falls back to the latest 50 long-form uploads.
    """
    long_form = [u for u in uploads if u["views"] and (u.get("duration") is None or u["duration"] >= MIN_SECONDS)]
    if around:
        anchor = dt.datetime.strptime(around, "%Y%m%d").date()
        low = (anchor - dt.timedelta(days=MEDIAN_DAYS)).strftime("%Y%m%d")
        high = (anchor + dt.timedelta(days=MEDIAN_DAYS)).strftime("%Y%m%d")
        window = [u["views"] for u in long_form if u.get("upload_date") and low <= u["upload_date"] <= high]
        if len(window) >= 8:
            return float(statistics.median(window)), f"{len(window)} long-form uploads within 6 months of it"
    cutoff = ((today or dt.date.today()) - dt.timedelta(days=MEDIAN_DAYS)).strftime("%Y%m%d")
    recent = [u["views"] for u in long_form if u.get("upload_date") and u["upload_date"] >= cutoff]
    if len(recent) >= 8 and not around:
        return float(statistics.median(recent)), f"{len(recent)} long-form uploads of the last 6 months"
    sample = [u["views"] for u in long_form[:MEDIAN_WINDOW]]
    basis = f"latest {len(sample)} long-form uploads" + (" (reference is older; factor overstated)" if around else "")
    return (float(statistics.median(sample)) if sample else 0.0), basis


def factor(views: int, median: float) -> float:
    return round(views / median, 2) if median else 0.0


def download_thumbnail(video_id: str, target: Path, small: bool = False) -> bool:
    names = ["mqdefault.jpg"] if small else ["maxresdefault.jpg", "sddefault.jpg", "hqdefault.jpg"]
    for name in names:
        try:
            with urllib.request.urlopen(f"https://i.ytimg.com/vi/{video_id}/{name}", timeout=20) as response:
                data = response.read()
            image = Image.open(BytesIO(data)).convert("RGB")
            if image.width < 200:  # YouTube's grey placeholder
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            image.save(target, quality=92)
            return True
        except Exception:
            continue
    return False


def channel_context(run: Path, ref: dict, uploads: list[dict], median: float) -> Path | None:
    """Sheet of the channel's recent uploads with their factors, for the thumbnail-or-trend question."""
    others = [u for u in uploads if u["id"] != ref["id"]]
    # Nearest in time to the reference: the same channel, the same weeks, other topics and formats.
    if ref.get("upload_date") and any(u.get("upload_date") for u in others):
        anchor = dt.datetime.strptime(ref["upload_date"], "%Y%m%d").date()
        def distance(upload):
            if not upload.get("upload_date"):
                return 10_000
            return abs((dt.datetime.strptime(upload["upload_date"], "%Y%m%d").date() - anchor).days)
        others = sorted(others, key=distance)
    recent = others[:23]
    tiles = []
    for upload in [{"id": ref["id"], "title": ref["title"], "views": ref["views"]}] + recent:
        path = run / "refs" / "channel" / f"{upload['id']}.jpg"
        if path.exists() or download_thumbnail(upload["id"], path, small=True):
            label = f"{factor(upload['views'], median):.1f}x  {upload['title'][:38]}"
            tiles.append((path, label, upload["id"] == ref["id"]))
    if not tiles:
        return None
    out = run / "refs" / f"{ref['id']}-channel.png"
    sheets.grid(tiles, out, columns=6, tile=(320, 180), title=f"{ref['channel']} · uploads nearest in time · factor vs median {int(median):,} (first tile = reference)")
    util.write_json(run / "refs" / f"{ref['id']}-channel.json", [
        {**u, "factor": factor(u["views"], median)} for u in [{"id": ref["id"], "title": ref["title"], "views": ref["views"], "duration": ref.get("duration")}] + recent
    ])
    return out


def search(query: str, count: int, recent: bool, max_age_days: int = 1095) -> list[str]:
    """Search results ranked by outlier factor; only videos younger than max_age_days."""
    prefix = "ytsearchdate" if recent else "ytsearch"
    with _ydl(flat=True) as ydl:
        info = ydl.extract_info(f"{prefix}{max(count * 5, 25)}:{query}", download=False) or {}
    entries = [e for e in info.get("entries") or [] if e and e.get("id") and e.get("view_count") and not (e.get("duration") and e["duration"] < MIN_SECONDS)]
    entries.sort(key=lambda e: e["view_count"], reverse=True)
    cutoff = (dt.date.today() - dt.timedelta(days=max_age_days)).strftime("%Y%m%d")
    candidates = []
    for entry in entries[: count * 3]:
        meta = video_info(f"https://www.youtube.com/watch?v={entry['id']}")
        if not meta or not meta.get("channel_url"):
            continue
        if meta.get("upload_date") and meta["upload_date"] < cutoff:
            print(f"  older than {max_age_days} days, skipped: {meta['title'][:60]}", file=sys.stderr)
            continue
        median, _ = channel_median(channel_uploads(meta["channel_url"], meta.get("upload_date")), meta.get("upload_date"))
        value = factor(meta["views"], median)
        candidates.append((value, entry["id"]))
        print(f"  candidate {entry['id']}  {value:>6.1f}x  {meta['title'][:60]}", file=sys.stderr)
    candidates.sort(reverse=True)
    return [f"https://www.youtube.com/watch?v={video_id}" for _, video_id in candidates[:count]]


def collect(run: Path, urls: list[str], search: str | None, count: int, recent: bool, max_age_days: int = 1095):
    if search:
        print(f"Searching YouTube for '{search}' ...", file=sys.stderr)
        urls = urls + globals()["search"](search, count, recent, max_age_days)
    refs = []
    for url in urls:
        info = video_info(url)
        if not info or not info.get("id"):
            print(f"  skipped (not readable): {url}", file=sys.stderr)
            continue
        uploads = channel_uploads(info["channel_url"], info.get("upload_date")) if info.get("channel_url") else []
        median, basis = channel_median(uploads, info.get("upload_date"))
        info["channel_median"] = median
        info["median_basis"] = basis
        info["factor"] = factor(info["views"], median)
        info["thumbnail"] = f"refs/{info['id']}.jpg"
        if not download_thumbnail(info["id"], run / info["thumbnail"]):
            print(f"  skipped (no thumbnail): {url}", file=sys.stderr)
            continue
        context = channel_context(run, info, uploads, median)
        info["channel_sheet"] = str(context.relative_to(run)) if context else None
        util.write_json(run / "refs" / f"{info['id']}.json", info)
        refs.append(info)
        print(f"  {info['id']}  {info['factor']:>6.1f}x  {info['views']:>10,} views  {info['upload_date']}  {info['title'][:56]}  [median: {basis}]")
    if not refs:
        sys.exit("No reference could be read. Check the URLs or your network.")
    util.write_json(run / "refs.json", refs)
    sheet = sheets.grid(
        [(run / r["thumbnail"], f"R{i}  {r['factor']:.1f}x  {r['channel'][:24]}", False) for i, r in enumerate(refs, 1)],
        run / "refs-sheet.png", columns=min(3, len(refs)), tile=(480, 270), title="References (factor = views / channel median)",
    )
    print(f"REFS={run / 'refs.json'}")
    print(f"SHEET={sheet}")
