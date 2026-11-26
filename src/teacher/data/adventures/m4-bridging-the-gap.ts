/**
 * Mission 04 — Bridging the Gap. Grade 7 · Math (proportions). Sara's thread.
 * Opened by M01 "The Unfinished Puzzle" or by `unlock:m4` (Sara's bridge).
 * Readiness and prerequisites: find the real missing piece, then choose
 * Need Help, AI Helper or Practice for it. Reads `unlock:m4` (yesterday's
 * bridge makes today's practice stick).
 * Branch map: docs/content/TEACHER_CONTENT.md#m04
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M4: Adventure = {
  id: 'm4',
  number: 4,
  title: t('Bridging the Gap', 'سدّ الفجوة'),
  meta: t('Mission 04 · Grade 7 · Math', 'المهمة ٠٤ · الصف السابع · الرياضيات'),
  location: 'grade7',
  scene: 'teacher/scenes/m04.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'A gap is a missing step, not a missing student: find the exact step, then match the support (guidance, explanation or practice) to it.',
    'الفجوة خطوة ناقصة، لا طالب ناقص: حدّد الخطوة بالضبط، ثم اختر الدعم المناسب لها، توجيهًا أو شرحًا أو تدريبًا.',
  ),
  film: [
    { picture: 'teacher/film/m04-1.jpg', narration: T(['Today: proportions. It builds on ratios, and on everything before them.', 'درس اليوم: التناسب. وهو مبني على النسب، وعلى كل ما قبلها.']) },
    { picture: 'teacher/film/m04-2.jpg', who: 'sara', line: T(['Miss, is today going to be like yesterday?', 'أستاذة، هل سيكون درس اليوم مثل الأمس؟']) },
    { picture: 'teacher/film/m04-2.jpg', who: 'omar', line: T(['I don\'t get what the question wants.', 'لا أفهم ماذا يريد السؤال.']) },
    { picture: 'teacher/film/m04-2.jpg', who: 'maitha', line: T(['Miss, the questions are so long.', 'أستاذة، الأسئلة طويلة جدًا.']) },
    { picture: 'teacher/film/m04-3.jpg', narration: T(['Three students, three kinds of gap. Which piece is missing for each?', 'ثلاثة طلاب، وثلاثة أنواع من الفجوات. ما القطعة الناقصة لدى كل واحد؟']) },
  ],
  intro: [T(['MISSION 04 | Bridging the Gap', 'المهمة ٠٤ | سدّ الفجوة']), T(['Find the missing step. Build the bridge.', 'جدي الخطوة الناقصة، وابني الجسر.'])],
  introBubbles: [
    { student: 'sara', line: T(['Like yesterday?', 'مثل الأمس؟']) },
    { student: 'maitha', line: T(['So long…', 'طويلة جدًا…']) },
  ],
  students: [
    {
      id: 'sara', name: T(['Sara', 'سارة']), x: 34, y: 58, understanding: 1, engagement: 2,
      idle: T(['Sara has yesterday\'s page open next to today\'s.', 'سارة فتحت صفحة الأمس بجانب صفحة اليوم.']),
      homeNote: T(['She looks after her younger brothers after school most days, so homework is done late.', 'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.']),
    },
    {
      id: 'omar', name: T(['Omar', 'عمر']), x: 18, y: 44, understanding: 1, engagement: 1,
      idle: T(['Omar is reading question 1 for the third time.', 'عمر يقرأ السؤال الأول للمرة الثالثة.']),
      homeNote: T(['His dad works night shifts, so mornings at home are rushed.', 'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.']),
    },
    {
      id: 'maitha', name: T(['Maitha', 'ميثاء']), x: 64, y: 52, understanding: 2, engagement: 1,
      idle: T(['Maitha is underlining words in the question.', 'ميثاء تضع خطوطًا تحت كلمات في السؤال.']),
      homeNote: T(['Arabic at home; she reads to her grandmother every evening.', 'العربية لغة البيت، وهي تقرأ لجدّتها كل مساء.']),
    },
  ],
  objects: [
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '▣', x: 82, y: 64, idle: T(['A three-question warm-up is ready.', 'تمهيد من ثلاثة أسئلة جاهز.']) },
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['"2 : 3 = 6 : ?" is left from yesterday.', '«٢ : ٣ = ٦ : ؟» باقية من الأمس.']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A folded chart is tucked between the dictionaries.', 'مخطّط مطوي بين القواميس.']) },
  ],
  schedule: ['sara', 'omar', 'maitha', 'laptop', 'board', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'sara', kind: 'needs-help', on: 'sara',
      line: T(['"Miss, is today going to be like yesterday?"', '«أستاذة، هل سيكون درس اليوم مثل الأمس؟»']),
      ask: T(['Is yesterday\'s gap still there, or is it a different one?', 'هل ما زالت فجوة الأمس موجودة، أم أنها فجوة أخرى؟']),
      investigate: {
        clues: [
          clue('warmup', ['Today\'s warm-up', 'تمهيد اليوم'], ['Her three warm-up answers.', 'إجاباتها عن أسئلة التمهيد الثلاثة.']),
          clue('page', ['Yesterday\'s page', 'صفحة الأمس'], ['What she did yesterday.', 'ما فعلته أمس.']),
          clue('says', ['What she says', 'ما تقوله'], ['"Which part feels hard?"', '«أي جزء يبدو صعبًا؟»']),
        ],
        profiles: [
          profile('stuck', 35, 'm4.sara:stuck', {
            warmup: ['She can\'t simplify 6:9. The other two are blank.', 'لا تستطيع تبسيط ٦:٩. والسؤالان الآخران فارغان.'],
            page: ['Yesterday\'s simplifying, done with you, step by step.', 'التبسيط الذي حلّته معكِ أمس، خطوة بخطوة.'],
            says: ['"I could do it with you. Alone I forget the first step."', '«كنت أستطيع معكِ. وحدي أنسى الخطوة الأولى.»'],
          }),
          profile('facts', 35, 'm4.sara:facts', {
            warmup: ['She simplifies correctly, then writes 6 × 7 = 48.', 'تبسّط بشكل صحيح، ثم تكتب ٦ × ٧ = ٤٨.'],
            page: ['Yesterday\'s ratios right; two wrong answers, both times-table slips.', 'نسب الأمس صحيحة، وإجابتان خاطئتان، كلتاهما خطأ في جدول الضرب.'],
            says: ['"I know what to do. The numbers keep going wrong."', '«أعرف ماذا أفعل. لكن الأرقام تخطئ دائمًا.»'],
          }),
          profile('ready', 30, 'm4.sara:ready', {
            warmup: ['Three of three, quickly.', 'ثلاثة من ثلاثة، بسرعة.'],
            page: ['Yesterday\'s bridge page, and two extra questions she did at home.', 'صفحة جسر الأمس، وسؤالان إضافيان حلّتهما في البيت.'],
            says: ['"It\'s like the strips. Same multiplier both sides."', '«مثل الشرائط. المضاعف نفسه في الطرفين.»'],
          }),
        ],
      },
      choices: [
        ch(['Five short simplifying questions', 'خمسة أسئلة تبسيط قصيرة'], ['Practice', 'التدريب'], [{ ifFlag: 'unlock:m4', outcome: 'sPracticeSticks' }, { outcome: 'sPracticeStart' }], { ifFlag: 'm4.sara:stuck' }),
        ch(['Start today\'s task with a hint', 'ابدئي مهمة اليوم مع تلميح'], ['Need Help', 'أحتاج مساعدة'], 'sHint', { ifFlag: 'm4.sara:stuck' }),
        ch(['Times-table facts first', 'حقائق جدول الضرب أولًا'], ['Practice', 'التدريب'], 'sFacts', { ifFlag: 'm4.sara:facts' }),
        ch(['A times-table grid on her desk, for today', 'جدول ضرب على طاولتها، لهذا اليوم'], ['Support', 'دعم'], 'sGrid', { ifFlag: 'm4.sara:facts' }),
        ch(['Assign today\'s task straight away', 'كلّفيها بمهمة اليوم فورًا'], ['Assign', 'التكليف'], 'sReady', { ifFlag: 'm4.sara:ready' }),
        ch(['One more check, to be sure', 'تحقّق إضافي للتأكّد'], ['Check again', 'تحقّق مرة أخرى'], 'sCheckAgain', { ifFlag: 'm4.sara:ready' }),
      ],
    },
    {
      id: 'omar', kind: 'needs-help', on: 'omar',
      line: T(['"I don\'t get what the question wants."', '«لا أفهم ماذا يريد السؤال.»']),
      ask: T(['Is it the task, the maths, or his confidence?', 'هل المشكلة في المهمة، أم في الرياضيات، أم في ثقته؟']),
      investigate: {
        clues: [
          clue('desk', ['His desk', 'طاولته'], ['What is on it?', 'ماذا عليها؟']),
          clue('try', ['His attempt', 'محاولته'], ['What did he try?', 'ماذا جرّب؟']),
          clue('reply', ['What he says', 'ما يقوله'], ['"Show me where you\'re stuck."', '«أرني أين توقّفت.»']),
        ],
        profiles: [
          profile('task', 40, 'm4.omar:task', {
            desk: ['The question underlined in three colours.', 'السؤال مسطّر بثلاثة ألوان.'],
            try: ['A correct ratio table, in the wrong place on the page.', 'جدول نسب صحيح، لكن في المكان الخطأ من الصفحة.'],
            reply: ['"Do they want one answer or the whole table?"', '«هل يريدون إجابة واحدة أم الجدول كله؟»'],
          }),
          profile('prior', 30, 'm4.omar:prior', {
            desk: ['A borrowed copy of yesterday\'s notes.', 'نسخة مستعارة من ملاحظات الأمس.'],
            try: ['"2:3 = 3:4", the old adding idea.', '«٢:٣ = ٣:٤»، فكرة الجمع القديمة.'],
            reply: ['"I missed the ratios lesson. Everyone says it\'s easy."', '«فاتني درس النسب. الجميع يقول إنه سهل.»'],
          }),
          profile('confidence', 30, 'm4.omar:confidence', {
            desk: ['Two answers written and rubbed out. Both were right.', 'إجابتان كتبهما ثم مسحهما. وكلتاهما صحيحة.'],
            try: ['Nothing left on the page.', 'لا شيء باقٍ على الورقة.'],
            reply: ['"I had it, but I thought it was wrong."', '«حللتها، لكنني ظننتها خطأ.»'],
          }),
        ],
      },
      choices: [
        ch(['Guidance on what the task asks', 'توجيه إلى المطلوب في المهمة'], ['Need Help', 'أحتاج مساعدة'], 'oHelp', { ifFlag: 'm4.omar:task' }),
        ch(['Let him ask what it means', 'دعيه يسأل عن المعنى'], ['AI Helper', 'المساعد الذكي'], 'oAi', { ifFlag: 'm4.omar:task' }),
        ch(['Yesterday\'s idea, in his words', 'فكرة الأمس، بكلماته'], ['AI Helper', 'المساعد الذكي'], 'oCatch', { ifFlag: 'm4.omar:prior' }),
        ch(['Pair him with Sara', 'اجعليه مع سارة'], ['Teams', 'الفرق'], [{ ifFlag: 'm4.closed', outcome: 'oPairGood' }, { outcome: 'oPairStuck' }], { ifFlag: 'm4.omar:prior' }),
        ch(['Three he can do, then one stretch', 'ثلاثة يستطيع حلّها، ثم واحدة أصعب'], ['Practice', 'التدريب'], 'oPractice', { ifFlag: 'm4.omar:confidence' }),
        ch(['"Your first answer was right."', '«إجابتك الأولى كانت صحيحة.»'], ['Encourage', 'تشجيع'], 'oTold', { ifFlag: 'm4.omar:confidence', minutes: 0 }),
      ],
    },
    {
      id: 'maitha', kind: 'needs-help', on: 'maitha',
      line: T(['"Miss, the questions are so long."', '«أستاذة، الأسئلة طويلة جدًا.»']),
      ask: T(['Is it the reading, the method, or is she ahead?', 'هل المشكلة في القراءة، أم في الطريقة، أم أنها متقدّمة؟']),
      investigate: {
        clues: [
          clue('tablet', ['Tablet', 'الجهاز اللوحي'], ['Where is she on the task?', 'أين وصلت في المهمة؟']),
          clue('notebook', ['Notebook', 'الدفتر'], ['Her working.', 'طريقة حلّها.']),
          clue('says', ['What she says', 'ما تقوله'], ['"What\'s the hardest part?"', '«ما الجزء الأصعب؟»']),
        ],
        profiles: [
          profile('reading', 40, 'm4.maitha:reading', {
            tablet: ['Still on question 1 after four minutes; three English words circled.', 'ما زالت عند السؤال الأول بعد أربع دقائق، وثلاث كلمات إنجليزية محاطة بدائرة.'],
            notebook: ['The numbers from the question, set out correctly.', 'أعداد السؤال، مرتّبة بشكل صحيح.'],
            says: ['"What does \'respectively\' mean?"', '«ماذا تعني respectively؟»'],
          }),
          profile('method', 30, 'm4.maitha:method', {
            tablet: ['Question 2, correct, after a long time.', 'السؤال الثاني، صحيح، بعد وقت طويل.'],
            notebook: ['3, 6, 9, 12, 15… she added her way to the answer.', '٣، ٦، ٩، ١٢، ١٥… وصلت إلى الإجابة بالجمع المتكرّر.'],
            says: ['"It works, but it takes forever."', '«تنجح، لكنها تأخذ وقتًا طويلًا جدًا.»'],
          }),
          profile('ahead', 30, 'm4.maitha:ahead', {
            tablet: ['All six done, correctly.', 'الأسئلة الستة كلها محلولة بشكل صحيح.'],
            notebook: ['Neat cross-checks next to each answer.', 'تحقّقات مرتّبة بجانب كل إجابة.'],
            says: ['"Long, but easy. Is there anything else?"', '«طويلة، لكنها سهلة. هل يوجد شيء آخر؟»'],
          }),
        ],
      },
      choices: [
        ch(['Let her ask about the words', 'دعيها تسأل عن الكلمات'], ['AI Helper', 'المساعد الذكي'], 'mAi', { ifFlag: 'm4.maitha:reading' }),
        ch(['Rewrite the question in simpler maths', 'أعيدي صياغة السؤال برياضيات أبسط'], ['Simplify', 'تبسيط'], 'mEasier', { ifFlag: 'm4.maitha:reading', minutes: 0 }),
        ch(['"Why does adding work here?"', '«لماذا ينجح الجمع هنا؟»'], ['See Why', 'اعرف السبب'], 'mWhy', { ifFlag: 'm4.maitha:method' }),
        ch(['Show her the quick method', 'أريها الطريقة السريعة'], ['Model it', 'نموذج'], 'mShow', { ifFlag: 'm4.maitha:method', minutes: 0 }),
        ch(['Assign her a stretch problem', 'كلّفيها بمسألة أصعب'], ['Assign', 'التكليف'], 'mStretch', { ifFlag: 'm4.maitha:ahead' }),
        ch(['Ask her to check with Sara', 'اطلبي منها أن تراجع مع سارة'], ['Teams', 'الفرق'], 'mPeer', { ifFlag: 'm4.maitha:ahead' }),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['A three-question warm-up', 'تمهيد من ثلاثة أسئلة']),
      ask: T(['Check readiness first, or start the new topic?', 'هل تتحقّقين من الاستعداد أولًا، أم تبدئين الموضوع الجديد؟']),
      choices: [
        ch(['Run the warm-up', 'ابدئي التمهيد'], ['Readiness check', 'التحقّق من الاستعداد'], 'lCheck'),
        ch(['Skip it, start the lesson', 'تجاوزيه، وابدئي الدرس'], ['Start', 'البدء'], 'lSkip', { minutes: 0 }),
      ],
    },
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['"2 : 3 = 6 : ?"', '«٢ : ٣ = ٦ : ؟»']),
      ask: T(['How will you use yesterday\'s question?', 'كيف ستستفيدين من سؤال الأمس؟']),
      choices: [
        ch(['Bridge from it to today\'s intention', 'اعبري منه إلى هدف اليوم'], ['Present Mode', 'وضع العرض'], 'bBridge'),
        ch(['Wipe it; start fresh', 'امسحيه، وابدئي من جديد'], ['Fresh start', 'بداية جديدة'], 'bWipe', { minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['A folded chart between the dictionaries.', 'مخطّط مطوي بين القواميس.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Unfold it', 'افتحيه'], ['Hidden discovery', 'اكتشاف مخفي'], 'shChart', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pSame', kind: 'new-event', on: 'sara', category: 'learning', weight: 35, eligible: { notFlags: ['m4.sara:stuck'] },
      line: T(['Sara: "Wait. This is the same as yesterday, just with a question mark!"', 'سارة: «لحظة. هذا مثل الأمس، لكن مع علامة استفهام!»']),
      ask: T(['She has seen the bridge for herself.', 'رأت الجسر بنفسها.']),
      choices: [
        ch(['"Tell the class what you just saw"', '«أخبري الصف بما رأيتِه للتو»'], ['Student voice', 'صوت الطالب'], 'psShare'),
        ch(['Smile, and let her keep going', 'ابتسمي، ودعيها تتابع'], ['Continue', 'متابعة'], 'psOn', { minutes: 0 }),
      ],
    },
    {
      id: 'pExplain', kind: 'new-event', on: 'maitha', category: 'collaboration', weight: 25,
      line: T(['Maitha is explaining her adding method to Omar.', 'ميثاء تشرح لعمر طريقة الجمع المتكرّر.']),
      ask: T(['Slow, but he is following every step.', 'بطيئة، لكنه يتابع كل خطوة.']),
      choices: [
        ch(['Let them finish, then compare with multiplying', 'دعيهما ينهيان، ثم يقارنان بالضرب'], ['Teams', 'الفرق'], 'peCompare'),
        ch(['Show them the faster way now', 'أريهما الطريقة الأسرع الآن'], ['Model it', 'نموذج'], 'peFast', { minutes: 0 }),
      ],
    },
    {
      id: 'pCross', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20,
      line: T(['A voice: "My tutor says just cross-multiply. Why do we need all this?"', 'صوت: «مدرّسي الخصوصي يقول اضرب تبادليًا فقط. لماذا كل هذا؟»']),
      ask: T(['A rule without a reason, and half the class wants it.', 'قاعدة بلا سبب، ونصف الصف يريدها.']),
      choices: [
        ch(['"Why does cross-multiplying work?"', '«لماذا ينجح الضرب التبادلي؟»'], ['See Why', 'اعرف السبب'], 'pcWhy'),
        ch(['"It works. Use it."', '«إنها تنجح. استخدموها.»'], ['Shortcut', 'اختصار'], 'pcRule', { minutes: 0 }),
      ],
    },
    {
      id: 'pLogin', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['Two students can\'t log in.', 'طالبان لا يستطيعان تسجيل الدخول.']),
      ask: T(['They are the two who most need the warm-up.', 'إنهما أكثر من يحتاج إلى التمهيد.']),
      choices: [
        ch(['Warm-up on paper for those two', 'تمهيد ورقي لهذين الاثنين'], ['Paper', 'ورق'], 'plPaper'),
        ch(['Share a screen with a neighbour', 'شاشة مشتركة مع زميل'], ['Pairs', 'ثنائيات'], 'plShare'),
      ],
    },
  ],
  outcomes: [
    out('sPracticeSticks', 'good', ['Yesterday\'s bridge holds', 'جسر الأمس يصمد'], ['Five questions. She hesitates on the first, then remembers your strips from yesterday. Four right on her own.', 'خمسة أسئلة. تتردّد في الأول، ثم تتذكّر شرائط الأمس. وتحلّ أربعة وحدها بشكل صحيح.'], [fx('sara', 2, 1)], { xp: 30, discover: 'practice', setFlag: 'm4.closed' }),
    out('sPracticeStart', 'good', ['The first step, five times', 'الخطوة الأولى، خمس مرات'], ['Short, focused, all about the first step. By the fifth she does it without looking at you.', 'قصيرة ومركّزة، وكلها عن الخطوة الأولى. وعند الخامس تحلّها دون أن تنظر إليكِ.'], [fx('sara', 1, 1)], { xp: 30, discover: 'practice', setFlag: 'm4.closed' }),
    out('sHint', 'mixed', ['Through one, not across', 'عبرت سؤالًا، لا الفجوة'], ['The hint gets her through question 1. On question 2 the same first step stops her.', 'التلميح يساعدها في السؤال الأول. وفي السؤال الثاني توقفها الخطوة الأولى نفسها.'], [fx('sara', 0, 1)], { xp: 30, discover: 'need-help', setFlag: 'm4.gap' }),
    out('sFacts', 'good', ['The real missing piece', 'القطعة الناقصة الحقيقية'], ['It was never ratios. Six times-table facts, practised, and her proportions come out right.', 'لم تكن المشكلة في النسب أبدًا. ستّ حقائق من جدول الضرب، بعد التدريب، وتخرج إجابات التناسب صحيحة.'], [fx('sara', 2, 1)], { xp: 30, discover: 'practice', setFlag: 'm4.closed' }),
    out('sGrid', 'insight', ['Today\'s task, tomorrow\'s job', 'مهمة اليوم، وعمل الغد'], ['With the grid she gets every proportion right. The facts themselves will need their own practice.', 'مع الجدول تحلّ كل مسائل التناسب بشكل صحيح. أما الحقائق نفسها فستحتاج إلى تدريب خاص.'], [fx('sara', 1, 1)], { xp: 30, setFlag: 'm4.gap' }),
    out('sReady', 'good', ['The gap is closed', 'الفجوة سُدّت'], ['She starts proportions with yesterday\'s idea in her own words: "same multiplier both sides".', 'تبدأ التناسب بفكرة الأمس بكلماتها: «المضاعف نفسه في الطرفين.»'], [fx('sara', 1, 2)], { xp: 30, discover: 'assign', setFlag: 'm4.closed' }),
    out('sCheckAgain', 'mixed', ['Safe, and a little slow', 'آمن، لكنه بطيء قليلًا'], ['Right again. She was ready five minutes ago.', 'صحيحة مرة أخرى. كانت مستعدة قبل خمس دقائق.'], [fx('sara', 0, -1)], { xp: 30, setFlag: 'm4.closed' }),
    out('oHelp', 'good', ['"The whole table"', '«الجدول كله»'], ['The question wanted the full table. His table was right all along; now it\'s in the right place.', 'كان السؤال يريد الجدول كاملًا. جدوله كان صحيحًا منذ البداية، والآن صار في مكانه.'], [fx('omar', 1, 1)], { xp: 30, discover: 'need-help' }),
    out('oAi', 'good', ['He asks, in his words', 'يسأل بكلماته'], ['"Do they want one answer?" He gets a plain reply and tells you what he will do next.', '«هل يريدون إجابة واحدة؟» يحصل على رد واضح، ويخبركِ بما سيفعله بعد ذلك.'], [fx('omar', 1, 1)], { xp: 30, discover: 'ai-helper' }),
    out('oCatch', 'good', ['Yesterday, caught up', 'الأمس، تعوّض'], ['He asks what equivalent ratios are and explains it back: "times, not plus". Now today has a floor.', 'يسأل عن النسب المتكافئة ويشرحها بكلماته: «ضرب، لا جمع.» الآن صار لدرس اليوم أساس.'], [fx('omar', 2, 1)], { xp: 30, discover: 'ai-helper' }),
    out('oPairGood', 'good', ['Sara teaches the bridge', 'سارة تشرح الجسر'], ['Sara, who crossed this gap herself, explains it to Omar better than anyone could.', 'سارة، التي عبرت هذه الفجوة بنفسها، تشرحها لعمر أفضل من أي أحد.'], [fx('omar', 1, 1), fx('sara', 1, 1)], { xp: 30, discover: 'teams', setFlag: 'm4.peerVoice' }),
    out('oPairStuck', 'mixed', ['Two on the same gap', 'اثنان على الفجوة نفسها'], ['Sara is still crossing it herself. They are stuck in the same place, together.', 'سارة ما زالت تعبرها بنفسها. فيعلقان في المكان نفسه، معًا.'], [], { xp: 30, discover: 'teams', setFlag: 'm4.gap' }),
    out('oPractice', 'good', ['Three he can do', 'ثلاثة يستطيع حلّها'], ['Three right, in ink this time. Then the stretch, and he doesn\'t rub it out.', 'ثلاثة صحيحة، بالقلم هذه المرة. ثم الأصعب، ولا يمسحها.'], [fx('omar', 1, 2)], { xp: 30, discover: 'practice' }),
    out('oTold', 'mixed', ['Told, not believed', 'سمعها، ولم يصدّقها'], ['"Really?" He writes it again, small, in pencil.', '«حقًا؟» يكتبها مرة أخرى، صغيرة، بقلم الرصاص.'], [fx('omar', 0, 1)], { xp: 30 }),
    out('mAi', 'good', ['The words, unlocked', 'الكلمات، انفتحت'], ['"Respectively" means "in that order". She does the maths in a minute; it was never the maths.', '«respectively» تعني «بالترتيب نفسه». تحلّ الرياضيات في دقيقة، فالمشكلة لم تكن في الرياضيات.'], [fx('maitha', 1, 2)], { xp: 30, discover: 'ai-helper' }),
    out('mEasier', 'mixed', ['Easier words, easier maths', 'كلمات أسهل، ورياضيات أسهل'], ['She finishes, but the simpler question also had simpler maths. The English is still waiting tomorrow.', 'تنهي، لكن السؤال الأبسط كانت رياضياته أبسط أيضًا. والإنجليزية ما زالت تنتظرها غدًا.'], [fx('maitha', 0, 1)], { xp: 30, setFlag: 'm4.gap' }),
    out('mWhy', 'insight', ['Adding is multiplying, slowly', 'الجمع ضرب، لكن ببطء'], ['"Five threes is three times five." She sees her method and the fast one are the same idea.', '«خمس ثلاثات هي ثلاثة في خمسة.» ترى أن طريقتها والطريقة السريعة فكرة واحدة.'], [fx('maitha', 2, 1)], { xp: 30, discover: 'see-why' }),
    out('mShow', 'mixed', ['A new method, no reason', 'طريقة جديدة، دون سبب'], ['She copies the quick method. When it goes wrong, she has nothing to check it against.', 'تنسخ الطريقة السريعة. وحين تخطئ، لا تملك ما تتحقّق به.'], [fx('maitha', 0, -1)], { xp: 30 }),
    out('mStretch', 'good', ['Long and hard', 'طويلة وصعبة'], ['A three-step recipe problem. She reads it twice and enjoys every line.', 'مسألة وصفة من ثلاث خطوات. تقرؤها مرتين وتستمتع بكل سطر.'], [fx('maitha', 1, 2)], { xp: 30, discover: 'assign' }),
    out('mPeer', 'good', ['A checker for Sara', 'مدقّقة لسارة'], ['Maitha checks; Sara explains. Both answers get better.', 'ميثاء تتحقّق، وسارة تشرح. وتتحسّن الإجابتان.'], [fx('maitha', 0, 1), fx('sara', 1, 0)], { xp: 30, discover: 'teams', setFlag: 'm4.peerVoice' }),
    out('lCheck', 'insight', ['Three questions, three different gaps', 'ثلاثة أسئلة، وثلاث فجوات مختلفة'], ['The warm-up shows you exactly which step each student is missing before the new topic starts.', 'يُريكِ التمهيد بالضبط الخطوة الناقصة لدى كل طالب قبل أن يبدأ الموضوع الجديد.'], [], { setFlag: 'm4.checked' }),
    out('lSkip', 'mixed', ['Straight in', 'دخول مباشر'], ['The lesson starts on time. You will find the gaps when the students hit them.', 'يبدأ الدرس في موعده. وستجدين الفجوات حين يصطدم بها الطلاب.'], [], { setFlag: 'm4.gap' }),
    out('bBridge', 'good', ['From yesterday to today', 'من الأمس إلى اليوم'], ['"Yesterday: 2:3 = 6:9. Today: 2:3 = 6:?" The learning intention grows out of yesterday\'s answer.', '«الأمس: ٢:٣ = ٦:٩. اليوم: ٢:٣ = ٦:؟» ينبع هدف التعلّم من إجابة الأمس.'], [fx('sara', 0, 1), fx('omar', 0, 1)], { discover: 'present-mode' }),
    out('bWipe', 'mixed', ['A clean board', 'سبورة نظيفة'], ['Today looks new. For Sara, it is.', 'يبدو درس اليوم جديدًا. وبالنسبة إلى سارة، هو كذلك فعلًا.'], []),
    out('shChart', 'insight', ['A times-table chart, with jokes', 'جدول ضرب، مع نكات'], ['"7 × 8 = 56: five, six, seven, eight!" A chart a student made years ago. It goes in your notebook.', '«٧ × ٨ = ٥٦: خمسة، ستة، سبعة، ثمانية!» جدول صنعه طالب قبل سنوات. يُحفظ في دفتركِ.'], [], { setFlag: 'm4.chart' }),
    out('psShare', 'good', ['"Same as yesterday, with a question mark"', '«مثل الأمس، مع علامة استفهام»'], ['Sara says it to the class. For three other students, her sentence is the bridge.', 'تقولها سارة للصف. وجملتها هي الجسر لثلاثة طلاب آخرين.'], [fx('sara', 1, 2)], { setFlag: 'm4.peerVoice' }),
    out('psOn', 'good', ['Her own discovery', 'اكتشافها الخاص'], ['She keeps going, faster now.', 'تتابع، أسرع الآن.'], [fx('sara', 1, 0)]),
    out('peCompare', 'good', ['Two methods, one idea', 'طريقتان، وفكرة واحدة'], ['Adding threes and multiplying by three: side by side, Omar sees why multiplying is faster.', 'جمع الثلاثات والضرب في ثلاثة جنبًا إلى جنب، ويرى عمر لماذا الضرب أسرع.'], [fx('omar', 1, 1), fx('maitha', 1, 0)], { discover: 'teams', setFlag: 'm4.peerVoice' }),
    out('peFast', 'mixed', ['Faster, and lost', 'أسرع، وتائه'], ['The faster way is right, and Omar loses the thread he had a minute ago.', 'الطريقة الأسرع صحيحة، لكن عمر يفقد الخيط الذي أمسكه قبل دقيقة.'], [fx('omar', 0, -1)]),
    out('pcWhy', 'insight', ['The reason under the rule', 'السبب تحت القاعدة'], ['"It\'s the same multiplier, written diagonally." The shortcut makes sense now, so they can trust it.', '«إنه المضاعف نفسه، مكتوبًا قطريًا.» صار للاختصار معنى، فيمكنهم أن يثقوا به.'], [fx('omar', 1, 0)], { discover: 'see-why' }),
    out('pcRule', 'mixed', ['A rule with no floor', 'قاعدة بلا أساس'], ['Half the class switches to it. When a question is set out differently, they freeze.', 'ينتقل نصف الصف إليها. وحين يأتي السؤال بشكل مختلف، يتجمّدون.'], [], { setFlag: 'm4.gap' }),
    out('plPaper', 'good', ['Paper warm-up', 'تمهيد ورقي'], ['Same three questions, on paper. Nobody misses the check.', 'الأسئلة الثلاثة نفسها على الورق. ولا يفوت التحقّق أحدًا.'], []),
    out('plShare', 'good', ['A shared screen', 'شاشة مشتركة'], ['They do the warm-up together. You can\'t tell whose answer is whose.', 'يحلّان التمهيد معًا. ولا يمكنكِ أن تعرفي أي إجابة لمن.'], []),
  ],
  endings: [
    {
      id: 'gap-smaller', title: T(['The Gap Is Smaller', 'الفجوة صارت أصغر']), priority: 1, when: { flags: ['m4.gap'] }, opens: ['m6'],
      narration: T(['Not every gap closed today, and you know exactly which ones are left. That knowledge is the next lesson\'s plan.', 'لم تُسدّ كل الفجوات اليوم، لكنكِ تعرفين بالضبط ما بقي منها. وهذه المعرفة هي خطة الدرس القادم.']),
    },
    {
      id: 'bridge-shared', title: T(['A Bridge, Shared', 'جسر مشترك']), priority: 2, when: { flags: ['m4.peerVoice'] }, opens: ['m7'],
      narration: T(['A student who crossed a gap helped someone else across it.', 'طالب عبر الفجوة ساعد غيره على عبورها.']),
    },
    {
      id: 'bridge-built', title: T(['The Bridge Is Built', 'الجسر اكتمل']), priority: 3, when: { notFlags: ['m4.gap'] }, badge: 'bridge-builder', opens: ['m6', 'm7'],
      narration: T(['Each missing step was found and met with the right support. Today\'s lesson stands on solid ground.', 'وُجدت كل خطوة ناقصة وقوبلت بالدعم المناسب. ودرس اليوم يقف على أرض صلبة.']),
    },
  ],
  badges: [
    { id: 'bridge-builder', title: T(['Bridge Builder', 'بانية الجسور']), why: T(['You found a missing step and matched the support to it.', 'وجدتِ خطوة ناقصة واخترتِ لها الدعم المناسب.']), icon: '⌒', when: { flag: 'm4.closed' } },
    { id: 'missing-piece', title: T(['The Missing Piece', 'القطعة الناقصة']), why: T(['You checked readiness before the new topic began.', 'تحقّقتِ من الاستعداد قبل أن يبدأ الموضوع الجديد.']), icon: '◧', when: { flag: 'm4.checked' } },
    { id: 'm4-gap-finder', title: T(['Gap Finder', 'كاشفة الفجوات']), why: T(['You looked for the exact step, not just "struggling".', 'بحثتِ عن الخطوة بالضبط، لا عن «متعثّر» فحسب.']), icon: '◌', when: 'always' },
  ],
  communityTopic: T(['Closing gaps before the new topic', 'سدّ الفجوات قبل الموضوع الجديد']),
  communityExamples: [
    { who: T(['Math teacher · Ras Al Khaimah', 'معلمة رياضيات · رأس الخيمة']), text: T(['Three warm-up questions, one for each step the new topic needs. I know who to sit with before I start.', 'ثلاثة أسئلة تمهيدية، لكل خطوة يحتاجها الموضوع الجديد سؤال. أعرف مع من أجلس قبل أن أبدأ.']) },
    { who: T(['Grade 7 teacher · Al Ain', 'معلم الصف السابع · العين']), text: T(['Half my "ratio problems" were times-table problems. Different gap, different fix.', 'نصف «مشكلات النسب» عندي كانت مشكلات في جدول الضرب. فجوة مختلفة، وحل مختلف.']) },
  ],
  teaser: [
    { ifFlag: 'm4.gap', text: T(['Some gaps are still open. Next: what the evidence at the end of the lesson tells you.', 'ما زالت بعض الفجوات مفتوحة. والقادم: ما تخبركِ به الأدلة في نهاية الدرس.']) },
    { ifFlag: 'm4.peerVoice', text: T(['Sara helped someone across today. Next: getting the whole class ready for the test.', 'ساعدت سارة غيرها على العبور اليوم. والقادم: إعداد الصف كله للاختبار.']) },
    { text: T(['The bridge is built. Next: see who walks across it at the end of the lesson.', 'اكتمل الجسر. والقادم: من يعبره في نهاية الدرس.']) },
  ],
};
