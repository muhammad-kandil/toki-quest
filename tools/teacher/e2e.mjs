/**
 * Teacher game e2e: build, `vite preview`, play title → name → campus →
 * Mission 01 (film, mission card, three investigations, board, laptop
 * puzzle, ending, closing) → staff room, notebook, Term Pass, shop, at
 * 390×844 in EN and AR. Fails on any console error / page error.
 * Also checks that ?mode=coach still opens the coach game.
 * Screenshots → tools/teacher/shots/ (git-ignored).
 *
 *   node tools/teacher/e2e.mjs            (builds first)
 *   SKIP_BUILD=1 node tools/teacher/e2e.mjs
 */
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SHOTS = join(ROOT, 'tools/teacher/shots');
mkdirSync(SHOTS, { recursive: true });

/** A port nobody is listening on (never reuse another checkout's preview). */
async function freePort() {
  const { createServer } = await import('node:net');
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once('error', reject);
    srv.listen(0, '127.0.0.1', () => { const p = srv.address().port; srv.close(() => resolve(p)); });
  });
}
const PORT = Number(process.env.PORT) || (await freePort());
const BASE = `http://127.0.0.1:${PORT}/toki-quest/`;

if (!process.env.SKIP_BUILD) execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' });
// Own process group, so stopping kills vite too (not just npx).
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { cwd: ROOT, stdio: 'pipe', detached: true });
let serverOut = '';
server.stdout.on('data', (d) => { serverOut += d; });
server.stderr.on('data', (d) => { serverOut += d; });
const stop = () => { try { process.kill(-server.pid, 'SIGTERM'); } catch { try { server.kill('SIGTERM'); } catch { /* ignore */ } } };
process.on('exit', stop);

