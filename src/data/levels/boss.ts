import sceneImg from '../../assets/scenes/classroom-6-perfect.jpg';
import type { BossDefinition } from '../bossTypes';
import { t } from '../../i18n/types';

export const BOSS: BossDefinition = {
  id: 6,
  title: t('The Perfect Classroom', 'الصف المثالي'),
  theme: t('Looks ≠ Learning', 'المظهر ≠ التعلّم'),
  subject: t('The Final Visit', 'الزيارة الأخيرة'),
  sceneImage: sceneImg,

  scenario: t(
    'Toki steps into the most impressive classroom yet. The objectives are crystal clear on the board. Students are engaged, on-task, and producing beautiful work. The teacher circulates expertly, questioning, checking, adjusting. By every measure Toki has learned to use, this room is flawless. So Toki does what a good coach does — and looks closer, dimension by dimension.',
    'يدخل توكي أكثر الصفوف إبهارًا حتى الآن. الأهداف واضحة تمامًا على السبورة. الطلاب متفاعلون ومنهمكون في المهام وينتجون أعمالًا جميلة. المعلّم يتجوّل باحتراف، يسأل ويتحقق ويعدّل. بكل المقاييس التي تعلّم توكي استخدامها، هذا الصف لا عيب فيه. لذا يفعل توكي ما يفعله المدرّب الجيد — ينظر عن قرب، بُعدًا بُعدًا.',
  ),

  dimensions: [
    {
      id: 'objectives',
      label: t('Learning Objectives', 'أهداف التعلّم'),
      observation: t('Board: "Explain how a change in one variable affects another, using evidence from your data." The starter asks students to predict a change; the main task has them test it; the exit question is "what would happen if…". Toki asks a student what she is trying to get better at today. She points at the board and says it in her own words.', 'على السبورة: «اشرح كيف يؤثّر تغيّر متغيّر في متغيّر آخر، مستندًا إلى أدلة من بياناتك.» يطلب النشاط الافتتاحي توقّع تغيّر؛ والمهمة الرئيسية اختباره؛ وسؤال الخروج «ماذا سيحدث لو…». يسأل توكي طالبةً عمّا تحاول أن تتحسّن فيه اليوم. تشير إلى السبورة وتقولها بكلماتها.'),
      verdict: 'clean',
      finding: t('Clear, specific, and genuinely aligned to the activities. The objectives are sound — this teacher knows exactly what students should learn.', 'واضحة ومحددة ومتّسقة فعلًا مع الأنشطة. الأهداف سليمة — هذا المعلّم يعرف تمامًا ما ينبغي أن يتعلّمه الطلاب.'),
      hint: t('Resist the instinct to find something wrong just because you’re looking for a drift. Judge only what’s actually in front of you here.', 'قاوم غريزة البحث عن خطأ لمجرد أنك تبحث عن انحراف. احكم فقط على ما أمامك هنا.'),
    },
    {
      id: 'tasks',
      label: t('The Tasks', 'المهام'),
      observation: t('Groups have a data table and three questions. Q1 asks for a pattern, Q2 asks why, Q3 asks them to predict a row that is not in the table. No colouring, no copying, no worksheet-filler. Every group Toki passes is on Q2 or Q3.', 'لدى المجموعات جدول بيانات وثلاثة أسئلة. س١ يطلب نمطًا، س٢ يسأل لماذا، س٣ يطلب توقّع صف غير موجود في الجدول. لا تلوين، لا نسخ، لا أوراق عمل للحشو. كل مجموعة يمرّ بها توكي عند س٢ أو س٣.'),
      verdict: 'clean',
      finding: t('Every task maps to an objective. Nothing is busywork; each activity has a clear purpose. The tasks are well-designed.', 'كل مهمة مرتبطة بهدف. لا شيء منها عمل بلا طائل؛ لكل نشاط غاية واضحة. المهام مصمّمة بإتقان.'),
      hint: t('Put Q3 next to the objective on the board. Does predicting a row that is not in the table need the thing the objective names?', 'ضع س٣ بجانب الهدف على السبورة. هل يحتاج توقّع صف غير موجود في الجدول إلى الشيء الذي يسمّيه الهدف؟'),
    },
    {
      id: 'questions',
      label: t("The Teacher's Questions", 'أسئلة المعلّم'),
      observation: t('Toki counts. In ten minutes: fourteen questions, eleven of them "why" or "how do you know". Wait time is three to four seconds. Twice the teacher takes a wrong answer, thanks the student, and asks the class to find the flaw in it. Names are drawn from a cup.', 'يعدّ توكي. في عشر دقائق: أربعة عشر سؤالًا، أحد عشر منها «لماذا» أو «كيف عرفت». زمن الانتظار ثلاث إلى أربع ثوانٍ. مرتين يأخذ المعلّم إجابة خاطئة، يشكر الطالب، ويطلب من الصف إيجاد الخلل فيها. الأسماء تُسحب من كوب.'),
      verdict: 'clean',
      finding: t('Open-ended, probing, well-timed. The teacher pushes for reasoning and evidence, exactly as a skilled questioner should. Nothing to fix here.', 'مفتوحة وسابرة وحسنة التوقيت. يدفع المعلّم نحو التعليل والأدلة، تمامًا كما ينبغي لسائلٍ ماهر. لا شيء يحتاج إلى إصلاح هنا.'),
      hint: t('Listen for whether the questions ask students to reason, or just to recall.', 'أنصت: هل تطلب الأسئلة من الطلاب أن يعلّلوا، أم أن يتذكّروا فقط؟'),
    },
    {
      id: 'assessment',
      label: t('The Assessment', 'التقييم'),
      observation: t('Mini whiteboards at minute twelve: twenty-four answers up. Six are wrong in the same way. The teacher stops, reteaches that one idea for four minutes, and checks again — two wrong now. The exit ticket is a new question, not the one from the lesson.', 'سبورات صغيرة في الدقيقة الثانية عشرة: أربع وعشرون إجابة مرفوعة. ست منها خاطئة بالطريقة نفسها. يتوقّف المعلّم، يعيد شرح تلك الفكرة الواحدة أربع دقائق، ويتحقّق مجددًا — اثنتان خاطئتان الآن. بطاقة الخروج سؤال جديد، لا سؤال الدرس نفسه.'),
      verdict: 'clean',
      finding: t('Frequent, varied, and actually used to adjust instruction. The teacher responds to the evidence in real time. This is assessment done right.', 'متكرر ومتنوع ومُستخدَم فعلًا لتعديل التدريس. يستجيب المعلّم للأدلة لحظيًا. هذا هو التقييم على وجهه الصحيح.'),
      hint: t('The question isn’t whether assessment happens — it’s whether it changes what happens next.', 'السؤال ليس هل يحدث التقييم، بل هل يغيّر ما يحدث بعده.'),
    },
    {
      id: 'technology',
      label: t('The Technology Use', 'استخدام التقنية'),
      observation: t('Tablets come out once, for eight minutes: the Alef simulation lets groups change the variable and watch the graph move. Then the tablets go away and the groups argue on paper about what they saw. Nobody is on a device while the teacher is talking.', 'تخرج الأجهزة اللوحية مرة واحدة، لثماني دقائق: تتيح محاكاة «ألف» للمجموعات تغيير المتغيّر ومشاهدة الرسم البياني يتحرّك. ثم تُعاد الأجهزة وتتجادل المجموعات على الورق حول ما رأته. لا أحد على جهاز بينما يتكلّم المعلّم.'),
      verdict: 'clean',
      finding: t('Purposeful and integrated — tech serves the learning, never replaces it. The platform is used to deepen understanding, not to look modern. Well done.', 'هادف ومتكامل — التقنية تخدم التعلّم ولا تحلّ محله. تُستخدم المنصة لتعميق الفهم لا للظهور بمظهر عصري. أحسنت.'),
      hint: t('Ask whether the technology is serving the learning goal, or just present because it’s expected.', 'اسأل: هل تخدم التقنية هدف التعلّم، أم أنها حاضرة فقط لأنها متوقَّعة؟'),
    },
    {
      id: 'student-thinking',
      label: t('The Students’ Thinking', 'تفكير الطلاب'),
      observation: t('Toki sits with a group on Q3 and asks them to predict a row for a variable they have not seen. The answer comes fast and confident, with the right vocabulary. He asks why. The student restarts her explanation, word for word, from the board. He asks what would make it wrong. Silence; then the other three look at the teacher.', 'يجلس توكي مع مجموعة عند س٣ ويطلب منهم توقّع صف لمتغيّر لم يروه. تأتي الإجابة سريعة وواثقة وبالمصطلحات الصحيحة. يسأل: لماذا؟ تعيد الطالبة شرحها، كلمة كلمة، من السبورة. يسأل: ما الذي قد يجعله خاطئًا؟ صمت؛ ثم ينظر الثلاثة الآخرون إلى المعلّم.'),
      verdict: 'mutation',
      finding: t('Here it is. The students have learned to produce every signal of learning — the right answers, the confident explanations, the polished work — without the understanding underneath. They’ve become expert at performing learning. The mutation was never in what the teacher does. It’s in what the students have quietly learned to do.', 'ها هو. تعلّم الطلاب إنتاج كل إشارات التعلّم — الإجابات الصحيحة، والشروح الواثقة، والأعمال المتقنة — دون الفهم الكامن تحتها. أصبحوا خبراء في تمثيل التعلّم. لم يكن التحوّر قط فيما يفعله المعلّم. بل فيما تعلّم الطلاب فعله بهدوء.'),
      hint: t('Fast, confident, correct vocabulary — then "why" produces the board, and "what would make it wrong" produces silence. Which of those is understanding, and which is a performance of it?', 'سريع، واثق، بالمصطلحات الصحيحة — ثم «لماذا» تُنتج السبورة، و«ما الذي قد يجعله خاطئًا» تُنتج صمتًا. أيّهما فهم، وأيّهما تمثيل له؟'),
    },
  ],

  locate: {
    prompt: t('Toki has audited everything. Five dimensions are genuinely excellent. So where does the real problem actually live?', 'دقّق توكي في كل شيء. خمسة أبعاد ممتازة فعلًا. فأين تكمن المشكلة الحقيقية إذن؟'),
    options: [
      { id: 'teacher', label: t("The teacher's methods", 'أساليب المعلّم') },
      { id: 'objectives', label: t('The learning objectives', 'أهداف التعلّم') },
      { id: 'student-thinking', label: t('What the students have learned to do', 'ما تعلّم الطلاب فعله') },
      { id: 'tech', label: t('The technology', 'التقنية') },
    ],
    correctId: 'student-thinking',
    hint: t('You checked everything the teacher controls, and it was all excellent. If the visible, teacher-controlled things are all fine… look at what’s harder to see.', 'فحصت كل ما يتحكّم فيه المعلّم، وكان كله ممتازًا. إذا كانت الأمور الظاهرة التي يتحكّم فيها المعلّم كلها سليمة… فانظر إلى ما يصعب رؤيته.'),
  },

  coaching: {
    prompt: t('This is the subtlest coaching challenge in the game. The teacher is doing everything right. How do you coach a mutation that lives in student thinking?', 'هذا أدقّ تحدٍّ تدريبي في اللعبة. المعلّم يفعل كل شيء بشكل صحيح. كيف تعالج تحوّرًا يسكن في تفكير الطلاب؟'),
    options: [
      { id: 'more-rigor', label: t('Tell the teacher to add more rigorous tasks', 'اطلب من المعلّم إضافة مهام أكثر صرامة') },
      { id: 'surface-thinking', label: t('Help the teacher surface and probe how students actually think — not just what they produce', 'ساعد المعلّم على إظهار طريقة تفكير الطلاب فعلًا وسبرها — لا ما ينتجونه فقط') },
      { id: 'harder-tests', label: t('Recommend harder assessments to catch the gap', 'أوصِ بتقييمات أصعب لكشف الفجوة') },
      { id: 'nothing', label: t('Ask the teacher to display the learning objective more prominently', 'اطلب من المعلّم عرض هدف التعلّم بشكل أوضح على السبورة') },
    ],
    correctId: 'surface-thinking',
    hint: t('You can’t fix student thinking by changing teacher behavior that’s already excellent. You have to make the thinking itself visible — so the performance of learning and real learning stop looking the same.', 'لا يمكنك إصلاح تفكير الطلاب بتغيير سلوك معلّم ممتاز أصلًا. عليك أن تجعل التفكير نفسه مرئيًا — حتى لا يعود تمثيل التعلّم والتعلّم الحقيقي يبدوان متطابقين.'),
  },

  reveal: {
    whatDrifted: t(
      'Nothing the teacher did. The classroom was flawless in every visible, controllable way — objectives, tasks, questions, assessment, technology. The drift was in the students: they had learned to perform the appearance of learning so well that it was indistinguishable from the real thing.',
      'لا شيء فعله المعلّم. كان الصف بلا عيب في كل جانب ظاهر يمكن التحكّم فيه — الأهداف والمهام والأسئلة والتقييم والتقنية. كان الانحراف في الطلاب: تعلّموا تمثيل مظهر التعلّم ببراعة حتى صار لا يُميَّز عن التعلّم الحقيقي.',
    ),
    whyItHappened: t(
      'When a system rewards the signals of learning — right answers, polished work, confident explanations — students optimize for the signals. Over time, performing learning and actually learning look identical from the outside. The better everything else gets, the more invisible this becomes.',
      'عندما يكافئ النظام إشارات التعلّم — الإجابات الصحيحة والأعمال المتقنة والشروح الواثقة — يُحسّن الطلاب الإشارات. ومع الوقت يبدو تمثيل التعلّم والتعلّم الفعلي متطابقين من الخارج. وكلما تحسّن كل شيء آخر، صار هذا أكثر خفاءً.',
    ),
    howToRestore: t(
      'Make thinking visible. Ask students to reason aloud, to explain their uncertainty, to apply ideas in genuinely new situations where performance can’t be rehearsed. The goal isn’t to fix the teacher — it’s to make real understanding and its imitation stop looking the same.',
      'اجعل التفكير مرئيًا. اطلب من الطلاب أن يعلّلوا بصوت مسموع، وأن يشرحوا ما يتردّدون فيه، وأن يطبّقوا الأفكار في مواقف جديدة فعلًا لا يمكن التدرّب على أدائها. الهدف ليس إصلاح المعلّم، بل أن يتوقف الفهم الحقيقي وتقليده عن التشابه.',
    ),
    finalWord: t(
      'You may have noticed — this game never rewarded you for being fast, and its hardest level had no villain to catch. That was the point. The most dangerous drift isn’t the obvious mistake. It’s the one hiding inside something that looks perfect.',
      'ربما لاحظت — هذه اللعبة لم تكافئك قط على السرعة، وأصعب مستوياتها لم يكن فيه خصم تطارده. كان هذا هو المقصود. أخطر الانحرافات ليس الخطأ الواضح، بل ذاك الذي يختبئ داخل شيء يبدو مثاليًا.',
    ),
  },

  points: { audit: 40, locate: 40, coaching: 40, reasoningBonus: 30 },
  badgeTriggers: ['clear-eyes'],
};
