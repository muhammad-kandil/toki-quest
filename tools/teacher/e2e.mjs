/**
 * Teacher game e2e (classroom universe): build, `vite preview` on a free
 * port, then at 390×844 in EN and AR:
 *   title → name → campus (5 places, no energy) → accessibility settings →
 *   classroom → opening film → session card → a seeded session (every
 *   scenario: hotspots, investigation / interaction, choice) → ending →
 *   closing → notebook, toolkit, Term Pass → resume after a reload.
 * Same seed in both languages ⇒ the same path (determinism).
 * Fails on any console error / page error. Also checks ?mode=coach.
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
const SEED = Number(process.env.SEED || 41029);

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

const shotTypes = new Set();
let failures = 0;
const check = (ok, msg) => { if (!ok) { failures++; console.error('  FAIL ' + msg); } else console.log('  ok   ' + msg); };
const count = (page, sel) => page.locator(sel).count();

/** Complete whatever interaction the open event has (uses data-* test hooks). */
async function solve(page, seen) {
  // investigate: clue cards
  while (await count(page, '.t-clue:not(.is-open)')) { await page.locator('.t-clue:not(.is-open)').first().click(); await page.waitForTimeout(80); seen.add('investigate'); }
  // compare
  for (let i = 0; i < 6 && await count(page, '[data-compare]:not(.is-open)'); i++) { await page.locator('[data-compare]:not(.is-open)').first().click(); seen.add('compare'); }
  // hint
  if (await count(page, '.ts-hint-next')) { await page.click('.ts-hint-next'); seen.add('hint'); }
  // match
  if (await count(page, '[data-evidence]')) {
    for (const el of await page.locator('[data-evidence]').all()) {
      const id = await el.getAttribute('data-evidence');
      await el.click();
      await page.click(`[data-meaning="${id}"]`);
    }
    await page.click('.ts-int-check'); seen.add('match');
  }
  // sort / plan
  if (await count(page, '.ts-int--buckets')) {
    for (let i = 0; i < 12 && await count(page, '.ts-tray-cards [data-card]'); i++) {
      const card = page.locator('.ts-tray-cards [data-card]').first();
      const fit = await card.getAttribute('data-fit');
      await card.click();
      await page.click(`[data-place="${fit}"]`);
    }
    seen.add((await count(page, '[data-bucket="open"]')) ? 'plan' : 'sort');
    await page.click('.ts-int-check');
  }
  // order: tap an item, tap its position
  if (await count(page, '.ts-int--order')) {
    const n = await count(page, '.ts-order__item');
    for (let i = 0; i < n; i++) {
      const items = await page.locator('.ts-order__item').all();
      const fits = await Promise.all(items.map((x) => x.getAttribute('data-fit')));
      const at = fits.indexOf(String(i));
      if (at !== i) { await items[at].click(); await page.click(`[data-slot="${i}"]`); }
    }
    await page.click('.ts-int-check'); seen.add('order');
  }
  // pattern
  if (await count(page, '.ts-int--pattern')) {
    for (const el of await page.locator('.ts-cell[data-fit="1"]').all()) await el.click();
    await page.click('.ts-int-check'); seen.add('pattern');
  }
}

/** Play one scenario: every pulsing hotspot, then "Continue the lesson". */
async function playScenario(page, seen) {
  await page.click('.ts-mission__start');
  await page.waitForSelector('.ts-chips');
  for (let guard = 0; guard < 10; guard++) {
    if (!(await count(page, '.t-hot--needs'))) break;
    await page.locator('.t-hot--needs').first().click();
    await page.waitForTimeout(200);
    // one screenshot per interaction type, as it opens
    for (const t of ['compare', 'hint', 'match', 'buckets', 'order', 'pattern']) {
      if (!shotTypes.has(t) && await count(page, `.ts-int--${t}`)) {
        shotTypes.add(t);
        await page.locator(`.ts-int--${t}`).scrollIntoViewIfNeeded();
        await page.screenshot({ path: join(SHOTS, `int-${t}.png`) });
      }
    }
    await solve(page, seen);
    const opt = page.locator('.ts-opt:not([disabled])').first();
    await opt.click();
    await page.waitForSelector('.ts-result');
    await page.click('.ts-adv__back');
    await page.waitForTimeout(150);
  }
  await page.click('.ts-scn__continue');
  await page.waitForTimeout(300);
}

