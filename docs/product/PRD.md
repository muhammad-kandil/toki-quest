# PRD — Ms. Mariam's School (teacher game)

**Owner:** Product (Noor) · **Status:** for client decision · **Date:** 26 Nov 2026
**Client:** Kandil, Alef Education (TQ) · **Blueprint:** `docs/design/TEACHER_REBUILD.md` · **Data contract:** `src/teacher/types.ts`
**Approved reference:** the playable demo "Different Needs, Same Classroom" (7-step loop, Sara / Ahmed / Omar, tablets).

> "The key is to create curiosity, ownership, achievement, and meaningful progression. Teachers should return because they enjoy the experience, want to discover what happens next, and find practical value in using Alef—not simply to accumulate points." — client principle, verbatim. Every section below is tested against it.

---

## 1 · Problem

UAE public-school teachers have Alef in their classrooms, but most of what Alef can do for a lesson is discovered slowly, through training sessions and manuals that teachers do not return to. Training tells teachers *what* a feature is; it rarely lets them *feel* the classroom moment where it helps — the student who is stuck, the one who finished early, the table that has gone quiet, the tablets that dropped.

The existing game (Toki's Coaching Quest) proves the format works inside Telegram, but it is built for 18 DLIS coaches and teaches coaching judgement. Teachers are a different, far larger audience with a different job.

**The opportunity:** a short, replayable classroom simulation in Telegram where a teacher lives a real lesson as Ms. Mariam, makes the calls, sees each student's outcome, and leaves with one Alef move to try on Monday.

## 2 · Personas

| | **Hessa — new teacher** | **Khalid — experienced teacher** | **Noura — Arabic-first teacher** |
|---|---|---|---|
| Context | 1st–2nd year, Grade 5, Abu Dhabi. Uses Alef because she must; knows maybe three features. | 12 years, Grade 5–6 Math, Al Ain. Sceptical of "training games". Has seen every classroom problem. | Teaches in Arabic, plays in Arabic, reads English slowly. Al Ain / Northern Emirates. |
| Wants | Confidence: "what do I *do* when three things happen at once?" | Something he can't already do. Respect for his time. | Content that sounds like a real UAE school, not a translation. |
| Fears | Being judged; getting it "wrong". | Being patronised; points and badges for adults. | Broken RTL, awkward Arabic, mixed numerals. |
| Success looks like | Saves 3+ "Try it Monday" cards; replays Adventure 1 to see the other branch. | Says "I didn't know Alef did that" about one resource; finishes all 4. | Plays every adventure in Arabic without switching to English. |
| Session | 5–10 min, phone, one hand, between periods or at home. | 5 min, skims intros, wants to get to the decision. | Same; often on an older Android or iPhone. |

Design consequence: intros skippable after first play (Khalid); no wrong-answer shame, only consequences (Hessa); Arabic is a first-class authored script, not a translation (Noura).

## 3 · Goals and non-goals

**Goals (pilot, 2–3 weeks)**
1. **Return because they want to.** ≥ 40% of pilot teachers come back within 7 days of first play, with no reminders, streaks or notifications from the game.
2. **Practical value.** ≥ 60% of teachers who finish an adventure open or save at least one "Try it Monday" card.
3. **Curiosity, not completion.** ≥ 25% of finishers replay an adventure and take a *different* path (branch diversity).
4. **Alef discovery.** Every MVP adventure surfaces 2–3 Alef resources tied to a lesson stage; teachers can name one afterwards (pilot interview).
5. **Coach mode keeps working** for the DLIS pilot, unchanged.

**Non-goals**
- Not an assessment of teachers. Nothing is scored, ranked, or reported per teacher to schools or line managers.
- Not an Alef product manual. We show 2–3 resources per lesson in context, not the whole catalogue.
- Not a replacement for Alef training or the Alef platform. No deep links into the platform in MVP.
- Not a social network. The community is Alef's existing Telegram community; we only point to it.
- Not a mobile-game economy. No currencies, shops, loot, energy refills, lives, streaks, timers that punish, daily rewards or leaderboards.

## 4 · The loop (one adventure, ~6–9 minutes)

| # | Step | What the teacher does | Principle it serves |
|---|---|---|---|
| 1 | **Watch** | 2–3 captioned shots over the classroom scene; student speech bubbles. Skippable after first play. | Curiosity |
| 2 | **Decide** | Tap-based simulation. Students/objects pulse when they need her; she picks the order. Each choice costs lesson minutes (40-minute lesson) and moves each student's *understanding* and *engagement*. | Ownership |
| 3 | **Discover** | A choice that uses an Alef resource reveals its card: stage (Launch · Facilitate & Synthesise · Extend & Assess), what it does, "Try it Monday". | Practical value |
| 4 | **Challenge** | Outcomes open follow-ups: *new classroom event* or *unexpected challenge*. Graph: needs-help / early-finisher / low-participation → support / practice / teams / game → follow-up. | Curiosity, consequence |
| 5 | **Community** (optional) | Topic page for the Alef Telegram community: 2 labelled example posts, "my move" pre-written from her path, copy / open community. Skip is one tap, never penalised. | Belonging, practical value |
| 6 | **Reward** | Exit ticket (where each student landed, in words), a named badge that says what she did well, her path, new toolkit cards, a notebook page. | Achievement |
| 7 | **Unlock** | The story moves on. Teaser depends on what happened ("Omar spoke up today. Tomorrow, the quiet table doesn't."). | Meaningful progression |

Rules that keep it honest:
- **No single right path.** Every adventure has ≥ 3 materially different endings; at least one "good" ending does not use every resource.
- **Consequences, not marks.** Poor choices play out in the story (Sara copies, the class drifts); the game never says "wrong".
- **Time is the only cost**, and it is lesson time inside the fiction. It is never a countdown on the teacher's real clock.

## 5 · Campus (hub) and HUD

**Campus:** one isometric portrait illustration with pinned places (school-life-sim style). One tap on a pin opens the place; no walking.

| Place | Opens | MVP |
|---|---|---|
| Grade 5 classroom (+ 1 other classroom for Adv. 3–4) | Adventures | Yes |
| Staff room | **Toolkit**: every resource discovered, grouped by stage, each with "Try it Monday" and a *Save* toggle; rest (see energy) | Yes |
| Library | **Notebook**: one page per finished adventure: path, where each student landed, badge, "what another teacher tried" (unexplored branch hint, no spoilers) | Yes |
| Community board | Alef Telegram community (placeholder page until Alef supplies the link) | Placeholder |
| Principal's office | Story beats, next adventure briefing | Yes (text + portrait) |
| Yard | Ambience; one optional moment | Art only |
| Settings (gear) | EN/AR, sound, **Coach mode** | Yes |

**HUD (no currencies):** teacher card (Ms. Mariam portrait, name, energy 0–3 as a mood, not a bar to refill); classes card (each class, one line in words: "Grade 5B — fractions, 2 still unsure"); toolkit count ("Toolkit · 6 found of 20"); school clock "Day 3 · Morning".

**Day rhythm:** morning / midday / afternoon. One lesson = one period. The clock advances **only when she plays**, never with real time: there is no "come back tomorrow", nothing expires, nothing is lost by not playing.

**Energy (product decision, MVP):** pacing and story only. After lessons Mariam is "tired" and the staff room is *suggested*; resting is one tap and is itself a moment (a colleague line, a toolkit tip). **Energy never blocks an adventure, is never bought, and never refills over real time.** If the pilot shows teachers read it as a stamina meter, it is cut (see risks).

## 6 · Retention mechanics that honour the principle

| Pull | Mechanic | Why it isn't points |
|---|---|---|
| **Curiosity** | Branch teasers ("Another teacher tried *See why* first — Sara's story went differently."); flag-dependent next-adventure teasers; unexplored-branch dots on the notebook page. | The reward is *finding out*, not a number. |
| **Ownership** | Her path is written back to her in words (notebook); "my move" post is her own; students she helped appear in later adventures remembering it (Sara in Adv. 3 if she reached enrichment). | Continuity of people she cares about. |
| **Achievement** | Named badges that describe a teaching move ("Misconception Hunter: you found the real mistake behind *I don't understand*"). One badge per adventure run, never cumulative counts. | Recognition of a specific practice, not a score. |
| **Meaningful progression** | Story moves through a school term (Adv. 1–4 = weeks 1–4); campus gains detail as she unlocks places; toolkit grows by stage, showing which stage she's thin in. | Progress = her teaching repertoire. |
| **Practical value** | "Try it Monday" save list in the staff room; shareable to Saved Messages/the community; the one-line takeaway at the end of each adventure. | Utility outside the game. |

Explicitly **not used**: streaks, daily login rewards, push nudges from the bot (MVP), countdowns, lives, XP bars, levels-as-numbers, leaderboards, "x% of teachers did better than you".

## 7 · What "reward" means without currencies

A reward is something that **tells her what she did, or gives her something she can use**. It is never something to spend or accumulate for its own sake.

1. **Exit ticket** — each student's state in words ("left able to do it, and could explain why").
2. **Badge** — named for the move, with a *why* line. Rule-based on flags/outcomes (`badges[]` in the contract).
3. **Toolkit cards** — Alef resources, by stage, with "Try it Monday".
4. **Notebook page** — her path and the students, kept.
5. **Story** — the next adventure and a teaser shaped by her choices.
6. **Place** — the campus opening up (library after Adv. 1, community board after Adv. 2).

Test for any new reward: *if it can be counted on a leaderboard, it is out.*

## 8 · MVP scope

| # | Item | Notes |
|---|---|---|
| 1 | Campus hub + HUD + settings | Portrait isometric art, 6 pins, RTL mirrored UI (art not mirrored). |
| 2 | **4 adventures**, Grade 5 | 1 Different Needs, Same Classroom (approved demo) · 2 The Quiet Table · 3 The Group That Copies · 4 Data Day. Each: 3–4 students, 1–2 objects, 4 scheduled events, 3+ follow-ups, 3+ badges, flag-dependent teaser. |
| 3 | Resource catalogue | ~16–20 resources across the 3 stages; every card `placeholder: true` until Alef confirms. |
| 4 | Staff-room toolkit | By stage; "Try it Monday" save; copy/share. |
| 5 | Library notebook | One page per completed adventure (latest run + "other paths you've seen"). |
| 6 | Community placeholder | Topic page, example posts labelled "example", copy "my move"; button disabled with "link coming from Alef" until supplied. |
| 7 | Coach mode | Existing DLIS game unchanged, behind Settings and `?mode=coach`; remembered choice. |
| 8 | Save + telemetry | Telegram CloudStorage (localStorage fallback, timeouts); teacher telemetry per `METRICS.md`. |
| 9 | EN/AR | Every string `{en, ar}`; Arabic authored in an Emirati school register; RTL. |
| 10 | Sound | Classroom bed + ~8 cues, mutable, off by default on first open? (decide in UI) |

## 9 · Out of scope (MVP)

Adventures 5–8 (Mixed Abilities, Visit Week, The Hard Topic, End of Term) · other grades and subject tracks · real Alef platform deep links or SSO · in-game posting to Telegram (we copy text; she posts) · bot push reminders · teacher-to-teacher comparison of any kind · voice-over · animated characters (stills + light motion only) · authoring tool for the content team · analytics dashboard (SQL views only) · a ranking board in teacher mode (and see §11 for Coach mode's).

## 10 · Risks

| Risk | Likelihood · Impact | Mitigation |
|---|---|---|
| **Alef feature claims are wrong or invented.** Demo "resources" (worked example, team roles, extension task…) are mostly *teaching strategies*, not named Alef features. Shipping a card that says "Alef does X" when it doesn't damages trust with teachers and Alef. | High · High | Every card `placeholder: true` and the UI says "placeholder" until Alef signs each one off. Release gate: zero placeholders in a teacher-facing build beyond the pilot. Content maps each card to a real Alef feature + stage, or reframes it honestly as "a move you can do with Alef lessons". |
| Feels like a training module, not a game | Med · High | Tap-in-scene interaction, consequences in story, short intros, art quality bar; playtest with 3 teachers before pilot. |
| Energy / day clock read as mobile-game stamina | Med · Med | Never blocks; never real-time; cut if 2 of 3 playtesters mention "waiting" or "energy". |
| Arabic reads as translation | Med · High | Native Emirati reviewer before pilot; Noura persona playtest in Arabic only. |
| iOS 12 / old Android webview breaks (blank page, CSS gaps) | Med · High | iOS 12 rules in `REVIEW_CHECKLIST.md`; demo currently uses `color-mix`, `aspect-ratio`, flex `gap`, `navigator.clipboard` — all must be replaced or polyfilled. |
| Coaches land in the teacher game | High at launch · Med | Default mode becomes teacher; DLIS bot link must carry `?mode=coach` before release. |
| Privacy: teachers are not Alef staff | Med · High | Minimal telemetry, no names in analytics views, one-line notice on first open; data owner confirmed by Alef (TQ). |
| Content volume (4 adventures × EN/AR × branching) | High · Med | Adventure 1 is done; adventures authored to a template (4 events, ≤ 14 outcomes); Arabic in parallel per adventure. |

## 11 · Dependencies on Alef

| # | Need | From | Needed by | Blocks |
|---|---|---|---|---|
| D1 | **Confirmed Alef feature list** — name, what it does, which lesson stage, teacher-facing wording EN/AR, and which grade/subjects it exists for | Alef product / TQ | Before content lock of Adv. 2 | Removing placeholders |
| D2 | **Alef Telegram teacher community link** (+ moderator, topic names, whether "share my move" is welcome) | Alef community / TQ | Before pilot | Community step going live |
| D3 | **Brand** — logo usage in-app, naming ("Alef Teachers Community"), colours/approval of Ms. Mariam as an Alef character | Alef brand | Before pilot | Store/bot listing, campus signage |
| D4 | Pilot cohort — 10–15 teachers, ≥ 4 Arabic-first, ≥ 3 schools, iPhone + Android mix | TQ / school implementation | Week −1 | Pilot |
| D5 | Data ownership + consent wording for teacher telemetry | Alef data/legal | Before pilot | Telemetry on |
| D6 | Native Emirati Arabic reviewer (school register) | TQ | Per adventure | Arabic sign-off |
| D7 | Decision: does Coach mode keep its ranking board (`005_profile_board.sql`, `BoardScreen`)? It contradicts the no-leaderboard principle the teacher game is built on. | Kandil | Before release | Consistency of the product story |

## 12 · Open questions for the client

1. Approve the four MVP adventures and subject: all Grade 5 Math, or Adv. 3–4 in Science / English / Arabic to show Alef breadth?
2. Ms. Mariam already appears in Coach mode as an English teacher Toki coaches. Same person (nice cross-mode continuity) or rename one?
3. Energy: keep as soft pacing (recommended for MVP) or cut entirely?
4. Retire the Coach-mode ranking board?
5. Who owns the confirmed feature list and turnaround time?
6. Pilot size, schools, and dates.
