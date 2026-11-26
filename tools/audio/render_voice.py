"""Render voice clips for one language from tools/audio/out/script.json.

  python tools/audio/render_voice.py --lang en|ar --models DIR --out public/audio/voice [--force] [--limit N]

Incremental: a clip whose file already exists is kept (keys change when
text or slot changes). Orphans are removed. Writes <out>/<lang>/index.json
(the list of keys the game may play) and tools/audio/out/render-<lang>.json.
"""
import argparse, json, os, re, subprocess, sys, tempfile, time
import numpy as np
import soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('--lang', required=True)
ap.add_argument('--models', required=True)
ap.add_argument('--out', required=True)
ap.add_argument('--force', action='store_true')
ap.add_argument('--limit', type=int, default=0)
ap.add_argument('--tashkeel', default='auto', choices=['auto', 'on', 'off'])
a = ap.parse_args()

script = [c for c in json.load(open('tools/audio/out/script.json')) if c['lang'] == a.lang]
cast = json.load(open('tools/audio/cast.json'))
CAST, REPL = cast[a.lang], cast['replace'].get(a.lang, {})
outdir = os.path.join(a.out, a.lang)
os.makedirs(outdir, exist_ok=True)
if a.limit:
    script = script[: a.limit]

def prep(text):
    for k, v in REPL.items():
        text = re.sub(r'\b%s\b' % re.escape(k), v, text)
    if a.lang == 'ar':
        from num2words import num2words
        text = text.translate(str.maketrans('٠١٢٣٤٥٦٧٨٩', '0123456789'))
        text = re.sub(r'(\d+)\s*%', lambda m: num2words(int(m.group(1)), lang='ar') + ' بالمئة', text)
        text = re.sub(r'\d+', lambda m: num2words(int(m.group(0)), lang='ar'), text)
        text = text.replace('«', '"').replace('»', '"')
    return text

# ---------- engines ----------
if a.lang == 'en':
    from kokoro_onnx import Kokoro
    kok = Kokoro(os.path.join(a.models, 'kokoro-v1.0.onnx'), os.path.join(a.models, 'voices-v1.0.bin'))
    def synth(text, spec):
        lang = 'en-gb' if spec['voice'].startswith('b') else 'en-us'
        samples, sr = kok.create(text, voice=spec['voice'], speed=spec.get('speed', 1.0), lang=lang)
        return np.asarray(samples, dtype=np.float32), sr
else:
    from piper import PiperVoice
    from piper.config import SynthesisConfig
    VOICES = {
        'emirati': PiperVoice.load(os.path.join(a.models, 'arabic-emirati-female-model.onnx')),
        'kareem': PiperVoice.load(os.path.join(a.models, 'ar_JO-kareem-medium.onnx')),
    }
    _tash = None
    def tashkeel(t):
        """Add short vowels (CATT encoder-decoder, Apache-2.0) sentence by
        sentence; the model is trained on sentence-length input."""
        global _tash
        if _tash is None:
            from catt_tashkeel import CATTEncoderDecoder
            _tash = CATTEncoderDecoder()
        parts = re.split(r'([.!?؟،,:;"]\s*)', t)
        texts = [p for p in parts[::2]]
        seps = parts[1::2] + ['']
        done = _tash.do_tashkeel_batch([x if x.strip() else x for x in texts], verbose=False)
        return ''.join((d if x.strip() else x) + sp for d, x, sp in zip(done, texts, seps))
    TASH = {}  # per voice: decided by A/B below when --tashkeel auto
    def synth(text, spec):
        v = VOICES[spec['voice']]
        use = TASH.get(spec['voice'], a.tashkeel == 'on')
        if use:
            text = tashkeel(text)
        cfg = SynthesisConfig(length_scale=1.0 / spec.get('speed', 1.0), noise_scale=0.6, noise_w_scale=0.8)
        chunks = list(v.synthesize(text, syn_config=cfg))
        audio = np.concatenate([c.audio_float_array for c in chunks]) if chunks else np.zeros(1, np.float32)
        return audio.astype(np.float32), v.config.sample_rate

def post(audio, sr, spec, path):
    """pitch shift (formant-naive, small), trim, pad, loudness, encode mp3."""
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, 'a.wav')
        sf.write(wav, audio, sr)
        pitch = float(spec.get('pitch', 0))
        filt = []
        if abs(pitch) > 0.01:
            f = 2 ** (pitch / 12)
            filt += [f'asetrate={int(sr * f)}', f'aresample={sr}', f'atempo={1 / f:.5f}']
        filt += ['silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05',
                 'areverse', 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.12', 'areverse',
                 'adelay=60', 'apad=pad_dur=0.25', 'loudnorm=I=-18:TP=-2:LRA=9', 'aresample=24000']
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-af', ','.join(filt), '-ac', '1', '-ar', '24000',
                        '-codec:a', 'libmp3lame', '-b:a', '40k', path], check=True)

