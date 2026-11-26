/**
 * Campus Shop (client decision 2026-11-26). Thank-you notes come only from
 * the Term Pass. Sells outfits, accessories and power-ups — never Alef
 * resources, story chapters or the certificate. No real money, no timers.
 */
import { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { SKINS } from '../../data/skins';
import { getShop } from '../content';
import type { ShopItem } from '../dev/shopFixture';
import { buy, place, unplace } from '../engine/shop';
import type { GameSave } from '../engine/save';
import { S, fmt } from '../strings';
import { NoteIcon, SubHeader, reducedMotion, useToast } from '../ui';

type Tab = 'outfit' | 'accessory' | 'powerup';
const PU_CLASS: Record<string, string> = { rewind: 't-powerup--rewind', extra5: 't-powerup--time', assistant: 't-powerup--assistant', 'second-look': 't-powerup--look', 'parent-call': 't-powerup--parent' };

export function ShopScreen({ save, update, onBack }: { save: GameSave; update: (fn: (s: GameSave) => GameSave) => void; onBack: () => void }) {
  const { tx } = useLocale();
  const toast = useToast();
  const [tab, setTab] = useState<Tab>('outfit');
  const [stamp, setStamp] = useState<string | null>(null);
  const [sheet, setSheet] = useState<ShopItem | null>(null);
  const items = getShop().filter((i) => i.kind === tab);
  // Owned first in each tab (no separate "Yours" tab)
  const sorted = [...items].sort((a, b) => Number(save.owned.includes(b.id)) - Number(save.owned.includes(a.id)));

  const doBuy = (item: ShopItem) => {
    const r = buy(save, item);
    if (!r.ok) return;
    sfx.play('discover');
    update(() => r.save);
    setStamp(item.id);
    window.setTimeout(() => setStamp(null), reducedMotion() ? 600 : 900);
    if (item.kind === 'powerup') toast(fmt(tx(S.bought), { x: tx(item.name) }));
    else window.setTimeout(() => setSheet(item), reducedMotion() ? 0 : 720);
  };
  const doPlace = (item: ShopItem) => { sfx.play('tap'); update((s) => place(s, item)); toast(fmt(tx(S.placedToast), { x: tx(item.name), where: tx(S.slot[item.slot ?? 'wall']) })); };

  const card = (item: ShopItem) => {
    const ownedIt = save.owned.includes(item.id);
    const inUse = !!item.slot && save.placed[item.slot] === item.id;
    const short = save.notes < item.price;
    const skin = item.skin ? SKINS.find((k) => k.id === item.skin) : undefined;
    if (item.kind === 'powerup') {
      const held = save.powerups[item.powerup ?? ''] ?? 0;
      return (
        <div key={item.id} className="t-shop-card t-shop-card--powerup" data-item={item.id}>
          <span className={`t-powerup t-powerup--lg ${PU_CLASS[item.powerup ?? '']}`} aria-hidden="true"><b>{item.icon}</b>{held > 0 && <span className="t-powerup__count">{held}</span>}</span>
          <span className="t-shop-card__name">{tx(item.name)}</span>
          {item.what && <span className="t-shop-card__what">{tx(item.what)}</span>}
          <span className="t-shop-card__meta">{held > 0 ? fmt(tx(S.heldOnce), { n: held }) : short ? fmt(tx(S.moreNotes), { n: item.price - save.notes }) : tx(S.noneYet)}</span>
          <button type="button" className={'t-shop-buy' + (short ? ' t-shop-buy--short' : '')} disabled={short} onClick={() => doBuy(item)}
            aria-label={`${tx(S.buy)} ${tx(item.name)}, ${fmt(tx(S.notesAria), { n: item.price })}`}>
            <NoteIcon /><span className="t-num">{item.price}</span>
          </button>
          {stamp === item.id && <span className="t-shop-stamp">{tx(S.yours)}</span>}
        </div>
      );
    }
    const cls = 't-shop-card' + (skin ? ' t-shop-card--toki' : '') + (ownedIt ? ' t-shop-card--owned' : '') + (inUse ? ' t-shop-card--inuse' : '');
    return (
      <div key={item.id} className={cls} data-item={item.id}>
        <div className="t-shop-card__art" style={item.colour ? { color: item.colour } : undefined}>
          {skin ? <img className="ts-shop-skin" src={skin.image} alt="" /> : <span aria-hidden="true">{item.icon}</span>}
          {stamp === item.id && <span className="t-shop-stamp">{tx(S.yours)}</span>}
          {stamp === item.id && !reducedMotion() && <span className="t-shop-note-fly ts-note-fly" aria-hidden="true"><NoteIcon lg /></span>}
        </div>
        <div className="t-shop-card__body">
          <span className="t-shop-card__name">{tx(item.name)}</span>
          {!ownedIt && (
            <>
              <button type="button" className={'t-shop-buy' + (short ? ' t-shop-buy--short' : '')} disabled={short} onClick={() => doBuy(item)}
                aria-label={`${tx(S.buy)} ${tx(item.name)}, ${fmt(tx(S.notesAria), { n: item.price })}`}>
                <NoteIcon /><span className="t-num">{item.price}</span>
              </button>
              {short && <span className="ts-short">{fmt(tx(S.moreNotes), { n: item.price - save.notes })}</span>}
            </>
          )}
          {ownedIt && !inUse && <button type="button" className="t-shop-buy t-shop-buy--use" onClick={() => doPlace(item)}>{item.kind === 'outfit' ? tx(S.use) : tx(S.place)}</button>}
          {ownedIt && inUse && <button type="button" className="t-shop-buy t-shop-buy--inuse" onClick={() => { update((s) => unplace(s, item)); }} aria-label={`${tx(S.inUse)} — ${tx(S.remove)}`}>{item.kind === 'outfit' ? tx(S.wearing) : tx(S.inRoom)}</button>}
        </div>
      </div>
    );
  };

  return (
    <main className="ts-screen ts-shop">
      <SubHeader title={tx(S.shopTitle)} onBack={onBack} right={<span className="t-notes-chip"><NoteIcon /><span className="t-num">{save.notes}</span></span>} />
      <div className="ts-body t-stack--3">
        <p className="ts-hint">{tx(S.shopHint)}</p>
        <div className="t-shop-tabs" role="tablist">
          {(['outfit', 'accessory', 'powerup'] as Tab[]).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} className={'t-shop-tab' + (tab === k ? ' is-on' : '')} data-tab={k} onClick={() => { sfx.play('tap'); setTab(k); }}>
              {tx(k === 'outfit' ? S.shopOutfitsTab : k === 'accessory' ? S.shopAccessoriesTab : S.shopPowerupsTab)}
            </button>
          ))}
        </div>
        {tab === 'powerup' && <p className="ts-hint">{tx(S.powerupHint)}</p>}
        <div className={tab === 'powerup' ? 't-stack--3' : 't-shop-grid'}>{sorted.map(card)}</div>
      </div>

      {sheet && (
        <div className="ts-modal" role="dialog" aria-modal="true" aria-label={tx(sheet.name)}>
          <div className="ts-modal__scrim" onClick={() => setSheet(null)} />
          <div className="t-sheet ts-modal__sheet">
            <div className="t-sheet__grip" />
            <div className="t-stack--3">
              <h2 className="ts-h-lg">{fmt(tx(S.bought), { x: tx(sheet.name) })}</h2>
              <p className="ts-hint">{fmt(tx(S.gave), { n: sheet.price })}</p>
              <button type="button" className="t-btn t-btn--block ts-shop-place" onClick={() => { doPlace(sheet); setSheet(null); }}>
                {sheet.kind === 'outfit' ? tx(S.putOn) : tx(S.placeIt)}
              </button>
              <button type="button" className="t-btn t-btn--ghost t-btn--block" onClick={() => setSheet(null)}>{tx(S.later)}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
