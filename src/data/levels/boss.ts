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
      observation: t('Toki reads the objectives posted on the board and checks them against the lesson.', 'يقرأ توكي الأهداف المكتوبة على السبورة ويقارنها بالدرس.'),
      verdict: 'clean',
      finding: t('Clear, specific, and genuinely aligned to the activities. The objectives are sound — this teacher knows exactly what students should learn.', 'واضحة ومحددة ومتّسقة فعلًا مع الأنشطة. الأهداف سليمة — هذا المعلّم يعرف تمامًا ما ينبغي أن يتعلّمه الطلاب.'),
      hint: t('Resist the instinct to find something wrong just because you’re looking for a drift. Judge only what’s actually in front of you here.', 'قاوم غريزة البحث عن خطأ لمجرد أنك تبحث عن انحراف. احكم فقط على ما أمامك هنا.'),
    },
    {
      id: 'tasks',
      label: t('The Tasks', 'المهام'),
      observation: t('Toki examines what students are actually being asked to do.', 'يفحص توكي ما يُطلب من الطلاب فعله فعلًا.'),
      verdict: 'clean',
      finding: t('Every task maps to an objective. Nothing is busywork; each activity has a clear purpose. The tasks are well-designed.', 'كل مهمة مرتبطة بهدف. لا شيء منها عمل بلا طائل؛ لكل نشاط غاية واضحة. المهام مصمّمة بإتقان.'),
      hint: t('Check the tasks against the objectives you just confirmed — do they actually connect?', 'قارن المهام بالأهداف التي أكّدتها للتو — هل ترتبط بها فعلًا؟'),
    },
    {
      id: 'questions',
      label: t("The Teacher's Questions", 'أسئلة المعلّم'),
      observation: t('Toki listens to how the teacher questions students.', 'يُنصت توكي إلى طريقة المعلّم في طرح الأسئلة.'),
      verdict: 'clean',
      finding: t('Open-ended, probing, well-timed. The teacher pushes for reasoning and evidence, exactly as a skilled questioner should. Nothing to fix here.', 'مفتوحة وسابرة وحسنة التوقيت. يدفع المعلّم نحو التعليل والأدلة، تمامًا كما ينبغي لسائلٍ ماهر. لا شيء يحتاج إلى إصلاح هنا.'),
      hint: t('Listen for whether the questions ask students to reason, or just to recall.', 'أنصت: هل تطلب الأسئلة من الطلاب أن يعلّلوا، أم أن يتذكّروا فقط؟'),
    },
    {
      id: 'assessment',
      label: t('The Assessment', 'التقييم'),
      observation: t('Toki reviews how learning is being checked.', 'يراجع توكي كيف يُتحقَّق من التعلّم.'),
      verdict: 'clean',
      finding: t('Frequent, varied, and actually used to adjust instruction. The teacher responds to the evidence in real time. This is assessment done right.', 'متكرر ومتنوع ومُستخدَم فعلًا لتعديل التدريس. يستجيب المعلّم للأدلة لحظيًا. هذا هو التقييم على وجهه الصحيح.'),
      hint: t('The question isn’t whether assessment happens — it’s whether it changes what happens next.', 'السؤال ليس هل يحدث التقييم، بل هل يغيّر ما يحدث بعده.'),
    },
    {
      id: 'technology',
      label: t('The Technology Use', 'استخدام التقنية'),
      observation: t('Toki watches how the Alef platform and tools are being used.', 'يراقب توكي كيف تُستخدم منصة «ألف» وأدواتها.'),
      verdict: 'clean',
      finding: t('Purposeful and integrated — tech serves the learning, never replaces it. The platform is used to deepen understanding, not to look modern. Well done.', 'هادف ومتكامل — التقنية تخدم التعلّم ولا تحلّ محله. تُستخدم المنصة لتعميق الفهم لا للظهور بمظهر عصري. أحسنت.'),
      hint: t('Ask whether the technology is serving the learning goal, or just present because it’s expected.', 'اسأل: هل تخدم التقنية هدف التعلّم، أم أنها حاضرة فقط لأنها متوقَّعة؟'),
    },
    {
      id: 'student-thinking',
      label: t('The Students’ Thinking', 'تفكير الطلاب'),
      observation: t('Toki does something different now — instead of watching the teacher, Toki sits beside the students and listens to how they think as they work.', 'يفعل توكي الآن شيئًا مختلفًا — بدل مراقبة المعلّم، يجلس بجانب الطلاب ويُنصت إلى كيف يفكّرون أثناء العمل.'),
      verdict: 'mutation',
      finding: t('Here it is. The students have learned to produce every signal of learning — the right answers, the confident explanations, the polished work — without the understanding underneath. They’ve become expert at performing learning. The mutation was never in what the teacher does. It’s in what the students have quietly learned to do.', 'ها هو. تعلّم الطلاب إنتاج كل إشارات التعلّم — الإجابات الصحيحة، والشروح الواثقة، والأعمال المتقنة — دون الفهم الكامن تحتها. أصبحوا خبراء في تمثيل التعلّم. لم يكن التحوّر قط فيما يفعله المعلّم. بل فيما تعلّم الطلاب فعله بهدوء.'),
      hint: t('Everything you’ve checked so far is something the TEACHER controls. This dimension is different — look at what the students themselves are doing with their thinking.', 'كل ما فحصته حتى الآن شيء يتحكّم فيه المعلّم. هذا البُعد مختلف — انظر إلى ما يفعله الطلاب أنفسهم بتفكيرهم.'),
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
      { id: 'nothing', label: t('Nothing — the room is excellent, leave it alone', 'لا شيء — الصف ممتاز، اتركه كما هو') },
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
  badgeTriggers: ['master-dlis'],
};
