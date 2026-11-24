"""Screenshot the first-visit title screen (promise line visible). PORT/SHOTS env as in director_play.py."""
import os
from playwright.sync_api import sync_playwright
PORT = os.environ.get('PORT', '5450'); S = os.environ.get('SHOTS', '/tmp/dir-shots2')
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(f'http://127.0.0.1:{PORT}/toki-quest/', wait_until='networkidle')
    pg.evaluate("localStorage.clear()"); pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
    pg.screenshot(path=f'{S}/first-title.png', clip={'x': 0, 'y': 380, 'width': 390, 'height': 400})
    print('promise:', pg.locator('.title-screen__promise').inner_text())
    b.close()
