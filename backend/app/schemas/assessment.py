"""Assessment, diagnostic, and evaluation schemas."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class QuestionOption(BaseModel):
    """Option for a multiple-choice question."""

    id: str
    text: str


class QuestionResponse(BaseModel):
    """Assessment question presented to the user."""

    id: str
    prompt: str
    question_type: str = Field(default="multiple_choice", description="multiple_choice | code | scenario")
    options: Optional[List[QuestionOption]] = None
    skill_tag: str
    difficulty: int = 1


class AssessmentDetailResponse(BaseModel):
    """Assessment metadata and questions."""

    id: str
    title: str
    domain_id: str
    assessment_type: str = Field(default="diagnostic", description="diagnostic | module_quiz | adaptive_checkpoint")
    total_questions: int
    questions: List[QuestionResponse] = Field(default_factory=list)


class QuestionAnswerSubmission(BaseModel):
    """Individual question answer in a submission."""

    question_id: str
    selected_option_id: Optional[str] = None
    text_answer: Optional[str] = None
    time_spent_seconds: Optional[int] = None


class AssessmentSubmission(BaseModel):
    """Payload for submitting assessment answers."""

    assessment_id: str
    answers: List[QuestionAnswerSubmission]


class DiagnosticSubmission(BaseModel):
    """Payload for submitting a diagnostic assessment."""

    domainId: str = Field(..., description="Domain the diagnostic is for")
    answers: List[QuestionAnswerSubmission]


class NextActivityInfo(BaseModel):
    """Recommended next activity after an assessment or event."""

    lessonId: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None
    difficulty: Optional[int] = None
    reason: str


class AssessmentResult(BaseModel):
    """Evaluation result returned to the student after completing an assessment."""

    assessment_id: str
    attempt_id: str
    score_percentage: float
    total_questions: int
    correct_count: int
    skill_updates: Dict[str, int] = Field(default_factory=dict, description="Skill mastery delta/new levels")
    weak_areas_identified: List[str] = Field(default_factory=list)
    strong_areas_identified: List[str] = Field(default_factory=list)
    student_state_updated: bool = True
    next_activity: Optional[NextActivityInfo] = None
    ai_feedback: Optional[str] = None


class LessonCompleteRequest(BaseModel):
    """Payload for marking a lesson as completed."""

    time_spent_seconds: int = Field(default=0, ge=0)
    score: Optional[float] = Field(default=None, ge=0.0, le=100.0)


class LessonCompleteResponse(BaseModel):
    """Response after completing a lesson."""

    success: bool
    lesson_id: str
    user_id: str
    is_completed: bool
    completed_at: str
    student_state_updated: bool = True
    next_activity: Optional[NextActivityInfo] = None
    message: str
