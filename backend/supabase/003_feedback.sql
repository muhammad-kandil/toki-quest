-- 003 · In-game feedback: "Was this classroom fair?" — one row per tap+send.
-- Idempotent. Run after 002_telemetry.sql.
--
-- Why: the only direct line from a real DLIS to the pedagogy team. A
-- "disagree" with a note is a content bug report with the player's
-- attempts and conversation outcome attached, so the team can see
-- whether the room is unfair or the player was unlucky.

create table if not exists public.toki_feedback (
  id               bigserial primary key,
  telegram_user_id bigint not null references public.toki_players(telegram_user_id) on delete cascade,
  level_id         int    not null,
  verdict          text   not null check (verdict in ('fair', 'unsure', 'disagree')),
  text             text   check (text is null or char_length(text) <= 240),
  lang             char(2),
  outcome          text   check (outcome is null or outcome in ('restored', 'partial', 'unchanged')),
  attempts         jsonb,
  created_at       timestamptz not null default now()
);
create index if not exists ix_toki_feedback_level on public.toki_feedback(level_id);
alter table public.toki_feedback enable row level security;
revoke all on public.toki_feedback from anon, authenticated;
revoke all on sequence public.toki_feedback_id_seq from anon, authenticated;

-- Who said what, readable: one row per feedback event.
create or replace view public.v_toki_feedback as
select
  f.id,
  f.created_at,
  f.level_id,
  f.verdict,
  f.text,
  f.lang,
  f.outcome,
  f.attempts,
  f.telegram_user_id,
  coalesce(nullif(concat_ws(' ', p.first_name, p.last_name), ''), p.username) as display_name
from public.toki_feedback f
join public.toki_players p on p.telegram_user_id = f.telegram_user_id
order by f.created_at desc;
revoke all on public.v_toki_feedback from anon, authenticated;

-- v_toki_levels gains fair_rate and disagree_count. Column order changes,
-- so the view is dropped and recreated (CREATE OR REPLACE can't reorder).
drop view if exists public.v_toki_levels;
create view public.v_toki_levels as
with fb as (
  select level_id,
         count(*) filter (where verdict = 'fair')     as fair_n,
         count(*) filter (where verdict = 'disagree') as disagree_n,
         count(*)                                     as fb_n
  from public.toki_feedback group by level_id
)
select
  g.level_id,
  count(*)                                   as players_completed,
  round(avg(g.best_score))                   as avg_best_score,
  round(100.0 * avg(case when public.toki_first_step_attempts(g.attempts) = 1 then 1 else 0 end)
          filter (where public.toki_first_step_attempts(g.attempts) is not null))  as first_try_rate,
  round(100.0 * avg(case when g.outcome = 'restored' then 1 else 0 end)
          filter (where g.outcome is not null))                                     as restored_rate,
  round(100.0 * avg(case when g.outcome = 'unchanged' then 1 else 0 end)
          filter (where g.outcome is not null))                                     as unchanged_rate,
  max(case when fb.fb_n > 0 then round(100.0 * fb.fair_n / fb.fb_n) end)           as fair_rate,
  coalesce(max(fb.disagree_n), 0)                                                   as disagree_count,
  min(g.first_completed_at)                  as first_completion_at
from public.toki_progress g
left join fb on fb.level_id = g.level_id
group by g.level_id
order by g.level_id;
revoke all on public.v_toki_levels from anon, authenticated;
