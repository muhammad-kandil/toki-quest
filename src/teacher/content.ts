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
  (USING_FIXTURE ? FIXTURE_LOCATIONS : LOCATIONS).filter((l) => SHOP_ENABLED || l.kind !== 'shop');
export const resources = (): AlefResource[] => (USING_FIXTURE ? FIXTURE_RESOURCES : RESOURCES);
export const adventure = (id: string) => adventures().find((a) => a.id === id);
export const resource = (id: string) => resources().find((r) => r.id === id);
export const location = (id: string) => locations().find((l) => l.id === id);
export const adventuresAt = (locId: string) => adventures().filter((a) => a.location === locId);

/** Term Pass stages/rewards. Content can move this into data/ later; only this getter changes. */
export const getTermPass = (): TermPass => TERM_PASS_FIXTURE;

/**
 * Campus Shop (client decision, 2026-11-26). One switch: false removes the
 * shop place, the notes balance, the power-up tray and every "notes" mention.
 */
export const SHOP_ENABLED: boolean = true;
/** Shop items; anything not decor/outfit is filtered out (guardrail). */
export const getShop = (): ShopItem[] => SHOP_FIXTURE.filter(isSellable);
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
