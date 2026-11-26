/**
 * "Every Classroom Has a Story" — the teacher game. Screens, saves, Back,
 * sound, analytics, accessibility. See docs/product/GAME_PACKAGE.md.
 *
 * Two saves: GameSave ('teacher:v1': name, language, toolkit, Term Pass,
 * shop) and the universe state ('teacher:universe:v1': sessions, students,
 * needs, history, resume point, accessibility). Both via CloudStorage with
 * the localStorage fallback.
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { mountBackButton, showBackButton, hideBackButton, onBackButtonClick, offBackButtonClick } from '@telegram-apps/sdk-react';
import { LocaleProvider, detectInitialLang } from '../i18n/LocaleContext';
import type { Lang } from '../i18n/types';
import { bootstrapTelegram } from '../telegram/bootstrap';
import { loadJSON, saveJSON, deleteValue } from '../telegram/storage';
import { sfx } from '../audio/sfx';
import { ambience } from '../audio/ambience';
import { adventures, getTermPass, getUniverse } from './content';
import { normalizeSave, newSave, SAVE_KEY, type GameSave } from './engine/save';
import { newUniverseState, normalizeUniverse, type UState } from './engine/universe';
import { setTrackContext, track } from './analytics';
import { ToastProvider } from './ui';
import { TitleScreen } from './screens/TitleScreen';
import { NameScreen } from './screens/NameScreen';
import { CampusScreen } from './screens/CampusScreen';
import { StaffRoomScreen } from './screens/StaffRoomScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { TermPassScreen } from './screens/TermPassScreen';
import { CertificateScreen } from './screens/CertificateScreen';
import { ShopScreen } from './screens/ShopScreen';
import { AccessibilityScreen } from './screens/AccessibilityScreen';
import './theme.css';
import './teacher.css';

const SessionScreen = lazy(() => import('./screens/SessionScreen'));

export type Screen = 'loading' | 'title' | 'name' | 'campus' | 'session' | 'staffroom' | 'library' | 'community' | 'pass' | 'cert' | 'shop' | 'a11y';

const PARENT: Partial<Record<Screen, Screen>> = {
  name: 'title', session: 'campus', staffroom: 'campus', library: 'campus', community: 'campus',
  pass: 'campus', shop: 'campus', cert: 'pass', a11y: 'campus',
};
/** Screens with no Telegram BackButton. */
const ROOTS: Screen[] = ['loading', 'title', 'campus'];
export const UNIVERSE_KEY = 'teacher:universe:v1';

const firstId = () => adventures()[0]?.id;

/** Pseudonymous player key (local until the server issues one). Never a name. */
function playerKey(): string {
  try {
    let k = window.localStorage.getItem('toki:teacher:key');
    if (!k) {
      const b = new Uint8Array(8);
      (window.crypto || (window as unknown as { msCrypto: Crypto }).msCrypto).getRandomValues(b);
      k = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
      window.localStorage.setItem('toki:teacher:key', k);
    }
    return k;
  } catch { return 'anon'; }
}
/** ?seed=N — QA override: session k plays seed N + k - 1 (deterministic across languages and reloads). */
function qaSeed(): number | undefined {
  try { const s = new URLSearchParams(window.location.search).get('seed'); return s ? (Number(s) >>> 0) : undefined; } catch { return undefined; }
}

type TgBack = { show?: () => void; hide?: () => void; onClick?: (f: () => void) => void; offClick?: (f: () => void) => void };
const legacyTgBack = (): TgBack | undefined =>
  (window as unknown as { Telegram?: { WebApp?: { BackButton?: TgBack } } }).Telegram?.WebApp?.BackButton;

