/**
 * WORLD 4 — Feedback That Moves Learning
 * Theme: When Feedback Becomes Routine
 * Core idea: feedback changes learning only when students act on it.
 */
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import type { LevelDefinition } from '../levelTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_41: LevelDefinition = {
  id: 41,
  title: t('Well Done!', 'أحسنت!'),
  theme: t('Praise ≠ Feedback', 'المدح ≠ التغذية الراجعة'),
  subject: t('Kindergarten', 'رياض الأطفال'),
  sceneImage: sceneTalk,
  scenario: t(
    'The teacher is generous and warm. "Excellent!" "Well done!" "Great work!" land on every answer, every drawing, every attempt. The children glow. The room is one of the happiest Toki has visited, and the teacher is loved. Toki listens for what comes after the praise.',
    'المعلّمة سخيّة ودافئة. «ممتاز!» «أحسنت!» «عمل رائع!» تهبط على كل إجابة وكل رسمة وكل محاولة. الأطفال يتألقون. الغرفة من أسعد ما زاره توكي، والمعلّمة محبوبة. يُنصت توكي لما يأتي بعد المدح.',
  ),
  evidence: [
    { id: 'drawing', x: 24, y: 62, label: t('A drawing', 'رسمة'), clue: t('"Beautiful!" The child beams. He doesn’t know which part was beautiful, or what to try next.', '«جميلة!» يبتسم الطفل. لا يعرف أي جزء كان جميلًا، ولا ما يجرّبه بعد ذلك.') },
    { id: 'answer', x: 55, y: 70, label: t('A wrong answer', 'إجابة خاطئة'), clue: t('"Good try, well done!" The wrong answer stays on the board. The next child copies it.', '«محاولة جيدة، أحسنت!» تبقى الإجابة الخاطئة على السبورة. يقلّدها الطفل التالي.') },
    { id: 'tally', x: 80, y: 32, label: t('Toki’s tally', 'إحصاء توكي'), clue: t('In ten minutes: 23 pieces of praise. 0 pieces of information about how to improve.', 'في عشر دقائق: ٢٣ عبارة مدح. ٠ معلومة عن كيفية التحسّن.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The children are happy and encouraged. What should Toki consider next?', 'الأطفال سعداء ومشجَّعون. ما الذي ينبغي أن يفكّر فيه توكي بعد ذلك؟'),
      options: [
        { id: 'sincerity', label: t('Whether the praise is sincere or has become automatic', 'هل المدح صادق أم صار آليًا') },
        { id: 'fairness', label: t('Whether every child receives a fair share of the praise', 'هل ينال كل طفل نصيبًا عادلًا من المدح') },
        { id: 'errors', label: t('Whether wrong answers are being corrected at all', 'هل تُصحَّح الإجابات الخاطئة أصلًا') },
        { id: 'guides', label: t('Whether any child could say what to do differently next', 'هل يستطيع أي طفل أن يقول ما سيفعله بشكل مختلف بعد ذلك') },
      ],
      correctId: 'guides',
      hint: t('The wrong answer on the board is one clue, but the drawing was praised and it was good. Twenty-three pieces of praise, zero of information — which option counts the zero?', 'الإجابة الخاطئة على السبورة دليل واحد، لكن الرسمة مُدحت وكانت جيدة. ثلاث وعشرون عبارة مدح، صفر معلومة — أي خيار يعدّ الصفر؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'minor',
      hint: t('The warmth is real and valuable — it just needs information added to it. This is the gentlest drift in the world: easy to fix, costly to ignore.', 'الدفء حقيقي وقيّم — يحتاج فقط إلى إضافة معلومة. هذا ألطف انحراف في هذا العالم: سهل الإصلاح، مكلف التجاهل.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'praise-plus', label: t('Keep the warmth and add one detail each time: what was good, and one thing to try next', 'احتفظ بالدفء وأضف تفصيلًا واحدًا كل مرة: ما كان جيدًا، وشيئًا واحدًا يُجرَّب بعد ذلك') },
        { id: 'effort', label: t('Shift the praise from the product to the effort: "you kept trying", "you checked your work"', 'حوّل المدح من المنتج إلى الجهد: «واصلتِ المحاولة»، «راجعتِ عملك»') },
        { id: 'errors', label: t('Agree that wrong answers get corrected on the board before the next child answers', 'اتفق على أن تُصحَّح الإجابات الخاطئة على السبورة قبل أن يجيب الطفل التالي') },
        { id: 'peer', label: t('Have children say one specific thing they liked about each other’s work', 'دع الأطفال يقولون شيئًا محددًا واحدًا أعجبهم في عمل بعضهم') },
      ],
      correctId: 'praise-plus',
      hint: t('Correcting the board fixes one of the three clues. Effort praise is still praise. Peer comments move the job to the children. Which move changes the 23 sentences the teacher already says?', 'تصحيح السبورة يعالج دليلًا واحدًا من ثلاثة. مدح الجهد ما زال مدحًا. تعليقات الأقران تنقل المهمة إلى الأطفال. أي خطوة تغيّر الجمل الثلاث والعشرين التي تقولها المعلّمة أصلًا؟'),
    },
    reasoning: {
      prompt: t('Why add to the praise rather than reduce it?', 'لماذا نضيف إلى المدح بدل تقليله؟'),
      options: [
        { id: 'r1', label: t('A teacher told to praise less will praise less and add nothing', 'المعلّمة التي يُقال لها امدحي أقل ستمدح أقل ولن تضيف شيئًا') },
        { id: 'r3', label: t('Young children stop trying when the praise stops', 'يتوقف الأطفال الصغار عن المحاولة حين يتوقف المدح') },
        { id: 'r4', label: t('The warmth is the reason the children listen at all', 'الدفء هو سبب إنصات الأطفال أصلًا') },
        { id: 'r2', label: t('One specific detail turns a warm moment into a learning moment', 'تفصيل محدد واحد يحوّل اللحظة الدافئة إلى لحظة تعلّم') },
      ],
      correctId: 'r2',
      hint: t('What did the boy with the drawing walk away knowing?', 'بماذا عرف الطفل صاحب الرسمة حين غادر؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Encouragement has replaced feedback. The children feel good and learn nothing from the comment itself about what to keep or change.',
      'حلّ التشجيع محلّ التغذية الراجعة. يشعر الأطفال بالرضا ولا يتعلّمون من التعليق نفسه شيئًا عمّا يحتفظون به أو يغيّرونه.',
    ),
    whyItHappened: t(
      'Praise is fast, kind, and always welcome. Specific feedback takes a second of noticing. Under the pace of a young class, the noticing drops and the kindness stays.',
      'المدح سريع ولطيف ومرحَّب به دائمًا. أما التغذية الراجعة المحددة فتحتاج إلى ثانية من الملاحظة. تحت إيقاع صف صغير تسقط الملاحظة ويبقى اللطف.',
    ),
    howToRestore: t(
      'Praise can motivate, but feedback should also show students how to improve. Keep every "well done" and attach one specific thing to it — what was good, and what to try next.',
      'يمكن للمدح أن يحفّز، لكن ينبغي للتغذية الراجعة أن تُري الطلاب كيف يتحسّنون. احتفظ بكل «أحسنت» وأرفق بها شيئًا محددًا واحدًا — ما كان جيدًا، وما يُجرَّب بعد ذلك.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_42: LevelDefinition = {
  id: 42,
  title: t('Teacher Does All the Talking', 'المعلّم يتحدث وحده'),
  theme: t('Heard ≠ Acted On', 'مسموع ≠ معمول به'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneOut,
  scenario: t(
    'After each task the teacher gives detailed verbal feedback to the whole class — precise, well-structured, genuinely expert. Students listen quietly and nod. It would make a fine lecture on how to do the task well. Toki watches what students do when the feedback ends.',
    'بعد كل مهمة يقدّم المعلّم تغذية راجعة شفهية مفصّلة للصف كله — دقيقة ومنظّمة وخبيرة فعلًا. يُنصت الطلاب بهدوء ويومئون. لكانت محاضرة ممتازة عن كيفية أداء المهمة جيدًا. يراقب توكي ما يفعله الطلاب حين تنتهي التغذية الراجعة.',
  ),
  evidence: [
    { id: 'feedback', x: 50, y: 28, label: t('The feedback', 'التغذية الراجعة'), clue: t('Four minutes, six distinct points, all correct. Nobody writes anything down.', 'أربع دقائق، ست نقاط متمايزة، كلها صحيحة. لا أحد يدوّن شيئًا.') },
    { id: 'after', x: 26, y: 66, label: t('When it ends', 'حين تنتهي'), clue: t('"Okay — next task." The flawed work goes in the folder, untouched.', '«حسنًا — المهمة التالية.» يذهب العمل المعيب إلى الملف دون أن يُمسّ.') },
    { id: 'student', x: 78, y: 66, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"What was the main thing to fix?" — "Um… be more careful?"', '«ما الشيء الأساسي الذي ينبغي إصلاحه؟» — «أمم… أن أكون أكثر حرصًا؟»') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The feedback is excellent. What should Toki look for?', 'التغذية الراجعة ممتازة. ما الذي ينبغي أن يبحث عنه توكي؟'),
      options: [
        { id: 'fit', label: t('Whether the six points fit every student’s work or only the weakest', 'هل تناسب النقاط الست عمل كل طالب أم الأضعف فقط') },
        { id: 'action', label: t('What happens to the flawed work in the minutes after the feedback', 'ماذا يحدث للعمل المعيب في الدقائق التي تلي التغذية الراجعة') },
        { id: 'notes', label: t('Whether students have a way to capture the points as they are said', 'هل لدى الطلاب طريقة لتدوين النقاط وقت قولها') },
        { id: 'priority', label: t('Whether the teacher signals which of the six points matters most', 'هل يشير المعلّم إلى أي النقاط الست هي الأهم') },
      ],
      correctId: 'action',
      hint: t('Notes and a priority would make the six points easier to carry. Look at the second clue: "Okay — next task", and the folder closes. Which option looks at that moment?', 'التدوين والأولوية سيجعلان النقاط الست أسهل حملًا. انظر إلى الدليل الثاني: «حسنًا — المهمة التالية»، ويُغلق الملف. أي خيار ينظر إلى تلك اللحظة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The content of the feedback is strong — the delivery just never reaches the work. That’s a gap to close soon, not a practice that has lost its purpose.', 'محتوى التغذية الراجعة قوي — لكن التقديم لا يصل أبدًا إلى العمل. فجوة تُغلق قريبًا، لا ممارسة فقدت غايتها.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'one-point', label: t('Cut the six points to the one that matters most, and say it twice', 'اختصر النقاط الست إلى الأهم، وقلها مرتين') },
        { id: 'notes', label: t('Have students write the six points in their books before the next task', 'دع الطلاب يكتبون النقاط الست في دفاترهم قبل المهمة التالية') },
        { id: 'model', label: t('Show a model answer alongside the feedback so students can see exactly what "good" looks like', 'اعرض إجابة نموذجية مع التغذية الراجعة ليرى الطلاب شكل «الجيد»') },
        { id: 'act', label: t('End every feedback with five minutes in which students revise one thing in the work just done', 'أنهِ كل تغذية راجعة بخمس دقائق يراجع فيها الطلاب شيئًا واحدًا في العمل الذي أنجزوه للتو') },
      ],
      correctId: 'act',
      hint: t('Fewer points, written points, a model — all better feedback. The student said "be more careful" because nothing happened to his work. Which move touches the work?', 'نقاط أقل، نقاط مكتوبة، نموذج — كلها تغذية راجعة أفضل. قال الطالب «أن أكون أكثر حرصًا» لأن شيئًا لم يحدث لعمله. أي خطوة تمسّ العمل؟'),
    },
    reasoning: {
      prompt: t('Why five minutes of revision rather than a clearer handout?', 'لماذا خمس دقائق مراجعة بدل ورقة أوضح؟'),
      options: [
        { id: 'r1', label: t('Revising one thing is achievable; six points is a lecture', 'مراجعة شيء واحد ممكنة؛ وست نقاط محاضرة') },
        { id: 'r3', label: t('Students remember what they do longer than what they hear', 'يتذكّر الطلاب ما يفعلونه أطول مما يسمعونه') },
        { id: 'r2', label: t('Feedback becomes learning only when the student does something with it', 'لا تصبح التغذية الراجعة تعلّمًا إلا حين يفعل الطالب شيئًا بها') },
        { id: 'r4', label: t('The revised work hands the teacher evidence that the feedback actually landed', 'العمل المراجَع يعطي المعلّم دليلًا على أن التغذية الراجعة وصلت') },
      ],
      correctId: 'r2',
      hint: t('Where does feedback become learning — in the ear, or in the hand?', 'أين تصبح التغذية الراجعة تعلّمًا — في الأذن أم في اليد؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Feedback has become a performance by the teacher rather than an action by the student. Expert advice is delivered, received, and filed.',
      'أصبحت التغذية الراجعة أداءً من المعلّم لا فعلًا من الطالب. تُقدَّم النصيحة الخبيرة وتُستقبل وتُحفَظ.',
    ),
    whyItHappened: t(
      'Giving good feedback feels like the job done. Making time for students to act on it feels like losing time — so the lesson moves on and the feedback stays in the air.',
      'يبدو تقديم تغذية راجعة جيدة كأنه إنجاز المهمة. أما إتاحة وقت للطلاب للعمل بها فيبدو خسارة للوقت — فينتقل الدرس وتبقى التغذية الراجعة في الهواء.',
    ),
    howToRestore: t(
      'Feedback should create student action, reflection, and improvement. Say less, then stop — and give the minutes you saved to students revising their own work.',
      'ينبغي للتغذية الراجعة أن تُنتج فعلًا وتأملًا وتحسّنًا لدى الطالب. قل أقل ثم توقف — وامنح الدقائق التي وفّرتها للطلاب ليراجعوا أعمالهم.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_43: LevelDefinition = {
  id: 43,
  title: t('Written Comments', 'تعليقات مكتوبة'),
  theme: t('Written ≠ Read', 'مكتوب ≠ مقروء'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'Students receive their essays back covered in written comments — detailed, supportive, and clearly the product of hours of weekend marking. The teacher is exhausted and proud. Toki picks up a returned essay and reads the margin.',
    'يتسلّم الطلاب مقالاتهم مغطاة بتعليقات مكتوبة — مفصّلة وداعمة ومن الواضح أنها ثمرة ساعات من التصحيح في عطلة الأسبوع. المعلّمة مرهقة وفخورة. يلتقط توكي مقالًا مُعادًا ويقرأ الهامش.',
  ),
  evidence: [
    { id: 'margin', x: 28, y: 62, label: t('The margin', 'الهامش'), clue: t('Eleven comments on one page. Thoughtful. Overlapping. The student would need twenty minutes just to read them.', 'أحد عشر تعليقًا في صفحة واحدة. مدروسة. متداخلة. يحتاج الطالب إلى عشرين دقيقة لقراءتها فقط.') },
    { id: 'student', x: 60, y: 70, label: t('A student', 'طالب'), clue: t('Reads the grade. Flips to the back. Checks the grade again. The margin is never read.', 'يقرأ الدرجة. يقلب إلى الخلف. يتحقق من الدرجة مجددًا. لا يُقرأ الهامش أبدًا.') },
    { id: 'next', x: 80, y: 30, label: t('Next essay', 'المقال التالي'), clue: t('Due Friday — on a new topic. There is no step where this essay gets revised.', 'موعدها الجمعة — بموضوع جديد. لا توجد خطوة تُراجَع فيها هذه المقالة.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The comments are detailed and kind. What matters most?', 'التعليقات مفصّلة ولطيفة. ما الأهم؟'),
      options: [
        { id: 'load', label: t('Whether eleven comments is more than a student can take in', 'هل أحد عشر تعليقًا أكثر مما يستوعبه الطالب') },
        { id: 'quality', label: t('Whether the comments name the next step or only the problem', 'هل تسمّي التعليقات الخطوة التالية أم المشكلة فقط') },
        { id: 'use', label: t('Whether there is a moment when this essay gets revised', 'هل توجد لحظة تُراجَع فيها هذه المقالة') },
        { id: 'cost', label: t('Whether the weekend marking is sustainable for the teacher', 'هل تصحيح عطلة الأسبوع قابل للاستمرار بالنسبة إلى المعلّمة') },
      ],
      correctId: 'use',
      hint: t('Eleven is too many and the cost is real — but even three perfect comments die on an essay nobody returns to. The third clue says "due Friday — new topic". Which option follows it?', 'أحد عشر كثير والكلفة حقيقية — لكن حتى ثلاثة تعليقات مثالية تموت على مقال لا يعود إليه أحد. يقول الدليل الثالث «موعدها الجمعة — موضوع جديد». أي خيار يتبعه؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The teacher’s most expensive effort is producing almost nothing — and it’s burning her out. That’s a serious drift for the students and the teacher both.', 'أغلى جهد تبذله المعلّمة لا يُنتج شيئًا تقريبًا — وهو يستنزفها. انحراف خطير للطلاب والمعلّمة معًا.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'three', label: t('Three comments instead of eleven, each naming one change to make', 'ثلاثة تعليقات بدل أحد عشر، يسمّي كل منها تغييرًا واحدًا') },
        { id: 'revise', label: t('Three comments, and the next lesson opens with students revising the essay against them', 'ثلاثة تعليقات، ويُفتتح الدرس التالي بمراجعة الطلاب هذه المقالة على ضوئها') },
        { id: 'grade-later', label: t('Return the comments first and the grade a week later, so the margin actually gets read', 'أعيدي التعليقات أولًا والدرجة بعد أسبوع، ليُقرأ الهامش') },
        { id: 'codes', label: t('Replace written comments with marking codes keyed to a class sheet', 'استبدلي التعليقات المكتوبة برموز تصحيح مرتبطة بورقة للصف') },
      ],
      correctId: 'revise',
      hint: t('Three comments are better than eleven, and holding the grade back makes the margin get read — but read is not the same as used. Which move puts the essay back in the student’s hands?', 'ثلاثة تعليقات أفضل من أحد عشر، وحجب الدرجة يجعل الهامش يُقرأ — لكن القراءة ليست الاستخدام. أي خطوة تعيد المقال إلى يد الطالب؟'),
    },
    reasoning: {
      prompt: t('Why does the revision lesson matter more than the comments themselves?', 'لماذا يهمّ درس المراجعة أكثر من التعليقات نفسها؟'),
      options: [
        { id: 'r1', label: t('Three comments can be written in a third of the time, so the teacher lasts the year', 'ثلاثة تعليقات تُكتب في ثلث الوقت، فتصمد المعلّمة العام كله') },
        { id: 'r2', label: t('Written feedback has impact only when the student revisits and revises the work', 'لا يكون للتغذية الراجعة المكتوبة أثر إلا حين يعود الطالب إلى العمل ويراجعه') },
        { id: 'r3', label: t('A revision lesson shows the teacher which comments the students understood', 'يُري درس المراجعة المعلّمة أي التعليقات فهمها الطلاب') },
        { id: 'r4', label: t('Students who revise one essay write the next one better', 'الطلاب الذين يراجعون مقالًا يكتبون التالي أفضل') },
      ],
      correctId: 'r2',
      hint: t('What happens to a comment nobody acts on?', 'ما مصير تعليق لا يعمل به أحد؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Writing the feedback has become the whole practice. The comments are excellent and unread, because nothing in the week asks the student to use them.',
      'أصبحت كتابة التغذية الراجعة هي الممارسة كلها. التعليقات ممتازة وغير مقروءة، لأن لا شيء في الأسبوع يطلب من الطالب استخدامها.',
    ),
    whyItHappened: t(
      'Thorough marking is visible proof of care, to the teacher and to anyone who inspects the books. Revision time is invisible and feels like repetition — so it gets cut first.',
      'التصحيح الدقيق دليل مرئي على الاهتمام، للمعلّمة ولكل من يفحص الدفاتر. أما وقت المراجعة فخفيّ ويبدو تكرارًا — فيُقتطع أولًا.',
    ),
    howToRestore: t(
      'Written feedback has impact when students revisit, revise, and improve their work. Write less, and build the lesson in which it gets used.',
      'يكون للتغذية الراجعة المكتوبة أثر حين يعود الطلاب إلى أعمالهم ويراجعونها ويحسّنونها. اكتب أقل، وابنِ الدرس الذي تُستخدم فيه.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_44: LevelDefinition = {
  id: 44,
  title: t('Correcting Without Improving', 'تصحيح بلا تحسّن'),
  theme: t('Corrected ≠ Learned', 'مصحَّح ≠ متعلَّم'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'This class does everything the feedback books say. Students correct their answers after feedback, in green pen, every time. The books are a model of the policy. And yet the same errors come back on the next task, and the one after. Toki opens one book to three weeks ago.',
    'يفعل هذا الصف كل ما تقوله أدلة التغذية الراجعة. يصحّح الطلاب إجاباتهم بعد التغذية الراجعة، بالقلم الأخضر، في كل مرة. الدفاتر نموذج للسياسة. ومع ذلك تعود الأخطاء نفسها في المهمة التالية، والتي بعدها. يفتح توكي دفترًا على ما قبل ثلاثة أسابيع.',
  ),
  evidence: [
    { id: 'green', x: 26, y: 62, label: t('Green pen', 'القلم الأخضر'), clue: t('The corrected answer is copied from the board. Perfectly. Without working.', 'الإجابة المصحّحة منسوخة من السبورة. بإتقان. دون خطوات حل.') },
    { id: 'pattern', x: 58, y: 68, label: t('Three weeks', 'ثلاثة أسابيع'), clue: t('The same sign error, corrected in green, five times. Never once explained.', 'خطأ الإشارة نفسه، مصحَّح بالأخضر، خمس مرات. لم يُشرح ولا مرة.') },
    { id: 'student', x: 80, y: 32, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"Why was it wrong?" — "I don’t know. I fixed it though."', '«لماذا كانت خاطئة؟» — «لا أعرف. لكنني أصلحتها.»') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The corrections are always made. What is the key issue?', 'التصحيحات تُجرى دائمًا. ما القضية الأساسية؟'),
      options: [
        { id: 'transfer', label: t('Whether the corrected error stays corrected on a new question', 'هل يبقى الخطأ المصحَّح مصحَّحًا في سؤال جديد') },
        { id: 'working', label: t('Whether students show working when they correct, not only the answer', 'هل يُظهر الطلاب خطوات الحل عند التصحيح لا الإجابة فقط') },
        { id: 'source', label: t('Whether the sign error comes from the teaching or from the students', 'هل يأتي خطأ الإشارة من التدريس أم من الطلاب') },
        { id: 'timing', label: t('Whether corrections happen the same day or a week later', 'هل يحدث التصحيح في اليوم نفسه أم بعد أسبوع') },
      ],
      correctId: 'transfer',
      hint: t('Working, source and timing would all improve the correction. The second clue is the one to follow: the same sign error, five times, three weeks. Which option asks about the sixth time?', 'الخطوات والمصدر والتوقيت كلها ستحسّن التصحيح. الدليل الثاني هو ما ينبغي تتبّعه: خطأ الإشارة نفسه، خمس مرات، ثلاثة أسابيع. أي خيار يسأل عن المرة السادسة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The practice is followed perfectly and produces no learning at all — the most dangerous kind of drift, because the books say everything is fine.', 'تُتّبع الممارسة بإتقان ولا تُنتج أي تعلّم على الإطلاق — أخطر أنواع الانحراف، لأن الدفاتر تقول إن كل شيء على ما يرام.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'working', label: t('Require full working in green, not just the final answer', 'اشترط خطوات الحل كاملة بالأخضر، لا الإجابة النهائية فقط') },
        { id: 'reteach', label: t('Reteach sign rules to the whole class before the next correction', 'أعد تدريس قواعد الإشارة للصف كله قبل التصحيح التالي') },
        { id: 'why-then-new', label: t('Replace "copy the right answer" with "explain why yours was wrong, then solve a new one"', 'استبدل «انسخ الإجابة الصحيحة» بـ«اشرح لماذا كانت إجابتك خاطئة، ثم حلّ سؤالًا جديدًا»') },
        { id: 'track', label: t('Keep a tally of each student’s repeated errors and target them in the next day’s starter', 'احتفظ بإحصاء لأخطاء كل طالب المتكررة واستهدفها في نشاط البداية') },
      ],
      correctId: 'why-then-new',
      hint: t('Full working can still be copied from the board. Reteaching and tallies act on the error from outside the student. "I don’t know — I fixed it though." Which move makes the student do the knowing?', 'خطوات الحل كاملة يمكن نسخها من السبورة أيضًا. إعادة التدريس والإحصاء يتعاملان مع الخطأ من خارج الطالب. «لا أعرف — لكنني أصلحتها.» أي خطوة تجعل الطالب هو من يعرف؟'),
    },
    reasoning: {
      prompt: t('Why "explain, then a new one" instead of a better correction?', 'لماذا «اشرح، ثم سؤال جديد» بدل تصحيح أفضل؟'),
      options: [
        { id: 'r2', label: t('Explaining and re-applying is where understanding transfers to the next task', 'الشرح وإعادة التطبيق هما حيث ينتقل الفهم إلى المهمة التالية') },
        { id: 'r1', label: t('A student who explains an error out loud is less likely to repeat it from embarrassment', 'الطالب الذي يشرح خطأه بصوت مرتفع أقل احتمالًا لتكراره بدافع الحرج') },
        { id: 'r3', label: t('A new question tells the teacher which students still need reteaching', 'السؤال الجديد يخبر المعلّم أي الطلاب ما زالوا بحاجة إلى إعادة تدريس') },
        { id: 'r4', label: t('Copying the answer gives the student nothing to think about', 'نسخ الإجابة لا يعطي الطالب شيئًا يفكّر فيه') },
      ],
      correctId: 'r2',
      hint: t('"I fixed it though." What was fixed — the answer, or the understanding?', '«لكنني أصلحتها.» ما الذي أُصلح — الإجابة أم الفهم؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Correction has become transcription. The right answer is recorded; the wrong idea that produced it is untouched, so it produces it again next week.',
      'أصبح التصحيح نسخًا. تُسجَّل الإجابة الصحيحة؛ أما الفكرة الخاطئة التي أنتجتها فلا تُمسّ، فتنتجها مجددًا الأسبوع القادم.',
    ),
    whyItHappened: t(
      'A green-pen policy is easy to see and easy to check. "Did they correct it?" is a question a book can answer. "Did they understand why?" is not — so the policy got followed and the purpose got lost.',
      'سياسة القلم الأخضر سهلة الرؤية وسهلة التحقق. «هل صحّحوها؟» سؤال يستطيع الدفتر الإجابة عنه. أما «هل فهموا لماذا؟» فلا — فاتُّبعت السياسة وضاعت الغاية.',
    ),
    howToRestore: t(
      'Feedback should build understanding that transfers to future tasks, not only fix the current answer. Explain the error in your own words; then prove it on a fresh problem.',
      'ينبغي للتغذية الراجعة أن تبني فهمًا ينتقل إلى المهام المستقبلية، لا أن تصلح الإجابة الحالية فقط. اشرح الخطأ بكلماتك؛ ثم أثبته في مسألة جديدة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['mutation-hunter'],
};

export const WORLD_4_LEVELS = [LEVEL_41, LEVEL_42, LEVEL_43, LEVEL_44];
