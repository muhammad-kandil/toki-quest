/**
 * WORLD 6 — Differentiation
 * Theme: Supporting Every Learner
 * Core idea: different does not always mean differentiated.
 */
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
import type { LevelDefinition } from '../levelTypes';
import type { ConversationDefinition } from '../conversationTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

/** 61 — Different Worksheets. Ms. Huda, whose organisation is admired across the department. */
const CONVO_61: ConversationDefinition = {
  teacherName: t('Ms. Huda', 'الأستاذة هدى'),
  stance: 'proud',
  setting: t('Three colour-coded trays on her desk: bronze, silver, gold. Every sheet filed, every name on a list.', 'ثلاثة أدراج ملوّنة على مكتبها: برونزي، فضي، ذهبي. كل ورقة مؤرشفة، وكل اسم في قائمة.'),
  read: t('Her planning is the model the department shows new teachers. Differentiated is printed on every page, and she built every one of those pages herself.', 'تخطيطها هو النموذج الذي يعرضه القسم للمعلّمين الجدد. «متمايز» مطبوعة على كل صفحة، وهي بنت كل صفحة منها بنفسها.'),
  turns: [
    {
      teacherLine: t('Three levels, every lesson, every student placed from the baseline. The head of department uses my folder for induction. What did you see?', 'ثلاثة مستويات، كل حصة، كل طالب موضوع من التقييم الأساسي. رئيسة القسم تستخدم ملفي للتدريب التمهيدي. ماذا رأيت؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('I saw why they use it — nobody was lost for a second. I sat with Omar on bronze: he was stuck on question 1 for twelve minutes. What is question 1 asking him to already know?', 'رأيت لماذا يستخدمونه — لم يضِع أحد لحظة. جلست مع عمر في البرونزي: ظل عالقًا في السؤال ١ اثنتي عشرة دقيقة. ما الذي يطلب السؤال ١ منه أن يعرفه مسبقًا؟'), reply: t('Expanding a bracket. Which he… cannot do. So the eight questions are all expanding brackets. Oh.', 'فكّ قوس. وهو… لا يستطيع. إذًا الأسئلة الثمانية كلها فكّ أقواس. آه.') },
        { id: 'b', effect: 'neutral', label: t('I saw the most organised differentiation in the school. The trays alone would take most teachers a term.', 'رأيت أكثر تمايز منظّم في المدرسة. الأدراج وحدها تستغرق معظم المعلّمين فصلًا كاملًا.'), reply: t('A summer, actually. But thank you.', 'صيفًا كاملًا، في الحقيقة. لكن شكرًا.') },
        { id: 'c', effect: 'closes', label: t('Three sheets with the same skill and different lengths is not differentiation. It is the same lesson, rationed.', 'ثلاث أوراق بالمهارة نفسها وأطوال مختلفة ليست تمايزًا. إنها الحصة نفسها، مقنَّنة.'), reply: t('Rationed. I will tell the head of department her induction folder is rationed.', 'مقنَّنة. سأخبر رئيسة القسم أن ملف التدريب التمهيدي لديها مقنَّن.') },
      ],
    },
    {
      teacherLine: t('So Omar needs a fourth sheet now? I cannot plan four levels for every lesson.', 'إذًا يحتاج عمر إلى ورقة رابعة الآن؟ لا أستطيع تخطيط أربعة مستويات لكل حصة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Still three — but bronze starts with the bracket he is missing, and gold ends with one problem nobody has seen before. Same trays, same lists. The sheets just stop being the same sheet.', 'ما زالت ثلاثة — لكن البرونزي يبدأ بالقوس الذي ينقصه، والذهبي ينتهي بمسألة لم يرها أحد من قبل. الأدراج نفسها، القوائم نفسها. فقط تتوقف الأوراق عن كونها الورقة نفسها.'), reply: t('Bronze teaches the bracket first. Gold gets a new problem at the end. That is… two pages changed, not three sheets. I could do that for Thursday.', 'البرونزي يعلّم القوس أولًا. والذهبي يحصل على مسألة جديدة في النهاية. هذا… صفحتان تغيّرتا، لا ثلاث أوراق. أستطيع فعل ذلك للخميس.') },
        { id: 'b', effect: 'neutral', label: t('Maybe move him to a different group, or re-run the baseline this month so the groups are fresh.', 'ربما انقليه إلى مجموعة مختلفة، أو أعيدي التقييم الأساسي هذا الشهر لتكون المجموعات محدَّثة.'), reply: t('I can re-baseline. It takes a lesson, but I can.', 'أستطيع إعادة التقييم الأساسي. يستغرق حصة، لكنني أستطيع.') },
        { id: 'c', effect: 'closes', label: t('One sheet for everyone, easy to hard, and support at the start. Three trays are more work for less learning.', 'ورقة واحدة للجميع، من السهل إلى الصعب، ودعم في البداية. ثلاثة أدراج عمل أكثر لتعلّم أقل.'), reply: t('One sheet. After a summer of building three. I think we are done here.', 'ورقة واحدة. بعد صيف من بناء ثلاث. أظن أننا انتهينا هنا.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Bronze opens with the bracket. Gold closes with a problem she wrote fresh that morning. The trays are still colour-coded, and for the first time the colours mean different work.', 'يبدأ البرونزي بالقوس. وينتهي الذهبي بمسألة كتبتها صباح ذلك اليوم. الأدراج ما زالت ملوّنة، ولأول مرة تعني الألوان عملًا مختلفًا.'),
    partial: t('The baseline was re-run and three students moved tray. Omar is now on silver, stuck on question 1 of twelve.', 'أُعيد التقييم الأساسي وانتقل ثلاثة طلاب بين الأدراج. عمر الآن في الفضي، عالق في السؤال ١ من اثني عشر.'),
    unchanged: t('Three trays, three lengths, one skill. The induction folder is unchanged, and so is the way she says hello to Toki in the corridor.', 'ثلاثة أدراج، ثلاثة أطوال، مهارة واحدة. ملف التدريب التمهيدي كما هو، وكذلك طريقة تحيتها لتوكي في الممر.'),
  },
};

/** 62 — One Pace for Everyone. Mr. Nasser, who found the timer after a year of chaos and will not let go of it. */
const CONVO_62: ConversationDefinition = {
  teacherName: t('Mr. Nasser', 'الأستاذ ناصر'),
  stance: 'tired',
  setting: t('The timer is still on the board, reset to 8:00. He sits down for the first time in the lesson.', 'المؤقّت ما زال على السبورة، مضبوطًا على ٨:٠٠. يجلس للمرة الأولى في الحصة.'),
  read: t('Last year this class was the one nobody wanted. The timer is how he got it back. Anything that sounds like losing the structure sounds like losing the class.', 'في العام الماضي كان هذا الصف هو الذي لا يريده أحد. المؤقّت هو ما أعاده إليه. أي شيء يبدو كخسارة البنية يبدو كخسارة الصف.'),
  turns: [
    {
      teacherLine: t('Eight minutes a step, everyone together, nobody falls behind the schedule. You should have seen this room in September. You would not be asking.', 'ثماني دقائق لكل خطوة، الجميع معًا، لا أحد يتأخر عن الجدول. كان ينبغي أن ترى هذه الغرفة في سبتمبر. لما كنت تسأل.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I heard about September. The structure is why I could watch one desk for forty minutes. Can I tell you about that desk? Two students, same timer.', 'سمعت عن سبتمبر. البنية هي السبب في أنني استطعت مراقبة طاولة واحدة أربعين دقيقة. هل أخبرك عن تلك الطاولة؟ طالبان، المؤقّت نفسه.'), reply: t('Which desk. …Fahad and Ali. Fahad finishes in three minutes and Ali never finishes anything. I know. I see them.', 'أي طاولة. …فهد وعلي. فهد ينهي في ثلاث دقائق وعلي لا ينهي شيئًا أبدًا. أعرف. أراهما.') },
        { id: 'b', effect: 'neutral', label: t('The calm in this room is an achievement. Whatever you did since September, it worked.', 'الهدوء في هذه الغرفة إنجاز. مهما فعلت منذ سبتمبر، فقد نجح.'), reply: t('It worked. I would like to keep it working.', 'نجح. وأودّ أن أبقيه ناجحًا.') },
        { id: 'c', effect: 'closes', label: t('The schedule is fine. The students are not. One is bored and one is lost, and the timer cannot see either of them.', 'الجدول بخير. الطلاب ليسوا كذلك. أحدهما يشعر بالملل والآخر ضائع، والمؤقّت لا يرى أيًّا منهما.'), reply: t('The timer cannot see. I can see. I saw thirty students throwing chairs last year. Which would you like?', 'المؤقّت لا يرى. أنا أرى. رأيت ثلاثين طالبًا يرمون الكراسي العام الماضي. أيهما تفضّل؟') },
      ],
    },
    {
      teacherLine: t('If I let them go at their own pace it is September again by Thursday. The timer is the only thing holding this.', 'إن تركتهم يسيرون بإيقاعهم الخاص، فسيعود سبتمبر بحلول الخميس. المؤقّت هو الشيء الوحيد الذي يمسك هذا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Keep the steps and the timer. Two changes: each step gets a "finished? do this" line for Fahad, and you press next when most of the room is done, not when the clock says. You are still in charge; the clock is not.', 'احتفظ بالخطوات والمؤقّت. تغييران: كل خطوة تحصل على سطر «انتهيت؟ افعل هذا» لفهد، وتضغط التالي حين ينتهي معظم الصف، لا حين يقول المؤقّت. ما زلت أنت المسؤول؛ لا الساعة.'), reply: t('I press next. Not the clock. …That is what I did in September, before the timer. It was the chairs that were the problem, not the pressing.', 'أنا أضغط التالي. لا الساعة. …هذا ما فعلته في سبتمبر، قبل المؤقّت. كانت الكراسي هي المشكلة، لا الضغط.') },
        { id: 'b', effect: 'neutral', label: t('Keep the timer. Maybe set each step from last week’s average instead of a flat eight.', 'احتفظ بالمؤقّت. ربما اضبط كل خطوة من متوسط الأسبوع الماضي بدلًا من ثمانٍ ثابتة.'), reply: t('I have the data. I can average it. Seven and a half, probably.', 'لديّ البيانات. أستطيع حساب المتوسط. سبع ونصف، على الأرجح.') },
        { id: 'c', effect: 'closes', label: t('Pair Fahad with Ali. Fahad has five spare minutes every step and Ali needs exactly that.', 'ضع فهد مع علي. لدى فهد خمس دقائق فائضة في كل خطوة وعلي يحتاج إليها تمامًا.'), reply: t('So Fahad becomes the teacher and Ali becomes his problem. That is the September I am trying not to have.', 'إذًا يصبح فهد المعلّم ويصبح علي مشكلته. هذا هو سبتمبر الذي أحاول ألا أعيشه.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The timer still runs; he presses next when the room says so. Fahad has a "finished?" line on every step. Ali finished step 3 for the first time on Tuesday and nobody threw a chair.', 'ما زال المؤقّت يعمل؛ يضغط التالي حين يقول الصف ذلك. لدى فهد سطر «انتهيت؟» في كل خطوة. أنهى علي الخطوة ٣ للمرة الأولى يوم الثلاثاء ولم يرمِ أحد كرسيًا.'),
    partial: t('Seven and a half minutes a step now, from the average. Fahad waits four and a half. Ali is still halfway through step 2 at the bell.', 'سبع دقائق ونصف لكل خطوة الآن، من المتوسط. ينتظر فهد أربع دقائق ونصفًا. علي ما زال في منتصف الخطوة ٢ عند الجرس.'),
    unchanged: t('Eight minutes, every step, every lesson. He has stopped looking up at the room at all; he looks at the door, in case the coach is in it.', 'ثماني دقائق، كل خطوة، كل حصة. توقف عن النظر إلى الصف تمامًا؛ ينظر إلى الباب، في حال كان المدرّب فيه.'),
  },
};

