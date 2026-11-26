# Release review checklist — Ms. Mariam's School

**Owner:** Product · Every release candidate (pilot and later) is ticked against this list on the release commit. A row is **pass**, **fail** or **waived (client, in writing)**. Any fail in a ★ row blocks release.

Release: `______` · Commit: `______` · Reviewer: `______` · Date: `______`

## 1 · The principle (no-currency rule) ★

- [ ] ★ No points, coins, XP, gems, stars-as-totals, levels-as-numbers or score anywhere in teacher mode (HUD, end screen, notebook, share text).
- [ ] ★ No leaderboard, rank, percentile, "better than x% of teachers", or comparison with other players.
- [ ] ★ No streaks, daily rewards, login calendars, countdowns on the real clock, lives, or expiring content.
- [ ] ★ Energy never blocks an adventure, never refills on a real-time timer, cannot be bought or earned.
- [ ] ★ The day clock advances only on play.
- [ ] ★ Every reward is one of: exit ticket, named badge with a *why*, toolkit card, notebook page, story/teaser, campus place.
- [ ] Badges name a teaching move; none is awarded for volume ("played 5 times").
- [ ] Skipping the community step changes nothing downstream.
- [ ] Toolkit shows undiscovered cards as "found in …", not as a completion percentage.

## 2 · Pedagogy

- [ ] ★ Every Alef resource card is either confirmed by Alef (`placeholder` absent, `confirmedBy` set) or visibly marked "Placeholder — to be confirmed by Alef". Pilot builds may carry placeholders; **public builds carry none.**
- [ ] ★ No card claims a feature Alef does not have, or a capability for a grade/subject where it isn't available.
- [ ] Each resource sits in the right stage (Launch · Facilitate & Synthesise · Extend & Assess) per Alef's storyboard.
- [ ] Each adventure has ≥ 3 materially different endings; ≥ 1 "good" ending does not use every resource.
- [ ] Poor choices play out as consequences in the story; the game never says "wrong", "incorrect" or "fail".
- [ ] A UAE Grade 5 teacher (not the author) confirmed each adventure is realistic (logged in `docs/content/`).
- [ ] "Try it Monday" lines are concrete, doable in one real lesson, and need nothing outside Alef + a normal classroom.
- [ ] Community example posts are labelled "example" and never presented as real teachers.
- [ ] Student characters: fictional names, respectful, no student shamed by the outcome text.

## 3 · UX

