/**
 * Level data model — matches GDD §9. Levels are data, not code, so
 * content can be edited/translated/expanded without touching game
 * logic (LevelScreen.tsx and the state machine that drives it).
 */

export type RiskLevel = 'minor' | 'moderate' | 'high' | 'lethal';

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface StepDefinition {
  prompt: string;
  options: ChoiceOption[];
  correctId: string;
  /** Shown if the player picks wrong, before letting them try again. */
  hint: string;
}

export interface ReasoningStep extends StepDefinition {
  bonusPoints: number;
}

export interface LevelDefinition {
  id: number;
  title: string;
  theme: string;
  /** Subject flavor for the hub — a classroom is always *some* subject.
   * Purely cosmetic (door label/color); doesn't change gameplay. */
  subject: string;
  /** Path to the establishing-shot scene image shown at the top of the
   * Observe beat — imported by the level file itself. */
  sceneImage?: string;
  scenario: string;
  steps: {
    identifyDrift: StepDefinition;
    assessRisk: StepDefinition & { correctId: RiskLevel };
    chooseCoaching: StepDefinition;
    reasoning?: ReasoningStep;
  };
  reveal: {
    whatDrifted: string;
    whyItHappened: string;
    howToRestore: string;
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

export const RISK_META: Record<RiskLevel, { label: string; color: string }> = {
  minor: { label: 'Minor Drift', color: 'var(--risk-minor)' },
  moderate: { label: 'Moderate Drift', color: 'var(--risk-moderate)' },
  high: { label: 'High Drift', color: 'var(--risk-high)' },
  lethal: { label: 'Lethal Mutation', color: 'var(--risk-lethal)' },
};
