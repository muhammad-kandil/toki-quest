/**
 * WORLD 5 — Questioning for Thinking
 * Theme: When Questions Lose Their Power
 * Core idea: the quality of learning depends on the quality of thinking.
 */
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneGam from '../../assets/scenes/classroom-5-gamification.jpg';
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import type { LevelDefinition } from '../levelTypes';
import type { ConversationDefinition } from '../conversationTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

/** 51 — Guess What I’m Thinking. Ms. Salma, second year, fresh from the questioning course. */
const CONVO_51: ConversationDefinition = {
  teacherName: t('Ms. Salma', 'الأستاذة سلمى'),
  stance: 'eager',
  setting: t('Still at the board, marker in hand. She wants to know how the questioning looked from the back.', 'ما زالت عند السبورة، والقلم في يدها. تريد أن تعرف كيف بدا طرح الأسئلة من الخلف.'),
  read: t('Improving fast, and she took the questioning course last month. Fourteen questions in ten minutes is her applying it, proudly.', 'تتحسن بسرعة، وحضرت دورة طرح الأسئلة الشهر الماضي. أربعة عشر سؤالًا في عشر دقائق هي تطبيقها لها، بفخر.'),
  turns: [
    {
      teacherLine: t('I am trying to ask way more questions this term, like the course said. Did it look like they were engaged?', 'أحاول طرح أسئلة أكثر بكثير هذا الفصل، كما قالت الدورة. هل بدا أنهم متفاعلون؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Hands everywhere. One thing I noticed: on "what do we call this process", four students guessed four words. What were they looking at while they guessed?', 'أيدٍ في كل مكان. شيء واحد لاحظته: في «ماذا نسمّي هذه العملية»، خمّن أربعة طلاب أربع كلمات. إلامَ كانوا ينظرون وهم يخمّنون؟'), reply: t('…Me. They were looking at me. Not the diagram. Huh.', '…إليّ. كانوا ينظرون إليّ. لا إلى الرسم. همم.') },
        { id: 'b', effect: 'neutral', label: t('Really engaged. The number of questions is a huge step up from last term.', 'متفاعلون جدًا. عدد الأسئلة قفزة كبيرة عن الفصل الماضي.'), reply: t('Fourteen! I counted. The course said aim for ten.', 'أربعة عشر! عددتها. الدورة قالت استهدفي عشرة.') },
        { id: 'c', effect: 'closes', label: t('Engaged in guessing. Those were closed questions — one word each. The course should have covered question types.', 'متفاعلون في التخمين. كانت تلك أسئلة مغلقة — كلمة واحدة لكل منها. كان ينبغي أن تغطي الدورة أنواع الأسئلة.'), reply: t('It did cover them. I thought I was doing it right. Okay.', 'غطّتها فعلًا. ظننت أنني أفعل الصواب. حسنًا.') },
      ],
    },
    {
      teacherLine: t('So the questions are wrong? I planned every one of them.', 'يعني الأسئلة خاطئة؟ خططت كل واحد منها.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Keep every one. Change the shape of three: "what is it called?" becomes "what is going on in this diagram, and how can you tell?" Same plan, nothing to guess.', 'احتفظي بكل واحد. غيّري شكل ثلاثة: «ماذا يُسمّى؟» يصبح «ماذا يحدث في هذا الرسم، وكيف تعرف؟» الخطة نفسها، ولا شيء للتخمين.'), reply: t('"How can you tell." They would have to look at the diagram for that. Can I try it tomorrow and you come back?', '«كيف تعرف.» سيضطرون إلى النظر إلى الرسم من أجل ذلك. هل أجرّبها غدًا وتعود أنت؟') },
        { id: 'b', effect: 'neutral', label: t('Not wrong — maybe mix in a few open ones. Variety is good.', 'ليست خاطئة — ربما أدخلي بعض الأسئلة المفتوحة. التنوّع جيد.'), reply: t('I will add some. Open ones. Like "what do you think?"', 'سأضيف بعضها. مفتوحة. مثل «ما رأيك؟»') },
        { id: 'c', effect: 'closes', label: t('Fewer questions, better questions. Fourteen in ten minutes is quantity over quality.', 'أسئلة أقل، أسئلة أفضل. أربعة عشر في عشر دقائق كمّ على حساب الكيف.'), reply: t('The course literally said more. I do not know who to listen to anymore.', 'الدورة قالت حرفيًا المزيد. لم أعد أعرف لمن أصغي.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Three of the fourteen now start with "what is happening, and how can you tell". The guessing stopped on those three. She is rewriting the other eleven herself.', 'ثلاثة من الأربعة عشر تبدأ الآن بـ«ماذا يحدث، وكيف تعرف». توقف التخمين في تلك الثلاثة. وهي تعيد كتابة الأحد عشر الأخرى بنفسها.'),
    partial: t('"What do you think?" was added. Students think whatever the teacher’s face suggests. The guessing continues, with a wider vocabulary.', 'أُضيف «ما رأيك؟». يفكّر الطلاب فيما توحي به ملامح المعلّمة. يستمر التخمين، بمفردات أوسع.'),
    unchanged: t('She asks eight questions now instead of fourteen. All eight want one word. She stopped asking Toki for feedback.', 'تطرح ثمانية أسئلة الآن بدلًا من أربعة عشر. الثمانية كلها تريد كلمة واحدة. توقفت عن طلب التغذية الراجعة من توكي.'),
  },
};

