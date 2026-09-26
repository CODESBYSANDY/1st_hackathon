"""Updates student state based on learning evidence and assessment results."""

from typing import Any, Dict, List
from app.adaptive.difficulty import DifficultyManager
from app.utils.timestamps import now_iso


class StateUpdater:
    """Calculates state mutations given new evidence and historical state."""

    @classmethod
    def apply_evidence(
        cls,
        current_state: Dict[str, Any],
        evidence: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Produce an updated student state dictionary based on evidence.

        Evidence dictionary structure:
            - score_percentage: float
            - skill_tags: List[str]
            - difficulty: int
            - event_type: str (e.g. "assessment_completed", "lesson_finished")
            - action_taken: str
            - new_difficulty: int
            - rationale: str
        """
        updated_state = dict(current_state)
        skills = dict(updated_state.get("skills", {}))
        weak_areas = list(updated_state.get("weak_areas", []))
        strong_areas = list(updated_state.get("strong_areas", []))
        adaptation_history = list(updated_state.get("adaptation_history", []))

        score = float(evidence.get("score_percentage", 0.0))
        skill_tags = evidence.get("skill_tags", [])
        new_diff = DifficultyManager.clamp_difficulty(evidence.get("new_difficulty", updated_state.get("difficulty", 1)))

        # Update skill scores
        for skill in skill_tags:
            current_score = skills.get(skill, 50)
            # Dynamic weighting: calculate weighted progression towards assessment score
            delta = (score - current_score) * 0.5
            new_skill_score = max(0, min(100, round(current_score + delta)))
            skills[skill] = new_skill_score

            if new_skill_score >= 70 or score >= 85:
                if skill not in strong_areas:
                    strong_areas.append(skill)
                if skill in weak_areas:
                    weak_areas.remove(skill)
            elif new_skill_score < 50:
                if skill not in weak_areas:
                    weak_areas.append(skill)
                if skill in strong_areas:
                    strong_areas.remove(skill)

        # Log adaptation event
        history_entry = {
            "timestamp": now_iso(),
            "trigger_event": evidence.get("event_type", "evaluation"),
            "previous_difficulty": updated_state.get("difficulty", 1),
            "new_difficulty": new_diff,
            "decision_reason": evidence.get("rationale", ""),
            "action_taken": evidence.get("action_taken", "update"),
        }
        adaptation_history.append(history_entry)

        updated_state["skills"] = skills
        updated_state["weak_areas"] = weak_areas
        updated_state["strong_areas"] = strong_areas
        updated_state["difficulty"] = new_diff
        updated_state["adaptation_history"] = adaptation_history
        updated_state["updated_at"] = now_iso()

        return updated_state
