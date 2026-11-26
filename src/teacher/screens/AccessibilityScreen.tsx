import { useLocale } from '../../i18n/LocaleContext';
import { S } from '../strings';
import { SubHeader } from '../ui';

type Key = 'reducedMotion' | 'largeText' | 'captions';

/** Accessibility settings: reduced motion, larger text, captions on pictures. Saved with the universe state. */
export function AccessibilityScreen({ a11y, onChange, onBack }: {
  a11y: { reducedMotion?: boolean; largeText?: boolean; captions?: boolean }; onChange: (k: Key, v: boolean) => void; onBack: () => void;
}) {
  const { tx } = useLocale();
  const rows: { k: Key; label: string; hint: string; on: boolean }[] = [
    { k: 'reducedMotion', label: tx(S.a11yReduced), hint: tx(S.a11yReducedHint), on: !!a11y.reducedMotion },
    { k: 'largeText', label: tx(S.a11yLarge), hint: tx(S.a11yLargeHint), on: !!a11y.largeText },
    { k: 'captions', label: tx(S.a11yCaptions), hint: tx(S.a11yCaptionsHint), on: a11y.captions !== false },
  ];
  return (
    <main className="ts-screen ts-a11y">
      <SubHeader title={tx(S.a11yTitle)} onBack={onBack} />
      <div className="ts-body t-stack--3">
        {rows.map((r) => (
          <div key={r.k} className="t-card ts-switch-row">
            <div className="ts-switch-row__txt">
              <strong id={'a11y-' + r.k}>{r.label}</strong>
              <p className="ts-hint">{r.hint}</p>
            </div>
            <button type="button" role="switch" aria-checked={r.on} aria-labelledby={'a11y-' + r.k} data-setting={r.k}
              className={'ts-switch' + (r.on ? ' is-on' : '')} onClick={() => onChange(r.k, !r.on)}>
              <span className="ts-switch__knob" aria-hidden="true" />
              <span className="ts-switch__txt">{r.on ? tx(S.on) : tx(S.off)}</span>
            </button>
          </div>
        ))}
        <p className="ts-hint">{tx(S.a11ySound)}</p>
      </div>
    </main>
  );
}
