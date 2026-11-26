/**
 * DEV FIXTURE — a small classroom universe, used ONLY until
 * src/teacher/data/universe.ts (UNIVERSE) lands. Shape per
 * docs/product/GAME_PACKAGE.md: L01 hub, two scenarios per pool, R06, four
 * endings. One event of each interaction type so every component is
 * exercised (see engine/interactions.ts for the proposed `interaction` shape).
 */
import { t, type Text } from '../../i18n/types';
import type { ClassEvent, Outcome, Scenario, Student, SceneObject, Universe } from '../types';
import type { Interaction } from '../engine/interactions';

const SCENE = 'teacher-demo/img/classroom.jpg';
const P = (en: string, ar: string): Text => t(en, ar);

const STUDENTS: Student[] = [
  { id: 'ahmed', name: P('Ahmed', 'أحمد'), x: 57, y: 50, understanding: 2, engagement: 2, idle: P('Ahmed is flicking through his notebook.', 'أحمد يقلّب صفحات دفتره.') },
  { id: 'sara', name: P('Sara', 'سارة'), x: 71, y: 52, understanding: 1, engagement: 2, idle: P('Sara is rereading yesterday’s page.', 'سارة تعيد قراءة صفحة الأمس.') },
  { id: 'omar', name: P('Omar', 'عمر'), x: 21, y: 44, understanding: 1, engagement: 1, idle: P('Omar is looking out of the window.', 'عمر ينظر من النافذة.') },
];
const OBJECTS: SceneObject[] = [
  { id: 'board', label: P('Board', 'السبورة'), icon: '▭', x: 44, y: 18, idle: P('The board is ready for today.', 'السبورة جاهزة لليوم.') },
  { id: 'laptop', label: P('Alef laptop', 'حاسوب ألف'), icon: '▣', x: 86, y: 30, idle: P('The class view is open on the laptop.', 'عرض الصف مفتوح على الحاسوب.') },
  { id: 'bookshelf', label: P('Bookshelf', 'رفّ الكتب'), icon: '❒', x: 10, y: 64, idle: P('Books, a globe and a box of fraction strips.', 'كتب وكرة أرضية وعلبة شرائط كسور.') },
];

type Ev = ClassEvent & { interaction?: Interaction };
const ev = (id: string, on: string, kind: ClassEvent['kind'], line: Text, ask: Text, choices: ClassEvent['choices'], interaction?: Interaction, extra: Partial<ClassEvent> = {}): Ev =>
  ({ id, on, kind, line, ask, choices, interaction, ...extra });
const ch = (label: Text, sub: Text, outcome: string): ClassEvent['choices'][number] => ({ label, sub, minutes: 1, outcome });
const out = (id: string, tone: Outcome['tone'], title: Text, body: Text, extra: Partial<Outcome> = {}): Outcome => ({ id, tone, title, body, effects: [], ...extra });

const sc = (code: string, phase: Scenario['phase'], kind: Scenario['kind'], title: Text, intro: Text, events: Ev[], outcomes: Outcome[], extra: Partial<Scenario> = {}): Scenario => ({
  id: code.toLowerCase(), code, kind, phase, title,
  meta: P(phase === 'launch' ? 'Launch' : phase === 'facilitate' ? 'Facilitate & Synthesize' : 'Extend & Assess', phase === 'launch' ? 'الافتتاح' : phase === 'facilitate' ? 'التيسير والتركيب' : 'التوسّع والتقييم'),
  location: 'grade7', scene: SCENE, intro: [intro], students: STUDENTS, objects: OBJECTS, events, outcomes, ...extra,
});

