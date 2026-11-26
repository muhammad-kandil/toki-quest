/**
 * Teacher engine tests. Run: npm run test:teacher  (vite-node, no vitest needed).
 */
import assert from 'node:assert/strict';
import {
  createSim, liveEvents, nextPending, runToNext, isLessonOver, unresolvedEvents, resolveOutcomeId,
  choose, peek, band, pickBadge, teaserEntry, railStepFor, encodePath, decodePath, findEvent,
} from '../../src/teacher/engine/sim';
import {
  newSave, normalizeSave, advancePeriod, powerupFlag, rest, recordCompletion, markTried, markShared, claimReward, toggleSaved,
} from '../../src/teacher/engine/save';
import { allSlots, applyClaim, slotState, termComplete } from '../../src/teacher/engine/termPass';
import { buy, place, unplace, grant, isSellable } from '../../src/teacher/engine/shop';
import { SHOP_FIXTURE } from '../../src/teacher/dev/shopFixture';
import { canUse, consume, rewind, withExtraTime, assist, secondLook, parentCallTargets, applicable, ASSIST_OUTCOME } from '../../src/teacher/engine/powerups';
import { validateAdventure } from '../../src/teacher/engine/validate';
import { pickWeighted, seeded, triggerEvent, activeTargets, meets, startEncounter, profileOf, revealClue, cluesReady, offeredChoices, awardXp, checkPuzzle, resolveEnding } from '../../src/teacher/engine/mission';
import type { Stage } from '../../src/teacher/types';
import { FIXTURE_ADVENTURES, FIXTURE_RESOURCES } from './fixture-a1';
import { FIXTURE_ADVENTURES as MISSIONS, FIXTURE_RESOURCES as NCLE } from '../../src/teacher/dev/fixture';
import { TERM_PASS_FIXTURE } from '../../src/teacher/dev/termPassFixture';

const A = FIXTURE_ADVENTURES[0];
const STAGES = TERM_PASS_FIXTURE.stages.length;
let n = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); n++; console.log('  ok  ' + name); } catch (e) { console.error('  FAIL ' + name); throw e; }
};

test('fixture content validates (only the not-yet-written a2 unlock)', () => {
  const errs = validateAdventure(A, FIXTURE_RESOURCES.map((r) => r.id), FIXTURE_ADVENTURES.map((a) => a.id));
  assert.deepEqual(errs, ['[a1] unlocks a2 (not written yet)']);
});

test('scheduling: lesson opens on the first scheduled minute; events go live by minute', () => {
  const s = createSim(A);
  assert.equal(s.t, 3);
  assert.deepEqual(liveEvents(s), ['sara']);
  assert.deepEqual(nextPending(s, A), { event: 'ahmed', at: 6 });
  const s2 = runToNext(s, A);
  assert.equal(s2.t, 6);
  assert.deepEqual(liveEvents(s2), ['sara', 'ahmed']);
});

test('minute costs add up; effects clamp 0–3', () => {
  let s = createSim(A);
  const r = choose(s, A, 'sara', 0); // Need help, 5 min, no peek → ready (+2u +1e)
  assert.equal(r.sim.t, 8);
  assert.deepEqual(r.sim.students.sara, [2, 3]);
  s = r.sim;
  const r2 = choose(s, A, 'enrich', 0); // not live yet, but engine allows by id; +1u +1e
  assert.deepEqual(r2.sim.students.sara, [3, 3]);
});

test('flag-conditional outcome: peek at Sara first → misconception', () => {
  const s0 = createSim(A);
  const p = peek(s0, A, 'sara');
  assert.ok(p.seen);
  assert.equal(peek(p.sim, A, 'sara').seen, false, 'peek only once');
  const r = choose(p.sim, A, 'sara', 0);
  assert.equal(r.outcome.id, 'misconception');
  assert.ok(r.sim.flags.mis);
  const choice = findEvent(A, 'sara')!.choices[0];
  assert.equal(resolveOutcomeId(choice, {}), 'ready');
  assert.equal(resolveOutcomeId(choice, { peekedSara: true }), 'misconception');
  assert.equal(resolveOutcomeId({ ...choice, outcome: [{ ifFlag: 'x', outcome: 'a' }, { ifFlag: 'y', outcome: 'b' }] }, {}), 'b', 'last is default');
});

