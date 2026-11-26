/**
 * QA helper: find a session seed whose first-session path contains given scenario codes.
 *   npx vite-node tools/teacher/find-seed.ts F04 F05 E05
 * Plays like the e2e: in the L01 hub only the students (objects are optional),
 * elsewhere every event in order, first offered choice, follow-ups included.
 */
import { newUniverseState, scenarioAdventure, scenarioFlags, scenarioRand, simulatePath, type ScenarioResult, type UState } from '../../src/teacher/engine/universe';
import { createSim, choose, findEvent } from '../../src/teacher/engine/sim';
import { offeredChoices, startEncounter } from '../../src/teacher/engine/mission';
import { getUniverse } from '../../src/teacher/content';
import type { Scenario } from '../../src/teacher/types';

const U = getUniverse();
const STUDENTS = new Set(U.students.map((s) => s.id));
const want = process.argv.slice(2);
const play = (sc: Scenario, s: UState): ScenarioResult => {
  const adv = scenarioAdventure(sc, s);
  let sim = createSim(adv, scenarioFlags(s));
  const rand = scenarioRand(s.seed, sc.code, s.visited.length);
  const outcomes: string[] = [];
  for (const q of adv.schedule) {
    let ev = findEvent(adv, q.event);
    if (sc.code === U.entry && ev && !STUDENTS.has(ev.on)) continue;
    for (let guard = 0; ev && guard < 5; guard++) {
      sim = startEncounter(sim, ev, rand);
      const o = offeredChoices(ev, sim.flags)[0];
      const r = choose(sim, adv, ev.id, o.index);
      sim = r.sim;
      if (!r.outcome) break;
      outcomes.push(r.outcome.id);
      ev = r.outcome.next?.event ? findEvent(adv, r.outcome.next.event) : undefined;
    }
  }
  const outcomeXp = Object.fromEntries(sc.outcomes.map((o) => [o.id, o.xp ?? 0]));
  return { outcomes, outcomeXp, found: sim.found, flags: sim.flags, students: sim.students, profiles: sim.profiles };
};
for (let seed = 1; seed < 20000; seed++) {
  const r = simulatePath(newUniverseState(U, 'qa', seed), U, play);
  if (want.every((c) => r.path.includes(c))) { console.log(seed, r.path.join(' → '), '→', r.ending); process.exit(0); }
}
console.log('no seed found');
