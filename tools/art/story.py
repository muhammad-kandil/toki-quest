"""Render the picture-story stills with Gemini (runs in GitHub Actions).

  python tools/art/story.py [--worlds busy-classroom,assessment] [--force]

Reads tools/art/out/story.json (from tools/art/export-story.ts), adds the
art bible preamble, passes Toki's reference art for character
consistency, and writes public/story/<world>/<shot>.jpg (portrait, sized
to fill a phone, JPEG for iOS 12). Incremental; stops cleanly on quota.

Image calls go through tools/art/gemini.py (owned by the art director):
    generate_image(prompt: str, refs: list[str], aspect: str, out_path: str) -> bool
If that module isn't present yet, a minimal built-in client is used.
"""
import argparse, base64, io, json, os, re, sys, time, urllib.error, urllib.request

ap = argparse.ArgumentParser()
ap.add_argument('--worlds', default='')
ap.add_argument('--force', action='store_true')
a = ap.parse_args()

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

# Toki reference art: the default skin plus two poses.
REFS = ['src/assets/skins/skin-teal.png', 'src/assets/raw/toki-reaction-walking.png', 'src/assets/raw/toki-reaction-thoughtful.png']

STORY_STYLE = (
    'A single cinematic still from a warm animated film about a school coach. '
    'Portrait frame (2:3) that fills a phone screen; keep the main subject and faces in the centre band '
    '(top and bottom 15% may be cropped). Rich painterly semi-realistic illustration, soft volumetric light, '
    'gentle depth of field, warm late-morning or golden-hour colour, calm and respectful mood. '
    'Setting: a modern UAE public school. People are Emirati teachers, students and leaders in modest dress '
    '(abaya and shayla for women; white kandura and ghutra for men; school uniforms). '
    'Toki is a small cartoon mascot: match the reference images exactly (teal round body, indigo hair swoop, '
    'big friendly eyes, white sneakers), drawn in the same painterly light as the scene. '
    'Absolutely no text, letters, numbers, logos or signage anywhere in the image.'
)

try:
    from gemini import generate_image, PREAMBLE  # art director's shared client
except Exception:
    try:
        from gemini import generate_image  # client without a preamble export
        PREAMBLE = ''
    except Exception:
        PREAMBLE = ''
        API = 'https://generativelanguage.googleapis.com/v1beta'
        KEY = os.environ.get('GEMINI_API_KEY', '')

        def _api(path, body=None):
            req = urllib.request.Request(f'{API}/{path}', data=json.dumps(body).encode() if body else None,
                                         headers={'content-type': 'application/json', 'x-goog-api-key': KEY})
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read())

        _MODEL = None

        def _model():
            global _MODEL
            if _MODEL: return _MODEL
            override = os.environ.get('GEMINI_IMAGE_MODEL')
            if override:
                _MODEL = override; return _MODEL
            names = [m['name'].split('/')[-1] for m in _api('models?pageSize=200').get('models', [])]
            img = [n for n in names if 'image' in n and 'imagen' not in n]
            _MODEL = next((n for n in img if 'pro' in n), None) or (img[0] if img else None)
            if not _MODEL: sys.exit('no image model available to this key')
            print('[story] image model:', _MODEL, flush=True)
            return _MODEL

        def generate_image(prompt, refs, aspect, out_path):
            from PIL import Image
            parts = []
            for r in refs:
                if os.path.exists(r):
                    parts.append({'inline_data': {'mime_type': 'image/png', 'data': base64.b64encode(open(r, 'rb').read()).decode()}})
            parts.append({'text': prompt})
            body = {'contents': [{'parts': parts}],
                    'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': aspect}}}
            for attempt in range(6):
                try:
                    r = _api(f'models/{_model()}:generateContent', body)
                    for p in r['candidates'][0]['content']['parts']:
                        d = p.get('inlineData') or p.get('inline_data')
                        if d:
                            im = Image.open(io.BytesIO(base64.b64decode(d['data']))).convert('RGB')
                            os.makedirs(os.path.dirname(out_path), exist_ok=True)
                            im.save(out_path)
                            return True
                    print('  [story] no image in response', flush=True); time.sleep(3)
                except urllib.error.HTTPError as e:
                    msg = e.read().decode('utf-8', 'replace')[:300]
                    if e.code == 429 and ('PerDay' in msg or 'per day' in msg.lower()):
                        raise SystemExit('[story] daily image quota reached: ' + msg)
                    if e.code == 400 and 'imageConfig' in msg:
                        body['generationConfig'].pop('imageConfig', None)   # older models: no aspect option
                        continue
                    m = re.search(r'retryDelay": "(\d+)s', msg)
                    wait = int(m.group(1)) + 1 if m else min(60, 5 * 2 ** attempt)
                    print(f'  [story] HTTP {e.code}, retry in {wait}s: {msg[:140]}', flush=True); time.sleep(wait)
            return False


def finish(raw_path, out_path):
    """Crop to 2:3 portrait, 1024×1536, JPEG q80, ≤ ~200 KB."""
    from PIL import Image
    im = Image.open(raw_path).convert('RGB')
    w, h = im.size
    target = 2 / 3
    if w / h > target:
        nw = int(h * target); x = (w - nw) // 2; im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / target); y = (h - nh) // 2; im = im.crop((0, y, w, y + nh))
    im = im.resize((1024, 1536), Image.LANCZOS)
    for q in (80, 72, 64):
        im.save(out_path, 'JPEG', quality=q, optimize=True, progressive=True)
        if os.path.getsize(out_path) <= 220_000:
            break


shots = json.load(open('tools/art/out/story.json'))
if a.worlds:
    keep = set(a.worlds.split(','))
    shots = [s for s in shots if s['world'] in keep]
done = skipped = failed = 0
for s in shots:
    out = f"public/story/{s['world']}/{s['id']}.jpg"
    if os.path.exists(out) and not a.force:
        skipped += 1; continue
    side = 'left' if (s['quote'] or {}).get('at') == 'left' else 'right'
    framing = (f" Leave calm, uncluttered space on the {side} third, upper half, for a dialogue pop-up."
               if s['quote'] else ' Leave a calm, darker band across the bottom fifth for subtitles.')
    prompt = ' '.join(x for x in [PREAMBLE, STORY_STYLE, 'Scene:', s['prompt'], framing] if x)
    raw = out + '.raw.png'
    ok = generate_image(prompt, REFS, '2:3', raw)
    if ok and os.path.exists(raw):
        finish(raw, out); os.remove(raw); done += 1
        print(f"[story] {s['id']} -> {out} ({os.path.getsize(out) // 1024} KB)", flush=True)
    else:
        failed += 1; print(f"[story] {s['id']} failed", flush=True)
print(f'[story] rendered {done}, kept {skipped}, failed {failed}')
