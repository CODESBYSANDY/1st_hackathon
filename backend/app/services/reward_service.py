"""Reward and gamification service."""

from typing import Any, Dict, Optional
from app.repositories.reward_repository import RewardRepository


class RewardService:
    """Business logic for student XP, badges, and streaks."""

    def __init__(self, reward_repo: Optional[RewardRepository] = None):
        self.reward_repo = reward_repo or RewardRepository()

    def get_user_rewards(self, uid: str) -> Dict[str, Any]:
        """Fetch student reward profile."""
        rewards = self.reward_repo.get_user_rewards(uid)
        if not rewards:
            return {
                "user_id": uid,
                "total_xp": 0,
                "current_streak_days": 0,
                "longest_streak_days": 0,
                "level": 1,
                "unlocked_achievements": [],
            }
        return rewards
