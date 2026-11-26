/**
 * "Every Classroom Has a Story | لكل صفّ حكاية" — the persistent classroom
 * universe (docs/product/GAME_PACKAGE.md, authoritative). Owned by the
 * content designer. Scenario content lives in ./universe/*.ts.
 *
 * Session = opening (first session) → L01 hub → after-launch draws →
 * mid-lesson draws → late-lesson draws → ending. Pools use the package's
 * exact base weights. Arc semantics (see TEACHER_CONTENT.md "Universe engine
 * contract"): `draws` counts scenarios; random events are bonus draws (at most
 * one per phase); a phase ends early on its `endsOn` reconvergence node.
 */
import type { Universe } from '../types';
import { T, NEEDS, type UArcStep, type UEnding, type UScenario } from './universe/kit';
import { LAUNCH } from './universe/launch';
import { FACILITATE } from './universe/facilitate';
import { EXTEND } from './universe/extend';
import { RANDOM } from './universe/random';

export const SCENARIOS: UScenario[] = [...LAUNCH, ...FACILITATE, ...EXTEND, ...RANDOM];

export const ARC: UArcStep[] = [
  { pool: 'after-launch', draws: 1 },
  { pool: 'mid-lesson', draws: 3, endsOn: ['F03'] },
  { pool: 'late-lesson', draws: 2, endsOn: ['E05'] },
];

export const ENDINGS: UEnding[] = [
  {
    id: 'END-B',
    priority: 1,
    when: { anyUnresolved: [...NEEDS] },
    title: T(['The Unfinished Puzzle', 'اللغز غير المكتمل']),
    narration: T(['Something is still open, and you know what it is. Your progress is kept; the next lesson starts here.', 'ما زال هناك شيء مفتوح، وأنتِ تعرفين ما هو. تقدّمكِ محفوظ، والدرس القادم يبدأ من هنا.']),
    followUp: T(['Next session opens with the unresolved need, and a Second Chance can come back for it.', 'تبدأ الجلسة القادمة بالحاجة غير المحلولة، وقد تعود «فرصة ثانية» إليها.']),
  },
  {
    id: 'END-D',
    priority: 2,
    when: { flags: ['u.evidence', 'u.usedEvidence'] },
    title: T(['Evidence to Action', 'من الدليل إلى الفعل']),
    narration: T(['You gathered evidence and it changed what you did next. That is the whole cycle, and it is the strongest ending.', 'جمعتِ الأدلة فغيّرت ما فعلتِه بعد ذلك. هذه هي الدورة كاملة، وهذه أقوى نهاية.']),
    badge: { id: 'evidence-to-action', title: T(['Evidence to Action', 'من الدليل إلى الفعل']), icon: '◆' },
  },
  {
    id: 'END-C',
    priority: 3,
    when: { anyFlags: ['u.peerVoice', 'u.quietConfidence'] },
    title: T(['An Unexpected Opportunity', 'فرصة غير متوقعة']),
    narration: T(['A student\'s voice moved someone else\'s learning today. That is worth building on.', 'صوت أحد الطلاب حرّك تعلّم زميل له اليوم. وهذا يستحق أن نبني عليه.']),
    badge: { id: 'unexpected-opportunity', title: T(['An Unexpected Opportunity', 'فرصة غير متوقعة']), icon: '◎' },
  },
  {
    id: 'END-A',
    priority: 4,
    when: {},
    title: T(['Purposeful Launch', 'افتتاح هادف']),
    narration: T(['You found where each student was starting and gave the lesson a purpose.', 'اكتشفتِ نقطة انطلاق كل طالب، ومنحتِ الدرس هدفًا.']),
    badge: { id: 'purposeful-launch', title: T(['Purposeful Launch', 'افتتاح هادف']), icon: '▲' },
  },
];

export const UNIVERSE: Universe = {
  version: '2026.11.26-1',
  opening: [
    { id: 'OPEN-01', picture: 'teacher/film/open-01.jpg', narration: T(['Morning. Ms. Mariam arrives at her Grade 7 classroom.', 'الصباح. تصل الأستاذة مريم إلى فصل الصف السابع.']) },
    { id: 'OPEN-02', picture: 'teacher/film/open-02.jpg', narration: T(['The students come in. One opens his tablet before he sits down. One flicks back through yesterday\'s pages. One looks out of the window.', 'يدخل الطلاب. أحدهم يفتح جهازه قبل أن يجلس. وأخرى تقلّب صفحات الأمس. وثالث ينظر من النافذة.']) },
    { id: 'OPEN-03', picture: 'teacher/film/open-03.jpg', who: 'ahmed', line: T(['Miss, I already know today\'s topic!', 'أستاذة، أنا أعرف درس اليوم من قبل!']) },
    { id: 'OPEN-03', picture: 'teacher/film/open-03.jpg', who: 'sara', line: T(['Miss, I still don\'t understand what we learned yesterday.', 'أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.']) },
    { id: 'OPEN-03', picture: 'teacher/film/open-03.jpg', who: 'omar', line: T(['Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟']) },
    { id: 'OPEN-04', picture: 'teacher/film/open-04.jpg', narration: T(['Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟']) },
    { id: 'OPEN-05', picture: 'teacher/film/open-05.jpg', narration: T(['Tap a student or an object in the classroom.', 'اضغطي على طالب أو على شيء في الفصل.']) },
  ],
  entry: 'L01',
  scenarios: SCENARIOS,
  pools: [
    {
      id: 'after-launch',
      entries: [
        { code: 'L02', weight: 20 }, { code: 'L03', weight: 20 }, { code: 'L04', weight: 20 }, { code: 'L05', weight: 15 },
        { code: 'F01', weight: 10 }, { code: 'R01', weight: 5 }, { code: 'R02', weight: 5 }, { code: 'R04', weight: 5 },
      ],
    },
    {
      id: 'mid-lesson',
      entries: [
        { code: 'F01', weight: 15 }, { code: 'F02', weight: 15 }, { code: 'F03', weight: 20 }, { code: 'F04', weight: 15 },
        { code: 'F05', weight: 10 }, { code: 'F06', weight: 10 }, { code: 'R01', weight: 5 }, { code: 'R02', weight: 5 }, { code: 'R04', weight: 5 },
      ],
    },
    {
      id: 'late-lesson',
      entries: [
        { code: 'E01', weight: 25 }, { code: 'E02', weight: 15 }, { code: 'E03', weight: 10 }, { code: 'E04', weight: 20 },
        { code: 'E05', weight: 15 }, { code: 'R01', weight: 5 }, { code: 'R03', weight: 5 }, { code: 'R06', weight: 5 },
      ],
    },
  ],
  arc: ARC,
  endings: ENDINGS,
  students: [
    { id: 'ahmed', name: T(['Ahmed', 'أحمد']), start: { readiness: 2, confidence: 3, participation: 3, understanding: 2 } },
    { id: 'sara', name: T(['Sara', 'سارة']), start: { readiness: 1, confidence: 1, participation: 2, understanding: 1 } },
    { id: 'omar', name: T(['Omar', 'عمر']), start: { readiness: 1, confidence: 1, participation: 0, understanding: 1 } },
  ],
};
