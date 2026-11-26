/**
 * Adventure 2 — The Quiet Table (Grade 5 Science, dissolving and temperature).
 * Volunteers vs drawing everyone in. Noura is capable and silent; putting her
 * on the spot backfires unless you already know what she wrote (peek / boards).
 * Reads a1.omarIn (Omar remembers being reporter).
 * Branch map: docs/content/TEACHER_CONTENT.md#a2
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A2: Adventure = {
  id: 'a2',
  number: 2,
  title: t('The Quiet Table', 'الطاولة الهادئة'),
  meta: t('Grade 5 · Science', 'الصف الخامس · العلوم'),
  location: 'grade5',
  scene: 'teacher/scenes/a2.jpg',
  takeaway: t(
    'Five hands up is not the class thinking: give quiet students a rehearsal and a warning, and their best ideas reach the room.',
    'خمس أيادٍ مرفوعة لا تعني أن الصف كله يفكّر: امنح الطالب الهادئ فرصة ليتدرّب وتنبيهًا مسبقًا، فتصل أفضل أفكاره إلى الصف.',
  ),
  intro: [
    t(
      'Science, same Grade 5 class. Today\'s question: does sugar dissolve faster in hot water or cold?',
      'حصة العلوم مع الصف الخامس نفسه. سؤال اليوم: هل يذوب السكر أسرع في الماء الساخن أم البارد؟',
    ),
    t(
      'The same five hands go up for every question. At the table by the window, nobody has spoken all week.',
      'الأيادي الخمس نفسها ترتفع مع كل سؤال. وعلى الطاولة المجاورة للنافذة، لم يتكلّم أحد طوال الأسبوع.',
    ),
    t(
      'Quiet is not the same as not thinking. Find out what the quiet table knows.',
      'الصمت لا يعني غياب التفكير. اكتشفي ما تعرفه الطاولة الهادئة.',
    ),
  ],
  introBubbles: [
    { student: 'ahmed', line: t('Miss! Miss! Me!', 'أستاذة! أستاذة! أنا!') },
    { student: 'khalid', line: t('…', '…') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'noura',
      name: t('Noura', 'نورة'),
      x: 30,
      y: 64,
      understanding: 2,
      engagement: 0,
      idle: t('Noura is writing small, neat notes. She hasn\'t looked up.', 'نورة تكتب ملاحظات صغيرة مرتّبة، ولم ترفع رأسها.'),
      homeNote: t(
        'The eldest of five. At home she talks all the time; she is quiet only at school.',
        'الكبرى بين خمسة إخوة. في البيت تتكلّم طوال الوقت، وهي هادئة في المدرسة فقط.',
      ),
      peek: {
        text: t(
          'Noura\'s notebook: "Hot water: the bits move faster and knock the sugar apart." The best answer in the room, and nobody knows.',
          'في دفتر نورة: «الماء الساخن: جزيئاته تتحرك أسرع فتفكّك السكر.» أفضل إجابة في الصف، ولا أحد يعرف.',
        ),
        setFlag: 'a2.peekedNoura',
      },
    },
    {
      id: 'khalid',
      name: t('Khalid', 'خالد'),
      x: 16,
      y: 58,
      understanding: 1,
      engagement: 1,
      idle: t('Khalid is turning an empty beaker round and round.', 'خالد يدير كأسًا زجاجية فارغة بين يديه.'),
      homeNote: t(
        'His family moved from another emirate this summer. New school, new friends, new everything.',
        'انتقلت عائلته من إمارة أخرى هذا الصيف. مدرسة جديدة، وأصدقاء جدد، وكل شيء جديد.',
      ),
    },
    {
      id: 'omar',
      name: t('Omar', 'عمر'),
      x: 42,
      y: 56,
      understanding: 1,
      engagement: 1,
      idle: t('Omar is watching the other tables\' experiments.', 'عمر يراقب تجارب الطاولات الأخرى.'),
      homeNote: t(
        'His dad works night shifts, so mornings are rushed and Omar often arrives without breakfast.',
        'والده يعمل في نوبات ليلية، فالصباح عندهم مستعجل، وكثيرًا ما يصل عمر دون أن يفطر.',
      ),
    },
    {
      id: 'ahmed',
      name: t('Ahmed', 'أحمد'),
      x: 72,
      y: 42,
      understanding: 2,
      engagement: 3,
      idle: t('Ahmed\'s hand is half up already, just in case.', 'يد أحمد مرفوعة إلى النصف، احتياطًا.'),
      homeNote: t(
        'Both his parents are teachers. At home, finishing fast is what gets noticed.',
        'والداه معلّمان. وفي البيت، الإنهاء السريع هو ما يلفت الانتباه.',
      ),
    },
  ],
  objects: [
    {
      id: 'board',
      label: t('Board', 'السبورة'),
      icon: '▭',
      x: 50,
      y: 16,
      idle: t(
        'On the board: "Hot or cold: which dissolves sugar faster? Why?"',
        'على السبورة: «الساخن أم البارد: أيهما يذيب السكر أسرع؟ ولماذا؟»',
      ),
    },
    {
      id: 'tray',
      label: t('Experiment tray', 'صينية التجربة'),
      icon: '⚗',
      x: 30,
      y: 78,
      idle: t(
        'Two beakers, warm and cold water, sugar cubes, a timer.',
        'كأسان، ماء دافئ وماء بارد، مكعبات سكر، ومؤقّت.',
      ),
    },
  ],
  schedule: [
    { event: 'bigQuestion', at: 3 },
    { event: 'nouraMoment', at: 9 },
    { event: 'khalidHelp', at: 14 },
    { event: 'spill', at: 24 },
  ],
  events: [
    {
      id: 'bigQuestion',
      kind: 'low-participation',
      on: 'board',
      line: t('"Hot or cold: which dissolves sugar faster?"', '«الساخن أم البارد: أيهما يذيب السكر أسرع؟»'),
      ask: t(
        'Five hands shoot up, Ahmed\'s first as always. The quiet table looks at the floor.',
        'ترتفع خمس أيادٍ، ويد أحمد أولها كالعادة. والطاولة الهادئة تنظر إلى الأرض.',
      ),
      choices: [
        {
          label: t('Take Ahmed\'s answer', 'خذي إجابة أحمد'),
          sub: t('Volunteers', 'المتطوّعون'),
          minutes: 1,
          outcome: 'ahmedAnswers',
        },
        {
          label: t('Think, then tell a partner', 'فكّروا، ثم أخبروا زملاءكم'),
          sub: t('Think, pair, share', 'فكّر، ناقش، شارك'),
          minutes: 3,
          resource: 'think-pair-share',
          outcome: 'pairsTalk',
        },
        {
          label: t('Everyone writes it on a board', 'الجميع يكتب على سبورته'),
          sub: t('Show-me boards', 'السبورات الصغيرة'),
          minutes: 3,
          resource: 'show-me-boards',
          outcome: 'boardsUp',
        },
      ],
    },
    {
      id: 'nouraMoment',
      kind: 'low-participation',
      on: 'noura',
      line: t('Noura hasn\'t said a word all week.', 'لم تنطق نورة بكلمة طوال الأسبوع.'),
      ask: t(
        'Her table must give the class one prediction. Noura has it written down; the others are waiting for someone to speak.',
        'على طاولتها أن تقدّم للصف توقّعًا واحدًا. نورة كتبته، والبقية ينتظرون أن يتكلّم أحد.',
      ),
      choices: [
        {
          label: t('Ask her to share now', 'اطلبي منها أن تشارك الآن'),
          sub: t('Call on her', 'النداء بالاسم'),
          minutes: 1,
          outcome: [
            { ifFlag: 'a2.peekedNoura', outcome: 'nouraReads' },
            { ifFlag: 'a2.sawNoura', outcome: 'nouraReads' },
            { outcome: 'nouraFreezes' },
          ],
        },
        {
          label: t('"In two minutes, I\'ll ask you"', '«بعد دقيقتين سأسألك»'),
          sub: t('Warned call', 'نداء مع تنبيه'),
          minutes: 2,
          resource: 'warned-call',
          outcome: 'warmCall',
        },
        {
          label: t('Let Omar report for the table', 'دعي عمر يتحدّث باسم الطاولة'),
          sub: t('Team roles', 'أدوار الفريق'),
          minutes: 2,
          resource: 'team-roles',
          outcome: [{ ifFlag: 'a1.omarIn', outcome: 'omarReports' }, { outcome: 'omarGuesses' }],
        },
        {
          label: t('Leave her be; she\'s learning', 'اتركيها، فهي تتعلّم'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'nouraSilent',
        },
      ],
    },
    {
      id: 'khalidHelp',
      kind: 'needs-help',
      on: 'khalid',
      line: t('"Miss, the sugar melted. It\'s gone."', '«أستاذة، السكر ذاب واختفى.»'),
      ask: t(
        'Khalid stirred his beaker and the sugar disappeared. He is sure it has gone for good.',
        'حرّك خالد الكأس فاختفى السكر. وهو متأكد أنه اختفى تمامًا.',
      ),
      choices: [
        {
          label: t('Ask: "Where did it go?"', 'اسأليه: «أين ذهب؟»'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 3,
          resource: 'explain-thinking',
          outcome: 'meltIdea',
        },
        {
          label: t('Sit him next to Noura', 'أجلسيه بجانب نورة'),
          sub: t('Peer partner', 'زميل مساعد'),
          minutes: 2,
          outcome: [{ ifFlag: 'a2.nouraSpoke', outcome: 'nouraTeaches' }, { outcome: 'silentPair' }],
        },
      ],
    },
    {
      id: 'spill',
      kind: 'unexpected',
      on: 'tray',
      line: t('A beaker tips. Warm water floods the quiet table.', 'انقلبت كأس، والماء الدافئ يغمر الطاولة الهادئة.'),
      ask: t(
        'Their results sheet is soaked and the experiment has to start again. Sixteen minutes left.',
        'ورقة النتائج غرقت، والتجربة يجب أن تبدأ من جديد. بقيت ست عشرة دقيقة.',
      ),
      choices: [
        {
          label: t('Join Ahmed\'s table', 'انضمّوا إلى طاولة أحمد'),
          sub: t('Merge groups', 'دمج المجموعات'),
          minutes: 1,
          outcome: 'merged',
        },
        {
          label: t('Restart with jobs: pourer, timer, recorder', 'ابدؤوا من جديد بمهام: من يصبّ، من يوقّت، من يكتب'),
          sub: t('Team roles', 'أدوار الفريق'),
          minutes: 3,
          resource: 'team-roles',
          outcome: 'restartRoles',
        },
      ],
    },
    /* ---- follow-ups ---- */
    {
      id: 'quietDrift',
      kind: 'new-event',
      on: 'omar',
      line: t('Omar and Khalid are building a tower of beakers.', 'عمر وخالد يبنيان برجًا من الكؤوس.'),
      ask: t(
        'The quiet table never had to think about the question. It shows.',
        'الطاولة الهادئة لم تحتج إلى التفكير في السؤال، وهذا واضح.',
      ),
      choices: [
        {
          label: t('"Show me your prediction"', '«أروني توقّعكم»'),
          sub: t('Show-me boards', 'السبورات الصغيرة'),
          minutes: 2,
          resource: 'show-me-boards',
          outcome: 'boardsLate',
        },
        {
          label: t('Stand by their table', 'قفي قرب طاولتهم'),
          sub: t('Be close by', 'القرب منهم'),
          minutes: 1,
          outcome: 'proximity',
        },
      ],
    },
    {
      id: 'overhear',
      kind: 'new-event',
      on: 'noura',
      line: t('You overhear Noura: "…the water bits move faster."', 'تسمعين نورة تقول: «…جزيئات الماء تتحرك أسرع.»'),
      ask: t(
        'It is the best idea in the room, and she said it to one person.',
        'إنها أفضل فكرة في الصف، وقد قالتها لشخص واحد فقط.',
      ),
      choices: [
        {
          label: t('"Can I share your idea?"', '«هل أشارك فكرتك مع الصف؟»'),
          sub: t('Ask permission', 'استئذان'),
          minutes: 1,
          outcome: 'shared',
        },
        {
          label: t('Ask her to tell the class', 'اطلبي منها أن تقولها للصف'),
          sub: t('Call on her', 'النداء بالاسم'),
          minutes: 1,
          outcome: 'tooSoon',
        },
      ],
    },
    {
      id: 'tasteTest',
      kind: 'unexpected',
      on: 'khalid',
      line: t('"Miss, can I taste it? Then I\'ll know it\'s still there."', '«أستاذة، هل أتذوّقه؟ هكذا أعرف إن كان ما زال موجودًا.»'),
      ask: t(
        'A real scientist\'s question, and the lab rule says no tasting.',
        'سؤال عالِم حقيقي، لكن قاعدة المختبر تمنع التذوّق.',
      ),
      choices: [
        {
          label: t('"Scientists find another way"', '«العلماء يجدون طريقة أخرى»'),
          sub: t('Extension task', 'مهمة إثرائية'),
          minutes: 2,
          resource: 'extension-task',
          outcome: 'evaporate',
        },
        {
          label: t('"No tasting in the lab." Move on.', '«ممنوع التذوّق في المختبر.» وتابعي.'),
          sub: t('Lab rule', 'قاعدة المختبر'),
          minutes: 0,
          outcome: 'ruleOnly',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'ahmedAnswers',
      tone: 'mixed',
      title: t('Quick, and nearly right', 'سريعة، وصحيحة تقريبًا'),
      body: t(
        '"Hot, because it\'s hot!" The lesson moves fast. At the quiet table, nobody had to think.',
        '«الساخن، لأنه ساخن!» الدرس يمضي بسرعة. وعلى الطاولة الهادئة، لم يحتج أحد إلى التفكير.',
      ),
      effects: [
        { student: 'ahmed', engagement: 1 },
        { student: 'noura', engagement: -1 },
        { student: 'khalid', engagement: -1 },
      ],
      next: { event: 'quietDrift', after: 5 },
    },
    {
      id: 'pairsTalk',
      tone: 'good',
      title: t('The quiet table whispers', 'الطاولة الهادئة تهمس'),
      body: t(
        'Thirty seconds alone, then a partner. Khalid asks Noura. Ahmed sighs: he wanted to answer first.',
        'ثلاثون ثانية بمفردهم، ثم مع زميل. خالد يسأل نورة. وأحمد يتنهّد: كان يريد أن يجيب أولًا.',
      ),
      effects: [
        { student: 'noura', engagement: 1 },
        { student: 'khalid', understanding: 1, engagement: 1 },
        { student: 'ahmed', engagement: -1 },
      ],
      next: { event: 'overhear', after: 2 },
    },
    {
      id: 'boardsUp',
      tone: 'insight',
      title: t('Every answer, all at once', 'كل الإجابات في لحظة واحدة'),
      body: t(
        'Twenty-four boards go up. Noura\'s has the best reason in the room: "the water bits move faster". Khalid\'s says "cold", with a question mark.',
        'ترتفع أربع وعشرون سبورة. على سبورة نورة أفضل تعليل في الصف: «جزيئات الماء تتحرك أسرع». وعلى سبورة خالد: «البارد» مع علامة استفهام.',
      ),
      effects: [
        { student: 'noura', engagement: 1 },
        { student: 'khalid', engagement: 1 },
        { student: 'omar', engagement: 1 },
      ],
      setFlag: 'a2.sawNoura',
    },
    {
      id: 'nouraReads',
      tone: 'good',
      title: t('"Read me what you wrote"', '«اقرئي لي ما كتبتِ»'),
      body: t(
        'You know what she wrote, so you ask for that, not a speech. She reads one sentence, quietly. It\'s right, and the class hears it.',
        'أنتِ تعرفين ما كتبت، فتطلبين ذلك لا خطبة. تقرأ جملة واحدة بصوت هادئ. وهي صحيحة، والصف يسمعها.',
      ),
      effects: [{ student: 'noura', understanding: 1, engagement: 2 }],
      setFlag: 'a2.nouraSpoke',
    },
    {
      id: 'nouraFreezes',
      tone: 'poor',
      title: t('Noura freezes', 'نورة تتجمّد'),
      body: t(
        'Every face turns. She goes red and says "I don\'t know", though she does. Put on the spot, she shuts down.',
        'كل الوجوه تلتفت إليها. يحمرّ وجهها وتقول «لا أعرف»، مع أنها تعرف. حين وُضعت في الموقف فجأة، انغلقت.',
      ),
      effects: [{ student: 'noura', engagement: -1 }],
    },
    {
      id: 'warmCall',
      tone: 'good',
      title: t('Two minutes to get ready', 'دقيقتان للاستعداد'),
      body: t(
        'She rehearses with Khalid in a whisper, then says it to the class in one short sentence. Khalid nods along: he heard it twice.',
        'تتدرّب مع خالد همسًا، ثم تقولها للصف في جملة قصيرة واحدة. وخالد يومئ موافقًا: لقد سمعها مرتين.',
      ),
      effects: [
        { student: 'noura', understanding: 1, engagement: 2 },
        { student: 'khalid', understanding: 1 },
      ],
      setFlag: 'a2.nouraSpoke',
    },
    {
      id: 'omarReports',
      tone: 'good',
      title: t('Omar remembers the job', 'عمر يتذكّر مهمته'),
      body: t(
        'He was the reporter last lesson. He asks Noura "What did we say?" and gives her idea to the class, with her name on it.',
        'كان المتحدّث في الدرس الماضي. يسأل نورة «ماذا قلنا؟» ثم ينقل فكرتها للصف وينسبها إليها باسمها.',
      ),
      effects: [
        { student: 'omar', understanding: 1, engagement: 1 },
        { student: 'noura', engagement: 1 },
      ],
      setFlag: 'a2.omarReported',
    },
    {
      id: 'omarGuesses',
      tone: 'mixed',
      title: t('Omar reports, but not Noura\'s idea', 'عمر يتحدّث، لكن ليس بفكرة نورة'),
      body: t(
        'He gives his own guess, loudly. Noura\'s better answer stays in her notebook.',
        'يقدّم تخمينه هو بصوت عالٍ. وتبقى إجابة نورة الأفضل في دفترها.',
      ),
      effects: [{ student: 'omar', engagement: 1 }],
    },
    {
      id: 'nouraSilent',
      tone: 'mixed',
      title: t('Right on paper, unheard', 'صحيحة على الورق، ولم يسمعها أحد'),
      body: t(
        'She\'ll do well on the worksheet. But nobody, Noura included, hears that her thinking was the best in the room.',
        'ستُبلي حسنًا في ورقة العمل. لكن أحدًا، ولا نورة نفسها، لن يعرف أن تفكيرها كان الأفضل في الصف.',
      ),
      effects: [{ student: 'khalid', engagement: -1 }],
    },
    {
      id: 'meltIdea',
      tone: 'insight',
      title: t('Melting, not dissolving', 'يظنه انصهر واختفى'),
      body: t(
        'He thinks the sugar is gone for good, like ice that melted away. With that idea, there is nothing to compare between the beakers.',
        'يظن أن السكر اختفى نهائيًا، مثل الجليد حين ينصهر. وبهذه الفكرة، لا يبقى شيء يقارنه بين الكأسين.',
      ),
      effects: [{ student: 'khalid', understanding: 1, engagement: 1 }],
      setFlag: 'a2.melt',
      next: { event: 'tasteTest', after: 2 },
    },
    {
      id: 'nouraTeaches',
      tone: 'good',
      title: t('Noura explains it', 'نورة تشرحها'),
      body: t(
        'Now she has spoken once, the second time is easier. "It\'s still there, just in tiny bits." Khalid says it back in his own words.',
        'بعد أن تكلّمت مرة، صارت الثانية أسهل. «ما زال موجودًا، لكن في أجزاء صغيرة جدًا.» ويعيدها خالد بكلماته.',
      ),
      effects: [
        { student: 'khalid', understanding: 2 },
        { student: 'noura', understanding: 1, engagement: 1 },
      ],
    },
    {
      id: 'silentPair',
      tone: 'mixed',
      title: t('Two quiet partners', 'زميلان صامتان'),
      body: t(
        'They sit side by side and both write the same word: "melted". Noura knows it\'s wrong. She doesn\'t say so.',
        'يجلسان جنبًا إلى جنب، ويكتب كلاهما الكلمة نفسها: «ذاب واختفى». نورة تعرف أنها خطأ، لكنها لا تقول.',
      ),
      effects: [{ student: 'noura', engagement: -1 }],
    },
    {
      id: 'merged',
      tone: 'mixed',
      title: t('Ahmed\'s table takes over', 'طاولة أحمد تتولّى الأمر'),
      body: t(
        'They finish on time, with Ahmed\'s group running the beakers. The quiet table watches.',
        'ينهون في الوقت المحدد، ومجموعة أحمد تمسك الكؤوس. والطاولة الهادئة تتفرّج.',
      ),
      effects: [
        { student: 'ahmed', engagement: 1 },
        { student: 'noura', engagement: -1 },
        { student: 'khalid', engagement: -1 },
        { student: 'omar', engagement: -1 },
      ],
    },
    {
      id: 'restartRoles',
      tone: 'good',
      title: t('Everyone has a job', 'لكل واحد مهمة'),
      body: t(
        'Khalid pours, Omar times, Noura records. The restart is fast because nobody is waiting for someone else.',
        'خالد يصبّ، وعمر يوقّت، ونورة تكتب. البداية الجديدة سريعة لأن أحدًا لا ينتظر غيره.',
      ),
      effects: [
        { student: 'khalid', understanding: 1, engagement: 1 },
        { student: 'omar', understanding: 1, engagement: 1 },
        { student: 'noura', engagement: 1 },
      ],
      setFlag: 'a2.roles',
    },
    {
      id: 'boardsLate',
      tone: 'good',
      title: t('Now they have to commit', 'الآن عليهم أن يلتزموا بإجابة'),
      body: t(
        'Boards up. Khalid writes "cold?". Noura\'s board has the best reason in the room. Now you know who to help, and who to listen to.',
        'السبورات مرفوعة. خالد يكتب «البارد؟». وعلى سبورة نورة أفضل تعليل في الصف. الآن تعرفين من يحتاج المساعدة، ومن يستحق الإصغاء.',
      ),
      effects: [
        { student: 'omar', engagement: 1 },
        { student: 'khalid', engagement: 1 },
      ],
      setFlag: 'a2.sawNoura',
    },
    {
      id: 'proximity',
      tone: 'mixed',
      title: t('The tower comes down', 'البرج يسقط'),
      body: t(
        'They stop while you\'re there. As soon as you move on, the beakers drift back together.',
        'يتوقّفون ما دمتِ بقربهم. وما إن تبتعدي حتى تعود الكؤوس إلى مكانها في البرج.',
      ),
      effects: [],
    },
    {
      id: 'shared',
      tone: 'good',
      title: t('You say it, with her name', 'تقولينها أنتِ، باسمها'),
      body: t(
        '"Noura\'s table had this idea…" She looks down, but she is smiling. Next time, she might say it herself.',
        '«طاولة نورة توصّلت إلى هذه الفكرة…» تنظر إلى الأرض، لكنها تبتسم. في المرة القادمة، قد تقولها بنفسها.',
      ),
      effects: [{ student: 'noura', engagement: 1 }],
      setFlag: 'a2.sawNoura',
    },
    {
      id: 'tooSoon',
      tone: 'mixed',
      title: t('Too soon', 'ما زال مبكرًا'),
      body: t(
        'Whispering to one partner and speaking to twenty-four people are different things. She shakes her head, and the moment is gone.',
        'الهمس لزميل واحد شيء، والكلام أمام أربعة وعشرين شخصًا شيء آخر. تهزّ رأسها، وتضيع اللحظة.',
      ),
      effects: [{ student: 'noura', engagement: -1 }],
    },
    {
      id: 'evaporate',
      tone: 'good',
      title: t('Khalid\'s own experiment', 'تجربة خالد الخاصة'),
      body: t(
        'One drop of sugar water on a dark saucer by the window. By the end of the lesson, a thin white ring shows it never left.',
        'قطرة واحدة من ماء السكر على صحن داكن قرب النافذة. وبنهاية الدرس، تظهر حلقة بيضاء رقيقة تثبت أنه لم يختفِ قط.',
      ),
      effects: [{ student: 'khalid', understanding: 1, engagement: 2 }],
    },
    {
      id: 'ruleOnly',
      tone: 'mixed',
      title: t('Safe, and a little flat', 'آمن، لكنه باهت قليلًا'),
      body: t(
        'The rule is right. But the curiosity that made him ask goes quiet for the rest of the lesson.',
        'القاعدة صحيحة. لكن الفضول الذي دفعه إلى السؤال يخبو لبقية الدرس.',
      ),
      effects: [{ student: 'khalid', engagement: -1 }],
    },
  ],
  badges: [
    {
      id: 'a2-whole-table',
      title: t('The Whole Table In', 'الطاولة كلها في الدرس'),
      why: t(
        'Everyone at the quiet table left with the idea, and Ahmed kept thinking too.',
        'خرج كل من على الطاولة الهادئة بالفكرة، وأحمد واصل التفكير أيضًا.',
      ),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a2-room-for-quiet',
      title: t('Room for Quiet Voices', 'مساحة للأصوات الهادئة'),
      why: t(
        'Noura\'s idea reached the class, and she was the one who said it.',
        'وصلت فكرة نورة إلى الصف، وهي من قالتها.',
      ),
      icon: '◔',
      when: { flag: 'a2.nouraSpoke' },
    },
    {
      id: 'a2-listened',
      title: t('Listened Closely', 'أصغيتِ جيدًا'),
      why: t(
        'You noticed who wasn\'t talking. That is where drawing them in starts.',
        'لاحظتِ من لا يتكلّم. ومن هنا يبدأ إشراكهم.',
      ),
      icon: '◌',
      when: 'always',
    },
  ],
  communityTopic: t('Drawing quiet students in', 'إشراك الطلاب الهادئين'),
  communityExamples: [
    {
      who: t('Science teacher · Al Dhafra', 'معلمة علوم · الظفرة'),
      text: t(
        'I warn my quiet students: "The next question is yours." They answer far more when they\'ve had a minute.',
        'أنبّه طالباتي الهادئات: «السؤال القادم لكِ.» يُجبن أكثر بكثير حين يأخذن دقيقة.',
      ),
    },
    {
      who: t('Grade 5 teacher · Sharjah', 'معلم الصف الخامس · الشارقة'),
      text: t(
        'Mini whiteboards changed my class. I see twenty-four answers now, not five.',
        'السبورات الصغيرة غيّرت صفّي. صرت أرى أربعًا وعشرين إجابة، لا خمسًا.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a2.nouraSpoke',
      text: t(
        'Noura spoke today. Next door in Grade 6, the problem is the opposite: one student is doing all the talking, and all the writing, for her group.',
        'تكلّمت نورة اليوم. وفي الفصل المجاور، الصف السادس، المشكلة معكوسة: طالبة واحدة تتكلّم وتكتب عن مجموعتها كلها.',
      ),
    },
    {
      text: t(
        'The quiet table stayed mostly quiet. Next door in Grade 6, one student does everything for her group, and the others let her.',
        'بقيت الطاولة الهادئة هادئة في معظم الوقت. وفي الصف السادس المجاور، طالبة واحدة تقوم بكل شيء عن مجموعتها، والبقية يتركونها.',
      ),
    },
  ],
  unlocks: 'a3',
};
