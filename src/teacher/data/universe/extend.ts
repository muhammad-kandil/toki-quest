/**
 * Extend & Assess scenarios E01–E05 (late-lesson pool). E01 and E05 are
 * reconvergence nodes reachable from every path.
 */
import { T, card, fx, uch, uout, scenario, type UScenario } from './kit';

/* ================================================================ E01 (reconverge) */
export const E01: UScenario = scenario({
  code: 'E01', kind: 'scenario', phase: 'extend', reconverge: true, requires: { notVisited: ['E01'] },
  title: T(['Exit With Evidence', 'الخروج بالأدلة']),
  takeaway: T(['End with a short check aligned to today\'s intention, answered alone.', 'اختم بتحقّق قصير يطابق هدف اليوم، يجيب عنه كل طالب بمفرده.']),
  discovers: ['exit-ticket'],
  events: [
    {
      id: 'ticket', kind: 'new-event', on: 'board', interaction: 'match',
      line: T(['Five minutes before the bell.', 'خمس دقائق قبل الجرس.']),
      ask: T(['Match each possible question to what it would actually check.', 'طابقي كل سؤال محتمل مع ما سيتحقّق منه فعلًا.']),
      task: {
        cards: [
          card('q1', ['Question', 'سؤال'], ['"4 for 10 dirhams or 6 for 14: which is better? Show how."', '«٤ بـ١٠ دراهم أم ٦ بـ١٤: أيهما أوفر؟ وضّح كيف.»']),
          card('q2', ['Question', 'سؤال'], ['"What is 3 × 4?"', '«كم يساوي ٣ × ٤؟»']),
          card('q3', ['Question', 'سؤال'], ['"Simplify 6:9."', '«بسّط ٦:٩.»']),
          card('q4', ['Question', 'سؤال'], ['"How well do you understand? 1 to 5."', '«ما مدى فهمك؟ من ١ إلى ٥.»']),
        ],
        targets: [
          card('today', ['Checks', 'يتحقّق من'], ['Today\'s learning intention', 'هدف التعلّم اليوم']),
          card('recall', ['Checks', 'يتحقّق من'], ['A recall fact only', 'معلومة محفوظة فقط']),
          card('prior', ['Checks', 'يتحقّق من'], ['Yesterday\'s prerequisite', 'متطلّب الأمس']),
          card('feeling', ['Checks', 'يتحقّق من'], ['Confidence, not learning', 'الثقة، لا التعلّم']),
        ],
        answer: { q1: 'today', q2: 'recall', q3: 'prior', q4: 'feeling' },
        note: T(['Only the first question checks today\'s intention. The others are useful, but they answer different questions.', 'السؤال الأول وحده يتحقّق من هدف اليوم. والأسئلة الأخرى مفيدة، لكنها تجيب عن أسئلة مختلفة.']),
      },
      choices: [
        uch(['Two aligned questions, answered alone', 'سؤالان مطابقان للهدف، يُجاب عنهما فرديًا'], ['Exit Ticket', 'بطاقة الخروج'], 'e1Aligned'),
        uch(['"Any questions?"', '«هل من أسئلة؟»'], ['Ask the class', 'سؤال الصف'], 'e1Questions', { minutes: 0 }),
        uch(['A long quiz on the whole unit', 'اختبار قصير طويل عن الوحدة كلها'], ['Big quiz', 'اختبار شامل'], 'e1Quiz', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('e1Aligned', 'good', ['Twenty-four pieces of evidence', 'أربعة وعشرون دليلًا'], ['In three minutes you know who can find the better deal, and who can\'t yet, and why.', 'في ثلاث دقائق تعرفين من يستطيع إيجاد العرض الأوفر، ومن لا يستطيع بعد، ولماذا.'], [], { xp: 30, discover: 'exit-ticket', setFlag: 'u.evidence' }),
    uout('e1Questions', 'mixed', ['Silence', 'صمت'], ['Nobody asks. It doesn\'t mean nobody has a question.', 'لا أحد يسأل. وهذا لا يعني أن لا أحد لديه سؤال.'], [], { xp: 30 }),
    uout('e1Quiz', 'mixed', ['Lots of answers, little focus', 'إجابات كثيرة، وتركيز قليل'], ['Twelve questions. Half the class runs out of time before the one that matters.', 'اثنا عشر سؤالًا. ونصف الصف ينفد وقته قبل السؤال المهم.'], [], { xp: 30 }),
  ],
});

/* ================================================================ E02 */
export const E02: UScenario = scenario({
  code: 'E02', kind: 'scenario', phase: 'extend', cooldown: 3, requires: { notVisited: ['E02'] },
  title: T(['Show What You Learned', 'أظهر ما تعلّمته']),
  takeaway: T(['Completion is not demonstration: ask students to show what they can now do.', 'الإنجاز ليس إظهارًا للتعلّم: اطلب من الطلاب أن يُظهروا ما يستطيعونه الآن.']),
  discovers: ['show-my-learning'],
  events: [
    {
      id: 'show', kind: 'new-event', on: 'sara', interaction: 'compare',
      line: T(['Two pages handed in.', 'صفحتان سُلّمتا.']),
      ask: T(['Reveal both and compare: which shows more learning?', 'اكشفي الصفحتين وقارني: أيهما تُظهر تعلّمًا أكثر؟']),
      task: {
        cards: [
          card('pageA', ['Page A', 'الصفحة أ'], ['All ten questions done. Three match the board example exactly, digit for digit.', 'الأسئلة العشرة كلها محلولة. وثلاثة منها تطابق مثال السبورة رقمًا برقم.']),
          card('pageB', ['Page B', 'الصفحة ب'], ['Four questions, each with a small drawing and a "because".', 'أربعة أسئلة، ولكل منها رسم صغير و«لأن».']),
        ],
        note: T(['Page A shows completion; Page B shows reasoning you can build on. Neither is a grade.', 'الصفحة أ تُظهر الإنجاز، والصفحة ب تُظهر تفكيرًا يمكن البناء عليه. ولا أيٌّ منهما درجة.']),
      },
      choices: [
        uch(['"Show me one thing you can do now that you couldn\'t this morning"', '«أرني شيئًا واحدًا تستطيعه الآن ولم تكن تستطيعه هذا الصباح»'], ['Show My Learning', 'أظهر تعلّمي'], 'e2Show'),
        uch(['Count completed questions', 'عُدّي الأسئلة المحلولة'], ['Completion', 'الإنجاز'], 'e2Count', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('e2Show', 'good', ['Learning, shown', 'التعلّم، مُظهَرًا'], ['Omar draws two shops and explains the better deal. Sara writes "same multiplier" and proves it. Neither is a page count.', 'يرسم عمر محلّين ويشرح العرض الأوفر. وتكتب سارة «المضاعف نفسه» وتُثبته. ولا أيٌّ منهما عدد صفحات.'], [fx('omar', 0, 1), fx('sara', 0, 1)], { xp: 30, discover: 'show-my-learning', setFlag: 'u.evidence', studentDelta: [{ id: 'omar', key: 'confidence', delta: 1 }] }),
    uout('e2Count', 'mixed', ['Ten out of ten, on paper', 'عشرة من عشرة، على الورق'], ['Page A wins. Three of its answers were copied.', 'الصفحة أ تفوز. وثلاث من إجاباتها منسوخة.'], [], { xp: 30 }),
  ],
});

/* ================================================================ E03 */
export const E03: UScenario = scenario({
  code: 'E03', kind: 'scenario', phase: 'extend', cooldown: 3, requires: { notVisited: ['E03'] },
  title: T(['Ready for the Exam', 'مستعدون للاختبار']),
  takeaway: T(['Read assessment evidence by topic before you plan revision.', 'اقرأ أدلّة التقييم حسب الموضوع قبل أن تخطّط للمراجعة.']),
  discovers: ['exam-prep'],
  events: [
    {
      id: 'exam', kind: 'new-event', on: 'laptop', interaction: 'pattern',
      line: T(['The unit test is next week.', 'اختبار الوحدة الأسبوع القادم.']),
      ask: T(['Tap the patterns in the practice assessment before you plan revision.', 'اضغطي على الأنماط في تقييم التدريب قبل أن تخطّطي للمراجعة.']),
      task: {
        cards: [
          card('t1', ['Ratios', 'النسب'], ['Strong across the class.', 'قوية لدى الصف كله.']),
          card('t2', ['Unit rates', 'معدّل الوحدة'], ['Mostly strong; three students stuck on decimals.', 'قوي في معظمه؛ ثلاثة طلاب متوقّفون عند الكسور العشرية.']),
          card('t3', ['Percentages', 'النسب المئوية'], ['Weak for most of the class.', 'ضعيفة لدى معظم الصف.']),
          card('t4', ['Word problems', 'المسائل الكلامية'], ['Slower, but right when finished.', 'أبطأ، لكنها صحيحة حين تُنجز.']),
        ],
        patterns: [
          { id: 'strong', label: T(['Secure', 'متمكّن']), cards: ['t1', 't4'] },
          { id: 'few', label: T(['A few students', 'عدد قليل من الطلاب']), cards: ['t2'] },
          { id: 'class', label: T(['Whole-class gap', 'فجوة لدى الصف كله']), cards: ['t3'] },
        ],
        note: T(['One whole-class gap (percentages), one small-group gap (decimals), the rest secure.', 'فجوة واحدة لدى الصف كله (النسب المئوية)، وفجوة لدى مجموعة صغيرة (الكسور العشرية)، والباقي متمكّن.']),
      },
      choices: [
        uch(['Revise percentages with everyone, decimals with the three', 'راجعي النسب المئوية مع الجميع، والكسور العشرية مع الثلاثة'], ['Exam Prep Assessment', 'تقييم الاستعداد للاختبار'], 'e3Target'),
        uch(['Revise the whole unit evenly', 'راجعي الوحدة كلها بالتساوي'], ['Revise all', 'مراجعة شاملة'], 'e3All', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('e3Target', 'good', ['Revision where the evidence points', 'المراجعة حيث تشير الأدلة'], ['The week goes on percentages; three students get a decimals catch-up. Ratios get a daily warm-up.', 'يُخصَّص الأسبوع للنسب المئوية، ويحصل ثلاثة طلاب على تعويض في الكسور العشرية، وللنسب تمهيد يومي.'], [], { xp: 30, discover: 'exam-prep', setFlag: 'u.usedEvidence' }),
    uout('e3All', 'mixed', ['Everything, a little', 'كل شيء، قليلًا'], ['Each topic gets a day. Percentages get the same day as ratios.', 'لكل موضوع يوم. والنسب المئوية تأخذ اليوم نفسه الذي تأخذه النسب.'], [], { xp: 30, discover: 'exam-prep' }),
  ],
});

/* ================================================================ E04 */
export const E04: UScenario = scenario({
  code: 'E04', kind: 'scenario', phase: 'extend', cooldown: 3, requires: { notVisited: ['E04'] },
  title: T(['The Next Best Step', 'الخطوة التالية الأنسب']),
  takeaway: T(['Route each learner to readiness, reinforcement or enrichment from what they showed today.', 'وجّه كل متعلّم إلى الاستعداد أو التعزيز أو الإثراء بناءً على ما أظهره اليوم.']),
  discovers: ['pathways'],
  events: [
    {
      id: 'routes', kind: 'new-event', on: 'laptop', interaction: 'match',
      line: T(['What should each student do next?', 'ماذا يفعل كل طالب بعد ذلك؟']),
      ask: T(['Match each piece of evidence to the next step it calls for.', 'طابقي كل دليل مع الخطوة التالية التي يستدعيها.']),
      task: {
        cards: [
          card('ev1', ['Evidence', 'دليل'], ['Explained it and solved a new-context problem', 'شرحها وحلّ مسألة في سياق جديد']),
          card('ev2', ['Evidence', 'دليل'], ['Right with support, not yet on their own', 'يصيب مع الدعم، ولم يصل إلى الحل وحده بعد']),
          card('ev3', ['Evidence', 'دليل'], ['Stopped at a step from a previous lesson', 'توقّف عند خطوة من درس سابق']),
        ],
        targets: [
          card('enrich', ['Next step', 'الخطوة التالية'], ['Enrichment', 'الإثراء']),
          card('reinforce', ['Next step', 'الخطوة التالية'], ['Reinforcement', 'التعزيز']),
          card('ready', ['Next step', 'الخطوة التالية'], ['Readiness: the missing step first', 'الاستعداد: الخطوة الناقصة أولًا']),
        ],
        answer: { ev1: 'enrich', ev2: 'reinforce', ev3: 'ready' },
        note: T(['The route comes from what the student showed, not from who they usually are.', 'المسار يأتي مما أظهره الطالب، لا مما هو عليه عادة.']),
      },
      choices: [
        uch(['Route each student from today\'s evidence', 'وجّهي كل طالب بناءً على أدلّة اليوم'], ['Pathways', 'المسارات'], 'e4Route'),
        uch(['The same homework for everyone', 'الواجب نفسه للجميع'], ['Same for all', 'الشيء نفسه للجميع'], 'e4Same', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('e4Route', 'good', ['A next step for each', 'خطوة تالية لكل واحد'], ['Ahmed gets an enrichment route, Sara reinforcement, and the students who stopped at yesterday\'s step start there.', 'يحصل أحمد على مسار إثرائي، وسارة على التعزيز، ويبدأ الطلاب الذين توقّفوا عند خطوة الأمس من هناك.'], [fx('ahmed', 0, 1), fx('sara', 0, 1)], { xp: 30, discover: 'pathways', setFlag: 'u.usedEvidence', studentDelta: [{ id: 'ahmed', key: 'readiness', delta: 1 }] }),
    uout('e4Same', 'mixed', ['One step for all', 'خطوة واحدة للجميع'], ['Fair and simple. For a third of the class it repeats today; for another third it skips a step.', 'عادل وبسيط. لكنه يكرّر درس اليوم لثلث الصف، ويقفز خطوة لثلث آخر.'], [], { xp: 30 }),
  ],
});

/* ================================================================ E05 (reconverge) */
export const E05: UScenario = scenario({
  code: 'E05', kind: 'scenario', phase: 'extend', reconverge: true, requires: { notVisited: ['E05'] },
  title: T(['Tomorrow\'s Plan', 'خطة الغد']),
  takeaway: T(['Assemble tomorrow from today\'s evidence: the shared mistake, the small group, the stretch.', 'ابنِ الغد من أدلّة اليوم: الخطأ المشترك، والمجموعة الصغيرة، والإثراء.']),
  discovers: ['class-progress', 'assign'],
  events: [
    {
      id: 'plan', kind: 'new-event', on: 'laptop', interaction: 'plan',
      line: T(['The lesson is over. Tomorrow starts now.', 'انتهى الدرس. والغد يبدأ الآن.']),
      ask: T(['Place each evidence card in the part of tomorrow\'s plan it belongs to.', 'ضعي كل بطاقة دليل في الجزء المناسب من خطة الغد.']),
      task: {
        cards: [
          card('c1', ['Evidence', 'دليل'], ['Eleven students added instead of multiplying', 'أحد عشر طالبًا جمعوا بدل أن يضربوا']),
          card('c2', ['Evidence', 'دليل'], ['Sara: right with support, not yet alone', 'سارة: تصيب مع الدعم، ولم تصل وحدها بعد']),
          card('c3', ['Evidence', 'دليل'], ['Ahmed solved a new-context problem and explained it', 'أحمد حلّ مسألة في سياق جديد وشرحها']),
          card('c4', ['Evidence', 'دليل'], ['The room was noisy during group work', 'كان الصف صاخبًا أثناء العمل الجماعي']),
        ],
        targets: [
          card('opening', ['Plan', 'الخطة'], ['Tomorrow\'s opening', 'افتتاح الغد']),
          card('group', ['Plan', 'الخطة'], ['A small group with you', 'مجموعة صغيرة معكِ']),
          card('stretch', ['Plan', 'الخطة'], ['Extension', 'الإثراء']),
        ],
        answer: { opening: 'c1', group: 'c2', stretch: 'c3' },
        note: T(['Three cards are learning evidence and each has a place. The noise is worth noting, but it doesn\'t decide tomorrow\'s maths.', 'ثلاث بطاقات أدلّة تعلّم، ولكل منها مكان. أما الضجيج فيستحق التدوين، لكنه لا يقرّر رياضيات الغد.']),
      },
      choices: [
        uch(['Plan tomorrow from these cards', 'خطّطي للغد من هذه البطاقات'], ['Class Progress', 'تقدّم الصف'], 'e5Plan'),
        uch(['Assign tomorrow\'s tasks to each group tonight', 'كلّفي كل مجموعة بمهام الغد الليلة'], ['Assign', 'التكليف'], 'e5Assign'),
        uch(['Follow the scheme of work', 'اتبعي الخطة الدراسية'], ['Scheme of work', 'الخطة الدراسية'], 'e5Scheme', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('e5Plan', 'good', ['Tomorrow, from today', 'الغد، من اليوم'], ['Opening: the adding mistake. Small group: Sara and two others. Extension: Ahmed\'s sale problem. Written in five minutes, from evidence.', 'الافتتاح: خطأ الجمع. المجموعة الصغيرة: سارة واثنان آخران. الإثراء: مسألة التخفيضات لأحمد. كُتبت في خمس دقائق، من الأدلة.'], [], { xp: 30, discover: 'class-progress', setFlag: 'u.usedEvidence' }),
    uout('e5Assign', 'good', ['Ready before they arrive', 'جاهزة قبل وصولهم'], ['Each group\'s first task is waiting for them tomorrow, chosen from today\'s evidence.', 'المهمة الأولى لكل مجموعة تنتظرها غدًا، مختارة من أدلّة اليوم.'], [], { xp: 30, discover: 'assign', setFlag: 'u.usedEvidence' }),
    uout('e5Scheme', 'mixed', ['The next page', 'الصفحة التالية'], ['Tomorrow is lesson 6 of the unit, whatever today showed.', 'الغد هو الدرس السادس في الوحدة، مهما أظهر اليوم.'], [], { xp: 30 }),
  ],
});

export const EXTEND = [E01, E02, E03, E04, E05];
