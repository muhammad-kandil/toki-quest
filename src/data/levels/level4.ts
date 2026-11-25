import sceneImg from '../../assets/scenes/classroom-4-assessment.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';
import { CONVO_4 } from './conversations1';

export const LEVEL_4: LevelDefinition = {
  id: 4,
  title: t('The Assessment Trap', 'فخّ التقييم'),
  theme: t('Scores ≠ Learning', 'الدرجات ≠ التعلّم'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki visits a highly organized classroom. Students take quizzes and assessments regularly, results are recorded every week, and the gradebook is meticulous. The teacher collects more data than almost anyone in the school. Everything is measured.',
    'يزور توكي صفًا شديد التنظيم. يخضع الطلاب لاختبارات قصيرة وتقييمات بانتظام، وتُسجَّل النتائج أسبوعيًا، وسجلّ الدرجات دقيق للغاية. المعلّم يجمع بيانات أكثر من أي شخص تقريبًا في المدرسة. كل شيء مُقاس.',
  ),
  evidence: [
    {
      id: 'gradebook',
      x: 25, y: 35,
      label: t('The gradebook', 'سجلّ الدرجات'),
      clue: t('Twelve weeks of scores, colour-coded. Week 3 and week 11 show the same students at the bottom.', 'اثنا عشر أسبوعًا من الدرجات بألوان مرمّزة. الأسبوع ٣ والأسبوع ١١ يُظهران الطلاب أنفسهم في الأسفل.'),
    },
    {
      id: 'planner',
      x: 55, y: 60,
      label: t('Lesson planner', 'مخطّط الدروس'),
      clue: t('Next week’s plan was written in September. It hasn’t changed.', 'خطة الأسبوع القادم كُتبت في سبتمبر. لم تتغيّر.'),
    },
    {
      id: 'students',
      x: 80, y: 70,
      label: t('After the quiz', 'بعد الاختبار'),
      clue: t('Papers returned with a number. Students glance, fold, move on. No reteach, no regrouping.', 'تُعاد الأوراق برقم فقط. يلقي الطلاب نظرة، يطوونها، ويمضون. لا إعادة تدريس، ولا إعادة تجميع.'),
    },
  ],

  steps: {
    identifyDrift: {
      prompt: t('Toki reviews the weeks of data. What has been lost?', 'يراجع توكي بيانات أسابيع. ما الذي فُقد؟'),
      options: [
        { id: 'data', label: t('Data collection', 'جمع البيانات') },
        { id: 'motivation', label: t('Student motivation', 'دافعية الطلاب') },
        { id: 'response', label: t('Instructional response to the data', 'الاستجابة التدريسية للبيانات') },
        { id: 'frequency', label: t('Assessment frequency', 'تكرار التقييم') },
      ],
      correctId: 'response',
      hint: t('Look at the planner, then at the gradebook. Twelve weeks of numbers went in — what came out?', 'انظر إلى مخطّط الدروس ثم إلى سجلّ الدرجات. دخل اثنا عشر أسبوعًا من الأرقام — ماذا خرج؟'),
      hintSpotId: 'planner',
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('Week 3 and week 11 show the same names at the bottom. If a practice ran for twelve weeks and changed nothing for them, what is it still for?', 'يُظهر الأسبوعان ٣ و١١ الأسماء نفسها في الأسفل. لو استمرت ممارسة اثني عشر أسبوعًا ولم تغيّر شيئًا لهم، فما الذي ما زالت تخدمه؟'),
      hintSpotId: 'gradebook',
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'more-quizzes', label: t('Replace the weekly quizzes with one richer diagnostic per unit', 'استبدل الاختبارات الأسبوعية باختبار تشخيصي أغنى لكل وحدة') },
        { id: 'use-evidence', label: t('Use the evidence to reteach, regroup, intervene, and adjust', 'استخدم الأدلة لإعادة التدريس وإعادة التجميع والتدخّل والتعديل') },
        { id: 'automate', label: t('Build a dashboard so the data is easier to see at a glance', 'ابنِ لوحة بيانات لتسهيل رؤية البيانات بنظرة واحدة') },
        { id: 'share-scores', label: t('Have students track their own scores and set targets', 'اجعل الطلاب يتابعون درجاتهم ويضعون أهدافًا') },
      ],
      correctId: 'use-evidence',
      hint: t('Watch the students after the quiz again. Which move changes what happens in that moment — not what happens before it?', 'راقب الطلاب بعد الاختبار مرة أخرى. أي خطوة تغيّر ما يحدث في تلك اللحظة — لا ما يحدث قبلها؟'),
      hintSpotId: 'students',
    },
    reasoning: {
      prompt: t('Why is acting on the evidence the key move?', 'لماذا العمل بالأدلة هو الخطوة الأساسية؟'),
      options: [
        { id: 'r1', label: t('It gives the teacher a more accurate picture of each student', 'يمنح المعلّم صورة أدق عن كل طالب') },
        { id: 'r2', label: t('Assessment only improves learning when it changes instruction — data that never alters teaching is measurement, not feedback', 'لا يحسّن التقييم التعلّم إلا عندما يغيّر التدريس — والبيانات التي لا تغيّر التدريس أبدًا قياسٌ لا تغذية راجعة') },
        { id: 'r3', label: t('It makes students more accountable for their own progress', 'يجعل الطلاب أكثر مسؤولية عن تقدّمهم') },
        { id: 'r4', label: t('It surfaces the misconceptions earlier in the unit', 'يكشف المفاهيم الخاطئة في وقت أبكر من الوحدة') },
      ],
      correctId: 'r2',
      hint: t('Compare the gradebook with the planner once more. Which reason explains why one is full and the other is unchanged?', 'قارن سجلّ الدرجات بمخطّط الدروس مرة أخرى. أي سبب يفسّر لماذا أحدهما ممتلئ والآخر لم يتغيّر؟'),
      hintSpotId: 'planner',
      bonusPoints: 25,
    },
  },

  conversation: CONVO_4,
  reveal: {
    whatDrifted: t(
      'Assessment has become an end rather than a tool. A great deal is measured, but the evidence rarely changes what happens next in the classroom.',
      'أصبح التقييم غاية لا أداة. يُقاس الكثير، لكن الأدلة نادرًا ما تغيّر ما يحدث بعدها في الصف.',
    ),
    whyItHappened: t(
      'Collecting data feels rigorous and productive on its own, so the gathering becomes the goal — and the harder work of responding to it quietly drops away.',
      'جمع البيانات يبدو في ذاته دقيقًا ومثمرًا، فيصبح الجمع هو الهدف — ويتلاشى بهدوء العمل الأصعب: الاستجابة لها.',
    ),
    howToRestore: t(
      'Close the loop: use assessment evidence to reteach, regroup, intervene, and adjust instruction. Data earns its keep only when it changes teaching.',
      'أغلق الحلقة: استخدم أدلة التقييم لإعادة التدريس وإعادة التجميع والتدخّل وتعديل التدريس. لا تستحق البيانات مكانها إلا عندما تغيّر التدريس.',
    ),
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector', 'mutation-hunter'],
};
