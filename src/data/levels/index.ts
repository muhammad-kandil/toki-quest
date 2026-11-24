import type { LevelDefinition } from '../levelTypes';
import type { WorldBossDefinition } from '../worldBossTypes';
import type { AcademyLevelDefinition } from '../academyTypes';
import type { SchoolVisitDefinition } from '../schoolVisitTypes';
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
 *
 * Four kinds of playable content share the id space:
 *  - LEVELS         five-beat classrooms (Worlds 1–6)
 *  - WORLD_BOSSES   pattern audits (Worlds 2–7)
 *  - ACADEMY        World 7's 0–many-findings classrooms
 *  - SCHOOL_VISITS  the Final World's whole-school visit
 */
export const LEVELS: Record<number, LevelDefinition> = {
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
};

export const WORLD_BOSSES: Record<number, WorldBossDefinition> = {};
export const ACADEMY: Record<number, AcademyLevelDefinition> = {};
export const SCHOOL_VISITS: Record<number, SchoolVisitDefinition> = {};

interface WorldModule {
  levels?: LevelDefinition[];
  boss?: WorldBossDefinition;
  academy?: AcademyLevelDefinition[];
  visit?: SchoolVisitDefinition;
}

const WORLD_LOADERS: Record<number, () => Promise<WorldModule>> = {
  2: async () => ({ levels: (await import('./world2')).WORLD_2_LEVELS, boss: (await import('./world2boss')).WORLD_2_BOSS }),
  3: async () => ({ levels: (await import('./world3')).WORLD_3_LEVELS, boss: (await import('./world3boss')).WORLD_3_BOSS }),
  4: async () => ({ levels: (await import('./world4')).WORLD_4_LEVELS, boss: (await import('./world4boss')).WORLD_4_BOSS }),
  5: async () => ({ levels: (await import('./world5')).WORLD_5_LEVELS, boss: (await import('./world5boss')).WORLD_5_BOSS }),
  6: async () => ({ levels: (await import('./world6')).WORLD_6_LEVELS, boss: (await import('./world6boss')).WORLD_6_BOSS }),
  7: async () => ({ academy: (await import('./world7')).WORLD_7_LEVELS, boss: (await import('./world7boss')).WORLD_7_BOSS }),
  8: async () => ({ visit: (await import('./world8')).SCHOOL_VISIT }),
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
  for (const l of mod.levels ?? []) LEVELS[l.id] = l;
  for (const a of mod.academy ?? []) ACADEMY[a.id] = a;
  if (mod.boss) WORLD_BOSSES[mod.boss.id] = mod.boss;
  if (mod.visit) SCHOOL_VISITS[mod.visit.id] = mod.visit;
  loaded.add(worldNumber);
}

export function getLevel(id: number): LevelDefinition | undefined {
  return LEVELS[id];
}
export function getWorldBoss(id: number): WorldBossDefinition | undefined {
  return WORLD_BOSSES[id];
}
export function getAcademyLevel(id: number): AcademyLevelDefinition | undefined {
  return ACADEMY[id];
}
export function getSchoolVisit(id: number): SchoolVisitDefinition | undefined {
  return SCHOOL_VISITS[id];
}

/** Hub card info for any playable id, whatever kind of content it is. */
export function getCardInfo(id: number): { subject: LevelDefinition['subject']; title: LevelDefinition['title'] } | undefined {
  return LEVELS[id] ?? ACADEMY[id] ?? WORLD_BOSSES[id] ?? SCHOOL_VISITS[id];
}

/** World 1's standard classrooms count. */
export const TOTAL_LEVELS = 5;
/** The Perfect Classroom — World 1's finale. */
export const BOSS_ID = BOSS.id;

export { BOSS };
