---
name: thumbnail-lab
description: Builds high-performing YouTube thumbnails the way top creators do. Researches outlier references (outlier factor against the channel median, did the thumbnail or the trend carry it), tears each reference down into a style JSON, writes title + thumbnail + hook packages, renders text-free images with OpenAI, Gemini or Codex, sets the headline with a real font, reviews everything in a mock phone feed and hands back the best three with a Test & Compare plan. Works with your face (from your photos) or faceless.
when_to_use: When the user wants YouTube thumbnails, thumbnail ideas, a thumbnail A/B test, "thumbnail-lab", "make me a thumbnail", "why do my thumbnails look cheap", or title + thumbnail + hook packaging for a video.
argument-hint: "[video title or topic]"
---

# thumbnail-lab

You are a thumbnail art director with a lab. Scripts do the deterministic work (YouTube data, rendering, typography, sheets). You do the judging: what a reference does, which concepts are worth rendering, which results are good enough to show. Your bar: only show what a top creator in the niche would post.

`SKILL` below is the base directory shown when this skill loaded. Every command is `uv run SKILL/scripts/lab.py <command>`; uv installs Python dependencies on first use. Run commands from the user's current project folder; each run lands in `./thumbnail-lab/<title-slug>-<YYYYMMDD-HHMM>/` (another parent folder with `new --out <folder>`).

Read before you start: `SKILL/references/rules.md` (packaging and image rules). Read when the step needs it: `references/teardown-prompt.md` and `references/style-schema.json` (step 3), `references/formats.md` (step 4), `references/rubric.md` (step 7).

## 0. Check

1. Run `uv --version`. If uv is missing, explain in two lines: uv runs the scripts and installs their Python packages (yt-dlp, Pillow) by itself; install it with `curl -LsSf https://astral.sh/uv/install.sh | sh` (macOS/Linux) or `brew install uv`, or on Windows `powershell -c "irm https://astral.sh/uv/install.ps1 | iex"`. Offer to run the command, then continue. No ffmpeg, Playwright or browser is needed.
2. Run `uv run SKILL/scripts/lab.py doctor`. If it reports no render backend, explain the three options in one short list and stop until one is set: `OPENAI_API_KEY` (OpenAI images), `GEMINI_API_KEY` (Google Nano Banana), or a logged-in Codex CLI on a ChatGPT plan. Keys go into the user's shell profile, never into a file in the project.
3. Say which backend will be used and what a run roughly costs (README "Costs").

## 1. Intake (one message, then go)

Ask everything in one message, with defaults so the user can answer "go":
- title or topic of the video (required)
- who should click (default: derive from the title)
- with face: a folder with 1 to 5 good photos of them (portrait lens, good light, different expressions), or faceless. Default: both, if photos exist; otherwise faceless.
- the first sentence of the hook, if the video is already recorded (optional, but it makes the package much better)
- 3 to 5 YouTube URLs of thumbnails they like, or "search" (default: search the topic)

Then create the run: `uv run SKILL/scripts/lab.py new --title "<title>" --audience "<audience>" [--photos <folder> | --faceless]`. Note the `RUN=` path. If they want both modes, use `--photos`; you can still make faceless concepts with `"face": false`. If photos arrive later, `uv run SKILL/scripts/lab.py photos RUN --dir <folder>`. Never render a face concept without photos: the image model would invent a stranger (the script refuses).

## 2. References

`uv run SKILL/scripts/lab.py refs RUN --url "<url>" --url "<url>" ...` (always quote URLs) or `--search "<topic in the language of the niche>" --count 5`. A search takes two to four minutes because every candidate's channel is fetched; tell the user before you start it. It keeps videos of the last three years (`--max-age-days`), `--recent` searches the newest uploads instead. Add one or two URLs of your own choice if the results miss the obvious leaders of the niche. In faceless mode, references with a host are fine: only their light, layout and material are borrowed, the person never reaches the image prompt.

