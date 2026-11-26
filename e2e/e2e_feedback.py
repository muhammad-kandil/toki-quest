"""Feedback card: renders on the Level 1 reveal, Disagree + note posts the
feedback object, thank-you shows, and the card never reappears on replay.
Run against a build made with VITE_PROGRESS_URL=http://127.0.0.1:<PORT>/record-progress,
served under /toki-quest/ on PORT (default 5610)."""
import json, os, sys, urllib.parse
from playwright.sync_api import sync_playwright

PORT = os.environ.get('PORT', '5610')
BASE = f'http://127.0.0.1:{PORT}/toki-quest/'
# A plausible (unsigned) Telegram launch hash; the function verifies the
# signature server-side, the client only needs it to exist.
TG = urllib.parse.urlencode({
    'user': json.dumps({'id': 4242, 'first_name': 'Pilot', 'language_code': 'en'}),
    'auth_date': '1700000000', 'hash': 'e2e',
})
HASH = '#tgWebAppData=' + urllib.parse.quote(TG, safe='') + '&tgWebAppVersion=8.0&tgWebAppPlatform=ios'


def play_level_one(pg):
    pg.click('.title-screen__cta'); pg.wait_for_timeout(900); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
    pg.click('.map__node--current'); pg.wait_for_timeout(1500); pg.wait_for_selector('.door, .story__btn--skip', timeout=8000); (pg.click('.story__btn--skip'), pg.wait_for_selector('.door', timeout=8000)) if pg.locator('.story__btn--skip').count() else None; pg.wait_for_timeout(500)
    pg.locator('.door--available').first.click(); pg.wait_for_timeout(1500)
    pg.wait_for_selector('.evidence-spot', timeout=8000); pg.wait_for_timeout(900)
    spots = pg.locator('.evidence-spot')
    for i in range(spots.count()):
        spots.nth(i).click(); pg.wait_for_timeout(200)
    pg.click('.beat__cta'); pg.wait_for_timeout(500)
    def pick(idx):
        pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(700)
    pick(1); pick(0); pick(1); pick(1)
    # conversation
    pg.wait_for_timeout(300)
    for _ in range(4):
        if pg.locator('.convo').count() == 0: break
        pg.locator('.convo .choice-list__item').nth(0).click(); pg.wait_for_timeout(500)
        pg.click('.beat__cta'); pg.wait_for_timeout(400)
        if pg.locator('.convo').count() == 0: break
    pg.wait_for_selector('.beat--reveal', timeout=5000)
    pg.wait_for_timeout(400)


