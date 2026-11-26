/**
 * DEV PLACEHOLDER — Campus Shop items. Read only through getShop()
 * (src/teacher/content.ts) so content can move it to data/ later.
 *
 * Guardrail (client): only outfits, accessories and power-ups are ever
 * sold, priced in Thank-you notes (earned only from the Term Pass).
 * Alef resources, story chapters and the certificate are never sold.
 * No real money, no paid lane, no timers, no limited offers.
 *
 * Balance: the Term Pass pays 44 notes over a full term (8 + 10 + 10 +
 * the 16-note end-of-term bundle). Cosmetics total 43; power-ups cost 2.
 * A teacher who finishes the term can buy most cosmetics and a handful
 * of power-ups, never everything.
 */
import { t, type Text } from '../../i18n/types';

export type ShopKind = 'outfit' | 'accessory' | 'powerup';
/** Where an item goes when used. Power-ups have no slot (consumables). */
export type ShopSlot = 'window' | 'wall' | 'corner' | 'desk' | 'toki' | 'toki-hat' | 'mariam' | 'mariam-acc';
export type PowerupId = 'rewind' | 'extra5' | 'assistant' | 'second-look' | 'parent-call';

export interface ShopItem {
  id: string;
  kind: ShopKind;
  slot?: ShopSlot;
  /** One glyph shown on the card (no emoji). */
  icon: string;
  /** Toki outfit: skin id from src/data/skins.ts. */
  skin?: string;
  /** Ms. Mariam outfit: a theme.css colour variable for her portrait ring. */
  colour?: string;
  /** Power-up this item is (consumable; bought one at a time). */
  powerup?: PowerupId;
  name: Text;
  /** Power-up: what it does in a lesson. */
  what?: Text;
  /** Price in Thank-you notes. */
  price: number;
}

/** Where decor slots show on the classroom scene picture (% of the picture). */
export const DECOR_SLOT_POS: Partial<Record<ShopSlot, { x: number; y: number }>> = {
  window: { x: 10, y: 16 },
  wall: { x: 42, y: 10 },
  corner: { x: 90, y: 90 },
  desk: { x: 10, y: 90 },
};
export const DECOR_SLOTS: ShopSlot[] = ['window', 'wall', 'corner', 'desk'];

export const SHOP_FIXTURE: ShopItem[] = [
  // ---- Outfits: Toki (skins.ts) + Ms. Mariam ----
  { id: 'outfit-cap-teal', kind: 'outfit', slot: 'toki', icon: '◠', skin: 'cap-teal', price: 3, name: t('Toki: teal cap', 'توكي: القبعة الفيروزية') },
  { id: 'outfit-cap-orange', kind: 'outfit', slot: 'toki', icon: '◠', skin: 'cap-orange', price: 3, name: t('Toki: orange cap', 'توكي: القبعة البرتقالية') },
  { id: 'outfit-basketball', kind: 'outfit', slot: 'toki', icon: '●', skin: 'basketball', price: 4, name: t('Toki: basketball', 'توكي: كرة السلة') },
  { id: 'outfit-headwrap-a', kind: 'outfit', slot: 'toki', icon: '◡', skin: 'headwrap-a', price: 4, name: t('Toki: headwrap', 'توكي: غطاء الرأس') },
  { id: 'mariam-teal', kind: 'outfit', slot: 'mariam', icon: '❖', colour: 'var(--t-teal)', price: 3, name: t('Ms. Mariam: teal abaya', 'الأستاذة مريم: عباءة فيروزية') },
  { id: 'mariam-indigo', kind: 'outfit', slot: 'mariam', icon: '❖', colour: 'var(--t-indigo)', price: 3, name: t('Ms. Mariam: indigo blazer', 'الأستاذة مريم: سترة نيلية') },
  // ---- Accessories: classroom decor, desk items, Ms. Mariam's things, Toki hats ----
  { id: 'decor-plant', kind: 'accessory', slot: 'window', icon: '❦', price: 2, name: t('Window plant', 'نبتة النافذة') },
  { id: 'decor-lamp', kind: 'accessory', slot: 'window', icon: '☼', price: 2, name: t('Sun lamp', 'مصباح الشمس') },
  { id: 'decor-wall', kind: 'accessory', slot: 'wall', icon: '▦', price: 3, name: t('Thinking wall', 'جدار التفكير') },
  { id: 'decor-map', kind: 'accessory', slot: 'wall', icon: '◍', price: 3, name: t('World map', 'خريطة العالم') },
  { id: 'decor-reading', kind: 'accessory', slot: 'corner', icon: '❑', price: 3, name: t('Reading corner', 'ركن القراءة') },
  { id: 'desk-pencils', kind: 'accessory', slot: 'desk', icon: '✐', price: 2, name: t('Pencil pot', 'علبة الأقلام') },
  { id: 'mariam-mug', kind: 'accessory', slot: 'mariam-acc', icon: '◘', price: 2, name: t('Ms. Mariam’s mug', 'كوب الأستاذة مريم') },
  { id: 'mariam-bag', kind: 'accessory', slot: 'mariam-acc', icon: '▣', price: 3, name: t('Ms. Mariam’s bag', 'حقيبة الأستاذة مريم') },
  { id: 'toki-gradcap', kind: 'accessory', slot: 'toki-hat', icon: '▲', price: 3, name: t('Toki: graduation cap', 'توكي: قبعة التخرّج') },
  // ---- Power-ups: one use each per adventure; none reveals an answer or skips a decision ----
  { id: 'pu-rewind', kind: 'powerup', powerup: 'rewind', icon: '↶', price: 2, name: t('Rewind', 'اِرجع خطوة'),
    what: t('Undo your last choice and pick again. Your notebook keeps both branches.', 'تراجعي عن اختيارك الأخير واختاري من جديد. يحتفظ دفترك بالفرعين.') },
  { id: 'pu-extra5', kind: 'powerup', powerup: 'extra5', icon: '+5', price: 2, name: t('Extra 5 minutes', '٥ دقائق إضافية'),
    what: t('This lesson runs five minutes longer.', 'يمتدّ هذا الدرس خمس دقائق.') },
  { id: 'pu-assistant', kind: 'powerup', powerup: 'assistant', icon: '♙', price: 2, name: t('Teaching assistant', 'مساعدة التدريس'),
    what: t('Handles one unexpected challenge for you: no time spent, no change to students.', 'تتولّى تحديًا غير متوقع واحدًا عنكِ: بلا وقت، وبلا تغيير على الطلاب.') },
  { id: 'pu-second-look', kind: 'powerup', powerup: 'second-look', icon: '◎', price: 2, name: t('Second look', 'نظرة ثانية'),
    what: t('Shows what one student’s page says, as if you had looked closer.', 'تُظهر ما في ورقة أحد الطلاب، كأنكِ نظرتِ عن قرب.') },
  { id: 'pu-parent-call', kind: 'powerup', powerup: 'parent-call', icon: '☏', price: 2, name: t('Parent call', 'اتصال بوليّ الأمر'),
    what: t('Before the lesson, hear one student’s home context.', 'قبل الدرس، تعرّفي على ظروف أحد الطلاب في البيت.') },
];
