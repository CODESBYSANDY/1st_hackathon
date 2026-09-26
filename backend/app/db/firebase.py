"""Firebase Admin SDK initialization and Firestore client provider."""

import logging
import os
from typing import Optional
import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings

logger = logging.getLogger(__name__)

_firebase_app: Optional[firebase_admin.App] = None
_firestore_client: Optional[firestore.Client] = None
_initialization_attempted: bool = False


def initialize_firebase() -> Optional[firebase_admin.App]:
    """Initialize Firebase Admin SDK using configured credentials.

    Falls back gracefully if credentials are not provided so the server can
    still run (e.g., for health checks, local testing).
    """
    global _firebase_app, _initialization_attempted

    if _firebase_app is not None:
        return _firebase_app

    if _initialization_attempted:
        return _firebase_app

    _initialization_attempted = True

    try:
        # Check if already initialized by another module
        _firebase_app = firebase_admin.get_app()
        return _firebase_app
    except ValueError:
        pass  # Not initialized yet

    cred: Optional[credentials.Base] = None

    # Option 1: Explicit credentials file path
    if settings.FIREBASE_CREDENTIALS_PATH and os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
        try:
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            logger.info("Initializing Firebase from credentials file: %s", settings.FIREBASE_CREDENTIALS_PATH)
        except Exception as e:
            logger.error("Failed to load Firebase credentials file: %s", e)

    # Option 2: Environment variables
    elif settings.FIREBASE_PROJECT_ID and settings.FIREBASE_CLIENT_EMAIL and settings.FIREBASE_PRIVATE_KEY:
        try:
            private_key = settings.FIREBASE_PRIVATE_KEY.replace("\\n", "\n")
            cred_dict = {
                "type": "service_account",
                "project_id": settings.FIREBASE_PROJECT_ID,
                "client_email": settings.FIREBASE_CLIENT_EMAIL,
                "private_key": private_key,
                "token_uri": "https://oauth2.googleapis.com/token",
            }
            cred = credentials.Certificate(cred_dict)
            logger.info("Initializing Firebase from environment variables for project: %s", settings.FIREBASE_PROJECT_ID)
        except Exception as e:
            logger.error("Failed to load Firebase credentials from environment: %s", e)

    # Option 3: Google Application Default Credentials
    elif os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        try:
            cred = credentials.ApplicationDefault()
            logger.info("Initializing Firebase from Application Default Credentials")
        except Exception as e:
            logger.error("Failed to load Application Default Credentials: %s", e)

    if cred is not None:
        try:
            _firebase_app = firebase_admin.initialize_app(cred)
            logger.info("Firebase Admin SDK successfully initialized.")
            return _firebase_app
        except Exception as e:
            logger.error("Error during Firebase initialization: %s", e)
            _firebase_app = None
    else:
        logger.warning(
            "Firebase credentials not provided. Database operations requiring Firestore "
            "will be unavailable until credentials are configured."
        )

    return _firebase_app


def is_firebase_initialized() -> bool:
    """Return True if Firebase Admin SDK is successfully initialized."""
    app = initialize_firebase()
    return app is not None


def get_firestore_client() -> Optional[firestore.Client]:
    """Provide a singleton Firestore client instance, or None if Firebase is unconfigured."""
    global _firestore_client
    if _firestore_client is not None:
        return _firestore_client

    app = initialize_firebase()
    if app is not None:
        try:
            _firestore_client = firestore.client(app=app)
            return _firestore_client
        except Exception as e:
            logger.error("Failed to acquire Firestore client: %s", e)
            return None
    return None
