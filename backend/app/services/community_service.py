"""Community forum and discussion service."""

from typing import Any, Dict, List, Optional
from app.repositories.community_repository import CommunityRepository


class CommunityService:
    """Business logic for student discussions and peer posts."""

    def __init__(self, community_repo: Optional[CommunityRepository] = None):
        self.community_repo = community_repo or CommunityRepository()

    def list_posts(self, limit: int = 20) -> List[Dict[str, Any]]:
        """List recent community discussions."""
        return self.community_repo.list_posts(limit=limit)

    def get_post(self, post_id: str) -> Optional[Dict[str, Any]]:
        """Fetch post by ID."""
        return self.community_repo.get_post(post_id)
