import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useSound } from '../../audio/useSound';
import { sfx } from '../../audio/sfx';
import { SKINS } from '../../data/skins';
import { adventures, adventuresAt, locations, getTermPass, universeClassroom, ENABLE_CUSTOMISATION, TOKI_IN_TEACHER_GAME, USING_FIXTURE, shopItem } from '../content';
import { DECOR_SLOTS } from '../dev/shopFixture';
import type { GameSave } from '../engine/save';
import type { UState } from '../engine/universe';
import { S, fmt } from '../strings';
import { NoteIcon, asset, useToast } from '../ui';
import type { Adventure, Location, LocationKind } from '../types';
import type { Screen } from '../TeacherApp';
import { LangToggle } from './TitleScreen';

declare const __TEACHER_CAMPUS_ART__: boolean;
const HAS_CAMPUS_ART = typeof __TEACHER_CAMPUS_ART__ !== 'undefined' && __TEACHER_CAMPUS_ART__;

/** First unlocked adventure not yet taught. */
export function nextAdventure(save: GameSave): Adventure | undefined {
  return adventures().find((a) => save.unlocked.includes(a.id) && !save.completed[a.id]);
}

type PinState = 'next' | 'done' | 'locked' | 'open';
function pinState(loc: Location, save: GameSave, next?: Adventure): PinState {
  if (loc.kind !== 'classroom') return 'open';
  if (next && next.location === loc.id) return 'next';
  // Missions are a network: any opened, untaught mission here makes the classroom available.
  if (adventuresAt(loc.id).some((a) => save.unlocked.includes(a.id) && !save.completed[a.id])) return 'open';
  if (adventuresAt(loc.id).some((a) => save.completed[a.id])) return 'done';
  return 'locked';
}

const KIND_GLYPH: Record<LocationKind, string> = { classroom: '✎', staffroom: '◆', library: '❒', community: '✉', office: '★', yard: '❀', shop: '⌂' };

/** Ms. Mariam's outfit colour (shop) for her portrait ring. */
export function mariamRing(save: GameSave): string | undefined {
  const it = save.placed.mariam ? shopItem(save.placed.mariam) : undefined;
  return it?.colour;
}

/** Campus places in the universe build: the classroom (the universe), staff room, library, community, shop. */
const UNIVERSE_KINDS: LocationKind[] = ['staffroom', 'library', 'community', 'shop'];

