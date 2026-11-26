/**
 * Mission-based content (superseded by the universe in ../universe.ts, per
 * docs/product/GAME_PACKAGE.md). Kept for reference and recut material;
 * no longer exported for players.
 */
import type { Adventure } from '../../types';
import { A1 } from './a1-first-five-minutes';
import { M2 } from './m2-beyond-the-expected';
import { M3 } from './m3-bring-learning-to-life';
import { M4 } from './m4-bridging-the-gap';
import { M5 } from './m5-everyone-has-a-voice';
import { M6 } from './m6-reading-the-evidence';
import { M7 } from './m7-ready-for-the-test';
import { SAMPLE_G5 } from './sample-g5-fractions';

/** Player-facing missions: none. The teacher game plays UNIVERSE. */
export const ADVENTURES: Adventure[] = [];

/** The seven missions of the previous structure, validated but not shown to players. */
export const LEGACY_MISSIONS: Adventure[] = [A1, M2, M3, M4, M5, M6, M7];

/** Internal samples: validated, never shown to players. */
export const SAMPLE_ADVENTURES: Adventure[] = [SAMPLE_G5];
