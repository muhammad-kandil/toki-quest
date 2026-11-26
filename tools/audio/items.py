"""Fetch and verify the per-room item sounds (Freesound, CC0 only).

  python tools/audio/items.py --out public/audio/items [--only asset1,asset2]

For each asset in tools/audio/items.json: search Freesound (CC0 filter)
or take its pinned `pick`, download HQ previews, classify with the same
AudioSet model as the room beds, score want/avoid labels, keep the best
candidate, then cut it:
  - oneshot: the loudest stretch of at most `maxlen` seconds, starting
    just before its onset, faded out;
  - loop: a seamless `loop`-second loop (equal-power crossfade).
Normalised to the asset's loudness, mono MP3. One asset failing never
fails the run: it is reported and the game stays silent for it.
Writes <out>/credits.json and tools/audio/out/items-report.md.
"""
import argparse, json, os, re, subprocess, tempfile, time, traceback, urllib.parse, urllib.request
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('--out', required=True)
ap.add_argument('--only', default='')
ap.add_argument('--per-query', type=int, default=3)
ap.add_argument('--max-cands', type=int, default=8)
a = ap.parse_args()
SPEC = json.load(open('tools/audio/items.json'))
ASSETS = SPEC['assets']
if a.only:
    ASSETS = {k: v for k, v in ASSETS.items() if k in a.only.split(',')}
