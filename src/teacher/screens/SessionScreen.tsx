/**
 * A classroom-universe session (GAME_PACKAGE.md): opening film → session
 * card → L01 hub → scenarios drawn from the pools (each played with the
 * scene / investigation / interaction machinery) → ending → closing.
 * Safe points are between scenarios: Back saves and leaves; the session
 * resumes at the next draw. Lazy-loaded chunk.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { ambience } from '../../audio/ambience';
import { getTermPass, resource } from '../content';
import {
  completeScenario, currentCode, endSession, pickUniverseEnding, scenarioAdventure, scenarioByCode, scenarioRand, startSession,
  scenarioFlags, type Draw, type ScenarioResult, type UState,
} from '../engine/universe';
import type { SimState } from '../engine/sim';
import { markShared, type GameSave } from '../engine/save';
import { track } from '../analytics';
import { S, fmt } from '../strings';
import { ResourceCard, art, useToast } from '../ui';
import { CommunityPanel } from '../components/CommunityPanel';
import { StudentNotes } from '../components/StudentNotes';
import type { Universe, UniverseEnding, Phase as UPhase } from '../types';

const AdventureScreen = lazy(() => import('./AdventureScreen'));

type Phase = 'opening' | 'card' | 'play' | 'ending' | 'closing';

interface Props {
  universe: Universe;
  ustate: UState;
  setU: (fn: (s: UState) => UState) => void;
  qaSeed?: number;
  save: GameSave;
  update: (fn: (s: GameSave) => GameSave) => void;
  registerBack: (fn: (() => boolean) | null) => void;
  onExit: () => void;
  onPass: () => void;
}

const PHASE_ORDER: UPhase[] = ['launch', 'facilitate', 'extend'];

export default function SessionScreen({ universe: U, ustate, setU, qaSeed, save, update, registerBack, onExit, onPass }: Props) {
  const { tx } = useLocale();
  const toast = useToast();
  const [phase, setPhase] = useState<Phase>(ustate.inSession ? 'card' : 'opening');
  const [shot, setShot] = useState(0);
  const [closing, setClosing] = useState<{ ending: UniverseEnding; others: UniverseEnding[]; path: string[]; xp: number; tools: string[]; gained: boolean } | null>(null);
  const [share, setShare] = useState(false);
  const startXp = useRef(ustate.xp);
  const startTools = useRef(ustate.tools);
  const stRef = useRef(ustate);
  stRef.current = ustate;
  const captions = ustate.a11y?.captions !== false;

  useEffect(() => { ambience.set('class-working'); }, []);
  useEffect(() => {
    if (phase === 'play') return; // the scenario screen handles Back (pause → campus)
    registerBack(() => { onExit(); return true; });
    return () => registerBack(null);
  });

  const begin = (resume: boolean) => {
    sfx.play('step');
    if (resume && stRef.current.inSession) {
      track('resume_success', { session: stRef.current.session, at: stRef.current.visited.length });
    } else {
      if (stRef.current.history.length) track('replay_started', { session: stRef.current.session });
      setU((s) => { const n = startSession(s, U); return qaSeed !== undefined ? { ...n, seed: (qaSeed + n.session - 1) >>> 0 } : n; });
    }
    startXp.current = stRef.current.xp;
    startTools.current = stRef.current.tools;
    setPhase('play');
  };

  const cur = phase === 'play' ? currentCode(ustate, U) : null;
  useEffect(() => { if (phase === 'play' && !cur) setPhase('ending'); }, [phase, cur]);

  const onScenarioDone = (draw: Draw, sim: SimState) => {
    const code = draw.code;
    const sc = scenarioByCode(U, code)!;
    const result: ScenarioResult = {
      outcomes: sim.path.map((p) => p.outcome).filter((o) => !o.startsWith('__')),
      outcomeXp: Object.fromEntries(sc.outcomes.map((o) => [o.id, o.xp ?? 0])),
      found: sim.found, flags: sim.flags, students: sim.students, profiles: sim.profiles,
    };
    const r = completeScenario(stRef.current, U, code, result, draw);
    setU(() => r.state);
    track('scenario_complete', { scenario: code, xp: r.xpGained, tools: r.newTools.length });
    if (r.newTools.length) update((s) => ({ ...s, toolkit: Array.from(new Set([...s.toolkit, ...r.newTools])) }));
    if (r.xpGained > 0) toast(fmt(tx(S.xpToast), { n: r.xpGained }));
    window.scrollTo(0, 0);
  };

  const chooseEnding = (ending: UniverseEnding, others: UniverseEnding[]) => {
    const st = stRef.current;
    const path = st.visited;
    const tools = st.tools.filter((t) => !startTools.current.includes(t));
    const xp = st.xp - startXp.current;
    track('ending_reached', { ending: ending.id, session: st.session, steps: path.length });
    // Term Pass: one step per finished session (cosmetic progression only)
    let gained = false;
    const stages = getTermPass().stages.length;
    update((s) => {
      if (s.pass.stage >= stages) return s;
      gained = true;
      return { ...s, pass: { ...s.pass, stage: s.pass.stage + 1 } };
    });
    setU((s) => endSession(s, U, ending.id));
    setClosing({ ending, others, path, xp, tools, gained });
    sfx.play('badge');
    void ambience.shot('bell', 0.7);
    setPhase('closing');
    window.scrollTo(0, 0);
  };

  /* ---------------- render ---------------- */
  if (phase === 'play' && cur) {
    const sc = scenarioByCode(U, cur.code)!;
    const adv = scenarioAdventure(sc, ustate);
    const label = `${tx(S.stageShort[sc.phase])} · ${fmt(tx(S.stepOf), { n: ustate.visited.length + 1 })}`;
    return (
      <Suspense fallback={<div className="ts-loading" />}>
        <AdventureScreen key={`${cur.code}-${ustate.visited.length}-${ustate.session}`} adv={adv} save={save} update={update} registerBack={registerBack}
          scenario={{
            rand: scenarioRand(ustate.seed, cur.code, ustate.visited.length), label, flags: scenarioFlags(ustate), hub: cur.code === U.entry,
            eyebrow: `${fmt(tx(S.sessionN), { n: ustate.session })} · ${tx(S.stageShort[sc.phase])}`, phaseIndex: PHASE_ORDER.indexOf(sc.phase),
            onDone: (sim) => onScenarioDone(cur, sim),
          }}
          onExit={onExit} onReplay={() => {}} onPass={onPass} onOpen={() => {}} />
      </Suspense>
    );
  }

  const film = U.opening;
  const sh = film[shot];
  const who = sh?.who ? U.students.find((s) => s.id === sh.who) : undefined;
  const bg = phase === 'opening' && sh ? sh.picture : (U.scenarios.find((s) => s.code === U.entry)?.scene ?? '');

  let dock: React.ReactNode = null;
  if (phase === 'opening') {
    dock = (
      <div className="t-stack--3">
        {!captions && sh && (sh.narration || sh.line) && <p className="ts-film__text">{who && <b>{tx(who.name)}: </b>}{tx(sh.line ?? sh.narration!)}</p>}
        <div className="ts-row">
          <button type="button" className="t-btn ts-film__next" onClick={() => { sfx.play('tap'); if (shot < film.length - 1) setShot(shot + 1); else setPhase('card'); }}>
            {shot < film.length - 1 ? tx(S.next) : tx(S.continue)}
          </button>
          <button type="button" className="t-btn t-btn--ghost ts-film__skip" onClick={() => setPhase('card')}>{tx(S.skipFilm)}</button>
          <span className="ts-hint ts-film__count"><bdi>{fmt(tx(S.ofN), { i: shot + 1, n: film.length })}</bdi></span>
        </div>
      </div>
    );
  } else if (phase === 'card') {
    dock = (
      <div className="t-stack--3">
        {ustate.inSession ? (
          <>
            <p className="ts-hint">{fmt(tx(S.resumeAt), { n: ustate.visited.length + 1 })}</p>
            <button type="button" className="t-btn t-btn--block ts-session__resume" onClick={() => begin(true)}>{tx(S.resume)}</button>
            <button type="button" className="t-btn t-btn--ghost t-btn--block ts-session__new" onClick={() => begin(false)}>{tx(S.startOver)}</button>
          </>
        ) : (
          <button type="button" className="t-btn t-btn--block ts-session__start" onClick={() => begin(false)}>{tx(S.startPlaying)}</button>
        )}
        <button type="button" className="ts-link" onClick={() => { setShot(0); setPhase('opening'); }}>{tx(S.watchFilm)}</button>
      </div>
    );
  } else if (phase === 'ending' || (phase === 'play' && !cur)) {
    const { primary, others } = pickUniverseEnding(ustate, U);
    dock = (
      <div className="t-stack--3">
        <span className="t-chip">{tx(S.milestone)}</span>
        <h2 className="ts-h-lg">{tx(S.sessionEnds)}</h2>
        <button type="button" className="t-card t-card--raised ts-ending ts-ending--primary" data-ending={primary.id} onClick={() => chooseEnding(primary, others)}>
          <span className="t-eyebrow">{tx(S.mostRelevant)}</span>
          <strong className="ts-ending__title">{tx(primary.title)}</strong>
          <span className="ts-hint">{tx(S.endLessonHere)}</span>
        </button>
        {others.length > 0 && <p className="ts-hint">{tx(S.otherEndings)}</p>}
        {others.map((e) => (
          <button key={e.id} type="button" className="t-card ts-ending" data-ending={e.id} onClick={() => chooseEnding(e, [primary, ...others.filter((o) => o.id !== e.id)])}>
            <strong className="ts-ending__title">{tx(e.title)}</strong>
          </button>
        ))}
      </div>
    );
  } else if (phase === 'closing' && closing) {
    const e = closing.ending;
    const l01 = U.scenarios.find((s) => s.code === U.entry);
    dock = (
      <div className="t-stack--3 ts-closing">
        <h2 className="ts-h-lg" data-ending={e.id}>{tx(e.title)}</h2>
        {e.badge && (
          <div className="ts-badge">
            <div className="t-medal" aria-hidden="true">{e.badge.icon}</div>
            <h3 className="ts-h-lg">{tx(e.badge.title)}</h3>
          </div>
        )}
        {e.followUp && <p className="t-card t-card--inset ts-followup">{tx(e.followUp)}</p>}
        <h3>{tx(S.yourPath)}</h3>
        <div className="ts-path">
          {closing.path.map((c, i) => {
            const s = scenarioByCode(U, c);
            return (
              <span key={c + i} className="ts-path__item">
                {i > 0 && <i className="ts-path__arrow" aria-hidden="true">›</i>}
                <span className={'ts-path__chip' + (s?.kind === 'random' ? ' is-assist' : '')} data-code={c}>{s ? tx(s.title) : c}</span>
              </span>
            );
          })}
        </div>
        <h3>{tx(S.yourStudents)}</h3>
        <StudentNotes universe={U} students={ustate.students} />
        <h3>{tx(S.toolsFound)}</h3>
        {closing.tools.length
          ? <div className="t-stack">{closing.tools.map((id) => { const r = resource(id); return r ? <ResourceCard key={id} r={r} compact /> : null; })}</div>
          : <p className="ts-hint">{tx(S.noNewTools)}</p>}
        {closing.xp > 0 && <p className="ts-hint"><span className="t-xp">+{closing.xp} {tx(S.xp)}</span> {tx(S.xpNote)}</p>}
        {closing.gained && <button type="button" className="t-pass-btn ts-passline" onClick={onPass}>▲ {fmt(tx(S.passGained), { n: 1 })}</button>}
        {!share
          ? <button type="button" className="t-btn t-btn--ghost t-btn--block ts-adv__share" onClick={() => setShare(true)}>{tx(S.shareOptional)}</button>
          : l01 && <CommunityPanel adv={scenarioAdventure(l01, ustate)} shareText={fmt(tx(S.sessionShare), { e: tx(e.title) })}
              onShared={() => update((s) => markShared(s, 'session-' + (ustate.session - 1), getTermPass().stages.length).save)} />}
        <div className="ts-row ts-closing__actions">
          <button type="button" className="t-btn ts-session__campus" onClick={onExit}>{tx(S.toCampus)}</button>
          <button type="button" className="t-btn t-btn--ghost ts-session__again" onClick={() => { setClosing(null); setShare(false); setPhase('card'); }}>{tx(S.playAgain)}</button>
        </div>
      </div>
    );
  }

  const phaseIdx = PHASE_ORDER.indexOf(ustate.phase);
  return (
    <main className="ts-adv is-untimed ts-session" data-phase={phase}>
      <div className="ts-adv__bar">
        <ol className="t-rail" aria-label={tx(S.steps)}>
          {PHASE_ORDER.map((p, i) => (
            <li key={p} className={phase === 'closing' || i < phaseIdx ? 'is-done' : i === phaseIdx && ustate.inSession ? 'is-now' : ''}>{tx(S.stageShort[p])}</li>
          ))}
        </ol>
        <div className="ts-adv__top">
          <button type="button" className="t-btn t-btn--icon ts-leave" onClick={onExit} aria-label={tx(S.back)}><span className="ts-chev" aria-hidden="true">‹</span></button>
          <div className="ts-adv__heading">
            <div className="t-eyebrow ts-on-dark-eyebrow">{fmt(tx(S.sessionN), { n: phase === 'closing' ? ustate.session - 1 : ustate.session })}</div>
            <h1 className="ts-adv__title">{tx(S.universeName)}</h1>
          </div>
        </div>
      </div>
      <div className={'ts-scene' + (phase === 'ending' ? ' is-dim' : '')}>
        <div className="ts-scene__bg" style={{ backgroundImage: `url("${art(bg)}")` }} role="img" aria-label={tx(S.universeName)} />
        {phase === 'opening' && sh && captions && (
          <>
            {who && sh.line && <div className="ts-bubble" key={'b' + shot} style={{ left: '30%', top: '30%' }}><b>{tx(who.name)}</b>{tx(sh.line)}</div>}
            {sh.narration && <div className="ts-caption" key={'c' + shot}>{tx(sh.narration)}</div>}
          </>
        )}
        {phase === 'card' && (
          <div className="t-mission ts-mission">
            <span className="t-mission__tag">{fmt(tx(S.sessionN), { n: ustate.session })}</span>
            <h2 className="t-mission__title">{tx(S.universeName)}</h2>
            <ul className="t-mission__lines">{S.missionLines.map((l, i) => <li key={i}>{tx(l)}</li>)}</ul>
            <p className="t-mission__meta">{tx(S.sessionMeta)}</p>
          </div>
        )}
        {phase === 'closing' && closing && (
          <div className="ts-caption ts-closing-cap">
            <span className="t-eyebrow ts-on-dark-eyebrow">{tx(S.ending)} · {tx(closing.ending.title)}</span>
            <p className="t-narration">{tx(closing.ending.narration)}</p>
          </div>
        )}
      </div>
      <div className="ts-dock">{dock}</div>
    </main>
  );
}
