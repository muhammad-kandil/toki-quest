import { useEffect, useState } from 'react';
import { voice, type Speaker, type Line } from './voice';
import { useLocale } from '../i18n/LocaleContext';

/**
 * React binding for voice-over. `available` is false only when there is
 * neither a recorded clip set nor a device voice for the language.
 */
export function useVoice() {
  const { lang } = useLocale();
  const [, bump] = useState(0);
  useEffect(() => {
    voice.prepare(lang);
    const off = voice.subscribe(() => bump((n) => n + 1));
    return () => { off(); };
  }, [lang]);
  return {
    available: voice.isAvailable(lang),
    on: voice.isEnabled(lang),
    toggle: () => voice.setEnabled(!voice.isEnabled(lang)),
    speak: (text: string, who: Speaker = 'narrator', teacher?: string) => voice.speak(text, lang, who, teacher),
    speakSequence: (lines: Line[], onDone?: () => void) => voice.speakSequence(lines, lang, onDone),
    /** Voice will actually speak now (switch on, sound on). */
    active: voice.isActive(lang),
    cancel: voice.cancel,
  };
}
