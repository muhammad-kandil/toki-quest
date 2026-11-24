import { useState } from 'react';
import { LEVELS, BOSS, BOSS_ID } from '../data/levels';
import { getSkinById } from '../data/skins';
import './HubScreen.css';

interface HubScreenProps {
  unlockedLevel: number;         // highest classroom the player may enter
  bestScores: Record<number, number>;
  skinId: string;
  onEnterClassroom: (id: number) => void;
  onOpenSkins: () => void;
}

type DoorState = 'locked' | 'available' | 'completed';
type TransitionPhase = 'idle' | 'walking' | 'hiding' | 'opening';

interface HubCard {
  id: number;
  subject: string;
  title: string;
  isBoss: boolean;
}

/**
 * The classroom-select hub. Toki (in the player's selected skin — see
 * GDD §5 personalization) stands in a corridor of cards — one per
 * classroom, plus the Final Boss once unlocked. Tapping an unlocked
 * card plays a three-phase transition:
 *   1. "walk" — Toki approaches the LEFT edge of the chosen card
 *   2. "hiding" — Toki gradually fades while tucked behind that left
 *      edge, as if ducking behind the card/door
 *   3. "opening" — a clean teal wipe — then hands off to the classroom.
 */
export function HubScreen({ unlockedLevel, bestScores, skinId, onEnterClassroom, onOpenSkins }: HubScreenProps) {
  const [walkingTo, setWalkingTo] = useState<number | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const skin = getSkinById(skinId);

  const cards: HubCard[] = [
    ...Object.values(LEVELS).map((l) => ({
      id: l.id, subject: l.subject, title: l.title, isBoss: false,
    })),
    { id: BOSS_ID, subject: BOSS.subject, title: BOSS.title, isBoss: true },
  ];

  const doorState = (id: number): DoorState => {
    if (bestScores[id] != null) return 'completed';
    if (id <= unlockedLevel) return 'available';
    return 'locked';
  };

  const handleDoor = (id: number) => {
    if (doorState(id) === 'locked' || phase !== 'idle') return;
    setWalkingTo(id);
    setPhase('walking');
    // Phase 1: walk to the left edge of the chosen card.
    setTimeout(() => {
      // Phase 2: Toki gradually fades, tucked behind the card's left
      // edge — as if hiding/ducking behind it.
      setPhase('hiding');
      setTimeout(() => {
        // Phase 3: the card flashes, then a clean wipe carries us in.
        setPhase('opening');
        setTimeout(() => onEnterClassroom(id), 420);
      }, 500);
    }, 750);
  };

  const bossUnlocked = unlockedLevel >= BOSS_ID;
  const bossDone = bestScores[BOSS_ID] != null;

  return (
    <div className="hub">
      <header className="hub__header">
        <div>
          <p className="hub__eyebrow">Toki's Coaching Quest</p>
          <h1 className="hub__title">Choose a classroom to visit</h1>
        </div>
        <button className="hub__customize" onClick={onOpenSkins} aria-label="Customize Toki">
          <img src={skin.image} alt="" />
        </button>
      </header>

      <div className={`hub__corridor ${walkingTo != null ? 'hub__corridor--walking' : ''}`}>
        {cards.map((card, i) => {
          const state = doorState(card.id);
          const isTarget = walkingTo === card.id;
          return (
            <button
              key={card.id}
              className={`door door--${state} ${card.isBoss ? 'door--boss' : ''} ${isTarget ? 'door--target' : ''} ${isTarget && (phase === 'hiding' || phase === 'opening') ? 'door--opening' : ''}`}
              style={{ '--door-index': i } as React.CSSProperties}
              onClick={() => handleDoor(card.id)}
              disabled={state === 'locked' || phase !== 'idle'}
              aria-label={`${card.subject}: ${card.title}${state === 'locked' ? ' (locked)' : ''}`}
            >
              <span className="door__number">{card.isBoss ? '★' : card.id}</span>
              <span className="door__subject">{card.subject}</span>
              <span className="door__name">{card.title}</span>
              {state === 'completed' && (
                <span className="door__score">★ {bestScores[card.id]}</span>
              )}
              {state === 'locked' && <span className="door__lock" aria-hidden="true" />}
            </button>
          );
        })}

        {/* Toki walks along the corridor to the LEFT edge of the target
            card, then fades there — as if ducking behind it. */}
        <div
          className={`hub__toki ${walkingTo != null ? 'hub__toki--walking' : ''} ${phase === 'hiding' ? 'hub__toki--hiding' : ''}`}
          style={{ '--target-index': walkingTo != null ? walkingTo - 1 : 0 } as React.CSSProperties}
        >
          <img src={skin.image} alt="" />
        </div>
      </div>

      <p className="hub__hint">
        {bossDone
          ? 'You\u2019ve completed the Quest. Revisit any classroom to sharpen your score.'
          : bossUnlocked
          ? 'The Final Visit awaits. When you\u2019re ready, enter The Perfect Classroom.'
          : 'Complete a classroom to unlock the next.'}
      </p>

      <div className={`hub__wipe ${phase === 'opening' ? 'hub__wipe--active' : ''}`} aria-hidden="true" />
    </div>
  );
}
