# Toki's Coaching Quest — Product Brief v3

**Owner:** Product · **Status:** draft for team review · **Date:** 24 Nov 2026
**Verdict we are answering:** "It's very basic and easy." — Kandil, after playing the live build.

He is right. This brief says why, in terms the team can act on, and what we ship in the next two weeks, the next month, and after.

---

## 1 · Diagnosis — why it feels basic and easy

Seven findings, in order of damage. The problem is structural, not cosmetic.

| # | Finding | Evidence | Effect on the player |
|---|---|---|---|
| 1 | **The right answer is the long one.** In every classroom the correct option is the only sentence with a comma, a colon, or a "— starting with…" clause; the three distractors are short and often absurd. | L31 coaching: *"Shift the conversation from completion to what students understood, struggled with, and learned — starting with…"* vs *"Reward the fastest finishers."* L32 drift: *"Student screen brightness."* L34 reasoning: r2 is a 30-word thesis, r1/r3/r4 are 6 words. This holds across all 31 classrooms (1–5, 21–24, 31–34, 41–44, 51–54, 61–64, 71–74). | Full marks without reading the scenario. The game tests option length, not judgement. |
| 2 | **The hint is the answer.** Wrong once → the hint names the correct concept. | L1 drift hint: *"are students sharing opinions, or building an argument with evidence?"* when the correct option is "Thinking quality". L31: *"Which column measures learning?"* when the option is "Student learning evidence". | The second attempt is free; points buy nothing. |
| 3 | **One shape, 31 times.** Scene → 3 evidence taps → 4 options → 4 risks → 4 options → 4 options → reveal. World 7's diagnosis and the Final World break the mould; everything before them is identical. | `LevelScreen.tsx` drives 26 of 31 classrooms through the same six beats. | By World 4 they skim. |
| 4 | **The teacher is furniture.** The teacher never speaks, never reacts to the coaching move, never pushes back, has no history. The move is chosen and the game says "correct". | Every `chooseCoaching` ends the interaction; `reveal.howToRestore` narrates what Toki did off-screen. | The hardest part of real coaching — the conversation — is absent. That is the job these 18 people do. |
| 5 | **No consequence.** A wrong coaching move does not play out. Picking "Ban the AI" in L34 or "Lock the video" in L31 shakes and shows a hint. | No branching, no second visit, no teacher outcome. | Nothing at stake, nothing memorable. |
| 6 | **Evidence is decorative, not diagnostic.** All three hotspots must be tapped, each reveals one clue, all three point the same way. No red herring, nothing to weigh, nothing to miss. | L1: group table, board, teacher — all say "no reasoning". Only W7 plants healthy evidence. | Observation is a tap-tax, not the skill being trained. |
| 7 | **Nothing changes on return.** Replay a classroom and it is byte-identical; a completed world is a row of green cards. | `bestScores` only; no visit history, no new context. | No reason to come back once the 31 are done. |

The honest summary for the team: **we built a well-written quiz with a mascot.** The content is strong — scenarios are specific, reveals are instructive, the Arabic is in a coaching register. The *mechanics* don't make the player use any of it.

---

## 2 · The player, and what "better" means

Eighteen DLISs (instructional coaches) at Alef Education, UAE. Adults, bilingual, experts in the content, playing on a phone inside Telegram in gaps between school visits — five to ten minutes, often one-handed. They have done the real version of every scenario here.

"Better" for them is **professional challenge**: moments where two experienced coaches would disagree, where the evidence is mixed, where the teacher doesn't accept the first move. It is *not* arcade fun — faster, flashier, louder. The Level 5 content (the Gamification Mutation) is the game's own warning against that.

**Non-negotiables, unchanged:** no speed rewards; points never become currency; no public leaderboard (the admin view stays admin-only); calm-confidence register; every string ships in both languages; `prefers-reduced-motion` respected.

---

## 3 · Product pillars for v3

| Pillar | One-line test |
|---|---|
| **Judgement, not recognition** | Could a senior DLIS pick the wrong answer for a defensible reason? If no option tempts an expert, the classroom isn't finished. |
| **The teacher talks back** | Every coaching move gets a reply from the teacher, and at least one reply forces a second move. |
| **Evidence you can get wrong** | Each classroom carries at least one clue that points the wrong way, and the diagnosis is scored on what the player chose to weigh. |
| **A school that remembers** | Something the player did in a classroom is visible the next time they open that world. |

---

## 4 · Ranked backlog

### P0 — ship in two weeks (make it hard)

| # | Item | User story | Acceptance criteria | Proof in admin store | Size |
|---|---|---|---|---|---|
| P0-1 | **Distractor rewrite, all 31 classrooms** *(content agent)* | As a DLIS I want every option to be something a real coach might say, so the right answer isn't visible from its shape. | All four options within ±30% word count. Each distractor is a *plausible professional error* (over-coaching, symptom-fix, compliance move, leadership-pleasing move). Reasoning step: four thesis-length options. One senior DLIS rates ≥2 options "tempting" per step. | `v_toki_levels.avg_best_score` drops; first-try rate per level lands in the 40–70% band (needs P0-4). | L |
| P0-2 | **Hints become questions, not keys** | As a DLIS I want a wrong answer to send me back to the evidence, not hand me the concept. | No hint contains a noun from the correct option. Hints point at a specific clue ("re-read the board"). Evidence recap opens automatically on a wrong answer. | Second-attempt success rate falls below 80%. | S |
| P0-3 | **Coaching conversation, v1** *(game-designer agent)* | As a DLIS I want the teacher to respond to my move so I feel the consequence. | After `chooseCoaching`, a 2-turn exchange: teacher reply (per option, wrong ones included) → player picks a follow-up from 3 → outcome line. Wrong first move + good recovery scores partial; right first move + bad follow-up loses the badge. Engine change in `LevelScreen`; data in a new `conversation` block per level. Ship on World 1 (5 classrooms) first. | New `conversation_recovered` (bool) per level row; replay rate on World 1. | L |
| P0-4 | **Attempt telemetry** | As the TQ team I want to know which steps players miss, not just final scores. | Game sends per-step attempt counts with each completion; `toki_progress` gains `attempts jsonb`; `v_toki_levels` gains `first_try_rate`. No new UI. | This *is* the measurement layer for everything else. | S |
| P0-5 | **Mixed evidence in Worlds 1–6** *(content agent)* | As a DLIS I want at least one clue per classroom that argues against the drift, so observation is a judgement. | Every classroom: 4 hotspots, one healthy or ambiguous; the reveal names which clue was the trap. | First-try rate on `identifyDrift` falls into band. | M |

