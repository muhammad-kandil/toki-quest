/**
 * WORLD 2 — Assessment Under the Microscope
 * Theme: When Assessment Stops Informing Learning
 * Core idea: assessment should shape instruction, not simply measure it.
 *
 * Authored from the team's v2 spec. Each level fills the spec's skeleton
 * (observation / investigation / risk / coaching) out to the engine's
 * five-beat shape: scenario, evidence to inspect, drift, risk, coaching,
 * an optional reasoning bonus, and the three-part reveal.
 *
 * Scenes reuse the existing classroom art until World 2 art is produced.
 */
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import scenePerfect from '../../assets/scenes/classroom-6-perfect.jpg';
import type { LevelDefinition } from '../levelTypes';
import type { ConversationDefinition } from '../conversationTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

/* ── The coaching conversations ─────────────────────────────────────
 * Each sits on the classroom's correct coaching move: the conversation
 * is how Toki delivers it to a person with reasons for what they did.
 * See conversationTypes.ts for the opens / neutral / closes rules.
 */

/** 21 — Mr. Rashid, proud. The routine has never missed a day. */
const CONVO_21: ConversationDefinition = {
  teacherName: t('Mr. Rashid', 'الأستاذ راشد'),
  stance: 'proud',
  setting: t('The bell has just gone. Today’s tickets are already squared into a neat pile on the corner of the desk.', 'رنّ الجرس للتو. بطاقات اليوم مرصوصة بالفعل في كومة مرتّبة على طرف المكتب.'),
  read: t('He built this routine from nothing and keeps it every single day. The pile is the thing he is proud of — start anywhere near it with care.', 'بنى هذا الروتين من الصفر ويحافظ عليه كل يوم. الكومة هي ما يفخر به — فابدأ من حولها بحذر.'),
  turns: [
    {
      teacherLine: t('Every lesson, every student, every day — I haven’t missed an exit ticket since September. Most teachers give up by October.', 'كل درس، كل طالب، كل يوم — لم أفوّت بطاقة خروج واحدة منذ سبتمبر. أغلب المعلّمين يتوقفون بحلول أكتوبر.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They do — and you didn’t. Can I show you one from yesterday? Question 2: three of the five in this bundle got it wrong the same way. Did that one come up today?', 'صحيح — وأنت لم تتوقف. هل لي أن أريك واحدة من الأمس؟ السؤال ٢: ثلاثة من الخمسة في هذه الرزمة أخطؤوا فيه بالطريقة نفسها. هل مرّ هذا السؤال اليوم؟'), reply: t('…No. Today was the next topic. I hadn’t opened yesterday’s yet.', '…لا. اليوم كان الموضوع التالي. لم أفتح بطاقات الأمس بعد.') },
        { id: 'b', effect: 'neutral', label: t('That consistency is rare. Honestly, I wish every classroom in the school had this routine.', 'هذا الاتساق نادر. بصراحة، أتمنى لو أن كل صف في المدرسة لديه هذا الروتين.'), reply: t('Tell the head that. I’ve been saying it for a year.', 'قل ذلك للمدير. أقولها منذ سنة.') },
        { id: 'c', effect: 'closes', label: t('Collecting them isn’t the point, though. An exit ticket is formative assessment — if it doesn’t feed back into teaching, it’s just paperwork.', 'لكن جمعها ليس الغاية. بطاقة الخروج تقييم تكويني — إن لم تعد إلى التدريس فهي مجرّد أوراق.'), reply: t('Paperwork. Right. I’ll remember that next time someone asks me to model good practice.', 'أوراق. طيّب. سأتذكّر ذلك في المرة القادمة التي يُطلب مني فيها تقديم نموذج للممارسة الجيدة.') },
      ],
    },
    {
      teacherLine: t('I can’t read thirty tickets a night on top of marking. If I stop to go back every time, the scheme of work falls apart.', 'لا أستطيع قراءة ثلاثين بطاقة كل ليلة فوق التصحيح. إن توقفت لأعود في كل مرة، تنهار الخطة الدراسية.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Not reading — sorting. Three piles, ninety seconds: got it, nearly, not yet. The "not yet" pile is tomorrow’s first five minutes, and nothing else changes. Could you try it with tonight’s?', 'ليس قراءة — بل فرزًا. ثلاث كومات، تسعون ثانية: فهم، تقريبًا، ليس بعد. كومة «ليس بعد» هي الدقائق الخمس الأولى من الغد، ولا يتغيّر شيء آخر. هل تجرّبها مع بطاقات الليلة؟'), reply: t('Ninety seconds. Three piles. …That I can do before I leave the room.', 'تسعون ثانية. ثلاث كومات. …هذا أستطيع فعله قبل أن أغادر الغرفة.') },
        { id: 'b', effect: 'neutral', label: t('You don’t have to read all of them. Just dip into a few now and then to get a feel for the class.', 'لست مضطرًا لقراءتها كلها. اطّلع على بعضها بين حين وآخر لتأخذ انطباعًا عن الصف.'), reply: t('I’ll have a look when there’s a quiet week.', 'سأطّلع عليها حين يأتي أسبوع هادئ.') },
        { id: 'c', effect: 'closes', label: t('If the scheme of work is moving on while three in five don’t get it, the scheme of work is the problem, not the tickets.', 'إن كانت الخطة الدراسية تمضي بينما ثلاثة من خمسة لا يفهمون، فالمشكلة في الخطة لا في البطاقات.'), reply: t('The scheme of work came from your department. Take it up with them.', 'الخطة الدراسية جاءت من عندكم. تكلّموا مع بعضكم.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Three piles on the desk every evening now, rubber band gone. Each morning opens with the "not yet" question. The routine he was proud of finally does what it was for.', 'ثلاث كومات على المكتب كل مساء الآن، ولا رباط مطاطي. يبدأ كل صباح بسؤال «ليس بعد». الروتين الذي كان يفخر به يفعل أخيرًا ما كان من أجله.'),
    partial: t('He dips into a few tickets some evenings. The pile still grows faster than it is read, and question 2 is still not coming back.', 'يطّلع على بعض البطاقات في بعض الأمسيات. ما زالت الكومة تكبر أسرع مما تُقرأ، والسؤال ٢ ما زال لا يعود.'),
    unchanged: t('The pile is as neat as ever and twice as tall. He still hasn’t missed a day. He has stopped mentioning the routine to Toki.', 'الكومة مرتّبة كعادتها وضعف ارتفاعها. ما زال لم يفوّت يومًا. وتوقف عن ذكر الروتين أمام توكي.'),
  },
};

