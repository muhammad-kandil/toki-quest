/**
 * WORLD 3 — Alef in Action
 * Theme: Using Technology With Purpose
 * Core idea: technology should amplify thinking, not replace it.
 */
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
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

/** 31 — Mr. Hamad, proud. His 100% is the slide at the staff meeting. */
const CONVO_31: ConversationDefinition = {
  teacherName: t('Mr. Hamad', 'الأستاذ حمد'),
  stance: 'proud',
  setting: t('His desk, after the lesson. The dashboard is on the projector behind him, completion column first.', 'مكتبه، بعد الدرس. اللوحة على جهاز العرض خلفه، وعمود الإنجاز أولًا.'),
  read: t('The 100% was on a slide at Monday’s staff meeting with his name under it. He earned that number and he knows what it took.', 'كانت المئة بالمئة على شريحة في اجتماع الاثنين واسمه تحتها. استحقّ ذلك الرقم ويعرف ما كلّفه.'),
  turns: [
    {
      teacherLine: t('Every lesson assigned, every lesson completed, every week since October. The head showed it to the whole staff. Which other class is at a hundred?', 'كل درس مكلَّف به، كل درس مُنجَز، كل أسبوع منذ أكتوبر. عرضها المدير على كل المعلّمين. أي صف آخر عند المئة؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('None — yours is the only one, and that took work. Can we open one attempt together? Sara’s, maybe. I’d like to see what a completed lesson looks like from the inside.', 'لا أحد — صفك هو الوحيد، وهذا تطلّب جهدًا. هل نفتح محاولة واحدة معًا؟ محاولة سارة مثلًا. أودّ أن أرى كيف يبدو درس مُنجَز من الداخل.'), reply: t('Sure. Sara’s… eleven minutes. The video was — hm. She skipped it. At four seconds. Let me open another one.', 'طبعًا. محاولة سارة… إحدى عشرة دقيقة. الفيديو كان — همم. تخطّته. عند الثانية الرابعة. دعني أفتح محاولة أخرى.') },
        { id: 'b', effect: 'neutral', label: t('Nobody else is close. It’s a real achievement, and the head was right to show it.', 'لا أحد قريب. إنه إنجاز حقيقي، وكان المدير محقًا في عرضه.'), reply: t('I think so too. Anything else you needed?', 'أظن ذلك أيضًا. هل تحتاج إلى شيء آخر؟') },
        { id: 'c', effect: 'closes', label: t('Completion isn’t learning, though. The check average on the same dashboard is 41%. A hundred per cent of students finishing a lesson they didn’t understand isn’t something to celebrate.', 'لكن الإنجاز ليس تعلّمًا. متوسط الاختبار على اللوحة نفسها ٤١٪. إكمال مئة بالمئة من الطلاب لدرس لم يفهموه ليس شيئًا يُحتفل به.'), reply: t('The head celebrated it. Take it up with him. I did what the target said.', 'المدير احتفل به. راجعه أنت. أنا فعلت ما قاله الهدف.') },
      ],
    },
    {
      teacherLine: t('So they skip the video. They still do the questions. The lesson is complete — that’s what the target is. If the target was the check score, someone should have said.', 'يعني يتخطّون الفيديو. ما زالوا يحلّون الأسئلة. الدرس مكتمل — هذا هو الهدف. لو كان الهدف درجة الاختبار، لكان على أحد أن يقول.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Nobody said — that’s fair. Here’s what I’d try: tomorrow, open the check column before the completion column, and let the lowest question set the first five minutes. Same lesson, same target. Does that cost you anything?', 'لم يقل أحد — هذا صحيح. إليك ما سأجرّبه: غدًا، افتح عمود الاختبار قبل عمود الإنجاز، ودع السؤال الأدنى يحدّد الدقائق الخمس الأولى. الدرس نفسه، الهدف نفسه. هل يكلّفك ذلك شيئًا؟'), reply: t('Open the other column first. …No, it doesn’t cost me anything. I just never looked at it first.', 'افتح العمود الآخر أولًا. …لا، لا يكلّفني شيئًا. فقط لم أنظر إليه أولًا قط.') },
        { id: 'b', effect: 'neutral', label: t('You’re right that the target is completion. Maybe just glance at the check scores now and then so nothing surprises you.', 'أنت محق في أن الهدف هو الإنجاز. ربما ألقِ نظرة على درجات الاختبار بين حين وآخر حتى لا يفاجئك شيء.'), reply: t('I’ll glance. Nothing surprises me in that class anyway.', 'سألقي نظرة. لا شيء يفاجئني في ذلك الصف على أي حال.') },
        { id: 'c', effect: 'closes', label: t('Someone is saying it now. A lesson where students skip the teaching at 0:04 isn’t complete, whatever the column says — and that needs to change before next week.', 'أحدهم يقوله الآن. درس يتخطّى فيه الطلاب الشرح عند الثانية الرابعة ليس مكتملًا، مهما قال العمود — وهذا يجب أن يتغيّر قبل الأسبوع القادم.'), reply: t('Before next week. Right. And when the hundred drops, that’s on you, not me.', 'قبل الأسبوع القادم. طيّب. وحين تنخفض المئة، فذلك عليك لا عليّ.') },
      ],
    },
  ],
  outcomes: {
    restored: t('He opens the check column first now. The 100% slipped to 97% and the check average climbed to 63%. The next slide at the staff meeting had both numbers on it, and his name under both.', 'يفتح عمود الاختبار أولًا الآن. انزلقت المئة إلى ٩٧٪ وارتفع متوسط الاختبار إلى ٦٣٪. الشريحة التالية في اجتماع المعلّمين كان عليها الرقمان، واسمه تحتهما.'),
    partial: t('He glances at the check scores. The completion column still comes first, the videos are still skipped, and 41% is still the number nobody puts on a slide.', 'يلقي نظرة على درجات الاختبار. عمود الإنجاز ما زال أولًا، والفيديوهات ما زالت تُتخطّى، و٤١٪ ما زال الرقم الذي لا يضعه أحد على شريحة.'),
    unchanged: t('Still 100%, and still 41%. He sends Toki the completion report every Thursday without a message attached.', 'ما زالت مئة بالمئة، وما زالت ٤١٪. يرسل تقرير الإنجاز إلى توكي كل خميس دون أي رسالة مرفقة.'),
  },
};

