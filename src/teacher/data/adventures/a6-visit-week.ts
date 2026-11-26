/**
 * Adventure 6 — Visit Week (Grade 5 Science, friction).
 * The vice principal and a guest observe. Temptation: re-teach yesterday's
 * rehearsed lesson (it always goes well) or teach the real next lesson.
 * Honest evidence (boards, exit tickets) beats a polished show.
 * Reads a2.nouraSpoke (Noura has spoken before).
 * Branch map: docs/content/TEACHER_CONTENT.md#a6
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';

export const A6: Adventure = {
  id: 'a6',
  number: 6,
  title: t('Visit Week', 'أسبوع الزيارة'),
  meta: t('Grade 5 · Science', 'الصف الخامس · العلوم'),
  location: 'grade5',
  scene: 'teacher/scenes/a6.jpg',
  takeaway: t(
    'An observer learns most from a real lesson: show what students actually understand, wrong answers included, and what you do about it.',
    'الزائر يتعلّم أكثر من الدرس الحقيقي: أظهر ما يفهمه الطلاب فعلًا، بما فيه الإجابات الخاطئة، وما تفعله حيالها.',
  ),
  intro: [
    t(
      'Visit week. Ms. Aisha, the vice principal, is bringing a guest from the education office to your Grade 5 science lesson.',
      'أسبوع الزيارات. الأستاذة عائشة، وكيلة المدرسة، ستحضر حصة العلوم في الصف الخامس، ومعها ضيف من مكتب التعليم.',
    ),
    t(
      'Yesterday\'s lesson on pushes and pulls went beautifully. Today\'s is the next step: friction. Half the class is still unsure about forces.',
      'درس الأمس عن الدفع والسحب نجح نجاحًا جميلًا. ودرس اليوم هو الخطوة التالية: الاحتكاك. ونصف الصف ما زال غير متأكد من مفهوم القوى.',
    ),
    t(
      'One lesson would look good. The other one is the lesson they need.',
      'أحد الدرسين سيبدو جيدًا. والآخر هو الدرس الذي يحتاجونه.',
    ),
  ],
  introBubbles: [
    { student: 'ahmed', line: t('Miss, are they here for us?', 'أستاذة، هل جاؤوا من أجلنا؟') },
    { student: 'khalid', line: t('Can we do the cars again?', 'هل نعيد تجربة السيارات؟') },
  ],
  lessonMinutes: 40,
  students: [
    {
      id: 'ahmed',
      name: t('Ahmed', 'أحمد'),
      x: 66,
      y: 46,
      understanding: 2,
      engagement: 3,
      idle: t('Ahmed is sitting up very straight today.', 'أحمد يجلس مستقيمًا جدًا اليوم.'),
      homeNote: t(
        'Both his parents are teachers. At home, finishing fast is what gets noticed.',
        'والداه معلّمان. وفي البيت، الإنهاء السريع هو ما يلفت الانتباه.',
      ),
    },
    {
      id: 'noura',
      name: t('Noura', 'نورة'),
      x: 30,
      y: 58,
      understanding: 2,
      engagement: 1,
      idle: t('Noura has drawn a neat table for the results, with empty boxes.', 'رسمت نورة جدولًا مرتّبًا للنتائج، وخاناته فارغة.'),
      homeNote: t(
        'The eldest of five. At home she talks all the time; she is quiet only at school.',
        'الكبرى بين خمسة إخوة. في البيت تتكلّم طوال الوقت، وهي هادئة في المدرسة فقط.',
      ),
    },
    {
      id: 'khalid',
      name: t('Khalid', 'خالد'),
      x: 46,
      y: 70,
      understanding: 1,
      engagement: 2,
      idle: t('Khalid is lining up toy cars at the top of the ramp.', 'خالد يصفّ السيارات الصغيرة في أعلى المنحدر.'),
      homeNote: t(
        'His family moved from another emirate this summer. New school, new friends, new everything.',
        'انتقلت عائلته من إمارة أخرى هذا الصيف. مدرسة جديدة، وأصدقاء جدد، وكل شيء جديد.',
      ),
      peek: {
        text: t(
          'Khalid\'s worksheet from yesterday: every answer right, in the exact words from the board.',
          'ورقة عمل خالد من الأمس: كل الإجابات صحيحة، بالكلمات نفسها التي كانت على السبورة.',
        ),
        setFlag: 'a6.peekedKhalid',
      },
    },
  ],
  objects: [
    {
      id: 'visitor',
      label: t('Visitors', 'الزائران'),
      icon: '◈',
      x: 84,
      y: 26,
      idle: t('Two chairs at the back, a clipboard, a polite smile.', 'كرسيان في آخر الصف، ولوح ملاحظات، وابتسامة مهذّبة.'),
    },
    {
      id: 'ramp',
      label: t('Ramp', 'المنحدر'),
      icon: '◢',
      x: 34,
      y: 78,
      idle: t('A wooden ramp, a towel, a strip of carpet and four toy cars.', 'منحدر خشبي، ومنشفة، وقطعة سجاد، وأربع سيارات صغيرة.'),
    },
    {
      id: 'board',
      label: t('Board', 'السبورة'),
      icon: '▭',
      x: 50,
      y: 14,
      idle: t('"Why do things slow down?"', '«لماذا تتباطأ الأشياء؟»'),
    },
  ],
  schedule: [
    { event: 'plan', at: 2 },
    { event: 'hands', at: 7 },
    { event: 'khalidResult', at: 13 },
    { event: 'leaving', at: 28 },
  ],
  events: [
    {
      id: 'plan',
      kind: 'new-event',
      on: 'visitor',
      line: t('The visitors sit down at the back.', 'يجلس الزائران في آخر الصف.'),
      ask: t(
        'Which lesson do you teach: yesterday\'s, rehearsed and safe, or today\'s, new and uncertain?',
        'أي درس ستقدّمين: درس الأمس، المجرَّب والآمن، أم درس اليوم، الجديد وغير المضمون؟',
      ),
      choices: [
        {
          label: t('Teach yesterday\'s lesson again', 'أعيدي درس الأمس'),
          sub: t('Show lesson', 'درس استعراضي'),
          minutes: 1,
          outcome: 'showLesson',
        },
        {
          label: t('Teach today\'s real lesson', 'قدّمي درس اليوم الحقيقي'),
          sub: t('Real lesson', 'الدرس الحقيقي'),
          minutes: 0,
          outcome: 'realLesson',
        },
        {
          label: t('Real lesson, and tell the visitors what to look for', 'الدرس الحقيقي، وأخبري الزائرين بما يلاحظانه'),
          sub: t('Success criteria', 'معايير النجاح'),
          minutes: 2,
          resource: 'success-criteria',
          outcome: 'sharedFocus',
        },
      ],
    },
    {
      id: 'hands',
      kind: 'low-participation',
      on: 'ahmed',
      line: t('Ahmed\'s hand is up for every question.', 'يد أحمد مرفوعة مع كل سؤال.'),
      ask: t(
        'With visitors watching, his right answers are very tempting.',
        'والزائران يراقبان، إجاباته الصحيحة مغرية جدًا.',
      ),
      choices: [
        {
          label: t('Take Ahmed\'s answer', 'خذي إجابة أحمد'),
          sub: t('Volunteers', 'المتطوّعون'),
          minutes: 1,
          outcome: 'ahmedShow',
        },
        {
          label: t('Everyone writes it on a board', 'الجميع يكتب على سبورته'),
          sub: t('Show-me boards', 'السبورات الصغيرة'),
          minutes: 3,
          resource: 'show-me-boards',
          outcome: 'boardsVisit',
        },
        {
          label: t('"Noura, the next one is yours"', '«نورة، السؤال القادم لكِ»'),
          sub: t('Warned call', 'نداء مع تنبيه'),
          minutes: 2,
          resource: 'warned-call',
          outcome: [{ ifFlag: 'a2.nouraSpoke', outcome: 'nouraAgain' }, { outcome: 'nouraFirst' }],
        },
      ],
    },
    {
      id: 'khalidResult',
      kind: 'needs-help',
      on: 'khalid',
      line: t('"Miss, the car went further on the towel!"', '«أستاذة، السيارة قطعت مسافة أطول على المنشفة!»'),
      ask: t(
        'That is the opposite of what should happen. He pushed it harder on the towel. The guest is writing.',
        'هذا عكس ما يُفترض أن يحدث. لقد دفعها بقوة أكبر على المنشفة. والضيف يكتب.',
      ),
      choices: [
        {
          label: t('"Interesting. Why might that be?"', '«مثير للاهتمام. لماذا برأيك؟»'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 4,
          resource: 'explain-thinking',
          outcome: 'fairTest',
        },
        {
          label: t('Tell him the right result', 'أخبريه بالنتيجة الصحيحة'),
          sub: t('Correct it', 'تصحيح'),
          minutes: 1,
          outcome: 'rightAnswer',
        },
        {
          label: t('Move to the next group\'s result', 'انتقلي إلى نتيجة المجموعة التالية'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'skipped',
        },
      ],
    },
    {
      id: 'leaving',
      kind: 'unexpected',
      on: 'visitor',
      line: t('"We have to go in five minutes. What did they learn today?"', '«علينا أن نغادر بعد خمس دقائق. ماذا تعلّموا اليوم؟»'),
      ask: t(
        'The guest is standing, clipboard closed. The bell is twelve minutes away.',
        'الضيف واقف، ولوح ملاحظاته مغلق. وبقيت اثنتا عشرة دقيقة على الجرس.',
      ),
      choices: [
        {
          label: t('Run a two-question exit ticket now', 'بطاقة خروج من سؤالين الآن'),
          sub: t('Exit ticket', 'بطاقة الخروج'),
          minutes: 3,
          resource: 'exit-ticket',
          outcome: [{ ifFlag: 'a6.real', outcome: 'evidenceShown' }, { outcome: 'ticketsTell' }],
        },
        {
          label: t('Tell them what you planned', 'أخبريهما بما خطّطتِ له'),
          sub: t('Explain the plan', 'شرح الخطة'),
          minutes: 1,
          outcome: 'planTalk',
        },
      ],
    },
    /* ---- follow-ups ---- */
    {
      id: 'guestAsks',
      kind: 'unexpected',
      on: 'khalid',
      line: t('The guest leans over: "Why did the car slow down?"', 'ينحني الضيف ويسأل: «لماذا تباطأت السيارة؟»'),
      ask: t(
        'Khalid knew yesterday\'s answers by heart. This is the same idea, asked a new way. He freezes.',
        'كان خالد يحفظ إجابات الأمس عن ظهر قلب. وهذه الفكرة نفسها بسؤال جديد. فيتجمّد.',
      ),
      choices: [
        {
          label: t('Help him: "What did the towel do?"', 'ساعديه: «ماذا فعلت المنشفة؟»'),
          sub: t('Prompt', 'تلميح'),
          minutes: 2,
          outcome: [{ ifFlag: 'a6.peekedKhalid', outcome: 'honest' }, { outcome: 'rescue' }],
        },
        {
          label: t('Tell the guest: "We did this yesterday"', 'أخبري الضيف: «قدّمنا هذا الدرس أمس»'),
          sub: t('Be honest', 'الصراحة'),
          minutes: 1,
          outcome: 'honest',
        },
      ],
    },
    {
      id: 'carsFly',
      kind: 'unexpected',
      on: 'ramp',
      line: t('Two cars fly off the end of the ramp. Laughter.', 'تطير سيارتان من نهاية المنحدر. وضحك.'),
      ask: t(
        'It is loud and a little chaotic. The guest writes something down.',
        'المكان صاخب وفوضوي قليلًا. والضيف يدوّن شيئًا.',
      ),
      choices: [
        {
          label: t('Stop: "What made that one fly?"', 'توقّفوا: «ما الذي جعل هذه تطير؟»'),
          sub: t('Explain your thinking', 'اشرح تفكيرك'),
          minutes: 2,
          resource: 'explain-thinking',
          outcome: 'chaosToQuestion',
        },
        {
          label: t('Restore order with jobs: pusher, measurer, recorder', 'أعيدي النظام بالمهام: من يدفع، من يقيس، من يكتب'),
          sub: t('Team roles', 'أدوار الفريق'),
          minutes: 3,
          resource: 'team-roles',
          outcome: 'jobsOrder',
        },
      ],
    },
    {
      id: 'nineWrong',
      kind: 'new-event',
      on: 'board',
      line: t('Nine boards say: "Heavy cars always go further."', 'تسع سبورات تقول: «السيارات الثقيلة تقطع دائمًا مسافة أطول.»'),
      ask: t(
        'Now you, and the visitors, can see it. Reteach now, or keep to the plan?',
        'الآن ترين ذلك أنتِ والزائران. هل تعيدين الشرح الآن، أم تلتزمين بالخطة؟',
      ),
      choices: [
        {
          label: t('Pull the nine to a side table', 'اجمعي التسعة على طاولة جانبية'),
          sub: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
          minutes: 5,
          resource: 'small-group-reteach',
          outcome: 'nineReteach',
        },
        {
          label: t('Keep to the plan; fix it tomorrow', 'التزمي بالخطة، وعالجيه غدًا'),
          sub: t('Continue', 'متابعة'),
          minutes: 0,
          outcome: 'planOn',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'showLesson',
      tone: 'mixed',
      title: t('It looks perfect', 'يبدو مثاليًا'),
      body: t(
        'Hands go up, answers are right, the timing is exact. The class has done this before, and some of them know it.',
        'الأيادي ترتفع، والإجابات صحيحة، والتوقيت دقيق. الصف قدّم هذا الدرس من قبل، وبعضهم يعرف ذلك.',
      ),
      effects: [
        { student: 'ahmed', engagement: -1 },
        { student: 'khalid', engagement: 1 },
      ],
      setFlag: 'a6.show',
      next: { event: 'guestAsks', after: 8 },
    },
    {
      id: 'realLesson',
      tone: 'insight',
      title: t('New, and a little messy', 'جديد، وفوضوي قليلًا'),
      body: t(
        'You start friction from where the class really is. It is less smooth than yesterday. It is also real.',
        'تبدئين درس الاحتكاك من حيث يقف الصف فعلًا. ليس سلسًا كدرس الأمس، لكنه حقيقي.',
      ),
      effects: [{ student: 'ahmed', engagement: 1 }],
      setFlag: 'a6.real',
      next: { event: 'carsFly', after: 8 },
    },
    {
      id: 'sharedFocus',
      tone: 'good',
      title: t('The visitors know what to look for', 'الزائران يعرفان ما يلاحظانه'),
      body: t(
        '"Today, look for students explaining why the car slows, in their own words." Now the guest watches the students, not you.',
        '«لاحظا اليوم الطلاب وهم يشرحون بكلماتهم لماذا تتباطأ السيارة.» الآن يراقب الضيف الطلاب، لا أنتِ.',
      ),
      effects: [{ student: 'noura', engagement: 1 }],
      setFlag: 'a6.real',
      next: { event: 'carsFly', after: 8 },
    },
    {
      id: 'ahmedShow',
      tone: 'mixed',
      title: t('Right, and only Ahmed', 'صحيحة، لكنها من أحمد وحده'),
      body: t(
        'His answer is perfect. The guest writes "teacher relies on volunteers". You know the rest of the class is less sure.',
        'إجابته مثالية. ويكتب الضيف «المعلمة تعتمد على المتطوّعين». وأنتِ تعرفين أن بقية الصف أقل ثقة.',
      ),
      effects: [{ student: 'noura', engagement: -1 }],
    },
    {
      id: 'boardsVisit',
      tone: 'insight',
      title: t('Twenty-four answers, not all right', 'أربع وعشرون إجابة، ليست كلها صحيحة'),
      body: t(
        'Boards up. Fifteen correct. Nine say heavy cars always go further. The guest stops writing and looks at you.',
        'السبورات مرفوعة. خمس عشرة صحيحة، وتسع تقول إن السيارات الثقيلة تقطع دائمًا مسافة أطول. يتوقّف الضيف عن الكتابة وينظر إليكِ.',
      ),
      effects: [
        { student: 'khalid', engagement: 1 },
        { student: 'noura', engagement: 1 },
      ],
      setFlag: 'a6.boards',
      next: { event: 'nineWrong', after: 1 },
    },
    {
      id: 'nouraAgain',
      tone: 'good',
      title: t('She has done this before', 'لقد فعلتها من قبل'),
      body: t(
        'Noura spoke in the dissolving lesson; this time she is ready in a minute. "The towel rubs the wheels." Clear, and in front of guests.',
        'تكلّمت نورة في درس الذوبان، وهذه المرة تستعد في دقيقة. «المنشفة تحتكّ بالعجلات.» واضحة، وأمام الضيوف.',
      ),
      effects: [{ student: 'noura', understanding: 1, engagement: 2 }],
      setFlag: 'a6.nouraSpoke',
    },
    {
      id: 'nouraFirst',
      tone: 'mixed',
      title: t('A whisper, but she says it', 'همسًا، لكنها تقولها'),
      body: t(
        'Two minutes is just enough. She answers so quietly the guest has to lean in. She says it, and it\'s right.',
        'دقيقتان تكفيان بالكاد. تجيب بصوت خافت جدًا حتى إن الضيف يميل ليسمع. لكنها قالتها، وهي صحيحة.',
      ),
      effects: [{ student: 'noura', understanding: 1, engagement: 1 }],
    },
    {
      id: 'fairTest',
      tone: 'good',
      title: t('The unfair test becomes the lesson', 'التجربة غير العادلة تصبح هي الدرس'),
      body: t(
        '"Did you push it the same?" He didn\'t. The class agrees a rule: same push, same start. It is the best five minutes of the lesson, and it wasn\'t planned.',
        '«هل دفعتها بالقوة نفسها؟» لم يفعل. يتفق الصف على قاعدة: الدفعة نفسها ونقطة البداية نفسها. إنها أفضل خمس دقائق في الدرس، ولم تكن في الخطة.',
      ),
      effects: [
        { student: 'khalid', understanding: 2, engagement: 1 },
        { student: 'ahmed', understanding: 1 },
      ],
      setFlag: 'a6.fairTest',
    },
    {
      id: 'rightAnswer',
      tone: 'mixed',
      title: t('Quick, and Khalid lets it go', 'سريع، وخالد يتجاوز الأمر'),
      body: t(
        '"It should go less far on the towel." He writes it down. He still doesn\'t know why his result came out wrong.',
        '«يُفترض أن تقطع مسافة أقصر على المنشفة.» يكتبها. لكنه ما زال لا يعرف لماذا جاءت نتيجته خاطئة.',
      ),
      effects: [{ student: 'khalid', engagement: -1 }],
    },
    {
      id: 'skipped',
      tone: 'mixed',
      title: t('His result disappears', 'نتيجته تختفي'),
      body: t(
        'The next group\'s result is the expected one. Khalid crosses his out. The guest noticed.',
        'نتيجة المجموعة التالية هي المتوقعة. ويشطب خالد نتيجته. والضيف لاحظ.',
      ),
      effects: [{ student: 'khalid', engagement: -2 }],
    },
    {
      id: 'evidenceShown',
      tone: 'good',
      title: t('The tickets answer for you', 'البطاقات تجيب عنكِ'),
      body: t(
        'Two questions, two minutes. You hand the guest the pile: most explain friction in their own words, and four are not there yet. "And tomorrow?" "Tomorrow starts with those four."',
        'سؤالان في دقيقتين. تعطين الضيف الكومة: معظمهم يشرح الاحتكاك بكلماته، وأربعة لم يصلوا بعد. «وغدًا؟» «غدًا نبدأ بهؤلاء الأربعة.»',
      ),
      effects: [
        { student: 'noura', understanding: 1 },
        { student: 'khalid', understanding: 1 },
      ],
      setFlag: 'a6.evidence',
    },
    {
      id: 'ticketsTell',
      tone: 'insight',
      title: t('The tickets tell the truth', 'البطاقات تقول الحقيقة'),
      body: t(
        'They answer yesterday\'s questions well. On the one friction question, most are guessing. The guest reads it too. Now you both know what today was.',
        'يجيبون عن أسئلة الأمس جيدًا. أما سؤال الاحتكاك الوحيد، فمعظمهم يخمّن. ويقرؤه الضيف أيضًا. الآن تعرفان كلاكما حقيقة درس اليوم.',
      ),
      effects: [{ student: 'ahmed', engagement: 1 }],
    },
    {
      id: 'planTalk',
      tone: 'mixed',
      title: t('A good plan, described', 'خطة جيدة، موصوفة'),
      body: t(
        'You explain it well. The guest nods politely. They leave with your plan, and none of the students\' thinking.',
        'تشرحينها جيدًا. ويومئ الضيف بأدب. ويغادران ومعهما خطتكِ، دون شيء من تفكير الطلاب.',
      ),
      effects: [],
    },
    {
      id: 'rescue',
      tone: 'mixed',
      title: t('He gets there, with help', 'يصل، بمساعدة'),
      body: t(
        '"The towel… rubs?" With two prompts, he says it. The guest writes "heavily prompted".',
        '«المنشفة… تحتكّ؟» بعد تلميحين، يقولها. ويكتب الضيف «بتلميح كثير».',
      ),
      effects: [{ student: 'khalid', understanding: 1 }],
    },
    {
      id: 'honest',
      tone: 'insight',
      title: t('"We rehearsed this one"', '«تدرّبنا على هذا الدرس»'),
      body: t(
        'You say it plainly: this was yesterday\'s lesson, and Khalid had learned the words, not yet the idea. The guest puts the pen down. "That\'s the most useful thing I\'ve heard today."',
        'تقولينها بوضوح: هذا درس الأمس، وخالد حفظ الكلمات ولم يفهم الفكرة بعد. يضع الضيف قلمه. «هذا أنفع ما سمعته اليوم.»',
      ),
      effects: [{ student: 'khalid', engagement: 1 }],
      setFlag: 'a6.honest',
    },
    {
      id: 'chaosToQuestion',
      tone: 'good',
      title: t('The accident becomes the question', 'الحادثة تصبح هي السؤال'),
      body: t(
        '"The ramp was too steep and the end was smooth wood." The flying cars explain friction better than your slide did.',
        '«المنحدر كان شديد الميل، ونهايته خشب أملس.» السيارات الطائرة شرحت الاحتكاك أفضل من شريحة العرض.',
      ),
      effects: [
        { student: 'khalid', understanding: 1, engagement: 1 },
        { student: 'ahmed', understanding: 1 },
      ],
    },
    {
      id: 'jobsOrder',
      tone: 'good',
      title: t('Calm, and still curious', 'هدوء، وفضول باقٍ'),
      body: t(
        'Every table has a pusher, a measurer and a recorder. The noise drops to working noise. Nobody asks why the cars flew.',
        'لكل طاولة من يدفع ومن يقيس ومن يكتب. ينخفض الصوت إلى صوت عمل. ولا أحد يسأل لماذا طارت السيارات.',
      ),
      effects: [
        { student: 'noura', engagement: 1 },
        { student: 'khalid', engagement: 1 },
      ],
    },
    {
      id: 'nineReteach',
      tone: 'good',
      title: t('Reteaching, in front of guests', 'إعادة الشرح، أمام الضيوف'),
      body: t(
        'Two cars, same weight, towel and wood. The nine see it for themselves. The visitors watch you change the lesson because of what the boards showed.',
        'سيارتان بالوزن نفسه، على المنشفة والخشب. يرى التسعة الفرق بأعينهم. ويشاهد الزائران كيف غيّرتِ الدرس بسبب ما أظهرته السبورات.',
      ),
      effects: [
        { student: 'khalid', understanding: 2 },
        { student: 'ahmed', engagement: -1 },
      ],
      setFlag: 'a6.real',
    },
    {
      id: 'planOn',
      tone: 'mixed',
      title: t('On time, nine behind', 'في الموعد، وتسعة متأخرون'),
      body: t(
        'The lesson ends exactly on plan. The nine will carry their idea about heavy cars into tomorrow.',
        'ينتهي الدرس وفق الخطة تمامًا. وسيحمل التسعة فكرتهم عن السيارات الثقيلة إلى الغد.',
      ),
      effects: [{ student: 'khalid', understanding: -1 }],
    },
  ],
  badges: [
    {
      id: 'a6-real-learning',
      title: t('Real Lesson, Real Learning', 'درس حقيقي، وتعلّم حقيقي'),
      why: t(
        'Every student moved forward in the lesson the visitors saw, and it was the lesson they needed.',
        'تقدّم كل طالب في الدرس الذي شاهده الزائران، وكان الدرس الذي يحتاجونه.',
      ),
      icon: '★',
      when: 'all-good',
    },
    {
      id: 'a6-evidence',
      title: t('Evidence, Not a Show', 'دليل، لا استعراض'),
      why: t(
        'You showed the visitors what students had actually learned, gaps included.',
        'أريتِ الزائرين ما تعلّمه الطلاب فعلًا، بما في ذلك الفجوات.',
      ),
      icon: '⇥',
      when: { flag: 'a6.evidence' },
    },
    {
      id: 'a6-open-door',
      title: t('Opened the Door', 'فتحتِ الباب'),
      why: t(
        'You taught with someone watching. Every visit after this one is easier.',
        'درّستِ وهناك من يراقب. وكل زيارة بعد هذه ستكون أسهل.',
      ),
      icon: '◈',
      when: 'always',
    },
  ],
  communityTopic: t('Being observed', 'حين يزورنا أحد في الصف'),
  communityExamples: [
    {
      who: t('Science teacher · Abu Dhabi', 'معلمة علوم · أبوظبي'),
      text: t(
        'I tell my observer at the door: "Watch the third table, they\'re the ones I\'m worried about." It changes the whole conversation afterwards.',
        'أقول للزائر عند الباب: «راقب الطاولة الثالثة، هم من أقلق عليهم.» وهذا يغيّر النقاش بعد الحصة تمامًا.',
      ),
    },
    {
      who: t('Grade 5 teacher · Al Ain', 'معلم الصف الخامس · العين'),
      text: t(
        'My best observation feedback came from a lesson where half the exit tickets were wrong, and I showed them.',
        'أفضل تغذية راجعة حصلت عليها في زيارة كانت نصف بطاقات الخروج فيها خاطئة، وأنا من عرضها.',
      ),
    },
  ],
  teaser: [
    {
      ifFlag: 'a6.evidence',
      text: t(
        'The visitors left with real evidence. Next, Grade 6 meets ratios, the topic every Grade 6 teacher warns you about.',
        'غادر الزائران ومعهما دليل حقيقي. والدرس القادم: الصف السادس يبدأ النِّسب، الموضوع الذي يحذّرك منه كل معلم للصف السادس.',
      ),
    },
    {
      text: t(
        'Visit week is over. Next, Grade 6 meets ratios, the topic where whole classes hit a wall in the same minute.',
        'انتهى أسبوع الزيارات. والدرس القادم: الصف السادس يبدأ النِّسب، الموضوع الذي يصطدم فيه الصف كله بالجدار في الدقيقة نفسها.',
      ),
    },
  ],
  unlocks: 'a7',
};
