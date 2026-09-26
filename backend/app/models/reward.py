"""Reward and gamification domain models."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Achievement:
    """Gamification badge entity."""

    id: str
    title: str
    description: str
    badge_icon: str
    xp_reward: int = 50


@dataclass
class Reward:
    """Student reward profile containing XP, streaks, and badges."""

    user_id: str
    total_xp: int = 0
    current_streak_days: int = 0
    longest_streak_days: int = 0
    level: int = 1
    unlocked_achievement_ids: List[str] = field(default_factory=list)
    last_active_date: Optional[str] = None
