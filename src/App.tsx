import { useCallback, useEffect, useState } from 'react';
import { bootstrapTelegram } from './telegram/bootstrap';
import { loadJSON, saveJSON, deleteValue } from './telegram/storage';
import { TitleScreen } from './screens/TitleScreen';
import { WorldMapScreen } from './screens/WorldMapScreen';
import { HubScreen } from './screens/HubScreen';
import { LevelScreen, type LevelResult } from './screens/LevelScreen';
import { BossScreen } from './screens/BossScreen';
import { SkinPickerScreen } from './screens/SkinPickerScreen';
import { BadgesScreen } from './screens/BadgesScreen';
import { getLevel, TOTAL_LEVELS, BOSS, BOSS_ID } from './data/levels';
import { WORLDS, getWorld } from './data/worlds';
import { DEFAULT_SKIN_ID } from './data/skins';
import { LocaleProvider, detectInitialLang } from './i18n/LocaleContext';
import type { Lang } from './i18n/types';

interface SaveData {
  hasPlayedBefore: boolean;
  unlockedLevel: number;
  bestScores: Record<number, number>;
  badges: string[];
  selectedSkinId: string;
  /** Player's chosen language; undefined = not chosen yet (auto-detect). */
  lang?: Lang;
}

const DEFAULT_SAVE: SaveData = {
  hasPlayedBefore: false,
  unlockedLevel: 1,
  bestScores: {},
  badges: [],
  selectedSkinId: DEFAULT_SKIN_ID,
};

type Screen = 'loading' | 'title' | 'map' | 'world' | 'classroom' | 'boss' | 'skins' | 'badges';

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

  const go = (s: Screen, from?: Screen) => {
    if (from) setReturnTo(from);
    setScreen(s);
  };

  const handleStart = async () => {
    await persist({ ...save, hasPlayedBefore: true });
    setScreen('map');
  };

  const handleEnterClassroom = (id: number) => {
    setActiveLevel(id);
    setScreen(id === BOSS_ID ? 'boss' : 'classroom');
  };

  const handleClassroomComplete = async (result: LevelResult) => {
    const prevBest = save.bestScores[result.levelId] ?? 0;
    const newBadges = [...new Set([...save.badges, ...result.badgesEarned])];
    let newUnlocked = save.unlockedLevel;
    if (result.levelId < TOTAL_LEVELS) newUnlocked = Math.max(newUnlocked, result.levelId + 1);
    else if (result.levelId === TOTAL_LEVELS) newUnlocked = Math.max(newUnlocked, BOSS_ID);
    await persist({
      ...save,
      unlockedLevel: newUnlocked,
      bestScores: { ...save.bestScores, [result.levelId]: Math.max(prevBest, result.score) },
      badges: newBadges,
    });
    setScreen('world');
  };

  const handleResetProgress = async () => {
    await deleteValue('save');
    setSave({ ...DEFAULT_SAVE, lang });
    setScreen('title');
  };

  const completedCount =
    Object.keys(save.bestScores).filter((id) => Number(id) <= TOTAL_LEVELS).length +
    (save.bestScores[BOSS_ID] != null ? 1 : 0);

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
  } else if (screen === 'map') {
    content = (
      <WorldMapScreen
        bestScores={save.bestScores}
        badges={save.badges}
        skinId={save.selectedSkinId}
        onEnterWorld={(id) => { setActiveWorld(id); setScreen('world'); }}
        onOpenSkins={() => go('skins', 'map')}
        onOpenBadges={() => go('badges', 'map')}
        onBack={() => setScreen('title')}
      />
    );
  } else if (screen === 'world') {
    const world = getWorld(activeWorld) ?? WORLDS[0];
    content = (
      <HubScreen
        world={world}
        unlockedLevel={save.unlockedLevel}
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
    </LocaleProvider>
  );
}

export default App;
