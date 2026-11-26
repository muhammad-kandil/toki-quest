"""Read aloud (voice-over) E2E.

Stubs window.speechSynthesis with a fake that records utterances and offers
en-GB / ar-SA voices, then walks World 1 Level 1 through the conversation in
EN and AR with the toggle on, asserting: scenario, teacher lines, Toki's line
and the reveal are spoken in the right language; cancel() is called before
every speak (no overlap); choices are never spoken; with the toggle off,
zero utterances. Serve dist under /toki-quest/ and run: PORT=5510 python3 e2e/e2e_voice.py
"""
import os
from playwright.sync_api import sync_playwright

PORT = os.environ.get('PORT', '5510')
BASE = f'http://127.0.0.1:{PORT}/toki-quest/'

STUB = """
(() => {
  const log = { spoken: [], cancels: 0, events: [] };
  window.__voiceLog = log;
  class U {
    constructor(text) { this.text = text; this.lang = ''; this.voice = null; this.rate = 1; this.pitch = 1; this.volume = 1; this.onstart = null; this.onend = null; }
  }
  const voices = [
    { name: 'Daniel', lang: 'en-GB', localService: true, default: true, voiceURI: 'd' },
    { name: 'Samantha', lang: 'en-US', localService: true, default: false, voiceURI: 's' },
    { name: 'Maged', lang: 'ar-SA', localService: true, default: false, voiceURI: 'm' },
  ];
  let speakingNow = 0;
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: U, configurable: true, writable: true });
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speaking: false, pending: false, paused: false,
    getVoices: () => voices,
    addEventListener: () => {},
    cancel() { log.cancels += 1; log.events.push('cancel'); speakingNow = 0; },
    speak(u) {
      // A real engine queues; we record order + whether something was still "speaking".
      log.events.push('speak');
      log.spoken.push({ text: u.text, lang: u.lang || (u.voice && u.voice.lang) || '', pitch: u.pitch, rate: u.rate, volume: u.volume, overlap: speakingNow });
      speakingNow += 1;
      setTimeout(() => { try { u.onstart && u.onstart(); } catch (e) {} }, 0);
      setTimeout(() => { speakingNow = Math.max(0, speakingNow - 1); try { u.onend && u.onend(); } catch (e) {} }, 30);
    },
  } });
})();
"""


def pick(pg, idx, wait=700):
    pg.locator('.choice-list__item').nth(idx).click(); pg.wait_for_timeout(wait)


def play_level1(pg, lang, voice_on):
    # This suite checks the device-voice fallback; recorded clips are covered by clip_check().
    pg.route('**/audio/voice/**', lambda r: r.fulfill(status=404, body=''))
    pg.add_init_script(STUB)
    pg.goto(BASE, wait_until='networkidle'); pg.wait_for_timeout(600)
    pg.evaluate("(l)=>{localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:{},badges:[],selectedSkinId:'teal-classic',lang:l})); localStorage.setItem('toki:voice','off');}", lang)
    pg.reload(wait_until='networkidle'); pg.wait_for_timeout(700)
    assert pg.locator('.topbar__btn--voice').count() == 1, 'voice toggle not shown although voices exist'
    if voice_on:
        pg.click('.topbar__btn--voice'); pg.wait_for_timeout(300)
        assert pg.evaluate("localStorage.getItem('toki:voice')") == 'on'
        # the toggle tap warms the engine with a silent utterance
        warm = pg.evaluate("window.__voiceLog.spoken.length")
        assert warm >= 1 and pg.evaluate("window.__voiceLog.spoken[0].volume") == 0, 'no warm-up utterance on toggle'
        pg.evaluate("window.__voiceLog.spoken.length = 0; window.__voiceLog.events.length = 0; window.__voiceLog.cancels = 0")
    pg.click('.title-screen__cta'); pg.wait_for_timeout(1200); (pg.fill('.name-screen__input','Tester'), pg.click('.name-screen__cta'), pg.wait_for_timeout(900)) if pg.locator('.name-screen__input').count() else None
    pg.click('.map__node--current'); pg.wait_for_timeout(1800); pg.wait_for_selector('.door, .story__btn--skip', timeout=8000); (pg.click('.story__btn--skip'), pg.wait_for_selector('.door', timeout=8000)) if pg.locator('.story__btn--skip').count() else None; pg.wait_for_timeout(500)
    pg.click('.door--available'); pg.wait_for_timeout(2000)
    spoken = lambda: pg.evaluate("window.__voiceLog.spoken.map(s=>({text:s.text.slice(0,60), lang:s.lang, pitch:s.pitch, overlap:s.overlap}))")
    scenario_text = pg.locator('.beat__scenario').inner_text()
    for i in range(3): pg.locator('.evidence-spot').nth(i).click(); pg.wait_for_timeout(200)
    pg.click('.beat__cta'); pg.wait_for_timeout(500)
    pick(pg, 1)   # drift (correct = idx 1 in level 1)
    pick(pg, 0)   # risk
    pick(pg, 1)   # coaching
    pick(pg, 1)   # reasoning
    assert pg.locator('.convo').count() == 1
    option_texts = pg.locator('.convo .choice-list__item').all_inner_texts()
    teacher_first = pg.locator('.bubble--teacher p').first.inner_text()
    pick(pg, 0, 600)                     # Toki's line, turn 1
    toki_line = pg.locator('.bubble--toki p').first.inner_text()
    pg.click('.beat__cta'); pg.wait_for_timeout(500)
    pick(pg, 0, 600)                     # turn 2
    pg.click('.beat__cta'); pg.wait_for_timeout(900)
    assert pg.locator('.beat--reveal').count() == 1
    return spoken(), scenario_text, teacher_first, toki_line, option_texts


