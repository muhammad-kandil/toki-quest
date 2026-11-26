/**
 * Non-MCQ interactions (GAME_PACKAGE.md "Interactions"). Pure checks.
 *
 * PROPOSED CONTRACT (not yet in types.ts — read from `ClassEvent.interaction`):
 * an event may carry one interaction that must be completed before its
 * choices unlock. Nothing is ever marked wrong: a check returns which items
 * don't fit yet so the UI can nudge.
 */
import type { ClassEvent, Stage } from '../types';
import type { Text } from '../../i18n/types';

export type Interaction =
  | { type: 'investigate' }                                                                  // uses ClassEvent.investigate
  | { type: 'compare'; prompt?: Text; items: { id: string; label: Text; text: Text }[] }       // reveal-and-compare
  | { type: 'match'; prompt?: Text; pairs: { id: string; evidence: Text; meaning: Text }[] }   // evidence → interpretation
  | { type: 'sort'; prompt?: Text; buckets: { id: string; label: Text }[]; items: { id: string; text: Text; buckets: string[] }[] }
  | { type: 'order'; prompt?: Text; items: { id: string; text: Text }[] }                     // listed in the right order
  | { type: 'hint'; prompt?: Text; hints: Text[] }                                            // progressive hints before choosing a support
  | { type: 'pattern'; prompt: Text; target: string; cells: { id: string; label: Text; text: Text; tag: string }[] } // tap response patterns
  | { type: 'plan'; prompt?: Text; slots: { id: string; label: Text }[]; cards: { id: string; text: Text; slots: string[] }[] }; // assemble a plan

export type InteractionType = Interaction['type'];

export const interactionOf = (ev: ClassEvent): Interaction | undefined =>
  (ev as ClassEvent & { interaction?: Interaction }).interaction ?? (ev.investigate ? { type: 'investigate' } : undefined);

export interface Check { complete: boolean; pending: string[] }

/** Match: every evidence id mapped to its own meaning. */
export function checkMatch(pairs: { id: string }[], chosen: Record<string, string | undefined>): Check {
  const pending = pairs.filter((p) => chosen[p.id] !== p.id).map((p) => p.id);
  return { complete: pending.length === 0, pending };
}

/** Sort (and plan): every item placed in one of its allowed buckets (several may be right). */
export function checkSort(items: { id: string; buckets: string[] }[], placed: Record<string, string | undefined>): Check {
  const pending = items.filter((i) => !placed[i.id] || !i.buckets.includes(placed[i.id]!)).map((i) => i.id);
  return { complete: pending.length === 0, pending };
}

/** Order: the sequence as listed in the content is the reference. */
export function checkOrder(items: { id: string }[], order: string[]): Check {
  const pending = items.filter((it, i) => order[i] !== it.id).map((it) => it.id);
  return { complete: order.length === items.length && pending.length === 0, pending };
}

/** Pattern: all cells with the target tag tapped, and none without it. */
export function checkPattern(cells: { id: string; tag: string }[], target: string, tapped: string[]): Check {
  const want = cells.filter((c) => c.tag === target).map((c) => c.id);
  const pending = [...want.filter((id) => !tapped.includes(id)), ...tapped.filter((id) => !want.includes(id))];
  return { complete: pending.length === 0, pending };
}

/** Plan: every slot gets one card that fits it. */
export function checkPlan(slots: { id: string }[], cards: { id: string; slots: string[] }[], placed: Record<string, string | undefined>): Check {
  const pending = slots.filter((s) => {
    const cardId = Object.keys(placed).find((c) => placed[c] === s.id);
    const card = cards.find((c) => c.id === cardId);
    return !card || !card.slots.includes(s.id);
  }).map((s) => s.id);
  return { complete: pending.length === 0, pending };
}

/** Swap an item one step up/down (tap alternative to dragging in an order list). */
export function moveItem(order: string[], id: string, dir: -1 | 1): string[] {
  const i = order.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= order.length) return order;
  const next = [...order];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** Stable shuffle for presenting items (seeded by the caller's rand). */
export function shuffled<T>(items: T[], rand: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export type { Stage };
