import { useRef, useState, type ReactNode } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { COMMUNITY_URL, resource } from '../content';
import { findEvent, type PathStep } from '../engine/sim';
import { S, fmt } from '../strings';
import { copyText, useToast } from '../ui';
import type { Adventure } from '../types';

export function useShareText(adv: Adventure, path: PathStep[], found: string[]): string {
  const { tx, lang } = useLocale();
  const first = path[0];
  const ev = first && findEvent(adv, first.event);
  let text = '';
  if (ev) {
    const kind = tx(S.kind[ev.kind]);
    text = fmt(tx(S.shareStart), { title: tx(adv.title), kind: lang === 'en' ? kind.toLowerCase() : kind, choice: tx(ev.choices[first.choice].label) });
  } else text = tx(adv.title) + '.';
  const r = found[0] && resource(found[0]);
  if (r) text += fmt(tx(S.shareRes), { r: tx(r.title) });
  if (adv.takeaway) text += ' ' + tx(adv.takeaway);
  return text;
}

function openCommunity() {
  if (!COMMUNITY_URL) return;
  try {
    const tg = (window as unknown as { Telegram?: { WebApp?: { openTelegramLink?: (u: string) => void } } }).Telegram?.WebApp;
    if (tg?.openTelegramLink && /t\.me\//.test(COMMUNITY_URL)) tg.openTelegramLink(COMMUNITY_URL);
    else window.open(COMMUNITY_URL, '_blank');
  } catch { /* ignore */ }
}

export function CommunityPanel({ adv, shareText, onShared, children }: { adv: Adventure; shareText?: string; onShared?: () => void; children?: ReactNode }) {
  const { tx } = useLocale();
  const toast = useToast();
  const [text, setText] = useState(shareText ?? '');
  const ta = useRef<HTMLTextAreaElement>(null);
  const copy = async () => {
    const ok = await copyText(text, ta.current);
    toast(tx(ok ? S.copied : S.selected));
    onShared?.();
  };
  return (
    <div className="ts-comm">
      <div className="ts-comm__head">
        <div className="ts-comm__av" aria-hidden="true">A</div>
        <div>
          <h2>{tx(S.communityName)}</h2>
          <p className="ts-hint">{fmt(tx(S.topic), { t: tx(adv.communityTopic) })}</p>
        </div>
      </div>
      {adv.communityExamples.map((p, i) => (
        <div key={i} className="ts-post">
          <b>{tx(p.who)}</b>
          <p>{tx(p.text)}</p>
          <small className="ts-post__ex">· {tx(S.example)}</small>
        </div>
      ))}
      {shareText !== undefined && (
        <>
          <label className="ts-hint" htmlFor={'share-' + adv.id}>{tx(S.yourMove)}</label>
          <textarea id={'share-' + adv.id} ref={ta} className="ts-input ts-comm__share" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="ts-row">
            <button type="button" className="t-btn ts-comm__copy" onClick={copy}>{tx(S.copy)}</button>
          </div>
        </>
      )}
      <button type="button" className={'t-btn t-btn--ghost t-btn--block' + (COMMUNITY_URL ? '' : ' is-inert')} aria-disabled={!COMMUNITY_URL} onClick={openCommunity}>
        {COMMUNITY_URL ? tx(S.openCommunity) : tx(S.communitySoon)}
      </button>
      {children}
    </div>
  );
}
