/**
 * Ms. Mariam's School — the teacher game. Screens, save, Back, sound.
 * See docs/design/TEACHER_REBUILD.md.
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { mountBackButton, showBackButton, hideBackButton, onBackButtonClick, offBackButtonClick } from '@telegram-apps/sdk-react';
import { LocaleProvider, detectInitialLang } from '../i18n/LocaleContext';
import type { Lang } from '../i18n/types';
import { bootstrapTelegram } from '../telegram/bootstrap';
import { loadJSON, saveJSON, deleteValue } from '../telegram/storage';
import { sfx } from '../audio/sfx';
import { ambience } from '../audio/ambience';
import { adventures, adventure, getTermPass } from './content';
import { normalizeSave, newSave, SAVE_KEY, type GameSave } from './engine/save';
import { ToastProvider, asset } from './ui';
import { TitleScreen } from './screens/TitleScreen';
import { NameScreen } from './screens/NameScreen';
import { CampusScreen, nextAdventure } from './screens/CampusScreen';
import { StaffRoomScreen } from './screens/StaffRoomScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { OfficeScreen } from './screens/OfficeScreen';
import { TermPassScreen } from './screens/TermPassScreen';
import { CertificateScreen } from './screens/CertificateScreen';
import { ShopScreen } from './screens/ShopScreen';
import './theme.css';
import './teacher.css';

const AdventureScreen = lazy(() => import('./screens/AdventureScreen'));

export type Screen = 'loading' | 'title' | 'name' | 'campus' | 'adventure' | 'staffroom' | 'library' | 'community' | 'office' | 'pass' | 'cert' | 'shop';

const PARENT: Partial<Record<Screen, Screen>> = {
  name: 'title', adventure: 'campus', staffroom: 'campus', library: 'campus', community: 'campus',
  office: 'campus', pass: 'campus', shop: 'campus', cert: 'pass',
};
/** Screens with no Telegram BackButton. */
const ROOTS: Screen[] = ['loading', 'title', 'campus'];

const firstId = () => adventures()[0]?.id;

type TgBack = { show?: () => void; hide?: () => void; onClick?: (f: () => void) => void; offClick?: (f: () => void) => void };
const legacyTgBack = (): TgBack | undefined =>
  (window as unknown as { Telegram?: { WebApp?: { BackButton?: TgBack } } }).Telegram?.WebApp?.BackButton;

export default function TeacherApp() {
  const [screen, setScreen] = useState<Screen>('loading');
  const [save, setSave] = useState<GameSave>(() => newSave(firstId()));
  const [lang, setLangState] = useState<Lang>(detectInitialLang());
  const [advId, setAdvId] = useState<string | null>(null);
  const [advKey, setAdvKey] = useState(0);
  const saveRef = useRef(save);
  saveRef.current = save;

  /* ---------- load ---------- */
  useEffect(() => {
    bootstrapTelegram();
    (async () => {
      const timeout = <T,>(p: Promise<T>, ms: number) =>
        Promise.race([p, new Promise<undefined>((r) => setTimeout(() => r(undefined), ms))]);
      try {
        const raw = await timeout(loadJSON<unknown>(SAVE_KEY), 2500);
        const s = normalizeSave(raw, firstId());
        setSave(s);
        if (s.lang) setLangState(s.lang);
      } catch { /* defaults */ }
      setScreen('title');
    })();
  }, []);

  const persist = useCallback((next: GameSave) => {
    saveRef.current = next;
    setSave(next);
    saveJSON(SAVE_KEY, next).catch(() => {
      try { window.localStorage.setItem('toki:' + SAVE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    });
  }, []);
  const update = useCallback((fn: (s: GameSave) => GameSave) => persist(fn(saveRef.current)), [persist]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    update((s) => ({ ...s, lang: l }));
  }, [update]);

  /* ---------- Back: Telegram BackButton + browser/hardware Back ---------- */
  const screenRef = useRef(screen);
  screenRef.current = screen;
  /** A screen (the adventure) can take Back first: return true when it handled it. */
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
    if (screen !== 'adventure') backOverride.current = null;
    try { window.scrollTo(0, 0); } catch { /* ignore */ }
  }, [screen]);

  /* ---------- sound ---------- */
  useEffect(() => {
    if (screen === 'title') sfx.music('title');
    else if (screen === 'campus') sfx.music('map');
    else if (screen === 'adventure') sfx.music(null);
    const bed = ({ title: 'playground', campus: 'playground', staffroom: 'staffroom', library: 'class-quiet', office: 'corridor', adventure: 'class-working', community: 'class-quiet', shop: 'corridor', pass: null, cert: null } as const)[screen as string];
    if (bed !== undefined) ambience.set(bed);
  }, [screen]);

  /* ---------- preload the next scene one step ahead ---------- */
  useEffect(() => {
    if (screen !== 'campus') return;
    const n = nextAdventure(save);
    if (n) { const img = new Image(); img.src = asset(n.scene); }
  }, [screen, save]);

  /* ---------- actions ---------- */
  const startAdventure = (id: string) => {
    if (!adventure(id)) return;
    sfx.play('door');
    setAdvId(id);
    setAdvKey((k) => k + 1);
    setScreen('adventure');
  };
  const reset = async () => {
    try { await deleteValue(SAVE_KEY); } catch { /* ignore */ }
    persist({ ...newSave(firstId()), lang, playerName: saveRef.current.playerName });
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

  const adv = advId ? adventure(advId) : undefined;
  const tp = getTermPass();

  let body: React.ReactNode = null;
  switch (screen) {
    case 'loading': body = <div className="ts-loading" />; break;
    case 'title': body = <TitleScreen save={save} onStart={() => setScreen(save.playerName ? 'campus' : 'name')} onCoach={switchToCoach} />; break;
    case 'name': body = <NameScreen initial={save.playerName} onDone={(name) => { update((s) => ({ ...s, playerName: name })); setScreen('campus'); }} />; break;
    case 'campus': body = <CampusScreen save={save} go={setScreen} onAdventure={startAdventure} onCoach={switchToCoach} onReset={reset} />; break;
    case 'adventure': body = adv ? (
      <Suspense fallback={<div className="ts-loading" />}>
        <AdventureScreen key={advKey} adv={adv} save={save} update={update} registerBack={(fn) => { backOverride.current = fn; }}
          onExit={() => setScreen('campus')} onReplay={() => startAdventure(adv.id)} onPass={() => setScreen('pass')} onOpen={startAdventure} />
      </Suspense>
    ) : null; break;
    case 'staffroom': body = <StaffRoomScreen save={save} update={update} onBack={goBack} />; break;
    case 'library': body = <LibraryScreen save={save} onBack={goBack} onReplay={startAdventure} />; break;
    case 'community': body = <CommunityScreen save={save} update={update} onBack={goBack} />; break;
    case 'office': body = <OfficeScreen save={save} onBack={goBack} onAdventure={startAdventure} />; break;
    case 'pass': body = <TermPassScreen save={save} update={update} onBack={goBack} onCert={() => setScreen('cert')} tp={tp} />; break;
    case 'cert': body = <CertificateScreen save={save} onBack={goBack} tp={tp} />; break;
    case 'shop': body = <ShopScreen save={save} update={update} onBack={goBack} />; break;
  }

  return (
    <LocaleProvider lang={lang} onChange={setLang}>
      <ToastProvider>
        <div className="teacher-app" data-screen={screen}>{body}</div>
      </ToastProvider>
    </LocaleProvider>
  );
}
