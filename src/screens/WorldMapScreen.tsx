import { useEffect, useMemo, useRef, useState } from 'react';
import { WORLDS, type WorldDefinition } from '../data/worlds';
import { getSkinById } from '../data/skins';
import { isWorldComplete, isWorldUnlocked, currentWorld as findCurrent } from '../data/progression';
import { useLocale } from '../i18n/LocaleContext';
import { schoolArt, mapArt, useArt } from '../assets/art';
import { UI, fmt } from '../i18n/ui';
import { STORY_UI } from '../i18n/storyUi';
import { sfx } from '../audio/sfx';
import { TopBar } from '../components/TopBar';
import { PeoplePair } from '../components/PeopleGlyphs';
import './WorldMapScreen.css';

interface WorldMapScreenProps {
  bestScores: Record<number, number>;
  badges: string[];
  skinId: string;
  onEnterWorld: (worldId: string) => void;
  onOpenSkins: () => void;
  onOpenBadges: () => void;
  onOpenBoard?: () => void;
  onOpenStories?: () => void;
  onBack: () => void;
  /** World Toki last stood at on the map. When it is a world just
   *  completed and the current world is a new one, Toki walks over. */
  walkFrom?: string;
  /** Called once Toki stands at the current world (walk done or skipped). */
  onArrived?: (worldId: string) => void;
}

type WorldState = 'locked' | 'current' | 'done' | 'soon';

/**
 * The journey. A winding road across a stylised landscape with one
 * school per world; Toki stands at the current world and walks the
 * road when you choose a destination. Worlds not yet authored appear
 * as the road ahead — visible, named, locked — so the quest reads as
 * a journey with a horizon rather than a list that ends.
 */
