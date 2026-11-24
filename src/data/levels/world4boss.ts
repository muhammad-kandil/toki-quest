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
      observation: t('The books have not been marked in eight days and the audit has flagged the class. When they come back there is one highlighted sentence and a question in the margin — no grade, no comment bank code. The lesson opens with "answer your question in your book"; three children read their answers aloud and the class argues about one of them.', 'لم تُصحَّح الدفاتر منذ ثمانية أيام وقد أشّر التدقيق على الصف. حين تعود يوجد جملة واحدة مظلّلة وسؤال في الهامش — لا درجة ولا رمز من بنك التعليقات. يبدأ الدرس بـ«أجب عن سؤالك في دفترك»؛ يقرأ ثلاثة أطفال إجاباتهم بصوت مرتفع ويتجادل الصف حول إحداها.'),
      fitsPattern: false,
      finding: t('Late, light, and flagged — and the healthiest room in the school. One question per child, ten minutes to answer it, and an argument about writing. The audit will mark her down; the next piece of work will be better.', 'متأخرة وخفيفة ومؤشَّر عليها — وأسلم غرفة في المدرسة. سؤال واحد لكل طفل، وعشر دقائق للإجابة عنه، وجدال حول الكتابة. سيخفّض التدقيق درجتها؛ وسيكون العمل التالي أفضل.'),
      hint: t('Eight days and no grade is what the audit sees. What do the children do in the first ten minutes?', 'ثمانية أيام وبلا درجة هو ما يراه التدقيق. ماذا يفعل الأطفال في الدقائق العشر الأولى؟'),
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
      observation: t('The department’s model for feedback: Monday’s test returned Tuesday with a personalised cover sheet — score, three targets, a worked solution for every question the student got wrong, and a QR code to a video. Students file it in their folders. Tuesday’s lesson is a new topic; on Friday the cover sheets are still folded along the same crease.', 'نموذج القسم للتغذية الراجعة: اختبار الاثنين يُعاد الثلاثاء مع ورقة غلاف شخصية — الدرجة، ثلاثة أهداف، حل مفصّل لكل سؤال أخطأ فيه الطالب، ورمز QR لفيديو. يحفظها الطلاب في ملفاتهم. درس الثلاثاء موضوع جديد؛ ويوم الجمعة ما زالت أوراق الغلاف مطوية على الثنية نفسها.'),
      fitsPattern: true,
      finding: t('The best feedback document in the school, and nobody has unfolded it. Three targets with no lesson to pursue them in; a worked solution with no question to re-attempt. Feedback as a document rather than an event.', 'أفضل وثيقة تغذية راجعة في المدرسة، ولم يفتحها أحد. ثلاثة أهداف بلا درس لمتابعتها؛ وحل مفصّل بلا سؤال يُعاد. تغذية راجعة بوصفها وثيقة لا حدثًا.'),
      hint: t('Everything about the cover sheet is good. Ask what Tuesday’s lesson asked students to do with it.', 'كل شيء في ورقة الغلاف جيد. اسأل ماذا طلب درس الثلاثاء من الطلاب أن يفعلوا بها.'),
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
      { id: 'timing', label: t('Feedback arrives too late — by the time it is read the class has moved on', 'تصل التغذية الراجعة متأخرة — وحين تُقرأ يكون الصف قد انتقل') },
      { id: 'volume', label: t('Teachers give more feedback than students can process, so most of it is ignored', 'يقدّم المعلّمون تغذية راجعة أكثر مما يستوعبه الطلاب، فيُهمل معظمها') },
      { id: 'ownership', label: t('Feedback is done to students rather than by them — the healthy rooms used peers', 'تُفعَل التغذية الراجعة للطلاب لا بأيديهم — استخدمت الغرف السليمة الأقران') },
      { id: 'routine', label: t('The school measures feedback by its presence, not by whether students act on it', 'تقيس المدرسة التغذية الراجعة بوجودها، لا بما إذا كان الطلاب يعملون بها') },
    ],
    correctId: 'routine',
    hint: t('Grade 9’s feedback was on time and the Grade 3 teacher’s was eight days late. Grade 11 used peers; Grade 3 used the teacher. So neither timing, volume nor who gives it is the pattern. What do the audit, the award and the folded cover sheets have in common?', 'كانت تغذية الصف التاسع الراجعة في موعدها وتغذية معلّمة الصف الثالث متأخرة ثمانية أيام. استخدم الصف الحادي عشر الأقران؛ واستخدم الصف الثالث المعلّمة. إذًا ليس التوقيت ولا الحجم ولا مَن يقدّمها هو النمط. ما المشترك بين التدقيق والجائزة وأوراق الغلاف المطوية؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('Two years of rising feedback and flat attainment, with a policy, an audit, and an award all pointed at the wrong thing. The mutation has been institutionalised — and decorated.', 'سنتان من تغذية راجعة متصاعدة وتحصيل مستوٍ، مع سياسة وتدقيق وجائزة موجَّهة كلها إلى الشيء الخطأ. التحوّر صار مؤسسيًا — ومُكرَّمًا.'),
  },
  coaching: {
    prompt: t('The policy, the audit, and the award all exist. What is the one move with the greatest impact?', 'السياسة والتدقيق والجائزة موجودة كلها. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'rewrite-audit', label: t('Rewrite the audit’s question: "show me the next piece of work — is it better because of the feedback?"', 'أعد كتابة سؤال التدقيق: «أرني العمل التالي — هل هو أفضل بسبب التغذية الراجعة؟»') },
      { id: 'dirt-time', label: t('Add a policy line: every piece of written feedback is followed by ten minutes of class time to act on it', 'أضف سطرًا للسياسة: كل تغذية راجعة مكتوبة يتبعها عشر دقائق من وقت الصف للعمل بها') },
      { id: 'award', label: t('Re-point the award: give it to the class whose work improved most, not the most thorough marking', 'أعد توجيه الجائزة: امنحها للصف الذي تحسّن عمله أكثر، لا لأدقّ تصحيح') },
      { id: 'model', label: t('Make Grade 3 and Grade 11 the model and have every department observe them this term', 'اجعل الصفين الثالث والحادي عشر النموذج ودع كل قسم يراقبهما هذا الفصل') },
    ],
    correctId: 'rewrite-audit',
    hint: t('The ten-minute rule is good and the audit would still only check that it exists. The award reaches one class a term. Observations change the willing. Which move changes what every teacher is checked against, twelve books at a time?', 'قاعدة الدقائق العشر جيدة وسيكتفي التدقيق بالتحقق من وجودها. الجائزة تصل إلى صف واحد كل فصل. والملاحظات تغيّر الراغبين. أي خطوة تغيّر ما يُحاسَب عليه كل معلّم، اثني عشر دفترًا في كل مرة؟'),
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
