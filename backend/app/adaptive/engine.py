"""Adaptive Engine orchestrator combining deterministic rules and state updates."""

from typing import Any, Dict, List, Optional, Tuple
from app.adaptive.difficulty import DifficultyManager
from app.adaptive.path_generator import PathGenerator
from app.adaptive.rules import AdaptiveRules
from app.adaptive.state_updater import StateUpdater


class AdaptiveEngine:
    """Core Adaptive Engine coordinating evidence evaluation and state mutation.

    The engine is fully deterministic and testable without a web server or
    external services.  Gemini may augment recommendations later, but this
    engine owns the authoritative state transitions.
    """

    def __init__(self):
        self.rules = AdaptiveRules()
        self.difficulty_mgr = DifficultyManager()
        self.state_updater = StateUpdater()
        self.path_generator = PathGenerator()

    def process_evidence(
        self,
        current_state: Dict[str, Any],
        score_percentage: float,
        skill_tags: list,
        event_type: str = "assessment_completed",
        lessons: Optional[List[Dict[str, Any]]] = None,
        completed_lesson_ids: Optional[List[str]] = None,
    ) -> Tuple[Dict[str, Any], Dict[str, Any], Dict[str, Any]]:
        """Process evidence and compute adaptive decision and new state.

        Args:
            current_state: Current student state dict.
            score_percentage: Score achieved (0-100).
            skill_tags: Skills assessed in this evidence event.
            event_type: Type of evidence event.
            lessons: Optional list of domain lessons from Firestore.
            completed_lesson_ids: Optional list of lesson IDs already completed.

        Returns:
            Tuple[updated_state, decision_dict, next_activity_dict]
        """
        current_difficulty = current_state.get("difficulty", 1)

        # 1. Rule evaluation
        action, new_diff, rationale = self.rules.evaluate_performance(
            score_percentage=score_percentage,
            current_difficulty=current_difficulty,
        )

        # 2. Package evidence
        evidence = {
            "score_percentage": score_percentage,
            "skill_tags": skill_tags,
            "event_type": event_type,
            "action_taken": action,
            "new_difficulty": new_diff,
            "rationale": rationale,
        }

        # 3. Update state
        updated_state = self.state_updater.apply_evidence(
            current_state=current_state,
            evidence=evidence,
        )

        # 4. Generate next activity
        decision = {
            "action": action,
            "target_item_id": "suggested_activity",
            "target_item_type": "lesson" if action == "advance" else "challenge",
            "suggested_difficulty": new_diff,
            "rationale": rationale,
        }

        next_activity = self.path_generator.determine_next_activity(
            student_state=updated_state,
            lessons=lessons,
            completed_lesson_ids=completed_lesson_ids,
            action=action,
            rationale=rationale,
        )

        return updated_state, decision, next_activity
