"""Voice bake-off: the same lines through several engines, each scored by
Whisper listen-back. Writes bakeoff/<engine>/<lang>-<role>.mp3 and
bakeoff/results.json. Engines that fail to install/load are skipped and
reported, never fatal.

  python tools/audio/bakeoff.py --engine chatterbox|qwen|baseline
"""
import argparse, json, os, re, subprocess, sys, tempfile, time, traceback
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('--engine', required=True)
a = ap.parse_args()

LINES = {
  'en': {
    'narrator': 'Lethal Mutation. Assessment has become an end rather than a tool. A great deal is measured, but the evidence rarely changes what happens next.',
    'teacher-f': 'Did you see them? Every single group was talking. Last year I couldn’t get three hands up.',
    'teacher-m': 'Three quizzes a week, every mark in the system by Thursday. If this is about the data, it’s all there.',
    'toki': 'It is all there, I looked. Can I ask about one number? Question four last Tuesday, eleven students wrong the same way.',
  },
  'ar': {
    'narrator': 'يزور توكي صفًا شديد التنظيم. يخضع الطلاب لاختبارات قصيرة وتقييمات بانتظام، وتُسجَّل النتائج أسبوعيًا.',
    'teacher-f': 'هل رأيتهم؟ كل مجموعة كانت تتحدث. في العام الماضي ما كنت أرى ثلاث أيدٍ مرفوعة.',
    'teacher-m': 'ثلاثة اختبارات أسبوعيًا، وكل درجة في النظام بحلول الخميس. إن كان الموضوع عن البيانات، فكلها موجودة.',
    'toki': 'كلها هناك، اطّلعت عليها. هل لي أن أسأل عن رقم واحد؟ السؤال الرابع يوم الثلاثاء الماضي، أحد عشر طالبًا أخطؤوا بالطريقة نفسها.',
  },
}
OUT = 'bakeoff'
os.makedirs(OUT, exist_ok=True)
res_path = os.path.join(OUT, 'results.json')

def enc(wav, sr, path):
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'a.wav'); sf.write(w, np.asarray(wav, dtype=np.float32).squeeze(), sr)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-af', 'loudnorm=I=-18:TP=-2,aresample=24000', '-ac', '1',
                        '-codec:a', 'libmp3lame', '-b:a', '64k', path], check=True)

from faster_whisper import WhisperModel
asr = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=os.cpu_count())
import jiwer
AR_STRIP = re.compile(r'[ؗ-ًؚ-ْٰـ"«»،؛؟.,!?:;()\-]')
def norm(lang, s):
    if lang == 'ar':
        s = AR_STRIP.sub(' ', s); s = re.sub('[إأآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')
    else:
        s = re.sub(r"[^a-z0-9' ]", ' ', s.lower().replace('’', "'"))
    return re.sub(r'\s+', ' ', s).strip()
def score(lang, ref, path):
    segs, _ = asr.transcribe(path, language=lang, beam_size=1)
    hyp = ' '.join(x.text for x in segs).strip()
    r, h = norm(lang, ref), norm(lang, hyp)
    return (jiwer.cer(r, h) if lang == 'ar' else jiwer.wer(r, h)), hyp

results = json.load(open(res_path)) if os.path.exists(res_path) else {}
def record(engine, variant, lang, role, path, t):
    e, hyp = score(lang, LINES[lang][role], path)
    results.setdefault(engine, {}).setdefault(variant, {})[f'{lang}-{role}'] = {'file': os.path.relpath(path, OUT), 'err': round(e, 3), 'hyp': hyp, 'secs': round(t, 1)}
    print(f'[{engine}/{variant}] {lang}-{role}: err={e:.3f} render={t:.1f}s | {hyp[:90]}', flush=True)
    json.dump(results, open(res_path, 'w'), ensure_ascii=False, indent=1)

