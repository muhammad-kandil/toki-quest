/**
 * Universe engine + interaction tests against the real UNIVERSE (src/teacher/data/universe.ts).
 * Run: npm run test:teacher
 */
import assert from 'node:assert/strict';
import {
  completeScenario, currentCode, drawNext, drawRand, eligibleInPool, endSession, hash32, meetsU, mulberry32, newUniverseState,
  normalizeUniverse, pickUniverseEnding, scenarioAdventure, scenarioByCode, scenarioFlags, scenarioRand, sessionSeed, simulatePath,
  startSession, XP_EXPLORE, XP_TOOL, type ScenarioResult, type UState,
} from '../../src/teacher/engine/universe';
import { checkCardToTarget, checkOrder, checkPattern, checkPlan, fitOf, interactionOf, moveItem } from '../../src/teacher/engine/interactions';
import { choose, createSim, findEvent } from '../../src/teacher/engine/sim';
import { offeredChoices, startEncounter } from '../../src/teacher/engine/mission';
import { getUniverse } from '../../src/teacher/content';
import type { InteractionType, Scenario, Task } from '../../src/teacher/types';

const U = getUniverse();
const STUDENTS = new Set(U.students.map((s) => s.id));

let n = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); n++; console.log('  ok  ' + name); } catch (e) { console.error('  FAIL ' + name); throw e; }
};

/**
 * Auto-play a scenario: in the hub only the student hotspots (objects are optional),
 * elsewhere every hotspot event in order. Choice: the `pick`-th offered, or seeded if pick < 0.
 */
function autoPlay(pick = 0) {
  return (sc: Scenario, s: UState): ScenarioResult => {
    const adv = scenarioAdventure(sc, s);
    let sim = createSim(adv, scenarioFlags(s));
    const rand = scenarioRand(s.seed, sc.code, s.visited.length);
    const outcomes: string[] = [];
    const hub = sc.code === U.entry;
    for (const q of adv.schedule) {
      let ev = findEvent(adv, q.event)!;
      if (hub && !STUDENTS.has(ev.on)) continue;
      for (let guard = 0; ev && guard < 5; guard++) {
        sim = startEncounter(sim, ev, rand);
        const offer = offeredChoices(ev, sim.flags);
        const c = pick < 0 ? offer[Math.floor(rand() * offer.length)] : offer[Math.min(pick, offer.length - 1)];
        const r = choose(sim, adv, ev.id, c.index);
        sim = r.sim;
        if (!r.outcome) break;
        outcomes.push(r.outcome.id);
        const nx = r.outcome.next?.event;
        ev = nx ? findEvent(adv, nx)! : undefined!;
      }
    }
    const outcomeXp = Object.fromEntries(sc.outcomes.map((o) => [o.id, o.xp ?? 0]));
    return { outcomes, outcomeXp, found: sim.found, flags: sim.flags, students: sim.students, profiles: sim.profiles };
  };
}
const kindOf = (code: string) => scenarioByCode(U, code)!.kind;

test('content: real UNIVERSE (L01 hub, 3-step arc 1/3/2 with endsOn F03 / E05, 4 needs)', () => {
  assert.equal(U.entry, 'L01');
  assert.deepEqual(U.arc.map((a) => [a.pool, a.draws]), [['after-launch', 1], ['mid-lesson', 3], ['late-lesson', 2]]);
  assert.deepEqual(U.arc.map((a) => a.endsOn ?? []), [[], ['F03'], ['E05']]);
  for (const c of ['L01', 'L05', 'F01', 'F06', 'E01', 'E05', 'R01', 'R06']) assert.ok(scenarioByCode(U, c), c);
  assert.ok(!U.pools.some((p) => p.entries.some((e) => e.code === 'R05')), 'R05 is in no pool (trigger only)');
});

test('PRNG: mulberry32 / hash deterministic; session seed from id + version + session', () => {
  assert.equal(mulberry32(41029)(), mulberry32(41029)());
  assert.notEqual(hash32('a'), hash32('b'));
  assert.equal(sessionSeed('k', 'v1', 1), sessionSeed('k', 'v1', 1));
  assert.notEqual(sessionSeed('k', 'v1', 1), sessionSeed('k', 'v2', 1), 'content version changes the seed');
  assert.notEqual(drawRand(5, 0)(), drawRand(5, 1)(), 'each draw has its own stream');
});

