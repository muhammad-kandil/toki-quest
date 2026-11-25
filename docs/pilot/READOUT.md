# Pilot readout — what to run, what it tells you, go / no-go

Run these in Supabase → SQL Editor (project `toki-quest`) after the three
pilot DLISs have had their two sittings. Prerequisites: `003_feedback.sql`
and `004_analytics_views.sql` applied, function redeployed (see
`backend/README.md`). Thresholds come from `docs/design/DIRECTORS_CUT_2.md`
§ Pilot protocol; nothing here invents a new bar.

The go / no-go, in one line: **go** if all three finish World 1 and at least
two finish World 3; no classroom under 25% first-try; nobody reports a blank
screen or a frozen Observe on iPhone; the Arabic player can name a teacher.
Any one failing is a fix-and-re-pilot, not a launch.

---

## 1 · Per-classroom difficulty and fairness

```sql
select * from v_toki_pilot_readout order by level_id;
```

**What it tells you.** One row per classroom: how many of the three finished
it, `first_try_rate` (share who got the first step right first time),
`restored_rate` (share whose coaching conversation ended with the teacher
restored), `fair_rate` (share of feedback taps that were "Fair"),
`disagree_count`, and `difficulty_flag`.

**Read it against.**
- `first_try_rate` **40–70% is the band.** `guessable` (>70) → candidate for
  a distractor rewrite. `unfair?` (<40) → check the hint first, then the room.
- `restored_rate` expect **50–80% in Worlds 1–3**, lower in World 7. Under
  30% on a room means the `closes` option is too tempting or the teacher's
  stance is unreadable.
- **No-go trigger:** any classroom with `first_try_rate < 25`.
- With three players the rates move in steps of 33 — treat a single row as a
  pointer, and let the disagree notes (query 4) decide.

## 2 · Where people stopped

```sql
select * from v_toki_funnel order by world;
```

**What it tells you.** Per world: `players_started`, `players_completed`
(boss done), `completion_rate`, `common_dropoff_level` (the most common last
level among those who did not finish the world), `avg_levels_done`.

**Read it against.**
- **No-go trigger:** World 1 `players_completed < 3`, or World 3
  `players_completed < 2`.
- World 7 is the difficulty ceiling and the most important read; a low
  completion there is information, not a failure, unless the drop-off level
  also shows up in the disagree notes.
- A `common_dropoff_level` that is a boss (6, 25, 35) points at boss pacing;
  a classroom points at that room.

## 3 · Cadence per player

```sql
select * from v_toki_sessions order by last_seen_at desc;
```

**What it tells you.** Per DLIS: `active_days`, `levels_total`,
`levels_per_active_day`, `feedback_count`, first and last seen, and `lang`.

**Read it against.**
- The protocol asked for two sittings over four days. `active_days` of 1
  with everything done in it means they binged; fine for the data, but ask in
  the interview whether a second sitting would have happened unprompted.
- `feedback_count = 0` for a player who finished World 3 means the card was
  skipped or unseen — ask question 2 of the interview directly.
- `lang = 'ar'` identifies the Arabic-first player for the no-go check.

## 4 · The disagree notes

```sql
select created_at, display_name, lang, level_id, verdict, text, outcome, attempts
from v_toki_feedback
where verdict = 'disagree'
order by level_id, created_at;
```

**What it tells you.** Every "Disagree" with the player's note, their
conversation outcome and per-step attempts for that room. This is the
question that finds content bugs the panel missed, in the player's own words,
with the evidence attached.

**Read it against.**
- One note on a room → read it, decide, move on. Two players disagreeing on
  the same room → that room goes on the week-1 fix list regardless of its
  `first_try_rate`.
- `attempts` showing `1` everywhere with a disagree means they got it right
  and still think the answer is wrong — the strongest kind of content bug.
- Drop the `where` to see "Not sure" taps too; a cluster of `unsure` on one
  room is a hint problem.

## 5 · Who finished what

