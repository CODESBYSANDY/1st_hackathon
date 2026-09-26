"""Assessment and attempt domain models."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Question:
    """Assessment question item."""

    id: str
    prompt: str
    question_type: str
    skill_tag: str
    difficulty: int
    options: List[Dict[str, str]] = field(default_factory=list)
    correct_option_id: Optional[str] = None
    explanation: Optional[str] = None


@dataclass
class Assessment:
    """Diagnostic or checkpoint assessment test."""

    id: str
    title: str
    domain_id: str
    assessment_type: str
    questions: List[Question] = field(default_factory=list)
    passing_score: float = 70.0


@dataclass
class AssessmentAttempt:
    """Student submission and evaluation result of an assessment."""

    id: str
    user_id: str
    assessment_id: str
    score_percentage: float
    total_questions: int
    correct_count: int
    answers: List[Dict[str, Any]] = field(default_factory=list)
    evaluated_at: Optional[str] = None
