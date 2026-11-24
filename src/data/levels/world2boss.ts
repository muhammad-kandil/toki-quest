import sceneImg from '../../assets/scenes/classroom-4-assessment.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/**
 * World 2 boss — The Assessment Mutation.
 * "Assessment is happening everywhere, but instruction is not changing."
 * The player's job: tell compliance from learning across a whole school.
 */
export const WORLD_2_BOSS: WorldBossDefinition = {
  id: 25,
  worldId: 'assessment',
  title: t('The Assessment Mutation', 'تحوّر التقييم'),
  theme: t('Compliance ≠ Learning', 'الامتثال ≠ التعلّم'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'A week of visits is over. Toki has seen exit tickets, markbooks, dashboards, and unit tests in every corridor of the school. Assessment is everywhere — frequent, organised, and documented. The principal is proud of it. Toki lays the week out scene by scene and asks one question of each: is assessment changing what happens next, or has it become something the school does to itself?',
    'انتهى أسبوع من الزيارات. رأى توكي بطاقات الخروج وسجلّات الدرجات ولوحات البيانات واختبارات الوحدات في كل ممرّ من المدرسة. التقييم في كل مكان — متكرر ومنظّم وموثّق. مدير المدرسة فخور به. يعرض توكي الأسبوع مشهدًا مشهدًا ويسأل عن كل منها سؤالًا واحدًا: هل يغيّر التقييم ما يحدث بعده، أم أصبح شيئًا تفعله المدرسة بنفسها؟',
  ),
  scenes: [
    {
      id: 'staff-meeting',
      place: t('Staff meeting, Monday', 'اجتماع الهيئة، الاثنين'),
      observation: t('Every teacher presents last week’s averages with an "actions" column on the slide: "continue to monitor", "focus on strand 3", "reinforce vocabulary". The head thanks each presenter. Toki checks three of this week’s plans against last week’s.', 'يعرض كل معلّم متوسطات الأسبوع الماضي مع عمود «إجراءات» على الشريحة: «مواصلة المتابعة»، «التركيز على المحور ٣»، «تعزيز المفردات». يشكر المدير كل مقدّم. يقارن توكي ثلاثًا من خطط هذا الأسبوع بخطط الأسبوع الماضي.'),
      fitsPattern: true,
      finding: t('Assessment as reporting. The numbers travel upward and nothing travels back into a classroom.', 'التقييم بوصفه تقريرًا. الأرقام تصعد إلى الأعلى ولا شيء يعود إلى الصف.'),
      hint: t('An "actions" column is not an action. Could any of those three lines be checked next Monday — for whom, by when?', 'عمود «الإجراءات» ليس إجراءً. هل يمكن التحقق من أي من تلك الأسطر الثلاثة يوم الاثنين القادم — لمن، ومتى؟'),
    },
    {
      id: 'grade-4',
      place: t('Grade 4, Tuesday', 'الصف الرابع، الثلاثاء'),
      observation: t('A quiz on scrap paper, no mark scheme, nothing collected. The teacher reads answers over shoulders while half the class finishes early and chats. Then four students are called to the carpet for ten minutes; the rest get a harder version of the last question.', 'اختبار على أوراق مسوّدة، بلا سلّم تصحيح، ولا شيء يُجمع. تقرأ المعلّمة الإجابات من فوق الأكتاف بينما ينهي نصف الصف مبكرًا ويتحدّث. ثم يُنادى أربعة طلاب إلى السجادة لعشر دقائق؛ ويحصل الباقون على نسخة أصعب من السؤال الأخير.'),
      fitsPattern: false,
      finding: t('Untidy, unrecorded — and the opposite of the pattern. The quiz changed the next ten minutes for every student in the room. The scrap paper is not the point; the carpet is.', 'غير مرتّب وغير مسجّل — وعكس النمط تمامًا. غيّر الاختبار الدقائق العشر التالية لكل طالب في الغرفة. الورق المسوّد ليس المقصود؛ السجادة هي المقصود.'),
      hint: t('The untidiness is pulling your eye. Ask only one thing: what happened to the teaching because of the quiz?', 'الفوضى تجذب عينك. اسأل شيئًا واحدًا فقط: ماذا حدث للتدريس بسبب الاختبار؟'),
    },
    {
      id: 'markbook',
      place: t('The markbook, Wednesday', 'سجلّ الدرجات، الأربعاء'),
      observation: t('Forty columns per student, colour-coded, every cell filled, sticky notes flagging the reds. The most complete markbook in the school. Toki asks what tomorrow looks like because of column 39; the teacher explains, clearly and at length, how column 39 is calculated.', 'أربعون عمودًا لكل طالب، مرمّزة بالألوان، كل خانة مملوءة، وملاحظات لاصقة تعلّم الخانات الحمراء. أكمل سجلّ درجات في المدرسة. يسأل توكي كيف سيبدو الغد بسبب العمود ٣٩؛ فيشرح المعلّم، بوضوح وإسهاب، كيف يُحسب العمود ٣٩.'),
      fitsPattern: true,
      finding: t('A record that answers no question. The effort went into the columns, not the children behind them.', 'سجلّ لا يجيب عن أي سؤال. ذهب الجهد إلى الأعمدة لا إلى الأطفال وراءها.'),
      hint: t('Toki asked about tomorrow and got an answer about arithmetic. Listen to which question was answered.', 'سأل توكي عن الغد فحصل على إجابة عن الحساب. انتبه إلى أي سؤال أُجيب عنه.'),
    },
    {
      id: 'parents',
      place: t('Parent evening, Thursday', 'اجتماع أولياء الأمور، الخميس'),
      observation: t('Parents receive a printed sheet of percentages. The teacher explains each one carefully and with real warmth. Parents leave reassured. No one leaves with something to do.', 'يتسلّم أولياء الأمور ورقة مطبوعة بالنسب المئوية. يشرح المعلّم كل نسبة بعناية ودفء حقيقي. يغادر أولياء الأمور مطمئنين. لا أحد يغادر ومعه شيء ليفعله.'),
      fitsPattern: true,
      finding: t('Warm, careful, and inert. Assessment communicated as a verdict, with no next step for anyone.', 'دافئ ودقيق وخامل. تقييم يُبلَّغ بوصفه حكمًا، دون خطوة تالية لأحد.'),
      hint: t('Warmth isn’t the question. Ask what the parent can now do.', 'الدفء ليس السؤال. اسأل ما الذي يستطيع وليّ الأمر فعله الآن.'),
    },
    {
      id: 'reteach',
      place: t('Grade 7, Friday', 'الصف السابع، الجمعة'),
      observation: t('The planned lesson is abandoned. Students groan — "we did this already" — and the markbook still has no column for last week’s unit test. The teacher re-explains one concept from a different angle and says the Monday quiz will have questions they have never seen.', 'أُلغي الدرس المخطط. يتذمّر الطلاب — «أخذنا هذا من قبل» — وما زال سجلّ الدرجات بلا عمود لاختبار الوحدة الأسبوع الماضي. يعيد المعلّم شرح مفهوم واحد من زاوية مختلفة ويقول إن اختبار الاثنين سيحوي أسئلة لم يروها من قبل.'),
      fitsPattern: false,
      finding: t('Not the pattern — this is the cure, wearing an unflattering shirt. The plan was abandoned because of the test, the reteach took a new route, and the re-check uses new questions. The empty column is a day behind the teaching, which is the right way round.', 'ليس النمط — هذا هو العلاج، بقميص لا يليق به. أُلغيت الخطة بسبب الاختبار، وسلك التدريس طريقًا جديدًا، وتستخدم إعادة الفحص أسئلة جديدة. العمود الفارغ متأخر يومًا عن التدريس، وهذا هو الترتيب الصحيح.'),
      hint: t('Groans and an empty column are what you can see. What did the unit test do to Friday?', 'التذمّر والعمود الفارغ هما ما تراه. ماذا فعل اختبار الوحدة بيوم الجمعة؟'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit, two don’t. Name the pattern Toki has found across this school.', 'ثلاثة مشاهد تطابق النمط واثنان لا. سمِّ النمط الذي وجده توكي في هذه المدرسة.'),
    options: [
      { id: 'too-much', label: t('Assessment is too frequent to be acted on — the volume is the problem', 'التقييم أكثر تكرارًا من أن يُعمل به — الحجم هو المشكلة') },
      { id: 'quality', label: t('The assessments are not diagnostic enough to tell teachers what to do', 'التقييمات ليست تشخيصية بما يكفي لتخبر المعلّمين بما يفعلونه') },
      { id: 'compliance', label: t('Assessment has become compliance — recorded and reported, not acted on', 'أصبح التقييم امتثالًا — يُسجَّل ويُبلَّغ، ولا يُعمل به') },
      { id: 'records', label: t('Recording is inconsistent — the best teachers keep the worst records', 'التسجيل غير متّسق — أفضل المعلّمين يحتفظون بأسوأ السجلات') },
    ],
    correctId: 'compliance',
    hint: t('The quiz on scrap paper was neither rigorous nor recorded, and it was healthy. So neither volume nor design nor records is the pattern. What did the three unhealthy scenes do with their evidence?', 'اختبار الورق المسوّد لم يكن صارمًا ولا مسجّلًا، وكان سليمًا. إذًا ليس الحجم ولا التصميم ولا السجلات هو النمط. ماذا فعلت المشاهد الثلاثة غير السليمة بدليلها؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('A whole school doing a practice that looks rigorous and changes nothing. That’s not a drift in one room — it’s the mutation, institutionalised.', 'مدرسة كاملة تمارس شيئًا يبدو صارمًا ولا يغيّر شيئًا. هذا ليس انحرافًا في غرفة واحدة — إنه التحوّر وقد صار مؤسسيًا.'),
  },
  coaching: {
    prompt: t('You can’t coach forty teachers one by one this term. What is the one move with the greatest impact?', 'لا يمكنك تدريب أربعين معلّمًا واحدًا واحدًا هذا الفصل. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'training', label: t('Run a whole-staff session on responsive teaching, with the Grade 4 quiz as the model', 'نظّم جلسة لكل الهيئة عن التدريس المستجيب، باختبار الصف الرابع نموذجًا') },
      { id: 'dashboard', label: t('Require every assessment to be in the dashboard within 24 hours so leaders can act on it', 'اشترط إدخال كل تقييم في اللوحة خلال ٢٤ ساعة ليتصرّف القادة بناءً عليه') },
      { id: 'coaching', label: t('Pair the three "pattern" teachers with the Grade 4 and Grade 7 teachers for a term', 'اقرن معلّمي «النمط» الثلاثة بمعلّمَي الصفين الرابع والسابع لفصل كامل') },
      { id: 'so-what', label: t('Change the Monday meeting: every number arrives with a named decision for named students', 'غيّر اجتماع الاثنين: كل رقم يصل مع قرار مسمّى لطلاب مسمّين') },
    ],
    correctId: 'so-what',
    hint: t('Pairing and training reach five teachers; the dashboard rule makes reporting faster, not teaching different. Which move changes what all forty teachers are asked to do every week?', 'الاقتران والتدريب يصلان إلى خمسة معلّمين؛ وقاعدة اللوحة تجعل الإبلاغ أسرع لا التدريس مختلفًا. أي خطوة تغيّر ما يُطلب من الأربعين معلّمًا كل أسبوع؟'),
  },
  reveal: {
    whatDrifted: t(
      'Assessment became something the school reports rather than something the school uses. Three of five scenes gathered evidence and did nothing with it; the two healthy ones were not more rigorous — they were simply responsive.',
      'أصبح التقييم شيئًا تبلّغ عنه المدرسة لا شيئًا تستخدمه. جمعت ثلاثة من خمسة مشاهد الدليل ولم تفعل به شيئًا؛ ولم يكن المشهدان السليمان أكثر صرامة — بل كانا ببساطة مستجيبين.',
    ),
    whyItHappened: t(
      'Systems reward what they can see. Scores, columns, and slides are visible; a plan quietly changed on Tuesday is not. So the visible half of assessment grows, and the half that teaches shrinks.',
      'تكافئ الأنظمة ما تستطيع رؤيته. الدرجات والأعمدة والشرائح مرئية؛ أما خطة تغيّرت بهدوء يوم الثلاثاء فليست كذلك. فينمو النصف المرئي من التقييم، ويتقلّص النصف الذي يعلّم.',
    ),
    howToRestore: t(
      'Change the ritual, not the people. When the Monday meeting asks "what will you do differently, for whom, by when?", every teacher’s assessment becomes an instructional decision — and the Grade 4 and Grade 7 practice becomes the norm instead of the exception.',
      'غيّر الطقس لا الأشخاص. حين يسأل اجتماع الاثنين «ما الذي ستفعله بشكل مختلف، ولمن، ومتى؟» يصبح تقييم كل معلّم قرارًا تدريسيًا — وتصبح ممارسة الصفين الرابع والسابع هي القاعدة لا الاستثناء.',
    ),
    finalWord: t(
      'Notice what you had to do here: two scenes looked like the pattern and weren’t. The coach who sees drift everywhere is as blind as the one who sees it nowhere.',
      'لاحظ ما كان عليك فعله هنا: بدا مشهدان كأنهما النمط ولم يكونا كذلك. المدرّب الذي يرى الانحراف في كل مكان أعمى كمن لا يراه في أي مكان.',
    ),
  },
  points: { scenes: 40, pattern: 30, risk: 20, coaching: 40 },
  badgeTriggers: ['coaching-specialist', 'mutation-hunter'],
};
