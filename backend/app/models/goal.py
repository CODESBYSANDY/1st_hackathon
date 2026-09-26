"""Career and learning goal domain models."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Goal:
    """Career target, timeline, and preparation milestones."""

    uid: str
    target_role: str
    domain_id: str
    target_date: Optional[str] = None
    target_companies: List[str] = field(default_factory=list)
    daily_study_minutes: int = 45
    milestones: List[dict] = field(default_factory=list)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
