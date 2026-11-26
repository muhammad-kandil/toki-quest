# Backlog — Ms. Mariam's School

**Owner:** Product · **Date:** 26 Nov 2026 · Companion to `PRD.md`.

**Priority:** P0 = MVP must · P1 = MVP should (cut only with client sign-off) · P2 = after pilot.
**Size:** S ≤ 1 day · M 2–4 days · L ≥ 1 week (one owner).
**Owner roles:** content · engine · UI · art · sound · Arabic · QA · product.
**MVP** = every P0 and P1 row.

Global acceptance for every story (not repeated below): every player-facing string is `{en, ar}`; works in RTL; no currency, score, count-to-beat or ranking appears; honours `prefers-reduced-motion`; passes `REVIEW_CHECKLIST.md` on iOS 12 + Android Telegram.

---

## Contract change requests (for the director, before engine work starts)

`src/teacher/types.ts` is owned by the director. These fields are needed by stories below and by `METRICS.md`:

| # | Change | Needed by |
|---|---|---|
| CR-1 | `TeacherSave.saved: string[]` — resource ids the teacher marked "Try it Monday" | E4-3, metrics |
| CR-2 | `TeacherSave.runs: Record<adventureId, number>` — finished runs per adventure | E7-4, replay metric |
| CR-3 | `TeacherSave.seenOutcomes: Record<adventureId, string[]>` — union of outcome ids ever reached, so the notebook can show unexplored branches | E5-2 |
| CR-4 | `TeacherSave.lang`, `TeacherSave.mode: 'teacher' | 'coach'` (or keep in the shared app settings) | E0-1, E8 |
| CR-5 | `Adventure.takeaway: Text` — one-line "what this lesson was about" for the notebook and the share post | E5-1, E6-2 |
| CR-6 | `AlefResource.confirmedBy?: string; confirmedAt?: string` — audit trail when Alef signs off a card | E4-4 |

---

## E0 · Foundation and modes — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E0-1 | As a teacher, I open the bot and land in Ms. Mariam's School; as a coach, my link still opens the coach game. | Default → `TeacherApp`; `?mode=coach` or saved choice → old `App`. Settings shows "Coach mode" switch; choice persists across reloads. DLIS bot URL updated with `?mode=coach` before release (product + QA verify). Coach saves (`toki:save`) untouched. | S | engine | P0 |
| E0-2 | As a teacher, my progress survives closing Telegram and changing phones. | Save key `toki:teacher` in CloudStorage, localStorage fallback, every call under a timeout (iOS hangs). Corrupt/unknown-version save → fresh start, never a crash. `version` field migrates forward. | M | engine | P0 |
| E0-3 | As a teacher, Back never throws me out of the app. | Telegram BackButton + hardware/browser Back go to the parent screen (adventure → campus → nothing). In an adventure, Back asks "Leave the lesson? Your progress in this lesson is lost" (two-tap). BackButton hidden on campus. | S | engine | P0 |
| E0-4 | As a teacher on a slow phone, the app opens fast. | Meets the performance budget in `REVIEW_CHECKLIST.md`; adventures lazy-loaded; scene images preloaded one step ahead. | M | engine | P0 |

## E1 · Campus and HUD — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E1-1 | As a teacher, I see a school campus I want to explore. | Portrait isometric `public/art/campus.jpg` (3:4, ≤ 300 KB, WebP + JPG fallback). 6 pins from `LOCATIONS`; tap targets ≥ 44 px; locked places show a lock and a one-line reason in story terms ("Opens after your first lesson"). | L | art | P0 |
| E1-2 | — | Pins rendered from data at % positions, stay on target from 320 px to 440 px width; label never clipped; RTL does **not** mirror the art, only UI chrome. | M | engine | P0 |
| E1-3 | As a teacher, the HUD tells me where I am in the story, not how many points I have. | Teacher card (portrait, name, energy as mood face 0–3); classes card (one line in words per class); toolkit "6 found"; clock "Day 3 · Morning". No numeric score anywhere. | M | UI | P0 |
| E1-4 | As a teacher, I know what to do next without a tutorial. | The next adventure's place pulses once per visit (not continuously); first open shows one caption from the principal. | S | UI | P0 |
| E1-5 | As a teacher, I'm never blocked by energy. | Energy drops 1 per lesson, min 0; at 0 the staff room is suggested but the classroom still opens. Resting = 1 tap + a colleague line. No real-time refill, no timer. | S | engine | P0 |
| E1-6 | As a teacher, the day moves with my lessons. | Period advances on lesson finish; after afternoon → next day morning. Never advances on real time. | S | engine | P0 |
| E1-7 | Principal's office shows story beats and briefings. | One portrait + 2–4 caption lines per adventure; replays the last beat on tap. | S | content | P1 |
| E1-8 | Yard optional moment | One short ambient moment (colleague, student) with no reward attached. | S | content | P2 |

