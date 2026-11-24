import type { LevelDefinition } from '../levelTypes';
import { LEVEL_1 } from './level1';
import { LEVEL_2 } from './level2';
import { LEVEL_3 } from './level3';
import { LEVEL_4 } from './level4';
import { LEVEL_5 } from './level5';
import { BOSS } from './boss';

/**
 * Central level registry. Classrooms 1–5 built from data in the same
 * LevelDefinition shape. The Final Boss ("The Perfect Classroom") uses
 * an extended structure (BossDefinition) so it lives separately and is
 * routed to its own screen.
 */
export const LEVELS: Record<number, LevelDefinition> = {
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
};

export function getLevel(id: number): LevelDefinition | undefined {
  return LEVELS[id];
}

/** The standard classrooms count (excludes the boss). */
export const TOTAL_LEVELS = Object.keys(LEVELS).length;

/** The boss's id — the visit after the last standard classroom. */
export const BOSS_ID = BOSS.id;

export { BOSS };
