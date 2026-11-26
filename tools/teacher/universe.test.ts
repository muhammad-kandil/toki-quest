/**
 * Universe engine + interaction tests. Run: npm run test:teacher
 */
import assert from 'node:assert/strict';
import {
  completeScenario, currentCode, drawNext, drawRand, eligibleInPool, endSession, hash32, meetsU, mulberry32, newUniverseState,
  normalizeUniverse, pickUniverseEnding, scenarioAdventure, scenarioByCode, scenarioRand, sessionSeed, simulatePath, startSession,
  RECOVERY_BOOST, XP_EXPLORE, XP_TOOL, type ScenarioResult, type UState,
} from '../../src/teacher/engine/universe';
import { checkMatch, checkOrder, checkPattern, checkPlan, checkSort, interactionOf, moveItem } from '../../src/teacher/engine/interactions';
import { choose, createSim, findEvent } from '../../src/teacher/engine/sim';
import { offeredChoices, startEncounter } from '../../src/teacher/engine/mission';
import { UNIVERSE_FIXTURE as U } from '../../src/teacher/dev/universeFixture';
import type { Scenario } from '../../src/teacher/types';

let n = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); n++; console.log('  ok  ' + name); } catch (e) { console.error('  FAIL ' + name); throw e; }
};

/** Auto-play: every hotspot event, first offered choice (k-th if `pick` given). */
function autoPlay(pick = 0) {
  return (sc: Scenario, s: UState): ScenarioResult => {
    const adv = scenarioAdventure(sc, s);
    let sim = createSim(adv, s.flags);
    const rand = scenarioRand(s.seed, sc.code, s.visited.length);
    const outcomes: string[] = [];
    for (const q of adv.schedule) {
      const ev = findEvent(adv, q.event)!;
      sim = startEncounter(sim, ev, rand);
      const offer = offeredChoices(ev, sim.flags);
      const c = offer[Math.min(pick, offer.length - 1)];
      const r = choose(sim, adv, ev.id, c.index);
      sim = r.sim;
      outcomes.push(r.outcome.id);
    }
    const outcomeXp = Object.fromEntries(sc.outcomes.map((o) => [o.id, o.xp ?? 0]));
    return { outcomes, outcomeXp, found: sim.found, flags: sim.flags, students: sim.students, profiles: sim.profiles };
  };
}

test('PRNG: mulberry32 / hash deterministic; session seed from id + version + session', () => {
  assert.equal(mulberry32(41029)(), mulberry32(41029)());
  assert.notEqual(hash32('a'), hash32('b'));
  assert.equal(sessionSeed('k', 'v1', 1), sessionSeed('k', 'v1', 1));
  assert.notEqual(sessionSeed('k', 'v1', 1), sessionSeed('k', 'v2', 1), 'content version changes the seed');
  assert.notEqual(drawRand(5, 0)(), drawRand(5, 1)(), 'each draw has its own stream');
});

test('session: entry hub first, then pools in arc order; same seed + state → same path', () => {
  const s0 = newUniverseState(U, 'tester', 41029);
  const a = simulatePath(s0, U, autoPlay());
  const b = simulatePath(s0, U, autoPlay());
  assert.equal(a.path[0], 'L01');
  assert.deepEqual(a.path, b.path);
  assert.equal(a.ending, b.ending);
  const phases = a.path.map((c) => scenarioByCode(U, c)!.phase);
  const order = { launch: 0, facilitate: 1, extend: 2 };
  for (let i = 1; i < phases.length; i++) assert.ok(order[phases[i]] >= order[phases[i - 1]], 'phases never go back: ' + a.path.join('→'));
  assert.equal(a.path.length, 1 + 1 + 1 + 2, 'L01 + arc draws');
  // different seeds explore different paths
  const paths = new Set<string>();
  for (let seed = 1; seed <= 40; seed++) paths.add(simulatePath(newUniverseState(U, 'x', seed), U, autoPlay()).path.join('>'));
  assert.ok(paths.size >= 4, `variety: ${paths.size} distinct paths`);
});

test('resume: a session resumed from its saved state draws the same next scenario', () => {
  let s = startSession(newUniverseState(U, 'r', 98114), U);
  const play = autoPlay();
  for (let i = 0; i < 2; i++) { const c = currentCode(s, U)!; s = completeScenario(s, U, c.code, play(scenarioByCode(U, c.code)!, s), c.arc).state; }
  const next = currentCode(s, U)!.code;
  const restored = normalizeUniverse(JSON.parse(JSON.stringify(s)), U, 'r');
  assert.equal(restored.inSession, true);
  assert.equal(currentCode(restored, U)!.code, next);
});

