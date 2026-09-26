"""Repository for Community Posts and Comments data access in Firestore."""

from typing import Any, Dict, List, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class CommunityRepository:
    """Handles data access for posts and comments."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def list_posts(self, limit: int = 20) -> List[Dict[str, Any]]:
        """List recent community posts."""
        if not self.db:
            return []
        query = (
            self.db.collection(collections.POSTS)
            .order_by("created_at", direction=firestore.Query.DESCENDING)
            .limit(limit)
            .stream()
        )
        return [doc.to_dict() for doc in query]

    def get_post(self, post_id: str) -> Optional[Dict[str, Any]]:
        """Fetch a specific post by ID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.POSTS).document(post_id).get()
        return doc.to_dict() if doc.exists else None

    def create_post(self, post_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create new community post."""
        if not self.db:
            return data
        self.db.collection(collections.POSTS).document(post_id).set(data)
        return data

    def list_comments(self, post_id: str) -> List[Dict[str, Any]]:
        """List comments under a post."""
        if not self.db:
            return []
        query = (
            self.db.collection(collections.COMMENTS)
            .where("post_id", "==", post_id)
            .order_by("created_at")
            .stream()
        )
        return [doc.to_dict() for doc in query]
