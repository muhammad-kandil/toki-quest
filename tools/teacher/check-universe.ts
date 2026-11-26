/**
 * Universe validator (GAME_PACKAGE.md). Called from check-content.ts.
 *
 * Static: all 16 scenarios + 6 random events exist; pools total 100 and only
 * name real codes; reconvergence on F03/E01/E05; every hotspot opens an event;
 * interaction data is consistent (answers reference real cards, orders list
 * every card once, patterns partition the cards, hint ladders have steps);
 * evidence profiles are coherent; every profile leaves ≥2 choices; flags and
 * needs read are set/opened somewhere; endings ordered as the package says;
 * no fixed-ability labels; tool status covers every tool; OPEN-04 verbatim.
 *
 * Dynamic: a model of the engine plays chains of sessions (persistent needs,
 * student variables and cooldowns; per-session flags) with a seeded PRNG.
 * Every scenario, random event, outcome and ending must be reached; every
 * session must end with an eligible ending; the package's two example seed
 * paths must be playable (forced draws, eligibility respected).
 */
import type { AlefResource, Universe } from '../../src/teacher/types';
import type { UScenario, UEnding, UArcStep, UEvent, UOutcome, UCondition } from '../../src/teacher/data/universe/kit';
import { NEEDS } from '../../src/teacher/data/universe/kit';

