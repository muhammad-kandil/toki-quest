/**
 * WORLD 3 — Alef in Action
 * Theme: Using Technology With Purpose
 * Core idea: technology should amplify thinking, not replace it.
 */
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
import scenePerfect from '../../assets/scenes/classroom-6-perfect.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_31: LevelDefinition = {
  id: 31,
  title: t('100% Completion', 'إنجاز ١٠٠٪'),
  theme: t('Completed ≠ Learned', 'مُنجَز ≠ مُتعلَّم'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'Every student has completed the assigned Alef lesson, and the teacher proudly shows Toki the dashboard: 100%, every name green. The class worked quietly and finished with ten minutes to spare. The teacher has been recognised twice this term for completion rates. Toki opens one student’s lesson.',
    'أكمل كل طالب درس ألف المحدد، ويعرض المعلّم بفخر على توكي لوحة البيانات: ١٠٠٪، كل اسم باللون الأخضر. عمل الصف بهدوء وأنهى قبل الموعد بعشر دقائق. حصل المعلّم على تقدير مرتين هذا الفصل لمعدلات الإنجاز. يفتح توكي درس أحد الطلاب.',
  ),
  evidence: [
    { id: 'dashboard', x: 52, y: 26, label: t('The dashboard', 'لوحة البيانات'), clue: t('100% completion. Average score on the lesson check: 41%.', 'إنجاز ١٠٠٪. متوسط الدرجة في اختبار الدرس: ٤١٪.') },
    { id: 'student', x: 25, y: 66, label: t('A student’s screen', 'شاشة طالب'), clue: t('Eleven minutes on a 25-minute lesson. The explanation video: skipped at 0:04.', 'إحدى عشرة دقيقة في درس مدته ٢٥ دقيقة. فيديو الشرح: تم تخطّيه عند ٠:٠٤.') },
    { id: 'teacher', x: 80, y: 60, label: t('The teacher', 'المعلّم'), clue: t('Marking at the desk. Hasn’t opened a student’s attempt — only the completion column.', 'يصحّح على مكتبه. لم يفتح محاولة أي طالب — عمود الإنجاز فقط.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The dashboard is green. What would Toki examine next?', 'لوحة البيانات خضراء. ما الذي سيفحصه توكي بعد ذلك؟'),
      options: [
        { id: 'time', label: t('Time on task per student against the lesson’s expected length', 'وقت كل طالب في المهمة مقابل المدة المتوقعة للدرس') },
        { id: 'evidence', label: t('Lesson-check scores and one opened attempt per group', 'درجات اختبار الدرس ومحاولة مفتوحة واحدة لكل مجموعة') },
        { id: 'fit', label: t('Whether the assigned lesson matched the week’s objective', 'هل طابق الدرس المكلَّف به هدف الأسبوع') },
        { id: 'skips', label: t('How many students skipped the explanation video', 'كم طالبًا تخطّى فيديو الشرح') },
      ],
      correctId: 'evidence',
      hint: t('Time and skips both describe how the lesson was done. One number on the dashboard describes what it produced — 41%. Which option goes there?', 'الوقت والتخطّي يصفان كيف أُنجز الدرس. رقم واحد على اللوحة يصف ما أنتجه — ٤١٪. أي خيار يذهب إلى هناك؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The metric everyone celebrates is the one that says nothing about learning — and 41% is hiding behind it. The practice has fully lost its purpose.', 'المقياس الذي يحتفل به الجميع هو الذي لا يقول شيئًا عن التعلّم — و٤١٪ تختبئ خلفه. فقدت الممارسة غايتها تمامًا.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'lock', label: t('Set a minimum time on the lesson and lock the video so it cannot be skipped', 'حدّد وقتًا أدنى للدرس واقفل الفيديو حتى لا يمكن تخطّيه') },
        { id: 'retake', label: t('Have every student below 60% on the check redo the lesson this week', 'دع كل طالب دون ٦٠٪ في الاختبار يعيد الدرس هذا الأسبوع') },
        { id: 'shift', label: t('Open three attempts with the teacher; let the check scores set tomorrow’s plan', 'افتح ثلاث محاولات مع المعلّم ودع درجات الاختبار تضع خطة الغد') },
        { id: 'report', label: t('Ask leadership to recognise check scores alongside completion', 'اطلب من القيادة تقدير درجات الاختبار إلى جانب الإنجاز') },
      ],
      correctId: 'shift',
      hint: t('Locking and redoing change what students must do; the leadership ask changes what gets praised. Which move changes what this teacher looks at tomorrow morning?', 'القفل وإعادة الدرس يغيّران ما يجب على الطلاب فعله؛ وطلب القيادة يغيّر ما يُمدح. أي خطوة تغيّر ما ينظر إليه هذا المعلّم صباح الغد؟'),
    },
    reasoning: {
      prompt: t('Why start the conversation with the lesson check rather than the completion column?', 'لماذا نبدأ الحديث باختبار الدرس لا بعمود الإنجاز؟'),
      options: [
        { id: 'r1', label: t('The check is the only column students cannot game by clicking faster', 'الاختبار هو العمود الوحيد الذي لا يستطيع الطلاب التلاعب به بالنقر أسرع') },
        { id: 'r2', label: t('What the teacher looks at first is what the class learns to optimise for', 'ما ينظر إليه المعلّم أولًا هو ما يتعلّم الصف تحسينه') },
        { id: 'r3', label: t('The check scores are the ones leadership will eventually ask about', 'درجات الاختبار هي ما ستسأل عنه القيادة في النهاية') },
        { id: 'r4', label: t('A 41% average is the more urgent number on that dashboard', 'متوسط ٤١٪ هو الرقم الأكثر إلحاحًا على تلك اللوحة') },
      ],
      correctId: 'r2',
      hint: t('What did the class learn to optimise for, and why?', 'ما الذي تعلّم الصف تحسينه، ولماذا؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Completion has become the goal. Students have learned how to finish an Alef lesson quickly; the teacher has learned to watch the column that rewards that.',
      'أصبح الإنجاز هو الهدف. تعلّم الطلاب كيف يُنهون درس ألف بسرعة؛ وتعلّم المعلّم مراقبة العمود الذي يكافئ ذلك.',
    ),
    whyItHappened: t(
      'Completion is the easiest number to see, report, and praise. When it gets recognised, it gets optimised — by teachers and students alike — and the lesson check quietly stops mattering.',
      'الإنجاز أسهل رقم يُرى ويُبلَّغ ويُمدَح. وحين يُقدَّر، يُحسَّن — من المعلّمين والطلاب على السواء — ويتوقف اختبار الدرس بهدوء عن أن يهم.',
    ),
    howToRestore: t(
      'Completion is valuable, but coaching should focus on what students understood, struggled with, and learned. Open three attempts together; let the check scores, not the green column, set tomorrow’s plan.',
      'الإنجاز قيّم، لكن التدريب ينبغي أن يركّز على ما فهمه الطلاب وما تعثّروا فيه وما تعلّموه. افتحا ثلاث محاولات معًا؛ ودعا درجات الاختبار، لا العمود الأخضر، تضع خطة الغد.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_32: LevelDefinition = {
  id: 32,
  title: t('Students on Devices', 'طلاب على الأجهزة'),
  theme: t('Quiet ≠ Thinking', 'الهدوء ≠ التفكير'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'All students are logged into Alef and working on their devices. The room is calm and focused — no chatter, no movement, every head down. The teacher tells Toki this is the best-behaved class in the grade. Toki walks the rows and looks at the screens, not the faces.',
    'كل الطلاب مسجّلون في ألف ويعملون على أجهزتهم. الغرفة هادئة ومركّزة — لا ثرثرة ولا حركة، كل الرؤوس منخفضة. يخبر المعلّم توكي أن هذا أفضل صف سلوكًا في المرحلة. يمشي توكي بين الصفوف وينظر إلى الشاشات لا الوجوه.',
  ),
  evidence: [
    { id: 'row1', x: 22, y: 64, label: t('Front row', 'الصف الأمامي'), clue: t('Three screens, same question, three different wrong answers submitted without a pause.', 'ثلاث شاشات، السؤال نفسه، ثلاث إجابات خاطئة مختلفة أُرسلت دون توقف.') },
    { id: 'row3', x: 58, y: 70, label: t('Back row', 'الصف الخلفي'), clue: t('A student has clicked through the same explanation four times. Stuck, silent, and not raising a hand.', 'طالب ضغط على الشرح نفسه أربع مرات. عالق وصامت ولا يرفع يده.') },
    { id: 'teacher', x: 80, y: 36, label: t('The teacher', 'المعلّم'), clue: t('At the front desk, watching the room, not the Alef live view. Calm.', 'على المكتب الأمامي، يراقب الغرفة لا عرض ألف المباشر. هادئ.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The room is silent and on-task. What should Toki check first?', 'الغرفة صامتة ومنهمكة. ما الذي ينبغي أن يتحقق منه توكي أولًا؟'),
      options: [
        { id: 'behaviour', label: t('Whether every student is on the assigned lesson, not another tab', 'هل كل طالب في الدرس المكلَّف به لا في تبويب آخر') },
        { id: 'pace', label: t('Whether the lesson’s pace suits the class — too fast, too slow', 'هل يناسب إيقاع الدرس الصف — أسرع أم أبطأ من اللازم') },
        { id: 'liveview', label: t('Whether the teacher has the Alef live view open', 'هل عرض ألف المباشر مفتوح عند المعلّم') },
        { id: 'thinking', label: t('What is happening on the screens between a question and an answer', 'ماذا يحدث على الشاشات بين السؤال والإجابة') },
      ],
      correctId: 'thinking',
      hint: t('Three wrong answers submitted without a pause, and a student clicking the same explanation four times. Which option looks at that — rather than at the teacher or the tabs?', 'ثلاث إجابات خاطئة أُرسلت دون توقف، وطالب يضغط على الشرح نفسه أربع مرات. أي خيار ينظر إلى ذلك — لا إلى المعلّم ولا إلى التبويبات؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The platform is doing its job and the students are present. What’s missing is the teacher’s eye on thinking — fixable soon, not yet undermining the lesson.', 'المنصة تؤدي وظيفتها والطلاب حاضرون. الغائب هو عين المعلّم على التفكير — يمكن إصلاحه قريبًا، ولم يقوّض الدرس بعد.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'pairs', label: t('Pair students on one device so stuck students have to talk before they click', 'ضع الطلاب في أزواج على جهاز واحد ليضطر العالق إلى الحديث قبل النقر') },
        { id: 'connect', label: t('Live view open, circulate with one question, pull two stuck students aside mid-lesson', 'العرض المباشر مفتوح، تجوّل بسؤال واحد، واسحب طالبين عالقين في منتصف الدرس') },
        { id: 'hands', label: t('Agree a signal — a red card on the desk — so stuck students can ask without speaking', 'اتفق على إشارة — بطاقة حمراء على الطاولة — ليطلب العالق المساعدة دون كلام') },
        { id: 'checkpoint', label: t('Stop the class twice a lesson for a whole-class check on the hardest question', 'أوقف الصف مرتين في الدرس لفحص جماعي للسؤال الأصعب') },
      ],
      correctId: 'connect',
      hint: t('Pairs, red cards and checkpoints all give students a way to signal. The back-row student has clicked the same explanation four times and signalled nothing. Which move does not depend on him signalling?', 'الأزواج والبطاقات الحمراء ونقاط الفحص كلها تمنح الطلاب طريقة للإشارة. طالب الصف الخلفي ضغط على الشرح نفسه أربع مرات ولم يُشر بشيء. أي خطوة لا تعتمد على إشارته؟'),
    },
    reasoning: {
      prompt: t('Why is active monitoring the lever here?', 'لماذا المراقبة النشطة هي الرافعة هنا؟'),
      options: [
        { id: 'r1', label: t('Students stay on task when they know the teacher can see their screen at any moment', 'يبقى الطلاب في المهمة حين يعرفون أن المعلّم يرى شاشاتهم') },
        { id: 'r3', label: t('The live view shows wrong answers faster than circulating can', 'يُظهر العرض المباشر الإجابات الخاطئة أسرع مما يستطيع التجوّل') },
        { id: 'r4', label: t('A stuck student who is helped once will ask for help next time', 'الطالب العالق الذي يُساعَد مرة سيطلب المساعدة في المرة التالية') },
        { id: 'r2', label: t('Devices make thinking private; monitoring makes it visible before silence becomes habit', 'يجعل الجهاز التفكير خاصًا؛ والمراقبة تجعله مرئيًا قبل أن يتعلّم الطلاب الصمت') },
      ],
      correctId: 'r2',
      hint: t('What did the student in the back row learn, besides the lesson?', 'ماذا تعلّم طالب الصف الخلفي، غير الدرس؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Calm has been read as learning. Students are behaving well and thinking alone — and alone, some of them are stuck without anyone noticing.',
      'قُرئ الهدوء تعلّمًا. يحسن الطلاب السلوك ويفكّرون وحدهم — ووحدهم يعلق بعضهم دون أن يلاحظ أحد.',
    ),
    whyItHappened: t(
      'A device turns thinking inward. The classroom signals a teacher usually reads — hands, faces, talk — go quiet, and quiet is easy to mistake for focus.',
      'يحوّل الجهاز التفكير إلى الداخل. تصمت الإشارات التي يقرؤها المعلّم عادةً — الأيدي والوجوه والحديث — والصمت يسهل الخلط بينه وبين التركيز.',
    ),
    howToRestore: t(
      'Device use should be connected to active learning, teacher monitoring, and purposeful follow-up. Live view open, circulate with a question, and act on what the screens show.',
      'ينبغي ربط استخدام الأجهزة بالتعلّم النشط ومراقبة المعلّم والمتابعة الهادفة. العرض المباشر مفتوح، تجوّل بسؤال، واعمل بما تُظهره الشاشات.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_33: LevelDefinition = {
  id: 33,
  title: t('Data Without Decisions', 'بيانات بلا قرارات'),
  theme: t('Reviewed ≠ Responded', 'مُراجَع ≠ مُستجاب له'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneOut,
  scenario: t(
    'The teacher reviews Alef data every Sunday evening — she shows Toki the routine with real pride, and the reports are annotated by hand. Then she continues with the same lesson sequence, for all students, at the same pace. Toki asks what changed last week because of the data.',
    'تراجع المعلّمة بيانات ألف كل مساء أحد — تُري توكي الروتين بفخر حقيقي، والتقارير معلّق عليها بخط اليد. ثم تواصل تسلسل الدروس نفسه، لكل الطلاب، بالإيقاع نفسه. يسأل توكي: ما الذي تغيّر الأسبوع الماضي بسبب البيانات؟',
  ),
  evidence: [
    { id: 'report', x: 26, y: 40, label: t('Annotated report', 'تقرير معلّق عليه'), clue: t('"Group B weak on fractions — again." Written three Sundays in a row.', '«المجموعة ب ضعيفة في الكسور — مجددًا.» مكتوبة ثلاثة أحاد متتالية.') },
    { id: 'plan', x: 56, y: 66, label: t('The week plan', 'خطة الأسبوع'), clue: t('Identical for all four groups. Fractions were covered in week 3; the plan has moved on.', 'متطابقة للمجموعات الأربع. غُطّيت الكسور في الأسبوع ٣؛ والخطة انتقلت.') },
    { id: 'alef', x: 80, y: 30, label: t('Alef assignment', 'تكليف ألف'), clue: t('One lesson assigned to the whole class. The platform’s "assign by group" has never been used.', 'درس واحد مكلَّف به الصف كله. خاصية «التكليف حسب المجموعة» في المنصة لم تُستخدم قط.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The reviewing is diligent. What is the key coaching focus?', 'المراجعة دؤوبة. ما محور التدريب الأساسي؟'),
      options: [
        { id: 'response', label: t('What Monday’s plan does differently because of Sunday’s notes', 'ما الذي تفعله خطة الاثنين بشكل مختلف بسبب ملاحظات الأحد') },
        { id: 'grouping', label: t('Whether the four groups are still the right four groups', 'هل ما زالت المجموعات الأربع هي المجموعات الأربع الصحيحة') },
        { id: 'depth', label: t('Whether the notes name a misconception or only a topic', 'هل تسمّي الملاحظات فهمًا خاطئًا أم موضوعًا فقط') },
        { id: 'platform', label: t('Whether the teacher knows the "assign by group" feature exists', 'هل تعرف المعلّمة بوجود خاصية «التكليف حسب المجموعة»') },
      ],
      correctId: 'response',
      hint: t('"Group B weak on fractions — again", three Sundays running, and a week plan identical for all four groups. Better notes or better grouping would still leave that plan untouched. Which option looks at the plan?', '«المجموعة ب ضعيفة في الكسور — مجددًا»، ثلاثة أحاد متتالية، وخطة أسبوعية متطابقة للمجموعات الأربع. ملاحظات أفضل أو تجميع أفضل سيتركان تلك الخطة كما هي. أي خيار ينظر إلى الخطة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Group B has been visibly behind for three weeks while the class moved on. Diligent review with no response is a serious, compounding drift.', 'المجموعة ب متأخرة بوضوح منذ ثلاثة أسابيع بينما انتقل الصف. المراجعة الدؤوبة دون استجابة انحراف خطير ومتراكم.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'reteach', label: t('Reteach fractions to Group B this week, then return to the scheme of work', 'أعد تدريس الكسور للمجموعة ب هذا الأسبوع، ثم عد إلى الخطة الدراسية') },
        { id: 'feature', label: t('Show her "assign by group" and set Group B a fractions lesson tonight', 'أرِها «التكليف حسب المجموعة» وكلّف المجموعة ب بدرس كسور الليلة') },
        { id: 'template', label: t('Give her a Sunday template with a column for the misconception behind each note', 'أعطِها نموذج أحد بعمود للفهم الخاطئ وراء كل ملاحظة') },
        { id: 'decide', label: t('End every Sunday note with a verb and a group, and check Monday’s plan against it', 'أنهِ كل ملاحظة أحد بفعل ومجموعة، وقارن خطة الاثنين بها') },
      ],
      correctId: 'decide',
      hint: t('Reteaching and the group assignment both fix fractions for Group B — this week. The template improves the notes. Which move changes what happens on every Monday after this one?', 'إعادة التدريس والتكليف حسب المجموعة يصلحان الكسور للمجموعة ب — هذا الأسبوع. النموذج يحسّن الملاحظات. أي خطوة تغيّر ما يحدث في كل اثنين بعد هذا؟'),
    },
    reasoning: {
      prompt: t('Why "one Monday action" rather than better reviewing?', 'لماذا «إجراء اثنين واحد» بدل مراجعة أفضل؟'),
      options: [
        { id: 'r2', label: t('Review without a decision is reading, not teaching', 'المراجعة دون قرار قراءة لا تدريس') },
        { id: 'r1', label: t('The review is already good; the time should go to the response', 'المراجعة جيدة أصلًا؛ وينبغي أن يذهب الوقت إلى الاستجابة') },
        { id: 'r3', label: t('A single action is easier to keep up than a better review habit', 'إجراء واحد أسهل في الاستمرار من عادة مراجعة أفضل') },
        { id: 'r4', label: t('Three identical notes prove the review itself has stopped noticing', 'ثلاث ملاحظات متطابقة تثبت أن المراجعة نفسها توقفت عن الملاحظة') },
      ],
      correctId: 'r2',
      hint: t('What is the Sunday evening for?', 'ما الغاية من مساء الأحد؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Reviewing has become the practice; responding was meant to be. The teacher knows exactly which group needs what — and teaches as if she didn’t.',
      'أصبحت المراجعة هي الممارسة؛ وكان المقصود أن تكون الاستجابة. تعرف المعلّمة بالضبط أي مجموعة تحتاج ماذا — وتدرّس كأنها لا تعرف.',
    ),
    whyItHappened: t(
      'Review is a complete, satisfying ritual on its own. Changing Monday’s plan is harder, less visible, and feels like falling behind the scheme of work.',
      'المراجعة طقس كامل مُرضٍ في ذاته. أما تغيير خطة الاثنين فأصعب وأقل ظهورًا ويبدو تأخرًا عن الخطة الدراسية.',
    ),
    howToRestore: t(
      'Alef data should guide grouping, support, reteaching, and targeted learning decisions. Every Sunday note ends with a verb and a group: "Assign fractions practice to Group B; reteach Tuesday."',
      'ينبغي لبيانات ألف أن توجّه قرارات التجميع والدعم وإعادة التدريس والتعلّم الموجّه. تنتهي كل ملاحظة أحد بفعل ومجموعة: «كلّف المجموعة ب بتدريب الكسور؛ أعد التدريس الثلاثاء.»',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_34: LevelDefinition = {
  id: 34,
  title: t('AI Gives Every Answer', 'الذكاء الاصطناعي يجيب عن كل شيء'),
  theme: t('Polished ≠ Owned', 'مصقول ≠ مملوك'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: scenePerfect,
  scenario: t(
    'Students use the AI support to complete their writing tasks. The work comes back quickly, and it is polished, accurate, and well-structured — better than anything this class produced last term. The teacher is thrilled. Toki asks one student to explain the second paragraph of her own essay.',
    'يستخدم الطلاب دعم الذكاء الاصطناعي لإنجاز مهام الكتابة. تعود الأعمال بسرعة، وهي مصقولة ودقيقة ومنظّمة — أفضل من أي شيء أنتجه هذا الصف في الفصل الماضي. المعلّم في غاية السعادة. يطلب توكي من طالبة أن تشرح الفقرة الثانية من مقالها.',
  ),
  evidence: [
    { id: 'essay', x: 28, y: 62, label: t('An essay', 'مقال'), clue: t('Flawless structure. Vocabulary two years above the student’s level. No crossings-out.', 'بنية خالية من العيوب. مفردات أعلى من مستوى الطالبة بسنتين. لا شطب.') },
    { id: 'student', x: 60, y: 70, label: t('The author', 'الكاتبة'), clue: t('"Explain this sentence?" She reads it aloud. Then reads it again. "It means… what it says."', '«اشرحي هذه الجملة؟» تقرؤها بصوت مرتفع. ثم تقرؤها مجددًا. «تعني… ما تقوله.»') },
    { id: 'history', x: 80, y: 30, label: t('Draft history', 'سجل المسودات'), clue: t('One draft. Pasted at 10:14, submitted at 10:15.', 'مسودة واحدة. لُصقت في ١٠:١٤، وأُرسلت في ١٠:١٥.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The answers are excellent. What should Toki verify?', 'الإجابات ممتازة. ما الذي ينبغي أن يتحقق منه توكي؟'),
      options: [
        { id: 'policy', label: t('Whether the school’s AI policy allows this use in writing tasks', 'هل تسمح سياسة المدرسة للذكاء الاصطناعي بهذا الاستخدام في مهام الكتابة') },
        { id: 'process', label: t('Whether the student planned and drafted before using the tool', 'هل خطّطت الطالبة وكتبت مسودة قبل استخدام الأداة') },
        { id: 'ownership', label: t('Whether the student can explain and defend her own paragraph', 'هل تستطيع الطالبة شرح فقرتها والدفاع عنها') },
        { id: 'level', label: t('Whether the vocabulary is appropriate to the student’s level', 'هل المفردات مناسبة لمستوى الطالبة') },
      ],
      correctId: 'ownership',
      hint: t('Process and level are both clues you already have — one draft, pasted; vocabulary two years above. The question Toki actually asked was "explain this sentence". Which option is that?', 'المسار والمستوى دليلان لديك أصلًا — مسودة واحدة ملصوقة؛ ومفردات أعلى بسنتين. السؤال الذي طرحه توكي فعلًا كان «اشرحي هذه الجملة». أي خيار هو ذاك؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The task exists to build the student’s thinking, and the thinking has been outsourced entirely — while every surface signal says success. That is the purest lethal mutation in this world.', 'توجد المهمة لبناء تفكير الطالبة، وقد أُسند التفكير كله إلى الخارج — بينما تقول كل الإشارات الظاهرة إنه نجاح. هذا أنقى تحوّر قاتل في هذا العالم.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'redesign', label: t('Plan in the student’s own words first, AI for feedback on it, spoken defence at the end', 'خطة بكلمات الطالبة أولًا، ثم الذكاء الاصطناعي لتغذية راجعة عليها، ودفاع شفهي في النهاية') },
        { id: 'handwrite', label: t('Move the first draft to handwritten class time, AI allowed only for the final polish', 'انقل المسودة الأولى إلى كتابة يدوية في الصف، والذكاء الاصطناعي للصقل النهائي فقط') },
        { id: 'cite', label: t('Require students to highlight every sentence the AI wrote and annotate why they kept it', 'اشترط أن يظلّل الطلاب كل جملة كتبها الذكاء الاصطناعي ويعلّقوا على سبب إبقائها') },
        { id: 'oral', label: t('Keep the task as it is and grade the spoken explanation instead of the essay', 'أبقِ المهمة كما هي وقيّم الشرح الشفهي بدل المقال') },
      ],
      correctId: 'redesign',
      hint: t('Handwriting moves the thinking earlier; grading the oral moves the test later; highlighting makes the tool visible. Only one puts the student’s thinking at both ends with the tool in the middle.', 'الكتابة اليدوية تنقل التفكير إلى وقت أبكر؛ وتقييم الشفهي ينقل الاختبار إلى وقت أمتأخر؛ والتظليل يجعل الأداة مرئية. خيار واحد فقط يضع تفكير الطالبة في الطرفين والأداة في المنتصف.'),
    },
    reasoning: {
      prompt: t('Why redesign the task rather than ban the tool?', 'لماذا نعيد تصميم المهمة بدل منع الأداة؟'),
      options: [
        { id: 'r1', label: t('Students will meet these tools everywhere; the task should teach using them well', 'سيلتقي الطلاب بهذه الأدوات في كل مكان؛ وينبغي للمهمة أن تعلّم حسن استخدامها') },
        { id: 'r3', label: t('A ban moves the problem home, where nobody can see the draft history', 'المنع ينقل المشكلة إلى البيت، حيث لا يرى أحد سجل المسودات') },
        { id: 'r2', label: t('The task design, not the tool, decides whether thinking is supported or replaced', 'تصميم المهمة، لا الأداة، هو ما يقرّر هل يُدعم التفكير أم يُستبدل') },
        { id: 'r4', label: t('Feedback from the tool on a student’s own plan is better than the teacher can give to thirty', 'تغذية الأداة الراجعة على خطة الطالب نفسه أفضل مما يستطيع المعلّم تقديمه لثلاثين') },
      ],
      correctId: 'r2',
      hint: t('Where does the thinking happen in the redesigned task — and where did it happen before?', 'أين يحدث التفكير في المهمة المعاد تصميمها — وأين كان يحدث قبل ذلك؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'The product improved while the student’s thinking disappeared from it. Ownership — the whole point of a writing task — was quietly handed to the tool.',
      'تحسّن المنتج بينما اختفى منه تفكير الطالبة. سُلّمت الملكية — وهي الغاية الكاملة من مهمة الكتابة — بهدوء إلى الأداة.',
    ),
    whyItHappened: t(
      'When output is the only thing assessed, the fastest route to good output wins. AI makes that route one click long, and the surface quality hides what’s missing.',
      'حين يكون المنتج هو الشيء الوحيد المقيَّم، يفوز أسرع طريق إلى منتج جيد. يجعل الذكاء الاصطناعي ذلك الطريق بطول نقرة واحدة، وتخفي الجودة الظاهرة ما ينقص.',
    ),
    howToRestore: t(
      'AI should support thinking, not replace student reasoning, explanation, or productive struggle. Put the student’s own thinking first and last — plan before, defend after — and let AI live in the middle.',
      'ينبغي للذكاء الاصطناعي أن يدعم التفكير لا أن يحلّ محلّ تعليل الطالب وشرحه وجهده المثمر. ضع تفكير الطالب أولًا وأخيرًا — خطة قبل، ودفاع بعد — ودع الذكاء الاصطناعي يسكن في المنتصف.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['mutation-hunter'],
};

export const WORLD_3_LEVELS = [LEVEL_31, LEVEL_32, LEVEL_33, LEVEL_34];
