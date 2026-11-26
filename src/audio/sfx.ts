/**
 * Sound engine — fully synthesized (no audio files), Web Audio only.
 *
 * Register: "calm confidence" for adult coaches, often in a staff room.
 * Every cue is short, soft and tonal; the one bigger moment is a badge
 * or a world/quest theme, and those are rare by design. Nothing here is
 * meant to be heard forty times a day and grate.
 *
 * Structure
 *   master ─ destination
 *   ├─ music bus   fallback "world bed": a synthesized pad, used only when
 *   │              the recorded score can't load.
 *   └─ sfx bus     the cues. Important cues briefly duck the music.
 *   score bus ─ destination
 *                  the recorded score (public/audio/music, composed by
 *                  tools/audio/music/compose.py): title, map, one loop per
 *                  world mood, and stingers for a room, a badge, a world.
 *
 * Platform rules
 *   - iOS / Telegram: audio starts only after a user gesture. The context
 *     is created lazily on the first pointer/key event.
 *   - iOS 12 Safari (legacy build): webkitAudioContext, no StereoPanner,
 *     no modern-only AudioParam methods beyond ramps/setTargetAtTime.
 *   - Mute lives in localStorage `toki:sound` (device preference).
 *   - prefers-reduced-motion shortens the flourishes.
 *
 * See docs/design/SOUND.md for the palette and the rules for adding a cue.
 */

export type Cue =
  | 'tap' | 'step' | 'discover' | 'evidenceAll'
  | 'correct' | 'lookAgain' | 'risk'
  | 'reveal' | 'lethal'
  | 'badge' | 'world' | 'quest'
  | 'door' | 'wipe' | 'travel' | 'gallery';

export type Mood = 'warm' | 'thoughtful' | 'serious';
/** What plays: a world mood, or the title / map pieces of the score. */
export type Track = Mood | 'title' | 'map';

export interface PlayOpts {
  /** For 'risk': 0 minor … 3 lethal — pitch falls with severity. */
  level?: number;
}

const PREF_KEY = 'toki:sound';
const MASTER_GAIN = 0.38;
const MUSIC_GAIN = 0.16;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicBus: GainNode | null = null;
let sfxBus: GainNode | null = null;
let voiceBus: GainNode | null = null;
let scoreBus: GainNode | null = null;
/** Recorded score sits under speech (−18 LUFS) and room sound (−24…−32). */
const SCORE_GAIN = 0.42;
const STINGER_GAIN = 0.55;
let ambBus: GainNode | null = null;
const AMB_GAIN = 0.9;
let enabled = readPref();
const listeners = new Set<(on: boolean) => void>();

const reducedMotion = (): boolean => {
  try { return !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

/** Debug counter for E2E: window.__tokiSfx = { cues: {name: n}, music: mood|null }. */
const debug: { cues: Record<string, number>; music: Track | null } | null =
  typeof window !== 'undefined' && (import.meta.env.DEV || /sfxdebug/.test(window.location.search))
    ? ((window as any).__tokiSfx = { cues: {}, music: null })
    : null;

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
    master.gain.value = MASTER_GAIN;
    master.connect(ctx!.destination);
    musicBus = ctx!.createGain();
    musicBus.gain.value = MUSIC_GAIN;
    musicBus.connect(master);
    sfxBus = ctx!.createGain();
    sfxBus.gain.value = 1;
    sfxBus.connect(master);
    // Recorded audio: voice-over clips and room recordings. These are
    // already loudness-normalised, so they bypass the synth master trim.
    voiceBus = ctx!.createGain();
    voiceBus.gain.value = 1;
    voiceBus.connect(ctx!.destination);
    scoreBus = ctx!.createGain();
    scoreBus.gain.value = SCORE_GAIN;
    scoreBus.connect(ctx!.destination);
    ambBus = ctx!.createGain();
    ambBus.gain.value = AMB_GAIN;
    ambBus.connect(ctx!.destination);
  } catch {
    ctx = null;
  }
  return ctx;
}

/** Called on the first user gesture; resumes a suspended context (iOS). */
const runningListeners = new Set<() => void>();
function unlock() {
  const c = ensureCtx();
  const fire = () => runningListeners.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  const resumeMusic = () => { if (pendingTrack) void playTrack(pendingTrack); else if (pendingMood) startBed(pendingMood); };
  if (c && c.state === 'suspended') c.resume().then(() => { resumeMusic(); preloadStingers(); fire(); }).catch(() => {});
  else if (c) { resumeMusic(); preloadStingers(); fire(); }
}

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

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