## E2 · Classroom simulation engine — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E2-1 | As a teacher, I watch the lesson start. | Intro captions + `introBubbles` over a dimmed scene; Next per caption; **Skip intro** visible from the second play. | S | engine | P0 |
| E2-2 | As a teacher, students who need me pulse, and I choose the order. | Events open from `schedule` at lesson minutes; flagged student/object pulses with "!"; panel lists who needs her; tapping any flagged target opens its event; tapping an unflagged student shows `idle` or `peek` (sets flag). | L | engine | P0 |
| E2-3 | As a teacher, my choice costs lesson time and changes students. | Each choice adds `minutes`; `effects` clamp 0–3 per axis; student ring colour reflects state; `outcome` with `ifFlag` list resolves first-match; result panel shows tone colour + title + body. | M | engine | P0 |
| E2-4 | As a teacher, consequences open new moments. | `Outcome.next` queues a follow-up at now + `after`; "This choice opens a new moment later" shown; when nothing is live, "Let the lesson run" jumps to the next scheduled minute. | M | engine | P0 |
| E2-5 | As a teacher, the bell rings and I see where everyone landed. | At `lessonMinutes` or empty queue: exit ticket per student in words (3 bands), list of moments not reached before the bell, path chips. | M | engine | P0 |
| E2-6 | Engine validates content at build/dev time. | Dev-only check: every `outcome`, `next.event`, `resource`, `unlocks`, badge flag resolves; every adventure has ≥ 3 distinct terminal paths; fails loudly in dev. | S | engine | P0 |
| E2-7 | Leaving mid-lesson | Two-tap leave; lesson state discarded; campus state unchanged (energy not spent). | S | engine | P0 |

## E3 · Adventures (content) — P0

Template per adventure: 3–4 students, 1–2 objects, 4 scheduled events (cover needs-help, early-finisher, low-participation, unexpected), ≥ 3 follow-ups, ≤ 16 outcomes, 2–3 resources, ≥ 3 badges (one `always`), flag-dependent teaser, community topic + 2 example posts.

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E3-1 | Adv. 1 — Different Needs, Same Classroom | Ported from the approved demo into `Adventure` data with no behaviour change; Sara's three branches intact (Support → ready → enrichment; See why → misconception → targeted practice; Move on → persists → intervention). | M | content | P0 |
| E3-2 | Adv. 2 — The Quiet Table | Low participation is the spine; teaser from Adv. 1 honoured (Omar flag). Template met. | L | content | P0 |
| E3-3 | Adv. 3 — The Group That Copies | Peer-help vs answer-giving; Sara returns if she reached enrichment in Adv. 1 (cross-adventure flag). | L | content | P0 |
| E3-4 | Adv. 4 — Data Day | Extend & Assess stage: exit tickets → grouping → targeted practice; closes week 4 with a principal beat. | L | content | P0 |
| E3-5 | Every adventure has a defensible "imperfect but good" ending. | Pedagogy review: at least one path that skips a resource still earns a positive badge. | S | content | P0 |
| E3-6 | Pedagogy sign-off | A UAE Grade 5 teacher (not the author) plays each adventure and confirms the classroom is realistic; notes logged in `docs/content/`. | S | QA | P0 |