export default function TeacherApp() {
  const U = getUniverse();
  const key = useRef(playerKey());
  const seed = useRef(qaSeed());
  const [screen, setScreen] = useState<Screen>('loading');
  const [save, setSave] = useState<GameSave>(() => newSave(firstId()));
  const [ustate, setUstate] = useState<UState>(() => newUniverseState(U, key.current, seed.current));
  const [lang, setLangState] = useState<Lang>(detectInitialLang());
  const saveRef = useRef(save);
  saveRef.current = save;
  const uRef = useRef(ustate);
  uRef.current = ustate;

  /* ---------- load ---------- */
  useEffect(() => {
    bootstrapTelegram();
    (async () => {
      const timeout = <T,>(p: Promise<T>, ms: number) =>
        Promise.race([p, new Promise<undefined>((r) => setTimeout(() => r(undefined), ms))]);
      try {
        const [raw, rawU] = await Promise.all([timeout(loadJSON<unknown>(SAVE_KEY), 2500), timeout(loadJSON<unknown>(UNIVERSE_KEY), 2500)]);
        const s = normalizeSave(raw, firstId());
        setSave(s);
        if (s.lang) setLangState(s.lang);
        if (rawU) setUstate(normalizeUniverse(rawU, U, key.current));
      } catch { /* defaults */ }
      setTrackContext({ v: U.version });
      track('game_open', { lang: detectInitialLang() });
      setScreen('title');
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback((next: GameSave) => {
    saveRef.current = next;
    setSave(next);
    saveJSON(SAVE_KEY, next).catch(() => {
      try { window.localStorage.setItem('toki:' + SAVE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    });
  }, []);
  const update = useCallback((fn: (s: GameSave) => GameSave) => persist(fn(saveRef.current)), [persist]);
  const setU = useCallback((fn: (s: UState) => UState) => {
    const next = fn(uRef.current);
    uRef.current = next;
    setUstate(next);
    setTrackContext({ session: next.session });
    saveJSON(UNIVERSE_KEY, next).catch(() => {
      try { window.localStorage.setItem('toki:' + UNIVERSE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    update((s) => ({ ...s, lang: l }));
    track('language_change', { lang: l });
  }, [update]);

  /* ---------- Back: Telegram BackButton + browser/hardware Back ---------- */
  const screenRef = useRef(screen);
  screenRef.current = screen;
  /** A screen (the session / scenario) can take Back first: return true when it handled it. */
  const backOverride = useRef<(() => boolean) | null>(null);
  const goBack = useCallback(() => {
    if (backOverride.current && backOverride.current()) return;
    const p = PARENT[screenRef.current];
    if (p) setScreen(p);
  }, []);

  useEffect(() => {
    // One sentinel history entry: Back pops it, we route, and re-arm it.
    try { window.history.pushState({ teacher: 1 }, ''); } catch { /* ignore */ }
    const onPop = () => {
      goBack();
      try { window.history.pushState({ teacher: 1 }, ''); } catch { /* ignore */ }
    };
    window.addEventListener('popstate', onPop);
    let off: (() => void) | undefined;
    try {
      if (mountBackButton.isAvailable()) mountBackButton();
      if (onBackButtonClick.isAvailable()) {
        const fn = () => goBack();
        onBackButtonClick(fn);
        off = () => { try { offBackButtonClick(fn); } catch { /* ignore */ } };
      }
    } catch { /* not in Telegram */ }
    const legacy = legacyTgBack();
    const lfn = () => goBack();
    if (!off) legacy?.onClick?.(lfn);
    return () => { window.removeEventListener('popstate', onPop); off?.(); legacy?.offClick?.(lfn); };
  }, [goBack]);

  useEffect(() => {
    const visible = !ROOTS.includes(screen);
    try {
      if (visible ? showBackButton.isAvailable() : hideBackButton.isAvailable()) (visible ? showBackButton : hideBackButton)();
      else { const l = legacyTgBack(); if (visible) l?.show?.(); else l?.hide?.(); }
    } catch { /* ignore */ }
    if (screen !== 'session') backOverride.current = null;
    try { window.scrollTo(0, 0); } catch { /* ignore */ }
  }, [screen]);

  /* ---------- sound (optional; never carries essential information) ---------- */
  useEffect(() => {
    if (screen === 'title') sfx.music('title');
    else if (screen === 'campus') sfx.music('map');
    else if (screen === 'session') sfx.music(null);
    const bed = ({ title: 'playground', campus: 'playground', staffroom: 'staffroom', library: 'class-quiet', session: 'class-working', community: 'class-quiet', shop: 'corridor', pass: null, cert: null, a11y: null } as const)[screen as string];
    if (bed !== undefined) ambience.set(bed);
  }, [screen]);

  /* ---------- actions ---------- */
  const reset = async () => {
    try { await deleteValue(SAVE_KEY); await deleteValue(UNIVERSE_KEY); } catch { /* ignore */ }
    persist({ ...newSave(firstId()), lang, playerName: saveRef.current.playerName });
    setU(() => newUniverseState(U, key.current, seed.current));
    setScreen('title');
  };
  const switchToCoach = () => {
    try { window.localStorage.setItem('toki:mode', 'coach'); } catch { /* ignore */ }
    try {
      const u = new URL(window.location.href);
      u.searchParams.set('mode', 'coach');
      window.location.replace(u.toString());
    } catch { window.location.reload(); }
  };
  const setA11y = (k: 'reducedMotion' | 'largeText' | 'captions', v: boolean) => {
    setU((s) => ({ ...s, a11y: { ...(s.a11y ?? {}), [k]: v } }));
    track('accessibility_setting_change', { setting: k, on: v });
  };

  const tp = getTermPass();
  const a11y = ustate.a11y ?? {};

  let body: React.ReactNode = null;
  switch (screen) {
    case 'loading': body = <div className="ts-loading" />; break;
    case 'title': body = <TitleScreen save={save} onStart={() => setScreen(save.playerName ? 'campus' : 'name')} onCoach={switchToCoach} />; break;
    case 'name': body = <NameScreen initial={save.playerName} onDone={(name) => { update((s) => ({ ...s, playerName: name })); setScreen('campus'); }} />; break;
    case 'campus': body = <CampusScreen save={save} ustate={ustate} go={setScreen} onSession={() => { sfx.play('door'); setScreen('session'); }} onCoach={switchToCoach} onReset={reset} />; break;
    case 'session': body = (
      <Suspense fallback={<div className="ts-loading" />}>
        <SessionScreen universe={U} ustate={ustate} setU={setU} qaSeed={seed.current} save={save} update={update}
          registerBack={(fn) => { backOverride.current = fn; }} onExit={() => setScreen('campus')} onPass={() => setScreen('pass')} />
      </Suspense>
    ); break;
    case 'staffroom': body = <StaffRoomScreen save={save} update={update} onBack={goBack} />; break;
    case 'library': body = <LibraryScreen universe={U} ustate={ustate} onBack={goBack} />; break;
    case 'community': body = <CommunityScreen save={save} update={update} onBack={goBack} />; break;
    case 'pass': body = <TermPassScreen save={save} update={update} onBack={goBack} onCert={() => setScreen('cert')} tp={tp} />; break;
    case 'cert': body = <CertificateScreen save={save} onBack={goBack} tp={tp} />; break;
    case 'shop': body = <ShopScreen save={save} update={update} onBack={goBack} />; break;
    case 'a11y': body = <AccessibilityScreen a11y={a11y} onChange={setA11y} onBack={goBack} />; break;
  }

  const cls = 'teacher-app' + (a11y.reducedMotion ? ' ts-reduce-motion' : '') + (a11y.largeText ? ' ts-large-text' : '');
  return (
    <LocaleProvider lang={lang} onChange={setLang}>
      <ToastProvider>
        <div className={cls} data-screen={screen}>{body}</div>
      </ToastProvider>
    </LocaleProvider>
  );
}
