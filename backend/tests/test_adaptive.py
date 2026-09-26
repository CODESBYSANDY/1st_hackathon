"""Unit tests for the Adaptive Engine and deterministic rules."""

from app.adaptive.difficulty import DifficultyManager
from app.adaptive.engine import AdaptiveEngine
from app.adaptive.rules import AdaptiveRules
from app.adaptive.state_updater import StateUpdater


def test_adaptive_rules_high_score_advancement():
    """Score >= 80% should trigger 'advance' action and increase difficulty."""
    action, new_diff, rationale = AdaptiveRules.evaluate_performance(
        score_percentage=90.0,
        current_difficulty=2,
    )
    assert action == "advance"
    assert new_diff == 3
    assert "Advancing" in rationale


def test_adaptive_rules_low_score_prerequisite():
    """Score < 50% should trigger 'prerequisite_revision' and decrease difficulty."""
    action, new_diff, rationale = AdaptiveRules.evaluate_performance(
        score_percentage=40.0,
        current_difficulty=3,
    )
    assert action == "prerequisite_revision"
    assert new_diff == 2
    assert "prerequisite" in rationale.lower()


def test_difficulty_clamping():
    """Difficulty must never go below 1 or above 5."""
    assert DifficultyManager.clamp_difficulty(0) == 1
    assert DifficultyManager.clamp_difficulty(-5) == 1
    assert DifficultyManager.clamp_difficulty(6) == 5
    assert DifficultyManager.clamp_difficulty(3) == 3


def test_adaptive_engine_evidence_processing():
    """Verify complete adaptive pipeline from initial state to updated state and next activity."""
    engine = AdaptiveEngine()
    initial_state = {
        "user_id": "test_student",
        "domain_id": "cybersecurity",
        "skills": {"networking": 50},
        "difficulty": 2,
        "weak_areas": [],
        "strong_areas": [],
        "adaptation_history": [],
    }

    updated_state, decision, next_activity = engine.process_evidence(
        current_state=initial_state,
        score_percentage=95.0,
        skill_tags=["networking"],
    )

    assert decision["action"] == "advance"
    assert updated_state["difficulty"] == 3
    assert updated_state["skills"]["networking"] > 50
    assert "networking" in updated_state["strong_areas"]
    assert len(updated_state["adaptation_history"]) == 1
    assert next_activity["activity_type"] == "lesson"
