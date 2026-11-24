import { useEffect, useState } from 'react';
import tealHero from '../assets/raw/toki-face-teal-hero.png';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import { TopBar } from '../components/TopBar';
import { TokiAvatar } from '../components/TokiAvatar';
import './TitleScreen.css';

interface TitleScreenProps {
  onStart: () => void;
  onOpenSkins: () => void;
  onOpenBadges: () => void;
  isReturningPlayer: boolean;
  badgesCount: number;
}

/**
 * The title screen. One hero, the thesis line borrowed from the
 * Pedagogy Hub's own opening post, one clear action. Language and
 * sound controls live in the top bar so a DLIS can switch to Arabic
 * before reading a single line of content.
 */
export function TitleScreen({ onStart, onOpenSkins, onOpenBadges, isReturningPlayer, badgesCount }: TitleScreenProps) {
  const { tx } = useLocale();
  const [heroSettled, setHeroSettled] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHeroSettled(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="title-screen">
      <TopBar badgesCount={isReturningPlayer ? badgesCount : undefined} onOpenBadges={isReturningPlayer ? onOpenBadges : undefined} />

      <div className="title-screen__stars" aria-hidden="true">
        {/* Three depth layers: far (small, slow), mid, near (large, faster). */}
        <div className="title-screen__layer title-screen__layer--far">
          <span className="star star--1">★</span>
          <span className="star star--5">✦</span>
          <span className="star star--6">✦</span>
        </div>
        <div className="title-screen__layer title-screen__layer--mid">
          <span className="star star--2">★</span>
          <span className="star star--7">✦</span>
        </div>
        <div className="title-screen__layer title-screen__layer--near">
          <span className="star star--3">★</span>
          <span className="star star--4">✦</span>
        </div>
        <div className="title-screen__glow" />
      </div>

      <div className={`title-screen__hero ${heroSettled ? 'title-screen__hero--settled' : ''}`}>
        <div className="title-screen__float">
          <TokiAvatar src={tealHero} size={148} mood="idle" shadow={false} />
        </div>
        <span className="title-screen__ground" aria-hidden="true" />
      </div>

      <h1 className="title-screen__title">{tx(UI.appName)}</h1>
      <p className="title-screen__subtitle">{tx(UI.tagline)}</p>

      <p className="title-screen__thesis">{tx(UI.titleBlurb)}</p>
      {!isReturningPlayer && <p className="title-screen__promise">{tx(UI.titlePromise)}</p>}

      <button className="title-screen__cta" onClick={() => { sfx.play('tap'); onStart(); }}>
        {tx(isReturningPlayer ? UI.continueQuest : UI.startFirstVisit)}
      </button>

      {isReturningPlayer && (
        <button className="title-screen__secondary" onClick={() => { sfx.play('tap'); onOpenSkins(); }}>
          {tx(UI.customizeToki)}
        </button>
      )}
    </div>
  );
}
