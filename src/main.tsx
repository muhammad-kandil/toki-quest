import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts (bundled, no external CDN dependency — matters
// inside a Mini App webview and this build sandbox alike).
// Latin-subset-only imports: the game is English-only for now, so
// pulling every unicode range (Devanagari, Cyrillic, Greek, etc.)
// just bloats the deploy for nothing. Revisit if/when Arabic or
// other scripts are added to the content (see GDD open decision #1).
import '@fontsource/baloo-2/latin-500.css';
import '@fontsource/baloo-2/latin-600.css';
import '@fontsource/baloo-2/latin-700.css';
import '@fontsource/baloo-2/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
// Arabic companions (loaded only when the UI switches to Arabic — the
// browser fetches a font file only once a glyph needs it).
import '@fontsource/baloo-bhaijaan-2/arabic-500.css';
import '@fontsource/baloo-bhaijaan-2/arabic-700.css';
import '@fontsource/baloo-bhaijaan-2/arabic-800.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css';

import './styles/global.css';
import App from './App.tsx';
import TeacherApp from './teacher/TeacherApp.tsx';

/**
 * Two games, one app. Until the teacher game is released, the DEFAULT stays
 * Toki's Coaching Quest so the live DLIS bot link keeps working.
 * `?mode=teacher` opens Ms. Mariam's School and remembers it;
 * `?mode=coach` switches back. At release: flip DEFAULT_MODE to 'teacher'
 * and add `?mode=coach` to the DLIS bot link.
 */
const DEFAULT_MODE: 'coach' | 'teacher' = 'coach';
function pickMode(): 'coach' | 'teacher' {
  let q: string | null = null;
  try { q = new URLSearchParams(window.location.search).get('mode'); } catch { /* ignore */ }
  try {
    if (q === 'coach' || q === 'teacher') { window.localStorage.setItem('toki:mode', q); return q; }
    const saved = window.localStorage.getItem('toki:mode');
    return saved === 'coach' || saved === 'teacher' ? saved : DEFAULT_MODE;
  } catch {
    return q === 'coach' || q === 'teacher' ? q : DEFAULT_MODE;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pickMode() === 'coach' ? <App /> : <TeacherApp />}
  </StrictMode>,
);