test('follow-ups queue at now + after, once', () => {
  const r = choose(createSim(A), A, 'sara', 2); // Move on, 0 min → persists → intervene after 9
  assert.equal(r.opened, 'intervene');
  assert.deepEqual(r.sim.queue.find((q) => q.event === 'intervene'), { event: 'intervene', at: 12 });
  assert.equal(r.discovered, undefined);
});

test('resource discovered once per lesson', () => {
  let s = runToNext(runToNext(createSim(A), A), A); // t=9: sara, ahmed, omar live
  const r1 = choose(s, A, 'ahmed', 1); // roles
  assert.equal(r1.discovered, 'roles');
  s = r1.sim;
  const r2 = choose(s, A, 'omar', 0); // roles again
  assert.equal(r2.discovered, undefined);
  assert.deepEqual(r2.sim.found, ['roles']);
});

test('lesson end + unresolved events', () => {
  let s = createSim(A);
  s = choose(s, A, 'sara', 1).sim;  // see why → targeted at t+2
  assert.equal(isLessonOver(s, A), false);
  s = { ...s, t: A.lessonMinutes };
  assert.ok(isLessonOver(s, A));
  assert.deepEqual(unresolvedEvents(s, A).sort(), ['ahmed', 'omar', 'tablet', 'targeted'].sort());
  // Empty queue also ends the lesson
  let e = createSim(A);
  for (const id of ['sara', 'ahmed', 'omar', 'tablet']) e = choose({ ...e, t: 30 }, A, id, id === 'sara' ? 2 : 0).sim;
  e = choose({ ...e, t: 30 }, A, 'intervene', 0).sim;
  e = { ...e, t: 30 };
  assert.ok(isLessonOver(e, A));
  assert.deepEqual(unresolvedEvents(e, A), []);
  assert.equal(runToNext(e, A).t, A.lessonMinutes);
});

test('badge rule order: all-good beats flag beats always', () => {
  const s = createSim(A);
  assert.equal(pickBadge(A, s)!.id, 'first-lesson');
  assert.equal(pickBadge(A, { ...s, flags: { mis: true } })!.id, 'misconception-hunter');
  const allGood = { ...s, flags: { mis: true }, students: { sara: [3, 3], ahmed: [3, 2], omar: [2, 3] } as Record<string, [number, number]> };
  assert.equal(pickBadge(A, allGood)!.id, 'every-learner');
  assert.equal(band([2, 3]), 'good'); assert.equal(band([1, 2]), 'mixed'); assert.equal(band([1, 1]), 'poor');
});

test('teaser by flag; rail step; path encoding', () => {
  assert.equal(teaserEntry(A, { omarIn: true }).ifFlag, 'omarIn');
  assert.equal(teaserEntry(A, {}).ifFlag, undefined);
  assert.equal(railStepFor(findEvent(A, 'tablet')!), 3);
  assert.equal(railStepFor(findEvent(A, 'sara')!), 1);
  const p = [{ event: 'sara', choice: 1, outcome: 'misconception' }];
  assert.deepEqual(decodePath(encodePath(p)), p);
});

test('day rhythm: periods, new day restores, rest', () => {
  let s = newSave('a1');
  s = advancePeriod(s); assert.equal(s.period, 'midday');
  s = advancePeriod({ ...s, energy: 0 }); assert.equal(s.period, 'afternoon');
  s = advancePeriod(s); assert.deepEqual([s.day, s.period, s.energy], [2, 'morning', 3]);
  assert.equal(rest(s), s, 'full energy: rest is a no-op');
  const r = rest({ ...s, energy: 1 }); assert.deepEqual([r.energy, r.period], [3, 'midday']);
});

test('normalizeSave: corrupt/unknown version → fresh; partial → filled', () => {
  assert.deepEqual(normalizeSave('junk', 'a1'), newSave('a1'));
  assert.deepEqual(normalizeSave({ version: 7 }, 'a1'), newSave('a1'));
  const s = normalizeSave({ version: 1, day: 4, period: 'nope', energy: 9, pass: { stage: 2 } }, 'a1');
  assert.deepEqual([s.day, s.period, s.energy, s.pass.stage, s.pass.claimed.length, s.unlocked[0]], [4, 'morning', 3, 2, 0, 'a1']);
});

