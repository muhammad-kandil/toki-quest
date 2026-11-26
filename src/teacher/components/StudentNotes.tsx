/**
 * Students' evolving state as story notes (Ms. Mariam's observations), never
 * as numbers or scores. Fictional game state only.
 */
import { useLocale } from '../../i18n/LocaleContext';
import { S } from '../strings';
import type { StudentVars, Universe } from '../types';

const KEYS: (keyof StudentVars)[] = ['understanding', 'confidence', 'participation', 'readiness'];
const level = (v: number) => (v <= 1 ? 'low' : v === 2 ? 'mid' : 'high') as 'low' | 'mid' | 'high';

/** The two observations most worth writing down: the strongest and the one to watch. */
export function notesFor(v: StudentVars): { key: keyof StudentVars; lvl: 'low' | 'mid' | 'high' }[] {
  const sorted = [...KEYS].sort((a, b) => v[b] - v[a]);
  const top = sorted[0];
  const low = sorted[sorted.length - 1];
  const out = [{ key: top, lvl: level(v[top]) }];
  if (low !== top && v[low] < v[top]) out.push({ key: low, lvl: level(v[low]) });
  return out;
}

export function StudentNotes({ universe, students }: { universe: Universe; students: Record<string, StudentVars> }) {
  const { tx } = useLocale();
  return (
    <div className="t-stack">
      {universe.students.map((st) => {
        const v = students[st.id];
        if (!v) return null;
        return (
          <div key={st.id} className="t-card t-card--inset ts-kid" data-student={st.id} data-vars={KEYS.map((k) => v[k]).join(',')}>
            <span className="ts-kid__ring" aria-hidden="true">{tx(st.name).charAt(0)}</span>
            <div className="ts-kid__txt">
              <strong>{tx(st.name)}</strong>
              {notesFor(v).map((n) => <p key={n.key}>{tx(S.note[n.key][n.lvl])}</p>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
