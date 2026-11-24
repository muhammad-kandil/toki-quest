import { useEffect, useState } from 'react';
import tokiWalking from '../assets/raw/toki-reaction-walking.png';
import './SceneHeader.css';

interface SceneHeaderProps {
  image: string;
  alt: string;
}

/**
 * The classroom "establishing shot" — the scene the player sees on
 * entering. Toki is composited INSIDE the room (standing on the floor
 * area), and walks in from the left on load before settling, so it
 * reads as "Toki has entered this classroom" rather than a character
 * floating below a banner. The scene fades into the reading surface
 * below so the scenario text stays legible.
 *
 * Uses the default walking pose regardless of selected skin (Option B,
 * locked scope): skins show in the HUB corridor, the clearest "this is
 * my Toki" moment. This brief walk-in is closer to a reaction-scale
 * appearance, so it stays on the purpose-drawn default walking art
 * rather than a raw skin image that wasn't posed for this moment.
 */
export function SceneHeader({ image, alt }: SceneHeaderProps) {
  const [walkedIn, setWalkedIn] = useState(false);

  useEffect(() => {
    // Let the scene reveal first, then Toki walks in and settles.
    const t = setTimeout(() => setWalkedIn(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="scene-header">
      <img src={image} alt={alt} className="scene-header__image" />
      <div className="scene-header__fade" aria-hidden="true" />
      <div className={`scene-header__toki ${walkedIn ? 'scene-header__toki--settled' : ''}`}>
        <img src={tokiWalking} alt="" />
      </div>
    </div>
  );
}