## E4 · Alef resources and staff-room toolkit — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E4-1 | As a teacher, I discover an Alef resource at the moment it helps. | First use of a resource in a run shows its card inline (stage colour, icon glyph, title, what, Try it Monday) + a toast; card added to toolkit. Rediscovery in replay: no card, small "already in your toolkit". | M | engine | P0 |
| E4-2 | As a teacher, I browse my toolkit by lesson stage. | Staff room lists found resources grouped Launch / Facilitate & Synthesise / Extend & Assess; undiscovered shown as silhouettes with the adventure that holds them ("Found in The Quiet Table"), not as a "collect them all" counter. | M | UI | P0 |
| E4-3 | As a teacher, I save the ones I'll try on Monday. | "Try it Monday" toggle per card (CR-1); "My Monday list" at top; Copy list (clipboard with iOS 12 fallback: select-text). | S | engine | P0 |
| E4-4 | Placeholders are visible until Alef confirms. | Any `placeholder: true` card shows a small "Placeholder — to be confirmed by Alef" line; build log lists count of placeholders; release gate in checklist. | S | engine | P0 |
| E4-5 | Catalogue of 16–20 resources mapped to confirmed Alef features | Each card: real feature name or honest framing; stage; grade fit; EN/AR. Signed off by Alef (D1). | M | content | P0 |
| E4-6 | Rest in the staff room | Rest restores energy to 3, advances period, shows one colleague line (rotating, story-aware). | S | content | P1 |

## E5 · Library notebook — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E5-1 | As a teacher, I can see what happened in each lesson I taught. | One page per completed adventure: title, date in-story ("Day 2"), takeaway (CR-5), path chips, each student's band in words, badge. | M | UI | P0 |
| E5-2 | As a teacher, I'm curious about paths I haven't taken. | Page shows "Other paths in this lesson: 2 not yet seen" as dots + one teaser line per unexplored follow-up kind, never the outcome text (CR-3). "Replay" button. | S | engine | P1 |
| E5-3 | Notebook keeps the best-for-students run, not the latest | Decision: show latest run; earlier runs collapsed as "Earlier: …". (Product call: latest = honest.) | S | engine | P1 |

## E6 · Community — P0 (placeholder) / P1 (live)

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E6-1 | As a teacher, I see what other teachers do about this moment. | Topic page with 2 example posts, each labelled "example"; never presented as real teachers. | S | content | P0 |
| E6-2 | As a teacher, I can share my move in one tap. | Pre-written post from her first decision + first resource + takeaway, editable; Copy (clipboard fallback); never auto-posts. | S | engine | P0 |
| E6-3 | Community link opens inside Telegram. | When `COMMUNITY_URL` is set: `Telegram.WebApp.openTelegramLink(t.me/…)`; until then the button reads "Community link coming from Alef" and is inert. Community board on campus opens the same page. | S | engine | P1 |
| E6-4 | Skipping is free. | "Skip for now" proceeds to Reward with no difference in rewards or story. | S | engine | P0 |

## E7 · Reward and unlock — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E7-1 | As a teacher, I'm recognised for a specific move. | First matching badge rule awarded; medal + name + why line; ≤ 2 s celebration, skippable, reduced-motion = static. | S | engine | P0 |
| E7-2 | Badge art | One glyph medal style, 12–16 badges, feminine Arabic forms where addressed to the teacher. | M | art | P1 |
| E7-3 | As a teacher, the story moves on because of what I did. | Teaser chosen by flag; next adventure unlocks (`unlocks`); campus place for it pulses on return. | S | engine | P0 |
| E7-4 | As a teacher, I can replay and get a different lesson. | Replay from end screen and notebook; replay never re-awards a badge already earned unless a *different* badge rule matches (then both kept); `runs` incremented (CR-2). | S | engine | P0 |
| E7-5 | Places open as the story moves | Library after Adv. 1, community board after Adv. 2 (or always visible, locked with a story reason). | S | content | P1 |