type Log = (m: string) => void;
const CODES = ['L01', 'L02', 'L03', 'L04', 'L05', 'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'E01', 'E02', 'E03', 'E04', 'E05', 'R01', 'R02', 'R03', 'R04', 'R05', 'R06'];
const INTERACTIONS = ['investigate', 'compare', 'match', 'sort', 'order', 'hint', 'pattern', 'plan'];
const BANNED = /\b(low|high|weak|strong|top|bottom)[- ](ability|group|set|students?|learners?)\b|\bslow learner|\bstruggler/i;
const AR = /[؀-ۿ]/;

export function checkUniverse(U: Universe, resources: AlefResource[], status: Record<string, unknown>, err: Log, warn: Log) {
  const S = U.scenarios as unknown as UScenario[];
  const byCode = new Map(S.map((s) => [s.code, s]));
  const resIds = new Set(resources.map((r) => r.id));
  const needs = new Set<string>(NEEDS);
  const P = 'universe';

  /* ---------------- texts ---------------- */
  const walk = (node: unknown, path: string) => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (node && typeof node === 'object') {
      const o = node as Record<string, unknown>;
      if ('en' in o && 'ar' in o && Object.keys(o).length === 2) {
        const en = String(o.en).trim();
        const ar = String(o.ar).trim();
        if (!en || !ar) err(`${path}: empty en/ar`);
        if (ar && !AR.test(ar)) err(`${path}: ar has no Arabic`);
        if (AR.test(en)) err(`${path}: en contains Arabic`);
        if (BANNED.test(en)) err(`${path}: ability label in "${en}"`);
        return;
      }
      for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`);
    }
  };
  walk(U, P);

  /* ---------------- structure ---------------- */
  for (const c of CODES) if (!byCode.has(c)) err(`${P}: missing ${c}`);
  if (S.length !== byCode.size) err(`${P}: duplicate scenario codes`);
  for (const s of S) {
    if (s.id !== s.code) err(`${s.code}: id must equal code`);
    if ((s.kind === 'random') !== s.code.startsWith('R')) err(`${s.code}: kind ${s.kind} doesn't match code`);
    const wantReconverge = ['F03', 'E01', 'E05'].includes(s.code);
    if (!!s.reconverge !== wantReconverge) err(`${s.code}: reconverge should be ${wantReconverge}`);
    for (const d of s.discovers ?? []) if (!resIds.has(d)) err(`${s.code}: discovers unknown ${d}`);
  }
  if (!byCode.has(U.entry)) err(`${P}: entry ${U.entry} missing`);
  for (const pool of U.pools) {
    const total = pool.entries.reduce((n, e) => n + e.weight, 0);
    if (total !== 100) err(`pool ${pool.id}: weights total ${total} (want 100)`);
    const codes = pool.entries.map((e) => e.code);
    if (new Set(codes).size !== codes.length) err(`pool ${pool.id}: duplicate code`);
    for (const c of codes) if (!byCode.has(c)) err(`pool ${pool.id}: unknown ${c}`);
  }
  const pooled = new Set(U.pools.flatMap((p) => p.entries.map((e) => e.code)));
  const triggered = new Set(S.flatMap((s) => s.outcomes.map((o) => o.triggers).filter(Boolean) as string[]));
  for (const s of S) if (s.code !== U.entry && !pooled.has(s.code) && !triggered.has(s.code)) err(`${s.code}: not in any pool and nothing triggers it`);
  for (const t of triggered) if (!byCode.has(t)) err(`${P}: trigger of unknown ${t}`);
  for (const a of U.arc as UArcStep[]) {
    if (!U.pools.some((p) => p.id === a.pool)) err(`arc: unknown pool ${a.pool}`);
    for (const c of a.endsOn ?? []) if (!byCode.get(c)?.reconverge) err(`arc: endsOn ${c} is not a reconvergence node`);
  }
  const open = U.opening.map((o) => o.id);
  for (const id of ['OPEN-01', 'OPEN-02', 'OPEN-03', 'OPEN-04', 'OPEN-05']) if (!open.includes(id)) err(`opening: missing ${id}`);
  const o4 = U.opening.find((o) => o.id === 'OPEN-04');
  if (o4?.narration?.en !== 'Five minutes before we begin. Where should I start?' || o4?.narration?.ar !== 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟') err('opening: OPEN-04 must be verbatim');
  if (U.students.map((s) => s.id).join() !== 'ahmed,sara,omar') err(`${P}: students must be ahmed, sara, omar`);
  for (const st of U.students) for (const v of Object.values(st.start)) if (v < 0 || v > 3) err(`${st.id}: start var out of 0–3`);
  for (const r of resources) if (!status[r.id]) err(`TOOL_STATUS: missing ${r.id}`);

  /* ---------------- flags set / needs opened ---------------- */
  const flagsSet = new Set<string>();
  const needsOpened = new Set<string>();
  const needsClosed = new Set<string>();
  for (const s of S) {
    s.outcomes.forEach((o) => {
      if (o.setFlag) flagsSet.add(o.setFlag);
      o.opensNeeds?.forEach((n) => needsOpened.add(n));
      o.closesNeeds?.forEach((n) => needsClosed.add(n));
    });
    s.events.forEach((e) => e.investigate?.profiles.forEach((p) => flagsSet.add(p.setFlag)));
    s.opensNeeds?.forEach((n) => needsOpened.add(n));
    s.closesNeeds?.forEach((n) => needsClosed.add(n));
  }
  for (const n of needs) {
    if (!needsOpened.has(n)) err(`need ${n}: nothing opens it`);
    if (!needsClosed.has(n)) err(`need ${n}: nothing closes it (unrecoverable)`);
  }
  const flag = (f: string, where: string) => !flagsSet.has(f) && err(`${where}: reads flag "${f}" that nothing sets`);
  const cond = (c: UCondition | undefined, where: string) => {
    if (!c) return;
    [...(c.flags ?? []), ...(c.anyFlags ?? []), ...(c.notFlags ?? [])].forEach((f) => flag(f, where));
    [...(c.unresolved ?? []), ...(c.resolved ?? []), ...(c.anyUnresolved ?? [])].forEach((n) => !needs.has(n) && err(`${where}: unknown need ${n}`));
    [...(c.visited ?? []), ...(c.notVisited ?? [])].forEach((v) => !byCode.has(v) && err(`${where}: unknown scenario ${v}`));
    c.student?.forEach((x) => !U.students.some((s) => s.id === x.id) && err(`${where}: unknown student ${x.id}`));
  };

  /* ---------------- per scenario ---------------- */
  const used = new Set<string>();
  for (const s of S) {
    const C = s.code;
    cond(s.requires, `${C} requires`);
    const targets = new Set([...s.students.map((x) => x.id), ...s.objects.map((x) => x.id)]);
    const evIds = new Set(s.events.map((e) => e.id));
    const outIds = new Set(s.outcomes.map((o) => o.id));
    const nextT = new Set(s.outcomes.filter((o) => o.next).map((o) => o.next!.event));
    if (C === U.entry) for (const t of targets) if (!s.events.some((e) => e.on === t && !nextT.has(e.id))) err(`${C}: hotspot ${t} opens no event`);
    if (!s.events.some((e) => !nextT.has(e.id))) err(`${C}: no opening event`);
    const nonMcq = s.events.some((e) => (e as UEvent).interaction || e.investigate);
    if (!nonMcq && s.kind === 'scenario') err(`${C}: no non-MCQ interaction`);
    for (const e of s.events as UEvent[]) {
      const E = `${C}.${e.id}`;
      if (!targets.has(e.on)) err(`${E}: on unknown ${e.on}`);
      if (e.interaction) {
        used.add(e.interaction);
        if (!INTERACTIONS.includes(e.interaction)) err(`${E}: unknown interaction ${e.interaction}`);
      }
      if (e.investigate) used.add('investigate');
      const k = e.task;
      const cardIds = new Set(k?.cards?.map((c) => c.id) ?? []);
      const targetIds = new Set(k?.targets?.map((c) => c.id) ?? []);
      switch (e.interaction) {
        case 'match':
        case 'sort':
          if (!k?.cards?.length || !k.targets?.length || !k.answer) err(`${E}: ${e.interaction} needs cards, targets, answer`);
          else for (const c of cardIds) if (!targetIds.has(k.answer[c])) err(`${E}: card ${c} has no valid answer`);
          break;
        case 'plan':
          if (!k?.cards?.length || !k.targets?.length || !k.answer) err(`${E}: plan needs cards, targets (slots), answer`);
          else for (const slot of targetIds) if (!cardIds.has(k.answer[slot])) err(`${E}: slot ${slot} has no valid card`);
          break;
        case 'order':
          if (!k?.order || k.order.length !== cardIds.size || new Set(k.order).size !== cardIds.size || k.order.some((c) => !cardIds.has(c))) err(`${E}: order must list every card once`);
          break;
        case 'pattern': {
          if (e.investigate) break;
          const inP = (k?.patterns ?? []).flatMap((p) => p.cards);
          if (!k?.patterns?.length || inP.length !== cardIds.size || new Set(inP).size !== cardIds.size || inP.some((c) => !cardIds.has(c))) err(`${E}: patterns must group every card exactly once`);
          break;
        }
        case 'hint':
          if ((k?.hints?.length ?? 0) < 2) err(`${E}: hint ladder needs ≥2 hints`);
          break;
        case 'compare':
          if (!e.investigate && (k?.cards?.length ?? 0) < 2) err(`${E}: compare needs ≥2 cards`);
          break;
      }
      if (e.interaction && !e.investigate && e.interaction !== 'compare' && !k?.note) warn(`${E}: no explanatory note after the interaction`);
      const profFlags = new Set<string>();
      if (e.investigate) {
        const clueIds = e.investigate.clues.map((c) => c.id).sort().join();
        for (const p of e.investigate.profiles) {
          if (Object.keys(p.clues).sort().join() !== clueIds) err(`${E}: profile ${p.id} is incoherent with the clues`);
          if (p.ifFlag) flag(p.ifFlag, `${E} profile ${p.id}`);
          profFlags.add(p.setFlag);
          const n = e.choices.filter((c) => !c.ifFlag || c.ifFlag === p.setFlag).length;
          if (n < 2) err(`${E}: profile ${p.id} leaves ${n} choice(s)`);
        }
      } else if (e.choices.filter((c) => !c.ifFlag).length < (s.objects.some((o) => o.id === e.on) && C === U.entry ? 1 : 2)) err(`${E}: fewer than 2 choices`);
      for (const c of e.choices) {
        if (c.ifFlag && !profFlags.has(c.ifFlag)) flag(c.ifFlag, `${E} choice`);
        if (c.ifUnresolved && !needs.has(c.ifUnresolved)) err(`${E}: unknown need ${c.ifUnresolved}`);
        const refs = typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome;
        refs.forEach((r) => {
          if (!outIds.has(r.outcome)) err(`${E}: unknown outcome ${r.outcome}`);
          if ('ifFlag' in r && r.ifFlag) flag(r.ifFlag, E);
        });
      }
    }
    for (const o of s.outcomes as UOutcome[]) {
      const O = `${C}.${o.id}`;
      if (o.next && !evIds.has(o.next.event)) err(`${O}: next unknown event`);
      if (o.discover && !resIds.has(o.discover)) err(`${O}: unknown tool ${o.discover}`);
      if (o.discover && !s.discovers?.includes(o.discover)) warn(`${O}: discovers ${o.discover} not listed in ${C}.discovers`);
      if (o.xp !== undefined && ![30, 50, 100].includes(o.xp)) err(`${O}: xp ${o.xp}`);
      [...(o.opensNeeds ?? []), ...(o.closesNeeds ?? [])].forEach((n) => !needs.has(n) && err(`${O}: unknown need ${n}`));
      o.studentDelta?.forEach((d) => !U.students.some((x) => x.id === d.id) && err(`${O}: unknown student ${d.id}`));
      o.effects.forEach((fx) => !s.students.some((x) => x.id === fx.student) && err(`${O}: effect on unknown ${fx.student}`));
    }
    if (s.puzzle && !outIds.has(s.puzzle.id)) err(`${C}: no outcome opens the puzzle`);
  }
  for (const i of INTERACTIONS) if (!used.has(i)) err(`${P}: interaction "${i}" is never used`);

  /* ---------------- endings ---------------- */
  const E = U.endings as UEnding[];
  for (const en of E) cond(en.when, `ending ${en.id}`);
  const pr = (id: string) => E.find((e) => e.id === id)?.priority ?? 99;
  for (const id of ['END-A', 'END-B', 'END-C', 'END-D']) if (!E.some((e) => e.id === id)) err(`endings: missing ${id}`);
  if (!(pr('END-B') < pr('END-D') && pr('END-D') < pr('END-C') && pr('END-D') < pr('END-A'))) err('endings: priority must be B first, then D strongest of the rest');
  if (!E.find((e) => e.id === 'END-B')?.when.anyUnresolved?.length) err('END-B must hold when any need is unresolved');
  if (!E.some((e) => Object.keys(e.when).length === 0)) err('endings: need an always-eligible fallback (no dead end)');

  /* ---------------- simulation ---------------- */
  simulate(U, S, byCode, err);
}

/* ======================================================================= */

type State = {
  unresolved: Set<string>;
  students: Record<string, Record<string, number>>;
  cooldowns: Map<string, number>;
};

function simulate(U: Universe, S: UScenario[], byCode: Map<string, UScenario>, err: Log) {
  let seed = 41029;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const pick = <T,>(xs: T[]) => xs[Math.floor(rnd() * xs.length)];
  const weighted = <T,>(xs: T[], w: (x: T) => number) => {
    const total = xs.reduce((n, x) => n + w(x), 0);
    let r = rnd() * total;
    for (const x of xs) if ((r -= w(x)) <= 0) return x;
    return xs[xs.length - 1];
  };
  let skilled = false;
  const reached = new Set<string>();
  const outcomes = new Set<string>();
  const endings = new Map<string, number>();
  const lengths: number[] = [];
  const paths: string[] = [];

  const holds = (c: UCondition | undefined, flags: Record<string, boolean>, visited: string[], st: State) => {
    if (!c) return true;
    if (c.flags && !c.flags.every((f) => flags[f])) return false;
    if (c.anyFlags && !c.anyFlags.some((f) => flags[f])) return false;
    if (c.notFlags && c.notFlags.some((f) => flags[f])) return false;
    if (c.visited && !c.visited.every((v) => visited.includes(v))) return false;
    if (c.notVisited && c.notVisited.some((v) => visited.includes(v))) return false;
    if (c.unresolved && !c.unresolved.every((n) => st.unresolved.has(n))) return false;
    if (c.resolved && c.resolved.some((n) => st.unresolved.has(n))) return false;
    if (c.anyUnresolved && !c.anyUnresolved.some((n) => st.unresolved.has(n))) return false;
    if (c.student && !c.student.every((x) => {
      const v = st.students[x.id][x.key];
      return (x.min === undefined || v >= x.min) && (x.max === undefined || v <= x.max);
    })) return false;
    return true;
  };
  const clamp = (v: number) => Math.max(0, Math.min(3, v));

  function play(s: UScenario, flags: Record<string, boolean>, st: State, visitedCodes: string[], hub: boolean): { budget: number; trigger?: string } {
    reached.add(s.code);
    const nextT = new Set(s.outcomes.filter((o) => o.next).map((o) => o.next!.event));
    const queue: UEvent[] = (s.events as UEvent[]).filter((e) => !nextT.has(e.id));
    let trigger: string | undefined;
    const studentIds = new Set(s.students.map((x) => x.id));
    for (let i = 0; i < queue.length; i++) {
      const e = queue[i];
      // in the hub, objects are optional
      if (hub && !studentIds.has(e.on) && rnd() < 0.3) continue;
      if (e.investigate) {
        const flagged = e.investigate.profiles.filter((p) => p.ifFlag && flags[p.ifFlag]);
        const plain = e.investigate.profiles.filter((p) => !p.ifFlag);
        const cand = flagged.length ? flagged : plain;
        if (!cand.length) {
          err(`${s.code}.${e.id}: no evidence profile fits the state (flags ${Object.keys(flags).join(' ')})`);
          continue;
        }
        flags[weighted(cand, (p) => p.weight).setFlag] = true;
      }
      const offered = e.choices.filter((c) => (!c.ifFlag || flags[c.ifFlag]) && (!c.ifUnresolved || st.unresolved.has(c.ifUnresolved)));
      if (!offered.length) {
        err(`${s.code}.${e.id}: no choice offered`);
        continue;
      }
      const resolve = (c: (typeof offered)[number]) => {
        const refs = typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome;
        const ref = refs.find((r) => !('ifFlag' in r) || !r.ifFlag || flags[r.ifFlag]) ?? refs[refs.length - 1];
        return s.outcomes.find((x) => x.id === ref.outcome)! as UOutcome;
      };
      const sound = offered.filter((c) => ['good', 'insight'].includes(resolve(c).tone));
      const c = skilled && sound.length ? pick(sound) : pick(offered);
      const o = resolve(c);
      outcomes.add(`${s.code}.${o.id}`);
      if (o.setFlag) flags[o.setFlag] = true;
      o.opensNeeds?.forEach((n) => st.unresolved.add(n));
      o.closesNeeds?.forEach((n) => st.unresolved.delete(n));
      o.studentDelta?.forEach((d) => (st.students[d.id][d.key] = clamp(st.students[d.id][d.key] + d.delta)));
      if (o.next) queue.push(s.events.find((x) => x.id === o.next!.event) as UEvent);
      if (o.triggers) trigger = o.triggers;
    }
    s.opensNeeds?.forEach((n) => st.unresolved.add(n));
    s.closesNeeds?.forEach((n) => st.unresolved.delete(n));
    s.studentDelta?.forEach((d) => (st.students[d.id][d.key] = clamp(st.students[d.id][d.key] + d.delta)));
    visitedCodes.push(s.code);
    return { budget: s.budgetDelta ?? 0, trigger };
  }

  /** One session. `force` = codes to force in order for the draws (QA override). */
  function session(st: State, force?: string[]): { path: string[]; ending: string } | null {
    const flags: Record<string, boolean> = {};
    const visited: string[] = [];
    play(byCode.get(U.entry)!, flags, st, visited, true);
    const forced = force ? [...force] : undefined;
    for (const step of U.arc as UArcStep[]) {
      const pool = U.pools.find((p) => p.id === step.pool)!;
      let left = step.draws;
      let randomUsed = false;
      for (let guard = 0; left > 0 && guard < 20; guard++) {
        const last = visited[visited.length - 1];
        const eligible = pool.entries.filter((en) => {
          const s = byCode.get(en.code)!;
          return (st.cooldowns.get(en.code) ?? 0) === 0 && en.code !== last && !(s.kind === 'random' && randomUsed) && holds(s.requires, flags, visited, st);
        });
        if (!eligible.length) break;
        let chosen;
        if (forced) {
          if (!forced.length) chosen = weighted(eligible, (x) => x.weight);
          else {
            chosen = eligible.find((x) => x.code === forced[0]);
            if (!chosen) {
              // forced code belongs to a later phase: end this phase
              if (!pool.entries.some((x) => x.code === forced[0])) break;
              return null;
            }
            forced.shift();
          }
        } else chosen = weighted(eligible, (x) => x.weight);
        const s = byCode.get(chosen.code)!;
        for (const [k, v] of st.cooldowns) st.cooldowns.set(k, Math.max(0, v - 1));
        const r = play(s, flags, st, visited, false);
        if (s.cooldown) st.cooldowns.set(s.code, s.cooldown);
        if (s.kind === 'random') randomUsed = true;
        else left--;
        left = Math.max(0, left + r.budget);
        if (r.trigger) {
          const t = byCode.get(r.trigger)!;
          if (holds(t.requires, flags, visited, st)) play(t, flags, st, visited, false);
        }
        if (step.endsOn?.includes(s.code)) break;
      }
    }
    if (forced && forced.length) return null;
    const el = (U.endings as UEnding[]).filter((e) => holds(e.when, flags, visited, st)).sort((a, b) => a.priority - b.priority);
    if (!el.length) {
      err(`universe: a session ended with no eligible ending (${visited.join(' ')})`);
      return { path: visited, ending: 'none' };
    }
    return { path: visited, ending: el[0].id };
  }

  const fresh = (): State => ({
    unresolved: new Set(),
    students: Object.fromEntries(U.students.map((s) => [s.id, { ...s.start }])),
    cooldowns: new Map(),
  });

  // a "sound-choice" player: picks good/insight outcomes when offered (design balance check)
  const soundEndings = new Map<string, number>();
  skilled = true;
  for (let c = 0; c < 2000; c++) {
    const st = fresh();
    const r = session(st)!;
    soundEndings.set(r.ending, (soundEndings.get(r.ending) ?? 0) + 1);
  }
  skilled = false;

  const CHAINS = 3000;
  const PER = 5;
  for (let c = 0; c < CHAINS; c++) {
    const st = fresh();
    for (let k = 0; k < PER; k++) {
      const r = session(st)!;
      endings.set(r.ending, (endings.get(r.ending) ?? 0) + 1);
      lengths.push(r.path.length);
      if (paths.length < 3) paths.push(`${r.path.join(' → ')} → ${r.ending}`);
    }
  }
  for (const s of S) {
    if (!reached.has(s.code)) err(`universe: ${s.code} never reached`);
    for (const o of s.outcomes) if (!outcomes.has(`${s.code}.${o.id}`)) err(`universe: outcome ${s.code}.${o.id} never reached`);
  }
  for (const e of U.endings) if (!endings.has(e.id)) err(`universe: ${e.id} never reached`);

  // the package's example seeds, as forced paths (eligibility respected)
  const examples: { force: string[]; ending: string; exact: boolean }[] = [
    { force: ['L03', 'R01', 'F01', 'F03', 'E01', 'E05'], ending: 'END-D', exact: true },
    { force: ['L04', 'F04', 'F05', 'R02', 'F03', 'E01'], ending: 'END-B', exact: false },
  ];
  for (const ex of examples) {
    let ok = false;
    for (let i = 0; i < 20000 && !ok; i++) {
      const st = fresh();
      const r = session(st, ex.force);
      if (!r) continue;
      const want = ['L01', ...ex.force];
      const prefix = r.path.slice(0, want.length).join() === want.join();
      const exact = !ex.exact || r.path.length === want.length;
      if (prefix && exact && r.ending === ex.ending) ok = true;
    }
    if (!ok) err(`universe: example path L01 → ${ex.force.join(' → ')}${ex.exact ? '' : ' …'} → ${ex.ending} is not playable`);
  }

  lengths.sort((a, b) => a - b);
  const total = CHAINS * PER;
  console.log(`  universe ${U.version}: ${S.length} scenarios · ${S.reduce((n, s) => n + s.outcomes.length, 0)} outcomes · session length ${lengths[0]}–${lengths[lengths.length - 1]} scenarios (median ${lengths[lengths.length >> 1]})`);
  console.log(`  endings, random choices, ${CHAINS} chains × ${PER} sessions: ${[...endings.entries()].sort().map(([k, v]) => `${k} ${Math.round((100 * v) / total)}%`).join(' · ')}`);
  console.log(`  endings, sound-choice player, first session: ${[...soundEndings.entries()].sort().map(([k, v]) => `${k} ${Math.round(v / 20)}%`).join(' · ')}`);
  console.log(`  example paths ok; sample: ${paths[0]}`);
}
