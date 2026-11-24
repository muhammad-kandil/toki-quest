import type { Text } from '../i18n/types';
import type { ChoiceOption } from './levelTypes';

/**
 * FINAL WORLD — The Master DLIS: the school visit.
 *
 * Not one classroom but a whole school. The player moves through six
 * contexts, each with a small dossier of mixed evidence (observation,
 * Alef data, planning, student work, assessment samples, student
 * voice, leadership priorities). For each context the player makes an
 * IMPACT CALL: is practice linked to learning, active but unverified,
 * or drifted from its purpose? Then the real test of a Master DLIS —
 * not "what is wrong?" but "where will coaching change the most?"
 */
export type EvidenceKind = 'observation' | 'alefData' | 'planning' | 'studentWork' | 'assessment' | 'studentVoice' | 'leadership';

export interface EvidenceCard {
  kind: EvidenceKind;
  title: Text;
  body: Text;
}

export type ImpactCall = 'linked' | 'unverified' | 'drifted';

export interface VisitContext {
  id: string;
  name: Text;
  /** Short line under the name on the school map. */
  tag: Text;
  sceneImage?: string;
  evidence: EvidenceCard[];
  impact: {
    correctId: ImpactCall;
    hint: Text;
    /** Shown after the correct call. */
    finding: Text;
  };
}

export interface SchoolVisitDefinition {
  id: number;
  worldId: string;
  title: Text;
  theme: Text;
  subject: Text;
  sceneImage?: string;
  scenario: Text;
  contexts: VisitContext[];
  prioritise: {
    prompt: Text;
    /** The context id where coaching has the greatest impact. */
    correctId: string;
    hint: Text;
    rationale: Text;
  };
  finalMission: {
    prompt: Text;
    options: ChoiceOption[];
    correctId: string;
    hint: Text;
  };
  finalResponse: Text;
  /** The closing message, one line per entry — shown as a slow reveal. */
  finalMessage: Text[];
  points: { contexts: number; priority: number; mission: number };
  badgeTriggers: string[];
}
