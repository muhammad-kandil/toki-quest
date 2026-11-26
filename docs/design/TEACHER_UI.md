# Teacher UI spec: Ms. Mariam's School

Owner: UI and visual design. Tokens and shared classes: `src/teacher/theme.css`
(scoped to `.teacher-app`). Mocks: `docs/design/teacher-mocks/` (HTML that uses
theme.css, plus PNGs at 390×844 @2x). Product rules: `TEACHER_REBUILD.md`.
Data: `src/teacher/types.ts`.

Engineers: use only `--t-*` variables and `t-*` classes. If something is
missing, ask for a token; don't add hex codes in screens.

## 1. Look

A sunlit painted campus. The painted art follows `ART_BIBLE.md`: warm sand
neutrals, indigo shadows, one orange accent. The UI sits on top of it as
**white cards with indigo text**. It should feel playful, warm and
professional, because the players are adult teachers.

| Role | Token | Use |
|---|---|---|
| Page | `--t-bg` sand `#F3EFE6` | screens without a picture, sheet background |
| Card | `--t-panel` white | every card, choice and HUD card (HUD cards use `--t-glass`) |
| Ink | `--t-ink` `#231B45`, `--t-ink-2` indigo | text, headings, icons |
| Muted | `--t-muted` `#5E5584` | secondary text (6.8:1 on white) |
| Brand / good | `--t-teal`, text `--t-teal-deep` | primary buttons, done, good state |
| Look here | `--t-orange`, text `--t-orange-deep` | next pin, needs-you, clock |
| Needs care | `--t-rose`, text `--t-rose-deep` | poor state, "needs help" kind |
| Insight | `--t-blue`, text `--t-blue-deep` | insight outcomes, "low participation" |

**Rule:** the bright fills (teal, orange, rose, blue) are for fills, rings
and bars, always with `--t-ink` text on top. Text in those colours always
uses the `-deep` token. Dark scrims (`--t-scene-label`, `--t-top-fade`,
`--t-caption-fade`) are only used where UI sits on the painted picture.

**States** (`Outcome.tone`, student rings, class chips): `--t-good*`,
`--t-mixed*`, `--t-poor*`, `--t-insight*`. Each one has a fill, an `-ink` and
a `-soft` background. **Stages**: `--t-stage-launch` blue,
`--t-stage-facilitate` teal, `--t-stage-extend` orange. **Event kinds**:
`--t-kind-*` (chip text colours).

**Type.** Display is Baloo 2 (EN) or Baloo Bhaijaan 2 (AR), weights 700/800,
for headings, buttons, numbers and pins. Body is Inter (EN) or IBM Plex Sans
Arabic (AR). Scale: `--t-fs-2xs` 11 · `xs` 12 · `sm` 13 · `base` 15 · `md` 17
· `lg` 20 · `xl` 24 · `2xl` 30 · `3xl` 40. Numbers use `.t-num` (tabular).

**Space** is on a 4px base (`--t-s-1…8`), with a 16px screen gutter. **Radii**:
8 / 12 / 16 (cards) / 22 (HUD) / 28 (sheet tops) / pill. **Elevation**: three
levels lit from the top (`--t-elev-1..3`) plus `--t-elev-pressed`. Shadows
lean indigo and are never grey-black.

**Z-layers** (lowest to highest): scene 0, pins 10, avatar 20, bubble 25,
HUD 30, sheet 40, modal 50, toast 60.

## 2. Screens (390×844, portrait)

Every screen sits inside `.teacher-app`. Respect `--t-safe-top` and
`--t-safe-bottom`, because Telegram draws its own header above the app.