test('session: hub first, phases never go back, same seed + state → same path', () => {
  const s0 = newUniverseState(U, 'tester', 41029);
  const a = simulatePath(s0, U, autoPlay(-1));
  const b = simulatePath(s0, U, autoPlay(-1));
  assert.equal(a.path[0], 'L01');
  assert.deepEqual(a.path, b.path);
  assert.equal(a.ending, b.ending);
  const order = { launch: 0, facilitate: 1, extend: 2 };
  const phases = a.path.filter((c) => kindOf(c) === 'scenario').map((c) => scenarioByCode(U, c)!.phase);
  for (let i = 1; i < phases.length; i++) assert.ok(order[phases[i]] >= order[phases[i - 1]], 'phases never go back: ' + a.path.join('→'));
});

test('arc over 400 seeds: 4–10 scenarios (median 7), ≤ draws per phase, ≤ 1 random per phase, variety', () => {
  const lens: number[] = [];
  const paths = new Set<string>();
  for (let seed = 1; seed <= 400; seed++) {
    let s = startSession(newUniverseState(U, 'arc', seed), U);
    const play = autoPlay(-1);
    const perStep: { draws: number; randoms: number }[] = U.arc.map(() => ({ draws: 0, randoms: 0 }));
    for (let g = 0; g < 30; g++) {
      const d = currentCode(s, U);
      if (!d) break;
      if (d.via === 'draw') {
        const k = kindOf(d.code);
        if (k === 'random') perStep[d.arc.step].randoms++; else perStep[d.arc.step].draws++;
      }
      s = completeScenario(s, U, d.code, play(scenarioByCode(U, d.code)!, s), d).state;
    }
    perStep.forEach((p, i) => {
      assert.ok(p.draws <= U.arc[i].draws, `seed ${seed} step ${i}: ${p.draws} draws`);
      assert.ok(p.randoms <= 1, `seed ${seed} step ${i}: ${p.randoms} randoms`);
    });
    lens.push(s.visited.length);
    paths.add(s.visited.join('>'));
  }
  lens.sort((x, y) => x - y);
  assert.ok(lens[0] >= 4 && lens[lens.length - 1] <= 10, `range ${lens[0]}–${lens[lens.length - 1]}`);
  const median = lens[lens.length >> 1];
  assert.ok(median >= 6 && median <= 8, `median ${median}`);
  assert.ok(paths.size >= 50, `variety: ${paths.size} distinct paths`);
});

test('random events are bonus draws: drawing one keeps the step\'s budget', () => {
  // after L01, with all non-random after-launch entries on cooldown, a random is drawn and `left` is unchanged
  const base = { ...startSession(newUniverseState(U, 'rb', 2), U), visited: ['L01'] };
  const s = { ...base, cooldowns: { L02: 2, L03: 2, L04: 2, L05: 2, F01: 2 }, flags: { 'u.stretch': true } };
  const d = drawNext(s, U)!;
  assert.equal(kindOf(d.code), 'random');
  assert.deepEqual([d.arc.step, d.arc.left, d.arc.randomUsed], [0, 1, true]);
  // a second random in the same phase is filtered
  assert.ok(!eligibleInPool({ ...s, arc: d.arc }, U, 'after-launch').some((c) => c.sc.kind === 'random'));
  // nothing eligible → the step is skipped, never stuck
  const stuck = { ...s, arc: d.arc };
  assert.equal(drawNext(stuck, U)!.arc.step, 1, 'moved on to the mid-lesson pool');
});

test('R04 budgetDelta removes one draw; F03 / E05 end their phase early', () => {
  const s = { ...startSession(newUniverseState(U, 'bd', 3), U), visited: ['L01', 'L02'] };
  const r = completeScenario(s, U, 'R04', autoPlay()(scenarioByCode(U, 'R04')!, s), { code: 'R04', via: 'draw', arc: { step: 1, left: 3, randomUsed: true } }).state;
  assert.deepEqual(r.arc, { step: 1, left: 2, randomUsed: true });
  const f3 = completeScenario(s, U, 'F03', autoPlay()(scenarioByCode(U, 'F03')!, s), { code: 'F03', via: 'draw', arc: { step: 1, left: 2, randomUsed: false } }).state;
  assert.deepEqual(f3.arc, { step: 2, left: null, randomUsed: false });
  const e5 = completeScenario({ ...s, flags: { 'u.evidence': true } }, U, 'E05', autoPlay()(scenarioByCode(U, 'E05')!, s), { code: 'E05', via: 'draw', arc: { step: 2, left: 1, randomUsed: false } }).state;
  assert.equal(e5.arc.step, 3);
  assert.equal(currentCode(e5, U), null, 'arc complete after E05');
});

