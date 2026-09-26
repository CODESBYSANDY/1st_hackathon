"""Repository for Skill data access in Firestore."""

from typing import Any, Dict, List, Optional
from firebase_admin import firestore
from app.db import collections
from app.db.firebase import get_firestore_client


class SkillRepository:
    """Handles read operations for skill documents in Firestore."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_skill(self, skill_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve skill document by ID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.SKILLS).document(skill_id).get()
        if doc.exists:
            data = doc.to_dict()
            data["id"] = doc.id
            return data
        return None

    def list_skills_by_domain(self, domain_id: str) -> List[Dict[str, Any]]:
        """List all skills belonging to a domain."""
        if not self.db:
            return []
        try:
            query = (
                self.db.collection(collections.SKILLS)
                .where(filter=firestore.FieldFilter("domainId", "==", domain_id))
                .stream()
            )
        except (TypeError, AttributeError):
            query = (
                self.db.collection(collections.SKILLS)
                .where("domainId", "==", domain_id)
                .stream()
            )
        results = []
        for doc in query:
            data = doc.to_dict()
            data["id"] = doc.id
            results.append(data)
        return results

    def list_skills_by_ids(self, skill_ids: List[str]) -> List[Dict[str, Any]]:
        """Retrieve multiple skills by their IDs."""
        if not self.db or not skill_ids:
            return []
        results = []
        for skill_id in skill_ids:
            doc = self.db.collection(collections.SKILLS).document(skill_id).get()
            if doc.exists:
                data = doc.to_dict()
                data["id"] = doc.id
                results.append(data)
        return results

