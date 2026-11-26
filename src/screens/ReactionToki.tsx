import { useEffect, useState } from 'react';
import affirmingToki from '../assets/raw/toki-reaction-affirming.png';
import thoughtfulToki from '../assets/raw/toki-reaction-thoughtful.png';
import celebratingToki from '../assets/raw/toki-reaction-celebrating.png';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import type { Text } from '../i18n/types';
import { TokiSprite, type TokiPose } from '../components/TokiSprite';
import './ReactionToki.css';

export type ReactionKind = 'affirming' | 'thoughtful' | 'celebrating' | null;

interface ReactionTokiProps {
  kind: ReactionKind;
  /** Increments on every reaction request. Keying the animation on this
   * (not just `kind`) is what lets two IDENTICAL reactions in a row
   * (e.g. two wrong answers = two "thoughtful") both re-animate —
   * without it, React sees no change in `kind` and skips the second. */
  trigger: number;
}

const CONFIG: Record<Exclude<ReactionKind, null>, { image: string; pose: TokiPose; label: Text; holdMs: number }> = {
  affirming: { image: affirmingToki, pose: 'affirm', label: UI.niceRead, holdMs: 1000 },
  thoughtful: { image: thoughtfulToki, pose: 'think', label: UI.lookAgain, holdMs: 1300 },
  celebrating: { image: celebratingToki, pose: 'celebrate', label: UI.restored, holdMs: 1700 },
};

/**
 * Character-driven feedback, replacing generic emoji/checkmarks per
 * the design research: Toki's own expression carries the "correct" /
 * "try again" / "celebrate" signal, calibrated to a calm-confidence
 * register for adult professional learners — not arcade celebration.
 */
export function ReactionToki({ kind, trigger }: ReactionTokiProps) {
  const { tx } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!kind) {
      setVisible(false);
      return;
    }
    // Re-show on every trigger change, even if `kind` is unchanged.
    setVisible(false);
    // Next frame: turn visible on so the CSS transition re-runs from the
    // hidden state (guarantees the pop-in animation replays every time).
    const raf = requestAnimationFrame(() => setVisible(true));
    const hold = CONFIG[kind].holdMs;
    const t = setTimeout(() => setVisible(false), hold);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, kind]);

  if (!kind) return null;

  const { image, pose, label } = CONFIG[kind];

  // key={trigger} remounts the body so its keyframes replay on every
  // reaction, including two identical ones in a row.
  return (
    <div className={`reaction-toki ${visible ? 'reaction-toki--visible' : ''} reaction-toki--${kind}`} role="status">
      <span className="reaction-toki__body" key={trigger}>
        <TokiSprite pose={pose} fallback={image} />
      </span>
      <span className="reaction-toki__label" key={`l${trigger}`}>{tx(label)}</span>
    </div>
  );
}
