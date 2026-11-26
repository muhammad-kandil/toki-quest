/**
 * Toki pose frames for animation. Generated sprites (public/art/toki/,
 * 512×512 PNG, transparent, feet on a shared baseline, one scale per pose)
 * when the art manifest lists them; otherwise the existing single images,
 * so callers can always animate something.
 *
 *   const f = tokiFrames('walk', skin.image)  // string[] (≥1 frame)
 *   const fps = TOKI_FPS.walk
 *
 * Poses: walk (side, facing right; mirror for left), walk-away (back view,
 * for going into a door/school), point, think, celebrate, affirm, idle
 * (2 frames: open / blink).
 */
import { artManifest, useArt } from './art';
import { DEFAULT_SKIN_ID } from '../data/skins';
import walking from './raw/toki-reaction-walking.png';
import thoughtful from './raw/toki-reaction-thoughtful.png';
import celebrating from './raw/toki-reaction-celebrating.png';
import affirming from './raw/toki-reaction-affirming.png';

export type TokiPose = 'walk' | 'walk-away' | 'point' | 'think' | 'celebrate' | 'affirm' | 'idle';

export const TOKI_FPS: Record<TokiPose, number> = {
  walk: 10, 'walk-away': 6, point: 1, think: 1, celebrate: 1, affirm: 1, idle: 0.4,
};

const BASE = (import.meta.env.BASE_URL || '/') + 'art/toki/';

const FALLBACK: Record<TokiPose, string | null> = {
  walk: walking, 'walk-away': null, point: affirming, think: thoughtful, celebrate: celebrating, affirm: affirming, idle: null,
};

/**
 * Frames for a pose. Generated sprites are drawn for the default teal Toki
 * only, so a player wearing another skin keeps that skin's single image.
 */
export function tokiFrames(pose: TokiPose, skinImage: string, skinId: string = DEFAULT_SKIN_ID): string[] {
  const n = artManifest()?.toki?.[pose] ?? 0;
  if (n > 0 && skinId === DEFAULT_SKIN_ID) return Array.from({ length: n }, (_, i) => `${BASE}${pose}-${i}.png`);
  if (skinId !== DEFAULT_SKIN_ID) return [skinImage];
  return [FALLBACK[pose] ?? skinImage];
}

/** True when generated frames exist for this skin (switch from CSS bob to frame animation). */
export function hasTokiFrames(pose: TokiPose, skinId: string = DEFAULT_SKIN_ID): boolean {
  return skinId === DEFAULT_SKIN_ID && (artManifest()?.toki?.[pose] ?? 0) > 0;
}

/** React: re-render when the art manifest arrives. */
export function useTokiFrames(pose: TokiPose, skinImage: string, skinId: string = DEFAULT_SKIN_ID): string[] {
  useArt();
  return tokiFrames(pose, skinImage, skinId);
}
