"""User domain model."""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class User:
    """User domain entity representing an authenticated student or admin."""

    uid: str
    email: Optional[str] = None
    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    is_active: bool = True
    is_onboarded: bool = False
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
