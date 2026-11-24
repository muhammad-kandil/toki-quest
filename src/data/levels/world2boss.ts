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
      observation: t('Every teacher presents last week’s averages. Slides are tidy. Nobody mentions a student by name, and nobody’s plan for this week is different from last week’s.', 'يعرض كل معلّم متوسطات الأسبوع الماضي. الشرائح مرتّبة. لا أحد يذكر طالبًا بالاسم، ولا تختلف خطة أحد لهذا الأسبوع عن الأسبوع الماضي.'),
      fitsPattern: true,
      finding: t('Assessment as reporting. The numbers travel upward and nothing travels back into a classroom.', 'التقييم بوصفه تقريرًا. الأرقام تصعد إلى الأعلى ولا شيء يعود إلى الصف.'),
      hint: t('Look at the plans, not the slides. Did anything change because of the numbers?', 'انظر إلى الخطط لا الشرائح. هل تغيّر شيء بسبب الأرقام؟'),
    },
    {
      id: 'grade-4',
      place: t('Grade 4, Tuesday', 'الصف الرابع، الثلاثاء'),
      observation: t('A short quiz. The teacher reads the results at her desk, then pulls four students to the carpet for ten minutes while the rest move on to an extension task.', 'اختبار قصير. تقرأ المعلّمة النتائج على مكتبها، ثم تسحب أربعة طلاب إلى السجادة لعشر دقائق بينما ينتقل الباقون إلى مهمة إثرائية.'),
      fitsPattern: false,
      finding: t('This is the opposite of the pattern. The quiz changed the next ten minutes for eight different students. Protect this teacher.', 'هذا عكس النمط. غيّر الاختبار الدقائق العشر التالية لثمانية طلاب مختلفين. احمِ هذه المعلّمة.'),
      hint: t('Don’t let the suspicion do the looking for you. What happened right after the quiz?', 'لا تدع الشكّ ينظر نيابةً عنك. ماذا حدث مباشرة بعد الاختبار؟'),
    },
    {
      id: 'markbook',
      place: t('The markbook, Wednesday', 'سجلّ الدرجات، الأربعاء'),
      observation: t('Forty columns of scores per student, all up to date. Toki asks what the teacher would do differently tomorrow because of column 39. A long pause.', 'أربعون عمودًا من الدرجات لكل طالب، كلها محدّثة. يسأل توكي ما الذي سيفعله المعلّم غدًا بشكل مختلف بسبب العمود ٣٩. صمت طويل.'),
      fitsPattern: true,
      finding: t('A record that answers no question. The effort went into the columns, not the children behind them.', 'سجلّ لا يجيب عن أي سؤال. ذهب الجهد إلى الأعمدة لا إلى الأطفال وراءها.'),
      hint: t('The pause is the evidence.', 'الصمت هو الدليل.'),
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
      observation: t('Unit test results in; two thirds missed one concept. The teacher scraps Friday’s plan, reteaches it a different way, and tests the concept again on Monday with new questions.', 'وصلت نتائج اختبار الوحدة؛ ثلثا الطلاب أخفقوا في مفهوم واحد. يلغي المعلّم خطة الجمعة، ويعيد تدريسه بطريقة مختلفة، ويختبر المفهوم مجددًا يوم الاثنين بأسئلة جديدة.'),
      fitsPattern: false,
      finding: t('Not the pattern — this is the cure. Evidence changed the plan within a day, and the re-check used new questions.', 'ليس النمط — هذا هو العلاج. غيّر الدليل الخطة خلال يوم، واستخدمت إعادة الفحص أسئلة جديدة.'),
      hint: t('Did the test change the teaching? That’s the only test that matters here.', 'هل غيّر الاختبار التدريس؟ هذا هو الاختبار الوحيد الذي يهم هنا.'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit, two don’t. Name the pattern Toki has found across this school.', 'ثلاثة مشاهد تطابق النمط واثنان لا. سمِّ النمط الذي وجده توكي في هذه المدرسة.'),
    options: [
      { id: 'too-much', label: t('Teachers assess too often', 'يقيّم المعلّمون كثيرًا جدًا') },
      { id: 'compliance', label: t('Assessment has become compliance — recorded and reported, but not acted on', 'أصبح التقييم امتثالًا — يُسجَّل ويُبلَّغ، لكن لا يُعمل به') },
      { id: 'quality', label: t('The assessments are badly designed', 'التقييمات سيّئة التصميم') },
      { id: 'parents', label: t('Parents aren’t involved enough', 'أولياء الأمور غير مشاركين بما يكفي') },
    ],
    correctId: 'compliance',
    hint: t('The two healthy scenes had the same amount of assessment as the others. What was different about them?', 'كان في المشهدين السليمين قدر التقييم نفسه كما في غيرهما. ما الذي كان مختلفًا فيهما؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('A whole school doing a practice that looks rigorous and changes nothing. That’s not a drift in one room — it’s the mutation, institutionalised.', 'مدرسة كاملة تمارس شيئًا يبدو صارمًا ولا يغيّر شيئًا. هذا ليس انحرافًا في غرفة واحدة — إنه التحوّر وقد صار مؤسسيًا.'),
  },
  coaching: {
    prompt: t('You can’t coach forty teachers one by one this term. What is the one move with the greatest impact?', 'لا يمكنك تدريب أربعين معلّمًا واحدًا واحدًا هذا الفصل. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'audit', label: t('Audit assessment frequency and reduce it', 'دقّق في تكرار التقييم وقلّله') },
      { id: 'so-what', label: t('Change the Monday meeting: every number must arrive with a "so what" — a named decision for named students', 'غيّر اجتماع الاثنين: كل رقم يجب أن يأتي مع «وماذا بعد» — قرار مسمّى لطلاب مسمّين') },
      { id: 'training', label: t('Run a whole-staff workshop on assessment literacy', 'نظّم ورشة لكل الهيئة عن ثقافة التقييم') },
      { id: 'showcase', label: t('Showcase the Grade 4 and Grade 7 teachers as exemplars', 'اعرض معلّمي الصف الرابع والسابع نموذجين يُحتذى بهما') },
    ],
    correctId: 'so-what',
    hint: t('Find the one ritual every teacher already takes part in — and change what it asks of them.', 'ابحث عن الطقس الواحد الذي يشارك فيه كل معلّم أصلًا — وغيّر ما يطلبه منهم.'),
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
