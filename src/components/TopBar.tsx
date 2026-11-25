import { useLocale } from '../i18n/LocaleContext';
import { LANG_META } from '../i18n/types';
import { UI } from '../i18n/ui';
import { useSound } from '../audio/useSound';
import { useVoice } from '../audio/useVoice';
import './VoiceToggle.css';
import './TopBar.css';

/**
 * Small persistent controls: language (EN/ع) and sound. Lives on the
 * title screen and the world map — never inside a classroom, where
 * the player should be looking at the room, not the chrome.
 */
export function TopBar({ onBack, badgesCount, onOpenBadges }: {
  onBack?: () => void;
  badgesCount?: number;
  onOpenBadges?: () => void;
}) {
  const { lang, setLang, tx } = useLocale();
  const { on, toggle, play } = useSound();
  const voiceCtl = useVoice();
  const other = lang === 'en' ? 'ar' : 'en';

  return (
    <div className="topbar">
      <div className="topbar__side">
        {onBack && (
          <button className="topbar__btn" onClick={() => { play('tap'); onBack(); }} aria-label={tx(UI.back)}>
            <span className="topbar__chev" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="topbar__side topbar__side--end">
        {onOpenBadges && (
          <button className="topbar__btn topbar__btn--text" onClick={() => { play('tap'); onOpenBadges(); }}>
            <span className="topbar__dot" aria-hidden="true" />
            {tx(UI.badges)}{typeof badgesCount === 'number' ? ` · ${badgesCount}` : ''}
          </button>
        )}
        <button
          className={`topbar__btn topbar__btn--sound ${on ? '' : 'topbar__btn--muted'}`}
          onClick={toggle}
          aria-label={tx(on ? UI.soundOn : UI.soundOff)}
          title={tx(on ? UI.soundOn : UI.soundOff)}
        >
          <SoundGlyph on={on} />
        </button>
        {voiceCtl.available && (
          <button
            className={`topbar__btn topbar__btn--voice ${voiceCtl.on && on ? 'topbar__btn--voice-on' : 'topbar__btn--muted'}`}
            onClick={() => { play('tap'); voiceCtl.toggle(); }}
            aria-label={tx(voiceCtl.on ? UI.voiceOn : UI.voiceOff)}
            aria-pressed={voiceCtl.on}
            title={tx(voiceCtl.on ? UI.voiceOn : UI.voiceOff)}
          >
            <VoiceGlyph on={voiceCtl.on && on} />
          </button>
        )}
        <button
          className="topbar__btn topbar__btn--text topbar__lang"
          onClick={() => { play('tap'); setLang(other); }}
          aria-label={tx(UI.language)}
        >
          {LANG_META[other].short}
        </button>
      </div>
    </div>
  );
}

function SoundGlyph({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10v4h4l5 4V6L8 10z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M18.5 6.5a8 8 0 0 1 0 11" />
        </>
      ) : (
        <path d="M17 9l5 6M22 9l-5 6" />
      )}
    </svg>
  );
}

/** A speaking face with sound waves — "read aloud". */
function VoiceGlyph({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      {on ? (
        <>
          <path d="M17.5 8.5a3.5 3.5 0 0 1 0 5" className="voice-wave voice-wave--1" />
          <path d="M20 6a7 7 0 0 1 0 10" className="voice-wave voice-wave--2" />
        </>
      ) : (
        <path d="M17 9l5 5M22 9l-5 5" />
      )}
    </svg>
  );
}
