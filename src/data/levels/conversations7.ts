/**
 * WORLD 7 — the coaching conversations.
 * Harder than World 1: these teachers are strong, and two of them are
 * being told something they have every reason to resist — or nothing
 * at all. Saying "nothing is wrong" to a teacher is also a conversation.
 */
import type { ConversationDefinition } from '../conversationTypes';
import { t } from '../../i18n/types';

/** 71 — The Almost Perfect Classroom. Mr. Saeed, the model teacher. */
export const CONVO_71: ConversationDefinition = {
  teacherName: t('Mr. Saeed', 'الأستاذ سعيد'),
  stance: 'proud',
  setting: t('His classroom, after the new teachers who came to observe have left.', 'صفّه، بعد أن غادر المعلّمون الجدد الذين جاؤوا للمشاهدة.'),
  read: t('He has been told for three years that this is the model classroom. He is generous, confident, and used to visitors leaving impressed.', 'قيل له لثلاث سنوات إن هذا هو الصف النموذجي. كريم، واثق، ومعتاد على أن يغادر الزوار معجبين.'),
  turns: [
    {
      teacherLine: t('The new ones always ask about the routines. I tell them: routines first, everything else follows.', 'الجدد يسألون دائمًا عن الروتين. أقول لهم: الروتين أولًا، وكل شيء يتبعه.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They’re right to ask — I’ve never seen a room run like that. Can I ask you the question nobody asks? What can they do now, at 8:45, that they couldn’t at 8:00?', 'من حقهم أن يسألوا — لم أرَ غرفة تُدار هكذا. هل لي أن أطرح السؤال الذي لا يطرحه أحد؟ ماذا يستطيعون فعله الآن، في الثامنة وخمس وأربعين، ولم يستطيعوا في الثامنة؟'), reply: t('Solve two-step equations. That was the objective. …Nine of twenty-four on the exit ticket. I saw it. I’ve been thinking about it since.', 'حل معادلات ذات خطوتين. ذلك كان الهدف. …تسعة من أربعة وعشرين في بطاقة الخروج. رأيتها. وأفكّر فيها منذ ذلك الحين.') },
        { id: 'b', effect: 'neutral', label: t('I’d send them here too. Honestly, there isn’t much I could add.', 'كنت سأرسلهم إلى هنا أيضًا. بصراحة، ليس هناك الكثير لأضيفه.'), reply: t('That’s kind. Come any time.', 'هذا لطف منك. تعال في أي وقت.') },
        { id: 'c', effect: 'closes', label: t('Routines are the surface. The impact on learning is what matters, and I’m not sure this lesson had it.', 'الروتين هو السطح. الأثر على التعلّم هو ما يهم، ولست متأكدًا أن هذا الدرس حققه.'), reply: t('Not sure. After one visit. The principal has been sure for three years.', 'لست متأكدًا. بعد زيارة واحدة. المدير متأكد منذ ثلاث سنوات.') },
      ],
    },
    {
      teacherLine: t('Nine. I know. But the lesson was good — you saw it. So what was it?', 'تسعة. أعرف. لكن الدرس كان جيدًا — رأيته. فما الذي حدث؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('I don’t know yet — and that’s the interesting part. The nine who got it: what did they do in the group task that the fifteen didn’t?', 'لا أعرف بعد — وهذا هو الجزء المثير. التسعة الذين فهموا: ماذا فعلوا في مهمة المجموعة ولم يفعله الخمسة عشر؟'), reply: t('They… were the ones who wrote. The rest watched the leader write. The roles. The roles decide who thinks.', 'هم… الذين كتبوا. البقية شاهدوا القائد يكتب. الأدوار. الأدوار تقرّر مَن يفكّر.') },
        { id: 'b', effect: 'neutral', label: t('Sometimes a lesson is good and the exit ticket is just hard. Don’t read too much into one number.', 'أحيانًا يكون الدرس جيدًا وبطاقة الخروج صعبة فحسب. لا تقرأ الكثير في رقم واحد.'), reply: t('Maybe. I’ll make the next one easier and see.', 'ربما. سأجعل التالية أسهل وأرى.') },
        { id: 'c', effect: 'closes', label: t('The group work. Four groups with leaders means four students did the thinking. That’s a design flaw.', 'العمل الجماعي. أربع مجموعات بقادة يعني أن أربعة طلاب هم من فكّروا. هذا خلل في التصميم.'), reply: t('A design flaw. In the lesson the whole school copies. I’ll pass that on.', 'خلل في التصميم. في الدرس الذي تنسخه المدرسة كلها. سأنقل ذلك.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Every student writes their own equation before the group compares. Nineteen of twenty-four on Thursday. He told the new teachers about the exit ticket himself.', 'كل طالب يكتب معادلته بنفسه قبل أن تقارن المجموعة. تسعة عشر من أربعة وعشرين يوم الخميس. أخبر المعلّمين الجدد عن بطاقة الخروج بنفسه.'),
    partial: t('The next exit ticket was easier. Twenty of twenty-four. The lesson is unchanged, and so is who does the thinking.', 'بطاقة الخروج التالية كانت أسهل. عشرون من أربعة وعشرين. الدرس لم يتغيّر، ولا مَن يفكّر.'),
    unchanged: t('The model classroom runs exactly as it did. The principal heard that the coach found "a design flaw", and the observation form still has no box for learning.', 'الصف النموذجي يسير تمامًا كما كان. سمع المدير أن المدرّب وجد «خللًا في التصميم»، ونموذج الملاحظة ما زال بلا خانة للتعلّم.'),
  },
};

/** 72 — The Quiet Lesson. Ms. Hessa, defensive after the visiting leader's note. */
export const CONVO_72: ConversationDefinition = {
  teacherName: t('Ms. Hessa', 'الأستاذة حصة'),
  stance: 'defensive',
  setting: t('She has seen the leader’s note — "low engagement, no technology" — and she is waiting for Toki to confirm it.', 'رأت ملاحظة القائد — «تفاعل منخفض، لا تقنية» — وتنتظر أن يؤكّدها توكي.'),
  read: t('She teaches quietly, and she has been marked down for it before. She is braced for this conversation.', 'تدرّس بهدوء، وسبق أن خُفّضت درجتها بسبب ذلك. تستعدّ لهذه المحادثة.'),
  turns: [
    {
      teacherLine: t('I know what the note says. Low engagement. So — what should I add? Groups? A game?', 'أعرف ما تقوله الملاحظة. تفاعل منخفض. طيّب — ماذا أضيف؟ مجموعات؟ لعبة؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Nothing. Twenty-six whiteboards went up three times and you changed the next example after the second one. That’s the most engagement I’ve seen this week. I’m going to say so.', 'لا شيء. رُفعت ست وعشرون سبورة ثلاث مرات وغيّرتِ المثال التالي بعد الثانية. هذا أعلى تفاعل رأيته هذا الأسبوع. وسأقول ذلك.'), reply: t('…You counted the whiteboards. Nobody has ever counted the whiteboards.', '…عددت السبورات. لم يعدّها أحد من قبل.') },
        { id: 'b', effect: 'neutral', label: t('I wouldn’t worry about the note. Your lesson was solid — strong fundamentals.', 'لا تقلقي بشأن الملاحظة. درسك كان متينًا — أساسيات قوية.'), reply: t('Solid. That’s what they said last year, before the "low engagement" bit.', 'متين. هذا ما قالوه العام الماضي، قبل أن يضيفوا «التفاعل المنخفض».') },
        { id: 'c', effect: 'closes', label: t('A short collaborative task wouldn’t hurt — it would make the engagement visible for observers.', 'مهمة تعاونية قصيرة لن تضرّ — ستجعل التفاعل مرئيًا للمراقبين.'), reply: t('For observers. Right. I’ll put on a show next time.', 'للمراقبين. طيّب. سأقدّم لهم عرضًا في المرة القادمة.') },
      ],
    },
    {
      teacherLine: t('And when the next observer walks in and sees a quiet room?', 'وحين يدخل المراقب التالي ويرى غرفة هادئة؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Then they should ask the same question I did. Would you let me bring the next observer here — and hand them a whiteboard?', 'حينها ينبغي أن يطرحوا السؤال نفسه الذي طرحته. هل تسمحين لي بإحضار المراقب التالي إلى هنا — وأن أعطيه سبورة؟'), reply: t('Give the observer a whiteboard. …Yes. Yes, bring them.', 'أعطِ المراقب سبورة. …نعم. نعم، أحضرهم.') },
        { id: 'b', effect: 'neutral', label: t('Keep doing what you’re doing. Good teaching speaks for itself eventually.', 'استمرّي فيما تفعلينه. التدريس الجيد يتحدث عن نفسه في النهاية.'), reply: t('Eventually. I’ve been waiting for "eventually" for four years.', 'في النهاية. أنتظر «النهاية» منذ أربع سنوات.') },
        { id: 'c', effect: 'closes', label: t('Then maybe put the objective on the board and open the Alef dashboard on the screen. It costs nothing and it ticks the boxes.', 'إذًا ربما ضعي الهدف على السبورة وافتحي لوحة «ألف» على الشاشة. لا يكلّف شيئًا ويؤشّر على الخانات.'), reply: t('Tick the boxes. I thought you were different.', 'أؤشّر على الخانات. ظننتك مختلفًا.') },
      ],
    },
  ],
  outcomes: {
    restored: t('The note was corrected in writing. The next observer was handed a whiteboard at the door and answered three questions with the class. The lesson did not change — the observation did.', 'صُحّحت الملاحظة كتابيًا. أُعطي المراقب التالي سبورة عند الباب وأجاب عن ثلاثة أسئلة مع الصف. لم يتغيّر الدرس — تغيّرت الملاحظة.'),
    partial: t('She kept teaching the same way. The note is still in her file, and nobody told the leader why it was wrong.', 'واصلت التدريس بالطريقة نفسها. الملاحظة ما زالت في ملفها، ولم يخبر أحد القائد لماذا كانت خاطئة.'),
    unchanged: t('Next observation there was a group task, a dashboard on the screen and an objective on the wall. The whiteboards stayed in the cupboard. The observer wrote "much improved".', 'في الملاحظة التالية كان هناك عمل جماعي ولوحة بيانات على الشاشة وهدف على الجدار. بقيت السبورات في الخزانة. كتب المراقب «تحسّن كبير».'),
  },
};

