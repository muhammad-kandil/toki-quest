import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { LANG_META, type Lang, type Text } from './types';

interface LocaleValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (lang: Lang) => void;
  /** Resolve a bilingual Text (or a plain string) to the active language. */
  tx: (text: Text | string) => string;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({
  lang,
  onChange,
  children,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  children: ReactNode;
}) {
  const dir = LANG_META[lang].dir;

  // The document itself flips direction + language so native text
  // shaping, scrollbars, and the Telegram webview all follow suit.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.dataset.lang = lang;
  }, [lang, dir]);

  const value = useMemo<LocaleValue>(
    () => ({
      lang,
      dir,
      setLang: onChange,
      tx: (text) => (typeof text === 'string' ? text : text[lang]),
    }),
    [lang, dir, onChange],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const v = useContext(LocaleContext);
  if (!v) throw new Error('useLocale must be used inside <LocaleProvider>');
  return v;
}

/**
 * Best-guess starting language: Telegram tells us the user's client
 * language; Arabic speakers get Arabic by default, everyone else English.
 * The player can switch at any time and we remember their choice.
 */
export function detectInitialLang(): Lang {
  try {
    const tg = (window as any).Telegram?.WebApp;
    const code: string | undefined = tg?.initDataUnsafe?.user?.language_code;
    if (code && code.toLowerCase().startsWith('ar')) return 'ar';
    const nav = navigator.language || '';
    if (nav.toLowerCase().startsWith('ar')) return 'ar';
  } catch {
    /* ignore */
  }
  return 'en';
}
