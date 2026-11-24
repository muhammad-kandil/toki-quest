import sceneImg from '../../assets/scenes/classroom-2-activity.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_2: LevelDefinition = {
  id: 2,
  title: t('The Activity Overload', 'تخمة الأنشطة'),
  theme: t('Busy ≠ Learning', 'الانشغال ≠ التعلّم'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki visits a fast-paced classroom. Students rotate through stations, games, and hands-on tasks in quick succession. Nobody is idle, the pace is relentless, and the teacher proudly notes that every minute is filled. It looks like a model of engagement and time-on-task.',
    'يزور توكي صفًا سريع الإيقاع. الطلاب يتنقلون بين المحطات والألعاب والمهام العملية بسرعة متتالية. لا أحد خامل، والإيقاع لا يتوقف، والمعلّم يشير بفخر إلى أن كل دقيقة مُستغَلّة. يبدو الصف نموذجًا للمشاركة واستثمار الوقت.',
  ),
  evidence: [
    {
      id: 'station',
      x: 25, y: 65,
      label: t('Station 3', 'المحطة ٣'),
      clue: t('A timer beeps. Students grab the worksheet, fill it, and move on. Nobody reads the question twice.', 'يرنّ المؤقّت. يلتقط الطلاب الورقة، يملؤونها، وينتقلون. لا أحد يقرأ السؤال مرتين.'),
    },
    {
      id: 'objective',
      x: 52, y: 25,
      label: t('Lesson objective', 'هدف الدرس'),
      clue: t('"Students will complete all 5 stations." The objective describes activity, not learning.', '«سيُكمل الطلاب المحطات الخمس جميعها.» الهدف يصف نشاطًا لا تعلّمًا.'),
    },
    {
      id: 'tracker',
      x: 80, y: 50,
      label: t('Completion tracker', 'لوحة الإنجاز'),
      clue: t('Stickers for every finished station. No column for "understood it."', 'ملصقات لكل محطة مُنجَزة. لا عمود لـ«فهمها».'),
    },
  ],

  steps: {
    identifyDrift: {
      prompt: t('Toki watches a full rotation. What has quietly become the priority?', 'يراقب توكي دورة كاملة. ما الذي أصبح الأولوية بهدوء؟'),
      options: [
        { id: 'learning', label: t('Learning outcomes', 'نواتج التعلّم') },
        { id: 'completion', label: t('Completing the activities', 'إنجاز الأنشطة') },
        { id: 'feedback', label: t('Feedback', 'التغذية الراجعة') },
        { id: 'assessment', label: t('Assessment', 'التقييم') },
      ],
      correctId: 'completion',
      hint: t('Ask what happens at each station — are students meeting an objective, or just finishing the task to move on?', 'اسأل ماذا يحدث في كل محطة — هل يحقق الطلاب هدفًا، أم يُنهون المهمة فقط للانتقال؟'),
    },
    assessRisk: {
      prompt: t('How far has this drifted?', 'إلى أي مدى وصل هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The activities still have potential — but the link to learning is slipping. That’s more than minor, not yet fatal.', 'ما زال للأنشطة إمكانات، لكن الصلة بالتعلّم تتراخى. هذا أكثر من طفيف، وليس قاتلًا بعد.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'fewer', label: t('Cut the number of stations to slow the pace', 'قلّل عدد المحطات لإبطاء الإيقاع') },
        { id: 'reconnect', label: t('Reconnect every activity to a clear learning objective', 'اربط كل نشاط من جديد بهدف تعلّم واضح') },
        { id: 'timer', label: t('Add timers so students move faster', 'أضف مؤقّتات ليتحرك الطلاب أسرع') },
        { id: 'reward', label: t('Reward the students who finish the most stations', 'كافئ الطلاب الذين يُنهون أكبر عدد من المحطات') },
      ],
      correctId: 'reconnect',
      hint: t('The problem isn’t the number of activities — it’s that they’ve become unmoored from a purpose.', 'المشكلة ليست في عدد الأنشطة، بل في انفصالها عن الغاية.'),
    },
    reasoning: {
      prompt: t('Why is reconnecting to objectives the right move?', 'لماذا إعادة الربط بالأهداف هي الخطوة الصحيحة؟'),
      options: [
        { id: 'r1', label: t('It makes the classroom calmer and easier to manage', 'تجعل الصف أهدأ وأسهل في الإدارة') },
        { id: 'r2', label: t('An activity only earns its place if it advances a specific learning goal — otherwise it’s motion without progress', 'لا يستحق النشاط مكانه إلا إذا دفع هدف تعلّم محددًا — وإلا فهو حركة بلا تقدّم') },
        { id: 'r3', label: t('It lets the teacher fit in even more stations', 'تتيح للمعلّم إضافة محطات أكثر') },
        { id: 'r4', label: t('It helps students finish faster', 'تساعد الطلاب على الإنهاء أسرع') },
      ],
      correctId: 'r2',
      hint: t('What distinguishes a meaningful activity from a busy one?', 'ما الذي يميّز النشاط الهادف عن النشاط المشغول؟'),
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted: t(
      'The lesson is full of motion, but "getting through the activities" has replaced "reaching the learning goal." Busyness is being mistaken for progress.',
      'الدرس مليء بالحركة، لكن «إنهاء الأنشطة» حلّ محل «بلوغ هدف التعلّم». الانشغال يُظَنّ تقدّمًا.',
    ),
    whyItHappened: t(
      'Activities are concrete and satisfying to complete, so completion becomes the visible measure of success — while the underlying objective quietly fades from view.',
      'الأنشطة ملموسة ومُرضية عند إنجازها، فيصبح الإنجاز هو مقياس النجاح الظاهر، بينما يتلاشى الهدف الأساسي بهدوء.',
    ),
    howToRestore: t(
      'Anchor each station to a specific objective, and check for that objective — not just completion. A well-chosen activity earns its place; a busy one just fills time.',
      'اربط كل محطة بهدف محدد، وتحقّق من ذلك الهدف — لا من الإنجاز فقط. النشاط المختار بعناية يستحق مكانه؛ أما المشغول فيملأ الوقت فحسب.',
    ),
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['drift-detective'],
};