interface ToneOpts { type?: OscillatorType; gain?: number; glideTo?: number; attack?: number; release?: number; bus?: GainNode; detune?: number }

/** One tone: attack → peak → exponential release. */
function tone(freq: number, start: number, dur: number, o: ToneOpts = {}) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, start);
  if (o.detune) osc.detune.value = o.detune;
  if (o.glideTo) osc.frequency.exponentialRampToValueAtTime(o.glideTo, start + dur);
  const peak = o.gain ?? 0.5;
  const attack = o.attack ?? 0.008;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + attack);
  g.gain.setValueAtTime(peak, start + Math.max(attack, dur * 0.35));
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(o.bus ?? sfxBus!);
  osc.start(start);
  osc.stop(start + dur + 0.03);
}

let noiseBuf: AudioBuffer | null = null;
function noise(): AudioBuffer {
  const c = ctx!;
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const len = Math.floor(c.sampleRate * 1.2);
  noiseBuf = c.createBuffer(1, len, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

/** Filtered noise with an envelope — clicks, thuds, whooshes, air. */
function hiss(start: number, dur: number, o: { gain?: number; type?: BiquadFilterType; from: number; to?: number; q?: number; attack?: number } ) {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = noise();
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = o.type ?? 'bandpass';
  f.Q.value = o.q ?? 1;
  f.frequency.setValueAtTime(o.from, start);
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, start + dur);
  const g = c.createGain();
  const peak = o.gain ?? 0.2;
  const attack = o.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(f); f.connect(g); g.connect(sfxBus!);
  src.start(start);
  src.stop(start + dur + 0.02);
}

/** Briefly lower the music bed under an important cue. */
function duck(seconds: number, depth = 0.35) {
  if (!musicBus || !ctx) return;
  const now = ctx.currentTime;
  for (const [g, full] of [[musicBus.gain, MUSIC_GAIN], [scoreBus?.gain, SCORE_GAIN]] as [AudioParam | undefined, number][]) {
    if (!g) continue;
    g.cancelScheduledValues(now);
    g.setTargetAtTime(full * depth, now, 0.04);
    g.setTargetAtTime(full, now + seconds, 0.35);
  }
}

/** Hold the room down while someone speaks; release when they stop. */
function duckRoom(on: boolean) {
  if (!ambBus || !ctx) return;
  const now = ctx.currentTime;
  ambBus.gain.cancelScheduledValues(now);
  ambBus.gain.setTargetAtTime(on ? AMB_GAIN * 0.38 : AMB_GAIN, now, on ? 0.08 : 0.5);
}

const r = (a: number, b: number) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ */
/* Cues                                                                */
/* ------------------------------------------------------------------ */

const CUES: Record<Cue, (o: PlayOpts) => void> = {
  // A soft, dry click with a touch of wood.
  tap: () => {
    const t = ctx!.currentTime;
    hiss(t, 0.03, { from: 2200, gain: 0.14, q: 1.4 });
    tone(r(560, 640), t, 0.045, { type: 'sine', gain: 0.09 });
  },
  // Footstep: low thud + faint shoe hiss, pitch varies so a walk is not a metronome.
  step: () => {
    const t = ctx!.currentTime;
    tone(r(118, 142), t, 0.07, { type: 'sine', gain: 0.16, glideTo: 70, attack: 0.004 });
    hiss(t, 0.04, { from: 1400, gain: 0.05, q: 0.8 });
  },
  // Evidence found: a notebook tick — woody click, then a tiny high ping.
  discover: () => {
    const t = ctx!.currentTime;
    hiss(t, 0.025, { from: 900, gain: 0.16, q: 2 });
    tone(1318.5, t + 0.03, 0.12, { type: 'sine', gain: 0.12 }); // E6
  },
  // All evidence inspected: three quick ascending notes, bright but soft.
  evidenceAll: () => {
    const t = ctx!.currentTime;
    [783.99, 987.77, 1174.66].forEach((f, i) => tone(f, t + i * 0.07, 0.18, { type: 'triangle', gain: 0.2 }));
    duck(0.5);
  },
  // Correct: two warm notes, C5 → E5, with a quiet fifth underneath.
  correct: () => {
    const t = ctx!.currentTime;
    tone(523.25, t, 0.16, { type: 'triangle', gain: 0.3 });
    tone(659.25, t + 0.11, 0.3, { type: 'triangle', gain: 0.32 });
    tone(392, t + 0.11, 0.3, { type: 'sine', gain: 0.1 });
    duck(0.5);
  },
  // Look again: a questioning two-note — up a fourth, soft. Never a buzzer.
  lookAgain: () => {
    const t = ctx!.currentTime;
    tone(329.63, t, 0.14, { type: 'sine', gain: 0.2, attack: 0.015 });
    tone(440, t + 0.13, 0.26, { type: 'sine', gain: 0.17, attack: 0.02 });
    duck(0.5, 0.5);
  },
  // Risk pick: one note whose pitch falls with severity (minor → lethal).
  risk: (o) => {
    const t = ctx!.currentTime;
    const lvl = Math.max(0, Math.min(3, o.level ?? 0));
    const f = [659.25, 523.25, 392, 261.63][lvl];
    tone(f, t, 0.18, { type: 'triangle', gain: 0.22, attack: 0.01 });
    if (lvl === 3) tone(f / 2, t, 0.3, { type: 'sine', gain: 0.14, attack: 0.02 });
  },
  // Reveal: three-note rising arpeggio with a little air underneath.
  reveal: () => {
    const t = ctx!.currentTime;
    [523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.09, 0.32, { type: 'triangle', gain: 0.26 }));
    hiss(t, 0.45, { from: 3000, to: 6000, gain: 0.03, type: 'highpass', attack: 0.1 });
    duck(0.7);
  },
  // Lethal mutation: low, serious, short — a held fifth sinking a semitone.
  lethal: () => {
    const t = ctx!.currentTime;
    tone(110, t, 0.55, { type: 'sawtooth', gain: 0.07, glideTo: 103.8, attack: 0.03 });
    tone(164.8, t, 0.55, { type: 'sine', gain: 0.12, glideTo: 155.6, attack: 0.03 });
    tone(55, t, 0.6, { type: 'sine', gain: 0.1, attack: 0.05 });
    duck(0.8, 0.3);
  },
  // Badge: the one allowed fanfare — four notes to the octave, ~1.2 s.
  badge: () => {
    const t = ctx!.currentTime;
    const short = reducedMotion();
    const notes = short ? [523.25, 783.99, 1046.5] : [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => tone(f, t + i * 0.1, i === notes.length - 1 ? (short ? 0.4 : 0.75) : 0.22, { type: 'triangle', gain: 0.3 }));
    if (!short) {
      tone(261.63, t + 0.3, 0.9, { type: 'sine', gain: 0.14, attack: 0.05 });
      hiss(t + 0.3, 0.8, { from: 4000, to: 8000, gain: 0.025, type: 'highpass', attack: 0.15 });
    }
    duck(1.2, 0.3);
  },
  // World complete: a short theme — rising fifths resolving on a warm chord, ~2 s.
  world: () => {
    const t = ctx!.currentTime;
    const short = reducedMotion();
    const line = [392, 523.25, 659.25, 783.99, 1046.5];
    line.forEach((f, i) => tone(f, t + i * 0.11, i === 4 ? 0.8 : 0.24, { type: 'triangle', gain: 0.28 }));
    if (!short) {
      // resolving chord: C4 E4 G4 held under the last note
      [261.63, 329.63, 392].forEach((f, i) => tone(f, t + 0.55, 1.4, { type: 'sine', gain: 0.12, attack: 0.08, detune: i * 3 }));
      tone(130.81, t + 0.55, 1.5, { type: 'sine', gain: 0.1, attack: 0.1 });
    }
    duck(2, 0.25);
  },
  // Quest complete: used once — a slow rising theme with a long chord tail, ~4 s.
  quest: () => {
    const t = ctx!.currentTime;
    const short = reducedMotion();
    const melody = [392, 440, 523.25, 587.33, 659.25, 783.99];
    melody.forEach((f, i) => tone(f, t + i * 0.22, 0.5, { type: 'triangle', gain: 0.26, attack: 0.02 }));
    const chordAt = t + melody.length * 0.22;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, chordAt, short ? 1.2 : 2.6, { type: 'triangle', gain: 0.16, attack: 0.12, detune: i * 2 }));
    [130.81, 196].forEach((f) => tone(f, chordAt, short ? 1.2 : 2.8, { type: 'sine', gain: 0.12, attack: 0.15 }));
    if (!short) hiss(chordAt, 2.4, { from: 3000, to: 9000, gain: 0.03, type: 'highpass', attack: 0.4 });
    duck(short ? 2.5 : 4.2, 0.2);
  },
  // Door opens: a short wooden thunk and a soft creak upward.
  door: () => {
    const t = ctx!.currentTime;
    tone(180, t, 0.09, { type: 'sine', gain: 0.18, glideTo: 90, attack: 0.004 });
    hiss(t + 0.02, 0.22, { from: 500, to: 1400, gain: 0.07, q: 3, attack: 0.03 });
  },
  // Scene wipe: a soft air sweep.
  wipe: () => {
    const t = ctx!.currentTime;
    hiss(t, 0.42, { from: 400, to: 2600, gain: 0.09, type: 'bandpass', q: 0.7, attack: 0.08 });
  },
  // Map travel: a short upward whoosh as Toki sets off.
  travel: () => {
    const t = ctx!.currentTime;
    hiss(t, 0.35, { from: 300, to: 1800, gain: 0.08, q: 0.9, attack: 0.05 });
    tone(392, t + 0.05, 0.2, { type: 'sine', gain: 0.1, glideTo: 587.33, attack: 0.03 });
  },
  // Badge gallery opens: a soft, open chime.
  gallery: () => {
    const t = ctx!.currentTime;
    [659.25, 987.77].forEach((f, i) => tone(f, t + i * 0.08, 0.35, { type: 'sine', gain: 0.14, attack: 0.02 }));
  },
};

