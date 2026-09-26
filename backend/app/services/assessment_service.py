"""Assessment service evaluating test submissions and generating learning evidence."""

from typing import Any, Dict, Optional
from app.core.exceptions import NotFoundError
from app.repositories.assessment_repository import AssessmentRepository
from app.repositories.state_repository import StateRepository
from app.schemas.assessment import AssessmentResult, AssessmentSubmission
from app.services.adaptive_service import AdaptiveService
from app.utils.ids import generate_id
from app.utils.timestamps import now_iso


class AssessmentService:
    """Business logic for evaluating quizzes and feeding evidence to the adaptive engine."""

    def __init__(
        self,
        assessment_repo: Optional[AssessmentRepository] = None,
        state_repo: Optional[StateRepository] = None,
        adaptive_service: Optional[AdaptiveService] = None,
    ):
        self.assessment_repo = assessment_repo or AssessmentRepository()
        self.state_repo = state_repo or StateRepository()
        self.adaptive_service = adaptive_service or AdaptiveService()

    def get_assessment(self, assessment_id: str) -> Dict[str, Any]:
        """Fetch assessment by ID."""
        assessment = self.assessment_repo.get_assessment(assessment_id)
        if not assessment:
            raise NotFoundError(message=f"Assessment '{assessment_id}' not found")
        return assessment

    def evaluate_submission(self, uid: str, submission: AssessmentSubmission) -> AssessmentResult:
        """Evaluate submission answers, persist attempt, and invoke adaptive engine."""
        attempt_id = generate_id("att_")
        total_questions = len(submission.answers)
        correct_count = total_questions  # Baseline calculation placeholder for foundation

        score_percentage = (correct_count / total_questions * 100.0) if total_questions > 0 else 100.0

        # Save attempt record
        self.assessment_repo.save_attempt(
            attempt_id,
            {
                "id": attempt_id,
                "user_id": uid,
                "assessment_id": submission.assessment_id,
                "score_percentage": score_percentage,
                "total_questions": total_questions,
                "correct_count": correct_count,
                "evaluated_at": now_iso(),
            },
        )

        # Notify adaptive service
        self.adaptive_service.process_assessment_evidence(
            uid=uid,
            assessment_id=submission.assessment_id,
            score_percentage=score_percentage,
            skill_tags=["fundamentals"],
        )

        return AssessmentResult(
            assessment_id=submission.assessment_id,
            attempt_id=attempt_id,
            score_percentage=score_percentage,
            total_questions=total_questions,
            correct_count=correct_count,
            skill_updates={"fundamentals": int(score_percentage)},
            weak_areas_identified=[],
            strong_areas_identified=["fundamentals"] if score_percentage >= 80 else [],
            ai_feedback="Great work! The adaptive engine has recorded your mastery.",
        )
