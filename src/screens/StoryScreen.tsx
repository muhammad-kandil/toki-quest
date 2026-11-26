import { useCallback, useEffect, useRef, useState } from 'react';
import type { Story } from '../data/story';
import { SPEAKER_NAMES, shotImage } from '../data/story';
import { shotLines } from '../audio/storyLines';
import { useVoice } from '../audio/useVoice';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import { STORY_UI } from '../i18n/storyUi';
import { sfx } from '../audio/sfx';
import tokiArt from '../assets/skins/skin-teal.png';
import './StoryScreen.css';

/**
 * The picture-story: a short film made of stills. Each shot fills the
 * screen with a slow camera move; the narrator tells the story; when
 * someone speaks, their line pops up near them in their own voice. It
 * paces itself to the voice (or to reading time when voice is off).
 * Tap moves on; Skip is always there; subtitles are on by default.
 */
const CC_KEY = 'toki:subtitles';
const readCC = () => { try { return window.localStorage.getItem(CC_KEY) !== 'off'; } catch { return true; } };
const reducedMotion = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } };

/** Reading time when there is no voice: generous, so nobody is rushed. */
const readMs = (text: string, lang: string) => 900 + text.length * (lang === 'ar' ? 70 : 60);

export function StoryScreen({ story, onDone }: { story: Story; onDone: () => void }) {
  const { tx, lang } = useLocale();
  const voiceCtl = useVoice();
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [quoteOn, setQuoteOn] = useState(false);
  const [cc, setCC] = useState(readCC);
  const [missing, setMissing] = useState<Record<string, boolean>>({});
  const token = useRef(0);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const clear = () => { timers.current.forEach((t) => window.clearTimeout(t)); timers.current = []; };
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    token.current++;
    clear();
    voiceCtl.cancel();
    onDone();
  }, [onDone, voiceCtl]);

  const goTo = useCallback((next: number) => {
    token.current++;
    clear();
    voiceCtl.cancel();
    if (next >= story.shots.length) { finish(); return; }
    setPrev(idx);
    setQuoteOn(false);
    setIdx(next);
  }, [idx, story.shots.length, finish, voiceCtl]);

  // One line: voice if it will actually speak, reading time otherwise.
  const say = (line: { text: string; who: 'narrator' | 'teacher' | 'toki'; teacher?: string }, my: number, then: () => void) => {
    let done = false;
    const go = () => { if (done || my !== token.current) return; done = true; then(); };
    if (voiceCtl.active) {
      // Hold each line for most of its reading time even if the voice
      // reports "done" early (a device with no voice for the language
      // ends instantly) — the film must never race.
      const started = Date.now();
      const minMs = readMs(line.text, lang) * 0.7;
      voiceCtl.speakSequence([line], () => later(go, Math.max(0, minMs - (Date.now() - started))));
      later(go, readMs(line.text, lang) * 2 + 4000);    // safety net if an engine never reports the end
    } else {
      later(go, readMs(line.text, lang));
    }
  };

  // Play the current shot: narration → quote (if any) → a breath → next.
  useEffect(() => {
    const my = ++token.current;
    const shot = story.shots[idx];
    const { narration, quote } = shotLines(shot);
    const lead = idx === 0 ? 500 : 900;                 // let the picture land first
    later(() => {
      say({ text: tx(narration.text), who: 'narrator' }, my, () => {
        if (!quote) { later(() => my === token.current && goTo(idx + 1), 700); return; }
        setQuoteOn(true);
        sfx.play('discover');
        later(() => say({ text: tx(quote.text), who: quote.who, teacher: quote.teacher }, my, () => {
          later(() => my === token.current && goTo(idx + 1), 900);
        }), 350);
      });
    }, lead);
    if (prev != null) later(() => setPrev(null), 1300);
    return () => { clear(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, lang]);

  useEffect(() => () => { token.current++; clear(); voiceCtl.cancel(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCC = () => {
    const on = !cc;
    setCC(on);
    try { window.localStorage.setItem(CC_KEY, on ? 'on' : 'off'); } catch { /* ignore */ }
  };

  const base = import.meta.env.BASE_URL || '/';
  const still = (i: number, role: 'current' | 'prev') => {
    const shot = story.shots[i];
    const gone = missing[shot.id];
    const still = (
      <div
        key={`${shot.id}-${role}`}
        className={`story__shot story__shot--${role} ${reducedMotion() ? '' : `story__shot--move-${shot.move ?? 'in'}`}`}
        aria-hidden="true"
      >
        {gone ? (
          <div className="story__placeholder">
            <img src={tokiArt} alt="" className="story__placeholder-toki" />
          </div>
        ) : (
          <img
            className="story__img"
            src={base + shotImage(story.worldId, shot.id)}
            alt=""
            onError={() => setMissing((m) => ({ ...m, [shot.id]: true }))}
          />
        )}
      </div>
    );
    return still;
  };

  const shot = story.shots[idx];
  const { quote } = shotLines(shot);
  const q = shot.quote;
  const quoteLabel = q ? (q.who === 'toki' ? UI.tokiName : SPEAKER_NAMES[q.name ?? ''] ?? { en: q.name ?? '', ar: q.name ?? '' }) : null;

  return (
    <div className="story" onClick={(e) => { if ((e.target as HTMLElement).closest('button')) return; sfx.play('tap'); goTo(idx + 1); }}>
      <div className="story__stage">
        {prev != null && prev !== idx && still(prev, 'prev')}
        {still(idx, 'current')}
        <div className="story__vignette" aria-hidden="true" />
      </div>

      <div className="story__top">
        <div className="story__progress" aria-hidden="true">
          {story.shots.map((s, i) => (
            <span key={s.id} className={`story__tick ${i < idx ? 'story__tick--done' : ''} ${i === idx ? 'story__tick--now' : ''}`} />
          ))}
        </div>
        <div className="story__controls">
          <button className={`story__btn ${cc ? 'story__btn--on' : ''}`} onClick={toggleCC} aria-pressed={cc} aria-label={tx(STORY_UI.subtitles)}>CC</button>
          <button className="story__btn story__btn--skip" onClick={() => { sfx.play('tap'); finish(); }}>{tx(STORY_UI.skip)}</button>
        </div>
      </div>

      {q && quote && quoteOn && (
        <div key={`q-${shot.id}`} className={`story__quote story__quote--${q.at ?? 'left'} story__quote--${q.who}`} role="status">
          <span className="story__quote-who">{quoteLabel ? tx(quoteLabel) : ''}</span>
          <p className="story__quote-text" lang={lang}>{tx(q.text)}</p>
        </div>
      )}

      {cc && (
        <p key={`c-${shot.id}`} className="story__caption" lang={lang}>{tx(shot.narration)}</p>
      )}

      <p className="story__hint" aria-hidden="true">{tx(STORY_UI.tapHint)}</p>
    </div>
  );
}
