/**
 * Adventure 1 — Different Needs, Same Classroom (Grade 5 Math, adding fractions).
 * Port of the approved demo (scratchpad teacher-demo/index.html), plus:
 *  - Omar has a peek (a crossed-out fraction bar) that changes "Give him a role".
 *  - Flags are namespaced `a1.*` and read by later adventures (a2 Omar, a4/a8 Sara).
 * Branch map: docs/content/TEACHER_CONTENT.md#a1
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A1: Adventure = {
  id: 'a1',
  number: 1,
  title: t('Different Needs, Same Classroom', 'احتياجات مختلفة في صف واحد'),
  meta: t('Grade 5 · Math', 'الصف الخامس · الرياضيات'),
  location: 'grade5',
  scene: 'story/busy-classroom/w1-open-4.jpg',
  takeaway: t(
    '"I don\'t understand" is the start of a question, not the answer: find out what each student actually needs before you choose a fix.',
    '«لم أفهم» بداية سؤال، لا إجابته: اعرف ما يحتاجه كل طالب فعلًا قبل أن تختار الحل.',
  ),
  intro: [
    t(
      'Ms. Mariam\'s Grade 5 class. Today: adding fractions. Twenty-four students, forty minutes.',
      'صف الأستاذة مريم، الصف الخامس. درس اليوم: جمع الكسور. أربعة وعشرون طالبًا، وأربعون دقيقة.',
    ),
    t('One classroom. Different needs. And only so much time.', 'صف واحد. احتياجات مختلفة. والوقت محدود.'),
    t(
      'You are Ms. Mariam. Tap a student to respond. There is no single right path: every choice changes what happens next.',
      'أنتِ الأستاذة مريم. اضغطي على طالب لتستجيبي له. لا يوجد طريق صحيح واحد: كل اختيار يغيّر ما سيحدث بعده.',
    ),
  ],
  introBubbles: [
    { student: 'ahmed', line: t('Miss, I\'ve already finished!', 'أستاذة، خلّصت!') },
    { student: 'sara', line: t('Miss, I still don\'t understand.', 'أستاذة، ما زلت لا أفهم.') },
    { student: 'omar', line: t('Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'sara',
      name: t('Sara', 'سارة'),
      x: 71,
      y: 52,
      understanding: 0,
      engagement: 2,
      idle: t('Sara is working, slowly, rubbing out a lot.', 'سارة تعمل ببطء، وتمسح كثيرًا.'),
      peek: {
        text: t('Sara\'s page: 1/4 + 2/4 = 3/8. Interesting…', 'في ورقة سارة: ١/٤ + ٢/٤ = ٣/٨. مثير للاهتمام…'),
        setFlag: 'a1.peekedSara',
      },
    },
    {
      id: 'ahmed',
      name: t('Ahmed', 'أحمد'),
      x: 57,
      y: 50,
      understanding: 3,
      engagement: 1,
      idle: t('Ahmed is working fast, and glancing at the clock.', 'أحمد يعمل بسرعة، وينظر إلى الساعة.'),
    },
    {
      id: 'omar',
      name: t('Omar', 'عمر'),
      x: 21,
      y: 44,
      understanding: 1,
      engagement: 0,
      idle: t('Omar is at his table, pen still capped.', 'عمر على طاولته، وغطاء قلمه لم يُفتح بعد.'),
      peek: {
        text: t(
          'In the margin of Omar\'s page: a neat fraction bar split into quarters, crossed out.',
          'على هامش ورقة عمر: شريط كسور مرتّب مقسوم إلى أرباع، وقد شطب عليه.',
        ),
        setFlag: 'a1.peekedOmar',
      },
    },
  ],
  objects: [
    {
      id: 'tablets',
      label: t('Tablets', 'الأجهزة اللوحية'),
      icon: '▣',
      x: 90,
      y: 70,
      idle: t('Tablets are working. The task is on screen.', 'الأجهزة تعمل، والمهمة ظاهرة على الشاشة.'),
    },
    {
      id: 'plan',
      label: t('Lesson plan', 'خطة الدرس'),
      icon: '≡',
      x: 82,
      y: 30,
      idle: t(
        'Plan: launch 5 min · practice 20 min · exit ticket 5 min.',
        'الخطة: افتتاح ٥ دقائق · تدريب ٢٠ دقيقة · بطاقة خروج ٥ دقائق.',
      ),
    },
  ],
  schedule: [
    { event: 'sara', at: 3 },
    { event: 'ahmed', at: 6 },
    { event: 'omar', at: 9 },
    { event: 'tablets', at: 22 },
  ],
  events: [
    {
      id: 'sara',
      kind: 'needs-help',
      on: 'sara',
      line: t('"Miss, I still don\'t understand."', '«أستاذة، ما زلت لا أفهم.»'),
      ask: t('Sara is stuck on adding fractions. What do you do?', 'سارة متعثّرة في جمع الكسور. ماذا تفعلين؟'),
      choices: [
        {
          label: t('Show her how', 'أريها الطريقة'),
          sub: t('Support', 'دعم'),
          minutes: 5,
          resource: 'worked-example',
          outcome: [{ ifFlag: 'a1.peekedSara', outcome: 'misconception' }, { outcome: 'ready' }],
        },
        {
          label: t('See why', 'اعرفي السبب'),
          sub: t('Explanation', 'شرح'),
          minutes: 4,
          resource: 'explain-thinking',
          outcome: 'misconception',
        },
        {
          label: t('Move on', 'تابعي الدرس'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'persists',
        },
      ],
    },
    {
      id: 'ahmed',
      kind: 'early-finisher',
      on: 'ahmed',
      line: t('"Miss, I\'ve already finished!"', '«أستاذة، خلّصت!»'),
      ask: t('Ahmed finished all eight problems in six minutes.', 'أنهى أحمد المسائل الثماني كلها في ست دقائق.'),
      choices: [
        {
          label: t('Go further', 'انطلق أبعد'),
          sub: t('Practice', 'تدريب'),
          minutes: 2,
          resource: 'extension-task',
          outcome: 'ahmedDeep',
        },
        {
          label: t('Help a classmate', 'ساعد زميلًا'),
          sub: t('Teams', 'عمل جماعي'),
          minutes: 2,
          resource: 'team-roles',
          outcome: 'ahmedPeer',
        },
      ],
    },
    {
      id: 'omar',
      kind: 'low-participation',
      on: 'omar',
      line: t('"Miss, what are we doing today?"', '«أستاذة، ماذا سنفعل اليوم؟»'),
      ask: t(
        'Omar hasn\'t written anything. His table is working around him.',
        'لم يكتب عمر شيئًا بعد. وطاولته تعمل من حوله.',
      ),
      choices: [
        {
          label: t('Give him a role', 'أعطيه دورًا'),
          sub: t('Teams', 'عمل جماعي'),
          minutes: 3,
          resource: 'team-roles',
          outcome: [{ ifFlag: 'a1.peekedOmar', outcome: 'omarDrawer' }, { outcome: 'omarRole' }],
        },
        {
          label: t('Quick game', 'لعبة سريعة'),
          sub: t('Game', 'لعبة'),
          minutes: 4,
          resource: 'launch-game',
          outcome: 'gameLoud',
        },
      ],
    },
    {
      id: 'tablets',
      kind: 'unexpected',
      on: 'tablets',
      line: t('The class tablets just lost connection.', 'انقطع اتصال أجهزة الصف فجأة.'),
      ask: t('Half the class can\'t see the task.', 'نصف الصف لا يرى المهمة.'),
      choices: [
        {
          label: t('Switch to paper', 'انتقلي إلى الورق'),
          sub: t('Printed backup', 'نسخة ورقية'),
          minutes: 2,
          resource: 'printed-backup',
          outcome: 'paperOk',
        },
        {
          label: t('Wait for the Wi-Fi', 'انتظري عودة الإنترنت'),
          sub: t('Pause the class', 'إيقاف مؤقت'),
          minutes: 7,
          outcome: 'waited',
        },
      ],
    },
    /* ---- follow-ups opened by outcomes ---- */
    {
      id: 'enrich',
      kind: 'new-event',
      on: 'sara',
      line: t('"Can I try a harder one?"', '«هل أجرّب مسألة أصعب؟»'),
      ask: t('Sara got the last three right. Keep her growing.', 'حلّت سارة المسائل الثلاث الأخيرة بشكل صحيح. ساعديها لتواصل التقدّم.'),
      choices: [
        {
          label: t('Harder problem', 'مسألة أصعب'),
          sub: t('Extension task', 'مهمة إثرائية'),
          minutes: 2,
          resource: 'extension-task',
          outcome: 'saraStretch',
        },
        {
          label: t('Let her explain to Omar', 'دعيها تشرح لعمر'),
          sub: t('Teams', 'عمل جماعي'),
          minutes: 3,
          resource: 'team-roles',
          outcome: 'saraTeaches',
        },
      ],
    },
    {
      id: 'targeted',
      kind: 'new-event',
      on: 'sara',
      line: t('Sara writes: 1/4 + 2/4 = 3/8', 'تكتب سارة: ١/٤ + ٢/٤ = ٣/٨'),
      ask: t('She adds the bottoms too. Which practice fits her mistake?', 'إنها تجمع المقامات أيضًا. أي تدريب يناسب خطأها؟'),
      choices: [
        {
          label: t('Fraction strips: same-size pieces', 'شرائط الكسور: أجزاء متساوية'),
          sub: t('Targeted practice set', 'تدريبات موجّهة'),
          minutes: 4,
          resource: 'targeted-practice',
          outcome: 'fixed',
        },
        {
          label: t('Ten more mixed problems', 'عشر مسائل متنوعة أخرى'),
          sub: t('General worksheet', 'ورقة عمل عامة'),
          minutes: 5,
          outcome: 'repeated',
        },
        {
          label: t('Watch the video again', 'شاهدي الفيديو مرة أخرى'),
          sub: t('Replay', 'إعادة'),
          minutes: 4,
          outcome: 'repeated',
        },
      ],
    },
    {
      id: 'intervene',
      kind: 'new-event',
      on: 'sara',
      line: t('Sara and two others are still stuck.', 'سارة واثنان آخران ما زالوا متعثّرين.'),
      ask: t('It\'s getting late in the lesson. How do you catch them up?', 'الدرس يقترب من نهايته. كيف تساعدينهم على اللحاق؟'),
      choices: [
        {
          label: t('Pull them to a side table', 'اجمعيهم على طاولة جانبية'),
          sub: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
          minutes: 5,
          resource: 'small-group-reteach',
          outcome: 'caughtUp',
        },
        {
          label: t('Reteach the whole class', 'أعيدي الشرح للصف كله'),
          sub: t('Whole class', 'الصف كله'),
          minutes: 8,
          outcome: 'wholeReteach',
        },
      ],
    },
    {
      id: 'peerAnswers',
      kind: 'unexpected',
      on: 'ahmed',
      line: t('Ahmed is just telling Sara the answers.', 'أحمد يملي على سارة الإجابات فقط.'),
      ask: t('Sara\'s page is filling up, but is she learning?', 'ورقة سارة تمتلئ، لكن هل تتعلّم؟'),
      choices: [
        {
          label: t('"Ask her a question instead"', '«اسألها سؤالًا بدلًا من ذلك»'),
          sub: t('Coach the helper', 'وجّهي المساعد'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'goodPeer',
        },
        {
          label: t('Let it go', 'اتركيهما'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'copied',
        },
      ],
    },
    {
      id: 'loud',
      kind: 'unexpected',
      on: 'omar',
      line: t('The game is loud. Two students are just guessing.', 'اللعبة صاخبة، وطالبان يخمّنان فقط.'),
      ask: t(
        'Omar is finally joining in, but some answers are guesses.',
        'عمر يشارك أخيرًا، لكن بعض الإجابات مجرد تخمين.',
      ),
      choices: [
        {
          label: t('Pause: "Why that answer?"', 'توقّفي: «لماذا هذه الإجابة؟»'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'gameFocused',
        },
        {
          label: t('Keep playing', 'تابعي اللعب'),
          sub: t('Continue', 'متابعة'),
          minutes: 3,
          outcome: 'gameGuess',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'ready',
      tone: 'good',
      title: t('Sara is ready to progress', 'سارة مستعدة للتقدّم'),
      body: t('She follows the model, then solves the next one alone.', 'تتابع النموذج، ثم تحلّ المسألة التالية وحدها.'),
      effects: [{ student: 'sara', understanding: 2, engagement: 1 }],
      setFlag: 'a1.ready',
      next: { event: 'enrich', after: 4 },
    },
    {
      id: 'misconception',
      tone: 'insight',
      title: t('Misconception discovered', 'اكتشفتِ الفهم الخاطئ'),
      body: t(
        'As she talks, you hear it: she adds the denominators too.',
        'وهي تتكلّم، تسمعينه بوضوح: إنها تجمع المقامات أيضًا.',
      ),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }],
      setFlag: 'a1.misconception',
      next: { event: 'targeted', after: 2 },
    },
    {
      id: 'persists',
      tone: 'mixed',
      title: t('Difficulty persists', 'الصعوبة مستمرة'),
      body: t('Sara goes quiet and copies her neighbour\'s first line.', 'تصمت سارة، وتنقل السطر الأول من ورقة جارتها.'),
      effects: [{ student: 'sara', engagement: -1 }],
      next: { event: 'intervene', after: 9 },
    },
    {
      id: 'ahmedDeep',
      tone: 'good',
      title: t('Ahmed is thinking hard', 'أحمد يفكّر بعمق'),
      body: t('The extension problem has him sketching diagrams.', 'المسألة الإثرائية جعلته يرسم أشكالًا توضيحية.'),
      effects: [{ student: 'ahmed', engagement: 2 }],
    },
    {
      id: 'ahmedPeer',
      tone: 'mixed',
      title: t('Ahmed moves next to Sara', 'أحمد ينتقل بجانب سارة'),
      body: t('He\'s happy to help. A few minutes later, you look over…', 'هو سعيد بالمساعدة. وبعد دقائق، تلقين نظرة…'),
      effects: [{ student: 'ahmed', engagement: 1 }],
      next: { event: 'peerAnswers', after: 3 },
    },
    {
      id: 'omarRole',
      tone: 'good',
      title: t('Omar is the reporter', 'عمر هو المتحدّث'),
      body: t(
        'He has to tell the class what his table found, so he starts listening.',
        'عليه أن يخبر الصف بما توصّلت إليه طاولته، فيبدأ بالإصغاء.',
      ),
      effects: [{ student: 'omar', understanding: 1, engagement: 3 }],
      setFlag: 'a1.omarIn',
    },
    {
      id: 'omarDrawer',
      tone: 'good',
      title: t('Omar draws it for his table', 'عمر يرسمها لطاولته'),
      body: t(
        'You saw the fraction bar he crossed out, so his job is to draw the table\'s answer. His drawing is the clearest one in the room.',
        'رأيتِ شريط الكسور الذي شطب عليه، فصارت مهمته أن يرسم إجابة الطاولة. رسمه هو الأوضح في الصف.',
      ),
      effects: [{ student: 'omar', understanding: 2, engagement: 3 }],
      setFlag: 'a1.omarIn',
    },
    {
      id: 'gameLoud',
      tone: 'mixed',
      title: t('The class lights up', 'الصف ينبض بالحماس'),
      body: t('Everyone is in, Omar too. Then the noise rises.', 'الجميع يشارك، وعمر أيضًا. ثم يرتفع الصوت.'),
      effects: [
        { student: 'omar', engagement: 3 },
        { student: 'ahmed', engagement: 1 },
      ],
      next: { event: 'loud', after: 2 },
    },
    {
      id: 'paperOk',
      tone: 'good',
      title: t('The lesson keeps going', 'الدرس مستمر'),
      body: t(
        'Paper copies come out in a minute; nobody loses the thread.',
        'تخرج النسخ الورقية في دقيقة، ولا يفقد أحد خيط الدرس.',
      ),
      effects: [],
    },
    {
      id: 'waited',
      tone: 'poor',
      title: t('Seven minutes lost', 'ضاعت سبع دقائق'),
      body: t('The Wi-Fi comes back, but the class has drifted.', 'عاد الإنترنت، لكن انتباه الصف تشتّت.'),
      effects: [
        { student: 'omar', engagement: -1 },
        { student: 'ahmed', engagement: -1 },
      ],
    },
    {
      id: 'saraStretch',
      tone: 'good',
      title: t('Sara is stretching', 'سارة تتحدّى نفسها'),
      body: t(
        'She tackles unlike denominators and explains her drawing.',
        'تحاول جمع كسور مقاماتها مختلفة، وتشرح رسمها.',
      ),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }],
    },
    {
      id: 'saraTeaches',
      tone: 'good',
      title: t('Sara explains it to Omar', 'سارة تشرحها لعمر'),
      body: t(
        'Teaching it locks it in for her, and Omar gets it in kid language.',
        'الشرح يثبّت الفكرة عندها، وعمر يفهمها بلغة الأطفال.',
      ),
      effects: [
        { student: 'sara', understanding: 1, engagement: 1 },
        { student: 'omar', understanding: 1, engagement: 1 },
      ],
      setFlag: 'a1.saraTaught',
    },
    {
      id: 'fixed',
      tone: 'good',
      title: t('The strips do it', 'الشرائط تحلّ المشكلة'),
      body: t(
        '"Oh! The pieces stay quarters." She fixes her last three answers.',
        '«آه! الأجزاء تبقى أرباعًا.» وتصحّح إجاباتها الثلاث الأخيرة.',
      ),
      effects: [{ student: 'sara', understanding: 2, engagement: 1 }],
      setFlag: 'a1.fixed',
    },
    {
      id: 'repeated',
      tone: 'poor',
      title: t('Same mistake, ten more times', 'الخطأ نفسه، عشر مرات أخرى'),
      body: t(
        'More practice of the wrong idea makes it stick harder.',
        'التدريب الإضافي على الفكرة الخاطئة يجعلها أرسخ.',
      ),
      effects: [{ student: 'sara', engagement: -1 }],
    },
    {
      id: 'caughtUp',
      tone: 'good',
      title: t('Three students catch up', 'ثلاثة طلاب يلحقون بالدرس'),
      body: t(
        'Five minutes at the side table, while everyone else keeps working.',
        'خمس دقائق على الطاولة الجانبية، وبقية الصف يواصل العمل.',
      ),
      effects: [{ student: 'sara', understanding: 2, engagement: 1 }],
      setFlag: 'a1.caughtUp',
    },
    {
      id: 'wholeReteach',
      tone: 'mixed',
      title: t('Sara gets it; Ahmed checks out', 'سارة تفهم، وأحمد ينسحب'),
      body: t(
        'The reteach works for the three, but costs the rest of the class.',
        'إعادة الشرح نجحت مع الثلاثة، لكن على حساب بقية الصف.',
      ),
      effects: [
        { student: 'sara', understanding: 2 },
        { student: 'ahmed', engagement: -2 },
      ],
      setFlag: 'a1.caughtUp',
    },
    {
      id: 'goodPeer',
      tone: 'good',
      title: t('Ahmed becomes a real helper', 'أحمد يصبح مساعدًا حقيقيًا'),
      body: t(
        '"Why do the quarters stay quarters?" Now they\'re both thinking.',
        '«لماذا تبقى الأرباع أرباعًا؟» الآن يفكّر الاثنان معًا.',
      ),
      effects: [
        { student: 'sara', understanding: 2, engagement: 1 },
        { student: 'ahmed', engagement: 1 },
      ],
      setFlag: 'a1.helperCoached',
    },
    {
      id: 'copied',
      tone: 'poor',
      title: t('Sara has answers, not understanding', 'لدى سارة إجابات، لا فهم'),
      body: t(
        'Her page is full. On the exit ticket, she\'s stuck again.',
        'ورقتها ممتلئة. وعند بطاقة الخروج تتعثّر من جديد.',
      ),
      effects: [{ student: 'sara', engagement: -1 }],
    },
    {
      id: 'gameFocused',
      tone: 'good',
      title: t('From guessing to reasoning', 'من التخمين إلى التفكير'),
      body: t(
        'One "why" turns the game into a real discussion. Omar explains his pick.',
        'سؤال «لماذا» واحد حوّل اللعبة إلى نقاش حقيقي. وعمر يشرح اختياره.',
      ),
      effects: [{ student: 'omar', understanding: 2 }],
      setFlag: 'a1.omarIn',
    },
    {
      id: 'gameGuess',
      tone: 'mixed',
      title: t('Fun, but shallow', 'ممتعة، لكنها سطحية'),
      body: t(
        'Everyone played. Few could say why their answer was right.',
        'لعب الجميع، لكن قلّة فقط استطاعوا أن يقولوا لماذا كانت إجابتهم صحيحة.',
      ),
      effects: [],
    },
  ],
  badges: [
    {
      id: 'a1-every-learner',
      title: t('Every Learner In', 'كل طالب في الدرس'),
      why: t('All three students left the lesson able to do it.', 'خرج الطلاب الثلاثة من الدرس وهم قادرون على الحل.'),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a1-misconception-hunter',
      title: t('Misconception Hunter', 'صائدة الفهم الخاطئ'),
      why: t(
        'You found the real mistake behind "I don\'t understand".',
        'وجدتِ الخطأ الحقيقي وراء «لم أفهم».',
      ),
      icon: '◆',
      when: { flag: 'a1.misconception' },
    },
    {
      id: 'a1-first-lesson',
      title: t('First Lesson Logged', 'أول درس في الدفتر'),
      why: t('You saw three different needs and acted on them.', 'رأيتِ ثلاثة احتياجات مختلفة وتصرّفتِ حيالها.'),
      icon: '✎',
      when: 'always',
    },
  ],
  communityTopic: t('Different needs, same classroom', 'احتياجات مختلفة في صف واحد'),
  communityExamples: [
    {
      who: t('Grade 5 teacher · Al Ain', 'معلمة الصف الخامس · العين'),
      text: t(
        'I keep a "go further" card on every table. Early finishers grab it without asking.',
        'أضع بطاقة «انطلق أبعد» على كل طاولة. من ينهي مبكرًا يأخذها دون أن يسأل.',
      ),
    },
    {
      who: t('Math teacher · Abu Dhabi', 'معلم رياضيات · أبوظبي'),
      text: t(
        '"Show me how you got that" found more mistakes this week than any quiz did.',
        '«أرني كيف وصلت إلى هذا» كشفت هذا الأسبوع أخطاء أكثر مما كشفه أي اختبار.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a1.omarIn',
      text: t(
        'Omar spoke up today. Tomorrow, the quiet table across the room doesn\'t.',
        'تكلّم عمر اليوم. أما غدًا، فالطاولة الهادئة في الطرف الآخر من الصف لن تتكلّم.',
      ),
    },
    {
      text: t(
        'Omar barely spoke today, and he isn\'t the only one.',
        'بالكاد تكلّم عمر اليوم، وهو ليس الوحيد.',
      ),
    },
  ],
  unlocks: 'a2',
};
