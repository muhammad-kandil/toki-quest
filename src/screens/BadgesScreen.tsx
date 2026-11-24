import { BADGES } from '../data/badges';
import { BadgeIcon } from '../components/BadgeIcon';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import './BadgesScreen.css';

/**
 * The badge gallery — every concept-mastery badge, earned or not.
 * Locked badges say how they're earned; two of them belong to worlds
 * still on the horizon, so the gallery doubles as a quiet roadmap.
 */
export function BadgesScreen({ earned, onBack }: { earned: string[]; onBack: () => void }) {
  const { tx } = useLocale();
  const count = BADGES.filter((b) => earned.includes(b.id)).length;

  return (
    <div className="badges">
      <header className="badges__header">
        <button className="badges__back" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={tx(UI.back)}>
          <span className="badges__chev" aria-hidden="true" />
        </button>
        <div>
          <p className="badges__eyebrow">{count} / {BADGES.length}</p>
          <h1 className="badges__title">{tx(UI.yourBadges)}</h1>
        </div>
      </header>
      <p className="badges__hint">{tx(UI.badgesHint)}</p>

      <div className="badges__grid">
        {BADGES.map((b, i) => {
          const has = earned.includes(b.id);
          return (
            <div key={b.id} className={`badge-card ${has ? 'badge-card--earned' : 'badge-card--locked'}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="badge-card__icon">
                <BadgeIcon glyph={b.glyph} color={b.color} size={64} locked={!has} />
              </div>
              <p className="badge-card__name">{tx(b.name)}</p>
              <p className="badge-card__desc">{has ? tx(b.description) : tx(b.howToEarn)}</p>
              <span className={`badge-card__status ${has ? 'badge-card__status--on' : ''}`}>
                {tx(has ? UI.earnedOn : UI.badgeLocked)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
