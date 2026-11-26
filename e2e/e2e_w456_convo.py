"""Worlds 4–6: every classroom through its coaching conversation.
Good path on all 12; a 'closes' path on 41, 53, 64. EN and AR. 0 page errors.
Correct ids and conversation effects are read from the source files.
Serve: python3 -m http.server <port> from a dir containing dist as 'toki-quest'.
usage: python3 e2e/e2e_w456_convo.py <repo root> <port>
"""
import json, re, sys
from playwright.sync_api import sync_playwright

ROOT, PORT = sys.argv[1], sys.argv[2]
BASE = f'http://127.0.0.1:{PORT}/toki-quest/'
WORLDS = {4: [41, 42, 43, 44], 5: [51, 52, 53, 54], 6: [61, 62, 63, 64]}
CLOSE_ON = {41, 53, 64}


def level_data(w, lid):
    s = open(f'{ROOT}/src/data/levels/world{w}.ts').read()
    body = re.search(rf"export const LEVEL_{lid}: LevelDefinition = \{{(.*?)\n\}};", s, re.S).group(1)
    d = {}
    for step in ['identifyDrift', 'assessRisk', 'chooseCoaching', 'reasoning']:
        cs = re.search(step + r": \{(.*?)\n    \},", body, re.S).group(1)
        cid = re.search(r"correctId: '([^']+)'", cs).group(1)
        ids = re.findall(r"\{ id: '([^']+)', label", cs)
        if not ids:  # RISK_OPTIONS
            ids = ['minor', 'moderate', 'high', 'lethal']
        d[step] = ids.index(cid)
    convo = re.search(rf"const CONVO_{lid}: ConversationDefinition = \{{(.*?)\n\}};", s, re.S).group(1)
    turns = re.findall(r"options: \[(.*?)\n      \],", convo, re.S)
    d['turns'] = [re.findall(r"effect: '(\w+)'", t) for t in turns]
    d['stance'] = re.search(r"stance: '(\w+)'", convo).group(1)
    return d


def pick(pg, idx):
    pg.locator('.choice-list__item').nth(idx).click()
    pg.wait_for_timeout(700)


def play_convo(pg, turns, close):
    assert pg.locator('.convo').count() == 1, 'conversation beat not shown'
    for i, effects in enumerate(turns):
        want = 'closes' if (close and i == 0) else 'opens'
        pg.locator('.convo .choice-list__item').nth(effects.index(want)).click()
        pg.wait_for_timeout(500)
        if pg.locator('.convo__outcome').count():
            break
        pg.click('.beat__cta')
        pg.wait_for_timeout(400)
    out = pg.locator('.convo__outcome .boss-audit__verdict').inner_text()
    pg.click('.beat__cta')
    pg.wait_for_timeout(500)
    return out


def run(lang):
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 390, 'height': 844}, locale='ar' if lang == 'ar' else 'en')
        errs, failed = [], []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('response', lambda r: failed.append((r.url.split('/')[-1], r.status)) if r.status >= 400 and '/audio/' not in r.url and '/story/' not in r.url else None)
        done = {str(i): 100 for i in [1, 2, 3, 4, 5, 6, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35]}
        pg.goto(BASE, wait_until='networkidle')
        pg.wait_for_timeout(500)
        results = []
        for w, ids in WORLDS.items():
            for lid in ids:
                save = {'hasPlayedBefore': True, 'unlockedLevel': 1, 'bestScores': dict(done), 'badges': [],
                        'selectedSkinId': 'teal-classic', 'lang': lang}
                pg.evaluate("(s)=>localStorage.setItem('toki:save',JSON.stringify(s))", save)
                pg.goto(BASE, wait_until='networkidle')
                pg.wait_for_timeout(500)
                pg.click('.title-screen__cta'); pg.wait_for_timeout(1200); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
                pg.locator('.map__node').nth(w - 1).click(); pg.wait_for_timeout(1800)
                pg.click('.door--available'); pg.wait_for_timeout(2000)
                pg.wait_for_selector('.evidence-spot', timeout=5000)
                spots = pg.locator('.evidence-spot')
                for i in range(spots.count()):
                    spots.nth(i).click(); pg.wait_for_timeout(200)
                pg.click('.beat__cta'); pg.wait_for_timeout(500)
                d = level_data(w, lid)
                # beat order since wave 2: drift → risk → coaching → reasoning → conversation → reveal
                pick(pg, d['identifyDrift'])
                pick(pg, d['assessRisk'])
                pick(pg, d['chooseCoaching'])
                pick(pg, d['reasoning'])
                close = lid in CLOSE_ON
                out = play_convo(pg, d['turns'], close)
                pg.wait_for_timeout(600)
                reveal = pg.locator('.beat--reveal').count() == 1
                badge = pg.locator('.badge-earned').count()
                results.append((lid, d['stance'], 'closes' if close else 'opens', out, reveal, badge))
                print(f'[{lang}] {lid} {d["stance"]:9} path={"closes" if close else "opens "} outcome="{out}" reveal={reveal} badge={badge}')
                done[str(lid)] = 100
                if lid % 10 == 4:
                    done[str(lid + 1)] = 100  # boss, to unlock next world
                pg.click('.beat__cta'); pg.wait_for_timeout(600)
        print(f'[{lang}] failed:', failed or 'none')
        print(f'[{lang}] errors:', errs or 'none')
        ok = all(r[4] for r in results) and not errs and not failed
        b.close()
        return ok


ok_en = run('en')
ok_ar = run('ar')
print('ALL OK' if ok_en and ok_ar else 'FAILURES')
sys.exit(0 if ok_en and ok_ar else 1)