# ---------- Arabic: decide tashkeel per voice by ASR round trip ----------
def asr_model():
    from faster_whisper import WhisperModel
    return WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=os.cpu_count())

AR_STRIP = re.compile(r'[ؗ-ًؚ-ْٰـ"«»،؛؟.,!?:;()\-]')
def norm_ar(s):
    s = AR_STRIP.sub(' ', s)
    s = re.sub('[إأآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')
    return re.sub(r'\s+', ' ', s).strip()
def norm_en(s):
    return re.sub(r'\s+', ' ', re.sub(r"[^a-z0-9' ]", ' ', s.lower())).strip()

def err(ref, hyp):
    import jiwer
    if a.lang == 'ar':
        r, h = norm_ar(ref), norm_ar(hyp)
        return jiwer.cer(r, h) if r else 0.0
    r, h = norm_en(ref), norm_en(hyp)
    return jiwer.wer(r, h) if r else 0.0

asr = asr_model()
def transcribe(path):
    segs, _ = asr.transcribe(path, language=a.lang, beam_size=1, vad_filter=False)
    return ' '.join(s.text for s in segs).strip()

if a.lang == 'ar' and a.tashkeel == 'auto':
    sample = [c for c in script if len(c['text']) > 40][:12]
    for vname in VOICES:
        spec = {'voice': vname, 'speed': 1.0}
        scores = {}
        for use in (False, True):
            TASH[vname] = use
            e = []
            with tempfile.TemporaryDirectory() as d:
                for c in sample:
                    p = os.path.join(d, c['key'] + '.mp3')
                    au, sr = synth(prep(c['text']), spec); post(au, sr, spec, p)
                    e.append(err(c['text'], transcribe(p)))
            scores[use] = float(np.mean(e))
        TASH[vname] = scores[True] < scores[False] - 0.02
        print(f'[tashkeel A/B] {vname}: off={scores[False]:.3f} on={scores[True]:.3f} -> {"on" if TASH[vname] else "off"}', flush=True)

# ---------- render ----------
report, t0, done = [], time.time(), 0
for i, c in enumerate(script):
    path = os.path.join(outdir, c['key'] + '.mp3')
    spec = CAST[c['slot']]
    if not a.force and os.path.exists(path):
        continue
    au, sr = synth(prep(c['text']), spec)
    post(au, sr, spec, path)
    done += 1
    if done % 25 == 0:
        print(f'  {done} rendered ({i + 1}/{len(script)}) {time.time() - t0:.0f}s', flush=True)

# ---------- QA: every clip, listened back ----------
for c in script:
    path = os.path.join(outdir, c['key'] + '.mp3')
    hyp = transcribe(path)
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                               capture_output=True, text=True).stdout or 0)
    report.append({'key': c['key'], 'slot': c['slot'], 'where': c['where'], 'err': round(err(c['text'], hyp), 3),
                   'dur': round(dur, 2), 'cps': round(len(c['text']) / max(dur, 0.1), 1), 'ref': c['text'], 'hyp': hyp})

LIMIT = 0.5 if a.lang == 'en' else 0.6   # beyond this a clip is dropped; the device voice reads that line
keep = [r['key'] for r in report if r['err'] <= LIMIT]
want = {c['key'] for c in script}
for f in os.listdir(outdir):
    k = f[:-4]
    if f.endswith('.mp3') and (k not in want) and not a.limit:
        os.remove(os.path.join(outdir, f))
json.dump(sorted(keep), open(os.path.join(outdir, 'index.json'), 'w'))
json.dump({'tashkeel': TASH if a.lang == 'ar' else None, 'clips': report}, open(f'tools/audio/out/render-{a.lang}.json', 'w'), ensure_ascii=False, indent=1)
errs = np.array([r['err'] for r in report])
print(f'[{a.lang}] clips={len(report)} rendered_now={done} mean_err={errs.mean():.3f} median={np.median(errs):.3f} '
      f'p90={np.percentile(errs, 90):.3f} dropped={len(report) - len(keep)} total_sec={sum(r["dur"] for r in report):.0f}')
for r in sorted(report, key=lambda r: -r['err'])[:15]:
    print(f"  worst {r['err']:.2f} {r['slot']:<11} {r['where'][0]:<5} REF: {r['ref'][:90]}\n{'':30}HYP: {r['hyp'][:90]}")
