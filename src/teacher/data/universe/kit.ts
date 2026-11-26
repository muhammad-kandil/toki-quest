/**
 * Universe authoring kit: shared classroom, students, and the small content
 * extensions the design package needs beyond the current contract. Every
 * extended type here is a SUBTYPE of the contract type, so the assembled
 * UNIVERSE is a valid `Universe`; the engine may ignore fields it does not
 * know yet. Proposed contract additions are listed in TEACHER_CONTENT.md
 * ("Contract additions").
 */
import type {
  ClassEvent,
  Choice,
  EvidenceProfile,
  Investigation,
  Outcome,
  Scenario,
  SceneObject,
  Student,
  StudentVars,
  UniverseCondition,
  UniverseEnding,
  Universe,
} from '../../types';
import type { Text } from '../../../i18n/types';
import { T, type Pair } from '../adventures/kit';

export { T, ch, clue, fx, out } from '../adventures/kit';
export type { Pair };

/* ---------------- contract extensions (proposed) ---------------- */

/** Non-MCQ interaction that comes before the decision. */
export type Interaction = 'investigate' | 'compare' | 'match' | 'sort' | 'order' | 'hint' | 'pattern' | 'plan';

export interface Card {
  id: string;
  label: Text;
  text: Text;
}

/**
 * Data for an interaction. Correct answers are determined by the evidence on
 * the cards, never arbitrary:
 *  compare: `cards` revealed side by side (no answer).
 *  match:   `cards` (evidence) → `targets` (interpretations); `answer[card] = target`.
 *  sort:    `cards` (actions) → `targets` (purposes/bins); `answer[card] = bin`.
 *  order:   `cards` and `order` (the evidence-determined sequence).
 *  hint:    `hints`, least → most intrusive; the teacher reveals one at a time.
 *  pattern: `cards` are simulated responses on a class view; `patterns` group them.
 *  plan:    `cards` (evidence) → `targets` (plan slots); `answer[slot] = card`.
 */
export interface Task {
  cards?: Card[];
  targets?: Card[];
  answer?: Record<string, string>;
  order?: string[];
  hints?: Text[];
  patterns?: { id: string; label: Text; cards: string[] }[];
  /** Shown after the interaction: why the evidence points this way. */
  note?: Text;
}

/** A profile drawn only when a flag holds (keeps evidence coherent across scenarios). */
export interface UProfile extends EvidenceProfile {
  ifFlag?: string;
}
export interface UInvestigation extends Investigation {
  profiles: UProfile[];
}
export interface UChoice extends Choice {
  /** Offered only while this need is unresolved (R06 Second Chance). */
  ifUnresolved?: string;
}
export interface UEvent extends ClassEvent {
  interaction?: Interaction;
  task?: Task;
  investigate?: UInvestigation;
  choices: UChoice[];
}
export interface UOutcome extends Outcome {
  /** Choice-dependent need changes and persistent student changes. */
  opensNeeds?: string[];
  closesNeeds?: string[];
  studentDelta?: { id: string; key: keyof StudentVars; delta: number }[];
  /** Play this scenario next (not a draw), e.g. F01 → R05 Quiet Confidence. */
  triggers?: string;
}
export interface UScenario extends Omit<Scenario, 'events' | 'outcomes' | 'requires'> {
  requires?: UCondition;
  events: UEvent[];
  outcomes: UOutcome[];
  /** R04 Time Squeeze: change the remaining draws of this phase. */
  budgetDelta?: number;
}
export interface UCondition extends UniverseCondition {
  /** At least one of these needs is open. */
  anyUnresolved?: string[];
}
export interface UEnding extends Omit<UniverseEnding, 'when'> {
  when: UCondition;
}
export interface UArcStep {
  pool: Universe['arc'][number]['pool'];
  /** Maximum scenario draws; random events are bonus draws (max one per phase). */
  draws: number;
  /** The phase ends early once one of these is played (reconvergence). */
  endsOn?: string[];
}

/* ---------------- the one classroom ---------------- */

export const SCENE = 'teacher/scenes/classroom.jpg';
export const NEEDS = ['ahmed-evidence', 'sara-gap', 'omar-voice', 'class-mis'] as const;