def run_variant(engine, variant, lang, role, fn):
    path = os.path.join(OUT, engine, variant, f'{lang}-{role}.mp3'); os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        t = time.time(); wav, sr = fn(LINES[lang][role]); t = time.time() - t
        enc(wav, sr, path); record(engine, variant, lang, role, path, t)
    except Exception as ex:
        traceback.print_exc()
        results.setdefault(engine, {}).setdefault(variant, {})[f'{lang}-{role}'] = {'error': str(ex)[:300]}
        json.dump(results, open(res_path, 'w'), ensure_ascii=False, indent=1)

REF = 'bakeoff/refs'  # timbre references: our own synthetic voices (no real person cloned)

if a.engine == 'chatterbox':
    import torch, torchaudio
    torch.set_num_threads(os.cpu_count() or 4)
    from chatterbox.mtl_tts import ChatterboxMultilingualTTS
    mtl = ChatterboxMultilingualTTS.from_pretrained(device='cpu')
    for lang in ['ar', 'en']:
        for role in LINES[lang]:
            run_variant('chatterbox', 'default', lang, role, lambda t: (mtl.generate(t, language_id=lang).squeeze(0).numpy(), mtl.sr))
            ref = os.path.join(REF, f'{role}.wav')
            if os.path.exists(ref):
                run_variant('chatterbox', 'cast', lang, role, lambda t: (mtl.generate(t, language_id=lang, audio_prompt_path=ref, exaggeration=0.45, cfg_weight=0.5).squeeze(0).numpy(), mtl.sr))

elif a.engine == 'qwen':
    import torch
    torch.set_num_threads(os.cpu_count() or 4)
    from qwen_tts import Qwen3TTSModel
    m = Qwen3TTSModel.from_pretrained('Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice', device_map='cpu', dtype=torch.float32)
    for name in ('get_supported_speakers', 'get_supported_languages'):
        if hasattr(m, name):
            try: print(name, getattr(m, name)())
            except Exception as ex: print(name, 'err', ex)
    speakers = {'narrator': 'Serena', 'teacher-f': 'Vivian', 'teacher-m': 'Ryan', 'toki': 'Aiden'}
    for lang, qlang in [('en', 'English'), ('ar', 'Arabic')]:
        for role in LINES[lang]:
            def gen(t, role=role, qlang=qlang):
                wavs, sr = m.generate_custom_voice(text=t, language=qlang, speaker=speakers[role])
                return wavs[0], sr
            run_variant('qwen', 'customvoice', lang, role, gen)

elif a.engine == 'baseline':
    # The voices in the game today — and the timbre references for the
    # Chatterbox "cast" variant (our own synthetic voices, no real person).
    from kokoro_onnx import Kokoro
    kok = Kokoro('models/kokoro-v1.0.onnx', 'models/voices-v1.0.bin')
    EN = {'narrator': 'bf_emma', 'teacher-f': 'af_bella', 'teacher-m': 'am_michael', 'toki': 'am_puck'}
    os.makedirs(REF, exist_ok=True)
    for role, v in EN.items():
        lang_tag = 'en-gb' if v.startswith('b') else 'en-us'
        run_variant('current', 'game', 'en', role, lambda t, v=v, lt=lang_tag: kok.create(t, voice=v, speed=1.0, lang=lt))
        samples, sr = kok.create('Good morning. I would like to talk about what I saw in the lesson today, and what the students were really doing during the group task.', voice=v, speed=1.0, lang=lang_tag)
        sf.write(os.path.join(REF, f'{role}.wav'), samples, sr)
    from piper import PiperVoice
    from piper.config import SynthesisConfig
    PV = {'emirati': PiperVoice.load('models/arabic-emirati-female-model.onnx'), 'kareem': PiperVoice.load('models/ar_JO-kareem-medium.onnx')}
    AR = {'narrator': 'kareem', 'teacher-f': 'emirati', 'teacher-m': 'kareem', 'toki': 'kareem'}
    for role, v in AR.items():
        def gen(t, v=v):
            ch = list(PV[v].synthesize(t, syn_config=SynthesisConfig(noise_scale=0.6, noise_w_scale=0.8)))
            return np.concatenate([c.audio_float_array for c in ch]), PV[v].config.sample_rate
        run_variant('current', 'game', 'ar', role, gen)
print('done', a.engine)
