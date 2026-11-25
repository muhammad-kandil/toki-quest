import { useEffect, useRef, useState } from 'react';
import type { ConversationDefinition, ConversationOutcome, TurnEffect } from '../data/conversationTypes';
import { resolveOutcome } from '../data/conversationTypes';
import { useLocale } from '../i18n/LocaleContext';
import { UI } from '../i18n/ui';
import type { Text } from '../i18n/types';
import { sfx } from '../audio/sfx';
import { useVoice } from '../audio/useVoice';
import tokiFace from '../assets/raw/toki-face-teal-arch.png';
import './ConversationBeat.css';

const STANCE_LABEL: Record<ConversationDefinition['stance'], Text> = {
  defensive: UI.stanceDefensive,
  tired: UI.stanceTired,
  proud: UI.stanceProud,
  eager: UI.stanceEager,
};

export const OUTCOME_LABEL: Record<ConversationOutcome, Text> = {
  restored: UI.outcomeRestored,
  partial: UI.outcomePartial,
  unchanged: UI.outcomeUnchanged,
};

/**
 * Two turns with a person. The teacher speaks; the player picks Toki's
 * line; the teacher answers in kind. A line that closes the teacher ends
 * the conversation — there is no "try again" with a human. The outcome
 * is handed back to the level, which scores it and shapes the reveal.
 */
export function ConversationBeat({ conversation, onDone }: {
  conversation: ConversationDefinition;
  onDone: (outcome: ConversationOutcome, effects: TurnEffect[]) => void;
}) {
  const { tx } = useLocale();
  const voiceCtl = useVoice();
  const [turnIdx, setTurnIdx] = useState(0);
  const [effects, setEffects] = useState<TurnEffect[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ who: 'teacher' | 'toki'; text: Text; effect?: TurnEffect }[]>([
    { who: 'teacher', text: conversation.turns[0].teacherLine },
  ]);

  const turn = conversation.turns[turnIdx];
  const total = conversation.turns.length;
  const closed = effects.includes('closes');
  const finished = closed || effects.length === total;
  const outcome = finished ? resolveOutcome(effects, total) : null;

  // Read aloud: speak each new line of the thread as it appears — the
  // teacher's opening, then Toki's chosen line and the reply together.
  // Option labels are never read; the player is reading those.
  const spokenUpTo = useRef(0);
  useEffect(() => {
    const fresh = transcript.slice(spokenUpTo.current);
    spokenUpTo.current = transcript.length;
    if (!fresh.length) return;
    voiceCtl.speakSequence(fresh.map((l) => ({ text: tx(l.text), who: l.who })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript.length]);
  useEffect(() => () => voiceCtl.cancel(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (id: string) => {
    if (chosen) return;
    const opt = turn.options.find((o) => o.id === id);
    if (!opt) return;
    setChosen(id);
    const next = [...effects, opt.effect];
    setEffects(next);
    setTranscript((t) => [...t, { who: 'toki', text: opt.label }, { who: 'teacher', text: opt.reply, effect: opt.effect }]);
    sfx.play(opt.effect === 'opens' ? 'correct' : opt.effect === 'closes' ? 'lethal' : 'tap');
  };

  const advance = () => {
    sfx.play('tap');
    if (finished && outcome) { onDone(outcome, effects); return; }
    const n = turnIdx + 1;
    setTurnIdx(n);
    setChosen(null);
    setTranscript((t) => [...t, { who: 'teacher', text: conversation.turns[n].teacherLine }]);
  };

  return (
    <div className={`beat beat--choice convo convo--${conversation.stance}`}>
      <h3 className="beat__heading">{tx(UI.conversationHeading)}</h3>
      <p className="convo__setting">{tx(conversation.setting)}</p>

      <div className="convo__read">
        <img src={tokiFace} alt="" className="convo__read-toki" />
        <div>
          <p className="convo__read-label">{tx(UI.tokiRead)} · <em>{tx(conversation.teacherName)}, {tx(STANCE_LABEL[conversation.stance])}</em></p>
          <p className="convo__read-text">{tx(conversation.read)}</p>
        </div>
      </div>

      <div className="convo__thread" aria-live="polite">
        {transcript.map((line, i) => (
          <div key={i} className={`bubble bubble--${line.who} ${line.effect ? `bubble--${line.effect}` : ''}`} style={{ animationDelay: `${Math.min(i, 2) * 60}ms` }}>
            {line.who === 'teacher' && <span className="bubble__who">{tx(conversation.teacherName)}</span>}
            {line.who === 'toki' && <span className="bubble__who">Toki</span>}
            <p>{tx(line.text)}</p>
          </div>
        ))}
      </div>

      {!chosen ? (
        <>
          <p className="boss-audit__question convo__prompt">{tx(UI.tokiSays)}</p>
          <div className="choice-list">
            {turn.options.map((o, i) => (
              <button key={o.id} className="choice-list__item" style={{ animationDelay: `${i * 55}ms` }} onClick={() => choose(o.id)}>
                {tx(o.label)}
              </button>
            ))}
          </div>
          <p className="convo__counter">{turnIdx + 1} / {total}</p>
        </>
      ) : (
        <>
          {finished && outcome && (
            <div className={`convo__outcome convo__outcome--${outcome}`}>
              <span className="boss-audit__verdict">{tx(OUTCOME_LABEL[outcome])}</span>
              {closed && <p className="convo__closed">{tx(UI.outcomeClosed)}</p>}
            </div>
          )}
          <button className="beat__cta" onClick={advance}>{tx(finished ? UI.continue : UI.teacherReplies)}</button>
        </>
      )}
    </div>
  );
}
