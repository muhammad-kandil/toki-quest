/**
 * Mission mechanics from the Alef proposal (docs/product/ALEF_PROPOSAL.md):
 * weighted event selection, coherent evidence profiles, clue investigation,
 * choice filtering, the sequencing puzzle, endings by priority, XP once per
 * meaningful action. Pure functions; randomness is injected (`rand`).
 */
import type { Adventure, ClassEvent, Choice, Eligibility, Ending, EvidenceProfile, SequencePuzzle, Stage } from '../types';
import { findEvent, type SimState } from './sim';

export type Rand = () => number;

/** Small seeded RNG (mulberry32) so tests and e2e are deterministic. */
export function seeded(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function meets(e: Eligibility | undefined, flags: Record<string, boolean>): boolean {
  if (!e) return true;
  if (e.flags && !e.flags.every((f) => flags[f])) return false;
  if (e.notFlags && e.notFlags.some((f) => flags[f])) return false;
  return true;
}

/** Pick one item by weight (weights normalised; non-positive weights never win). */
export function pickWeighted<T>(items: T[], weight: (t: T) => number, rand: Rand): T | undefined {
  const ws = items.map((i) => Math.max(0, weight(i) || 0));
  const total = ws.reduce((a, b) => a + b, 0);
  if (!items.length) return undefined;
  if (total <= 0) return items[0];
  let r = rand() * total;
  for (let i = 0; i < items.length; i++) {
    if (ws[i] <= 0) continue;
    if (r < ws[i]) return items[i];
    r -= ws[i];
  }
  for (let i = items.length - 1; i >= 0; i--) if (ws[i] > 0) return items[i];
  return undefined;
}

/** Events eligible now: not done, eligibility met, optionally on one target (student/object). */
export function eligibleEvents(sim: SimState, adv: Adventure, on?: string): ClassEvent[] {
  return adv.events.filter((e) => !sim.done.includes(e.id) && (on === undefined || e.on === on) && meets(e.eligible, sim.flags));
}

/**
 * A trigger (a tap on a student/object, or "what happens next"): filter
 * eligible events, normalise weights, pick one. None → undefined (back to
 * exploration, or a milestone).
 */
export function triggerEvent(sim: SimState, adv: Adventure, rand: Rand, on?: string): ClassEvent | undefined {
  return pickWeighted(eligibleEvents(sim, adv, on), (e) => e.weight ?? 1, rand);
}

/** Targets with something to explore right now (they pulse on the scene). */
export function activeTargets(sim: SimState, adv: Adventure): string[] {
  const out: string[] = [];
  for (const e of eligibleEvents(sim, adv)) if (!out.includes(e.on)) out.push(e.on);
  return out;
}

/* ---------------- investigation ---------------- */

/** Start an encounter: the evidence profile is picked ONCE by weight and then stays fixed. */
export function startEncounter(sim: SimState, ev: ClassEvent, rand: Rand): SimState {
  if (!ev.investigate || sim.profiles?.[ev.id]) return sim;
  const p = pickWeighted(ev.investigate.profiles, (x) => x.weight, rand);
  if (!p) return sim;
  return {
    ...sim,
    profiles: { ...(sim.profiles ?? {}), [ev.id]: p.id },
    flags: { ...sim.flags, [p.setFlag]: true },
    clues: { ...(sim.clues ?? {}), [ev.id]: sim.clues?.[ev.id] ?? [] },
  };
}

export function profileOf(sim: SimState, ev: ClassEvent): EvidenceProfile | undefined {
  const id = sim.profiles?.[ev.id];
  return id ? ev.investigate?.profiles.find((p) => p.id === id) : undefined;
}

export function revealClue(sim: SimState, evId: string, clueId: string): SimState {
  const seen = sim.clues?.[evId] ?? [];
  if (seen.includes(clueId)) return sim;
  return { ...sim, clues: { ...(sim.clues ?? {}), [evId]: [...seen, clueId] } };
}

export function cluesReady(sim: SimState, ev: ClassEvent): boolean {
  if (!ev.investigate) return true;
  const need = ev.investigate.minClues ?? ev.investigate.clues.length;
  return (sim.clues?.[ev.id] ?? []).length >= need;
}

/** Choices on offer, with their original index (paths store the index). */
export function offeredChoices(ev: ClassEvent, flags: Record<string, boolean>): { choice: Choice; index: number }[] {
  return ev.choices.map((choice, index) => ({ choice, index })).filter(({ choice }) => !choice.ifFlag || flags[choice.ifFlag]);
}

/* ---------------- XP (once per meaningful action) ---------------- */

export const xpKey = (advId: string, id: string) => `${advId}:${id}`;

/** Award XP for a key unless already rewarded (this run or any earlier run). */
export function awardXp(sim: SimState, key: string, amount: number | undefined, rewardedBefore: string[]): SimState {
  if (!amount || amount <= 0) return sim;
  const now = sim.rewardedNow ?? [];
  if (now.includes(key) || rewardedBefore.includes(key)) return sim;
  return { ...sim, xp: (sim.xp ?? 0) + amount, rewardedNow: [...now, key] };
}

/* ---------------- sequencing puzzle ---------------- */

export type Placement = Record<string, Stage | undefined>;

export interface PuzzleCheck {
  complete: boolean;
  /** Cards not yet placed. */
  unplaced: string[];
  /** Cards placed where they don't (also) belong. */
  misplaced: string[];
}

/** A card may belong to several stages; any of them is right. */
export function checkPuzzle(p: SequencePuzzle, placement: Placement): PuzzleCheck {
  const unplaced: string[] = [];
  const misplaced: string[] = [];
  for (const c of p.cards) {
    const st = placement[c.id];
    if (!st) unplaced.push(c.id);
    else if (!c.stages.includes(st)) misplaced.push(c.id);
  }
  return { complete: !unplaced.length && !misplaced.length, unplaced, misplaced };
}

/* ---------------- endings ---------------- */

/** Eligible endings, most relevant first (lower priority number = unresolved needs first). */
export function eligibleEndings(adv: Adventure, flags: Record<string, boolean>): Ending[] {
  return (adv.endings ?? []).filter((e) => meets(e.when, flags)).sort((a, b) => a.priority - b.priority);
}

/** Primary ending + the others to offer as choices. */
export function resolveEnding(adv: Adventure, flags: Record<string, boolean>): { primary?: Ending; others: Ending[] } {
  const list = eligibleEndings(adv, flags);
  return { primary: list[0], others: list.slice(1) };
}

/** Whether an event is part of an investigation the teacher has started but not answered. */
export const isOpenEncounter = (sim: SimState, adv: Adventure, evId: string) =>
  !!findEvent(adv, evId)?.investigate && !!sim.profiles?.[evId] && !sim.done.includes(evId);

/* ---------------- content contract (docs/content/TEACHER_CONTENT.md "Engine contract") ---------------- */

const scheduledIds = (adv: Adventure) => adv.schedule.map((q) => q.event);
const openedByOutcome = (adv: Adventure) => adv.outcomes.map((o) => o.next?.event).filter((x): x is string => !!x);

/** Pool event: has a category, is neither scheduled nor opened by an outcome. */
export function isPoolEvent(adv: Adventure, ev: ClassEvent): boolean {
  return ev.category !== undefined && !scheduledIds(adv).includes(ev.id) && !openedByOutcome(adv).includes(ev.id);
}

/**
 * Draw one pool event (weights normalised) among the eligible ones not yet
 * seen or queued, and queue it so it pulses on its hotspot. None → unchanged
 * (back to exploration).
 */
export function drawPool(sim: SimState, adv: Adventure, rand: Rand): { sim: SimState; drawn?: string } {
  const pool = adv.events.filter((e) => isPoolEvent(adv, e) && !sim.done.includes(e.id)
    && !sim.queue.some((q) => q.event === e.id) && meets(e.eligible, sim.flags));
  const ev = pickWeighted(pool, (e) => e.weight ?? 1, rand);
  if (!ev) return { sim };
  return { sim: { ...sim, queue: [...sim.queue, { event: ev.id, at: sim.t }] }, drawn: ev.id };
}

/** Events open on a hotspot now: its own (scheduled / follow-up) event first, then a pool event. */
export function liveOn(sim: SimState, adv: Adventure, target: string): ClassEvent[] {
  const seen = new Set<string>();
  const live: ClassEvent[] = [];
  for (const q of sim.queue) {
    if (q.at > sim.t || sim.done.includes(q.event) || seen.has(q.event)) continue;
    const e = findEvent(adv, q.event);
    if (e && e.on === target) { seen.add(e.id); live.push(e); }
  }
  return [...live.filter((e) => !isPoolEvent(adv, e)), ...live.filter((e) => isPoolEvent(adv, e))];
}

/** Hotspots with an open event (they pulse). */
export function liveTargets(sim: SimState, adv: Adventure): string[] {
  const out: string[] = [];
  for (const q of sim.queue) {
    if (q.at > sim.t || sim.done.includes(q.event)) continue;
    const e = findEvent(adv, q.event);
    if (e && !out.includes(e.on)) out.push(e.on);
  }
  return out;
}

/** Milestone: every scheduled student hotspot event is resolved and an ending is eligible (no schedule: any ending eligible). */
export function milestoneReached(sim: SimState, adv: Adventure): boolean {
  if (!eligibleEndings(adv, sim.flags).length) return false;
  const studentIds = adv.students.map((s) => s.id);
  const studentEvents = adv.schedule.map((q) => findEvent(adv, q.event)).filter((e): e is ClassEvent => !!e && studentIds.includes(e.on));
  return studentEvents.every((e) => sim.done.includes(e.id));
}

/** A choice opens the puzzle when its resolved outcome id equals puzzle.id. */
export const opensPuzzle = (adv: Adventure, outcomeId: string) => !!adv.puzzle && adv.puzzle.id === outcomeId;

/**
 * Badges earned this run: the union (no duplicates) of the ending's badge,
 * the puzzle's badge (if solved), and the first matching `badges[]` rule.
 */
export function earnedBadges(adv: Adventure, sim: SimState, ending: Ending | undefined, firstRule: string | undefined): string[] {
  const ids = [ending?.badge, adv.puzzle && sim.flags['puzzle:' + adv.puzzle.id] ? adv.puzzle.badge : undefined, firstRule];
  const out: string[] = [];
  for (const id of ids) if (id && adv.badges.some((b) => b.id === id) && !out.includes(id)) out.push(id);
  return out;
}

/** Missions unlocked by `unlock:<id>` flags. */
export const unlockFlags = (flags: Record<string, boolean>): string[] =>
  Object.keys(flags).filter((k) => flags[k] && k.startsWith('unlock:')).map((k) => k.slice('unlock:'.length));
