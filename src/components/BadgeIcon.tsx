import type { BadgeDefinition } from '../data/badges';

/**
 * Inline SVG glyphs for badges. Drawn in the asset set's language —
 * bold indigo outline, flat fill — so badges look native to Toki's
 * world and render identically in every webview (unlike emoji).
 */
export function BadgeIcon({
  glyph,
  color,
  size = 56,
  locked = false,
}: {
  glyph: BadgeDefinition['glyph'];
  color: string;
  size?: number;
  locked?: boolean;
}) {
  const fill = locked ? '#D8D2E6' : color;
  const stroke = locked ? '#A79DBE' : '#452B74';
  const common = { fill: 'none', stroke, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill={fill} stroke={stroke} strokeWidth="2.6" />
      {glyph === 'magnifier' && (
        <g {...common}>
          <circle cx="21" cy="21" r="7.5" fill="#fff" />
          <path d="M27 27l7 7" />
        </g>
      )}
      {glyph === 'cap' && (
        <g {...common}>
          <path d="M12 21l12-6 12 6-12 6z" fill="#fff" />
          <path d="M18 24v6c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-6" />
          <path d="M36 21v8" />
        </g>
      )}
      {glyph === 'shield' && (
        <g {...common}>
          <path d="M24 12l10 4v8c0 6-4 10-10 12-6-2-10-6-10-12v-8z" fill="#fff" />
          <path d="M19 24l3.5 3.5L30 20" />
        </g>
      )}
      {glyph === 'dna' && (
        <g {...common}>
          <path d="M17 13c0 7 14 9 14 16s-14 9-14 16" />
          <path d="M31 13c0 7-14 9-14 16s14 9 14 16" />
          <path d="M19 19h10M19 29h10" />
        </g>
      )}
      {glyph === 'brain' && (
        <g {...common}>
          <path d="M23 14a5 5 0 0 0-8 4 5 5 0 0 0-1 9 5 5 0 0 0 9 4V14z" fill="#fff" />
          <path d="M25 14a5 5 0 0 1 8 4 5 5 0 0 1 1 9 5 5 0 0 1-9 4V14z" fill="#fff" />
          <path d="M24 14v17" />
        </g>
      )}
      {glyph === 'sprout' && (
        <g {...common}>
          <path d="M24 35V22" />
          <path d="M24 24c0-6 4-9 10-9 0 6-4 9-10 9z" fill="#fff" />
          <path d="M24 29c0-5-3-8-8-8 0 5 3 8 8 8z" fill="#fff" />
        </g>
      )}
      {glyph === 'eye' && (
        <g {...common}>
          <path d="M12 24c4-7 8-10 12-10s8 3 12 10c-4 7-8 10-12 10s-8-3-12-10z" fill="#fff" />
          <circle cx="24" cy="24" r="4" fill={stroke} />
          <path d="M24 11v-3M24 40v-3" />
        </g>
      )}
      {glyph === 'crown' && (
        <g {...common}>
          <path d="M13 31l-1-14 7 6 5-9 5 9 7-6-1 14z" fill="#fff" />
          <path d="M13 31h22" />
        </g>
      )}
    </svg>
  );
}