test('triggers: F01 "thinking visible" plays R05 next (not a draw) while Omar is quiet', () => {
  let s = { ...startSession(newUniverseState(U, 'tr', 4), U), visited: ['L01', 'L02'] };
  assert.ok(s.students.omar.participation <= 1);
  const f1 = scenarioByCode(U, 'F01')!;
  const res = autoPlay()(f1, s);
  assert.deepEqual(res.outcomes, ['f1Respond']);
  const arc = { step: 1, left: 2, randomUsed: false };
  s = completeScenario(s, U, 'F01', res, { code: 'F01', via: 'draw', arc }).state;
  const d = currentCode(s, U)!;
  assert.deepEqual([d.code, d.via], ['R05', 'trigger']);
  const after = completeScenario(s, U, 'R05', autoPlay()(scenarioByCode(U, 'R05')!, s), d).state;
  assert.deepEqual(after.arc, arc, 'a triggered scenario does not use a draw');
  assert.equal(after.trigger, undefined);
  assert.ok(!after.unresolved.includes('omar-voice'));
  assert.equal(after.students.omar.participation, s.students.omar.participation + 1, 'studentDelta');
  // a trigger whose requires fail is skipped for a normal draw
  const loud = { ...s, students: { ...s.students, omar: { ...s.students.omar, participation: 3 } } };
  assert.equal(currentCode(loud, U)!.via, 'draw');
});

test('R06: anyUnresolved gate; one choice per open need (ifUnresolved) plus "tomorrow"', () => {
  const s = { ...startSession(newUniverseState(U, 'r6', 5), U), visited: ['L01'] };
  assert.ok(!meetsU(scenarioByCode(U, 'R06')!.requires, s), 'no open need: R06 never drawn');
  const open = { ...s, unresolved: ['sara-gap', 'class-mis'] };
  assert.ok(meetsU(scenarioByCode(U, 'R06')!.requires, open));
  const ev = scenarioByCode(U, 'R06')!.events[0];
  const offered = offeredChoices(ev, scenarioFlags(open)).map((c) => c.choice.outcome);
  assert.deepEqual(offered, ['r6Sara', 'r6Class', 'r6Later']);
});

test('needs, students, tools, xp, cooldowns persist across sessions; flags are session-scoped', () => {
  const run = simulatePath(newUniverseState(U, 'h', 11), U, autoPlay(1));
  assert.ok(Object.keys(run.state.flags).length > 0);
  const next = endSession(run.state, U, run.ending);
  assert.equal(next.session, 2);
  assert.deepEqual(next.history, [{ session: 1, path: run.path, ending: run.ending }]);
  assert.deepEqual(next.students, run.state.students);
  assert.deepEqual(next.unresolved, run.state.unresolved);
  assert.deepEqual([next.tools, next.xp, next.cooldowns], [run.state.tools, run.state.xp, run.state.cooldowns]);
  assert.deepEqual(next.flags, {});
  assert.notEqual(next.seed, run.state.seed);
  // a second session starts from the evolved students and keeps cooldowns on startSession
  const s2 = startSession(next, U);
  assert.deepEqual(s2.students, run.state.students);
  assert.deepEqual(s2.cooldowns, run.state.cooldowns);
  // students change only via studentDelta: the hub's ring effects leave them alone
  const hub = startSession(newUniverseState(U, 'rings', 1), U);
  const after = completeScenario(hub, U, 'L01', autoPlay()(scenarioByCode(U, 'L01')!, hub), { code: 'L01', via: 'entry', arc: hub.arc }).state;
  for (const id of STUDENTS) {
    const deltas = scenarioByCode(U, 'L01')!.outcomes.some((o) => o.studentDelta?.some((d) => d.id === id));
    if (!deltas) assert.deepEqual(after.students[id], hub.students[id], id);
  }
});

test('XP anti-farming: full once, zero on identical repeat, exploration credit for a new evidence path', () => {
  const s0 = startSession(newUniverseState(U, 'xp', 7), U);
  const f1 = scenarioByCode(U, 'F01')!;
  const res = autoPlay()(f1, s0);
  const d = { code: 'F01', via: 'draw' as const, arc: { step: 1, left: 3, randomUsed: false } };
  const r1 = completeScenario(s0, U, 'F01', res, d);
  assert.equal(r1.xpGained, 30 + XP_TOOL, 'first discovery: outcome + new tool');
  assert.deepEqual(r1.newTools, ['present-mode']);
  const r2 = completeScenario(r1.state, U, 'F01', res, d);
  assert.equal(r2.xpGained, 0, 'identical repeat: zero');
  const r3 = completeScenario(r1.state, U, 'F01', { ...res, profiles: { live: 'other' } }, d);
  assert.equal(r3.xpGained, XP_EXPLORE);
  assert.equal(completeScenario(r3.state, U, 'F01', { ...res, profiles: { live: 'other' } }, d).xpGained, 0);
});

