"""Learning service managing lessons, curriculum journeys, and study materials."""

from typing import Any, Dict, List, Optional
from app.core.exceptions import NotFoundError
from app.repositories.learning_repository import LearningRepository
from app.repositories.state_repository import StateRepository


class LearningService:
    """Business logic for lesson retrieval and curriculum progression."""

    def __init__(
        self,
        learning_repo: Optional[LearningRepository] = None,
        state_repo: Optional[StateRepository] = None,
    ):
        self.learning_repo = learning_repo or LearningRepository()
        self.state_repo = state_repo or StateRepository()

    def get_lesson(self, lesson_id: str) -> Dict[str, Any]:
        """Fetch lesson content and instructions."""
        lesson = self.learning_repo.get_lesson(lesson_id)
        if not lesson:
            raise NotFoundError(message=f"Lesson '{lesson_id}' not found")
        return lesson

    def get_journey(self, uid: str) -> Dict[str, Any]:
        """Fetch personalized learning journey for the authenticated user."""
        state = self.state_repo.get_student_state(uid) or {}
        domain_id = state.get("domain_id", "software_engineering")
        lessons = self.learning_repo.list_lessons_by_domain(domain_id)

        return {
            "domain_id": domain_id,
            "current_module": "Core Fundamentals",
            "completed_lessons": [],
            "upcoming_lessons": lessons,
        }
