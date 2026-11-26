/**
 * Adventure 5 — Mixed Abilities (Grade 4 Arabic reading).
 * Three reading levels in one room. Shamma reads fluently and is bored;
 * Mahra reads the class story "perfectly" because she has memorised it:
 * she cannot yet decode a new word. Rashid is a middle reader who is
 * afraid of reading aloud.
 * Branch map: docs/content/TEACHER_CONTENT.md#a5
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A5: Adventure = {
  id: 'a5',
  number: 5,
  title: t('Mixed Abilities', 'مستويات مختلفة'),
  meta: t('Grade 4 · Arabic', 'الصف الرابع · اللغة العربية'),
  location: 'grade4',
  scene: 'teacher/scenes/a5.jpg',
  takeaway: t(
    'Fluent is not the same as reading: check a word out of the sentence, give each level a text it can read, and keep the strongest readers growing too.',
    'الطلاقة لا تعني القراءة دائمًا: اختبر كلمة خارج سياق الجملة، وأعطِ كل مستوى نصًا يستطيع قراءته، ودع أقوى القرّاء يتقدّمون هم أيضًا.',
  ),
  intro: [
    t(
      'Ms. Mariam also teaches Arabic reading to Grade 4. Today\'s story: "Grandfather\'s Dhow".',
      'تدرّس الأستاذة مريم القراءة العربية للصف الرابع أيضًا. قصة اليوم: «سفينة جدّي».',
    ),
    t(
      'Some children read like news presenters. Some are still joining letters. Most are somewhere between.',
      'بعض الأطفال يقرؤون كمذيعي الأخبار، وبعضهم ما زال يركّب الحروف، ومعظمهم بين هذا وذاك.',
    ),
    t(
      'And reading aloud well is not always the same as reading.',
      'والقراءة الجهرية الجميلة لا تعني دائمًا أن الطفل يقرأ.',
    ),
  ],
  introBubbles: [
    { student: 'shamma', line: t('I read it at home already!', 'قرأتها في البيت من قبل!') },
    { student: 'rashid', line: t('Please not me first…', 'أرجوكِ، ليس أنا أولًا…') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'shamma',
      name: t('Shamma', 'شمّة'),
      x: 70,
      y: 48,
      understanding: 3,
      engagement: 1,
      idle: t('Shamma has finished the story and is reading it again, backwards.', 'أنهت شمّة القصة، وتقرؤها الآن من آخرها.'),
      homeNote: t(
        'She reads everything at home, her brother\'s books included. School texts have felt easy since Grade 2.',
        'تقرأ كل شيء في البيت، حتى كتب أخيها. ونصوص المدرسة تبدو لها سهلة منذ الصف الثاني.',
      ),
    },
    {
      id: 'mahra',
      name: t('Mahra', 'مهرة'),
      x: 34,
      y: 60,
      understanding: 0,
      engagement: 2,
      idle: t('Mahra is smiling and following along.', 'مهرة مبتسمة وتتابع مع الصف.'),
      homeNote: t(
        'Her older sister reads the class story to her every night, so Mahra knows it by heart before the lesson.',
        'أختها الكبرى تقرأ لها قصة الصف كل ليلة، فتحفظها مهرة قبل الدرس.',
      ),
      peek: {
        text: t(
          'Mahra\'s finger is on the page, but it isn\'t moving with the words. Her eyes are on the picture of the dhow.',
          'إصبع مهرة على الصفحة، لكنه لا يتحرّك مع الكلمات. وعيناها على صورة السفينة.',
        ),
        setFlag: 'a5.peekedMahra',
      },
    },
    {
      id: 'rashid',
      name: t('Rashid', 'راشد'),
      x: 52,
      y: 68,
      understanding: 1,
      engagement: 1,
      idle: t('Rashid is mouthing the words to himself, very quietly.', 'راشد يحرّك شفتيه بالكلمات بهدوء شديد.'),
      homeNote: t(
        'He reads aloud to his little brother at home, where nobody laughs.',
        'يقرأ بصوت مسموع لأخيه الصغير في البيت، حيث لا يضحك أحد.',
      ),
    },
  ],
  objects: [
    {
      id: 'board',
      label: t('Board', 'السبورة'),
      icon: '▭',
      x: 50,
      y: 14,
      idle: t(
        'The story\'s new words are on the board: dhow, sail, wave, harbour.',
        'كلمات القصة الجديدة على السبورة: سفينة، شراع، موجة، ميناء.',
      ),
    },
    {
      id: 'books',
      label: t('Reading box', 'صندوق القراءة'),
      icon: '▥',
      x: 84,
      y: 66,
      idle: t('Short storybooks in three colours, one for each reading level.', 'قصص قصيرة بثلاثة ألوان، لكل مستوى قرائي لون.'),
    },
  ],
  schedule: [
    { event: 'readAloud', at: 3 },
    { event: 'shamma', at: 8 },
    { event: 'mahra', at: 13 },
    { event: 'laugh', at: 24 },
  ],
  events: [
    {
      id: 'readAloud',
      kind: 'low-participation',
      on: 'board',
      line: t('"Who will start reading?"', '«من يبدأ القراءة؟»'),
      ask: t(
        'Twenty-two children, three reading levels, one story. How do they read it?',
        'اثنان وعشرون طفلًا، وثلاثة مستويات قراءة، وقصة واحدة. كيف سيقرؤونها؟',
      ),
      choices: [
        {
          label: t('Each child reads a line in turn', 'كل طفل يقرأ سطرًا بدوره'),
          sub: t('Turn-taking', 'القراءة بالتناوب'),
          minutes: 1,
          outcome: 'roundRobin',
        },
        {
          label: t('Same story, three levels', 'القصة نفسها بثلاثة مستويات'),
          sub: t('Levelled reading texts', 'نصوص متدرّجة'),
          minutes: 3,
          resource: 'levelled-texts',
          outcome: 'levelled',
        },
        {
          label: t('I read, you repeat', 'أقرأ، وتردّدون بعدي'),
          sub: t('Echo reading', 'القراءة الترديدية'),
          minutes: 2,
          outcome: 'echo',
        },
      ],
    },
    {
      id: 'shamma',
      kind: 'early-finisher',
      on: 'shamma',
      line: t('"Miss, I\'ve read it three times. It\'s easy."', '«أستاذة، قرأتها ثلاث مرات. سهلة.»'),
      ask: t(
        'Shamma is the strongest reader in the class, and she is starting to switch off.',
        'شمّة أقوى قارئة في الصف، وقد بدأ انتباهها ينطفئ.',
      ),
      choices: [
        {
          label: t('Write a new ending', 'اكتبي نهاية جديدة'),
          sub: t('Extension task', 'مهمة إثرائية'),
          minutes: 2,
          resource: 'extension-task',
          outcome: 'shammaWrites',
        },
        {
          label: t('Read with Rashid', 'اقرئي مع راشد'),
          sub: t('Reading partners', 'شريكا القراءة'),
          minutes: 2,
          resource: 'team-roles',
          outcome: 'buddy',
        },
        {
          label: t('Take the next book from the box', 'خذي الكتاب التالي من الصندوق'),
          sub: t('Read on', 'قراءة حرّة'),
          minutes: 1,
          outcome: 'shammaAhead',
        },
      ],
    },
    {
      id: 'mahra',
      kind: 'needs-help',
      on: 'mahra',
      line: t('"Miss, can I read to you? I know it all!"', '«أستاذة، هل أقرأ لكِ؟ أعرفها كلها!»'),
      ask: t(
        'Mahra reads the first page beautifully, hardly looking at it.',
        'تقرأ مهرة الصفحة الأولى بصوت جميل، وبالكاد تنظر إليها.',
      ),
      choices: [
        {
          label: t('Listen and praise her', 'استمعي إليها وامدحيها'),
          sub: t('Praise', 'تشجيع'),
          minutes: 1,
          outcome: [
            { ifFlag: 'a5.peekedMahra', outcome: 'mahraGentle' },
            { ifFlag: 'a5.suspect', outcome: 'mahraGentle' },
            { outcome: 'mahraPraised' },
          ],
        },
        {
          label: t('Point to one word: "What\'s this one?"', 'أشيري إلى كلمة: «ما هذه الكلمة؟»'),
          sub: t('Word check', 'اختبار كلمة'),
          minutes: 2,
          outcome: 'mahraStuck',
        },
      ],
    },
    {
      id: 'laugh',
      kind: 'unexpected',
      on: 'rashid',
      line: t('Rashid misreads a word. His table laughs.', 'يخطئ راشد في قراءة كلمة، فتضحك طاولته.'),
      ask: t(
        'He goes red and closes his book. Everyone is watching to see what you do.',
        'يحمرّ وجهه ويغلق كتابه. والجميع ينتظر ليرى ماذا ستفعلين.',
      ),
      choices: [
        {
          label: t('"In this room, we try."', '«في هذا الصف، نحن نحاول.»'),
          sub: t('Class norm', 'قاعدة الصف'),
          minutes: 2,
          outcome: 'norm',
        },
        {
          label: t('Hard-word hunt: everyone finds one', 'صيد الكلمات الصعبة: كل واحد يجد كلمة'),
          sub: t('Launch game', 'لعبة'),
          minutes: 3,
          resource: 'launch-game',
          outcome: 'hardWordGame',
        },
        {
          label: t('Quietly move on', 'تابعي بهدوء'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'shrug',
        },
      ],
    },
    /* ---- follow-ups ---- */
    {
      id: 'rashidCounts',
      kind: 'low-participation',
      on: 'rashid',
      line: t('Rashid is counting ahead to find his line.', 'راشد يعدّ الأسطر ليعرف سطره.'),
      ask: t(
        'He is practising his one line under his breath. He hasn\'t heard a word of the story.',
        'يتدرّب على سطره وحده همسًا، ولم يسمع كلمة واحدة من القصة.',
      ),
      choices: [
        {
          label: t('Switch to partners reading together', 'انتقلي إلى القراءة في أزواج'),
          sub: t('Reading partners', 'شريكا القراءة'),
          minutes: 2,
          resource: 'team-roles',
          outcome: 'partnersRead',
        },
        {
          label: t('Let the turns run', 'دعي الأدوار تستمر'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'countAhead',
        },
      ],
    },
    {
      id: 'mahraPick',
      kind: 'new-event',
      on: 'mahra',
      line: t('"I can read the hard one, Miss."', '«أستطيع أن أقرأ الصعبة يا أستاذة.»'),
      ask: t(
        'Mahra has picked the hardest text, the same one as Shamma.',
        'اختارت مهرة أصعب نص، النص نفسه الذي مع شمّة.',
      ),
      choices: [
        {
          label: t('Let her try it', 'دعيها تجرّب'),
          sub: t('Her choice', 'اختيارها'),
          minutes: 2,
          outcome: 'mahraHardText',
        },
        {
          label: t('Steer her to the middle text', 'وجّهيها إلى النص المتوسط'),
          sub: t('Teacher choice', 'اختيار المعلمة'),
          minutes: 1,
          outcome: 'mahraMiddle',
        },
      ],
    },
    {
      id: 'mahraPlan',
      kind: 'new-event',
      on: 'mahra',
      line: t('Mahra can\'t read a word she hasn\'t heard first.', 'مهرة لا تستطيع قراءة كلمة لم تسمعها من قبل.'),
      ask: t(
        'She has been hiding it with a good memory and a big smile. What now?',
        'كانت تخفي ذلك بذاكرة قوية وابتسامة عريضة. ماذا الآن؟',
      ),
      choices: [
        {
          label: t('Decoding table: five minutes with you', 'طاولة تركيب الحروف: خمس دقائق معكِ'),
          sub: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
          minutes: 5,
          resource: 'small-group-reteach',
          outcome: 'decodeTable',
        },
        {
          label: t('Letter-sound cards to practise', 'بطاقات الحروف والأصوات للتدريب'),
          sub: t('Targeted practice set', 'تدريبات موجّهة'),
          minutes: 2,
          resource: 'targeted-practice',
          outcome: 'soundCards',
        },
        {
          label: t('Pair her with Shamma', 'اجعليها مع شمّة'),
          sub: t('Strong partner', 'شريكة قوية'),
          minutes: 1,
          outcome: 'shammaCovers',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'roundRobin',
      tone: 'mixed',
      title: t('Everyone reads one line', 'الجميع يقرأ سطرًا واحدًا'),
      body: t(
        'Fair, and slow. Mahra\'s line is the most fluent in the room. Shamma counts the floor tiles while she waits.',
        'عادلة وبطيئة. سطر مهرة هو الأكثر طلاقة في الصف. وشمّة تعدّ بلاط الأرضية وهي تنتظر.',
      ),
      effects: [{ student: 'shamma', engagement: -1 }],
      next: { event: 'rashidCounts', after: 2 },
    },
    {
      id: 'levelled',
      tone: 'good',
      title: t('Three tables, one story', 'ثلاث طاولات، وقصة واحدة'),
      body: t(
        'Same dhow, same grandfather, three levels of text. Rashid reads a whole page without stopping. Then you see Mahra walk to the box.',
        'السفينة نفسها، والجدّ نفسه، وثلاثة مستويات من النص. يقرأ راشد صفحة كاملة دون توقّف. ثم ترين مهرة تتجه نحو الصندوق.',
      ),
      effects: [
        { student: 'rashid', understanding: 1, engagement: 1 },
        { student: 'shamma', engagement: 1 },
      ],
      next: { event: 'mahraPick', after: 2 },
    },
    {
      id: 'echo',
      tone: 'mixed',
      title: t('Safe, and blurry', 'آمنة، لكنها ضبابية'),
      body: t(
        'The whole class reads after you, in one voice. Nobody is exposed, and you can\'t hear who is actually reading.',
        'الصف كله يقرأ بعدكِ بصوت واحد. لا أحد يُحرَج، لكنكِ لا تستطيعين أن تسمعي من يقرأ فعلًا.',
      ),
      effects: [{ student: 'rashid', understanding: 1 }],
    },
    {
      id: 'shammaWrites',
      tone: 'good',
      title: t('The dhow sails somewhere new', 'السفينة تبحر إلى مكان جديد'),
      body: t(
        'Shamma writes an ending where the grandfather teaches her to steer. She uses all four new words.',
        'تكتب شمّة نهاية يعلّمها فيها الجدّ قيادة السفينة. وتستخدم الكلمات الجديدة الأربع كلها.',
      ),
      effects: [{ student: 'shamma', understanding: 1, engagement: 2 }],
      setFlag: 'a5.shammaGrew',
    },
    {
      id: 'buddy',
      tone: 'good',
      title: t('A patient partner', 'شريكة صبورة'),
      body: t(
        'Shamma waits while Rashid sounds out the long words. He reads two pages. She is kind, and only half interested.',
        'تنتظر شمّة بينما يركّب راشد الكلمات الطويلة. يقرأ صفحتين. هي لطيفة، لكن اهتمامها نصف اهتمام.',
      ),
      effects: [{ student: 'rashid', understanding: 1, engagement: 1 }],
    },
    {
      id: 'shammaAhead',
      tone: 'mixed',
      title: t('Busy, not growing', 'مشغولة، لا متقدّمة'),
      body: t(
        'She reads three more easy books. Content and quiet, and no harder than last month.',
        'تقرأ ثلاثة كتب سهلة أخرى. راضية وهادئة، لكنها لم تتحدَّ نفسها أكثر من الشهر الماضي.',
      ),
      effects: [{ student: 'shamma', engagement: 1 }],
    },
    {
      id: 'mahraPraised',
      tone: 'mixed',
      title: t('Lovely, and you learned nothing new', 'جميل، لكنكِ لم تعرفي شيئًا جديدًا'),
      body: t(
        '"Excellent, Mahra!" She beams with relief. Whatever she is hiding stays hidden today.',
        '«ممتازة يا مهرة!» يشرق وجهها بارتياح. وما تخفيه يبقى مخفيًا اليوم.',
      ),
      effects: [{ student: 'mahra', engagement: 1 }],
    },
    {
      id: 'mahraGentle',
      tone: 'insight',
      title: t('Praise first, then one new sentence', 'المديح أولًا، ثم جملة جديدة'),
      body: t(
        'You praise her, then open a page she hasn\'t heard. "Let\'s read this one together." She can\'t start it. She isn\'t embarrassed: it\'s just the two of you.',
        'تمدحينها، ثم تفتحين صفحة لم تسمعها من قبل. «لنقرأ هذه معًا.» لا تستطيع أن تبدأ. لكنها لا تشعر بالحرج: إنكما وحدكما.',
      ),
      effects: [{ student: 'mahra', engagement: 1 }],
      setFlag: 'a5.decode',
      next: { event: 'mahraPlan', after: 1 },
    },
    {
      id: 'mahraStuck',
      tone: 'insight',
      title: t('She has memorised it', 'لقد حفظتها'),
      body: t(
        'Out of the sentence, the word for "sail" is just letters to her. Her sister read her the story at home; she knows it by heart. She can\'t yet decode.',
        'خارج الجملة، كلمة «شراع» مجرد حروف بالنسبة إليها. قرأت لها أختها القصة في البيت فحفظتها. لكنها لا تستطيع تركيب الحروف بعد.',
      ),
      effects: [{ student: 'mahra', engagement: -1 }],
      setFlag: 'a5.decode',
      next: { event: 'mahraPlan', after: 1 },
    },
    {
      id: 'norm',
      tone: 'good',
      title: t('The laughing stops', 'يتوقّف الضحك'),
      body: t(
        '"Every good reader got words wrong first." Rashid opens his book again. Two other children try harder words after that.',
        '«كل قارئ ماهر أخطأ في الكلمات أولًا.» يفتح راشد كتابه من جديد. وبعدها يجرّب طفلان آخران كلمات أصعب.',
      ),
      effects: [
        { student: 'rashid', engagement: 2 },
        { student: 'mahra', engagement: 1 },
      ],
    },
    {
      id: 'hardWordGame',
      tone: 'good',
      title: t('Hard words become the game', 'الكلمات الصعبة تصبح لعبة'),
      body: t(
        'Everyone hunts for the hardest word on their page and sounds it out for the table. Getting stuck is now the point, not the shame.',
        'يبحث كل طفل عن أصعب كلمة في صفحته ويركّبها أمام طاولته. التعثّر صار هو الهدف، لا العيب.',
      ),
      effects: [
        { student: 'rashid', understanding: 1, engagement: 2 },
        { student: 'mahra', understanding: 1, engagement: 1 },
        { student: 'shamma', engagement: 1 },
      ],
      setFlag: 'a5.safeToTry',
    },
    {
      id: 'shrug',
      tone: 'mixed',
      title: t('The moment passes', 'تمرّ اللحظة'),
      body: t(
        'The lesson goes on. Rashid doesn\'t read aloud again today, and Mahra, watching, decides she never will.',
        'يستمر الدرس. لا يقرأ راشد بصوت مسموع بقية اليوم، ومهرة، وهي تراقب، تقرّر ألا تفعل أبدًا.',
      ),
      effects: [
        { student: 'rashid', engagement: -2 },
        { student: 'mahra', engagement: -1 },
      ],
    },
    {
      id: 'partnersRead',
      tone: 'good',
      title: t('Everyone reads the whole story', 'الجميع يقرأ القصة كاملة'),
      body: t(
        'In pairs, each child reads every page with someone. Rashid reads more in five minutes than in a week of turns.',
        'في أزواج، يقرأ كل طفل كل الصفحات مع زميله. قرأ راشد في خمس دقائق أكثر مما قرأه في أسبوع من التناوب.',
      ),
      effects: [{ student: 'rashid', understanding: 1, engagement: 1 }],
    },
    {
      id: 'countAhead',
      tone: 'mixed',
      title: t('Everyone knows their line', 'كل طفل يعرف سطره'),
      body: t(
        'Each child reads one line perfectly. Ask them what happened to the grandfather\'s dhow, and few can tell you.',
        'كل طفل يقرأ سطره بإتقان. لكن اسأليهم ماذا حدث لسفينة الجدّ، وقلّة فقط سيعرفون.',
      ),
      effects: [{ student: 'rashid', engagement: -1 }],
    },
    {
      id: 'mahraHardText',
      tone: 'insight',
      title: t('She can\'t start it', 'لا تستطيع أن تبدأ'),
      body: t(
        'She stares at the first line, then quietly turns back to the class story, which she reads perfectly. Something doesn\'t add up.',
        'تحدّق في السطر الأول، ثم تعود بهدوء إلى قصة الصف، وتقرؤها بإتقان. هناك شيء غير منطقي.',
      ),
      effects: [],
      setFlag: 'a5.suspect',
    },
    {
      id: 'mahraMiddle',
      tone: 'mixed',
      title: t('She reads the pictures', 'تقرأ الصور'),
      body: t(
        'The middle text has big pictures. She tells the story from them, fluently. It sounds like reading.',
        'النص المتوسط فيه صور كبيرة. تروي القصة منها بطلاقة. ويبدو ذلك كأنه قراءة.',
      ),
      effects: [{ student: 'mahra', engagement: 1 }],
    },
    {
      id: 'decodeTable',
      tone: 'good',
      title: t('Letters, then a word', 'حروف، ثم كلمة'),
      body: t(
        'With you and two others, she joins three letters into "sea", then "wave". The first words she has read, not remembered.',
        'معكِ ومع طفلين آخرين، تركّب ثلاثة حروف فتصير «بحر»، ثم «موجة». أول كلمات تقرؤها، لا تتذكّرها.',
      ),
      effects: [{ student: 'mahra', understanding: 2, engagement: 2 }],
      setFlag: 'a5.mahraReads',
    },
    {
      id: 'soundCards',
      tone: 'mixed',
      title: t('A start, on her own', 'بداية، وحدها'),
      body: t(
        'The cards are the right practice. Alone at her desk, she sorts them by colour instead of sound. She needs you for this part.',
        'البطاقات هي التدريب المناسب. لكنها وحدها على مقعدها، ترتّبها حسب اللون لا حسب الصوت. هذه المرحلة تحتاجكِ فيها.',
      ),
      effects: [{ student: 'mahra', understanding: 1 }],
    },
    {
      id: 'shammaCovers',
      tone: 'poor',
      title: t('Shamma reads, Mahra nods', 'شمّة تقرأ، ومهرة تومئ'),
      body: t(
        'Shamma is quick and kind and reads everything aloud. Mahra smiles and nods along. The hiding just got easier.',
        'شمّة سريعة ولطيفة وتقرأ كل شيء بصوت مسموع. ومهرة تبتسم وتومئ. صار الإخفاء أسهل.',
      ),
      effects: [
        { student: 'mahra', engagement: 1 },
        { student: 'shamma', engagement: -1 },
      ],
    },
  ],
  badges: [
    {
      id: 'a5-every-reader',
      title: t('Every Reader Reading', 'كل قارئ يقرأ'),
      why: t(
        'Shamma grew, Rashid read aloud, and Mahra read words she had never heard.',
        'تقدّمت شمّة، وقرأ راشد بصوت مسموع، وقرأت مهرة كلمات لم تسمعها من قبل.',
      ),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a5-past-the-smile',
      title: t('Past the Smile', 'ما وراء الابتسامة'),
      why: t(
        'You found the reader who was hiding behind a good memory, and you found her kindly.',
        'وجدتِ القارئة التي كانت تختبئ وراء ذاكرة قوية، ووجدتِها بلطف.',
      ),
      icon: '◉',
      when: { flag: 'a5.decode' },
    },
    {
      id: 'a5-three-levels',
      title: t('Three Levels, One Room', 'ثلاثة مستويات، وصف واحد'),
      why: t(
        'You taught a room of very different readers in one lesson. That is the job.',
        'علّمتِ صفًا من قرّاء مختلفين جدًا في درس واحد. وهذه هي المهمة.',
      ),
      icon: '≣',
      when: 'always',
    },
  ],
  communityTopic: t('Many reading levels, one class', 'مستويات قراءة كثيرة في صف واحد'),
  communityExamples: [
    {
      who: t('Arabic teacher · Al Ain', 'معلمة لغة عربية · العين'),
      text: t(
        'I check one word out of the sentence with every fluent reader once a term. Twice this year it found a child who had memorised the book.',
        'أختبر كلمة واحدة خارج الجملة مع كل قارئ طليق مرة في الفصل. مرتين هذا العام اكتشفت طفلًا حفظ الكتاب.',
      ),
    },
    {
      who: t('Grade 4 teacher · Ajman', 'معلمة الصف الرابع · عجمان'),
      text: t(
        'My strongest readers write the questions for the other groups. They take it very seriously.',
        'أقوى القارئات عندي يكتبن الأسئلة للمجموعات الأخرى. ويأخذن الأمر بجدية كبيرة.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a5.decode',
      text: t(
        'You saw what a smile was hiding. Next week, someone will be watching your lessons: the vice principal has booked a visit to your Grade 5 science class.',
        'رأيتِ ما كانت تخفيه الابتسامة. وفي الأسبوع القادم، هناك من سيراقب دروسكِ: حدّدت الوكيلة موعدًا لزيارة حصة العلوم في الصف الخامس.',
      ),
    },
    {
      text: t(
        'Next week, the vice principal is visiting your Grade 5 science class, with a guest. There is a lesson that always goes well. And there is the lesson that comes next.',
        'في الأسبوع القادم، ستزور الوكيلة حصة العلوم في الصف الخامس، ومعها ضيف. هناك درس ينجح دائمًا. وهناك الدرس الذي يأتي بعده.',
      ),
    },
  ],
  unlocks: 'a6',
};
