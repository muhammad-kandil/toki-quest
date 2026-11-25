/**
 * Read aloud — opt-in voice-over using the browser's own speech
 * synthesis. No audio files, no network: the device's voices read the
 * scenario, the teacher, Toki and the reveal in whichever language the
 * player chose.
 *
 * Rules:
 *  - Off by default (localStorage `toki:voice`); the global mute wins.
 *  - Hidden entirely when the platform has no speech engine or no voice
 *    for the current language — the toggle never promises what it
 *    can't deliver.
 *  - One voice at a time: every new line cancels whatever is speaking,
 *    except explicit sequences (the Final World's closing lines).
 *  - Choices are never read automatically; the player is reading them.
 */
import { sfx } from './sfx';
import type { Lang } from '../i18n/types';

export type Speaker = 'narrator' | 'teacher' | 'toki';

const PREF_KEY = 'toki:voice';
const VOICE_PREF: Record<Lang, string[]> = {
  ar: ['ar-sa', 'ar-ae', 'ar-eg', 'ar'],
  en: ['en-gb', 'en-us', 'en'],
};
const RATE = 0.95;
const PITCH: Record<Speaker, number> = { narrator: 1.0, teacher: 1.0, toki: 1.12 };

type Synth = SpeechSynthesis | undefined;
const synth = (): Synth => {
  try {
    const w = window as any;
    return w.speechSynthesis && typeof w.SpeechSynthesisUtterance === 'function' ? (w.speechSynthesis as SpeechSynthesis) : undefined;
  } catch {
    return undefined;
  }
};

let enabled = false;
try {
  enabled = window.localStorage.getItem(PREF_KEY) === 'on';
} catch {
  /* private mode etc. */
}

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

// Voices can arrive late (Chrome, iOS after first gesture). Re-read on change.
let voicesCache: SpeechSynthesisVoice[] = [];
function readVoices() {
  const s = synth();
  if (!s) return;
  try {
    voicesCache = s.getVoices() ?? [];
  } catch {
    voicesCache = [];
  }
}
readVoices();
try {
  const s = synth();
  if (s && typeof s.addEventListener === 'function') s.addEventListener('voiceschanged', () => { readVoices(); notify(); });
  else if (s) (s as any).onvoiceschanged = () => { readVoices(); notify(); };
} catch {
  /* ignore */
}

/** Best local voice for a language, or null when the device has none. */
function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (!voicesCache.length) readVoices();
  const prefs = VOICE_PREF[lang];
  const norm = (v: SpeechSynthesisVoice) => (v.lang || '').toLowerCase().replace('_', '-');
  for (const p of prefs) {
    const exact = voicesCache.filter((v) => norm(v) === p || norm(v).startsWith(p + '-'));
    const local = exact.find((v) => v.localService);
    if (local) return local;
    if (exact[0]) return exact[0];
  }
  const any = voicesCache.find((v) => norm(v).startsWith(lang));
  return any ?? null;
}

/** Markdown, emoji and layout noise read badly; strip before speaking. */
export function cleanForSpeech(text: string): string {
  return text
    .replace(/[*_~`#>]+/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}️‍]/gu, ' ')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function duckFor(text: string) {
  // Rough reading time: ~60 ms per character, capped. The bed fades back on its own.
  sfx.duck(Math.min(20, 1 + text.length * 0.06), 0.3);
}

function makeUtterance(text: string, lang: Lang, who: Speaker): SpeechSynthesisUtterance | null {
  const w = window as any;
  const clean = cleanForSpeech(text);
  if (!clean) return null;
  const u: SpeechSynthesisUtterance = new w.SpeechSynthesisUtterance(clean);
  u.lang = lang === 'ar' ? 'ar-SA' : 'en-GB';
  const v = pickVoice(lang);
  if (v) { u.voice = v; u.lang = v.lang || u.lang; }
  u.rate = RATE;
  u.pitch = PITCH[who];
  u.volume = 1;
  u.onstart = () => duckFor(clean);
  return u;
}

export const voice = {
  /** The platform can speak at all. */
  isSupported: () => !!synth(),
  /** A voice exists for this language (false until voices have loaded). */
  isAvailable: (lang: Lang) => !!synth() && !!pickVoice(lang),
  isEnabled: () => enabled,
  /** Effective: preference on, platform supported, and not globally muted. */
  isActive: () => enabled && !!synth() && sfx.isEnabled(),

  setEnabled(on: boolean) {
    enabled = on;
    try {
      window.localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    const s = synth();
    if (on && s) {
      // iOS needs a user gesture before the first utterance: warm the
      // engine now, inside the tap, with a silent utterance.
      try {
        s.cancel();
        const w = window as any;
        const warm: SpeechSynthesisUtterance = new w.SpeechSynthesisUtterance(' ');
        warm.volume = 0;
        s.speak(warm);
        readVoices();
      } catch {
        /* ignore */
      }
    } else {
      voice.cancel();
    }
    notify();
  },

  /** Speak one line, cancelling anything already speaking. */
  speak(text: string, lang: Lang, who: Speaker = 'narrator') {
    if (!voice.isActive()) return;
    const s = synth();
    if (!s) return;
    try {
      s.cancel();
      const u = makeUtterance(text, lang, who);
      if (u) s.speak(u);
    } catch {
      /* never let voice break the game */
    }
  },

  /** Speak several lines back to back (one cancel, then a queue — no overlap). */
  speakSequence(lines: { text: string; who?: Speaker }[], lang: Lang) {
    if (!voice.isActive()) return;
    const s = synth();
    if (!s) return;
    try {
      s.cancel();
      for (const line of lines) {
        const u = makeUtterance(line.text, lang, line.who ?? 'narrator');
        if (u) s.speak(u);
      }
    } catch {
      /* ignore */
    }
  },

  cancel() {
    const s = synth();
    if (!s) return;
    try {
      s.cancel();
    } catch {
      /* ignore */
    }
  },

  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

// Mute wins: when sound goes off, stop talking too.
sfx.subscribe((on) => { if (!on) voice.cancel(); notify(); });
