"""Toki's score — original, playful, grown-up.

Composes every piece as MIDI (pretty_midi), renders it through FluidSynth
with a General MIDI soundfont, and writes loudness-matched MP3s:

  python tools/audio/music/compose.py --sf2 /usr/share/sounds/sf2/FluidR3_GM.sf2 \
      --out public/audio/music [--midi-only DIR]

Style brief: the bounce of a sunny platformer (off-beat stabs, oom-pah
bass with chromatic approach notes, light swing, staccato melody over
jazzy-pop changes) at an adult pace and volume — marimba, clarinet,
pizzicato, muted trumpet, vibraphone, brushes. All melodies and
progressions below were written for this game.

Loops are seamless: each loop is rendered once with its decay tail, the
tail is folded back onto the head, and 0.5 s of the loop's own end/start
is added before/after. The game loops [loopStart, loopStart + period)
inside the buffer, which stays seamless whatever priming delay the MP3
decoder adds.
"""
import argparse, json, math, os, subprocess, tempfile
import numpy as np
import pretty_midi as pm

SR = 44100

# ------------------------------------------------------------------ #
# Music theory helpers                                                 #
# ------------------------------------------------------------------ #
NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
QUAL = {'': [0, 4, 7], 'm': [0, 3, 7], '7': [0, 4, 7, 10], 'm7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11],
        '6': [0, 4, 7, 9], 'm6': [0, 3, 7, 9], 'dim7': [0, 3, 6, 9], 'sus4': [0, 5, 7]}


def pitch(name: str) -> int:
    """'F#4' / 'Bb5' -> MIDI number."""
    letter, rest = name[0], name[1:]
    acc = 0
    while rest and rest[0] in '#b':
        acc += 1 if rest[0] == '#' else -1
        rest = rest[1:]
    return 12 * (int(rest) + 1) + NOTE[letter] + acc


def chord(sym: str):
    """'Bbmaj7' -> (root pitch class, intervals)."""
    root = NOTE[sym[0]]
    i = 1
    while i < len(sym) and sym[i] in '#b':
        root += 1 if sym[i] == '#' else -1
        i += 1
    return root % 12, QUAL[sym[i:]]


def bars_of(changes):
    """['C', 'Am7 D7', ...] -> list of (start_beat, length_beats, symbol)."""
    out, beat = [], 0.0
    for bar in changes:
        syms = bar.split()
        each = 4.0 / len(syms)
        for k, s in enumerate(syms):
            out.append((beat + k * each, each, s))
        beat += 4.0
    return out


def parse_line(bars):
    """Melody bars: 'C5:.5 r:1 G4:1.5~' -> [(beat, dur, pitch, legato)]."""
    notes, beat = [], 0.0
    for b, bar in enumerate(bars):
        pos = 0.0
        for tok in bar.split():
            name, dur = tok.split(':')
            leg = dur.endswith('~')
            d = float(dur.rstrip('~'))
            if name != 'r':
                notes.append((beat + pos, d, pitch(name), leg))
            pos += d
        assert abs(pos - 4.0) < 1e-6, f'bar {b + 1} sums to {pos}: {bar}'
        beat += 4.0
    return notes


# ------------------------------------------------------------------ #
# The pieces                                                           #
# ------------------------------------------------------------------ #
GM = {'marimba': 12, 'vibes': 11, 'glock': 9, 'celesta': 8, 'clarinet': 71, 'flute': 73, 'bassoon': 70,
      'mtrumpet': 59, 'pizz': 45, 'abass': 32, 'nylon': 24, 'epiano': 4, 'piano': 0, 'strings': 48}

