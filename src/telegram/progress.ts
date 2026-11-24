/**
 * Progress reporting to the admin-only store (CX db via the Azure
 * Function in backend/azure-function).
 *
 * Fire-and-forget by design: the player's own save lives in Telegram
 * CloudStorage; this is a copy for the DLIS team's completion view.
 * If the URL isn't configured, the request fails, or we're not inside
 * Telegram (no signed initData), nothing happens and nothing is shown.
 */
const URL = import.meta.env.VITE_PROGRESS_URL as string | undefined;

interface ProgressPayload {
  bestScores: Record<number, number>;
  badges: string[];
  lang?: string;
}

function initData(): string | null {
  const raw = (window as any).Telegram?.WebApp?.initData;
  return typeof raw === 'string' && raw.length > 0 ? raw : null;
}

export function reportProgress(payload: ProgressPayload): void {
  if (!URL) return;
  const data = initData();
  if (!data) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    fetch(URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ initData: data, ...payload }),
      keepalive: true,
      signal: controller.signal,
    })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
  } catch {
    /* never surfaces to the player */
  }
}
