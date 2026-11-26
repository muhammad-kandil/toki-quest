import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { telegramFirstName } from '../../telegram/progress';
import { sfx } from '../../audio/sfx';
import { S } from '../strings';

export function NameScreen({ initial, onDone }: { initial?: string; onDone: (name: string) => void }) {
  const { tx } = useLocale();
  const [name, setName] = useState(() => initial ?? telegramFirstName() ?? '');
  const clean = name.trim().slice(0, 40);
  const submit = () => { if (clean) { sfx.play('tap'); onDone(clean); } };
  return (
    <main className="ts-name">
      <h1>{tx(S.nameTitle)}</h1>
      <p className="ts-hint">{tx(S.nameHint)}</p>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <input className="ts-input ts-name__input" value={name} maxLength={40} autoComplete="given-name"
          placeholder={tx(S.namePlaceholder)} aria-label={tx(S.namePlaceholder)} onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="t-btn t-btn--block ts-name__go" disabled={!clean}>{tx(S.nameGo)}</button>
      </form>
    </main>
  );
}
