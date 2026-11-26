/**
 * NCLE (New Core Learning Experience) tools, as named in Alef's proposal and
 * design package (docs/product/GAME_PACKAGE.md, "Product boundary"). Owned by
 * the content designer. TOOL_STATUS (end of file) records which capabilities
 * are publicly verified and which need Alef's internal validation.
 *
 * Every `what` line says only what the proposal states about the tool: the
 * classroom need it answers in the missions. No screens, buttons or
 * workflows are described. All entries stay `placeholder: true` until
 * Alef's product specialists verify them (TEACHER_CONTENT.md, "To verify").
 * Stage mapping is the content designer's proposal and is also to verify.
 * "Try it Monday" lines are teaching moves, not product instructions.
 */
import type { AlefResource } from '../types';
import { t } from '../../i18n/types';

export const RESOURCES: AlefResource[] = [
  /* ---------------- Launch ---------------- */
  {
    id: 'present-mode',
    stage: 'launch',
    icon: '▭',
    title: t('Present Mode', 'وضع العرض'),
    what: t(
      'Used at the board to share the lesson\'s learning intention with the whole class, or to open a prior-knowledge discussion.',
      'يُستخدم على السبورة لعرض هدف التعلّم للصف كله، أو لبدء نقاش حول المعرفة السابقة.',
    ),
    monday: t(
      'Try it Monday: show today\'s learning intention before the first task, then ask one student to say it in their own words.',
      'جرّبه يوم الاثنين: اعرض هدف التعلّم قبل المهمة الأولى، ثم اطلب من طالب أن يقوله بكلماته.',
    ),
    placeholder: true,
  },
  {
    id: 'gamification',
    stage: 'launch',
    icon: '▶',
    title: t('Gamification', 'التلعيب'),
    what: t(
      'Gamified assessment and game elements in a lesson. In the game it is used on purpose: to pull students into the learning question, not as a reward.',
      'تقييم بطابع اللعب وعناصر لعب داخل الدرس. وفي اللعبة يُستخدم عن قصد: لجذب الطلاب إلى سؤال التعلّم، لا كمكافأة.',
    ),
    monday: t(
      'Try it Monday: after any game, stop on one answer and ask "Why is that right?"',
      'جرّبه يوم الاثنين: بعد أي لعبة، توقّف عند إجابة واحدة واسأل «لماذا هي صحيحة؟»',
    ),
    placeholder: true,
  },

  /* ---------------- Facilitate & Synthesise ---------------- */
  {
    id: 'need-help',
    stage: 'facilitate',
    icon: '⊕',
    title: t('Need Help', 'أحتاج مساعدة'),
    what: t(
      'Support for a student who needs guidance on the task in front of them.',
      'دعم للطالب الذي يحتاج إلى توجيه في المهمة التي أمامه.',
    ),
    monday: t(
      'Try it Monday: when a student is stuck on what a task asks, give task guidance first, before re-explaining the whole idea.',
      'جرّبه يوم الاثنين: حين يتعثّر طالب في فهم المطلوب، وجّهه في المهمة أولًا قبل أن تعيد شرح الفكرة كلها.',
    ),
    placeholder: true,
  },
  {
    id: 'see-why',
    stage: 'facilitate',
    icon: '?',
    title: t('See Why', 'اعرف السبب'),
    what: t(
      'For questioning the reasoning behind an answer, so a hidden or repeated misconception comes to the surface.',
      'لمساءلة التفكير وراء الإجابة، فيظهر الفهم الخاطئ الخفي أو المتكرّر.',
    ),
    monday: t(
      'Try it Monday: before you correct a wrong answer, ask "How did you get that?" and listen to the end.',
      'جرّبه يوم الاثنين: قبل أن تصحّح إجابة خاطئة، اسأل «كيف وصلت إلى هذا؟» واستمع حتى النهاية.',
    ),
    placeholder: true,
  },
  {
    id: 'ai-helper',
    stage: 'facilitate',
    icon: '✦',
    title: t('AI Helper', 'المساعد الذكي'),
    what: t(
      'Another source of task guidance for a student who needs it.',
      'مصدر آخر للتوجيه في المهمة للطالب الذي يحتاجه.',
    ),
    monday: t(
      'Try it Monday: after a student gets help from any source, ask them to tell you in one sentence what they now understand.',
      'جرّبه يوم الاثنين: بعد أن يحصل الطالب على مساعدة من أي مصدر، اطلب منه أن يخبرك في جملة واحدة بما فهمه الآن.',
    ),
    placeholder: true,
  },
  {
    id: 'practice',
    stage: 'facilitate',
    icon: '↻',
    title: t('Practice', 'التدريب'),
    what: t(
      'Reinforcement for a student who understands but is not yet secure.',
      'تعزيز للطالب الذي فهم الفكرة لكنه لم يتمكّن منها بعد.',
    ),
    monday: t(
      'Try it Monday: give a short practice set to the students who are nearly there, before the new topic starts.',
      'جرّبه يوم الاثنين: أعطِ مجموعة تدريب قصيرة للطلاب الذين اقتربوا، قبل أن يبدأ الموضوع الجديد.',
    ),
    placeholder: true,
  },
  {
    id: 'teams',
    stage: 'facilitate',
    icon: '◎',
    title: t('Teams', 'الفرق'),
    what: t(
      'Collaboration: students work together, so a peer\'s question or explanation becomes part of the learning.',
      'التعاون: يعمل الطلاب معًا، فيصبح سؤال الزميل أو شرحه جزءًا من التعلّم.',
    ),
    monday: t(
      'Try it Monday: when one student asks another for help, make it a pair on purpose, with a job for each.',
      'جرّبه يوم الاثنين: حين يطلب طالب المساعدة من زميله، اجعلهما ثنائيًا عن قصد، ولكلٍّ منهما مهمة.',
    ),
    placeholder: true,
  },

  /* ---------------- Extend & Assess ---------------- */
  {
    id: 'assign',
    stage: 'extend',
    icon: '↗',
    title: t('Assign', 'التكليف'),
    what: t(
      'Giving a student work matched to where they are, for example more challenging work for a student who is ready.',
      'تكليف الطالب بعمل يناسب موقعه، كعمل أكثر تحديًا لطالب مستعد.',
    ),
    monday: t(
      'Try it Monday: keep one extension task ready, and give it as soon as a student shows you they are ready.',
      'جرّبه يوم الاثنين: جهّز مهمة إثرائية واحدة، وكلّف بها الطالب ما إن يُظهر لك أنه مستعد.',
    ),
    placeholder: true,
  },
  {
    id: 'class-progress',
    stage: 'extend',
    icon: '▦',
    title: t('Class Progress', 'تقدّم الصف'),
    what: t(
      'Live classroom analytics: a view of how the class is progressing, used in the game to decide what to do next.',
      'تحليلات صفّية مباشرة: عرض لتقدّم الصف، يُستخدم في اللعبة لتقرير الخطوة التالية.',
    ),
    monday: t(
      'Try it Monday: before the lesson, choose the three students you will check on first, and why.',
      'جرّبه يوم الاثنين: قبل الدرس، اختر الطلاب الثلاثة الذين ستتابعهم أولًا، ولماذا.',
    ),
    placeholder: true,
  },
  {
    id: 'exit-ticket',
    stage: 'extend',
    icon: '⇥',
    title: t('Exit Ticket', 'بطاقة الخروج'),
    what: t(
      'A short check at the end of a lesson, used in the missions to see what students actually learned.',
      'تحقّق قصير في نهاية الدرس، يُستخدم في المهمات لمعرفة ما تعلّمه الطلاب فعلًا.',
    ),
    monday: t(
      'Try it Monday: end five minutes early with one question every student answers alone, then sort the answers into three piles.',
      'جرّبها يوم الاثنين: أنهِ الدرس قبل موعده بخمس دقائق بسؤال يجيب عنه كل طالب وحده، ثم صنّف الإجابات في ثلاث مجموعات.',
    ),
    placeholder: true,
  },
  {
    id: 'show-my-learning',
    stage: 'extend',
    icon: '✎',
    title: t('Show My Learning', 'أظهر تعلّمي'),
    what: t(
      'A way for students to show what they have learned. Named in the proposal for a later mission.',
      'طريقة يُظهر بها الطلاب ما تعلّموه. ورد اسمها في المقترح لمهمة لاحقة.',
    ),
    monday: t(
      'Try it Monday: at the end of a unit, ask each student to show one thing they can do now that they couldn\'t before.',
      'جرّبه يوم الاثنين: في نهاية الوحدة، اطلب من كل طالب أن يُظهر شيئًا واحدًا يستطيعه الآن ولم يكن يستطيعه من قبل.',
    ),
    placeholder: true,
  },
  {
    id: 'exam-prep',
    stage: 'extend',
    icon: '☰',
    title: t('Exam Prep Assessment', 'تقييم الاستعداد للاختبار'),
    what: t(
      'An assessment for preparing students for an exam. Named in the proposal for a later mission.',
      'تقييم لإعداد الطلاب للاختبار. ورد اسمه في المقترح لمهمة لاحقة.',
    ),
    monday: t(
      'Try it Monday: before revision, list the three questions your class found hardest, and start there.',
      'جرّبه يوم الاثنين: قبل المراجعة، اكتب الأسئلة الثلاثة الأصعب على صفّك، وابدأ بها.',
    ),
    placeholder: true,
  },
  {
    id: 'pathways',
    stage: 'extend',
    icon: '⤳',
    title: t('Pathways', 'المسارات'),
    what: t(
      'Different routes through learning for different students. Named in the proposal for a later mission.',
      'مسارات تعلّم مختلفة لطلاب مختلفين. ورد اسمها في المقترح لمهمة لاحقة.',
    ),
    monday: t(
      'Try it Monday: name one student who needs a different route through this unit, and write down the first step of it.',
      'جرّبه يوم الاثنين: سمِّ طالبًا يحتاج إلى مسار مختلف في هذه الوحدة، واكتب الخطوة الأولى فيه.',
    ),
    placeholder: true,
  },
];

