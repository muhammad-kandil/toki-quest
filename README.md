# Toki's Coaching Quest

**Spot the Drift. Prevent the Lethal Mutation.**
A Telegram Mini App for the Alef Pedagogy Hub.

Full design reference: see `toki_gdd.md` (shared alongside this project).

## Status: Phase 1 — First Playable Level ✅

Level 1 ("The Talkative Classroom") is fully playable end-to-end:
Observe → Identify the Drift → Assess the Risk → Choose the Coaching
Move → optional Reasoning bonus → Reveal → scored, saved.

- Wrong answers show a hint and let the player retry — no penalty,
  no game-over (GDD §3: failure is a learning beat)
- Scoring rewards correctness of judgment only — **no timer, no
  speed bonus** anywhere in the loop (the resolved gamification
  tension from GDD §2, made visible to the player at the reveal)
- Badges (starting with "Drift Detective") trigger on full-correct
  runs and persist via the same CloudStorage/localStorage layer
  from Phase 0
- Level content lives entirely in `src/data/levels/level1.ts` as
  data — Levels 2–5 and the Boss slot in the same way in Phase 2/3
  without touching the game-loop code

## Running it

```bash
npm install
npm run dev
```

## Project structure (additions since Phase 0)

```
src/
  data/
    levelTypes.ts     Shared level data-model types (GDD §9)
    levels/
      level1.ts        Level 1 content
      index.ts         Level registry/lookup
  screens/
    LevelScreen.tsx    The 5-beat game loop state machine
    LevelScreen.css
    HomeScreen.tsx     Updated: shows last result, replay/play CTA
```

## Verified

Full playthrough tested end-to-end (title → home → observe → all
four questions, including a deliberate wrong-answer path → reveal →
home), confirming: no console errors, correct scoring math (125/125
on an all-correct run), badge trigger, and save persistence.

## Next: Phase 2

Levels 2–5 built from data, using the same `LevelDefinition` shape.
Progression/unlock logic and a real level-select screen (currently
Phase 1 always plays Level 1 directly).
