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
ap.add_argument('--engine', default='local', choices=['local', 'gemini'])
ap.add_argument('--budget-min', type=float, default=0, help='stop rendering after this many minutes (QA + index still written)')
ap.add_argument('--redo', default='', help='regex: re-render clips whose text matches')
ap.add_argument('--redo-slots', default='', help='comma list: re-render every clip of these voice slots')
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
        pat = (r'\b' + re.escape(k) + (r'\b' if k[-1].isalnum() else '')) if k[0].isalnum() else re.escape(k)
        text = re.sub(pat, v, text)
    if a.lang == 'ar':
        from num2words import num2words
        text = text.translate(str.maketrans('٠١٢٣٤٥٦٧٨٩', '0123456789'))
        text = re.sub(r'(\d+)\s*%', lambda m: num2words(int(m.group(1)), lang='ar') + ' بالمئة', text)
        text = re.sub(r'\d+', lambda m: num2words(int(m.group(0)), lang='ar'), text)
        text = text.replace('«', '"').replace('»', '"')
    return text

# ---------- engines ----------
if a.engine == 'gemini':
    import base64, urllib.request, urllib.error
    G = cast['gemini']
    KEY = os.environ.get('GEMINI_API_KEY', '')
    if not KEY:
        sys.exit('GEMINI_API_KEY is not set')
    API = 'https://generativelanguage.googleapis.com/v1beta'
    def api(path, body=None):
        req = urllib.request.Request(f'{API}/{path}', data=json.dumps(body).encode() if body else None,
                                     headers={'content-type': 'application/json', 'x-goog-api-key': KEY})
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read())
    names = [m['name'].split('/')[-1] for m in api('models?pageSize=200').get('models', [])]
    tts = [n for n in names if 'tts' in n]
    pref = os.environ.get('GEMINI_TTS_MODEL') or next((n for n in tts if 'pro' in n), None) or (tts[0] if tts else None)
    if not pref:
        sys.exit('no TTS model available to this key: ' + ', '.join(names[:30]))
    print('[gemini] TTS models:', tts, '-> using', pref, flush=True)
    MOODS = {}
    for c in script:
        MOODS[c['key']] = c
    def direction(clip):
        slot = clip['slot']
        who = 'teacher' if slot.startswith('teacher') else slot
        persona = G['persona'][who]
        bits = []
        for m in (clip.get('mood') or '').split(':'):
            if m and G['mood'].get(m):
                bits.append(G['mood'][m])
        mood = (' — ' + ', '.join(bits)) if bits else ''
        return (f"You are voicing {persona}{mood}. {G['language'][a.lang]} "
                f"Read ONLY the line between the markers, exactly as written, with no preamble.\n<<<\n{{text}}\n>>>")
    CURRENT = {}
    def synth(text, spec):
        clip = CURRENT['clip']
        prompt = direction(clip).replace('{text}', text)
        body = {'contents': [{'parts': [{'text': prompt}]}],
                'generationConfig': {'responseModalities': ['AUDIO'],
                                     'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': G['voices'][clip['slot']]}}}}}
        for attempt in range(8):
            try:
                r = api(f'models/{pref}:generateContent', body)
                part = r['candidates'][0]['content']['parts'][0]['inlineData']
                pcm = np.frombuffer(base64.b64decode(part['data']), dtype='<i2').astype(np.float32) / 32768.0
                rate = int(re.search(r'rate=(\d+)', part.get('mimeType', '')).group(1)) if 'rate=' in part.get('mimeType', '') else 24000
                return pcm, rate
            except urllib.error.HTTPError as e:
                msg = e.read().decode('utf-8', 'replace')[:400]
                if e.code == 429 and ('PerDay' in msg or 'per day' in msg.lower()):
                    raise SystemExit('[gemini] daily quota reached: ' + msg)
                wait = min(90, 5 * (2 ** attempt))
                m = re.search(r'retryDelay": "(\d+)s', msg)
                if m: wait = int(m.group(1)) + 1
                print(f'  [gemini] HTTP {e.code}, retry in {wait}s: {msg[:160]}', flush=True)
                time.sleep(wait)
            except (KeyError, IndexError) as e:
                print('  [gemini] no audio in response, retrying', flush=True); time.sleep(3)
        raise RuntimeError('gemini failed repeatedly')
elif a.lang == 'en':
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
if a.engine == 'gemini':
    a.tashkeel = 'off'   # Gemini reads undiacritised Arabic natively
def asr_model():
    from faster_whisper import WhisperModel
    return WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=os.cpu_count())

AR_STRIP = re.compile(r'[ؗ-ًؚ-ْٰـ"«»،؛؟.,!?:;()\-]')
def norm_ar(s):
    s = AR_STRIP.sub(' ', s)
    s = re.sub('[إأآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')
    return re.sub(r'\s+', ' ', s).strip()
NUM = None
def norm_en(s):
    global NUM
    s = s.replace('’', "'").replace('‘', "'")
    try:
        from num2words import num2words
        s = re.sub(r'\d+(\.\d+)?', lambda m: num2words(float(m.group(0)) if '.' in m.group(0) else int(m.group(0))), s)
    except Exception:
        pass
    s = s.replace('-', ' ')
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

if a.engine == 'local' and a.lang == 'ar' and a.tashkeel == 'auto':
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
    redo = (a.redo and re.search(a.redo, c['text'])) or (c['slot'] in a.redo_slots.split(','))
    if not a.force and os.path.exists(path) and not redo:
        continue
    au, sr = synth(prep(c['text']), spec)
    post(au, sr, spec, path)
    done += 1
    if done % 25 == 0:
        print(f'  {done} rendered ({i + 1}/{len(script)}) {time.time() - t0:.0f}s', flush=True)

# ---------- QA: every clip, listened back ----------
for c in script:
    path = os.path.join(outdir, c['key'] + '.mp3')
    if not os.path.exists(path):
        continue
    hyp = transcribe(path)
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                               capture_output=True, text=True).stdout or 0)
    report.append({'key': c['key'], 'slot': c['slot'], 'where': c['where'], 'err': round(err(c['text'], hyp), 3),
                   'dur': round(dur, 2), 'cps': round(len(c['text']) / max(dur, 0.1), 1), 'ref': c['text'], 'hyp': hyp})

# Beyond the limit a clip is dropped and the device voice reads that line.
# The Emirati female voice is held to a stricter bar: its errors are
# mispronunciations a listener hears, not transcription noise.
def limit(slot):
    if a.lang == 'en': return 0.5
    if a.engine == 'gemini': return 0.45
    return 0.3 if CAST[slot]['voice'] == 'emirati' else 0.6
keep = [r['key'] for r in report if r['err'] <= limit(r['slot'])]
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
