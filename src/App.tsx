import { useCallback, useEffect, useRef, useState } from 'react';
import { LeaveRoom } from './components/LeaveRoom';
import { bootstrapTelegram } from './telegram/bootstrap';
import { loadJSON, saveJSON, deleteValue } from './telegram/storage';
import { reportProgress, sendProfile, telegramFirstName } from './telegram/progress';
import { TitleScreen } from './screens/TitleScreen';
import { WorldMapScreen } from './screens/WorldMapScreen';
import { HubScreen } from './screens/HubScreen';
import { LevelScreen, type LevelResult } from './screens/LevelScreen';
import { BossScreen } from './screens/BossScreen';
import { WorldBossScreen } from './screens/WorldBossScreen';
import { AcademyScreen } from './screens/AcademyScreen';
import { SchoolVisitScreen } from './screens/SchoolVisitScreen';
import { SkinPickerScreen } from './screens/SkinPickerScreen';
import { BadgesScreen } from './screens/BadgesScreen';
import { NameScreen } from './screens/NameScreen';
import { BoardScreen } from './screens/BoardScreen';
import { StoryScreen } from './screens/StoryScreen';
import { StoriesScreen } from './screens/StoriesScreen';
import { storyById, storyFor } from './data/story';
import { getLevel, getWorldBoss, getAcademyLevel, getSchoolVisit, ensureWorldLoaded, BOSS, BOSS_ID } from './data/levels';
import { WORLDS, getWorld } from './data/worlds';
import { completedCount as countDone, currentWorld as findCurrentWorld } from './data/progression';
import { DEFAULT_SKIN_ID } from './data/skins';
import { LocaleProvider, detectInitialLang } from './i18n/LocaleContext';
import { sfx } from './audio/sfx';
import { ambience } from './audio/ambience';
import type { Lang } from './i18n/types';

interface SaveData {
  hasPlayedBefore: boolean;
  unlockedLevel: number;
  bestScores: Record<number, number>;
  badges: string[];
  selectedSkinId: string;
  /** Player's chosen language; undefined = not chosen yet (auto-detect). */
  lang?: Lang;
  /** Per level: attempts-to-correct per step, from the best-scoring run. */
  attempts?: Record<number, Record<string, number>>;
  /** Per level: how the coaching conversation ended, from the best-scoring run. */
  outcomes?: Record<number, 'restored' | 'partial' | 'unchanged'>;
  /** Picture-stories already watched (ids from src/data/story.ts). */
  storiesSeen?: string[];
  /** The name the player chose (asked once before the first world). */
  playerName?: string;
  /** The player's choice to appear by name on the ranking. */
  showOnBoard?: boolean;
  /** The world Toki last stood at on the map; a newer current world
   *  means a world was just completed and he walks over to it. */
  lastWalkedTo?: string;
}

const DEFAULT_SAVE: SaveData = {
  hasPlayedBefore: false,
  unlockedLevel: 1,
  bestScores: {},
  badges: [],
  selectedSkinId: DEFAULT_SKIN_ID,
};

type Screen = 'loading' | 'title' | 'name' | 'map' | 'world' | 'classroom' | 'boss' | 'worldboss' | 'academy' | 'visit' | 'skins' | 'badges' | 'board' | 'story' | 'stories';

const IN_ROOM: Screen[] = ['classroom', 'boss', 'worldboss', 'academy', 'visit'];
/** Where the hardware / browser Back button goes from each screen.
 *  'return' = wherever the overlay was opened from. Playtest finding:
 *  Back used to leave the app entirely (about:blank). */
const BACK_TARGET: Partial<Record<Screen, Screen | 'return'>> = {
  story: 'map', stories: 'map',
  map: 'title', world: 'map', skins: 'return', badges: 'return', board: 'map', name: 'return',
  classroom: 'world', boss: 'world', worldboss: 'world', academy: 'world', visit: 'world',
};

