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
        { id: 'placement', label: t('How students were sorted into bronze, silver and gold', 'كيف فُرز الطلاب إلى برونزي وفضي وذهبي') },
        { id: 'alignment', label: t('Whether the sheets ask for different things, or more of the same thing', 'هل تطلب كل ورقة شيئًا مختلفًا، أم مزيدًا من الشيء نفسه') },
        { id: 'labels', label: t('What the bronze label does to the students who carry it', 'ما الذي يفعله تصنيف «برونزي» بالطلاب الذين يحملونه') },
        { id: 'movement', label: t('Whether students can move between sheets during the lesson once they finish', 'هل يستطيع الطلاب الانتقال بين الأوراق أثناء الدرس') },
      ],
      correctId: 'alignment',
      hint: t('Sorting, labels and movement are all real questions — about the students. Look at the sheets clue: the same question type, the same skill, 8 / 12 / 16. What is being differentiated?', 'الفرز والتصنيفات والانتقال كلها أسئلة حقيقية — عن الطلاب. انظر إلى دليل الأوراق: نوع السؤال نفسه، المهارة نفسها، ٨ / ١٢ / ١٦. ما الذي يُمايَز؟'),
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
        { id: 'choice', label: t('Let students choose their sheet and move up when they finish', 'دع الطلاب يختارون ورقتهم وينتقلون إلى الأعلى حين ينهونها') },
        { id: 'one-sheet', label: t('One sheet for everyone, questions ordered from easy to hard, teacher support at the start for anyone stuck', 'ورقة واحدة للجميع، بأسئلة مرتّبة من السهل إلى الصعب، ودعم من المعلّم في البداية') },
        { id: 'regroup', label: t('Re-sort the three groups from last week’s quiz instead of the term baseline', 'أعد فرز المجموعات الثلاث من اختبار الأسبوع الماضي بدل الاختبار القاعدي للفصل') },
        { id: 'need', label: t('Three sheets that do different things: bronze teaches the prerequisite, gold applies the skill to a new problem', 'احتفظ بثلاث أوراق وغيّر ما تفعله: البرونزية تعلّم المهارة السابقة الغائبة، والذهبية تطبّق المهارة على مسألة جديدة') },
      ],
      correctId: 'need',
      hint: t('Choice, one ordered sheet and re-sorting all change who gets which quantity. The bronze student cannot start question 1 of any of them, and the gold student finished before she started. Which move changes what the sheets ask?', 'الاختيار والورقة الواحدة المرتّبة وإعادة الفرز كلها تغيّر مَن يحصل على أي كمية. الطالب البرونزي لا يستطيع بدء السؤال ١ في أي منها، والطالبة الذهبية انتهت قبل أن تبدأ. أي خطوة تغيّر ما تطلبه الأوراق؟'),
    },
    reasoning: {
      prompt: t('Why does "by need" matter more than "by level"?', 'لماذا «بحسب الحاجة» أهم من «بحسب المستوى»؟'),
      options: [
        { id: 'r1', label: t('Eight questions a student cannot start is not less work, it is no work', 'ثمانية أسئلة لا يستطيع الطالب بدأها ليست عملًا أقل، بل لا عمل') },
        { id: 'r3', label: t('A gold sheet that applies the skill is the only one of the three that teaches anything new', 'الورقة الذهبية التي تطبّق المهارة هي الوحيدة من الثلاث التي تعلّم شيئًا جديدًا') },
        { id: 'r2', label: t('A label says where a student is; a need says what would move them', 'يقول التصنيف أين الطالب؛ وتقول الحاجة ما الذي سيحرّكه') },
        { id: 'r4', label: t('Three different tasks look the same on the plan and take the same time to mark', 'ثلاث مهام مختلفة تبدو متشابهة في الخطة وتستغرق الوقت نفسه في التصحيح') },
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
        { id: 'length', label: t('Whether eight minutes is the right length for these steps', 'هل ثماني دقائق هي الطول المناسب لهذه الخطوات') },
        { id: 'extension', label: t('What the fast student is given when he finishes early', 'ماذا يُعطى الطالب السريع حين ينهي مبكرًا') },
        { id: 'pacing', label: t('What decides when the class moves on — the room or the clock', 'ما الذي يقرّر متى ينتقل الصف — الغرفة أم الساعة') },
        { id: 'support', label: t('Whether the struggling student gets help before step 3 begins', 'هل يحصل الطالب المتعثّر على مساعدة قبل بدء الخطوة ٣') },
      ],
      correctId: 'pacing',
      hint: t('Extension for one and support for the other are both needed — and both are downstream of the timer clue: "set to 8:00 every step, regardless of what the room shows". Which option is about that?', 'الإثراء لأحدهما والدعم للآخر كلاهما مطلوب — وكلاهما نتيجة لدليل المؤقّت: «مضبوط على ٨:٠٠ في كل خطوة بغضّ النظر عمّا تُظهره الغرفة». أي خيار يتناول ذلك؟'),
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
        { id: 'adjust', label: t('Keep the steps, add "finished? do this" to each, and move on when the room says so, not the clock', 'احتفظ بالخطوات، وأضف «انتهيت؟ افعل هذا» على كل منها، وتفقد الغرفة قبل الانتقال لا الساعة') },
        { id: 'self-pace', label: t('Put the four steps on one sheet and let every student move at their own speed', 'ضع الخطوات الأربع في ورقة واحدة ودع كل طالب يتحرك بسرعته') },
        { id: 'pairs', label: t('Pair the fast student with the struggling one so they move together', 'اقرن الطالب السريع بالمتعثّر ليتحرّكا معًا') },
        { id: 'variable', label: t('Keep the timer but set each step’s length from last week’s average finish time for that step', 'احتفظ بالمؤقّت لكن اضبط كل خطوة على متوسط وقت الإنهاء الأسبوع الماضي') },
      ],
      correctId: 'adjust',
      hint: t('Self-pacing loses the structure that keeps this lesson orderly; pairing makes one student the other’s timer; a better average is still a number nobody at that desk fits. Which move keeps the structure and puts the teacher’s eyes back in charge?', 'الإيقاع الذاتي يفقد البنية التي تُبقي هذا الدرس منظّمًا؛ والاقتران يجعل أحد الطالبين مؤقّت الآخر؛ والمتوسط الأفضل ما زال رقمًا لا يناسب أحدًا على تلك الطاولة. أي خطوة تحتفظ بالبنية وتعيد عينَي المعلّم إلى القيادة؟'),
    },
    reasoning: {
      prompt: t('Why "check the room" rather than a longer timer?', 'لماذا «تفقّد الغرفة» بدل مؤقّت أطول؟'),
      options: [
        { id: 'r1', label: t('An extension task turns the fast student’s five idle minutes into learning', 'المهمة الإثرائية تحوّل دقائق الطالب السريع الخمس الضائعة إلى تعلّم') },
        { id: 'r2', label: t('Any fixed timer is wrong for someone; only the room can tell the teacher when to move', 'أي مؤقّت ثابت خاطئ لشخص ما؛ والغرفة وحدها تخبر المعلّم متى ينتقل') },
        { id: 'r3', label: t('Checking the room makes the teacher look up, which the timer had stopped him doing', 'تفقّد الغرفة يجعل المعلّم ينظر إلى الأعلى، وهو ما منعه المؤقّت من فعله') },
        { id: 'r4', label: t('A step that ends when most students are done is still orderly and still on schedule', 'الخطوة التي تنتهي حين ينتهي معظم الطلاب ما زالت منظّمة وما زالت ضمن الجدول') },
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
        { id: 'flexibility', label: t('How often the groups are re-made, and from what evidence', 'كم مرة تُعاد المجموعات، ومن أي دليل') },
        { id: 'identity', label: t('What "I’m in the low group" is doing to the Sparrow’s effort', 'ما الذي تفعله «أنا في المجموعة الضعيفة» بجهد طالبة الدوري') },
        { id: 'tasks', label: t('Whether the Eagle task is actually harder or only labelled so', 'هل مهمة النسور أصعب فعلًا أم مسمّاة كذلك فقط') },
        { id: 'baseline', label: t('Whether the September baseline tested the right things', 'هل اختبر الاختبار القاعدي في سبتمبر الأشياء الصحيحة') },
      ],
      correctId: 'flexibility',
      hint: t('The label’s damage and the baseline’s quality are real — and both would be answered by the same thing the chart shows: dated 4 September, no crossings-out. Which option is about the crossings-out?', 'ضرر التصنيف وجودة الاختبار القاعدي حقيقيان — وكلاهما يجيب عنه الشيء نفسه الذي يُظهره المخطط: مؤرّخ ٤ سبتمبر، بلا شطب. أي خيار يتناول الشطب؟'),
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
        { id: 'retest', label: t('Re-run the baseline this month and re-set the four groups from it', 'أعد الاختبار القاعدي هذا الشهر وأعد ضبط المجموعات الأربع منه') },
        { id: 'move-two', label: t('Move the Sparrow up and the Eagle down today, and keep the rest as they are', 'انقل طالبة الدوري إلى الأعلى وطالب النسور إلى الأسفل اليوم، وأبقِ البقية كما هم') },
        { id: 'regroup', label: t('Regroup by this topic from the latest evidence, and plan to regroup again next topic', 'أعد التجميع بحسب الموضوع الحالي من أحدث الأدلة، وخطّط لإعادة التجميع في الموضوع التالي') },
        { id: 'mixed', label: t('Mixed tables for the teaching, ability groups only for the practice task that follows', 'طاولات مختلطة للتدريس، ومجموعات بحسب القدرة لمهمة التدريب فقط') },
      ],
      correctId: 'regroup',
      hint: t('A new baseline fixes the chart once; moving two students fixes two students once; mixed tables change where grouping happens but not how long it lasts. Which move makes the chart expect crossings-out?', 'اختبار قاعدي جديد يصلح المخطط مرة واحدة؛ ونقل طالبين يصلح طالبين مرة واحدة؛ والطاولات المختلطة تغيّر مكان التجميع لا مدّته. أي خطوة تجعل المخطط يتوقع الشطب؟'),
    },
    reasoning: {
      prompt: t('Why "regroup by topic, from evidence" rather than a fresh baseline?', 'لماذا «إعادة التجميع بحسب الموضوع من الأدلة» بدل اختبار قاعدي جديد؟'),
      options: [
        { id: 'r2', label: t('A student is strong in one topic and stuck in another; a fixed group cannot know that', 'الطالب قوي في موضوع وعالق في آخر؛ والمجموعة التي لا تتغيّر لا تستطيع معرفة ذلك') },
        { id: 'r1', label: t('A group that changes every topic cannot become a label a child introduces herself with', 'المجموعة التي تتغيّر كل موضوع لا يمكن أن تصبح تصنيفًا تقدّم به طفلة نفسها') },
        { id: 'r3', label: t('Last month’s test is better evidence than September’s for this month’s teaching', 'اختبار الشهر الماضي دليل أفضل من اختبار سبتمبر لتدريس هذا الشهر') },
        { id: 'r4', label: t('Planning to regroup forces the teacher to keep collecting evidence', 'التخطيط لإعادة التجميع يجبر المعلّم على مواصلة جمع الأدلة') },
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
        { id: 'balance', label: t('Whether forty minutes at one table is too much of the teacher’s time', 'هل أربعون دقيقة على طاولة واحدة أكثر من اللازم من وقت المعلّم') },
        { id: 'dependence', label: t('Whether the support table is becoming dependent on the teacher', 'هل تصبح طاولة الدعم معتمدة على المعلّم') },
        { id: 'checking', label: t('Whether the independent tables’ work is ever checked', 'هل يُفحص عمل الطاولات المستقلة أصلًا') },
        { id: 'challenge', label: t('Whether anyone at the independent tables has been stretched since October', 'هل تحدّى شيءٌ أحدًا على الطاولات المستقلة منذ أكتوبر') },
      ],
      correctId: 'challenge',
      hint: t('The support is excellent — the first clue says so, and dependence is not in the evidence. The book says "same level since October". Which option reads the book?', 'الدعم ممتاز — يقول الدليل الأول ذلك، والاعتماد ليس في الأدلة. يقول الدفتر «المستوى نفسه منذ أكتوبر». أي خيار يقرأ الدفتر؟'),
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
        { id: 'rotate', label: t('Split the forty minutes: twenty at the support table, twenty circulating the independent tables', 'قسّم الدقائق الأربعين: عشرون على طاولة الدعم، وعشرون مع الطاولات المستقلة') },
        { id: 'stretch', label: t('Keep the support; design the independent task to stretch: an open problem with a "prove it" step', 'احتفظ بالدعم، وصمّم المهمة المستقلة لتتحدّى: مسألة مفتوحة بخطوة «أثبت ذلك»، تُفحص في الدقائق العشر الأخيرة') },
        { id: 'peer', label: t('Have the confident students tutor the support table once they finish', 'اجعل الطلاب الواثقين يعلّمون طاولة الدعم حين ينتهون') },
        { id: 'extension-bank', label: t('Give the independent tables an extension bank to pick from when they finish early', 'أعطِ الطاولات المستقلة بنك إثراء يختارون منه حين ينهون مبكرًا') },
      ],
      correctId: 'stretch',
      hint: t('Splitting the time costs the table that is progressing. Tutoring and an extension bank both start after the task is finished — in twelve minutes, at the same level as October. Which move changes the task itself?', 'تقسيم الوقت يكلّف الطاولة التي تتقدّم. التعليم بين الأقران وبنك الإثراء كلاهما يبدأ بعد انتهاء المهمة — في اثنتي عشرة دقيقة، بمستوى أكتوبر نفسه. أي خطوة تغيّر المهمة نفسها؟'),
    },
    reasoning: {
      prompt: t('Why design the task rather than redistribute the teacher?', 'لماذا نصمّم المهمة بدل إعادة توزيع المعلّم؟'),
      options: [
        { id: 'r1', label: t('The support table is the teacher’s best work; cutting it would cost the students who need him most', 'طاولة الدعم أفضل عمل للمعلّم؛ وقطعها سيكلّف الطلاب الأكثر حاجة إليه') },
        { id: 'r3', label: t('A "prove it" step cannot be finished in twelve minutes and redone neatly', 'خطوة «أثبت ذلك» لا يمكن إنهاؤها في اثنتي عشرة دقيقة وإعادتها بإتقان') },
        { id: 'r4', label: t('The last ten minutes give the teacher a reason to visit the other tables', 'الدقائق العشر الأخيرة تعطي المعلّم سببًا لزيارة الطاولات الأخرى') },
        { id: 'r2', label: t('A well-designed task stretches the students the teacher is not standing next to', 'المهمة المصمّمة جيدًا تتحدّى الطلاب الذين لا يقف المعلّم بجانبهم') },
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
