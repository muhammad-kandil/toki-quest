import sceneImg from '../../assets/scenes/classroom-3-output.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';
import { CONVO_3 } from './conversations1';

export const LEVEL_3: LevelDefinition = {
  id: 3,
  title: t('The Output Illusion', 'وهم الإنتاج'),
  theme: t('Producing ≠ Understanding', 'الإنتاج ≠ الفهم'),
  subject: t('Art', 'الفنون'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki enters a classroom filled with impressive work. Students have made colorful posters, polished slide decks, and elaborate models. The walls are covered in beautiful output, and the teacher is visibly proud of how much the students have produced.',
    'يدخل توكي صفًا مليئًا بأعمال مبهرة. صنع الطلاب ملصقات ملوّنة وعروضًا أنيقة ومجسّمات متقنة الصنع. الجدران مغطاة بإنتاج جميل، والمعلّم فخور بوضوح بكمّ ما أنتجه طلابه.',
  ),
  evidence: [
    {
      id: 'poster',
      x: 22, y: 38,
      label: t('Water-cycle poster', 'ملصق دورة الماء'),
      clue: t('Gorgeous. Arrows, glitter, perfect lettering. The caption copies the textbook word for word.', 'رائع. أسهم ولمعان وخط متقن. التعليق منسوخ من الكتاب كلمة بكلمة.'),
    },
    {
      id: 'student',
      x: 55, y: 68,
      label: t('Ask the artist', 'اسأل صاحبة العمل'),
      clue: t('"Why does the water go up here?" A pause. "Because… that’s how the picture was."', '«لماذا يصعد الماء هنا؟» صمت. «لأن… هكذا كانت الصورة.»'),
    },
    {
      id: 'rubric',
      x: 82, y: 30,
      label: t('The rubric', 'سلّم التقدير'),
      clue: t('Criteria: colour, neatness, creativity, effort. Nothing about explanation.', 'المعايير: الألوان، الترتيب، الإبداع، الجهد. لا شيء عن الشرح.'),
    },
  ],

  steps: {
    identifyDrift: {
      prompt: t('Toki looks past the polish. What evidence is actually missing?', 'ينظر توكي إلى ما وراء اللمعان. ما الدليل الغائب فعلًا؟'),
      options: [
        { id: 'creativity', label: t('Creativity', 'الإبداع') },
        { id: 'voice', label: t('Student voice', 'صوت الطالب') },
        { id: 'understanding', label: t('Demonstration of understanding', 'إظهار الفهم') },
        { id: 'participation', label: t('Participation', 'المشاركة') },
      ],
      correctId: 'understanding',
      hint: t('Listen to the artist’s answer once more. What can she do — and what question could she not answer?', 'أنصت إلى إجابة صاحبة العمل مرة أخرى. ما الذي تستطيع فعله — وأي سؤال لم تستطع الإجابة عنه؟'),
      hintSpotId: 'student',
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Read the rubric. If every poster in the school is graded by these four words, how long could the gap you heard go unnoticed?', 'اقرأ سلّم التقدير. لو قُيِّم كل ملصق في المدرسة بهذه الكلمات الأربع، كم من الوقت قد تمرّ الفجوة التي سمعتها دون أن يلاحظها أحد؟'),
      hintSpotId: 'rubric',
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'grade-looks', label: t('Add a written reflection sheet students complete after the project', 'أضف ورقة تأمل مكتوبة يملؤها الطلاب بعد المشروع') },
        { id: 'embed', label: t('Embed explanation, reasoning, and application into the task', 'ضمّن الشرح والتعليل والتطبيق في المهمة نفسها') },
        { id: 'more-projects', label: t('Have students present their projects to the class at the end', 'اجعل الطلاب يعرضون مشاريعهم على الصف في النهاية') },
        { id: 'display', label: t('Use a rubric with a clear criterion for scientific accuracy', 'استخدم سلّم تقدير ببند واضح للدقة العلمية') },
      ],
      correctId: 'embed',
      hint: t('Look at the caption on the poster. Which move would make copying it impossible, rather than checking afterwards whether it was copied?', 'انظر إلى التعليق على الملصق. أي خطوة تجعل نسخه مستحيلًا، بدلًا من التحقق لاحقًا مما إذا كان قد نُسخ؟'),
      hintSpotId: 'poster',
    },
    reasoning: {
      prompt: t('Why embed explanation and reasoning into the task?', 'لماذا نضمّن الشرح والتعليل في المهمة؟'),
      options: [
        { id: 'r1', label: t('It raises the academic standard of the final products', 'يرفع المستوى الأكاديمي للمنتجات النهائية') },
        { id: 'r2', label: t('A polished product can hide a shaky understanding — requiring explanation makes the thinking visible and assessable', 'قد يُخفي المنتج المتقن فهمًا هشًّا — واشتراط الشرح يجعل التفكير مرئيًا وقابلًا للتقييم') },
        { id: 'r3', label: t('It gives students practice at writing scientifically', 'يمنح الطلاب تدريبًا على الكتابة العلمية') },
        { id: 'r4', label: t('It makes the project fairer to grade across students', 'يجعل تقييم المشروع أكثر عدلًا بين الطلاب') },
      ],
      correctId: 'r2',
      hint: t('Hold the poster and the artist’s answer side by side. What does one show that the other hides?', 'ضع الملصق وإجابة صاحبة العمل جنبًا إلى جنب. ما الذي يُظهره أحدهما ويخفيه الآخر؟'),
      hintSpotId: 'student',
      bonusPoints: 25,
    },
  },

  conversation: CONVO_3,
  reveal: {
    whatDrifted: t(
      'The quality of the product is being read as evidence of understanding. But a beautiful poster can be produced with very little grasp of the underlying idea.',
      'جودة المنتج تُقرأ دليلًا على الفهم. لكن يمكن إنتاج ملصق جميل بقدر ضئيل جدًا من استيعاب الفكرة الأساسية.',
    ),
    whyItHappened: t(
      'Output is visible, shareable, and satisfying to display — so it becomes the thing that gets valued, while the harder-to-see understanding goes unexamined.',
      'الإنتاج مرئي وقابل للمشاركة ومُرضٍ عند عرضه، فيصبح هو ما يُثمَّن، بينما يبقى الفهم الأصعب رؤيةً دون فحص.',
    ),
    howToRestore: t(
      'Build explanation, reasoning, and application into the task itself — ask students to justify choices and apply the idea in a new context, so the product reveals the thinking.',
      'ضمّن الشرح والتعليل والتطبيق في المهمة نفسها — اطلب من الطلاب تبرير خياراتهم وتطبيق الفكرة في سياق جديد، ليكشف المنتج عن التفكير.',
    ),
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};
