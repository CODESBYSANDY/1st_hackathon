"""User and profile schemas."""

from typing import Optional
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    """Base user schema."""

    email: Optional[str] = None
    display_name: Optional[str] = None
    photo_url: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user profile creation."""

    uid: str


class UserUpdate(BaseModel):
    """Schema for updating user profile fields."""

    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    target_role: Optional[str] = None
    target_company_tier: Optional[str] = None


class UserResponse(UserBase):
    """API response model for user profile."""

    uid: str
    is_onboarded: bool = False
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
