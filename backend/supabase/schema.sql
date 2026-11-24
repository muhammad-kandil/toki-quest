-- Toki's Coaching Quest — progress store on Supabase (Postgres).
-- Admin-only. Tables are NOT exposed through the Data API (anon key has no
-- grants) and RLS is on; the Edge Function writes with the service role.
create table if not exists public.toki_players (
  telegram_user_id bigint primary key,
  username text,
  first_name text,
  last_name text,
  lang char(2),
  badges jsonb not null default '[]'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
create table if not exists public.toki_progress (
  telegram_user_id bigint not null references public.toki_players(telegram_user_id) on delete cascade,
  level_id int not null,
  best_score int not null,
  first_completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (telegram_user_id, level_id)
);
create index if not exists ix_toki_progress_level on public.toki_progress(level_id);
alter table public.toki_players enable row level security;
alter table public.toki_progress enable row level security;
revoke all on public.toki_players, public.toki_progress from anon, authenticated;

create or replace view public.v_toki_admin as
select p.telegram_user_id,
  coalesce(nullif(concat_ws(' ', p.first_name, p.last_name), ''), p.username) as display_name,
  p.username, p.lang,
  count(g.level_id) as levels_done,
  count(*) filter (where g.level_id in (6,25,35,45,55,65,75,85)) as worlds_done,
  bool_or(g.level_id = 85) as quest_complete,
  case when jsonb_typeof(p.badges) = 'array' then jsonb_array_length(p.badges) else 0 end as badges_count,
  p.badges,
  min(g.first_completed_at) as first_completion_at,
  max(g.updated_at) as last_completion_at,
  p.last_seen_at
from public.toki_players p
left join public.toki_progress g on g.telegram_user_id = p.telegram_user_id
group by p.telegram_user_id, p.first_name, p.last_name, p.username, p.lang, p.badges, p.last_seen_at;

create or replace view public.v_toki_levels as
select level_id, count(*) as players_completed, round(avg(best_score)) as avg_best_score,
       min(first_completed_at) as first_completion_at
from public.toki_progress group by level_id;
revoke all on public.v_toki_admin, public.v_toki_levels from anon, authenticated;
