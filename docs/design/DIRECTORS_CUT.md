# Director's Cut — Toki's Coaching Quest v3

*Game Director's notes to the team, 24 Nov 2026. Written after playing the merged build (PM brief + conversation mechanic + soundscape) start to finish in English and Arabic on a phone viewport.*

## The vision, in one paragraph

This is a **professional judgement trainer for instructional coaches, played inside Telegram in the five minutes between school visits**. It is not a quiz and it is not an arcade. Its identity is the stance its own Level 5 teaches: no timers, no streaks, points are never currency, nobody is ranked. The player is an expert; the game's job is to put them in front of situations where two experts would disagree, make them commit, and then let a human being react to what they said. Every feature we ship is measured against one question: *does this make the coach's judgement matter more, or just make the screen busier?* If the second, cut it.

## The first 60 seconds

By the end of World 1 Level 1 a DLIS must feel three things: **"this room is real"**, **"I could be wrong here"**, and **"the teacher is a person"**. Today's build delivers the first and the third; it still fails the second.

What works: Toki walking into the scene; three evidence taps that make you *look* before you judge; Ms. Mariam's first line ("Did you see them? Every single group was talking") — a real teacher, whose closing line ("Now it's that they speak wrong") stings exactly as it should. The "Toki's read" card is the best new idea in the build: you know who you are talking to before you open your mouth.

What fails: the drift step is still guessable — "Thinking quality" is the only option with a noun of substance against "Collaboration / Student engagement / Classroom management", and the hint after a miss *names* the answer. The second attempt is free, and the first impression is "I know this quiz". The conversation fixes the end of the level; the start needs the content pass landing for Worlds 2–6 extended to World 1's **drift and risk** options (the near-miss rewrite covered coaching and reasoning only).

One more first-60-seconds problem: after a *closed* conversation ("Nothing changed"), the reveal still shows **"How to restore it"** as if it happened, and the optional **"Why?" bonus asks why the move was right** — after the teacher just rejected it. The order is wrong. Reasoning should come *before* the conversation (you justify the move, then you deliver it), and the reveal heading after an unchanged outcome should read "How it could have gone".

## The experience arc

| World | Tension | What escalates | Tone |
|---|---|---|---|
| 1 | Looks great, isn't | first conversations; forgiving teachers | warm |
| 2–3 | Perfect routine, nobody reads the data; 100% completion | data that looks healthy; the tool as alibi | warm |
| 4–5 | Feedback never acted on; questions that check recall | **contradicting evidence** starts here; first *defensive* teacher | thoughtful |
| 6 | "Different" ≠ moved forward | boss where healthy scenes outnumber drifted ones | thoughtful |
| 7 | Nothing wrong — or three things | the right line is *silence* (72) or *one thing* (73) | serious |
| Final | The problem is upstream | prioritisation, not diagnosis | serious → quiet |

Bosses escalate correctly (one drift → a pattern → a pattern inside something perfect → a school). What they lack is **memory**: the teacher in a boss scene has no link to the teacher you coached three rooms ago. Mechanic 5 is cheap once outcomes are saved; it is what turns eight worlds into one school.

**Where the conversation belongs.** In every classroom from World 1 to World 7 — it *is* the game. Not in the pattern-audit bosses (the player is reading a school, not a person) and not in the Final World's six doors. The Final World should instead get the designer's "principal's question" — one unscored line that changes the ending's wording.

