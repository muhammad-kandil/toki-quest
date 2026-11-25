import { useEffect, useRef, useState } from 'react';
import type { LevelDefinition, StepDefinition } from '../data/levelTypes';
import { RISK_META, RISK_DESC, type RiskLevel } from '../data/levelTypes';
import { getBadge } from '../data/badges';
import tealHero from '../assets/raw/toki-face-teal-hero.png';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import affirmingToki from '../assets/raw/toki-reaction-affirming.png';
import thoughtfulToki from '../assets/raw/toki-reaction-thoughtful.png';

/** The reveal face follows what actually happened in the room. */
const revealFace = (outcome: string | null | undefined) =>
  outcome === 'unchanged' ? thoughtfulToki : outcome === 'partial' ? affirmingToki : celebratingToki;
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import { BadgeIcon } from '../components/BadgeIcon';
import { FeedbackCard } from '../components/FeedbackCard';
import { EvidenceRecap } from '../components/EvidenceRecap';
import { BeatIcon } from '../components/PeopleGlyphs';
import { ConversationBeat, OUTCOME_LABEL } from './ConversationBeat';
import { OUTCOME_CREDIT, type ConversationOutcome } from '../data/conversationTypes';
import { useLocale } from '../i18n/LocaleContext';
import { useVoice } from '../audio/useVoice';
import { UI, fmt } from '../i18n/ui';
import type { Text } from '../i18n/types';
import { sfx } from '../audio/sfx';
import './LevelScreen.css';

type Beat = 'observe' | 'drift' | 'risk' | 'coaching' | 'conversation' | 'reasoning' | 'reveal';

interface LevelScreenProps {
  level: LevelDefinition;
  onComplete: (result: LevelResult) => void;
  /** Badges already held — so the reveal only celebrates NEW ones. */
  heldBadges: string[];
}

export interface LevelResult {
  levelId: number;
  score: number;
  reasoningBonusEarned: boolean;
  badgesEarned: string[];
  /**
   * Attempts-to-correct per step (1 = first try). Steps never solved
   * (or skipped) are absent. Keys per screen: classroom drift/risk/
   * coaching/reasoning; academy diagnosis/risk/coaching; world boss
   * scenes/pattern/risk/coaching; school visit contexts/priority/mission.
   */
  attempts?: Record<string, number>;
  /** How the coaching conversation ended, when the level has one. */
  outcome?: ConversationOutcome;
}

interface StepOutcome {
  attempts: number;
  gotItRight: boolean;
  attemptsToCorrect: number | null;
}

/** Partial-credit decay: a wrong guess costs real points so judgment
 * matters, but one slip never zeroes a step. Badges still need a clean
 * first-try run — "real diagnostic skill", not "eventually got there". */
const CREDIT_BY_ATTEMPT: Record<number, number> = { 1: 1.0, 2: 0.6, 3: 0.3 };
const CREDIT_FLOOR = 0.15;

function creditFor(attemptsToCorrect: number | null): number {
  if (attemptsToCorrect == null) return 0;
  return CREDIT_BY_ATTEMPT[attemptsToCorrect] ?? CREDIT_FLOOR;
}

/** Justify the move first ("why is this the right move?"), then say it
 * to a person. The reasoning is the thinking; the conversation is the
 * delivery — and a teacher may still reject a well-reasoned move. */
const BEAT_ORDER: Beat[] = ['observe', 'drift', 'risk', 'coaching', 'reasoning', 'conversation', 'reveal'];
const RISK_ORDER: RiskLevel[] = ['minor', 'moderate', 'high', 'lethal'];