/** 32 — Ms. Shamma, eager. She trusts the students to be independent. */
const CONVO_32: ConversationDefinition = {
  teacherName: t('Ms. Shamma', 'الأستاذة شمّا'),
  stance: 'eager',
  setting: t('Her desk at the front, the live view minimised in the corner of her screen. Students filing out.', 'مكتبها في المقدّمة، والعرض المباشر مصغَّر في زاوية شاشتها. الطلاب يغادرون.'),
  read: t('She chose not to hover — she calls it trust, and she means it. She will take a better idea in a second if it doesn’t sound like control.', 'اختارت ألّا تحوم حولهم — تسمّيه ثقة، وتعنيها. ستأخذ فكرة أفضل في ثانية إن لم تبدُ كالسيطرة.'),
  turns: [
    {
      teacherLine: t('I know some coaches want me walking the rows the whole time. I made a choice: they work independently, and I don’t stand over them. They’re fourteen, not nine.', 'أعرف أن بعض المدرّبين يريدونني أمشي بين الصفوف طوال الوقت. اتخذت قرارًا: يعملون باستقلالية، ولا أقف فوق رؤوسهم. عمرهم أربعة عشر، لا تسعة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Agreed — nobody learns with someone standing over them. Can I show you one student, though? Back row, Ahmed. He opened the same explanation four times and never raised his hand. What do you think he was doing?', 'موافق — لا أحد يتعلّم وأحدهم واقف فوق رأسه. لكن هل أريك طالبًا واحدًا؟ الصف الخلفي، أحمد. فتح الشرح نفسه أربع مرات ولم يرفع يده قط. ماذا تظنّين أنه كان يفعل؟'), reply: t('Four times? …He never asks. He’s one of the quiet ones. I thought he was just slow and careful.', 'أربع مرات؟ …لا يسأل أبدًا. من الهادئين. ظننته بطيئًا ودقيقًا فحسب.') },
        { id: 'b', effect: 'neutral', label: t('I think that’s a mature approach. The room was calm and everyone was on the right lesson — that’s more than a lot of classes manage.', 'أظن أن هذه مقاربة ناضجة. كانت الغرفة هادئة والجميع في الدرس الصحيح — وهذا أكثر مما تستطيعه صفوف كثيرة.'), reply: t('Thank you — I think the calm matters. So we’re good?', 'شكرًا — أظن أن الهدوء مهم. إذًا كل شيء على ما يرام؟') },
        { id: 'c', effect: 'closes', label: t('Independence without monitoring isn’t independence, it’s absence. With devices you have to watch the thinking, not the room — the live view exists for that.', 'الاستقلالية دون مراقبة ليست استقلالية بل غياب. مع الأجهزة عليك أن تراقبي التفكير لا الغرفة — العرض المباشر موجود لهذا.'), reply: t('Absence. Okay. I’ll open the live view and watch dots move, if that’s what the observation form wants.', 'غياب. طيّب. سأفتح العرض المباشر وأراقب النقاط تتحرّك، إن كان هذا ما يريده نموذج الملاحظة.') },
      ],
    },
    {
      teacherLine: t('So I should have gone to him? If I go to Ahmed, I have to go to all of them, and then I’m hovering again. Where’s the line?', 'يعني كان ينبغي أن أذهب إليه؟ إن ذهبت إلى أحمد، عليّ أن أذهب إليهم جميعًا، وعندها أعود إلى الحوم. أين الحد؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Not all of them — two. Live view open on the corner of your screen, one walk through the room with one question, and the two students the view shows stuck come to your desk for three minutes. The rest never notice. Could you try it Thursday?', 'ليس جميعهم — اثنان. العرض المباشر مفتوح في زاوية شاشتك، جولة واحدة في الغرفة بسؤال واحد، والطالبان اللذان يُظهرهما العرض عالقين يأتيان إلى مكتبك ثلاث دقائق. البقية لا يلاحظون. هل تجرّبينها الخميس؟'), reply: t('Two, to my desk. That’s not hovering — that’s… office hours. Thursday. I’ll have the view open.', 'اثنان، إلى مكتبي. هذا ليس حومًا — هذا… ساعات مكتبية. الخميس. سيكون العرض مفتوحًا.') },
        { id: 'b', effect: 'neutral', label: t('There’s no hard line. Use your instincts — you clearly know the class. Maybe check in a bit more often.', 'لا يوجد حد صارم. استخدمي حدسك — من الواضح أنك تعرفين الصف. ربما اطمئنّي عليهم أكثر قليلًا.'), reply: t('A bit more often. Sure. I thought I was already doing that.', 'أكثر قليلًا. طبعًا. ظننت أنني أفعل ذلك بالفعل.') },
        { id: 'c', effect: 'closes', label: t('The line is that every student who’s stuck gets help within a minute. If that means circulating the whole lesson, that’s the job with devices.', 'الحد هو أن كل طالب عالق يحصل على المساعدة خلال دقيقة. وإن كان ذلك يعني التجوّل طوال الدرس، فهذه هي الوظيفة مع الأجهزة.'), reply: t('The whole lesson. So, hovering. We’ve gone in a circle.', 'طوال الدرس. يعني، حوم. درنا دورة كاملة.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The live view lives in the corner of her screen now. Two students a lesson come to the desk; Ahmed was the first. He raised his hand in week three, which she mentioned to Toki before anything else.', 'يعيش العرض المباشر في زاوية شاشتها الآن. طالبان في كل درس يأتيان إلى المكتب؛ كان أحمد أولهما. رفع يده في الأسبوع الثالث، وهو ما ذكرته لتوكي قبل أي شيء آخر.'),
    partial: t('She checks in "a bit more often". Ahmed still clicks the same explanation and still doesn’t raise his hand; the calm room is the same calm room.', 'تطمئنّ عليهم «أكثر قليلًا». ما زال أحمد يضغط على الشرح نفسه ولا يرفع يده؛ الغرفة الهادئة هي الغرفة الهادئة نفسها.'),
    unchanged: t('The live view is open, full screen, so the form is satisfied. She watches the dots. Ahmed is a dot that does not move.', 'العرض المباشر مفتوح بملء الشاشة، فالنموذج راضٍ. تراقب النقاط. أحمد نقطة لا تتحرّك.'),
  },
};

