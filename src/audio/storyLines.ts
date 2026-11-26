/**
 * What the picture-story says aloud: the narrator per shot, and each
 * quote in the speaker's own voice. StoryScreen speaks through these and
 * tools/audio/export-script.ts renders them — one definition.
 */
import type { SpokenLine } from './lines';
import type { Story, StoryShot } from '../data/story';

/** mood: acting direction for recorded voices (never part of the clip key). */
export type StoryLine = SpokenLine & { mood?: string };

const MOOD: Record<string, string> = { toki: 'coach', mentor: 'eager', teacher: 'proud', student: 'eager', leader: 'tired' };

export function shotLines(shot: StoryShot): { narration: StoryLine; quote: StoryLine | null } {
  const q = shot.quote;
  return {
    narration: { text: shot.narration, who: 'narrator', mood: 'story' },
    quote: q
      ? q.who === 'toki'
        ? { text: q.text, who: 'toki', mood: MOOD.toki }
        : { text: q.text, who: 'teacher', teacher: q.name, mood: MOOD[q.who] }
      : null,
  };
}

export function storyAll(story: Story): StoryLine[] {
  const out: StoryLine[] = [];
  for (const s of story.shots) {
    const { narration, quote } = shotLines(s);
    out.push(narration);
    if (quote) out.push(quote);
  }
  return out;
}
