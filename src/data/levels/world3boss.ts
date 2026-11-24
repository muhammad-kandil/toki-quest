import sceneImg from '../../assets/scenes/classroom-2-activity.jpg';
import type { WorldBossDefinition } from '../worldBossTypes';
import { t } from '../../i18n/types';

/**
 * World 3 boss — The Digital Illusion.
 * "Technology is visible. Students are active. Completion is high.
 *  But learning evidence is unclear."
 * Distinguish purposeful digital learning from digital compliance.
 */
export const WORLD_3_BOSS: WorldBossDefinition = {
  id: 35,
  worldId: 'alef-in-action',
  title: t('The Digital Illusion', 'الوهم الرقمي'),
  theme: t('Digital ≠ Learning', 'رقمي ≠ تعلّم'),
  subject: t('World Challenge', 'تحدّي العالم'),
  sceneImage: sceneImg,
  scenario: t(
    'The school is a showcase for Alef. Every classroom has devices out, every teacher has the dashboard open, completion is in the high nineties, and visitors are brought here to see technology done right. Toki is one of those visitors — and spends the day asking, in each room, a quieter question: is the technology carrying the thinking, or carrying it away?',
    'المدرسة نموذج يُعرض لمنصة ألف. في كل صف أجهزة مفتوحة، ولدى كل معلّم لوحة البيانات مفتوحة، والإنجاز في التسعينيات العليا، ويُؤتى بالزوار إلى هنا ليروا التقنية في أحسن صورها. توكي أحد هؤلاء الزوار — ويقضي اليوم يسأل في كل غرفة سؤالًا أهدأ: هل تحمل التقنية التفكير، أم تحمله بعيدًا؟',
  ),
  scenes: [
    {
      id: 'tour',
      place: t('The welcome tour', 'جولة الاستقبال'),
      observation: t('The principal walks Toki past six classrooms in four minutes. "Ninety-seven percent completion, school-wide." Nobody mentions a check score, a misconception, or a student.', 'يمرّ المدير بتوكي على ستة صفوف في أربع دقائق. «إنجاز سبعة وتسعون بالمئة على مستوى المدرسة.» لا أحد يذكر درجة اختبار أو مفهومًا خاطئًا أو طالبًا.'),
      fitsPattern: true,
      finding: t('Completion as the school’s identity. The metric that measures activity has become the one that defines success.', 'الإنجاز بوصفه هوية المدرسة. المقياس الذي يقيس النشاط أصبح هو الذي يعرّف النجاح.'),
      hint: t('Listen to which numbers get said out loud.', 'أنصت إلى الأرقام التي تُقال بصوت مرتفع.'),
    },
    {
      id: 'grade-5',
      place: t('Grade 5 Math', 'الصف الخامس، رياضيات'),
      observation: t('Devices half-closed, the Alef lesson stopped at question 6 with twenty minutes left. Completion for this class will fall below 80% today. The teacher is at the board with a different example, arguing with three students about why their answer is wrong; the rest are shouting corrections. Then everyone retries on the device.', 'الأجهزة نصف مغلقة، ودرس ألف متوقف عند السؤال ٦ وقد بقيت عشرون دقيقة. سينخفض إنجاز هذا الصف اليوم دون ٨٠٪. المعلّمة عند السبورة بمثال مختلف، تجادل ثلاثة طلاب في سبب خطأ إجابتهم؛ والبقية يصيحون بالتصحيحات. ثم يعيد الجميع المحاولة على الجهاز.'),
      fitsPattern: false,
      finding: t('Loud, unfinished, and the healthiest room on the tour. The platform showed her a misconception and she stopped the lesson to teach to it. Today’s completion number will be the lowest in the school — and the most honest.', 'صاخب وغير مكتمل وأسلم غرفة في الجولة. أظهرت لها المنصة فهمًا خاطئًا فأوقفت الدرس لتدرّسه. سيكون رقم الإنجاز اليوم الأدنى في المدرسة — والأصدق.'),
      hint: t('Noise and an unfinished lesson are what the tour would notice. Ask what the live view showed her, and what she did in the next two minutes.', 'الضجيج والدرس غير المكتمل هما ما ستلاحظه الجولة. اسأل ماذا أظهر لها العرض المباشر، وماذا فعلت في الدقيقتين التاليتين.'),
    },
    {
      id: 'grade-8',
      place: t('Grade 8 Science', 'الصف الثامن، علوم'),
      observation: t('The calmest room in the school and the principal’s favourite. Every student on the lesson, headphones on, 100% completion by the bell three days running. The teacher circulates with a tablet showing the live view and nods at green cells. Two students have been on question 4 for nine minutes; their cells are still white.', 'أهدأ غرفة في المدرسة والمفضّلة لدى المدير. كل الطلاب في الدرس، بسماعات الرأس، وإنجاز ١٠٠٪ قبل الجرس ثلاثة أيام متتالية. يتجوّل المعلّم بجهاز لوحي يعرض العرض المباشر ويومئ للخانات الخضراء. طالبان على السؤال ٤ منذ تسع دقائق؛ وخانتاهما ما زالتا بيضاوين.'),
      fitsPattern: true,
      finding: t('Digital compliance: everyone present, nobody taught. The device replaced the teacher instead of informing him.', 'امتثال رقمي: الجميع حاضر ولا أحد يُدرَّس. حلّ الجهاز محل المعلّم بدل أن يُعلمه.'),
      hint: t('The live view is open and the teacher is circulating — that is what the Grade 5 teacher did too. What did each of them do when a cell was not green?', 'العرض المباشر مفتوح والمعلّم يتجوّل — هذا ما فعلته معلّمة الصف الخامس أيضًا. ماذا فعل كل منهما حين لم تكن الخانة خضراء؟'),
    },
    {
      id: 'writing',
      place: t('Grade 10 English', 'الصف العاشر، إنجليزية'),
      observation: t('Every screen shows an AI chat, and the teacher is encouraging it: "Ask it to tear your argument apart." Half the paragraphs on screen were written by the tool. Toki reads one student’s notebook: a hand-drafted argument from the start of the lesson, now covered in crossings-out, and a line at the bottom — "the AI is wrong about my second point because…".', 'تعرض كل الشاشات محادثة مع الذكاء الاصطناعي، والمعلّمة تشجّع ذلك: «اطلبوا منه أن يمزّق حجّتكم.» نصف الفقرات على الشاشات كتبتها الأداة. يقرأ توكي دفتر طالبة: حجّة مكتوبة بخط اليد من بداية الدرس، مغطاة الآن بالشطب، وسطر في الأسفل — «الذكاء الاصطناعي مخطئ في نقطتي الثانية لأن…».'),
      fitsPattern: false,
      finding: t('It looks like the AI classroom from World 3 and it is the opposite. The argument was the student’s before the tool saw it and is still hers after; the tool is a sparring partner, and the crossings-out are the learning.', 'يبدو كصف الذكاء الاصطناعي في العالم الثالث وهو عكسه تمامًا. كانت الحجّة للطالبة قبل أن تراها الأداة وما زالت لها بعدها؛ الأداة شريك تدريب، والشطب هو التعلّم.'),
      hint: t('The screens show the tool. The notebook shows the sequence. Who had the argument first, and who has it at the end?', 'تُظهر الشاشات الأداة. ويُظهر الدفتر التسلسل. من كانت لديه الحجّة أولًا، ومن يملكها في النهاية؟'),
    },
    {
      id: 'data-meeting',
      place: t('Data meeting, 3pm', 'اجتماع البيانات، ٣ مساءً'),
      observation: t('Heads of department compare completion by class. The lowest class is 91%; its teacher is asked to "lift it". Nobody opens a lesson check. The meeting ends in twelve minutes.', 'يقارن رؤساء الأقسام الإنجاز حسب الصف. أدنى صف ٩١٪؛ يُطلب من معلّمه «رفعه». لا أحد يفتح اختبار درس. ينتهي الاجتماع خلال اثنتي عشرة دقيقة.'),
      fitsPattern: true,
      finding: t('The system coaches the wrong number. A teacher is being pushed toward completion — the exact drift Toki saw in Grade 8.', 'يدرّب النظام الرقم الخطأ. يُدفَع المعلّم نحو الإنجاز — الانحراف نفسه الذي رآه توكي في الصف الثامن.'),
      hint: t('What is the teacher being asked to improve — and what would improving it cost?', 'ما الذي يُطلب من المعلّم تحسينه — وما ثمن تحسينه؟'),
    },
  ],
  namePattern: {
    prompt: t('Three scenes fit the pattern; two are what the platform is for. Name the pattern.', 'ثلاثة مشاهد تطابق النمط؛ واثنان هما ما وُجدت المنصة من أجله. سمِّ النمط.'),
    options: [
      { id: 'monitoring', label: t('Teachers monitor the platform but do not intervene when it shows a problem', 'يراقب المعلّمون المنصة لكنهم لا يتدخلون حين تُظهر مشكلة') },
      { id: 'pace', label: t('The platform sets one pace for every student and the fast and the stuck are both invisible', 'تضع المنصة إيقاعًا واحدًا لكل طالب فيختفي السريع والعالق معًا') },
      { id: 'compliance', label: t('Technology is visible and completion is high, but learning evidence is not being used', 'التقنية مرئية والإنجاز مرتفع، لكن أدلة التعلّم لا تُستخدم') },
      { id: 'identity', label: t('The school’s reputation depends on a number teachers cannot afford to lower', 'تعتمد سمعة المدرسة على رقم لا يستطيع المعلّمون خفضه') },
    ],
    correctId: 'compliance',
    hint: t('Monitoring without intervening is Grade 8 alone; the pace problem is one room; the reputation is the cause, not the pattern. What do the tour, Grade 8 and the data meeting all do with the evidence they have?', 'المراقبة دون تدخل هي الصف الثامن وحده؛ ومشكلة الإيقاع غرفة واحدة؛ والسمعة هي السبب لا النمط. ماذا تفعل الجولة والصف الثامن واجتماع البيانات جميعًا بالدليل الذي بين أيديهم؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('The whole system — tour, classroom, meeting — is optimising for the number that says nothing about learning, and the showcase status makes it self-reinforcing. Institutional lethal mutation.', 'النظام كله — الجولة والصف والاجتماع — يُحسّن الرقم الذي لا يقول شيئًا عن التعلّم، وصفة النموذج تجعله يعزّز نفسه. تحوّر قاتل مؤسسي.'),
  },
  coaching: {
    prompt: t('The school is proud and the number is public. What is the one move with the greatest impact?', 'المدرسة فخورة والرقم معلن. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'model', label: t('Make the Grade 5 teacher’s "stop and reteach" the expected routine across the school whenever a cell goes red', 'اجعل «التوقف وإعادة التدريس» لدى معلّمة الصف الخامس الروتين المتوقع في المدرسة حين تحمرّ خانة') },
      { id: 'target', label: t('Change the completion target from 97% to 85% so teachers have room to stop and teach', 'غيّر هدف الإنجاز من ٩٧٪ إلى ٨٥٪ ليجد المعلّمون مجالًا للتوقف والتدريس') },
      { id: 'coach', label: t('Coach the Grade 8 teacher and the heads of department on reading the live view', 'درّب معلّم الصف الثامن ورؤساء الأقسام على قراءة العرض المباشر') },
      { id: 'second-number', label: t('Lesson-check score beside completion everywhere it appears; three attempts opened before any percentage', 'ضع درجة اختبار الدرس بجانب الإنجاز أينما ظهر، وافتح ثلاث محاولات قبل أي نسبة') },
    ],
    correctId: 'second-number',
    hint: t('A lower target is still a completion target. A new routine and better reading of the live view both depend on teachers choosing to act. Which move changes what the school counts as success — on the tour, in Grade 8 and in the meeting at once?', 'الهدف الأدنى ما زال هدف إنجاز. الروتين الجديد وقراءة أفضل للعرض المباشر كلاهما يعتمد على اختيار المعلّمين أن يتصرّفوا. أي خطوة تغيّر ما تعدّه المدرسة نجاحًا — في الجولة والصف الثامن والاجتماع دفعة واحدة؟'),
  },
  reveal: {
    whatDrifted: t(
      'Technology became the evidence of good teaching instead of a window onto learning. Completion — a measure of activity — was promoted to a measure of success, and the whole school learned to optimise for it.',
      'أصبحت التقنية دليلًا على التدريس الجيد بدل أن تكون نافذة على التعلّم. رُقّي الإنجاز — وهو مقياس نشاط — إلى مقياس نجاح، وتعلّمت المدرسة كلها تحسينه.',
    ),
    whyItHappened: t(
      'Completion is instant, comparable, and flattering. It travels easily up to leaders and out to visitors. The lesson check is slower and less kind — so the showcase was built on the easier number.',
      'الإنجاز فوري وقابل للمقارنة ومُطرٍ. ينتقل بسهولة إلى القادة والزوار. أما اختبار الدرس فأبطأ وأقل لطفًا — فبُني النموذج على الرقم الأسهل.',
    ),
    howToRestore: t(
      'Distinguish purposeful digital learning from digital compliance by changing what the system looks at: every completion figure travels with its check score, and every data conversation starts inside a student’s attempt. The Grade 5 and Grade 10 rooms show the school it already knows how.',
      'ميّز التعلّم الرقمي الهادف من الامتثال الرقمي بتغيير ما ينظر إليه النظام: كل رقم إنجاز يسافر مع درجة اختباره، وكل حديث عن البيانات يبدأ من داخل محاولة طالب. يُري صفا الخامس والعاشر المدرسةَ أنها تعرف الطريقة أصلًا.',
    ),
    finalWord: t(
      'Two of the five rooms were doing it right, with the same tools and the same dashboards. The technology was never the drift. What people were asked to look at was.',
      'كان اثنان من الغرف الخمس يفعلان الصواب، بالأدوات نفسها واللوحات نفسها. لم تكن التقنية هي الانحراف قط. بل ما طُلب من الناس أن ينظروا إليه.',
    ),
  },
  points: { scenes: 40, pattern: 30, risk: 20, coaching: 40 },
  badgeTriggers: ['purpose-protector', 'mutation-hunter'],
};
