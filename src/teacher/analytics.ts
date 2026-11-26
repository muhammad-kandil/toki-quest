/**
 * Teacher-game analytics (GAME_PACKAGE.md "Save, platform, privacy, analytics").
 *
 * One `track()` for every event. Events are queued (memory + localStorage,
 * capped) and POSTed in batches to the existing record-progress function as
 * `{ initData, action: 'events', events }` — only when VITE_PROGRESS_URL is set
 * and the game runs inside Telegram (signed initData). Never blocks the UI,
 * never throws. No names, no free text: ids and small enums only.
 *
 * BACKEND (not deployed here): record-progress needs an `events` action that
 * validates initData server-side, checks each event name against the list
 * below, stores rows keyed by the pseudonymous player key, and keeps the three
 * families apart (engagement / learning behaviour / platform adoption).
 */
import { retrieveRawInitData } from '@telegram-apps/sdk-react';

export type EventName =
  | 'game_open' | 'scenario_enter' | 'hotspot_tap' | 'evidence_reveal' | 'choice_commit' | 'tool_discovered'
  | 'scenario_complete' | 'ending_reached' | 'replay_started' | 'resume_success' | 'language_change' | 'accessibility_setting_change';

/** Which family an event belongs to (kept separate in storage and reports). */
export const FAMILY: Record<EventName, 'engagement' | 'learning' | 'adoption'> = {
  game_open: 'engagement', replay_started: 'engagement', resume_success: 'engagement', language_change: 'engagement',
  accessibility_setting_change: 'engagement', scenario_enter: 'engagement', scenario_complete: 'engagement', ending_reached: 'engagement',
  hotspot_tap: 'learning', evidence_reveal: 'learning', choice_commit: 'learning',
  tool_discovered: 'adoption',
};

export interface TrackedEvent { name: EventName; family: string; at: number; props: Record<string, string | number | boolean> }

const KEY = 'toki:teacher:events';
const MAX = 200;
const BATCH = 25;
const URL_ = import.meta.env.VITE_PROGRESS_URL as string | undefined;

let queue: TrackedEvent[] = load();
let timer: number | undefined;
let context: Record<string, string | number> = {};

function load(): TrackedEvent[] {
  try { const r = JSON.parse(window.localStorage.getItem(KEY) || '[]'); return Array.isArray(r) ? r.slice(-MAX) : []; } catch { return []; }
}
function persist() { try { window.localStorage.setItem(KEY, JSON.stringify(queue.slice(-MAX))); } catch { /* ignore */ } }

/** Context added to every event (content version, session number, language). */
export function setTrackContext(c: Record<string, string | number>) { context = { ...context, ...c }; }

export function track(name: EventName, props: Record<string, string | number | boolean | undefined> = {}) {
  try {
    const clean: Record<string, string | number | boolean> = { ...context };
    for (const [k, v] of Object.entries(props)) if (v !== undefined) clean[k] = typeof v === 'string' ? v.slice(0, 64) : v;
    queue.push({ name, family: FAMILY[name], at: Date.now(), props: clean });
    if (queue.length > MAX) queue = queue.slice(-MAX);
    persist();
    const dbg = (window as unknown as { __tokiTrack?: TrackedEvent[] }).__tokiTrack;
    if (dbg) dbg.push(queue[queue.length - 1]);
    schedule();
  } catch { /* analytics never breaks the game */ }
}

function initData(): string | null {
  const w = (window as unknown as { Telegram?: { WebApp?: { initData?: string } } }).Telegram?.WebApp?.initData;
  if (w) return w;
  try { const r = retrieveRawInitData(); if (r) return r; } catch { /* not in Telegram */ }
  return null;
}

function schedule() {
  if (!URL_ || timer) return;
  timer = window.setTimeout(() => { timer = undefined; void flush(); }, 4000);
}

/** Send queued events in batches; keep them if the request fails. */
export async function flush(): Promise<void> {
  if (!URL_ || !queue.length) return;
  const data = initData();
  if (!data) return;
  const batch = queue.slice(0, BATCH);
  try {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(URL_, {
      method: 'POST', headers: { 'content-type': 'application/json' }, keepalive: true, signal: ctrl.signal,
      body: JSON.stringify({ initData: data, action: 'events', events: batch }),
    });
    window.clearTimeout(t);
    if (res.ok) { queue = queue.slice(batch.length); persist(); if (queue.length) schedule(); }
  } catch { /* retry on next event / next open */ }
}

/** For tests/QA: the queued events. */
export const queued = () => queue.slice();
