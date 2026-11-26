/** Staff room: the NCLE toolkit (tools discovered in missions), "Try it Monday", rest. */
import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { adventures, getTermPass, resource, resources } from '../content';
import { markTried, toggleSaved, type GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { SubHeader, copyText, useToast } from '../ui';
import type { Stage } from '../types';

const STAGES: Stage[] = ['launch', 'facilitate', 'extend'];

export function StaffRoomScreen({ save, update, onBack }: { save: GameSave; update: (fn: (s: GameSave) => GameSave) => void; onBack: () => void }) {
  const { tx } = useLocale();
  const toast = useToast();
  const [filter, setFilter] = useState<Stage | null>(null);
  const stages = getTermPass().stages.length;
  const all = resources();
  const found = all.filter((r) => save.toolkit.includes(r.id));

  const tried = (id: string) => {
    let credited = false;
    update((s) => { const r = markTried(s, id, stages); credited = r.credited; return r.save; });
    sfx.play('correct');
    if (credited) toast(tx(S.passStage));
  };
  const mondayList = save.saved.map(resource).filter(Boolean);
  const copyList = async () => {
    const txt = mondayList.map((r) => `• ${tx(r!.title)}: ${tx(r!.monday)}`).join('\n');
    const ok = await copyText(txt);
    toast(tx(ok ? S.copied : S.selected));
  };
  /** Where a tool can be found: the first mission (and target) whose choices/outcomes reveal it. */
  const where = (id: string) => {
    for (const a of adventures()) {
      for (const e of a.events) {
        const hit = e.choices.some((c) => c.resource === id) || e.choices.some((c) => {
          const outs = typeof c.outcome === 'string' ? [c.outcome] : c.outcome.map((x) => x.outcome);
          return outs.some((o) => a.outcomes.find((x) => x.id === o)?.discover === id);
        });
        if (hit) {
          const st = a.students.find((s) => s.id === e.on);
          const ob = a.objects.find((o) => o.id === e.on);
          return { a, who: st ? tx(st.name) : ob ? tx(ob.label) : '' };
        }
      }
    }
    return undefined;
  };
  const list = all.filter((r) => !filter || r.stage === filter);

  return (
    <main className="ts-screen ts-staff">
      <SubHeader title={tx(S.toolkitTitle)} onBack={onBack} />
      <div className="ts-body t-stack--3">
        <div className="ts-row ts-row--between">
          <span className="t-chip">{fmt(tx(S.toolsOf), { a: found.length, b: all.length })}</span>
          {all.some((r) => r.placeholder) && <span className="t-chip t-chip--placeholder">{tx(S.verifyNote)}</span>}
        </div>
        <div className="ts-chips" role="group" aria-label={tx(S.stage.launch)}>
          <button type="button" className={'t-chip ts-filter' + (!filter ? ' t-chip--good' : '')} aria-pressed={!filter} onClick={() => setFilter(null)}>{tx(S.allStages)}</button>
          {STAGES.map((st) => (
            <button key={st} type="button" className={'t-chip ts-filter' + (filter === st ? ' t-chip--good' : '')} aria-pressed={filter === st} onClick={() => setFilter(st)}>{tx(S.stageShort[st])}</button>
          ))}
        </div>

        {list.map((r) => {
          const w = where(r.id);
          if (!save.toolkit.includes(r.id)) {
            return (
              <div key={r.id} className={'t-tool t-tool--unfound' + (!w ? ' t-tool--later' : '')} data-tool={r.id}>
                <span className="t-tool__tile" aria-hidden="true">?</span>
                <span className="t-tool__name">{tx(S.notFound)}</span>
                <span className="t-tool__what">{w ? fmt(tx(S.hintWaiting), { a: `${tx(w.a.title)} · ${w.who}` }) : tx(S.comingSoon)}</span>
              </div>
            );
          }
          const isSaved = save.saved.includes(r.id);
          const isTried = save.tried.some((x) => x.id === r.id);
          return (
            <div key={r.id} className={`t-tool t-tool--${r.stage}`} data-tool={r.id}>
              <span className="t-tool__tile" aria-hidden="true">{r.icon}</span>
              <span className="t-tool__name">{tx(r.title)}</span>
              <span className="t-chip">{tx(S.stage[r.stage])}</span>
              <span className="t-tool__what">{tx(r.what)}</span>
              <span className="t-tool__monday"><b>{tx(S.tryMonday)}</b> {tx(r.monday)}</span>
              {w && <span className="t-tool__found">{fmt(tx(S.foundInMission), { n: String(w.a.number).padStart(2, '0') })} · {w.who}</span>}
              <span className="ts-row ts-tool__actions">
                <button type="button" className={'t-btn ts-btn-sm' + (isSaved ? '' : ' t-btn--ghost')} aria-pressed={isSaved}
                  onClick={() => { sfx.play('tap'); update((s) => toggleSaved(s, r.id)); }}>
                  {isSaved ? '✓ ' + tx(S.mondayOn) : tx(S.mondayAdd)}
                </button>
                <button type="button" className="t-btn t-btn--ghost ts-btn-sm ts-staff__tried" disabled={isTried} onClick={() => tried(r.id)}>
                  {isTried ? '✓ ' + tx(S.triedDone) : tx(S.triedIt)}
                </button>
              </span>
            </div>
          );
        })}

        <section className="t-card t-stack">
          <div className="ts-row ts-row--between">
            <h2 className="ts-h-md">{tx(S.mondayList)}</h2>
            {mondayList.length > 0 && <button type="button" className="t-btn t-btn--ghost ts-btn-sm" onClick={copyList}>{tx(S.copyList)}</button>}
          </div>
          {mondayList.length === 0 ? <p className="ts-hint">{tx(S.mondayEmpty)}</p> : (
            <ul className="ts-list">{mondayList.map((r) => <li key={r!.id}><strong>{tx(r!.title)}</strong> — {tx(r!.monday)}</li>)}</ul>
          )}
        </section>

      </div>
    </main>
  );
}
