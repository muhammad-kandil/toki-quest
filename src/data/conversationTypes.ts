import type { Text } from '../i18n/types';

/**
 * THE COACHING CONVERSATION.
 *
 * Naming the drift and picking the right move was the easy half. The
 * hard half of coaching is the five minutes after the lesson, with a
 * person who has reasons for what they did. The teacher has a stance;
 * Toki has two lines to say. The wrong register — however correct the
 * content — closes the teacher down, and a closed teacher changes
 * nothing tomorrow.
 *
 * Effects per line:
 *   opens    the teacher leans in (shared goal + their evidence + a question)
 *   neutral  polite, true, and nothing moves (abstract, generic, or flattery)
 *   closes   judgement, jargon, or telling — the teacher defends, and the
 *            conversation ends there
 *
 * Outcome:
 *   restored   every turn opened
 *   partial    no turn closed, but at least one went nowhere
 *   unchanged  a turn closed the teacher
 */
export type TeacherStance = 'defensive' | 'tired' | 'proud' | 'eager';
export type TurnEffect = 'opens' | 'neutral' | 'closes';
export type ConversationOutcome = 'restored' | 'partial' | 'unchanged';

export interface ConversationOption {
  id: string;
  /** What Toki says. */
  label: Text;
  effect: TurnEffect;
  /** How the teacher answers that line. */
  reply: Text;
}

export interface ConversationTurn {
  /** The teacher speaks first. */
  teacherLine: Text;
  options: ConversationOption[];
}

export interface ConversationDefinition {
  teacherName: Text;
  stance: TeacherStance;
  /** Toki's read of the person before he opens his mouth. */
  read: Text;
  /** The moment: where and when the conversation happens. */
  setting: Text;
  turns: ConversationTurn[];
  outcomes: Record<ConversationOutcome, Text>;
}

/** Resolve the outcome from the effects the player's lines produced. */
export function resolveOutcome(effects: TurnEffect[], totalTurns: number): ConversationOutcome {
  if (effects.includes('closes')) return 'unchanged';
  if (effects.length < totalTurns) return 'unchanged';
  return effects.every((e) => e === 'opens') ? 'restored' : 'partial';
}

/** Share of the restore points each outcome earns. */
export const OUTCOME_CREDIT: Record<ConversationOutcome, number> = { restored: 1, partial: 0.5, unchanged: 0 };
