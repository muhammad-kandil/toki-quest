import { t, type Text } from '../i18n/types';
import { BOSS_ID } from './levels';

/**
 * World structure (v2 spec): the quest is a journey across worlds, each
 * a cluster of classrooms with a world challenge at the end.
 *
 * All eight worlds are authored. World 1 holds the original five
 * classrooms and The Perfect Classroom finale; Worlds 2–6 are four
 * classrooms plus a pattern-audit boss; World 7 is the Academy (0–many
 * findings per room); the Final World is a single whole-school visit.
 * `comingSoon` is kept for future expansion worlds.
 */
export interface WorldDefinition {
  id: string;
  number: number;
  title: Text;
  theme: Text;
  coreIdea: Text;
  /** Global level ids that belong to this world, in play order. */
  levelIds: number[];
  /** Optional boss/finale level id. */
  bossId?: number;
  /** Badge awarded for the world (display only — badges are earned per level). */
  badgeId: string;
  /** Position on the map, in % of the map's width/height. */
  node: { x: number; y: number };
  /** Not yet authored — shown as locked/"coming soon". */
  comingSoon?: boolean;
}

export const WORLDS: WorldDefinition[] = [
  {
    id: 'busy-classroom',
    number: 1,
    title: t('The Busy Classroom', 'الصف المشغول'),
    theme: t('When Engagement Replaces Learning', 'عندما يحلّ التفاعل محلّ التعلّم'),
    coreIdea: t('Not everything that looks engaging leads to meaningful learning.', 'ليس كل ما يبدو مفعمًا بالتفاعل يقود إلى تعلّم ذي معنى.'),
    levelIds: [1, 2, 3, 4, 5],
    bossId: BOSS_ID,
    badgeId: 'drift-detective',
    node: { x: 18, y: 86 },
  },
  {
    id: 'assessment',
    number: 2,
    title: t('Assessment Under the Microscope', 'التقييم تحت المجهر'),
    theme: t('When Assessment Stops Informing Learning', 'عندما يتوقف التقييم عن توجيه التعلّم'),
    coreIdea: t('Assessment should shape instruction, not simply measure it.', 'ينبغي للتقييم أن يشكّل التدريس، لا أن يقيسه فحسب.'),
    levelIds: [21, 22, 23, 24],
    bossId: 25,
    badgeId: 'coaching-specialist',
    node: { x: 50, y: 74 },
  },
  {
    id: 'alef-in-action',
    number: 3,
    title: t('Alef in Action', '«ألف» في الميدان'),
    theme: t('Using Technology With Purpose', 'استخدام التقنية بغاية'),
    coreIdea: t('Technology should amplify thinking, not replace it.', 'ينبغي للتقنية أن تضخّم التفكير لا أن تحلّ محله.'),
    levelIds: [31, 32, 33, 34],
    bossId: 35,
    badgeId: 'purpose-protector',
    node: { x: 80, y: 62 },
  },
  {
    id: 'feedback',
    number: 4,
    title: t('Feedback That Moves Learning', 'تغذية راجعة تحرّك التعلّم'),
    theme: t('When Feedback Becomes Routine', 'عندما تصبح التغذية الراجعة روتينًا'),
    coreIdea: t('Feedback changes learning only when students act on it.', 'لا تغيّر التغذية الراجعة التعلّم إلا حين يعمل بها الطلاب.'),
    levelIds: [41, 42, 43, 44],
    bossId: 45,
    badgeId: 'coaching-specialist',
    node: { x: 52, y: 50 },
  },
  {
    id: 'questioning',
    number: 5,
    title: t('Questioning for Thinking', 'الأسئلة من أجل التفكير'),
    theme: t('When Questions Lose Their Power', 'عندما تفقد الأسئلة قوّتها'),
    coreIdea: t('The quality of learning depends on the quality of thinking.', 'تعتمد جودة التعلّم على جودة التفكير.'),
    levelIds: [51, 52, 53, 54],
    bossId: 55,
    badgeId: 'thinking-architect',
    node: { x: 20, y: 40 },
  },
  {
    id: 'differentiation',
    number: 6,
    title: t('Differentiation', 'التمايز'),
    theme: t('Supporting Every Learner', 'دعم كل متعلّم'),
    coreIdea: t('Different does not always mean differentiated.', 'المختلف لا يعني دائمًا المتمايز.'),
    levelIds: [61, 62, 63, 64],
    bossId: 65,
    badgeId: 'inclusive-coach',
    node: { x: 48, y: 28 },
  },
  {
    id: 'mutation-academy',
    number: 7,
    title: t('The Lethal Mutation Academy', 'أكاديمية التحوّرات القاتلة'),
    theme: t('Can You Spot the Invisible Drift?', 'هل تستطيع رصد الانحراف الخفي؟'),
    coreIdea: t('Balanced professional judgement — including knowing when nothing is wrong.', 'حكم مهني متوازن — بما في ذلك معرفة متى لا يوجد خطأ.'),
    levelIds: [71, 72, 73, 74],
    bossId: 75,
    badgeId: 'mutation-hunter',
    node: { x: 78, y: 18 },
  },
  {
    id: 'master-dlis',
    number: 8,
    title: t('The Master DLIS', 'خبير DLIS'),
    theme: t('From Observation to Coaching Judgement', 'من الملاحظة إلى الحكم التدريبي'),
    coreIdea: t('Decide which issue matters most, and where coaching has the greatest impact.', 'قرّر أي قضية هي الأهم، وأين يكون للتدريب أكبر أثر.'),
    levelIds: [],
    bossId: 85,
    badgeId: 'master-dlis',
    node: { x: 50, y: 7 },
  },
];

export const getWorld = (id: string) => WORLDS.find((w) => w.id === id);
