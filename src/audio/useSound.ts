import { useEffect, useState } from 'react';
import { sfx } from './sfx';

/** React binding for the sound preference (mute toggle). */
export function useSound() {
  const [on, setOn] = useState(sfx.isEnabled());
  useEffect(() => { const off = sfx.subscribe(setOn); return () => { off(); }; }, []);
  return { on, toggle: () => sfx.setEnabled(!on), play: sfx.play };
}
