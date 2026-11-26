# Animation review

Played end to end at 390×844 in English and Arabic (Playwright, frame
strips every 70–120 ms, timings measured from the tap to the next screen
being usable). Register: calm confidence for adult coaches — things
arrive decisively and settle softly, nothing loops for attention, no
transition holds the player for more than about a second.

Frame strips: `scratchpad/anim/S-*.png` (before), `A-*.png` (after).

## Motion system (src/styles/tokens.css)

| token | value | use |
|---|---|---|
| `--dur-xs` | 120 ms | press, toggle, small feedback |
| `--dur-s` | 200 ms | small state change, Reaction Toki exit, switch thumb |
| `--dur-m` | 280 ms | a card or beat entering, door stagger, score rows |
| `--dur-l` | 400 ms | screen-level moves, door opening, room dissolve |
| `--dur-xl` | 560 ms | a character moment (reveal Toki) |
| `--stagger` | 50 ms | per item in a list entering together |
| `--ease-standard` | (.2,0,0,1) | movement within a screen |
| `--ease-enter` | (.05,.7,.1,1) | arrivals: quick start, long soft landing |
| `--ease-exit` | (.3,0,.8,.15) | departures: gentle start, quick finish |
| `--ease-spring` | (.34,1.3,.64,1) | one soft overshoot (cards, totals, Toki landing) |
| `--ease-bounce` | (.34,1.56,.64,1) | celebrations only |
| `--ease-anticipate` | (.36,−.18,.3,1) | a wind-up before a move (Toki setting off) |

The legacy names (`--ease-smooth`, `--duration-fast/base`) now alias the
new tokens, so older rules follow the system without being rewritten.

## Audit

| # | Where | What it did | Problem | Now |
|---|---|---|---|---|
| 1 | Hall → room | walk 450–1150 ms, hide 560, wipe 420, hard cut | **1.9 s** dead time (playtesters: "~3 s, double taps"); room cut in from teal | walk 320–800 ms with anticipation, Toki into the doorway 480 ms on the exit curve, wipe overlaps after 200 ms, room **dissolves** out of the same teal: **1.0 s** |
| 2 | Reaction Toki | pill under Toki at top 52 px | the "Look again" pill sat **on top of the question** | sits on the end of the beat strip, label to his side; prompt fully readable (EN + AR measured) |
| 3 | Reaction Toki | one generic pop for every reaction | no character: right, wrong and celebration felt the same | right: crouch → stretch → land (620 ms); miss: slump to the side → recover (760 ms, mirrored in RTL); restored: two hops (900 ms); label slides out from Toki 90 ms later; exit on the exit curve |
| 4 | Reaction Toki, reduced motion | `translate(-50%, 0)` left over from an old layout | shoved Toki half his width off-place for reduced-motion users | fade only, correct position |
| 5 | Beat changes | no scroll handling | the reveal (verdict + Toki at its top) **opened halfway down** after a long beat | every beat / phase starts at the top (`useScrollTopOn`, all five room screens) |
| 6 | Conversation | Toki's line and the teacher's reply faded in together | the reply didn't read as a reply | reply lands 520 ms after the line; outcome card after the reply |
| 7 | Score summary | static block | the tally read as a wall | rows count in on a 50 ms stagger; total lands last with a soft spring |
| 8 | Toki idle (title, map, hall) | 3.4 s breathe pulse | read as a sprite pulsing | 6.8 s cycle: two breaths, a weight shift onto one foot and back |
| 9 | Toki walk / hop | bob + tilt; hop with no wind-up | no weight | contact squash on each step; hop has a crouch, stretch, landing squash and a rest beat |
| 10 | Reveal Toki | 0.6 → 1.08 bounce over 700 ms | too much for the register | 0.82 → 1.03 spring over 560 ms |
| 11 | Name switch | animated `inset-inline-start` (layout) | layout work every frame | transform, spring, mirrored by `--dir` |
| 12 | Leave room | note appeared instantly | abrupt | 200 ms slide-in; button press scales |

Measured (Arabic run, no screenshot overhead): title → map 308 ms;
hall door → room **1886 → 1001 ms**; right answer → next beat 547 ms.

## Left alone, on purpose

- Title parallax drift, map node pop-in stagger, door enter stagger, option
  stagger, wrong-answer shake (320 ms), right-answer light sweep, badge
  card entrance — already in register and fast.
- School Visit closing lines (1.4 s per line): paced to the narration.

## Owned by other passes (noted, not changed)

- **Map tap → hall: 1.5–2.2 s.** The walk along the road plus the
  shrink-into-the-school entrance (game-feel pass). Suggest the walk be
  capped near 700 ms when Toki is already at the target school.
- **Room → first evidence dot: ~0.8–1.0 s** (SceneHeader reveal, game-feel
  pass with the guided pointer).

## Ready for frame art

`src/components/TokiSprite.tsx` feature-detects `src/assets/tokiFrames.ts`
(`TOKI_FRAMES: { idle | walk | walkAway | point | think | celebrate | affirm: { frames, fps, loop } }`).
Reaction Toki already renders through it (poses `affirm`, `think`,
`celebrate`); when frames exist they play, and the CSS body motion stays as
the gentle carrier. Blinks need frames; the single-image idle can't blink.

## Platform rules kept

Transforms and opacity only; `-webkit-` keyframes alongside; no
individual `translate:`/`scale:` properties, no `color-mix`, no `:has`;
no `calc()` inside `rotate()` (separate RTL keyframes instead); every new
animation has a reduced-motion path, on top of the global guard in
tokens.css.