/** 22 — Ms. Layla, tired. Ninety essays, marked over the weekend. */
const CONVO_22: ConversationDefinition = {
  teacherName: t('Ms. Layla', 'الأستاذة ليلى'),
  stance: 'tired',
  setting: t('Friday, 2:40 pm. Three class sets of essays in a tote bag by the door, going home with her.', 'الجمعة، ٢:٤٠ بعد الظهر. ثلاث مجموعات مقالات في حقيبة قماشية عند الباب، ستذهب معها إلى البيت.'),
  read: t('Ninety essays a fortnight, every one marked. Anything that sounds like more marking will end this before it starts.', 'تسعون مقالًا كل أسبوعين، كلها مصحَّحة. أي شيء يبدو مثل مزيد من التصحيح سينهي هذا قبل أن يبدأ.'),
  turns: [
    {
      teacherLine: t('Ninety essays. Every single one has a mark and a circle on the weak paragraph. If you’re here to tell me to write more comments, I’ll be honest — there aren’t more hours.', 'تسعون مقالًا. كل واحد منها عليه درجة ودائرة حول الفقرة الضعيفة. إن كنت هنا لتقول لي اكتبي مزيدًا من التعليقات، سأكون صريحة — لا توجد ساعات أكثر.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Fewer, if anything. I watched Omar get his back: eight seconds, folded, in the bag. What do you think he did with the circle?', 'أقل، إن كان هناك شيء. راقبت عمر وهو يستلم مقاله: ثماني ثوانٍ، طواه، وضعه في الحقيبة. ماذا تظنّين أنه فعل بالدائرة؟'), reply: t('Nothing. He never does anything with the circle. None of them do. I know that.', 'لا شيء. لا يفعل شيئًا بالدائرة أبدًا. لا أحد منهم يفعل. أعرف ذلك.') },
        { id: 'b', effect: 'neutral', label: t('I know how much work that is. The marking in this department is thorough — you should hear how other schools do it.', 'أعرف كم هذا من العمل. التصحيح في هذا القسم دقيق — ينبغي أن تسمعي كيف تفعلها مدارس أخرى.'), reply: t('I’d rather not hear about other schools at 2:40 on a Friday.', 'أفضّل ألّا أسمع عن مدارس أخرى في ٢:٤٠ يوم الجمعة.') },
        { id: 'c', effect: 'closes', label: t('A mark and a circle isn’t feedback, though. Feedback has to be specific and actionable, or the research says it does nothing.', 'لكن الدرجة والدائرة ليستا تغذية راجعة. التغذية الراجعة يجب أن تكون محدّدة وقابلة للتطبيق، وإلا فإن الأبحاث تقول إنها لا تفعل شيئًا.'), reply: t('The research doesn’t mark ninety essays. Was there anything else?', 'الأبحاث لا تصحّح تسعين مقالًا. هل من شيء آخر؟') },
      ],
    },
    {
      teacherLine: t('So what, I stop marking? They’ll ask for the number anyway. Their parents will ask for the number.', 'يعني ماذا، أتوقف عن التصحيح؟ سيسألون عن الرقم على أي حال. أهلهم سيسألون عن الرقم.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Keep the number — in your markbook. On the paper, one line: "Next time, start the paragraph with the claim." Then give them the first ten minutes of Monday to redo that one paragraph. Same marking time. Would Omar get through ten minutes?', 'احتفظي بالرقم — في سجلّك. وعلى الورقة سطر واحد: «في المرة القادمة ابدأ الفقرة بالادّعاء.» ثم أعطيهم الدقائق العشر الأولى من الاثنين لإعادة تلك الفقرة وحدها. وقت التصحيح نفسه. هل يصمد عمر عشر دقائق؟'), reply: t('One line instead of a circle. And ten minutes I was going to spend starting the next essay anyway. …He might, actually.', 'سطر واحد بدل الدائرة. وعشر دقائق كنت سأقضيها في بدء المقال التالي على أي حال. …ربما يصمد فعلًا.') },
        { id: 'b', effect: 'neutral', label: t('Of course keep marking. Maybe just add a bit more detail where you can — when the essay deserves it.', 'طبعًا استمرّي في التصحيح. ربما أضيفي قليلًا من التفصيل حين تستطيعين — حين يستحق المقال ذلك.'), reply: t('Where I can. Which is nowhere, most fortnights.', 'حين أستطيع. يعني أبدًا، في أغلب الأسابيع.') },
        { id: 'c', effect: 'closes', label: t('The number is the problem. Grades without comments actually lower achievement — you’d be better off not giving one at all.', 'الرقم هو المشكلة. الدرجات بلا تعليقات تخفض التحصيل فعلًا — الأفضل ألّا تعطي درجة أصلًا.'), reply: t('You go and explain to thirty parents why there’s no mark. I’ll wait here with the essays.', 'اذهب أنت واشرح لثلاثين من الأهل لماذا لا توجد درجة. سأنتظر هنا مع المقالات.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The circle became a sentence; the number moved to the markbook. Mondays open with ten minutes on one paragraph. Omar’s third essay starts with the claim.', 'صارت الدائرة جملة؛ وانتقل الرقم إلى السجلّ. تبدأ أيام الاثنين بعشر دقائق على فقرة واحدة. المقال الثالث لعمر يبدأ بالادّعاء.'),
    partial: t('Some essays get a line now, when there is time. There is rarely time. The folded papers still go in the bag.', 'بعض المقالات تحصل على سطر الآن، حين يكون هناك وقت. ونادرًا ما يكون هناك وقت. ما زالت الأوراق المطوية تذهب إلى الحقيبة.'),
    unchanged: t('Ninety marks, ninety circles, every fortnight. The tote bag still leaves at 2:40. She has started marking in the staffroom with the door closed.', 'تسعون درجة، تسعون دائرة، كل أسبوعين. ما زالت الحقيبة تغادر في ٢:٤٠. بدأت تصحّح في غرفة المعلّمين والباب مغلق.'),
  },
};

