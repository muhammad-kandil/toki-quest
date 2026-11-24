import { useEffect, useState } from 'react';
import type { WorldBossDefinition } from '../data/worldBossTypes';
import { RISK_META, RISK_OPTIONS } from '../data/levelTypes';
import { getBadge } from '../data/badges';
import type { LevelResult } from './LevelScreen';
import { SceneHeader } from './SceneHeader';
import { ReactionToki, type ReactionKind } from './ReactionToki';
import { BadgeIcon } from '../components/BadgeIcon';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import './LevelScreen.css';
import './BossScreen.css';
import './WorldBossScreen.css';

type Phase = 'intro' | 'scenes' | 'pattern' | 'risk' | 'coaching' | 'reveal';
type Call = 'fits' | 'clear';

const CREDIT: Record<number, number> = { 1: 1, 2: 0.6, 3: 0.3 };
const credit = (n: number) => (n <= 0 ? 0 : CREDIT[n] ?? 0.15);

/**
 * The world boss: a pattern audit across a strip of scenes. For each
 * scene the player calls "this is the pattern" or "this one's healthy"
 * — and some healthy scenes are planted on purpose, because a coach
 * who sees drift everywhere is no better than one who sees it nowhere.
 * Then: name the pattern, judge its risk, choose the systemic move.
 */
