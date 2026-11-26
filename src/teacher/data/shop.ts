/**
 * Campus Shop catalogue. Owned by the content designer.
 *
 * Prices are in thank-you notes (بطاقات شكر), earned only from the Term Pass
 * and the end-of-term bundle (see termPass.ts). Nothing here is sold for
 * money, and Alef resources, story chapters and lessons are never priced.
 *
 * Balance (one term = 8 adventures + 4 replays = 12 Term Pass steps):
 * 54 notes earned + 5 items given by the pass. All cosmetics cost 68
 * (56 after the pass gifts), power-ups 2–3 each. A full term buys most
 * cosmetics and a handful of power-ups, never everything. See
 * docs/content/TEACHER_CONTENT.md "Shop and Term Pass".
 *
 * Slots: one placed item per slot. Classroom slots match the "place it"
 * spots in docs/design/TEACHER_UI.md §8 (window, shelf, back wall, desk).
 * Toki outfits use the existing sprites in src/assets/skins/.
 */
import type { Text } from '../../i18n/types';
import { t } from '../../i18n/types';

export interface ShopItem {
  id: string;
  kind: 'outfit' | 'accessory' | 'powerup';
  target?: 'toki' | 'mariam' | 'classroom';
  name: Text;
  desc: Text;
  price: number;
  slot?: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  /* ---------------- Outfits: Toki (sprites in src/assets/skins) ---------------- */
  {
    id: 'toki-cap-teal', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 3,
    name: t('Teal cap Toki', 'توكي بالقبعة الفيروزية'),
    desc: t('Toki in a teal cap, ready for playground duty.', 'توكي بقبعة فيروزية، جاهز لمناوبة الساحة.'),
  },
  {
    id: 'toki-cap-orange', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 3,
    name: t('Orange cap Toki', 'توكي بالقبعة البرتقالية'),
    desc: t('Bright enough to find in any school trip crowd.', 'زاهية بما يكفي لتجده وسط زحام أي رحلة مدرسية.'),
  },
  {
    id: 'toki-cap-checkered', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 4,
    name: t('Checkered cap Toki', 'توكي بالقبعة المربّعات'),
    desc: t('For the days when the lesson plan works first time.', 'للأيام التي تنجح فيها خطة الدرس من المرة الأولى.'),
  },
  {
    id: 'toki-basketball', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 4,
    name: t('Sports day Toki', 'توكي في يوم الرياضة'),
    desc: t('Basketball kit for the house cup.', 'زيّ كرة السلة لبطولة الفِرَق.'),
  },
  {
    id: 'toki-headwrap-a', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 5,
    name: t('Desert walk Toki', 'توكي في نزهة الصحراء'),
    desc: t('A cool headwrap for the science trip to the dunes.', 'غطاء رأس خفيف لرحلة العلوم إلى الكثبان.'),
  },
  {
    id: 'toki-headwrap-b', kind: 'outfit', target: 'toki', slot: 'toki-outfit', price: 5,
    name: t('Heritage day Toki', 'توكي في يوم التراث'),
    desc: t('Dressed for the school heritage day.', 'بزيّ يوم التراث في المدرسة.'),
  },
  /* ---------------- Outfits: Ms. Mariam ---------------- */
  {
    id: 'mariam-abaya-teal', kind: 'outfit', target: 'mariam', slot: 'mariam-outfit', price: 5,
    name: t('Abaya with teal trim', 'عباءة بحواف فيروزية'),
    desc: t('Ms. Mariam\'s favourite for parents\' evening.', 'المفضّلة لدى الأستاذة مريم في أمسية أولياء الأمور.'),
  },
  {
    id: 'mariam-national-day', kind: 'outfit', target: 'mariam', slot: 'mariam-outfit', price: 6,
    name: t('National Day shayla', 'شيلة اليوم الوطني'),
    desc: t('A shayla with a sash in the flag\'s colours, for the school\'s National Day.', 'شيلة ووشاح بألوان العلم، لاحتفال المدرسة باليوم الوطني.'),
  },
  {
    id: 'mariam-lab-coat', kind: 'outfit', target: 'mariam', slot: 'mariam-outfit', price: 4,
    name: t('Science lab coat', 'معطف المختبر'),
    desc: t('For experiment days, and spills.', 'لأيام التجارب، وللانسكابات.'),
  },
  {
    id: 'mariam-sports', kind: 'outfit', target: 'mariam', slot: 'mariam-outfit', price: 4,
    name: t('Sports day tracksuit', 'بدلة يوم الرياضة'),
    desc: t('Modest, comfortable, and fast enough for the teachers\' relay.', 'محتشمة ومريحة، وسريعة بما يكفي لسباق التتابع بين المعلمات.'),
  },