export function CampusScreen({ save, ustate, go, onSession, onCoach, onReset }: {
  save: GameSave; ustate: UState; go: (s: Screen) => void; onSession: () => void; onCoach: () => void; onReset: () => void;
}) {
  const { tx } = useLocale();
  const toast = useToast();
  const [settings, setSettings] = useState(false);
  const next = undefined as Adventure | undefined;
  const room = universeClassroom();
  const locs = locations().filter((l) => (room && l.id === room.id) || UNIVERSE_KINDS.includes(l.kind));
  const tp = getTermPass();
  const tokiItem = save.placed.toki ? shopItem(save.placed.toki) : undefined;
  const skin = SKINS.find((k) => k.id === (tokiItem?.skin ?? 'teal-classic')) ?? SKINS[0];
  const hat = save.placed['toki-hat'] ? shopItem(save.placed['toki-hat']) : undefined;
  const acc = save.placed['mariam-acc'] ? shopItem(save.placed['mariam-acc']) : undefined;
  const decor = DECOR_SLOTS.map((slot) => (save.placed[slot] ? shopItem(save.placed[slot]) : undefined)).filter(Boolean);
  const firstClass = locs.find((l) => l.kind === 'classroom');
  // The next place pulses once per visit, not continuously (BACKLOG E1-4).
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const id = window.setTimeout(() => setPulse(false), 4800); return () => window.clearTimeout(id); }, []);
  // Notes chip: one bump when the balance grows.
  const prevNotes = useRef(save.notes);
  const [gain, setGain] = useState(false);
  useEffect(() => {
    if (save.notes > prevNotes.current) { setGain(true); const id = window.setTimeout(() => setGain(false), 450); prevNotes.current = save.notes; return () => window.clearTimeout(id); }
    prevNotes.current = save.notes;
  }, [save.notes]);

  const open = (loc: Location) => {
    sfx.play('tap');
    switch (loc.kind) {
      case 'classroom': onSession(); return;
      case 'staffroom': go('staffroom'); return;
      case 'library': go('library'); return;
      case 'community': go('community'); return;
      case 'shop': go('shop'); return;
      default: toast(tx(S.yardMoment)); return;
    }
  };

  const initial = (save.playerName || 'M').trim().charAt(0).toUpperCase();
  const ring = mariamRing(save);

  return (
    <main className="ts-campus">
      <div className="ts-map">
        <div className="ts-map__frame">
          {HAS_CAMPUS_ART
            ? <img className="ts-map__art" src={asset('art/campus.jpg')} alt="" />
            : <FallbackCampus locs={locs} />}
          {locs.map((l) => {
            const st: PinState = l.kind === 'classroom' ? 'next' : pinState(l, save, next);
            const cls = 't-pin' + (st === 'next' ? ' t-pin--next' : st === 'done' ? ' t-pin--done' : st === 'locked' ? ' t-pin--locked' : '')
              + (st === 'next' && !pulse ? ' ts-pin--still' : '') + (l.x < 16 ? ' ts-pin--start' : l.x > 84 ? ' ts-pin--end' : '');
            return (
              <button key={l.id} type="button" className={cls} data-loc={l.id} data-state={st}
                style={{ left: l.x + '%', top: l.y + '%' }} onClick={() => open(l)} aria-disabled={st === 'locked' || undefined}
                aria-label={tx(l.name) + (st === 'locked' ? `, ${tx(S.locked)}` : st === 'next' ? `, ${tx(S.nextLesson)}` : st === 'done' ? `, ${tx(S.done)}` : '')}>
                <span className="t-pin__head" aria-hidden="true">{KIND_GLYPH[l.kind]}</span>
                {st === 'locked' && <span className="t-pin__badge t-pin__badge--lock" aria-hidden="true" />}
                {st === 'done' && <span className="t-pin__badge" aria-hidden="true">✓</span>}
                <span className="t-pin__label">{l.kind === 'classroom' ? tx(S.classroomPin) : tx(l.name)}</span>
                {st === 'next' && <span className="t-pin__flag">{ustate.inSession ? tx(S.resumeFlag) : fmt(tx(S.sessionN), { n: ustate.session })}</span>}
              </button>
            );
          })}
          {firstClass && decor.length > 0 && (
            <div className="ts-map__decor" style={{ left: firstClass.x + '%', top: firstClass.y + '%' }} aria-hidden="true">
              {decor.map((d) => <span key={d!.id}>{d!.icon}</span>)}
            </div>
          )}
          {TOKI_IN_TEACHER_GAME && (
            <div className="ts-map__toki">
              <img src={skin.image} alt={tx(skin.label)} />
              {hat && <span className="ts-map__hat" aria-hidden="true">{hat.icon}</span>}
            </div>
          )}
        </div>

        {/* HUD: top rows */}
        <div className="ts-hud-top">
          <div className="ts-hud-line">
            <div className="t-hud-card t-hud-card--pill ts-classes">
              <span className="ts-classes__label">{tx(S.universeName)}</span>
              <span className="t-chip t-chip--dot t-chip--insight">{fmt(tx(S.sessionN), { n: ustate.session })}</span>
            </div>
            <button type="button" className="t-btn t-btn--icon ts-settings-btn" aria-label={tx(S.settings)} onClick={() => { sfx.play('tap'); setSettings(true); }}>⚙</button>
          </div>
          <div className="ts-hud-line">
            <button type="button" className="t-hud-card t-hud-card--pill ts-toolkit-btn" onClick={() => { sfx.play('tap'); go('staffroom'); }}>
              <span className="ts-disc" aria-hidden="true">◆</span>
              {tx(S.toolkit)} · <span className="t-num">{fmt(tx(S.toolkitFound), { n: save.toolkit.length })}</span>
            </button>
            <span className="ts-hud-end">
              {ENABLE_CUSTOMISATION && (
                <button type="button" className="t-pass-btn ts-pass-btn" onClick={() => { sfx.play('tap'); go('pass'); }}>
                  ▲ {tx(S.termPass)} <span className="t-num">{save.pass.stage}/{tp.stages.length}</span>
                </button>
              )}
              {ENABLE_CUSTOMISATION && (
                <span className={'t-notes-chip ts-notes' + (gain ? ' t-notes-chip--gain' : '')} aria-label={fmt(tx(S.notesAria), { n: save.notes })}>
                  <NoteIcon /><span className="t-num">{save.notes}</span>
                </span>
              )}
            </span>
          </div>
        </div>

        {/* HUD: bottom cards */}
        <div className="ts-hud-bottom">
          <div className="t-hud-card ts-teacher">
            <span className="t-portrait ts-portrait" style={ring ? { borderColor: ring } : undefined} aria-hidden="true">
              {initial}{acc && <i className="ts-portrait__acc">{acc.icon}</i>}
            </span>
            <span className="ts-teacher__txt">
              <strong className="ts-teacher__name">{save.playerName || tx(S.teacher)}</strong>
              <span className="ts-teacher__meta">{tx(S.gradeSeven)}</span>
              <span className="ts-teacher__meta">{fmt(tx(S.toolkitFound), { n: save.toolkit.length })}</span>
            </span>
          </div>
          <div className="t-hud-card ts-clock">
            <span className="t-eyebrow">{tx(S.gradeSeven)}</span>
            <span className="ts-clock__day t-num">{fmt(tx(S.sessionN), { n: ustate.session })}</span>
            <span className="ts-clock__period">
              {(['launch', 'facilitate', 'extend'] as const).map((p) => <i key={p} className={ustate.inSession && p === ustate.phase ? 'is-on' : ''} />)}
              {ustate.inSession ? tx(S.stageShort[ustate.phase]) : fmt(tx(S.sessionsDone), { n: ustate.history.length })}
            </span>
          </div>
        </div>
      </div>

      {settings && <Settings onClose={() => setSettings(false)} onCoach={onCoach} onReset={onReset} onA11y={() => { setSettings(false); go('a11y'); }} />}
    </main>
  );
}