/** 23 — Mr. Tariq, defensive. The scheme of work is not his design. */
const CONVO_23: ConversationDefinition = {
  teacherName: t('Mr. Tariq', 'الأستاذ طارق'),
  stance: 'defensive',
  setting: t('His laptop, the dashboard still open from the lesson. Strand 3 is red on the screen between you.', 'حاسوبه، واللوحة ما زالت مفتوحة منذ الدرس. المحور ٣ أحمر على الشاشة بينكما.'),
  read: t('He has had this dashboard shown to him in three meetings and been told nothing about what to do with it. He expects to be told again.', 'عُرضت عليه هذه اللوحة في ثلاثة اجتماعات ولم يُقَل له شيء عمّا يفعله بها. يتوقع أن يُقال له مجددًا.'),
  turns: [
    {
      teacherLine: t('Before you say it: I know strand 3 is red. Everyone who walks in here tells me strand 3 is red. I follow the scheme of work, and the scheme of work says week 11.', 'قبل أن تقولها: أعرف أن المحور ٣ أحمر. كل من يدخل هنا يقول لي إن المحور ٣ أحمر. أنا أتبع الخطة الدراسية، والخطة الدراسية تقول الأسبوع ١١.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I wasn’t going to say it — you clearly see it. What I don’t know is what the red is: twelve students, or three? And are they sitting together?', 'لم أكن سأقولها — من الواضح أنك تراه. ما لا أعرفه هو ما هذا الأحمر: اثنا عشر طالبًا، أم ثلاثة؟ وهل يجلسون معًا؟'), reply: t('Seven, I think. Maybe eight. …They’re where they sat in September. Nobody told me to move anyone.', 'سبعة، على ما أظن. ربما ثمانية. …يجلسون حيث جلسوا في سبتمبر. لم يقل لي أحد أن أنقل أحدًا.') },
        { id: 'b', effect: 'neutral', label: t('I’m not here about strand 3. Honestly, the dashboard is a leadership tool — what matters to me is what I saw in the lesson, and the lesson was well run.', 'لست هنا بخصوص المحور ٣. بصراحة، اللوحة أداة للقيادة — ما يهمني هو ما رأيته في الدرس، والدرس كان منظّمًا.'), reply: t('Good. Then we agree. Was that it?', 'جيد. يعني نتفق. هل انتهينا؟') },
        { id: 'c', effect: 'closes', label: t('The scheme of work is a guide, not a contract. Data-informed teaching means the dashboard overrides the plan when students aren’t learning.', 'الخطة الدراسية دليل لا عقد. التدريس المستند إلى البيانات يعني أن اللوحة تتجاوز الخطة حين لا يتعلّم الطلاب.'), reply: t('Then put that in writing and send it to the head of department, because that is not what I was told in August.', 'طيّب، اكتب ذلك وأرسله إلى رئيس القسم، لأن هذا ليس ما قيل لي في أغسطس.') },
      ],
    },
    {
      teacherLine: t('Fine — say I move those seven. Next month it’s strand 5, and the month after that it’s something else. I can’t rebuild the room every time a cell goes red.', 'حسنًا — لنقل إنني نقلت هؤلاء السبعة. الشهر القادم المحور ٥، والذي بعده شيء آخر. لا أستطيع إعادة بناء الغرفة كلما احمرّت خانة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('You shouldn’t have to. What if every red cell got one word next to it — reteach, regroup, or extend — and a name? Then strand 5 isn’t a rebuild, it’s a word. Want to try it on strand 3 now, with me?', 'لا ينبغي أن تضطر لذلك. ماذا لو حصلت كل خانة حمراء على كلمة واحدة بجانبها — إعادة تدريس، أو تجميع، أو إثراء — واسم؟ عندها لا يكون المحور ٥ إعادة بناء، بل كلمة. هل تجرّبها على المحور ٣ الآن، معي؟'), reply: t('A word and a name. …Regroup. The seven, Tuesday, while the rest do the extension. That’s — fine, that’s ten minutes of planning.', 'كلمة واسم. …تجميع. السبعة، يوم الثلاثاء، بينما يعمل الباقون على الإثراء. هذا — طيّب، هذا عشر دقائق تخطيط.') },
        { id: 'b', effect: 'neutral', label: t('Nobody’s asking you to rebuild anything. Just keep an eye on the dashboard and use your professional judgement.', 'لا أحد يطلب منك إعادة بناء شيء. راقب اللوحة فحسب واستخدم حكمك المهني.'), reply: t('My judgement says week 11. So we’re back where we started.', 'حكمي يقول الأسبوع ١١. يعني رجعنا إلى حيث بدأنا.') },
        { id: 'c', effect: 'closes', label: t('If the room needs rebuilding every month, that’s what responsive teaching looks like. Static seating since September is the real issue here.', 'إن كانت الغرفة تحتاج إلى إعادة بناء كل شهر، فهذا ما يبدو عليه التدريس المستجيب. الجلوس الثابت منذ سبتمبر هو المشكلة الحقيقية هنا.'), reply: t('Noted. I’ll add "rebuild the room monthly" to the list of things I’ve been told this year.', 'مفهوم. سأضيف «إعادة بناء الغرفة شهريًا» إلى قائمة ما قيل لي هذا العام.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Every red cell now has a word and a name beside it. Strand 3 turned amber in a fortnight; the seven sat together on Tuesdays until it did. He checks the dashboard before the scheme of work now, not after.', 'كل خانة حمراء الآن بجانبها كلمة واسم. تحوّل المحور ٣ إلى برتقالي خلال أسبوعين؛ جلس السبعة معًا أيام الثلاثاء حتى تحوّل. يفحص اللوحة قبل الخطة الدراسية الآن، لا بعدها.'),
    partial: t('He keeps an eye on the dashboard. His judgement still says week 11. Strand 3 is a lighter red, which may be the time of year.', 'يراقب اللوحة. ما زال حكمه يقول الأسبوع ١١. المحور ٣ أحمر أفتح، وقد يكون ذلك بسبب وقت السنة.'),
    unchanged: t('Week 12 next week, as planned. Strand 3 is still red, and the seven still sit where September put them. He has asked for the dashboard to be removed from his observation form.', 'الأسبوع ١٢ الأسبوع القادم، كما هو مخطط. المحور ٣ ما زال أحمر، والسبعة ما زالوا حيث وضعهم سبتمبر. طلب إزالة اللوحة من نموذج ملاحظته.'),
  },
};

/** 24 — Ms. Reem, eager. First year, and the unit just scored 90%. */
const CONVO_24: ConversationDefinition = {
  teacherName: t('Ms. Reem', 'الأستاذة ريم'),
  stance: 'eager',
  setting: t('The corridor outside the lab, test papers under her arm, on the way to show the head of department.', 'الممر خارج المختبر، أوراق الاختبار تحت ذراعها، في طريقها لتريها رئيسة القسم.'),
  read: t('Her first unit, her first good result, and she wants to be told she did it right. She did a lot right. The next ten minutes decide whether she keeps asking questions.', 'وحدتها الأولى، ونتيجتها الجيدة الأولى، وتريد أن يُقال لها إنها فعلت الصواب. فعلت الكثير من الصواب. الدقائق العشر القادمة تقرّر هل تستمر في طرح الأسئلة.'),
  turns: [
    {
      teacherLine: t('Ninety per cent average! I was so worried about this unit. I think the worksheets really worked — we did them every single lesson.', 'متوسط تسعين بالمئة! كنت قلقة جدًا من هذه الوحدة. أظن أن أوراق العمل نجحت فعلًا — عملناها في كل درس.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They clearly did — ninety is real work. Can I tell you about one answer? I asked Hind why the reaction speeds up. She scored ninety-five and she said, "we didn’t do that one." What do you make of that?', 'نجحت بوضوح — التسعون عمل حقيقي. هل لي أن أحكي لك عن إجابة واحدة؟ سألت هند لماذا يتسارع التفاعل. حصلت على خمسة وتسعين وقالت: «لم نأخذ هذا السؤال.» ما رأيك في ذلك؟'), reply: t('She said that? Hind? …The test had the worksheet questions on it. With different numbers. I thought that was the point.', 'قالت ذلك؟ هند؟ …الاختبار كان فيه أسئلة ورقة العمل. بأرقام مختلفة. ظننت أن هذه هي الفكرة.') },
        { id: 'b', effect: 'neutral', label: t('Ninety is wonderful for a first unit. Enjoy it — most new teachers don’t get a result like this until their second year.', 'التسعون رائعة لوحدة أولى. استمتعي بها — أغلب المعلّمين الجدد لا يحصلون على نتيجة كهذه حتى عامهم الثاني.'), reply: t('Thank you! I’m going to show Ms. Huda right now.', 'شكرًا! سأريها للأستاذة هدى الآن.') },
        { id: 'c', effect: 'closes', label: t('Ninety on a test that copies the worksheet doesn’t tell us much, though. That’s recall, not understanding — we need to be careful about what we celebrate.', 'لكن التسعين في اختبار ينسخ ورقة العمل لا تخبرنا بالكثير. هذا استدعاء لا فهم — علينا أن نحذر ممّا نحتفل به.'), reply: t('Oh. …I didn’t know I wasn’t supposed to use the worksheet. Nobody said.', 'آه. …لم أعرف أنه لا ينبغي لي استخدام ورقة العمل. لم يقل أحد.') },
      ],
    },
    {
      teacherLine: t('So the test was too easy? Should I rewrite it? We start the new unit Monday — I don’t really have time to redo the whole thing.', 'يعني الاختبار كان سهلًا جدًا؟ هل أعيد كتابته؟ نبدأ الوحدة الجديدة الاثنين — ليس لديّ وقت فعلًا لإعادة الأمر كله.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Don’t rewrite it. Add two questions in a context they’ve never seen — a kettle, a rusting gate — and give them tomorrow. Then ask the same two again in three weeks, mid-lesson. Would that fit?', 'لا تعيدي كتابته. أضيفي سؤالين في سياق لم يروه من قبل — غلاية، بوابة تصدأ — وأعطيهم إياهما غدًا. ثم اسألي السؤالين نفسيهما بعد ثلاثة أسابيع، في منتصف درس. هل يناسب ذلك؟'), reply: t('Two questions, tomorrow. And again in three weeks. Yes — that I can do. Can I show you them before I give them?', 'سؤالان، غدًا. ومجددًا بعد ثلاثة أسابيع. نعم — هذا أستطيع فعله. هل أريك إياهما قبل أن أعطيهما؟') },
        { id: 'b', effect: 'neutral', label: t('Not too easy — just make the next unit’s test a bit more varied. You’ll get a feel for it with experience.', 'ليس سهلًا جدًا — فقط اجعلي اختبار الوحدة القادمة أكثر تنوّعًا قليلًا. ستكتسبين الإحساس بذلك مع الخبرة.'), reply: t('Okay. More varied. I’ll try.', 'طيّب. أكثر تنوّعًا. سأحاول.') },
        { id: 'c', effect: 'closes', label: t('Honestly, the unit shouldn’t close on Monday. If the understanding isn’t there, moving on is moving on from nothing — keep it open another week.', 'بصراحة، لا ينبغي أن تُغلق الوحدة يوم الاثنين. إن لم يكن الفهم موجودًا، فالمضيّ قدمًا مضيّ من لا شيء — أبقيها مفتوحة أسبوعًا آخر.'), reply: t('Ms. Huda signed off the scheme of work. I can’t just… not start Monday. I’ll ask her.', 'الأستاذة هدى اعتمدت الخطة الدراسية. لا أستطيع… ألّا أبدأ الاثنين. سأسألها.') },
      ],
    },
  ],
  outcomes: {
    restored: t('A kettle and a rusting gate went out on Tuesday: 54%. She was quiet for a day, then rebuilt Thursday around it. Three weeks later the same two questions scored 81% — and she brought that to the head of department instead.', 'خرجت الغلاية والبوابة الصدئة يوم الثلاثاء: ٥٤٪. صمتت يومًا، ثم أعادت بناء درس الخميس حولهما. بعد ثلاثة أسابيع سجّل السؤالان نفساهما ٨١٪ — وحملت ذلك إلى رئيسة القسم بدلًا من التسعين.'),
    partial: t('The next unit’s test is "more varied". This unit closed on Monday at 90%, and Hind still can’t say why the reaction speeds up.', 'اختبار الوحدة القادمة «أكثر تنوّعًا». أُغلقت هذه الوحدة يوم الاثنين عند ٩٠٪، وما زالت هند لا تستطيع القول لماذا يتسارع التفاعل.'),
    unchanged: t('The 90% went up on the department board. Monday started the new unit. She hasn’t asked Toki a question since; she asks Ms. Huda.', 'عُلّقت التسعون على لوحة القسم. بدأ الاثنين بالوحدة الجديدة. لم تطرح على توكي سؤالًا منذ ذلك الحين؛ تسأل الأستاذة هدى.'),
  },
};

