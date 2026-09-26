"""Deterministic rule evaluation for student progression and difficulty adjustment."""

from typing import Any, Dict, List, Tuple


class AdaptiveRules:
    """Evaluates rule-based pedagogical logic on student performance evidence."""

    MASTERY_THRESHOLD: float = 80.0
    PASSING_THRESHOLD: float = 65.0
    REINFORCEMENT_THRESHOLD: float = 50.0

    @classmethod
    def evaluate_performance(
        cls, score_percentage: float, current_difficulty: int
    ) -> Tuple[str, int, str]:
        """Evaluate score and determine action and difficulty transition.

        Returns:
            Tuple[str, int, str]: (action, new_difficulty, rationale)
        """
        if score_percentage >= cls.MASTERY_THRESHOLD:
            new_diff = min(5, current_difficulty + 1)
            action = "advance"
            rationale = (
                f"Demonstrated high mastery ({score_percentage:.1f}%). "
                f"Advancing to next concept at difficulty {new_diff}."
            )
        elif score_percentage >= cls.PASSING_THRESHOLD:
            new_diff = current_difficulty
            action = "reinforce"
            rationale = (
                f"Satisfactory performance ({score_percentage:.1f}%). "
                f"Providing practice reinforcement at current difficulty {new_diff}."
            )
        elif score_percentage >= cls.REINFORCEMENT_THRESHOLD:
            new_diff = max(1, current_difficulty)
            action = "reinforce"
            rationale = (
                f"Needs additional conceptual reinforcement ({score_percentage:.1f}%)."
            )
        else:
            new_diff = max(1, current_difficulty - 1)
            action = "prerequisite_revision"
            rationale = (
                f"Significant knowledge gap detected ({score_percentage:.1f}%). "
                f"Recommending prerequisite review at difficulty {new_diff}."
            )

        return action, new_diff, rationale
