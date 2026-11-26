import { useLocale } from '../../i18n/LocaleContext';
import { findEvent, findOutcome, type PathStep } from '../engine/sim';
import { TONE_VAR } from '../ui';
import { ASSIST_OUTCOME } from '../engine/powerups';
import { S } from '../strings';
import type { Adventure } from '../types';

/** The teacher's choices in order, each edged in its outcome's tone colour. */
export function PathChips({ adv, path }: { adv: Adventure; path: PathStep[] }) {
  const { tx } = useLocale();
  return (
    <div className="ts-path">
      {path.map((p, i) => {
        const ev = findEvent(adv, p.event);
        const arrow = i > 0 && <i className="ts-path__arrow" aria-hidden="true">›</i>;
        if (p.outcome === ASSIST_OUTCOME) {
          return <span key={i} className="ts-path__item">{arrow}<span className="ts-path__chip is-assist">{tx(S.assistChip)}</span></span>;
        }
        const o = findOutcome(adv, p.outcome);
        const c = ev?.choices[p.choice];
        if (!ev || !o || !c) return null;
        return (
          <span key={i} className="ts-path__item">
            {arrow}
            <span className="ts-path__chip" style={{ borderColor: TONE_VAR[o.tone] }}>{tx(c.label)}</span>
          </span>
        );
      })}
    </div>
  );
}
