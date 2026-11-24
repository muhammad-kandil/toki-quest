import { t, type Text } from '../i18n/types';

/**
 * Badge registry — the seven concept-mastery badges from the v2 spec.
 * Badges are earned by a clean first-try run (real diagnostic skill),
 * never by speed or accumulation. Icons are inline SVG glyph ids so
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
    description: t('You can see past a busy, impressive surface.', 'ترى ما وراء السطح المشغول المبهر.'),
    glyph: 'magnifier',
    color: '#1DD6BB',
    howToEarn: t('Clean first-try run in an engagement classroom', 'جولة نظيفة من المحاولة الأولى في صف المشاركة'),
  },
  {
    id: 'coaching-specialist',
    name: t('Coaching Specialist', 'أخصّائي التدريب'),
    description: t('You choose the move that fixes the cause, not the symptom.', 'تختار الخطوة التي تعالج السبب لا العَرَض.'),
    glyph: 'cap',
    color: '#452B74',
    howToEarn: t('Clean first-try run in The Output Illusion', 'جولة نظيفة من المحاولة الأولى في وهم الإنتاج'),
  },
  {
    id: 'purpose-protector',
    name: t('Purpose Protector', 'حامي الغاية'),
    description: t('You keep practices anchored to why they exist.', 'تُبقي الممارسات مرتبطة بسبب وجودها.'),
    glyph: 'shield',
    color: '#11D471',
    howToEarn: t('Clean first-try run in an assessment or gamification classroom', 'جولة نظيفة من المحاولة الأولى في صف التقييم أو التلعيب'),
  },
  {
    id: 'mutation-hunter',
    name: t('Mutation Hunter', 'صائد التحوّرات'),
    description: t('You can name a lethal mutation when you see one.', 'تستطيع تسمية التحوّر القاتل حين تراه.'),
    glyph: 'dna',
    color: '#E0466B',
    howToEarn: t('Clean first-try run on a Lethal Mutation classroom', 'جولة نظيفة من المحاولة الأولى في صف تحوّر قاتل'),
  },
  {
    id: 'thinking-architect',
    name: t('Thinking Architect', 'مهندس التفكير'),
    description: t('You restore questioning as a tool for reasoning.', 'تعيد الأسئلة أداةً للتعليل.'),
    glyph: 'brain',
    color: '#FFA000',
    howToEarn: t('Coming with World 5 — Questioning for Thinking', 'قادم مع العالم ٥ — الأسئلة من أجل التفكير'),
  },
  {
    id: 'inclusive-coach',
    name: t('Inclusive Coach', 'المدرّب الشامل'),
    description: t('You make sure every learner is moved forward.', 'تضمن أن يتقدّم كل متعلّم.'),
    glyph: 'sprout',
    color: '#14E882',
    howToEarn: t('Coming with World 6 — Differentiation', 'قادم مع العالم ٦ — التمايز'),
  },
  {
    id: 'master-dlis',
    name: t('Master DLIS', 'خبير DLIS'),
    description: t('You found the drift hiding inside something perfect.', 'وجدت الانحراف المختبئ داخل ما يبدو مثاليًا.'),
    glyph: 'crown',
    color: '#FCB644',
    howToEarn: t('Complete The Perfect Classroom with a clean run', 'أكمل الصف المثالي بجولة نظيفة'),
  },
];

export const getBadge = (id: string) => BADGES.find((b) => b.id === id);
