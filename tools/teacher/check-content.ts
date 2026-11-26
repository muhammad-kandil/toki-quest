/**
 * Content validator for the teacher game (src/teacher/data).
 * Run: npx vite-node tools/teacher/check-content.ts
 *
 * Static checks: ids exist and are unique, every Text has en + ar (ar contains
 * Arabic, en does not), conditional lists end with a default, flags read are
 * flags somebody sets, counts are inside the content template.
 * Dynamic checks: a simple model of the engine plays each adventure thousands
 * of times with random choices, random peeks and random flags from earlier
 * adventures. Every event and outcome must be reached, no event may open
 * twice in one run, every run must end, and every badge must be awardable.
 *
 * Engine model (what the content assumes; see docs/content/TEACHER_CONTENT.md):
 *  - lesson clock starts at 0; schedule entries open at their minute;
 *  - an outcome's `next` opens `after` minutes after the choice is resolved;
 *  - an event opened at or after lessonMinutes is never played;
 *  - effects clamp each axis to 0..3; a student is "good" at u+e >= 5;
 *  - 'all-good' = every student good at the bell;
 *  - peeks are only available before that student's first event is answered.
 * Exit code 1 on any error.
 */
import { RESOURCES, LOCATIONS, ADVENTURES } from '../../src/teacher/data';
import type { Adventure, Choice } from '../../src/teacher/types';

const errors: string[] = [];
const warns: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warns.push(m);
const AR = /[؀-ۿ]/;

