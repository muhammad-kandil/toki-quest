# Blind playtest synthesis — three synthetic DLISs vs. the coach panel

Three playtesters played build `e177c8c` from the screen only (no source, no
docs), each in a separate browser against their own server, and wrote a
diary. They had different briefs and did not see each other's notes.

| Tester | Brief | Played | "Worth my time" |
|---|---|---|---|
| **Amna** | senior DLIS, English, 9 years coaching | W1 (all 6), W7 (all 5) | W1 **3/5**, W7 **4/5** |
| **Omar** | new DLIS, English, first year | W1, W2, W3 (all, genuinely unlocked) | W1 **3/5**, W2 **4/5**, W3 **4/5** |
| **Noura** | Arabic-first DLIS, Al Ain | W1 (all 6), W7 (all 5), in Arabic | W1 **3/5**, W7 **4/5** |

Diaries: `/home/claude/playtests/{amna,omar,noura}/PLAYTEST_*.md` (467
screenshots alongside). Panel review: `docs/content/COACH_REVIEW.md`,
`docs/content/ARABIC_REVIEW.md`.

## Where all three agree (and the panel did not see)

These were invisible to the coach panel because the panel read the content
as data; the players met it as a game.

| # | Finding | Amna | Omar | Noura | Panel |
|---|---|---|---|---|---|
| 1 | **The risk step is a lottery.** Four levels never defined before first use; hints are translated metaphors that point the wrong way; reveal never says *why* that level; wrong picks lose their mark; hint renders below the fold. | 5/11 rooms sent to "Look again", C1 took four taps | first-try wrong in **9 of 13**, learned "pick one lower than my gut" | 4 attempts on W1C1, 3 on W1C2; "تحوّر قاتل reads like a virus" | ✗ (panel checked calibration of *which* level, not whether the scale was learnable) |
| 2 | **The World 1 finale has no evidence.** Six "does it check out?" calls on one line of narration each; dimension 6 telegraphs itself. | "weakest thing in World 1", coin flip with a penalty | "best idea in the game, executed as a slideshow" | got dimension 2 wrong "on nothing" | ✗ (panel: "Boss 6 is fine", edited one distractor) |
| 3 | **World 7's diagnosis mechanic should be the game.** Multi-select findings, per-finding verdicts, "no drift" option, bait findings. | "the real product" | — (did not reach W7) | "strongest mechanic in the game" | ✓ panel liked W7, did not propose porting it |
| 4 | **The teacher conversations carry the game.** | "excellent" | "best material", would show his line manager | Hessa and Khalid "sound like real UAE teachers" | ✓ "the best writing in the game" |
| 5 | **The kicker spoils the diagnosis.** "PARTICIPATION ≠ LEARNING" is printed above the door before any evidence; door titles ("The Assessment Trap") hand over the risk. | drift first-try in 11/11, "never felt like judgement" | "subtitles give away the diagnosis" | — | ✗ |
| 6 | **"Master DLIS" badge after World 1** while World 8 is called The Master DLIS. | ✓ | ✓ | ✓ ("خبير DLIS") | ✗ |
| 7 | **No way out of a room; Back leaves the app** (about:blank). | ✓ | ✓ (from Badges) | — | ✗ |

## Where the panel and the players disagree

