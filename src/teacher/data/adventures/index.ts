/** All adventures in play order. Owned by the content designer. Each unlocks the next. */
import type { Adventure } from '../../types';
import { A1 } from './a1-different-needs';
import { A2 } from './a2-quiet-table';
import { A3 } from './a3-group-copies';
import { A4 } from './a4-data-day';

export const ADVENTURES: Adventure[] = [A1, A2, A3, A4];
