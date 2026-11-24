/**
 * FINAL WORLD — The Master DLIS
 * Theme: From Classroom Observation to Coaching Judgement
 *
 * One school, six contexts, seven kinds of evidence. The school is
 * visibly committed: teachers use Alef, leaders review reports,
 * students complete lessons, classrooms look active. Learning impact
 * is uneven. The player must read each context, then decide where
 * coaching will change the most — which is not the same as where the
 * biggest problem is.
 */
import sceneMath from '../../assets/scenes/classroom-3-output.jpg';
import sceneScience from '../../assets/scenes/classroom-2-activity.jpg';
import sceneEnglish from '../../assets/scenes/classroom-4-assessment.jpg';
import sceneArabic from '../../assets/scenes/classroom-1-talkative.jpg';
import sceneKg from '../../assets/scenes/classroom-5-gamification.jpg';
import sceneLeaders from '../../assets/scenes/classroom-6-perfect.jpg';
import type { SchoolVisitDefinition } from '../schoolVisitTypes';
import { t } from '../../i18n/types';

export const SCHOOL_VISIT: SchoolVisitDefinition = {
  id: 85,
  worldId: 'master-dlis',
  title: t('The School Visit', 'زيارة المدرسة'),
  theme: t('Where Will Coaching Change the Most?', 'أين سيغيّر التدريب أكثر؟'),
  subject: t('Final Challenge', 'التحدي الأخير'),
  sceneImage: sceneLeaders,
  scenario: t(
    'Toki’s last visit is a whole school. It is, by every visible measure, committed: teachers use Alef daily, leaders review the reports every week, students complete their lessons, and every classroom Toki passes looks active. The principal is proud and a little puzzled — because learning impact is uneven, and nobody can say why. Toki has one day, six doors, and a folder of evidence behind each one.',
    'زيارة توكي الأخيرة مدرسة كاملة. وهي، بكل مقياس مرئي، ملتزمة: يستخدم المعلّمون «ألف» يوميًا، ويراجع القادة التقارير كل أسبوع، ويكمل الطلاب دروسهم، وكل صف يمرّ به توكي يبدو نشطًا. المدير فخور وحائر قليلًا — لأن أثر التعلّم متفاوت، ولا أحد يستطيع القول لماذا. لدى توكي يوم واحد، وستة أبواب، وملف من الأدلة خلف كل باب.',
  ),
  contexts: [
    {
      id: 'math',
      name: t('Mathematics', 'الرياضيات'),
      tag: t('Grade 7 · 96% completion', 'الصف السابع · إكمال ٩٦٪'),
      sceneImage: sceneMath,
      evidence: [
        { kind: 'alefData', title: t('Alef report', 'تقرير «ألف»'), body: t('Lesson completion 96%. Average lesson-quiz score 82%. The highest usage in the school; the principal’s favourite slide.', 'إكمال الدروس ٩٦٪. متوسط درجة اختبار الدرس ٨٢٪. أعلى استخدام في المدرسة؛ الشريحة المفضّلة لدى المدير.') },
        { kind: 'observation', title: t('Observation', 'ملاحظة'), body: t('Students complete the Alef lesson in silence for twenty minutes. Then the teacher re-teaches the same content to the whole class from the board, as if the twenty minutes had not happened.', 'يكمل الطلاب درس «ألف» بصمت عشرين دقيقة. ثم يعيد المعلّم تدريس المحتوى نفسه للصف كله من السبورة، كأن الدقائق العشرين لم تحدث.') },
        { kind: 'assessment', title: t('End-of-unit checkpoint', 'تقويم نهاية الوحدة'), body: t('Class average 54%. The question types match the Alef lessons closely.', 'متوسط الصف ٥٤٪. أنواع الأسئلة تطابق دروس «ألف» بشكل وثيق.') },
      ],
      impact: {
        correctId: 'drifted',
        hint: t('82% on the lesson quizzes, 54% a week later. Where did the 28 points go — and what happened in the lesson after the platform?', '٨٢٪ في اختبارات الدروس، و٥٤٪ بعد أسبوع. أين ذهبت النقاط الـ٢٨ — وماذا حدث في الدرس بعد المنصة؟'),
        finding: t('Alef is run, then ignored. The platform produces data the teacher never reads and completion the leaders celebrate. Two lessons happen in parallel and neither learns from the other.', 'تُشغَّل «ألف» ثم تُتجاهل. تنتج المنصة بيانات لا يقرؤها المعلّم وإكمالًا يحتفل به القادة. يحدث درسان بالتوازي ولا يتعلّم أحدهما من الآخر.'),
      },
    },
    {
      id: 'science',
      name: t('Science', 'العلوم'),
      tag: t('Grade 8 · 71% completion', 'الصف الثامن · إكمال ٧١٪'),
      sceneImage: sceneScience,
      evidence: [
        { kind: 'leadership', title: t('Leadership note', 'ملاحظة القيادة'), body: t('"Science usage is below target (71%). Teacher reminded twice. Please prioritise."', '«استخدام العلوم دون الهدف (٧١٪). ذُكّر المعلّم مرتين. يُرجى إعطاء الأولوية.»') },
        { kind: 'observation', title: t('Observation', 'ملاحظة'), body: t('Students predict, test, and argue from their results. The teacher assigns Alef lessons only where the diagnostic showed a gap, and skips the rest on purpose.', 'يتنبأ الطلاب ويختبرون ويجادلون من نتائجهم. يسند المعلّم دروس «ألف» فقط حيث أظهر التشخيص فجوة، ويتخطى البقية عمدًا.') },
        { kind: 'studentVoice', title: t('Student responses', 'إجابات الطلاب'), body: t('"We only do the Alef ones we got wrong on the check. The rest we do with Mr Khalid." Written explanations cite evidence from their own experiments.', '«نعمل فقط دروس «ألف» التي أخطأنا فيها في الفحص. والبقية نعملها مع الأستاذ خالد.» الشروح المكتوبة تستشهد بأدلة من تجاربهم.') },
      ],
      impact: {
        correctId: 'linked',
        hint: t('Lower usage is the only thing wrong here — and it is lower because the platform is being used for a reason. What does the student work show?', 'الاستخدام الأقل هو الشيء الوحيد الخاطئ هنا — وهو أقل لأن المنصة تُستخدم لسبب. ماذا يُظهر عمل الطلاب؟'),
        finding: t('The "problem" department is the healthiest one in the building. Alef is a diagnostic-driven tool here, not a schedule. The 71% is a sign of judgement, not neglect.', 'القسم «المشكلة» هو الأسلم في المبنى. «ألف» هنا أداة يقودها التشخيص، لا جدولًا. الـ٧١٪ علامة حكم، لا إهمال.'),
      },
    },
    {
      id: 'english',
      name: t('English', 'اللغة الإنجليزية'),
      tag: t('Grade 6 · strong planning', 'الصف السادس · تخطيط قوي'),
      sceneImage: sceneEnglish,
      evidence: [
        { kind: 'planning', title: t('Teacher planning', 'تخطيط المعلّمة'), body: t('Detailed weekly plans. Objectives, success criteria, a feedback slot in every lesson. Among the best plans Toki has seen.', 'خطط أسبوعية مفصّلة. أهداف، معايير نجاح، خانة تغذية راجعة في كل درس. من أفضل الخطط التي رآها توكي.') },
        { kind: 'studentWork', title: t('Student work', 'عمل الطلاب'), body: t('Three drafts of the same essay. Detailed written feedback on each. The same three errors appear in all three drafts.', 'ثلاث مسودات للمقال نفسه. تغذية راجعة مكتوبة مفصّلة على كل منها. الأخطاء الثلاثة نفسها تظهر في المسودات الثلاث.') },
        { kind: 'observation', title: t('Observation', 'ملاحظة'), body: t('Feedback is returned; students read it, put the books away, and start the next task. No time is given to act on it.', 'تُعاد التغذية الراجعة؛ يقرؤها الطلاب، ويضعون الدفاتر جانبًا، ويبدؤون المهمة التالية. لا يُعطى وقت للعمل بها.') },
      ],
      impact: {
        correctId: 'unverified',
        hint: t('Everything is planned and delivered. Look at the three drafts: did the feedback change anything?', 'كل شيء مخطط ومنفَّذ. انظر إلى المسودات الثلاث: هل غيّرت التغذية الراجعة شيئًا؟'),
        finding: t('Practice is intact and impact is unproven: the feedback loop is open on both ends. One change — ten minutes to act on feedback — would close it. The teacher is already doing the hard part.', 'الممارسة سليمة والأثر غير مثبت: حلقة التغذية الراجعة مفتوحة من الطرفين. تغيير واحد — عشر دقائق للعمل بالتغذية الراجعة — سيغلقها. المعلّمة تقوم بالجزء الصعب بالفعل.'),
      },
    },
    {
      id: 'arabic',
      name: t('Arabic', 'اللغة العربية'),
      tag: t('Grade 9 · checkpoint +11', 'الصف التاسع · تقويم +١١'),
      sceneImage: sceneArabic,
      evidence: [
        { kind: 'observation', title: t('Observation', 'ملاحظة'), body: t('A text is read; students argue about the author’s choices in pairs, then the teacher cold-calls six students for their reasoning. Every answer is pushed: "and why would that matter?"', 'يُقرأ نص؛ يتجادل الطلاب حول اختيارات الكاتب في ثنائيات، ثم تنادي المعلّمة ستة طلاب عشوائيًا لتعليلهم. كل إجابة تُدفع: «ولماذا سيهم ذلك؟»') },
        { kind: 'assessment', title: t('Two checkpoints', 'تقويمان'), body: t('Term 1: 61%. Term 2: 72%. The gain is largest among the students who scored lowest in Term 1.', 'الفصل الأول: ٦١٪. الفصل الثاني: ٧٢٪. المكسب أكبر بين الطلاب الأدنى في الفصل الأول.') },
        { kind: 'studentVoice', title: t('Student responses', 'إجابات الطلاب'), body: t('"I know what I’m working on: using evidence from the text, not just my opinion. She tells us every week where we are."', '«أعرف فيمَ أعمل: استخدام الدليل من النص، لا رأيي فقط. تخبرنا كل أسبوع أين نحن.»') },
      ],
      impact: {
        correctId: 'linked',
        hint: t('Practice, student voice and assessment all point the same direction. What direction is that?', 'الممارسة وصوت الطالب والتقويم كلها تشير في الاتجاه نفسه. ما ذلك الاتجاه؟'),
        finding: t('Linked, visibly. The students can name what they are getting better at, and the checkpoints agree. Toki’s job here is to find out what she is doing and get it to the other five doors.', 'مرتبط، بشكل مرئي. يستطيع الطلاب تسمية ما يتحسّنون فيه، والتقويمات توافق. مهمة توكي هنا أن يعرف ما تفعله وينقله إلى الأبواب الخمسة الأخرى.'),
      },
    },
    {
      id: 'kg',
      name: t('Kindergarten', 'رياض الأطفال'),
      tag: t('KG2 · busy centres', 'الروضة الثانية · مراكز مشغولة'),
      sceneImage: sceneKg,
      evidence: [
        { kind: 'observation', title: t('Observation', 'ملاحظة'), body: t('Five learning centres rotate on a ten-minute timer. Children are busy, cheerful and compliant. The bell moves them whether or not they have finished.', 'خمسة مراكز تعلّم تتناوب على مؤقّت عشر دقائق. الأطفال مشغولون ومرحون ومنضبطون. ينقلهم الجرس سواء أنهوا أم لا.') },
        { kind: 'planning', title: t('Teacher planning', 'تخطيط المعلّمة'), body: t('The same five centres every week this term. The plan lists activities; it does not say what any child should be able to do by Thursday.', 'المراكز الخمسة نفسها كل أسبوع هذا الفصل. تسرد الخطة الأنشطة؛ ولا تقول ما ينبغي أن يستطيع أي طفل فعله بحلول الخميس.') },
        { kind: 'studentWork', title: t('Learning records', 'سجلات التعلّم'), body: t('Photos of happy children at each centre. No note of what any child can now do that they could not in September.', 'صور لأطفال سعداء في كل مركز. لا ملاحظة عمّا يستطيع أي طفل فعله الآن ولم يستطعه في سبتمبر.') },
      ],
      impact: {
        correctId: 'unverified',
        hint: t('Busy, happy, well-run. Is there any evidence of what was learned — or only of what was done?', 'مشغول، سعيد، منظّم جيدًا. هل يوجد أي دليل على ما تُعلِّم — أم فقط على ما نُفِّذ؟'),
        finding: t('Activity without a record of impact. Nothing here is broken, and nothing here can show it works. A simple "can now / not yet" record per child would turn the busiest room in the school into evidence.', 'نشاط دون سجل للأثر. لا شيء هنا معطّل، ولا شيء هنا يستطيع إثبات أنه يعمل. سجل بسيط «يستطيع الآن / ليس بعد» لكل طفل سيحوّل أكثر غرفة مشغولة في المدرسة إلى دليل.'),
      },
    },
    {
      id: 'leadership',
      name: t('Leadership Team', 'فريق القيادة'),
      tag: t('Weekly data meeting', 'اجتماع البيانات الأسبوعي'),
      sceneImage: sceneLeaders,
      evidence: [
        { kind: 'leadership', title: t('Leadership priorities', 'أولويات القيادة'), body: t('This term’s three priorities: 1. Alef usage above 85% in every class. 2. Weekly completion reports per teacher. 3. Visible routines in every room.', 'أولويات هذا الفصل الثلاث: ١. استخدام «ألف» فوق ٨٥٪ في كل صف. ٢. تقارير إكمال أسبوعية لكل معلّم. ٣. روتين مرئي في كل غرفة.') },
        { kind: 'observation', title: t('The data meeting', 'اجتماع البيانات'), body: t('Forty minutes. Completion per teacher is read out; Science is asked to explain 71%; Mathematics is congratulated on 96%. Learning is not mentioned once.', 'أربعون دقيقة. تُقرأ نسب الإكمال لكل معلّم؛ يُطلب من العلوم تفسير الـ٧١٪؛ تُهنّأ الرياضيات على الـ٩٦٪. لا يُذكر التعلّم ولو مرة.') },
        { kind: 'alefData', title: t('The dashboard', 'لوحة البيانات'), body: t('Usage and completion by class, by week, by teacher. The checkpoint results exist in another system and are not on any slide.', 'الاستخدام والإكمال حسب الصف والأسبوع والمعلّم. نتائج التقويمات موجودة في نظام آخر وليست على أي شريحة.') },
      ],
      impact: {
        correctId: 'drifted',
        hint: t('What does this school measure, reward, and chase? Now look back at Mathematics and Science and ask who taught them to behave that way.', 'ما الذي تقيسه هذه المدرسة وتكافئه وتلاحقه؟ انظر الآن إلى الرياضيات والعلوم واسأل مَن علّمهما التصرّف بهذه الطريقة.'),
        finding: t('Leadership has mutated into usage management. It congratulates the department that learns least and pressures the one that learns most, because it measures activity and never asks about learning. Every classroom drift in this school is downstream of this room.', 'تحوّلت القيادة إلى إدارة للاستخدام. تهنّئ القسم الذي يتعلّم أقل وتضغط على القسم الذي يتعلّم أكثر، لأنها تقيس النشاط ولا تسأل عن التعلّم أبدًا. كل انحراف صفّي في هذه المدرسة يقع في مجرى هذه الغرفة.'),
      },
    },
  ],
  prioritise: {
    prompt: t('Six contexts, one coach, one term. Where should Toki’s coaching go first — where will it change the most?', 'ستة سياقات، مدرّب واحد، فصل واحد. أين ينبغي أن يذهب تدريب توكي أولًا — أين سيغيّر أكثر؟'),
    correctId: 'leadership',
    hint: t('Ask: which issue, if it changed, would change the others? Coaching Mathematics fixes one room until the next usage report. Coaching Science fixes nothing. What is upstream of all of them?', 'اسأل: أي قضية، لو تغيّرت، ستغيّر الأخريات؟ تدريب الرياضيات يصلح غرفة واحدة حتى تقرير الاستخدام التالي. تدريب العلوم لا يصلح شيئًا. ما الذي يقع في أعلى مجرى الجميع؟'),
    rationale: t('The leadership team is not the biggest problem in the building — Mathematics is. But Mathematics is doing exactly what leadership rewards. Change what the school measures and asks about, and Mathematics, English and Kindergarten start to move on their own. Coach the room that teaches the other rooms how to behave.', 'فريق القيادة ليس أكبر مشكلة في المبنى — الرياضيات هي. لكن الرياضيات تفعل تمامًا ما تكافئه القيادة. غيّر ما تقيسه المدرسة وتسأل عنه، فتبدأ الرياضيات والإنجليزية والروضة بالتحرك من تلقاء نفسها. درّب الغرفة التي تعلّم الغرف الأخرى كيف تتصرّف.'),
  },
  finalMission: {
    prompt: t('Toki sits down with the principal. What should he ask the school to prioritise?', 'يجلس توكي مع المدير. ما الذي ينبغي أن يطلب من المدرسة إعطاءه الأولوية؟'),
    options: [
      { id: 'link', label: t('The link between practice and learning', 'الرابط بين الممارسة والتعلّم') },
      { id: 'usage', label: t('The frequency of platform usage', 'تكرار استخدام المنصة') },
      { id: 'routines', label: t('The visibility of classroom routines', 'وضوح الروتين الصفّي') },
      { id: 'completed', label: t('The number of completed lessons', 'عدد الدروس المكتملة') },
    ],
    correctId: 'link',
    hint: t('Three of these are already the school’s priorities — and they produced the Mathematics classroom. Which one is missing?', 'ثلاثة من هذه هي بالفعل أولويات المدرسة — وقد أنتجت صف الرياضيات. أيّها الناقص؟'),
  },
  finalResponse: t(
    'Effective implementation is not measured by activity alone. It is measured by whether practices improve learning, support students, and preserve the original instructional purpose.',
    'لا يُقاس التنفيذ الفعّال بالنشاط وحده. يُقاس بما إذا كانت الممارسات تحسّن التعلّم، وتدعم الطلاب، وتحفظ الغاية التعليمية الأصلية.',
  ),
  finalMessage: [
    t('Congratulations. You have completed Toki’s Coaching Quest.', 'تهانينا. لقد أكملت رحلة توكي التدريبية.'),
    t('As a DLIS, your role is not only to observe what teachers are doing. Your role is to uncover what students are learning.', 'بصفتك مشرفًا، دورك ليس فقط ملاحظة ما يفعله المعلّمون. دورك هو الكشف عمّا يتعلّمه الطلاب.'),
    t('The most dangerous instructional drifts are not always visible. They often preserve the appearance of effective teaching while quietly changing its purpose.', 'أخطر الانحرافات التعليمية ليست دائمًا مرئية. غالبًا ما تحفظ مظهر التدريس الفعّال بينما تغيّر غايته بهدوء.'),
    t('Spot the drift. Protect the purpose. Prevent the lethal mutation.', 'اكتشف الانحراف. احمِ الغاية. امنع التحوّر القاتل.'),
  ],
  points: { contexts: 60, priority: 25, mission: 15 },
  badgeTriggers: ['master-dlis'],
};