PIECES = {
    # Title — C major, 108 bpm. The game's front door: a bright question,
    # an answer, then a bridge that leans on a borrowed iv (Fm6).
    'title': dict(bpm=108, swing=0.6, bass='oompah', comp='offbeat',
        lead=('mtrumpet', 74), double=('vibes', 52, 12), compi=('marimba', 50), bassi=('abass', 78),
        changes=['C', 'Am7', 'Dm7', 'G7', 'C', 'E7', 'Am7 D7', 'Dm7 G7',
                 'F', 'Fm6', 'Em7', 'A7', 'Dm7', 'G7', 'C Am7', 'Dm7 G7'],
        melody=['r:.5 G4:.5 C5:.5 E5:.5 G5:1 E5:.5 C5:.5', 'A5:1 G5:.5 E5:.5 C5:1 r:1',
                'r:.5 F4:.5 A4:.5 C5:.5 F5:1 E5:.5 D5:.5', 'D5:.5 B4:.5 G4:.5 A4:.5 B4:1 r:1',
                'r:.5 G4:.5 C5:.5 E5:.5 G5:1 A5:.5 G5:.5', 'G#5:1 E5:.5 D5:.5 B4:1 r:1',
                'C5:.5 E5:.5 A5:.5 G5:.5 F#5:1 D5:1', 'F5:.5 E5:.5 D5:.5 C5:.5 B4:1 G4:1',
                'A4:.5 C5:.5 F5:1 r:.5 F5:.5 E5:.5 F5:.5', 'Ab5:1.5~ G5:.5 F5:1 r:1',
                'G5:.5 E5:.5 B4:.5 D5:.5 E5:1 r:1', 'C#5:.5 E5:.5 G5:.5 A5:.5 G5:1 E5:1',
                'F5:1 A5:.5 F5:.5 D5:1 C5:.5 D5:.5', 'B4:.5 D5:.5 F5:.5 A5:.5 G5:2~',
                'E5:.5 D5:.5 C5:.5 E5:.5 A5:1 G5:1', 'F5:.5 E5:.5 D5:.5 B4:.5 C5:1 G4:1']),
    # Worlds 1–3 — F major, 104 bpm. Clarinet and marimba over pizzicato
    # stabs; the Bbm6 in bar 8 is the wink.
    'warm': dict(bpm=104, swing=0.62, bass='oompah', comp='twofour',
        lead=('clarinet', 70), double=('marimba', 48, 12), compi=('pizz', 52), bassi=('abass', 78),
        changes=['F', 'Dm7', 'Gm7', 'C7', 'F', 'F7', 'Bb', 'Bbm6',
                 'Am7', 'D7', 'Gm7', 'C7', 'F D7', 'Gm7 C7', 'F', 'C7'],
        melody=['C5:.5 A4:.5 C5:.5 F5:.5 E5:1 C5:1', 'D5:.5 F5:.5 A5:.5 F5:.5 D5:1 r:1',
                'r:.5 Bb4:.5 D5:.5 F5:.5 G5:1 F5:.5 D5:.5', 'E5:1.5~ C5:.5 Bb4:1 r:1',
                'A4:.5 C5:.5 F5:.5 A5:.5 G5:.5 F5:.5 C5:1', 'Eb5:1 D5:.5 C5:.5 A4:1 r:1',
                'Bb4:.5 D5:.5 F5:.5 Bb5:.5 A5:1 F5:1', 'Db5:1 F5:.5 Db5:.5 C5:2~',
                'C5:.5 E5:.5 G5:.5 E5:.5 C5:1 A4:1', 'F#5:.5 A5:.5 F#5:.5 D5:.5 C5:1 r:1',
                'Bb4:.5 D5:.5 G5:1 F5:.5 D5:.5 Bb4:1', 'C5:.5 E5:.5 G5:.5 Bb5:.5 A5:1 G5:1',
                'F5:1 C5:1 F#5:1 D5:1', 'G5:.5 F5:.5 D5:.5 Bb4:.5 E5:1 C5:1',
                'F5:.5 A5:.5 C6:.5 A5:.5 F5:1 r:1', 'E5:.5 G5:.5 Bb5:.5 G5:.5 E5:.5 D5:.5 C5:1']),
    # The map — G major, 112 bpm. A walking bass under muted trumpet and
    # pizzicato: setting off somewhere.
    'map': dict(bpm=112, swing=0.6, bass='walk', comp='offbeat',
        lead=('mtrumpet', 70), double=('pizz', 56, 0), compi=('nylon', 46), bassi=('abass', 76),
        changes=['G', 'G', 'C', 'C', 'G', 'E7', 'A7', 'D7',
                 'G', 'G7', 'C', 'Cm6', 'G Em7', 'A7 D7', 'G E7', 'Am7 D7'],
        melody=['D5:1 B4:.5 D5:.5 G5:1 r:1', 'F#5:.5 G5:.5 A5:.5 G5:.5 E5:1 D5:1',
                'E5:1 C5:.5 E5:.5 G5:1 r:1', 'A5:.5 G5:.5 E5:.5 C5:.5 D5:2~',
                'D5:1 B4:.5 D5:.5 G5:1 B5:1', 'G#5:1 B5:.5 G#5:.5 E5:1 D5:1',
                'C#5:.5 E5:.5 G5:.5 E5:.5 A5:1 G5:1', 'F#5:.5 E5:.5 D5:.5 C5:.5 A4:2~',
                'B4:.5 D5:.5 G5:.5 B5:.5 A5:1 G5:1', 'F5:1 D5:.5 B4:.5 G4:1 r:1',
                'E5:.5 G5:.5 C6:1 B5:.5 A5:.5 G5:1', 'Eb5:1.5~ C5:.5 A4:1 r:1',
                'D5:1 G5:1 E5:1 B4:1', 'C#5:.5 E5:.5 A5:1 C5:1 F#5:1',
                'G5:1 D5:1 G#5:1 B5:1', 'C6:.5 B5:.5 A5:.5 G5:.5 F#5:1 D5:1']),
    # Worlds 4–6 — Bb major, 100 bpm. Flute and vibraphone, longer lines,
    # electric piano holding the harmony: thinking time, still light.
    'thoughtful': dict(bpm=100, swing=0.58, bass='oompah', comp='halves', legato=True,
        lead=('flute', 66), double=('vibes', 46, 0), compi=('epiano', 44), bassi=('abass', 72),
        changes=['Bbmaj7', 'Gm7', 'Cm7', 'F7', 'Dm7', 'G7', 'Cm7', 'F7',
                 'Ebmaj7', 'Edim7', 'Bb', 'G7', 'Cm7', 'F7', 'Bb Gm7', 'Cm7 F7'],
        melody=['D5:1.5 F5:.5 A5:1 F5:1', 'G5:1.5 F5:.5 D5:2', 'Eb5:1 G5:.5 Bb5:.5 G5:1 Eb5:1',
                'F5:1.5 Eb5:.5 C5:2', 'F5:1 A5:.5 F5:.5 D5:1 C5:1', 'B4:1.5 D5:.5 F5:2',
                'Eb5:.5 D5:.5 C5:.5 Eb5:.5 G5:1 F5:1', 'A4:1 C5:1 Eb5:1 D5:1',
                'G5:1.5 Bb5:.5 D6:1 Bb5:1', 'C6:1.5 Bb5:.5 G5:2', 'F5:1 D5:.5 F5:.5 Bb5:2',
                'B5:1 G5:1 F5:1 D5:1', 'Eb5:1.5 G5:.5 C6:1 Bb5:1', 'A5:1.5 F5:.5 Eb5:1 C5:1',
                'D5:1 F5:1 Bb5:1 G5:1', 'F5:.5 Eb5:.5 C5:.5 Eb5:.5 A4:2']),
    # Worlds 7–8 — D Dorian, 100 bpm. Bassoon and pizzicato with a marimba
    # pulse: steadier, a little sly, never dark.
    'serious': dict(bpm=100, swing=0.56, bass='oompah', comp='twofour',
        lead=('bassoon', 74), double=('pizz', 54, 12), compi=('marimba', 46), bassi=('abass', 74),
        changes=['Dm', 'Dm', 'Gm', 'A7', 'Dm', 'Bb', 'Gm6', 'A7',
                 'F', 'C', 'Dm', 'A7', 'Bb', 'Gm6', 'Dm A7', 'Dm A7'],
        melody=['D4:.5 F4:.5 A4:.5 D5:.5 C5:1 A4:1', 'B4:.5 A4:.5 F4:.5 D4:.5 E4:1 r:1',
                'G4:.5 Bb4:.5 D5:.5 G5:.5 F5:1 D5:1', 'E5:.5 C#5:.5 A4:.5 E4:.5 G4:1 r:1',
                'F4:.5 A4:.5 D5:1 E5:.5 F5:.5 E5:1', 'D5:1 Bb4:.5 F4:.5 Bb4:1 r:1',
                'E5:.5 D5:.5 Bb4:.5 G4:.5 E4:1 G4:1', 'A4:.5 C#5:.5 E5:.5 G5:.5 A5:2~',
                'A5:1 F5:.5 C5:.5 A4:1 C5:1', 'G5:1 E5:.5 C5:.5 G4:1 r:1',
                'F5:.5 E5:.5 D5:.5 A4:.5 D5:1 F5:1', 'E5:.5 G5:.5 E5:.5 C#5:.5 A4:2~',
                'D5:.5 F5:.5 Bb5:.5 F5:.5 D5:1 Bb4:1', 'G4:.5 Bb4:.5 E5:.5 G5:.5 E5:1 D5:1',
                'F5:1 D5:1 E5:1 C#5:1', 'D5:.5 E5:.5 F5:.5 D5:.5 A4:1 r:1']),
}