export function LevelScreen({ level, onComplete, heldBadges }: LevelScreenProps) {
  const { tx } = useLocale();
  const [beat, setBeat] = useState<Beat>('observe');
  const [outcomes, setOutcomes] = useState<Record<string, StepOutcome>>({});
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [reactionTrigger, setReactionTrigger] = useState(0);
  const [outcome, setOutcome] = useState<ConversationOutcome | null>(null);

  const fireReaction = (kind: ReactionKind) => {
    setReaction(kind);
    setReactionTrigger((n) => n + 1);
  };

  const hasReasoning = !!level.steps.reasoning;
  const hasConversation = !!level.conversation;
  const visibleBeats = BEAT_ORDER.filter((b) => (b !== 'reasoning' || hasReasoning) && (b !== 'conversation' || hasConversation));
  const beatIndex = visibleBeats.indexOf(beat);

  const advance = () => {
    setWrongIds([]);
    setSelectedRight(null);
    setReaction(null);
    const next = visibleBeats[beatIndex + 1];
    if (next) setBeat(next);
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
          attemptsToCorrect: alreadySolved ? prev[stepKey]!.attemptsToCorrect : correct ? newAttempts : null,
        },
      };
    });
  };

  const handleChoice = (stepKey: string, step: StepDefinition, choiceId: string) => {
    const correct = choiceId === step.correctId;
    recordOutcome(stepKey, correct);
    // Risk picks get a pitch cue first (falls with severity), then the verdict.
    const riskLevel = stepKey === 'risk' ? RISK_ORDER.indexOf(choiceId as RiskLevel) : -1;
    const delay = riskLevel >= 0 ? 160 : 0;
    if (riskLevel >= 0) sfx.play('risk', { level: riskLevel });
    if (correct) {
      setSelectedRight(choiceId);
      setTimeout(() => sfx.play('correct'), delay);
      fireReaction('affirming');
      setTimeout(advance, 500 + delay);
    } else {
      setWrongIds((w) => (w.includes(choiceId) ? w : [...w, choiceId]));
      setTimeout(() => sfx.play('lookAgain'), delay);
      fireReaction('thoughtful');
    }
  };

  const computeResult = (): LevelResult => {
    const driftCredit = creditFor(outcomes['drift']?.attemptsToCorrect ?? null);
    const riskCredit = creditFor(outcomes['risk']?.attemptsToCorrect ?? null);
    const coachingCredit = creditFor(outcomes['coaching']?.attemptsToCorrect ?? null);
    const reasoningCredit = creditFor(outcomes['reasoning']?.attemptsToCorrect ?? null);
    // The conversation decides whether the practice was actually restored.
    // Without one (older worlds), reaching the reveal restores it.
    const restoreCredit = hasConversation ? (outcome ? OUTCOME_CREDIT[outcome] : 0) : 1;
    let score = 0;
    score += Math.round(level.points.drift * driftCredit);
    score += Math.round(level.points.risk * riskCredit);
    score += Math.round(level.points.coaching * coachingCredit);
    score += Math.round(level.points.restore * restoreCredit);
    if (level.points.reasoningBonus) score += Math.round(level.points.reasoningBonus * reasoningCredit);
    const cleanRun = driftCredit === 1 && riskCredit === 1 && coachingCredit === 1 && restoreCredit === 1;
    const attempts: Record<string, number> = {};
    for (const key of ['drift', 'risk', 'coaching', 'reasoning']) {
      const a = outcomes[key]?.attemptsToCorrect;
      if (a != null) attempts[key] = a;
    }
    return {
      levelId: level.id,
      score,
      reasoningBonusEarned: reasoningCredit > 0,
      badgesEarned: cleanRun ? level.badgeTriggers : [],
      attempts,
      ...(hasConversation && outcome ? { outcome } : {}),
    };
  };

  return (
    <div className="level-screen">
      <LevelProgress current={beatIndex + 1} total={visibleBeats.length} beats={visibleBeats} />
      <ReactionToki kind={reaction} trigger={reactionTrigger} />

      {beat === 'observe' && <ObserveBeat level={level} onContinue={() => { sfx.play('tap'); advance(); }} />}

      {beat === 'drift' && (
        <ChoiceBeat heading={tx(UI.identifyDrift)} step={level.steps.identifyDrift} wrongIds={wrongIds} selectedRight={selectedRight}
          onChoose={(id) => handleChoice('drift', level.steps.identifyDrift, id)} recap={level.evidence} />
      )}
      {beat === 'risk' && (
        <ChoiceBeat heading={tx(UI.assessRisk)} step={level.steps.assessRisk} wrongIds={wrongIds} selectedRight={selectedRight}
          onChoose={(id) => handleChoice('risk', level.steps.assessRisk, id)} recap={level.evidence} />
      )}
      {beat === 'coaching' && (
        <ChoiceBeat heading={tx(UI.chooseCoaching)} step={level.steps.chooseCoaching} wrongIds={wrongIds} selectedRight={selectedRight}
          onChoose={(id) => handleChoice('coaching', level.steps.chooseCoaching, id)} recap={level.evidence} />
      )}
      {beat === 'reasoning' && level.steps.reasoning && (
        <ChoiceBeat heading={tx(hasConversation ? UI.whyThisMove : UI.whyBonus)} step={level.steps.reasoning} wrongIds={wrongIds} selectedRight={selectedRight}
          onChoose={(id) => handleChoice('reasoning', level.steps.reasoning!, id)} skippable onSkip={() => { sfx.play('tap'); advance(); }} recap={level.evidence} />
      )}
      {beat === 'conversation' && level.conversation && (
        <ConversationBeat conversation={level.conversation} onDone={(o) => { setOutcome(o); advance(); }} />
      )}
      {beat === 'reveal' && (
        <RevealBeat level={level} outcomes={outcomes} result={computeResult()} heldBadges={heldBadges} outcome={outcome}
          onFinish={() => { sfx.play('tap'); onComplete(computeResult()); }} />
      )}
    </div>
  );
}

