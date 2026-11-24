import { useEffect, useState } from 'react';
import type { AcademyLevelDefinition, AcademyRisk } from '../data/academyTypes';
import { RISK_META, RISK_OPTIONS, type ChoiceOption, type RiskLevel } from '../data/levelTypes';
import { getBadge } from '../data/badges';
import type { LevelResult } from './LevelScreen';
import { ObserveBeat } from './LevelScreen';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import { BadgeIcon } from '../components/BadgeIcon';
import { EvidenceRecap } from '../components/EvidenceRecap';
import { ConversationBeat, OUTCOME_LABEL } from './ConversationBeat';
import { OUTCOME_CREDIT, type ConversationOutcome } from '../data/conversationTypes';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import { t, type Text } from '../i18n/types';
import { sfx } from '../audio/sfx';
import './LevelScreen.css';
import './BossScreen.css';
import './AcademyScreen.css';

type Phase = 'observe' | 'diagnose' | 'risk' | 'coaching' | 'conversation' | 'reveal';

const CREDIT: Record<number, number> = { 1: 1, 2: 0.6, 3: 0.3 };
const credit = (n: number) => (n <= 0 ? 0 : CREDIT[n] ?? 0.15);

const NO_DRIFT_OPTION: ChoiceOption = {
  id: 'none',
  label: t('No drift — the practice is achieving its purpose', 'لا انحراف — الممارسة تحقق غايتها'),
};
const ACADEMY_RISK_OPTIONS: ChoiceOption[] = [...RISK_OPTIONS, NO_DRIFT_OPTION];

const S = {
  academy: t('Academy', 'الأكاديمية'),
  diagnose: t('File the Diagnosis', 'سجّل التشخيص'),
  noDrift: t('No drift here — file it', 'لا انحراف هنا — سجّل ذلك'),
  fileN: t('File diagnosis ({n})', 'سجّل التشخيص ({n})'),
  tickHint: t('Tap a finding to tick it. Leave everything unticked if the evidence supports nothing.', 'اضغط على نتيجة لتضع عليها علامة. اترك كل شيء بلا علامة إن كان الدليل لا يدعم شيئًا.'),
  overCoaching: t('Over-coaching', 'إفراط في التدريب'),
  missed: t('Something is still hiding', 'ما زال شيء مختبئًا'),
  diagnosisFiled: t('Diagnosis filed', 'تم تسجيل التشخيص'),
  finding: t('Finding', 'نتيجة'),
  healthy: t('Healthy', 'سليم'),
  nextStep: t('Assess the risk', 'قيّم الخطورة'),
  theVerdict: t('The judgement', 'الحكم'),
  diagnosisRow: t('Diagnosis', 'التشخيص'),
  noDriftBadge: t('No Drift', 'لا انحراف'),
  nothingToFlag: t('You flagged nothing. The evidence agrees.', 'لم تضع علامة على شيء. والدليل يوافقك.'),
};

/**
 * World 7 classroom. No "which drift is it" menu: the player ticks every
 * finding the evidence supports — possibly none — and files it. Ticking
 * a healthy practice is over-coaching; missing a real one is the
 * familiar failure. Both send the player back to the evidence.
 */
