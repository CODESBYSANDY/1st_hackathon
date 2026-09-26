"""Pydantic schemas defining API contracts."""

from app.schemas.adaptive import (
    AdaptationHistoryItem,
    AdaptiveDecisionResponse,
    StudentStateResponse,
)
from app.schemas.assessment import (
    AssessmentDetailResponse,
    AssessmentResult,
    AssessmentSubmission,
    QuestionAnswerSubmission,
    QuestionResponse,
)
from app.schemas.auth import AuthUserResponse, TokenPayload
from app.schemas.common import (
    ErrorDetail,
    HealthResponse,
    PaginationParams,
    StandardResponse,
)
from app.schemas.community import CommentResponse, PostResponse
from app.schemas.learning import (
    LearningJourneyResponse,
    LessonDetailResponse,
    LessonSummary,
    NextActivityResponse,
)
from app.schemas.onboarding import OnboardingRequest, OnboardingResponse
from app.schemas.reward import AchievementResponse, UserRewardsResponse
from app.schemas.user import UserCreate, UserResponse, UserUpdate

__all__ = [
    "HealthResponse",
    "StandardResponse",
    "PaginationParams",
    "ErrorDetail",
    "TokenPayload",
    "AuthUserResponse",
    "UserCreate",
    "UserUpdate",
    "UserResponse",
    "OnboardingRequest",
    "OnboardingResponse",
    "LessonSummary",
    "LessonDetailResponse",
    "NextActivityResponse",
    "LearningJourneyResponse",
    "QuestionResponse",
    "AssessmentDetailResponse",
    "QuestionAnswerSubmission",
    "AssessmentSubmission",
    "AssessmentResult",
    "AdaptationHistoryItem",
    "StudentStateResponse",
    "AdaptiveDecisionResponse",
    "AchievementResponse",
    "UserRewardsResponse",
    "PostResponse",
    "CommentResponse",
]
