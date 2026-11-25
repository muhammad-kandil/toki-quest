import sceneImg from '../../assets/scenes/classroom-1-talkative.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/** World 5 boss — The Thinking Trap. */
export const WORLD_5_BOSS: WorldBossDefinition = {
  id: 55,
  worldId: 'questioning',
  title: t('The Thinking Trap', 'فخّ التفكير'),
  theme: t('Asked ≠ Thought', 'مسؤول ≠ مُفكَّر فيه'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'Questioning is this school’s signature. It is in the vision statement, on the lesson-plan template, and in every observation rubric: "frequent, varied questioning." Observers tally questions per lesson and the numbers are superb. Toki is handed the tally sheet, puts it in his pocket, and spends the day counting something else: how many students, in each room, actually had to think.',
    'طرح الأسئلة هو بصمة هذه المدرسة. موجود في بيان الرؤية، وفي نموذج خطة الدرس، وفي كل سلّم تقدير للملاحظة: «أسئلة متكررة ومتنوعة». يحصي الملاحظون الأسئلة في كل درس والأرقام رائعة. تُسلَّم ورقة الإحصاء إلى توكي، فيضعها في جيبه، ويقضي اليوم يعدّ شيئًا آخر: كم طالبًا، في كل غرفة، اضطر فعلًا إلى التفكير.',
  ),
  scenes: [
    {
      id: 'rubric',
      place: t('The observation rubric', 'سلّم تقدير الملاحظة'),
      observation: t('"Questioning: frequency (1–5), variety (1–5)." No row for wait time. No row for how many students responded. No row for what the answers contained.', '«طرح الأسئلة: التكرار (١–٥)، التنوّع (١–٥).» لا صف لوقت الانتظار. لا صف لعدد الطلاب المجيبين. لا صف لما احتوته الإجابات.'),
      fitsPattern: true,
      finding: t('The rubric counts questions and is blind to thinking. Teachers are being observed into asking more and waiting less.', 'يعدّ السلّم الأسئلة وهو أعمى عن التفكير. يُلاحَظ المعلّمون حتى يسألوا أكثر وينتظروا أقل.'),
      hint: t('What does the rubric make visible, and what does it hide?', 'ما الذي يجعله السلّم مرئيًا، وما الذي يخفيه؟'),
    },
    {
      id: 'grade-6',
      place: t('Grade 6 History', 'الصف السادس، تاريخ'),
      observation: t('Four questions in fifty minutes, long silences after each, and the teacher sitting down while students write. Twice she says "I’m not telling you — argue it out" and leaves a pair disagreeing. The last observation form on file reads "Questioning: 2/5 — needs more pace and variety."', 'أربعة أسئلة في خمسين دقيقة، وصمت طويل بعد كل منها، والمعلّمة جالسة بينما يكتب الطلاب. تقول مرتين «لن أخبركم — تجادلوا» وتترك ثنائيًا مختلفَين. يقول آخر نموذج ملاحظة في الملف «طرح الأسئلة: ٢/٥ — يحتاج مزيدًا من الإيقاع والتنوّع».'),
      fitsPattern: false,
      finding: t('Four questions, twenty-eight thinkers, a 2/5 on file. The silences are the thinking; the sitting down is the restraint. This room fails the tally and passes the only test that matters.', 'أربعة أسئلة، ثمانية وعشرون مفكّرًا، و٢/٥ في الملف. الصمت هو التفكير؛ والجلوس هو ضبط النفس. ترسب هذه الغرفة في الإحصاء وتنجح في الاختبار الوحيد الذي يهم.'),
      hint: t('The silences and the sitting down are what the form scored. What were the twenty-eight students doing during them?', 'الصمت والجلوس هما ما قيّمه النموذج. ماذا كان الطلاب الثمانية والعشرون يفعلون أثناءهما؟'),
    },
    {
      id: 'grade-2',
      place: t('Grade 2 Phonics', 'الصف الثاني، صوتيات'),
      observation: t('The lesson the school films for new teachers. Forty-one questions in twenty minutes, every child’s eyes on the teacher, hands shooting up, a pace that never flags, "excellent!" after every answer. Toki writes down the answers: forty-one single words. He writes down the voices: six.', 'الدرس الذي تصوّره المدرسة للمعلّمين الجدد. واحد وأربعون سؤالًا في عشرين دقيقة، عيون كل طفل على المعلّمة، أيدٍ تنطلق إلى الأعلى، إيقاع لا يتراجع، «ممتاز!» بعد كل إجابة. يدوّن توكي الإجابات: واحد وأربعون كلمة مفردة. يدوّن الأصوات: ستة.'),
      fitsPattern: true,
      finding: t('Maximum questioning, minimum thinking. The rubric’s ideal lesson is the world’s clearest drift.', 'أقصى قدر من الأسئلة، أدنى قدر من التفكير. الدرس المثالي بحسب السلّم هو أوضح انحراف في هذا العالم.'),
      hint: t('Everything the rubric can see is here. Read Toki’s two lists instead: how many words per answer, and how many voices.', 'كل ما يستطيع السلّم رؤيته موجود هنا. اقرأ قائمتَي توكي بدل ذلك: كم كلمة في كل إجابة، وكم صوتًا.'),
    },
    {
      id: 'dept',
      place: t('Department meeting', 'اجتماع القسم'),
      observation: t('The head of science shares a "question stem bank" — fifty beautifully written higher-order stems. Teachers are asked to use at least ten per lesson. No one discusses what students will do with them.', 'يشارك رئيس قسم العلوم «بنك جذور أسئلة» — خمسون جذرًا من المستوى الأعلى مكتوبة بإتقان. يُطلب من المعلّمين استخدام عشرة على الأقل في كل درس. لا أحد يناقش ما سيفعله الطلاب بها.'),
      fitsPattern: true,
      finding: t('Good stems, wrong unit. "Ten per lesson" turns a thinking tool into a quota, and quotas get met fast.', 'جذور جيدة، وحدة قياس خاطئة. «عشرة في كل درس» تحوّل أداة تفكير إلى حصة، والحصص تُستوفى بسرعة.'),
      hint: t('The stems are excellent. What is the instruction attached to them?', 'الجذور ممتازة. ما التعليمة المرفقة بها؟'),
    },
    {
      id: 'grade-11',
      place: t('Grade 11 Economics', 'الصف الحادي عشر، اقتصاد'),
      observation: t('One question on the board for the whole lesson: "Should this country raise interest rates?" Students research, argue in groups, and present. The teacher asks perhaps six follow-ups all period, each one "how do you know?"', 'سؤال واحد على السبورة للدرس كله: «هل ينبغي لهذا البلد رفع أسعار الفائدة؟» يبحث الطلاب ويتجادلون في مجموعات ويعرضون. يطرح المعلّم ربما ستة أسئلة متابعة طوال الحصة، كل منها «كيف تعرف؟»'),
      fitsPattern: false,
      finding: t('The deepest thinking in the school, from the fewest questions. Variety and frequency: 1 and 1. Reasoning: everywhere.', 'أعمق تفكير في المدرسة، من أقل عدد من الأسئلة. التنوّع والتكرار: ١ و١. التعليل: في كل مكان.'),
      hint: t('One question all lesson — is that a drift, or the point?', 'سؤال واحد طوال الدرس — هل هذا انحراف، أم المقصود؟'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit; two don’t. Name the pattern.', 'ثلاثة مشاهد تطابق؛ واثنان لا. سمِّ النمط.'),
    options: [
      { id: 'counted', label: t('Questioning is measured by how often it happens, so it drifts toward quantity and speed', 'يُقاس طرح الأسئلة بتكراره، فانحرف نحو الكمّ والسرعة') },
      { id: 'recall', label: t('Teachers default to recall questions because higher-order ones are harder to write and mark', 'يميل المعلّمون إلى أسئلة التذكّر لأن أسئلة المستوى الأعلى أصعب في الكتابة') },
      { id: 'participation', label: t('A few confident students answer everything and the rest have learned to wait', 'يجيب قلّة من الطلاب الواثقين عن كل شيء وتعلّم الباقون الانتظار') },
      { id: 'wait', label: t('Nobody waits — questions are answered before most students have heard them', 'لا أحد ينتظر — تُجاب الأسئلة قبل أن يسمعها معظم الطلاب') },
    ],
    correctId: 'counted',
    hint: t('Six voices, no wait time and recall questions are all true of Grade 2 — and all three are symptoms. The rubric, the stem-bank quota and the filmed lesson share a cause. What is being counted?', 'ستة أصوات، وبلا وقت انتظار، وأسئلة تذكّر — كلها صحيحة في الصف الثاني، وكلها أعراض. يتشارك السلّم وحصة بنك الجذور والدرس المصوَّر سببًا واحدًا. ما الذي يُعدّ؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'high',
    hint: t('Serious and spreading — the rubric actively pushes every teacher toward it. But the thinking habit survives in pockets, and the fix is a rubric row, not a culture change. High, not yet lethal.', 'خطير ومنتشر — يدفع السلّم كل معلّم نحوه فعليًا. لكن عادة التفكير تنجو في جيوب، والإصلاح صف في السلّم لا تغيير ثقافة. كبير، ليس قاتلًا بعد.'),
  },
  coaching: {
    prompt: t('The rubric, the stem bank, and the vision statement all say "questioning." What is the one move with the greatest impact?', 'السلّم وبنك الجذور وبيان الرؤية تقول كلها «طرح الأسئلة». ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'film', label: t('Re-film the model lesson in Grade 6 and Grade 11 and retire the Grade 2 video', 'أعد تصوير الدرس النموذجي في الصفين السادس والحادي عشر واسحب فيديو الصف الثاني') },
      { id: 'quota', label: t('Raise the stem-bank quota to twelve questions per lesson and add a wait-time column to the tally', 'ارفع حصة بنك الجذور إلى اثني عشر سؤالًا في الدرس وأضف عمودًا لوقت الانتظار في الإحصاء') },
      { id: 'rubric', label: t('Rubric rows become "wait time ≥ 3 seconds" and "proportion of students who produced an answer"', 'استبدل صفّي السلّم بـ«وقت الانتظار ≥ ٣ ثوانٍ» و«نسبة الطلاب الذين أنتجوا إجابة»') },
      { id: 'coach', label: t('Pair every teacher with a peer to observe each other for thinkers, not questions, this term', 'اقرن كل معلّم بزميل ليلاحظ كلٌّ منهما الآخر بحثًا عن المفكّرين لا الأسئلة، هذا الفصل') },
    ],
    correctId: 'rubric',
    hint: t('Three of these change what teachers do. Only one changes what observers reward.', 'ثلاث من هذه تغيّر ما يفعله المعلّمون. واحدة فقط تغيّر ما يكافئه المراقبون.'),
  },
  reveal: {
    whatDrifted: t(
      'Questioning stopped being a way to make students think and became a thing the school counts. The count rose; the thinking concentrated in a few fast voices.',
      'توقف طرح الأسئلة عن كونه وسيلة لجعل الطلاب يفكّرون وصار شيئًا تعدّه المدرسة. ارتفع العدد؛ وتركّز التفكير في بضعة أصوات سريعة.',
    ),
    whyItHappened: t(
      'Questions are easy to count and thinking is not. Once the rubric chose the countable thing, every incentive in the building pointed the same way — and the best teachers started looking like the worst.',
      'الأسئلة سهلة العدّ والتفكير ليس كذلك. وما إن اختار السلّم الشيء القابل للعدّ، أشارت كل الحوافز في المبنى إلى الاتجاه نفسه — وبدأ أفضل المعلّمين يبدون كأسوئهم.',
    ),
    howToRestore: t(
      'Restore questioning as a tool for reasoning, explanation, and learning by measuring the thing it is for. Wait time and the proportion of students thinking are observable in any lesson — and they make the Grade 6 and Grade 11 rooms the model, not the anomaly.',
      'أعد طرح الأسئلة أداةً للتعليل والشرح والتعلّم بقياس ما وُجد من أجله. وقت الانتظار ونسبة الطلاب المفكّرين قابلان للملاحظة في أي درس — ويجعلان صفّي السادس والحادي عشر النموذج لا الشذوذ.',
    ),
    finalWord: t(
      'Forty-one questions and four questions were both on the tally sheet. Only one of those rooms was thinking. A number that can’t tell them apart isn’t measuring what you think it is.',
      'كان واحد وأربعون سؤالًا وأربعة أسئلة كلاهما في ورقة الإحصاء. واحدة فقط من تلك الغرفتين كانت تفكّر. الرقم الذي لا يستطيع التمييز بينهما لا يقيس ما تظنه يقيس.',
    ),
  },
  points: { scenes: 40, pattern: 30, risk: 20, coaching: 40 },
  badgeTriggers: ['thinking-architect', 'mutation-hunter'],
};
