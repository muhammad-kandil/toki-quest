# Toki's Coaching Quest — Spot the Drift

A Telegram Mini App for Alef Education's Pedagogy Hub. Players guide Toki, a DLIS
(instructional coach), through classrooms that *look* excellent but have drifted
from their learning purpose. Observe → spot the drift → assess the risk → choose
the coaching move → restore the purpose.

**Live:** https://muhammad-kandil.github.io/toki-quest/ · **Bot:** @TokiQuestBot

## Design constraints (do not re-open)

- **Anti-gamification by design.** World 1's final classroom teaches that points,
  speed and leaderboards corrupt learning. So the game never rewards speed, never
  turns points into currency, and never shows a competitive leaderboard. Badges
  mark *concept mastery* (clean first-try runs), not grinding.
- **Calm-confidence register** for adult professionals. No arcade feel. Celebrations
  are short and skippable; sound is subtle and mutable; `prefers-reduced-motion`
  is honoured everywhere.
- **Bilingual, always.** Every player-facing string is a `{en, ar}` pair. Nothing
  can ship half-translated. Arabic is written in a coaching register, not a literal
  translation. Arabic content is Claude-authored and awaits team review.

## Structure

```
src/
  i18n/            Text type, LocaleProvider, UI string table (EN/AR)
  audio/           Synthesized Web Audio sound engine (no audio files) + mute
  data/
    levelTypes.ts  Classroom data model (five-beat loop + evidence hotspots)
    bossTypes.ts   The Perfect Classroom (World 1 finale: six-dimension audit)
    worldBossTypes.ts  World boss "pattern audit" (reusable by every world)
    academyTypes.ts    World 7: 0–many findings per room, over-coaching penalised
    schoolVisitTypes.ts Final World: evidence dossiers, impact calls, prioritisation
    worlds.ts      The 8-world journey and map node positions
    progression.ts Unlock rules derived purely from bestScores
    badges.ts      The 7 concept-mastery badges (SVG icons)
    skins.ts       7 Toki looks, unlocked by progress
    levels/        World 1 (level1–5 + boss) bundled; world2–8 lazy chunks
  screens/         Title · WorldMap · Hub (classrooms) · Level · Boss · WorldBoss ·
                   Academy (W7) · SchoolVisit (Final) · Badges · SkinPicker
  components/      TopBar (lang/sound/badges) · TokiAvatar (living idle) · BadgeIcon
  telegram/        SDK bootstrap + CloudStorage with localStorage fallback & timeouts
```

### Level id scheme
World 1 = ids 1–5 + The Perfect Classroom (6). World *N* = `N*10+1 … N*10+4`
classrooms and `N*10+5` world boss. World 7's classrooms (71–74) are
`AcademyLevelDefinition`s (tick 0–many findings; ticking a healthy practice is
over-coaching). The Final World is a single `SchoolVisitDefinition` (85).

### Progression
No "unlocked" counter. `progression.ts` derives everything from `bestScores`:
classrooms unlock in sequence within a world; a world's boss unlocks when all its
classrooms are done; the next world unlocks when the previous world's boss is done.
Old saves work unchanged.

### Save data
Key `toki:save` in Telegram CloudStorage (localStorage fallback):
`{ hasPlayedBefore, bestScores, badges, selectedSkinId, lang }`.
All cloud calls are wrapped in timeouts because iOS Telegram's CloudStorage can
hang rather than fail.

## Adding a world

1. Author `src/data/levels/worldN.ts` (four `LevelDefinition`s, bilingual, with
   three `evidence` hotspots each) and `worldNboss.ts` (a `WorldBossDefinition`:
   five scenes, some deliberately healthy; then pattern / risk / coaching).
2. Register a loader in `levels/index.ts` `WORLD_LOADERS`.
3. In `worlds.ts`, fill `levelIds` and `bossId` and remove `comingSoon`.
4. Playwright through it in both languages (see the `e2e` pattern in git history).

## Development

```
npm ci
npm run dev        # http://localhost:5173/toki-quest/
npm run build      # dist/ — what CI deploys
```

CI (`.github/workflows/deploy.yml`) builds on push to `main` and deploys `dist/`
to GitHub Pages via the Actions method (the legacy "deploy from a branch" method
is blocked on this org). If a deploy fails with "try again later", re-run the job.

### Hard-won platform notes
- `base: '/toki-quest/'` must match the repo name exactly.
- `crossorigin` is stripped from script tags (GitHub Pages sends no CORS headers;
  Telegram's iOS webview then blocks the script → blank page).
- `@vitejs/plugin-legacy` targets iOS ≥ 12: older WebKit can't parse the modern
  syntax some dependencies ship, and fails silently.
- No `color-mix()` in CSS (Safari < 16.2).
- Telegram caches the Mini App aggressively; bump `?v=` on the BotFather URL to
  force a refresh.

## Status

| Piece | State |
|---|---|
| World 1 — The Busy Classroom (5 + The Perfect Classroom) | ✅ |
| World 2 — Assessment Under the Microscope | ✅ |
| World 3 — Alef in Action | ✅ |
| World 4 — Feedback That Moves Learning | ✅ |
| World 5 — Questioning for Thinking | ✅ |
| World 6 — Differentiation | ✅ |
| World 7 — The Lethal Mutation Academy (4 diagnosis classrooms + The Invisible Mutation) | ✅ |
| Final World — The Master DLIS (The School Visit: 6 contexts, prioritisation, final mission) | ✅ |
| Arabic/English + RTL, world map, badges gallery, interactive Observe + evidence recap | ✅ |
| Coaching conversation — the teacher answers back in all 31 classrooms; reasoning comes before it; the outcome gates the badge (`docs/design/GAME_DESIGN_V3.md`) | ✅ |
| Clue-pointing hints + evidence notebook that opens on a miss | ✅ |
| Soundscape — world bed, 16 cues, mixer (`docs/design/SOUND.md`) · Read-aloud voice, opt-in (`docs/design/VOICE.md`) | ✅ |
| 2.5D art pass · people/object evidence markers · beat strip (`docs/design/ART_DIRECTION.md`) | ✅ |
| Admin progress store — Supabase, Telegram-signed; per-step attempts + conversation outcome; `v_toki_levels.first_try_rate` (`backend/`) | ✅ |
| Difficulty pass, Worlds 2–6 · coach-panel validation · Arabic native-reader pass (`docs/content/`) | ✅ · panel edits being applied |
| Product brief · game design v3 · director's cuts 1 & 2 | `docs/` |
| Pilot (3 DLISs, Worlds 1–3 + 7, iPhone + Android) | **next — see `docs/design/DIRECTORS_CUT_2.md`** |
| Per-world scene art · Rive-animated Toki · return visits · contradicting evidence | after the pilot |
