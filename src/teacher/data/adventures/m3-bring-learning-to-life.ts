/**
 * Mission 03 — Bring Learning to Life. Grade 7 · Science (falling objects,
 * air resistance). Opened by M01 "Ready to Learn".
 * Present Mode and a prior-knowledge discussion at the board; the class's
 * responses reveal a shared misconception (heavier things fall faster).
 * The board itself is an investigation of the class's starting point.
 * Branch map: docs/content/TEACHER_CONTENT.md#m03
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M3: Adventure = {
  id: 'm3',
  number: 3,
  title: t('Bring Learning to Life', 'أحيي التعلّم'),
  meta: t('Mission 03 · Grade 7 · Science', 'المهمة ٠٣ · الصف السابع · العلوم'),
  location: 'grade7',
  scene: 'teacher/scenes/m03.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'Open with what students already think, out loud, before you teach: a shared misconception has to be seen before it can change.',
    'ابدأ بما يعتقده الطلاب مسبقًا، بصوت مسموع، قبل أن تشرح: الفهم الخاطئ المشترك يجب أن يظهر قبل أن يتغيّر.',
  ),
  film: [
    { picture: 'teacher/film/m03-1.jpg', narration: T(['Science, Grade 7. On Ms. Mariam\'s desk: two identical bottles, one full of water, one empty.', 'العلوم، الصف السابع. على مكتب الأستاذة مريم: قارورتان متطابقتان، إحداهما مملوءة بالماء والأخرى فارغة.']) },
    { picture: 'teacher/film/m03-2.jpg', who: 'hamdan', line: T(['The full one will land first. Obviously.', 'المملوءة ستصل أولًا. هذا واضح.']) },
    { picture: 'teacher/film/m03-2.jpg', who: 'sara', line: T(['Heavy things always fall faster, Miss.', 'الأشياء الثقيلة تسقط أسرع دائمًا يا أستاذة.']) },
    { picture: 'teacher/film/m03-2.jpg', who: 'noura', line: T(['…are you sure?', '…هل أنتم متأكدون؟']) },
    { picture: 'teacher/film/m03-3.jpg', narration: T(['Before you drop anything: what does the class already think?', 'قبل أن تُسقطي أي شيء: ماذا يعتقد الصف مسبقًا؟']) },
  ],
  intro: [T(['MISSION 03 | Bring Learning to Life', 'المهمة ٠٣ | أحيي التعلّم']), T(['Start from what they already think.', 'ابدئي مما يعتقدونه مسبقًا.'])],
  introBubbles: [
    { student: 'hamdan', line: T(['Obviously!', 'واضح!']) },
    { student: 'noura', line: T(['…are you sure?', '…متأكدون؟']) },
  ],
  students: [
    {
      id: 'sara', name: T(['Sara', 'سارة']), x: 34, y: 58, understanding: 1, engagement: 2,
      idle: T(['Sara has written "heavy = fast" in her book.', 'كتبت سارة في دفترها «الثقيل = أسرع».']),
      homeNote: T(['She looks after her younger brothers after school most days, so homework is done late.', 'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.']),
    },
    {
      id: 'hamdan', name: T(['Hamdan', 'حمدان']), x: 66, y: 48, understanding: 1, engagement: 3,
      idle: T(['Hamdan is weighing the bottles in his hands, grinning.', 'حمدان يزن القارورتين بيديه ويبتسم.']),
      homeNote: T(['He goes falconry with his grandfather on Fridays and loves anything that flies.', 'يذهب مع جدّه للصيد بالصقور أيام الجمعة، ويحب كل ما يطير.']),
    },
    {
      id: 'noura', name: T(['Noura', 'نورة']), x: 20, y: 44, understanding: 2, engagement: 1,
      idle: T(['Noura is quiet, watching the bottles.', 'نورة هادئة، تراقب القارورتين.']),
      homeNote: T(['The eldest of five. At home she talks all the time; at school she is quiet.', 'الكبرى بين خمسة إخوة. في البيت تتكلّم طوال الوقت، وفي المدرسة هادئة.']),
    },
  ],
  objects: [
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['"Which lands first?" and two drawings of bottles.', '«أيهما تصل أولًا؟» ورسم لقارورتين.']) },
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '▣', x: 82, y: 64, idle: T(['A short slow-motion clip is ready.', 'مقطع قصير بالحركة البطيئة جاهز.']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A rolled-up poster is pushed behind the books.', 'ملصق ملفوف خلف الكتب.']) },
  ],
  schedule: ['board', 'sara', 'hamdan', 'noura', 'laptop', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['"Which bottle lands first?"', '«أي قارورة تصل إلى الأرض أولًا؟»']),
      ask: T(['Ask the class, then look at the responses before you teach.', 'اسألي الصف، ثم انظري إلى الإجابات قبل أن تشرحي.']),
      investigate: {
        clues: [
          clue('hands', ['Hands', 'الأيادي'], ['"Hands up if the full one lands first."', '«ارفعوا أيديكم إن كانت المملوءة ستصل أولًا.»']),
          clue('words', ['Reasons', 'التعليلات'], ['"Why do you think so?"', '«لماذا تعتقدون ذلك؟»']),
          clue('quiet', ['The quiet ones', 'الصامتون'], ['Who hasn\'t answered?', 'من لم يُجب؟']),
        ],
        profiles: [
          profile('shared', 45, 'm3.class:shared', {
            hands: ['Twenty of twenty-four hands go up.', 'ترتفع عشرون يدًا من أربع وعشرين.'],
            words: ['"Heavier means more force, so faster." "A rock beats a leaf."', '«الأثقل يعني قوة أكبر، إذن أسرع.» «الحجر يسبق الورقة.»'],
            quiet: ['Noura and two others say nothing.', 'نورة واثنان آخران لا يقولون شيئًا.'],
          }),
          profile('split', 35, 'm3.class:split', {
            hands: ['About half the hands go up.', 'ترتفع نصف الأيادي تقريبًا.'],
            words: ['"Heavier is faster." "No, they land together, I saw a video."', '«الأثقل أسرع.» «لا، تصلان معًا، رأيت فيديو.»'],
            quiet: ['The two halves are looking at each other.', 'النصفان ينظران إلى بعضهما.'],
          }),
          profile('ready', 20, 'm3.class:ready', {
            hands: ['Only three hands go up.', 'ترتفع ثلاث أيادٍ فقط.'],
            words: ['"Same time, if there\'s no air in the way." Most already know.', '«في الوقت نفسه، إن لم يكن هناك هواء يعيقهما.» معظمهم يعرف.'],
            quiet: ['The three with hands up look embarrassed.', 'الثلاثة الذين رفعوا أيديهم يبدون محرجين.'],
          }),
        ],
      },
      choices: [
        ch(['"Why do you think so?" Let them talk', '«لماذا تعتقدون ذلك؟» دعيهم يتكلّمون'], ['Prior-knowledge discussion', 'نقاش المعرفة السابقة'], 'boardWhy', { ifFlag: 'm3.class:shared' }),
        ch(['Show the answer and the clip', 'اعرضي الإجابة والمقطع'], ['Present Mode', 'وضع العرض'], 'boardTell', { ifFlag: 'm3.class:shared' }),
        ch(['Each side convinces the other', 'كل فريق يقنع الآخر'], ['Teams', 'الفرق'], 'boardSides', { ifFlag: 'm3.class:split' }),
        ch(['Show the answer', 'اعرضي الإجابة'], ['Present Mode', 'وضع العرض'], 'boardTell', { ifFlag: 'm3.class:split' }),
        ch(['Share today\'s deeper question', 'اعرضي سؤال اليوم الأعمق'], ['Present Mode', 'وضع العرض'], 'boardDeeper', { ifFlag: 'm3.class:ready' }),
        ch(['Prove it again, for everyone', 'أثبتيها مرة أخرى للجميع'], ['Whole class', 'الصف كله'], 'boardAgain', { ifFlag: 'm3.class:ready' }),
      ],
    },
    {
      id: 'sara', kind: 'needs-help', on: 'sara',
      line: T(['"Heavy things always fall faster, Miss."', '«الأشياء الثقيلة تسقط أسرع دائمًا يا أستاذة.»']),
      ask: T(['Where does her idea come from?', 'من أين جاءت فكرتها؟']),
      investigate: {
        clues: [
          clue('notebook', ['Notebook', 'الدفتر'], ['What did she write?', 'ماذا كتبت؟']),
          clue('example', ['Her example', 'مثالها'], ['"Can you give me an example?"', '«هل تعطينني مثالًا؟»']),
          clue('word', ['Her words', 'كلماتها'], ['"What do you mean by heavy?"', '«ماذا تقصدين بثقيل؟»']),
        ],
        profiles: [
          profile('everyday', 40, 'm3.sara:everyday', {
            notebook: ['"heavy = fast" and a drawing of a feather and a stone.', '«الثقيل = أسرع» ورسم لريشة وحجر.'],
            example: ['"A feather floats down. A stone just drops."', '«الريشة تنزل ببطء. والحجر يسقط فورًا.»'],
            word: ['"Heavy. Like, more stuff in it."', '«ثقيل. يعني فيه أشياء أكثر.»'],
          }),
          profile('words', 30, 'm3.sara:words', {
            notebook: ['"mass", "weight" and "force" in a list, two of them crossed out.', '«الكتلة» و«الوزن» و«القوة» في قائمة، واثنتان منها مشطوبتان.'],
            example: ['"The full bottle has more… weight? Mass? They\'re the same, right?"', '«القارورة المملوءة فيها… وزن أكثر؟ كتلة؟ إنهما الشيء نفسه، صح؟»'],
            word: ['She isn\'t sure which word means what.', 'ليست متأكدة أي كلمة تعني ماذا.'],
          }),
          profile('secure', 30, 'm3.sara:secure', {
            notebook: ['"heavy = fast?" with a question mark, then "air?"', '«الثقيل = أسرع؟» مع علامة استفهام، ثم «الهواء؟»'],
            example: ['"The feather is slow because of the air, maybe. Not because it\'s light."', '«ربما الريشة بطيئة بسبب الهواء، لا لأنها خفيفة.»'],
            word: ['"I said heavy, but I think it\'s the air."', '«قلت ثقيل، لكنني أظن أنه الهواء.»'],
          }),
        ],
      },
      choices: [
        ch(['"Is the feather slow because it\'s light?"', '«هل الريشة بطيئة لأنها خفيفة؟»'], ['See Why', 'اعرف السبب'], 'sWhy', { ifFlag: 'm3.sara:everyday' }),
        ch(['Tell her the right idea', 'أخبريها بالفكرة الصحيحة'], ['Correct it', 'تصحيح'], 'sTold', { ifFlag: 'm3.sara:everyday', minutes: 0 }),
        ch(['Let her ask what "mass" means', 'دعيها تسأل عن معنى «الكتلة»'], ['AI Helper', 'المساعد الذكي'], 'sAi', { ifFlag: 'm3.sara:words' }),
        ch(['Guidance: the word card for this task', 'توجيه: بطاقة المفردات لهذه المهمة'], ['Need Help', 'أحتاج مساعدة'], 'sHelp', { ifFlag: 'm3.sara:words' }),
        ch(['Ask her to design the test', 'اطلبي منها أن تصمّم التجربة'], ['Student voice', 'صوت الطالب'], 'sDesign', { ifFlag: 'm3.sara:secure' }),
        ch(['"Good. Let\'s keep going."', '«جيد. لنتابع.»'], ['Continue', 'متابعة'], 'sOn', { ifFlag: 'm3.sara:secure', minutes: 0 }),
      ],
    },
    {
      id: 'hamdan', kind: 'early-finisher', on: 'hamdan',
      line: T(['"The full one will land first. Obviously."', '«المملوءة ستصل أولًا. هذا واضح.»']),
      ask: T(['Loud and certain. What is underneath?', 'صوته عالٍ ومتأكد. ما الذي وراء ذلك؟']),
      investigate: {
        clues: [
          clue('hands', ['His hands', 'يداه'], ['What is he doing?', 'ماذا يفعل؟']),
          clue('reason', ['His reason', 'تعليله'], ['"How do you know?"', '«كيف تعرف؟»']),
          clue('drawing', ['His drawing', 'رسمه'], ['What did he draw?', 'ماذا رسم؟']),
        ],
        profiles: [
          profile('sure', 40, 'm3.hamdan:sure', {
            hands: ['Weighing a bottle in each hand like a judge.', 'يزن قارورة في كل يد كأنه حَكَم.'],
            reason: ['"More weight, more pull. Simple."', '«وزن أكثر، جذب أكثر. ببساطة.»'],
            drawing: ['The full bottle far ahead, with speed lines.', 'القارورة المملوءة متقدّمة كثيرًا، مع خطوط السرعة.'],
          }),
          profile('quietright', 30, 'm3.hamdan:quietright', {
            hands: ['He puts the bottles down when the class agrees with him.', 'يضع القارورتين حين يوافقه الصف.'],
            reason: ['Quietly: "Actually my granddad\'s falcon and a stone… I don\'t know."', 'بهدوء: «في الحقيقة صقر جدّي والحجر… لا أعرف.»'],
            drawing: ['Two bottles side by side, then rubbed out.', 'قارورتان جنبًا إلى جنب، ثم مسحهما.'],
          }),
          profile('unsure', 30, 'm3.hamdan:unsure', {
            hands: ['Swapping the bottles from hand to hand.', 'يبدّل القارورتين من يد إلى يد.'],
            reason: ['"Because… everyone says so?"', '«لأن… الكل يقول ذلك؟»'],
            drawing: ['Nothing yet.', 'لا شيء بعد.'],
          }),
        ],
      },
      choices: [
        ch(['"Predict it on paper, then we test"', '«اكتب توقّعك، ثم نجرّب»'], ['Predict and test', 'توقّع ثم جرّب'], 'hTest', { ifFlag: 'm3.hamdan:sure' }),
        ch(['Correct him in front of the class', 'صحّحي له أمام الصف'], ['Correct it', 'تصحيح'], 'hCorrected', { ifFlag: 'm3.hamdan:sure', minutes: 0 }),
        ch(['Pair him with someone who disagrees', 'اجعليه مع من يخالفه الرأي'], ['Teams', 'الفرق'], 'hPair', { ifFlag: 'm3.hamdan:quietright' }),
        ch(['Call on him now', 'اطلبي منه أن يجيب الآن'], ['Call on him', 'النداء بالاسم'], 'hCalled', { ifFlag: 'm3.hamdan:quietright', minutes: 0 }),
        ch(['Give him a prediction card: "I think… because…"', 'أعطيه بطاقة توقّع: «أعتقد… لأن…»'], ['Low-risk start', 'بداية بلا مخاطرة'], 'hCard', { ifFlag: 'm3.hamdan:unsure' }),
        ch(['Let him follow the class', 'دعيه يتبع الصف'], ['Continue', 'متابعة'], 'hFollow', { ifFlag: 'm3.hamdan:unsure', minutes: 0 }),
      ],
    },
    {
      id: 'noura', kind: 'low-participation', on: 'noura',
      line: T(['"…are you sure?"', '«…هل أنتم متأكدون؟»']),
      ask: T(['She said it so quietly only you heard. What\'s behind it?', 'قالتها بصوت خافت لم يسمعه غيركِ. ما الذي وراءها؟']),
      investigate: {
        clues: [
          clue('notebook', ['Notebook', 'الدفتر'], ['What has she written?', 'ماذا كتبت؟']),
          clue('face', ['Her face', 'ملامحها'], ['How does she look?', 'كيف تبدو؟']),
          clue('says', ['What she says', 'ما تقوله'], ['"Tell me more."', '«أخبريني أكثر.»']),
        ],
        profiles: [
          profile('connect', 40, 'm3.noura:connect', {
            notebook: ['"Moon video: hammer + feather = same time."', '«فيديو القمر: المطرقة + الريشة = الوقت نفسه.»'],
            face: ['Bright, waiting for a chance.', 'متحمّسة، تنتظر فرصة.'],
            says: ['"I saw astronauts drop a hammer and a feather. They landed together."', '«رأيت روّاد فضاء يُسقطون مطرقة وريشة، فوصلتا معًا.»'],
          }),
          profile('lost', 30, 'm3.noura:lost', {
            notebook: ['Last lesson\'s page on forces is blank.', 'صفحة درس القوى الماضي فارغة.'],
            face: ['Lost. She is reading other people\'s pages.', 'تائهة، تقرأ صفحات زملائها.'],
            says: ['"I wasn\'t here for forces. What is gravity again?"', '«لم أحضر درس القوى. ما الجاذبية مرة أخرى؟»'],
          }),
          profile('ahead', 30, 'm3.noura:ahead', {
            notebook: ['A neat diagram of air resistance from Grade 6.', 'رسم مرتّب لمقاومة الهواء من الصف السادس.'],
            face: ['Patient, a little bored.', 'صبورة، ومللها قليل.'],
            says: ['"We did this last year. It\'s the air."', '«درسنا هذا العام الماضي. إنه الهواء.»'],
          }),
        ],
      },
      choices: [
        ch(['Put her Moon example on the board', 'اعرضي مثال القمر على السبورة'], ['Present Mode', 'وضع العرض'], 'nMoon', { ifFlag: 'm3.noura:connect' }),
        ch(['"Hold that thought for later"', '«احتفظي بالفكرة لوقت لاحق»'], ['Park it', 'تأجيل'], 'nPark', { ifFlag: 'm3.noura:connect', minutes: 0 }),
        ch(['Guidance: last lesson\'s key idea', 'توجيه: الفكرة الأساسية من الدرس الماضي'], ['Need Help', 'أحتاج مساعدة'], 'nCatch', { ifFlag: 'm3.noura:lost' }),
        ch(['Note it for after the demo', 'دوّنيها لما بعد التجربة'], ['Note for later', 'ملاحظة لاحقة'], 'nNoted', { ifFlag: 'm3.noura:lost', minutes: 0 }),
        ch(['Assign her the parachute question', 'كلّفيها بسؤال المظلّة'], ['Assign', 'التكليف'], 'nChute', { ifFlag: 'm3.noura:ahead' }),
        ch(['"Good. You can help the others."', '«جيد. يمكنكِ مساعدة الآخرين.»'], ['Helper', 'مساعدة'], 'nHelper', { ifFlag: 'm3.noura:ahead', minutes: 0 }),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['The slow-motion clip', 'مقطع الحركة البطيئة']),
      ask: T(['When should the class see it?', 'متى يجب أن يشاهده الصف؟']),
      choices: [
        ch(['After they predict', 'بعد أن يتوقّعوا'], ['Present Mode', 'وضع العرض'], 'lAfter'),
        ch(['Right now, to start', 'الآن، للبداية'], ['Present Mode', 'وضع العرض'], 'lNow', { minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['A rolled-up poster behind the books.', 'ملصق ملفوف خلف الكتب.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Unroll it', 'افتحيه'], ['Hidden discovery', 'اكتشاف مخفي'], 'shPoster', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pFalcon', kind: 'new-event', on: 'hamdan', category: 'learning', weight: 35,
      line: T(['Hamdan: "Then why does my granddad\'s falcon dive so fast?"', 'حمدان: «إذن لماذا ينقضّ صقر جدّي بهذه السرعة؟»']),
      ask: T(['A real question from his own life.', 'سؤال حقيقي من حياته.']),
      choices: [
        ch(['Make it the class\'s question', 'اجعليه سؤال الصف'], ['Student voice', 'صوت الطالب'], 'pfClass'),
        ch(['"Great. Let\'s come back to it."', '«رائع. سنعود إليه.»'], ['Park it', 'تأجيل'], 'pfPark', { minutes: 0 }),
      ],
    },
    {
      id: 'pTables', kind: 'new-event', on: 'sara', category: 'collaboration', weight: 25,
      line: T(['Two tables are arguing about whose bottle landed first.', 'طاولتان تتجادلان: أي قارورة وصلت أولًا.']),
      ask: T(['Nobody can agree what they saw.', 'لا أحد يتفق على ما رآه.']),
      choices: [
        ch(['One drops, one films, one watches the floor', 'واحد يُسقط، وواحد يصوّر، وواحد يراقب الأرض'], ['Teams', 'الفرق'], 'ptRoles'),
        ch(['You drop them yourself', 'أسقطيهما بنفسك'], ['Teacher demo', 'عرض المعلمة'], 'ptDemo', { minutes: 0 }),
      ],
    },
    {
      id: 'pAir', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20, eligible: { notFlags: ['m3.class:ready'] },
      line: T(['A voice: "Air pushes heavy things down harder."', 'صوت: «الهواء يدفع الأشياء الثقيلة إلى الأسفل بقوة أكبر.»']),
      ask: T(['A second misconception, hiding inside the first.', 'فهم خاطئ ثانٍ، يختبئ داخل الأول.']),
      choices: [
        ch(['"Which way does air push?"', '«في أي اتجاه يدفع الهواء؟»'], ['See Why', 'اعرف السبب'], 'paWhy'),
        ch(['Drop a flat sheet and a crumpled one', 'أسقطي ورقة مفرودة وأخرى مكوّرة'], ['Quick demo', 'عرض سريع'], 'paSheets'),
      ],
    },
    {
      id: 'pSpill', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['A bottle lid comes off. Water on the floor.', 'انفتح غطاء قارورة. الماء على الأرض.']),
      ask: T(['Everyone is looking at the puddle.', 'الجميع ينظر إلى البركة.']),
      choices: [
        ch(['Two helpers, one minute, then back', 'مساعدان، دقيقة واحدة، ثم نعود'], ['Quick reset', 'إعادة سريعة'], 'psHelpers'),
        ch(['Use sand bottles instead', 'استخدمي قوارير الرمل بدلًا منها'], ['Swap it', 'استبدال'], 'psSand'),
      ],
    },
  ],
  outcomes: [
    out('boardWhy', 'insight', ['The misconception, out loud', 'الفهم الخاطئ، بصوت مسموع'], ['"More force, so faster." "A rock beats a leaf." Now everyone has said what they think, and they will want to see if they\'re right.', '«قوة أكبر، إذن أسرع.» «الحجر يسبق الورقة.» الآن قال كل واحد ما يعتقده، وسيرغبون في معرفة إن كانوا على حق.'], [fx('sara', 0, 1), fx('hamdan', 0, 1)], { xp: 30, setFlag: 'm3.surfaced' }),
    out('boardTell', 'mixed', ['Shown, not shaken', 'عُرضت، ولم تهزّهم'], ['The clip is clear: they land together. Most of the class nods, and keeps "heavy is faster" in their heads.', 'المقطع واضح: تصلان معًا. يومئ معظم الصف، ويبقى «الثقيل أسرع» في رؤوسهم.'], [], { xp: 30, discover: 'present-mode', setFlag: 'm3.gap' }),
    out('boardSides', 'good', ['Two sides, one test', 'فريقان، وتجربة واحدة'], ['Each side writes its best reason. Then one drop settles it, and the losing side wants to know why.', 'يكتب كل فريق أفضل تعليل لديه. ثم تحسمها قطرة واحدة، والفريق الخاسر يريد أن يعرف السبب.'], [fx('hamdan', 1, 1), fx('sara', 1, 0)], { xp: 30, discover: 'teams', setFlag: 'm3.peerVoice' }),
    out('boardDeeper', 'good', ['A deeper question', 'سؤال أعمق'], ['"Today: when DOES air make the difference?" Up on the board. The class that knew the answer has something new to find.', '«اليوم: متى يُحدث الهواء الفرق؟» على السبورة. والصف الذي يعرف الإجابة لديه شيء جديد ليكتشفه.'], [fx('noura', 1, 1)], { xp: 30, discover: 'present-mode', setFlag: 'm3.surfaced' }),
    out('boardAgain', 'mixed', ['Proving what they knew', 'إثبات ما يعرفونه'], ['The demo works. Twenty-one students watch something they already knew.', 'التجربة تنجح. وواحد وعشرون طالبًا يشاهدون شيئًا يعرفونه مسبقًا.'], [fx('noura', 0, -1)], { xp: 30 }),
    out('sWhy', 'insight', ['Light, or air?', 'الخفّة أم الهواء؟'], ['"Is the feather slow because it\'s light?" She thinks. "If I crumpled it… no, it\'s still light." She is ready to test it.', '«هل الريشة بطيئة لأنها خفيفة؟» تفكّر. «لو كوّرتها… لا، ستبقى خفيفة.» صارت مستعدة لتجرّب.'], [fx('sara', 1, 1)], { xp: 30, discover: 'see-why', setFlag: 'm3.surfaced' }),
    out('sTold', 'mixed', ['Told, and filed away', 'سمعتها وحفظتها'], ['She writes "same time" next to "heavy = fast". Both are in her book now.', 'تكتب «في الوقت نفسه» بجانب «الثقيل = أسرع». الاثنتان في دفترها الآن.'], [], { xp: 30, setFlag: 'm3.gap' }),
    out('sAi', 'good', ['Mass, in her words', 'الكتلة، بكلماتها'], ['She asks what "mass" means and says it back: "how much stuff, not how hard it pulls". Now the question makes sense.', 'تسأل عن معنى «الكتلة» وتعيده بكلماتها: «كم فيه من مادة، لا كم يجذبه.» الآن صار للسؤال معنى.'], [fx('sara', 1, 1)], { xp: 30, discover: 'ai-helper' }),
    out('sHelp', 'good', ['The word card', 'بطاقة المفردات'], ['Mass, weight, force: one line each, with a picture. She uses all three in her prediction.', 'الكتلة، الوزن، القوة: سطر واحد لكل منها مع صورة. وتستخدم الثلاث في توقّعها.'], [fx('sara', 1, 1)], { xp: 30, discover: 'need-help' }),
    out('sDesign', 'good', ['Sara designs the test', 'سارة تصمّم التجربة'], ['"Same bottle, same height, one full, one empty, drop together." The class uses her test.', '«القارورة نفسها، والارتفاع نفسه، واحدة مملوءة وواحدة فارغة، ونُسقطهما معًا.» يستخدم الصف تجربتها.'], [fx('sara', 1, 2)], { xp: 30, setFlag: 'm3.peerVoice' }),
    out('sOn', 'mixed', ['Her good idea, unheard', 'فكرتها الجيدة، لم يسمعها أحد'], ['She was nearly there on her own. Nobody else will hear how she got there.', 'كانت قد اقتربت وحدها، لكن أحدًا لن يسمع كيف وصلت.'], [], { xp: 30 }),
    out('hTest', 'good', ['Predicted, then shaken', 'توقّع، ثم اهتزّ'], ['He writes "full one, by a mile". They land together. "Again!" Again, together. Now he really wants to know why.', 'يكتب «المملوءة، بفارق كبير». تصلان معًا. «مرة أخرى!» ومرة أخرى معًا. الآن يريد فعلًا أن يعرف السبب.'], [fx('hamdan', 1, 1)], { xp: 30, setFlag: 'm3.surfaced' }),
    out('hCorrected', 'mixed', ['Corrected, and quieter', 'صُحّح، وصار أهدأ'], ['He goes red and stops offering ideas for the rest of the lesson.', 'يحمرّ وجهه ويتوقّف عن طرح الأفكار بقية الحصة.'], [fx('hamdan', 0, -2)], { xp: 30, setFlag: 'm3.gap' }),
    out('hPair', 'good', ['His doubt, said out loud', 'شكّه، بصوت مسموع'], ['With a partner who disagrees, he admits it: "My granddad\'s falcon and a stone, I\'m not sure." His doubt starts the best argument at the table.', 'مع زميل يخالفه، يعترف: «صقر جدّي والحجر، لست متأكدًا.» وشكّه يفتح أفضل نقاش على الطاولة.'], [fx('hamdan', 1, 1)], { xp: 30, discover: 'teams', setFlag: 'm3.peerVoice' }),
    out('hCalled', 'mixed', ['He says what the class says', 'يقول ما يقوله الصف'], ['Put on the spot, he gives the safe answer: "heavy is faster". His real doubt stays hidden.', 'حين وُضع في الموقف، أعطى الإجابة الآمنة: «الثقيل أسرع». وبقي شكّه الحقيقي مخفيًا.'], [], { xp: 30 }),
    out('hCard', 'good', ['"I think… because…"', '«أعتقد… لأن…»'], ['"I think the full one, because everyone says." Honest, and now testable.', '«أعتقد المملوءة، لأن الجميع يقول ذلك.» صادق، وقابل للتجربة الآن.'], [fx('hamdan', 1, 0)], { xp: 30 }),
    out('hFollow', 'mixed', ['Borrowed idea', 'فكرة مستعارة'], ['He agrees with whoever spoke last.', 'يوافق آخر من تكلّم.'], [], { xp: 30, setFlag: 'm3.gap' }),
    out('nMoon', 'good', ['The Moon, on the board', 'القمر على السبورة'], ['A photo of the astronaut\'s hammer and feather, and Noura\'s sentence under it. The class goes quiet: no air on the Moon.', 'صورة مطرقة رائد الفضاء وريشته، وتحتها جملة نورة. يصمت الصف: لا هواء على القمر.'], [fx('noura', 1, 2)], { xp: 30, discover: 'present-mode', setFlag: 'm3.peerVoice' }),
    out('nPark', 'mixed', ['The best example, parked', 'أفضل مثال، مؤجّل'], ['She nods and says nothing else today.', 'تومئ، ولا تقول شيئًا آخر اليوم.'], [fx('noura', 0, -1)], { xp: 30 }),
    out('nCatch', 'good', ['Gravity in one line', 'الجاذبية في سطر واحد'], ['"Gravity pulls everything down." One line, one picture from the last lesson. Now she can join in.', '«الجاذبية تجذب كل شيء إلى الأسفل.» سطر واحد وصورة واحدة من الدرس الماضي. الآن تستطيع المشاركة.'], [fx('noura', 1, 1)], { xp: 30, discover: 'need-help' }),
    out('nNoted', 'mixed', ['Watching without the basics', 'تشاهد دون الأساس'], ['She will see the drop without knowing what pulls the bottles down.', 'ستشاهد السقوط دون أن تعرف ما الذي يجذب القارورتين.'], [], { xp: 30, setFlag: 'm3.gap' }),
    out('nChute', 'good', ['The parachute question', 'سؤال المظلّة'], ['"Design a parachute that makes the full bottle land last." She is sketching before you finish the sentence.', '«صمّمي مظلّة تجعل القارورة المملوءة تصل أخيرًا.» تبدأ بالرسم قبل أن تنهي جملتك.'], [fx('noura', 1, 2)], { xp: 30, discover: 'assign' }),
    out('nHelper', 'mixed', ['Helper, not learner', 'مساعدة، لا متعلّمة'], ['She helps patiently. She learns nothing new today.', 'تساعد بصبر، لكنها لا تتعلّم شيئًا جديدًا اليوم.'], [], { xp: 30 }),
    out('lAfter', 'good', ['Prediction first, then proof', 'التوقّع أولًا، ثم الدليل'], ['Every prediction is on paper before the clip plays. When it plays, half the room gasps.', 'كل التوقّعات مكتوبة قبل تشغيل المقطع. وحين يُعرض، يشهق نصف الصف.'], [fx('hamdan', 0, 1)], { discover: 'present-mode', setFlag: 'm3.surfaced' }),
    out('lNow', 'mixed', ['Answer before question', 'الإجابة قبل السؤال'], ['The clip shows the answer before anyone has thought about the question.', 'المقطع يعرض الإجابة قبل أن يفكّر أحد في السؤال.'], [], { discover: 'present-mode' }),
    out('shPoster', 'insight', ['Galileo, in Arabic and English', 'غاليليو بالعربية والإنجليزية'], ['An old poster of the Leaning Tower experiment, with a student\'s note: "Did he really do it?" A good question for tomorrow. It goes in your notebook.', 'ملصق قديم لتجربة برج بيزا المائل، وعليه ملاحظة طالب: «هل أجراها فعلًا؟» سؤال جيد للغد. يُحفظ في دفتركِ.'], [], { setFlag: 'm3.poster' }),
    out('pfClass', 'good', ['The falcon question', 'سؤال الصقر'], ['"Falcons fold their wings to dive." The class works out that shape, not weight, wins the race.', '«الصقور تضمّ أجنحتها لتنقضّ.» يستنتج الصف أن الشكل، لا الوزن، هو ما يكسب السباق.'], [fx('hamdan', 1, 2)], { setFlag: 'm3.peerVoice' }),
    out('pfPark', 'mixed', ['Saved for later', 'محفوظ لوقت لاحق'], ['He writes "falcon?" in the margin and waits.', 'يكتب «الصقر؟» على الهامش وينتظر.'], []),
    out('ptRoles', 'good', ['A fair test, with jobs', 'تجربة عادلة، بمهام'], ['One drops, one films in slow motion, one watches the floor. The film settles it.', 'واحد يُسقط، وواحد يصوّر بالحركة البطيئة، وواحد يراقب الأرض. والتصوير يحسم الأمر.'], [fx('sara', 1, 1)], { discover: 'teams', setFlag: 'm3.peerVoice' }),
    out('ptDemo', 'mixed', ['Settled by you', 'حسمتِه أنتِ'], ['Your drop is clean. Their argument ends without either table finding out for itself.', 'إسقاطكِ دقيق. وينتهي جدالهما دون أن تكتشف أي طاولة بنفسها.'], []),
    out('paWhy', 'insight', ['Air pushes up', 'الهواء يدفع إلى الأعلى'], ['"Up, against the fall." The class sees air as a brake, not a push.', '«إلى الأعلى، عكس السقوط.» يرى الصف الهواء كمكبح، لا كدافع.'], [fx('sara', 1, 0)], { discover: 'see-why' }),
    out('paSheets', 'good', ['Same paper, different fall', 'الورقة نفسها، وسقوط مختلف'], ['Same weight, different shape: the crumpled sheet wins. "So it IS the air!"', 'الوزن نفسه والشكل مختلف: الورقة المكوّرة تسبق. «إذن إنه الهواء فعلًا!»'], [fx('hamdan', 1, 0)]),
    out('psHelpers', 'good', ['One minute, back on track', 'دقيقة واحدة، ونعود'], ['Two helpers, a cloth, and the lesson goes on.', 'مساعدان وقطعة قماش، ويستمر الدرس.'], []),
    out('psSand', 'good', ['Sand bottles', 'قوارير الرمل'], ['Sand instead of water: same test, no puddles.', 'رمل بدل الماء: التجربة نفسها، دون برك.'], []),
  ],
  endings: [
    {
      id: 'not-yet-shaken', title: T(['Not Yet Shaken', 'لم يهتزّ بعد']), priority: 1, when: { flags: ['m3.gap'] }, opens: ['m6'],
      narration: T(['Some students saw the answer and kept their old idea. Next time, find out what they really think at the end, not just the start.', 'رأى بعض الطلاب الإجابة واحتفظوا بفكرتهم القديمة. في المرة القادمة، اكتشفي ما يعتقدونه فعلًا في النهاية، لا في البداية فقط.']),
    },
    {
      id: 'class-taught-itself', title: T(['The Class Taught Itself', 'الصف علّم نفسه']), priority: 2, when: { flags: ['m3.peerVoice'] }, opens: ['m7'],
      narration: T(['Students\' own examples and arguments moved the class further than any slide.', 'أمثلة الطلاب ونقاشاتهم أخذت الصف أبعد من أي شريحة عرض.']),
    },
    {
      id: 'learning-alive', title: T(['Learning Comes Alive', 'التعلّم ينبض بالحياة']), priority: 3, when: { notFlags: ['m3.gap'] }, badge: 'brought-to-life', opens: ['m6', 'm7'],
      narration: T(['They said what they believed, tested it, and changed their minds with their own eyes.', 'قالوا ما يعتقدونه، وجرّبوه، وغيّروا رأيهم بأعينهم.']),
    },
  ],
  badges: [
    { id: 'brought-to-life', title: T(['Brought to Life', 'أحييتِ الدرس']), why: T(['You surfaced the class\'s idea before you taught.', 'أظهرتِ فكرة الصف قبل أن تشرحي.']), icon: '✦', when: { flag: 'm3.surfaced' } },
    { id: 'started-from-them', title: T(['Started From Them', 'بدأتِ منهم']), why: T(['A student\'s example or argument carried the lesson.', 'مثال طالب أو حجّته حملت الدرس.']), icon: '◎', when: { flag: 'm3.peerVoice' } },
    { id: 'm3-spark', title: T(['Lit the Spark', 'أشعلتِ الشرارة']), why: T(['You asked what they thought before you told them.', 'سألتِهم عمّا يعتقدون قبل أن تخبريهم.']), icon: '◔', when: 'always' },
  ],
  communityTopic: T(['Starting from what students think', 'البدء مما يعتقده الطلاب']),
  communityExamples: [
    { who: T(['Science teacher · Abu Dhabi', 'معلمة علوم · أبوظبي']), text: T(['Predictions go on paper before any demo. The gasp when they\'re wrong is the lesson.', 'التوقّعات تُكتب قبل أي تجربة. والشهقة حين يخطئون هي الدرس.']) },
    { who: T(['Grade 7 teacher · Sharjah', 'معلم الصف السابع · الشارقة']), text: T(['I ask "why do you think so?" and then I say nothing for ten seconds. It\'s hard. It works.', 'أسأل «لماذا تعتقدون ذلك؟» ثم أصمت عشر ثوانٍ. صعب، لكنه ينجح.']) },
  ],
  teaser: [
    { ifFlag: 'm3.gap', text: T(['Some old ideas survived the demo. Next: how do you know what they really learned?', 'نجت بعض الأفكار القديمة من التجربة. والقادم: كيف تعرفين ما تعلّموه فعلًا؟']) },
    { ifFlag: 'm3.peerVoice', text: T(['The class taught itself today. Next: preparing every one of them for the test.', 'علّم الصف نفسه اليوم. والقادم: إعداد كل واحد منهم للاختبار.']) },
    { text: T(['The lesson came alive. Next: read the evidence it left behind.', 'نبض الدرس بالحياة. والقادم: اقرئي الأدلة التي تركها.']) },
  ],
};
