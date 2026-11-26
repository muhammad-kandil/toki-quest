/**
 * Classroom universe engine (docs/product/GAME_PACKAGE.md). Pure functions.
 *
 * A session: opening → entry hub (L01) → for each arc step, draw scenarios
 * from that step's pool → ending. Draws are deterministic: the n-th draw of
 * a session uses a PRNG seeded from (session seed, n), so the same seed and
 * state always give the same path — and a resumed session draws the same
 * next scenario. Student variables, unresolved needs and history persist
 * across sessions.
 */
import type {
  Adventure, Phase, PoolId, Scenario, StudentVars, Universe, UniverseCondition, UniverseEnding, UniverseSave,
} from '../types';
import { pickWeighted, type Rand } from './mission';

/* ---------------- state ---------------- */

/**
 * UniverseSave + the few fields the engine needs that the contract does not
 * have yet (reported to the director): session flags, the arc pointer, and
 * whether a session is in progress.
 */
export interface UState extends UniverseSave {
  flags: Record<string, boolean>;
  arc: { step: number; drawn: number };
  inSession: boolean;
}

export const XP_EXPLORE = 10; // a genuinely new evidence path in a scenario already played
export const XP_TOOL = 50;    // first discovery of an NCLE tool
export const RECOVERY_CODE = 'R06';
/** R06 Second Chance weight multiplier while needs are unresolved (no unrecoverable state, still not guaranteed). */
export const RECOVERY_BOOST = 4;

/* ---------------- seeded PRNG ---------------- */

/** FNV-1a 32-bit. */
export function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

/** mulberry32. */
export function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Session seed = hash(session id + content version + session number). */
export const sessionSeed = (sessionId: string, contentVersion: string, session: number) =>
  hash32(`${sessionId}|${contentVersion}|${session}`);

/** The PRNG for the n-th draw of a session (independent of anything else drawn). */
export const drawRand = (seed: number, n: number): Rand => mulberry32((seed ^ Math.imul(n + 1, 0x9e3779b9)) >>> 0);

/** The PRNG for randomness inside one scenario (evidence profiles), stable for (seed, code, visit). */
export const scenarioRand = (seed: number, code: string, visit: number): Rand => mulberry32((seed ^ hash32(code + '#' + visit)) >>> 0);

/* ---------------- new / normalise ---------------- */

const clamp = (n: number) => Math.max(0, Math.min(3, Math.round(n)));

export function newUniverseState(u: Universe, key: string, seedOverride?: number): UState {
  const students: Record<string, StudentVars> = {};
  for (const s of u.students) students[s.id] = { ...s.start };
  return {
    contentVersion: u.version, key, seed: seedOverride ?? sessionSeed(key, u.version, 1), session: 1, phase: 'launch',
    visited: [], history: [], outcomes: {}, tools: [], unresolved: [], students, cooldowns: {}, xp: 0, rewarded: [], collectibles: [],
    flags: {}, arc: { step: 0, drawn: 0 }, inSession: false,
  };
}

