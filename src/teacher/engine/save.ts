/**
 * Save model + school-day rhythm + Term Pass progress. Pure functions.
 * Uses only the shared TeacherSave contract (src/teacher/types.ts);
 * GameSave just makes the optional fields present after normalizeSave.
 */
import type { Adventure, Period, TeacherSave } from '../types';
import { encodePath, type SimState } from './sim';

export type PassState = NonNullable<TeacherSave['pass']>;
export type GameSave = TeacherSave & Required<Pick<TeacherSave,
  'saved' | 'tried' | 'runs' | 'seenOutcomes' | 'pass' | 'notes' | 'owned' | 'placed' | 'powerups' | 'xp' | 'rewarded'>>;

/** Flag key marking that the latest run of an adventure used a power-up (notebook icon). */
export const powerupFlag = (advId: string) => `__pu:${advId}`;

export const PERIODS: Period[] = ['morning', 'midday', 'afternoon'];
export const MAX_ENERGY = 3;
export const SAVE_KEY = 'teacher:v1';

export const emptyPass = (): PassState => ({ stage: 0, claimed: [], sharedFor: [], replayedFor: [] });

export function newSave(firstAdventure?: string): GameSave {
  return {
    version: 1, day: 1, period: 'morning', energy: MAX_ENERGY,
    completed: {}, unlocked: firstAdventure ? [firstAdventure] : [], toolkit: [], flags: {},
    saved: [], tried: [], runs: {}, seenOutcomes: {}, pass: emptyPass(),
    notes: 0, owned: [], placed: {}, powerups: {}, xp: 0, rewarded: [],
  };
}

const arr = <T,>(v: unknown, d: T[] = []): T[] => (Array.isArray(v) ? (v as T[]) : d);
const obj = <T,>(v: unknown): T => (v && typeof v === 'object' && !Array.isArray(v) ? v : {}) as T;

/** Accept whatever was stored (older, partial, corrupt, unknown version) and return a whole save. */
export function normalizeSave(raw: unknown, firstAdventure?: string): GameSave {
  const base = newSave(firstAdventure);
  if (!raw || typeof raw !== 'object' || (raw as { version?: unknown }).version !== 1) return base;
  const r = raw as Partial<TeacherSave>;
  const p = obj<Partial<PassState>>(r.pass);
  const s: GameSave = {
    version: 1,
    playerName: typeof r.playerName === 'string' ? r.playerName : undefined,
    lang: r.lang === 'ar' || r.lang === 'en' ? r.lang : undefined,
    day: typeof r.day === 'number' && r.day >= 1 ? Math.floor(r.day) : 1,
    period: PERIODS.includes(r.period as Period) ? (r.period as Period) : 'morning',
    energy: typeof r.energy === 'number' ? Math.max(0, Math.min(MAX_ENERGY, Math.floor(r.energy))) : MAX_ENERGY,
    completed: obj(r.completed),
    unlocked: arr<string>(r.unlocked, base.unlocked),
    toolkit: arr<string>(r.toolkit),
    flags: obj(r.flags),
    saved: arr<string>(r.saved),
    tried: arr<{ id: string; day: number }>(r.tried),
    runs: obj(r.runs),
    seenOutcomes: obj(r.seenOutcomes),
    pass: {
      stage: typeof p.stage === 'number' ? Math.max(0, p.stage) : 0,
      claimed: arr<string>(p.claimed), sharedFor: arr<string>(p.sharedFor), replayedFor: arr<string>(p.replayedFor),
    },
    notes: typeof r.notes === 'number' && r.notes > 0 ? Math.floor(r.notes) : 0,
    owned: arr<string>(r.owned),
    placed: obj(r.placed),
    powerups: obj(r.powerups),
    xp: typeof r.xp === 'number' && r.xp > 0 ? Math.floor(r.xp) : 0,
    rewarded: arr<string>(r.rewarded),
  };
  if (firstAdventure && !s.unlocked.includes(firstAdventure)) s.unlocked = [firstAdventure, ...s.unlocked];
  return s;
}

/** Move the clock one period; after the afternoon comes the next morning, rested. */
export function advancePeriod(s: GameSave): GameSave {
  const i = PERIODS.indexOf(s.period);
  if (i < PERIODS.length - 1) return { ...s, period: PERIODS[i + 1] };
  return { ...s, day: s.day + 1, period: 'morning', energy: MAX_ENERGY };
}

/** Tired (0) only suggests the staff room; the classroom still opens. */
export const isTired = (s: GameSave) => s.energy <= 0;

/** Resting in the staff room: full energy, and the period moves on. */
export function rest(s: GameSave): GameSave {
  if (s.energy >= MAX_ENERGY) return s;
  return advancePeriod({ ...s, energy: MAX_ENERGY });
}

