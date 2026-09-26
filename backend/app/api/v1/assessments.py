"""Assessment and quiz API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.schemas.assessment import (
    AssessmentDetailResponse,
    AssessmentResult,
    AssessmentSubmission,
)
from app.services.assessment_service import AssessmentService

router = APIRouter(prefix="/assessments", tags=["Assessments"])


@router.get("/{assessment_id}", response_model=AssessmentDetailResponse)
async def get_assessment(
    assessment_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> AssessmentDetailResponse:
    """Retrieve assessment questions and metadata."""
    service = AssessmentService()
    assessment = service.get_assessment(assessment_id)
    return AssessmentDetailResponse(**assessment)


@router.post("/submit", response_model=AssessmentResult)
async def submit_assessment(
    submission: AssessmentSubmission,
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> AssessmentResult:
    """Submit answers, calculate score, and trigger adaptive state updates."""
    service = AssessmentService()
    return service.evaluate_submission(current_user["uid"], submission)
