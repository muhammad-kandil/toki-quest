"""Wave 2 checks: beat order (reasoning before conversation), hints that
open the evidence notebook and point at a clue, and the progress payload
carrying attempts + outcome. Serve dist under /toki-quest/ first:
    PORT=5460 python3 e2e/e2e_wave2.py
"""
import json, os
from urllib.parse import quote
from playwright.sync_api import sync_playwright

PORT = os.environ.get('PORT', '5400')
BASE = f'http://127.0.0.1:{PORT}/toki-quest/'

# A fake-but-well-formed Telegram launch so reportProgress() fires.
INIT = 'query_id=AAE&user=' + quote(json.dumps({'id': 777, 'first_name': 'Hind'})) + '&auth_date=1700000000&hash=abcd'
HASH = '#tgWebAppData=' + quote(INIT, safe='') + '&tgWebAppVersion=8.0&tgWebAppPlatform=ios&tgWebAppThemeParams=%7B%7D'


def pick(pg, idx, wait=750):
    pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(wait)


def convo(pg, picks):
    assert pg.locator('.convo').count() == 1, 'conversation beat missing'
    for p in picks:
        pg.locator('.convo .choice-list__item').nth(p).click(); pg.wait_for_timeout(450)
        if pg.locator('.convo__outcome').count(): break
        pg.click('.beat__cta'); pg.wait_for_timeout(350)
    out = pg.locator('.convo__outcome .boss-audit__verdict').inner_text()
    pg.click('.beat__cta'); pg.wait_for_timeout(500)
    return out


def observe(pg):
    pg.wait_for_selector('.evidence-spot', timeout=5000)
    spots = pg.locator('.evidence-spot')
    for i in range(spots.count()):
        spots.nth(i).click(); pg.wait_for_timeout(200)
    pg.click('.beat__cta'); pg.wait_for_timeout(450)


def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844})
        errs, failed, posts = [], [], []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('response', lambda r: failed.append((r.url.split('/')[-1], r.status)) if r.status >= 400 else None)
        pg.route('**/record-progress', lambda route: (posts.append(json.loads(route.request.post_data)),
                                                      route.fulfill(status=200, body='{"ok":true}', headers={'access-control-allow-origin': '*'})))
        pg.goto(BASE + HASH, wait_until='networkidle'); pg.wait_for_timeout(700)
        pg.evaluate("(l)=>localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:{},badges:[],selectedSkinId:'teal-classic',lang:l}))", lang)
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1000)
        pg.click('.map__node--current'); pg.wait_for_timeout(1800)
        pg.click('.door--available'); pg.wait_for_timeout(1900)
        observe(pg)

        # --- Level 1: deliberate miss on drift → notebook opens and points at the clue
        assert not pg.locator('details.recap').evaluate('d => d.open'), 'recap should start closed'
        pick(pg, 0)  # wrong (collaboration)
        opened = pg.locator('details.recap').evaluate('d => d.open')
        hot = pg.locator('.recap__item--hot').count()
        chip = pg.locator('.hint-spot').count()
        hint = pg.locator('.beat__hint').inner_text()
        print(f'[{lang}] miss → recap open: {opened}, hot clue: {hot}, chip: {chip}, hint: {hint[:70]!r}')
        assert opened and hot == 1 and chip == 1
        assert 'thinking' not in hint.lower() and 'التفكير' not in hint, 'hint leaks the answer noun'
        pick(pg, 1)  # thinking-quality
        # risk: recap closed again on a fresh beat
        assert not pg.locator('details.recap').evaluate('d => d.open')
        pick(pg, 0)  # minor
        pick(pg, 1)  # add-prompts
        # NEW ORDER: reasoning comes before the conversation
        heading = pg.locator('.beat__heading').inner_text()
        print(f'[{lang}] beat after coaching: {heading!r}; convo visible: {pg.locator(".convo").count()}')
        assert pg.locator('.convo').count() == 0
        pick(pg, 1)  # r2
        out = convo(pg, [1, 0])  # a neutral then an opening line → partial
        print(f'[{lang}] conversation outcome: {out}')
        assert pg.locator('.beat--reveal').count() == 1
        rows = [r.inner_text() for r in pg.locator('.score-summary__row').all()]
        print(f'[{lang}] score rows: {rows}')
        pg.click('.beat__cta'); pg.wait_for_timeout(1200)

        # --- payload
        assert posts, 'no progress POST'
        body = posts[-1]
        print(f'[{lang}] payload keys: {sorted(body.keys())}; attempts[1]: {body.get("attempts", {}).get("1")}; outcomes[1]: {body.get("outcomes", {}).get("1")}')
        assert body['attempts']['1'] == {'drift': 2, 'risk': 1, 'coaching': 1, 'reasoning': 1}
        assert body['outcomes']['1'] in ('partial', 'restored', 'unchanged')
        save = json.loads(pg.evaluate("localStorage.getItem('toki:save')"))
        assert save['attempts']['1']['drift'] == 2 and save['outcomes']['1'] == body['outcomes']['1']

        # --- World 7 academy: wrong diagnosis → recap opens with the pointed clue
        done = {str(i): 100 for i in [1, 2, 3, 4, 5, 6, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65]}
        pg.evaluate("(s)=>{const v=JSON.parse(localStorage.getItem('toki:save'));v.bestScores=s;localStorage.setItem('toki:save',JSON.stringify(v));}", done)
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1000)
        pg.click('.map__node--current'); pg.wait_for_timeout(2000)
        pg.click('.door--available'); pg.wait_for_timeout(2000)
        observe(pg)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)  # file empty diagnosis → miss
        opened = pg.locator('details.recap').evaluate('d => d.open'); hot = pg.locator('.recap__item--hot').count()
        print(f'[{lang}] academy miss → recap open: {opened}, hot: {hot}')
        assert opened and hot == 1
        pg.locator('.finding').nth(0).click(); pg.wait_for_timeout(150); pg.click('.beat__cta'); pg.wait_for_timeout(600)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        pick(pg, 0)  # wrong risk → recap + chip
        assert pg.locator('.hint-spot').count() == 1
        pick(pg, 2); pick(pg, 0)
        out = convo(pg, [0, 0])
        pg.click('.beat__cta'); pg.wait_for_timeout(1200)
        body = posts[-1]
        print(f'[{lang}] academy payload attempts[71]: {body["attempts"].get("71")}, outcome: {body["outcomes"].get("71")}')
        assert body['attempts']['71'] == {'diagnosis': 2, 'risk': 2, 'coaching': 1}
        print(f'[{lang}] failed: {failed or "none"} | errors: {errs or "none"}')
        assert not errs and not failed
        b.close()


run('en'); run('ar')
print('WAVE2 OK')
