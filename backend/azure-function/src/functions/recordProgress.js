'use strict';
const { app } = require('@azure/functions');
const mysql = require('mysql2/promise');
const { validateInitData } = require('../telegram');

/**
 * POST /api/record-progress
 * Body: { initData: string, bestScores: {[levelId]: score}, badges: string[], lang?: 'en'|'ar' }
 *
 * The game calls this after every completion, fire-and-forget. The row can only
 * come from a real Telegram user inside the Mini App: initData is signed by
 * Telegram with the bot token, and we verify it here before touching the DB.
 * Scores only ever go up (GREATEST), so a replayed old payload changes nothing.
 */
let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'data_schema',
      ssl: { rejectUnauthorized: true },   // Azure Database for MySQL requires TLS
      waitForConnections: true,
      connectionLimit: 4,
    });
  }
  return pool;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://muhammad-kandil.github.io';
const cors = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Max-Age': '86400',
};

const VALID_LEVEL = (id) => Number.isInteger(id) && ((id >= 1 && id <= 6) || (id >= 21 && id <= 85 && [1, 2, 3, 4, 5].includes(id % 10)));

async function handler(request, context) {
  if (request.method === 'OPTIONS') return { status: 204, headers: cors };

  let body;
  try { body = await request.json(); } catch { return { status: 400, headers: cors, jsonBody: { error: 'bad json' } }; }

  const user = validateInitData(body?.initData, process.env.TELEGRAM_BOT_TOKEN);
  if (!user) return { status: 401, headers: cors, jsonBody: { error: 'invalid initData' } };

  const scores = Object.entries(body.bestScores || {})
    .map(([k, v]) => [Number(k), Number(v)])
    .filter(([id, s]) => VALID_LEVEL(id) && Number.isFinite(s) && s >= 0 && s <= 500);
  const badges = Array.isArray(body.badges) ? body.badges.filter((b) => typeof b === 'string' && b.length < 40).slice(0, 16) : [];
  const lang = body.lang === 'ar' ? 'ar' : body.lang === 'en' ? 'en' : null;

  const db = getPool();
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute(
      `INSERT INTO toki_players (telegram_user_id, username, first_name, last_name, lang, badges)
       VALUES (?, ?, ?, ?, ?, CAST(? AS JSON))
       ON DUPLICATE KEY UPDATE username = VALUES(username), first_name = VALUES(first_name),
         last_name = VALUES(last_name), lang = COALESCE(VALUES(lang), lang),
         badges = VALUES(badges), last_seen_at = CURRENT_TIMESTAMP`,
      [user.id, user.username ?? null, user.first_name ?? null, user.last_name ?? null, lang, JSON.stringify(badges)],
    );
    for (const [levelId, score] of scores) {
      await conn.execute(
        `INSERT INTO toki_progress (telegram_user_id, level_id, best_score) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE best_score = GREATEST(best_score, VALUES(best_score))`,
        [user.id, levelId, Math.round(score)],
      );
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    context.error('record-progress failed', err);
    return { status: 500, headers: cors, jsonBody: { error: 'db' } };
  } finally {
    conn.release();
  }
  return { status: 200, headers: cors, jsonBody: { ok: true, levels: scores.length } };
}

app.http('record-progress', { methods: ['POST', 'OPTIONS'], authLevel: 'anonymous', route: 'record-progress', handler });

module.exports = { handler };
