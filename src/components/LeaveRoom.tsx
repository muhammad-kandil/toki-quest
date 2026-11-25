import { useEffect, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import './LeaveRoom.css';

/** A quiet exit from any classroom. Two taps: the first shows what
 *  leaving costs, the second leaves. Playtest finding: there was no way
 *  out of a room except finishing it or killing the app. */
export function LeaveRoom({ onLeave }: { onLeave: () => void }) {
  const { tx } = useLocale();
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const id = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(id);
  }, [armed]);
  return (
    <div className={`leave-room ${armed ? 'leave-room--armed' : ''}`}>
      <button
        type="button"
        className="leave-room__btn"
        aria-label={tx(UI.leaveRoom)}
        onClick={() => { sfx.play('tap'); if (armed) onLeave(); else setArmed(true); }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      {armed && <span className="leave-room__note" role="status">{tx(UI.leaveRoomConfirm)}</span>}
    </div>
  );
}
