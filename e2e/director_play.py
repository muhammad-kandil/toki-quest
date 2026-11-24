"""Director's playthrough: title → W1 L1 (wrong answer, closed conversation) →
W2 L21 (no conversation) → W7 L72 (no-drift + conversation) → Final World → badges.
Screenshots to SHOTS, EN and AR. Serve dist under /toki-quest/ on PORT first."""
import os, sys
from playwright.sync_api import sync_playwright

PORT = os.environ.get('PORT', '5450')
S = os.environ.get('SHOTS', '/tmp/dir-shots')
BASE = f'http://127.0.0.1:{PORT}/toki-quest/'
os.makedirs(S, exist_ok=True)
ALL_TO_6 = [1,2,3,4,5,6,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55,61,62,63,64,65]

def pick(pg, i, w=800):
    pg.locator('.choice-list__item').nth(i).click(); pg.wait_for_timeout(w)

def observe(pg):
    pg.wait_for_selector('.evidence-spot', timeout=6000)
    for i in range(pg.locator('.evidence-spot').count()):
        pg.locator('.evidence-spot').nth(i).click(); pg.wait_for_timeout(250)
    pg.click('.beat__cta'); pg.wait_for_timeout(500)

def convo(pg, picks):
    if pg.locator('.convo').count() == 0: return None
    for p in picks:
        pg.locator('.convo .choice-list__item').nth(p).click(); pg.wait_for_timeout(500)
        if pg.locator('.convo__outcome').count(): break
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
    out = pg.locator('.convo__outcome .boss-audit__verdict').inner_text()
    pg.click('.beat__cta'); pg.wait_for_timeout(500)
    return out

def seed(pg, done, lang):
    pg.evaluate("(s)=>localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:s,badges:[],selectedSkinId:'teal-classic',lang:'%s'}))" % lang, {str(i): 100 for i in done})
    pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)

def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844}, locale=lang)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(BASE, wait_until='networkidle'); pg.wait_for_timeout(600)
        pg.evaluate("localStorage.clear()"); seed(pg, [], lang)
        pg.screenshot(path=f'{S}/{lang}-01-title.png')
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1300); pg.screenshot(path=f'{S}/{lang}-02-map.png')
        pg.click('.map__node--current'); pg.wait_for_timeout(1900); pg.screenshot(path=f'{S}/{lang}-03-hub.png')
        pg.click('.door--available'); pg.wait_for_timeout(2100); pg.screenshot(path=f'{S}/{lang}-04-observe.png', full_page=True)
        observe(pg); pg.screenshot(path=f'{S}/{lang}-05-drift.png', full_page=True)
        pick(pg, 2); pg.screenshot(path=f'{S}/{lang}-06-wrong.png', full_page=True)
        pick(pg, 1); pick(pg, 0); pg.screenshot(path=f'{S}/{lang}-07-coaching.png', full_page=True)
        pick(pg, 1); pg.wait_for_timeout(300); pg.screenshot(path=f'{S}/{lang}-08-convo.png', full_page=True)
        out = convo(pg, [2]); print(lang, 'L1 convo closed path ->', out)
        pg.screenshot(path=f'{S}/{lang}-09-after-convo.png', full_page=True)
        pick(pg, 1); pg.wait_for_timeout(500); pg.screenshot(path=f'{S}/{lang}-10-reveal.png', full_page=True)
        print(lang, 'L1 rows:', [r.inner_text().replace('\n', ' ') for r in pg.locator('.score-summary__row').all()], 'badge:', pg.locator('.badge-earned').count())
        pg.click('.beat__cta'); pg.wait_for_timeout(700); pg.screenshot(path=f'{S}/{lang}-11-hub-after.png')
        seed(pg, [1,2,3,4,5,6], lang); pg.click('.title-screen__cta'); pg.wait_for_timeout(1200); pg.click('.map__node--current'); pg.wait_for_timeout(1900)
        pg.click('.door--available'); pg.wait_for_timeout(2100); observe(pg); pg.screenshot(path=f'{S}/{lang}-12-w2-drift.png', full_page=True)
        pick(pg, 0); pick(pg, 3); pick(pg, 1); pg.wait_for_timeout(400)
        print(lang, 'W2 L21 convo?', pg.locator('.convo').count(), 'beat heading:', pg.locator('.beat__heading').inner_text())
        pg.screenshot(path=f'{S}/{lang}-13-w2-after-coaching.png', full_page=True)
        seed(pg, ALL_TO_6 + [71], lang)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1200); pg.click('.map__node--current'); pg.wait_for_timeout(1900); pg.screenshot(path=f'{S}/{lang}-14-w7-hub.png')
        pg.click('.door--available'); pg.wait_for_timeout(2100); observe(pg); pg.screenshot(path=f'{S}/{lang}-15-w7-diag.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(600); pg.click('.beat__cta'); pg.wait_for_timeout(500); pick(pg, 4); pick(pg, 0)
        pg.screenshot(path=f'{S}/{lang}-16-w7-convo.png', full_page=True); out = convo(pg, [0, 0]); print(lang, 'L72 convo ->', out)
        pg.screenshot(path=f'{S}/{lang}-17-w7-reveal.png', full_page=True); pg.click('.beat__cta'); pg.wait_for_timeout(600)
        seed(pg, ALL_TO_6 + [71,72,73,74,75], lang)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1200); pg.click('.map__node--current'); pg.wait_for_timeout(1900); pg.screenshot(path=f'{S}/{lang}-18-w8-hub.png')
        pg.click('.door:not(:disabled)'); pg.wait_for_timeout(2100); pg.screenshot(path=f'{S}/{lang}-19-w8-intro.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(500); pg.screenshot(path=f'{S}/{lang}-20-w8-school.png', full_page=True)
        for i, c in enumerate([2,0,1,0,1,2]):
            pg.locator('.school__door').nth(i).click(); pg.wait_for_timeout(500); pg.locator('.impact').nth(c).click(); pg.wait_for_timeout(500); pg.click('.beat__cta'); pg.wait_for_timeout(400)
        pg.click('.beat__cta'); pg.wait_for_timeout(500); pick(pg, 5); pg.screenshot(path=f'{S}/{lang}-21-w8-mission.png', full_page=True)
        pick(pg, 0); pg.wait_for_timeout(7000); pg.screenshot(path=f'{S}/{lang}-22-w8-end.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(600); pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(900); pg.screenshot(path=f'{S}/{lang}-23-map-done.png')
        pg.click('.topbar__btn--text >> nth=0'); pg.wait_for_timeout(600); pg.screenshot(path=f'{S}/{lang}-24-badges.png', full_page=True)
        print(lang, 'errors:', errs or 'none'); b.close()

if __name__ == '__main__':
    for lang in (sys.argv[1:] or ['en', 'ar']): run(lang)
