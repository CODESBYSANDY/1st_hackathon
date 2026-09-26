"""Skill domain model."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Skill:
    """A granular skill node in a domain curriculum."""

    id: str
    name: str
    domain_id: str
    category: str
    description: Optional[str] = None
    prerequisites: List[str] = field(default_factory=list)
    difficulty_level: int = 1
