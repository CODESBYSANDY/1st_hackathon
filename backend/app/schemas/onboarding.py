"""Onboarding request and response schemas."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class DomainSelectionRequest(BaseModel):
    """Payload for selecting a preparation domain."""

    domainId: str = Field(..., description="Selected domain ID, e.g. cybersecurity, cloud, web_development")


class DomainSelectionResponse(BaseModel):
    """Response after selecting a domain and initializing student state."""

    success: bool
    user_id: str
    domain: Dict[str, Any]
    skills_initialized: List[str]
    message: str


class OnboardingRequest(BaseModel):
    """Payload submitted when completing onboarding."""

    domain_id: str = Field(..., description="Selected preparation domain, e.g. software_engineering, cybersecurity")
    target_role: str = Field(..., description="Target job role")
    target_timeline_months: int = Field(default=6, ge=1, le=24)
    current_education_level: Optional[str] = None
    preferred_learning_style: Optional[str] = Field(default="interactive", description="visual, theoretical, hands-on, etc.")
    initial_skills: Optional[List[str]] = Field(default_factory=list)


class OnboardingResponse(BaseModel):
    """Response returned after completing onboarding."""

    success: bool
    user_id: str
    domain_id: str
    message: str
    initial_state_created: bool = True