const BEAT_LABEL: Record<Beat, Text> = {
  observe: UI['art.beatObserve'], drift: UI['art.beatDrift'], risk: UI['art.beatRisk'], coaching: UI['art.beatCoaching'],
  reasoning: UI['art.beatReasoning'], conversation: UI['art.beatConversation'], reveal: UI['art.beatReveal'],
};

/** The beat strip: each step is a small icon (eye, magnifier, gauge,
 *  speech bubble, lightbulb, teacher-and-bubble, open door) rather than
 *  an anonymous dot. Class names are kept for tests. */
function LevelProgress({ current, total, beats }: { current: number; total: number; beats: Beat[] }) {
  const { tx } = useLocale();
  return (
    <div className="level-progress level-progress--icons" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {beats.map((b, i) => (
        <span
          key={b}
          className={`level-progress__dot ${i < current ? 'level-progress__dot--filled' : ''} ${i === current - 1 ? 'level-progress__dot--current' : ''}`}
          title={tx(BEAT_LABEL[b])}
        >
          <BeatIcon kind={b} size={14} />
        </span>
      ))}
    </div>
  );
}

/**
 * Observe: Toki enters the room; evidence markers appear over the
 * scene. The player inspects each one (a clue card slides in), and
 * only once all have been examined does Toki have "seen enough" to
 * make a call. Reading becomes looking.
 */
export type ObservableScene = Pick<LevelDefinition, 'title' | 'theme' | 'scenario' | 'sceneImage' | 'evidence'> & { subject?: LevelDefinition['subject'] };

