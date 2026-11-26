/**
 * Launch scenarios: L01 (entry hub) and L02–L05 (after-launch pool).
 * Grade 7 · Math · yesterday equivalent ratios, today unit rates.
 */
import { T, ch, clue, card, fx, uout, scenario, uprofile, type UScenario } from './kit';

/* ================================================================ L01 */
export const L01: UScenario = scenario({
  code: 'L01',
  kind: 'scenario',
  phase: 'launch',
  title: T(['The First Five Minutes', 'الدقائق الخمس الأولى']),
  takeaway: T(['Find where each student is starting before you choose what to do.', 'اكتشف نقطة انطلاق كل طالب قبل أن تختار ما تفعله.']),
  intro: [T(['Tap a student or an object. You choose the order.', 'اضغطي على طالب أو شيء. أنتِ تختارين الترتيب.'])],
  discovers: ['assign', 'see-why', 'ai-helper', 'practice', 'teams', 'present-mode'],
  events: [
    {
      id: 'ahmed', kind: 'early-finisher', on: 'ahmed', interaction: 'investigate',
      line: T(['"Miss, I already know today\'s topic!"', '«أستاذة، أنا أعرف درس اليوم من قبل!»']),
      ask: T(['The Confidence Detective: three pieces of evidence before you decide.', 'محقّق الثقة: ثلاثة أدلة قبل أن تقرّري.']),
      investigate: {
        clues: [
          clue('answer', ['His answer', 'إجابته'], ['"6 juice boxes cost 12 dirhams. How much is one?"', '«٦ علب عصير ثمنها ١٢ درهمًا. كم ثمن العلبة الواحدة؟»']),
          clue('explain', ['His explanation', 'شرحه'], ['"How did you work it out?"', '«كيف توصّلت إلى ذلك؟»']),
          clue('apply', ['A new problem', 'مسألة جديدة'], ['"Which is better value: 5 for 12 dirhams or 3 for 7?"', '«أيهما أوفر: ٥ بـ١٢ درهمًا أم ٣ بـ٧؟»']),
        ],
        profiles: [
          uprofile('secure', 35, 'u.ahmed:secure', {
            answer: ['"2 dirhams." Correct, in seconds.', '«درهمان.» صحيحة، في ثوانٍ.'],
            explain: ['"You share the cost between the boxes: 12 divided by 6."', '«نقسم الثمن على العلب: ١٢ ÷ ٦.»'],
            apply: ['"2.40 each against 2.33 each, so 3 for 7 is better." Right, and he says why.', '«٢٫٤٠ للعلبة مقابل ٢٫٣٣، إذن ٣ بـ٧ أوفر.» صحيحة، ويقول السبب.'],
          }),
          uprofile('fragile', 35, 'u.ahmed:fragile', {
            answer: ['"2 dirhams." Correct.', '«درهمان.» صحيحة.'],
            explain: ['"You always divide the big number by the small number."', '«دائمًا نقسم العدد الكبير على الصغير.»'],
            apply: ['For "12 boxes for 6 dirhams" he writes "2 dirhams each". His rule gives the wrong answer.', 'في «١٢ علبة بـ٦ دراهم» يكتب «درهمان للعلبة». قاعدته تعطي إجابة خاطئة.'],
          }),
          uprofile('transfer', 30, 'u.ahmed:transfer', {
            answer: ['"2 dirhams." Correct: 12 divides by 6.', '«درهمان.» صحيحة: ١٢ تقبل القسمة على ٦.'],
            explain: ['"Cost divided by boxes." Clear.', '«الثمن تقسيم عدد العلب.» واضح.'],
            apply: ['"3 for 7? 7 doesn\'t go into 3… I can\'t do that one." Dividing into decimals stops him.', '«٣ بـ٧؟ لا يمكن قسمة ٧ على ٣… لا أستطيع حلّها.» القسمة بالكسور العشرية توقفه.'],
          }),
        ],
      },
      choices: [
        ch(['Assign him a challenge', 'كلّفيه بتحدٍّ'], ['Assign', 'التكليف'], 'ahmedExtend', { ifFlag: 'u.ahmed:secure' }),
        ch(['Let him start the main task now', 'دعيه يبدأ المهمة الرئيسية الآن'], ['Main task', 'المهمة الرئيسية'], 'ahmedAhead', { ifFlag: 'u.ahmed:secure', minutes: 0 }),
        ch(['"Why does that rule work?"', '«لماذا تنجح هذه القاعدة؟»'], ['See Why', 'اعرف السبب'], 'ahmedSeeWhy', { ifFlag: 'u.ahmed:fragile' }),
        ch(['Give him the harder task anyway', 'أعطيه المهمة الأصعب على أي حال'], ['Challenge', 'تحدٍّ'], 'ahmedRuleBreaks', { ifFlag: 'u.ahmed:fragile', minutes: 0 }),
        ch(['Two-minute refresher: dividing into decimals', 'تذكير في دقيقتين: القسمة بالكسور العشرية'], ['Targeted support', 'دعم موجّه'], 'ahmedRefresher', { ifFlag: 'u.ahmed:transfer' }),
        ch(['Note it; come back after the launch', 'دوّنيها وعودي إليها بعد الافتتاح'], ['Note for later', 'ملاحظة لاحقة'], 'ahmedNoted', { ifFlag: 'u.ahmed:transfer', minutes: 0 }),
      ],
    },
    {
      id: 'sara', kind: 'needs-help', on: 'sara', interaction: 'investigate',
      line: T(['"Miss, I still don\'t understand what we learned yesterday."', '«أستاذة، ما زلت لا أفهم ما تعلّمناه أمس.»']),
      ask: T(['Find the Missing Piece: her notebook, her tablet, and what she says.', 'ابحثي عن القطعة الناقصة: دفترها، وجهازها، وما تقوله.']),
      investigate: {
        clues: [
          clue('notebook', ['Notebook', 'الدفتر'], ['Yesterday: equivalent ratios.', 'درس الأمس: النسب المتكافئة.']),
          clue('tablet', ['Tablet', 'الجهاز اللوحي'], ['Yesterday\'s practice questions.', 'أسئلة التدريب من الأمس.']),
          clue('bubble', ['What she says', 'ما تقوله'], ['"What part don\'t you understand?"', '«أي جزء لم تفهميه؟»']),
        ],
        profiles: [
          uprofile('prerequisite', 30, 'u.sara:prerequisite', {
            notebook: ['The ratio table stops after the first row, where 4:6 had to become 2:3.', 'جدول النسب يتوقّف بعد الصف الأول، حيث كان يجب أن تصبح ٤:٦ هي ٢:٣.'],
            tablet: ['She stopped at question 2, the first one that needed simplifying.', 'توقّفت عند السؤال ٢، أول سؤال يحتاج إلى تبسيط.'],
            bubble: ['"How can 4:6 be the same as 2:3? They\'re different numbers."', '«كيف تكون ٤:٦ مثل ٢:٣؟ إنها أعداد مختلفة.»'],
          }),
          uprofile('misconception', 25, 'u.sara:misconception', {
            notebook: ['"2:3 = 4:5 = 6:7", neatly, all the way down.', '«٢:٣ = ٤:٥ = ٦:٧»، بخط مرتّب حتى آخر الصفحة.'],
            tablet: ['The same mistake three times: she adds the same number to both parts.', 'الخطأ نفسه ثلاث مرات: تضيف العدد نفسه إلى الطرفين.'],
            bubble: ['"You add the same to both sides, so it stays fair. Right?"', '«نضيف العدد نفسه إلى الطرفين حتى تبقى عادلة. صح؟»'],
          }),
          uprofile('explanation', 25, 'u.sara:explanation', {
            notebook: ['Yesterday\'s example copied neatly; her own attempt below it is blank.', 'مثال الأمس منسوخ بترتيب، ومحاولتها تحته فارغة.'],
            tablet: ['She replayed yesterday\'s explanation twice and stopped at the same point.', 'أعادت شرح الأمس مرتين وتوقّفت عند النقطة نفسها.'],
            bubble: ['"I listened. It just didn\'t make sense the way you said it."', '«استمعت. لكنه لم يكن منطقيًا بالطريقة التي شرحتِها.»'],
          }),
          uprofile('independent', 20, 'u.sara:independent', {
            notebook: ['Correct answers, with a lot of crossing out.', 'إجابات صحيحة، مع كثير من الشطب.'],
            tablet: ['6 of 8 right, slowly, two answers changed at the last second.', '٦ من ٨ صحيحة، ببطء، وإجابتان غيّرتهما في اللحظة الأخيرة.'],
            bubble: ['"I think I get it. I\'m just not sure I\'ll remember."', '«أظن أنني فهمت. لكنني لست متأكدة أنني سأتذكّر.»'],
          }),
        ],
      },
      choices: [
        ch(['Go back one step: simplify 4:6 together', 'عودي خطوة: لنبسّط ٤:٦ معًا'], ['Readiness support', 'دعم الاستعداد'], 'saraBridge', { ifFlag: 'u.sara:prerequisite' }),
        ch(['Start the new topic; she\'ll catch up', 'ابدئي الموضوع الجديد، وستلحق'], ['Continue', 'متابعة'], 'saraLater', { ifFlag: 'u.sara:prerequisite', minutes: 0 }),
        ch(['"Show me how you got 4:5"', '«أريني كيف وصلتِ إلى ٤:٥»'], ['See Why', 'اعرف السبب'], 'saraSeeWhy', { ifFlag: 'u.sara:misconception' }),
        ch(['Show her the rule again', 'أعيدي لها القاعدة'], ['Re-explain', 'إعادة الشرح'], 'saraRule', { ifFlag: 'u.sara:misconception' }),
        ch(['Let her ask for another explanation', 'دعيها تطلب شرحًا آخر'], ['AI Helper', 'المساعد الذكي'], 'saraAnother', { ifFlag: 'u.sara:explanation' }),
        ch(['Explain it again, more slowly', 'اشرحي مرة أخرى، ببطء'], ['Re-explain', 'إعادة الشرح'], 'saraSlower', { ifFlag: 'u.sara:explanation', minutes: 0 }),
        ch(['A short practice set first', 'مجموعة تدريب قصيرة أولًا'], ['Practice', 'التدريب'], 'saraPractice', { ifFlag: 'u.sara:independent' }),
        ch(['"You\'ve got this. Let\'s go on."', '«أنتِ قادرة. لنتابع.»'], ['Encourage', 'تشجيع'], 'saraTrust', { ifFlag: 'u.sara:independent', minutes: 0 }),
      ],
    },
    {
      id: 'omar', kind: 'low-participation', on: 'omar', interaction: 'investigate',
      line: T(['"Miss, what are we doing today?"', '«أستاذة، ماذا سنفعل اليوم؟»']),
      ask: T(['What\'s Behind the Silence? Look before you decide.', 'ما وراء الصمت؟ انظري قبل أن تقرّري.']),
      investigate: {
        clues: [
          clue('desk', ['His desk', 'طاولته'], ['What is on his desk?', 'ماذا على طاولته؟']),
          clue('face', ['Where he\'s looking', 'إلى أين ينظر'], ['Where is his attention?', 'أين انتباهه؟']),
          clue('reply', ['What he says', 'ما يقوله'], ['"Are you OK, Omar?"', '«هل أنت بخير يا عمر؟»']),
        ],
        profiles: [
          uprofile('purpose', 30, 'u.omar:purpose', {
            desk: ['His book is open on the wrong chapter.', 'كتابه مفتوح على الفصل الخطأ.'],
            face: ['He keeps looking at the empty board, then at the others.', 'ينظر إلى السبورة الفارغة، ثم إلى زملائه.'],
            reply: ['"I don\'t know what we\'re supposed to learn today."', '«لا أعرف ماذا يُفترض أن نتعلّم اليوم.»'],
          }),
          uprofile('confidence', 25, 'u.omar:confidence', {
            desk: ['An answer, written and rubbed out. You can still read it.', 'إجابة مكتوبة ثم ممسوحة. ما زال بالإمكان قراءتها.'],
            face: ['He looks down whenever you look his way.', 'ينظر إلى الأسفل كلما نظرتِ نحوه.'],
            reply: ['"I\'ll probably get it wrong."', '«غالبًا سأخطئ.»'],
          }),
          uprofile('barrier', 25, 'u.omar:barrier', {
            desk: ['His tablet is stuck on the login screen.', 'جهازه عالق على شاشة تسجيل الدخول.'],
            face: ['He watches his neighbour\'s screen from the side.', 'يراقب شاشة جاره من الجانب.'],
            reply: ['"It\'s fine, Miss. I\'ll just watch."', '«لا بأس يا أستاذة. سأتفرّج فقط.»'],
          }),
          uprofile('distraction', 20, 'u.omar:distraction', {
            desk: ['A football pitch drawn in the margin.', 'ملعب كرة قدم مرسوم على الهامش.'],
            face: ['Out of the window: they are setting up for sports day.', 'ينظر من النافذة: إنهم يجهّزون ليوم الرياضة.'],
            reply: ['"Is the race today, Miss?"', '«هل السباق اليوم يا أستاذة؟»'],
          }),
        ],
      },
      choices: [
        ch(['Put today\'s learning intention up for everyone', 'اعرضي هدف التعلّم للجميع'], ['Present Mode', 'وضع العرض'], 'omarIntention', { ifFlag: 'u.omar:purpose' }),
        ch(['Tell him quietly what today is about', 'أخبريه بهدوء عن موضوع اليوم'], ['One-to-one', 'حديث فردي'], 'omarWhisper', { ifFlag: 'u.omar:purpose', minutes: 0 }),
        ch(['"Everyone write one guess. No names."', '«ليكتب كل واحد تخمينًا. دون أسماء.»'], ['Low-risk start', 'بداية بلا مخاطرة'], 'omarLowRisk', { ifFlag: 'u.omar:confidence' }),
        ch(['Tell a partner first', 'أخبر زميلك أولًا'], ['Teams', 'الفرق'], 'omarPartner', { ifFlag: 'u.omar:confidence' }),
        ch(['Share a screen and give him a job', 'شاشة مشتركة ومهمة له'], ['Remove the barrier', 'إزالة العائق'], 'omarWayIn', { ifFlag: 'u.omar:barrier' }),
        ch(['Sort the login after the launch', 'حلّي مشكلة الدخول بعد الافتتاح'], ['Later', 'لاحقًا'], 'omarWatches', { ifFlag: 'u.omar:barrier', minutes: 0 }),
        ch(['"Sports day! Who\'s faster, in metres per second?"', '«يوم الرياضة! من الأسرع، بالأمتار في الثانية؟»'], ['Connect to the day', 'ربط بيومه'], 'omarHook', { ifFlag: 'u.omar:distraction' }),
        ch(['Move him nearer the board', 'انقليه قرب السبورة'], ['Move closer', 'تقريبه'], 'omarSeat', { ifFlag: 'u.omar:distraction', minutes: 0 }),
      ],
    },
    {
      id: 'omarGuess', kind: 'new-event', on: 'omar', interaction: 'investigate',
      line: T(['Omar\'s guess: "2:3 is the same as 3:4."', 'تخمين عمر: «٢:٣ هي نفسها ٣:٤.»']),
      ask: T(['His first contribution today, and it hides a misconception.', 'أول مشاركة له اليوم، وتخفي فهمًا خاطئًا.']),
      investigate: {
        clues: [
          clue('note', ['His sticky note', 'ورقته اللاصقة'], ['What did he write?', 'ماذا كتب؟']),
          clue('why', ['"Why that one?"', '«لماذا هذه؟»'], ['Ask him how he chose it.', 'اسأليه كيف اختارها.']),
        ],
        profiles: [
          uprofile('additive', 1, 'u.omarGuess', {
            note: ['"2:3 → 3:4", with "+1" written over both arrows.', '«٢:٣ ← ٣:٤»، وفوق السهمين «+١».'],
            why: ['"I added one to both, so it\'s still the same."', '«أضفت واحدًا إلى الاثنين، فبقيت كما هي.»'],
          }),
        ],
      },
      choices: [
        ch(['"How did you get 3:4?"', '«كيف وصلت إلى ٣:٤؟»'], ['See Why', 'اعرف السبب'], 'omarSeeWhy'),
        ch(['Ask the class: same or not?', 'اسألي الصف: متساويتان أم لا؟'], ['Class discussion', 'نقاش صفّي'], 'omarClassVote'),
      ],
    },
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['Bring Learning to Life', 'أحيي التعلّم']),
      ask: T(['How will the lesson open?', 'كيف سيبدأ الدرس؟']),
      choices: [
        ch(['Share the learning intention', 'اعرضي هدف التعلّم'], ['Present Mode', 'وضع العرض'], 'boardPresent'),
        ch(['"Where have you seen rates outside school?"', '«أين رأيتم المعدّلات خارج المدرسة؟»'], ['Prior-knowledge discussion', 'نقاش المعرفة السابقة'], 'boardDiscuss'),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop', interaction: 'sort',
      line: T(['Build Your Learning Journey', 'ابني رحلة التعلّم']),
      ask: T(['A simplified, illustrative planning view: place today\'s practices in the three lesson stages.', 'عرض تخطيط مبسّط وتوضيحي: ضعي ممارسات اليوم في مراحل الدرس الثلاث.']),
      choices: [ch(['Open the planner', 'افتحي المخطّط'], ['Planning puzzle', 'لغز التخطيط'], 'journey', { minutes: 0 })],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['Something is tucked behind the atlas.', 'هناك شيء مخبّأ خلف الأطلس.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Look behind the atlas', 'انظري خلف الأطلس'], ['Hidden discovery', 'اكتشاف مخفي'], 'recipeCard', { minutes: 0 })],
    },
  ],
  outcomes: [
    uout('ahmedExtend', 'good', ['Ready for more', 'مستعد للمزيد'], ['You assign a problem with three shops and a discount. He starts sketching a table. Real extension, not more of the same.', 'تكلّفينه بمسألة فيها ثلاثة محلات وخصم. يبدأ برسم جدول. إثراء حقيقي، لا تكرار للشيء نفسه.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'u.stretch', studentDelta: [{ id: 'ahmed', key: 'readiness', delta: 1 }] }),
    uout('ahmedAhead', 'mixed', ['He finishes first, again', 'ينهي أولًا، مرة أخرى'], ['The main task takes him four minutes. Then he waits. The evidence said he was ready for more.', 'المهمة الرئيسية تأخذ منه أربع دقائق. ثم ينتظر. الأدلة قالت إنه مستعد للمزيد.'], [fx('ahmed', 0, -1)], { xp: 30 }),
    uout('ahmedSeeWhy', 'insight', ['The rule cracks', 'القاعدة تتصدّع'], ['"Why big divided by small?" He tries 12 boxes for 6 dirhams and stops. "Oh. It\'s cost divided by boxes."', '«لماذا الكبير على الصغير؟» يجرّب ١٢ علبة بـ٦ دراهم ويتوقّف. «آه. إنه الثمن تقسيم عدد العلب.»'], [fx('ahmed', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'u.evidence' }),
    uout('ahmedRuleBreaks', 'mixed', ['The rule will break later', 'القاعدة ستنكسر لاحقًا'], ['The harder task has a cheap bulk pack. His rule gives 2 dirhams a box, and he doesn\'t notice.', 'في المهمة الأصعب عبوة كبيرة رخيصة. قاعدته تعطي درهمين للعلبة، ولا ينتبه.'], [fx('ahmed', -1, 0)], { xp: 30, opensNeeds: ['ahmed-evidence'] }),
    uout('ahmedRefresher', 'good', ['One step back, then forward', 'خطوة إلى الوراء، ثم إلى الأمام'], ['7 ÷ 3 on a mini board, the remainder as decimals. He finishes the comparison himself.', '٧ ÷ ٣ على سبورة صغيرة، والباقي كسور عشرية. ويكمل المقارنة بنفسه.'], [fx('ahmed', 1, 1)], { xp: 30 }),
    uout('ahmedNoted', 'mixed', ['Noted, not yet solved', 'مدوّنة، لكنها لم تُحلّ بعد'], ['You write "decimals" next to his name. Until then, every comparison question will stop him.', 'تكتبين «كسور عشرية» بجانب اسمه. وحتى ذلك الحين، سيتوقّف عند كل سؤال مقارنة.'], [], { xp: 30, opensNeeds: ['ahmed-evidence'] }),
    uout('saraBridge', 'insight', ['The missing piece', 'القطعة الناقصة'], ['4:6 and 2:3 side by side. "You can divide both by 2?" Simplifying was the missing step. It will need more than five minutes.', '٤:٦ و٢:٣ جنبًا إلى جنب. «يمكن قسمة الاثنين على ٢؟» التبسيط كان الخطوة الناقصة، وسيحتاج إلى أكثر من خمس دقائق.'], [fx('sara', 1, 1)], { xp: 30, setFlag: 'u.saraBridged', opensNeeds: ['sara-gap'] }),
    uout('saraLater', 'mixed', ['The gap goes with her', 'الفجوة ترافقها'], ['She starts unit rates without simplifying. By the second question she will be stuck again.', 'تبدأ معدّل الوحدة دون تبسيط. وعند السؤال الثاني ستتعثّر من جديد.'], [fx('sara', 0, -1)], { xp: 30, opensNeeds: ['sara-gap'] }),
    uout('saraSeeWhy', 'insight', ['Adding, not multiplying', 'تجمع، ولا تضرب'], ['"I added 2 to both." The same idea, three times yesterday. Now you both know what to fix.', '«أضفت ٢ إلى الاثنين.» الفكرة نفسها ثلاث مرات أمس. الآن تعرفان كلتاكما ما يجب إصلاحه.'], [fx('sara', 1, 1)], { xp: 30, discover: 'see-why', setFlag: 'u.evidence', opensNeeds: ['sara-gap'] }),
    uout('saraRule', 'mixed', ['The rule, again', 'القاعدة، مرة أخرى'], ['She nods and copies the rule. On the next one she adds 2 to both parts again.', 'تومئ وتنسخ القاعدة. وفي السؤال التالي تضيف ٢ إلى الطرفين من جديد.'], [], { xp: 30, opensNeeds: ['sara-gap'] }),
    uout('saraAnother', 'good', ['Another way in', 'مدخل آخر'], ['She asks for it explained differently and gets a ratio table with pictures. "Oh. It\'s the same groups, more of them."', 'تطلب شرحًا مختلفًا فتحصل على جدول نسب بالصور. «آه. إنها المجموعات نفسها، لكن أكثر.»'], [fx('sara', 1, 1)], { xp: 30, discover: 'ai-helper' }),
    uout('saraSlower', 'mixed', ['The same words, slower', 'الكلمات نفسها، أبطأ'], ['She listens carefully. It still doesn\'t land: it was the explanation, not the speed.', 'تستمع بانتباه. لكنه لا يصل: المشكلة في الشرح نفسه، لا في سرعته.'], [], { xp: 30, opensNeeds: ['sara-gap'] }),
    uout('saraPractice', 'good', ['A little more, before new', 'قليل من التدريب، قبل الجديد'], ['Four short questions, all right. Her shoulders drop: now she believes it.', 'أربعة أسئلة قصيرة، كلها صحيحة. ترتاح كتفاها: الآن تصدّق أنها فهمت.'], [fx('sara', 1, 1)], { xp: 30, discover: 'practice', studentDelta: [{ id: 'sara', key: 'confidence', delta: 1 }] }),
    uout('saraTrust', 'mixed', ['Encouraged, still unsure', 'متشجّعة، لكنها غير واثقة'], ['"You\'ve got this." She smiles, and still checks every answer with her neighbour.', '«أنتِ قادرة.» تبتسم، لكنها ما زالت تتحقّق من كل إجابة مع جارتها.'], [], { xp: 30 }),
    uout('omarIntention', 'good', ['Now he knows', 'الآن يعرف'], ['"Today: find the better deal using unit rates." Up for everyone. Omar reads it and turns to the right page.', '«اليوم: نجد العرض الأوفر باستخدام معدّل الوحدة.» معروض للجميع. يقرؤه عمر ويفتح الصفحة الصحيحة.'], [fx('omar', 0, 2)], { xp: 30, discover: 'present-mode', setFlag: 'u.intention' }),
    uout('omarWhisper', 'good', ['He knows; his table doesn\'t', 'هو يعرف، وطاولته لا تعرف'], ['You tell him quietly and he starts. Two others at his table still look lost.', 'تخبرينه بهدوء فيبدأ. واثنان آخران على طاولته ما زالا تائهين.'], [fx('omar', 0, 1)], { xp: 30 }),
    uout('omarLowRisk', 'insight', ['One guess, no names', 'تخمين واحد، دون أسماء'], ['Everyone writes a guess on a sticky note. Omar writes one. His first contribution today.', 'يكتب كل واحد تخمينًا على ورقة لاصقة. ويكتب عمر تخمينه. أول مشاركة له اليوم.'], [fx('omar', 0, 1)], { xp: 30, next: { event: 'omarGuess', after: 0 } }),
    uout('omarPartner', 'good', ['Partner first', 'الزميل أولًا'], ['He tells Sara before the class hears it. "I think it\'s 2 dirhams," he says, and he\'s right.', 'يخبر سارة قبل أن يسمعه الصف. «أظن أنها درهمان»، يقول، وهو محق.'], [fx('omar', 0, 2)], { xp: 30, discover: 'teams', setFlag: 'u.peerVoice', studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] }),
    uout('omarWayIn', 'good', ['The barrier was the screen', 'العائق كان الشاشة'], ['Shared screen, and his job is to read the question aloud. The silence was never about the maths.', 'شاشة مشتركة، ومهمته أن يقرأ السؤال بصوت مسموع. الصمت لم يكن يومًا بسبب الرياضيات.'], [fx('omar', 0, 2)], { xp: 30, studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] }),
    uout('omarWatches', 'mixed', ['Watching from the side', 'يتفرّج من الجانب'], ['He watches the launch on someone else\'s screen. He will join late, if at all.', 'يتابع الافتتاح على شاشة غيره. وسينضم متأخرًا، إن انضم.'], [], { xp: 30, opensNeeds: ['omar-voice'] }),
    uout('omarHook', 'good', ['Sports day, in metres per second', 'يوم الرياضة، بالأمتار في الثانية'], ['"100 metres in 20 seconds, or 60 in 10?" Omar turns from the window to the board.', '«١٠٠ متر في ٢٠ ثانية، أم ٦٠ في ١٠؟» يلتفت عمر من النافذة إلى السبورة.'], [fx('omar', 0, 2)], { xp: 30 }),
    uout('omarSeat', 'mixed', ['Closer, still elsewhere', 'أقرب، لكنه ما زال بعيدًا'], ['He is nearer the board now. His eyes are still on the yard.', 'صار أقرب إلى السبورة. لكن عينيه ما زالتا على الساحة.'], [], { xp: 30, opensNeeds: ['omar-voice'] }),
    uout('omarSeeWhy', 'insight', ['Adding, not multiplying', 'يجمع، ولا يضرب'], ['"I added one to both." Now you know what the lesson\'s first example needs to show.', '«أضفت واحدًا إلى الاثنين.» الآن تعرفين ما يجب أن يُظهره أول مثال في الدرس.'], [fx('omar', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'u.evidence' }),
    uout('omarClassVote', 'good', ['His guess starts a discussion', 'تخمينه يفتح نقاشًا'], ['"Same or not?" The class splits. Two students argue it out with a drawing. Omar\'s guess started the best discussion of the morning.', '«متساويتان أم لا؟» ينقسم الصف. ويتناقش طالبان برسم توضيحي. تخمين عمر فتح أفضل نقاش في الصباح.'], [fx('omar', 1, 1)], { xp: 30, setFlag: 'u.peerVoice', studentDelta: [{ id: 'omar', key: 'confidence', delta: 1 }] }),
    uout('boardPresent', 'good', ['The learning intention is up', 'هدف التعلّم معروض'], ['Everyone can see what today is for.', 'الجميع يرى الغاية من درس اليوم.'], [fx('omar', 0, 1), fx('sara', 0, 1)], { discover: 'present-mode', setFlag: 'u.intention' }),
    uout('boardDiscuss', 'insight', ['Starting points, out loud', 'نقاط الانطلاق، بصوت مسموع'], ['"Supermarket offers." "Petrol." "My dad\'s car: kilometres per litre." The answers show who already has a feel for rates.', '«عروض السوبرماركت.» «البنزين.» «سيارة أبي: كيلومترات لكل لتر.» الإجابات تُظهر من لديه إحساس مسبق بالمعدّلات.'], [fx('ahmed', 0, 1), fx('omar', 0, 1)], { setFlag: 'u.evidence' }),
    uout('journey', 'good', ['Your journey has a shape', 'رحلتكِ صار لها شكل'], ['Launch, facilitate, extend: today\'s plan has a shape. The planner shows one way, not the only way.', 'افتتاح، ثم تيسير، ثم إثراء: صار لخطة اليوم شكل. والمخطّط يعرض طريقة واحدة، لا الطريقة الوحيدة.'], [], { setFlag: 'u.journey' }),
    uout('recipeCard', 'insight', ['A recipe card from last year', 'بطاقة وصفة من العام الماضي'], ['"Luqaimat for 30 people", in a student\'s handwriting, every amount tripled. A ratio problem someone made for fun. It goes in your notebook.', '«لقيمات لثلاثين شخصًا»، بخط طالب، وكل المقادير مضروبة في ثلاثة. مسألة نسب صنعها أحدهم للمتعة. تُحفظ في دفتركِ.'], [], { setFlag: 'u.collect:recipe' }),
  ],
  puzzle: {
    id: 'journey',
    title: T(['Build Your Learning Journey', 'ابني رحلة التعلّم']),
    intro: T(['A simplified, illustrative planning view. Place each practice in the stage where it fits. Some fit in more than one.', 'عرض تخطيط مبسّط وتوضيحي. ضعي كل ممارسة في المرحلة التي تناسبها. بعضها يناسب أكثر من مرحلة.']),
    cards: [
      { id: 'intention', text: T(['Share the learning intention', 'عرض هدف التعلّم']), stages: ['launch'] },
      { id: 'prior', text: T(['Find out what students already know', 'معرفة ما يعرفه الطلاب مسبقًا']), stages: ['launch', 'facilitate'] },
      { id: 'try', text: T(['Students try the task', 'الطلاب يجرّبون المهمة']), stages: ['facilitate'] },
      { id: 'compare', text: T(['Compare and discuss strategies', 'مقارنة الاستراتيجيات ومناقشتها']), stages: ['facilitate'] },
      { id: 'support', text: T(['Support students who are stuck', 'دعم الطلاب المتعثّرين']), stages: ['facilitate'] },
      { id: 'reinforce', text: T(['Practise to reinforce', 'التدريب للتثبيت']), stages: ['facilitate', 'extend'] },
      { id: 'check', text: T(['Check understanding at the end', 'التحقّق من الفهم في النهاية']), stages: ['extend'] },
      { id: 'stretch', text: T(['Stretch students who are ready', 'إثراء الطلاب المستعدين']), stages: ['extend'] },
    ],
    badge: 'instructional-architect',
    xp: 100,
    note: T(['This sequence is one example, not a rule. Good lessons come back to practices across stages.', 'هذا الترتيب مثال واحد، لا قاعدة. الدروس الجيدة تعود إلى الممارسات في أكثر من مرحلة.']),
  },
  badges: [
    { id: 'instructional-architect', title: T(['Instructional Architect', 'مهندسة التعلّم']), why: T(['You built the lesson\'s journey across launch, facilitate and extend.', 'بنيتِ رحلة الدرس عبر الافتتاح والتيسير والإثراء.']), icon: '▣', when: { flag: 'u.journey' } },
    { id: 'first-five', title: T(['Five Minutes Well Spent', 'خمس دقائق في مكانها']), why: T(['You looked before you acted, three times.', 'نظرتِ قبل أن تتصرّفي، ثلاث مرات.']), icon: '◔', when: 'always' },
  ],
});

