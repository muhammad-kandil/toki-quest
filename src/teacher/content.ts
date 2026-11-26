/**
 * The engine's only door to content. Real data from src/teacher/data; the
 * dev fixtures only while that data is empty. Content shapes that differ
 * from the engine's (shop, Term Pass) are adapted here, nowhere else.
 */
import { ADVENTURES, END_OF_TERM, LOCATIONS, RESOURCES, SHOP_ITEMS, TERM_PASS } from './data';
import type { ShopItem as DataShopItem } from './data/shop';
import type { TermPassStage } from './data/termPass';
import { FIXTURE_ADVENTURES, FIXTURE_LOCATIONS, FIXTURE_RESOURCES } from './dev/fixture';
import { TERM_PASS_FIXTURE, type TermPass, type TermReward } from './dev/termPassFixture';
import { SHOP_FIXTURE, type PowerupId, type ShopItem, type ShopSlot } from './dev/shopFixture';
import { isSellable } from './engine/shop';
import { validateAdventure } from './engine/validate';
import { t } from '../i18n/types';
import type { Adventure, AlefResource, Location } from './types';

/**
 * Customisation (Term Pass, Campus Shop, Thank-you notes, power-ups).
 * Client decision 2026-11-26: ships. false removes all of it from the UI.
 */
export const ENABLE_CUSTOMISATION: boolean = true;
/** No mentor character in the teacher game (Alef proposal): Toki items are hidden or retargeted. */
export const TOKI_IN_TEACHER_GAME: boolean = false;

export const USING_FIXTURE = ADVENTURES.length === 0;

export const adventures = (): Adventure[] => (USING_FIXTURE ? FIXTURE_ADVENTURES : ADVENTURES);
export const locations = (): Location[] =>
  (USING_FIXTURE ? FIXTURE_LOCATIONS : LOCATIONS).filter((l) => ENABLE_CUSTOMISATION || l.kind !== 'shop');
export const resources = (): AlefResource[] => (USING_FIXTURE || !RESOURCES.length ? FIXTURE_RESOURCES : RESOURCES);
export const adventure = (id: string) => adventures().find((a) => a.id === id);
export const resource = (id: string) => resources().find((r) => r.id === id);
export const location = (id: string) => locations().find((l) => l.id === id);
export const adventuresAt = (locId: string) => adventures().filter((a) => a.location === locId);

/* ------------------------------------------------------------------ */
/* Shop: data/shop.ts (SHOP_ITEMS) → engine ShopItem                   */
/* ------------------------------------------------------------------ */

const SLOT_MAP: Record<string, ShopSlot> = {
  'classroom-window': 'window', 'classroom-wall': 'wall', 'classroom-shelf': 'corner', 'classroom-desk': 'desk',
  'mariam-outfit': 'mariam', 'mariam-lanyard': 'mariam-acc', 'mariam-bag': 'mariam-acc',
  'toki-outfit': 'toki', 'toki-head': 'toki-hat', 'toki-face': 'toki-hat',
};
const POWERUP_MAP: Record<string, PowerupId> = {
  rewind: 'rewind', 'extra-time': 'extra5', assistant: 'assistant', 'second-look': 'second-look', 'parent-call': 'parent-call',
};
const POWERUP_ICON: Record<PowerupId, string> = { rewind: '↶', extra5: '+5', assistant: 'TA', 'second-look': '◎', 'parent-call': '☏' };
const ICON: Record<string, string> = {
  'room-plant': '❦', 'room-reading-lamp': '☼', 'room-bookshelf': '❑', 'room-science-corner': '◬', 'room-fraction-poster': '½',
  'room-world-map': '◍', 'room-art-wall': '▦', 'desk-karak-mug': '◘', 'desk-name-plate': '▭', 'desk-pencil-pot': '✐',
  'mariam-lanyard': '◊', 'mariam-tote': '▣',
};
const MARIAM_COLOUR: Record<string, string> = {
  'mariam-abaya-teal': 'var(--t-teal)', 'mariam-national-day': 'var(--t-rose)', 'mariam-lab-coat': 'var(--t-blue)', 'mariam-sports': 'var(--t-orange)',
};

function adaptShopItem(d: DataShopItem): ShopItem {
  const powerup = d.kind === 'powerup' ? POWERUP_MAP[d.id] : undefined;
  const slot = d.slot ? SLOT_MAP[d.slot] : undefined;
  return {
    id: d.id,
    kind: d.kind,
    slot,
    icon: powerup ? POWERUP_ICON[powerup] : ICON[d.id] ?? (d.target === 'mariam' ? '❖' : '◆'),
    skin: d.target === 'toki' && d.kind === 'outfit' ? d.id.replace(/^toki-/, '') : undefined,
    colour: d.target === 'mariam' && d.kind === 'outfit' ? MARIAM_COLOUR[d.id] ?? 'var(--t-indigo)' : undefined,
    powerup,
    name: d.name,
    what: d.desc,
    price: d.price,
  };
}
const isToki = (id: string) => /^toki-/.test(id) || SHOP_ITEMS.some((s) => s.id === id && s.target === 'toki');

