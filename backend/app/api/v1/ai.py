"""AI Reasoning and Gemini API routes."""

from typing import Any, Dict
from fastapi import APIRouter, Depends, Query
from app.core.dependencies import get_current_user
from app.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI Reasoning"])


@router.get("/explain")
async def explain_concept(
    concept: str = Query(..., description="Concept to explain"),
    difficulty: int = Query(default=1, ge=1, le=5),
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    """Generate adaptive AI explanation for a specific concept."""
    service = AIService()
    return await service.generate_explanation(concept, difficulty)
