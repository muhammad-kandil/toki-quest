import type { LevelDefinition } from '../levelTypes';
import type { WorldBossDefinition } from '../worldBossTypes';
import { LEVEL_1 } from './level1';
import { LEVEL_2 } from './level2';
import { LEVEL_3 } from './level3';
import { LEVEL_4 } from './level4';
import { LEVEL_5 } from './level5';
import { BOSS } from './boss';
import { WORLD_2_LEVELS } from './world2';
import { WORLD_2_BOSS } from './world2boss';
import { WORLD_3_LEVELS } from './world3';
import { WORLD_3_BOSS } from './world3boss';

/**
 * Central level registry. Standard classrooms share the LevelDefinition
 * shape; The Perfect Classroom (id 6) is the bespoke finale of World 1;
 * world bosses (pattern audits) live in WORLD_BOSSES.
 *
 * Id scheme: World 1 = 1–6 (legacy), World N = N*10+1 … N*10+5.
 */
export const LEVELS: Record<number, LevelDefinition> = {
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
  ...Object.fromEntries(WORLD_2_LEVELS.map((l) => [l.id, l])),
  ...Object.fromEntries(WORLD_3_LEVELS.map((l) => [l.id, l])),
};

export const WORLD_BOSSES: Record<number, WorldBossDefinition> = {
  [WORLD_2_BOSS.id]: WORLD_2_BOSS,
  [WORLD_3_BOSS.id]: WORLD_3_BOSS,
};

export function getLevel(id: number): LevelDefinition | undefined {
  return LEVELS[id];
}
export function getWorldBoss(id: number): WorldBossDefinition | undefined {
  return WORLD_BOSSES[id];
}

/** World 1's standard classrooms count. */
export const TOTAL_LEVELS = 5;
/** The Perfect Classroom — World 1's finale. */
export const BOSS_ID = BOSS.id;

export { BOSS };