/** 63 — Ability Grouping. Ms. Shamsa set the groups in September and has planned around them since. */
const CONVO_63: ConversationDefinition = {
  teacherName: t('Ms. Shamsa', 'الأستاذة شمسة'),
  stance: 'defensive',
  setting: t('The seating chart on the wall between them, dated 4 September. She saw Toki photograph it.', 'مخطط الجلوس على الجدار بينهما، مؤرَّخ ٤ سبتمبر. رأت توكي يصوّره.'),
  read: t('Four groups, four tasks, every week planned in advance from a chart that has not changed. Her planning is efficient because the chart is fixed, and she knows exactly which of those two facts is about to be questioned.', 'أربع مجموعات، أربع مهام، كل أسبوع مخطط مسبقًا من مخطط لم يتغير. تخطيطها فعّال لأن المخطط ثابت، وتعرف تمامًا أيّ هاتين الحقيقتين على وشك أن تُسأل عنها.'),
  turns: [
    {
      teacherLine: t('You photographed my chart. Yes, it is from September. The baseline was thorough and the groups work. Every child knows their table.', 'صوّرت مخططي. نعم، إنه من سبتمبر. كان التقييم الأساسي شاملًا والمجموعات تعمل. كل طفل يعرف طاولته.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They do — nobody wasted a second finding a seat. One child introduced herself to me as "I am in the low group". She scored above two Eagles last month. How does the chart find out?', 'يعرفون — لم يضيّع أحد ثانية في إيجاد مقعد. قدّمت لي طفلة نفسها بـ«أنا في المجموعة الضعيفة». سجّلت أعلى من اثنين من النسور الشهر الماضي. كيف يعرف المخطط ذلك؟'), reply: t('Which child? …Maitha. "The low group." She said that? It does not find out. I would have to tell it.', 'أي طفلة؟ …ميثاء. «المجموعة الضعيفة.» قالت ذلك؟ لا يعرف. سأضطر إلى إخباره.') },
        { id: 'b', effect: 'neutral', label: t('The routine is impressive. Four tasks every lesson is more planning than most people manage with one.', 'الروتين مبهر. أربع مهام كل حصة تخطيط أكثر مما يستطيعه معظم الناس بمهمة واحدة.'), reply: t('It is only possible because the groups do not move. Change the groups and the planning falls apart.', 'هذا ممكن فقط لأن المجموعات لا تتحرك. غيّر المجموعات وينهار التخطيط.') },
        { id: 'c', effect: 'closes', label: t('Seven months, zero moves. The groups stopped describing students in October and started defining them.', 'سبعة أشهر، صفر انتقالات. توقفت المجموعات عن وصف الطلاب في أكتوبر وبدأت تحدّدهم.'), reply: t('Defining them. The baseline was two hours of testing. Perhaps you would like to re-sit it with them.', 'تحدّدهم. كان التقييم الأساسي ساعتين من الاختبار. ربما تودّ إعادته معهم.') },
      ],
    },
    {
      teacherLine: t('Fine. I move Maitha up. And the Eagle who is struggling, down. Then the chart is right again.', 'حسنًا. أنقل ميثاء إلى الأعلى. والنسر المتعثّر، إلى الأسفل. ثم يعود المخطط صحيحًا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('For this topic, yes — and that is the change: groups made from the last test, for this topic, and remade when the topic changes. The four tasks stay. The chart just gets a date that moves.', 'لهذا الموضوع، نعم — وهذا هو التغيير: مجموعات تُشكَّل من آخر اختبار، لهذا الموضوع، وتُعاد حين يتغير الموضوع. المهام الأربع تبقى. فقط يحصل المخطط على تاريخ يتحرك.'), reply: t('A date that moves. Every topic. That is… five charts a year, not one. The tasks I already have. Yes. I could keep the tasks.', 'تاريخ يتحرك. كل موضوع. هذا… خمسة مخططات في السنة، لا واحد. والمهام لديّ بالفعل. نعم. أستطيع الاحتفاظ بالمهام.') },
        { id: 'b', effect: 'neutral', label: t('Moving those two is a good start. Maybe re-run the baseline before the next term as well.', 'نقل هذين بداية جيدة. ربما أعيدي التقييم الأساسي قبل الفصل التالي أيضًا.'), reply: t('Two moves now, a new baseline in April. I can live with that.', 'انتقالان الآن، وتقييم أساسي جديد في أبريل. أستطيع التعايش مع ذلك.') },
        { id: 'c', effect: 'closes', label: t('Or drop the groups for the teaching part altogether — mixed tables, and ability only for the practice task.', 'أو تخلّي عن المجموعات في جزء التدريس كليًا — طاولات مختلطة، والمستوى فقط لمهمة التدريب.'), reply: t('Mixed tables. With this class. You have been here one lesson.', 'طاولات مختلطة. مع هذا الصف. أنت هنا منذ حصة واحدة.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The chart on the wall is dated last Monday. Maitha is at the Eagles’ table for fractions. She introduced herself to the next visitor by her name.', 'المخطط على الجدار مؤرَّخ يوم الاثنين الماضي. ميثاء على طاولة النسور لموضوع الكسور. قدّمت نفسها للزائر التالي باسمها.'),
    partial: t('Two names swapped. The chart is dated 4 September with two crossings-out, and the next change is pencilled in for April.', 'تبادل اسمان. المخطط مؤرَّخ ٤ سبتمبر مع شطبتين، والتغيير التالي مكتوب بالقلم الرصاص لشهر أبريل.'),
    unchanged: t('4 September, no crossings-out. Maitha is still a Sparrow. The photograph of the chart is the only thing that moved.', '٤ سبتمبر، لا شطب. ميثاء ما زالت عصفورة. صورة المخطط هي الشيء الوحيد الذي تحرّك.'),
  },
};

/** 64 — Help for Some. Mr. Hamad gives everything to the table that needs him most, and has nothing left. */
const CONVO_64: ConversationDefinition = {
  teacherName: t('Mr. Hamad', 'الأستاذ حمد'),
  stance: 'tired',
  setting: t('Still at the support table after the bell, a last worked example on scrap paper for one student who stayed.', 'ما زال على طاولة الدعم بعد الجرس، ومثال أخير على ورقة مسوّدة لطالب واحد بقي.'),
  read: t('Forty minutes a lesson at one table is where the progress is, and he has nothing left when it ends. He will hear "the others" as "do more".', 'أربعون دقيقة في كل حصة على طاولة واحدة هي حيث يحدث التقدّم، ولا يتبقى له شيء حين ينتهي. سيسمع «الآخرون» على أنها «افعل المزيد».'),
  turns: [
    {
      teacherLine: t('That table has moved two levels since October. Nobody else in the school managed that with them. If the price is that the strong ones work alone, I will pay it.', 'تلك الطاولة تقدّمت مستويين منذ أكتوبر. لم يحقق أحد غيري في المدرسة ذلك معهم. إن كان الثمن أن يعمل الأقوياء وحدهم، فسأدفعه.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Two levels — I saw the books, and I would not touch a minute of that table. I also saw Alia’s book. Every page since October is the same difficulty. What was she doing at minute thirteen today?', 'مستويان — رأيت الدفاتر، ولن ألمس دقيقة من تلك الطاولة. ورأيت أيضًا دفتر علياء. كل صفحة منذ أكتوبر بالصعوبة نفسها. ماذا كانت تفعل في الدقيقة الثالثة عشرة اليوم؟'), reply: t('Minute thirteen. …Copying it out again. Neatly. She does that. I thought it was nice that she takes care.', 'الدقيقة الثالثة عشرة. …تنسخه مرة أخرى. بترتيب. تفعل ذلك. ظننت أنه لطيف أنها تهتم.') },
        { id: 'b', effect: 'neutral', label: t('Two levels is remarkable. That table is the best support work I have seen this term.', 'مستويان أمر لافت. تلك الطاولة أفضل عمل داعم رأيته هذا الفصل.'), reply: t('It is the only thing I have the energy for. So it had better be.', 'إنه الشيء الوحيد الذي أملك طاقة له. فالأفضل أن يكون كذلك.') },
        { id: 'c', effect: 'closes', label: t('The strong ones are not working alone. They are not working at all. Half the class has been invisible for a term.', 'الأقوياء لا يعملون وحدهم. إنهم لا يعملون أصلًا. نصف الصف غير مرئي منذ فصل كامل.'), reply: t('Invisible. I teach thirty students with one of me. Tell me which half you would like me to stop seeing.', 'غير مرئي. أدرّس ثلاثين طالبًا بواحد مني. قل لي أي نصف تودّ أن أتوقف عن رؤيته.') },
      ],
    },
    {
      teacherLine: t('So I leave the support table and circulate. Then nobody gets anything. I have done that version of this job.', 'إذًا أترك طاولة الدعم وأتجول. فلا يحصل أحد على شيء. جرّبت تلك النسخة من هذه الوظيفة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Stay at the table. Change the task the others get: one open problem with a "prove it" line at the end. It cannot be finished in twelve minutes or copied out neatly. They work; you do not move.', 'ابقَ على الطاولة. غيّر المهمة التي يحصل عليها الآخرون: مسألة مفتوحة واحدة مع سطر «أثبت ذلك» في النهاية. لا يمكن إنهاؤها في اثنتي عشرة دقيقة ولا نسخها بترتيب. هم يعملون؛ وأنت لا تتحرك.'), reply: t('"Prove it." One problem. I do not have to be there for that. …I could write one of those tonight, if that is all it is.', '«أثبت ذلك.» مسألة واحدة. لا يلزم أن أكون هناك من أجلها. …أستطيع كتابة واحدة الليلة، إن كان هذا كل ما في الأمر.') },
        { id: 'b', effect: 'neutral', label: t('Keep the table. Maybe give the others an extension bank to choose from when they finish.', 'احتفظ بالطاولة. ربما أعطِ الآخرين بنك إثراء يختارون منه حين ينتهون.'), reply: t('There is an extension folder somewhere. I will find it.', 'هناك ملف إثراء في مكان ما. سأجده.') },
        { id: 'c', effect: 'closes', label: t('Let the strong ones tutor the support table once they finish. Then you are freed up, and they are stretched.', 'دع الأقوياء يدرّسون طاولة الدعم حين ينتهون. فتتحرر أنت، ويتحدّون هم.'), reply: t('Hand my table to the fifteen-year-olds. After October. No. We are finished.', 'أسلّم طاولتي لمن في الخامسة عشرة. بعد أكتوبر. لا. انتهينا.') },
      ],
    },
  ],
  outcomes: {
    restored: t('One open problem a lesson, "prove it" at the bottom. Alia argued with her neighbour for twenty minutes about whether her proof held. The support table did not lose a minute.', 'مسألة مفتوحة واحدة في الحصة، و«أثبت ذلك» في الأسفل. جادلت علياء جارتها عشرين دقيقة حول ما إذا كان إثباتها صامدًا. لم تخسر طاولة الدعم دقيقة.'),
    partial: t('The extension folder was found. Alia finishes the task in twelve minutes and picks an extension at the same level. The book is still October.', 'عُثر على ملف الإثراء. تنهي علياء المهمة في اثنتي عشرة دقيقة وتختار إثراءً بالمستوى نفسه. الدفتر ما زال في أكتوبر.'),
    unchanged: t('Forty minutes at the support table, as before. The confident tables copy neatly. He did not come to the next coaching meeting.', 'أربعون دقيقة على طاولة الدعم، كما من قبل. الطاولات الواثقة تنسخ بترتيب. لم يحضر اجتماع التدريب التالي.'),
  },
};

