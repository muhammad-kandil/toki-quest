import type { LevelDefinition } from '../levelTypes';
import type { WorldBossDefinition } from '../worldBossTypes';
import { LEVEL_1 } from './level1';
import { LEVEL_2 } from './level2';
import { LEVEL_3 } from './level3';
import { LEVEL_4 } from './level4';
import { LEVEL_5 } from './level5';
import { BOSS } from './boss';

/**
 * Central level registry.
 *
 * World 1 (ids 1–6) is bundled with the app: it's what every player
 * sees first. Worlds 2+ are loaded on demand, one chunk per world, so
 * the first paint stays light on Telegram's iOS webview.
 *
 * Id scheme: World 1 = 1–6 (legacy), World N = N*10+1 … N*10+5
 * (four classrooms, then the world boss at N*10+5).
 */
export const LEVELS: Record<number, LevelDefinition> = {
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
};

export const WORLD_BOSSES: Record<number, WorldBossDefinition> = {};

type WorldModule = { levels: LevelDefinition[]; boss: WorldBossDefinition };

const WORLD_LOADERS: Record<number, () => Promise<WorldModule>> = {
  2: async () => ({ levels: (await import('./world2')).WORLD_2_LEVELS, boss: (await import('./world2boss')).WORLD_2_BOSS }),
  3: async () => ({ levels: (await import('./world3')).WORLD_3_LEVELS, boss: (await import('./world3boss')).WORLD_3_BOSS }),
  4: async () => ({ levels: (await import('./world4')).WORLD_4_LEVELS, boss: (await import('./world4boss')).WORLD_4_BOSS }),
  5: async () => ({ levels: (await import('./world5')).WORLD_5_LEVELS, boss: (await import('./world5boss')).WORLD_5_BOSS }),
  6: async () => ({ levels: (await import('./world6')).WORLD_6_LEVELS, boss: (await import('./world6boss')).WORLD_6_BOSS }),
};

const loaded = new Set<number>([1]);

/** World number that owns a level id. */
export function worldNumberOf(levelId: number): number {
  return levelId <= 6 ? 1 : Math.floor(levelId / 10);
}

/** Load a world's content into the registries (idempotent). */
export async function ensureWorldLoaded(worldNumber: number): Promise<void> {
  if (loaded.has(worldNumber)) return;
  const loader = WORLD_LOADERS[worldNumber];
  if (!loader) return;
  const mod = await loader();
  for (const l of mod.levels) LEVELS[l.id] = l;
  WORLD_BOSSES[mod.boss.id] = mod.boss;
  loaded.add(worldNumber);
}

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
