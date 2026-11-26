/**
 * Generated art (docs/design/ART_BIBLE.md). Files live in public/art/ and
 * are listed in public/art/manifest.json by tools/art/assets.py. The game
 * asks only for what the manifest lists and otherwise uses the bundled art,
 * so nothing breaks before (or if) generation runs.
 *
 *   const src = useSceneArt('L1', level.sceneImage)   // React
 *   sceneArt('B25', fallback)                          // plain
 *
 * Scene ids: L<level or academy id>, B<boss id>, V<visit id>, V<visit id>-<context id>.
 */
import { useEffect, useState } from 'react';

export interface ArtManifest {
  scenes: string[];
  toki: Record<string, number>;
  schools: number[];
  map: boolean;
}

const BASE = (import.meta.env.BASE_URL || '/') + 'art/';
let manifest: ArtManifest | null = null;
let scenes = new Set<string>();
const listeners = new Set<() => void>();

const ready: Promise<void> = (typeof window === 'undefined' ? Promise.resolve(null) : fetch(BASE + 'manifest.json')
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null))
  .then((m: ArtManifest | null) => {
    if (m && Array.isArray(m.scenes)) {
      manifest = { scenes: m.scenes, toki: m.toki ?? {}, schools: m.schools ?? [], map: !!m.map };
      scenes = new Set(m.scenes);
    }
    listeners.forEach((fn) => fn());
  });

export const artReady = () => ready;
export const artManifest = () => manifest;

export function sceneArt(id: string, fallback?: string): string | undefined {
  return scenes.has(id) ? `${BASE}scenes/${id}.jpg` : fallback;
}

export function schoolArt(world: number): string | null {
  return manifest?.schools.includes(world) ? `${BASE}schools/w${world}.png` : null;
}

export function mapArt(): string | null {
  return manifest?.map ? `${BASE}map/background.jpg` : null;
}

/** Re-render once the manifest has loaded. */
export function useArt(): ArtManifest | null {
  const [, bump] = useState(0);
  useEffect(() => {
    if (manifest) return;
    const fn = () => bump((n) => n + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);
  return manifest;
}

export function useSceneArt(id: string, fallback?: string): string | undefined {
  useArt();
  return sceneArt(id, fallback);
}
