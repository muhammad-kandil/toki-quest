/**
 * QA helper: find a session seed whose path contains given scenario codes.
 *   npx vite-node tools/teacher/find-seed.ts L04 F02 R06
 * Plays automatically (first offered choice), like the e2e.
 */
import { newUniverseState, simulatePath, scenarioAdventure, scenarioRand, type ScenarioResult, type UState } from '../../src/teacher/engine/universe';
import { createSim, choose, findEvent } from '../../src/teacher/engine/sim';
import { offeredChoices, startEncounter } from '../../src/teacher/engine/mission';
import { getUniverse } from '../../src/teacher/content';
import type { Scenario } from '../../src/teacher/types';

const U = getUniverse();
const want = process.argv.slice(2);
const play = (sc: Scenario, s: UState): ScenarioResult => {
  const adv = scenarioAdventure(sc, s);
  let sim = createSim(adv, s.flags);
  const rand = scenarioRand(s.seed, sc.code, s.visited.length);
  const outcomes: string[] = [];
  for (const q of adv.schedule) {
    const ev = findEvent(adv, q.event)!;
    sim = startEncounter(sim, ev, rand);
    const o = offeredChoices(ev, sim.flags)[0];
    const r = choose(sim, adv, ev.id, o.index);
    sim = r.sim;
    outcomes.push(r.outcome.id);
  }
  return { outcomes, outcomeXp: {}, found: sim.found, flags: sim.flags, students: sim.students, profiles: sim.profiles };
};
for (let seed = 1; seed < 20000; seed++) {
  const r = simulatePath(newUniverseState(U, 'qa', seed), U, play);
  if (want.every((c) => r.path.includes(c))) { console.log(seed, r.path.join(' → '), '→', r.ending); process.exit(0); }
}
console.log('no seed found');
