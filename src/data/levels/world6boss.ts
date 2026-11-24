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
      observation: t('No tiers, no colours. One task — build the tallest tower that stands. The teacher moves between children asking different questions of each: "why did it fall?", "can you make it taller with fewer blocks?", "show Sara how you did the base."', 'لا مستويات ولا ألوان. مهمة واحدة — ابنِ أطول برج يصمد. تتنقل المعلّمة بين الأطفال وتسأل كل واحد سؤالًا مختلفًا: «لماذا سقط؟»، «هل تستطيع جعله أطول بمكعبات أقل؟»، «أرِ سارة كيف صنعت القاعدة.»'),
      fitsPattern: false,
      finding: t('No visible differentiation, and the most responsive teaching of the day. Same task; a different question for every child.', 'لا تمايز مرئيًا، وأكثر تدريس استجابةً في اليوم. المهمة نفسها؛ وسؤال مختلف لكل طفل.'),
      hint: t('Where is the differentiation here — in the task, or in the teacher?', 'أين التمايز هنا — في المهمة، أم في المعلّمة؟'),
    },
    {
      id: 'grade-5',
      place: t('Grade 5 Math', 'الصف الخامس، رياضيات'),
      observation: t('Three worksheets, three tables, textbook differentiation. The student Toki follows is on "support" for fractions — and was the strongest in the room at geometry last week. Nobody re-sorted.', 'ثلاث أوراق عمل، ثلاث طاولات، تمايز نموذجي. الطالبة التي يتابعها توكي في مستوى «الدعم» للكسور — وكانت الأقوى في الغرفة في الهندسة الأسبوع الماضي. لم يُعِد أحد الفرز.'),
      fitsPattern: true,
      finding: t('The structure is perfect and the placement is stale. She is being differentiated for a version of herself from a different topic.', 'البنية مثالية والتصنيف قديم. تُمايَز لنسخة منها من موضوع مختلف.'),
      hint: t('Is she on the right sheet for *this* topic?', 'هل هي على الورقة الصحيحة لـ*هذا* الموضوع؟'),
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
      { id: 'not-enough', label: t('Teachers don’t differentiate enough', 'لا يمايز المعلّمون بما يكفي') },
      { id: 'structure', label: t('Differentiation has become a visible structure — tiers, colours, boxes — rather than a response to what each learner needs now', 'أصبح التمايز بنية مرئية — مستويات وألوان وخانات — لا استجابة لما يحتاجه كل متعلّم الآن') },
      { id: 'support', label: t('The support group gets too much attention', 'تحصل مجموعة الدعم على اهتمام زائد') },
      { id: 'planning', label: t('The planning template is badly designed', 'نموذج التخطيط سيّئ التصميم') },
    ],
    correctId: 'structure',
    hint: t('The two healthy rooms had no tiers and an empty extension box. What did they have instead?', 'لم يكن في الغرفتين السليمتين مستويات، وكانت خانة الإثراء فارغة. ماذا كان لديهما بدلًا من ذلك؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'high',
    hint: t('Thirty-one of thirty-four plans and the whole TA timetable point the same way — but the drift is in the structure, not the teachers’ skill, and two rooms show the cure already works here. High, and fixable.', 'واحد وثلاثون من أربع وثلاثين خطة وجدول المساعد كله تشير إلى الاتجاه نفسه — لكن الانحراف في البنية لا في مهارة المعلّمين، وتُظهر غرفتان أن العلاج يعمل هنا أصلًا. كبير، وقابل للإصلاح.'),
  },
  coaching: {
    prompt: t('The policy, the template, and the timetable all enforce the structure. What is the one move with the greatest impact?', 'السياسة والنموذج والجدول تفرض البنية كلها. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'four-tiers', label: t('Add a fourth tier for the highest attainers', 'أضف مستوى رابعًا لأعلى المحصّلين') },
      { id: 'question', label: t('Replace the three boxes on the template with one question — "what does each group not yet have, and what will move them?" — and move the TA to a different group each week', 'استبدل الخانات الثلاث في النموذج بسؤال واحد — «ما الذي لا تملكه كل مجموعة بعد، وما الذي سيحرّكها؟» — وانقل المساعد إلى مجموعة مختلفة كل أسبوع') },
      { id: 'abolish', label: t('Abolish ability grouping school-wide', 'ألغِ التجميع بحسب القدرة على مستوى المدرسة') },
      { id: 'showcase', label: t('Film the Kindergarten and Grade 9 lessons for training', 'صوّر درسي رياض الأطفال والصف التاسع للتدريب') },
    ],
    correctId: 'question',
    hint: t('The template produced thirty-one identical answers. What would produce thirty-one different ones?', 'أنتج النموذج واحدًا وثلاثين إجابة متطابقة. ما الذي سينتج واحدًا وثلاثين إجابة مختلفة؟'),
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
