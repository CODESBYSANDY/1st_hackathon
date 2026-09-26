"""Learning progress domain model."""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class LessonProgress:
    """Individual lesson completion progress record."""

    user_id: str
    lesson_id: str
    is_completed: bool = False
    completed_at: Optional[str] = None
    time_spent_seconds: int = 0
    score: Optional[float] = None
