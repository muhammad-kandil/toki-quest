/**
 * Mission 05 — Everyone Has a Voice. Grade 7 · Science (food chains). Omar's thread.
 * Opened by M01 "An Unexpected Opportunity".
 * Participation beyond the usual voices: Teams with roles and rehearsal,
 * and Gamification used on purpose (everyone answers, thinking time, "why")
 * rather than a speed race the same students always win.
 * Reads a1.peerVoice (Omar's voice moved someone in M01).
 * Branch map: docs/content/TEACHER_CONTENT.md#m05
 */
import type { Adventure } from '../../types';
import { t } from '../../../i18n/types';
import { T, ch, clue, fx, out, profile } from './kit';

export const M5: Adventure = {
  id: 'm5',
  number: 5,
  title: t('Everyone Has a Voice', 'لكلّ صوت مكان'),
  meta: t('Mission 05 · Grade 7 · Science', 'المهمة ٠٥ · الصف السابع · العلوم'),
  location: 'grade7',
  scene: 'teacher/scenes/m05.jpg',
  timed: false,
  lessonMinutes: 5,
  takeaway: t(
    'Participation is designed, not hoped for: thinking time, a partner first and a job for everyone bring in voices a speed race never will.',
    'المشاركة تُصمَّم ولا تُنتظر: وقت للتفكير، وزميل أولًا، ومهمة لكل واحد، تأتي بأصوات لن يأتي بها سباق السرعة أبدًا.',
  ),
  film: [
    { picture: 'teacher/film/m05-1.jpg', narration: T(['Science review day: food chains. Last time, the same five students answered everything.', 'يوم مراجعة العلوم: السلاسل الغذائية. في المرة الماضية، أجاب الطلاب الخمسة أنفسهم عن كل شيء.']) },
    { picture: 'teacher/film/m05-2.jpg', who: 'saeed', line: T(['Miss, can we play the buzzer game? I always win!', 'أستاذة، هل نلعب لعبة الجرس؟ أنا أفوز دائمًا!']) },
    { picture: 'teacher/film/m05-2.jpg', who: 'omar', line: T(['…I never get to press it.', '…لا أصل إلى الجرس أبدًا.']) },
    { picture: 'teacher/film/m05-2.jpg', who: 'noura', line: T(['Can I just write it?', 'هل يمكنني أن أكتبها فقط؟']) },
    { picture: 'teacher/film/m05-3.jpg', narration: T(['How do you hear from everyone today?', 'كيف تسمعين من الجميع اليوم؟']) },
  ],
  intro: [T(['MISSION 05 | Everyone Has a Voice', 'المهمة ٠٥ | لكلّ صوت مكان']), T(['Design the talk. Hear every voice.', 'صمّمي الحوار. واسمعي كل صوت.'])],
  introBubbles: [
    { student: 'saeed', line: T(['I always win!', 'أنا أفوز دائمًا!']) },
    { student: 'omar', line: T(['…never me.', '…لست أنا أبدًا.']) },
  ],
  students: [
    {
      id: 'omar', name: T(['Omar', 'عمر']), x: 18, y: 44, understanding: 1, engagement: 1,
      idle: T(['Omar has drawn a food chain in the margin, very neatly.', 'رسم عمر سلسلة غذائية على الهامش، بترتيب شديد.']),
      homeNote: T(['His dad works night shifts, so mornings at home are rushed.', 'والده يعمل في نوبات ليلية، فالصباح في البيت مستعجل.']),
    },
    {
      id: 'noura', name: T(['Noura', 'نورة']), x: 36, y: 60, understanding: 2, engagement: 1,
      idle: T(['Noura\'s notes are full. Her hand has never gone up.', 'ملاحظات نورة ممتلئة. ويدها لم ترتفع قط.']),
      homeNote: T(['The eldest of five. At home she talks all the time; at school she is quiet.', 'الكبرى بين خمسة إخوة. في البيت تتكلّم طوال الوقت، وفي المدرسة هادئة.']),
    },
    {
      id: 'saeed', name: T(['Saeed', 'سعيد']), x: 66, y: 48, understanding: 2, engagement: 3,
      idle: T(['Saeed\'s hand is up before you finish the question.', 'يد سعيد ترتفع قبل أن تنهي السؤال.']),
      homeNote: T(['He plays for a youth football club four evenings a week.', 'يلعب في نادٍ لكرة القدم للناشئين أربع أمسيات في الأسبوع.']),
    },
  ],
  objects: [
    { id: 'laptop', label: T(['Laptop', 'الحاسوب المحمول']), icon: '▣', x: 82, y: 64, idle: T(['The review game is ready to set up.', 'لعبة المراجعة جاهزة للإعداد.']) },
    { id: 'board', label: T(['Board', 'السبورة']), icon: '▭', x: 50, y: 16, idle: T(['"Sun → grass → gazelle → ?"', '«الشمس ← العشب ← الغزال ← ؟»']) },
    { id: 'bookshelf', label: T(['Bookshelf', 'رفّ الكتب']), icon: '▥', x: 10, y: 30, idle: T(['A small box rattles when you touch the shelf.', 'صندوق صغير يُصدر صوتًا حين تلمسين الرف.']) },
  ],
  schedule: ['omar', 'noura', 'saeed', 'laptop', 'board', 'bookshelf'].map((event) => ({ event, at: 0 })),
  events: [
    {
      id: 'omar', kind: 'low-participation', on: 'omar',
      line: T(['"…I never get to press it."', '«…لا أصل إلى الجرس أبدًا.»']),
      ask: T(['What would bring his voice in today?', 'ما الذي سيأتي بصوته اليوم؟']),
      investigate: {
        clues: [
          clue('margin', ['His margin', 'الهامش'], ['What did he draw?', 'ماذا رسم؟']),
          clue('face', ['His face', 'ملامحه'], ['When does he look up?', 'متى يرفع رأسه؟']),
          clue('reply', ['What he says', 'ما يقوله'], ['"What would help you join in?"', '«ما الذي يساعدك على المشاركة؟»']),
        ],
        profiles: [
          profile('confidence', 40, 'm5.omar:confidence', {
            margin: ['A correct food chain, then a question mark next to it.', 'سلسلة غذائية صحيحة، وبجانبها علامة استفهام.'],
            face: ['He looks up when others answer, then down when you look at him.', 'يرفع رأسه حين يجيب الآخرون، ويخفضه حين تنظرين إليه.'],
            reply: ['"If I say it wrong, everyone will hear."', '«إذا قلتها خطأ، سيسمع الجميع.»'],
          }),
          profile('words', 30, 'm5.omar:words', {
            margin: ['Arrows and pictures, no words.', 'أسهم وصور، دون كلمات.'],
            face: ['He looks up at the pictures on the board, not the words.', 'ينظر إلى الصور على السبورة، لا إلى الكلمات.'],
            reply: ['"I know it. I don\'t know the word for the animal that eats animals."', '«أعرفها. لكنني لا أعرف كلمة الحيوان الذي يأكل الحيوانات.»'],
          }),
          profile('game', 30, 'm5.omar:game', {
            margin: ['A scoreboard with his name on top.', 'لوحة نتائج واسمه في أعلاها.'],
            face: ['He sits up when you say "game".', 'يعتدل في جلسته حين تقولين «لعبة».'],
            reply: ['"Games are fun. I just guess fast."', '«الألعاب ممتعة. أنا فقط أخمّن بسرعة.»'],
          }),
        ],
      },
      choices: [
        ch(['Tell your team first, then the team answers', 'أخبر فريقك أولًا، ثم يجيب الفريق'], ['Teams', 'الفرق'], [{ ifFlag: 'a1.peerVoice', outcome: 'oTeamAgain' }, { outcome: 'oTeam' }], { ifFlag: 'm5.omar:confidence' }),
        ch(['Call on him to answer', 'اطلبي منه أن يجيب'], ['Call on him', 'النداء بالاسم'], 'oCalled', { ifFlag: 'm5.omar:confidence', minutes: 0 }),
        ch(['Put a picture word bank on the board', 'اعرضي بنك كلمات مصوّرًا على السبورة'], ['Present Mode', 'وضع العرض'], 'oWords', { ifFlag: 'm5.omar:words' }),
        ch(['"Say it your way, then we find the word"', '«قلها بطريقتك، ثم نجد الكلمة»'], ['Own words', 'بكلماته'], 'oOwnWords', { ifFlag: 'm5.omar:words' }),
        ch(['A game round where every answer needs a "why"', 'جولة لعب كل إجابة فيها تحتاج إلى «لماذا»'], ['Gamification', 'التلعيب'], 'oGameWhy', { ifFlag: 'm5.omar:game' }),
        ch(['A quick quiz game', 'لعبة أسئلة سريعة'], ['Quiz', 'مسابقة'], 'oQuiz', { ifFlag: 'm5.omar:game', minutes: 0 }),
      ],
    },
    {
      id: 'noura', kind: 'low-participation', on: 'noura',
      line: T(['"Can I just write it?"', '«هل يمكنني أن أكتبها فقط؟»']),
      ask: T(['Her notes are full. How does her thinking reach the room?', 'ملاحظاتها ممتلئة. كيف يصل تفكيرها إلى الصف؟']),
      investigate: {
        clues: [
          clue('notes', ['Her notes', 'ملاحظاتها'], ['What has she written?', 'ماذا كتبت؟']),
          clue('table', ['At her table', 'على طاولتها'], ['How is she with her group?', 'كيف هي مع مجموعتها؟']),
          clue('says', ['What she says', 'ما تقوله'], ['"Would you share that?"', '«هل تشاركين هذا؟»']),
        ],
        profiles: [
          profile('quiet', 40, 'm5.noura:quiet', {
            notes: ['A full food web, with the decomposers nobody else remembered.', 'شبكة غذائية كاملة، مع المحلّلات التي لم يتذكّرها أحد غيرها.'],
            table: ['Silent, even with her group.', 'صامتة، حتى مع مجموعتها.'],
            says: ['"Not in front of everyone."', '«ليس أمام الجميع.»'],
          }),
          profile('written', 30, 'm5.noura:written', {
            notes: ['Two pages, clear and right.', 'صفحتان، واضحتان وصحيحتان.'],
            table: ['She passes notes to her partner instead of talking.', 'تمرّر الملاحظات لزميلتها بدل الكلام.'],
            says: ['"I think better when I write."', '«أفكّر أفضل حين أكتب.»'],
          }),
          profile('leader', 30, 'm5.noura:leader', {
            notes: ['Neat notes, and a plan for her group with names on it.', 'ملاحظات مرتّبة، وخطة لمجموعتها عليها الأسماء.'],
            table: ['In her small group she is quietly in charge.', 'في مجموعتها الصغيرة تقودهم بهدوء.'],
            says: ['"I can tell my group. Not the class."', '«أستطيع أن أخبر مجموعتي، لا الصف.»'],
          }),
        ],
      },
      choices: [
        ch(['Reporter, with a minute to rehearse', 'المتحدّثة، مع دقيقة للتدرّب'], ['Teams', 'الفرق'], 'nReporter', { ifFlag: 'm5.noura:quiet' }),
        ch(['Call on her now', 'اطلبي منها الآن'], ['Call on her', 'النداء بالاسم'], 'nCalled', { ifFlag: 'm5.noura:quiet', minutes: 0 }),
        ch(['Everyone writes, then shares one line', 'الجميع يكتب، ثم يشارك سطرًا واحدًا'], ['Write first', 'الكتابة أولًا'], 'nWrite', { ifFlag: 'm5.noura:written' }),
        ch(['"Try saying it out loud today"', '«جرّبي أن تقوليها بصوت مسموع اليوم»'], ['Push gently', 'دفع لطيف'], 'nPush', { ifFlag: 'm5.noura:written', minutes: 0 }),
        ch(['Make her the group\'s leader', 'اجعليها قائدة المجموعة'], ['Teams', 'الفرق'], 'nLead', { ifFlag: 'm5.noura:leader' }),
        ch(['Ask her to present to the class', 'اطلبي منها أن تعرض أمام الصف'], ['Present', 'عرض'], 'nPresent', { ifFlag: 'm5.noura:leader', minutes: 0 }),
      ],
    },
    {
      id: 'saeed', kind: 'early-finisher', on: 'saeed',
      line: T(['"Miss, can we play the buzzer game? I always win!"', '«أستاذة، هل نلعب لعبة الجرس؟ أنا أفوز دائمًا!»']),
      ask: T(['Lots of voice. Whose voice is missing because of it?', 'صوت كثير. أي أصوات تغيب بسببه؟']),
      investigate: {
        clues: [
          clue('hand', ['His hand', 'يده'], ['When does it go up?', 'متى ترتفع؟']),
          clue('answers', ['His answers', 'إجاباته'], ['How good are they?', 'ما مستواها؟']),
          clue('others', ['The others', 'الآخرون'], ['What do they do when he answers?', 'ماذا يفعلون حين يجيب؟']),
        ],
        profiles: [
          profile('dominant', 40, 'm5.saeed:dominant', {
            hand: ['Before the question is finished, every time.', 'قبل أن ينتهي السؤال، في كل مرة.'],
            answers: ['Mostly right, fast.', 'صحيحة في الغالب، وسريعة.'],
            others: ['His table has stopped thinking: Saeed will answer.', 'توقّفت طاولته عن التفكير: سعيد سيجيب.'],
          }),
          profile('helper', 30, 'm5.saeed:helper', {
            hand: ['Up, then pointing at a teammate: "He knows it!"', 'ترتفع، ثم يشير إلى زميل: «هو يعرفها!»'],
            answers: ['He whispers answers to his teammates.', 'يهمس بالإجابات لزملائه.'],
            others: ['They repeat what he whispered.', 'يكرّرون ما همس به.'],
          }),
          profile('unsure', 30, 'm5.saeed:unsure', {
            hand: ['Up fast, then the answer comes out slowly.', 'ترتفع بسرعة، ثم تخرج الإجابة ببطء.'],
            answers: ['Confident, and half wrong: "the lion is a producer."', 'واثقة، ونصفها خطأ: «الأسد منتِج.»'],
            others: ['They believe him because he sounds sure.', 'يصدّقونه لأنه يبدو متأكدًا.'],
          }),
        ],
      },
      choices: [
        ch(['Give him the summariser role: listen, then sum up', 'أعطيه دور الملخِّص: يستمع ثم يلخّص'], ['Teams', 'الفرق'], 'sSummarise', { ifFlag: 'm5.saeed:dominant' }),
        ch(['Let him answer; he\'s right', 'دعيه يجيب، فهو محق'], ['Volunteer', 'متطوّع'], 'sAnswers', { ifFlag: 'm5.saeed:dominant', minutes: 0 }),
        ch(['"Ask them a question instead of telling"', '«اسألهم سؤالًا بدل أن تخبرهم»'], ['Coach the helper', 'وجّهي المساعد'], 'sCoach', { ifFlag: 'm5.saeed:helper' }),
        ch(['Let him keep helping', 'دعيه يستمر في المساعدة'], ['Continue', 'متابعة'], 'sWhisper', { ifFlag: 'm5.saeed:helper', minutes: 0 }),
        ch(['"How do you know the lion makes food?"', '«كيف تعرف أن الأسد يصنع غذاءه؟»'], ['See Why', 'اعرف السبب'], 'sWhy', { ifFlag: 'm5.saeed:unsure' }),
        ch(['Praise him for joining in', 'امدحيه على مشاركته'], ['Encourage', 'تشجيع'], 'sPraise', { ifFlag: 'm5.saeed:unsure', minutes: 0 }),
      ],
    },
    {
      id: 'laptop', kind: 'new-event', on: 'laptop',
      line: T(['Set up the review game', 'أعدّي لعبة المراجعة']),
      ask: T(['The same game can bring everyone in or leave most out.', 'اللعبة نفسها قد تُشرك الجميع أو تُقصي معظمهم.']),
      choices: [
        ch(['Team rounds: thinking time, everyone answers, one "why"', 'جولات جماعية: وقت للتفكير، الجميع يجيب، و«لماذا» واحدة'], ['Gamification', 'التلعيب'], 'lTeams'),
        ch(['Speed buzzer: first to answer wins', 'جرس السرعة: أول من يجيب يفوز'], ['Gamification', 'التلعيب'], 'lSpeed', { minutes: 0 }),
      ],
    },
    {
      id: 'board', kind: 'new-event', on: 'board',
      line: T(['Today\'s talk rule', 'قاعدة الحوار اليوم']),
      ask: T(['How will answers happen today?', 'كيف ستأتي الإجابات اليوم؟']),
      choices: [
        ch(['"Think, tell your partner, then share"', '«فكّر، أخبر زميلك، ثم شارك»'], ['Present Mode', 'وضع العرض'], 'bRule'),
        ch(['Hands up, as usual', 'رفع الأيدي، كالمعتاد'], ['Hands up', 'رفع الأيدي'], 'bHands', { minutes: 0 }),
      ],
    },
    {
      id: 'bookshelf', kind: 'new-event', on: 'bookshelf',
      line: T(['A small box that rattles.', 'صندوق صغير يُصدر صوتًا.']),
      ask: T(['Optional. It won\'t change the lesson.', 'اختياري، ولن يغيّر الدرس.']),
      choices: [ch(['Open the box', 'افتحي الصندوق'], ['Hidden discovery', 'اكتشاف مخفي'], 'shSticks', { minutes: 0 })],
    },
    /* ---- weighted pool ---- */
    {
      id: 'pLink', kind: 'new-event', on: 'noura', category: 'learning', weight: 35,
      line: T(['Noura whispers to her partner: "…and the fungi eat the lion in the end."', 'نورة تهمس لزميلتها: «…وفي النهاية تأكل الفطريات الأسد.»']),
      ask: T(['The missing link of the whole lesson, said to one person.', 'الحلقة الناقصة في الدرس كله، قالتها لشخص واحد.']),
      choices: [
        ch(['"Can I share your idea, with your name?"', '«هل أشارك فكرتكِ، باسمكِ؟»'], ['Ask permission', 'استئذان'], 'plShare'),
        ch(['"Say that to the class!"', '«قوليها للصف!»'], ['Call on her', 'النداء بالاسم'], 'plCall', { minutes: 0 }),
      ],
    },
    {
      id: 'pDisagree', kind: 'new-event', on: 'saeed', category: 'collaboration', weight: 25,
      line: T(['Saeed\'s team disagrees with him, and they\'re right.', 'فريق سعيد يخالفه الرأي، وهم محقّون.']),
      ask: T(['For once, the quieter ones have the better answer.', 'هذه المرة، لدى الأهدأ الإجابة الأفضل.']),
      choices: [
        ch(['Let the team present its answer', 'دعي الفريق يعرض إجابته'], ['Teams', 'الفرق'], 'pdTeam'),
        ch(['Settle it yourself', 'احسميها بنفسك'], ['Teacher decides', 'المعلمة تقرّر'], 'pdSettle', { minutes: 0 }),
      ],
    },
    {
      id: 'pArrow', kind: 'unexpected', on: 'board', category: 'misconception', weight: 20,
      line: T(['A voice: "The lion eats the gazelle, so the arrow points to the gazelle."', 'صوت: «الأسد يأكل الغزال، إذن السهم يشير إلى الغزال.»']),
      ask: T(['Half the arrows in the room point the wrong way.', 'نصف الأسهم في الصف تشير في الاتجاه الخطأ.']),
      choices: [
        ch(['"What does the arrow carry?"', '«ماذا ينقل السهم؟»'], ['See Why', 'اعرف السبب'], 'paWhy'),
        ch(['Turn the arrows round on the board', 'اقلبي الأسهم على السبورة'], ['Correct it', 'تصحيح'], 'paFix', { minutes: 0 }),
      ],
    },
    {
      id: 'pLoud', kind: 'unexpected', on: 'laptop', category: 'management', weight: 15,
      line: T(['The game is getting loud. One team is shouting answers.', 'اللعبة صارت صاخبة. فريق واحد يصرخ بالإجابات.']),
      ask: T(['The fun is real. So is the noise.', 'المتعة حقيقية، والضجيج كذلك.']),
      choices: [
        ch(['Next round is a whisper round', 'الجولة التالية جولة همس'], ['Reset', 'إعادة ضبط'], 'pqWhisper'),
        ch(['Keep going; it\'s nearly over', 'تابعوا، أوشكت أن تنتهي'], ['Continue', 'متابعة'], 'pqOn', { minutes: 0 }),
      ],
    },
  ],
  outcomes: [
    out('oTeamAgain', 'good', ['"Like last time"', '«مثل المرة الماضية»'], ['He remembers his guess starting a discussion. He tells his team, they agree, and he says it for them.', 'يتذكّر كيف فتح تخمينه نقاشًا. يخبر فريقه، فيوافقونه، ويقولها باسمهم.'], [fx('omar', 1, 2)], { xp: 30, discover: 'teams', setFlag: 'm5.allVoices' }),
    out('oTeam', 'good', ['Safe to say it', 'آمن أن يقولها'], ['He tells his team first. They nod. Then he says it to the class, quickly, and it\'s right.', 'يخبر فريقه أولًا، فيومئون. ثم يقولها للصف بسرعة، وهي صحيحة.'], [fx('omar', 1, 1)], { xp: 30, discover: 'teams', setFlag: 'm5.allVoices' }),
    out('oCalled', 'mixed', ['"I don\'t know"', '«لا أعرف»'], ['He knows. Put on the spot, he says he doesn\'t.', 'هو يعرف. لكن حين وُضع في الموقف فجأة، قال إنه لا يعرف.'], [fx('omar', 0, -1)], { xp: 30, setFlag: 'm5.fewVoices' }),
    out('oWords', 'good', ['A word for every picture', 'كلمة لكل صورة'], ['Producer, consumer, predator, each with a picture. "Predator! That\'s the word." His hand goes up.', 'منتِج، مستهلِك، مفترس، ولكل كلمة صورة. «مفترس! هذه هي الكلمة.» وترتفع يده.'], [fx('omar', 1, 2)], { xp: 30, discover: 'present-mode', setFlag: 'm5.allVoices' }),
    out('oOwnWords', 'good', ['Idea first, word second', 'الفكرة أولًا، ثم الكلمة'], ['"The one that eats the eaters." The class laughs with him, and gives him the word: predator.', '«الذي يأكل الآكلين.» يضحك الصف معه، ويعطونه الكلمة: مفترس.'], [fx('omar', 1, 1)], { xp: 30 }),
    out('oGameWhy', 'good', ['A game that needs reasons', 'لعبة تحتاج إلى أسباب'], ['Each right answer only scores with a "why". Omar stops guessing and starts explaining; his team wins on reasons.', 'كل إجابة صحيحة لا تُحتسب إلا مع «لماذا». يتوقّف عمر عن التخمين ويبدأ بالشرح، ويفوز فريقه بالأسباب.'], [fx('omar', 2, 1)], { xp: 30, discover: 'gamification', setFlag: 'm5.gamePurpose' }),
    out('oQuiz', 'mixed', ['Fast and fun, mostly guesses', 'سريعة وممتعة، وأغلبها تخمين'], ['He scores well. Ask him why the gazelle eats grass and he shrugs.', 'يحصل على نقاط جيدة. لكن اسأليه لماذا يأكل الغزال العشب، فيهزّ كتفيه.'], [fx('omar', 0, 2)], { xp: 30, discover: 'gamification' }),
    out('nReporter', 'good', ['A minute to get ready', 'دقيقة للاستعداد'], ['She rehearses with her group, then reports the decomposers. Quietly, clearly, and the class hears something new.', 'تتدرّب مع مجموعتها، ثم تعرض دور المحلّلات. بهدوء ووضوح، ويسمع الصف شيئًا جديدًا.'], [fx('noura', 1, 2)], { xp: 30, discover: 'teams', setFlag: 'm5.allVoices' }),
    out('nCalled', 'mixed', ['A whisper, then silence', 'همسة، ثم صمت'], ['She starts, stops, and shakes her head. The decomposers stay in her notebook.', 'تبدأ، ثم تتوقّف وتهزّ رأسها. وتبقى المحلّلات في دفترها.'], [fx('noura', 0, -1)], { xp: 30, setFlag: 'm5.fewVoices' }),
    out('nWrite', 'good', ['Every voice, on paper first', 'كل صوت، على الورق أولًا'], ['Everyone writes one line, then reads it. Noura\'s line is the best in the room, and she reads it.', 'يكتب الجميع سطرًا ثم يقرؤونه. سطر نورة هو الأفضل في الصف، وهي من قرأته.'], [fx('noura', 1, 2)], { xp: 30, setFlag: 'm5.allVoices' }),
    out('nPush', 'mixed', ['Not today', 'ليس اليوم'], ['She tries. Two words, then she stops. You see her shut the notebook.', 'تحاول. كلمتان، ثم تتوقّف. وترينها تغلق دفترها.'], [fx('noura', 0, -1)], { xp: 30 }),
    out('nLead', 'good', ['Quiet, and in charge', 'هادئة، وقائدة'], ['She runs her group\'s round: who answers, who checks. Her group has the most voices in the room.', 'تدير جولة مجموعتها: من يجيب، ومن يتحقّق. ولدى مجموعتها أكبر عدد من الأصوات في الصف.'], [fx('noura', 1, 2)], { xp: 30, discover: 'teams', setFlag: 'm5.allVoices' }),
    out('nPresent', 'mixed', ['A step too far', 'خطوة أبعد مما ينبغي'], ['She stands, reads one line very fast, and sits down. She won\'t lead her group today.', 'تقف، وتقرأ سطرًا واحدًا بسرعة شديدة، ثم تجلس. لن تقود مجموعتها اليوم.'], [fx('noura', 0, -1)], { xp: 30 }),
    out('sSummarise', 'good', ['Listen first, then sum up', 'يستمع أولًا، ثم يلخّص'], ['His job is to listen to three teammates and sum up. It\'s hard for him, and his summary is excellent.', 'مهمته أن يستمع إلى ثلاثة من زملائه ويلخّص. هذا صعب عليه، وتلخيصه ممتاز.'], [fx('saeed', 1, 1)], { xp: 30, discover: 'teams', setFlag: 'm5.allVoices' }),
    out('sAnswers', 'mixed', ['Right, and alone', 'صحيح، ووحيد'], ['He is right again. His table has stopped thinking.', 'هو محق مرة أخرى. وطاولته توقّفت عن التفكير.'], [], { xp: 30, setFlag: 'm5.fewVoices' }),
    out('sCoach', 'good', ['Asking, not telling', 'يسأل، لا يُخبر'], ['"What does the gazelle eat?" His teammate works it out. Saeed grins as if he scored.', '«ماذا يأكل الغزال؟» زميله يستنتجها. ويبتسم سعيد كأنه سجّل هدفًا.'], [fx('saeed', 0, 1)], { xp: 30, setFlag: 'm5.allVoices' }),
    out('sWhisper', 'mixed', ['His answers, their mouths', 'إجاباته، بأصواتهم'], ['His team answers everything, in his words.', 'فريقه يجيب عن كل شيء، بكلماته هو.'], [], { xp: 30, setFlag: 'm5.fewVoices' }),
    out('sWhy', 'insight', ['The lion doesn\'t make food', 'الأسد لا يصنع غذاءه'], ['"It eats it… so it\'s a consumer." He changes his mind out loud, and so does his table.', '«يأكله… إذن هو مستهلِك.» يغيّر رأيه بصوت مسموع، وتغيّر طاولته رأيها معه.'], [fx('saeed', 2, 0)], { xp: 30, discover: 'see-why' }),
    out('sPraise', 'mixed', ['Praised, and still wrong', 'مُدح، وما زال مخطئًا'], ['He beams. His table writes "lion = producer".', 'يبتهج. وتكتب طاولته «الأسد = منتِج».'], [fx('saeed', 0, 1)], { xp: 30, setFlag: 'm5.fewVoices' }),
    out('lTeams', 'good', ['A game where everyone plays', 'لعبة يلعب فيها الجميع'], ['Thirty seconds to think, every team answers, one "why" per round. The scores are close and every table talks.', 'ثلاثون ثانية للتفكير، وكل فريق يجيب، و«لماذا» واحدة في كل جولة. النتائج متقاربة، وكل طاولة تتحاور.'], [fx('omar', 0, 1), fx('noura', 0, 1)], { discover: 'gamification', setFlag: 'm5.gamePurpose' }),
    out('lSpeed', 'mixed', ['The usual winners win', 'الفائزون المعتادون يفوزون'], ['Saeed wins. Three students press the buzzer all game. Twenty don\'t.', 'يفوز سعيد. ثلاثة طلاب يضغطون الجرس طوال اللعبة، وعشرون لا يضغطونه.'], [fx('saeed', 0, 1), fx('omar', 0, -1)], { discover: 'gamification', setFlag: 'm5.fewVoices' }),
    out('bRule', 'good', ['A talk rule on the board', 'قاعدة الحوار على السبورة'], ['"Think. Tell your partner. Then share." It changes who speaks before anyone has said a word.', '«فكّر. أخبر زميلك. ثم شارك.» تغيّر من يتكلّم قبل أن ينطق أحد بكلمة.'], [fx('noura', 0, 1), fx('omar', 0, 1)], { discover: 'present-mode', setFlag: 'm5.allVoices' }),
    out('bHands', 'mixed', ['The same hands', 'الأيادي نفسها'], ['Five hands, the same five as always.', 'خمس أيادٍ، الخمس نفسها كالعادة.'], [], { setFlag: 'm5.fewVoices' }),
    out('shSticks', 'insight', ['A box of name sticks', 'صندوق أعواد الأسماء'], ['Lolly sticks with names from a class years ago, and a note: "Everyone gets picked." It goes in your notebook.', 'أعواد خشبية عليها أسماء طلاب من سنوات مضت، وورقة: «الجميع سيُختار.» تُحفظ في دفتركِ.'], [], { setFlag: 'm5.sticks' }),
    out('plShare', 'good', ['Her idea, with her name', 'فكرتها، باسمها'], ['"Noura says the fungi win in the end." The class laughs, then gets it. She is smiling.', '«نورة تقول إن الفطريات تفوز في النهاية.» يضحك الصف، ثم يفهم. وهي تبتسم.'], [fx('noura', 0, 1)], { setFlag: 'm5.allVoices' }),
    out('plCall', 'mixed', ['Too far, too fast', 'أبعد وأسرع مما ينبغي'], ['She shakes her head. The idea goes back into the notebook.', 'تهزّ رأسها. وتعود الفكرة إلى الدفتر.'], [fx('noura', 0, -1)]),
    out('pdTeam', 'good', ['The quiet ones were right', 'الأهدأ كانوا محقّين'], ['His team presents. Saeed listens, then says "they\'re right". The best thing he says all day.', 'يعرض فريقه. يستمع سعيد، ثم يقول «هم محقّون». أجمل ما قاله طوال اليوم.'], [fx('saeed', 1, 0)], { discover: 'teams', setFlag: 'm5.allVoices' }),
    out('pdSettle', 'mixed', ['Settled', 'حُسمت'], ['You give the answer. Nobody at the table finds out they were the ones who had it.', 'تعطين الإجابة. ولا يعرف أحد على الطاولة أنهم كانوا أصحابها.'], []),
    out('paWhy', 'insight', ['The arrow carries energy', 'السهم ينقل الطاقة'], ['"From the gazelle to the lion." The arrows turn round across the whole room.', '«من الغزال إلى الأسد.» وتنقلب الأسهم في الصف كله.'], [fx('omar', 1, 0)], { discover: 'see-why' }),
    out('paFix', 'mixed', ['Fixed on the board', 'صُحّحت على السبورة'], ['The board is right. In half the notebooks, the arrows still point to dinner.', 'السبورة صحيحة. لكن في نصف الدفاتر، ما زالت الأسهم تشير إلى الطعام.'], []),
    out('pqWhisper', 'good', ['A whisper round', 'جولة همس'], ['The noise drops; the fun doesn\'t. Quieter students answer more in a whisper round.', 'ينخفض الضجيج، ولا تنخفض المتعة. والطلاب الأهدأ يجيبون أكثر في جولة الهمس.'], [fx('noura', 0, 1)]),
    out('pqOn', 'mixed', ['Loud to the end', 'صاخبة حتى النهاية'], ['It ends. The loudest team won.', 'تنتهي. وفاز الفريق الأعلى صوتًا.'], []),
  ],
  endings: [
    {
      id: 'same-voices', title: T(['The Same Voices', 'الأصوات نفسها']), priority: 1, when: { flags: ['m5.fewVoices'] }, opens: ['m6'],
      narration: T(['The lesson was lively, and some voices still did all the talking. Next, check what the quiet ones actually learned.', 'كان الدرس حيويًا، لكن بعض الأصوات ما زالت تتكلّم عن الجميع. والقادم: تحقّقي مما تعلّمه الهادئون فعلًا.']),
    },
    {
      id: 'everyone-voice', title: T(['Everyone Has a Voice', 'لكلّ صوت مكان']), priority: 2, when: { flags: ['m5.allVoices'] }, badge: 'everyone-has-a-voice', opens: ['m7'],
      narration: T(['Voices you rarely hear were part of the lesson, because the lesson made room for them.', 'أصوات نادرًا ما تسمعينها كانت جزءًا من الدرس، لأن الدرس أفسح لها مكانًا.']),
    },
    {
      id: 'voice-found', title: T(['A Voice Found', 'صوت وجد طريقه']), priority: 3, when: { notFlags: ['m5.fewVoices'] }, opens: ['m6', 'm7'],
      narration: T(['Nobody was drowned out today. Next time, design it so more of them speak.', 'لم يُغطِّ أحد على صوت أحد اليوم. وفي المرة القادمة، صمّمي الدرس ليتكلّم عدد أكبر منهم.']),
    },
  ],
  badges: [
    { id: 'everyone-has-a-voice', title: T(['Everyone Has a Voice', 'لكلّ صوت مكان']), why: T(['You designed the talk so the quiet voices came in.', 'صمّمتِ الحوار فدخلت الأصوات الهادئة.']), icon: '◎', when: { flag: 'm5.allVoices' } },
    { id: 'game-with-purpose', title: T(['Game With a Purpose', 'لعبة لها هدف']), why: T(['You used a game to make students think, not just race.', 'استخدمتِ اللعبة ليفكّر الطلاب، لا ليتسابقوا فقط.']), icon: '▶', when: { flag: 'm5.gamePurpose' } },
    { id: 'm5-listened', title: T(['Room to Speak', 'مساحة للكلام']), why: T(['You noticed whose voice was missing.', 'لاحظتِ أي صوت كان غائبًا.']), icon: '◌', when: 'always' },
  ],
  communityTopic: T(['Hearing every voice', 'سماع كل الأصوات']),
  communityExamples: [
    { who: T(['Science teacher · Al Dhafra', 'معلمة علوم · الظفرة']), text: T(['In our review games, a point only counts with a "why". My fastest guessers became my best explainers.', 'في ألعاب المراجعة عندنا، لا تُحتسب النقطة إلا مع «لماذا». فصار أسرع المخمّنين أفضل الشارحين.']) },
    { who: T(['Grade 7 teacher · Dubai', 'معلم الصف السابع · دبي']), text: T(['My loudest student is the summariser now. He has to listen to three people first.', 'أعلى طلابي صوتًا صار الملخِّص الآن. عليه أن يستمع إلى ثلاثة أشخاص أولًا.']) },
  ],
  teaser: [
    { ifFlag: 'm5.fewVoices', text: T(['Some voices stayed quiet. Next: the evidence will show you what they learned.', 'بقيت بعض الأصوات صامتة. والقادم: ستريكِ الأدلة ما تعلّموه.']) },
    { ifFlag: 'm5.allVoices', text: T(['Everyone spoke today. Next: getting every one of them ready for the test.', 'تكلّم الجميع اليوم. والقادم: إعداد كل واحد منهم للاختبار.']) },
    { text: T(['Next: read the evidence the lesson leaves behind.', 'والقادم: اقرئي الأدلة التي يتركها الدرس.']) },
  ],
};