test('completion: notebook, toolkit, unlock, runs, energy, period, Term Pass +1', () => {
  let sim = createSim(A);
  sim = choose(sim, A, 'sara', 1).sim;
  const r = recordCompletion(newSave('a1'), A, sim, 'misconception-hunter', STAGES);
  assert.ok(r.firstTime);
  assert.equal(r.stagesGained, 1);
  const s = r.save;
  assert.deepEqual([s.energy, s.period, s.runs.a1, s.pass.stage], [2, 'midday', 1, 1]);
  assert.deepEqual(s.toolkit, ['explain']);
  assert.ok(s.unlocked.includes('a2'));
  assert.deepEqual(s.completed.a1.path, ['sara:1:misconception']);
  assert.ok(s.flags.mis);
  // Same path replay: no stage
  const same = recordCompletion(s, A, sim, 'misconception-hunter', STAGES);
  assert.equal(same.stagesGained, 0);
  // Different path replay: +1 once
  const other = choose(createSim(A), A, 'sara', 2).sim;
  const d1 = recordCompletion(same.save, A, other, 'first-lesson', STAGES);
  assert.equal(d1.stagesGained, 1);
  const other2 = choose(createSim(A), A, 'ahmed', 0).sim;
  const d2 = recordCompletion(d1.save, A, other2, 'first-lesson', STAGES);
  assert.equal(d2.stagesGained, 0, 'replay credit once per adventure');
  assert.equal(d2.save.runs.a1, 4);
});

test('Try it Monday: saved toggle; tried max one stage per day; share once per adventure', () => {
  let s = newSave('a1');
  s = toggleSaved(s, 'roles'); assert.deepEqual(s.saved, ['roles']);
  assert.deepEqual(toggleSaved(s, 'roles').saved, []);
  const t1 = markTried(s, 'roles', STAGES); assert.ok(t1.credited);
  const t2 = markTried(t1.save, 'game', STAGES); assert.equal(t2.credited, false, 'same day');
  assert.equal(t2.save.pass.stage, 1);
  const t3 = markTried({ ...t2.save, day: 2 }, 'offline', STAGES); assert.ok(t3.credited);
  assert.equal(markTried(t3.save, 'roles', STAGES).credited, false, 'already tried');
  const sh = markShared(t3.save, 'a1', STAGES); assert.ok(sh.credited);
  assert.equal(markShared(sh.save, 'a1', STAGES).credited, false);
  // Never past the last stage
  let full = { ...sh.save, pass: { ...sh.save.pass, stage: STAGES } };
  full = markShared(full, 'a9', STAGES).save; assert.equal(full.pass.stage, STAGES);
});

const deps = {
  resourceExists: (id: string) => NCLE.some((r) => r.id === id),
  shopItem: (id: string) => SHOP_FIXTURE.find((i) => i.id === id),
};

test('Term Pass claims: locked until reached, idempotent, effects', () => {
  const slots = allSlots(TERM_PASS_FIXTURE);
  let s = newSave('a1');
  const s1 = slots.find((x) => x.stage === 1)!;
  assert.equal(slotState(s, s1), 'locked');
  assert.equal(claimReward(s, s1.reward.id, 1), s, 'not reached');
  s = { ...s, pass: { ...s.pass, stage: 4 } };
  assert.equal(slotState(s, s1), 'ready');
  const res = slots.find((x) => x.reward.kind === 'resource')!;
  s = applyClaim(s, res, deps);
  assert.ok(s.toolkit.includes('exit-ticket'));
  assert.equal(slotState(s, res), 'claimed');
  assert.equal(applyClaim(s, res, deps), s, 'idempotent');
  for (const x of slots.filter((x) => x.stage <= 4)) s = applyClaim(s, x, deps);
  assert.equal(s.notes, 18, 'stage-2 + stage-4 notes rewards');
  assert.deepEqual([...s.owned].sort(), ['decor-plant', 'decor-wall']);
  assert.deepEqual(s.placed, { window: 'decor-plant', wall: 'decor-wall' });
  assert.equal(termComplete(s, TERM_PASS_FIXTURE), false);
  const cert = slots[slots.length - 1];
  assert.equal(slotState(s, cert), 'locked');
  s = { ...s, pass: { ...s.pass, stage: STAGES } };
  assert.equal(slotState(s, cert), 'ready');
  s = applyClaim(s, cert, deps);
  assert.equal(s.notes, 34, 'end-of-term bundle');
});

