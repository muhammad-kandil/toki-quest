/**
 * DEV FIXTURE — used ONLY while src/teacher/data ADVENTURES is empty, so the
 * game is playable before content lands. A minimal Mission 01 in the shape
 * of the Alef proposal (docs/product/ALEF_PROPOSAL.md): opening film,
 * three investigations with weighted evidence profiles, board + bookshelf
 * events, the laptop puzzle, and three endings that open further missions.
 * NCLE tool names are placeholders until product specialists verify them.
 */
import { t } from '../../i18n/types';
import type { Adventure, AlefResource, Location } from '../types';

const tool = (id: string, stage: AlefResource['stage'], icon: string, en: string, ar: string, whatEn: string, whatAr: string, monEn: string, monAr: string): AlefResource =>
  ({ id, stage, icon, placeholder: true, title: t(en, ar), what: t(whatEn, whatAr), monday: t(monEn, monAr) });

export const FIXTURE_RESOURCES: AlefResource[] = [
  tool('assign', 'extend', '↗', 'Assign', 'التكليف',
    'Send a student a further task on the same idea, so finishing early leads to deeper work.', 'أرسلي للطالب مهمة إضافية على الفكرة نفسها، فيقود الانتهاء المبكر إلى عمل أعمق.',
    'Keep one "go further" task ready to assign in every lesson.', 'جهّزي مهمة «تقدّم أكثر» واحدة للتكليف في كل درس.'),
  tool('present', 'launch', '▶', 'Present Mode', 'وضع العرض',
    'Show the learning intention and the first question to the whole class on the board.', 'اعرضي هدف التعلّم والسؤال الأول على اللوح للصف كله.',
    'Open with the learning intention on screen and read it together.', 'افتتحي بهدف التعلّم على الشاشة واقرئيه مع الطلاب.'),
  tool('seewhy', 'facilitate', '?', 'See Why', 'اعرف السبب',
    'A worked explanation of why an answer is right, so a student can find where their own thinking went off.', 'شرح محلول لسبب صحة الإجابة، ليجد الطالب أين انحرف تفكيره.',
    'Before correcting, ask "Show me how you got that".', 'قبل التصحيح، اسألي «أريني كيف وصلت إلى هذا».'),
  tool('needhelp', 'facilitate', '✋', 'Need Help', 'أحتاج مساعدة',
    'A quiet way for a student to say they are stuck, with a step back to what they need first.', 'طريقة هادئة ليقول الطالب إنه متعثّر، مع خطوة إلى ما يحتاجه أولًا.',
    'Check the Need Help list once in the first five minutes.', 'راجعي قائمة «أحتاج مساعدة» مرة في أول خمس دقائق.'),
  tool('practice', 'extend', '◆', 'Practice', 'التدريب',
    'Short practice on the same skill, so understanding becomes secure.', 'تدريب قصير على المهارة نفسها، ليصبح الفهم راسخًا.',
    'End with three practice questions on today’s idea.', 'اختمي بثلاثة أسئلة تدريب على فكرة اليوم.'),
  tool('teams', 'facilitate', '◎', 'Teams', 'الفرق',
    'Group work with a role for everyone, so a quiet student has a safe way in.', 'عمل جماعي بدور لكل طالب، ليجد الطالب الهادئ مدخلًا آمنًا.',
    'Give the quietest student the reporter role.', 'أعطي الطالب الأهدأ دور المقرّر.'),
  tool('exit-ticket', 'extend', '✓', 'Exit Ticket', 'بطاقة الخروج',
    'Three quick questions at the end show who starts tomorrow with you.', 'ثلاثة أسئلة سريعة في النهاية تُظهر من يبدأ معك غدًا.',
    'Sort exit-ticket answers into three piles before you leave.', 'صنّفي إجابات بطاقة الخروج في ثلاث مجموعات قبل أن تغادري.'),
];

