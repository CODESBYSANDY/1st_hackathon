"""Student Profile domain model."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Profile:
    """Detailed student academic and placement profile."""

    uid: str
    target_role: Optional[str] = None
    target_company_tier: Optional[str] = None
    college_name: Optional[str] = None
    graduation_year: Optional[int] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    bio: Optional[str] = None
    interests: List[str] = field(default_factory=list)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
