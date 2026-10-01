# Teardown prompt

The skill tears every reference down with this prompt (step 3). It also works on its own: paste it into any vision model together with a thumbnail you like.

```
Describe this thumbnail as a complete JSON style spec so an image model can
recreate the style for a different topic. Fields: layout (grid, zones for
person, object and text, empty areas), person (pose, expression, gaze,
position, share of frame height, crop, clothing), object (what, material,
finish, lighting, shadow, size), background (type, color, depth), text
(word count, font style, weight, case, color, outline, position, size),
camera (lens, angle, focus), lighting (key, fill, rim, color temperature),
palette (base, accent), mood. Describe style only, not the creator's identity
or brand.
```

Then apply it:

```
Apply this style JSON to my video about [topic]. Keep layout, light and
materials. Replace the object with [your idea]. Leave the text zone empty.
```

## What the skill adds on top

The skill fills the same fields and four analysis fields that steer the concepts and never go into the image prompt:

- `why_it_works`: the one idea a viewer gets in half a second, and the question it opens
- `verdict`: `thumbnail`, `title_and_trend`, `both` or `unclear`. Did the image carry this outlier, or its title plus a trending topic?
- `evergreen_fit`: would the format carry a topic with no news behind it?
- `borrow`: the transferable move, not the content

Rules for filling it: be concrete and measurable (hex colours, light direction in degrees, share of the frame), describe gradients explicitly (an unspecified two-colour background tends to come back as a hard split), and write "no person" when there is none.