### Title
- Full-bleed campus art, blurred and dimmed under `--t-caption-fade`.
- Bottom third: the "Ms. Mariam's School" wordmark (`--t-fs-3xl`, white
  display), a one-line promise ("Real classroom moments. Something to try on
  Monday."), a `t-btn t-btn--block` labelled "Start", and a ghost link
  "Coach mode" at `--t-fs-sm`.
- Language toggle EN / عربي: a top-end `t-chip`.

### Name
- Sand page. Ms. Mariam's portrait at 96px on a teal ring. Her line, in a
  speech card (`t-card`): "Welcome! What should the students call you?"
- One text field, 48px tall, 16px text so iOS does not zoom. Below it is a
  "Keep 'Ms. Mariam'" ghost button, and "Continue" sits at the bottom
  (`t-btn--block`).

### Campus with HUD (mock: `campus.png`, `campus-ar.png`)
- The isometric campus picture covers the screen
  (`public/art/campus.jpg`, 3:4). It pans vertically if it is taller than
  the viewport. Pins are placed by `Location.x / y` %.
- **Top HUD, row 1**: the classes pill (`t-hud-card--pill`) holds "Classes" and
  one `t-chip--dot` per class, toned good / mixed / poor / insight. Insight
  means "today", not started. Settings (`t-btn--icon`) is at the end.
- **Top HUD, row 2**: the Toolkit pill (orange icon disc and count) on the
  start side. The **Term Pass** button (`t-pass-btn`, gold) and the small
  **notes chip** (`t-notes-chip`) are on the end side (see §7).
- **Bottom start: teacher card** (`t-hud-card`, 218×76). It holds the
  portrait (`t-portrait`, 52px, teal ring), the name, the grade and
  subject, and energy as three pips (`t-meter--pips`) with the label
  "Energy 2/3". Energy is never spent on anything. It only shows how many
  lessons fit today.
- **Bottom end: calendar card** (128×76). It holds the eyebrow "Term 1 ·
  Week 1", "Day 3" in display 22, and three period dots with the current
  period's name (Morning / Midday / Afternoon).
- **Pins** (`t-pin`): see §3. There is one `t-pin--next` at a time. Above it
  is a `t-pin__flag` that reads "Next lesson".
- **Ms. Mariam** stands next to her current place: a 50px portrait token
  with a white ring, an outer teal ring, a ground-shadow ellipse and a "You"
  tag. A dotted white route (SVG, round caps) shows the way to the next
  pin.
- Tapping a pin makes Ms. Mariam walk there, then a `t-sheet` opens with the
  place's name, one line of what it is, and its action ("Start lesson",
  "Open toolkit", "Rest (energy +1)", "Read notebook").

### Adventure: intro (Watch)
- The scene picture fills the top, 2:3 (390×585). Captions run along the
  bottom of the picture under `--t-caption-fade`: white `--t-fs-base`, one
  line at a time, with "Tap to continue" in `--t-on-dark-muted`.
- Speech bubbles (`introBubbles`) are cream cards with a tail, a name
  eyebrow in `--t-rose-deep` and the line in 13/600. Each bubble pops in
  with `--t-ease-spring`.
- The top bar is the same as in the simulation, with the rail on "Watch".
  A "Skip" ghost chip sits top-end.

### Adventure: simulation (Decide) (mock: `classroom.png`)
- **Top bar** over `--t-top-fade` holds the back button, then the eyebrow
  (adventure number and meta) and the title (17px, one line, ellipsis).
  At the end is the **lesson clock**, a `t-hud-card--dark` showing "12:00 / 40"
  in orange with a `t-meter--time` bar under it.
- **Loop rail** (`t-rail`) shows seven steps: Watch, Decide, Discover,
  Challenge, Share, Reward, Unlock. Labels are 8 characters or fewer, so
  "Community" becomes "Share".
- **Hotspots** (`t-hot`) are placed by `Student.x / y` %. Each one is a 48px
  ring with an initial, and its name tag is under it. The ring colour shows
  the student's state (§3). Objects use `t-hot--object` (42px, dashed).
- **Power-up tray** (`t-powerup-tray`): sits at the bottom-end of the scene,
  above the class strip. See §8.
- **Class strip** (above the sheet): one pill per student with a state dot and
  two 26px bars, understanding on top and engagement below.
- **Event sheet** (`t-sheet`, top ≈ 496px; the picture's floor sits under
  it). From top to bottom:
  - the grip;
  - the kind chip (`t-chip--poor/good/insight/mixed` with `--dot`) and, at
    the end, "28 min left" (`t-chip--time`);
  - the heading (`ClassEvent.line`, `--t-fs-lg`) and the ask (`--t-fs-sm`,
    muted);
  - 2–3 `t-btn--choice` buttons. Each shows the label (display 17), then
    the "sub · short hint" line, with a minutes chip at the end.