async function run(lang) {
  console.log(`\n[${lang}]`);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: lang === 'ar' ? 'ar-AE' : 'en-US' });
  await ctx.addInitScript(() => { window.__tokiTrack = []; });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  const shot = (n) => page.screenshot({ path: join(SHOTS, `${lang}-${n}.png`) });

  await page.goto(BASE + `?mode=teacher&seed=${SEED}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { try { localStorage.clear(); localStorage.setItem('toki:mode', 'teacher'); } catch { /* ignore */ } });
  await page.goto(BASE + `?mode=teacher&seed=${SEED}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  if (lang === 'ar') await page.click('.ts-lang__btn[lang="ar"]');
  else await page.click('.ts-lang__btn >> text=EN');
  await page.waitForTimeout(200);
  const [hl, dir] = await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir]);
  check(hl === lang && dir === (lang === 'ar' ? 'rtl' : 'ltr'), `html lang/dir = ${hl}/${dir}`);
  await page.click('.ts-title__start');
  await page.waitForSelector('.ts-name__input');
  await page.fill('.ts-name__input', lang === 'ar' ? 'مريم' : 'Mariam');
  await page.click('.ts-name__go');
  await page.waitForSelector('.ts-campus');
  await page.waitForTimeout(300);
  check(await count(page, '.t-pin') === 5, 'campus: classroom, staff room, library, community, shop');
  check(await count(page, '.ts-energy, .t-meter--pips') === 0, 'no energy system');
  await shot('01-campus');

  // Accessibility settings
  await page.click('.ts-settings-btn');
  await page.click('.ts-open-a11y');
  await page.waitForSelector('.ts-switch');
  await page.click('[data-setting="largeText"]');
  check(await count(page, '.teacher-app.ts-large-text') === 1, 'larger text applies');
  await page.click('[data-setting="largeText"]');
  await page.click('[data-setting="reducedMotion"]');
  check(await count(page, '.teacher-app.ts-reduce-motion') === 1, 'reduced motion applies');
  await page.click('[data-setting="reducedMotion"]');
  await shot('02-a11y');
  await page.click('.ts-back');
  await page.waitForSelector('.ts-campus');

  // Session 1
  await page.click('.t-pin--next');
  await page.waitForSelector('.ts-film__next');
  check(await count(page, '.ts-caption') === 1, 'opening narration captioned');
  await shot('03-opening');
  await page.click('.ts-film__next');
  await page.click('.ts-film__skip');
  await page.waitForSelector('.ts-session__start');
  await shot('04-session-card');
  await page.click('.ts-session__start');
  const seen = new Set();
  let scenarios = 0;
  for (let i = 0; i < 10; i++) {
    await page.waitForSelector('.ts-mission__start, .ts-ending--primary');
    if (await count(page, '.ts-ending--primary')) break;
    if (i === 0) { await shot('05-scenario-card'); }
    await playScenario(page, seen);
    scenarios++;
    if (i === 1) await shot('06-scenario-done');
  }
  check(scenarios >= 4, `played ${scenarios} scenarios (L01 + arc draws)`);
  check(seen.size >= 2, 'interactions used: ' + [...seen].join(', '));
  await page.waitForSelector('.ts-ending--primary');
  await shot('07-ending-choice');
  await page.click('.ts-ending--primary');
  await page.waitForSelector('.ts-closing__actions');
  const path = await page.locator('.ts-closing .ts-path__chip').evaluateAll((els) => els.map((e) => e.getAttribute('data-code')));
  const ending = await page.locator('.ts-closing [data-ending]').first().getAttribute('data-ending');
  console.log(`       path ${path.join(' → ')} → ${ending}`);
  check(path[0] === 'L01', 'session starts at the L01 hub');
  check(await count(page, '[data-student]') === 3, 'students shown as story notes');
  await page.waitForTimeout(400);
  await shot('08-closing');
  await page.click('.ts-session__campus');
  await page.waitForSelector('.ts-campus');

  // Notebook, toolkit, Term Pass
  await page.click('[data-loc="library"]');
  await page.waitForSelector('.ts-page[data-session="1"]');
  check(true, 'notebook lists session 1');
  await shot('09-notebook');
  await page.click('.ts-back');
  await page.click('[data-loc="staffroom"]');
  await page.waitForSelector('.t-tool');
  check(await count(page, '.t-tool:not(.t-tool--unfound)') >= 1, 'NCLE tools discovered in the session');
  await page.click('.ts-back');
  await page.waitForSelector('.ts-campus');
  check(/1\/\d+/.test(await page.locator('.ts-pass-btn').innerText()), 'Term Pass +1 for the session');

  // Session 2: pause after the hub, reload, resume
  await page.click('.t-pin--next');
  await page.waitForSelector('.ts-film__skip');
  await page.click('.ts-film__skip');
  await page.click('.ts-session__start');
  await playScenario(page, seen);
  await page.waitForSelector('.ts-mission__start');
  await page.click('.ts-leave');
  await page.waitForSelector('.ts-campus');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  await page.click('.ts-title__start');
  await page.waitForSelector('.ts-campus');
  await page.click('.t-pin--next');
  await page.waitForSelector('.ts-session__resume');
  await page.click('.ts-session__resume');
  await page.waitForSelector('.ts-mission__start');
  check(true, 'resumed session 2 at its next moment after a reload');

  // the analytics queue persists across the reload (no PROGRESS_URL here, so nothing is sent)
  const events = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('toki:teacher:events') || '[]').map((e) => e.name); } catch { return []; } });
  for (const n of ['game_open', 'language_change', 'accessibility_setting_change', 'scenario_enter', 'hotspot_tap', 'evidence_reveal', 'choice_commit', 'tool_discovered', 'scenario_complete', 'ending_reached', 'replay_started', 'resume_success']) {
    check(events.includes(n), 'analytics: ' + n);
  }
  check(errors.length === 0, 'no console errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await browser.close();
  return path.join('>') + '>' + ending;
}

