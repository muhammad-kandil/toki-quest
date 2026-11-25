import sceneImg from '../../assets/scenes/classroom-1-talkative.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';
import { CONVO_1 } from './conversations1';

export const LEVEL_1: LevelDefinition = {
  id: 1,
  title: t('The Talkative Classroom', 'الصف الثرثار'),
  theme: t('Participation ≠ Learning', 'المشاركة ≠ التعلّم'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneImg,
  scenario: t(
    'Toki steps into a buzzing classroom. Students are discussing enthusiastically — every group is talking at once. Hands wave, voices overlap, and the energy in the room is undeniable. On the surface, this looks like exactly the kind of collaborative classroom every coach hopes to see.',
    'يدخل توكي صفًا يعجّ بالحيوية. الطلاب يتناقشون بحماس، وكل مجموعة تتحدث في الوقت نفسه. الأيدي ترتفع والأصوات تتداخل، والطاقة في الغرفة واضحة. ظاهريًا، يبدو هذا تمامًا الصف التعاوني الذي يتمنى كل مدرّب أن يراه.',
  ),
  evidence: [
    {
      id: 'group-table',
      x: 22, y: 72,
      label: t('Group table', 'طاولة المجموعة'),
      clue: t('"I think it’s good." "Me too." "Yeah, totally." Nobody asks why.', '«أعتقد أنه جيد.» «وأنا أيضًا.» «نعم، بالتأكيد.» لا أحد يسأل: لماذا؟'),
    },
    {
      id: 'board',
      x: 50, y: 28,
      label: t('The board', 'السبورة'),
      clue: t('The task says: "Discuss the chapter." No question, no claim to defend.', 'المهمة المكتوبة: «ناقشوا الفصل.» لا سؤال محدد، ولا ادّعاء يُدافَع عنه.'),
    },
    {
      id: 'teacher',
      x: 80, y: 42,
      label: t('The teacher', 'المعلّم'),
      clue: t('Circulating, smiling: "Great energy, everyone!" Not one follow-up question.', 'يتجوّل مبتسمًا: «طاقة رائعة يا شباب!» دون سؤال متابعة واحد.'),
    },
  ],

  steps: {
    identifyDrift: {
      prompt: t('Toki leans in and listens closely. What is actually drifting here?', 'يقترب توكي ويُنصت باهتمام. ما الذي ينحرف هنا فعلًا؟'),
      options: [
        { id: 'collaboration', label: t('Collaboration', 'التعاون') },
        { id: 'thinking-quality', label: t('Thinking quality', 'جودة التفكير') },
        { id: 'engagement', label: t('Student engagement', 'تفاعل الطلاب') },
        { id: 'management', label: t('Classroom management', 'إدارة الصف') },
      ],
      correctId: 'thinking-quality',
      hint: t('What are the students at the group table actually doing with each other’s ideas — and what does the board ask them to do?', 'ماذا يفعل طلاب طاولة المجموعة فعلًا بأفكار بعضهم — وما الذي تطلبه منهم السبورة؟'),
      hintSpotId: 'group-table',
    },
    assessRisk: {
      prompt: t('How serious is this drift, right now?', 'ما مدى خطورة هذا الانحراف الآن؟'),
      options: RISK_OPTIONS,
      correctId: 'minor',
      hint: t('Put the three clues together: how much of what you saw would still be there tomorrow if nothing changed — and how much of it is already working?', 'اجمع الأدلة الثلاثة: كم مما رأيته سيبقى غدًا لو لم يتغيّر شيء — وكم منه يعمل بالفعل؟'),
      hintSpotId: 'teacher',
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move for this teacher?", 'ما أفضل خطوة تدريبية مع هذا المعلّم؟'),
      options: [
        { id: 'stop-talk', label: t('Suggest a short silent-writing step before each discussion so students arrive with a view', 'اقترح خطوة كتابة صامتة قصيرة قبل كل نقاش ليأتي الطلاب برأي') },
        { id: 'add-prompts', label: t('Help the teacher add prompts requiring evidence and justification', 'ساعد المعلّم على إضافة أسئلة تتطلب أدلة وتعليلًا') },
        { id: 'more-groups', label: t('Suggest assigning discussion roles — leader, recorder, challenger — so every voice is heard', 'اقترح توزيع أدوار النقاش — قائد، مدوّن، معارض — ليُسمع كل صوت') },
        { id: 'silent-work', label: t('Recommend ending each discussion with a whole-class share-out of the best ideas', 'أوصِ بإنهاء كل نقاش بمشاركة أفضل الأفكار مع الصف كله') },
      ],
      correctId: 'add-prompts',
      hint: t('Reread the board. If the task line were different, what would change at the group table without the teacher saying a word?', 'أعد قراءة السبورة. لو اختلف سطر المهمة، ما الذي سيتغيّر عند طاولة المجموعة دون أن يقول المعلّم كلمة؟'),
      hintSpotId: 'board',
    },
    reasoning: {
      prompt: t('Why is this the right coaching move?', 'لماذا هذه هي الخطوة التدريبية الصحيحة؟'),
      options: [
        { id: 'r1', label: t('It gives students thinking time before they speak, which raises the quality of the first answer', 'تمنح الطلاب وقتًا للتفكير قبل الحديث، فترفع جودة الإجابة الأولى') },
        { id: 'r2', label: t('It redirects existing engagement toward evidence-based reasoning, without losing the energy', 'توجّه التفاعل القائم نحو التعليل المبني على الأدلة دون فقدان الحماس') },
        { id: 'r3', label: t('It makes participation more equal, so the quiet students contribute too', 'تجعل المشاركة أكثر عدلًا، فيسهم الطلاب الهادئون أيضًا') },
        { id: 'r4', label: t('It gives the teacher a clear structure to assess each discussion against', 'تمنح المعلّم بنية واضحة يقيّم كل نقاش على أساسها') },
      ],
      correctId: 'r2',
      hint: t('Which clue shows you something worth keeping — and which one shows what is missing? The right reason protects the first while fixing the second.', 'أي دليل يُريك شيئًا يستحق الحفاظ عليه — وأيها يُريك ما ينقص؟ السبب الصحيح يحمي الأول بينما يصلح الثاني.'),
      hintSpotId: 'group-table',
      bonusPoints: 25,
    },
  },

  conversation: CONVO_1,
  reveal: {
    whatDrifted: t(
      'The classroom has plenty of participation, but the talk is opinion-sharing, not reasoning. Students are engaged with each other — not yet engaged with evidence.',
      'في الصف مشاركة وفيرة، لكن الحوار تبادلُ آراء لا تعليل. الطلاب متفاعلون مع بعضهم، لكنهم لم يتفاعلوا بعد مع الأدلة.',
    ),
    whyItHappened: t(
      'When collaboration is introduced, "everyone is talking" can quietly become the goal itself, because it’s the easiest thing to see and measure in the moment.',
      'عندما يُدخَل التعاون إلى الصف، قد يتحوّل «الجميع يتحدث» بهدوء إلى الهدف نفسه، لأنه أسهل ما يمكن رؤيته وقياسه في اللحظة.',
    ),
    howToRestore: t(
      'Simple sentence starters and follow-up questions — "What’s your evidence?", "Why do you think that?" — turn open talk into academic reasoning without dampening the energy.',
      'بدايات جمل بسيطة وأسئلة متابعة — «ما دليلك؟»، «لماذا تعتقد ذلك؟» — تحوّل الحوار المفتوح إلى تعليل أكاديمي دون إطفاء الحماس.',
    ),
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['drift-detective'],
};
