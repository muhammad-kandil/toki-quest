/**
 * Voice casting and clip keys — shared by the game (to find a clip) and
 * tools/audio/export-script.ts (to render it), so the two cannot drift.
 *
 * A clip is identified by language + voice slot + the exact cleaned text.
 * Change a line and its key changes: the game falls back to the device
 * voice for that line until the audio workflow renders it again.
 *
 * Voice slots are abstract ("teacher-f2"); which real voice plays each
 * slot lives in tools/audio/cast.json, per language.
 */
import type { Lang } from '../i18n/types';

export type Speaker = 'narrator' | 'teacher' | 'toki';

/** cyrb53 — small, fast, stable 53-bit string hash (same in Python). */
export function cyrb53(str: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const n = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return n.toString(36);
}

/** Markdown, emoji and layout noise read badly; strip before speaking. */
export function cleanForSpeech(text: string): string {
  return text
    .replace(/[*_~`#>]+/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, ' ')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const TEACHER_SLOTS = { f: 6, m: 6 } as const;

/** Teacher gender from the English name ("Ms. Hessa", "Mr. Khalid"). */
export function teacherGender(teacherEn: string | undefined): 'f' | 'm' {
  return /^\s*(Mr|Sheikh|Dr\.? M)\b/i.test(teacherEn ?? '') ? 'm' : 'f';
}

/** Which voice slot speaks: one per teacher, stable across the game. */
export function voiceSlot(who: Speaker, teacherEn?: string): string {
  if (who !== 'teacher') return who;
  const g = teacherGender(teacherEn);
  const n = parseInt(cyrb53((teacherEn ?? '').trim().toLowerCase()), 36) % TEACHER_SLOTS[g];
  return `teacher-${g}${n}`;
}

export function clipKey(lang: Lang, slot: string, text: string): string {
  return cyrb53(`${lang}|${slot}|${cleanForSpeech(text)}`);
}
