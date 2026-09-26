"""Repository for Domain data access in Firestore."""

from typing import Any, Dict, List, Optional
try:
    from firebase_admin import firestore
except ImportError:
    firestore = None  # type: ignore

from app.db import collections
from app.db.firebase import get_firestore_client



class DomainRepository:
    """Handles read and write operations for domain documents in Firestore."""

    def __init__(self, db: Optional[firestore.Client] = None):
        self._db = db

    @property
    def db(self) -> Optional[firestore.Client]:
        """Lazy-loaded Firestore client."""
        if self._db is None:
            self._db = get_firestore_client()
        return self._db

    def get_domain(self, domain_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve domain document by ID."""
        if not self.db:
            return None
        doc = self.db.collection(collections.DOMAINS).document(domain_id).get()
        if doc.exists:
            data = doc.to_dict()
            data["id"] = doc.id
            return data
        return None

    def list_active_domains(self) -> List[Dict[str, Any]]:
        """List all active domains."""
        if not self.db:
            return []
        try:
            query = (
                self.db.collection(collections.DOMAINS)
                .where(filter=firestore.FieldFilter("active", "==", True))
                .stream()
            )
        except (TypeError, AttributeError):
            query = self.db.collection(collections.DOMAINS).where("active", "==", True).stream()
        results = []
        for doc in query:
            data = doc.to_dict()
            data["id"] = doc.id
            results.append(data)
        return results

    def list_all_domains(self) -> List[Dict[str, Any]]:
        """List all domains registered in the system."""
        if not self.db:
            return []
        query = self.db.collection(collections.DOMAINS).stream()
        results = []
        for doc in query:
            data = doc.to_dict()
            data["id"] = doc.id
            results.append(data)
        return results

    def create_domain(self, domain_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new domain document."""
        if not self.db:
            return data
        self.db.collection(collections.DOMAINS).document(domain_id).set(data)
        return data

    def upsert_domain(self, domain_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update a domain document."""
        if not self.db:
            return data
        self.db.collection(collections.DOMAINS).document(domain_id).set(data, merge=True)
        return data