```sql
select * from v_toki_admin order by last_completion_at desc;
```

**What it tells you.** One row per DLIS: levels and worlds done, badges, last
seen. `last_completion_at` gaps show where someone stopped.

**Read it against.**
- The World 1 / World 3 completion checks, by name, so you know which DLIS to
  ask about a stop.
- Cross with the interview: a player who reports a blank screen or frozen
  Observe on iPhone is a **no-go** whatever this table says.

## 6 · The full per-level table

```sql
select * from v_toki_levels order by level_id;
```

**What it tells you.** The underlying numbers behind query 1, plus
`unchanged_rate`, `avg_best_score` and `first_completion_at`. Use it when a
`difficulty_flag` needs the raw rates behind it, or to export the whole thing
for the week-1 fix list.

**Read it against.** The same bands as query 1. `unchanged_rate` above 50 on
a room means the teacher never moves — either the stance text is unreadable
or every coaching option reads as a threat.

---

## The interview is the other half

The numbers say *where*; the 15-minute call says *why*. The seven questions
are in `docs/pilot/PILOT_PACK.md`. Before the call, have query 4 open for
that player (`where display_name = '…'`) so you can ask about the exact rooms
they flagged.

---

## Power BI

For a shared readout the team can refresh without the SQL Editor.

1. **Connector:** Get Data → **PostgreSQL database**. Server:
   `db.pebnwvwagmokhsfymhzh.supabase.co`, port 5432, database `postgres`.
   Sign in with the database password from Supabase → Project Settings →
   Database (never the anon key; the views have no anon grants on purpose).
   If the desktop can't reach port 5432 directly, use the Session pooler
   host and port shown on the same settings page.
2. **Import** these three views (Import mode, not DirectQuery — the pilot is
   small and the Free plan is happier with a daily refresh):
   - `public.v_toki_pilot_readout`
   - `public.v_toki_funnel`
   - `public.v_toki_sessions`
3. **Model.** No relationships are needed for the pilot pages. If you want to
   drill from a world to its levels, relate `v_toki_funnel[world]` →
   `v_toki_pilot_readout[world]` (one-to-many).
4. **DAX: measures, not calculated tables.** The views already aggregate; a
   calculated table would duplicate the view and go stale on refresh. Add
   these as measures on `v_toki_pilot_readout`:

   ```dax
   Rooms in band =
   CALCULATE ( COUNTROWS ( v_toki_pilot_readout ), v_toki_pilot_readout[difficulty_flag] = "in band" )

   Rooms guessable =
   CALCULATE ( COUNTROWS ( v_toki_pilot_readout ), v_toki_pilot_readout[difficulty_flag] = "guessable" )

   Rooms unfair =
   CALCULATE ( COUNTROWS ( v_toki_pilot_readout ), v_toki_pilot_readout[difficulty_flag] = "unfair?" )

   Rooms under 25 first-try =
   CALCULATE ( COUNTROWS ( v_toki_pilot_readout ), v_toki_pilot_readout[first_try_rate] < 25 )

   Disagree total = SUM ( v_toki_pilot_readout[disagree_count] )

   Avg fair rate = AVERAGE ( v_toki_pilot_readout[fair_rate] )
   ```

   And on `v_toki_funnel`:

   ```dax
   World 1 finished = CALCULATE ( MAX ( v_toki_funnel[players_completed] ), v_toki_funnel[world] = 1 )
   World 3 finished = CALCULATE ( MAX ( v_toki_funnel[players_completed] ), v_toki_funnel[world] = 3 )
   Go on completion = IF ( [World 1 finished] >= 3 && [World 3 finished] >= 2, "go", "no-go" )
   ```

5. **Pages.** One page: a card row (`Go on completion`, `Rooms under 25
   first-try`, `Disagree total`), a bar of `first_try_rate` by `level_id`
   with constant lines at 40 and 70, and the funnel as a simple table. That
   is the whole readout; the notes (query 4) stay in SQL because they are
   text to read, not numbers to chart.