/* ---------- Text walker ---------- */
function walkTexts(node: unknown, path: string) {
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

/* ---------- catalog + campus ---------- */
uniq(RESOURCES.map((r) => r.id), 'resource');
if (RESOURCES.length < 12 || RESOURCES.length > 20) err(`resources: ${RESOURCES.length} (want 12–20)`);
for (const r of RESOURCES) {
  walkTexts(r, `resource ${r.id}`);
  if (!['launch', 'facilitate', 'extend'].includes(r.stage)) err(`resource ${r.id}: bad stage`);
  if (!r.placeholder) warn(`resource ${r.id}: not marked placeholder`);
  if ([...r.icon].length !== 1) err(`resource ${r.id}: icon must be one glyph`);
  if (!/^Try it Monday:/.test(r.monday.en)) warn(`resource ${r.id}: monday should start "Try it Monday:"`);
}
uniq(LOCATIONS.map((l) => l.id), 'location');
for (const l of LOCATIONS) {
  walkTexts(l, `location ${l.id}`);
  if (l.x < 0 || l.x > 100 || l.y < 0 || l.y > 100) err(`location ${l.id}: x/y out of range`);
}
const resIds = new Set(RESOURCES.map((r) => r.id));
const locIds = new Set(LOCATIONS.map((l) => l.id));
const usedRes = new Set<string>();

/* ---------- flags set anywhere, by adventure order ---------- */
const setBy = new Map<string, number>(); // flag -> index of first adventure that can set it
ADVENTURES.forEach((a, i) => {
  const add = (f?: string) => f && !setBy.has(f) && setBy.set(f, i);
  a.students.forEach((s) => add(s.peek?.setFlag));
  a.outcomes.forEach((o) => add(o.setFlag));
});

/* ---------- static adventure checks ---------- */
uniq(ADVENTURES.map((a) => a.id), 'adventure');
ADVENTURES.forEach((a, ai) => {
  const P = `adventure ${a.id}`;
  walkTexts(a, P);
  if (a.number !== ai + 1) err(`${P}: number ${a.number}, expected ${ai + 1}`);
  if (!locIds.has(a.location)) err(`${P}: unknown location ${a.location}`);
  if (!a.takeaway) err(`${P}: missing takeaway`);
  const next = ADVENTURES[ai + 1];
  if (next && a.unlocks !== next.id) err(`${P}: should unlock ${next.id}, unlocks ${a.unlocks}`);
  if (a.unlocks && !ADVENTURES.some((x) => x.id === a.unlocks)) err(`${P}: unlocks unknown ${a.unlocks}`);

  const studentIds = new Set(a.students.map((s) => s.id));
  const targets = new Set([...studentIds, ...a.objects.map((o) => o.id)]);
  uniq([...targets], `${P} student/object`);
  uniq(a.events.map((e) => e.id), `${P} event`);
  uniq(a.outcomes.map((o) => o.id), `${P} outcome`);
  const evIds = new Set(a.events.map((e) => e.id));
  const outIds = new Set(a.outcomes.map((o) => o.id));

  const range = (n: number, lo: number, hi: number, what: string) =>
    (n < lo || n > hi) && err(`${P}: ${n} ${what} (want ${lo}–${hi})`);
  range(a.students.length, 3, 4, 'students');
  range(a.objects.length, 1, 3, 'objects');
  range(a.outcomes.length, 12, 20, 'outcomes');
  range(a.badges.length, 2, 3, 'badges');
  if (a.communityExamples.length !== 2) err(`${P}: want 2 community examples`);
  if (a.lessonMinutes !== 40) warn(`${P}: lesson is ${a.lessonMinutes} min`);
  const scheduled = new Set(a.schedule.map((s) => s.event));
  const followUps = a.events.filter((e) => !scheduled.has(e.id) || e.kind === 'unexpected').length;
  if (a.schedule.length < 3) err(`${P}: needs at least 3 scheduled events`);
  range(followUps, 4, 7, 'follow-up/unexpected events');

  for (const s of a.students) {
    if (s.understanding < 0 || s.understanding > 3 || s.engagement < 0 || s.engagement > 3) err(`${P}: ${s.id} start state out of 0–3`);
    if (s.x < 0 || s.x > 100 || s.y < 0 || s.y > 100) err(`${P}: ${s.id} x/y out of range`);
  }
  for (const s of a.schedule) {
    if (!evIds.has(s.event)) err(`${P}: schedule unknown event ${s.event}`);
    if (s.at >= a.lessonMinutes) err(`${P}: ${s.event} scheduled after the bell`);
  }
  const checkFlag = (f: string, where: string) => {
    const i = setBy.get(f);
    if (i === undefined) err(`${P}: ${where} reads flag "${f}" that nothing sets`);
    else if (i > ai) err(`${P}: ${where} reads flag "${f}" set only by a later adventure`);
    else if (!f.startsWith(`${a.id}.`) && !/^a\d+\./.test(f)) warn(`${P}: flag "${f}" not namespaced`);
  };
  const outcomeRefs = (c: Choice) => (typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome);
  for (const e of a.events) {
    if (!targets.has(e.on)) err(`${P}: event ${e.id} on unknown ${e.on}`);
    if (e.choices.length < 2) err(`${P}: event ${e.id} has < 2 choices`);
    for (const c of e.choices) {
      if (c.minutes < 0) err(`${P}: ${e.id} negative minutes`);
      if (c.resource) {
        if (!resIds.has(c.resource)) err(`${P}: ${e.id} unknown resource ${c.resource}`);
        usedRes.add(c.resource);
      }
      const refs = outcomeRefs(c);
      refs.forEach((r, i) => {
        if (!outIds.has(r.outcome)) err(`${P}: ${e.id} unknown outcome ${r.outcome}`);
        if (r.ifFlag) checkFlag(r.ifFlag, `${e.id}`);
        if (i === refs.length - 1 && r.ifFlag) err(`${P}: ${e.id} conditional outcome list has no default`);
      });
    }
  }
  for (const o of a.outcomes) {
    if (o.next && !evIds.has(o.next.event)) err(`${P}: outcome ${o.id} opens unknown event ${o.next.event}`);
    for (const fx of o.effects) {
      if (!studentIds.has(fx.student)) err(`${P}: outcome ${o.id} affects unknown ${fx.student}`);
      for (const v of [fx.understanding, fx.engagement]) if (v !== undefined && (v < -3 || v > 3)) err(`${P}: ${o.id} effect out of range`);
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
});
for (const r of RESOURCES) if (!usedRes.has(r.id)) warn(`resource ${r.id} is never discoverable`);

/* ---------- simulation ---------- */
let seed = 12345;
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const pick = <T,>(xs: T[]) => xs[Math.floor(rnd() * xs.length)];
const RUNS = 6000;

function simulate(a: Adventure, ai: number) {
  const P = `adventure ${a.id}`;
  const priorFlags = [...setBy.entries()].filter(([, i]) => i < ai).map(([f]) => f);
  const reachedEv = new Set<string>();
  const reachedOut = new Set<string>();
  const badges = new Set<string>();
  const endings = new Set<string>();
  let longest = 0;
  for (let run = 0; run < RUNS; run++) {
    const flags: Record<string, boolean> = {};
    for (const f of priorFlags) if (rnd() < 0.5) flags[f] = true;
    const st: Record<string, [number, number]> = {};
    for (const s of a.students) st[s.id] = [s.understanding, s.engagement];
    const queue = a.schedule.map((s) => ({ event: s.event, at: s.at }));
    const opened = new Map<string, number>();
    for (const q of queue) opened.set(q.event, (opened.get(q.event) ?? 0) + 1);
    const done = new Set<string>();
    let t = 0;
    const path: string[] = [];
    for (let guard = 0; guard < 100; guard++) {
      if (guard === 99) err(`${P}: a run did not end`);
      // random peeks
      for (const s of a.students) {
        const answered = a.events.some((e) => e.on === s.id && done.has(e.id));
        if (s.peek && !answered && rnd() < 0.15) flags[s.peek.setFlag] = true;
      }
      const live = queue.filter((q) => q.at <= t && !done.has(q.event));
      if (!live.length) {
        const nxt = queue.filter((q) => !done.has(q.event) && q.at > t).sort((x, y) => x.at - y.at)[0];
        if (!nxt || nxt.at >= a.lessonMinutes || t >= a.lessonMinutes) break;
        t = nxt.at;
        continue;
      }
      if (t >= a.lessonMinutes) break;
      const q = pick(live);
      const ev = a.events.find((e) => e.id === q.event)!;
      reachedEv.add(ev.id);
      const c = pick(ev.choices);
      const refs = typeof c.outcome === 'string' ? [{ outcome: c.outcome }] : c.outcome;
      const ref = refs.find((r) => !r.ifFlag || flags[r.ifFlag]) ?? refs[refs.length - 1];
      const o = a.outcomes.find((x) => x.id === ref.outcome)!;
      reachedOut.add(o.id);
      path.push(o.id);
      done.add(ev.id);
      t += c.minutes;
      for (const fx of o.effects) {
        const s = st[fx.student];
        s[0] = Math.max(0, Math.min(3, s[0] + (fx.understanding ?? 0)));
        s[1] = Math.max(0, Math.min(3, s[1] + (fx.engagement ?? 0)));
      }
      if (o.setFlag) flags[o.setFlag] = true;
      if (o.next) {
        const n = (opened.get(o.next.event) ?? 0) + 1;
        opened.set(o.next.event, n);
        if (n > 1) err(`${P}: event ${o.next.event} opened twice in one run (path ${path.join(' > ')})`);
        queue.push({ event: o.next.event, at: t + o.next.after });
      }
    }
    longest = Math.max(longest, path.length);
    const allGood = a.students.every((s) => st[s.id][0] + st[s.id][1] >= 5);
    const b = a.badges.find((x) => x.when === 'always' || (x.when === 'all-good' ? allGood : flags[x.when.flag]))!;
    badges.add(b.id);
    endings.add(a.students.map((s) => (st[s.id][0] + st[s.id][1] >= 5 ? 'g' : st[s.id][0] + st[s.id][1] >= 3 ? 'm' : 'p')).join(''));
  }
  for (const e of a.events) if (!reachedEv.has(e.id)) err(`${P}: event ${e.id} never playable before the bell`);
  for (const o of a.outcomes) if (!reachedOut.has(o.id)) err(`${P}: outcome ${o.id} never reached`);
  for (const b of a.badges) if (!badges.has(b.id)) err(`${P}: badge ${b.id} never awarded`);
  if (endings.size < 3) err(`${P}: only ${endings.size} distinct endings`);
  console.log(
    `  ${a.id} ${a.title.en.padEnd(34)} ev ${String(a.events.length).padStart(2)} · out ${String(a.outcomes.length).padStart(2)} · endings ${String(endings.size).padStart(2)} · longest path ${longest} · badges ${[...badges].length}/${a.badges.length}`,
  );
}

console.log(`Resources ${RESOURCES.length} · places ${LOCATIONS.length} · adventures ${ADVENTURES.length}`);
ADVENTURES.forEach(simulate);
for (const w of warns) console.log('warn  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(errors.length ? `\n${errors.length} error(s)` : '\nContent OK');
process.exit(errors.length ? 1 : 0);
