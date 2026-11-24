import './TokiAvatar.css';

/**
 * A "living" Toki: the static illustration gets a gentle breathing
 * loop and an occasional head-tilt, so Toki never looks like a sticker
 * pinned to the page. Pure CSS — no frame animation needed, and it
 * respects prefers-reduced-motion.
 *
 * mood: idle (default) · walking (bob) · happy (small hop loop)
 */
export function TokiAvatar({
  src,
  size = 120,
  mood = 'idle',
  className = '',
  shadow = true,
}: {
  src: string;
  size?: number;
  mood?: 'idle' | 'walking' | 'happy' | 'still';
  className?: string;
  shadow?: boolean;
}) {
  return (
    <div
      className={`toki-avatar toki-avatar--${mood} ${shadow ? 'toki-avatar--shadow' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={src} alt="" draggable={false} />
    </div>
  );
}
