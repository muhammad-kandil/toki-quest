/**
 * Level data model — matches GDD §9. Levels are data, not code, so
 * content can be edited/translated/expanded without touching game
 * logic (LevelScreen.tsx and the state machine that drives it).
 *
 * Every player-facing string is a bilingual `Text` ({en, ar}) so a
 * level can never ship half-translated.
 */
import type { Text } from '../i18n/types';
import { UI } from '../i18n/ui';
import type { ConversationDefinition } from './conversationTypes';

export type RiskLevel = 'minor' | 'moderate' | 'high' | 'lethal';

export interface ChoiceOption {
  id: string;
  label: Text;
}

export interface StepDefinition {
  prompt: Text;
  options: ChoiceOption[];
  correctId: string;
  /**
   * Shown if the player picks wrong, before letting them try again.
   * Written as a question that points at a clue — never a restatement
   * of the answer.
   */
  hint: Text;
  /** Optional: the evidence spot the hint points at (highlighted in the recap). */
  hintSpotId?: string;
}

export interface ReasoningStep extends StepDefinition {
  bonusPoints: number;
}

/**
 * An evidence hotspot in the classroom scene: a point Toki can inspect
 * during Observe. Each reveals one clue. Positions are % of the scene
 * image (x from left, y from top) so they scale with the banner.
 */
export interface EvidenceSpot {
  id: string;
  x: number;
  y: number;
  label: Text;
  clue: Text;
  /** Who/what the marker shows (teacher, student, group, board, …).
   *  Optional: inferred from id/label when absent — see components/PeopleGlyphs. */
  kind?: 'teacher' | 'student' | 'group' | 'board' | 'device' | 'paper' | 'book' | 'door' | 'window' | 'clock' | 'chart' | 'lens';
}

export interface LevelDefinition {
  id: number;
  title: Text;
  theme: Text;
  /** Subject flavor for the hub — purely cosmetic. */
  subject: Text;
  sceneImage?: string;
  scenario: Text;
  /** Optional interactive Observe: 2–4 evidence spots to inspect. */
  evidence?: EvidenceSpot[];
  steps: {
    identifyDrift: StepDefinition;
    assessRisk: StepDefinition & { correctId: RiskLevel };
    chooseCoaching: StepDefinition;
    reasoning?: ReasoningStep;
  };
  /**
   * Optional: the conversation with the teacher after the coaching move
   * is chosen. When present, the `restore` points are earned through it
   * (restored = all, partial = half, unchanged = none) and a clean run
   * requires the practice to be restored. Without it, `restore` is
   * granted on reaching the reveal, as before.
   */
  conversation?: ConversationDefinition;
  reveal: {
    whatDrifted: Text;
    whyItHappened: Text;
    howToRestore: Text;
  };
  points: {
    drift: number;
    risk: number;
    coaching: number;
    restore: number;
    reasoningBonus?: number;
  };
  badgeTriggers: string[];
}

export const RISK_META: Record<RiskLevel, { label: Text; color: string }> = {
  minor: { label: UI.riskMinor, color: 'var(--risk-minor)' },
  moderate: { label: UI.riskModerate, color: 'var(--risk-moderate)' },
  high: { label: UI.riskHigh, color: 'var(--risk-high)' },
  lethal: { label: UI.riskLethal, color: 'var(--risk-lethal)' },
};

/** What each level means, in one line — shown under the options so the
 *  scale is defined before the first call, and again on the reveal as
 *  "why this level". Playtest finding: without this the risk step read
 *  as a lottery. */
export const RISK_DESC: Record<RiskLevel, Text> = {
  minor: { en: 'One lesson, one habit. A sentence from a coach fixes it.', ar: 'درس واحد، عادة واحدة. جملة من المدرّب تكفي لإصلاحها.' },
  moderate: { en: 'A routine that costs some learning every week, but has not replaced it.', ar: 'روتين يُكلّف شيئًا من التعلّم كل أسبوع، لكنه لم يحلّ محله.' },
  high: { en: 'Working against learning for this class, now — and the teacher cannot see it.', ar: 'يعمل ضد التعلّم في هذا الصف، الآن — والمعلّم لا يراه.' },
  lethal: { en: 'The practice kept its shape and lost its purpose. It looks fine, so it spreads.', ar: 'حفظت الممارسة شكلها وفقدت غايتها. تبدو سليمة، فتنتشر.' },
};

/** The four risk options are identical in every classroom — shared here. */
export const RISK_OPTIONS: ChoiceOption[] = [
  { id: 'minor', label: { en: 'Minor — a small course correction', ar: 'طفيف — تصحيح بسيط للمسار' } },
  { id: 'moderate', label: { en: 'Moderate — needs attention soon', ar: 'متوسط — يحتاج إلى انتباه قريبًا' } },
  { id: 'high', label: { en: 'High — actively undermining the lesson', ar: 'كبير — يقوّض الدرس فعليًا' } },
  { id: 'lethal', label: { en: 'Lethal Mutation — the practice has lost its purpose', ar: 'تحوّر قاتل — فقدت الممارسة غايتها' } },
];
