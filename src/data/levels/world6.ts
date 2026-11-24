/**
 * WORLD 6 — Differentiation
 * Theme: Supporting Every Learner
 * Core idea: different does not always mean differentiated.
 */
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_61: LevelDefinition = {
  id: 61,
  title: t('Different Worksheets', 'أوراق عمل مختلفة'),
  theme: t('Different ≠ Differentiated', 'مختلف ≠ متمايز'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'Students receive one of three worksheets — bronze, silver, or gold — based on their level. The class is beautifully organised, every student has something to do, and the lesson plan is headed "Differentiated." Toki compares the three sheets side by side.',
    'يتسلّم الطلاب واحدة من ثلاث أوراق عمل — برونزية أو فضية أو ذهبية — بحسب مستواهم. الصف منظّم بشكل جميل، ولدى كل طالب ما يفعله، وخطة الدرس معنونة بـ«متمايز». يقارن توكي الأوراق الثلاث جنبًا إلى جنب.',
  ),
  evidence: [
    { id: 'sheets', x: 26, y: 62, label: t('The three sheets', 'الأوراق الثلاث'), clue: t('Bronze: 8 questions. Silver: 12. Gold: 16. The same question type, the same skill. Only the quantity differs.', 'برونزية: ٨ أسئلة. فضية: ١٢. ذهبية: ١٦. نوع السؤال نفسه، المهارة نفسها. يختلف العدد فقط.') },
    { id: 'bronze', x: 58, y: 70, label: t('A bronze student', 'طالب برونزي'), clue: t('Stuck on question 1 — he doesn’t have the prerequisite. Eight questions he can’t start, instead of sixteen.', 'عالق عند السؤال ١ — ليست لديه المهارة السابقة. ثمانية أسئلة لا يستطيع بدأها، بدل ستة عشر.') },
    { id: 'gold', x: 80, y: 32, label: t('A gold student', 'طالبة ذهبية'), clue: t('Finished in nine minutes. Sixteen correct answers to a skill she had before the lesson began.', 'انتهت في تسع دقائق. ستة عشر إجابة صحيحة لمهارة كانت لديها قبل أن يبدأ الدرس.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Every student has the "right" sheet. What should Toki check?', 'لدى كل طالب الورقة «الصحيحة». ما الذي ينبغي أن يتحقق منه توكي؟'),
      options: [
        { id: 'alignment', label: t('Alignment to learning needs', 'التوافق مع احتياجات التعلّم') },
        { id: 'appearance', label: t('Appearance of each worksheet', 'مظهر كل ورقة عمل') },
        { id: 'levels', label: t('Number of worksheet levels', 'عدد مستويات أوراق العمل') },
        { id: 'completion', label: t('Completion of each task', 'إنجاز كل مهمة') },
      ],
      correctId: 'alignment',
      hint: t('Three sheets, three quantities. What does the bronze student actually need?', 'ثلاث أوراق، ثلاث كميات. ما الذي يحتاجه الطالب البرونزي فعلًا؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The intention and the structure are there; the content inside them isn’t responding to anyone yet. A drift to fix soon, not a lost cause.', 'النية والبنية موجودتان؛ لكن المحتوى داخلهما لا يستجيب لأحد بعد. انحراف يُصلَح قريبًا، لا قضية خاسرة.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'more-levels', label: t('Add a platinum level for the fastest', 'أضف مستوى بلاتينيًا للأسرع') },
        { id: 'need', label: t('Differentiate by need, not by amount: the bronze sheet teaches the missing prerequisite; the gold sheet applies the skill to a new problem', 'مايز بحسب الحاجة لا الكمية: الورقة البرونزية تعلّم المهارة السابقة الغائبة؛ والذهبية تطبّق المهارة على مسألة جديدة') },
        { id: 'same', label: t('Give everyone the same sheet to be fair', 'أعطِ الجميع الورقة نفسها إنصافًا') },
        { id: 'colours', label: t('Rename the levels so students don’t compare', 'أعد تسمية المستويات حتى لا يقارن الطلاب') },
      ],
      correctId: 'need',
      hint: t('Less of the same thing isn’t support. More of the same thing isn’t challenge. What is?', 'أقل من الشيء نفسه ليس دعمًا. وأكثر من الشيء نفسه ليس تحديًا. فما هو إذن؟'),
    },
    reasoning: {
      prompt: t('Why does "by need" matter more than "by level"?', 'لماذا «بحسب الحاجة» أهم من «بحسب المستوى»؟'),
      options: [
        { id: 'r1', label: t('It requires fewer worksheets', 'يتطلب أوراق عمل أقل') },
        { id: 'r2', label: t('Differentiation should be based on specific learning needs, not only different materials — a label says where a student is, a need says what would move them', 'ينبغي أن يقوم التمايز على احتياجات تعلّم محددة، لا على مواد مختلفة فقط — يقول التصنيف أين الطالب، وتقول الحاجة ما الذي سيحرّكه') },
        { id: 'r3', label: t('Students dislike being labelled', 'يكره الطلاب التصنيف') },
        { id: 'r4', label: t('Three levels is too few', 'ثلاثة مستويات قليلة جدًا') },
      ],
      correctId: 'r2',
      hint: t('What did the gold student get from sixteen questions she could already do?', 'ماذا حصلت الطالبة الذهبية من ستة عشر سؤالًا كانت تستطيع حلّها أصلًا؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Differentiation has become a sorting system. Students are grouped accurately and then given the same task in three sizes.',
      'أصبح التمايز نظام فرز. يُجمَّع الطلاب بدقة ثم يُعطون المهمة نفسها بثلاثة أحجام.',
    ),
    whyItHappened: t(
      'Three sheets is visible, plannable, and clearly "differentiated" on paper. Diagnosing what each group actually needs is slower and invisible — so the structure survives and the substance thins.',
      'ثلاث أوراق شيء مرئي وقابل للتخطيط و«متمايز» بوضوح على الورق. أما تشخيص ما تحتاجه كل مجموعة فعلًا فأبطأ وخفيّ — فتبقى البنية ويرقّ الجوهر.',
    ),
    howToRestore: t(
      'Differentiation should be based on specific learning needs, not only different materials. Start from the gap, not the label: what does this group not yet have, and what would stretch the one that has it?',
      'ينبغي أن يقوم التمايز على احتياجات تعلّم محددة، لا على مواد مختلفة فقط. ابدأ من الفجوة لا التصنيف: ما الذي لا تملكه هذه المجموعة بعد، وما الذي سيمدّ المجموعة التي تملكه؟',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_62: LevelDefinition = {
  id: 62,
  title: t('One Pace for Everyone', 'إيقاع واحد للجميع'),
  theme: t('Together ≠ Supported', 'معًا ≠ مدعوم'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'The whole class works through the same task at the same pace. The teacher moves everyone on together, every eight minutes, like clockwork — it keeps the lesson orderly and nobody is left behind the schedule. Toki watches two students at the same desk.',
    'يعمل الصف كله في المهمة نفسها بالإيقاع نفسه. ينقل المعلّم الجميع معًا كل ثماني دقائق بانتظام الساعة — يُبقي ذلك الدرس منظّمًا ولا أحد يتخلّف عن الجدول. يراقب توكي طالبين على المكتب نفسه.',
  ),
  evidence: [
    { id: 'fast', x: 26, y: 64, label: t('The fast one', 'السريع'), clue: t('Done in three minutes. Waits five. Draws on the back of the sheet. Three times this lesson.', 'انتهى في ثلاث دقائق. ينتظر خمسًا. يرسم على ظهر الورقة. ثلاث مرات في هذا الدرس.') },
    { id: 'slow', x: 56, y: 70, label: t('The struggling one', 'المتعثّر'), clue: t('Halfway through step 2 when the class is moved to step 3. Never finishes a step. Stops trying by step 4.', 'في منتصف الخطوة ٢ حين يُنقل الصف إلى الخطوة ٣. لا يُنهي خطوة أبدًا. يتوقف عن المحاولة عند الخطوة ٤.') },
    { id: 'timer', x: 80, y: 30, label: t('The timer', 'المؤقّت'), clue: t('Set to 8:00 every step, regardless of what the room shows. The teacher hasn’t looked up at step 3.', 'مضبوط على ٨:٠٠ في كل خطوة، بغضّ النظر عمّا تُظهره الغرفة. لم ينظر المعلّم إلى الأعلى عند الخطوة ٣.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The lesson is orderly and on schedule. What is the coaching focus?', 'الدرس منظّم وفي موعده. ما محور التدريب؟'),
      options: [
        { id: 'pacing', label: t('Responsive pacing', 'الإيقاع المستجيب') },
        { id: 'completion', label: t('Task completion', 'إنجاز المهمة') },
        { id: 'timing', label: t('Classroom timing', 'توقيت الصف') },
        { id: 'patience', label: t('Student patience', 'صبر الطلاب') },
      ],
      correctId: 'pacing',
      hint: t('The timer is deciding when to move on. Who should be?', 'المؤقّت هو من يقرّر متى ننتقل. من ينبغي أن يقرّر؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('One student is bored into disengagement and another is being taught to give up, in the same lesson, by the same clock. That’s actively undermining learning at both ends.', 'طالب يُدفَع بالملل إلى الانسحاب وآخر يُعلَّم الاستسلام، في الدرس نفسه، بالساعة نفسها. هذا يقوّض التعلّم فعليًا في الطرفين.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'longer', label: t('Make every step ten minutes instead of eight', 'اجعل كل خطوة عشر دقائق بدل ثمانٍ') },
        { id: 'adjust', label: t('Keep the structure, free the pace: a "finished? do this" extension on every step, and the teacher checks the room before moving on, not the clock', 'احتفظ بالبنية وحرّر الإيقاع: مهمة إثرائية «انتهيت؟ افعل هذا» في كل خطوة، ويتفقد المعلّم الغرفة قبل الانتقال لا الساعة') },
        { id: 'remove-timer', label: t('Remove the timer and let students self-pace entirely', 'أزل المؤقّت ودع الطلاب يضبطون إيقاعهم كليًا') },
        { id: 'groups', label: t('Seat fast and slow students separately', 'اجلس الطلاب السريعين والبطيئين منفصلين') },
      ],
      correctId: 'adjust',
      hint: t('The structure is helping. The rigidity is hurting. What keeps one and loses the other?', 'البنية تساعد. والجمود يضرّ. ما الذي يحتفظ بالأولى ويتخلّص من الثاني؟'),
    },
    reasoning: {
      prompt: t('Why "check the room" rather than a longer timer?', 'لماذا «تفقّد الغرفة» بدل مؤقّت أطول؟'),
      options: [
        { id: 'r1', label: t('Longer steps would make the lesson overrun', 'الخطوات الأطول ستجعل الدرس يتجاوز وقته') },
        { id: 'r2', label: t('Adjusting pace, support, and challenge keeps students appropriately stretched — any fixed timer is wrong for someone; only the room can tell the teacher when to move', 'يُبقي تعديل الإيقاع والدعم والتحدي الطلاب في حالة تحدٍّ مناسب — أي مؤقّت ثابت خاطئ لشخص ما؛ والغرفة وحدها تخبر المعلّم متى ينتقل') },
        { id: 'r3', label: t('Students prefer flexible lessons', 'يفضّل الطلاب الدروس المرنة') },
        { id: 'r4', label: t('Timers stress students', 'تضغط المؤقّتات على الطلاب') },
      ],
      correctId: 'r2',
      hint: t('Was there any number on that timer that would have been right for both students at the desk?', 'هل كان على ذلك المؤقّت أي رقم مناسب للطالبين معًا على المكتب؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Pace has become a property of the lesson instead of a response to the learners. The clock moves everyone, and neither end of the room is being taught.',
      'أصبح الإيقاع خاصية للدرس لا استجابة للمتعلّمين. تحرّك الساعة الجميع، ولا يُدرَّس أي من طرفي الغرفة.',
    ),
    whyItHappened: t(
      'A fixed rhythm is calm, fair-looking, and keeps the plan on schedule. Reading the room every eight minutes is harder than reading a timer — so the timer quietly took over.',
      'الإيقاع الثابت هادئ ويبدو عادلًا ويُبقي الخطة في موعدها. وقراءة الغرفة كل ثماني دقائق أصعب من قراءة مؤقّت — فاستولى المؤقّت بهدوء.',
    ),
    howToRestore: t(
      'Adjust pace, support, and challenge so students remain appropriately stretched. An extension for the early finishers, a check-in before every transition, and the clock becomes a guide instead of a rule.',
      'عدّل الإيقاع والدعم والتحدي ليبقى الطلاب في حالة تحدٍّ مناسب. مهمة إثرائية للمنتهين مبكرًا، وتفقّد قبل كل انتقال، فتصبح الساعة دليلًا لا قاعدة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_63: LevelDefinition = {
  id: 63,
  title: t('Ability Grouping', 'التجميع بحسب القدرة'),
  theme: t('Grouped ≠ Growing', 'مجمَّع ≠ نامٍ'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneTalk,
  scenario: t(
    'Students sit in ability groups: Eagles, Hawks, Robins, Sparrows. The groups were set in September from a baseline test and have been the same ever since. It makes planning simple and every child knows their table. Toki asks when a student last moved.',
    'يجلس الطلاب في مجموعات بحسب القدرة: النسور والصقور والعصافير والدوري. حُددت المجموعات في سبتمبر من اختبار قاعدي وبقيت كما هي منذ ذلك الحين. يجعل ذلك التخطيط بسيطًا ويعرف كل طفل طاولته. يسأل توكي: متى انتقل طالب آخر مرة؟'),
  evidence: [
    { id: 'chart', x: 50, y: 28, label: t('The seating chart', 'مخطط الجلوس'), clue: t('Dated 4 September. No crossings-out. Seven months, zero moves.', 'مؤرّخ ٤ سبتمبر. لا شطب. سبعة أشهر، صفر انتقالات.') },
    { id: 'sparrow', x: 24, y: 66, label: t('A Sparrow', 'طالب من الدوري'), clue: t('Scored higher than two Eagles on last month’s test. Still a Sparrow. Introduces herself to Toki as "I’m in the low group."', 'حصلت على درجة أعلى من اثنين من النسور في اختبار الشهر الماضي. ما زالت من الدوري. تقدّم نفسها لتوكي: «أنا في المجموعة الضعيفة.»') },
    { id: 'eagle', x: 78, y: 66, label: t('An Eagle', 'طالب من النسور'), clue: t('Struggling with this topic specifically. Gets the Eagle task anyway. Copies from his neighbour.', 'يتعثّر في هذا الموضوع تحديدًا. يحصل على مهمة النسور رغم ذلك. ينسخ من جاره.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The groups are tidy and stable. What should Toki question?', 'المجموعات مرتّبة ومستقرة. ما الذي ينبغي أن يتساءل عنه توكي؟'),
      options: [
        { id: 'flexibility', label: t('Flexibility of grouping', 'مرونة التجميع') },
        { id: 'names', label: t('Names of the groups', 'أسماء المجموعات') },
        { id: 'size', label: t('Size of each group', 'حجم كل مجموعة') },
        { id: 'seating', label: t('Seating arrangement', 'ترتيب الجلوس') },
      ],
      correctId: 'flexibility',
      hint: t('September’s test is deciding March’s teaching. What has that test missed since?', 'اختبار سبتمبر يقرّر تدريس مارس. ما الذي فاته ذلك الاختبار منذ ذلك الحين؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('A child now introduces herself by her group. Fixed grouping has stopped describing students and started defining them — that’s serious, and it compounds every month it lasts.', 'طفلة تقدّم نفسها الآن بمجموعتها. توقف التجميع الثابت عن وصف الطلاب وبدأ يعرّفهم — هذا خطير، ويتراكم كل شهر يستمر فيه.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'rename', label: t('Rename the groups to neutral colours', 'أعد تسمية المجموعات بألوان محايدة') },
        { id: 'regroup', label: t('Regroup by the current topic, from the latest evidence, and plan to regroup again — the Sparrow who outscored the Eagles moves today', 'أعد التجميع بحسب الموضوع الحالي من أحدث الأدلة، وخطّط لإعادة التجميع مجددًا — طالبة الدوري التي تفوّقت على النسور تنتقل اليوم') },
        { id: 'mixed', label: t('Abolish grouping and seat everyone randomly', 'ألغِ التجميع وأجلس الجميع عشوائيًا') },
        { id: 'retest', label: t('Re-run the baseline test and regroup once', 'أعد الاختبار القاعدي وأعد التجميع مرة واحدة') },
      ],
      correctId: 'regroup',
      hint: t('Not whether to group — how often, and from what.', 'ليس هل نجمّع — بل كم مرة، ومن ماذا.'),
    },
    reasoning: {
      prompt: t('Why "regroup by topic, from evidence" rather than a fresh baseline?', 'لماذا «إعادة التجميع بحسب الموضوع من الأدلة» بدل اختبار قاعدي جديد؟'),
      options: [
        { id: 'r1', label: t('Baseline tests take a whole lesson', 'تستغرق الاختبارات القاعدية درسًا كاملًا') },
        { id: 'r2', label: t('Grouping should remain flexible and responsive, not fixed or limiting — a student is strong in one topic and stuck in another, and a group that never changes can’t know that', 'ينبغي أن يبقى التجميع مرنًا ومستجيبًا، لا ثابتًا ولا مقيِّدًا — الطالب قوي في موضوع وعالق في آخر، والمجموعة التي لا تتغيّر لا تستطيع معرفة ذلك') },
        { id: 'r3', label: t('Students enjoy changing tables', 'يستمتع الطلاب بتغيير الطاولات') },
        { id: 'r4', label: t('It looks more responsive to observers', 'يبدو أكثر استجابة أمام الملاحظين') },
      ],
      correctId: 'r2',
      hint: t('Was the Eagle an Eagle in this topic?', 'هل كان النسر نسرًا في هذا الموضوع؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Grouping has hardened from a teaching tool into an identity. A September snapshot decides every lesson, and students have learned who they are from their table.',
      'تصلّب التجميع من أداة تدريس إلى هوية. لقطة سبتمبر تقرّر كل درس، وتعلّم الطلاب من هم من طاولتهم.',
    ),
    whyItHappened: t(
      'Stable groups make planning easy and the room predictable. Moving students takes evidence, time, and a conversation — so nobody moves, and the groups quietly become labels.',
      'تجعل المجموعات المستقرة التخطيط سهلًا والغرفة متوقعة. يحتاج نقل الطلاب إلى أدلة ووقت وحوار — فلا ينتقل أحد، وتصبح المجموعات تصنيفات بهدوء.',
    ),
    howToRestore: t(
      'Grouping should remain flexible and responsive, not fixed or limiting. Group by the current need, from the latest evidence, and move students as often as the evidence says.',
      'ينبغي أن يبقى التجميع مرنًا ومستجيبًا، لا ثابتًا ولا مقيِّدًا. جمّع بحسب الحاجة الحالية من أحدث الأدلة، وانقل الطلاب بقدر ما تقوله الأدلة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_64: LevelDefinition = {
  id: 64,
  title: t('Help for Some', 'مساعدة للبعض'),
  theme: t('Support ≠ Stretch', 'الدعم ≠ التحدي'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: sceneOut,
  scenario: t(
    'The teacher spends almost the whole lesson at one table, working intensively with the students who struggle most. It is patient, skilful support, and those students are making real progress. The confident students work independently at the other tables. Toki goes to look at what they’re doing.',
    'يقضي المعلّم الدرس كله تقريبًا على طاولة واحدة، يعمل بتركيز مع الطلاب الأكثر تعثّرًا. إنه دعم صبور وماهر، وأولئك الطلاب يحرزون تقدّمًا حقيقيًا. يعمل الطلاب الواثقون باستقلالية على الطاولات الأخرى. يذهب توكي لينظر ما يفعلونه.',
  ),
  evidence: [
    { id: 'support', x: 24, y: 64, label: t('The support table', 'طاولة الدعم'), clue: t('Excellent. Patient, precise, responsive. Forty minutes of the teacher’s best work.', 'ممتاز. صبور ودقيق ومستجيب. أربعون دقيقة من أفضل عمل المعلّم.') },
    { id: 'confident', x: 58, y: 70, label: t('The independent tables', 'الطاولات المستقلة'), clue: t('Finished the task in twelve minutes. Doing it again, neatly, because there was nothing else.', 'أنهوا المهمة في اثنتي عشرة دقيقة. يعيدونها بإتقان لأنه لم يكن هناك شيء آخر.') },
    { id: 'book', x: 80, y: 32, label: t('A confident student’s book', 'دفتر طالب واثق'), clue: t('Every piece of work this term at the same level of difficulty. Nothing has stretched her since October.', 'كل عمل هذا الفصل بمستوى الصعوبة نفسه. لم يتحدّها شيء منذ أكتوبر.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The support is excellent. What might be missing?', 'الدعم ممتاز. ما الذي قد يكون غائبًا؟'),
      options: [
        { id: 'challenge', label: t('Challenge for all learners', 'التحدي لجميع المتعلّمين') },
        { id: 'support-low', label: t('Support for low attainers', 'الدعم لذوي التحصيل المنخفض') },
        { id: 'independent', label: t('Independent work time', 'وقت العمل المستقل') },
        { id: 'circulation', label: t('Teacher circulation', 'تجوّل المعلّم') },
      ],
      correctId: 'challenge',
      hint: t('Who in this room has not learned anything new since October?', 'من في هذه الغرفة لم يتعلّم شيئًا جديدًا منذ أكتوبر؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('Half the class has been invisible for a term, inside a practice that looks like exemplary differentiation. The purpose — every learner moved forward — has been lost for exactly the students nobody worries about.', 'نصف الصف غير مرئي منذ فصل كامل، داخل ممارسة تبدو تمايزًا نموذجيًا. ضاعت الغاية — تقدّم كل متعلّم — تحديدًا للطلاب الذين لا يقلق عليهم أحد.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'less-support', label: t('Spend less time with the struggling table', 'اقضِ وقتًا أقل مع طاولة المتعثّرين') },
        { id: 'stretch', label: t('Keep the support — and design the independent task to stretch: an open problem, a harder text, a "prove it" step, checked in the last ten minutes', 'احتفظ بالدعم — وصمّم المهمة المستقلة لتتحدّى: مسألة مفتوحة، نص أصعب، خطوة «أثبت ذلك»، تُفحص في الدقائق العشر الأخيرة') },
        { id: 'peer', label: t('Have confident students tutor the struggling ones', 'اجعل الطلاب الواثقين يعلّمون المتعثّرين') },
        { id: 'ta', label: t('Request a teaching assistant for the support table', 'اطلب مساعد تدريس لطاولة الدعم') },
      ],
      correctId: 'stretch',
      hint: t('The teacher’s time isn’t the lever — the task is. What would make "independent" mean "challenged"?', 'وقت المعلّم ليس الرافعة — المهمة هي الرافعة. ما الذي يجعل «مستقل» تعني «مُتحدَّى»؟'),
    },
    reasoning: {
      prompt: t('Why design the task rather than redistribute the teacher?', 'لماذا نصمّم المهمة بدل إعادة توزيع المعلّم؟'),
      options: [
        { id: 'r1', label: t('The teacher can’t be in two places', 'لا يستطيع المعلّم أن يكون في مكانين') },
        { id: 'r2', label: t('Differentiation should support students who struggle and extend those ready for deeper challenge — a well-designed task stretches students the teacher isn’t standing next to', 'ينبغي للتمايز أن يدعم الطلاب المتعثّرين ويمدّ المستعدين لتحدٍّ أعمق — والمهمة المصمّمة جيدًا تتحدّى الطلاب الذين لا يقف المعلّم بجانبهم') },
        { id: 'r3', label: t('Confident students prefer working alone', 'يفضّل الطلاب الواثقون العمل وحدهم') },
        { id: 'r4', label: t('It avoids needing extra staff', 'يتجنّب الحاجة إلى موظفين إضافيين') },
      ],
      correctId: 'r2',
      hint: t('What was the confident student doing in the twenty-eight minutes after she finished?', 'ماذا كانت الطالبة الواثقة تفعل في الدقائق الثماني والعشرين بعد أن انتهت؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Differentiation has come to mean "help for those who struggle." The support is superb, and the students who could go furthest haven’t been asked to go anywhere.',
      'صار التمايز يعني «مساعدة للمتعثّرين». الدعم رائع، والطلاب الذين يستطيعون الذهاب أبعد لم يُطلب منهم الذهاب إلى أي مكان.',
    ),
    whyItHappened: t(
      'Struggle is visible and urgent; coasting is quiet and looks like success. A caring teacher naturally goes where the need is loudest, and the silent need goes unmet all term.',
      'التعثّر مرئي وعاجل؛ والركود هادئ ويبدو نجاحًا. يذهب المعلّم المهتم طبيعيًا إلى حيث الحاجة الأعلى صوتًا، وتبقى الحاجة الصامتة دون تلبية طوال الفصل.',
    ),
    howToRestore: t(
      'Differentiation should support students who struggle and extend those ready for deeper challenge. Protect the support table — and give the other tables a task that would be worth the teacher’s time, even when she can’t give it.',
      'ينبغي للتمايز أن يدعم الطلاب المتعثّرين ويمدّ المستعدين لتحدٍّ أعمق. احمِ طاولة الدعم — وأعطِ الطاولات الأخرى مهمة تستحق وقت المعلّم، حتى حين لا يستطيع منحه.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach', 'mutation-hunter'],
};

export const WORLD_6_LEVELS = [LEVEL_61, LEVEL_62, LEVEL_63, LEVEL_64];
