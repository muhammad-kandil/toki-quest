import { useLocale } from '../../i18n/LocaleContext';
import { S } from '../strings';
import { sfx } from '../../audio/sfx';
import type { GameSave } from '../engine/save';

export function LangToggle() {
  const { lang, setLang } = useLocale();
  return (
    <div className="ts-lang" role="group" aria-label="Language / اللغة">
      <button type="button" className={'ts-lang__btn' + (lang === 'en' ? ' is-on' : '')} aria-pressed={lang === 'en'} onClick={() => { sfx.play('tap'); setLang('en'); }}>EN</button>
      <button type="button" className={'ts-lang__btn' + (lang === 'ar' ? ' is-on' : '')} aria-pressed={lang === 'ar'} onClick={() => { sfx.play('tap'); setLang('ar'); }} lang="ar">ع</button>
    </div>
  );
}

export function TitleScreen({ save, onStart, onCoach }: { save: GameSave; onStart: () => void; onCoach: () => void }) {
  const { tx } = useLocale();
  const returning = !!save.playerName;
  return (
    <main className="ts-title">
      <div className="ts-title__top"><LangToggle /></div>
      <div className="ts-title__art" aria-hidden="true">
        <svg viewBox="0 0 200 120" className="ts-title__svg">
          <rect x="0" y="86" width="200" height="34" fill="var(--t-teal)" opacity=".35" />
          <path d="M30 86V46l70-26 70 26v40z" fill="var(--t-panel)" stroke="var(--t-indigo)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 50l78-30 78 30" fill="none" stroke="var(--t-indigo)" strokeWidth="4" strokeLinecap="round" />
          <rect x="88" y="58" width="24" height="28" rx="3" fill="var(--t-orange)" />
          <rect x="46" y="56" width="22" height="16" rx="2" fill="var(--t-blue)" opacity=".8" />
          <rect x="132" y="56" width="22" height="16" rx="2" fill="var(--t-blue)" opacity=".8" />
          <circle cx="100" cy="38" r="7" fill="var(--t-rose)" />
        </svg>
      </div>
      <h1 className="ts-title__name">{tx(S.appName)}</h1>
      <p className="ts-title__tag">{tx(S.tagline)}</p>
      <p className="ts-title__blurb">{tx(S.titleBlurb)}</p>
      <button type="button" className="t-btn t-btn--block ts-title__start" onClick={() => { sfx.play('tap'); onStart(); }}>
        {returning ? tx(S.continue) : tx(S.start)}
      </button>
      <button type="button" className="ts-link ts-title__coach" onClick={onCoach}>
        {tx(S.coachMode)}<small>{tx(S.coachModeHint)}</small>
      </button>
    </main>
  );
}