/* ================================================================ L02 */
export const L02: UScenario = scenario({
  code: 'L02', kind: 'scenario', phase: 'launch', cooldown: 3, requires: { notVisited: ['L02'] },
  title: T(['What Do We Know?', 'ماذا نعرف؟']),
  takeaway: T(['Surface what the class already thinks before you teach, and build from the pattern.', 'أظهر ما يعتقده الصف قبل أن تشرح، وابنِ على النمط.']),
  discovers: ['present-mode'],
  events: [
    {
      id: 'responses', kind: 'new-event', on: 'board', interaction: 'pattern',
      line: T(['"Where do you meet rates outside school?"', '«أين تصادفون المعدّلات خارج المدرسة؟»']),
      ask: T(['Responses appear on the board. Tap the patterns before you decide where to start.', 'تظهر الإجابات على السبورة. اضغطي على الأنماط قبل أن تقرّري من أين تبدئين.']),
      task: {
        cards: [
          card('r1', ['Response', 'إجابة'], ['"Supermarket: 2 for 5 dirhams."', '«السوبرماركت: ٢ بـ٥ دراهم.»']),
          card('r2', ['Response', 'إجابة'], ['"Petrol: dirhams per litre."', '«البنزين: دراهم لكل لتر.»']),
          card('r3', ['Response', 'إجابة'], ['"Speed: kilometres per hour."', '«السرعة: كيلومترات في الساعة.»']),
          card('r4', ['Response', 'إجابة'], ['"2:3 is like 3:4, you add one."', '«٢:٣ مثل ٣:٤، نضيف واحدًا.»']),
          card('r5', ['Response', 'إجابة'], ['"A taxi meter."', '«عدّاد التاكسي.»']),
          card('r6', ['Response', 'إجابة'], ['"Double a recipe: double everything."', '«ضاعف الوصفة: ضاعف كل شيء.»']),
          card('r7', ['Response', 'إجابة'], ['"6:9 is bigger than 2:3."', '«٦:٩ أكبر من ٢:٣.»']),
          card('r8', ['Response', 'إجابة'], ['"I don\'t know."', '«لا أعرف.»']),
        ],
        patterns: [
          { id: 'everyday', label: T(['Everyday rates', 'معدّلات من الحياة']), cards: ['r1', 'r2', 'r3', 'r5', 'r6'] },
          { id: 'additive', label: T(['Adding, not multiplying', 'الجمع بدل الضرب']), cards: ['r4', 'r7'] },
          { id: 'unsure', label: T(['Not sure yet', 'غير متأكد بعد']), cards: ['r8'] },
        ],
        note: T(['Most of the class has the everyday idea; two responses show the additive misconception.', 'معظم الصف لديه الفكرة من الحياة اليومية، وإجابتان تُظهران فهم الجمع الخاطئ.']),
      },
      choices: [
        ch(['Build from the everyday examples, then test "add one"', 'ابني على أمثلة الحياة، ثم اختبري «نضيف واحدًا»'], ['Present Mode', 'وضع العرض'], 'l2Build'),
        ch(['Correct the "add one" idea straight away', 'صحّحي فكرة «نضيف واحدًا» فورًا'], ['Correct it', 'تصحيح'], 'l2Correct', { minutes: 0 }),
        ch(['Go to the planned example', 'انتقلي إلى المثال المخطّط'], ['Plan', 'الخطة'], 'l2Plan', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('l2Build', 'good', ['Starting from them', 'البدء منهم'], ['"Two for five dirhams: how much for one?" The class\'s own example becomes the lesson, and "add one" gets tested, not just told.', '«اثنان بخمسة دراهم: كم الواحدة؟» يصبح مثال الصف هو الدرس، وتُختبر فكرة «نضيف واحدًا» بدل أن تُصحَّح بالكلام.'], [fx('omar', 0, 1), fx('sara', 1, 0)], { xp: 30, discover: 'present-mode', setFlag: 'u.evidence' }),
    uout('l2Correct', 'mixed', ['Corrected, not changed', 'صُحّحت، ولم تتغيّر'], ['You explain why it\'s wrong. The two who wrote it nod, and keep the idea.', 'تشرحين لماذا هي خطأ. والاثنان اللذان كتباها يومئان، ويحتفظان بالفكرة.'], [], { xp: 30, opensNeeds: ['class-mis'] }),
    uout('l2Plan', 'mixed', ['Back to the plan', 'العودة إلى الخطة'], ['The planned example is good. It doesn\'t start where they are.', 'المثال المخطّط جيد، لكنه لا يبدأ من حيث هم.'], [], { xp: 30, opensNeeds: ['class-mis'] }),
  ],
});

/* ================================================================ L03 */
export const L03: UScenario = scenario({
  code: 'L03', kind: 'scenario', phase: 'launch', cooldown: 3, requires: { visited: ['L01'], notVisited: ['L03'] },
  title: T(['Ready for More', 'مستعد للمزيد']),
  takeaway: T(['Check that "ready" is real before you extend: fast is not the same as deep.', 'تأكّد أن «الاستعداد» حقيقي قبل أن تُثري: السرعة لا تعني العمق.']),
  discovers: ['assign', 'see-why'],
  events: [
    {
      id: 'ready', kind: 'early-finisher', on: 'ahmed', interaction: 'compare',
      line: T(['"Miss, can I have the hard one?"', '«أستاذة، هل آخذ المسألة الصعبة؟»']),
      ask: T(['Reveal his three pieces of work side by side and compare them before you extend.', 'اكشفي أعماله الثلاثة جنبًا إلى جنب وقارنيها قبل أن تُثري.']),
      investigate: {
        clues: [
          clue('answer', ['Answer', 'الإجابة'], ['Today\'s first question.', 'السؤال الأول اليوم.']),
          clue('explain', ['Explanation', 'الشرح'], ['"Talk me through it."', '«اشرح لي.»']),
          clue('transfer', ['New context', 'سياق جديد'], ['A bulk-pack question he hasn\'t seen.', 'سؤال عن عبوة كبيرة لم يره من قبل.']),
        ],
        profiles: [
          uprofile('secure', 1, 'u.l3:secure', {
            answer: ['Right.', 'صحيحة.'],
            explain: ['"Cost divided by boxes, so I can compare one each."', '«الثمن على عدد العلب، حتى أقارن سعر الواحدة.»'],
            transfer: ['Right, with the same reasoning.', 'صحيحة، وبالتعليل نفسه.'],
          }, 'u.ahmed:secure'),
          uprofile('fragile', 1, 'u.l3:fragile', {
            answer: ['Right.', 'صحيحة.'],
            explain: ['"Big divided by small."', '«الكبير على الصغير.»'],
            transfer: ['Wrong: his rule flips the division.', 'خاطئة: قاعدته تقلب القسمة.'],
          }, 'u.ahmed:fragile'),
          uprofile('transfer', 1, 'u.l3:transfer', {
            answer: ['Right.', 'صحيحة.'],
            explain: ['Clear.', 'واضح.'],
            transfer: ['Stuck at 7 ÷ 3: dividing into decimals.', 'متوقّف عند ٧ ÷ ٣: القسمة بالكسور العشرية.'],
          }, 'u.ahmed:transfer'),
        ],
      },
      choices: [
        ch(['Assign an open problem: design a sale', 'كلّفيه بمسألة مفتوحة: صمّم عرض تخفيضات'], ['Assign', 'التكليف'], 'l3Open', { ifFlag: 'u.l3:secure' }),
        ch(['Give him more of the same, harder numbers', 'أعطيه المزيد من الشيء نفسه، بأعداد أصعب'], ['Harder set', 'مجموعة أصعب'], 'l3More', { ifFlag: 'u.l3:secure', minutes: 0 }),
        ch(['"Explain the bulk pack before we extend"', '«اشرح العبوة الكبيرة قبل أن ننتقل»'], ['See Why', 'اعرف السبب'], 'l3Why', { ifFlag: 'u.l3:fragile' }),
        ch(['Extend anyway; he\'s quick', 'أثري على أي حال، فهو سريع'], ['Extend', 'إثراء'], 'l3Anyway', { ifFlag: 'u.l3:fragile', minutes: 0 }),
        ch(['One bridging step, then assign the extension', 'خطوة جسر واحدة، ثم كلّفيه بالإثراء'], ['Assign', 'التكليف'], 'l3Bridge', { ifFlag: 'u.l3:transfer' }),
        ch(['Extend anyway; he\'ll work it out', 'أثري على أي حال، وسيتدبّر الأمر'], ['Extend', 'إثراء'], 'l3Anyway', { ifFlag: 'u.l3:transfer', minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('l3Open', 'good', ['Deeper, not just further', 'أعمق، لا أبعد فقط'], ['Three offers, one budget, prove which is best. It is harder than anything in the book, and it is his kind of hard.', 'ثلاثة عروض وميزانية واحدة، وأثبت أيها الأفضل. أصعب من أي شيء في الكتاب، وهو نوع الصعوبة الذي يناسبه.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'u.stretch', closesNeeds: ['ahmed-evidence'], studentDelta: [{ id: 'ahmed', key: 'readiness', delta: 1 }] }),
    uout('l3More', 'mixed', ['Faster, not further', 'أسرع، لا أبعد'], ['Ten harder questions, done in record time. He is busy, not stretched.', 'عشرة أسئلة أصعب، أنهاها في وقت قياسي. مشغول، لا متحدٍّ.'], [], { xp: 30 }),
    uout('l3Why', 'insight', ['The rule meets a bulk pack', 'القاعدة تصطدم بالعبوة الكبيرة'], ['"12 boxes for 6… oh, half a dirham each." The extension can wait a day; his reasoning can\'t.', '«١٢ علبة بـ٦… آه، نصف درهم للعلبة.» الإثراء يمكنه الانتظار يومًا، أما تفكيره فلا.'], [fx('ahmed', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'u.evidence', closesNeeds: ['ahmed-evidence'] }),
    uout('l3Anyway', 'mixed', ['Extension on a crack', 'إثراء فوق شقّ'], ['He starts the extension fast and hits the same wall on step two.', 'يبدأ الإثراء بسرعة ويصطدم بالجدار نفسه عند الخطوة الثانية.'], [fx('ahmed', 0, -1)], { xp: 30, opensNeeds: ['ahmed-evidence'] }),
    uout('l3Bridge', 'good', ['One step, then up', 'خطوة، ثم إلى الأعلى'], ['7 ÷ 3 as 2.33 on a mini board, then the sale problem. He finishes both.', '٧ ÷ ٣ تساوي ٢٫٣٣ على سبورة صغيرة، ثم مسألة التخفيضات. ويُنهي الاثنتين.'], [fx('ahmed', 1, 1)], { xp: 30, discover: 'assign', setFlag: 'u.stretch', closesNeeds: ['ahmed-evidence'] }),
  ],
});

/* ================================================================ L04 */
export const L04: UScenario = scenario({
  code: 'L04', kind: 'scenario', phase: 'launch', cooldown: 3, requires: { unresolved: ['sara-gap'], notVisited: ['L04'] },
  title: T(['Find the Missing Piece', 'ابحثي عن القطعة الناقصة']),
  takeaway: T(['"I don\'t understand" can mean four different things. Match the evidence to the need before you help.', '«لم أفهم» قد تعني أربعة أشياء مختلفة. طابق الدليل مع الحاجة قبل أن تساعد.']),
  discovers: ['need-help', 'see-why'],
  events: [
    {
      id: 'diagnose', kind: 'needs-help', on: 'sara', interaction: 'match',
      line: T(['Sara is stuck again on the second question.', 'سارة متعثّرة مرة أخرى عند السؤال الثاني.']),
      ask: T(['Match each piece of evidence to what it tells you, then decide.', 'طابقي كل دليل مع ما يدلّ عليه، ثم قرّري.']),
      task: {
        cards: [
          card('e1', ['Evidence', 'دليل'], ['Stops at the first step that needs simplifying.', 'تتوقّف عند أول خطوة تحتاج إلى تبسيط.']),
          card('e2', ['Evidence', 'دليل'], ['The same wrong pattern, three times: "+2 to both".', 'النمط الخاطئ نفسه ثلاث مرات: «+٢ للطرفين».']),
          card('e3', ['Evidence', 'دليل'], ['Copied the example neatly; her own attempt is blank.', 'نسخت المثال بترتيب، ومحاولتها فارغة.']),
          card('e4', ['Evidence', 'دليل'], ['Right, slowly, with a lot of crossing out.', 'صحيحة، ببطء، مع كثير من الشطب.']),
        ],
        targets: [
          card('t1', ['Interpretation', 'تفسير'], ['A missing prerequisite', 'متطلّب سابق ناقص']),
          card('t2', ['Interpretation', 'تفسير'], ['A misconception', 'فهم خاطئ']),
          card('t3', ['Interpretation', 'تفسير'], ['Needs another explanation', 'تحتاج إلى شرح آخر']),
          card('t4', ['Interpretation', 'تفسير'], ['Ready for independent practice', 'مستعدة للتدريب المستقل']),
        ],
        answer: { e1: 't1', e2: 't2', e3: 't3', e4: 't4' },
        note: T(['Where she stops, what she repeats, and what she can do alone each point to a different need.', 'أين تتوقّف، وماذا تكرّر، وماذا تستطيع وحدها: كلٌّ منها يشير إلى حاجة مختلفة.']),
      },
      investigate: {
        clues: [
          clue('work', ['Her work today', 'عملها اليوم'], ['Which of these does her page show?', 'أيّ هذه تُظهره ورقتها؟']),
        ],
        profiles: [
          uprofile('prerequisite', 1, 'u.l4:prerequisite', { work: ['She stops where 6:9 has to become 2:3.', 'تتوقّف حيث يجب أن تصبح ٦:٩ هي ٢:٣.'] }, 'u.sara:prerequisite'),
          uprofile('misconception', 1, 'u.l4:misconception', { work: ['"6:9 = 8:11", added again.', '«٦:٩ = ٨:١١»، جمعت مرة أخرى.'] }, 'u.sara:misconception'),
          uprofile('explanation', 1, 'u.l4:explanation', { work: ['Today\'s example copied, her own line blank.', 'مثال اليوم منسوخ، وسطرها فارغ.'] }, 'u.sara:explanation'),
          uprofile('carried', 1, 'u.l4:carried', { work: ['Yesterday\'s gap is back: she stops where simplifying starts.', 'عادت فجوة الأمس: تتوقّف حيث يبدأ التبسيط.'] }),
        ],
      },
      choices: [
        ch(['Guidance on the missing step only', 'توجيه في الخطوة الناقصة فقط'], ['Need Help', 'أحتاج مساعدة'], 'l4Step', { ifFlag: 'u.l4:prerequisite' }),
        ch(['Start the task; she\'ll pick it up', 'ابدئي المهمة، وستلحق'], ['Continue', 'متابعة'], 'l4Hope', { ifFlag: 'u.l4:prerequisite', minutes: 0 }),
        ch(['"Why does adding feel right?"', '«لماذا يبدو الجمع صحيحًا؟»'], ['See Why', 'اعرف السبب'], 'l4Why', { ifFlag: 'u.l4:misconception' }),
        ch(['Give her the rule again', 'أعيدي لها القاعدة'], ['Re-explain', 'إعادة الشرح'], 'l4Hope', { ifFlag: 'u.l4:misconception', minutes: 0 }),
        ch(['A different representation: a picture table', 'تمثيل مختلف: جدول بالصور'], ['Need Help', 'أحتاج مساعدة'], 'l4Picture', { ifFlag: 'u.l4:explanation' }),
        ch(['The same explanation, once more', 'الشرح نفسه، مرة أخرى'], ['Re-explain', 'إعادة الشرح'], 'l4Hope', { ifFlag: 'u.l4:explanation', minutes: 0 }),
        ch(['Guidance on the step she stops at', 'توجيه في الخطوة التي تتوقّف عندها'], ['Need Help', 'أحتاج مساعدة'], 'l4Step', { ifFlag: 'u.l4:carried' }),
        ch(['Let her keep trying alone', 'دعيها تحاول وحدها'], ['Continue', 'متابعة'], 'l4Hope', { ifFlag: 'u.l4:carried', minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('l4Step', 'good', ['One step, named', 'خطوة واحدة، بالاسم'], ['"Divide both by the same number." Just that. She does the rest of question 2 herself.', '«اقسمي الطرفين على العدد نفسه.» هذا فقط. وتُكمل بقية السؤال الثاني بنفسها.'], [fx('sara', 1, 1)], { xp: 30, discover: 'need-help', setFlag: 'u.saraDiagnosed' }),
    uout('l4Why', 'insight', ['"It feels fair"', '«يبدو عادلًا»'], ['"Adding the same keeps it fair." Now you know the idea to replace, not just the answer to fix.', '«إضافة العدد نفسه تُبقيها عادلة.» الآن تعرفين الفكرة التي يجب تغييرها، لا الإجابة فقط.'], [fx('sara', 1, 0)], { xp: 30, discover: 'see-why', setFlag: 'u.saraDiagnosed' }),
    uout('l4Picture', 'good', ['Pictures, then numbers', 'الصور، ثم الأعداد'], ['Two juice boxes, three biscuits, drawn twice. "So it\'s groups!" A different explanation, and it lands.', 'علبتا عصير وثلاث قطع بسكويت، مرسومة مرتين. «إذن هي مجموعات!» شرح مختلف، ووصل.'], [fx('sara', 1, 1)], { xp: 30, discover: 'need-help', setFlag: 'u.saraDiagnosed' }),
    uout('l4Hope', 'mixed', ['Hoping it clicks', 'على أمل أن تفهم'], ['She tries again, the same way. The need is still there; you know a little more about it.', 'تحاول مرة أخرى، بالطريقة نفسها. الحاجة ما زالت قائمة، لكنكِ تعرفين عنها أكثر قليلًا.'], [], { xp: 30 }),
  ],
});

/* ================================================================ L05 */
export const L05: UScenario = scenario({
  code: 'L05', kind: 'scenario', phase: 'launch', cooldown: 3, requires: { visited: ['L01'], notVisited: ['L05'] },
  title: T(['Choose the Right Start', 'اختاري البداية المناسبة']),
  takeaway: T(['Every opening activity has a purpose; match it to what your evidence says students need.', 'لكل نشاط افتتاحي غرض؛ طابقه مع ما تقوله أدلّتك عن حاجة الطلاب.']),
  discovers: ['assign'],
  events: [
    {
      id: 'starts', kind: 'new-event', on: 'laptop', interaction: 'sort',
      line: T(['Four ways to start today', 'أربع طرق لبدء الدرس اليوم']),
      ask: T(['Sort each opening activity by its purpose, then choose.', 'صنّفي كل نشاط افتتاحي حسب غرضه، ثم اختاري.']),
      task: {
        cards: [
          card('a1', ['Activity', 'نشاط'], ['Three warm-up questions on yesterday', 'ثلاثة أسئلة تمهيدية عن درس الأمس']),
          card('a2', ['Activity', 'نشاط'], ['"Where have you seen rates?"', '«أين رأيتم المعدّلات؟»']),
          card('a3', ['Activity', 'نشاط'], ['A puzzling price tag: which is the better deal?', 'بطاقة سعر محيّرة: أي عرض أوفر؟']),
          card('a4', ['Activity', 'نشاط'], ['An open problem for students who are ready', 'مسألة مفتوحة للمستعدين']),
        ],
        targets: [
          card('p1', ['Purpose', 'الغرض'], ['Check readiness', 'التحقّق من الاستعداد']),
          card('p2', ['Purpose', 'الغرض'], ['Activate prior knowledge', 'تنشيط المعرفة السابقة']),
          card('p3', ['Purpose', 'الغرض'], ['Spark curiosity', 'إثارة الفضول']),
          card('p4', ['Purpose', 'الغرض'], ['Stretch from the start', 'الإثراء من البداية']),
        ],
        answer: { a1: 'p1', a2: 'p2', a3: 'p3', a4: 'p4' },
        note: T(['The same five minutes can check, activate, spark or stretch. Today\'s evidence decides which you need, and it may differ by student.', 'الدقائق الخمس نفسها يمكن أن تتحقّق أو تنشّط أو تثير أو تُثري. وأدلّة اليوم تحدّد ما تحتاجينه، وقد يختلف من طالب لآخر.']),
      },
      choices: [
        ch(['Assign different starts to different students', 'كلّفي كل طالب ببداية مختلفة'], ['Assign', 'التكليف'], 'l5Different'),
        ch(['One warm-up for everyone', 'تمهيد واحد للجميع'], ['One start', 'بداية واحدة'], 'l5One', { minutes: 0 }),
        ch(['The fun one, for energy', 'النشاط الممتع، للطاقة'], ['Energy', 'طاقة'], 'l5Fun', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('l5Different', 'good', ['Three starts, one lesson', 'ثلاث بدايات، ودرس واحد'], ['The warm-up for those who need a check, the price tag for most, the open problem for the ready. Everyone starts where they are.', 'التمهيد لمن يحتاج إلى تحقّق، وبطاقة السعر لمعظم الصف، والمسألة المفتوحة للمستعدين. ويبدأ كلٌّ من حيث هو.'], [fx('ahmed', 0, 1), fx('sara', 0, 1)], { xp: 30, discover: 'assign', setFlag: 'u.differentiated' }),
    uout('l5One', 'mixed', ['Fair, and the same for all', 'عادل، ومتشابه للجميع'], ['Everyone does the warm-up. Ahmed finishes in a minute; Sara needs ten.', 'الجميع يحلّ التمهيد. أحمد ينهيه في دقيقة، وسارة تحتاج إلى عشر.'], [], { xp: 30 }),
    uout('l5Fun', 'mixed', ['Energy, without a purpose', 'طاقة، دون غرض'], ['The room wakes up. Nobody is closer to unit rates.', 'يستيقظ الصف. لكن لا أحد اقترب من معدّل الوحدة.'], [fx('omar', 0, 1)], { xp: 30 }),
  ],
});

export const LAUNCH = [L01, L02, L03, L04, L05];
