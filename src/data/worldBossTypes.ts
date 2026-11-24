import type { Text } from '../i18n/types';
import type { ChoiceOption } from './levelTypes';

/**
 * World Boss — the "pattern audit".
 *
 * A world's classrooms each show one drift. The world boss asks the
 * harder question a real DLIS faces after a week of visits: what is
 * the PATTERN? The player reviews a strip of short scenes from across
 * the school, decides for each whether it fits the suspected pattern
 * or is a false alarm, then names the pattern, judges its risk, and
 * chooses the coaching move that addresses the pattern rather than
 * any single classroom.
 *
 * This shape is reusable by every world (2–7); the content differs.
 */
export interface PatternScene {
  id: string;
  /** Where Toki is — a room, a meeting, a corridor. */
  place: Text;
  /** One or two sentences of what Toki sees. */
  observation: Text;
  /** Does this scene exhibit the pattern? Some deliberately don't. */
  fitsPattern: boolean;
  /** Shown after the player's call. */
  finding: Text;
  hint: Text;
}

export interface WorldBossDefinition {
  id: number;
  worldId: string;
  title: Text;
  theme: Text;
  subject: Text;
  sceneImage?: string;
  scenario: Text;
  scenes: PatternScene[];
  namePattern: {
    prompt: Text;
    options: ChoiceOption[];
    correctId: string;
    hint: Text;
  };
  assessRisk: {
    prompt: Text;
    correctId: 'minor' | 'moderate' | 'high' | 'lethal';
    hint: Text;
  };
  coaching: {
    prompt: Text;
    options: ChoiceOption[];
    correctId: string;
    hint: Text;
  };
  reveal: {
    whatDrifted: Text;
    whyItHappened: Text;
    howToRestore: Text;
    finalWord: Text;
  };
  points: { scenes: number; pattern: number; risk: number; coaching: number };
  badgeTriggers: string[];
}
