"""Lesson domain model."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Lesson:
    """A learning lesson unit containing instructional content."""

    id: str
    title: str
    domain_id: str
    difficulty_level: int
    estimated_minutes: int
    description: str
    content_markdown: str
    skill_tags: List[str] = field(default_factory=list)
    prerequisites: List[str] = field(default_factory=list)
    key_takeaways: List[str] = field(default_factory=list)
    order_index: int = 0
