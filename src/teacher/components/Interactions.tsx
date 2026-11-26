/**
 * Interaction components (GAME_PACKAGE.md "Interactions", non-MCQ), reading
 * ClassEvent.interaction + ClassEvent.task. Every drag has a
 * tap/select-and-place alternative; targets ≥44px; focus via theme.css;
 * RTL via layout classes; no motion needed. Nothing is marked wrong: "Check"
 * nudges the items that don't fit yet. After completion the task's note
 * explains why the evidence points that way.
 * `data-fit` attributes are test hooks for the e2e (never shown).
 */
import { useMemo, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { checkCardToTarget, checkOrder, checkPattern, checkPlan, fitOf, shuffled, type InteractionType } from '../engine/interactions';
import { S, fmt } from '../strings';
import type { Card, Task } from '../types';

interface Props { type: InteractionType; task: Task; done: boolean; onDone: () => void; rand: () => number; onEvidence?: (id: string) => void }

function CheckBtn({ disabled, onClick, left }: { disabled: boolean; onClick: () => void; left: number }) {
  const { tx } = useLocale();
  return (
    <button type="button" className="t-btn t-btn--block ts-int-check" disabled={disabled} onClick={onClick}>
      {tx(S.intCheck)}{left > 0 ? ' · ' + fmt(tx(S.cardsLeft), { n: left }) : ''}
    </button>
  );
}

function Note({ task, done }: { task: Task; done: boolean }) {
  const { tx } = useLocale();
  return done && task.note ? <p className="t-card t-card--insight ts-int__note">{tx(task.note)}</p> : null;
}

/* ---------------- compare: reveal the cards side by side ---------------- */
function Compare({ task, done, onDone, onEvidence }: Props) {
  const { tx } = useLocale();
  const cards = task.cards ?? [];
  const [open, setOpen] = useState<string[]>([]);
  const reveal = (id: string) => {
    if (open.includes(id)) return;
    sfx.play('discover');
    onEvidence?.(id);
    const next = [...open, id];
    setOpen(next);
    if (next.length === cards.length && !done) onDone();
  };
  return (
    <div className="ts-int ts-int--compare">
      <p className="ts-int__prompt">{tx(S.intCompare)}</p>
      <div className="ts-compare">
        {cards.map((x) => (
          <button key={x.id} type="button" className={'t-card ts-compare__item' + (open.includes(x.id) ? ' is-open' : '')} data-compare={x.id} aria-expanded={open.includes(x.id)} onClick={() => reveal(x.id)}>
            <span className="t-eyebrow">{tx(x.label)}</span>
            <span className="ts-compare__text">{open.includes(x.id) ? tx(x.text) : tx(S.tapToLook)}</span>
          </button>
        ))}
      </div>
      <Note task={task} done={done} />
    </div>
  );
}

/* ---------------- hint: least → most intrusive, one at a time ---------------- */
function Hint({ task, done, onDone, onEvidence }: Props) {
  const { tx } = useLocale();
  const hints = task.hints ?? [];
  const [shown, setShown] = useState(0);
  const more = () => {
    sfx.play('discover');
    onEvidence?.('hint-' + shown);
    setShown(shown + 1);
    if (!done) onDone();
  };
  return (
    <div className="ts-int ts-int--hint">
      <p className="ts-int__prompt">{tx(S.intHint)}</p>
      <ol className="ts-hints">{hints.slice(0, shown).map((h, i) => <li key={i} className="t-card t-card--inset">{tx(h)}</li>)}</ol>
      {shown < hints.length && (
        <button type="button" className="t-btn t-btn--ghost ts-hint-next" onClick={more}>{shown === 0 ? tx(S.intHintFirst) : tx(S.intHintMore)}</button>
      )}
      <Note task={task} done={done} />
    </div>
  );
}

/* ---------------- match: evidence → interpretation (tap one, then the other) ---------------- */
function Match({ type, task, done, onDone, rand }: Props) {
  const { tx } = useLocale();
  const cards = task.cards ?? [];
  const targets = useMemo(() => shuffled(task.targets ?? [], rand), [task, rand]);
  const [sel, setSel] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [nudge, setNudge] = useState<string[]>([]);
  const left = cards.filter((c) => !chosen[c.id]).length;
  const pickTarget = (t: string) => {
    if (!sel) return;
    sfx.play('step');
    setChosen({ ...chosen, [sel]: t });
    setSel(null);
    setNudge([]);
  };
  const check = () => {
    const r = checkCardToTarget(task, chosen);
    if (r.complete) { sfx.play('correct'); if (!done) onDone(); }
    setNudge(r.pending);
  };
  return (
    <div className="ts-int ts-int--match">
      <p className="ts-int__prompt">{tx(S.intMatch)}</p>
      <div className="ts-match">
        <div className="ts-match__col">
          {cards.map((c) => (
            <button key={c.id} type="button" className={'t-practice ts-match__ev' + (sel === c.id ? ' is-selected' : '') + (chosen[c.id] ? ' is-placed' : '') + (nudge.includes(c.id) ? ' ts-nudge' : '')}
              data-evidence={c.id} data-fit={fitOf(type, task, c.id)} aria-pressed={sel === c.id} onClick={() => setSel(sel === c.id ? null : c.id)} disabled={done}>
              {tx(c.text)}
              {chosen[c.id] && <small className="ts-match__arrow">→ {tx(targets.find((x) => x.id === chosen[c.id])!.text)}</small>}
            </button>
          ))}
        </div>
        <div className="ts-match__col">
          {targets.map((t) => (
            <button key={t.id} type="button" className={'t-practice ts-match__mean' + (Object.values(chosen).includes(t.id) ? ' is-placed' : '')} data-meaning={t.id} disabled={!sel || done} onClick={() => pickTarget(t.id)}>
              {tx(t.text)}
            </button>
          ))}
        </div>
      </div>
      {!done && <p className="ts-hint" aria-live="polite">{sel ? tx(S.intMatchNow) : nudge.length ? tx(S.intNudge) : tx(S.intMatchHow)}</p>}
      {!done && <CheckBtn disabled={left > 0} onClick={check} left={left} />}
      <Note task={task} done={done} />
    </div>
  );
}

/* ---------------- sort / plan: place cards into bins or plan slots (tap card, tap bin; or drag) ---------------- */
function Buckets({ type, task, done, onDone }: Props) {
  const { tx } = useLocale();
  const cards = task.cards ?? [];
  const bins = task.targets ?? [];
  const oneEach = type === 'plan';
  const [placed, setPlaced] = useState<Record<string, string | undefined>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string[]>([]);
  const [drag, setDrag] = useState<string | null>(null);
  const put = (card: string, bin: string) => {
    sfx.play('step');
    const next = { ...placed };
    if (oneEach) for (const k of Object.keys(next)) if (next[k] === bin) next[k] = undefined;
    next[card] = bin;
    setPlaced(next); setSel(null); setNudge([]);
  };
  const unplace = (card: string) => { const next = { ...placed }; next[card] = undefined; setPlaced(next); };
  const left = oneEach ? bins.filter((b) => !Object.values(placed).includes(b.id)).length : cards.filter((c) => !placed[c.id]).length;
  const cardEl = (c: Card) => (
    <button key={c.id} type="button" draggable={!done} data-card={c.id} data-fit={fitOf(type, task, c.id) ?? ''}
      className={'t-practice' + (sel === c.id ? ' is-selected' : '') + (placed[c.id] ? ' is-placed' : '') + (drag === c.id ? ' is-dragging' : '') + (nudge.includes(c.id) || nudge.includes(placed[c.id] ?? '') ? ' ts-nudge' : '')}
      aria-pressed={sel === c.id} disabled={done} onClick={() => setSel(sel === c.id ? null : c.id)}
      onDragStart={(e) => { try { e.dataTransfer.setData('text/plain', c.id); } catch { /* ignore */ } setDrag(c.id); }} onDragEnd={() => setDrag(null)}>
      {tx(c.text)}
    </button>
  );
  const tray = cards.filter((c) => !placed[c.id]);
  const check = () => {
    const r = oneEach ? checkPlan(task, placed) : checkCardToTarget(task, placed);
    if (r.complete) { sfx.play('correct'); if (!done) onDone(); }
    setNudge(r.pending);
  };
  return (
    <div className={'ts-int ts-int--buckets ts-int--' + type}>
      <p className="ts-int__prompt">{tx(oneEach ? S.intPlan : S.intSort)}</p>
      <div className="ts-buckets">
        {bins.map((b) => (
          <div key={b.id} className={'ts-bucket' + (nudge.includes(b.id) ? ' ts-nudge' : '')} data-bucket={b.id}
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); let id = ''; try { id = e.dataTransfer.getData('text/plain'); } catch { /* ignore */ } id = id || drag || ''; setDrag(null); if (id && !done) put(id, b.id); }}>
            <div className="ts-bucket__head">{tx(b.text)}</div>
            <div className="ts-bucket__body">
              {cards.filter((c) => placed[c.id] === b.id).map(cardEl)}
              {sel && placed[sel] !== b.id && <button type="button" className="t-journey__target ts-bucket__target" data-place={b.id} onClick={() => put(sel, b.id)}>+ {tx(S.placeHere)}</button>}
            </div>
          </div>
        ))}
      </div>
      {tray.length > 0 && !done && <div className="t-practice-tray ts-tray-cards">{tray.map(cardEl)}</div>}
      {sel && placed[sel] && !done && <button type="button" className="ts-link" onClick={() => { unplace(sel); setSel(null); }}>{tx(S.intBackToTray)}</button>}
      {!done && <p className="ts-hint" aria-live="polite">{nudge.length ? tx(S.intNudge) : tx(S.puzzleHow)}</p>}
      {!done && <CheckBtn disabled={left > 0} left={left} onClick={check} />}
      <Note task={task} done={done} />
    </div>
  );
}

