"""Repository for lesson progress data access in Firestore."""

from typing import Any, Dict, List, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class ProgressRepository:
    """Handles CRUD operations for student lesson progress in Firestore."""

    LESSONS_SUB = "lessons"

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_lesson_progress(self, uid: str, lesson_id: str) -> Optional[Dict[str, Any]]:
        """Fetch student progress for a specific lesson."""
        if not self.db:
            return None
        doc = (
            self.db.collection(collections.PROGRESS)
            .document(uid)
            .collection(self.LESSONS_SUB)
            .document(lesson_id)
            .get()
        )
        return doc.to_dict() if doc.exists else None

    def save_lesson_progress(self, uid: str, lesson_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update student lesson progress."""
        if not self.db:
            return data
        (
            self.db.collection(collections.PROGRESS)
            .document(uid)
            .collection(self.LESSONS_SUB)
            .document(lesson_id)
            .set(data, merge=True)
        )
        return data

    def list_completed_lessons(self, uid: str) -> List[str]:
        """List all lesson IDs the student has completed."""
        if not self.db:
            return []
        try:
            docs = (
                self.db.collection(collections.PROGRESS)
                .document(uid)
                .collection(self.LESSONS_SUB)
                .where(filter=firestore.FieldFilter("is_completed", "==", True))
                .stream()
            )
        except (TypeError, AttributeError):
            docs = (
                self.db.collection(collections.PROGRESS)
                .document(uid)
                .collection(self.LESSONS_SUB)
                .where("is_completed", "==", True)
                .stream()
            )
        return [doc.id for doc in docs]

