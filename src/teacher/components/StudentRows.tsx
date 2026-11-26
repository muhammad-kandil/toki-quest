import { useLocale } from '../../i18n/LocaleContext';
import { band } from '../engine/sim';
import { S } from '../strings';
import type { Adventure } from '../types';

/** Where each student landed, in words (3 bands) with a state ring. */
export function StudentRows({ adv, states }: { adv: Adventure; states: Record<string, [number, number]> }) {
  const { tx } = useLocale();
  return (
    <div className="t-stack">
      {adv.students.map((s) => {
        const st = states[s.id];
        if (!st) return null;
        const b = band(st);
        return (
          <div key={s.id} className="t-card t-card--inset ts-kid" data-band={b}>
            <span className={`ts-kid__ring ts-kid__ring--${b}`} aria-hidden="true">{tx(s.name).charAt(0)}</span>
            <div className="ts-kid__txt"><strong>{tx(s.name)}</strong><p>{tx(S.bandLine[b])}</p></div>
          </div>
        );
      })}
    </div>
  );
}
