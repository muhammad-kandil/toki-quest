import { useState } from 'react';
import { SKINS, isSkinUnlocked, type SkinDefinition } from '../data/skins';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sfx } from '../audio/sfx';
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
  const { tx } = useLocale();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="skin-picker">
      <header className="skin-picker__header">
        <button className="skin-picker__back" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={tx(UI.back)}>
          <span className="skin-picker__chev" aria-hidden="true" />
        </button>
        <div>
          <p className="skin-picker__eyebrow">{tx(UI.personalize)}</p>
          <h1 className="skin-picker__title">{tx(UI.chooseLook)}</h1>
        </div>
      </header>

      <p className="skin-picker__hint">{tx(UI.skinsHint)}</p>

      <div className="skin-picker__grid">
        {SKINS.map((skin) => (
          <SkinCard
            key={skin.id}
            skin={skin}
            isSelected={skin.id === selectedSkinId}
            isUnlocked={isSkinUnlocked(skin, completedCount)}
            onSelect={() => { sfx.play('correct'); onSelect(skin.id); }}
          />
        ))}
      </div>

      <div className="skin-picker__danger-zone">
        {!confirmingReset ? (
          <button className="skin-picker__reset-link" onClick={() => { sfx.play('tap'); setConfirmingReset(true); }}>
            {tx(UI.resetProgress)}
          </button>
        ) : (
          <div className="skin-picker__reset-confirm">
            <p>{tx(UI.resetWarning)}</p>
            <div className="skin-picker__reset-actions">
              <button className="skin-picker__reset-cancel" onClick={() => { sfx.play('tap'); setConfirmingReset(false); }}>
                {tx(UI.cancel)}
              </button>
              <button
                className="skin-picker__reset-confirm-btn"
                onClick={() => {
                  setConfirmingReset(false);
                  onResetProgress();
                }}
              >
                {tx(UI.yesReset)}
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
  const { tx } = useLocale();
  return (
    <button
      className={`skin-card ${isSelected ? 'skin-card--selected' : ''} ${!isUnlocked ? 'skin-card--locked' : ''}`}
      onClick={onSelect}
      disabled={!isUnlocked}
    >
      <div className="skin-card__image-wrap">
        <img src={skin.image} alt={tx(skin.label)} className="skin-card__image" />
        {!isUnlocked && <span className="skin-card__lock" aria-hidden="true" />}
        {isSelected && <span className="skin-card__check">✓</span>}
      </div>
      <span className="skin-card__label">{tx(skin.label)}</span>
      {!isUnlocked && skin.unlockDetail && <span className="skin-card__unlock-detail">{tx(skin.unlockDetail)}</span>}
    </button>
  );
}
