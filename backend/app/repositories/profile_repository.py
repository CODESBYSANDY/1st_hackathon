"""Repository for Student Profile data access in Firestore."""

from typing import Any, Dict, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class ProfileRepository:
    """Handles CRUD operations for profile documents in Firestore."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_by_user_id(self, uid: str) -> Optional[Dict[str, Any]]:
        """Retrieve student profile by user ID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.PROFILES).document(uid).get()
        return doc.to_dict() if doc.exists else None

    def upsert(self, uid: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update student profile."""
        if not self.db:
            return data
        self.db.collection(collections.PROFILES).document(uid).set(data, merge=True)
        return data
