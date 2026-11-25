/**
 * WORLD 4 — Feedback That Moves Learning
 * Theme: When Feedback Becomes Routine
 * Core idea: feedback changes learning only when students act on it.
 */
import sceneTalk from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneOut from '../../assets/scenes/classroom-3-output.jpg';
import sceneAssess from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneAct from '../../assets/scenes/classroom-2-activity.jpg';
import type { LevelDefinition } from '../levelTypes';
import type { ConversationDefinition } from '../conversationTypes';
import { RISK_OPTIONS } from '../levelTypes';
import { t } from '../../i18n/types';

/** 41 — Well Done! Ms. Latifa, proud of a happy room. */
const CONVO_41: ConversationDefinition = {
  teacherName: t('Ms. Latifa', 'الأستاذة لطيفة'),
  stance: 'proud',
  setting: t('Tidy-up time. Twenty drawings dry on a line and she is pinning up one more.', 'وقت الترتيب. عشرون رسمة تجفّ على الحبل وهي تعلّق واحدة أخرى.'),
  read: t('Children run to her in the corridor. The warmth is not a technique; it is who she is, and the room works because of it.', 'يركض الأطفال إليها في الممر. الدفء ليس أسلوبًا؛ إنه هي، والغرفة تعمل بفضله.'),
  turns: [
    {
      teacherLine: t('They are so little. If I start picking at their work, half of them stop trying. You saw how happy they were.', 'إنهم صغار جدًا. إن بدأت بانتقاد أعمالهم، يتوقف نصفهم عن المحاولة. رأيت كم كانوا سعداء.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I did. And the boy with the house drawing kept looking at you after "beautiful". What do you think he wanted to know?', 'رأيت. والولد صاحب رسمة البيت ظل ينظر إليك بعد «جميلة». ما الذي تظنين أنه أراد معرفته؟'), reply: t('Which part. He always asks which part. I usually say "all of it".', 'أي جزء. دائمًا يسأل أي جزء. وأنا عادة أقول «كلها».') },
        { id: 'b', effect: 'neutral', label: t('You are right to protect that. The confidence in this room is the foundation for everything else.', 'أنتِ على حق في حماية ذلك. الثقة في هذه الغرفة أساس كل ما عداها.'), reply: t('Thank you. Some people think kindergarten is just colouring.', 'شكرًا. بعض الناس يظنون أن الروضة مجرد تلوين.') },
        { id: 'c', effect: 'closes', label: t('Twenty-three "well dones" in ten minutes. What did any of them tell a child to do next?', 'ثلاث وعشرون «أحسنت» في عشر دقائق. ماذا قالت أيٌّ منها لطفل عمّا يفعله بعد ذلك؟'), reply: t('To keep going. Which they did. Did you want me to stop saying it?', 'أن يكمل. وهذا ما فعلوه. هل تريدني أن أتوقف عن قولها؟') },
      ],
    },
    {
      teacherLine: t('So I should say "well done" less?', 'يعني أقول «أحسنت» أقل؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Say it, then add one thing. "Beautiful — the way you coloured inside the roof. Try that on the door." Same warmth, and now he knows.', 'قوليها، ثم أضيفي شيئًا واحدًا. «جميلة — الطريقة التي لوّنت بها داخل السقف. جرّبها على الباب.» الدفء نفسه، والآن يعرف.'), reply: t('"Try that on the door." That is one more sentence. I could do that with every child.', '«جرّبها على الباب.» هذه جملة واحدة أخرى. أستطيع فعلها مع كل طفل.') },
        { id: 'b', effect: 'neutral', label: t('Keep the praise; maybe balance it with a little more effort language — "you kept going".', 'احتفظي بالمدح؛ وربما وازنيه بمزيد من لغة الجهد — «واصلت المحاولة».'), reply: t('I do say that. I will say it more.', 'أقول ذلك فعلًا. سأقولها أكثر.') },
        { id: 'c', effect: 'closes', label: t('Use a feedback frame on every piece of work — two stars and a wish. I can send the template.', 'استخدمي إطارًا للتغذية الراجعة على كل عمل — نجمتان وأمنية. أستطيع إرسال النموذج.'), reply: t('A template. For four-year-olds. Send it, I will laminate it.', 'نموذج. لأطفال في الرابعة. أرسله، سأغلّفه.') },
      ],
    },
  ],
  outcomes: {
    restored: t('"Beautiful — and the roof is your neatest colouring yet. Try the door." The praise is still everywhere; each piece now carries a next step.', '«جميلة — والسقف أرتب تلوين لك حتى الآن. جرّب الباب.» المدح ما زال في كل مكان؛ وكل عبارة منه تحمل الآن خطوة تالية.'),
    partial: t('More "you kept going" now. The boy with the house still does not know which part was beautiful.', 'المزيد من «واصلت المحاولة» الآن. ولد البيت ما زال لا يعرف أي جزء كان جميلًا.'),
    unchanged: t('The template is laminated, on the wall, unused. "Well done!" twenty-three times, said a little more carefully when Toki is in the room.', 'النموذج مغلّف، على الجدار، غير مستخدم. «أحسنت!» ثلاثًا وعشرين مرة، تُقال بحذر أكبر قليلًا حين يكون توكي في الغرفة.'),
  },
};

