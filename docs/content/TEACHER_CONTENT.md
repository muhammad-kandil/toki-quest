# Teacher content: "Every Classroom Has a Story"

Owner: Hessa (game & learning design). Source of truth for `src/teacher/data/**`.
Authority: `docs/product/ALEF_PROPOSAL.md` wins over every earlier brief.
Validate with `npx vite-node tools/teacher/check-content.ts` (static checks
plus 8,000 simulated plays per mission).

## Principles applied

- The player helps **Ms. Mariam**, a UAE public-school teacher. No mentor or
  DLIS character appears in mission content.
- **Investigate, then decide.** Each student is an investigation: one coherent
  evidence profile is drawn (weighted) when the encounter opens, every clue
  agrees with it, and the choices offered depend on it. Outcomes follow the
  teacher's choice, never a random draw, so a supportive choice is never
  "ineffective" by luck.
- **No countdown.** Missions are `timed: false`; "five minutes" is the story.
  Choice `minutes` are 0–1 narrative values only.
- **Randomness varies events, it never judges teaching**: profiles and pool
  events change what happens; outcome tones depend only on choices.
- **XP** (illustrative): 30 per resolved investigation (on the outcome), 50
  per first discovery of an NCLE tool (engine, from `discover`), 100 for the
  planning puzzle (`puzzle.xp`). Once per meaningful action. XP is never
  described as competence or achievement.
- **No fixed-ability labels** in player text ("strong", "weak", "low group"
  never appear; profile ids are internal).
- Every choice is a real option a teacher would consider; deferring is
  allowed and honest ("Noted, not yet solved"), never shamed.

## Engine contract (what the content assumes)

1. Untimed missions: every `schedule` event is a hotspot, open from the start.
   The player chooses the order and may skip objects.
2. An event with `investigate` draws one profile by `weight` when opened and
   sets its `setFlag`. Clue texts come from `profile.clues[clue.id]`;
   `clue.text` is the neutral prompt shown before the tap. Choices show when
   their `ifFlag` is unset or set.
3. **Pool events** have `category` + `weight` (+ optional `eligible`) and are
   neither scheduled nor opened by an outcome. After each student encounter
   resolves, the engine draws one among the eligible unseen ones (weights
   normalised); none eligible → back to exploration. A pool event pulses on
   its `on` hotspot; if that hotspot's own event is still open, it comes first.
   Weights follow the proposal: learning 35 · collaboration 25 ·
   misconception 20 · management 15 · bonus 5.
4. A choice whose outcome id equals `puzzle.id` opens the puzzle; the outcome
   shows after it. `puzzle.badge` and `puzzle.xp` are awarded on completion.
5. Milestone: every student hotspot event is resolved. The player may finish
   open events, then the mission closes with the eligible ending of lowest
   `priority`; other eligible endings are offered as choices.
6. `Ending.opens` and any flag `unlock:<missionId>` unlock missions.
7. `badges[]` is the mission's badge catalogue and end-of-run rule list (first
   match); `Ending.badge` and `puzzle.badge` award from the same catalogue.
8. Choice `resource` is not used in missions; tools are discovered through
   `Outcome.discover`.

## Arabic conventions

Natural MSA as a Gulf teacher writes it; Arabic-Indic digits and `٪`; «» for
quotes; Ms. Mariam addressed in the feminine (اختاري، انظري); "Try it Monday"
lines in the generic masculine imperative used by Arabic teacher guides;
short childlike student lines (أستاذة، خلّصت). «ألف» in guillemets. NCLE tool
names are translated descriptively (وضع العرض، اعرف السبب) and must be
replaced by Alef's official Arabic names once verified.

## NCLE tools (`resources.ts`, all `placeholder: true`)

