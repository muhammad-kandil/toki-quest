/**
 * Power-ups (pure). Consumables bought in the shop, used inside an
 * adventure, at most once each per adventure. None reveals the "best"
 * answer or skips a decision the teacher would otherwise make about a
 * student's learning.
 */
import type { PowerupId } from '../dev/shopFixture';
import type { Text } from '../../i18n/types';
import type { Adventure, Student } from '../types';
import { findEvent, liveEvents, type SimState } from './sim';
import type { GameSave } from './save';

export const POWERUPS: PowerupId[] = ['parent-call', 'second-look', 'rewind', 'assistant', 'extra5'];
/** Synthetic outcome id the Teaching assistant writes to the path. */
export const ASSIST_OUTCOME = '__assist';
export const EXTRA_MINUTES = 5;

export const owned = (s: GameSave, id: PowerupId) => Math.max(0, s.powerups[id] ?? 0);
export const canUse = (s: GameSave, used: PowerupId[], id: PowerupId) => owned(s, id) > 0 && !used.includes(id);
export function consume(s: GameSave, id: PowerupId): GameSave {
  return { ...s, powerups: { ...s.powerups, [id]: Math.max(0, owned(s, id) - 1) } };
}

/** Extra 5 minutes: the effective adventure for the rest of this run. */
export const withExtraTime = (adv: Adventure, minutes = EXTRA_MINUTES): Adventure => ({ ...adv, lessonMinutes: adv.lessonMinutes + minutes });

/**
 * Rewind: go back to the state before the last choice. `history` holds the
 * state before each choice. The undone outcome is kept in `rewound` so the
 * notebook records both branches.
 */
export function rewind(history: SimState[], current: SimState): { sim: SimState; history: SimState[]; undone: string } | null {
  if (!history.length || !current.path.length) return null;
  const prev = history[history.length - 1];
  const undone = current.path[current.path.length - 1].outcome;
  const kept = [...(current.rewound ?? [])];
  if (!undone.startsWith('__') && !kept.includes(undone)) kept.push(undone);
  return { sim: { ...prev, rewound: kept }, history: history.slice(0, -1), undone };
}

/** Teaching assistant: resolves one live 'unexpected' event, neutral (no effects), 0 minutes. */
export function assist(sim: SimState, adv: Adventure): { sim: SimState; event: string } | null {
  const ev = liveEvents(sim).find((id) => findEvent(adv, id)?.kind === 'unexpected');
  if (!ev) return null;
  return {
    sim: { ...sim, done: [...sim.done, ev], path: [...sim.path, { event: ev, choice: -1, outcome: ASSIST_OUTCOME }] },
    event: ev,
  };
}

/** Second look: the first student whose peek is not yet seen — sets the flag and returns the text. */
export function secondLook(sim: SimState, adv: Adventure): { sim: SimState; student: Student; text: Text } | null {
  const s = adv.students.find((x) => x.peek && !sim.flags[x.peek.setFlag]);
  if (!s || !s.peek) return null;
  return { sim: { ...sim, flags: { ...sim.flags, [s.peek.setFlag]: true } }, student: s, text: s.peek.text };
}

/** Parent call: students with a home-context line (content adds Student.homeNote; hidden until then). */
export const parentCallTargets = (adv: Adventure): Student[] => adv.students.filter((s) => !!s.homeNote);

/** Rewind waits this long on the outcome card, so the teacher reads what happened before taking it back. */
export const REWIND_DWELL_MS = 1500;
/** Extra 5 minutes only in the last 10 minutes of the lesson. */
export const EXTRA_WINDOW = 10;

export type PowerupPhase = 'watch' | 'sim' | 'result' | 'other';

/** Whether a power-up applies right now (independent of owning it). */
export function applicable(id: PowerupId, ctx: { phase: PowerupPhase; sim: SimState; adv: Adventure; history: SimState[]; activeEvent: string | null; resultShownMs?: number }): boolean {
  switch (id) {
    case 'parent-call': return ctx.phase === 'watch' && parentCallTargets(ctx.adv).length > 0;
    case 'second-look': return ctx.phase === 'sim' && !ctx.activeEvent && ctx.adv.students.some((s) => s.peek && !ctx.sim.flags[s.peek.setFlag]);
    case 'rewind': return ctx.phase === 'result' && ctx.history.length > 0 && (ctx.resultShownMs ?? 0) >= REWIND_DWELL_MS;
    case 'assistant': return ctx.phase === 'sim' && !!assist(ctx.sim, ctx.adv);
    case 'extra5': return (ctx.phase === 'sim' || ctx.phase === 'result') && ctx.sim.t >= ctx.adv.lessonMinutes - EXTRA_WINDOW;
  }
}