- [ ] First open → first decision in a classroom in ≤ 60 s for a new player.
- [ ] Intro skippable from the second play.
- [ ] Every screen has one obvious next action; no dead ends (branch-coverage script passes, BACKLOG E11-2).
- [ ] Locked places say why in story terms.
- [ ] Leave mid-lesson is two-tap and loses nothing on the campus.
- [ ] Tap targets ≥ 44 × 44 px; pins stay on their art at 320–440 px widths.
- [ ] Toasts never cover the action they refer to; ≤ 3 s.
- [ ] Hub/door/scene transitions ≤ 1.4 s total (playtest finding #6); no double-tap side effects.
- [ ] Copy actions work on iOS 12 (fallback: text selected + "Copy it from the menu").

## 4 · Bilingual ★

- [ ] ★ No string ships in one language only (dev check: every `Text` has non-empty `en` and `ar`).
- [ ] ★ `dir="rtl"` in Arabic; layout uses logical properties; chevrons/arrows mirrored; campus and scene art **not** mirrored; pins still on target.
- [ ] Minutes, clock, counts wrapped in `<bdi>`; one numeral system per locale (per E8-4 decision).
- [ ] Arabic signed off by a native Emirati reviewer for this release's content.
- [ ] Teacher addressed in the feminine where Ms. Mariam / the player is addressed.
- [ ] Arabic fonts load only when Arabic is on; no tofu boxes on iOS 12.
- [ ] Language choice persists; switching mid-adventure keeps state.

## 5 · Telegram and platform ★

- [ ] ★ Telegram BackButton and Android hardware Back go to the parent screen; never `about:blank`, never closes the app from inside an adventure.
- [ ] ★ Coach mode reachable from Settings and `?mode=coach`; DLIS bot link updated to `?mode=coach`; coach saves intact.
- [ ] `Telegram.WebApp.ready()` and `expand()` called; theme/viewport changes handled; safe-area insets respected (notch, home bar).
- [ ] CloudStorage calls wrapped in timeouts; localStorage fallback; corrupt save → fresh start, no crash.
- [ ] Community link uses `openTelegramLink` (stays in Telegram); inert with a clear label until the link exists.
- [ ] `?v=` bumped on the BotFather URL for the release (Telegram caching).

## 6 · iOS 12 / old WebKit ★

- [ ] ★ Plays end to end on a real iOS 12 device in Telegram (e.g. iPhone 6s / SE 1st gen) in EN and AR.
- [ ] `@vitejs/plugin-legacy` target `ios >= 12` still in place; no `crossorigin` on script tags.
- [ ] No `color-mix()` (Safari < 16.2) — the approved demo uses it; must be replaced.
- [ ] No flexbox `gap` without fallback (Safari < 14.1) — use margins or grid `gap` (grid gap is OK from 12).
- [ ] No CSS `aspect-ratio` without padding-box fallback (Safari < 15) — scene and campus frames.
- [ ] No `inset:` shorthand (Safari < 14.1), `:focus-visible` relied on for function (< 15.4), `text-wrap`, `:has()`, container queries, `dvh` units, CSS nesting.
- [ ] No `navigator.clipboard` without fallback (iOS < 13.4); no `structuredClone`, `Array.prototype.at`, `Object.hasOwn` unless polyfilled.
- [ ] WebP has JPG fallback (iOS < 14).

## 7 · Accessibility

- [ ] Every tappable student/object is a `<button>` with an accessible name ("Sara: needs you").
- [ ] State is never colour-only: student bands also in words on the exit ticket; event kind has a text chip; outcome tone has a title.
- [ ] Text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 18 px bold) in the shipped theme; pulse rings ≥ 3:1 against the scene.
- [ ] `prefers-reduced-motion`: no pulses, pops or medal animation; state still shown statically.
- [ ] Usable at 200% text zoom (Telegram font size large) without clipped buttons.
- [ ] Focus order follows the visual order; focus visible.
- [ ] Sound is never the only signal; mute persists.
- [ ] Captions on every narrated/intro moment (all are text today; keep it so).

## 8 · Performance budget ★

Measured on a 4-year-old Android (e.g. Samsung A10/A12 class) on throttled 4G, Telegram webview, cold cache.

| Budget | Limit |
|---|---|
| ★ Time to first campus render | ≤ 3.0 s |
| ★ Teacher entry JS (modern, gzip) | ≤ 180 KB; Coach mode code **not** in the teacher entry chunk |
| Legacy bundle (gzip) | ≤ 260 KB |
| Campus image | ≤ 300 KB |
| Each scene image | ≤ 200 KB; next scene preloaded |
| Fonts on first paint | Latin only unless Arabic selected |
| Audio | ≤ 300 KB total or synthesized; loaded after first interaction |
| Tap → visual response | ≤ 100 ms |
| Memory | No growth over 4 adventures played back to back (no leaked timers/listeners) |
| Telemetry | Never on the critical path; offline play works |

## 9 · Data and privacy

- [ ] First-open notice shown before any telemetry is sent; wording approved by Alef.
- [ ] Payloads match `METRICS.md`; no score, no free text, no names in teacher views.
- [ ] New tables/views: RLS on, no `anon`/`authenticated` grants (checked with a query, not by reading the SQL).
- [ ] Ranking board (`v_toki_board`) does not read teacher data.

## 10 · Sign-off

| Role | Name | Pass / waived | Date |
|---|---|---|---|
| Product | | | |
| Content / pedagogy | | | |
| Arabic | | | |
| Engine | | | |
| UI | | | |
| QA (device matrix) | | | |
| Client (Alef) | | | |
