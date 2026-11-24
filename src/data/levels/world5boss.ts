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
    'طرح الأسئلة هو بصمة هذه المدرسة. موجود في بيان الرؤية، وفي نموذج خطة الدرس، وفي كل معيار ملاحظة: «أسئلة متكررة ومتنوعة». يحصي الملاحظون الأسئلة في كل درس والأرقام رائعة. تُسلَّم ورقة الإحصاء إلى توكي، فيضعها في جيبه، ويقضي اليوم يعدّ شيئًا آخر: كم طالبًا، في كل غرفة، اضطر فعلًا إلى التفكير.',
  ),
  scenes: [
    {
      id: 'rubric',
      place: t('The observation rubric', 'معيار الملاحظة'),
      observation: t('"Questioning: frequency (1–5), variety (1–5)." No row for wait time. No row for how many students responded. No row for what the answers contained.', '«طرح الأسئلة: التكرار (١–٥)، التنوّع (١–٥).» لا صف لوقت الانتظار. لا صف لعدد الطلاب المجيبين. لا صف لما احتوته الإجابات.'),
      fitsPattern: true,
      finding: t('The rubric counts questions and is blind to thinking. Teachers are being observed into asking more and waiting less.', 'يعدّ المعيار الأسئلة وهو أعمى عن التفكير. يُلاحَظ المعلّمون حتى يسألوا أكثر وينتظروا أقل.'),
      hint: t('What does the rubric make visible, and what does it hide?', 'ما الذي يجعله المعيار مرئيًا، وما الذي يخفيه؟'),
    },
    {
      id: 'grade-6',
      place: t('Grade 6 History', 'الصف السادس، تاريخ'),
      observation: t('Only four questions in the whole lesson. Each one is written on the board, everyone writes an answer, pairs compare, then three students are chosen. The observer’s tally would read "4 — low."', 'أربعة أسئلة فقط في الدرس كله. يُكتب كل سؤال على السبورة، يكتب الجميع إجابة، يتقارن الثنائيات، ثم يُختار ثلاثة طلاب. سيقرأ إحصاء الملاحظ «٤ — منخفض».'),
      fitsPattern: false,
      finding: t('Four questions, twenty-eight thinkers. This room fails the tally and passes the only test that matters.', 'أربعة أسئلة، ثمانية وعشرون مفكّرًا. ترسب هذه الغرفة في الإحصاء وتنجح في الاختبار الوحيد الذي يهم.'),
      hint: t('Count the thinkers, not the questions.', 'عدّ المفكّرين لا الأسئلة.'),
    },
    {
      id: 'grade-2',
      place: t('Grade 2 Phonics', 'الصف الثاني، صوتيات'),
      observation: t('Forty-one questions in twenty minutes — the observer is thrilled. Every one is a one-word recall, answered by whoever shouts first. The same six voices, over and over.', 'واحد وأربعون سؤالًا في عشرين دقيقة — الملاحظ مبتهج. كل سؤال تذكّر من كلمة واحدة، يجيب عنه من يصرخ أولًا. الأصوات الستة نفسها، مرارًا وتكرارًا.'),
      fitsPattern: true,
      finding: t('Maximum questioning, minimum thinking. The rubric’s ideal lesson is the world’s clearest drift.', 'أقصى قدر من الأسئلة، أدنى قدر من التفكير. الدرس المثالي بحسب المعيار هو أوضح انحراف في هذا العالم.'),
      hint: t('Forty-one questions. How many required a second of thought?', 'واحد وأربعون سؤالًا. كم منها تطلّب ثانية من التفكير؟'),
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
      { id: 'too-few', label: t('Teachers don’t ask enough questions', 'لا يطرح المعلّمون أسئلة كافية') },
      { id: 'counted', label: t('Questioning is measured by how often it happens, so it has drifted toward quantity and speed — and away from student thinking', 'يُقاس طرح الأسئلة بتكراره، فانحرف نحو الكمّ والسرعة — وبعيدًا عن تفكير الطلاب') },
      { id: 'stems', label: t('The question stems are too hard', 'جذور الأسئلة صعبة جدًا') },
      { id: 'shy', label: t('Students are too shy to answer', 'الطلاب خجولون جدًا عن الإجابة') },
    ],
    correctId: 'counted',
    hint: t('The two healthy rooms would score lowest on the rubric. What does the rubric reward?', 'ستحصل الغرفتان السليمتان على أدنى درجة في المعيار. ما الذي يكافئه المعيار؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'high',
    hint: t('Serious and spreading — the rubric actively pushes every teacher toward it. But the thinking habit survives in pockets, and the fix is a rubric row, not a culture change. High, not yet lethal.', 'خطير ومنتشر — يدفع المعيار كل معلّم نحوه فعليًا. لكن عادة التفكير تنجو في جيوب، والإصلاح صف في المعيار لا تغيير ثقافة. كبير، ليس قاتلًا بعد.'),
  },
  coaching: {
    prompt: t('The rubric, the stem bank, and the vision statement all say "questioning." What is the one move with the greatest impact?', 'المعيار وبنك الجذور وبيان الرؤية تقول كلها «طرح الأسئلة». ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'cap', label: t('Cap questions at ten per lesson', 'حدّد سقفًا للأسئلة بعشرة في كل درس') },
      { id: 'rubric', label: t('Replace the two rubric rows with two different ones: "wait time ≥ 3 seconds" and "proportion of students who produced an answer" — then re-observe the Grade 2 and Grade 6 rooms', 'استبدل صفّي المعيار بصفّين مختلفين: «وقت الانتظار ≥ ٣ ثوانٍ» و«نسبة الطلاب الذين أنتجوا إجابة» — ثم أعد ملاحظة الصفين الثاني والسادس') },
      { id: 'training', label: t('Run a questioning workshop for all staff', 'نظّم ورشة عن طرح الأسئلة لكل الهيئة') },
      { id: 'stems', label: t('Expand the stem bank to a hundred', 'وسّع بنك الجذور إلى مئة') },
    ],
    correctId: 'rubric',
    hint: t('Teachers are being shaped by what gets written down about them. Change what gets written down.', 'يتشكّل المعلّمون بما يُكتب عنهم. غيّر ما يُكتب.'),
  },
  reveal: {
    whatDrifted: t(
      'Questioning stopped being a way to make students think and became a thing the school counts. The count rose; the thinking concentrated in a few fast voices.',
      'توقف طرح الأسئلة عن كونه وسيلة لجعل الطلاب يفكّرون وصار شيئًا تعدّه المدرسة. ارتفع العدد؛ وتركّز التفكير في بضعة أصوات سريعة.',
    ),
    whyItHappened: t(
      'Questions are easy to count and thinking is not. Once the rubric chose the countable thing, every incentive in the building pointed the same way — and the best teachers started looking like the worst.',
      'الأسئلة سهلة العدّ والتفكير ليس كذلك. وما إن اختار المعيار الشيء القابل للعدّ، أشارت كل الحوافز في المبنى إلى الاتجاه نفسه — وبدأ أفضل المعلّمين يبدون كأسوئهم.',
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
