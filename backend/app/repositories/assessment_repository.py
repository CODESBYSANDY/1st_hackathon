"""Repository for Assessments and Attempts data access in Firestore."""

from typing import Any, Dict, List, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class AssessmentRepository:
    """Handles data access for assessments and student assessment attempts."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_assessment(self, assessment_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve assessment details and questions."""
        if not self.db:
            return None
        doc = self.db.collection(collections.ASSESSMENTS).document(assessment_id).get()
        return doc.to_dict() if doc.exists else None

    def save_attempt(self, attempt_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Persist student assessment attempt."""
        if not self.db:
            return data
        self.db.collection(collections.ATTEMPTS).document(attempt_id).set(data)
        return data

    def get_user_attempts(self, uid: str) -> List[Dict[str, Any]]:
        """List past attempts for a given user."""
        if not self.db:
            return []
        query = self.db.collection(collections.ATTEMPTS).where("user_id", "==", uid).stream()
        return [doc.to_dict() for doc in query]
