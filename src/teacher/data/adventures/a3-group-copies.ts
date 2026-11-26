/**
 * Adventure 3 — The Group That Copies (Grade 6 English, a group persuasive paragraph).
 * Ms. Mariam covers Ms. Fatima's Grade 6 English class. Reem does all the
 * group's work; the others copy. Making the work visible (own-part, criteria,
 * roles) decides whether the group survives Reem being called away.
 * Branch map: docs/content/TEACHER_CONTENT.md#a3
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A3: Adventure = {
  id: 'a3',
  number: 3,
  title: t('The Group That Copies', 'المجموعة التي تنقل'),
  meta: t('Grade 6 · English', 'الصف السادس · اللغة الإنجليزية'),
  location: 'grade6',
  scene: 'teacher/scenes/a3.jpg',
  takeaway: t(
    'A finished group page can hide who learned: make each student\'s part visible, and share the jobs, not just the pen.',
    'ورقة المجموعة المكتملة قد تخفي من تعلّم فعلًا: اجعل إسهام كل طالب ظاهرًا، ووزّع المهام لا القلم فقط.',
  ),
  intro: [
    t(
      'Ms. Mariam is covering Ms. Fatima\'s Grade 6 English class this week. Today: a group paragraph, "Should our school have a longer break?"',
      'تغطّي الأستاذة مريم حصص اللغة الإنجليزية للصف السادس هذا الأسبوع بدلًا من الأستاذة فاطمة. مهمة اليوم: فقرة جماعية بعنوان «هل يجب أن تكون الفسحة أطول في مدرستنا؟»',
    ),
    t(
      'Ms. Fatima left a note: "Reem\'s group always finishes first. Always."',
      'تركت الأستاذة فاطمة ملاحظة: «مجموعة ريم تنهي أولًا دائمًا. دائمًا.»',
    ),
    t(
      'A finished page tells you the group is done. It does not tell you who learned.',
      'الورقة المكتملة تخبرك أن المجموعة أنهت. لكنها لا تخبرك من تعلّم.',
    ),
  ],
  introBubbles: [
    { student: 'reem', line: t('Give me the pen, I\'ll do it.', 'أعطوني القلم، سأكتبها أنا.') },
    { student: 'saeed', line: t('Yalla, Reem is the best!', 'يلّا، ريم هي الأفضل!') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'reem',
      name: t('Reem', 'ريم'),
      x: 56,
      y: 60,
      understanding: 3,
      engagement: 2,
      idle: t('Reem is writing fast, the group sheet pulled towards her.', 'ريم تكتب بسرعة، وقد سحبت ورقة المجموعة نحوها.'),
    },
    {
      id: 'saeed',
      name: t('Saeed', 'سعيد'),
      x: 74,
      y: 54,
      understanding: 1,
      engagement: 1,
      idle: t('Saeed is telling a joke. The table laughs.', 'سعيد يروي نكتة، والطاولة تضحك.'),
    },
    {
      id: 'yousef',
      name: t('Yousef', 'يوسف'),
      x: 30,
      y: 56,
      understanding: 1,
      engagement: 0,
      idle: t('Yousef is copying neatly from Reem\'s side of the page.', 'يوسف ينقل بخط مرتّب من جهة ريم في الورقة.'),
      peek: {
        text: t(
          'Yousef\'s notebook: two lines in Arabic, "the break is short so we eat fast and we are tired". A real reason, not yet in English.',
          'في دفتر يوسف سطران بالعربية: «الفسحة قصيرة فنأكل بسرعة ونتعب». سبب حقيقي، لكنه لم يصبح إنجليزيًا بعد.',
        ),
        setFlag: 'a3.peekedYousef',
      },
    },
    {
      id: 'maitha',
      name: t('Maitha', 'ميثاء'),
      x: 42,
      y: 70,
      understanding: 2,
      engagement: 1,
      idle: t('Maitha starts to say something, then stops.', 'ميثاء تبدأ بقول شيء، ثم تتوقّف.'),
    },
  ],
  objects: [
    {
      id: 'sheet',
      label: t('Group sheet', 'ورقة المجموعة'),
      icon: '▤',
      x: 50,
      y: 80,
      idle: t('One sheet, one handwriting.', 'ورقة واحدة، وخط واحد.'),
    },
    {
      id: 'door',
      label: t('Door', 'الباب'),
      icon: '▯',
      x: 88,
      y: 30,
      idle: t('The corridor is quiet.', 'الممر هادئ.'),
    },
  ],
  schedule: [
    { event: 'reemDone', at: 4 },
    { event: 'saeedReads', at: 8 },
    { event: 'maithaIdea', at: 12 },
    { event: 'reemCalled', at: 24 },
  ],
  events: [
    {
      id: 'reemDone',
      kind: 'early-finisher',
      on: 'reem',
      line: t('"Miss, we\'re done!"', '«أستاذة، خلّصنا!»'),
      ask: t(
        'Four minutes in, the group paragraph is finished, all in Reem\'s handwriting.',
        'بعد أربع دقائق فقط، الفقرة الجماعية جاهزة، وكلها بخط ريم.',
      ),
      choices: [
        {
          label: t('Great: start the next task', 'ممتاز: ابدؤوا المهمة التالية'),
          sub: t('Extension task', 'مهمة إثرائية'),
          minutes: 1,
          resource: 'extension-task',
          outcome: 'reemRaces',
        },
        {
          label: t('Each person writes one sentence', 'كل واحد يكتب جملة واحدة'),
          sub: t('Own-part check', 'الإسهام الفردي'),
          minutes: 3,
          resource: 'own-part',
          outcome: 'ownSentence',
        },
        {
          label: t('Ask: "Who wrote which part?"', 'اسألي: «من كتب أي جزء؟»'),
          sub: t('Ask the group', 'سؤال المجموعة'),
          minutes: 2,
          outcome: 'honestAnswer',
        },
      ],
    },
    {
      id: 'saeedReads',
      kind: 'low-participation',
      on: 'saeed',
      line: t('"Miss, can I read it out? I\'m good at reading."', '«أستاذة، هل أقرؤها أنا؟ أنا أقرأ جيدًا.»'),
      ask: t(
        'Saeed wants to present the paragraph he didn\'t write. He is a confident speaker.',
        'سعيد يريد أن يقدّم الفقرة التي لم يكتبها. وهو متحدّث واثق.',
      ),
      choices: [
        {
          label: t('Yes, let him present', 'نعم، دعيه يقدّمها'),
          sub: t('Presenter', 'المقدّم'),
          minutes: 2,
          outcome: 'saeedPresents',
        },
        {
          label: t('Yes, if he adds a reason of his own', 'نعم، إن أضاف سببًا من عنده'),
          sub: t('Team roles', 'أدوار الفريق'),
          minutes: 3,
          resource: 'team-roles',
          outcome: 'saeedAdds',
        },
        {
          label: t('Reem wrote it, Reem reads it', 'ريم كتبتها، فلتقرأها ريم'),
          sub: t('Credit the writer', 'الفضل لصاحبه'),
          minutes: 1,
          outcome: 'reemReads',
        },
      ],
    },
    {
      id: 'maithaIdea',
      kind: 'needs-help',
      on: 'maitha',
      line: t('"Miss, Reem crossed out my sentence."', '«أستاذة، ريم شطبت جملتي.»'),
      ask: t(
        'Maitha wrote an ending. Reem said it was "not good English" and crossed it out.',
        'كتبت ميثاء خاتمة للفقرة، فقالت ريم إن «إنجليزيتها ليست جيدة» وشطبتها.',
      ),
      choices: [
        {
          label: t('Put Maitha\'s sentence back', 'أعيدي جملة ميثاء'),
          sub: t('Teacher decides', 'المعلمة تقرّر'),
          minutes: 1,
          outcome: 'teacherOverrides',
        },
        {
          label: t('"Check both against the list"', '«قارنّا الجملتين بالقائمة»'),
          sub: t('Success criteria', 'معايير النجاح'),
          minutes: 3,
          resource: 'success-criteria',
          outcome: 'criteriaJudge',
        },
        {
          label: t('"Sort it out together"', '«تفاهما معًا»'),
          sub: t('Group decides', 'المجموعة تقرّر'),
          minutes: 0,
          outcome: 'sortItOut',
        },
      ],
    },
    {
      id: 'reemCalled',
      kind: 'unexpected',
      on: 'door',
      line: t('"Reem to the office, please. Sports team photo."', '«ريم إلى الإدارة من فضلكم، صورة فريق الرياضة.»'),
      ask: t(
        'She will be gone ten minutes. Her group has never worked without her.',
        'ستغيب عشر دقائق، ومجموعتها لم تعمل يومًا من دونها.',
      ),
      choices: [
        {
          label: t('Let her go; the group carries on', 'دعيها تذهب، والمجموعة تكمل'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: [
            { ifFlag: 'a3.rolesShared', outcome: 'groupCopes' },
            { ifFlag: 'a3.criteria', outcome: 'groupCopes' },
            { ifFlag: 'a3.saeedOwn', outcome: 'groupCopes' },
            { outcome: 'groupStalls' },
          ],
        },
        {
          label: t('Sit with the group yourself', 'اجلسي مع المجموعة بنفسك'),
          sub: t('Teacher joins', 'المعلمة تنضمّ'),
          minutes: 5,
          outcome: 'teacherSits',
        },
      ],
    },
    /* ---- follow-ups ---- */
    {
      id: 'yousefStuck',
      kind: 'needs-help',
      on: 'yousef',
      line: t('"Miss… I don\'t know the words."', '«أستاذة… لا أعرف الكلمات.»'),
      ask: t(
        'His turn to write a sentence. He has an idea. He doesn\'t have the English for it yet.',
        'جاء دوره ليكتب جملة. لديه فكرة، لكنه لا يملك الإنجليزية التي يعبّر بها عنها بعد.',
      ),
      choices: [
        {
          label: t('"Longer break is good because…"', '«الفسحة الأطول جيدة لأن…»'),
          sub: t('Sentence starters', 'بدايات الجمل'),
          minutes: 2,
          resource: 'sentence-starters',
          outcome: [{ ifFlag: 'a3.peekedYousef', outcome: 'bridge' }, { outcome: 'yousefStarter' }],
        },
        {
          label: t('Say it in Arabic, then build it in English', 'قلها بالعربية، ثم نبنيها بالإنجليزية'),
          sub: t('Home-language bridge', 'جسر من اللغة الأم'),
          minutes: 4,
          outcome: 'bridge',
        },
        {
          label: t('Let him copy Reem\'s for now', 'دعيه ينقل من ريم الآن'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'copyOk',
        },
      ],
    },
    {
      id: 'copies',
      kind: 'new-event',
      on: 'sheet',
      line: t('Three identical paragraphs on three pages.', 'ثلاث فقرات متطابقة على ثلاث أوراق.'),
      ask: t(
        'While Reem worked ahead, Saeed, Maitha and Yousef copied her paragraph so each of them has "their own".',
        'بينما انشغلت ريم بالمهمة التالية، نقل سعيد وميثاء ويوسف فقرتها، ليكون لكل منهم فقرته «الخاصة».',
      ),
      choices: [
        {
          label: t('"Underline the part you wrote"', '«ضع خطًا تحت الجزء الذي كتبته أنت»'),
          sub: t('Own-part check', 'الإسهام الفردي'),
          minutes: 2,
          resource: 'own-part',
          outcome: 'underline',
        },
        {
          label: t('Accept it: they practised writing', 'اقبلي ذلك: لقد تدرّبوا على الكتابة'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'copyOk',
        },
      ],
    },
    {
      id: 'reemTired',
      kind: 'new-event',
      on: 'reem',
      line: t('"It\'s not fair, Miss. I always do everything."', '«هذا ليس عدلًا يا أستاذة. أنا دائمًا أعمل كل شيء.»'),
      ask: t(
        'She is proud of her work, and tired of carrying the group.',
        'هي فخورة بعملها، ومتعبة من حمل المجموعة وحدها.',
      ),
      choices: [
        {
          label: t('Jobs for all: writer, checker, ideas, reader', 'مهمة لكل واحد: كاتب، مدقّق، صاحب أفكار، قارئ'),
          sub: t('Team roles', 'أدوار الفريق'),
          minutes: 3,
          resource: 'team-roles',
          outcome: 'rolesShared',
        },
        {
          label: t('Let her work alone today', 'دعيها تعمل وحدها اليوم'),
          sub: t('Separate her', 'فصلها عن المجموعة'),
          minutes: 1,
          outcome: 'reemSolo',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'reemRaces',
      tone: 'mixed',
      title: t('Reem races ahead, alone', 'ريم تنطلق وحدها'),
      body: t(
        'She loves the harder task. Her group goes back to chatting: they\'ve learned that when Reem finishes, they\'re done.',
        'أحبّت المهمة الأصعب. ومجموعتها عادت إلى الدردشة: فقد تعلّموا أن ريم إذا أنهت، أنهوا هم أيضًا.',
      ),
      effects: [
        { student: 'reem', understanding: 1, engagement: 1 },
        { student: 'saeed', engagement: -1 },
        { student: 'yousef', engagement: -1 },
      ],
      next: { event: 'copies', after: 5 },
    },
    {
      id: 'ownSentence',
      tone: 'insight',
      title: t('Now you can see who can do it', 'الآن ترين من يستطيع'),
      body: t(
        'Reem writes hers in seconds. Maitha\'s is good. Saeed asks Reem what to write. Yousef stares at the page.',
        'ريم تكتب جملتها في ثوانٍ. وجملة ميثاء جيدة. وسعيد يسأل ريم ماذا يكتب. ويوسف يحدّق في الورقة.',
      ),
      effects: [{ student: 'maitha', understanding: 1, engagement: 1 }],
      setFlag: 'a3.sawGaps',
      next: { event: 'yousefStuck', after: 2 },
    },
    {
      id: 'honestAnswer',
      tone: 'mixed',
      title: t('"Reem did, Miss. She\'s the best."', '«ريم كتبتها يا أستاذة، هي الأفضل.»'),
      body: t(
        'Saeed says it like a compliment. Reem looks proud and annoyed at the same time.',
        'يقولها سعيد كأنها مديح. وتبدو ريم فخورة ومنزعجة في آن واحد.',
      ),
      effects: [{ student: 'reem', engagement: -1 }],
      next: { event: 'reemTired', after: 3 },
    },
    {
      id: 'saeedPresents',
      tone: 'mixed',
      title: t('He sounds great', 'إلقاؤه رائع'),
      body: t(
        'He reads with expression and the class claps. Ask him what "persuade" means and he looks at Reem.',
        'يقرأ بحماس والصف يصفّق. لكن اسأليه ما معنى «persuade» فينظر إلى ريم.',
      ),
      effects: [{ student: 'saeed', engagement: 1 }],
    },
    {
      id: 'saeedAdds',
      tone: 'good',
      title: t('A reason in his own words', 'سبب بكلماته هو'),
      body: t(
        '"Longer break is better because we play football and then we are calm in class." Simple English, his own idea, and it persuades.',
        '«الفسحة الأطول أفضل لأننا نلعب كرة القدم ثم نكون هادئين في الصف.» إنجليزية بسيطة، وفكرته هو، وهي مقنعة.',
      ),
      effects: [{ student: 'saeed', understanding: 2, engagement: 1 }],
      setFlag: 'a3.saeedOwn',
    },
    {
      id: 'reemReads',
      tone: 'mixed',
      title: t('Fair, and flat', 'عادل، لكنه باهت'),
      body: t(
        'Reem reads well. Saeed slumps: the one part he wanted was taken away.',
        'ريم تقرأ جيدًا. أما سعيد فيتراخى في مقعده: أُخذ منه الدور الوحيد الذي أراده.',
      ),
      effects: [
        { student: 'reem', engagement: 1 },
        { student: 'saeed', engagement: -2 },
      ],
    },
    {
      id: 'teacherOverrides',
      tone: 'mixed',
      title: t('Maitha\'s sentence goes back in', 'جملة ميثاء تعود'),
      body: t(
        'Maitha is pleased. Reem goes quiet and stops helping anyone for the rest of the lesson.',
        'ميثاء سعيدة. أما ريم فتصمت وتتوقف عن مساعدة أي أحد لبقية الدرس.',
      ),
      effects: [
        { student: 'maitha', engagement: 1 },
        { student: 'reem', engagement: -1 },
      ],
    },
    {
      id: 'criteriaJudge',
      tone: 'good',
      title: t('The checklist settles it', 'القائمة تحسم الأمر'),
      body: t(
        '"A good ending gives a reason." Maitha\'s does; Reem\'s doesn\'t. The list decides, not the person holding the pen.',
        '«الخاتمة الجيدة تذكر سببًا.» خاتمة ميثاء فيها سبب، وخاتمة ريم لا. القائمة هي التي تقرّر، لا من يمسك القلم.',
      ),
      effects: [
        { student: 'maitha', understanding: 1, engagement: 1 },
        { student: 'reem', understanding: 1 },
      ],
      setFlag: 'a3.criteria',
    },
    {
      id: 'sortItOut',
      tone: 'poor',
      title: t('Reem wins the argument', 'ريم تكسب الجدال'),
      body: t(
        'She has the pen and the best English. Maitha stops offering ideas.',
        'معها القلم وأفضل إنجليزية في المجموعة. وتتوقف ميثاء عن تقديم أفكارها.',
      ),
      effects: [{ student: 'maitha', engagement: -2 }],
    },
    {
      id: 'groupCopes',
      tone: 'good',
      title: t('They manage without her', 'يتدبّرون أمرهم من دونها'),
      body: t(
        'Ten minutes without Reem, and the page keeps growing. Each of them knows their part. Reem comes back to a better paragraph than she left.',
        'عشر دقائق من دون ريم، والورقة تواصل الامتلاء. كل منهم يعرف دوره. وتعود ريم لتجد فقرة أفضل مما تركتها.',
      ),
      effects: [
        { student: 'saeed', understanding: 1, engagement: 1 },
        { student: 'yousef', understanding: 1, engagement: 1 },
        { student: 'maitha', understanding: 1, engagement: 1 },
      ],
      setFlag: 'a3.coped',
    },
    {
      id: 'groupStalls',
      tone: 'poor',
      title: t('The group stops', 'المجموعة تتوقف'),
      body: t(
        'Without Reem, the pen sits in the middle of the table for ten minutes. Nobody wants to be the one who writes it wrong.',
        'من دون ريم، يبقى القلم في منتصف الطاولة عشر دقائق. لا أحد يريد أن يكون من يكتب خطأً.',
      ),
      effects: [
        { student: 'saeed', engagement: -1 },
        { student: 'yousef', engagement: -1 },
        { student: 'maitha', engagement: -1 },
      ],
    },
    {
      id: 'teacherSits',
      tone: 'mixed',
      title: t('They work, for you', 'يعملون، من أجلك'),
      body: t(
        'With you at the table, they write. Behind you, the rest of the class gets louder.',
        'ما دمتِ على الطاولة، يكتبون. وخلفكِ، يعلو صوت بقية الصف.',
      ),
      effects: [
        { student: 'saeed', understanding: 1 },
        { student: 'yousef', understanding: 1 },
      ],
    },
    {
      id: 'yousefStarter',
      tone: 'good',
      title: t('Half a sentence is enough', 'نصف جملة يكفي'),
      body: t(
        'With the start given, he finishes it: "…because we are not tired." His first English sentence of the week.',
        'حين أُعطي بداية الجملة، أكملها: «…because we are not tired.» أول جملة إنجليزية يكتبها هذا الأسبوع.',
      ),
      effects: [{ student: 'yousef', understanding: 2, engagement: 2 }],
      setFlag: 'a3.yousefWrote',
    },
    {
      id: 'bridge',
      tone: 'insight',
      title: t('The idea first, the English second', 'الفكرة أولًا، ثم الإنجليزية'),
      body: t(
        'His Arabic reason, eating fast and feeling tired, is the most persuasive in the group. Together you turn it into English, word by word, and he writes it.',
        'سببه بالعربية، أنهم يأكلون بسرعة ويتعبون، هو الأكثر إقناعًا في المجموعة. معًا تحوّلانه إلى الإنجليزية كلمة كلمة، ثم يكتبه بنفسه.',
      ),
      effects: [{ student: 'yousef', understanding: 2, engagement: 3 }],
      setFlag: 'a3.yousefWrote',
    },
    {
      id: 'copyOk',
      tone: 'mixed',
      title: t('Complete, on paper', 'مكتملة، على الورق'),
      body: t(
        'Every page looks finished. Tomorrow\'s writing task, on their own, will show the gap again.',
        'كل الأوراق تبدو مكتملة. لكن مهمة الكتابة الفردية غدًا ستكشف الفجوة من جديد.',
      ),
      effects: [{ student: 'yousef', engagement: -1 }],
    },
    {
      id: 'underline',
      tone: 'insight',
      title: t('Nobody can underline anything', 'لا أحد يستطيع أن يضع خطًا تحت شيء'),
      body: t(
        'Three pages, zero parts. Now everyone can see it, them included. Yousef is the first to say "Miss, can I try?"',
        'ثلاث أوراق، ولا جزء واحد لأحد. الآن يرى الجميع ذلك، وهم أيضًا. ويوسف أول من يقول «أستاذة، هل أجرّب؟»',
      ),
      effects: [
        { student: 'yousef', engagement: 1 },
        { student: 'maitha', engagement: 1 },
      ],
      setFlag: 'a3.sawGaps',
      next: { event: 'yousefStuck', after: 2 },
    },
    {
      id: 'rolesShared',
      tone: 'good',
      title: t('Reem becomes the checker', 'ريم تصبح المدقّقة'),
      body: t(
        'Her job now is to check, not to write. It\'s harder for her than writing, and good for everyone at the table.',
        'مهمتها الآن أن تدقّق لا أن تكتب. وهذا أصعب عليها من الكتابة، ومفيد لكل من على الطاولة.',
      ),
      effects: [
        { student: 'reem', understanding: 1, engagement: 1 },
        { student: 'saeed', engagement: 1 },
        { student: 'yousef', engagement: 1 },
        { student: 'maitha', engagement: 1 },
      ],
      setFlag: 'a3.rolesShared',
    },
    {
      id: 'reemSolo',
      tone: 'mixed',
      title: t('Reem is happy; the group is lost', 'ريم سعيدة، والمجموعة تائهة'),
      body: t(
        'She writes a brilliant paragraph alone. Without her, the others write almost nothing.',
        'تكتب فقرة رائعة وحدها. ومن دونها، لا يكتب الآخرون شيئًا تقريبًا.',
      ),
      effects: [
        { student: 'reem', engagement: 1 },
        { student: 'saeed', understanding: -1 },
        { student: 'yousef', engagement: -1 },
        { student: 'maitha', engagement: -1 },
      ],
    },
  ],
  badges: [
    {
      id: 'a3-everyone-writes',
      title: t('Everyone Holds the Pen', 'القلم في يد الجميع'),
      why: t(
        'Every member of the group left able to write their own part, Reem included.',
        'خرج كل أفراد المجموعة قادرين على كتابة جزئهم بأنفسهم، وريم معهم.',
      ),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a3-team-without-star',
      title: t('A Team Without Its Star', 'فريق يعمل دون نجمه'),
      why: t(
        'When Reem left, the group kept working. That only happens when the work was shared before.',
        'حين غابت ريم، واصلت المجموعة العمل. وهذا لا يحدث إلا إذا كان العمل موزّعًا من قبل.',
      ),
      icon: '◎',
      when: { flag: 'a3.coped' },
    },
    {
      id: 'a3-looked-behind',
      title: t('Looked Behind the Page', 'نظرتِ إلى ما وراء الورقة'),
      why: t(
        'You didn\'t take a finished page at face value. You asked who learned.',
        'لم تكتفي بالورقة المكتملة، بل سألتِ من تعلّم.',
      ),
      icon: '▤',
      when: 'always',
    },
  ],
  communityTopic: t('When one student does the group\'s work', 'حين يقوم طالب واحد بعمل المجموعة'),
  communityExamples: [
    {
      who: t('English teacher · Ras Al Khaimah', 'معلمة لغة إنجليزية · رأس الخيمة'),
      text: t(
        'One coloured pen per student. One look at the page tells me who wrote what.',
        'قلم بلون مختلف لكل طالب. نظرة واحدة إلى الورقة تخبرني من كتب ماذا.',
      ),
    },
    {
      who: t('Grade 6 teacher · Fujairah', 'معلم الصف السادس · الفجيرة'),
      text: t(
        'I make my strongest student the checker, not the writer. They hate it for a week, then they get very good at explaining.',
        'أجعل أقوى طالب هو المدقّق لا الكاتب. يكره ذلك أسبوعًا، ثم يصبح بارعًا جدًا في الشرح.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a3.coped',
      text: t(
        'Reem\'s group worked without her. Back in Grade 5, last week\'s quiz results are in, and one score doesn\'t add up.',
        'عملت مجموعة ريم من دونها. وفي الصف الخامس، وصلت نتائج اختبار الأسبوع الماضي، ودرجة واحدة لا تبدو منطقية.',
      ),
    },
    {
      text: t(
        'Back in Grade 5, last week\'s quiz results are in. Scores make grouping easy. One of them is hiding something.',
        'وفي الصف الخامس، وصلت نتائج اختبار الأسبوع الماضي. الدرجات تجعل التقسيم إلى مجموعات سهلًا. لكن إحداها تخفي شيئًا.',
      ),
    },
  ],
  unlocks: 'a4',
};
