"""Before/after shots for the people pass (classroom observe, 2 spots inspected,
beat strip mid-level, hub, map). Usage: python3 e2e/shots_people.py <port> <prefix>"""
import sys
from playwright.sync_api import sync_playwright
port, prefix = sys.argv[1], sys.argv[2]
OUT = 'docs/design/shots'
DONE = {str(i): 100 for i in [1, 2, 3, 4, 5, 6, 21, 22]}

def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://127.0.0.1:{port}/toki-quest/', wait_until='networkidle')
        pg.evaluate("(s)=>localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:s,badges:['drift-detective'],selectedSkinId:'teal-classic',lang:'%s'}))" % lang, DONE)
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(900)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1500); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-map.jpg', type='jpeg', quality=82)
        pg.click('.map__node--current'); pg.wait_for_timeout(2000); pg.wait_for_selector('.door, .story__btn--skip', timeout=8000); (pg.click('.story__btn--skip'), pg.wait_for_selector('.door', timeout=8000)) if pg.locator('.story__btn--skip').count() else None; pg.wait_for_timeout(500)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-hub.jpg', type='jpeg', quality=82)
        pg.click('.door >> nth=0'); pg.wait_for_timeout(2600)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-observe.jpg', type='jpeg', quality=82)
        pg.locator('.evidence-spot').nth(0).click(); pg.wait_for_timeout(400)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-observe-tapped.jpg', type='jpeg', quality=82)
        for i in range(1, pg.locator('.evidence-spot').count()): pg.locator('.evidence-spot').nth(i).click(); pg.wait_for_timeout(200)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        pg.locator('.choice-list__item').nth(0).click(); pg.wait_for_timeout(800)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-strip.jpg', type='jpeg', quality=82, clip={'x': 0, 'y': 0, 'width': 390, 'height': 120})
        print(lang, 'errors:', errs or 'none')
        b.close()

run('en'); run('ar')