async function waitUp() {
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error('preview exited: ' + serverOut);
    if (/Local:/.test(serverOut)) {
      try { const r = await fetch(BASE); if (r.ok) return; } catch { /* not yet */ }
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('preview did not start: ' + serverOut);
}

/** Real Mission 01 (src/teacher/data/adventures/a1-first-five-minutes.ts) puzzle answers. */
const PUZZLE = { intention: 'launch', prior: 'launch', try: 'facilitate', compare: 'facilitate', support: 'facilitate', reinforce: 'extend', check: 'extend', stretch: 'extend' };
/** Seed 7: Ahmed's first draw is the "strong" profile → "Assign" sets unlock:m2. */
const SEED = 7;
let failures = 0;
const check = (ok, msg) => { if (!ok) { failures++; console.error('  FAIL ' + msg); } else console.log('  ok   ' + msg); };

async function investigate(page, target) {
  await page.click(`[data-target="${target}"]`);
  await page.waitForTimeout(250);
  const clues = page.locator('.t-clue:not(.is-open)');
  while (await clues.count()) { await clues.first().click(); await page.waitForTimeout(120); }
  const opt = page.locator('.ts-opt:not([disabled])').first();
  await opt.click();
  await page.waitForSelector('.ts-result');
  await page.waitForTimeout(150);
  await page.click('.ts-adv__back');
  await page.waitForTimeout(200);
}

/** Answer whatever pool / follow-up events are pulsing (first choice), so nothing is left open. */
async function clearOpen(page) {
  for (let i = 0; i < 6; i++) {
    const hot = page.locator('.t-hot--needs:not(.t-hot--object)');
    if (!(await hot.count())) return;
    await hot.first().click();
    await page.waitForTimeout(250);
    const clues = page.locator('.t-clue:not(.is-open)');
    while (await clues.count()) { await clues.first().click(); await page.waitForTimeout(100); }
    const opt = page.locator('.ts-opt:not([disabled])').first();
    if (!(await opt.count())) return;
    await opt.click();
    await page.waitForSelector('.ts-result');
    await page.click('.ts-adv__back');
    await page.waitForTimeout(200);
  }
}

async function run(lang) {
  console.log(`\n[${lang}]`);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: lang === 'ar' ? 'ar-AE' : 'en-US' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  const shot = (n) => page.screenshot({ path: join(SHOTS, `${lang}-${n}.png`) });

  await page.goto(BASE + `?mode=teacher&seed=${SEED}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { try { localStorage.clear(); } catch { /* ignore */ } });
  await page.goto(BASE + `?mode=teacher&seed=${SEED}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  if (lang === 'ar') await page.click('.ts-lang__btn[lang="ar"]');
  else await page.click('.ts-lang__btn >> text=EN');
  await page.waitForTimeout(200);
  const [hl, dir] = await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir]);
  check(hl === lang && dir === (lang === 'ar' ? 'rtl' : 'ltr'), `html lang/dir = ${hl}/${dir}`);
  await shot('01-title');
  await page.click('.ts-title__start');
  await page.waitForSelector('.ts-name__input');
  await page.fill('.ts-name__input', lang === 'ar' ? 'مريم' : 'Mariam');
  await page.click('.ts-name__go');
  await page.waitForSelector('.ts-campus');
  await page.waitForTimeout(400);
  check(await page.locator('.t-pin').count() >= 6, 'campus pins rendered');
  check(await page.locator('.t-pin--next').count() === 1, 'exactly one next pin');
  await shot('02-campus');

  // Mission 01 (real content)
  await page.click('[data-loc="grade7"]');
  await page.waitForSelector('.ts-film__next');
  await shot('03-film');
  await page.click('.ts-film__next');
  await page.click('.ts-film__skip');
  await page.waitForSelector('.t-mission');
  await shot('04-mission');
  await page.click('.ts-mission__start');
  await page.waitForSelector('.ts-chips');
  check(await page.locator('.ts-adv__clock .t-num').count() === 0, 'no countdown (untimed mission)');
  check(await page.locator('.t-hot').count() === 6, '3 students + 3 objects');
  check(await page.locator('.t-hot--needs').count() === 6, 'every hotspot open from the start (schedule)');
  await shot('05-explore');

  // Ahmed: evidence cards; screenshot mid-investigation
  await page.click('[data-target="ahmed"]');
  await page.waitForSelector('.t-clue');
  await page.locator('.t-clue').first().click();
  await page.waitForTimeout(600);
  check(await page.locator('.t-choices-locked').count() === 1, 'choices locked until enough clues');
  await shot('06-investigation');
  await page.click('.ts-encounter__later');
  const queued = async () => page.locator('.t-hot--needs').count();
  await investigate(page, 'ahmed');
    await investigate(page, 'sara');
  await investigate(page, 'omar');
  check((await queued()) >= 1, 'pool / follow-up events pulse after student encounters');
  await clearOpen(page);

  // Laptop: its choice's outcome id equals puzzle.id → the puzzle opens first
  await page.click('[data-target="laptop"]');
  await page.waitForSelector('.ts-opt');
  await page.locator('.ts-opt:not([disabled])').first().click();
  await page.waitForSelector('.t-laptop');
  check(await page.locator('.t-sim-label').count() === 1, 'simulation label present');
  for (const [card, stage] of Object.entries(PUZZLE)) {
    await page.click(`.t-practice-tray [data-card="${card}"]`);
    await page.click(`[data-place="${stage}"]`);
  }
  await shot('07-puzzle');
  await page.click('.ts-puzzle__check');
  await page.waitForSelector('.ts-puzzle__done');
  check(true, 'puzzle solved');
  await page.click('.ts-puzzle__close');
  await page.waitForSelector('.ts-result');
  check(true, 'the laptop outcome shows after the puzzle');
  await page.click('.ts-adv__back');
  await page.waitForTimeout(200);

  // Board (also draws a pool event)
  await page.click('[data-target="board"]');
  await page.waitForSelector('.ts-opt');
  await page.locator('.ts-opt:not([disabled])').first().click();
  await page.waitForSelector('.ts-result');
  await page.click('.ts-adv__back');
  await page.waitForTimeout(200);

  // Milestone ending
  await page.click('.ts-adv__begin');
  await page.waitForSelector('.ts-ending--primary');
  await page.click('.ts-ending--primary');
  await page.waitForSelector('.ts-closing__actions');
  await page.waitForTimeout(500);
  check(await page.locator('.t-open-mission').count() >= 1, 'ending lists missions opened');
  check(await page.locator('.t-xp').count() >= 1, 'modest XP shown');
  check(await page.locator('[data-open="m2"]').count() === 1, 'unlock:m2 flag opens Mission 02');
  check(await page.locator('.ts-closing .t-medal, .ts-badge .t-medal').count() >= 1 && await page.locator('[data-badge="instructional-architect"], .ts-badge').count() >= 1, 'badges awarded');
  await shot('08-ending');

  // Into Mission 02
  await page.click('[data-open="m2"]');
  await page.waitForSelector('.ts-film__skip, .t-mission');
  if (await page.locator('.ts-film__skip').count()) await page.click('.ts-film__skip');
  await page.waitForSelector('.t-mission');
  const m2 = await page.locator('.t-mission__tag').innerText();
  check(/02/.test(m2), 'Mission 02 card: ' + m2.replace(/\s+/g, ' '));
  await shot('09-m2');
  await page.click('.ts-mission__start');
  await page.waitForSelector('.ts-chips');
  await page.click('.ts-leave');
  await page.waitForSelector('.ts-campus');
  check(await page.locator('[data-loc="grade7"].t-pin--next').count() === 1, 'campus: grade 7 has the next opened mission');

  // Staff room (toolkit), notebook
  await page.click('[data-loc="staffroom"]');
  await page.waitForSelector('.t-tool');
  check(await page.locator('.t-tool:not(.t-tool--unfound)').count() >= 2, 'NCLE tools in toolkit');
  await shot('10-toolkit');
  await page.goBack(); await page.waitForSelector('.ts-campus');
  await page.click('[data-loc="library"]');
  await page.waitForSelector('.ts-page');
  await shot('11-notebook');
  await page.click('.ts-back');
  await page.waitForSelector('.ts-campus');

  // Term Pass + shop
  await page.click('.ts-pass-btn');
  await page.waitForSelector('.t-pass-rail');
  const claim = page.locator('.t-pass-claim').first();
  if (await claim.count()) { await claim.click(); await page.waitForTimeout(800); }
  check(await page.locator('.t-pass-card--claimed').count() >= 1, 'Term Pass reward claimed');
  await shot('12-termpass');
  await page.click('.ts-back');
  await page.waitForSelector('.ts-campus');
  await page.click('[data-loc="shop"]');
  await page.waitForSelector('.t-shop-tabs');
  await page.click('[data-tab="powerup"]');
  await shot('13-shop');
  await page.click('.ts-back');
  await page.waitForSelector('.ts-campus');
  await shot('14-campus-after');

  // Save survives a reload
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  await page.click('.ts-title__start');
  await page.waitForSelector('.ts-campus');
  await page.click('[data-loc="library"]');
  await page.waitForSelector('.ts-page');
  check(await page.locator('.ts-page[data-adv="a1"]').count() === 1, 'progress persisted (teacher:v1)');

  check(errors.length === 0, 'no console errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await browser.close();
}

async function coach() {
  console.log('\n[coach mode]');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '?mode=coach', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  check(await page.locator('.title-screen__cta').count() === 1, 'coach title screen opens');
  check(await page.locator('.teacher-app').count() === 0, 'teacher app not mounted in coach mode');
  await page.goto(BASE + '?mode=teacher', { waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  check(true, '?mode=teacher returns to the teacher game');
  check(errors.length === 0, 'no page errors in coach mode');
  await browser.close();
}

try {
  await waitUp();
  await run('en');
  await run('ar');
  await coach();
} catch (e) {
  failures++;
  console.error(e);
} finally {
  stop();
}
console.log(failures ? `\nteacher e2e: ${failures} failure(s)` : '\nteacher e2e: all passed');
process.exit(failures ? 1 : 0);
