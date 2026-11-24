import sceneImg from "../../assets/scenes/classroom-1-talkative.jpg";
import type { LevelDefinition } from '../levelTypes';

export const LEVEL_1: LevelDefinition = {
  id: 1,
  title: 'The Talkative Classroom',
  theme: 'Participation ≠ Learning',
  subject: 'English',
  sceneImage: sceneImg,
  scenario:
    'Toki steps into a buzzing classroom. Students are discussing enthusiastically — ' +
    'every group is talking at once. Hands wave, voices overlap, and the energy in the ' +
    'room is undeniable. On the surface, this looks like exactly the kind of collaborative ' +
    'classroom every coach hopes to see.',

  steps: {
    identifyDrift: {
      prompt: 'Toki leans in and listens closely. What is actually drifting here?',
      options: [
        { id: 'collaboration', label: 'Collaboration' },
        { id: 'thinking-quality', label: 'Thinking quality' },
        { id: 'engagement', label: 'Student engagement' },
        { id: 'management', label: 'Classroom management' },
      ],
      correctId: 'thinking-quality',
      hint: 'Listen again — are students sharing opinions, or building an argument with evidence?',
    },
    assessRisk: {
      prompt: 'How serious is this drift, right now?',
      options: [
        { id: 'minor', label: 'Minor — a small course correction' },
        { id: 'moderate', label: 'Moderate — needs attention soon' },
        { id: 'high', label: 'High — actively undermining the lesson' },
        { id: 'lethal', label: 'Lethal Mutation — the practice has lost its purpose' },
      ],
      correctId: 'minor',
      hint: 'The talk itself is healthy — it just needs a sharper edge. That points to an earlier stage of drift.',
    },
    chooseCoaching: {
      prompt: "What's the best coaching move for this teacher?",
      options: [
        { id: 'stop-talk', label: 'Ask the teacher to reduce group talk time' },
        { id: 'add-prompts', label: 'Help the teacher add prompts requiring evidence and justification' },
        { id: 'more-groups', label: 'Suggest smaller groups for more airtime per student' },
        { id: 'silent-work', label: 'Recommend switching to independent silent work' },
      ],
      correctId: 'add-prompts',
      hint: 'The goal isn\u2019t less talk — it\u2019s deeper talk. What would push students toward reasoning?',
    },
    reasoning: {
      prompt: 'Why is this the right coaching move?',
      options: [
        { id: 'r1', label: 'It keeps the room quiet and easier to manage' },
        { id: 'r2', label: 'It redirects existing engagement toward evidence-based reasoning, without losing the energy' },
        { id: 'r3', label: 'It gives the teacher more control over who speaks' },
        { id: 'r4', label: 'It makes the lesson faster to complete' },
      ],
      correctId: 'r2',
      hint: 'Think about what we\u2019re trying to preserve, not just what we\u2019re trying to fix.',
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted:
      'The classroom has plenty of participation, but the talk is opinion-sharing, not ' +
      'reasoning. Students are engaged with each other — not yet engaged with evidence.',
    whyItHappened:
      'When collaboration is introduced, "everyone is talking" can quietly become the goal ' +
      'itself, because it\u2019s the easiest thing to see and measure in the moment.',
    howToRestore:
      'Simple sentence starters and follow-up questions — "What\u2019s your evidence?", "Why do ' +
      'you think that?" — turn open talk into academic reasoning without dampening the energy.',
  },

  points: {
    drift: 25,
    risk: 25,
    coaching: 30,
    restore: 20,
    reasoningBonus: 25,
  },

  badgeTriggers: ['drift-detective'],
};