/** Accept a stored state (any version) → a whole state for this universe. Unknown content version keeps progress, resets the session. */
export function normalizeUniverse(raw: unknown, u: Universe, key: string): UState {
  const base = newUniverseState(u, key);
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<UState>;
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const obj = <T,>(v: unknown): T => (v && typeof v === 'object' && !Array.isArray(v) ? v : {}) as T;
  const students: Record<string, StudentVars> = { ...base.students };
  for (const [id, v] of Object.entries(obj<Record<string, Partial<StudentVars>>>(r.students))) {
    if (!students[id]) continue;
    students[id] = {
      readiness: clamp(v.readiness ?? students[id].readiness), confidence: clamp(v.confidence ?? students[id].confidence),
      participation: clamp(v.participation ?? students[id].participation), understanding: clamp(v.understanding ?? students[id].understanding),
    };
  }
  const sameVersion = r.contentVersion === u.version;
  const s: UState = {
    ...base,
    key: typeof r.key === 'string' && r.key ? r.key : key,
    session: typeof r.session === 'number' && r.session >= 1 ? Math.floor(r.session) : 1,
    history: arr(r.history), outcomes: obj(r.outcomes), tools: arr(r.tools), unresolved: arr(r.unresolved),
    students, xp: typeof r.xp === 'number' && r.xp > 0 ? r.xp : 0, rewarded: arr(r.rewarded), collectibles: arr(r.collectibles),
    a11y: obj(r.a11y),
  };
  s.seed = typeof r.seed === 'number' ? r.seed >>> 0 : sessionSeed(s.key!, u.version, s.session);
  if (sameVersion && r.inSession) {
    // resume the session at its last safe point (between scenarios)
    s.inSession = true;
    s.visited = arr<string>(r.visited).filter((c) => u.scenarios.some((x) => x.code === c));
    s.flags = obj(r.flags);
    s.cooldowns = obj(r.cooldowns);
    s.arc = r.arc && typeof r.arc.step === 'number' ? r.arc : base.arc;
    s.phase = (['launch', 'facilitate', 'extend'] as Phase[]).includes(r.phase as Phase) ? (r.phase as Phase) : 'launch';
    s.resume = r.resume;
  }
  return s;
}

/* ---------------- conditions ---------------- */

export function meetsU(c: UniverseCondition | undefined, s: UState): boolean {
  if (!c) return true;
  if (c.flags && !c.flags.every((f) => s.flags[f])) return false;
  if (c.anyFlags && !c.anyFlags.some((f) => s.flags[f])) return false;
  if (c.notFlags && c.notFlags.some((f) => s.flags[f])) return false;
  if (c.visited && !c.visited.every((v) => s.visited.includes(v))) return false;
  if (c.notVisited && c.notVisited.some((v) => s.visited.includes(v))) return false;
  if (c.unresolved && !c.unresolved.every((n) => s.unresolved.includes(n))) return false;
  if (c.resolved && c.resolved.some((n) => s.unresolved.includes(n))) return false;
  if (c.student) {
    for (const q of c.student) {
      const v = s.students[q.id]?.[q.key];
      if (v === undefined) return false;
      if (q.min !== undefined && v < q.min) return false;
      if (q.max !== undefined && v > q.max) return false;
    }
  }
  if (c.minXp !== undefined && s.xp < c.minXp) return false;
  return true;
}

export const scenarioByCode = (u: Universe, code: string) => u.scenarios.find((x) => x.code === code);

/* ---------------- drawing ---------------- */

/**
 * Candidates in a pool, after removing: missing scenarios, failed
 * prerequisites, cooldowns, an immediate repeat, scenarios already played
 * this session (random events may recur, just not back to back), and
 * contradictions (a recovery-only event when nothing is unresolved).
 */
export function eligibleInPool(s: UState, u: Universe, pool: PoolId): { sc: Scenario; weight: number }[] {
  const p = u.pools.find((x) => x.id === pool);
  if (!p) return [];
  const last = s.visited[s.visited.length - 1];
  const out: { sc: Scenario; weight: number }[] = [];
  for (const e of p.entries) {
    const sc = scenarioByCode(u, e.code);
    if (!sc || e.weight <= 0) continue;
    if (!meetsU(sc.requires, s)) continue;
    if ((s.cooldowns[sc.code] ?? 0) > 0) continue;
    if (last === sc.code) continue;
    if (sc.kind === 'scenario' && s.visited.includes(sc.code)) continue;
    const onlyCloses = (sc.closesNeeds?.length ?? 0) > 0 && !(sc.opensNeeds?.length);
    if (sc.kind === 'random' && onlyCloses && !sc.closesNeeds!.some((n) => s.unresolved.includes(n))) continue;
    let weight = e.weight;
    if (sc.code === RECOVERY_CODE && s.unresolved.length) weight *= RECOVERY_BOOST;
    out.push({ sc, weight });
  }
  return out;
}

