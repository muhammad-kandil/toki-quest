/**
 * Classroom simulation: pure functions over an immutable SimState.
 * No React, no DOM — tested by tools/teacher/engine.test.ts.
 */
import type { Adventure, Choice, ClassEvent, Outcome, Student } from '../types';

export interface PathStep {
  event: string;
  choice: number;
  outcome: string;
}

export interface SimState {
  /** Current lesson minute. */
  t: number;
  /** Events waiting to open: scheduled ones plus follow-ups opened by outcomes. */
  queue: { event: string; at: number }[];
  /** Events already answered. */
  done: string[];
  /** studentId → [understanding, engagement], each 0–3. */
  students: Record<string, [number, number]>;
  flags: Record<string, boolean>;
  /** Resources used in this lesson, in discovery order. */
  found: string[];
  path: PathStep[];
  /** Outcomes reached and then undone with the Rewind power-up (the notebook keeps them). */
  rewound?: string[];
  /** Evidence profile chosen per investigated event (fixed once picked). */
  profiles?: Record<string, string>;
  /** Clue ids revealed per event. */
  clues?: Record<string, string[]>;
  /** XP earned this run, and the keys it was earned for (once per meaningful action). */
  xp?: number;
  rewardedNow?: string[];
}

export type Band = 'good' | 'mixed' | 'poor';

const clamp = (n: number) => Math.max(0, Math.min(3, n));

export function createSim(adv: Adventure, carryFlags: Record<string, boolean> = {}): SimState {
  const students: Record<string, [number, number]> = {};
  for (const s of adv.students) students[s.id] = [clamp(s.understanding), clamp(s.engagement)];
  const queue = adv.schedule
    .filter((q) => q.at < adv.lessonMinutes)
    .map((q) => ({ event: q.event, at: q.at }))
    .sort((a, b) => a.at - b.at);
  // The lesson opens on its first scheduled moment (no empty waiting at minute 0).
  const t = queue.length ? Math.min(queue[0].at, adv.lessonMinutes) : 0;
  return { t, queue, done: [], students, flags: { ...carryFlags }, found: [], path: [] };
}

/** Events open right now, oldest first. */
export function liveEvents(sim: SimState): string[] {
  return sim.queue.filter((q) => q.at <= sim.t && !sim.done.includes(q.event)).map((q) => q.event);
}

/** The next event that will open later in the lesson, if any. */
export function nextPending(sim: SimState, adv: Adventure): { event: string; at: number } | undefined {
  return sim.queue
    .filter((q) => q.at > sim.t && q.at < adv.lessonMinutes && !sim.done.includes(q.event))
    .sort((a, b) => a.at - b.at)[0];
}

/** "Let the lesson run": jump to the next event, or to the bell. */
export function runToNext(sim: SimState, adv: Adventure): SimState {
  const n = nextPending(sim, adv);
  return { ...sim, t: n ? Math.min(n.at, adv.lessonMinutes) : adv.lessonMinutes };
}

export function isLessonOver(sim: SimState, adv: Adventure): boolean {
  if (sim.t >= adv.lessonMinutes) return true;
  return liveEvents(sim).length === 0 && !nextPending(sim, adv);
}

/** Events that opened (or were due) before the bell but never got answered. */
export function unresolvedEvents(sim: SimState, adv: Adventure): string[] {
  const out: string[] = [];
  for (const q of sim.queue) {
    if (q.at < adv.lessonMinutes && !sim.done.includes(q.event) && !out.includes(q.event)) out.push(q.event);
  }
  return out;
}

/** Outcome for a choice: a fixed id, or the first entry whose flag is set (an entry without ifFlag always matches); the last entry is the default. */
export function resolveOutcomeId(choice: Choice, flags: Record<string, boolean>): string {
  if (typeof choice.outcome === 'string') return choice.outcome;
  const list = choice.outcome;
  for (const c of list) if (!c.ifFlag || flags[c.ifFlag]) return c.outcome;
  return list[list.length - 1].outcome;
}

export const findEvent = (adv: Adventure, id: string): ClassEvent | undefined => adv.events.find((e) => e.id === id);
export const findOutcome = (adv: Adventure, id: string): Outcome | undefined => adv.outcomes.find((o) => o.id === id);
export const findStudent = (adv: Adventure, id: string): Student | undefined => adv.students.find((s) => s.id === id);

