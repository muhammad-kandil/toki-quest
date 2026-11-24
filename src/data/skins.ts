/**
 * Central asset registry.
 *
 * All Toki skin art referenced anywhere in the app comes through
 * here — components import `SKINS`, never a raw file path. Keeps
 * the mine/generate/code split from GDD §7 enforceable in one place:
 * when new skins are generated later, they get added here and
 * nowhere else needs to change.
 *
 * Scope decision (Option B, locked): the selected skin appears in
 * Toki's HERO appearances — the hub corridor and the walk-into-
 * classroom moment — where players actually see and enjoy their
 * choice. The small in-question reaction pops (affirming / thoughtful
 * / celebrating) stay the default teal Toki, since giving every skin
 * its own full reaction pose set would need several more generations
 * per skin with real character-consistency risk, for payoff on tiny,
 * quick-fading UI elements. This delivers "change your Toki" without
 * that cost.
 */
import skinTeal from '../assets/skins/skin-teal.png';
import skinCapTeal from '../assets/skins/skin-cap-teal.png';
import skinCapOrange from '../assets/skins/skin-cap-orange.png';
import skinBasketball from '../assets/skins/skin-basketball.png';
import skinCapCheckered from '../assets/skins/skin-cap-checkered.png';
import skinHeadwrapA from '../assets/skins/skin-headwrap-a.png';
import skinHeadwrapB from '../assets/skins/skin-headwrap-b.png';

export interface SkinDefinition {
  id: string;
  label: string;
  image: string;
  /** How this skin is unlocked — drives the personalization framing (GDD §5) */
  unlock: 'default' | 'level' | 'badge';
  unlockDetail?: string;
  /** Classrooms completed required to unlock (0 = available from the start). */
  unlockAt: number;
}

export const SKINS: SkinDefinition[] = [
  {
    id: 'teal-classic',
    label: 'Toki Classic',
    image: skinTeal,
    unlock: 'default',
    unlockAt: 0,
  },
  {
    id: 'cap-teal',
    label: 'Teal Cap Toki',
    image: skinCapTeal,
    unlock: 'level',
    unlockDetail: 'Complete Level 1',
    unlockAt: 1,
  },
  {
    id: 'cap-orange',
    label: 'Orange Cap Toki',
    image: skinCapOrange,
    unlock: 'level',
    unlockDetail: 'Complete Level 2',
    unlockAt: 2,
  },
  {
    id: 'basketball',
    label: 'MVP Toki',
    image: skinBasketball,
    unlock: 'level',
    unlockDetail: 'Complete Level 3',
    unlockAt: 3,
  },
  {
    id: 'cap-checkered',
    label: 'Checkered Cap Toki',
    image: skinCapCheckered,
    unlock: 'level',
    unlockDetail: 'Complete Level 4',
    unlockAt: 4,
  },
  {
    id: 'headwrap-a',
    label: 'Wrapped Up Toki',
    image: skinHeadwrapA,
    unlock: 'badge',
    unlockDetail: 'Complete Level 5',
    unlockAt: 5,
  },
  {
    id: 'headwrap-b',
    label: 'Master DLIS Toki',
    image: skinHeadwrapB,
    unlock: 'badge',
    unlockDetail: 'Complete the Final Boss',
    unlockAt: 6,
  },
];

export const DEFAULT_SKIN_ID = 'teal-classic';

export function getSkinById(id: string): SkinDefinition {
  return SKINS.find((s) => s.id === id) ?? SKINS[0];
}

export function isSkinUnlocked(skin: SkinDefinition, completedCount: number): boolean {
  return completedCount >= skin.unlockAt;
}
