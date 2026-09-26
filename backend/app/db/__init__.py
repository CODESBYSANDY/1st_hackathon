"""Database layer including Firebase initialization and collection constants."""

from app.db import collections
from app.db.firebase import get_firestore_client, is_firebase_initialized

__all__ = ["collections", "get_firestore_client", "is_firebase_initialized"]
