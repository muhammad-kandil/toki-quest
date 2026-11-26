/**
 * Voice-over. Two sources, one switch:
 *
 *   1. Recorded clips (public/audio/voice/<lang>/<key>.mp3) — neural
 *      voices rendered offline by the audio workflow: a narrator, Toki,
 *      and a voice per teacher. Used whenever a clip exists for the
 *      exact line.
 *   2. The device's own speech synthesis, for any line that has no clip
 *      yet (new or edited content) — so a content change never goes
 *      silent, it just sounds plainer until the workflow runs again.
 *
 * Rules:
 *  - On by default once recorded clips exist for the language; the
 *    player's choice (localStorage `toki:voice`) always wins. The global
 *    mute wins over both.
 *  - One voice at a time: a new line cancels the old, except explicit
 *    sequences (a conversation turn, the Final World's closing lines).
 *  - The room recording dips while anyone speaks.
 *  - Choices are never read automatically; the player is reading them.
 */
import { sfx } from './sfx';
import { loadBuffer } from './ambience';
import { clipKey, cleanForSpeech, voiceSlot, type Speaker } from './voiceKey';
import type { Lang } from '../i18n/types';

export type { Speaker };
export interface Line { text: string; who?: Speaker; teacher?: string }

const PREF_KEY = 'toki:voice';
const BASE = (import.meta.env.BASE_URL || '/') + 'audio/voice/';
const VOICE_PREF: Record<Lang, string[]> = { ar: ['ar-ae', 'ar-sa', 'ar-eg', 'ar'], en: ['en-gb', 'en-us', 'en'] };
const PITCH: Record<Speaker, number> = { narrator: 1.0, teacher: 1.0, toki: 1.12 };

/* ---------------- preference ---------------- */
let pref: 'on' | 'off' | null = null;
try {
  const v = window.localStorage.getItem(PREF_KEY);
  pref = v === 'on' || v === 'off' ? v : null;
} catch { /* private mode */ }

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

/* ---------------- recorded clips ---------------- */
const index: Partial<Record<Lang, Set<string>>> = {};
const indexLoading: Partial<Record<Lang, Promise<void>>> = {};
function loadIndex(lang: Lang): Promise<void> {
  if (indexLoading[lang]) return indexLoading[lang]!;
  indexLoading[lang] = fetch(BASE + lang + '/index.json')
    .then((r) => (r.ok ? r.json() : []))
    .then((keys: string[]) => { index[lang] = new Set(Array.isArray(keys) ? keys : []); notify(); })
    .catch(() => { index[lang] = new Set(); });
  return indexLoading[lang]!;
}
const hasClips = (lang: Lang) => (index[lang]?.size ?? 0) > 0;

/* ---------------- device speech ---------------- */
const synth = (): SpeechSynthesis | undefined => {
  try {
    const w = window as any;
    return w.speechSynthesis && typeof w.SpeechSynthesisUtterance === 'function' ? (w.speechSynthesis as SpeechSynthesis) : undefined;
  } catch { return undefined; }
};
let voicesCache: SpeechSynthesisVoice[] = [];
function readVoices() {
  try { voicesCache = synth()?.getVoices() ?? []; } catch { voicesCache = []; }
}
readVoices();
try {
  const s = synth();
  if (s && typeof s.addEventListener === 'function') s.addEventListener('voiceschanged', () => { readVoices(); notify(); });
  else if (s) (s as any).onvoiceschanged = () => { readVoices(); notify(); };
} catch { /* ignore */ }

function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (!voicesCache.length) readVoices();
  const norm = (v: SpeechSynthesisVoice) => (v.lang || '').toLowerCase().replace('_', '-');
  for (const p of VOICE_PREF[lang]) {
    const exact = voicesCache.filter((v) => norm(v) === p || norm(v).startsWith(p + '-'));
    const local = exact.find((v) => v.localService);
    if (local) return local;
    if (exact[0]) return exact[0];
  }
  return voicesCache.find((v) => norm(v).startsWith(lang)) ?? null;
}

/* ---------------- playback queue ---------------- */
let gen = 0;                                   // bumps on cancel; stale callbacks check it
let playing: AudioBufferSourceNode | null = null;
const debug: { clips: number; synth: number; last: string | null } | null =
  typeof window !== 'undefined' && (import.meta.env.DEV || /sfxdebug/.test(window.location.search))
    ? ((window as any).__tokiVoice = { clips: 0, synth: 0, last: null })
    : null;