/**
 * Evidence status per tool (GAME_PACKAGE.md "Product boundary").
 * 'verified-public': the capability is publicly documented by Alef (the game
 * may name the capability; the exact label/UI may still need validation).
 * 'needs-internal-validation': name and behaviour need Alef SMEs before any
 * teacher-facing release. Never describe screens either way.
 */
export const TOOL_STATUS: Record<string, { status: 'verified-public' | 'needs-internal-validation'; publicCapability?: string }> = {
  'present-mode': { status: 'verified-public', publicCapability: 'Present Mode' },
  assign: { status: 'verified-public', publicCapability: 'flexible assignment (the "Assign" label/UI needs validation)' },
  'class-progress': { status: 'verified-public', publicCapability: 'live classroom analytics (the "Class Progress" label needs validation)' },
  gamification: { status: 'verified-public', publicCapability: 'gamified assessments' },
  pathways: { status: 'verified-public', publicCapability: 'Alef Pathways' },
  teams: { status: 'needs-internal-validation' },
  'exit-ticket': { status: 'needs-internal-validation' },
  'show-my-learning': { status: 'needs-internal-validation' },
  'exam-prep': { status: 'needs-internal-validation' },
  'ai-helper': { status: 'needs-internal-validation' },
  'need-help': { status: 'needs-internal-validation' },
  'see-why': { status: 'needs-internal-validation' },
  practice: { status: 'needs-internal-validation' },
};
