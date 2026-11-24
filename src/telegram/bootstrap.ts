/**
 * Telegram Mini App bootstrap.
 *
 * Runs `init()` from @telegram-apps/sdk when actually inside Telegram.
 * When previewed in a plain browser (local dev, before the bot is
 * wired up), Telegram's launch params won't exist — we detect that
 * and skip SDK init rather than crashing, so Phase 0 is previewable
 * without a bot at all.
 */
import { init } from '@telegram-apps/sdk-react';

export const isInsideTelegram = (): boolean => {
  // Telegram injects launch params either in the URL hash or via
  // window.Telegram.WebApp. Checking both covers real launches;
  // absence of either means we're in a plain browser tab.
  const hasHashParams = window.location.hash.includes('tgWebAppData')
    || window.location.hash.includes('tgWebAppPlatform');
  const hasWebApp = typeof (window as any).Telegram?.WebApp !== 'undefined';
  return hasHashParams || hasWebApp;
};

export function bootstrapTelegram(): void {
  if (!isInsideTelegram()) {
    console.info(
      '[Toki] Not running inside Telegram — skipping SDK init. ' +
      'Game will run in "browser preview" mode with local fallbacks.'
    );
    return;
  }

  try {
    init();
    console.info('[Toki] Telegram SDK initialized.');
  } catch (err) {
    console.warn('[Toki] Telegram SDK init failed, continuing in fallback mode.', err);
  }
}
