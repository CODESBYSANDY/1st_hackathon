"""Adaptive Engine request and response schemas."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class AdaptationHistoryItem(BaseModel):
    """Log of an adaptive action taken by the engine."""

    timestamp: str
    trigger_event: str
    previous_difficulty: int
    new_difficulty: int
    decision_reason: str
    action_taken: str


class StudentStateResponse(BaseModel):
    """API response model for persistent student learning state."""

    user_id: str
    domain_id: Optional[str] = None
    skills: Dict[str, int] = Field(default_factory=dict, description="Skill keys and proficiency scores (0-100)")
    current_lesson_id: Optional[str] = None
    difficulty: int = Field(default=1, ge=1, le=5)
    weak_areas: List[str] = Field(default_factory=list)
    strong_areas: List[str] = Field(default_factory=list)
    recent_performance: Dict[str, Any] = Field(default_factory=dict)
    learning_preferences: Dict[str, Any] = Field(default_factory=dict)
    adaptation_history: List[AdaptationHistoryItem] = Field(default_factory=list)
    updated_at: Optional[str] = None


class AdaptiveDecisionResponse(BaseModel):
    """Engine recommendation output."""

    action: str = Field(..., description="advance | reinforce | prerequisite_revision | challenge")
    target_item_id: str
    target_item_type: str = Field(..., description="lesson | assessment | simulation | challenge")
    suggested_difficulty: int
    rationale: str
