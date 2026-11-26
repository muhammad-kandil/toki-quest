"""Find, verify and loop real school recordings (Freesound, CC0 only).

  python tools/audio/ambience.py --out public/audio/amb [--only bed1,bed2] [--per-query 4]

For each bed in tools/audio/beds.json: search Freesound (CC0 filter),
download HQ previews, classify 10 s windows with an AudioSet classifier,
score want/avoid labels, keep the best candidate, cut a seamless loop
(or a clean one-shot), normalise, encode MP3. Writes <out>/credits.json
and tools/audio/out/ambience-report.md.
"""
import argparse, json, os, re, subprocess, tempfile, time, urllib.parse, urllib.request
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('--out', required=True)
ap.add_argument('--only', default='')
ap.add_argument('--per-query', type=int, default=3)
ap.add_argument('--max-cands', type=int, default=8)
a = ap.parse_args()
BEDS = {k: v for k, v in json.load(open('tools/audio/beds.json')).items() if not k.startswith('_')}
if a.only:
    BEDS = {k: v for k, v in BEDS.items() if k in a.only.split(',')}
os.makedirs(a.out, exist_ok=True)
os.makedirs('tools/audio/out', exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'}

def get(url, binary=False):
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                b = r.read()
                return b if binary else b.decode('utf-8', 'replace')
        except Exception as e:
            time.sleep(2 + 3 * i); last = e
    raise last

def search(q):
    url = 'https://freesound.org/search/?q=' + urllib.parse.quote(q) + '&f=license%3A%22Creative+Commons+0%22&s=Downloads+desc'
    html = get(url)
    out = []
    for m in re.finditer(r'/people/([^/"]+)/sounds/(\d+)/', html):
        user, sid = urllib.parse.unquote(m.group(1)), m.group(2)
        pm = re.search(r'previews/(\d+)/%s_(\d+)-lq\.mp3' % sid, html)
        if pm and (sid, user) not in [(o[0], o[1]) for o in out]:
            out.append((sid, user, f'https://cdn.freesound.org/previews/{pm.group(1)}/{sid}_{pm.group(2)}-hq.mp3'))
    return out[: a.per_query]

def sound_meta(sid, user):
    url = f'https://freesound.org/people/{urllib.parse.quote(user)}/sounds/{sid}/'
    try:
        html = get(url)
    except Exception:
        return {'url': url, 'title': sid, 'license': '?'}
    title = re.search(r'<title>Freesound - "([^"]+)"', html)
    lic = 'CC0' if re.search(r'Creative Commons 0|publicdomain/zero', html) else ('CC-BY' if 'licenses/by/' in html else '?')
    return {'url': url, 'title': title.group(1) if title else sid, 'license': lic}

def decode(path, sr=16000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)

from transformers import pipeline
import torch
torch.set_num_threads(os.cpu_count() or 4)
clf = pipeline('audio-classification', model='MIT/ast-finetuned-audioset-10-10-0.4593', top_k=40)

def classify(path):
    x = decode(path)
    if len(x) < 16000:
        return {}, 0.0
    win, scores, n = 16000 * 10, {}, 0
    starts = list(range(0, max(1, len(x) - win // 2), win))
    if len(starts) > 3: starts = [starts[0], starts[len(starts) // 2], starts[-1]]
    for s in starts:
        seg = x[s: s + win]
        for r in clf({'raw': seg, 'sampling_rate': 16000}):
            scores[r['label']] = scores.get(r['label'], 0) + r['score']
        n += 1
    return {k: v / n for k, v in scores.items()}, len(x) / 16000

def score(labels, bed):
    w = sum(labels.get(l, 0) for l in bed['want'])
    v = sum(labels.get(l, 0) for l in bed['avoid'])
    return w - 2.0 * v

def make_loop(src, dst, seconds, lufs):
    x, sr = sf.read(src, always_2d=True)
    x = x.mean(axis=1)
    X = int(3.0 * sr)                                   # crossfade length
    L = min(int(seconds * sr), len(x) - X - int(1.0 * sr))
    start = int(min(2.0 * sr, max(0, len(x) - L - X - 1)))
    seg = x[start: start + L + X]
    head, body, tail = seg[:X], seg[X:L], seg[L:L + X]
    t = np.linspace(0, np.pi / 2, X)
    joint = tail * np.cos(t) + head * np.sin(t)        # equal-power
    loop = np.concatenate([body, joint]).astype(np.float32)
    encode(loop, sr, dst, lufs)
    return len(loop) / sr

def make_oneshot(src, dst, maxlen, lufs):
    x, sr = sf.read(src, always_2d=True)
    x = x.mean(axis=1)
    env = np.abs(x)
    thr = max(env.max() * 0.05, 1e-4)
    idx = np.where(env > thr)[0]
    s = max(0, idx[0] - int(0.02 * sr)) if len(idx) else 0
    y = x[s: s + int(maxlen * sr)].copy()
    f = min(len(y), int(0.25 * sr))
    y[-f:] *= np.linspace(1, 0, f)
    encode(y.astype(np.float32), sr, dst, lufs)
    return len(y) / sr

def encode(y, sr, dst, lufs):
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'x.wav'); sf.write(w, y, sr)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-af', f'highpass=f=60,loudnorm=I={lufs}:TP=-3:LRA=11,aresample=44100',
                        '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', dst], check=True)

credits, report = {}, ['# Ambience picks\n', 'Scores: sum of wanted AudioSet labels minus 2× avoided labels, averaged over 10 s windows.\n']
with tempfile.TemporaryDirectory() as tmp:
    for name, bed in BEDS.items():
        oneshot = bed.get('kind') == 'oneshot'
        cands, seen = [], set()
        for q in bed['queries']:
            try:
                for sid, user, prev in search(q):
                    if sid in seen: continue
                    seen.add(sid); cands.append((sid, user, prev, q))
            except Exception as e:
                print('search fail', q, e)
            time.sleep(1.5)
        rows = []
        for sid, user, prev, q in cands[: a.max_cands]:
            p = os.path.join(tmp, f'{sid}.mp3')
            try:
                open(p, 'wb').write(get(prev, binary=True))
                labels, dur = classify(p)
            except Exception as e:
                print('  skip', sid, e); continue
            sc = score(labels, bed)
            if not oneshot and dur < 20: sc -= 1.0          # too short to loop well
            if oneshot and dur > 30: sc -= 0.5
            top = sorted(labels.items(), key=lambda kv: -kv[1])[:6]
            rows.append((sc, sid, user, dur, top, p, q))
            print(f'  [{name}] {sc:+.3f} {sid:>7} {dur:5.1f}s {user[:16]:<16} ' + ', '.join(f'{k}:{v:.2f}' for k, v in top[:4]), flush=True)
        rows.sort(key=lambda r: -r[0])
        report.append(f'\n## {name} — {bed["desc"]}\n')
        for sc, sid, user, dur, top, p, q in rows[:5]:
            report.append(f'- {sc:+.3f} · [{sid}](https://freesound.org/s/{sid}/) by {user} · {dur:.0f}s · q="{q}" · ' + ', '.join(f'{k} {v:.2f}' for k, v in top))
        if not rows:
            report.append('- no candidates'); continue
        sc, sid, user, dur, top, p, q = rows[0]
        meta = sound_meta(sid, user)
        if meta['license'] != 'CC0':
            print(f'  !! {sid} licence {meta["license"]}, trying next'); 
            for r in rows[1:]:
                m2 = sound_meta(r[1], r[2])
                if m2['license'] == 'CC0':
                    sc, sid, user, dur, top, p, q = r; meta = m2; break
        wav = os.path.join(tmp, f'{sid}.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, wav], check=True)
        dst = os.path.join(a.out, f'{name}.mp3')
        length = make_oneshot(wav, dst, bed.get('maxlen', 4), bed['lufs']) if oneshot else make_loop(wav, dst, bed['loop'], bed['lufs'])
        credits[name] = {'id': sid, 'author': user, 'title': meta['title'], 'url': meta['url'], 'license': meta['license'],
                         'seconds': round(length, 1), 'score': round(sc, 3), 'labels': [k for k, _ in top[:5]]}
        report.append(f'\n**Picked:** {sid} "{meta["title"]}" by {user} ({meta["license"]}), {length:.1f}s → `{name}.mp3`\n')
        print(f'==> {name}: {sid} "{meta["title"]}" by {user} {meta["license"]} {length:.1f}s', flush=True)

old = {}
cp = os.path.join(a.out, 'credits.json')
if os.path.exists(cp): old = json.load(open(cp))
old.update(credits)
json.dump(old, open(cp, 'w'), indent=1, ensure_ascii=False)
open('tools/audio/out/ambience-report.md', 'w').write('\n'.join(report))
