import json
from playwright.sync_api import sync_playwright
import os
PORT=os.environ.get('PORT','5400')

def convo_any(pg):
    """Walk a conversation beat if present (pick option 0 each turn)."""
    pg.wait_for_timeout(300)
    if pg.locator('.convo').count() == 0: return None
    for _ in range(4):
        pg.locator('.convo .choice-list__item').nth(0).click(); pg.wait_for_timeout(500)
        if pg.locator('.convo__outcome').count():
            out = pg.locator('.convo__outcome .boss-audit__verdict').inner_text()
            pg.click('.beat__cta'); pg.wait_for_timeout(500)
            return out
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
    return 'stuck'
S='/tmp/claude-0/-home-claude/f223db6b-5c5f-5fde-b59f-83dfa33be3b3/scratchpad/shots'
DONE={str(i):100 for i in [1,2,3,4,5,6,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55,61,62,63,64,65]}

def run(lang):
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':390,'height':844}, locale='ar' if lang=='ar' else 'en')
        errs=[]; failed=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('response',lambda r:failed.append((r.url.split('/')[-1],r.status)) if r.status>=400 and '/audio/' not in r.url else None)
        pg.goto(f'http://127.0.0.1:{PORT}/toki-quest/',wait_until='networkidle'); pg.wait_for_timeout(600)
        pg.evaluate("""(s)=>{localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:s,badges:[],selectedSkinId:'teal-classic',lang:'%s'}))}"""%lang, DONE)
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
        print(f'[{lang}] lang/dir:', pg.evaluate("[document.documentElement.lang, document.documentElement.dir]"))
        pg.click('.title-screen__cta'); pg.wait_for_timeout(900); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
        print(f'[{lang}] map current node is world 7:', pg.locator('.map__node--current').get_attribute('aria-label'))
        pg.screenshot(path=f'{S}/{lang}-w7-map.png')
        pg.click('.map__node--current'); pg.wait_for_timeout(1800); pg.wait_for_selector('.door', timeout=8000); pg.wait_for_timeout(500)
        print(f'[{lang}] W7 cards:', pg.locator('.door').count())
        pg.screenshot(path=f'{S}/{lang}-w7-hub.png')

        def pick(idx):
            pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(750)
        def observe():
            pg.wait_for_selector('.evidence-spot', timeout=5000)
            spots=pg.locator('.evidence-spot')
            for i in range(spots.count()):
                spots.nth(i).click(); pg.wait_for_timeout(200)
            pg.click('.beat__cta'); pg.wait_for_timeout(500)
        def academy(ticks, risk, coaching, shot, test_over=False):
            pg.click('.door--available'); pg.wait_for_timeout(1900)
            observe()
            if shot: pg.screenshot(path=f'{S}/{lang}-{shot}-diagnose.png', full_page=True)
            if test_over:
                # tick a healthy finding and file → expect over-coaching hint
                pg.locator('.finding').nth(1).click(); pg.wait_for_timeout(150)
                pg.click('.beat__cta'); pg.wait_for_timeout(500)
                print(f'[{lang}]   over-coaching hint shown:', pg.locator('.hint-mark--over').count()==1)
                pg.screenshot(path=f'{S}/{lang}-{shot}-overcoach.png', full_page=True)
                pg.locator('.finding').nth(1).click(); pg.wait_for_timeout(150)
            for i in ticks:
                pg.locator('.finding').nth(i).click(); pg.wait_for_timeout(150)
            print(f'[{lang}]   cta label:', pg.locator('.beat__cta').inner_text())
            pg.click('.beat__cta'); pg.wait_for_timeout(600)
            print(f'[{lang}]   filed:', pg.locator('.finding--mutation').count(), 'mutation /', pg.locator('.finding--healthy').count(), 'healthy')
            if shot: pg.screenshot(path=f'{S}/{lang}-{shot}-filed.png', full_page=True)
            pg.click('.beat__cta'); pg.wait_for_timeout(500)
            print(f'[{lang}]   risk options:', pg.locator('.choice-list__item').count())
            pick(risk); pick(coaching); pg.wait_for_timeout(500)
            print(f'[{lang}]   conversation:', convo_any(pg))
            print(f'[{lang}]   reveal:', pg.locator('.beat--reveal').count()==1, 'badge:', pg.locator('.badge-earned').count())
            if shot: pg.screenshot(path=f'{S}/{lang}-{shot}-reveal.png', full_page=True)
            pg.click('.beat__cta'); pg.wait_for_timeout(700)

        print(f'[{lang}] 71'); academy([0], 2, 0, 'w7-71')
        print(f'[{lang}] 72'); academy([], 4, 0, 'w7-72', test_over=(True))
        print(f'[{lang}] 73'); academy([0,1,2], 2, 0, None)
        print(f'[{lang}] 74'); academy([0], 0, 0, None)
        # boss 75
        pg.click('.door--boss'); pg.wait_for_timeout(1900)
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
        for i,fits in enumerate([True,False,True,False,True]):
            pg.click('.boss-audit__call--mutation' if fits else '.boss-audit__call--clean'); pg.wait_for_timeout(300); pg.click('.beat__cta'); pg.wait_for_timeout(300)
        pick(0); pick(3); pick(0); pg.wait_for_timeout(500)
        print(f'[{lang}] 75 reveal:', pg.locator('.boss__final-word').count()==1, 'badge:', pg.locator('.badge-earned').count())
        pg.screenshot(path=f'{S}/{lang}-w7-boss-reveal.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(700)
        print(f'[{lang}] W7 hint:', pg.locator('.hub__hint').inner_text())
        pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(800)
        print(f'[{lang}] map current node:', pg.locator('.map__node--current').get_attribute('aria-label'))
        pg.screenshot(path=f'{S}/{lang}-w8-map.png')
        pg.click('.map__node--current'); pg.wait_for_timeout(1800); pg.wait_for_selector('.door', timeout=8000); pg.wait_for_timeout(500)
        print(f'[{lang}] W8 cards:', pg.locator('.door').count(), 'hint:', pg.locator('.hub__hint').inner_text())
        pg.screenshot(path=f'{S}/{lang}-w8-hub.png')
        pg.click('.door--available, .door--boss:not(:disabled)'); pg.wait_for_timeout(1900)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        print(f'[{lang}] school doors:', pg.locator('.school__door').count())
        pg.screenshot(path=f'{S}/{lang}-w8-school.png')
        calls=[2,0,1,0,1,2]
        for i,c in enumerate(calls):
            pg.locator('.school__door').nth(i).click(); pg.wait_for_timeout(600)
            if i==0:
                pg.screenshot(path=f'{S}/{lang}-w8-dossier.png', full_page=True)
                # wrong call first → hint
                pg.locator('.impact').nth(0).click(); pg.wait_for_timeout(400)
                print(f'[{lang}]   wrong-call hint:', pg.locator('.beat__hint').count()==1)
            pg.locator('.impact').nth(c).click(); pg.wait_for_timeout(500)
            pg.click('.beat__cta'); pg.wait_for_timeout(500)
        print(f'[{lang}] doors done:', pg.locator('.school__door--done').count(), 'decide cta:', pg.locator('.beat__cta').count())
        pg.screenshot(path=f'{S}/{lang}-w8-school-done.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        pick(0)  # wrong: Mathematics → hint
        print(f'[{lang}]   priority hint:', pg.locator('.beat__hint').count()==1)
        pick(5)
        pg.screenshot(path=f'{S}/{lang}-w8-mission.png', full_page=True)
        pick(0); pg.wait_for_timeout(300)
        print(f'[{lang}] final reveal:', pg.locator('.visit__message').count()==1)
        pg.wait_for_timeout(7000)
        print(f'[{lang}] lines on:', pg.locator('.visit__line--on').count(), 'badge:', pg.locator('.badge-earned').count())
        pg.screenshot(path=f'{S}/{lang}-w8-final.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(700)
        save=json.loads(pg.evaluate("localStorage.getItem('toki:save')"))
        print(f'[{lang}] scores 7x/85:', {k:v for k,v in save['bestScores'].items() if int(k)>=71}, 'badges:', save['badges'])
        pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(800)
        pg.screenshot(path=f'{S}/{lang}-w8-map-done.png')
        print(f'[{lang}] failed:', failed or 'none'); print(f'[{lang}] errors:', errs or 'none')
        b.close()
run('en'); run('ar')
