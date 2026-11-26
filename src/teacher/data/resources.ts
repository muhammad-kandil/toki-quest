/**
 * Alef resources catalog. Owned by the content designer.
 *
 * Every entry is a plain pedagogical tool written in teacher language.
 * Names and descriptions are PLACEHOLDERS until the Alef team maps each
 * one to a real Alef feature (see docs/content/TEACHER_CONTENT.md,
 * "Claims Alef must verify"). Order: by stage, then by first appearance.
 */
import type { AlefResource } from '../types';
import { t } from '../../i18n/types';

export const RESOURCES: AlefResource[] = [
  /* ---------------- Launch ---------------- */
  {
    id: 'launch-game',
    stage: 'launch',
    icon: '▶',
    title: t('Launch game', 'لعبة افتتاحية'),
    what: t(
      'A short game that pulls the whole class into the lesson question in the first few minutes.',
      'لعبة قصيرة تجذب الصف كله إلى سؤال الدرس في الدقائق الأولى.',
    ),
    monday: t(
      'Try it Monday: open with a 3-minute game, then stop and ask "why?" about one answer.',
      'جرّبها يوم الاثنين: ابدأ بلعبة مدتها ٣ دقائق، ثم توقّف واسأل «لماذا؟» عن إجابة واحدة.',
    ),
    placeholder: true,
  },
  {
    id: 'printed-backup',
    stage: 'launch',
    icon: '▤',
    title: t('Printed backup task', 'نسخة ورقية احتياطية'),
    what: t(
      'The same task on paper, so the lesson keeps going when the tablets or the Wi-Fi do not.',
      'المهمة نفسها على الورق، حتى يستمر الدرس إذا تعطّلت الأجهزة أو انقطع الإنترنت.',
    ),
    monday: t(
      'Try it Monday: print one copy of the main task per table and keep it in your drawer.',
      'جرّبها يوم الاثنين: اطبع نسخة واحدة من المهمة الرئيسية لكل طاولة واحتفظ بها في درجك.',
    ),
    placeholder: true,
  },
  {
    id: 'think-pair-share',
    stage: 'launch',
    icon: '⇄',
    title: t('Think, pair, share', 'فكّر، ناقش زميلك، شارك'),
    what: t(
      'Thirty seconds to think alone, a minute to tell a partner, then share. Quiet students get a rehearsal before anyone speaks to the class.',
      'ثلاثون ثانية للتفكير بمفرده، ودقيقة ليخبر زميله، ثم المشاركة. يتدرّب الطالب الهادئ قبل أن يتكلّم أحد أمام الصف.',
    ),
    monday: t(
      'Try it Monday: before taking any hands, say "Think. Now tell your partner." and count to sixty.',
      'جرّبها يوم الاثنين: قبل أن تأخذ أي يد مرفوعة، قل «فكّر. والآن أخبر زميلك.» وعُدّ إلى ستين.',
    ),
    placeholder: true,
  },
  {
    id: 'success-criteria',
    stage: 'launch',
    icon: '✓',
    title: t('Success criteria', 'معايير النجاح'),
    what: t(
      'A short checklist of what good work includes, shared at the start, so students can judge work against it instead of against each other.',
      'قائمة قصيرة بما يجب أن يتضمّنه العمل الجيد، تُعرض في بداية الدرس، فيحكم الطلاب على العمل بها لا على بعضهم.',
    ),
    monday: t(
      'Try it Monday: write three "a good paragraph has…" points on the board and ask groups to tick them off.',
      'جرّبها يوم الاثنين: اكتب على السبورة ثلاث نقاط تبدأ بـ«الفقرة الجيدة فيها…» واطلب من المجموعات أن تتحقّق منها.',
    ),
    placeholder: true,
  },
  {
    id: 'flexible-groups',
    stage: 'launch',
    icon: '⊞',
    title: t('Results-based groups', 'مجموعات مرنة حسب النتائج'),
    what: t(
      'Groups suggested from last week\'s results: go further, nearly there, reteach. A starting point for today, not a label for the term.',
      'مجموعات مقترحة من نتائج الأسبوع الماضي: انطلق أبعد، اقتربت، إعادة شرح. نقطة بداية لهذا اليوم، لا تصنيف للفصل كله.',
    ),
    monday: t(
      'Try it Monday: form groups from your last quiz, and move at least one student mid-lesson when they show you more.',
      'جرّبها يوم الاثنين: كوّن المجموعات من آخر اختبار، وانقل طالبًا واحدًا على الأقل أثناء الدرس عندما يُظهر لك أكثر.',
    ),
    placeholder: true,
  },
  {
    id: 'levelled-texts',
    stage: 'launch',
    icon: '≣',
    title: t('Levelled reading texts', 'نصوص قرائية متدرّجة'),
    what: t(
      'The same story or topic written at three reading levels, so every reader works on the same ideas at a level they can actually read.',
      'القصة أو الموضوع نفسه مكتوبًا بثلاثة مستويات قرائية، فيعمل كل قارئ على الأفكار نفسها بمستوى يستطيع قراءته فعلًا.',
    ),
    monday: t(
      'Try it Monday: give three tables the same story at three levels, then discuss it together as one class.',
      'جرّبها يوم الاثنين: أعطِ ثلاث طاولات القصة نفسها بثلاثة مستويات، ثم ناقشوها معًا كصف واحد.',
    ),
    placeholder: true,
  },

  /* ---------------- Facilitate & Synthesise ---------------- */
  {
    id: 'worked-example',
    stage: 'facilitate',
    icon: '✎',
    title: t('Worked example', 'مثال محلول'),
    what: t(
      'A step-by-step model the student follows beside you, then tries alone on the next problem.',
      'نموذج خطوة بخطوة يتابعه الطالب معك، ثم يحاول وحده في المسألة التالية.',
    ),
    monday: t(
      'Try it Monday: model one problem out loud, then hand the student the pen for the next one.',
      'جرّبه يوم الاثنين: حُلّ مسألة واحدة بصوت مسموع، ثم أعطِ الطالب القلم للمسألة التي بعدها.',
    ),
    placeholder: true,
  },
  {
    id: 'explain-thinking',
    stage: 'facilitate',
    icon: '?',
    title: t('Explain-your-thinking prompt', 'سؤال «اشرح لي كيف فكّرت»'),
    what: t(
      'Ask the student to talk through an answer before you correct anything. The real mistake, or the real understanding, shows itself.',
      'اطلب من الطالب أن يشرح إجابته قبل أن تصحّح أي شيء. فيظهر الخطأ الحقيقي، أو الفهم الحقيقي، من تلقاء نفسه.',
    ),
    monday: t(
      'Try it Monday: say "Show me how you got that" before you say "That\'s wrong".',
      'جرّبه يوم الاثنين: قل «أرني كيف وصلت إلى هذا» قبل أن تقول «هذا خطأ».',
    ),
    placeholder: true,
  },
  {
    id: 'team-roles',
    stage: 'facilitate',
    icon: '◎',
    title: t('Team roles', 'أدوار الفريق'),
    what: t(
      'Every student at the table gets a job: explainer, checker, recorder, reporter. Nobody can sit out, and nobody can do it all.',
      'لكل طالب على الطاولة مهمة: الشارح، المدقّق، الكاتب، المتحدّث. لا أحد يجلس متفرّجًا، ولا أحد يقوم بكل شيء.',
    ),
    monday: t(
      'Try it Monday: give the quietest student the reporter role, and the strongest the checker role.',
      'جرّبها يوم الاثنين: أعطِ أهدأ طالب دور المتحدّث، وأعطِ أقوى طالب دور المدقّق.',
    ),
    placeholder: true,
  },
  {
    id: 'small-group-reteach',
    stage: 'facilitate',
    icon: '↺',
    title: t('Small-group reteach', 'إعادة شرح لمجموعة صغيرة'),
    what: t(
      'Pull the students who are stuck to a side table for five minutes while the rest of the class keeps working.',
      'اجمع الطلاب المتعثّرين على طاولة جانبية لخمس دقائق، بينما يواصل بقية الصف العمل.',
    ),
    monday: t(
      'Try it Monday: plan a 5-minute reteach table into the middle of every lesson, even before you know who will need it.',
      'جرّبها يوم الاثنين: خطّط لطاولة إعادة شرح مدتها ٥ دقائق في منتصف كل درس، حتى قبل أن تعرف من سيحتاجها.',
    ),
    placeholder: true,
  },
  {
    id: 'warned-call',
    stage: 'facilitate',
    icon: '◔',
    title: t('Warned call', 'النداء بالاسم مع تنبيه مسبق'),
    what: t(
      'No hands up: you choose who answers, and you tell them a minute or two before. They get time to get ready, and you hear voices beyond the usual five.',
      'دون رفع أيدٍ: أنت من يختار من يجيب، وتنبّهه قبلها بدقيقة أو دقيقتين. فيجد وقتًا ليستعدّ، وتسمع أصواتًا غير الخمسة المعتادين.',
    ),
    monday: t(
      'Try it Monday: walk past a quiet student and whisper "The next question is yours. Talk to your partner first."',
      'جرّبه يوم الاثنين: مُرّ بجانب طالب هادئ وقل له بهدوء «السؤال القادم لك. ناقش زميلك أولًا.»',
    ),
    placeholder: true,
  },
  {
    id: 'show-me-boards',
    stage: 'facilitate',
    icon: '▭',
    title: t('Show-me boards', 'السبورات الصغيرة'),
    what: t(
      'Every student writes an answer on a mini whiteboard and holds it up at the same time. You see the whole class\'s thinking, not just the volunteers\'.',
      'يكتب كل طالب إجابته على سبورة صغيرة ويرفعها الجميع في اللحظة نفسها. فترى تفكير الصف كله، لا تفكير المتطوّعين فقط.',
    ),
    monday: t(
      'Try it Monday: ask one question, say "Boards up on three", and look for the blank boards first.',
      'جرّبها يوم الاثنين: اطرح سؤالًا واحدًا، وقل «ارفعوا السبورات عند ثلاثة»، وابحث عن السبورات الفارغة أولًا.',
    ),
    placeholder: true,
  },
  {
    id: 'own-part',
    stage: 'facilitate',
    icon: '✍',
    title: t('Own-part check', 'التحقّق من الإسهام الفردي'),
    what: t(
      'In group work, each student writes or marks their own part. The group still works together, but you can see what each person can do.',
      'في العمل الجماعي، يكتب كل طالب جزءه أو يحدّده بنفسه. تبقى المجموعة متعاونة، لكنك ترى ما يستطيع كل فرد أن يفعله.',
    ),
    monday: t(
      'Try it Monday: give each group member a different coloured pen, and look at the colours on the page.',
      'جرّبه يوم الاثنين: أعطِ كل فرد في المجموعة قلمًا بلون مختلف، ثم انظر إلى الألوان على الورقة.',
    ),
    placeholder: true,
  },
  {
    id: 'sentence-starters',
    stage: 'facilitate',
    icon: '…',
    title: t('Sentence starters', 'بدايات الجمل'),
    what: t(
      'The first half of a sentence, ready to finish: "I think… because…". It gives students who have the idea but not yet the words a way in.',
      'النصف الأول من جملة جاهز للإكمال: «أعتقد أن… لأن…». يفتح الباب لطالب لديه الفكرة لكنه لا يملك الكلمات بعد.',
    ),
    monday: t(
      'Try it Monday: put three sentence starters on a card on every table before the writing task.',
      'جرّبها يوم الاثنين: ضع ثلاث بدايات جمل على بطاقة فوق كل طاولة قبل مهمة الكتابة.',
    ),
    placeholder: true,
  },
  {
    id: 'hinge-question',
    stage: 'facilitate',
    icon: '⋔',
    title: t('Hinge question', 'سؤال المفصل'),
    what: t(
      'One well-chosen question mid-lesson whose wrong answers show the exact misunderstanding. It tells you in two minutes whether to move on, reteach, or split the class.',
      'سؤال واحد مختار بعناية في منتصف الدرس، تكشف إجاباته الخاطئة سوء الفهم بدقة. يخبرك في دقيقتين هل تتابع، أم تعيد الشرح، أم تقسم الصف.',
    ),
    monday: t(
      'Try it Monday: write one multiple-choice question where each wrong option matches a common mistake, and ask it halfway through.',
      'جرّبه يوم الاثنين: اكتب سؤال اختيار من متعدد يطابق فيه كل خيار خاطئ خطأً شائعًا، واطرحه في منتصف الدرس.',
    ),
    placeholder: true,
  },

  /* ---------------- Extend & Assess ---------------- */
  {
    id: 'extension-task',
    stage: 'extend',
    icon: '↗',
    title: t('Extension task', 'مهمة إثرائية'),
    what: t(
      'A harder problem on the same idea, so finishing early or asking a big question leads to deeper work, not busywork.',
      'مسألة أصعب حول الفكرة نفسها، فيقود الإنهاء المبكر أو السؤال الكبير إلى تعلّم أعمق، لا إلى عمل لملء الوقت.',
    ),
    monday: t(
      'Try it Monday: keep one "go further" problem ready on a card for every lesson.',
      'جرّبها يوم الاثنين: جهّز مسألة «انطلق أبعد» على بطاقة لكل درس.',
    ),
    placeholder: true,
  },
  {
    id: 'targeted-practice',
    stage: 'extend',
    icon: '◆',
    title: t('Targeted practice set', 'تدريبات موجّهة'),
    what: t(
      'Practice chosen for the exact mistake or gap a student has, not a generic worksheet.',
      'تدريبات مختارة للخطأ أو الفجوة التي لدى الطالب بالضبط، لا ورقة عمل عامة.',
    ),
    monday: t(
      'Try it Monday: sort your exit tickets into piles by mistake, then pick one practice set per pile.',
      'جرّبها يوم الاثنين: صنّف بطاقات الخروج في أكوام حسب نوع الخطأ، ثم اختر مجموعة تدريبات لكل كومة.',
    ),
    placeholder: true,
  },
  {
    id: 'question-level',
    stage: 'extend',
    icon: '▦',
    title: t('Question-by-question results', 'النتائج سؤالًا بسؤال'),
    what: t(
      'A view of which questions each student got right, got wrong or left blank. The same score can hide very different stories.',
      'عرض يبيّن الأسئلة التي أجاب عنها كل طالب إجابة صحيحة أو خاطئة أو تركها فارغة. الدرجة نفسها قد تخفي قصصًا مختلفة تمامًا.',
    ),
    monday: t(
      'Try it Monday: before you group by a score, look at the questions behind the three lowest scores.',
      'جرّبها يوم الاثنين: قبل أن تقسّم الطلاب حسب الدرجة، انظر إلى الأسئلة وراء أدنى ثلاث درجات.',
    ),
    placeholder: true,
  },
  {
    id: 'exit-ticket',
    stage: 'extend',
    icon: '⇥',
    title: t('Exit ticket', 'بطاقة الخروج'),
    what: t(
      'One or two questions every student answers alone in the last minutes. It shows what the lesson actually taught, to you and to anyone who asks.',
      'سؤال أو سؤالان يجيب عنهما كل طالب بمفرده في الدقائق الأخيرة. تُظهر ما تعلّمه الطلاب فعلًا في الدرس، لك ولكل من يسأل.',
    ),
    monday: t(
      'Try it Monday: stop five minutes early, ask one question, and sort the answers into three piles before tomorrow.',
      'جرّبها يوم الاثنين: أنهِ الدرس قبل موعده بخمس دقائق، واطرح سؤالًا واحدًا، وصنّف الإجابات في ثلاث أكوام قبل الغد.',
    ),
    placeholder: true,
  },
  {
    id: 'progress-over-time',
    stage: 'extend',
    icon: '↑',
    title: t('Progress over time', 'التقدّم عبر الزمن'),
    what: t(
      'A student\'s work from the start of term beside their work now. Students see their own growth, which a single score cannot show them.',
      'عمل الطالب في بداية الفصل بجانب عمله الآن. فيرى الطالب تقدّمه بنفسه، وهذا ما لا تُظهره درجة واحدة.',
    ),
    monday: t(
      'Try it Monday: keep one piece of work from week one in every student\'s folder, and hand it back to them in week ten.',
      'جرّبها يوم الاثنين: احتفظ بعمل واحد من الأسبوع الأول في ملف كل طالب، وأعده إليه في الأسبوع العاشر.',
    ),
    placeholder: true,
  },
];
