/** Dev helper: print every room, its teacher and stance (used to write the story bible). */
import { LEVELS, ACADEMY, WORLD_BOSSES, SCHOOL_VISITS, BOSS, ensureWorldLoaded } from '../../src/data/levels';

(async () => {
  for (let w = 2; w <= 8; w++) await ensureWorldLoaded(w);
  for (const l of [...Object.values(LEVELS), ...Object.values(ACADEMY)] as any[]) {
    console.log(l.id, '|', l.title.en, '|', l.subject?.en, '|', l.conversation?.teacherName?.en, '/', l.conversation?.teacherName?.ar, '|', l.conversation?.stance);
  }
  console.log('B6', BOSS.title.en);
  for (const b of Object.values(WORLD_BOSSES) as any[]) console.log('B', b.id, b.title.en, '|', b.title.ar);
  for (const v of Object.values(SCHOOL_VISITS) as any[]) console.log('V', v.id, v.title.en, '|', v.scenario.en.slice(0, 220));
})();
