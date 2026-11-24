import type { EvidenceSpot } from '../data/levelTypes';
import { useLocale } from '../i18n/LocaleContext';
import { t } from '../i18n/types';
import { sfx } from '../audio/sfx';
import './EvidenceRecap.css';

const LABEL = t('Evidence notes', 'ملاحظات الأدلة');

/**
 * Toki's notebook: the clues from Observe, available again while the
 * player decides. Hints say "look at the exit ticket again" — this is
 * where they look. Collapsed by default so it never crowds the choice.
 */
export function EvidenceRecap({ spots }: { spots?: EvidenceSpot[] }) {
  const { tx } = useLocale();
  if (!spots || spots.length === 0) return null;
  return (
    <details className="recap" onToggle={() => sfx.play('tap')}>
      <summary className="recap__summary">
        <span className="recap__icon" aria-hidden="true">≡</span>
        {tx(LABEL)} · {spots.length}
      </summary>
      <ul className="recap__list">
        {spots.map((s) => (
          <li key={s.id} className="recap__item">
            <span className="recap__label">{tx(s.label)}</span>
            <span className="recap__clue">{tx(s.clue)}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