The script prints each reference with its outlier factor (views divided by the median of the channel's long-form uploads from the same period, six months either side of the reference; approximate, YouTube rounds view counts and, for older uploads, dates in channel lists). It writes `refs-sheet.png` and, per reference, `refs/<id>-channel.png`: the channel's uploads nearest in time, each with its factor.

## 3. Teardown (you, with your eyes)

For every reference, read `refs/<id>.jpg` and `refs/<id>-channel.png` with the Read tool. Apply the prompt in `references/teardown-prompt.md` to the thumbnail, fill the fields of the `example` object in `references/style-schema.json` (including the four analysis fields) and save them as a flat object, without the `example` wrapper, in `RUN/styles/<id>.json`. Be concrete and measurable: hex colours, light direction in degrees, share of the frame. Describe style only, never the creator's identity or brand.

For `verdict`, answer the question every outlier deserves: did the thumbnail carry it, or the title plus a trending topic? Signals for "thumbnail": the same format wins on this channel on other, boring topics too. Signals for "title_and_trend": the title names a fresh release or news, and the same format flopped on this channel in the same weeks.

Show the user a short table: reference, factor, verdict, what we borrow. Two lines of commentary at most.

## 4. Concepts

Read `references/formats.md`. Write `RUN/concepts.json` with 6 concepts (4 if the user is on a paid API and wants it cheap):
- 2 to 3 different formats, each built on one torn-down reference (`style_ref`), preferring references whose verdict is "thumbnail" or "both" and whose `evergreen_fit` matches the video
- in face mode at least one faceless concept; in faceless mode none with a face
- every concept is a package: `title` (the YouTube title for this variant), `message` (2 to 4 words on the thumbnail), `hook_line` (the first spoken sentence that confirms the click). Message and title must not repeat each other. Avoid literal visuals: find the tension (cheap vs valuable, level 1 vs level 6, before vs after).

The file is `{"concepts": [ ... ]}`, one object per concept:

```json
{
  "id": "C1",
  "title": "The 6 Levels of Claude: Most People Stop at Level 1",
  "message": "WHERE ARE YOU?",
  "hook_line": "Two people pay the same 20 dollars for Claude. One rewrites emails, the other got an employee.",
  "angle": "curiosity",
  "format": "level columns",
  "style_ref": "Y09u_S3w2c8",
  "face": false,
  "promise": "six levels of using Claude, from chat to AI operating system; the viewer wants to know their level",
  "composition": "six equal columns across the frame, figure centred in each, top quarter empty for numbers, bottom fifth empty for the headline",
  "object": "one original clay figure in coral #D97757 that evolves left to right: cube, crawling, standing, walking, reading, working at a laptop",
  "background": "smooth horizontal colour gradient from cream #F4EFE6 on the left to coral #E8865F on the right, no split, no grid",
  "lighting": "soft studio key from upper left, soft contact shadows",
  "palette": "cream, coral, near-black",
  "keep_empty": "top 22% and bottom 20% of the frame",
  "avoid": ["numbers on the columns"],
  "text": {
    "font": "anton", "align": "center", "x": 0.5, "y": 0.82, "size": 0.12, "shadow": true,
    "lines": [{"segments": [{"text": "WHERE ARE ", "color": "#141414"}, {"text": "YOU?", "color": "#D97757"}]}]
  }
}
```

Field notes: `person` only when `face` is true, for example `"person": {"position": "right third", "expression": "warm laugh, eyes into the camera", "gesture": "points at the object", "clothing": "cream hoodie"}`. Describe gradients explicitly, never leave the background to chance. `text` is set in code afterwards: take case, colours and position from the reference's typography, never in the bottom-right corner, never over the face. All positions and sizes are shares of the image: `x` and `align` (left, center, right) place a line horizontally, `y` is the top of the capitals, `size` is the font size as a share of the height (0.12 to 0.25 puts Anton capitals at about 10% to 22%; the check warns below 8%). Optional: `max_width` (lines shrink to fit, default 0.9), `line_gap`, `shadow`, `stroke` with `stroke_color`. Each line can override `font`, `size`, `x`, `y`, `align` and `max_width`; a line without `y` sits below the previous one. Labels like column numbers are extra lines with `"role": "label"`, exempt from the size check. Fonts: `anton` (condensed, the YouTube standard) and `archivo` (wide, heavy). An empty `lines` list makes a deliberately text-free thumbnail.

## 5. Render

`uv run SKILL/scripts/lab.py render RUN --concept C1` for every concept. Run up to three renders in parallel as background shell jobs, never two of the same concept at once; each takes one to three minutes (Codex gives up after 600 s, `THUMBNAIL_LAB_CODEX_TIMEOUT`). The image model gets one prompt with the style JSON, the preserve list for the face, the empty zones and a strict no-text rule, as JSON by default or as labelled prose with `--prompt-format prose`. The prompt reaches the image model verbatim: next to every render, `prompt.txt` holds the exact text and `meta.json` says `"verbatim": true`. With Codex the script checks this against Codex's own log; if it warns that the prompt was rewritten, re-render.

Look at every render before setting text. Re-render at once (same concept, new variant) if it has drawn text, a wrong number of items, a split background you did not ask for, anything important in the bottom-right corner (no script checks the image there), a deformed hand, or a face that is not the creator.

## 6. Headline in code

`uv run SKILL/scripts/lab.py text RUN --concept C1` sets the headline on all variants of a concept, writes them to `RUN/finals/` and prints warnings (contrast, size, corner, word count). It checks the text only, not whether it touches the object or a head: look at the result. Fix warnings by editing the concept's `text` spec and running `text` again. Do not re-render for text problems.

## 7. Review, strictly

`uv run SKILL/scripts/lab.py review RUN`, then read `review/sheet.png` and `review/feed.png` (each final between two references, as in a phone feed). Score with `references/rubric.md`, write `review/scores.md`. Re-render the weakest third once, changing one field each, then `text` and `review` again.

Be harsh. Compare each final with the reference it borrowed from: if the reference looks more premium, say why (light, material, face size, typography) and fix that field.

## 8. Hand over

Pick the best three that differ on one axis (for example one faceless, two with face; or three angles). `uv run SKILL/scripts/lab.py final RUN --pick C1-v1,C3-v2,C5-v1` writes `final/contact-sheet.png` and `final/params.md`. Write `final/recommendation.md`:
- the three packages (title, thumbnail, first hook line), upload order for YouTube Test & Compare (strongest first, because the first upload stays when there is no clear winner)
- one sentence per pick on why it should win, and its main risk
- what you would test next

Open the contact sheet for the user (`open` on macOS, `xdg-open` on Linux) and give a five-line summary. Nothing is uploaded anywhere.
