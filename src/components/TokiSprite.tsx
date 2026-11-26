import { useEffect, useState } from 'react';

/**
 * Toki in a pose. Today every pose is a single image animated with CSS
 * (breathe, hop, walk bob). When the art director ships frame-by-frame
 * art in src/assets/tokiFrames.ts, the same component plays those frames
 * instead — no screen code changes.
 *
 * Expected shape of src/assets/tokiFrames.ts (all optional):
 *   export const TOKI_FRAMES: Partial<Record<TokiPose, { frames: string[]; fps: number; loop?: boolean }>>;
 */
export type TokiPose = 'idle' | 'walk' | 'walkAway' | 'point' | 'think' | 'celebrate' | 'affirm';

type FrameSet = { frames: string[]; fps: number; loop?: boolean };

// Feature-detect the frames module without failing the build when it
// doesn't exist yet: the glob simply matches nothing.
const mods = import.meta.glob('../assets/tokiFrames.ts', { eager: true }) as Record<string, { TOKI_FRAMES?: Partial<Record<TokiPose, FrameSet>> }>;
const FRAMES: Partial<Record<TokiPose, FrameSet>> = Object.values(mods)[0]?.TOKI_FRAMES ?? {};

const reducedMotion = (): boolean => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

export function hasFrames(pose: TokiPose): boolean {
  return !!FRAMES[pose]?.frames?.length;
}

export function TokiSprite({ pose, fallback, className, alt = '' }: {
  pose: TokiPose;
  /** The single image used when this pose has no frames. */
  fallback: string;
  className?: string;
  alt?: string;
}) {
  const set = FRAMES[pose];
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    if (!set || set.frames.length < 2 || reducedMotion()) return;
    const id = window.setInterval(() => {
      setI((n) => {
        const next = n + 1;
        if (next < set.frames.length) return next;
        return set.loop === false ? n : 0;
      });
    }, 1000 / Math.max(1, set.fps));
    return () => window.clearInterval(id);
  }, [pose, set]);
  const src = set?.frames?.length ? set.frames[Math.min(i, set.frames.length - 1)] : fallback;
  // data-frames lets CSS turn off the single-image keyframes when real frames play.
  return <img src={src} alt={alt} className={className} data-frames={set ? 'on' : 'off'} draggable={false} />;
}
