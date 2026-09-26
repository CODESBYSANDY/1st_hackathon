"""Authentication-related schemas."""

from typing import Optional
from pydantic import BaseModel, Field


class TokenPayload(BaseModel):
    """Decoded Firebase token claims."""

    uid: str
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    email_verified: Optional[bool] = False


class AuthUserResponse(BaseModel):
    """Authenticated user info response."""

    uid: str
    email: Optional[str] = None
    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    is_onboarded: bool = False