- While the sheet is open, the other students get `t-hot--quiet` and the
  active student gets `t-hot--active`.

### Adventure: outcome / event panel
- After a choice, the same sheet swaps its content (cross-fade `--t-dur-m`)
  to a `t-card t-card--{tone}`. It holds the outcome title, the body, and
  the effects as small arrows ("Sara · understanding ↑↑").
- "Continue" (`t-btn`) closes the sheet. If the outcome has `next`, a
  `t-toast` says "Something's coming up…" when the follow-up starts pulsing.

### Adventure: resource card (Discover)
- This is a modal over `--t-scrim`, animated with `t-reveal`. The card is
  white with a stage-coloured header band (`--t-stage-*`). The band holds
  the icon tile (44px, white glyph) and a stage eyebrow.
- Below the band: the title (`--t-fs-lg`), "What it does" (base), and a
  **"Try it Monday"** box (`--t-good-soft` background, `--t-good-ink` label).
- If `placeholder` is true, add `t-chip--placeholder` with "Name to be
  confirmed by Alef".
- Actions: "Add to toolkit" (`t-btn`), plus a toast "Added to your toolkit ·
  3".

### Adventure: exit ticket (Challenge debrief)
- Sand page with a top bar. There is one question card per student: their
  ring and name, with the question "Where did Sara land?". The answer is
  three state chips (good / mixed / poor) that the teacher taps.
- Feedback compares the guess with the real state ("You read her right").
  This is reflection, not a score.

### Adventure: community (Share)
- The `communityTopic` as a heading, then example posts styled as Telegram
  bubbles (white, blue name). They are labelled with
  `t-chip--placeholder` "Example".
- A "Share my move" textarea (min 84px tall), "Open the Alef community"
  (`t-btn`) and "Skip" (ghost).

### Adventure: reward
- Sand page. A `t-medal` (128px) shows the badge glyph, with the badge title
  (`--t-fs-2xl`) and `why` under it.
- **Notebook page preview**: the path as a row of chips, and the students
  where they ended up (ring plus bars).
- "New in your toolkit" lists the resource cards found (small `t-card`
  rows).
- The Term Pass step chip reads "Term Pass +1 lesson". There are no points.

### Adventure: unlock
- The campus is shown again, dimmed. The new pin pops from `--locked` to
  `--next` (`t-medal-in` scale, `--t-dur-xl`).
- A teaser card (`t-card--raised`) carries the teaser text and "Back to
  campus" / "Go now".

### Staff room (toolkit)
- Sand page. The title is "Your toolkit", and the count shows as
  `t-chip`.
- Filter chips by stage: Launch, Facilitate, Extend.
- The list holds one `t-card` row per resource: a stage-coloured icon tile,
  the title, and the "Try it Monday" line. Locked or unfound entries are not
  shown; the count says "8 found".
- The rest action is at the bottom: "Rest here (energy back to 3)". It is
  disabled with a note when energy is already full.

### Library (notebook)
- One card per finished lesson: number, title, badge (`t-medal--sm`), path
  chips, and student rings. A tap opens the full page from Reward.

### Principal's office
- A portrait of the principal (painted), with the story beat as speech
  cards. At the bottom is the next adventure's briefing card (meta, title,
  one line) with "Go to Grade 5" (`t-btn`), which walks Ms. Mariam there.

## 3. Components and states

### Pin (`t-pin`)
The anatomy, from the top down:
- the optional `__flag` (indigo pill, "Next lesson");
- the `__head` (44px circle, glyph or class number, 3px ring) with a tip
  (rotated square);
- a ground shadow on the anchor point;
- the `__label` pill under it (dark scene label, 11/600).

The root is positioned at (x %, y %). The tip touches that point.

| State | Head | Ring | Extra |
|---|---|---|---|
| default (place) | white | indigo | none |
| `--next` | orange | white | elev-3, outer orange pulse ring, flag |
| `--done` | teal | white | `__badge` ✓ (indigo) |
| `--locked` | pale lilac | white | `__badge--lock` (CSS padlock), lighter label, `aria-disabled` |

### Student hotspot (`t-hot`)
- **Ring colour**: `--good` teal, `--mixed` orange, `--poor` rose, plus white
  when unknown. The state comes from understanding + engagement (0–6): 5–6
  good, 3–4 mixed, 0–2 poor.