/* ------------------------------------------------------------------ */
/* Music bed                                                           */
/* ------------------------------------------------------------------ */

/** Chord progressions per mood (frequencies in Hz). Low, open voicings. */
const BEDS: Record<Mood, { chords: number[][]; cutoff: number; every: number; type: OscillatorType }> = {
  // Worlds 1–3: warm — C major, A minor 7, F major 7
  warm: { chords: [[130.81, 196, 329.63, 392], [110, 164.81, 261.63, 329.63], [87.31, 130.81, 220, 329.63]], cutoff: 720, every: 7, type: 'triangle' },
  // Worlds 4–6: thoughtful — D minor 9, Bb major 7, G minor add 9
  thoughtful: { chords: [[146.83, 220, 349.23, 329.63], [116.54, 174.61, 293.66, 440], [98, 146.83, 233.08, 220]], cutoff: 600, every: 8, type: 'triangle' },
  // Worlds 7–8: serious — E minor, C major 7 over E, B sus
  serious: { chords: [[82.41, 123.47, 196, 246.94], [82.41, 130.81, 196, 246.94], [61.74, 123.47, 185, 246.94]], cutoff: 480, every: 9, type: 'sawtooth' },
};

interface Bed { mood: Mood; gain: GainNode; filter: BiquadFilterNode; lfo: OscillatorNode; timer: number; voices: OscillatorNode[]; stopped: boolean }
let bed: Bed | null = null;
let pendingMood: Mood | null = null;