export interface ChoiceResult {
  sim: SimState;
  outcome: Outcome;
  /** Resource used for the first time in this lesson. */
  discovered?: string;
  /** Follow-up event this outcome opened. */
  opened?: string;
  /** XP this choice earned (0 if already rewarded). */
  xpGained?: number;
}

export function choose(sim: SimState, adv: Adventure, eventId: string, choiceIndex: number, rewardedBefore: string[] = []): ChoiceResult {
  const ev = findEvent(adv, eventId);
  if (!ev) throw new Error(`unknown event ${eventId}`);
  const choice = ev.choices[choiceIndex];
  if (!choice) throw new Error(`unknown choice ${eventId}#${choiceIndex}`);
  const outId = resolveOutcomeId(choice, sim.flags);
  const outcome = findOutcome(adv, outId);
  if (!outcome) throw new Error(`unknown outcome ${outId}`);

  const students = { ...sim.students };
  for (const fx of outcome.effects) {
    const cur = students[fx.student];
    if (!cur) continue;
    students[fx.student] = [clamp(cur[0] + (fx.understanding ?? 0)), clamp(cur[1] + (fx.engagement ?? 0))];
  }
  const flags = outcome.setFlag ? { ...sim.flags, [outcome.setFlag]: true } : sim.flags;
  const t = sim.t + Math.max(0, choice.minutes);
  const done = [...sim.done, eventId];
  let queue = sim.queue;
  let opened: string | undefined;
  if (outcome.next && !done.includes(outcome.next.event) && !queue.some((q) => q.event === outcome.next!.event)) {
    queue = [...queue, { event: outcome.next.event, at: t + Math.max(0, outcome.next.after) }];
    opened = outcome.next.event;
  }
  let found = sim.found;
  let discovered: string | undefined;
  for (const r of [choice.resource, outcome.discover]) {
    if (r && !found.includes(r)) { found = [...found, r]; discovered = discovered ?? r; }
  }
  const path = [...sim.path, { event: eventId, choice: choiceIndex, outcome: outId }];
  let xp = sim.xp ?? 0;
  let rewardedNow = sim.rewardedNow ?? [];
  const key = `${adv.id}:${outId}`;
  let xpGained = 0;
  if (outcome.xp && outcome.xp > 0 && !rewardedNow.includes(key) && !rewardedBefore.includes(key)) {
    xp += outcome.xp; xpGained = outcome.xp; rewardedNow = [...rewardedNow, key];
  }
  return { sim: { ...sim, t, queue, done, students, flags, found, path, xp, rewardedNow }, outcome, discovered, opened, xpGained };
}

/** A closer look at a student (e.g. Sara's page): sets the peek flag once. */
export function peek(sim: SimState, adv: Adventure, studentId: string): { sim: SimState; seen: boolean } {
  const s = findStudent(adv, studentId);
  if (!s?.peek || sim.flags[s.peek.setFlag]) return { sim, seen: false };
  return { sim: { ...sim, flags: { ...sim.flags, [s.peek.setFlag]: true } }, seen: true };
}

export function band(state: [number, number]): Band {
  const s = state[0] + state[1];
  return s >= 5 ? 'good' : s >= 3 ? 'mixed' : 'poor';
}

/** First badge rule that matches wins. */
export function pickBadge(adv: Adventure, sim: SimState): Adventure['badges'][number] | undefined {
  for (const b of adv.badges) {
    if (b.when === 'always') return b;
    if (b.when === 'all-good') {
      if (Object.values(sim.students).every((s) => band(s) === 'good')) return b;
      continue;
    }
    if (sim.flags[b.when.flag]) return b;
  }
  return adv.badges[adv.badges.length - 1];
}

/** Teaser for the next adventure: first entry whose flag is set (no flag = always); last is the default. */
export function teaserEntry(adv: Adventure, flags: Record<string, boolean>) {
  return adv.teaser.find((t) => !t.ifFlag || flags[t.ifFlag]) ?? adv.teaser[adv.teaser.length - 1];
}

/** Loop-rail step for an event: follow-ups and surprises are the Challenge step. */
export function railStepFor(ev: ClassEvent): number {
  return ev.kind === 'new-event' || ev.kind === 'unexpected' ? 3 : 1;
}

export const encodePath = (p: PathStep[]): string[] => p.map((s) => `${s.event}:${s.choice}:${s.outcome}`);
export function decodePath(p: string[]): PathStep[] {
  return p.map((s) => {
    const [event, choice, outcome] = s.split(':');
    return { event, choice: Number(choice), outcome };
  });
}
