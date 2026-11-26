"""Generate the game's art with Gemini (see docs/design/ART_BIBLE.md).

  python tools/art/assets.py --groups scenes,toki,schools,map [--only L1,B25] [--force] [--budget-min 100]

Groups
  scenes   one 4:3 picture per room (tools/art/out/scenes.json from export-scenes.ts)
           -> public/art/scenes/<id>.jpg
  toki     pose sprites with transparent background -> public/art/toki/<pose>-<n>.png
  schools  8 world schools for the map -> public/art/schools/w<n>.png
  map      map background -> public/art/map/background.jpg

Incremental: existing files are kept unless --force or listed in --only.
Writes public/art/manifest.json (what exists) and tools/art/reports/<group>.md
(prompt + size per item). Stops cleanly on a daily-quota error; rerun continues.
"""
import argparse, io, json, os, re, sys, time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from tools.art.gemini import Gemini, PREAMBLE, SPRITE_PREAMBLE, TOKI_REFS, QuotaExhausted  # noqa: E402
from PIL import Image  # noqa: E402

ap = argparse.ArgumentParser()
ap.add_argument('--groups', default='scenes,toki,schools,map')
ap.add_argument('--only', default='')
ap.add_argument('--force', action='store_true')
ap.add_argument('--budget-min', type=float, default=0)
a = ap.parse_args()

CFG = json.load(open('tools/art/assets.json'))
OUT = 'public/art'
REP = 'tools/art/reports'
ONLY = set(x for x in a.only.split(',') if x)
os.makedirs(REP, exist_ok=True)
t0 = time.time()
g = None


def gem():
    global g
    if g is None:
        g = Gemini()
    return g


def wanted(key, path):
    if ONLY and key not in ONLY:
        return False
    return a.force or key in ONLY or not os.path.exists(path)


def over_budget():
    return a.budget_min and (time.time() - t0) > a.budget_min * 60


# ---------------------------------------------------------------- images ---
def to_jpeg(png_bytes, size, max_kb, path):
    im = Image.open(io.BytesIO(png_bytes)).convert('RGB')
    W, H = size
    # cover-crop to the target aspect, then resize
    r = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((x, y, x + W, y + H))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    for q in (84, 80, 76, 72, 68, 64, 60):
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=q, optimize=True, progressive=True)
        if buf.tell() <= max_kb * 1024 or q == 60:
            open(path, 'wb').write(buf.getvalue())
            return buf.tell() // 1024


def chroma_cut(png_bytes):
    """Remove the flat #00FF00 background; soften edges and remove green spill."""
    im = Image.open(io.BytesIO(png_bytes)).convert('RGBA')
    px = im.load()
    for yy in range(im.height):
        for xx in range(im.width):
            r, gg, b, _ = px[xx, yy]
            lead = gg - max(r, b)
            if gg > 90 and lead > 70:
                px[xx, yy] = (r, gg, b, 0)
            elif gg > 80 and lead > 25:
                alpha = int(255 * (1 - (lead - 25) / 45))
                px[xx, yy] = (r, max(r, b), b, max(0, min(255, alpha)))
    return im


