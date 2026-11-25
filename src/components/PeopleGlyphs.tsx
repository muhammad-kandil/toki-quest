import type { EvidenceSpot } from '../data/levelTypes';
import './PeopleGlyphs.css';

/**
 * People, not dots.
 *
 * Every marker the player taps — and every step on the beat strip —
 * shows WHO or WHAT Toki is looking at: a teacher, a student, a group,
 * the board, a device, a paper. Inline SVG only (no bitmaps), drawn
 * in a 24×24 box with currentColor so the same glyph works as indigo
 * on white, white on teal, or a faint silhouette on a door.
 *
 * Kinds are inferred from a spot's id/label when the level data does
 * not say — so every existing classroom gets people without a data
 * edit. Authors can set `kind` explicitly on new evidence.
 */
export type EvidenceKind =
  | 'teacher' | 'student' | 'group' | 'board' | 'device' | 'paper'
  | 'book' | 'door' | 'window' | 'clock' | 'chart' | 'lens';

const RULES: [EvidenceKind, RegExp][] = [
  ['teacher', /teacher|explain|check|question|round\b|twelve minutes|the questions|monday/],
  ['group', /group|groups|table|tables|pairs|station|hands|row|rows|three\b|front|middle|back|students|seating|support|independent|after the quiz|at the door/],
  ['student', /student|quiet|fast|slow|bronze|gold|eagle|sparrow|answer|why|late|author|artist|confident|struggling|hand\b/],
  ['device', /alef|dashboard|tracker|screen|device|tablet|history|draft|leaderboard|completion|finishers/],
  ['board', /board|objective|criteria|poster|whiteboard|success/],
  ['book', /book|books|file|plan|planner|gradebook|folder|markbook|week/],
  ['paper', /ticket|essay|sheet|pile|test|rubric|report|margin|green|feedback|drawing|diag|cards|tomorrow|next|marked|annotated|comments|assignment/],
  ['clock', /timer|stopwatch|after|ends|time\b|pace|minutes/],
  ['chart', /chart|pattern|weeks|tally|reasons|data|trend/],
  ['door', /door/],
  ['window', /window/],
];

export function kindFor(spot: Pick<EvidenceSpot, 'id' | 'label' | 'kind'>): EvidenceKind {
  if (spot.kind) return spot.kind;
  const hay = `${spot.id} ${spot.label.en}`.toLowerCase();
  for (const [kind, re] of RULES) if (re.test(hay)) return kind;
  return 'lens';
}