export function AcademyScreen({ level, heldBadges, onComplete }: {
  level: AcademyLevelDefinition;
  heldBadges: string[];
  onComplete: (r: LevelResult) => void;
}) {
  const { tx } = useLocale();
  const [phase, setPhase] = useState<Phase>('observe');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filed, setFiled] = useState(false);
  const [diagErr, setDiagErr] = useState<{ over: boolean; under: boolean } | null>(null);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [trigger, setTrigger] = useState(0);
  const [outcome, setOutcome] = useState<ConversationOutcome | null>(null);
  const fire = (k: ReactionKind) => { setReaction(k); setTrigger((n) => n + 1); };

  const findings = level.diagnosis.findings;
  const hasConversation = !!level.conversation;
  const convoPoints = level.points.conversation ?? 0;
  const truth = new Set(findings.filter((f) => f.present).map((f) => f.id));

  const toggle = (id: string) => {
    if (filed) return;
    sfx.play('tap');
    setDiagErr(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const fileDiagnosis = () => {
    setAttempts((a) => ({ ...a, diagnosis: (a.diagnosis ?? 0) + 1 }));
    const over = [...selected].some((id) => !truth.has(id));
    const under = [...truth].some((id) => !selected.has(id));
    if (!over && !under) {
      setDiagErr(null);
      setFiled(true);
      sfx.play(truth.size ? 'lethal' : 'correct');
      fire('affirming');
    } else {
      setDiagErr({ over, under });
      sfx.play('lookAgain');
      fire('thoughtful');
    }
  };

  const choose = (key: 'risk' | 'coaching', id: string, correctId: string, next: Phase) => {
    setAttempts((a) => ({ ...a, [key]: (a[key] ?? 0) + 1 }));
    if (id === correctId) {
      setWrongChoice(null);
      sfx.play('correct');
      fire('affirming');
      setTimeout(() => { setReaction(null); setPhase(next); }, 550);
    } else {
      setWrongChoice(id);
      sfx.play('lookAgain');
      fire('thoughtful');
    }
  };

  const result = (): LevelResult => {
    const d = credit(attempts.diagnosis ?? 0);
    const r = credit(attempts.risk ?? 0);
    const c = credit(attempts.coaching ?? 0);
    const v = hasConversation ? (outcome ? OUTCOME_CREDIT[outcome] : 0) : 1;
    const score = Math.round(level.points.diagnosis * d) + Math.round(level.points.risk * r) + Math.round(level.points.coaching * c) + Math.round(convoPoints * v);
    const clean = d === 1 && r === 1 && c === 1 && v === 1;
    return { levelId: level.id, score, reasoningBonusEarned: false, badgesEarned: clean ? level.badgeTriggers : [] };
  };

  useEffect(() => {
    if (phase === 'reveal') {
      sfx.play(level.assessRisk.correctId === 'lethal' ? 'lethal' : 'reveal');
      if (result().badgesEarned.some((b) => !heldBadges.includes(b))) setTimeout(() => sfx.play('badge'), 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const riskId = level.assessRisk.correctId;
  const riskLabel: Text = riskId === 'none' ? S.noDriftBadge : RISK_META[riskId as RiskLevel].label;
  const riskColor = riskId === 'none' ? 'var(--toki-green)' : RISK_META[riskId as RiskLevel].color;
  const phases: Phase[] = (['observe', 'diagnose', 'risk', 'coaching', 'conversation', 'reveal'] as Phase[]).filter((p) => p !== 'conversation' || hasConversation);

  return (
    <div className="level-screen academy">
      <div className="level-progress" role="progressbar" aria-valuenow={phases.indexOf(phase) + 1} aria-valuemax={phases.length}>
        {phases.map((p, i) => <span key={p} className={`level-progress__dot ${i <= phases.indexOf(phase) ? 'level-progress__dot--filled' : ''}`} />)}
      </div>
      <ReactionToki kind={reaction} trigger={trigger} />

      {phase === 'observe' && (
        <ObserveBeat level={level} onContinue={() => { sfx.play('tap'); setPhase('diagnose'); }} ctaLabel={tx(S.diagnose)} />
      )}

      {phase === 'diagnose' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">{tx(S.diagnose)}</h3>
          <p className="beat__prompt">{tx(level.diagnosis.prompt)}</p>
          {!filed && <EvidenceRecap spots={level.evidence} />}
          <div className="choice-list findings">
            {findings.map((f, i) => {
              const on = selected.has(f.id);
              const verdictClass = filed ? (f.present ? 'finding--mutation' : 'finding--healthy') : '';
              return (
                <button
                  key={f.id}
                  className={`choice-list__item finding ${on ? 'finding--on' : ''} ${verdictClass}`}
                  style={{ animationDelay: `${i * 55}ms` }}
                  onClick={() => toggle(f.id)}
                  disabled={filed}
                  aria-pressed={on}
                >
                  <span className="finding__box" aria-hidden="true">{on ? '✓' : ''}</span>
                  <span className="finding__body">
                    <span className="finding__label">{tx(f.label)}</span>
                    {filed && (
                      <span className="finding__note">
                        <strong>{tx(f.present ? S.finding : S.healthy)}</strong> — {tx(f.note)}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {!filed ? (
            <>
              {!diagErr && <p className="evidence__hint">{tx(S.tickHint)}</p>}
              {diagErr && (
                <div className="academy__err">
                  {diagErr.over && (
                    <p className="beat__hint"><span className="hint-mark hint-mark--over">!</span> <strong>{tx(S.overCoaching)}.</strong> {tx(level.diagnosis.hintOver)}</p>
                  )}
                  {diagErr.under && tx(level.diagnosis.hintUnder) && (
                    <p className="beat__hint"><span className="hint-mark">?</span> <strong>{tx(S.missed)}.</strong> {tx(level.diagnosis.hintUnder)}</p>
                  )}
                </div>
              )}
              <button className={`beat__cta ${selected.size === 0 ? 'beat__cta--none' : ''}`} onClick={fileDiagnosis}>
                {selected.size === 0 ? tx(S.noDrift) : fmt(tx(S.fileN), { n: selected.size })}
              </button>
            </>
          ) : (
            <>
              <div className={`boss-audit__finding ${truth.size ? 'boss-audit__finding--mutation' : 'boss-audit__finding--clean'}`}>
                <span className="boss-audit__verdict">{tx(S.diagnosisFiled)}</span>
                <p>{truth.size ? tx(level.reveal.verdict) : tx(S.nothingToFlag)}</p>
              </div>
              <button className="beat__cta" onClick={() => { sfx.play('tap'); setReaction(null); setPhase('risk'); }}>{tx(S.nextStep)}</button>
            </>
          )}
        </div>
      )}

      {phase === 'risk' && (
        <ChoiceStep heading={tx(UI.assessRisk)} prompt={tx(level.assessRisk.prompt)} options={ACADEMY_RISK_OPTIONS}
          wrong={wrongChoice} hint={tx(level.assessRisk.hint)} onPick={(id) => choose('risk', id, level.assessRisk.correctId, 'coaching')} />
      )}
      {phase === 'coaching' && (
        <ChoiceStep heading={tx(UI.chooseCoaching)} prompt={tx(level.coaching.prompt)} options={level.coaching.options}
          wrong={wrongChoice} hint={tx(level.coaching.hint)} onPick={(id) => choose('coaching', id, level.coaching.correctId, hasConversation ? 'conversation' : 'reveal')} />
      )}
      {phase === 'conversation' && level.conversation && (
        <ConversationBeat conversation={level.conversation} onDone={(o) => { setOutcome(o); setPhase('reveal'); }} />
      )}

      {phase === 'reveal' && (() => {
        const r = result();
        const newBadges = r.badgesEarned.filter((b) => !heldBadges.includes(b));
        const rows: { label: Text; key: string; pts: number }[] = [
          { label: S.diagnosisRow, key: 'diagnosis', pts: level.points.diagnosis },
          { label: UI.riskAssessed, key: 'risk', pts: level.points.risk },
          { label: UI.coachingMove, key: 'coaching', pts: level.points.coaching },
        ];
        return (
          <div className="beat beat--reveal">
            <img src={celebratingToki} alt="" className="reveal__celebrate-toki" />
            <span className="reveal__risk-badge" style={{ background: riskColor }}>{tx(riskLabel)}</span>
            <h3 className="beat__heading">{tx(S.theVerdict)}</h3>
            <p className="academy__verdict">{tx(level.reveal.verdict)}</p>
            <div className="reveal__block"><p className="reveal__label">{tx(UI.whatDrifted)}</p><p className="reveal__text">{tx(level.reveal.whatDrifted)}</p></div>
            <div className="reveal__block"><p className="reveal__label">{tx(UI.whyItHappened)}</p><p className="reveal__text">{tx(level.reveal.whyItHappened)}</p></div>
            {level.conversation && outcome && (
              <div className="reveal__block">
                <p className="reveal__label">{tx(UI.whatHappenedNext)}</p>
                <span className="reveal__risk-badge reveal__outcome" style={{ background: outcome === 'restored' ? 'var(--toki-teal)' : outcome === 'partial' ? 'var(--toki-orange-soft)' : 'var(--risk-lethal)' }}>{tx(OUTCOME_LABEL[outcome])}</span>
                <p className="reveal__text">{tx(level.conversation.outcomes[outcome])}</p>
              </div>
            )}
            <div className="reveal__block"><p className="reveal__label">{tx(UI.howToRestore)}</p><p className="reveal__text">{tx(level.reveal.howToRestore)}</p></div>
            <div className="score-summary">
              <p className="score-summary__note">{tx(UI.scoreNote)}</p>
              {rows.map((row) => {
                const n = attempts[row.key] ?? 0;
                const cr = credit(n);
                const label = n === 1 ? tx(UI.firstTry) : fmt(tx(UI.tryN), { n });
                return (
                  <div key={row.key} className="score-summary__row">
                    <span className="score-summary__label">
                      <span className={`status-mark ${cr === 1 ? 'status-mark--full' : 'status-mark--partial'}`}>{cr === 1 ? '✓' : '~'}</span>
                      {tx(row.label)} <em className="score-summary__attempt">({label})</em>
                    </span>
                    <span>+{Math.round(row.pts * cr)}</span>
                  </div>
                );
              })}
              {level.conversation && (
                <div className="score-summary__row">
                  <span className="score-summary__label">
                    <span className={`status-mark ${outcome === 'restored' ? 'status-mark--full' : outcome === 'partial' ? 'status-mark--partial' : 'status-mark--none'}`}>{outcome === 'restored' ? '✓' : outcome === 'partial' ? '~' : '–'}</span>
                    {tx(UI.conversationRow)} <em className="score-summary__attempt">({outcome ? tx(OUTCOME_LABEL[outcome]) : '—'})</em>
                  </span>
                  <span>+{Math.round(convoPoints * (outcome ? OUTCOME_CREDIT[outcome] : 0))}</span>
                </div>
              )}
            </div>
            {newBadges.length > 0 && (
              <div className="badge-earned">
                {newBadges.map((id) => { const b = getBadge(id); return b ? (
                  <div key={id} className="badge-earned__item">
                    <BadgeIcon glyph={b.glyph} color={b.color} size={48} />
                    <div><p className="badge-earned__eyebrow">{tx(UI.badgeEarned)}</p><p className="badge-earned__name">{tx(b.name)}</p></div>
                  </div>) : null; })}
              </div>
            )}
            <button className="beat__cta" onClick={() => { sfx.play('tap'); onComplete(r); }}>{tx(UI.continue)}</button>
          </div>
        );
      })()}
    </div>
  );
}

function ChoiceStep({ heading, prompt, options, wrong, hint, onPick }: {
  heading: string; prompt: string; options: ChoiceOption[]; wrong: string | null; hint: string; onPick: (id: string) => void;
}) {
  const { tx } = useLocale();
  return (
    <div className="beat beat--choice">
      <h3 className="beat__heading">{heading}</h3>
      <p className="beat__prompt">{prompt}</p>
      <div className="choice-list">
        {options.map((o, i) => (
          <button key={o.id} className={`choice-list__item ${wrong === o.id ? 'choice-list__item--wrong' : ''}`} style={{ animationDelay: `${i * 55}ms` }} onClick={() => onPick(o.id)}>
            {tx(o.label)}
          </button>
        ))}
      </div>
      {wrong && <p className="beat__hint"><span className="hint-mark">?</span> {hint}</p>}
    </div>
  );
}

export type { AcademyRisk };
