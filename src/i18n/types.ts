/**
 * Bilingual text. Every player-facing string in content and UI is a
 * `Text` with both languages side by side, so a translator reviews
 * en/ar pairs in one place and nothing can ship untranslated.
 */
export type Lang = 'en' | 'ar';

export interface Text {
  en: string;
  ar: string;
}

/** Small constructor so content files stay readable: t('Hello', 'مرحبا'). */
export const t = (en: string, ar: string): Text => ({ en, ar });

export const LANGS: Lang[] = ['en', 'ar'];

export const LANG_META: Record<Lang, { label: string; dir: 'ltr' | 'rtl'; short: string }> = {
  en: { label: 'English', dir: 'ltr', short: 'EN' },
  ar: { label: 'العربية', dir: 'rtl', short: 'ع' },
};