def run(lang):
    posts = []
    ok = True
    def check(cond, msg):
        nonlocal ok
        print(f'  [{lang}] {"PASS" if cond else "FAIL"} {msg}')
        ok = ok and bool(cond)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={'width': 390, 'height': 844}, locale='ar' if lang == 'ar' else 'en')
        def handle(route, request):
            try: posts.append(json.loads(request.post_data or '{}'))
            except Exception: posts.append({'_bad': request.post_data})
            route.fulfill(status=200, content_type='application/json', body='{"ok":true}',
                          headers={'access-control-allow-origin': '*'})
        ctx.route('**/record-progress', handle)
        pg = ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(BASE + HASH, wait_until='networkidle'); pg.wait_for_timeout(900)
        if lang == 'ar' and pg.evaluate("document.documentElement.lang") != 'ar':
            pg.click('.topbar__lang'); pg.wait_for_timeout(300)
        play_level_one(pg)

        card = pg.locator('.fb')
        check(card.count() == 1, 'card renders on reveal')
        check(card.get_attribute('data-reportable') == '1', 'card knows it can report (initData present)')
        check(pg.locator('.fb__verdict--fair').count() == 1 and pg.locator('.fb__verdict--unsure').count() == 1
              and pg.locator('.fb__verdict--disagree').count() == 1, 'three verdict buttons')
        check(pg.locator('.fb__detail').count() == 0, 'detail hidden before a tap')
        check(not pg.locator('.beat__cta').is_disabled(), 'Continue not blocked by the card')
        q = pg.locator('.fb__question').inner_text()
        check(('fair' in q.lower()) if lang == 'en' else ('منصف' in q), f'question text in {lang}: {q!r}')
        check('!' not in card.inner_text(), 'no exclamation marks in card text')

        pg.click('.fb__verdict--disagree'); pg.wait_for_timeout(400)
        check(pg.locator('.fb__verdict--disagree').get_attribute('aria-pressed') == 'true', 'Disagree marked pressed')
        check(pg.locator('.fb__detail').count() == 1, 'detail shown after tap')
        note = 'The coaching answer felt harsh' if lang == 'en' else 'إجابة التدريب بدت قاسية'
        pg.fill('.fb__input', note)
        n_before = len(posts)
        pg.click('.fb__send'); pg.wait_for_timeout(800)
        check(pg.locator('.fb--sent').count() == 1 and pg.locator('.fb__thanks').count() == 1, 'thank-you shown after send')
        check(pg.locator('.fb__detail').count() == 0, 'input gone after send')
        fb_posts = [x for x in posts[n_before:] if 'feedback' in x]
        check(len(fb_posts) == 1, f'exactly one feedback POST ({len(fb_posts)})')
        if fb_posts:
            body = fb_posts[0]; f = body['feedback']
            print('   payload:', json.dumps(f, ensure_ascii=False))
            check(isinstance(body.get('initData'), str) and 'auth_date' in body['initData'], 'POST carries initData')
            check(f.get('levelId') == 1, 'feedback.levelId == 1')
            check(f.get('verdict') == 'disagree', "feedback.verdict == 'disagree'")
            check(f.get('text') == note, 'feedback.text == typed note')
            check(f.get('lang') == lang, f"feedback.lang == '{lang}'")
            check(f.get('outcome') in ('restored', 'partial', 'unchanged', None), 'feedback.outcome valid or absent')
            check(isinstance(f.get('attempts'), dict) and all(isinstance(v, int) for v in f['attempts'].values()), 'feedback.attempts is step→int')
            check('bestScores' not in body, 'feedback POST does not carry bestScores')
        stored = pg.evaluate("localStorage.getItem('toki:fb:1')")
        check(stored == 'disagree', f'localStorage toki:fb:1 == {stored!r}')
        check(not pg.locator('.beat__cta').is_disabled(), 'Continue still enabled after send')

        # Replay: back to the world, open level 1 again, play to reveal — no card.
        pg.click('.beat__cta'); pg.wait_for_timeout(700)
        pg.locator('.door').first.click(); pg.wait_for_timeout(3200)
        if pg.locator('.evidence-spot').count() == 0:
            # Replay prompt or level intro — press the first CTA
            if pg.locator('.beat__cta').count(): pg.click('.beat__cta'); pg.wait_for_timeout(800)
        pg.wait_for_selector('.evidence-spot', timeout=8000); pg.wait_for_timeout(900)
        spots = pg.locator('.evidence-spot')
        for i in range(spots.count()):
            spots.nth(i).click(); pg.wait_for_timeout(200)
        pg.click('.beat__cta'); pg.wait_for_timeout(500)
        for idx in (1, 0, 1, 1):
            pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(700)
        for _ in range(4):
            if pg.locator('.convo').count() == 0: break
            pg.locator('.convo .choice-list__item').nth(0).click(); pg.wait_for_timeout(500)
            pg.click('.beat__cta'); pg.wait_for_timeout(400)
        pg.wait_for_selector('.beat--reveal', timeout=5000); pg.wait_for_timeout(400)
        check(pg.locator('.fb').count() == 0, 'card does not reappear on replay')
        check(not errs, f'no page errors {errs[:2]}')
        pg.screenshot(path=f'/tmp/claude-0/-home-claude/f223db6b-5c5f-5fde-b59f-83dfa33be3b3/scratchpad/fb-{lang}-replay.png', full_page=True)
        b.close()
    return ok


def run_outside_telegram():
    """No hash → card still renders but is not reportable and sends nothing."""
    posts = []
    with sync_playwright() as p:
        b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/record-progress', lambda r, q: (posts.append(1), r.fulfill(status=200, body='{}')))
        pg = ctx.new_page()
        pg.goto(BASE, wait_until='networkidle'); pg.wait_for_timeout(900)
        play_level_one(pg)
        rep = pg.locator('.fb').get_attribute('data-reportable')
        pg.click('.fb__verdict--fair'); pg.wait_for_timeout(300)
        pg.click('.fb__send'); pg.wait_for_timeout(600)
        sent = pg.locator('.fb--sent').count() == 1
        b.close()
    ok = rep == '0' and not posts and sent
    print(f'  [browser] {"PASS" if ok else "FAIL"} outside Telegram: reportable={rep}, posts={len(posts)}, thanks={sent}')
    return ok


if __name__ == '__main__':
    results = [run('en'), run('ar'), run_outside_telegram()]
    print('ALL GREEN' if all(results) else 'FAILURES')
    sys.exit(0 if all(results) else 1)
