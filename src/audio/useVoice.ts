import { useEffect, useState } from 'react';
import { voice, type Speaker } from './voice';
import { useLocale } from '../i18n/LocaleContext';

/**
 * React binding for Read aloud. `available` is false when the device
 * has no speech engine or no voice for the current language — callers
 * hide the toggle in that case rather than show a dead switch.
 */
export function useVoice() {
  const { lang } = useLocale();
  const [, bump] = useState(0);
  useEffect(() => {
    const off = voice.subscribe(() => bump((n) => n + 1));
    return () => { off(); };
  }, []);
  return {
    available: voice.isSupported() && voice.isAvailable(lang),
    on: voice.isEnabled(),
    toggle: () => voice.setEnabled(!voice.isEnabled()),
    speak: (text: string, who: Speaker = 'narrator') => voice.speak(text, lang, who),
    speakSequence: (lines: { text: string; who?: Speaker }[]) => voice.speakSequence(lines, lang),
    cancel: voice.cancel,
  };
}
