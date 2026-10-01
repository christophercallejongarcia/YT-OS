# thumbnail-lab

A Claude Code skill that makes YouTube thumbnails the way top creators do, and shows its work.

![Example: best three of each test run (AI tutorial, cooking, fitness)](examples/contact-sheet.jpg)

What it does, in one run:

1. **References.** You give 3 to 5 thumbnails you like, or it searches your topic. For each one it computes the outlier factor (views divided by the channel's median in the same period) and checks what carried it: the thumbnail, or the title plus a trending topic.
2. **Teardown.** The best one to three become templates. Each is torn down into its complete JSON: every element with position, size, colour, material and light, often more than 10,000 characters.
3. **Packages.** Title, thumbnail message and first hook sentence written as one promise.
4. **Remix.** Only the content of the template changes: your headline, your objects, your face. Layout, light and colours stay.
5. **Render.** The JSON goes word for word to the image tool you already have, with your photo and the template in context: OpenAI, Google Gemini (Nano Banana) or the Codex CLI. Three variants per concept.
6. **Review.** Phone-size previews, a mock feed between your references, a strict rubric, the weakest redone.
7. **Hand-over.** The best three as a contact sheet, a parameter table to reproduce every image, and a YouTube Test & Compare plan.

Tested end to end with the Codex CLI. OpenAI and Gemini are supported and built from their official docs, but were not live-tested.

## Install in 3 steps

1. Install uv if you don't have it: `curl -LsSf https://astral.sh/uv/install.sh | sh` (macOS/Linux) or `brew install uv`. It installs the Python parts (yt-dlp, Pillow) by itself.
2. Copy the `thumbnail-lab` folder into `~/.claude/skills/`.
3. Give it an image tool, any one of: `export OPENAI_API_KEY=...` or `export GEMINI_API_KEY=...` in your shell profile, or a logged-in Codex CLI (`codex login`) on a ChatGPT plan.

Then, in Claude Code: `/thumbnail-lab My video title`. The skill checks everything first and tells you what is missing.

Nothing else is needed: no ffmpeg, no browser automation, no YouTube API key.

## Costs per run

A run renders about 11 images (3 concepts with 3 variants each, plus 2 redos). Prices as of October 2026, check your provider:

| Backend | Default model | Per image | Per run |
|---|---|---|---|
| OpenAI | `gpt-image-2.5-sunburst`, 1536x864, high | about $0.04 plus a few cents for the input images | about $0.70 |
| Google Gemini | `gemini-3-pro-image`, 16:9, 2K | about $0.13 | about $1.50 |
| Codex CLI | `image_gen` | included in a ChatGPT plan, counts against its usage limits | $0 extra |

Change the model with `THUMBNAIL_LAB_OPENAI_MODEL` or `THUMBNAIL_LAB_GEMINI_MODEL`. YouTube research uses yt-dlp and costs nothing.

Your prompt reaches the image model word for word. OpenAI and Gemini get it directly. Codex passes it through its agent to its image tool, so the skill compares what the image tool received against what it sent and warns if anything was rewritten. The prompt is JSON by default; `--prompt-format prose` sends the same fields as labelled text. Codex renders give up after 600 seconds (`THUMBNAIL_LAB_CODEX_TIMEOUT`).

## The JSON trick, by hand

Works on its own too, in any chat with an image model. Upload a thumbnail that works and ask:

```
Give me the complete JSON for this image.
```

Then upload your own photo and say:

```
Apply the previous JSON to this image.
```

Change single fields for variants: the headline, the objects, the expression. The skill does the same with stricter rules for what to swap; see `references/teardown-prompt.md`.

## What the tests taught it

Built from 78 thumbnail drafts for one video, test runs in three niches (AI tutorials, cooking, fitness) with and without a face, and a blind test with 40 images:

- **The complete teardown is the lever, not the braces.** With a face, a template torn down into its complete JSON with only the content swapped beat "template image plus a short sentence" in 10 of 10 blind judgements. JSON beat the same content written as prose by a small margin. Our own short recipe in braces gained nothing over prose.
- **Keep the template in the call.** JSON plus your photo plus the template was the best setup overall. Without a face, the template image made the clear difference.
- **Short headlines can go in the image.** Two to four words came out exact 40 of 40 times, umlauts included. For long headlines or an exact font, the skill sets the text in code with a bundled font.
- **Check what carried an outlier.** In the cooking test one channel used the identical food close-up on every video and landed anywhere between 0.2x and 456x: the title carried, not the image. In a sample of 11 faceless AI outliers, 6 rode a trending topic.
- **Judge at feed size.** Many drafts that look good full-size fall apart at 168 px.

## Where it lives

Each run writes to `./thumbnail-lab/<title>-<YYYYMMDD-HHMM>/`: references, teardowns (`styles/`), concepts, remixes (`remix/`), renders with the exact prompt next to each, `finals/`, review sheets and `final/` with the contact sheet and `params.md`. Nothing is uploaded anywhere.

Run the scripts by hand if you like: `uv run ~/.claude/skills/thumbnail-lab/scripts/lab.py --help`.

## Limits

- The outlier factor is approximate: YouTube rounds view counts in channel lists, and very old videos are compared with the channel's oldest uploads that yt-dlp returns.
- The face mode needs one good photo: portrait lens, good light, a clear expression. Selfies from a wide-angle lens make faces wider.
- Image models still miss sometimes (hands, counts, a letter in the headline). The review step catches most of it; you get the final say.
- Templates are for style. Swap the person, the text and any logos; never publish a copy of someone else's thumbnail.

## Licence

Code: MIT (see `LICENSE`). Fonts in `assets/fonts`: SIL Open Font License 1.1 (see the `OFL-*.txt` files).
