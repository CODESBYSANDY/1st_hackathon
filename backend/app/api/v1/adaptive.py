"""Adaptive Engine API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.core.exceptions import NotFoundError
from app.schemas.adaptive import StudentStateResponse
from app.schemas.learning import NextActivityResponse
from app.services.adaptive_service import AdaptiveService

router = APIRouter(prefix="/adaptive", tags=["Adaptive Engine"])


@router.get("/state", response_model=StudentStateResponse)
async def get_student_state(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> StudentStateResponse:
    """Retrieve current adaptive student state."""
    service = AdaptiveService()
    state = service.get_student_state(current_user["uid"])
    if not state:
        raise NotFoundError(message="Student state not initialized. Please complete onboarding.")
    return StudentStateResponse(**state)


@router.get("/next-activity", response_model=NextActivityResponse)
async def get_next_activity(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> NextActivityResponse:
    """Get the next recommended learning activity dynamically determined by the engine."""
    service = AdaptiveService()
    return service.get_next_activity(current_user["uid"])
