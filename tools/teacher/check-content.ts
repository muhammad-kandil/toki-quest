/**
 * Content validator for the teacher game (src/teacher/data).
 * Run: npx vite-node tools/teacher/check-content.ts
 *
 * Static: ids exist and are unique; every Text has en + ar (ar has Arabic,
 * en has none); every hotspot opens an event; evidence profiles are coherent
 * (each profile gives a text for exactly the event's clues); every profile
 * leaves at least two choices; flags read are flags something sets; pool
 * events have a category + weight; XP values follow the proposal (30/50/100);
 * puzzle, endings and badges reference real ids; missions opened by endings
 * exist; shop + Term Pass references exist.
 *
 * Dynamic: a model of the engine plays each mission thousands of times
 * (random order, random choices, weighted profiles, weighted pool draws).
 * Every event, outcome and ending must be reachable, every run must end with
 * at least one eligible ending, no event may open twice, no run may loop.
 *
 * Engine model (documented in docs/content/TEACHER_CONTENT.md "Engine contract"):
 *  - untimed missions: all `schedule` events are hotspots open from the start;
 *    the player picks the order and may skip objects;
 *  - a student event with `investigate` draws one profile by weight when it
 *    opens, sets its flag, and shows only choices whose `ifFlag` is set
 *    (or that have none);
 *  - after each student encounter resolves, one pool event (has `category`,
 *    not scheduled, not opened by any outcome) is drawn by weight among the
 *    eligible, unseen ones; none eligible → back to exploration;
 *  - the milestone is reached when every student hotspot event is resolved;
 *    the player may still finish open events, then the mission closes with
 *    the eligible ending of lowest priority (others offered as choices);
 *  - a choice whose outcome id equals `puzzle.id` opens the puzzle first;
 *  - a flag `unlock:<missionId>` unlocks that mission;
 *  - timed missions (samples) use the clock model of the original demo.
 * Exit code 1 on any error.
 */
import { RESOURCES, LOCATIONS, SHOP_ITEMS, TERM_PASS, END_OF_TERM, UNIVERSE, TOOL_STATUS } from '../../src/teacher/data';
import { SAMPLE_ADVENTURES, LEGACY_MISSIONS as ADVENTURES } from '../../src/teacher/data/adventures';
import { checkUniverse } from './check-universe';
import type { Adventure, ClassEvent, Choice } from '../../src/teacher/types';

const errors: string[] = [];
const warns: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warns.push(m);
const AR = /[؀-ۿ]/;

function walkTexts(node: unknown, path: string) {
  if (Array.isArray(node)) return node.forEach((v, i) => walkTexts(v, `${path}[${i}]`));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if ('en' in o && 'ar' in o && Object.keys(o).length === 2) {
      const en = String(o.en ?? '').trim();
      const ar = String(o.ar ?? '').trim();
      if (!en) err(`${path}: empty en`);
      if (!ar) err(`${path}: empty ar`);
      if (ar && !AR.test(ar) && !/^[…\s.]+$/.test(ar)) err(`${path}: ar has no Arabic: "${ar}"`);
      if (AR.test(en)) err(`${path}: en contains Arabic`);
      return;
    }
    for (const [k, v] of Object.entries(o)) walkTexts(v, `${path}.${k}`);
  }
}
const uniq = (ids: string[], what: string) => {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) err(`duplicate ${what} id: ${id}`);
    seen.add(id);
  }
};

/* ---------------- catalog, campus, shop, pass ---------------- */
uniq(RESOURCES.map((r) => r.id), 'resource');
for (const r of RESOURCES) {
  walkTexts(r, `resource ${r.id}`);
  if (!['launch', 'facilitate', 'extend'].includes(r.stage)) err(`resource ${r.id}: bad stage`);
  if (!r.placeholder) err(`resource ${r.id}: must stay placeholder until Alef verifies`);
  if ([...r.icon].length !== 1) err(`resource ${r.id}: icon must be one glyph`);
  if (/\p{Extended_Pictographic}/u.test(r.icon) && !/[←-⯿]/.test(r.icon)) err(`resource ${r.id}: icon looks like an emoji`);
  if (!/^Try it Monday:/.test(r.monday.en)) err(`resource ${r.id}: monday must start "Try it Monday:"`);
}
uniq(LOCATIONS.map((l) => l.id), 'location');
for (const l of LOCATIONS) {
  walkTexts(l, `location ${l.id}`);
  if (l.x < 0 || l.x > 100 || l.y < 0 || l.y > 100) err(`location ${l.id}: x/y out of range`);
}
const resIds = new Set(RESOURCES.map((r) => r.id));
const locIds = new Set(LOCATIONS.map((l) => l.id));
const missionIds = new Set(ADVENTURES.map((a) => a.id));