| Tool | Stage (proposed) | First mission | What the game says it does (proposal only) |
|---|---|---|---|
| Present Mode | Launch | M01 | share the learning intention; open a prior-knowledge discussion |
| Gamification | Launch | M05 | game elements used on purpose |
| Need Help | Facilitate | M01 | task guidance for a student |
| See Why | Facilitate | M01 | question the reasoning behind an answer |
| AI Helper | Facilitate | M01 | another source of task guidance |
| Practice | Facilitate | M01 | reinforcement |
| Teams | Facilitate | M01 | collaboration |
| Assign | Extend | M01 | give work matched to where the student is (e.g. extension) |
| Class Progress | Extend | M06 | a view of class progress |
| Exit Ticket | Extend | M06 | a short end-of-lesson check |
| Show My Learning | Extend | M07 | students show what they learned |
| Exam Prep Assessment | Extend | M07 | assessment for exam preparation |
| Pathways | Extend | M07 | different routes through learning |

## To verify (every product claim in the content)

Alef product specialists sign off each line; until then `placeholder: true`.

**General**
- V1. Official English and Arabic names of all 13 NCLE tools.
- V2. The stage each tool belongs to (Launch / Facilitate & Synthesize / Extend & Assess).
- V3. "Build Your Learning Journey" is labelled a simplified illustration; confirm the three stage names and that no real screen is implied.