/** The next scenario of this session, or null when the arc is complete (time for the ending). */
export function drawNext(s: UState, u: Universe): { code: string; arc: UState['arc'] } | null {
  let step = s.arc.step;
  let drawn = s.arc.drawn;
  while (step < u.arc.length) {
    const a = u.arc[step];
    if (drawn >= a.draws) { step++; drawn = 0; continue; }
    const cand = eligibleInPool(s, u, a.pool);
    if (!cand.length) { step++; drawn = 0; continue; } // none eligible → move on (never stuck)
    const pick = pickWeighted(cand, (c) => c.weight, drawRand(s.seed, s.visited.length));
    if (!pick) { step++; drawn = 0; continue; }
    return { code: pick.sc.code, arc: { step, drawn: drawn + 1 } };
  }
  return null;
}

/** Start a session (the entry hub is always first). */
export function startSession(s: UState, u: Universe): UState {
  return { ...s, inSession: true, visited: [], flags: {}, cooldowns: {}, arc: { step: 0, drawn: 0 }, phase: 'launch', resume: { code: u.entry, step: 'start' } };
}

/** The scenario to play now: the entry hub first, then draws. */
export function currentCode(s: UState, u: Universe): { code: string; arc: UState['arc'] } | null {
  if (!s.visited.includes(u.entry)) return { code: u.entry, arc: s.arc };
  return drawNext(s, u);
}

/* ---------------- playing a scenario ---------------- */

/** A Scenario as an Adventure for the scene / investigation / choice machinery. Students start from the universe state. */
export function scenarioAdventure(sc: Scenario, s: UState): Adventure {
  const openedByOutcome = new Set(sc.outcomes.map((o) => o.next?.event).filter(Boolean) as string[]);
  const hotspots = sc.events.filter((e) => !openedByOutcome.has(e.id) && e.category === undefined && !e.eligible);
  return {
    ...sc,
    number: 0,
    lessonMinutes: 5,
    timed: false,
    schedule: hotspots.map((e) => ({ event: e.id, at: 0 })),
    students: sc.students.map((st) => {
      const v = s.students[st.id];
      return v ? { ...st, understanding: v.understanding, engagement: v.participation } : st;
    }),
    badges: sc.badges ?? [],
    communityTopic: sc.communityTopic ?? sc.title,
    communityExamples: sc.communityExamples ?? [],
    teaser: [],
    endings: undefined,
  };
}

export interface ScenarioResult {
  /** Outcome ids reached, in order. */
  outcomes: string[];
  /** Outcome XP by id (from the scenario's outcomes). */
  outcomeXp: Record<string, number>;
  /** Tools discovered. */
  found: string[];
  /** Session flags set. */
  flags: Record<string, boolean>;
  /** Students' [understanding, engagement] at the end of the scenario. */
  students: Record<string, [number, number]>;
  /** Evidence profiles drawn: event id → profile id. */
  profiles?: Record<string, string>;
}

/**
 * Apply a finished scenario: path, outcomes, tools, flags, student variables
 * (outcome effects, then studentDelta), needs, cooldowns, phase, XP with
 * anti-farming. The next resume point is the next draw.
 */
