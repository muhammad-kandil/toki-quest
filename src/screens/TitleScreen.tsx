import { useEffect, useState } from 'react';
import tealHero from '../assets/raw/toki-face-teal-hero.png';
import './TitleScreen.css';

interface TitleScreenProps {
  onStart: () => void;
  onOpenSkins: () => void;
  isReturningPlayer: boolean;
}

/**
 * The title screen. First impression = the "premium feel" bar from
 * GDD §11. Deliberately simple: one hero image, the game's real
 * thesis line (borrowed from the Pedagogy Hub's own opening post —
 * ties the game directly to the channel it lives in), one clear
 * action.
 */
export function TitleScreen({ onStart, onOpenSkins, isReturningPlayer }: TitleScreenProps) {
  const [heroSettled, setHeroSettled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroSettled(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="title-screen">
      <div className="title-screen__stars" aria-hidden="true">
        <span className="star star--1">★</span>
        <span className="star star--2">★</span>
        <span className="star star--3">★</span>
      </div>

      <div className={`title-screen__hero ${heroSettled ? 'title-screen__hero--settled' : ''}`}>
        <img src={tealHero} alt="" role="presentation" />
      </div>

      <h1 className="title-screen__title">
        Toki's Coaching Quest
      </h1>
      <p className="title-screen__subtitle">Spot the Drift</p>

      <p className="title-screen__thesis">
        Sometimes the most impressive classrooms<br />
        are not the ones where the deepest learning is happening.
      </p>

      <button className="title-screen__cta" onClick={onStart}>
        {isReturningPlayer ? 'Continue Coaching' : 'Start Your First Visit'}
      </button>

      {isReturningPlayer && (
        <button className="title-screen__secondary" onClick={onOpenSkins}>
          Customize Toki
        </button>
      )}
    </div>
  );
}
