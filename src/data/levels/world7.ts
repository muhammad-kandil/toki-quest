/**
 * WORLD 7 — The Lethal Mutation Academy
 * Theme: Can You Spot the Invisible Drift?
 *
 * Advanced classrooms. Fewer hints. A room may hold one mutation,
 * several, a minor drift, or none at all — and the player must avoid
 * over-coaching. The challenge is no longer "what is wrong?" but
 * "what does the evidence actually support?"
 *
 * Scenes reuse existing classroom art until World 7 art is produced.
 */
import scenePerfect from '../../assets/scenes/classroom-6-perfect.jpg';
import sceneOutput from '../../assets/scenes/classroom-3-output.jpg';
import sceneActivity from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import type { AcademyLevelDefinition } from '../academyTypes';
import { t } from '../../i18n/types';
import { CONVO_71, CONVO_72, CONVO_73, CONVO_74 } from './conversations7';

const POINTS = { diagnosis: 50, risk: 20, coaching: 30, conversation: 25 };

/** 71 — one subtle mutation inside a classroom that has everything. */
export const LEVEL_71: AcademyLevelDefinition = {
  id: 71,
  worldId: 'mutation-academy',
  title: t('The Almost Perfect Classroom', 'الصف شبه المثالي'),
  theme: t('Implementation ≠ Impact', 'التنفيذ ≠ الأثر'),
  subject: t('Mathematics', 'الرياضيات'),
  sceneImage: scenePerfect,
  scenario: t(
    'Clear objectives on the board. Strong routines. Group work that runs itself. Alef on every device, a visible exit ticket, confident students. The principal calls it the model classroom and sends new teachers here to watch. Toki watches too — and then asks the only question that matters.',
    'أهداف واضحة على السبورة. روتين قوي. عمل جماعي يسير من تلقاء نفسه. «ألف» على كل جهاز، بطاقة خروج مرئية، طلاب واثقون. يسمّيه مدير المدرسة الصف النموذجي ويرسل المعلّمين الجدد لمشاهدته. يشاهد توكي أيضًا — ثم يطرح السؤال الوحيد الذي يهم.',
  ),
  evidence: [
    { id: 'board', x: 22, y: 30, label: t('The objective', 'الهدف'), clue: t('"Students will be able to solve two-step equations." Referred to twice during the lesson.', '«سيتمكن الطلاب من حل معادلات ذات خطوتين.» أُشير إليه مرتين أثناء الدرس.') },
    { id: 'groups', x: 48, y: 60, label: t('Group work', 'العمل الجماعي'), clue: t('Four groups, each with a leader, timer and roles. Every group finishes the task sheet on time.', 'أربع مجموعات، لكل منها قائد ومؤقّت وأدوار. تنهي كل مجموعة ورقة المهمة في الوقت المحدد.') },
    { id: 'ticket', x: 76, y: 42, label: t('Exit ticket', 'بطاقة الخروج'), clue: t('One question. Nine of twenty-four students solve it correctly. The teacher thanks the class for a great lesson.', 'سؤال واحد. يحلّه تسعة من أربعة وعشرين طالبًا بشكل صحيح. يشكر المعلّم الصف على درس رائع.') },
    { id: 'file', x: 62, y: 80, label: t('The lesson file', 'ملف الدرس'), clue: t('A full evaluation form: routines ✓, engagement ✓, technology ✓, assessment ✓. No box asks what students can now do.', 'نموذج تقييم كامل: الروتين ✓، التفاعل ✓، التقنية ✓، التقييم ✓. لا خانة تسأل ماذا يستطيع الطلاب فعله الآن.') },
  ],
  diagnosis: {
    prompt: t('File your diagnosis. Tick every finding the evidence supports — and nothing it doesn’t.', 'سجّل تشخيصك. ضع علامة على كل نتيجة يدعمها الدليل — ولا شيء غير ذلك.'),
    findings: [
      { id: 'impact', label: t('The lesson is judged by what the teacher did, not by what students learned', 'يُحكم على الدرس بما فعله المعلّم، لا بما تعلّمه الطلاب'), present: true, note: t('Fifteen of twenty-four students left unable to meet the objective, and every form said "excellent". Impact is the one thing nobody measured.', 'غادر خمسة عشر من أربعة وعشرين طالبًا دون تحقيق الهدف، وكل نموذج قال «ممتاز». الأثر هو الشيء الوحيد الذي لم يقسه أحد.') },
      { id: 'objective', label: t('The objective is decorative — never used in the lesson', 'الهدف شكلي — لا يُستخدم في الدرس'), present: false, note: t('It was referred to twice and the exit ticket tested it. The objective is alive.', 'أُشير إليه مرتين واختبرته بطاقة الخروج. الهدف حي.') },
      { id: 'groups', label: t('Group work is off-task activity', 'العمل الجماعي نشاط خارج المهمة'), present: false, note: t('Groups were on task and finished. The structure works — it just wasn’t asked to produce learning evidence.', 'كانت المجموعات على المهمة وأنهتها. البنية تعمل — لكن لم يُطلب منها إنتاج دليل على التعلّم.') },
      { id: 'tech', label: t('Technology is replacing the teacher’s instruction', 'التقنية تحلّ محل تدريس المعلّم'), present: false, note: t('Alef supported practice; the teacher taught. Nothing in the evidence says otherwise.', 'دعمت «ألف» التدريب؛ والمعلّم درّس. لا شيء في الدليل يقول غير ذلك.') },
      { id: 'control', label: t('Classroom control has broken down', 'انهار ضبط الصف'), present: false, note: t('The room ran like a clock. Control was never the problem.', 'سار الصف كالساعة. لم يكن الضبط هو المشكلة يومًا.') },
    ],
    hintOver: t('One of the things you ticked is contradicted by a clue. Which clue describes a practice doing its job — and which finding did you tick anyway?', 'أحد ما وضعت عليه علامة يناقضه أحد الأدلة. أي دليل يصف ممارسة تؤدي عملها — وأي نتيجة وضعت عليها علامة رغم ذلك؟'),
    hintUnder: t('Put the exit ticket next to the lesson file. One has a number in it. What does the other one never ask?', 'ضع بطاقة الخروج بجانب ملف الدرس. في أحدهما رقم. عمّ لا يسأل الآخر أبدًا؟'),
    hintSpotId: 'ticket',
  },
  assessRisk: {
    prompt: t('What should Toki prioritise — and how serious is what he found?', 'ما الذي ينبغي أن يعطيه توكي الأولوية — وما مدى خطورة ما وجده؟'),
    correctId: 'high',
    hint: t('Go back to the exit ticket: nine of twenty-four. Then the lesson file: every box ticked. If this room is the one new teachers are sent to watch, what spreads with it?', 'ارجع إلى بطاقة الخروج: تسعة من أربعة وعشرين. ثم ملف الدرس: كل الخانات مؤشَّرة. لو كان هذا الصف هو ما يُرسَل المعلّمون الجدد لمشاهدته، فما الذي ينتشر معه؟'),
    hintSpotId: 'file',
  },
  coaching: {
    prompt: t('Toki has ten minutes with the teacher. What does he do?', 'لدى توكي عشر دقائق مع المعلّم. ماذا يفعل؟'),
    options: [
      { id: 'evidence', label: t('Ask one question: "What can they do now that they couldn’t at 8:00?" — and work backwards from the nine', 'اطرح سؤالًا واحدًا: «ماذا يستطيعون فعله الآن ولم يستطيعوا في الثامنة؟» — وارجع من التسعة') },
      { id: 'affirm', label: t('Affirm the lesson and leave — it is the model classroom', 'أشِد بالدرس وغادر — فهو الصف النموذجي') },
      { id: 'routines', label: t('Suggest tightening the routines further', 'اقترح إحكام الروتين أكثر') },
      { id: 'report', label: t('Write a full report listing every strength for the principal', 'اكتب تقريرًا كاملًا يسرد كل نقاط القوة للمدير') },
    ],
    correctId: 'evidence',
    hint: t('Go back to the exit ticket: nine of twenty-four, and a thank-you for a great lesson. What would Toki want the teacher to look at before he leaves?', 'عُد إلى بطاقة الخروج: تسعة من أربعة وعشرين، وشكر على درس رائع. ما الذي يريد توكي أن ينظر إليه المعلّم قبل أن يغادر؟'),
    hintSpotId: 'ticket',
  },
  conversation: CONVO_71,
  reveal: {
    verdict: t('One finding. Everything else was healthy — and saying so is part of the diagnosis.', 'نتيجة واحدة. كل ما عداها كان سليمًا — وقول ذلك جزء من التشخيص.'),
    whatDrifted: t('The school learned to evaluate teaching by its ingredients. Routines, engagement, technology, assessment — all present, all ticked. Learning became the one ingredient nobody weighed.', 'تعلّمت المدرسة تقييم التدريس بمكوّناته. روتين، تفاعل، تقنية، تقييم — كلها حاضرة، كلها مؤشَّر عليها. وأصبح التعلّم المكوّن الوحيد الذي لم يزنه أحد.'),
    whyItHappened: t('Implementation is visible in one visit. Impact takes a second question. When observation forms reward what is visible, teachers polish what is visible.', 'التنفيذ مرئي في زيارة واحدة. الأثر يحتاج سؤالًا ثانيًا. حين تكافئ نماذج الملاحظة ما هو مرئي، يصقل المعلّمون ما هو مرئي.'),
    howToRestore: t('Add the second question to every visit — "and what can they do now?" — and let the exit ticket, not the form, decide whether the lesson was excellent.', 'أضف السؤال الثاني إلى كل زيارة — «وماذا يستطيعون فعله الآن؟» — ودع بطاقة الخروج، لا النموذج، تقرّر ما إذا كان الدرس ممتازًا.'),
  },
  points: POINTS,
  badgeTriggers: ['mutation-hunter'],
};

