import { useEffect, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { UI, fmt } from '../i18n/ui';
import { sfx } from '../audio/sfx';
import { fetchBoard, type Board } from '../telegram/progress';
import './BadgesScreen.css';
import './BoardScreen.css';

/**
 * Coaches' ranking. Best score per room, summed — never speed, never
 * streaks. Players who chose to hide see their own rank only.
 */
export function BoardScreen({ myName, onEditName, onBack }: { myName: string; onEditName: () => void; onBack: () => void }) {
  const { tx } = useLocale();
  const [state, setBoard] = useState<Board | null | 'loading' | 'unavailable'>('loading');
  const board = state === 'unavailable' ? null : state;
  useEffect(() => {
    let live = true;
    fetchBoard().then((b) => { if (live) { setBoard(b); if (b && b !== 'unavailable' && b.top.length) sfx.play('gallery'); } });
    return () => { live = false; };
  }, []);

  const me = board && board !== 'loading' ? board.me : null;
  const meInTop = board && board !== 'loading' ? board.top.some((r) => r.me) : false;

  return (
    <div className="badges board">
      <header className="badges__header">
        <button className="badges__back" onClick={() => { sfx.play('tap'); onBack(); }} aria-label={tx(UI.back)}>
          <span className="badges__chev" aria-hidden="true" />
        </button>
        <div>
          {board && board !== 'loading' && <p className="badges__eyebrow">{fmt(tx(UI.boardPlayers), { n: board.players })}</p>}
          <h1 className="badges__title">{tx(UI.boardTitle)}</h1>
        </div>
      </header>
      <p className="badges__hint">{tx(UI.boardHint)}</p>

      {board === 'loading' && <p className="board__state">{tx(UI.boardLoading)}</p>}
      {state === null && <p className="board__state">{tx(UI.boardOffline)}</p>}
      {state === 'unavailable' && <p className="board__state">{tx(UI.boardUnavailable)}</p>}
      {board && board !== 'loading' && board.top.length === 0 && <p className="board__state">{tx(UI.boardEmpty)}</p>}

      {board && board !== 'loading' && board.top.length > 0 && (
        <ol className="board__list">
          {board.top.map((r, i) => (
            <li key={i} className={`board__row ${r.me ? 'board__row--me' : ''} ${r.rank <= 3 ? `board__row--top board__row--r${r.rank}` : ''}`} style={{ animationDelay: `${i * 45}ms` }}>
              <span className="board__rank"><bdi dir="ltr">{r.rank}</bdi></span>
              <span className="board__name"><bdi>{r.me ? `${r.name} · ${tx(UI.boardYou)}` : r.name}</bdi><small>{fmt(tx(UI.boardRooms), { n: r.rooms })}</small></span>
              <span className="board__total"><bdi dir="ltr">{r.total}</bdi></span>
            </li>
          ))}
        </ol>
      )}

      {me && !meInTop && (
        <div className="board__row board__row--me board__row--solo">
          <span className="board__rank"><bdi dir="ltr">{me.rank}</bdi></span>
          <span className="board__name"><bdi>{`${me.name} · ${tx(UI.boardYou)}`}</bdi><small>{fmt(tx(UI.boardRooms), { n: me.rooms })}</small></span>
          <span className="board__total"><bdi dir="ltr">{me.total}</bdi></span>
        </div>
      )}
      {me?.hidden && <p className="board__note">{tx(UI.boardHidden)}</p>}

      <button className="board__edit" onClick={() => { sfx.play('tap'); onEditName(); }}>
        <span className="board__edit-name"><bdi>{myName}</bdi></span>
        <span>{tx(UI.boardEditName)}</span>
      </button>
    </div>
  );
}