os.makedirs(a.out, exist_ok=True)
os.makedirs('tools/audio/out', exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'}


def get(url, binary=False):
    last = None
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                b = r.read()
                return b if binary else b.decode('utf-8', 'replace')
        except Exception as e:
            time.sleep(2 + 3 * i)
            last = e
    raise last


def search(q):
    url = 'https://freesound.org/search/?q=' + urllib.parse.quote(q) + '&f=license%3A%22Creative+Commons+0%22&s=Downloads+desc'
    html = get(url)
    out = []
    for m in re.finditer(r'/people/([^/"]+)/sounds/(\d+)/', html):
        user, sid = urllib.parse.unquote(m.group(1)), m.group(2)
        pm = re.search(r'previews/(\d+)/%s_(\d+)-lq\.mp3' % sid, html)
        if pm and sid not in [o[0] for o in out]:
            out.append((sid, user, f'https://cdn.freesound.org/previews/{pm.group(1)}/{sid}_{pm.group(2)}-hq.mp3'))
    return out[: a.per_query]


def pinned(sid):
    html = get(f'https://freesound.org/s/{sid}/')
    pm = re.search(r'previews/(\d+)/%s_(\d+)-(?:lq|hq)\.mp3' % sid, html)
    um = re.search(r'/people/([^/"]+)/sounds/%s/' % sid, html)
    if not (pm and um):
        return None
    return (sid, urllib.parse.unquote(um.group(1)), f'https://cdn.freesound.org/previews/{pm.group(1)}/{sid}_{pm.group(2)}-hq.mp3')


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
KNOWN = set(clf.model.config.id2label.values())
for name, spec in ASSETS.items():
    bad = [l for l in spec['want'] + spec['avoid'] if l not in KNOWN]
    if bad:
        print(f'  note: {name}: labels not in AudioSet model (ignored): {bad}')


def classify(path):
    """Average AudioSet scores over up to three 5 s windows (items are short)."""
    x = decode(path)
    if len(x) < 4000:
        return {}, len(x) / 16000
    if len(x) < 16000:
        x = np.pad(x, (0, 16000 - len(x)))
    win = 16000 * 5
    starts = list(range(0, max(1, len(x) - win // 2), win)) or [0]
    if len(starts) > 3:
        starts = [starts[0], starts[len(starts) // 2], starts[-1]]
    scores, n = {}, 0
    for s in starts:
        for r in clf({'raw': x[s: s + win], 'sampling_rate': 16000}):
            scores[r['label']] = scores.get(r['label'], 0) + r['score']
        n += 1
    return {k: v / n for k, v in scores.items()}, len(x) / 16000


def score(labels, spec, dur):
    w = sum(labels.get(l, 0) for l in spec['want'])
    v = sum(labels.get(l, 0) for l in spec['avoid'])
    s = w - 2.0 * v
    if spec['kind'] == 'oneshot' and dur > 40:
        s -= 0.15          # long files are usually beds, not the single sound we want
    if spec['kind'] == 'loop' and dur < spec.get('loop', 20) * 0.6:
        s -= 0.5
    return s


def encode(y, sr, dst, lufs):
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'x.wav')
        sf.write(w, y, sr)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-af', f'highpass=f=80,loudnorm=I={lufs}:TP=-3:LRA=11,aresample=44100',
                        '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', dst], check=True)


def cut_oneshot(src, dst, maxlen, lufs):
    """The loudest stretch of up to maxlen s, starting 30 ms before its onset."""
    x, sr = sf.read(src, always_2d=True)
    x = x.mean(axis=1)
    hop = int(0.02 * sr)
    if len(x) < hop * 4:
        y = x
    else:
        env = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, mode='same'))
        win = min(len(x), int(maxlen * sr))
        csum = np.concatenate([[0], np.cumsum(env)])
        energy = csum[win:] - csum[:-win] if len(x) > win else np.array([csum[-1]])
        best = int(np.argmax(energy[::hop])) * hop if len(energy) else 0
        seg_env = env[best: best + win]
        thr = max(seg_env.max() * 0.08, 1e-4)
        on = int(np.argmax(seg_env > thr))
        start = max(0, best + on - int(0.03 * sr))
        y = x[start: start + win].copy()
    fi, fo = min(len(y), int(0.01 * sr)), min(len(y), int(0.25 * sr))
    if fi:
        y[:fi] *= np.linspace(0, 1, fi)
    if fo:
        y[-fo:] *= np.linspace(1, 0, fo)
    encode(y.astype(np.float32), sr, dst, lufs)
    return len(y) / sr


def cut_loop(src, dst, seconds, lufs):
    x, sr = sf.read(src, always_2d=True)
    x = x.mean(axis=1)
    X = int(1.5 * sr)
    L = min(int(seconds * sr), len(x) - X - 1)
    if L <= X:
        return cut_oneshot(src, dst, seconds, lufs)
    start = int(min(1.0 * sr, max(0, len(x) - L - X - 1)))
    seg = x[start: start + L + X]
    head, body, tail = seg[:X], seg[X:L], seg[L:L + X]
    t = np.linspace(0, np.pi / 2, X)
    loop = np.concatenate([body, tail * np.cos(t) + head * np.sin(t)]).astype(np.float32)
    encode(loop, sr, dst, lufs)
    return len(loop) / sr


credits, report, failed = {}, ['# Item sounds\n', 'Score: wanted AudioSet labels minus 2× avoided labels (5 s windows).\n'], []
with tempfile.TemporaryDirectory() as tmp:
    for name, spec in ASSETS.items():
        try:
            cands = []
            if spec.get('pick'):
                p = pinned(spec['pick'])
                if p:
                    cands.append((*p, 'pinned'))
                else:
                    print(f'  !! {name}: pinned sound {spec["pick"]} not found, searching instead')
            if not cands:
                seen = set()
                for q in spec['queries']:
                    try:
                        for sid, user, prev in search(q):
                            if sid not in seen:
                                seen.add(sid)
                                cands.append((sid, user, prev, q))
                    except Exception as e:
                        print(f'  search failed {name} "{q}": {e}')
                    time.sleep(1.5)
            rows = []
            for sid, user, prev, q in cands[: a.max_cands]:
                p = os.path.join(tmp, f'{sid}.mp3')
                try:
                    open(p, 'wb').write(get(prev, binary=True))
                    labels, dur = classify(p)
                except Exception as e:
                    print(f'  skip {sid}: {e}')
                    continue
                sc = score(labels, spec, dur)
                top = sorted(labels.items(), key=lambda kv: -kv[1])[:6]
                rows.append((sc, sid, user, dur, top, p, q))
                print(f'  [{name}] {sc:+.3f} {sid:>7} {dur:5.1f}s ' + ', '.join(f'{k}:{v:.2f}' for k, v in top[:4]), flush=True)
            rows.sort(key=lambda r: -r[0])
            report.append(f'\n## {name} — {spec["desc"]}\n')
            for sc, sid, user, dur, top, p, q in rows[:4]:
                report.append(f'- {sc:+.3f} · [{sid}](https://freesound.org/s/{sid}/) by {user} · {dur:.1f}s · q="{q}" · ' + ', '.join(f'{k} {v:.2f}' for k, v in top))
            pick = None
            for r in rows:
                meta = sound_meta(r[1], r[2])
                if meta['license'] == 'CC0':
                    pick = (r, meta)
                    break
            if not pick:
                failed.append(name)
                report.append('- no CC0 candidate — the game stays silent for this sound')
                continue
            (sc, sid, user, dur, top, p, q), meta = pick
            wav = os.path.join(tmp, f'{sid}.wav')
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, wav], check=True)
            dst = os.path.join(a.out, f'{name}.mp3')
            length = cut_loop(wav, dst, spec['loop'], spec['lufs']) if spec['kind'] == 'loop' else cut_oneshot(wav, dst, spec['maxlen'], spec['lufs'])
            credits[name] = {'id': sid, 'author': user, 'title': meta['title'], 'url': meta['url'], 'license': meta['license'],
                             'seconds': round(length, 2), 'score': round(sc, 3), 'labels': [k for k, _ in top[:5]]}
            report.append(f'\n**Picked:** {sid} "{meta["title"]}" by {user} ({meta["license"]}), {length:.2f}s → `{name}.mp3`\n')
            print(f'==> {name}: {sid} by {user} {length:.2f}s score {sc:+.3f}', flush=True)
        except Exception:
            traceback.print_exc()
            failed.append(name)

cp = os.path.join(a.out, 'credits.json')
old = json.load(open(cp)) if os.path.exists(cp) else {}
old.update(credits)
json.dump(old, open(cp, 'w'), indent=1, ensure_ascii=False)
report.append(f'\n---\n{len(credits)} sounds rendered, {len(failed)} missing: {", ".join(failed) or "none"}\n')
open('tools/audio/out/items-report.md', 'w').write('\n'.join(report))
print(f'items: {len(credits)} rendered, missing: {failed}')
