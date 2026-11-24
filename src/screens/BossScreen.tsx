import { useState } from 'react';
import type { BossDefinition } from '../data/bossTypes';
import type { LevelResult } from './LevelScreen';
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import './LevelScreen.css';
import './BossScreen.css';

interface BossScreenProps {
  boss: BossDefinition;
  onComplete: (result: LevelResult) => void;
}

type Phase = 'intro' | 'audit' | 'locate' | 'coaching' | 'reveal';
type AuditCall = 'clean' | 'mutation';

/**
 * The Final Boss. Structurally distinct from the standard classrooms:
 * a six-dimension AUDIT where the player actively JUDGES each
 * dimension — "does this check out, or is the drift here?" — rather
 * than passively tapping through a reveal. Five dimensions genuinely
 * check out; only the sixth (student thinking) hides the mutation.
 * Making the player commit to a call on each one (and get it wrong if
 * they force-blame a fine dimension) is what makes the audit an actual
 * skill test instead of a slideshow — and what makes the late-breaking
 * twist land as earned insight rather than a scripted reveal.
 */
export function BossScreen({ boss, onComplete }: BossScreenProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [auditIndex, setAuditIndex] = useState(0);
  const [auditWrongCall, setAuditWrongCall] = useState<AuditCall | null>(null);
  const [auditFindingShown, setAuditFindingShown] = useState(false);

  const [locateAttempts, setLocateAttempts] = useState(0);
  const [locateWrong, setLocateWrong] = useState<string | null>(null);
  const [coachingAttempts, setCoachingAttempts] = useState(0);
  const [coachingWrong, setCoachingWrong] = useState<string | null>(null);

  // Reactions are used for the locate/coaching answer steps only —
  // NOT the audit dimensions, where the top of the screen is already
  // occupied by the progress pips, counter, and dimension text. A
  // floating reaction there collided with that content; the audit's
  // own finding card (below) is the feedback for that step instead.
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [reactionTrigger, setReactionTrigger] = useState(0);
  const fireReaction = (kind: ReactionKind) => {
    setReaction(kind);
    setReactionTrigger((n) => n + 1);
  };

  const currentDimension = boss.dimensions[auditIndex];
  const isLastDimension = auditIndex === boss.dimensions.length - 1;

  const makeAuditCall = (call: AuditCall) => {
    const correct = call === currentDimension.verdict;
    if (correct) {
      setAuditWrongCall(null);
      setAuditFindingShown(true);
    } else {
      setAuditWrongCall(call);
    }
  };

  const nextDimension = () => {
    setAuditFindingShown(false);
    setAuditWrongCall(null);
    if (isLastDimension) {
      setPhase('locate');
    } else {
      setAuditIndex((i) => i + 1);
    }
  };

  const handleLocate = (choiceId: string) => {
    const correct = choiceId === boss.locate.correctId;
    setLocateAttempts((n) => n + 1);
    if (correct) {
      setLocateWrong(null);
      fireReaction('affirming');
      setTimeout(() => {
        setReaction(null);
        setPhase('coaching');
      }, 600);
    } else {
      setLocateWrong(choiceId);
      fireReaction('thoughtful');
    }
  };

  const handleCoaching = (choiceId: string) => {
    const correct = choiceId === boss.coaching.correctId;
    setCoachingAttempts((n) => n + 1);
    if (correct) {
      setCoachingWrong(null);
      fireReaction('affirming');
      setTimeout(() => {
        setReaction(null);
        setPhase('reveal');
      }, 600);
    } else {
      setCoachingWrong(choiceId);
      fireReaction('thoughtful');
    }
  };

  const finish = () => {
    const locateCredit = locateAttempts === 1 ? 1 : locateAttempts === 2 ? 0.6 : 0.3;
    const coachingCredit = coachingAttempts === 1 ? 1 : coachingAttempts === 2 ? 0.6 : 0.3;
    let score = boss.points.audit;
    score += Math.round(boss.points.locate * locateCredit);
    score += Math.round(boss.points.coaching * coachingCredit);
    if (boss.points.reasoningBonus) score += boss.points.reasoningBonus;
    const clean = locateAttempts === 1 && coachingAttempts === 1;
    onComplete({
      levelId: boss.id,
      score,
      reasoningBonusEarned: true,
      badgesEarned: clean ? boss.badgeTriggers : [],
    });
  };

  return (
    <div className="level-screen boss-screen">
      <ReactionToki kind={reaction} trigger={reactionTrigger} />

      {phase === 'intro' && (
        <div className="beat beat--observe">
          {boss.sceneImage && (
            <SceneHeader image={boss.sceneImage} alt="The Perfect Classroom" />
          )}
          <p className="beat__eyebrow boss__eyebrow">Final Visit · {boss.theme}</p>
          <h2 className="beat__title">{boss.title}</h2>
          <p className="beat__scenario">{boss.scenario}</p>
          <button className="beat__cta" onClick={() => setPhase('audit')}>
            Begin the Audit
          </button>
        </div>
      )}

      {phase === 'audit' && (
        <div className="beat beat--choice boss-audit">
          <div className="boss-audit__progress">
            {boss.dimensions.map((d, i) => (
              <span
                key={d.id}
                className={`boss-audit__pip ${
                  i < auditIndex ? 'boss-audit__pip--done'
                  : i === auditIndex ? 'boss-audit__pip--current'
                  : ''
                }`}
              />
            ))}
          </div>

          <p className="boss-audit__counter">
            Dimension {auditIndex + 1} of {boss.dimensions.length}
          </p>
          <h3 className="beat__heading">{currentDimension.label}</h3>
          <p className="beat__scenario boss-audit__observation">{currentDimension.observation}</p>

          {!auditFindingShown ? (
            <>
              <p className="boss-audit__question">Your call: does this dimension check out?</p>
              <div className="boss-audit__call-buttons">
                <button
                  className={`boss-audit__call boss-audit__call--clean ${auditWrongCall === 'clean' ? 'boss-audit__call--wrong' : ''}`}
                  onClick={() => makeAuditCall('clean')}
                >
                  It checks out
                </button>
                <button
                  className={`boss-audit__call boss-audit__call--mutation ${auditWrongCall === 'mutation' ? 'boss-audit__call--wrong' : ''}`}
                  onClick={() => makeAuditCall('mutation')}
                >
                  The drift is here
                </button>
              </div>
              {auditWrongCall && (
                <p className="beat__hint">
                  <span className="hint-mark">?</span> {currentDimension.hint}
                </p>
              )}
            </>
          ) : (
            <>
              <div
                className={`boss-audit__finding ${
                  currentDimension.verdict === 'mutation'
                    ? 'boss-audit__finding--mutation'
                    : 'boss-audit__finding--clean'
                }`}
              >
                <span className="boss-audit__verdict">
                  {currentDimension.verdict === 'mutation' ? 'The mutation' : 'Confirmed clean'}
                </span>
                <p>{currentDimension.finding}</p>
              </div>
              <button className="beat__cta" onClick={nextDimension}>
                {isLastDimension ? 'Make the call' : 'Next dimension'}
              </button>
            </>
          )}
        </div>
      )}

      {phase === 'locate' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">Locate the Mutation</h3>
          <p className="beat__prompt">{boss.locate.prompt}</p>
          <div className="choice-list">
            {boss.locate.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-list__item ${locateWrong === opt.id ? 'choice-list__item--wrong' : ''}`}
                onClick={() => handleLocate(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {locateWrong && <p className="beat__hint"><span className="hint-mark">?</span> {boss.locate.hint}</p>}
        </div>
      )}

      {phase === 'coaching' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">The Hardest Coaching Move</h3>
          <p className="beat__prompt">{boss.coaching.prompt}</p>
          <div className="choice-list">
            {boss.coaching.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-list__item ${coachingWrong === opt.id ? 'choice-list__item--wrong' : ''}`}
                onClick={() => handleCoaching(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {coachingWrong && <p className="beat__hint"><span className="hint-mark">?</span> {boss.coaching.hint}</p>}
        </div>
      )}

      {phase === 'reveal' && (
        <div className="beat beat--reveal">
          <img src={celebratingToki} alt="" className="reveal__celebrate-toki" />
          <span className="reveal__risk-badge boss__master-badge">Master DLIS</span>
          <h3 className="beat__heading">The Perfect Classroom, revealed</h3>

          <div className="reveal__block">
            <p className="reveal__label">What drifted</p>
            <p className="reveal__text">{boss.reveal.whatDrifted}</p>
          </div>
          <div className="reveal__block">
            <p className="reveal__label">Why it happened</p>
            <p className="reveal__text">{boss.reveal.whyItHappened}</p>
          </div>
          <div className="reveal__block">
            <p className="reveal__label">How to restore it</p>
            <p className="reveal__text">{boss.reveal.howToRestore}</p>
          </div>

          <div className="boss__final-word">
            <p>{boss.reveal.finalWord}</p>
          </div>

          <button className="beat__cta" onClick={finish}>
            Complete the Quest
          </button>
        </div>
      )}
    </div>
  );
}