test('Shop: buy needs notes, owned once, place/unplace, guardrail', () => {
  const lamp = SHOP_FIXTURE.find((i) => i.id === 'decor-lamp')!;
  let s = newSave('a1');
  assert.deepEqual(buy(s, lamp), { ok: false, reason: 'short' });
  s = { ...s, notes: 3 };
  const r = buy(s, lamp);
  assert.ok(r.ok);
  if (!r.ok) return;
  s = r.save;
  assert.equal(s.notes, 1);
  assert.deepEqual(buy({ ...s, notes: 99 }, lamp), { ok: false, reason: 'owned' });
  s = place(s, lamp); assert.equal(s.placed.window, 'decor-lamp');
  s = unplace(s, lamp); assert.equal(s.placed.window, undefined);
  const plant = SHOP_FIXTURE.find((i) => i.id === 'decor-plant')!;
  assert.equal(place(s, plant), s, 'cannot place what you do not own');
  s = grant(place(s, lamp), plant); assert.equal(s.placed.window, 'decor-lamp', 'grant keeps a filled slot');
  const sneaky = { ...lamp, id: 'x', kind: 'resource' } as unknown as typeof lamp;
  assert.equal(isSellable(sneaky), false);
  assert.deepEqual(buy({ ...s, notes: 99 }, sneaky), { ok: false, reason: 'not-for-sale' });
  assert.ok(SHOP_FIXTURE.every(isSellable), 'fixture sells only outfits/accessories/power-ups');
  // Power-ups are consumables: buy twice → 2 held
  const pu = SHOP_FIXTURE.find((i) => i.id === 'pu-rewind')!;
  let p = { ...newSave('a1'), notes: 4 };
  for (let i = 0; i < 2; i++) { const b = buy(p, pu); assert.ok(b.ok); if (b.ok) p = b.save; }
  assert.deepEqual([p.notes, p.powerups.rewind], [0, 2]);
});

test('Shop balance: a full term buys most cosmetics + a handful of power-ups, never everything', () => {
  const totalNotes = allSlots(TERM_PASS_FIXTURE).reduce((n, x) => n + (x.reward.amount ?? 0), 0);
  const cosmetics = SHOP_FIXTURE.filter((i) => i.kind !== 'powerup').reduce((n, i) => n + i.price, 0);
  assert.equal(totalNotes, 44);
  assert.ok(totalNotes < cosmetics + 5 * 2, 'cannot buy everything');
  assert.ok(totalNotes >= cosmetics * 0.75 + 3 * 2, 'most cosmetics + 3 power-ups');
  for (const r of allSlots(TERM_PASS_FIXTURE)) if (r.reward.kind === 'decor' || r.reward.kind === 'outfit') assert.ok(SHOP_FIXTURE.some((i) => i.id === r.reward.ref), r.reward.id);
});