/** 52 — The Same Three Students. Mr. Adel loves a good argument, and three students can give him one. */
const CONVO_52: ConversationDefinition = {
  teacherName: t('Mr. Adel', 'الأستاذ عادل'),
  stance: 'proud',
  setting: t('The corridor outside. Students are still arguing about the text as they leave. He is beaming.', 'الممر في الخارج. الطلاب ما زالوا يتجادلون حول النص وهم يغادرون. وهو يبتسم بفخر.'),
  read: t('He has built a class where three students can argue with him about a text. He is not wrong that it was good; he has not counted the other twenty-two.', 'بنى صفًا يستطيع فيه ثلاثة طلاب أن يجادلوه في نص. هو ليس مخطئًا في أنه كان جيدًا؛ لكنه لم يعدّ الاثنين والعشرين الآخرين.'),
  turns: [
    {
      teacherLine: t('Did you hear Noor on the ending? Half the English department could not argue that well. This is what discussion is supposed to be.', 'هل سمعت نور عن النهاية؟ نصف قسم الإنجليزية لا يستطيع الجدال بهذه الجودة. هذا ما يفترض أن يكون عليه النقاش.'),
      options: [
        { id: 'a', effect: 'opens', label: t('It was. I counted: nineteen of the last twenty-one answers came from Noor, Saif and Maha. Can I tell you what Yousef said when I asked him the last question privately?', 'كان كذلك. عددت: تسع عشرة من آخر إحدى وعشرين إجابة جاءت من نور وسيف ومها. هل أخبرك بما قاله يوسف حين سألته السؤال الأخير على انفراد؟'), reply: t('Yousef? Yousef does not… go on. What did he say?', 'يوسف؟ يوسف لا… تابع. ماذا قال؟') },
        { id: 'b', effect: 'neutral', label: t('The level of that discussion was the best I have heard this week. You have set a high bar.', 'مستوى ذلك النقاش كان الأفضل الذي سمعته هذا الأسبوع. وضعت معيارًا عاليًا.'), reply: t('They raise it themselves. I just choose the text.', 'هم يرفعونه بأنفسهم. أنا فقط أختار النص.') },
        { id: 'c', effect: 'closes', label: t('Three students had a discussion. Twenty-two watched it. That is a performance, not a lesson.', 'ثلاثة طلاب أجروا نقاشًا. اثنان وعشرون شاهدوه. هذا أداء، لا درس.'), reply: t('A performance. The other twenty-two are welcome to join any time. Nobody is stopping them.', 'أداء. الاثنان والعشرون الآخرون مرحّب بهم في أي وقت. لا أحد يمنعهم.') },
      ],
    },
    {
      teacherLine: t('Fine — Yousef had something. He never puts his hand up. What am I supposed to do, ban Noor from speaking?', 'حسنًا — كان لدى يوسف شيء. لا يرفع يده أبدًا. ماذا يفترض أن أفعل، أمنع نور من الكلام؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Keep Noor. Before any hand goes up: thirty seconds to write, one minute with a partner, then you pick who shares. Yousef has a sentence ready; Noor has a better one.', 'احتفظ بنور. قبل أن تُرفع أي يد: ثلاثون ثانية للكتابة، دقيقة مع زميل، ثم تختار أنت مَن يشارك. يوسف لديه جملة جاهزة؛ ونور لديها جملة أفضل.'), reply: t('Write, talk, then I choose. Noor will hate the waiting. …Yousef would have something written. Yes.', 'اكتب، تحدّث، ثم أختار. ستكره نور الانتظار. …سيكون لدى يوسف شيء مكتوب. نعم.') },
        { id: 'b', effect: 'neutral', label: t('Maybe give Noor, Saif and Maha a job — summariser, challenger — so their energy serves the others.', 'ربما أعطِ نور وسيف ومها دورًا — ملخِّص، محاوِر — لتخدم طاقتهم الآخرين.'), reply: t('Roles. They would enjoy that. Noor would want challenger.', 'أدوار. سيستمتعون بذلك. نور ستريد دور المحاوِر.') },
        { id: 'c', effect: 'closes', label: t('Cold-call from a list. Nobody answers unless called, including Noor.', 'نادِ بالأسماء من قائمة. لا أحد يجيب إلا إن نودي، بمن فيهم نور.'), reply: t('A list. I have spent two years getting them to talk, and the fix is a list.', 'قائمة. قضيت عامين أجعلهم يتكلمون، والحل قائمة.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Write, pair, then the teacher chooses. Yousef spoke on Tuesday for the first time since September. Noor still argues about the ending — now with people who have written something.', 'اكتب، زاوج، ثم يختار المعلّم. تحدث يوسف يوم الثلاثاء للمرة الأولى منذ سبتمبر. ما زالت نور تجادل حول النهاية — والآن مع أناس كتبوا شيئًا.'),
    partial: t('Noor is the challenger, Saif summarises. The three still carry the discussion, now with titles. Yousef has not spoken.', 'نور هي المحاوِرة، وسيف يلخّص. ما زال الثلاثة يحملون النقاش، والآن بألقاب. يوسف لم يتكلم.'),
    unchanged: t('No list was made. The discussion is as brilliant as ever and the same three run it. He mentioned to a colleague that the coach does not understand literature.', 'لم تُعدّ قائمة. النقاش رائع كما كان دائمًا ويديره الثلاثة أنفسهم. ذكر لزميل أن المدرّب لا يفهم الأدب.'),
  },
};

/** 53 — Rapid Fire. Ms. Dana, whose lessons fly and whose students never sleep. */
const CONVO_53: ConversationDefinition = {
  teacherName: t('Ms. Dana', 'الأستاذة دانة'),
  stance: 'eager',
  setting: t('Packing up at speed, as she does everything. "Was it too fast? People say it is too fast."', 'تحزم أغراضها بسرعة، كما تفعل كل شيء. «هل كان سريعًا جدًا؟ يقول الناس إنه سريع جدًا.»'),
  read: t('Her pace is her gift. Students are never bored in here and she knows it. She half-expects to be told to slow down, and she has heard that before.', 'إيقاعها موهبتها. الطلاب لا يملّون هنا أبدًا وهي تعرف ذلك. تتوقع إلى حد ما أن يُطلب منها الإبطاء، وقد سمعت ذلك من قبل.'),
  turns: [
    {
      teacherLine: t('Ten questions, ten answers, nobody drifting off. If I slow down I lose the back row in a minute. I have tried.', 'عشرة أسئلة، عشر إجابات، لا أحد يسرح. إن أبطأت أخسر الصف الخلفي في دقيقة. جرّبت.'),
      options: [
        { id: 'a', effect: 'opens', label: t('You would, and the pace is worth keeping. Can I replay one moment? "Why?" — "Because it is negative." — "Good, next." What was inside that "because"?', 'ستخسرينه، والإيقاع يستحق الحفاظ عليه. هل أعيد لحظة واحدة؟ «لماذا؟» — «لأنه سالب.» — «جيد، التالي.» ماذا كان داخل تلك الـ«لأن»؟'), reply: t('…I do not know. I did not ask. I heard "negative" and it was right, so I moved.', '…لا أعرف. لم أسأل. سمعت «سالب» وكانت صحيحة، فانتقلت.') },
        { id: 'b', effect: 'neutral', label: t('Honestly, the energy is a strength. Most classrooms would kill for that attention.', 'بصراحة، الطاقة نقطة قوة. معظم الصفوف تتمنى هذا الانتباه.'), reply: t('Thank you. I know some people think it is a circus.', 'شكرًا. أعرف أن بعض الناس يظنونه سيركًا.') },
        { id: 'c', effect: 'closes', label: t('Nobody is drifting off, and nobody is thinking either. Four-word answers are recall, not reasoning.', 'لا أحد يسرح، ولا أحد يفكّر أيضًا. إجابات من أربع كلمات استرجاع، لا تعليل.'), reply: t('Not thinking. Right. Come and watch the "thinking" classroom next door; bring a pillow.', 'لا يفكّرون. طيّب. تعال وشاهد صف «التفكير» المجاور؛ أحضر وسادة.') },
      ],
    },
    {
      teacherLine: t('So I stop and dig into every answer? That is three questions a lesson and the back row asleep by the second.', 'يعني أتوقف وأتعمّق في كل إجابة؟ هذه ثلاثة أسئلة في الحصة والصف الخلفي نائم عند الثاني.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Not every one — pick three. After the answer: "say more", then "Khalid, build on that." The pace stays; the answer goes somewhere instead of being waved through.', 'ليس كلها — اختاري ثلاثة. بعد الإجابة: «قولي المزيد»، ثم «خالد، ابنِ على ذلك.» يبقى الإيقاع؛ وتذهب الإجابة إلى مكان ما بدلًا من أن تُمرَّر.'), reply: t('"Build on that." That is still fast. That is a relay, not a stop. I can do a relay.', '«ابنِ على ذلك.» هذا ما زال سريعًا. هذا تتابع، لا توقّف. أستطيع التتابع.') },
        { id: 'b', effect: 'neutral', label: t('Keep all ten, maybe add a short written explanation at the end of the lesson.', 'احتفظي بالعشرة كلها، وربما أضيفي تفسيرًا مكتوبًا قصيرًا في نهاية الحصة.'), reply: t('A plenary task. Fine, if there is time at the end. There usually is not.', 'مهمة ختامية. طيّب، إن كان هناك وقت في النهاية. وعادة لا يكون.') },
        { id: 'c', effect: 'closes', label: t('Three seconds of wait time before every answer would fix most of it. It is a well-known technique.', 'ثلاث ثوانٍ من الانتظار قبل كل إجابة ستصلح معظمه. إنها تقنية معروفة.'), reply: t('I know the technique. I was doing it before you were coaching. It does not work in here.', 'أعرف التقنية. كنت أطبّقها قبل أن تبدأ أنت التدريب. لا تنجح هنا.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Three relays a lesson: answer, "say more", "build on that". The pace is untouched. The student with the different method finished his sentence on Wednesday and the class heard it.', 'ثلاثة تتابعات في الحصة: إجابة، «قولي المزيد»، «ابنِ على ذلك». الإيقاع كما هو. أنهى الطالب صاحب الطريقة المختلفة جملته يوم الأربعاء وسمعها الصف.'),
    partial: t('A written explanation task sits at the end of the plan. It has run twice in three weeks. The "because" is still four words.', 'مهمة التفسير المكتوب في نهاية الخطة. نُفّذت مرتين في ثلاثة أسابيع. «لأن» ما زالت أربع كلمات.'),
    unchanged: t('Ten questions, four-word answers, "good, next". She told the head of department the coaching was "the usual slow-down talk".', 'عشرة أسئلة، إجابات من أربع كلمات، «جيد، التالي». أخبرت رئيسة القسم أن التدريب كان «حديث الإبطاء المعتاد».'),
  },
};

/** 54 — No Wait Time. Mr. Rashed runs a sharp room and has been told so, often. */
const CONVO_54: ConversationDefinition = {
  teacherName: t('Mr. Rashed', 'الأستاذ راشد'),
  stance: 'defensive',
  setting: t('By the door as the class files out. He has already heard from the corridor that Toki was timing something.', 'عند الباب بينما يخرج الصف. سمع من الممر بالفعل أن توكي كان يوقّت شيئًا ما.'),
  read: t('Twelve years, a reputation for a responsive, sharp classroom, and two observers in his file who wrote "excellent questioning". He is not expecting a third opinion.', 'اثنا عشر عامًا، وسمعة بصف متجاوب وحاد، ومراقبان في ملفه كتبا «طرح أسئلة ممتاز». لا يتوقع رأيًا ثالثًا.'),
  turns: [
    {
      teacherLine: t('You were timing me. Go on, then. The answers come fast because they know the material. That is the point of teaching it well.', 'كنت توقّتني. تفضّل إذًا. الإجابات تأتي سريعًا لأنهم يعرفون المادة. هذا هو الهدف من تدريسها جيدًا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They do know it — the answers were right every time. I was timing the hands, not the answers. Nine went up after the name was called. Who were they?', 'يعرفونها فعلًا — كانت الإجابات صحيحة في كل مرة. كنت أوقّت الأيدي، لا الإجابات. تسع أيدٍ ارتفعت بعد أن نودي الاسم. مَن كانوا؟'), reply: t('Nine. …The middle rows, probably. Latifa. She is always a second behind.', 'تسع. …الصفوف الوسطى، على الأرجح. لطيفة. دائمًا متأخرة بثانية.') },
        { id: 'b', effect: 'neutral', label: t('I was — and the room is sharp. The observers were right about the questioning.', 'كنت أوقّت — والصف حاد. كان المراقبون على حق بشأن طرح الأسئلة.'), reply: t('Two of them. Both wrote excellent. You can add a third if you like.', 'اثنان منهم. كلاهما كتب ممتاز. تستطيع إضافة ثالث إن شئت.') },
        { id: 'c', effect: 'closes', label: t('0.8 seconds from question to name. That is not questioning, it is a reflex test for the four fastest hands.', '٠٫٨ ثانية من السؤال إلى الاسم. هذا ليس طرح أسئلة، بل اختبار ردود فعل لأسرع أربع أيدٍ.'), reply: t('A reflex test. Twelve years. Write that down for the file with the other two.', 'اختبار ردود فعل. اثنا عشر عامًا. اكتب ذلك في الملف مع الاثنين الآخرين.') },
      ],
    },
    {
      teacherLine: t('Latifa gets there. Slowly. You want me to hold the whole class for one student?', 'لطيفة تصل. ببطء. تريدني أن أوقف الصف كله من أجل طالبة واحدة؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('For nine. Try one thing tomorrow: ask, count three on your fingers, then the name. Same questions, same students. Watch whose hand is up at three.', 'من أجل تسعة. جرّب شيئًا واحدًا غدًا: اسأل، عدّ ثلاثة على أصابعك، ثم الاسم. الأسئلة نفسها، الطلاب أنفسهم. راقب مَن يده مرفوعة عند الثلاثة.'), reply: t('Three fingers. …That is nothing. That is one breath. Fine. Tomorrow. Come and count the hands yourself.', 'ثلاثة أصابع. …هذا لا شيء. هذا نفَس واحد. طيّب. غدًا. تعال وعدّ الأيدي بنفسك.') },
        { id: 'b', effect: 'neutral', label: t('Not hold the class — maybe just make sure the same four are not always first.', 'ليس إيقاف الصف — ربما فقط تأكّد من أن الأربعة أنفسهم ليسوا دائمًا الأوائل.'), reply: t('I can spread it around. I do, mostly.', 'أستطيع التوزيع. أفعل ذلك، في الغالب.') },
        { id: 'c', effect: 'closes', label: t('Ask yourself what the question is for. If it only reaches four students, it is not doing its job.', 'اسأل نفسك ما الغاية من السؤال. إن كان يصل إلى أربعة طلاب فقط، فهو لا يؤدي وظيفته.'), reply: t('I know what a question is for. I will take the feedback from the file, thanks.', 'أعرف ما الغاية من السؤال. سآخذ التغذية الراجعة من الملف، شكرًا.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Three fingers after every question. By Thursday the fingers were a habit and the first hand up was Latifa’s, twice. He asked Toki to come back and count again.', 'ثلاثة أصابع بعد كل سؤال. بحلول الخميس صارت الأصابع عادة وكانت أول يد مرفوعة يد لطيفة، مرتين. طلب من توكي العودة والعدّ مجددًا.'),
    partial: t('He spreads the answers around a little more. The name still comes in under a second. Latifa’s hand goes down after the first question, as before.', 'يوزّع الإجابات أكثر قليلًا. ما زال الاسم يأتي في أقل من ثانية. تنزل يد لطيفة بعد السؤال الأول، كما من قبل.'),
    unchanged: t('Nothing changed and the file has a third observation in it. Toki is not sure it will be read, either.', 'لم يتغير شيء وفي الملف ملاحظة ثالثة. توكي ليس متأكدًا من أنها ستُقرأ هي الأخرى.'),
  },
};

export const LEVEL_51: LevelDefinition = {
  id: 51,
  title: t('Guess What I’m Thinking', 'خمّن ما أفكّر فيه'),
  theme: t('Answering ≠ Reasoning', 'الإجابة ≠ التعليل'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneTalk,
  scenario: t(
    'The teacher asks a lot of questions, and students answer them eagerly. But Toki notices a rhythm: a question, three or four guesses, "not quite… closer… yes!" — until someone lands on the word the teacher had in mind. The class is good at it. Toki listens to what the questions are asking for.',
    'تطرح المعلّمة أسئلة كثيرة، ويجيب الطلاب عنها بحماس. لكن توكي يلاحظ إيقاعًا: سؤال، ثلاثة أو أربعة تخمينات، «ليس تمامًا… أقرب… نعم!» — حتى يصل أحدهم إلى الكلمة التي في ذهن المعلّمة. الصف بارع في ذلك. يُنصت توكي لما تطلبه الأسئلة.',
  ),
  evidence: [
    { id: 'question', x: 50, y: 28, label: t('A question', 'سؤال'), clue: t('"What do we call this process?" One word wanted. Four students guess words.', '«ماذا نسمّي هذه العملية؟» المطلوب كلمة واحدة. يخمّن أربعة طلاب كلمات.') },
    { id: 'student', x: 24, y: 66, label: t('A student', 'طالب'), clue: t('Hand up, then down, then up: she’s watching the teacher’s face, not thinking about the diagram.', 'يد مرفوعة، ثم منخفضة، ثم مرفوعة: إنها تراقب وجه المعلّمة لا تفكّر في الرسم.') },
    { id: 'reasons', x: 78, y: 64, label: t('Toki’s tally', 'إحصاء توكي'), clue: t('Fourteen questions in ten minutes. Number that began with "why" or "how do you know": zero.', 'أربعة عشر سؤالًا في عشر دقائق. عدد ما بدأ منها بـ«لماذا» أو «كيف تعرف»: صفر.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Students are answering constantly. What should Toki examine?', 'يجيب الطلاب باستمرار. ما الذي ينبغي أن يفحصه توكي؟'),
      options: [
        { id: 'wait', label: t('How long students get between the question and the first guess', 'كم من الوقت يحصل الطلاب بين السؤال والتخمين الأول') },
        { id: 'number', label: t('How many different students get to answer', 'كم طالبًا مختلفًا يحصل على فرصة الإجابة') },
        { id: 'openness', label: t('Whether the questions have one answer in mind or many possible ones', 'هل للأسئلة إجابة واحدة في ذهن المعلّمة أم إجابات ممكنة عدّة') },
        { id: 'vocab', label: t('Whether students have been taught the vocabulary the questions require', 'هل دُرّس الطلاب المفردات التي تتطلّبها الأسئلة') },
      ],
      correctId: 'openness',
      hint: t('The student clue: she is watching the teacher’s face, not the diagram. What would a question have to be like for her face-watching to pay off?', 'دليل الطالبة: تراقب وجه المعلّمة لا الرسم. كيف ينبغي أن يكون السؤال حتى تؤتي مراقبة الوجه ثمارها؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('Fourteen questions in ten minutes, students eager to answer. Is the questioning habit damaged, or is it pointed somewhere that only needs redirecting?', 'أربعة عشر سؤالًا في عشر دقائق، وطلاب متحمّسون للإجابة. هل عادة طرح الأسئلة متضررة، أم أنها موجَّهة إلى مكان يحتاج فقط إلى إعادة التوجيه؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'pre-teach', label: t('Pre-teach the key terms so the guessing stops and the answers come faster', 'درّس المصطلحات الأساسية مسبقًا ليتوقف التخمين وتأتي الإجابات أسرع') },
        { id: 'no-hands', label: t('Cold-call instead of taking guesses, so every student has to be ready with an answer', 'نادِ بالاسم بدل أخذ التخمينات، ليكون كل طالب مستعدًا') },
        { id: 'accept', label: t('Accept the first reasonable answer instead of fishing for the exact word', 'اقبل أول إجابة معقولة بدل الصيد عن الكلمة الدقيقة') },
        { id: 'reframe', label: t('Same questions, new shape: "what is it called?" becomes "what is happening here, and why?"', 'احتفظ بالأسئلة وغيّر شكلها: من «ماذا تُسمّى؟» إلى «ما الذي يحدث هنا، ولماذا؟»') },
      ],
      correctId: 'reframe',
      hint: t('Three of these change how fast the guessing ends or who guesses. Look at Toki’s tally: zero "how do you know". Which move changes the question itself?', 'ثلاث من هذه تغيّر سرعة انتهاء التخمين أو مَن يخمّن. انظر إلى إحصاء توكي: صفر «كيف تعرف». أي خطوة تغيّر السؤال نفسه؟'),
    },
    reasoning: {
      prompt: t('Why change the shape of the question rather than the amount?', 'لماذا نغيّر شكل السؤال لا كمّه؟'),
      options: [
        { id: 'r1', label: t('A "why" question cannot be answered by watching the teacher’s face', 'سؤال «لماذا» لا يمكن الإجابة عنه بمراقبة وجه المعلّمة') },
        { id: 'r3', label: t('Open questions give the four guessers less to guess and the rest more to say', 'تمنح الأسئلة المفتوحة المخمّنين الأربعة أقل ليخمّنوا والبقية أكثر ليقولوه') },
        { id: 'r2', label: t('A guessing game trains students to read the teacher, not the content', 'لعبة التخمين تدرّب الطلاب على قراءة المعلّمة لا المحتوى') },
        { id: 'r4', label: t('The right word matters less than the reasoning that leads to it', 'الكلمة الصحيحة أقل أهمية من التعليل الذي يقود إليها') },
      ],
      correctId: 'r2',
      hint: t('The hand went up, down, up — watching a face. What were those fourteen questions training the class to get good at?', 'ارتفعت اليد، ثم نزلت، ثم ارتفعت — تراقب وجهًا. ما الذي كانت تلك الأسئلة الأربعة عشر تدرّب الصف على إتقانه؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_51,
  reveal: {
    whatDrifted: t(
      'Questioning has become a guessing game. Students are engaged in reading the teacher rather than reasoning about the content.',
      'أصبح طرح الأسئلة لعبة تخمين. ينشغل الطلاب بقراءة المعلّمة لا بالتعليل حول المحتوى.',
    ),
    whyItHappened: t(
      'Closed questions keep a lesson moving and feel interactive. The teacher gets the word she wanted; the class gets a win. Nobody notices that no one had to think.',
      'تُبقي الأسئلة المغلقة الدرس متحركًا وتبدو تفاعلية. تحصل المعلّمة على الكلمة التي أرادتها؛ ويحصل الصف على فوز. لا أحد يلاحظ أن أحدًا لم يضطر إلى التفكير.',
    ),
    howToRestore: t(
      'Questions should invite reasoning, not only lead students toward the teacher’s expected answer. Same number of questions; each one begins with what, why, or how do you know.',
      'ينبغي للأسئلة أن تدعو إلى التعليل، لا أن تقود الطلاب فقط نحو الإجابة التي تتوقعها المعلّمة. العدد نفسه من الأسئلة؛ يبدأ كل منها بـ«ماذا» أو «لماذا» أو «كيف تعرف».',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['thinking-architect'],
};

export const LEVEL_52: LevelDefinition = {
  id: 52,
  title: t('The Same Three Students', 'الطلاب الثلاثة أنفسهم'),
  theme: t('Some Thinking ≠ All Thinking', 'تفكير البعض ≠ تفكير الجميع'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneGam,
  scenario: t(
    'The teacher asks thoughtful, genuinely open questions — the best Toki has heard this week. And three confident students answer nearly all of them, brilliantly. The discussion is rich. The teacher is delighted with how it’s going. Toki counts the other twenty-two.',
    'يطرح المعلّم أسئلة مدروسة ومفتوحة فعلًا — أفضل ما سمعه توكي هذا الأسبوع. ويجيب ثلاثة طلاب واثقين عن معظمها، ببراعة. النقاش ثريّ. المعلّم مسرور بسير الأمور. يعدّ توكي الاثنين والعشرين الآخرين.',
  ),
  evidence: [
    { id: 'three', x: 24, y: 60, label: t('The front three', 'الثلاثة في المقدمة'), clue: t('Hands up before the question ends. Nineteen of the last twenty-one answers.', 'أيدٍ مرفوعة قبل أن ينتهي السؤال. تسع عشرة من آخر إحدى وعشرين إجابة.') },
    { id: 'middle', x: 56, y: 70, label: t('The middle rows', 'الصفوف الوسطى'), clue: t('Listening politely. Two are doodling. One has already learned the question will be answered without her.', 'يُنصتون بأدب. اثنان يخربشان. واحدة تعلّمت بالفعل أن السؤال سيُجاب عنه من دونها.') },
    { id: 'quiet', x: 80, y: 36, label: t('A quiet student', 'طالب هادئ'), clue: t('Toki asks him the last question privately. His answer is better than the one the class heard.', 'يسأله توكي السؤال الأخير على انفراد. إجابته أفضل من التي سمعها الصف.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The questions are excellent. What is the concern?', 'الأسئلة ممتازة. ما مصدر القلق؟'),
      options: [
        { id: 'distribution', label: t('How many of the twenty-five had to think before an answer arrived', 'كم من الخمسة والعشرين اضطر إلى التفكير قبل وصول الإجابة') },
        { id: 'wait', label: t('How long the teacher waits before accepting the first hand that goes up', 'كم ينتظر المعلّم قبل قبول اليد الأولى') },
        { id: 'quiet', label: t('Why the quiet student never raises his hand', 'لماذا لا يرفع الطالب الهادئ يده أبدًا') },
        { id: 'level', label: t('Whether the questions are pitched above the middle rows', 'هل الأسئلة أعلى من مستوى الصفوف الوسطى') },
      ],
      correctId: 'distribution',
      hint: t('The middle-rows clue: one student "has already learned the question will be answered without her". Which option is counting her, and the other twenty-one, rather than the three?', 'دليل الصفوف الوسطى: طالبة «تعلّمت بالفعل أن السؤال سيُجاب عنه من دونها». أي خيار يعدّها هي والواحد والعشرين الآخرين، لا الثلاثة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The quiet student’s answer was better than anything the class heard. Twenty-two students sat through a discussion that looked like a model. What are they learning about their part in it?', 'كانت إجابة الطالب الهادئ أفضل من كل ما سمعه الصف. جلس اثنان وعشرون طالبًا خلال نقاش بدا نموذجيًا. ماذا يتعلّمون عن دورهم فيه؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'cold-call', label: t('Cold-call by name from a list, so the three cannot answer unless called', 'نادِ بالاسم من قائمة، فلا يجيب الثلاثة إلا إذا نودوا') },
        { id: 'wait', label: t('Wait five seconds after each question before taking any hand', 'انتظر خمس ثوانٍ بعد كل سؤال قبل أخذ أي يد') },
        { id: 'think-first', label: t('Everyone thinks first: thirty seconds to write, turn-and-talk, then the teacher chooses who shares', 'الجميع يفكّر قبل أن يتحدث أحد: ثلاثون ثانية للكتابة، حديث مع الزميل، ثم يختار المعلّم') },
        { id: 'roles', label: t('Give the three a role — summariser, challenger, note-taker — so their energy serves the discussion', 'أعطِ الثلاثة دورًا — ملخّص، محاور — لتخدم طاقتهم النقاش') },
      ],
      correctId: 'think-first',
      hint: t('Cold-calling reaches one more student a question; waiting helps the slower hands; roles redirect the three. Read the quiet-student clue: his answer existed before anyone asked. Which move makes all twenty-five produce one before a hand goes up?', 'النداء بالاسم يصل إلى طالب إضافي لكل سؤال؛ والانتظار يساعد الأيدي الأبطأ؛ والأدوار تعيد توجيه الثلاثة. اقرأ دليل الطالب الهادئ: كانت إجابته موجودة قبل أن يسأل أحد. أي خطوة تجعل الخمسة والعشرين كلهم ينتجون إجابة قبل أن تُرفع يد؟'),
    },
    reasoning: {
      prompt: t('Why "think first" rather than simply calling on different students?', 'لماذا «فكّر أولًا» بدل مجرد اختيار طلاب مختلفين؟'),
      options: [
        { id: 'r1', label: t('Writing first gives the quiet student a draft he is willing to say aloud', 'الكتابة أولًا تمنح الطالب الهادئ مسودة يرضى بقولها بصوت مرتفع') },
        { id: 'r3', label: t('Turn-and-talk lets the three teach the twenty-two instead of replacing them', 'الحديث مع الزميل يدع الثلاثة يعلّمون الاثنين والعشرين بدل أن يحلّوا محلهم') },
        { id: 'r4', label: t('The teacher sees twenty-five answers on paper instead of three in the air', 'يرى المعلّم خمسًا وعشرين إجابة على الورق بدل ثلاث في الهواء') },
        { id: 'r2', label: t('The goal is thinking everywhere, not answers from more places', 'الهدف تفكير في كل مكان، لا إجابات من أماكن أكثر') },
      ],
      correctId: 'r2',
      hint: t('The quiet student had the better answer and the class never heard it. Was the problem how many students spoke, or how many had something ready to say?', 'كان لدى الطالب الهادئ الإجابة الأفضل ولم يسمعها الصف قط. هل كانت المشكلة في عدد الطلاب الذين تحدثوا، أم في عدد مَن كان لديهم شيء جاهز ليقولوه؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_52,
  reveal: {
    whatDrifted: t(
      'The quality of thinking is high, and concentrated in three students. The rest have learned to let the discussion happen to them.',
      'جودة التفكير عالية، ومركّزة في ثلاثة طلاب. تعلّم الباقون أن يدعوا النقاش يحدث لهم.',
    ),
    whyItHappened: t(
      'Confident volunteers keep the lesson flowing and make the teacher’s questions feel successful. Each time they answer, the incentive for everyone else to think gets a little smaller.',
      'يُبقي المتطوعون الواثقون الدرس متدفقًا ويجعلون أسئلة المعلّم تبدو ناجحة. وفي كل مرة يجيبون، يتضاءل حافز الآخرين للتفكير قليلًا.',
    ),
    howToRestore: t(
      'Use strategies that ensure all students think before selected students respond. Write first, talk to a partner, then the teacher chooses — the three still shine, and the twenty-two are back in the lesson.',
      'استخدم استراتيجيات تضمن أن يفكّر جميع الطلاب قبل أن يجيب طلاب مختارون. اكتب أولًا، تحدّث مع زميل، ثم يختار المعلّم — يظل الثلاثة يتألقون، ويعود الاثنان والعشرون إلى الدرس.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['thinking-architect'],
};

export const LEVEL_53: LevelDefinition = {
  id: 53,
  title: t('Rapid Fire', 'أسئلة متسارعة'),
  theme: t('Pace ≠ Depth', 'الإيقاع ≠ العمق'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'The teacher is energetic and the lesson flies. Questions come every few seconds, answers come back short, and the momentum never drops. Students are alert and the pace is exhilarating. Toki times the gap between a question and the next question.',
    'المعلّمة نشيطة والدرس يطير. تأتي الأسئلة كل بضع ثوانٍ، وتعود الإجابات قصيرة، ولا يتراجع الزخم أبدًا. الطلاب متيقّظون والإيقاع مثير. يقيس توكي الفاصل بين سؤال والسؤال التالي.',
  ),
  evidence: [
    { id: 'timer', x: 50, y: 28, label: t('The stopwatch', 'ساعة الإيقاف'), clue: t('Average gap: 6 seconds. Longest answer: four words.', 'متوسط الفاصل: ٦ ثوانٍ. أطول إجابة: أربع كلمات.') },
    { id: 'explanation', x: 24, y: 66, label: t('A "why"', 'سؤال «لماذا»'), clue: t('"Why?" "Because it’s negative." "Good — next." The because was never unpacked.', '«لماذا؟» «لأنه سالب.» «جيد — التالي.» لم تُفكّك الـ«لأن» قط.') },
    { id: 'student', x: 78, y: 66, label: t('A student', 'طالب'), clue: t('Starts to explain a different method. The next question has already landed on someone else.', 'يبدأ بشرح طريقة مختلفة. السؤال التالي هبط بالفعل على شخص آخر.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The lesson is alive and fast. What might be reduced?', 'الدرس حيّ وسريع. ما الذي قد يتقلّص؟'),
      options: [
        { id: 'coverage', label: t('Whether ten questions a minute leaves the content covered or merely touched', 'هل تترك عشرة أسئلة في الدقيقة المحتوى مغطًّى أم ملموسًا فقط') },
        { id: 'who', label: t('Whether the same students are catching every question', 'هل الطلاب أنفسهم هم من يلتقطون كل سؤال') },
        { id: 'wait', label: t('Whether anyone gets thinking time before the next question lands', 'هل يحصل أحد على وقت تفكير قبل هبوط السؤال التالي') },
        { id: 'depth', label: t('What happens to an answer after it is given — extended, or waved through', 'ماذا يحدث للإجابة بعد تقديمها — تُوسَّع أم تُمرَّر') },
      ],
      correctId: 'depth',
      hint: t('Look at the "why" clue: "Because it’s negative." — "Good, next." The answer was correct. What did "Good, next" do with it?', 'انظر إلى دليل «لماذا»: «لأنه سالب.» — «جيد، التالي.» كانت الإجابة صحيحة. ماذا فعل «جيد، التالي» بها؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The stopwatch says every answer is four words and every "why" is waved through. In a lesson everyone would call excellent, which part of thinking is being cut off every six seconds?', 'يقول المؤقّت إن كل إجابة أربع كلمات وكل «لماذا» يُمرَّر. في حصة سيسمّيها الجميع ممتازة، أي جزء من التفكير يُقطع كل ست ثوانٍ؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'fewer-deeper', label: t('Three questions instead of ten, each followed by "say more" and a second student building on it', 'ثلاثة أسئلة بدل عشرة، يتبع كل منها «قل المزيد» وطالب ثانٍ يبني عليها') },
        { id: 'wait', label: t('Keep all ten questions and add three seconds of wait time before each answer', 'احتفظ بالأسئلة العشر وأضف ثلاث ثوانٍ انتظار قبل كل إجابة') },
        { id: 'write', label: t('Keep the pace but have students write their answer before anyone speaks', 'احتفظ بالإيقاع لكن دع الطلاب يكتبون إجاباتهم قبل أن يتحدث أحد') },
        { id: 'plenary', label: t('Keep the rapid round as it is and add a ten-minute written explanation task at the end of the lesson', 'احتفظ بالجولة السريعة وأضف شرحًا مكتوبًا من عشر دقائق في النهاية') },
      ],
      correctId: 'fewer-deeper',
      hint: t('Wait time and writing improve an answer before it is spoken; the plenary adds work after the lesson. Read the student clue: he started a different method and lost his turn. Which move gives an answer somewhere to go once it has been said?', 'وقت الانتظار والكتابة يحسّنان الإجابة قبل أن تُقال؛ والمهمة الختامية تضيف عملًا بعد الحصة. اقرأ دليل الطالب: بدأ طريقة مختلفة وخسر دوره. أي خطوة تمنح الإجابة مكانًا تذهب إليه بعد أن تُقال؟'),
    },
    reasoning: {
      prompt: t('Why "say more" rather than simply slowing down?', 'لماذا «قل المزيد» بدل مجرد الإبطاء؟'),
      options: [
        { id: 'r2', label: t('Depth comes from elaboration, not from silence', 'يأتي العمق من التوسّع لا من الصمت') },
        { id: 'r1', label: t('Three questions cover less ground, so each one has to carry more', 'ثلاثة أسئلة تغطي مساحة أقل، فعلى كل منها أن يحمل أكثر') },
        { id: 'r3', label: t('A second student building on the first makes the class listen to each other', 'طالب ثانٍ يبني على الأول يجعل الصف يُنصت إلى بعضه') },
        { id: 'r4', label: t('"Say more" is the fastest way to find out whether "because it’s negative" was understood', '«قل المزيد» أسرع طريقة لمعرفة هل فُهمت «لأنه سالب»') },
      ],
      correctId: 'r2',
      hint: t('The student started a different method mid-sentence and the next question had already landed. Where does the thinking in this room happen — before the answer, or after it?', 'بدأ الطالب طريقة مختلفة في منتصف الجملة وكان السؤال التالي قد هبط بالفعل. أين يحدث التفكير في هذه الغرفة — قبل الإجابة، أم بعدها؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_53,
  reveal: {
    whatDrifted: t(
      'Pace has replaced depth. The lesson covers a great deal and reasons about almost none of it; every "why" gets a reflex, not an explanation.',
      'حلّ الإيقاع محلّ العمق. يغطي الدرس الكثير ولا يعلّل شيئًا منه تقريبًا؛ كل «لماذا» تحصل على ردّ انعكاسي لا شرح.',
    ),
    whyItHappened: t(
      'Momentum feels like learning, to the teacher and the students alike. A fast lesson is exciting to teach and hard to criticise — which is exactly why nobody notices the thinking has gone thin.',
      'يبدو الزخم تعلّمًا، للمعلّم والطلاب على السواء. الدرس السريع ممتع في تدريسه ويصعب انتقاده — وهذا بالضبط سبب عدم ملاحظة أحد أن التفكير صار ضحلًا.',
    ),
    howToRestore: t(
      'Slow down questioning to allow reasoning, elaboration, and student explanation. Fewer questions, each one extended: "say more", "who can build on that?", "what would change if…?"',
      'أبطئ طرح الأسئلة لإتاحة التعليل والتوسّع وشرح الطلاب. أسئلة أقل، كل منها ممتد: «قل المزيد»، «من يستطيع البناء على ذلك؟»، «ماذا سيتغيّر لو…؟»',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['thinking-architect'],
};

export const LEVEL_54: LevelDefinition = {
  id: 54,
  title: t('No Wait Time', 'بلا وقت انتظار'),
  theme: t('First ≠ Best', 'الأول ≠ الأفضل'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: sceneAssess,
  scenario: t(
    'The teacher asks a good question and immediately calls on the first hand. Every time. The first hand is usually one of four students, and usually right, so the lesson looks responsive and sharp. Toki watches the hands that go up a second too late.',
    'تطرح المعلّمة سؤالًا جيدًا وتختار فورًا أول يد مرفوعة. في كل مرة. اليد الأولى عادةً لأحد أربعة طلاب، وعادةً صحيحة، فيبدو الدرس متجاوبًا وحادًا. يراقب توكي الأيدي التي ترتفع متأخرة ثانية واحدة.',
  ),
  evidence: [
    { id: 'hands', x: 26, y: 62, label: t('The hands', 'الأيدي'), clue: t('Toki counts: question, 0.8 seconds, name called. Nine hands were on their way up.', 'يعدّ توكي: سؤال، ٠٫٨ ثانية، نداء باسم. كانت تسع أيدٍ في طريقها إلى الارتفاع.') },
    { id: 'late', x: 58, y: 70, label: t('A late hand', 'يد متأخرة'), clue: t('He had the answer. By the time his hand was up, the class had moved on. His hand stays down for the rest of the lesson.', 'كانت لديه الإجابة. وحين ارتفعت يده كان الصف قد انتقل. تبقى يده منخفضة بقية الدرس.') },
    { id: 'answer', x: 80, y: 32, label: t('A first answer', 'إجابة أولى'), clue: t('Fast, confident, and shallow. A slower student’s written note has the deeper point — unread.', 'سريعة وواثقة وسطحية. ملاحظة طالبة أبطأ مكتوبة فيها النقطة الأعمق — غير مقروءة.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The questions are good and answered at once. What should Toki focus on?', 'الأسئلة جيدة ويُجاب عنها فورًا. ما الذي ينبغي أن يركّز عليه توكي؟'),
      options: [
        { id: 'who', label: t('Whether the same four students are being chosen every time', 'هل يُختار الطلاب الأربعة أنفسهم في كل مرة') },
        { id: 'time', label: t('What a question is worth when it is answered in under a second', 'ما قيمة سؤال يُجاب عنه في أقل من ثانية') },
        { id: 'depth', label: t('Whether the fast answers are being pushed for reasons', 'هل تُدفع الإجابات السريعة نحو الأسباب') },
        { id: 'written', label: t('Whether the slower student’s written note was ever collected', 'هل جُمعت ملاحظة الطالبة الأبطأ المكتوبة أصلًا') },
      ],
      correctId: 'time',
      hint: t('The same four, and no push for reasons — both true, both downstream. Look at the hands clue: 0.8 and nine hands on their way up. Which option is about the 0.8?', 'الأربعة أنفسهم، ولا دفع نحو الأسباب — كلاهما صحيح، وكلاهما نتيجة لاحقة. انظر إلى دليل الأيدي: ٠٫٨ وتسع أيدٍ في طريقها إلى الارتفاع. أي خيار يتعلق بالـ٠٫٨؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The late-hand clue: he had the answer, and his hand stayed down for the rest of the lesson. What is a question teaching him and the other eight about questions?', 'دليل اليد المتأخرة: كانت لديه الإجابة، وبقيت يده منخفضة بقية الحصة. ماذا يعلّمه السؤال هو والثمانية الآخرين عن الأسئلة؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'rotate', label: t('Keep a tally and never take the same hand twice in a row', 'احتفظ بإحصاء ولا تأخذ اليد نفسها مرتين متتاليتين') },
        { id: 'wait', label: t('Three silent seconds after every question before any name — counted on fingers until habitual', 'ثلاث ثوانٍ من الصمت بعد كل سؤال قبل أي اسم، تُعدّ على الأصابع حتى تصبح عادة') },
        { id: 'no-hands', label: t('No hands: the teacher chooses who answers, from anywhere in the room, after the question', 'بلا أيدٍ: المعلّمة تختار من يجيب، من أي مكان في الغرفة') },
        { id: 'whiteboards', label: t('Every student writes on a mini whiteboard and all the boards go up together on a signal', 'يكتب كل طالب على سبورة صغيرة وترتفع كل السبورات معًا') },
      ],
      correctId: 'wait',
      hint: t('Rotating and no-hands change who is chosen; whiteboards change how everyone answers. Each of them still fires the instant the question ends. Read the late-hand clue: he lost by one second. Which move is about that one second?', 'التناوب وعدم رفع الأيدي يغيّران مَن يُختار؛ والسبورات الصغيرة تغيّر كيف يجيب الجميع. الثلاثة جميعها ما زالت تنطلق لحظة انتهاء السؤال. اقرأ دليل اليد المتأخرة: خسر بثانية واحدة. أي خطوة تتعلق بتلك الثانية الواحدة؟'),
    },
    reasoning: {
      prompt: t('Why does three seconds matter so much?', 'لماذا تهمّ ثلاث ثوانٍ إلى هذا الحد؟'),
      options: [
        { id: 'r1', label: t('Three seconds is long enough for the deeper answer to form and short enough to keep', 'ثلاث ثوانٍ تكفي لتتشكّل الإجابة الأعمق وتقصر بما يكفي للاستمرار') },
        { id: 'r2', label: t('A question only does its job if it reaches the whole class before anyone answers it', 'لا يؤدي السؤال وظيفته إلا إذا وصل إلى الصف كله قبل أن يجيب عنه أحد') },
        { id: 'r3', label: t('After a pause, the first hand is no longer always the same four', 'بعد التوقف، لا تعود اليد الأولى دائمًا للأربعة أنفسهم') },
        { id: 'r4', label: t('A habit the teacher counts on her fingers survives an observer leaving the room', 'عادة تعدّها المعلّمة على أصابعها تصمد بعد مغادرة المراقب الغرفة') },
      ],
      correctId: 'r2',
      hint: t('Nine hands on their way up, one name already called. Who was the question actually for?', 'تسع أيدٍ في طريقها إلى الارتفاع، واسم واحد نودي بالفعل. لمن كان السؤال في الحقيقة؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_54,
  reveal: {
    whatDrifted: t(
      'The question has become a race, and most students have stopped entering. Speed is being rewarded in a practice designed to reward thought.',
      'أصبح السؤال سباقًا، وتوقف معظم الطلاب عن الدخول فيه. تُكافأ السرعة في ممارسة صُممت لمكافأة التفكير.',
    ),
    whyItHappened: t(
      'A fast answer keeps the lesson crisp and the teacher never has to sit in silence. Silence feels like a lesson stalling — so the first hand always wins.',
      'تُبقي الإجابة السريعة الدرس حادًا ولا تضطر المعلّمة أبدًا إلى الجلوس في صمت. يبدو الصمت كأن الدرس يتعثّر — فتفوز اليد الأولى دائمًا.',
    ),
    howToRestore: t(
      'Wait time gives all students space to think, not only the fastest students. Three seconds — then choose, rather than take, who answers.',
      'يمنح وقت الانتظار جميع الطلاب مساحة للتفكير، لا الأسرع فقط. ثلاث ثوانٍ — ثم اختر، لا تأخذ، من يجيب.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['thinking-architect', 'mutation-hunter'],
};

export const WORLD_5_LEVELS = [LEVEL_51, LEVEL_52, LEVEL_53, LEVEL_54];
