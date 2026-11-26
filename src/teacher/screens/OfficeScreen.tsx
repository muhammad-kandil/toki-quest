import { useLocale } from '../../i18n/LocaleContext';
import { location } from '../content';
import type { GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { SubHeader } from '../ui';
import { nextAdventure } from './CampusScreen';

export function OfficeScreen({ save, onBack, onAdventure }: { save: GameSave; onBack: () => void; onAdventure: (id: string) => void }) {
  const { tx } = useLocale();
  const n = nextAdventure(save);
  const place = n ? location(n.location) : undefined;
  return (
    <main className="ts-screen ts-office">
      <SubHeader title={tx(S.officeTitle)} onBack={onBack} />
      <section className="t-card t-stack--3">
        <div className="ts-principal">
          <div className="ts-principal__pic" aria-hidden="true">★</div>
          <p className="ts-hint">{tx(S.officeLine)}</p>
        </div>
        {n ? (
          <>
            <span className="t-chip">{tx(S.briefing)}</span>
            <div className="t-eyebrow">{fmt(tx(S.missionN), { n: String(n.number).padStart(2, '0') })} · {tx(n.meta)}</div>
            <h2>{tx(n.title)}</h2>
            {n.intro.slice(0, 2).map((l, i) => <p key={i} className="ts-brief">{tx(l)}</p>)}
            <button type="button" className="t-btn ts-office__go" onClick={() => onAdventure(n.id)}>
              {fmt(tx(S.goTo), { p: place ? tx(place.name) : tx(S.place_kind.classroom) })}
            </button>
          </>
        ) : <p className="ts-brief">{tx(S.officeAllDone)}</p>}
      </section>
    </main>
  );
}
