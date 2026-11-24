import { useState } from 'react';
import type { BossDefinition } from '../data/bossTypes';
import type { LevelResult } from './LevelScreen';
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import { useEffect } from 'react';
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
  const { tx } = useLocale();
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
      sfx.play(currentDimension.verdict === 'mutation' ? 'lethal' : 'correct');
    } else {
      setAuditWrongCall(call);
      sfx.play('lookAgain');
    }
  };

  const nextDimension = () => {
    sfx.play('tap');
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
      sfx.play('correct');
      fireReaction('affirming');
      setTimeout(() => {
        setReaction(null);
        setPhase('coaching');
      }, 600);
    } else {
      setLocateWrong(choiceId);
      sfx.play('lookAgain');
      fireReaction('thoughtful');
    }
  };

  const handleCoaching = (choiceId: string) => {
    const correct = choiceId === boss.coaching.correctId;
    setCoachingAttempts((n) => n + 1);
    if (correct) {
      setCoachingWrong(null);
      sfx.play('correct');
      fireReaction('affirming');
      setTimeout(() => {
        setReaction(null);
        setPhase('reveal');
      }, 600);
    } else {
      setCoachingWrong(choiceId);
      sfx.play('lookAgain');
      fireReaction('thoughtful');
    }
  };

  useEffect(() => {
    if (phase === 'reveal') {
      sfx.play('world');
      setTimeout(() => sfx.play('badge'), 1100);
    }
  }, [phase]);

  const finish = () => {
    sfx.play('tap');
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
            <SceneHeader image={boss.sceneImage} alt={tx(boss.title)} />
          )}
          <p className="beat__eyebrow boss__eyebrow">{tx(UI.finalVisit)} · {tx(boss.theme)}</p>
          <h2 className="beat__title">{tx(boss.title)}</h2>
          <p className="beat__scenario">{tx(boss.scenario)}</p>
          <button className="beat__cta" onClick={() => { sfx.play('tap'); setPhase('audit'); }}>
            {tx(UI.beginAudit)}
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
            {fmt(tx(UI.dimensionOf), { n: auditIndex + 1, total: boss.dimensions.length })}
          </p>
          <h3 className="beat__heading">{tx(currentDimension.label)}</h3>
          <p className="beat__scenario boss-audit__observation">{tx(currentDimension.observation)}</p>

          {!auditFindingShown ? (
            <>
              <p className="boss-audit__question">{tx(UI.yourCall)}</p>
              <div className="boss-audit__call-buttons">
                <button
                  className={`boss-audit__call boss-audit__call--clean ${auditWrongCall === 'clean' ? 'boss-audit__call--wrong' : ''}`}
                  onClick={() => makeAuditCall('clean')}
                >
                  {tx(UI.checksOut)}
                </button>
                <button
                  className={`boss-audit__call boss-audit__call--mutation ${auditWrongCall === 'mutation' ? 'boss-audit__call--wrong' : ''}`}
                  onClick={() => makeAuditCall('mutation')}
                >
                  {tx(UI.driftHere)}
                </button>
              </div>
              {auditWrongCall && (
                <p className="beat__hint">
                  <span className="hint-mark">?</span> {tx(currentDimension.hint)}
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
                  {tx(currentDimension.verdict === 'mutation' ? UI.theMutation : UI.confirmedClean)}
                </span>
                <p>{tx(currentDimension.finding)}</p>
              </div>
              <button className="beat__cta" onClick={nextDimension}>
                {tx(isLastDimension ? UI.makeTheCall : UI.nextDimension)}
              </button>
            </>
          )}
        </div>
      )}

      {phase === 'locate' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">{tx(UI.locateMutation)}</h3>
          <p className="beat__prompt">{tx(boss.locate.prompt)}</p>
          <div className="choice-list">
            {boss.locate.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-list__item ${locateWrong === opt.id ? 'choice-list__item--wrong' : ''}`}
                onClick={() => handleLocate(opt.id)}
              >
                {tx(opt.label)}
              </button>
            ))}
          </div>
          {locateWrong && <p className="beat__hint"><span className="hint-mark">?</span> {tx(boss.locate.hint)}</p>}
        </div>
      )}

      {phase === 'coaching' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">{tx(UI.hardestMove)}</h3>
          <p className="beat__prompt">{tx(boss.coaching.prompt)}</p>
          <div className="choice-list">
            {boss.coaching.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-list__item ${coachingWrong === opt.id ? 'choice-list__item--wrong' : ''}`}
                onClick={() => handleCoaching(opt.id)}
              >
                {tx(opt.label)}
              </button>
            ))}
          </div>
          {coachingWrong && <p className="beat__hint"><span className="hint-mark">?</span> {tx(boss.coaching.hint)}</p>}
        </div>
      )}

      {phase === 'reveal' && (
        <div className="beat beat--reveal">
          <img src={celebratingToki} alt="" className="reveal__celebrate-toki" />
          <span className="reveal__risk-badge boss__master-badge">{tx(UI.masterDlis)}</span>
          <h3 className="beat__heading">{tx(UI.perfectRevealed)}</h3>

          <div className="reveal__block">
            <p className="reveal__label">{tx(UI.whatDrifted)}</p>
            <p className="reveal__text">{tx(boss.reveal.whatDrifted)}</p>
          </div>
          <div className="reveal__block">
            <p className="reveal__label">{tx(UI.whyItHappened)}</p>
            <p className="reveal__text">{tx(boss.reveal.whyItHappened)}</p>
          </div>
          <div className="reveal__block">
            <p className="reveal__label">{tx(UI.howToRestore)}</p>
            <p className="reveal__text">{tx(boss.reveal.howToRestore)}</p>
          </div>

          <div className="boss__final-word">
            <p>{tx(boss.reveal.finalWord)}</p>
          </div>

          <button className="beat__cta" onClick={finish}>
            {tx(UI.completeQuest)}
          </button>
        </div>
      )}
    </div>
  );
}
