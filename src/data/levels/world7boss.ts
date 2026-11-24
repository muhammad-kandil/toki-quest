import sceneImg from '../../assets/scenes/classroom-6-perfect.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/**
 * World 7 boss — The Invisible Mutation.
 * Everything looks right. The pattern the player must see is the
 * hardest one in the game: the practice has been kept perfectly and
 * its purpose has quietly left. Three scenes carry it; two are
 * practices that look old-fashioned or imperfect and are still doing
 * exactly what they were for.
 */
export const WORLD_7_BOSS: WorldBossDefinition = {
  id: 75,
  worldId: 'mutation-academy',
  title: t('The Invisible Mutation', 'التحوّر الخفي'),
  theme: t('Practice Kept, Purpose Gone', 'الممارسة باقية، الغاية راحلة'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'The Academy’s final test is a school where nothing is visibly wrong. Every practice Toki has learned to look for is present and polished. He is given five scenes and one instruction: look beyond appearance, and decide in each case whether the practice is still achieving the impact it was introduced to achieve.',
    'اختبار الأكاديمية الأخير مدرسة لا شيء فيها خاطئ بشكل مرئي. كل ممارسة تعلّم توكي البحث عنها حاضرة ومصقولة. يُعطى خمسة مشاهد وتعليمة واحدة: انظر إلى ما وراء المظهر، وقرّر في كل حالة ما إذا كانت الممارسة ما زالت تحقق الأثر الذي أُدخلت لتحققه.',
  ),
  scenes: [
    {
      id: 'objectives',
      place: t('Grade 7 — the learning objective', 'الصف السابع — هدف التعلّم'),
      observation: t('Objective on the board, in student books, read aloud at the start, ticked at the end. When Toki asks a student what it means, she reads it back to him word for word.', 'الهدف على السبورة، وفي دفاتر الطلاب، يُقرأ بصوت عالٍ في البداية، ويُؤشَّر عليه في النهاية. حين يسأل توكي طالبة عن معناه، تعيد قراءته له كلمة كلمة.'),
      fitsPattern: true,
      finding: t('The objective is displayed, copied, read and ticked — and understood by no one. The ritual survived; the thinking it was meant to trigger did not.', 'الهدف معروض ومنسوخ ومقروء ومؤشَّر عليه — ولا يفهمه أحد. بقي الطقس؛ ولم يبقَ التفكير الذي كان يُفترض أن يثيره.'),
      hint: t('She can say it. Can she use it? What was sharing the objective originally for?', 'تستطيع قوله. هل تستطيع استخدامه؟ ما الذي كانت مشاركة الهدف تهدف إليه أصلًا؟'),
    },
    {
      id: 'messy',
      place: t('Grade 4 — the messy lesson', 'الصف الرابع — الدرس الفوضوي'),
      observation: t('No objective on the board. The teacher abandons her plan at minute ten when the whiteboards show half the class has a misconception, and spends the rest of the lesson on it. Her plan says "fractions on a number line"; the lesson was "what a fraction is".', 'لا هدف على السبورة. تتخلى المعلّمة عن خطتها في الدقيقة العاشرة حين تُظهر السبورات الصغيرة أن نصف الصف لديه فهم خاطئ، وتقضي بقية الدرس عليه. تقول خطتها «الكسور على خط الأعداد»؛ وكان الدرس «ما الكسر».'),
      fitsPattern: false,
      finding: t('It looks like a lesson that lost its way. It is a teacher putting learning above the plan — which is the purpose every plan exists to serve.', 'يبدو درسًا ضلّ طريقه. إنه معلّمة تضع التعلّم فوق الخطة — وهي الغاية التي توجد كل خطة لخدمتها.'),
      hint: t('Which matters more — that the plan was followed, or that the misconception was fixed?', 'أيهما أهم — أن تُتبع الخطة، أم أن يُصحَّح الفهم الخاطئ؟'),
    },
    {
      id: 'data',
      place: t('The data meeting', 'اجتماع البيانات'),
      observation: t('Weekly, on time, every teacher present, dashboards on screen. Completion rates are read out. Teachers below target explain. The meeting ends with the same action as last week: "push completion."', 'أسبوعي، في موعده، كل المعلّمين حاضرون، لوحات البيانات على الشاشة. تُقرأ نسب الإكمال. يشرح المعلّمون دون الهدف. ينتهي الاجتماع بالإجراء نفسه كالأسبوع الماضي: «ادفعوا الإكمال.»'),
      fitsPattern: true,
      finding: t('Data meetings were introduced so teaching would change. This one changes nothing and has for months. The meeting is alive; the decision-making it was for is gone.', 'أُدخلت اجتماعات البيانات لكي يتغيّر التدريس. هذا الاجتماع لا يغيّر شيئًا منذ أشهر. الاجتماع حي؛ وصنع القرار الذي كان من أجله راحل.'),
      hint: t('What decision did the meeting produce? Compare it with last week’s.', 'أي قرار أنتجه الاجتماع؟ قارنه بقرار الأسبوع الماضي.'),
    },
    {
      id: 'marking',
      place: t('Grade 9 — the marking', 'الصف التاسع — التصحيح'),
      observation: t('The books are not marked every lesson. Policy says they should be. Instead, every two weeks each student gets one long comment on one piece, and the next lesson begins with twenty minutes of redrafting against it.', 'لا تُصحَّح الدفاتر كل درس. تقول السياسة إنه ينبغي ذلك. بدلًا من ذلك، يحصل كل طالب كل أسبوعين على تعليق واحد طويل على قطعة واحدة، ويبدأ الدرس التالي بعشرين دقيقة من إعادة الصياغة وفقًا له.'),
      fitsPattern: false,
      finding: t('It breaks the policy and keeps the purpose. Feedback exists so students act on it; here they do, for twenty minutes, every fortnight.', 'يخالف السياسة ويحتفظ بالغاية. توجد التغذية الراجعة ليعمل بها الطلاب؛ وهنا يفعلون، عشرين دقيقة، كل أسبوعين.'),
      hint: t('The policy is a practice. What was the practice for — and is that happening?', 'السياسة ممارسة. ما الذي كانت الممارسة من أجله — وهل يحدث ذلك؟'),
    },
    {
      id: 'plenary',
      place: t('Grade 6 — the plenary', 'الصف السادس — الخاتمة'),
      observation: t('Every lesson ends with the same plenary: "Thumbs up if you understood." Twenty-six thumbs. The teacher notes "100% understood" in the register and the next lesson begins where the plan says it should.', 'ينتهي كل درس بالخاتمة نفسها: «ارفعوا الإبهام إن فهمتم.» ستة وعشرون إبهامًا. تدوّن المعلّمة «فهم ١٠٠٪» في السجل ويبدأ الدرس التالي حيث تقول الخطة.'),
      fitsPattern: true,
      finding: t('A plenary exists to find out what was not learned. This one cannot, by design, ever find anything. It has mutated into a way of ending on time.', 'توجد الخاتمة لمعرفة ما لم يُتعلَّم. هذه لا تستطيع، بحكم تصميمها، أن تجد شيئًا أبدًا. تحوّرت إلى طريقة للإنهاء في الوقت.'),
      hint: t('When was the last time this plenary changed what happened next?', 'متى كانت آخر مرة غيّرت فيها هذه الخاتمة ما حدث بعدها؟'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes shared one mutation. Name it.', 'تشاركت ثلاثة مشاهد تحوّرًا واحدًا. سمِّه.'),
    options: [
      { id: 'purpose', label: t('The practice was preserved perfectly, and its purpose quietly left', 'حُفظت الممارسة بشكل مثالي، ورحلت غايتها بهدوء') },
      { id: 'compliance', label: t('Teachers are not following the school’s policies', 'المعلّمون لا يتبعون سياسات المدرسة') },
      { id: 'effort', label: t('Teachers are not working hard enough', 'المعلّمون لا يعملون بجد كافٍ') },
      { id: 'tech', label: t('Technology is over-used', 'التقنية مُفرَط في استخدامها') },
    ],
    correctId: 'purpose',
    hint: t('The two healthy scenes both broke a rule. The three mutated scenes all kept one. What does that tell you the pattern is about?', 'خالف المشهدان السليمان قاعدة. وحافظت المشاهد الثلاثة المتحوّرة على واحدة. ماذا يخبرك ذلك عن النمط؟'),
  },
  assessRisk: {
    prompt: t('How serious is a mutation that nobody can see?', 'ما مدى خطورة تحوّر لا يراه أحد؟'),
    correctId: 'lethal',
    hint: t('Three practices that look perfect and do nothing, copied school-wide and praised. This is the definition the whole quest has been building toward.', 'ثلاث ممارسات تبدو مثالية ولا تفعل شيئًا، منسوخة على مستوى المدرسة ومُمتدَحة. هذا هو التعريف الذي كانت الرحلة كلها تبني نحوه.'),
  },
  coaching: {
    prompt: t('The leadership team asks Toki for his recommendation. What is the systemic move?', 'يطلب فريق القيادة من توكي توصيته. ما الخطوة المنهجية؟'),
    options: [
      { id: 'why', label: t('Replace "is the practice present?" with "is the practice still doing what it was introduced to do?" — in every observation form, every data meeting, every policy review', 'استبدل «هل الممارسة حاضرة؟» بـ «هل ما زالت الممارسة تفعل ما أُدخلت لتفعله؟» — في كل نموذج ملاحظة، كل اجتماع بيانات، كل مراجعة سياسة') },
      { id: 'enforce', label: t('Enforce the policies more consistently — including in Grades 4 and 9', 'افرض السياسات بمزيد من الاتساق — بما في ذلك الصفان الرابع والتاسع') },
      { id: 'new', label: t('Introduce three new practices to replace the tired ones', 'أدخل ثلاث ممارسات جديدة لتحلّ محل المُنهَكة') },
      { id: 'train', label: t('Run a training day on objectives, plenaries and data', 'نفّذ يوم تدريب عن الأهداف والخواتم والبيانات') },
    ],
    correctId: 'why',
    hint: t('New practices will mutate the same way if the question stays the same. Which move changes the question?', 'ستتحوّر الممارسات الجديدة بالطريقة نفسها إن بقي السؤال كما هو. أي خطوة تغيّر السؤال؟'),
  },
  reveal: {
    whatDrifted: t('Every practice in this school was once an answer to a question about learning. The school kept the answers and forgot the questions.', 'كانت كل ممارسة في هذه المدرسة يومًا إجابة عن سؤال عن التعلّم. احتفظت المدرسة بالإجابات ونسيت الأسئلة.'),
    whyItHappened: t('Appearance is checkable in a glance; impact takes a conversation. Over years, what gets checked is what gets kept.', 'المظهر يمكن فحصه بنظرة؛ والأثر يحتاج محادثة. على مرّ السنين، ما يُفحص هو ما يُحفظ.'),
    howToRestore: t('Audit purposes, not practices. For each routine ask what it was for, whether that is still happening, and what evidence would show it. Keep the two "rule-breakers" — they are the healthiest classrooms in the building.', 'دقّق الغايات لا الممارسات. اسأل عن كل روتين: ما الذي كان من أجله، وهل ما زال يحدث، وأي دليل يُظهره. احتفظ بـ«مخالفي القواعد» الاثنين — فهما أسلم صفّين في المبنى.'),
    finalWord: t('The most dangerous drift preserves the appearance of effective teaching while quietly changing its purpose. You can see it now.', 'أخطر انحراف يحفظ مظهر التدريس الفعّال بينما يغيّر غايته بهدوء. تستطيع رؤيته الآن.'),
  },
  points: { scenes: 50, pattern: 20, risk: 10, coaching: 30 },
  badgeTriggers: ['mutation-hunter'],
};
