/** Small shared UI pieces for the teacher game. */
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { S } from './strings';
import type { AlefResource, Outcome, Stage } from './types';
import { sfx } from '../audio/sfx';

export const asset = (p: string) => (import.meta.env.BASE_URL || '/') + p.replace(/^\/+/, '');

export const STAGE_VAR: Record<Stage, string> = { launch: 'var(--t-stage-launch)', facilitate: 'var(--t-stage-facilitate)', extend: 'var(--t-stage-extend)' };
export const TONE_VAR: Record<Outcome['tone'], string> = { good: 'var(--t-good)', mixed: 'var(--t-mixed)', poor: 'var(--t-poor)', insight: 'var(--t-insight)' };

export const reducedMotion = (): boolean => {
  try { return !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

/* ---------------- toast ---------------- */
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<{ text: string; key: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const show = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setMsg({ text, key: Date.now() });
    timer.current = window.setTimeout(() => setMsg(null), 2800);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="ts-toast-wrap" role="status" aria-live="polite">
        {msg && <div key={msg.key} className="t-toast ts-toast">{msg.text}</div>}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- clipboard (iOS 12 fallback: select the text) ---------------- */
export async function copyText(text: string, fallbackEl?: HTMLTextAreaElement | null): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through */ }
  try {
    const el = fallbackEl ?? document.createElement('textarea');
    if (!fallbackEl) { el.value = text; el.setAttribute('readonly', ''); el.style.position = 'fixed'; el.style.top = '-1000px'; document.body.appendChild(el); }
    el.focus(); el.select(); el.setSelectionRange(0, text.length);
    const ok = document.execCommand && document.execCommand('copy');
    if (!fallbackEl) document.body.removeChild(el);
    return !!ok;
  } catch { return false; }
}

/* ---------------- sub-screen header ---------------- */
export function SubHeader({ title, onBack, backLabel, right }: { title: string; onBack: () => void; backLabel?: string; right?: ReactNode }) {
  const { tx } = useLocale();
  return (
    <header className="ts-sub">
      <button type="button" className="t-btn t-btn--icon ts-back" aria-label={backLabel ?? tx(S.campus)} onClick={() => { sfx.play('tap'); onBack(); }}>
        <span className="ts-chev" aria-hidden="true">‹</span>
      </button>
      <h1 className="ts-sub__title">{title}</h1>
      <div className="ts-sub__right">{right}</div>
    </header>
  );
}

/* ---------------- resource card ---------------- */
export function ResourceCard({ r, eyebrow, compact, children }: { r: AlefResource; eyebrow?: string; compact?: boolean; children?: ReactNode }) {
  const { tx } = useLocale();
  return (
    <div className={'t-card ts-res' + (compact ? ' ts-res--compact' : '')} style={{ ['--stage' as string]: STAGE_VAR[r.stage] }}>
      <div className="ts-res__ico" aria-hidden="true">{r.icon}</div>
      <div className="ts-res__body">
        <b className="ts-res__eyebrow">{eyebrow ?? tx(S.stage[r.stage])}</b>
        <h3>{tx(r.title)}</h3>
        {!compact && <p>{tx(r.what)}</p>}
        <div className="ts-res__monday"><strong>{tx(S.tryMonday)}</strong> {tx(r.monday)}</div>
        {r.placeholder && <span className="t-chip t-chip--placeholder">{tx(S.placeholder)}</span>}
        {children}
      </div>
    </div>
  );
}

/* ---------------- note card glyph (Thank-you notes; a folded card drawn in CSS, not a coin) ---------------- */
export function NoteIcon({ lg }: { lg?: boolean }) {
  return <i className={'t-notes-icon' + (lg ? ' t-notes-icon--lg' : '')} aria-hidden="true" />;
}

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Lazy image that hides itself if missing (no broken-image icon). */
export function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return null;
  return <img src={src} alt={alt} className={className} onError={() => setBad(true)} />;
}