test('pool filtering: prerequisites, cooldown, immediate repeat, played this session, contradiction; weights normalised', () => {
  const s = { ...startSession(newUniverseState(U, 'f', 1), U), visited: ['L01'] };
  const late = eligibleInPool(s, U, 'late-lesson').map((c) => c.sc.code);
  assert.ok(!late.includes('E05'), 'E05 requires evidenceGathered');
  assert.ok(!late.includes('R06'), 'R06 requires an unresolved need (contradiction otherwise)');
  const s2 = { ...s, flags: { evidenceGathered: true }, unresolved: ['sara-gap'] };
  const late2 = eligibleInPool(s2, U, 'late-lesson');
  assert.ok(late2.some((c) => c.sc.code === 'E05'));
  assert.equal(late2.find((c) => c.sc.code === 'R06')!.weight, 5 * RECOVERY_BOOST, 'recovery boosted while a need is open');
  assert.ok(!eligibleInPool({ ...s2, cooldowns: { E01: 1 } }, U, 'late-lesson').some((c) => c.sc.code === 'E01'), 'cooldown');
  assert.ok(!eligibleInPool({ ...s2, visited: ['L01', 'E01'] }, U, 'late-lesson').some((c) => c.sc.code === 'E01'), 'no repeat');
  // nothing eligible in a pool → that arc step is skipped, never stuck
  const empty = { ...s, visited: ['L01', 'L02', 'L04'], arc: { step: 0, drawn: 0 } };
  const d = drawNext(empty, U)!;
  assert.equal(d.arc.step, 1, 'moved on to the mid-lesson pool');
});

test('completeScenario: needs, student variables, cooldowns, tools; XP anti-farming', () => {
  let s = startSession(newUniverseState(U, 'xp', 7), U);
  const L04 = scenarioByCode(U, 'L04')!;
  const res: ScenarioResult = { outcomes: ['l04-seewhy'], outcomeXp: { 'l04-seewhy': 30 }, found: ['see-why'], flags: { a: true }, students: { sara: [2, 2] }, profiles: {} };
  const r1 = completeScenario(s, U, 'L04', res, { step: 0, drawn: 1 });
  assert.equal(r1.xpGained, 30 + XP_TOOL, 'first discovery: full');
  s = r1.state;
  assert.deepEqual(s.unresolved, ['sara-gap']);
  assert.equal(s.students.sara.understanding, 2);
  assert.equal(s.students.sara.confidence, 2, 'studentDelta applied');
  assert.deepEqual(s.tools, ['see-why']);
  const r2 = completeScenario(s, U, 'L04', res, { step: 0, drawn: 1 });
  assert.equal(r2.xpGained, 0, 'identical repeat: zero');
  // a new evidence path in a scenario already played earns exploration credit, once
  const r3 = completeScenario(s, U, 'L04', { ...res, profiles: { 'l04-sara': 'other' } }, { step: 0, drawn: 1 });
  assert.equal(r3.xpGained, XP_EXPLORE);
  const r4 = completeScenario(r3.state, U, 'L04', { ...res, profiles: { 'l04-sara': 'other' } }, { step: 0, drawn: 1 });
  assert.equal(r4.xpGained, 0);
  // closing the need
  const f04 = completeScenario(s, U, 'F04', { ...res, outcomes: [], found: [] }, { step: 1, drawn: 1 }).state;
  assert.deepEqual(f04.unresolved, []);
  assert.equal(L04.opensNeeds![0], 'sara-gap');
});

test('endings: by priority among eligible; END-B while a need is open; session history persists across sessions', () => {
  const base = startSession(newUniverseState(U, 'e', 3), U);
  assert.equal(pickUniverseEnding({ ...base, unresolved: ['sara-gap'], flags: { evidenceGathered: true, evidenceUsed: true } }, U).primary.id, 'END-B');
  const d = pickUniverseEnding({ ...base, flags: { evidenceGathered: true, evidenceUsed: true, peerVoice: true } }, U);
  assert.equal(d.primary.id, 'END-D');
  assert.deepEqual(d.others.map((e) => e.id), ['END-C', 'END-A']);
  assert.equal(pickUniverseEnding(base, U).primary.id, 'END-A');
  const run = simulatePath(newUniverseState(U, 'h', 11), U, autoPlay());
  const next = endSession(run.state, U, run.ending);
  assert.equal(next.session, 2);
  assert.equal(next.history.length, 1);
  assert.deepEqual(next.history[0].path, run.path);
  assert.deepEqual(next.students, run.state.students, 'student state evolves across sessions');
  assert.notEqual(next.seed, run.state.seed);
  assert.equal(next.inSession, false);
});

