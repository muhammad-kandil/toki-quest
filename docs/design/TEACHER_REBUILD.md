# Rebuild: Ms. Mariam's School (teacher game)

Decision (Kandil, 2026-11-26): the game is rebuilt for **teachers**. The
DLIS coach game stays playable as **Coach mode** (same app, separate
entry), so the pilot keeps working.

## Why teachers come back

Curiosity, ownership, achievement, meaningful progression. Teachers return
because they enjoy it, want to see what happens next, and get something
they can use in Monday's lesson. **Not** to accumulate points.

- No currencies, no points balance, no speed ranking, no streak pressure.
- Progress = the story moves on + students learn + the teacher's toolkit grows.

## Core loop (one adventure)

1. **Watch** a classroom scenario (short captioned intro over the scene).
2. **Decide**: tap-based classroom simulation. Students and objects pulse
   when they need you; you choose the order. Every choice costs lesson
   minutes and changes students' understanding/engagement.
3. **Discover** an Alef resource: a choice that uses one reveals its card
   (stage, what it does, "Try it Monday").
4. **Challenge**: outcomes open follow-up events — new classroom events and
   unexpected challenges. Outcomes decide which challenges become available.
5. **Community** (optional): topic page for the Alef Telegram community,
   with "share my move".
6. **Reward**: a badge that names what you did well, a notebook page (your
   path and where each student landed), new toolkit entries.
7. **Unlock** the next adventure: the story moves on; teaser depends on
   what happened.

Nonlinear: Classroom begins → (Student needs help | Early finisher | Low
participation) → (Support | Practice | Teams | Game) → (New classroom
event | Unexpected challenge). Sara's branch: Support → ready to progress →
enrichment challenge; See why → misconception discovered → targeted
practice; Move on → difficulty persists → intervention challenge.

## Campus (the hub)

Isometric school campus (reference: school-sim map with pinned places).

| Place | Kind | What it opens |
|---|---|---|
| Grade 5 classroom, other classrooms | classroom | adventures |
| Staff room | staffroom | toolkit: every Alef resource found, by stage, with "Try it Monday"; resting restores energy |
| Library | library | the notebook: each finished lesson's path and students |
| Community board | community | Alef Telegram community (link from Alef; placeholder until then) |
| Principal's office | office | story beats and the next adventure's briefing |
| Yard | yard | ambience; small optional moments |

**HUD** (no currencies): teacher card (Ms. Mariam portrait, name, energy
0–3); classes card (how each class is doing); toolkit count; school clock
"Day 3 · Morning". Settings: language EN/AR, sound, Coach mode.

**Day rhythm**: a day has morning / midday / afternoon. A lesson takes a
period. Energy limits how many lessons fit before a rest in the staff room
— it gates pacing, it is never spent on anything.

## Code layout

- `src/teacher/types.ts` — the data contract (owned by the director).
- `src/teacher/data/` — resources catalog, campus, adventures (content agent).
- `src/teacher/screens/`, `src/teacher/TeacherApp.tsx` — engine and UI (engine agent).
- `src/main.tsx` chooses: `?mode=coach` or the saved choice → old `App`; default → `TeacherApp`.
- Art: `public/art/campus.jpg` (isometric campus, 3:4 portrait for phones),
  scene pictures in `public/teacher/scenes/`.

## Content status

Alef resource names and descriptions are **placeholders** until the Alef
team confirms them; each carries `placeholder: true` and the UI says so.
