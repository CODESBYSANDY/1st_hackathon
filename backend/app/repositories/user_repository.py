"""Repository for User data access in Firestore."""

from typing import Any, Dict, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class UserRepository:
    """Handles CRUD operations for user documents in Firestore."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_by_id(self, uid: str) -> Optional[Dict[str, Any]]:
        """Retrieve user document by UID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.USERS).document(uid).get()
        return doc.to_dict() if doc.exists else None

    def create(self, uid: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or initialize user document."""
        if not self.db:
            return data
        self.db.collection(collections.USERS).document(uid).set(data)
        return data

    def update(self, uid: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update existing user document."""
        if not self.db:
            return None
        self.db.collection(collections.USERS).document(uid).update(data)
        return self.get_by_id(uid)
