# "Every Classroom Has a Story | لكل صفّ حكاية" — complete design package (authoritative)

Source: Google Doc "Every Classroom Has a Story _ لكل صفّ حكاية" (complete game
design, content and implementation package). **Supersedes ALEF_PROPOSAL.md where
they differ.** The package's DOCX / STORY_SCRIPT.md / content JSON / JSON Schema /
HTML prototype are referenced but not yet in the repo (links not shared).

## Universe, not missions
- One persistent classroom universe. **No mandatory worlds, no single route.**
- Ms. Mariam (competent, reflective). Ahmed (readiness/confidence needing
  evidence), Sara (recoverable difficulty, never "low ability"), Omar
  (participation/purpose/confidence). Student states evolve across sessions.
- Telegram brings the teacher in; play stays inside the game. No coach/DLIS
  character, no required channel clues or external links.
- Phases are invisible structure: **Launch → Facilitate & Synthesize → Extend & Assess**.
- Rule everywhere: **evidence first → instructional decision → Alef tool → classroom consequence.**

## Content: 16 scenarios, 6 random events, 4 endings
| ID | Scenario | Phase | Purpose | Discovery |
|---|---|---|---|---|
| L01 | The First Five Minutes | Launch | Enter, explore freely, establish student states | Entry hub |
| L02 | What Do We Know? | Launch | Activate prior knowledge, surface evidence | Present Mode |
| L03 | Ready for More | Launch | Investigate Ahmed's readiness before extending | Assign |
| L04 | Find the Missing Piece | Launch | Diagnose why Sara struggles | Need Help / See Why |
| L05 | Choose the Right Start | Launch | Match opening activity to purpose | Assign |
| F01 | Make Thinking Visible | F&S | Responses beyond the usual volunteers | Present Mode / live evidence |
| F02 | Everyone Has a Voice | F&S | Purposeful collaboration, not grouping for its own sake | Teams |
| F03 | The Mid-Lesson Pivot | F&S | Interpret evidence, adjust instruction | Class Progress concept |
| F04 | Help Without Giving It Away | F&S | Least intrusive support that preserves thinking | Need Help / See Why / AI Helper |
| F05 | Practice With Purpose | F&S | Another meaningful attempt for Sara after support | Practice |
| F06 | The Energy Dip | F&S | Engagement mechanics only when they serve learning | Gamification |
| E01 | Exit With Evidence | E&A | Aligned end-of-lesson check | Exit Ticket |
| E02 | Show What You Learned | E&A | Completion vs meaningful demonstration | Show My Learning |
| E03 | Ready for the Exam | E&A | Assessment evidence → what needs work | Exam Prep Assessment |
| E04 | The Next Best Step | E&A | Readiness / reinforcement / enrichment to learners | Alef Pathways |
| E05 | Tomorrow's Plan | E&A | Evidence → next instructional decision | Class Progress / Assign |

Random events: **R01 The Unexpected Helper** (after secure understanding; peer
explanation) · **R02 The Misconception Ripple** (individual difficulty is shared) ·
**R03 One More Question** (near the end: is more evidence worth it?) · **R04 Time
Squeeze** (changes the interaction budget, never which decisions are sound) ·
**R05 Quiet Confidence** (a non-volunteer understands more than expected) ·
**R06 Second Chance** (reopens an unresolved need; no unrecoverable state).

Endings (state-based, not win/lose): **END-A Purposeful Launch** · **END-B The
Unfinished Puzzle** (unresolved needs; preserves progress; generates a follow-up)
· **END-C An Unexpected Opportunity** (productive interaction / unplanned
opportunity) · **END-D Evidence to Action** (evidence gathered and used to change
a later decision — strongest).

Opening: OPEN-01 arrival · OPEN-02 students through behaviour, not labels ·
OPEN-03 three voices · OPEN-04 "Five minutes before we begin. Where should I
start?" / «خمس دقائق قبل أن نبدأ. من أين أبدأ؟» · OPEN-05 into the tappable
classroom. Hotspots: Ahmed, Sara, Omar, interactive board, Alef laptop, bookshelf.
No "Question 1".

## Pools (base weights, each = 100 %)
- **After Launch:** L02 20 · L03 20 · L04 20 · L05 15 · F01 10 · R01 5 · R02 5 · R04 5
- **Mid-Lesson:** F01 15 · F02 15 · F03 20 · F04 15 · F05 10 · F06 10 · R01 5 · R02 5 · R04 5
- **Late Lesson:** E01 25 · E02 15 · E03 10 · E04 20 · E05 15 · R01 5 · R03 5 · R06 5

Before selection remove events that fail prerequisites, are on **cooldown**, would
**immediately repeat**, contradict state, or break progression; normalise.
**Seeded PRNG** (session seed = server session id + content version; QA override),
e.g. `41029 → L01 → L03 → R01 → F01 → F03 → E01 → E05 → END-D`,
`98114 → L01 → L04 → F04 → F05 → R02 → F03 → E01 → END-B`.
**Reconvergence** at F03, E01, E05 (different states/inventories). **Recovery** via
R06. **Anti-farming:** first meaningful discovery full XP; identical repeats
reduced/zero; a genuinely different evidence path still earns exploration credit.
**No streaks, no energy system, no countdown pressure, no missed-day penalties,
no forced sharing.**

## Interactions (non-MCQ)
Tap-to-investigate, reveal-and-compare, match evidence to interpretation, sort
actions by purpose, order a sequence, choose a support with progressive hints, tap
response patterns on a simulated class view, assemble tomorrow's plan from evidence
cards, drag/sort — **every drag has a tap/select-and-place alternative**; large
targets (WCAG 2.2 ≥24px minimum; aim ≥44px), focus states, keyboard order,
captions, reduced motion, full RTL.

## Product boundary
Do **not** reproduce or invent Alef screens: abstract simulations until SMEs
approve. Publicly verified: Present Mode, flexible assignment, live classroom
analytics, polls, open responses, gamified assessments, Alef Pathways. Needs
internal validation: Assign label/UI, Class Progress label, Teams, Exit Ticket,
Show My Learning, Exam Prep Assessment, AI Helper, Need Help, See Why, Practice
label.

## Save, platform, privacy, analytics
Save: content version, pseudonymous key, seed, visited scenarios, outcomes, tools,
unresolved needs, student-state variables, current phase, XP, collectibles,
accessibility settings, last safe resume point. initData validated **server-side**
(never trust initDataUnsafe). Telegram storage is not the system of record.
Versioned scenario JSON loaded, not hard-coded. No real student data. Teacher data
minimal; UAE PDPL → Alef privacy/legal approval; adoption linkage only via an
approved pseudonymous token.
Analytics events: game_open, scenario_enter, hotspot_tap, evidence_reveal,
choice_commit, tool_discovered, scenario_complete, ending_reached, replay_started,
resume_success, language_change, accessibility_setting_change. Keep **game
engagement**, **learning behaviour** and **platform adoption** separate.
Audio optional; subtitles; sound never carries essential info.
