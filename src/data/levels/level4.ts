import sceneImg from "../../assets/scenes/classroom-4-assessment.jpg";
import type { LevelDefinition } from '../levelTypes';

export const LEVEL_4: LevelDefinition = {
  id: 4,
  title: 'The Assessment Trap',
  theme: 'Scores ≠ Learning',
  subject: 'Math',
  sceneImage: sceneImg,
  scenario:
    'Toki visits a highly organized classroom. Students take quizzes and assessments regularly, ' +
    'results are recorded every week, and the gradebook is meticulous. The teacher collects more ' +
    'data than almost anyone in the school. Everything is measured.',

  steps: {
    identifyDrift: {
      prompt: 'Toki reviews the weeks of data. What has been lost?',
      options: [
        { id: 'data', label: 'Data collection' },
        { id: 'motivation', label: 'Student motivation' },
        { id: 'response', label: 'Instructional response to the data' },
        { id: 'frequency', label: 'Assessment frequency' },
      ],
      correctId: 'response',
      hint: 'Lots of data is being gathered — but ask what changes in the teaching because of it.',
    },
    assessRisk: {
      prompt: 'How serious is this drift?',
      options: [
        { id: 'minor', label: 'Minor — a small course correction' },
        { id: 'moderate', label: 'Moderate — needs attention soon' },
        { id: 'high', label: 'High — actively undermining the lesson' },
        { id: 'lethal', label: 'Lethal Mutation — the practice has lost its purpose' },
      ],
      correctId: 'lethal',
      hint: 'Assessment exists to improve instruction. When it becomes an end in itself — data for its own sake — the practice has fully lost its purpose.',
    },
    chooseCoaching: {
      prompt: "What's the best coaching move?",
      options: [
        { id: 'more-quizzes', label: 'Add more frequent quizzes for richer data' },
        { id: 'use-evidence', label: 'Use the evidence to reteach, regroup, intervene, and adjust' },
        { id: 'automate', label: 'Automate the gradebook to save time' },
        { id: 'share-scores', label: 'Share scores with students to motivate them' },
      ],
      correctId: 'use-evidence',
      hint: 'The data already exists. The missing step is what happens next in the teaching.',
    },
    reasoning: {
      prompt: 'Why is acting on the evidence the key move?',
      options: [
        { id: 'r1', label: 'It justifies the time spent assessing' },
        { id: 'r2', label: 'Assessment only improves learning when it changes instruction — data that never alters teaching is measurement, not feedback' },
        { id: 'r3', label: 'It produces cleaner records for reporting' },
        { id: 'r4', label: 'It keeps students used to taking tests' },
      ],
      correctId: 'r2',
      hint: 'What is the difference between measuring learning and improving it?',
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted:
      'Assessment has become an end rather than a tool. A great deal is measured, but the ' +
      'evidence rarely changes what happens next in the classroom.',
    whyItHappened:
      'Collecting data feels rigorous and productive on its own, so the gathering becomes the ' +
      'goal — and the harder work of responding to it quietly drops away.',
    howToRestore:
      'Close the loop: use assessment evidence to reteach, regroup, intervene, and adjust ' +
      'instruction. Data earns its keep only when it changes teaching.',
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector', 'mutation-hunter'],
};
