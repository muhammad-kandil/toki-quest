"""Tiny Gemini image client shared by the art tools (assets.py, story.py).

    from tools.art.gemini import Gemini, PREAMBLE, TOKI_REFS, QuotaExhausted
    g = Gemini()                                  # reads GEMINI_API_KEY
    png = g.image(PREAMBLE + "A classroom ...", refs=TOKI_REFS, aspect="4:3")
    open("out.png", "wb").write(png)

- Model: env GEMINI_IMAGE_MODEL, else the first listed model whose name
  contains "image" and "flash" (the "nano banana" family), else any "image".
- refs: local image paths sent as inline data before the prompt (character
  consistency for Toki).
- aspect: "4:3", "3:4", "1:1", "16:9", "9:16" … sent as imageConfig; the
  hint is also written into the prompt for models that ignore the field.
- Retries 429/5xx with backoff; a daily-quota 429 raises QuotaExhausted so
  callers can stop cleanly and let the next run continue.
Standard library only (urllib), so it runs anywhere.
"""
import base64, json, mimetypes, os, re, time, urllib.error, urllib.request

API = "https://generativelanguage.googleapis.com/v1beta"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

PREAMBLE = (
    "Cinematic, warm, painterly digital illustration in the style of a modern animated feature's "
    "background art. Soft brush texture, gentle depth of field, soft late-morning daylight from large "
    "windows, warm key light and cool indigo shadows. Palette: warm sand and soft stone neutrals, indigo "
    "(#3B2A78) shadows, one warm orange (#F5A623) accent leading the eye; keep large teal areas out of the "
    "background. Setting: a modern school in the United Arab Emirates. People: Emirati and Arab teachers "
    "(women in abaya and shayla, men in kandura) and students in school uniforms, modest, natural, friendly, "
    "generic faces, nobody recognisable. Absolutely no text, letters, numbers, signs, logos or brand marks "
    "anywhere in the image; boards and posters show only abstract shapes and lines.\n\n"
)

TOKI_CLAUSE = (
    " Include Toki exactly as in the attached reference images: same teal rounded body shape, indigo swept "
    "hair tuft, face, white gloves and white sneakers, same flat colours and clean outline; he is a small "
    "friendly mascot about knee-to-waist height of an adult."
)

SPRITE_PREAMBLE = (
    "Character sprite of Toki, exactly matching the attached reference images (same teal rounded body, "
    "indigo swept hair tuft, big friendly eyes, wide smile, small white gloves, white sneakers, same flat "
    "colours and clean dark outline, same proportions). Full body, centred, feet on the bottom baseline with "
    "a small margin, nothing cropped. Plain flat pure green background (#00FF00) filling the whole image, "
    "no ground shadow, no props unless described, no text.\n\n"
)

TOKI_REFS = [
    os.path.join(ROOT, "src/assets/skins/skin-teal.png"),
    os.path.join(ROOT, "src/assets/raw/toki-face-teal-hero.png"),
    os.path.join(ROOT, "src/assets/raw/toki-reaction-walking.png"),
]


class QuotaExhausted(Exception):
    """Daily quota reached: stop and let the next run continue."""


class Gemini:
    def __init__(self, key=None, model=None):
        self.key = key or os.environ.get("GEMINI_API_KEY", "")
        if not self.key:
            raise SystemExit("GEMINI_API_KEY is not set")
        self.model = model or os.environ.get("GEMINI_IMAGE_MODEL") or self._pick_model()
        print(f"[gemini] image model: {self.model}", flush=True)

    # -- HTTP ---------------------------------------------------------------
    def _call(self, path, body=None, timeout=180):
        req = urllib.request.Request(
            f"{API}/{path}",
            data=json.dumps(body).encode() if body is not None else None,
            headers={"content-type": "application/json", "x-goog-api-key": self.key},
        )
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())

    def models(self):
        out, token = [], ""
        while True:
            r = self._call("models?pageSize=200" + (f"&pageToken={token}" if token else ""))
            out += [m["name"].split("/")[-1] for m in r.get("models", [])]
            token = r.get("nextPageToken")
            if not token:
                return out

    def _pick_model(self):
        names = self.models()
        img = [n for n in names if "image" in n and "imagen" not in n]
        best = [n for n in img if "flash" in n] or img
        if not best:
            raise SystemExit("no Gemini image model available to this key: " + ", ".join(names[:40]))
        # prefer non-preview, newest-looking name
        best.sort(key=lambda n: ("preview" in n, -len(re.findall(r"\d", n)), n))
        return best[0]

    # -- image --------------------------------------------------------------
    def image(self, prompt, refs=(), aspect=None, tries=7):
        """Return PNG/JPEG bytes for the prompt (first image part)."""
        parts = []
        for p in refs:
            mime = mimetypes.guess_type(p)[0] or "image/png"
            parts.append({"inline_data": {"mime_type": mime, "data": base64.b64encode(open(p, "rb").read()).decode()}})
        text = prompt + (f"\n\nAspect ratio {aspect}." if aspect else "")
        parts.append({"text": text})
        cfg = {"responseModalities": ["IMAGE", "TEXT"]}
        if aspect:
            cfg["imageConfig"] = {"aspectRatio": aspect}
        body = {"contents": [{"parts": parts}], "generationConfig": cfg}
        last = None
        for attempt in range(tries):
            try:
                r = self._call(f"models/{self.model}:generateContent", body)
                for c in r.get("candidates", []):
                    for part in (c.get("content") or {}).get("parts", []):
                        d = part.get("inlineData") or part.get("inline_data")
                        if d and d.get("data"):
                            return base64.b64decode(d["data"])
                reason = (r.get("candidates") or [{}])[0].get("finishReason") or r.get("promptFeedback")
                last = f"no image in response ({reason})"
                print(f"  [gemini] {last}; retrying", flush=True)
                time.sleep(3)
            except urllib.error.HTTPError as e:
                msg = e.read().decode("utf-8", "replace")[:500]
                if e.code == 400 and "imageConfig" in msg and "imageConfig" in cfg:
                    cfg.pop("imageConfig")          # older model: aspect stays as a prompt hint
                    continue
                if e.code == 429 and ("PerDay" in msg or "per day" in msg.lower() or "daily" in msg.lower()):
                    raise QuotaExhausted(msg)
                if e.code in (429, 500, 502, 503, 504):
                    m = re.search(r'retryDelay"\s*:\s*"(\d+)s', msg)
                    wait = int(m.group(1)) + 1 if m else min(120, 6 * 2 ** attempt)
                    print(f"  [gemini] HTTP {e.code}; retry in {wait}s", flush=True)
                    time.sleep(wait)
                    last = msg
                    continue
                raise RuntimeError(f"Gemini HTTP {e.code}: {msg}")
            except (urllib.error.URLError, TimeoutError) as e:
                last = str(e)
                time.sleep(5 * (attempt + 1))
        raise RuntimeError(f"Gemini gave no image after {tries} tries: {last}")
