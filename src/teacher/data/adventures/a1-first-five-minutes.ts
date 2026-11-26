/**
 * Mission 01 — The First Five Minutes (MVP). Grade 7 · Math (ratios: today
 * unit rates, yesterday equivalent ratios). Source: docs/product/ALEF_PROPOSAL.md.
 *
 * Untimed (`timed: false`): "five minutes" is the story, not a clock.
 * Students are investigations: one coherent evidence profile is drawn per
 * encounter (weights below), every clue agrees with it, and the choices
 * offered depend on the profile flag. Outcomes follow the choice, never a
 * random draw. Weighted pool events (category + weight + eligibility) are
 * drawn after each student encounter. Endings close the mission at the
 * milestone "all three students' starting points found".
 * Branch map + engine assumptions: docs/content/TEACHER_CONTENT.md#m01
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A1: Adventure = {
  id: 'a1',
  number: 1,
  title: t('The First Five Minutes', 'الدقائق الخمس الأولى'),
  meta: t('Mission 01 · Grade 7 · Math', 'المهمة ٠١ · الصف السابع · الرياضيات'),
  location: 'grade7',
  scene: 'teacher/scenes/m01.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'The first five minutes are for finding out where each student is starting, then choosing the right next step for each.',
    'الدقائق الخمس الأولى لاكتشاف نقطة انطلاق كل طالب، ثم اختيار الخطوة التالية المناسبة لكل واحد.',
  ),
  film: [
    {
      picture: 'teacher/film/m01-1.jpg',
      narration: t('Morning. Ms. Mariam arrives at her Grade 7 classroom.', 'الصباح. تصل الأستاذة مريم إلى فصل الصف السابع.'),
    },
    {
      picture: 'teacher/film/m01-2.jpg',
      narration: t('The students come in, bags down, talking.', 'يدخل الطلاب، يضعون حقائبهم، ويتحدثون.'),
    },
    {
      picture: 'teacher/film/m01-3.jpg',
      who: 'ahmed',
      line: t('Miss, I already know today\'s topic!', 'أستاذة، أنا أعرف درس اليوم من قبل!'),
    },
    {
      picture: 'teacher/film/m01-3.jpg',
      who: 'sara',
      line: t('Miss, I still don\'t understand what we learned yesterday.', 'أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.'),
    },
    {
      picture: 'teacher/film/m01-3.jpg',
      who: 'omar',
      line: t('Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟'),
    },
    {
      picture: 'teacher/film/m01-4.jpg',
      narration: t('Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟'),
    },
    {
      picture: 'teacher/film/m01-5.jpg',
      narration: t('Tap a student or an object in the classroom.', 'اضغطي على طالب أو على شيء في الفصل.'),
    },
  ],
  intro: [
    t('MISSION 01 | The First Five Minutes', 'المهمة ٠١ | الدقائق الخمس الأولى'),
    t('Your classroom. Your decisions. Your adventure.', 'صفّك. قراراتك. مغامرتك.'),
  ],
  introBubbles: [
    { student: 'ahmed', line: t('Miss, I already know today\'s topic!', 'أستاذة، أنا أعرف درس اليوم من قبل!') },
    { student: 'sara', line: t('Miss, I still don\'t understand what we learned yesterday.', 'أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.') },
    { student: 'omar', line: t('Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟') },
  ],
  students: [
    {
      id: 'ahmed', name: t('Ahmed', 'أحمد'), x: 64, y: 50, understanding: 2, engagement: 2,
      idle: t('Ahmed has already opened today\'s lesson on his tablet.', 'فتح أحمد درس اليوم على جهازه اللوحي.'),
      homeNote: t(
        'His older brother is in Grade 9 and often shows him next year\'s maths at home.',
        'أخوه الأكبر في الصف التاسع، وكثيرًا ما يريه رياضيات السنوات القادمة في البيت.',
      ),
    },
    {
      id: 'sara', name: t('Sara', 'سارة'), x: 34, y: 58, understanding: 1, engagement: 2,
      idle: t('Sara is flicking back through yesterday\'s pages.', 'سارة تقلّب صفحات درس الأمس.'),
      homeNote: t(
        'She looks after her younger brothers after school most days, so homework is done late.',
        'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.',
      ),
    },
    {
      id: 'omar', name: t('Omar', 'عمر'), x: 18, y: 44, understanding: 1, engagement: 1,
      idle: t('Omar is sitting quietly by the window.', 'عمر جالس بهدوء قرب النافذة.'),
      homeNote: t(
        'His dad works night shifts, so mornings at home are rushed.',
        'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.',
      ),
    },
  ],
  objects: [
    {
      id: 'laptop', label: t('Laptop', 'الحاسوب المحمول'), icon: '▣', x: 82, y: 64,
      idle: t('Your lesson plan for today is open.', 'خطة درس اليوم مفتوحة.'),
    },
    {
      id: 'board', label: t('Board', 'السبورة'), icon: '▭', x: 50, y: 16,
      idle: t('The board is clean. Nothing on it yet.', 'السبورة نظيفة. لا شيء عليها بعد.'),
    },
    {
      id: 'bookshelf', label: t('Bookshelf', 'رفّ الكتب'), icon: '▥', x: 10, y: 30,
      idle: t('Old textbooks, a globe, and something tucked behind the atlas.', 'كتب قديمة، وكرة أرضية، وشيء مخبّأ خلف الأطلس.'),
    },
  ],
  /* Hotspots are all open from the start; the player chooses the order. */
  schedule: [
    { event: 'ahmed', at: 0 },
    { event: 'sara', at: 0 },
    { event: 'omar', at: 0 },
    { event: 'laptop', at: 0 },
    { event: 'board', at: 0 },
    { event: 'bookshelf', at: 0 },
  ],
  events: [
    /* ------------------------------------------------ Ahmed */
    {
      id: 'ahmed',
      kind: 'early-finisher',
      on: 'ahmed',
      line: t('"Miss, I already know today\'s topic!"', '«أستاذة، أنا أعرف درس اليوم من قبل!»'),
      ask: t(
        'The Confidence Detective: look at three pieces of evidence before you decide what he needs.',
        'محقّق الثقة: انظري إلى ثلاثة أدلة قبل أن تقرّري ما يحتاجه.',
      ),
      investigate: {
        clues: [
          { id: 'answer', label: t('His answer', 'إجابته'), text: t('"6 juice boxes cost 12 dirhams. How much is one?"', '«٦ علب عصير ثمنها ١٢ درهمًا. كم ثمن العلبة الواحدة؟»') },
          { id: 'explain', label: t('His explanation', 'شرحه'), text: t('"How did you work it out?"', '«كيف توصّلت إلى ذلك؟»') },
          { id: 'apply', label: t('A new problem', 'مسألة جديدة'), text: t('"Which is better value: 5 for 12 dirhams or 3 for 7?"', '«أيهما أوفر: ٥ بـ١٢ درهمًا أم ٣ بـ٧؟»') },
        ],
        profiles: [
          {
            id: 'strong', weight: 35, setFlag: 'a1.ahmed:strong',
            clues: {
              answer: t('"2 dirhams." Correct, in seconds.', '«درهمان.» صحيحة، في ثوانٍ.'),
              explain: t('"You share the cost between the boxes: 12 divided by 6."', '«نقسم الثمن على العلب: ١٢ ÷ ٦.»'),
              apply: t('"2.40 each against 2.33 each, so 3 for 7 is better." Right, and he says why.', '«٢٫٤٠ للعلبة مقابل ٢٫٣٣، إذن ٣ بـ٧ أوفر.» صحيحة، ويقول السبب.'),
            },
          },
          {
            id: 'shallow', weight: 25, setFlag: 'a1.ahmed:shallow',
            clues: {
              answer: t('"2 dirhams." Correct.', '«درهمان.» صحيحة.'),
              explain: t('"You always divide the big number by the small number."', '«دائمًا نقسم العدد الكبير على الصغير.»'),
              apply: t('For "12 boxes for 6 dirhams" he writes "2 dirhams each". His rule gives the wrong answer.', 'في «١٢ علبة بـ٦ دراهم» يكتب «درهمان للعلبة». قاعدته تعطي إجابة خاطئة.'),
            },
          },
          {
            id: 'prior', weight: 20, setFlag: 'a1.ahmed:prior',
            clues: {
              answer: t('"2 dirhams." Correct: 12 divides by 6.', '«درهمان.» صحيحة: ١٢ تقبل القسمة على ٦.'),
              explain: t('"Cost divided by boxes." Clear.', '«الثمن تقسيم عدد العلب.» واضح.'),
              apply: t('"3 for 7? 7 doesn\'t go into 3… I can\'t do that one." Dividing into decimals stops him.', '«٣ بـ٧؟ لا يمكن قسمة ٧ على ٣… لا أستطيع حلّها.» القسمة بالكسور العشرية توقفه.'),
            },
          },
          {
            id: 'peer', weight: 20, setFlag: 'a1.ahmed:peer',
            clues: {
              answer: t('"2 dirhams." Correct.', '«درهمان.» صحيحة.'),
              explain: t('"Share the cost between the boxes." Clear.', '«نقسم الثمن على العلب.» واضح.'),
              apply: t('He solves it, then: "Omar asked me how I did the first one. I showed him with the juice boxes."', 'يحلّها، ثم يقول: «سألني عمر كيف حللت الأولى، فشرحتها له بعلب العصير.»'),
            },
          },
        ],
      },
      choices: [
        { ifFlag: 'a1.ahmed:strong', label: t('Assign him a challenge', 'كلّفيه بتحدٍّ'), sub: t('Assign', 'التكليف'), minutes: 1, outcome: 'ahmedExtend' },
        { ifFlag: 'a1.ahmed:strong', label: t('Let him start the main task now', 'دعيه يبدأ المهمة الرئيسية الآن'), sub: t('Main task', 'المهمة الرئيسية'), minutes: 0, outcome: 'ahmedAhead' },
        { ifFlag: 'a1.ahmed:shallow', label: t('"Why does that rule work?"', '«لماذا تنجح هذه القاعدة؟»'), sub: t('See Why', 'اعرف السبب'), minutes: 1, outcome: 'ahmedSeeWhy' },
        { ifFlag: 'a1.ahmed:shallow', label: t('Give him the harder task anyway', 'أعطيه المهمة الأصعب على أي حال'), sub: t('Challenge', 'تحدٍّ'), minutes: 0, outcome: 'ahmedRuleBreaks' },
        { ifFlag: 'a1.ahmed:prior', label: t('Two-minute refresher: dividing into decimals', 'تذكير في دقيقتين: القسمة بالكسور العشرية'), sub: t('Targeted support', 'دعم موجّه'), minutes: 1, outcome: 'ahmedRefresher' },
        { ifFlag: 'a1.ahmed:prior', label: t('Note it; come back after the launch', 'دوّنيها وعودي إليها بعد الافتتاح'), sub: t('Note for later', 'ملاحظة لاحقة'), minutes: 0, outcome: 'ahmedNoted' },
        { ifFlag: 'a1.ahmed:peer', label: t('Make it official: pair them up', 'اجعليها رسمية: ثنائي'), sub: t('Teams', 'الفرق'), minutes: 1, outcome: 'ahmedTeams' },
        { ifFlag: 'a1.ahmed:peer', label: t('"Let Omar try the next one first"', '«دع عمر يجرّب التالية أولًا»'), sub: t('Coach the helper', 'وجّهي المساعد'), minutes: 0, outcome: 'ahmedCoach' },
      ],
    },
    /* ------------------------------------------------ Sara */
    {
      id: 'sara',
      kind: 'needs-help',
      on: 'sara',
      line: t('"Miss, I still don\'t understand what we learned yesterday."', '«أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.»'),
      ask: t(
        'Find the Missing Piece: look at her notebook, her tablet, and what she says.',
        'ابحثي عن القطعة الناقصة: انظري إلى دفترها، وجهازها اللوحي، وما تقوله.',
      ),
      investigate: {
        clues: [
          { id: 'notebook', label: t('Notebook', 'الدفتر'), text: t('Yesterday: equivalent ratios.', 'درس الأمس: النسب المتكافئة.') },
          { id: 'tablet', label: t('Tablet', 'الجهاز اللوحي'), text: t('Yesterday\'s practice questions.', 'أسئلة التدريب من الأمس.') },
          { id: 'bubble', label: t('What she says', 'ما تقوله'), text: t('"What part don\'t you understand?"', '«أي جزء لم تفهميه؟»') },
        ],
        profiles: [
          {
            id: 'prerequisite', weight: 30, setFlag: 'a1.sara:prerequisite',
            clues: {
              notebook: t('The ratio table stops after the first row, where 4:6 had to become 2:3.', 'جدول النسب يتوقّف بعد الصف الأول، حيث كان يجب أن تصبح ٤:٦ هي ٢:٣.'),
              tablet: t('She stopped at question 2, the first one that needed simplifying.', 'توقّفت عند السؤال ٢، أول سؤال يحتاج إلى تبسيط.'),
              bubble: t('"How can 4:6 be the same as 2:3? They\'re different numbers."', '«كيف تكون ٤:٦ مثل ٢:٣؟ إنها أعداد مختلفة.»'),
            },
          },
          {
            id: 'misconception', weight: 25, setFlag: 'a1.sara:misconception',
            clues: {
              notebook: t('"2:3 = 4:5 = 6:7", neatly, all the way down.', '«٢:٣ = ٤:٥ = ٦:٧»، بخط مرتّب حتى آخر الصفحة.'),
              tablet: t('The same mistake three times: she adds the same number to both parts.', 'الخطأ نفسه ثلاث مرات: تضيف العدد نفسه إلى الطرفين.'),
              bubble: t('"You add the same to both sides, so it stays fair. Right?"', '«نضيف العدد نفسه إلى الطرفين حتى تبقى عادلة. صح؟»'),
            },
          },
          {
            id: 'task', weight: 25, setFlag: 'a1.sara:task',
            clues: {
              notebook: t('Yesterday\'s worked examples are all correct.', 'كل الأمثلة المحلولة من الأمس صحيحة.'),
              tablet: t('The practice task is open, the instructions highlighted, the answer boxes empty.', 'مهمة التدريب مفتوحة، والتعليمات مظلّلة، وخانات الإجابة فارغة.'),
              bubble: t('"I can do ratios. I just don\'t know what this question wants me to do."', '«أعرف النسب. لكنني لا أعرف ماذا يريد مني هذا السؤال.»'),
            },
          },
          {
            id: 'practice', weight: 20, setFlag: 'a1.sara:practice',
            clues: {
              notebook: t('Correct answers, with a lot of crossing out.', 'إجابات صحيحة، مع كثير من الشطب.'),
              tablet: t('6 out of 8 right, slowly, with two answers changed at the last second.', '٦ من ٨ صحيحة، ببطء، وإجابتان غيّرتهما في اللحظة الأخيرة.'),
              bubble: t('"I think I get it. I\'m just not sure I\'ll remember."', '«أظن أنني فهمت. لكنني لست متأكدة أنني سأتذكّر.»'),
            },
          },
        ],
      },
      choices: [
        { ifFlag: 'a1.sara:prerequisite', label: t('Go back one step: simplify 4:6 together', 'عودي خطوة: لنبسّط ٤:٦ معًا'), sub: t('Readiness support', 'دعم الاستعداد'), minutes: 1, outcome: 'saraBridge' },
        { ifFlag: 'a1.sara:prerequisite', label: t('Start the new topic; she\'ll catch up', 'ابدئي الموضوع الجديد، وستلحق'), sub: t('Continue', 'متابعة'), minutes: 0, outcome: 'saraLater' },
        { ifFlag: 'a1.sara:misconception', label: t('"Show me how you got 4:5"', '«أريني كيف وصلتِ إلى ٤:٥»'), sub: t('See Why', 'اعرف السبب'), minutes: 1, outcome: 'saraSeeWhy' },
        { ifFlag: 'a1.sara:misconception', label: t('Show her the rule again', 'أعيدي لها القاعدة'), sub: t('Re-explain', 'إعادة الشرح'), minutes: 1, outcome: 'saraRule' },
        { ifFlag: 'a1.sara:task', label: t('Guide her on what the task asks', 'وجّهيها إلى المطلوب في المهمة'), sub: t('Need Help', 'أحتاج مساعدة'), minutes: 1, outcome: 'saraNeedHelp' },
        { ifFlag: 'a1.sara:task', label: t('Let her ask what the question means', 'دعيها تسأل عن معنى السؤال'), sub: t('AI Helper', 'المساعد الذكي'), minutes: 1, outcome: 'saraAiHelper' },
        { ifFlag: 'a1.sara:practice', label: t('A short practice set first', 'مجموعة تدريب قصيرة أولًا'), sub: t('Practice', 'التدريب'), minutes: 1, outcome: 'saraPractice' },
        { ifFlag: 'a1.sara:practice', label: t('"You\'ve got this. Let\'s go on."', '«أنتِ قادرة. لنتابع.»'), sub: t('Encourage', 'تشجيع'), minutes: 0, outcome: 'saraTrust' },
      ],
    },
    /* ------------------------------------------------ Omar */
    {
      id: 'omar',
      kind: 'low-participation',
      on: 'omar',
      line: t('"Miss, what are we doing today?"', '«أستاذة، ماذا سنفعل اليوم؟»'),
      ask: t(
        'What\'s Behind the Silence? Look before you decide why he hasn\'t started.',
        'ما وراء الصمت؟ انظري قبل أن تقرّري لماذا لم يبدأ.',
      ),
      investigate: {
        clues: [
          { id: 'desk', label: t('His desk', 'طاولته'), text: t('What is on his desk?', 'ماذا على طاولته؟') },
          { id: 'face', label: t('Where he\'s looking', 'إلى أين ينظر'), text: t('Where is his attention?', 'أين انتباهه؟') },
          { id: 'reply', label: t('What he says', 'ما يقوله'), text: t('"Are you OK, Omar?"', '«هل أنت بخير يا عمر؟»') },
        ],
        profiles: [
          {
            id: 'goal', weight: 30, setFlag: 'a1.omar:goal',
            clues: {
              desk: t('His book is open on the wrong chapter.', 'كتابه مفتوح على الفصل الخطأ.'),
              face: t('He keeps looking at the empty board, then at the others.', 'ينظر إلى السبورة الفارغة، ثم إلى زملائه.'),
              reply: t('"I don\'t know what we\'re supposed to learn today."', '«لا أعرف ماذا يُفترض أن نتعلّم اليوم.»'),
            },
          },
          {
            id: 'prior', weight: 25, setFlag: 'a1.omar:prior',
            clues: {
              desk: t('Yesterday\'s sheet, only the first question done, in someone else\'s handwriting.', 'ورقة الأمس، والسؤال الأول فقط محلول، بخط شخص آخر.'),
              face: t('He frowns at Ahmed\'s screen: today builds on yesterday.', 'يعبس وهو ينظر إلى شاشة أحمد: درس اليوم مبني على درس الأمس.'),
              reply: t('"I wasn\'t here yesterday. I was at the dentist."', '«لم أكن هنا أمس. كان عندي موعد عند طبيب الأسنان.»'),
            },
          },
          {
            id: 'confidence', weight: 25, setFlag: 'a1.omar:confidence',
            clues: {
              desk: t('An answer, written and rubbed out. You can still read it.', 'إجابة مكتوبة ثم ممسوحة. ما زال بالإمكان قراءتها.'),
              face: t('He looks down whenever you look his way.', 'ينظر إلى الأسفل كلما نظرتِ نحوه.'),
              reply: t('"I\'ll probably get it wrong."', '«غالبًا سأخطئ.»'),
            },
          },
          {
            id: 'distracted', weight: 20, setFlag: 'a1.omar:distracted',
            clues: {
              desk: t('A football pitch drawn in the margin.', 'ملعب كرة قدم مرسوم على الهامش.'),
              face: t('Out of the window: they are setting up for sports day.', 'ينظر من النافذة: إنهم يجهّزون ليوم الرياضة.'),
              reply: t('"Is the race today, Miss?"', '«هل السباق اليوم يا أستاذة؟»'),
            },
          },
        ],
      },
      choices: [
        { ifFlag: 'a1.omar:goal', label: t('Put today\'s learning intention up for everyone', 'اعرضي هدف التعلّم للجميع'), sub: t('Present Mode', 'وضع العرض'), minutes: 1, outcome: 'omarIntention' },
        { ifFlag: 'a1.omar:goal', label: t('Tell him quietly what today is about', 'أخبريه بهدوء عن موضوع اليوم'), sub: t('One-to-one', 'حديث فردي'), minutes: 0, outcome: 'omarWhisper' },
        { ifFlag: 'a1.omar:prior', label: t('Show him yesterday\'s key example', 'أريه المثال الأساسي من الأمس'), sub: t('Catch-up', 'تعويض'), minutes: 1, outcome: 'omarCatchUp' },
        { ifFlag: 'a1.omar:prior', label: t('Note it for after the launch', 'دوّنيها لما بعد الافتتاح'), sub: t('Note for later', 'ملاحظة لاحقة'), minutes: 0, outcome: 'omarNoted' },
        { ifFlag: 'a1.omar:confidence', label: t('"Everyone write one guess. No names."', '«ليكتب كل واحد تخمينًا. دون أسماء.»'), sub: t('Low-risk start', 'بداية بلا مخاطرة'), minutes: 1, outcome: 'omarLowRisk' },
        { ifFlag: 'a1.omar:confidence', label: t('Tell a partner first', 'أخبر زميلك أولًا'), sub: t('Teams', 'الفرق'), minutes: 1, outcome: 'omarPartner' },
        { ifFlag: 'a1.omar:distracted', label: t('"Sports day! Who\'s faster, in metres per second?"', '«يوم الرياضة! من الأسرع، بالأمتار في الثانية؟»'), sub: t('Connect to the day', 'ربط بيومه'), minutes: 1, outcome: 'omarHook' },
        { ifFlag: 'a1.omar:distracted', label: t('Move him nearer the board', 'انقليه قرب السبورة'), sub: t('Move closer', 'تقريبه'), minutes: 0, outcome: 'omarSeat' },
      ],
    },
    {
      id: 'omarGuess',
      kind: 'new-event',
      on: 'omar',
      line: t('Omar\'s guess: "2:3 is the same as 3:4."', 'تخمين عمر: «٢:٣ هي نفسها ٣:٤.»'),
      ask: t(
        'His first contribution today, and it hides a misconception. What\'s behind it?',
        'أول مشاركة له اليوم، وتخفي فهمًا خاطئًا. ما الذي وراءها؟',
      ),
      investigate: {
        clues: [
          { id: 'note', label: t('His sticky note', 'ورقته اللاصقة'), text: t('What did he write?', 'ماذا كتب؟') },
          { id: 'why', label: t('"Why that one?"', '«لماذا هذه؟»'), text: t('Ask him how he chose it.', 'اسأليه كيف اختارها.') },
        ],
        profiles: [
          {
            id: 'additive', weight: 1, setFlag: 'a1.omarGuess:additive',
            clues: {
              note: t('"2:3 → 3:4", with "+1" written over both arrows.', '«٢:٣ ← ٣:٤»، وفوق السهمين «+١».'),
              why: t('"I added one to both, so it\'s still the same."', '«أضفت واحدًا إلى الاثنين، فبقيت كما هي.»'),
            },
          },
        ],
      },
      choices: [
        { label: t('"How did you get 3:4?"', '«كيف وصلت إلى ٣:٤؟»'), sub: t('See Why', 'اعرف السبب'), minutes: 1, outcome: 'omarSeeWhy' },
        { label: t('Ask the class: same or not?', 'اسألي الصف: متساويتان أم لا؟'), sub: t('Class discussion', 'نقاش صفّي'), minutes: 1, outcome: 'omarClassVote' },
      ],
    },
    /* ------------------------------------------------ Objects */
    {
      id: 'laptop',
      kind: 'new-event',
      on: 'laptop',
      line: t('Build Your Learning Journey', 'ابني رحلة التعلّم'),
      ask: t(
        'A simplified Alef planning view: arrange today\'s practices into the three lesson stages.',
        'عرض تخطيط مبسّط من «ألف»: رتّبي ممارسات اليوم في مراحل الدرس الثلاث.',
      ),
      choices: [
        { label: t('Open the planner', 'افتحي المخطّط'), sub: t('Planning puzzle', 'لغز التخطيط'), minutes: 0, outcome: 'journey' },
      ],
    },
    {
      id: 'board',
      kind: 'new-event',
      on: 'board',
      line: t('Bring Learning to Life', 'أحيي التعلّم'),
      ask: t('How will the lesson open?', 'كيف سيبدأ الدرس؟'),
      choices: [
        { label: t('Share the learning intention', 'اعرضي هدف التعلّم'), sub: t('Present Mode', 'وضع العرض'), minutes: 1, outcome: 'boardPresent' },
        { label: t('"Where have you seen rates outside school?"', '«أين رأيتم المعدّلات خارج المدرسة؟»'), sub: t('Prior-knowledge discussion', 'نقاش المعرفة السابقة'), minutes: 1, outcome: 'boardDiscuss' },
      ],
    },
    {
      id: 'bookshelf',
      kind: 'new-event',
      on: 'bookshelf',
      line: t('Something is tucked behind the atlas.', 'هناك شيء مخبّأ خلف الأطلس.'),
      ask: t('Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.'),
      choices: [
        { label: t('Look behind the atlas', 'انظري خلف الأطلس'), sub: t('Hidden discovery', 'اكتشاف مخفي'), minutes: 0, outcome: 'recipeCard' },
      ],
    },
    /* ------------------------------------------------ Weighted pool (drawn after each student encounter) */
    {
      id: 'poolLink',
      kind: 'new-event',
      on: 'ahmed',
      category: 'learning',
      weight: 35,
      eligible: { notFlags: ['a1.ahmed:shallow'] },
      line: t('Ahmed: "Miss, is this like speed in science? Metres per second?"', 'أحمد: «أستاذة، هل هذا مثل السرعة في العلوم؟ أمتار في الثانية؟»'),
      ask: t('A link to another subject. Use it now, or keep to the plan?', 'ربط بمادة أخرى. هل تستفيدين منه الآن، أم تلتزمين بالخطة؟'),
      choices: [
        { label: t('Let him explain the link to the class', 'دعيه يشرح الربط للصف'), sub: t('Student voice', 'صوت الطالب'), minutes: 1, outcome: 'linkShare' },
        { label: t('"Great question. Hold it for later."', '«سؤال رائع. احتفظ به لوقت لاحق.»'), sub: t('Park it', 'تأجيل'), minutes: 0, outcome: 'linkPark' },
      ],
    },
    {
      id: 'poolPair',
      kind: 'new-event',
      on: 'sara',
      category: 'collaboration',
      weight: 25,
      line: t('Sara turns to Omar: "Did you get the first one?"', 'تلتفت سارة إلى عمر: «هل حللت الأولى؟»'),
      ask: t('Two students starting to help each other.', 'طالبان بدآ يساعدان بعضهما.'),
      choices: [
        { label: t('Give them roles: one explains, one checks', 'أعطيهما دورين: واحد يشرح، وواحد يتحقّق'), sub: t('Teams', 'الفرق'), minutes: 1, outcome: 'pairSupport' },
        { label: t('"Eyes to the front now, please."', '«انظروا إلى الأمام الآن من فضلكم.»'), sub: t('Whole class', 'الصف كله'), minutes: 0, outcome: 'pairRedirect' },
      ],
    },
    {
      id: 'poolMis',
      kind: 'unexpected',
      on: 'board',
      category: 'misconception',
      weight: 20,
      eligible: { notFlags: ['a1.sara:misconception'] },
      line: t('A voice from the back: "A ratio is a fraction, so 2:3 means 2/3."', 'صوت من آخر الصف: «النسبة كسر، إذن ٢:٣ تعني ٢/٣.»'),
      ask: t('Half the class nods. "Part to part" and "part of the whole" are getting mixed up.', 'نصف الصف يومئ. «جزء إلى جزء» و«جزء من الكل» يختلطان.'),
      choices: [
        { label: t('"What is the 3 counting?"', '«ماذا يعدّ الرقم ٣؟»'), sub: t('See Why', 'اعرف السبب'), minutes: 1, outcome: 'misSeeWhy' },
        { label: t('Let two students argue it out', 'دعي طالبين يتناقشان فيها'), sub: t('Class discussion', 'نقاش صفّي'), minutes: 1, outcome: 'misVote' },
      ],
    },
    {
      id: 'poolBattery',
      kind: 'unexpected',
      on: 'laptop',
      category: 'management',
      weight: 15,
      line: t('Three tablets are on low battery.', 'ثلاثة أجهزة لوحية بطاريتها منخفضة.'),
      ask: t('The lesson hasn\'t even started.', 'لم يبدأ الدرس بعد.'),
      choices: [
        { label: t('Share screens in pairs', 'شاشة لكل اثنين'), sub: t('Pairs', 'ثنائيات'), minutes: 0, outcome: 'batteryPairs' },
        { label: t('Charge them; start on paper', 'اشحنيها، وابدئي على الورق'), sub: t('Paper start', 'بداية ورقية'), minutes: 1, outcome: 'batteryCharge' },
      ],
    },
    {
      id: 'poolNote',
      kind: 'new-event',
      on: 'omar',
      category: 'bonus',
      weight: 5,
      line: t('Omar hands you a note from home: "We doubled the luqaimat recipe at the weekend!"', 'يعطيكِ عمر ورقة من البيت: «ضاعفنا وصفة اللقيمات في عطلة نهاية الأسبوع!»'),
      ask: t('A real ratio, from a real kitchen.', 'نسبة حقيقية، من مطبخ حقيقي.'),
      choices: [
        { label: t('Use it to open the lesson', 'افتتحي بها الدرس'), sub: t('Real-life hook', 'ربط بالحياة'), minutes: 1, outcome: 'noteHook' },
        { label: t('Pin it on the board for later', 'علّقيها على السبورة لوقت لاحق'), sub: t('Save it', 'الاحتفاظ بها'), minutes: 0, outcome: 'noteLater' },
      ],
    },
  ],
  outcomes: [
    /* Ahmed */
    { id: 'ahmedExtend', tone: 'good', xp: 30, discover: 'assign', setFlag: 'unlock:m2',
      title: t('Ready for more', 'مستعد للمزيد'),
      body: t('You assign a problem with three shops and a discount. He starts sketching a table. Real extension, not more of the same.', 'تكلّفينه بمسألة فيها ثلاثة محلات وخصم. يبدأ برسم جدول. إثراء حقيقي، لا تكرار للشيء نفسه.'),
      effects: [{ student: 'ahmed', understanding: 1, engagement: 1 }] },
    { id: 'ahmedAhead', tone: 'mixed', xp: 30,
      title: t('He finishes first, again', 'ينهي أولًا، مرة أخرى'),
      body: t('The main task takes him four minutes. Then he waits. The evidence said he was ready for more.', 'المهمة الرئيسية تأخذ منه أربع دقائق. ثم ينتظر. الأدلة قالت إنه مستعد للمزيد.'),
      effects: [{ student: 'ahmed', engagement: -1 }] },
    { id: 'ahmedSeeWhy', tone: 'insight', xp: 30, discover: 'see-why',
      title: t('The rule cracks', 'القاعدة تتصدّع'),
      body: t('"Why big divided by small?" He tries 12 boxes for 6 dirhams and stops. "Oh. It\'s cost divided by boxes."', '«لماذا الكبير على الصغير؟» يجرّب ١٢ علبة بـ٦ دراهم ويتوقّف. «آه. إنه الثمن تقسيم عدد العلب.»'),
      effects: [{ student: 'ahmed', understanding: 1 }] },
    { id: 'ahmedRuleBreaks', tone: 'mixed', xp: 30, setFlag: 'a1.gap',
      title: t('The rule will break later', 'القاعدة ستنكسر لاحقًا'),
      body: t('The harder task has a cheap bulk pack. His rule gives 2 dirhams a box, and he doesn\'t notice.', 'في المهمة الأصعب عبوة كبيرة رخيصة. قاعدته تعطي درهمين للعلبة، ولا ينتبه.'),
      effects: [{ student: 'ahmed', understanding: -1 }] },
    { id: 'ahmedRefresher', tone: 'good', xp: 30,
      title: t('One step back, then forward', 'خطوة إلى الوراء، ثم إلى الأمام'),
      body: t('7 ÷ 3 on a mini board, the remainder as decimals. He finishes the comparison himself.', '٧ ÷ ٣ على سبورة صغيرة، والباقي كسور عشرية. ويكمل المقارنة بنفسه.'),
      effects: [{ student: 'ahmed', understanding: 1, engagement: 1 }] },
    { id: 'ahmedNoted', tone: 'mixed', xp: 30, setFlag: 'a1.gap',
      title: t('Noted, not yet solved', 'مدوّنة، لكنها لم تُحلّ بعد'),
      body: t('You write "decimals" next to his name. Until then, every comparison question will stop him.', 'تكتبين «كسور عشرية» بجانب اسمه. وحتى ذلك الحين، سيتوقّف عند كل سؤال مقارنة.'),
      effects: [] },
    { id: 'ahmedTeams', tone: 'good', xp: 30, discover: 'teams', setFlag: 'a1.peerVoice',
      title: t('A pair, on purpose', 'ثنائي، عن قصد'),
      body: t('Ahmed explains, Omar checks. Omar asks the question nobody else dared to: "Why divide, not times?"', 'أحمد يشرح، وعمر يتحقّق. ويسأل عمر السؤال الذي لم يجرؤ عليه أحد: «لماذا نقسم ولا نضرب؟»'),
      effects: [{ student: 'ahmed', engagement: 1 }, { student: 'omar', understanding: 1, engagement: 1 }] },
    { id: 'ahmedCoach', tone: 'good', xp: 30, setFlag: 'a1.peerVoice',
      title: t('Helping, not telling', 'يساعد، لا يُملي'),
      body: t('Ahmed bites his tongue while Omar tries. Omar gets there slowly, and by himself.', 'يمسك أحمد لسانه بينما يحاول عمر. ويصل عمر ببطء، وبنفسه.'),
      effects: [{ student: 'omar', understanding: 1 }, { student: 'ahmed', engagement: 1 }] },
    /* Sara */
    { id: 'saraBridge', tone: 'insight', xp: 30, setFlag: 'unlock:m4',
      title: t('The missing piece', 'القطعة الناقصة'),
      body: t('4:6 and 2:3 side by side. "You can divide both by 2?" Simplifying was the missing step. It will need more than five minutes.', '٤:٦ و٢:٣ جنبًا إلى جنب. «يمكن قسمة الاثنين على ٢؟» التبسيط كان الخطوة الناقصة، وسيحتاج إلى أكثر من خمس دقائق.'),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }] },
    { id: 'saraLater', tone: 'mixed', xp: 30, setFlag: 'a1.gap',
      title: t('The gap goes with her', 'الفجوة ترافقها'),
      body: t('She starts unit rates without simplifying. By the second question she will be stuck again.', 'تبدأ معدّل الوحدة دون تبسيط. وعند السؤال الثاني ستتعثّر من جديد.'),
      effects: [{ student: 'sara', engagement: -1 }] },
    { id: 'saraSeeWhy', tone: 'insight', xp: 30, discover: 'see-why',
      title: t('Adding, not multiplying', 'تجمع، ولا تضرب'),
      body: t('"I added 2 to both." The same idea, three times yesterday. Now you both know what to fix: the same multiplier, not the same number.', '«أضفت ٢ إلى الاثنين.» الفكرة نفسها ثلاث مرات أمس. الآن تعرفان كلتاكما ما يجب إصلاحه: المضاعف نفسه، لا العدد نفسه.'),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }] },
    { id: 'saraRule', tone: 'mixed', xp: 30, setFlag: 'a1.gap',
      title: t('The rule, again', 'القاعدة، مرة أخرى'),
      body: t('She nods and copies the rule. On the next one she adds 2 to both parts again.', 'تومئ وتنسخ القاعدة. وفي السؤال التالي تضيف ٢ إلى الطرفين من جديد.'),
      effects: [] },
    { id: 'saraNeedHelp', tone: 'good', xp: 30, discover: 'need-help',
      title: t('Guidance on the task', 'توجيه في المهمة'),
      body: t('The question wanted a ratio table, not one answer. Once she knows that, she does it.', 'السؤال كان يطلب جدول نسب، لا إجابة واحدة. وحين عرفت ذلك، حلّته.'),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }] },
    { id: 'saraAiHelper', tone: 'good', xp: 30, discover: 'ai-helper',
      title: t('She asks what it means', 'تسأل عن المعنى'),
      body: t('She asks in her own words what the question wants. You check afterwards: she can explain it back to you.', 'تسأل بكلماتها عمّا يريده السؤال. وتتحقّقين بعدها: تستطيع أن تشرحه لكِ.'),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }] },
    { id: 'saraPractice', tone: 'good', xp: 30, discover: 'practice',
      title: t('A little more, before new', 'قليل من التدريب، قبل الجديد'),
      body: t('Four short questions, all right. Her shoulders drop: now she believes it.', 'أربعة أسئلة قصيرة، كلها صحيحة. ترتاح كتفاها: الآن تصدّق أنها فهمت.'),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }] },
    { id: 'saraTrust', tone: 'mixed', xp: 30,
      title: t('Encouraged, still unsure', 'متشجّعة، لكنها غير واثقة'),
      body: t('"You\'ve got this." She smiles, and still checks every answer with her neighbour.', '«أنتِ قادرة.» تبتسم، لكنها ما زالت تتحقّق من كل إجابة مع جارتها.'),
      effects: [] },
    /* Omar */
    { id: 'omarIntention', tone: 'good', xp: 30, discover: 'present-mode', setFlag: 'a1.intention',
      title: t('Now he knows', 'الآن يعرف'),
      body: t('"Today: find the better deal using unit rates." Up for everyone. Omar reads it and turns to the right page.', '«اليوم: نجد العرض الأوفر باستخدام معدّل الوحدة.» معروض للجميع. يقرؤه عمر ويفتح الصفحة الصحيحة.'),
      effects: [{ student: 'omar', engagement: 2 }] },
    { id: 'omarWhisper', tone: 'good', xp: 30,
      title: t('He knows; his table doesn\'t', 'هو يعرف، وطاولته لا تعرف'),
      body: t('You tell him quietly and he starts. Two others at his table still look lost.', 'تخبرينه بهدوء فيبدأ. واثنان آخران على طاولته ما زالا تائهين.'),
      effects: [{ student: 'omar', engagement: 1 }] },
    { id: 'omarCatchUp', tone: 'good', xp: 30,
      title: t('Yesterday, in two minutes', 'درس الأمس، في دقيقتين'),
      body: t('One example from yesterday: 2:3 doubled to 4:6. He nods. Now today makes sense.', 'مثال واحد من الأمس: ٢:٣ تتضاعف إلى ٤:٦. يومئ. الآن صار لدرس اليوم معنى.'),
      effects: [{ student: 'omar', understanding: 1, engagement: 1 }] },
    { id: 'omarNoted', tone: 'mixed', xp: 30, setFlag: 'a1.gap',
      title: t('Missing yesterday', 'ينقصه درس الأمس'),
      body: t('He will start today\'s topic without yesterday\'s step. You have noted it.', 'سيبدأ موضوع اليوم دون خطوة الأمس. وقد دوّنتِ ذلك.'),
      effects: [] },
    { id: 'omarLowRisk', tone: 'insight', xp: 30, next: { event: 'omarGuess', after: 0 },
      title: t('One guess, no names', 'تخمين واحد، دون أسماء'),
      body: t('Everyone writes a guess on a sticky note. Omar writes one. His first contribution today.', 'يكتب كل واحد تخمينًا على ورقة لاصقة. ويكتب عمر تخمينه. أول مشاركة له اليوم.'),
      effects: [{ student: 'omar', engagement: 1 }] },
    { id: 'omarPartner', tone: 'good', xp: 30, discover: 'teams', setFlag: 'a1.peerVoice',
      title: t('Partner first', 'الزميل أولًا'),
      body: t('He tells Sara before the class hears it. "I think it\'s 2 dirhams," he says, and he\'s right.', 'يخبر سارة قبل أن يسمعه الصف. «أظن أنها درهمان»، يقول، وهو محق.'),
      effects: [{ student: 'omar', engagement: 2 }] },
    { id: 'omarHook', tone: 'good', xp: 30,
      title: t('Sports day, in metres per second', 'يوم الرياضة، بالأمتار في الثانية'),
      body: t('"100 metres in 20 seconds, or 60 in 10?" Omar turns from the window to the board.', '«١٠٠ متر في ٢٠ ثانية، أم ٦٠ في ١٠؟» يلتفت عمر من النافذة إلى السبورة.'),
      effects: [{ student: 'omar', engagement: 2 }] },
    { id: 'omarSeat', tone: 'mixed', xp: 30,
      title: t('Closer, still elsewhere', 'أقرب، لكنه ما زال بعيدًا'),
      body: t('He is nearer the board now. His eyes are still on the yard.', 'صار أقرب إلى السبورة. لكن عينيه ما زالتا على الساحة.'),
      effects: [] },
    { id: 'omarSeeWhy', tone: 'insight', xp: 30, discover: 'see-why', setFlag: 'a1.sharedMis',
      title: t('Adding, not multiplying', 'يجمع، ولا يضرب'),
      body: t('"I added one to both." The idea that trips up many students in ratios. Now you know what the lesson\'s first example needs to show.', '«أضفت واحدًا إلى الاثنين.» الفكرة التي توقع كثيرًا من الطلاب في النسب. الآن تعرفين ما يجب أن يُظهره أول مثال في الدرس.'),
      effects: [{ student: 'omar', understanding: 1 }] },
    { id: 'omarClassVote', tone: 'good', xp: 30, setFlag: 'a1.peerVoice',
      title: t('His guess starts a discussion', 'تخمينه يفتح نقاشًا'),
      body: t('"Same or not?" The class splits. Two students argue it out with a drawing. Omar\'s guess started the best discussion of the morning.', '«متساويتان أم لا؟» ينقسم الصف. ويتناقش طالبان برسم توضيحي. تخمين عمر فتح أفضل نقاش في الصباح.'),
      effects: [{ student: 'omar', understanding: 1, engagement: 1 }] },
    /* Objects */
    { id: 'journey', tone: 'good', setFlag: 'a1.journeyBuilt',
      title: t('Your journey has a shape', 'رحلتكِ صار لها شكل'),
      body: t('Launch, facilitate, extend: today\'s plan has a shape. The order is yours; the planner shows one way, not the only way.', 'افتتاح، ثم تيسير، ثم إثراء: صار لخطة اليوم شكل. الترتيب لكِ، والمخطّط يعرض طريقة واحدة، لا الطريقة الوحيدة.'),
      effects: [] },
    { id: 'boardPresent', tone: 'good', discover: 'present-mode', setFlag: 'a1.intention',
      title: t('The learning intention is up', 'هدف التعلّم معروض'),
      body: t('"Today: find the better deal using unit rates." Everyone can see what today is for.', '«اليوم: نجد العرض الأوفر باستخدام معدّل الوحدة.» الجميع يرى الغاية من درس اليوم.'),
      effects: [{ student: 'omar', engagement: 1 }, { student: 'sara', engagement: 1 }] },
    { id: 'boardDiscuss', tone: 'insight', setFlag: 'a1.priorChecked',
      title: t('Starting points, out loud', 'نقاط الانطلاق، بصوت مسموع'),
      body: t('"Supermarket offers." "Petrol." "My dad\'s car: kilometres per litre." The answers show you who already has a feel for rates.', '«عروض السوبرماركت.» «البنزين.» «سيارة أبي: كيلومترات لكل لتر.» الإجابات تُظهر لكِ من لديه إحساس مسبق بالمعدّلات.'),
      effects: [{ student: 'ahmed', engagement: 1 }, { student: 'omar', engagement: 1 }] },
    { id: 'recipeCard', tone: 'insight', setFlag: 'a1.recipe',
      title: t('A recipe card from last year', 'بطاقة وصفة من العام الماضي'),
      body: t('"Luqaimat for 30 people", in a student\'s handwriting, every amount tripled. A ratio problem someone made for fun. It goes in your notebook.', '«لقيمات لثلاثين شخصًا»، بخط طالب، وكل المقادير مضروبة في ثلاثة. مسألة نسب صنعها أحدهم للمتعة. تُحفظ في دفتركِ.'),
      effects: [] },
    /* Pool */
    { id: 'linkShare', tone: 'good', setFlag: 'a1.peerVoice',
      title: t('Ahmed connects the dots', 'أحمد يربط الخيوط'),
      body: t('"It\'s the same thing: how much for one." The class hears it from him, not you.', '«إنه الشيء نفسه: كم لكل واحد.» يسمعها الصف منه، لا منكِ.'),
      effects: [{ student: 'ahmed', engagement: 1 }] },
    { id: 'linkPark', tone: 'mixed',
      title: t('Held for later', 'مؤجّل لوقت لاحق'),
      body: t('He writes it in the margin. It will still be a good question at the end of the lesson.', 'يكتبه على الهامش. وسيبقى سؤالًا جيدًا في نهاية الدرس.'),
      effects: [] },
    { id: 'pairSupport', tone: 'good', discover: 'teams', setFlag: 'a1.peerVoice',
      title: t('A pair with a purpose', 'ثنائي له هدف'),
      body: t('Sara explains, Omar checks. They find the same mistake together and fix it.', 'سارة تشرح، وعمر يتحقّق. يجدان الخطأ نفسه معًا ويصلحانه.'),
      effects: [{ student: 'sara', understanding: 1 }, { student: 'omar', engagement: 1 }] },
    { id: 'pairRedirect', tone: 'mixed',
      title: t('Back to the front', 'العودة إلى الأمام'),
      body: t('They stop talking. They also stop helping each other.', 'يتوقّفان عن الكلام. ويتوقّفان أيضًا عن مساعدة بعضهما.'),
      effects: [{ student: 'sara', engagement: -1 }] },
    { id: 'misSeeWhy', tone: 'insight', discover: 'see-why', setFlag: 'a1.sharedMis',
      title: t('Part of what?', 'جزء من ماذا؟'),
      body: t('"2:3 means 2 of one thing for every 3 of another." The class sees two different questions hiding in one symbol.', '«٢:٣ تعني ٢ من شيء مقابل كل ٣ من شيء آخر.» يرى الصف سؤالين مختلفين يختبئان في رمز واحد.'),
      effects: [{ student: 'ahmed', understanding: 1 }] },
    { id: 'misVote', tone: 'good', setFlag: 'a1.peerVoice',
      title: t('Two students argue it out', 'طالبان يتناقشان'),
      body: t('One draws 2 red and 3 blue counters; the other circles them all. The class decides: the fraction is 2 out of 5.', 'أحدهما يرسم ٢ أحمر و٣ أزرق، والآخر يحيط بها كلها. ويقرّر الصف: الكسر هو ٢ من ٥.'),
      effects: [{ student: 'sara', understanding: 1 }] },
    { id: 'batteryPairs', tone: 'good',
      title: t('Two to a screen', 'اثنان لكل شاشة'),
      body: t('It works, mostly. One pair spends a minute deciding who taps.', 'ينجح الأمر، في الغالب. ثنائي واحد يقضي دقيقة يقرّر من يضغط.'),
      effects: [] },
    { id: 'batteryCharge', tone: 'good',
      title: t('Paper first, screens later', 'الورق أولًا، والشاشات لاحقًا'),
      body: t('The first five minutes don\'t need tablets. Nobody misses the start.', 'الدقائق الخمس الأولى لا تحتاج إلى أجهزة. ولا تفوت البداية أحدًا.'),
      effects: [] },
    { id: 'noteHook', tone: 'good', setFlag: 'a1.priorChecked',
      title: t('A real kitchen ratio', 'نسبة من مطبخ حقيقي'),
      body: t('"If you double the flour, what happens to the sugar?" Every hand in the room has an answer.', '«إذا ضاعفنا الطحين، ماذا يحدث للسكر؟» كل يد في الصف لديها إجابة.'),
      effects: [{ student: 'omar', engagement: 1 }, { student: 'sara', engagement: 1 }] },
    { id: 'noteLater', tone: 'mixed',
      title: t('Pinned for later', 'معلّقة لوقت لاحق'),
      body: t('It goes on the board. Someone will ask about it at the end.', 'تُعلَّق على السبورة. وسيسأل عنها أحدهم في النهاية.'),
      effects: [{ student: 'omar', engagement: 1 }] },
  ],
  puzzle: {
    id: 'journey',
    title: t('Build Your Learning Journey', 'ابني رحلة التعلّم'),
    intro: t(
      'A simplified, illustrative Alef planning view. Place each practice in the stage where it fits. Some fit in more than one.',
      'عرض تخطيط مبسّط وتوضيحي من «ألف». ضعي كل ممارسة في المرحلة التي تناسبها. بعضها يناسب أكثر من مرحلة.',
    ),
    cards: [
      { id: 'intention', text: t('Share the learning intention', 'عرض هدف التعلّم'), stages: ['launch'] },
      { id: 'prior', text: t('Find out what students already know', 'معرفة ما يعرفه الطلاب مسبقًا'), stages: ['launch', 'facilitate'] },
      { id: 'try', text: t('Students try the task', 'الطلاب يجرّبون المهمة'), stages: ['facilitate'] },
      { id: 'compare', text: t('Compare and discuss strategies', 'مقارنة الاستراتيجيات ومناقشتها'), stages: ['facilitate'] },
      { id: 'support', text: t('Support students who are stuck', 'دعم الطلاب المتعثّرين'), stages: ['facilitate'] },
      { id: 'reinforce', text: t('Practise to reinforce', 'التدريب للتثبيت'), stages: ['facilitate', 'extend'] },
      { id: 'check', text: t('Check understanding at the end', 'التحقّق من الفهم في النهاية'), stages: ['extend'] },
      { id: 'stretch', text: t('Stretch students who are ready', 'إثراء الطلاب المستعدين'), stages: ['extend'] },
    ],
    badge: 'instructional-architect',
    xp: 100,
    note: t(
      'This sequence is one example, not a rule. Good lessons come back to practices across stages.',
      'هذا الترتيب مثال واحد، لا قاعدة. الدروس الجيدة تعود إلى الممارسات في أكثر من مرحلة.',
    ),
  },
  endings: [
    {
      id: 'unfinished-puzzle',
      title: t('The Unfinished Puzzle', 'اللغز غير المكتمل'),
      narration: t(
        'One starting point is still missing a piece. That isn\'t a failure: it is the first job of the next lesson.',
        'ما زالت قطعة ناقصة في إحدى نقاط الانطلاق. هذا ليس فشلًا: إنه أول مهمة في الدرس القادم.',
      ),
      when: { flags: ['a1.gap'] },
      priority: 1,
      opens: ['m4'],
    },
    {
      id: 'unexpected-opportunity',
      title: t('An Unexpected Opportunity', 'فرصة غير متوقعة'),
      narration: t(
        'A student\'s voice moved someone else\'s learning this morning. That is worth building on.',
        'صوت أحد الطلاب حرّك تعلّم زميل له هذا الصباح. وهذا يستحق أن نبني عليه.',
      ),
      when: { flags: ['a1.peerVoice'] },
      priority: 2,
      opens: ['m5'],
    },
    {
      id: 'ready-to-learn',
      title: t('Ready to Learn', 'مستعدون للتعلّم'),
      narration: t(
        'You know where each student is starting, and what each needs next. The lesson can begin.',
        'تعرفين من أين ينطلق كل طالب، وما يحتاجه كل واحد بعد ذلك. يمكن أن يبدأ الدرس.',
      ),
      when: { notFlags: ['a1.gap'] },
      priority: 3,
      badge: 'purposeful-launch',
      opens: ['m3'],
    },
  ],
  badges: [
    {
      id: 'purposeful-launch',
      title: t('Purposeful Launch', 'افتتاح هادف'),
      why: t('You checked every student\'s readiness and found each one\'s next step.', 'تحقّقتِ من استعداد كل طالب ووجدتِ الخطوة التالية لكل واحد.'),
      icon: '◆',
      when: { flag: 'a1.intention' },
    },
    {
      id: 'instructional-architect',
      title: t('Instructional Architect', 'مهندسة التعلّم'),
      why: t('You built the lesson\'s journey across launch, facilitate and extend.', 'بنيتِ رحلة الدرس عبر الافتتاح والتيسير والإثراء.'),
      icon: '▣',
      when: { flag: 'a1.journeyBuilt' },
    },
    {
      id: 'a1-first-five',
      title: t('Five Minutes Well Spent', 'خمس دقائق في مكانها'),
      why: t('You looked before you acted, three times.', 'نظرتِ قبل أن تتصرّفي، ثلاث مرات.'),
      icon: '◔',
      when: 'always',
    },
  ],
  communityTopic: t('The first five minutes of a lesson', 'الدقائق الخمس الأولى من الدرس'),
  communityExamples: [
    {
      who: t('Grade 7 teacher · Al Ain', 'معلمة الصف السابع · العين'),
      text: t(
        'I ask "Show me how" before "That\'s right". Twice this week the right answer had the wrong reason.',
        'أسأل «أرني كيف» قبل أن أقول «صحيح». مرتين هذا الأسبوع كانت الإجابة الصحيحة بسبب خاطئ.',
      ),
    },
    {
      who: t('Math teacher · Abu Dhabi', 'معلم رياضيات · أبوظبي'),
      text: t(
        'The learning intention goes up before anything else. My quiet students stopped asking "what are we doing?"',
        'هدف التعلّم يُعرض قبل أي شيء. وتوقّف طلابي الهادئون عن سؤال «ماذا سنفعل؟»',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'unlock:m2',
      text: t(
        'Ahmed was ready for more today. Next: what does real extension look like, for him and for the class?',
        'كان أحمد مستعدًا للمزيد اليوم. والقادم: كيف يبدو الإثراء الحقيقي، له وللصف؟',
      ),
    },
    {
      ifFlag: 'a1.gap',
      text: t('A piece is still missing. Tomorrow begins with closing that gap.', 'ما زالت هناك قطعة ناقصة. والغد يبدأ بسدّ هذه الفجوة.'),
    },
    {
      text: t('Everyone is ready to learn. Now bring the lesson to life.', 'الجميع مستعد للتعلّم. والآن، أحيي الدرس.'),
    },
  ],
};
