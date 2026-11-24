import sceneImg from "../../assets/scenes/classroom-3-output.jpg";
import type { LevelDefinition } from '../levelTypes';

export const LEVEL_3: LevelDefinition = {
  id: 3,
  title: 'The Output Illusion',
  theme: 'Producing ≠ Understanding',
  subject: 'Art',
  sceneImage: sceneImg,
  scenario:
    'Toki enters a classroom filled with impressive work. Students have made colorful posters, ' +
    'polished slide decks, and elaborate models. The walls are covered in beautiful output, and ' +
    'the teacher is visibly proud of how much the students have produced.',

  steps: {
    identifyDrift: {
      prompt: 'Toki looks past the polish. What evidence is actually missing?',
      options: [
        { id: 'creativity', label: 'Creativity' },
        { id: 'voice', label: 'Student voice' },
        { id: 'understanding', label: 'Demonstration of understanding' },
        { id: 'participation', label: 'Participation' },
      ],
      correctId: 'understanding',
      hint: 'The products look great — but can the students explain the ideas behind them?',
    },
    assessRisk: {
      prompt: 'How serious is this drift?',
      options: [
        { id: 'minor', label: 'Minor — a small course correction' },
        { id: 'moderate', label: 'Moderate — needs attention soon' },
        { id: 'high', label: 'High — actively undermining the lesson' },
        { id: 'lethal', label: 'Lethal Mutation — the practice has lost its purpose' },
      ],
      correctId: 'high',
      hint: 'When impressive output is routinely accepted as proof of learning, real understanding can go unchecked for a long time. That\u2019s a serious drift.',
    },
    chooseCoaching: {
      prompt: "What's the best coaching move?",
      options: [
        { id: 'grade-looks', label: 'Grade the projects on visual quality' },
        { id: 'embed', label: 'Embed explanation, reasoning, and application into the task' },
        { id: 'more-projects', label: 'Assign more projects for practice' },
        { id: 'display', label: 'Display the best work to motivate others' },
      ],
      correctId: 'embed',
      hint: 'How could the task itself force students to reveal their thinking, not just their craft?',
    },
    reasoning: {
      prompt: 'Why embed explanation and reasoning into the task?',
      options: [
        { id: 'r1', label: 'It makes projects look more professional' },
        { id: 'r2', label: 'A polished product can hide a shaky understanding — requiring explanation makes the thinking visible and assessable' },
        { id: 'r3', label: 'It gives students more to display on the walls' },
        { id: 'r4', label: 'It keeps faster students busy for longer' },
      ],
      correctId: 'r2',
      hint: 'What is the product a proxy for — and how do we check the real thing?',
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted:
      'The quality of the product is being read as evidence of understanding. But a beautiful ' +
      'poster can be produced with very little grasp of the underlying idea.',
    whyItHappened:
      'Output is visible, shareable, and satisfying to display — so it becomes the thing that ' +
      'gets valued, while the harder-to-see understanding goes unexamined.',
    howToRestore:
      'Build explanation, reasoning, and application into the task itself — ask students to ' +
      'justify choices and apply the idea in a new context, so the product reveals the thinking.',
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['coaching-specialist'],
};
