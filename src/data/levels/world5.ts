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
        { id: 'openness', label: t('Openness of student reasoning', 'انفتاح تعليل الطلاب') },
        { id: 'accuracy', label: t('Accuracy of final answers', 'دقة الإجابات النهائية') },
        { id: 'speed', label: t('Speed of teacher questioning', 'سرعة طرح المعلّم للأسئلة') },
        { id: 'number', label: t('Number of students responding', 'عدد الطلاب المجيبين') },
      ],
      correctId: 'openness',
      hint: t('Are students thinking about the content, or about the teacher?', 'هل يفكّر الطلاب في المحتوى، أم في المعلّم؟'),
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
        { id: 'fewer', label: t('Ask fewer questions', 'اطرح أسئلة أقل') },
        { id: 'reframe', label: t('Keep the questions, change their shape: from "what is it called?" to "what do you think is happening here, and why?"', 'احتفظ بالأسئلة وغيّر شكلها: من «ماذا تُسمّى؟» إلى «ما الذي تظن أنه يحدث هنا، ولماذا؟»') },
        { id: 'hands-down', label: t('Ban hands up', 'امنع رفع الأيدي') },
        { id: 'write', label: t('Have students write every answer', 'اجعل الطلاب يكتبون كل إجابة') },
      ],
      correctId: 'reframe',
      hint: t('The problem isn’t how many questions — it’s what kind of thinking each one invites.', 'المشكلة ليست في عدد الأسئلة — بل في نوع التفكير الذي يدعو إليه كل سؤال.'),
    },
    reasoning: {
      prompt: t('Why change the shape of the question rather than the amount?', 'لماذا نغيّر شكل السؤال لا كمّه؟'),
      options: [
        { id: 'r1', label: t('Open questions take longer, so there are fewer', 'الأسئلة المفتوحة تستغرق وقتًا أطول، فيقلّ عددها') },
        { id: 'r2', label: t('Questions should invite reasoning, not only lead students toward the teacher’s expected answer — a guessing game trains students to read the teacher, not the content', 'ينبغي للأسئلة أن تدعو إلى التعليل، لا أن تقود الطلاب فقط نحو الإجابة التي يتوقعها المعلّم — فلعبة التخمين تدرّب الطلاب على قراءة المعلّم لا المحتوى') },
        { id: 'r3', label: t('Open questions are harder to mark wrong', 'يصعب الحكم بخطأ الأسئلة المفتوحة') },
        { id: 'r4', label: t('Leadership prefers higher-order questions', 'تفضّل القيادة أسئلة المستوى الأعلى') },
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
        { id: 'distribution', label: t('Distribution of thinking', 'توزّع التفكير') },
        { id: 'quality', label: t('Quality of the questions', 'جودة الأسئلة') },
        { id: 'confidence', label: t('Confidence of speakers', 'ثقة المتحدثين') },
        { id: 'accuracy', label: t('Accuracy of responses', 'دقة الإجابات') },
      ],
      correctId: 'distribution',
      hint: t('Twenty-five students. How many had to think?', 'خمسة وعشرون طالبًا. كم منهم اضطر إلى التفكير؟'),
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
        { id: 'ignore-three', label: t('Stop calling on the three confident students', 'توقف عن اختيار الطلاب الثلاثة الواثقين') },
        { id: 'think-first', label: t('Everyone thinks before anyone speaks: thirty seconds to write, turn-and-talk, then the teacher chooses who shares', 'الجميع يفكّر قبل أن يتحدث أحد: ثلاثون ثانية للكتابة، ثم حديث مع الزميل، ثم يختار المعلّم من يشارك') },
        { id: 'easier', label: t('Ask easier questions so more students can answer', 'اطرح أسئلة أسهل ليجيب عدد أكبر من الطلاب') },
        { id: 'groups', label: t('Split the three across different groups', 'وزّع الثلاثة على مجموعات مختلفة') },
      ],
      correctId: 'think-first',
      hint: t('Don’t silence the three. Make the other twenty-two think before the three can speak.', 'لا تُسكت الثلاثة. اجعل الاثنين والعشرين الآخرين يفكّرون قبل أن يتمكن الثلاثة من الكلام.'),
    },
    reasoning: {
      prompt: t('Why "think first" rather than simply calling on different students?', 'لماذا «فكّر أولًا» بدل مجرد اختيار طلاب مختلفين؟'),
      options: [
        { id: 'r1', label: t('It is fairer to the confident students', 'أكثر إنصافًا للطلاب الواثقين') },
        { id: 'r2', label: t('Cold-calling one student makes one student think; a think-first routine makes all twenty-five think — the goal is thinking everywhere, not answering from more places', 'اختيار طالب واحد يجعل طالبًا واحدًا يفكّر؛ وروتين «فكّر أولًا» يجعل الخمسة والعشرين يفكّرون — الهدف تفكير في كل مكان، لا إجابات من أماكن أكثر') },
        { id: 'r3', label: t('It gives the teacher time to plan the next question', 'يمنح المعلّم وقتًا لتخطيط السؤال التالي') },
        { id: 'r4', label: t('Writing is quieter than talking', 'الكتابة أهدأ من الكلام') },
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
        { id: 'depth', label: t('Depth of thinking', 'عمق التفكير') },
        { id: 'energy', label: t('Teacher energy', 'طاقة المعلّم') },
        { id: 'attention', label: t('Student attention', 'انتباه الطلاب') },
        { id: 'momentum', label: t('Lesson momentum', 'زخم الدرس') },
      ],
      correctId: 'depth',
      hint: t('Six seconds. What kind of thought fits in six seconds?', 'ست ثوانٍ. أي نوع من التفكير يتّسع في ست ثوانٍ؟'),
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
        { id: 'slower-all', label: t('Slow the whole lesson down', 'أبطئ الدرس كله') },
        { id: 'fewer-deeper', label: t('Keep the energy, change the ratio: three questions where there were ten, each followed by "say more" and a second student building on the first', 'احتفظ بالطاقة وغيّر النسبة: ثلاثة أسئلة بدل عشرة، يتبع كل منها «قل المزيد» وطالب ثانٍ يبني على الأول') },
        { id: 'timer', label: t('Use a visible timer to pace questions', 'استخدم مؤقّتًا مرئيًا لضبط إيقاع الأسئلة') },
        { id: 'worksheet', label: t('Replace questioning with a worksheet', 'استبدل طرح الأسئلة بورقة عمل') },
      ],
      correctId: 'fewer-deeper',
      hint: t('The energy is an asset. What would spend it on reasoning instead of coverage?', 'الطاقة ميزة. ما الذي ينفقها على التعليل بدل التغطية؟'),
    },
    reasoning: {
      prompt: t('Why "say more" rather than simply slowing down?', 'لماذا «قل المزيد» بدل مجرد الإبطاء؟'),
      options: [
        { id: 'r1', label: t('Slow lessons bore students', 'الدروس البطيئة تضجر الطلاب') },
        { id: 'r2', label: t('Depth comes from elaboration, not from silence — asking a student to extend and another to build is what turns a four-word answer into reasoning', 'يأتي العمق من التوسّع لا من الصمت — فمطالبة طالب بالتوسّع وآخر بالبناء هي ما يحوّل إجابة من أربع كلمات إلى تعليل') },
        { id: 'r3', label: t('It fills the time saved by asking fewer questions', 'يملأ الوقت الموفَّر بطرح أسئلة أقل') },
        { id: 'r4', label: t('Students prefer longer turns', 'يفضّل الطلاب أدوارًا أطول') },
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
        { id: 'time', label: t('Time for thinking', 'وقت التفكير') },
        { id: 'speed', label: t('Speed of response', 'سرعة الاستجابة') },
        { id: 'number', label: t('Number of answers', 'عدد الإجابات') },
        { id: 'enthusiasm', label: t('Student enthusiasm', 'حماس الطلاب') },
      ],
      correctId: 'time',
      hint: t('Who gets to answer a question with no wait time — the best thinker, or the fastest hand?', 'من يحصل على فرصة الإجابة عن سؤال بلا وقت انتظار — أفضل مفكّر، أم أسرع يد؟'),
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
        { id: 'no-hands', label: t('Ban hands up entirely', 'امنع رفع الأيدي كليًا') },
        { id: 'wait', label: t('Three seconds of silence after every question before any name — count it on your fingers until it’s a habit', 'ثلاث ثوانٍ من الصمت بعد كل سؤال قبل أي اسم — عدّها على أصابعك حتى تصبح عادة') },
        { id: 'reward-fast', label: t('Reward the fastest correct answer', 'كافئ أسرع إجابة صحيحة') },
        { id: 'written', label: t('Switch all questioning to written quizzes', 'حوّل كل الأسئلة إلى اختبارات مكتوبة') },
      ],
      correctId: 'wait',
      hint: t('The smallest change with the biggest effect. What costs three seconds?', 'أصغر تغيير بأكبر أثر. ما الذي يكلّف ثلاث ثوانٍ؟'),
    },
    reasoning: {
      prompt: t('Why does three seconds matter so much?', 'لماذا تهمّ ثلاث ثوانٍ إلى هذا الحد؟'),
      options: [
        { id: 'r1', label: t('It calms the lesson down', 'تهدّئ الدرس') },
        { id: 'r2', label: t('Wait time gives all students space to think, not only the fastest — the question is only doing its job if it reaches the whole class before anyone answers it', 'يمنح وقت الانتظار جميع الطلاب مساحة للتفكير، لا الأسرع فقط — ولا يؤدي السؤال وظيفته إلا إذا وصل إلى الصف كله قبل أن يجيب عنه أحد') },
        { id: 'r3', label: t('It gives the teacher time to think of the next question', 'يمنح المعلّمة وقتًا للتفكير في السؤال التالي') },
        { id: 'r4', label: t('Students answer more politely after a pause', 'يجيب الطلاب بأدب أكبر بعد توقف') },
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
