import { useState } from 'react';
import type { LevelDefinition, StepDefinition } from '../data/levelTypes';
import { RISK_META, type RiskLevel } from '../data/levelTypes';
import tealHero from '../assets/raw/toki-face-teal-hero.png';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import './LevelScreen.css';

type Beat = 'observe' | 'drift' | 'risk' | 'coaching' | 'reasoning' | 'reveal';

interface LevelScreenProps {
  level: LevelDefinition;
  onComplete: (result: LevelResult) => void;
  skinId?: string;
}

export interface LevelResult {
  levelId: number;
  score: number;
  reasoningBonusEarned: boolean;
  badgesEarned: string[];
}

/** Tracks correctness per step so the final score can be tallied at
 * the reveal beat, and so wrong attempts don't block progress —
 * per GDD §3, failure is a learning beat, not a game-over.
 * attemptsToCorrect is null until the step is solved; 1 = first try. */
interface StepOutcome {
  attempts: number;
  gotItRight: boolean;
  attemptsToCorrect: number | null;
}

/** Partial-credit decay curve (locked design decision, replacing the
 * earlier all-or-nothing version): a wrong guess costs real points so
 * judgment still matters, but one slip doesn't zero out a step. Badge
 * eligibility still requires a clean, first-try run — so it keeps
 * meaning "real diagnostic skill," not "eventually got there." */
const CREDIT_BY_ATTEMPT: Record<number, number> = {
  1: 1.0,   // first try — full credit
  2: 0.6,   // one wrong guess first
  3: 0.3,   // two wrong guesses first
};
const CREDIT_FLOOR = 0.15; // 3+ wrong guesses — still something, not zero

function creditFor(attemptsToCorrect: number | null): number {
  if (attemptsToCorrect == null) return 0; // never got it right
  return CREDIT_BY_ATTEMPT[attemptsToCorrect] ?? CREDIT_FLOOR;
}

const BEAT_ORDER: Beat[] = ['observe', 'drift', 'risk', 'coaching', 'reasoning', 'reveal'];