test('Power-ups: rewind, extra time, assistant, second look, parent call, once each', () => {
  let s = { ...newSave('a1'), powerups: { rewind: 1, assistant: 2 } };
  assert.ok(canUse(s, [], 'rewind'));
  assert.equal(canUse(s, ['rewind'], 'rewind'), false, 'once per adventure');
  assert.equal(canUse(s, [], 'extra5'), false, 'not owned');
  s = consume(s, 'rewind'); assert.equal(s.powerups.rewind, 0);
  // Rewind: back to before the last choice, undone outcome kept
  const s0 = createSim(A);
  const r1 = choose(s0, A, 'sara', 2).sim; // persists
  const rw = rewind([s0], r1)!;
  assert.equal(rw.sim.t, s0.t);
  assert.deepEqual(rw.sim.path, []);
  assert.deepEqual(rw.sim.rewound, ['persists']);
  assert.equal(rewind([], s0), null);
  const after = choose(rw.sim, A, 'sara', 1).sim; // misconception
  assert.deepEqual(after.rewound, ['persists'], 'kept through later choices');
  const rec = recordCompletion(newSave('a1'), A, after, 'first-lesson', STAGES).save;
  assert.deepEqual(rec.seenOutcomes.a1.sort(), ['misconception', 'persists']);
  // Extra time
  assert.equal(withExtraTime(A).lessonMinutes, A.lessonMinutes + 5);
  assert.equal(A.lessonMinutes, 40, 'content untouched');
  // Assistant: only for a live unexpected event, neutral, 0 minutes
  assert.equal(assist(s0, A), null);
  const at22 = { ...s0, t: 22 };
  const a = assist(at22, A)!;
  assert.equal(a.event, 'tablet');
  assert.equal(a.sim.t, 22);
  assert.deepEqual(a.sim.students, at22.students);
  assert.deepEqual(a.sim.path.at(-1), { event: 'tablet', choice: -1, outcome: ASSIST_OUTCOME });
  const rec2 = recordCompletion(newSave('a1'), A, a.sim, 'first-lesson', STAGES).save;
  assert.deepEqual(rec2.seenOutcomes.a1, [], 'synthetic outcome is not a branch');
  // Second look: sets the peek flag → Sara's support resolves to misconception
  const sl = secondLook(s0, A)!;
  assert.equal(sl.student.id, 'sara');
  assert.ok(sl.sim.flags.peekedSara);
  assert.equal(secondLook(sl.sim, A), null);
  // Parent call hidden until content adds homeNote
  assert.equal(parentCallTargets(A).length, 0);
  const withHome = { ...A, students: A.students.map((x, i) => (i === 2 ? { ...x, homeNote: { en: 'h', ar: 'h' } } : x)) };
  assert.equal(parentCallTargets(withHome)[0].id, 'omar');
  const ctx = { sim: s0, adv: A, history: [] as typeof s0[], activeEvent: null };
  assert.equal(applicable('parent-call', { ...ctx, phase: 'watch' }), false);
  assert.equal(applicable('parent-call', { ...ctx, adv: withHome, phase: 'watch' }), true);
  assert.equal(applicable('rewind', { ...ctx, phase: 'result' }), false);
  assert.equal(applicable('assistant', { ...ctx, sim: at22, phase: 'sim' }), true);
  // Rewind waits on the debrief; Extra 5 only in the last 10 minutes
  assert.equal(applicable('rewind', { ...ctx, history: [s0], phase: 'result', resultShownMs: 200 }), false, 'debrief first');
  assert.equal(applicable('rewind', { ...ctx, history: [s0], phase: 'result', resultShownMs: 1600 }), true);
  assert.equal(applicable('extra5', { ...ctx, phase: 'sim' }), false);
  assert.equal(applicable('extra5', { ...ctx, sim: { ...s0, t: 31 }, phase: 'sim' }), true);
  // Notebook mark
  const marked = recordCompletion(newSave('a1'), A, a.sim, 'first-lesson', STAGES, true).save;
  assert.equal(marked.flags[powerupFlag('a1')], true);
});

/* ---------------- Mission mechanics (Alef proposal) ---------------- */
const M = MISSIONS[0];

test('mission fixture validates (only missions not written yet)', () => {
  const errs = validateAdventure(M, NCLE.map((r) => r.id), MISSIONS.map((a) => a.id));
  assert.ok(errs.length > 0 && errs.every((e) => /not written yet/.test(e)), errs.join('\n'));
});

test('weighted pick: normalised, zero weights never win, deterministic with a seed', () => {
  const items = [{ id: 'a', w: 1 }, { id: 'b', w: 3 }, { id: 'z', w: 0 }];
  assert.equal(pickWeighted(items, (x) => x.w, () => 0)!.id, 'a');
  assert.equal(pickWeighted(items, (x) => x.w, () => 0.3)!.id, 'b');
  assert.equal(pickWeighted(items, (x) => x.w, () => 0.9999)!.id, 'b');
  assert.equal(pickWeighted([], () => 1, () => 0), undefined);
  const r = seeded(7); const counts: Record<string, number> = { a: 0, b: 0, z: 0 };
  for (let i = 0; i < 4000; i++) counts[pickWeighted(items, (x) => x.w, r)!.id]++;
  assert.equal(counts.z, 0);
  assert.ok(counts.b / counts.a > 2.5 && counts.b / counts.a < 3.5, JSON.stringify(counts));
  assert.equal(seeded(1)(), seeded(1)(), 'same seed, same draw');
});

test('trigger: eligibility filters; none eligible → undefined (back to exploration)', () => {
  let s = createSim(M);
  assert.equal(s.t, 0);
  assert.equal(triggerEvent(s, M, () => 0, 'omar')!.id, 'omar-inv', 'follow-up not eligible yet');
  assert.ok(!activeTargets(s, M).includes('nobody'));
  s = { ...s, done: ['omar-inv'] };
  assert.equal(triggerEvent(s, M, () => 0, 'omar'), undefined);
  s = { ...s, flags: { ...s.flags, omarSpoke: true } };
  assert.equal(triggerEvent(s, M, () => 0, 'omar')!.id, 'omar-mis');
  assert.equal(meets({ flags: ['a'], notFlags: ['b'] }, { a: true }), true);
  assert.equal(meets({ flags: ['a'], notFlags: ['b'] }, { a: true, b: true }), false);
});