const homeAhmed = T(['His older brother is in Grade 9 and often shows him next year\'s maths at home.', 'أخوه الأكبر في الصف التاسع، وكثيرًا ما يريه رياضيات السنوات القادمة في البيت.']);
const homeSara = T(['She looks after her younger brothers after school most days, so homework is done late.', 'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.']);
const homeOmar = T(['His dad works night shifts, so mornings at home are rushed.', 'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.']);

export const STUDENTS: Student[] = [
  { id: 'ahmed', name: T(['Ahmed', 'أحمد']), x: 64, y: 50, understanding: 2, engagement: 2, idle: T(['Ahmed has already opened today\'s lesson.', 'فتح أحمد درس اليوم بالفعل.']), homeNote: homeAhmed },
  { id: 'sara', name: T(['Sara', 'سارة']), x: 34, y: 58, understanding: 1, engagement: 2, idle: T(['Sara is flicking back through yesterday\'s pages.', 'سارة تقلّب صفحات درس الأمس.']), homeNote: homeSara },
  { id: 'omar', name: T(['Omar', 'عمر']), x: 18, y: 44, understanding: 1, engagement: 1, idle: T(['Omar is sitting quietly by the window.', 'عمر جالس بهدوء قرب النافذة.']), homeNote: homeOmar },
];

export const OBJECTS: SceneObject[] = [
  { id: 'board', label: T(['Interactive board', 'السبورة التفاعلية']), icon: '▭', x: 50, y: 16, idle: T(['Today: unit rates. "Find the better deal."', 'اليوم: معدّل الوحدة. «جِد العرض الأوفر.»']) },
  { id: 'laptop', label: T(['Alef laptop', 'حاسوب «ألف»']), icon: '▣', x: 82, y: 64, idle: T(['Your lesson plan for today is open.', 'خطة درس اليوم مفتوحة.']) },
  { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['Old textbooks, a globe, and something tucked behind the atlas.', 'كتب قديمة، وكرة أرضية، وشيء مخبّأ خلف الأطلس.']) },
];

export const card = (id: string, label: Pair, text: Pair): Card => ({ id, label: T(label), text: T(text) });

/** Outcome with the universe extensions (needs, student deltas, triggers). */
export const uout = (
  id: string,
  tone: UOutcome['tone'],
  title: Pair,
  body: Pair,
  effects: UOutcome['effects'] = [],
  extra: Partial<UOutcome> = {},
): UOutcome => ({ id, tone, title: T(title), body: T(body), effects, ...extra });

/** Choice with the universe extensions (ifUnresolved). One narrative minute by default. */
export const uch = (label: Pair, sub: Pair, outcome: UChoice['outcome'], extra: Partial<UChoice> = {}): UChoice => ({
  label: T(label),
  sub: T(sub),
  minutes: 1,
  outcome,
  ...extra,
});

export const uprofile = (id: string, weight: number, setFlag: string, clues: Record<string, Pair>, ifFlag?: string): UProfile => ({
  id,
  weight,
  setFlag,
  ...(ifFlag ? { ifFlag } : {}),
  clues: Object.fromEntries(Object.entries(clues).map(([k, v]) => [k, T(v)])),
});

const META: Record<Scenario['phase'], Pair> = {
  launch: ['Launch · Grade 7 · Math', 'الافتتاح · الصف السابع · الرياضيات'],
  facilitate: ['Facilitate & Synthesise · Grade 7 · Math', 'التيسير والتوليف · الصف السابع · الرياضيات'],
  extend: ['Extend & Assess · Grade 7 · Math', 'الإثراء والتقييم · الصف السابع · الرياضيات'],
};

/** Scenario with the shared classroom filled in. */
export const scenario = (
  s: Omit<UScenario, 'id' | 'meta' | 'location' | 'scene' | 'students' | 'objects' | 'intro'> &
    Partial<Pick<UScenario, 'students' | 'objects' | 'intro' | 'scene'>>,
): UScenario => ({
  id: s.code,
  meta: T(META[s.phase]),
  location: 'grade7',
  scene: SCENE,
  students: STUDENTS,
  objects: OBJECTS,
  intro: [],
  timed: false,
  ...s,
});
