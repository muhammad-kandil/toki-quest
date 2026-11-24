import { WORLDS, type WorldDefinition } from './worlds';

/**
 * Progression rules, derived purely from bestScores (what's been
 * completed). No separate "unlocked" counter to keep in sync, and old
 * saves work unchanged.
 *
 * - Within a world: the first classroom is open; each next classroom
 *   opens when the previous is completed; the world boss opens when all
 *   its classrooms are completed.
 * - Between worlds: World N+1 opens when World N's boss is completed
 *   (or, for a world without a boss, when all its classrooms are).
 */
export type Scores = Record<number, number>;

export function worldSequence(world: WorldDefinition): number[] {
  return [...world.levelIds, ...(world.bossId ? [world.bossId] : [])];
}

export function isWorldComplete(world: WorldDefinition, scores: Scores): boolean {
  const seq = worldSequence(world);
  return seq.length > 0 && seq.every((id) => scores[id] != null);
}

export function isWorldUnlocked(world: WorldDefinition, scores: Scores): boolean {
  if (world.comingSoon) return false;
  const idx = WORLDS.findIndex((w) => w.id === world.id);
  if (idx <= 0) return true;
  // The previous *playable* world must be complete.
  for (let i = idx - 1; i >= 0; i--) {
    const prev = WORLDS[i];
    if (prev.comingSoon) continue;
    return isWorldComplete(prev, scores);
  }
  return true;
}

export function isLevelUnlocked(levelId: number, scores: Scores): boolean {
  const world = WORLDS.find((w) => worldSequence(w).includes(levelId));
  if (!world) return false;
  if (!isWorldUnlocked(world, scores)) return false;
  const seq = worldSequence(world);
  const i = seq.indexOf(levelId);
  if (i === 0) return true;
  // Boss: needs all classrooms done. Classroom: needs the previous one.
  if (world.bossId === levelId) return world.levelIds.every((id) => scores[id] != null);
  return scores[seq[i - 1]] != null;
}

/** First world the player hasn't finished — where Toki stands on the map.
 * When every playable world is done, Toki stands at the last one (the frontier). */
export function currentWorld(scores: Scores): WorldDefinition {
  const playable = WORLDS.filter((w) => !w.comingSoon);
  return playable.find((w) => !isWorldComplete(w, scores)) ?? playable[playable.length - 1] ?? WORLDS[0];
}

/** Count of completed classrooms + bosses, for skin unlocks. */
export function completedCount(scores: Scores): number {
  return Object.keys(scores).length;
}