def place(im, size, scale, baseline_pad=8):
    """Trim, scale by a shared factor, and stand on the bottom-centre of a square canvas."""
    bb = im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
    if bb:
        im = im.crop(bb)
    im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.paste(im, ((size - im.width) // 2, size - im.height - baseline_pad), im)
    return canvas


def trimmed_height(im):
    bb = im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
    return (bb[3] - bb[1]) if bb else im.height


# ---------------------------------------------------------------- scenes ---
def region(x, y):
    h = 'left' if x < 38 else 'right' if x > 62 else 'centre'
    v = 'upper' if y < 40 else 'lower' if y > 58 else 'middle'
    return f'{v} {h}'


def visible(label, x, y):
    objs = CFG['scenes']['hotspot_objects']
    low = label.lower()
    for k, v in objs.items():
        if not k.startswith('_') and k in low:
            return v
    if y < 40:
        return 'a display on the front wall with abstract shapes'
    if y > 58:
        return 'students working at their desks'
    return 'the teacher standing near a shelf'


def age(brief):
    s = f"{brief.get('subject') or ''} {brief['scenario']} {CFG['scenes']['notes'].get(brief['id'], '')}"
    m = re.search(r'Grade (\d+)', s)
    if 'Kindergarten' in s or 'kindergarten' in s:
        return 'kindergarten children about five years old'
    if m:
        n = int(m.group(1))
        return f'Grade {n} students (about {n + 5} years old)'
    return 'upper-primary students (about 10 to 12 years old)'


def teacher(brief):
    t = brief.get('teacher') or ''
    if t.startswith('Mr'):
        return 'The teacher is an Emirati man in a white kandura.'
    if t.startswith('Ms'):
        return 'The teacher is an Emirati woman in a black abaya and shayla.'
    return ''


def scene_prompt(b):
    comp = ''
    if b['evidence']:
        parts = [f"{region(e['x'], e['y'])} (around {e['x']}% across, {e['y']}% down): {visible(e['label'], e['x'], e['y'])}" for e in b['evidence']]
        comp = ' Composition guide for this 4:3 frame — place these clearly where stated: ' + '; '.join(parts) + '.'
    subj = f" Subject: {b['subject']}." if b.get('subject') and b['subject'] not in ('Any Subject',) else ''
    note = CFG['scenes']['notes'].get(b['id'], '')
    # The game overlays Toki on scenes; in the picture he is just "a visiting coach" (and not drawn).
    scenario = re.sub(r"\bToki[’']s\b", "the visiting coach's", b['scenario'])
    scenario = re.sub(r'(^|[.!?]\s+)Toki\b', r'\1A visiting coach', scenario)
    scenario = re.sub(r'\bToki\b', 'a visiting coach', scenario)
    return (PREAMBLE + f"Scene: {b['title']}. {scenario}{subj} Students: {age(b)}. {teacher(b)} {note}{comp} "
            "Eye-level wide shot of the whole room, a clear floor area in the lower third. No mascot or cartoon characters.")


def run_scenes(manifest, report):
    briefs = json.load(open('tools/art/out/scenes.json'))
    S = CFG['scenes']
    for b in briefs:
        if over_budget():
            print('[budget] stopping'); break
        path = f"{OUT}/scenes/{b['id']}.jpg"
        if wanted(b['id'], path):
            prompt = scene_prompt(b)
            png = gem().image(prompt, aspect=S['aspect'])
            kb = to_jpeg(png, S['size'], S['max_kb'], path)
            report.append(f"### {b['id']} — {b['title']} ({kb} KB)\n\n{prompt[len(PREAMBLE):]}\n")
            print(f"[scene] {b['id']} {kb} KB", flush=True)
        if os.path.exists(path):
            manifest['scenes'].append(b['id'])


# ------------------------------------------------------------------ toki ---
def run_toki(manifest, report):
    T = CFG['toki']
    for pose, spec in T['poses'].items():
        if over_budget():
            print('[budget] stopping'); break
        n = spec['frames']
        paths = [f"{OUT}/toki/{pose}-{i}.png" for i in range(n)]
        key = f'toki:{pose}'
        have = all(os.path.exists(p) for p in paths)
        need = (key in ONLY) or (not ONLY and (a.force or not have))
        if not need:
            if have:
                manifest['toki'][pose] = n
            continue
        raw = []
        first_png = None
        for i in range(n):
            phase = spec.get('phases', [''] * n)[i]
            prompt = SPRITE_PREAMBLE + spec['prompt'].format(n=i + 1, phase=phase)
            refs = list(TOKI_REFS)
            if first_png:
                prompt += ' Match the attached first frame exactly in size, proportions and position; change only the pose.'
                refs.append(first_png)
            png = gem().image(prompt, refs=refs, aspect=spec['aspect'])
            im = chroma_cut(png)
            raw.append(im)
            if i == 0:
                first_png = f'/tmp/toki-{pose}-0.png'
                im.save(first_png)
            report.append(f"### {pose} {i + 1}/{n}\n\n{prompt[len(SPRITE_PREAMBLE):]}\n")
        # one shared scale per pose so frames don't jump in size
        tallest = max(trimmed_height(im) for im in raw)
        scale = (T['size_px'] - 40) / max(1, tallest)
        for im, p in zip(raw, paths):
            os.makedirs(os.path.dirname(p), exist_ok=True)
            place(im, T['size_px'], scale).save(p, optimize=True)
        manifest['toki'][pose] = n
        print(f'[toki] {pose} x{n}', flush=True)


# --------------------------------------------------------------- schools ---
def run_schools(manifest, report):
    S = CFG['schools']
    for w, detail in S['worlds'].items():
        if over_budget():
            print('[budget] stopping'); break
        path = f'{OUT}/schools/w{w}.png'
        if wanted(f'school:{w}', path):
            prompt = PREAMBLE + S['prompt'].format(detail=detail)
            im = chroma_cut(gem().image(prompt, aspect=S['aspect']))
            os.makedirs(os.path.dirname(path), exist_ok=True)
            bb = im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
            scale = (S['size_px'] - 24) / max(1, max((bb[2] - bb[0]) if bb else im.width, (bb[3] - bb[1]) if bb else im.height))
            place(im, S['size_px'], scale, baseline_pad=12).save(path, optimize=True)
            report.append(f'### school {w}\n\n{prompt[len(PREAMBLE):]}\n')
            print(f'[school] w{w}', flush=True)
        if os.path.exists(path):
            manifest['schools'].append(int(w))


# ------------------------------------------------------------------- map ---
def run_map(manifest, report):
    M = CFG['map']
    path = f'{OUT}/map/background.jpg'
    if wanted('map', path) and not over_budget():
        prompt = PREAMBLE + M['prompt']
        kb = to_jpeg(gem().image(prompt, aspect=M['aspect']), M['size'], M['max_kb'], path)
        report.append(f'### map ({kb} KB)\n\n{prompt[len(PREAMBLE):]}\n')
        print(f'[map] {kb} KB', flush=True)
    manifest['map'] = os.path.exists(path)


# ------------------------------------------------------------------ main ---
mp = f'{OUT}/manifest.json'
manifest = json.load(open(mp)) if os.path.exists(mp) else {}
manifest.update({'scenes': [], 'toki': manifest.get('toki', {}), 'schools': [], 'map': manifest.get('map', False)})
RUN = {'scenes': run_scenes, 'toki': run_toki, 'schools': run_schools, 'map': run_map}
groups = [x for x in a.groups.split(',') if x in RUN]
stopped = None
for grp in RUN:
    rep = []
    try:
        if grp in groups:
            RUN[grp](manifest, rep)
        else:
            # keep the manifest truthful for groups not run this time
            if grp == 'scenes':
                manifest['scenes'] = sorted(f[:-4] for f in os.listdir(f'{OUT}/scenes')) if os.path.isdir(f'{OUT}/scenes') else []
            if grp == 'schools':
                manifest['schools'] = sorted(int(f[1:-4]) for f in os.listdir(f'{OUT}/schools')) if os.path.isdir(f'{OUT}/schools') else []
    except QuotaExhausted as e:
        stopped = f'daily quota reached during {grp}: {str(e)[:200]}'
        print('[quota]', stopped, flush=True)
    finally:
        if rep:
            with open(f'{REP}/{grp}.md', 'a') as f:
                f.write(f"\n## Run {time.strftime('%Y-%m-%d %H:%M')}\n\n" + '\n'.join(rep))
    if stopped:
        break
manifest['scenes'] = sorted(set(manifest['scenes']))
os.makedirs(OUT, exist_ok=True)
json.dump(manifest, open(mp, 'w'), indent=1)
print('[manifest]', {k: (len(v) if isinstance(v, (list, dict)) else v) for k, v in manifest.items()})
if stopped:
    print('[note] rerun the workflow to continue after the quota resets')