  /* ---------------- Accessories: classroom ---------------- */
  {
    id: 'room-plant', kind: 'accessory', target: 'classroom', slot: 'classroom-window', price: 1,
    name: t('Window plant', 'نبتة النافذة'),
    desc: t('The class waters it on Sundays. It is still alive.', 'يسقيها الصف كل يوم أحد. وما زالت حيّة.'),
  },
  {
    id: 'room-reading-lamp', kind: 'accessory', target: 'classroom', slot: 'classroom-window', price: 2,
    name: t('Reading lamp', 'مصباح القراءة'),
    desc: t('A warm corner for the quiet readers.', 'ركن دافئ للقرّاء الهادئين.'),
  },
  {
    id: 'room-bookshelf', kind: 'accessory', target: 'classroom', slot: 'classroom-shelf', price: 3,
    name: t('Class library shelf', 'رفّ مكتبة الصف'),
    desc: t('Arabic and English storybooks at three reading levels.', 'قصص عربية وإنجليزية بثلاثة مستويات قرائية.'),
  },
  {
    id: 'room-science-corner', kind: 'accessory', target: 'classroom', slot: 'classroom-shelf', price: 3,
    name: t('Science corner', 'ركن العلوم'),
    desc: t('Magnifiers, beakers and a jar of sand from the dunes.', 'عدسات مكبّرة وكؤوس وبرطمان رمل من الكثبان.'),
  },
  {
    id: 'room-fraction-poster', kind: 'accessory', target: 'classroom', slot: 'classroom-wall', price: 1,
    name: t('Fraction wall poster', 'ملصق جدار الكسور'),
    desc: t('Halves, quarters and eighths, all the same size of whole.', 'أنصاف وأرباع وأثمان، كلها من الكلّ نفسه.'),
  },
  {
    id: 'room-world-map', kind: 'accessory', target: 'classroom', slot: 'classroom-wall', price: 2,
    name: t('World map', 'خريطة العالم'),
    desc: t('With a pin in every country a student\'s family comes from.', 'مع دبوس في كل بلد جاءت منه عائلة أحد الطلاب.'),
  },
  {
    id: 'room-art-wall', kind: 'accessory', target: 'classroom', slot: 'classroom-wall', price: 2,
    name: t('Student work wall', 'جدار أعمال الطلاب'),
    desc: t('Everyone\'s best piece of the month, not just the neatest.', 'أفضل عمل لكل طالب هذا الشهر، لا الأرتب فقط.'),
  },
  {
    id: 'desk-karak-mug', kind: 'accessory', target: 'classroom', slot: 'classroom-desk', price: 1,
    name: t('Karak mug', 'كوب الكرك'),
    desc: t('Still warm at the end of break, somehow.', 'ما زال دافئًا في نهاية الفسحة، بطريقة ما.'),
  },
  {
    id: 'desk-name-plate', kind: 'accessory', target: 'classroom', slot: 'classroom-desk', price: 1,
    name: t('Desk name plate', 'لوحة الاسم على المكتب'),
    desc: t('"Ms. Mariam", in Arabic and English.', '«الأستاذة مريم» بالعربية والإنجليزية.'),
  },
  {
    id: 'desk-pencil-pot', kind: 'accessory', target: 'classroom', slot: 'classroom-desk', price: 1,
    name: t('Spare pencil pot', 'علبة الأقلام الاحتياطية'),
    desc: t('For every "Miss, I forgot my pencil."', 'لكل «أستاذة، نسيت قلمي».'),
  },
  /* ---------------- Accessories: Ms. Mariam ---------------- */
  {
    id: 'mariam-lanyard', kind: 'accessory', target: 'mariam', slot: 'mariam-lanyard', price: 1,
    name: t('Teal lanyard', 'شريط بطاقة فيروزي'),
    desc: t('Keeps the staff card and the store-room key together.', 'يجمع بطاقة الموظفة ومفتاح المخزن معًا.'),
  },
  {
    id: 'mariam-tote', kind: 'accessory', target: 'mariam', slot: 'mariam-bag', price: 2,
    name: t('Marking tote bag', 'حقيبة التصحيح'),
    desc: t('Big enough for twenty-four notebooks.', 'تتّسع لأربعة وعشرين دفترًا.'),
  },
  /* ---------------- Accessories: Toki ---------------- */
  {
    id: 'toki-grad-cap', kind: 'accessory', target: 'toki', slot: 'toki-head', price: 3,
    name: t('Graduation cap', 'قبعة التخرّج'),
    desc: t('For the end of term.', 'لنهاية الفصل الدراسي.'),
  },
  {
    id: 'toki-reading-glasses', kind: 'accessory', target: 'toki', slot: 'toki-face', price: 2,
    name: t('Reading glasses', 'نظارة القراءة'),
    desc: t('Toki reads every exit ticket.', 'توكي يقرأ كل بطاقات الخروج.'),
  },

