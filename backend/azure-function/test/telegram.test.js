'use strict';
const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');
const { validateInitData } = require('../src/telegram');

const TOKEN = '123456:TEST-TOKEN';
function sign(params) {
  const dcs = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(TOKEN).digest();
  const hash = crypto.createHmac('sha256', secret).update(dcs).digest('hex');
  return new URLSearchParams({ ...params, hash }).toString();
}

test('accepts a correctly signed, fresh initData', () => {
  const user = JSON.stringify({ id: 42, first_name: 'Toki', username: 'toki' });
  const initData = sign({ auth_date: String(Math.floor(Date.now() / 1000)), query_id: 'q', user });
  const u = validateInitData(initData, TOKEN);
  assert.equal(u?.id, 42);
});

test('rejects a tampered payload', () => {
  const user = JSON.stringify({ id: 42, first_name: 'Toki' });
  const initData = sign({ auth_date: String(Math.floor(Date.now() / 1000)), user });
  const tampered = initData.replace('42', '43');
  assert.equal(validateInitData(tampered, TOKEN), null);
});

test('rejects stale auth_date', () => {
  const user = JSON.stringify({ id: 42 });
  const initData = sign({ auth_date: String(Math.floor(Date.now() / 1000) - 3 * 24 * 3600), user });
  assert.equal(validateInitData(initData, TOKEN), null);
});

test('rejects wrong bot token and empty input', () => {
  const initData = sign({ auth_date: String(Math.floor(Date.now() / 1000)), user: '{"id":1}' });
  assert.equal(validateInitData(initData, 'other:token'), null);
  assert.equal(validateInitData('', TOKEN), null);
});
