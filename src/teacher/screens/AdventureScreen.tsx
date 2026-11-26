/**
 * One mission (Alef proposal): opening film → mission card → interactive
 * classroom (investigate students, objects open events or the puzzle) →
 * milestone ending → closing narration → continue / replay / save & exit.
 * Timed adventures (Adventure.timed !== false) keep the lesson clock and
 * the schedule. Back pauses (no penalty); the run resumes later.
 * Lazy-loaded chunk.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { ambience } from '../../audio/ambience';
import { ENABLE_CUSTOMISATION, adventure, getShop, getTermPass, resource, shopItem } from '../content';
import { DECOR_SLOTS, DECOR_SLOT_POS, type PowerupId } from '../dev/shopFixture';
import {
  band, choose, createSim, resolveOutcomeId, findEvent, findStudent, isLessonOver, liveEvents, peek, pickBadge,
  runToNext, teaserEntry, unresolvedEvents, type ChoiceResult, type SimState,
} from '../engine/sim';
import {
  activeTargets, awardXp, drawPool, earnedBadges, isPoolEvent, liveOn, liveTargets, milestoneReached, opensPuzzle, unlockFlags, eligibleEndings, cluesReady, offeredChoices, profileOf, resolveEnding, revealClue, seeded, startEncounter, triggerEvent, type Rand,
} from '../engine/mission';
import { markShared, recordCompletion, type GameSave } from '../engine/save';
import {
  POWERUPS, REWIND_DWELL_MS, applicable, assist, canUse, consume, owned, parentCallTargets, rewind, secondLook, withExtraTime, type PowerupPhase,
} from '../engine/powerups';
import { S, fmt } from '../strings';
import { ResourceCard, art, gradeOf, missionLine, reducedMotion, useToast } from '../ui';
import { CommunityPanel, useShareText } from '../components/CommunityPanel';
import { PathChips } from '../components/PathChips';
import { InteractionView } from '../components/Interactions';
import { interactionOf } from '../engine/interactions';
import { track } from '../analytics';
import { StudentRows } from '../components/StudentRows';
import type { Adventure, ClassEvent, Ending, Outcome } from '../types';

const PuzzleBoard = lazy(() => import('../components/PuzzleBoard'));

type Phase = 'film' | 'mission' | 'explore' | 'result' | 'puzzle' | 'ending' | 'closing';

const KIND_CHIP: Record<ClassEvent['kind'], string> = {
  'needs-help': 't-chip--poor', 'early-finisher': 't-chip--good', 'low-participation': 't-chip--insight', 'new-event': '', unexpected: 't-chip--mixed',
};
const TONE_CARD: Record<Outcome['tone'], string> = { good: 't-card--good', mixed: 't-card--mixed', poor: 't-card--poor', insight: 't-card--insight' };
const PU_CLASS: Record<PowerupId, string> = { rewind: 't-powerup--rewind', extra5: 't-powerup--time', assistant: 't-powerup--assistant', 'second-look': 't-powerup--look', 'parent-call': 't-powerup--parent' };

const clueKind = (id: string): 'notebook' | 'tablet' | 'bubble' | 'evidence' =>
  /notebook|page/.test(id) ? 'notebook' : /tablet|screen/.test(id) ? 'tablet' : /bubble|say|neighbour/.test(id) ? 'bubble' : 'evidence';
const CLUE_GLYPH = { notebook: '✎', tablet: '▣', bubble: '❝', evidence: '∴' } as const;

/** Investigation XP and first-tool XP (proposal: 30 / 50; puzzle XP comes from the puzzle data). */
const XP_TOOL = 50;

/** Pause/resume: an unfinished run lives on this device (no penalty, no expiry). */
interface SavedRun { v: 1; sim: SimState; used: PowerupId[]; solved: boolean; minutes: number }
const runKey = (id: string) => 'toki:teacher:run:' + id;
function loadRun(id: string): SavedRun | null {
  try { const r = JSON.parse(window.localStorage.getItem(runKey(id)) || 'null'); return r && r.v === 1 && r.sim ? r : null; } catch { return null; }
}
function storeRun(id: string, r: SavedRun | null) {
  try { if (r) window.localStorage.setItem(runKey(id), JSON.stringify(r)); else window.localStorage.removeItem(runKey(id)); } catch { /* ignore */ }
}
/** ?seed=N makes the weighted picks reproducible (tests, QA). */
function makeRand(): Rand {
  try { const s = new URLSearchParams(window.location.search).get('seed'); if (s) return seeded(Number(s) || 1); } catch { /* ignore */ }
  return Math.random;
}

/** Universe session: this screen plays one Scenario (Adventure-shaped) and reports back. */
export interface ScenarioMode {
  rand: Rand;
  /** Phase label for the card, e.g. "Launch". */
  label: string;
  /** Session flags the scenario starts with. */
  flags: Record<string, boolean>;
  /** Header line, e.g. "Session 2 · Launch". */
  eyebrow: string;
  /** Entry hub: hotspots in any order, objects optional. Other scenarios: events in order. */
  hub: boolean;
  /** 0 launch · 1 facilitate · 2 extend (the rail). */
  phaseIndex: number;
  onDone: (sim: SimState) => void;
}

interface Props {
  scenario?: ScenarioMode;
  adv: Adventure;
  save: GameSave;
  update: (fn: (s: GameSave) => GameSave) => void;
  registerBack: (fn: (() => boolean) | null) => void;
  onExit: () => void;
  onReplay: () => void;
  onPass: () => void;
  onOpen: (id: string) => void;
}

