/**
 * Laptop puzzle: Build Your Learning Journey (SequencePuzzle).
 * Drag a practice card into a stage (long-press on touch, drag with a mouse),
 * or tap a card and then "+ Place here". Cards may belong to several stages;
 * nothing is ever marked wrong. Always labelled as a simulation.
 */
import { useRef, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { checkPuzzle, type Placement, type PuzzleCheck } from '../engine/mission';
import { S, fmt } from '../strings';
import type { Adventure, SequencePuzzle, Stage } from '../types';

const STAGES: Stage[] = ['launch', 'facilitate', 'extend'];

export default function PuzzleBoard({ puzzle, solved, onSolved, onClose, badge }: {
  puzzle: SequencePuzzle; solved: boolean; onSolved: () => void; onClose: () => void; badge?: Adventure['badges'][number];
}) {
  const { tx } = useLocale();
  const [place, setPlace] = useState<Placement>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [over, setOver] = useState<Stage | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [check, setCheck] = useState<PuzzleCheck | null>(null);
  const press = useRef<number | undefined>(undefined);
  const dragId = useRef<string | null>(null);

  const left = puzzle.cards.filter((c) => !place[c.id]).length;
  const putIn = (cardId: string, st: Stage) => {
    sfx.play('step');
    setPlace((p) => ({ ...p, [cardId]: st }));
    setSelected(null);
    setCheck(null);
  };
  const tapCard = (id: string) => { sfx.play('tap'); setSelected((s) => (s === id ? null : id)); };
  const doCheck = () => {
    const r = checkPuzzle(puzzle, place);
    setCheck(r);
    if (r.complete && !solved) onSolved();
  };

  /* touch drag: long-press 150ms lifts; drop on the column under the finger */
  const stageAt = (x: number, y: number): Stage | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const col = el && (el.closest ? el.closest('[data-stage]') : null);
    return col ? (col.getAttribute('data-stage') as Stage) : null;
  };
  const onTouchStart = (id: string) => {
    window.clearTimeout(press.current);
    press.current = window.setTimeout(() => { dragId.current = id; setDragging(id); }, 150);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragId.current) { window.clearTimeout(press.current); return; }
    const t = e.touches[0];
    setOver(stageAt(t.clientX, t.clientY));
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    window.clearTimeout(press.current);
    const id = dragId.current;
    dragId.current = null;
    setDragging(null);
    setOver(null);
    if (!id) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    const st = stageAt(t.clientX, t.clientY);
    if (st) putIn(id, st);
  };

  const cardEl = (id: string, inTray: boolean) => {
    const c = puzzle.cards.find((x) => x.id === id)!;
    const st = place[id];
    const fit = check && st && c.stages.includes(st);
    const also = fit ? c.stages.filter((x) => x !== st) : [];
    const cls = 't-practice' + (st && !inTray ? ' is-placed' : '') + (selected === id ? ' is-selected' : '') + (dragging === id ? ' is-dragging' : '')
      + (fit ? ' is-fit' : '') + (also.length ? ' is-also' : '');
    return (
      <button key={id} type="button" className={cls} data-card={id} draggable
        data-also={also.length ? tx(S.stageShort[also[0]]) : undefined}
        aria-pressed={selected === id}
        onClick={() => tapCard(id)}
        onDragStart={(e) => { try { e.dataTransfer.setData('text/plain', id); } catch { /* ignore */ } setDragging(id); }}
        onDragEnd={() => { setDragging(null); setOver(null); }}
        onTouchStart={() => onTouchStart(id)} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {tx(c.text)}
      </button>
    );
  };

  return (
    <div className="ts-puzzle t-stack--3">
      <h2 className="ts-h-lg">{tx(puzzle.title)}</h2>
      <p className="ts-hint">{tx(puzzle.intro)}</p>
      <div className="t-laptop">
        <div className="t-laptop__screen">
          <div className="t-laptop__bar"><i /><i /><i /> {tx(S.planner)} <span className="t-sim-label">{tx(S.simLabel)}</span></div>
          <div className="t-journey">
            {STAGES.map((st, i) => (
              <div key={st} className={`t-journey__col t-journey__col--${st}`} data-stage={st}>
                <div className="t-journey__head">{tx(S.stage[st])}<small>{fmt(tx(S.stageNum), { n: i + 1 })}</small></div>
                <div className={'t-journey__drop' + (over === st ? ' is-over' : '')} data-stage={st}
                  onDragOver={(e) => { e.preventDefault(); setOver(st); }} onDragLeave={() => setOver(null)}
                  onDrop={(e) => { e.preventDefault(); let id = ''; try { id = e.dataTransfer.getData('text/plain'); } catch { /* ignore */ } id = id || dragging || ''; setOver(null); setDragging(null); if (id) putIn(id, st); }}>
                  {puzzle.cards.filter((c) => place[c.id] === st).map((c) => cardEl(c.id, false))}
                  {selected && place[selected] !== st && (
                    <button type="button" className="t-journey__target" data-place={st} onClick={() => putIn(selected, st)}>+ {tx(S.placeHere)}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {left > 0 && (
            <div className="t-practice-tray">
              {puzzle.cards.filter((c) => !place[c.id]).map((c) => cardEl(c.id, true))}
            </div>
          )}
        </div>
      </div>
      <p className="ts-hint" aria-live="polite">
        {selected ? fmt(tx(S.selectedCard), { c: tx(puzzle.cards.find((c) => c.id === selected)!.text) }) : tx(S.puzzleHow)}
      </p>
      {check && !check.complete && check.misplaced.map((id) => {
        const c = puzzle.cards.find((x) => x.id === id)!;
        return <p key={id} className="t-card t-card--inset ts-why">{fmt(tx(S.usuallySits), { c: tx(c.text), s: c.stages.map((x) => tx(S.stage[x])).join(' / ') })}</p>;
      })}
      {!(check && check.complete) && (
        <button type="button" className="t-btn t-btn--block ts-puzzle__check" disabled={left > 0} onClick={doCheck}>
          {tx(S.checkJourney)}{left > 0 ? ' · ' + fmt(tx(S.cardsLeft), { n: left }) : ''}
        </button>
      )}
      {check && check.complete && (
        <div className="t-card t-card--good t-stack ts-puzzle__done">
          {badge && <p className="ts-row"><span className="t-medal t-medal--sm" aria-hidden="true">{badge.icon}</span><strong>{tx(badge.title)}</strong></p>}
          <p className="ts-hint">{tx(puzzle.note)}</p>
          <span className="t-xp">+{puzzle.xp} {tx(S.xp)}</span>
        </div>
      )}
      {!check?.complete && <p className="ts-hint">{tx(puzzle.note)}</p>}
      <button type="button" className={'t-btn t-btn--block ts-puzzle__close' + (check?.complete ? '' : ' t-btn--ghost')} onClick={onClose}>{tx(S.backToClass)}</button>
    </div>
  );
}
