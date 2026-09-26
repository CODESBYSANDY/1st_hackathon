"""Generates next learning activities using student state and available lessons."""

from typing import Any, Dict, List, Optional


class PathGenerator:
    """Computes personalized learning path based on student state and Firestore lesson data.

    Unlike the Phase 1 placeholder, this generator uses actual lesson data
    to select the most appropriate next activity based on the student's
    skill gaps, completed lessons, and difficulty level.
    """

    @classmethod
    def generate_journey(
        cls,
        student_state: Dict[str, Any],
        lessons: List[Dict[str, Any]],
        completed_lesson_ids: List[str],
    ) -> List[Dict[str, Any]]:
        """Generate a personalized ordered learning journey.

        Args:
            student_state: Current student state including skills, weak/strong areas.
            lessons: All lessons for the domain from Firestore.
            completed_lesson_ids: Lesson IDs already completed by the student.

        Returns:
            Ordered list of journey items with reasons.
        """
        if not lessons:
            return []

        skills = student_state.get("skills", {})
        weak_areas = student_state.get("weak_areas", [])
        strong_areas = student_state.get("strong_areas", [])
        difficulty = student_state.get("difficulty", 1)

        incomplete = [l for l in lessons if l.get("id") not in completed_lesson_ids]
        completed = [l for l in lessons if l.get("id") in completed_lesson_ids]

        # Classify incomplete lessons by priority
        weak_skill_lessons = []
        at_level_lessons = []
        advanced_lessons = []

        for lesson in incomplete:
            lesson_skill = lesson.get("skillId") or lesson.get("skill_id", "")
            lesson_diff = lesson.get("difficulty", 1)

            if lesson_skill in weak_areas:
                weak_skill_lessons.append((lesson, "Addresses identified skill gap"))
            elif lesson_diff <= difficulty:
                at_level_lessons.append((lesson, "Matches current difficulty level"))
            else:
                advanced_lessons.append((lesson, "Advanced topic for future progression"))

        # Sort within groups: lower difficulty first for weak areas and at-level
        weak_skill_lessons.sort(key=lambda x: x[0].get("difficulty", 1))
        at_level_lessons.sort(key=lambda x: x[0].get("difficulty", 1))
        advanced_lessons.sort(key=lambda x: x[0].get("difficulty", 1))

        journey = []

        # 1. Weak area lessons first (reinforcement)
        for lesson, reason in weak_skill_lessons:
            journey.append(_to_journey_item(lesson, reason, completed_lesson_ids))

        # 2. At-level lessons
        for lesson, reason in at_level_lessons:
            journey.append(_to_journey_item(lesson, reason, completed_lesson_ids))

        # 3. Advanced lessons
        for lesson, reason in advanced_lessons:
            journey.append(_to_journey_item(lesson, reason, completed_lesson_ids))

        return journey

    @classmethod
    def determine_next_activity(
        cls,
        student_state: Dict[str, Any],
        lessons: Optional[List[Dict[str, Any]]] = None,
        completed_lesson_ids: Optional[List[str]] = None,
        action: str = "advance",
        rationale: str = "",
    ) -> Dict[str, Any]:
        """Determine the single most important next activity.

        If lessons data is available, selects from real Firestore lesson data.
        Falls back to generic recommendation when data is unavailable.
        """
        domain_id = student_state.get("domain_id", "general")
        difficulty = student_state.get("difficulty", 1)
        weak_areas = student_state.get("weak_areas", [])

        # If real lesson data provided, use journey generation
        if lessons is not None and completed_lesson_ids is not None:
            journey = cls.generate_journey(student_state, lessons, completed_lesson_ids)
            if journey:
                first = journey[0]
                return {
                    "activity_type": first.get("type", "lesson"),
                    "activity_id": first["lessonId"],
                    "title": first["title"],
                    "domain_id": domain_id,
                    "difficulty": first.get("difficulty", difficulty),
                    "reason": first.get("reason", rationale),
                    "prerequisite_remedy": action == "prerequisite_revision",
                }

        # Fallback: generic recommendation (backward compat with Phase 1)
        if action == "prerequisite_revision" and weak_areas:
            return {
                "activity_type": "revision",
                "activity_id": f"rev_{weak_areas[0]}",
                "title": f"Reinforce Fundamentals: {weak_areas[0].replace('_', ' ').title()}",
                "domain_id": domain_id,
                "difficulty": max(1, difficulty - 1),
                "reason": rationale,
                "prerequisite_remedy": True,
            }
        elif action == "advance":
            return {
                "activity_type": "lesson",
                "activity_id": "next_advanced_unit",
                "title": "Next Step in Preparation Journey",
                "domain_id": domain_id,
                "difficulty": difficulty,
                "reason": rationale,
                "prerequisite_remedy": False,
            }
        else:
            return {
                "activity_type": "challenge",
                "activity_id": "concept_practice_drill",
                "title": "Targeted Practice Drill",
                "domain_id": domain_id,
                "difficulty": difficulty,
                "reason": rationale,
                "prerequisite_remedy": False,
            }


def _to_journey_item(lesson: Dict[str, Any], reason: str, completed_ids: List[str]) -> Dict[str, Any]:
    """Convert a Firestore lesson dict to a journey item dict."""
    lesson_id = lesson.get("id", "")
    return {
        "lessonId": lesson_id,
        "title": lesson.get("title", "Untitled Lesson"),
        "type": lesson.get("type", "lesson"),
        "difficulty": lesson.get("difficulty", 1),
        "skillId": lesson.get("skillId") or lesson.get("skill_id"),
        "reason": reason,
        "is_completed": lesson_id in completed_ids,
    }
