"""Tests for learning and curriculum schemas."""

from app.schemas.learning import LessonSummary, NextActivityResponse


def test_lesson_summary_defaults():
    """Verify LessonSummary schema initialization."""
    lesson = LessonSummary(
        id="lesson_01",
        title="TCP/IP Model Basics",
        domain_id="cybersecurity",
        difficulty_level=2,
    )
    assert lesson.id == "lesson_01"
    assert lesson.estimated_minutes == 15
    assert lesson.is_completed is False


def test_next_activity_response_model():
    """Verify NextActivityResponse model structure."""
    activity = NextActivityResponse(
        activity_type="lesson",
        activity_id="lesson_02",
        title="Subnetting Fundamentals",
        domain_id="cybersecurity",
        difficulty=2,
        reason="Demonstrated basic proficiency",
        prerequisite_remedy=False,
    )
    assert activity.activity_type == "lesson"
    assert activity.prerequisite_remedy is False


def test_domain_repository_unconfigured_safe_fallbacks():
    """Verify DomainRepository gracefully returns defaults when DB is unconfigured."""
    from app.repositories.domain_repository import DomainRepository

    repo = DomainRepository(db=None)
    assert repo.get_domain("non_existent") is None
    assert repo.list_active_domains() == []
    assert repo.list_all_domains() == []
    assert repo.create_domain("dom_1", {"title": "Test"}) == {"title": "Test"}
    assert repo.upsert_domain("dom_1", {"title": "Test"}) == {"title": "Test"}

