import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import tokiWave from '../assets/raw/toki-reaction-celebrating.png';
import './BadgesScreen.css';
import './NameScreen.css';

/**
 * The player's name — asked once before the first world, editable later
 * from the ranking. Prefilled with the Telegram first name when there is
 * one. The ranking switch lives here so the choice is made knowingly.
 */
export function NameScreen({ mode, initialName, initialShow, onSave, onBack }: {
  mode: 'first' | 'edit';
  initialName: string;
  initialShow: boolean;
  onSave: (name: string, showOnBoard: boolean) => void;
  onBack?: () => void;
}) {
  const { tx, lang } = useLocale();
  const [name, setName] = useState(initialName);
  const [show, setShow] = useState(initialShow);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (mode === 'first') window.setTimeout(() => input.current?.focus(), 350); }, [mode]);
  const clean = name.replace(/\s+/g, ' ').trim().slice(0, 40);
  const submit = () => {
    if (!clean) { input.current?.focus(); return; }
    sfx.play('correct');
    onSave(clean, show);
  };

  return (
    <div className="badges name-screen">
      <header className="badges__header">
        {onBack && (
          <button className="badges__back" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={tx(UI.back)}>
            <span className="badges__chev" aria-hidden="true" />
          </button>
        )}
        <h1 className="badges__title">{tx(mode === 'first' ? UI.nameTitleFirst : UI.nameTitleEdit)}</h1>
      </header>
      {mode === 'first' && <img className="name-screen__toki" src={tokiWave} alt="" aria-hidden="true" />}
      <form className="name-screen__card" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <input
          ref={input}
          className="name-screen__input"
          value={name}
          maxLength={40}
          dir="auto"
          lang={lang}
          autoComplete="name"
          enterKeyHint="done"
          placeholder={tx(UI.namePlaceholder)}
          aria-label={tx(UI.namePlaceholder)}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="name-screen__hint">{tx(UI.nameHint)}</p>
        <label className="name-screen__switch">
          <input type="checkbox" checked={show} onChange={(e) => { sfx.play('tap'); setShow(e.target.checked); }} />
          <span className="name-screen__track" aria-hidden="true"><span className="name-screen__thumb" /></span>
          <span>
            <strong>{tx(UI.nameShowOnBoard)}</strong>
            <small>{tx(UI.nameShowOnBoardHint)}</small>
          </span>
        </label>
        <button type="submit" className="beat__cta name-screen__cta" disabled={!clean}>
          {tx(mode === 'first' ? UI.nameContinue : UI.nameSave)}
        </button>
      </form>
    </div>
  );
}