/** 73 — The Showcase Lesson. Ms. Amal, eager and nervous: she wants to know how it went. */
export const CONVO_73: ConversationDefinition = {
  teacherName: t('Ms. Amal', 'الأستاذة أمل'),
  stance: 'eager',
  setting: t('Ten minutes after the observed lesson. She hasn’t sat down yet.', 'بعد عشر دقائق من الدرس المُلاحَظ. لم تجلس بعد.'),
  read: t('Talented, two years in, and she rehearsed this lesson for a week. She will take one thing from this conversation. If Toki gives her three, she will take none.', 'موهوبة، في عامها الثاني، وتدرّبت على هذا الدرس أسبوعًا. ستأخذ شيئًا واحدًا من هذه المحادثة. إن أعطاها توكي ثلاثة، فلن تأخذ شيئًا.'),
  turns: [
    {
      teacherLine: t('So? Be honest. I can take it. Was the hook too long? I thought the hook was too long.', 'إذًا؟ كن صريحًا. أستطيع التحمّل. هل كان التمهيد طويلًا جدًا؟ ظننت أن التمهيد طويل.'),
      options: [
        { id: 'a', effect: 'opens', label: t('The hook was fine — ninety seconds and it set up the question. Here’s the thing I actually noticed: Omar, Hind, Sara. Eleven questions. Do you know who answered them?', 'التمهيد كان جيدًا — تسعون ثانية ومهّد للسؤال. ما لاحظته فعلًا: عمر، هند، سارة. أحد عشر سؤالًا. هل تعرفين مَن أجاب عنها؟'), reply: t('…Those three. Every time. I didn’t even — I was so focused on the timing.', '…هؤلاء الثلاثة. في كل مرة. لم أنتبه حتى — كنت مركّزة على التوقيت.') },
        { id: 'b', effect: 'neutral', label: t('It was a strong lesson. The differentiation in particular — two investigations from real data — was excellent.', 'كان درسًا قويًا. التمايز بالذات — استقصاءان من بيانات حقيقية — كان ممتازًا.'), reply: t('Really? Oh good. I was worried about the carousel timing.', 'حقًا؟ جميل. كنت قلقة بشأن توقيت الدوّارة.') },
        { id: 'c', effect: 'closes', label: t('There were three issues: the questioning, the Alef-as-reward, and the exit ticket. Let’s go through them.', 'كانت هناك ثلاث مشكلات: الأسئلة، و«ألف» كمكافأة، وبطاقة الخروج. لنمرّ عليها.'), reply: t('Three. Okay. Can I get a pen. Sorry. Okay.', 'ثلاث. طيّب. لحظة، أحضر قلمًا. آسفة. طيّب.') },
      ],
    },
    {
      teacherLine: t('Three students. In an observed lesson. What do I even do about that — call on the quiet ones and watch them freeze?', 'ثلاثة طلاب. في درس مُلاحَظ. ماذا أفعل أصلًا حيال ذلك — أنادي الهادئين وأشاهدهم يتجمّدون؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Give everyone thirty seconds and a whiteboard before anyone speaks. Then you pick who reads theirs. Nobody freezes, because everybody already has an answer in their hand.', 'امنحي الجميع ثلاثين ثانية وسبورة قبل أن يتكلم أحد. ثم تختارين مَن يقرأ إجابته. لا أحد يتجمّد، لأن الجميع يحمل إجابة في يده.'), reply: t('Whiteboards first, then I pick. That’s… one change. I can do one change by Sunday.', 'السبورات أولًا، ثم أختار. هذا… تغيير واحد. أستطيع تغييرًا واحدًا بحلول الأحد.') },
        { id: 'b', effect: 'neutral', label: t('Just try to spread the questions around a bit more. Keep a mental tally.', 'حاولي فقط توزيع الأسئلة أكثر. احتفظي بعدّ ذهني.'), reply: t('A tally. I’ll try. I lose track when it gets going, but I’ll try.', 'أعدّ. سأحاول. أضيع العدّ حين يحمى الدرس، لكنني سأحاول.') },
        { id: 'c', effect: 'closes', label: t('Cold-calling is standard practice. If students freeze, that tells you something about the classroom culture.', 'النداء العشوائي ممارسة قياسية. إن تجمّد الطلاب، فهذا يخبرك شيئًا عن ثقافة الصف.'), reply: t('About my classroom culture. Right. I’ll… note that down with the other three.', 'ثقافة صفّي. طيّب. سأ… أدوّن ذلك مع الثلاث الأخرى.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Sunday: whiteboards up before any hand. Twenty-two answers to question one. The exit ticket and the Alef-as-prize are still there — and next week, when she asks, Toki has something to say.', 'الأحد: السبورات مرفوعة قبل أي يد. اثنتان وعشرون إجابة عن السؤال الأول. بطاقة الخروج و«ألف» كجائزة ما زالتا هناك — وفي الأسبوع التالي، حين تسأل، سيكون لدى توكي ما يقوله.'),
    partial: t('She keeps a tally for two lessons, then loses it when the lesson gets going. Same three voices by Thursday.', 'تحتفظ بالعدّ درسين، ثم تفقده حين يشتدّ الدرس. الأصوات الثلاثة نفسها بحلول الخميس.'),
    unchanged: t('Four notes in her notebook, none of them tried. The next observed lesson is rehearsed for two weeks instead of one.', 'أربع ملاحظات في دفترها، لم تُجرَّب أيّ منها. الدرس المُلاحَظ التالي يُتدرَّب عليه أسبوعين بدلًا من أسبوع.'),
  },
};

/** 74 — The Small Thing. Ms. Aisha, strong, tired, end of a long day. */
export const CONVO_74: ConversationDefinition = {
  teacherName: t('Ms. Aisha', 'الأستاذة عائشة'),
  stance: 'tired',
  setting: t('Last period over. She is marking the books from today — the ones with the response lines filled in.', 'انتهت الحصة الأخيرة. تصحّح دفاتر اليوم — تلك التي مُلئت فيها سطور الاستجابة.'),
  read: t('Twelve years in. She knows the lesson was good and she knows coaches arrive with programmes. The size of what Toki says will be read as the size of what he thinks of her.', 'اثنا عشر عامًا في المهنة. تعرف أن الدرس كان جيدًا وتعرف أن المدرّبين يأتون ببرامج. حجم ما يقوله توكي ستقرؤه على أنه حجم ما يظنّه فيها.'),
  turns: [
    {
      teacherLine: t('Go on, then. What’s the programme this term?', 'تفضّل إذًا. ما البرنامج هذا الفصل؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('No programme. Your feedback loop is the one I’d show other people. I have one thirty-second thing, and then I’ll leave you to the books.', 'لا برنامج. حلقة التغذية الراجعة عندك هي ما كنت سأريه للآخرين. عندي شيء واحد من ثلاثين ثانية، ثم أتركك للدفاتر.'), reply: t('Thirty seconds. Go on.', 'ثلاثون ثانية. تفضّل.') },
        { id: 'b', effect: 'neutral', label: t('No programme — just a check-in. It was a strong lesson, really nothing major.', 'لا برنامج — مجرد متابعة. كان درسًا قويًا، لا شيء جوهري فعلًا.'), reply: t('"Nothing major." So there’s something minor. Go on, then.', '«لا شيء جوهري.» يعني هناك شيء ثانوي. تفضّل.') },
        { id: 'c', effect: 'closes', label: t('Not a programme as such, but I’d like to set a goal around success criteria and do a couple of follow-up visits.', 'ليس برنامجًا بالمعنى الحرفي، لكنني أودّ وضع هدف حول معايير النجاح وإجراء زيارتي متابعة.'), reply: t('A goal and follow-up visits. For the lesson you just watched. That’s a programme.', 'هدف وزيارات متابعة. للدرس الذي شاهدته للتو. هذا برنامج.') },
      ],
    },
    {
      teacherLine: t('Fine. The thirty seconds.', 'طيّب. الثلاثون ثانية.'),
      options: [
        { id: 'a', effect: 'opens', label: t('At the door two students couldn’t say what they got better at today. The criteria from 10:02 — what if the last question of the lesson was "which one did we meet?" That’s it. That’s the whole thing.', 'عند الباب لم يستطع طالبان القول فيمَ تحسّنا اليوم. معايير الساعة ١٠:٠٢ — ماذا لو كان آخر سؤال في الدرس «أيّها حققنا؟» هذا كل شيء. هذه الفكرة كلها.'), reply: t('"Which one did we meet." …That’s it? That’s a question. I can ask a question.', '«أيّها حققنا.» …هذا كل شيء؟ هذا سؤال. أستطيع أن أطرح سؤالًا.') },
        { id: 'b', effect: 'neutral', label: t('Just make sure the success criteria come back at the end of the lesson. Closure matters.', 'فقط تأكّدي من أن معايير النجاح تعود في نهاية الدرس. الإغلاق مهم.'), reply: t('Closure. Yes. I know. The bell doesn’t.', 'الإغلاق. نعم. أعرف. الجرس لا يعرف.') },
        { id: 'c', effect: 'closes', label: t('The success criteria were shared and then never revisited, so students couldn’t articulate the learning intention. I’d recommend a plenary routine.', 'شُوركت معايير النجاح ثم لم يُعَد إليها، فلم يستطع الطلاب التعبير عن غاية التعلّم. أوصي بروتين ختامي.'), reply: t('A plenary routine. I had one in 2019. The books are waiting — was there anything else?', 'روتين ختامي. كان عندي واحد في ٢٠١٩. الدفاتر تنتظر — هل كان هناك شيء آخر؟') },
      ],
    },
  ],
  outcomes: {
    restored: t('"Which one did we meet?" is the last line of every lesson now. It takes thirty seconds. The two students at the door can answer it.', '«أيّها حققنا؟» هي آخر جملة في كل درس الآن. تستغرق ثلاثين ثانية. الطالبان عند الباب يستطيعان الإجابة.'),
    partial: t('She means to. Some days the bell wins. The criteria are still shared at 10:02 and gone by 10:03.', 'تنوي ذلك. في بعض الأيام يفوز الجرس. المعايير ما زالت تُشارَك في ١٠:٠٢ وتغيب بحلول ١٠:٠٣.'),
    unchanged: t('She went back to the books. The next time a coach is announced, she asks the Head of Department whether it has to be this one.', 'عادت إلى الدفاتر. في المرة التالية التي يُعلَن فيها عن مدرّب، تسأل رئيس القسم إن كان يجب أن يكون هذا بالذات.'),
  },
};
