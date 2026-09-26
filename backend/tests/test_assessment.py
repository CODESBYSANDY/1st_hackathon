"""Tests for assessment and evaluation schemas."""

from app.schemas.assessment import (
    AssessmentResult,
    AssessmentSubmission,
    QuestionAnswerSubmission,
)


def test_assessment_submission_and_result_schemas():
    """Verify assessment submission payload parsing and result models."""
    submission = AssessmentSubmission(
        assessment_id="diag_01",
        answers=[
            QuestionAnswerSubmission(
                question_id="q1",
                selected_option_id="opt_a",
                time_spent_seconds=25,
            )
        ],
    )
    assert submission.assessment_id == "diag_01"
    assert len(submission.answers) == 1

    result = AssessmentResult(
        assessment_id="diag_01",
        attempt_id="att_123",
        score_percentage=100.0,
        total_questions=1,
        correct_count=1,
        skill_updates={"networking": 85},
        weak_areas_identified=[],
        strong_areas_identified=["networking"],
    )
    assert result.score_percentage == 100.0
    assert result.skill_updates["networking"] == 85
