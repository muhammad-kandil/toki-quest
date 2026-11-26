/**
 * Teacher game ("Ms. Mariam's school") — shared data contract.
 *
 * The player is a teacher (Ms. Mariam) who walks an open school campus.
 * Each school day has periods; places on the campus open adventures,
 * resources, the community and the teacher's notebook. Adventures are
 * tap-based classroom simulations whose events branch: a student's need
 * → the teacher's response → an outcome → the next event or an
 * unexpected challenge. See docs/design/TEACHER_REBUILD.md.
 *
 * Design rule: no currencies. Nothing is earned to be spent. Progress is
 * the story moving on, students' learning, and a growing toolkit.
 */
import type { Text } from '../i18n/types';

/* ------------------------------------------------------------------ */
/* Alef resources (the "Discover an Alef feature" step)               */
/* ------------------------------------------------------------------ */

/** The three lesson stages from the Alef storyboard. */
export type Stage = 'launch' | 'facilitate' | 'extend';

export interface AlefResource {
  id: string;
  stage: Stage;
  /** One glyph/character shown on the card icon (no emoji). */
  icon: string;
  title: Text;
  /** What it is and what it does for the student, 1–2 sentences. */
  what: Text;
  /** One concrete thing the teacher can do in a real lesson. */
  monday: Text;
  /** true until the Alef team confirms the name/description. */
  placeholder?: boolean;
  /** Audit trail once Alef signs the card off. */
  confirmedBy?: string;
  confirmedAt?: string;
}

/* ------------------------------------------------------------------ */
/* Classroom simulation                                               */
/* ------------------------------------------------------------------ */

/** A student in the scene. Positions are % of the scene picture. */
export interface Student {
  id: string;
  name: Text;
  /** Tap target centre on the scene picture, in % (0–100). */
  x: number;
  y: number;
  /** Starting state, 0–3 each. understanding = can do it; engagement = is in it. */
  understanding: number;
  engagement: number;
  /** What the teacher sees if they tap this student when nothing is flagged. */
  idle: Text;
  /** Optional: a closer look that sets a flag (e.g. looking at Sara's page). */
  peek?: { text: Text; setFlag: string };
  /** Home context, shown by the "Parent call" power-up before the lesson. */
  homeNote?: Text;
}

/** A tappable object in the scene (tablets, board, lesson plan…). */
export interface SceneObject {
  id: string;
  label: Text;
  icon: string;
  x: number;
  y: number;
  idle: Text;
}

export type EventKind =
  | 'needs-help'      // Student needs help
  | 'early-finisher'  // Early finisher
  | 'low-participation'
  | 'new-event'       // New classroom event (a follow-up)
  | 'unexpected';     // Unexpected challenge

/** A change to one student's state, -3..+3 per axis. */
export interface Effect {
  student: string;
  understanding?: number;
  engagement?: number;
}

export interface Outcome {
  id: string;
  /** Colour band: good (teal), mixed (orange), poor (rose), insight (blue). */
  tone: 'good' | 'mixed' | 'poor' | 'insight';
  title: Text;
  body: Text;
  effects: Effect[];
  /** Flag to set (used by later choices and the debrief). */
  setFlag?: string;
  /** Event this outcome opens, `after` lesson-minutes from now. */
  next?: { event: string; after: number };
}

export interface Choice {
  /** Short action name, e.g. "Need help". */
  label: Text;
  /** Category under it, e.g. "Support". */
  sub: Text;
  /** Lesson minutes this choice costs. */
  minutes: number;
  /** Alef resource discovered by making this choice (optional). */
  resource?: string;
  /** Outcome id; or a list checked in order, first whose `ifFlag` is set wins, last is the default. */
  outcome: string | { ifFlag?: string; outcome: string }[];
}

export interface ClassEvent {
  id: string;
  kind: EventKind;
  /** Who it pulses on: a student id or an object id. */
  on: string;
  /** What is said or seen, shown as the event heading. */
  line: Text;
  /** The situation, one sentence. */
  ask: Text;
  choices: Choice[];
}

