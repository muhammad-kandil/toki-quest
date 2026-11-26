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
  /** Product boundary (GAME_PACKAGE.md): publicly verified capability vs needs Alef's internal validation. */
  status?: 'verified-public' | 'needs-internal-validation';
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
  /** XP for a meaningful action (awarded once per outcome id per run). */
  xp?: number;
  /** NCLE tool discovered here (resource id). */
  discover?: string;
  /** Universe: choice-dependent need changes (persistent). */
  opensNeeds?: string[];
  closesNeeds?: string[];
  /** Universe: persistent student-variable changes (clamped 0–3). */
  studentDelta?: { id: string; key: keyof StudentVars; delta: number }[];
  /** Universe: play this scenario next if its `requires` hold (not a draw), e.g. F01 → R05. */
  triggers?: string;
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
  /** Only offered when this flag is set (e.g. the chosen evidence profile). */
  ifFlag?: string;
  /** Universe: offered only while this need is unresolved (R06 Second Chance). */
  ifUnresolved?: string;
}

/** Non-MCQ interaction run before the choices (GAME_PACKAGE.md "Interactions"). */
export type InteractionType = 'investigate' | 'compare' | 'match' | 'sort' | 'order' | 'hint' | 'pattern' | 'plan';

export interface Card { id: string; label: Text; text: Text }

/**
 * Interaction data; answers are set by the evidence on the cards.
 *  compare: `cards` revealed side by side (or the event's investigate clues).
 *  match:   `cards` → `targets`; `answer[card] = target`.
 *  sort:    `cards` → `targets` (bins); `answer[card] = bin`.
 *  order:   `cards` and `order` (the sequence).
 *  hint:    `hints`, least → most intrusive.
 *  pattern: `cards` (responses) grouped by `patterns`.
 *  plan:    `cards` (evidence) → `targets` (slots); `answer[slot] = card`.
 */
export interface Task {
  cards?: Card[];
  targets?: Card[];
  answer?: Record<string, string>;
  order?: string[];
  hints?: Text[];
  patterns?: { id: string; label: Text; cards: string[] }[];
  /** Shown after the interaction: why the evidence points this way. */
  note?: Text;
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
  /** Weighted pick among eligible events at each trigger. */
  category?: EventCategory;
  weight?: number;
  eligible?: Eligibility;
  /** Optional investigation before the choices. */
  investigate?: Investigation;
  /** Non-MCQ interaction before the choices, with its data. */
  interaction?: InteractionType;
  task?: Task;
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
  /** false = the clock is narrative only (proposal: no countdown). */
  timed?: boolean;
  /** Laptop puzzle, board, bookshelf etc. */
  puzzle?: SequencePuzzle;
  /** Endings chosen by priority among eligible ones. */
  endings?: Ending[];
  /** Opening film: shots shown before play (picture + narration + optional line). */
  film?: { picture: string; narration?: Text; who?: string; line?: Text }[];
}


/* ------------------------------------------------------------------ */
/* Proposal mechanics (docs/product/ALEF_PROPOSAL.md)                  */
/* ------------------------------------------------------------------ */

/** One clue a teacher taps during an investigation (notebook, tablet, bubble, evidence card…). */
export interface Clue { id: string; label: Text; text: Text }

/** A coherent evidence profile, chosen once (weighted) when the encounter starts. */
export interface EvidenceProfile {
  id: string;
  weight: number;
  /** Clue texts for this profile, keyed by Clue id; every clue must agree. */
  clues: Record<string, Text>;
  /** Flag set when the profile is chosen (e.g. 'sara:prerequisite'). */
  setFlag: string;
  /** Drawn only when this flag holds (candidates = flagged profiles if any hold, else those without ifFlag). */
  ifFlag?: string;
}

/** Tap-to-investigate step before choosing a response. */
export interface Investigation {
  clues: Clue[];
  profiles: EvidenceProfile[];
  /** Clues to reveal before choices unlock (default: all). */
  minClues?: number;
}

export type EventCategory = 'learning' | 'collaboration' | 'misconception' | 'management' | 'bonus';

export interface Eligibility { flags?: string[]; notFlags?: string[] }

/** Drag/tap sequencing puzzle (the laptop: Build Your Learning Journey). */
export interface SequencePuzzle {
  id: string;
  title: Text;
  intro: Text;
  cards: { id: string; text: Text; stages: Stage[] }[];
  badge: string;
  xp: number;
  note: Text;
}

export interface Ending {
  id: string;
  title: Text;
  narration: Text;
  /** Eligible when all flags set / none of notFlags set. */
  when: Eligibility;
  /** Lower = more relevant (unresolved needs first). */
  priority: number;
  badge?: string;
  /** Mission ids this ending opens. */
  opens?: string[];
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
  /** XP: once per meaningful action; never shown as competence. */
  xp?: number;
  /** Outcome/puzzle ids already rewarded (anti-farming). */
  rewarded?: string[];
}

