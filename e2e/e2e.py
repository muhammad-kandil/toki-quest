import sys
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
def run(lang):
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':390,'height':844}, locale='ar' if lang=='ar' else 'en')
        errs=[]; failed=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('response',lambda r:failed.append((r.url.split('/')[-1],r.status)) if r.status>=400 else None)
        pg.goto(f'http://127.0.0.1:{PORT}/toki-quest/',wait_until='networkidle'); pg.wait_for_timeout(900)
        if lang=='ar' and pg.evaluate("document.documentElement.lang")!='ar':
            pg.click('.topbar__lang'); pg.wait_for_timeout(300)
        print(f'[{lang}] html lang/dir:', pg.evaluate("[document.documentElement.lang, document.documentElement.dir]"))
        pg.screenshot(path=f'{S}/{lang}-1-title.png')
        pg.click('.title-screen__cta'); pg.wait_for_timeout(900)
        print(f'[{lang}] map nodes:', pg.locator('.map__node').count(), 'toki on map:', pg.locator('.map__toki').count())
        pg.screenshot(path=f'{S}/{lang}-2-map.png')
        pg.click('.map__node--current'); pg.wait_for_timeout(1800)
        print(f'[{lang}] world cards:', pg.locator('.door').count())
        pg.screenshot(path=f'{S}/{lang}-3-world.png')
        pg.click('.door--available'); pg.wait_for_timeout(1900)
        # Observe: CTA should be disabled until all evidence inspected
        print(f'[{lang}] cta disabled before evidence:', pg.locator('.beat__cta').is_disabled())
        pg.wait_for_selector('.evidence-spot', timeout=4000)
        pg.screenshot(path=f'{S}/{lang}-4-observe.png')
        spots=pg.locator('.evidence-spot')
        for i in range(spots.count()):
            spots.nth(i).click(); pg.wait_for_timeout(250)
        pg.screenshot(path=f'{S}/{lang}-5-evidence.png')
        print(f'[{lang}] cta enabled after evidence:', not pg.locator('.beat__cta').is_disabled())
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        pg.screenshot(path=f'{S}/{lang}-6-drift.png')
        # Level 1 correct answers: thinking-quality, minor, add-prompts, r2
        def pick(idx):
            pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(750)
        pick(1); pick(0); pick(1); pick(1)  # drift, risk, coaching, reasoning (reasoning now precedes the conversation)
        print(f'[{lang}] conversation:', convo_any(pg))
        pg.wait_for_timeout(600)
        print(f'[{lang}] reveal shown:', pg.locator('.beat--reveal').count()==1, 'badge earned card:', pg.locator('.badge-earned').count())
        pg.screenshot(path=f'{S}/{lang}-7-reveal.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(600)
        print(f'[{lang}] back at world, L2 unlocked:', pg.locator('.door--available').count()>=1)
        # badges screen
        pg.click('.topbar__btn--text >> nth=0'); pg.wait_for_timeout(500)
        print(f'[{lang}] badges grid:', pg.locator('.badge-card').count(), 'earned:', pg.locator('.badge-card--earned').count())
        pg.screenshot(path=f'{S}/{lang}-8-badges.png', full_page=True)
        pg.click('.badges__back'); pg.wait_for_timeout(400)
        # seed boss unlocked and run boss
        pg.evaluate("""(()=>{const s=JSON.parse(localStorage.getItem('toki:save'));s.unlockedLevel=6;s.bestScores={1:125,2:125,3:125,4:125,5:125};localStorage.setItem('toki:save',JSON.stringify(s));})()""")
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
        pg.click('.title-screen__cta'); pg.wait_for_timeout(900)
        pg.click('.map__node--current'); pg.wait_for_timeout(1800)
        pg.click('.door--boss'); pg.wait_for_timeout(1900)
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
        pg.screenshot(path=f'{S}/{lang}-9-boss.png')
        for d in range(6):
            btn='.boss-audit__call--mutation' if d==5 else '.boss-audit__call--clean'
            pg.click(btn); pg.wait_for_timeout(300); pg.click('.beat__cta'); pg.wait_for_timeout(300)
        pg.locator('.choice-list__item').nth(2).click(); pg.wait_for_timeout(750)
        pg.locator('.choice-list__item').nth(1).click(); pg.wait_for_timeout(750)
        print(f'[{lang}] boss reveal:', pg.locator('.boss__final-word').count()==1)
        pg.screenshot(path=f'{S}/{lang}-10-boss-reveal.png', full_page=True)
        pg.click('.beat__cta'); pg.wait_for_timeout(600)
        save=pg.evaluate("localStorage.getItem('toki:save')")
        print(f'[{lang}] final save:', save)
        pg.click('.topbar__btn >> nth=0'); pg.wait_for_timeout(600)  # back to map
        pg.screenshot(path=f'{S}/{lang}-11-map-done.png')
        print(f'[{lang}] failed:', failed or 'none'); print(f'[{lang}] errors:', errs or 'none')
        b.close()
run('en'); run('ar')
