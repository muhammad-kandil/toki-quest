/**
 * Campus places and pin positions (on public/art/campus.jpg, portrait 3:4).
 * Owned by the content designer. x/y are TEMPORARY until the campus art
 * exists; then tune them to the buildings in the picture.
 *
 * Layout idea (top to bottom): offices and staff spaces at the top,
 * the classroom block across the middle, open spaces (yard, canteen,
 * community board by the gate) at the bottom.
 */
import type { Location } from '../types';
import { t } from '../../i18n/types';

export const LOCATIONS: Location[] = [
  { id: 'office', kind: 'office', name: t("Principal's office", 'مكتب المديرة'), x: 50, y: 12 },
  { id: 'library', kind: 'library', name: t('Library', 'المكتبة'), x: 20, y: 22 },
  { id: 'staffroom', kind: 'staffroom', name: t('Staff room', 'غرفة المعلمين'), x: 80, y: 22 },
  { id: 'grade4', kind: 'classroom', name: t('Grade 4 classroom', 'فصل الصف الرابع'), x: 18, y: 42 },
  { id: 'grade5', kind: 'classroom', name: t('Grade 5 classroom', 'فصل الصف الخامس'), x: 50, y: 38 },
  { id: 'grade6', kind: 'classroom', name: t('Grade 6 classroom', 'فصل الصف السادس'), x: 82, y: 42 },
  { id: 'yard', kind: 'yard', name: t('Yard', 'الساحة'), x: 46, y: 64 },
  /* The contract has no 'canteen' kind; it is an ambient place like the yard. */
  { id: 'canteen', kind: 'yard', name: t('Canteen', 'المقصف'), x: 80, y: 72 },
  { id: 'shop', kind: 'shop', name: t('School store', 'متجر المدرسة'), x: 62, y: 84 },
  { id: 'community', kind: 'community', name: t('Community board', 'لوحة المجتمع'), x: 22, y: 82 },
];