const L01 = sc('L01', 'launch', 'scenario', P('The First Five Minutes', 'الدقائق الخمس الأولى'),
  P('Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟'),
  [
    ev('l01-ahmed', 'ahmed', 'early-finisher', P('“Miss, I already know today’s topic!”', '«أستاذة، أعرف موضوع اليوم!»'),
      P('Look at his work before you decide.', 'انظري في عمله قبل أن تقرّري.'),
      [ch(P('Ask him to explain his answer', 'اطلبي منه شرح إجابته'), P('Evidence first', 'الدليل أولًا'), 'l01-ahmed-explain'),
        ch(P('Give him the harder task', 'أعطيه المهمة الأصعب'), P('Challenge', 'تحدٍّ'), 'l01-ahmed-hard')], { type: 'investigate' },
      { investigate: { clues: [{ id: 'answer', label: P('His answer', 'إجابته'), text: P('What did he write?', 'ماذا كتب؟') }, { id: 'explain', label: P('His explanation', 'شرحه'), text: P('How did he get it?', 'كيف وصل إليها؟') }],
        profiles: [
          { id: 'secure', weight: 60, setFlag: 'ahmed:secure', clues: { answer: P('Correct, with working shown.', 'صحيحة، مع خطوات الحل.'), explain: P('“I made the bottoms the same first.”', '«وحّدت المقامات أولًا.»') } },
          { id: 'shallow', weight: 40, setFlag: 'ahmed:shallow', clues: { answer: P('Correct, no working.', 'صحيحة، بلا خطوات.'), explain: P('“I just know it.”', '«أعرفها فقط.»') } },
        ] } }),
    ev('l01-sara', 'sara', 'needs-help', P('“Miss, I still don’t understand yesterday.”', '«أستاذة، ما زلت لا أفهم درس الأمس.»'),
      P('What is she missing?', 'ما الذي ينقصها؟'),
      [ch(P('Look at her page together', 'انظرا في ورقتها معًا'), P('Diagnose', 'تشخيص'), 'l01-sara-look'), ch(P('Come back to her later', 'عودي إليها لاحقًا'), P('Not now', 'ليس الآن'), 'l01-sara-later')]),
    ev('l01-omar', 'omar', 'low-participation', P('“Miss, what are we doing today?”', '«أستاذة، ماذا سنفعل اليوم؟»'),
      P('His page is empty.', 'ورقته فارغة.'),
      [ch(P('Share the learning intention', 'شاركي هدف التعلّم'), P('Purpose', 'الهدف'), 'l01-omar-goal'), ch(P('Give him a minute', 'امنحيه دقيقة'), P('Wait', 'انتظار'), 'l01-omar-wait')]),
  ],
  [
    out('l01-ahmed-explain', 'insight', P('Evidence, not just an answer', 'دليل، لا مجرد إجابة'), P('Now you know whether he is ready to go further.', 'الآن تعرفين إن كان مستعدًا للتقدّم.'), { xp: 30, setFlag: 'evidenceGathered', effects: [{ student: 'ahmed', understanding: 1 }] }),
    out('l01-ahmed-hard', 'mixed', P('He starts, unsure', 'يبدأ، غير متأكد'), P('The task is harder than he thought.', 'المهمة أصعب مما ظن.'), { xp: 30 }),
    out('l01-sara-look', 'insight', P('A missing step', 'خطوة ناقصة'), P('She never made the bottoms the same.', 'لم تُوحّد المقامات أبدًا.'), { xp: 30, setFlag: 'saraDiagnosed' }),
    out('l01-sara-later', 'mixed', P('Sara waits', 'سارة تنتظر'), P('Yesterday’s gap comes with her.', 'فجوة الأمس ترافقها.'), { xp: 30, setFlag: 'saraWaiting' }),
    out('l01-omar-goal', 'good', P('Now he knows the goal', 'الآن يعرف الهدف'), P('He writes a title and starts.', 'يكتب عنوانًا ويبدأ.'), { xp: 30, discover: 'present-mode', effects: [{ student: 'omar', engagement: 1 }] }),
    out('l01-omar-wait', 'mixed', P('Still waiting', 'ما زال ينتظر'), P('A minute passes.', 'تمرّ دقيقة.'), { xp: 30 }),
  ], { cooldown: 0 });