function Settings({ onClose, onCoach, onReset, onA11y }: { onClose: () => void; onCoach: () => void; onReset: () => void; onA11y: () => void }) {
  const { tx } = useLocale();
  const { on, toggle } = useSound();
  const [armed, setArmed] = useState(false);
  return (
    <div className="ts-modal" role="dialog" aria-modal="true" aria-label={tx(S.settings)}>
      <div className="ts-modal__scrim" onClick={onClose} />
      <div className="t-sheet ts-modal__sheet">
        <div className="t-sheet__grip" />
        <div className="t-stack--3">
          <h2>{tx(S.settings)}</h2>
          <div className="ts-row ts-row--between"><span>{tx(S.language)}</span><LangToggle /></div>
          <div className="ts-row ts-row--between">
            <span>{tx(S.sound)}</span>
            <button type="button" className="t-btn t-btn--ghost" aria-pressed={on} onClick={toggle}>{on ? tx(S.on) : tx(S.off)}</button>
          </div>
          <button type="button" className="t-btn t-btn--ghost t-btn--block ts-open-a11y" onClick={onA11y}>{tx(S.a11yTitle)}</button>
          <button type="button" className="t-btn t-btn--ghost t-btn--block" onClick={onCoach}>{tx(S.switchToCoach)}</button>
          <button type="button" className={'t-btn t-btn--ghost t-btn--block' + (armed ? ' ts-danger' : '')}
            onClick={() => { if (armed) onReset(); else { setArmed(true); window.setTimeout(() => setArmed(false), 4000); } }}>
            {armed ? tx(S.resetConfirm) : tx(S.resetProgress)}
          </button>
          <div className="t-card t-card--inset ts-about">
            <h3 className="ts-h-md">{tx(S.about)}</h3>
            <p className="ts-hint">{tx(S.contentPending)}</p>
            {USING_FIXTURE && <span className="t-chip t-chip--placeholder">{tx(S.verifyNote)}</span>}
          </div>
          <button type="button" className="t-btn t-btn--block" onClick={onClose}>{tx(S.close)}</button>
        </div>
      </div>
    </div>
  );
}

