"""Authentication and security utilities for Firebase token verification."""

import logging
from typing import Any, Dict, Optional
from firebase_admin import auth
from app.core.exceptions import FirebaseNotConfiguredError, UnauthorizedError
from app.db.firebase import is_firebase_initialized

logger = logging.getLogger(__name__)


def verify_firebase_token(token: str) -> Dict[str, Any]:
    """Verify a Firebase ID token and return decoded user claims.

    Args:
        token: The Firebase JWT ID token string.

    Returns:
        Dict[str, Any]: Decoded token payload containing uid, email, etc.

    Raises:
        UnauthorizedError: If the token is invalid, expired, or revoked.
        FirebaseNotConfiguredError: If Firebase Admin SDK is not initialized.
    """
    if not token or not token.strip():
        raise UnauthorizedError(message="Missing authentication token")

    if not is_firebase_initialized():
        raise FirebaseNotConfiguredError(
            message="Authentication service unavailable: Firebase is not configured"
        )

    try:
        decoded_token = auth.verify_id_token(token, check_revoked=True)
        return decoded_token
    except auth.ExpiredIdTokenError:
        logger.warning("Firebase ID token expired")
        raise UnauthorizedError(message="Authentication token has expired")
    except auth.RevokedIdTokenError:
        logger.warning("Firebase ID token has been revoked")
        raise UnauthorizedError(message="Authentication token has been revoked")
    except auth.InvalidIdTokenError as e:
        logger.warning("Invalid Firebase ID token: %s", e)
        raise UnauthorizedError(message="Invalid authentication token")
    except Exception as e:
        logger.error("Unexpected error during token verification: %s", e)
        raise UnauthorizedError(message="Failed to verify authentication token")