- **`--needs`**: the student has an open event. An outer orange ring pulses
  (`--t-dur-pulse`, transform and opacity), and `__flag` "!" sits top-end.
- **`--active`**: the student whose sheet is open (indigo fill and orange
  halo).
- **`--quiet`**: the other students while a sheet is open (60% opacity).

### HUD cards
- `t-hud-card` is the glass white card, `--pill` is the slim strip, and
  `--dark` sits over the scene.
- All HUD numbers use `.t-num`.
- Nothing in the HUD has a "+" or "get more". The notes chip is not a
  button that opens the shop; the shop opens from the Term Pass and from the
  campus "Shop" place.

### Other shared classes
`t-card` (plus tone stripes, `--raised`, `--inset`), `t-btn`, `t-btn--ghost`,
`t-btn--block`, `t-btn--icon`, `t-btn--choice`, `t-chip` (plus tones,
`--time`, `--placeholder`, `--dot`), `t-meter` (plus `--pips`, `--time`,
`--mixed`, `--poor`), `t-rail` (`is-done`, `is-now`, `--light`), `t-sheet`,
`t-toast`, `t-medal` (`--sm`, `--locked`), `t-stack` (a stand-in for flex
gap), `t-eyebrow`, `t-portrait`, `t-reveal`.

## 4. Motion

UI motion stays under 400ms. Only travel and reveals are longer. Animate
only transform and opacity.

| Moment | Spec |
|---|---|
| Ms. Mariam walks between pins | translate along the route, `--t-dur-walk` (900ms, scale with distance, max 1400ms), `--t-ease-walk`, plus a 2px bob every 300ms. The route dots fade out behind her. The sheet opens after she arrives. |
| Next pin | outer ring `t-pulse` 1.6s loop. Only one thing on the screen pulses at a time. |
| Needs-you student | same pulse in orange. When it is tapped, it stops pulsing and becomes `--active`. |
| Sheet | `t-sheet-in`, `--t-dur-l` with `--t-ease-enter`. Content swaps cross-fade `--t-dur-m`. |
| Resource card | `t-reveal` (rise 24px, scale .96 to 1), `--t-dur-xl` with spring |
| Medal | `t-medal-in` (scale .4 and -12° to 1) |
| Toast | `t-toast-in` from 12px below, gone after 2.6s |
| Lesson clock | the bar width transitions `--t-dur-l`, and the number ticks once per choice, not continuously |

**Reduced motion** (`prefers-reduced-motion`): durations drop to 1ms and
pulses stop. Pulse rings stay visible at full opacity, so "next" and
"needs you" still read through colour plus the flag. Ms. Mariam jumps to the
pin (`--t-dur-walk: 0ms`).

## 5. Arabic and RTL

- Set `dir="rtl"` and `data-lang="ar"` on the `.teacher-app` element (or on
  `<html>`; both work). The fonts, the taller line heights (body 1.7,
  display 1.35) and +1px on the small sizes switch automatically, and the
  eyebrow tracking and uppercase are turned off.
- theme.css mirrors itself with `[dir='rtl']` overrides: card tone stripes,
  choice text alignment, chip dots, pin and hotspot badges, meter fill
  origin, pips, toasts, the shop grid and the certificate lists. Screens
  must mirror their own layout the same way. Don't use `margin-inline`;
  iOS 12 does not support it.
- Campus pins stay at their picture positions (the art is not mirrored). The
  HUD mirrors: the teacher card moves to the bottom-right and the calendar
  to the bottom-left. See `campus-ar.png`.
- Numbers: use Arabic-Indic digits in Arabic copy (٣، ٦/١٢). Class numbers
  on pin heads may stay as written in the data.
- Arrows and glyphs that point (←, ↗) must be flipped with `scaleX(-1)` in
  RTL.

## 6. Accessibility

- **Contrast**: ink on white is 16:1, muted 6.8:1, and every `-deep` text
  token is at least 4.9:1 on sand. White on `--t-scene-label` passes 4.5:1
  over any picture. Never put text in a bright fill colour.
- **Targets** are at least 44×44 (`--t-tap`): pins 44, hotspots 48, choices
  58, buttons 44. Claim and shop buttons sit inside cards that are
  themselves the tap target.