- **Praise-first openers.** Omar: the "nice" opener is *always* wrong, and the
  teacher then answers a criticism Toki never made ("So what, I make them
  stop agreeing?"). The panel's voice guide says praise without a clue in it
  is empty — which is the design — but the player experiences it as a
  pattern to game, not a judgement to make. **Ruling: content.** Keep the
  mechanic; rewrite the praise-opener *replies* in W1–3 so the teacher
  responds to what was said, and give one room per world where the warm
  opener is `opens` (so the pattern is not learnable as "never be kind").
- **"What happened next" vs. the conversation.** Omar, three times: the
  teacher agreed to X; the reveal says Y stayed. The outcome text is keyed
  to `restored | partial | unchanged`, not to the branch. The panel did not
  flag it because it read outcomes in isolation. **Ruling: content.** Each
  `partial` outcome in W1–3 must name the half-measure the teacher actually
  took, not a generic "still there".
- **Drift reuse.** Omar counts "data collected, not acted on" five times by
  W3C3. The panel's cut list (L2, L41, L32) addresses a different
  redundancy. **Ruling: hold for pilot data** — `v_toki_pilot_readout`
  will show whether W2C1/W2C3/W3C3 are "guessable" (first_try_rate > 70).
- **Arabic register.** Noura's 75 lines are mostly in the dialogue and
  hints, not the reveals — the opposite of where `ARABIC_REVIEW.md`
  concentrated. The two reviews overlap on 11 lines. **Ruling:** Noura's
  list is the next Arabic pass; the 11 overlaps are confirmed and fixed
  first.

## What shipped from this (wave 1, this commit)

Engine, all worlds:

1. Severity scale defined under each option, before the first call
   (`RISK_DESC`); "Why this level" line on every classroom reveal; a second
   hint on the second miss that points back at the definitions.
2. Wrong picks stay marked (✕) and inert; the hint renders *above* the
   options and scrolls into view.
3. The theme kicker ("X ≠ Y") moved from the observe beat to the reveal.
   The observe beat shows the subject instead. (Door titles are content —
   logged below.)
4. Hardware / browser Back goes to the parent screen, never out of the app;
   Telegram's BackButton is wired to the same handler. A two-tap "leave
   room" control on every classroom.
5. RTL: score deltas and the conversation counter are `<bdi dir="ltr">`
   ("+25", "1 / 2"); the Toki speaker label is «توكي»; Arabic comma in the
   teacher read line.
6. Hub hint names the world's own challenge instead of "The Perfect
   Classroom" everywhere.

Content:

7. World 1 finale: every dimension now has real evidence (what Toki
   counts, reads, hears), the sixth no longer announces itself, and the
   hints point at the evidence. It awards its own badge, **Clear Eyes**;
   **Master DLIS** is World 8's alone.
8. Arabic: `إنها معلّمة` (gender), the Grade 9 data-meeting line, Sunday →
   Monday as a school day (W4 L41 setting, W7 C1 conversation), observer =
   `الملاحِظ` throughout, skin label `الغترة والعقال`.

## Still open (ordered by pilot risk)

1. **Door titles that name the drift** ("The Assessment Trap", "The
   Gamification Mutation", "Data Without Decisions"). Content: retitle
   W1–3 rooms by *place*, not by diagnosis. Needs 13 titles EN/AR.
2. **Port the W7 diagnosis mechanic to W1–6** (multi-select findings with
   bait). Large; decide after pilot readout — if `first_try_rate` on the
   drift step is > 70 across W1–3, this is the next engine job.
3. **Praise-opener replies and `partial` outcomes** in W1–3 (above).
4. **Noura's 75 Arabic lines** — next Arabic pass; the "Toki speaks
   Emirati" register (copy Hessa, Khalid) for all teachers.
5. **Numerals**: one system per locale (Arabic-Indic in Arabic throughout,
   or Western throughout). Currently mixed between clue cards and counters.
6. **Transition dead time** (~3 s door → room) caused double taps for Amna.
   Shorten the hub walk/door/wipe to ≤1.4 s total.
7. **Hint content** (not placement): the two W1 risk hints are metaphors
   that misled all three testers. Rewrite "crack or the whole floor" and
   "one unread pile away" as criterion questions.
8. Badges: "Mutation Hunter" earned for filing *no* mutation (W7 C2 is a
   healthy room — correct, but the badge name reads wrong there);
   feminine badge forms for the Arabic audience.

## Pilot go/no-go: unchanged, with one addition

The Director's GO (Worlds 1–3 then 7, three DLISs, thresholds in
`READOUT.md`) stands. Add one threshold from this round: **risk-step
first-try rate ≥ 40% in W1** on the new build; below that, the scale
definitions did not land and the step should be made non-scoring for the
second pilot.
