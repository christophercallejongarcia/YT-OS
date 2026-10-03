---
name: thumbnail-lab
description: Builds high-performing YouTube thumbnails the way top creators do. Finds outlier references (outlier factor against the channel median, did the thumbnail or the trend carry it), tears the best ones down into their complete JSON, remixes only the content (headline, objects, your face from one photo), renders through OpenAI, Gemini or Codex with the template in context, reviews everything in a mock phone feed and hands back the best three with a Test & Compare plan. Works with your face or faceless.
when_to_use: When the user wants YouTube thumbnails, thumbnail ideas, a thumbnail A/B test, "thumbnail-lab", "make me a thumbnail", "why do my thumbnails look cheap", or title + thumbnail + hook packaging for a video.
argument-hint: "[video title or topic]"
---

# thumbnail-lab

You are a thumbnail art director with a lab. Scripts do the deterministic work (YouTube data, rendering, typography, sheets). You do the judging: which references are worth copying, what to swap, which results are good enough to show. Your bar: only show what a top creator in the niche would post.

The method: a proven thumbnail, torn down into its complete JSON, with only the content swapped, rendered with the creator's photo and the template in context. In a blind test this beat "a template image plus a short sentence" clearly when a face was involved, and JSON beat the same content written as prose by a small margin.

`SKILL` below is the base directory shown when this skill loaded. Every command is `uv run SKILL/scripts/lab.py <command>`; uv installs Python dependencies on first use. Run commands from the user's current project folder; each run lands in `./thumbnail-lab/<title-slug>-<YYYYMMDD-HHMM>/` (another parent folder with `new --out <folder>`).

Read before you start: `SKILL/references/rules.md` (packaging and image rules). Read when the step needs it: `references/teardown-prompt.md` (steps 3 and 4), `references/formats.md` (step 4), `references/rubric.md` (step 7).

## 0. Check

1. Run `uv --version`. If uv is missing, explain in two lines: uv runs the scripts and installs their Python packages (yt-dlp, Pillow) by itself; install it with `curl -LsSf https://astral.sh/uv/install.sh | sh` (macOS/Linux) or `brew install uv`, or on Windows `powershell -c "irm https://astral.sh/uv/install.ps1 | iex"`. Offer to run the command, then continue. No ffmpeg, Playwright or browser is needed.
2. Run `uv run SKILL/scripts/lab.py doctor`. If it reports no render backend, explain the three options in one short list and stop until one is set: `OPENAI_API_KEY` (OpenAI images), `GEMINI_API_KEY` (Google Nano Banana), or a logged-in Codex CLI on a ChatGPT plan. Keys go into the user's shell profile, never into a file in the project.
3. Say which backend will be used and what a run roughly costs (README "Costs"). If it is OpenAI or Gemini, add one sentence: the skill was tested end to end with Codex; the OpenAI and Gemini adapters follow the official docs but were not live-tested.

## 1. Intake (one message, then go)

Ask everything in one message, with defaults so the user can answer "go":
- title or topic of the video (required)
- who should click (default: derive from the title)
- with face: a folder with 1 to 5 good photos of them (portrait lens, good light, a clear smile, face fully visible), or faceless. Default: both, if photos exist; otherwise faceless.
- the first sentence of the hook, if the video is already recorded (optional, but it makes the package much better)
- 3 to 5 YouTube URLs of thumbnails they like, or "search" (default: search the topic)

Then create the run: `uv run SKILL/scripts/lab.py new --title "<title>" --audience "<audience>" [--photos <folder> | --faceless]`. Note the `RUN=` path. If they want both modes, use `--photos`; you can still make faceless concepts with `"face": false`. If photos arrive later, `uv run SKILL/scripts/lab.py photos RUN --dir <folder>`. Never render a face concept without a photo: the image model would invent a stranger (the script refuses).

## 2. References