**The ending.** The final message is the right text (it is the spec's own words) and the slow line-by-line reveal earns it. What is missing is the player: the ending says nothing about *their* visit. One sentence keyed to the priority they chose and the number of teachers they actually moved ("Four of nine teachers changed something after you spoke to them") would make it theirs. Build it when outcomes are persisted.

## Consistency review

**Naming.** "DLIS" stays untranslated in Arabic (خبير DLIS) — correct, it is the job title. "Lethal Mutation / التحوّر القاتل" is used consistently across 31 rooms and the UI. World titles on the map, hub and reveal match. One slip: the badge gallery's subtitle still says "clean first-try run" only; badge rules now also require the teacher to change — fixed in this branch.

**Toki's voice.** Consistent and right: curious, collegial, never disappointed in the player. Two cases where Toki's *read* card pre-answers the turn: Level 72 ("The hardest conversation is the one where Toki has nothing to fix") and Level 71 ("…nobody asks"). The read should set the scene, not tip the line. Designer to trim.

**Teachers.** Nine named teachers, four stances, replies that sound like UAE classroom staff rather than villains — this is the strongest writing in the game. Keep the rule the designer set: the closing line in World 7 is the one a *confident* coach would say. It is the only place the game is genuinely hard today.

**Arabic register** (ten strings sampled across world3, world5boss, world8, conversations7, ui): Modern Standard Arabic, professional, terminology consistent (التغذية الراجعة، الانحراف، الغاية، الامتثال). Judgement: publishable, but **teacher dialogue in MSA reads like a transcript, not a corridor.** A native reviewer should decide whether the *teacher lines only* soften toward Gulf-inflected MSA; everything else stays as is. Arabic numerals (٩ من ٢٤) are used consistently — good.

**Scoring legibility.** The reveal's score card reads clearly, and the new Conversation row with its outcome label ("Nothing changed · +0") is the single most legible consequence in the game. Two problems: (1) the total is never shown on a classroom reveal (it is on bosses); (2) "Reasoning bonus (first try) +25" after a closed conversation looks absurd — see the ordering fix above.

**What the reveals teach.** The three-part reveal (what drifted / why / how to restore) is pedagogically the best screen we have and must survive every redesign. "What happened next" now sits between "why" and "how to restore"; after a *restored* outcome the two overlap. Merge: show "What happened next" with the outcome text, then "How to restore it" only when the outcome was partial or unchanged.

## The cut list

1. **Cut the "Why?" bonus step as a separate beat.** It is a fourth multiple-choice in a row and the long-option tell is worst here (every r2 is a thesis). Fold the best reasoning line into the conversation's first turn, where justifying the move to a person is the point. Saves a screen per classroom.
2. **Cut `unlockedLevel` from the save** — dead legacy field, still written on every save.
3. **Cut star/score chips on hub doors** ("★ 115"). The PM brief says done/not-done; showing a number invites comparison and is the one place the UI contradicts the Level 5 lesson. Keep "revisit to improve" as a quiet label.
4. **Cut the title-screen stars** once the art pass lands if they survive as decoration only. Calm, not twinkly.
5. **Do not build** peer mode (P2-1) in any form that shows another person's result. Even "private comparison" is a ranking with extra steps.
6. **Do not add** music inside classrooms, speech, or any cue on a per-tap streak. Sound got this right; hold the line.

## Build order — next two weeks

| # | Item | Owner | Depends on |
|---|---|---|---|
| 1 | Merge the content difficulty pass (Worlds 2–6) and extend the near-miss rule to World 1 **drift + risk** options | Content | — |
| 2 | Reorder beats: reasoning → conversation → reveal; "How it could have gone" after unchanged; total on classroom reveal | Designer | — |
| 3 | Hints become questions that point at a clue (PM P0-2); evidence recap auto-opens on a miss | Content + Designer | — |
| 4 | Persist conversation outcomes in the save and the admin payload (`outcomes[levelId]`, `attempts` per step) — the measurement layer | Lead (Kandil) | — |
| 5 | Author conversations for Worlds 2–6 (20 teachers) using the finalised moves from #1 | Designer + Content | 1 |
| 6 | Trim the two "read" cards that pre-answer (71, 72); drop the Toki's-read tell rule into the authoring guide | Designer | — |
| 7 | Art/polish pass lands (map, doors, scene parallax, materials) | Art | — |
| 8 | Pilot with three DLISs on the build at #5; difficulty read from `v_toki_levels` | Lead + Pedagogy | 4, 5 |
| 9 | Teacher memory in bosses (mechanic 5) and the Final World's personal ending line | Designer | 4 |
| 10 | Contradicting evidence from World 4 (mechanic 3) | Designer + Content | 1 |

Return visits (mechanic 4 / PM P1-2) wait until after the pilot — it is content-heavy and we should know first whether the conversation alone moves the return metric.

## Open risks and the pilot

- **The content pass may overshoot.** Near-miss distractors can make a level feel arbitrary ("both are right"). The guard is the reveal: if the reveal cannot say in one sentence why the near-miss was wrong *in this room*, the distractor is too close. Pedagogy lead reviews every rewritten option against its reveal.
- **MSA teacher dialogue** may read as stilted to Arabic-first DLISs. Pilot includes one Arabic-first player; ask them specifically about the teachers.
- **iOS Telegram** is where things break and the E2E can't see it. One pilot on iPhone, one on Android, start to Final World.
- **Register risk on Toki** (the research flagged it): an expert may find a mascot patronising. Watch for it in the debrief; the fallback is fewer Toki reactions, not a different Toki.

**Pilot design (week of the content merge):** three DLISs — one senior, one new, one Arabic-first — play Worlds 1–3 and 7. Thirty-minute debrief each, three questions: *Which answer did you pick for a reason you'd defend? Which teacher did you believe? Where did you feel the game was telling you what to say?* Measure in `v_toki_levels`: first-try rate per level (target 40–70%), and in `v_toki_admin`: worlds done after one week. Go/no-go for the 18: first-try in band on four of five World 1 rooms, no pilot calls any room "obvious", and nobody describes the conversation as a trick.

## Three decisions I'd defend hardest

1. **The conversation is the game.** Everything else — difficulty, art, sound — serves the moment a teacher answers back. Author it for all 31 rooms before any new world.
2. **Points stay invisible until the reveal, and never leave the reveal.** No chips on doors, no totals on the map. The Level 5 lesson is the brand.
3. **Reasoning before delivery.** You justify the move, then you say it to a person. The current order (deliver, then "why?") teaches the wrong habit.
