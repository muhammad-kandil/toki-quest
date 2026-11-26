/**
 * DEV PLACEHOLDER — Term Pass stages and rewards. Read only through
 * getTermPass() (src/teacher/content.ts) so the content designer can
 * move this into src/teacher/data/ later without engine changes.
 *
 * No currencies, no paid tier, no countdown: a stage is reached by
 * finishing an adventure, replaying one on a different path, marking a
 * "Try it Monday" as done, or sharing to the community.
 */
import { t, type Text } from '../../i18n/types';

export type RewardKind =
  | 'decor'        // accessory (shop item id in ref), shown in the classroom and on the campus
  | 'outfit'       // outfit (shop item id in ref)
  | 'notes'        // +amount Thank-you notes (the ONLY source of notes)
  | 'resource'     // Alef resource added to the toolkit
  | 'story'        // a story chapter to read
  | 'planner'      // a "Try it Monday" planner page
  | 'spotlight'    // a community spotlight
  | 'certificate'; // end of term

export interface TermReward {
  id: string;
  kind: RewardKind;
  icon: string;
  title: Text;
  body: Text;
  /** decor/outfit → shop item id; resource → resource id. */
  ref?: string;
  /** notes reward: how many; certificate: the end-of-term bundle. */
  amount?: number;
}

export interface TermStage {
  n: number;
  classroom: TermReward;
  professional: TermReward;
}

export interface TermPass {
  id: string;
  name: Text;
  stages: TermStage[];
  certificate: TermReward;
}

export const TERM_PASS_FIXTURE: TermPass = {
  id: 'term1',
  name: t('Term 1 · Autumn', 'الفصل الأول · الخريف'),
  stages: [
    { n: 1,
      classroom: { id: 'tp1-plant', kind: 'decor', icon: '❦', ref: 'decor-plant', title: t('Window plant', 'نبتة النافذة'), body: t('A green corner by the window. The class names it.', 'ركن أخضر عند النافذة. يختار الصف اسمه.') },
      professional: { id: 'tp1-story', kind: 'story', icon: '❡', title: t('Chapter: The first week', 'فصل: الأسبوع الأول'),
        body: t('On Thursday, the principal stops by the door and says nothing — she just smiles at the fraction strips on Sara’s desk. Ms. Mariam realises the school is watching how the class learns, not how quiet it is.', 'يوم الخميس تقف المديرة عند الباب ولا تقول شيئًا — تبتسم فقط لشرائط الكسور على طاولة سارة. تدرك الأستاذة مريم أن المدرسة تراقب كيف يتعلّم الصف، لا كم هو هادئ.') } },
    { n: 2,
      classroom: { id: 'tp2-notes', kind: 'notes', icon: '✉', amount: 8, title: t('+8 Thank-you notes', '+٨ بطاقات شكر'), body: t('Notes from your students. Spend them in the campus shop.', 'بطاقات من طلابك. استخدميها في متجر المدرسة.') },
      professional: { id: 'tp2-planner', kind: 'planner', icon: '☐', title: t('Monday planner: one question', 'مخطط الاثنين: سؤال واحد'),
        body: t('Before Monday, write the one question you will ask every table: "How do you know?" Tick each table as you hear an answer.', 'قبل يوم الاثنين، اكتبي السؤال الوحيد الذي ستطرحينه على كل طاولة: «كيف عرفت؟» ضعي علامة لكل طاولة عندما تسمعين إجابة.') } },
    { n: 3,
      classroom: { id: 'tp3-wall', kind: 'decor', icon: '▦', ref: 'decor-wall', title: t('Thinking wall', 'جدار التفكير'), body: t('Students pin one "how I know" note a day.', 'يعلّق الطلاب ملاحظة «كيف عرفت» واحدة كل يوم.') },
      professional: { id: 'tp3-resource', kind: 'resource', icon: '✓', ref: 'exit-ticket', title: t('Exit ticket (Alef resource)', 'بطاقة الخروج (مورد ألف)'), body: t('Three quick questions at the bell tell you who starts tomorrow with you.', 'ثلاثة أسئلة سريعة عند الجرس تخبرك بمن يبدأ معك غدًا.') } },
    { n: 4,
      classroom: { id: 'tp4-notes', kind: 'notes', icon: '✉', amount: 10, title: t('+10 Thank-you notes', '+١٠ بطاقات شكر'), body: t('Notes from parents after open day. Spend them in the campus shop.', 'بطاقات من أولياء الأمور بعد اليوم المفتوح. استخدميها في متجر المدرسة.') },
      professional: { id: 'tp4-spotlight', kind: 'spotlight', icon: '✦', title: t('Community spotlight', 'تسليط ضوء من المجتمع'),
        body: t('Example: a Grade 4 teacher in Al Ain swapped "Any questions?" for "Ask your partner one question" — and heard twice as many.', 'مثال: معلمة صف رابع في العين استبدلت «هل من أسئلة؟» بـ«اسأل زميلك سؤالًا واحدًا» — فسمعت ضعف عدد الأسئلة.') } },
    { n: 5,
      classroom: { id: 'tp5-notes', kind: 'notes', icon: '✉', amount: 10, title: t('+10 Thank-you notes', '+١٠ بطاقات شكر'), body: t('A stack of notes from the class. Spend them in the campus shop.', 'مجموعة بطاقات من الصف. استخدميها في متجر المدرسة.') },
      professional: { id: 'tp5-story', kind: 'story', icon: '❡', title: t('Chapter: Visit week', 'فصل: أسبوع الزيارات'),
        body: t('A visitor sits at Omar’s table. When she asks what they are learning, Omar answers first. Ms. Mariam pretends not to notice — and writes it in her notebook that night.', 'تجلس زائرة على طاولة عمر. حين تسأل عمّا يتعلّمونه، يجيب عمر أولًا. تتظاهر الأستاذة مريم بأنها لم تلاحظ — وتكتب ذلك في دفترها تلك الليلة.') } },
  ],
  certificate: { id: 'tp-cert', kind: 'certificate', icon: '✺', amount: 16, title: t('Term certificate', 'شهادة الفصل'), body: t('For a term of lessons that changed what happened next. Comes with 16 Thank-you notes.', 'تقديرًا لفصل من الدروس غيّرت ما حدث بعدها. ومعها ١٦ بطاقة شكر.') },
};
