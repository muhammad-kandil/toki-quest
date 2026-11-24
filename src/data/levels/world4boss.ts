import sceneImg from '../../assets/scenes/classroom-3-output.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/**
 * World 4 boss — The Feedback Loop.
 * "Feedback is visible, frequent, and detailed, but learning is not improving."
 */
export const WORLD_4_BOSS: WorldBossDefinition = {
  id: 45,
  worldId: 'feedback',
  title: t('The Feedback Loop', 'حلقة التغذية الراجعة'),
  theme: t('Given ≠ Used', 'مُعطى ≠ مُستخدَم'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'This school has a feedback policy, a feedback audit, and a feedback award. Books are marked within 48 hours, comments are everywhere, and the green-pen response is universal. The data team shows Toki a graph: feedback frequency, up and to the right. Beside it, another graph: attainment, flat for two years. Toki spends a day finding out where the loop breaks.',
    'لدى هذه المدرسة سياسة للتغذية الراجعة، وتدقيق للتغذية الراجعة، وجائزة للتغذية الراجعة. تُصحَّح الدفاتر خلال ٤٨ ساعة، والتعليقات في كل مكان، واستجابة القلم الأخضر شاملة. يُري فريق البيانات توكي رسمًا بيانيًا: تكرار التغذية الراجعة، صاعد إلى اليمين. وبجانبه رسم آخر: التحصيل، مستوٍ منذ سنتين. يقضي توكي يومًا ليكتشف أين تنكسر الحلقة.',
  ),
  scenes: [
    {
      id: 'audit',
      place: t('The book audit', 'تدقيق الدفاتر'),
      observation: t('A leader samples twelve books with a checklist: comment present? green pen present? dated? Every book passes. No box asks whether the next piece of work was better.', 'يأخذ قائد عيّنة من اثني عشر دفترًا مع قائمة تحقق: هل يوجد تعليق؟ هل يوجد قلم أخضر؟ مؤرّخ؟ كل الدفاتر تنجح. لا خانة تسأل هل كان العمل التالي أفضل.'),
      fitsPattern: true,
      finding: t('The audit measures the presence of feedback, not its effect. Whatever an audit measures, a school produces.', 'يقيس التدقيق وجود التغذية الراجعة لا أثرها. وما يقيسه التدقيق تنتجه المدرسة.'),
      hint: t('Read the checklist. What question is missing?', 'اقرأ قائمة التحقق. ما السؤال الغائب؟'),
    },
    {
      id: 'grade-3',
      place: t('Grade 3 Writing', 'الصف الثالث، كتابة'),
      observation: t('Marking is light — one highlighted sentence and a question in the margin. But the lesson opens with ten minutes of "answer your question in your book," and the teacher reads three answers aloud.', 'التصحيح خفيف — جملة واحدة مظلّلة وسؤال في الهامش. لكن الدرس يبدأ بعشر دقائق من «أجب عن سؤالك في دفترك»، وتقرأ المعلّمة ثلاث إجابات بصوت مرتفع.'),
      fitsPattern: false,
      finding: t('Light feedback, heavy use. This teacher would fail the audit’s "detail" standard and is the healthiest room in the school.', 'تغذية راجعة خفيفة، استخدام كثيف. سترسب هذه المعلّمة في معيار «التفصيل» بالتدقيق، وهي أسلم غرفة في المدرسة.'),
      hint: t('Ignore the amount of ink. What do students do with it?', 'تجاهل كمية الحبر. ماذا يفعل الطلاب بها؟'),
    },
    {
      id: 'award',
      place: t('The feedback award', 'جائزة التغذية الراجعة'),
      observation: t('Last term’s winner is congratulated at assembly for "the most thorough marking in the school." Her class’s results are below the year average. Nobody connects the two.', 'تُهنَّأ الفائزة بالفصل الماضي في الطابور على «أدقّ تصحيح في المدرسة». نتائج صفها أدنى من متوسط السنة. لا أحد يربط بين الأمرين.'),
      fitsPattern: true,
      finding: t('The school rewards the input it can see and never checks it against the outcome. The award teaches everyone what to optimise.', 'تكافئ المدرسة المُدخل الذي تراه ولا تفحصه أبدًا مقابل الناتج. تعلّم الجائزة الجميع ما يُحسّنونه.'),
      hint: t('What is being celebrated — and what would it cost to celebrate the other thing?', 'ما الذي يُحتفى به — وما ثمن الاحتفاء بالشيء الآخر؟'),
    },
    {
      id: 'grade-9',
      place: t('Grade 9 Math', 'الصف التاسع، رياضيات'),
      observation: t('Feedback on Monday’s test: a worked solution for every question, stapled to each paper. Tuesday’s lesson: a new topic. The stapled solutions are still stapled on Friday.', 'التغذية الراجعة على اختبار الاثنين: حل مفصّل لكل سؤال، مدبّس بكل ورقة. درس الثلاثاء: موضوع جديد. الحلول المدبّسة ما زالت مدبّسة يوم الجمعة.'),
      fitsPattern: true,
      finding: t('Complete, correct, and never opened. Feedback as a document rather than an event.', 'كاملة وصحيحة ولم تُفتح قط. تغذية راجعة بوصفها وثيقة لا حدثًا.'),
      hint: t('The staples are the evidence.', 'الدبابيس هي الدليل.'),
    },
    {
      id: 'peer',
      place: t('Grade 11 Science', 'الصف الحادي عشر، علوم'),
      observation: t('No teacher marking on the practical write-ups at all. Instead, pairs swap, mark against two criteria, and each student rewrites their conclusion before the teacher sees it. Books look thin; conclusions are the best in the year.', 'لا تصحيح من المعلّم على تقارير التجارب العملية على الإطلاق. بدل ذلك، يتبادل الثنائيات التقارير، ويقيّمون وفق معيارين، ويعيد كل طالب كتابة استنتاجه قبل أن يراه المعلّم. تبدو الدفاتر نحيلة؛ والاستنتاجات هي الأفضل في السنة.'),
      fitsPattern: false,
      finding: t('Not the pattern. The feedback is immediate, acted on, and owned by students. The thin books would worry the audit; the conclusions should reassure it.', 'ليس النمط. التغذية الراجعة فورية ومعمول بها ومملوكة للطلاب. قد تقلق الدفاتر النحيلة التدقيقَ؛ وينبغي أن تطمئنه الاستنتاجات.'),
      hint: t('Who gave the feedback matters less than what happened after it.', 'من قدّم التغذية الراجعة أقل أهمية مما حدث بعدها.'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit; two break the mould. Name the pattern.', 'ثلاثة مشاهد تطابق؛ واثنان يكسران القالب. سمِّ النمط.'),
    options: [
      { id: 'not-enough', label: t('Teachers don’t give enough feedback', 'لا يقدّم المعلّمون تغذية راجعة كافية') },
      { id: 'routine', label: t('Feedback has become a routine the school measures by its presence — not by whether students act on it', 'أصبحت التغذية الراجعة روتينًا تقيسه المدرسة بوجوده — لا بما إذا كان الطلاب يعملون به') },
      { id: 'quality', label: t('The feedback is low quality', 'التغذية الراجعة منخفضة الجودة') },
      { id: 'students', label: t('Students don’t care about feedback', 'لا يهتم الطلاب بالتغذية الراجعة') },
    ],
    correctId: 'routine',
    hint: t('The two healthy rooms gave less feedback than the others. What did they have more of?', 'قدّمت الغرفتان السليمتان تغذية راجعة أقل من غيرهما. ما الذي كان لديهما أكثر؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('Two years of rising feedback and flat attainment, with a policy, an audit, and an award all pointed at the wrong thing. The mutation has been institutionalised — and decorated.', 'سنتان من تغذية راجعة متصاعدة وتحصيل مستوٍ، مع سياسة وتدقيق وجائزة موجَّهة كلها إلى الشيء الخطأ. التحوّر صار مؤسسيًا — ومُكرَّمًا.'),
  },
  coaching: {
    prompt: t('The policy, the audit, and the award all exist. What is the one move with the greatest impact?', 'السياسة والتدقيق والجائزة موجودة كلها. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'more-training', label: t('Train staff to write better comments', 'درّب الهيئة على كتابة تعليقات أفضل') },
      { id: 'rewrite-audit', label: t('Rewrite the audit’s one question: not "is there feedback?" but "show me the next piece of work — is it better because of it?"', 'أعد كتابة سؤال التدقيق الوحيد: ليس «هل توجد تغذية راجعة؟» بل «أرني العمل التالي — هل هو أفضل بسببها؟»') },
      { id: 'cancel-award', label: t('Cancel the feedback award', 'ألغِ جائزة التغذية الراجعة') },
      { id: 'peer-everywhere', label: t('Mandate peer assessment in every subject', 'افرض التقييم بين الأقران في كل مادة') },
    ],
    correctId: 'rewrite-audit',
    hint: t('What the audit asks, the school becomes. Change the question.', 'ما يسأله التدقيق تصبحه المدرسة. غيّر السؤال.'),
  },
  reveal: {
    whatDrifted: t(
      'Feedback became something the school proves it gives rather than something students use. Frequency rose, attainment stayed flat, and the policy declared success all the way.',
      'أصبحت التغذية الراجعة شيئًا تثبت المدرسة أنها تقدّمه لا شيئًا يستخدمه الطلاب. ارتفع التكرار وبقي التحصيل مستويًا، وأعلنت السياسة النجاح طوال الطريق.',
    ),
    whyItHappened: t(
      'Presence is auditable; impact takes longer to see. A policy, an audit, and an award built around presence made every teacher better at producing it — and quietly made use optional.',
      'الوجود قابل للتدقيق؛ أما الأثر فيحتاج إلى وقت أطول ليُرى. سياسة وتدقيق وجائزة بُنيت حول الوجود جعلت كل معلّم أفضل في إنتاجه — وجعلت الاستخدام اختياريًا بهدوء.',
    ),
    howToRestore: t(
      'Change the one question the system asks. When the audit opens the next piece of work instead of the comment, the Grade 3 and Grade 11 rooms stop being outliers and become the standard — with less marking, not more.',
      'غيّر السؤال الوحيد الذي يطرحه النظام. حين يفتح التدقيق العمل التالي بدل التعليق، يتوقف صفا الثالث والحادي عشر عن كونهما استثناءين ويصبحان المعيار — بتصحيح أقل لا أكثر.',
    ),
    finalWord: t(
      'The best two rooms in this school would both have failed its audit. When your measure punishes your best practice, the measure is the mutation.',
      'كانت أفضل غرفتين في هذه المدرسة سترسبان في تدقيقها. حين يعاقب مقياسك أفضل ممارساتك، فالمقياس هو التحوّر.',
    ),
  },
  points: { scenes: 40, pattern: 30, risk: 20, coaching: 40 },
  badgeTriggers: ['coaching-specialist', 'mutation-hunter'],
};
