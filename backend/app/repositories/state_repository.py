"""Repository for Student State data access in Firestore."""

from typing import Any, Dict, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class StateRepository:
    """Handles persistence and retrieval of the dynamic student state."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_student_state(self, uid: str) -> Optional[Dict[str, Any]]:
        """Retrieve student state by UID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.STUDENT_STATES).document(uid).get()
        return doc.to_dict() if doc.exists else None

    def create_student_state(self, uid: str, state_data: Dict[str, Any]) -> Dict[str, Any]:
        """Initialize student state for a new student."""
        if not self.db:
            return state_data
        self.db.collection(collections.STUDENT_STATES).document(uid).set(state_data)
        return state_data

    def update_student_state(self, uid: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update fields in student state."""
        if not self.db:
            return updates
        self.db.collection(collections.STUDENT_STATES).document(uid).update(updates)
        return self.get_student_state(uid)

    def upsert_student_state(self, uid: str, state_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or merge student state."""
        if not self.db:
            return state_data
        self.db.collection(collections.STUDENT_STATES).document(uid).set(state_data, merge=True)
        return state_data
