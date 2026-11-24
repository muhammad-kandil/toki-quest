# Sound design — Toki's Coaching Quest

Everything is synthesized with Web Audio at runtime (`src/audio/sfx.ts`).
No audio files: the game is a static site inside Telegram's webview, and
one less thing to load on an iPhone in a school corridor.

## Register

The player is an adult coach, often in a staff room with colleagues
nearby. The rules:

- **Short, soft, tonal.** No arcade bleeps, no buzzers, no screen-shake
  equivalents. A "wrong" answer sounds like a question, not a penalty.
- **Rare big moments.** Only three cues are allowed to be more than half a
  second: a badge (~1.2 s), a world theme (~2 s) and the quest theme
  (~4 s, heard once). Everything that fires every few seconds is under
  0.3 s.
- **Music stays out of the classroom.** The world bed plays on the map and
  in the hub; a classroom is quiet so the evidence has the room.
- **Master at 0.38, music at 0.16** of master. Present, never loud. A
  phone at half volume should barely register it beside a conversation.
- `prefers-reduced-motion` shortens the three long cues and drops their
  tails; it never changes the short ones.
- The mute toggle (TopBar) stops everything, including the bed, and
  restores the bed when turned back on. Preference lives in
  `localStorage["toki:sound"]`.

## Mixer

```
master (0.38) ─ destination
├─ music bus (0.16)   world bed; ducked under important cues
└─ sfx bus (1.0)      every cue
```

`duck(seconds, depth)` dips the music bus to `depth × 0.16` and lets it
recover with a 350 ms time constant. Correct/lookAgain/evidenceAll duck
lightly for half a second; reveal, lethal and the themes duck deeper and
longer so they are never heard through the pad.

## The world bed

A pad: each chord is four voices × two detuned oscillators (±4 cents,
sine on the root, triangle/saw above), through a low-pass filter whose
cutoff breathes with a 0.06 Hz LFO (±35 %). Chords crossfade every
7–9 s with 2.2 s attacks and 2.6 s releases, so there is never a hard
edge. Gain fades in over 2.5 s and out over 1.2 s on screen change.
`sfx.music(mood)` is idempotent per mood — a bed never stacks.

| Mood | Worlds | Chords | Cutoff |
|---|---|---|---|
| `warm` | 1–3 | C — Am7 — Fmaj7 | 720 Hz |
| `thoughtful` | 4–6 | Dm9 — B♭maj7 — Gm(add9) | 600 Hz |
| `serious` | 7–8 | Em — Cmaj7/E — Bsus | 480 Hz, saw voices |

`sfx.moodFor(worldNumber)` maps a world to its mood. `App.tsx` drives it:
map → mood of the player's current world; hub → mood of that world;
every other screen → `sfx.music(null)`.

## Cues

| Cue | What it is | Fires on |
|---|---|---|
| `tap` | dry click + 50 ms sine (pitch jitters 560–640 Hz) | every ordinary button |
| `step` | 118–142 Hz thud gliding down + shoe hiss | Toki walking (hub corridor, map road) |
| `discover` | woody tick + E6 ping | an evidence hotspot inspected |
| `evidenceAll` | G5–B5–D6 quick ascent | the last hotspot inspected |
| `correct` | C5 → E5 triangle with a quiet G4 under | right answer |
| `lookAgain` | E4 → A4, soft — a question | wrong answer |
| `risk` | one note: E5 / C5 / G4 / C4 by severity, + sub-octave for lethal | any risk-level pick (before the verdict) |
| `reveal` | C5–E5–G5 arpeggio + a little air | reveal screen |
| `lethal` | A2+E3 fifth sinking a semitone over a 55 Hz floor | a lethal mutation named / drifted call |
| `badge` | C5–E5–G5–C6 + C4 bed + air, ~1.2 s | a new badge earned |
| `world` | G4…C6 line resolving on a C-major chord, ~2 s | a world boss reveal |
| `quest` | G4–A4–C5–D5–E5–G5 rising into a C-major 7 chord with a long tail, ~4 s | the Final World reveal, once |
| `door` | 180 → 90 Hz thunk + rising creak | Toki ducks behind a classroom door |
| `wipe` | 400 → 2600 Hz band-passed air, 0.4 s | the hub → classroom wipe |
| `travel` | 300 → 1800 Hz whoosh + G4 → D5 glide | setting off along the map road |
| `gallery` | E5 + B5, open and soft | the badge gallery opens with ≥1 badge |

Severity in `risk` is passed as `sfx.play('risk', { level: 0..3 })`.

## Where the hooks live

- `App.tsx` — the bed (one `useEffect` on `screen` / `activeWorld`).
- `SceneHeader.tsx` — `discover`.
- `LevelScreen.tsx` — `evidenceAll`, `risk` (160 ms before the verdict),
  `correct`, `lookAgain`, `reveal`/`lethal`, `badge`.
- `AcademyScreen.tsx` — `risk`, plus the existing verdict cues.
- `WorldBossScreen.tsx` — `world`, `badge`, `lethal`/`correct` per scene.
- `SchoolVisitScreen.tsx` — `quest` (instead of `world`), `badge`.
- `HubScreen.tsx` — `step`, `door`, `wipe`.
- `WorldMapScreen.tsx` — `travel`, `step`.
- `BadgesScreen.tsx` — `gallery`.

## Adding a cue

1. Add its name to the `Cue` union in `sfx.ts`.
2. Add an entry to `CUES`: build it from `tone()` (oscillator with
   attack/hold/release, optional glide and detune) and `hiss()` (looped
   noise through a filter with an envelope). Keep it under 0.3 s unless it
   is a milestone; if it is, shorten it under `reducedMotion()`.
3. If it should sit above the bed, call `duck(seconds, depth)`.
4. Fire it with `sfx.play('name')` where the moment happens. Never from a
   render; always from an event or an effect.
5. Add the row to the table above.

Platform notes: `webkitAudioContext` is used when `AudioContext` is
missing (iOS 12). No `StereoPanner`, no `AudioWorklet`, no
`createPeriodicWave`. The context is created on the first pointer/key
event and resumed on every play if the OS suspended it. Audio never
throws into the game: every `play` is wrapped.

## Verifying

`e2e-sound/e2e_sound.py` and `e2e-sound/e2e_moods.py` (Playwright) load
the built game with `?sfxdebug=1`, which exposes `window.__tokiSfx =
{ cues: {name: count}, music: mood }`, and assert the cue counts and the
bed state along a full playthrough in EN and AR.
