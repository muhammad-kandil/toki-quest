import { useState } from 'react';
import { getCardInfo, getSchoolVisit, BOSS, BOSS_ID } from '../data/levels';
import type { WorldDefinition } from '../data/worlds';
import { isLevelUnlocked } from '../data/progression';
import { getSkinById } from '../data/skins';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import type { Text } from '../i18n/types';
import { sfx } from '../audio/sfx';
import { TopBar } from '../components/TopBar';
import { PeoplePair } from '../components/PeopleGlyphs';
import './HubScreen.css';

interface HubScreenProps {
  world: WorldDefinition;
  bestScores: Record<number, number>;
  skinId: string;
  badgesCount: number;
  onEnterClassroom: (id: number) => void;
  onOpenSkins: () => void;
  onOpenBadges: () => void;
  onBack: () => void;
}

type DoorState = 'locked' | 'available' | 'completed';
type TransitionPhase = 'idle' | 'walking' | 'hiding' | 'opening';

/**
 * Inside a world: the corridor of classrooms. Toki (in the chosen skin)
 * stands beside the cards; tapping one walks Toki to it, ducks behind
 * its edge, then a clean wipe carries the player into the room.
 */
export function HubScreen({ world, bestScores, skinId, badgesCount, onEnterClassroom, onOpenSkins, onOpenBadges, onBack }: HubScreenProps) {
  const { tx } = useLocale();
  const [walkingTo, setWalkingTo] = useState<number | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const skin = getSkinById(skinId);

  const bossCard = (() => {
    if (!world.bossId) return [];
    if (world.bossId === BOSS_ID) return [{ id: BOSS_ID, subject: BOSS.subject, title: BOSS.title, isBoss: true }];
    const wb = getCardInfo(world.bossId);
    return wb ? [{ id: world.bossId, subject: wb.subject, title: wb.title, isBoss: true }] : [];
  })();
  const cards = [
    ...world.levelIds.map((id) => ({ id, info: getCardInfo(id) })).filter((c) => c.info).map((c) => ({ id: c.id, subject: c.info!.subject, title: c.info!.title, isBoss: false })),
    ...bossCard,
  ];
  const isFinalVisit = !!world.bossId && !!getSchoolVisit(world.bossId);

  const doorState = (id: number): DoorState => {
    if (bestScores[id] != null) return 'completed';
    if (isLevelUnlocked(id, bestScores)) return 'available';
    return 'locked';
  };

  const handleDoor = (id: number, index: number) => {
    if (doorState(id) === 'locked' || phase !== 'idle') { sfx.play('lookAgain'); return; }
    sfx.play('tap');
    setWalkingTo(index);
    setPhase('walking');
    const steps = setInterval(() => sfx.play('step'), 170);
    setTimeout(() => {
      clearInterval(steps);
      sfx.play('door');
      setPhase('hiding');
      setTimeout(() => {
        sfx.play('wipe');
        setPhase('opening');
        setTimeout(() => onEnterClassroom(id), 420);
      }, 500);
    }, 750);
  };

  const bossUnlocked = !!world.bossId && isLevelUnlocked(world.bossId, bestScores);
  const bossTitle = bossCard[0]?.title;
  const fmtBoss = (txt: Text): Text => ({ en: fmt(txt.en, { title: bossTitle ? bossTitle.en : '' }), ar: fmt(txt.ar, { title: bossTitle ? bossTitle.ar : '' }) });
  const bossDone = !!world.bossId && bestScores[world.bossId] != null;
  const doneCount = cards.filter((c) => bestScores[c.id] != null).length;

  return (
    <div className="hub">
      <TopBar onBack={onBack} badgesCount={badgesCount} onOpenBadges={onOpenBadges} />
      <header className="hub__header">
        <div>
          <p className="hub__eyebrow">{tx({ en: `World ${world.number}`, ar: `العالم ${world.number}` })} · {tx(world.theme)}</p>
          <h1 className="hub__title">{tx(world.title)}</h1>
          <p className="hub__meta">{doneCount}/{cards.length} {tx(UI.levelsDone)}</p>
        </div>
        <button className="hub__customize" onClick={() => { sfx.play('tap'); onOpenSkins(); }} aria-label={tx(UI.customizeToki)}>
          <img src={skin.image} alt="" />
        </button>
      </header>

      <div className={`hub__corridor ${walkingTo != null ? 'hub__corridor--walking' : ''}`}>
        {cards.map((card, i) => {
          const state = doorState(card.id);
          const isTarget = walkingTo === i;
          return (
            <button
              key={card.id}
              className={`door door--${state} ${card.isBoss ? 'door--boss' : ''} ${isTarget ? 'door--target' : ''} ${isTarget && (phase === 'hiding' || phase === 'opening') ? 'door--opening' : ''}`}
              style={{ '--door-index': i } as React.CSSProperties}
              onClick={() => handleDoor(card.id, i)}
              disabled={state === 'locked' || phase !== 'idle'}
              aria-label={`${tx(card.subject)}: ${tx(card.title)}${state === 'locked' ? ` (${tx(UI.locked)})` : ''}`}
            >
              <span className="door__number">{card.isBoss ? '★' : i + 1}</span>
              {!card.isBoss && (
                <span className="door__people" aria-hidden="true">
                  <PeoplePair lit={state === 'completed'} size={18} />
                </span>
              )}
              <span className="door__subject">{tx(card.subject)}</span>
              <span className="door__name">{tx(card.title)}</span>
              {state === 'completed' && <span className="door__score door__score--done" aria-label={tx(UI.visited)}>✓</span>}
              {state === 'locked' && <span className="door__lock" aria-hidden="true" />}
            </button>
          );
        })}

        <div
          className={`hub__toki ${walkingTo != null ? 'hub__toki--walking' : 'hub__toki--idle'} ${phase === 'hiding' ? 'hub__toki--hiding' : ''}`}
          style={{ '--target-index': walkingTo ?? 0 } as React.CSSProperties}
        >
          <img src={skin.image} alt="" />
        </div>
      </div>

      <p className="hub__hint">
        {tx(bossDone ? (isFinalVisit ? UI.hintQuestDone : UI.hintAllDone) : isFinalVisit ? UI.hintFinalVisit : bossUnlocked ? fmtBoss(UI.hintBossReady) : UI.hintUnlockNext)}
      </p>

      <div className={`hub__wipe ${phase === 'opening' ? 'hub__wipe--active' : ''}`} aria-hidden="true" />
    </div>
  );
}