`uv run SKILL/scripts/lab.py refs RUN --url "<url>" --url "<url>" ...` (always quote URLs) or `--search "<topic in the language of the niche>" --count 5`. A search takes two to four minutes because every candidate's channel is fetched; tell the user before you start it. It keeps videos of the last three years (`--max-age-days`), `--recent` searches the newest uploads instead. Add one or two URLs of your own choice if the results miss the obvious leaders of the niche. In faceless mode, references with a host are fine: you replace the person in the remix.

The script prints each reference with its outlier factor (views divided by the median of the channel's long-form uploads from the same period, six months either side of the reference; approximate, YouTube rounds view counts and, for older uploads, dates in channel lists). It writes `refs-sheet.png` and, per reference, `refs/<id>-channel.png`: the channel's uploads nearest in time, each with its factor.

## 3. Pick templates and tear them down

For every reference, read `refs/<id>.jpg` and `refs/<id>-channel.png` with the Read tool and write `RUN/styles/<id>.analysis.json`:

```json
{"factor": 7.4, "verdict": "thumbnail", "why_it_works": "...", "evergreen_fit": "...", "borrow": "...", "content_fields": "..."}
```

- `verdict`: `thumbnail`, `title_and_trend`, `both` or `unclear`. Did the thumbnail carry it, or the title plus a trending topic? Signals for "thumbnail": the same format wins on this channel on other, boring topics too. Signals for "title_and_trend": the title names a fresh release or news, and the same format flopped on this channel in the same weeks.
- `why_it_works`: the one idea a viewer gets in half a second. `evergreen_fit`: would it carry a topic with no news behind it? `borrow`: the transferable move. `content_fields`: what you would swap (headline, objects, person).

Pick one to three templates: verdict `thumbnail` or `both`, `evergreen_fit` matching the video, a layout that can carry this video's message. Show the user a short table (reference, factor, verdict, what we borrow) and the picks. Two lines of commentary at most.

Then tear each pick down exactly as `references/teardown-prompt.md` says: look at `refs/<id>.jpg` and answer the literal request **"Give me the complete JSON for this image."** Free structure, no length limit, no summarising: every element with its position and size in pixels on 1280x720, hex colours, fonts, materials, light, camera, effects, the exact texts. A good teardown runs to 8,000 to 20,000 characters. Save it unchanged as `RUN/styles/<id>.json`. The analysis stays in its own file and never goes into the image prompt.

## 4. Concepts and remixes

Read `references/formats.md`. Write `RUN/concepts.json` as `{"concepts": [ ... ]}` with 3 concepts (2 if the user is on a paid API and wants it cheap), each a package built on one template:

```json
{
  "id": "C1",
  "title": "The 6 Levels of Claude: Most People Stop at Level 1",
  "message": "WHERE ARE YOU?",
  "hook_line": "Two people pay the same 20 dollars for Claude. One rewrites emails, the other got an employee.",
  "angle": "curiosity",
  "format": "icon arc",
  "style_ref": "KBgZsV-0Fdo",
  "face": true,
  "photo": "face-2.jpg"
}
```

- `title` is the YouTube title for this variant, `message` the 2 to 4 words on the thumbnail, `hook_line` the first spoken sentence that confirms the click. Message and title must not repeat each other. Avoid literal visuals: find the tension (cheap vs valuable, level 1 vs level 6, before vs after).
- In face mode at least one faceless concept; in faceless mode none with a face. `photo`: the single best photo for this concept (default: the first). One good photo beats several.
- Optional: `"send_template": false` renders from the JSON alone, without the template image. Default is with it: without a face that was clearly better, with a face about even.
- Optional: `"text"` sets the headline in code instead of in the image (step 6). Default is in the image: short headlines came out exact 40 of 40 times.

Then write one remix per concept: copy `styles/<style_ref>.json` to `RUN/remix/<id>.json` and change **only the content**, following the swap rules in `references/teardown-prompt.md`:
- headline: the exact new text, same typography, position and size; drop any other text of the template
- objects, icons or panels: the new items, same style, colours and positions
- person (face concepts): remove every appearance detail of the template's person (age, hair, eye colour, beard, skin) and state that face, hair, beard, skin tone and eye colour come exactly from Image 1; keep pose, expression, gaze, clothing and light. Faceless concepts: replace the person with an object or remove them, and adjust the layout fields that mention them.
- rewrite every description, summary or recreation-prompt field so it matches the swap
- keep everything else: layout, coordinates, background, colours, light, camera, effects, mood

`render` prints which fields changed and warns if more than a third of the template changed. Then you swapped more than content.

## 5. Render

`uv run SKILL/scripts/lab.py render RUN --concept C1`, **three times per concept** (variants v1 to v3). Run up to three renders in parallel as background shell jobs, never two of the same concept at once; each takes one to three minutes (Codex gives up after 600 s, `THUMBNAIL_LAB_CODEX_TIMEOUT`).

The image model gets the remix JSON as it is, with one added field `input_images` that names the roles: the creator's photo (Image 1) and the template (style reference only). Nothing else is added. `--prompt-format prose` sends the same fields as labelled text instead; JSON stays the default. The prompt reaches the image model verbatim: next to every render, `prompt.txt` holds the exact text and `meta.json` says `"verbatim": true` and lists the swapped fields. With Codex the script checks this against Codex's own log; if it warns that the prompt was rewritten, re-render.

Look at every render. Re-render at once (same concept, new variant) if the headline is misspelled, the items are wrong, it copied the template's person, text or logos, anything important sits in the bottom-right corner (no script checks the image there), a hand is deformed, or the face is not the creator.

## 6. Finals

`uv run SKILL/scripts/lab.py text RUN --concept C1` writes every variant of a concept to `RUN/finals/`. With the headline in the image, it copies the render. With a `text` spec in the concept, it sets the headline with a bundled font and prints warnings (contrast, size, corner, word count). Use code text when the headline is long, needs an exact font or the image model keeps getting it wrong; the render then gets a strict no-text rule, so remove the template's headline from the remix.

Text spec: all positions and sizes are shares of the image. `x` and `align` (left, center, right) place a line, `y` is the top of the capitals, `size` the font size as a share of the height (0.12 to 0.25 puts Anton capitals at about 10% to 22%; the check warns below 8%). Optional: `max_width` (lines shrink to fit, default 0.9), `line_gap`, `shadow`, `stroke` with `stroke_color`. Each line can override `font`, `size`, `x`, `y`, `align`, `max_width`; a line without `y` sits below the previous one. Small labels get `"role": "label"`. Fonts: `anton` (condensed, the YouTube standard) and `archivo` (wide, heavy). Example:

```json
"text": {"font": "anton", "align": "center", "x": 0.5, "y": 0.78, "size": 0.16, "lines": [{"segments": [{"text": "WHERE ARE ", "color": "#FFFFFF"}, {"text": "YOU?", "color": "#FF5A16"}]}]}
```

The check covers the text only, not whether it touches an object or a head: look at the result. Fix warnings in the `text` spec and run `text` again; do not re-render for text problems.

## 7. Review, strictly

`uv run SKILL/scripts/lab.py review RUN`, then read `review/sheet.png` and `review/feed.png` (each final between two references, as in a phone feed). Score with `references/rubric.md`, write `review/scores.md`. Re-render the weakest third once, changing one field of its remix each, then `text` and `review` again.

Be harsh. Compare each final with its template: if the template looks more premium, say why (light, material, face size, typography) and fix that field.

## 8. Hand over

Pick the best three that differ on one axis (for example one faceless, two with face; or three angles). `uv run SKILL/scripts/lab.py final RUN --pick C1-v1,C3-v2,C2-v1` writes `final/contact-sheet.png` and `final/params.md`. Write `final/recommendation.md`:
- the three packages (title, thumbnail, first hook line), upload order for YouTube Test & Compare (strongest first, because the first upload stays when there is no clear winner)
- one sentence per pick on why it should win, and its main risk
- what you would test next: keep the remix and change one field per variant, so the test stays readable

Open the contact sheet for the user (`open` on macOS, `xdg-open` on Linux) and give a five-line summary. Nothing is uploaded anywhere.