export function LevelScreen({ level, onComplete }: LevelScreenProps) {
  const [beat, setBeat] = useState<Beat>('observe');
  const [outcomes, setOutcomes] = useState<Record<string, StepOutcome>>({});
  const [selectedWrong, setSelectedWrong] = useState<string | null>(null);
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [reactionTrigger, setReactionTrigger] = useState(0);

  // Helper: fire a reaction, bumping the trigger so identical
  // consecutive reactions (e.g. two wrong answers) both re-animate.
  const fireReaction = (kind: ReactionKind) => {
    setReaction(kind);
    setReactionTrigger((n) => n + 1);
  };

  const hasReasoning = !!level.steps.reasoning;
  const visibleBeats = hasReasoning
    ? BEAT_ORDER
    : BEAT_ORDER.filter((b) => b !== 'reasoning');
  const beatIndex = visibleBeats.indexOf(beat);

  const advance = () => {
    setSelectedWrong(null);
    setReaction(null); // clear any reaction so it never bleeds into the next beat
    const next = visibleBeats[beatIndex + 1];
    if (next) setBeat(next);
    // Note: the celebrating Toki is shown as the reveal screen's own
    // animated header (see RevealBeat), not as a floating overlay —
    // that avoids colliding with the reveal's risk badge and heading.
  };

  const recordOutcome = (stepKey: string, correct: boolean) => {
    setOutcomes((prev) => {
      const prevAttempts = prev[stepKey]?.attempts ?? 0;
      const newAttempts = prevAttempts + 1;
      const alreadySolved = prev[stepKey]?.attemptsToCorrect != null;
      return {
        ...prev,
        [stepKey]: {
          attempts: newAttempts,
          gotItRight: prev[stepKey]?.gotItRight || correct,
          // Lock in the attempt count at the moment it's first solved;
          // further correct answers (e.g. replays) don't change it.
          attemptsToCorrect: alreadySolved
            ? prev[stepKey]!.attemptsToCorrect
            : (correct ? newAttempts : null),
        },
      };
    });
  };

  const handleChoice = (stepKey: string, step: StepDefinition, choiceId: string) => {
    const correct = choiceId === step.correctId;
    recordOutcome(stepKey, correct);
    if (correct) {
      setSelectedWrong(null);
      fireReaction('affirming');
      // Slightly longer than the raw reaction pop so the affirming
      // Toki genuinely registers before the beat changes underneath it
      // (research: don't let the next screen race the feedback).
      setTimeout(advance, 500);
    } else {
      setSelectedWrong(choiceId);
      fireReaction('thoughtful');
    }
  };

  const finishLevel = () => {
    const driftCredit = creditFor(outcomes['drift']?.attemptsToCorrect ?? null);
    const riskCredit = creditFor(outcomes['risk']?.attemptsToCorrect ?? null);
    const coachingCredit = creditFor(outcomes['coaching']?.attemptsToCorrect ?? null);
    const reasoningCredit = creditFor(outcomes['reasoning']?.attemptsToCorrect ?? null);

    let score = 0;
    score += Math.round(level.points.drift * driftCredit);
    score += Math.round(level.points.risk * riskCredit);
    score += Math.round(level.points.coaching * coachingCredit);
    // "Restore" points are awarded for reaching the reveal at all —
    // completing the loop is the coaching being delivered (GDD §3).
    score += level.points.restore;
    if (level.points.reasoningBonus) {
      score += Math.round(level.points.reasoningBonus * reasoningCredit);
    }

    // Badge requires a genuinely clean run: all three core judgments
    // right on the FIRST try (full credit), not just "eventually."
    // This is what keeps the badge meaning real diagnostic skill.
    const cleanRun = driftCredit === 1 && riskCredit === 1 && coachingCredit === 1;
    const badgesEarned = cleanRun ? level.badgeTriggers : [];

    onComplete({
      levelId: level.id,
      score,
      reasoningBonusEarned: reasoningCredit > 0,
      badgesEarned,
    });
  };

  return (
    <div className="level-screen">
      <LevelProgress current={beatIndex + 1} total={visibleBeats.length} />
      <ReactionToki kind={reaction} trigger={reactionTrigger} />

      {beat === 'observe' && (
        <ObserveBeat level={level} onContinue={advance} />
      )}

      {beat === 'drift' && (
        <ChoiceBeat
          stepKey="drift"
          heading="Identify the Drift"
          step={level.steps.identifyDrift}
          selectedWrong={selectedWrong}
          onChoose={(id) => handleChoice('drift', level.steps.identifyDrift, id)}
        />
      )}

      {beat === 'risk' && (
        <ChoiceBeat
          stepKey="risk"
          heading="Assess the Risk"
          step={level.steps.assessRisk}
          selectedWrong={selectedWrong}
          onChoose={(id) => handleChoice('risk', level.steps.assessRisk, id)}
        />
      )}

      {beat === 'coaching' && (
        <ChoiceBeat
          stepKey="coaching"
          heading="Choose the Coaching Move"
          step={level.steps.chooseCoaching}
          selectedWrong={selectedWrong}
          onChoose={(id) => handleChoice('coaching', level.steps.chooseCoaching, id)}
        />
      )}

      {beat === 'reasoning' && level.steps.reasoning && (
        <ChoiceBeat
          stepKey="reasoning"
          heading="Why? (optional bonus)"
          step={level.steps.reasoning}
          selectedWrong={selectedWrong}
          onChoose={(id) => handleChoice('reasoning', level.steps.reasoning!, id)}
          skippable
          onSkip={advance}
        />
      )}

      {beat === 'reveal' && (
        <RevealBeat
          level={level}
          outcomes={outcomes}
          onFinish={finishLevel}
        />
      )}
    </div>
  );
}

function LevelProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="level-progress" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`level-progress__dot ${i < current ? 'level-progress__dot--filled' : ''}`}
        />
      ))}
    </div>
  );
}

function ObserveBeat({
  level,
  onContinue,
}: {
  level: LevelDefinition;
  onContinue: () => void;
}) {
  return (
    <div className="beat beat--observe">
      {level.sceneImage ? (
        // Toki now stands *inside* the scene (walks in), so no separate
        // avatar below it — that would double Toki up.
        <SceneHeader image={level.sceneImage} alt={`${level.title} classroom`} />
      ) : (
        <img src={tealHero} alt="" className="beat__toki-avatar" />
      )}
      <p className="beat__eyebrow">{level.theme}</p>
      <h2 className="beat__title">{level.title}</h2>
      <p className="beat__scenario">{level.scenario}</p>
      <button className="beat__cta" onClick={onContinue}>
        Look Closer
      </button>
    </div>
  );
}