function startBed(mood: Mood) {
  const c = ensureCtx();
  if (!c || !musicBus || c.state !== 'running') { pendingMood = mood; return; }
  pendingMood = null;
  if (bed && bed.mood === mood && !bed.stopped) return;
  stopBed(1.4);

  const spec = BEDS[mood];
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(1, c.currentTime + 2.5);
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = spec.cutoff;
  filter.Q.value = 0.7;
  // Slow LFO on the cutoff so the pad breathes.
  const lfo = c.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.06;
  const lfoGain = c.createGain();
  lfoGain.gain.value = spec.cutoff * 0.35;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();
  filter.connect(gain);
  gain.connect(musicBus);

  const b: Bed = { mood, gain, filter, lfo, timer: 0, voices: [], stopped: false };
  bed = b;
  let idx = 0;
  const playChord = () => {
    if (b.stopped) return;
    const t = c.currentTime;
    const chord = spec.chords[idx % spec.chords.length];
    idx++;
    const dur = spec.every + 2.5;
    chord.forEach((f, i) => {
      [-4, 4].forEach((det) => {
        const osc = c.createOscillator();
        osc.type = i === 0 ? 'sine' : spec.type;
        osc.frequency.value = f;
        osc.detune.value = det + (i - 1.5) * 1.5;
        const g = c.createGain();
        const peak = (i === 0 ? 0.5 : 0.22) * 0.5;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 2.2);
        g.gain.setValueAtTime(peak, t + dur - 2.6);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g); g.connect(filter);
        osc.start(t); osc.stop(t + dur + 0.05);
        b.voices.push(osc);
      });
    });
    b.voices = b.voices.slice(-24);
    b.timer = window.setTimeout(playChord, spec.every * 1000);
  };
  playChord();
  if (debug) debug.music = mood;
}

