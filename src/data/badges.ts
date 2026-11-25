import { t, type Text } from '../i18n/types';

/**
 * Badge registry — the seven concept-mastery badges from the v2 spec.
 * Badges are earned by a clean first-try run (real diagnostic skill) and,
 * where a classroom has a coaching conversation, by the teacher actually
 * changing something — never by speed or accumulation. Icons are inline SVG glyph ids so
 * they render identically in every webview (emoji don't).
 */
export interface BadgeDefinition {
  id: string;
  name: Text;
  description: Text;
  /** Which SVG glyph to draw (see BadgeIcon). */
  glyph: 'magnifier' | 'cap' | 'shield' | 'dna' | 'brain' | 'sprout' | 'crown';
  color: string;
  /** How it is earned — shown when locked. */
  howToEarn: Text;
}

export const BADGES: BadgeDefinition[] = [
  {
    id: 'drift-detective',
    name: t('Drift Detective', 'محقّق الانحراف'),
    description: t('You can see past a busy, impressive surface.', 'ترى ما وراء المشهد المزدحم المبهر.'),
    glyph: 'magnifier',
    color: '#1DD6BB',
    howToEarn: t('World 1: a clean first-try run — and the teacher actually changed the lesson', 'العالم ١: جولة نظيفة من المحاولة الأولى — وغيّر المعلّم الدرس فعلًا'),
  },
  {
    id: 'coaching-specialist',
    name: t('Coaching Specialist', 'أخصّائي التدريب'),
    description: t('You choose the move that fixes the cause, not the symptom.', 'تختار الخطوة التي تعالج السبب لا العَرَض.'),
    glyph: 'cap',
    color: '#452B74',
    howToEarn: t('Worlds 2 & 4: name the cause, not the symptom, first time — and leave the teacher with one thing to do', 'العالمان ٢ و٤: سمِّ السبب لا العَرَض من المحاولة الأولى — واترك للمعلّم شيئًا واحدًا يفعله'),
  },
  {
    id: 'purpose-protector',
    name: t('Purpose Protector', 'حامي الغاية'),
    description: t('You keep practices anchored to why they exist.', 'تُبقي الممارسات مرتبطة بسبب وجودها.'),
    glyph: 'shield',
    color: '#11D471',
    howToEarn: t('World 3, or World 1’s assessment and gamification rooms: tell purpose from compliance, first time', 'العالم ٣، أو صفّا التقييم والتلعيب في العالم ١: ميّز الغاية من الامتثال، من المحاولة الأولى'),
  },
  {
    id: 'mutation-hunter',
    name: t('Mutation Hunter', 'صائد التحوّرات'),
    description: t('You can name a lethal mutation when you see one.', 'تستطيع تسمية التحوّر القاتل حين تراه.'),
    glyph: 'dna',
    color: '#E0466B',
    howToEarn: t('World 7: a diagnosis with nothing missed and nothing over-called — then said to a strong teacher', 'العالم ٧: تشخيص لا ينقصه شيء ولا يزيد — ثم قُلته لمعلّم قوي'),
  },
  {
    id: 'thinking-architect',
    name: t('Thinking Architect', 'مهندس التفكير'),
    description: t('You restore questioning as a tool for reasoning.', 'تعيد الأسئلة أداةً للتعليل.'),
    glyph: 'brain',
    color: '#FFA000',
    howToEarn: t('World 5: a clean first-try run in a questioning classroom', 'العالم ٥: جولة نظيفة من المحاولة الأولى في صف الأسئلة'),
  },
  {
    id: 'inclusive-coach',
    name: t('Inclusive Coach', 'المدرّب الشامل'),
    description: t('You make sure every learner is moved forward.', 'تضمن أن يتقدّم كل متعلّم.'),
    glyph: 'sprout',
    color: '#14E882',
    howToEarn: t('World 6: a clean first-try run in a differentiation classroom', 'العالم ٦: جولة نظيفة من المحاولة الأولى في صف التمايز'),
  },
  {
    id: 'master-dlis',
    name: t('Master DLIS', 'خبير DLIS'),
    description: t('You see the whole school — and know where one coach changes the most.', 'ترى المدرسة كلها — وتعرف أين يغيّر مدرّب واحد أكثر ما يمكن.'),
    glyph: 'crown',
    color: '#FCB644',
    howToEarn: t('The Perfect Classroom, or the whole School Visit, with a clean run', 'الصف المثالي، أو زيارة المدرسة كاملة، بجولة نظيفة'),
  },
];

export const getBadge = (id: string) => BADGES.find((b) => b.id === id);
