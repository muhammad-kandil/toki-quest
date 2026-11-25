import sceneImg from '../../assets/scenes/classroom-5-gamification.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';
import { CONVO_5 } from './conversations1';

export const LEVEL_5: LevelDefinition = {
  id: 5,
  title: t('The Gamification Mutation', 'تحوّر التلعيب'),
  theme: t('Engagement ≠ Understanding', 'التفاعل ≠ الفهم'),
  subject: t('Any Subject', 'أي مادة'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki enters a buzzing, competitive classroom. Students race for points, badges, and spots on a leaderboard. The energy is electric — hands shoot up, everyone wants to win the next round. The teacher has gamified everything, and engagement has never looked higher.',
    'يدخل توكي صفًا صاخبًا تنافسيًا. الطلاب يتسابقون على النقاط والشارات ومراكز لوحة المتصدّرين. الطاقة كهربائية — الأيدي تقفز، والجميع يريد الفوز بالجولة التالية. المعلّم حوّل كل شيء إلى لعبة، ولم يبدُ التفاعل أعلى من هذا قط.',
  ),
  evidence: [
    {
      id: 'leaderboard',
      x: 50, y: 28,
      label: t('The leaderboard', 'لوحة المتصدّرين'),
      clue: t('Same three names at the top all week. Half the class hasn’t moved since Monday.', 'الأسماء الثلاثة نفسها في الصدارة طوال الأسبوع. نصف الصف لم يتحرك منذ الاثنين.'),
    },
    {
      id: 'round',
      x: 22, y: 65,
      label: t('A round', 'جولة'),
      clue: t('"7 × 8?" Hand up in half a second. "56!" Points. Next. Nobody is asked how.', '«٧ × ٨؟» يد مرفوعة خلال نصف ثانية. «٥٦!» نقاط. التالي. لا أحد يُسأل: كيف؟'),
    },
    {
      id: 'back-row',
      x: 80, y: 72,
      label: t('Back row', 'الصف الخلفي'),
      clue: t('A student stopped raising her hand two rounds ago. She was close — just slower.', 'توقفت طالبة عن رفع يدها قبل جولتين. كانت قريبة من الإجابة — لكنها أبطأ فحسب.'),
    },
  ],

  steps: {
    identifyDrift: {
      prompt: t('Toki watches a few rounds closely. What is actually being rewarded?', 'يراقب توكي بضع جولات بتمعّن. ما الذي يُكافَأ فعلًا؟'),
      options: [
        { id: 'thinking', label: t('Thinking', 'التفكير') },
        { id: 'understanding', label: t('Understanding', 'الفهم') },
        { id: 'speed', label: t('Speed and performance', 'السرعة والأداء') },
        { id: 'persistence', label: t('Persistence', 'المثابرة') },
      ],
      correctId: 'speed',
      hint: t('Replay a round. Between the question and the points, what did the game ask the student to show?', 'أعد جولة. بين السؤال والنقاط، ما الذي طلبت اللعبة من الطالب إظهاره؟'),
      hintSpotId: 'round',
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('Look at the leaderboard and the back row together. Who is the game still working for, and who has it already lost?', 'انظر إلى لوحة المتصدّرين والصف الخلفي معًا. لمن ما زالت اللعبة تعمل، ومن خسرته بالفعل؟'),
      hintSpotId: 'back-row',
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'bigger-prizes', label: t('Mix in team rounds so the stronger students carry the weaker ones', 'أدخل جولات جماعية ليحمل الطلاب الأقوى الأضعف') },
        { id: 'reward-reasoning', label: t('Reward reasoning, explanation, reflection, and improvement — not speed alone', 'كافئ التعليل والشرح والتأمل والتحسّن — لا السرعة وحدها') },
        { id: 'remove-all', label: t('Keep the games but take the leaderboard off the screen', 'احتفظ بالألعاب لكن أزل لوحة المتصدّرين عن الشاشة') },
        { id: 'more-leaderboards', label: t('Give slower students extra time on the buzzer so the game is fairer', 'امنح الطلاب الأبطأ وقتًا إضافيًا على الجرس ليكون اللعب أعدل') },
      ],
      correctId: 'reward-reasoning',
      hint: t('The student in the back row was close — just slower. Which move would have kept her hand up without taking the game away?', 'كانت طالبة الصف الخلفي قريبة — لكنها أبطأ فقط. أي خطوة كانت ستُبقي يدها مرفوعة دون أن تأخذ اللعبة؟'),
      hintSpotId: 'back-row',
    },
    reasoning: {
      prompt: t('Why change what’s rewarded rather than remove the game?', 'لماذا نغيّر ما يُكافَأ بدلًا من إزالة اللعبة؟'),
      options: [
        { id: 'r1', label: t('Removing the games would damage the relationship the teacher has built', 'إزالة الألعاب ستضرّ بالعلاقة التي بناها المعلّم') },
        { id: 'r2', label: t('Engagement is valuable — the fix is to point it at reasoning and growth, so the energy serves learning instead of competing with it', 'التفاعل قيّم — والحل أن نوجّهه نحو التعليل والنمو، فتخدم الطاقةُ التعلّمَ بدل أن تنافسه') },
        { id: 'r3', label: t('Competition raises effort, so the games should stay as they are', 'المنافسة ترفع الجهد، فينبغي أن تبقى الألعاب كما هي') },
        { id: 'r4', label: t('Quick recall is a real skill and deserves to be rewarded too', 'الاستدعاء السريع مهارة حقيقية وتستحق المكافأة أيضًا') },
      ],
      correctId: 'r2',
      hint: t('The leaderboard hasn’t moved for half the class since Monday. Which reason explains both that, and why the energy in the room is still worth keeping?', 'لم تتحرك لوحة المتصدّرين لنصف الصف منذ الاثنين. أي سبب يفسّر ذلك، ويفسّر أيضًا لماذا تستحق الطاقة في الغرفة أن نحافظ عليها؟'),
      hintSpotId: 'leaderboard',
      bonusPoints: 25,
    },
  },

  conversation: CONVO_5,
  reveal: {
    whatDrifted: t(
      'Winning has become more important than learning. The competition drives engagement, but it rewards speed and performance rather than thinking and understanding.',
      'أصبح الفوز أهم من التعلّم. التنافس يحرّك التفاعل، لكنه يكافئ السرعة والأداء لا التفكير والفهم.',
    ),
    whyItHappened: t(
      'Points and leaderboards produce visible, immediate excitement — so the game’s scoreboard quietly becomes the goal, and depth of learning takes a back seat to winning.',
      'تُنتج النقاط ولوحات المتصدّرين حماسًا مرئيًا فوريًا، فتصبح لوحة النتائج بهدوء هي الهدف، ويتراجع عمق التعلّم أمام الفوز.',
    ),
    howToRestore: t(
      'Keep the engagement, change the reward: recognize reasoning, explanation, reflection, and improvement rather than speed. (It’s why this game never once rewarded you for being fast.)',
      'احتفظ بالتفاعل وغيّر المكافأة: قدّر التعليل والشرح والتأمل والتحسّن بدل السرعة. (لهذا لم تكافئك هذه اللعبة قط على السرعة.)',
    ),
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector', 'mutation-hunter'],
};
