/**
 * Writes tools/audio/out/script.json: every clip the game can play, with
 * its key, language, voice slot and text. Run with:
 *   npx vite-node tools/audio/export-script.ts
 * The audio workflow (.github/workflows/audio.yml) renders from this.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { LEVELS, WORLD_BOSSES, ACADEMY, SCHOOL_VISITS, BOSS, ensureWorldLoaded } from '../../src/data/levels';
import { lines, type SpokenLine } from '../../src/audio/lines';
import { clipKey, cleanForSpeech, voiceSlot } from '../../src/audio/voiceKey';
import { RISK_META, type RiskLevel } from '../../src/data/levelTypes';
import { t } from '../../src/i18n/types';
import { STORIES } from '../../src/data/story';
import { storyAll } from '../../src/audio/storyLines';

const NO_DRIFT = t('No Drift', 'لا انحراف'); // must match AcademyScreen S.noDriftBadge

async function main() {
  for (let w = 2; w <= 8; w++) await ensureWorldLoaded(w);
  const spoken: { line: SpokenLine; where: string }[] = [];
  const add = (where: string, l: SpokenLine | SpokenLine[] | null) => {
    if (!l) return;
    for (const x of Array.isArray(l) ? l : [l]) spoken.push({ line: x, where });
  };
  for (const l of Object.values(LEVELS)) {
    add(`L${l.id}`, lines.observe(l));
    add(`L${l.id}`, lines.levelReveal(l));
    if (l.conversation) add(`L${l.id}`, lines.conversationAll(l.conversation));
  }
  add('B6', lines.bossIntro(BOSS));
  for (const b of Object.values(WORLD_BOSSES)) { add(`B${b.id}`, lines.bossIntro(b)); add(`B${b.id}`, lines.bossFinal(b)); }
  for (const a of Object.values(ACADEMY)) {
    add(`A${a.id}`, lines.observe(a));
    const rid = a.assessRisk.correctId as string;
    add(`A${a.id}`, lines.academyReveal(a, rid === 'none' ? NO_DRIFT : RISK_META[rid as RiskLevel].label));
    if (a.conversation) add(`A${a.id}`, lines.conversationAll(a.conversation));
  }
  for (const v of Object.values(SCHOOL_VISITS)) { add(`V${v.id}`, lines.visitIntro(v)); add(`V${v.id}`, lines.visitFinal(v)); }
  // The picture-story between worlds: narrator per shot + quotes in the speaker's voice.
  for (const s of STORIES) add(`S:${s.id}`, storyAll(s));

  const clips = new Map<string, { key: string; lang: string; slot: string; text: string; where: string[] }>();
  for (const { line, where } of spoken) {
    for (const lang of ['en', 'ar'] as const) {
      const slot = voiceSlot(line.who, line.teacher);
      const text = cleanForSpeech(line.text[lang]);
      if (!text) continue;
      const key = clipKey(lang, slot, line.text[lang]);
      const c = clips.get(key);
      if (c) { if (!c.where.includes(where)) c.where.push(where); }
      else clips.set(key, { key, lang, slot, text, where: [where] });
    }
  }
  const out = [...clips.values()];
  mkdirSync('tools/audio/out', { recursive: true });
  writeFileSync('tools/audio/out/script.json', JSON.stringify(out, null, 1));
  const by = (k: 'lang' | 'slot') => out.reduce<Record<string, number>>((m, c) => ((m[c[k]] = (m[c[k]] ?? 0) + 1), m), {});
  const chars = out.reduce<Record<string, number>>((m, c) => ((m[c.lang] = (m[c.lang] ?? 0) + c.text.length), m), {});
  console.log('clips', out.length, by('lang'), 'chars', chars);
  console.log('slots', by('slot'));
}
main();
