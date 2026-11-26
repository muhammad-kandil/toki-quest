/**
 * Small authoring helpers for mission files. Pure data constructors: they
 * only shorten the source; the objects they return are plain contract types.
 * Every text is an [en, ar] pair.
 */
import type { Choice, Clue, Effect, EvidenceProfile, Outcome } from '../../types';
import type { Text } from '../../../i18n/types';
import { t } from '../../../i18n/types';

export type Pair = [string, string];
export const T = (p: Pair): Text => t(p[0], p[1]);

/** Effect on one student: understanding, engagement. */
export const fx = (student: string, understanding = 0, engagement = 0): Effect => ({ student, understanding, engagement });

/** Outcome. */
export const out = (
  id: string,
  tone: Outcome['tone'],
  title: Pair,
  body: Pair,
  effects: Effect[] = [],
  extra: Partial<Outcome> = {},
): Outcome => ({ id, tone, title: T(title), body: T(body), effects, ...extra });

/** Choice (1 narrative minute unless given). */
export const ch = (label: Pair, sub: Pair, outcome: Choice['outcome'], extra: Partial<Choice> = {}): Choice => ({
  label: T(label),
  sub: T(sub),
  minutes: 1,
  outcome,
  ...extra,
});

/** Clue: id, label, neutral prompt. */
export const clue = (id: string, label: Pair, text: Pair): Clue => ({ id, label: T(label), text: T(text) });

/** Evidence profile: every clue id gets a text. */
export const profile = (id: string, weight: number, setFlag: string, clues: Record<string, Pair>): EvidenceProfile => ({
  id,
  weight,
  setFlag,
  clues: Object.fromEntries(Object.entries(clues).map(([k, v]) => [k, T(v)])),
});
