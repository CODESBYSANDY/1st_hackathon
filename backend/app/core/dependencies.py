"""FastAPI dependency providers for authentication, database, and settings."""

from typing import Any, Dict, Optional
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import firestore
from app.core.config import Settings, get_settings
from app.core.exceptions import FirebaseNotConfiguredError, UnauthorizedError
from app.core.security import verify_firebase_token
from app.db.firebase import get_firestore_client, is_firebase_initialized

# Optional bearer schema so missing headers don't fail immediately on non-strict routes
http_bearer = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(http_bearer),
) -> Dict[str, Any]:
    """Extract and verify Firebase ID token from Authorization header.

    Returns the verified user token dictionary containing 'uid'.
    """
    if credentials is None or not credentials.credentials:
        raise UnauthorizedError(message="Authorization header missing or malformed")

    token = credentials.credentials
    return verify_firebase_token(token)


def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(http_bearer),
) -> Optional[Dict[str, Any]]:
    """Extract and verify Firebase ID token if present, otherwise return None."""
    if credentials is None or not credentials.credentials:
        return None

    try:
        return verify_firebase_token(credentials.credentials)
    except Exception:
        return None


def get_db() -> firestore.Client:
    """Provide an active Firestore client instance.

    Raises:
        FirebaseNotConfiguredError: If Firebase is not configured.
    """
    client = get_firestore_client()
    if client is None:
        raise FirebaseNotConfiguredError(
            message="Database unavailable: Firebase is not configured"
        )
    return client