const REAL_SHOP: ShopItem[] = SHOP_ITEMS.map(adaptShopItem);
/** Shop items: data/shop.ts, else the fixture. Guardrail: only outfits/accessories/power-ups; Toki hidden. */
export const getShop = (): ShopItem[] =>
  (REAL_SHOP.length ? REAL_SHOP : SHOP_FIXTURE)
    .filter((i) => isSellable(i) && (i.kind !== 'powerup' || !!i.powerup) && (TOKI_IN_TEACHER_GAME || (!i.skin && !isToki(i.id))));
/** Any item by id, including ones the shop hides (Term Pass grants). */
export const shopItem = (id: string) => getShop().find((i) => i.id === id);

/* ------------------------------------------------------------------ */
/* Term Pass: data/termPass.ts (TERM_PASS, END_OF_TERM) → engine TermPass */
/* ------------------------------------------------------------------ */

/** Toki rewards in the pass are retargeted to Ms. Mariam where an equivalent exists, else paid as notes. */
const TOKI_RETARGET: Record<string, string> = { 'toki-cap-teal': 'mariam-abaya-teal' };

const TEXT_PENDING = t('Full text coming from the content team.', 'النص الكامل قادم من فريق المحتوى.');
const PRO_KIND: Record<TermPassStage['professional']['kind'], TermReward['kind']> = {
  resource: 'resource', chapter: 'story', planner: 'planner', spotlight: 'spotlight',
};
const PRO_ICON: Record<TermReward['kind'], string> = {
  decor: '❦', outfit: '❖', notes: '✉', resource: '◆', story: '❡', planner: '☐', spotlight: '✦', certificate: '✺',
};

function adaptPass(): TermPass | undefined {
  if (!TERM_PASS.length) return undefined;
  const stages = TERM_PASS.map((s) => {
    let classroom: TermReward;
    const n = s.stage;
    let itemId = s.classroom.kind === 'item' ? s.classroom.id : undefined;
    if (itemId && !TOKI_IN_TEACHER_GAME && isToki(itemId)) itemId = TOKI_RETARGET[itemId];
    const orig = s.classroom.kind === 'item' ? SHOP_ITEMS.find((x) => x.id === s.classroom.id) : undefined;
    const item = itemId ? shopItem(itemId) : undefined;
    if (item) {
      classroom = { id: `tp${n}-c`, kind: item.kind === 'outfit' ? 'outfit' : 'decor', ref: item.id, icon: item.icon, title: item.name, body: item.what ?? item.name };
    } else {
      const amount = s.classroom.kind === 'notes' ? s.classroom.notes ?? 0 : orig?.price ?? 2;
      classroom = { id: `tp${n}-c`, kind: 'notes', amount, icon: '✉', title: t(`+${amount} Thank-you notes`, `+${amount} بطاقات شكر`), body: t('Notes from your students. Spend them in the campus shop.', 'بطاقات من طلابك. استخدميها في متجر المدرسة.') };
    }
    const p = s.professional;
    const kind = PRO_KIND[p.kind];
    const res = p.kind === 'resource' && p.id ? resource(p.id) : undefined;
    const professional: TermReward = {
      id: `tp${n}-p`, kind, ref: p.id, icon: res?.icon ?? PRO_ICON[kind], title: p.label, body: res ? res.what : TEXT_PENDING,
    };
    return { n, classroom, professional };
  });
  return {
    id: 'term1',
    name: t('Term 1 · one step per lesson', 'الفصل الأول · خطوة لكل درس'),
    stages,
    certificate: {
      id: 'tp-cert', kind: 'certificate', icon: '✺', amount: END_OF_TERM.notes,
      title: t('Term certificate', 'شهادة الفصل'),
      body: t(`For a term of lessons that changed what happened next. Comes with ${END_OF_TERM.notes} Thank-you notes.`, `تقديرًا لفصل من الدروس غيّرت ما حدث بعدها. ومعها ${END_OF_TERM.notes} بطاقة شكر.`),
    },
  };
}
const REAL_PASS = adaptPass();
/** Term Pass stages/rewards: data/termPass.ts, else the dev fixture. */
export const getTermPass = (): TermPass => REAL_PASS ?? TERM_PASS_FIXTURE;

/** Community link from Alef. Empty until Alef shares it → "coming soon". */
export const COMMUNITY_URL = '';

if (import.meta.env.DEV) {
  const rid = resources().map((r) => r.id);
  const aid = adventures().map((a) => a.id);
  const errs = adventures().flatMap((a) => validateAdventure(a, rid, aid));
  if (errs.length) console.warn('[teacher] content check:\n' + errs.join('\n'));
  const ph = resources().filter((r) => r.placeholder).length;
  if (ph) console.info(`[teacher] ${ph} resource card(s) are placeholders awaiting Alef confirmation.`);
}
