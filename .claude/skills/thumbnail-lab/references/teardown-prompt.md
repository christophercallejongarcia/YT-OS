# Teardown and remix

A JSON image trick that circulates among creators: let a model tear a thumbnail that works down into its complete JSON, swap only the content, and apply it to your own photo. It also works on its own in any chat with a vision model.

## 1. Teardown

Upload the thumbnail and ask, word for word:

```
Give me the complete JSON for this image.
```

Do not give it fields, a schema or a length. The value is in the detail you would never write yourself: positions and sizes in pixels, hex colours, font weight and outline, materials, light direction, glow, grain, the exact texts. A good answer runs to 8,000 to 20,000 characters. Cut it to a fixed schema and you lose most of that.

In the skill, you answer this request yourself, looking at `refs/<id>.jpg`, and save the JSON unchanged as `styles/<id>.json`.

## 2. Remix: swap content, keep everything else

Copy the JSON and change only the content fields:

- **Headline:** the exact new text, same typography, position and size. Remove any other text of the template, unless it is part of the format (for example panel numbers).
- **Objects, icons, panels:** the new items in reading order, same style, colours, glow and positions.
- **Person, with your face:** remove every appearance detail of the template's person (age, hair, eye colour, beard colour, skin description) and state that face, hair, beard, skin tone and eye colour come exactly from Image 1. Keep pose, expression, gaze, clothing and light.
- **Person, faceless:** replace the person with an object or remove them, and adjust the layout fields that mention them.
- **Descriptions:** rewrite every description, summary or recreation-prompt field so it matches the changes.
- **Everything else stays:** layout, coordinates, background, colours, effects, camera, light, mood.

Edge cases:
- Text inside the scene (a sign, a wordmark on a banner, a label on an icon) goes, unless the format needs it (panel numbers).
- Traces of the template's person outside the person block go too: skin hex values in the palette, "sharp on the beard", hair colour in a rim-light note. Keep the light itself.
- A longer headline keeps the position and the text box; if it no longer fits at the same size, lower the size until it fits the box.
- New objects take the size and position of the ones they replace. Remove values that described only the old content (an accent colour that belonged to a removed diagram).

## 3. Apply

Send the remixed JSON as the prompt, with your photo as Image 1 and the template as Image 2, and name their roles at the top of the JSON:

```json
"input_images": {
  "Image 1": "photo of the creator; the person in this JSON is this person: face, hair, beard, skin tone and eye colour exactly from this image",
  "Image 2": "the original thumbnail this JSON describes; style reference only, do not copy its person, its logos or its text"
}
```

In a chat it is two messages: "Give me the complete JSON for this image." with the template, then your photo with "Apply the previous JSON to this image." Then change single fields for variants.

## What the test showed (40 images, judged blind)

- The complete teardown is the big lever. With a face, every arm with a teardown beat "template image plus a short sentence" in 10 of 10 judgements.
- JSON beat the same content as prose by a small margin: ahead on all 6 sheets where both judges agreed, never behind.
- Best overall: JSON plus photo plus template in context. Without a face, the template image in the call made the clear difference.
- Short headlines drawn by the image model were exact 40 of 40 times, umlauts included.
- Wrapping your own prompt in braces gains nothing. The content of the JSON matters, not the brackets.
