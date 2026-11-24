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
      observation: t('Devices out, but the teacher has paused the lesson at a question most students got wrong. She works it on the board, students retry on the device, and the live view goes from red to mostly green.', 'الأجهزة مفتوحة، لكن المعلّمة أوقفت الدرس عند سؤال أخطأ فيه معظم الطلاب. تحلّه على السبورة، ويعيد الطلاب المحاولة على الجهاز، ويتحوّل العرض المباشر من الأحمر إلى الأخضر غالبًا.'),
      fitsPattern: false,
      finding: t('Purposeful. The platform showed her a misconception and she taught to it, in the moment. This is what the tool is for.', 'هادف. أظهرت لها المنصة مفهومًا خاطئًا فدرّسته في اللحظة. هذا ما وُجدت الأداة من أجله.'),
      hint: t('Did the data change what the teacher did in the next two minutes?', 'هل غيّرت البيانات ما فعلته المعلّمة في الدقيقتين التاليتين؟'),
    },
    {
      id: 'grade-8',
      place: t('Grade 8 Science', 'الصف الثامن، علوم'),
      observation: t('Every student is on the same lesson, at the same point, in silence. Three have finished and are waiting. Two have been on question 4 for nine minutes. The teacher is entering completion into a spreadsheet.', 'كل الطلاب على الدرس نفسه، عند النقطة نفسها، في صمت. انتهى ثلاثة وينتظرون. اثنان على السؤال ٤ منذ تسع دقائق. المعلّم يُدخل الإنجاز في جدول.'),
      fitsPattern: true,
      finding: t('Digital compliance: everyone present, nobody taught. The device replaced the teacher instead of informing him.', 'امتثال رقمي: الجميع حاضر ولا أحد يُدرَّس. حلّ الجهاز محل المعلّم بدل أن يُعلمه.'),
      hint: t('Nine minutes on one question. Who noticed?', 'تسع دقائق على سؤال واحد. من لاحظ؟'),
    },
    {
      id: 'writing',
      place: t('Grade 10 English', 'الصف العاشر، إنجليزية'),
      observation: t('Students draft an argument by hand, then ask the AI to attack it. They revise. Then each student reads one sentence aloud and says what the AI got wrong about their point.', 'يكتب الطلاب حجّة بخط اليد، ثم يطلبون من الذكاء الاصطناعي مهاجمتها. يراجعون. ثم يقرأ كل طالب جملة بصوت مرتفع ويقول ما أخطأ فيه الذكاء الاصطناعي بشأن فكرته.'),
      fitsPattern: false,
      finding: t('Not the pattern. The thinking stays with the student at both ends; the AI is a sparring partner, not a ghostwriter.', 'ليس النمط. يبقى التفكير مع الطالب في الطرفين؛ الذكاء الاصطناعي شريك تدريب لا كاتب خفي.'),
      hint: t('Who owns the argument at the end of the lesson?', 'من يمتلك الحجّة في نهاية الدرس؟'),
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
      { id: 'too-much-tech', label: t('Too much screen time', 'وقت شاشة مفرط') },
      { id: 'compliance', label: t('Digital compliance — technology is visible and completion is high, but learning evidence isn’t being used', 'امتثال رقمي — التقنية مرئية والإنجاز مرتفع، لكن أدلة التعلّم لا تُستخدم') },
      { id: 'training', label: t('Teachers don’t know the platform well enough', 'لا يعرف المعلّمون المنصة جيدًا بما يكفي') },
      { id: 'ai', label: t('AI is being misused', 'يُساء استخدام الذكاء الاصطناعي') },
    ],
    correctId: 'compliance',
    hint: t('The Grade 5 teacher had the same screen time and the same platform. What did she do differently?', 'كان لدى معلّمة الصف الخامس وقت الشاشة نفسه والمنصة نفسها. ما الذي فعلته بشكل مختلف؟'),
  },
  assessRisk: {
    prompt: t('Across the school, how serious is this pattern?', 'على مستوى المدرسة، ما مدى خطورة هذا النمط؟'),
    correctId: 'lethal',
    hint: t('The whole system — tour, classroom, meeting — is optimising for the number that says nothing about learning, and the showcase status makes it self-reinforcing. Institutional lethal mutation.', 'النظام كله — الجولة والصف والاجتماع — يُحسّن الرقم الذي لا يقول شيئًا عن التعلّم، وصفة النموذج تجعله يعزّز نفسه. تحوّر قاتل مؤسسي.'),
  },
  coaching: {
    prompt: t('The school is proud and the number is public. What is the one move with the greatest impact?', 'المدرسة فخورة والرقم معلن. ما الخطوة الواحدة ذات الأثر الأكبر؟'),
    options: [
      { id: 'cap', label: t('Cap device time per lesson', 'حدّد سقفًا لوقت الأجهزة في كل درس') },
      { id: 'second-number', label: t('Put a second number beside completion everywhere it appears — the lesson-check score — and make the data meeting open three student attempts before it looks at any percentage', 'ضع رقمًا ثانيًا بجانب الإنجاز أينما ظهر — درجة اختبار الدرس — واجعل اجتماع البيانات يفتح ثلاث محاولات طلاب قبل أن ينظر إلى أي نسبة') },
      { id: 'workshop', label: t('Run an Alef refresher workshop for all staff', 'نظّم ورشة تنشيطية عن ألف لكل الهيئة') },
      { id: 'tour', label: t('Stop the visitor tours until completion is explained properly', 'أوقف جولات الزوار حتى يُشرح الإنجاز بشكل صحيح') },
    ],
    correctId: 'second-number',
    hint: t('You can’t remove the number the school is proud of. What can you put next to it?', 'لا يمكنك إزالة الرقم الذي تفخر به المدرسة. ما الذي يمكنك وضعه بجانبه؟'),
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
