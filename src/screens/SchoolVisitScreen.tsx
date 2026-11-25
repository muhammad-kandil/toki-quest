import { useEffect, useState } from 'react';
import type { EvidenceKind, ImpactCall, SchoolVisitDefinition, VisitContext } from '../data/schoolVisitTypes';
import type { ChoiceOption } from '../data/levelTypes';
import { getBadge } from '../data/badges';
import type { LevelResult } from './LevelScreen';
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import { BadgeIcon } from '../components/BadgeIcon';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import tokiHero from '../assets/raw/toki-face-teal-hero.png';
import { TokiAvatar } from '../components/TokiAvatar';
import { useLocale } from '../i18n/LocaleContext';
import { useVoice } from '../audio/useVoice';
import { UI, fmt } from '../i18n/ui';
import { t, type Text } from '../i18n/types';
import { sfx } from '../audio/sfx';
import './LevelScreen.css';
import './BossScreen.css';
import './SchoolVisitScreen.css';

type Phase = 'intro' | 'school' | 'context' | 'prioritise' | 'mission' | 'reveal';

const CREDIT: Record<number, number> = { 1: 1, 2: 0.6, 3: 0.3 };
const credit = (n: number) => (n <= 0 ? 0 : CREDIT[n] ?? 0.15);

const KIND_LABEL: Record<EvidenceKind, Text> = {
  observation: t('Observation', 'ملاحظة'),
  alefData: t('Alef data', 'بيانات «ألف»'),
  planning: t('Teacher planning', 'تخطيط المعلّم'),
  studentWork: t('Student work', 'عمل الطلاب'),
  assessment: t('Assessment sample', 'عيّنة تقييم'),
  studentVoice: t('Student responses', 'إجابات الطلاب'),
  leadership: t('Leadership priorities', 'أولويات القيادة'),
};

const IMPACT_OPTIONS: { id: ImpactCall; label: Text; short: Text }[] = [
  { id: 'linked', label: t('Practice is linked to learning — impact is visible', 'الممارسة مرتبطة بالتعلّم — الأثر مرئي'), short: t('Linked', 'مرتبط') },
  { id: 'unverified', label: t('Active, but impact is unverified', 'نشط، لكن الأثر غير مُتحقَّق منه'), short: t('Unverified', 'غير مُتحقَّق') },
  { id: 'drifted', label: t('Practice has drifted from its purpose', 'انحرفت الممارسة عن غايتها'), short: t('Drifted', 'منحرف') },
];

const S = {
  final: t('Final World', 'العالم الأخير'),
  begin: t('Begin the Visit', 'ابدأ الزيارة'),
  schoolHint: t('Six doors. Open each one, read the evidence, and make the impact call.', 'ستة أبواب. افتح كل باب، واقرأ الدليل، واتّخذ قرار الأثر.'),
  tokiSchoolLine: t('Start anywhere. The order is yours — the judgement comes at the end.', 'ابدأ من أي باب. الترتيب لك — والحكم يأتي في النهاية.'),
  tokiSchoolDone: t('Every door is open now. Where would one coach, in one term, change the most?', 'كل الأبواب مفتوحة الآن. أين يغيّر مدرّب واحد، في فصل واحد، أكثر ما يمكن؟'),
  visited: t('{n} of {total} visited', 'تمت زيارة {n} من {total}'),
  readyToDecide: t('Toki has seen the whole school. Time to decide.', 'رأى توكي المدرسة كلها. حان وقت القرار.'),
  decide: t('Decide Where to Coach', 'قرّر أين تدرّب'),
  evidenceFolder: t('The evidence folder', 'ملف الأدلة'),
  impactCall: t('The impact call', 'قرار الأثر'),
  impactPrompt: t('Read the three pieces of evidence together. What is true here?', 'اقرأ الأدلة الثلاثة معًا. ما الصحيح هنا؟'),
  backToSchool: t('Back to the school', 'العودة إلى المدرسة'),
  prioritise: t('Prioritise', 'حدّد الأولوية'),
  whyHere: t('Why here', 'لماذا هنا'),
  finalMission: t('Toki’s Final Mission', 'مهمة توكي الأخيرة'),
  finalResponse: t('Final coaching response', 'الاستجابة التدريبية الأخيرة'),
  contextsRow: t('Impact calls (first try)', 'قرارات الأثر (من المحاولة الأولى)'),
  priorityRow: t('Coaching priority', 'أولوية التدريب'),
  missionRow: t('Final mission', 'المهمة الأخيرة'),
  questComplete: t('Quest complete', 'اكتملت الرحلة'),
};

