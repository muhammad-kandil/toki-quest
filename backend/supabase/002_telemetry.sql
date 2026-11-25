-- 002 · Telemetry: per-step attempts and conversation outcome per level.
-- Idempotent — safe to run more than once. Run after schema.sql.
--
-- Why: the difficulty oracle. first_try_rate per classroom tells the
-- pedagogy team which rooms are guessable (>70%) and which are unfair
-- (<40%). restored_rate tells them whether coaches can *deliver* the
-- move, not just name it.

alter table public.toki_progress
  add column if not exists attempts jsonb,          -- {"drift":1,"risk":2,...}
  add column if not exists outcome  text            -- restored | partial | unchanged
    check (outcome is null or outcome in ('restored', 'partial', 'unchanged'));

-- The "first step" of each screen kind: classroom drift, academy
-- diagnosis, world-boss scenes, school-visit contexts, World 1 finale locate.
create or replace function public.toki_first_step_attempts(a jsonb) returns int
language sql immutable as $$
  select coalesce(
    (a->>'drift')::int, (a->>'diagnosis')::int, (a->>'scenes')::int,
    (a->>'contexts')::int, (a->>'locate')::int)
$$;

create or replace view public.v_toki_levels as
select
  level_id,
  count(*)                                   as players_completed,
  round(avg(best_score))                     as avg_best_score,
  round(100.0 * avg(case when public.toki_first_step_attempts(attempts) = 1 then 1 else 0 end)
          filter (where public.toki_first_step_attempts(attempts) is not null))  as first_try_rate,
  round(100.0 * avg(case when outcome = 'restored' then 1 else 0 end)
          filter (where outcome is not null))                                     as restored_rate,
  round(100.0 * avg(case when outcome = 'unchanged' then 1 else 0 end)
          filter (where outcome is not null))                                     as unchanged_rate,
  min(first_completed_at)                    as first_completion_at
from public.toki_progress
group by level_id
order by level_id;

revoke all on public.v_toki_levels from anon, authenticated;
revoke all on function public.toki_first_step_attempts(jsonb) from anon, authenticated;
