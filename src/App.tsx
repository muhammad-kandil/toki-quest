import { useEffect, useState } from 'react';
import { bootstrapTelegram } from './telegram/bootstrap';
import { loadJSON, saveJSON, deleteValue } from './telegram/storage';
import { TitleScreen } from './screens/TitleScreen';
import { HubScreen } from './screens/HubScreen';
import { LevelScreen, type LevelResult } from './screens/LevelScreen';
import { BossScreen } from './screens/BossScreen';
import { SkinPickerScreen } from './screens/SkinPickerScreen';
import { getLevel, TOTAL_LEVELS, BOSS, BOSS_ID } from './data/levels';
import { DEFAULT_SKIN_ID } from './data/skins';

interface SaveData {
  hasPlayedBefore: boolean;
  unlockedLevel: number;
  bestScores: Record<number, number>;
  badges: string[];
  selectedSkinId: string;
}

const DEFAULT_SAVE: SaveData = {
  hasPlayedBefore: false,
  unlockedLevel: 1,
  bestScores: {},
  badges: [],
  selectedSkinId: DEFAULT_SKIN_ID,
};

type Screen = 'loading' | 'title' | 'hub' | 'classroom' | 'boss' | 'skins';

function App() {
  const [screen, setScreen] = useState<Screen>('loading');
  const [save, setSave] = useState<SaveData>(DEFAULT_SAVE);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  // Remember where "skins" was opened from, so Back returns correctly.
  const [skinsOpenedFrom, setSkinsOpenedFrom] = useState<'title' | 'hub'>('title');

  useEffect(() => {
    bootstrapTelegram();
    (async () => {
      // On iOS Telegram the CloudStorage read can hang (never resolve),
      // which would freeze the app on the loading screen. Race it against
      // a timeout so startup ALWAYS proceeds, with defaults if needed.
      const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | undefined> =>
        Promise.race([
          p,
          new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ms)),
        ]);
      try {
        const loaded = await withTimeout(loadJSON<SaveData>('save'), 2500);
        if (loaded) setSave({ ...DEFAULT_SAVE, ...loaded });
      } catch {
        // proceed with defaults
      }
      setScreen('title');
    })();
  }, []);

  const persist = async (updated: SaveData) => {
    setSave(updated);
    await saveJSON('save', updated);
  };

  const handleStart = async () => {
    await persist({ ...save, hasPlayedBefore: true });
    setScreen('hub');
  };

  const handleOpenSkinsFromTitle = () => {
    setSkinsOpenedFrom('title');
    setScreen('skins');
  };

  const handleOpenSkinsFromHub = () => {
    setSkinsOpenedFrom('hub');
    setScreen('skins');
  };

  const handleSelectSkin = async (skinId: string) => {
    await persist({ ...save, selectedSkinId: skinId });
  };

  const handleResetProgress = async () => {
    await deleteValue('save');
    setSave(DEFAULT_SAVE);
    setScreen('title');
  };

  const handleEnterClassroom = (id: number) => {
    setActiveLevel(id);
    setScreen(id === BOSS_ID ? 'boss' : 'classroom');
  };

  const handleClassroomComplete = async (result: LevelResult) => {
    const prevBest = save.bestScores[result.levelId] ?? 0;
    const newBadges = [...new Set([...save.badges, ...result.badgesEarned])];
    let newUnlocked = save.unlockedLevel;
    if (result.levelId < TOTAL_LEVELS) {
      newUnlocked = Math.max(newUnlocked, result.levelId + 1);
    } else if (result.levelId === TOTAL_LEVELS) {
      newUnlocked = Math.max(newUnlocked, BOSS_ID);
    }
    await persist({
      ...save,
      unlockedLevel: newUnlocked,
      bestScores: { ...save.bestScores, [result.levelId]: Math.max(prevBest, result.score) },
      badges: newBadges,
    });
    setScreen('hub');
  };

  if (screen === 'loading') return null;

  if (screen === 'title') {
    return (
      <TitleScreen
        onStart={handleStart}
        onOpenSkins={handleOpenSkinsFromTitle}
        isReturningPlayer={save.hasPlayedBefore}
      />
    );
  }

  if (screen === 'skins') {
    // Completed classrooms (not counting the boss) drive skin unlocks.
    const completedCount = Object.keys(save.bestScores).filter((id) => Number(id) <= TOTAL_LEVELS).length
      + (save.bestScores[BOSS_ID] != null ? 1 : 0);
    return (
      <SkinPickerScreen
        selectedSkinId={save.selectedSkinId}
        completedCount={completedCount}
        onSelect={handleSelectSkin}
        onBack={() => setScreen(skinsOpenedFrom === 'hub' ? 'hub' : 'title')}
        onResetProgress={handleResetProgress}
      />
    );
  }

  if (screen === 'boss') {
    return <BossScreen boss={BOSS} onComplete={handleClassroomComplete} />;
  }

  if (screen === 'classroom') {
    const level = getLevel(activeLevel);
    if (!level) {
      setScreen('hub');
      return null;
    }
    return <LevelScreen level={level} onComplete={handleClassroomComplete} skinId={save.selectedSkinId} />;
  }

  return (
    <HubScreen
      unlockedLevel={save.unlockedLevel}
      bestScores={save.bestScores}
      skinId={save.selectedSkinId}
      onEnterClassroom={handleEnterClassroom}
      onOpenSkins={handleOpenSkinsFromHub}
    />
  );
}

export default App;
