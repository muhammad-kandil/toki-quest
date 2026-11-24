import type { Text } from '../i18n/types';
import type { ChoiceOption, EvidenceSpot, RiskLevel } from './levelTypes';
import type { ConversationDefinition } from './conversationTypes';

/**
 * WORLD 7 — The Lethal Mutation Academy.
 *
 * Classrooms here don't play by the five-beat rules. A room may hold
 * one mutation, several, a minor drift — or nothing at all. There is
 * no multiple-choice "which drift is it"; instead the player reads the
 * evidence and files a DIAGNOSIS: tick every finding the evidence
 * supports, and nothing it doesn't. Flagging a healthy practice is
 * over-coaching, and it costs exactly as much as missing a real one —
 * because in a real school it costs more: it spends a teacher's trust.
 *
 * Risk gains a fifth option, "no drift", so the healthy classroom is
 * never given away by the option list. Coaching always offers an
 * "affirm and leave" move, so proportionate judgement is a real choice.
 */
export interface AcademyFinding {
  id: string;
  /** The claim the player can tick, e.g. "Teacher talk is replacing practice". */
  label: Text;
  /** Is this finding actually supported by the evidence? */
  present: boolean;
  /** Shown in the reveal: why it is (or isn't) a real finding here. */
  note: Text;
}

export type AcademyRisk = RiskLevel | 'none';

export interface AcademyLevelDefinition {
  id: number;
  worldId: string;
  title: Text;
  theme: Text;
  subject: Text;
  sceneImage?: string;
  scenario: Text;
  /** 4 evidence spots; clues are facts, not verdicts — the player interprets. */
  evidence: EvidenceSpot[];
  diagnosis: {
    prompt: Text;
    findings: AcademyFinding[];
    /** Shown when the player ticked something healthy. */
    hintOver: Text;
    /** Shown when the player missed a real finding. */
    hintUnder: Text;
  };
  assessRisk: {
    prompt: Text;
    correctId: AcademyRisk;
    hint: Text;
  };
  coaching: {
    prompt: Text;
    options: ChoiceOption[];
    correctId: string;
    hint: Text;
  };
  /** The conversation that delivers the move. Optional; see LevelDefinition. */
  conversation?: ConversationDefinition;
  reveal: {
    /** One line: the balanced professional judgement. */
    verdict: Text;
    whatDrifted: Text;
    whyItHappened: Text;
    howToRestore: Text;
  };
  points: { diagnosis: number; risk: number; coaching: number; conversation?: number };
  badgeTriggers: string[];
}