/* ---------- glyphs (24×24, stroke-based, currentColor) ---------- */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Head({ cx, cy, r = 2.6 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />;
}

export function EvidenceGlyph({ kind, size = 22 }: { kind: EvidenceKind; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: false as const };
  switch (kind) {
    case 'teacher':
      return (
        <svg {...common}>
          <Head cx={9} cy={6} r={2.8} />
          <path {...S} d="M4.5 20v-5.5a4.5 4.5 0 0 1 9 0V20" />
          <path {...S} d="M13.5 12.5l4.5-3.5M18 9v4" />
          <path {...S} d="M15.5 4.5h5v6h-5z" strokeWidth={1.4} />
        </svg>
      );
    case 'student':
      return (
        <svg {...common}>
          <Head cx={12} cy={7} r={3} />
          <path {...S} d="M6 20v-3.5a6 6 0 0 1 12 0V20" />
          <path {...S} d="M7 20h10" />
        </svg>
      );
    case 'group':
      return (
        <svg {...common}>
          <Head cx={7} cy={8} r={2.4} />
          <Head cx={17} cy={8} r={2.4} />
          <Head cx={12} cy={6.5} r={2.6} />
          <path {...S} d="M2.5 19v-2.5a4.5 4.5 0 0 1 6-4.2M21.5 19v-2.5a4.5 4.5 0 0 0-6-4.2" />
          <path {...S} d="M7.5 20v-3a4.5 4.5 0 0 1 9 0v3" />
        </svg>
      );
    case 'board':
      return (
        <svg {...common}>
          <rect {...S} x={3} y={4} width={18} height={12} rx={1.5} />
          <path {...S} d="M7 8.5h7M7 11.5h10M12 16v4M9 20h6" />
        </svg>
      );
    case 'device':
      return (
        <svg {...common}>
          <rect {...S} x={5} y={3} width={14} height={18} rx={2} />
          <path {...S} d="M9 7h6M9 10.5h6M9 14h3" strokeWidth={1.6} />
          <circle cx={12} cy={18.3} r={1} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'paper':
      return (
        <svg {...common}>
          <path {...S} d="M6.5 3.5h7l4.5 4.5v12.5h-11.5z" />
          <path {...S} d="M13.5 3.5V8H18" />
          <path {...S} d="M9 12h6M9 15.5h6" strokeWidth={1.6} />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path {...S} d="M4 5.5a2 2 0 0 1 2-2h12.5v15.5H6a2 2 0 0 0-2 2z" />
          <path {...S} d="M4 19a2 2 0 0 1 2-2h12.5" />
          <path {...S} d="M8.5 8h6" strokeWidth={1.6} />
        </svg>
      );
    case 'door':
      return (
        <svg {...common}>
          <path {...S} d="M6 20V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15" />
          <path {...S} d="M4 20h16" />
          <circle cx={14.5} cy={12.5} r={1} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'window':
      return (
        <svg {...common}>
          <rect {...S} x={4} y={4} width={16} height={16} rx={1.5} />
          <path {...S} d="M12 4v16M4 12h16" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle {...S} cx={12} cy={13} r={7.5} />
          <path {...S} d="M12 9v4.5l3 2M9.5 3h5" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path {...S} d="M4 20h16M6 17V11M11 17V7M16 17v-4M21 17V9" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle {...S} cx={10.5} cy={10.5} r={6} />
          <path {...S} d="M15 15l5 5" />
        </svg>
      );
  }
}

/* ---------- Beat strip icons ---------- */
export type BeatKind = 'observe' | 'drift' | 'risk' | 'coaching' | 'reasoning' | 'conversation' | 'reveal' | 'diagnose';

export function BeatIcon({ kind, size = 16 }: { kind: BeatKind; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: false as const };
  const T = { ...S, strokeWidth: 2.1 };
  switch (kind) {
    case 'observe':
      return (
        <svg {...common}>
          <path {...T} d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
          <circle cx={12} cy={12} r={2.6} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'drift':
    case 'diagnose':
      return (
        <svg {...common}>
          <circle {...T} cx={10.5} cy={10.5} r={6} />
          <path {...T} d="M15 15l5.5 5.5" />
        </svg>
      );
    case 'risk':
      return (
        <svg {...common}>
          <path {...T} d="M4 16a8 8 0 0 1 16 0" />
          <path {...T} d="M12 16l4-5" />
          <circle cx={12} cy={16} r={1.6} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'coaching':
      return (
        <svg {...common}>
          <path {...T} d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z" />
        </svg>
      );
    case 'reasoning':
      return (
        <svg {...common}>
          <path {...T} d="M9 18h6M10 21h4" />
          <path {...T} d="M8 13.5a5.5 5.5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3z" />
        </svg>
      );
    case 'conversation':
      return (
        <svg {...common}>
          <Head cx={7} cy={6.5} r={2.5} />
          <path {...T} d="M3 14.5v-1.5a4 4 0 0 1 8 0v1.5" />
          <path {...T} d="M12.5 5.5H21v7h-5l-3 2.5v-2.5h-.5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path {...T} d="M5 20V5a1 1 0 0 1 1-1h7v16" />
          <path {...T} d="M13 4l6 2v14l-6 2" />
          <circle cx={10.5} cy={12.5} r={1} fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

/* ---------- Silhouette pair: a teacher and a student standing together ---------- */
export function PeoplePair({ lit = false, size = 22, className = '' }: { lit?: boolean; size?: number; className?: string }) {
  return (
    <svg
      className={`people-pair ${lit ? 'people-pair--lit' : ''} ${className}`}
      width={size * 1.35}
      height={size}
      viewBox="0 0 32 24"
      aria-hidden="true"
      focusable="false"
    >
      {/* teacher (taller) */}
      <circle cx={11} cy={5} r={3.2} className="people-pair__teacher" />
      <path d="M5.5 23v-7a5.5 5.5 0 0 1 11 0v7z" className="people-pair__teacher" />
      {/* student (shorter, slightly in front) */}
      <circle cx={23} cy={10} r={2.7} className="people-pair__student" />
      <path d="M18.5 23v-5.2a4.5 4.5 0 0 1 9 0V23z" className="people-pair__student" />
    </svg>
  );
}
