-- 005 · Player-chosen name and the ranking board. Idempotent. Run after 004.
--
-- display_name   what the player typed at the start (editable any time);
--                falls back to their Telegram first name.
-- show_on_board  the player's choice to appear by name on the ranking.
--                Hidden players still see their own rank; others see nothing.

alter table public.toki_players add column if not exists display_name text
  check (display_name is null or char_length(display_name) between 1 and 40);
alter table public.toki_players add column if not exists show_on_board boolean not null default true;

-- Ranking: sum of each player's best score per room. Ties share a rank;
-- more rooms finished breaks nothing (scores already reward finishing).
drop view if exists public.v_toki_board;
create view public.v_toki_board as
select
  p.telegram_user_id,
  coalesce(nullif(p.display_name, ''), nullif(p.first_name, ''), p.username, 'Coach') as name,
  p.show_on_board,
  coalesce(sum(g.best_score), 0)::int as total,
  count(g.level_id)::int               as rooms,
  rank() over (order by coalesce(sum(g.best_score), 0) desc) as rank_all
from public.toki_players p
left join public.toki_progress g on g.telegram_user_id = p.telegram_user_id
group by p.telegram_user_id, p.display_name, p.first_name, p.username, p.show_on_board;
revoke all on public.v_toki_board from anon, authenticated;

select name, total, rooms, rank_all from public.v_toki_board order by rank_all limit 5;