/* ------------------------------------------------------------------ */
/* Lesson completion + Term Pass                                       */
/* ------------------------------------------------------------------ */

const bump = (p: PassState, stages: number): PassState => ({ ...p, stage: Math.min(stages, p.stage + 1) });

export interface CompletionResult {
  save: GameSave;
  firstTime: boolean;
  /** Term Pass stages gained by this lesson (0 or 1). */
  stagesGained: number;
  /** Badge ids this run newly adds to the adventure's earned set. */
  newBadge: boolean;
}

/**
 * Record a finished adventure: notebook page (latest run), toolkit, flags,
 * unlock, runs, seen outcomes, one period + one energy, Term Pass credit
 * (+1 first finish; +1 once per adventure for a replay that reaches an
 * outcome never seen before).
 */
export function recordCompletion(
  s: GameSave, adv: Adventure, sim: SimState, badge: string, termStages: number, usedPowerups = false, opens: string[] = [],
): CompletionResult {
  const prev = s.completed[adv.id];
  const firstTime = !prev;
  const seenBefore = s.seenOutcomes[adv.id] ?? [];
  // Synthetic outcomes (e.g. '__assist' from a power-up) are not branches.
  const reached = [...sim.path.map((p) => p.outcome), ...(sim.rewound ?? [])].filter((o) => !o.startsWith('__'));
  const differentPath = !firstTime && reached.some((o) => !seenBefore.includes(o));
  let pass = s.pass;
  if (firstTime) pass = bump(pass, termStages);
  else if (differentPath && !pass.replayedFor.includes(adv.id)) pass = bump({ ...pass, replayedFor: [...pass.replayedFor, adv.id] }, termStages);
  const seen = [...seenBefore];
  for (const o of reached) if (!seen.includes(o)) seen.push(o);
  const toolkit = [...s.toolkit];
  for (const r of sim.found) if (!toolkit.includes(r)) toolkit.push(r);
  const unlocked = [...s.unlocked];
  for (const id of [adv.unlocks, ...opens]) if (id && !unlocked.includes(id)) unlocked.push(id);
  const rewarded = [...s.rewarded];
  for (const k of sim.rewardedNow ?? []) if (!rewarded.includes(k)) rewarded.push(k);
  const next = advancePeriod({
    ...s,
    energy: Math.max(0, s.energy - 1),
    completed: { ...s.completed, [adv.id]: { badge, path: encodePath(sim.path), students: sim.students } },
    toolkit, unlocked,
    flags: { ...s.flags, ...sim.flags, [powerupFlag(adv.id)]: usedPowerups },
    runs: { ...s.runs, [adv.id]: (s.runs[adv.id] ?? 0) + 1 },
    seenOutcomes: { ...s.seenOutcomes, [adv.id]: seen },
    pass,
    xp: s.xp + (sim.xp ?? 0),
    rewarded,
  });
  return { save: next, firstTime, stagesGained: pass.stage - s.pass.stage, newBadge: !prev || prev.badge !== badge };
}

/** Toggle a resource on "My Monday list". */
export function toggleSaved(s: GameSave, id: string): GameSave {
  return { ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] };
}

/** "I tried it in a real lesson": recorded once per resource; at most one Term Pass stage per school day. */
export function markTried(s: GameSave, id: string, termStages: number): { save: GameSave; credited: boolean } {
  if (s.tried.some((x) => x.id === id)) return { save: s, credited: false };
  const creditToday = !s.tried.some((x) => x.day === s.day);
  const pass = creditToday ? bump(s.pass, termStages) : s.pass;
  return { save: { ...s, tried: [...s.tried, { id, day: s.day }], pass }, credited: pass.stage > s.pass.stage };
}

/** Shared a move to the community: one stage once per adventure. */
export function markShared(s: GameSave, advId: string, termStages: number): { save: GameSave; credited: boolean } {
  if (s.pass.sharedFor.includes(advId)) return { save: s, credited: false };
  const pass = bump({ ...s.pass, sharedFor: [...s.pass.sharedFor, advId] }, termStages);
  return { save: { ...s, pass }, credited: pass.stage > s.pass.stage };
}

export const stageReached = (p: PassState, stage: number) => p.stage >= stage;

/** Claim a reward on a reached stage (idempotent; no effect if not reached). */
export function claimReward(s: GameSave, rewardId: string, stage: number): GameSave {
  if (!stageReached(s.pass, stage) || s.pass.claimed.includes(rewardId)) return s;
  return { ...s, pass: { ...s.pass, claimed: [...s.pass.claimed, rewardId] } };
}