const L02 = sc('L02', 'launch', 'scenario', P('What Do We Know?', 'ماذا نعرف؟'), P('Find out what the class already knows.', 'اكتشفي ما يعرفه الصف.'),
  [ev('l02-board', 'board', 'new-event', P('Two answers on the board', 'إجابتان على السبورة'), P('Compare them before you choose how to start.', 'قارني بينهما قبل أن تختاري البداية.'),
    [ch(P('Put the learning intention up', 'اعرضي هدف التعلّم'), P('Present Mode', 'وضع العرض'), 'l02-present'), ch(P('Ask the class which is right', 'اسألي الصف أيهما صحيح'), P('Discussion', 'نقاش'), 'l02-discuss')],
    { type: 'compare', items: [
      { id: 'a', label: P('Answer A', 'الإجابة أ'), text: P('1/4 + 1/4 = 2/8', '١/٤ + ١/٤ = ٢/٨') },
      { id: 'b', label: P('Answer B', 'الإجابة ب'), text: P('1/4 + 1/4 = 2/4', '١/٤ + ١/٤ = ٢/٤') },
    ] })],
  [out('l02-present', 'good', P('Everyone sees the goal', 'الجميع يرى الهدف'), P('Three hands go up with questions.', 'ترتفع ثلاث أيادٍ بأسئلة.'), { xp: 30, discover: 'present-mode', setFlag: 'evidenceGathered' }),
    out('l02-discuss', 'insight', P('Starting points revealed', 'نقاط البداية تتكشّف'), P('Half the class adds the bottoms.', 'نصف الصف يجمع المقامات.'), { xp: 30, setFlag: 'evidenceGathered' })],
  { discovers: ['present-mode'], cooldown: 2, studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] });

const L04 = sc('L04', 'launch', 'scenario', P('Find the Missing Piece', 'ابحثي عن القطعة الناقصة'), P('Sara is stuck. Choose the least you need to give.', 'سارة متعثّرة. اختاري أقل ما تحتاجين إلى تقديمه.'),
  [ev('l04-sara', 'sara', 'needs-help', P('Sara’s page: 1/4 + 2/4 = 3/8', 'ورقة سارة: ١/٤ + ٢/٤ = ٣/٨'), P('Read the hints, then choose a support.', 'اقرئي التلميحات، ثم اختاري دعمًا.'),
    [ch(P('“Show me how you got that”', '«أريني كيف وصلتِ إلى ذلك»'), P('See Why', 'اعرف السبب'), 'l04-seewhy'), ch(P('Show her the rule again', 'أعيدي لها القاعدة'), P('Re-explain', 'إعادة الشرح'), 'l04-rule')],
    { type: 'hint', hints: [P('She adds the denominators too.', 'تجمع المقامات أيضًا.'), P('The pieces are the same size: quarters.', 'القطع بالحجم نفسه: أرباع.'), P('Asking her to explain lets her find it.', 'طلب الشرح منها يجعلها تجده بنفسها.')] })],
  [out('l04-seewhy', 'insight', P('She finds her own mistake', 'تجد خطأها بنفسها'), P('“The bottoms don’t add, do they?”', '«المقامات لا تُجمع، أليس كذلك؟»'), { xp: 30, discover: 'see-why', effects: [{ student: 'sara', understanding: 1 }] }),
    out('l04-rule', 'mixed', P('She copies the rule', 'تنسخ القاعدة'), P('The page is right; the idea is not yet hers.', 'الورقة صحيحة؛ لكن الفكرة ليست لها بعد.'), { xp: 30 })],
  { discovers: ['see-why'], opensNeeds: ['sara-gap'], studentDelta: [{ id: 'sara', key: 'confidence', delta: 1 }] });

