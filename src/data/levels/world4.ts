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
        { id: 'guides', label: t('Whether feedback guides improvement', 'هل توجّه التغذية الراجعة التحسّن') },
        { id: 'encouraged', label: t('Whether students feel encouraged', 'هل يشعر الطلاب بالتشجيع') },
        { id: 'often', label: t('Whether praise is given often', 'هل يُعطى المدح كثيرًا') },
        { id: 'positive', label: t('Whether comments are positive', 'هل التعليقات إيجابية') },
      ],
      correctId: 'guides',
      hint: t('Praise tells a child they did well. What tells them what to do next?', 'يخبر المدح الطفل أنه أحسن. ما الذي يخبره بما يفعله بعد ذلك؟'),
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
        { id: 'less-praise', label: t('Ask the teacher to praise less', 'اطلب من المعلّمة أن تمدح أقل') },
        { id: 'praise-plus', label: t('Keep the warmth, add the information: "Well done — your tall letters touch the line. Try making the small ones half that height."', 'احتفظ بالدفء وأضف المعلومة: «أحسنت — حروفك الطويلة تلامس السطر. جرّبي أن تجعلي الصغيرة بنصف هذا الطول.»') },
        { id: 'stickers', label: t('Introduce a sticker chart to make praise visible', 'أدخل جدول ملصقات لجعل المدح مرئيًا') },
        { id: 'written', label: t('Switch to written feedback only', 'تحوّل إلى التغذية الراجعة المكتوبة فقط') },
      ],
      correctId: 'praise-plus',
      hint: t('The praise isn’t the problem. What’s missing from the sentence?', 'المدح ليس المشكلة. ما الغائب من الجملة؟'),
    },
    reasoning: {
      prompt: t('Why add to the praise rather than reduce it?', 'لماذا نضيف إلى المدح بدل تقليله؟'),
      options: [
        { id: 'r1', label: t('The teacher would be upset to be told she praises too much', 'ستنزعج المعلّمة إذا قيل لها إنها تمدح كثيرًا') },
        { id: 'r2', label: t('Praise can motivate, but feedback should also show students how to improve — one specific detail turns a warm moment into a learning moment', 'يمكن للمدح أن يحفّز، لكن ينبغي للتغذية الراجعة أن تُري الطلاب كيف يتحسّنون — تفصيل محدد واحد يحوّل اللحظة الدافئة إلى لحظة تعلّم') },
        { id: 'r3', label: t('Children need praise to behave', 'يحتاج الأطفال إلى المدح ليحسنوا السلوك') },
        { id: 'r4', label: t('It takes the same amount of time', 'يستغرق الوقت نفسه') },
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
        { id: 'action', label: t('Student action after feedback', 'فعل الطالب بعد التغذية الراجعة') },
        { id: 'clarity', label: t('Teacher clarity during feedback', 'وضوح المعلّم أثناء التغذية الراجعة') },
        { id: 'listening', label: t('Student listening behaviour', 'سلوك الإنصات لدى الطلاب') },
        { id: 'time', label: t('Feedback delivery time', 'وقت تقديم التغذية الراجعة') },
      ],
      correctId: 'action',
      hint: t('Six points were said. How many were used?', 'قيلت ست نقاط. كم منها استُخدم؟'),
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
        { id: 'shorter', label: t('Make the feedback shorter', 'اجعل التغذية الراجعة أقصر') },
        { id: 'act', label: t('End every feedback with five minutes in which students revise one thing in the work they just did', 'أنهِ كل تغذية راجعة بخمس دقائق يراجع فيها الطلاب شيئًا واحدًا في العمل الذي أنجزوه للتو') },
        { id: 'handout', label: t('Put the six points on a handout', 'ضع النقاط الست في ورقة') },
        { id: 'individual', label: t('Give the feedback to each student individually', 'قدّم التغذية الراجعة لكل طالب على حدة') },
      ],
      correctId: 'act',
      hint: t('The feedback was heard. What would make it used?', 'سُمعت التغذية الراجعة. ما الذي يجعلها تُستخدم؟'),
    },
    reasoning: {
      prompt: t('Why five minutes of revision rather than a clearer handout?', 'لماذا خمس دقائق مراجعة بدل ورقة أوضح؟'),
      options: [
        { id: 'r1', label: t('Handouts get lost', 'تضيع الأوراق') },
        { id: 'r2', label: t('Feedback should create student action, reflection, and improvement — it only becomes learning when the student does something with it', 'ينبغي للتغذية الراجعة أن تُنتج فعلًا وتأملًا وتحسّنًا لدى الطالب — ولا تصبح تعلّمًا إلا حين يفعل الطالب شيئًا بها') },
        { id: 'r3', label: t('It fills the end of the lesson', 'تملأ نهاية الدرس') },
        { id: 'r4', label: t('Students prefer doing to listening', 'يفضّل الطلاب الفعل على الإنصات') },
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
        { id: 'use', label: t('How students use the comments', 'كيف يستخدم الطلاب التعليقات') },
        { id: 'detail', label: t('How detailed the comments are', 'مدى تفصيل التعليقات') },
        { id: 'neat', label: t('How neat the marking looks', 'مدى ترتيب التصحيح') },
        { id: 'often', label: t('How often work is returned', 'كم مرة يُعاد العمل') },
      ],
      correctId: 'use',
      hint: t('Hours were spent writing. How many minutes were spent reading?', 'قُضيت ساعات في الكتابة. كم دقيقة قُضيت في القراءة؟'),
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
        { id: 'more', label: t('Add a summary comment at the end', 'أضف تعليقًا ملخِّصًا في النهاية') },
        { id: 'revise', label: t('Three comments, not eleven — and the next lesson begins with students revising their essay against them before any new topic', 'ثلاثة تعليقات لا أحد عشر — ويبدأ الدرس التالي بمراجعة الطلاب مقالاتهم على ضوئها قبل أي موضوع جديد') },
        { id: 'typed', label: t('Type the comments so they’re easier to read', 'اطبع التعليقات ليسهل قراءتها') },
        { id: 'grade-only', label: t('Stop writing comments — just give the grade', 'توقف عن كتابة التعليقات — أعط الدرجة فقط') },
      ],
      correctId: 'revise',
      hint: t('Less to read, and a reason to read it. What is that reason?', 'أقل للقراءة، وسبب لقراءته. ما ذلك السبب؟'),
    },
    reasoning: {
      prompt: t('Why does the revision lesson matter more than the comments themselves?', 'لماذا يهمّ درس المراجعة أكثر من التعليقات نفسها؟'),
      options: [
        { id: 'r1', label: t('It gives the teacher a rest from marking', 'يمنح المعلّمة راحة من التصحيح') },
        { id: 'r2', label: t('Written feedback has impact only when students revisit, revise, and improve their work — the comment is the seed, the revision is the growth', 'لا يكون للتغذية الراجعة المكتوبة أثر إلا حين يعود الطلاب إلى أعمالهم ويراجعونها ويحسّنونها — التعليق هو البذرة، والمراجعة هي النمو') },
        { id: 'r3', label: t('Revision lessons are easier to plan', 'دروس المراجعة أسهل في التخطيط') },
        { id: 'r4', label: t('Students need practice reading handwriting', 'يحتاج الطلاب إلى تدريب على قراءة خط اليد') },
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
        { id: 'transfer', label: t('Transfer of learning', 'انتقال التعلّم') },
        { id: 'accuracy', label: t('Accuracy of corrections', 'دقة التصحيحات') },
        { id: 'number', label: t('Number of mistakes', 'عدد الأخطاء') },
        { id: 'speed', label: t('Speed of correction', 'سرعة التصحيح') },
      ],
      correctId: 'transfer',
      hint: t('Every correction is right. Why does the error come back?', 'كل تصحيح صحيح. لماذا يعود الخطأ؟'),
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
        { id: 'more-green', label: t('Check the green-pen corrections more strictly', 'تحقق من تصحيحات القلم الأخضر بصرامة أكبر') },
        { id: 'why-then-new', label: t('Replace "copy the right answer" with "explain why yours was wrong — then solve a new one of the same type"', 'استبدل «انسخ الإجابة الصحيحة» بـ«اشرح لماذا كانت إجابتك خاطئة — ثم حلّ سؤالًا جديدًا من النوع نفسه»') },
        { id: 'drop', label: t('Drop the correction policy — it isn’t working', 'ألغِ سياسة التصحيح — فهي لا تنجح') },
        { id: 'red', label: t('Mark repeated errors in red to make them visible', 'ضع علامة على الأخطاء المتكررة بالأحمر لجعلها مرئية') },
      ],
      correctId: 'why-then-new',
      hint: t('Copying the answer proves it was heard. What would prove it was understood?', 'نسخ الإجابة يثبت أنها سُمعت. ما الذي يثبت أنها فُهمت؟'),
    },
    reasoning: {
      prompt: t('Why "explain, then a new one" instead of a better correction?', 'لماذا «اشرح، ثم سؤال جديد» بدل تصحيح أفضل؟'),
      options: [
        { id: 'r1', label: t('It makes the books look more thorough', 'يجعل الدفاتر تبدو أكثر دقة') },
        { id: 'r2', label: t('Feedback should build understanding that transfers to future tasks, not only fix the current answer — explaining and re-applying is where the transfer happens', 'ينبغي للتغذية الراجعة أن تبني فهمًا ينتقل إلى المهام المستقبلية، لا أن تصلح الإجابة الحالية فقط — والشرح وإعادة التطبيق هما حيث يحدث الانتقال') },
        { id: 'r3', label: t('Students find copying boring', 'يجد الطلاب النسخ مملًا') },
        { id: 'r4', label: t('It satisfies the marking policy', 'يستوفي سياسة التصحيح') },
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
