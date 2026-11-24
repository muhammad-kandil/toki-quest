import sceneImg from "../../assets/scenes/classroom-5-gamification.jpg";
import type { LevelDefinition } from '../levelTypes';

export const LEVEL_5: LevelDefinition = {
  id: 5,
  title: 'The Gamification Mutation',
  theme: 'Engagement ≠ Understanding',
  subject: 'Any Subject',
  sceneImage: sceneImg,
  scenario:
    'Toki enters a buzzing, competitive classroom. Students race for points, badges, and spots ' +
    'on a leaderboard. The energy is electric — hands shoot up, everyone wants to win the next ' +
    'round. The teacher has gamified everything, and engagement has never looked higher.',

  steps: {
    identifyDrift: {
      prompt: 'Toki watches a few rounds closely. What is actually being rewarded?',
      options: [
        { id: 'thinking', label: 'Thinking' },
        { id: 'understanding', label: 'Understanding' },
        { id: 'speed', label: 'Speed and performance' },
        { id: 'persistence', label: 'Persistence' },
      ],
      correctId: 'speed',
      hint: 'Watch who wins each round — is it the deepest thinker, or the fastest hand?',
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
      hint: 'When winning has fully replaced learning as the goal, the engagement is real but pointed at the wrong target. That\u2019s a lethal mutation.',
    },
    chooseCoaching: {
      prompt: "What's the best coaching move?",
      options: [
        { id: 'bigger-prizes', label: 'Add bigger prizes to raise the stakes' },
        { id: 'reward-reasoning', label: 'Reward reasoning, explanation, reflection, and improvement — not speed alone' },
        { id: 'remove-all', label: 'Remove all game elements immediately' },
        { id: 'more-leaderboards', label: 'Add more leaderboards for every subject' },
      ],
      correctId: 'reward-reasoning',
      hint: 'The fix isn\u2019t to kill the game — it\u2019s to change what the game rewards.',
    },
    reasoning: {
      prompt: 'Why change what\u2019s rewarded rather than remove the game?',
      options: [
        { id: 'r1', label: 'Students would be upset if the games disappeared' },
        { id: 'r2', label: 'Engagement is valuable — the fix is to point it at reasoning and growth, so the energy serves learning instead of competing with it' },
        { id: 'r3', label: 'Leaderboards are the best motivator available' },
        { id: 'r4', label: 'Speed is a fair measure of ability' },
      ],
      correctId: 'r2',
      hint: 'Notice: this very game never scored you on speed. Why might that be?',
      bonusPoints: 25,
    },
  },

  reveal: {
    whatDrifted:
      'Winning has become more important than learning. The competition drives engagement, ' +
      'but it rewards speed and performance rather than thinking and understanding.',
    whyItHappened:
      'Points and leaderboards produce visible, immediate excitement — so the game\u2019s scoreboard ' +
      'quietly becomes the goal, and depth of learning takes a back seat to winning.',
    howToRestore:
      'Keep the engagement, change the reward: recognize reasoning, explanation, reflection, and ' +
      'improvement rather than speed. (It\u2019s why this game never once rewarded you for being fast.)',
  },

  points: { drift: 25, risk: 25, coaching: 30, restore: 20, reasoningBonus: 25 },
  badgeTriggers: ['purpose-protector', 'mutation-hunter'],
};
