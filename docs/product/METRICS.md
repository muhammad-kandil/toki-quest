# Metrics — teacher pilot

**Owner:** Product · **Date:** 26 Nov 2026 · **Status:** proposal, not implemented (backlog E9).

## Rules

1. **Measured, never shown.** No metric here is visible to players, schools or line managers. No score, rank or comparison is stored for teachers at all.
2. **Measure the principle.** Curiosity → replays with a different path, branch diversity. Ownership → Monday saves, my-move copies. Achievement → adventures completed. Meaningful progression → 7-day return without nudges.
3. **Don't optimise time-in-app.** Longer sessions are not a goal; a 6-minute lesson that ends with a Monday save is the win.
4. **Small-n honesty.** With 10–15 pilot teachers, every rate moves in 7–10 point steps. Read rows as pointers; the debrief decides.

## Pilot measures

| # | Measure | Definition | Pilot target | Reading |
|---|---|---|---|---|
| M1 | **7-day return** | Share of teachers with an active day in (first day, first day + 7]. Active day = any `open` event or finished run. | ≥ 40% | The headline. No reminders exist, so return = wanted to. |
| M2 | **Adventures completed** | Per teacher: distinct adventures with ≥ 1 finished run. Per adventure: finishers / starters. | Median ≥ 2 of 4; Adv. 1 completion ≥ 80% of starters | Low completion on one adventure = content problem there. |
| M3 | **Branch diversity** | Per adventure: (a) share of designed outcomes reached by ≥ 1 run; (b) share of first runs on the most common path signature. | (a) ≥ 60% · (b) ≤ 50% | (b) high = one obvious "right" path: the sim has become a quiz. |
| M4 | **Resources opened / Monday saved** | Share of finishers who open ≥ 1 toolkit card in the staff room; share who save ≥ 1 "Try it Monday". Per resource: discovered → opened → saved funnel. | ≥ 60% save ≥ 1 | Practical value. A resource discovered often but never saved = weak card. |
| M5 | **Community taps** | Of community-step views: copy my move, open community link, skip. Plus campus community-board opens. | Informational (no target until the link is live) | Never optimised; skip must stay free. |
| M6 | **Replays** | Share of finishers with ≥ 2 runs on an adventure; share of replays whose path signature differs from all earlier runs by that teacher. | ≥ 25% replay; ≥ 80% of replays differ | Curiosity: "what if I'd done it differently?" |
| M7 | Leave rate | Adventure starts with a `leave` and no finish that day. | ≤ 20% | Where they bail: last event before leaving. |
| M8 | Intro skip rate (replays excluded) | Share of first runs where the intro was skipped. | Informational | High on first play = intros too long. |
| M9 | Language | Share of runs in AR; share of teachers who switch language mid-adventure. | Switch ≤ 10% of AR players | Switching = Arabic not carrying the meaning. |

**Go/no-go for widening beyond the pilot:** M1 ≥ 40%, M2 Adv. 1 ≥ 80%, M3(b) ≤ 50% on ≥ 3 of 4 adventures, M4 ≥ 60%, zero blank-screen reports on iOS, Arabic-first playtesters finish in Arabic. Any miss = fix and re-pilot.

---

## Data model (proposed migration `006_teacher_telemetry.sql`)

Same pattern as `schema.sql` / `002`–`005`: idempotent, RLS on, no grants to `anon`/`authenticated`, written only by the Edge Function with the service role after the Telegram `initData` HMAC check. Reuses `toki_players` (one row per Telegram user, both modes).

### `toki_players` — add

| Column | Type | Note |
|---|---|---|
| `teacher_first_seen_at` | `timestamptz` | First teacher-mode request. Null = never played teacher mode. |
| `last_mode` | `text check (last_mode in ('teacher','coach'))` | Last mode the client reported. |

`toki_players.badges` stays Coach-only; teacher badges live on runs.

### `toki_teacher_runs` — one row per finished adventure run

| Column | Type | Note |
|---|---|---|
| `id` | `bigserial` PK | |
| `client_run_id` | `uuid unique not null` | Idempotency: retries never double-count. |
| `telegram_user_id` | `bigint` FK → `toki_players` on delete cascade | |
| `adventure_id` | `text` | `^[a-z0-9-]{2,40}$` |
| `run_no` | `int` | 1 = first run of this adventure by this teacher (client `runs` count, CR-2). |
| `lang` | `char(2)` | `en` / `ar` at finish |
| `lang_switched` | `boolean` | Toggled language during the run. |
| `started_at`, `finished_at` | `timestamptz` | Client times, sanity-clamped server-side. |
| `intro_skipped` | `boolean` | |
| `outcomes` | `text[]` | Outcome ids in the order reached — the path. |
| `path_sig` | `text` | `md5(array_to_string(outcomes, '>'))`, computed server-side. |
| `resources` | `text[]` | Resource ids discovered in this run. |
| `missed_events` | `text[]` | Events still open at the bell. |
| `students` | `jsonb` | `{"sara":[3,2],…}` final understanding/engagement. For content tuning only. |
| `badge` | `text` | Badge id awarded. |
| `community` | `text check (community in ('copied','opened','skipped'))` | Action at step 5. |
| `created_at` | `timestamptz default now()` | |

Index `(adventure_id)`, `(telegram_user_id, adventure_id)`.

**No `score` column.** This is deliberate; do not add one.

### `toki_teacher_events` — light event log

