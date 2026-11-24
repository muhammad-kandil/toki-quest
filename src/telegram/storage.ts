/**
 * Save/load layer for game state.
 *
 * Real Telegram launch -> Telegram CloudStorage (per-user, persists
 * across devices/sessions, per GDD §8: backendless MVP).
 * Browser preview (no Telegram) -> localStorage, so Phase 0/1 can be
 * built and tested without a live bot.
 *
 * IMPORTANT: this is client-controlled storage. Fine for a
 * trust-based professional cohort (per GDD §8); not tamper-resistant.
 * A shared/competitive leaderboard would need a small backend later.
 */
import {
  setCloudStorageItem,
  getCloudStorageItem,
  deleteCloudStorageItem,
} from '@telegram-apps/sdk-react';
import { isInsideTelegram } from './bootstrap';

const STORAGE_PREFIX = 'toki:';

/**
 * setCloudStorageItem/getCloudStorageItem are "safe wrapped" SDK
 * functions that expose `.isAvailable()` — the recommended guard per
 * the SDK's own docs, since `isSupported` alone is a signal about the
 * environment, not a guarantee the specific call will succeed (e.g.
 * SDK not yet initialized). Checking `.isAvailable()` on the actual
 * function we're about to call is the more defensive, correct check.
 */
function cloudReady(): boolean {
  if (!isInsideTelegram()) return false;
  try {
    return setCloudStorageItem.isAvailable() && getCloudStorageItem.isAvailable();
  } catch {
    return false;
  }
}

/**
 * Races a promise against a timeout. iOS Telegram's CloudStorage can
 * *hang* (never resolve/reject) rather than failing cleanly; without
 * this, an await on such a call would freeze the game. On timeout we
 * throw so the caller falls back to localStorage.
 */
function withTimeout<T>(p: Promise<T>, ms = 2000): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('storage-timeout')), ms)),
  ]);
}

export async function saveValue(key: string, value: string): Promise<void> {
  const fullKey = STORAGE_PREFIX + key;
  if (cloudReady()) {
    try {
      await withTimeout(setCloudStorageItem(fullKey, value));
      return;
    } catch (err) {
      console.warn('[Toki] CloudStorage write failed, falling back to localStorage.', err);
    }
  }
  window.localStorage.setItem(fullKey, value);
}

export async function loadValue(key: string): Promise<string | undefined> {
  const fullKey = STORAGE_PREFIX + key;
  if (cloudReady()) {
    try {
      // Per SDK docs: returns '' (empty string) if the key was never set.
      const val = await withTimeout(getCloudStorageItem(fullKey));
      return val || undefined;
    } catch (err) {
      console.warn('[Toki] CloudStorage read failed, falling back to localStorage.', err);
    }
  }
  return window.localStorage.getItem(fullKey) ?? undefined;
}

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  await saveValue(key, JSON.stringify(value));
}

export async function loadJSON<T>(key: string): Promise<T | undefined> {
  const raw = await loadValue(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[Toki] Corrupt saved value for "${key}", ignoring.`);
    return undefined;
  }
}

/**
 * Clears a stored value from whichever backend is active. Used by the
 * "Reset Progress" control so testers/players can start fresh.
 */
export async function deleteValue(key: string): Promise<void> {
  const fullKey = STORAGE_PREFIX + key;
  if (cloudReady()) {
    try {
      await withTimeout(deleteCloudStorageItem(fullKey));
      return;
    } catch (err) {
      console.warn('[Toki] CloudStorage delete failed, falling back to localStorage.', err);
    }
  }
  window.localStorage.removeItem(fullKey);
}
