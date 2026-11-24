import { useEffect, useState } from 'react';
import tokiWalking from '../assets/raw/toki-reaction-walking.png';
import type { EvidenceSpot } from '../data/levelTypes';
import { useLocale } from '../i18n/LocaleContext';
import { sfx } from '../audio/sfx';
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

  return (
    <div className="scene-header">
      <img src={image} alt={alt} className="scene-header__image" />
      <div className="scene-header__fade" aria-hidden="true" />
      <div className={`scene-header__toki ${walkedIn ? 'scene-header__toki--settled' : ''}`}>
        <img src={tokiWalking} alt="" />
      </div>

      {evidence && showSpots && evidence.map((spot, i) => {
        const done = inspected?.has(spot.id);
        return (
          <button
            key={spot.id}
            className={`evidence-spot ${done ? 'evidence-spot--done' : ''}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, animationDelay: `${i * 120}ms` }}
            onClick={() => { sfx.play('discover'); onInspect?.(spot.id); }}
            aria-label={tx(spot.label)}
          >
            <span className="evidence-spot__ring" aria-hidden="true" />
            <span className="evidence-spot__core" aria-hidden="true">{done ? '✓' : ''}</span>
          </button>
        );
      })}
    </div>
  );
}