export function WorldMapScreen({ bestScores, badges, skinId, onEnterWorld, onOpenSkins, onOpenBadges, onOpenBoard, onOpenStories, onBack, walkFrom, onArrived }: WorldMapScreenProps) {
  const { tx, dir } = useLocale();
  const skin = getSkinById(skinId);
  const pathRef = useRef<SVGPathElement>(null);
  const [travelTo, setTravelTo] = useState<string | null>(null);
  const [tokiPos, setTokiPos] = useState<{ x: number; y: number } | null>(null);
  useArt();
  const [entering, setEntering] = useState<string | null>(null);
  // World-complete journey: celebrate the finished school, walk the road
  // to the new one, hop, and light it up.
  const [journey, setJourney] = useState<null | 'celebrate' | 'walk' | 'arrived'>(null);
  const [hop, setHop] = useState(false);
  const skipRef = useRef<() => void>(() => {});

  const worldState = (w: WorldDefinition): WorldState => {
    if (w.comingSoon) return 'soon';
    if (isWorldComplete(w, bestScores)) return 'done';
    if (isWorldUnlocked(w, bestScores)) return 'current';
    return 'locked';
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const states = useMemo(() => Object.fromEntries(WORLDS.map((w) => [w.id, worldState(w)])), [bestScores]);
  const currentWorld = findCurrent(bestScores);
  // Toki rests beside the current school — on the left when the school
  // is near the right edge, and never so high that his head leaves the map.
  // Rest: on the road just in front of the school, to its side — feet on
  // the ground line, never on the roof.
  const restOf = (n: { x: number; y: number }) => ({ x: n.x > 60 ? n.x - 12 : n.x + 12, y: Math.max(n.y + 3, 12) });
  const restNode = tokiPos ?? restOf(currentWorld.node);

  // The road: a Catmull-Rom spline through every node (converted to
  // cubic beziers), so it winds naturally instead of hair-pinning.
  const roadD = useMemo(() => {
    const pts = WORLDS.map((w) => w.node);
    const P = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
    let d = `M ${pts[0].x} ${pts[0].y}`;
    const k = 0.42;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1x = p1.x + (p2.x - p0.x) * k / 2, c1y = p1.y + (p2.y - p0.y) * k / 2;
      const c2x = p2.x - (p3.x - p1.x) * k / 2, c2y = p2.y - (p3.y - p1.y) * k / 2;
      d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, []);

  const handleWorld = (w: WorldDefinition) => {
    const st = states[w.id];
    if (st === 'soon' || st === 'locked' || travelTo) {
      sfx.play('lookAgain');
      return;
    }
    sfx.play('travel');
    setTravelTo(w.id);
    // Walk Toki along the road from the current node to the target.
    const path = pathRef.current;
    if (!path) { onEnterWorld(w.id); return; }
    const total = path.getTotalLength();
    const from = fractionAt(path, total, currentWorld.node);
    const to = fractionAt(path, total, w.node);
    const start = performance.now();
    const ms = 380 + Math.abs(to - from) * 1700;
    const rest = restOf(currentWorld.node);
    const arrive = restOf(w.node);
    let lastStep = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = path.getPointAtLength(total * (from + (to - from) * e));
      // Step off the rest spot onto the road, follow it, and step off
      // again in front of the new school — no jumps at either end.
      const inK = Math.min(1, k / 0.15), outK = Math.max(0, (k - 0.85) / 0.15);
      const x = lerp(lerp(rest.x, p.x, inK), arrive.x, outK);
      const y = lerp(lerp(rest.y, p.y, inK), arrive.y, outK);
      setTokiPos({ x, y });
      if (now - lastStep > 180) { sfx.play('step'); lastStep = now; }
      if (k < 1) { requestAnimationFrame(tick); return; }
      // Going in: Toki walks to the school's door and shrinks into it,
      // as if walking away from us into the building.
      sfx.play('door');
      setEntering(w.id);
      setTokiPos({ x: w.node.x, y: w.node.y + 1 });
      setTimeout(() => onEnterWorld(w.id), reducedMotion() ? 120 : 600);
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const from = WORLDS.find((w) => w.id === walkFrom);
    const to = currentWorld;
    if (!from || from.id === to.id || !isWorldComplete(from, bestScores)) {
      if (walkFrom !== to.id) onArrived?.(to.id);
      return;
    }
    let cancelled = false;
    let raf = 0;
    const timers: number[] = [];
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      setTokiPos(null);
      setJourney('arrived');
      setHop(true);
      window.setTimeout(() => setHop(false), 650);
      window.setTimeout(() => setJourney(null), 2600);
      onArrived?.(to.id);
    };
    skipRef.current = finish;
    if (reducedMotion()) { finish(); return () => { cancelled = true; }; }
    setTokiPos(restOf(from.node));
    setJourney('celebrate');
    sfx.play('world');
    timers.push(window.setTimeout(() => {
      if (cancelled) return;
      const path = pathRef.current;
      if (!path) { finish(); return; }
      setJourney('walk');
      const total = path.getTotalLength();
      const f0 = fractionAt(path, total, from.node);
      const f1 = fractionAt(path, total, to.node);
      const ms = Math.min(2400, 1600 + Math.abs(f1 - f0) * 1600);
      const rest = restOf(from.node);
      const arrive = restOf(to.node);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const start = performance.now();
      let lastStep = 0;
      const tick = (now: number) => {
        if (cancelled) return;
        const k = Math.min(1, (now - start) / ms);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const p = path.getPointAtLength(total * (f0 + (f1 - f0) * e));
        const inK = Math.min(1, k / 0.15);
        const outK = Math.max(0, (k - 0.85) / 0.15);
        setTokiPos({ x: lerp(lerp(rest.x, p.x, inK), arrive.x, outK), y: lerp(lerp(rest.y, p.y, inK), arrive.y, outK) });
        if (now - lastStep > 200) { sfx.play('step'); lastStep = now; }
        if (k < 1) { raf = requestAnimationFrame(tick); return; }
        sfx.play('discover');
        finish();
      };
      raf = requestAnimationFrame(tick);
    }, 1000));
    return () => { cancelled = true; cancelAnimationFrame(raf); timers.forEach((t) => window.clearTimeout(t)); };
    // Runs once per visit to the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const journeyFrom = journey && journey !== 'arrived' ? walkFrom : null;

  const unlockedCount = WORLDS.filter((w) => states[w.id] !== 'soon').length;
  const doneCount = WORLDS.filter((w) => states[w.id] === 'done').length;

  return (
    <div className="map">
      <TopBar onBack={onBack} badgesCount={badges.length} onOpenBadges={onOpenBadges} onOpenBoard={onOpenBoard} />

      <header className="map__header">
        <p className="map__eyebrow">{tx(UI.hubEyebrow)}</p>
        <h1 className="map__title">{tx(UI.chooseWorld)}</h1>
      </header>

      <div
        className={`map__stage ${travelTo || journey === 'celebrate' || journey === 'walk' ? 'map__stage--travelling' : ''} ${mapArt() ? 'map__stage--art' : ''}`}
        onClickCapture={(e) => { if (journey === 'celebrate' || journey === 'walk') { e.stopPropagation(); skipRef.current(); } }}
        style={{ '--par': (restNode.x - 50) / 50, ...(mapArt() ? { backgroundImage: `url(${mapArt()})` } : {}) } as React.CSSProperties}
      >
        {/* Sky + far hills: the slowest parallax layer. */}
        <svg className="map__layer map__layer--far" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#DFF3FF" />
              <stop offset="0.55" stopColor="#EEF8FD" />
              <stop offset="1" stopColor="#F5F3FA" />
            </linearGradient>
            <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.95" />
              <stop offset="1" stopColor="#FFF4D6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="-10" width="120" height="100" fill="url(#sky)" />
          <circle cx="78" cy="12" r="16" fill="url(#sun)" />
          <path d="M-10 34 C 10 26, 35 38, 60 30 S 95 20, 110 30 L 110 110 L -10 110 Z" fill="#EEF0F8" />
          <path d="M-10 44 C 15 36, 40 50, 62 42 S 92 34, 110 44 L 110 110 L -10 110 Z" fill="#E7F3F6" />
        </svg>
        {/* Near hills: faster parallax, warmer greens. */}
        <svg className="map__layer map__layer--near" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E3F8F2" />
              <stop offset="1" stopColor="#CFEFE4" />
            </linearGradient>
          </defs>
          <path d="M-10 62 C 15 54, 35 70, 55 62 S 90 54, 110 66 L 110 110 L -10 110 Z" fill="#DDF6EE" />
          <path d="M-10 76 C 20 68, 40 84, 62 74 S 92 68, 110 78 L 110 110 L -10 110 Z" fill="url(#ground)" />
        </svg>
        {/* The road: a friendly path with a shadow underneath and a lit crown. */}
        <svg className="map__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={roadD} className="map__road-shadow" />
          <path d={roadD} className="map__road-outline" />
          <path ref={pathRef} d={roadD} className="map__road" />
          <path d={roadD} className="map__road-light" />
          <path d={roadD} className="map__road-dash" />
        </svg>
        <div className="map__vignette" aria-hidden="true" />

        {WORLDS.map((w) => {
          const st = states[w.id];
          return (
            <button
              key={w.id}
              className={`map__node map__node--${st} ${travelTo === w.id ? 'map__node--target' : ''} ${entering === w.id ? 'map__node--entering' : ''} ${journeyFrom === w.id && journey === 'celebrate' ? 'map__node--celebrate' : ''} ${journey === 'arrived' && w.id === currentWorld.id ? 'map__node--fresh' : ''}`}
              style={{ left: `${w.node.x}%`, top: `${w.node.y}%` }}
              onClick={() => handleWorld(w)}
              disabled={st === 'soon'}
              aria-label={`${tx(w.title)}${st === 'soon' ? ` (${tx(UI.locked)})` : ''}`}
            >
              <span className="map__school" aria-hidden="true">
                {schoolArt(w.number) ? <img className="map__school-art" src={schoolArt(w.number)!} alt="" /> : <SchoolGlyph state={st} />}
                <span className="map__num">{w.number}</span>
                {st === 'done' && <span className="map__people"><PeoplePair lit size={14} /></span>}
              </span>
              <span className="map__label" dir={dir}>{tx(w.title)}</span>
            </button>
          );
        })}

        <div className={`map__toki ${entering ? 'map__toki--entering' : ''}`} style={{ left: `${restNode.x}%`, top: `${restNode.y}%` }}>
          <div className={`map__toki-inner ${entering ? '' : travelTo || journey === 'walk' ? 'map__toki-inner--walking' : hop ? 'map__toki-inner--hop' : 'map__toki-inner--idle'}`}>
            <img src={skin.image} alt="" />
          </div>
        </div>
      </div>

      <footer className="map__footer">
        <p className="map__progress">
          {fmt(tx({ en: '{done} of {total} worlds complete', ar: '{done} من {total} عوالم مكتملة' }), { done: doneCount, total: unlockedCount })}
        </p>
        {onOpenStories && (
          <button className="map__customize map__story" onClick={() => { sfx.play('tap'); onOpenStories(); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>
            <span>{tx(STORY_UI.story)}</span>
          </button>
        )}
        <button className="map__customize" onClick={() => { sfx.play('tap'); onOpenSkins(); }}>
          <img src={skin.image} alt="" />
          <span>{tx(UI.customizeToki)}</span>
        </button>
      </footer>
    </div>
  );
}

/** Find the path fraction closest to a node (nodes lie on the path). */
function reducedMotion(): boolean {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
}

function fractionAt(path: SVGPathElement, total: number, node: { x: number; y: number }): number {
  let best = 0, bestD = Infinity;
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const p = path.getPointAtLength((total * i) / steps);
    const d = (p.x - node.x) ** 2 + (p.y - node.y) ** 2;
    if (d < bestD) { bestD = d; best = i / steps; }
  }
  return best;
}

function SchoolGlyph({ state }: { state: WorldState }) {
  const soon = state === 'soon';
  const done = state === 'done';
  // Isometric block: a lit roof plane, a sunlit right wall, a shaded left
  // wall, on a soft ground ellipse. Colours shift with state.
  const left = soon ? '#D9D3E6' : done ? '#15B9A1' : '#E9A6DB';
  const right = soon ? '#E8E3F1' : done ? '#1DD6BB' : '#FFC2F1';
  const roofA = soon ? '#CFC7DE' : '#5A3C92';
  const roofB = soon ? '#BDB3D1' : '#452B74';
  return (
    <svg viewBox="0 0 64 60" width="100%" height="100%">
      <defs>
        <linearGradient id={`roof-${state}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={roofA} />
          <stop offset="1" stopColor={roofB} />
        </linearGradient>
      </defs>
      {/* ground contact */}
      <ellipse cx="32" cy="54" rx="24" ry="5" fill="rgba(69,43,116,0.16)" />
      {/* left (shaded) wall */}
      <path d="M12 26 L32 36 L32 52 L12 42 Z" fill={left} stroke="#452B74" strokeWidth="2" strokeLinejoin="round" />
      {/* right (lit) wall */}
      <path d="M32 36 L52 26 L52 42 L32 52 Z" fill={right} stroke="#452B74" strokeWidth="2" strokeLinejoin="round" />
      {/* roof plane */}
      <path d="M12 26 L32 16 L52 26 L32 36 Z" fill={`url(#roof-${state})`} stroke="#452B74" strokeWidth="2" strokeLinejoin="round" />
      {/* roof ridge highlight */}
      <path d="M14 26 L32 17.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
      {/* door + windows on the lit wall, two windows on the shaded wall */}
      <path d="M38 40.5 L44 37.5 L44 46.5 L38 49.5 Z" fill="#452B74" />
      <path d="M46 34.5 L50 32.5 L50 36.5 L46 38.5 Z" fill="#fff" stroke="#452B74" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M16 33 L20 35 L20 39 L16 37 Z" fill="#fff" stroke="#452B74" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M24 37 L28 39 L28 43 L24 41 Z" fill="#fff" stroke="#452B74" strokeWidth="1.2" strokeLinejoin="round" />
      {/* flag on the current school, tick on a finished one */}
      {state === 'current' && (
        <g>
          <path d="M32 16 L32 4" stroke="#452B74" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M32.6 4.5 L41 7.5 L32.6 10.5 Z" fill="#FFA000" stroke="#452B74" strokeWidth="1.2" strokeLinejoin="round" />
        </g>
      )}
      {done && (
        <g>
          <circle cx="32" cy="10" r="7" fill="#11D471" stroke="#452B74" strokeWidth="1.6" />
          <path d="M28.5 10l2.4 2.4L36 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