export function completeScenario(s: UState, u: Universe, code: string, r: ScenarioResult, arc: UState['arc']): { state: UState; xpGained: number; newTools: string[] } {
  const sc = scenarioByCode(u, code);
  if (!sc) return { state: s, xpGained: 0, newTools: [] };
  const rewarded = [...s.rewarded];
  let xp = 0;
  const award = (key: string, amount: number) => { if (amount > 0 && !rewarded.includes(key)) { rewarded.push(key); xp += amount; } };
  // first meaningful discovery: full; identical repeat: zero
  for (const o of r.outcomes) award(`${code}:${o}`, r.outcomeXp[o] ?? 0);
  // a genuinely different evidence path in a scenario already played: exploration credit
  const playedBefore = (s.outcomes[code] ?? []).length > 0;
  for (const [ev, prof] of Object.entries(r.profiles ?? {})) {
    const key = `${code}:evidence:${ev}:${prof}`;
    if (playedBefore) award(key, XP_EXPLORE); else if (!rewarded.includes(key)) rewarded.push(key);
  }
  const newTools = r.found.filter((t) => !s.tools.includes(t));
  for (const t of newTools) award(`tool:${t}`, XP_TOOL);

  const students: Record<string, StudentVars> = {};
  for (const [id, v] of Object.entries(s.students)) {
    const e = r.students[id];
    students[id] = e ? { ...v, understanding: clamp(e[0]), participation: clamp(e[1]) } : { ...v };
  }
  for (const d of sc.studentDelta ?? []) {
    const v = students[d.id];
    if (v) students[d.id] = { ...v, [d.key]: clamp(v[d.key] + d.delta) };
  }
  let unresolved = s.unresolved.filter((n) => !(sc.closesNeeds ?? []).includes(n));
  for (const n of sc.opensNeeds ?? []) if (!unresolved.includes(n)) unresolved = [...unresolved, n];
  const cooldowns: Record<string, number> = {};
  for (const [c, n] of Object.entries(s.cooldowns)) if (n - 1 > 0) cooldowns[c] = n - 1;
  if ((sc.cooldown ?? 0) > 0) cooldowns[code] = sc.cooldown!;
  const outcomes = { ...s.outcomes, [code]: Array.from(new Set([...(s.outcomes[code] ?? []), ...r.outcomes])) };
  const tools = [...s.tools, ...newTools];
  const state: UState = {
    ...s,
    visited: [...s.visited, code],
    outcomes, tools, unresolved, students, cooldowns, rewarded,
    flags: { ...s.flags, ...r.flags },
    xp: s.xp + xp,
    phase: sc.phase,
    arc: code === u.entry ? s.arc : arc,
    resume: { code: '', step: 'next' },
  };
  return { state, xpGained: xp, newTools };
}

/* ---------------- endings ---------------- */

export function eligibleUniverseEndings(s: UState, u: Universe): UniverseEnding[] {
  return u.endings.filter((e) => meetsU(e.when, s)).sort((a, b) => a.priority - b.priority);
}

/** Primary ending + the others offered as choices. A last-resort ending (highest priority number) if none hold. */
export function pickUniverseEnding(s: UState, u: Universe): { primary: UniverseEnding; others: UniverseEnding[] } {
  const list = eligibleUniverseEndings(s, u);
  if (list.length) return { primary: list[0], others: list.slice(1) };
  const fallback = [...u.endings].sort((a, b) => b.priority - a.priority)[0];
  return { primary: fallback, others: [] };
}

/** Close the session: history, next session's seed; students, needs, tools, XP persist. */
export function endSession(s: UState, u: Universe, endingId: string): UState {
  const session = s.session + 1;
  return {
    ...s,
    history: [...s.history, { session: s.session, path: s.visited, ending: endingId }],
    session,
    seed: sessionSeed(s.key ?? 'anon', u.version, session),
    visited: [], flags: {}, cooldowns: {}, arc: { step: 0, drawn: 0 }, inSession: false, phase: 'launch', resume: undefined,
  };
}

/** Plays a whole session automatically (first offered choice each time): for tests and QA. */
export function simulatePath(s: UState, u: Universe, play: (sc: Scenario, s: UState) => ScenarioResult): { path: string[]; ending: string; state: UState } {
  let st = startSession(s, u);
  for (let guard = 0; guard < 50; guard++) {
    const cur = currentCode(st, u);
    if (!cur) break;
    const sc = scenarioByCode(u, cur.code)!;
    st = completeScenario(st, u, cur.code, play(sc, st), cur.arc).state;
  }
  const { primary } = pickUniverseEnding(st, u);
  return { path: st.visited, ending: primary.id, state: st };
}