  /* ---------------- Power-ups (one use per lesson; see TEACHER_UI.md §8) ---------------- */
  {
    id: 'rewind', kind: 'powerup', price: 3,
    name: t('Rewind', 'إعادة اللحظة'),
    desc: t(
      'Take back your last choice and replay the moment. The notebook keeps both paths.',
      'تراجعي عن آخر اختيار وأعيدي اللحظة. ويحتفظ الدفتر بالمسارين.',
    ),
  },
  {
    id: 'extra-time', kind: 'powerup', price: 2,
    name: t('Extra 5 minutes', '٥ دقائق إضافية'),
    desc: t(
      'The next class is late back from PE: five more lesson minutes, in the last ten.',
      'الصف التالي تأخّر في العودة من حصة الرياضة: خمس دقائق إضافية للدرس، في آخر عشر دقائق.',
    ),
  },
  {
    id: 'assistant', kind: 'powerup', price: 3,
    name: t('Teaching assistant', 'معلمة مساعدة'),
    desc: t(
      'A colleague with a free period keeps one table working while you deal with a moment.',
      'زميلة لديها حصة فراغ تتابع طاولة واحدة بينما تتعاملين أنتِ مع موقف.',
    ),
  },
  {
    id: 'second-look', kind: 'powerup', price: 2,
    name: t('Second look', 'نظرة ثانية'),
    desc: t(
      'Look closer at one student\'s work before you choose, even after the moment has started.',
      'انظري عن قرب إلى عمل طالب قبل أن تختاري، حتى بعد أن يبدأ الموقف.',
    ),
  },
  {
    id: 'parent-call', kind: 'powerup', price: 2,
    name: t('Parent call', 'اتصال بولي الأمر'),
    desc: t(
      'Call one family before the lesson. You learn something about home, and that student starts a little more ready.',
      'اتصلي بعائلة طالب قبل الدرس. تعرفين شيئًا عن البيت، ويبدأ ذلك الطالب الدرس وهو أكثر استعدادًا قليلًا.',
    ),
  },
];
