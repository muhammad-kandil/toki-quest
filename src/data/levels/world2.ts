/**
 * WORLD 2 — Assessment Under the Microscope
 * Theme: When Assessment Stops Informing Learning
 * Core idea: assessment should shape instruction, not simply measure it.
 *
 * Authored from the team's v2 spec. Each level fills the spec's skeleton
 * (observation / investigation / risk / coaching) out to the engine's
 * five-beat shape: scenario, evidence to inspect, drift, risk, coaching,
 * an optional reasoning bonus, and the three-part reveal.
 *
 * Scenes reuse the existing classroom art until World 2 art is produced.
 */
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import scenePerfect from '../../assets/scenes/classroom-6-perfect.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_21: LevelDefinition = {
  id: 21,
  title: t('The Exit Ticket', 'بطاقة الخروج'),
  theme: t('Collected ≠ Used', 'جُمعت ≠ استُخدمت'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneAssess,
  scenario: t(
    'At the end of every lesson, students complete an exit ticket. The teacher collects them before students leave, every single day, without fail. The routine is tight and the pile of tickets is neat. Toki asks what happens to them next.',
    'في نهاية كل درس يملأ الطلاب بطاقة خروج. يجمعها المعلّم قبل أن يغادروا، كل يوم دون استثناء. الروتين محكم وكومة البطاقات مرتّبة. يسأل توكي: وماذا يحدث لها بعد ذلك؟',
  ),
  evidence: [
    { id: 'pile', x: 24, y: 40, label: t('The pile', 'الكومة'), clue: t('Yesterday’s tickets, and last week’s. Still rubber-banded. Still unread.', 'بطاقات الأمس وبطاقات الأسبوع الماضي. ما زالت مربوطة. ما زالت غير مقروءة.') },
    { id: 'ticket', x: 55, y: 66, label: t('One ticket', 'بطاقة واحدة'), clue: t('Three of five students got question 2 wrong. The same way.', 'ثلاثة من خمسة طلاب أخطؤوا في السؤال ٢. بالطريقة نفسها.') },
    { id: 'tomorrow', x: 80, y: 30, label: t('Tomorrow’s plan', 'خطة الغد'), clue: t('Starts the next topic. Question 2 never comes back.', 'تبدأ بالموضوع التالي. السؤال ٢ لا يعود أبدًا.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Toki watches the collection routine. What is the most important follow-up?', 'يراقب توكي روتين الجمع. ما أهم متابعة؟'),
      options: [
        { id: 'alignment', label: t('Whether the ticket question matched the lesson objective', 'هل طابق سؤال البطاقة هدف الدرس') },
        { id: 'timing', label: t('Whether the ticket comes early enough to act on in the lesson', 'هل تأتي البطاقة مبكرًا بما يكفي للعمل بها في الدرس') },
        { id: 'used', label: t('What the responses changed about the next lesson', 'ما الذي غيّرته الإجابات في الدرس التالي') },
        { id: 'consistency', label: t('Whether every student answered the same question', 'هل أجاب كل الطلاب عن السؤال نفسه') },
      ],
      correctId: 'used',
      hint: t('Look at the pile and at tomorrow’s plan. Three of five got question 2 wrong — where does that fact go next?', 'انظر إلى الكومة وإلى خطة الغد. ثلاثة من خمسة أخطؤوا في السؤال ٢ — إلى أين تذهب هذه الحقيقة بعد ذلك؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The routine is perfect and the information is thrown away. The practice looks alive but does nothing — that’s the definition of a lethal mutation.', 'الروتين مثالي والمعلومة تُهمل. الممارسة تبدو حيّة لكنها لا تفعل شيئًا — هذا هو تعريف التحوّر القاتل.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'same-lesson', label: t('Move the ticket to minute 30 so the teacher can respond before the bell', 'انقل البطاقة إلى الدقيقة ٣٠ ليستطيع المعلّم الاستجابة قبل الجرس') },
        { id: 'self-mark', label: t('Have students self-mark against the answer and keep their own ticket', 'دع الطلاب يصحّحون لأنفسهم مقابل الإجابة ويحتفظون ببطاقاتهم') },
        { id: 'return', label: t('Return the tickets next day with a tick or a cross on each one', 'أعد البطاقات في اليوم التالي بعلامة صح أو خطأ على كل منها') },
        { id: 'inform', label: t('Sort tonight’s tickets into three piles; the piles set tomorrow’s first task', 'افرز بطاقات الليلة في ثلاث كومات ودع الكومات تحدّد مهمة الغد الأولى') },
      ],
      correctId: 'inform',
      hint: t('Two of these keep the ticket in the students’ hands; one moves it earlier. Which one changes what the teacher does with question 2?', 'اثنتان من هذه تُبقي البطاقة في أيدي الطلاب؛ وواحدة تقدّمها زمنيًا. أيّها يغيّر ما يفعله المعلّم بالسؤال ٢؟'),
    },
    reasoning: {
      prompt: t('Why does tomorrow’s first five minutes matter so much?', 'لماذا تهمّ الدقائق الخمس الأولى من الغد إلى هذا الحد؟'),
      options: [
        { id: 'r1', label: t('Yesterday’s tickets are the freshest evidence the teacher holds', 'بطاقات الأمس هي أحدث دليل بيد المعلّم') },
        { id: 'r3', label: t('Starting from the tickets shows students their work is read', 'البدء من البطاقات يُري الطلاب أن عملهم يُقرأ') },
        { id: 'r2', label: t('Assessment only counts when it changes what the teacher does next', 'لا يُحتسب التقييم إلا حين يغيّر ما يفعله المعلّم بعده') },
        { id: 'r4', label: t('A misconception left overnight hardens by the next morning', 'الفهم الخاطئ المتروك ليلة يتصلّب بحلول الصباح') },
      ],
      correctId: 'r2',
      hint: t('What is the difference between collecting evidence and acting on it?', 'ما الفرق بين جمع الدليل والعمل به؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'The exit ticket has become a closing ritual instead of an opening question. Evidence is collected faithfully and then never used.',
      'أصبحت بطاقة الخروج طقس ختام لا سؤال افتتاح. يُجمع الدليل بأمانة ثم لا يُستخدم أبدًا.',
    ),
    whyItHappened: t(
      'Collecting is visible and quick; reading and responding is invisible and slow. Under time pressure the visible half survives and the useful half quietly disappears.',
      'الجمع مرئي وسريع؛ والقراءة والاستجابة خفيّتان وبطيئتان. تحت ضغط الوقت يبقى النصف المرئي ويختفي النصف المفيد بهدوء.',
    ),
    howToRestore: t(
      'Assessment should inform the next instructional decision, not simply conclude the lesson. Read three tickets at the door, and let what you see decide how tomorrow starts.',
      'ينبغي للتقييم أن يوجّه القرار التدريسي التالي، لا أن يختم الدرس فحسب. اقرأ ثلاث بطاقات عند الباب، ودع ما تراه يقرّر كيف يبدأ الغد.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_22: LevelDefinition = {
  id: 22,
  title: t('Marks Without Feedback', 'درجات بلا تغذية راجعة'),
  theme: t('A Score ≠ A Next Step', 'الدرجة ≠ الخطوة التالية'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneTalk,
  scenario: t(
    'Students receive their marked essays. Scores are written clearly at the top in red, and every student knows at once whether they passed or failed. The marking was fast, consistent, and returned within a day. Toki watches what students do with the paper.',
    'يتسلّم الطلاب مقالاتهم المصحّحة. الدرجات مكتوبة بوضوح في الأعلى بالأحمر، ويعرف كل طالب فورًا هل نجح أم رسب. كان التصحيح سريعًا ومتّسقًا وأُعيد خلال يوم. يراقب توكي ما يفعله الطلاب بالورقة.',
  ),
  evidence: [
    { id: 'essay', x: 30, y: 62, label: t('A marked essay', 'مقال مصحّح'), clue: t('"14/20". One tick, one circle around a paragraph. No words.', '«١٤/٢٠». علامة صح واحدة، ودائرة حول فقرة. لا كلمات.') },
    { id: 'student', x: 62, y: 70, label: t('A student', 'طالب'), clue: t('Looks at the number, folds the paper in half, puts it in the bag. Eight seconds.', 'ينظر إلى الرقم، يطوي الورقة نصفين، يضعها في الحقيبة. ثماني ثوانٍ.') },
    { id: 'next', x: 78, y: 34, label: t('Next essay', 'المقال التالي'),  clue: t('Same paragraph problem, same student, two weeks later.', 'مشكلة الفقرة نفسها، والطالب نفسه، بعد أسبوعين.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The marks are accurate. What should Toki look for next?', 'الدرجات دقيقة. ما الذي ينبغي أن يبحث عنه توكي بعد ذلك؟'),
      options: [
        { id: 'criteria', label: t('Whether students knew the criteria before they wrote', 'هل عرف الطلاب المعايير قبل أن يكتبوا') },
        { id: 'moderated', label: t('Whether the marks are consistent across the three classes', 'هل الدرجات متّسقة عبر الصفوف الثلاثة') },
        { id: 'explained', label: t('Whether the circled paragraphs were discussed in class', 'هل نوقشت الفقرات المحاطة بدائرة في الصف') },
        { id: 'improved', label: t('What changed in the next piece of writing', 'ما الذي تغيّر في القطعة الكتابية التالية') },
      ],
      correctId: 'improved',
      hint: t('Look at the next essay: same paragraph problem, same student, two weeks later. Which option would have caught that?', 'انظر إلى المقال التالي: مشكلة الفقرة نفسها، الطالب نفسه، بعد أسبوعين. أي خيار كان سيلتقط ذلك؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('Marking is happening and it’s fair — the system works. What’s missing is the part that makes it useful. That’s a drift to fix soon, not a collapse.', 'التصحيح يحدث وهو عادل — النظام يعمل. الغائب هو الجزء الذي يجعله مفيدًا. هذا انحراف يُصلَح قريبًا، لا انهيار.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'next-step', label: t('One named next step instead of the number, then ten minutes to apply it', 'استبدل الرقم بخطوة تالية مسمّاة، ثم عشر دقائق لتطبيقها') },
        { id: 'rubric', label: t('Return the essay with the rubric row that cost the marks highlighted', 'أعد المقال مع تظليل صف المعيار الذي خسر الدرجات') },
        { id: 'conference', label: t('Hold a two-minute conference with each student about their score', 'اعقد مقابلة من دقيقتين مع كل طالب حول درجته') },
        { id: 'redraft', label: t('Ask every student to redraft the essay for a higher mark', 'اطلب من كل طالب إعادة صياغة المقال لدرجة أعلى') },
      ],
      correctId: 'next-step',
      hint: t('Remember the eight seconds. Which option survives a student who reads one line and folds the paper — and gives him time to use it?', 'تذكّر الثواني الثماني. أي خيار ينجو من طالب يقرأ سطرًا واحدًا ويطوي الورقة — ويمنحه وقتًا لاستخدامه؟'),
    },
    reasoning: {
      prompt: t('Why one step rather than a full rubric?', 'لماذا خطوة واحدة بدل معيار كامل؟'),
      options: [
        { id: 'r1', label: t('Students read the first line and skip the rest', 'يقرأ الطلاب السطر الأول ويتخطّون البقية') },
        { id: 'r2', label: t('Feedback works only when the student can act on it today', 'لا تنجح التغذية الراجعة إلا حين يستطيع الطالب العمل بها اليوم') },
        { id: 'r3', label: t('A rubric row names the criterion but not the move', 'يسمّي صف المعيار المعيارَ لا الخطوة') },
        { id: 'r4', label: t('One comment per student is easier for the teacher to track', 'تعليق واحد لكل طالب أسهل على المعلّم في المتابعة') },
      ],
      correctId: 'r2',
      hint: t('Think about the eight seconds. What could survive them?', 'فكّر في الثواني الثماني. ما الذي يمكن أن ينجو منها؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Marking has become a verdict rather than a conversation. Students learn their level, but not their next move.',
      'أصبح التصحيح حكمًا لا حوارًا. يعرف الطلاب مستواهم، لكن لا يعرفون خطوتهم التالية.',
    ),
    whyItHappened: t(
      'A number is fast, fair, and easy to record. Over time the number becomes the whole product, and the guidance it was supposed to carry falls away.',
      'الرقم سريع وعادل وسهل التسجيل. ومع الوقت يصبح الرقم هو المنتج كله، ويسقط التوجيه الذي كان من المفترض أن يحمله.',
    ),
    howToRestore: t(
      'Feedback should help students understand their next steps, not only show their level. One specific, doable instruction — then time in class to act on it.',
      'ينبغي للتغذية الراجعة أن تساعد الطلاب على فهم خطواتهم التالية، لا أن تُظهر مستواهم فقط. تعليمة واحدة محددة قابلة للتنفيذ — ثم وقت في الصف للعمل بها.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_23: LevelDefinition = {
  id: 23,
  title: t('The Data Dashboard', 'لوحة البيانات'),
  theme: t('Tracked ≠ Taught', 'مُتابَع ≠ مُدرَّس'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'The teacher opens a data dashboard and shows Toki that class performance has been tracked every week since September. Trend lines, colour bands, averages by strand — it is genuinely impressive, and the teacher is rightly proud of the discipline it took. Toki looks at the lesson plan beside it.',
    'يفتح المعلّم لوحة بيانات ويُري توكي أن أداء الصف قد تُوبع كل أسبوع منذ سبتمبر. خطوط اتجاه وأشرطة ملوّنة ومتوسطات لكل محور — إنها مبهرة فعلًا، والمعلّم فخور عن حق بالانضباط الذي تطلّبته. ينظر توكي إلى خطة الدرس بجانبها.',
  ),
  evidence: [
    { id: 'chart', x: 50, y: 28, label: t('The chart', 'الرسم البياني'), clue: t('Strand 3 has been red for six weeks. The line is perfectly flat.', 'المحور ٣ أحمر منذ ستة أسابيع. الخط مستوٍ تمامًا.') },
    { id: 'plan', x: 24, y: 66, label: t('This week’s plan', 'خطة هذا الأسبوع'), clue: t('Whole class, same sequence, same pace as the scheme of work. Strand 3 isn’t mentioned.', 'الصف كله، التسلسل نفسه، الإيقاع نفسه في الخطة الدراسية. المحور ٣ غير مذكور.') },
    { id: 'groups', x: 78, y: 64, label: t('Seating', 'الجلوس'), clue: t('Same seats as September. Nobody has been regrouped around a need.', 'المقاعد نفسها منذ سبتمبر. لم يُعَد تجميع أحد حول حاجة.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The dashboard is accurate and up to date. What matters most in this moment?', 'لوحة البيانات دقيقة ومحدّثة. ما الأهم في هذه اللحظة؟'),
      options: [
        { id: 'accuracy', label: t('Whether the dashboard agrees with the markbook', 'هل تتطابق اللوحة مع سجلّ الدرجات') },
        { id: 'shaped', label: t('What the dashboard changed in this week’s plan', 'ما الذي غيّرته اللوحة في خطة هذا الأسبوع') },
        { id: 'granularity', label: t('Whether it tracks by student, not only by strand', 'هل تتابع كل طالب، لا المحاور فقط') },
        { id: 'shared', label: t('Whether students can see their own strand lines', 'هل يستطيع الطلاب رؤية خطوط محاورهم') },
      ],
      correctId: 'shaped',
      hint: t('Strand 3 has been red for six weeks. Open the plan and the seating chart — which option asks where those six weeks went?', 'المحور ٣ أحمر منذ ستة أسابيع. افتح الخطة ومخطط الجلوس — أي خيار يسأل أين ذهبت تلك الأسابيع الستة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The teacher genuinely knows where students struggle — and teaches as if they didn’t. Knowing without acting, week after week, is a serious drift.', 'يعرف المعلّم فعلًا أين يتعثّر الطلاب — ويدرّس كأنه لا يعرف. المعرفة دون فعل، أسبوعًا بعد أسبوع، انحراف خطير.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'student', label: t('Give each student their own strand line and a weekly target', 'أعطِ كل طالب خط محوره الخاص وهدفًا أسبوعيًا') },
        { id: 'regroup', label: t('Regroup the seating around strand 3 using this week’s dashboard scores', 'أعد تجميع الجلوس حول المحور ٣ باستخدام درجات اللوحة') },
        { id: 'decision', label: t('Pair every red cell with a named decision: reteach, regroup, or extend', 'اقرن كل خانة حمراء بقرار مسمّى: إعادة تدريس أو تجميع أو إثراء') },
        { id: 'reteach', label: t('Reteach strand 3 to the whole class in next week’s plan', 'أعد تدريس المحور ٣ للصف كله في خطة الأسبوع القادم') },
      ],
      correctId: 'decision',
      hint: t('Regrouping and reteaching both answer strand 3 — once. What answers next month’s red cell when strand 3 is green?', 'إعادة التجميع وإعادة التدريس تجيبان عن المحور ٣ — مرة واحدة. ما الذي يجيب عن الخانة الحمراء في الشهر القادم حين يصبح المحور ٣ أخضر؟'),
    },
    reasoning: {
      prompt: t('Why attach a decision to each cell rather than discuss the dashboard generally?', 'لماذا نربط قرارًا بكل خانة بدل مناقشة اللوحة عمومًا؟'),
      options: [
        { id: 'r1', label: t('A decision with names on it cannot be postponed to next month', 'القرار الذي تحمله أسماء لا يمكن تأجيله') },
        { id: 'r3', label: t('Leadership can audit decisions, not discussions', 'تستطيع القيادة تدقيق القرارات لا النقاشات') },
        { id: 'r4', label: t('Whole-class reteaching wastes the green students’ time', 'إعادة التدريس للصف كله تهدر وقت الطلاب الخُضر') },
        { id: 'r2', label: t('Data counts only when it changes what happens for specific students', 'لا تعني البيانات شيئًا إلا حين تغيّر ما يحدث لطلاب بعينهم') },
      ],
      correctId: 'r2',
      hint: t('What is the dashboard for, in the end?', 'ما الغاية من اللوحة في النهاية؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Tracking has replaced responding. The data is excellent and the teaching is unchanged by it.',
      'حلّت المتابعة محلّ الاستجابة. البيانات ممتازة والتدريس لم يتغيّر بها.',
    ),
    whyItHappened: t(
      'A dashboard rewards the discipline of updating it. That discipline feels like data use — but a chart that never changes a lesson is a diary, not a tool.',
      'تكافئ اللوحة انضباط تحديثها. يبدو ذلك الانضباط كاستخدام للبيانات — لكن رسمًا بيانيًا لا يغيّر درسًا أبدًا هو مذكّرات لا أداة.',
    ),
    howToRestore: t(
      'Data becomes meaningful when it leads to decisions, support, reteaching, or extension. Every red cell gets a decision and a date.',
      'تصبح البيانات ذات معنى حين تقود إلى قرارات ودعم وإعادة تدريس وإثراء. كل خانة حمراء تحصل على قرار وتاريخ.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_24: LevelDefinition = {
  id: 24,
  title: t('End-of-Unit Success', 'نجاح نهاية الوحدة'),
  theme: t('A High Score ≠ Deep Understanding', 'الدرجة العالية ≠ الفهم العميق'),
  subject: t('Science', 'العلوم'),
  sceneImage: scenePerfect,
  scenario: t(
    'Most students scored highly on the end-of-unit test — a class average of 86%. The teacher is pleased, the students are relieved, and the plan moves confidently to the next unit on Monday. Toki asks to see the test, and then asks one student a question that isn’t on it.',
    'حصل معظم الطلاب على درجات عالية في اختبار نهاية الوحدة — متوسط الصف ٨٦٪. المعلّم راضٍ، والطلاب مرتاحون، والخطة تنتقل بثقة إلى الوحدة التالية يوم الاثنين. يطلب توكي رؤية الاختبار، ثم يسأل طالبًا سؤالًا ليس فيه.',
  ),
  evidence: [
    { id: 'test', x: 26, y: 62, label: t('The test', 'الاختبار'), clue: t('Twenty questions. Eighteen are the worksheet questions with the numbers changed.', 'عشرون سؤالًا. ثمانية عشر منها أسئلة ورقة العمل بأرقام مختلفة.') },
    { id: 'student', x: 60, y: 70, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"Why does that happen?" — "We didn’t do that one." She scored 90%.', '«لماذا يحدث ذلك؟» — «لم نأخذ هذا السؤال.» حصلت على ٩٠٪.') },
    { id: 'board', x: 52, y: 26, label: t('Monday', 'الاثنين'), clue: t('New unit. Nothing from this one returns — not in a month, not in a term.', 'وحدة جديدة. لا شيء من هذه الوحدة يعود — لا بعد شهر ولا بعد فصل.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The scores are real. What should Toki examine before the class moves on?', 'الدرجات حقيقية. ما الذي ينبغي أن يفحصه توكي قبل أن ينتقل الصف؟'),
      options: [
        { id: 'validity', label: t('Whether the test covered every objective in the unit', 'هل غطّى الاختبار كل أهداف الوحدة') },
        { id: 'spread', label: t('Who the lower-scoring 14% are and what they missed', 'مَن هم الـ١٤٪ الأدنى وما الذي فاتهم') },
        { id: 'depth', label: t('Whether the understanding survives an unfamiliar question', 'هل يصمد الفهم أمام سؤال غير مألوف') },
        { id: 'marking', label: t('Whether the mark scheme rewarded method as well as answers', 'هل كافأ سلّم التصحيح الطريقة كما كافأ الإجابات') },
      ],
      correctId: 'depth',
      hint: t('Eighteen of twenty questions were the worksheet with new numbers, and a 90% student said "we didn’t do that one". Which option follows that trail?', 'ثمانية عشر من عشرين سؤالًا كانت ورقة العمل بأرقام جديدة، وطالبة بـ٩٠٪ قالت «لم نأخذ هذا السؤال». أي خيار يتبع هذا الأثر؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('High scores are closing the file on understanding that isn’t there yet. It’s not fatal — the learning can still be built — but moving on now makes it much harder.', 'الدرجات العالية تغلق الملف على فهم لم يتحقق بعد. ليس قاتلًا — يمكن بناء التعلّم بعد — لكن الانتقال الآن يجعله أصعب بكثير.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'novel', label: t('Rewrite next unit’s test so no question mirrors the worksheet', 'أعد كتابة اختبار الوحدة القادمة بحيث لا يعكس أي سؤال ورقة العمل') },
        { id: 'transfer', label: t('Add two unfamiliar-context questions now and revisit the idea in three weeks', 'أضف سؤالَي نقل في سياق جديد، وأعد زيارة الفكرة بعد ثلاثة أسابيع') },
        { id: 'reopen', label: t('Keep the unit open one more week and reteach the two weakest questions to all', 'أبقِ الوحدة مفتوحة أسبوعًا آخر وأعد تدريس السؤالين الأضعف') },
        { id: 'extend', label: t('Give the students who scored above 80% an extension task before Monday', 'أعطِ الطلاب فوق ٨٠٪ مهمة إثراء قبل الاثنين') },
      ],
      correctId: 'transfer',
      hint: t('Fixing the next test helps the next unit, not this one. Reteaching the weakest questions treats the 14%, not the 90% who "didn’t do that one". What checks this unit, now and later?', 'إصلاح الاختبار القادم يخدم الوحدة القادمة لا هذه. إعادة تدريس الأضعف تعالج الـ١٤٪ لا الـ٩٠٪ الذين «لم يأخذوا هذا السؤال». ما الذي يفحص هذه الوحدة، الآن ولاحقًا؟'),
    },
    reasoning: {
      prompt: t('Why does a transfer question reveal what the unit test can’t?', 'لماذا يكشف سؤال النقل ما لا يستطيع اختبار الوحدة كشفه؟'),
      options: [
        { id: 'r2', label: t('A rehearsed question can be passed from memory; an unfamiliar one cannot', 'السؤال المتدرَّب عليه يُجتاز بالحفظ؛ وغير المألوف لا يُجتاز إلا بالفهم') },
        { id: 'r1', label: t('A transfer question has no worksheet answer to copy', 'سؤال النقل لا يملك إجابة من ورقة العمل تُنسخ') },
        { id: 'r3', label: t('A lower score on it resets the teacher’s picture of the class', 'الدرجة الأدنى فيه تعيد ضبط صورة المعلّم عن الصف') },
        { id: 'r4', label: t('It checks that the method was taught, not only that the answers were memorised', 'يتحقق من أن الطريقة دُرّست، لا الإجابات فقط') },
      ],
      correctId: 'r2',
      hint: t('What did "We didn’t do that one" tell you about the 90%?', 'ماذا أخبرتك «لم نأخذ هذا السؤال» عن الـ٩٠٪؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'The test measured familiarity with the test. High scores closed the unit before understanding had been checked against anything new.',
      'قاس الاختبار الألفة بالاختبار. أغلقت الدرجات العالية الوحدة قبل أن يُفحص الفهم أمام أي شيء جديد.',
    ),
    whyItHappened: t(
      'When the test mirrors the practice, scores rise and everyone feels successful — the teacher, the students, the data. There is no signal that anything is wrong, which is exactly why it drifts.',
      'عندما يعكس الاختبار التدريب، ترتفع الدرجات ويشعر الجميع بالنجاح — المعلّم والطلاب والبيانات. لا توجد إشارة إلى أن شيئًا خاطئًا، وهذا بالضبط سبب الانحراف.',
    ),
    howToRestore: t(
      'Strong scores should still be checked against depth, transfer, and long-term understanding. Two unfamiliar questions now; the idea revisited in three weeks.',
      'ينبغي فحص الدرجات القوية مقابل العمق والنقل والفهم طويل الأمد. سؤالان غير مألوفين الآن؛ وإعادة زيارة الفكرة بعد ثلاثة أسابيع.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const WORLD_2_LEVELS = [LEVEL_21, LEVEL_22, LEVEL_23, LEVEL_24];
