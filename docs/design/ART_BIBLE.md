# Art bible — Toki's Coaching Quest

One visual language for every picture in the game: classroom scenes, the
world map, Toki's poses and the story films. All generated art comes from
Gemini's image model ("nano banana" family) through `tools/art/gemini.py`,
always with this bible's preamble and Toki's reference sheets attached.

## 1. The look in one paragraph

Cinematic, warm, painterly illustration — the feel of a well-lit animated
feature's background paintings, not a comic and not a photo. Soft brush
texture, gentle depth of field, clean readable shapes, late-morning light
through big classroom windows. Calm and confident, never hyper or sugary:
the audience is adult instructional coaches, and every picture should feel
like a real UAE school on a good day.

## 2. Palette (tied to the game tokens)

| Role | Colour | Token |
|---|---|---|
| Hero accent, Toki's body, positive light | teal `#2BD6B8` → `#0FA89A` | `--toki-teal` |
| Shadows, depth, night, ink | indigo `#3B2A78` → `#1F1B3A` | `--toki-indigo` |
| Warm light, highlights, attention | warm orange `#F5A623` / `#FCB644` | `--toki-orange` |
| Walls, floors, daylight neutrals | sand `#F3EEE6`, soft stone `#E6E1EF` | page neutrals |

Rules: neutrals lean warm sand, shadows lean indigo (never grey-black),
one warm-orange accent per picture leads the eye to what matters. Teal is
Toki's colour — keep large teal surfaces out of the background so he reads.

## 3. Light and camera

- **Light:** soft daylight from one side (windows), warm key, cool indigo
  fill in shadows. No harsh noon light, no neon, no lens flare.
- **Classroom scenes:** eye-level of a seated adult, slightly wide (≈28 mm),
  the whole room readable, a clear floor plane in the lower third where
  Toki can stand. Composition follows the room's evidence hotspots (see §6).
- **Story films:** filmic shots — establishing wide, medium two-shot for a
  conversation, close-up for a reaction; leave headroom and calm areas for
  subtitles (bottom 20 %) and quote pop-ups (upper corners).
- **Map / schools:** gentle 3/4 isometric view from above, toy-like but not
  plastic, matching the existing CSS map's perspective.

## 4. People and places (UAE)

- **Schools:** modern UAE public/private schools — clean concrete and sand
  facades, shaded courtyards, palm trees, covered walkways, the UAE flag on
  the pole where natural.
- **Classrooms:** bright, orderly, modern: tablets or laptops on desks,
  interactive screen or whiteboard, student work on the walls (no readable
  words), group tables or rows as the scenario says, AC units, blinds.
- **Teachers:** Emirati and Arab teachers as the norm (women in abaya and
  shayla, men in kandura and ghutra or smart shirts), plus the realistic
  mix of expatriate teachers found in UAE schools. Professional, warm.
- **Students:** age-appropriate to the scene (KG to Grade 12), school
  uniforms, modest dress, natural poses; girls' and boys' classes or mixed
  KG as appropriate to the grade. Faces friendly and generic.
- **Diversity and dignity:** nobody caricatured, nobody sexualised, no
  stereotypes; struggling students shown with care.

## 5. Never in a picture

- Text of any kind: no letters, numbers, words, signs or captions (the game
  renders all text, so Arabic and English both work). Board content is
  suggested by shapes and lines only.
- Logos, brands, trademarks, real product designs, the Alef logo.
- Real or recognisable people, celebrities, officials.
- Copyrighted characters or styles of named living artists.
- Weapons, violence, distress imagery, anything a school would not show.

## 6. Scenes follow the evidence

Each room's evidence hotspots live in the level data as `x, y` percentages
of a 4:3 frame. The scene prompt places the object each hotspot names in
that region ("the group table in the lower left third", "the board at top
centre"). Generated scenes are 4:3 so the percentages map 1:1. After a run,
review `tools/art/reports/scenes.md`; if an object landed elsewhere, either
regenerate that scene (`force`) or move the hotspot in the level file.

## 7. Toki model sheet

Toki is the game's mascot and must look identical everywhere.

- **Always** attach the reference images: `src/assets/skins/skin-teal.png`
  (canonical body), `src/assets/raw/toki-face-teal-hero.png` (face),
  `src/assets/raw/toki-reaction-walking.png` (proportions in motion).
- Body: a rounded teal droplet/blob shape with an indigo swept hair tuft,
  big friendly eyes, wide smile, small white-gloved hands, white sneakers;
  no neck, no extra limbs, no clothes unless a skin says so.
- Proportions: head-body is one shape about 1.4 × as tall as it is wide;
  hands and feet small; outline style and colours exactly as the reference.
- **Sprites** (poses): pure flat background `#00FF00` for clean removal,
  full body in frame, centred, feet on the same baseline, same scale across
  every frame of a set, no shadow on the ground (the game draws its own).
- **In scenes and films:** Toki is painted into the scene's light but keeps
  his flat colours and outline so he reads as the same character.

## 8. Reusable prompt preamble

`tools/art/gemini.py` exports `PREAMBLE` (scenes, films, map) and
`SPRITE_PREAMBLE` (Toki poses). The story films import `PREAMBLE`:

```
Cinematic, warm, painterly digital illustration in the style of a modern
animated feature's background art. Soft brush texture, gentle depth of field,
soft late-morning daylight from large windows, warm key light and cool indigo
shadows. Palette: warm sand and soft stone neutrals, indigo (#3B2A78) shadows,
one warm orange (#F5A623) accent leading the eye; keep large teal areas out of
the background. Setting: a modern school in the United Arab Emirates. People:
Emirati and Arab teachers (women in abaya and shayla, men in kandura) and
students in school uniforms, modest, natural, friendly, generic faces, nobody
recognisable. Absolutely no text, letters, numbers, signs, logos or brand marks
anywhere in the image; boards and posters show only abstract shapes and lines.
```

When Toki appears, add: *"Include Toki exactly as in the attached
reference images: same teal body shape, indigo hair tuft, face, white gloves
and sneakers, same flat colours and outline."*

## 9. Delivery formats

| Group | Size | Format | Where |
|---|---|---|---|
| Classroom / boss / visit scenes | 1200 × 900 (4:3) | JPEG q≈80, ≤150 KB | `public/art/scenes/<id>.jpg` |
| Toki sprites | 512 px tall | PNG with alpha | `public/art/toki/<pose>-<n>.png` + `toki.json` |
| World schools | 512 × 512 | PNG with alpha | `public/art/schools/w<n>.png` |
| Map background | 1080 × 1620 | JPEG ≤220 KB | `public/art/map/background.jpg` |

Everything is lazy-loaded from `public/art/` and listed in
`public/art/manifest.json`. The game only asks for files in the manifest
and falls back to the bundled art otherwise, so a missing or rejected image
never breaks a screen. No WebP-only output (iOS 12 has no WebP).