/* ------------------------------------------------------------------ */
/* Classroom universe (docs/product/GAME_PACKAGE.md — authoritative)   */
/* One persistent classroom: scenarios drawn from phase pools.         */
/* ------------------------------------------------------------------ */

export type Phase = 'launch' | 'facilitate' | 'extend';
export type PoolId = 'after-launch' | 'mid-lesson' | 'late-lesson';

/** Persistent per-student variables (0–3), evolving across sessions. Fictional game state, never real learning data. */
export interface StudentVars { readiness: number; confidence: number; participation: number; understanding: number }

/** Universe-level condition on state. */
export interface UniverseCondition {
  flags?: string[];          // all set
  anyFlags?: string[];       // at least one set
  notFlags?: string[];       // none set
  visited?: string[];        // scenario ids already played this session
  notVisited?: string[];
  unresolved?: string[];     // these needs are open
  resolved?: string[];       // these needs are closed
  student?: { id: string; key: keyof StudentVars; min?: number; max?: number }[];
  minXp?: number;
  anyUnresolved?: string[];  // at least one of these needs is open
}

/** A scenario (L01…E05) or random event (R01…R06). Reuses Adventure's play model (scene, students, objects, events, outcomes). */
export interface Scenario extends Omit<Adventure, 'number' | 'lessonMinutes' | 'schedule' | 'unlocks' | 'endings' | 'badges' | 'communityTopic' | 'communityExamples' | 'teaser'> {
  /** 'L01', 'F03', 'R06'… */
  code: string;
  kind: 'scenario' | 'random';
  phase: Phase;
  /** NCLE tool ids this scenario can reveal. */
  discovers?: string[];
  /** Must hold to be eligible. */
  requires?: UniverseCondition;
  /** Not eligible again for this many draws after being played. */
  cooldown?: number;
  /** Reconvergence node (F03, E01, E05): reachable from many paths. */
  reconverge?: boolean;
  /** Needs this scenario opens (unresolved) or closes. */
  opensNeeds?: string[];
  closesNeeds?: string[];
  /** Student variable changes applied on completion (outcome effects still apply). */
  studentDelta?: { id: string; key: keyof StudentVars; delta: number }[];
  /** R04 Time Squeeze: added to the current phase's remaining draws. */
  budgetDelta?: number;
  /** Optional per-scenario badge/teaser fields carried over from Adventure. */
  badges?: Adventure['badges'];
  communityTopic?: Text;
  communityExamples?: Adventure['communityExamples'];
}

export interface Pool { id: PoolId; entries: { code: string; weight: number }[] }

export interface UniverseEnding {
  id: 'END-A' | 'END-B' | 'END-C' | 'END-D' | string;
  title: Text;
  narration: Text;
  when: UniverseCondition;
  /** Lower = chosen first when several hold (END-B first if needs unresolved; END-D strongest). */
  priority: number;
  badge?: { id: string; title: Text; icon: string };
  /** Follow-up the ending generates (e.g. END-B reopens a need for next session). */
  followUp?: Text;
}

export interface Universe {
  version: string;
  opening: { id: string; picture: string; narration?: Text; who?: string; line?: Text }[];
  /** Entry hub scenario code (L01). */
  entry: string;
  scenarios: Scenario[];
  pools: Pool[];
  /** Session structure: how many draws from each pool before moving on. */
  /** `draws` counts scenarios (random events are bonus draws, max one per phase); a phase ends early on an `endsOn` node. */
  arc: { pool: PoolId; draws: number; endsOn?: string[] }[];
  endings: UniverseEnding[];
  students: { id: string; name: Text; start: StudentVars }[];
}

/** Persistent universe save (replaces mission-based fields for the teacher game). */
export interface UniverseSave {
  contentVersion: string;
  /** Pseudonymous key (from server); never a real name. */
  key?: string;
  seed: number;
  session: number;
  phase: Phase;
  visited: string[];                      // this session, in order
  history: { session: number; path: string[]; ending: string }[];
  outcomes: Record<string, string[]>;     // scenario code → outcome ids reached (ever)
  tools: string[];                        // NCLE tools discovered
  unresolved: string[];
  students: Record<string, StudentVars>;
  cooldowns: Record<string, number>;      // code → draws remaining
  xp: number;
  rewarded: string[];                     // anti-farming keys
  collectibles: string[];
  a11y?: { reducedMotion?: boolean; largeText?: boolean; captions?: boolean };
  /** Last safe resume point: scenario code + step. */
  resume?: { code: string; step: string };
}