- **State is never colour-only.** Pins have a flag or badge, students have a
  "!" flag and a name, outcomes have a title, and chips carry words.
- Each pin and hotspot is a `<button>` with an accessible name. Use
  "Grade 5 classroom, next lesson" and "Sara, needs you".
- Focus: an orange 3px outline. iOS 12 has no `:focus-visible`, so the
  outline is on `:focus` and is hidden for pointer focus where the browser
  supports it.
- Body text is at least 15px EN and 16px AR, and nothing below 11px. Text
  fields use 16px so iOS does not zoom.

## 7. Term Pass and end-of-term certificate (mocks: `term-pass.png`, `certificate.png`)

The client asked for a battle-pass layout. We keep its visual grammar but
follow our rules:
- **no currency to progress** (each step is one finished lesson);
- **no paid lane**;
- **no countdown** (the term ends when the teacher finishes it).

**Layout (390×844)**
- **Back and notes chip** at the top. Under them is the **gold ribbon banner**
  (`t-pass-banner`: gradient ribbon with folded tails). It holds "Term Pass"
  and "Term 1 · one step per lesson".
- **Progress line**: "6 of 12 lessons finished" with a `t-meter`.
- **Lane heads** (`t-pass-lanes`): on the start side, **Classroom** ("your
  room & Toki", orange tint); on the end side, **Professional** ("for
  Monday's lesson", indigo tint).
- **Track** (`t-pass-rail`): rows of [card | node | card], 136px tall. In
  the centre is an 8px rail, with the teal fill (`__fill`) showing
  progress so far. Each node is a **numbered diamond** (`t-pass-node`), and
  the number is the count of lessons the tier needs.
  - `--reached` is teal.
  - `--current` is orange (the tier you just reached).
  - The default is white with a grey number.
- **Reward cards** (`t-pass-card`, glossy top, `--classroom` or `--pro`) hold
  the art tile (or a Toki skin sprite for outfits), a two-line title, and a
  bottom slot.
- **End-of-term card** (`t-pass-end`, pinned at the bottom over a sand
  fade). It shows the gold seal, "End of term · lesson 12", "Your Term
  Certificate", what it contains, and a gold progress bar.

**Lanes and content**
- **Classroom** has decor for Ms. Mariam's room, Toki outfits, and (after the
  shop decision) a few bundles of thank-you notes.
- **Professional** has an Alef resource card, a story chapter, a
  Try-it-Monday planner page, a community spotlight, and the end-of-term
  certificate. Professional rewards are always free and never priced.

**Card states**

| State | Look | Bottom slot |
|---|---|---|
| `--locked` | pale, art at 45%, muted title | corner badge with the tier number, plus "After lesson 7" |
| `--reachable` | teal border and soft teal halo | **Claim** (`t-pass-claim`, brand-teal "green", glossy, with a 3px underside) |
| `--claimed` | lane tint, ✓ corner badge (teal) | "In your room" / "Owned" / "In your toolkit" in teal-deep |

- Claiming spends nothing. When a card is claimed, the button presses
  (2px), the card cross-fades to claimed, and a toast names where the item
  went.
- Professional items that are claimed open their screen: the resource card
  modal, or the story chapter.

**Certificate screen** (`t-certificate`):
- An indigo page with a soft gold glow. The certificate is cream paper with
  a gold border, an inner hairline frame, and the seal.
- Text: the eyebrow "Ms. Mariam's School · Term 1", then "Certificate of
  classroom practice", then "presented to" with the player's name in display
  30, then a gold rule.
- Then one line on what the term covered, and four list rows with tinted
  icon tiles:
  - students who moved up;
  - Alef resources tried;
  - your go-to move;
  - badges.
- The sign-off reads "Pedagogy Hub · Alef Education · date".
- Actions: "Share with the community" (`t-btn--block`) and "Save as image"
  (ghost on dark).
- An honest footnote: "A record of your practice in the game, not an
  official qualification." The certificate's content comes from the save
  data (`completed`, `toolkit`, badges), so it never shows anything the
  teacher didn't do.

## 8. Thank-you notes and the Campus Shop (mocks: `shop.png`, `shop-place.png`)

