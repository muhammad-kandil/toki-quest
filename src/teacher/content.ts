/**
 * The engine's only door to content. Real data from src/teacher/data;
 * the dev fixture only while ADVENTURES is empty.
 */
import { ADVENTURES, LOCATIONS, RESOURCES } from './data';
import { FIXTURE_ADVENTURES, FIXTURE_LOCATIONS, FIXTURE_RESOURCES } from './dev/fixture';
import { TERM_PASS_FIXTURE, type TermPass } from './dev/termPassFixture';
import { SHOP_FIXTURE, type ShopItem } from './dev/shopFixture';
import { isSellable } from './engine/shop';
import { validateAdventure } from './engine/validate';
import type { Adventure, AlefResource, Location } from './types';

export const USING_FIXTURE = ADVENTURES.length === 0;

export const adventures = (): Adventure[] => (USING_FIXTURE ? FIXTURE_ADVENTURES : ADVENTURES);
export const locations = (): Location[] =>
  (USING_FIXTURE ? FIXTURE_LOCATIONS : LOCATIONS).filter((l) => ENABLE_CUSTOMISATION || l.kind !== 'shop');
export const resources = (): AlefResource[] => (USING_FIXTURE ? FIXTURE_RESOURCES : RESOURCES);
export const adventure = (id: string) => adventures().find((a) => a.id === id);
export const resource = (id: string) => resources().find((r) => r.id === id);
export const location = (id: string) => locations().find((l) => l.id === id);
export const adventuresAt = (locId: string) => adventures().filter((a) => a.location === locId);

/**
 * Customisation (Term Pass, Campus Shop, Thank-you notes, power-ups).
 * Client decision 2026-11-26: ships. false removes all of it from the UI
 * (the shop place, the notes balance, the power-up tray, the Term Pass).
 */
export const ENABLE_CUSTOMISATION: boolean = true;


/** No mentor character in the teacher game (Alef proposal): Toki outfits stay out of the shop. */
export const TOKI_IN_TEACHER_GAME: boolean = false;

/** Optional content modules: src/teacher/data/shop.ts (export SHOP) and termPass.ts (export TERM_PASS). */
const optional = import.meta.glob<{ SHOP?: ShopItem[]; TERM_PASS?: TermPass }>(['./data/shop.ts', './data/termPass.ts'], { eager: true });
const dataShop = optional['./data/shop.ts']?.SHOP;
const dataPass = optional['./data/termPass.ts']?.TERM_PASS;

/** Term Pass stages/rewards: data/termPass.ts when present, else the dev fixture. */
export const getTermPass = (): TermPass => (dataPass && dataPass.stages?.length ? dataPass : TERM_PASS_FIXTURE);
/** Shop items: data/shop.ts when present, else the fixture. Guardrail: only outfits/accessories/power-ups. */
export const getShop = (): ShopItem[] =>
  (dataShop && dataShop.length ? dataShop : SHOP_FIXTURE).filter((i) => isSellable(i) && (TOKI_IN_TEACHER_GAME || !i.skin));
export const shopItem = (id: string) => getShop().find((i) => i.id === id);

/** Community link from Alef. Empty until Alef shares it → "coming soon". */
export const COMMUNITY_URL = '';

if (import.meta.env.DEV) {
  const rid = resources().map((r) => r.id);
  const aid = adventures().map((a) => a.id);
  const errs = adventures().flatMap((a) => validateAdventure(a, rid, aid));
  if (errs.length) console.warn('[teacher] content check:\n' + errs.join('\n'));
  const ph = resources().filter((r) => r.placeholder).length;
  if (ph) console.info(`[teacher] ${ph} resource card(s) are placeholders awaiting Alef confirmation.`);
}