/* ---------------- order: tap a step, then tap where it goes ---------------- */
function Order({ type, task, done, onDone, rand }: Props) {
  const { tx } = useLocale();
  const cards = task.cards ?? [];
  const start = useMemo(() => {
    let s = shuffled(cards.map((x) => x.id), rand);
    if (checkOrder(task, s).complete && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  }, [task, rand]); // eslint-disable-line react-hooks/exhaustive-deps
  const [order, setOrder] = useState<string[]>(start);
  const [sel, setSel] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string[]>([]);
  const moveTo = (id: string, pos: number) => {
    sfx.play('step');
    const rest = order.filter((x) => x !== id);
    setOrder([...rest.slice(0, pos), id, ...rest.slice(pos)]);
    setSel(null); setNudge([]);
  };
  return (
    <div className="ts-int ts-int--order">
      <p className="ts-int__prompt">{tx(S.intOrder)}</p>
      <ol className="ts-order">
        {order.map((id, i) => {
          const c = cards.find((x) => x.id === id)!;
          return (
            <li key={id} className="ts-order__row">
              <span className="ts-order__n t-num">{i + 1}</span>
              <button type="button" className={'t-practice ts-order__item' + (sel === id ? ' is-selected' : '') + (nudge.includes(id) ? ' ts-nudge' : '')}
                data-item={id} data-fit={fitOf(type, task, id)} aria-pressed={sel === id} disabled={done} onClick={() => setSel(sel === id ? null : id)}>
                {tx(c.text)}
              </button>
              {sel && sel !== id && <button type="button" className="t-btn t-btn--ghost ts-order__here" data-slot={i} onClick={() => moveTo(sel, i)} aria-label={fmt(tx(S.intPutAt), { n: i + 1 })}>↧</button>}
            </li>
          );
        })}
      </ol>
      {!done && <p className="ts-hint" aria-live="polite">{nudge.length ? tx(S.intNudge) : sel ? tx(S.intOrderNow) : tx(S.intOrderHow)}</p>}
      {!done && <CheckBtn disabled={false} left={0} onClick={() => { const r = checkOrder(task, order); if (r.complete) { sfx.play('correct'); onDone(); } setNudge(r.pending); }} />}
      <Note task={task} done={done} />
    </div>
  );
}

/* ---------------- pattern: pick a pattern, tap the responses that show it, on a class view ---------------- */
function Pattern({ type, task, done, onDone }: Props) {
  const { tx } = useLocale();
  const cards = task.cards ?? [];
  const patterns = task.patterns ?? [];
  const [pat, setPat] = useState<string>(patterns[0]?.id ?? '');
  const [tags, setTags] = useState<Record<string, string | undefined>>({});
  const [nudge, setNudge] = useState<string[]>([]);
  const tap = (id: string) => {
    sfx.play('tap');
    setNudge([]);
    setTags((t) => ({ ...t, [id]: t[id] === pat ? undefined : pat }));
  };
  const left = cards.filter((c) => !tags[c.id]).length;
  const tone = (pid?: string) => (pid ? patterns.findIndex((p) => p.id === pid) % 4 : -1);
  return (
    <div className="ts-int ts-int--pattern">
      <p className="ts-int__prompt">{tx(S.intPattern)}</p>
      <div className="ts-chips ts-patterns" role="radiogroup" aria-label={tx(S.intPattern)}>
        {patterns.map((p, i) => (
          <button key={p.id} type="button" role="radio" aria-checked={pat === p.id} data-pattern={p.id} disabled={done}
            className={`t-chip ts-pat ts-pat--${i % 4}` + (pat === p.id ? ' is-on' : '')} onClick={() => setPat(p.id)}>{tx(p.label)}</button>
        ))}
      </div>
      <div className="t-laptop ts-pattern__laptop">
        <div className="t-laptop__screen">
          <div className="t-laptop__bar"><i /><i /><i /> {tx(S.classView)} <span className="t-sim-label">{tx(S.simLabel)}</span></div>
          <div className="ts-pattern">
            {cards.map((c) => (
              <button key={c.id} type="button" className={`ts-cell ts-cell--t${tone(tags[c.id])}` + (tags[c.id] ? ' is-on' : '') + (nudge.includes(c.id) ? ' ts-nudge' : '')}
                data-cell={c.id} data-fit={fitOf(type, task, c.id)} aria-pressed={!!tags[c.id]} disabled={done} onClick={() => tap(c.id)}>
                <span className="ts-cell__ans">{tx(c.text)}</span>
                {tags[c.id] && <span className="ts-cell__who">{tx(patterns.find((p) => p.id === tags[c.id])!.label)}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      {!done && <p className="ts-hint" aria-live="polite">{nudge.length ? tx(S.intPatternNudge) : fmt(tx(S.intTagged), { n: cards.length - left, t: cards.length })}</p>}
      {!done && <CheckBtn disabled={left > 0} left={left} onClick={() => { const r = checkPattern(task, tags); if (r.complete) { sfx.play('correct'); onDone(); } setNudge(r.pending); }} />}
      <Note task={task} done={done} />
    </div>
  );
}

/** Renders the event's interaction (investigate — and compare over investigate clues — use the clue cards in the scene panel). */
export function InteractionView(p: Props) {
  switch (p.type) {
    case 'investigate': return null;
    case 'compare': return <Compare {...p} />;
    case 'hint': return <Hint {...p} />;
    case 'match': return <Match {...p} />;
    case 'order': return <Order {...p} />;
    case 'pattern': return <Pattern {...p} />;
    case 'sort':
    case 'plan': return <Buckets {...p} />;
  }
}
