'use strict';
const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');

// Stub mysql2 before the handler loads it, so the test needs no database.
const calls = [];
const fakeConn = {
  beginTransaction: async () => calls.push('begin'),
  execute: async (sql, params) => { calls.push({ sql: sql.slice(0, 40), params }); return [{}]; },
  commit: async () => calls.push('commit'),
  rollback: async () => calls.push('rollback'),
  release: () => calls.push('release'),
};
require.cache[require.resolve('mysql2/promise')] = { exports: { createPool: () => ({ getConnection: async () => fakeConn }) } };
require.cache[require.resolve('@azure/functions')] = { exports: { app: { http: () => {} } } };

process.env.TELEGRAM_BOT_TOKEN = '123456:TEST-TOKEN';
const { handler } = require('../src/functions/recordProgress');

function signed(user) {
  const params = { auth_date: String(Math.floor(Date.now() / 1000)), user: JSON.stringify(user) };
  const dcs = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN).digest();
  return new URLSearchParams({ ...params, hash: crypto.createHmac('sha256', secret).update(dcs).digest('hex') }).toString();
}
const req = (body, method = 'POST') => ({ method, json: async () => body });
const ctx = { error: () => {} };

test('OPTIONS preflight returns CORS headers', async () => {
  const r = await handler(req(null, 'OPTIONS'), ctx);
  assert.equal(r.status, 204);
  assert.equal(r.headers['Access-Control-Allow-Origin'], 'https://muhammad-kandil.github.io');
});

test('rejects unsigned initData with 401 and touches no DB', async () => {
  calls.length = 0;
  const r = await handler(req({ initData: 'user=%7B%22id%22%3A1%7D&hash=00', bestScores: { 1: 100 } }), ctx);
  assert.equal(r.status, 401);
  assert.equal(calls.length, 0);
});

test('upserts player + valid levels only, inside one transaction', async () => {
  calls.length = 0;
  const r = await handler(req({
    initData: signed({ id: 777, first_name: 'Hind', username: 'hind_dlis' }),
    bestScores: { 1: 115, 25: 110, 85: 100, 99: 50, 7: 10, 3: 9999 },
    badges: ['drift-detective'], lang: 'ar',
  }), ctx);
  assert.equal(r.status, 200);
  assert.equal(r.jsonBody.levels, 3);           // 99, 7 (invalid ids) and 3 (score out of range) dropped
  assert.equal(calls[0], 'begin');
  assert.equal(calls.at(-2), 'commit');
  assert.equal(calls.at(-1), 'release');
  const inserts = calls.filter((c) => typeof c === 'object');
  assert.equal(inserts.length, 4);              // 1 player + 3 levels
  assert.deepEqual(inserts[1].params, [777, 1, 115]);
});
