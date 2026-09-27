"""User profile and account management service."""

from typing import Any, Dict, Optional
from app.core.exceptions import NotFoundError
from app.repositories.profile_repository import ProfileRepository
from app.repositories.user_repository import UserRepository
from app.utils.timestamps import now_iso


class UserService:
    """Business logic for user profiles and account data."""

    def __init__(
        self,
        user_repo: Optional[UserRepository] = None,
        profile_repo: Optional[ProfileRepository] = None,
    ):
        self.user_repo = user_repo or UserRepository()
        self.profile_repo = profile_repo or ProfileRepository()

    def get_user(self, uid: str) -> Dict[str, Any]:
        """Fetch user by UID."""
        user = self.user_repo.get_by_id(uid)
        if not user:
            raise NotFoundError(message=f"User {uid} not found")
        return user

    def get_or_create_user(self, token_claims: Dict[str, Any]) -> Dict[str, Any]:
        """Get existing user or create on first login. Never overwrites existing progress."""
        uid = token_claims["uid"]
        existing = self.user_repo.get_by_id(uid)

        if existing:
            # Update lastLoginAt without overwriting progress
            self.user_repo.update(uid, {"last_login_at": now_iso()})
            existing["last_login_at"] = now_iso()
            return existing

        # First-time user creation
        new_user = {
            "uid": uid,
            "email": token_claims.get("email"),
            "display_name": token_claims.get("name"),
            "photo_url": token_claims.get("picture"),
            "selected_domain": None,
            "is_onboarded": False,
            "created_at": now_iso(),
            "last_login_at": now_iso(),
        }
        self.user_repo.create(uid, new_user)
        return new_user

    def update_profile(self, uid: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update student profile fields."""
        update_data["updated_at"] = now_iso()
        return self.profile_repo.upsert(uid, update_data)