export const FIXTURE_LOCATIONS: Location[] = [
  { id: 'g7', kind: 'classroom', name: t('Grade 7 classroom', 'صف السابع'), x: 30, y: 36 },
  { id: 'g8', kind: 'classroom', name: t('Grade 8 classroom', 'صف الثامن'), x: 72, y: 30 },
  { id: 'staff', kind: 'staffroom', name: t('Staff room', 'غرفة المعلمين'), x: 74, y: 56 },
  { id: 'library', kind: 'library', name: t('Library', 'المكتبة'), x: 26, y: 62 },
  { id: 'board', kind: 'community', name: t('Community board', 'لوحة المجتمع'), x: 50, y: 48 },
  { id: 'office', kind: 'office', name: t('Principal’s office', 'مكتب المديرة'), x: 50, y: 18 },
  { id: 'yard', kind: 'yard', name: t('Yard', 'الساحة'), x: 46, y: 82 },
  { id: 'shop', kind: 'shop', name: t('Campus shop', 'متجر المدرسة'), x: 80, y: 78 },
];

const SCENE = 'teacher-demo/img/classroom.jpg';
const fx = (student: string, understanding = 0, engagement = 0) => ({ student, understanding, engagement });

const M01: Adventure = {
  id: 'm1', number: 1, timed: false,
  title: t('The First Five Minutes', 'الدقائق الخمس الأولى'),
  meta: t('Grade 7 · UAE public school', 'الصف السابع · مدرسة حكومية في الإمارات'),
  location: 'g7',
  scene: SCENE,
  film: [
    { picture: SCENE, narration: t('Morning. Ms. Mariam arrives early and opens the windows.', 'الصباح. تصل الأستاذة مريم مبكرًا وتفتح النوافذ.') },
    { picture: SCENE, narration: t('The students arrive, still talking about the weekend.', 'يصل الطلاب وهم ما زالوا يتحدثون عن عطلة نهاية الأسبوع.') },
    { picture: SCENE, who: 'ahmed', line: t('Miss, I already know today’s topic!', 'أستاذة، أنا أعرف موضوع اليوم!') },
    { picture: SCENE, who: 'sara', line: t('Miss, I still don’t understand what we learned yesterday.', 'أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.') },
    { picture: SCENE, who: 'omar', line: t('Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟'),
      narration: t('Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟') },
  ],
  intro: [t('Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟')],
  lessonMinutes: 5,
  students: [
    { id: 'ahmed', name: t('Ahmed', 'أحمد'), x: 57, y: 50, understanding: 2, engagement: 2, idle: t('Ahmed is flicking through his notebook.', 'أحمد يقلّب صفحات دفتره.') },
    { id: 'sara', name: t('Sara', 'سارة'), x: 71, y: 52, understanding: 1, engagement: 2, idle: t('Sara is rereading yesterday’s page.', 'سارة تعيد قراءة صفحة الأمس.') },
    { id: 'omar', name: t('Omar', 'عمر'), x: 21, y: 44, understanding: 1, engagement: 1, idle: t('Omar is looking out of the window.', 'عمر ينظر من النافذة.'),
      homeNote: t('His father says Omar stayed up late helping at the family shop.', 'يقول والده إن عمر سهر متأخرًا يساعد في متجر العائلة.') },
  ],
  objects: [
    { id: 'laptop', label: t('Laptop', 'الحاسوب'), icon: '▣', x: 86, y: 30, idle: t('The lesson plan is open on the laptop.', 'خطة الدرس مفتوحة على الحاسوب.') },
    { id: 'board', label: t('Board', 'اللوح'), icon: '▭', x: 44, y: 18, idle: t('The board is ready for today.', 'اللوح جاهز لليوم.') },
    { id: 'bookshelf', label: t('Bookshelf', 'رف الكتب'), icon: '❒', x: 10, y: 64, idle: t('Just books now. You have looked here already.', 'كتب فقط الآن. لقد نظرتِ هنا من قبل.') },
  ],
  events: [
    {
      id: 'ahmed-inv', kind: 'early-finisher', on: 'ahmed', category: 'learning', weight: 35,
      line: t('The Confidence Detective', 'محقّقة الثقة'),
      ask: t('Ahmed says he already knows today’s topic. Look at his work before you decide.', 'يقول أحمد إنه يعرف موضوع اليوم. انظري في عمله قبل أن تقرّري.'),
      investigate: {
        clues: [
          { id: 'answer', label: t('His answer', 'إجابته'), text: t('', '') },
          { id: 'explain', label: t('His explanation', 'شرحه'), text: t('', '') },
          { id: 'apply', label: t('A new problem', 'مسألة جديدة'), text: t('', '') },
        ],
        profiles: [
          { id: 'strong', weight: 50, setFlag: 'ahmed:strong', clues: {
            answer: t('3/4 + 1/8 = 7/8. Correct.', '٣/٤ + ١/٨ = ٧/٨. صحيح.'),
            explain: t('“I made the quarters into eighths first.” Clear and right.', '«حوّلت الأرباع إلى أثمان أولًا.» واضح وصحيح.'),
            apply: t('He solves a harder one and checks it himself.', 'يحلّ مسألة أصعب ويتحقّق منها بنفسه.') } },
          { id: 'weak', weight: 50, setFlag: 'ahmed:weak', clues: {
            answer: t('3/4 + 1/8 = 7/8. Correct.', '٣/٤ + ١/٨ = ٧/٨. صحيح.'),
            explain: t('“I just know it’s 7/8.” He can’t say why.', '«أعرف أنها ٧/٨ فقط.» لا يستطيع أن يقول لماذا.'),
            apply: t('On 2/3 + 1/6 he adds the tops and the bottoms.', 'في ٢/٣ + ١/٦ يجمع البسط مع البسط والمقام مع المقام.') } },
        ],
      },
      choices: [
        { ifFlag: 'ahmed:strong', label: t('Assign a stretch task', 'كلّفيه بمهمة إثرائية'), sub: t('Assign', 'التكليف'), minutes: 1, outcome: 'ahmedExtend' },
        { ifFlag: 'ahmed:weak', label: t('Ask him to show why', 'اطلبي منه أن يبيّن السبب'), sub: t('See Why', 'اعرف السبب'), minutes: 1, outcome: 'ahmedSeeWhy' },
        { label: t('Pair him with a classmate', 'اجعليه مع زميل'), sub: t('Collaboration', 'تعاون'), minutes: 1, outcome: 'ahmedPeer' },
      ],
    },
    {
      id: 'sara-inv', kind: 'needs-help', on: 'sara', category: 'learning', weight: 35,
      line: t('Find the Missing Piece', 'ابحثي عن القطعة الناقصة'),
      ask: t('Sara says she still doesn’t understand yesterday. What is missing?', 'تقول سارة إنها ما زالت لا تفهم درس الأمس. ما الناقص؟'),
      investigate: {
        clues: [
          { id: 'notebook', label: t('Notebook', 'الدفتر'), text: t('', '') },
          { id: 'tablet', label: t('Tablet', 'الجهاز اللوحي'), text: t('', '') },
          { id: 'bubble', label: t('What she says', 'ما تقوله'), text: t('', '') },
        ],
        minClues: 2,
        profiles: [
          { id: 'prereq', weight: 60, setFlag: 'sara:prereq', clues: {
            notebook: t('Her equivalent-fractions page from last week is blank.', 'صفحة الكسور المتكافئة من الأسبوع الماضي فارغة.'),
            tablet: t('She skipped the “make the bottoms the same” step every time.', 'تخطّت خطوة «توحيد المقامات» في كل مرة.'),
            bubble: t('“I don’t get how quarters turn into eighths.”', '«لا أفهم كيف تصبح الأرباع أثمانًا.»') } },
          { id: 'mis', weight: 40, setFlag: 'sara:mis', clues: {
            notebook: t('1/4 + 2/4 = 3/8, written three times.', '١/٤ + ٢/٤ = ٣/٨، مكتوبة ثلاث مرات.'),
            tablet: t('Same mistake on every question: she adds the denominators.', 'الخطأ نفسه في كل سؤال: تجمع المقامات.'),
            bubble: t('“You add the top and you add the bottom, right?”', '«نجمع الأعلى ونجمع الأسفل، صح؟»') } },
        ],
      },
      choices: [
        { ifFlag: 'sara:prereq', label: t('Bridge the gap first', 'سدّي الفجوة أولًا'), sub: t('Need Help · readiness', 'أحتاج مساعدة · الجاهزية'), minutes: 2, outcome: 'saraBridge' },
        { ifFlag: 'sara:mis', label: t('Show her why', 'بيّني لها السبب'), sub: t('See Why', 'اعرف السبب'), minutes: 2, outcome: 'saraSeeWhy' },
        { label: t('Come back to her later', 'عودي إليها لاحقًا'), sub: t('Not now', 'ليس الآن'), minutes: 0, outcome: 'saraLater' },
      ],
    },
    {
      id: 'omar-inv', kind: 'low-participation', on: 'omar', category: 'management', weight: 15,
      line: t('What’s Behind the Silence?', 'ما وراء الصمت؟'),
      ask: t('Omar hasn’t started. Find out why before you act.', 'لم يبدأ عمر بعد. اعرفي السبب قبل أن تتصرّفي.'),
      investigate: {
        clues: [
          { id: 'page', label: t('His page', 'ورقته'), text: t('', '') },
          { id: 'face', label: t('His face', 'ملامحه'), text: t('', '') },
          { id: 'neighbour', label: t('His neighbour', 'جاره'), text: t('', '') },
        ],
        minClues: 2,
        profiles: [
          { id: 'goal', weight: 50, setFlag: 'omar:goal', clues: {
            page: t('The date, then nothing. No title.', 'التاريخ، ثم لا شيء. بلا عنوان.'),
            face: t('He looks at the board, then at you, waiting.', 'ينظر إلى اللوح ثم إليكِ، منتظرًا.'),
            neighbour: t('“He asked me what we’re doing. I don’t know either.”', '«سألني ماذا سنفعل. لا أعرف أنا أيضًا.»') } },
          { id: 'confidence', weight: 50, setFlag: 'omar:confidence', clues: {
            page: t('He wrote an answer, then rubbed it out.', 'كتب إجابة ثم مسحها.'),
            face: t('He looks down when you come near.', 'يخفض نظره حين تقتربين.'),
            neighbour: t('“His answer was right, Miss. He just won’t say it.”', '«إجابته كانت صحيحة يا أستاذة. لكنه لا يريد قولها.»') } },
        ],
      },
      choices: [
        { ifFlag: 'omar:goal', label: t('Share the learning intention', 'شاركي هدف التعلّم'), sub: t('Present Mode', 'وضع العرض'), minutes: 1, outcome: 'omarGoal' },
        { ifFlag: 'omar:confidence', label: t('A low-risk way to contribute', 'طريقة آمنة للمشاركة'), sub: t('Teams · reporter role', 'الفرق · دور المقرّر'), minutes: 1, outcome: 'omarVoice' },
        { label: t('Give him a minute', 'امنحيه دقيقة'), sub: t('Not now', 'ليس الآن'), minutes: 0, outcome: 'omarLater' },
      ],
    },
    {
      id: 'omar-mis', kind: 'new-event', on: 'omar', category: 'misconception', weight: 20, eligible: { flags: ['omarSpoke'] },
      line: t('“So the bigger the bottom number, the bigger the fraction?”', '«إذن كلما كبر المقام كبر الكسر؟»'),
      ask: t('Omar’s first answer reveals a misconception. A new investigation opens.', 'أول إجابة لعمر تكشف تصوّرًا خاطئًا. يبدأ تحقيق جديد.'),
      choices: [
        { label: t('Ask the class: “Is 1/8 bigger than 1/4?”', 'اسألي الصف: «هل ١/٨ أكبر من ١/٤؟»'), sub: t('Discussion', 'نقاش'), minutes: 1, outcome: 'omarDiscuss' },
        { label: t('Note it for the practice later', 'دوّنيه للتدريب لاحقًا'), sub: t('Practice', 'التدريب'), minutes: 0, outcome: 'omarNote' },
      ],
    },
    {
      id: 'board-ev', kind: 'new-event', on: 'board', category: 'learning', weight: 25,
      line: t('Bring Learning to Life', 'أحيي التعلّم'),
      ask: t('The board is ready. How do you open the lesson?', 'اللوح جاهز. كيف تفتتحين الدرس؟'),
      choices: [
        { label: t('Put the learning intention up', 'اعرضي هدف التعلّم'), sub: t('Present Mode', 'وضع العرض'), minutes: 1, outcome: 'boardPresent' },
        { label: t('Start a prior-knowledge discussion', 'ابدئي نقاشًا عن المعرفة السابقة'), sub: t('Discussion', 'نقاش'), minutes: 1, outcome: 'boardPrior' },
      ],
    },
    {
      id: 'shelf-ev', kind: 'unexpected', on: 'bookshelf', category: 'bonus', weight: 5,
      line: t('A box behind the dictionaries', 'صندوق خلف القواميس'),
      ask: t('Something has been left on the shelf. Optional.', 'شيء ما تُرك على الرف. اختياري.'),
      choices: [{ label: t('Open it', 'افتحيه'), sub: t('Hidden discovery', 'اكتشاف مخفي'), minutes: 0, outcome: 'shelfFind' }],
    },
  ],
  outcomes: [
    { id: 'ahmedExtend', tone: 'good', xp: 30, discover: 'assign', title: t('Ahmed goes beyond the expected', 'أحمد يتجاوز المتوقّع'), body: t('The stretch task has him explaining eighths to himself in the margin.', 'المهمة الإثرائية جعلته يشرح الأثمان لنفسه في الهامش.'), effects: [fx('ahmed', 1, 1)], setFlag: 'readinessChecked' },
    { id: 'ahmedSeeWhy', tone: 'insight', xp: 30, discover: 'seewhy', title: t('A hidden misconception', 'تصوّر خاطئ مخفي'), body: t('Explaining it out loud, he hears his own gap. “Oh — the pieces must be the same size.”', 'وهو يشرح بصوت عالٍ يسمع فجوته. «آه — يجب أن تكون القطع بالحجم نفسه.»'), effects: [fx('ahmed', 1, 0)], setFlag: 'readinessChecked' },
    { id: 'ahmedPeer', tone: 'good', xp: 30, discover: 'teams', title: t('A partner who asks good questions', 'زميل يطرح أسئلة جيدة'), body: t('His partner asks “why eighths?” and Ahmed has to explain. Both are thinking.', 'يسأله زميله «لماذا الأثمان؟» فيضطر أحمد للشرح. كلاهما يفكّر.'), effects: [fx('ahmed', 1, 1)], setFlag: 'peerContribution' },
    { id: 'saraBridge', tone: 'good', xp: 30, discover: 'needhelp', title: t('The missing piece', 'القطعة الناقصة'), body: t('Two minutes on equivalent fractions, and yesterday starts to make sense.', 'دقيقتان على الكسور المتكافئة، ويبدأ درس الأمس يتّضح.'), effects: [fx('sara', 2, 1)], setFlag: 'readinessChecked' },
    { id: 'saraSeeWhy', tone: 'insight', xp: 30, discover: 'seewhy', title: t('She finds her own mistake', 'تجد خطأها بنفسها'), body: t('Talking it through, she stops: “The bottoms don’t add, do they?”', 'وهي تشرح تتوقّف: «المقامات لا تُجمع، أليس كذلك؟»'), effects: [fx('sara', 2, 1)], setFlag: 'readinessChecked' },
    { id: 'saraLater', tone: 'mixed', title: t('Sara waits', 'سارة تنتظر'), body: t('She opens the new task, but yesterday’s gap comes with her.', 'تفتح المهمة الجديدة، لكن فجوة الأمس ترافقها.'), effects: [fx('sara', 0, -1)], setFlag: 'needUnresolved' },
    { id: 'omarGoal', tone: 'good', xp: 30, discover: 'present', title: t('Now he knows where he’s going', 'الآن يعرف إلى أين يتّجه'), body: t('With the learning intention on the board, Omar writes a title and starts.', 'مع هدف التعلّم على اللوح، يكتب عمر عنوانًا ويبدأ.'), effects: [fx('omar', 1, 2)], setFlag: 'readinessChecked' },
    { id: 'omarVoice', tone: 'good', xp: 30, discover: 'teams', title: t('Omar speaks', 'عمر يتكلّم'), body: t('As his table’s reporter he reads out their answer — and asks a question of his own.', 'بصفته مقرّر طاولته يقرأ إجابتهم — ويطرح سؤالًا من عنده.'), effects: [fx('omar', 1, 2)], setFlag: 'omarSpoke' },
    { id: 'omarLater', tone: 'mixed', title: t('The silence continues', 'الصمت مستمر'), body: t('A minute passes. Omar is still waiting for a way in.', 'تمرّ دقيقة. ما زال عمر ينتظر مدخلًا.'), effects: [], setFlag: 'needUnresolved' },
    { id: 'omarDiscuss', tone: 'insight', xp: 30, title: t('A meaningful peer contribution', 'مساهمة حقيقية من زميل'), body: t('Three students argue it out with drawings. Omar changes his mind — and says so.', 'ثلاثة طلاب يتناقشون بالرسوم. يغيّر عمر رأيه — ويقول ذلك.'), effects: [fx('omar', 2, 1)], setFlag: 'peerContribution' },
    { id: 'omarNote', tone: 'mixed', discover: 'practice', title: t('Noted for later', 'مدوّن لوقت لاحق'), body: t('You jot it down for the practice set. The misconception is still there for now.', 'تدوّنينه لمجموعة التدريب. التصوّر الخاطئ ما زال موجودًا حتى الآن.'), effects: [], setFlag: 'needUnresolved' },
    { id: 'boardPresent', tone: 'good', xp: 30, discover: 'present', title: t('Everyone sees the goal', 'الجميع يرى الهدف'), body: t('You read the learning intention together. Three hands go up with questions.', 'تقرؤون هدف التعلّم معًا. ترتفع ثلاث أيادٍ بأسئلة.'), effects: [fx('omar', 0, 1)], setFlag: 'readinessChecked' },
    { id: 'boardPrior', tone: 'insight', xp: 30, title: t('Starting points revealed', 'نقاط البداية تتكشّف'), body: t('Answers to “What do you remember about fractions?” show you who is ready.', 'الإجابات عن «ماذا تتذكّرون عن الكسور؟» تُظهر لكِ من هو مستعد.'), effects: [fx('sara', 0, 1)], setFlag: 'readinessChecked' },
    { id: 'shelfFind', tone: 'good', title: t('A thank-you card', 'بطاقة شكر'), body: t('From last year’s class: “You made fractions make sense.” You prop it on your desk.', 'من صف العام الماضي: «جعلتِ الكسور مفهومة.» تضعينها على مكتبك.'), effects: [] },
  ],
  schedule: [],
  puzzle: {
    id: 'laptop', badge: 'instructional-architect', xp: 100,
    title: t('Build Your Learning Journey', 'ابني رحلة التعلّم'),
    intro: t('A simplified Alef planning view. Drag each practice into a lesson stage, or tap a card and then a stage.', 'عرض تخطيط مبسّط من ألف. اسحبي كل ممارسة إلى مرحلة من الدرس، أو انقري على البطاقة ثم على المرحلة.'),
    cards: [
      { id: 'intention', text: t('Share the learning intention', 'مشاركة هدف التعلّم'), stages: ['launch'] },
      { id: 'prior', text: t('Check prior knowledge', 'التحقّق من المعرفة السابقة'), stages: ['launch', 'extend'] },
      { id: 'model', text: t('Model with a worked example', 'النمذجة بمثال محلول'), stages: ['facilitate'] },
      { id: 'teams', text: t('Students work in teams', 'الطلاب يعملون في فرق'), stages: ['facilitate'] },
      { id: 'explain', text: t('Students explain their thinking', 'الطلاب يشرحون تفكيرهم'), stages: ['facilitate', 'extend'] },
      { id: 'exit', text: t('Exit ticket', 'بطاقة الخروج'), stages: ['extend'] },
    ],
    note: t('This sequence is illustrative: real lessons move back and forth, and practices recur across stages.', 'هذا التسلسل توضيحي: الدروس الحقيقية تتنقّل ذهابًا وإيابًا، والممارسات تتكرّر عبر المراحل.'),
  },
  endings: [
    { id: 'unfinished', priority: 0, when: { flags: ['needUnresolved'] }, opens: ['m2'],
      title: t('The Unfinished Puzzle', 'الأحجية غير المكتملة'),
      narration: t('The lesson begins, but one need is still waiting. Tomorrow, you’ll start there.', 'يبدأ الدرس، لكن حاجة واحدة ما زالت تنتظر. غدًا ستبدئين من هناك.') },
    { id: 'opportunity', priority: 1, when: { flags: ['peerContribution'] }, badge: 'everyone-voice', opens: ['m3'],
      title: t('An Unexpected Opportunity', 'فرصة غير متوقّعة'),
      narration: t('A student’s question became the class’s question. The lesson starts with their voices.', 'سؤال طالب أصبح سؤال الصف. يبدأ الدرس بأصواتهم.') },
    { id: 'ready', priority: 2, when: { flags: ['readinessChecked'] }, badge: 'purposeful-launch', opens: ['m2'],
      title: t('Ready to Learn', 'مستعدون للتعلّم'),
      narration: t('You checked where they are and know the next step. The five minutes were well spent.', 'تحقّقتِ من موقعهم وتعرفين الخطوة التالية. أحسنتِ استغلال الدقائق الخمس.') },
  ],
  badges: [
    { id: 'purposeful-launch', icon: '★', when: { flag: 'readinessChecked' }, title: t('Purposeful Launch', 'انطلاقة هادفة'), why: t('You checked readiness before the lesson began.', 'تحقّقتِ من الجاهزية قبل بدء الدرس.') },
    { id: 'everyone-voice', icon: '◎', when: { flag: 'peerContribution' }, title: t('Everyone Has a Voice', 'لكلٍّ صوت'), why: t('A student’s contribution moved the class forward.', 'مساهمة طالب دفعت الصف إلى الأمام.') },
    { id: 'instructional-architect', icon: '▦', when: { flag: 'puzzle:laptop' }, title: t('Instructional Architect', 'مهندسة التعليم'), why: t('You built a learning journey across all three stages.', 'بنيتِ رحلة تعلّم عبر المراحل الثلاث.') },
    { id: 'first-five', icon: '✎', when: 'always', title: t('The First Five Minutes', 'الدقائق الخمس الأولى'), why: t('You looked before you acted.', 'نظرتِ قبل أن تتصرّفي.') },
  ],
  communityTopic: t('The first five minutes', 'الدقائق الخمس الأولى'),
  communityExamples: [
    { who: t('Grade 7 teacher · Al Ain', 'معلمة صف سابع · العين'), text: t('I put the learning intention up before they sit down. The “what are we doing?” questions stopped.', 'أعرض هدف التعلّم قبل أن يجلسوا. توقّفت أسئلة «ماذا سنفعل؟».') },
    { who: t('Math teacher · Abu Dhabi', 'معلم رياضيات · أبوظبي'), text: t('“Show me how you got that” finds more gaps than any quiz.', '«أرني كيف وصلت إلى هذا» يكشف فجوات أكثر من أي اختبار.') },
  ],
  teaser: [
    { ifFlag: 'needUnresolved', text: t('One student is still waiting. Next: Bridging the Gap.', 'طالب ما زال ينتظر. التالي: سدّ الفجوة.') },
    { ifFlag: 'peerContribution', text: t('A quiet voice spoke up. Next: Everyone Has a Voice.', 'تكلّم صوت هادئ. التالي: لكلٍّ صوت.') },
    { text: t('The lesson is ready to begin. Next: Bring Learning to Life.', 'الدرس جاهز للبدء. التالي: أحيي التعلّم.') },
  ],
  takeaway: t('Five minutes of looking before acting tells you where each student really starts.', 'خمس دقائق من النظر قبل التصرّف تخبرك من أين يبدأ كل طالب فعلًا.'),
};

export const FIXTURE_ADVENTURES: Adventure[] = [M01];