/**
 * The Final World. One school, six contexts, then the Master DLIS
 * question: not "what is wrong?" but "where will coaching change the
 * most?" — which the evidence answers with the room upstream of all
 * the others.
 */
export function SchoolVisitScreen({ visit, heldBadges, onComplete }: {
  visit: SchoolVisitDefinition;
  heldBadges: string[];
  onComplete: (r: LevelResult) => void;
}) {
  const { tx } = useLocale();
  const voiceCtl = useVoice();
  const [phase, setPhase] = useState<Phase>('intro');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [calls, setCalls] = useState<Record<string, { firstTry: boolean; done: boolean }>>({});
  const [wrongCall, setWrongCall] = useState<ImpactCall | null>(null);
  const [shown, setShown] = useState(false);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [trigger, setTrigger] = useState(0);
  const [lines, setLines] = useState(0);
  const fire = (k: ReactionKind) => { setReaction(k); setTrigger((n) => n + 1); };

  const active = visit.contexts.find((c) => c.id === activeId) ?? null;
  const doneCount = visit.contexts.filter((c) => calls[c.id]?.done).length;
  const allDone = doneCount === visit.contexts.length;

  const openContext = (c: VisitContext) => {
    if (calls[c.id]?.done) return;
    sfx.play('tap');
    setActiveId(c.id);
    setWrongCall(null);
    setShown(false);
    setPhase('context');
  };

  const makeCall = (id: ImpactCall) => {
    if (!active) return;
    const correct = id === active.impact.correctId;
    if (correct) {
      setWrongCall(null);
      setShown(true);
      setCalls((p) => ({ ...p, [active.id]: { firstTry: p[active.id]?.firstTry ?? true, done: true } }));
      sfx.play(active.impact.correctId === 'drifted' ? 'lethal' : 'correct');
      fire('affirming');
    } else {
      setWrongCall(id);
      setCalls((p) => ({ ...p, [active.id]: { firstTry: false, done: false } }));
      sfx.play('lookAgain');
      fire('thoughtful');
    }
  };

  const choose = (key: 'priority' | 'mission', id: string, correctId: string, next: Phase) => {
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

  const firstTries = visit.contexts.filter((c) => calls[c.id]?.firstTry && calls[c.id]?.done).length;
  const result = (): LevelResult => {
    const cCredit = firstTries / visit.contexts.length;
    const p = credit(attempts.priority ?? 0);
    const m = credit(attempts.mission ?? 0);
    const score = Math.round(visit.points.contexts * cCredit) + Math.round(visit.points.priority * p) + Math.round(visit.points.mission * m);
    const clean = cCredit === 1 && p === 1 && m === 1;
    const att: Record<string, number> = { contexts: cCredit === 1 ? 1 : 2 };
    for (const k of ['priority', 'mission']) if ((attempts[k] ?? 0) > 0) att[k] = attempts[k];
    return { levelId: visit.id, score, reasoningBonusEarned: false, badgesEarned: clean ? visit.badgeTriggers : [], attempts: att };
  };

  // Read aloud: the closing message, line by line, as it is revealed.
  useEffect(() => {
    if (phase === 'intro') voiceCtl.speak(tx(visit.scenario), 'narrator');
    if (phase === 'reveal') voiceCtl.speakSequence([{ text: tx(visit.finalResponse) }, ...visit.finalMessage.map((l) => ({ text: tx(l) }))]);
    return () => voiceCtl.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    sfx.play('quest');
    const timers = visit.finalMessage.map((_, i) => setTimeout(() => setLines(i + 1), 900 + i * 1400));
    if (result().badgesEarned.some((b) => !heldBadges.includes(b))) timers.push(setTimeout(() => sfx.play('badge'), 900 + visit.finalMessage.length * 1400));
    return () => { timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const priorityOptions: ChoiceOption[] = visit.contexts.map((c) => ({ id: c.id, label: c.name }));

  return (
    <div className="level-screen boss-screen visit">
      <ReactionToki kind={reaction} trigger={trigger} />

      {phase === 'intro' && (
        <div className="beat beat--observe">
          {visit.sceneImage && <SceneHeader image={visit.sceneImage} alt={tx(visit.title)} />}
          <p className="beat__eyebrow boss__eyebrow">{tx(S.final)} · {tx(visit.theme)}</p>
          <h2 className="beat__title">{tx(visit.title)}</h2>
          <p className="beat__scenario">{tx(visit.scenario)}</p>
          <button className="beat__cta" onClick={() => { sfx.play('tap'); setPhase('school'); }}>{tx(S.begin)}</button>
        </div>
      )}

      {phase === 'school' && (
        <div className="beat beat--choice">
          <h3 className="beat__heading">{tx(visit.title)}</h3>
          <p className="beat__prompt">{allDone ? tx(S.readyToDecide) : tx(S.schoolHint)}</p>
          <div className="visit__toki">
            <TokiAvatar src={tokiHero} size={64} mood={allDone ? 'happy' : 'idle'} />
            <p className="visit__toki-line">{tx(allDone ? S.tokiSchoolDone : S.tokiSchoolLine)}</p>
          </div>
          <p className="boss-audit__counter">{fmt(tx(S.visited), { n: doneCount, total: visit.contexts.length })}</p>
          <div className="school">
            {visit.contexts.map((c, i) => {
              const call = calls[c.id];
              const verdict = call?.done ? IMPACT_OPTIONS.find((o) => o.id === c.impact.correctId) : null;
              return (
                <button key={c.id} className={`school__door ${call?.done ? `school__door--done school__door--${c.impact.correctId}` : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }} onClick={() => openContext(c)} disabled={!!call?.done}>
                  <span className="school__name">{tx(c.name)}</span>
                  <span className="school__tag">{tx(c.tag)}</span>
                  {verdict && <span className="school__verdict">{tx(verdict.short)}</span>}
                </button>
              );
            })}
          </div>
          {allDone && (
            <button className="beat__cta" onClick={() => { sfx.play('tap'); setPhase('prioritise'); }}>{tx(S.decide)}</button>
          )}
        </div>
      )}

      {phase === 'context' && active && (
        <div className="beat beat--choice visit__context" key={active.id}>
          {active.sceneImage && <SceneHeader image={active.sceneImage} alt={tx(active.name)} />}
          <p className="beat__eyebrow">{tx(active.tag)}</p>
          <h3 className="beat__heading">{tx(active.name)}</h3>
          <p className="visit__folder-label">{tx(S.evidenceFolder)}</p>
          <div className="dossier">
            {active.evidence.map((e, i) => (
              <div key={i} className={`dossier__card dossier__card--${e.kind}`} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="dossier__kind">{tx(KIND_LABEL[e.kind])}</span>
                {tx(e.title) !== tx(KIND_LABEL[e.kind]) && <p className="dossier__title">{tx(e.title)}</p>}
                <p className="dossier__body">{tx(e.body)}</p>
              </div>
            ))}
          </div>

          {!shown ? (
            <>
              <p className="boss-audit__question">{tx(S.impactPrompt)}</p>
              <div className="choice-list">
                {IMPACT_OPTIONS.map((o, i) => (
                  <button key={o.id} className={`choice-list__item impact impact--${o.id} ${wrongCall === o.id ? 'choice-list__item--wrong' : ''}`}
                    style={{ animationDelay: `${i * 55}ms` }} onClick={() => makeCall(o.id)}>
                    {tx(o.label)}
                  </button>
                ))}
              </div>
              {wrongCall && <p className="beat__hint"><span className="hint-mark">?</span> {tx(active.impact.hint)}</p>}
            </>
          ) : (
            <>
              <div className={`boss-audit__finding ${active.impact.correctId === 'drifted' ? 'boss-audit__finding--mutation' : 'boss-audit__finding--clean'}`}>
                <span className="boss-audit__verdict">{tx(IMPACT_OPTIONS.find((o) => o.id === active.impact.correctId)!.short)}</span>
                <p>{tx(active.impact.finding)}</p>
              </div>
              <button className="beat__cta" onClick={() => { sfx.play('tap'); setReaction(null); setPhase('school'); }}>{tx(S.backToSchool)}</button>
            </>
          )}
        </div>
      )}

      {phase === 'prioritise' && (
        <ChoiceStep heading={tx(S.prioritise)} prompt={tx(visit.prioritise.prompt)} options={priorityOptions} wrong={wrongChoice}
          hint={tx(visit.prioritise.hint)} onPick={(id) => choose('priority', id, visit.prioritise.correctId, 'mission')} />
      )}

      {phase === 'mission' && (
        <div className="visit__mission">
          <div className="boss-audit__finding boss-audit__finding--clean visit__rationale">
            <span className="boss-audit__verdict">{tx(S.whyHere)}</span>
            <p>{tx(visit.prioritise.rationale)}</p>
          </div>
          <ChoiceStep heading={tx(S.finalMission)} prompt={tx(visit.finalMission.prompt)} options={visit.finalMission.options} wrong={wrongChoice}
            hint={tx(visit.finalMission.hint)} onPick={(id) => choose('mission', id, visit.finalMission.correctId, 'reveal')} />
        </div>
      )}

      {phase === 'reveal' && (() => {
        const r = result();
        const newBadges = r.badgesEarned.filter((b) => !heldBadges.includes(b));
        return (
          <div className="beat beat--reveal">
            <img src={celebratingToki} alt="" className="reveal__celebrate-toki" />
            <span className="reveal__risk-badge" style={{ background: 'var(--toki-indigo)' }}>{tx(S.questComplete)}</span>
            <h3 className="beat__heading">{tx(UI.masterDlis)}</h3>
            <div className="reveal__block"><p className="reveal__label">{tx(S.finalResponse)}</p><p className="reveal__text">{tx(visit.finalResponse)}</p></div>
            <div className="visit__message" aria-live="polite">
              {visit.finalMessage.map((line, i) => (
                <p key={i} className={`visit__line ${i < lines ? 'visit__line--on' : ''} ${i === visit.finalMessage.length - 1 ? 'visit__line--last' : ''}`}>{tx(line)}</p>
              ))}
            </div>
            <div className="score-summary">
              <div className="score-summary__row"><span>{tx(S.contextsRow)}</span><span>{firstTries}/{visit.contexts.length}</span></div>
              <div className="score-summary__row"><span>{tx(S.priorityRow)}</span><span>{(attempts.priority ?? 0) === 1 ? tx(UI.firstTry) : fmt(tx(UI.tryN), { n: attempts.priority ?? 0 })}</span></div>
              <div className="score-summary__row"><span>{tx(S.missionRow)}</span><span>{(attempts.mission ?? 0) === 1 ? tx(UI.firstTry) : fmt(tx(UI.tryN), { n: attempts.mission ?? 0 })}</span></div>
              <div className="score-summary__row"><span>{tx({ en: 'Total', ar: 'المجموع' })}</span><span>+{r.score}</span></div>
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
            <button className="beat__cta" onClick={() => { sfx.play('tap'); onComplete(r); }}>{tx(UI.completeQuest)}</button>
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
