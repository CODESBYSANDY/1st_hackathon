"""Learning and curriculum API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.learning import LearningJourneyResponse, LessonDetailResponse
from app.services.learning_service import LearningService

router = APIRouter(prefix="/learning", tags=["Learning"])


@router.get("/journey", response_model=LearningJourneyResponse)
async def get_journey(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> LearningJourneyResponse:
    """Retrieve personalized curriculum journey for current user."""
    service = LearningService()
    journey = service.get_journey(current_user["uid"])
    return LearningJourneyResponse(**journey)


@router.get("/lessons/{lesson_id}", response_model=LessonDetailResponse)
async def get_lesson(
    lesson_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> LessonDetailResponse:
    """Retrieve details and content for a specific lesson."""
    service = LearningService()
    lesson = service.get_lesson(lesson_id)
    return LessonDetailResponse(**lesson)
