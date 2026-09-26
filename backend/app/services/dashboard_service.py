"""Dashboard service aggregating student readiness, journey, and stats."""

from typing import Any, Dict, Optional
from app.repositories.profile_repository import ProfileRepository
from app.repositories.reward_repository import RewardRepository
from app.repositories.state_repository import StateRepository


class DashboardService:
    """Aggregates student dashboard summary data."""

    def __init__(
        self,
        state_repo: Optional[StateRepository] = None,
        reward_repo: Optional[RewardRepository] = None,
        profile_repo: Optional[ProfileRepository] = None,
    ):
        self.state_repo = state_repo or StateRepository()
        self.reward_repo = reward_repo or RewardRepository()
        self.profile_repo = profile_repo or ProfileRepository()

    def get_dashboard_summary(self, uid: str) -> Dict[str, Any]:
        """Aggregate student learning progress, state, and rewards."""
        state = self.state_repo.get_student_state(uid) or {}
        rewards = self.reward_repo.get_user_rewards(uid) or {
            "total_xp": 0,
            "current_streak_days": 0,
            "level": 1,
        }
        profile = self.profile_repo.get_by_user_id(uid) or {}

        return {
            "user_id": uid,
            "profile": profile,
            "student_state": state,
            "rewards": rewards,
        }
