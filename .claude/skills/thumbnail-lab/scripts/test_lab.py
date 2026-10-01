#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["yt-dlp>=2025.1.1", "pillow>=10.0"]
# ///
"""Offline checks for the deterministic parts: uv run scripts/test_lab.py"""
import base64
import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))

from tl import backends, prompt, refs, text, util  # noqa: E402


def upload(views, date, duration=600):
    return {"id": f"x{views}{date}", "title": "", "views": views, "duration": duration, "upload_date": date}


class Refs(unittest.TestCase):
    def test_median_uses_the_period_around_the_reference(self):
        old = [upload(1000, f"202401{d:02d}") for d in range(1, 11)]
        new = [upload(50, f"202609{d:02d}") for d in range(1, 11)]
        median, basis = refs.channel_median(new + old, around="20240115")
        self.assertEqual(median, 1000)
        self.assertIn("within 6 months", basis)

    def test_shorts_and_missing_views_do_not_count(self):
        uploads = [upload(100, f"202609{d:02d}") for d in range(1, 11)] + [upload(10**7, "20260920", duration=40), upload(0, "20260921")]
        median, _ = refs.channel_median(uploads, around="20260915")
        self.assertEqual(median, 100)

    def test_factor(self):
        self.assertEqual(refs.factor(300, 100), 3.0)
        self.assertEqual(refs.factor(300, 0), 0.0)


class Text(unittest.TestCase):
    def setUp(self):
        self.image = Image.new("RGB", (1280, 720), "#F4EFE6")

    def test_layout_shrinks_to_max_width_and_keeps_the_corner_free(self):
        spec = {"lines": [{"text": "WHERE ARE YOU?", "color": "#141414"}], "size": 0.3, "x": 0.05, "y": 0.1, "max_width": 0.5}
        _, placed = text.draw(self.image, spec)
        left, _, right, _ = placed[0]["box"]
        self.assertLessEqual(right - left, 0.5 * 1280 + 2)
        self.assertEqual(text.check(self.image, placed), [])

    def test_warnings_for_corner_contrast_and_words(self):
        spec = {"lines": [{"text": "ONE TWO THREE FOUR FIVE SIX", "color": "#F0EBE2"}], "size": 0.1, "x": 0.95, "y": 0.85, "align": "right"}
        _, placed = text.draw(self.image, spec)
        warnings = " ".join(text.check(self.image, placed))
        self.assertIn("bottom-right corner", warnings)
        self.assertIn("contrast", warnings)
        self.assertIn("headline words", warnings)

    def test_labels_are_exempt_from_size_checks(self):
        spec = {"lines": [{"text": "LEVEL", "color": "#141414", "size": 0.03, "role": "label"}]}
        _, placed = text.draw(self.image, spec)
        self.assertEqual(text.check(self.image, placed), [])


class Prompts(unittest.TestCase):
    def test_request_bodies(self):
        with tempfile.TemporaryDirectory() as folder:
            photo = Path(folder) / "face.jpg"
            Image.new("RGB", (8, 8)).save(photo)
            request = {"prompt": {"task": "x"}, "images": [str(photo)]}
            url, body = backends.openai_body(request, "gpt-image-2.5-sunburst")
            self.assertTrue(url.endswith("/images/edits"))
            self.assertEqual(body["size"], "1536x864")
            self.assertTrue(body["images"][0]["image_url"].startswith("data:image/jpeg;base64,"))
            url, _ = backends.openai_body({"prompt": {"task": "x"}, "images": []}, "m")
            self.assertTrue(url.endswith("/images/generations"))
            gemini = backends.gemini_body(request)
            self.assertEqual(gemini["generationConfig"]["imageConfig"]["aspectRatio"], "16:9")
            self.assertEqual(base64.b64decode(gemini["contents"][0]["parts"][1]["inlineData"]["data"]), photo.read_bytes())

    def test_prompt_is_text_free_and_carries_the_preserve_list(self):
        with tempfile.TemporaryDirectory() as folder:
            run = Path(folder)
            (run / "photos").mkdir()
            (run / "refs").mkdir()
            Image.new("RGB", (8, 8)).save(run / "photos" / "face-1.jpg")
            Image.new("RGB", (8, 8)).save(run / "refs" / "abc.jpg")
            util.write_json(run / "intake.json", {"title": "T", "mode": "face", "photos": ["face-1.jpg"]})
            util.write_json(run / "styles" / "abc.json", {"lighting": {"key": "soft"}, "text": {"word_count": 2}, "verdict": "thumbnail"})
            built = prompt.build(run, {"id": "C1", "style_ref": "abc", "face": True})
            self.assertEqual(len(built["images"]), 2)
            self.assertIn("NO text", built["prompt"]["text"])
            self.assertIn("hairline and hair volume", built["prompt"]["person"]["preserve"])
            self.assertEqual(set(built["prompt"]["style_from_reference"]), {"lighting"})
            util.write_json(run / "intake.json", {"title": "T", "mode": "faceless", "photos": []})
            with self.assertRaises(SystemExit):
                prompt.build(run, {"id": "C3", "face": True})
            faceless = prompt.build(run, {"id": "C2", "style_ref": "abc", "face": False})
            self.assertEqual(faceless["prompt"]["person"], "No person, no face, no hands.")
            self.assertEqual(len(faceless["images"]), 1)


if __name__ == "__main__":
    unittest.main(verbosity=1)