**Mission 01**
- V4. Assign can be used to give one student more challenging (extension) work.
- V5. Present Mode can show a lesson's learning intention to the class from the board.
- V6. Present Mode can open a prior-knowledge discussion.
- V7. See Why supports questioning a student's reasoning / surfacing a misconception.
- V8. Need Help gives a student guidance on the task in front of them.
- V9. AI Helper can explain what a question is asking, in the student's words.
- V10. Practice gives short reinforcement before moving on.
- V11. Teams supports pairing two students with roles (explain / check).
- V12. Grade 7 Math ratios / unit rates is a suitable NCLE lesson context (subject not given in the proposal; content designer's choice).

---

<a id="m01"></a>
## Mission 01 · The First Five Minutes (MVP)

`a1` · Grade 7 · Math (yesterday: equivalent ratios; today: unit rates) ·
Ahmed, Sara, Omar · laptop, board, bookshelf · 5–8 min, untimed.

**Teacher's learning goal:** in the first minutes, find each student's real
starting point from evidence (answer, reasoning, application; notebook,
tablet, words; desk, attention, reply) before choosing a response, and match
the response to the need.

**Opening film** (7 beats over 5 pictures): arrival → students arrive →
Ahmed / Sara / Omar lines (verbatim) on one picture → "Five minutes before we
begin. Where should I start?" → pull back into the classroom. Opening screen:
"MISSION 01 | The First Five Minutes · Your classroom. Your decisions. Your
adventure." (the UI adds "Start Playing").

### Evidence profiles

| Student | Profile (weight) | Flag | Choices → outcome |
|---|---|---|---|
| Ahmed · Confidence Detective (answer / explanation / application) | strong (35) | `a1.ahmed:strong` | Assign a challenge → *Ready for more* (Assign, `unlock:m2`) · start main task → *Finishes first again* |
| | correct, weak reasoning (25) | `a1.ahmed:shallow` | "Why does that rule work?" → *The rule cracks* (See Why) · harder task anyway → *Rule will break later* (`a1.gap`) |
| | can't apply prior knowledge (20) | `a1.ahmed:prior` | 2-min decimals refresher → *One step back* · note for later → *Noted* (`a1.gap`) |
| | strong + peer question (20) | `a1.ahmed:peer` | pair them (Teams) → *A pair, on purpose* (`a1.peerVoice`) · "Let Omar try first" → *Helping, not telling* (`a1.peerVoice`) |
| Sara · Find the Missing Piece (notebook / tablet / bubble) | missing prerequisite (30) | `a1.sara:prerequisite` | simplify together → *The missing piece* (`unlock:m4`) · start new topic → *Gap goes with her* (`a1.gap`) |
| | repeated misconception (25) | `a1.sara:misconception` | "Show me how you got 4:5" → *Adding, not multiplying* (See Why) · rule again → *The rule, again* (`a1.gap`) |
| | needs task guidance (25) | `a1.sara:task` | Need Help → *Guidance on the task* · AI Helper → *She asks what it means* |
| | needs reinforcement (20) | `a1.sara:practice` | Practice → *A little more* · encourage → *Still unsure* |
| Omar · What's Behind the Silence? (desk / attention / reply) | unclear goal (30) | `a1.omar:goal` | Present Mode → *Now he knows* (`a1.intention`) · tell him quietly → *His table doesn't* |
| | missing prior knowledge (25) | `a1.omar:prior` | yesterday's example → *Yesterday in two minutes* · note for later (`a1.gap`) |
| | low confidence (25) | `a1.omar:confidence` | "One guess, no names" → opens **Omar's guess** investigation · tell a partner (Teams, `a1.peerVoice`) |
| | distraction (20) | `a1.omar:distracted` | sports-day hook → *metres per second* · move closer → *still elsewhere* |

Omar's guess (2:3 = 3:4, additive) is the proposal's "a student response may
reveal a misconception and open a new investigation": See Why, or a class
discussion (`a1.peerVoice`).

### Map

```mermaid
flowchart LR
  F[Film] --> C((Classroom))
  C --> A[Ahmed: 3 evidence cards] --> AP{profile}
  AP -->|strong| AS[Assign / main task]
  AP -->|shallow| AW[See Why / harder anyway: gap]
  AP -->|prior| AR[refresher / note: gap]
  AP -->|peer| AT[Teams / coach: peerVoice]
  C --> S[Sara: notebook, tablet, bubble] --> SP{profile}
  SP -->|prerequisite| SB[simplify: unlock m4 / defer: gap]
  SP -->|misconception| SW[See Why / rule again: gap]
  SP -->|task| SN[Need Help / AI Helper]
  SP -->|practice| SR[Practice / encourage]
  C --> O[Omar: desk, attention, reply] --> OP{profile}
  OP -->|goal| OI[Present Mode: intention]
  OP -->|prior| OC[catch-up / note: gap]
  OP -->|confidence| OG[one guess] --> OGI[Omar's guess: See Why / class vote]
  OP -->|distracted| OH[hook / move]
  C --> L[Laptop: Build Your Learning Journey: Instructional Architect +100]
  C --> B[Board: Present Mode / prior-knowledge talk]
  C --> K[Bookshelf: recipe card]
  A & S & O -.after each.-> POOL[(Pool: link 35 · pair 25 · ratio≠fraction 20 · batteries 15 · luqaimat note 5)]
  C ==>|all three found| E{Endings}
  E -->|a1.gap, p1| U[The Unfinished Puzzle → m4 Bridging the Gap]
  E -->|a1.peerVoice, p2| X[An Unexpected Opportunity → m5 Everyone Has a Voice]
  E -->|no gap, p3| R[Ready to Learn · Purposeful Launch → m3 Bring Learning to Life]
```

Pool eligibility: the speed-in-science link skips Ahmed's "shallow" profile;
the ratio-is-a-fraction misconception skips Sara's "misconception" profile so
the same morning never stacks two near-identical misconceptions.

**Simulated play (random choices):** XP 90–220, median 190; top ending
Unfinished 46 %, Opportunity 43 %, Ready 12 % (random play defers often; a
deliberate player reaches Ready by resolving every need).

### Picture briefs

Scene `public/teacher/scenes/m01.jpg` (portrait 2:3): a Grade 7 classroom in
a UAE public school, morning light from a window on the left, students in
school uniform (boys' white kandura-style uniform, girls' uniform with white
shayla, consistent with the existing art). **Omar** by the window (18/44),
sitting back, pen down. **Sara** front-left (34/58) with an open notebook and
tablet, flicking back pages. **Ahmed** centre-right (64/50), tablet already
on today's lesson, half turning to talk. **Board** top-centre (50/16), clean.
**Laptop** open on the teacher's desk lower-right (82/64). **Bookshelf** on
the left wall upper area (10/30) with an atlas and globe. Keep the bottom
30 % calm (sheet area). No text on the board.

Film `public/teacher/film/m01-1…5.jpg` (portrait 2:3, same art style):
1. Ms. Mariam (Emirati, abaya and shayla, lanyard, tote bag) at the classroom
   door, morning corridor behind her.
2. Students coming in, bags going down, the room filling.
3. Close group shot of Ahmed (eager, hand half up), Sara (worried, notebook
   held up) and Omar (quiet, looking at the window); used for all three lines.
4. Ms. Mariam at her desk, looking out over the room, a beat of thought.
5. Wide pull-back: the whole classroom as in the scene picture.

---

## Shop and Term Pass (customisation)

`shop.ts`: 10 outfits, 14 accessories, 5 power-ups; prices in thank-you
notes, earned only from the Term Pass (`termPass.ts`, 12 steps, one per
finished mission or replay) and the end-of-term bundle. One term earns 54
notes plus 5 gifted items; the 24 cosmetics cost 56 after gifts, so a full
term buys most cosmetics and about three power-ups, never everything.
Professional rewards (NCLE tool cards, story chapters, planner pages,
spotlights) are never priced.

Open issue: the shop includes Toki outfits and accessories (per the earlier
shop brief), but the proposal says the teacher game needs no Toki. Product
to decide: keep Toki as a cosmetic-only companion, or retarget those items
to Ms. Mariam / the classroom.

## Internal sample

`adventures/sample-g5-fractions.ts` is the approved Grade 5 fractions demo
ported to the schema (timed). Not registered in `ADVENTURES`; validated as a
sample. Flags renamed `g5.*`; resources mapped to the nearest NCLE tool.

---

<a id="m02"></a>
## Mission 02 · Beyond the Expected

`m2` · Grade 7 · Math (percentages, discounts) · Ahmed, Reem, Khalid ·
opened by `unlock:m2` (Ahmed's ready profile in M01).

**Teacher's learning goal:** extension means depth, not volume. Check that
"ready" is real (fast is not the same as deep), give open problems through
Assign, and let ready learners lead by asking, not by doing others' work
(Teams with roles).

| Student | Profiles (weight) → choices |
|---|---|
| Ahmed (yesterday's work / explanation / with peers) | deep 40 → open problem (Assign, `m2.stretch`) · group leader (does it all, `m2.takeover`) — fast 30 → "estimate first" (See Why) · harder set (`m2.gap`) — leader 30 → questioner role (Teams, `m2.peerLead`) · teach at front (`m2.takeover`) |
| Reem (check / working / words) | ready 40 → same open problem · her own challenge (both Assign) — compare 35 → "what would you find interesting?" · Ahmed's task — gap 25 → Practice first · extension now (`m2.gap`) |
| Khalid (face / notebook / words) | unsure 40 → own way in (Assign) · pair with Ahmed (good if `m2.peerLead`, else carried) — ready 30 → open problem too · core task — social 30 → roles for three (Teams) · alone |

Objects: laptop (open problem via Assign / ten harder questions), board
(three methods side by side via Present Mode / model answer), bookshelf
(receipt collectible). Pool: discount-on-discount (learning 35, not for the
"fast" profile) · Reem vs Khalid disagreement (collaboration 25) ·
"20% off then 20% on" (misconception 20) · sheets run out (management 15).

```mermaid
flowchart LR
  C((Classroom)) --> A[Ahmed] & R[Reem] & K[Khalid] & L[Laptop] & B[Board] & S[Bookshelf]
  A & R & K -.-> P[(pool)]
  C ==> E{Endings}
  E -->|m2.gap p1| MM[More Than More → m6]
  E -->|m2.peerLead p2| TT[A Team That Thinks → m6]
  E -->|no gap p3| CL[The Ceiling Lifts · badge Beyond the Expected → m7]
```

**Scene brief (`teacher/scenes/m02.jpg`, 2:3):** the M01 Grade 7 classroom,
same light. Ahmed centre-right (62/50) bent over a sheet; Reem front-left
(36/56) leaning to see Ahmed's work; Khalid by the window (20/46), alone,
sheet half hidden. Laptop, board, bookshelf as in M01. A receipt sticks out
of a book on the shelf. **Film** `m02-1…3`: (1) Ahmed waiting at the door
holding a finished sheet; (2) the three students at the front, Ahmed eager,
Reem determined, Khalid hanging back (all three lines); (3) Ms. Mariam
looking at the three, deciding.

**To verify:** V13 Assign can give different students different extension
tasks (open problem vs set) · V14 Assign can send a task to students'
tablets when printouts run out · V15 Present Mode can show several student
methods side by side · V16 Teams supports giving roles (questioner, checker,
recorder) inside a group · V17 Practice gives a short targeted set
(decimal–percent conversions).

---

<a id="m03"></a>
## Mission 03 · Bring Learning to Life

`m3` · Grade 7 · Science (falling objects, air resistance) · Sara, Hamdan,
Noura · opened by M01 "Ready to Learn".

**Teacher's learning goal:** open from students' prior knowledge, out loud,
so a shared misconception (heavier falls faster) is visible before it is
taught against; use Present Mode after predictions, not instead of them.

The **board is an investigation of the class**: hands / reasons / the quiet
ones, with profiles *shared misconception* 45 · *split class* 35 · *most
already know* 20. Choices: discussion vs show-the-answer (shared); sides
convince each other (Teams) vs show (split); deeper question vs re-prove
(ready).

| Student | Profiles (weight) → choices |
|---|---|
| Sara (notebook / example / words) | everyday experience 40 → "light, or air?" (See Why) · tell her (`m3.gap`) — word confusion mass/weight 30 → AI Helper · Need Help word card — nearly there 30 → she designs the test (`m3.peerVoice`) · carry on |
| Hamdan (hands / reason / drawing) | loud and sure 40 → predict then test · correct publicly (`m3.gap`) — quietly doubts 30 → pair with a disagreer (Teams) · call on him (safe answer) — unsure 30 → prediction card · follow the class (`m3.gap`) |
| Noura (notebook / face / words) | Moon-video link 40 → put it on the board (Present Mode) · park — missed last lesson 30 → Need Help catch-up · note (`m3.gap`) — did it last year 30 → Assign parachute question · helper |

Objects: laptop (clip after predictions vs now, Present Mode), bookshelf
(Galileo poster). Pool: falcon question (learning 35) · tables argue
(collaboration 25) · "air pushes heavy things down" (misconception 20, not
when the class is ready) · water spill (management 15).

Endings: **Not Yet Shaken** (`m3.gap`, p1) → m6 · **The Class Taught
Itself** (`m3.peerVoice`, p2) → m7 · **Learning Comes Alive** (no gap, p3,
badge Brought to Life) → m6, m7.

**Scene brief (`teacher/scenes/m03.jpg`):** the Grade 7 room set for
science: two identical clear bottles (one full of water) on the teacher's
desk. Hamdan centre-right (66/48) holding a bottle in each hand; Sara
front-left (34/58) writing; Noura by the window (20/44), quiet, watching.
Board top-centre with two bottle sketches; laptop lower-right; rolled poster
behind books on the shelf (10/30). **Film** `m03-1…3`: (1) close-up of the
two bottles on the desk; (2) the three students reacting (Hamdan sure, Sara
nodding, Noura doubtful); (3) Ms. Mariam holding the bottles up, about to ask.

**To verify:** V18 Present Mode can show a short clip / image to the class ·
V19 Present Mode can show a student's example (photo + sentence) · V20 AI
Helper can explain a science word (mass) to a student · V21 Need Help can
offer task guidance such as a vocabulary card or a one-line recap · V22
Assign can give one student an extension question mid-lesson.
