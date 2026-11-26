/**
 * Item sounds: what makes each room sound like itself.
 *
 *  - Signature layers play over the room's bed while the lesson is on:
 *    sporadic one-shots (a timer in the stations room, scissors among the
 *    posters, a points chime in the gamified room) or a quiet loop (a
 *    clock in the test room). They stop when the lesson ends.
 *  - Each evidence hotspot has its own short sound, played on tap.
 *
 * Which sound plays where is content: tools/audio/items.json (`rooms`).
 * The recordings are public/audio/items/<asset>.mp3, fetched and checked
 * by tools/audio/items.py. A missing file is silence, never an error.
 *
 * Everything routes through the ambience bus, so it follows the sound
 * switch and dips under voice-over with the room. iOS 12: buffers decode
 * through ambience.loadBuffer (callback form); nothing plays before the
 * first gesture.
 */
import { rooms } from '../../tools/audio/items.json';
import { sfx } from './sfx';
import { loadBuffer } from './ambience';

interface Layer { asset: string; every?: number[]; loop?: boolean; gain: number }
interface Room { signature: Layer[]; spots?: Record<string, { asset: string; gain?: number }> }

const ROOMS = rooms as unknown as Record<string, Room>;
const BASE = (import.meta.env.BASE_URL || '/') + 'audio/items/';
const SPOT_GAIN = 1;

let current: string | null = null;
let gen = 0;
let timers: number[] = [];
let loops: { src: AudioBufferSourceNode; gain: GainNode }[] = [];

const debug: { room: string | null; played: Record<string, number> } | null =
  typeof window !== 'undefined' && (import.meta.env.DEV || /sfxdebug/.test(window.location.search))
    ? ((window as any).__tokiItems = { room: null, played: {} })
    : null;

const url = (asset: string) => BASE + asset + '.mp3';
const rand = (lo: number, hi: number) => lo + Math.random() * Math.max(0, hi - lo);

async function play(asset: string, gain: number, my: number | null, loop = false) {
  if (!sfx.isEnabled() || !sfx.isRunning()) return;
  const g = sfx.graph();
  if (!g) return;
  const buf = await loadBuffer(url(asset));
  if (!buf || (my !== null && my !== gen)) return;
  const src = g.ctx.createBufferSource();
  const gn = g.ctx.createGain();
  src.buffer = buf;
  src.loop = loop;
  src.connect(gn);
  gn.connect(g.amb);
  const now = g.ctx.currentTime;
  if (loop) {
    gn.gain.setValueAtTime(0.0001, now);
    gn.gain.linearRampToValueAtTime(gain, now + 1.2);
    src.start(0, Math.random() * Math.max(0, buf.duration - 1));
    loops.push({ src, gain: gn });
  } else {
    gn.gain.value = gain;
    src.start();
  }
  if (debug) debug.played[asset] = (debug.played[asset] ?? 0) + 1;
}

function schedule(layer: Layer, my: number, first: boolean) {
  const [lo, hi] = layer.every ?? [12, 20];
  // The first one comes sooner, so the room announces itself.
  const wait = first ? rand(lo * 0.25, lo * 0.6) : rand(lo, hi);
  const id = window.setTimeout(() => {
    if (my !== gen) return;
    if (!document.hidden) void play(layer.asset, layer.gain, my);
    schedule(layer, my, false);
  }, wait * 1000);
  timers.push(id);
}

function stopAll(fadeSec = 0.8) {
  gen++;
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
  const g = sfx.graph();
  for (const l of loops) {
    try {
      if (g) {
        const now = g.ctx.currentTime;
        l.gain.gain.cancelScheduledValues(now);
        l.gain.gain.setValueAtTime(Math.max(l.gain.gain.value, 0.0001), now);
        l.gain.gain.linearRampToValueAtTime(0.0001, now + fadeSec);
      }
      window.setTimeout(() => { try { l.src.stop(); } catch { /* */ } try { l.gain.disconnect(); } catch { /* */ } }, fadeSec * 1000 + 100);
    } catch { /* never let audio break the game */ }
  }
  loops = [];
}

function start(key: string) {
  stopAll(0.4);
  const room = ROOMS[key];
  if (!room || !sfx.isEnabled() || !sfx.isRunning()) return;
  const my = gen;
  for (const layer of room.signature) {
    if (layer.loop) void play(layer.asset, layer.gain, my, true);
    else schedule(layer, my, true);
  }
  // Warm the hotspot sounds so a tap answers at once.
  for (const s of Object.values(room.spots ?? {})) void loadBuffer(url(s.asset));
}

// Sound switched back on, or audio unlocked by the first gesture: resume the room.
sfx.subscribe((on) => { if (!on) stopAll(0.3); else if (current) start(current); });
sfx.onRunning(() => { if (current && loops.length === 0 && timers.length === 0) start(current); });

export const items = {
  /** The room the player is in: a level id, 'bossId:sceneId' or 'visitId:contextId'. Idempotent. */
  enterRoom(key: string | number) {
    const k = String(key);
    if (k === current) return;
    current = k;
    if (debug) debug.room = k;
    start(k);
  },
  /** The lesson is over (or the player left): the room's own sounds stop. */
  leave() {
    current = null;
    if (debug) debug.room = null;
    stopAll();
  },
  /** An evidence hotspot was tapped: play what it is. */
  spot(spotId: string, roomKey?: string | number) {
    const key = roomKey != null ? String(roomKey) : current;
    const s = key ? ROOMS[key]?.spots?.[spotId] : undefined;
    if (s) void play(s.asset, s.gain ?? SPOT_GAIN, null);
  },
};