/** Clean SVG campus used until public/art/campus.jpg exists: a lawn, paths, and a building under each pin. */
function FallbackCampus({ locs }: { locs: Location[] }) {
  const W = 300, H = 400;
  const bld = (l: Location) => {
    const x = (l.x / 100) * W, y = (l.y / 100) * H + 6;
    const roof = l.kind === 'library' ? 'var(--t-blue)' : l.kind === 'office' ? 'var(--t-rose)' : l.kind === 'staffroom' ? 'var(--t-orange)' : l.kind === 'community' ? 'var(--t-teal)' : l.kind === 'shop' ? 'var(--t-gold)' : 'var(--t-indigo)';
    if (l.kind === 'yard') {
      return (
        <g key={l.id}>
          <rect x={x - 50} y={y - 20} width="100" height="44" rx="6" fill="var(--t-teal)" opacity=".4" />
          <circle cx={x} cy={y + 2} r="10" fill="none" stroke="var(--t-panel)" strokeWidth="2" />
          <line x1={x} y1={y - 20} x2={x} y2={y + 24} stroke="var(--t-panel)" strokeWidth="2" />
        </g>
      );
    }
    if (l.kind === 'community') {
      return (
        <g key={l.id}>
          <rect x={x - 3} y={y} width="6" height="22" fill="var(--t-muted)" />
          <rect x={x - 22} y={y - 4} width="44" height="20" rx="3" fill="var(--t-panel)" stroke={roof} strokeWidth="3" />
        </g>
      );
    }
    return (
      <g key={l.id}>
        <ellipse cx={x} cy={y + 30} rx="40" ry="6" fill="var(--t-ground-shadow)" />
        <path d={`M${x - 34} ${y + 30} L${x - 34} ${y + 4} L${x} ${y - 8} L${x + 34} ${y + 4} L${x + 34} ${y + 30} Z`} fill="var(--t-panel)" stroke="var(--t-line-2)" strokeWidth="2" />
        <path d={`M${x - 40} ${y + 6} L${x} ${y - 12} L${x + 40} ${y + 6}`} fill="none" stroke={roof} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={x - 24} y={y + 10} width="12" height="9" rx="1.5" fill="var(--t-blue)" opacity=".55" />
        <rect x={x + 12} y={y + 10} width="12" height="9" rx="1.5" fill="var(--t-blue)" opacity=".55" />
        <rect x={x - 5} y={y + 16} width="10" height="14" rx="1.5" fill={roof} opacity=".85" />
      </g>
    );
  };
  return (
    <svg className="ts-map__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width={W} height={H} fill="var(--t-bg)" />
      <rect y="30" width={W} height={H - 30} fill="var(--t-teal-soft)" />
      <path d={`M150 30 L150 ${H}`} stroke="var(--t-bg-2)" strokeWidth="18" />
      <path d="M10 200 L290 200" stroke="var(--t-bg-2)" strokeWidth="14" />
      <path d="M30 300 L270 300" stroke="var(--t-bg-2)" strokeWidth="10" />
      {[[18, 120], [282, 150], [24, 360], [284, 250], [120, 386]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="12" fill="var(--t-teal)" opacity=".6" /><rect x={x - 1.5} y={y + 8} width="3" height="8" fill="var(--t-muted)" /></g>
      ))}
      {locs.map(bld)}
    </svg>
  );
}
