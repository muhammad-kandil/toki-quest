-- 004 · Usage analytics for the pilot readout. Idempotent. Run after 003.
--
-- World membership mirrors src/data/levels/index.ts worldNumberOf():
-- ids 1–6 = World 1; otherwise floor(id / 10). Boss ids: 6, 25, 35, 45,
-- 55, 65, 75, 85.

create or replace function public.toki_world_of(level_id int) returns int
language sql immutable as $$ select case when level_id <= 6 then 1 else level_id / 10 end $$;
revoke all on function public.toki_world_of(int) from anon, authenticated;

-- Per world: who started, who finished, and where the ones who stopped
-- last got to. "started" = completed any level in the world (the first
-- classroom counts as starting); "completed" = the world boss is done.
drop view if exists public.v_toki_funnel;
create view public.v_toki_funnel as
with per_player_world as (
  select telegram_user_id,
         public.toki_world_of(level_id) as world,
         count(*)                        as levels_done,
         max(level_id)                   as last_level,
         bool_or(level_id in (6, 25, 35, 45, 55, 65, 75, 85)) as boss_done
  from public.toki_progress
  group by telegram_user_id, public.toki_world_of(level_id)
)
select
  world,
  count(*)                                        as players_started,
  count(*) filter (where boss_done)               as players_completed,
  round(100.0 * count(*) filter (where boss_done) / count(*)) as completion_rate,
  -- the most common last level among players who did not finish the world
  mode() within group (order by last_level) filter (where not boss_done) as common_dropoff_level,
  round(avg(levels_done), 1)                      as avg_levels_done
from per_player_world
group by world
order by world;
revoke all on public.v_toki_funnel from anon, authenticated;

-- Per player: cadence. "active day" = a day with at least one first
-- completion or improvement.
drop view if exists public.v_toki_sessions;
create view public.v_toki_sessions as
with days as (
  select telegram_user_id, date(updated_at) as d, count(*) as levels
  from public.toki_progress
  group by telegram_user_id, date(updated_at)
)
select
  p.telegram_user_id,
  coalesce(nullif(concat_ws(' ', p.first_name, p.last_name), ''), p.username) as display_name,
  p.lang,
  p.first_seen_at,
  p.last_seen_at,
  count(days.d)                                   as active_days,
  coalesce(sum(days.levels), 0)                   as levels_total,
  round(coalesce(avg(days.levels), 0), 1)         as levels_per_active_day,
  (select count(*) from public.toki_feedback f where f.telegram_user_id = p.telegram_user_id) as feedback_count
from public.toki_players p
left join days on days.telegram_user_id = p.telegram_user_id
group by p.telegram_user_id, display_name, p.lang, p.first_seen_at, p.last_seen_at
order by p.last_seen_at desc;
revoke all on public.v_toki_sessions from anon, authenticated;

-- One row per level: everything the go/no-go reads.
drop view if exists public.v_toki_pilot_readout;
create view public.v_toki_pilot_readout as
select
  l.level_id,
  public.toki_world_of(l.level_id) as world,
  l.players_completed,
  l.first_try_rate,
  l.restored_rate,
  l.fair_rate,
  l.disagree_count,
  l.avg_best_score,
  case
    when l.first_try_rate is null then 'no data'
    when l.first_try_rate > 70 then 'guessable'
    when l.first_try_rate < 40 then 'unfair?'
    else 'in band' end as difficulty_flag
from public.v_toki_levels l
order by l.level_id;
revoke all on public.v_toki_pilot_readout from anon, authenticated;
