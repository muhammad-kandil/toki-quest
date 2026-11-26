import { useLocale } from '../../i18n/LocaleContext';
import { adventures } from '../content';
import { decodePath } from '../engine/sim';
import { powerupFlag, type GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { SubHeader, missionLine } from '../ui';
import { PathChips } from '../components/PathChips';
import { StudentRows } from '../components/StudentRows';

export function LibraryScreen({ save, onBack, onReplay }: { save: GameSave; onBack: () => void; onReplay: (id: string) => void }) {
  const { tx } = useLocale();
  const done = adventures().filter((a) => save.completed[a.id]);
  return (
    <main className="ts-screen ts-library">
      <SubHeader title={tx(S.libraryTitle)} onBack={onBack} />
      <div className="ts-body t-stack--3">
        <p className="ts-hint">{tx(S.libraryHint)}</p>
        {done.length === 0 && <section className="t-card"><p className="ts-hint">{tx(S.libraryEmpty)}</p></section>}
        {done.map((a) => {
          const c = save.completed[a.id];
          const b = a.badges.find((x) => x.id === c.badge);
          const seen = save.seenOutcomes[a.id] ?? [];
          const unseen = a.outcomes.filter((o) => !seen.includes(o.id)).length;
          const pu = !!save.flags[powerupFlag(a.id)];
          return (
            <article key={a.id} className="t-card t-stack--3 ts-page" data-adv={a.id}>
              <div className="ts-page__head">
                {b && <span className="t-medal t-medal--sm" aria-hidden="true">{b.icon}</span>}
                <div>
                  <div className="t-eyebrow">{missionLine(fmt(tx(S.missionN), { n: String(a.number).padStart(2, '0') }), tx(a.meta))}</div>
                  <h2 className="ts-h-lg">{tx(a.title)}</h2>
                  {b && <p className="ts-hint">{tx(b.title)}</p>}
                </div>
              </div>
              {pu && <span className="t-chip t-chip--insight ts-pu-mark" title={tx(S.playedWithPowerups)}>◎ {tx(S.playedWithPowerups)}</span>}
              {a.takeaway && <p className="ts-page__take">{tx(a.takeaway)}</p>}
              <h3>{tx(S.yourPath)}</h3>
              <PathChips adv={a} path={decodePath(c.path)} />
              <h3>{tx(S.students)}</h3>
              <StudentRows adv={a} states={c.students} />
              <p className="ts-hint">
                {unseen > 0 ? fmt(tx(S.unseen), { n: unseen }) : tx(S.allSeen)}
              </p>
              <span className="ts-dots" aria-hidden="true">{a.outcomes.map((o) => <i key={o.id} className={seen.includes(o.id) ? 'is-on' : ''} />)}</span>
              <div><button type="button" className="t-btn t-btn--ghost" onClick={() => onReplay(a.id)}>{tx(S.replay)}</button></div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
