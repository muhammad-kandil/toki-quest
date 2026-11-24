import sceneImg from "../../assets/scenes/classroom-2-activity.jpg";
import type { LevelDefinition } from '../levelTypes';

export const LEVEL_2: LevelDefinition = {
  id: 2,
  title: 'The Activity Overload',
  theme: 'Busy ≠ Learning',
  subject: 'Science',
  sceneImage: sceneImg,
  scenario:
    'Toki visits a fast-paced classroom. Students rotate through stations, games, and ' +
    'hands-on tasks in quick succession. Nobody is idle, the pace is relentless, and the ' +
    'teacher proudly notes that every minute is filled. It looks like a model of engagement ' +
    'and time-on-task.',

  steps: {
    identifyDrift: {
      prompt: 'Toki watches a full rotation. What has quietly become the priority?',
      options: [
        { id: 'learning', label: 'Learning outcomes' },
        { id: 'completion', label: 'Completing the activities' },
        { id: 'feedback', label: 'Feedback' },
        { id: 'assessment', label: 'Assessment' },
      ],
      correctId: 'completion',
      hint: 'Ask what happens at each station — are students meeting an objective, or just finishing the task to move on?',
    },
    assessRisk: {
      prompt: 'How far has this drifted?',
      options: [
        { id: 'minor', label: 'Minor — a small course correction' },
        { id: 'moderate', label: 'Moderate — needs attention soon' },
        { id: 'high', label: 'High — actively undermining the lesson' },
        { id: 'lethal', label: 'Lethal Mutation — the practice has lost its purpose' },
      ],
      correctId: 'moderate',
      hint: 'The activities still have potential — but the link to learning is slipping. That\u2019s more than minor, not yet fatal.',
    },
    chooseCoaching: {
      prompt: "What's the best coaching move?",
      options: [
        { id: 'fewer', label: 'Cut the number of stations to slow the pace' },
        { id: 'reconnect', label: 'Reconnect every activity to a clear learning objective' },
        { id: 'timer', label: 'Add timers so students move faster' },
        { id: 'reward', label: 'Reward the students who finish the most stations' },
      ],
      correctId: 'reconnect',
      hint: 'The problem isn\u2019t the number of activities — it\u2019s that they\u2019ve become unmoored from a purpose.',
    },
    reasoning: {
      prompt: 'Why is reconnecting to objectives the right move?',
      options: [
        { id: 'r1', label: 'It makes the classroom calmer and easier to manage' },
        { id: 'r2', label: 'An activity only earns its place if it advances a specific learning goal — otherwise it\u2019s motion without progress' },
        { id: 'r3', label: 'It lets the teacher fit in even more stations' },
        { id: 'r4', label: 'It helps students finish faster' },
      ],
      correctId: 'r2',
      hint: 'What distinguishes a meaningful activity from a busy one?',
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted:
      'The lesson is full of motion, but "getting through the activities" has replaced ' +
      '"reaching the learning goal." Busyness is being mistaken for progress.',
    whyItHappened:
      'Activities are concrete and satisfying to complete, so completion becomes the visible ' +
      'measure of success — while the underlying objective quietly fades from view.',
    howToRestore:
      'Anchor each station to a specific objective, and check for that objective — not just ' +
      'completion. A well-chosen activity earns its place; a busy one just fills time.',
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['drift-detective'],
};
