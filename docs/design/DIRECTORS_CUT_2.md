# Director's Cut 2 — the pilot build

*Game Director's notes, 25 Nov 2026. Written after playing the merged wave-2 + wave-3 build (every classroom with a conversation, reasoning before delivery, clue-pointing hints, people markers, beat strip, read-aloud, Arabic native-reader pass) start to finish in English and Arabic on a phone viewport, with the coach panel's review open beside me. Screenshots: `scratchpad/dir2/shots/` (en/ar-01…26).*

## Verdict: GO for the pilot — after three fixes

This is a different game from the one I reviewed yesterday. Yesterday I wrote "a well-written quiz with a mascot". Today a DLIS misses the drift in Level 1, the notebook opens on the clue she skipped, she justifies her move, says it to Ms. Mariam in the wrong register, and watches the door close — and the reveal tells her how it could have gone instead of pretending it went well. That loop is the vision. It is in all 31 classrooms, in both languages, and the admin store can now see where it breaks.

It is a pilot build, not a launch build. Three things must change before 18 people see it; they are small and all in the engine, not the content.

## What got better

| First cut said | Now |
|---|---|
| Drift step guessable; hint names the answer | Hints are questions pointing at one clue; the notebook opens on the first miss with the clue lit ("LOOK HERE"). L1 hint: *"What are the students at the group table actually doing with each other's ideas?"* — nothing to copy from. |
| Reasoning after the conversation | Reasoning → conversation → reveal. "Why is this the right move?" is now the last thing you say to yourself before you say it to a person. |
| "How to restore it" shown after a closed conversation | "How it could have gone" after unchanged/partial; "What happened next" carries the outcome. |
| Conversations in Worlds 1 and 7 only | 31 teachers, 4 stances, no duplicate situations. Worlds 4–6 teachers are harder to move, as asked. |
| Dots for evidence, dots for progress | Evidence markers are a teacher, a group, a board, a tablet, a ticket; the strip is eye → magnifier → gauge → bubble → bulb → conversation → door. Both read at a glance (shots en-05, en-11). |
| Arabic "reads like a transcript" | 183 strings changed by a native reader: teachers say طيّب and يعني, Toki stays clean, *engagement* ≠ *participation* is finally two words. The AR conversation (ar-12) sounds like a corridor. |
| No measurement | `attempts` per step and `outcome` per level in the save and in Supabase; `v_toki_levels.first_try_rate` / `restored_rate` exist and already hold rows. |
| Score chips on doors | A tick, and a lit teacher-and-student pair. Right. |

## What still breaks the vision

1. **Toki covers the heading on every choice beat.** The reaction Toki (the "Look again" / "Nice read" face) floats over the title — "Identi[Toki]e Drift", "File th[Toki]e Diagnosis" (shots en-07, en-18). It happens on the first miss of every room, in both languages, i.e. in the exact moment we want the player reading. *Engine, 20 minutes: anchor the reaction below the strip and push the heading down while it shows.* Must fix.
2. **The reveal celebrates a failed conversation.** After "Nothing changed · The teacher has stopped listening", the reveal opens with Toki laughing, arms up (en-13). The text is right; the face lies. *Engine: reveal Toki keyed to outcome — celebrating only for restored, thoughtful for partial/unchanged.* Must fix.
3. **Classroom reveals still show no total.** Five rows, no sum; bosses show one. A player who wants to know "how did I do" has to add. *Engine, 10 minutes.* Must fix.
4. The panel's six "co-correct" answers (54/73 whiteboard contradiction, 43 Butler, Boss 55 quota, 44 track, 52 cold-call, 85 Early Years) — being applied now by the content editor; the build is not pilot-ready until that branch merges. The whiteboard contradiction alone would cost us a senior DLIS's trust in minute twelve.
5. Toki overlaps the "The Master DLIS" label on the finished map (en-25). Cosmetic; art, after the pilot.
6. The ending still says nothing about *your* visit. Outcomes are now in the save, so "N of 31 teachers changed something after you spoke to them" is one line of work in `SchoolVisitScreen` plus passing `outcomes` from App. Not a pilot blocker; the first thing after.
7. `unlockedLevel` is still written on every save. Still dead. Still cut it.