STINGERS = {
    # A room finished: a marimba run up and a soft V–I.
    'level-complete': dict(bpm=108, parts=[
        ('marimba', 64, ['G4:.5 C5:.5 E5:.5 G5:.5 C6:2~ r:0']),
        ('vibes', 44, ['r:2 C5:2~']), ('vibes', 40, ['r:2 E5:2~']), ('vibes', 38, ['r:2 G5:2~']),
        ('pizz', 58, ['G3:.5 r:1.5 C3:2']),
    ], cymbal=2.0),
    # A badge: a quick sparkle up and an open major-ninth.
    'badge': dict(bpm=120, parts=[
        ('glock', 52, ['E5:.25 G5:.25 C6:.25 E6:.25 r:3']),
        ('vibes', 48, ['r:1 C5:3~']), ('vibes', 44, ['r:1 E5:3~']), ('vibes', 42, ['r:1 D6:3~']),
        ('marimba', 50, ['r:1 C4:3~']),
    ], cymbal=1.0),
    # A world complete: a short, warm fanfare that lands on a big F–C.
    'world-complete': dict(bpm=104, parts=[
        ('mtrumpet', 74, ['G4:.5 C5:.5 E5:.5 G5:.5 F5:.5 E5:.5 D5:.5 E5:.5', 'C6:4~']),
        ('clarinet', 60, ['E4:.5 G4:.5 C5:.5 E5:.5 D5:.5 C5:.5 B4:.5 C5:.5', 'E5:4~']),
        ('pizz', 60, ['C3:1 G3:1 F3:1 G3:1', 'C3:4']),
        ('marimba', 54, ['r:2 A4:.5 C5:.5 F5:.5 A5:.5', 'G5:.5 E5:.5 C5:.5 G4:.5 C5:2~']),
        ('vibes', 40, ['r:4', 'C5:4~']), ('vibes', 38, ['r:4', 'G5:4~']),
    ], cymbal=4.0),
}


