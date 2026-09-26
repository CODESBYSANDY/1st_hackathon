"""Onboarding service initializing student profile and state."""

from typing import Any, Dict, Optional
from app.repositories.profile_repository import ProfileRepository
from app.repositories.state_repository import StateRepository
from app.repositories.user_repository import UserRepository
from app.schemas.onboarding import OnboardingRequest, OnboardingResponse
from app.utils.timestamps import now_iso


class OnboardingService:
    """Orchestrates new student onboarding, profile creation, and state initialization."""

    def __init__(
        self,
        user_repo: Optional[UserRepository] = None,
        profile_repo: Optional[ProfileRepository] = None,
        state_repo: Optional[StateRepository] = None,
    ):
        self.user_repo = user_repo or UserRepository()
        self.profile_repo = profile_repo or ProfileRepository()
        self.state_repo = state_repo or StateRepository()

    def complete_onboarding(self, uid: str, payload: OnboardingRequest) -> OnboardingResponse:
        """Process onboarding submission and set up initial student state."""
        timestamp = now_iso()

        # 1. Update user onboarding status
        self.user_repo.create(
            uid,
            {"uid": uid, "is_onboarded": True, "updated_at": timestamp},
        )

        # 2. Upsert profile
        self.profile_repo.upsert(
            uid,
            {
                "uid": uid,
                "target_role": payload.target_role,
                "domain_id": payload.domain_id,
                "preferred_learning_style": payload.preferred_learning_style,
                "created_at": timestamp,
                "updated_at": timestamp,
            },
        )

        # 3. Initialize baseline student state
        initial_skills = {skill: 50 for skill in (payload.initial_skills or [])}
        self.state_repo.upsert_student_state(
            uid,
            {
                "user_id": uid,
                "domain_id": payload.domain_id,
                "skills": initial_skills,
                "difficulty": 1,
                "weak_areas": [],
                "strong_areas": [],
                "recent_performance": {},
                "learning_preferences": {
                    "style": payload.preferred_learning_style,
                    "target_timeline_months": payload.target_timeline_months,
                },
                "adaptation_history": [],
                "created_at": timestamp,
                "updated_at": timestamp,
            },
        )

        return OnboardingResponse(
            success=True,
            user_id=uid,
            domain_id=payload.domain_id,
            message="Onboarding successfully completed and student state initialized.",
            initial_state_created=True,
        )
