/**
 * TEST FIXTURE (timed mode): the original demo adventure, kept so the
 * engine tests cover scheduled events, minutes and the bell.
 * Previously the DEV FIXTURE — used ONLY while src/teacher/data ADVENTURES is empty, so
 * the game is playable before content lands. Ported from the approved
 * demo (public/teacher-demo/). Resource names are placeholders.
 */
import { t } from '../../src/i18n/types';
import type { Adventure, AlefResource, Location } from '../../src/teacher/types';

export const FIXTURE_RESOURCES: AlefResource[] = [
  { id: 'worked', stage: 'facilitate', icon: '✎', placeholder: true,
    title: t('Worked example', 'مثال محلول'),
    what: t('A step-by-step model the student follows beside you, then tries alone.', 'نموذج خطوة بخطوة يتبعه الطالب بجانبك، ثم يحاول وحده.'),
    monday: t('Model one problem, then hand her the pen for the next.', 'احلّ مسألة واحدة أمامها، ثم أعطها القلم للمسألة التالية.') },
  { id: 'explain', stage: 'facilitate', icon: '?', placeholder: true,
    title: t('Explain-your-thinking prompt', 'سؤال «اشرح تفكيرك»'),
    what: t('Ask the student to talk through her answer before you correct anything. The mistake shows itself.', 'اطلب من الطالبة أن تشرح إجابتها قبل أن تصحّح شيئًا. سيظهر الخطأ من تلقاء نفسه.'),
    monday: t('Say "Show me how you got that" before "That’s wrong".', 'قل «أريني كيف وصلتِ إلى هذا» قبل «هذا خطأ».') },
  { id: 'stretch', stage: 'extend', icon: '↗', placeholder: true,
    title: t('Extension task', 'مهمة إثرائية'),
    what: t('A harder problem on the same idea, so finishing early leads to deeper work, not busywork.', 'مسألة أصعب على الفكرة نفسها، فيقود الانتهاء المبكر إلى عمل أعمق لا إلى إشغال.'),
    monday: t('Keep one "go further" problem ready for every lesson.', 'جهّز مسألة «تقدّم أكثر» واحدة لكل درس.') },
  { id: 'roles', stage: 'facilitate', icon: '◎', placeholder: true,
    title: t('Team roles', 'أدوار الفريق'),
    what: t('Every student at the table gets a job: explainer, checker, reporter. Nobody can sit out.', 'لكل طالب على الطاولة دور: شارح، مدقّق، مقرّر. لا أحد يبقى خارج العمل.'),
    monday: t('Give the quietest student the reporter role.', 'أعطِ الطالب الأهدأ دور المقرّر.') },
  { id: 'game', stage: 'launch', icon: '▶', placeholder: true,
    title: t('Launch game', 'لعبة الافتتاح'),
    what: t('A short game that pulls the whole class into the lesson question.', 'لعبة قصيرة تجذب الصف كله إلى سؤال الدرس.'),
    monday: t('Open with a 3-minute game, then ask "why?" about one answer.', 'افتتح بلعبة مدتها ٣ دقائق، ثم اسأل «لماذا؟» عن إجابة واحدة.') },
  { id: 'targeted', stage: 'extend', icon: '◆', placeholder: true,
    title: t('Targeted practice set', 'تدريب موجّه'),
    what: t('Practice chosen for the exact mistake the student made, not a generic worksheet.', 'تدريب يُختار للخطأ نفسه الذي وقع فيه الطالب، لا ورقة عمل عامة.'),
    monday: t('Group your exit-ticket mistakes, then pick one practice set per group.', 'صنّف أخطاء بطاقة الخروج، ثم اختر تدريبًا واحدًا لكل مجموعة.') },
  { id: 'reteach', stage: 'facilitate', icon: '↺', placeholder: true,
    title: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
    what: t('Pull the students who are stuck for five minutes while the rest keep working.', 'اجمع الطلاب المتعثّرين خمس دقائق بينما يواصل الباقون العمل.'),
    monday: t('Plan a 5-minute reteach table into every lesson.', 'خطّط لطاولة إعادة شرح مدتها ٥ دقائق في كل درس.') },
  { id: 'offline', stage: 'launch', icon: '▤', placeholder: true,
    title: t('Printed backup task', 'مهمة ورقية احتياطية'),
    what: t('The same task on paper, so the lesson keeps going when the tablets don’t.', 'المهمة نفسها على الورق، ليستمر الدرس حين تتوقف الأجهزة.'),
    monday: t('Print one copy of the main task per table, just in case.', 'اطبع نسخة من المهمة الرئيسية لكل طاولة، احتياطًا.') },
  { id: 'exit-ticket', stage: 'extend', icon: '✓', placeholder: true,
    title: t('Exit ticket', 'بطاقة الخروج'),
    what: t('Three quick questions at the bell show who can do it and who starts tomorrow with you.', 'ثلاثة أسئلة سريعة عند الجرس تُظهر من يستطيع الحل ومن يبدأ معك غدًا.'),
    monday: t('End with three questions; sort the answers into three piles before you leave.', 'اختمي بثلاثة أسئلة؛ وصنّفي الإجابات في ثلاث مجموعات قبل أن تغادري.') },
];

