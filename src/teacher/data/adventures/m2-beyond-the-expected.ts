/**
 * Mission 02 — Beyond the Expected. Grade 7 · Math (percentages: discounts).
 * Opened by `unlock:m2` (Ahmed's "ready" profile in Mission 01).
 * Extension for ready learners: deeper, not just more (Assign), and leading
 * a team by questioning, not by doing the work (Teams).
 * Branch map: docs/content/TEACHER_CONTENT.md#m02
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M2: Adventure = {
  id: 'm2',
  number: 2,
  title: t('Beyond the Expected', 'أبعد من المتوقّع'),
  meta: t('Mission 02 · Grade 7 · Math', 'المهمة ٠٢ · الصف السابع · الرياضيات'),
  location: 'grade7',
  scene: 'teacher/scenes/m02.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'Real extension goes deeper, not just further: check readiness from evidence, give open problems, and let ready learners lead by asking, not by doing.',
    'الإثراء الحقيقي يتعمّق ولا يكتفي بالمزيد: تحقّق من الاستعداد بالأدلة، وقدّم مسائل مفتوحة، ودع المستعدين يقودون بالسؤال لا بالحل عن غيرهم.',
  ),
  film: [
    { picture: 'teacher/film/m02-1.jpg', narration: T(['Next morning. Ahmed is waiting at the door with yesterday\'s challenge, finished.', 'صباح اليوم التالي. أحمد ينتظر عند الباب وقد أنهى تحدّي الأمس.']) },
    { picture: 'teacher/film/m02-2.jpg', who: 'ahmed', line: T(['Miss, can I have another hard one?', 'أستاذة، هل تعطينني مسألة صعبة أخرى؟']) },
    { picture: 'teacher/film/m02-2.jpg', who: 'reem', line: T(['If Ahmed gets a hard one, I want one too.', 'إذا أخذ أحمد مسألة صعبة، أريد واحدة أيضًا.']) },
    { picture: 'teacher/film/m02-2.jpg', who: 'khalid', line: T(['Do I have to work with them?', 'هل يجب أن أعمل معهم؟']) },
    { picture: 'teacher/film/m02-3.jpg', narration: T(['Ready for more is not the same as more of the same. Where do you start?', 'الاستعداد للمزيد لا يعني المزيد من الشيء نفسه. من أين تبدئين؟']) },
  ],
  intro: [T(['MISSION 02 | Beyond the Expected', 'المهمة ٠٢ | أبعد من المتوقّع']), T(['Stretch the ready ones. Leave nobody waiting.', 'تحدَّي المستعدين، ولا تتركي أحدًا ينتظر.'])],
  introBubbles: [
    { student: 'ahmed', line: T(['Another hard one?', 'مسألة صعبة أخرى؟']) },
    { student: 'reem', line: T(['Me too!', 'وأنا أيضًا!']) },
  ],
  students: [
    {
      id: 'ahmed', name: T(['Ahmed', 'أحمد']), x: 62, y: 50, understanding: 3, engagement: 2,
      idle: T(['Ahmed is already working on the first discount problem.', 'أحمد يعمل على أول مسألة خصم.']),
      homeNote: T(['His older brother is in Grade 9 and often shows him next year\'s maths at home.', 'أخوه الأكبر في الصف التاسع، وكثيرًا ما يريه رياضيات السنوات القادمة في البيت.']),
    },
    {
      id: 'reem', name: T(['Reem', 'ريم']), x: 36, y: 56, understanding: 2, engagement: 2,
      idle: T(['Reem is watching what Ahmed is doing.', 'ريم تراقب ما يفعله أحمد.']),
      homeNote: T(['Her family runs a small grocery; she helps at the till at weekends.', 'تملك عائلتها بقالة صغيرة، وهي تساعد عند الصندوق في عطلة نهاية الأسبوع.']),
    },
    {
      id: 'khalid', name: T(['Khalid', 'خالد']), x: 20, y: 46, understanding: 2, engagement: 1,
      idle: T(['Khalid is working on his own, near the window.', 'خالد يعمل وحده قرب النافذة.']),
      homeNote: T(['New to the school this term; he hasn\'t found his friends yet.', 'جديد في المدرسة هذا الفصل، ولم يجد أصدقاءه بعد.']),
    },
  ],
  objects: [
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '▣', x: 82, y: 64, idle: T(['Today\'s lesson and two possible extensions.', 'درس اليوم، ومهمتان إثرائيتان محتملتان.']) },
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['"20% off 85 dirhams" from yesterday.', '«خصم ٢٠٪ على ٨٥ درهمًا» من الأمس.']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A paper sticks out of a textbook like a bookmark.', 'ورقة تبرز من كتاب كأنها فاصل.']) },
  ],
  schedule: ['ahmed', 'reem', 'khalid', 'laptop', 'board', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'ahmed', kind: 'early-finisher', on: 'ahmed',
      line: T(['"Miss, can I have another hard one?"', '«أستاذة، هل تعطينني مسألة صعبة أخرى؟»']),
      ask: T(['Look at the evidence: is he ready to go deeper, or just faster?', 'انظري إلى الأدلة: هل هو مستعد للتعمّق، أم أنه أسرع فقط؟']),
      investigate: {
        clues: [
          clue('work', ['Yesterday\'s challenge', 'تحدّي الأمس'], ['His finished sheet.', 'ورقته المكتملة.']),
          clue('explain', ['His explanation', 'شرحه'], ['"Talk me through it."', '«اشرح لي.»']),
          clue('peers', ['With others', 'مع زملائه'], ['How does he work with his table?', 'كيف يعمل مع طاولته؟']),
        ],
        profiles: [
          profile('deep', 40, 'm2.ahmed:deep', {
            work: ['All correct, with a second method in the margin.', 'كلها صحيحة، وفي الهامش طريقة ثانية.'],
            explain: ['"You can do 20% off, or just find 80%. Same thing."', '«يمكن أن نطرح ٢٠٪، أو نحسب ٨٠٪ مباشرة. الشيء نفسه.»'],
            peers: ['He works alone, absorbed, and doesn\'t look up.', 'يعمل وحده، مستغرقًا، ولا يرفع رأسه.'],
          }),
          profile('fast', 30, 'm2.ahmed:fast', {
            work: ['Finished in record time. Four small slips: 20% of 85 written as 1.7.', 'أنهاها في وقت قياسي. أربعة أخطاء صغيرة: ٢٠٪ من ٨٥ كتبها ١٫٧.'],
            explain: ['"I just do it quickly. It\'s easy."', '«أحلّها بسرعة فقط. إنها سهلة.»'],
            peers: ['He hands his sheet in first and looks round to see who noticed.', 'يسلّم ورقته أولًا ويلتفت ليرى من لاحظ.'],
          }),
          profile('leader', 30, 'm2.ahmed:leader', {
            work: ['All correct, neat.', 'كلها صحيحة ومرتّبة.'],
            explain: ['Clear, with a drawing of a price tag.', 'واضح، مع رسم لبطاقة سعر.'],
            peers: ['Two students are already asking him how he did number 3.', 'طالبان يسألانه بالفعل كيف حلّ السؤال الثالث.'],
          }),
        ],
      },
      choices: [
        ch(['Assign an open problem', 'كلّفيه بمسألة مفتوحة'], ['Assign', 'التكليف'], 'aOpen', { ifFlag: 'm2.ahmed:deep' }),
        ch(['Make him the group leader', 'اجعليه قائد المجموعة'], ['Teams', 'الفرق'], 'aLeadAll', { ifFlag: 'm2.ahmed:deep' }),
        ch(['"Estimate first. About how much?"', '«قدّر أولًا. كم تقريبًا؟»'], ['See Why', 'اعرف السبب'], 'aEstimate', { ifFlag: 'm2.ahmed:fast' }),
        ch(['Give him a harder set', 'أعطيه مجموعة أصعب'], ['More challenge', 'تحدٍّ أكبر'], 'aMore', { ifFlag: 'm2.ahmed:fast', minutes: 0 }),
        ch(['His job: ask, never tell', 'مهمته: أن يسأل، لا أن يُخبر'], ['Teams', 'الفرق'], 'aQuestioner', { ifFlag: 'm2.ahmed:leader' }),
        ch(['Let him explain it at the front', 'دعيه يشرحها أمام الصف'], ['Peer teaching', 'تعليم الأقران'], 'aTeach', { ifFlag: 'm2.ahmed:leader' }),
      ],
    },
    {
      id: 'reem', kind: 'early-finisher', on: 'reem',
      line: T(['"If Ahmed gets a hard one, I want one too."', '«إذا أخذ أحمد مسألة صعبة، أريد واحدة أيضًا.»']),
      ask: T(['Is she ready for it, or is this about something else?', 'هل هي مستعدة لها، أم أن الأمر يتعلّق بشيء آخر؟']),
      investigate: {
        clues: [
          clue('score', ['Yesterday\'s check', 'تحقّق الأمس'], ['Her answers from yesterday.', 'إجاباتها من الأمس.']),
          clue('work', ['Her working', 'طريقة حلّها'], ['How she got there.', 'كيف وصلت.']),
          clue('says', ['What she says', 'ما تقوله'], ['"Why do you want the hard one?"', '«لماذا تريدين المسألة الصعبة؟»']),
        ],
        profiles: [
          profile('ready', 40, 'm2.reem:ready', {
            score: ['8 of 8.', '٨ من ٨.'],
            work: ['A different method from Ahmed\'s, just as sound.', 'طريقة مختلفة عن طريقة أحمد، وسليمة مثلها.'],
            says: ['"The normal ones are too quick. I want to think."', '«العادية سريعة جدًا. أريد أن أفكّر.»'],
          }),
          profile('compare', 35, 'm2.reem:compare', {
            score: ['7 of 8.', '٧ من ٨.'],
            work: ['Sound, steady, nothing unusual.', 'سليمة وثابتة، لا شيء غير عادي.'],
            says: ['"Ahmed always gets the special ones."', '«أحمد دائمًا يأخذ المسائل الخاصة.»'],
          }),
          profile('gap', 25, 'm2.reem:gap', {
            score: ['6 of 8: both mistakes in converting 0.15 to a percentage.', '٦ من ٨: الخطآن كلاهما في تحويل ٠٫١٥ إلى نسبة مئوية.'],
            work: ['Percent of a number: fine. Decimals to percent: shaky.', 'نسبة من عدد: جيدة. تحويل الكسور العشرية إلى نسبة: متذبذبة.'],
            says: ['"I want the hard one. I nearly got them all."', '«أريد الصعبة. كدت أحلّها كلها.»'],
          }),
        ],
      },
      choices: [
        ch(['Assign the same open problem', 'كلّفيها بالمسألة المفتوحة نفسها'], ['Assign', 'التكليف'], 'rSame', { ifFlag: 'm2.reem:ready' }),
        ch(['Give her a challenge of her own', 'أعطيها تحدّيًا خاصًا بها'], ['Assign', 'التكليف'], 'rOwn', { ifFlag: 'm2.reem:ready' }),
        ch(['"What would you find interesting?"', '«ما الذي يثير اهتمامكِ؟»'], ['Ask her', 'اسأليها'], 'rAsk', { ifFlag: 'm2.reem:compare' }),
        ch(['Give her Ahmed\'s task', 'أعطيها مهمة أحمد'], ['Same task', 'المهمة نفسها'], 'rCopy', { ifFlag: 'm2.reem:compare', minutes: 0 }),
        ch(['Five quick conversions first', 'خمسة تحويلات سريعة أولًا'], ['Practice', 'التدريب'], 'rPractice', { ifFlag: 'm2.reem:gap' }),
        ch(['Give her the extension now', 'أعطيها المهمة الإثرائية الآن'], ['Extension', 'إثراء'], 'rNow', { ifFlag: 'm2.reem:gap', minutes: 0 }),
      ],
    },
    {
      id: 'khalid', kind: 'low-participation', on: 'khalid',
      line: T(['"Do I have to work with them?"', '«هل يجب أن أعمل معهم؟»']),
      ask: T(['What\'s behind the question?', 'ما الذي وراء هذا السؤال؟']),
      investigate: {
        clues: [
          clue('face', ['His face', 'ملامحه'], ['How does he look?', 'كيف يبدو؟']),
          clue('work', ['His notebook', 'دفتره'], ['What has he done?', 'ماذا أنجز؟']),
          clue('says', ['What he says', 'ما يقوله'], ['"What\'s up, Khalid?"', '«ما الأمر يا خالد؟»']),
        ],
        profiles: [
          profile('unsure', 40, 'm2.khalid:unsure', {
            face: ['He glances at Ahmed\'s sheet, then hides his own.', 'ينظر إلى ورقة أحمد، ثم يخفي ورقته.'],
            work: ['The core questions done, slowly and correctly.', 'الأسئلة الأساسية محلولة، ببطء وبشكل صحيح.'],
            says: ['"They\'re the clever ones. I\'ll slow them down."', '«هم الأذكياء. سأؤخّرهم.»'],
          }),
          profile('ready', 30, 'm2.khalid:ready', {
            face: ['Calm. He has finished and is waiting, as usual.', 'هادئ. أنهى وينتظر، كعادته.'],
            work: ['Last week\'s extension, done at home, unasked.', 'المهمة الإثرائية من الأسبوع الماضي، حلّها في البيت دون أن يطلبها أحد.'],
            says: ['"I like doing them alone. Nobody asks me."', '«أحب أن أحلّها وحدي. لا أحد يطلب مني.»'],
          }),
          profile('social', 30, 'm2.khalid:social', {
            face: ['He and Ahmed avoid looking at each other.', 'هو وأحمد يتجنّبان النظر إلى بعضهما.'],
            work: ['Fine work, a solid start on the challenge.', 'عمل جيد، وبداية متينة في التحدّي.'],
            says: ['"Ahmed laughed at my answer last week."', '«ضحك أحمد على إجابتي الأسبوع الماضي.»'],
          }),
        ],
      },
      choices: [
        ch(['Same problem, with his own way in', 'المسألة نفسها، بمدخل خاص به'], ['Assign', 'التكليف'], 'kEntry', { ifFlag: 'm2.khalid:unsure' }),
        ch(['Pair him with Ahmed', 'اجعليه مع أحمد'], ['Teams', 'الفرق'], [{ ifFlag: 'm2.peerLead', outcome: 'kPairGood' }, { outcome: 'kPairCarried' }], { ifFlag: 'm2.khalid:unsure' }),
        ch(['Assign him the open problem too', 'كلّفيه بالمسألة المفتوحة أيضًا'], ['Assign', 'التكليف'], 'kSurprise', { ifFlag: 'm2.khalid:ready' }),
        ch(['Keep him on the core task', 'أبقيه على المهمة الأساسية'], ['Core task', 'المهمة الأساسية'], 'kCore', { ifFlag: 'm2.khalid:ready', minutes: 0 }),
        ch(['Roles for all three', 'أدوار للثلاثة'], ['Teams', 'الفرق'], 'kRoles', { ifFlag: 'm2.khalid:social' }),
        ch(['Let him work alone today', 'دعيه يعمل وحده اليوم'], ['Alone', 'منفردًا'], 'kApart', { ifFlag: 'm2.khalid:social', minutes: 0 }),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['Choose today\'s extension', 'اختاري مهمة اليوم الإثرائية']),
      ask: T(['Two options are ready to assign.', 'خياران جاهزان للتكليف.']),
      choices: [
        ch(['An open problem: design a sale', 'مسألة مفتوحة: صمّم عرض تخفيضات'], ['Assign', 'التكليف'], 'lOpen'),
        ch(['Ten harder questions', 'عشرة أسئلة أصعب'], ['Harder set', 'مجموعة أصعب'], 'lHarder', { minutes: 0 }),
      ],
    },
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['Bring the methods together', 'اجمعي الطرق معًا']),
      ask: T(['How will the class see the thinking?', 'كيف سيرى الصف طريقة التفكير؟']),
      choices: [
        ch(['Three methods side by side', 'ثلاث طرق جنبًا إلى جنب'], ['Present Mode', 'وضع العرض'], 'bStrategies'),
        ch(['Show the worked answer', 'اعرضي الحل النموذجي'], ['Model answer', 'الحل النموذجي'], 'bAnswer', { minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['An old receipt, used as a bookmark.', 'إيصال قديم، يُستخدم فاصلًا للكتاب.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Read the receipt', 'اقرئي الإيصال'], ['Hidden discovery', 'اكتشاف مخفي'], 'kReceipt', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pCompound', kind: 'new-event', on: 'ahmed', category: 'learning', weight: 35, eligible: { notFlags: ['m2.ahmed:fast'] },
      line: T(['Ahmed: "What if there\'s a discount on the discount?"', 'أحمد: «وماذا لو كان هناك خصم على الخصم؟»']),
      ask: T(['A question bigger than today\'s lesson.', 'سؤال أكبر من درس اليوم.']),
      choices: [
        ch(['Give it to the whole class', 'اطرحيه على الصف كله'], ['Class challenge', 'تحدٍّ للصف'], 'pcClass'),
        ch(['Save it just for him', 'احتفظي به له وحده'], ['His extension', 'إثراؤه'], 'pcPark', { minutes: 0 }),
      ],
    },
    {
      id: 'pCompare', kind: 'new-event', on: 'reem', category: 'collaboration', weight: 25,
      line: T(['Reem and Khalid have different answers. Both are sure.', 'ريم وخالد لديهما إجابتان مختلفتان، وكلاهما متأكد.']),
      ask: T(['A disagreement worth having?', 'خلاف يستحق النقاش؟']),
      choices: [
        ch(['"Prove it to each other"', '«أثبتا ذلك لبعضكما»'], ['Teams', 'الفرق'], 'pmProve'),
        ch(['Show them who is right', 'أريهما من المحق'], ['Correct it', 'تصحيح'], 'pmTell', { minutes: 0 }),
      ],
    },
    {
      id: 'pMyth', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20,
      line: T(['A voice: "20% off, then 20% on, and you\'re back where you started."', 'صوت: «خصم ٢٠٪ ثم زيادة ٢٠٪، فنعود إلى السعر نفسه.»']),
      ask: T(['Most of the class agrees. It sounds fair.', 'معظم الصف يوافق. يبدو الأمر منطقيًا.']),
      choices: [
        ch(['"20% of what, each time?"', '«٢٠٪ من ماذا، في كل مرة؟»'], ['See Why', 'اعرف السبب'], 'pyWhy'),
        ch(['"Test it with 100 dirhams"', '«جرّبوها على ١٠٠ درهم»'], ['Try it', 'جرّبوا'], 'pyTest'),
      ],
    },
    {
      id: 'pSheets', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['The printed extension sheets have run out.', 'نفدت أوراق المهمة الإثرائية المطبوعة.']),
      ask: T(['Three students are waiting for one.', 'ثلاثة طلاب ينتظرون ورقة.']),
      choices: [
        ch(['Send it to their tablets', 'أرسليها إلى أجهزتهم'], ['Assign', 'التكليف'], 'psAssign'),
        ch(['Write it on the board', 'اكتبيها على السبورة'], ['Board', 'السبورة'], 'psBoard'),
      ],
    },
  ],
  outcomes: [
    out('aOpen', 'good', ['An open problem', 'مسألة مفتوحة'], ['Design a sale: three offers, one budget, prove which is best. It is harder than anything in the book, and he will be at it all lesson.', 'صمّم عرض تخفيضات: ثلاثة عروض وميزانية واحدة، وأثبت أيها الأفضل. أصعب من أي شيء في الكتاب، وسيعمل عليها طوال الحصة.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'm2.stretch' }),
    out('aLeadAll', 'mixed', ['He does it for them', 'يحلّها عنهم'], ['As group leader he solves it and dictates. The group sheet is perfect; one of them learned.', 'بصفته قائدًا، يحلّها ويُملي على المجموعة. ورقة المجموعة مثالية، لكن واحدًا فقط تعلّم.'], [fx('ahmed', 0, 1), fx('khalid', 0, -1)], { xp: 30, setFlag: 'm2.takeover' }),
    out('aEstimate', 'insight', ['Estimate first', 'التقدير أولًا'], ['"About how much should it be?" His 20% of 85 was 1.7. He laughs, fixes it, and starts estimating everything.', '«كم يجب أن تكون تقريبًا؟» كان قد كتب ٢٠٪ من ٨٥ تساوي ١٫٧. يضحك، ويصحّحها، ويبدأ بتقدير كل شيء.'], [fx('ahmed', 1, 0)], { xp: 30, discover: 'see-why' }),
    out('aMore', 'mixed', ['Faster slips', 'أخطاء أسرع'], ['A harder set, done in record time, with four slips. Faster is not further.', 'مجموعة أصعب، أنهاها في وقت قياسي، وفيها أربعة أخطاء. الأسرع ليس الأبعد.'], [], { xp: 30, setFlag: 'm2.gap' }),
    out('aQuestioner', 'good', ['The questioner, not the solver', 'السائل، لا الحالّ'], ['His job: ask, never tell. "What did you do first?" Khalid answers it himself.', 'مهمته: أن يسأل ولا يُخبر. «ماذا فعلت أولًا؟» ويجيب خالد بنفسه.'], [fx('ahmed', 1, 1), fx('khalid', 1, 1)], { xp: 30, discover: 'teams', setFlag: 'm2.peerLead' }),
    out('aTeach', 'mixed', ['Mini teacher', 'معلّم صغير'], ['He explains well at the front. The others copy his method and stop thinking.', 'يشرح جيدًا أمام الصف. والآخرون ينسخون طريقته ويتوقّفون عن التفكير.'], [fx('ahmed', 0, 1)], { xp: 30, setFlag: 'm2.takeover' }),
    out('rSame', 'good', ['Two routes, one answer', 'طريقان إلى إجابة واحدة'], ['She and Ahmed take different routes to the same answer. Comparing them is the best maths of the morning.', 'هي وأحمد يسلكان طريقين مختلفين إلى الإجابة نفسها. والمقارنة بينهما أجمل رياضيات في الصباح.'], [fx('reem', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'm2.stretch' }),
    out('rOwn', 'good', ['Her own challenge', 'تحدّيها الخاص'], ['A sale problem about a grocery like her family\'s. She invents the numbers and checks them herself.', 'مسألة تخفيضات عن بقالة مثل بقالة عائلتها. تخترع الأرقام وتتحقّق منها بنفسها.'], [fx('reem', 1, 2)], { xp: 30, discover: 'assign', setFlag: 'm2.stretch' }),
    out('rAsk', 'insight', ['"Something with real shops"', '«شيء عن محلات حقيقية»'], ['It was never about Ahmed\'s task. It was about being seen as ready. Now she has her own question.', 'لم يكن الأمر يومًا عن مهمة أحمد، بل عن أن يُرى أنها مستعدة. والآن لديها سؤالها الخاص.'], [fx('reem', 0, 2)], { xp: 30 }),
    out('rCopy', 'mixed', ['Same task, borrowed thinking', 'المهمة نفسها، وتفكير مستعار'], ['She finishes it using Ahmed\'s table step by step. Hard work, someone else\'s idea.', 'تنهيها باستخدام جدول أحمد خطوة بخطوة. جهد كبير، وفكرة غيرها.'], [fx('reem', 0, 1)], { xp: 30 }),
    out('rPractice', 'good', ['Decimals first, then further', 'الكسور العشرية أولًا، ثم الأبعد'], ['Five quick conversions: 0.15 is 15%. Then the extension, and this time it holds.', 'خمسة تحويلات سريعة: ٠٫١٥ تساوي ١٥٪. ثم المهمة الإثرائية، وهذه المرة تصمد.'], [fx('reem', 1, 1)], { xp: 30, discover: 'practice' }),
    out('rNow', 'mixed', ['Extension on a crack', 'إثراء فوق شقّ'], ['The extension needs 0.15 as a percentage. She stalls on the second step.', 'المهمة الإثرائية تحتاج إلى تحويل ٠٫١٥ إلى نسبة مئوية. فتتوقّف عند الخطوة الثانية.'], [fx('reem', 0, -1)], { xp: 30, setFlag: 'm2.gap' }),
    out('kEntry', 'good', ['His own way in', 'مدخله الخاص'], ['The same sale problem, with the first offer worked out. He does the other two himself.', 'مسألة التخفيضات نفسها، والعرض الأول محلول. ويحلّ العرضين الآخرين بنفسه.'], [fx('khalid', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'm2.stretch' }),
    out('kPairGood', 'good', ['A pair that thinks', 'ثنائي يفكّر'], ['Ahmed asks; Khalid solves. "You did it, not me," Ahmed says.', 'أحمد يسأل، وخالد يحلّ. «أنت حللتها، لا أنا»، يقول أحمد.'], [fx('khalid', 1, 2)], { xp: 30, discover: 'teams' }),
    out('kPairCarried', 'mixed', ['Carried along', 'محمول مع التيار'], ['Ahmed does the working; Khalid writes it down.', 'أحمد يحلّ، وخالد يكتب.'], [fx('khalid', 0, -1)], { xp: 30, discover: 'teams', setFlag: 'm2.takeover' }),
    out('kSurprise', 'good', ['The quiet one is ready', 'الهادئ مستعد'], ['Last week\'s extension, done at home, unasked. Today he gets the open problem too, and smiles.', 'حلّ المهمة الإثرائية في البيت دون أن يطلبها أحد. واليوم يأخذ المسألة المفتوحة أيضًا، ويبتسم.'], [fx('khalid', 1, 2)], { xp: 30, discover: 'assign', setFlag: 'm2.stretch' }),
    out('kCore', 'mixed', ['Waiting, as always', 'ينتظر، كعادته'], ['He finishes the core task in minutes and waits. Nobody notices, as usual.', 'ينهي المهمة الأساسية في دقائق وينتظر. ولا أحد يلاحظ، كالعادة.'], [fx('khalid', 0, -1)], { xp: 30 }),
    out('kRoles', 'good', ['Roles first, friends later', 'الأدوار أولًا، والصداقة لاحقًا'], ['Khalid checks, Ahmed explains, Reem records. The friction drops when everyone has a job.', 'خالد يتحقّق، وأحمد يشرح، وريم تكتب. يخفّ التوتر حين يكون لكل واحد مهمة.'], [fx('khalid', 1, 1), fx('ahmed', 0, 1)], { xp: 30, discover: 'teams', setFlag: 'm2.peerLead' }),
    out('kApart', 'mixed', ['Apart, and quiet', 'منفرد وصامت'], ['He works alone, calmly, and doesn\'t ask anyone anything all lesson.', 'يعمل وحده بهدوء، ولا يسأل أحدًا شيئًا طوال الحصة.'], [], { xp: 30 }),
    out('lOpen', 'good', ['An open problem, assigned', 'مسألة مفتوحة، بالتكليف'], ['"Design a sale": no single answer, three offers to compare, a reason required.', '«صمّم عرض تخفيضات»: لا إجابة واحدة، وثلاثة عروض للمقارنة، والتعليل مطلوب.'], [], { discover: 'assign', setFlag: 'm2.stretch' }),
    out('lHarder', 'mixed', ['More of the same, bigger numbers', 'الشيء نفسه بأعداد أكبر'], ['Ten harder questions. The fast ones will finish them fast.', 'عشرة أسئلة أصعب. والسريعون سينهونها بسرعة.'], []),
    out('bStrategies', 'good', ['Three methods side by side', 'ثلاث طرق جنبًا إلى جنب'], ['Ahmed\'s 80%, Reem\'s table, Khalid\'s price tags. The class sees there is more than one way to be right.', 'نسبة الـ٨٠٪ عند أحمد، وجدول ريم، وبطاقات الأسعار عند خالد. يرى الصف أن للصواب أكثر من طريق.'], [fx('khalid', 0, 1), fx('reem', 0, 1)], { discover: 'present-mode', setFlag: 'm2.peerLead' }),
    out('bAnswer', 'mixed', ['One right way', 'طريقة صحيحة واحدة'], ['Clear and correct. Everyone copies the same method.', 'واضح وصحيح. والجميع ينسخون الطريقة نفسها.'], []),
    out('kReceipt', 'insight', ['"Buy 2, get 1 free"', '«اشترِ ٢ واحصل على الثالث مجانًا»'], ['Is that better than 30% off? A receipt from the canteen supplier, and tomorrow\'s warm-up. It goes in your notebook.', 'هل هذا أفضل من خصم ٣٠٪؟ إيصال من مورّد المقصف، وتمهيد درس الغد. يُحفظ في دفتركِ.'], [], { setFlag: 'm2.receipt' }),
    out('pcClass', 'good', ['Everyone gets the good question', 'السؤال الجميل للجميع'], ['"Discount on the discount" goes on the board. Three tables try it; one finds it isn\'t 40% off.', 'يُكتب «خصم على الخصم» على السبورة. تجرّبه ثلاث طاولات، وتكتشف إحداها أنه ليس خصمًا بنسبة ٤٠٪.'], [fx('reem', 1, 0), fx('khalid', 0, 1)], { setFlag: 'm2.peerLead' }),
    out('pcPark', 'mixed', ['Only Ahmed gets it', 'لأحمد وحده'], ['A great question, kept for the one student who needed it least.', 'سؤال رائع، احتُفظ به للطالب الذي كان أقلّهم حاجة إليه.'], [fx('ahmed', 1, 0)]),
    out('pmProve', 'good', ['A disagreement that teaches', 'خلاف يعلّم'], ['Khalid finds Reem\'s slip; Reem finds Khalid\'s shortcut. Both answers improve.', 'خالد يجد خطأ ريم، وريم تجد طريقة خالد المختصرة. وتتحسّن الإجابتان.'], [fx('reem', 1, 0), fx('khalid', 1, 1)], { discover: 'teams', setFlag: 'm2.peerLead' }),
    out('pmTell', 'mixed', ['Settled, not understood', 'حُسم، ولم يُفهم'], ['Reem was right. Khalid nods and doesn\'t ask why.', 'ريم كانت محقة. يومئ خالد ولا يسأل لماذا.'], [fx('khalid', 0, -1)]),
    out('pyWhy', 'insight', ['20% of a different number', '٢٠٪ من عدد مختلف'], ['"The second 20% is of the smaller price." The class sees the trap for itself.', '«الـ٢٠٪ الثانية من السعر الأصغر.» يرى الصف الفخّ بنفسه.'], [fx('reem', 1, 0)], { discover: 'see-why' }),
    out('pyTest', 'good', ['100 → 80 → 96', '١٠٠ ← ٨٠ ← ٩٦'], ['They test it and lose 4 dirhams. "So it\'s a trick!" It\'s maths.', 'يجرّبونها ويخسرون ٤ دراهم. «إذن إنها خدعة!» بل إنها رياضيات.'], [fx('khalid', 1, 0)]),
    out('psAssign', 'good', ['On every tablet', 'على كل جهاز'], ['The extension arrives in seconds, for the three who were waiting.', 'تصل المهمة الإثرائية في ثوانٍ للثلاثة الذين كانوا ينتظرون.'], [], { discover: 'assign' }),
    out('psBoard', 'good', ['On the board', 'على السبورة'], ['It works. The front table copies it out first.', 'ينجح الأمر. والطاولة الأمامية تنسخها أولًا.'], []),
  ],
  endings: [
    {
      id: 'more-than-more', title: T(['More Than More', 'أكثر من «المزيد»']), priority: 1, when: { flags: ['m2.gap'] }, opens: ['m6'],
      narration: T(['An extension found a crack underneath. Ready for more is not the same as finished with the basics. The evidence will show you where.', 'كشفت المهمة الإثرائية شقًا تحتها. الاستعداد للمزيد لا يعني الانتهاء من الأساسيات. والأدلة ستريكِ أين.']),
    },
    {
      id: 'team-that-thinks', title: T(['A Team That Thinks', 'فريق يفكّر']), priority: 2, when: { flags: ['m2.peerLead'] }, opens: ['m6'],
      narration: T(['The ready learners lifted the others without doing the work for them.', 'رفع المستعدون زملاءهم دون أن يقوموا بالعمل عنهم.']),
    },
    {
      id: 'ceiling-lifts', title: T(['The Ceiling Lifts', 'السقف يرتفع']), priority: 3, when: { notFlags: ['m2.gap'] }, badge: 'beyond-the-expected', opens: ['m7'],
      narration: T(['Every ready learner had something worth thinking about, and nobody was left waiting.', 'كان لدى كل طالب مستعد شيء يستحق التفكير، ولم يُترك أحد ينتظر.']),
    },
  ],
  badges: [
    { id: 'beyond-the-expected', title: T(['Beyond the Expected', 'أبعد من المتوقّع']), why: T(['You gave ready learners depth, not just more.', 'منحتِ المستعدين عمقًا، لا مزيدًا فقط.']), icon: '↗', when: { flag: 'm2.stretch' } },
    { id: 'lead-not-carry', title: T(['Leading, Not Carrying', 'يقود ولا يحمل']), why: T(['A strong student led by asking, and others did the thinking.', 'قاد طالب متمكّن بالسؤال، وفكّر الآخرون بأنفسهم.']), icon: '◎', when: { flag: 'm2.peerLead' } },
    { id: 'm2-raised', title: T(['Raised the Ceiling', 'رفعتِ السقف']), why: T(['You looked for readiness in more than one student.', 'بحثتِ عن الاستعداد لدى أكثر من طالب.']), icon: '△', when: 'always' },
  ],
  communityTopic: T(['Extension that goes deeper', 'إثراء يتعمّق']),
  communityExamples: [
    { who: T(['Math teacher · Al Ain', 'معلمة رياضيات · العين']), text: T(['My early finishers get one open problem, not ten closed ones. They argue about it for days.', 'من ينهي مبكرًا يأخذ مسألة مفتوحة واحدة، لا عشر مسائل مغلقة. ويتناقشون فيها أيامًا.']) },
    { who: T(['Grade 7 teacher · Fujairah', 'معلم الصف السابع · الفجيرة']), text: T(['My best helpers are the ones who ask questions, not the ones who give answers.', 'أفضل المساعدين عندي هم من يطرحون الأسئلة، لا من يعطون الإجابات.']) },
  ],
  teaser: [
    { ifFlag: 'm2.takeover', text: T(['Ahmed carried his group today. Next: how do you see who actually learned?', 'حمل أحمد مجموعته اليوم. والقادم: كيف تعرفين من تعلّم فعلًا؟']) },
    { ifFlag: 'm2.gap', text: T(['The extension found a crack. Next: read the evidence before you move on.', 'كشف الإثراء شقًا. والقادم: اقرئي الأدلة قبل أن تمضي.']) },
    { text: T(['The ceiling lifted. Next: different routes for different learners.', 'ارتفع السقف. والقادم: مسارات مختلفة لمتعلّمين مختلفين.']) },
  ],
};
