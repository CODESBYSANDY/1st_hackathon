"""Tests for onboarding schemas and initialization."""

from app.schemas.onboarding import OnboardingRequest, OnboardingResponse


def test_onboarding_request_validation():
    """Verify OnboardingRequest schema parsing and default field values."""
    payload = {
        "domain_id": "cybersecurity",
        "target_role": "Security Analyst",
        "target_timeline_months": 6,
        "initial_skills": ["networking", "linux"],
    }
    req = OnboardingRequest(**payload)
    assert req.domain_id == "cybersecurity"
    assert req.target_role == "Security Analyst"
    assert req.preferred_learning_style == "interactive"
    assert len(req.initial_skills) == 2


def test_onboarding_response_model():
    """Verify OnboardingResponse schema structure."""
    res = OnboardingResponse(
        success=True,
        user_id="user_123",
        domain_id="cybersecurity",
        message="Onboarding complete",
        initial_state_created=True,
    )
    assert res.success is True
    assert res.user_id == "user_123"