interface ChoiceBeatProps {
  stepKey: string;
  heading: string;
  step: StepDefinition;
  selectedWrong: string | null;
  onChoose: (id: string) => void;
  skippable?: boolean;
  onSkip?: () => void;
}

function ChoiceBeat({ heading, step, selectedWrong, onChoose, skippable, onSkip }: ChoiceBeatProps) {
  return (
    <div className="beat beat--choice">
      <h3 className="beat__heading">{heading}</h3>
      <p className="beat__prompt">{step.prompt}</p>
      <div className="choice-list">
        {step.options.map((opt) => {
          const isWrongSelection = selectedWrong === opt.id;
          return (
            <button
              key={opt.id}
              className={`choice-list__item ${isWrongSelection ? 'choice-list__item--wrong' : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {selectedWrong && (
        <p className="beat__hint"><span className="hint-mark">?</span> {step.hint}</p>
      )}
      {skippable && (
        <button className="beat__skip" onClick={onSkip}>
          Skip bonus question
        </button>
      )}
    </div>
  );
}

function RevealBeat({
  level,
  outcomes,
  onFinish,
}: {
  level: LevelDefinition;
  outcomes: Record<string, StepOutcome>;
  onFinish: () => void;
}) {
  const riskId = level.steps.assessRisk.correctId as RiskLevel;
  const riskMeta = RISK_META[riskId];

  return (
    <div className="beat beat--reveal">
      <img
        src={celebratingToki}
        alt=""
        className="reveal__celebrate-toki"
      />
      <span className="reveal__risk-badge" style={{ background: riskMeta.color }}>
        {riskMeta.label}
      </span>
      <h3 className="beat__heading">Here's what was really happening</h3>

      <div className="reveal__block">
        <p className="reveal__label">What drifted</p>
        <p className="reveal__text">{level.reveal.whatDrifted}</p>
      </div>
      <div className="reveal__block">
        <p className="reveal__label">Why it happened</p>
        <p className="reveal__text">{level.reveal.whyItHappened}</p>
      </div>
      <div className="reveal__block">
        <p className="reveal__label">How Toki restored it</p>
        <p className="reveal__text">{level.reveal.howToRestore}</p>
      </div>

      <ScoreSummary level={level} outcomes={outcomes} />

      <button className="beat__cta" onClick={onFinish}>
        Continue
      </button>
    </div>
  );
}

function ScoreSummary({
  level,
  outcomes,
}: {
  level: LevelDefinition;
  outcomes: Record<string, StepOutcome>;
}) {
  const rows = [
    { label: 'Drift identified', key: 'drift', points: level.points.drift },
    { label: 'Risk assessed', key: 'risk', points: level.points.risk },
    { label: 'Coaching move', key: 'coaching', points: level.points.coaching },
  ];
  if (level.points.reasoningBonus) {
    rows.push({ label: 'Reasoning bonus', key: 'reasoning', points: level.points.reasoningBonus });
  }

  return (
    <div className="score-summary">
      <p className="score-summary__note">
        Full points for a right call on the first try. Each guess after
        that still counts for something — but a clean first-try run is
        what earns the badge.
      </p>
      {rows.map((row) => {
        const attempts = outcomes[row.key]?.attemptsToCorrect ?? null;
        const credit = creditFor(attempts);
        const earnedPoints = Math.round(row.points * credit);
        const label =
          attempts === 1 ? 'first try'
          : attempts != null ? `try ${attempts}`
          : 'not solved';
        return (
          <div key={row.label} className="score-summary__row">
            <span className="score-summary__label">
              <StatusMark credit={credit} />
              {row.label}
              <em className="score-summary__attempt">({label})</em>
            </span>
            <span>+{earnedPoints}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Small styled status mark instead of emoji — some emoji (like the
 * "repeat" glyph previously used here) don't render reliably inside
 * Telegram's in-app webview and show as a broken box. This is plain
 * text/CSS, guaranteed to render everywhere. */
function StatusMark({ credit }: { credit: number }) {
  if (credit === 1) return <span className="status-mark status-mark--full">✓</span>;
  if (credit > 0) return <span className="status-mark status-mark--partial">~</span>;
  return <span className="status-mark status-mark--none">–</span>;
}
