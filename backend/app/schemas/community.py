"""Community discussion and collaboration schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class CommentResponse(BaseModel):
    """Community discussion comment."""

    id: str
    post_id: str
    author_id: str
    author_name: str
    author_photo_url: Optional[str] = None
    content: str
    created_at: str
    likes_count: int = 0


class PostResponse(BaseModel):
    """Community discussion post."""

    id: str
    author_id: str
    author_name: str
    author_photo_url: Optional[str] = None
    title: str
    content: str
    tags: List[str] = Field(default_factory=list)
    created_at: str
    comments_count: int = 0
    likes_count: int = 0
