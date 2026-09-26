"""Adaptive service coordinating state queries and adaptive engine decisions."""

from typing import Any, Dict, List, Optional
from app.adaptive.engine import AdaptiveEngine
from app.repositories.state_repository import StateRepository
from app.schemas.adaptive import AdaptiveDecisionResponse, StudentStateResponse
from app.schemas.learning import NextActivityResponse


class AdaptiveService:
    """Service layer interface for the Adaptive Engine."""

    def __init__(
        self,
        state_repo: Optional[StateRepository] = None,
        engine: Optional[AdaptiveEngine] = None,
    ):
        self.state_repo = state_repo or StateRepository()
        self.engine = engine or AdaptiveEngine()

    def get_student_state(self, uid: str) -> Optional[Dict[str, Any]]:
        """Fetch current student state."""
        return self.state_repo.get_student_state(uid)

    def process_assessment_evidence(
        self,
        uid: str,
        assessment_id: str,
        score_percentage: float,
        skill_tags: List[str],
    ) -> Dict[str, Any]:
        """Process evidence from completed assessment and update persistent state."""
        current_state = self.state_repo.get_student_state(uid) or {
            "user_id": uid,
            "skills": {},
            "difficulty": 1,
            "weak_areas": [],
            "strong_areas": [],
            "adaptation_history": [],
        }

        updated_state, decision, next_activity = self.engine.process_evidence(
            current_state=current_state,
            score_percentage=score_percentage,
            skill_tags=skill_tags,
            event_type=f"assessment_completed:{assessment_id}",
        )

        self.state_repo.upsert_student_state(uid, updated_state)
        return {"updated_state": updated_state, "decision": decision, "next_activity": next_activity}

    def get_next_activity(self, uid: str) -> NextActivityResponse:
        """Calculate and return the next recommended activity for the student."""
        state = self.state_repo.get_student_state(uid) or {
            "user_id": uid,
            "domain_id": "software_engineering",
            "skills": {},
            "difficulty": 1,
            "weak_areas": [],
            "strong_areas": [],
        }

        activity = self.engine.path_generator.determine_next_activity(
            student_state=state,
            action="advance" if state.get("difficulty", 1) >= 1 else "reinforce",
            rationale="Initial adaptive path determination",
        )

        return NextActivityResponse(**activity)