export function WorldBossScreen({ boss, heldBadges, onComplete }: {
  boss: WorldBossDefinition;
  heldBadges: string[];
  onComplete: (r: LevelResult) => void;
}) {
  const { tx } = useLocale();
  const [phase, setPhase] = useState<Phase>('intro');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [sceneWrong, setSceneWrong] = useState<Call | null>(null);
  const [sceneShown, setSceneShown] = useState(false);
  const [sceneFirstTry, setSceneFirstTry] = useState<boolean[]>([]);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [reaction, setReaction] = useState<ReactionKind>(null);
  const [trigger, setTrigger] = useState(0);
  const fire = (k: ReactionKind) => { setReaction(k); setTrigger((n) => n + 1); };

  const scene = boss.scenes[sceneIdx];
  const last = sceneIdx === boss.scenes.length - 1;

  const callScene = (call: Call) => {
    const correct = (call === 'fits') === scene.fitsPattern;
    if (correct) {
      setSceneWrong(null);
      setSceneShown(true);
      setSceneFirstTry((p) => { const n = [...p]; if (n[sceneIdx] == null) n[sceneIdx] = true; return n; });
      sfx.play(scene.fitsPattern ? 'lethal' : 'correct');
    } else {
      setSceneWrong(call);
      setSceneFirstTry((p) => { const n = [...p]; n[sceneIdx] = false; return n; });
      sfx.play('lookAgain');
    }
  };

  const nextScene = () => {
    sfx.play('tap');
    setSceneShown(false);
    setSceneWrong(null);
    if (last) setPhase('pattern');
    else setSceneIdx((i) => i + 1);
  };

  const choose = (key: 'pattern' | 'risk' | 'coaching', id: string, correctId: string, next: Phase) => {
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
    const sceneCredit = sceneFirstTry.filter(Boolean).length / boss.scenes.length;
    const score =
      Math.round(boss.points.scenes * sceneCredit) +
      Math.round(boss.points.pattern * credit(attempts.pattern ?? 0)) +
      Math.round(boss.points.risk * credit(attempts.risk ?? 0)) +
      Math.round(boss.points.coaching * credit(attempts.coaching ?? 0));
    const clean = sceneCredit === 1 && attempts.pattern === 1 && attempts.risk === 1 && attempts.coaching === 1;
    return { levelId: boss.id, score, reasoningBonusEarned: false, badgesEarned: clean ? boss.badgeTriggers : [] };
  };

  useEffect(() => {
    if (phase === 'reveal') { sfx.play('world'); if (result().badgesEarned.some((b) => !heldBadges.includes(b))) setTimeout(() => sfx.play('badge'), 1100); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const riskMeta = RISK_META[boss.assessRisk.correctId];

  return (
    <div className="level-screen boss-screen wboss">
      <ReactionToki kind={reaction} trigger={trigger} />

      {phase === 'intro' && (
        <div className="beat beat--observe">
          {boss.sceneImage && <SceneHeader image={boss.sceneImage} alt={tx(boss.title)} />}
          <p className="beat__eyebrow boss__eyebrow">{tx(UI.worldBoss)} · {tx(boss.theme)}</p>
          <h2 className="beat__title">{tx(boss.title)}</h2>
          <p className="beat__scenario">{tx(boss.scenario)}</p>
          <button className="beat__cta" onClick={() => { sfx.play('tap'); setPhase('scenes'); }}>{tx(UI.beginAudit)}</button>
        </div>
      )}

      {phase === 'scenes' && (
        <div className="beat beat--choice boss-audit">
          <div className="boss-audit__progress">
            {boss.scenes.map((s, i) => (
              <span key={s.id} className={`boss-audit__pip ${i < sceneIdx ? 'boss-audit__pip--done' : i === sceneIdx ? 'boss-audit__pip--current' : ''}`} />
            ))}
          </div>
          <p className="boss-audit__counter">{fmt(tx({ en: 'Scene {n} of {total}', ar: 'المشهد {n} من {total}' }), { n: sceneIdx + 1, total: boss.scenes.length })}</p>
          <h3 className="beat__heading">{tx(scene.place)}</h3>
          <div className="wboss__scene" key={scene.id}>
            <p className="wboss__observation">{tx(scene.observation)}</p>
          </div>

          {!sceneShown ? (
            <>
              <p className="boss-audit__question">{tx({ en: 'Is this the pattern, or a healthy classroom?', ar: 'هل هذا هو النمط، أم صف سليم؟' })}</p>
              <div className="boss-audit__call-buttons">
                <button className={`boss-audit__call boss-audit__call--mutation ${sceneWrong === 'fits' ? 'boss-audit__call--wrong' : ''}`} onClick={() => callScene('fits')}>
                  {tx({ en: 'This is the pattern', ar: 'هذا هو النمط' })}
                </button>
                <button className={`boss-audit__call boss-audit__call--clean ${sceneWrong === 'clear' ? 'boss-audit__call--wrong' : ''}`} onClick={() => callScene('clear')}>
                  {tx({ en: 'This one is healthy', ar: 'هذا الصف سليم' })}
                </button>
              </div>
              {sceneWrong && <p className="beat__hint"><span className="hint-mark">?</span> {tx(scene.hint)}</p>}
            </>
          ) : (
            <>
              <div className={`boss-audit__finding ${scene.fitsPattern ? 'boss-audit__finding--mutation' : 'boss-audit__finding--clean'}`}>
                <span className="boss-audit__verdict">{tx(scene.fitsPattern ? { en: 'The pattern', ar: 'النمط' } : { en: 'Healthy', ar: 'سليم' })}</span>
                <p>{tx(scene.finding)}</p>
              </div>
              <button className="beat__cta" onClick={nextScene}>{tx(last ? UI.makeTheCall : { en: 'Next scene', ar: 'المشهد التالي' })}</button>
            </>
          )}
        </div>
      )}

      {phase === 'pattern' && (
        <ChoiceStep heading={tx({ en: 'Name the Pattern', ar: 'سمِّ النمط' })} prompt={tx(boss.namePattern.prompt)}
          options={boss.namePattern.options} wrong={wrongChoice} hint={tx(boss.namePattern.hint)}
          onPick={(id) => choose('pattern', id, boss.namePattern.correctId, 'risk')} />
      )}
      {phase === 'risk' && (
        <ChoiceStep heading={tx(UI.assessRisk)} prompt={tx(boss.assessRisk.prompt)}
          options={RISK_OPTIONS} wrong={wrongChoice} hint={tx(boss.assessRisk.hint)}
          onPick={(id) => choose('risk', id, boss.assessRisk.correctId, 'coaching')} />
      )}
      {phase === 'coaching' && (
        <ChoiceStep heading={tx({ en: 'The Systemic Move', ar: 'الخطوة المنهجية' })} prompt={tx(boss.coaching.prompt)}
          options={boss.coaching.options} wrong={wrongChoice} hint={tx(boss.coaching.hint)}
          onPick={(id) => choose('coaching', id, boss.coaching.correctId, 'reveal')} />
      )}

      {phase === 'reveal' && (() => {
        const r = result();
        const newBadges = r.badgesEarned.filter((b) => !heldBadges.includes(b));
        return (
          <div className="beat beat--reveal">
            <img src={celebratingToki} alt="" className="reveal__celebrate-toki" />
            <span className="reveal__risk-badge" style={{ background: riskMeta.color }}>{tx(riskMeta.label)}</span>
            <h3 className="beat__heading">{tx(boss.title)}</h3>
            <div className="reveal__block"><p className="reveal__label">{tx(UI.whatDrifted)}</p><p className="reveal__text">{tx(boss.reveal.whatDrifted)}</p></div>
            <div className="reveal__block"><p className="reveal__label">{tx(UI.whyItHappened)}</p><p className="reveal__text">{tx(boss.reveal.whyItHappened)}</p></div>
            <div className="reveal__block"><p className="reveal__label">{tx(UI.howToRestore)}</p><p className="reveal__text">{tx(boss.reveal.howToRestore)}</p></div>
            <div className="boss__final-word"><p>{tx(boss.reveal.finalWord)}</p></div>
            <div className="score-summary">
              <div className="score-summary__row"><span>{tx({ en: 'Scenes read correctly', ar: 'مشاهد قُرئت بشكل صحيح' })}</span><span>{sceneFirstTry.filter(Boolean).length}/{boss.scenes.length}</span></div>
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
            <button className="beat__cta" onClick={() => { sfx.play('tap'); onComplete(r); }}>{tx(UI.continue)}</button>
          </div>
        );
      })()}
    </div>
  );
}

function ChoiceStep({ heading, prompt, options, wrong, hint, onPick }: {
  heading: string; prompt: string; options: { id: string; label: { en: string; ar: string } }[];
  wrong: string | null; hint: string; onPick: (id: string) => void;
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