# ------------------------------------------------------------------ #
# Arrangement                                                          #
# ------------------------------------------------------------------ #
def swing_at(beat, amount):
    """Off-beat 8ths sit late (amount = where the 'and' falls, 0.5 = straight)."""
    whole = math.floor(beat + 1e-9)
    frac = beat - whole
    if abs(frac - 0.5) < 1e-6:
        return whole + amount
    return beat


def add(inst, beat, dur, p, vel, spb, swing, legato=False, art=0.62):
    s = swing_at(beat, swing) * spb
    e = s + max(0.06, (dur * (0.96 if legato else art)) * spb)
    inst.notes.append(pm.Note(velocity=int(max(1, min(127, vel))), pitch=int(p), start=s, end=e))


def arrange(spec, reps=1):
    nb = len(spec['changes'])
    period_beats = nb * 4.0
    # FluidSynth starts notes on 64-sample blocks. A loop whose length is a
    # whole number of blocks repeats sample-for-sample, so the tempo is
    # nudged (by well under 0.1 bpm) to make it one.
    target = 64 * round(period_beats * 60.0 / spec['bpm'] * SR / 64)
    bpm = period_beats * 60.0 * SR / target
    sw = spec['swing']
    spb = 60.0 / bpm
    mid = pm.PrettyMIDI(initial_tempo=bpm)
    def inst(key, drum=False):
        i = pm.Instrument(program=GM.get(key, 0) if not drum else 40, is_drum=drum, name=key)
        mid.instruments.append(i)
        return i
    lead_k, lead_v = spec['lead']; dbl_k, dbl_v, dbl_shift = spec['double']
    comp_k, comp_v = spec['compi']; bass_k, bass_v = spec['bassi']
    lead, dbl, comp, bass, drums = inst(lead_k), inst(dbl_k), inst(comp_k), inst(bass_k), inst('drums', True)
    legato = spec.get('legato', False)
    mel = parse_line(spec['melody'])
    ch = bars_of(spec['changes'])
    for r in range(reps):
        rng = np.random.default_rng(7)      # same 'human' variation every pass, so the loop repeats exactly
        off = r * period_beats
        # Melody, with the double an octave up (or unison) and quieter. The
        # second time through each 8-bar half the double drops out, so the
        # loop breathes.
        for (b, d, p, leg) in mel:
            accent = 6 if (b % 4) in (0.0, 2.0) else 0
            human = int(rng.integers(-4, 5))
            add(lead, off + b, d, p, lead_v + accent + human, spb, sw, legato or leg)
            if (b // 32) % 2 == 0 or dbl_shift == 0:
                add(dbl, off + b, d, p + dbl_shift, dbl_v + human, spb, sw, legato or leg, art=0.5)
        # Harmony + bass per chord span.
        for k, (start, length, sym) in enumerate(ch):
            root, iv = chord(sym)
            nxt_root, _ = chord(ch[(k + 1) % len(ch)][2])
            voicing = [60 + ((root + i - 0) % 12) for i in iv]          # close voicing C4..B4
            voicing = sorted(v if v >= 55 else v + 12 for v in voicing)
            s0 = off + start
            if spec['comp'] == 'offbeat':
                hits = [h for h in (0.5, 1.5, 2.5, 3.5) if h < length]
                for h in hits:
                    for v in voicing: add(comp, s0 + h, 0.5, v, comp_v - (6 if h in (0.5, 2.5) else 0), spb, sw, art=0.45)
            elif spec['comp'] == 'twofour':
                for h in (1.0, 3.0):
                    if h < length:
                        for v in voicing: add(comp, s0 + h, 0.5, v, comp_v, spb, sw, art=0.5)
            else:  # halves — sustained
                for h in (0.0, 2.0):
                    if h < length:
                        for v in voicing: add(comp, s0 + h, 2.0, v, comp_v, spb, sw, legato=True)
            broot = 36 + root if root <= 7 else 24 + root                # E1..G2 range
            fifth = broot + 7
            approach = (36 + nxt_root if nxt_root <= 7 else 24 + nxt_root) - 1   # chromatic from below
            if spec['bass'] == 'walk':
                third = broot + iv[1]
                line = [broot, third, fifth, approach] if length >= 4 else [broot, approach]
                for j, p in enumerate(line):
                    add(bass, s0 + j * (length / len(line)), length / len(line), p, bass_v - (8 if j % 2 else 0), spb, sw, art=0.8)
            else:
                add(bass, s0, 0.5, broot, bass_v, spb, sw, art=0.7)
                if length >= 4:
                    add(bass, s0 + 2.0, 0.5, fifth, bass_v - 8, spb, sw, art=0.7)
                    add(bass, s0 + 3.5, 0.5, approach, bass_v - 14, spb, sw, art=0.6)
                else:
                    add(bass, s0 + 1.5, 0.5, approach, bass_v - 14, spb, sw, art=0.6)
        # Brushes: soft kick on 1, brush taps on 2 and 4, swung hats.
        for bar in range(nb):
            s0 = off + bar * 4
            add(drums, s0, 0.5, 36, 46, spb, sw)
            for h in (1.0, 3.0):
                add(drums, s0 + h, 0.5, 38, 38 + int(rng.integers(-3, 4)), spb, sw)
                add(drums, s0 + h, 0.5, 44, 30, spb, sw)
            for h in (0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5):
                add(drums, s0 + h, 0.25, 42, 22 + (6 if h % 1 == 0.5 else 0) + int(rng.integers(-3, 4)), spb, sw)
            if bar % 8 == 7:  # gentle turnaround fill
                for h in (3.0, 3.5):
                    add(drums, s0 + h, 0.25, 38, 44, spb, sw)
    return mid, period_beats * spb


def arrange_stinger(spec):
    bpm = spec['bpm']; spb = 60.0 / bpm
    mid = pm.PrettyMIDI(initial_tempo=bpm)
    total = 0.0
    for key, vel, bars in spec['parts']:
        i = pm.Instrument(program=GM[key], name=key)
        beat = 0.0
        for bar in bars:
            pos = 0.0
            for tok in bar.split():
                name, dur = tok.split(':')
                leg = dur.endswith('~'); d = float(dur.rstrip('~'))
                if name != 'r' and d > 0:
                    add(i, beat + pos, d, pitch(name), vel, spb, 0.5, legato=leg)
                pos += d
            beat += max(pos, 4.0) if len(bars) > 1 else pos
        total = max(total, beat * spb)
        mid.instruments.append(i)
    if spec.get('cymbal'):
        d = pm.Instrument(program=40, is_drum=True, name='drums')
        add(d, spec['cymbal'] - 0.02 if spec['cymbal'] > 1 else 0, 1.0, 49, 34, spb, 0.5)   # soft crash at the landing
        mid.instruments.append(d)
    return mid, total


# ------------------------------------------------------------------ #
# Render                                                               #
# ------------------------------------------------------------------ #
PAN = {'drums': 64, 'abass': 64, 'marimba': 44, 'pizz': 84, 'nylon': 44, 'epiano': 54, 'vibes': 82,
       'mtrumpet': 60, 'clarinet': 62, 'flute': 66, 'bassoon': 58, 'glock': 76}
def render(mid: pm.PrettyMIDI, sf2: str, tail: float = 2.5) -> np.ndarray:
    """Stereo float32 [n, 2] via pyfluidsynth, with per-part pan and reverb send."""
    import fluidsynth
    fs = fluidsynth.Synth(samplerate=float(SR), gain=0.45)
    # Reverb is time-invariant, so passes stay identical; the chorus has
    # free-running LFOs that would make every pass slightly different.
    try:
        fs.set_chorus_level(0.0)
    except Exception:
        pass
    sfid = fs.sfload(sf2)
    events = []
    for ch, inst in enumerate(mid.instruments):
        chan = 9 if inst.is_drum else (ch if ch < 9 else ch + 1)
        if inst.is_drum:
            if fs.program_select(9, sfid, 128, 40) != 0:     # brush kit, else standard
                fs.program_select(9, sfid, 128, 0)
        else:
            fs.program_select(chan, sfid, 0, inst.program)
        fs.cc(chan, 10, PAN.get(inst.name, 64))
        fs.cc(chan, 91, 38 if not inst.is_drum else 30)
        fs.cc(chan, 7, 110)
        fs.cc(chan, 93, 0)                                      # no chorus send
        for n in inst.notes:
            events.append((n.start, 1, chan, n.pitch, n.velocity))
            events.append((n.end, 0, chan, n.pitch, 0))
    events.sort(key=lambda e: (e[0], e[1]))
    out, pos = [], 0                       # integer sample cursor: no float drift between passes
    for (when, on, chan, p, v) in events:
        n = int(round(when * SR)) - pos
        if n > 0:
            out.append(np.asarray(fs.get_samples(n), dtype=np.int16).reshape(-1, 2)); pos += n
        if on: fs.noteon(chan, p, v)
        else: fs.noteoff(chan, p)
    out.append(np.asarray(fs.get_samples(int(tail * SR)), dtype=np.int16).reshape(-1, 2))
    fs.delete()
    return np.concatenate(out).astype(np.float32) / 32768.0


def loudness_match(x: np.ndarray, target: float) -> np.ndarray:
    import pyloudnorm as pyln
    lufs = pyln.Meter(SR).integrated_loudness(x)
    y = x * (10 ** ((target - lufs) / 20.0))
    peak = np.max(np.abs(y))
    return y / peak * 0.89 if peak > 0.89 else y     # ≈ −1 dBFS ceiling


def to_mp3(x: np.ndarray, path: str):
    import soundfile as sf
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'x.wav'); sf.write(w, x, SR, subtype='PCM_16')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-codec:a', 'libmp3lame', '-b:a', '96k', path], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sf2', help='General MIDI soundfont (.sf2)')
    ap.add_argument('--out', default='public/audio/music')
    ap.add_argument('--midi-only', help='write .mid files here and stop')
    a = ap.parse_args()
    PRE = 0.5
    loops, listing = {}, {}
    for name, spec in PIECES.items():
        one, period = arrange(spec, reps=1)
        listing[name] = dict(bpm=spec['bpm'], bars=len(spec['changes']), seconds=round(period, 2),
                             instruments=[i.name for i in one.instruments])
        if a.midi_only:
            os.makedirs(a.midi_only, exist_ok=True); one.write(os.path.join(a.midi_only, f'{name}.mid')); continue
        # One pass plus its decay tail; the tail (what still rings after the
        # last bar) is folded onto the head, which is what continuous playback
        # would sound like. Pre-/post-roll are copied from the loop itself, so
        # the file is periodic by construction and the seam cannot click.
        audio = render(one, a.sf2, tail=4.0)
        Ps = int(round(period * SR))
        loop = audio[:Ps].copy()
        tail = audio[Ps:]
        loop[:len(tail)] += tail[:Ps]
        loop = loudness_match(loop, -20.0)
        pre = int(PRE * SR)
        seg = np.concatenate([loop[-pre:], loop, loop[:pre]])
        os.makedirs(a.out, exist_ok=True)
        to_mp3(seg, os.path.join(a.out, f'{name}.mp3'))
        loops[name] = {'loopStart': PRE, 'period': round(period, 6)}
        print(f'{name}: {period:.2f}s loop, {len(spec["changes"])} bars @ {spec["bpm"]} bpm', flush=True)
    for name, spec in STINGERS.items():
        mid, dur = arrange_stinger(spec)
        listing[name] = dict(bpm=spec['bpm'], seconds=round(dur, 2), instruments=[i.name for i in mid.instruments])
        if a.midi_only:
            mid.write(os.path.join(a.midi_only, f'{name}.mid')); continue
        audio = render(mid, a.sf2, tail=1.8)
        n = int((dur + 1.6) * SR); audio = audio[:n]
        f = min(len(audio), int(0.4 * SR)); audio[-f:] *= np.linspace(1, 0, f)[:, None]
        to_mp3(loudness_match(audio, -16.0), os.path.join(a.out, f'{name}.mp3'))
        print(f'{name}: {dur:.2f}s stinger', flush=True)
    if a.midi_only:
        print(json.dumps(listing, indent=1)); return
    json.dump({'loops': loops}, open(os.path.join(a.out, 'loops.json'), 'w'), indent=1)
    sf2_name = os.path.basename(a.sf2)
    json.dump({
        'composition': 'Original score written for Toki\'s Coaching Quest (tools/audio/music/compose.py).',
        'soundfont': sf2_name,
        'soundfont_licence': 'MIT (FluidR3_GM by Frank Wen, as packaged by Debian fluid-soundfont-gm)'
            if 'FluidR3' in sf2_name else 'see soundfont source',
        'renderer': 'FluidSynth (LGPL-2.1, used as a build tool; not shipped)',
        'pieces': listing,
    }, open(os.path.join(a.out, 'credits.json'), 'w'), indent=1)


if __name__ == '__main__':
    main()
