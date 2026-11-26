"""Before/after screenshots for the art pass. Usage: python3 e2e/shots.py <port> <prefix>"""
import sys
from playwright.sync_api import sync_playwright
port, prefix = sys.argv[1], sys.argv[2]
OUT = 'docs/design/shots'
DONE = {str(i): 100 for i in [1, 2, 3, 4, 5, 6, 21, 22, 23, 24, 25]}

def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://127.0.0.1:{port}/toki-quest/', wait_until='networkidle')
        pg.evaluate("(s)=>localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:s,badges:['drift-detective','coaching-specialist','purpose-protector'],selectedSkinId:'teal-classic',lang:'%s'}))" % lang, DONE)
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(900)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-1-title.png')
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1400); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-2-map.png')
        pg.click('.topbar__btn--text >> nth=0'); pg.wait_for_timeout(900)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-6-badges.png')
        pg.click('.badges__back'); pg.wait_for_timeout(600)
        pg.click('.map__node--current'); pg.wait_for_timeout(2000); pg.wait_for_selector('.door', timeout=8000); pg.wait_for_timeout(500)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-3-hub.png')
        pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(900)
        pg.click('.map__node--done >> nth=0'); pg.wait_for_timeout(2000)
        pg.click('.door >> nth=0'); pg.wait_for_timeout(2600)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-4-classroom.png')
        for i in range(3): pg.locator('.evidence-spot').nth(i).click(); pg.wait_for_timeout(250)
        pg.wait_for_timeout(500)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-4b-evidence.png')
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-4c-choice.png')
        for idx in [1, 0, 1]: pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(800)
        pg.wait_for_timeout(400)
        pg.locator('.convo .choice-list__item').nth(0).click(); pg.wait_for_timeout(700)
        pg.screenshot(path=f'{OUT}/{prefix}-{lang}-5-conversation.png', full_page=True)
        print(f'[{lang}] shots done; errors: {errs or "none"}')
        b.close()

run('en'); run('ar')