export const FIXTURE_LOCATIONS: Location[] = [
  { id: 'g5', kind: 'classroom', name: t('Grade 5 classroom', 'صف الخامس'), x: 30, y: 36 },
  { id: 'g6', kind: 'classroom', name: t('Grade 6 classroom', 'صف السادس'), x: 72, y: 30 },
  { id: 'staff', kind: 'staffroom', name: t('Staff room', 'غرفة المعلمين'), x: 74, y: 56 },
  { id: 'library', kind: 'library', name: t('Library', 'المكتبة'), x: 26, y: 62 },
  { id: 'board', kind: 'community', name: t('Community board', 'لوحة المجتمع'), x: 50, y: 48 },
  { id: 'office', kind: 'office', name: t('Principal’s office', 'مكتب المديرة'), x: 50, y: 18 },
  { id: 'yard', kind: 'yard', name: t('Yard', 'الساحة'), x: 46, y: 82 },
  { id: 'shop', kind: 'shop', name: t('Campus shop', 'متجر المدرسة'), x: 80, y: 78 },
];

const st = (student: string, understanding = 0, engagement = 0) => ({ student, understanding, engagement });

export const FIXTURE_ADVENTURES: Adventure[] = [
  {
    id: 'a1', number: 1,
    title: t('Different Needs, Same Classroom', 'احتياجات مختلفة، صف واحد'),
    meta: t('Grade 5 · Math', 'الصف الخامس · رياضيات'),
    location: 'g5',
    scene: 'teacher-demo/img/classroom.jpg',
    intro: [
      t('Ms. Mariam’s Grade 5 class. Today: adding fractions. Twenty-four students, forty minutes.', 'صف الخامس للأستاذة مريم. درس اليوم: جمع الكسور. أربعة وعشرون طالبًا، وأربعون دقيقة.'),
      t('One classroom. Different needs. And only so much time.', 'صف واحد. احتياجات مختلفة. ووقت محدود.'),
      t('You are Ms. Mariam. Tap a student to respond. There’s no single right path: every choice changes what happens next.', 'أنتِ الأستاذة مريم. انقري على طالب للاستجابة. لا يوجد طريق صحيح واحد: كل اختيار يغيّر ما يحدث بعده.'),
    ],
    introBubbles: [
      { student: 'ahmed', line: t('Miss, I’ve already finished!', 'أستاذة، لقد انتهيت!') },
      { student: 'sara', line: t('Miss, I still don’t understand.', 'أستاذة، ما زلت لا أفهم.') },
      { student: 'omar', line: t('Miss, what are we doing today?', 'أستاذة، ماذا سنفعل اليوم؟') },
    ],
    lessonMinutes: 40,
    students: [
      { id: 'sara', name: t('Sara', 'سارة'), x: 71, y: 52, understanding: 0, engagement: 2,
        idle: t('Sara is working.', 'سارة تعمل.'),
        peek: { text: t('Sara’s page: 1/4 + 2/4 = 3/8. Interesting…', 'ورقة سارة: ١/٤ + ٢/٤ = ٣/٨. لافت…'), setFlag: 'peekedSara' } },
      { id: 'ahmed', name: t('Ahmed', 'أحمد'), x: 57, y: 50, understanding: 3, engagement: 1, idle: t('Ahmed is working.', 'أحمد يعمل.') },
      { id: 'omar', name: t('Omar', 'عمر'), x: 21, y: 44, understanding: 1, engagement: 0, idle: t('Omar is at his table.', 'عمر على طاولته.') },
    ],
    objects: [
      { id: 'tablets', label: t('Tablets', 'الأجهزة'), icon: '▣', x: 88, y: 70, idle: t('Tablets are working. The task is on screen.', 'الأجهزة تعمل. المهمة على الشاشة.') },
      { id: 'plan', label: t('Lesson plan', 'خطة الدرس'), icon: '≡', x: 82, y: 30, idle: t('Plan: launch 5 min · practice 20 min · exit ticket 5 min.', 'الخطة: افتتاح ٥ دقائق · تدريب ٢٠ دقيقة · بطاقة خروج ٥ دقائق.') },
    ],
    events: [
      { id: 'sara', kind: 'needs-help', on: 'sara', line: t('“Miss, I still don’t understand.”', '«أستاذة، ما زلت لا أفهم.»'),
        ask: t('Sara is stuck on adding fractions. What do you do?', 'سارة متعثّرة في جمع الكسور. ماذا تفعلين؟'),
        choices: [
          { label: t('Need help', 'تحتاج مساعدة'), sub: t('Support', 'دعم'), minutes: 5, resource: 'worked', outcome: [{ ifFlag: 'peekedSara', outcome: 'misconception' }, { outcome: 'ready' }] },
          { label: t('See why', 'اكتشفي السبب'), sub: t('Explanation', 'تفسير'), minutes: 4, resource: 'explain', outcome: 'misconception' },
          { label: t('Move on', 'تابعي'), sub: t('Continue', 'متابعة'), minutes: 0, outcome: 'persists' },
        ] },
      { id: 'ahmed', kind: 'early-finisher', on: 'ahmed', line: t('“Miss, I’ve already finished!”', '«أستاذة، لقد انتهيت!»'),
        ask: t('Ahmed finished all eight problems in six minutes.', 'أنهى أحمد المسائل الثماني في ست دقائق.'),
        choices: [
          { label: t('Go further', 'تقدّم أكثر'), sub: t('Practice', 'تدريب'), minutes: 2, resource: 'stretch', outcome: 'ahmedDeep' },
          { label: t('Help a classmate', 'ساعد زميلًا'), sub: t('Teams', 'فرق'), minutes: 2, resource: 'roles', outcome: 'ahmedPeer' },
        ] },
      { id: 'omar', kind: 'low-participation', on: 'omar', line: t('“Miss, what are we doing today?”', '«أستاذة، ماذا سنفعل اليوم؟»'),
        ask: t('Omar hasn’t written anything. His table is working around him.', 'لم يكتب عمر شيئًا. طاولته تعمل من حوله.'),
        choices: [
          { label: t('Give him a role', 'أعطيه دورًا'), sub: t('Teams', 'فرق'), minutes: 3, resource: 'roles', outcome: 'omarRole' },
          { label: t('Quick game', 'لعبة سريعة'), sub: t('Game', 'لعبة'), minutes: 4, resource: 'game', outcome: 'gameLoud' },
        ] },
      { id: 'tablet', kind: 'unexpected', on: 'tablets', line: t('The class tablets just lost connection.', 'انقطع اتصال أجهزة الصف للتو.'),
        ask: t('Half the class can’t see the task.', 'نصف الصف لا يرى المهمة.'),
        choices: [
          { label: t('Switch to paper', 'انتقلي إلى الورق'), sub: t('Printed backup', 'نسخة ورقية'), minutes: 2, resource: 'offline', outcome: 'paperOk' },
          { label: t('Wait for Wi-Fi', 'انتظري الشبكة'), sub: t('Pause the class', 'أوقفي الصف'), minutes: 7, outcome: 'waited' },
        ] },
      { id: 'enrich', kind: 'new-event', on: 'sara', line: t('“Can I try a harder one?”', '«هل أجرّب مسألة أصعب؟»'),
        ask: t('Sara got the last three right. Keep her growing.', 'أجابت سارة عن آخر ثلاث بشكل صحيح. ساعديها على النمو.'),
        choices: [
          { label: t('Harder problem', 'مسألة أصعب'), sub: t('Extension task', 'مهمة إثرائية'), minutes: 2, resource: 'stretch', outcome: 'saraStretch' },
          { label: t('Let her explain to Omar', 'دعيها تشرح لعمر'), sub: t('Teams', 'فرق'), minutes: 3, resource: 'roles', outcome: 'saraTeaches' },
        ] },
      { id: 'targeted', kind: 'new-event', on: 'sara', line: t('Sara writes: 1/4 + 2/4 = 3/8', 'تكتب سارة: ١/٤ + ٢/٤ = ٣/٨'),
        ask: t('She adds the bottoms too. Which practice fits her mistake?', 'تجمع المقامات أيضًا. أي تدريب يناسب خطأها؟'),
        choices: [
          { label: t('Fraction strips: same-size pieces', 'شرائط الكسور: قطع متساوية'), sub: t('Targeted practice set', 'تدريب موجّه'), minutes: 4, resource: 'targeted', outcome: 'fixed' },
          { label: t('Ten more mixed problems', 'عشر مسائل متنوعة أخرى'), sub: t('General worksheet', 'ورقة عمل عامة'), minutes: 5, outcome: 'repeated' },
          { label: t('Watch the video again', 'شاهدي الفيديو مجددًا'), sub: t('Replay', 'إعادة'), minutes: 4, outcome: 'repeated' },
        ] },
      { id: 'intervene', kind: 'needs-help', on: 'sara', line: t('Sara and two others are still stuck.', 'سارة واثنان آخران ما زالوا متعثّرين.'),
        ask: t('It’s getting late in the lesson. How do you catch them up?', 'الدرس يقترب من نهايته. كيف تلحقينهم؟'),
        choices: [
          { label: t('Pull them to a side table', 'اجمعيهم على طاولة جانبية'), sub: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'), minutes: 5, resource: 'reteach', outcome: 'caughtUp' },
          { label: t('Reteach the whole class', 'أعيدي الشرح للصف كله'), sub: t('Whole class', 'الصف كله'), minutes: 8, outcome: 'wholeReteach' },
        ] },
      { id: 'peerAnswers', kind: 'unexpected', on: 'ahmed', line: t('Ahmed is just telling Sara the answers.', 'أحمد يملي الإجابات على سارة.'),
        ask: t('Sara’s page is filling up, but is she learning?', 'ورقة سارة تمتلئ، لكن هل تتعلّم؟'),
        choices: [
          { label: t('"Ask her a question instead"', '«اسألها سؤالًا بدلًا من ذلك»'), sub: t('Coach the helper', 'وجّهي المساعد'), minutes: 2, resource: 'explain', outcome: 'goodPeer' },
          { label: t('Let it go', 'اتركي الأمر'), sub: t('Continue', 'متابعة'), minutes: 0, outcome: 'copied' },
        ] },
      { id: 'loud', kind: 'unexpected', on: 'omar', line: t('The game is loud. Two students are just guessing.', 'اللعبة صاخبة. طالبان يخمّنان فقط.'),
        ask: t('Omar is finally joining in, but some answers are guesses.', 'عمر يشارك أخيرًا، لكن بعض الإجابات تخمين.'),
        choices: [
          { label: t('Pause: "Why that answer?"', 'توقّفي: «لماذا هذه الإجابة؟»'), sub: t('Explain your thinking', 'اشرح تفكيرك'), minutes: 2, resource: 'explain', outcome: 'gameFocused' },
          { label: t('Keep playing', 'تابعوا اللعب'), sub: t('Continue', 'متابعة'), minutes: 3, outcome: 'gameGuess' },
        ] },
    ],
    outcomes: [
      { id: 'ready', tone: 'good', title: t('Sara is ready to progress', 'سارة مستعدة للتقدّم'), body: t('She follows the model, then solves the next one alone.', 'تتبع النموذج، ثم تحلّ المسألة التالية وحدها.'), effects: [st('sara', 2, 1)], next: { event: 'enrich', after: 4 } },
      { id: 'misconception', tone: 'insight', title: t('Misconception discovered', 'اكتُشف تصوّر خاطئ'), body: t('As she talks, you hear it: she adds the denominators too.', 'وهي تتكلم تسمعينه: إنها تجمع المقامات أيضًا.'), effects: [st('sara', 1, 1)], setFlag: 'mis', next: { event: 'targeted', after: 2 } },
      { id: 'persists', tone: 'mixed', title: t('Difficulty persists', 'الصعوبة مستمرة'), body: t('Sara goes quiet and copies her neighbour’s first line.', 'تصمت سارة وتنسخ السطر الأول من جارتها.'), effects: [st('sara', 0, -1)], next: { event: 'intervene', after: 9 } },
      { id: 'ahmedDeep', tone: 'good', title: t('Ahmed is thinking hard', 'أحمد يفكّر بعمق'), body: t('The extension problem has him sketching diagrams.', 'المسألة الإثرائية جعلته يرسم مخططات.'), effects: [st('ahmed', 0, 2)] },
      { id: 'ahmedPeer', tone: 'mixed', title: t('Ahmed moves next to Sara', 'ينتقل أحمد إلى جانب سارة'), body: t('He’s happy to help. A few minutes later, you look over…', 'يسعده أن يساعد. بعد دقائق تلقين نظرة…'), effects: [st('ahmed', 0, 1)], next: { event: 'peerAnswers', after: 3 } },
      { id: 'omarRole', tone: 'good', title: t('Omar is the reporter', 'عمر هو المقرّر'), body: t('He has to tell the class what his table found, so he starts listening.', 'عليه أن يخبر الصف بما وجدته طاولته، فبدأ يصغي.'), effects: [st('omar', 1, 3)], setFlag: 'omarIn' },
      { id: 'gameLoud', tone: 'mixed', title: t('The class lights up', 'الصف يتّقد حماسًا'), body: t('Everyone is in, Omar too. Then the noise rises.', 'الجميع يشارك، وعمر أيضًا. ثم يعلو الضجيج.'), effects: [st('omar', 0, 3), st('ahmed', 0, 1)], next: { event: 'loud', after: 2 } },
      { id: 'paperOk', tone: 'good', title: t('The lesson keeps going', 'الدرس مستمر'), body: t('Paper copies come out in a minute; nobody loses the thread.', 'تخرج النسخ الورقية في دقيقة؛ لا أحد يفقد الخيط.'), effects: [] },
      { id: 'waited', tone: 'poor', title: t('Seven minutes lost', 'ضاعت سبع دقائق'), body: t('The Wi-Fi comes back, but the class has drifted.', 'عادت الشبكة، لكن الصف قد تشتّت.'), effects: [st('omar', 0, -1), st('ahmed', 0, -1)] },
      { id: 'saraStretch', tone: 'good', title: t('Sara is stretching', 'سارة تتوسّع'), body: t('She tackles unlike denominators and explains her drawing.', 'تتعامل مع مقامات مختلفة وتشرح رسمها.'), effects: [st('sara', 1, 1)] },
      { id: 'saraTeaches', tone: 'good', title: t('Sara explains it to Omar', 'سارة تشرح لعمر'), body: t('Teaching it locks it in for her, and Omar gets it in kid language.', 'الشرح يثبّت الفكرة لديها، وعمر يفهمها بلغة الأطفال.'), effects: [st('sara', 1, 1), st('omar', 1, 1)], setFlag: 'omarIn' },
      { id: 'fixed', tone: 'good', title: t('The strips do it', 'الشرائط تنجح'), body: t('"Oh! The pieces stay quarters." She fixes her last three answers.', '«آه! القطع تبقى أرباعًا.» تصحّح إجاباتها الثلاث الأخيرة.'), effects: [st('sara', 2, 1)] },
      { id: 'repeated', tone: 'poor', title: t('Same mistake, ten more times', 'الخطأ نفسه، عشر مرات أخرى'), body: t('More practice of the wrong idea makes it stick harder.', 'مزيد من التدريب على الفكرة الخاطئة يرسّخها أكثر.'), effects: [st('sara', 0, -1)] },
      { id: 'caughtUp', tone: 'good', title: t('Three students catch up', 'ثلاثة طلاب يلحقون'), body: t('Five minutes at the side table, while everyone else keeps working.', 'خمس دقائق على الطاولة الجانبية، بينما يواصل الجميع العمل.'), effects: [st('sara', 2, 1)] },
      { id: 'wholeReteach', tone: 'mixed', title: t('Sara gets it; Ahmed checks out', 'سارة تفهم؛ أحمد ينسحب'), body: t('The reteach works for the three, but costs the rest of the class.', 'إعادة الشرح نجحت مع الثلاثة، لكنها كلّفت بقية الصف.'), effects: [st('sara', 2, 0), st('ahmed', 0, -2)] },
      { id: 'goodPeer', tone: 'good', title: t('Ahmed becomes a real helper', 'أحمد يصبح مساعدًا حقيقيًا'), body: t('"Why do the quarters stay quarters?" Now they’re both thinking.', '«لماذا تبقى الأرباع أرباعًا؟» الآن كلاهما يفكّر.'), effects: [st('sara', 2, 1), st('ahmed', 0, 1)] },
      { id: 'copied', tone: 'poor', title: t('Sara has answers, not understanding', 'لدى سارة إجابات لا فهم'), body: t('Her page is full. On the exit ticket, she’s stuck again.', 'ورقتها ممتلئة. وفي بطاقة الخروج تتعثّر من جديد.'), effects: [st('sara', 0, -1)] },
      { id: 'gameFocused', tone: 'good', title: t('From guessing to reasoning', 'من التخمين إلى التعليل'), body: t('One "why" turns the game into a real discussion. Omar explains his pick.', 'سؤال «لماذا» واحد يحوّل اللعبة إلى نقاش حقيقي. عمر يشرح اختياره.'), effects: [st('omar', 2, 0)], setFlag: 'omarIn' },
      { id: 'gameGuess', tone: 'mixed', title: t('Fun, but shallow', 'ممتعة لكنها سطحية'), body: t('Everyone played. Few could say why their answer was right.', 'الجميع لعب. قليلون استطاعوا قول لماذا كانت إجابتهم صحيحة.'), effects: [] },
    ],
    schedule: [{ event: 'sara', at: 3 }, { event: 'ahmed', at: 6 }, { event: 'omar', at: 9 }, { event: 'tablet', at: 22 }],
    badges: [
      { id: 'every-learner', icon: '★', when: 'all-good', title: t('Every Learner In', 'كل متعلّم حاضر'), why: t('All three students left the lesson able to do it.', 'غادر الطلاب الثلاثة الدرس وهم قادرون على الحل.') },
      { id: 'misconception-hunter', icon: '◆', when: { flag: 'mis' }, title: t('Misconception Hunter', 'صائدة التصوّرات الخاطئة'), why: t('You found the real mistake behind "I don’t understand".', 'وجدتِ الخطأ الحقيقي وراء «لا أفهم».') },
      { id: 'first-lesson', icon: '✎', when: 'always', title: t('First Lesson Logged', 'أول درس مسجّل'), why: t('You saw three different needs and acted on them.', 'رأيتِ ثلاثة احتياجات مختلفة وتصرّفتِ حيالها.') },
    ],
    communityTopic: t('Different needs, same classroom', 'احتياجات مختلفة، صف واحد'),
    communityExamples: [
      { who: t('Grade 5 teacher · Al Ain', 'معلمة صف خامس · العين'), text: t('I keep a "go further" card on every table. Early finishers grab it without asking.', 'أضع بطاقة «تقدّم أكثر» على كل طاولة. من ينهي مبكرًا يأخذها دون أن يسأل.') },
      { who: t('Math teacher · Abu Dhabi', 'معلم رياضيات · أبوظبي'), text: t('"Show me how you got that" found more mistakes this week than any quiz did.', '«أرني كيف وصلت إلى هذا» كشف أخطاء هذا الأسبوع أكثر من أي اختبار.') },
    ],
    teaser: [
      { ifFlag: 'omarIn', text: t('Omar spoke up today. Tomorrow, the quiet table across the room doesn’t.', 'تكلّم عمر اليوم. غدًا، الطاولة الهادئة في الجهة الأخرى لن تفعل.') },
      { text: t('Omar barely spoke today, and he isn’t the only one.', 'بالكاد تكلّم عمر اليوم، وليس الوحيد.') },
    ],
    unlocks: 'a2',
    takeaway: t('The same "I don’t understand" can hide three different needs: look before you help.', '«لا أفهم» نفسها قد تخفي ثلاثة احتياجات مختلفة: انظري قبل أن تساعدي.'),
  },
];
