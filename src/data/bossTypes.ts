/**
 * Final Boss data model — "The Perfect Classroom."
 *
 * Structurally different from the five standard classrooms (GDD §4).
 * Instead of finding one drift in teacher behavior, the player audits
 * SIX dimensions of a flawless-looking room. Five come back clean —
 * deliberately, to reinforce "this teacher does everything right" and
 * to build the player's (false) confidence that there's nothing wrong.
 * The sixth dimension — student thinking — is where the mutation hides.
 *
 * The subversion IS the lesson: after five classrooms training the
 * player to hunt for teacher mistakes, the boss reveals that a room
 * can be perfect in every visible, teacher-controlled way and still
 * fail — because the students have learned to *perform* learning.
 */

export interface AuditDimension {
  id: string;
  /** What the player is examining, e.g. "Learning Objectives" */
  label: string;
  /** Short description of what Toki observes when auditing this. */
  observation: string;
  /** Whether this dimension is clean or hides the mutation. */
  verdict: 'clean' | 'mutation';
  /** Toki's assessment shown after the player makes their call — this
   * is the teaching moment regardless of whether they judged right. */
  finding: string;
  /** Shown only if the player calls this dimension wrong, before
   * letting them reconsider — same "look again" pattern as the rest
   * of the game, not a locked-out wrong answer. */
  hint: string;
}

export interface BossDefinition {
  id: number;
  title: string;
  theme: string;
  subject: string;
  sceneImage?: string;
  /** The opening scenario — sets up the "flawless room" that the
   * player will instinctively distrust and search for a teacher flaw. */
  scenario: string;
  /** The six dimensions the player audits, in order. Exactly one has
   * verdict 'mutation'; it should be last (student thinking). */
  dimensions: AuditDimension[];
  /** After all six are audited and the mutation found, the player makes
   * the key judgment: where does the real problem live? */
  locate: {
    prompt: string;
    options: { id: string; label: string }[];
    correctId: string;
    hint: string;
  };
  /** The coaching move for a mutation in student thinking (not teacher
   * behavior) — the hardest, most subtle intervention in the game. */
  coaching: {
    prompt: string;
    options: { id: string; label: string }[];
    correctId: string;
    hint: string;
  };
  reveal: {
    whatDrifted: string;
    whyItHappened: string;
    howToRestore: string;
    /** The meta-moment — the game naming its own design (GDD §2). */
    finalWord: string;
  };
  points: {
    audit: number;      // completing the full six-dimension audit
    locate: number;     // correctly locating the mutation
    coaching: number;   // the coaching move
    reasoningBonus?: number;
  };
  badgeTriggers: string[];
}
