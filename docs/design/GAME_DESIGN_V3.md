# Toki's Coaching Quest — Game Design v3

*Game designer's brief. Verdict being answered: "it's very basic and easy."*

## 1. Why the loop is easy

The game asks a coach to do the easy half of coaching and never the hard half.

| Symptom | Cause | Where |
|---|---|---|
| **Answers are guessable from wording.** The correct option is the longest, the most nuanced, the one with "reasoning" or "learning" in it; distractors are strawmen ("add bigger prizes", "remove all game elements"). | Options written to be *clearly wrong*, not *tempting*. | All of World 1; most of 2–6. |
| **Nothing pushes back.** Four taps, each either right or "look again". The classroom is a quiz with a scene behind it. | Only one actor: the player. The teacher is scenery. | LevelScreen's five beats. |
| **No consequences.** A wrong guess costs points and nothing else. The practice is always "restored" on reaching the reveal. | `points.restore` was granted unconditionally. | `computeResult()` |
| **Every room has the same shape.** Observe → drift → risk → move → reveal, 31 times. Pattern-audit bosses and World 7's diagnosis are the only variation. | One template. | Worlds 1–6 |
| **No reason to return.** A classroom plays identically the second time. | Deterministic content, no state carried. | — |

The first and second items are the ones a DLIS feels within three minutes. A senior coach can clear World 1 without reading the scenario.

## 2. Mechanics, ranked

**1. The Coaching Conversation — SHIPPED in this branch.** After choosing the move, Toki has to *deliver* it to a person with a stance (proud / tired / defensive / eager). Two turns; three lines each; the teacher answers in kind. A line that is correct in content but wrong in register — judgement, jargon, telling — *closes* the teacher and the conversation ends. Outcome: **restored / partly restored / nothing changed**, which now decides the `restore` points (100 / 50 / 0) and gates the badge. The reveal adds "What happened next" in the outcome's colour.
*Fit:* a new beat between coaching and reasoning in `LevelScreen`, and between coaching and reveal in `AcademyScreen`; content is an optional `conversation` block on the level, so worlds without one play exactly as before. Authored for Worlds 1 and 7 (nine teachers). *Effort:* M. *Impact:* this is the half of the job the game was missing.

**2. Near-miss distractors — SHIPPED for World 1.** Every wrong option is now something a decent coach might say ("assign discussion roles so every voice is heard" vs. the right "prompts that require evidence"). Options are length-balanced; the tell is gone. *Fit:* data only, `correctId` unchanged. *Effort:* S per world. *Impact:* first-try rate should drop from ~90% to the 40–70% band the PM wants. Worlds 2–6 are the content agent's pass.

**3. Contradicting evidence (World 4+).** One of the three hotspots in a classroom *contradicts* the obvious reading — the marking is dated but the response lines are blank; the dashboard is green but the checkpoint is red. The drift question becomes "which evidence do you trust?" *Fit:* `EvidenceSpot` gains `weight: 'supports'|'contradicts'`; the Observe beat asks the player to flag the clue that changed their mind before the CTA unlocks. *Effort:* M. *Impact:* turns Observe from a tap-three-dots ritual into reading.

**4. The second visit (replay).** Completing a world unlocks a *return visit* to one of its classrooms, four weeks later, with the same teacher and a new scene: did the restored practice hold, mutate, or get quietly dropped? Uses the conversation outcome the player actually earned. *Fit:* a `revisit` block keyed by outcome; a new card in the hub, marked ⟲. *Effort:* M–L (content-heavy). *Impact:* the only mechanic here that makes the game *about* coaching over time, which is what DLIS work is.

**5. Teacher memory across a world.** The teacher from classroom 2 appears in the pattern-audit boss with a reference to how that conversation went. *Fit:* `WorldBossScreen` scene text keyed by stored outcomes. *Effort:* S once outcomes are saved (they are not yet — see below). *Impact:* continuity; the school starts to feel like a place.

**6. The principal's question (Final World).** Before the prioritisation, the principal asks one hard, unexpected question ("The board wants a number. Which one?") with no right answer — the player's choice changes the final-message wording, not the score. *Fit:* one extra phase in `SchoolVisitScreen`. *Effort:* S. *Impact:* a Master DLIS ending that reads the player back to themselves.

Deferred on purpose: timers, streaks, combo multipliers, public rankings. They would raise "difficulty" the way a buzzer does — by rewarding speed — and the game's own World 1 says why that is a mutation.

## 3. Difficulty curve

| World | What is hard | Hints | Teacher stance |
|---|---|---|---|
| 1 Busy Classroom | Reading the scene; register in the conversation | full | proud, eager, tired — forgiving replies |
| 2–3 Assessment / Alef | Near-miss distractors; data that looks healthy | full | (conversations to be authored) |
| 4–5 Feedback / Questioning | Contradicting evidence (mechanic 3) | shorter | defensive appears |
| 6 Differentiation | Healthy scenes in the boss outnumber drifted ones | shorter | — |
| 7 Academy | 0–many findings; over-coaching costs; conversations where the right move is *saying nothing is wrong* (72) or *saying one thing only* (73, 74) | minimal | strong teachers, closing lines are tempting |
| Final | Six contexts, priority is upstream not biggest; principal's question | none | leadership |

The conversation difficulty is tuned by what the *closing* line looks like. In World 1 it is visibly a lecture. In World 7 it is the line a confident coach would actually say ("Three issues — let's go through them").

## 4. Scoring rule (as implemented)

- Drift / risk / move: unchanged (first try 100%, then 60/30/15%).
- **Conversation:** effects per turn — *opens* / *neutral* / *closes*. A *closes* ends the conversation. All *opens* → **restored** → 100% of `restore` points. No *closes* but any *neutral* → **partly restored** → 50%. Any *closes* → **nothing changed** → 0.
- **Badge:** clean first-try run on the three calls **and** practice restored. A correctly diagnosed drift that the teacher doesn't act on is not mastery.
- World 7 academy classrooms: `conversation: 25` points added (total 125), same rule.

## 5. What the next build needs

- **Persist conversation outcomes** in the save (`outcomes[levelId]`) — mechanics 4 and 5 depend on it, and the admin store should carry it (`restored_count` is a better coaching-skill signal than score).
- Author conversations for Worlds 2–6 (20 classrooms, ~4 strings × 2 turns × 3 options each). The content agent's near-miss pass should happen first so the moves the conversation delivers are the final ones.
- Reduced-motion: bubbles fade, no slide — done; verify on a device.
