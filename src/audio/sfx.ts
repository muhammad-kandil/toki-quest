/**
 * Sound engine — a small, fully synthesized palette (no audio files).
 *
 * Design register: "calm confidence" for adult professionals, often in
 * a staff room. Every cue is short, soft, and tonal — no arcade bleeps.
 *   tap        — soft click on any button press
 *   correct    — two-note rising chime (C5 → E5)
 *   lookAgain  — a gentle, unjudging "hm" (never a buzzer)
 *   reveal     — three-note rising arpeggio when the answer is shown
 *   lethal     — low, quiet sting when a lethal mutation is named
 *   badge      — four-note fanfare, restrained
 *   world      — five-note flourish on a world/quest completion
 *   step       — quiet footstep tick while Toki walks
 *
 * Browser rules: audio can only start after a user gesture (hard rule
 * on iOS / Telegram). We create the context lazily on the first
 * pointer/key event, so the first tap "unlocks" sound for the session.
 * Mute preference persists in localStorage (device preference, not
 * part of the game save).
 */

type Cue = 'tap' | 'correct' | 'lookAgain' | 'reveal' | 'lethal' | 'badge' | 'world' | 'step';

const PREF_KEY = 'toki:sound';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = readPref();
const listeners = new Set<(on: boolean) => void>();

function readPref(): boolean {
  try {
    const v = window.localStorage.getItem(PREF_KEY);
    return v == null ? true : v === 'on';
  } catch {
    return true;
  }
}

function ensureCtx(): AudioContext | null {
  if (ctx) return ctx;
  const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  try {
    ctx = new AC();
    master = ctx!.createGain();
    master.gain.value = 0.35; // overall volume: present, never loud
    master.connect(ctx!.destination);
  } catch {
    ctx = null;
  }
  return ctx;
}

/** Called on the first user gesture; resumes a suspended context (iOS). */
function unlock() {
  const c = ensureCtx();
  if (c && c.state === 'suspended') c.resume().catch(() => {});
}

// Attach unlock listeners once, at module load.
if (typeof window !== 'undefined') {
  const once = () => {
    unlock();
    window.removeEventListener('pointerdown', once);
    window.removeEventListener('keydown', once);
    window.removeEventListener('touchstart', once);
  };
  window.addEventListener('pointerdown', once, { passive: true });
  window.addEventListener('keydown', once);
  window.addEventListener('touchstart', once, { passive: true });
}

/** One tone with an ADSR-ish envelope. */
function tone(
  freq: number,
  start: number,
  dur: number,
  opts: { type?: OscillatorType; gain?: number; glideTo?: number; attack?: number } = {},
) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, start);
  if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(opts.glideTo, start + dur);
  const peak = opts.gain ?? 0.5;
  const attack = opts.attack ?? 0.008;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(master!);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

/** Short filtered noise burst — the "click" body of a tap. */
function click(start: number, gain = 0.25) {
  const c = ctx!;
  const len = Math.floor(c.sampleRate * 0.03);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = 1800;
  f.Q.value = 1.2;
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(f);
  f.connect(g);
  g.connect(master!);
  src.start(start);
}

const CUES: Record<Cue, () => void> = {
  tap: () => {
    const t0 = ctx!.currentTime;
    click(t0, 0.18);
    tone(620, t0, 0.05, { type: 'sine', gain: 0.12 });
  },
  step: () => {
    const t0 = ctx!.currentTime;
    click(t0, 0.08);
  },
  correct: () => {
    const t0 = ctx!.currentTime;
    tone(523.25, t0, 0.16, { type: 'triangle', gain: 0.35 });        // C5
    tone(659.25, t0 + 0.11, 0.26, { type: 'triangle', gain: 0.38 }); // E5
  },
  lookAgain: () => {
    const t0 = ctx!.currentTime;
    // A soft downward "hm" — thoughtful, not punitive.
    tone(330, t0, 0.22, { type: 'sine', gain: 0.22, glideTo: 262, attack: 0.02 });
  },
  reveal: () => {
    const t0 = ctx!.currentTime;
    [523.25, 659.25, 783.99].forEach((f, i) =>
      tone(f, t0 + i * 0.09, 0.3, { type: 'triangle', gain: 0.3 }),
    );
  },
  lethal: () => {
    const t0 = ctx!.currentTime;
    tone(110, t0, 0.5, { type: 'sawtooth', gain: 0.10, glideTo: 92, attack: 0.03 });
    tone(165, t0, 0.5, { type: 'sine', gain: 0.12, glideTo: 138, attack: 0.03 });
  },
  badge: () => {
    const t0 = ctx!.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone(f, t0 + i * 0.1, i === 3 ? 0.5 : 0.22, { type: 'triangle', gain: 0.32 }),
    );
  },
  world: () => {
    const t0 = ctx!.currentTime;
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone(f, t0 + i * 0.11, i === 4 ? 0.7 : 0.24, { type: 'triangle', gain: 0.3 }),
    );
    tone(261.63, t0 + 0.44, 0.7, { type: 'sine', gain: 0.18 });
  },
};

export const sfx = {
  play(cue: Cue) {
    if (!enabled) return;
    const c = ensureCtx();
    if (!c || !master) return;
    if (c.state === 'suspended') {
      c.resume().catch(() => {});
      if (c.state === 'suspended') return; // still locked: skip silently
    }
    try {
      CUES[cue]();
    } catch {
      /* never let audio break the game */
    }
  },
  isEnabled: () => enabled,
  setEnabled(on: boolean) {
    enabled = on;
    try {
      window.localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    if (on) {
      unlock();
      sfx.play('tap');
    }
    listeners.forEach((fn) => fn(on));
  },
  subscribe(fn: (on: boolean) => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
