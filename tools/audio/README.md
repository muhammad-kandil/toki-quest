# Voices and room sound

Everything the game says aloud and every room recording is rendered
**offline** by `.github/workflows/audio.yml` and committed to
`public/audio/`. The game never calls a speech service at runtime.

## How a line gets a voice

1. `src/audio/lines.ts` defines what each screen says (scenario, reveal,
   both sides of every teacher conversation, boss intros, the Final World).
   Screens speak through it; the exporter reads the same builders.
2. `tools/audio/export-script.ts` writes every line × language with a key
   (`src/audio/voiceKey.ts`: hash of language + voice slot + exact text).
3. `render_voice.py` renders missing keys, then **listens back** to every
   clip with Whisper and scores it against the script. A clip that is
   badly wrong (EN WER > 50 %, AR CER > 60 %) is left out of `index.json`,
   so the device's own voice reads that line instead.
4. In the game, `src/audio/voice.ts` plays the clip if its key is in
   `index.json`; otherwise it falls back to the device voice. Edit a line
   and it simply reads plainer until the workflow runs again.

**Voices** (`cast.json`): English — Kokoro-82M (Apache-2.0): a narrator,
Toki, six female and six male teacher voices; each teacher always gets the
same voice (slot from their name, gender from Ms./Mr.). Arabic — Piper:
an Emirati female voice (MIT) and Kareem (male), with small pitch/pace
offsets per teacher slot; short vowels added by CATT (Apache-2.0) when the
listen-back test shows it helps.

Non-commercial models (MMS, F5-TTS Arabic, the `dii` voice, XTTS) are
deliberately not used. For studio-grade Emirati voices, the upgrade path is
Azure Speech (`ar-AE-FatimaNeural`, `ar-AE-HamdanNeural`) — add a renderer
and a key; nothing in the game changes.

## Room sound

`beds.json` describes each bed (what it should sound like, AudioSet labels
it should and should not score on). `ambience.py` searches Freesound for
**CC0** recordings, scores candidates with an AudioSet classifier, keeps the
best, and cuts a seamless loop. Which bed plays where is content:
`src/data/ambience.ts` (lesson vs. after-lesson conversation per room).
Credits: `public/audio/amb/credits.json`. Picks and runners-up:
`tools/audio/reports/ambience-report.md`.

## Running it

GitHub → Actions → *Render audio* → Run workflow.

| input | use |
|---|---|
| `voice` | `en,ar` (default), `en`, `ar`, `none` |
| `ambience` | `all`, `none`, or e.g. `class-lively,bell` |
| `redo` | regex — re-render clips whose text matches (e.g. `Ms\.`) |
| `force` | re-render every clip (after changing `cast.json`) |

The run commits the audio and redeploys the site. Reports land in
`tools/audio/reports/`.
