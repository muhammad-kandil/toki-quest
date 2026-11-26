/**
 * Room recordings: a looping bed per scene (students at work, a quiet
 * room, the corridor, the yard) and a few one-shots (bell, chairs).
 *
 *  - Real recordings, loaded lazily per bed (public/audio/amb/*.mp3).
 *  - One bed at a time, 1.6 s equal-power crossfade between beds.
 *  - Follows the global sound switch; ducks under voice-over.
 *  - Missing files are silent, never an error: the game runs without them.
 *  - iOS 12: decodeAudioData in callback form; nothing plays before the
 *    first gesture (requested bed starts on unlock).
 */
import { sfx } from './sfx';
import type { Bed } from '../data/ambience';

export type OneShot = 'bell' | 'chair';

const BASE = (import.meta.env.BASE_URL || '/') + 'audio/amb/';
const cache = new Map<string, Promise<AudioBuffer | null>>();
let wanted: Bed | null = null;
let current: { name: Bed; src: AudioBufferSourceNode; gain: GainNode } | null = null;
let token = 0;

const debug: { bed: Bed | null; shots: Record<string, number> } | null =
  typeof window !== 'undefined' && (import.meta.env.DEV || /sfxdebug/.test(window.location.search))
    ? ((window as any).__tokiAmb = { bed: null, shots: {} })
    : null;

export function loadBuffer(url: string): Promise<AudioBuffer | null> {
  const hit = cache.get(url);
  if (hit) return hit;
  const p = (async () => {
    const g = sfx.graph();
    if (!g) return null;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.arrayBuffer();
      return await new Promise<AudioBuffer | null>((resolve) => {
        try {
          const r = g.ctx.decodeAudioData(data, (b) => resolve(b), () => resolve(null));
          if (r && typeof (r as Promise<AudioBuffer>).catch === 'function') (r as Promise<AudioBuffer>).catch(() => resolve(null));
        } catch { resolve(null); }
      });
    } catch {
      return null;
    }
  })();
  cache.set(url, p);
  p.then((b) => { if (!b) cache.delete(url); });
  return p;
}

function fadeOut(node: { src: AudioBufferSourceNode; gain: GainNode }, ctx: AudioContext, sec: number) {
  const now = ctx.currentTime;
  node.gain.gain.cancelScheduledValues(now);
  node.gain.gain.setValueAtTime(Math.max(node.gain.gain.value, 0.0001), now);
  node.gain.gain.linearRampToValueAtTime(0.0001, now + sec);
  window.setTimeout(() => { try { node.src.stop(); } catch { /* */ } try { node.gain.disconnect(); } catch { /* */ } }, sec * 1000 + 100);
}

async function apply() {
  const my = ++token;
  const g = sfx.graph();
  const target = sfx.isEnabled() ? wanted : null;
  if (!g || !sfx.isRunning()) return;            // started again from onRunning
  if (current && current.name === target) return;
  if (current) { fadeOut(current, g.ctx, 1.6); current = null; }
  if (debug) debug.bed = target;
  if (!target) return;
  const buf = await loadBuffer(BASE + target + '.mp3');
  if (!buf || my !== token) return;
  const src = g.ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const gain = g.ctx.createGain();
  gain.gain.value = 0.0001;
  src.connect(gain);
  gain.connect(g.amb);
  // Start somewhere in the loop so the same few seconds don't greet every room.
  src.start(0, Math.random() * Math.max(0, buf.duration - 2));
  const now = g.ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(1, now + 1.6);
  current = { name: target, src, gain };
}

sfx.onRunning(() => { void apply(); });
sfx.subscribe(() => { void apply(); });

export const ambience = {
  /** The room to hear now; null for silence. Idempotent. */
  set(bed: Bed | null) {
    wanted = bed;
    void apply();
  },
  current: () => wanted,
  /** A single sound in the room (bell, chairs). */
  async shot(name: OneShot, gain = 1) {
    if (!sfx.isEnabled() || !sfx.isRunning()) return;
    const g = sfx.graph();
    if (!g) return;
    const buf = await loadBuffer(BASE + name + '.mp3');
    if (!buf) return;
    const src = g.ctx.createBufferSource();
    const gn = g.ctx.createGain();
    gn.gain.value = gain;
    src.buffer = buf;
    src.connect(gn);
    gn.connect(g.amb);
    src.start();
    if (debug) debug.shots[name] = (debug.shots[name] ?? 0) + 1;
  },
  /** Warm the cache for a bed the player is about to hear. */
  preload(bed: Bed) { void loadBuffer(BASE + bed + '.mp3'); },
};