const F02 = sc('F02', 'facilitate', 'scenario', P('Everyone Has a Voice', 'لكلٍّ صوت'), P('Groups are talking. Who is thinking?', 'المجموعات تتحدث. من يفكّر؟'),
  [ev('f02-omar', 'omar', 'low-participation', P('Omar’s table', 'طاولة عمر'), P('Match what you see to what it means.', 'طابقي ما ترينه مع ما يعنيه.'),
    [ch(P('Give each student a role', 'أعطي كل طالب دورًا'), P('Teams', 'الفرق'), 'f02-roles'), ch(P('Let them carry on', 'دعيهم يتابعون'), P('Wait', 'انتظار'), 'f02-wait')],
    { type: 'match', pairs: [
      { id: 'silent', evidence: P('Omar hasn’t spoken in five minutes.', 'لم يتكلم عمر منذ خمس دقائق.'), meaning: P('He has no way in yet.', 'لا مدخل له بعد.') },
      { id: 'answers', evidence: P('Ahmed gives all the answers.', 'أحمد يعطي كل الإجابات.'), meaning: P('Helping has become telling.', 'المساعدة صارت إملاءً.') },
      { id: 'notes', evidence: P('Sara writes everything down.', 'سارة تدوّن كل شيء.'), meaning: P('She is recording, not reasoning.', 'تسجّل ولا تعلّل.') },
    ] })],
  [out('f02-roles', 'good', P('Omar reports for his table', 'عمر يقدّم تقرير طاولته'), P('His voice moves the group.', 'صوته يحرّك المجموعة.'), { xp: 30, discover: 'teams', setFlag: 'peerVoice', effects: [{ student: 'omar', engagement: 2 }] }),
    out('f02-wait', 'mixed', P('The same voices', 'الأصوات نفسها'), P('Ahmed talks; the others copy.', 'أحمد يتكلم؛ والآخرون ينسخون.'), { xp: 30 })],
  { discovers: ['teams'], studentDelta: [{ id: 'omar', key: 'confidence', delta: 1 }] });

const F04 = sc('F04', 'facilitate', 'scenario', P('Help Without Giving It Away', 'ساعدي دون أن تعطي الإجابة'), P('Sort supports by how much they give away.', 'صنّفي أنواع الدعم حسب ما تكشفه.'),
  [ev('f04-laptop', 'laptop', 'new-event', P('Support options', 'خيارات الدعم'), P('Sort them, then choose for Sara.', 'صنّفيها، ثم اختاري لسارة.'),
    [ch(P('A question that points her back', 'سؤال يعيدها إلى خطوتها'), P('Need Help', 'أحتاج مساعدة'), 'f04-question'), ch(P('Show the worked answer', 'اعرضي الحل كاملًا'), P('Worked answer', 'حل كامل'), 'f04-answer')],
    { type: 'sort', buckets: [{ id: 'light', label: P('Keeps her thinking', 'يُبقيها تفكّر') }, { id: 'heavy', label: P('Does the thinking for her', 'يفكّر عنها') }], items: [
      { id: 'q', text: P('Ask: “What are the pieces?”', 'اسألي: «ما القطع؟»'), buckets: ['light'] },
      { id: 'strip', text: P('Hand her fraction strips', 'أعطيها شرائط الكسور'), buckets: ['light'] },
      { id: 'show', text: P('Write the answer for her', 'اكتبي الإجابة لها'), buckets: ['heavy'] },
      { id: 'step', text: P('Do the first step yourself', 'قومي بالخطوة الأولى بنفسك'), buckets: ['heavy', 'light'] },
    ] })],
  [out('f04-question', 'good', P('She gets there herself', 'تصل بنفسها'), P('One question, and she fixes the step.', 'سؤال واحد، وتصلح الخطوة.'), { xp: 30, discover: 'need-help', effects: [{ student: 'sara', understanding: 2 }] }),
    out('f04-answer', 'mixed', P('Right answer, borrowed', 'إجابة صحيحة، مستعارة'), P('Her page is right; the idea is still yours.', 'ورقتها صحيحة؛ لكن الفكرة ما زالت فكرتك.'), { xp: 30 })],
  { discovers: ['need-help'], closesNeeds: ['sara-gap'] });

