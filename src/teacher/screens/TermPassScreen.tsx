/**
 * Term Pass: a reward track in battle-pass layout, on our rules — no
 * currency to progress, no paid lane, no countdown. Stages move only on
 * meaningful actions (see engine/save.ts).
 */
import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { SKINS } from '../../data/skins';
import { ENABLE_CUSTOMISATION, resource, shopItem } from '../content';
import type { TermPass, TermReward } from '../dev/termPassFixture';
import { allSlots, applyClaim, slotState, termComplete, type RewardSlot } from '../engine/termPass';
import type { GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { NoteIcon, ResourceCard, SubHeader, useToast } from '../ui';

const deps = { resourceExists: (id: string) => !!resource(id), shopItem };

export function TermPassScreen({ save, update, onBack, onCert, tp }: {
  save: GameSave; update: (fn: (s: GameSave) => GameSave) => void; onBack: () => void; onCert: () => void; tp: TermPass;
}) {
  const { tx } = useLocale();
  const toast = useToast();
  const [opened, setOpened] = useState<TermReward | null>(null);
  const [flipping, setFlipping] = useState<string | null>(null);
  const n = tp.stages.length;
  const slots = allSlots(tp);
  const cert = slots[slots.length - 1];

  const claim = (slot: RewardSlot) => {
    if (slotState(save, slot) !== 'ready') return;
    sfx.play('badge');
    setFlipping(slot.reward.id);
    window.setTimeout(() => setFlipping(null), 650);
    update((s) => applyClaim(s, slot, deps));
    const r = slot.reward;
    toast(fmt(tx(S.claimedTo), { x: tx(r.title), where: tx(S.claimWhere[r.kind]) }));
    if (r.kind === 'story' || r.kind === 'planner' || r.kind === 'spotlight' || r.kind === 'resource') window.setTimeout(() => setOpened(r), 600);
    if (r.kind === 'certificate') window.setTimeout(onCert, 700);
  };

  const card = (slot: RewardSlot, lane: 'classroom' | 'pro') => {
    const st = slotState(save, slot);
    const r = slot.reward;
    const item = r.ref ? shopItem(r.ref) : undefined;
    const skin = item?.skin ? SKINS.find((k) => k.id === item.skin) : undefined;
    const cls = `t-pass-card t-pass-card--${lane}` + (st === 'locked' ? ' t-pass-card--locked' : st === 'ready' ? ' t-pass-card--reachable' : ' t-pass-card--claimed') + (flipping === r.id ? ' ts-flip' : '');
    const hidden = !ENABLE_CUSTOMISATION && r.kind === 'notes';
    return (
      <div className={cls} data-reward={r.id} data-state={st}>
        <span className="t-pass-card__state" aria-hidden="true">{st === 'claimed' ? '✓' : st === 'locked' ? slot.stage : ''}</span>
        <span className="t-pass-card__art" aria-hidden="true">
          {skin ? <img className="ts-pass-skin" src={skin.image} alt="" /> : r.kind === 'notes' ? <NoteIcon /> : r.icon}
        </span>
        <span className="t-pass-card__title">{hidden ? tx(S.rewardKind.decor) : tx(r.title)}</span>
        <span className="ts-pass-kind">{tx(S.rewardKind[r.kind])}</span>
        {st === 'ready' && <button type="button" className="t-pass-claim" onClick={() => claim(slot)}>{tx(S.claim)}</button>}
        {st === 'locked' && <span className="t-pass-card__note">{fmt(tx(S.afterStage), { n: slot.stage })}</span>}
        {st === 'claimed' && (
          (r.kind === 'story' || r.kind === 'planner' || r.kind === 'spotlight' || r.kind === 'resource')
            ? <button type="button" className="t-pass-card__note ts-pass-open" onClick={() => setOpened(r)}>{tx(S.read)}</button>
            : <span className="t-pass-card__note">{tx(S.claimWhere[r.kind])}</span>
        )}
      </div>
    );
  };

  const fillPct = Math.min(100, (save.pass.stage / n) * 100);

  return (
    <main className="ts-screen ts-pass">
      <SubHeader title="" onBack={onBack} right={ENABLE_CUSTOMISATION ? <span className="t-notes-chip"><NoteIcon /><span className="t-num">{save.notes}</span></span> : undefined} />
      <div className="ts-body t-stack--3">
        <div className="t-pass-banner">
          <h1>{tx(S.termPass)}</h1>
          <small>{tx(tp.name)}</small>
        </div>
        <div className="ts-pass-progress">
          <span className="ts-hint"><bdi>{fmt(tx(S.stagesOf), { a: save.pass.stage, b: n })}</bdi></span>
          <div className="t-meter"><i className="t-meter__fill" style={{ width: fillPct + '%' }} /></div>
        </div>
        <p className="ts-hint">{tx(S.termIntro)}</p>
        <div className="t-pass-lanes">
          <div className="t-pass-lane-head t-pass-lane-head--classroom">{tx(S.laneClassroom)}<small>{tx(S.laneClassroomSub)}</small></div>
          <div className="t-pass-mid" />
          <div className="t-pass-lane-head t-pass-lane-head--pro">{tx(S.laneProfessional)}<small>{tx(S.laneProSub)}</small></div>
        </div>
        <div className="t-pass-rail">
          <div className="t-pass-rail__fill" style={{ height: fillPct + '%' }} />
          {tp.stages.map((stg) => {
            const reached = save.pass.stage >= stg.n;
            const current = save.pass.stage === stg.n;
            return (
              <div key={stg.n} className="t-pass-row">
                <div className="ts-pass-cell">{card({ reward: stg.classroom, stage: stg.n }, 'classroom')}</div>
                <div className="t-pass-mid">
                  <span className={'t-pass-node' + (current ? ' t-pass-node--current' : reached ? ' t-pass-node--reached' : '')} aria-label={fmt(tx(S.stageN), { n: stg.n })}>
                    <span>{stg.n}</span>
                  </span>
                </div>
                <div className="ts-pass-cell">{card({ reward: stg.professional, stage: stg.n }, 'pro')}</div>
              </div>
            );
          })}
        </div>

        <div className="t-pass-end ts-pass-end" data-state={slotState(save, cert)}>
          <div className="ts-pass-end__row">
            <span className="t-certificate__seal ts-pass-seal" aria-hidden="true">{tp.certificate.icon}</span>
            <div>
              <h3>{tx(S.endOfTerm)}</h3>
              <p>{tx(tp.certificate.body)}</p>
            </div>
          </div>
          <div className="t-meter"><i className="t-meter__fill" style={{ width: fillPct + '%' }} /></div>
          {slotState(save, cert) === 'ready' && <button type="button" className="t-btn t-btn--block ts-pass-cert" onClick={() => claim(cert)}>{tx(S.claim)}: {tx(tp.certificate.title)}</button>}
          {slotState(save, cert) === 'claimed' && <button type="button" className="t-btn t-btn--block" onClick={onCert}>{tx(S.viewCert)}</button>}
          {slotState(save, cert) === 'locked' && <p>{tx(S.endOfTermHint)}</p>}
          {termComplete(save, tp) ? null : null}
        </div>

        <section className="t-card t-stack">
          <h2 className="ts-h-md">{tx(S.howToMove)}</h2>
          <ul className="ts-list">{S.howList.map((l, i) => <li key={i}>{tx(l)}</li>)}</ul>
        </section>
      </div>

      {opened && (
        <div className="ts-modal" role="dialog" aria-modal="true" aria-label={tx(opened.title)}>
          <div className="ts-modal__scrim" onClick={() => setOpened(null)} />
          <div className="ts-modal__card t-reveal">
            {opened.kind === 'resource' && opened.ref && resource(opened.ref)
              ? <ResourceCard r={resource(opened.ref)!} />
              : (
                <div className="t-card t-stack--3">
                  <span className="t-chip">{tx(S.rewardKind[opened.kind])}</span>
                  <h2 className="ts-h-lg">{tx(opened.title)}</h2>
                  <p>{tx(opened.body)}</p>
                  {opened.kind === 'spotlight' && <span className="t-chip t-chip--placeholder">{tx(S.example)}</span>}
                </div>
              )}
            <button type="button" className="t-btn t-btn--block ts-modal__close" onClick={() => setOpened(null)}>{tx(S.close)}</button>
          </div>
        </div>
      )}
    </main>
  );
}