export default function AdventureScreen({ scenario, adv: baseAdv, save, update, registerBack, onExit, onReplay, onPass, onOpen }: Props) {
  const { tx, lang } = useLocale();
  const toast = useToast();
  const stages = getTermPass().stages.length;
  const untimed = baseAdv.timed === false;
  const rand = useRef<Rand>(scenario?.rand ?? makeRand());
  const saved = useRef<SavedRun | null>(scenario ? null : loadRun(baseAdv.id));
  const [adv, setAdv] = useState<Adventure>(baseAdv);
  const hasFilm = !!baseAdv.film?.length;
  const [phase, setPhase] = useState<Phase>(hasFilm ? 'film' : 'mission');
  const [shot, setShot] = useState(0);
  const [sim, setSim] = useState<SimState>(() => createSim(baseAdv, scenario ? scenario.flags : save.flags));
  const [history, setHistory] = useState<SimState[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [last, setLast] = useState<(ChoiceResult & { event: string; choice: number; isNew: boolean; at: number }) | null>(null);
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const [done, setDone] = useState<{ badge: string; badges: string[]; gained: number; ending?: Ending; xp: number } | null>(null);
  const pendingPuzzle = useRef<{ ev: ClassEvent; i: number } | null>(null);
  const puzzleBase = useRef<SimState | null>(null);
  const hasSchedule = baseAdv.schedule.length > 0;
  const [used, setUsed] = useState<PowerupId[]>([]);
  const [solved, setSolved] = useState(false);
  const [homeLine, setHomeLine] = useState<string | null>(null);
  const [share, setShare] = useState(false);
  const [, setTick] = useState(0);
  const toolkitAtStart = useRef(save.toolkit);
  const panel = useRef<HTMLDivElement>(null);
  const shareText = useShareText(adv, sim.path, sim.found);
  const replaying = (save.runs[adv.id] ?? 0) > 0;

  const goStep = (i: number) => { setStep(i); setSeen((s) => (s.includes(i) ? s : [...s, i])); };
  const scrollPanel = () => window.setTimeout(() => {
    try { panel.current?.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' }); } catch { /* ignore */ }
  }, 30);

  useEffect(() => { ambience.set('class-working'); }, []);
  useEffect(() => {
    if (phase !== 'result' || !last) return;
    const id = window.setTimeout(() => setTick((n) => n + 1), REWIND_DWELL_MS + 30);
    return () => window.clearTimeout(id);
  }, [phase, last]);

  /* ---------- pause / resume (no penalty) ---------- */
  const inPlay = phase === 'explore' || phase === 'result' || phase === 'puzzle';
  const snapshot = useRef<SavedRun | null>(null);
  snapshot.current = !scenario && (inPlay || phase === 'ending') ? { v: 1, sim, used, solved, minutes: adv.lessonMinutes - baseAdv.lessonMinutes } : null;
  useEffect(() => { if (snapshot.current) storeRun(adv.id, snapshot.current); }, [sim, used, solved, phase]); // eslint-disable-line react-hooks/exhaustive-deps
  const pauseAndExit = () => {
    if (snapshot.current) { storeRun(adv.id, snapshot.current); toast(tx(S.pausedToast)); }
    else if (scenario && inPlay) toast(tx(S.pausedToast));
    onExit();
  };
  useEffect(() => {
    registerBack(() => { pauseAndExit(); return true; });
    return () => registerBack(null);
  });
  const resume = () => {
    const r = saved.current;
    if (!r) return;
    setSim(r.sim);
    setUsed(r.used ?? []);
    setSolved(!!r.solved);
    if (r.minutes > 0) setAdv(withExtraTime(baseAdv, r.minutes));
    setPhase('explore');
    goStep(1);
  };

  /* ---------- lesson ---------- */
  const startPlay = () => {
    sfx.play('step');
    track('scenario_enter', { scenario: (baseAdv as Adventure & { code?: string }).code ?? adv.id });
    storeRun(adv.id, null);
    saved.current = null;
    setPhase('explore');
    goStep(1);
  };

  const finish = (s: SimState, ending?: Ending) => {
    const final = untimed ? s : { ...s, t: adv.lessonMinutes };
    setSim(final);
    // Badges: union of the ending's badge, the puzzle's badge (if solved) and the first matching rule.
    const badges = earnedBadges(adv, final, ending, pickBadge(adv, final)?.id);
    const primary = badges[0] ?? '';
    let gained = 0;
    update((cur) => {
      const r = recordCompletion(cur, adv, final, primary, stages, used.length > 0, ending?.opens ?? [], badges);
      gained = r.stagesGained;
      return r.save;
    });
    storeRun(adv.id, null);
    setDone({ badge: primary, badges, gained, ending, xp: final.xp ?? 0 });
    setActive(null);
    setPhase('closing');
    goStep(5);
    void ambience.shot('bell', 0.7);
    sfx.play('badge');
    scrollPanel();
  };

  const toEnding = (s: SimState) => {
    const { primary } = resolveEnding(adv, s.flags);
    if (!primary && !untimed) { finish(s); return; }
    setSim(s);
    setActive(null);
    setPhase('ending');
    goStep(5);
    scrollPanel();
  };

  /** Open an encounter: queue it (so it is "live"), pick its evidence profile once. Board/bookshelf taps also draw a pool event. */
  const openEvent = (ev: ClassEvent) => {
    sfx.play('tap');
    const isDrawObject = untimed && hasSchedule && adv.objects.some((o) => o.id === ev.on) && !(adv.puzzle && ev.choices.some((c) => resolvesTo(c) === adv.puzzle!.id));
    setSim((cur) => {
      let n = cur.queue.some((q) => q.event === ev.id) ? cur : { ...cur, queue: [...cur.queue, { event: ev.id, at: cur.t }] };
      n = startEncounter(n, ev, rand.current);
      if (isDrawObject && !isPoolEvent(adv, ev)) n = drawPool(n, adv, rand.current).sim;
      return n;
    });
    setActive(ev.id);
    setPhase('explore');
    goStep(2);
    scrollPanel();
  };

  const clue = (ev: ClassEvent, clueId: string) => {
    sfx.play('discover');
    track('evidence_reveal', { event: ev.id, clue: clueId });
    setSim((cur) => {
      let n = revealClue(cur, ev.id, clueId);
      if (cluesReady(n, ev) && !cluesReady(cur, ev)) n = awardXp(n, `${adv.id}:inv:${ev.id}`, 0, save.rewarded);
      return n;
    });
  };

  /** Resolve a choice. A student encounter that resolves draws one pool event (content contract §3). */
  const resolveChoice = (base: SimState, ev: ClassEvent, i: number) => {
    setHistory((h) => [...h, base]);
    const r = choose(base, adv, ev.id, i, save.rewarded);
    const isNew = !!r.discovered && !toolkitAtStart.current.includes(r.discovered) && !base.found.includes(r.discovered);
    track('choice_commit', { event: ev.id, choice: i, outcome: r.outcome.id });
    if (isNew && r.discovered) track('tool_discovered', { tool: r.discovered, event: ev.id });
    let n = r.sim;
    if (isNew && r.discovered) n = awardXp(n, `tool:${r.discovered}`, XP_TOOL, save.rewarded);
    if (untimed && hasSchedule && adv.students.some((st) => st.id === ev.on) && !isPoolEvent(adv, ev)) n = drawPool(n, adv, rand.current).sim;
    setSim(n);
    setLast({ ...r, sim: n, event: ev.id, choice: i, isNew, at: Date.now() });
    setActive(null);
    setPhase('result');
    goStep(3);
    if (r.discovered) {
      const res = resource(r.discovered);
      if (res) {
        if (isNew) { sfx.play('discover'); toast(fmt(tx(S.resourceToast), { r: tx(res.title) })); }
        else toast(fmt(tx(S.alreadyInToolkit), { r: tx(res.title) }));
      }
    } else sfx.play(r.outcome.tone === 'good' ? 'correct' : 'step');
    scrollPanel();
  };
  const resolvesTo = (c: ClassEvent['choices'][number]) => (typeof c.outcome === 'string' ? c.outcome : resolveOutcomeId(c, sim.flags));

  const pick = (ev: ClassEvent, i: number) => {
    // A choice whose outcome id equals puzzle.id opens the puzzle first; the outcome shows after it.
    if (adv.puzzle && opensPuzzle(adv, resolvesTo(ev.choices[i])) && !solved) {
      pendingPuzzle.current = { ev, i };
      setActive(null);
      setPhase('puzzle');
      goStep(4);
      return;
    }
    resolveChoice(sim, ev, i);
  };

  const backToClass = () => {
    if (!untimed && isLessonOver(sim, adv)) { toEnding(sim); return; }
    setPhase('explore');
    setLast(null);
    goStep(1);
  };

  const letRun = () => {
    const n = runToNext(sim, adv);
    if (isLessonOver(n, adv) && liveEvents(n).length === 0) { toEnding(n); return; }
    setSim(n);
  };

  const tapTarget = (id: string) => {
    if (phase !== 'explore' || active) return;
    track('hotspot_tap', { target: id });
    if (untimed && hasSchedule) {
      const firstOpen = liveTargets(sim, adv)[0];
      const ev = scenario && !scenario.hub && id !== firstOpen ? undefined : liveOn(sim, adv, id)[0];
      if (ev) { openEvent(ev); return; }
      if (adv.puzzle && id === adv.puzzle.id && !solved && !adv.events.some((e) => e.on === id && !sim.done.includes(e.id))) { sfx.play('tap'); setPhase('puzzle'); goStep(4); return; }
    } else if (untimed) {
      if (adv.puzzle && id === adv.puzzle.id && !solved) { sfx.play('tap'); setPhase('puzzle'); goStep(4); return; }
      const ev = triggerEvent(sim, adv, rand.current, id);
      if (ev) { openEvent(ev); return; }
    } else {
      const ev = liveEvents(sim).map((e) => findEvent(adv, e)!).find((e) => e.on === id);
      if (ev) { openEvent(ev); return; }
    }
    const stu = findStudent(adv, id);
    if (stu) {
      const p = peek(sim, adv, id);
      if (p.seen && stu.peek) { setSim(p.sim); toast(tx(stu.peek.text)); sfx.play('discover'); return; }
      toast(tx(stu.idle));
      return;
    }
    const obj = adv.objects.find((o) => o.id === id);
    if (obj) toast(adv.puzzle && obj.id === adv.puzzle.id && solved ? tx(S.puzzleDoneIdle) : tx(obj.idle));
  };

  const puzzleSolved = () => {
    if (!adv.puzzle) return;
    const p = adv.puzzle;
    setSolved(true);
    const withPuzzle = awardXp({ ...sim, flags: { ...sim.flags, ['puzzle:' + p.id]: true } }, `${adv.id}:puzzle:${p.id}`, p.xp, save.rewarded);
    setSim(withPuzzle);
    sfx.play('badge');
    const b = adv.badges.find((x) => x.id === p.badge);
    if (b) toast(fmt(tx(S.badgeToast), { b: tx(b.title) }));
    puzzleBase.current = withPuzzle;
  };
  /** Leaving the puzzle: if a choice opened it and it was solved, its outcome shows now. */
  const closePuzzle = () => {
    const pend = pendingPuzzle.current;
    pendingPuzzle.current = null;
    if (pend && puzzleBase.current) { const base = puzzleBase.current; puzzleBase.current = null; resolveChoice(base, pend.ev, pend.i); return; }
    puzzleBase.current = null;
    setPhase('explore');
    goStep(1);
  };

  /* ---------- power-ups (customisation; one use each per mission) ---------- */
  const puPhase: PowerupPhase = phase === 'mission' ? 'watch' : phase === 'explore' ? 'sim' : phase === 'result' ? 'result' : 'other';
  const puCtx = { phase: puPhase, sim, adv, history, activeEvent: active, resultShownMs: last ? Date.now() - last.at : 0 };
  const usePowerup = (id: PowerupId) => {
    if (!canUse(save, used, id) || !applicable(id, puCtx)) return;
    switch (id) {
      case 'parent-call': {
        const s0 = parentCallTargets(adv)[0];
        if (!s0?.homeNote) return;
        setHomeLine(`${tx(s0.name)}: ${tx(s0.homeNote)}`);
        break;
      }
      case 'second-look': {
        const r = secondLook(sim, adv);
        if (!r) return;
        setSim(r.sim);
        toast(tx(r.text));
        break;
      }
      case 'rewind': {
        const r = rewind(history, sim);
        if (!r || !last) return;
        toast(fmt(tx(S.rewound), { o: tx(last.outcome.title) }));
        setSim(r.sim);
        setHistory(r.history);
        setLast(null);
        setActive(last.event);
        setPhase('explore');
        break;
      }
      case 'assistant': {
        const r = assist(sim, adv);
        if (!r) return;
        setSim(r.sim);
        setActive(null);
        toast(tx(S.assistDone));
        break;
      }
      case 'extra5':
        setAdv(withExtraTime(adv));
        toast(tx(S.extraDone));
        break;
    }
    sfx.play('discover');
    setUsed((u) => [...u, id]);
    update((s) => consume(s, id));
  };
  const trayIds = ENABLE_CUSTOMISATION
    ? POWERUPS.filter((id) => (owned(save, id) > 0 || used.includes(id))
      && (id !== 'parent-call' || parentCallTargets(adv).length > 0)
      && (id !== 'extra5' || !untimed))
    : [];
  const tray = trayIds.length > 0 && puPhase !== 'other' ? (
    <div className="t-powerup-tray ts-tray" role="group" aria-label={tx(S.powerups)}>
      <span className="t-powerup-tray__label">{tx(S.powerups)}</span>
      {trayIds.map((id) => {
        const item = getShop().find((x) => x.powerup === id);
        if (!item) return null;
        const n = owned(save, id);
        const isUsed = used.includes(id);
        const ok = canUse(save, used, id) && applicable(id, puCtx);
        return (
          <button key={id} type="button" className={`t-powerup ${PU_CLASS[id]}` + (isUsed ? ' is-used' : '')} data-pu={id} disabled={!ok}
            onClick={() => usePowerup(id)} aria-label={tx(item.name) + (isUsed ? ` · ${tx(S.usedThisLesson)}` : ` · ${fmt(tx(S.held), { n })}`)}
            title={item.what ? tx(item.what) : undefined}>
            <b>{isUsed ? '✓' : item.icon}</b>
            {!isUsed && <span className="t-powerup__count">{n}</span>}
          </button>
        );
      })}
    </div>
  ) : null;

  /* ---------- render pieces ---------- */
  const pulsing = phase === 'explore'
    ? (untimed
      ? (hasSchedule
        ? (scenario && !scenario.hub ? liveTargets(sim, adv).slice(0, 1) : liveTargets(sim, adv))
        : [...activeTargets(sim, adv), ...(adv.puzzle && !solved ? [adv.puzzle.id] : [])])
      : liveEvents(sim).map((e) => findEvent(adv, e)!.on))
    : [];
  const whoName = (on: string) => {
    const s = findStudent(adv, on);
    if (s) return tx(s.name);
    const o = adv.objects.find((x) => x.id === on);
    return o ? tx(o.label) : on;
  };
  const activeOn = active ? findEvent(adv, active)?.on : undefined;
  const showPins = phase === 'explore' || phase === 'result';
  const dim = !showPins && phase !== 'closing' && phase !== 'mission' && phase !== 'film';
  const decor = ENABLE_CUSTOMISATION ? DECOR_SLOTS
    .map((slot) => ({ slot, item: save.placed[slot] ? shopItem(save.placed[slot]) : undefined, pos: DECOR_SLOT_POS[slot] }))
    .filter((d) => d.item && d.pos) : [];
  const minsLeft = Math.max(0, adv.lessonMinutes - sim.t);
  const metCount = adv.students.filter((st) => adv.events.some((e) => e.on === st.id && (sim.done.includes(e.id) || !!sim.profiles?.[e.id]))).length;
  const endingNow = untimed && milestoneReached(sim, adv) ? resolveEnding(adv, sim.flags).primary : undefined;
  /** Scenario milestone: every student hotspot event resolved (no student hotspots: every hotspot). */
  const studentHot = adv.schedule.filter((q) => adv.students.some((st) => st.id === findEvent(adv, q.event)?.on));
  const scenarioComplete = scenario && !scenario.hub
    ? liveTargets(sim, adv).length === 0
    : (studentHot.length ? studentHot : adv.schedule).every((q) => sim.done.includes(q.event)) && adv.students.every((st) => liveOn(sim, adv, st.id).length === 0);
  const film = adv.film ?? [];
  const sceneUrl = phase === 'film' && film[shot] ? film[shot].picture : adv.scene;

  let panelBody: React.ReactNode = null;
  if (phase === 'film') {
    const sh = film[shot];
    panelBody = (
      <div className="ts-row">
        <button type="button" className="t-btn ts-film__next" onClick={() => { sfx.play('tap'); if (shot < film.length - 1) setShot(shot + 1); else { setPhase('mission'); } }}>
          {shot < film.length - 1 ? tx(S.next) : tx(S.continue)}
        </button>
        <button type="button" className="t-btn t-btn--ghost ts-film__skip" onClick={() => setPhase('mission')}>{tx(S.skipFilm)}</button>
        {sh && <span className="ts-hint ts-film__count"><bdi>{fmt(tx(S.ofN), { i: shot + 1, n: film.length })}</bdi></span>}
      </div>
    );
  } else if (phase === 'mission') {
    panelBody = (
      <div className="t-stack--3 ts-mission-dock">
        {homeLine && <p className="t-card t-card--inset ts-colleague">{homeLine}</p>}
        {saved.current ? (
          <>
            <button type="button" className="t-btn t-btn--block ts-mission__resume" onClick={resume}>{tx(S.resume)}</button>
            <button type="button" className="t-btn t-btn--ghost t-btn--block ts-mission__start" onClick={startPlay}>{tx(S.startOver)}</button>
          </>
        ) : (
          <button type="button" className="t-btn t-btn--block ts-mission__start" onClick={startPlay}>{tx(S.startPlaying)}</button>
        )}
        {hasFilm && !scenario && <button type="button" className="ts-link" onClick={() => { setShot(0); setPhase('film'); }}>{tx(S.watchFilm)}</button>}
      </div>
    );
  } else if (phase === 'explore' && active) {
    const ev = findEvent(adv, active)!;
    const prof = profileOf(sim, ev);
    const revealed = sim.clues?.[ev.id] ?? [];
    const inter = interactionOf(ev);
    const usesClues = !!ev.investigate && (!inter || inter === 'investigate' || inter === 'compare');
    const interDone = !!sim.clues?.[ev.id]?.includes('__done');
    const ready = usesClues || !inter || !ev.task ? cluesReady(sim, ev) : interDone;
    const offer = offeredChoices(ev, sim.flags);
    panelBody = (
      <div className="t-stack--3">
        <div className="ts-row ts-row--between">
          <span className={`t-chip t-chip--dot ${KIND_CHIP[ev.kind]}`}>{tx(S.kind[ev.kind])}</span>
          {!untimed && <span className="t-chip t-chip--time"><bdi>{fmt(tx(S.minLeft), { n: minsLeft })}</bdi></span>}
        </div>
        <h2 className="ts-h-lg">{whoName(ev.on)}: {tx(ev.line)}</h2>
        <p className="ts-hint">{tx(ev.ask)}</p>
        {ev.investigate && (() => {
          const firstClosed = ev.investigate.clues.find((c) => !revealed.includes(c.id))?.id;
          const need = ev.investigate.minClues ?? ev.investigate.clues.length;
          return (
            <>
              <div className="ts-clues" role="group" aria-label={tx(S.clues)}>
                {ev.investigate.clues.map((c) => {
                  const open = revealed.includes(c.id);
                  const text = prof?.clues[c.id] ?? c.text;
                  const kind = clueKind(c.id);
                  return (
                    <button key={c.id} type="button" className={`t-clue t-clue--${kind}` + (open ? ' is-open' : c.id === firstClosed ? ' is-next' : '')} data-clue={c.id}
                      aria-expanded={open} aria-label={tx(c.label) + (open ? ': ' + tx(text) : ', ' + tx(S.tapToLook))} onClick={() => !open && clue(ev, c.id)}>
                      <span className="t-clue__inner">
                        <span className="t-clue__back" aria-hidden="true">
                          <span className="t-clue__glyph">{CLUE_GLYPH[kind]}</span>
                          <span className="t-clue__label">{tx(c.label)}</span>
                          <span className="t-clue__hint">{c.text && tx(c.text) ? tx(c.text) : tx(S.tapToLook)}</span>
                        </span>
                        <span className="t-clue__face" aria-hidden="true">
                          <span className="t-clue__label">{tx(c.label)}</span>
                          <span className="t-clue__text">{open ? tx(text) : ''}</span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="t-clue-progress">
                <bdi>{fmt(tx(S.cluesOf), { a: revealed.length, b: ev.investigate.clues.length })}</bdi>
                <span className="t-meter t-meter--pips" aria-hidden="true">{ev.investigate.clues.map((c, i) => <i key={c.id} className={i < revealed.length ? 'on' : ''} />)}</span>
              </p>
              {!ready && <p className="t-lock-note">{fmt(tx(S.lookMore), { n: need - revealed.length })}</p>}
            </>
          );
        })()}
        {inter && !usesClues && ev.task && (
          <InteractionView type={inter} task={ev.task} done={interDone} rand={rand.current}
            onEvidence={(id) => track('evidence_reveal', { event: ev.id, clue: id })}
            onDone={() => setSim((cur) => revealClue(cur, ev.id, '__done'))} />
        )}
        {(
          <div className={'t-stack ts-choices' + (ready ? '' : ' t-choices-locked')}>
            {ev.investigate && <h3 className="ts-h-md">{tx(S.whatNow)}</h3>}
            {offer.map(({ choice: c, index: i }) => (
              <button key={i} type="button" className="t-btn t-btn--choice ts-opt" disabled={!ready} onClick={() => pick(ev, i)}>
                <span className="ts-opt__txt"><strong>{tx(c.label)}</strong><small>{tx(c.sub)}</small></span>
                {!untimed && <span className="t-chip t-chip--time ts-opt__min"><bdi>{fmt(tx(S.min), { n: c.minutes })}</bdi></span>}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="ts-link ts-encounter__later" onClick={() => setActive(null)}>{tx(S.lookElsewhere)}</button>
      </div>
    );
  } else if (phase === 'explore') {
    if (untimed) {
      panelBody = (
        <div className="t-stack--3">
          <h2 className="ts-h-lg">{tx(S.exploreTitle)}</h2>
          <p className="ts-hint">{pulsing.length ? tx(S.exploreHint) : tx(S.exploreDone)}</p>
          <div className="ts-chips">
            {[...adv.students.map((st) => ({ id: st.id, name: tx(st.name) })), ...adv.objects.map((o) => ({ id: o.id, name: tx(o.label) }))].map((x) => {
              const looked = adv.events.some((e) => e.on === x.id && sim.done.includes(e.id)) || (adv.puzzle?.id === x.id && solved);
              return <span key={x.id} className={'t-chip ' + (looked ? 't-chip--good t-chip--dot' : 't-chip--placeholder')}>{x.name} · {looked ? tx(S.lookedInto) : tx(S.isNew)}</span>;
            })}
          </div>
          {scenario && scenarioComplete && (
            <button type="button" className={'t-btn t-btn--block ts-scn__continue' + (pulsing.length ? ' t-btn--ghost' : '')} onClick={() => { sfx.play('step'); scenario.onDone(sim); }}>{tx(S.continueLesson)}</button>
          )}
          {!scenario && endingNow && (
            <button type="button" className={'t-btn t-btn--block ts-adv__begin' + (pulsing.length ? ' t-btn--ghost' : '')} onClick={() => toEnding(sim)}>{tx(S.beginLesson)}</button>
          )}
        </div>
      );
    } else if (liveEvents(sim).length === 0) {
      panelBody = (
        <div className="t-stack--3">
          <p className="ts-hint">{tx(S.classWorking)}</p>
          <div className="ts-row"><button type="button" className="t-btn ts-adv__run" onClick={() => { sfx.play('tap'); letRun(); }}>{tx(S.letRun)}</button></div>
        </div>
      );
    } else {
      const names = liveEvents(sim).map((e) => whoName(findEvent(adv, e)!.on));
      const who = names.length > 1 ? names.slice(0, -1).join(lang === 'ar' ? '، ' : ', ') + tx(S.or) + names[names.length - 1] : names[0];
      panelBody = (
        <div className="t-stack">
          <h2 className="ts-h-lg">{names.length > 1 ? fmt(tx(S.manyNeedYou), { n: names.length }) : tx(S.oneNeedsYou)}</h2>
          <p className="ts-hint">{fmt(tx(S.tapWho), { who })}</p>
        </div>
      );
    }
  } else if (phase === 'result' && last) {
    const o = last.outcome;
    const res = last.discovered ? resource(last.discovered) : undefined;
    const xpNow = (last.sim.xp ?? 0) - ((history[history.length - 1]?.xp) ?? 0);
    panelBody = (
      <div className="t-stack--3">
        <div className={`t-card ${TONE_CARD[o.tone]} ts-result`}>
          <h3>{tx(o.title)}</h3>
          <p className="ts-hint">{tx(o.body)}</p>
          {o.effects.length > 0 && (
            <p className="ts-effects">
              {o.effects.map((fx, i) => {
                const s = findStudent(adv, fx.student);
                const arr = (n?: number) => (!n ? '' : n > 0 ? '↑'.repeat(Math.min(3, n)) : '↓'.repeat(Math.min(3, -n)));
                const parts = [fx.understanding ? `${tx(S.understanding)} ${arr(fx.understanding)}` : '', fx.engagement ? `${tx(S.engagement)} ${arr(fx.engagement)}` : ''].filter(Boolean);
                return parts.length ? <span key={i} className="t-chip">{s ? tx(s.name) : fx.student} · {parts.join(' · ')}</span> : null;
              })}
            </p>
          )}
          {xpNow > 0 && <span className="t-xp">+{xpNow} {tx(S.xp)}</span>}
        </div>
        {res && last.isNew && <div className="t-reveal"><ResourceCard r={res} eyebrow={`${tx(S.newTool)} · ${tx(S.stage[res.stage])}`} /></div>}
        {last.opened && <p className="ts-hint">{tx(S.opensLater)}</p>}
        <div className="ts-row"><button type="button" className="t-btn ts-adv__back" onClick={() => { sfx.play('tap'); backToClass(); }}>{tx(S.backToClass)}</button></div>
      </div>
    );
  } else if (phase === 'puzzle' && adv.puzzle) {
    panelBody = (
      <Suspense fallback={<div className="ts-loading" />}>
        <PuzzleBoard puzzle={adv.puzzle} solved={solved} onSolved={puzzleSolved}
          badge={adv.badges.find((b) => b.id === adv.puzzle!.badge)} onClose={closePuzzle} />
      </Suspense>
    );
  } else if (phase === 'ending') {
    const { primary, others } = resolveEnding(adv, sim.flags);
    const missed = !untimed ? unresolvedEvents(sim, adv).map((e) => tx(S.kind[findEvent(adv, e)!.kind])) : [];
    panelBody = (
      <div className="t-stack--3">
        <span className="t-chip">{tx(S.milestone)}</span>
        <h2 className="ts-h-lg">{tx(S.whereLanded)}</h2>
        <StudentRows adv={adv} states={sim.students} />
        {missed.length > 0 && <p className="ts-hint">{fmt(tx(S.notReached), { list: missed.join(lang === 'ar' ? '، ' : ', ') })}</p>}
        {primary ? (
          <>
            <button type="button" className="t-card t-card--raised ts-ending ts-ending--primary" data-ending={primary.id} onClick={() => finish(sim, primary)}>
              <span className="t-eyebrow">{tx(S.mostRelevant)}</span>
              <strong className="ts-ending__title">{tx(primary.title)}</strong>
              <span className="ts-hint">{tx(S.endHere)}</span>
            </button>
            {others.length > 0 && <p className="ts-hint">{tx(S.otherEndings)}</p>}
            {others.map((e) => (
              <button key={e.id} type="button" className="t-card ts-ending" data-ending={e.id} onClick={() => finish(sim, e)}>
                <strong className="ts-ending__title">{tx(e.title)}</strong>
              </button>
            ))}
          </>
        ) : (
          <button type="button" className="t-btn" onClick={() => finish(sim)}>{tx(S.continue)}</button>
        )}
        {untimed && <button type="button" className="ts-link" onClick={() => setPhase('explore')}>{tx(S.keepExploring)}</button>}
      </div>
    );
  } else if (phase === 'closing' && done) {
    const b = adv.badges.find((x) => x.id === done.badge) ?? adv.badges[adv.badges.length - 1];
    const teaser = teaserEntry(adv, { ...save.flags, ...sim.flags });
    const endWhy = done.ending ? tx(done.ending.title) : '';
    const flagWhy = tx(S.openedByChoice);
    const opens = [
      ...(done.ending?.opens ?? (adv.unlocks ? [adv.unlocks] : [])).map((id) => ({ id, a: adventure(id), why: endWhy })),
      ...unlockFlags(sim.flags).map((id) => ({ id, a: adventure(id), why: flagWhy })),
    ].filter((o, i, arr) => arr.findIndex((y) => y.id === o.id) === i);
    const otherOpens = eligibleEndings(adv, sim.flags)
      .filter((e) => e.id !== done.ending?.id)
      .flatMap((e) => (e.opens ?? []).map((id) => ({ id, a: adventure(id), why: tx(e.title) })))
      .filter((o, i, arr) => !opens.some((x) => x.id === o.id) && arr.findIndex((y) => y.id === o.id) === i);
    const nextPlayable = opens.find((o) => o.a);
    panelBody = (
      <div className="t-stack--3">
        {done.ending && <h2 className="ts-h-lg" data-ending={done.ending.id}>{tx(done.ending.title)}</h2>}
        {b && (
          <div className="ts-badge">
            <div className="t-medal" aria-hidden="true">{b.icon}</div>
            <h3 className="ts-h-lg">{tx(b.title)}</h3>
            <p className="ts-hint">{tx(b.why)}</p>
          </div>
        )}
        {done.badges.slice(1).map((id) => { const ob = adv.badges.find((q) => q.id === id); return ob ? <p key={id} className="ts-row ts-pbadge" data-badge={id}><span className="t-medal t-medal--sm" aria-hidden="true">{ob.icon}</span><span>{tx(ob.title)}</span></p> : null; })}
        <h3>{tx(S.yourPath)}</h3>
        <PathChips adv={adv} path={sim.path} />
        <h3>{tx(S.toolsFound)}</h3>
        {sim.found.length
          ? <div className="t-stack">{sim.found.map((id) => { const r = resource(id); return r ? <ResourceCard key={id} r={r} compact /> : null; })}</div>
          : <p className="ts-hint">{tx(S.noResources)}</p>}
        {done.xp > 0 && <p className="ts-hint"><span className="t-xp">+{done.xp} {tx(S.xp)}</span> {tx(S.xpNote)}</p>}
        {ENABLE_CUSTOMISATION && done.gained > 0 && (
          <button type="button" className="t-pass-btn ts-passline" onClick={onPass}>▲ {fmt(tx(S.passGained), { n: done.gained })}</button>
        )}
        <h3>{tx(S.missionsOpened)}</h3>
        {teaser && <p className="ts-hint">{tx(teaser.text)}</p>}
        <div className="t-stack">
          {[...opens, ...otherOpens].map(({ id, a, why }, i) => (
            <button key={id + i} type="button" className={'t-open-mission' + (i === 0 ? ' t-open-mission--first' : '')} data-open={id}
              onClick={() => (a ? onOpen(id) : toast(fmt(tx(S.missionComing), { id })))}>
              <span className="t-open-mission__num t-num">{a ? String(a.number).padStart(2, '0') : '··'}</span>
              <strong>{a ? tx(a.title) : fmt(tx(S.missionComing), { id })}</strong>
              <small>{why}</small>
            </button>
          ))}
        </div>
        {!share
          ? <button type="button" className="t-btn t-btn--ghost t-btn--block ts-adv__share" onClick={() => { setShare(true); goStep(4); }}>{tx(S.shareOptional)}</button>
          : <CommunityPanel adv={adv} shareText={shareText} onShared={() => {
              let credited = false;
              update((s) => { const r = markShared(s, adv.id, stages); credited = r.credited; return r.save; });
              if (credited) setDone((d) => (d ? { ...d, gained: d.gained + 1 } : d));
            }} />}
        <div className="ts-row ts-closing__actions">
          <button type="button" className="t-btn ts-adv__continue" onClick={() => { sfx.play('tap'); goStep(6); if (nextPlayable) onOpen(nextPlayable.id); else onExit(); }}>{tx(S.continue)}</button>
          <button type="button" className="t-btn t-btn--ghost ts-adv__replay" onClick={onReplay}>{tx(S.replay)}</button>
          <button type="button" className="t-btn t-btn--ghost ts-adv__exit" onClick={onExit}>{tx(S.saveExit)}</button>
        </div>
      </div>
    );
  }

  const showClock = !untimed && (phase === 'explore' || phase === 'result');
  return (
    <main className={'ts-adv' + (untimed ? ' is-untimed' : '')} data-phase={phase}>
      <div className="ts-adv__bar">
        <ol className="t-rail" aria-label={tx(S.steps)}>
          {scenario
            ? (['launch', 'facilitate', 'extend'] as const).map((p, i) => (
              <li key={p} className={i === scenario.phaseIndex ? 'is-now' : i < scenario.phaseIndex ? 'is-done' : ''} aria-current={i === scenario.phaseIndex ? 'step' : undefined}>{tx(S.stageShort[p])}</li>
            ))
            : S.loop6.map((l, i) => (
              <li key={i} className={i === step ? 'is-now' : seen.includes(i) ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>{tx(l)}</li>
            ))}
        </ol>
        <div className="ts-adv__top">
          <button type="button" className="t-btn t-btn--icon ts-leave" onClick={pauseAndExit} aria-label={inPlay ? tx(S.pauseExit) : tx(S.back)}>
            <span className="ts-chev" aria-hidden="true">‹</span>
          </button>
          <div className="ts-adv__heading">
            <div className="t-eyebrow ts-on-dark-eyebrow">{scenario ? scenario.eyebrow : missionLine(fmt(tx(S.missionN), { n: String(adv.number).padStart(2, '0') }), tx(adv.meta))}</div>
            <h1 className="ts-adv__title">{tx(adv.title)}</h1>
          </div>
          {showClock && (
            <div className="t-hud-card t-hud-card--dark ts-adv__clock">
              <span className="t-num"><bdi>{fmt(tx(S.minutes), { t: Math.min(sim.t, adv.lessonMinutes), total: adv.lessonMinutes })}</bdi></span>
              <div className="t-meter t-meter--time"><i className="t-meter__fill" style={{ width: Math.min(100, (sim.t / adv.lessonMinutes) * 100) + '%' }} /></div>
            </div>
          )}
          {untimed && (phase === 'explore' || phase === 'result' || phase === 'puzzle') && (
            <div className="t-hud-card t-hud-card--dark ts-adv__clock ts-bell">
              <span className="ts-bell__label">{tx(S.beforeBell)}</span>
              <span className="t-meter t-meter--pips" role="img" aria-label={fmt(tx(S.studentsMet), { a: metCount, b: adv.students.length })}>
                {adv.students.map((st, i) => <i key={st.id} className={i < metCount ? 'on' : ''} />)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={'ts-scene' + (dim ? ' is-dim' : '')}>
        <div className="ts-scene__bg" style={{ backgroundImage: `url("${art(sceneUrl)}")` }} role="img" aria-label={tx(adv.title)} />
        {decor.map(({ slot, item, pos }) => (
          <span key={slot} className="ts-decor" style={{ left: pos!.x + '%', top: pos!.y + '%' }} title={tx(item!.name)} aria-hidden="true">{item!.icon}</span>
        ))}
        {phase === 'mission' && (
          <div className="t-mission ts-mission">
            <span className="t-mission__tag">{scenario ? scenario.label : fmt(tx(S.missionN), { n: String(adv.number).padStart(2, '0') })}</span>
            <h2 className="t-mission__title">{tx(adv.title)}</h2>
            <ul className="t-mission__lines">{S.missionLines.map((l, i) => <li key={i}>{tx(l)}</li>)}</ul>
            <p className="t-mission__meta">{scenario ? tx(adv.intro[0] ?? adv.meta) : `${gradeOf(tx(adv.meta))} · ${tx(S.missionMeta)}`}</p>
          </div>
        )}
        {phase === 'closing' && done?.ending && (
          <div className="ts-caption ts-closing-cap">
            <span className="t-eyebrow ts-on-dark-eyebrow">{tx(S.ending)} · {tx(done.ending.title)}</span>
            <p className="t-narration">{tx(done.ending.narration)}</p>
          </div>
        )}
        {phase === 'film' && film[shot] && (() => {
          const sh = film[shot];
          const s = sh.who ? findStudent(adv, sh.who) : undefined;
          return (
            <>
              {s && sh.line && (
                <div className="ts-bubble" key={shot} style={{ left: Math.min(Math.max(s.x - 20, 2), 52) + '%', top: Math.max(4, s.y - 26) + '%' }}>
                  <b>{tx(s.name)}</b>{tx(sh.line)}
                </div>
              )}
              {sh.narration && <div className="ts-caption" key={'c' + shot}>{tx(sh.narration)}</div>}
            </>
          );
        })()}
        {showPins && adv.students.map((s) => {
          const needs = pulsing.includes(s.id);
          const met = untimed ? adv.events.some((e) => e.on === s.id && (sim.done.includes(e.id) || !!sim.profiles?.[e.id])) : true;
          const b = band(sim.students[s.id]);
          const cls = 't-hot' + (met ? ` t-hot--${b}` : '') + (needs ? ' t-hot--needs' : '') + (activeOn === s.id ? ' t-hot--active' : activeOn ? ' t-hot--quiet' : '');
          return (
            <button key={s.id} type="button" className={cls} data-target={s.id} style={{ left: s.x + '%', top: s.y + '%' }}
              onClick={() => tapTarget(s.id)} aria-label={tx(s.name) + (needs ? ', ' + tx(S.lookCloser) : '')}>
              <span className="t-hot__ring">{tx(s.name).charAt(0)}</span>
              {needs && <span className="t-hot__flag" aria-hidden="true">?</span>}
              <span className="t-hot__name">{tx(s.name)}</span>
            </button>
          );
        })}
        {showPins && adv.objects.map((o) => {
          const needs = pulsing.includes(o.id);
          const cls = 't-hot t-hot--object' + (needs ? ' t-hot--needs' : '') + (activeOn === o.id ? ' t-hot--active' : activeOn ? ' t-hot--quiet' : '');
          return (
            <button key={o.id} type="button" className={cls} data-target={o.id} style={{ left: o.x + '%', top: o.y + '%' }}
              onClick={() => tapTarget(o.id)} aria-label={tx(o.label) + (needs ? ', ' + tx(S.lookCloser) : '')}>
              <span className="t-hot__ring">{o.icon}</span>
              {needs && <span className="t-hot__flag" aria-hidden="true">?</span>}
              <span className="t-hot__name">{tx(o.label)}</span>
            </button>
          );
        })}
        {tray}
      </div>

      <div className="ts-dock" ref={panel}>{panelBody}</div>
      {replaying && phase === 'mission' && <p className="ts-note">{tx(S.replayNote)}</p>}
    </main>
  );
}