test('investigation: profile picked once by weight and fixed; clues; choices filtered by ifFlag', () => {
  const ev = M.events.find((e) => e.id === 'sara-inv')!;
  let s = startEncounter(createSim(M), ev, () => 0.1); // 60/40 → prereq
  assert.equal(profileOf(s, ev)!.id, 'prereq');
  assert.ok(s.flags['sara:prereq']);
  const again = startEncounter(s, ev, () => 0.99);
  assert.equal(profileOf(again, ev)!.id, 'prereq', 'stays fixed');
  assert.equal(cluesReady(s, ev), false);
  s = revealClue(revealClue(s, ev.id, 'notebook'), ev.id, 'notebook');
  assert.deepEqual(s.clues!['sara-inv'], ['notebook']);
  s = revealClue(s, ev.id, 'bubble');
  assert.ok(cluesReady(s, ev), 'minClues 2');
  const offered = offeredChoices(ev, s.flags).map((c) => c.index);
  assert.deepEqual(offered, [0, 2]);
  const s2 = startEncounter(createSim(M), ev, () => 0.9);
  assert.deepEqual(offeredChoices(ev, s2.flags).map((c) => c.index), [1, 2]);
  // every profile's clues agree with one story: all clue ids have text
  for (const pr of ev.investigate!.profiles) for (const c of ev.investigate!.clues) assert.ok(pr.clues[c.id].en.length > 0);
});

test('outcome: discover + XP once per meaningful action (this run and across runs)', () => {
  let s = createSim(M);
  const r = choose(s, M, 'board-ev', 0);
  assert.equal(r.discovered, 'present');
  assert.equal(r.xpGained, 30);
  s = r.sim;
  const again = choose({ ...s, done: [] }, M, 'board-ev', 0);
  assert.equal(again.xpGained, 0, 'same outcome, same run');
  const later = choose(createSim(M), M, 'board-ev', 0, ['m1:boardPresent']);
  assert.equal(later.xpGained, 0, 'already rewarded in an earlier run');
  assert.equal(awardXp(s, 'm1:puzzle:laptop', 100, []).xp, 130);
  assert.equal(awardXp(awardXp(s, 'k', 100, []), 'k', 100, []).xp, 130);
  const rec = recordCompletion(newSave('m1'), M, s, 'first-five', STAGES, false, ['m2']).save;
  assert.equal(rec.xp, 30);
  assert.deepEqual(rec.rewarded, ['m1:boardPresent']);
  assert.ok(rec.unlocked.includes('m2'), 'ending opens a mission');
  assert.ok(rec.toolkit.includes('present'));
});

test('puzzle: cards may belong to several stages; complete only when all placed well', () => {
  const p = M.puzzle!;
  assert.deepEqual(checkPuzzle(p, {}).unplaced.length, p.cards.length);
  const good: Record<string, Stage> = { intention: 'launch', prior: 'extend', model: 'facilitate', teams: 'facilitate', explain: 'extend', exit: 'extend' };
  assert.ok(checkPuzzle(p, good).complete);
  assert.ok(checkPuzzle(p, { ...good, prior: 'launch', explain: 'facilitate' }).complete, 'other valid stages');
  const bad = checkPuzzle(p, { ...good, exit: 'launch' });
  assert.deepEqual([bad.complete, bad.misplaced], [false, ['exit']]);
});

test('endings: eligible by flags, most relevant (lowest priority) first, others offered', () => {
  assert.deepEqual(resolveEnding(M, {}).primary, undefined);
  const e1 = resolveEnding(M, { readinessChecked: true, peerContribution: true, needUnresolved: true });
  assert.equal(e1.primary!.id, 'unfinished');
  assert.deepEqual(e1.others.map((e) => e.id), ['opportunity', 'ready']);
  assert.equal(resolveEnding(M, { readinessChecked: true }).primary!.id, 'ready');
});

console.log(`\nteacher engine: ${n} tests passed`);
