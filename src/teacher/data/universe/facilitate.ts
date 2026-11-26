/**
 * Facilitate & Synthesise scenarios F01–F06 (mid-lesson pool). F03 is a
 * reconvergence node: its class-view profiles stay coherent with earlier
 * state (R02's ripple forces the "shared mistake" view).
 */
import { T, card, clue, fx, uch, uout, scenario, uprofile, type UScenario } from './kit';

/* ================================================================ F01 */
export const F01: UScenario = scenario({
  code: 'F01', kind: 'scenario', phase: 'facilitate', cooldown: 3, requires: { notVisited: ['F01'] },
  title: T(['Make Thinking Visible', 'اجعلي التفكير مرئيًا']),
  takeaway: T(['Hear from everyone at once, not just the usual volunteers, and respond to the pattern.', 'اسمع من الجميع في وقت واحد، لا من المتطوّعين المعتادين فقط، واستجب للنمط.']),
  discovers: ['present-mode'],
  events: [
    {
      id: 'live', kind: 'low-participation', on: 'board', interaction: 'pattern',
      line: T(['"Which is the better deal: 4 for 10 dirhams, or 6 for 14?"', '«أيهما أوفر: ٤ بـ١٠ دراهم، أم ٦ بـ١٤؟»']),
      ask: T(['Every response is on the board. Tap the patterns you see.', 'كل الإجابات على السبورة. اضغطي على الأنماط التي ترينها.']),
      task: {
        cards: [
          card('c1', ['14 students', '١٤ طالبًا'], ['"6 for 14: 2.33 each against 2.50."', '«٦ بـ١٤: ٢٫٣٣ للواحدة مقابل ٢٫٥٠.»']),
          card('c2', ['5 students', '٥ طلاب'], ['"4 for 10, because 10 is cheaper."', '«٤ بـ١٠، لأن ١٠ أرخص.»']),
          card('c3', ['3 students', '٣ طلاب'], ['"The same: both go up by 2 and 4."', '«متساويان: كلاهما يزيد ٢ و٤.»']),
          card('c4', ['2 students', '٢ طالبان'], ['No answer yet.', 'لا إجابة بعد.']),
        ],
        patterns: [
          { id: 'unit', label: T(['Compared one each', 'قارنوا سعر الواحدة']), cards: ['c1'] },
          { id: 'total', label: T(['Compared totals, not rates', 'قارنوا المجموع لا المعدّل']), cards: ['c2'] },
          { id: 'additive', label: T(['Adding, not multiplying', 'الجمع بدل الضرب']), cards: ['c3'] },
          { id: 'silent', label: T(['Not yet answered', 'لم يجيبوا بعد']), cards: ['c4'] },
        ],
        note: T(['Most compare one each; five compare totals; three are still adding. The volunteers would only have shown you the fourteen.', 'معظمهم قارنوا سعر الواحدة، وخمسة قارنوا المجموع، وثلاثة ما زالوا يجمعون. المتطوّعون كانوا سيُظهرون لكِ الأربعة عشر فقط.']),
      },
      choices: [
        uch(['Respond to the "totals" group with one question', 'استجيبي لمجموعة «المجموع» بسؤال واحد'], ['Present Mode', 'وضع العرض'], 'f1Respond'),
        uch(['Take three volunteers instead', 'خذي ثلاثة متطوّعين بدلًا من ذلك'], ['Volunteers', 'المتطوّعون'], 'f1Volunteers', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f1Respond', 'good', ['The thinking, visible', 'التفكير، مرئيًا'], ['"Is 10 dirhams for 4 cheaper per box?" The totals group recalculates. And one of the "no answer" boards turns out to be Omar\'s, half-finished and right.', '«هل ١٠ دراهم لأربع علب أرخص للعلبة؟» تعيد مجموعة المجموع الحساب. وتتبيّن أن إحدى السبورات «دون إجابة» هي سبورة عمر، نصفها مكتوب وصحيح.'], [fx('sara', 1, 0), fx('omar', 0, 1)], { xp: 30, discover: 'present-mode', setFlag: 'u.evidence', triggers: 'R05' }),
    uout('f1Volunteers', 'mixed', ['Three right answers', 'ثلاث إجابات صحيحة'], ['Three hands, three right answers. The five comparing totals stay hidden.', 'ثلاث أيادٍ، وثلاث إجابات صحيحة. ويبقى الخمسة الذين قارنوا المجموع مخفيين.'], [], { xp: 30, opensNeeds: ['class-mis'] }),
  ],
});

/* ================================================================ F02 */
export const F02: UScenario = scenario({
  code: 'F02', kind: 'scenario', phase: 'facilitate', cooldown: 3, requires: { notVisited: ['F02'] },
  title: T(['Everyone Has a Voice', 'لكلّ صوت مكان']),
  takeaway: T(['Group for a purpose: give each student the role their evidence says they need.', 'كوّن المجموعات لغرض: أعطِ كل طالب الدور الذي تقول أدلّته إنه يحتاجه.']),
  discovers: ['teams'],
  events: [
    {
      id: 'roles', kind: 'new-event', on: 'omar', interaction: 'match',
      line: T(['Time for the group task.', 'حان وقت المهمة الجماعية.']),
      ask: T(['Match what you have seen of each student to the role that will help them.', 'طابقي ما رأيتِه من كل طالب مع الدور الذي سيساعده.']),
      task: {
        cards: [
          card('ahmed', ['Ahmed', 'أحمد'], ['Answers fast, often explains to others.', 'يجيب بسرعة، وكثيرًا ما يشرح لغيره.']),
          card('sara', ['Sara', 'سارة'], ['Right when she checks each step, slower when she rushes.', 'تصيب حين تتحقّق من كل خطوة، وتتعثّر حين تستعجل.']),
          card('omar', ['Omar', 'عمر'], ['Rarely volunteers; speaks after a partner first.', 'نادرًا ما يتطوّع؛ يتكلّم بعد أن يخبر زميلًا أولًا.']),
        ],
        targets: [
          card('questioner', ['Role', 'دور'], ['Questioner: asks, never tells', 'السائل: يسأل ولا يُخبر']),
          card('checker', ['Role', 'دور'], ['Checker: checks each step', 'المدقّق: يتحقّق من كل خطوة']),
          card('reporter', ['Role', 'دور'], ['Reporter, after rehearsing with the group', 'المتحدّث، بعد التدرّب مع المجموعة']),
        ],
        answer: { ahmed: 'questioner', sara: 'checker', omar: 'reporter' },
        note: T(['Each role uses a student\'s evidence: Ahmed\'s speed becomes questions, Sara\'s care becomes checking, Omar\'s rehearsal becomes his voice.', 'كل دور يستفيد من دليل الطالب: سرعة أحمد تصبح أسئلة، ودقّة سارة تصبح تدقيقًا، وتدرّب عمر يصبح صوته.']),
      },
      choices: [
        uch(['Teams with these roles', 'فرق بهذه الأدوار'], ['Teams', 'الفرق'], 'f2Roles'),
        uch(['Let them group with friends', 'دعيهم يختارون أصدقاءهم'], ['Friendship groups', 'مجموعات الأصدقاء'], 'f2Friends', { minutes: 0 }),
        uch(['Put the strongest student in charge of each group', 'اجعلي أقوى طالب قائدًا لكل مجموعة'], ['Group leaders', 'قادة المجموعات'], 'f2Leader', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f2Roles', 'good', ['A role for every voice', 'دور لكل صوت'], ['Ahmed asks "what did you do first?", Sara checks, and Omar reports the group\'s answer after one rehearsal. It is right, and the class hears him.', 'أحمد يسأل «ماذا فعلت أولًا؟»، وسارة تتحقّق، وعمر يعرض إجابة المجموعة بعد تدرّب واحد. وهي صحيحة، والصف يسمعه.'], [fx('omar', 1, 2), fx('sara', 1, 0)], { xp: 30, discover: 'teams', setFlag: 'u.peerVoice', closesNeeds: ['omar-voice'], studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] }),
    uout('f2Friends', 'mixed', ['Comfortable, and uneven', 'مريح، وغير متوازن'], ['Friends sit together. Ahmed\'s table finishes in minutes; Omar\'s table chats.', 'يجلس الأصدقاء معًا. طاولة أحمد تنهي في دقائق، وطاولة عمر تتحدّث.'], [], { xp: 30, opensNeeds: ['omar-voice'] }),
    uout('f2Leader', 'mixed', ['One voice per group', 'صوت واحد في كل مجموعة'], ['Each leader does the task and reports it. The groups look busy; four voices are heard.', 'كل قائد يحلّ المهمة ويعرضها. المجموعات تبدو مشغولة، ولا تُسمع إلا أربعة أصوات.'], [fx('ahmed', 0, 1)], { xp: 30, opensNeeds: ['omar-voice'] }),
  ],
});

/* ================================================================ F03 (reconverge) */
export const F03: UScenario = scenario({
  code: 'F03', kind: 'scenario', phase: 'facilitate', reconverge: true, requires: { notVisited: ['F03'] },
  title: T(['The Mid-Lesson Pivot', 'التحوّل في منتصف الدرس']),
  takeaway: T(['Halfway through, read the class view and adjust: one shared mistake, two starting points, or move on.', 'في منتصف الدرس، اقرأ عرض الصف وعدّل: خطأ مشترك واحد، أو نقطتا انطلاق، أو المتابعة.']),
  discovers: ['class-progress'],
  events: [
    {
      id: 'pivot', kind: 'new-event', on: 'laptop', interaction: 'pattern',
      line: T(['Halfway through the task', 'منتصف المهمة']),
      ask: T(['Look at the class view: who has finished, what is going wrong, and for whom?', 'انظري إلى عرض الصف: من أنهى، وما الذي يسير بشكل خاطئ، ولمن؟']),
      investigate: {
        clues: [
          clue('done', ['Who has finished', 'من أنهى'], ['How far is the class?', 'إلى أين وصل الصف؟']),
          clue('missed', ['Most missed', 'الأكثر خطأً'], ['Which question goes wrong most?', 'أي سؤال يخطئ فيه الأكثر؟']),
          clue('who', ['For whom', 'لدى من'], ['The same students, or spread out?', 'الطلاب أنفسهم، أم موزّعون؟']),
        ],
        profiles: [
          uprofile('ripple', 1, 'u.f3:one', {
            done: ['Most are on question 3.', 'معظمهم عند السؤال الثالث.'],
            missed: ['Question 3, by eleven students: the adding mistake you saw spread.', 'السؤال الثالث، أخطأ فيه أحد عشر طالبًا: خطأ الجمع الذي رأيتِه ينتشر.'],
            who: ['Spread across every table.', 'موزّعون على كل الطاولات.'],
          }, 'u.ripple'),
          uprofile('one', 40, 'u.f3:one', {
            done: ['Most are on question 3.', 'معظمهم عند السؤال الثالث.'],
            missed: ['Question 3, by eleven students: the same adding mistake.', 'السؤال الثالث، أخطأ فيه أحد عشر طالبًا: خطأ الجمع نفسه.'],
            who: ['Spread across every table.', 'موزّعون على كل الطاولات.'],
          }),
          uprofile('split', 35, 'u.f3:split', {
            done: ['Sixteen are ahead; eight are still on question 1.', 'ستة عشر متقدّمون، وثمانية ما زالوا عند السؤال الأول.'],
            missed: ['Questions 1–2, all by the same eight.', 'السؤالان الأول والثاني، أخطأ فيهما الثمانية أنفسهم.'],
            who: ['The same eight students.', 'الطلاب الثمانية أنفسهم.'],
          }),
          uprofile('secure', 25, 'u.f3:secure', {
            done: ['Nearly everyone is on the last question.', 'الجميع تقريبًا عند السؤال الأخير.'],
            missed: ['No question missed by more than three.', 'لا سؤال أخطأ فيه أكثر من ثلاثة.'],
            who: ['Three students, each with a different slip.', 'ثلاثة طلاب، ولكل منهم خطأ مختلف.'],
          }),
        ],
      },
      choices: [
        uch(['Pause the class for one example on question 3', 'أوقفي الصف لمثال واحد على السؤال الثالث'], ['Adjust from evidence', 'التعديل بالأدلة'], 'f3Pause', { ifFlag: 'u.f3:one' }),
        uch(['Carry on with the plan', 'تابعي الخطة'], ['Continue', 'متابعة'], 'f3Carry', { ifFlag: 'u.f3:one', minutes: 0 }),
        uch(['Two tracks: a side table for the eight, stretch for the rest', 'مساران: طاولة جانبية للثمانية، وإثراء للبقية'], ['Adjust from evidence', 'التعديل بالأدلة'], 'f3Tracks', { ifFlag: 'u.f3:split' }),
        uch(['Reteach everyone from the start', 'أعيدي الشرح للجميع من البداية'], ['Reteach all', 'إعادة كاملة'], 'f3All', { ifFlag: 'u.f3:split', minutes: 0 }),
        uch(['Move on; check in with the three', 'تابعي، وتابعي الثلاثة'], ['Adjust from evidence', 'التعديل بالأدلة'], 'f3Move', { ifFlag: 'u.f3:secure' }),
        uch(['Re-explain anyway, to be safe', 'أعيدي الشرح على أي حال، احتياطًا'], ['Reteach all', 'إعادة كاملة'], 'f3All', { ifFlag: 'u.f3:secure', minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f3Pause', 'good', ['One example, eleven fixes', 'مثال واحد، وأحد عشر تصحيحًا'], ['"Same multiplier, both parts": one example on the board, two minutes. Question 3 goes right across the room.', '«المضاعف نفسه للطرفين»: مثال واحد على السبورة، ودقيقتان. ويصبح السؤال الثالث صحيحًا في الصف كله.'], [fx('sara', 1, 0), fx('omar', 1, 0)], { xp: 30, discover: 'class-progress', setFlag: 'u.usedEvidence', closesNeeds: ['class-mis'] }),
    uout('f3Carry', 'mixed', ['On plan, and eleven behind', 'وفق الخطة، وأحد عشر متأخرون'], ['The lesson stays on time. The adding mistake goes into question 4 with them.', 'يبقى الدرس في موعده، ويحمل الطلاب خطأ الجمع معهم إلى السؤال الرابع.'], [], { xp: 30, discover: 'class-progress', opensNeeds: ['class-mis'] }),
    uout('f3Tracks', 'good', ['Two doors, one lesson', 'بابان، ودرس واحد'], ['Eight at your table for five minutes; sixteen on the open problem. Both groups move.', 'ثمانية على طاولتكِ لخمس دقائق، وستة عشر على المسألة المفتوحة. والمجموعتان تتقدّمان.'], [fx('sara', 1, 1), fx('ahmed', 0, 1)], { xp: 30, discover: 'class-progress', setFlag: 'u.usedEvidence' }),
    uout('f3All', 'mixed', ['Everyone, again', 'الجميع، مرة أخرى'], ['The reteach is clear. The students who were ready spend ten minutes on what they know.', 'إعادة الشرح واضحة. والطلاب المستعدون يقضون عشر دقائق في ما يعرفونه.'], [fx('ahmed', 0, -1)], { xp: 30, discover: 'class-progress' }),
    uout('f3Move', 'good', ['Move on, with three in mind', 'المتابعة، والثلاثة في الذهن'], ['The class goes on; three students get a quick word each. Nobody waits.', 'يتابع الصف، ويحصل ثلاثة طلاب على كلمة سريعة لكل منهم. ولا أحد ينتظر.'], [fx('ahmed', 0, 1)], { xp: 30, discover: 'class-progress', setFlag: 'u.usedEvidence' }),
  ],
});

/* ================================================================ F04 */
export const F04: UScenario = scenario({
  code: 'F04', kind: 'scenario', phase: 'facilitate', cooldown: 3, requires: { unresolved: ['sara-gap'], notVisited: ['F04'] },
  title: T(['Help Without Giving It Away', 'ساعدي دون أن تعطي الحل']),
  takeaway: T(['Give the least help that keeps the thinking hers.', 'قدّم أقل مساعدة تُبقي التفكير لها.']),
  discovers: ['need-help', 'see-why', 'ai-helper'],
  events: [
    {
      id: 'hints', kind: 'needs-help', on: 'sara', interaction: 'hint',
      line: T(['"Miss, I\'m stuck on this one."', '«أستاذة، توقّفت عند هذه.»']),
      ask: T(['Reveal the hints one at a time. Stop at the first one that gets her moving.', 'اكشفي التلميحات واحدًا تلو الآخر. وتوقّفي عند أول تلميح يحرّكها.']),
      task: {
        hints: [
          T(['"What do you notice about 2:3 and 6:9?"', '«ماذا تلاحظين في ٢:٣ و٦:٩؟»']),
          T(['"What did 2 become? What did you do to it?"', '«ماذا صار الرقم ٢؟ وماذا فعلتِ به؟»']),
          T(['"Fill in the next row of this ratio table."', '«املئي الصف التالي في جدول النسب هذا.»']),
          T(['"Here is the first step worked out."', '«هذه الخطوة الأولى محلولة.»']),
        ],
        note: T(['Each hint does a little more of the thinking for her. The earlier she gets moving, the more of the learning stays hers.', 'كل تلميح يقوم بجزء أكبر من التفكير عنها. وكلما تحرّكت مبكرًا، بقي جزء أكبر من التعلّم لها.']),
      },
      choices: [
        uch(['Stop at the first hint that works', 'توقّفي عند أول تلميح ينجح'], ['Need Help', 'أحتاج مساعدة'], 'f4Hint'),
        uch(['First, "Show me what you tried"', 'أولًا: «أريني ماذا جرّبتِ»'], ['See Why', 'اعرف السبب'], 'f4Why'),
        uch(['Let her ask for a hint, not the answer', 'دعيها تطلب تلميحًا، لا الإجابة'], ['AI Helper', 'المساعد الذكي'], 'f4Ai'),
        uch(['Show her the answer to save time', 'أريها الإجابة لتوفير الوقت'], ['Give the answer', 'إعطاء الإجابة'], 'f4Answer', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f4Hint', 'good', ['The second hint was enough', 'التلميح الثاني كان كافيًا'], ['"2 became 6… times 3!" She does the rest herself.', '«الرقم ٢ صار ٦… ضرب ٣!» وتُكمل البقية بنفسها.'], [fx('sara', 1, 1)], { xp: 30, discover: 'need-help', setFlag: 'u.saraSupported' }),
    uout('f4Why', 'insight', ['Her attempt explains itself', 'محاولتها تشرح نفسها'], ['"I added 4." Seeing her own step, she asks: "But 2 plus 4 is 6 and 3 plus 4 is 7…?" The question is hers.', '«أضفت ٤.» وحين ترى خطوتها تسأل: «لكن ٢ زائد ٤ تساوي ٦، و٣ زائد ٤ تساوي ٧…؟» السؤال سؤالها.'], [fx('sara', 1, 1)], { xp: 30, discover: 'see-why', setFlag: 'u.saraSupported' }),
    uout('f4Ai', 'good', ['A hint she asked for', 'تلميح طلبته بنفسها'], ['She asks for a hint and gets the question back: "What did you multiply by?" She works it out.', 'تطلب تلميحًا فيعود إليها السؤال: «بكم ضربتِ؟» وتصل إلى الحل.'], [fx('sara', 1, 1)], { xp: 30, discover: 'ai-helper', setFlag: 'u.saraSupported' }),
    uout('f4Answer', 'mixed', ['Answer given, thinking skipped', 'أُعطيت الإجابة، وتخطّت التفكير'], ['She copies it. On the next question she is stuck in the same place.', 'تنسخها. وفي السؤال التالي تتوقّف في المكان نفسه.'], [], { xp: 30 }),
  ],
});

/* ================================================================ F05 */
export const F05: UScenario = scenario({
  code: 'F05', kind: 'scenario', phase: 'facilitate', cooldown: 3,
  requires: { unresolved: ['sara-gap'], anyFlags: ['u.saraSupported', 'u.saraDiagnosed', 'u.saraBridged'], notVisited: ['F05'] },
  title: T(['Practice With Purpose', 'تدريب له هدف']),
  takeaway: T(['After support, give another meaningful attempt, stepping out from the example.', 'بعد الدعم، امنح محاولة أخرى ذات معنى، تبتعد خطوة خطوة عن المثال.']),
  discovers: ['practice'],
  events: [
    {
      id: 'practice', kind: 'needs-help', on: 'sara', interaction: 'order',
      line: T(['Sara is ready to try again, on her own.', 'سارة مستعدة لتجرّب مرة أخرى، وحدها.']),
      ask: T(['Order her practice: from closest to the example to furthest from it.', 'رتّبي تدريبها: من الأقرب إلى المثال إلى الأبعد عنه.']),
      task: {
        cards: [
          card('o1', ['Practice', 'تدريب'], ['Same numbers as the example, one step changed', 'أعداد المثال نفسها، مع تغيير خطوة واحدة']),
          card('o2', ['Practice', 'تدريب'], ['New numbers, same structure', 'أعداد جديدة، والبنية نفسها']),
          card('o3', ['Practice', 'تدريب'], ['A word problem with the same structure', 'مسألة كلامية بالبنية نفسها']),
          card('o4', ['Practice', 'تدريب'], ['A comparison she hasn\'t seen before', 'مقارنة لم ترها من قبل']),
        ],
        order: ['o1', 'o2', 'o3', 'o4'],
        note: T(['Each step keeps one thing familiar and changes one thing, so success on one is evidence for the next.', 'كل خطوة تُبقي شيئًا مألوفًا وتغيّر شيئًا واحدًا، فيكون النجاح في واحدة دليلًا على التالية.']),
      },
      choices: [
        uch(['Practice in that order, on her own', 'التدريب بهذا الترتيب، وحدها'], ['Practice', 'التدريب'], 'f5Ordered'),
        uch(['Ten mixed problems', 'عشر مسائل متنوّعة'], ['Mixed set', 'مجموعة متنوّعة'], 'f5Mixed', { minutes: 0 }),
        uch(['Copy the example once more', 'انسخي المثال مرة أخرى'], ['Copy', 'نسخ'], 'f5Copy', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f5Ordered', 'good', ['Four steps, all hers', 'أربع خطوات، كلها لها'], ['She gets the first three alone and the fourth after one look back at her table. The gap that started this morning is closed.', 'تحلّ الثلاثة الأولى وحدها، والرابعة بعد نظرة واحدة إلى جدولها. الفجوة التي بدأت هذا الصباح سُدّت.'], [fx('sara', 2, 1)], { xp: 30, discover: 'practice', closesNeeds: ['sara-gap'], setFlag: 'u.saraClosed', studentDelta: [{ id: 'sara', key: 'understanding', delta: 1 }, { id: 'sara', key: 'confidence', delta: 1 }] }),
    uout('f5Mixed', 'mixed', ['Too far, too soon', 'أبعد وأسرع مما ينبغي'], ['Problem 3 is a type she hasn\'t met. She stops there, and doubts the first two.', 'السؤال الثالث من نوع لم تصادفه. تتوقّف عنده، وتشكّ في الأوّلين.'], [fx('sara', 0, -1)], { xp: 30 }),
    uout('f5Copy', 'mixed', ['Safe, not a new attempt', 'آمن، لكنه ليس محاولة جديدة'], ['She copies it perfectly. It isn\'t evidence of anything new.', 'تنسخه بإتقان. لكنه لا يدلّ على شيء جديد.'], [], { xp: 30 }),
  ],
});

/* ================================================================ F06 */
export const F06: UScenario = scenario({
  code: 'F06', kind: 'scenario', phase: 'facilitate', cooldown: 3, requires: { notVisited: ['F06'] },
  title: T(['The Energy Dip', 'هبوط الطاقة']),
  takeaway: T(['Use game mechanics when they serve the learning: everyone answers, reasons count.', 'استخدم عناصر اللعب حين تخدم التعلّم: الجميع يجيب، والأسباب تُحتسب.']),
  discovers: ['gamification'],
  events: [
    {
      id: 'dip', kind: 'low-participation', on: 'omar', interaction: 'sort',
      line: T(['Twenty minutes in, heads are going down.', 'بعد عشرين دقيقة، بدأت الرؤوس تنخفض.']),
      ask: T(['Sort these game ideas: which serve today\'s learning, and which only add energy?', 'صنّفي أفكار اللعب هذه: أيها يخدم تعلّم اليوم، وأيها يضيف طاقة فقط؟']),
      task: {
        cards: [
          card('g1', ['Idea', 'فكرة'], ['Every team answers; a point only counts with a reason', 'كل فريق يجيب، والنقطة لا تُحتسب إلا مع سبب']),
          card('g2', ['Idea', 'فكرة'], ['Speed buzzer: the first to answer wins', 'جرس السرعة: أول من يجيب يفوز']),
          card('g3', ['Idea', 'فكرة'], ['Points for the neatest notebook', 'نقاط لأرتب دفتر']),
          card('g4', ['Idea', 'فكرة'], ['Teams race to justify the better deal', 'تتسابق الفرق لتعليل العرض الأوفر']),
        ],
        targets: [
          card('learn', ['Purpose', 'الغرض'], ['Serves today\'s learning', 'يخدم تعلّم اليوم']),
          card('energy', ['Purpose', 'الغرض'], ['Energy only', 'طاقة فقط']),
        ],
        answer: { g1: 'learn', g2: 'energy', g3: 'energy', g4: 'learn' },
        note: T(['A game serves learning when every student has to think and explain, not when the same three race to press first.', 'اللعبة تخدم التعلّم حين يُضطر كل طالب إلى التفكير والتعليل، لا حين يتسابق الثلاثة أنفسهم إلى الضغط أولًا.']),
      },
      choices: [
        uch(['A team round where reasons score', 'جولة جماعية تُحتسب فيها الأسباب'], ['Gamification', 'التلعيب'], 'f6Purpose'),
        uch(['A speed buzzer round', 'جولة جرس السرعة'], ['Gamification', 'التلعيب'], 'f6Speed', { minutes: 0 }),
        uch(['Push on without a game', 'تابعي دون لعبة'], ['Continue', 'متابعة'], 'f6Push', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    uout('f6Purpose', 'good', ['Energy with a purpose', 'طاقة لها هدف'], ['Thirty seconds to think, every team answers, a point only with a "because". Omar\'s team wins on reasons.', 'ثلاثون ثانية للتفكير، وكل فريق يجيب، والنقطة لا تُحتسب إلا مع «لأن». وفريق عمر يفوز بالأسباب.'], [fx('omar', 1, 2), fx('sara', 0, 1)], { xp: 30, discover: 'gamification', setFlag: 'u.purposefulGame', closesNeeds: ['omar-voice'], studentDelta: [{ id: 'omar', key: 'participation', delta: 1 }] }),
    uout('f6Speed', 'mixed', ['The usual winners win', 'الفائزون المعتادون يفوزون'], ['The room wakes up. Ahmed presses first every time; most students never press at all.', 'يستيقظ الصف. أحمد يضغط أولًا في كل مرة، ومعظم الطلاب لا يضغطون أبدًا.'], [fx('ahmed', 0, 1)], { xp: 30, discover: 'gamification' }),
    uout('f6Push', 'mixed', ['On, slowly', 'المتابعة، ببطء'], ['The work continues. So does the dip.', 'يستمر العمل، ويستمر الهبوط معه.'], [fx('omar', 0, -1)], { xp: 30 }),
  ],
});

export const FACILITATE = [F01, F02, F03, F04, F05, F06];