function App() {
  const [screen, setScreen] = useState<Screen>('loading');
  const [save, setSave] = useState<SaveData>(DEFAULT_SAVE);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [activeWorld, setActiveWorld] = useState<string>(WORLDS[0].id);
  const [returnTo, setReturnTo] = useState<Screen>('title');
  const [lang, setLangState] = useState<Lang>(detectInitialLang());

  useEffect(() => {
    bootstrapTelegram();
    (async () => {
      // iOS Telegram's CloudStorage read can hang; race it so startup
      // always proceeds (with defaults if needed).
      const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | undefined> =>
        Promise.race([p, new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ms))]);
      try {
        const loaded = await withTimeout(loadJSON<SaveData>('save'), 2500);
        if (loaded) {
          setSave({ ...DEFAULT_SAVE, ...loaded });
          if (loaded.lang) setLangState(loaded.lang);
        }
      } catch {
        /* proceed with defaults */
      }
      setScreen('title');
    })();
  }, []);

  // Preload the world the player is currently on, so the map → world
  // transition is instant for them (other worlds load on tap).
  useEffect(() => {
    if (screen !== 'title') return;
    const w = findCurrentWorld(save.bestScores);
    ensureWorldLoaded(w.number).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  // The score: the title theme on the title, the travel piece on the map,
  // the world's own mood in its hall. Classrooms have no music, so the
  // room (and the evidence) has the space.
  useEffect(() => {
    if (screen === 'title') sfx.music('title');
    else if (screen === 'map') sfx.music('map');
    else if (screen === 'world') sfx.music(sfx.moodFor(getWorld(activeWorld)?.number ?? 1));
    else if (screen === 'skins' || screen === 'badges' || screen === 'board' || screen === 'name') { /* keep what was playing */ }
    else sfx.music(null);
    // The room under it: the yard outside on the title and map, the
    // corridor in a world's hall. Rooms set their own sound.
    if (screen === 'title' || screen === 'map') ambience.set('playground');
    else if (screen === 'world') ambience.set('corridor');
    else if (screen === 'skins' || screen === 'badges') ambience.set(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, activeWorld]);

  // The bell as Toki arrives in a world's hall — once per world per session.
  const belled = useRef(new Set<string>());
  useEffect(() => {
    if (screen !== 'world' || belled.current.has(activeWorld)) return;
    belled.current.add(activeWorld);
    const t = window.setTimeout(() => void ambience.shot('bell', 0.7), 900);
    return () => window.clearTimeout(t);
  }, [screen, activeWorld]);

  const persist = async (updated: SaveData) => {
    setSave(updated);
    await saveJSON('save', updated);
  };

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setSave((prev) => {
      const next = { ...prev, lang: l };
      saveJSON('save', next);
      return next;
    });
  }, []);

  // History integration: every screen past the title pushes one entry, so
  // Back pops to the parent screen instead of out of the app. Telegram's
  // own BackButton (when present) is wired to the same handler.
  const screenRef = useRef<Screen>(screen);
  const returnToRef = useRef<Screen>(returnTo);
  screenRef.current = screen;
  returnToRef.current = returnTo;
  const goBack = useCallback(() => {
    const target = BACK_TARGET[screenRef.current];
    if (!target) return false;
    setScreen(target === 'return' ? returnToRef.current : target);
    return true;
  }, []);
  useEffect(() => {
    if (screen === 'loading' || screen === 'title') return;
    try { window.history.pushState({ toki: screen }, ''); } catch { /* ignore */ }
  }, [screen]);
  useEffect(() => {
    const onPop = () => { goBack(); };
    window.addEventListener('popstate', onPop);
    const tgBack = (window as unknown as { Telegram?: { WebApp?: { BackButton?: { onClick: (f: () => void) => void; offClick: (f: () => void) => void } } } }).Telegram?.WebApp?.BackButton;
    const onTg = () => { goBack(); };
    tgBack?.onClick(onTg);
    return () => { window.removeEventListener('popstate', onPop); tgBack?.offClick(onTg); };
  }, [goBack]);

  const go = (s: Screen, from?: Screen) => {
    if (from) setReturnTo(from);
    setScreen(s);
  };

  const handleStart = async () => {
    await persist({ ...save, hasPlayedBefore: true });
    if (!save.playerName) go('name', 'map');
    else setScreen('map');
  };

  const handleSaveName = async (playerName: string, showOnBoard: boolean) => {
    await persist({ ...save, hasPlayedBefore: true, playerName, showOnBoard });
    sendProfile({ displayName: playerName, showOnBoard }, { badges: save.badges, bestScores: save.bestScores, lang });
    setScreen(returnTo === 'board' ? 'board' : 'map');
  };

  // The picture-story: an opening the first time a world is entered, a
  // closing after its challenge. `next` is where the player goes after.
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [storyNext, setStoryNext] = useState<Screen>('map');
  const playStory = (id: string, next: Screen) => {
    setActiveStory(id);
    setStoryNext(next);
    setScreen('story');
  };
  const handleStoryDone = async () => {
    const id = activeStory;
    if (id && !(save.storiesSeen ?? []).includes(id)) {
      await persist({ ...save, storiesSeen: [...(save.storiesSeen ?? []), id] });
    }
    setScreen(storyNext);
  };

  const handleEnterClassroom = (id: number) => {
    setActiveLevel(id);
    if (id === BOSS_ID) setScreen('boss');
    else if (getWorldBoss(id)) setScreen('worldboss');
    else if (getAcademyLevel(id)) setScreen('academy');
    else if (getSchoolVisit(id)) setScreen('visit');
    else setScreen('classroom');
  };

  const handleClassroomComplete = async (result: LevelResult) => {
    const prevBest = save.bestScores[result.levelId] ?? 0;
    const newBadges = [...new Set([...save.badges, ...result.badgesEarned])];
    const bestScores = { ...save.bestScores, [result.levelId]: Math.max(prevBest, result.score) };
    // Telemetry follows the best-scoring run (first run always records).
    const improved = result.score > prevBest || save.bestScores[result.levelId] == null;
    const attempts = { ...(save.attempts ?? {}) };
    const outcomes = { ...(save.outcomes ?? {}) };
    if (improved) {
      if (result.attempts) attempts[result.levelId] = result.attempts;
      if (result.outcome) outcomes[result.levelId] = result.outcome;
    }
    await persist({ ...save, bestScores, badges: newBadges, attempts, outcomes });
    reportProgress({ bestScores, badges: newBadges, lang, attempts, outcomes });
    // First completion of a world's challenge: its closing story, then the map.
    const finishedWorld = save.bestScores[result.levelId] == null ? WORLDS.find((w) => w.bossId === result.levelId) : undefined;
    const closing = finishedWorld ? storyFor(finishedWorld.id, 'close') : undefined;
    if (closing) playStory(closing.id, 'map');
    else setScreen('world');
  };

  const handleResetProgress = async () => {
    await deleteValue('save');
    setSave({ ...DEFAULT_SAVE, lang });
    setScreen('title');
  };

  const completedCount = countDone(save.bestScores);

  let content: React.ReactNode = null;

  if (screen === 'loading') {
    content = null;
  } else if (screen === 'title') {
    content = (
      <TitleScreen
        onStart={handleStart}
        onOpenSkins={() => go('skins', 'title')}
        onOpenBadges={() => go('badges', 'title')}
        isReturningPlayer={save.hasPlayedBefore}
        badgesCount={save.badges.length}
      />
    );
  } else if (screen === 'name') {
    content = (
      <NameScreen
        mode={save.playerName ? 'edit' : 'first'}
        initialName={save.playerName ?? telegramFirstName() ?? ''}
        initialShow={save.showOnBoard ?? true}
        onSave={handleSaveName}
        onBack={save.playerName ? () => setScreen(returnTo) : undefined}
      />
    );
  } else if (screen === 'story') {
    const st = activeStory ? storyById(activeStory) : undefined;
    content = st ? <StoryScreen key={st.id} story={st} onDone={handleStoryDone} /> : null;
    if (!st) setTimeout(() => setScreen('map'), 0);
  } else if (screen === 'stories') {
    content = <StoriesScreen seen={save.storiesSeen ?? []} onPlay={(id) => playStory(id, 'stories')} onBack={() => setScreen('map')} />;
  } else if (screen === 'board') {
    content = <BoardScreen myName={save.playerName ?? ''} onEditName={() => go('name', 'board')} onBack={() => setScreen('map')} />;
  } else if (screen === 'map') {
    content = (
      <WorldMapScreen
        bestScores={save.bestScores}
        badges={save.badges}
        skinId={save.selectedSkinId}
        onEnterWorld={async (id) => {
          const w = WORLDS.find((x) => x.id === id);
          if (w) await ensureWorldLoaded(w.number);
          setActiveWorld(id);
          const opening = storyFor(id, 'open');
          if (opening && !(save.storiesSeen ?? []).includes(opening.id)) playStory(opening.id, 'world');
          else setScreen('world');
        }}
        onOpenStories={() => setScreen('stories')}
        onOpenSkins={() => go('skins', 'map')}
        onOpenBadges={() => go('badges', 'map')}
        onOpenBoard={() => setScreen('board')}
        onBack={() => setScreen('title')}
        walkFrom={save.lastWalkedTo}
        onArrived={(id) => { if (save.lastWalkedTo !== id) void persist({ ...save, lastWalkedTo: id }); }}
      />
    );
  } else if (screen === 'world') {
    const world = getWorld(activeWorld) ?? WORLDS[0];
    content = (
      <HubScreen
        world={world}
        bestScores={save.bestScores}
        skinId={save.selectedSkinId}
        badgesCount={save.badges.length}
        onEnterClassroom={handleEnterClassroom}
        onOpenSkins={() => go('skins', 'world')}
        onOpenBadges={() => go('badges', 'world')}
        onBack={() => setScreen('map')}
      />
    );
  } else if (screen === 'skins') {
    content = (
      <SkinPickerScreen
        selectedSkinId={save.selectedSkinId}
        completedCount={completedCount}
        onSelect={(skinId) => persist({ ...save, selectedSkinId: skinId })}
        onBack={() => setScreen(returnTo)}
        onResetProgress={handleResetProgress}
      />
    );
  } else if (screen === 'badges') {
    content = <BadgesScreen earned={save.badges} onBack={() => setScreen(returnTo)} />;
  } else if (screen === 'boss') {
    content = <BossScreen boss={BOSS} onComplete={handleClassroomComplete} />;
  } else if (screen === 'worldboss') {
    const wb = getWorldBoss(activeLevel);
    content = wb ? <WorldBossScreen boss={wb} heldBadges={save.badges} onComplete={handleClassroomComplete} /> : null;
    if (!wb) setTimeout(() => setScreen('world'), 0);
  } else if (screen === 'academy') {
    const a = getAcademyLevel(activeLevel);
    content = a ? <AcademyScreen level={a} heldBadges={save.badges} onComplete={handleClassroomComplete} /> : null;
    if (!a) setTimeout(() => setScreen('world'), 0);
  } else if (screen === 'visit') {
    const v = getSchoolVisit(activeLevel);
    content = v ? <SchoolVisitScreen visit={v} heldBadges={save.badges} onComplete={handleClassroomComplete} /> : null;
    if (!v) setTimeout(() => setScreen('world'), 0);
  } else if (screen === 'classroom') {
    const level = getLevel(activeLevel);
    content = level ? (
      <LevelScreen level={level} onComplete={handleClassroomComplete} heldBadges={save.badges} />
    ) : null;
    if (!level) setTimeout(() => setScreen('world'), 0);
  }

  return (
    <LocaleProvider lang={lang} onChange={setLang}>
      {content}
      {IN_ROOM.includes(screen) && <LeaveRoom onLeave={() => setScreen('world')} />}
      {/* The hall's teal wipe dissolves into the room instead of cutting. */}
      {IN_ROOM.includes(screen) && <div key={`wipe-${screen}-${activeLevel}`} className="screen-wipe-out" aria-hidden="true" />}
    </LocaleProvider>
  );
}

export default App;
