import { useLocale } from '../../i18n/LocaleContext';
import { adventures, getTermPass } from '../content';
import { decodePath } from '../engine/sim';
import { markShared, type GameSave } from '../engine/save';
import { S } from '../strings';
import { SubHeader, useToast } from '../ui';
import { CommunityPanel, useShareText } from '../components/CommunityPanel';
import type { Adventure } from '../types';

function Topic({ adv, save, update }: { adv: Adventure; save: GameSave; update: (fn: (s: GameSave) => GameSave) => void }) {
  const { tx } = useLocale();
  const toast = useToast();
  const c = save.completed[adv.id];
  const path = c ? decodePath(c.path) : [];
  const found = adv.events.flatMap((e) => e.choices.map((x) => x.resource)).filter((r): r is string => !!r && save.toolkit.includes(r));
  const text = useShareText(adv, path, found);
  return (
    <section className="t-card t-stack--3">
      <CommunityPanel adv={adv} shareText={c ? text : undefined} onShared={() => {
        let credited = false;
        update((s) => { const r = markShared(s, adv.id, getTermPass().stages.length); credited = r.credited; return r.save; });
        if (credited) window.setTimeout(() => toast(tx(S.passStage)), 1500);
      }} />
    </section>
  );
}

export function CommunityScreen({ save, update, onBack }: { save: GameSave; update: (fn: (s: GameSave) => GameSave) => void; onBack: () => void }) {
  const { tx } = useLocale();
  const topics = adventures().filter((a) => save.completed[a.id]);
  return (
    <main className="ts-screen ts-community">
      <SubHeader title={tx(S.communityName)} onBack={onBack} />
      {topics.length === 0 && <section className="t-card t-stack--3"><p className="ts-hint">{tx(S.communityEmpty)}</p></section>}
      {[...topics].reverse().map((a) => <Topic key={a.id} adv={a} save={save} update={update} />)}
    </main>
  );
}
