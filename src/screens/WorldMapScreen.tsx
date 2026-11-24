import { useMemo, useRef, useState } from 'react';
import { WORLDS, type WorldDefinition } from '../data/worlds';
import { getSkinById } from '../data/skins';
import { isWorldComplete, isWorldUnlocked, currentWorld as findCurrent } from '../data/progression';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import { TopBar } from '../components/TopBar';
import './WorldMapScreen.css';

interface WorldMapScreenProps {
  bestScores: Record<number, number>;
  badges: string[];
  skinId: string;
  onEnterWorld: (worldId: string) => void;
  onOpenSkins: () => void;
  onOpenBadges: () => void;
  onBack: () => void;
}

type WorldState = 'locked' | 'current' | 'done' | 'soon';

/**
 * The journey. A winding road across a stylised landscape with one
 * school per world; Toki stands at the current world and walks the
 * road when you choose a destination. Worlds not yet authored appear
 * as the road ahead — visible, named, locked — so the quest reads as
 * a journey with a horizon rather than a list that ends.
 */
export function WorldMapScreen({ bestScores, badges, skinId, onEnterWorld, onOpenSkins, onOpenBadges, onBack }: WorldMapScreenProps) {
  const { tx, dir } = useLocale();
  const skin = getSkinById(skinId);
  const pathRef = useRef<SVGPathElement>(null);
  const [travelTo, setTravelTo] = useState<string | null>(null);
  const [tokiPos, setTokiPos] = useState<{ x: number; y: number } | null>(null);

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
  const restNode = tokiPos ?? {
    x: currentWorld.node.x > 60 ? currentWorld.node.x - 11 : currentWorld.node.x + 11,
    y: Math.max(currentWorld.node.y - 1, 12),
  };

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
    const ms = 900 + Math.abs(to - from) * 1800;
    let lastStep = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = path.getPointAtLength(total * (from + (to - from) * e));
      setTokiPos({ x: p.x, y: p.y });
      if (now - lastStep > 180) { sfx.play('step'); lastStep = now; }
      if (k < 1) requestAnimationFrame(tick);
      else setTimeout(() => onEnterWorld(w.id), 260);
    };
    requestAnimationFrame(tick);
  };

  const unlockedCount = WORLDS.filter((w) => states[w.id] !== 'soon').length;
  const doneCount = WORLDS.filter((w) => states[w.id] === 'done').length;

  return (
    <div className="map">
      <TopBar onBack={onBack} badgesCount={badges.length} onOpenBadges={onOpenBadges} />

      <header className="map__header">
        <p className="map__eyebrow">{tx(UI.hubEyebrow)}</p>
        <h1 className="map__title">{tx(UI.chooseWorld)}</h1>
      </header>

      <div className={`map__stage ${travelTo ? 'map__stage--travelling' : ''}`}>
        <svg className="map__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EAF7FF" />
              <stop offset="1" stopColor="#F5F3FA" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#sky)" />
          {/* soft hills */}
          <path d="M-5 70 C 15 60, 30 78, 50 68 S 85 60, 105 72 L 105 105 L -5 105 Z" fill="#E6F9F5" />
          <path d="M-5 50 C 20 40, 40 55, 60 46 S 90 38, 105 48 L 105 105 L -5 105 Z" fill="#EDFCFA" opacity="0.8" />
          <path d="M-5 28 C 20 20, 45 32, 70 24 S 95 16, 105 26 L 105 105 L -5 105 Z" fill="#F6F4F8" opacity="0.9" />
          {/* road */}
          <path d={roadD} className="map__road-outline" />
          <path ref={pathRef} d={roadD} className="map__road" />
          <path d={roadD} className="map__road-dash" />
        </svg>

        {WORLDS.map((w) => {
          const st = states[w.id];
          return (
            <button
              key={w.id}
              className={`map__node map__node--${st} ${travelTo === w.id ? 'map__node--target' : ''}`}
              style={{ left: `${w.node.x}%`, top: `${w.node.y}%` }}
              onClick={() => handleWorld(w)}
              disabled={st === 'soon'}
              aria-label={`${tx(w.title)}${st === 'soon' ? ` (${tx(UI.locked)})` : ''}`}
            >
              <span className="map__school" aria-hidden="true">
                <SchoolGlyph state={st} />
                <span className="map__num">{w.number}</span>
              </span>
              <span className="map__label" dir={dir}>{tx(w.title)}</span>
            </button>
          );
        })}

        <div className="map__toki" style={{ left: `${restNode.x}%`, top: `${restNode.y}%` }}>
          <div className={`map__toki-inner ${travelTo ? 'map__toki-inner--walking' : 'map__toki-inner--idle'}`}>
            <img src={skin.image} alt="" />
          </div>
        </div>
      </div>

      <footer className="map__footer">
        <p className="map__progress">
          {fmt(tx({ en: '{done} of {total} worlds complete', ar: '{done} من {total} عوالم مكتملة' }), { done: doneCount, total: unlockedCount })}
        </p>
        <button className="map__customize" onClick={() => { sfx.play('tap'); onOpenSkins(); }}>
          <img src={skin.image} alt="" />
          <span>{tx(UI.customizeToki)}</span>
        </button>
      </footer>
    </div>
  );
}

/** Find the path fraction closest to a node (nodes lie on the path). */
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
  const fill = state === 'soon' ? '#E3DEEE' : state === 'done' ? '#1DD6BB' : '#FFC2F1';
  const roof = state === 'soon' ? '#C9C1DA' : '#452B74';
  return (
    <svg viewBox="0 0 48 44" width="100%" height="100%">
      <path d="M6 20h36v20H6z" fill={fill} stroke="#452B74" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M3 21L24 6l21 15" fill="none" stroke={roof} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="20" y="28" width="8" height="12" fill="#452B74" rx="1.5" />
      <rect x="10" y="25" width="6" height="6" fill="#fff" stroke="#452B74" strokeWidth="2" />
      <rect x="32" y="25" width="6" height="6" fill="#fff" stroke="#452B74" strokeWidth="2" />
      {state === 'done' && <path d="M15 11l3.5 3.5L25 8" fill="none" stroke="#11D471" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
