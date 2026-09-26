"""Community domain models for posts and comments."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Comment:
    """Comment in a discussion post."""

    id: str
    post_id: str
    author_id: str
    content: str
    created_at: Optional[str] = None
    likes_count: int = 0


@dataclass
class Post:
    """Community discussion post."""

    id: str
    author_id: str
    title: str
    content: str
    tags: List[str] = field(default_factory=list)
    created_at: Optional[str] = None
    comments_count: int = 0
    likes_count: int = 0
