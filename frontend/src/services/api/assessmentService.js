import { ApiClient } from './client';
import { CHECKPOINTS_DATA, BOSS_TESTS_DATA } from '../../data/mock/assessmentMocks';
import { CHALLENGES_DATABASE } from '../../data/mock/challengesData';

export const assessmentService = {
  // Get challenge by ID
  async getChallenge(challengeId) {
    try {
      const response = await ApiClient.get(`/assessment/challenge/${challengeId}`);
      return { data: response, source: 'backend' };
    } catch {
      const challenge = CHALLENGES_DATABASE[challengeId] || CHALLENGES_DATABASE['ch-web-l2-m3'];
      return { data: challenge, source: 'mock' };
    }
  },

  // Submit challenge answer
  async submitChallengeAttempt(challengeId, studentAnswer) {
    try {
      const response = await ApiClient.post(`/assessment/challenge/${challengeId}/submit`, {
        answer: studentAnswer,
      });
      return { data: response, source: 'backend' };
    } catch {
      // Local fallback evaluation
      const challenge = CHALLENGES_DATABASE[challengeId];
      let isCorrect = false;

      if (challenge) {
        if (challenge.type === 'multiple-choice' || challenge.type === 'debug' || challenge.type === 'prediction') {
          const selected = challenge.options?.find(o => o.id === studentAnswer);
          isCorrect = selected ? !!selected.isCorrect : false;
        } else if (challenge.type === 'code-completion') {
          isCorrect = true; // For demo completion
        } else if (challenge.type === 'ordering') {
          isCorrect = true;
        }
      }

      return {
        data: {
          isCorrect,
          xpEarned: isCorrect ? (challenge?.xpReward || 20) : 5,
          coinsEarned: isCorrect ? (challenge?.coinReward || 10) : 2,
          explanation: challenge?.explanation || 'Great effort reviewing this technical concept.',
          skillsAffected: challenge?.skills || ['Placement Prep'],
          nextRecommended: 'web-l2-m4'
        },
        source: 'mock'
      };
    }
  },

  // Get Checkpoint
  async getCheckpoint(checkpointId) {
    try {
      const response = await ApiClient.get(`/assessment/checkpoint/${checkpointId}`);
      return { data: response, source: 'backend' };
    } catch {
      const chk = CHECKPOINTS_DATA[checkpointId] || CHECKPOINTS_DATA['web-chk-01'];
      return { data: chk, source: 'mock' };
    }
  },

  // Submit Checkpoint
  async submitCheckpoint(checkpointId, answers) {
    try {
      const response = await ApiClient.post(`/assessment/checkpoint/${checkpointId}/submit`, { answers });
      return { data: response, source: 'backend' };
    } catch {
      const chk = CHECKPOINTS_DATA[checkpointId] || CHECKPOINTS_DATA['web-chk-01'];
      return { data: chk.defaultResult, source: 'mock' };
    }
  },

  // Get Boss Test
  async getBossTest(bossId) {
    try {
      const response = await ApiClient.get(`/assessment/boss/${bossId}`);
      return { data: response, source: 'backend' };
    } catch {
      const boss = BOSS_TESTS_DATA[bossId] || BOSS_TESTS_DATA['web-boss-02'];
      return { data: boss, source: 'mock' };
    }
  }
};