export function ObserveBeat({ level, onContinue, ctaLabel }: { level: ObservableScene; onContinue: () => void; ctaLabel?: string }) {
  const { tx } = useLocale();
  const voiceCtl = useVoice();
  const spots = level.evidence ?? [];
  const [inspected, setInspected] = useState<Set<string>>(new Set());
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const allDone = spots.length === 0 || inspected.size >= spots.length;

  const inspect = (id: string) => {
    setActiveClue(id);
    setInspected((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    if (spots.length && inspected.size === spots.length) sfx.play('evidenceAll');
  }, [inspected.size, spots.length]);

  // Read aloud: the scenario, once, as the room opens; stop when we leave.
  useEffect(() => {
    voiceCtl.speak(tx(level.scenario), 'narrator');
    return () => voiceCtl.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clue = spots.find((s) => s.id === activeClue);

  return (
    <div className="beat beat--observe">
      {level.sceneImage ? (
        <SceneHeader image={level.sceneImage} alt={`${tx(level.title)} classroom`} evidence={spots} inspected={inspected} onInspect={inspect} />
      ) : (
        <img src={tealHero} alt="" className="beat__toki-avatar" />
      )}
      {level.subject && <p className="beat__eyebrow">{tx(level.subject)}</p>}
      <h2 className="beat__title">{tx(level.title)}</h2>
      <p className="beat__scenario">{tx(level.scenario)}</p>

      {spots.length > 0 && (
        <div className="evidence">
          {clue ? (
            <div className="evidence__card" key={clue.id}>
              <p className="evidence__label">{tx(clue.label)}</p>
              <p className="evidence__clue">{tx(clue.clue)}</p>
            </div>
          ) : (
            <p className="evidence__hint">{tx(UI.inspectHint)}</p>
          )}
          <div className="evidence__tally" aria-hidden="true">
            {spots.map((s) => <span key={s.id} className={`evidence__pip ${inspected.has(s.id) ? 'evidence__pip--on' : ''}`} />)}
          </div>
        </div>
      )}

      <button className={`beat__cta ${allDone ? '' : 'beat__cta--waiting'}`} onClick={onContinue} disabled={!allDone}>
        {allDone ? (ctaLabel ?? tx(UI.lookCloser)) : `${inspected.size}/${spots.length}`}
      </button>
      {allDone && spots.length > 0 && <p className="evidence__ready">{tx(UI.inspectedAll)}</p>}
    </div>
  );
}

interface ChoiceBeatProps {
  heading: string;
  step: StepDefinition;
  wrongIds: string[];
  selectedRight?: string | null;
  onChoose: (id: string) => void;
  skippable?: boolean;
  onSkip?: () => void;
  recap?: LevelDefinition['evidence'];
}

function ChoiceBeat({ heading, step, wrongIds, selectedRight, onChoose, skippable, onSkip, recap }: ChoiceBeatProps) {
  const { tx } = useLocale();
  // After a miss, the notebook opens itself and points at the clue the
  // hint is about — the hint is a question, the evidence is the answer.
  // Every wrong pick stays marked, so the player is never asked to
  // remember which doors are already closed. The hint sits above the
  // options so it is on screen at phone height.
  const missed = wrongIds.length > 0;
  const hintSpot = missed && step.hintSpotId ? recap?.find((s) => s.id === step.hintSpotId) ?? null : null;
  const isRisk = step.options.some((o) => o.id === 'lethal') && step.options.length === 4;
  const hintRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (missed) hintRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [wrongIds.length, missed]);
  return (
    <div className="beat beat--choice">
      <h3 className="beat__heading">{heading}</h3>
      <p className="beat__prompt">{tx(step.prompt)}</p>
      {isRisk && <p className="beat__scale-note">{tx(UI.riskScaleNote)}</p>}
      <EvidenceRecap spots={recap} open={missed} highlightId={hintSpot?.id ?? null} />
      {missed && (
        <p className="beat__hint" ref={hintRef}>
          <span className="hint-mark">?</span> {tx(step.hint)}
          {hintSpot && <span className="hint-spot">→ {tx(hintSpot.label)}</span>}
          {isRisk && wrongIds.length >= 2 && <span className="hint-second">{tx(UI.riskSecondHint)}</span>}
        </p>
      )}
      <div className="choice-list">
        {step.options.map((opt, i) => {
          const desc = isRisk ? RISK_DESC[opt.id as RiskLevel] : null;
          return (
            <button
              key={opt.id}
              className={`choice-list__item ${wrongIds.includes(opt.id) ? 'choice-list__item--wrong' : ''} ${selectedRight === opt.id ? 'choice-list__item--right' : ''}`}
              style={{ animationDelay: `${i * 55}ms` }}
              onClick={() => onChoose(opt.id)}
              disabled={wrongIds.includes(opt.id)}
            >
              {tx(opt.label)}
              {desc && <small className="choice-list__desc">{tx(desc)}</small>}
            </button>
          );
        })}
      </div>
      {skippable && (
        <button className="beat__skip" onClick={onSkip}>{tx(UI.skipBonus)}</button>
      )}
    </div>
  );
}

function RevealBeat({ level, outcomes, result, heldBadges, outcome, onFinish }: {
  level: LevelDefinition;
  outcomes: Record<string, StepOutcome>;
  result: LevelResult;
  heldBadges: string[];
  outcome: ConversationOutcome | null;
  onFinish: () => void;
}) {
  const { tx } = useLocale();
  const voiceCtl = useVoice();
  const riskId = level.steps.assessRisk.correctId as RiskLevel;
  const riskMeta = RISK_META[riskId];
  const newBadges = result.badgesEarned.filter((b) => !heldBadges.includes(b));

  useEffect(() => {
    sfx.play(riskId === 'lethal' ? 'lethal' : 'reveal');
    if (newBadges.length) setTimeout(() => sfx.play('badge'), 900);
    // Read aloud: the verdict and the first block.
    voiceCtl.speak(`${tx(riskMeta.label)}. ${tx(level.reveal.whatDrifted)}`, 'narrator');
    return () => voiceCtl.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="beat beat--reveal">
      <img src={revealFace(outcome)} alt="" className="reveal__celebrate-toki" />
      <span className="reveal__risk-badge" style={{ background: riskMeta.color }}>{tx(riskMeta.label)}</span>
      <h3 className="beat__heading">{tx(UI.revealHeading)}</h3>
      <p className="beat__eyebrow reveal__theme">{tx(level.theme)}</p>
      <p className="reveal__why-risk"><strong>{tx(UI.whyThisLevel)}</strong> {tx(RISK_DESC[riskId])}</p>

      <RevealBlock label={UI.whatDrifted} text={level.reveal.whatDrifted} />
      <RevealBlock label={UI.whyItHappened} text={level.reveal.whyItHappened} />
      {level.conversation && outcome ? (
        <div className="reveal__block">
          <p className="reveal__label">{tx(UI.whatHappenedNext)}</p>
          <span className={`reveal__risk-badge reveal__outcome convo__outcome--${outcome}`} style={{ background: outcome === 'restored' ? 'var(--toki-teal)' : outcome === 'partial' ? 'var(--toki-orange-soft)' : 'var(--risk-lethal)' }}>{tx(OUTCOME_LABEL[outcome])}</span>
          <p className="reveal__text">{tx(level.conversation.outcomes[outcome])}</p>
        </div>
      ) : null}
      <RevealBlock label={level.conversation ? (outcome === 'restored' ? UI.howToRestore : UI.howItCouldHaveGone) : UI.howRestored} text={level.reveal.howToRestore} />

      <ScoreSummary level={level} outcomes={outcomes} outcome={outcome} />
      <FeedbackCard levelId={level.id} outcome={result.outcome} attempts={result.attempts} />

      {newBadges.length > 0 && (
        <div className="badge-earned">
          {newBadges.map((id) => {
            const b = getBadge(id);
            if (!b) return null;
            return (
              <div key={id} className="badge-earned__item">
                <BadgeIcon glyph={b.glyph} color={b.color} size={48} />
                <div>
                  <p className="badge-earned__eyebrow">{tx(UI.badgeEarned)}</p>
                  <p className="badge-earned__name">{tx(b.name)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button className="beat__cta" onClick={onFinish}>{tx(UI.continue)}</button>
    </div>
  );
}

function RevealBlock({ label, text }: { label: Text; text: Text }) {
  const { tx } = useLocale();
  return (
    <div className="reveal__block">
      <p className="reveal__label">{tx(label)}</p>
      <p className="reveal__text">{tx(text)}</p>
    </div>
  );
}

function ScoreSummary({ level, outcomes, outcome }: { level: LevelDefinition; outcomes: Record<string, StepOutcome>; outcome: ConversationOutcome | null }) {
  const { tx } = useLocale();
  const rows = [
    { label: UI.driftIdentified, key: 'drift', points: level.points.drift },
    { label: UI.riskAssessed, key: 'risk', points: level.points.risk },
    { label: UI.coachingMove, key: 'coaching', points: level.points.coaching },
  ];
  if (level.points.reasoningBonus) rows.push({ label: UI.reasoningBonus, key: 'reasoning', points: level.points.reasoningBonus });
  const convoCredit = outcome ? OUTCOME_CREDIT[outcome] : 0;
  const total = rows.reduce((sum, row) => sum + Math.round(row.points * creditFor(outcomes[row.key]?.attemptsToCorrect ?? null)), 0)
    + (level.conversation ? Math.round(level.points.restore * convoCredit) : 0);

  return (
    <div className="score-summary">
      <p className="score-summary__note">{tx(UI.scoreNote)}</p>
      {rows.map((row) => {
        const attempts = outcomes[row.key]?.attemptsToCorrect ?? null;
        const credit = creditFor(attempts);
        const earned = Math.round(row.points * credit);
        const label = attempts === 1 ? tx(UI.firstTry) : attempts != null ? fmt(tx(UI.tryN), { n: attempts }) : tx(UI.notSolved);
        return (
          <div key={row.key} className="score-summary__row">
            <span className="score-summary__label">
              <StatusMark credit={credit} />
              {tx(row.label)}
              <em className="score-summary__attempt">({label})</em>
            </span>
            <span><bdi dir="ltr">+{earned}</bdi></span>
          </div>
        );
      })}
      {level.conversation && (
        <div className="score-summary__row">
          <span className="score-summary__label">
            <StatusMark credit={convoCredit} />
            {tx(UI.conversationRow)}
            <em className="score-summary__attempt">({outcome ? tx(OUTCOME_LABEL[outcome]) : '—'})</em>
          </span>
          <span><bdi dir="ltr">+{Math.round(level.points.restore * convoCredit)}</bdi></span>
        </div>
      )}
      <div className="score-summary__row score-summary__row--total">
        <span className="score-summary__label">{tx(UI.scoreTotal)}</span>
        <span>{total}</span>
      </div>
    </div>
  );
}

function StatusMark({ credit }: { credit: number }) {
  if (credit === 1) return <span className="status-mark status-mark--full">✓</span>;
  if (credit > 0) return <span className="status-mark status-mark--partial">~</span>;
  return <span className="status-mark status-mark--none">–</span>;
}
