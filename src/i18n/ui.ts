import { t } from './types';

/**
 * All UI chrome strings (not level content — that lives with each level).
 * Arabic is written in a Modern Standard Arabic coaching register, the
 * way a DLIS would phrase it to a peer — not a literal translation.
 * Reviewed-by: (pending team review)
 */
export const UI = {
  // ---- Title ----
  appName: t("Toki's Coaching Quest", 'رحلة توكي التدريبية'),
  tagline: t('Spot the Drift', 'اكتشف الانحراف'),
  titleBlurb: t(
    'Sometimes the most impressive classrooms are not the ones where the deepest learning is happening.',
    'أحيانًا لا تكون أكثر الصفوف إبهارًا هي التي يحدث فيها التعلّم الأعمق.',
  ),
  startFirstVisit: t('Start Your First Visit', 'ابدأ زيارتك الأولى'),
  titlePromise: t(
    'A judgement game, not a quiz. Nothing is timed, nobody ranks you — and the teacher answers back.',
    'لعبة حكم مهني لا اختبار. لا شيء مؤقّت، ولا أحد يصنّفك — والمعلّم يردّ عليك.',
  ),
  continueQuest: t('Continue the Quest', 'واصل الرحلة'),
  customizeToki: t('Customize Toki', 'خصّص مظهر توكي'),
  badges: t('Badges', 'الشارات'),
  language: t('Language', 'اللغة'),

  // ---- Hub / world map ----
  hubEyebrow: t("Toki's Coaching Quest", 'رحلة توكي التدريبية'),
  chooseClassroom: t('Choose a classroom to visit', 'اختر صفًا لزيارته'),
  chooseWorld: t('Choose where Toki visits next', 'اختر وجهة توكي التالية'),
  hintUnlockNext: t('Complete a classroom to unlock the next.', 'أكمل صفًا لفتح الصف التالي.'),
  hintBossReady: t(
    'The Final Visit awaits. When you’re ready, enter The Perfect Classroom.',
    'الزيارة الأخيرة بانتظارك. عند استعدادك، ادخل الصف المثالي.',
  ),
  hintAllDone: t(
    'World complete. Revisit any classroom to sharpen your score.',
    'اكتمل العالم. يمكنك إعادة زيارة أي صف لتحسين نتيجتك.',
  ),
  hintQuestDone: t(
    'You’ve completed the Quest. Every door in the school stays open.',
    'لقد أكملت الرحلة. تبقى كل أبواب المدرسة مفتوحة.',
  ),
  locked: t('locked', 'مقفل'),
  hintFinalVisit: t('One door. The whole school is behind it.', 'باب واحد. المدرسة كلها خلفه.'),
  finalVisit: t('The Final Visit', 'الزيارة الأخيرة'),
  worldBoss: t('World Challenge', 'تحدّي العالم'),
  levelsDone: t('classrooms visited', 'صفوف تمت زيارتها'),
  back: t('Back', 'رجوع'),

  // ---- Level beats ----
  lookCloser: t('Look Closer', 'انظر عن قرب'),
  inspectHint: t('Tap the evidence to examine it', 'اضغط على كل دليل لفحصه'),
  inspectedAll: t('Toki has seen enough to make a call.', 'رأى توكي ما يكفي ليتّخذ قراره.'),
  identifyDrift: t('Identify the Drift', 'حدّد الانحراف'),
  assessRisk: t('Assess the Risk', 'قيّم درجة الخطورة'),
  chooseCoaching: t('Choose the Coaching Move', 'اختر الخطوة التدريبية'),
  whyBonus: t('Why? (optional bonus)', 'لماذا؟ (نقاط إضافية اختيارية)'),
  whyThisMove: t('Why is this the right move?', 'لماذا هذه هي الخطوة الصحيحة؟'),
  skipBonus: t('Skip bonus question', 'تخطّ السؤال الإضافي'),
  lookAgain: t('Look again', 'انظر مجددًا'),
  niceRead: t('Nice read', 'قراءة موفّقة'),
  restored: t('Classroom restored!', 'عاد الصف إلى مساره!'),

  // ---- Reveal ----
  revealHeading: t("Here's what was really happening", 'هذا ما كان يحدث فعلًا'),
  whatDrifted: t('What drifted', 'ما الذي انحرف'),
  whyItHappened: t('Why it happened', 'لماذا حدث ذلك'),
  howRestored: t('How Toki restored it', 'كيف أعاده توكي إلى مساره'),
  howToRestore: t('How to restore it', 'كيف نعيده إلى مساره'),
  howItCouldHaveGone: t('How it could have gone', 'كيف كان يمكن أن يسير الأمر'),
  visited: t('Visited', 'تمت الزيارة'),
  scoreNote: t(
    'Full points for a right call on the first try. Each guess after that still counts for something — but a clean first-try run is what earns the badge.',
    'النقاط كاملة عند الإجابة الصحيحة من المحاولة الأولى. المحاولات التالية تُحتسب جزئيًا، لكن الشارة لا تُمنح إلا لجولة نظيفة من المحاولة الأولى.',
  ),
  driftIdentified: t('Drift identified', 'تحديد الانحراف'),
  riskAssessed: t('Risk assessed', 'تقييم الخطورة'),
  coachingMove: t('Coaching move', 'الخطوة التدريبية'),
  reasoningBonus: t('Reasoning bonus', 'نقاط التعليل'),
  firstTry: t('first try', 'من المحاولة الأولى'),
  tryN: t('try {n}', 'المحاولة {n}'),
  notSolved: t('not solved', 'لم تُحل'),
  continue: t('Continue', 'متابعة'),
  completeQuest: t('Complete the Quest', 'أكمل الرحلة'),
  badgeEarned: t('Badge earned', 'حصلت على شارة'),
  points: t('pts', 'نقطة'),

  // ---- Coaching conversation ----
  conversationHeading: t('The Conversation', 'المحادثة'),
  tokiRead: t('Toki’s read', 'قراءة توكي'),
  tokiSays: t('What does Toki say?', 'ماذا يقول توكي؟'),
  teacherReplies: t('Continue', 'متابعة'),
  stanceDefensive: t('defensive', 'نبرة دفاعية'),
  stanceTired: t('tired', 'نبرة إرهاق'),
  stanceProud: t('proud', 'نبرة فخر'),
  stanceEager: t('eager', 'نبرة حماس'),
  outcomeRestored: t('Practice restored', 'عادت الممارسة إلى غايتها'),
  outcomePartial: t('Partly restored', 'عادت جزئيًا'),
  outcomeUnchanged: t('Nothing changed', 'لم يتغيّر شيء'),
  outcomeClosed: t('The teacher has stopped listening.', 'توقّف المعلّم عن الإصغاء.'),
  conversationRow: t('Conversation', 'المحادثة'),
  whatHappenedNext: t('What happened next', 'ما حدث بعد ذلك'),

  // ---- Risk labels ----
  riskMinor: t('Minor Drift', 'انحراف طفيف'),
  riskModerate: t('Moderate Drift', 'انحراف متوسط'),
  riskHigh: t('High Drift', 'انحراف كبير'),
  riskLethal: t('Lethal Mutation', 'تحوّر قاتل'),

  // ---- Boss ----
  beginAudit: t('Begin the Audit', 'ابدأ التدقيق'),
  dimensionOf: t('Dimension {n} of {total}', 'البُعد {n} من {total}'),
  yourCall: t('Your call: does this dimension check out?', 'قرارك: هل هذا البُعد سليم؟'),
  checksOut: t('It checks out', 'سليم'),
  driftHere: t('The drift is here', 'الانحراف هنا'),
  confirmedClean: t('Confirmed clean', 'تأكّد أنه سليم'),
  theMutation: t('The mutation', 'التحوّر'),
  nextDimension: t('Next dimension', 'البُعد التالي'),
  makeTheCall: t('Make the call', 'اتّخذ القرار'),
  locateMutation: t('Locate the Mutation', 'حدّد موضع التحوّر'),
  hardestMove: t('The Hardest Coaching Move', 'أصعب خطوة تدريبية'),
  masterDlis: t('Master DLIS', 'خبير DLIS'),
  perfectRevealed: t('The Perfect Classroom, revealed', 'الصف المثالي، كما هو فعلًا'),

  // ---- Skins ----
  personalize: t('Personalize', 'التخصيص'),
  chooseLook: t("Choose Toki's Look", 'اختر مظهر توكي'),
  skinsHint: t(
    'Purely cosmetic — new looks unlock as you complete classrooms.',
    'مظهر فقط — تُفتح مظاهر جديدة كلما أكملت صفوفًا.',
  ),
  completeLevelN: t('Complete Level {n}', 'أكمل المستوى {n}'),
  completeBoss: t('Complete the Final Visit', 'أكمل الزيارة الأخيرة'),
  resetProgress: t('Reset Progress', 'إعادة ضبط التقدّم'),
  resetWarning: t(
    'This clears all classroom scores, badges, and your selected skin. This can’t be undone.',
    'سيؤدي هذا إلى مسح جميع النتائج والشارات والمظهر المختار. لا يمكن التراجع عن ذلك.',
  ),
  cancel: t('Cancel', 'إلغاء'),
  yesReset: t('Yes, reset everything', 'نعم، امسح كل شيء'),

  // ---- Badges gallery ----
  yourBadges: t('Your Badges', 'شاراتك'),
  badgesHint: t(
    'Earned with a clean first-try run — they mark real diagnostic skill, not speed.',
    'تُكتسب بجولة نظيفة من المحاولة الأولى — فهي تعكس مهارة تشخيص حقيقية، لا السرعة.',
  ),
  badgeLocked: t('Not yet earned', 'لم تُكتسب بعد'),
  earnedOn: t('Earned', 'مكتسبة'),

  // ---- Sound ----
  sound: t('Sound', 'الصوت'),
  soundOn: t('Sound on', 'الصوت مفعّل'),
  soundOff: t('Sound off', 'الصوت متوقف'),

  // ---- Loading ----
  loading: t('Loading Toki’s Quest…', 'جارٍ تحميل رحلة توكي…'),
};

/** Replace {n}-style placeholders. */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