Things I looked for and did not find: no page errors in either language across the whole game; no hint in Worlds 1 or 7 that contains the answer; no Arabic string that leaks the answer by length; no sound that fires on a streak; no number on the map or hub.

## The cut list — final for the pilot

**Panel's three cut/merge candidates:**

- **L2 "Activity Overload" → merge into 85 Early Years: NO.** World 1 is the tutorial world and "busy ≠ learning" is the foundational drift; the player must meet it in a single room with a single teacher (Mr. Yousef, eager, "cut it to three stations") before meeting it as one door among six in the final visit. Cutting World 1 to four rooms also weakens the arc the whole first world is built on. Instead, when teacher memory lands, the KG door in 85 should *remember* Yousef. Keep.
- **L41 (Latifa, KG praise) → merge into 42: YES, after the pilot.** Minor risk, worth-3, and 42 can carry the "well done ×23" clue as a second hotspot. Not before the pilot: merging changes level ids and saves, and the pilot build must be the one we measure. Keep for now; pull it the week after.
- **L32 (Shamma, Alef independence) → merge into 33: NOT YET — let the data decide.** The panel's objection is overlap with 31 and 33, not weakness. 32 is the only room where the drift is an *absence* (nobody is monitoring), which is a different skill from reading a dashboard. If its `first_try_rate` sits above 70% and the pilot DLISs rate it low, merge it; if it sits in band, it stays.

**Also cut / not building:** the title stars survive (they are now part of the depth loop, not twinkle); `unlockedLevel` goes; no peer view in any form; no classroom music; no auto-advance in read-aloud, ever.

**Keep exactly as is:** World 7's four rooms (the panel's four 5s), the three-part reveal, the stance chip on the teacher's name, the silence option in 72.

## Pilot protocol

**Who:** three DLISs — one senior (10+ years), one promoted this year, one Arabic-first who will play in Arabic. **Devices:** at least one iPhone and one Android, inside Telegram, not a browser. **Scope:** Worlds 1–3, then World 7 (unlock it for them with a seeded save or ask them to play through; the Academy is the difficulty ceiling and the most important read). Two sittings over four days; no coaching from us in between.

**Ask them (15-minute call each, after):**
1. Name one teacher from the game. (If they can't, the conversations aren't landing.)
2. Which classroom did you disagree with the "correct" answer on, and why? (This is the question that finds content bugs the panel missed.)
3. Did any teacher sound fake? Which line?
4. Arabic player only: did the teachers sound like teachers you know, or like a book?
5. Was there a moment you felt the game was unfair? A moment it was too easy?
6. Did you turn read-aloud on? Did it help or annoy?
7. Would you play World 4 if we sent the link?

**Read in Supabase (SQL Editor):** `select * from v_toki_levels order by level_id;`
- `first_try_rate` per classroom: **40–70% is the band.** Above 70 the room is guessable (candidates for a distractor rewrite); below 40 it is unfair or the hint is broken (check the hint first).
- `restored_rate`: the conversation's difficulty. Expect 50–80% in Worlds 1–3, lower in 7. Under 30% on a room means the `closes` option is too tempting or the teacher's stance is unreadable.
- `v_toki_admin`: who finished what; `last_completion_at` gaps show where someone stopped.

**Go / no-go for all 18:** go if all three finish World 1 and at least two finish World 3; no classroom under 25% first-try; nobody reports a blank screen or a frozen Observe on iPhone; the Arabic player names a teacher. Any one of those failing is a fix-and-re-pilot, not a launch.

## The two weeks after the pilot

Week 1 — read the data, fix what it says: distractor rewrites for rooms above 70%, hint repairs for rooms below 40%; the L41 merge; the personal ending line; `unlockedLevel` gone; the second Arabic reviewer over the 11 unsure lines.
Week 2 — the rest of the cohort: all 18 get the link with one instruction ("tell us which classroom you disagreed with"); teacher memory in the bosses (outcomes are saved now, so the boss scenes can name the teacher you moved); contradicting evidence from World 4; per-world scene art begins with the illustrator prompts already in `ART_DIRECTION.md`.

The question I asked yesterday still decides everything: *does this make the coach's judgement matter more?* Today, for the first time, the answer is yes.
