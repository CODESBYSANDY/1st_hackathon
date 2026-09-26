"""User profile API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: Dict[str, Any] = Depends(get_current_user)) -> UserResponse:
    """Get current user's profile."""
    service = UserService()
    user_data = service.get_user(current_user["uid"])
    return UserResponse(**user_data)


@router.patch("/profile", response_model=UserResponse)
async def update_profile(
    payload: UserUpdate,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> UserResponse:
    """Update current user's profile."""
    service = UserService()
    updated = service.update_profile(current_user["uid"], payload.model_dump(exclude_unset=True))
    return UserResponse(**updated)
