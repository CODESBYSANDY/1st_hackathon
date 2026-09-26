import { ApiClient } from './client';

export const rewardService = {
  async claimReward(rewardType, amount) {
    try {
      const response = await ApiClient.post('/rewards/claim', { rewardType, amount });
      return { data: response, source: 'backend' };
    } catch {
      return {
        data: {
          success: true,
          rewardType,
          amount,
          newTotalXp: 870,
          newTotalCoins: 130
        },
        source: 'mock'
      };
    }
  }
};
