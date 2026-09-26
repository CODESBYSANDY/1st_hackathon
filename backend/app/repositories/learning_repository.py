"""Repository for Lessons, Domains, and Progress data access in Firestore."""

from typing import Any, Dict, List, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class LearningRepository:
    """Handles data access for domains, lessons, and student progress."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_lesson(self, lesson_id: str) -> Optional[Dict[str, Any]]:
        """Fetch a lesson by its ID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.LESSONS).document(lesson_id).get()
        return doc.to_dict() if doc.exists else None

    def list_lessons_by_domain(self, domain_id: str) -> List[Dict[str, Any]]:
        """List all lessons belonging to a domain."""
        if not self.db:
            return []
        query = self.db.collection(collections.LESSONS).where("domain_id", "==", domain_id).stream()
        return [doc.to_dict() for doc in query]

    def get_user_progress(self, uid: str, lesson_id: str) -> Optional[Dict[str, Any]]:
        """Fetch student progress for a specific lesson."""
        if not self.db:
            return None
        doc = self.db.collection(collections.PROGRESS).document(uid).collection(collections.LESSONS).document(lesson_id).get()
        return doc.to_dict() if doc.exists else None

    def save_user_progress(self, uid: str, lesson_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update or create student lesson progress."""
        if not self.db:
            return data
        self.db.collection(collections.PROGRESS).document(uid).collection(collections.LESSONS).document(lesson_id).set(data, merge=True)
        return data
