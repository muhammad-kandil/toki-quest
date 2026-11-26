/** Content checks (dev builds + tests): every reference in an adventure resolves. */
import type { Adventure } from '../types';

export function validateAdventure(adv: Adventure, resourceIds: string[], adventureIds: string[]): string[] {
  const errs: string[] = [];
  const ev = new Set(adv.events.map((e) => e.id));
  const out = new Set(adv.outcomes.map((o) => o.id));
  const targets = new Set([...adv.students.map((s) => s.id), ...adv.objects.map((o) => o.id)]);
  const flags = new Set<string>();
  adv.outcomes.forEach((o) => o.setFlag && flags.add(o.setFlag));
  adv.students.forEach((s) => s.peek && flags.add(s.peek.setFlag));
  adv.events.forEach((e) => e.investigate?.profiles.forEach((pr) => flags.add(pr.setFlag)));
  if (adv.puzzle) flags.add('puzzle:' + adv.puzzle.id);
  const p = `[${adv.id}]`;
  for (const q of adv.schedule) {
    if (!ev.has(q.event)) errs.push(`${p} schedule → unknown event ${q.event}`);
    if (q.at >= adv.lessonMinutes) errs.push(`${p} schedule ${q.event} at ${q.at} is after the bell`);
  }
  for (const e of adv.events) {
    if (!targets.has(e.on)) errs.push(`${p} event ${e.id} pulses on unknown ${e.on}`);
    if (!e.choices.length) errs.push(`${p} event ${e.id} has no choices`);
    e.choices.forEach((c, i) => {
      const ids = typeof c.outcome === 'string' ? [c.outcome] : c.outcome.map((x) => x.outcome);
      for (const id of ids) if (!out.has(id)) errs.push(`${p} ${e.id}#${i} → unknown outcome ${id}`);
      if (c.resource && !resourceIds.includes(c.resource)) errs.push(`${p} ${e.id}#${i} → unknown resource ${c.resource}`);
      if (c.ifFlag && !flags.has(c.ifFlag)) errs.push(`${p} ${e.id}#${i} → ifFlag ${c.ifFlag} never set`);
    });
    if (e.investigate) {
      const ids = e.investigate.clues.map((c) => c.id);
      for (const pr of e.investigate.profiles) for (const id of ids) if (!pr.clues[id]) errs.push(`${p} ${e.id} profile ${pr.id} has no text for clue ${id}`);
      if (!e.choices.some((c) => !c.ifFlag)) {
        for (const pr of e.investigate.profiles) if (!e.choices.some((c) => c.ifFlag === pr.setFlag)) errs.push(`${p} ${e.id} profile ${pr.id} leaves no choice`);
      }
    }
    for (const f of [...(e.eligible?.flags ?? []), ...(e.eligible?.notFlags ?? [])]) if (!flags.has(f)) errs.push(`${p} event ${e.id} eligibility flag ${f} never set`);
  }
  for (const o of adv.outcomes) {
    if (o.next && !ev.has(o.next.event)) errs.push(`${p} outcome ${o.id} → unknown event ${o.next.event}`);
    if (o.discover && !resourceIds.includes(o.discover)) errs.push(`${p} outcome ${o.id} → unknown tool ${o.discover}`);
    for (const fx of o.effects) if (!adv.students.some((s) => s.id === fx.student)) errs.push(`${p} outcome ${o.id} → unknown student ${fx.student}`);
  }
  for (const b of adv.badges) if (typeof b.when === 'object' && !flags.has(b.when.flag)) errs.push(`${p} badge ${b.id} → flag ${b.when.flag} never set here`);
  for (const en of adv.endings ?? []) {
    for (const f of [...(en.when.flags ?? []), ...(en.when.notFlags ?? [])]) if (!flags.has(f)) errs.push(`${p} ending ${en.id} flag ${f} never set`);
    if (en.badge && !adv.badges.some((b) => b.id === en.badge)) errs.push(`${p} ending ${en.id} → unknown badge ${en.badge}`);
    for (const o of en.opens ?? []) if (!adventureIds.includes(o)) errs.push(`${p} ending ${en.id} opens ${o} (not written yet)`);
  }
  if (adv.puzzle) {
    if (!adv.badges.some((b) => b.id === adv.puzzle!.badge)) errs.push(`${p} puzzle → unknown badge ${adv.puzzle.badge}`);
    for (const c of adv.puzzle.cards) if (!c.stages.length) errs.push(`${p} puzzle card ${c.id} has no stage`);
  }
  if (adv.timed === false && !(adv.endings ?? []).length) errs.push(`${p} untimed mission has no endings`);
  if (!adv.badges.length) errs.push(`${p} has no badges`);
  if (!adv.teaser.length) errs.push(`${p} has no teaser`);
  if (adv.unlocks && !adventureIds.includes(adv.unlocks)) errs.push(`${p} unlocks ${adv.unlocks} (not written yet)`);
  return errs;
}
