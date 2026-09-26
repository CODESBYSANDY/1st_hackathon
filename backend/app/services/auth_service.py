"""Authentication service handling user token verification and session data."""

from typing import Any, Dict, Optional
from app.repositories.user_repository import UserRepository


class AuthService:
    """Business logic for user authentication state."""

    def __init__(self, user_repo: Optional[UserRepository] = None):
        self.user_repo = user_repo or UserRepository()

    def get_current_user_profile(self, user_token_claims: Dict[str, Any]) -> Dict[str, Any]:
        """Retrieve or initialize profile based on token claims."""
        uid = user_token_claims["uid"]
        user = self.user_repo.get_by_id(uid)
        if not user:
            return {
                "uid": uid,
                "email": user_token_claims.get("email"),
                "display_name": user_token_claims.get("name"),
                "photo_url": user_token_claims.get("picture"),
                "is_onboarded": False,
            }
        return user
