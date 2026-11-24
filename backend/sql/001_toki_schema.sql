-- Toki's Coaching Quest — progress store in the CX db (`data_schema`).
-- Admin-only view of DLIS progress. NOT a leaderboard: no ranks, no
-- totals-as-currency, nothing the game ever shows to players.
-- Run once in DataGrip against the CX db.

CREATE TABLE IF NOT EXISTS data_schema.toki_players (
  telegram_user_id  BIGINT       NOT NULL,
  username          VARCHAR(64)  NULL,
  first_name        VARCHAR(128) NULL,
  last_name         VARCHAR(128) NULL,
  lang              CHAR(2)      NULL,
  badges            JSON         NULL,          -- ["drift-detective", ...]
  first_seen_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (telegram_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS data_schema.toki_progress (
  telegram_user_id    BIGINT   NOT NULL,
  level_id            INT      NOT NULL,          -- 1–6 World 1; N*10+1..N*10+5 Worlds 2–7; 85 Final
  best_score          INT      NOT NULL,
  first_completed_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (telegram_user_id, level_id),
  KEY ix_level (level_id),
  CONSTRAINT fk_toki_progress_player FOREIGN KEY (telegram_user_id)
    REFERENCES data_schema.toki_players (telegram_user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- World number from a level id (mirrors src/data/levels/index.ts worldNumberOf).
-- World N is complete when its boss (N*10+5, or 6 for World 1, 85 for Final) is done.
CREATE OR REPLACE VIEW data_schema.v_toki_admin AS
SELECT
  p.telegram_user_id,
  COALESCE(NULLIF(CONCAT_WS(' ', p.first_name, p.last_name), ''), p.username) AS display_name,
  p.username,
  p.lang,
  COUNT(g.level_id)                                                     AS levels_done,
  SUM(g.level_id IN (6, 25, 35, 45, 55, 65, 75, 85))                     AS worlds_done,
  MAX(g.level_id = 85)                                                  AS quest_complete,
  JSON_LENGTH(COALESCE(p.badges, JSON_ARRAY()))                         AS badges_count,
  p.badges,
  MIN(g.first_completed_at)                                             AS first_completion_at,
  MAX(g.updated_at)                                                     AS last_completion_at,
  p.last_seen_at
FROM data_schema.toki_players p
LEFT JOIN data_schema.toki_progress g ON g.telegram_user_id = p.telegram_user_id
GROUP BY p.telegram_user_id, display_name, p.username, p.lang, p.badges, p.last_seen_at;

-- Per-level completion counts: which classrooms the cohort finds hard / abandons.
CREATE OR REPLACE VIEW data_schema.v_toki_levels AS
SELECT level_id, COUNT(*) AS players_completed, ROUND(AVG(best_score)) AS avg_best_score,
       MIN(first_completed_at) AS first_completion_at
FROM data_schema.toki_progress
GROUP BY level_id;

-- A least-privilege user for the API. Replace the password before running.
-- CREATE USER 'toki_api'@'%' IDENTIFIED BY '<strong password>';
-- GRANT SELECT, INSERT, UPDATE ON data_schema.toki_players  TO 'toki_api'@'%';
-- GRANT SELECT, INSERT, UPDATE ON data_schema.toki_progress TO 'toki_api'@'%';
