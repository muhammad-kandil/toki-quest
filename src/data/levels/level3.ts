import sceneImg from '../../assets/scenes/classroom-3-output.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_3: LevelDefinition = {
  id: 3,
  title: t('The Output Illusion', 'وهم الإنتاج'),
  theme: t('Producing ≠ Understanding', 'الإنتاج ≠ الفهم'),
  subject: t('Art', 'الفنون'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki enters a classroom filled with impressive work. Students have made colorful posters, polished slide decks, and elaborate models. The walls are covered in beautiful output, and the teacher is visibly proud of how much the students have produced.',
    'يدخل توكي صفًا مليئًا بأعمال مبهرة. صنع الطلاب ملصقات ملوّنة وعروضًا متقنة ومجسّمات متقنة الصنع. الجدران مغطاة بإنتاج جميل، والمعلّم فخور بوضوح بكم ما أنتجه طلابه.',
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
      label: t('Ask the artist', 'اسأل صاحب العمل'),
      clue: t('"Why does the water go up here?" A pause. "Because… that’s how the picture was."', '«لماذا يصعد الماء هنا؟» صمت. «لأن… هكذا كانت الصورة.»'),
    },
    {
      id: 'rubric',
      x: 82, y: 30,
      label: t('The rubric', 'معيار التقييم'),
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
      hint: t('The products look great — but can the students explain the ideas behind them?', 'المنتجات تبدو رائعة — لكن هل يستطيع الطلاب شرح الأفكار وراءها؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('When impressive output is routinely accepted as proof of learning, real understanding can go unchecked for a long time. That’s a serious drift.', 'عندما يُقبَل الإنتاج المبهر عادةً دليلًا على التعلّم، قد يمرّ الفهم الحقيقي دون فحص لوقت طويل. هذا انحراف خطير.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'grade-looks', label: t('Grade the projects on visual quality', 'قيّم المشاريع بناءً على الجودة البصرية') },
        { id: 'embed', label: t('Embed explanation, reasoning, and application into the task', 'ضمّن الشرح والتعليل والتطبيق في المهمة نفسها') },
        { id: 'more-projects', label: t('Assign more projects for practice', 'كلّف الطلاب بمشاريع أكثر للتدريب') },
        { id: 'display', label: t('Display the best work to motivate others', 'اعرض أفضل الأعمال لتحفيز الآخرين') },
      ],
      correctId: 'embed',
      hint: t('How could the task itself force students to reveal their thinking, not just their craft?', 'كيف يمكن للمهمة نفسها أن تدفع الطلاب إلى إظهار تفكيرهم، لا مهارتهم اليدوية فقط؟'),
    },
    reasoning: {
      prompt: t('Why embed explanation and reasoning into the task?', 'لماذا نضمّن الشرح والتعليل في المهمة؟'),
      options: [
        { id: 'r1', label: t('It makes projects look more professional', 'يجعل المشاريع تبدو أكثر احترافية') },
        { id: 'r2', label: t('A polished product can hide a shaky understanding — requiring explanation makes the thinking visible and assessable', 'قد يُخفي المنتج المتقن فهمًا هشًّا — واشتراط الشرح يجعل التفكير مرئيًا وقابلًا للتقييم') },
        { id: 'r3', label: t('It gives students more to display on the walls', 'يمنح الطلاب مزيدًا ليعرضوه على الجدران') },
        { id: 'r4', label: t('It keeps faster students busy for longer', 'يُبقي الطلاب الأسرع مشغولين لوقت أطول') },
      ],
      correctId: 'r2',
      hint: t('What is the product a proxy for — and how do we check the real thing?', 'ما الذي ينوب عنه المنتج — وكيف نتحقق من الشيء الحقيقي؟'),
      bonusPoints: 25,
    },
  },

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
