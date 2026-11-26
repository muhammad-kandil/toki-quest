/**
 * Campus Shop (pure). Guardrail: only outfits, accessories and power-ups
 * are sellable; anything else is refused even if it slips into the list.
 * Power-ups are consumables: each purchase adds one to `powerups[id]`.
 */
import type { ShopItem } from '../dev/shopFixture';
import type { GameSave } from './save';

export const SELLABLE: ReadonlyArray<ShopItem['kind']> = ['outfit', 'accessory', 'powerup'];
export const isSellable = (item: { kind: string }) => (SELLABLE as readonly string[]).includes(item.kind);

export type BuyResult = { ok: true; save: GameSave } | { ok: false; reason: 'owned' | 'short' | 'not-for-sale' };

export function buy(s: GameSave, item: ShopItem): BuyResult {
  if (!isSellable(item) || !(item.price > 0)) return { ok: false, reason: 'not-for-sale' };
  if (item.kind === 'powerup') {
    if (!item.powerup) return { ok: false, reason: 'not-for-sale' };
    if (s.notes < item.price) return { ok: false, reason: 'short' };
    return { ok: true, save: { ...s, notes: s.notes - item.price, powerups: { ...s.powerups, [item.powerup]: (s.powerups[item.powerup] ?? 0) + 1 } } };
  }
  if (s.owned.includes(item.id)) return { ok: false, reason: 'owned' };
  if (s.notes < item.price) return { ok: false, reason: 'short' };
  return { ok: true, save: { ...s, notes: s.notes - item.price, owned: [...s.owned, item.id] } };
}

/** Use/place an owned item in its slot (replaces what was there). */
export function place(s: GameSave, item: ShopItem): GameSave {
  if (!item.slot || !s.owned.includes(item.id)) return s;
  return { ...s, placed: { ...s.placed, [item.slot]: item.id } };
}

export function unplace(s: GameSave, item: ShopItem): GameSave {
  if (!item.slot || s.placed[item.slot] !== item.id) return s;
  const placed = { ...s.placed };
  delete placed[item.slot];
  return { ...s, placed };
}

/** Grant an item (Term Pass reward): owned, and placed if its slot is empty. */
export function grant(s: GameSave, item: ShopItem): GameSave {
  if (!item.slot) return s;
  const owned = s.owned.includes(item.id) ? s.owned : [...s.owned, item.id];
  const slot = item.slot;
  const placed = s.placed[slot] ? s.placed : { ...s.placed, [slot]: item.id };
  return { ...s, owned, placed };
}
