/**
 * Mission 07 — Ready for the Test. Grade 7 · Math (end of the ratios unit,
 * test next week). Opened by endings of M02–M06; the term's last mission.
 * Show My Learning (what students can do), Exam Prep Assessment (where the
 * class stands before the test), Pathways (a route per student).
 * Callbacks: Sara (m4.closed), Omar (m5.allVoices), Ahmed (m2.stretch).
 * Branch map: docs/content/TEACHER_CONTENT.md#m07
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M7: Adventure = {
  id: 'm7',
  number: 7,
  title: t('Ready for the Test', 'مستعدون للاختبار'),
  meta: t('Mission 07 · Grade 7 · Math', 'المهمة ٠٧ · الصف السابع · الرياضيات'),
  location: 'grade7',
  scene: 'teacher/scenes/m07.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'Before a test, one revision for everyone fits nobody: let students show what they can do, find where each one stands, and give each a route.',
    'قبل الاختبار، مراجعة واحدة للجميع لا تناسب أحدًا: دع الطلاب يُظهرون ما يستطيعونه، واعرف أين يقف كل واحد، وامنح كل واحد طريقه.',
  ),
  film: [
    { picture: 'teacher/film/m07-1.jpg', narration: T(['The end of the unit. The test is next week.', 'نهاية الوحدة. والاختبار الأسبوع القادم.']) },
    { picture: 'teacher/film/m07-2.jpg', who: 'ahmed', line: T(['Miss, what will be on the test?', 'أستاذة، ماذا سيأتي في الاختبار؟']) },
    { picture: 'teacher/film/m07-2.jpg', who: 'sara', line: T(['I\'m scared I\'ll forget everything.', 'أخاف أن أنسى كل شيء.']) },
    { picture: 'teacher/film/m07-2.jpg', who: 'omar', line: T(['I know it. I just can\'t do it in tests.', 'أعرفه. لكنني لا أستطيع في الاختبارات.']) },
    { picture: 'teacher/film/m07-3.jpg', narration: T(['One week. Twenty-four students. Twenty-four different starting points.', 'أسبوع واحد. أربعة وعشرون طالبًا. وأربع وعشرون نقطة انطلاق مختلفة.']) },
  ],
  intro: [T(['MISSION 07 | Ready for the Test', 'المهمة ٠٧ | مستعدون للاختبار']), T(['A route for every student.', 'طريق لكل طالب.'])],
  introBubbles: [
    { student: 'sara', line: T(['I\'m scared…', 'أنا خائفة…']) },
    { student: 'omar', line: T(['Not in tests.', 'ليس في الاختبارات.']) },
  ],
  students: [
    {
      id: 'ahmed', name: T(['Ahmed', 'أحمد']), x: 62, y: 50, understanding: 2, engagement: 2,
      idle: T(['Ahmed is flicking through the whole unit at speed.', 'أحمد يقلّب الوحدة كلها بسرعة.']),
      homeNote: T(['His older brother is in Grade 9 and often shows him next year\'s maths at home.', 'أخوه الأكبر في الصف التاسع، وكثيرًا ما يريه رياضيات السنوات القادمة في البيت.']),
    },
    {
      id: 'sara', name: T(['Sara', 'سارة']), x: 34, y: 58, understanding: 2, engagement: 1,
      idle: T(['Sara has made a list of everything she might forget.', 'كتبت سارة قائمة بكل ما قد تنساه.']),
      homeNote: T(['She looks after her younger brothers after school most days, so homework is done late.', 'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.']),
    },
    {
      id: 'omar', name: T(['Omar', 'عمر']), x: 18, y: 44, understanding: 2, engagement: 1,
      idle: T(['Omar is drawing ratio tables in the margin, then hiding them.', 'عمر يرسم جداول نسب على الهامش، ثم يخفيها.']),
      homeNote: T(['His dad works night shifts, so mornings at home are rushed.', 'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.']),
    },
  ],
  objects: [
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '☰', x: 82, y: 64, idle: T(['Yesterday\'s Exam Prep Assessment results are in.', 'وصلت نتائج تقييم الاستعداد للاختبار من الأمس.']) },
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['"Test: next Tuesday."', '«الاختبار: الثلاثاء القادم.»']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A box labelled "Week 1" sits on the top shelf.', 'صندوق مكتوب عليه «الأسبوع ١» على الرف العلوي.']) },
  ],
  schedule: ['laptop', 'ahmed', 'sara', 'omar', 'board', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['Exam Prep Assessment results', 'نتائج تقييم الاستعداد للاختبار']),
      ask: T(['Where does the class stand, one week out?', 'أين يقف الصف، قبل أسبوع من الاختبار؟']),
      investigate: {
        clues: [
          clue('topics', ['By topic', 'حسب الموضوع'], ['Which topics are strong, which are not?', 'أي المواضيع قوية، وأيها لا؟']),
          clue('types', ['By question type', 'حسب نوع السؤال'], ['Short answers or word problems?', 'إجابات قصيرة أم مسائل كلامية؟']),
          clue('students', ['By student', 'حسب الطالب'], ['Do the gaps belong to the same students?', 'هل الفجوات لدى الطلاب أنفسهم؟']),
        ],
        profiles: [
          profile('topic', 40, 'm7.class:topic', {
            topics: ['Ratios strong. Percentages weak for most of the class.', 'النسب قوية. والنسب المئوية ضعيفة لدى معظم الصف.'],
            types: ['Both types weak, but only on percentages.', 'النوعان ضعيفان، لكن في النسب المئوية فقط.'],
            students: ['The same topic, across almost everyone.', 'الموضوع نفسه، لدى الجميع تقريبًا.'],
          }),
          profile('varied', 35, 'm7.class:varied', {
            topics: ['No single weak topic.', 'لا يوجد موضوع واحد ضعيف.'],
            types: ['Mixed.', 'مختلطة.'],
            students: ['Each student\'s gap is different: some percentages, some rates, some word problems.', 'فجوة كل طالب مختلفة: بعضهم في النسب المئوية، وبعضهم في المعدّلات، وبعضهم في المسائل الكلامية.'],
          }),
          profile('ready', 25, 'm7.class:ready', {
            topics: ['Strong across the unit.', 'قوية في الوحدة كلها.'],
            types: ['Word problems a little slower.', 'المسائل الكلامية أبطأ قليلًا.'],
            students: ['A handful of students with one small gap each.', 'عدد قليل من الطلاب، ولكل منهم فجوة صغيرة واحدة.'],
          }),
        ],
      },
      choices: [
        ch(['Revise percentages only, well', 'راجعي النسب المئوية فقط، بعمق'], ['Plan from evidence', 'التخطيط بالأدلة'], 'lTopic', { ifFlag: 'm7.class:topic' }),
        ch(['Revise the whole unit', 'راجعي الوحدة كلها'], ['Revise all', 'مراجعة شاملة'], 'lAll', { ifFlag: 'm7.class:topic', minutes: 0 }),
        ch(['Routes by need', 'مسارات حسب الحاجة'], ['Pathways', 'المسارات'], 'lRoutes', { ifFlag: 'm7.class:varied' }),
        ch(['One revision lesson for all', 'درس مراجعة واحد للجميع'], ['Revise all', 'مراجعة شاملة'], 'lOne', { ifFlag: 'm7.class:varied', minutes: 0 }),
        ch(['A short mock, then rest', 'اختبار تجريبي قصير، ثم راحة'], ['Exam Prep Assessment', 'تقييم الاستعداد للاختبار'], 'lMock', { ifFlag: 'm7.class:ready' }),
        ch(['More practice papers, to be safe', 'أوراق تدريب إضافية، احتياطًا'], ['More papers', 'أوراق إضافية'], 'lPapers', { ifFlag: 'm7.class:ready', minutes: 0 }),
      ],
    },
    {
      id: 'ahmed', kind: 'early-finisher', on: 'ahmed',
      line: T(['"Miss, what will be on the test?"', '«أستاذة، ماذا سيأتي في الاختبار؟»']),
      ask: T(['What does he actually need this week?', 'ماذا يحتاج فعلًا هذا الأسبوع؟']),
      investigate: {
        clues: [
          clue('sml', ['What he showed', 'ما أظهره'], ['His Show My Learning piece.', 'عمله في «أظهر تعلّمي».']),
          clue('prep', ['Prep result', 'نتيجة الاستعداد'], ['His Exam Prep Assessment.', 'تقييم استعداده للاختبار.']),
          clue('says', ['What he says', 'ما يقوله'], ['"How are you feeling about it?"', '«كيف تشعر حيال الاختبار؟»']),
        ],
        profiles: [
          profile('ready', 40, 'm7.ahmed:ready', {
            sml: ['A short video explaining unit rates with juice boxes. Excellent.', 'مقطع قصير يشرح فيه معدّل الوحدة بعلب العصير. ممتاز.'],
            prep: ['Strong everywhere.', 'قوي في كل شيء.'],
            says: ['"I\'m fine. I just don\'t want to be bored all week."', '«أنا بخير. لكنني لا أريد أن أشعر بالملل طوال الأسبوع.»'],
          }),
          profile('gap', 30, 'm7.ahmed:gap', {
            sml: ['Brilliant on ratios. Nothing on percentages.', 'ممتاز في النسب، ولا شيء عن النسب المئوية.'],
            prep: ['Ratios full marks; percentages half.', 'النسب: الدرجة الكاملة. النسب المئوية: النصف.'],
            says: ['"Percentages are the boring bit."', '«النسب المئوية هي الجزء الممل.»'],
          }),
          profile('anxious', 30, 'm7.ahmed:anxious', {
            sml: ['Careful, correct, and three pages long.', 'دقيق وصحيح، وطوله ثلاث صفحات.'],
            prep: ['Strong, but he rated every question "not sure".', 'قوي، لكنه قيّم كل سؤال بـ«غير متأكد».'],
            says: ['"My dad says I have to get full marks."', '«أبي يقول يجب أن أحصل على الدرجة الكاملة.»'],
          }),
        ],
      },
      choices: [
        ch(['A stretch route for the week', 'مسار إثرائي لهذا الأسبوع'], ['Pathways', 'المسارات'], [{ ifFlag: 'm2.stretch', outcome: 'aRouteKnown' }, { outcome: 'aRoute' }], { ifFlag: 'm7.ahmed:ready' }),
        ch(['Revise with the class', 'راجع مع الصف'], ['Revise all', 'مراجعة شاملة'], 'aRevise', { ifFlag: 'm7.ahmed:ready', minutes: 0 }),
        ch(['A percentages route, then stretch', 'مسار النسب المئوية، ثم إثراء'], ['Pathways', 'المسارات'], 'aTarget', { ifFlag: 'm7.ahmed:gap' }),
        ch(['Another full prep assessment', 'تقييم استعداد كامل آخر'], ['Exam Prep Assessment', 'تقييم الاستعداد للاختبار'], 'aAgain', { ifFlag: 'm7.ahmed:gap', minutes: 0 }),
        ch(['Show him what he can already do', 'أريه ما يستطيعه بالفعل'], ['Show My Learning', 'أظهر تعلّمي'], 'aShow', { ifFlag: 'm7.ahmed:anxious' }),
        ch(['More practice papers', 'أوراق تدريب إضافية'], ['More papers', 'أوراق إضافية'], 'aPapers', { ifFlag: 'm7.ahmed:anxious', minutes: 0 }),
      ],
    },
    {
      id: 'sara', kind: 'needs-help', on: 'sara',
      line: T(['"I\'m scared I\'ll forget everything."', '«أخاف أن أنسى كل شيء.»']),
      ask: T(['Is it fear, a real gap, or both?', 'هل هو خوف، أم فجوة حقيقية، أم الاثنان؟']),
      investigate: {
        clues: [
          clue('sml', ['What she showed', 'ما أظهرته'], ['Her Show My Learning piece.', 'عملها في «أظهر تعلّمي».']),
          clue('prep', ['Prep result', 'نتيجة الاستعداد'], ['Her Exam Prep Assessment.', 'تقييم استعدادها للاختبار.']),
          clue('list', ['Her list', 'قائمتها'], ['The list of things she might forget.', 'قائمة الأشياء التي قد تنساها.']),
        ],
        profiles: [
          profile('grown', 40, 'm7.sara:grown', {
            sml: ['A ratio table, perfect, with "same multiplier!" written in the corner.', 'جدول نسب مثالي، وفي زاويته «المضاعف نفسه!»'],
            prep: ['Solid across the unit.', 'متين في الوحدة كلها.'],
            list: ['Twelve items. She can do all twelve.', 'اثنا عشر بندًا، وتستطيع حلّها كلها.'],
          }),
          profile('gap', 30, 'm7.sara:gap', {
            sml: ['Ratios good; she left out the percentages part.', 'النسب جيدة، لكنها تركت جزء النسب المئوية.'],
            prep: ['Percentages: two of six.', 'النسب المئوية: ٢ من ٦.'],
            list: ['"Percentages" is underlined three times.', '«النسب المئوية» تحتها ثلاثة خطوط.'],
          }),
          profile('fear', 30, 'm7.sara:fear', {
            sml: ['Good work, clearly explained.', 'عمل جيد، وشرح واضح.'],
            prep: ['Good, but she left the last page blank: "I panicked."', 'جيد، لكنها تركت الصفحة الأخيرة فارغة: «ارتبكت.»'],
            list: ['Everything is on the list, even things she does every day.', 'كل شيء في القائمة، حتى ما تفعله كل يوم.'],
          }),
        ],
      },
      choices: [
        ch(['Show her how far she has come', 'أريها كم تقدّمت'], ['Show My Learning', 'أظهر تعلّمي'], [{ ifFlag: 'm4.closed', outcome: 'sJourney' }, { outcome: 'sShown' }], { ifFlag: 'm7.sara:grown' }),
        ch(['"You\'ll be fine."', '«ستكونين بخير.»'], ['Reassure', 'طمأنة'], 'sFine', { ifFlag: 'm7.sara:grown', minutes: 0 }),
        ch(['A percentages route this week', 'مسار للنسب المئوية هذا الأسبوع'], ['Pathways', 'المسارات'], 'sRoute', { ifFlag: 'm7.sara:gap' }),
        ch(['Revise everything with the class', 'راجعي كل شيء مع الصف'], ['Revise all', 'مراجعة شاملة'], 'sAll', { ifFlag: 'm7.sara:gap', minutes: 0 }),
        ch(['A short, low-stakes practice test', 'اختبار تجريبي قصير بلا ضغط'], ['Exam Prep Assessment', 'تقييم الاستعداد للاختبار'], 'sLowStakes', { ifFlag: 'm7.sara:fear' }),
        ch(['"Don\'t worry about it."', '«لا تقلقي.»'], ['Reassure', 'طمأنة'], 'sDont', { ifFlag: 'm7.sara:fear', minutes: 0 }),
      ],
    },
    {
      id: 'omar', kind: 'low-participation', on: 'omar',
      line: T(['"I know it. I just can\'t do it in tests."', '«أعرفه. لكنني لا أستطيع في الاختبارات.»']),
      ask: T(['Is that true? What does the evidence say?', 'هل هذا صحيح؟ ماذا تقول الأدلة؟']),
      investigate: {
        clues: [
          clue('sml', ['What he showed', 'ما أظهره'], ['His Show My Learning piece.', 'عمله في «أظهر تعلّمي».']),
          clue('prep', ['Prep result', 'نتيجة الاستعداد'], ['His Exam Prep Assessment.', 'تقييم استعداده للاختبار.']),
          clue('margin', ['His margin', 'الهامش'], ['The tables he keeps hiding.', 'الجداول التي يخفيها.']),
        ],
        profiles: [
          profile('knows', 40, 'm7.omar:knows', {
            sml: ['A drawn comic: two shops, one better deal, every step right.', 'قصة مصوّرة: محلّان، وعرض أوفر، وكل الخطوات صحيحة.'],
            prep: ['Half marks, mostly blank answers near the end.', 'نصف الدرجة، ومعظم الإجابات الفارغة في النهاية.'],
            margin: ['Correct ratio tables for the questions he left blank.', 'جداول نسب صحيحة للأسئلة التي تركها فارغة.'],
          }),
          profile('behind', 30, 'm7.omar:behind', {
            sml: ['Started, then stopped at percentages.', 'بدأ، ثم توقّف عند النسب المئوية.'],
            prep: ['Rates fine; percentages and proportions weak.', 'المعدّلات جيدة، والنسب المئوية والتناسب ضعيفة.'],
            margin: ['Half-finished tables, with question marks.', 'جداول نصف مكتملة، مع علامات استفهام.'],
          }),
          profile('reading', 30, 'm7.omar:reading', {
            sml: ['Strong when he explains out loud.', 'قوي حين يشرح بصوت مسموع.'],
            prep: ['Short questions right; long word problems wrong.', 'الأسئلة القصيرة صحيحة، والمسائل الكلامية الطويلة خاطئة.'],
            margin: ['The numbers from each word problem, circled.', 'أعداد كل مسألة كلامية، محاطة بدائرة.'],
          }),
        ],
      },
      choices: [
        ch(['Put his comic next to his test answers', 'ضعي قصته المصوّرة بجانب إجاباته في الاختبار'], ['Show My Learning', 'أظهر تعلّمي'], [{ ifFlag: 'm5.allVoices', outcome: 'oVoice' }, { outcome: 'oComic' }], { ifFlag: 'm7.omar:knows' }),
        ch(['"Just try harder in the test"', '«حاول أكثر في الاختبار فقط»'], ['Push', 'دفع'], 'oHarder', { ifFlag: 'm7.omar:knows', minutes: 0 }),
        ch(['A catch-up route: percentages, then proportions', 'مسار تعويض: النسب المئوية، ثم التناسب'], ['Pathways', 'المسارات'], 'oRoute', { ifFlag: 'm7.omar:behind' }),
        ch(['Same revision as everyone', 'المراجعة نفسها مثل الجميع'], ['Revise all', 'مراجعة شاملة'], 'oSame', { ifFlag: 'm7.omar:behind', minutes: 0 }),
        ch(['Word-problem practice: find the numbers, then the question', 'تدريب على المسائل الكلامية: الأعداد أولًا، ثم السؤال'], ['Practice', 'التدريب'], 'oWords', { ifFlag: 'm7.omar:reading' }),
        ch(['Skip the long ones in the test', 'تجاوز الطويلة في الاختبار'], ['Test tactic', 'حيلة اختبار'], 'oSkip', { ifFlag: 'm7.omar:reading', minutes: 0 }),
      ],
    },
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['This week\'s revision plan', 'خطة المراجعة لهذا الأسبوع']),
      ask: T(['One plan for all, or a route for each?', 'خطة واحدة للجميع، أم طريق لكل واحد؟']),
      choices: [
        ch(['Students choose their route from their evidence', 'الطلاب يختارون طريقهم من أدلّتهم'], ['Pathways', 'المسارات'], 'bChoose'),
        ch(['The same revision for everyone', 'المراجعة نفسها للجميع'], ['Revise all', 'مراجعة شاملة'], 'bSame', { minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['A box labelled "Week 1".', 'صندوق مكتوب عليه «الأسبوع ١».']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Open it', 'افتحيه'], ['Hidden discovery', 'اكتشاف مخفي'], 'shWeek1', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pTeach', kind: 'new-event', on: 'ahmed', category: 'learning', weight: 35, eligible: { notFlags: ['m7.ahmed:gap'] },
      line: T(['Ahmed: "Can I make a revision video for the class?"', 'أحمد: «هل أصنع مقطع مراجعة للصف؟»']),
      ask: T(['A ready learner offering to help everyone.', 'طالب مستعد يعرض مساعدة الجميع.']),
      choices: [
        ch(['Yes: one topic, checked by you first', 'نعم: موضوع واحد، تراجعينه أولًا'], ['Show My Learning', 'أظهر تعلّمي'], 'ptYes'),
        ch(['"Focus on your own revision."', '«ركّز على مراجعتك.»'], ['Own work', 'عمله الخاص'], 'ptNo', { minutes: 0 }),
      ],
    },
    {
      id: 'pStudy', kind: 'new-event', on: 'sara', category: 'collaboration', weight: 25,
      line: T(['Sara and Omar want to revise together.', 'سارة وعمر يريدان أن يراجعا معًا.']),
      ask: T(['Two students, different gaps.', 'طالبان، وفجوتان مختلفتان.']),
      choices: [
        ch(['Together, each teaching the other their strong topic', 'معًا، وكل منهما يشرح للآخر موضوعه القوي'], ['Teams', 'الفرق'], 'psTeach'),
        ch(['Separately, on their own routes', 'منفصلين، كلٌّ في مساره'], ['Pathways', 'المسارات'], 'psApart'),
      ],
    },
    {
      id: 'pSkip', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20,
      line: T(['A voice: "Tests are about speed. Skip the hard ones."', 'صوت: «الاختبارات سرعة. تجاوزوا الصعبة.»']),
      ask: T(['Half the class is writing it down as a tip.', 'نصف الصف يكتبها كنصيحة.']),
      choices: [
        ch(['"What if the hard one is worth the most?"', '«وماذا لو كانت الصعبة أعلى درجة؟»'], ['See Why', 'اعرف السبب'], 'pkWhy'),
        ch(['Let it go; it\'s just a tip', 'تجاوزيها، إنها مجرد نصيحة'], ['Let it go', 'تجاوز'], 'pkGo', { minutes: 0 }),
      ],
    },
    {
      id: 'pUpdate', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['Half the tablets need an update before today\'s practice.', 'نصف الأجهزة تحتاج إلى تحديث قبل تدريب اليوم.']),
      ask: T(['Ten minutes of updates, or another plan?', 'عشر دقائق من التحديثات، أم خطة أخرى؟']),
      choices: [
        ch(['Paper today, tablets tomorrow', 'الورق اليوم، والأجهزة غدًا'], ['Paper', 'ورق'], 'puPaper'),
        ch(['Pairs on the updated tablets', 'ثنائيات على الأجهزة المحدّثة'], ['Pairs', 'ثنائيات'], 'puPairs'),
      ],
    },
  ],
  outcomes: [
    out('lTopic', 'good', ['One topic, done well', 'موضوع واحد، بإتقان'], ['The week goes on percentages, the one gap the whole class shares. Ratios get one warm-up a day.', 'يُخصَّص الأسبوع للنسب المئوية، الفجوة الوحيدة المشتركة بين الصف كله. وللنسب تمهيد واحد يوميًا.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'm7.plan' }),
    out('lAll', 'mixed', ['Everything, a little', 'كل شيء، قليلًا'], ['Each topic gets a day. Percentages get the same day as ratios.', 'لكل موضوع يوم. والنسب المئوية تأخذ اليوم نفسه الذي تأخذه النسب.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'm7.gap' }),
    out('lRoutes', 'good', ['Routes by need', 'مسارات حسب الحاجة'], ['Three routes: percentages, rates, word problems. Each student starts on theirs tomorrow.', 'ثلاثة مسارات: النسب المئوية، والمعدّلات، والمسائل الكلامية. ويبدأ كل طالب مساره غدًا.'], [], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('lOne', 'mixed', ['One lesson, many gaps', 'درس واحد، وفجوات كثيرة'], ['A good revision lesson. Each student gets about a fifth of what they needed.', 'درس مراجعة جيد. ويحصل كل طالب على نحو خُمس ما يحتاجه.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'm7.gap' }),
    out('lMock', 'good', ['A short mock, then rest', 'اختبار تجريبي قصير، ثم راحة'], ['Twenty minutes, a check, a quick fix for the handful. The class goes into the weekend calm.', 'عشرون دقيقة، وتحقّق، وتصحيح سريع للقلّة. ويدخل الصف عطلة نهاية الأسبوع بهدوء.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'm7.plan' }),
    out('lPapers', 'mixed', ['Papers, papers', 'أوراق، أوراق'], ['A ready class does three more papers. Nobody learns anything new.', 'صف مستعد يحلّ ثلاث أوراق إضافية. ولا يتعلّم أحد شيئًا جديدًا.'], [], { xp: 30, discover: 'exam-prep' }),
    out('aRouteKnown', 'good', ['Beyond the expected, again', 'أبعد من المتوقّع، مرة أخرى'], ['He remembers the sale problem. His route ends with designing one for next year\'s class.', 'يتذكّر مسألة التخفيضات. ومساره ينتهي بتصميم واحدة لصف العام القادم.'], [fx('ahmed', 1, 2)], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('aRoute', 'good', ['A stretch route', 'مسار إثرائي'], ['Five steps, each harder than the last. He won\'t be bored this week.', 'خمس خطوات، كل واحدة أصعب من سابقتها. لن يشعر بالملل هذا الأسبوع.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('aRevise', 'mixed', ['A week of things he knows', 'أسبوع لما يعرفه'], ['He revises with the class, quickly, and spends the rest drawing.', 'يراجع مع الصف بسرعة، ويقضي بقية الوقت في الرسم.'], [fx('ahmed', 0, -1)], { xp: 30 }),
    out('aTarget', 'good', ['The boring bit first', 'الجزء الممل أولًا'], ['A short percentages route, then stretch. "Fine. But then the hard ones."', 'مسار قصير للنسب المئوية، ثم الإثراء. «حسنًا. لكن بعدها الصعبة.»'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('aAgain', 'mixed', ['The same result, again', 'النتيجة نفسها، مرة أخرى'], ['Another full assessment shows the same half on percentages.', 'تقييم كامل آخر يُظهر النصف نفسه في النسب المئوية.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'm7.gap' }),
    out('aShow', 'insight', ['"Look what you can do"', '«انظر ما تستطيعه»'], ['You lay his Show My Learning piece next to the test topics: he can do every one. His shoulders drop.', 'تضعين عمله في «أظهر تعلّمي» بجانب مواضيع الاختبار: يستطيع حلّها كلها. وترتاح كتفاه.'], [fx('ahmed', 0, 2)], { xp: 30, discover: 'show-my-learning', setFlag: 'm7.plan' }),
    out('aPapers', 'mixed', ['More papers, more worry', 'أوراق أكثر، وقلق أكثر'], ['He does all of them perfectly, and worries more with each one.', 'يحلّها كلها بإتقان، ويزداد قلقه مع كل ورقة.'], [fx('ahmed', 0, -1)], { xp: 30 }),
    out('sJourney', 'good', ['From a missing piece to this', 'من قطعة ناقصة إلى هذا'], ['Her first ratio page beside today\'s: the gap you bridged together is gone. "I really did that?"', 'صفحة النسب الأولى بجانب صفحة اليوم: الفجوة التي سددتماها معًا اختفت. «أنا فعلت هذا حقًا؟»'], [fx('sara', 1, 2)], { xp: 30, discover: 'show-my-learning', setFlag: 'm7.plan' }),
    out('sShown', 'good', ['Twelve of twelve', 'اثنا عشر من اثني عشر'], ['You go through her list with her Show My Learning piece: she can do every item. She crosses the list out.', 'تراجعين قائمتها مع عملها في «أظهر تعلّمي»: تستطيع كل بند. وتشطب القائمة.'], [fx('sara', 0, 2)], { xp: 30, discover: 'show-my-learning' }),
    out('sFine', 'mixed', ['Reassured, not convinced', 'مطمئنة، لكن غير مقتنعة'], ['She nods and adds two more items to her list.', 'تومئ، وتضيف بندين إلى قائمتها.'], [], { xp: 30 }),
    out('sRoute', 'good', ['A route for the real gap', 'مسار للفجوة الحقيقية'], ['Percentages, in four short steps. The list gets one item shorter each day.', 'النسب المئوية في أربع خطوات قصيرة. والقائمة تقصر بندًا كل يوم.'], [fx('sara', 1, 1)], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('sAll', 'mixed', ['A little of everything', 'قليل من كل شيء'], ['She revises what she already knows. Percentages get one lesson.', 'تراجع ما تعرفه أصلًا. والنسب المئوية تأخذ درسًا واحدًا.'], [], { xp: 30, setFlag: 'm7.gap' }),
    out('sLowStakes', 'good', ['A test that doesn\'t count', 'اختبار لا يُحتسب'], ['Ten questions, no marks recorded. She finishes the last page this time.', 'عشرة أسئلة، دون تسجيل درجات. وهذه المرة تُنهي الصفحة الأخيرة.'], [fx('sara', 1, 2)], { xp: 30, discover: 'exam-prep' }),
    out('sDont', 'mixed', ['"Don\'t worry"', '«لا تقلقي»'], ['She worries anyway.', 'تقلق على أي حال.'], [], { xp: 30 }),
    out('oVoice', 'good', ['He explains it out loud', 'يشرحها بصوت مسموع'], ['Like in the food-chain review, he says it before he writes it. Comic beside test: he knew it all. "So I just write what I say?"', 'كما في مراجعة السلاسل الغذائية، يقولها قبل أن يكتبها. القصة المصوّرة بجانب الاختبار: كان يعرف كل شيء. «إذن أكتب فقط ما أقوله؟»'], [fx('omar', 1, 2)], { xp: 30, discover: 'show-my-learning', setFlag: 'm7.plan' }),
    out('oComic', 'good', ['He did know it', 'كان يعرفها فعلًا'], ['His comic beside his blank answers: the maths was there. The test format wasn\'t. Now you both know what to practise.', 'قصته المصوّرة بجانب إجاباته الفارغة: الرياضيات كانت موجودة، وشكل الاختبار هو ما غاب. الآن تعرفان ما يجب التدرّب عليه.'], [fx('omar', 1, 1)], { xp: 30, discover: 'show-my-learning', setFlag: 'm7.plan' }),
    out('oHarder', 'mixed', ['Trying harder at the wrong thing', 'جهد أكبر في الشيء الخطأ'], ['He nods. He will try harder, at the same thing that stopped him.', 'يومئ. سيحاول أكثر، في الشيء نفسه الذي أوقفه.'], [fx('omar', 0, -1)], { xp: 30, setFlag: 'm7.gap' }),
    out('oRoute', 'good', ['A catch-up route', 'مسار تعويض'], ['Percentages first, then proportions, at his pace. Day one: done.', 'النسب المئوية أولًا، ثم التناسب، بالسرعة التي تناسبه. اليوم الأول: أُنجز.'], [fx('omar', 1, 1)], { xp: 30, discover: 'pathways', setFlag: 'm7.plan' }),
    out('oSame', 'mixed', ['Behind, at everyone\'s pace', 'متأخر، بسرعة الجميع'], ['The class revision moves on before he catches up.', 'تمضي مراجعة الصف قبل أن يلحق.'], [], { xp: 30, setFlag: 'm7.gap' }),
    out('oWords', 'good', ['Numbers, then the question', 'الأعداد، ثم السؤال'], ['Circle the numbers, underline the question, then solve. The long ones stop being long.', 'ضع دائرة حول الأعداد، وخطًا تحت السؤال، ثم حلّ. لم تعد المسائل الطويلة طويلة.'], [fx('omar', 1, 1)], { xp: 30, discover: 'practice' }),
    out('oSkip', 'mixed', ['A tactic, not a skill', 'حيلة، لا مهارة'], ['He\'ll skip them in the test, and lose those marks.', 'سيتجاوزها في الاختبار، ويخسر درجاتها.'], [], { xp: 30, setFlag: 'm7.gap' }),
    out('bChoose', 'good', ['Routes, chosen from evidence', 'مسارات تُختار بالأدلة'], ['Each student looks at their prep result and picks a route. They argue about it, which means they read it.', 'ينظر كل طالب إلى نتيجة استعداده ويختار مساره. يتناقشون فيها، وهذا يعني أنهم قرؤوها.'], [fx('sara', 0, 1), fx('omar', 0, 1)], { discover: 'pathways', setFlag: 'm7.plan' }),
    out('bSame', 'mixed', ['One plan for all', 'خطة واحدة للجميع'], ['Clear, fair, and the same for everyone.', 'واضحة وعادلة، ومتشابهة للجميع.'], [], { setFlag: 'm7.gap' }),
    out('shWeek1', 'insight', ['Week 1', 'الأسبوع ١'], ['The class\'s first-week work: Sara\'s "2:3 = 4:5", Omar\'s blank page, Ahmed\'s "big divided by small". Look how far they came. It goes in your notebook.', 'أعمال الصف في الأسبوع الأول: «٢:٣ = ٤:٥» عند سارة، وصفحة عمر الفارغة، و«الكبير على الصغير» عند أحمد. انظري كم تقدّموا. يُحفظ في دفتركِ.'], [], { setFlag: 'm7.week1' }),
    out('ptYes', 'good', ['A video by a classmate', 'مقطع من زميل'], ['One topic, two minutes, checked by you. Three students watch it twice.', 'موضوع واحد، ودقيقتان، وراجعتِه أنتِ. ويشاهده ثلاثة طلاب مرتين.'], [fx('ahmed', 1, 1)], { discover: 'show-my-learning' }),
    out('ptNo', 'mixed', ['His own revision', 'مراجعته الخاصة'], ['He revises what he already knows.', 'يراجع ما يعرفه أصلًا.'], []),
    out('psTeach', 'good', ['Each teaches their strong topic', 'كلٌّ يشرح موضوعه القوي'], ['Sara teaches ratios; Omar teaches rates with his comic. Both gaps shrink.', 'سارة تشرح النسب، وعمر يشرح المعدّلات بقصته المصوّرة. وتصغر الفجوتان.'], [fx('sara', 1, 1), fx('omar', 1, 1)], { discover: 'teams' }),
    out('psApart', 'good', ['Two routes, side by side', 'مساران جنبًا إلى جنب'], ['They sit together on separate routes and check in at the end.', 'يجلسان معًا كلٌّ في مساره، ويتراجعان في النهاية.'], [], { discover: 'pathways' }),
    out('pkWhy', 'insight', ['Hard, and worth more', 'صعبة، وأعلى درجة'], ['"The word problems are worth double." The tip quietly disappears from notebooks.', '«المسائل الكلامية درجتها مضاعفة.» وتختفي النصيحة بهدوء من الدفاتر.'], [], { discover: 'see-why' }),
    out('pkGo', 'mixed', ['A tip that costs marks', 'نصيحة تكلّف درجات'], ['Several students plan to skip the questions worth the most.', 'عدد من الطلاب يخطّطون لتجاوز الأسئلة الأعلى درجة.'], [], { setFlag: 'm7.gap' }),
    out('puPaper', 'good', ['Paper today', 'الورق اليوم'], ['Same practice, on paper. Updates run overnight.', 'التدريب نفسه على الورق. والتحديثات تعمل خلال الليل.'], []),
    out('puPairs', 'good', ['Two to a tablet', 'اثنان لكل جهاز'], ['Pairs on the updated tablets. It works, and they talk more.', 'ثنائيات على الأجهزة المحدّثة. ينجح الأمر، ويتحاورون أكثر.'], []),
  ],
  endings: [
    {
      id: 'still-building', title: T(['Still Building', 'ما زال البناء مستمرًا']), priority: 1, when: { flags: ['m7.gap'] },
      narration: T(['Some routes are still unclear a week before the test. You know whose, and there is still a week.', 'ما زالت بعض المسارات غير واضحة قبل الاختبار بأسبوع. وأنتِ تعرفين لمن، وما زال هناك أسبوع.']),
    },
    {
      id: 'every-route', title: T(['Every Student, a Route', 'لكل طالب طريق']), priority: 2, when: { flags: ['m7.plan'] }, badge: 'ready-for-the-test',
      narration: T(['Each student knows what they can do, where they stand, and what to do this week.', 'يعرف كل طالب ما يستطيعه، وأين يقف، وماذا يفعل هذا الأسبوع.']),
    },
    {
      id: 'ready-for-test', title: T(['Ready for the Test', 'مستعدون للاختبار']), priority: 3, when: { notFlags: ['m7.gap'] },
      narration: T(['The term ends with a class that knows its own learning. That is what you were building from the first five minutes.', 'ينتهي الفصل بصف يعرف تعلّمه. وهذا ما كنتِ تبنينه منذ الدقائق الخمس الأولى.']),
    },
  ],
  badges: [
    { id: 'ready-for-the-test', title: T(['Ready for the Test', 'مستعدون للاختبار']), why: T(['You gave students routes from their own evidence.', 'منحتِ الطلاب مسارات من أدلّتهم هم.']), icon: '⤳', when: { flag: 'm7.plan' } },
    { id: 'look-how-far', title: T(['Look How Far', 'انظري كم تقدّموا']), why: T(['You showed students their growth, not just their gaps.', 'أريتِ الطلاب تقدّمهم، لا فجواتهم فقط.']), icon: '✎', when: { flag: 'm7.week1' } },
    { id: 'm7-term', title: T(['A Term of Stories', 'فصل من القصص']), why: T(['Every classroom has a story. You read three of them to the end.', 'لكل صف قصة. وقرأتِ ثلاثًا منها حتى النهاية.']), icon: '★', when: 'always' },
  ],
  communityTopic: T(['Revision that fits each student', 'مراجعة تناسب كل طالب']),
  communityExamples: [
    { who: T(['Math teacher · Abu Dhabi', 'معلمة رياضيات · أبوظبي']), text: T(['A week before tests, my students pick one of three routes from their own results. They take it far more seriously than my revision lesson.', 'قبل الاختبار بأسبوع، يختار طلابي واحدًا من ثلاثة مسارات بناءً على نتائجهم. ويأخذونه بجدية أكبر بكثير من درس المراجعة.']) },
    { who: T(['Grade 7 teacher · Sharjah', 'معلم الصف السابع · الشارقة']), text: T(['I put a student\'s first-week work next to their last. Nothing calms a nervous student faster.', 'أضع عمل الطالب في الأسبوع الأول بجانب عمله الأخير. لا شيء يهدّئ الطالب القلق أسرع من ذلك.']) },
  ],
  teaser: [
    { ifFlag: 'm7.week1', text: T(['From "2:3 = 4:5" to ready for the test. Next term, a new class, and new stories.', 'من «٢:٣ = ٤:٥» إلى الاستعداد للاختبار. وفي الفصل القادم: صف جديد، وقصص جديدة.']) },
    { ifFlag: 'm7.gap', text: T(['A few routes are still open. The test is next week, and so is your next look.', 'ما زالت بعض المسارات مفتوحة. الاختبار الأسبوع القادم، ونظرتكِ القادمة كذلك.']) },
    { text: T(['The term is complete. Every classroom has a story, and you know this one by heart.', 'اكتمل الفصل. لكل صف قصة، وأنتِ تحفظين هذه عن ظهر قلب.']) },
  ],
};