> **Rule change, flagged.** `TEACHER_REBUILD.md` and the original brief say
> "no currencies, nothing to spend". The client then decided (2026-11-26) to
> add a shop where earned **thank-you notes** (بطاقات شكر) buy cosmetics.
> This spec designs it with guardrails, but the product rule text in
> `docs/product/` and `TEACHER_REBUILD.md` needs the product director to
> update it. `TeacherSave` in `types.ts` has no notes balance or owned or
> placed items yet. Guardrails, all built into the components:
> - Notes are **earned only**, from Term Pass tiers and the end-of-term
>   bundle. They can't be bought, and the HUD has no "+" or "get more".
> - They buy outfits, accessories and (since the second scope change)
>   **power-ups**. Alef resources, story chapters, lessons and the
>   certificate are **never** priced.
> - **Second flag: power-ups are gameplay, not cosmetics.** Rewind, Extra 5
>   minutes and Teaching assistant change lesson outcomes. That turns the
>   notes into a currency that buys advantage, which is the pattern the
>   rebuild set out to avoid. Rewind also skips the reflection the debrief
>   depends on. Design recommendation for the director: **give each
>   power-up once per lesson for free** (the tray already shows one use per
>   lesson) and keep notes cosmetic. If they stay purchasable, the notebook
>   and certificate must label a lesson "played with power-ups", and badges
>   like "all-good" should ignore outcomes changed by Rewind.
> - The chip is **secondary**: smaller than the Term Pass button, it never
>   pulses while idle, and it is never the first thing on a screen.
> - A price you can't pay yet is shown **muted, never red**, with "1 more
>   note" and no nagging.

**The note icon** (`t-notes-icon`) is a folded card drawn in CSS: cream paper,
an orange-deep edge, an envelope flap and a small rose heart seal. It is not
a coin. Sizes are default 20×15, and `--lg` is 44×32 for the buy moment. In
Arabic the label is "بطاقات شكر".

**HUD chip** (`t-notes-chip`): 32px tall, glass, with the icon and a tabular
count. It sits after the gold `t-pass-btn` in the campus's second HUD row.
When notes arrive, `--gain` does one 400ms scale bump.

**Campus Shop screen** (`shop.png`):
- The bar has back, "Campus Shop" (display 24) and the notes chip.
- A one-line intro says where notes come from and that lessons and
  resources are never for sale.
- **Tabs** (`t-shop-tabs` / `t-shop-tab`, segmented pill, `.is-on` white):
  - **Outfits**: Toki skins and Ms. Mariam's outfits.
  - **Accessories**: classroom decor, desk items, Ms. Mariam's bag, mug and
    lanyard, and Toki hats.
  - **Power-ups**: consumables (see below).

  Owned items show at the top of each tab with their Use / In use state.
  There is no separate "Yours" tab.
- **Grid** (`t-shop-grid`): two columns with float and margins. Each item is
  a `t-shop-card`: a glossy 104px art area (Toki items use the
  `src/assets/skins/*` sprites on teal-soft), an optional `__tag` ("New",
  "Term Pass"), a two-line name, and an action button.

**Item states** (`t-shop-buy`)

| State | Button | Card |
|---|---|---|
| Buy | teal glossy, note icon + price | none |
| Can't yet | `--short`: sand, muted price, "1 more note" under it | none |
| Owned | `--use`: outline teal "Use" | `--owned`, ✓ corner |
| In use | `--inuse`: soft teal "In your room" / "Wearing" | `--inuse`, teal halo |

**Buy moment** (no coin shower, no confetti), 720ms total:
1. The button presses.
2. A large note (`t-shop-note-fly`, `t-note-hand`) rises from the button,
   lifts and turns slightly, and slips into the art: the teacher hands over
   a thank-you note.
3. A soft **"Yours!" stamp** (`t-shop-stamp`, teal outline, -8°, spring from
   1.6×) lands on the art.
4. The chip count goes down by one tick, with no bounce.
5. A white sheet rises: "The reading lamp is yours. You gave 2 thank-you
   notes. Where should it go?", with **Place it in my room** (`t-btn`) and
   **Later** (ghost). For a Toki outfit the sheet says "Put it on Toki" and
   shows Toki wearing it.

With reduced motion, the note flight is skipped and the stamp simply
appears.

