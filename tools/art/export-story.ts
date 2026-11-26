/** Writes tools/art/out/story.json (every shot + its prompt) for tools/art/story.py. */
import { mkdirSync, writeFileSync } from 'node:fs';
import { STORIES } from '../../src/data/story';

const shots = STORIES.flatMap((s) => s.shots.map((sh) => ({
  world: s.worldId, story: s.id, id: sh.id, prompt: sh.prompt,
  narration: sh.narration.en, quote: sh.quote ? { who: sh.quote.who, name: sh.quote.name ?? 'Toki', at: sh.quote.at ?? 'left' } : null,
})));
mkdirSync('tools/art/out', { recursive: true });
writeFileSync('tools/art/out/story.json', JSON.stringify(shots, null, 1));
console.log('shots', shots.length);
