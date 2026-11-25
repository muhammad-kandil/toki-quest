# Read aloud — voice-over in English and Arabic

**What it is.** An opt-in toggle (speaking-face icon in the top bar, next to
the sound toggle) that reads the game's spoken parts with the device's own
speech engine (`window.speechSynthesis`). No audio files, no network, no
cost; it works in whichever language the player chose and switches voice
when the language toggles.

**Why this route.** The game ships as static files on GitHub Pages and runs
inside Telegram's iOS/Android webview. Recorded voice-over for ~900 lines in
two languages would be tens of megabytes and a studio budget; synthesis is
free and bilingual today, and a recorded pack can replace it line by line
later (see below).

## What is spoken, where

| Moment | Spoken | Speaker / pitch |
|---|---|---|
| A classroom opens (Observe) | the scenario paragraph | narrator · 1.0 |
| Conversation: each new teacher line | the teacher's bubble | teacher · 1.0 |
| Conversation: after the player picks | Toki's chosen line, then the teacher's reply (queued, never overlapping) | Toki · 1.12, teacher · 1.0 |
| Reveal (classroom and Academy) | the risk verdict + the first block ("What drifted" / the judgement) | narrator · 1.0 |
| Final World | the scenario on entry; the final coaching response and the closing lines in sequence | narrator · 1.0 |

Never spoken: option labels while the player is choosing (they are reading
them), hints, score rows, UI chrome. Nothing auto-advances; the player still
taps.

Rate 0.95 everywhere. Markdown marks, emoji and em dashes are stripped or
turned into pauses before speaking (`cleanForSpeech`).

## Rules

- **Off by default.** Preference in `localStorage` `toki:voice`. The global
  mute wins: muting the game silences voice too; the toggle shows as muted.
- **Hidden when it can't deliver.** The toggle renders only if the platform
  has a speech engine *and* a voice exists for the current language. Voice
  lists arrive late on some engines (`voiceschanged`), so availability is
  re-checked and the toggle appears when they do.
- **Voice choice.** Arabic: `ar-SA`, then `ar-AE`, `ar-EG`, then any `ar`.
  English: `en-GB`, then `en-US`, then any `en`. Local (on-device) voices
  are preferred over network ones. Re-picked on every utterance, so a
  language toggle is honoured immediately.
- **One voice at a time.** Every new line cancels whatever is speaking.
  Sequences (Toki's line + the teacher's reply; the Final World's closing
  lines) are one cancel followed by a queue — the engine plays them in
  order, never overlapping.
- **Leaving a screen stops the voice.** Each hooked beat cancels on unmount.
- **iOS gesture rule.** iOS refuses to speak until a user gesture has
  started the engine; the toggle tap itself speaks a silent utterance to
  warm it up.
- **Music ducks under speech.** `sfx.duck(seconds)` lowers the world bed
  for the estimated reading time; it fades back on its own.

## Limits (say these to the DLISs)

- Voice quality is the device's. iOS voices are good in both languages;
  Android depends on the installed TTS engine (Google TTS ships Arabic on
  most phones, but not all); Telegram Desktop on Windows/macOS may expose few
  or no voices — then the toggle simply doesn't appear.
- Arabic pronunciation of unvowelled text is engine-dependent; names and
  rare words can be misread. Diacritics in the data help where it matters.
- It reads the written register. Teacher lines are written to be spoken,
  but synthesis is flat: this is accessibility and convenience, not acting.

## Adding a recorded voice pack later

`voice.speak(text, lang, who)` is the only entry point. A recorded pack
slots in by keying audio per line — `{levelId}/{lineId}.{lang}.m4a` where
`lineId` is `scenario`, `t1.teacher`, `t1.opt.<id>`, `t1.reply.<id>`,
`reveal`, … — and having `speak()` play the clip when one exists, falling
back to synthesis otherwise. The call sites already pass enough context to
derive those ids; the data files need no change.

## Files

`src/audio/voice.ts` (engine, detection, cleaning), `src/audio/useVoice.ts`
(React hook), `src/components/TopBar.tsx` + `VoiceToggle.css` (toggle),
hooks in `LevelScreen.tsx`, `AcademyScreen.tsx`, `ConversationBeat.tsx`,
`SchoolVisitScreen.tsx`; `sfx.duck()` in `sfx.ts`. Test: `e2e/e2e_voice.py`
(stubs the engine, checks language, order, cancel-before-speak, the off
state, and the hidden-toggle cases).
