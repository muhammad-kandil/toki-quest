import sceneImg from '../../assets/scenes/classroom-1-talkative.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

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
        { id: 'engagement', label: t('Student engagement', 'مشاركة الطلاب') },
        { id: 'management', label: t('Classroom management', 'إدارة الصف') },
      ],
      correctId: 'thinking-quality',
      hint: t('Listen again — are students sharing opinions, or building an argument with evidence?', 'أنصت مجددًا — هل يتبادل الطلاب آراءً، أم يبنون حجّة مدعومة بالأدلة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift, right now?', 'ما مدى خطورة هذا الانحراف الآن؟'),
      options: RISK_OPTIONS,
      correctId: 'minor',
      hint: t('The talk itself is healthy — it just needs a sharper edge. That points to an earlier stage of drift.', 'الحوار نفسه صحي، لكنه يحتاج إلى حدّة أكبر. هذا يشير إلى مرحلة مبكرة من الانحراف.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move for this teacher?", 'ما أفضل خطوة تدريبية مع هذا المعلّم؟'),
      options: [
        { id: 'stop-talk', label: t('Ask the teacher to reduce group talk time', 'اطلب من المعلّم تقليل وقت الحوار الجماعي') },
        { id: 'add-prompts', label: t('Help the teacher add prompts requiring evidence and justification', 'ساعد المعلّم على إضافة أسئلة تتطلب أدلة وتعليلًا') },
        { id: 'more-groups', label: t('Suggest smaller groups for more airtime per student', 'اقترح مجموعات أصغر لمنح كل طالب وقتًا أطول للحديث') },
        { id: 'silent-work', label: t('Recommend switching to independent silent work', 'أوصِ بالتحوّل إلى العمل الفردي الصامت') },
      ],
      correctId: 'add-prompts',
      hint: t('The goal isn’t less talk — it’s deeper talk. What would push students toward reasoning?', 'الهدف ليس حوارًا أقل، بل حوارًا أعمق. ما الذي يدفع الطلاب نحو التعليل؟'),
    },
    reasoning: {
      prompt: t('Why is this the right coaching move?', 'لماذا هذه هي الخطوة التدريبية الصحيحة؟'),
      options: [
        { id: 'r1', label: t('It keeps the room quiet and easier to manage', 'تبقي الصف هادئًا وأسهل في الإدارة') },
        { id: 'r2', label: t('It redirects existing engagement toward evidence-based reasoning, without losing the energy', 'توجّه المشاركة القائمة نحو التعليل المبني على الأدلة دون فقدان الحماس') },
        { id: 'r3', label: t('It gives the teacher more control over who speaks', 'تمنح المعلّم تحكّمًا أكبر فيمن يتحدث') },
        { id: 'r4', label: t('It makes the lesson faster to complete', 'تجعل إنهاء الدرس أسرع') },
      ],
      correctId: 'r2',
      hint: t('Think about what we’re trying to preserve, not just what we’re trying to fix.', 'فكّر فيما نحاول الحفاظ عليه، لا فيما نحاول إصلاحه فحسب.'),
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted: t(
      'The classroom has plenty of participation, but the talk is opinion-sharing, not reasoning. Students are engaged with each other — not yet engaged with evidence.',
      'في الصف مشاركة وفيرة، لكن الحوار تبادلُ آراء لا تعليل. الطلاب منخرطون مع بعضهم، لكنهم لم ينخرطوا بعد مع الأدلة.',
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
