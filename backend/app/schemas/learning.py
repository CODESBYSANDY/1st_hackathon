"""Learning module schemas."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class LessonSummary(BaseModel):
    """Concise representation of a lesson."""

    id: str
    title: str
    domain_id: str
    difficulty_level: int = Field(default=1, ge=1, le=5)
    estimated_minutes: int = 15
    is_completed: bool = False


class LessonDetailResponse(LessonSummary):
    """Detailed lesson view with content and interactive elements."""

    description: str = ""
    content_markdown: str = ""
    skill_id: Optional[str] = None
    lesson_type: Optional[str] = None
    key_takeaways: List[str] = Field(default_factory=list)
    prerequisites: List[str] = Field(default_factory=list)


class NextActivityResponse(BaseModel):
    """Next recommended learning activity determined by the adaptive engine."""

    activity_type: str = Field(..., description="lesson | assessment | simulation | challenge | revision")
    activity_id: str
    title: str
    domain_id: str
    difficulty: int
    reason: str
    prerequisite_remedy: bool = False


class JourneyItem(BaseModel):
    """Single item in the personalized learning journey."""

    lessonId: str
    title: str
    type: str = "lesson"
    difficulty: int = 1
    skillId: Optional[str] = None
    reason: str = ""
    is_completed: bool = False


class JourneyDomainInfo(BaseModel):
    """Domain metadata in journey response."""

    id: str
    name: str


class JourneyStudentStateInfo(BaseModel):
    """Relevant student state info in journey response."""

    weakAreas: List[str] = Field(default_factory=list)
    strongAreas: List[str] = Field(default_factory=list)
    difficulty: int = 1
    skills: Dict[str, int] = Field(default_factory=dict)


class PersonalizedJourneyResponse(BaseModel):
    """Full personalized journey response for the frontend."""

    domain: JourneyDomainInfo
    studentState: JourneyStudentStateInfo
    journey: List[JourneyItem] = Field(default_factory=list)


class LearningJourneyResponse(BaseModel):
    """Structured learning path customized for the student (legacy compat)."""

    domain_id: str
    current_module: str
    completed_lessons: List[str] = Field(default_factory=list)
    upcoming_lessons: List[LessonSummary] = Field(default_factory=list)
    next_activity: Optional[NextActivityResponse] = None