const E01 = sc('E01', 'extend', 'scenario', P('Exit With Evidence', 'اخرجي بدليل'), P('The exit ticket answers are in.', 'وصلت إجابات بطاقة الخروج.'),
  [ev('e01-laptop', 'laptop', 'new-event', P('Exit ticket responses', 'إجابات بطاقة الخروج'), P('Tap every response that adds the denominators.', 'انقري على كل إجابة تجمع المقامات.'),
    [ch(P('Plan a five-minute regroup tomorrow', 'خطّطي لإعادة تجميع خمس دقائق غدًا'), P('Exit Ticket', 'بطاقة الخروج'), 'e01-plan'), ch(P('Move on; most got it', 'تابعي؛ معظمهم فهم'), P('Continue', 'متابعة'), 'e01-on')],
    { type: 'pattern', prompt: P('Which answers add the denominators?', 'أي الإجابات تجمع المقامات؟'), target: 'adds', cells: [
      { id: 'c1', label: P('Ahmed', 'أحمد'), text: P('2/4', '٢/٤'), tag: 'ok' },
      { id: 'c2', label: P('Sara', 'سارة'), text: P('2/8', '٢/٨'), tag: 'adds' },
      { id: 'c3', label: P('Omar', 'عمر'), text: P('2/4', '٢/٤'), tag: 'ok' },
      { id: 'c4', label: P('Laila', 'ليلى'), text: P('2/8', '٢/٨'), tag: 'adds' },
      { id: 'c5', label: P('Yousef', 'يوسف'), text: P('1/2', '١/٢'), tag: 'ok' },
      { id: 'c6', label: P('Mona', 'منى'), text: P('2/4', '٢/٤'), tag: 'ok' },
    ] })],
  [out('e01-plan', 'good', P('Evidence for tomorrow', 'دليل للغد'), P('Two students need the same five minutes.', 'طالبان يحتاجان الدقائق الخمس نفسها.'), { xp: 30, discover: 'exit-ticket', setFlag: 'evidenceGathered' }),
    out('e01-on', 'mixed', P('Moving on', 'المتابعة'), P('The two who added the bottoms come along anyway.', 'الاثنان اللذان جمعا المقامات يتابعان على أي حال.'), { xp: 30 })],
  { discovers: ['exit-ticket'], reconverge: true });

const E05 = sc('E05', 'extend', 'scenario', P('Tomorrow’s Plan', 'خطة الغد'), P('Turn today’s evidence into tomorrow’s first move.', 'حوّلي دليل اليوم إلى أول خطوة في الغد.'),
  [ev('e05-board', 'board', 'new-event', P('Tomorrow’s plan', 'خطة الغد'), P('Place one card in each part of the plan.', 'ضعي بطاقة في كل جزء من الخطة.'),
    [ch(P('Assign the plan to the class', 'كلّفي الصف بالخطة'), P('Assign', 'التكليف'), 'e05-assign')],
    { type: 'plan', slots: [{ id: 'open', label: P('Open with', 'ابدئي بـ') }, { id: 'group', label: P('Regroup', 'أعيدي التجميع') }, { id: 'stretch', label: P('Stretch', 'التوسّع') }], cards: [
      { id: 'recap', text: P('A two-question recap on equal pieces', 'مراجعة بسؤالين عن القطع المتساوية'), slots: ['open'] },
      { id: 'table', text: P('Sara and Laila at the side table', 'سارة وليلى على الطاولة الجانبية'), slots: ['group'] },
      { id: 'unlike', text: P('Unlike denominators for Ahmed', 'مقامات مختلفة لأحمد'), slots: ['stretch'] },
    ] })],
  [out('e05-assign', 'good', P('Evidence to action', 'من الدليل إلى الفعل'), P('Today’s exit tickets decide tomorrow’s first five minutes.', 'بطاقات خروج اليوم تحدّد الدقائق الخمس الأولى غدًا.'), { xp: 30, discover: 'assign', setFlag: 'evidenceUsed' })],
  { discovers: ['assign'], reconverge: true, requires: { anyFlags: ['evidenceGathered'] } });

