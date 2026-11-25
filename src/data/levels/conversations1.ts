/**
 * WORLD 1 — the coaching conversations.
 *
 * After the move is chosen, Toki has to deliver it to a person. Two
 * turns each. The teacher has a stance and a reason for what they did;
 * the right line names the shared goal, uses their own evidence, and
 * asks. The wrong register — however correct — closes them.
 */
import type { ConversationDefinition } from '../conversationTypes';
import { t } from '../../i18n/types';

/** 1 — The Talkative Classroom. Ms. Mariam, proud of the energy she built. */
export const CONVO_1: ConversationDefinition = {
  teacherName: t('Ms. Mariam', 'الأستاذة مريم'),
  stance: 'proud',
  setting: t('Break time, by the window. The room is still humming from the lesson.', 'وقت الاستراحة، بجانب النافذة. الغرفة ما زالت تضجّ بصدى الدرس.'),
  read: t('Two years ago this room was silent rows. She built this noise on purpose, and she is right to be proud of it.', 'قبل عامين كانت هذه الغرفة صفوفًا صامتة. بنت هذا الصخب عمدًا، ومن حقها أن تفخر به.'),
  turns: [
    {
      teacherLine: t('Did you see them? Every single group was talking. Last year I couldn’t get three hands up.', 'هل رأيتهم؟ كل مجموعة كانت تتحدث. في العام الماضي ما كنت أرى ثلاث أيدٍ مرفوعة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I did — the table by the door didn’t stop once. What did you hear them saying to each other?', 'رأيت — الطاولة التي عند الباب لم تتوقف لحظة. ماذا سمعتِهم يقولون لبعضهم؟'), reply: t('Honestly? A lot of "yes, I agree". I noticed that too, actually.', 'بصراحة؟ كثير من «نعم، أوافق». أنا لاحظت هذا أيضًا، صراحةً.') },
        { id: 'b', effect: 'neutral', label: t('It was great energy. Collaboration is clearly a strength in this room.', 'كانت طاقة رائعة. من الواضح أن التعاون نقطة قوة في هذا الصف.'), reply: t('Thank you! It took a lot of work to get here.', 'شكرًا! تطلّب الأمر جهدًا كبيرًا للوصول إلى هنا.') },
        { id: 'c', effect: 'closes', label: t('Lots of talk, but I didn’t hear much reasoning. The discussion lacked academic rigour.', 'حديث كثير، لكنني لم أسمع تعليلًا يُذكر. افتقر النقاش إلى الصرامة الأكاديمية.'), reply: t('Rigour. Right. Last year the complaint was they never spoke. Now it’s that they speak wrong.', 'صرامة. طيّب. في العام الماضي كانت الشكوى أنهم لا يتكلمون. والآن أنهم يتكلمون بطريقة خاطئة.') },
      ],
    },
    {
      teacherLine: t('So what, I make them stop agreeing with each other?', 'يعني ماذا، أمنعهم من أن يوافق بعضهم بعضًا؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('No — keep every bit of it. What if the task said "convince the other table" instead of "discuss"? Same energy, but now they need a reason.', 'لا — احتفظي بكل ذرّة منه. ماذا لو قالت المهمة «أقنعوا الطاولة الأخرى» بدلًا من «ناقشوا»؟ الطاقة نفسها، لكنهم الآن بحاجة إلى سبب.'), reply: t('"Convince the other table." They would fight for that. I could try it Thursday.', '«أقنعوا الطاولة الأخرى.» سيتحمّسون لها كثيرًا. أستطيع تجربتها يوم الخميس.') },
        { id: 'b', effect: 'neutral', label: t('The research is clear that accountable talk needs sentence stems and evidence prompts.', 'البحوث واضحة في أن الحوار المسؤول يحتاج إلى بدايات جمل ومحفّزات للأدلة.'), reply: t('I have a sentence-stem poster somewhere. I’ll look for it.', 'عندي ملصق بدايات الجمل في مكان ما. سأبحث عنه.') },
        { id: 'c', effect: 'closes', label: t('You need to structure the talk more tightly. I’ll send you a protocol to follow.', 'تحتاجين إلى تنظيم الحوار بشكل أكثر إحكامًا. سأرسل لك بروتوكولًا لتتبعيه.'), reply: t('A protocol. Of course. I’ll add it to the folder with the others.', 'بروتوكول. طبعًا. سأضيفه إلى الملف مع البقية.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Thursday’s task reads "convince the other table". The noise is the same; the sentences now start with "because".', 'مهمة الخميس تقول «أقنعوا الطاولة الأخرى». الصخب نفسه؛ والجمل الآن تبدأ بـ«لأن».'),
    partial: t('The poster went up. Students read it on the first day and then talked exactly as before.', 'عُلّق الملصق. قرأه الطلاب في اليوم الأول ثم تحدثوا تمامًا كما كانوا.'),
    unchanged: t('The protocol is in the folder. The discussion is still "discuss the chapter", and the door is a little more closed next time Toki knocks.', 'البروتوكول في الملف. المهمة ما زالت «ناقشوا الفصل»، والباب أكثر انغلاقًا قليلًا حين يطرق توكي في المرة القادمة.'),
  },
};

/** 2 — The Activity Overload. Mr. Yousef, eager, planning late every night. */
export const CONVO_2: ConversationDefinition = {
  teacherName: t('Mr. Yousef', 'الأستاذ يوسف'),
  stance: 'eager',
  setting: t('After the bell, packing six boxes of station materials into a cupboard.', 'بعد الجرس، يحزم ست علب من مواد المحطات في خزانة.'),
  read: t('He plans these rotations until midnight. He wants feedback — he just wants it to say the work was worth it.', 'يخطط هذه الدورات حتى منتصف الليل. يريد تغذية راجعة — فقط يريدها أن تقول إن الجهد كان يستحق.'),
  turns: [
    {
      teacherLine: t('Six stations, forty minutes, nobody sat still. Tell me honestly — what would you change?', 'ست محطات، أربعون دقيقة، لا أحد جلس ساكنًا. أخبرني بصراحة — ماذا كنت ستغيّر؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Nothing about the energy. Can I ask about station three — what were they meant to walk away understanding?', 'لا شيء في الطاقة. هل لي أن أسأل عن المحطة الثالثة — بماذا كان يُفترض أن يخرجوا منها فاهمين؟'), reply: t('Station three… density, I think. Or was that four. Let me check the plan.', 'المحطة الثالثة… الكثافة، أظن. أم كانت الرابعة؟ دعني أراجع الخطة.') },
        { id: 'b', effect: 'neutral', label: t('Honestly, it was impressive. The time-on-task was excellent.', 'بصراحة كان مبهرًا. استثمار الوقت كان ممتازًا.'), reply: t('That’s what I’m going for. Every minute counts.', 'هذا ما أسعى إليه. كل دقيقة لها قيمة.') },
        { id: 'c', effect: 'closes', label: t('I’d cut it to three stations. Six is too many for any real learning to happen.', 'كنت سأقلّصها إلى ثلاث محطات. ست محطات أكثر من أن يحدث فيها تعلّم حقيقي.'), reply: t('Three. So half of what I built. Okay.', 'ثلاث. يعني نصف ما بنيته. طيّب.') },
      ],
    },
    {
      teacherLine: t('The plan says "explore density" for three and "investigate buoyancy" for four. They did both.', 'الخطة تقول «استكشاف الكثافة» للثالثة و«استقصاء الطفو» للرابعة. فعلوا الاثنين.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They did. If a student had to explain density to you at the end of station three — which of the six could they do that for?', 'فعلوا. لو كان على طالب أن يشرح لك الكثافة في نهاية المحطة الثالثة — في أيّ من الست كان سيستطيع فعل ذلك؟'), reply: t('…Two of them. Maybe. The others are more "do", less "explain". I see what you’re asking.', '…اثنتان منها. ربما. البقية «نفّذ» أكثر من «اشرح». فهمت قصدك.') },
        { id: 'b', effect: 'neutral', label: t('That’s a good plan. Objectives matter — keep them visible to the students as well.', 'هذه خطة جيدة. الأهداف مهمة — أبقِها مرئية للطلاب أيضًا.'), reply: t('I can put them on the station cards. Easy.', 'أستطيع وضعها على بطاقات المحطات. سهل.') },
        { id: 'c', effect: 'closes', label: t('"Explore" isn’t an objective. The plan needs measurable outcomes for each station.', '«استكشاف» ليس هدفًا. تحتاج الخطة إلى نواتج قابلة للقياس لكل محطة.'), reply: t('I used the template the school gave us. Maybe tell them, not me.', 'استخدمت النموذج الذي أعطتنا إياه المدرسة. قُل لهم هم، لا لي.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Next week there are four stations, and each one ends with a sentence the student has to say out loud. He dropped the two he couldn’t explain himself.', 'في الأسبوع التالي أربع محطات، وكل واحدة تنتهي بجملة على الطالب قولها بصوت عالٍ. أسقط الاثنتين اللتين لم يستطع هو نفسه شرحهما.'),
    partial: t('The objectives are printed on the station cards now. The stations are the same, and so is the pace.', 'الأهداف مطبوعة الآن على بطاقات المحطات. المحطات نفسها، والإيقاع نفسه.'),
    unchanged: t('He emailed the school for a better template. The rotation ran again on Monday, exactly as before, a little faster.', 'راسل المدرسة طالبًا نموذجًا أفضل. دارت الدورة مجددًا يوم الاثنين، تمامًا كما كانت، أسرع قليلًا.'),
  },
};

