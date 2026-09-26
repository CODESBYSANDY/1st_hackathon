import { ApiClient } from './client';
import { WEB_CURRICULUM } from '../../data/domains/webCurriculum';
import { APP_CURRICULUM } from '../../data/domains/appCurriculum';
import { DEFAULT_STUDENT_STATE } from '../../data/mock/studentStateMock';

export const learningService = {
  // Get roadmap for specific domain
  async getRoadmap(domainId) {
    try {
      const response = await ApiClient.get(`/learning/roadmap/${domainId}`);
      return { data: response, source: 'backend' };
    } catch {
      // Fallback to structured data
      const curriculum = domainId === 'app' ? APP_CURRICULUM : WEB_CURRICULUM;
      return { data: curriculum, source: 'mock' };
    }
  },

  // Get details of a single level
  async getLevel(domainId, levelId) {
    try {
      const response = await ApiClient.get(`/learning/level/${levelId}`);
      return { data: response, source: 'backend' };
    } catch {
      const curriculum = domainId === 'app' ? APP_CURRICULUM : WEB_CURRICULUM;
      const level = curriculum.levels.find(l => l.id === levelId) || curriculum.levels[1];
      return { data: level, source: 'mock' };
    }
  },

  // Get single mission/lesson
  async getMission(domainId, missionId) {
    try {
      const response = await ApiClient.get(`/learning/mission/${missionId}`);
      return { data: response, source: 'backend' };
    } catch {
      const curriculum = domainId === 'app' ? APP_CURRICULUM : WEB_CURRICULUM;
      for (const lvl of curriculum.levels) {
        if (lvl.missions) {
          const mission = lvl.missions.find(m => m.id === missionId);
          if (mission) {
            return { data: { ...mission, levelId: lvl.id, domainId }, source: 'mock' };
          }
        }
      }
      // Fallback to first available mission
      return { data: curriculum.levels[1].missions[2], source: 'mock' };
    }
  },

  // Get student dashboard state
  async getDashboardState() {
    try {
      const response = await ApiClient.get('/student/dashboard');
      return { data: response, source: 'backend' };
    } catch {
      return { data: DEFAULT_STUDENT_STATE, source: 'mock' };
    }
  },

  // Get recommended next activity
  async getNextRecommendedActivity(domainId) {
    try {
      const response = await ApiClient.get(`/adaptive/next-activity?domain=${domainId}`);
      return { data: response, source: 'backend' };
    } catch {
      return {
        data: {
          activity_id: domainId === 'app' ? 'app-l2-m2' : 'web-l2-m3',
          activity_type: 'lesson',
          title: domainId === 'app' ? 'Control Flow & Collections' : 'HTML Tags and Text Elements',
          difficulty: 2,
          reason: 'Recommended milestone based on active domain progress'
        },
        source: 'mock'
      };
    }
  }
};