export const LEVEL_21: LevelDefinition = {
  id: 21,
  title: t('The Exit Ticket', 'بطاقة الخروج'),
  theme: t('Collected ≠ Used', 'جُمعت ≠ استُخدمت'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneAssess,
  scenario: t(
    'At the end of every lesson, students complete an exit ticket. The teacher collects them before students leave, every single day, without fail. The routine is tight and the pile of tickets is neat. Toki asks what happens to them next.',
    'في نهاية كل درس يملأ الطلاب بطاقة خروج. يجمعها المعلّم قبل أن يغادروا، كل يوم دون استثناء. الروتين محكم وكومة البطاقات مرتّبة. يسأل توكي: وماذا يحدث لها بعد ذلك؟',
  ),
  evidence: [
    { id: 'pile', x: 24, y: 40, label: t('The pile', 'الكومة'), clue: t('Yesterday’s tickets, and last week’s. Still rubber-banded. Still unread.', 'بطاقات الأمس وبطاقات الأسبوع الماضي. ما زالت مربوطة. ما زالت غير مقروءة.') },
    { id: 'ticket', x: 55, y: 66, label: t('One ticket', 'بطاقة واحدة'), clue: t('Three of five students got question 2 wrong. The same way.', 'ثلاثة من خمسة طلاب أخطؤوا في السؤال ٢. بالطريقة نفسها.') },
    { id: 'tomorrow', x: 80, y: 30, label: t('Tomorrow’s plan', 'خطة الغد'), clue: t('Starts the next topic. Question 2 never comes back.', 'تبدأ بالموضوع التالي. السؤال ٢ لا يعود أبدًا.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Toki watches the collection routine. What is the most important follow-up?', 'يراقب توكي روتين الجمع. ما أهم متابعة؟'),
      options: [
        { id: 'alignment', label: t('Whether the ticket question matched the lesson objective', 'هل طابق سؤال البطاقة هدف الدرس') },
        { id: 'timing', label: t('Whether the ticket comes early enough to act on in the lesson', 'هل تأتي البطاقة مبكرًا بما يكفي للعمل بها في الدرس') },
        { id: 'used', label: t('What the responses changed about the next lesson', 'ما الذي غيّرته الإجابات في الدرس التالي') },
        { id: 'consistency', label: t('Whether every student answered the same question', 'هل أجاب كل الطلاب عن السؤال نفسه') },
      ],
      correctId: 'used',
      hint: t('Open ‘One ticket’, then ‘Tomorrow’s plan’. Three of five got question 2 wrong the same way — can you find question 2 anywhere after today?', 'افتح «بطاقة واحدة» ثم «خطة الغد». ثلاثة من خمسة أخطؤوا في السؤال ٢ بالطريقة نفسها — هل تجد السؤال ٢ في أي مكان بعد اليوم؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The routine has never missed a day, and ‘The pile’ is still rubber-banded. If every ticket vanished tonight, what would be different tomorrow?', 'الروتين لم يفوّت يومًا، و«الكومة» ما زالت مربوطة. لو اختفت كل البطاقات الليلة، ما الذي سيختلف غدًا؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'same-lesson', label: t('Move the ticket to minute 30 so the teacher can respond before the bell', 'انقل البطاقة إلى الدقيقة ٣٠ ليستطيع المعلّم الاستجابة قبل الجرس') },
        { id: 'self-mark', label: t('Have students self-mark against the answer and keep their own ticket', 'دع الطلاب يصحّحون لأنفسهم مقابل الإجابة ويحتفظون ببطاقاتهم') },
        { id: 'return', label: t('Return the tickets next day with a tick or a cross on each one', 'أعد البطاقات في اليوم التالي بعلامة صح أو خطأ على كل منها') },
        { id: 'inform', label: t('Sort tonight’s tickets into three piles; the piles set tomorrow’s first task', 'افرز بطاقات الليلة في ثلاث كومات ودع الكومات تحدّد مهمة الغد الأولى') },
      ],
      correctId: 'inform',
      hint: t('Look at ‘One ticket’ again: three wrong, the same way. Which move puts that fact in the teacher’s hands tonight — and in the students’ way before anything new begins?', 'انظر إلى «بطاقة واحدة» مجددًا: ثلاثة أخطؤوا بالطريقة نفسها. أي خطوة تضع هذه الحقيقة بين يدي المعلّم الليلة — وأمام الطلاب قبل أن يبدأ أي شيء جديد؟'),
    },
    reasoning: {
      prompt: t('Why does tomorrow’s first five minutes matter so much?', 'لماذا تهمّ الدقائق الخمس الأولى من الغد إلى هذا الحد؟'),
      options: [
        { id: 'r1', label: t('Yesterday’s tickets are the freshest evidence the teacher holds', 'بطاقات الأمس هي أحدث دليل بيد المعلّم') },
        { id: 'r3', label: t('Starting from the tickets shows students their work is read', 'البدء من البطاقات يُري الطلاب أن عملهم يُقرأ') },
        { id: 'r2', label: t('Assessment only counts when it changes what the teacher does next', 'لا يُحتسب التقييم إلا حين يغيّر ما يفعله المعلّم بعده') },
        { id: 'r4', label: t('A misconception left overnight hardens by the next morning', 'الفهم الخاطئ المتروك ليلة يتصلّب بحلول الصباح') },
      ],
      correctId: 'r2',
      hint: t('‘The pile’ is neat, and unread. What is a neat, unread pile worth to Monday morning?', '«الكومة» مرتّبة، وغير مقروءة. ما قيمة كومة مرتّبة غير مقروءة لصباح الاثنين؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_21,
  reveal: {
    whatDrifted: t(
      'The exit ticket has become a closing ritual instead of an opening question. Evidence is collected faithfully and then never used.',
      'أصبحت بطاقة الخروج طقس ختام لا سؤال افتتاح. يُجمع الدليل بأمانة ثم لا يُستخدم أبدًا.',
    ),
    whyItHappened: t(
      'Collecting is visible and quick; reading and responding is invisible and slow. Under time pressure the visible half survives and the useful half quietly disappears.',
      'الجمع مرئي وسريع؛ والقراءة والاستجابة خفيّتان وبطيئتان. تحت ضغط الوقت يبقى النصف المرئي ويختفي النصف المفيد بهدوء.',
    ),
    howToRestore: t(
      'Assessment should inform the next instructional decision, not simply conclude the lesson. Read three tickets at the door, and let what you see decide how tomorrow starts.',
      'ينبغي للتقييم أن يوجّه القرار التدريسي التالي، لا أن يختم الدرس فحسب. اقرأ ثلاث بطاقات عند الباب، ودع ما تراه يقرّر كيف يبدأ الغد.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_22: LevelDefinition = {
  id: 22,
  title: t('Marks Without Feedback', 'درجات بلا تغذية راجعة'),
  theme: t('A Score ≠ A Next Step', 'الدرجة ≠ الخطوة التالية'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneTalk,
  scenario: t(
    'Students receive their marked essays. Scores are written clearly at the top in red, and every student knows at once whether they passed or failed. The marking was fast, consistent, and returned within a day. Toki watches what students do with the paper.',
    'يتسلّم الطلاب مقالاتهم المصحّحة. الدرجات مكتوبة بوضوح في الأعلى بالأحمر، ويعرف كل طالب فورًا هل نجح أم رسب. كان التصحيح سريعًا ومتّسقًا وأُعيد خلال يوم. يراقب توكي ما يفعله الطلاب بالورقة.',
  ),
  evidence: [
    { id: 'essay', x: 30, y: 62, label: t('A marked essay', 'مقال مصحّح'), clue: t('"14/20". One tick, one circle around a paragraph. No words.', '«١٤/٢٠». علامة صح واحدة، ودائرة حول فقرة. لا كلمات.') },
    { id: 'student', x: 62, y: 70, label: t('A student', 'طالب'), clue: t('Looks at the number, folds the paper in half, puts it in the bag. Eight seconds.', 'ينظر إلى الرقم، يطوي الورقة نصفين، يضعها في الحقيبة. ثماني ثوانٍ.') },
    { id: 'next', x: 78, y: 34, label: t('Next essay', 'المقال التالي'),  clue: t('Same paragraph problem, same student, two weeks later.', 'مشكلة الفقرة نفسها، والطالب نفسه، بعد أسبوعين.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The marks are accurate. What should Toki look for next?', 'الدرجات دقيقة. ما الذي ينبغي أن يبحث عنه توكي بعد ذلك؟'),
      options: [
        { id: 'criteria', label: t('Whether students knew the criteria before they wrote', 'هل عرف الطلاب المعايير قبل أن يكتبوا') },
        { id: 'moderated', label: t('Whether the marks are consistent across the three classes', 'هل الدرجات متّسقة عبر الصفوف الثلاثة') },
        { id: 'explained', label: t('Whether the circled paragraphs were discussed in class', 'هل نوقشت الفقرات المحاطة بدائرة في الصف') },
        { id: 'improved', label: t('What changed in the next piece of writing', 'ما الذي تغيّر في القطعة الكتابية التالية') },
      ],
      correctId: 'improved',
      hint: t('Open ‘Next essay’: two weeks later, the same paragraph problem, the same student. Which option would have made the teacher look there?', 'افتح «المقال التالي»: بعد أسبوعين، مشكلة الفقرة نفسها، والطالب نفسه. أي خيار كان سيجعل المعلّمة تنظر هناك؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The marks are fair and the system runs. Watch ‘A student’ again — what exactly failed in those eight seconds: the marking, or something after it?', 'الدرجات عادلة والنظام يعمل. راقب «طالب» مجددًا — ما الذي فشل تحديدًا في تلك الثواني الثماني: التصحيح، أم شيء بعده؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'next-step', label: t('One named next step instead of the number, then ten minutes to apply it', 'استبدل الرقم بخطوة تالية مسمّاة، ثم عشر دقائق لتطبيقها') },
        { id: 'rubric', label: t('Return the essay with the rubric row that cost the marks highlighted', 'أعد المقال مع تظليل صف سلّم التقدير الذي خسر الدرجات') },
        { id: 'conference', label: t('Hold a two-minute conference with each student about their score', 'اعقد مقابلة من دقيقتين مع كل طالب حول درجته') },
        { id: 'redraft', label: t('Ask every student to redraft the essay for a higher mark', 'اطلب من كل طالب إعادة صياغة المقال لدرجة أعلى') },
      ],
      correctId: 'next-step',
      hint: t('Watch ‘A student’ once more: eight seconds, folded, bagged. Which move would survive those eight seconds — and leave him with time to do something about it?', 'راقب «طالب» مرة أخرى: ثماني ثوانٍ، طُويت، وُضعت في الحقيبة. أي خطوة تنجو من تلك الثواني الثماني — وتترك له وقتًا ليفعل شيئًا حيالها؟'),
    },
    reasoning: {
      prompt: t('Why one step rather than a full rubric?', 'لماذا خطوة واحدة بدل سلّم تقدير كامل؟'),
      options: [
        { id: 'r1', label: t('Students read the first line and skip the rest', 'يقرأ الطلاب السطر الأول ويتخطّون البقية') },
        { id: 'r2', label: t('Feedback works only when the student can act on it today', 'لا تنجح التغذية الراجعة إلا حين يستطيع الطالب العمل بها اليوم') },
        { id: 'r3', label: t('A rubric row names the criterion but not the move', 'يسمّي صف سلّم التقدير المعيارَ لا الخطوة') },
        { id: 'r4', label: t('One comment per student is easier for the teacher to track', 'تعليق واحد لكل طالب أسهل على المعلّم في المتابعة') },
      ],
      correctId: 'r2',
      hint: t('‘Next essay’ is two weeks away. What could the student have done with the circle on the day he got it?', '«المقال التالي» بعد أسبوعين. ما الذي كان يستطيع الطالب فعله بالدائرة في اليوم الذي استلمها فيه؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_22,
  reveal: {
    whatDrifted: t(
      'Marking has become a verdict rather than a conversation. Students learn their level, but not their next move.',
      'أصبح التصحيح حكمًا لا حوارًا. يعرف الطلاب مستواهم، لكن لا يعرفون خطوتهم التالية.',
    ),
    whyItHappened: t(
      'A number is fast, fair, and easy to record. Over time the number becomes the whole product, and the guidance it was supposed to carry falls away.',
      'الرقم سريع وعادل وسهل التسجيل. ومع الوقت يصبح الرقم هو المنتج كله، ويسقط التوجيه الذي كان من المفترض أن يحمله.',
    ),
    howToRestore: t(
      'Feedback should help students understand their next steps, not only show their level. One specific, doable instruction — then time in class to act on it.',
      'ينبغي للتغذية الراجعة أن تساعد الطلاب على فهم خطواتهم التالية، لا أن تُظهر مستواهم فقط. تعليمة واحدة محددة قابلة للتنفيذ — ثم وقت في الصف للعمل بها.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_23: LevelDefinition = {
  id: 23,
  title: t('The Data Dashboard', 'لوحة البيانات'),
  theme: t('Tracked ≠ Taught', 'مُتابَع ≠ مُدرَّس'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'The teacher opens a data dashboard and shows Toki that class performance has been tracked every week since September. Trend lines, colour bands, averages by strand — it is genuinely impressive, and the teacher is rightly proud of the discipline it took. Toki looks at the lesson plan beside it.',
    'يفتح المعلّم لوحة بيانات ويُري توكي أن أداء الصف قد تُوبع كل أسبوع منذ سبتمبر. خطوط اتجاه وأشرطة ملوّنة ومتوسطات لكل محور — إنها مبهرة فعلًا، والمعلّم فخور عن حق بالانضباط الذي تطلّبته. ينظر توكي إلى خطة الدرس بجانبها.',
  ),
  evidence: [
    { id: 'chart', x: 50, y: 28, label: t('The chart', 'الرسم البياني'), clue: t('Strand 3 has been red for six weeks. The line is perfectly flat.', 'المحور ٣ أحمر منذ ستة أسابيع. الخط مستوٍ تمامًا.') },
    { id: 'plan', x: 24, y: 66, label: t('This week’s plan', 'خطة هذا الأسبوع'), clue: t('Whole class, same sequence, same pace as the scheme of work. Strand 3 isn’t mentioned.', 'الصف كله، التسلسل نفسه، الإيقاع نفسه في الخطة الدراسية. المحور ٣ غير مذكور.') },
    { id: 'groups', x: 78, y: 64, label: t('Seating', 'الجلوس'), clue: t('Same seats as September. Nobody has been regrouped around a need.', 'المقاعد نفسها منذ سبتمبر. لم يُعَد تجميع أحد حول حاجة.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The dashboard is accurate and up to date. What matters most in this moment?', 'لوحة البيانات دقيقة ومحدّثة. ما الأهم في هذه اللحظة؟'),
      options: [
        { id: 'accuracy', label: t('Whether the dashboard agrees with the markbook', 'هل تتطابق اللوحة مع سجلّ الدرجات') },
        { id: 'shaped', label: t('What the dashboard changed in this week’s plan', 'ما الذي غيّرته اللوحة في خطة هذا الأسبوع') },
        { id: 'granularity', label: t('Whether it tracks by student, not only by strand', 'هل تتابع كل طالب، لا المحاور فقط') },
        { id: 'shared', label: t('Whether students can see their own strand lines', 'هل يستطيع الطلاب رؤية خطوط محاورهم') },
      ],
      correctId: 'shaped',
      hint: t('Six red weeks on ‘The chart’. Now open ‘This week’s plan’ — can you find strand 3 in it at all?', 'ستة أسابيع حمراء على «الرسم البياني». افتح الآن «خطة هذا الأسبوع» — هل تجد المحور ٣ فيها أصلًا؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('He has seen strand 3 red for six weeks and taught the same plan each week. What does six weeks of seeing without doing cost the students in that strand — and is it beyond repair?', 'رأى المحور ٣ أحمر ستة أسابيع ودرّس الخطة نفسها كل أسبوع. ماذا تكلّف ستة أسابيع من الرؤية دون فعل طلاب ذلك المحور — وهل فات الأوان؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'student', label: t('Give each student their own strand line and a weekly target', 'أعطِ كل طالب خط محوره الخاص وهدفًا أسبوعيًا') },
        { id: 'regroup', label: t('Regroup the seating around strand 3 using this week’s dashboard scores', 'أعد تجميع الجلوس حول المحور ٣ باستخدام درجات اللوحة') },
        { id: 'decision', label: t('Pair every red cell with a named decision: reteach, regroup, or extend', 'اقرن كل خانة حمراء بقرار مسمّى: إعادة تدريس أو تجميع أو إثراء') },
        { id: 'reteach', label: t('Reteach strand 3 to the whole class in next week’s plan', 'أعد تدريس المحور ٣ للصف كله في خطة الأسبوع القادم') },
      ],
      correctId: 'decision',
      hint: t('Look at ‘Seating’ and ‘This week’s plan’ together. Two of these moves fix strand 3 once. When strand 5 turns red in March, which move is still working?', 'انظر إلى «الجلوس» و«خطة هذا الأسبوع» معًا. اثنتان من هذه الخطوات تصلحان المحور ٣ مرة واحدة. حين يحمرّ المحور ٥ في مارس، أي خطوة ما زالت تعمل؟'),
    },
    reasoning: {
      prompt: t('Why attach a decision to each cell rather than discuss the dashboard generally?', 'لماذا نربط قرارًا بكل خانة بدل مناقشة اللوحة عمومًا؟'),
      options: [
        { id: 'r1', label: t('A decision with names on it cannot be postponed to next month', 'القرار الذي يحمل أسماء لا يمكن تأجيله إلى الشهر القادم') },
        { id: 'r3', label: t('Leadership can audit decisions, not discussions', 'تستطيع القيادة تدقيق القرارات لا النقاشات') },
        { id: 'r4', label: t('Whole-class reteaching wastes the green students’ time', 'إعادة التدريس للصف كله تهدر وقت الطلاب الخُضر') },
        { id: 'r2', label: t('Data counts only when it changes what happens for specific students', 'لا تعني البيانات شيئًا إلا حين تغيّر ما يحدث لطلاب بعينهم') },
      ],
      correctId: 'r2',
      hint: t('‘The chart’ shows a flat red line. Whose names are behind it — and what has happened to them since September?', 'يُظهر «الرسم البياني» خطًا أحمر مستويًا. مَن الأسماء خلفه — وماذا حدث لهم منذ سبتمبر؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_23,
  reveal: {
    whatDrifted: t(
      'Tracking has replaced responding. The data is excellent and the teaching is unchanged by it.',
      'حلّت المتابعة محلّ الاستجابة. البيانات ممتازة والتدريس لم يتغيّر بها.',
    ),
    whyItHappened: t(
      'A dashboard rewards the discipline of updating it. That discipline feels like data use — but a chart that never changes a lesson is a diary, not a tool.',
      'تكافئ اللوحة انضباط تحديثها. يبدو ذلك الانضباط كاستخدام للبيانات — لكن رسمًا بيانيًا لا يغيّر درسًا أبدًا هو مذكّرات لا أداة.',
    ),
    howToRestore: t(
      'Data becomes meaningful when it leads to decisions, support, reteaching, or extension. Every red cell gets a decision and a date.',
      'تصبح البيانات ذات معنى حين تقود إلى قرارات ودعم وإعادة تدريس وإثراء. كل خانة حمراء تحصل على قرار وتاريخ.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_24: LevelDefinition = {
  id: 24,
  title: t('End-of-Unit Success', 'نجاح نهاية الوحدة'),
  theme: t('A High Score ≠ Deep Understanding', 'الدرجة العالية ≠ الفهم العميق'),
  subject: t('Science', 'العلوم'),
  sceneImage: scenePerfect,
  scenario: t(
    'Most students scored highly on the end-of-unit test — a class average of 86%. The teacher is pleased, the students are relieved, and the plan moves confidently to the next unit on Monday. Toki asks to see the test, and then asks one student a question that isn’t on it.',
    'حصل معظم الطلاب على درجات عالية في اختبار نهاية الوحدة — متوسط الصف ٨٦٪. المعلّم راضٍ، والطلاب مرتاحون، والخطة تنتقل بثقة إلى الوحدة التالية يوم الاثنين. يطلب توكي رؤية الاختبار، ثم يسأل طالبًا سؤالًا ليس فيه.',
  ),
  evidence: [
    { id: 'test', x: 26, y: 62, label: t('The test', 'الاختبار'), clue: t('Twenty questions. Eighteen are the worksheet questions with the numbers changed.', 'عشرون سؤالًا. ثمانية عشر منها أسئلة ورقة العمل بأرقام مختلفة.') },
    { id: 'student', x: 60, y: 70, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"Why does that happen?" — "We didn’t do that one." She scored 90%.', '«لماذا يحدث ذلك؟» — «لم نأخذ هذا السؤال.» حصلت على ٩٠٪.') },
    { id: 'board', x: 52, y: 26, label: t('Monday', 'الاثنين'), clue: t('New unit. Nothing from this one returns — not in a month, not in a term.', 'وحدة جديدة. لا شيء من هذه الوحدة يعود — لا بعد شهر ولا بعد فصل.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The scores are real. What should Toki examine before the class moves on?', 'الدرجات حقيقية. ما الذي ينبغي أن يفحصه توكي قبل أن ينتقل الصف؟'),
      options: [
        { id: 'validity', label: t('Whether the test covered every objective in the unit', 'هل غطّى الاختبار كل أهداف الوحدة') },
        { id: 'spread', label: t('Who the lower-scoring 14% are and what they missed', 'مَن هم الـ١٤٪ الأدنى وما الذي فاتهم') },
        { id: 'depth', label: t('Whether the understanding survives an unfamiliar question', 'هل يصمد الفهم أمام سؤال غير مألوف') },
        { id: 'marking', label: t('Whether the mark scheme rewarded method as well as answers', 'هل كافأ سلّم التصحيح الطريقة كما كافأ الإجابات') },
      ],
      correctId: 'depth',
      hint: t('Open ‘Ask a student’: 90%, and ‘we didn’t do that one’. What kind of question did she pass on the test — and what kind did she meet from Toki?', 'افتح «اسأل طالبًا»: ٩٠٪، و«لم نأخذ هذا السؤال». أي نوع من الأسئلة اجتازت في الاختبار — وأي نوع واجهت من توكي؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('‘Monday’ starts a new unit, and 90% says this one is finished. If the understanding is not there yet, how much harder is it to build after Monday — and is it still possible?', '«الاثنين» يبدأ وحدة جديدة، و٩٠٪ تقول إن هذه انتهت. إن لم يكن الفهم موجودًا بعد، فكم يصعب بناؤه بعد الاثنين — وهل ما زال ممكنًا؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'novel', label: t('Rewrite next unit’s test so no question mirrors the worksheet', 'أعد كتابة اختبار الوحدة القادمة بحيث لا يعكس أي سؤال ورقة العمل') },
        { id: 'transfer', label: t('Add two unfamiliar-context questions now and revisit the idea in three weeks', 'أضف سؤالَي نقل في سياق جديد، وأعد زيارة الفكرة بعد ثلاثة أسابيع') },
        { id: 'reopen', label: t('Keep the unit open one more week and reteach the two weakest questions to all', 'أبقِ الوحدة مفتوحة أسبوعًا آخر وأعد تدريس السؤالين الأضعف') },
        { id: 'extend', label: t('Give the students who scored above 80% an extension task before Monday', 'أعطِ الطلاب فوق ٨٠٪ مهمة إثراء قبل الاثنين') },
      ],
      correctId: 'transfer',
      hint: t('Look at ‘The test’ and ‘Monday’. Rewriting the next test helps the next unit; reteaching the weakest questions treats the 14%. Which move checks this unit’s 90% — and comes back to check again?', 'انظر إلى «الاختبار» و«الاثنين». إعادة كتابة الاختبار القادم تخدم الوحدة القادمة؛ وإعادة تدريس الأضعف تعالج الـ١٤٪. أي خطوة تفحص الـ٩٠٪ في هذه الوحدة — وتعود لتفحص مجددًا؟'),
    },
    reasoning: {
      prompt: t('Why does a transfer question reveal what the unit test can’t?', 'لماذا يكشف سؤال النقل ما لا يستطيع اختبار الوحدة كشفه؟'),
      options: [
        { id: 'r2', label: t('A rehearsed question can be passed from memory; an unfamiliar one cannot', 'السؤال المتدرَّب عليه يُجتاز بالحفظ؛ وغير المألوف لا يُجتاز إلا بالفهم') },
        { id: 'r1', label: t('A transfer question has no worksheet answer to copy', 'سؤال النقل لا يملك إجابة من ورقة العمل تُنسخ') },
        { id: 'r3', label: t('A lower score on it resets the teacher’s picture of the class', 'الدرجة الأدنى فيه تعيد ضبط صورة المعلّم عن الصف') },
        { id: 'r4', label: t('It checks that the method was taught, not only that the answers were memorised', 'يتحقق من أن الطريقة دُرّست، لا الإجابات فقط') },
      ],
      correctId: 'r2',
      hint: t('‘The test’: eighteen of twenty questions were the worksheet with new numbers. What did a 90% on those prove — and what did it not?', '«الاختبار»: ثمانية عشر من عشرين سؤالًا كانت ورقة العمل بأرقام جديدة. ماذا أثبتت ٩٠٪ فيها — وماذا لم تثبت؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_24,
  reveal: {
    whatDrifted: t(
      'The test measured familiarity with the test. High scores closed the unit before understanding had been checked against anything new.',
      'قاس الاختبار الألفة بالاختبار. أغلقت الدرجات العالية الوحدة قبل أن يُفحص الفهم أمام أي شيء جديد.',
    ),
    whyItHappened: t(
      'When the test mirrors the practice, scores rise and everyone feels successful — the teacher, the students, the data. There is no signal that anything is wrong, which is exactly why it drifts.',
      'عندما يعكس الاختبار التدريب، ترتفع الدرجات ويشعر الجميع بالنجاح — المعلّم والطلاب والبيانات. لا توجد إشارة إلى أن شيئًا خاطئًا، وهذا بالضبط سبب الانحراف.',
    ),
    howToRestore: t(
      'Strong scores should still be checked against depth, transfer, and long-term understanding. Two unfamiliar questions now; the idea revisited in three weeks.',
      'ينبغي فحص الدرجات القوية مقابل العمق والنقل والفهم طويل الأمد. سؤالان غير مألوفين الآن؛ وإعادة زيارة الفكرة بعد ثلاثة أسابيع.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const WORLD_2_LEVELS = [LEVEL_21, LEVEL_22, LEVEL_23, LEVEL_24];