const R06 = sc('R06', 'extend', 'random', P('Second Chance', 'فرصة ثانية'), P('Sara stays behind after the bell.', 'تبقى سارة بعد الجرس.'),
  [ev('r06-sara', 'sara', 'needs-help', P('“Can I try it again?”', '«هل أجرّبها مرة أخرى؟»'), P('Put her steps in order with her.', 'رتّبي خطواتها معها.'),
    [ch(P('Let her try one more', 'دعيها تجرّب واحدة أخرى'), P('Practice', 'التدريب'), 'r06-try')],
    { type: 'order', items: [
      { id: 'pieces', text: P('Check the pieces are the same size', 'تحقّقي أن القطع بالحجم نفسه') },
      { id: 'tops', text: P('Add the tops', 'اجمعي البسط') },
      { id: 'keep', text: P('Keep the bottom', 'أبقي المقام') },
      { id: 'check', text: P('Check with a drawing', 'تحقّقي برسمة') },
    ] })],
  [out('r06-try', 'good', P('She gets it on her own', 'تحلّها وحدها'), P('The gap from this morning is closed.', 'أُغلقت فجوة الصباح.'), { xp: 30, discover: 'practice', effects: [{ student: 'sara', understanding: 1, engagement: 1 }] })],
  { discovers: ['practice'], closesNeeds: ['sara-gap'], requires: { unresolved: ['sara-gap'] }, studentDelta: [{ id: 'sara', key: 'confidence', delta: 1 }] });

const F01 = sc('F01', 'facilitate', 'scenario', P('Make Thinking Visible', 'اجعلي التفكير مرئيًا'), P('Hear beyond the usual volunteers.', 'اسمعي ما بعد المتطوّعين المعتادين.'),
  [ev('f01-board', 'board', 'new-event', P('A question for everyone', 'سؤال للجميع'), P('How will you collect answers?', 'كيف ستجمعين الإجابات؟'),
    [ch(P('Everyone answers on their tablet', 'يجيب الجميع على أجهزتهم'), P('Live responses', 'إجابات مباشرة'), 'f01-live'), ch(P('Hands up', 'ارفعوا أيديكم'), P('Volunteers', 'متطوّعون'), 'f01-hands')])],
  [out('f01-live', 'good', P('Twenty-four answers', 'أربع وعشرون إجابة'), P('Omar’s is right — and he didn’t raise his hand.', 'إجابة عمر صحيحة — ولم يرفع يده.'), { xp: 30, setFlag: 'peerVoice', effects: [{ student: 'omar', engagement: 1 }] }),
    out('f01-hands', 'mixed', P('The usual three', 'الثلاثة المعتادون'), P('You hear from Ahmed again.', 'تسمعين من أحمد مرة أخرى.'), { xp: 30 })]);

const E03 = sc('E03', 'extend', 'scenario', P('Ready for the Exam', 'مستعدون للاختبار'), P('Practice test results are back.', 'نتائج الاختبار التجريبي وصلت.'),
  [ev('e03-laptop', 'laptop', 'new-event', P('Results by question', 'النتائج حسب السؤال'), P('What needs work?', 'ما الذي يحتاج إلى عمل؟'),
    [ch(P('Reteach question 4 only', 'أعيدي شرح السؤال ٤ فقط'), P('Targeted', 'موجّه'), 'e03-target'), ch(P('Review everything', 'راجعي كل شيء'), P('Whole review', 'مراجعة شاملة'), 'e03-all')])],
  [out('e03-target', 'good', P('Ten minutes, well aimed', 'عشر دقائق في مكانها'), P('Question 4 was the shared gap.', 'السؤال ٤ كان الفجوة المشتركة.'), { xp: 30, setFlag: 'evidenceGathered' }),
    out('e03-all', 'mixed', P('A long review', 'مراجعة طويلة'), P('Most of it they already knew.', 'معظمها كانوا يعرفونه.'), { xp: 30 })]);

