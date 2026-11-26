/**
 * Interaction components (GAME_PACKAGE.md "Interactions", non-MCQ).
 * Every drag has a tap/select-and-place alternative; targets ≥44px; focus
 * via theme.css; RTL via layout classes; no motion needed. Nothing is ever
 * marked wrong: "Check" nudges the items that don't fit yet.
 * `data-fit` attributes are test hooks for the e2e (never shown).
 */
import { useMemo, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { sfx } from '../../audio/sfx';
import { checkMatch, checkOrder, checkPattern, checkPlan, checkSort, shuffled, type Interaction } from '../engine/interactions';
import { S, fmt } from '../strings';

interface Props<T extends Interaction> { it: T; done: boolean; onDone: () => void; rand: () => number; onEvidence?: (id: string) => void }

function Head({ prompt, fallback }: { prompt?: { en: string; ar: string }; fallback: string }) {
  const { tx } = useLocale();
  return <p className="ts-int__prompt">{prompt ? tx(prompt) : fallback}</p>;
}

function CheckBtn({ disabled, onClick, left }: { disabled: boolean; onClick: () => void; left: number }) {
  const { tx } = useLocale();
  return (
    <button type="button" className="t-btn t-btn--block ts-int-check" disabled={disabled} onClick={onClick}>
      {tx(S.intCheck)}{left > 0 ? ' · ' + fmt(tx(S.cardsLeft), { n: left }) : ''}
    </button>
  );
}

/* ---------------- compare: reveal both, then compare ---------------- */
function Compare({ it, done, onDone, onEvidence }: Props<Extract<Interaction, { type: 'compare' }>>) {
  const { tx } = useLocale();
  const [open, setOpen] = useState<string[]>([]);
  const reveal = (id: string) => {
    if (open.includes(id)) return;
    sfx.play('discover');
    onEvidence?.(id);
    const next = [...open, id];
    setOpen(next);
    if (next.length === it.items.length && !done) onDone();
  };
  return (
    <div className="ts-int ts-int--compare">
      <Head prompt={it.prompt} fallback={tx(S.intCompare)} />
      <div className="ts-compare">
        {it.items.map((x) => (
          <button key={x.id} type="button" className={'t-card ts-compare__item' + (open.includes(x.id) ? ' is-open' : '')} data-compare={x.id} aria-expanded={open.includes(x.id)} onClick={() => reveal(x.id)}>
            <span className="t-eyebrow">{tx(x.label)}</span>
            <span className="ts-compare__text">{open.includes(x.id) ? tx(x.text) : tx(S.tapToLook)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- hint: progressive hints ---------------- */
function Hint({ it, done, onDone, onEvidence }: Props<Extract<Interaction, { type: 'hint' }>>) {
  const { tx } = useLocale();
  const [shown, setShown] = useState(0);
  const more = () => {
    sfx.play('discover');
    onEvidence?.('hint-' + shown);
    setShown(shown + 1);
    if (!done) onDone();
  };
  return (
    <div className="ts-int ts-int--hint">
      <Head prompt={it.prompt} fallback={tx(S.intHint)} />
      <ol className="ts-hints">{it.hints.slice(0, shown).map((h, i) => <li key={i} className="t-card t-card--inset">{tx(h)}</li>)}</ol>
      {shown < it.hints.length && (
        <button type="button" className="t-btn t-btn--ghost ts-hint-next" onClick={more}>{shown === 0 ? tx(S.intHintFirst) : tx(S.intHintMore)}</button>
      )}
    </div>
  );
}

/* ---------------- match: evidence → interpretation (tap one, then the other) ---------------- */
function Match({ it, done, onDone, rand }: Props<Extract<Interaction, { type: 'match' }>>) {
  const { tx } = useLocale();
  const meanings = useMemo(() => shuffled(it.pairs, rand), [it, rand]);
  const [sel, setSel] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [nudge, setNudge] = useState<string[]>([]);
  const left = it.pairs.filter((p) => !chosen[p.id]).length;
  const pickMeaning = (m: string) => {
    if (!sel) return;
    sfx.play('step');
    const next = { ...chosen };
    for (const k of Object.keys(next)) if (next[k] === m) delete next[k];
    next[sel] = m;
    setChosen(next);
    setSel(null);
    setNudge([]);
  };
  const check = () => {
    const r = checkMatch(it.pairs, chosen);
    if (r.complete) { sfx.play('correct'); if (!done) onDone(); }
    setNudge(r.pending);
  };
  return (
    <div className="ts-int ts-int--match">
      <Head prompt={it.prompt} fallback={tx(S.intMatch)} />
      <div className="ts-match">
        <div className="ts-match__col">
          {it.pairs.map((p) => (
            <button key={p.id} type="button" className={'t-practice ts-match__ev' + (sel === p.id ? ' is-selected' : '') + (chosen[p.id] ? ' is-placed' : '') + (nudge.includes(p.id) ? ' ts-nudge' : '')}
              data-evidence={p.id} aria-pressed={sel === p.id} onClick={() => setSel(sel === p.id ? null : p.id)}>
              {tx(p.evidence)}
              {chosen[p.id] && <small className="ts-match__arrow">→ {tx(it.pairs.find((x) => x.id === chosen[p.id])!.meaning)}</small>}
            </button>
          ))}
        </div>
        <div className="ts-match__col">
          {meanings.map((m) => (
            <button key={m.id} type="button" className={'t-practice ts-match__mean' + (Object.values(chosen).includes(m.id) ? ' is-placed' : '')} data-meaning={m.id} disabled={!sel} onClick={() => pickMeaning(m.id)}>
              {tx(m.meaning)}
            </button>
          ))}
        </div>
      </div>
      <p className="ts-hint" aria-live="polite">{sel ? tx(S.intMatchNow) : nudge.length ? tx(S.intNudge) : tx(S.intMatchHow)}</p>
      {!done && <CheckBtn disabled={left > 0} onClick={check} left={left} />}
    </div>
  );
}

/* ---------------- sort / plan: place cards into buckets (tap card, tap bucket; or drag) ---------------- */
function Buckets({ prompt, fallback, buckets, items, oneEach, done, onDone, check }: {
  prompt?: { en: string; ar: string }; fallback: string; buckets: { id: string; label: { en: string; ar: string } }[];
  items: { id: string; text: { en: string; ar: string }; fits: string[] }[]; oneEach: boolean; done: boolean; onDone: () => void;
  check: (placed: Record<string, string | undefined>) => { complete: boolean; pending: string[] };
}) {
  const { tx } = useLocale();
  const [placed, setPlaced] = useState<Record<string, string | undefined>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string[]>([]);
  const [drag, setDrag] = useState<string | null>(null);
  const put = (item: string, b: string) => {
    sfx.play('step');
    const next = { ...placed };
    if (oneEach) for (const k of Object.keys(next)) if (next[k] === b) next[k] = undefined;
    next[item] = b;
    setPlaced(next); setSel(null); setNudge([]);
  };
  const left = oneEach ? buckets.filter((b) => !Object.values(placed).includes(b.id)).length : items.filter((i) => !placed[i.id]).length;
  const card = (i: { id: string; text: { en: string; ar: string }; fits: string[] }) => (
    <button key={i.id} type="button" draggable data-card={i.id} data-fit={i.fits[0]}
      className={'t-practice' + (sel === i.id ? ' is-selected' : '') + (placed[i.id] ? ' is-placed' : '') + (drag === i.id ? ' is-dragging' : '') + (nudge.includes(i.id) ? ' ts-nudge' : '')}
      aria-pressed={sel === i.id} onClick={() => setSel(sel === i.id ? null : i.id)}
      onDragStart={(e) => { try { e.dataTransfer.setData('text/plain', i.id); } catch { /* ignore */ } setDrag(i.id); }} onDragEnd={() => setDrag(null)}>
      {tx(i.text)}
    </button>
  );
  const tray = items.filter((i) => !placed[i.id]);
  return (
    <div className="ts-int ts-int--buckets">
      <Head prompt={prompt} fallback={fallback} />
      <div className="ts-buckets">
        {buckets.map((b) => (
          <div key={b.id} className={'ts-bucket' + (nudge.includes(b.id) ? ' ts-nudge' : '')} data-bucket={b.id}
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); let id = ''; try { id = e.dataTransfer.getData('text/plain'); } catch { /* ignore */ } id = id || drag || ''; setDrag(null); if (id) put(id, b.id); }}>
            <div className="ts-bucket__head">{tx(b.label)}</div>
            <div className="ts-bucket__body">
              {items.filter((i) => placed[i.id] === b.id).map(card)}
              {sel && placed[sel] !== b.id && <button type="button" className="t-journey__target ts-bucket__target" data-place={b.id} onClick={() => put(sel, b.id)}>+ {tx(S.placeHere)}</button>}
            </div>
          </div>
        ))}
      </div>
      {tray.length > 0 && <div className="t-practice-tray ts-tray-cards">{tray.map(card)}</div>}
      <p className="ts-hint" aria-live="polite">{nudge.length ? tx(S.intNudge) : tx(S.puzzleHow)}</p>
      {!done && <CheckBtn disabled={left > 0} left={left} onClick={() => { const r = check(placed); if (r.complete) { sfx.play('correct'); onDone(); } setNudge(r.pending); }} />}
    </div>
  );
}

/* ---------------- order: tap an item, then tap its position (or ↑ ↓) ---------------- */
function Order({ it, done, onDone, rand }: Props<Extract<Interaction, { type: 'order' }>>) {
  const { tx } = useLocale();
  const start = useMemo(() => {
    let s = shuffled(it.items.map((x) => x.id), rand);
    if (checkOrder(it.items, s).complete && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  }, [it, rand]);
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
      <Head prompt={it.prompt} fallback={tx(S.intOrder)} />
      <ol className="ts-order">
        {order.map((id, i) => {
          const item = it.items.find((x) => x.id === id)!;
          return (
            <li key={id} className="ts-order__row">
              <span className="ts-order__n t-num">{i + 1}</span>
              <button type="button" className={'t-practice ts-order__item' + (sel === id ? ' is-selected' : '') + (nudge.includes(id) ? ' ts-nudge' : '')}
                data-item={id} data-fit={it.items.findIndex((x) => x.id === id)} aria-pressed={sel === id} onClick={() => setSel(sel === id ? null : id)}>
                {tx(item.text)}
              </button>
              {sel && sel !== id && <button type="button" className="t-btn t-btn--ghost ts-order__here" data-slot={i} onClick={() => moveTo(sel, i)} aria-label={fmt(tx(S.intPutAt), { n: i + 1 })}>↧</button>}
            </li>
          );
        })}
      </ol>
      <p className="ts-hint" aria-live="polite">{nudge.length ? tx(S.intNudge) : sel ? tx(S.intOrderNow) : tx(S.intOrderHow)}</p>
      {!done && <CheckBtn disabled={false} left={0} onClick={() => { const r = checkOrder(it.items, order); if (r.complete) { sfx.play('correct'); onDone(); } setNudge(r.pending); }} />}
    </div>
  );
}

/* ---------------- pattern: tap the responses that share a pattern on a class view ---------------- */
function Pattern({ it, done, onDone }: Props<Extract<Interaction, { type: 'pattern' }>>) {
  const { tx } = useLocale();
  const [tapped, setTapped] = useState<string[]>([]);
  const [nudge, setNudge] = useState(false);
  const toggle = (id: string) => { sfx.play('tap'); setNudge(false); setTapped((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id])); };
  return (
    <div className="ts-int ts-int--pattern">
      <Head prompt={it.prompt} fallback={tx(S.intPattern)} />
      <div className="t-laptop ts-pattern__laptop">
        <div className="t-laptop__screen">
          <div className="t-laptop__bar"><i /><i /><i /> {tx(S.classView)} <span className="t-sim-label">{tx(S.simLabel)}</span></div>
          <div className="ts-pattern">
            {it.cells.map((c) => (
              <button key={c.id} type="button" className={'ts-cell' + (tapped.includes(c.id) ? ' is-on' : '')} data-cell={c.id} data-fit={c.tag === it.target ? 1 : 0}
                aria-pressed={tapped.includes(c.id)} onClick={() => toggle(c.id)}>
                <span className="ts-cell__who">{tx(c.label)}</span>
                <span className="ts-cell__ans t-num">{tx(c.text)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="ts-hint" aria-live="polite">{nudge ? tx(S.intPatternNudge) : fmt(tx(S.intSelected), { n: tapped.length })}</p>
      {!done && <CheckBtn disabled={!tapped.length} left={0} onClick={() => { const r = checkPattern(it.cells, it.target, tapped); if (r.complete) { sfx.play('correct'); onDone(); } else setNudge(true); }} />}
    </div>
  );
}

/** Renders the event's interaction (investigate is handled by the clue cards in the scene panel). */
export function InteractionView({ it, done, onDone, rand, onEvidence }: Props<Interaction>) {
  const { tx } = useLocale();
  switch (it.type) {
    case 'investigate': return null;
    case 'compare': return <Compare it={it} done={done} onDone={onDone} rand={rand} onEvidence={onEvidence} />;
    case 'hint': return <Hint it={it} done={done} onDone={onDone} rand={rand} onEvidence={onEvidence} />;
    case 'match': return <Match it={it} done={done} onDone={onDone} rand={rand} />;
    case 'order': return <Order it={it} done={done} onDone={onDone} rand={rand} />;
    case 'pattern': return <Pattern it={it} done={done} onDone={onDone} rand={rand} />;
    case 'sort':
      return <Buckets prompt={it.prompt} fallback={tx(S.intSort)} buckets={it.buckets} items={it.items.map((i) => ({ id: i.id, text: i.text, fits: i.buckets }))}
        oneEach={false} done={done} onDone={onDone} check={(p) => checkSort(it.items, p)} />;
    case 'plan':
      return <Buckets prompt={it.prompt} fallback={tx(S.intPlan)} buckets={it.slots} items={it.cards.map((c) => ({ id: c.id, text: c.text, fits: c.slots }))}
        oneEach done={done} onDone={onDone} check={(p) => checkPlan(it.slots, it.cards, p)} />;
  }
}