| Column | Type | Note |
|---|---|---|
| `id` | `bigserial` PK | |
| `client_event_id` | `uuid unique not null` | Idempotency. |
| `telegram_user_id` | `bigint` FK | |
| `kind` | `text check (kind in (...))` | `open`, `place_open`, `adventure_start`, `adventure_leave`, `replay_start`, `resource_open`, `monday_save`, `monday_unsave`, `monday_copy`, `notebook_open`, `community_view`, `community_copy`, `community_link`, `mode_switch`, `lang_switch` |
| `ref` | `text` | Place / adventure / resource id, `^[a-z0-9-]{1,40}$` or null. |
| `lang` | `char(2)` | |
| `client_ts` | `timestamptz` | |
| `created_at` | `timestamptz default now()` | |

Index `(kind, ref)`, `(telegram_user_id, created_at)`.

### `toki_teacher_content` — designed totals (seeded from data at release)

| Column | Type | Note |
|---|---|---|
| `adventure_id` | `text` PK | |
| `outcome_ids` | `text[]` | Every outcome designed in the adventure — denominator for M3(a). |
| `resource_ids` | `text[]` | |
| `release` | `text` | Git sha of the content. |

Seeded by a small script that reads `src/teacher/data` (engine, S). Without it M3(a) has no denominator.

## Views (proposed)

All `revoke all … from anon, authenticated`. Teacher views carry **no names** (`telegram_user_id` only, and only where needed); names stay in the existing admin view.

| View | One row per | Columns | Feeds |
|---|---|---|---|
| `v_teacher_return` | teacher | `first_day`, `active_days`, `returned_7d`, `last_active` | M1 |
| `v_teacher_adventures` | adventure | `starters`, `finishers`, `completion_rate`, `median_minutes`, `leave_rate`, `intro_skip_rate_first_run`, `ar_share` | M2, M7, M8, M9 |
| `v_teacher_branches` | adventure | `designed_outcomes`, `reached_outcomes`, `reach_rate`, `distinct_paths`, `top_path_share_first_runs`, `never_reached` (array) | M3 |
| `v_teacher_outcome_reach` | adventure × outcome | `runs_reaching`, `share` | dead-branch detector for content |
| `v_teacher_resources` | resource | `discovered_runs`, `teachers_opened`, `teachers_saved`, `save_rate` | M4 |
| `v_teacher_community` | adventure | `views`, `copied`, `opened`, `skipped` | M5 |
| `v_teacher_replays` | adventure | `finishers`, `replayers`, `replay_rate`, `different_path_rate` | M6 |
| `v_teacher_pilot_readout` | one row | M1–M6 headline values beside their targets, `go` boolean | go/no-go |

Sketch, M1:

```sql
create view public.v_teacher_return as
with days as (
  select telegram_user_id, date(created_at) d from public.toki_teacher_events where kind = 'open'
  union
  select telegram_user_id, date(finished_at) from public.toki_teacher_runs
), firsts as (select telegram_user_id, min(d) first_day from days group by 1)
select f.telegram_user_id, f.first_day,
       count(distinct d.d) active_days,
       bool_or(d.d > f.first_day and d.d <= f.first_day + 7) returned_7d,
       max(d.d) last_active
from firsts f join days d using (telegram_user_id)
group by f.telegram_user_id, f.first_day;
```

Sketch, M3(b) (path monoculture on first runs):

```sql
select adventure_id,
       round(100.0 * max(n) / sum(n)) as top_path_share_first_runs
from (select adventure_id, path_sig, count(*) n
      from public.toki_teacher_runs where run_no = 1 group by 1, 2) t
group by adventure_id;
```

Do **not** extend `v_toki_board` / `v_toki_admin` scoring to teacher data; the board view must never join `toki_teacher_runs`.

## Edge Function `record-progress` — proposed extension

Keep one function (one HMAC path, one deploy). New optional body key, sent alone or alongside Coach payloads:

```jsonc
{
  "initData": "…",
  "mode": "teacher",
  "lang": "ar",
  "teacher": {
    "runs":   [{ "clientRunId": "uuid", "adventureId": "different-needs", "runNo": 1,
                 "startedAt": "…", "finishedAt": "…", "introSkipped": false, "langSwitched": false,
                 "outcomes": ["misconception","fixed","ahmedDeep","omarRole","paperOk"],
                 "resources": ["explain","targeted","stretch","roles","offline"],
                 "missedEvents": [], "students": {"sara":[3,3]}, "badge": "misconception-hunter",
                 "community": "copied" }],
    "events": [{ "clientEventId": "uuid", "kind": "monday_save", "ref": "targeted", "ts": "…" }]
  }
}
```

Validation (reject the item, not the request): ids match `^[a-z0-9-]{1,40}$`; ≤ 20 runs and ≤ 200 events per request; arrays ≤ 40 items; `kind` and `community` whitelisted; `students` values integers 0–3, ≤ 8 keys; timestamps within ±48 h of server time, else replaced by `now()`; `insert … on conflict (client_*_id) do nothing`. Upsert `toki_players` first (existing code) and set `teacher_first_seen_at = coalesce(…, now())`, `last_mode`.

Client side (engine): an outbox in localStorage (`toki:teacher:outbox`, cap 500, drop oldest), flushed on run finish, on return to campus and on `visibilitychange → hidden`; fire-and-forget with timeout; telemetry failure never affects play. No telemetry before the first-open notice (E9-3) has been shown.

## Privacy

- Data minimised to the above; no free text from teachers is stored in MVP (the share post is copied client-side, never sent).
- No school, class or student-real data is collected. Student names in the game are fictional.
- Retention, owner and notice wording: Alef to confirm (PRD D5). Proposed: 12 months, owner TQ, delete on request by Telegram id (FK cascade already supports it).
