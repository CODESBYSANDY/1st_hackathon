"""Gamification and reward schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class AchievementResponse(BaseModel):
    """Gamification achievement/badge."""

    id: str
    title: str
    description: str
    badge_icon: str
    unlocked_at: Optional[str] = None
    is_unlocked: bool = False


class UserRewardsResponse(BaseModel):
    """User points, streak, and achievements summary."""

    user_id: str
    total_xp: int = 0
    current_streak_days: int = 0
    longest_streak_days: int = 0
    level: int = 1
    unlocked_achievements: List[AchievementResponse] = Field(default_factory=list)