/** 72 — no mutation. The room looks underwhelming; it is healthy. */
export const LEVEL_72: AcademyLevelDefinition = {
  id: 72,
  worldId: 'mutation-academy',
  title: t('The Quiet Lesson', 'الدرس الهادئ'),
  theme: t('Unimpressive ≠ Drifting', 'غير مبهر ≠ منحرف'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneOutput,
  scenario: t(
    'No music. No group roles. No devices on the desks. The teacher explains for twelve minutes while students listen, then the room goes quiet for half an hour of writing. A visiting leader has already noted "low engagement, no technology". Toki is asked to confirm it.',
    'لا موسيقى. لا أدوار جماعية. لا أجهزة على الطاولات. تشرح المعلّمة اثنتي عشرة دقيقة بينما يستمع الطلاب، ثم يهدأ الصف نصف ساعة من الكتابة. دوّن قائد زائر بالفعل «تفاعل منخفض، لا تقنية». يُطلب من توكي تأكيد ذلك.',
  ),
  evidence: [
    { id: 'explain', x: 24, y: 34, label: t('The twelve minutes', 'الدقائق الاثنتا عشرة'), clue: t('The teacher writes a paragraph live, thinking aloud about each choice. Students annotate a copy as she goes.', 'تكتب المعلّمة فقرة مباشرة، مفكّرة بصوت عالٍ في كل اختيار. يدوّن الطلاب ملاحظاتهم على نسخة أثناء ذلك.') },
    { id: 'whiteboards', x: 50, y: 58, label: t('Mini whiteboards', 'السبورات الصغيرة'), clue: t('Three times, every student holds up an answer. The teacher scans all twenty-six and adjusts the next example.', 'ثلاث مرات يرفع كل طالب إجابة. تمسح المعلّمة الستة والعشرين جميعًا وتعدّل المثال التالي.') },
    { id: 'books', x: 78, y: 44, label: t('Exercise books', 'الدفاتر'), clue: t('Yesterday’s margin note: "Your evidence is strong — now explain why it proves your point." Today’s paragraph does.', 'ملاحظة الأمس على الهامش: «دليلك قوي — اشرح الآن لماذا يثبت وجهة نظرك.» فقرة اليوم تفعل ذلك.') },
    { id: 'alef', x: 64, y: 80, label: t('The Alef report', 'تقرير «ألف»'), clue: t('Used yesterday as a diagnostic. The teacher has today’s groups of "not yet" students listed on a sticky note and visits them first.', 'استُخدم أمس كتشخيص. لدى المعلّمة قائمة بطلاب «ليس بعد» اليوم على ورقة لاصقة وتزورهم أولًا.') },
  ],
  diagnosis: {
    prompt: t('File your diagnosis. Tick every finding the evidence supports — and nothing it doesn’t.', 'سجّل تشخيصك. ضع علامة على كل نتيجة يدعمها الدليل — ولا شيء غير ذلك.'),
    findings: [
      { id: 'talk', label: t('Teacher talk is replacing student practice', 'حديث المعلّمة يحلّ محل تدريب الطلاب'), present: false, note: t('Twelve minutes of modelled thinking, then thirty of practice. That is the right ratio, not a drift.', 'اثنتا عشرة دقيقة من التفكير المنمذج، ثم ثلاثون من التدريب. هذه النسبة الصحيحة، لا انحراف.') },
      { id: 'participation', label: t('Participation is low — few students respond', 'المشاركة منخفضة — قلّة من الطلاب يستجيبون'), present: false, note: t('All twenty-six answered three times. No hands up, because nobody needed them.', 'أجاب الستة والعشرون ثلاث مرات. لا أيدٍ مرفوعة، لأن أحدًا لم يحتجها.') },
      { id: 'feedback', label: t('Feedback is absent', 'التغذية الراجعة غائبة'), present: false, note: t('Yesterday’s feedback changed today’s writing. That is feedback working exactly as intended.', 'غيّرت تغذية الأمس الراجعة كتابة اليوم. هذه التغذية الراجعة تعمل تمامًا كما يُراد لها.') },
      { id: 'tech', label: t('Alef is not being used to support learning', '«ألف» لا تُستخدم لدعم التعلّم'), present: false, note: t('It was used as a diagnostic and it decided who she visits first. Purposeful use is not always on-screen use.', 'استُخدمت كتشخيص وقرّرت مَن تزوره أولًا. الاستخدام الهادف ليس دائمًا على الشاشة.') },
      { id: 'objective', label: t('There is no clear learning objective', 'لا يوجد هدف تعلّم واضح'), present: false, note: t('"Explain why your evidence proves your point" — in the books, in the modelling, in the whiteboard checks. It is everywhere except the wall.', '«اشرح لماذا يثبت دليلك وجهة نظرك» — في الدفاتر، في النمذجة، في فحوص السبورات. إنه في كل مكان إلا الجدار.') },
    ],
    hintOver: t('For each finding you ticked, find the clue that answers it. Who answered the whiteboard checks? What did yesterday’s margin note change today? Where is the objective written?', 'لكل نتيجة وضعت عليها علامة، ابحث عن الدليل الذي يجيب عنها. مَن أجاب عن فحوص السبورات؟ ماذا غيّرت ملاحظة الأمس على الهامش اليوم؟ أين كُتب الهدف؟'),
    hintUnder: t('Read the four clues again. Is there a single clue in which a student is not learning? If not, what is the honest number of findings?', 'أعد قراءة الأدلة الأربعة. هل يوجد دليل واحد لا يتعلّم فيه طالب؟ إن لم يوجد، فما العدد الصادق للنتائج؟'),
    hintSpotId: 'whiteboards',
  },
  assessRisk: {
    prompt: t('How serious is what Toki found?', 'ما مدى خطورة ما وجده توكي؟'),
    correctId: 'none',
    hint: t('The visiting leader wrote "low engagement". Look at the whiteboards clue: how many students answered, and how many times? Then ask what the word "engagement" was measuring.', 'كتب القائد الزائر «تفاعل منخفض». انظر إلى دليل السبورات الصغيرة: كم طالبًا أجاب، وكم مرة؟ ثم اسأل ما الذي كانت كلمة «التفاعل» تقيسه.'),
    hintSpotId: 'whiteboards',
  },
  coaching: {
    prompt: t('The visiting leader is waiting for Toki’s confirmation. What does Toki do?', 'ينتظر القائد الزائر تأكيد توكي. ماذا يفعل توكي؟'),
    options: [
      { id: 'affirm', label: t('Name precisely what is working — the whiteboard checks, the feedback loop — so the teacher keeps it, and correct the note', 'سمِّ بدقة ما يعمل — فحوص السبورات، حلقة التغذية الراجعة — لتحتفظ به المعلّمة، وصحّح الملاحظة') },
      { id: 'groups', label: t('Suggest adding group work to raise engagement', 'اقترح إضافة عمل جماعي لرفع التفاعل') },
      { id: 'alef', label: t('Recommend using Alef on devices during the lesson', 'أوصِ باستخدام «ألف» على الأجهزة أثناء الدرس') },
      { id: 'objective', label: t('Ask the teacher to display the objective on the board', 'اطلب من المعلّمة عرض الهدف على السبورة') },
    ],
    correctId: 'affirm',
    hint: t('Take each move and ask which clue it would overwrite. The exercise books, the whiteboards, the Alef report — which of these moves leaves all three untouched?', 'خذ كل خطوة واسأل أي دليل ستمحوه. الدفاتر، السبورات الصغيرة، تقرير «ألف» — أي من هذه الخطوات تترك الثلاثة كما هي؟'),
    hintSpotId: 'books',
  },
  conversation: CONVO_72,
  reveal: {
    verdict: t('No findings. The hardest diagnosis to file — and the one that earns a teacher’s trust for the next five visits.', 'لا نتائج. أصعب تشخيص يُسجَّل — وهو ما يكسب ثقة المعلّمة للزيارات الخمس التالية.'),
    whatDrifted: t('Nothing in the classroom. What drifted was the observer: a rubric that mistakes visible activity for learning, and quiet for its absence.', 'لا شيء في الصف. ما انحرف هو المراقب: سلّم تقدير يخلط بين النشاط المرئي والتعلّم، وبين الهدوء وغيابه.'),
    whyItHappened: t('Engagement is easy to see and thinking is not. Lists of "look-fors" slowly turn into lists of "must-haves".', 'التفاعل سهل الرؤية والتفكير ليس كذلك. قوائم «ما نبحث عنه» تتحوّل ببطء إلى قوائم «ما يجب أن يكون».'),
    howToRestore: t('Judge lessons by what every student did with their mind, not by what the room did with its furniture. Then tell the teacher exactly what to keep.', 'احكم على الدروس بما فعله كل طالب بعقله، لا بما فعلته الغرفة بأثاثها. ثم أخبر المعلّمة تحديدًا بما تحتفظ به.'),
  },
  points: POINTS,
  badgeTriggers: ['mutation-hunter'],
};

/** 73 — three mutations inside a showcase lesson, and two healthy practices to leave alone. */
export const LEVEL_73: AcademyLevelDefinition = {
  id: 73,
  worldId: 'mutation-academy',
  title: t('The Showcase Lesson', 'درس العرض'),
  theme: t('Several Drifts, One Priority', 'انحرافات عدّة، أولوية واحدة'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneActivity,
  scenario: t(
    'An announced observation. The lesson has been rehearsed: a hook video, a timed carousel, Alef as the prize for early finishers, a feelings-faces exit ticket. The teacher is talented and nervous. Toki has one visit to see what is real underneath — and one conversation afterwards.',
    'ملاحظة مُعلنة. الدرس مُتدرَّب عليه: فيديو تمهيدي، دوّارة أنشطة موقوتة، «ألف» جائزة لمن ينهي مبكرًا، بطاقة خروج بوجوه المشاعر. المعلّمة موهوبة ومتوترة. لدى توكي زيارة واحدة ليرى ما هو حقيقي تحت السطح — ومحادثة واحدة بعدها.',
  ),
  evidence: [
    { id: 'questions', x: 24, y: 36, label: t('The questions', 'الأسئلة'), clue: t('Eleven questions asked. Answered by Omar, Hind, Omar, Sara, Omar, Hind… three students, every time.', 'أحد عشر سؤالًا طُرح. أجاب عمر، هند، عمر، سارة، عمر، هند… ثلاثة طلاب، في كل مرة.') },
    { id: 'alef', x: 52, y: 58, label: t('The early finishers', 'المنتهون مبكرًا'), clue: t('"Finished? Go on Alef." Two tables open the app within four minutes and browse any lesson they like.', '«انتهيت؟ ادخل على ألف.» تفتح طاولتان التطبيق خلال أربع دقائق وتتصفحان أي درس تشاءان.') },
    { id: 'diag', x: 78, y: 40, label: t('Two task cards', 'بطاقتا مهمة'), clue: t('Group A and Group B have different investigations. The teacher’s plan shows they were assigned from last week’s diagnostic.', 'لدى المجموعة «أ» والمجموعة «ب» استقصاءان مختلفان. تُظهر خطة المعلّمة أنهما أُسندا بناءً على تشخيص الأسبوع الماضي.') },
    { id: 'ticket', x: 64, y: 82, label: t('Exit ticket', 'بطاقة الخروج'), clue: t('"Circle how you felt about today’s lesson." Twenty-two smiles. Nothing about what was learned.', '«ضع دائرة حول شعورك تجاه درس اليوم.» اثنتان وعشرون ابتسامة. لا شيء عمّا تعلّموه.') },
  ],
  diagnosis: {
    prompt: t('File your diagnosis. Tick every finding the evidence supports — and nothing it doesn’t.', 'سجّل تشخيصك. ضع علامة على كل نتيجة يدعمها الدليل — ولا شيء غير ذلك.'),
    findings: [
      { id: 'three', label: t('Three students are doing the thinking for twenty-four', 'ثلاثة طلاب يفكّرون نيابة عن أربعة وعشرين'), present: true, note: t('Eleven questions, three voices. The lesson looked interactive and was a conversation with three people.', 'أحد عشر سؤالًا، ثلاثة أصوات. بدا الدرس تفاعليًا وكان محادثة مع ثلاثة أشخاص.') },
      { id: 'prize', label: t('Alef has become a reward, not a learning tool', 'أصبحت «ألف» مكافأة لا أداة تعلّم'), present: true, note: t('"Go on Alef" as a prize for finishing teaches students that the platform is what you do when learning is over.', '«ادخل على ألف» كجائزة للإنهاء يعلّم الطلاب أن المنصة ما تفعله حين ينتهي التعلّم.') },
      { id: 'feelings', label: t('The exit ticket measures enjoyment, not learning', 'تقيس بطاقة الخروج المتعة لا التعلّم'), present: true, note: t('Twenty-two smiles tell the teacher nothing about tomorrow’s first five minutes.', 'اثنتان وعشرون ابتسامة لا تخبر المعلّمة شيئًا عن الدقائق الخمس الأولى من الغد.') },
      { id: 'diff', label: t('Differentiation is cosmetic — the same task relabelled', 'التمايز شكلي — المهمة نفسها بعنوان مختلف'), present: false, note: t('Two genuinely different investigations, assigned from real diagnostic data. This is differentiation done properly. Leave it alone.', 'استقصاءان مختلفان فعلًا، أُسندا من بيانات تشخيصية حقيقية. هذا تمايز يُجرى كما ينبغي. اتركه كما هو.') },
      { id: 'hook', label: t('The hook video wasted the lesson', 'أهدر الفيديو التمهيدي الدرس'), present: false, note: t('Ninety seconds that set up the question. There is no evidence it cost anything.', 'تسعون ثانية مهّدت للسؤال. لا دليل على أنها كلّفت شيئًا.') },
    ],
    hintOver: t('One of your ticks points at the two task cards. Read that clue again: where did the two cards come from, and what week?', 'إحدى علاماتك تشير إلى بطاقتي المهمة. أعد قراءة ذلك الدليل: من أين جاءت البطاقتان، وفي أي أسبوع؟'),
    hintUnder: t('Count the voices in the questions clue. Read what the early finishers were told. Read the exit ticket question word for word. How many separate things did you just see?', 'عُدّ الأصوات في دليل الأسئلة. اقرأ ما قيل للمنتهين مبكرًا. اقرأ سؤال بطاقة الخروج كلمة كلمة. كم شيئًا منفصلًا رأيت للتو؟'),
    hintSpotId: 'questions',
  },
  assessRisk: {
    prompt: t('Three drifts in one rehearsed lesson. How serious?', 'ثلاثة انحرافات في درس واحد مُتدرَّب عليه. ما مدى الخطورة؟'),
    correctId: 'high',
    hint: t('Eleven questions, three voices; Alef as a prize; a smiley-face ticket. Could any of these three still serve learning tomorrow if the teacher chose to? Does that make them harmless, or does rehearsing all three for an observer make them something else?', 'أحد عشر سؤالًا، ثلاثة أصوات؛ «ألف» جائزة؛ بطاقة وجوه مبتسمة. هل يمكن لأي من هذه الثلاثة أن يخدم التعلّم غدًا لو اختارت المعلّمة ذلك؟ هل يجعلها ذلك غير مؤذية، أم أن التدرّب على الثلاثة لمراقب يجعلها شيئًا آخر؟'),
    hintSpotId: 'ticket',
  },
  coaching: {
    prompt: t('The teacher asks, "How did it go?" Toki has one conversation. What does he do with three findings?', 'تسأل المعلّمة: «كيف سار الدرس؟» لدى توكي محادثة واحدة. ماذا يفعل بثلاث نتائج؟'),
    options: [
      { id: 'one', label: t('Start with the one closest to learning — who is answering — and make every student answer the next question. The rest can wait a week', 'ابدأ بالأقرب إلى التعلّم — مَن يجيب — واجعل كل طالب يجيب عن السؤال التالي. البقية يمكن أن تنتظر أسبوعًا') },
      { id: 'all', label: t('List all three in a written report so nothing is missed', 'اسرد الثلاثة في تقرير مكتوب حتى لا يفوت شيء') },
      { id: 'praise', label: t('Praise the showcase — it was clearly a lot of work', 'امدح العرض — فمن الواضح أنه تطلّب جهدًا كبيرًا') },
      { id: 'ticket', label: t('Fix the exit ticket first — it is the easiest change', 'أصلح بطاقة الخروج أولًا — فهي أسهل تغيير') },
    ],
    correctId: 'one',
    hint: t('Read the questions clue again: eleven questions, three voices. A nervous teacher after a showcase can carry how much home — and where would you want her to start?', 'أعد قراءة دليل الأسئلة: أحد عشر سؤالًا، ثلاثة أصوات. كم تستطيع معلّمة متوترة بعد درس عرض أن تحمل معها إلى البيت — ومن أين تريدها أن تبدأ؟'),
    hintSpotId: 'questions',
  },
  conversation: CONVO_73,
  reveal: {
    verdict: t('Three findings, two healthy practices protected, one priority chosen. That is a diagnosis, not a list.', 'ثلاث نتائج، ممارستان سليمتان محميّتان، أولوية واحدة مختارة. هذا تشخيص، لا قائمة.'),
    whatDrifted: t('The lesson was built to be watched. Questioning became performance, the platform became a prize, and the exit ticket asked about feelings because feelings are always good news.', 'بُني الدرس ليُشاهَد. أصبحت الأسئلة أداءً، والمنصة جائزة، وسألت بطاقة الخروج عن المشاعر لأن المشاعر دائمًا خبر جيد.'),
    whyItHappened: t('Announced observations reward what observers can see in forty minutes. A talented, nervous teacher optimised for exactly that.', 'تكافئ الملاحظات المُعلنة ما يستطيع المراقبون رؤيته في أربعين دقيقة. معلّمة موهوبة ومتوترة حسّنت لذلك تحديدًا.'),
    howToRestore: t('One change at a time, starting where the thinking is: no hands, every student answers, cold call from the whiteboards. Keep the two-task differentiation exactly as it is.', 'تغيير واحد في كل مرة، بدءًا من حيث التفكير: لا أيدٍ، كل طالب يجيب، نداء بالاسم من السبورات. احتفظ بتمايز المهمتين كما هو تمامًا.'),
  },
  points: POINTS,
  badgeTriggers: ['mutation-hunter'],
};

/** 74 — a minor drift. The right answer is a light touch, not a cycle. */
export const LEVEL_74: AcademyLevelDefinition = {
  id: 74,
  worldId: 'mutation-academy',
  title: t('The Small Thing', 'الشيء الصغير'),
  theme: t('Proportion Is Judgement', 'التناسب حكم'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: sceneAssess,
  scenario: t(
    'A strong teacher, a strong lesson. Success criteria are shared at the start, work is checked, feedback lands. Toki notices one thing. The question is not whether he is right. The question is what a finding this size deserves.',
    'معلّمة قوية، ودرس قوي. تُشارَك معايير النجاح في البداية، ويُفحص العمل، وتصل التغذية الراجعة. يلاحظ توكي شيئًا واحدًا. السؤال ليس ما إذا كان على حق. السؤال هو ما الذي تستحقه نتيجة بهذا الحجم.',
  ),
  evidence: [
    { id: 'criteria', x: 22, y: 32, label: t('Success criteria', 'معايير النجاح'), clue: t('Three criteria shared at 10:02, read aloud by a student. Not mentioned again. The lesson ends at 10:45 on the bell.', 'ثلاثة معايير شُوركت في ١٠:٠٢، قرأها طالب بصوت عالٍ. لم تُذكر مجددًا. ينتهي الدرس في ١٠:٤٥ مع الجرس.') },
    { id: 'check', x: 50, y: 60, label: t('Checking for understanding', 'التحقق من الفهم'), clue: t('Whiteboards at 10:15 and 10:30. The teacher re-explains one point after the second check.', 'سبورات صغيرة في ١٠:١٥ و١٠:٣٠. تعيد المعلّمة شرح نقطة واحدة بعد الفحص الثاني.') },
    { id: 'books', x: 78, y: 42, label: t('The books', 'الدفاتر'), clue: t('Specific comments, dated, with a response line filled in by students the next day.', 'تعليقات محددة، مؤرّخة، مع سطر استجابة يملؤه الطلاب في اليوم التالي.') },
    { id: 'students', x: 62, y: 82, label: t('Two students at the door', 'طالبان عند الباب'), clue: t('"What were we meant to get better at today?" One says "the text". The other shrugs.', '«فيمَ كان يُفترض أن نتحسّن اليوم؟» يقول أحدهما «النص». ويهزّ الآخر كتفيه.') },
  ],
  diagnosis: {
    prompt: t('File your diagnosis. Tick every finding the evidence supports — and nothing it doesn’t.', 'سجّل تشخيصك. ضع علامة على كل نتيجة يدعمها الدليل — ولا شيء غير ذلك.'),
    findings: [
      { id: 'criteria', label: t('Success criteria are shared, then never revisited', 'تُشارَك معايير النجاح ثم لا يُعاد إليها أبدًا'), present: true, note: t('Shared at 10:02, gone by 10:03. Students worked hard and could not say at what.', 'شُوركت في ١٠:٠٢، وغابت بحلول ١٠:٠٣. عمل الطلاب بجد ولم يستطيعوا القول فيمَ.') },
      { id: 'checks', label: t('There is no checking for understanding', 'لا يوجد تحقق من الفهم'), present: false, note: t('Two whole-class checks and a re-teach. Checking is strong.', 'فحصان للصف كله وإعادة شرح. التحقق قوي.') },
      { id: 'feedback', label: t('Feedback is given but never acted on', 'تُقدَّم التغذية الراجعة لكن لا يُعمل بها أبدًا'), present: false, note: t('The response lines are filled in. Students act on it the next day.', 'سطور الاستجابة مملوءة. يعمل الطلاب بها في اليوم التالي.') },
      { id: 'pace', label: t('Pacing is rushed — the lesson runs out of time', 'الإيقاع متعجّل — ينفد وقت الدرس'), present: false, note: t('It ended on the bell with the work done. Nothing was cut.', 'انتهى مع الجرس والعمل مكتمل. لم يُقطع شيء.') },
      { id: 'talk', label: t('Teacher talk dominates the lesson', 'يهيمن حديث المعلّمة على الدرس'), present: false, note: t('No evidence either way, which means no finding. A diagnosis needs evidence, not a feeling.', 'لا دليل في أي اتجاه، أي لا نتيجة. التشخيص يحتاج دليلًا لا شعورًا.') },
    ],
    hintOver: t('For each extra tick, find the clue that proves it. Checking for understanding: how many checks and what followed? The books: what is in the margin? If no clue proves a finding, it is not a finding.', 'لكل علامة إضافية، ابحث عن الدليل الذي يثبتها. التحقق من الفهم: كم فحصًا وماذا تبعه؟ الدفاتر: ماذا في الهامش؟ إن لم يثبت أي دليل نتيجةً، فهي ليست نتيجة.'),
    hintUnder: t('Listen to the two students at the door again. Then find the clue with the time 10:02 in it. What happened to that thing after 10:02?', 'استمع إلى الطالبين عند الباب مرة أخرى. ثم ابحث عن الدليل الذي يحمل الوقت ١٠:٠٢. ماذا حدث لذلك الشيء بعد ١٠:٠٢؟'),
    hintSpotId: 'students',
  },
  assessRisk: {
    prompt: t('How serious is what Toki found?', 'ما مدى خطورة ما وجده توكي؟'),
    correctId: 'minor',
    hint: t('Three of the four clues describe something working. One describes something said once and forgotten. How much of the lesson does that one clue cover?', 'ثلاثة من الأدلة الأربعة تصف شيئًا يعمل. واحد يصف شيئًا قيل مرة ونُسي. كم من الدرس يغطّي ذلك الدليل الوحيد؟'),
    hintSpotId: 'criteria',
  },
  coaching: {
    prompt: t('What does a minor drift deserve?', 'ما الذي يستحقه انحراف طفيف؟'),
    options: [
      { id: 'light', label: t('A light touch: "Try ending with one question — which criterion did we meet?" — then leave the strong lesson alone', 'لمسة خفيفة: «جرّبي الإنهاء بسؤال واحد — أي معيار حققناه؟» — ثم اترك الدرس القوي وشأنه') },
      { id: 'cycle', label: t('Open a full coaching cycle: observation, goal-setting, three follow-up visits', 'افتح دورة تدريبية كاملة: ملاحظة، وضع أهداف، ثلاث زيارات متابعة') },
      { id: 'nothing', label: t('Say nothing — it is working well enough', 'لا تقل شيئًا — إنه يعمل بما يكفي') },
      { id: 'hod', label: t('Raise it with the Head of Department', 'ارفع الأمر إلى رئيس القسم') },
    ],
    correctId: 'light',
    hint: t('Look at the success-criteria clue: shared at 10:02, and the two students at the door at 10:45. How big is the gap between those two moments — and what does a strong teacher do with a finding that size?', 'انظر إلى دليل معايير النجاح: شُوركت في ١٠:٠٢، والطالبان عند الباب في ١٠:٤٥. ما حجم الفجوة بين هاتين اللحظتين — وماذا تفعل معلّمة قوية بنتيجة بهذا الحجم؟'),
    hintSpotId: 'criteria',
  },
  conversation: CONVO_74,
  reveal: {
    verdict: t('One small finding, one small move. Proportion is what separates a coach from an inspector.', 'نتيجة صغيرة واحدة، خطوة صغيرة واحدة. التناسب هو ما يفصل المدرّب عن المفتّش.'),
    whatDrifted: t('Success criteria became an opening ritual. Everything they were meant to anchor still happened — students just couldn’t name it.', 'أصبحت معايير النجاح طقسًا افتتاحيًا. كل ما كان يُفترض أن ترسّخه حدث — لكن الطلاب لم يستطيعوا تسميته.'),
    whyItHappened: t('Routines that live at the start of a lesson are the first thing the bell protects and the last thing it returns to.', 'الروتينات التي تعيش في بداية الدرس هي أول ما يحميه الجرس وآخر ما يعود إليه.'),
    howToRestore: t('One closing question. Thirty seconds. The teacher will do it tomorrow because Toki asked for one thing, not a programme.', 'سؤال ختامي واحد. ثلاثون ثانية. ستفعلها المعلّمة غدًا لأن توكي طلب شيئًا واحدًا، لا برنامجًا.'),
  },
  points: POINTS,
  badgeTriggers: ['mutation-hunter'],
};

export const WORLD_7_LEVELS: AcademyLevelDefinition[] = [LEVEL_71, LEVEL_72, LEVEL_73, LEVEL_74];