export const LEVEL_61: LevelDefinition = {
  id: 61,
  title: t('Different Worksheets', 'أوراق عمل مختلفة'),
  theme: t('Different ≠ Differentiated', 'مختلف ≠ متمايز'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'Students receive one of three worksheets — bronze, silver, or gold — based on their level. The class is beautifully organised, every student has something to do, and the lesson plan is headed "Differentiated." Toki compares the three sheets side by side.',
    'يتسلّم الطلاب واحدة من ثلاث أوراق عمل — برونزية أو فضية أو ذهبية — بحسب مستواهم. الصف منظّم بشكل جميل، ولدى كل طالب ما يفعله، وخطة الدرس معنونة بـ«متمايز». يقارن توكي الأوراق الثلاث جنبًا إلى جنب.',
  ),
  evidence: [
    { id: 'sheets', x: 26, y: 62, label: t('The three sheets', 'الأوراق الثلاث'), clue: t('Bronze: 8 questions. Silver: 12. Gold: 16. The same question type, the same skill. Only the quantity differs.', 'برونزية: ٨ أسئلة. فضية: ١٢. ذهبية: ١٦. نوع السؤال نفسه، المهارة نفسها. يختلف العدد فقط.') },
    { id: 'bronze', x: 58, y: 70, label: t('A bronze student', 'طالب برونزي'), clue: t('Stuck on question 1 — he doesn’t have the prerequisite. Eight questions he can’t start, instead of sixteen.', 'عالق عند السؤال ١ — ليست لديه المهارة السابقة. ثمانية أسئلة لا يستطيع بدأها، بدل ستة عشر.') },
    { id: 'gold', x: 80, y: 32, label: t('A gold student', 'طالبة ذهبية'), clue: t('Finished in nine minutes. Sixteen correct answers to a skill she had before the lesson began.', 'انتهت في تسع دقائق. ستة عشر إجابة صحيحة لمهارة كانت لديها قبل أن يبدأ الدرس.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('Every student has the "right" sheet. What should Toki check?', 'لدى كل طالب الورقة «الصحيحة». ما الذي ينبغي أن يتحقق منه توكي؟'),
      options: [
        { id: 'placement', label: t('How students were sorted into bronze, silver and gold', 'كيف فُرز الطلاب إلى برونزي وفضي وذهبي') },
        { id: 'alignment', label: t('Whether the sheets ask for different things, or more of the same thing', 'هل تطلب كل ورقة شيئًا مختلفًا، أم مزيدًا من الشيء نفسه') },
        { id: 'labels', label: t('What the bronze label does to the students who carry it', 'ما الذي يفعله تصنيف «برونزي» بالطلاب الذين يحملونه') },
        { id: 'movement', label: t('Whether students can move between sheets during the lesson once they finish', 'هل يستطيع الطلاب الانتقال بين الأوراق أثناء الدرس') },
      ],
      correctId: 'alignment',
      hint: t('Sorting, labels and movement are questions about the students. Look at the three-sheets clue: 8, 12, 16, one skill. What question is that clue asking about the sheets?', 'الفرز والعناوين والانتقال أسئلة عن الطلاب. انظر إلى دليل الأوراق الثلاث: ٨، ١٢، ١٦، مهارة واحدة. أي سؤال يطرحه هذا الدليل عن الأوراق؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The bronze student cannot start question 1; the gold student finished in nine minutes. The structure for helping both already exists. Is that structure broken, or is it waiting for different content?', 'طالب البرونزي لا يستطيع بدء السؤال ١؛ وطالبة الذهبي أنهت في تسع دقائق. البنية لمساعدة كليهما موجودة بالفعل. هل تلك البنية معطّلة، أم تنتظر محتوى مختلفًا؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'choice', label: t('Let students choose their sheet and move up when they finish', 'دع الطلاب يختارون ورقتهم وينتقلون إلى الأعلى حين ينهونها') },
        { id: 'one-sheet', label: t('One sheet for everyone, questions ordered from easy to hard, teacher support at the start for anyone stuck', 'ورقة واحدة للجميع، بأسئلة مرتّبة من السهل إلى الصعب، ودعم من المعلّم في البداية') },
        { id: 'regroup', label: t('Re-sort the three groups from last week’s quiz instead of the term baseline', 'أعد فرز المجموعات الثلاث من اختبار الأسبوع الماضي بدل الاختبار القاعدي للفصل') },
        { id: 'need', label: t('Three sheets that do different things: bronze teaches the prerequisite, gold applies the skill to a new problem', 'احتفظ بثلاث أوراق وغيّر ما تفعله: البرونزية تعلّم المهارة السابقة الغائبة، والذهبية تطبّق المهارة على مسألة جديدة') },
      ],
      correctId: 'need',
      hint: t('Choice, one ordered sheet and re-sorting all change who receives which quantity. Read the two student clues again: he cannot begin, she was finished before she started. Which move changes what each sheet asks for?', 'الاختيار والورقة الواحدة المرتبة وإعادة الفرز كلها تغيّر مَن يتلقى أي كمية. اقرأ دليلي البرونزي والذهبي مجددًا: هو لا يستطيع البدء، وهي أنهت قبل أن تبدأ. أي خطوة تغيّر ما تطلبه كل ورقة؟'),
    },
    reasoning: {
      prompt: t('Why does "by need" matter more than "by level"?', 'لماذا «بحسب الحاجة» أهم من «بحسب المستوى»؟'),
      options: [
        { id: 'r1', label: t('Eight questions a student cannot start is not less work, it is no work', 'ثمانية أسئلة لا يستطيع الطالب بدأها ليست عملًا أقل، بل لا عمل') },
        { id: 'r3', label: t('A gold sheet that applies the skill is the only one of the three that teaches anything new', 'الورقة الذهبية التي تطبّق المهارة هي الوحيدة من الثلاث التي تعلّم شيئًا جديدًا') },
        { id: 'r2', label: t('A label says where a student is; a need says what would move them', 'يقول التصنيف أين الطالب؛ وتقول الحاجة ما الذي سيحرّكه') },
        { id: 'r4', label: t('Three different tasks look the same on the plan and take the same time to mark', 'ثلاث مهام مختلفة تبدو متشابهة في الخطة وتستغرق الوقت نفسه في التصحيح') },
      ],
      correctId: 'r2',
      hint: t('Sixteen correct answers to a skill she already had. The gold label was accurate. What did the label know about her that would have moved her forward?', 'ست عشرة إجابة صحيحة لمهارة كانت تملكها بالفعل. كان العنوان الذهبي دقيقًا. ما الذي كان يعرفه العنوان عنها مما كان سيدفعها إلى الأمام؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_61,
  reveal: {
    whatDrifted: t(
      'Differentiation has become a sorting system. Students are grouped accurately and then given the same task in three sizes.',
      'أصبح التمايز نظام فرز. يُجمَّع الطلاب بدقة ثم يُعطون المهمة نفسها بثلاثة أحجام.',
    ),
    whyItHappened: t(
      'Three sheets is visible, plannable, and clearly "differentiated" on paper. Diagnosing what each group actually needs is slower and invisible — so the structure survives and the substance thins.',
      'ثلاث أوراق شيء مرئي وقابل للتخطيط و«متمايز» بوضوح على الورق. أما تشخيص ما تحتاجه كل مجموعة فعلًا فأبطأ وخفيّ — فتبقى البنية ويرقّ الجوهر.',
    ),
    howToRestore: t(
      'Differentiation should be based on specific learning needs, not only different materials. Start from the gap, not the label: what does this group not yet have, and what would stretch the one that has it?',
      'ينبغي أن يقوم التمايز على احتياجات تعلّم محددة، لا على مواد مختلفة فقط. ابدأ من الفجوة لا التصنيف: ما الذي لا تملكه هذه المجموعة بعد، وما الذي سيمدّ المجموعة التي تملكه؟',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_62: LevelDefinition = {
  id: 62,
  title: t('One Pace for Everyone', 'إيقاع واحد للجميع'),
  theme: t('Together ≠ Supported', 'معًا ≠ مدعوم'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'The whole class works through the same task at the same pace. The teacher moves everyone on together, every eight minutes, like clockwork — it keeps the lesson orderly and nobody is left behind the schedule. Toki watches two students at the same desk.',
    'يعمل الصف كله في المهمة نفسها بالإيقاع نفسه. ينقل المعلّم الجميع معًا كل ثماني دقائق بانتظام الساعة — يُبقي ذلك الدرس منظّمًا ولا أحد يتخلّف عن الجدول. يراقب توكي طالبين على المكتب نفسه.',
  ),
  evidence: [
    { id: 'fast', x: 26, y: 64, label: t('The fast one', 'السريع'), clue: t('Done in three minutes. Waits five. Draws on the back of the sheet. Three times this lesson.', 'انتهى في ثلاث دقائق. ينتظر خمسًا. يرسم على ظهر الورقة. ثلاث مرات في هذا الدرس.') },
    { id: 'slow', x: 56, y: 70, label: t('The struggling one', 'المتعثّر'), clue: t('Halfway through step 2 when the class is moved to step 3. Never finishes a step. Stops trying by step 4.', 'في منتصف الخطوة ٢ حين يُنقل الصف إلى الخطوة ٣. لا يُنهي خطوة أبدًا. يتوقف عن المحاولة عند الخطوة ٤.') },
    { id: 'timer', x: 80, y: 30, label: t('The timer', 'المؤقّت'), clue: t('Set to 8:00 every step, regardless of what the room shows. The teacher hasn’t looked up at step 3.', 'مضبوط على ٨:٠٠ في كل خطوة، بغضّ النظر عمّا تُظهره الغرفة. لم ينظر المعلّم إلى الأعلى عند الخطوة ٣.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The lesson is orderly and on schedule. What is the coaching focus?', 'الدرس منظّم وفي موعده. ما محور التدريب؟'),
      options: [
        { id: 'length', label: t('Whether eight minutes is the right length for these steps', 'هل ثماني دقائق هي الطول المناسب لهذه الخطوات') },
        { id: 'extension', label: t('What the fast student is given when he finishes early', 'ماذا يُعطى الطالب السريع حين ينهي مبكرًا') },
        { id: 'pacing', label: t('What decides when the class moves on — the room or the clock', 'ما الذي يقرّر متى ينتقل الصف — الغرفة أم الساعة') },
        { id: 'support', label: t('Whether the struggling student gets help before step 3 begins', 'هل يحصل الطالب المتعثّر على مساعدة قبل بدء الخطوة ٣') },
      ],
      correctId: 'pacing',
      hint: t('Extension and support are both needed at that desk. Look at the timer clue: "set to 8:00 every step, regardless of what the room shows." Which option is asking about that regardless?', 'الإثراء والدعم مطلوبان كلاهما على تلك الطاولة. انظر إلى دليل المؤقّت: «مضبوط على ٨:٠٠ لكل خطوة، بصرف النظر عما تُظهره الغرفة.» أي خيار يسأل عن ذلك «بصرف النظر»؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Read the two desk clues together: one student draws on the back of the sheet three times; the other stops trying by step 4. How many students at that desk is the lesson reaching?', 'اقرأ دليلي الطاولة معًا: طالب يرسم على ظهر الورقة ثلاث مرات؛ والآخر يتوقف عن المحاولة بحلول الخطوة ٤. كم طالبًا على تلك الطاولة تصل إليه الحصة؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'adjust', label: t('Keep the steps, add "finished? do this" to each, and move on when the room says so, not the clock', 'احتفظ بالخطوات، وأضف «انتهيت؟ افعل هذا» على كل منها، وتفقد الغرفة قبل الانتقال لا الساعة') },
        { id: 'self-pace', label: t('Put the four steps on one sheet and let every student move at their own speed', 'ضع الخطوات الأربع في ورقة واحدة ودع كل طالب يتحرك بسرعته') },
        { id: 'pairs', label: t('Pair the fast student with the struggling one so they move together', 'اقرن الطالب السريع بالمتعثّر ليتحرّكا معًا') },
        { id: 'variable', label: t('Keep the timer but set each step’s length from last week’s average finish time for that step', 'احتفظ بالمؤقّت لكن اضبط كل خطوة على متوسط وقت الإنهاء الأسبوع الماضي') },
      ],
      correctId: 'adjust',
      hint: t('Self-pacing gives up the structure; pairing makes one student the other’s timer; an average is still a number. Read the timer clue: the teacher has not looked up since step 3. Which move keeps the steps and changes who decides when they end?', 'الإيقاع الذاتي يتخلى عن البنية؛ والمزاوجة تجعل طالبًا مؤقّتًا للآخر؛ والمتوسط ما زال رقمًا. اقرأ دليل المؤقّت: لم يرفع المعلّم رأسه منذ الخطوة ٣. أي خطوة تحتفظ بالخطوات وتغيّر مَن يقرّر متى تنتهي؟'),
    },
    reasoning: {
      prompt: t('Why "check the room" rather than a longer timer?', 'لماذا «تفقّد الغرفة» بدل مؤقّت أطول؟'),
      options: [
        { id: 'r1', label: t('An extension task turns the fast student’s five idle minutes into learning', 'المهمة الإثرائية تحوّل دقائق الطالب السريع الخمس الضائعة إلى تعلّم') },
        { id: 'r2', label: t('Any fixed timer is wrong for someone; only the room can tell the teacher when to move', 'أي مؤقّت ثابت خاطئ لشخص ما؛ والغرفة وحدها تخبر المعلّم متى ينتقل') },
        { id: 'r3', label: t('Checking the room makes the teacher look up, which the timer had stopped him doing', 'تفقّد الغرفة يجعل المعلّم ينظر إلى الأعلى، وهو ما منعه المؤقّت من فعله') },
        { id: 'r4', label: t('A step that ends when most students are done is still orderly and still on schedule', 'الخطوة التي تنتهي حين ينتهي معظم الطلاب ما زالت منظّمة وما زالت ضمن الجدول') },
      ],
      correctId: 'r2',
      hint: t('Done in three minutes; halfway through step 2 at minute eight. Was there any single number that would have served both of them?', 'انتهى في ثلاث دقائق؛ وفي منتصف الخطوة ٢ عند الدقيقة الثامنة. هل كان هناك رقم واحد يخدم كليهما؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_62,
  reveal: {
    whatDrifted: t(
      'Pace has become a property of the lesson instead of a response to the learners. The clock moves everyone, and neither end of the room is being taught.',
      'أصبح الإيقاع خاصية للدرس لا استجابة للمتعلّمين. تحرّك الساعة الجميع، ولا يُدرَّس أي من طرفي الغرفة.',
    ),
    whyItHappened: t(
      'A fixed rhythm is calm, fair-looking, and keeps the plan on schedule. Reading the room every eight minutes is harder than reading a timer — so the timer quietly took over.',
      'الإيقاع الثابت هادئ ويبدو عادلًا ويُبقي الخطة في موعدها. وقراءة الغرفة كل ثماني دقائق أصعب من قراءة مؤقّت — فاستولى المؤقّت بهدوء.',
    ),
    howToRestore: t(
      'Adjust pace, support, and challenge so students remain appropriately stretched. An extension for the early finishers, a check-in before every transition, and the clock becomes a guide instead of a rule.',
      'عدّل الإيقاع والدعم والتحدي ليبقى الطلاب في حالة تحدٍّ مناسب. مهمة إثرائية للمنتهين مبكرًا، وتفقّد قبل كل انتقال، فتصبح الساعة دليلًا لا قاعدة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_63: LevelDefinition = {
  id: 63,
  title: t('Ability Grouping', 'التجميع بحسب القدرة'),
  theme: t('Grouped ≠ Growing', 'مجمَّع ≠ نامٍ'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneTalk,
  scenario: t(
    'Students sit in ability groups: Eagles, Hawks, Robins, Sparrows. The groups were set in September from a baseline test and have been the same ever since. It makes planning simple and every child knows their table. Toki asks when a student last moved.',
    'يجلس الطلاب في مجموعات بحسب القدرة: النسور والصقور والعصافير والدوري. حُددت المجموعات في سبتمبر من اختبار قاعدي وبقيت كما هي منذ ذلك الحين. يجعل ذلك التخطيط بسيطًا ويعرف كل طفل طاولته. يسأل توكي: متى انتقل طالب آخر مرة؟'),
  evidence: [
    { id: 'chart', x: 50, y: 28, label: t('The seating chart', 'مخطط الجلوس'), clue: t('Dated 4 September. No crossings-out. Seven months, zero moves.', 'مؤرّخ ٤ سبتمبر. لا شطب. سبعة أشهر، صفر انتقالات.') },
    { id: 'sparrow', x: 24, y: 66, label: t('A Sparrow', 'طالب من الدوري'), clue: t('Scored higher than two Eagles on last month’s test. Still a Sparrow. Introduces herself to Toki as "I’m in the low group."', 'حصلت على درجة أعلى من اثنين من النسور في اختبار الشهر الماضي. ما زالت من الدوري. تقدّم نفسها لتوكي: «أنا في المجموعة الضعيفة.»') },
    { id: 'eagle', x: 78, y: 66, label: t('An Eagle', 'طالب من النسور'), clue: t('Struggling with this topic specifically. Gets the Eagle task anyway. Copies from his neighbour.', 'يتعثّر في هذا الموضوع تحديدًا. يحصل على مهمة النسور رغم ذلك. ينسخ من جاره.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The groups are tidy and stable. What should Toki question?', 'المجموعات مرتّبة ومستقرة. ما الذي ينبغي أن يتساءل عنه توكي؟'),
      options: [
        { id: 'flexibility', label: t('How often the groups are re-made, and from what evidence', 'كم مرة تُعاد المجموعات، ومن أي دليل') },
        { id: 'identity', label: t('What "I’m in the low group" is doing to the Sparrow’s effort', 'ما الذي تفعله «أنا في المجموعة الضعيفة» بجهد طالبة الدوري') },
        { id: 'tasks', label: t('Whether the Eagle task is actually harder or only labelled so', 'هل مهمة النسور أصعب فعلًا أم مسمّاة كذلك فقط') },
        { id: 'baseline', label: t('Whether the September baseline tested the right things', 'هل اختبر الاختبار القاعدي في سبتمبر الأشياء الصحيحة') },
      ],
      correctId: 'flexibility',
      hint: t('The label and the baseline are both real questions. Look at the seating-chart clue: dated 4 September, no crossings-out. Which option is asking about the crossings-out?', 'العنوان والتقييم الأساسي كلاهما سؤالان حقيقيان. انظر إلى دليل مخطط الجلوس: مؤرَّخ ٤ سبتمبر، لا شطب. أي خيار يسأل عن الشطب؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The Sparrow clue: she introduces herself as "I’m in the low group" and outscored two Eagles. What has the group become for her, and how long has it been that?', 'دليل العصفورة: تقدّم نفسها بـ«أنا في المجموعة الضعيفة» وتفوّقت على اثنين من النسور. ماذا أصبحت المجموعة بالنسبة لها، ومنذ متى؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'retest', label: t('Re-run the baseline this month and re-set the four groups from it', 'أعد الاختبار القاعدي هذا الشهر وأعد ضبط المجموعات الأربع منه') },
        { id: 'move-two', label: t('Move the Sparrow up and the Eagle down today, and keep the rest as they are', 'انقل طالبة الدوري إلى الأعلى وطالب النسور إلى الأسفل اليوم، وأبقِ البقية كما هم') },
        { id: 'regroup', label: t('Regroup by this topic from the latest evidence, and plan to regroup again next topic', 'أعد التجميع بحسب الموضوع الحالي من أحدث الأدلة، وخطّط لإعادة التجميع في الموضوع التالي') },
        { id: 'mixed', label: t('Mixed tables for the teaching, ability groups only for the practice task that follows', 'طاولات مختلطة للتدريس، ومجموعات بحسب القدرة لمهمة التدريب فقط') },
      ],
      correctId: 'regroup',
      hint: t('A new baseline redraws the chart once; moving two students fixes two students once; mixed tables change where grouping happens. Read the Eagle clue: strong in general, stuck in this one. Which move expects the chart to change again?', 'التقييم الأساسي الجديد يعيد رسم المخطط مرة واحدة؛ ونقل طالبين يصلح طالبين مرة واحدة؛ والطاولات المختلطة تغيّر مكان التجميع. اقرأ دليل النسر: قوي عمومًا، عالق في هذا الموضوع تحديدًا. أي خطوة تتوقع أن يتغير المخطط مرة أخرى؟'),
    },
    reasoning: {
      prompt: t('Why "regroup by topic, from evidence" rather than a fresh baseline?', 'لماذا «إعادة التجميع بحسب الموضوع من الأدلة» بدل اختبار قاعدي جديد؟'),
      options: [
        { id: 'r2', label: t('A student is strong in one topic and stuck in another; a fixed group cannot know that', 'الطالب قوي في موضوع وعالق في آخر؛ والمجموعة التي لا تتغيّر لا تستطيع معرفة ذلك') },
        { id: 'r1', label: t('A group that changes every topic cannot become a label a child introduces herself with', 'المجموعة التي تتغيّر كل موضوع لا يمكن أن تصبح تصنيفًا تقدّم به طفلة نفسها') },
        { id: 'r3', label: t('Last month’s test is better evidence than September’s for this month’s teaching', 'اختبار الشهر الماضي دليل أفضل من اختبار سبتمبر لتدريس هذا الشهر') },
        { id: 'r4', label: t('Planning to regroup forces the teacher to keep collecting evidence', 'التخطيط لإعادة التجميع يجبر المعلّم على مواصلة جمع الأدلة') },
      ],
      correctId: 'r2',
      hint: t('An Eagle copying from his neighbour; a Sparrow scoring above two Eagles. What did the September chart know about either of them today?', 'نسر ينقل من جاره؛ وعصفورة تسجّل أعلى من اثنين من النسور. ماذا كان يعرف مخطط سبتمبر عن أيّ منهما اليوم؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_63,
  reveal: {
    whatDrifted: t(
      'Grouping has hardened from a teaching tool into an identity. A September snapshot decides every lesson, and students have learned who they are from their table.',
      'تصلّب التجميع من أداة تدريس إلى هوية. لقطة سبتمبر تقرّر كل درس، وتعلّم الطلاب من هم من طاولتهم.',
    ),
    whyItHappened: t(
      'Stable groups make planning easy and the room predictable. Moving students takes evidence, time, and a conversation — so nobody moves, and the groups quietly become labels.',
      'تجعل المجموعات المستقرة التخطيط سهلًا والغرفة متوقعة. يحتاج نقل الطلاب إلى أدلة ووقت وحوار — فلا ينتقل أحد، وتصبح المجموعات تصنيفات بهدوء.',
    ),
    howToRestore: t(
      'Grouping should remain flexible and responsive, not fixed or limiting. Group by the current need, from the latest evidence, and move students as often as the evidence says.',
      'ينبغي أن يبقى التجميع مرنًا ومستجيبًا، لا ثابتًا ولا مقيِّدًا. جمّع بحسب الحاجة الحالية من أحدث الأدلة، وانقل الطلاب بقدر ما تقوله الأدلة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach'],
};

export const LEVEL_64: LevelDefinition = {
  id: 64,
  title: t('Help for Some', 'مساعدة للبعض'),
  theme: t('Support ≠ Stretch', 'الدعم ≠ التحدي'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: sceneOut,
  scenario: t(
    'The teacher spends almost the whole lesson at one table, working intensively with the students who struggle most. It is patient, skilful support, and those students are making real progress. The confident students work independently at the other tables. Toki goes to look at what they’re doing.',
    'يقضي المعلّم الدرس كله تقريبًا على طاولة واحدة، يعمل بتركيز مع الطلاب الأكثر تعثّرًا. إنه دعم صبور وماهر، وأولئك الطلاب يحرزون تقدّمًا حقيقيًا. يعمل الطلاب الواثقون باستقلالية على الطاولات الأخرى. يذهب توكي لينظر ما يفعلونه.',
  ),
  evidence: [
    { id: 'support', x: 24, y: 64, label: t('The support table', 'طاولة الدعم'), clue: t('Excellent. Patient, precise, responsive. Forty minutes of the teacher’s best work.', 'ممتاز. صبور ودقيق ومستجيب. أربعون دقيقة من أفضل عمل المعلّم.') },
    { id: 'confident', x: 58, y: 70, label: t('The independent tables', 'الطاولات المستقلة'), clue: t('Finished the task in twelve minutes. Doing it again, neatly, because there was nothing else.', 'أنهوا المهمة في اثنتي عشرة دقيقة. يعيدونها بإتقان لأنه لم يكن هناك شيء آخر.') },
    { id: 'book', x: 80, y: 32, label: t('A confident student’s book', 'دفتر طالب واثق'), clue: t('Every piece of work this term at the same level of difficulty. Nothing has stretched her since October.', 'كل عمل هذا الفصل بمستوى الصعوبة نفسه. لم يتحدّها شيء منذ أكتوبر.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The support is excellent. What might be missing?', 'الدعم ممتاز. ما الذي قد يكون غائبًا؟'),
      options: [
        { id: 'balance', label: t('Whether forty minutes at one table is too much of the teacher’s time', 'هل أربعون دقيقة على طاولة واحدة أكثر من اللازم من وقت المعلّم') },
        { id: 'dependence', label: t('Whether the support table is becoming dependent on the teacher', 'هل تصبح طاولة الدعم معتمدة على المعلّم') },
        { id: 'checking', label: t('Whether the independent tables’ work is ever checked', 'هل يُفحص عمل الطاولات المستقلة أصلًا') },
        { id: 'challenge', label: t('Whether anyone at the independent tables has been stretched since October', 'هل تحدّى شيءٌ أحدًا على الطاولات المستقلة منذ أكتوبر') },
      ],
      correctId: 'challenge',
      hint: t('The first clue says the support is excellent; nothing in the evidence says dependence. Look at the confident student’s book: "same level since October". Which option is reading that book?', 'يقول الدليل الأول إن الدعم ممتاز؛ ولا شيء في الأدلة يقول اعتمادًا. انظر إلى دفتر الطالبة الواثقة: «المستوى نفسه منذ أكتوبر». أي خيار يقرأ ذلك الدفتر؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('Half the class finished in twelve minutes and did the task again, neatly. Since October. Inside a practice everyone praises. Who has been lost here, and for how long?', 'أنهى نصف الصف في اثنتي عشرة دقيقة وأعاد المهمة، بترتيب. منذ أكتوبر. داخل ممارسة يمدحها الجميع. مَن ضاع هنا، ومنذ متى؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'rotate', label: t('Split the forty minutes: twenty at the support table, twenty circulating the independent tables', 'قسّم الدقائق الأربعين: عشرون على طاولة الدعم، وعشرون مع الطاولات المستقلة') },
        { id: 'stretch', label: t('Keep the support; design the independent task to stretch: an open problem with a "prove it" step', 'احتفظ بالدعم، وصمّم المهمة المستقلة لتتحدّى: مسألة مفتوحة بخطوة «أثبت ذلك»، تُفحص في الدقائق العشر الأخيرة') },
        { id: 'peer', label: t('Have the confident students tutor the support table once they finish', 'اجعل الطلاب الواثقين يعلّمون طاولة الدعم حين ينتهون') },
        { id: 'extension-bank', label: t('Give the independent tables an extension bank to pick from when they finish early', 'أعطِ الطاولات المستقلة بنك إثراء يختارون منه حين ينهون مبكرًا') },
      ],
      correctId: 'stretch',
      hint: t('Splitting the time costs the table that is progressing. Tutoring and an extension bank both start only after the task is done — in twelve minutes. Read the book clue again: which move changes what the task itself asks of her?', 'تقسيم الوقت يكلّف الطاولة التي تتقدّم. التدريس بين الأقران وبنك الإثراء كلاهما يبدأ فقط بعد إنجاز المهمة — في اثنتي عشرة دقيقة. اقرأ دليل الدفتر مجددًا: أي خطوة تغيّر ما تطلبه المهمة نفسها منها؟'),
    },
    reasoning: {
      prompt: t('Why design the task rather than redistribute the teacher?', 'لماذا نصمّم المهمة بدل إعادة توزيع المعلّم؟'),
      options: [
        { id: 'r1', label: t('The support table is the teacher’s best work; cutting it would cost the students who need him most', 'طاولة الدعم أفضل عمل للمعلّم؛ وقطعها سيكلّف الطلاب الأكثر حاجة إليه') },
        { id: 'r3', label: t('A "prove it" step cannot be finished in twelve minutes and redone neatly', 'خطوة «أثبت ذلك» لا يمكن إنهاؤها في اثنتي عشرة دقيقة وإعادتها بإتقان') },
        { id: 'r4', label: t('The last ten minutes give the teacher a reason to visit the other tables', 'الدقائق العشر الأخيرة تعطي المعلّم سببًا لزيارة الطاولات الأخرى') },
        { id: 'r2', label: t('A well-designed task stretches the students the teacher is not standing next to', 'المهمة المصمّمة جيدًا تتحدّى الطلاب الذين لا يقف المعلّم بجانبهم') },
      ],
      correctId: 'r2',
      hint: t('Finished in twelve, copied out neatly for twenty-eight. The teacher never left the support table. What was reaching her for those twenty-eight minutes?', 'أنهت في اثنتي عشرة، ونسخت بترتيب ثمانيًا وعشرين. لم يغادر المعلّم طاولة الدعم قط. ما الذي كان يصل إليها خلال تلك الدقائق الثماني والعشرين؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_64,
  reveal: {
    whatDrifted: t(
      'Differentiation has come to mean "help for those who struggle." The support is superb, and the students who could go furthest haven’t been asked to go anywhere.',
      'صار التمايز يعني «مساعدة للمتعثّرين». الدعم رائع، والطلاب الذين يستطيعون الذهاب أبعد لم يُطلب منهم الذهاب إلى أي مكان.',
    ),
    whyItHappened: t(
      'Struggle is visible and urgent; coasting is quiet and looks like success. A caring teacher naturally goes where the need is loudest, and the silent need goes unmet all term.',
      'التعثّر مرئي وعاجل؛ والركود هادئ ويبدو نجاحًا. يذهب المعلّم المهتم طبيعيًا إلى حيث الحاجة الأعلى صوتًا، وتبقى الحاجة الصامتة دون تلبية طوال الفصل.',
    ),
    howToRestore: t(
      'Differentiation should support students who struggle and extend those ready for deeper challenge. Protect the support table — and give the other tables a task that would be worth the teacher’s time, even when she can’t give it.',
      'ينبغي للتمايز أن يدعم الطلاب المتعثّرين ويمدّ المستعدين لتحدٍّ أعمق. احمِ طاولة الدعم — وأعطِ الطاولات الأخرى مهمة تستحق وقت المعلّم، حتى حين لا يستطيع منحه.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['inclusive-coach', 'mutation-hunter'],
};

export const WORLD_6_LEVELS = [LEVEL_61, LEVEL_62, LEVEL_63, LEVEL_64];
