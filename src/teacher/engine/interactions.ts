/**
 * Non-MCQ interactions (GAME_PACKAGE.md "Interactions"). Pure checks over
 * ClassEvent.interaction + ClassEvent.task. Answers come from the evidence on
 * the cards; nothing is ever marked wrong — a check returns which items don't
 * fit yet so the UI can nudge. The outcome follows the choice, not the score.
 */
import type { ClassEvent, InteractionType, Task } from '../types';

export type { InteractionType };

export const interactionOf = (ev: ClassEvent): InteractionType | undefined =>
  ev.interaction ?? (ev.investigate ? 'investigate' : undefined);

export interface Check { complete: boolean; pending: string[] }

/** match / sort: every card placed on `answer[card]`. */
export function checkCardToTarget(task: Task, placed: Record<string, string | undefined>): Check {
  const answer = task.answer ?? {};
  const pending = Object.keys(answer).filter((card) => placed[card] !== answer[card]);
  return { complete: pending.length === 0, pending };
}

/** plan: every slot holds `answer[slot]` (extra evidence cards may stay out). */
export function checkPlan(task: Task, placed: Record<string, string | undefined>): Check {
  const answer = task.answer ?? {};
  // placed is card → slot; invert
  const inSlot: Record<string, string> = {};
  for (const [card, slot] of Object.entries(placed)) if (slot) inSlot[slot] = card;
  const pending = Object.keys(answer).filter((slot) => inSlot[slot] !== answer[slot]);
  return { complete: pending.length === 0, pending };
}

/** order: the evidence-determined sequence. */
export function checkOrder(task: Task, order: string[]): Check {
  const want = task.order ?? [];
  const pending = want.filter((id, i) => order[i] !== id);
  return { complete: order.length === want.length && pending.length === 0, pending };
}

/** pattern: every response tagged with the pattern that holds it. */
export function checkPattern(task: Task, tags: Record<string, string | undefined>): Check {
  const pending: string[] = [];
  for (const p of task.patterns ?? []) for (const c of p.cards) if (tags[c] !== p.id) pending.push(c);
  return { complete: pending.length === 0, pending };
}

/** Where each card belongs (test hooks and nudges). */
export function fitOf(type: InteractionType, task: Task, card: string): string | undefined {
  if (type === 'match' || type === 'sort') return task.answer?.[card];
  if (type === 'plan') return Object.keys(task.answer ?? {}).find((slot) => task.answer![slot] === card);
  if (type === 'pattern') return task.patterns?.find((p) => p.cards.includes(card))?.id;
  if (type === 'order') { const i = task.order?.indexOf(card) ?? -1; return i >= 0 ? String(i) : undefined; }
  return undefined;
}

/** Swap an item one step (tap alternative to dragging in an order list). */
export function moveItem(order: string[], id: string, dir: -1 | 1): string[] {
  const i = order.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= order.length) return order;
  const next = [...order];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** Seeded shuffle for presenting items. */
export function shuffled<T>(items: T[], rand: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
