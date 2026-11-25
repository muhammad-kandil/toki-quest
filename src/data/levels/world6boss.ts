import sceneImg from '../../assets/scenes/classroom-2-activity.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/** World 6 boss — The Differentiation Myth. */
export const WORLD_6_BOSS: WorldBossDefinition = {
  id: 65,
  worldId: 'differentiation',
  title: t('The Differentiation Myth', 'أسطورة التمايز'),
  theme: t('Different ≠ Moved Forward', 'مختلف ≠ متقدّم'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'This school differentiates everything. Three-tier worksheets are policy, every seating plan is colour-coded by ability, and the lesson-plan template has a box for "support / core / extension" that is always filled in. On paper, every learner is catered for. Toki follows four students — one from each tier and one with no tier at all — through a single day.',
    'تمايز هذه المدرسة كل شيء. أوراق العمل ثلاثية المستوى سياسة، وكل مخطط جلوس مرمّز بالألوان بحسب القدرة، وفي نموذج خطة الدرس خانة «دعم / أساسي / إثراء» تُملأ دائمًا. على الورق، كل متعلّم مُراعى. يتابع توكي أربعة طلاب — واحدًا من كل مستوى وواحدًا بلا مستوى على الإطلاق — خلال يوم واحد.',
  ),
  scenes: [
    {
      id: 'template',
      place: t('The planning template', 'نموذج التخطيط'),
      observation: t('"Support: fewer questions. Core: the worksheet. Extension: more questions." The same three lines appear on 31 of 34 plans Toki samples, across every subject.', '«دعم: أسئلة أقل. أساسي: ورقة العمل. إثراء: أسئلة أكثر.» تظهر الأسطر الثلاثة نفسها في ٣١ من ٣٤ خطة يأخذها توكي عيّنة، في كل المواد.'),
      fitsPattern: true,
      finding: t('The box gets filled; the thinking doesn’t happen. Differentiation by quantity, copied school-wide.', 'تُملأ الخانة؛ ولا يحدث التفكير. تمايز بالكمية، منسوخ على مستوى المدرسة.'),
      hint: t('Thirty-one identical answers to "how will you meet different needs?" What does that tell you?', 'واحد وثلاثون إجابة متطابقة عن «كيف ستلبّي الاحتياجات المختلفة؟» ماذا يخبرك ذلك؟'),
    },
    {
      id: 'kg',
      place: t('Kindergarten', 'رياض الأطفال'),
      observation: t('The plan says "no differentiation this session" and the support box is struck through. One task for everyone — build the tallest tower that stands — and no groups, no TA, towers collapsing, two children in tears. The teacher never sits down; at each child she asks something different: "why did it fall?", "taller with fewer blocks?", "show Sara your base."', 'تقول الخطة «لا تمايز في هذه الجلسة» وخانة الدعم مشطوبة. مهمة واحدة للجميع — ابنِ أطول برج يصمد — ولا مجموعات ولا مساعد، أبراج تنهار، وطفلان يبكيان. لا تجلس المعلّمة أبدًا؛ وعند كل طفل تسأل شيئًا مختلفًا: «لماذا سقط؟»، «أطول بمكعبات أقل؟»، «أرِ سارة قاعدتك.»'),
      fitsPattern: false,
      finding: t('"No differentiation" on the plan, tears on the carpet — and the most responsive teaching of the day. Same task; a different question for every child, including the two who cried. The struck-through box is honest: she does it with her mouth, not her paperwork.', '«لا تمايز» في الخطة، ودموع على السجادة — وأكثر تدريس استجابةً في اليوم. المهمة نفسها؛ وسؤال مختلف لكل طفل، بمن فيهم الطفلان اللذان بكيا. الخانة المشطوبة صادقة: تفعله بفمها لا بأوراقها.'),
      hint: t('The struck-through box and the tears are what an audit would log. Count how many different questions she asked, and to whom.', 'الخانة المشطوبة والدموع هما ما سيسجّله التدقيق. عُدّ كم سؤالًا مختلفًا طرحت، ولمن.'),
    },
    {
      id: 'grade-5',
      place: t('Grade 5 Math', 'الصف الخامس، رياضيات'),
      observation: t('The lesson the head uses as the model: three worksheets, three tables, a TA with the support group, every box on the plan filled with real content. The student Toki follows is on "support" for fractions. Last week’s geometry test is in her book: highest in the room. She has sat at the support table since September.', 'الدرس الذي يستخدمه المدير نموذجًا: ثلاث أوراق عمل، ثلاث طاولات، مساعد مع مجموعة الدعم، وكل خانة في الخطة مملوءة بمحتوى حقيقي. الطالبة التي يتابعها توكي في مستوى «الدعم» للكسور. اختبار الهندسة الأسبوع الماضي في دفترها: الأعلى في الغرفة. تجلس على طاولة الدعم منذ سبتمبر.'),
      fitsPattern: true,
      finding: t('The structure is perfect and the placement is stale. She is being differentiated for a version of herself from a different topic.', 'البنية مثالية والتصنيف قديم. تُمايَز لنسخة منها من موضوع مختلف.'),
      hint: t('Every structure is present and well made. Open her book: what does last week’s test say about where she should sit this week?', 'كل بنية حاضرة ومتقنة. افتح دفترها: ماذا يقول اختبار الأسبوع الماضي عن المكان الذي ينبغي أن تجلس فيه هذا الأسبوع؟'),
    },
    {
      id: 'ta',
      place: t('The TA timetable', 'جدول مساعد التدريس'),
      observation: t('The teaching assistant is timetabled to the "support" group in every lesson, every day. The higher groups have never had an adult beside them this year. The assistant knows the support students’ gaps intimately; nobody knows the top group’s.', 'مساعد التدريس مجدوَل مع مجموعة «الدعم» في كل درس، كل يوم. لم يكن بجانب المجموعات الأعلى بالغ هذا العام. يعرف المساعد فجوات طلاب الدعم بدقة؛ ولا أحد يعرف فجوات المجموعة العليا.'),
      fitsPattern: true,
      finding: t('Support has been equated with differentiation. Half the room is systematically unobserved.', 'سُوّي الدعم بالتمايز. نصف الغرفة غير مُلاحَظ بشكل منهجي.'),
      hint: t('Who in the building can describe what the top group struggles with?', 'من في المبنى يستطيع وصف ما تتعثّر فيه المجموعة العليا؟'),
    },
    {
      id: 'grade-9',
      place: t('Grade 9 English', 'الصف التاسع، إنجليزية'),
      observation: t('Everyone reads the same text. Then students choose: annotate it, rewrite its ending, or argue against its author — and the teacher conferences with each group about a different thing. The "extension" box on the plan is empty.', 'يقرأ الجميع النص نفسه. ثم يختار الطلاب: التعليق عليه، أو إعادة كتابة نهايته، أو مجادلة كاتبه — ويتشاور المعلّم مع كل مجموعة في شيء مختلف. خانة «الإثراء» في الخطة فارغة.'),
      fitsPattern: false,
      finding: t('Not the pattern. Choice, conferencing, and a task with a high ceiling — differentiation that an audit of the template would miss entirely.', 'ليس النمط. اختيار ومشاورة ومهمة بسقف عالٍ — تمايز سيغفله تدقيق للنموذج كليًا.'),
      hint: t('The box is empty. Is the differentiation?', 'الخانة فارغة. هل التمايز كذلك؟'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit; two don’t. Name the pattern.', 'ثلاثة مشاهد تطابق؛ واثنان لا. سمِّ النمط.'),
    options: [
      { id: 'stale', label: t('Groups and tiers are set once and never revisited, so they go stale', 'تُحدَّد المجموعات والمستويات مرة واحدة ولا يُعاد النظر فيها، فتتقادم') },
      { id: 'structure', label: t('Differentiation became something a lesson has, not a response to what each learner needs now', 'أصبح التمايز شيئًا يملكه الدرس لا استجابة لما يحتاجه كل متعلّم الآن') },
      { id: 'quantity', label: t('Differentiation is done by quantity — fewer questions, more questions — never by the kind of task', 'يُجرى التمايز بالكمية — أسئلة أقل، أسئلة أكثر — لا بالنوع') },
      { id: 'support-only', label: t('Support is treated as the whole of differentiation, and the top group is forgotten', 'يُعامَل الدعم على أنه التمايز كله، وتُنسى المجموعة العليا') },
    ],
    correctId: 'structure',
    hint: t('Stale groups is Grade 5; quantity is the template; the forgotten top group is the TA timetable. Each is one scene. What do the three scenes do that the Kindergarten and Grade 9 rooms do not?', 'المجموعات المتقادمة هي الصف الخامس؛ والكمية هي النموذج؛ والمجموعة العليا المنسية هي جدول المساعد. كل منها مشهد واحد. ماذا تفعل المشاهد الثلاثة ولا تفعله غرفتا الروضة والصف التاسع؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'high',
    hint: t('Thirty-one of thirty-four plans and the whole TA timetable point the same way — but the drift is in the structure, not the teachers’ skill, and two rooms show the cure already works here. High, and fixable.', 'واحد وثلاثون من أربع وثلاثين خطة وجدول المساعد كله تشير إلى الاتجاه نفسه — لكن الانحراف في البنية لا في مهارة المعلّمين، وتُظهر غرفتان أن العلاج يعمل هنا أصلًا. كبير، وقابل للإصلاح.'),
  },
  coaching: {
    prompt: t('The policy, the template, and the timetable all enforce the structure. What is the one move with the greatest impact?', 'السياسة والنموذج والجدول تفرض البنية كلها. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'regroup-policy', label: t('Make it policy that every group is re-set from evidence at the start of each topic', 'اجعل إعادة تشكيل كل مجموعة من الأدلة في بداية كل موضوع سياسةً') },
      { id: 'ta-rota', label: t('Rotate the TA across all groups on a weekly rota', 'ناوب المساعد على كل المجموعات في جدول أسبوعي') },
      { id: 'question', label: t('One question replaces the template’s three boxes: "what does each group lack, and what will move them?"', 'استبدل الخانات الثلاث في النموذج بسؤال واحد — «ما الذي لا تملكه كل مجموعة بعد، وما الذي سيحرّكها؟»') },
      { id: 'model', label: t('Make the Grade 9 lesson the model and have every department plan and teach one lesson like it this term', 'اجعل درس الصف التاسع النموذج ودع كل قسم يخطط درسًا مثله هذا الفصل') },
    ],
    correctId: 'question',
    hint: t('Re-setting groups fixes Grade 5; the rota fixes the timetable; one model lesson a term reaches each teacher once. Thirty-one plans gave the same answer because the template asked the same question. Which move changes the question?', 'إعادة المجموعات تصلح الصف الخامس؛ والمناوبة تصلح الجدول؛ ودرس نموذجي واحد في الفصل يصل إلى كل معلّم مرة. أعطت واحد وثلاثون خطة الإجابة نفسها لأن النموذج طرح السؤال نفسه. أي خطوة تغيّر السؤال؟'),
  },
  reveal: {
    whatDrifted: t(
      'Differentiation became something a lesson has rather than something a teacher does. The tiers, colours, and boxes are all present; the response to the actual child in front of the teacher is what went missing.',
      'أصبح التمايز شيئًا يملكه الدرس لا شيئًا يفعله المعلّم. المستويات والألوان والخانات كلها حاضرة؛ أما الاستجابة للطفل الفعلي أمام المعلّم فهي ما ضاع.',
    ),
    whyItHappened: t(
      'Structures are inspectable; responsiveness is not. A school that wants to see differentiation builds things that can be seen — and the seen things slowly replace the thing they were meant to show.',
      'البنى قابلة للتفتيش؛ والاستجابة ليست كذلك. المدرسة التي تريد رؤية التمايز تبني أشياء يمكن رؤيتها — وتحلّ الأشياء المرئية ببطء محلّ الشيء الذي كان يُفترض أن تُظهره.',
    ),
    howToRestore: t(
      'Decide whether differentiation is purposeful, responsive, and inclusive by asking about learners, not materials. One question on the template, a TA who sees every group, and the Kindergarten and Grade 9 rooms stop being invisible exceptions.',
      'قرّر ما إذا كان التمايز هادفًا ومستجيبًا وشاملًا بالسؤال عن المتعلّمين لا المواد. سؤال واحد في النموذج، ومساعد يرى كل مجموعة، وتتوقف غرفتا رياض الأطفال والصف التاسع عن كونهما استثناءين غير مرئيين.',
    ),
    finalWord: t(
      'The least differentiated-looking rooms in this school were the only ones differentiating. Keep that in your pocket for the next world — things are about to stop looking like what they are.',
      'كانت الغرف الأقل مظهرًا للتمايز في هذه المدرسة هي الوحيدة التي تمايز. احتفظ بذلك في جيبك للعالم التالي — فالأشياء على وشك أن تتوقف عن أن تبدو كما هي.',
    ),
  },
  points: { scenes: 40, pattern: 30, risk: 20, coaching: 40 },
  badgeTriggers: ['inclusive-coach', 'mutation-hunter'],
};
