/**
 * Everything the game says aloud, as data. Screens call these builders
 * to speak; tools/audio/export-script.ts calls the same builders to
 * render the clips — one definition, so the audio always matches.
 */
import type { Text } from '../i18n/types';
import type { Speaker } from './voiceKey';
import type { LevelDefinition } from '../data/levelTypes';
import type { AcademyLevelDefinition } from '../data/academyTypes';
import type { WorldBossDefinition } from '../data/worldBossTypes';
import type { SchoolVisitDefinition } from '../data/schoolVisitTypes';
import type { ConversationDefinition } from '../data/conversationTypes';
import { RISK_META } from '../data/levelTypes';

/** mood: acting direction for recorded voices (never part of the clip key). */
export interface SpokenLine { text: Text; who: Speaker; teacher?: string; mood?: string }

const join = (a: Text, b: Text): Text => ({ en: `${a.en}. ${b.en}`, ar: `${a.ar}. ${b.ar}` });

export const lines = {
  observe: (l: { scenario: Text }): SpokenLine => ({ text: l.scenario, who: 'narrator' }),
  levelReveal: (l: LevelDefinition): SpokenLine => ({
    text: join(RISK_META[l.steps.assessRisk.correctId].label, l.reveal.whatDrifted), who: 'narrator',
  }),
  academyReveal: (l: AcademyLevelDefinition, riskLabel: Text): SpokenLine => ({ text: join(riskLabel, l.reveal.verdict), who: 'narrator' }),
  bossIntro: (b: { scenario: Text }): SpokenLine => ({ text: b.scenario, who: 'narrator' }),
  bossFinal: (b: WorldBossDefinition | { reveal: { finalWord?: Text } }): SpokenLine | null =>
    b.reveal.finalWord ? { text: b.reveal.finalWord, who: 'narrator' } : null,
  visitIntro: (v: SchoolVisitDefinition): SpokenLine => ({ text: v.scenario, who: 'narrator' }),
  visitFinal: (v: SchoolVisitDefinition): SpokenLine[] => [
    { text: v.finalResponse, who: 'narrator' },
    ...v.finalMessage.map((t) => ({ text: t, who: 'narrator' as const })),
  ],
  /** Every line a conversation can produce, in any branch. */
  conversationAll: (c: ConversationDefinition): SpokenLine[] => {
    const teacher = c.teacherName.en;
    const out: SpokenLine[] = [];
    for (const turn of c.turns) {
      out.push({ text: turn.teacherLine, who: 'teacher', teacher, mood: c.stance });
      for (const o of turn.options) {
        out.push({ text: o.label, who: 'toki', mood: 'coach' });
        out.push({ text: o.reply, who: 'teacher', teacher, mood: `${c.stance}:${o.effect}` });
      }
    }
    return out;
  },
};
