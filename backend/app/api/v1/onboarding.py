"""Onboarding API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.onboarding import OnboardingRequest, OnboardingResponse
from app.services.onboarding_service import OnboardingService

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])


@router.post("/complete", response_model=OnboardingResponse)
async def complete_onboarding(
    payload: OnboardingRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> OnboardingResponse:
    """Submit student onboarding choices and initialize personalized state."""
    service = OnboardingService()
    return service.complete_onboarding(current_user["uid"], payload)
