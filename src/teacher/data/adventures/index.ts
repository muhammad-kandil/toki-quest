/** All missions in play order. Owned by the content designer. Endings (and `unlock:<id>` flags) open later missions. */
import type { Adventure } from '../../types';
import { A1 } from './a1-first-five-minutes';
import { M2 } from './m2-beyond-the-expected';
import { M3 } from './m3-bring-learning-to-life';
import { M4 } from './m4-bridging-the-gap';
import { M5 } from './m5-everyone-has-a-voice';
import { M6 } from './m6-reading-the-evidence';
import { M7 } from './m7-ready-for-the-test';
import { SAMPLE_G5 } from './sample-g5-fractions';

export const ADVENTURES: Adventure[] = [A1, M2, M3, M4, M5, M6, M7];

/** Internal samples: validated, never shown to players. */
export const SAMPLE_ADVENTURES: Adventure[] = [SAMPLE_G5];
