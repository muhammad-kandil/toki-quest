/** All missions in play order. Owned by the content designer. Endings (and `unlock:<id>` flags) open later missions. */
import type { Adventure } from '../../types';
import { A1 } from './a1-first-five-minutes';
import { SAMPLE_G5 } from './sample-g5-fractions';

export const ADVENTURES: Adventure[] = [A1];

/** Internal samples: validated, never shown to players. */
export const SAMPLE_ADVENTURES: Adventure[] = [SAMPLE_G5];