export interface Adventure {
  id: string;
  number: number;
  title: Text;
  /** Subject and grade line, e.g. "Grade 5 · Math". */
  meta: Text;
  /** Campus location id where this adventure starts (usually a classroom). */
  location: string;
  /** Scene picture under public/ (portrait 2:3). */
  scene: string;
  /** Short intro shown as captions over the scene before play. */
  intro: Text[];
  /** Speech bubbles during the intro: student id + line. */
  introBubbles?: { student: string; line: Text }[];
  lessonMinutes: number;
  students: Student[];
  objects: SceneObject[];
  events: ClassEvent[];
  outcomes: Outcome[];
  /** Events that open on their own at a lesson minute (the rest are opened by outcomes). */
  schedule: { event: string; at: number }[];
  /** Badge rules, checked in order; the first that matches is awarded. */
  badges: { id: string; title: Text; why: Text; icon: string; when: 'all-good' | { flag: string } | 'always' }[];
  /** Topic for the community step. */
  communityTopic: Text;
  /** Example community posts (clearly labelled as examples in the UI). */
  communityExamples: { who: Text; text: Text }[];
  /** Teaser for the next adventure; may depend on a flag. */
  teaser: { ifFlag?: string; text: Text }[];
  /** Adventure that unlocks after this one. */
  unlocks?: string;
  /** One line: what this lesson was about (notebook + share post). */
  takeaway?: Text;
}

/* ------------------------------------------------------------------ */
/* Campus                                                             */
/* ------------------------------------------------------------------ */

export type LocationKind =
  | 'classroom'   // adventures play here
  | 'staffroom'   // toolkit: Alef resources discovered, "Try it Monday"
  | 'library'     // the notebook: past lessons, paths, students
  | 'community'   // Alef Telegram community
  | 'office'      // principal: story beats, next adventure briefings
  | 'yard'        // ambient; short optional moments
  | 'shop';       // school store: spend Thank-you notes on outfits, accessories, power-ups

export interface Location {
  id: string;
  kind: LocationKind;
  name: Text;
  /** Pin position on the campus picture, in % (0–100). */
  x: number;
  y: number;
}

/** School-day clock shown in the HUD (like "Grade 1 · Day 16 · Forenoon"). */
export type Period = 'morning' | 'midday' | 'afternoon';

export interface TeacherSave {
  version: 1;
  playerName?: string;
  day: number;
  period: Period;
  /** 0–3: rests in the staff room, spent by lessons. Not a currency: it limits a day, nothing more. */
  energy: number;
  completed: Record<string, { badge: string; path: string[]; students: Record<string, [number, number]> }>;
  unlocked: string[];
  toolkit: string[];
  flags: Record<string, boolean>;
  /** Resource ids the teacher marked "Try it Monday". */
  saved?: string[];
  /** Resource ids marked as tried in a real lesson (Term Pass stage, max one per day). */
  tried?: { id: string; day: number }[];
  /** Finished runs per adventure. */
  runs?: Record<string, number>;
  /** Every outcome id ever reached per adventure (notebook shows unexplored branches). */
  seenOutcomes?: Record<string, string[]>;
  lang?: 'en' | 'ar';
  /** Term Pass: stage reached and reward ids claimed. Free for everyone; no paid lane. */
  pass?: { stage: number; claimed: string[]; sharedFor: string[]; replayedFor: string[] };
  /** Thank-you notes: earned only from the Term Pass; spent in the shop. Never bought with money. */
  notes?: number;
  /** Shop item ids owned (outfits, accessories). */
  owned?: string[];
  /** Placed accessories by slot (e.g. 'classroom-wall' → item id). */
  placed?: Record<string, string>;
  /** Owned power-up counts by id. */
  powerups?: Record<string, number>;
}
