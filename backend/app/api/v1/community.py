"""Community forum API routes."""

from typing import Any, Dict, List
from fastapi import APIRouter, Depends, Query
from app.core.dependencies import get_current_user
from app.schemas.community import PostResponse
from app.services.community_service import CommunityService

router = APIRouter(prefix="/community", tags=["Community"])


@router.get("/posts", response_model=List[PostResponse])
async def list_posts(
    limit: int = Query(default=20, ge=1, le=100),
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> List[PostResponse]:
    """List recent community discussions."""
    service = CommunityService()
    posts = service.list_posts(limit=limit)
    return [PostResponse(**p) for p in posts]
