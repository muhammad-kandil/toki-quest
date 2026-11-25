import { useEffect, useRef } from 'react';
import type { EvidenceSpot } from '../data/levelTypes';
import { useLocale } from '../i18n/LocaleContext';
import { t } from '../i18n/types';
import { sfx } from '../audio/sfx';
import './EvidenceRecap.css';

const LABEL = t('Evidence notes', 'ملاحظات الأدلة');
const LOOK_HERE = t('Look here', 'انظر هنا');

/**
 * Toki's notebook: the clues from Observe, available again while the
 * player decides. Hints are questions that point at a clue — this is
 * where the player looks. Collapsed by default so it never crowds the
 * choice; `open` pops it after a miss, `highlightId` marks the clue the
 * hint is pointing at.
 */
export function EvidenceRecap({ spots, open, highlightId }: { spots?: EvidenceSpot[]; open?: boolean; highlightId?: string | null }) {
  const { tx } = useLocale();
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (open && ref.current) ref.current.open = true;
  }, [open, highlightId]);
  if (!spots || spots.length === 0) return null;
  return (
    <details
      ref={ref}
      className={`recap ${highlightId ? 'recap--pointing' : ''}`}
      onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) sfx.play('tap'); }}
    >
      <summary className="recap__summary">
        <span className="recap__icon" aria-hidden="true">≡</span>
        {tx(LABEL)} · {spots.length}
      </summary>
      <ul className="recap__list">
        {spots.map((s) => {
          const hot = highlightId === s.id;
          return (
            <li key={s.id} className={`recap__item ${hot ? 'recap__item--hot' : ''}`}>
              <span className="recap__label">
                {tx(s.label)}
                {hot && <span className="recap__look">{tx(LOOK_HERE)}</span>}
              </span>
              <span className="recap__clue">{tx(s.clue)}</span>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
