import { useEffect, useState } from 'react';
import tokiWalking from '../assets/raw/toki-reaction-walking.png';
import type { EvidenceSpot } from '../data/levelTypes';
import { useLocale } from '../i18n/LocaleContext';
import { sfx } from '../audio/sfx';
import { EvidenceGlyph, kindFor } from '../components/PeopleGlyphs';
import './SceneHeader.css';

interface SceneHeaderProps {
  image: string;
  alt: string;
  /** Interactive evidence spots. When present, they appear once Toki has walked in. */
  evidence?: EvidenceSpot[];
  inspected?: Set<string>;
  onInspect?: (id: string) => void;
}

/**
 * The classroom "establishing shot". Toki walks INTO the room, then
 * evidence markers fade in over the scene: tapping one is Toki
 * stepping over to look — the detective's magnifying glass. The scene
 * fades into the reading surface below so text stays legible.
 */
export function SceneHeader({ image, alt, evidence, inspected, onInspect }: SceneHeaderProps) {
  const { tx, dir } = useLocale();
  const [walkedIn, setWalkedIn] = useState(false);
  const [showSpots, setShowSpots] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setWalkedIn(true), 250);
    const b = setTimeout(() => setShowSpots(true), 1000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  const allFound = !!evidence && evidence.length > 0 && !!inspected && inspected.size >= evidence.length;

  // One clue at a time, in the order the room was written: the next
  // unexamined spot is the only one lit, with a pointer showing the way.
  // A just-opened clue gets a moment on screen before the next spot
  // appears; seen spots stay tappable.
  const spots = evidence ?? [];
  const firstOpen = (() => {
    const i = spots.findIndex((s) => !inspected?.has(s.id));
    return i === -1 ? spots.length : i;
  })();
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (!showSpots) return;
    const target = Math.min(firstOpen, spots.length - 1);
    if (target <= revealed) { setRevealed(target); return; }
    const t = setTimeout(() => setRevealed(target), 420);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSpots, firstOpen, spots.length]);
  const active = !allFound && showSpots && firstOpen <= revealed ? spots[firstOpen] : null;

  return (
    <div className={`scene-header ${walkedIn ? 'scene-header--settled' : ''} ${allFound ? 'scene-header--complete' : ''}`}>
      {/* Background plane: drifts slightly behind Toki for depth. */}
      <div className="scene-header__plane" aria-hidden="true">
        <img src={image} alt={alt} className="scene-header__image" />
      </div>
      <div className="scene-header__vignette" aria-hidden="true" />
      <div className="scene-header__sweep" aria-hidden="true" />
      <div className="scene-header__fade" aria-hidden="true" />
      <div className={`scene-header__toki ${walkedIn ? 'scene-header__toki--settled' : ''}`}>
        <img src={tokiWalking} alt="" />
      </div>

      {evidence && showSpots && evidence.map((spot, i) => {
        const done = inspected?.has(spot.id);
        const kind = kindFor(spot);
        const shown = i <= revealed || done;
        // Clickable up to the next open spot, so a quick tap is never lost.
        const open = i <= firstOpen;
        return (
          <button
            key={spot.id}
            className={`evidence-spot evidence-spot--${kind} ${done ? 'evidence-spot--done' : ''} ${shown ? '' : 'evidence-spot--locked'} ${active === spot ? 'evidence-spot--active' : ''}`}
            data-kind={kind}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={() => { if (!open) return; sfx.play('discover'); onInspect?.(spot.id); }}
            aria-label={tx(spot.label)}
            aria-hidden={shown ? undefined : true}
            tabIndex={shown ? undefined : -1}
          >
            <span className="evidence-spot__ring" aria-hidden="true" />
            <span className="evidence-spot__core" aria-hidden="true">
              <span className="evidence-spot__glyph"><EvidenceGlyph kind={kind} size={20} /></span>
              <span className="evidence-spot__tick">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </span>
          </button>
        );
      })}

      {active && <GuidePointer x={active.x} y={active.y} rtl={dir === 'rtl'} />}
    </div>
  );
}

/**
 * The guiding hand: a white glove with an indigo outline and a teal cuff,
 * fingertip on the spot. It comes from below the spot on the reading side
 * (right in LTR, left in RTL), switches side near an edge and comes from
 * above near the bottom, so it never leaves the scene. It glides from
 * spot to spot (left/top transition) and nudges toward the spot.
 */
function GuidePointer({ x, y, rtl }: { x: number; y: number; rtl: boolean }) {
  let fromRight = !rtl;
  if (x > 70) fromRight = false;
  if (x < 30) fromRight = true;
  const fromBelow = y <= 64;
  const variant = `${fromBelow ? 'b' : 't'}${fromRight ? 'r' : 'l'}`;
  return (
    <div className={`guide-pointer guide-pointer--${variant}`} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">
      <div className="guide-pointer__hand">
        <svg width="40" height="40" viewBox="0 0 40 40" focusable="false">
          <g stroke="var(--toki-indigo)" strokeLinecap="round" fill="none">
            <line x1="22" y1="22" x2="8" y2="8" strokeWidth="10" />
            <line x1="27" y1="20" x2="21" y2="14" strokeWidth="8" />
          </g>
          <circle cx="25" cy="26" r="10.5" fill="var(--toki-indigo)" />
          <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
            <line x1="22" y1="22" x2="8" y2="8" strokeWidth="6" />
            <line x1="27" y1="20" x2="21" y2="14" strokeWidth="4" />
          </g>
          <circle cx="25" cy="26" r="8.5" fill="#FFFFFF" />
          <line x1="29.5" y1="35" x2="35" y2="29.5" stroke="var(--toki-teal)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
