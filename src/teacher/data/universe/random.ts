/**
 * Random events R01–R06. Drawn from the pools like scenarios (R05 is not in
 * a pool: F01's "thinking visible" outcome triggers it when Omar is still a
 * non-volunteer). Random events vary what happens; outcomes still follow the
 * teacher's choice. R04 changes the budget, never which decisions are sound.
 * R06 gives an unresolved need a second chance: no state is unrecoverable.
 */
import { T, fx, uch, uout, scenario, NEEDS, type UScenario } from './kit';

export const R01: UScenario = scenario({
  code: 'R01', kind: 'random', phase: 'facilitate', cooldown: 4,
  requires: { anyFlags: ['u.ahmed:secure', 'u.stretch'], notVisited: ['R01'] },
  title: T(['The Unexpected Helper', 'المساعد غير المتوقّع']),
  takeaway: T(['A secure student can lift others, if the help keeps the thinking theirs.', 'الطالب المتمكّن يستطيع أن يرفع غيره، إن أبقت المساعدة التفكير لهم.']),
  events: [
    {
      id: 'helper', kind: 'unexpected', on: 'ahmed',
      line: T(['Ahmed leans over to Omar: "Want me to show you?"', 'يميل أحمد نحو عمر: «هل أريك؟»']),
      ask: T(['An unplanned peer explanation is starting.', 'شرح غير مخطّط بين زميلين يبدأ.']),
      choices: [
        uch(['"Help him by asking, not telling"', '«ساعده بالسؤال، لا بالإخبار»'], ['Coach the helper', 'وجّهي المساعد'], 'r1Ask'),
        uch(['Let Ahmed show him', 'دعي أحمد يريه'], ['Peer help', 'مساعدة الزميل'], 'r1Tell', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r1Ask', 'good', ['A helper who asks', 'مساعد يسأل'], ['"What did you do first?" Omar explains his own first step, then finds the next. Ahmed looks prouder than if he\'d solved it.', '«ماذا فعلت أولًا؟» يشرح عمر خطوته الأولى، ثم يجد التالية. ويبدو أحمد أكثر فخرًا مما لو حلّها بنفسه.'], [fx('omar', 1, 1), fx('ahmed', 0, 1)], { setFlag: 'u.peerVoice', studentDelta: [{ id: 'omar', key: 'confidence', delta: 1 }] }),
    uout('r1Tell', 'mixed', ['Shown the answer', 'أُريَ الإجابة'], ['Omar copies Ahmed\'s working neatly. Ask him why, and he looks at Ahmed.', 'ينسخ عمر حلّ أحمد بترتيب. اسأليه لماذا، فينظر إلى أحمد.'], []),
  ],
});

export const R02: UScenario = scenario({
  code: 'R02', kind: 'random', phase: 'facilitate', cooldown: 4,
  requires: { anyFlags: ['u.sara:misconception', 'u.omarGuess', 'u.l4:misconception'], notVisited: ['R02'] },
  opensNeeds: ['class-mis'],
  title: T(['The Misconception Ripple', 'تموّج الفهم الخاطئ']),
  takeaway: T(['When one student\'s mistake appears, check whether it is shared before you fix it for one.', 'حين يظهر خطأ طالب، تحقّق إن كان مشتركًا قبل أن تصحّحه لطالب واحد.']),
  events: [
    {
      id: 'ripple', kind: 'unexpected', on: 'board',
      line: T(['At the next table: "2:3 = 4:5". And at the one after.', 'على الطاولة المجاورة: «٢:٣ = ٤:٥». وعلى التي بعدها.']),
      ask: T(['The adding idea isn\'t only one student\'s.', 'فكرة الجمع ليست لدى طالب واحد فقط.']),
      choices: [
        uch(['Boards up: how many share it?', 'ارفعوا السبورات: كم منكم يفكّر هكذا؟'], ['Check the class', 'تحقّق من الصف'], 'r2Check'),
        uch(['Fix it for the student in front of you', 'صحّحيه للطالب الذي أمامكِ'], ['One at a time', 'واحدًا واحدًا'], 'r2One', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r2Check', 'insight', ['Eleven boards', 'إحدى عشرة سبورة'], ['Eleven boards say "add". It is a class need now, and you know its size.', 'إحدى عشرة سبورة تقول «اجمع». صارت حاجة لدى الصف، وأنتِ تعرفين حجمها.'], [], { setFlag: 'u.ripple' }),
    uout('r2One', 'mixed', ['One fixed, ten still adding', 'واحد صُحّح، وعشرة ما زالوا يجمعون'], ['The student in front of you gets it. The ripple keeps going behind you.', 'يفهم الطالب الذي أمامكِ. ويستمر التموّج خلفكِ.'], [], { setFlag: 'u.ripple' }),
  ],
});

export const R03: UScenario = scenario({
  code: 'R03', kind: 'random', phase: 'extend', cooldown: 4, requires: { notVisited: ['R03'] },
  title: T(['One More Question', 'سؤال واحد آخر']),
  takeaway: T(['More evidence is worth it only when it would change what you do next.', 'المزيد من الأدلة يستحق فقط حين يغيّر ما ستفعله بعد ذلك.']),
  events: [
    {
      id: 'more', kind: 'unexpected', on: 'board',
      line: T(['Two minutes left. One more question?', 'بقيت دقيقتان. سؤال واحد آخر؟']),
      ask: T(['Would another answer change tomorrow\'s plan?', 'هل ستغيّر إجابة أخرى خطة الغد؟']),
      choices: [
        uch(['One targeted question for the students you\'re unsure about', 'سؤال موجّه للطلاب الذين لستِ متأكدة منهم'], ['Targeted check', 'تحقّق موجّه'], 'r3Target'),
        uch(['Enough evidence: close calmly', 'الأدلة كافية: اختمي بهدوء'], ['Close', 'الختام'], 'r3Close', { minutes: 0 }),
        uch(['A quick quiz for everyone', 'اختبار سريع للجميع'], ['Quiz all', 'اختبار للجميع'], 'r3Quiz', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r3Target', 'good', ['The answer that changes the plan', 'الإجابة التي تغيّر الخطة'], ['Three students, one question. Two of them can do it now; tomorrow\'s small group shrinks to one.', 'ثلاثة طلاب، وسؤال واحد. اثنان منهم يستطيعان الآن، فتتقلّص مجموعة الغد الصغيرة إلى واحد.'], [], { setFlag: 'u.evidence' }),
    uout('r3Close', 'good', ['A calm ending', 'ختام هادئ'], ['You had what you needed. The class leaves on a summary, not a scramble.', 'كان لديكِ ما تحتاجينه. ويغادر الصف على خلاصة، لا على عجلة.'], []),
    uout('r3Quiz', 'mixed', ['Evidence nobody will use', 'أدلّة لن يستخدمها أحد'], ['Twenty-four answers to a question you already knew the answer to.', 'أربع وعشرون إجابة عن سؤال كنتِ تعرفين جوابه.'], []),
  ],
});

export const R04: UScenario = scenario({
  code: 'R04', kind: 'random', phase: 'facilitate', cooldown: 5, budgetDelta: -1, requires: { notVisited: ['R04'] },
  title: T(['Time Squeeze', 'ضيق الوقت']),
  takeaway: T(['Less time changes how much you do, not what a sound decision is.', 'الوقت الأقل يغيّر كم تفعل، لا ما هو القرار السليم.']),
  events: [
    {
      id: 'squeeze', kind: 'unexpected', on: 'laptop',
      line: T(['Assembly ran over. Ten minutes are gone.', 'طال الطابور الصباحي. ضاعت عشر دقائق.']),
      ask: T(['There is less lesson left than you planned. What do you keep?', 'بقي من الدرس أقل مما خطّطتِ. ماذا تُبقين؟']),
      choices: [
        uch(['Keep the key check; drop the extra task', 'أبقي التحقّق الأساسي، واحذفي المهمة الإضافية'], ['Prioritise', 'الأولويات'], 'r4Keep'),
        uch(['Rush everything as planned', 'أسرعي في كل شيء كما خُطّط'], ['Rush', 'الاستعجال'], 'r4Rush', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r4Keep', 'good', ['Less, but the right less', 'أقل، لكنه الأقل الصحيح'], ['The extra task goes to tomorrow. The check that tells you who learned stays.', 'تنتقل المهمة الإضافية إلى الغد. ويبقى التحقّق الذي يخبركِ من تعلّم.'], []),
    uout('r4Rush', 'mixed', ['Everything, half done', 'كل شيء، نصفه منجز'], ['Every part of the plan happens, and none of it properly.', 'كل أجزاء الخطة تحدث، ولا شيء منها كما ينبغي.'], [fx('sara', 0, -1)]),
  ],
});

export const R05: UScenario = scenario({
  code: 'R05', kind: 'random', phase: 'facilitate', cooldown: 4,
  requires: { student: [{ id: 'omar', key: 'participation', max: 1 }], notVisited: ['R05'] },
  title: T(['Quiet Confidence', 'ثقة هادئة']),
  takeaway: T(['A non-volunteer may understand more than you expect: make room for it to be seen.', 'من لا يتطوّع قد يفهم أكثر مما تتوقّع: أفسح المجال ليظهر ذلك.']),
  events: [
    {
      id: 'quiet', kind: 'unexpected', on: 'omar',
      line: T(['Omar\'s board has the clearest method in the room.', 'سبورة عمر عليها أوضح طريقة في الصف.']),
      ask: T(['He hasn\'t put his hand up once this week.', 'لم يرفع يده مرة واحدة هذا الأسبوع.']),
      choices: [
        uch(['"Can I share your method, with your name?"', '«هل أشارك طريقتك، باسمك؟»'], ['Make it visible', 'إظهارها'], 'r5Share'),
        uch(['Call on him to explain it now', 'اطلبي منه أن يشرحها الآن'], ['Call on him', 'النداء بالاسم'], 'r5Call', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r5Share', 'good', ['His method, his name', 'طريقته، باسمه'], ['"Omar compared one each, like this." He looks down, and he\'s smiling. Two students copy his table.', '«عمر قارن سعر الواحدة، هكذا.» ينظر إلى الأسفل، وهو يبتسم. وينسخ طالبان جدوله.'], [fx('omar', 1, 2)], { setFlag: 'u.quietConfidence', closesNeeds: ['omar-voice'], studentDelta: [{ id: 'omar', key: 'confidence', delta: 1 }, { id: 'omar', key: 'participation', delta: 1 }] }),
    uout('r5Call', 'mixed', ['Too far, too fast', 'أبعد وأسرع مما ينبغي'], ['He goes red and says "I don\'t know". The board says he does.', 'يحمرّ وجهه ويقول «لا أعرف». والسبورة تقول إنه يعرف.'], [fx('omar', 0, -1)]),
  ],
});

export const R06: UScenario = scenario({
  code: 'R06', kind: 'random', phase: 'extend', cooldown: 4,
  requires: { anyUnresolved: [...NEEDS], notVisited: ['R06'] },
  title: T(['Second Chance', 'فرصة ثانية']),
  takeaway: T(['An unresolved need is not a failure: it is the next thing to come back to.', 'الحاجة غير المحلولة ليست فشلًا: إنها الشيء التالي الذي نعود إليه.']),
  events: [
    {
      id: 'again', kind: 'unexpected', on: 'board',
      line: T(['A few minutes open up before the bell.', 'تتاح بضع دقائق قبل الجرس.']),
      ask: T(['Something from earlier is still unresolved. Come back to it?', 'ما زال شيء من وقت سابق دون حل. هل تعودين إليه؟']),
      choices: [
        uch(['Sara gets one more attempt, with her table beside her', 'سارة تأخذ محاولة أخرى، وجدولها بجانبها'], ['Second chance', 'فرصة ثانية'], 'r6Sara', { ifUnresolved: 'sara-gap' }),
        uch(['Omar rehearses with a partner, then answers', 'يتدرّب عمر مع زميل، ثم يجيب'], ['Second chance', 'فرصة ثانية'], 'r6Omar', { ifUnresolved: 'omar-voice' }),
        uch(['Ask Ahmed to explain the bulk-pack question', 'اطلبي من أحمد أن يشرح سؤال العبوة الكبيرة'], ['Second chance', 'فرصة ثانية'], 'r6Ahmed', { ifUnresolved: 'ahmed-evidence' }),
        uch(['Two-minute class check on the adding mistake', 'تحقّق صفّي في دقيقتين من خطأ الجمع'], ['Second chance', 'فرصة ثانية'], 'r6Class', { ifUnresolved: 'class-mis' }),
        uch(['Note it for tomorrow', 'دوّنيها للغد'], ['Tomorrow', 'الغد'], 'r6Later', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('r6Sara', 'good', ['She gets there', 'تصل'], ['With her own table beside her, she solves a new one alone. "I did it without you!"', 'وجدولها بجانبها، تحلّ مسألة جديدة وحدها. «حللتها من دونكِ!»'], [fx('sara', 1, 2)], { closesNeeds: ['sara-gap'], studentDelta: [{ id: 'sara', key: 'understanding', delta: 1 }, { id: 'sara', key: 'confidence', delta: 1 }] }),
    uout('r6Omar', 'good', ['His voice, rehearsed', 'صوته، بعد التدرّب'], ['One rehearsal with a partner, then one sentence to the class. Right, and heard.', 'تدرّب واحد مع زميل، ثم جملة واحدة للصف. صحيحة، ومسموعة.'], [fx('omar', 0, 2)], { closesNeeds: ['omar-voice'], studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] }),
    uout('r6Ahmed', 'good', ['The reasoning, checked', 'التعليل، بعد التحقّق'], ['"Cost divided by boxes, always." His rule is fixed, and now you have evidence it is.', '«الثمن على عدد العلب، دائمًا.» صُحّحت قاعدته، وصار لديكِ دليل على ذلك.'], [fx('ahmed', 1, 0)], { closesNeeds: ['ahmed-evidence'], setFlag: 'u.evidence' }),
    uout('r6Class', 'good', ['Boards up, again', 'السبورات مرفوعة، مرة أخرى'], ['Two boards still say "add", down from eleven.', 'سبورتان فقط ما زالتا تقولان «اجمع»، بعد أن كانت إحدى عشرة.'], [], { closesNeeds: ['class-mis'], setFlag: 'u.evidence' }),
    uout('r6Later', 'mixed', ['Tomorrow, then', 'غدًا، إذن'], ['It goes on tomorrow\'s plan. It will still be there.', 'تُضاف إلى خطة الغد. وستبقى هناك.'], []),
  ],
});

export const RANDOM = [R01, R02, R03, R04, R05, R06];
