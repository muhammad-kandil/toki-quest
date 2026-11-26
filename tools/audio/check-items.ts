/**
 * Checks tools/audio/items.json against the game content: every room,
 * challenge scene and visit context has signature sounds, and every
 * evidence hotspot has a tap sound. Exits non-zero on gaps.
 *   npx vite-node tools/audio/check-items.ts
 */
import { readFileSync } from 'node:fs';
import { LEVELS, ACADEMY, WORLD_BOSSES, SCHOOL_VISITS, BOSS, ensureWorldLoaded } from '../../src/data/levels';

async function main() {
  for (let w = 2; w <= 8; w++) await ensureWorldLoaded(w);
  const spec = JSON.parse(readFileSync('tools/audio/items.json', 'utf8'));
  const rooms = spec.rooms as Record<string, { signature: unknown[]; spots?: Record<string, { asset: string }> }>;
  const gaps: string[] = [];
  const need = (key: string) => { if (!rooms[key]?.signature?.length) gaps.push(`no signature: ${key}`); };
  for (const l of [...Object.values(LEVELS), ...Object.values(ACADEMY)] as { id: number; evidence?: { id: string }[] }[]) {
    need(String(l.id));
    for (const e of l.evidence ?? []) if (!rooms[String(l.id)]?.spots?.[e.id]) gaps.push(`no spot sound: ${l.id}/${e.id}`);
    for (const s of Object.keys(rooms[String(l.id)]?.spots ?? {})) if (!(l.evidence ?? []).some((e) => e.id === s)) gaps.push(`stale spot: ${l.id}/${s}`);
  }
  need(String(BOSS.id));
  for (const b of Object.values(WORLD_BOSSES)) for (const s of b.scenes) need(`${b.id}:${s.id}`);
  for (const v of Object.values(SCHOOL_VISITS)) for (const c of v.contexts) need(`${v.id}:${c.id}`);
  const files = new Set(Object.keys(spec.assets));
  for (const [k, r] of Object.entries(rooms)) {
    for (const x of [...(r.signature as { asset: string }[]), ...Object.values(r.spots ?? {})]) if (!files.has(x.asset)) gaps.push(`unknown asset ${x.asset} in ${k}`);
  }
  console.log(gaps.length ? gaps.join('\n') : `items.json covers every room, scene, context and hotspot (${Object.keys(rooms).length} rooms).`);
  if (gaps.length) process.exit(1);
}
main();