function playClip(lang: Lang, key: string, my: number): Promise<boolean> {
  return loadBuffer(BASE + lang + '/' + key + '.mp3').then((buf) => new Promise<boolean>((resolve) => {
    const g = sfx.graph();
    if (!buf || !g || my !== gen) { resolve(false); return; }
    const src = g.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(g.voice);
    playing = src;
    src.onended = () => { if (playing === src) playing = null; resolve(true); };
    sfx.duckRoom(true);
    sfx.duck(buf.duration + 0.3, 0.3);
    src.start();
    if (debug) { debug.clips++; debug.last = key; }
  }));
}

function playSynth(line: Line, lang: Lang, my: number): Promise<void> {
  return new Promise((resolve) => {
    const s = synth();
    const clean = cleanForSpeech(line.text);
    if (!s || !clean || my !== gen) { resolve(); return; }
    try {
      const w = window as any;
      const u: SpeechSynthesisUtterance = new w.SpeechSynthesisUtterance(clean);
      u.lang = lang === 'ar' ? 'ar-SA' : 'en-GB';
      const v = pickVoice(lang);
      if (v) { u.voice = v; u.lang = v.lang || u.lang; }
      u.rate = 0.95;
      u.pitch = PITCH[line.who ?? 'narrator'];
      u.volume = 1;
      u.onstart = () => { sfx.duckRoom(true); sfx.duck(Math.min(20, 1 + clean.length * 0.06), 0.3); };
      u.onend = () => resolve();
      u.onerror = () => resolve();
      s.speak(u);
      if (debug) debug.synth++;
      // Some engines never fire onend; don't stall a sequence forever.
      window.setTimeout(resolve, 1500 + clean.length * 90);
    } catch { resolve(); }
  });
}

async function run(lines: Line[], lang: Lang, onDone?: () => void) {
  const my = ++gen;
  stopNow();
  await loadIndex(lang);
  for (const line of lines) {
    if (my !== gen) return;
    if (!cleanForSpeech(line.text)) continue;
    const key = clipKey(lang, voiceSlot(line.who ?? 'narrator', line.teacher), line.text);
    const ok = index[lang]?.has(key) && sfx.isRunning() ? await playClip(lang, key, my) : false;
    if (!ok) await playSynth(line, lang, my);
    if (my !== gen) return;
    await new Promise((r) => window.setTimeout(r, 180));   // a breath between speakers
  }
  if (my === gen) { sfx.duckRoom(false); onDone?.(); }
}

function stopNow() {
  if (playing) { try { playing.stop(); } catch { /* */ } playing = null; }
  try { synth()?.cancel(); } catch { /* */ }
  sfx.duckRoom(false);
}

/* ---------------- public API ---------------- */
export const voice = {
  /** Fetch the clip list for a language (cheap; call on language change). */
  prepare(lang: Lang) { void loadIndex(lang); },
  /** Something can speak this language: recorded clips or a device voice. */
  isAvailable: (lang: Lang) => hasClips(lang) || (!!synth() && !!pickVoice(lang)),
  isSupported: () => true,
  /** Default on when recorded clips exist; the player's choice wins. */
  isEnabled: (lang?: Lang) => (pref ? pref === 'on' : !!lang && hasClips(lang)),
  isActive: (lang: Lang) => voice.isEnabled(lang) && sfx.isEnabled(),
  setEnabled(on: boolean) {
    pref = on ? 'on' : 'off';
    try { window.localStorage.setItem(PREF_KEY, pref); } catch { /* */ }
    const s = synth();
    if (on && s) {
      // iOS: warm the speech engine inside the tap, for any fallback lines.
      try {
        s.cancel();
        const w = window as any;
        const warm: SpeechSynthesisUtterance = new w.SpeechSynthesisUtterance(' ');
        warm.volume = 0;
        s.speak(warm);
        readVoices();
      } catch { /* */ }
    } else voice.cancel();
    notify();
  },
  speak(text: string, lang: Lang, who: Speaker = 'narrator', teacher?: string) {
    if (!voice.isActive(lang)) return;
    void run([{ text, who, teacher }], lang);
  },
  /** onDone fires when the last line finishes (not on cancel; not when voice is off). */
  speakSequence(lines: Line[], lang: Lang, onDone?: () => void) {
    if (!voice.isActive(lang)) return;
    void run(lines, lang, onDone);
  },
  cancel() { gen++; stopNow(); },
  subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn); },
};

// Mute wins: when sound goes off, stop talking too.
sfx.subscribe((on) => { if (!on) voice.cancel(); notify(); });