test('endings: END-B while a need is open; END-D; END-C; END-A fallback', () => {
  const base = startSession(newUniverseState(U, 'e', 3), U);
  assert.equal(pickUniverseEnding({ ...base, unresolved: ['sara-gap'], flags: { 'u.evidence': true, 'u.usedEvidence': true } }, U).primary.id, 'END-B');
  const d = pickUniverseEnding({ ...base, flags: { 'u.evidence': true, 'u.usedEvidence': true, 'u.peerVoice': true } }, U);
  assert.equal(d.primary.id, 'END-D');
  assert.deepEqual(d.others.map((e) => e.id), ['END-C', 'END-A']);
  assert.equal(pickUniverseEnding(base, U).primary.id, 'END-A');
});

test('resume: a session restored from its saved state draws the same next scenario', () => {
  let s = startSession(newUniverseState(U, 'r', 98114), U);
  const play = autoPlay(-1);
  for (let i = 0; i < 3; i++) { const c = currentCode(s, U)!; s = completeScenario(s, U, c.code, play(scenarioByCode(U, c.code)!, s), c).state; }
  const next = currentCode(s, U)!.code;
  const restored = normalizeUniverse(JSON.parse(JSON.stringify(s)), U, 'r');
  assert.equal(restored.inSession, true);
  assert.equal(currentCode(restored, U)!.code, next);
});

test('normalizeUniverse: corrupt → fresh; other content version keeps progress, resets the session', () => {
  assert.equal(normalizeUniverse('junk', U, 'k').session, 1);
  const st = { ...newUniverseState(U, 'k', 1), contentVersion: 'old', inSession: true, visited: ['L01'], xp: 90, tools: ['assign'], cooldowns: { F01: 2 } };
  const n2 = normalizeUniverse(st, U, 'k');
  assert.deepEqual([n2.inSession, n2.visited.length, n2.xp, n2.tools[0], n2.cooldowns.F01], [false, 0, 90, 'assign', 2]);
});

test('scenarioAdventure: hub hotspots are students + objects; rings start from persistent student state', () => {
  const s = newUniverseState(U, 'a', 1);
  s.students = { ...s.students, sara: { ...s.students.sara, understanding: 3, participation: 0 } };
  const adv = scenarioAdventure(scenarioByCode(U, 'L01')!, s);
  const on = adv.schedule.map((q) => findEvent(adv, q.event)!.on);
  for (const id of STUDENTS) assert.ok(on.includes(id), id);
  const sara = adv.students.find((x) => x.id === 'sara')!;
  assert.deepEqual([sara.understanding, sara.engagement], [3, 0]);
  assert.equal(adv.timed, false);
});

test('interactions: all 8 types used; every real task is solvable from its evidence', () => {
  const seen = new Set<InteractionType>();
  for (const sc of U.scenarios) for (const ev of sc.events) {
    const type = interactionOf(ev);
    if (!type) continue;
    seen.add(type);
    const task = ev.task as Task | undefined;
    if (!task || type === 'investigate' || type === 'compare' || type === 'hint') continue;
    const where = `${sc.code}/${ev.id}`;
    const cards = (task.cards ?? []).map((c) => c.id);
    const fit = Object.fromEntries(cards.map((c) => [c, fitOf(type, task, c)]));
    if (type === 'match' || type === 'sort') assert.ok(checkCardToTarget(task, fit).complete, where);
    if (type === 'plan') assert.ok(checkPlan(task, fit).complete, where);
    if (type === 'pattern') assert.ok(checkPattern(task, fit).complete, where);
    if (type === 'order') {
      assert.ok(checkOrder(task, task.order!).complete, where);
      assert.ok(!checkOrder(task, [...task.order!].reverse()).complete, where + ' reversed');
    }
  }
  for (const t of ['investigate', 'compare', 'match', 'sort', 'order', 'hint', 'pattern', 'plan'] as const) assert.ok(seen.has(t), t);
  assert.deepEqual(moveItem(['b', 'a', 'c'], 'a', -1), ['a', 'b', 'c']);
  assert.deepEqual(moveItem(['a', 'b'], 'a', -1), ['a', 'b'], 'edge: no move');
  // nothing is "wrong", only pending
  const f1 = scenarioByCode(U, 'F01')!.events[0].task!;
  assert.deepEqual(checkPattern(f1, { c1: 'unit' }).pending, ['c2', 'c3', 'c4']);
});

console.log(`\nteacher universe: ${n} tests passed`);