/** 33 — Ms. Maha, tired. She gives up her Sunday evenings to the review. */
const CONVO_33: ConversationDefinition = {
  teacherName: t('Ms. Maha', 'الأستاذة مها'),
  stance: 'tired',
  setting: t('Monday, 7:20 am. Her annotated report from last night is on the desk, the pen still on it.', 'الاثنين، ٧:٢٠ صباحًا. تقريرها المعلَّق عليه من ليلة أمس على المكتب، والقلم ما زال فوقه.'),
  read: t('She spends every Sunday evening on this report because she was told it mattered. Nobody has ever asked her what she wrote. Start with the report, not the plan.', 'تقضي كل مساء أحد على هذا التقرير لأنها أُخبرت أنه مهم. لم يسألها أحد قط عمّا كتبت. ابدأ من التقرير لا من الخطة.'),
  turns: [
    {
      teacherLine: t('I do the review every Sunday. Two hours, every group, every strand. I don’t think anyone has read it once. So if this is about the review, it’s done.', 'أراجع كل أحد. ساعتان، كل مجموعة، كل محور. لا أظن أن أحدًا قرأها ولو مرة. فإن كان الأمر يخصّ المراجعة، فهي منجَزة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I read it — last three Sundays. The same line each time: "Group B weak on fractions — again." You spotted it before anyone. What happened to Group B on the Mondays after?', 'قرأتها — الآحاد الثلاثة الأخيرة. السطر نفسه في كل مرة: «المجموعة ب ضعيفة في الكسور — مجددًا.» لاحظتِه قبل الجميع. ماذا حدث للمجموعة ب في أيام الاثنين التي تلت؟'), reply: t('The Mondays… were the plan. Week 5, week 6. The plan doesn’t have fractions in it. I wrote it down and then I taught the plan.', 'أيام الاثنين… كانت الخطة. الأسبوع ٥، الأسبوع ٦. الخطة لا تحتوي على كسور. كتبتها ثم درّست الخطة.') },
        { id: 'b', effect: 'neutral', label: t('Two hours a week on review is more than most people give. The detail in your notes is excellent — I mean that.', 'ساعتان أسبوعيًا على المراجعة أكثر مما يعطيه أغلب الناس. التفاصيل في ملاحظاتك ممتازة — أعنيها.'), reply: t('Thank you. It would be nice if that showed up somewhere.', 'شكرًا. سيكون لطيفًا لو ظهر ذلك في مكان ما.') },
        { id: 'c', effect: 'closes', label: t('The review isn’t the job, though. Reviewing data without acting on it is just reading — the two hours only count if Monday changes.', 'لكن المراجعة ليست الوظيفة. مراجعة البيانات دون العمل بها مجرّد قراءة — الساعتان لا تُحتسبان إلا إن تغيّر الاثنين.'), reply: t('Just reading. Two hours of my Sunday is just reading. Noted.', 'مجرّد قراءة. ساعتان من مساء الأحد عندي مجرّد قراءة. مفهوم.') },
      ],
    },
    {
      teacherLine: t('So I should change the plan every week for every group? I have four groups and one of me. The review already takes my whole evening.', 'يعني أغيّر الخطة كل أسبوع لكل مجموعة؟ لديّ أربع مجموعات وأنا واحدة. المراجعة تأخذ مسائي كله بالفعل.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Not the plan — the last line. Each note ends with a verb and a group: "reteach — B, Tuesday." Then Monday morning you check the plan against that one line, not the whole report. That’s two hours becoming two hours and a minute. Try it next Sunday?', 'ليست الخطة — بل السطر الأخير. كل ملاحظة تنتهي بفعل ومجموعة: «إعادة تدريس — ب، الثلاثاء.» ثم صباح الاثنين تقارنين الخطة بذلك السطر الواحد، لا بالتقرير كله. هذه ساعتان تصبحان ساعتين ودقيقة. هل تجرّبينها الأحد القادم؟'), reply: t('A verb and a group. "Reteach — B, Tuesday." …That is one line. I could have written that three weeks ago.', 'فعل ومجموعة. «إعادة تدريس — ب، الثلاثاء.» …هذا سطر واحد. كان بإمكاني كتابته قبل ثلاثة أسابيع.') },
        { id: 'b', effect: 'neutral', label: t('Not every week — just when something stands out. Fractions for Group B stands out. Fit it in where you can.', 'ليس كل أسبوع — فقط حين يبرز شيء. الكسور للمجموعة ب تبرز. أدخليها حيث تستطيعين.'), reply: t('Where I can. I’ll look for a gap in week 8.', 'حيث أستطيع. سأبحث عن فجوة في الأسبوع ٨.') },
        { id: 'c', effect: 'closes', label: t('Honestly, the review could be half as long if it ended in decisions. Spend one hour reviewing and one hour planning the response — that’s the balance.', 'بصراحة، يمكن أن تكون المراجعة نصف طولها لو انتهت بقرارات. اقضي ساعة في المراجعة وساعة في تخطيط الاستجابة — هذا هو التوازن.'), reply: t('So now my review is too long as well. I’ll shorten it. I’ll shorten it to nothing.', 'يعني الآن مراجعتي طويلة أيضًا. سأقصّرها. سأقصّرها إلى لا شيء.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Every Sunday note ends with a verb and a group now. Group B had fractions on Tuesday and again on Thursday; the fourth Sunday’s line read "B — fractions holding". She still spends two hours. They go somewhere.', 'كل ملاحظة أحد تنتهي بفعل ومجموعة الآن. أخذت المجموعة ب الكسور الثلاثاء ومجددًا الخميس؛ سطر الأحد الرابع قال «ب — الكسور صامدة». ما زالت تقضي ساعتين. وتذهبان إلى مكان.'),
    partial: t('She is looking for a gap in week 8. The Sunday report is as careful as ever. Group B is weak on fractions — again.', 'تبحث عن فجوة في الأسبوع ٨. تقرير الأحد دقيق كعادته. المجموعة ب ضعيفة في الكسور — مجددًا.'),
    unchanged: t('The Sunday report is shorter now, as promised. Four lines. Group B is not in it. The plan is identical for all four groups.', 'تقرير الأحد أقصر الآن، كما وعدت. أربعة أسطر. المجموعة ب ليست فيه. الخطة متطابقة للمجموعات الأربع.'),
  },
};

