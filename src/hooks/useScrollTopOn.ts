import { useLayoutEffect, useRef } from 'react';

/**
 * Start each beat at the top of the page. Without this a long beat left
 * the window scrolled and the next one (often the reveal, whose verdict
 * sits at the top) opened halfway down. Skips the first render so the
 * screen's own entrance isn't disturbed.
 */
export function useScrollTopOn(key: unknown) {
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    try { window.scrollTo(0, 0); } catch { /* old WebKit */ }
  }, [key]);
}
