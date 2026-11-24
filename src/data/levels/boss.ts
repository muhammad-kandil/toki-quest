import sceneImg from '../../assets/scenes/classroom-6-perfect.jpg';
import type { BossDefinition } from '../bossTypes';

export const BOSS: BossDefinition = {
  id: 6,
  title: 'The Perfect Classroom',
  theme: 'Looks ≠ Learning',
  subject: 'The Final Visit',
  sceneImage: sceneImg,

  scenario:
    'Toki steps into the most impressive classroom yet. The objectives are crystal clear on the ' +
    'board. Students are engaged, on-task, and producing beautiful work. The teacher circulates ' +
    'expertly, questioning, checking, adjusting. By every measure Toki has learned to use, this ' +
    'room is flawless. So Toki does what a good coach does — and looks closer, dimension by ' +
    'dimension.',

  // Five clean dimensions build false confidence; the sixth reveals it.
  dimensions: [
    {
      id: 'objectives',
      label: 'Learning Objectives',
      observation: 'Toki reads the objectives posted on the board and checks them against the lesson.',
      verdict: 'clean',
      finding:
        'Clear, specific, and genuinely aligned to the activities. The objectives are sound — ' +
        'this teacher knows exactly what students should learn.',
      hint:
        'Resist the instinct to find something wrong just because you\u2019re looking for a drift. ' +
        'Judge only what\u2019s actually in front of you here.',
    },
    {
      id: 'tasks',
      label: 'The Tasks',
      observation: 'Toki examines what students are actually being asked to do.',
      verdict: 'clean',
      finding:
        'Every task maps to an objective. Nothing is busywork; each activity has a clear purpose. ' +
        'The tasks are well-designed.',
      hint: 'Check the tasks against the objectives you just confirmed — do they actually connect?',
    },
    {
      id: 'questions',
      label: "The Teacher's Questions",
      observation: 'Toki listens to how the teacher questions students.',
      verdict: 'clean',
      finding:
        'Open-ended, probing, well-timed. The teacher pushes for reasoning and evidence, exactly ' +
        'as a skilled questioner should. Nothing to fix here.',
      hint: 'Listen for whether the questions ask students to reason, or just to recall.',
    },
    {
      id: 'assessment',
      label: 'The Assessment',
      observation: 'Toki reviews how learning is being checked.',
      verdict: 'clean',
      finding:
        'Frequent, varied, and actually used to adjust instruction. The teacher responds to the ' +
        'evidence in real time. This is assessment done right.',
      hint: 'The question isn\u2019t whether assessment happens \u2014 it\u2019s whether it changes what happens next.',
    },
    {
      id: 'technology',
      label: 'The Technology Use',
      observation: 'Toki watches how the Alef platform and tools are being used.',
      verdict: 'clean',
      finding:
        'Purposeful and integrated — tech serves the learning, never replaces it. The platform is ' +
        'used to deepen understanding, not to look modern. Well done.',
      hint: 'Ask whether the technology is serving the learning goal, or just present because it\u2019s expected.',
    },
    {
      id: 'student-thinking',
      label: 'The Students\u2019 Thinking',
      observation:
        'Toki does something different now — instead of watching the teacher, Toki sits beside ' +
        'the students and listens to *how they think* as they work.',
      verdict: 'mutation',
      finding:
        'Here it is. The students have learned to produce every *signal* of learning — the right ' +
        'answers, the confident explanations, the polished work — without the understanding ' +
        'underneath. They\u2019ve become expert at *performing* learning. The mutation was never in ' +
        'what the teacher does. It\u2019s in what the students have quietly learned to do.',
      hint:
        'Everything you\u2019ve checked so far is something the TEACHER controls. This dimension is ' +
        'different \u2014 look at what the students themselves are doing with their thinking.',
    },
  ],

  locate: {
    prompt:
      'Toki has audited everything. Five dimensions are genuinely excellent. So where does the ' +
      'real problem actually live?',
    options: [
      { id: 'teacher', label: "The teacher's methods" },
      { id: 'objectives', label: 'The learning objectives' },
      { id: 'student-thinking', label: 'What the students have learned to do' },
      { id: 'tech', label: 'The technology' },
    ],
    correctId: 'student-thinking',
    hint:
      'You checked everything the teacher controls, and it was all excellent. If the visible, ' +
      'teacher-controlled things are all fine\u2026 look at what\u2019s harder to see.',
  },

  coaching: {
    prompt:
      'This is the subtlest coaching challenge in the game. The teacher is doing everything right. ' +
      'How do you coach a mutation that lives in student thinking?',
    options: [
      {
        id: 'more-rigor',
        label: 'Tell the teacher to add more rigorous tasks',
      },
      {
        id: 'surface-thinking',
        label: 'Help the teacher surface and probe how students actually think — not just what they produce',
      },
      {
        id: 'harder-tests',
        label: 'Recommend harder assessments to catch the gap',
      },
      {
        id: 'nothing',
        label: 'Nothing — the room is excellent, leave it alone',
      },
    ],
    correctId: 'surface-thinking',
    hint:
      'You can\u2019t fix student thinking by changing teacher behavior that\u2019s already excellent. ' +
      'You have to make the *thinking itself* visible — so the performance of learning and real ' +
      'learning stop looking the same.',
  },

  reveal: {
    whatDrifted:
      'Nothing the teacher did. The classroom was flawless in every visible, controllable way — ' +
      'objectives, tasks, questions, assessment, technology. The drift was in the students: they ' +
      'had learned to perform the appearance of learning so well that it was indistinguishable ' +
      'from the real thing.',
    whyItHappened:
      'When a system rewards the *signals* of learning — right answers, polished work, confident ' +
      'explanations — students optimize for the signals. Over time, performing learning and ' +
      'actually learning look identical from the outside. The better everything else gets, the ' +
      'more invisible this becomes.',
    howToRestore:
      'Make thinking visible. Ask students to reason aloud, to explain their uncertainty, to apply ' +
      'ideas in genuinely new situations where performance can\u2019t be rehearsed. The goal isn\u2019t to ' +
      'fix the teacher — it\u2019s to make real understanding and its imitation stop looking the same.',
    finalWord:
      'You may have noticed — this game never rewarded you for being fast, and its hardest level ' +
      'had no villain to catch. That was the point. The most dangerous drift isn\u2019t the obvious ' +
      'mistake. It\u2019s the one hiding inside something that looks perfect.',
  },

  points: {
    audit: 40,
    locate: 40,
    coaching: 40,
    reasoningBonus: 30,
  },

  badgeTriggers: ['master-dlis'],
};
