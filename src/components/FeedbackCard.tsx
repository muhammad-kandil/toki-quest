import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { sendFeedback, canReport, type FeedbackVerdict } from '../telegram/progress';
import { sfx } from '../audio/sfx';
import './FeedbackCard.css';

/**
 * "Was this classroom fair?" — the one question we ask a real DLIS, once
 * per level per device, on the reveal. Three taps; a one-line note only
 * if they want to give one. Never blocks Continue; never shown again
 * after a tap+send or an explicit skip. Rows land in toki_feedback via
 * the same signed path as progress, so the team knows who said it and
 * can act on it; players never see each other's notes.
 */
const key = (levelId: number) => `toki:fb:${levelId}`;

function seen(levelId: number): boolean {
  try { return localStorage.getItem(key(levelId)) !== null; } catch { return false; }
}
function mark(levelId: number, value: string): void {
  try { localStorage.setItem(key(levelId), value); } catch { /* storage unavailable */ }
}

const GLYPH: Record<FeedbackVerdict, string> = { fair: '👍', unsure: '🤔', disagree: '👎' };
const ORDER: FeedbackVerdict[] = ['fair', 'unsure', 'disagree'];

export function FeedbackCard({ levelId, outcome, attempts }: {
  levelId: number;
  outcome?: 'restored' | 'partial' | 'unchanged';
  attempts?: Record<string, number>;
}) {
  const { tx, lang } = useLocale();
  const [hidden, setHidden] = useState(() => seen(levelId));
  const [verdict, setVerdict] = useState<FeedbackVerdict | null>(null);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  if (hidden) return null;

  const choose = (v: FeedbackVerdict) => {
    sfx.play('tap');
    setVerdict(v);
  };

  const send = () => {
    if (!verdict) return;
    sfx.play('tap');
    sendFeedback({ levelId, verdict, text: text.trim() || undefined, lang, outcome, attempts });
    mark(levelId, verdict);
    setSent(true);
  };

  const skip = () => {
    mark(levelId, 'skipped');
    setHidden(true);
  };

  if (sent) {
    return (
      <div className="fb fb--sent" role="status">
        <p className="fb__thanks">{tx(UI['fb.thanks'])}</p>
      </div>
    );
  }

  return (
    <div className="fb" data-reportable={canReport() ? '1' : '0'}>
      <p className="fb__question">{tx(UI['fb.question'])}</p>
      <div className="fb__verdicts" role="group" aria-label={tx(UI['fb.question'])}>
        {ORDER.map((v) => (
          <button
            key={v}
            type="button"
            className={`fb__verdict fb__verdict--${v} ${verdict === v ? 'fb__verdict--on' : ''}`}
            aria-pressed={verdict === v}
            onClick={() => choose(v)}
          >
            <span className="fb__glyph" aria-hidden="true">{GLYPH[v]}</span>
            <span className="fb__label">{tx(UI[`fb.${v}` as 'fb.fair' | 'fb.unsure' | 'fb.disagree'])}</span>
          </button>
        ))}
      </div>
      {verdict && (
        <div className="fb__detail">
          <label className="fb__prompt" htmlFor={`fb-text-${levelId}`}>{tx(UI['fb.prompt'])}</label>
          <input
            id={`fb-text-${levelId}`}
            className="fb__input"
            type="text"
            maxLength={240}
            placeholder={tx(UI['fb.placeholder'])}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          />
          <div className="fb__actions">
            <button type="button" className="fb__send" onClick={send}>{tx(UI['fb.send'])}</button>
            <button type="button" className="fb__skip" onClick={skip}>{tx(UI['fb.skip'])}</button>
          </div>
        </div>
      )}
    </div>
  );
}