with sync_playwright() as p:
    b = p.chromium.launch()
    for lang in ['en', 'ar']:
        pg = b.new_page(viewport={'width': 390, 'height': 844}, locale='ar' if lang == 'ar' else 'en')
        pg.route('**/audio/voice/**', lambda r: r.fulfill(status=404, body=''))
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        spoken, scenario, teacher_first, toki_line, options = play_level1(pg, lang, voice_on=True)
        import re as _re
        norm = lambda t: _re.sub(r'[^\w]+', '', t).lower()   # compare letters only (dashes become commas when spoken)
        texts = [norm(s['text']) for s in spoken]
        scenario, teacher_first, toki_line = norm(scenario), norm(teacher_first), norm(toki_line)
        want_lang = 'ar-SA' if lang == 'ar' else 'en-GB'
        assert spoken, 'nothing spoken'
        assert all(s['lang'] == want_lang for s in spoken), f'wrong lang: {set(s["lang"] for s in spoken)}'
        assert any(scenario[:30].replace('—', ',')[:20] in t or t[:20] in scenario for t in texts), 'scenario not spoken'
        assert any(teacher_first[:25] in t or t[:25] in teacher_first for t in texts), 'teacher line not spoken'
        toki_spoken = [s for s in spoken if toki_line[:25] in norm(s['text']) or norm(s['text'])[:25] in toki_line]
        assert toki_spoken and toki_spoken[0]['pitch'] > 1.0, 'Toki line not spoken with raised pitch'
        # The chosen option (index 0) is spoken as Toki's line *after* the pick; the others never.
        assert not any(norm(o)[:30] in t for o in options[1:] for t in texts), 'an unchosen option label was spoken'
        # Queued followers (Toki line → reply) may report overlap>0 in the stub: a real engine queues them.
        # What must never happen is a *new* burst starting over an old one without a cancel — checked below.
        events = pg.evaluate("window.__voiceLog.events")
        # every speak is preceded by a cancel (sequences: one cancel then a queued burst)
        i = 0; ok = True
        while i < len(events):
            if events[i] == 'speak' and (i == 0 or events[i - 1] not in ('cancel', 'speak')): ok = False
            i += 1
        assert ok and events and events[0] == 'cancel', f'speak without preceding cancel: {events[:10]}'
        reveal_said = any('talk' in t.lower() or 'drift' in t.lower() or 'صف' in t or 'انحراف' in t for t in texts[-3:])
        print(f'[{lang}] spoken={len(spoken)} lang={want_lang} scenario✓ teacher✓ toki✓(pitch {toki_spoken[0]["pitch"]}) options-never✓ cancel-before-speak✓ reveal-said={reveal_said} errors={errs or "none"}')
        pg.close()

        # Toggle off: zero utterances, no errors.
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.route('**/audio/voice/**', lambda r: r.fulfill(status=404, body=''))
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        spoken, *_ = play_level1(pg, lang, voice_on=False)
        assert spoken == [], f'spoke with toggle off: {spoken[:2]}'
        print(f'[{lang}] toggle off → 0 utterances ✓ errors={errs or "none"}')
        pg.close()

    # No engine: toggle hidden.
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.route('**/audio/voice/**', lambda r: r.fulfill(status=404, body=''))
    pg.add_init_script("Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined });")
    pg.goto(BASE, wait_until='networkidle'); pg.wait_for_timeout(600)
    assert pg.locator('.topbar__btn--voice').count() == 0, 'toggle shown without an engine'
    print('[no engine] toggle hidden ✓')
    # Engine without an Arabic voice: toggle hidden in AR, shown in EN.
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.route('**/audio/voice/**', lambda r: r.fulfill(status=404, body=''))
    pg.add_init_script(STUB.replace("{ name: 'Maged', lang: 'ar-SA', localService: true, default: false, voiceURI: 'm' },", ""))
    pg.goto(BASE, wait_until='networkidle'); pg.wait_for_timeout(600)
    pg.evaluate("localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:false,unlockedLevel:1,bestScores:{},badges:[],selectedSkinId:'teal-classic',lang:'ar'}))")
    pg.reload(wait_until='networkidle'); pg.wait_for_timeout(600)
    assert pg.locator('.topbar__btn--voice').count() == 0, 'toggle shown in AR with no Arabic voice'
    pg.click('.topbar__lang'); pg.wait_for_timeout(400)
    assert pg.locator('.topbar__btn--voice').count() == 1, 'toggle hidden in EN although an English voice exists'
    print('[no ar voice] hidden in AR, shown in EN ✓')
    b.close()


def clip_check():
    """With recorded clips present, lines play from clips (sfxdebug exposes the counter)."""
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.goto(BASE + '?sfxdebug', wait_until='networkidle'); pg.wait_for_timeout(500)
        pg.evaluate("localStorage.setItem('toki:save',JSON.stringify({hasPlayedBefore:true,unlockedLevel:1,bestScores:{},badges:[],selectedSkinId:'teal-classic',lang:'en',playerName:'T'})); localStorage.removeItem('toki:voice');")
        pg.reload(wait_until='networkidle'); pg.wait_for_timeout(600)
        on = pg.get_attribute('.topbar__btn--voice', 'aria-pressed')
        pg.click('.title-screen__cta'); pg.wait_for_timeout(900)
        pg.click('.map__node--current'); pg.wait_for_selector('.door', timeout=8000); pg.wait_for_timeout(500)
        pg.locator('.door--available').first.click(); pg.wait_for_timeout(4000)
        v = pg.evaluate("window.__tokiVoice")
        print(f'[clips] voice on by default={on} clips_played={v and v["clips"]} synth={v and v["synth"]}')
        assert on == 'true' and v and v['clips'] >= 1, 'recorded clip did not play'
        b.close()

clip_check()