function stopBed(fadeSec = 1) {
  pendingMood = null;
  if (!bed || !ctx) return;
  const b = bed;
  bed = null;
  b.stopped = true;
  window.clearTimeout(b.timer);
  const now = ctx.currentTime;
  b.gain.gain.cancelScheduledValues(now);
  b.gain.gain.setValueAtTime(Math.max(b.gain.gain.value, 0.0001), now);
  b.gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeSec);
  window.setTimeout(() => {
    try { b.lfo.stop(); } catch { /* already stopped */ }
    b.voices.forEach((v) => { try { v.stop(); } catch { /* already stopped */ } });
    try { b.gain.disconnect(); } catch { /* ignore */ }
  }, fadeSec * 1000 + 80);
  if (debug) debug.music = null;
}

/* ------------------------------------------------------------------ */
/* Recorded score                                                      */
/* ------------------------------------------------------------------ */

type Stinger = 'level-complete' | 'badge' | 'world-complete';
const MUSIC_BASE = (import.meta.env.BASE_URL || '/') + 'audio/music/';
const STINGER_FOR: Partial<Record<Cue, Stinger>> = { reveal: 'level-complete', badge: 'badge', world: 'world-complete', quest: 'world-complete' };
const musicCache = new Map<string, Promise<AudioBuffer | null>>();
const decoded = new Map<string, AudioBuffer>();
let loopsInfo: Promise<Record<string, { loopStart: number; period: number }>> | null = null;

function loadMusic(name: string): Promise<AudioBuffer | null> {
  const hit = musicCache.get(name);
  if (hit) return hit;
  const c = ensureCtx();
  if (!c) return Promise.resolve(null);
  const p = (async () => {
    try {
      const res = await fetch(MUSIC_BASE + name + '.mp3');
      if (!res.ok) return null;
      const data = await res.arrayBuffer();
      // iOS 12: callback form only.
      const buf = await new Promise<AudioBuffer | null>((resolve) => {
        try {
          const r = c.decodeAudioData(data, (b) => resolve(b), () => resolve(null));
          if (r && typeof (r as Promise<AudioBuffer>).catch === 'function') (r as Promise<AudioBuffer>).catch(() => resolve(null));
        } catch { resolve(null); }
      });
      if (buf) decoded.set(name, buf);
      return buf;
    } catch {
      return null;
    }
  })();
  musicCache.set(name, p);
  p.then((b) => { if (!b) musicCache.delete(name); });
  return p;
}

