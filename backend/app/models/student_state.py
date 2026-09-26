"""Student persistent learning state model for the Adaptive Engine."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class StudentState:
    """Core domain model representing dynamic student learning state and proficiency."""

    user_id: str
    domain_id: Optional[str] = None
    skills: Dict[str, int] = field(default_factory=dict)
    current_lesson_id: Optional[str] = None
    difficulty: int = 1
    weak_areas: List[str] = field(default_factory=list)
    strong_areas: List[str] = field(default_factory=list)
    recent_performance: Dict[str, Any] = field(default_factory=dict)
    learning_preferences: Dict[str, Any] = field(default_factory=dict)
    adaptation_history: List[Dict[str, Any]] = field(default_factory=list)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
