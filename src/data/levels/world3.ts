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
        { id: 'evidence', label: t('Student learning evidence', 'أدلة تعلّم الطلاب') },
        { id: 'completion', label: t('Student completion rates', 'معدلات إنجاز الطلاب') },
        { id: 'time', label: t('Student time on task', 'وقت الطلاب في المهمة') },
        { id: 'logins', label: t('Student login records', 'سجلات دخول الطلاب') },
      ],
      correctId: 'evidence',
      hint: t('Completion says the lesson was finished. What says it was understood?', 'يقول الإنجاز إن الدرس انتهى. ما الذي يقول إنه فُهم؟'),
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
        { id: 'more-lessons', label: t('Assign more lessons to keep the rate high', 'كلّف الطلاب بدروس أكثر للحفاظ على المعدل') },
        { id: 'shift', label: t('Shift the conversation from completion to what students understood, struggled with, and learned — starting with the lesson check', 'حوّل الحديث من الإنجاز إلى ما فهمه الطلاب وما تعثّروا فيه وما تعلّموه — بدءًا من اختبار الدرس') },
        { id: 'lock', label: t('Lock the video so it can’t be skipped', 'اقفل الفيديو حتى لا يمكن تخطّيه') },
        { id: 'reward', label: t('Reward the fastest finishers', 'كافئ أسرع المنجِزين') },
      ],
      correctId: 'shift',
      hint: t('Locking the video fixes one symptom. What fixes what the teacher is looking at?', 'قفل الفيديو يعالج عرضًا واحدًا. ما الذي يعالج ما ينظر إليه المعلّم؟'),
    },
    reasoning: {
      prompt: t('Why start the conversation with the lesson check rather than the completion column?', 'لماذا نبدأ الحديث باختبار الدرس لا بعمود الإنجاز؟'),
      options: [
        { id: 'r1', label: t('The check is easier to read', 'الاختبار أسهل في القراءة') },
        { id: 'r2', label: t('Completion is valuable, but the check is the only column that measures learning — what a teacher looks at first is what the classroom optimises for', 'الإنجاز قيّم، لكن الاختبار هو العمود الوحيد الذي يقيس التعلّم — وما ينظر إليه المعلّم أولًا هو ما يُحسّنه الصف') },
        { id: 'r3', label: t('Leadership asked for check scores', 'طلبت القيادة درجات الاختبار') },
        { id: 'r4', label: t('It will make the dashboard less green', 'سيجعل اللوحة أقل اخضرارًا') },
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
        { id: 'thinking', label: t('Student thinking during tasks', 'تفكير الطلاب أثناء المهام') },
        { id: 'behaviour', label: t('Student device behaviour', 'سلوك الطلاب على الأجهزة') },
        { id: 'seating', label: t('Student seating positions', 'مواقع جلوس الطلاب') },
        { id: 'brightness', label: t('Student screen brightness', 'سطوع شاشات الطلاب') },
      ],
      correctId: 'thinking',
      hint: t('Quiet tells you about behaviour. What tells you about learning?', 'يخبرك الهدوء عن السلوك. ما الذي يخبرك عن التعلّم؟'),
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
        { id: 'stricter', label: t('Praise the behaviour and ask for more of it', 'امدح السلوك واطلب المزيد منه') },
        { id: 'connect', label: t('Connect device time to active monitoring and follow-up: live view open, two stuck students pulled aside, one misconception addressed aloud', 'اربط وقت الأجهزة بالمراقبة النشطة والمتابعة: العرض المباشر مفتوح، وسحب طالبين عالقين، ومعالجة مفهوم خاطئ بصوت مسموع') },
        { id: 'pairs', label: t('Put students in pairs on one device', 'ضع الطلاب في أزواج على جهاز واحد') },
        { id: 'less-tech', label: t('Reduce device time to one lesson a week', 'قلّل وقت الأجهزة إلى درس واحد أسبوعيًا') },
      ],
      correctId: 'connect',
      hint: t('The device isn’t the problem, and neither is the quiet. What is the teacher doing while the students think?', 'الجهاز ليس المشكلة، ولا الهدوء. ما الذي يفعله المعلّم بينما يفكّر الطلاب؟'),
    },
    reasoning: {
      prompt: t('Why is active monitoring the lever here?', 'لماذا المراقبة النشطة هي الرافعة هنا؟'),
      options: [
        { id: 'r1', label: t('It keeps students from going off-task', 'تمنع الطلاب من الخروج عن المهمة') },
        { id: 'r2', label: t('A device makes thinking private — the live view and the teacher’s questions are what make it visible again, so stuck students get help before they learn to stay silent', 'يجعل الجهاز التفكير خاصًا — والعرض المباشر وأسئلة المعلّم هي ما يجعله مرئيًا مجددًا، فيحصل الطلاب العالقون على المساعدة قبل أن يتعلّموا الصمت') },
        { id: 'r3', label: t('Leadership expects the live view to be open', 'تتوقع القيادة أن يكون العرض المباشر مفتوحًا') },
        { id: 'r4', label: t('It makes the lesson look more interactive', 'يجعل الدرس يبدو أكثر تفاعلًا') },
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
        { id: 'response', label: t('Instructional response to the data', 'الاستجابة التدريسية للبيانات') },
        { id: 'frequency', label: t('Frequency of data checking', 'تكرار فحص البيانات') },
        { id: 'accuracy', label: t('Accuracy of class reports', 'دقة تقارير الصف') },
        { id: 'timing', label: t('Timing of report review', 'توقيت مراجعة التقارير') },
      ],
      correctId: 'response',
      hint: t('Three Sundays, the same note. What never happened on Monday?', 'ثلاثة أحاد، الملاحظة نفسها. ما الذي لم يحدث قط يوم الاثنين؟'),
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
        { id: 'review-more', label: t('Review the data mid-week as well as Sunday', 'راجع البيانات منتصف الأسبوع إضافةً إلى الأحد') },
        { id: 'decide', label: t('Turn each Sunday note into one Monday action: regroup, reteach, or assign a targeted Alef lesson by group', 'حوّل كل ملاحظة أحد إلى إجراء اثنين واحد: إعادة تجميع أو إعادة تدريس أو تكليف بدرس ألف موجّه حسب المجموعة') },
        { id: 'print', label: t('Print the reports for the students to see', 'اطبع التقارير ليراها الطلاب') },
        { id: 'stop', label: t('Stop annotating — it takes too long', 'توقّف عن التعليق — فهو يستغرق وقتًا طويلًا') },
      ],
      correctId: 'decide',
      hint: t('The platform already lets her act by group. What would make the Sunday note become a Monday plan?', 'المنصة تتيح لها العمل حسب المجموعة أصلًا. ما الذي يجعل ملاحظة الأحد خطة اثنين؟'),
    },
    reasoning: {
      prompt: t('Why "one Monday action" rather than better reviewing?', 'لماذا «إجراء اثنين واحد» بدل مراجعة أفضل؟'),
      options: [
        { id: 'r1', label: t('Reviewing more would take more time', 'المراجعة أكثر تستغرق وقتًا أطول') },
        { id: 'r2', label: t('Alef data exists to guide grouping, support, reteaching, and targeted learning — review without a decision is reading, not teaching', 'توجد بيانات ألف لتوجيه التجميع والدعم وإعادة التدريس والتعلّم الموجّه — والمراجعة دون قرار قراءة لا تدريس') },
        { id: 'r3', label: t('The reports are already accurate enough', 'التقارير دقيقة بما يكفي أصلًا') },
        { id: 'r4', label: t('Leadership checks whether actions are logged', 'تتحقق القيادة من تسجيل الإجراءات') },
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
        { id: 'ownership', label: t('Ownership of student thinking', 'ملكية تفكير الطالب') },
        { id: 'quality', label: t('Quality of final answers', 'جودة الإجابات النهائية') },
        { id: 'speed', label: t('Speed of task completion', 'سرعة إنجاز المهمة') },
        { id: 'format', label: t('Use of correct formatting', 'استخدام التنسيق الصحيح') },
      ],
      correctId: 'ownership',
      hint: t('The essay is excellent. Whose is it?', 'المقال ممتاز. مقال من هو؟'),
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
        { id: 'ban', label: t('Ban the AI support for writing tasks', 'امنع دعم الذكاء الاصطناعي في مهام الكتابة') },
        { id: 'redesign', label: t('Redesign the task so AI can support but not replace: a plan in the student’s own words first, AI for feedback on it, then a spoken defence of the final draft', 'أعد تصميم المهمة بحيث يدعم الذكاء الاصطناعي لا يحلّ محلّ: خطة بكلمات الطالبة أولًا، ثم الذكاء الاصطناعي لتغذية راجعة عليها، ثم دفاع شفهي عن المسودة النهائية') },
        { id: 'detect', label: t('Run every essay through an AI detector', 'مرّر كل مقال عبر كاشف للذكاء الاصطناعي') },
        { id: 'praise', label: t('Celebrate the improvement — the output speaks for itself', 'احتفل بالتحسّن — فالنتيجة تتحدث عن نفسها') },
      ],
      correctId: 'redesign',
      hint: t('Banning removes the tool; detecting polices it. What would make the tool serve the thinking?', 'المنع يزيل الأداة؛ والكشف يراقبها. ما الذي يجعل الأداة تخدم التفكير؟'),
    },
    reasoning: {
      prompt: t('Why redesign the task rather than ban the tool?', 'لماذا نعيد تصميم المهمة بدل منع الأداة؟'),
      options: [
        { id: 'r1', label: t('Bans are hard to enforce', 'يصعب فرض المنع') },
        { id: 'r2', label: t('AI should support thinking, not replace reasoning, explanation, and productive struggle — the task design decides which one happens', 'ينبغي للذكاء الاصطناعي أن يدعم التفكير لا أن يحلّ محلّ التعليل والشرح والجهد المثمر — وتصميم المهمة هو ما يقرّر أيهما يحدث') },
        { id: 'r3', label: t('Students will use it anyway at home', 'سيستخدمه الطلاب في البيت على أي حال') },
        { id: 'r4', label: t('The essays will still look polished', 'ستظل المقالات تبدو مصقولة') },
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
