"""Run tools/art/assets.py (or story.py) without the API: for pictures made
by hand in the Gemini app (free tier — the API's image model needs billing).

  # 1. list the prompts, in order, with the reference images each one wants
  python tools/art/manual.py prompts --only L1,L2,... [--groups scenes,toki,...] > prompts.json
  # 2. generate each picture in the Gemini app, save as <dir>/<n>.png|jpg (n = prompt index)
  # 3. feed them through the normal pipeline (crop, cut-out, sizing, manifest)
  python tools/art/manual.py ingest --dir <dir> --only ... [--groups ...]

The pipeline code is unchanged; only Gemini.image() is replaced.
"""
import io, json, os, runpy, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import tools.art.gemini as G  # noqa: E402
from PIL import Image  # noqa: E402

mode = sys.argv[1]
args = sys.argv[2:]
src = None
if '--dir' in args:
    i = args.index('--dir'); src = args[i + 1]; del args[i:i + 2]
script = 'tools/art/assets.py'
if '--script' in args:
    i = args.index('--script'); script = args[i + 1]; del args[i:i + 2]

calls = []

class Manual:
    def __init__(self, *a, **k):
        self.model = 'gemini-app (manual)'
    def image(self, prompt, refs=None, aspect='4:3', **k):
        n = len(calls)
        calls.append({'n': n, 'aspect': aspect, 'refs': [os.path.basename(r) for r in (refs or [])], 'prompt': prompt})
        if mode == 'prompts':
            im = Image.new('RGB', (64, 48), (0, 255, 0))
        else:
            for ext in ('png', 'jpg', 'jpeg', 'webp'):
                p = os.path.join(src, f'{n}.{ext}')
                if os.path.exists(p):
                    im = Image.open(p); break
            else:
                raise G.QuotaExhausted(f'no picture for prompt {n} in {src}')
        b = io.BytesIO(); im.convert('RGBA' if im.mode == 'RGBA' else 'RGB').save(b, 'PNG')
        return b.getvalue()

G.Gemini = Manual
sys.argv = [script, '--force'] + args
real_out = sys.stdout
if mode == 'prompts':
    sys.stdout = sys.stderr
try:
    runpy.run_path(script, run_name='__main__')
finally:
    sys.stdout = real_out
if mode == 'prompts':
    json.dump(calls, sys.stdout, ensure_ascii=False, indent=1)
