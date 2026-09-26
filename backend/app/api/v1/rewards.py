"""Rewards and Gamification API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.reward import UserRewardsResponse
from app.services.reward_service import RewardService

router = APIRouter(prefix="/rewards", tags=["Rewards"])


@router.get("/my-rewards", response_model=UserRewardsResponse)
async def get_my_rewards(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> UserRewardsResponse:
    """Retrieve XP, streaks, and unlocked achievements."""
    service = RewardService()
    rewards = service.get_user_rewards(current_user["uid"])
    return UserRewardsResponse(**rewards)
