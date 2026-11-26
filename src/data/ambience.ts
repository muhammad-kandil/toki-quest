/**
 * Which room each scene sounds like. Beds are real recordings
 * (public/audio/amb/<bed>.mp3, see credits.json there); this file only
 * says which plays where — content, not code.
 *
 *   lesson         while Toki observes and decides: the class at work
 *   conversation   after the lesson, with the teacher: the students have
 *                  gone (or it happens in a corridor / office)
 */
export type Bed = 'class-lively' | 'class-working' | 'class-quiet' | 'corridor' | 'playground' | 'staffroom';

interface RoomSound { lesson: Bed; conversation?: Bed }

const L = (lesson: Bed, conversation: Bed = 'class-quiet'): RoomSound => ({ lesson, conversation });

export const ROOM_SOUND: Record<number, RoomSound> = {
  // World 1
  1: L('class-lively', 'class-working'),   // "the room is still humming"
  2: L('class-lively'), 3: L('class-working'), 4: L('class-quiet'), 5: L('class-lively', 'class-working'),
  6: L('class-working'),                    // The Perfect Classroom
  // World 2 — assessment
  21: L('class-working'), 22: L('class-working'), 23: L('class-working'), 24: L('class-quiet', 'corridor'),
  // World 3 — Alef in action
  31: L('class-quiet'), 32: L('class-quiet'), 33: L('class-working'), 34: L('class-quiet', 'staffroom'),
  // World 4 — feedback
  41: L('class-lively'), 42: L('class-quiet'), 43: L('class-working'), 44: L('class-working'),
  // World 5 — questioning
  51: L('class-working'), 52: L('class-lively', 'corridor'), 53: L('class-lively'), 54: L('class-working', 'corridor'),
  // World 6 — differentiation
  61: L('class-working'), 62: L('class-working'), 63: L('class-working'), 64: L('class-working'),
  // World 7 — the Academy
  71: L('class-lively'), 72: L('class-quiet'), 73: L('class-lively'), 74: L('class-working'),
};

/** World challenges walk across a school: corridors between scenes. */
export const BOSS_SOUND: Bed = 'corridor';

/** The Final World's six contexts. */
export const VISIT_SOUND: Record<string, Bed> = {
  math: 'class-working', science: 'class-working', english: 'class-working', arabic: 'class-working',
  kg: 'class-lively', leadership: 'staffroom',
};

export function roomSound(levelId: number): RoomSound {
  return ROOM_SOUND[levelId] ?? { lesson: 'class-working', conversation: 'class-quiet' };
}