/** 34 — Mr. Nasser, defensive. The policy allows it; he will not police sentences. */
const CONVO_34: ConversationDefinition = {
  teacherName: t('Mr. Nasser', 'الأستاذ ناصر'),
  stance: 'defensive',
  setting: t('The Arabic department office. The essay is on the table between you, flawless, and he has read it twice.', 'مكتب قسم اللغة العربية. المقال على الطاولة بينكما، خالٍ من العيوب، وقد قرأه مرتين.'),
  read: t('He has been accused, by implication, of letting students cheat. He has the policy open on his phone. The essay is not the argument to have.', 'اتُّهم، ضمنًا، بالسماح للطلاب بالغش. السياسة مفتوحة على هاتفه. المقال ليس الجدال الذي ينبغي خوضه.'),
  turns: [
    {
      teacherLine: t('The school policy allows AI for writing support. I have it right here. If someone wants to ban it, that’s above my pay grade — I am not going to interrogate thirty students about every sentence.', 'سياسة المدرسة تسمح بالذكاء الاصطناعي لدعم الكتابة. ها هي هنا. إن أراد أحد منعه، فذلك فوق صلاحياتي — لن أستجوب ثلاثين طالبًا عن كل جملة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I’m not here about the policy — it allows it, you’re right. I asked Salma one thing: "explain this sentence". She read it aloud twice and said it means what it says. What did she learn writing this?', 'لست هنا بخصوص السياسة — إنها تسمح به، أنت محق. سألت سلمى شيئًا واحدًا: «اشرحي هذه الجملة». قرأتها بصوت مرتفع مرتين وقالت إنها تعني ما تقوله. ماذا تعلّمت سلمى وهي تكتب هذا؟'), reply: t('…She couldn’t explain her own sentence? Salma? She’s one of my strongest — on paper. On paper. I see what you did there.', '…لم تستطع شرح جملتها؟ سلمى؟ إنها من أقوى طلابي — على الورق. على الورق. فهمت ما تقصده.') },
        { id: 'b', effect: 'neutral', label: t('Nobody’s talking about banning anything. The policy is sensible, and honestly the essay reads beautifully.', 'لا أحد يتحدث عن منع شيء. السياسة معقولة، وبصراحة المقال يُقرأ بشكل جميل.'), reply: t('It does read beautifully. So we agree the policy is fine. Good.', 'يُقرأ بشكل جميل فعلًا. يعني نتفق على أن السياسة جيدة. طيّب.') },
        { id: 'c', effect: 'closes', label: t('The policy allows support, not substitution. A pasted essay with one draft and a one-minute history isn’t support — and it’s your task that let it through.', 'السياسة تسمح بالدعم لا بالاستبدال. مقال ملصوق بمسودة واحدة وسجلّ من دقيقة واحدة ليس دعمًا — ومهمتك هي التي سمحت بمروره.'), reply: t('My task. Of course. Shall I also take responsibility for the internet while we’re here?', 'مهمتي. طبعًا. هل أتحمّل مسؤولية الإنترنت أيضًا ما دمنا هنا؟') },
      ],
    },
    {
      teacherLine: t('So what do you want — handwritten essays in exam conditions? They’ll use it at home anyway. I can’t see the draft history from my living room.', 'طيّب ماذا تريد — مقالات بخط اليد في ظروف امتحان؟ سيستخدمونه في البيت على أي حال. لا أستطيع رؤية سجلّ المسودات من غرفة معيشتي.'),
      options: [
        { id: 'a', effect: 'opens', label: t('Keep the tool — move the thinking. The plan comes first, in Salma’s own words, before she opens anything; the tool gives feedback on that plan; and the last five minutes she defends one paragraph to you out loud. The tool stays in the middle. Would that work with this class?', 'احتفظ بالأداة — وانقل التفكير. الخطة أولًا، بكلمات سلمى، قبل أن تفتح أي شيء؛ تعطي الأداة تغذية راجعة على تلك الخطة؛ وفي الدقائق الخمس الأخيرة تدافع عن فقرة واحدة أمامك بصوت مرتفع. تبقى الأداة في المنتصف. هل ينجح ذلك مع هذا الصف؟'), reply: t('Plan first, tool in the middle, defend it at the end. …Nobody can paste a plan in their own words. Fine. Fine, that I can mark.', 'الخطة أولًا، الأداة في المنتصف، الدفاع في النهاية. …لا أحد يستطيع لصق خطة بكلماته. طيّب. طيّب، هذا أستطيع تصحيحه.') },
        { id: 'b', effect: 'neutral', label: t('Not exam conditions. Maybe just remind them that the tool is for support, and trust them to use it properly.', 'ليست ظروف امتحان. ربما ذكّرهم فقط بأن الأداة للدعم، وثق بهم في استخدامها كما ينبغي.'), reply: t('I remind them every week. Salma was in the room when I did.', 'أذكّرهم كل أسبوع. كانت سلمى في الغرفة حين فعلت.') },
        { id: 'c', effect: 'closes', label: t('Yes — handwritten first drafts in class, no exceptions. If the thinking can’t be seen, it can’t be assessed, and right now none of it can be seen.', 'نعم — مسودات أولى بخط اليد في الصف، دون استثناء. إن لم يمكن رؤية التفكير فلا يمكن تقييمه، والآن لا يمكن رؤية أي منه.'), reply: t('No exceptions. Thirty handwritten essays a fortnight, in 2026. I’ll send you my marking when it’s done — around June.', 'دون استثناء. ثلاثون مقالًا بخط اليد كل أسبوعين، في ٢٠٢٦. سأرسل لك تصحيحي حين ينتهي — حوالي يونيو.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The plan comes first now, in the students’ own words, and the last five minutes belong to one paragraph said aloud. Salma’s next essay had crossings-out in it. He showed Toki the draft history without being asked.', 'تأتي الخطة أولًا الآن، بكلمات الطلاب، والدقائق الخمس الأخيرة لفقرة واحدة تُقال بصوت مرتفع. المقال التالي لسلمى كان فيه شطب. أرى توكي سجلّ المسودات دون أن يُطلب منه.'),
    partial: t('He reminds them every week that the tool is for support. The essays are still flawless, the histories still one minute long, and nobody is asked to explain a sentence.', 'يذكّرهم كل أسبوع بأن الأداة للدعم. ما زالت المقالات خالية من العيوب، والسجلّات بطول دقيقة واحدة، ولا يُطلب من أحد شرح جملة.'),
    unchanged: t('The policy is still open on his phone whenever Toki walks past the office. The essays are flawless. He has not asked Salma a question since.', 'السياسة ما زالت مفتوحة على هاتفه كلما مرّ توكي بالمكتب. المقالات خالية من العيوب. لم يطرح على سلمى سؤالًا منذ ذلك الحين.'),
  },
};

export const LEVEL_31: LevelDefinition = {
  id: 31,
  title: t('100% Completion', 'إنجاز ١٠٠٪'),
  theme: t('Completed ≠ Learned', 'مُنجَز ≠ مُتعلَّم'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'Every student has completed the assigned Alef lesson, and the teacher proudly shows Toki the dashboard: 100%, every name green. The class worked quietly and finished with ten minutes to spare. The teacher has been recognised twice this term for completion rates. Toki opens one student’s lesson.',
    'أكمل كل طالب درس «ألف» المكلَّف به، ويعرض المعلّم بفخر على توكي لوحة البيانات: ١٠٠٪، كل اسم باللون الأخضر. عمل الصف بهدوء وأنهى قبل الموعد بعشر دقائق. حصل المعلّم على تقدير مرتين هذا الفصل لمعدلات الإنجاز. يفتح توكي درس أحد الطلاب.',
  ),
  evidence: [
    { id: 'dashboard', x: 52, y: 26, label: t('The dashboard', 'لوحة البيانات'), clue: t('100% completion. Average score on the lesson check: 41%.', 'إنجاز ١٠٠٪. متوسط الدرجة في اختبار الدرس: ٤١٪.') },
    { id: 'student', x: 25, y: 66, label: t('A student’s screen', 'شاشة طالب'), clue: t('Eleven minutes on a 25-minute lesson. The explanation video: skipped at 0:04.', 'إحدى عشرة دقيقة في درس مدته ٢٥ دقيقة. فيديو الشرح: تم تخطّيه عند ٠:٠٤.') },
    { id: 'teacher', x: 80, y: 60, label: t('The teacher', 'المعلّم'), clue: t('Marking at the desk. Hasn’t opened a student’s attempt — only the completion column.', 'يصحّح على مكتبه. لم يفتح محاولة أي طالب — عمود الإنجاز فقط.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The dashboard is green. What would Toki examine next?', 'لوحة البيانات خضراء. ما الذي سيفحصه توكي بعد ذلك؟'),
      options: [
        { id: 'time', label: t('Time on task per student against the lesson’s expected length', 'وقت كل طالب في المهمة مقابل المدة المتوقعة للدرس') },
        { id: 'evidence', label: t('Lesson-check scores and one opened attempt per group', 'درجات اختبار الدرس ومحاولة مفتوحة واحدة لكل مجموعة') },
        { id: 'fit', label: t('Whether the assigned lesson matched the week’s objective', 'هل طابق الدرس المكلَّف به هدف الأسبوع') },
        { id: 'skips', label: t('How many students skipped the explanation video', 'كم طالبًا تخطّى فيديو الشرح') },
      ],
      correctId: 'evidence',
      hint: t('Two numbers on ‘The dashboard’: 100% and 41%. ‘The teacher’ has only ever opened one of those columns. Which option opens the other — and looks inside a student’s work?', 'رقمان على «لوحة البيانات»: ١٠٠٪ و٤١٪. «المعلّم» لم يفتح قط سوى أحد العمودين. أي خيار يفتح الآخر — وينظر داخل عمل طالب؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The number on the staff-meeting slide is 100%. Look at ‘A student’s screen’: what is that number evidence of — and what does it say about the 41%?', 'الرقم على شريحة اجتماع المعلّمين هو ١٠٠٪. انظر إلى «شاشة طالب»: على ماذا يدلّ هذا الرقم — وماذا يقول عن الـ٤١٪؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'lock', label: t('Set a minimum time on the lesson and lock the video so it cannot be skipped', 'حدّد وقتًا أدنى للدرس واقفل الفيديو حتى لا يمكن تخطّيه') },
        { id: 'retake', label: t('Have every student below 60% on the check redo the lesson this week', 'دع كل طالب دون ٦٠٪ في الاختبار يعيد الدرس هذا الأسبوع') },
        { id: 'shift', label: t('Open three attempts with the teacher; let the check scores set tomorrow’s plan', 'افتح ثلاث محاولات مع المعلّم ودع درجات الاختبار تضع خطة الغد') },
        { id: 'report', label: t('Ask leadership to recognise check scores alongside completion', 'اطلب من القيادة تقدير درجات الاختبار إلى جانب الإنجاز') },
      ],
      correctId: 'shift',
      hint: t('Look at ‘The teacher’: marking, completion column only. Three of these moves change what students must do or what gets praised. Which move changes what he looks at first tomorrow morning?', 'انظر إلى «المعلّم»: يصحّح، وعمود الإنجاز فقط. ثلاث من هذه الخطوات تغيّر ما يجب على الطلاب فعله أو ما يُمتدح. أي خطوة تغيّر ما ينظر إليه أولًا صباح الغد؟'),
    },
    reasoning: {
      prompt: t('Why start the conversation with the lesson check rather than the completion column?', 'لماذا نبدأ الحديث باختبار الدرس لا بعمود الإنجاز؟'),
      options: [
        { id: 'r1', label: t('The check is the only column students cannot game by clicking faster', 'الاختبار هو العمود الوحيد الذي لا يستطيع الطلاب التلاعب به بالنقر أسرع') },
        { id: 'r2', label: t('What the teacher looks at first is what the class learns to optimise for', 'ما ينظر إليه المعلّم أولًا هو ما يتعلّم الصف تحسينه') },
        { id: 'r3', label: t('The check scores are the ones leadership will eventually ask about', 'درجات الاختبار هي ما ستسأل عنه القيادة في النهاية') },
        { id: 'r4', label: t('A 41% average is the more urgent number on that dashboard', 'متوسط ٤١٪ هو الرقم الأكثر إلحاحًا على تلك اللوحة') },
      ],
      correctId: 'r2',
      hint: t('‘A student’s screen’: the video skipped at 0:04. Who taught the class that skipping is fine — and how?', '«شاشة طالب»: الفيديو تُخطّي عند الثانية الرابعة. مَن علّم الصف أن التخطّي مقبول — وكيف؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_31,
  reveal: {
    whatDrifted: t(
      'Completion has become the goal. Students have learned how to finish an Alef lesson quickly; the teacher has learned to watch the column that rewards that.',
      'أصبح الإنجاز هو الهدف. تعلّم الطلاب كيف يُنهون درس «ألف» بسرعة؛ وتعلّم المعلّم مراقبة العمود الذي يكافئ ذلك.',
    ),
    whyItHappened: t(
      'Completion is the easiest number to see, report, and praise. When it gets recognised, it gets optimised — by teachers and students alike — and the lesson check quietly stops mattering.',
      'الإنجاز أسهل رقم يُرى ويُبلَّغ ويُمدَح. وحين يُقدَّر، يُحسَّن — من المعلّمين والطلاب على السواء — ويتوقف اختبار الدرس بهدوء عن أن يهم.',
    ),
    howToRestore: t(
      'Completion is valuable, but coaching should focus on what students understood, struggled with, and learned. Open three attempts together; let the check scores, not the green column, set tomorrow’s plan.',
      'الإنجاز قيّم، لكن التدريب ينبغي أن يركّز على ما فهمه الطلاب وما تعثّروا فيه وما تعلّموه. افتحا ثلاث محاولات معًا؛ ودعا درجات الاختبار، لا العمود الأخضر، تضع خطة الغد.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_32: LevelDefinition = {
  id: 32,
  title: t('Students on Devices', 'طلاب على الأجهزة'),
  theme: t('Quiet ≠ Thinking', 'الهدوء ≠ التفكير'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'All students are logged into Alef and working on their devices. The room is calm and focused — no chatter, no movement, every head down. The teacher tells Toki this is the best-behaved class in the grade. Toki walks the rows and looks at the screens, not the faces.',
    'كل الطلاب مسجّلون في «ألف» ويعملون على أجهزتهم. الغرفة هادئة ومركّزة — لا ثرثرة ولا حركة، كل الرؤوس منخفضة. يخبر المعلّم توكي أن هذا أفضل صف سلوكًا في المرحلة. يمشي توكي بين الصفوف وينظر إلى الشاشات لا الوجوه.',
  ),
  evidence: [
    { id: 'row1', x: 22, y: 64, label: t('Front row', 'الصف الأمامي'), clue: t('Three screens, same question, three different wrong answers submitted without a pause.', 'ثلاث شاشات، السؤال نفسه، ثلاث إجابات خاطئة مختلفة أُرسلت دون توقف.') },
    { id: 'row3', x: 58, y: 70, label: t('Back row', 'الصف الخلفي'), clue: t('A student has clicked through the same explanation four times. Stuck, silent, and not raising a hand.', 'طالب ضغط على الشرح نفسه أربع مرات. عالق وصامت ولا يرفع يده.') },
    { id: 'teacher', x: 80, y: 36, label: t('The teacher', 'المعلّم'), clue: t('At the front desk, watching the room, not the Alef live view. Calm.', 'على المكتب الأمامي، يراقب الغرفة لا عرض «ألف» المباشر. هادئ.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The room is silent and on-task. What should Toki check first?', 'الغرفة صامتة ومنهمكة. ما الذي ينبغي أن يتحقق منه توكي أولًا؟'),
      options: [
        { id: 'behaviour', label: t('Whether every student is on the assigned lesson, not another tab', 'هل كل طالب في الدرس المكلَّف به لا في تبويب آخر') },
        { id: 'pace', label: t('Whether the lesson’s pace suits the class — too fast, too slow', 'هل يناسب إيقاع الدرس الصف — أسرع أم أبطأ من اللازم') },
        { id: 'liveview', label: t('Whether the teacher has the Alef live view open', 'هل عرض «ألف» المباشر مفتوح عند المعلّم') },
        { id: 'thinking', label: t('What is happening on the screens between a question and an answer', 'ماذا يحدث على الشاشات بين السؤال والإجابة') },
      ],
      correctId: 'thinking',
      hint: t('‘Front row’: three wrong answers with no pause. ‘Back row’: the same explanation four times. Which option asks about the seconds before each click?', '«الصف الأمامي»: ثلاث إجابات خاطئة دون توقف. «الصف الخلفي»: الشرح نفسه أربع مرات. أي خيار يسأل عن الثواني التي تسبق كل نقرة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The students are present and the platform works; what is missing is one person’s attention. Look at ‘Back row’ — how far has that gap travelled so far, and how fast is it moving?', 'الطلاب حاضرون والمنصة تعمل؛ الغائب هو انتباه شخص واحد. انظر إلى «الصف الخلفي» — إلى أي مدى اتسعت هذه الفجوة حتى الآن، وبأي سرعة تتحرّك؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'pairs', label: t('Pair students on one device so stuck students have to talk before they click', 'ضع الطلاب في أزواج على جهاز واحد ليضطر العالق إلى الحديث قبل النقر') },
        { id: 'connect', label: t('Live view open, circulate with one question, pull two stuck students aside mid-lesson', 'العرض المباشر مفتوح، تجوّل بسؤال واحد، واسحب طالبين عالقين في منتصف الدرس') },
        { id: 'hands', label: t('Agree a signal — a red card on the desk — so stuck students can ask without speaking', 'اتفق على إشارة — بطاقة حمراء على الطاولة — ليطلب العالق المساعدة دون كلام') },
        { id: 'checkpoint', label: t('Stop the class twice a lesson for a whole-class check on the hardest question', 'أوقف الصف مرتين في الدرس لفحص جماعي للسؤال الأصعب') },
      ],
      correctId: 'connect',
      hint: t('Look at ‘Back row’ again: four clicks, no hand. Three of these moves wait for a signal from him. Which move reaches him without one?', 'انظر إلى «الصف الخلفي» مجددًا: أربع نقرات، ولا يد مرفوعة. ثلاث من هذه الخطوات تنتظر إشارة منه. أي خطوة تصل إليه دونها؟'),
    },
    reasoning: {
      prompt: t('Why is active monitoring the lever here?', 'لماذا المراقبة النشطة هي الرافعة هنا؟'),
      options: [
        { id: 'r1', label: t('Students stay on task when they know the teacher can see their screen at any moment', 'يبقى الطلاب في المهمة حين يعرفون أن المعلّم يرى شاشاتهم') },
        { id: 'r3', label: t('The live view shows wrong answers faster than circulating can', 'يُظهر العرض المباشر الإجابات الخاطئة أسرع مما يستطيع التجوّل') },
        { id: 'r4', label: t('A stuck student who is helped once will ask for help next time', 'الطالب العالق الذي يُساعَد مرة سيطلب المساعدة في المرة التالية') },
        { id: 'r2', label: t('Devices make thinking private; monitoring makes it visible before silence becomes habit', 'يجعل الجهاز التفكير خاصًا؛ والمراقبة تجعله مرئيًا قبل أن يتعلّم الطلاب الصمت') },
      ],
      correctId: 'r2',
      hint: t('‘Back row’: four clicks and not a word. What is he practising, lesson after lesson, besides English?', '«الصف الخلفي»: أربع نقرات ولا كلمة. ما الذي يتدرّب عليه، درسًا بعد درس، غير الإنجليزية؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_32,
  reveal: {
    whatDrifted: t(
      'Calm has been read as learning. Students are behaving well and thinking alone — and alone, some of them are stuck without anyone noticing.',
      'قُرئ الهدوء تعلّمًا. يحسن الطلاب السلوك ويفكّرون وحدهم — ووحدهم يعلق بعضهم دون أن يلاحظ أحد.',
    ),
    whyItHappened: t(
      'A device turns thinking inward. The classroom signals a teacher usually reads — hands, faces, talk — go quiet, and quiet is easy to mistake for focus.',
      'يحوّل الجهاز التفكير إلى الداخل. تصمت الإشارات التي يقرؤها المعلّم عادةً — الأيدي والوجوه والحديث — والصمت يسهل الخلط بينه وبين التركيز.',
    ),
    howToRestore: t(
      'Device use should be connected to active learning, teacher monitoring, and purposeful follow-up. Live view open, circulate with a question, and act on what the screens show.',
      'ينبغي ربط استخدام الأجهزة بالتعلّم النشط ومراقبة المعلّم والمتابعة الهادفة. العرض المباشر مفتوح، تجوّل بسؤال، واعمل بما تُظهره الشاشات.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_33: LevelDefinition = {
  id: 33,
  title: t('Data Without Decisions', 'بيانات بلا قرارات'),
  theme: t('Reviewed ≠ Responded', 'مُراجَع ≠ مُستجاب له'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneOut,
  scenario: t(
    'The teacher reviews Alef data every Sunday evening — she shows Toki the routine with real pride, and the reports are annotated by hand. Then she continues with the same lesson sequence, for all students, at the same pace. Toki asks what changed last week because of the data.',
    'تراجع المعلّمة بيانات «ألف» كل مساء أحد — تُري توكي الروتين بفخر حقيقي، والتقارير معلّق عليها بخط اليد. ثم تواصل تسلسل الدروس نفسه، لكل الطلاب، بالإيقاع نفسه. يسأل توكي: ما الذي تغيّر الأسبوع الماضي بسبب البيانات؟',
  ),
  evidence: [
    { id: 'report', x: 26, y: 40, label: t('Annotated report', 'تقرير معلّق عليه'), clue: t('"Group B weak on fractions — again." Written three Sundays in a row.', '«المجموعة ب ضعيفة في الكسور — مجددًا.» مكتوبة ثلاثة أحاد متتالية.') },
    { id: 'plan', x: 56, y: 66, label: t('The week plan', 'خطة الأسبوع'), clue: t('Identical for all four groups. Fractions were covered in week 3; the plan has moved on.', 'متطابقة للمجموعات الأربع. غُطّيت الكسور في الأسبوع ٣؛ والخطة انتقلت.') },
    { id: 'alef', x: 80, y: 30, label: t('Alef assignment', 'تكليف «ألف»'), clue: t('One lesson assigned to the whole class. The platform’s "assign by group" has never been used.', 'درس واحد مكلَّف به الصف كله. خاصية «التكليف حسب المجموعة» في المنصة لم تُستخدم قط.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The reviewing is diligent. What is the key coaching focus?', 'المراجعة دؤوبة. ما محور التدريب الأساسي؟'),
      options: [
        { id: 'response', label: t('What Monday’s plan does differently because of Sunday’s notes', 'ما الذي تفعله خطة الاثنين بشكل مختلف بسبب ملاحظات الأحد') },
        { id: 'grouping', label: t('Whether the four groups are still the right four groups', 'هل ما زالت المجموعات الأربع هي المجموعات الأربع الصحيحة') },
        { id: 'depth', label: t('Whether the notes name a misconception or only a topic', 'هل تسمّي الملاحظات فهمًا خاطئًا أم موضوعًا فقط') },
        { id: 'platform', label: t('Whether the teacher knows the "assign by group" feature exists', 'هل تعرف المعلّمة بوجود خاصية «التكليف حسب المجموعة»') },
      ],
      correctId: 'response',
      hint: t('‘Annotated report’: the same sentence three Sundays running. ‘The week plan’: identical for all four groups. Which option puts those two clues side by side?', '«تقرير معلّق عليه»: الجملة نفسها ثلاثة آحاد متتالية. «خطة الأسبوع»: متطابقة للمجموعات الأربع. أي خيار يضع هذين الدليلين جنبًا إلى جنب؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('Group B has been named three Sundays in a row while ‘The week plan’ moved on. What is compounding for them each week — and are they still reachable?', 'ذُكرت المجموعة ب ثلاثة آحاد متتالية بينما مضت «خطة الأسبوع». ما الذي يتراكم عليهم كل أسبوع — وهل ما زال يمكن الوصول إليهم؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'reteach', label: t('Reteach fractions to Group B this week, then return to the scheme of work', 'أعد تدريس الكسور للمجموعة ب هذا الأسبوع، ثم عد إلى الخطة الدراسية') },
        { id: 'feature', label: t('Show her "assign by group" and set Group B a fractions lesson tonight', 'أرِها «التكليف حسب المجموعة» وكلّف المجموعة ب بدرس كسور الليلة') },
        { id: 'template', label: t('Give her a Sunday template with a column for the misconception behind each note', 'أعطِها نموذج أحد بعمود للفهم الخاطئ وراء كل ملاحظة') },
        { id: 'decide', label: t('End every Sunday note with a verb and a group, and check Monday’s plan against it', 'أنهِ كل ملاحظة أحد بفعل ومجموعة، وقارن خطة الاثنين بها') },
      ],
      correctId: 'decide',
      hint: t('Reteaching and the group assignment both answer this week’s note. Look at the three identical Sundays in ‘Annotated report’ — which move would have stopped the second one from being written?', 'إعادة التدريس والتكليف حسب المجموعة تجيبان عن ملاحظة هذا الأسبوع. انظر إلى الآحاد الثلاثة المتطابقة في «تقرير معلّق عليه» — أي خطوة كانت ستمنع كتابة الثانية؟'),
    },
    reasoning: {
      prompt: t('Why "one Monday action" rather than better reviewing?', 'لماذا «إجراء اثنين واحد» بدل مراجعة أفضل؟'),
      options: [
        { id: 'r2', label: t('Review without a decision is reading, not teaching', 'المراجعة دون قرار قراءة لا تدريس') },
        { id: 'r1', label: t('The review is already good; the time should go to the response', 'المراجعة جيدة أصلًا؛ وينبغي أن يذهب الوقت إلى الاستجابة') },
        { id: 'r3', label: t('A single action is easier to keep up than a better review habit', 'إجراء واحد أسهل في الاستمرار من عادة مراجعة أفضل') },
        { id: 'r4', label: t('Three identical notes prove the review itself has stopped noticing', 'ثلاث ملاحظات متطابقة تثبت أن المراجعة نفسها توقفت عن الملاحظة') },
      ],
      correctId: 'r2',
      hint: t('Three careful Sunday notes in ‘Annotated report’, one unchanged ‘Week plan’. What did the Sundays produce?', 'ثلاث ملاحظات أحد دقيقة في «تقرير معلّق عليه»، و«خطة الأسبوع» لم تتغيّر. ماذا أنتجت أيام الأحد؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_33,
  reveal: {
    whatDrifted: t(
      'Reviewing has become the practice; responding was meant to be. The teacher knows exactly which group needs what — and teaches as if she didn’t.',
      'أصبحت المراجعة هي الممارسة؛ وكان المقصود أن تكون الاستجابة. تعرف المعلّمة بالضبط أي مجموعة تحتاج ماذا — وتدرّس كأنها لا تعرف.',
    ),
    whyItHappened: t(
      'Review is a complete, satisfying ritual on its own. Changing Monday’s plan is harder, less visible, and feels like falling behind the scheme of work.',
      'المراجعة طقس كامل مُرضٍ في ذاته. أما تغيير خطة الاثنين فأصعب وأقل ظهورًا ويبدو تأخرًا عن الخطة الدراسية.',
    ),
    howToRestore: t(
      'Alef data should guide grouping, support, reteaching, and targeted learning decisions. Every Sunday note ends with a verb and a group: "Assign fractions practice to Group B; reteach Tuesday."',
      'ينبغي لبيانات «ألف» أن توجّه قرارات التجميع والدعم وإعادة التدريس والتعلّم الموجّه. تنتهي كل ملاحظة أحد بفعل ومجموعة: «كلّف المجموعة ب بتدريب الكسور؛ أعد التدريس الثلاثاء.»',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector'],
};

export const LEVEL_34: LevelDefinition = {
  id: 34,
  title: t('AI Gives Every Answer', 'الذكاء الاصطناعي يجيب عن كل شيء'),
  theme: t('Polished ≠ Owned', 'مصقول ≠ مملوك'),
  subject: t('Arabic', 'اللغة العربية'),
  sceneImage: scenePerfect,
  scenario: t(
    'Students use the AI support to complete their writing tasks. The work comes back quickly, and it is polished, accurate, and well-structured — better than anything this class produced last term. The teacher is thrilled. Toki asks one student to explain the second paragraph of her own essay.',
    'يستخدم الطلاب دعم الذكاء الاصطناعي لإنجاز مهام الكتابة. تعود الأعمال بسرعة، وهي مصقولة ودقيقة ومنظّمة — أفضل من أي شيء أنتجه هذا الصف في الفصل الماضي. المعلّم في غاية السعادة. يطلب توكي من طالبة أن تشرح الفقرة الثانية من مقالها.',
  ),
  evidence: [
    { id: 'essay', x: 28, y: 62, label: t('An essay', 'مقال'), clue: t('Flawless structure. Vocabulary two years above the student’s level. No crossings-out.', 'بنية خالية من العيوب. مفردات أعلى من مستوى الطالبة بسنتين. لا شطب.') },
    { id: 'student', x: 60, y: 70, label: t('The author', 'الكاتبة'), clue: t('"Explain this sentence?" She reads it aloud. Then reads it again. "It means… what it says."', '«اشرحي هذه الجملة؟» تقرؤها بصوت مرتفع. ثم تقرؤها مجددًا. «تعني… ما تقوله.»') },
    { id: 'history', x: 80, y: 30, label: t('Draft history', 'سجل المسودات'), clue: t('One draft. Pasted at 10:14, submitted at 10:15.', 'مسودة واحدة. لُصقت في ١٠:١٤، وأُرسلت في ١٠:١٥.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The answers are excellent. What should Toki verify?', 'الإجابات ممتازة. ما الذي ينبغي أن يتحقق منه توكي؟'),
      options: [
        { id: 'policy', label: t('Whether the task breaks the school’s AI policy', 'هل تخالف المهمة سياسة المدرسة للذكاء الاصطناعي') },
        { id: 'process', label: t('Whether the student planned and drafted before using the tool', 'هل خطّطت الطالبة وكتبت مسودة قبل استخدام الأداة') },
        { id: 'ownership', label: t('Whether the student can explain and defend her own paragraph', 'هل تستطيع الطالبة شرح فقرتها والدفاع عنها') },
        { id: 'level', label: t('Whether the vocabulary is appropriate to the student’s level', 'هل المفردات مناسبة لمستوى الطالبة') },
      ],
      correctId: 'ownership',
      hint: t('Open ‘The author’ again. Toki asked one question, and she read the sentence aloud twice. Which option is that question?', 'افتح «الكاتبة» مجددًا. طرح توكي سؤالًا واحدًا، فقرأت الجملة بصوت مرتفع مرتين. أي خيار هو ذلك السؤال؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('A flawless essay, ‘Draft history’ of one minute, and ‘it means what it says’. What was the task for — and how much of that happened?', 'مقال خالٍ من العيوب، و«سجل المسودات» بطول دقيقة، و«تعني ما تقوله». ما الذي كانت المهمة من أجله — وكم منه حدث؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'redesign', label: t('Plan in the student’s own words first, AI for feedback on it, spoken defence at the end', 'خطة بكلمات الطالبة أولًا، ثم الذكاء الاصطناعي لتغذية راجعة عليها، ودفاع شفهي في النهاية') },
        { id: 'handwrite', label: t('Move the first draft to handwritten class time, AI allowed only for the final polish', 'انقل المسودة الأولى إلى كتابة يدوية في الصف، والذكاء الاصطناعي للصقل النهائي فقط') },
        { id: 'cite', label: t('Require students to highlight every sentence the AI wrote and annotate why they kept it', 'اشترط أن يظلّل الطلاب كل جملة كتبها الذكاء الاصطناعي ويعلّقوا على سبب إبقائها') },
        { id: 'oral', label: t('Keep the task as it is and grade the spoken explanation instead of the essay', 'أبقِ المهمة كما هي وقيّم الشرح الشفهي بدل المقال') },
      ],
      correctId: 'redesign',
      hint: t('Look at ‘Draft history’ (one draft, one minute) and ‘The author’ (couldn’t explain). One move only moves the draft, one only moves the test, one only marks the tool. Which move changes both the start and the end of the task?', 'انظر إلى «سجل المسودات» (مسودة واحدة، دقيقة واحدة) و«الكاتبة» (لم تستطع الشرح). خطوة تنقل المسودة فقط، وأخرى تنقل الاختبار فقط، وثالثة تعلّم على الأداة فقط. أي خطوة تغيّر بداية المهمة ونهايتها معًا؟'),
    },
    reasoning: {
      prompt: t('Why redesign the task rather than ban the tool?', 'لماذا نعيد تصميم المهمة بدل منع الأداة؟'),
      options: [
        { id: 'r1', label: t('Students will meet these tools everywhere; the task should teach using them well', 'سيلتقي الطلاب بهذه الأدوات في كل مكان؛ وينبغي للمهمة أن تعلّم حسن استخدامها') },
        { id: 'r3', label: t('A ban moves the problem home, where nobody can see the draft history', 'المنع ينقل المشكلة إلى البيت، حيث لا يرى أحد سجل المسودات') },
        { id: 'r2', label: t('The task design, not the tool, decides whether thinking is supported or replaced', 'تصميم المهمة، لا الأداة، هو ما يقرّر هل يُدعم التفكير أم يُستبدل') },
        { id: 'r4', label: t('Feedback from the tool on a student’s own plan is better than the teacher can give to thirty', 'تغذية الأداة الراجعة على خطة الطالب نفسه أفضل مما يستطيع المعلّم تقديمه لثلاثين') },
      ],
      correctId: 'r2',
      hint: t('Same tool, same student, same hour. What decides whether she thinks or pastes?', 'الأداة نفسها، الطالبة نفسها، الساعة نفسها. ما الذي يقرّر هل تفكّر أم تلصق؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_34,
  reveal: {
    whatDrifted: t(
      'The product improved while the student’s thinking disappeared from it. Ownership — the whole point of a writing task — was quietly handed to the tool.',
      'تحسّن المنتج بينما اختفى منه تفكير الطالبة. سُلّمت الملكية — وهي الغاية الكاملة من مهمة الكتابة — بهدوء إلى الأداة.',
    ),
    whyItHappened: t(
      'When output is the only thing assessed, the fastest route to good output wins. AI makes that route one click long, and the surface quality hides what’s missing.',
      'حين يكون المنتج هو الشيء الوحيد المقيَّم، يفوز أسرع طريق إلى منتج جيد. يجعل الذكاء الاصطناعي ذلك الطريق بطول نقرة واحدة، وتخفي الجودة الظاهرة ما ينقص.',
    ),
    howToRestore: t(
      'AI should support thinking, not replace student reasoning, explanation, or productive struggle. Put the student’s own thinking first and last — plan before, defend after — and let AI live in the middle.',
      'ينبغي للذكاء الاصطناعي أن يدعم التفكير لا أن يحلّ محلّ تعليل الطالب وشرحه وجهده المثمر. ضع تفكير الطالب أولًا وأخيرًا — خطة قبل، ودفاع بعد — ودع الذكاء الاصطناعي يسكن في المنتصف.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['mutation-hunter'],
};

export const WORLD_3_LEVELS = [LEVEL_31, LEVEL_32, LEVEL_33, LEVEL_34];
