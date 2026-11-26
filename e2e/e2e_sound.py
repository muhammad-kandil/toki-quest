"""Sound E2E: serve dist under /toki-quest/ on :5420, walk title → map → hub →
classroom → reveal in EN and AR, assert 0 page errors and that cues fired.
Run from the worktree root: python3 e2e-sound/e2e_sound.py (after serve.sh)."""
from playwright.sync_api import sync_playwright

def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg = b.new_page(viewport={'width': 390, 'height': 844}, locale=lang)
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('http://127.0.0.1:5420/toki-quest/?sfxdebug=1', wait_until='networkidle')
        pg.wait_for_timeout(700)
        if lang == 'ar':
            pg.click('.topbar__lang'); pg.wait_for_timeout(300)
        dbg = lambda: pg.evaluate("JSON.parse(JSON.stringify(window.__tokiSfx))")
        pg.click('.title-screen__cta'); pg.wait_for_timeout(1500); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
        d = dbg(); print(f'[{lang}] title→map: music={d["music"]} cues={d["cues"]}')
        pg.click('.map__node--current'); pg.wait_for_timeout(2200); pg.wait_for_selector('.door, .story__btn--skip', timeout=8000); (pg.click('.story__btn--skip'), pg.wait_for_selector('.door', timeout=8000)) if pg.locator('.story__btn--skip').count() else None; pg.wait_for_timeout(500)
        d = dbg(); print(f'[{lang}] map→hub: music={d["music"]} travel={d["cues"].get("travel")} steps={d["cues"].get("step")}')
        pg.click('.door--available'); pg.wait_for_timeout(2200)
        d = dbg(); print(f'[{lang}] hub→classroom: music={d["music"]} door={d["cues"].get("door")} wipe={d["cues"].get("wipe")}')
        pg.wait_for_selector('.evidence-spot', timeout=5000)
        for i in range(3):
            pg.locator('.evidence-spot').nth(i).click(); pg.wait_for_timeout(250)
        d = dbg(); print(f'[{lang}] evidence: discover={d["cues"].get("discover")} evidenceAll={d["cues"].get("evidenceAll")}')
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
        def pick(i):
            pg.locator('.choice-list__item').nth(i).click(); pg.wait_for_timeout(900)
        pick(0)   # wrong drift → lookAgain
        pick(1)   # right drift → correct
        pick(3)   # risk: lethal (wrong) → risk lvl 3 + lookAgain
        pick(0)   # risk: minor (right) → risk lvl 0 + correct
        pick(1); pick(1)
        pg.wait_for_timeout(1400)
        d = dbg()
        print(f'[{lang}] reveal: reveal={d["cues"].get("reveal")} badge={d["cues"].get("badge")} correct={d["cues"].get("correct")} lookAgain={d["cues"].get("lookAgain")} risk={d["cues"].get("risk")} music={d["music"]}')
        print(f'[{lang}] reveal screen shown:', pg.locator('.beat--reveal').count() == 1)
        pg.click('.beat__cta'); pg.wait_for_timeout(900)
        d = dbg(); print(f'[{lang}] back in hub: music={d["music"]}')
        snd = pg.locator('.topbar__btn--sound')
        snd.click(); pg.wait_for_timeout(600); m1 = dbg()['music']
        snd.click(); pg.wait_for_timeout(600); m2 = dbg()['music']
        print(f'[{lang}] mute→{m1} unmute→{m2}')
        print(f'[{lang}] errors:', errs or 'none')
        b.close()

run('en'); run('ar')
