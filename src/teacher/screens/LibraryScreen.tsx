/** Library: the notebook — past sessions (path and ending) and students' evolving state as story notes. */
import { useLocale } from '../../i18n/LocaleContext';
import { scenarioByCode, type UState } from '../engine/universe';
import { S, fmt } from '../strings';
import { SubHeader } from '../ui';
import { StudentNotes } from '../components/StudentNotes';
import type { Universe } from '../types';

export function LibraryScreen({ universe: U, ustate, onBack }: { universe: Universe; ustate: UState; onBack: () => void }) {
  const { tx } = useLocale();
  const sessions = [...ustate.history].reverse();
  return (
    <main className="ts-screen ts-library">
      <SubHeader title={tx(S.libraryTitle)} onBack={onBack} />
      <div className="ts-body t-stack--3">
        <section className="t-card t-stack">
          <h2 className="ts-h-md">{tx(S.yourStudents)}</h2>
          <StudentNotes universe={U} students={ustate.students} />
        </section>
        <h2 className="ts-h-md">{tx(S.sessionsTitle)}</h2>
        {sessions.length === 0 && <section className="t-card"><p className="ts-hint">{tx(S.libraryEmptyU)}</p></section>}
        {sessions.map((h) => {
          const e = U.endings.find((x) => x.id === h.ending);
          return (
            <article key={h.session} className="t-card t-stack ts-page" data-session={h.session}>
              <div className="ts-page__head">
                {e?.badge && <span className="t-medal t-medal--sm" aria-hidden="true">{e.badge.icon}</span>}
                <div>
                  <div className="t-eyebrow">{fmt(tx(S.sessionN), { n: h.session })}</div>
                  <h3 className="ts-h-lg">{e ? tx(e.title) : h.ending}</h3>
                </div>
              </div>
              {e && <p className="ts-page__take">{tx(e.narration)}</p>}
              <div className="ts-path">
                {h.path.map((c, i) => {
                  const sc = scenarioByCode(U, c);
                  return (
                    <span key={c + i} className="ts-path__item">
                      {i > 0 && <i className="ts-path__arrow" aria-hidden="true">›</i>}
                      <span className={'ts-path__chip' + (sc?.kind === 'random' ? ' is-assist' : '')}>{sc ? tx(sc.title) : c}</span>
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
