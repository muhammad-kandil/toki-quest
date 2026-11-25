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
  const { tx } = useLocale();
  const [walkedIn, setWalkedIn] = useState(false);
  const [showSpots, setShowSpots] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setWalkedIn(true), 250);
    const b = setTimeout(() => setShowSpots(true), 1000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  const allFound = !!evidence && evidence.length > 0 && !!inspected && inspected.size >= evidence.length;

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
        return (
          <button
            key={spot.id}
            className={`evidence-spot evidence-spot--${kind} ${done ? 'evidence-spot--done' : ''}`}
            data-kind={kind}
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, animationDelay: `${i * 120}ms` }}
            onClick={() => { sfx.play('discover'); onInspect?.(spot.id); }}
            aria-label={tx(spot.label)}
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
    </div>
  );
}
