"""Authentication API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.auth import AuthUserResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/me", response_model=AuthUserResponse)
async def get_me(current_user: Dict[str, Any] = Depends(get_current_user)) -> AuthUserResponse:
    """Return currently authenticated user profile from verified token."""
    service = AuthService()
    profile = service.get_current_user_profile(current_user)
    return AuthUserResponse(**profile)