uniq(SHOP_ITEMS.map((s) => s.id), 'shop item');
for (const s of SHOP_ITEMS) {
  walkTexts(s, `shop ${s.id}`);
  if (s.price <= 0 || !Number.isInteger(s.price)) err(`shop ${s.id}: price must be a positive integer`);
  if (s.kind !== 'powerup' && !s.slot) err(`shop ${s.id}: cosmetic needs a slot`);
}
const shopIds = new Set(SHOP_ITEMS.map((s) => s.id));
for (const p of ['rewind', 'extra-time', 'assistant', 'second-look', 'parent-call'])
  if (!SHOP_ITEMS.some((s) => s.id === p && s.kind === 'powerup')) err(`shop: missing power-up ${p}`);
if (TERM_PASS.length !== 12) err(`term pass: ${TERM_PASS.length} stages (want 12)`);
TERM_PASS.forEach((st, i) => {
  walkTexts(st, `term pass ${st.stage}`);
  if (st.stage !== i + 1) err(`term pass: stage ${st.stage} out of order`);
  if (st.classroom.kind === 'item' && !shopIds.has(st.classroom.id ?? '')) err(`term pass ${st.stage}: unknown item ${st.classroom.id}`);
  if (st.classroom.kind === 'notes' && !(st.classroom.notes! > 0)) err(`term pass ${st.stage}: notes must be > 0`);
  if (st.professional.kind === 'resource' && !resIds.has(st.professional.id ?? '')) err(`term pass ${st.stage}: unknown resource ${st.professional.id}`);
});
{
  const earned = TERM_PASS.reduce((n, s) => n + (s.classroom.notes ?? 0), 0) + END_OF_TERM.notes;
  const gifted = new Set(TERM_PASS.filter((s) => s.classroom.kind === 'item').map((s) => s.classroom.id));
  const cosmetics = SHOP_ITEMS.filter((s) => s.kind !== 'powerup');
  const toBuy = cosmetics.filter((s) => !gifted.has(s.id)).reduce((n, s) => n + s.price, 0);
  const pu = SHOP_ITEMS.filter((s) => s.kind === 'powerup');
  const avgPu = pu.reduce((n, s) => n + s.price, 0) / pu.length;
  console.log(`Shop: ${cosmetics.length} cosmetics (${toBuy} notes after pass gifts), ${pu.length} power-ups (avg ${avgPu.toFixed(1)}). Term earns ${earned} notes = ${Math.round((100 * Math.min(earned, toBuy)) / toBuy)}% of cosmetics, or ~80% + ${Math.floor((earned - 0.8 * toBuy) / avgPu)} power-ups.`);
  if (earned >= toBuy + 3 * avgPu) warn('shop: one term buys everything; consider raising prices');
  if (earned < 0.6 * toBuy) warn('shop: one term buys less than 60% of cosmetics');
}

/* ---------------- flags: who sets what, in mission order ---------------- */
const all = [...ADVENTURES, ...SAMPLE_ADVENTURES];
const setBy = new Map<string, number>();
const add = (f: string | undefined, i: number) => f && !setBy.has(f) && setBy.set(f, i);
all.forEach((a, i) => {
  a.students.forEach((s) => add(s.peek?.setFlag, i));
  a.outcomes.forEach((o) => add(o.setFlag, i));
  a.events.forEach((e) => e.investigate?.profiles.forEach((p) => add(p.setFlag, i)));
});