## E8 · Bilingual — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E8-1 | As an Arabic-first teacher, the whole game is in Arabic. | Language toggle on first open and in settings; `dir="rtl"` on root; logical CSS properties; mirrored chevrons; Latin numerals and minutes wrapped in `<bdi>`; one numeral system per locale (decision below). | M | UI | P0 |
| E8-2 | Arabic authored, not translated | All adventure, resource, badge, UI strings in an Emirati school register (Ms. → الأستاذة مريم; school day starts Monday per existing ruling); feminine address to the teacher where she is addressed. | L | Arabic | P0 |
| E8-3 | Native review | Native Emirati reviewer signs off each adventure; issues logged in `docs/content/ARABIC_REVIEW.md` style. | M | Arabic | P0 |
| E8-4 | Numerals decision | Product proposal: Western digits in both locales for clock and minutes (matches Alef platform UI); confirm with client. | S | product | P0 |

## E9 · Telemetry — P1

Spec in `METRICS.md`.

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E9-1 | As TQ, I can see whether teachers return and what they use. | Migration `006_teacher_telemetry.sql` (tables + views in `METRICS.md`); idempotent; RLS on; no anon grants. | M | engine | P1 |
| E9-2 | Client sends runs and events | `record-progress` accepts `teacher: {runs[], events[]}`; validated; batched; fire-and-forget with retry on next open; never blocks UI. | M | engine | P1 |
| E9-3 | First-open notice | One line: "Alef sees which lessons you play to improve the game. Not shared with your school." + link to details. Wording approved by Alef (D5). | S | product | P1 |
| E9-4 | Pilot readout | `docs/pilot/TEACHER_READOUT.md` with the queries and thresholds. | S | product | P1 |

## E10 · Art and sound — P0/P1

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E10-1 | Scene pictures, 4 adventures | Portrait 2:3, ≤ 200 KB each, students placed to match tap targets; UAE public-school uniforms and segregation consistent with `ART_BIBLE.md`. | L | art | P0 |
| E10-2 | Ms. Mariam portrait set | Neutral, thinking, pleased, tired (energy moods); consistent with Coach-mode Ms. Mariam if the client keeps continuity. | M | art | P0 |
| E10-3 | Classroom soundscape | One bed per room type + ~8 cues (pulse, choice, discovery, bell, badge); ≤ 300 KB or synthesized; mute persists; a "poor" outcome is never louder than a good one. | M | sound | P1 |

## E11 · QA and release — P0

| ID | Story | Acceptance criteria | Size | Owner | P |
|---|---|---|---|---|---|
| E11-1 | Device matrix pass | iPhone iOS 12 (e.g. iPhone 6s), iOS 17+, Android 9 low-end, Android 14; Telegram current; EN and AR; every adventure every branch once. | M | QA | P0 |
| E11-2 | Branch coverage script | Scripted (Playwright) traversal of every reachable path per adventure, both languages; asserts no dead end and exit ticket renders. | M | QA | P0 |
| E11-3 | Teacher playtest (3 teachers: new / experienced / Arabic-first) | Diaries + 20-min debrief; findings in `docs/pilot/`; go/no-go per `REVIEW_CHECKLIST.md`. | M | product | P0 |
| E11-4 | Release checklist signed | Every row of `REVIEW_CHECKLIST.md` ticked or waived by the client in writing. | S | product | P0 |

---

## P2 — after the pilot

| ID | Item | Size |
|---|---|---|
| P2-1 | Adventures 5–8 (Mixed Abilities, Visit Week, The Hard Topic, End of Term) | L each |
| P2-2 | Other grades/subjects as parallel "classrooms" on the campus | L |
| P2-3 | Return moments: students from earlier adventures carry state into later ones beyond one flag | M |
| P2-4 | Bot message when a *new* adventure ships (content news, not a nudge) — opt-in | S |
| P2-5 | Deep link from a toolkit card to the matching Alef platform page (needs Alef) | M |
| P2-6 | Authoring sheet → adventure data generator for the pedagogy team | M |
| P2-7 | Supabase → CX db sync for Power BI alongside other TQ data | S |