test('conditions: flags / anyFlags / visited / needs / student vars / xp', () => {
  const s = { ...newUniverseState(U, 'c', 1), flags: { a: true }, visited: ['L01'], unresolved: ['n1'], xp: 40 };
  assert.ok(meetsU({ flags: ['a'], anyFlags: ['z', 'a'], visited: ['L01'], notVisited: ['L02'], unresolved: ['n1'], resolved: ['n2'], minXp: 40 }, s));
  assert.ok(!meetsU({ student: [{ id: 'sara', key: 'understanding', min: 3 }] }, s));
  assert.ok(meetsU({ student: [{ id: 'ahmed', key: 'confidence', min: 3 }] }, s));
});

test('scenarioAdventure: hotspots from events; students start from the universe state', () => {
  const s = { ...newUniverseState(U, 'a', 1) };
  s.students = { ...s.students, sara: { ...s.students.sara, understanding: 3, participation: 0 } };
  const adv = scenarioAdventure(scenarioByCode(U, 'L01')!, s);
  assert.deepEqual(adv.schedule.map((q) => q.event), ['l01-ahmed', 'l01-sara', 'l01-omar']);
  const sara = adv.students.find((x) => x.id === 'sara')!;
  assert.deepEqual([sara.understanding, sara.engagement], [3, 0]);
  assert.equal(adv.timed, false);
});

test('normalizeUniverse: corrupt → fresh; other content version keeps progress, resets the session', () => {
  assert.equal(normalizeUniverse('junk', U, 'k').session, 1);
  const st = { ...newUniverseState(U, 'k', 1), contentVersion: 'old', inSession: true, visited: ['L01'], xp: 90, tools: ['assign'] };
  const n2 = normalizeUniverse(st, U, 'k');
  assert.deepEqual([n2.inSession, n2.visited.length, n2.xp, n2.tools[0]], [false, 0, 90, 'assign']);
});

test('interactions: every type checks completion; nothing is "wrong", only pending', () => {
  assert.ok(checkMatch([{ id: 'a' }, { id: 'b' }], { a: 'a', b: 'b' }).complete);
  assert.deepEqual(checkMatch([{ id: 'a' }, { id: 'b' }], { a: 'b' }).pending, ['a', 'b']);
  const items = [{ id: 'q', buckets: ['light'] }, { id: 's', buckets: ['heavy', 'light'] }];
  assert.ok(checkSort(items, { q: 'light', s: 'heavy' }).complete);
  assert.ok(checkSort(items, { q: 'light', s: 'light' }).complete, 'several buckets may be right');
  assert.deepEqual(checkSort(items, { q: 'heavy' }).pending, ['q', 's']);
  const ord = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  assert.ok(checkOrder(ord, ['a', 'b', 'c']).complete);
  assert.deepEqual(moveItem(['b', 'a', 'c'], 'a', -1), ['a', 'b', 'c']);
  assert.deepEqual(moveItem(['a', 'b'], 'a', -1), ['a', 'b'], 'edge: no move');
  const cells = [{ id: '1', tag: 'x' }, { id: '2', tag: 'y' }, { id: '3', tag: 'x' }];
  assert.ok(checkPattern(cells, 'x', ['3', '1']).complete);
  assert.deepEqual(checkPattern(cells, 'x', ['1', '2']).pending, ['3', '2']);
  const slots = [{ id: 'open' }, { id: 'group' }];
  const cards = [{ id: 'r', slots: ['open'] }, { id: 't', slots: ['group'] }];
  assert.ok(checkPlan(slots, cards, { r: 'open', t: 'group' }).complete);
  assert.deepEqual(checkPlan(slots, cards, { r: 'group' }).pending, ['open', 'group']);
  // every fixture interaction type is present and readable from events
  const types = new Set(U.scenarios.flatMap((sc) => sc.events.map((e) => interactionOf(e)?.type).filter(Boolean)));
  for (const t of ['investigate', 'compare', 'match', 'sort', 'order', 'hint', 'pattern', 'plan']) assert.ok(types.has(t as never), t);
});

console.log(`\nteacher universe: ${n} tests passed`);
