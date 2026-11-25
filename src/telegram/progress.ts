/**
 * Progress reporting to the admin-only store (Supabase Edge Function
 * `record-progress`; see backend/README.md).
 *
 * Fire-and-forget by design: the player's own save lives in Telegram
 * CloudStorage; this is a copy for the DLIS team's completion view.
 * If the URL isn't configured, the request fails, or we're not inside
 * Telegram (no signed initData), nothing happens and nothing is shown.
 */
import { retrieveRawInitData } from '@telegram-apps/sdk-react';

const URL = import.meta.env.VITE_PROGRESS_URL as string | undefined;

interface ProgressPayload {
  bestScores: Record<number, number>;
  badges: string[];
  lang?: string;
  /** levelId → step → attempts-to-correct (1 = first try). */
  attempts?: Record<number, Record<string, number>>;
  /** levelId → conversation outcome. */
  outcomes?: Record<number, 'restored' | 'partial' | 'unchanged'>;
}

/**
 * The signed launch data Telegram gives the Mini App. The official
 * telegram-web-app.js script is not loaded here, so window.Telegram is
 * absent; the SDK reads it from the launch URL (tgWebAppData) and caches
 * it in sessionStorage across reloads.
 */
function initData(): string | null {
  const w = (window as any).Telegram?.WebApp?.initData;
  if (typeof w === 'string' && w.length > 0) return w;
  try {
    const raw = retrieveRawInitData();
    if (typeof raw === 'string' && raw.length > 0) return raw;
  } catch {
    /* not inside Telegram */
  }
  for (const src of [window.location.hash.slice(1), window.location.search.slice(1)]) {
    const d = new URLSearchParams(src).get('tgWebAppData');
    if (d) return d;
  }
  return null;
}

export type FeedbackVerdict = 'fair' | 'unsure' | 'disagree';

export interface FeedbackPayload {
  levelId: number;
  verdict: FeedbackVerdict;
  text?: string;
  lang: string;
  outcome?: 'restored' | 'partial' | 'unchanged';
  attempts?: Record<string, number>;
}

/** Only ever true inside Telegram with a configured endpoint. */
export function canReport(): boolean {
  return !!URL && initData() !== null;
}

function post(body: Record<string, unknown>): void {
  if (!URL) return;
  const data = initData();
  if (!data) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    fetch(URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ initData: data, ...body }),
      keepalive: true,
      signal: controller.signal,
    })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
  } catch {
    /* never surfaces to the player */
  }
}

export function reportProgress(payload: ProgressPayload): void {
  post({ ...payload });
}

/** One feedback event per level per device; same signed path as progress. */
export function sendFeedback(feedback: FeedbackPayload): void {
  post({ feedback: { ...feedback, text: feedback.text?.slice(0, 240) || undefined } });
}
