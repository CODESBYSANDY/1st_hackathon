"""Learning and curriculum API routes."""

from typing import Any, Dict, List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, get_optional_current_user
from app.schemas.learning import LearningJourneyResponse, LessonDetailResponse
from app.services.learning_service import LearningService

router = APIRouter(prefix="/learning", tags=["Learning"])


@router.get("/domains")
async def list_domains() -> List[Dict[str, Any]]:
    """List all available learning domains. Public endpoint."""
    service = LearningService()
    return service.list_domains()


@router.get("/domains/{domain_id}/journey")
async def get_domain_journey(
    domain_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    """Retrieve personalized journey for a specific domain."""
    service = LearningService()
    return service.get_domain_journey(current_user["uid"], domain_id)


@router.post("/domains/{domain_id}/select")
async def select_domain(
    domain_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    """Select a learning domain for the current user."""
    service = LearningService()
    return service.select_domain(current_user["uid"], domain_id)


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