/* ---------------- static per adventure ---------------- */
uniq(ADVENTURES.map((a) => a.id), 'adventure');
const opened = new Set<string>(); // missions opened by endings / unlock flags
function checkAdventure(a: Adventure, ai: number, sample: boolean) {
  const P = `${sample ? 'sample' : 'mission'} ${a.id}`;
  walkTexts(a, P);
  if (!locIds.has(a.location)) err(`${P}: unknown location ${a.location}`);
  if (!a.takeaway) err(`${P}: missing takeaway`);
  const untimed = a.timed === false;
  const studentIds = new Set(a.students.map((s) => s.id));
  const objectIds = new Set(a.objects.map((o) => o.id));
  const targets = new Set([...studentIds, ...objectIds]);
  uniq([...a.students.map((s) => s.id), ...a.objects.map((o) => o.id)], `${P} student/object`);
  uniq(a.events.map((e) => e.id), `${P} event`);
  uniq(a.outcomes.map((o) => o.id), `${P} outcome`);
  const evIds = new Set(a.events.map((e) => e.id));
  const outIds = new Set(a.outcomes.map((o) => o.id));
  const badgeIds = new Set(a.badges.map((b) => b.id));
  const range = (n: number, lo: number, hi: number, what: string) => (n < lo || n > hi) && err(`${P}: ${n} ${what} (want ${lo}–${hi})`);
  range(a.students.length, 3, 4, 'students');
  range(a.objects.length, 1, 3, 'objects');
  range(a.badges.length, 2, 3, 'badges');
  if (a.communityExamples.length !== 2) err(`${P}: want 2 community examples`);
  for (const s of a.students) {
    if (!s.homeNote) err(`${P}: ${s.id} has no homeNote`);
    if (s.understanding < 0 || s.understanding > 3 || s.engagement < 0 || s.engagement > 3) err(`${P}: ${s.id} start state out of 0–3`);
  }
  for (const s of a.schedule) if (!evIds.has(s.event)) err(`${P}: schedule unknown event ${s.event}`);
  const scheduled = new Set(a.schedule.map((s) => s.event));
  const nextTargets = new Set(a.outcomes.filter((o) => o.next).map((o) => o.next!.event));
  if (untimed) {
    for (const id of targets) if (!a.events.some((e) => e.on === id && scheduled.has(e.id))) err(`${P}: hotspot ${id} opens no event`);
  }
  const checkFlag = (f: string, where: string) => {
    const i = setBy.get(f);
    if (i === undefined) err(`${P}: ${where} reads flag "${f}" that nothing sets`);
    else if (!sample && i > ai) err(`${P}: ${where} reads flag "${f}" set only by a later mission`);
  };
  for (const e of a.events) {
    const E = `${P} event ${e.id}`;
    if (!targets.has(e.on)) err(`${E}: on unknown ${e.on}`);
    const isPool = !!e.category;
    if (isPool) {
      if (!(e.weight! > 0)) err(`${E}: pool event needs weight > 0`);
      if (scheduled.has(e.id) || nextTargets.has(e.id)) err(`${E}: pool event must not be scheduled or opened by an outcome`);
      e.eligible?.flags?.forEach((f) => checkFlag(f, `${e.id} eligible`));
      e.eligible?.notFlags?.forEach((f) => checkFlag(f, `${e.id} eligible`));
    } else if (!scheduled.has(e.id) && !nextTargets.has(e.id)) err(`${E}: neither scheduled, pool, nor opened by an outcome`);
    const profFlags = new Set<string>();
    if (e.investigate) {
      const clueIds = e.investigate.clues.map((c) => c.id);
      uniq(clueIds, `${E} clue`);
      uniq(e.investigate.profiles.map((p) => p.id), `${E} profile`);
      if (e.investigate.minClues && e.investigate.minClues > clueIds.length) err(`${E}: minClues > clues`);
      for (const p of e.investigate.profiles) {
        if (!(p.weight > 0)) err(`${E}: profile ${p.id} weight must be > 0`);
        const keys = Object.keys(p.clues).sort().join(',');
        if (keys !== [...clueIds].sort().join(',')) err(`${E}: profile ${p.id} clues [${keys}] ≠ event clues [${clueIds}] (incoherent)`);
        profFlags.add(p.setFlag);
      }
    }
    const offered = (flag?: string) => e.choices.filter((c) => !c.ifFlag || c.ifFlag === flag);
    if (e.investigate) {
      for (const p of e.investigate.profiles) {
        const n = offered(p.setFlag).length;
        if (n < 2) err(`${E}: profile ${p.id} leaves ${n} choice(s)`);
      }
    } else {
      const n = e.choices.filter((c) => !c.ifFlag).length;
      if (n < (objectIds.has(e.on) ? 1 : 2)) err(`${E}: only ${n} ungated choice(s)`);
    }
    for (const c of e.choices) {
      if (c.ifFlag && !profFlags.has(c.ifFlag)) checkFlag(c.ifFlag, `${e.id} choice gate`);
      if (c.minutes < 0) err(`${E}: negative minutes`);
      if (untimed && c.minutes > 1) warn(`${E}: ${c.minutes} min in an untimed mission`);
      if (c.resource && !resIds.has(c.resource)) err(`${E}: unknown resource ${c.resource}`);
      const refs = typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome;
      refs.forEach((r, i) => {
        if (!outIds.has(r.outcome)) err(`${E}: unknown outcome ${r.outcome}`);
        if (r.ifFlag) checkFlag(r.ifFlag, e.id);
        if (i === refs.length - 1 && r.ifFlag) err(`${E}: conditional outcome list has no default`);
      });
    }
  }
  for (const o of a.outcomes) {
    const O = `${P} outcome ${o.id}`;
    if (o.next && !evIds.has(o.next.event)) err(`${O}: opens unknown event ${o.next.event}`);
    if (o.discover && !resIds.has(o.discover)) err(`${O}: discovers unknown resource ${o.discover}`);
    if (o.xp !== undefined && ![30, 50, 100].includes(o.xp)) err(`${O}: xp ${o.xp} (proposal: 30/50/100)`);
    if (o.setFlag?.startsWith('unlock:')) {
      const m = o.setFlag.slice(7);
      opened.add(m);
      if (!missionIds.has(m)) warn(`${O}: unlocks unauthored mission ${m}`);
    }
    for (const fx of o.effects) if (!studentIds.has(fx.student)) err(`${O}: affects unknown ${fx.student}`);
  }
  if (a.puzzle) {
    const z = a.puzzle;
    if (!outIds.has(z.id)) err(`${P}: no outcome with the puzzle id "${z.id}" (a choice must open it)`);
    if (!badgeIds.has(z.badge)) err(`${P}: puzzle badge ${z.badge} not in badges`);
    if (z.xp !== 100) err(`${P}: puzzle xp ${z.xp} (proposal: 100)`);
    for (const st of ['launch', 'facilitate', 'extend'] as const) if (!z.cards.some((c) => c.stages.includes(st))) err(`${P}: puzzle has no card for ${st}`);
    uniq(z.cards.map((c) => c.id), `${P} puzzle card`);
  }
  if (a.film) for (const f of a.film) {
    if (!f.picture) err(`${P}: film shot without picture`);
    if (f.who && !studentIds.has(f.who)) err(`${P}: film line by unknown ${f.who}`);
    if (!f.narration && !f.line) err(`${P}: film shot with no narration or line`);
  }
  if (untimed) {
    if (!a.endings?.length) err(`${P}: untimed mission needs endings`);
    if (!a.film?.length) err(`${P}: untimed mission needs an opening film`);
  }
  for (const en of a.endings ?? []) {
    en.when.flags?.forEach((f) => checkFlag(f, `ending ${en.id}`));
    en.when.notFlags?.forEach((f) => checkFlag(f, `ending ${en.id}`));
    if (en.badge && !badgeIds.has(en.badge)) err(`${P}: ending ${en.id} badge ${en.badge} not in badges`);
    for (const m of en.opens ?? []) {
      opened.add(m);
      if (!missionIds.has(m)) warn(`${P}: ending ${en.id} opens unauthored mission ${m}`);
    }
  }
  for (const b of a.badges) if (typeof b.when === 'object') checkFlag(b.when.flag, `badge ${b.id}`);
  if (a.badges[a.badges.length - 1].when !== 'always') err(`${P}: last badge must be 'always'`);
  a.teaser.forEach((x, i) => {
    if (x.ifFlag) checkFlag(x.ifFlag, 'teaser');
    if (i === a.teaser.length - 1 && x.ifFlag) err(`${P}: last teaser must have no ifFlag`);
  });
  if (!a.teaser.some((x) => x.ifFlag)) err(`${P}: teaser is not flag-dependent`);
  if (a.introBubbles) for (const b of a.introBubbles) if (!studentIds.has(b.student)) err(`${P}: bubble for unknown ${b.student}`);
}
ADVENTURES.forEach((a, i) => checkAdventure(a, i, false));
SAMPLE_ADVENTURES.forEach((a, i) => checkAdventure(a, i, true));
ADVENTURES.slice(1).forEach((a) => !opened.has(a.id) && err(`mission ${a.id}: nothing opens it`));

