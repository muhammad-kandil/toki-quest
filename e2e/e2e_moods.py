"""Mood switching + quest theme with a seeded save (all worlds but the last done)."""
from playwright.sync_api import sync_playwright

DONE = {str(i): 100 for i in [1, 2, 3, 4, 5, 6, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75]}

with sync_playwright() as p:
    b = p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://127.0.0.1:5420/toki-quest/?sfxdebug=1', wait_until='networkidle')
    pg.evaluate("(s)=>localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:s,badges:[],selectedSkinId:'teal-classic',lang:'en'}))", DONE)
    pg.reload(wait_until='networkidle'); pg.wait_for_timeout(600)
    dbg = lambda: pg.evaluate("JSON.parse(JSON.stringify(window.__tokiSfx))")
    pg.click('.title-screen__cta'); pg.wait_for_timeout(1500); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
    print('map (world 8 current): music =', dbg()['music'])
    pg.click('.map__node--done >> nth=3'); pg.wait_for_timeout(2500)   # world 4 → thoughtful
    print('hub world 4: music =', dbg()['music'])
    pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(1200)
    pg.click('.map__node--current'); pg.wait_for_timeout(2500); pg.wait_for_selector('.door, .story__btn--skip', timeout=8000); (pg.click('.story__btn--skip'), pg.wait_for_selector('.door', timeout=8000)) if pg.locator('.story__btn--skip').count() else None; pg.wait_for_timeout(500)         # world 8 → serious
    print('hub world 8: music =', dbg()['music'])
    pg.click('.door--boss'); pg.wait_for_timeout(2200); pg.click('.beat__cta'); pg.wait_for_timeout(500)
    for i, c in enumerate([2, 0, 1, 0, 1, 2]):
        pg.locator('.school__door').nth(i).click(); pg.wait_for_timeout(500)
        pg.locator('.impact').nth(c).click(); pg.wait_for_timeout(500)
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
    pg.click('.beat__cta'); pg.wait_for_timeout(400)
    pg.locator('.choice-list__item').nth(5).click(); pg.wait_for_timeout(900)
    pg.locator('.choice-list__item').nth(0).click(); pg.wait_for_timeout(1500)
    d = dbg(); print('final reveal: quest =', d['cues'].get('quest'), 'world =', d['cues'].get('world'), 'music =', d['music'])
    pg.wait_for_timeout(7000)
    print('badge fanfare fired =', dbg()['cues'].get('badge'))
    print('errors:', errs or 'none')
    b.close()