/** 42 — Teacher Does All the Talking. Mr. Majid, the best explainer in the building. */
const CONVO_42: ConversationDefinition = {
  teacherName: t('Mr. Majid', 'الأستاذ ماجد'),
  stance: 'proud',
  setting: t('The lab bench after the bell. He is still holding the work he used for the feedback.', 'طاولة المختبر بعد الجرس. ما زال يحمل العمل الذي استخدمه للتغذية الراجعة.'),
  read: t('Fifteen years in. His feedback is a small lecture because lectures are what he does best, and this one was good.', 'خمسة عشر عامًا في المهنة. تغذيته الراجعة محاضرة صغيرة لأن المحاضرات هي ما يجيده، وهذه كانت جيدة.'),
  turns: [
    {
      teacherLine: t('Six points, all things they actually got wrong. I do not sugar-coat it. They know exactly where they stand.', 'ست نقاط، كلها أشياء أخطؤوا فيها فعلًا. لا أجمّل الأمر. يعرفون تمامًا أين يقفون.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They do — I wrote all six down myself. Then you said "next task" and the folders closed. What were you hoping they would do with the six?', 'يعرفون — كتبت الست بنفسي. ثم قلت «المهمة التالية» وأُغلقت الملفات. ما الذي كنت تأمل أن يفعلوه بالست؟'), reply: t('Use them. On the next one. Which is a different task, so… no, they could not, could they.', 'يستخدمونها. في التالية. وهي مهمة مختلفة، إذًا… لا، ما كانوا سيستطيعون، صحيح؟') },
        { id: 'b', effect: 'neutral', label: t('It was expert feedback. I learned something about the practical myself, listening to it.', 'كانت تغذية راجعة خبيرة. تعلّمت أنا نفسي شيئًا عن التجربة وأنا أستمع.'), reply: t('Most coaches do not follow the chemistry. Good.', 'معظم المدرّبين لا يتابعون الكيمياء. جيد.') },
        { id: 'c', effect: 'closes', label: t('Feedback nobody acts on is a speech, not feedback. The research on this is clear.', 'التغذية الراجعة التي لا يعمل بها أحد خطبة، لا تغذية راجعة. البحوث في هذا واضحة.'), reply: t('A speech. Fifteen years of speeches, apparently. Send me the research; I will file it.', 'خطبة. خمسة عشر عامًا من الخطب، على ما يبدو. أرسل لي البحوث؛ سأحفظها في الملف.') },
      ],
    },
    {
      teacherLine: t('So I give them time to fix it. Six points, twenty-six students — that is the whole lesson gone.', 'يعني أعطيهم وقتًا لإصلاحه. ست نقاط، ستة وعشرون طالبًا — يعني ضياع الدرس كله.'),
      options: [
        { id: 'a', effect: 'opens', label: t('One point, not six. "Fix the units in your table — five minutes." Same feedback, but it ends in their hands, not in the folder.', 'نقطة واحدة، لا ست. «صحّحوا الوحدات في جدولكم — خمس دقائق.» التغذية الراجعة نفسها، لكنها تنتهي في أيديهم لا في الملف.'), reply: t('Five minutes, one thing. I could put the other five on the board for the ones who finish.', 'خمس دقائق، شيء واحد. أستطيع وضع الخمس الأخرى على السبورة لمن ينتهي.') },
        { id: 'b', effect: 'neutral', label: t('Maybe have them note the points down so they carry over to the next practical.', 'ربما اجعلهم يدوّنون النقاط لتُنقل إلى التجربة التالية.'), reply: t('They have notebooks. I will tell them to use them.', 'لديهم دفاتر. سأقول لهم أن يستخدموها.') },
        { id: 'c', effect: 'closes', label: t('It is a priority question. Learning matters more than finishing the scheme of work.', 'إنها مسألة أولويات. التعلّم أهم من إنهاء الخطة الدراسية.'), reply: t('Tell the head of science that in June. I will give you her email.', 'قل ذلك لرئيسة قسم العلوم في يونيو. سأعطيك بريدها.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Feedback is one point and five minutes of green pen before the folder closes. The student who said "be more careful" now says "the units".', 'التغذية الراجعة نقطة واحدة وخمس دقائق بالقلم الأخضر قبل أن يُغلق الملف. الطالب الذي قال «أكون أكثر حرصًا» يقول الآن «الوحدات».'),
    partial: t('Students write the six points in their notebooks. The notebooks go in the bag. The next practical has the same six.', 'يكتب الطلاب النقاط الست في دفاترهم. تذهب الدفاتر إلى الحقيبة. التجربة التالية فيها النقاط الست نفسها.'),
    unchanged: t('The research is filed. The feedback is still six points and four minutes, delivered now with a glance at the door.', 'البحوث في الملف. التغذية الراجعة ما زالت ست نقاط وأربع دقائق، تُلقى الآن مع نظرة نحو الباب.'),
  },
};

/** 43 — Written Comments. Ms. Alya, marking every weekend and running on empty. */
const CONVO_43: ConversationDefinition = {
  teacherName: t('Ms. Alya', 'الأستاذة علياء'),
  stance: 'tired',
  setting: t('Sunday, first period. The marked essays are on her desk, and so is the next set, unmarked.', 'الأحد، الحصة الأولى. المقالات المصحَّحة على مكتبها، وبجانبها المجموعة التالية، غير مصحَّحة.'),
  read: t('Eleven comments per essay, every weekend, for twenty-six students. She is not defending the practice; she is carrying it.', 'أحد عشر تعليقًا لكل مقال، كل عطلة، لستة وعشرين طالبًا. هي لا تدافع عن الممارسة؛ هي تحملها.'),
  turns: [
    {
      teacherLine: t('I know what you are going to say. Too many comments. But if I write less, they say I do not care.', 'أعرف ما ستقوله. تعليقات كثيرة جدًا. لكن إن كتبت أقل، يقولون إنني لا أهتم.'),
      options: [
        { id: 'a', effect: 'opens', label: t('I was not going to say that. I watched Hamad get his essay back: grade, back page, grade again, bag. How many of the eleven did he read?', 'لم أكن سأقول ذلك. راقبت حمد وهو يستلم مقاله: الدرجة، الصفحة الأخيرة، الدرجة مرة أخرى، الحقيبة. كم من الأحد عشر قرأ؟'), reply: t('None. He never does. None of them do, really. I write them anyway.', 'ولا واحدًا. لا يقرأ أبدًا. لا أحد منهم يقرأ، في الحقيقة. أكتبها على أي حال.') },
        { id: 'b', effect: 'neutral', label: t('Nobody could say you do not care. That marking is the most thorough I have seen this year.', 'لا أحد يستطيع القول إنك لا تهتمين. هذا التصحيح الأكثر شمولًا الذي رأيته هذا العام.'), reply: t('Thorough. Yes. It takes my whole Saturday.', 'شامل. نعم. يأخذ يوم السبت كله مني.') },
        { id: 'c', effect: 'closes', label: t('Eleven comments is more than anyone can take in. Research says three at most.', 'أحد عشر تعليقًا أكثر مما يستطيع أحد استيعابه. تقول البحوث ثلاثة على الأكثر.'), reply: t('Three. So I spend my Saturday writing three. And when parents ask why the margin is empty?', 'ثلاثة. يعني أقضي يوم السبت أكتب ثلاثة. وحين يسأل الأهل لماذا الهامش فارغ؟') },
      ],
    },
    {
      teacherLine: t('Then what is the point of any of it? I could write the grade and go home.', 'يعني ما الفائدة من أي منها؟ أستطيع كتابة الدرجة والعودة إلى البيت.'),
      options: [
        { id: 'a', effect: 'opens', label: t('What if Monday opened with "fix the one thing in your margin" before anyone sees a grade? Three comments, twenty minutes, and your Saturday back.', 'ماذا لو بدأ الاثنين بـ«أصلحوا الشيء الواحد في هامشكم» قبل أن يرى أحد درجة؟ ثلاثة تعليقات، عشرون دقيقة، ويرجع لك يوم السبت.'), reply: t('Before the grade. They would actually have to read it. …My Saturday back.', 'قبل الدرجة. سيضطرون فعلًا إلى قراءته. …يرجع لي يوم السبت.') },
        { id: 'b', effect: 'neutral', label: t('The point is the thinking you do while marking — it shapes the next lesson even if they never read it.', 'الفائدة هي التفكير الذي تقومين به أثناء التصحيح — يشكّل الدرس التالي حتى لو لم يقرؤوه.'), reply: t('I suppose. It would be nice if it shaped them, too.', 'ربما. سيكون لطيفًا لو شكّلهم هم أيضًا.') },
        { id: 'c', effect: 'closes', label: t('With the next essay due Friday, the comments cannot land anyway. The planning has to change first.', 'مع موعد المقال التالي يوم الجمعة، لا يمكن للتعليقات أن تصل على أي حال. التخطيط يجب أن يتغير أولًا.'), reply: t('The planning. Which I did. On Sunday. After the marking.', 'التخطيط. الذي أنجزته. يوم الأحد. بعد التصحيح.') },
      ],
    },
  ],
  outcomes: {
    restored: t('Three comments. Monday opens with twenty minutes of revision and no grade on the page. Hamad read his margin because it was the only way to find out what he got.', 'ثلاثة تعليقات. يبدأ الاثنين بعشرين دقيقة من المراجعة ولا درجة على الصفحة. قرأ حمد هامشه لأنها كانت الطريقة الوحيدة ليعرف ما حصل عليه.'),
    partial: t('Still eleven comments, still Saturday. She says the marking helps her plan. The margins are still unread.', 'ما زالت أحد عشر تعليقًا، وما زال السبت. تقول إن التصحيح يساعدها على التخطيط. الهوامش ما زالت غير مقروءة.'),
    unchanged: t('The essays come back Friday with eleven comments. The next one is due the Friday after. She did not answer Toki about a follow-up.', 'تعود المقالات يوم الجمعة بأحد عشر تعليقًا. التالية مطلوبة الجمعة التي بعدها. لم تردّ على توكي بشأن المتابعة.'),
  },
};

/** 44 — Correcting Without Improving. Mr. Faisal follows the policy to the letter and expects credit for it. */
const CONVO_44: ConversationDefinition = {
  teacherName: t('Mr. Faisal', 'الأستاذ فيصل'),
  stance: 'defensive',
  setting: t('His desk, the department feedback policy pinned above it. A pile of books, green pen in every one.', 'مكتبه، وسياسة التغذية الراجعة للقسم معلّقة فوقه. كومة دفاتر، قلم أخضر في كل واحد.'),
  read: t('The last coach praised these books. He expects this one to do the same, and he has the policy ready in case it does not.', 'المدرّب السابق أشاد بهذه الدفاتر. يتوقع من هذا المدرّب أن يفعل مثله، والسياسة جاهزة في حال لم يفعل.'),
  turns: [
    {
      teacherLine: t('Green pen corrections after every task. Every student, every time. That is the policy and these books prove it.', 'تصحيحات بالقلم الأخضر بعد كل مهمة. كل طالب، كل مرة. هذه هي السياسة وهذه الدفاتر تثبت ذلك.'),
      options: [
        { id: 'a', effect: 'opens', label: t('They do — I have never seen it followed this consistently. May I show you one thing? Page 12, page 19, page 27: the same sign error, in green, three times.', 'تثبت ذلك — لم أرَ السياسة تُتَّبع بهذا الاتساق قط. هل أريك شيئًا واحدًا؟ الصفحة ١٢، الصفحة ١٩، الصفحة ٢٧: خطأ الإشارة نفسه، بالأخضر، ثلاث مرات.'), reply: t('…Three times. He corrected it three times. Where is he getting it from?', '…ثلاث مرات. صحّحه ثلاث مرات. من أين يأتي به؟') },
        { id: 'b', effect: 'neutral', label: t('The books are immaculate. If every department followed policy like this, my job would be easy.', 'الدفاتر لا تشوبها شائبة. لو اتبع كل قسم السياسة هكذا، لكان عملي سهلًا.'), reply: t('Tell the head of maths. She thinks I am slow on the scheme.', 'قل ذلك لرئيسة قسم الرياضيات. تظن أنني بطيء في الخطة الدراسية.') },
        { id: 'c', effect: 'closes', label: t('The policy is being followed and it is not working. Copying the right answer is not learning.', 'السياسة تُتَّبع وهي لا تعمل. نسخ الإجابة الصحيحة ليس تعلّمًا.'), reply: t('Not working. So the policy is wrong, or I am? Because I did not write it.', 'لا تعمل. يعني السياسة خاطئة، أم أنا؟ لأنني لم أكتبها.') },
      ],
    },
    {
      teacherLine: t('If the policy says correct it, they correct it. What do you want, a different policy?', 'إن كانت السياسة تقول صحّحوه، فهم يصحّحونه. ماذا تريد، سياسة مختلفة؟'),
      options: [
        { id: 'a', effect: 'opens', label: t('Same policy, one line added in green: "I was wrong because…", then a fresh question. The books stay the model; the error stops coming back.', 'السياسة نفسها، وسطر واحد يُضاف بالأخضر: «كنت مخطئًا لأن…»، ثم سؤال جديد. تبقى الدفاتر النموذج؛ ويتوقف الخطأ عن العودة.'), reply: t('"Because." One line. That is still a correction, technically. Nobody could say it is not.', '«لأن.» سطر واحد. هذا ما زال تصحيحًا، من الناحية الفنية. لا أحد يستطيع القول إنه ليس كذلك.') },
        { id: 'b', effect: 'neutral', label: t('Keep doing exactly this. Maybe reteach sign rules once to the whole class.', 'استمرّ في فعل هذا تمامًا. ربما أعد تدريس قواعد الإشارة مرة للصف كله.'), reply: t('I taught it in September. I can teach it again if you want it on the plan.', 'درّستها في سبتمبر. أستطيع تدريسها مجددًا إن أردتها على الخطة.') },
        { id: 'c', effect: 'closes', label: t('I want students to understand, not to perform the policy. That is the difference between compliance and learning.', 'أريد الطلاب أن يفهموا، لا أن يؤدّوا السياسة. هذا هو الفرق بين الامتثال والتعلّم.'), reply: t('Compliance. Put that in your report. "Mr. Faisal complies."', 'امتثال. ضعها في تقريرك. «الأستاذ فيصل يمتثل.»') },
      ],
    },
  ],
  outcomes: {
    restored: t('Every green correction now has a "because" and a new question beneath it. The sign error appeared once more in week two, then not again. The books are still the department model.', 'كل تصحيح أخضر الآن يحمل «لأن» وسؤالًا جديدًا تحته. ظهر خطأ الإشارة مرة أخرى في الأسبوع الثاني، ثم لم يعد. الدفاتر ما زالت نموذج القسم.'),
    partial: t('Sign rules were retaught in a Tuesday starter. The green pen still copies the board. Page 34 has the error again.', 'أُعيد تدريس قواعد الإشارة في بداية درس الثلاثاء. القلم الأخضر ما زال ينسخ السبورة. الصفحة ٣٤ فيها الخطأ مجددًا.'),
    unchanged: t('The books are perfect. The policy is followed. He asked the head of department whether coaching visits are optional.', 'الدفاتر مثالية. السياسة متَّبعة. سأل رئيسة القسم عمّا إذا كانت زيارات التدريب اختيارية.'),
  },
};

export const LEVEL_41: LevelDefinition = {
  id: 41,
  title: t('Well Done!', 'أحسنت!'),
  theme: t('Praise ≠ Feedback', 'المدح ≠ التغذية الراجعة'),
  subject: t('Kindergarten', 'رياض الأطفال'),
  sceneImage: sceneTalk,
  scenario: t(
    'The teacher is generous and warm. "Excellent!" "Well done!" "Great work!" land on every answer, every drawing, every attempt. The children glow. The room is one of the happiest Toki has visited, and the teacher is loved. Toki listens for what comes after the praise.',
    'المعلّمة سخيّة ودافئة. «ممتاز!» «أحسنت!» «عمل رائع!» تهبط على كل إجابة وكل رسمة وكل محاولة. الأطفال يتألقون. الغرفة من أسعد ما زاره توكي، والمعلّمة محبوبة. يُنصت توكي لما يأتي بعد المدح.',
  ),
  evidence: [
    { id: 'drawing', x: 24, y: 62, label: t('A drawing', 'رسمة'), clue: t('"Beautiful!" The child beams. He doesn’t know which part was beautiful, or what to try next.', '«جميلة!» يبتسم الطفل. لا يعرف أي جزء كان جميلًا، ولا ما يجرّبه بعد ذلك.') },
    { id: 'answer', x: 55, y: 70, label: t('A wrong answer', 'إجابة خاطئة'), clue: t('"Good try, well done!" The wrong answer stays on the board. The next child copies it.', '«محاولة جيدة، أحسنت!» تبقى الإجابة الخاطئة على السبورة. يقلّدها الطفل التالي.') },
    { id: 'tally', x: 80, y: 32, label: t('Toki’s tally', 'إحصاء توكي'), clue: t('In ten minutes: 23 pieces of praise. 0 pieces of information about how to improve.', 'في عشر دقائق: ٢٣ عبارة مدح. ٠ معلومة عن كيفية التحسّن.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The children are happy and encouraged. What should Toki consider next?', 'الأطفال سعداء ومشجَّعون. ما الذي ينبغي أن يفكّر فيه توكي بعد ذلك؟'),
      options: [
        { id: 'sincerity', label: t('Whether the praise is sincere or has become automatic', 'هل المدح صادق أم صار آليًا') },
        { id: 'fairness', label: t('Whether every child receives a fair share of the praise', 'هل ينال كل طفل نصيبًا عادلًا من المدح') },
        { id: 'errors', label: t('Whether wrong answers are being corrected at all', 'هل تُصحَّح الإجابات الخاطئة أصلًا') },
        { id: 'guides', label: t('Whether any child could say what to do differently next', 'هل يستطيع أي طفل أن يقول ما سيفعله بشكل مختلف بعد ذلك') },
      ],
      correctId: 'guides',
      hint: t('Look at the drawing clue: the child beams and does not know what to try. If every one of the 23 pieces of praise had been sincere and fair, would that have changed?', 'انظر إلى دليل الرسمة: يبتسم الطفل ولا يعرف ما يجرّبه. لو كانت كل عبارات المدح الثلاث والعشرون صادقة وعادلة، هل كان ذلك سيتغير؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'minor',
      hint: t('Go back to Toki’s tally: 23 and 0. Is anything in this room actively harming the children, or is something simply absent from a room that works?', 'عُد إلى إحصاء توكي: ٢٣ و٠. هل يوجد في هذه الغرفة ما يؤذي الأطفال فعليًا، أم أن شيئًا ما غائب فقط عن غرفة تعمل؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'praise-plus', label: t('Keep the warmth and add one detail each time: what was good, and one thing to try next', 'احتفظ بالدفء وأضف تفصيلًا واحدًا كل مرة: ما كان جيدًا، وشيئًا واحدًا يُجرَّب بعد ذلك') },
        { id: 'effort', label: t('Shift the praise from the product to the effort: "you kept trying", "you checked your work"', 'حوّل المدح من المنتج إلى الجهد: «واصلتِ المحاولة»، «راجعتِ عملك»') },
        { id: 'errors', label: t('Agree that wrong answers get corrected on the board before the next child answers', 'اتفق على أن تُصحَّح الإجابات الخاطئة على السبورة قبل أن يجيب الطفل التالي') },
        { id: 'peer', label: t('Have children say one specific thing they liked about each other’s work', 'دع الأطفال يقولون شيئًا محددًا واحدًا أعجبهم في عمل بعضهم') },
      ],
      correctId: 'praise-plus',
      hint: t('Three of these moves change who speaks or what gets corrected. Read the drawing clue once more: what did the boy need to hear right after "beautiful"?', 'ثلاث من هذه الخطوات تغيّر مَن يتحدث أو ما يُصحَّح. اقرأ دليل الرسمة مرة أخرى: ما الذي كان الولد بحاجة إلى سماعه مباشرة بعد «جميلة»؟'),
    },
    reasoning: {
      prompt: t('Why add to the praise rather than reduce it?', 'لماذا نضيف إلى المدح بدل تقليله؟'),
      options: [
        { id: 'r1', label: t('A teacher told to praise less will praise less and add nothing', 'المعلّمة التي يُقال لها امدحي أقل ستمدح أقل ولن تضيف شيئًا') },
        { id: 'r3', label: t('Young children stop trying when the praise stops', 'يتوقف الأطفال الصغار عن المحاولة حين يتوقف المدح') },
        { id: 'r4', label: t('The warmth is the reason the children listen at all', 'الدفء هو سبب إنصات الأطفال أصلًا') },
        { id: 'r2', label: t('One specific detail turns a warm moment into a learning moment', 'تفصيل محدد واحد يحوّل اللحظة الدافئة إلى لحظة تعلّم') },
      ],
      correctId: 'r2',
      hint: t('The drawing clue: he beams, and does not know which part. What was the missing ingredient in that moment — less warmth, or something added to it?', 'دليل الرسمة: يبتسم، ولا يعرف أي جزء. ما المكوّن الناقص في تلك اللحظة — دفء أقل، أم شيء يُضاف إليه؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_41,
  reveal: {
    whatDrifted: t(
      'Encouragement has replaced feedback. The children feel good and learn nothing from the comment itself about what to keep or change.',
      'حلّ التشجيع محلّ التغذية الراجعة. يشعر الأطفال بالرضا ولا يتعلّمون من التعليق نفسه شيئًا عمّا يحتفظون به أو يغيّرونه.',
    ),
    whyItHappened: t(
      'Praise is fast, kind, and always welcome. Specific feedback takes a second of noticing. Under the pace of a young class, the noticing drops and the kindness stays.',
      'المدح سريع ولطيف ومرحَّب به دائمًا. أما التغذية الراجعة المحددة فتحتاج إلى ثانية من الملاحظة. تحت إيقاع صف صغير تسقط الملاحظة ويبقى اللطف.',
    ),
    howToRestore: t(
      'Praise can motivate, but feedback should also show students how to improve. Keep every "well done" and attach one specific thing to it — what was good, and what to try next.',
      'يمكن للمدح أن يحفّز، لكن ينبغي للتغذية الراجعة أن تُري الطلاب كيف يتحسّنون. احتفظ بكل «أحسنت» وأرفق بها شيئًا محددًا واحدًا — ما كان جيدًا، وما يُجرَّب بعد ذلك.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_42: LevelDefinition = {
  id: 42,
  title: t('Teacher Does All the Talking', 'المعلّم يتحدث وحده'),
  theme: t('Heard ≠ Acted On', 'مسموع ≠ معمول به'),
  subject: t('Science', 'العلوم'),
  sceneImage: sceneOut,
  scenario: t(
    'After each task the teacher gives detailed verbal feedback to the whole class — precise, well-structured, genuinely expert. Students listen quietly and nod. It would make a fine lecture on how to do the task well. Toki watches what students do when the feedback ends.',
    'بعد كل مهمة يقدّم المعلّم تغذية راجعة شفهية مفصّلة للصف كله — دقيقة ومنظّمة وخبيرة فعلًا. يُنصت الطلاب بهدوء ويومئون. لكانت محاضرة ممتازة عن كيفية أداء المهمة جيدًا. يراقب توكي ما يفعله الطلاب حين تنتهي التغذية الراجعة.',
  ),
  evidence: [
    { id: 'feedback', x: 50, y: 28, label: t('The feedback', 'التغذية الراجعة'), clue: t('Four minutes, six distinct points, all correct. Nobody writes anything down.', 'أربع دقائق، ست نقاط متمايزة، كلها صحيحة. لا أحد يدوّن شيئًا.') },
    { id: 'after', x: 26, y: 66, label: t('When it ends', 'حين تنتهي'), clue: t('"Okay — next task." The flawed work goes in the folder, untouched.', '«طيّب — المهمة التالية.» يذهب العمل المعيب إلى الملف دون أن يُمسّ.') },
    { id: 'student', x: 78, y: 66, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"What was the main thing to fix?" — "Um… be more careful?"', '«ما الشيء الأساسي الذي ينبغي إصلاحه؟» — «أمم… أن أكون أكثر حرصًا؟»') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The feedback is excellent. What should Toki look for?', 'التغذية الراجعة ممتازة. ما الذي ينبغي أن يبحث عنه توكي؟'),
      options: [
        { id: 'fit', label: t('Whether the six points fit every student’s work or only the weakest', 'هل تناسب النقاط الست عمل كل طالب أم الأضعف فقط') },
        { id: 'action', label: t('What happens to the flawed work in the minutes after the feedback', 'ماذا يحدث للعمل المعيب في الدقائق التي تلي التغذية الراجعة') },
        { id: 'notes', label: t('Whether students have a way to capture the points as they are said', 'هل لدى الطلاب طريقة لتدوين النقاط وقت قولها') },
        { id: 'priority', label: t('Whether the teacher signals which of the six points matters most', 'هل يشير المعلّم إلى أي النقاط الست هي الأهم') },
      ],
      correctId: 'action',
      hint: t('The second clue: "Okay — next task", and the flawed work goes in the folder untouched. Which option is asking about that moment rather than about the six points?', 'الدليل الثاني: «طيّب — المهمة التالية»، ويذهب العمل المعيب إلى الملف دون أن يُمَس. أي خيار يسأل عن تلك اللحظة لا عن النقاط الست؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'moderate',
      hint: t('The feedback clue says all six points were correct and expert. The student clue says "be more careful". Is the practice itself broken, or is one step missing from it?', 'يقول دليل التغذية الراجعة إن النقاط الست كلها صحيحة وخبيرة. ويقول دليل الطالب «أكون أكثر حرصًا». هل الممارسة نفسها معطّلة، أم أن خطوة واحدة ناقصة منها؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'one-point', label: t('Cut the six points to the one that matters most, and say it twice', 'اختصر النقاط الست إلى الأهم، وقلها مرتين') },
        { id: 'notes', label: t('Have students write the six points in their books before the next task', 'دع الطلاب يكتبون النقاط الست في دفاترهم قبل المهمة التالية') },
        { id: 'model', label: t('Show a model answer alongside the feedback so students can see exactly what "good" looks like', 'اعرض إجابة نموذجية مع التغذية الراجعة ليرى الطلاب شكل «الجيد»') },
        { id: 'act', label: t('End every feedback with five minutes in which students revise one thing in the work just done', 'أنهِ كل تغذية راجعة بخمس دقائق يراجع فيها الطلاب شيئًا واحدًا في العمل الذي أنجزوه للتو') },
      ],
      correctId: 'act',
      hint: t('Three of these improve how the six points are said or shown. Look at "when it ends": the folder closes. Which move changes what happens to the work in the folder?', 'ثلاث من هذه تحسّن طريقة قول النقاط الست أو عرضها. انظر إلى «حين تنتهي»: يُغلق الملف. أي خطوة تغيّر ما يحدث للعمل في الملف؟'),
    },
    reasoning: {
      prompt: t('Why five minutes of revision rather than a clearer handout?', 'لماذا خمس دقائق مراجعة بدل ورقة أوضح؟'),
      options: [
        { id: 'r1', label: t('Revising one thing is achievable; six points is a lecture', 'مراجعة شيء واحد ممكنة؛ وست نقاط محاضرة') },
        { id: 'r3', label: t('Students remember what they do longer than what they hear', 'يتذكّر الطلاب ما يفعلونه أطول مما يسمعونه') },
        { id: 'r2', label: t('Feedback becomes learning only when the student does something with it', 'لا تصبح التغذية الراجعة تعلّمًا إلا حين يفعل الطالب شيئًا بها') },
        { id: 'r4', label: t('The revised work hands the teacher evidence that the feedback actually landed', 'العمل المراجَع يعطي المعلّم دليلًا على أن التغذية الراجعة وصلت') },
      ],
      correctId: 'r2',
      hint: t('The student said "be more careful" after four minutes of expert feedback. What did he not get to do between hearing it and "next task"?', 'قال الطالب «أكون أكثر حرصًا» بعد أربع دقائق من تغذية راجعة خبيرة. ما الذي لم تُتَح له فرصة فعله بين سماعها و«المهمة التالية»؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_42,
  reveal: {
    whatDrifted: t(
      'Feedback has become a performance by the teacher rather than an action by the student. Expert advice is delivered, received, and filed.',
      'أصبحت التغذية الراجعة أداءً من المعلّم لا فعلًا من الطالب. تُقدَّم النصيحة الخبيرة وتُستقبل وتُحفَظ.',
    ),
    whyItHappened: t(
      'Giving good feedback feels like the job done. Making time for students to act on it feels like losing time — so the lesson moves on and the feedback stays in the air.',
      'يبدو تقديم تغذية راجعة جيدة كأنه إنجاز المهمة. أما إتاحة وقت للطلاب للعمل بها فيبدو خسارة للوقت — فينتقل الدرس وتبقى التغذية الراجعة في الهواء.',
    ),
    howToRestore: t(
      'Feedback should create student action, reflection, and improvement. Say less, then stop — and give the minutes you saved to students revising their own work.',
      'ينبغي للتغذية الراجعة أن تُنتج فعلًا وتأملًا وتحسّنًا لدى الطالب. قل أقل ثم توقف — وامنح الدقائق التي وفّرتها للطلاب ليراجعوا أعمالهم.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_43: LevelDefinition = {
  id: 43,
  title: t('Written Comments', 'تعليقات مكتوبة'),
  theme: t('Written ≠ Read', 'مكتوب ≠ مقروء'),
  subject: t('English', 'اللغة الإنجليزية'),
  sceneImage: sceneAssess,
  scenario: t(
    'Students receive their essays back covered in written comments — detailed, supportive, and clearly the product of hours of weekend marking. The teacher is exhausted and proud. Toki picks up a returned essay and reads the margin.',
    'يتسلّم الطلاب مقالاتهم مغطاة بتعليقات مكتوبة — مفصّلة وداعمة ومن الواضح أنها ثمرة ساعات من التصحيح في عطلة الأسبوع. المعلّمة مرهقة وفخورة. يلتقط توكي مقالًا مُعادًا ويقرأ الهامش.',
  ),
  evidence: [
    { id: 'margin', x: 28, y: 62, label: t('The margin', 'الهامش'), clue: t('Eleven comments on one page. Thoughtful. Overlapping. The student would need twenty minutes just to read them.', 'أحد عشر تعليقًا في صفحة واحدة. مدروسة. متداخلة. يحتاج الطالب إلى عشرين دقيقة لقراءتها فقط.') },
    { id: 'student', x: 60, y: 70, label: t('A student', 'طالب'), clue: t('Reads the grade. Flips to the back. Checks the grade again. The margin is never read.', 'يقرأ الدرجة. يقلب إلى الخلف. يتحقق من الدرجة مجددًا. لا يُقرأ الهامش أبدًا.') },
    { id: 'next', x: 80, y: 30, label: t('Next essay', 'المقال التالي'), clue: t('Due Friday — on a new topic. There is no step where this essay gets revised.', 'موعدها الجمعة — بموضوع جديد. لا توجد خطوة تُراجَع فيها هذه المقالة.') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The comments are detailed and kind. What matters most?', 'التعليقات مفصّلة ولطيفة. ما الأهم؟'),
      options: [
        { id: 'load', label: t('Whether eleven comments is more than a student can take in', 'هل أحد عشر تعليقًا أكثر مما يستوعبه الطالب') },
        { id: 'quality', label: t('Whether the comments name the next step or only the problem', 'هل تسمّي التعليقات الخطوة التالية أم المشكلة فقط') },
        { id: 'use', label: t('Whether there is a moment when this essay gets revised', 'هل توجد لحظة تُراجَع فيها هذه المقالة') },
        { id: 'cost', label: t('Whether the weekend marking is sustainable for the teacher', 'هل تصحيح عطلة الأسبوع قابل للاستمرار بالنسبة إلى المعلّمة') },
      ],
      correctId: 'use',
      hint: t('Follow the third clue: "due Friday — on a new topic". Even if the eleven comments were three perfect ones, what would happen to them by Friday?', 'اتبع الدليل الثالث: «موعدها الجمعة — بموضوع جديد». حتى لو كانت التعليقات الأحد عشر ثلاثة تعليقات مثالية، ماذا سيحدث لها بحلول الجمعة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'high',
      hint: t('The margin clue: hours of weekend work. The student clue: the margin is never read. Who is paying for this practice, and what are they getting back?', 'دليل الهامش: ساعات من عمل العطلة. دليل الطالب: الهامش لا يُقرأ أبدًا. مَن يدفع ثمن هذه الممارسة، وماذا يحصل في المقابل؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'three', label: t('Three comments instead of eleven, each naming one change to make', 'ثلاثة تعليقات بدل أحد عشر، يسمّي كل منها تغييرًا واحدًا') },
        { id: 'revise', label: t('Three comments, and the next lesson opens with students revising the essay against them', 'ثلاثة تعليقات، ويُفتتح الدرس التالي بمراجعة الطلاب هذه المقالة على ضوئها') },
        { id: 'grade-later', label: t('Return the grade first and the written comments a week later, once marks are settled', 'أعد الدرجة أولًا والتعليقات المكتوبة بعد أسبوع، بعد أن تستقر الدرجات') },
        { id: 'codes', label: t('Replace written comments with marking codes keyed to a class sheet', 'استبدل التعليقات المكتوبة برموز تصحيح مرتبطة بورقة للصف') },
      ],
      correctId: 'revise',
      hint: t('Two of these make the margin shorter or get it read. Look at the "next essay" clue again: new topic, Friday. Which move gives this essay a second life before that?', 'اثنتان من هذه تجعلان الهامش أقصر أو تجعلانه يُقرأ. انظر إلى دليل «المقال التالي» مجددًا: موضوع جديد، الجمعة. أي خطوة تمنح هذا المقال حياة ثانية قبل ذلك؟'),
    },
    reasoning: {
      prompt: t('Why does the revision lesson matter more than the comments themselves?', 'لماذا يهمّ درس المراجعة أكثر من التعليقات نفسها؟'),
      options: [
        { id: 'r1', label: t('Three comments can be written in a third of the time, so the teacher lasts the year', 'ثلاثة تعليقات تُكتب في ثلث الوقت، فتصمد المعلّمة العام كله') },
        { id: 'r2', label: t('Written feedback has impact only when the student revisits and revises the work', 'لا يكون للتغذية الراجعة المكتوبة أثر إلا حين يعود الطالب إلى العمل ويراجعه') },
        { id: 'r3', label: t('A revision lesson shows the teacher which comments the students understood', 'يُري درس المراجعة المعلّمة أي التعليقات فهمها الطلاب') },
        { id: 'r4', label: t('Students who revise one essay write the next one better', 'الطلاب الذين يراجعون مقالًا يكتبون التالي أفضل') },
      ],
      correctId: 'r2',
      hint: t('The student flipped to the grade and put the essay away. Where, in the week that followed, could any comment have changed his writing?', 'قلّب الطالب إلى الدرجة ووضع المقال جانبًا. أين، في الأسبوع الذي تلا، كان يمكن لأي تعليق أن يغيّر كتابته؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_43,
  reveal: {
    whatDrifted: t(
      'Writing the feedback has become the whole practice. The comments are excellent and unread, because nothing in the week asks the student to use them.',
      'أصبحت كتابة التغذية الراجعة هي الممارسة كلها. التعليقات ممتازة وغير مقروءة، لأن لا شيء في الأسبوع يطلب من الطالب استخدامها.',
    ),
    whyItHappened: t(
      'Thorough marking is visible proof of care, to the teacher and to anyone who inspects the books. Revision time is invisible and feels like repetition — so it gets cut first.',
      'التصحيح الدقيق دليل مرئي على الاهتمام، للمعلّمة ولكل من يفحص الدفاتر. أما وقت المراجعة فخفيّ ويبدو تكرارًا — فيُقتطع أولًا.',
    ),
    howToRestore: t(
      'Written feedback has impact when students revisit, revise, and improve their work. Write less, and build the lesson in which it gets used.',
      'يكون للتغذية الراجعة المكتوبة أثر حين يعود الطلاب إلى أعمالهم ويراجعونها ويحسّنونها. اكتب أقل، وابنِ الدرس الذي تُستخدم فيه.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};

export const LEVEL_44: LevelDefinition = {
  id: 44,
  title: t('Correcting Without Improving', 'تصحيح بلا تحسّن'),
  theme: t('Corrected ≠ Learned', 'مصحَّح ≠ متعلَّم'),
  subject: t('Math', 'الرياضيات'),
  sceneImage: sceneAct,
  scenario: t(
    'This class does everything the feedback books say. Students correct their answers after feedback, in green pen, every time. The books are a model of the policy. And yet the same errors come back on the next task, and the one after. Toki opens one book to three weeks ago.',
    'يفعل هذا الصف كل ما تقوله أدلة التغذية الراجعة. يصحّح الطلاب إجاباتهم بعد التغذية الراجعة، بالقلم الأخضر، في كل مرة. الدفاتر نموذج للسياسة. ومع ذلك تعود الأخطاء نفسها في المهمة التالية، والتي بعدها. يفتح توكي دفترًا على ما قبل ثلاثة أسابيع.',
  ),
  evidence: [
    { id: 'green', x: 26, y: 62, label: t('Green pen', 'القلم الأخضر'), clue: t('The corrected answer is copied from the board. Perfectly. Without working.', 'الإجابة المصحّحة منسوخة من السبورة. بإتقان. دون خطوات حل.') },
    { id: 'pattern', x: 58, y: 68, label: t('Three weeks', 'ثلاثة أسابيع'), clue: t('The same sign error, corrected in green, five times. Never once explained.', 'خطأ الإشارة نفسه، مصحَّح بالأخضر، خمس مرات. لم يُشرح ولا مرة.') },
    { id: 'student', x: 80, y: 32, label: t('Ask a student', 'اسأل طالبًا'), clue: t('"Why was it wrong?" — "I don’t know. I fixed it though."', '«لماذا كانت خاطئة؟» — «لا أعرف. لكنني أصلحتها.»') },
  ],
  steps: {
    identifyDrift: {
      prompt: t('The corrections are always made. What is the key issue?', 'التصحيحات تُجرى دائمًا. ما القضية الأساسية؟'),
      options: [
        { id: 'transfer', label: t('Whether the corrected error stays corrected on a new question', 'هل يبقى الخطأ المصحَّح مصحَّحًا في سؤال جديد') },
        { id: 'working', label: t('Whether students show working when they correct, not only the answer', 'هل يُظهر الطلاب خطوات الحل عند التصحيح لا الإجابة فقط') },
        { id: 'source', label: t('Whether the sign error comes from the teaching or from the students', 'هل يأتي خطأ الإشارة من التدريس أم من الطلاب') },
        { id: 'timing', label: t('Whether corrections happen the same day or a week later', 'هل يحدث التصحيح في اليوم نفسه أم بعد أسبوع') },
      ],
      correctId: 'transfer',
      hint: t('Working, source and timing are all about this correction. Read the "three weeks" clue: the same sign error, five times. Which option asks about the sixth time?', 'طريقة الحل والمصدر والتوقيت كلها عن هذا التصحيح. اقرأ دليل «ثلاثة أسابيع»: خطأ الإشارة نفسه، خمس مرات. أي خيار يسأل عن المرة السادسة؟'),
    },
    assessRisk: {
      prompt: t('How serious is this drift?', 'ما مدى خطورة هذا الانحراف؟'),
      options: RISK_OPTIONS,
      correctId: 'lethal',
      hint: t('The green pen clue: the correction is perfect every time. The "ask a student" clue: "I don’t know. I fixed it though." If the books look like a model and the error never leaves, what has the practice become?', 'دليل القلم الأخضر: التصحيح مثالي في كل مرة. دليل «اسأل طالبًا»: «لا أعرف. لكنني أصلحته.» إن كانت الدفاتر تبدو نموذجًا والخطأ لا يغادر أبدًا، فماذا أصبحت الممارسة؟'),
    },
    chooseCoaching: {
      prompt: t("What's the best coaching move?", 'ما أفضل خطوة تدريبية؟'),
      options: [
        { id: 'working', label: t('Require full working in green, not just the final answer', 'اشترط خطوات الحل كاملة بالأخضر، لا الإجابة النهائية فقط') },
        { id: 'reteach', label: t('Reteach sign rules to the whole class before the next correction', 'أعد تدريس قواعد الإشارة للصف كله قبل التصحيح التالي') },
        { id: 'why-then-new', label: t('Replace "copy the right answer" with "explain why yours was wrong, then solve a new one"', 'استبدل «انسخ الإجابة الصحيحة» بـ«اشرح لماذا كانت إجابتك خاطئة، ثم حلّ سؤالًا جديدًا»') },
        { id: 'track', label: t('Ask the teacher to keep a tally of which students read their comments', 'اطلب من المعلّم أن يحتفظ بإحصاء لمن يقرأ تعليقاته من الطلاب') },
      ],
      correctId: 'why-then-new',
      hint: t('Full working can still be copied from the board. Reteaching and tallies come from the teacher. Read "I don’t know — I fixed it though" once more: which move puts the knowing on the student’s side of the desk?', 'يمكن نسخ طريقة الحل الكاملة من السبورة أيضًا. إعادة التدريس والإحصاء تأتيان من المعلّم. اقرأ «لا أعرف — لكنني أصلحته» مرة أخرى: أي خطوة تضع المعرفة في جانب الطالب من المكتب؟'),
    },
    reasoning: {
      prompt: t('Why "explain, then a new one" instead of a better correction?', 'لماذا «اشرح، ثم سؤال جديد» بدل تصحيح أفضل؟'),
      options: [
        { id: 'r2', label: t('Explaining and re-applying is where understanding transfers to the next task', 'الشرح وإعادة التطبيق هما حيث ينتقل الفهم إلى المهمة التالية') },
        { id: 'r1', label: t('A student who explains an error out loud is less likely to repeat it from embarrassment', 'الطالب الذي يشرح خطأه بصوت مرتفع أقل احتمالًا لتكراره بدافع الحرج') },
        { id: 'r3', label: t('A new question tells the teacher which students still need reteaching', 'السؤال الجديد يخبر المعلّم أي الطلاب ما زالوا بحاجة إلى إعادة تدريس') },
        { id: 'r4', label: t('Copying the answer gives the student nothing to think about', 'نسخ الإجابة لا يعطي الطالب شيئًا يفكّر فيه') },
      ],
      correctId: 'r2',
      hint: t('Five green corrections, one sign error still alive. What did each correction fix — the mark on the page, or the idea that produced it?', 'خمسة تصحيحات خضراء، وخطأ إشارة واحد ما زال حيًا. ما الذي أصلحه كل تصحيح — العلامة على الصفحة، أم الفكرة التي أنتجتها؟'),
      bonusPoints: 25,
    },
  },
  conversation: CONVO_44,
  reveal: {
    whatDrifted: t(
      'Correction has become transcription. The right answer is recorded; the wrong idea that produced it is untouched, so it produces it again next week.',
      'أصبح التصحيح نسخًا. تُسجَّل الإجابة الصحيحة؛ أما الفكرة الخاطئة التي أنتجتها فلا تُمسّ، فتنتجها مجددًا الأسبوع القادم.',
    ),
    whyItHappened: t(
      'A green-pen policy is easy to see and easy to check. "Did they correct it?" is a question a book can answer. "Did they understand why?" is not — so the policy got followed and the purpose got lost.',
      'سياسة القلم الأخضر سهلة الرؤية وسهلة التحقق. «هل صحّحوها؟» سؤال يستطيع الدفتر الإجابة عنه. أما «هل فهموا لماذا؟» فلا — فاتُّبعت السياسة وضاعت الغاية.',
    ),
    howToRestore: t(
      'Feedback should build understanding that transfers to future tasks, not only fix the current answer. Explain the error in your own words; then prove it on a fresh problem.',
      'ينبغي للتغذية الراجعة أن تبني فهمًا ينتقل إلى المهام المستقبلية، لا أن تصلح الإجابة الحالية فقط. اشرح الخطأ بكلماتك؛ ثم أثبته في مسألة جديدة.',
    ),
  },
  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['mutation-hunter'],
};

export const WORLD_4_LEVELS = [LEVEL_41, LEVEL_42, LEVEL_43, LEVEL_44];
