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
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

export const LEVEL_51: LevelDefinition = {
  id: 51,
  title: t('Guess What I’m Thinking', 'خمّن ما أفكّر فيه'),
  theme: t('Answering ≠ Reasoning', 'الإجابة ≠ التعليل'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneTalk,
  scenario: t(
    'The teacher asks a lot of questions, and students answer them eagerly. But Toki notices a rhythm: a question, three or four guesses, "not quite… closer… yes!" — until someone lands on the word the teacher had in mind. The class is good at it. Toki listens to what the questions are asking for.',
    'يطرح المعلّم أسئلة كثيرة، ويجيب الطلاب عنها بحماس. لكن توكي يلاحظ إيقاعًا: سؤال، ثلاثة أو أربعة تخمينات، «ليس تمامًا… أقرب… نعم!» — حتى يصل أحدهم إلى الكلمة التي في ذهن المعلّم. الصف بارع في ذلك. يُنصت توكي لما تطلبه الأسئلة.',
  ),
  evidence: [
    { id: 'question', x: 50, y: 28, label: t('A question', 'سؤال'), clue: t('"What do we call this process?" One word wanted. Four students guess words.', '«ماذا نسمّي هذه العملية؟» المطلوب كلمة واحدة. يخمّن أربعة طلاب كلمات.') },
    { id: 'student', x: 24, y: 66, label: t('A student', 'طالب'), clue: t('Hand up, then down, then up: she’s watching the teacher’s face, not thinking about the diagram.', 'يد مرفوعة، ثم منخفضة، ثم مرفوعة: إنها تراقب وجه المعلّم لا تفكّر في الرسم.') },
    { id: 'reasons', x: 78, y: 64, label: t('Toki’s tally', 'إحصاء توكي'), clue: t('Fourteen questions in ten minutes. Number that began with "why" or "how do you know": zero.', 'أربعة عشر سؤالًا في عشر دقائق. عدد ما بدأ منها بـ«لماذا» أو «كيف تعرف»: صفر.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Students are answering constantly. What should Toki examine?', 'يجيب الطلاب باستمرار. ما الذي ينبغي أن يفحصه توكي؟'),
      options: [
        { id: 'wait', label: t('How long students get between the question and the first guess', 'كم من الوقت يحصل الطلاب بين السؤال والتخمين الأول') },
        { id: 'number', label: t('How many different students get to answer', 'كم طالبًا مختلفًا يحصل على فرصة الإجابة') },
        { id: 'openness', label: t('Whether the questions have one answer in mind or many possible ones', 'هل للأسئلة إجابة واحدة في ذهن المعلّم أم إجابات عدّة على الطاولة') },
        { id: 'vocab', label: t('Whether students have been taught the vocabulary the questions require', 'هل دُرّس الطلاب المفردات التي تتطلّبها الأسئلة') },
      ],
      correctId: 'openness',
      hint: t('Wait time and distribution are real levers — in other classrooms. Here the tally says zero "why" questions, and a student is watching the teacher’s face. What are the questions themselves asking for?', 'وقت الانتظار والتوزّع رافعتان حقيقيتان — في صفوف أخرى. هنا يقول الإحصاء صفر أسئلة «لماذا»، وطالبة تراقب وجه المعلّم. ما الذي تطلبه الأسئلة نفسها؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The questioning habit is strong and the students are willing — the questions just point at recall. That’s a drift to redirect soon, not a collapse.', 'عادة طرح الأسئلة قوية والطلاب راغبون — لكن الأسئلة تشير إلى التذكّر فقط. انحراف يُعاد توجيهه قريبًا، لا انهيار.'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'pre-teach', label: t('Pre-teach the key terms so the guessing stops and the answers come faster', 'درّس المصطلحات الأساسية مسبقًا ليتوقف التخمين وتأتي الإجابات أسرع') },
        { id: 'no-hands', label: t('Cold-call instead of taking guesses, so every student has to be ready with an answer', 'نادِ عشوائيًا بدل أخذ التخمينات، ليكون كل طالب مستعدًا') },
        { id: 'accept', label: t('Accept the first reasonable answer instead of fishing for the exact word', 'اقبل أول إجابة معقولة بدل الصيد عن الكلمة الدقيقة') },
        { id: 'reframe', label: t('Same questions, new shape: "what is it called?" becomes "what is happening here, and why?"', 'احتفظ بالأسئلة وغيّر شكلها: من «ماذا تُسمّى؟» إلى «ما الذي يحدث هنا، ولماذا؟»') },
      ],
      correctId: 'reframe',
      hint: t('Pre-teaching and accepting the first answer end the guessing faster; cold-calling spreads it. All three keep the question "what is it called?" Which move changes the question?', 'التدريس المسبق وقبول الإجابة الأولى ينهيان التخمين أسرع؛ والنداء العشوائي يوزّعه. الثلاثة تبقي السؤال «ماذا تُسمّى؟». أي خطوة تغيّر السؤال؟'),
    },
    reasoning: {
      prompt: t('Why change the shape of the question rather than the amount?', 'لماذا نغيّر شكل السؤال لا كمّه؟'),
      options: [
        { id: 'r1', label: t('A "why" question cannot be answered by watching the teacher’s face', 'سؤال «لماذا» لا يمكن الإجابة عنه بمراقبة وجه المعلّم') },
        { id: 'r3', label: t('Open questions give the four guessers less to guess and the rest more to say', 'تمنح الأسئلة المفتوحة المخمّنين الأربعة أقل ليخمّنوا والبقية أكثر ليقولوه') },
        { id: 'r2', label: t('A guessing game trains students to read the teacher, not the content', 'لعبة التخمين تدرّب الطلاب على قراءة المعلّم لا المحتوى') },
        { id: 'r4', label: t('The right word matters less than the reasoning that leads to it', 'الكلمة الصحيحة أقل أهمية من التعليل الذي يقود إليها') },
      ],
      correctId: 'r2',
      hint: t('What was the student with the hand watching?', 'ما الذي كانت الطالبة ذات اليد المرفوعة تراقبه؟'),
      bonusPoints: 25,
    },
  },
  reveal: {
    whatDrifted: t(
      'Questioning has become a guessing game. Students are engaged in reading the teacher rather than reasoning about the content.',
      'أصبح طرح الأسئلة لعبة تخمين. ينشغل الطلاب بقراءة المعلّم لا بالتعليل حول المحتوى.',
    ),
    whyItHappened: t(
      'Closed questions keep a lesson moving and feel interactive. The teacher gets the word she wanted; the class gets a win. Nobody notices that no one had to think.',
      'تُبقي الأسئلة المغلقة الدرس متحركًا وتبدو تفاعلية. تحصل المعلّمة على الكلمة التي أرادتها؛ ويحصل الصف على فوز. لا أحد يلاحظ أن أحدًا لم يضطر إلى التفكير.',
    ),
    howToRestore: t(
      'Questions should invite reasoning, not only lead students toward the teacher’s expected answer. Same number of questions; each one begins with what, why, or how do you know.',
      'ينبغي للأسئلة أن تدعو إلى التعليل، لا أن تقود الطلاب فقط نحو الإجابة التي يتوقعها المعلّم. العدد نفسه من الأسئلة؛ يبدأ كل منها بـ«ماذا» أو «لماذا» أو «كيف تعرف».',
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
      hint: t('The quiet student and the pitch are both real — but the middle-row clue says "she has learned the question will be answered without her". Which option counts her?', 'الطالب الهادئ ومستوى الأسئلة كلاهما حقيقي — لكن دليل الصفوف الوسطى يقول «تعلّمت أن السؤال سيُجاب عنه من دونها». أي خيار يعدّها؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Twenty-two students are learning that thinking is optional, in a room that looks like a model of discussion. That’s a serious drift hiding inside a strength.', 'يتعلّم اثنان وعشرون طالبًا أن التفكير اختياري، في غرفة تبدو نموذجًا للنقاش. انحراف خطير يختبئ داخل نقطة قوة.'),
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
      hint: t('Cold-calling makes one more student think per question; waiting helps the slower hands; roles redirect the three. Which move makes twenty-five students think on every question?', 'النداء العشوائي يجعل طالبًا إضافيًا يفكّر في كل سؤال؛ والانتظار يساعد الأيدي الأبطأ؛ والأدوار تعيد توجيه الثلاثة. أي خطوة تجعل الخمسة والعشرين يفكّرون في كل سؤال؟'),
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
      hint: t('What did the quiet student have, that the class never got to hear?', 'ما الذي كان لدى الطالب الهادئ ولم يسمعه الصف قط؟'),
      bonusPoints: 25,
    },
  },
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
    'المعلّم نشيط والدرس يطير. تأتي الأسئلة كل بضع ثوانٍ، وتعود الإجابات قصيرة، ولا يتراجع الزخم أبدًا. الطلاب متيقّظون والإيقاع مثير. يقيس توكي الفاصل بين سؤال والسؤال التالي.',
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
      hint: t('Thinking time before the question is the previous classroom’s lesson. Look at the "why" clue: "Because it’s negative" — "Good, next." What happened after the answer?', 'وقت التفكير قبل السؤال هو درس الصف السابق. انظر إلى دليل «لماذا»: «لأنه سالب» — «جيد، التالي». ماذا حدث بعد الإجابة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Every "why" is being answered in four words and waved through. Reasoning is being systematically cut short in a lesson that looks like excellence.', 'كل «لماذا» يُجاب عنها بأربع كلمات وتُمرَّر. يُقطع التعليل بشكل منهجي في درس يبدو تميّزًا.'),
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
      hint: t('Wait time and writing improve the answer before it is said; the plenary adds depth after the lesson. The student with the different method lost his turn mid-sentence. Which move gives the answer somewhere to go?', 'وقت الانتظار والكتابة يحسّنان الإجابة قبل أن تُقال؛ والخاتمة تضيف العمق بعد الدرس. فقد الطالب صاحب الطريقة المختلفة دوره في منتصف الجملة. أي خطوة تمنح الإجابة مكانًا تذهب إليه؟'),
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
      hint: t('What happened to the student with the different method?', 'ماذا حدث للطالب صاحب الطريقة المختلفة؟'),
      bonusPoints: 25,
    },
  },
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
    { id: 'hands', x: 26, y: 62, label: t('The hands', 'الأيدي'), clue: t('Toki counts: question, 0.8 seconds, name called. Nine hands were on their way up.', 'يعدّ توكي: سؤال، ٠.٨ ثانية، نداء باسم. كانت تسع أيدٍ في طريقها إلى الارتفاع.') },
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
      hint: t('The same four, and no push for reasons — both true, both downstream. The stopwatch says 0.8 seconds with nine hands on their way up. Which option looks at the 0.8?', 'الأربعة أنفسهم، ولا دفع نحو الأسباب — كلاهما صحيح، وكلاهما نتيجة. تقول ساعة الإيقاف ٠.٨ ثانية وتسع أيدٍ في طريقها إلى الارتفاع. أي خيار ينظر إلى الـ٠.٨؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The question exists to make everyone think. With no wait time, it rewards the four fastest and teaches the rest to stop trying. The practice has fully inverted its purpose.', 'يوجد السؤال ليجعل الجميع يفكّرون. بلا وقت انتظار يكافئ الأربعة الأسرع ويعلّم الباقين التوقف عن المحاولة. انقلبت الممارسة على غايتها تمامًا.'),
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
      hint: t('Rotating and no-hands change who answers; whiteboards change how. All three still fire the moment the question ends. The late hand had the answer and lost by a second. Which move gives him the second?', 'التناوب وغياب الأيدي يغيّران من يجيب؛ والسبورات تغيّر الكيفية. الثلاثة ما زالت تنطلق لحظة انتهاء السؤال. كانت لدى اليد المتأخرة الإجابة وخسرت بثانية. أي خطوة تمنحه الثانية؟'),
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
      hint: t('What did the late hand learn about questions in this room?', 'ماذا تعلّمت اليد المتأخرة عن الأسئلة في هذه الغرفة؟'),
      bonusPoints: 25,
    },
  },
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
