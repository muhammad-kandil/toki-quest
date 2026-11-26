/**
 * Writes tools/art/out/scenes.json: one picture brief per room that shows a
 * scene image — id, title, subject, scenario, and the evidence hotspots with
 * their positions — straight from the level data, so the art follows the
 * content. Run: npx vite-node tools/art/export-scenes.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { LEVELS, WORLD_BOSSES, ACADEMY, SCHOOL_VISITS, BOSS, ensureWorldLoaded } from '../../src/data/levels';

interface Brief {
  id: string; kind: string; title: string; subject?: string; scenario: string;
  evidence: { id: string; label: string; x: number; y: number }[];
  teacher?: string;
}

type Spot = { id: string; label: { en: string }; x: number; y: number };

async function main() {
  for (let w = 2; w <= 8; w++) await ensureWorldLoaded(w);
  const out: Brief[] = [];
  const ev = (e?: Spot[]) => (e ?? []).map((s) => ({ id: s.id, label: s.label.en, x: s.x, y: s.y }));
  for (const l of Object.values(LEVELS))
    out.push({ id: `L${l.id}`, kind: 'classroom', title: l.title.en, subject: l.subject.en, scenario: l.scenario.en, evidence: ev(l.evidence), teacher: l.conversation?.teacherName.en });
  for (const a of Object.values(ACADEMY)) {
    const x = a as unknown as { subject?: { en: string }; evidence?: Spot[] };
    out.push({ id: `L${a.id}`, kind: 'academy', title: a.title.en, subject: x.subject?.en, scenario: a.scenario.en, evidence: ev(x.evidence), teacher: a.conversation?.teacherName.en });
  }
  out.push({ id: `B${BOSS.id}`, kind: 'boss', title: BOSS.title.en, scenario: BOSS.scenario.en, evidence: [] });
  for (const b of Object.values(WORLD_BOSSES))
    out.push({ id: `B${b.id}`, kind: 'world-boss', title: b.title.en, scenario: b.scenario.en, evidence: [] });
  for (const v of Object.values(SCHOOL_VISITS)) {
    out.push({ id: `V${v.id}`, kind: 'visit', title: v.title.en, scenario: v.scenario.en, evidence: [] });
    for (const c of v.contexts)
      out.push({
        id: `V${v.id}-${c.id}`, kind: 'visit-context', title: c.name.en,
        scenario: `${c.tag.en}. ${c.evidence.map((e) => e.body.en).join(' ')}`, evidence: [],
      });
  }
  mkdirSync('tools/art/out', { recursive: true });
  writeFileSync('tools/art/out/scenes.json', JSON.stringify(out, null, 1));
  console.log('scene briefs', out.length, out.reduce<Record<string, number>>((m, b) => ((m[b.kind] = (m[b.kind] ?? 0) + 1), m), {}));
}
main();