function loadLoops() {
  if (!loopsInfo) {
    loopsInfo = fetch(MUSIC_BASE + 'loops.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then((j: { loops?: Record<string, { loopStart: number; period: number }> }) => (j && j.loops) || {})
      .catch(() => ({} as Record<string, { loopStart: number; period: number }>));
  }
  return loopsInfo;
}

function preloadStingers() {
  (['level-complete', 'badge', 'world-complete'] as Stinger[]).forEach((n) => { void loadMusic(n); });
}

/** Play a recorded stinger if it is already decoded; false = use the synth cue. */
function playStinger(name: Stinger): boolean {
  const buf = decoded.get(name);
  if (!buf || !ctx || ctx.state !== 'running') { void loadMusic(name); return false; }
  const src = ctx.createBufferSource();
  const g = ctx.createGain();
  g.gain.value = STINGER_GAIN;
  src.buffer = buf;
  src.connect(g);
  g.connect(ctx.destination);
  src.start();
  duck(Math.min(buf.duration, 4.5), 0.25);
  return true;
}

let score: { track: Track; src: AudioBufferSourceNode; gain: GainNode } | null = null;
let pendingTrack: Track | null = null;
let requestedTrack: Track | null = null;
let trackToken = 0;

const fallbackMood = (t: Track): Mood => (t === 'title' || t === 'map' ? 'warm' : t);

function stopScore(fadeSec = 1.2) {
  pendingTrack = null;
  if (!score || !ctx) return;
  const s = score;
  score = null;
  const now = ctx.currentTime;
  s.gain.gain.cancelScheduledValues(now);
  s.gain.gain.setValueAtTime(Math.max(s.gain.gain.value, 0.0001), now);
  s.gain.gain.linearRampToValueAtTime(0.0001, now + fadeSec);
  window.setTimeout(() => {
    try { s.src.stop(); } catch { /* already stopped */ }
    try { s.gain.disconnect(); } catch { /* ignore */ }
  }, fadeSec * 1000 + 80);
}

async function playTrack(track: Track) {
  const my = ++trackToken;
  const c = ensureCtx();
  if (!c || !scoreBus || c.state !== 'running') { pendingTrack = track; return; }
  pendingTrack = null;
  if (score && score.track === track) return;
  const [buf, loops] = await Promise.all([loadMusic(track), loadLoops()]);
  if (my !== trackToken || !enabled) return;
  if (!buf) {
    // No recording (offline, or not rendered yet): the synthesized pad.
    stopScore(1.2);
    startBed(fallbackMood(track));
    if (debug) debug.music = track;
    return;
  }
  stopBed(1.2);
  stopScore(1.2);
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  // Loop one exact period inside the file (pre-roll before, post-roll
  // after), which stays seamless whatever priming the MP3 decoder adds.
  const li = loops[track];
  if (li && li.loopStart + li.period <= buf.duration + 0.01) {
    src.loopStart = li.loopStart;
    src.loopEnd = li.loopStart + li.period;
  }
  const gain = c.createGain();
  const now = c.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(1, now + 1.2);
  src.connect(gain);
  gain.connect(scoreBus);
  src.start(0, 0);
  score = { track, src, gain };
  if (debug) debug.music = track;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export const sfx = {
  play(cue: Cue, opts: PlayOpts = {}) {
    if (!enabled) return;
    const c = ensureCtx();
    if (!c || !master) return;
    if (c.state === 'suspended') {
      c.resume().catch(() => {});
      if (c.state === 'suspended') return; // still locked: skip silently
    }
    try {
      const st = STINGER_FOR[cue];
      if (!(st && playStinger(st))) CUES[cue](opts);
      if (debug) debug.cues[cue] = (debug.cues[cue] ?? 0) + 1;
    } catch {
      /* never let audio break the game */
    }
  },
  /** Start (or crossfade to) a piece of the score; null fades it out. Idempotent per track. */
  music(track: Track | null) {
    requestedTrack = track;
    if (!enabled || track == null) { trackToken++; stopScore(1.2); stopBed(1.2); if (debug) debug.music = null; return; }
    void playTrack(track);
  },
  /** Mood for a world number: 1–3 warm, 4–6 thoughtful, 7+ serious. */
  moodFor(worldNumber: number): Mood {
    return worldNumber <= 3 ? 'warm' : worldNumber <= 6 ? 'thoughtful' : 'serious';
  },
  /** Lower the music bed for a while (used by Read aloud under speech). */
  duck(seconds: number, depth = 0.3) {
    if (!enabled) return;
    duck(seconds, depth);
  },
  /** Shared graph for recorded audio (voice clips, room recordings). */
  graph(): { ctx: AudioContext; voice: GainNode; amb: GainNode } | null {
    const c = ensureCtx();
    if (!c || !voiceBus || !ambBus) return null;
    return { ctx: c, voice: voiceBus, amb: ambBus };
  },
  /** True once the context can actually make sound (after the first gesture on iOS). */
  isRunning: () => !!ctx && ctx.state === 'running',
  duckRoom(on: boolean) { duckRoom(on); },
  /** Called when audio becomes able to play (first gesture). */
  onRunning(fn: () => void) { runningListeners.add(fn); return () => runningListeners.delete(fn); },
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
      if (requestedTrack) void playTrack(requestedTrack);
    } else {
      trackToken++;
      stopScore(0.4);
      stopBed(0.4);
    }
    listeners.forEach((fn) => fn(on));
  },
  subscribe(fn: (on: boolean) => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
