/**
 * Mission 06 — Reading the Evidence. Grade 7 · Math (ratios and proportions,
 * end of lesson). The last five minutes, mirroring Mission 01's first five.
 * Exit Ticket for what each student learned; Class Progress for what the
 * class needs tomorrow. Each student's ticket is an investigation; so is the
 * Class Progress view on the laptop.
 * Opened by endings of M02–M05.
 * Branch map: docs/content/TEACHER_CONTENT.md#m06
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M6: Adventure = {
  id: 'm6',
  number: 6,
  title: t('Reading the Evidence', 'قراءة الأدلة'),
  meta: t('Mission 06 · Grade 7 · Math', 'المهمة ٠٦ · الصف السابع · الرياضيات'),
  location: 'grade7',
  scene: 'teacher/scenes/m06.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'The last five minutes tell you how to start tomorrow: check what each student actually learned, then plan from the evidence, not from the feeling.',
    'الدقائق الخمس الأخيرة تخبرك كيف تبدأ الغد: تحقّق مما تعلّمه كل طالب فعلًا، ثم خطّط انطلاقًا من الأدلة، لا من الانطباع.',
  ),
  film: [
    { picture: 'teacher/film/m06-1.jpg', narration: T(['The lesson went well. Or it felt like it did.', 'سار الدرس بشكل جيد. أو هكذا بدا.']) },
    { picture: 'teacher/film/m06-2.jpg', who: 'ahmed', line: T(['Miss, that was easy. 5 out of 5!', 'أستاذة، كان سهلًا. ٥ من ٥!']) },
    { picture: 'teacher/film/m06-2.jpg', who: 'sara', line: T(['I think I got it… mostly.', 'أظن أنني فهمت… في الغالب.']) },
    { picture: 'teacher/film/m06-2.jpg', who: 'omar', line: T(['Do we have to do the ticket?', 'هل يجب أن نحلّ البطاقة؟']) },
    { picture: 'teacher/film/m06-3.jpg', narration: T(['Five minutes before the bell. What did they really learn?', 'خمس دقائق قبل الجرس. ماذا تعلّموا فعلًا؟']) },
  ],
  intro: [T(['MISSION 06 | Reading the Evidence', 'المهمة ٠٦ | قراءة الأدلة']), T(['The last five minutes. Tomorrow starts here.', 'الدقائق الخمس الأخيرة. والغد يبدأ من هنا.'])],
  introBubbles: [
    { student: 'ahmed', line: T(['5 out of 5!', '٥ من ٥!']) },
    { student: 'omar', line: T(['Do we have to?', 'هل يجب؟']) },
  ],
  students: [
    {
      id: 'ahmed', name: T(['Ahmed', 'أحمد']), x: 62, y: 50, understanding: 3, engagement: 2,
      idle: T(['Ahmed has finished his ticket and is packing up.', 'أنهى أحمد بطاقته ويجمع أغراضه.']),
      homeNote: T(['His older brother is in Grade 9 and often shows him next year\'s maths at home.', 'أخوه الأكبر في الصف التاسع، وكثيرًا ما يريه رياضيات السنوات القادمة في البيت.']),
    },
    {
      id: 'sara', name: T(['Sara', 'سارة']), x: 34, y: 58, understanding: 2, engagement: 2,
      idle: T(['Sara is checking her ticket twice.', 'سارة تراجع بطاقتها مرتين.']),
      homeNote: T(['She looks after her younger brothers after school most days, so homework is done late.', 'تعتني بإخوتها الصغار بعد المدرسة معظم الأيام، فتحلّ واجباتها في وقت متأخر.']),
    },
    {
      id: 'omar', name: T(['Omar', 'عمر']), x: 18, y: 44, understanding: 1, engagement: 1,
      idle: T(['Omar is looking at the clock.', 'عمر ينظر إلى الساعة.']),
      homeNote: T(['His dad works night shifts, so mornings at home are rushed.', 'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.']),
    },
  ],
  objects: [
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '▦', x: 82, y: 64, idle: T(['Class Progress is open for today\'s lesson.', 'تقدّم الصف مفتوح على درس اليوم.']) },
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['Today\'s learning intention is still up.', 'هدف التعلّم لهذا اليوم ما زال معروضًا.']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A thin folder is wedged at the end of the shelf.', 'ملف رفيع محشور في آخر الرف.']) },
  ],
  schedule: ['board', 'ahmed', 'sara', 'omar', 'laptop', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['How will the lesson end?', 'كيف سينتهي الدرس؟']),
      ask: T(['Five minutes left. You need to know what they learned.', 'بقيت خمس دقائق، وتحتاجين أن تعرفي ماذا تعلّموا.']),
      choices: [
        ch(['A two-question exit ticket, alone', 'بطاقة خروج من سؤالين، فرديًا'], ['Exit Ticket', 'بطاقة الخروج'], 'bTicket'),
        ch(['"Any questions?"', '«هل من أسئلة؟»'], ['Ask the class', 'سؤال الصف'], 'bQuestions', { minutes: 0 }),
      ],
    },
    {
      id: 'ahmed', kind: 'early-finisher', on: 'ahmed',
      line: T(['"Miss, that was easy. 5 out of 5!"', '«أستاذة، كان سهلًا. ٥ من ٥!»']),
      ask: T(['Read his ticket before you believe the rating.', 'اقرئي بطاقته قبل أن تصدّقي تقييمه.']),
      investigate: {
        clues: [
          clue('answer', ['His answers', 'إجاباته'], ['Questions 1 and 2.', 'السؤالان الأول والثاني.']),
          clue('reason', ['His reasoning', 'تعليله'], ['"Explain question 2."', '«اشرح السؤال الثاني.»']),
          clue('rating', ['His self-rating', 'تقييمه لنفسه'], ['"How well do you understand? 1 to 5."', '«ما مدى فهمك؟ من ١ إلى ٥.»']),
        ],
        profiles: [
          profile('secure', 40, 'm6.ahmed:secure', {
            answer: ['Both right.', 'الاثنان صحيحان.'],
            reason: ['"Same multiplier, both sides." Clear.', '«المضاعف نفسه في الطرفين.» واضح.'],
            rating: ['5 out of 5, and he\'s right.', '٥ من ٥، وهو محق.'],
          }),
          profile('overconfident', 30, 'm6.ahmed:overconfident', {
            answer: ['Question 1 right. Question 2: 4:6 = 6:8.', 'السؤال الأول صحيح. والثاني: ٤:٦ = ٦:٨.'],
            reason: ['"I added 2 to both. Easy."', '«أضفت ٢ إلى الاثنين. سهل.»'],
            rating: ['5 out of 5.', '٥ من ٥.'],
          }),
          profile('careless', 30, 'm6.ahmed:careless', {
            answer: ['Right method, one slip: 3 × 4 = 7.', 'طريقة صحيحة، وخطأ واحد: ٣ × ٤ = ٧.'],
            reason: ['Clear, and correct.', 'واضح، وصحيح.'],
            rating: ['5 out of 5, finished in two minutes.', '٥ من ٥، أنهاها في دقيقتين.'],
          }),
        ],
      },
      choices: [
        ch(['Assign tomorrow\'s challenge now', 'كلّفيه بتحدّي الغد الآن'], ['Assign', 'التكليف'], 'aNext', { ifFlag: 'm6.ahmed:secure' }),
        ch(['"Great. See you tomorrow."', '«رائع. أراك غدًا.»'], ['Collect it', 'استلام'], 'aDone', { ifFlag: 'm6.ahmed:secure', minutes: 0 }),
        ch(['"Explain question 2 to me"', '«اشرح لي السؤال الثاني»'], ['See Why', 'اعرف السبب'], 'aWhy', { ifFlag: 'm6.ahmed:overconfident' }),
        ch(['Trust his 5 out of 5', 'صدّقي تقييمه ٥ من ٥'], ['Trust the rating', 'الثقة بالتقييم'], 'aTrust', { ifFlag: 'm6.ahmed:overconfident', minutes: 0 }),
        ch(['"Estimate first, then check"', '«قدّر أولًا، ثم تحقّق»'], ['Practice', 'التدريب'], 'aCheck', { ifFlag: 'm6.ahmed:careless' }),
        ch(['It\'s only a slip; let it go', 'مجرد خطأ بسيط، تجاوزيه'], ['Let it go', 'تجاوز'], 'aSlip', { ifFlag: 'm6.ahmed:careless', minutes: 0 }),
      ],
    },
    {
      id: 'sara', kind: 'needs-help', on: 'sara',
      line: T(['"I think I got it… mostly."', '«أظن أنني فهمت… في الغالب.»']),
      ask: T(['What does "mostly" mean on her ticket?', 'ماذا تعني «في الغالب» على بطاقتها؟']),
      investigate: {
        clues: [
          clue('answer', ['Her answers', 'إجاباتها'], ['Questions 1 and 2.', 'السؤالان الأول والثاني.']),
          clue('working', ['Her working', 'طريقة حلّها'], ['How she got there.', 'كيف وصلت.']),
          clue('rating', ['Her self-rating', 'تقييمها لنفسها'], ['1 to 5.', 'من ١ إلى ٥.']),
        ],
        profiles: [
          profile('improving', 40, 'm6.sara:improving', {
            answer: ['Both right.', 'الاثنان صحيحان.'],
            working: ['Lots of crossing out, then the right multiplier.', 'شطب كثير، ثم المضاعف الصحيح.'],
            rating: ['3 out of 5.', '٣ من ٥.'],
          }),
          profile('adding', 30, 'm6.sara:adding', {
            answer: ['Question 1 right, question 2 wrong.', 'الأول صحيح، والثاني خطأ.'],
            working: ['Question 2: "+3" on both sides. The old idea is back.', 'السؤال الثاني: «+٣» على الطرفين. عادت الفكرة القديمة.'],
            rating: ['4 out of 5.', '٤ من ٥.'],
          }),
          profile('unfinished', 30, 'm6.sara:unfinished', {
            answer: ['Question 1 right. Question 2 half done.', 'الأول صحيح. والثاني نصفه محلول.'],
            working: ['The right first step on question 2, then nothing.', 'الخطوة الأولى الصحيحة في السؤال الثاني، ثم لا شيء.'],
            rating: ['No rating. She ran out of time.', 'لا تقييم. نفد وقتها.'],
          }),
        ],
      },
      choices: [
        ch(['A short practice set for tomorrow\'s start', 'مجموعة تدريب قصيرة لبداية الغد'], ['Practice', 'التدريب'], 'sPractice', { ifFlag: 'm6.sara:improving' }),
        ch(['"You\'ve got it. Done."', '«لقد فهمتِ. انتهينا.»'], ['Done', 'انتهى'], 'sDone', { ifFlag: 'm6.sara:improving', minutes: 0 }),
        ch(['"Talk me through question 2"', '«اشرحي لي السؤال الثاني»'], ['See Why', 'اعرف السبب'], 'sWhy', { ifFlag: 'm6.sara:adding' }),
        ch(['Mark it wrong', 'صحّحيها خطأ'], ['Mark it', 'تصحيح'], 'sMarked', { ifFlag: 'm6.sara:adding', minutes: 0 }),
        ch(['"How far did you get?"', '«إلى أين وصلتِ؟»'], ['Ask her', 'اسأليها'], 'sAsk', { ifFlag: 'm6.sara:unfinished' }),
        ch(['Score the blank as wrong', 'احسبي الفراغ خطأ'], ['Score it', 'احتساب'], 'sBlank', { ifFlag: 'm6.sara:unfinished', minutes: 0 }),
      ],
    },
    {
      id: 'omar', kind: 'low-participation', on: 'omar',
      line: T(['"Do we have to do the ticket?"', '«هل يجب أن نحلّ البطاقة؟»']),
      ask: T(['What will his ticket tell you, if anything?', 'ماذا ستخبركِ بطاقته، إن أخبرت بشيء؟']),
      investigate: {
        clues: [
          clue('answer', ['His answers', 'إجاباته'], ['What did he write?', 'ماذا كتب؟']),
          clue('working', ['His working', 'طريقة حلّه'], ['Is there any?', 'هل توجد؟']),
          clue('face', ['His face', 'ملامحه'], ['How does he look now?', 'كيف يبدو الآن؟']),
        ],
        profiles: [
          profile('guessed', 35, 'm6.omar:guessed', {
            answer: ['Both right.', 'الاثنان صحيحان.'],
            working: ['No working at all.', 'لا حلّ مكتوب أبدًا.'],
            face: ['He looks away when you pick it up.', 'يُشيح بنظره حين ترفعين البطاقة.'],
          }),
          profile('secure', 35, 'm6.omar:secure', {
            answer: ['Both right.', 'الاثنان صحيحان.'],
            working: ['A small, neat ratio table for each.', 'جدول نسب صغير ومرتّب لكل منهما.'],
            face: ['He looks pleased, and surprised.', 'يبدو مسرورًا، ومتفاجئًا.'],
          }),
          profile('missing', 30, 'm6.omar:missing', {
            answer: ['The ticket is still in his bag.', 'البطاقة ما زالت في حقيبته.'],
            working: ['Nothing to see.', 'لا شيء يُرى.'],
            face: ['Tired. It has been a long day.', 'متعب. كان يومًا طويلًا.'],
          }),
        ],
      },
      choices: [
        ch(['"Show me how you got question 2"', '«أرني كيف وصلت إلى السؤال الثاني»'], ['See Why', 'اعرف السبب'], 'oWhy', { ifFlag: 'm6.omar:guessed' }),
        ch(['Tick it and collect it', 'ضعي علامة صح واستلميها'], ['Collect it', 'استلام'], 'oTick', { ifFlag: 'm6.omar:guessed', minutes: 0 }),
        ch(['Tell him exactly what he got right', 'أخبريه بالضبط بما أصاب فيه'], ['Feedback', 'تغذية راجعة'], 'oPraise', { ifFlag: 'm6.omar:secure' }),
        ch(['Just collect it', 'استلميها فقط'], ['Collect it', 'استلام'], 'oCollect', { ifFlag: 'm6.omar:secure', minutes: 0 }),
        ch(['One question, out loud, right now', 'سؤال واحد، بصوت مسموع، الآن'], ['Quick check', 'تحقّق سريع'], 'oAloud', { ifFlag: 'm6.omar:missing' }),
        ch(['Chase it tomorrow', 'اطلبيها غدًا'], ['Later', 'لاحقًا'], 'oLater', { ifFlag: 'm6.omar:missing', minutes: 0 }),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['Class Progress', 'تقدّم الصف']),
      ask: T(['What does the whole class need tomorrow?', 'ماذا يحتاج الصف كله غدًا؟']),
      investigate: {
        clues: [
          clue('done', ['Who finished', 'من أنهى'], ['How many completed today\'s task?', 'كم طالبًا أنهى مهمة اليوم؟']),
          clue('missed', ['Most missed', 'الأكثر خطأً'], ['Which question went wrong most?', 'أي سؤال أخطأ فيه أكثر الطلاب؟']),
          clue('time', ['Time', 'الوقت'], ['Who took longest?', 'من استغرق وقتًا أطول؟']),
        ],
        profiles: [
          profile('one', 40, 'm6.class:one', {
            done: ['22 of 24.', '٢٢ من ٢٤.'],
            missed: ['Question 3, by 11 students: the same adding mistake.', 'السؤال الثالث، أخطأ فيه ١١ طالبًا: خطأ الجمع نفسه.'],
            time: ['Most finished on time.', 'معظمهم أنهى في الوقت.'],
          }),
          profile('split', 35, 'm6.class:split', {
            done: ['16 of 24.', '١٦ من ٢٤.'],
            missed: ['Questions 4 to 6, all by the same eight students.', 'الأسئلة من ٤ إلى ٦، أخطأ فيها الطلاب الثمانية أنفسهم.'],
            time: ['Those eight took twice as long.', 'هؤلاء الثمانية استغرقوا ضعف الوقت.'],
          }),
          profile('secure', 25, 'm6.class:secure', {
            done: ['24 of 24.', '٢٤ من ٢٤.'],
            missed: ['No question missed by more than three students.', 'لا سؤال أخطأ فيه أكثر من ثلاثة طلاب.'],
            time: ['Three students needed longer on the word problems.', 'ثلاثة طلاب احتاجوا وقتًا أطول في المسائل الكلامية.'],
          }),
        ],
      },
      choices: [
        ch(['Open tomorrow with question 3', 'ابدئي الغد بالسؤال الثالث'], ['Plan from evidence', 'التخطيط بالأدلة'], 'lOne', { ifFlag: 'm6.class:one' }),
        ch(['Reteach the whole lesson tomorrow', 'أعيدي الدرس كله غدًا'], ['Reteach all', 'إعادة كاملة'], 'lAll', { ifFlag: 'm6.class:one', minutes: 0 }),
        ch(['Two starting points tomorrow', 'نقطتا انطلاق غدًا'], ['Plan from evidence', 'التخطيط بالأدلة'], 'lTwo', { ifFlag: 'm6.class:split' }),
        ch(['Move on with the plan', 'تابعي الخطة'], ['Move on', 'المتابعة'], 'lOn', { ifFlag: 'm6.class:split', minutes: 0 }),
        ch(['Move on, with a check-in for the three', 'تابعي، مع متابعة للثلاثة'], ['Plan from evidence', 'التخطيط بالأدلة'], 'lThree', { ifFlag: 'm6.class:secure' }),
        ch(['Repeat it anyway, to be safe', 'أعيديه على أي حال، احتياطًا'], ['Repeat', 'تكرار'], 'lRepeat', { ifFlag: 'm6.class:secure', minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['A thin folder at the end of the shelf.', 'ملف رفيع في آخر الرف.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Open the folder', 'افتحي الملف'], ['Hidden discovery', 'اكتشاف مخفي'], 'shFolder', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pSelf', kind: 'new-event', on: 'sara', category: 'learning', weight: 35,
      line: T(['Sara: "Can I see how I did compared to last week?"', 'سارة: «هل أرى كيف كان أدائي مقارنة بالأسبوع الماضي؟»']),
      ask: T(['She wants to see her own progress.', 'تريد أن ترى تقدّمها هي.']),
      choices: [
        ch(['Show her her own progress, not others\'', 'أريها تقدّمها هي، لا تقدّم غيرها'], ['Class Progress', 'تقدّم الصف'], 'psOwn'),
        ch(['"Tomorrow, I promise."', '«غدًا، أعدكِ.»'], ['Later', 'لاحقًا'], 'psLater', { minutes: 0 }),
      ],
    },
    {
      id: 'pSwap', kind: 'new-event', on: 'ahmed', category: 'collaboration', weight: 25,
      line: T(['Ahmed and Omar want to mark each other\'s tickets.', 'أحمد وعمر يريدان أن يصحّح كل منهما بطاقة الآخر.']),
      ask: T(['A minute of peer checking?', 'دقيقة من تصحيح الأقران؟']),
      choices: [
        ch(['Yes, against the success criteria', 'نعم، وفق معايير النجاح'], ['Teams', 'الفرق'], 'pwYes'),
        ch(['"I\'ll mark them."', '«سأصحّحها أنا.»'], ['Teacher marks', 'المعلمة تصحّح'], 'pwNo', { minutes: 0 }),
      ],
    },
    {
      id: 'pRate', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20,
      line: T(['Six tickets say "5 out of 5" next to a wrong answer.', 'ست بطاقات مكتوب عليها «٥ من ٥» بجانب إجابة خاطئة.']),
      ask: T(['They feel sure. The evidence disagrees.', 'يشعرون بالثقة، والأدلة تخالفهم.']),
      choices: [
        ch(['Open tomorrow with one of them, anonymously', 'ابدئي الغد بإحداها، دون اسم'], ['See Why', 'اعرف السبب'], 'prWhy'),
        ch(['Note it and move on', 'دوّنيها وتابعي'], ['Note it', 'تدوين'], 'prNote', { minutes: 0 }),
      ],
    },
    {
      id: 'pBell', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['The bell goes in two minutes. Not all tickets are in.', 'يرنّ الجرس بعد دقيقتين، ولم تُسلَّم كل البطاقات.']),
      ask: T(['The next class is already at the door.', 'الصف التالي ينتظر عند الباب.']),
      choices: [
        ch(['Collect what\'s done; the rest finish first thing tomorrow', 'استلمي ما أُنجز، والباقون يكملون أول الغد'], ['Collect', 'استلام'], 'pbCollect'),
        ch(['Keep them two minutes late', 'أبقيهم دقيقتين بعد الجرس'], ['Keep them', 'إبقاؤهم'], 'pbKeep', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    out('bTicket', 'good', ['Two questions, alone', 'سؤالان، فرديًا'], ['Everyone answers on their own. In three minutes you have twenty-four pieces of evidence.', 'يجيب كل واحد بمفرده. وخلال ثلاث دقائق صار لديكِ أربعة وعشرون دليلًا.'], [], { discover: 'exit-ticket', setFlag: 'm6.ticket' }),
    out('bQuestions', 'mixed', ['"Any questions?" Silence.', '«هل من أسئلة؟» صمت.'], ['Nobody asks. It doesn\'t mean nobody has one.', 'لا أحد يسأل. وهذا لا يعني أن لا أحد لديه سؤال.'], [], { setFlag: 'm6.gap' }),
    out('aNext', 'good', ['Tomorrow, already waiting', 'الغد بانتظاره'], ['He gets tomorrow\'s challenge before he leaves. He reads it on the way out.', 'يأخذ تحدّي الغد قبل أن يغادر، ويقرؤه وهو يخرج.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'assign' }),
    out('aDone', 'mixed', ['Secure, and coasting', 'متمكّن، ومسترخٍ'], ['He\'s right. Tomorrow he will wait again while others catch up.', 'هو محق. وغدًا سينتظر مرة أخرى حتى يلحق الآخرون.'], [], { xp: 30 }),
    out('aWhy', 'insight', ['5 out of 5, and adding', '٥ من ٥، وما زال يجمع'], ['"I added 2… oh." He hears it as he says it. His rating drops to 3, honestly.', '«أضفت ٢… آه.» يسمع الخطأ وهو يقوله. وينخفض تقييمه إلى ٣، بصدق.'], [fx('ahmed', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'm6.plan' }),
    out('aTrust', 'mixed', ['The rating wins', 'التقييم ينتصر'], ['He leaves sure he understands. Tomorrow\'s first question will tell him otherwise.', 'يغادر وهو متأكد أنه فهم. وأول سؤال غدًا سيخبره بغير ذلك.'], [], { xp: 30, setFlag: 'm6.gap' }),
    out('aCheck', 'good', ['Estimate, then check', 'التقدير، ثم التحقّق'], ['"About 12, not 7." He fixes it, and starts estimating before he writes.', '«تقريبًا ١٢، لا ٧.» يصحّحها، ويبدأ بالتقدير قبل أن يكتب.'], [fx('ahmed', 1, 0)], { xp: 30, discover: 'practice' }),
    out('aSlip', 'mixed', ['Just a slip, again', 'مجرد خطأ بسيط، مرة أخرى'], ['It was only one. It will be one again next week.', 'كان خطأً واحدًا. وسيكون واحدًا مرة أخرى الأسبوع القادم.'], [], { xp: 30 }),
    out('sPractice', 'good', ['From "mostly" to "yes"', 'من «في الغالب» إلى «نعم»'], ['Four questions set for tomorrow\'s first five minutes. She leaves knowing what she\'ll practise.', 'أربعة أسئلة مخصّصة لأول خمس دقائق في الغد. تغادر وهي تعرف ما ستتدرّب عليه.'], [fx('sara', 1, 1)], { xp: 30, discover: 'practice', setFlag: 'm6.plan' }),
    out('sDone', 'mixed', ['Right, and still unsure', 'صحيحة، وما زالت غير واثقة'], ['Both right. She still rates herself 3 out of 5, and you haven\'t told her why she should rate higher.', 'الاثنتان صحيحتان. وما زالت تقيّم نفسها ٣ من ٥، ولم تخبريها لماذا تستحق أكثر.'], [], { xp: 30 }),
    out('sWhy', 'insight', ['The old idea came back', 'الفكرة القديمة عادت'], ['"I added because the numbers were close." Now you know: her fix holds for easy numbers, not hard ones. Tomorrow\'s small group is planned.', '«جمعت لأن الأعداد متقاربة.» الآن تعرفين: تصحيحها يصمد مع الأعداد السهلة لا الصعبة. ومجموعة الغد الصغيرة صارت مخطّطة.'], [fx('sara', 1, 1)], { xp: 30, discover: 'see-why', setFlag: 'm6.plan' }),
    out('sMarked', 'mixed', ['A cross, no reason', 'علامة خطأ، دون سبب'], ['She sees the cross and doesn\'t know which idea it means.', 'ترى علامة الخطأ ولا تعرف أي فكرة تقصدين.'], [fx('sara', 0, -1)], { xp: 30, setFlag: 'm6.gap' }),
    out('sAsk', 'insight', ['Slow, not stuck', 'بطيئة، لا متعثّرة'], ['"I knew the next step. I ran out of time." The blank was a clock, not a gap.', '«كنت أعرف الخطوة التالية، لكن الوقت نفد.» الفراغ كان ساعة، لا فجوة.'], [fx('sara', 0, 1)], { xp: 30, setFlag: 'm6.plan' }),
    out('sBlank', 'mixed', ['Counted as wrong', 'احتُسبت خطأ'], ['Her score says she can\'t. Her first step said she could.', 'درجتها تقول إنها لا تستطيع، وخطوتها الأولى قالت إنها تستطيع.'], [fx('sara', 0, -1)], { xp: 30, setFlag: 'm6.gap' }),
    out('oWhy', 'insight', ['Right, by luck', 'صحيحة، بالحظ'], ['"I picked the bigger one." Two right answers, no idea behind them. Good to know tonight, not in the test.', '«اخترت الأكبر.» إجابتان صحيحتان، دون فكرة وراءهما. من الجيد معرفة ذلك الليلة، لا في الاختبار.'], [fx('omar', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'm6.plan' }),
    out('oTick', 'mixed', ['Two ticks', 'علامتا صح'], ['On paper, Omar understands ratios.', 'على الورق، عمر يفهم النسب.'], [], { xp: 30, setFlag: 'm6.gap' }),
    out('oPraise', 'good', ['"Your table was perfect"', '«جدولك كان مثاليًا»'], ['You tell him exactly what was right. He sits up. He didn\'t know he was good at this.', 'تخبرينه بالضبط بما كان صحيحًا. يعتدل في جلسته. لم يكن يعرف أنه جيد في هذا.'], [fx('omar', 0, 2)], { xp: 30 }),
    out('oCollect', 'mixed', ['Collected', 'استُلمت'], ['A good ticket, in the pile.', 'بطاقة جيدة، في الكومة.'], [], { xp: 30 }),
    out('oAloud', 'good', ['One question, one answer', 'سؤال واحد، وإجابة واحدة'], ['"Double 2:3?" "4:6." Ten seconds of evidence, and he leaves on a right answer.', '«ضاعف ٢:٣؟» «٤:٦.» عشر ثوانٍ من الأدلة، ويغادر على إجابة صحيحة.'], [fx('omar', 1, 1)], { xp: 30 }),
    out('oLater', 'mixed', ['No evidence today', 'لا أدلة اليوم'], ['You don\'t know what Omar learned today.', 'لا تعرفين ماذا تعلّم عمر اليوم.'], [], { xp: 30, setFlag: 'm6.gap' }),
    out('lOne', 'good', ['Tomorrow opens with question 3', 'الغد يبدأ بالسؤال الثالث'], ['Eleven students, one mistake. Tomorrow\'s first five minutes are written.', 'أحد عشر طالبًا، وخطأ واحد. والدقائق الخمس الأولى في الغد صارت مكتوبة.'], [], { xp: 30, discover: 'class-progress', setFlag: 'm6.plan' }),
    out('lAll', 'mixed', ['Everything, again', 'كل شيء، مرة أخرى'], ['Thirteen students will relearn what they know to fix one mistake for eleven.', 'ثلاثة عشر طالبًا سيعيدون تعلّم ما يعرفونه لإصلاح خطأ واحد لدى أحد عشر.'], [], { xp: 30, discover: 'class-progress' }),
    out('lTwo', 'good', ['Two starting points', 'نقطتا انطلاق'], ['Sixteen go on; eight start with you on questions 4 to 6. Same lesson, two doors.', 'ستة عشر يتابعون، وثمانية يبدؤون معكِ بالأسئلة من ٤ إلى ٦. الدرس نفسه، بابان.'], [], { xp: 30, discover: 'class-progress', setFlag: 'm6.plan' }),
    out('lOn', 'mixed', ['Eight left behind', 'ثمانية تُركوا خلفهم'], ['The plan moves on. The same eight will miss the next lesson too.', 'تمضي الخطة. والثمانية أنفسهم سيفوتهم الدرس القادم أيضًا.'], [], { xp: 30, discover: 'class-progress', setFlag: 'm6.gap' }),
    out('lThree', 'good', ['Move on, with three in mind', 'تابعي، والثلاثة في ذهنكِ'], ['The class is ready. Three students get a word-problem check-in tomorrow.', 'الصف مستعد. وثلاثة طلاب سيحصلون على متابعة في المسائل الكلامية غدًا.'], [], { xp: 30, discover: 'class-progress', setFlag: 'm6.plan' }),
    out('lRepeat', 'mixed', ['Safe, and slow', 'آمن، وبطيء'], ['A whole lesson spent on what twenty-one students already know.', 'درس كامل لما يعرفه واحد وعشرون طالبًا مسبقًا.'], [], { xp: 30, discover: 'class-progress' }),
    out('shFolder', 'insight', ['Last year\'s exit tickets', 'بطاقات خروج العام الماضي'], ['A folder of old tickets, sorted into three piles with sticky notes: "tomorrow", "this week", "fine". Someone did this before you. It goes in your notebook.', 'ملف بطاقات قديمة، مصنّفة في ثلاث كومات بأوراق لاصقة: «غدًا»، «هذا الأسبوع»، «جيد». أحدهم فعلها قبلكِ. يُحفظ في دفتركِ.'], [], { setFlag: 'm6.folder' }),
    out('psOwn', 'good', ['Her own line goes up', 'خطّها هي يرتفع'], ['Last week, this week: her line goes up. No names, no comparisons. She takes a photo of it.', 'الأسبوع الماضي، وهذا الأسبوع: خطّها يرتفع. لا أسماء ولا مقارنات. وتلتقط له صورة.'], [fx('sara', 0, 2)], { discover: 'class-progress' }),
    out('psLater', 'mixed', ['Tomorrow', 'غدًا'], ['She nods. The moment she wanted to see it was now.', 'تومئ. لكن اللحظة التي أرادت أن تراه فيها كانت الآن.'], []),
    out('pwYes', 'good', ['Checking against the criteria', 'التحقّق وفق المعايير'], ['They check each other against "same multiplier, both sides". Omar finds Ahmed\'s slip.', 'يتحقّق كل منهما من بطاقة الآخر وفق «المضاعف نفسه في الطرفين». ويجد عمر خطأ أحمد.'], [fx('omar', 1, 1)], { discover: 'teams' }),
    out('pwNo', 'mixed', ['You mark them', 'تصحّحينها أنتِ'], ['Accurate, and tonight.', 'دقيق، والليلة.'], []),
    out('prWhy', 'insight', ['Sure, and wrong', 'واثق، ومخطئ'], ['Tomorrow opens with an anonymous "5 out of 5" ticket: "What would you tell this student?"', 'يبدأ الغد ببطاقة «٥ من ٥» دون اسم: «ماذا تقول لهذا الطالب؟»'], [], { discover: 'see-why', setFlag: 'm6.plan' }),
    out('prNote', 'mixed', ['Noted', 'مدوّنة'], ['Six students will start tomorrow just as sure.', 'ستة طلاب سيبدؤون الغد بالثقة نفسها.'], [], { setFlag: 'm6.gap' }),
    out('pbCollect', 'good', ['What\'s done is enough', 'ما أُنجز يكفي'], ['Twenty tickets in. Four will finish at the start of tomorrow.', 'عشرون بطاقة سُلّمت. وأربع ستُستكمل في بداية الغد.'], []),
    out('pbKeep', 'mixed', ['Two minutes late', 'دقيقتان بعد الجرس'], ['You get every ticket, and a queue at the door.', 'تحصلين على كل البطاقات، وطابور عند الباب.'], []),
  ],
  endings: [
    {
      id: 'loose-ends', title: T(['Loose Ends', 'خيوط معلّقة']), priority: 1, when: { flags: ['m6.gap'] }, opens: ['m7'],
      narration: T(['Some evidence was missed or misread. Tomorrow will show you where, and you\'ll be ready to look.', 'فاتكِ بعض الأدلة أو قُرئت بشكل غير دقيق. والغد سيريكِ أين، وستكونين مستعدة لتنظري.']),
    },
    {
      id: 'tomorrow-planned', title: T(['Tomorrow, Planned', 'الغد، مخطّط له']), priority: 2, when: { flags: ['m6.plan'] }, badge: 'evidence-reader', opens: ['m7'],
      narration: T(['You know what each student learned, and tomorrow\'s first five minutes are already written.', 'تعرفين ماذا تعلّم كل طالب، والدقائق الخمس الأولى في الغد مكتوبة بالفعل.']),
    },
    {
      id: 'evidence-read', title: T(['The Evidence, Read', 'الأدلة، مقروءة']), priority: 3, when: { notFlags: ['m6.gap'] }, opens: ['m7'],
      narration: T(['Nothing was taken on trust. The lesson ends with what you know, not what you hope.', 'لم يُؤخذ شيء على الثقة. وينتهي الدرس بما تعرفينه، لا بما تأملينه.']),
    },
  ],
  badges: [
    { id: 'evidence-reader', title: T(['Evidence Reader', 'قارئة الأدلة']), why: T(['You planned tomorrow from what students showed you today.', 'خطّطتِ للغد مما أظهره الطلاب اليوم.']), icon: '▦', when: { flag: 'm6.plan' } },
    { id: 'exit-checked', title: T(['Checked at the Door', 'تحقّق عند الباب']), why: T(['Every student answered on their own before the bell.', 'أجاب كل طالب بمفرده قبل الجرس.']), icon: '⇥', when: { flag: 'm6.ticket' } },
    { id: 'm6-last-five', title: T(['The Last Five Minutes', 'الدقائق الخمس الأخيرة']), why: T(['You used the end of the lesson to look, not just to pack up.', 'استخدمتِ نهاية الدرس لتنظري، لا لتجمعي الأغراض فقط.']), icon: '◔', when: 'always' },
  ],
  communityTopic: T(['Reading the end of a lesson', 'قراءة نهاية الدرس']),
  communityExamples: [
    { who: T(['Math teacher · Ajman', 'معلمة رياضيات · عجمان']), text: T(['Three piles: tomorrow, this week, fine. Five minutes of sorting saves me a lesson.', 'ثلاث كومات: غدًا، هذا الأسبوع، جيد. خمس دقائق من التصنيف توفّر عليّ درسًا كاملًا.']) },
    { who: T(['Grade 7 teacher · Al Ain', 'معلم الصف السابع · العين']), text: T(['I ask for a confidence rating next to every exit ticket. The wrong-and-sure ones are where I start.', 'أطلب تقييمًا للثقة بجانب كل بطاقة خروج. والإجابات الخاطئة الواثقة هي من حيث أبدأ.']) },
  ],
  teaser: [
    { ifFlag: 'm6.gap', text: T(['A few loose ends. Next: the unit test is coming, and every student needs their own route to it.', 'بعض الخيوط المعلّقة. والقادم: اختبار الوحدة يقترب، وكل طالب يحتاج إلى طريقه الخاص إليه.']) },
    { ifFlag: 'm6.plan', text: T(['Tomorrow is planned. Next: the unit test, and what each student needs before it.', 'الغد مخطّط له. والقادم: اختبار الوحدة، وما يحتاجه كل طالب قبله.']) },
    { text: T(['Next: the unit test is coming.', 'والقادم: اختبار الوحدة يقترب.']) },
  ],
};