/** 3 — The Output Illusion. Ms. Fatima, proud of the wall of projects. */
export const CONVO_3: ConversationDefinition = {
  teacherName: t('Ms. Fatima', 'الأستاذة فاطمة'),
  stance: 'proud',
  setting: t('In front of the display wall, where the principal brought visitors last week.', 'أمام جدار العرض، حيث أحضر المدير الزوّار الأسبوع الماضي.'),
  read: t('The wall is her reputation in this school. Whatever Toki says about it, she will hear as being said about her.', 'هذا الجدار سمعتها في هذه المدرسة. كل ما سيقوله توكي عنه ستسمعه وكأنه يُقال عنها.'),
  turns: [
    {
      teacherLine: t('The principal brought the ministry visitors straight here. They photographed everything.', 'أحضر المدير زوّار الوزارة إلى هنا مباشرة. صوّروا كل شيء.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I can see why. Pick one for me — the volcano, say — and tell me what Sara would say if I asked her why it erupts.', 'أفهم لماذا. اختاري لي واحدًا — البركان مثلًا — وأخبريني ماذا ستقول سارة لو سألتها لماذا يثور.'), reply: t('Sara would… she’d tell you about the baking soda. Whether she’d get to pressure, I’m not sure.', 'سارة… ستحدّثك عن صودا الخبز. أما إن كانت ستصل إلى الضغط، فلست متأكدة.') },
        { id: 'b', effect: 'neutral', label: t('They deserve to be photographed. The creativity here is a real strength.', 'تستحق التصوير. الإبداع هنا نقطة قوة حقيقية.'), reply: t('They work so hard on them. Weeks, some of them.', 'يعملون عليها بجد. أسابيع، بعضهم.') },
        { id: 'c', effect: 'closes', label: t('They look wonderful, but a display isn’t evidence of learning. We need to assess understanding, not products.', 'تبدو رائعة، لكن العرض ليس دليلًا على التعلّم. علينا تقييم الفهم لا المنتجات.'), reply: t('So the visitors were impressed by nothing. Good to know.', 'يعني الزوّار أُعجبوا بلا شيء. جميل أن أعرف.') },
      ],
    },
    {
      teacherLine: t('Some of them could explain it. Sara, Omar… not all of them, no.', 'بعضهم يستطيع شرحه. سارة، عمر… ليس كلهم، لا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('What if the project had one more piece — a thirty-second explanation, recorded on the tablet, stuck to the wall with a QR code? The visitors would love it, and you’d know who’s got it.', 'ماذا لو كان للمشروع جزء إضافي — شرح من ثلاثين ثانية، يُسجَّل على الجهاز اللوحي، ويُلصق على الجدار برمز QR؟ سيحبه الزوّار، وستعرفين مَن فهم.'), reply: t('A QR code on each one… that would actually look good. And I’d hear every single one of them.', 'رمز QR على كل مشروع… هذا سيبدو جميلًا فعلًا. وسأسمع كل واحد منهم.') },
        { id: 'b', effect: 'neutral', label: t('That’s normal in any class. The key is to keep building reflection into the process.', 'هذا طبيعي في أي صف. المهم الاستمرار في دمج التأمل في العملية.'), reply: t('I do a reflection sheet at the end. Most of them fill it in.', 'أوزّع ورقة تأمل في النهاية. أغلبهم يملؤها.') },
        { id: 'c', effect: 'closes', label: t('Then the grades should reflect that. Visual quality shouldn’t carry a student who can’t explain the science.', 'إذًا ينبغي أن تعكس الدرجات ذلك. لا ينبغي للجودة البصرية أن تحمل طالبًا لا يستطيع شرح العلم.'), reply: t('You want me to lower grades on work the ministry just praised. I’ll think about that.', 'تريد مني خفض درجات أعمال أشادت بها الوزارة للتو. سأفكّر في ذلك.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Every project on the wall now has a QR code and a thirty-second voice. Three recordings told her exactly who needed reteaching — and the wall looks better than ever.', 'كل مشروع على الجدار الآن يحمل رمز QR وصوتًا من ثلاثين ثانية. ثلاثة تسجيلات أخبرتها تحديدًا مَن يحتاج إلى إعادة تدريس — والجدار أجمل من أي وقت مضى.'),
    partial: t('The reflection sheet is still there. Most students still fill it in. The projects are still graded on what they look like.', 'ورقة التأمل ما زالت موجودة. أغلب الطلاب ما زالوا يملؤونها. والمشاريع ما زالت تُقيَّم بمظهرها.'),
    unchanged: t('Nothing changed on the wall, and the next visitor is shown around by a teacher who now makes sure the coach isn’t in the building.', 'لم يتغيّر شيء على الجدار، والزائر التالي ترافقه معلّمة تحرص الآن على ألّا يكون المدرّب في المبنى.'),
  },
};

/** 4 — The Assessment Trap. Mr. Khalid, tired, drowning in data entry. */
export const CONVO_4: ConversationDefinition = {
  teacherName: t('Mr. Khalid', 'الأستاذ خالد'),
  stance: 'tired',
  setting: t('4:10 pm. A spreadsheet open, a stack of quizzes beside it, half marked.', '٤:١٠ عصرًا. جدول بيانات مفتوح، وبجانبه كومة اختبارات نصفها مصحَّح.'),
  read: t('He is not resisting assessment — he is buried under it. Anything that sounds like "more" will not land.', 'هو لا يقاوم التقييم — بل غارق تحته. أي شيء يبدو مثل «المزيد» لن يصل إليه.'),
  turns: [
    {
      teacherLine: t('Three quizzes a week, every mark in the system by Thursday. If this is about the data, it’s all there.', 'ثلاثة اختبارات أسبوعيًا، وكل درجة في النظام بحلول الخميس. إن كان الموضوع عن البيانات، فكلها موجودة.'),
      options: [
        { id: 'a', effect: 'opens', label: t('It is all there — I looked. Can I ask about one number? Question 4 last Tuesday, eleven students wrong the same way. What happened on Wednesday?', 'كلها هناك — اطّلعت عليها. هل لي أن أسأل عن رقم واحد؟ السؤال ٤ يوم الثلاثاء الماضي، أحد عشر طالبًا أخطؤوا بالطريقة نفسها. ماذا حدث يوم الأربعاء؟'), reply: t('Wednesday was… the next unit. I didn’t go back. I don’t have time to go back.', 'الأربعاء كان… الوحدة التالية. لم أرجع. لا وقت عندي للرجوع.') },
        { id: 'b', effect: 'neutral', label: t('It really is impressive. The consistency of your data is the best in the department.', 'إنه مبهر فعلًا. اتساق بياناتك هو الأفضل في القسم.'), reply: t('Tell that to whoever designed the system.', 'قل ذلك لمن صمّم النظام.') },
        { id: 'c', effect: 'closes', label: t('The data is there, but it isn’t being used. Assessment for learning means acting on results, not just recording them.', 'البيانات موجودة، لكنها لا تُستخدم. التقييم من أجل التعلّم يعني العمل بالنتائج لا تسجيلها فحسب.'), reply: t('I know what assessment for learning means. I did the course. Twice.', 'أعرف ما يعني التقييم من أجل التعلّم. حضرت الدورة. مرتين.') },
      ],
    },
    {
      teacherLine: t('You want me to reteach every time eleven kids get something wrong? I’d never finish the syllabus.', 'تريدني أن أعيد التدريس كلما أخطأ أحد عشر طالبًا؟ لن أنهي المنهج أبدًا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('No — what if one of the three quizzes went, and the time it took became five minutes on Wednesday fixing question 4? Less marking, not more.', 'لا — ماذا لو أُلغي أحد الاختبارات الثلاثة، وتحوّل وقته إلى خمس دقائق يوم الأربعاء لإصلاح السؤال ٤؟ تصحيح أقل، لا أكثر.'), reply: t('Drop a quiz. And just do the one question. …Nobody has ever suggested I do less.', 'أُلغي اختبارًا. وأكتفي بسؤال واحد. …لم يقترح عليّ أحد قط أن أفعل أقل.') },
        { id: 'b', effect: 'neutral', label: t('Not everything — just the big misconceptions. Prioritise.', 'ليس كل شيء — فقط المفاهيم الخاطئة الكبيرة. حدّد الأولويات.'), reply: t('Sure. When I find a minute.', 'طبعًا. حين أجد دقيقة.') },
        { id: 'c', effect: 'closes', label: t('Coverage isn’t the goal — learning is. If they haven’t learned it, moving on is moving on from nothing.', 'التغطية ليست الهدف — التعلّم هو الهدف. إن لم يتعلّموا، فالمضيّ قدمًا هو مضيّ من لا شيء.'), reply: t('I’ll remember that when the inspector asks why we’re on unit six in May.', 'سأتذكّر ذلك حين يسأل المفتّش لماذا نحن في الوحدة السادسة في مايو.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Two quizzes a week now. Wednesday opens with "the question most of you missed". The spreadsheet is shorter, and for the first time it changed a lesson.', 'اختباران في الأسبوع الآن. يبدأ الأربعاء بـ«السؤال الذي أخطأ فيه أغلبكم». جدول البيانات أقصر، ولأول مرة غيّر درسًا.'),
    partial: t('He means to prioritise. The three quizzes are still there, and so is the stack beside the spreadsheet.', 'ينوي تحديد الأولويات. الاختبارات الثلاثة ما زالت موجودة، وكذلك الكومة بجانب جدول البيانات.'),
    unchanged: t('Everything is still in the system by Thursday. Nothing in the system reaches Wednesday. He answers Toki’s emails a day late now.', 'كل شيء ما زال في النظام بحلول الخميس. لا شيء في النظام يصل إلى الأربعاء. يردّ على رسائل توكي متأخرًا يومًا الآن.'),
  },
};

/** 5 — The Gamification Mutation. Ms. Noura, eager, the "fun teacher". */
export const CONVO_5: ConversationDefinition = {
  teacherName: t('Ms. Noura', 'الأستاذة نورة'),
  stance: 'eager',
  setting: t('The leaderboard is still on the screen. Three students are arguing about second place on their way out.', 'لوحة المتصدّرين ما زالت على الشاشة. ثلاثة طلاب يتجادلون حول المركز الثاني وهم في طريقهم للخروج.'),
  read: t('She is the teacher students ask for. The games are how she won them over, and she knows it. Take the games away and you take her away.', 'هي المعلّمة التي يطلبها الطلاب. الألعاب هي الطريقة التي كسبتهم بها، وهي تعرف ذلك. خذ الألعاب وتأخذها هي.'),
  turns: [
    {
      teacherLine: t('Did you see Omar? He hates maths and he was first on the buzzer three rounds running. Tell me that isn’t engagement.', 'هل رأيت عمر؟ يكره الرياضيات وكان الأول على الجرس ثلاث جولات متتالية. قل لي إن هذا ليس تفاعلًا.'),
      options: [
        { id: 'a', effect: 'opens', label: t('It’s engagement — nobody could say otherwise. Here’s what I’m curious about: in round two, who got it right but didn’t buzz first?', 'إنه تفاعل — لا أحد ينكر ذلك. لكن ما يشغلني: في الجولة الثانية، مَن أجاب صحيحًا لكنه لم يضغط الجرس أولًا؟'), reply: t('Hind. Hind had it. She always has it, she’s just slow to press. She was fourth.', 'هند. هند كانت تعرفها. دائمًا تعرفها، لكنها بطيئة في الضغط. كانت الرابعة.') },
        { id: 'b', effect: 'neutral', label: t('It’s engagement, absolutely. You’ve built something students actually want to be in.', 'إنه تفاعل، بلا شك. بنيتِ شيئًا يريد الطلاب فعلًا أن يكونوا فيه.'), reply: t('They beg for it. Fridays are the best day of the week in here.', 'يترجّونني من أجلها. الجمعة أفضل يوم في الأسبوع هنا.') },
        { id: 'c', effect: 'closes', label: t('It’s engagement with the buzzer, not with maths. Speed games reward the fastest, not the deepest thinkers.', 'إنه تفاعل مع الجرس لا مع الرياضيات. ألعاب السرعة تكافئ الأسرع لا الأعمق تفكيرًا.'), reply: t('And the lecture rewards nobody. I’ve seen the "deep" classrooms. They’re asleep.', 'والمحاضرة لا تكافئ أحدًا. رأيت الصفوف «العميقة». إنها نائمة.') },
      ],
    },
    {
      teacherLine: t('So Hind’s slow. What do you want me to do, give her a head start?', 'يعني هند بطيئة. ماذا تريدني أن أفعل، أمنحها أسبقية؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('What if one round in three had no buzzer — every table writes, then the point goes to the best explanation? Omar still wins his rounds. Hind gets hers.', 'ماذا لو كانت جولة من كل ثلاث بلا جرس — كل طاولة تكتب، ثم تذهب النقطة لأفضل تفسير؟ ما زال عمر يفوز بجولاته. وهند تحصل على جولاتها.'), reply: t('An explanation round. The tables would go quiet for it… and then loud again. I could do that without losing anything.', 'جولة تفسير. ستهدأ الطاولات من أجلها… ثم تعلو مجددًا. أستطيع فعل ذلك دون أن أخسر شيئًا.') },
        { id: 'b', effect: 'neutral', label: t('Maybe just vary the format a bit. Different games suit different students.', 'ربما نوّعي الصيغة قليلًا. ألعاب مختلفة تناسب طلابًا مختلفين.'), reply: t('I’ve got about twenty games. I’ll rotate them more.', 'عندي حوالي عشرين لعبة. سأبدّل بينها أكثر.') },
        { id: 'c', effect: 'closes', label: t('I’d drop the leaderboard. Public ranking is doing more damage than the game is doing good.', 'كنت سأزيل لوحة المتصدّرين. الترتيب العلني يُحدث ضررًا أكبر من نفع اللعبة.'), reply: t('Drop the thing they love most. You should see the Friday I’d have after that.', 'أزيل ما يحبونه أكثر من أي شيء. يجب أن ترى الجمعة التي سأعيشها بعد ذلك.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Round three is the explanation round now. Hind won it twice. Omar complained for a week, then started writing his reasons so he could win it too.', 'الجولة الثالثة أصبحت جولة التفسير. فازت بها هند مرتين. تذمّر عمر أسبوعًا، ثم بدأ يكتب أسبابه ليفوز بها هو أيضًا.'),
    partial: t('More games, rotated faster. All of them still reward the first hand on the buzzer. Hind is still fourth.', 'ألعاب أكثر، تتبدّل أسرع. كلها ما زالت تكافئ أول يد على الجرس. هند ما زالت الرابعة.'),
    unchanged: t('The leaderboard stayed. The buzzer stayed. The students asked her, loudly, whether the coach was coming back.', 'بقيت لوحة المتصدّرين. وبقي الجرس. وسألها الطلاب، بصوت عالٍ، إن كان المدرّب سيعود.'),
  },
};