/* ---------------- simulation ---------------- */
let seed = 20261126;
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const pick = <T,>(xs: T[]) => xs[Math.floor(rnd() * xs.length)];
const weighted = <T extends { weight?: number }>(xs: T[]) => {
  const total = xs.reduce((n, x) => n + (x.weight ?? 1), 0);
  let r = rnd() * total;
  for (const x of xs) if ((r -= x.weight ?? 1) <= 0) return x;
  return xs[xs.length - 1];
};
const RUNS = 8000;
const eligibleNow = (el: { flags?: string[]; notFlags?: string[] } | undefined, flags: Record<string, boolean>) =>
  !el || ((el.flags ?? []).every((f) => flags[f]) && (el.notFlags ?? []).every((f) => !flags[f]));

function simulate(a: Adventure, ai: number) {
  const P = `${a.id}`;
  const untimed = a.timed === false;
  const prior = [...setBy.entries()].filter(([, i]) => i < ai).map(([f]) => f);
  const reachedEv = new Set<string>();
  const reachedOut = new Set<string>();
  const endingsEligible = new Set<string>();
  const endingsTop = new Map<string, number>();
  const badges = new Set<string>();
  const xpRuns: number[] = [];
  const studentIds = new Set(a.students.map((s) => s.id));
  const scheduled = new Set(a.schedule.map((s) => s.event));
  const pool = a.events.filter((e) => e.category);
  for (let run = 0; run < RUNS; run++) {
    const flags: Record<string, boolean> = {};
    for (const f of prior) if (rnd() < 0.5) flags[f] = true;
    const st: Record<string, [number, number]> = {};
    for (const s of a.students) st[s.id] = [s.understanding, s.engagement];
    const queue = a.schedule.map((s) => ({ event: s.event, at: untimed ? 0 : s.at }));
    const openCount = new Map<string, number>();
    const done = new Set<string>();
    const rewarded = new Set<string>();
    let xp = 0;
    let t = 0;
    for (let guard = 0; ; guard++) {
      if (guard > 200) {
        err(`${P}: a run did not end`);
        break;
      }
      for (const s of a.students) if (s.peek && !a.events.some((e) => e.on === s.id && done.has(e.id)) && rnd() < 0.15) flags[s.peek.setFlag] = true;
      const live = queue.filter((q) => (untimed || q.at <= t) && !done.has(q.event));
      if (untimed) {
        const milestone = a.events.filter((e) => scheduled.has(e.id) && studentIds.has(e.on)).every((e) => done.has(e.id));
        if (!live.length || (milestone && rnd() < 0.25)) break;
      } else {
        if (t >= a.lessonMinutes) break;
        if (!live.length) {
          const nxt = queue.filter((q) => !done.has(q.event) && q.at > t).sort((x, y) => x.at - y.at)[0];
          if (!nxt || nxt.at >= a.lessonMinutes) break;
          t = nxt.at;
          continue;
        }
      }
      const q = pick(live);
      const ev = a.events.find((e) => e.id === q.event)! as ClassEvent;
      reachedEv.add(ev.id);
      let profileFlag: string | undefined;
      if (ev.investigate) {
        const p = weighted(ev.investigate.profiles);
        profileFlag = p.setFlag;
        flags[p.setFlag] = true;
      }
      const offered = ev.choices.filter((c: Choice) => !c.ifFlag || flags[c.ifFlag]);
      if (!offered.length) {
        err(`${P}: event ${ev.id} offered no choices (profile ${profileFlag})`);
        done.add(ev.id);
        continue;
      }
      const c = pick(offered);
      const refs = typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome;
      const ref = refs.find((r) => !r.ifFlag || flags[r.ifFlag]) ?? refs[refs.length - 1];
      const o = a.outcomes.find((x) => x.id === ref.outcome)!;
      reachedOut.add(o.id);
      done.add(ev.id);
      t += c.minutes;
      if (o.xp && !rewarded.has(o.id)) (xp += o.xp), rewarded.add(o.id);
      if (a.puzzle && o.id === a.puzzle.id && !rewarded.has('puzzle')) (xp += a.puzzle.xp), rewarded.add('puzzle');
      for (const fx of o.effects) {
        const s = st[fx.student];
        s[0] = Math.max(0, Math.min(3, s[0] + (fx.understanding ?? 0)));
        s[1] = Math.max(0, Math.min(3, s[1] + (fx.engagement ?? 0)));
      }
      if (o.setFlag) flags[o.setFlag] = true;
      if (o.next) {
        const n = (openCount.get(o.next.event) ?? 0) + 1;
        openCount.set(o.next.event, n);
        if (n > 1 || scheduled.has(o.next.event)) err(`${P}: event ${o.next.event} opened twice in one run`);
        queue.push({ event: o.next.event, at: t + o.next.after });
      }
      // weighted pool draw after a student encounter
      if (pool.length && scheduled.has(ev.id) && studentIds.has(ev.on)) {
        const el = pool.filter((p) => !queue.some((q2) => q2.event === p.id) && eligibleNow(p.eligible, flags));
        if (el.length) queue.push({ event: weighted(el).id, at: t });
      }
    }
    xpRuns.push(xp);
    if (a.endings?.length) {
      const el = a.endings.filter((en) => eligibleNow(en.when, flags));
      if (!el.length) err(`${P}: a run ended with no eligible ending (flags: ${Object.keys(flags).filter((f) => f.startsWith(a.id)).join(' ')})`);
      el.forEach((en) => endingsEligible.add(en.id));
      if (el.length) {
        const top = el.sort((x, y) => x.priority - y.priority)[0];
        endingsTop.set(top.id, (endingsTop.get(top.id) ?? 0) + 1);
      }
    }
    const allGood = a.students.every((s) => st[s.id][0] + st[s.id][1] >= 5);
    const b = a.badges.find((x) => x.when === 'always' || (x.when === 'all-good' ? allGood : flags[x.when.flag]));
    if (b) badges.add(b.id);
  }
  for (const e of a.events) if (!reachedEv.has(e.id)) err(`${P}: event ${e.id} never reached`);
  for (const o of a.outcomes) if (!reachedOut.has(o.id)) err(`${P}: outcome ${o.id} never reached`);
  for (const en of a.endings ?? []) if (!endingsEligible.has(en.id)) err(`${P}: ending ${en.id} never eligible`);
  for (const b of a.badges) if (!badges.has(b.id) && !(a.puzzle?.badge === b.id) && !a.endings?.some((e) => e.badge === b.id)) err(`${P}: badge ${b.id} never awarded`);
  xpRuns.sort((x, y) => x - y);
  const ends = [...endingsTop.entries()].map(([k, v]) => `${k} ${Math.round((100 * v) / RUNS)}%`).join(', ');
  console.log(
    `  ${a.id.padEnd(9)} ${a.title.en.padEnd(28)} ev ${String(a.events.length).padStart(2)} · out ${String(a.outcomes.length).padStart(2)} · XP ${xpRuns[0]}–${xpRuns[xpRuns.length - 1]} (median ${xpRuns[RUNS >> 1]})${ends ? ' · endings ' + ends : ''}`,
  );
}

console.log(`NCLE tools ${RESOURCES.length} · places ${LOCATIONS.length} · legacy missions ${ADVENTURES.length} · samples ${SAMPLE_ADVENTURES.length}`);
ADVENTURES.forEach((a, i) => simulate(a, i));
SAMPLE_ADVENTURES.forEach((a) => simulate(a, ADVENTURES.length));
checkUniverse(UNIVERSE, RESOURCES, TOOL_STATUS, err, warn);
for (const w of warns) console.log('warn  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(errors.length ? `\n${errors.length} error(s)` : '\nContent OK');
process.exit(errors.length ? 1 : 0);
