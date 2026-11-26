/** Term Pass reward rules (pure). Stage progress itself lives in save.ts. */
import type { TermPass, TermReward } from '../dev/termPassFixture';
import type { ShopItem } from '../dev/shopFixture';
import { claimReward, type GameSave } from './save';
import { grant } from './shop';

export interface RewardSlot { reward: TermReward; stage: number }

export function allSlots(tp: TermPass): RewardSlot[] {
  const out: RewardSlot[] = [];
  for (const s of tp.stages) out.push({ reward: s.classroom, stage: s.n }, { reward: s.professional, stage: s.n });
  out.push({ reward: tp.certificate, stage: tp.stages.length });
  return out;
}

export type SlotState = 'locked' | 'ready' | 'claimed';

export function slotState(save: GameSave, slot: RewardSlot): SlotState {
  if (save.pass.claimed.includes(slot.reward.id)) return 'claimed';
  return save.pass.stage >= slot.stage ? 'ready' : 'locked';
}

export interface ClaimDeps {
  resourceExists: (id: string) => boolean;
  shopItem: (id: string) => ShopItem | undefined;
}

/**
 * Claim + its effect:
 *  resource → joins the toolkit; decor/outfit → owned (+ placed if the slot is empty);
 *  notes / certificate → Thank-you notes (the only way notes are earned).
 */
export function applyClaim(save: GameSave, slot: RewardSlot, deps: ClaimDeps): GameSave {
  let s = claimReward(save, slot.reward.id, slot.stage);
  if (s === save) return s;
  const r = slot.reward;
  if (r.kind === 'resource' && r.ref && deps.resourceExists(r.ref) && !s.toolkit.includes(r.ref)) s = { ...s, toolkit: [...s.toolkit, r.ref] };
  if ((r.kind === 'decor' || r.kind === 'outfit') && r.ref) {
    const item = deps.shopItem(r.ref);
    if (item) s = grant(s, item);
  }
  if ((r.kind === 'notes' || r.kind === 'certificate') && r.amount && r.amount > 0) s = { ...s, notes: s.notes + Math.floor(r.amount) };
  return s;
}

export const termComplete = (save: GameSave, tp: TermPass) => save.pass.stage >= tp.stages.length;
