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
        { id: 'used', label: t('How the responses were used', 'كيف استُخدمت الإجابات') },
        { id: 'participation', label: t('How many students participated', 'كم طالبًا شارك') },
        { id: 'difficulty', label: t('How difficult the questions were', 'مدى صعوبة الأسئلة') },
        { id: 'speed', label: t('How quickly students finished', 'مدى سرعة إنهاء الطلاب') },
      ],
      correctId: 'used',
      hint: t('An exit ticket is a question the teacher asks of the lesson. Was the answer ever read?', 'بطاقة الخروج سؤال يطرحه المعلّم على الدرس. هل قُرئت الإجابة أصلًا؟'),
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
        { id: 'shorter', label: t('Make the exit tickets shorter so they’re easier to collect', 'اجعل بطاقات الخروج أقصر ليسهل جمعها') },
        { id: 'inform', label: t('Use each ticket to decide the first five minutes of the next lesson', 'استخدم كل بطاقة لتقرير الدقائق الخمس الأولى من الدرس التالي') },
        { id: 'grade', label: t('Grade the tickets and enter them in the markbook', 'ضع درجات للبطاقات وأدخلها في سجلّ الدرجات') },
        { id: 'stop', label: t('Stop using exit tickets — they take time', 'توقّف عن بطاقات الخروج — فهي تستهلك الوقت') },
      ],
      correctId: 'inform',
      hint: t('The ticket isn’t the problem. The problem is that nothing happens after it. What would close the loop?', 'البطاقة ليست المشكلة. المشكلة أن لا شيء يحدث بعدها. ما الذي يغلق الحلقة؟'),
    },
    reasoning: {
      prompt: t('Why does tomorrow’s first five minutes matter so much?', 'لماذا تهمّ الدقائق الخمس الأولى من الغد إلى هذا الحد؟'),
      options: [
        { id: 'r1', label: t('It makes the lesson start on time', 'تجعل الدرس يبدأ في موعده') },
        { id: 'r2', label: t('It turns the ticket into an instructional decision — assessment only counts when it changes what the teacher does next', 'تحوّل البطاقة إلى قرار تدريسي — فالتقييم لا يُحتسب إلا حين يغيّر ما يفعله المعلّم بعده') },
        { id: 'r3', label: t('Students like seeing their tickets mentioned', 'يحب الطلاب أن تُذكر بطاقاتهم') },
        { id: 'r4', label: t('It fills time while the class settles', 'تملأ الوقت ريثما يستقر الصف') },
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
        { id: 'improved', label: t('How students improved afterwards', 'كيف تحسّن الطلاب بعدها') },
        { id: 'recorded', label: t('How scores were recorded', 'كيف سُجّلت الدرجات') },
        { id: 'fast', label: t('How quickly work was marked', 'مدى سرعة التصحيح') },
        { id: 'displayed', label: t('How marks were displayed', 'كيف عُرضت الدرجات') },
      ],
      correctId: 'improved',
      hint: t('A mark tells a student where they are. What tells them where to go?', 'الدرجة تخبر الطالب أين هو. ما الذي يخبره إلى أين يذهب؟'),
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
        { id: 'faster', label: t('Return marked work even faster', 'أعد الأعمال المصحّحة أسرع') },
        { id: 'next-step', label: t('Replace the number with one specific next step each student acts on', 'استبدل الرقم بخطوة تالية محددة واحدة يعمل بها كل طالب') },
        { id: 'rubric', label: t('Attach the full rubric to every paper', 'أرفق معيار التقييم الكامل بكل ورقة') },
        { id: 'parents', label: t('Send scores home to parents weekly', 'أرسل الدرجات إلى أولياء الأمور أسبوعيًا') },
      ],
      correctId: 'next-step',
      hint: t('More information isn’t the answer. One usable instruction is.', 'المزيد من المعلومات ليس الحل. تعليمة واحدة قابلة للتطبيق هي الحل.'),
    },
    reasoning: {
      prompt: t('Why one step rather than a full rubric?', 'لماذا خطوة واحدة بدل معيار كامل؟'),
      options: [
        { id: 'r1', label: t('It’s quicker for the teacher to write', 'أسرع في الكتابة للمعلّم') },
        { id: 'r2', label: t('Feedback works when a student can act on it today — one clear move gets used; a wall of criteria gets folded into a bag', 'تنجح التغذية الراجعة حين يستطيع الطالب العمل بها اليوم — خطوة واضحة واحدة تُستخدم؛ وجدار من المعايير يُطوى في الحقيبة') },
        { id: 'r3', label: t('Rubrics are confusing for students', 'المعايير محيّرة للطلاب') },
        { id: 'r4', label: t('Fewer comments mean fewer complaints', 'تعليقات أقل تعني شكاوى أقل') },
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
        { id: 'shaped', label: t('How the data shaped instruction', 'كيف شكّلت البيانات التدريس') },
        { id: 'updated', label: t('How often the data was updated', 'كم مرة حُدّثت البيانات') },
        { id: 'opened', label: t('How many reports were opened', 'كم تقريرًا فُتح') },
        { id: 'presented', label: t('How the results were presented', 'كيف عُرضت النتائج') },
      ],
      correctId: 'shaped',
      hint: t('A red line for six weeks is a question. Who answered it?', 'خط أحمر لستة أسابيع هو سؤال. من أجاب عنه؟'),
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
        { id: 'more-metrics', label: t('Add more metrics to the dashboard', 'أضف مقاييس أكثر إلى اللوحة') },
        { id: 'decision', label: t('Pair every red cell with one decision: reteach, regroup, or extend — by name', 'اقرن كل خانة حمراء بقرار واحد: إعادة تدريس أو إعادة تجميع أو إثراء — بالاسم') },
        { id: 'share', label: t('Share the dashboard with students so they own their data', 'شارك اللوحة مع الطلاب ليمتلكوا بياناتهم') },
        { id: 'less', label: t('Track less often to save time', 'تابع بتكرار أقل لتوفير الوقت') },
      ],
      correctId: 'decision',
      hint: t('The dashboard already asks the right questions. What would make the teacher answer them?', 'اللوحة تطرح الأسئلة الصحيحة أصلًا. ما الذي يجعل المعلّم يجيب عنها؟'),
    },
    reasoning: {
      prompt: t('Why attach a decision to each cell rather than discuss the dashboard generally?', 'لماذا نربط قرارًا بكل خانة بدل مناقشة اللوحة عمومًا؟'),
      options: [
        { id: 'r1', label: t('It makes the dashboard look more complete', 'يجعل اللوحة تبدو أكثر اكتمالًا') },
        { id: 'r2', label: t('Data becomes meaningful only when it leads to a specific action for specific students — a named decision is the bridge from tracking to teaching', 'لا تصبح البيانات ذات معنى إلا حين تقود إلى فعل محدد لطلاب محددين — القرار المسمّى هو الجسر من المتابعة إلى التدريس') },
        { id: 'r3', label: t('Leadership asks for evidence of data use', 'تطلب القيادة دليلًا على استخدام البيانات') },
        { id: 'r4', label: t('It gives the teacher a reason to open the dashboard', 'يمنح المعلّم سببًا لفتح اللوحة') },
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
        { id: 'depth', label: t('Depth of student understanding', 'عمق فهم الطلاب') },
        { id: 'pass', label: t('Percentage of passing scores', 'نسبة الدرجات الناجحة') },
        { id: 'speed', label: t('Speed of test completion', 'سرعة إنهاء الاختبار') },
        { id: 'entry', label: t('Accuracy of score entry', 'دقة إدخال الدرجات') },
      ],
      correctId: 'depth',
      hint: t('A test can measure how well students learned the test. What did Toki’s off-script question measure?', 'قد يقيس الاختبار مدى إتقان الطلاب للاختبار نفسه. ماذا قاس سؤال توكي الخارج عن النص؟'),
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
        { id: 'harder', label: t('Make the next test harder', 'اجعل الاختبار التالي أصعب') },
        { id: 'transfer', label: t('Add two transfer questions in a new context — and bring the idea back in three weeks', 'أضف سؤالَي نقل في سياق جديد — وأعد الفكرة بعد ثلاثة أسابيع') },
        { id: 'retest', label: t('Retest everyone on the same questions', 'أعد اختبار الجميع في الأسئلة نفسها') },
        { id: 'celebrate', label: t('Celebrate the 86% and move on as planned', 'احتفل بنسبة ٨٦٪ وانتقل كما هو مخطط') },
      ],
      correctId: 'transfer',
      hint: t('Harder isn’t the point. Different is — a situation the worksheet never rehearsed.', 'الأصعب ليس المقصود. المختلف هو المقصود — موقف لم تتدرّب عليه ورقة العمل.'),
    },
    reasoning: {
      prompt: t('Why does a transfer question reveal what the unit test can’t?', 'لماذا يكشف سؤال النقل ما لا يستطيع اختبار الوحدة كشفه؟'),
      options: [
        { id: 'r1', label: t('It’s harder, so fewer students get it right', 'أصعب، فيُصيب عدد أقل من الطلاب') },
        { id: 'r2', label: t('Understanding shows up when a student applies an idea somewhere it was never practised — rehearsed questions can be passed by memory alone', 'يظهر الفهم حين يطبّق الطالب فكرة في موضع لم يتدرّب عليه قط — فالأسئلة المتدرَّب عليها يمكن اجتيازها بالحفظ وحده') },
        { id: 'r3', label: t('It looks more rigorous to leadership', 'يبدو أكثر صرامة أمام القيادة') },
        { id: 'r4', label: t('It stops students from guessing', 'يمنع الطلاب من التخمين') },
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
