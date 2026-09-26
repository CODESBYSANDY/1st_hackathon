"""Repository for Rewards and Gamification data access in Firestore."""

from typing import Any, Dict, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class RewardRepository:
    """Handles data access for student rewards, XP, streaks, and achievements."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_user_rewards(self, uid: str) -> Optional[Dict[str, Any]]:
        """Fetch rewards document for user."""
        if not self.db:
            return None
        doc = self.db.collection(collections.REWARDS).document(uid).get()
        return doc.to_dict() if doc.exists else None

    def upsert_rewards(self, uid: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update user reward stats."""
        if not self.db:
            return data
        self.db.collection(collections.REWARDS).document(uid).set(data, merge=True)
        return data
