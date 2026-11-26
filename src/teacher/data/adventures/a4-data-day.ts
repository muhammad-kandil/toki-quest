/**
 * Adventure 4 — Data Day (Grade 5 Math, comparing and adding fractions).
 * Regrouping by last week's quiz. Hamdan's 3/10 hides a different story:
 * every answer he gave was right; he ran out of time on long word problems.
 * Reads a1.fixed / a1.caughtUp (Sara's quiz shows whether the fix stuck).
 * Branch map: docs/content/TEACHER_CONTENT.md#a4
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A4: Adventure = {
  id: 'a4',
  number: 4,
  title: t('Data Day', 'يوم البيانات'),
  meta: t('Grade 5 · Math', 'الصف الخامس · الرياضيات'),
  location: 'grade5',
  scene: 'teacher/scenes/a4.jpg',
  takeaway: t(
    'A score is where the question starts: look at which questions sit behind it, and let groups move when students show you more.',
    'الدرجة بداية السؤال لا نهايته: انظر إلى الأسئلة التي وراءها، ودع المجموعات تتغيّر حين يُظهر لك الطلاب أكثر.',
  ),
  intro: [
    t(
      'Grade 5 Math. Last week\'s fractions quiz is marked, and the results are on your tablet.',
      'رياضيات الصف الخامس. اختبار الكسور الأسبوع الماضي صُحّح، والنتائج على جهازك اللوحي.',
    ),
    t(
      'Today the class works in three groups: Go further, Nearly there, and Reteach.',
      'اليوم يعمل الصف في ثلاث مجموعات: انطلق أبعد، اقتربت، وإعادة شرح.',
    ),
    t(
      'The numbers make it easy. Maybe too easy.',
      'الأرقام تجعل الأمر سهلًا. ربما أسهل مما ينبغي.',
    ),
  ],
  introBubbles: [
    { student: 'sara', line: t('Which group am I in?', 'في أي مجموعة أنا؟') },
    { student: 'hamdan', line: t('…the weak group?', '…المجموعة الضعيفة؟') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'hamdan',
      name: t('Hamdan', 'حمدان'),
      x: 26,
      y: 62,
      understanding: 2,
      engagement: 1,
      idle: t(
        'Hamdan reads every question twice, his finger under each word.',
        'حمدان يقرأ كل سؤال مرتين، وإصبعه تحت كل كلمة.',
      ),
      homeNote: t(
        'Arabic at home. His father checks his homework every night and takes scores very seriously.',
        'العربية لغة البيت. ووالده يراجع واجباته كل ليلة، ويأخذ الدرجات بجدية كبيرة.',
      ),
      peek: {
        text: t(
          'Hamdan\'s quiz: 3 out of 10. The three he answered are right. The other seven are blank.',
          'اختبار حمدان: ٣ من ١٠. الأسئلة الثلاثة التي أجاب عنها صحيحة، والسبعة الباقية فارغة.',
        ),
        setFlag: 'a4.peekedHamdan',
      },
    },
    {
      id: 'sara',
      name: t('Sara', 'سارة'),
      x: 64,
      y: 56,
      understanding: 1,
      engagement: 2,
      idle: t('Sara keeps looking at the group list on the board.', 'سارة تنظر إلى قائمة المجموعات على السبورة مرة بعد مرة.'),
      homeNote: t(
        'Her older sister helps with homework most evenings, and explains fractions the way she learned them.',
        'أختها الكبرى تساعدها في الواجبات معظم الأمسيات، وتشرح لها الكسور بالطريقة التي تعلّمتها هي.',
      ),
    },
    {
      id: 'omar',
      name: t('Omar', 'عمر'),
      x: 44,
      y: 70,
      understanding: 1,
      engagement: 1,
      idle: t('Omar is working through the reteach sheet, quickly.', 'عمر يحلّ ورقة إعادة الشرح بسرعة.'),
      homeNote: t(
        'His dad works night shifts, so mornings are rushed and Omar often arrives without breakfast.',
        'والده يعمل في نوبات ليلية، فالصباح عندهم مستعجل، وكثيرًا ما يصل عمر دون أن يفطر.',
      ),
    },
  ],
  objects: [
    {
      id: 'results',
      label: t('Quiz results', 'نتائج الاختبار'),
      icon: '▦',
      x: 82,
      y: 30,
      idle: t(
        'Class average 6 out of 10. Eight students in Go further, ten in Nearly there, six in Reteach.',
        'متوسط الصف ٦ من ١٠. ثمانية طلاب في «انطلق أبعد»، وعشرة في «اقتربت»، وستة في «إعادة شرح».',
      ),
    },
    {
      id: 'phone',
      label: t('Class messages', 'رسائل الصف'),
      icon: '✉',
      x: 88,
      y: 64,
      idle: t('No new messages.', 'لا رسائل جديدة.'),
    },
  ],
  schedule: [
    { event: 'grouping', at: 2 },
    { event: 'saraGroup', at: 7 },
    { event: 'omarDone', at: 12 },
    { event: 'parentMsg', at: 24 },
  ],
  events: [
    {
      id: 'grouping',
      kind: 'new-event',
      on: 'results',
      line: t('Three groups, ready-made from the quiz.', 'ثلاث مجموعات جاهزة من نتائج الاختبار.'),
      ask: t(
        'Hamdan is in Reteach with 3 out of 10. The class is waiting to move.',
        'حمدان في مجموعة إعادة الشرح بدرجة ٣ من ١٠. والصف ينتظر ليتحرّك.',
      ),
      choices: [
        {
          label: t('Use the groups as they are', 'اعتمدي المجموعات كما هي'),
          sub: t('Results-based groups', 'مجموعات حسب النتائج'),
          minutes: 2,
          resource: 'flexible-groups',
          outcome: [{ ifFlag: 'a4.peekedHamdan', outcome: 'groupsMoveHamdan' }, { outcome: 'groupsAsIs' }],
        },
        {
          label: t('Open the question-by-question view', 'افتحي النتائج سؤالًا بسؤال'),
          sub: t('Look behind the score', 'ما وراء الدرجة'),
          minutes: 3,
          resource: 'question-level',
          outcome: 'hiddenStory',
        },
        {
          label: t('Mixed groups, as usual', 'مجموعات مختلطة كالمعتاد'),
          sub: t('Mixed ability', 'مستويات مختلطة'),
          minutes: 1,
          outcome: 'mixedAsUsual',
        },
      ],
    },
    {
      id: 'saraGroup',
      kind: 'needs-help',
      on: 'sara',
      line: t('"Miss, I\'m in Nearly there? I thought I\'d be in Reteach."', '«أستاذة، أنا في اقتربت؟ ظننت أنني في إعادة الشرح.»'),
      ask: t(
        'Her score went up since the fractions lesson. She isn\'t sure she believes it.',
        'ارتفعت درجتها منذ درس الكسور، لكنها غير متأكدة أنها تصدّق ذلك.',
      ),
      choices: [
        {
          label: t('Show her which questions she got right', 'أريها الأسئلة التي أصابت فيها'),
          sub: t('Question-by-question results', 'النتائج سؤالًا بسؤال'),
          minutes: 2,
          resource: 'question-level',
          outcome: [
            { ifFlag: 'a1.fixed', outcome: 'saraProof' },
            { ifFlag: 'a1.caughtUp', outcome: 'saraProof' },
            { outcome: 'saraPartial' },
          ],
        },
        {
          label: t('"You earned it. Off you go."', '«لقد استحققتِها. هيا.»'),
          sub: t('Encourage', 'تشجيع'),
          minutes: 0,
          outcome: 'saraUnsure',
        },
      ],
    },
    {
      id: 'omarDone',
      kind: 'early-finisher',
      on: 'omar',
      line: t('"Miss, I finished. Can I go to Go further?"', '«أستاذة، خلّصت. هل أنتقل إلى انطلق أبعد؟»'),
      ask: t(
        'Omar finished the reteach sheet in eight minutes, all correct. The groups were meant to last the lesson.',
        'أنهى عمر ورقة إعادة الشرح في ثماني دقائق، وكل إجاباته صحيحة. والمجموعات كان يُفترض أن تبقى طوال الدرس.',
      ),
      choices: [
        {
          label: t('Yes: move him up now', 'نعم: انقليه الآن'),
          sub: t('Results-based groups', 'مجموعات مرنة'),
          minutes: 1,
          resource: 'flexible-groups',
          outcome: 'omarMoves',
        },
        {
          label: t('One harder question first', 'سؤال أصعب أولًا'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'omarCheck',
        },
        {
          label: t('Stay: the plan is the plan', 'ابقَ: الخطة هي الخطة'),
          sub: t('Keep the groups', 'إبقاء المجموعات'),
          minutes: 0,
          outcome: 'omarStays',
        },
      ],
    },
    {
      id: 'parentMsg',
      kind: 'unexpected',
      on: 'phone',
      line: t('Hamdan\'s father: "Why is my son in the weak group?"', 'والد حمدان: «لماذا ابني في المجموعة الضعيفة؟»'),
      ask: t(
        'The message arrived mid-lesson. He saw the group name on the school app.',
        'وصلت الرسالة أثناء الدرس. لقد رأى اسم المجموعة على تطبيق المدرسة.',
      ),
      choices: [
        {
          label: t('Reply after class, with what you know', 'ردّي بعد الحصة بما تعرفينه'),
          sub: t('Share the evidence', 'مشاركة الدليل'),
          minutes: 1,
          outcome: [{ ifFlag: 'a4.hamdanSeen', outcome: 'evidenceReply' }, { outcome: 'scoreReply' }],
        },
        {
          label: t('Reply now: "Groups change every week"', 'ردّي الآن: «المجموعات تتغيّر كل أسبوع»'),
          sub: t('Reassure', 'طمأنة'),
          minutes: 2,
          outcome: 'quickReassure',
        },
      ],
    },
    /* ---- follow-ups ---- */
    {
      id: 'hamdanFlat',
      kind: 'low-participation',
      on: 'hamdan',
      line: t('Hamdan has stopped writing.', 'توقّف حمدان عن الكتابة.'),
      ask: t(
        'The reteach problems are ones he can do. He\'s starting to believe he\'s in the "weak" group.',
        'مسائل إعادة الشرح يعرف كيف يحلّها. لكنه بدأ يصدّق أنه في المجموعة «الضعيفة».',
      ),
      choices: [
        {
          label: t('"Talk me through this one"', '«اشرح لي هذه المسألة»'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'hamdanExplains',
        },
        {
          label: t('Give him the next sheet', 'أعطيه الورقة التالية'),
          sub: t('More practice', 'تدريب إضافي'),
          minutes: 0,
          outcome: 'moreOfSame',
        },
      ],
    },
    {
      id: 'hamdanTalk',
      kind: 'new-event',
      on: 'hamdan',
      line: t('"The word questions are long, Miss. I read them twice."', '«المسائل الكلامية طويلة يا أستاذة. أقرؤها مرتين.»'),
      ask: t(
        'He is careful and accurate, and slow with long problems. Where should he work today?',
        'إنه دقيق ومتأنٍّ، لكنه بطيء في المسائل الطويلة. أين يعمل اليوم؟',
      ),
      choices: [
        {
          label: t('Go further, with a reading partner', 'انطلق أبعد، مع زميل يقرأ معه'),
          sub: t('Results-based groups', 'مجموعات مرنة'),
          minutes: 2,
          resource: 'flexible-groups',
          outcome: 'hamdanUp',
        },
        {
          label: t('Short word problems, extra time', 'مسائل كلامية قصيرة، ووقت إضافي'),
          sub: t('Targeted practice set', 'تدريبات موجّهة'),
          minutes: 3,
          resource: 'targeted-practice',
          outcome: 'readingPractice',
        },
      ],
    },
    {
      id: 'saraLeans',
      kind: 'needs-help',
      on: 'sara',
      line: t('Sara\'s partner is doing her problems for her.', 'زميل سارة يحلّ مسائلها بدلًا منها.'),
      ask: t(
        'In mixed groups, Sara found the strongest student at the table and leaned on him.',
        'في المجموعات المختلطة، وجدت سارة أقوى طالب على الطاولة واعتمدت عليه.',
      ),
      choices: [
        {
          label: t('Pull the stuck students for five minutes', 'اجمعي المتعثّرين لخمس دقائق'),
          sub: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
          minutes: 5,
          resource: 'small-group-reteach',
          outcome: 'reteachTable',
        },
        {
          label: t('"Ask her, don\'t tell her"', '«اسألها، لا تُملِ عليها»'),
          sub: t('Coach the helper', 'وجّهي المساعد'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'helperAsks',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'groupsAsIs',
      tone: 'mixed',
      title: t('Quick, and mostly right', 'سريع، وصحيح في معظمه'),
      body: t(
        'Most students land where they need to be. Hamdan sits down at Reteach and frowns at the first problem: he can already do it.',
        'معظم الطلاب في المكان المناسب لهم. حمدان يجلس في إعادة الشرح ويعبس أمام المسألة الأولى: إنه يعرف حلّها.',
      ),
      effects: [{ student: 'hamdan', engagement: -1 }],
      next: { event: 'hamdanFlat', after: 5 },
    },
    {
      id: 'groupsMoveHamdan',
      tone: 'good',
      title: t('The groups, with one change', 'المجموعات، مع تغيير واحد'),
      body: t(
        'You use the results, but you saw Hamdan\'s blank page. Before he sits down, you call him over.',
        'تعتمدين النتائج، لكنكِ رأيتِ ورقة حمدان الفارغة. وقبل أن يجلس، تنادينه.',
      ),
      effects: [{ student: 'hamdan', engagement: 1 }],
      setFlag: 'a4.hamdanSeen',
      next: { event: 'hamdanTalk', after: 1 },
    },
    {
      id: 'hiddenStory',
      tone: 'insight',
      title: t('One score tells a different story', 'درجة واحدة تروي قصة مختلفة'),
      body: t(
        'Hamdan got every question he answered right. He answered three of ten. That isn\'t fractions. That\'s time, or reading.',
        'أصاب حمدان في كل سؤال أجاب عنه، لكنه أجاب عن ثلاثة من عشرة. المشكلة ليست في الكسور، بل في الوقت أو القراءة.',
      ),
      effects: [],
      setFlag: 'a4.hamdanSeen',
      next: { event: 'hamdanTalk', after: 2 },
    },
    {
      id: 'mixedAsUsual',
      tone: 'mixed',
      title: t('Familiar, and blurry', 'مألوف، لكنه ضبابي'),
      body: t(
        'The tables work. But the students who need you most are spread across the room, and hard to reach.',
        'الطاولات تعمل. لكن الطلاب الأكثر حاجة إليكِ موزّعون في أرجاء الصف، ويصعب الوصول إليهم.',
      ),
      effects: [{ student: 'omar', engagement: -1 }],
      next: { event: 'saraLeans', after: 7 },
    },
    {
      id: 'saraProof',
      tone: 'good',
      title: t('The fix stuck', 'التصحيح ثبت'),
      body: t(
        'Every "same denominator" question is right. The mistake from the fractions lesson is gone, and she can see it is gone.',
        'كل أسئلة «المقامات المتساوية» صحيحة. الخطأ الذي ظهر في درس الكسور اختفى، وهي ترى بنفسها أنه اختفى.',
      ),
      effects: [{ student: 'sara', understanding: 1, engagement: 2 }],
      setFlag: 'a4.saraBelieves',
    },
    {
      id: 'saraPartial',
      tone: 'insight',
      title: t('Right on some, not on others', 'تصيب في بعضها، لا في كلها'),
      body: t(
        'She gets same-denominator questions now, but still adds the bottoms when they\'re different. Now you both know exactly what to practise.',
        'صارت تحلّ أسئلة المقامات المتساوية، لكنها ما زالت تجمع المقامات حين تختلف. الآن تعرفان كلتاكما ما الذي يحتاج إلى تدريب بالضبط.',
      ),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }],
      setFlag: 'a4.saraBelieves',
    },
    {
      id: 'saraUnsure',
      tone: 'mixed',
      title: t('She goes, but she isn\'t sure', 'تذهب، لكنها غير واثقة'),
      body: t(
        'She sits at Nearly there and waits for someone to tell her she isn\'t meant to be there.',
        'تجلس في «اقتربت» وتنتظر أن يخبرها أحد أن مكانها ليس هنا.',
      ),
      effects: [{ student: 'sara', engagement: -1 }],
    },
    {
      id: 'omarMoves',
      tone: 'good',
      title: t('Groups that move', 'مجموعات تتحرّك'),
      body: t(
        'The groups were a starting point, not a label. Omar walks over to Go further like he\'s been promoted.',
        'المجموعات كانت نقطة بداية، لا تصنيفًا. ويمشي عمر إلى «انطلق أبعد» كأنه نال ترقية.',
      ),
      effects: [{ student: 'omar', understanding: 1, engagement: 2 }],
      setFlag: 'a4.moved',
    },
    {
      id: 'omarCheck',
      tone: 'good',
      title: t('He can do it, and say why', 'يستطيع الحل، ويقول لماذا'),
      body: t(
        '"Make the pieces the same size first." He solves the harder one and explains it. Now you\'re sure, and so is he.',
        '«نجعل الأجزاء بالحجم نفسه أولًا.» يحلّ المسألة الأصعب ويشرحها. الآن أنتِ متأكدة، وهو أيضًا.',
      ),
      effects: [{ student: 'omar', understanding: 2, engagement: 1 }],
      setFlag: 'a4.moved',
    },
    {
      id: 'omarStays',
      tone: 'poor',
      title: t('Omar finds something else to do', 'عمر يجد شيئًا آخر يفعله'),
      body: t(
        'He spends twenty minutes on problems he can already do. By the end, he\'s balancing a pencil on his nose.',
        'يقضي عشرين دقيقة في مسائل يعرف حلّها. وفي النهاية، يوازن قلمًا على أنفه.',
      ),
      effects: [{ student: 'omar', engagement: -2 }],
    },
    {
      id: 'evidenceReply',
      tone: 'good',
      title: t('"He needs more time, not easier work"', '«يحتاج إلى وقت أطول، لا إلى عمل أسهل»'),
      body: t(
        'After class you write: every answer he gave was right; the long word problems slowed him down; here is what we\'re doing about it. His father replies with a thank-you.',
        'بعد الحصة تكتبين: كل إجابة قدّمها كانت صحيحة، والمسائل الكلامية الطويلة أبطأته، وهذا ما سنفعله. ويردّ والده بالشكر.',
      ),
      effects: [{ student: 'hamdan', engagement: 1 }],
      setFlag: 'a4.fatherTrusts',
    },
    {
      id: 'scoreReply',
      tone: 'mixed',
      title: t('You can only explain the score', 'لا تستطيعين أن تشرحي إلا الدرجة'),
      body: t(
        'You write that he scored 3 out of 10. It\'s true. It isn\'t the whole story, and his father can tell.',
        'تكتبين أنه حصل على ٣ من ١٠. هذا صحيح، لكنه ليس القصة كلها، ووالده يشعر بذلك.',
      ),
      effects: [],
    },
    {
      id: 'quickReassure',
      tone: 'mixed',
      title: t('True, and two minutes of the lesson', 'صحيح، وكلّفكِ دقيقتين من الدرس'),
      body: t(
        'The father is calmer. Meanwhile, two tables have stopped working.',
        'هدأ الأب. وفي هذه الأثناء، توقّفت طاولتان عن العمل.',
      ),
      effects: [
        { student: 'sara', engagement: -1 },
        { student: 'omar', engagement: -1 },
      ],
    },
    {
      id: 'hamdanExplains',
      tone: 'insight',
      title: t('"I know how. I just didn\'t finish."', '«أعرف الطريقة، لكنني لم أُنهِ.»'),
      body: t(
        'He explains it perfectly. The quiz ran out of time on him. That 3 was a clock, not a gap.',
        'يشرحها بإتقان. نفد وقت الاختبار قبل أن يُنهي. تلك الدرجة ٣ كانت ساعة، لا فجوة في الفهم.',
      ),
      effects: [{ student: 'hamdan', engagement: 1 }],
      setFlag: 'a4.hamdanSeen',
      next: { event: 'hamdanTalk', after: 1 },
    },
    {
      id: 'moreOfSame',
      tone: 'poor',
      title: t('More of what he can already do', 'مزيد مما يعرفه أصلًا'),
      body: t(
        'He finishes it, slowly and correctly, and says nothing. He leaves believing he is "weak at maths".',
        'ينهيها ببطء وبإجابات صحيحة، ولا يقول شيئًا. ويخرج وهو مقتنع أنه «ضعيف في الرياضيات».',
      ),
      effects: [{ student: 'hamdan', engagement: -2 }],
    },
    {
      id: 'hamdanUp',
      tone: 'good',
      title: t('He\'s where his maths is', 'في المكان الذي يناسب مستواه'),
      body: t(
        'His partner reads the long problems aloud; Hamdan does the maths. He solves the hardest one at the table.',
        'زميله يقرأ المسائل الطويلة بصوت مسموع، وحمدان يحلّ. ويحلّ أصعب مسألة على الطاولة.',
      ),
      effects: [{ student: 'hamdan', understanding: 1, engagement: 2 }],
    },
    {
      id: 'readingPractice',
      tone: 'good',
      title: t('Practice for the real gap', 'تدريب للفجوة الحقيقية'),
      body: t(
        'Short word problems, extra time. For the first time, he finishes every one.',
        'مسائل كلامية قصيرة، ووقت إضافي. ولأول مرة، يُنهيها كلها.',
      ),
      effects: [{ student: 'hamdan', understanding: 1, engagement: 1 }],
    },
    {
      id: 'reteachTable',
      tone: 'good',
      title: t('Five minutes, two students', 'خمس دقائق، وطالبان'),
      body: t(
        'At your table, without a stronger partner to lean on, Sara has to try. So does Omar. Both get there.',
        'على طاولتك، ومن دون زميل أقوى تعتمد عليه، على سارة أن تحاول بنفسها. وكذلك عمر. وكلاهما يصل.',
      ),
      effects: [
        { student: 'sara', understanding: 2, engagement: 1 },
        { student: 'omar', understanding: 1, engagement: 1 },
      ],
    },
    {
      id: 'helperAsks',
      tone: 'mixed',
      title: t('Slower, but hers', 'أبطأ، لكنه حلّها هي'),
      body: t(
        'Her partner starts asking instead of telling. Sara gets two right on her own; the table finishes later than the rest.',
        'يبدأ زميلها بالسؤال بدل الإملاء. تحلّ سارة مسألتين وحدها، وتنهي الطاولة بعد الآخرين.',
      ),
      effects: [{ student: 'sara', understanding: 1, engagement: 1 }],
    },
  ],
  badges: [
    {
      id: 'a4-everyone-right-place',
      title: t('Everyone in the Right Place', 'كل طالب في مكانه الصحيح'),
      why: t(
        'Every student ended the lesson working at the level they were really ready for.',
        'أنهى كل طالب الدرس وهو يعمل في المستوى الذي كان مستعدًا له فعلًا.',
      ),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a4-behind-the-score',
      title: t('Behind the Score', 'ما وراء الدرجة'),
      why: t(
        'You saw that Hamdan\'s 3 out of 10 was about time, not fractions.',
        'رأيتِ أن درجة حمدان ٣ من ١٠ كانت مسألة وقت، لا مسألة كسور.',
      ),
      icon: '▦',
      when: { flag: 'a4.hamdanSeen' },
    },
    {
      id: 'a4-data-read',
      title: t('Read the Data', 'قرأتِ البيانات'),
      why: t(
        'You used last week\'s results to plan today. That is the habit everything else builds on.',
        'استخدمتِ نتائج الأسبوع الماضي لتخطّطي لليوم. وهذه العادة هي الأساس لكل ما بعدها.',
      ),
      icon: '≡',
      when: 'always',
    },
  ],
  communityTopic: t('Grouping by results', 'التقسيم إلى مجموعات حسب النتائج'),
  communityExamples: [
    {
      who: t('Math teacher · Al Ain', 'معلمة رياضيات · العين'),
      text: t(
        'I never call them "high" and "low" groups. They have colours, and I move two students every lesson.',
        'لا أسمّيها أبدًا مجموعات «قوية» و«ضعيفة». لكل مجموعة لون، وأنقل طالبين في كل درس.',
      ),
    },
    {
      who: t('Grade 5 teacher · Dubai', 'معلم الصف الخامس · دبي'),
      text: t(
        'Blank answers and wrong answers are different problems. I check which one before I regroup.',
        'الإجابة الفارغة والإجابة الخاطئة مشكلتان مختلفتان. أتحقّق من أيهما قبل أن أعيد التقسيم.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a4.hamdanSeen',
      text: t(
        'You looked past a score today. Downstairs in Grade 4, Ms. Mariam\'s Arabic reading class has three reading levels in one room, and one girl hiding something no score has caught.',
        'نظرتِ اليوم إلى ما وراء الدرجة. وفي الطابق السفلي، في حصة القراءة العربية للصف الرابع، ثلاثة مستويات قراءة في غرفة واحدة، وطفلة تخفي شيئًا لم تكشفه أي درجة.',
      ),
    },
    {
      text: t(
        'Downstairs in Grade 4, Ms. Mariam\'s Arabic reading class has three reading levels in one room. One girl reads aloud beautifully. Or seems to.',
        'وفي الطابق السفلي، في حصة القراءة العربية للصف الرابع، ثلاثة مستويات قراءة في غرفة واحدة. وطفلة تقرأ بصوت جميل. أو هكذا يبدو.',
      ),
    },
  ],
};