**Place it in your classroom** (`shop-place.png`):
- The adventure's classroom picture is shown full-bleed and dimmed 38%.
- Allowed spots are drawn as **slots** (`t-shop-slot`): dashed white
  rounded boxes with a soft teal wash and a label pill.
- The chosen slot (`.is-on`) turns solid teal with a white halo and shows the
  item's sprite in place.
- Below it is a white sheet with the spot name, "Tap a glowing spot or choose
  one here", spot chips that mirror the slots, **Put it here** and
  **Cancel**, and the note "Move or swap it any time from the Shop."
- Slots come from data (the same x/y % as hotspots), so decor never covers a
  student hotspot or the event sheet area (the bottom 30% of the picture is
  out of bounds).

### Power-ups (mocks: `shop-powerups.png`, tray in `classroom.png`)

**Icon style**: the same as the HUD icon discs.
- Each icon is a white disc with an indigo display glyph and a 3px ring in
  the kind's colour (`t-powerup` + kind).
- There are no pictures and no emoji, so the icons read at 38px and
  survive any font.

| Kind | Class | Glyph | Ring | What it does |
|---|---|---|---|---|
| Rewind | `--rewind` | ↺ | blue | take back the last choice and replay the moment |
| Extra 5 minutes | `--time` | +5 | orange | +5 lesson minutes |
| Second look | `--look` | ◎ | indigo | look closer at one student before choosing (like `peek`) |
| Teaching assistant | `--assistant` | TA | teal | another adult handles one table during an event |
| Parent call | `--parent` | ✆ | rose | one student's engagement +1 next lesson |

**Shop power-up card** (`t-shop-card--powerup`) is a full-width row.
- On the start side is a 52px icon (`t-powerup--lg`) with an owned-count
  badge (`__count`).
- Next to it: the name (display 17), what it does (12px muted), and a meta
  line in teal-deep: "You have 2 · one use per lesson". When you have none,
  it reads "None yet · 2 more notes to go".
- The buy button is end-bottom (84×36), with the note icon and the price.
  Use `--short` when you can't afford it yet.

**In-lesson tray** (`t-powerup-tray`):
- A glass pill at the bottom-end of the scene, just above the class strip
  (top ≈ 382px in the mock).
- It shows only the kinds the teacher owns. Discs are 38px with an
  invisible ring that keeps the 44px target, and each has a count badge.
- It never pulses and never prompts. It is lower in the visual order than
  every student.

| State | Look |
|---|---|
| ready | white disc, kind ring, count |
| `.is-armed` | tapped and waiting for a target or confirmation: lifts 3px, orange halo. A one-line hint replaces the sheet's ask: "Tap a student to take a second look" |
| `.is-used` / `[disabled]` | used this lesson or none left: sand disc, grey ring, glyph at 45%, ✓ badge, `aria-label` "…, used this lesson" |

Rewind can only be used while an outcome card is showing. Extra 5 minutes
can only be used in the last 10 minutes of the lesson. Outside those times
the disc is `[disabled]` without the ✓.

## 9. Mock files

| File | Shows |
|---|---|
| `teacher-mocks/campus.html` → `campus.png` | campus, all pin states, Ms. Mariam and route, full HUD with Term Pass and notes |
| `campus.html?ar` → `campus-ar.png` | the same in Arabic / RTL |
| `classroom.html` → `classroom.png` | simulation: rail, clock, hotspot states, power-up tray (one used), class strip, event sheet |
| `term-pass.html` → `term-pass.png` | Term Pass with all card and node states |
| `certificate.html` → `certificate.png` | end-of-term certificate |
| `shop.html` → `shop.png` | Campus Shop (Accessories), item states, buy moment (frozen mid-animation) |
| `shop-powerups.html` → `shop-powerups.png` | Power-ups tab: icons, owned counts, can't-afford state |
| `shop-place.html` → `shop-place.png` | place-it preview |

The mocks load fonts from `node_modules/@fontsource` (via `mock.css`) and
the stand-in art from `public/`. The campus uses `public/art/map/background.jpg`
and the `public/art/schools/*` buildings until `public/art/campus.jpg`
exists.
To re-render, run Playwright at 390×844 with deviceScaleFactor 2 over the
`file://` URLs.
