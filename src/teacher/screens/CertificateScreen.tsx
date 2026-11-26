import { useLocale } from '../../i18n/LocaleContext';
import { adventures, resource } from '../content';
import type { TermPass } from '../dev/termPassFixture';
import { band } from '../engine/sim';
import type { GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { SubHeader, copyText, useToast } from '../ui';

/** End-of-term certificate. Everything on it comes from the save: nothing the teacher didn't do. */
export function CertificateScreen({ save, onBack, tp }: { save: GameSave; onBack: () => void; tp: TermPass }) {
  const { tx } = useLocale();
  const toast = useToast();
  const name = save.playerName || tx(S.teacher);
  const taught = adventures().filter((a) => save.completed[a.id]);
  const tried = save.tried.map((x) => resource(x.id)).filter(Boolean);
  const moved = taught.reduce((n, a) => n + Object.values(save.completed[a.id].students).filter((s) => band(s) === 'good').length, 0);
  const badges = taught.map((a) => a.badges.find((b) => b.id === save.completed[a.id].badge)).filter(Boolean);
  const claimed = save.pass.claimed.includes(tp.certificate.id);
  const text = fmt(tx(S.certText), { name, term: tx(tp.name), a: taught.length, r: tried.length });

  return (
    <main className="ts-screen ts-cert">
      <SubHeader title="" onBack={onBack} backLabel={tx(S.termPass)} />
      <div className="ts-body">
        <div className="t-certificate" data-claimed={claimed}>
          <span className="t-certificate__seal" aria-hidden="true">{tp.certificate.icon}</span>
          <div className="t-eyebrow">{tx(S.appName)} · {tx(tp.name)}</div>
          <h1 className="ts-h-lg">{tx(S.certTitle)}</h1>
          <p className="ts-hint">{tx(S.certAwarded)}</p>
          <div className="t-certificate__name ts-cert__name">{name}</div>
          <div className="t-certificate__rule" />
          <ul className="t-certificate__list">
            <li><b>{tx(S.certAdventures)}:</b> <span className="t-num">{taught.length}</span>{taught.length ? ' — ' + taught.map((a) => tx(a.title)).join(' · ') : ''}</li>
            <li><b>{tx(S.certTried)}:</b> <span className="t-num">{tried.length}</span>{tried.length ? ' — ' + tried.map((r) => tx(r!.title)).join(' · ') : ''}</li>
            <li><b>{tx(S.certMoved)}:</b> <span className="t-num">{moved}</span></li>
            <li><b>{tx(S.certBadges)}:</b> {badges.length ? badges.map((b) => tx(b!.title)).join(' · ') : '—'}</li>
          </ul>
          <p className="ts-cert__sign">{tx(S.certSign)}</p>
        </div>
        <div className="t-stack ts-cert__actions">
          <button type="button" className="t-btn t-btn--block ts-cert__copy" onClick={async () => { const ok = await copyText(text); toast(tx(ok ? S.copied : S.selected)); }}>{tx(S.certShare)}</button>
          <p className="ts-hint ts-cert__foot">{tx(S.certFoot)}</p>
        </div>
      </div>
    </main>
  );
}
