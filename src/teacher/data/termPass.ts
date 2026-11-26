/**
 * Term Pass: 12 steps, one per finished lesson (first plays and replays both
 * count). Two lanes, both free: Classroom (decor, Toki/Mariam outfits,
 * thank-you notes) and Professional (Alef resources, story chapters,
 * Try-it-Monday planner pages, community spotlights; never priced).
 * Owned by the content designer. See docs/content/TEACHER_CONTENT.md
 * "Shop and Term Pass" for the balance sheet.
 */
import type { Text } from '../../i18n/types';
import { t } from '../../i18n/types';

export interface TermPassStage {
  stage: number;
  classroom: { kind: 'item' | 'notes'; id?: string; notes?: number };
  professional: { kind: 'resource' | 'chapter' | 'planner' | 'spotlight'; id?: string; label: Text };
}

export const TERM_PASS: TermPassStage[] = [
  {
    stage: 1,
    classroom: { kind: 'item', id: 'room-plant' },
    professional: { kind: 'planner', id: 'planner-first-move', label: t('Planner: my first Monday move', 'المخطّط: أول خطوة لي يوم الاثنين') },
  },
  {
    stage: 2,
    classroom: { kind: 'notes', notes: 3 },
    professional: { kind: 'resource', id: 'teams', label: t('NCLE tool: Teams', 'أداة NCLE: الفرق') },
  },
  {
    stage: 3,
    classroom: { kind: 'item', id: 'toki-cap-teal' },
    professional: { kind: 'chapter', id: 'ch-first-year', label: t('Story: Ms. Mariam\'s first year', 'قصة: سنة الأستاذة مريم الأولى') },
  },
  {
    stage: 4,
    classroom: { kind: 'notes', notes: 4 },
    professional: { kind: 'spotlight', id: 'spot-go-further', label: t('Community: the "go further" card', 'المجتمع: بطاقة «انطلق أبعد»') },
  },
  {
    stage: 5,
    classroom: { kind: 'item', id: 'room-fraction-poster' },
    professional: { kind: 'planner', id: 'planner-one-a-week', label: t('Planner: one move a week', 'المخطّط: خطوة واحدة كل أسبوع') },
  },
  {
    stage: 6,
    classroom: { kind: 'notes', notes: 5 },
    professional: { kind: 'resource', id: 'exit-ticket', label: t('NCLE tool: Exit Ticket', 'أداة NCLE: بطاقة الخروج') },
  },
  {
    stage: 7,
    classroom: { kind: 'item', id: 'mariam-lab-coat' },
    professional: { kind: 'chapter', id: 'ch-staffroom', label: t('Story: the staff room at seven', 'قصة: غرفة المعلمين في السابعة صباحًا') },
  },
  {
    stage: 8,
    classroom: { kind: 'notes', notes: 6 },
    professional: { kind: 'spotlight', id: 'spot-boards', label: t('Community: twenty-four boards up', 'المجتمع: أربع وعشرون سبورة مرفوعة') },
  },
  {
    stage: 9,
    classroom: { kind: 'notes', notes: 6 },
    professional: { kind: 'planner', id: 'planner-review', label: t('Planner: what worked this term', 'المخطّط: ما الذي نجح هذا الفصل') },
  },
  {
    stage: 10,
    classroom: { kind: 'notes', notes: 7 },
    professional: { kind: 'resource', id: 'class-progress', label: t('NCLE tool: Class Progress', 'أداة NCLE: تقدّم الصف') },
  },
  {
    stage: 11,
    classroom: { kind: 'item', id: 'toki-grad-cap' },
    professional: { kind: 'chapter', id: 'ch-last-bell', label: t('Story: the last bell', 'قصة: الجرس الأخير') },
  },
  {
    stage: 12,
    classroom: { kind: 'notes', notes: 8 },
    professional: { kind: 'spotlight', id: 'spot-my-move', label: t('Community: share your go-to move', 'المجتمع: شارك خطوتك المفضّلة') },
  },
];

/** Bundle given with the end-of-term certificate. */
export const END_OF_TERM: { notes: number } = { notes: 15 };
