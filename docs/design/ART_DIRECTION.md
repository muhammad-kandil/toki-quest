# Art Direction — Toki's Coaching Quest

**What "polished" means here.** A DLIS opens this between two school visits, on a phone, often in a corridor. It should feel like a well-made object in the hand: surfaces that have weight, light that comes from one place, motion that settles. Not an arcade. The register is *calm confidence* — the same register as the content. Depth is used to make the world legible (what is near, what is far, what is pressed, what is lifted), never for spectacle.

Everything below is CSS and SVG. No WebGL, no new bitmaps, no libraries: it runs in Telegram's iOS 12 webview through the legacy build, and the whole pass costs ~11 KB of CSS and ~2 KB of JS.

## 1 · One light

Light comes from **above, slightly front-left**. Every raised surface obeys it:

| Token | Use |
|---|---|
| `--edge-light` | 2 px inner highlight along the top rim of any card, chip or button |
| `--edge-dark` | 2 px inner shade along the bottom rim |
| `--elev-1` *resting* | cards at rest: choices, doors, chat bubbles, labels |
| `--elev-2` *raised* | hovered / selected cards, the map stage, earned badges |
| `--elev-3` *floating* | reserved for one hero element per screen |
| `--elev-pressed` | the card sinks: highlight flips to a shade, ambient shadow collapses |
| `--lit-teal` / `--lit-indigo` | CTA gradients, top-lit; `--lit-teal-pressed` flattens them |
| `--glass-bg` | top-bar chips and map labels, solid-first with `backdrop-filter` on top |

Rules: a surface is either resting, raised, floating or pressed — nothing in between. Shadows are indigo-tinted (`rgba(69,43,116,…)`), never grey. Highlights are white. Gradients on surfaces run top→bottom and move at most 4 % in luminance; the lit edge does the work, not the gradient.

## 2 · Depth per screen

- **Title** — three star layers drift on different periods (26 s / 18 s / 12 s, amplitude 4 / 9 / 16 px). Toki floats 9 px; his ground shadow breathes the opposite way, which is what sells the height. A teal glow breathes behind him.
- **World map** — three planes: far sky + hills, near hills, then the road. The planes translate sideways by `--par` (−1…1 from Toki's x) at −6 px and −14 px, so the landscape slides as Toki walks. Schools are isometric blocks (lit roof plane, sunlit right wall, shaded left wall, ground ellipse). The current school lifts 5 px with a larger shadow and a teal halo; locked ones sit lower. The road has a contact shadow underneath and a lit crown on top. A vignette gives the stage a lens.
- **Hub** — doors are top-lit cards on a faint perspective floor. Hover lifts, press sinks. On entry the chosen door tilts away 9° in perspective and a lit leaf swings across it before the wipe.
- **Classroom** — the room sits on a plane behind Toki: it starts 10 % zoomed and eases back as he walks in (camera settling), then drifts imperceptibly. A vignette darkens the corners; the evidence markers are the bright points. When the last clue is found, one band of light sweeps the room.
- **Choices** — cards lift on hover, sink on press; a wrong one shakes and sinks; the right one lifts, turns teal and a light band crosses it once.
- **Conversation** — bubbles are cards; Toki's are lit indigo. The teacher's side carries a tint from their stance (proud = warm, tired = grey-violet, defensive = rose, eager = teal), so the room has a mood before a word is read.
- **Badges** — coins: a radial disc with a conic rim highlight (`@supports` guarded; radial fallback), gold for earned, matte for locked. Earned coins breathe 3 px.

## 3 · Motion rules

- Animate **transform and opacity only**. Box-shadow changes only on state transitions (150 ms), never continuously.
- Durations: micro 150 ms · state 280 ms · settle 500–1100 ms · ambient loops 3–26 s. Ambient loops are `alternate` and sub-pixel per second; nothing loops faster than a breath.
- Direction-aware: every lateral move uses `calc(var(--dir) * …)` and logical properties, so RTL mirrors for free.
- `prefers-reduced-motion`: parallax freezes, sweeps and swings become fades, loops stop. Depth stays — it is painted, not animated.
- Celebrations scale with the achievement: a lit sweep for an answer, a leaf for a door, a theme for a world.

## 4 · Colour of depth

Shadows: indigo at 10–22 % alpha. Ground contact: an ellipse, not a blur. Glow: brand teal at ≤ 35 % alpha, only on the current/active thing. Gold (`#F2C96A → #FFFDF5`) only on earned badges and the Perfect Classroom's master badge. Nothing is pure black or pure grey anywhere.

## 5 · With an illustration budget

The engine is ready for real art; the prompts below match the existing World 1 scenes (flat vector, indigo outlines ≈ 2.5 % of character height, teal/pink/orange palette, 4:3, room drawn from a low three-quarter angle with an empty floor zone at the bottom-centre for Toki).

**Per-world classroom scenes (7 × 4 + bosses):**
> "Flat vector illustration of a UAE secondary classroom, low three-quarter view, soft indigo outlines, palette teal #1DD6BB / lilac #F5F3FA / orange #FFA000 accents, no people in the foreground, empty floor space bottom-centre, 4:3. World theme: *{Assessment — exit tickets piled on the desk, a marks ledger open on the projector}* / *{Alef in Action — tablets on every desk, a completion dashboard on the board}* / *{Feedback — exercise books with margin notes, a 'well done' sticker chart}* / *{Questioning — a hands-up forest, a timer on the board}* / *{Differentiation — three coloured worksheet trays, colour-coded seating}* / *{Lethal Mutation Academy — a model classroom, framed evaluation certificates on the wall}* / *{School Visit — a corridor with six labelled doors}*."

**Rive Toki.** Replace `TokiAvatar` with a Rive state machine: inputs `mood` (idle / walk / affirm / think / celebrate / hide), `facing` (−1/1 for RTL), `blink` trigger; keep the breathing idle and the 240 ms walk cycle timings already in `TokiAvatar.css` so the game feels the same, only alive. Keep the drop shadow in CSS (one ellipse) rather than in the file, so it still obeys `--elev` tokens.

**Screenshots:** `docs/design/shots/` — `before-*` and `after-*`, EN and AR, 390×844 (JPEG): title, map, hub, classroom, evidence found, choice, conversation, badges. Regenerate with `python3 e2e/shots.py <port> <prefix>` against a served build.