### P1 — next month (make it feel alive)

| # | Item | User story | Acceptance criteria | Proof | Size |
|---|---|---|---|---|---|
| P1-1 | **Soundscape** *(sound agent)* | As a player I want the room to sound like a room. | Per-world ambience bed (3 loops), teacher-voice stingers (no speech), evidence-tap foley, conversation turn cue, one world-complete motif. Synthesized or CC0; ≤400 KB total; respects mute; a wrong answer is never louder than a right one. | Mute-off rate from a new `sound_enabled` flag in the payload. | M |
| P1-2 | **Return visits** | As a DLIS I want to re-enter a classroom a week later and see what the teacher did with my coaching. | After a world is complete, each classroom offers a "second visit": a short follow-up scene whose state depends on the coaching move chosen (good move → improved; symptom-fix → drift back in a new form). Scored as separate level ids (`N*10+6..9`). | Rows with `level_id % 10 >= 6`; return within 7 days. | L |
| P1-3 | **Named teachers with history** | As a DLIS I want to coach a person, not a role. | Each world's four teachers get a name, one sentence of context, and a disposition (defensive / eager / overloaded / veteran) that shapes conversation replies. Arabic names where the school is Arabic-medium. | Qualitative: pilot interviews. | M |
| P1-4 | **Difficulty by world** | As a player I want World 6 to be harder than World 2, not just later. | Options 4→5 from World 4; evidence 3→5 hotspots with two traps from World 5; hints off by default from World 6 (opt-in). | First-try rate declines W1→W7 and stays in band. | M |

### P2 — later

| # | Item | Size |
|---|---|---|
| P2-1 | Peer mode: two DLISs get the same school, compare diagnoses privately, no ranking | L |
| P2-2 | Rive-animated Toki (idle, listen, react) replacing PNG swaps | M |
| P2-3 | Authoring sheet → `levels/*.ts` generator, so the pedagogy lead ships a world without a developer | M |
| P2-4 | Expansion worlds from the spec (AI mutations, leadership missions, data missions) on the v3 engine | L each |
| P2-5 | Nightly sync Supabase → CX db `data_schema.toki_*` for Power BI alongside other TQ data | S |

**Inputs expected from parallel agents:** game designer → conversation mechanic spec and difficulty curve (feeds P0-3, P1-4); sound → asset list and engine changes (P1-1); content → rewritten distractors, hints and mixed evidence for all 31 classrooms (P0-1, P0-2, P0-5). Product owns P0-4 and the launch plan.

---

## 5 · Success metrics (from `v_toki_admin` / `v_toki_levels`)

| Metric | Query | Target | Reading |
|---|---|---|---|
| **Difficulty** | per level, share of players with first-try on all steps (needs P0-4) | 40–70% per level; <40% too hard, >70% still guessable | The one number that answers "is it easy". |
| **Completion funnel** | `worlds_done` distribution across `v_toki_admin` | 80% finish W1 in week 1; 50% reach W4 by week 4 | Drop-off between worlds locates boring or broken content. |
| **Return** | players with `last_completion_at − first_completion_at` > 7 days | 60% of cohort | Near zero until P1-2 ships — that's the point of P1-2. |
| **Recovery** | `conversation_recovered` true after a wrong first move | 30–50% | The conversation is teaching, not punishing. |
| **Hot levels** | `v_toki_levels` ordered by `avg_best_score` asc | top 3 reviewed monthly | Where the pedagogy lead spends time. |

Never shown to players. Never ranked across people in any shared channel.

---

## 6 · Launch plan — 18 DLISs

**Week 0 (now):** pilot cohort of 3 — one senior, one new, one Arabic-first player. They play Worlds 1–3 on the current build with P0-2 and P0-4 in. Thirty-minute debrief each, one question: *"Which answer did you pick for a reason you'd defend?"* That sentence is our difficulty oracle.

**Week 2:** P0 ships. The pilot cohort replays World 1 with the conversation mechanic. Go/no-go for cohort rollout: first-try rate in band on ≥4 of 5 World 1 classrooms, and no pilot calls it "obvious".

**Week 3:** rollout to all 18 via the existing Telegram channel post. Message, both languages, three lines: *This is a judgement game, not a quiz. Expect to be wrong — the teacher will tell you. Nothing is timed and nobody sees your score but you and the TQ team.*

**Feedback loop:** one pinned message: "Tell us which classroom you disagreed with." Every disagreement becomes a content ticket for the pedagogy lead — a DLIS disagreeing with the "correct" answer is the best content review we can get.

**Monthly:** read the five metrics, pick the three hot levels, revise.

---

### The one thing

Everything in this brief reduces to one sentence: **the game must let an expert be wrong for a good reason.** Today it can't — the right answer is the long one, the hint is the key, and the teacher never argues. Fix the distractors and give the teacher a voice, and the same 31 classrooms become a different game.