export const UNIVERSE_FIXTURE: Universe = {
  version: 'fixture-1',
  opening: [
    { id: 'OPEN-01', picture: SCENE, narration: P('Morning. Ms. Mariam arrives early and opens the windows.', 'الصباح. تصل الأستاذة مريم مبكرًا وتفتح النوافذ.') },
    { id: 'OPEN-02', picture: SCENE, narration: P('The students come in: one confident, one quiet, one unsure.', 'يدخل الطلاب: واحد واثق، وواحد هادئ، وواحدة مترددة.') },
    { id: 'OPEN-03', picture: SCENE, who: 'ahmed', line: P('Miss, I already know today’s topic!', 'أستاذة، أعرف موضوع اليوم!') },
    { id: 'OPEN-04', picture: SCENE, narration: P('Five minutes before we begin. Where should I start?', 'خمس دقائق قبل أن نبدأ. من أين أبدأ؟') },
    { id: 'OPEN-05', picture: SCENE, narration: P('Tap a student or an object in the classroom.', 'انقري على طالب أو على شيء في الصف.') },
  ],
  entry: 'L01',
  scenarios: [L01, L02, L04, F01, F02, F04, E01, E03, E05, R06],
  pools: [
    { id: 'after-launch', entries: [{ code: 'L02', weight: 50 }, { code: 'L04', weight: 50 }] },
    { id: 'mid-lesson', entries: [{ code: 'F02', weight: 40 }, { code: 'F04', weight: 40 }, { code: 'F01', weight: 20 }] },
    { id: 'late-lesson', entries: [{ code: 'E01', weight: 40 }, { code: 'E05', weight: 35 }, { code: 'E03', weight: 20 }, { code: 'R06', weight: 5 }] },
  ],
  arc: [{ pool: 'after-launch', draws: 1 }, { pool: 'mid-lesson', draws: 1 }, { pool: 'late-lesson', draws: 2 }],
  endings: [
    { id: 'END-B', priority: 0, when: { unresolved: ['sara-gap'] }, title: P('The Unfinished Puzzle', 'الأحجية غير المكتملة'),
      narration: P('One need is still open. Your progress stays; tomorrow starts there.', 'ما زالت حاجة مفتوحة. تقدّمك محفوظ؛ والغد يبدأ من هناك.'),
      followUp: P('Next session can reopen Sara’s gap.', 'الجلسة القادمة قد تعيد فتح فجوة سارة.'), badge: { id: 'unfinished', title: P('Honest Ending', 'نهاية صادقة'), icon: '◔' } },
    { id: 'END-D', priority: 1, when: { flags: ['evidenceGathered', 'evidenceUsed'] }, title: P('Evidence to Action', 'من الدليل إلى الفعل'),
      narration: P('You gathered evidence and it changed what you did next.', 'جمعتِ الدليل فغيّر ما فعلتِه بعد ذلك.'), badge: { id: 'evidence-action', title: P('Evidence to Action', 'من الدليل إلى الفعل'), icon: '◆' } },
    { id: 'END-C', priority: 2, when: { flags: ['peerVoice'] }, title: P('An Unexpected Opportunity', 'فرصة غير متوقعة'),
      narration: P('A student’s voice moved the lesson in a way you hadn’t planned.', 'صوت طالب حرّك الدرس بطريقة لم تخططي لها.'), badge: { id: 'opportunity', title: P('Everyone Has a Voice', 'لكلٍّ صوت'), icon: '◎' } },
    { id: 'END-A', priority: 3, when: {}, title: P('Purposeful Launch', 'انطلاقة هادفة'),
      narration: P('You knew where they started and chose each next step on purpose.', 'عرفتِ من أين بدأوا واخترتِ كل خطوة بقصد.'), badge: { id: 'purposeful', title: P('Purposeful Launch', 'انطلاقة هادفة'), icon: '★' } },
  ],
  students: [
    { id: 'ahmed', name: P('Ahmed', 'أحمد'), start: { readiness: 2, confidence: 3, participation: 2, understanding: 2 } },
    { id: 'sara', name: P('Sara', 'سارة'), start: { readiness: 1, confidence: 1, participation: 2, understanding: 1 } },
    { id: 'omar', name: P('Omar', 'عمر'), start: { readiness: 1, confidence: 1, participation: 1, understanding: 1 } },
  ],
};
