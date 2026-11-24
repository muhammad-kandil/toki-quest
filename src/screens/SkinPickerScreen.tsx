import { useState } from 'react';
import { SKINS, isSkinUnlocked, type SkinDefinition } from '../data/skins';
import './SkinPickerScreen.css';

interface SkinPickerScreenProps {
  selectedSkinId: string;
  completedCount: number;
  onSelect: (skinId: string) => void;
  onBack: () => void;
  onResetProgress: () => void;
}

/**
 * The skin picker — "DLISs can change the skin" (original design
 * intent). Cosmetic only, no gameplay effect. Skins unlock as the
 * player completes classrooms, framed as personalization/reward for
 * progress rather than anything competitive (consistent with the
 * game's private-progress, no-leaderboard stance).
 */
export function SkinPickerScreen({
  selectedSkinId,
  completedCount,
  onSelect,
  onBack,
  onResetProgress,
}: SkinPickerScreenProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="skin-picker">
      <header className="skin-picker__header">
        <button className="skin-picker__back" onClick={onBack} aria-label="Back">
          ‹
        </button>
        <div>
          <p className="skin-picker__eyebrow">Personalize</p>
          <h1 className="skin-picker__title">Choose Toki's Look</h1>
        </div>
      </header>

      <p className="skin-picker__hint">
        Purely cosmetic — new looks unlock as you complete classrooms.
      </p>

      <div className="skin-picker__grid">
        {SKINS.map((skin) => (
          <SkinCard
            key={skin.id}
            skin={skin}
            isSelected={skin.id === selectedSkinId}
            isUnlocked={isSkinUnlocked(skin, completedCount)}
            onSelect={() => onSelect(skin.id)}
          />
        ))}
      </div>

      <div className="skin-picker__danger-zone">
        {!confirmingReset ? (
          <button className="skin-picker__reset-link" onClick={() => setConfirmingReset(true)}>
            Reset Progress
          </button>
        ) : (
          <div className="skin-picker__reset-confirm">
            <p>
              This clears all classroom scores, badges, and your selected skin. This
              can\u2019t be undone.
            </p>
            <div className="skin-picker__reset-actions">
              <button className="skin-picker__reset-cancel" onClick={() => setConfirmingReset(false)}>
                Cancel
              </button>
              <button
                className="skin-picker__reset-confirm-btn"
                onClick={() => {
                  setConfirmingReset(false);
                  onResetProgress();
                }}
              >
                Yes, reset everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkinCard({
  skin,
  isSelected,
  isUnlocked,
  onSelect,
}: {
  skin: SkinDefinition;
  isSelected: boolean;
  isUnlocked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`skin-card ${isSelected ? 'skin-card--selected' : ''} ${!isUnlocked ? 'skin-card--locked' : ''}`}
      onClick={onSelect}
      disabled={!isUnlocked}
    >
      <div className="skin-card__image-wrap">
        <img src={skin.image} alt={skin.label} className="skin-card__image" />
        {!isUnlocked && <span className="skin-card__lock" aria-hidden="true" />}
        {isSelected && <span className="skin-card__check">✓</span>}
      </div>
      <span className="skin-card__label">{skin.label}</span>
      {!isUnlocked && <span className="skin-card__unlock-detail">{skin.unlockDetail}</span>}
    </button>
  );
}