/** A second seed whose path covers the remaining interaction types (hint, match, order). */
async function coverage(seed) {
  console.log(`\n[interactions · seed ${seed}]`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + `?mode=teacher&seed=${seed}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { try { localStorage.clear(); localStorage.setItem('toki:mode', 'teacher'); } catch { /* ignore */ } });
  await page.goto(BASE + `?mode=teacher&seed=${seed}`, { waitUntil: 'networkidle' });
  await page.click('.ts-title__start');
  await page.fill('.ts-name__input', 'QA');
  await page.click('.ts-name__go');
  await page.click('.t-pin--next');
  await page.click('.ts-film__skip');
  await page.click('.ts-session__start');
  const seen = new Set();
  for (let i = 0; i < 10; i++) {
    await page.waitForSelector('.ts-mission__start, .ts-ending--primary');
    if (await count(page, '.ts-ending--primary')) break;
    await playScenario(page, seen);
  }
  await page.screenshot({ path: join(SHOTS, `qa-ending-${seed}.png`) });
  for (const t of ['hint', 'match', 'order']) check(seen.has(t), `interaction played: ${t}`);
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
  check(await count(page, '.title-screen__cta') === 1, 'coach title screen opens');
  check(await count(page, '.teacher-app') === 0, 'teacher app not mounted in coach mode');
  await page.goto(BASE + '?mode=teacher', { waitUntil: 'networkidle' });
  await page.waitForSelector('.ts-title');
  check(true, '?mode=teacher returns to the teacher game');
  check(errors.length === 0, 'no page errors in coach mode');
  await browser.close();
}

try {
  await waitUp();
  const en = await run('en');
  const ar = await run('ar');
  console.log('');
  check(en === ar, `same seed → same path in EN and AR (${en})`);
  await coverage(Number(process.env.SEED2 || 20));
  await coach();
} catch (e) {
  failures++;
  console.error(e);
} finally {
  stop();
}
console.log(failures ? `\nteacher e2e: ${failures} failure(s)` : '\nteacher e2e: all passed');
process.exit(failures ? 1 : 0);
