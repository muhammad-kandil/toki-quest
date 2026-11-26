import { STORIES, shotImage } from '../data/story';
import { WORLDS } from '../data/worlds';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { STORY_UI } from '../i18n/storyUi';
import { sfx } from '../audio/sfx';
import './BadgesScreen.css';
import './StoryScreen.css';

/** Rewatch any part of the story the player has reached. */
export function StoriesScreen({ seen, onPlay, onBack }: { seen: string[]; onPlay: (id: string) => void; onBack: () => void }) {
  const { tx } = useLocale();
  const base = import.meta.env.BASE_URL || '/';
  const worlds = WORLDS.filter((w) => STORIES.some((s) => s.worldId === w.id && seen.includes(s.id)));
  return (
    <div className="badges stories">
      <header className="badges__header">
        <button className="badges__back" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={tx(UI.back)}>
          <span className="badges__chev" aria-hidden="true" />
        </button>
        <h1 className="badges__title">{tx(STORY_UI.storyTitle)}</h1>
      </header>
      <p className="badges__hint">{tx(STORY_UI.storyHint)}</p>
      <div className="stories__list">
        {worlds.map((w) => (
          <section key={w.id} className="stories__world">
            <h2 className="stories__world-title">{tx({ en: `World ${w.number}`, ar: `العالم ${w.number}` })} · {tx(w.title)}</h2>
            <div className="stories__row">
              {STORIES.filter((s) => s.worldId === w.id && seen.includes(s.id)).map((s) => (
                <button key={s.id} className="stories__card" onClick={() => { sfx.play('tap'); onPlay(s.id); }}>
                  <span className="stories__thumb" style={{ backgroundImage: `url(${base + shotImage(s.worldId, s.shots[0].id)}), linear-gradient(160deg, #2C2163, #17123A)` }} />
                  <span className="stories__label">{tx(s.kind === 'open' ? STORY_UI.opening : STORY_UI.closing)}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
