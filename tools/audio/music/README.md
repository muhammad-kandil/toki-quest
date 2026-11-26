# Toki's score

Original music written for the game, composed in code (`compose.py`) and
rendered in CI. Brief: the bounce of a sunny platformer (oom-pah bass with
chromatic approach notes, off-beat stabs, light swing, staccato melodies over
jazzy-pop changes) at an adult pace and volume, so it sits under speech in a
staff room and doesn't grate on loop.

| file | where it plays | key · tempo | length | lead / colour |
|---|---|---|---|---|
| `title.mp3` | title screen | C major · 108 | 16 bars, 35.6 s loop | muted trumpet, vibraphone, marimba stabs |
| `map.mp3` | world map | G major · 112 | 16 bars, 34.3 s loop | muted trumpet + pizzicato, walking bass, nylon guitar |
| `warm.mp3` | halls of worlds 1–3 | F major · 104 | 16 bars, 36.9 s loop | clarinet + marimba, pizzicato on 2 and 4 |
| `thoughtful.mp3` | halls of worlds 4–6 | B♭ major · 100 | 16 bars, 38.4 s loop | flute + vibraphone, electric piano |
| `serious.mp3` | halls of worlds 7–8 | D Dorian · 100 | 16 bars, 38.4 s loop | bassoon + pizzicato, marimba |
| `level-complete.mp3` | classroom reveal | C · 108 | 2.2 s | marimba run, vibes chord |
| `badge.mp3` | a new badge | C · 120 | 2.0 s | glockenspiel sparkle, vibes |
| `world-complete.mp3` | world challenge / School Visit done | C · 104 | 4.6 s | trumpet + clarinet fanfare |

Classrooms have no music: the room recordings and the evidence have the space.

**Seamless loops.** Each loop is rendered once with its decay tail; the tail is
folded onto the head (what continuous playback would sound like) and 0.5 s of
the loop's own end/start is added before/after. `loops.json` gives the period;
the game loops exactly `[loopStart, loopStart + period)` inside the buffer, so
the MP3 decoder's priming delay can't cause a gap. Tempos are nudged by a
hair so each loop is a whole number of 64-sample blocks.

**Levels.** Loops −20 LUFS, stingers −16 LUFS, peaks ≤ −1 dBFS. In the game the
score bus sits at 0.42 (≈ −27 LUFS), under voice (−18) and room sound.

**Licences.** Composition: original, part of this project. Sounds: FluidR3_GM
soundfont (MIT; Debian `fluid-soundfont-gm`). FluidSynth is a build tool only.
`credits.json` is written with each render.

**Re-render.** Actions → *Render audio* → `music: true` (set `voice` and
`ambience` to `none` for a music-only run). Locally:
`python tools/audio/music/compose.py --sf2 <GM.sf2> --out public/audio/music`
(`--midi-only DIR` writes the MIDI without rendering).
